import 'mocha';
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import dbClient from '@/config/prismaDatabase';
import { userFactory } from '@/test/factories/user';

import { createUser } from './user';

use(chaiAsPromised);

describe('User:', () => {
  afterEach(async () => {
    await dbClient.user.deleteMany();
  });

  describe('createUser', () => {
    describe('given valid params', () => {
      const user = userFactory();
      it('creates the user successfully with encrypted password', async () => {
        const userPayload = {
          name: 'Default User',
          email: 'defaultUser@gmail.com',
          password: user.password
        };

        const createdUser = await createUser(userPayload);

        expect(createdUser.email).to.equal('defaultUser@gmail.com');
        expect(createdUser.name).to.equal('Default User');
      });
    });

    describe('given email is not unique', () => {
      it('throws error', async () => {
        const user = userFactory();
        const userPayload = {
          name: user.name,
          email: 'unique.user@gmail.com',
          password: user.password
        };

        await createUser(userPayload);

        await expect(createUser(userPayload)).to.be.eventually.rejected.and.to.haveOwnProperty(
          'message',
          'Account with this email already exists.'
        );
      });
    });
  });
});
