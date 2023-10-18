import httpStatus from 'http-status-codes';

import * as jwt from '@/lib/jwt';
import * as crypt from '@/lib/crypt';
import * as object from '@/helpers/object';
import { UserDetail } from '@/types/types';

import AuthError from './error';
import * as userService from '../user/user';

export interface LoginResponse {
  code: number;
  message: string;
  data: {
    user: UserDetail;
    accessToken: string;
    refreshToken: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RefreshResponse {
  code: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export interface RefreshPayload {
  refreshToken: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const user = await userService.findByEmail(payload.email);
  if (!user) {
    throw new AuthError({
      message: 'username or password does not match'
    });
  }

  if (!user.password) {
    throw new AuthError({ message: 'username or password does not match' });
  }

  const passwordMatches = await crypt.compareWithHashValue(payload.password, user.password);

  if (!passwordMatches) {
    throw new AuthError({ message: 'username or password does not match' });
  }

  const UserDetail = object.withoutAttrs<UserDetail>(user, ['password']);
  const refreshToken = jwt.generateRefreshToken(user);
  const accessToken = jwt.generateAccessToken(user);

  return {
    code: httpStatus.OK,
    message: 'Login is successful.',
    data: {
      user: UserDetail,
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  };
}

export async function refresh(payload: RefreshPayload): Promise<RefreshResponse> {
  const refreshPayload = (await verifyRefreshToken(payload.refreshToken)) as UserDetail;

  let user = object.withoutAttrs<UserDetail>(refreshPayload, ['iat', 'exp']);

  const accessToken = await jwt.generateAccessToken(user);

  return {
    code: httpStatus.OK,
    message: 'Access Token generated successfully',
    data: {
      accessToken
    }
  };
}

export async function verifyRefreshToken(token: string) {
  try {
    return jwt.verifyRefreshToken(token);
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      throw new AuthError({ message: 'Refresh token expired' });
    }

    throw new AuthError({ message: 'Refresh token expired' });
  }
}
