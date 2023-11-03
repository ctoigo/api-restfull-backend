import {
  IController,
  HttpResponse,
  serverError,
  success,
  notFound,
  getMovies,
} from '@/infra/';

export class WithLongestGapController implements IController {
  async handle(): Promise<HttpResponse> {
    try {
      const movies = (await getMovies()) as Array<{
        producers: string;
        year: number;
      }>;

      const producerMap = new Map<
        string,
        { lastYear: number; maxGap: number }
      >();

      if (movies) {
        for (const movie of movies) {
          const { producers, year } = movie;
          if (!producerMap.has(producers)) {
            producerMap.set(producers, { lastYear: year, maxGap: 0 });
          } else {
            const producerData = producerMap.get(producers);
            const gap = year - producerData.lastYear;
            if (gap > producerData.maxGap) {
              producerData.maxGap = gap;
            }
            producerData.lastYear = year;
          }
        }

        let maxGapProducer: string | null = null;
        let maxGap = 0;

        for (const [producer, producerData] of producerMap.entries()) {
          if (producerData.maxGap > maxGap) {
            maxGap = producerData.maxGap;
            maxGapProducer = producer;
          }
        }

        return success(maxGapProducer);
      } else {
        return notFound('No record found');
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
