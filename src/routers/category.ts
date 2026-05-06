import { Router } from 'express';
import * as handler from '../handlers/category';

const categoryRouter = Router();

categoryRouter.get('/', handler.index);
categoryRouter.get('/:id', handler.show);
categoryRouter.post('/', handler.create);
categoryRouter.put('/:id', handler.update);
categoryRouter.delete('/:id', handler.remove);

export default categoryRouter;
