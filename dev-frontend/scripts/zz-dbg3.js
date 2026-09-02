const { chromium } = require('playwright');
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const c = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: process.env.BG_TOKEN }, { name: 'currentUserRole', value: 'Brand General' }] }] } });
  const p = await c.newPage();
  p.on('pageerror', e => console.log('PAGEERROR', e.message.slice(0,200)));
  await p.goto(`${BASE}/pos/recipe-management/ingredients`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(4500);
  console.log('URL:', p.url());
  console.log('본문:', (await p.locator('body').innerText()).slice(0,300).replace(/\n/g,' | '));
  await b.close();
})();
