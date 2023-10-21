import { Router } from 'express';

import userRouter from './user/user';
import authRouter from './auth/auth';
import chartRouter from './chart/chart';

const appRouter = Router();
const generalRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);
generalRouter.use('/charts', chartRouter);

export { generalRouter, appRouter };
