// @ts-check
/**
 * 시나리오 a — auth roles: 역할별 로그인 + 권한 라우팅 분기 (CLAUDE.md /검증 §11 a)
 * 읽기 전용(데이터 무변경) — demo/test 계정으로 로그인해 역할별 착지/접근을 검증.
 * demo-login 은 API 인증이지만, 토큰 주입 후 실 브라우저에서 역할 대시보드가 크래시 없이
 * mount 되는지까지 확인(= UI e2e). mutation 없음.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, storageStateFor, assertDevBaseURL } = require('./fixtures/demo-guard');

// 역할별 (demo-login 키, 로컬스토리지 role 문자열, 로그인 후 도달 경로 조각)
const ROLES = [
  { key: 'test_restaurant_admin', role: 'Restaurant Admin',  landing: '/restaurant/' },
  { key: 'test_brand_general',    role: 'Brand General',     landing: '/pos/brand' },
  { key: 'test_foodcourt_general',role: 'Foodcourt General', landing: '/pos/foodcourt' },
  { key: 'test_restaurant_owner', role: 'Restaurant Owner',  landing: '/pos/owner' },
  { key: 'demo_supplier_admin',   role: 'Supplier Admin',    landing: '/pos/supplier' },
];

test.describe('a) auth roles — 역할별 로그인 + 권한 분기', () => {
  for (const r of ROLES) {
    test(`${r.role} 로그인 → 대시보드 mount (크래시 0)`, async ({ page, request, baseURL }) => {
      assertDevBaseURL(baseURL);
      const { token, user } = await demoLogin(request, baseURL, r.key);
      expect(token, 'demo-login 토큰').toBeTruthy();
      expect(user.role, '응답 역할').toBeTruthy();

      // 토큰 주입 후 대시보드 진입
      await page.context().addInitScript(([tok, role]) => {
        localStorage.setItem('auth_token', tok);
        localStorage.setItem('currentUserRole', role);
      }, [token, r.role]);

      const pageErrors = [];
      page.on('pageerror', (e) => pageErrors.push(String(e)));

      // 역할 홈으로 이동(RA 는 restaurant/:id, 나머지는 role 홈). SPA 리다이렉트를 따른다.
      const start = r.role === 'Restaurant Admin' ? `/restaurant/${user.restaurant_id}/dashboard` : r.landing.replace(/\/$/, '') + '/dashboard';
      await page.goto(start, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);

      // ErrorBoundary fallback / 크래시 없어야
      const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 4000);
      const crashed = ['Something went wrong', 'ErrorBoundary', 'Application error', 'TypeError:'].some((m) => body.includes(m));
      expect(pageErrors, `pageerror: ${pageErrors.slice(0, 1)}`).toHaveLength(0);
      expect(crashed, 'ErrorBoundary/크래시 마커').toBeFalsy();
      // 로그인 페이지로 튕기지 않았는지(=권한 있는 착지)
      expect(page.url(), '로그인으로 리다이렉트되지 않음').not.toContain('/login');
    });
  }
});

/**
 * 세션 복원력 (2026-07-11 회귀 박제).
 * 부팅 시 /api/auth/me 는 네트워크 사정으로 실패할 수 있다(서비스워커 콜드 스타트, 매장 wifi 순단
 * → fetch 가 TypeError 로 throw). 예전엔 그걸 "토큰 만료"로 오인해 즉시 폐기 → 멀쩡한 사용자가
 * 로그인 화면으로 튕겼다. 계약: 네트워크 오류는 재시도하고 토큰을 유지, 401/403 일 때만 로그아웃.
 */
test.describe('a-2) 세션 복원력 — /auth/me 일시 실패에 로그아웃되지 않는다', () => {
  test('네트워크 오류 1회 → 토큰 유지 + 재시도로 진입', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token } = await demoLogin(request, baseURL, 'test_brand_general');
    await page.context().addInitScript((tok) => {
      localStorage.setItem('auth_token', tok);
      localStorage.setItem('currentUserRole', 'Brand General');
    }, token);

    let calls = 0;
    await page.route('**/api/auth/me', async (route) => {
      calls += 1;
      if (calls === 1) return route.abort('failed'); // 첫 호출만 네트워크 오류
      return route.continue();
    });

    await page.goto('/pos/brand/general/dashboard', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2500);

    const kept = await page.evaluate(() => (localStorage.getItem('auth_token') || '').length > 0);
    expect(kept, '네트워크 오류에 토큰을 지우면 안 됨').toBeTruthy();
    expect(calls, '재시도가 실제로 일어남').toBeGreaterThan(1);
    expect(page.url(), '로그인으로 튕기지 않음').not.toContain('/login');
  });

  test('401 → 토큰 폐기 (만료 세션은 여전히 로그아웃)', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token } = await demoLogin(request, baseURL, 'test_brand_general');
    await page.context().addInitScript((tok) => {
      localStorage.setItem('auth_token', tok);
      localStorage.setItem('currentUserRole', 'Brand General');
    }, token);

    await page.route('**/api/auth/me', (route) =>
      route.fulfill({ status: 401, contentType: 'application/json', body: JSON.stringify({ success: false }) }));

    await page.goto('/pos/brand/general/dashboard', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4000);

    const cleared = await page.evaluate(() => (localStorage.getItem('auth_token') || '').length === 0);
    expect(cleared, '서버가 거부한 토큰은 폐기해야 함').toBeTruthy();
  });
});
