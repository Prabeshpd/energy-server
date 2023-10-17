import { Router } from 'express';

import userRouter from './user/user';

const appRouter = Router();
const generalRouter = Router();

appRouter.use('/users', userRouter);

export { generalRouter, appRouter };
