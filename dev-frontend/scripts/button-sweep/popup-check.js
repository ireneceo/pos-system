// «무반응» 으로 잡힌 4개 링크가 실제로는 새 창을 여는 것인지 확인한다.
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const popups = [];
  ctx.on('page', p => popups.push(p.url()));
  const page = await ctx.newPage();
  await page.goto(`${BASE}/restaurant/${T.ra_demo_rid}/dashboard`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await page.waitForTimeout(3500);
  for (const name of ['POS Terminal', 'Floor Plan', 'Kitchen Display', 'Pickup Display']) {
    popups.length = 0;
    const before = page.url();
    const loc = page.getByRole('link', { name, exact: true }).first();
    const attrs = await loc.evaluate(el => ({ href: el.getAttribute('href'), target: el.getAttribute('target'), rel: el.getAttribute('rel') }), undefined, { timeout: 3000 }).catch(e => ({ err: e.message.slice(0, 50) }));
    await loc.click({ timeout: 4000, noWaitAfter: true }).catch(e => console.log('   클릭실패', e.message.split('\n')[0].slice(0, 50)));
    await page.waitForTimeout(2500);
    console.log(`${name.padEnd(16)} | href=${attrs.href} target=${attrs.target} | 새창 ${popups.length}개 ${popups[0] ? '→ ' + popups[0].replace(BASE, '') : ''} | 현재주소 ${page.url() === before ? '그대로' : page.url().replace(BASE, '')}`);
    if (page.url() !== before) { await page.goto(`${BASE}/restaurant/${T.ra_demo_rid}/dashboard`, { waitUntil: 'domcontentloaded' }); await page.waitForTimeout(2500); }
    for (const p of ctx.pages().slice(1)) await p.close().catch(() => {});
  }
  await b.close();
})();
