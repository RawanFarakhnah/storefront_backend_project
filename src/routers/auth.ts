import { Router } from 'express';
import * as handler from '../handlers/auth';

const authRouter = Router();

authRouter.post('/signin', handler.signIn);

export default authRouter;
