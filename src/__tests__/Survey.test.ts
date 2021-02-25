import { response } from 'express';
import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new survey', async () => {
    const res = await request(app).post('/surveys')
      .send({
        title: "Title Exemple",
        description: "Exemple"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id')
  })

  it('Should be able to get all surveys', async () => {
    await request(app).post('/surveys')
      .send({
        title: "Title Exemple2",
        description: "Exemple2"
      });

    const res = await request(app).get('/surveys')

    expect(res.body.length).toBe(2);

  })
}) 