import { Router, Request, Response } from 'express';
import categoryRouter from './category';

const mainRouter = Router();

// root router
mainRouter.use('/', function (_req: Request, res: Response) {
  res.status(200).send('Welcome to storefront backend project');
});

// mount feature routers
mainRouter.use('/categories', categoryRouter);

export default mainRouter;
