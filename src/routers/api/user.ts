import { Router } from 'express';
import * as handler from '../../handlers/user';
import verifyAuthToken from '../../middleware/auth';

const userRouter = Router();

userRouter.get('/', verifyAuthToken, handler.index);
userRouter.get('/:id', verifyAuthToken, handler.show);
userRouter.post('/', handler.create);
userRouter.put('/:id', verifyAuthToken, handler.update);
userRouter.delete('/:id', verifyAuthToken, handler.remove);

export default userRouter;
