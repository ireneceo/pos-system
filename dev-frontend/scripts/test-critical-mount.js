// 운영 critical 페이지 mount 검증 — Floor Plan zone 작업이 다른 critical 페이지에 영향 주는지
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const DEV_URL = 'https://dev.purplehere.com';

(async () => {
  const login = JSON.parse(execSync(`curl -sk -X POST ${DEV_URL}/api/auth/demo-login -H 'Content-Type: application/json' -d '{"key":"demo_restaurant_admin"}'`).toString());
  const token = login.data?.token;
  if (!token) { console.error('Login fail'); process.exit(1); }
  const restaurantId = login.data.user?.restaurant_id;
  console.log(`✓ Token OK (restaurantId=${restaurantId})\n`);

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, ignoreHTTPSErrors: true, locale: 'en-MY', timezoneId: 'Asia/Kuala_Lumpur' });

  const pages = [
    { name: 'Floor Plan',          path: `/restaurant/${restaurantId}/floor-plan` },
    { name: 'POS Terminal',        path: `/restaurant/${restaurantId}/pos-terminal` },
    { name: 'KDS',                 path: `/restaurant/${restaurantId}/kitchen-display` },
    { name: 'Live Orders',         path: `/restaurant/${restaurantId}/live-orders` },
    { name: 'Settings/Operations', path: `/restaurant/${restaurantId}/settings?tab=operations` },
    { name: 'Settings/Mobile',     path: `/restaurant/${restaurantId}/settings?tab=mobileOrder` },
    { name: 'Settings/Printer',    path: `/restaurant/${restaurantId}/settings?tab=printer` },
    { name: 'Mobile Menu (demo)',  path: `/mobile/demo-korean-bbq/menu` }
  ];

  const results = [];
  for (const p of pages) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(`pageerror: ${e.message.slice(0,200)}`));
    page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 200)}`); });

    await page.goto(`${DEV_URL}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate((tok) => localStorage.setItem('auth_token', tok), token);

    try {
      await page.goto(`${DEV_URL}${p.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(5000);  // React mount + data fetch

      // ErrorBoundary fallback detection
      const errorBoundary = await page.locator('text=/Something went wrong|ErrorBoundary|Cannot access.*before initialization/i').count();
      const reactCrash = errors.some(e => /ReferenceError|TypeError.*undefined|Cannot access.*before initialization/i.test(e));

      results.push({
        name: p.name,
        ok: errorBoundary === 0 && !reactCrash,
        errorBoundary,
        criticalErrors: errors.filter(e => /ReferenceError|TypeError.*undefined|Cannot access/i.test(e)),
        otherErrors: errors.filter(e => !/ReferenceError|TypeError.*undefined|Cannot access/i.test(e)).length
      });
    } catch (e) {
      results.push({ name: p.name, ok: false, error: e.message.slice(0, 100) });
    }
    await page.close();
  }

  await browser.close();

  console.log('=== Critical Page Mount Verification ===\n');
  let allPass = true;
  results.forEach(r => {
    const status = r.ok ? '✓' : '❌';
    console.log(`${status} ${r.name}`);
    if (r.errorBoundary > 0) console.log(`    ErrorBoundary fallback: ${r.errorBoundary}`);
    if (r.criticalErrors?.length) {
      console.log(`    CRITICAL ERRORS:`);
      r.criticalErrors.forEach(e => console.log(`      ${e}`));
    }
    if (r.otherErrors > 0) console.log(`    (other console errors: ${r.otherErrors})`);
    if (r.error) console.log(`    error: ${r.error}`);
    if (!r.ok) allPass = false;
  });

  console.log(`\n=== ${allPass ? '✓ ALL PAGES MOUNT CLEAN' : '✗ SOME PAGES HAVE CRITICAL ISSUES'} ===`);
  process.exit(allPass ? 0 : 1);
})().catch(e => { console.error('CRASH:', e.message); process.exit(1); });
