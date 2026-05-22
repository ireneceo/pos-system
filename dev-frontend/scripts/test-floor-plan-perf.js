const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';
(async () => {
  const login = JSON.parse(execSync(`curl -sk -X POST ${DEV_URL}/api/auth/demo-login -H 'Content-Type: application/json' -d '{"key":"demo_restaurant_admin"}'`).toString());
  const token = login.data?.token;
  const restaurantId = 5;  // Restaurant 5 — user's URL
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();

  // Inject token
  await page.goto(`${DEV_URL}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate((tok) => localStorage.setItem('auth_token', tok), token);

  // Measure floor-plan load
  const t0 = Date.now();
  await page.goto(`${DEV_URL}/restaurant/${restaurantId}/floor-plan`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const tDom = Date.now() - t0;

  // Wait for canvas / tables to render
  let tTablesVisible = -1;
  try {
    await page.waitForSelector('canvas, [class*="TableNode"], [class*="FloorPlanCanvas"]', { timeout: 20000 });
    tTablesVisible = Date.now() - t0;
  } catch {}

  // Wait for full settled (network idle)
  let tIdle = -1;
  try {
    await page.waitForLoadState('networkidle', { timeout: 20000 });
    tIdle = Date.now() - t0;
  } catch {}

  console.log(`Restaurant 5 (kdine-korean) /floor-plan load timings:`);
  console.log(`  DOM ready:        ${tDom}ms`);
  console.log(`  Canvas/Tables:    ${tTablesVisible > 0 ? tTablesVisible + 'ms' : 'TIMEOUT'}`);
  console.log(`  Network idle:     ${tIdle > 0 ? tIdle + 'ms' : 'TIMEOUT (long-poll/socket 가능)'}`);

  // Network resources count
  const perf = await page.evaluate(() => {
    const r = performance.getEntriesByType('resource');
    const total = r.length;
    const slow = r.filter(e => e.duration > 500).map(e => ({name: e.name.split('/').pop().slice(0,60), dur: Math.round(e.duration)}));
    return { total, slow };
  });
  console.log(`\nNetwork resources: ${perf.total} total. Slow (>500ms):`);
  perf.slow.slice(0, 10).forEach(s => console.log(`  ${s.dur}ms  ${s.name}`));

  await browser.close();
})();
