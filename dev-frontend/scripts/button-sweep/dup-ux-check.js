/**
 * A) 공급업체 상품 «Active» 더블클릭 → 서버에 쓰기 요청이 2번 가는가 (차단 없이 실제 확인 · 토글이라 원복됨)
 * B) 저장이 네트워크에서 실패했을 때 화면에 «사용자가 볼 수 있는» 안내가 뜨는가
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.supplier }, { name: 'currentUserRole', value: 'Supplier Admin' }] }] } });

  // ── A) 실제 서버까지 가는 중복 쓰기 확인 (토글 2회 = 원상복귀)
  const p = await ctx.newPage();
  const writes = [];
  p.on('response', async r => { const rq = r.request();
    if (rq.method() !== 'GET' && r.url().includes('/api/')) writes.push(`${rq.method()} ${r.url().replace(BASE,'').split('?')[0]} → ${r.status()}`); });
  await p.goto(`${BASE}/pos/supplier/products`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(4000);
  const toggle = p.getByRole('button', { name: /^Active$/i }).first();
  const exists = await toggle.count();
  console.log('A) «Active» 버튼 개수:', exists);
  if (exists) {
    writes.length = 0;
    await toggle.click({ timeout: 4000, noWaitAfter: true }).catch(() => {});
    await toggle.click({ timeout: 4000, noWaitAfter: true, force: true }).catch(() => {});
    await p.waitForTimeout(2500);
    console.log('   더블클릭으로 서버에 간 쓰기 요청:', writes.length, '건');
    writes.forEach(w => console.log('     ', w));
  }
  await p.close();

  // ── B) 저장 실패 시 화면 안내
  const p2 = await ctx.newPage();
  await p2.goto(`${BASE}/pos/supplier/products`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p2.waitForTimeout(4000);
  await p2.route('**/api/**', route => {
    const m = route.request().method();
    if (m !== 'GET') return route.abort('failed');       // 네트워크 끊김 흉내
    return route.continue();
  });
  const before = await p2.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').trim());
  const t2 = p2.getByRole('button', { name: /^Active$/i }).first();
  await t2.click({ timeout: 4000, noWaitAfter: true }).catch(() => {});
  await p2.waitForTimeout(2500);
  const after = await p2.evaluate(() => (document.body.innerText || '').replace(/\s+/g, ' ').trim());
  const added = after.length > before.length ? after.slice(before.length - 20) : '';
  const alertish = await p2.evaluate(() => {
    const txt = (document.body.innerText || '');
    return /fail|error|실패|오류|다시|retry|network|연결/i.test(txt) ? txt.match(/[^.\n]{0,80}(fail|error|실패|오류|다시|retry|network|연결)[^.\n]{0,80}/i)[0] : null;
  });
  console.log('\nB) 저장이 네트워크에서 실패했을 때');
  console.log('   화면 글 변화:', before === after ? '없음' : `있음 ("${added.slice(0, 80)}")`);
  console.log('   화면에 보이는 오류 안내:', alertish ? `"${alertish.trim().slice(0, 100)}"` : '없음 — 콘솔에만 기록됨');
  await b.close();
})();
