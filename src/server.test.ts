import supertest from 'supertest';

import { server } from './server';
const request = supertest(server);

describe('/ping', () => {
  afterAll(() => {
    server.close();
  });

  it("should return a 200", async () => {
    const resp = await request.get("/ping");

    // Assert
    expect(resp.status).toBe(200);
  });
});
