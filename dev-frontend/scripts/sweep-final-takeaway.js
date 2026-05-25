/* eslint-disable no-console */
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const TOKEN = process.env.RA_TOKEN; const RID = process.env.RA_RID || '5';
const ROUTES = [
  `/restaurant/${RID}/floor-plan`,
  `/restaurant/${RID}/floor-plan?view=takeaway`,
  `/restaurant/${RID}/floor-plan?view=takeaway&order=123`,
  `/restaurant/${RID}/floor-plan?zone=z_main`,
  `/restaurant/${RID}/floor-plan-editor`,
  `/restaurant/${RID}/live-orders`,
];
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
    { name: 'authToken', value: TOKEN }, { name: 'token', value: TOKEN }
  ] }] } });
  let pass=0, fail=0;
  for (const r of ROUTES) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
    page.on('console', m => m.type() === 'error' && errs.push('CONSOLE: ' + m.text().slice(0, 120)));
    try {
      await page.goto(BASE + r, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000);
      const body = await page.evaluate(() => document.body && document.body.innerText.slice(0, 250));
      const hasFallback = body && /Something went wrong|error boundary/i.test(body);
      const crash = errs.some(e => /not defined|TDZ|Cannot read|undefined is not/.test(e));
      if (hasFallback || crash) { console.log(`✗ ${r}\n   ${errs.slice(0,2).join(' | ')}`); fail++; }
      else { console.log(`✓ ${r}${errs.length ? ' (' + errs.length + ' non-crash err)' : ''}`); pass++; }
    } catch (e) { console.log(`✗ ${r} — ${e.message.split('\n')[0]}`); fail++; }
    await page.close();
  }
  await ctx.close(); await browser.close();
  console.log(`\n=== Summary: ${pass} OK · ${fail} failed ===`);
  process.exit(fail > 0 ? 1 : 0);
})();
