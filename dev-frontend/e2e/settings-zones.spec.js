// @ts-check
/**
 * 시나리오 e — Settings zones & groups + table QR (CLAUDE.md /검증 §11 e)
 * ------------------------------------------------------------------
 * demo rid=38 만. zone/group 구조는 Floor Plan 렌더(시나리오 d)로 커버하고,
 * 여기선 되돌릴 수 있는 결정적 부분 = 테이블 QR 세션 CRUD 를 실 API 로 태운다.
 *   1) Settings UI mount (crash 0) + 설정 탭 렌더
 *   2) 테이블 QR: 생성(201, qr_url) → 조회(active) → 삭제(만료) — demo 테이블 S-T001
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDemoContext, apiBase, authHeaders, bodyLooksCrashed } = require('./fixtures/demo-guard');

const TABLE = 'S-T001';

test.describe('e) Settings — 설정 mount + 테이블 QR CRUD', () => {
  test('Settings mount (crash 0) — 설정 탭 렌더', async ({ page, request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    await page.context().addInitScript(([t, r]) => {
      localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
    }, [token, 'Restaurant Admin']);
    const pageErrors = [];
    page.on('pageerror', (e) => pageErrors.push(String(e)));

    await page.goto(`/restaurant/${user.restaurant_id}/settings`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800);
    const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 5000);
    expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
    expect(bodyLooksCrashed(body), 'ErrorBoundary/크래시').toBeFalsy();
    expect(body, '설정 섹션').toContain('Store Settings');
    expect(body, '설정 탭(Store Info)').toContain('Store Info');
  });

  test('테이블 QR 세션 CRUD — 생성→조회→삭제 (API 결정적)', async ({ request, baseURL }) => {
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    assertDemoContext(baseURL, user);
    const base = apiBase(baseURL) + `/restaurants/${user.restaurant_id}/tables/${TABLE}/qr`;
    const H = authHeaders(token);

    try {
      // 생성 → 201 + qr_url + token
      const create = await request.post(base, { headers: H, data: {} });
      expect(create.status(), 'QR 생성 201').toBe(201);
      const cb = await create.json();
      expect(cb?.data?.token, 'QR token').toBeTruthy();
      expect(cb?.data?.qr_url, 'QR url').toContain('/mobile/');

      // 조회 → active 세션(같은 token)
      const get = await request.get(base, { headers: H });
      expect(get.status(), 'QR 조회 200').toBe(200);
      const gb = await get.json();
      expect(gb?.data?.token, '조회 token 일치').toBe(cb.data.token);
    } finally {
      // 삭제(만료) — 정리
      const del = await request.delete(base, { headers: H });
      expect([200, 204], 'QR 삭제').toContain(del.status());
    }
  });
});
