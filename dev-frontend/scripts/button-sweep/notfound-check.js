const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  for (const [label, token, role, route] of [
    ['RA', T.ra_demo, 'Restaurant Admin', '/restaurant/38/this-page-does-not-exist'],
    ['RA', T.ra_demo, 'Restaurant Admin', '/pos/zzz-not-a-real-page'],
    ['BM', T.bm, 'Brand Manager', '/pos/brand/general/brand-products'],
  ]) {
    const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
        { name: 'auth_token', value: token }, { name: 'currentUserRole', value: role }] }] } });
    const p = await ctx.newPage();
    await p.goto(BASE + route, { waitUntil: 'networkidle', timeout: 25000 });
    await p.waitForTimeout(2000);
    const r = await p.evaluate(() => ({ rootKids: document.getElementById('root')?.children?.length || 0,
      text: (document.body.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 120) }));
    console.log(`[${label}] ${route}\n   rootKids=${r.rootKids} | 화면글: "${r.text}"`);
    await ctx.close();
  }
  await b.close();
})();
