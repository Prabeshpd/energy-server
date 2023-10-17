import 'mocha';
import { expect, use, assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import dbClient from '@/config/prismaDatabase';
import * as userRepository from '@/repositories/user';
import { userFactory } from '@/test/factories/user';

use(chaiAsPromised);

describe('createUser', () => {
  afterEach(async () => {
    await dbClient.user.deleteMany();
  });

  describe('given valid params', () => {
    it('creates user', async () => {
      const user = userFactory();
      const userEmail = 'defaultuser@gmail.com';
      const userPayload = { ...user, email: userEmail };
      const createdUser = await userRepository.createUser(userPayload);

      const data = await dbClient.user.findUnique({ where: { id: createdUser.id } });

      assert.isNotNull(data);
      expect(data?.email).to.equal(userEmail);
    });
  });
});

describe('findByEmail', () => {
  afterEach(async () => {
    await dbClient.user.deleteMany();
  });

  describe('given user exists', () => {
    it('returns user', async () => {
      const user = userFactory();
      const userEmail = 'defaultuser@gmail.com';
      const userPayload = { ...user, email: userEmail };
      const createdUser = await dbClient.user.create({ data: userPayload });

      const data = await userRepository.findByEmail(userEmail);

      assert.isNotNull(data);
      expect(data?.id).to.equal(createdUser.id);
      expect(data?.email).to.equal(userEmail);
    });
  });

  describe('given user does not exists', () => {
    it('returns null', async () => {
      const user = userFactory();
      const userEmail = 'defaultuser@gmail.com';
      const userPayload = { ...user, email: userEmail };
      await dbClient.user.create({ data: userPayload });

      const data = await userRepository.findByEmail('other.user@nimblehq.co');

      assert.isNull(data);
    });
  });
});
