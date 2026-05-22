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

  // 1. Open Store Settings page — check tab bar (Store/Operations/Managers — NO Tables & QR)
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=store`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const storeTab = await page.locator('button:has-text("Store Info"), [role="tab"]:has-text("Store Info")').count();
  const opsTab = await page.locator('button:has-text("Operations"), [role="tab"]:has-text("Operations")').count();
  const mgrTab = await page.locator('button:has-text("Managers"), [role="tab"]:has-text("Managers")').count();
  const tqrTabInBar = await page.locator('[role="tab"]:has-text("Tables & QR"), button:has-text("Tables & QR"):not([class*="Sidebar"]):not([class*="Sub"])').count();
  console.log(`Store Settings tab bar:`);
  console.log(`  Store Info: ${storeTab > 0 ? '✓' : '❌'}`);
  console.log(`  Operations: ${opsTab > 0 ? '✓' : '❌'}`);
  console.log(`  Managers: ${mgrTab > 0 ? '✓' : '❌'}`);
  console.log(`  Tables & QR (should NOT be in tab bar): ${tqrTabInBar === 0 ? '✓ removed' : `⚠ still present (${tqrTabInBar} found — may be sidebar)`}`);

  // 2. Open Tables & QR via tab=tablesQr URL
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/settings?tab=tablesQr`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const zonesCard = await page.locator('text=/Zones.*Table Groups|구역.*테이블 그룹/i').count();
  const tableMgmt = await page.locator('text=/Table Management|테이블 관리/i').count();
  const quickEntry = await page.locator('text=/Quick-entry QR|Quick-entry QR codes/i').count();
  console.log(`\nTables & QR (?tab=tablesQr):`);
  console.log(`  Zones & Table Groups card: ${zonesCard > 0 ? '✓' : '❌'}`);
  console.log(`  Table Management card: ${tableMgmt > 0 ? '✓' : '❌'}`);
  console.log(`  Quick-entry QR card: ${quickEntry > 0 ? '✓' : '❌'}`);

  // 3. Sidebar entry — 사이드바에 Tables & QR link 보이는지
  const sidebarTablesQr = await page.locator('a[href*="tab=tablesQr"]').count();
  console.log(`\nSidebar entry (link to ?tab=tablesQr): ${sidebarTablesQr > 0 ? '✓ present' : '❌ missing'}`);

  await browser.close();
  const ok = storeTab>0 && opsTab>0 && mgrTab>0 && zonesCard>0 && tableMgmt>0 && sidebarTablesQr>0;
  console.log(`\n=== ${ok ? '✓ OK' : '✗ ISSUES'} ===`);
  process.exit(ok ? 0 : 1);
})();
