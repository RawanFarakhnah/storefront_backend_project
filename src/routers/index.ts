import { Router, Request, Response } from 'express';
import categoryRouter from './category';
import productRouter from './product';
import userRouter from './user';
import orderRouter from './order';
import authRouter from './auth';

const mainRouter = Router();

// root router
mainRouter.get('/', function (_req: Request, res: Response) {
  res.status(200).send('Welcome to storefront backend project');
});

// mount feature routers
mainRouter.use('/categories', categoryRouter);
mainRouter.use('/products', productRouter);
mainRouter.use('/users', userRouter);
mainRouter.use('/orders', orderRouter);
mainRouter.use('/auth', authRouter);
export default mainRouter;
