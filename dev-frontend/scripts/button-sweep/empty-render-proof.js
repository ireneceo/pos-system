/**
 * 반증: roles-sweep 에 새로 넣은 «빈 렌더» 감지가 진짜 백지를 잡는지.
 *  정상 화면 → OK 여야 하고, #root 를 비운 화면 → EMPTY_RENDER 여야 한다(음성·양성 대조).
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
const detect = async (page) => {
  const body = await page.evaluate(() => document.body?.innerText?.slice(0, 5000) || '');
  const rootKids = await page.evaluate(() => document.getElementById('root')?.children?.length || 0);
  return (rootKids === 0 || (body || '').trim().length === 0) ? 'EMPTY_RENDER' : 'OK';
};
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.bg }, { name: 'currentUserRole', value: 'Brand General' }] }] } });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/pos/brand-products`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(3500);
  const normal = await detect(p);
  await p.evaluate(() => { const r = document.getElementById('root'); if (r) r.innerHTML = ''; });
  await p.waitForTimeout(300);
  const broken = await detect(p);
  console.log(`정상 화면        → ${normal}   (기대 OK)`);
  console.log(`#root 를 비운 화면 → ${broken}   (기대 EMPTY_RENDER)`);
  const ok = normal === 'OK' && broken === 'EMPTY_RENDER';
  console.log(`\n반증: ${ok ? '성립 — 감지기가 백지를 실제로 잡는다' : '실패'}`);
  await b.close();
  process.exit(ok ? 0 : 1);
})();
