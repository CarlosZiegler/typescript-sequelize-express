import * as request from 'supertest';
import app from '../app';

describe('GET /api', () => {
  it('should return 400 (bad request) if called without user)', (done) => {
    return request(app).post('/auth/login').expect(400, done);
  });
});

describe('POST /login', () => {
  it('should return unauthorized with not valid user', async (done) => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'any@gmail.com', password: '0000' });
    done();

    expect(response.status).toBe(401);
  });
});
describe('POST /login', () => {
  it('should return token with valid user', async (done) => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'jonas@gmail.com', password: '1212' });
    done();

    expect(response.body).toHaveProperty('token');
  });
});
