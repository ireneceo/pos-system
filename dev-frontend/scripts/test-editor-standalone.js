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
  const errors = [];
  page.on('pageerror', e => errors.push(`pageerror: ${e.message.slice(0,200)}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text().slice(0,200)}`); });

  await page.goto(`${DEV_URL}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((tok) => localStorage.setItem('auth_token', tok), token);

  // 1. Floor Plan Editor — standalone (no sidebar)
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/floor-plan-editor`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  const sidebar = await page.locator('nav, aside, [class*="Sidebar"], [class*="RailItem"]').count();
  const headerTitleText = await page.locator('h1').first().textContent().catch(() => '');
  const backBtn = await page.locator('button:has-text("Back"), a:has-text("Back")').count();
  const crit = errors.some(e => /ReferenceError|TypeError.*undefined|Cannot access/i.test(e));

  console.log(`Floor Plan Editor (/restaurant/${restaurantId}/floor-plan-editor):`);
  console.log(`  Header title: "${headerTitleText}"`);
  console.log(`  Sidebar elements: ${sidebar} ${sidebar === 0 ? '✓' : '(expected 0 — standalone)'}`);
  console.log(`  Back button: ${backBtn > 0 ? '✓ present' : '❌ missing'}`);
  console.log(`  Critical errors: ${crit ? '❌' : '✓ none'}`);

  // 2. Floor Plan page — sidebar also expected 0 (standalone)
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/floor-plan`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);
  const fpSidebar = await page.locator('nav, aside, [class*="Sidebar"], [class*="RailItem"]').count();
  console.log(`\nFloor Plan page (sidebar should be same — 0):`);
  console.log(`  Sidebar elements: ${fpSidebar}`);

  await browser.close();
  const ok = sidebar === 0 && backBtn > 0 && !crit;
  console.log(`\n=== ${ok ? '✓ EDITOR STANDALONE OK' : '✗ ISSUES'} ===`);
  process.exit(ok ? 0 : 1);
})();
