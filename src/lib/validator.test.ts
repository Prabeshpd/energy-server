import 'mocha';
import * as Joi from 'joi';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { validate } from './validator';

use(chaiAsPromised);

describe('Validates Incoming Request Payload', () => {
  describe('validate', () => {
    describe('given valid payload for validation schema', () => {
      it('validates successfully', () => {
        const data = {
          firstName: 'Random Mike',
          age: 49
        };

        const schema = Joi.object().keys({
          firstName: Joi.string(),
          age: Joi.number()
        });

        expect(validate(data, schema)).to.eventually.be.fulfilled;
      });
    });

    describe('given INVALID type for payload', () => {
      it('throws error', () => {
        const data = {
          firstName: 'random',
          age: 'guess'
        };

        const schema = Joi.object().keys({
          firstName: Joi.string(),
          age: Joi.number()
        });

        expect(validate(data, schema)).to.eventually.be.rejected;
      });
    });

    describe('given INVALID payload', () => {
      it('throws error', () => {
        const data = {
          age: 49
        };

        const schema = Joi.object().keys({
          firstName: Joi.string().required(),
          age: Joi.number()
        });

        expect(validate(data, schema)).to.eventually.be.rejected;
      });
    });
  });
});
