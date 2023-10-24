import { expect } from 'chai';
import request from 'supertest';

import dbClient from '@/config/prismaDatabase';
import { createUser } from '@/services/user/user';
import { userFactory } from '@/test/factories/user';

import app, { server } from '../../server';

describe('User Creation test', () => {
  afterEach(async () => {
    await dbClient.user.deleteMany();
    server.close();
  });

  describe('given valid params', () => {
    it('creates the user', (done) => {
      const user = userFactory();
      const userPayload = {
        name: user.name,
        email: 'unique.user@gmail.com',
        password: user.password
      };

      request(app)
        .post('/api/v1/users')
        .send({ email: userPayload.email, password: userPayload.password, name: userPayload.name })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.name).to.be.equal(user.name);
          expect(res.body.email).to.be.equal('unique.user@gmail.com');
          done();
        });
    });
  });

  describe('given email is NOT unique ', () => {
    const user = userFactory();
    const userPayload = {
      name: user.name,
      email: 'unique.user@gmail.com',
      password: user.password
    };

    before(async () => {
      await createUser(userPayload);
    });

    it('throws unprocessable entity error', (done) => {
      request(app)
        .post('/api/v1/users')
        .send({ email: userPayload.email, password: userPayload.password, name: userPayload.name })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });
  });
});
