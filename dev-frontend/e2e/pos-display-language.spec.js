// @ts-check
/**
 * 2026-10-04 Irene 「듀얼 아니면 고객화면 안열려야 · 고객 디스플레이도 대시보드로 가기 · 한글로 설정했는데 포스터미널만 영어」
 * 1) 화면 1개(screen.isExtended 없음/false) — POS 를 눌러도 고객 화면이 자동으로 안 열린다 / 2개면 열린다(반증)
 * 2) 고객 화면이 기기 화면을 차지하면(opener 없음) «대시보드» 버튼 → 대시보드로 이동
 * 3) 기기에서 한국어를 골랐으면 계정 언어가 en 이어도 POS 가 한국어(세션 복원이 기기 선택을 덮지 않음)
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, bodyLooksCrashed } = require('./fixtures/demo-guard');

async function asAdmin(page, request, baseURL, extra) {
  const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
  await page.context().addInitScript(([t, x]) => {
    localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Restaurant Admin');
    if (x && x.lang) localStorage.setItem('i18nextLng', x.lang);
    if (x && x.extended) Object.defineProperty(window.screen, 'isExtended', { get: () => true });
  }, [token, extra || null]);
  return user;
}

test('화면 1개 — POS 눌러도 고객 화면 자동 안 열림', async ({ page, request, baseURL }) => {
  const user = await asAdmin(page, request, baseURL);
  const popups = []; page.context().on('page', (p) => popups.push(p.url()));
  await page.goto(`/restaurant/${user.restaurant_id}/pos-terminal`, { waitUntil: 'networkidle' });
  await page.mouse.click(400, 300); await page.waitForTimeout(2500);
  expect(popups, `열린 창: ${popups}`).toHaveLength(0);
});

test('화면 2개(반증) — POS 누르면 고객 화면 열림', async ({ page, request, baseURL }) => {
  const user = await asAdmin(page, request, baseURL, { extended: true });
  const popups = []; page.context().on('page', (p) => popups.push(p.url()));
  await page.goto(`/restaurant/${user.restaurant_id}/pos-terminal`, { waitUntil: 'networkidle' });
  await page.mouse.click(400, 300); await page.waitForTimeout(3000);
  expect(popups.some((u) => /checkout-display/.test(u)), `열린 창: ${popups}`).toBeTruthy();
});

test('고객 화면이 기기 화면 차지 — 대시보드 버튼으로 나감', async ({ page, request, baseURL }) => {
  const user = await asAdmin(page, request, baseURL);
  await page.goto(`/restaurant/${user.restaurant_id}/checkout-display`, { waitUntil: 'networkidle' });
  const btn = page.getByRole('button', { name: 'Dashboard' });
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(page).toHaveURL(new RegExp(`/restaurant/${user.restaurant_id}/dashboard`));
});

test('모니터 2대(반증) — 손님 화면에는 대시보드 버튼 없음', async ({ page, request, baseURL }) => {
  const user = await asAdmin(page, request, baseURL, { extended: true });
  await page.goto(`/restaurant/${user.restaurant_id}/checkout-display`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await expect(page.getByRole('button', { name: 'Dashboard' })).toHaveCount(0);
});

test('기기 언어 한국어 — 계정 en 이어도 POS 한국어', async ({ page, request, baseURL }) => {
  const user = await asAdmin(page, request, baseURL, { lang: 'ko' });
  await page.goto(`/restaurant/${user.restaurant_id}/pos-terminal`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);
  const body = (await page.evaluate(() => document.body?.innerText || '')).slice(0, 8000);
  expect(bodyLooksCrashed(body)).toBeFalsy();
  expect(body, '지금 결제').toContain('지금 결제');
  expect(body, '매장식사').toContain('매장식사');
  expect(body).not.toContain('Pay Now');
});
