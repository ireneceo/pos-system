const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  for (const [label, token, role, route] of [
    ['supplier', T.supplier, 'Supplier Admin', '/pos/supplier/products'],
    ['fg', T.fg, 'Foodcourt General', '/pos/foodcourt/general/reports?tab=sales'],
  ]) {
    const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
        { name: 'auth_token', value: token }, { name: 'currentUserRole', value: role }] }] } });
    const p = await ctx.newPage();
    const bad = [];
    p.on('response', async r => { if (r.status() >= 400 && r.url().includes('/api/')) {
      let body = ''; try { body = (await r.text()).slice(0, 120); } catch {}
      bad.push(`${r.status()} ${r.request().method()} ${r.url().replace(BASE,'')} :: ${body}`);
    }});
    await p.goto(BASE + route, { waitUntil: 'networkidle', timeout: 25000 });
    await p.waitForTimeout(2500);
    console.log(`\n[${label}] ${route} — 실패 API ${bad.length}건`);
    bad.slice(0, 6).forEach(x => console.log('   ' + x.slice(0, 190)));
    await ctx.close();
  }
  await b.close();
})();
