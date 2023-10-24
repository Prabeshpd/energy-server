import { Router } from 'express';

import * as projectHistoryController from '@/controllers/projectHistory';
import authenticate from '@/middlewares/auth';

const projectHistoryRouter = Router();

projectHistoryRouter.get('/', authenticate, projectHistoryController.fetchProjectHistories);

export default projectHistoryRouter;
