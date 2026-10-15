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

async function openAsApp(page, request, baseURL, { feedStatus = 200, nativeUpdate = null, installer = null } = {}) {
  const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
  await page.route('**/desktop/android-latest.json', (r) => feedStatus === 200
    ? r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FEED) })
    : r.fulfill({ status: feedStatus, body: '' }));
  await page.addInitScript(([t, role, nu, inst]) => {
    if (!localStorage.getItem('auth_token')) { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', role); localStorage.setItem('i18nextLng', 'en'); }
    window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' };
    window.__NATIVE_PRINT = { available: true, version: '0.2.0', installer: inst };
    if (nu === 'sha') window.__NATIVE_UPDATE = { available: true, install: async () => ({ ok: false, error: 'SHA_MISMATCH' }) };
  }, [token, user.role, nativeUpdate, installer]);
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

  test('브릿지가 화면보다 늦게 들어와도(실기기 순서) 배지·카드가 뜬다', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    const { token, user } = await demoLogin(request, baseURL, 'demo_restaurant_admin');
    await page.route('**/desktop/android-latest.json', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FEED) }));
    await page.addInitScript(([t, role]) => {
      if (!localStorage.getItem('auth_token')) { localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', role); localStorage.setItem('i18nextLng', 'en'); }
      // MainActivity onPageLoaded 처럼 «다 그려진 뒤» 끼워 넣는다
      setTimeout(() => {
        window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' };
        window.__NATIVE_PRINT = { available: true, version: null };
        setTimeout(() => { window.__NATIVE_PRINT.version = '0.2.0'; }, 1000);
      }, 2000);
    }, [token, user.role]);
    await page.goto(`/restaurant/${user.restaurant_id}/dashboard`);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=app v0.2.0')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('native-update-banner')).toBeVisible({ timeout: 15000 });
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

  // 2026-10-12 Play 등록 D3 — Play 설치본은 카드가 Play 를 연다(APK 를 받게 하지 않는다)
  test('Play 설치본 → 업데이트 누르면 Play 앱 페이지로', async ({ page, request, baseURL }) => {
    assertDevBaseURL(baseURL);
    await openAsApp(page, request, baseURL, { installer: 'com.android.vending' });
    const banner = page.getByTestId('native-update-banner');
    await expect(banner).toBeVisible({ timeout: 15000 });
    let asked = null;
    await page.route('https://play.google.com/**', (r) => { asked = r.request().url(); r.fulfill({ status: 200, contentType: 'text/html', body: 'play' }); });
    await page.route('**/desktop/PurplePOS*.apk', (r) => { throw new Error('Play 설치본이 APK 를 요청했다: ' + r.request().url()); });
    await banner.getByRole('button', { name: 'Update' }).click();
    await expect.poll(() => asked, { timeout: 10000 }).toContain('play.google.com/store/apps/details?id=com.purplehere.pos.mobile');
  });

  // 2026-10-12 Play 등록 D6 — 앱 안 로그인·비밀번호 찾기에는 가입·홈 길이 없다(브라우저에는 그대로)
  test('앱 안 /pos · /forgot-password → 가입·홈 링크 0, 브라우저 → 그대로', async ({ page, baseURL }) => {
    assertDevBaseURL(baseURL);
    await page.addInitScript(() => { window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' }; });
    for (const path of ['/pos', '/forgot-password']) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('a[href="/signup"]')).toHaveCount(0);
      await expect(page.locator('a[href="/"]')).toHaveCount(0);
    }
  });

  test('브라우저 /pos → 가입 링크 있음 (숨김은 앱 안에서만)', async ({ page, baseURL }) => {
    assertDevBaseURL(baseURL);
    await page.goto('/pos');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('a[href="/signup"]').first()).toBeVisible();
  });

  test('/account-deletion 공개 페이지 — 로그인 없이 열림 · 삭제 메일 주소', async ({ page, baseURL }) => {
    assertDevBaseURL(baseURL);
    await page.goto('/account-deletion');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('Delete your PurpleHere account');
    await expect(page.locator('main a[href^="mailto:help@gitconsulting.group"]')).toHaveCount(1); // 바닥글 연락처는 제외
  });

  // 2026-10-15 — 앱 브릿지가 «다 그려진 뒤» 들어와도 앱 안에서는 «Download for Android» 안내가 안 뜬다(Play 정책)
  test('브릿지가 늦게 들어와도 앱 안 /pos 에 앱 내려받기 안내 없음', async ({ browser, baseURL }) => {
    assertDevBaseURL(baseURL);
    const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Linux; Android 16; Pixel Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
    const page = await ctx.newPage();
    await page.addInitScript(() => { setTimeout(() => { window.__PURPLE_DESKTOP = { isDesktop: true, platform: 'android' }; }, 2000); });
    await page.goto('/pos');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);
    await expect(page.getByText('Download for Android')).toHaveCount(0);
    await ctx.close();
  });

  test('반증: 안드로이드 브라우저(앱 아님) /pos 에는 안내가 뜬다', async ({ browser, baseURL }) => {
    assertDevBaseURL(baseURL);
    const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Linux; Android 16; Pixel Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
    const page = await ctx.newPage();
    await page.goto('/pos');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Download for Android').first()).toBeVisible({ timeout: 10000 });
    await ctx.close();
  });
});
