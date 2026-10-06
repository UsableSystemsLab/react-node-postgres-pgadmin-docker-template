import express from 'express';
import request from 'supertest';
import apiRoutes from '../index.js';

function buildApp() {
  const app = express();
  app.use(express.json());
  const router = express.Router();
  apiRoutes(router);
  app.use('/api', router);
  return app;
}

describe('routes/index.js', () => {
  let app;
  beforeAll(() => {
    app = buildApp();
  });

  it('GET /api/health returns 200 with healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'Healthy' });
  });

  it('GET /api/unknown-path returns 404', async () => {
    const res = await request(app).get('/api/unknown-path');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Not Found' });
  });
});
