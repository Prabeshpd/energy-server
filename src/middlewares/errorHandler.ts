import { isEmpty } from 'ramda';
import httpStatusCode from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import ApiError from '@/lib/apiError';
import BaseError from '@/lib/error';

export function notFoundHandler(_err: any, _req: Request, res: Response, next: NextFunction) {
  return res.status(httpStatusCode.NOT_FOUND).json({
    message: 'Requested resource is not found'
  });
}

export function emptyBody(request: Request, response: Response, next: NextFunction) {
  const { body, method } = request;
  const disallowedHttpHeaders: any = ['PUT', 'POST', 'PATCH'];

  if (request.is('application/json') && disallowedHttpHeaders.includes(method) && isEmpty(body)) {
    return response.status(httpStatusCode.BAD_REQUEST).json({ message: 'Payload is invalid.' });
  }

  next();
}

export function bodyParser(err: any, _req: Request, res: Response, _next: NextFunction) {
  res.status(err.status).json({
    error: {
      code: err.status,
      message: httpStatusCode.getStatusText(err.status)
    }
  });
}

export function genericErrorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    return res.status(err.code).json({ message: err.message });
  }

  if (err instanceof BaseError) {
    return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({ message: err.message });
  }

  res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json(err);
}
