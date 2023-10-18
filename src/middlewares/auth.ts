import { HttpStatusCode } from 'axios';
import { NextFunction, Request, Response } from 'express';

import config from '@/config/config';
import * as jwt from '@/lib/jwt';
import ApiError from '@/lib/apiError';
import { UserDetail } from '@/types/types';

export interface AuthorizedRequest extends Request {
  user: UserDetail;
}

async function authenticate(request: Request, _response: Response, next: NextFunction) {
  const authorizedRequest = request as AuthorizedRequest;
  try {
    const { accessTokenSecret } = config.auth;

    const secret = `${accessTokenSecret}`;
    const token = request.headers.authorization;

    if (!token) {
      const error = new ApiError({ message: 'No authorization header set', code: HttpStatusCode.BadRequest });

      return next(error);
    }

    if (!token.includes('Bearer')) {
      const error = new ApiError({
        code: HttpStatusCode.BadRequest,
        message: "Authorization header doesn't include a Bearer token"
      });

      return next(error);
    }

    const bearerToken = token.split(' ')[1];

    try {
      const decodedResult = (await jwt.verifyToken(bearerToken, secret)) as UserDetail;
      authorizedRequest.user = decodedResult;

      next();
    } catch (err) {
      const error = new ApiError({ message: 'Invalid Token', code: HttpStatusCode.Unauthorized });

      return next(error);
    }
  } catch (err) {
    const error = new ApiError({ message: 'Something went wrong', code: HttpStatusCode.InternalServerError });

    return next(error);
  }
}

export default authenticate;
