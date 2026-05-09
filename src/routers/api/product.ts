import { Router } from 'express';
import * as handler from '../../handlers/product';
import verifyAuthToken from '../../middleware/auth';

const productRouter = Router();

productRouter.get('/', handler.index);
productRouter.get('/top', handler.getMostPopularProducts);
productRouter.get('/category/:name', handler.getByCategory);
productRouter.get('/:id', handler.show);
productRouter.post('/', verifyAuthToken, handler.create);
productRouter.put('/:id', verifyAuthToken, handler.update);
productRouter.delete('/:id', verifyAuthToken, handler.remove);

export default productRouter;
