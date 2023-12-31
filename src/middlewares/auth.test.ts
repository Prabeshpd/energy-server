import sinon from 'sinon';
import { expect } from 'chai';
import { Response, NextFunction } from 'express';

import * as jwt from '@/lib/jwt';
import { UserDetail } from '@/types/types';
import { userFactory } from '@/test/factories/user';
import authenticate, { AuthorizedRequest } from './auth';

describe('authentication middleware', () => {
  let mockExpressRequest: Partial<AuthorizedRequest>;
  let mockExpressResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  let token: string;
  let user: UserDetail;
  before(async () => {
    mockExpressRequest = {};
    mockExpressResponse = {};
    mockNextFunction = () => {};
    user = userFactory();
    token = await jwt.generateAccessToken(user);
  });

  describe('given there is NO token sent', async () => {
    it('throws unauthorized error', async () => {
      mockExpressResponse.status = sinon.stub().callsFake((statusArg) => {
        return {
          send: sinon.stub().callsFake((replyArg) => {
            return { status: statusArg, body: replyArg };
          })
        };
      });

      authenticate(
        mockExpressRequest as AuthorizedRequest,
        mockExpressResponse as Response,
        mockNextFunction as NextFunction
      ).then((data: any) =>
        expect(data).to.deep.equal({
          status: 400,
          body: {
            message: 'No authorization header set'
          }
        })
      );
    });
  });

  describe('given token is INVALID', async () => {
    it('throws unauthorized error', async () => {
      mockExpressRequest.headers = { authorization: `random_token ${token}` };
      mockExpressResponse.status = sinon.stub().callsFake((statusArg) => {
        return {
          send: sinon.stub().callsFake((replyArg) => {
            return { status: statusArg, body: replyArg };
          })
        };
      });

      authenticate(
        mockExpressRequest as AuthorizedRequest,
        mockExpressResponse as Response,
        mockNextFunction as NextFunction
      ).then((data: any) =>
        expect(data).to.deep.equal({
          status: 401,
          body: {
            message: 'Invalid Token'
          }
        })
      );
    });
  });

  describe('given token is valid', () => {
    it('sets the decoded user value to request object', async () => {
      mockExpressRequest.headers = { authorization: `Bearer ${token}` };
      mockExpressResponse.status = sinon.stub().callsFake((statusArg) => {
        return {
          send: sinon.stub().callsFake((replyArg) => {
            return { status: statusArg, body: replyArg };
          })
        };
      });

      process.env.accessTokenSecret = 'ENTER_ACCESS_TOKEN_SALT_HERE';

      authenticate(
        mockExpressRequest as AuthorizedRequest,
        mockExpressResponse as Response,
        mockNextFunction as NextFunction
      ).then((data: any) => {
        expect(mockExpressRequest.user).to.deep.equal(user);
      });
    });
  });
});
