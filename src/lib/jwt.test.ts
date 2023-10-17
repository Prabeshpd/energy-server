import 'mocha';
import { expect } from 'chai';

import { userFactory } from '@/test/factories/user';

import { decode, generateAccessToken, generateRefreshToken, UserDetail } from './jwt';

describe('Utils: jwt', () => {
  const userDetail = userFactory();

  describe('generateAccessToken()', () => {
    describe('given params to generate token', () => {
      it('generates access token of type "string"', () => {
        expect(typeof generateAccessToken(userDetail)).to.equal('string');
      });
    });
  });

  describe('generateRefreshToken()', () => {
    describe('given params to generate token', () => {
      it('generates refresh token of type "string"', () => {
        expect(typeof generateRefreshToken(userDetail)).to.equal('string');
      });
    });
  });

  describe('decode()', () => {
    interface DecodedUserDetail extends UserDetail {
      iat: number;
      exp: number;
    }

    describe('given valid access_token', () => {
      it('returns the decoded data', () => {
        const decodedData = decode(generateAccessToken(userDetail)) as DecodedUserDetail;
        const { iat, exp, ...decodedUserDetail } = decodedData;

        expect(decodedUserDetail.email).to.deep.equals(userDetail.email);
        expect(decodedData).to.haveOwnProperty('exp');
        expect(decodedData).to.haveOwnProperty('iat');
      });
    });

    describe('given valid refresh_token', () => {
      it('returns the valid decoded data', () => {
        const decodedData = decode(generateRefreshToken(userDetail)) as DecodedUserDetail;
        const { iat, exp, ...decodedUserDetail } = decodedData;

        expect(decodedUserDetail.email).to.deep.equals(userDetail.email);
        expect(decodedData).to.haveOwnProperty('exp');
        expect(decodedData).to.haveOwnProperty('iat');
      });
    });
  });
});
