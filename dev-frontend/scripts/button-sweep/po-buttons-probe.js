const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  for (const route of ['/pos/purchase-orders', '/pos/purchase-orders/history']) {
    const p = await ctx.newPage();
    await p.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await p.waitForTimeout(4000);
    // 기간 필터를 «All» 로 열고 첫 발주 줄을 눌러 상세를 연다
    await p.getByRole('button', { name: /^All$/ }).last().click({ timeout: 4000 }).catch(() => {});
    await p.waitForTimeout(3000);
    const rows = await p.$$('table tbody tr, [class*="Row"]');
    if (rows.length) { await rows[0].click({ timeout: 4000 }).catch(() => {}); await p.waitForTimeout(3000); }
    const btns = await p.evaluate(() => Array.from(document.querySelectorAll('button'))
      .map(x => (x.innerText || x.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' '))
      .filter(Boolean).slice(0, 30));
    console.log(`\n${route} — 버튼 ${btns.length}개`);
    console.log('  ' + btns.join(' | ').slice(0, 400));
    await p.close();
  }
  await b.close();
})();
