const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';
(async () => {
  const login = JSON.parse(execSync(`curl -sk -X POST ${DEV_URL}/api/auth/demo-login -H 'Content-Type: application/json' -d '{"key":"demo_restaurant_admin"}'`).toString());
  const token = login.data?.token;
  const restaurantId = login.data.user?.restaurant_id;
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true });
  const pages = [
    { name: 'Settings/Operations (i18n)', path: `/restaurant/${restaurantId}/settings?tab=operations` },
    { name: 'Settings/Mobile',           path: `/restaurant/${restaurantId}/settings?tab=mobileOrder` },
    { name: 'Settings/Printer (i18n)',   path: `/restaurant/${restaurantId}/settings?tab=printer` },
    { name: 'Floor Plan',                path: `/restaurant/${restaurantId}/floor-plan` },
    { name: 'Floor Plan Editor (NEW)',   path: `/restaurant/${restaurantId}/floor-plan-editor` },
    { name: 'POS Terminal',              path: `/restaurant/${restaurantId}/pos-terminal` },
    { name: 'KDS',                       path: `/restaurant/${restaurantId}/kitchen-display` },
    { name: 'Live Orders',               path: `/restaurant/${restaurantId}/live-orders` },
    { name: 'Mobile Menu (demo)',        path: `/mobile/demo-korean-bbq/menu` }
  ];
  const results = [];
  for (const p of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(`pageerror: ${e.message.slice(0,200)}`));
    page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text().slice(0,200)}`); });
    await page.goto(`${DEV_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate((tok) => localStorage.setItem('auth_token', tok), token);
    try {
      await page.goto(`${DEV_URL}${p.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(5000);
      const eb = await page.locator('text=/Something went wrong|Cannot access.*before initialization/i').count();
      const crit = errors.some(e => /ReferenceError|TypeError.*undefined|Cannot access/i.test(e));
      results.push({ name: p.name, ok: eb === 0 && !crit, eb, crit: errors.filter(e => /ReferenceError|TypeError.*undefined|Cannot access/i.test(e)).length });
    } catch (e) { results.push({ name: p.name, ok: false, err: e.message.slice(0,80) }); }
    await page.close();
  }
  await browser.close();
  console.log('=== Critical 9 Pages Mount ===');
  let allOk = true;
  results.forEach(r => {
    console.log(`${r.ok ? '✓' : '❌'} ${r.name}${r.eb ? ` (ErrorBoundary: ${r.eb})` : ''}${r.crit ? ` (critical errs: ${r.crit})` : ''}${r.err ? ` (${r.err})` : ''}`);
    if (!r.ok) allOk = false;
  });
  console.log(allOk ? '\n=== ✓ ALL CLEAN ===' : '\n=== ✗ SOME ISSUES ===');
  process.exit(allOk ? 0 : 1);
})();
