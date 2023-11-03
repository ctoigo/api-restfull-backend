import { WithShortestGapController } from '@/controllers';
import { Request, Response } from 'express';

class WithShortestGapRoute {
  async select(request: Request, response: Response) {
    const selectWithLongest = new WithShortestGapController();
    const { statusCode, body } = await selectWithLongest.handle();
    return response.status(statusCode).json(body);
  }
}

export default new WithShortestGapRoute();
