import { Router } from 'express';

import * as userController from '@/controllers/user';
import { schema } from '@/middlewares/validate';
import userSchema from '@/schemas/user';

const userRouter = Router();

userRouter.post('/', schema(userSchema), userController.createUser);

export default userRouter;
