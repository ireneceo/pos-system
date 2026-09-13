// FG 화면에서 나는 403 의 정체 확인 — 차단 없이 실제 요청만 관찰한다.
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.fg }, { name: 'currentUserRole', value: 'Foodcourt General' }] }] } });
  for (const route of ['/pos/foodcourt/general/reports?tab=sales', '/pos/foodcourt/payment-settings', '/pos/foodcourt/general/products']) {
    const p = await ctx.newPage();
    const bad = [];
    p.on('response', r => { if (r.status() >= 400 && r.url().includes('/api/')) bad.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE, '').slice(0, 70)}`); });
    await p.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await p.waitForTimeout(4000);
    console.log(`${route}\n   실패 API ${bad.length}건: ${bad.slice(0, 5).join(' | ') || '없음'}`);
    await p.close();
  }
  await b.close();
})();
