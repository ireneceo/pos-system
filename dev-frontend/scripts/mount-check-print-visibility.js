// Focused mount check for print-visibility changes: KDS, Floor Plan, Display.
// Usage: RA_TOKEN=... RA_RID=5 node scripts/mount-check-print-visibility.js
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const TOKEN = process.env.RA_TOKEN;
const RID = process.env.RA_RID || '5';
const ROUTES = [
  `/restaurant/${RID}/kitchen`,
  `/restaurant/${RID}/kitchen?view=items`,
  `/restaurant/${RID}/floor-plan`,
  `/restaurant/${RID}/display`,
];

(async () => {
  if (!TOKEN) { console.error('RA_TOKEN required'); process.exit(1); }
  const browser = await chromium.launch();
  const context = await browser.newContext({
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: TOKEN },
      { name: 'currentUserRole', value: 'Restaurant Admin' },
    ] }] },
  });
  let fail = 0;
  for (const route of ROUTES) {
    const page = await context.newPage();
    const pageerrors = [], consoleErrors = [];
    page.on('pageerror', e => pageerrors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    try {
      await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2500);
    } catch (e) { pageerrors.push('goto: ' + e.message); }
    const rootKids = await page.evaluate(() => document.getElementById('root')?.children?.length || 0);
    const fallback = await page.evaluate(() => document.body?.innerText?.includes('Something went wrong') || false);
    // 인쇄 무관 console error 는 무시(네트워크/소켓). pageerror/ErrorBoundary 만 fail 기준.
    const ok = pageerrors.length === 0 && rootKids > 0 && !fallback;
    if (!ok) fail++;
    console.log(`${ok ? '✓' : '✗'} ${route} → rootKids=${rootKids} pageerr=${pageerrors.length} fallback=${fallback} consoleErr=${consoleErrors.length}`);
    pageerrors.slice(0, 3).forEach(e => console.log('   ⚠ ' + e.slice(0, 220)));
    await page.close();
  }
  await browser.close();
  console.log(fail === 0 ? '\nALL MOUNTED OK' : `\n${fail} PAGE(S) FAILED`);
  process.exit(fail === 0 ? 0 : 1);
})();
