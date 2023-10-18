import { expect } from 'chai';
import request from 'supertest';

import dbClient from '@/config/prismaDatabase';
import { createUser } from '@/services/user/user';
import { userFactory } from '@/test/factories/user';

import app, { server } from '../../server';

describe('User login test', () => {
  afterEach(async () => {
    await dbClient.user.deleteMany();
    server.close();
  });

  describe('given valid credentials', () => {
    const user = userFactory();
    const userPayload = {
      name: user.name,
      email: 'unique.user@gmail.com',
      password: user.password
    };

    before(async () => {
      await createUser(userPayload);
    });

    it('returns tokens logging in user', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'unique.user@gmail.com', password: user.password })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body.data).to.haveOwnProperty('accessToken');
          expect(res.body.data).to.haveOwnProperty('refreshToken');
          expect(res.body.data.user.email).to.be.equal('unique.user@gmail.com');
          done();
        });
    });
  });

  describe('given INVALID credentials', () => {
    const user = userFactory();

    it('throws unprocessable entity error', (done) => {
      request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'unique.user@gmail.com', password: user.password })
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(422);
          done();
        });
    });
  });
});
