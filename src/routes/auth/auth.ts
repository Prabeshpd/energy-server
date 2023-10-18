import { Router } from 'express';

import { schema } from '@/middlewares/validate';
import * as authController from '@/controllers/auth';
import { authLoginSchema, refreshSchema } from '@/schemas/auth';

const authRouter = Router();

authRouter.post('/login', schema(authLoginSchema), authController.login);
authRouter.post('/refresh', schema(refreshSchema), authController.refresh);

export default authRouter;
