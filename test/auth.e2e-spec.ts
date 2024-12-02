import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { send } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a sign up request', async () => {
    const email = 'asdf@1asdf.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdfg' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'barbosa@getMaxListeners.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'buceTaBonita' })
      .expect(201);

    const cookie = res.get('Set-Cookie');

    console.log(cookie);
    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
