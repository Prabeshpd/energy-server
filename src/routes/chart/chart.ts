import { Router } from 'express';

import * as chartController from '@/controllers/chart';

const chartRouter = Router();

chartRouter.get('/maps', chartController.getMapJson);

export default chartRouter;
