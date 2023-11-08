import authMiddleware from '@/middleware/auth';
import { Router } from 'express';
import { GetIntervalDataRoute } from './Producer';

const routes = Router();

routes.get('/get-interval-data', GetIntervalDataRoute.select);

routes.use(authMiddleware);

export default routes;
