// Suspended account UX contract tests (v3.21 design — see reference_suspended_pin).

const { http, login } = require('./_helpers');
const { sequelize } = require('../config/database');

afterAll(async () => {
  await sequelize.close();
});

describe('Suspended UX — login does not block', () => {
  test('Login response contains restaurantStatus + restaurantName fields', async () => {
    const r = await login('irene-ref1@purplehere.com', 'Test1234!');
    expect(r.status).toBe(200);
    const u = r.body?.data?.user;
    expect(u).toBeTruthy();
    expect('restaurantStatus' in u).toBe(true);
    expect('restaurantIsDemo' in u).toBe(true);
    expect('restaurantIsTest' in u).toBe(true);
    expect('subscription_status' in u).toBe(true);
  });

  test('Referral Partner login → restaurantStatus null', async () => {
    const r = await login('irene-rp@purplehere.com', 'Test1234!');
    expect(r.status).toBe(200);
    const u = r.body?.data?.user;
    expect(u.role).toBe('Referral Partner');
    expect(u.restaurantStatus).toBeNull();
  });
});

describe('Suspended UX — /auth/me surfaces same fields', () => {
  test('GET /auth/me returns restaurantStatus + is_demo + is_test', async () => {
    const lr = await login('irene-ref1@purplehere.com', 'Test1234!');
    const token = lr.body?.data?.token;
    const me = await http('get', '/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(me.status).toBe(200);
    const u = me.body?.data;
    expect('restaurantStatus' in u).toBe(true);
    expect('is_demo' in u).toBe(true);
    expect('is_test' in u).toBe(true);
  });
});
