// @ts-check
/**
 * 사이드바 역할 거부 — 브랜드 매니저에게 "Payment Settings" 메뉴가 보이지 않는다.
 * ---------------------------------------------------------------------------
 * 배경 (2026-09-06 Fable 게이트에서 잡힘):
 *   결제 설정은 **돈 경계**다 — 서버(`brands-core.js` payment-settings GET/PUT)가 Brand Manager 를
 *   일부러 403 으로 막는다(Stripe/PayPal·은행계좌·구독금액). 그런데 화면만 열려 있었다.
 *   숨기려고 `AuthContext.canAccessRoute` 만 고치고 "메뉴가 사라진다"고 보고했는데,
 *   **사이드바 표시를 정하는 것은 `hooks/useAllowedRoutes.isRouteAllowed`(플랜 기반 서버 목록)** 였다.
 *   결과: 메뉴는 그대로 보이고 누르면 대시보드로 튕겼다. 코드만 보고 "숨겨진다"고 쓴 것이 원인.
 *   → 이 spec 은 **화면에 실제로 있는지 없는지**를 본다. 코드 검사는 health-check 가 따로 한다.
 *
 * ⛔ Brand Manager 용 demo-login 키는 **일부러 만들지 않는다** — 비밀번호 없는 공개 로그인 경로를
 *    늘리는 것은 보안 경계 확대다. 대신 이 테스트 안에서만 토큰을 만든다(개발기 전용,
 *    demo-guard 가 baseURL 이 dev 인지 먼저 확인한다).
 */
const { test, expect } = require('@playwright/test');
const { assertDevBaseURL, bodyLooksCrashed } = require('./fixtures/demo-guard');

const MENU = 'Payment Settings';

/** 개발기 백엔드의 비밀키로 토큰을 만든다(테스트 전용). */
function devToken(userId) {
  const path = require('path');
  const envPath = '/var/www/dev-backend/.env';
  require('dotenv').config({ path: envPath });
  const jwt = require(path.join('/var/www/dev-backend/node_modules', 'jsonwebtoken'));
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '10m' });
}

async function sidebarText(page, token, role, landing) {
  await page.context().addInitScript(([t, r]) => {
    localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', r);
  }, [token, role]);
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(landing, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2200);

  // ⚠ 사이드바는 **접혀 있다** — 섹션 이름만 보이고 항목은 펼쳐야 나온다.
  //   이걸 안 하면 BM 쪽 단언이 **공허하게 통과**한다(항목이 원래 안 보이니까).
  //   2026-09-06 실측으로 잡았다 — BG 대조군이 같이 실패해서 드러났다.
  const section = page.getByText('Plans & Payments', { exact: false }).first();
  if (await section.count()) { await section.click(); await page.waitForTimeout(900); }

  const body = await page.evaluate(() => document.body?.innerText || '');
  expect(errors, `pageerror: ${errors.slice(0, 1)}`).toHaveLength(0);
  expect(bodyLooksCrashed(body), 'ErrorBoundary/크래시').toBeFalsy();
  // 섹션 자체가 안 보이면 이 테스트는 아무것도 증명하지 못한다 — 통과시키지 않는다.
  expect(body, '"Plans & Payments" 섹션이 사이드바에 있어야 이 테스트가 의미를 가진다')
    .toContain('Plans & Payments');
  return body;
}

test.describe('사이드바 역할 거부 — 결제 설정(돈 경계)', () => {
  test('Brand Manager 사이드바에 "Payment Settings" 가 없다', async ({ page, baseURL }) => {
    assertDevBaseURL(baseURL);
    // dev BM: john@manager.com (id 2, brand_id 1, is_test)
    const body = await sidebarText(page, devToken(2), 'Brand Manager', '/pos/brand-menus');
    expect(body, `BM 사이드바에 "${MENU}" 가 보이면 안 된다 — 서버가 403 으로 막는 화면이다`)
      .not.toContain(MENU);
  });

  // ⚠ 이 테스트는 **대조군**이다 — 없어서는 안 된다.
  //   BM 쪽만 있으면 사이드바가 통째로 안 그려져도 "없다"로 통과해 버린다(공허한 통과).
  //   BG 에서 같은 메뉴가 **보이는 것**까지 확인해야 "거부가 BM 에게만 걸렸다"가 증명된다.
  //   demo-login 은 test_brand_general 이 403 이라(로그인 게이트, 이 변경과 무관) 같은 방식으로 토큰을 만든다.
  test('Brand General 사이드바에는 "Payment Settings" 가 있다 (거부가 넓게 먹지 않는다)', async ({ page, baseURL }) => {
    assertDevBaseURL(baseURL);
    // dev BG: brand_general@orderhere.center (id 6, brand_id 1)
    const body = await sidebarText(page, devToken(6), 'Brand General', '/pos/brand-menus');
    expect(body, `BG 사이드바에는 "${MENU}" 가 있어야 한다 — 거부는 BM 에게만 적용된다`)
      .toContain(MENU);
  });
});
