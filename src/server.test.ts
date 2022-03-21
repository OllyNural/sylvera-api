import supertest from 'supertest';

import { server } from './server';
const request = supertest(server);

describe('/healthcheck', () => {
  afterAll(() => {
    server.close();
  });

  it("should return a 200", async () => {
    const resp = await request.get("/healthcheck");

    // Assert
    expect(resp.status).toBe(200);
  });
});
