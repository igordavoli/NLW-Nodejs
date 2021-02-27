import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe('User', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  })


  it("Should be able to create a new user", async () => {
    const res = await request(app).post('/users')
      .send({
        email: "ioio@dodo.com",
        name: "ioio"
      });

    expect(res.status).toBe(201);
  })

  it("Should not to create a user with exests email", async () => {
    const res = await request(app).post('/users')
      .send({
        email: "ioio@dodo.com",
        name: "ioio"
      });
    expect(res.status).toBe(400);
  })
})