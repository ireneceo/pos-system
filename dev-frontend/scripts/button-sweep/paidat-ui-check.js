/**
 * 결제 모달(ReceivePayModal) 화면 확인 — 2026-09-14
 *  ① 결제수단 목록의 **첫 항목이 은행송금**이고 기본 선택인가
 *  ② **결제일 칸**이 있고 오늘이 기본인가 · 미래를 못 고르게 max 가 걸렸는가
 *  ③ 날짜를 과거로 바꾸면 요청 본문에 paid_at 이 실리는가 (요청은 가로채 서버로 보내지 않는다)
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
  let sent = null;
  // 결제 요청은 서버로 보내지 않는다 — 본문만 들여다보고 성공으로 응답한다.
  await p.route('**/api/purchase-orders/*/pay', async (r) => {
    sent = JSON.parse(r.request().postData() || '{}');
    await r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
  });
  await p.route('**/api/purchase-orders/*/receive-and-pay', async (r) => {
    sent = JSON.parse(r.request().postData() || '{}');
    await r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
  });
  await p.goto(`${BASE}/pos/purchase-orders/history`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await p.waitForTimeout(4000);
  await p.getByRole('button', { name: /^All$/ }).last().click({ timeout: 4000 }).catch(() => {});
  await p.waitForTimeout(3000);

  const btn = p.getByRole('button', { name: /Receive & pay|Record payment|결제/i }).first();
  const found = await btn.count();
  if (!found) { console.log('✗ 결제 버튼을 찾지 못함 — 화면 확인 필요'); await b.close(); process.exit(1); }
  await btn.click({ timeout: 5000 }).catch(() => {});
  await p.waitForTimeout(2000);

  const info = await p.evaluate(() => {
    // 모달(화면을 덮는 고정 오버레이) 안의 select 만 본다 — 뒤쪽 목록 필터를 집으면 엉뚱한 답이 나온다.
    const overlay = Array.from(document.body.querySelectorAll('*')).find((el) => {
      const cs = getComputedStyle(el);
      return cs.position === 'fixed' && (parseInt(cs.zIndex || '0', 10) || 0) >= 900
        && el.querySelector('input[type="date"]');
    });
    const scope = overlay || document;
    const sel = scope.querySelector('select');
    const opts = sel ? Array.from(sel.options).map(o => ({ v: o.value, t: o.text })) : [];
    const date = scope.querySelector('input[type="date"]');
    return { first: opts[0] || null, selected: sel ? sel.value : null, count: opts.length,
             hasDate: !!date, dateValue: date ? date.value : null, dateMax: date ? date.getAttribute('max') : null };
  });
  const today = new Date(); const t2 = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
  let pass = 0, fail = 0;
  const ck = (n, ok, d) => { console.log(`${ok ? '✓' : '✗'} ${n}${d ? ' — ' + d : ''}`); ok ? pass++ : fail++; };
  ck('첫 결제수단이 은행송금', info.first && info.first.v === 'bank_transfer', info.first ? `${info.first.v} (${info.first.t})` : '목록 없음');
  ck('기본 선택도 은행송금', info.selected === 'bank_transfer', String(info.selected));
  ck('결제일 칸 있음 · 기본 오늘', info.hasDate && info.dateValue === t2, `${info.dateValue}`);
  ck('미래 선택 막힘(max=오늘)', info.dateMax === t2, String(info.dateMax));

  if (info.hasDate) {
    await p.fill('input[type="date"]', '2026-09-01');
    const confirm = p.getByRole('button', { name: /confirm|record|pay|확인|기록/i }).last();
    await confirm.click({ timeout: 5000 }).catch(() => {});
    await p.waitForTimeout(2500);
    ck('요청 본문에 paid_at 실림', !!(sent && sent.paid_at === '2026-09-01'), sent ? JSON.stringify(sent) : '요청 없음');
  }
  console.log(`\n화면 검증: ${pass}/${pass + fail}`);
  await b.close();
  process.exit(fail ? 1 : 0);
})();
