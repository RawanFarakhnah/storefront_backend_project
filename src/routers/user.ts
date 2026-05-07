import { Router } from 'express';
import * as handler from '../handlers/user';

const userRouter = Router();

userRouter.get('/', handler.index);
userRouter.get('/:id', handler.show);
userRouter.post('/', handler.create);
userRouter.put('/:id', handler.update);
userRouter.delete('/:id', handler.remove);

export default userRouter;
