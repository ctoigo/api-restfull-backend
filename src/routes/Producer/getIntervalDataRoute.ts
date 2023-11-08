import { GetIntervalDataController } from '@/controllers';
import { Request, Response } from 'express';

class GetIntervalDataRoute {
  async select(request: Request, response: Response) {
    const selectWithLongest = new GetIntervalDataController();
    const { statusCode, body } = await selectWithLongest.handle();
    return response.status(statusCode).json(body);
  }
}

export default new GetIntervalDataRoute();
