import { Router } from 'express';
import * as handler from '../handlers/product';

const productRouter = Router();

productRouter.get('/', handler.index);
productRouter.get('/:id', handler.show);
productRouter.post('/', handler.create);
productRouter.put('/:id', handler.update);
productRouter.delete('/:id', handler.remove);

export default productRouter;
