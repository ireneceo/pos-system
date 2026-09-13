const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
const targets = [
  ['fcm', T.fcm, 'Foodcourt Manager', '/pos/foodcourt/floor-plan'],
  ['bm', T.bm, 'Brand Manager', '/pos/brand/general/restaurants'],
  ['bm', T.bm, 'Brand Manager', '/pos/brand/general/brand-products'],
  ['bm', T.bm, 'Brand Manager', '/pos/brand/general/brand-menus'],
];
(async () => {
  const b = await chromium.launch({ headless: true });
  for (const [key, token, role, route] of targets) {
    const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
      storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
        { name: 'auth_token', value: token }, { name: 'currentUserRole', value: role }] }] } });
    const p = await ctx.newPage();
    const apis = [];
    p.on('response', r => { const u = r.url(); if (u.includes('/api/')) apis.push(r.status() + ' ' + u.replace(BASE, '').slice(0, 80)); });
    await p.goto(BASE + route, { waitUntil: 'networkidle', timeout: 25000 });
    await p.waitForTimeout(2500);
    const info = await p.evaluate(() => ({
      url: location.pathname,
      text: (document.body.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 300),
      rootKids: document.getElementById('root')?.children?.length || 0,
    }));
    console.log(`\n--- [${key}] ${route}`);
    console.log(`   최종주소: ${info.url}  (rootKids=${info.rootKids})`);
    console.log(`   화면글: ${info.text.slice(0, 200)}`);
    console.log(`   실패API: ${apis.filter(a => !a.startsWith('2')).slice(0, 4).join(' | ') || '없음'}`);
    await ctx.close();
  }
  await b.close();
})();
