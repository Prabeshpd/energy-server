import { Request, Response } from 'express';
import httpStatusCode from 'http-status-codes';

import * as userService from '@/services/user/user';

export async function createUser(request: Request, response: Response) {
  try {
    const payload = request.body;
    const data = await userService.createUser(payload);

    return response.status(httpStatusCode.OK).json(data);
  } catch (err: any) {
    const statusCode = httpStatusCode.UNPROCESSABLE_ENTITY;
    response.status(statusCode).json(err);
  }
}
