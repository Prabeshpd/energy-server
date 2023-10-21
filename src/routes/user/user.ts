import { Router } from 'express';

import * as userController from '@/controllers/user';
import { schema } from '@/middlewares/validate';
import authenticate from '@/middlewares/auth';
import userSchema from '@/schemas/user';

const userRouter = Router();

userRouter.post('/', schema(userSchema), userController.createUser);
userRouter.get('/me', authenticate, userController.fetchCurrentUser);

export default userRouter;
