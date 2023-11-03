import {
  IController,
  HttpResponse,
  serverError,
  success,
  notFound,
  getMovies,
} from '@/infra/';

export class WithShortestGapController implements IController {
  async handle(): Promise<HttpResponse> {
    try {
      const movies = (await getMovies()) as Array<{
        producers: string;
        year: number;
      }>;

      const producerMap = new Map<
        string,
        { lastYear: number; minGap: number }
      >();

      if (movies) {
        for (const movie of movies) {
          const { producers, year } = movie;
          if (!producerMap.has(producers)) {
            producerMap.set(producers, {
              lastYear: year,
              minGap: Number.MAX_VALUE,
            });
          } else {
            const producerData = producerMap.get(producers);
            const gap = year - producerData.lastYear;
            if (gap < producerData.minGap) {
              producerData.minGap = gap;
            }
            producerData.lastYear = year;
          }
        }

        let minGapProducer: string | null = null;
        let minGap = Number.MAX_VALUE;

        for (const [producer, producerData] of producerMap.entries()) {
          if (producerData.minGap < minGap) {
            minGap = producerData.minGap;
            minGapProducer = producer;
          }
        }
        return success(minGapProducer);
      } else {
        return notFound('No record found');
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
