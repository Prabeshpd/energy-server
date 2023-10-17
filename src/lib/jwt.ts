import * as jwt from 'jsonwebtoken';

import { User } from '@prisma/client';

import config from '@/config/config';
import * as object from '@/helpers/object';

export type UserDetail = Omit<User, 'password'>;

export interface AccessTokens {
  accessToken: string;
  refreshToken: string;
}

export function generateTokens(data: UserDetail): AccessTokens {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data)
  };
}

export function generateAccessToken(data: UserDetail, extraSalt: string = ''): string {
  const { accessTokenSecret, accessTokenDuration } = config.auth;
  const secret = accessTokenSecret + extraSalt;
  const payload = object.withoutAttrs<UserDetail>({ ...data }, ['exp', 'iat']);

  return generateToken(payload, secret, {
    expiresIn: accessTokenDuration
  });
}

export function generateRefreshToken(data: UserDetail, extraSalt: string = ''): string {
  const { refreshTokenSecret, refreshTokenDuration } = config.auth;
  const secret = refreshTokenSecret + extraSalt;

  return generateToken(data, secret, {
    expiresIn: refreshTokenDuration
  });
}

export function verifyRefreshToken(token: string, extraSalt: string = '') {
  const { refreshTokenSecret } = config.auth;
  const secret = refreshTokenSecret + extraSalt;

  return verifyToken(token, secret);
}

export function verifyToken(token: string, secret: string) {
  return jwt.verify(token, secret);
}

export function decode(token: string): null | object | string {
  return jwt.decode(token);
}

export function generateToken(payload: string | object | Buffer, secret: string, options?: jwt.SignOptions): string {
  return jwt.sign(payload, secret, options);
}
