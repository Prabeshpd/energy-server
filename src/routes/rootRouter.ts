import { Router } from 'express';

import userRouter from './user/user';
import authRouter from './auth/auth';
import chartRouter from './chart/chart';
import projectRouter from './project/project';
import projectHistoryRouter from './projectHistory/projectHistory';

const appRouter = Router();
const generalRouter = Router();

appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/projects', projectRouter);
appRouter.use('/projectHistories', projectHistoryRouter);
appRouter.use('/charts', chartRouter);

export { generalRouter, appRouter };
