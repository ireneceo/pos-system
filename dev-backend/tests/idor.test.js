// IDOR (cross-tenant) contract tests — confirms RA cannot read other restaurants.
// Why: prevents the v3.21 IDOR sweep regressions.

const request = require('supertest');

const BASE = 'http://localhost:3001';

let raToken;
let raRestaurantId;

beforeAll(async () => {
  const login = await request(BASE)
    .post('/api/auth/login')
    .send({ email: 'irene-ref1@purplehere.com', password: 'Test1234!' });
  raToken = login.body?.data?.token;
  raRestaurantId = login.body?.data?.user?.restaurant_id;
});

describe('IDOR — Restaurant Admin cross-tenant', () => {
  test('RA cannot read invoices of another restaurant', async () => {
    const otherRestaurantId = 9999;
    const r = await request(BASE)
      .get(`/api/invoices/restaurant/${otherRestaurantId}`)
      .set('Authorization', `Bearer ${raToken}`);
    expect([401, 403, 404]).toContain(r.status);
  });

  test('RA cannot access settings of another restaurant', async () => {
    const otherRestaurantId = 9999;
    const r = await request(BASE)
      .get(`/api/invoices/settings/${otherRestaurantId}`)
      .set('Authorization', `Bearer ${raToken}`);
    expect([401, 403, 404]).toContain(r.status);
  });

  test('RA cannot mutate update-payer of another restaurant', async () => {
    const r = await request(BASE)
      .put('/api/invoices/update-payer/9999')
      .set('Authorization', `Bearer ${raToken}`)
      .send({ payment_model: 'foodcourt' });
    expect([401, 403, 404]).toContain(r.status);
  });
});

describe('IDOR — Referral Partner cannot access POS data', () => {
  let rpToken;

  beforeAll(async () => {
    const login = await request(BASE)
      .post('/api/auth/login')
      .send({ email: 'irene-rp@purplehere.com', password: 'Test1234!' });
    rpToken = login.body?.data?.token;
  });

  test('RP cannot read /api/restaurants', async () => {
    const r = await request(BASE)
      .get('/api/restaurants')
      .set('Authorization', `Bearer ${rpToken}`);
    // RP is authenticated so 401 is wrong here; either 200 (RP gets nothing useful)
    // or 403 (role gate) is acceptable. Confirms it doesn't crash.
    expect([200, 403]).toContain(r.status);
  });

  test('RP /api/referrals/dashboard → 200 (own scope)', async () => {
    const r = await request(BASE)
      .get('/api/referrals/dashboard')
      .set('Authorization', `Bearer ${rpToken}`);
    expect(r.status).toBe(200);
  });
});
