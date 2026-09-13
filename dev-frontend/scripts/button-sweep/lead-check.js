/**
 * RA 에서 나온 단서 3건 정밀 확인 (차단 없이 — 실제 동작을 그대로 본다. 데모 매장)
 *  ① 현금서랍 키패드 «1»·«Open drawer» 가 정말 아무 일도 안 하는가
 *  ② Live Orders «Select to Merge» 가 눌린 뒤 잠금이 안 풀리는가
 *  ③ «Order settings» 를 열면 저장 요청이 나가는가(자동저장?) · 실패 시 사용자에게 보이는가
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
const RID = T.ra_demo_rid;

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });

  // ① 현금서랍 키패드
  const p1 = await ctx.newPage();
  await p1.goto(`${BASE}/restaurant/${RID}/cash-management`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p1.waitForTimeout(3500);
  const opened = await p1.getByRole('button', { name: /Today's Cash Drawer/i }).first().click({ timeout: 4000 }).then(() => true).catch(() => false);
  await p1.waitForTimeout(1500);
  console.log('① 현금서랍 모달 열림:', opened);
  if (opened) {
    const before = await p1.evaluate(() => Array.from(document.querySelectorAll('[data-bs-modal] input, input')).map(i => i.value).join('|'));
    await p1.getByRole('button', { name: '1', exact: true }).first().click({ timeout: 3000 }).catch(e => console.log('   «1» 클릭 실패:', e.message.split('\n')[0].slice(0, 50)));
    await p1.waitForTimeout(800);
    const after = await p1.evaluate(() => Array.from(document.querySelectorAll('[data-bs-modal] input, input')).map(i => i.value).join('|'));
    console.log('   키패드 «1» 누른 뒤 입력칸 값 변화:', before === after ? `없음 (그대로 "${after.slice(0,40)}")` : `"${before.slice(0,30)}" → "${after.slice(0,30)}"`);
  }
  await p1.close();

  // ② Select to Merge
  const p2 = await ctx.newPage();
  await p2.goto(`${BASE}/restaurant/${RID}/live-orders`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p2.waitForTimeout(3500);
  const btn = p2.getByRole('button', { name: /Select to Merge/i }).first();
  const st0 = await btn.evaluate(el => ({ disabled: el.disabled, busy: el.getAttribute('aria-busy'), text: el.innerText.trim() }), undefined, { timeout: 3000 }).catch(() => null);
  await btn.click({ timeout: 4000 }).catch(() => {});
  await p2.waitForTimeout(2000);
  const st1 = await p2.getByRole('button', { name: /Select to Merge|Cancel|취소/i }).first()
    .evaluate(el => ({ disabled: el.disabled, busy: el.getAttribute('aria-busy'), text: el.innerText.trim() }), undefined, { timeout: 3000 }).catch(() => null);
  console.log('\n② Select to Merge — 클릭 전', JSON.stringify(st0), '→ 클릭 후', JSON.stringify(st1));
  await p2.close();

  // ③ Order settings — 열기만 해도 저장 요청이 나가나
  const p3 = await ctx.newPage();
  const writes = [];
  p3.on('request', r => { if (/\/api\//.test(r.url()) && r.method() !== 'GET') writes.push(r.method() + ' ' + r.url().replace(BASE, '').slice(0, 60)); });
  await p3.goto(`${BASE}/restaurant/${RID}/live-orders`, { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p3.waitForTimeout(3500);
  writes.length = 0;
  await p3.getByRole('button', { name: /Order settings/i }).first().click({ timeout: 4000 }).catch(() => {});
  await p3.waitForTimeout(2500);
  console.log('\n③ Order settings 열었을 때 나간 쓰기 요청:', writes.length ? writes.join(' | ') : '없음');
  await p3.close();
  await b.close();
})();
