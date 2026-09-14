/**
 * 발주 Staging «Mark as Sent» 가 새로고침 없이 반영되는지 재현.
 * 서버로는 보내지 않는다 — 제출 요청을 가로채 성공으로 응답하고 화면만 본다(데이터 무변경).
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';
(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const p = await ctx.newPage();
  let called = [];
  for (const pat of ['**/api/purchase-orders/*/mark-sent-external', '**/api/purchase-orders/*/submit']) {
    await p.route(pat, async (r) => { called.push(r.request().url().split('/').slice(-2).join('/')); 
      await r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }); });
  }
  await p.goto(`${BASE}/pos/purchase-orders/staging`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await p.waitForTimeout(9000);
  const before = await p.evaluate(() => ({
    text: (document.body.innerText || '').replace(/\s+/g, ' ').slice(0, 200),
    marks: Array.from(document.querySelectorAll('button')).filter(b => /Mark as Sent|Submit for approval|Submit/i.test(b.innerText || '')).length,
  }));
  console.log('클릭 전 — Mark as Sent 계열 버튼', before.marks, '개');
  console.log('   화면글:', before.text.slice(0, 180));
  if (!before.marks) { console.log('   (staging 에 대기 발주가 없어 재현 불가 — 확인 불가)'); await b.close(); process.exit(2); }
  const btn = p.getByRole('button', { name: /Mark as Sent/i }).first();
  await btn.click({ timeout: 5000 }).catch(e => console.log('   클릭 실패:', e.message.split('\n')[0].slice(0, 60)));
  await p.waitForTimeout(2500);
  const after = await p.evaluate(() => ({
    url: location.pathname,
    marks: Array.from(document.querySelectorAll('button')).filter(b => /Mark as Sent|Submit for approval|Submit/i.test(b.innerText || '')).length,
  }));
  console.log('클릭 후 — 버튼', after.marks, '개 · 주소', after.url, '· 보낸 요청', called.join(',') || '없음');
  const changed = after.marks < before.marks || after.url.includes('history');
  console.log(changed ? '✓ 새로고침 없이 화면이 바뀐다' : '✗ 화면이 그대로 — 새로고침해야 반영됨(재현)');
  await b.close();
  process.exit(changed ? 0 : 1);
})();
