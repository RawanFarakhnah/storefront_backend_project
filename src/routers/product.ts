import { Router } from 'express';
import * as handler from '../handlers/product';

const productRouter = Router();

productRouter.get('/', handler.index);
productRouter.get('/top', handler.getMostPopularProducts);
productRouter.get('/category/:name', handler.getByCategory);
productRouter.get('/:id', handler.show);
productRouter.post('/', handler.create);
productRouter.put('/:id', handler.update);
productRouter.delete('/:id', handler.remove);

export default productRouter;
