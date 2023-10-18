import { expect } from 'chai';
import request from 'supertest';

import dbClient from '@/config/prismaDatabase';
import app, { server } from '../../server';

describe('User Creation test', () => {
  afterEach(async () => {
    await dbClient.user.deleteMany();
    server.close();
  });

  it('should create the user', (done) => {
    request(app)
      .post('/api/v1/users')
      .send({ email: 'random_jude@gmail.com', password: 'random@123', name: 'random jude' })
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.name).to.be.equal('random jude');
        expect(res.body).to.not.haveOwnProperty('password');
        expect(res.body.email).to.be.equal('random_jude@gmail.com');
        done();
      });
  });
});
