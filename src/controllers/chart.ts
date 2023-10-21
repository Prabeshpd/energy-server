import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

import * as chartService from '@/services/chart/chart';

export async function getMapJson(_request: Request, response: Response) {
  try {
    const data = await chartService.getMapJson();

    return response.status(httpStatusCode.OK).json(data);
  } catch (err: any) {
    response.status(httpStatusCode.UNPROCESSABLE_ENTITY).json(err);
  }
}
