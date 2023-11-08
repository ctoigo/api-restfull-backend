import {
  IController,
  HttpResponse,
  serverError,
  success,
  notFound,
  getMovies,
} from '@/infra/';
import { getFollowingWinYear, getPreviousWinYear } from '@/utils';

export class GetIntervalDataController implements IController {
  async handle(): Promise<HttpResponse> {
    try {
      const movies = (await getMovies()) as Array<{
        producers: string;
        year: number;
      }>;
      if (movies) {
        const producersData: Record<string, number[]> = {};

        movies.forEach((movie, index) => {
          const currentProducer = movie.producers;
          const currentYear = movie.year;
          const previousYear = index > 0 ? movies[index - 1].year : currentYear;

          if (!producersData[currentProducer]) {
            producersData[currentProducer] = [];
          }

          producersData[currentProducer].push(currentYear - previousYear);
        });

        let maxIntervalProducer: string | null = null;
        let minIntervalProducer: string | null = null;

        for (const producer in producersData) {
          const intervals = producersData[producer];
          const maxInterval = Math.max(...intervals);
          const minInterval = Math.min(...intervals);

          if (
            !maxIntervalProducer ||
            maxInterval > Math.max(...producersData[maxIntervalProducer])
          ) {
            maxIntervalProducer = producer;
          }

          if (
            !minIntervalProducer ||
            minInterval < Math.min(...producersData[minIntervalProducer])
          ) {
            minIntervalProducer = producer;
          }
        }

        const response = {
          max: [
            {
              producer: maxIntervalProducer,
              interval: Math.max(...producersData[maxIntervalProducer]),
              previousWin: getPreviousWinYear(movies, maxIntervalProducer, 0),
              followingWin: getFollowingWinYear(movies, maxIntervalProducer, 0),
            },
          ],
          min: [
            {
              producer: minIntervalProducer,
              interval: Math.min(...producersData[minIntervalProducer]),
              previousWin: getPreviousWinYear(movies, minIntervalProducer, 0),
              followingWin: getFollowingWinYear(movies, minIntervalProducer, 0),
            },
          ],
        };

        return success(response);
      } else {
        return notFound('No record found');
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
