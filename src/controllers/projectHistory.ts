import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

import { AuthorizedRequest } from '@/middlewares/auth';
import { Query } from '@/types/query';
import * as projectHistoryService from '@/services/projectHistories/projectHistories';

export async function fetchProjectHistories(request: Request, response: Response) {
  try {
    const authorizedRequest = request as AuthorizedRequest;
    const userId = authorizedRequest.user.id;

    const query = request.query as unknown as Query;
    const data = await projectHistoryService.listProjects(userId, query);
    return response.status(httpStatusCode.OK).json(data);
  } catch (err: any) {
    const statusCode = httpStatusCode.UNPROCESSABLE_ENTITY;
    response.status(statusCode).json(err);
  }
}
