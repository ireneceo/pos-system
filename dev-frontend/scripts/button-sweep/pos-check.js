// POS Terminal «Dine In / Pay Now» 클릭 시 오류·클릭불가를 정밀 확인 (읽기 위주 · 결제요청은 차단)
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block', viewport: { width: 1440, height: 900 },
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push({ msg: e.message, stack: (e.stack || '').split('\n').slice(0, 4).join(' | ') }));
  await p.route('**/api/**', r => {
    const m = r.request().method(), u = r.request().url();
    if (/\/(payments?|print)/i.test(u) || m === 'DELETE') { console.log('   [차단]', m, u.replace(BASE, '').slice(0, 70)); return r.abort('blockedbyclient'); }
    return r.continue();
  });
  await p.goto(`${BASE}/restaurant/${T.ra_demo_rid}/pos-terminal`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(5000);
  console.log('화면 진입 후 오류:', errs.length ? JSON.stringify(errs[0]).slice(0, 200) : '없음');

  for (const name of ['Dine In', 'Pay Now']) {
    errs.length = 0;
    const loc = p.getByRole('button', { name: new RegExp('^' + name + '$', 'i') }).first();
    const info = await loc.evaluate((el) => {
      const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const hit = document.elementFromPoint(cx, cy);
      return { w: Math.round(r.width), h: Math.round(r.height), disabled: !!el.disabled,
        pe: cs.pointerEvents, visible: cs.visibility, opacity: cs.opacity,
        inViewport: cy >= 0 && cy <= innerHeight,
        hitSelf: hit === el || el.contains(hit),
        hitTag: hit ? hit.tagName + '.' + String(hit.className).split(' ')[0] : null };
    }).catch(e => ({ err: e.message.slice(0, 80) }));
    console.log(`\n[${name}] 상태:`, JSON.stringify(info));
    const t0 = Date.now();
    let clickErr = null;
    await loc.click({ timeout: 5000 }).catch(e => { clickErr = e.message.split('\n')[0]; });
    await p.waitForTimeout(1500);
    console.log(`   클릭 ${clickErr ? '실패: ' + clickErr.slice(0, 60) : '성공'} (${Date.now() - t0}ms)`);
    if (errs.length) console.log('   오류:', errs[0].msg, '\n   위치:', errs[0].stack.slice(0, 220));
  }
  await b.close();
})();
