// node_api/src/index.test.ts
import request from 'supertest';
import app from '../src';

describe('GET /status', () => {
  it('should return 200 OK with status message', async () => {
    const res = await request(app).get('/status');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("Node.js API is running");
  });
});

describe('GET /data', () => {
  it('should return 200 OK with data message', async () => {
    const res = await request(app).get('/data');
    expect(res.status).toBe(200);
    expect(res.body.data).toBe("Here is some data from the Node.js API");
  });
});