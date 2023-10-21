import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

import { AuthorizedRequest } from '@/middlewares/auth';

import * as projectService from '@/services/project/project';

export async function fetchProjects(request: Request, response: Response) {
  try {
    const authorizedRequest = request as AuthorizedRequest;
    const userId = authorizedRequest.user.id;

    const data = await projectService.listProjects(userId);

    return response.status(httpStatusCode.OK).json(data);
  } catch (err: any) {
    const statusCode = httpStatusCode.UNPROCESSABLE_ENTITY;
    response.status(statusCode).json(err);
  }
}
