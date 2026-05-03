// IDOR (cross-tenant) contract tests — confirms RA cannot read other restaurants.
// Why: prevents the v3.21 IDOR sweep regressions.

const { http, login } = require('./_helpers');

let raToken;
let rpToken;

beforeAll(async () => {
  const ra = await login('irene-ref1@purplehere.com', 'Test1234!');
  raToken = ra.body?.data?.token;
  const rp = await login('irene-rp@purplehere.com', 'Test1234!');
  rpToken = rp.body?.data?.token;
});

describe('IDOR — Restaurant Admin cross-tenant', () => {
  test('RA cannot read invoices of another restaurant', async () => {
    const r = await http('get', '/api/invoices/restaurant/9999').set('Authorization', `Bearer ${raToken}`);
    expect([401, 403, 404]).toContain(r.status);
  });

  test('RA cannot access settings of another restaurant', async () => {
    const r = await http('get', '/api/invoices/settings/9999').set('Authorization', `Bearer ${raToken}`);
    expect([401, 403, 404]).toContain(r.status);
  });

  test('RA cannot mutate update-payer of another restaurant', async () => {
    const r = await http('put', '/api/invoices/update-payer/9999')
      .set('Authorization', `Bearer ${raToken}`)
      .send({ payment_model: 'foodcourt' });
    expect([401, 403, 404]).toContain(r.status);
  });
});

describe('IDOR — Referral Partner cannot crash on POS endpoints', () => {
  test('RP /api/restaurants → 200/403 (no crash)', async () => {
    const r = await http('get', '/api/restaurants').set('Authorization', `Bearer ${rpToken}`);
    expect([200, 403]).toContain(r.status);
  });

  test('RP /api/referrals/dashboard → 200 (own scope)', async () => {
    const r = await http('get', '/api/referrals/dashboard').set('Authorization', `Bearer ${rpToken}`);
    expect(r.status).toBe(200);
  });
});
