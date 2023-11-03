import authMiddleware from '@/middleware/auth';
import { Router } from 'express';
import { WithLongestGapRoute, WithShortestGapRoute } from './Producer';

const routes = Router();

routes.get('/with-longest-gap', WithLongestGapRoute.select);
routes.get('/with-shortest-gap', WithShortestGapRoute.select);

routes.use(authMiddleware);

export default routes;
