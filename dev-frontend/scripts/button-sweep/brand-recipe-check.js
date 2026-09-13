// 브랜드 레시피 화면이 대시보드로 튕기는지 재현 (브랜드 총괄 토큰)
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.bg }, { name: 'currentUserRole', value: 'Brand General' }] }] } });
  for (const route of ['/pos/brand-product-recipes', '/pos/brand-menus', '/pos/brand-products']) {
    const p = await ctx.newPage();
    const bad = [];
    p.on('response', r => { if (r.status() >= 400 && r.url().includes('/api/')) bad.push(r.status() + ' ' + r.url().replace(BASE, '').slice(0, 60)); });
    await p.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await p.waitForTimeout(4000);
    const info = await p.evaluate(() => ({ url: location.pathname + location.search,
      text: (document.body.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 110) }));
    console.log(`${route}\n   → 최종주소 ${info.url} ${info.url.startsWith(route) ? '(그대로)' : '⚠ 튕김'}`);
    console.log(`   화면: ${info.text.slice(0, 90)}`);
    if (bad.length) console.log(`   실패API: ${bad.slice(0, 3).join(' | ')}`);
    await p.close();
  }
  await b.close();
})();
