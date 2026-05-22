const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';
(async () => {
  const login = JSON.parse(execSync(`curl -sk -X POST ${DEV_URL}/api/auth/demo-login -H 'Content-Type: application/json' -d '{"key":"demo_restaurant_admin"}'`).toString());
  const token = login.data?.token;
  const restaurantId = login.data.user?.restaurant_id;
  const browser = await chromium.launch({ headless: true });
  // Set browser locale explicitly to Korean
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true, locale: 'ko-KR' });
  const page = await ctx.newPage();

  // Set localStorage BEFORE first page load
  await ctx.addInitScript(`localStorage.setItem('auth_token', '${token}'); localStorage.setItem('i18nextLng', 'ko');`);

  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=tablesQr`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(7000);

  // Check actual i18n state
  const i18nState = await page.evaluate(() => {
    const i18n = window.i18next || window.i18n;
    return {
      language: i18n ? i18n.language : 'no i18n',
      resolvedLanguage: i18n ? i18n.resolvedLanguage : null,
      lsLang: localStorage.getItem('i18nextLng')
    };
  });
  console.log('i18n state:', JSON.stringify(i18nState));

  // Test text
  const koTitle = await page.locator('text="구역 & 테이블 그룹"').count();
  const enLeak = await page.locator('text="Zones & Table Groups"').count();
  console.log(`KO "구역 & 테이블 그룹": ${koTitle}`);
  console.log(`EN "Zones & Table Groups": ${enLeak}`);

  // Sidebar
  const ko테이블 = await page.locator('text="테이블 & QR"').count();
  const enTablesQr = await page.locator('text="Tables & QR"').count();
  console.log(`Sidebar ko "테이블 & QR": ${ko테이블}, en "Tables & QR": ${enTablesQr}`);

  await page.screenshot({ path: '/tmp/i18n-check.png', fullPage: false });
  console.log('Screenshot: /tmp/i18n-check.png');

  await browser.close();
})();
