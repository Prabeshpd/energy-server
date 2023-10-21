import { Router } from 'express';

import * as projectController from '@/controllers/project';
import authenticate from '@/middlewares/auth';

const projectRouter = Router();

projectRouter.get('/', authenticate, projectController.fetchProjects);

export default projectRouter;
