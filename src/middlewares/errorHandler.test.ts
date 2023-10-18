import sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';

import { emptyBody, notFoundHandler } from './errorHandler';

describe('handleErrorMiddleware: ', () => {
  let mockExpressRequest: Partial<Request>;
  let mockExpressResponse: Partial<Response>;
  let mockNextFunction: NextFunction;
  let err: any;

  before(async () => {
    mockExpressRequest = {};
    mockExpressResponse = {};
    mockNextFunction = () => {};
    err = {};
  });

  describe('emptyBody:', () => {
    it('should return an error if there is no payload sent for post method', async () => {
      mockExpressRequest.method = 'POST';
      mockExpressRequest.body = {};
      mockExpressRequest.is = (arg: string) => {
        return 'true';
      };
      mockExpressResponse.status = sinon.stub().callsFake((statusArg) => {
        return {
          json: sinon.stub().callsFake((replyArg) => {
            return { status: statusArg, body: replyArg };
          })
        };
      });

      const data = emptyBody(
        mockExpressRequest as Request,
        mockExpressResponse as Response,
        mockNextFunction as NextFunction
      );

      expect(data).to.deep.equal({
        status: 400,
        body: {
          message: 'Payload is invalid.'
        }
      });
    });
  });

  describe('notFoundHandler:', () => {
    it('should return an error if there is not found Error', async () => {
      mockExpressResponse.status = sinon.stub().callsFake((statusArg) => {
        return {
          json: sinon.stub().callsFake((replyArg) => {
            return { status: statusArg, body: replyArg };
          })
        };
      });

      const data = notFoundHandler(
        err as any,
        mockExpressRequest as Request,
        mockExpressResponse as Response,
        mockNextFunction as NextFunction
      );

      expect(data).to.deep.equal({
        status: 404,
        body: {
          message: 'Requested resource is not found'
        }
      });
    });
  });
});
