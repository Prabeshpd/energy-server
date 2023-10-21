import { Router } from 'express';

import * as projectHistoryController from '@/controllers/projectHistory';
import authenticate from '@/middlewares/auth';

const projectRouter = Router();

projectRouter.get('/', authenticate, projectHistoryController.fetchProjectHistories);

export default projectRouter;
