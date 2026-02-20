import request from 'supertest';
import { Test } from '@nestjs/testing';
import { LeaguesModule } from './leagues.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [LeaguesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET leagues', () => {
    return request(app.getHttpServer())
      .get('/leagues')
      .expect(200) // Assert status code
      .expect('Content-Type', /json/) // Assert content type is JSON
      .expect((response) => {
        // Assert the body is an object and has specific properties
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('leagues', '{}');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
