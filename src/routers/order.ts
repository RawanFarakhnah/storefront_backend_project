import { Router } from 'express';
import * as handler from '../handlers/order';

const orderRouter = Router();

orderRouter.get('/', handler.index);
orderRouter.get('/current/:userId', handler.getCurrentByUserId);
orderRouter.get('/completed/:userId', handler.getCompletedByUserId);

export default orderRouter;
