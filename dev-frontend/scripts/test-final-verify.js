const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';
(async () => {
  const login = JSON.parse(execSync(`curl -sk -X POST ${DEV_URL}/api/auth/demo-login -H 'Content-Type: application/json' -d '{"key":"demo_restaurant_admin"}'`).toString());
  const token = login.data?.token;
  const restaurantId = login.data.user?.restaurant_id;
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  await page.goto(`${DEV_URL}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((tok) => { localStorage.setItem('auth_token', tok); localStorage.setItem('i18nextLng', 'ko'); }, token);

  // Reload to apply ko i18n
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=tablesQr`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(7000);

  // i18n verify
  const koTitle = await page.locator('text="구역 & 테이블 그룹"').count();
  const koAddZone = await page.locator('text="구역 추가"').count();
  const enLeak = await page.locator('text="Zones & Table Groups"').count();
  console.log(`KO i18n:`);
  console.log(`  "구역 & 테이블 그룹": ${koTitle > 0 ? '✓' : '❌'}`);
  console.log(`  "구역 추가" (Add Zone): ${koAddZone > 0 ? '✓' : '❌'}`);
  console.log(`  English leak "Zones & Table Groups": ${enLeak === 0 ? '✓ none' : `⚠ ${enLeak}`}`);

  // Sidebar — anchor or button with tablesQr in href, OR text 테이블 & QR
  const sidebarLink = await page.locator('a[href*="tab=tablesQr"], button[onclick*="tablesQr"]').count();
  const sidebarText = await page.locator('text="테이블 & QR"').count();
  console.log(`\nSidebar Tables & QR:`);
  console.log(`  link[href*=tablesQr]: ${sidebarLink}`);
  console.log(`  text "테이블 & QR": ${sidebarText}`);

  await browser.close();
  const ok = koTitle > 0 && (sidebarLink > 0 || sidebarText > 0);
  console.log(`\n=== ${ok ? '✓ PASS' : '✗ FAIL'} ===`);
  process.exit(ok ? 0 : 1);
})();
