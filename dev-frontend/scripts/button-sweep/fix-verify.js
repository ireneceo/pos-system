/**
 * 수정 5건 검증 — «고쳐졌다» 를 실제 화면·실제 호출로 증명한다.
 *  ①없는 주소 → 안내 화면이 뜨는가(백지 아님)   ②공급업체·푸드코트에서 /api/orders 403 이 사라졌는가
 *  ③매장관리자는 여전히 주문을 부르는가(가드가 과하게 막지 않았는지 — 음성 대조)
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';

async function visit(ctx, route) {
  const p = await ctx.newPage();
  const calls = [];
  p.on('response', r => { if (r.url().includes('/api/orders?')) calls.push(r.status() + ' ' + r.url().replace(BASE, '').slice(0, 40)); });
  await p.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(3500);
  const info = await p.evaluate(() => ({
    rootKids: document.getElementById('root')?.children?.length || 0,
    text: (document.body.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 120),
  }));
  await p.close();
  return { ...info, calls };
}
async function ctxFor(b, token, role) {
  return b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: token }, { name: 'currentUserRole', value: role }] }] } });
}

(async () => {
  const b = await chromium.launch({ headless: true });
  let pass = 0, fail = 0;
  const check = (name, ok, detail) => { console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`); ok ? pass++ : fail++; };

  // ① 없는 주소 (로그인 상태 / 비로그인 둘 다)
  const ra = await ctxFor(b, T.ra_demo, 'Restaurant Admin');
  const nf1 = await visit(ra, `/restaurant/${T.ra_demo_rid}/this-page-does-not-exist`);
  check('없는 주소(로그인) 안내 화면', nf1.rootKids > 0 && /does not exist|없는|exist/i.test(nf1.text), `"${nf1.text.slice(0, 60)}"`);
  const anon = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block' });
  const nf2 = await visit(anon, '/zzz-no-such-page');
  check('없는 주소(비로그인) 안내 화면', nf2.rootKids > 0 && nf2.text.length > 0, `"${nf2.text.slice(0, 60)}"`);

  // ③ 음성 대조 — 매장관리자는 여전히 주문을 부른다(가드가 과하지 않은지)
  const raOrders = await visit(ra, `/restaurant/${T.ra_demo_rid}/live-orders`);
  check('매장관리자는 주문 호출 유지(과잉 차단 아님)', raOrders.calls.some(c => c.startsWith('2')), raOrders.calls.join(' | ') || '호출 없음');

  // ② 권한 없는 역할에서 403 이 사라졌는지
  for (const [label, token, role, route] of [
    ['공급업체', T.supplier, 'Supplier Admin', '/pos/supplier/products'],
    ['푸드코트총괄', T.fg, 'Foodcourt General', '/pos/foodcourt/general/reports?tab=sales'],
    ['브랜드총괄', T.bg, 'Brand General', '/pos/brand-products'],
  ]) {
    const c = await ctxFor(b, token, role);
    const r = await visit(c, route);
    const bad = r.calls.filter(x => !x.startsWith('2'));
    check(`${label} 화면에서 주문 403 없음`, bad.length === 0, bad.join(' | ') || '주문 호출 자체가 없음');
    await c.close();
  }
  await b.close();
  console.log(`\n검증: ${pass}/${pass + fail} 통과`);
  process.exit(fail ? 1 : 0);
})();
