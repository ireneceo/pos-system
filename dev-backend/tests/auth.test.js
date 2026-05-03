// Auth contract tests — hits running dev-backend (port 3001).
// Why: validates login/JWT path + 401 surface area.

const { http, login } = require('./_helpers');

describe('Auth — login', () => {
  test('valid Restaurant Admin credentials → 200 + token', async () => {
    const r = await login('irene-ref1@purplehere.com', 'Test1234!');
    expect(r.status).toBe(200);
    expect(r.body?.data?.token).toBeTruthy();
    expect(r.body?.data?.user?.role).toBe('Restaurant Admin');
  });

  test('valid Referral Partner credentials → 200 + RP role', async () => {
    const r = await login('irene-rp@purplehere.com', 'Test1234!');
    expect(r.status).toBe(200);
    expect(r.body?.data?.user?.role).toBe('Referral Partner');
  });

  test('wrong password → 401', async () => {
    const r = await login('irene-ref1@purplehere.com', 'wrong');
    expect(r.status).toBe(401);
  });

  test('non-existent user → 401', async () => {
    const r = await login('doesnotexist@example.com', 'whatever');
    expect(r.status).toBe(401);
  });
});

describe('Auth — anonymous protected endpoints', () => {
  test('GET /api/restaurants without token → 401', async () => {
    const r = await http('get', '/api/restaurants');
    expect(r.status).toBe(401);
  });

  test('GET /api/invoices without token → 401', async () => {
    const r = await http('get', '/api/invoices');
    expect(r.status).toBe(401);
  });

  test('GET /api/brands without token → 401', async () => {
    const r = await http('get', '/api/brands');
    expect(r.status).toBe(401);
  });

  test('GET /api/foodcourts without token → 401', async () => {
    const r = await http('get', '/api/foodcourts');
    expect(r.status).toBe(401);
  });
});

describe('Auth — invalid token', () => {
  test('garbage token → 403 (Invalid token)', async () => {
    const r = await http('get', '/api/restaurants').set('Authorization', 'Bearer garbage.token.value');
    expect(r.status).toBe(403);
  });
});
