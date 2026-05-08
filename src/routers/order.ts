import { Router } from 'express';
import * as handler from '../handlers/order';
import verifyAuthToken from '../middleware/auth';

const orderRouter = Router();

orderRouter.get('/', verifyAuthToken, handler.index);
orderRouter.get(
  '/current/:userId',
  verifyAuthToken,
  handler.getCurrentByUserId,
);
orderRouter.get(
  '/completed/:userId',
  verifyAuthToken,
  handler.getCompletedByUserId,
);

export default orderRouter;
