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
  await page.evaluate((tok) => localStorage.setItem('auth_token', tok), token);

  // Test 1: tablesQr 탭
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=tablesQr`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const tabExists = await page.locator('text="Tables & QR"').count();
  const zonesCard = await page.locator('text=/Zones.*Table Groups/i').count();
  const tableMgmt = await page.locator('text=/Table Management/i').count();
  const quickEntry = await page.locator('text=/Quick-entry QR codes/i').count();
  const external = await page.locator('text="External QR"').count();
  console.log(`Tables & QR 탭 (RA settings):`);
  console.log(`  Tab visible: ${tabExists > 0 ? '✓' : '❌'}`);
  console.log(`  Zones & Table Groups card: ${zonesCard > 0 ? '✓' : '❌'}`);
  console.log(`  Table Management card: ${tableMgmt > 0 ? '✓' : '❌'}`);
  console.log(`  Quick-entry QR card: ${quickEntry > 0 ? '✓' : '❌'}`);
  console.log(`  External QR card: ${external > 0 ? '✓' : '❌'}`);

  // Test 2: Operations 탭 — 4 카드가 안 보여야
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=operations`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const zonesInOps = await page.locator('text=/Zones.*Table Groups/i').count();
  const tableMgmtInOps = await page.locator('text=/Table Management/i').count();
  const opsHours = await page.locator('text=/Operating Hours/i').count();
  console.log(`\nOperations 탭 (4 카드 분리 확인):`);
  console.log(`  Zones card: ${zonesInOps === 0 ? '✓ moved out' : '❌ still in Operations'}`);
  console.log(`  Table Management: ${tableMgmtInOps === 0 ? '✓ moved out' : '❌ still in Operations'}`);
  console.log(`  Operating Hours (잔존 카드): ${opsHours > 0 ? '✓ kept' : '❌ missing'}`);

  await browser.close();
  const ok = tabExists > 0 && zonesCard > 0 && tableMgmt > 0 && quickEntry > 0 && external > 0
    && zonesInOps === 0 && tableMgmtInOps === 0 && opsHours > 0;
  console.log(`\n=== ${ok ? '✓ TAB SPLIT OK' : '✗ ISSUES'} ===`);
  process.exit(ok ? 0 : 1);
})();
