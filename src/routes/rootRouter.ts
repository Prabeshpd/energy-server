import { Router } from 'express';

import userRouter from './user/user';
import authRouter from './auth/auth';

const appRouter = Router();
const generalRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);

export { generalRouter, appRouter };
