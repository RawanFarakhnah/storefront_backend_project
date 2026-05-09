import { Router } from 'express';
import * as handler from '../../handlers/category';
import verifyAuthToken from '../../middleware/auth';

const categoryRouter = Router();

categoryRouter.get('/', handler.index);
categoryRouter.get('/:id', handler.show);
categoryRouter.post('/', verifyAuthToken, handler.create);
categoryRouter.put('/:id', verifyAuthToken, handler.update);
categoryRouter.delete('/:id', verifyAuthToken, handler.remove);

export default categoryRouter;
