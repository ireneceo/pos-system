// 스윕과 «같은 조건»(기본 화면크기 1280x720 · 서비스워커 차단 · 위험요청 차단)에서
// POS 버튼 클릭 시간초과가 재현되는지 본다. 재현되면 원인(가림·크기·스크롤)을 찍어 본다.
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
const BLOCK_URL = /\/(payments?|refunds?|void|print|printed|print-claim|consolidated-print|cash-?(up|reconcil)|close|settle)/i;
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const p = await ctx.newPage();
  console.log('화면 크기:', JSON.stringify(p.viewportSize()));
  await p.route('**/api/**', r => {
    const m = r.request().method(), u = r.request().url();
    if (BLOCK_URL.test(u) || /^(DELETE|PUT|PATCH)$/.test(m)) return r.abort('blockedbyclient');
    return r.continue();
  });
  await p.goto(`${BASE}/restaurant/${T.ra_demo_rid}/pos-terminal`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(4000);
  for (const name of ['Dine In', 'Takeaway', 'Clear', 'Pay Later', 'Pay Now']) {
    const loc = p.getByRole('button', { name: new RegExp('^' + name + '$', 'i') }).first();
    const st = await loc.evaluate(el => {
      const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const hit = (cy >= 0 && cy <= innerHeight) ? document.elementFromPoint(cx, cy) : null;
      return { top: Math.round(r.top), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height),
        vh: innerHeight, disabled: !!el.disabled, pe: cs.pointerEvents,
        hitSelf: hit ? (hit === el || el.contains(hit)) : 'viewport밖',
        hitBy: hit && !(hit === el || el.contains(hit)) ? hit.tagName + '.' + String(hit.className).split(' ')[0] : null };
    }).catch(e => ({ err: e.message.slice(0, 60) }));
    const t0 = Date.now();
    let err = null;
    await loc.click({ timeout: 4000, noWaitAfter: true }).catch(e => { err = e.message.split('\n')[0]; });
    console.log(`${err ? '✗' : '✓'} ${name.padEnd(10)} ${Date.now() - t0}ms | ${JSON.stringify(st)}${err ? '\n     → ' + err.slice(0, 90) : ''}`);
    await p.waitForTimeout(800);
  }
  await b.close();
})();
