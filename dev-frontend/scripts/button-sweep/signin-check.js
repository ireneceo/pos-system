// «Sign In» 빈 값 클릭 — 무반응인지, 안내가 나오는지 실제로 본다.
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/restaurant/${T.ra_demo_rid}/pos-terminal`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(3000);
  const before = await p.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').trim());
  console.log('클릭 전 화면글:', before.slice(0, 160));
  const btn = p.getByRole('button', { name: /^Sign In$/i }).first();
  await btn.click({ timeout: 4000 }).catch(e => console.log('클릭 실패:', e.message.split('\n')[0]));
  await p.waitForTimeout(2000);
  const after = await p.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').trim());
  console.log('\n클릭 후 화면글:', after.slice(0, 200));
  console.log('\n달라진 게 있나:', before !== after ? '예' : '아니오 — 아무 변화 없음');
  const req = await p.evaluate(() => document.querySelectorAll('input:invalid').length);
  console.log('브라우저 기본 필수검사에 걸린 칸 수:', req);
  await b.close();
})();
