import { WithLongestGapController } from '@/controllers';
import { Request, Response } from 'express';

class WithLongestGapRoute {
  async select(request: Request, response: Response) {
    const selectWithLongest = new WithLongestGapController();
    const { statusCode, body } = await selectWithLongest.handle();
    return response.status(statusCode).json(body);
  }
}

export default new WithLongestGapRoute();
