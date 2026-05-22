const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';
(async () => {
  const login = JSON.parse(execSync(`curl -sk -X POST ${DEV_URL}/api/auth/demo-login -H 'Content-Type: application/json' -d '{"key":"demo_restaurant_admin"}'`).toString());
  const token = login.data?.token;

  for (const rid of [38, 5]) {
    const browser = await chromium.launch({ headless: true });
    const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(`PAGEERR: ${e.message.slice(0,300)}`));
    page.on('console', m => { if (m.type() === 'error') errors.push(`CONSOLE: ${m.text().slice(0,300)}`); });

    await page.goto(`${DEV_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate((tok) => localStorage.setItem('auth_token', tok), token);

    const t0 = Date.now();
    await page.goto(`${DEV_URL}/restaurant/${rid}/floor-plan`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const dom = Date.now() - t0;
    await page.waitForTimeout(10000);

    const bodyText = await page.locator('body').textContent().then(t => t.slice(0, 500)).catch(() => '');
    const hasFloorPlan = bodyText.includes('Floor Plan');
    const hasLoading = bodyText.includes('Loading');

    console.log(`\n=== Restaurant ${rid} ===`);
    console.log(`  DOM ms: ${dom}`);
    console.log(`  has "Floor Plan" text: ${hasFloorPlan}`);
    console.log(`  has "Loading" text: ${hasLoading}`);
    console.log(`  errors: ${errors.length}`);
    errors.slice(0, 3).forEach(e => console.log(`    ${e}`));

    await browser.close();
  }
})();
