// Auth contract tests — hits the running dev-backend (port 3001).
// Why: validates login/JWT path + 401 surface area without spinning up a separate server.

const request = require('supertest');

const BASE = 'http://localhost:3001';

describe('Auth — login', () => {
  test('valid Restaurant Admin credentials → 200 + token', async () => {
    const r = await request(BASE)
      .post('/api/auth/login')
      .send({ email: 'irene-ref1@purplehere.com', password: 'Test1234!' });
    expect(r.status).toBe(200);
    expect(r.body?.data?.token).toBeTruthy();
    expect(r.body?.data?.user?.role).toBe('Restaurant Admin');
  });

  test('valid Referral Partner credentials → 200 + token + RP role', async () => {
    const r = await request(BASE)
      .post('/api/auth/login')
      .send({ email: 'irene-rp@purplehere.com', password: 'Test1234!' });
    expect(r.status).toBe(200);
    expect(r.body?.data?.user?.role).toBe('Referral Partner');
  });

  test('wrong password → 401', async () => {
    const r = await request(BASE)
      .post('/api/auth/login')
      .send({ email: 'irene-ref1@purplehere.com', password: 'wrong' });
    expect(r.status).toBe(401);
  });

  test('non-existent user → 401', async () => {
    const r = await request(BASE)
      .post('/api/auth/login')
      .send({ email: 'doesnotexist@example.com', password: 'whatever' });
    expect(r.status).toBe(401);
  });
});

describe('Auth — anonymous protected endpoints', () => {
  test('GET /api/restaurants without token → 401', async () => {
    const r = await request(BASE).get('/api/restaurants');
    expect(r.status).toBe(401);
  });

  test('GET /api/invoices without token → 401', async () => {
    const r = await request(BASE).get('/api/invoices');
    expect(r.status).toBe(401);
  });

  test('GET /api/brands without token → 401', async () => {
    const r = await request(BASE).get('/api/brands');
    expect(r.status).toBe(401);
  });

  test('GET /api/foodcourts without token → 401', async () => {
    const r = await request(BASE).get('/api/foodcourts');
    expect(r.status).toBe(401);
  });
});

describe('Auth — invalid token', () => {
  test('garbage token → 403 (Invalid token)', async () => {
    const r = await request(BASE)
      .get('/api/restaurants')
      .set('Authorization', 'Bearer garbage.token.value');
    expect(r.status).toBe(403);
  });
});
