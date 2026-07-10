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
