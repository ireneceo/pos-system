// @ts-check
/**
 * 안드로이드 앱 업데이트 안내 — 앱 조건 모의 (Fable 설계 .claude/fable-design-20261004-android-update.md §7-1)
 * 브라우저에 앱 브릿지(__PURPLE_DESKTOP·__NATIVE_PRINT·__NATIVE_UPDATE)를 흉내 내고 피드를 route 로 바꿔 끼운다.
 * 실제 다운로드·설치는 실기기에서만(§7-2) — 여기서는 화면 분기만.
 */
const { test, expect } = require('@playwright/test');
const { demoLogin, assertDevBaseURL } = require('./fixtures/demo-guard');

const SHA = 'a'.repeat(64);
const FEED = { versionName: '0.3.1', versionCode: 4, file: 'PurplePOS-0.3.1.apk', sha256: SHA, size: 3000000 };

async function openAsApp(page, request, baseURL, { feedStatus = 200, nativeUpdate = null } = {}) {
  const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
  await page.route('**/desktop/android-latest.json', (r) => feedStatus === 200
    ? r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FEED) })
    : r.fulfill({ status: feedStatus, body: '' }));
  await page.addInitScript(([t, role, nu]) => {
    if (!localStorage.getItem('auth_token')) { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', role); localStorage.setItem('i18nextLng', 'en'); }
    window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' };
    window.__NATIVE_PRINT = { available: true, version: '0.2.0' };
    if (nu === 'sha') window.__NATIVE_UPDATE = { available: true, install: async () => ({ ok: false, error: 'SHA_MISMATCH' }) };
  }, [token, user.role, nativeUpdate]);
  await page.goto(`/restaurant/${user.restaurant_id}/dashboard`);
  await page.waitForLoadState('networkidle');
}

test.describe('안드로이드 앱 업데이트 안내', () => {
  test('0.2.0 앱 + 피드 0.3.1 → 배너 · 나중에 → 사라지고 기록', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    await openAsApp(page, request, baseURL);
    const banner = page.getByTestId('native-update-banner');
    await expect(banner).toBeVisible({ timeout: 15000 });
    await expect(banner).toContainText('0.3.1');
    await expect(banner).toContainText('0.2.0');
    await banner.getByRole('button', { name: 'Later' }).last().click();
    await expect(banner).toHaveCount(0);
    const d = await page.evaluate(() => JSON.parse(localStorage.getItem('pos.native-update.dismissed') || 'null'));
    expect(d && d.version).toBe('0.3.1');
    await page.reload(); await page.waitForLoadState('networkidle'); await page.waitForTimeout(1500);
    await expect(page.getByTestId('native-update-banner')).toHaveCount(0);
  });

  test('피드 404 → 배너 없음', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    await openAsApp(page, request, baseURL, { feedStatus: 404 });
    await page.waitForTimeout(2500);
    await expect(page.getByTestId('native-update-banner')).toHaveCount(0);
  });

  test('앱 설치 기능이 SHA_MISMATCH → 오류 문구', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    await openAsApp(page, request, baseURL, { nativeUpdate: 'sha' });
    const banner = page.getByTestId('native-update-banner');
    await expect(banner).toBeVisible({ timeout: 15000 });
    await banner.getByRole('button', { name: 'Update' }).click();
    await expect(banner).toContainText('SHA_MISMATCH');
  });

  test('브라우저(앱 아님) → 배너 없음 · 피드 요청 0', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    let feedCalls = 0;
    await page.route('**/desktop/android-latest.json', (r) => { feedCalls++; r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FEED) }); });
    await page.addInitScript(([t, role]) => { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', role); }, [token, user.role]);
    await page.goto(`/restaurant/${user.restaurant_id}/dashboard`);
    await page.waitForLoadState('networkidle'); await page.waitForTimeout(1500);
    await expect(page.getByTestId('native-update-banner')).toHaveCount(0);
    expect(feedCalls).toBe(0);
  });
});
