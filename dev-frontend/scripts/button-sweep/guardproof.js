/**
 * 고장주입 — 판정기가 «진짜 고장» 을 잡는지 반증한다. 제품 코드 무변경.
 * 2026-09-13 1차 반증 실패에서 배운 것:
 *   ① 화면은 배경에서 계속 폴링·소켓 갱신을 한다 → «클릭 안 한 같은 길이의 창»(대조군)을 먼저 재고 그 차이로 판정한다.
 *   ② 브라우저가 동일 주소 동시요청을 합친다 → 네트워크가 아니라 **화면 안에서 fetch/XHR 호출 자체**를 센다.
 */
const { chromium } = require('playwright');
const T = require(process.env.TOKENS_FILE);
const BASE = 'https://dev.purplehere.com';

const INSTRUMENT = () => {
  if (window.__bsInstalled) return;         // 앱의 fetch 래퍼 «위» 에 올라탄다
  window.__bsInstalled = true;
  window.__calls = [];
  const of = window.fetch;
  window.fetch = function (...a) {
    const url = typeof a[0] === 'string' ? a[0] : (a[0] && a[0].url) || '';
    const method = (a[1] && a[1].method) || (a[0] && a[0].method) || 'GET';
    window.__calls.push({ method, url: String(url).slice(0, 120), t: Date.now() });
    return of.apply(this, a);
  };
  const oo = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u, ...r) {
    window.__calls.push({ method: m, url: String(u).slice(0, 120), t: Date.now() });
    return oo.call(this, m, u, ...r);
  };
};

async function window_(page, ms, clickSel, dbl) {
  await page.evaluate(() => {
    window.__calls = [];
    window.__mut = 0;
    if (window.__mutObs) window.__mutObs.disconnect();
    window.__mutObs = new MutationObserver(r => { window.__mut += r.length; });
    window.__mutObs.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
  });
  const before = await page.evaluate(() => ({ url: location.pathname + location.search, len: (document.body.innerText || '').length }));
  if (clickSel) {
    await page.click(clickSel, { timeout: 3000, noWaitAfter: true }).catch(() => {});
    if (dbl) await page.click(clickSel, { timeout: 3000, noWaitAfter: true, force: true }).catch(() => {});
  }
  await page.waitForTimeout(ms);
  const r = await page.evaluate(() => {
    const c = window.__calls.slice(); const m = window.__mut || 0;
    if (window.__mutObs) window.__mutObs.disconnect();
    return { calls: c, mut: m, url: location.pathname + location.search, len: (document.body.innerText || '').length };
  });
  return { ...r, urlChanged: before.url !== r.url, textChanged: Math.abs(before.len - r.len) > 20 };
}

(async () => {
  const b = await chromium.launch({ headless: true });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: T.ra_demo }, { name: 'currentUserRole', value: 'Restaurant Admin' }] }] } });
  const page = await ctx.newPage();
  const netLog = [];
  await page.route('**/api/**', (r) => { netLog.push(r.request().method() + ' ' + r.request().url().replace(BASE, '').split('?')[0]); r.continue(); });
  await page.goto(`${BASE}/restaurant/${T.ra_demo_rid}/floor-plan`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2500);
  await page.evaluate(INSTRUMENT);          // ← 로드 후에 심는다(맨 위 층)

  await page.evaluate(() => {
    // 자리를 떼어 놓는다 — 겹쳐 두면 클릭이 전부 맨 위 버튼에 맞는다(2026-09-13 1차 반증 실패 원인).
    let slot = 0;
    const mk = (id, label) => { const el = document.createElement('button'); el.id = id; el.textContent = label;
      el.style.cssText = `position:fixed;bottom:0;left:${slot * 140}px;width:130px;z-index:2147483647`;
      slot++; document.body.appendChild(el); return el; };
    mk('inj-a', 'A 무반응');
    mk('inj-b', 'B 두번쏨').addEventListener('click', () => {
      fetch('/api/bs-probe', { method: 'POST', body: '{}' }); fetch('/api/bs-probe', { method: 'POST', body: '{}' }); });
    const c = mk('inj-c', 'C 잠금유지');
    c.addEventListener('click', () => { c.disabled = true; fetch('/api/health?c=1'); });
    const d = mk('inj-d', 'D 정상');                                  // 대조군: 한 번 눌러 한 번만 쏨
    d.addEventListener('click', () => { fetch('/api/health?d=1'); });
  });

  const WIN = 1500;
  // 배경 폴링은 주기가 5초를 넘는 것도 있다(예: pending-print) → 대조군을 넉넉히 잡아야
  // «클릭 안 해도 나는 요청» 을 다 모은다(2026-09-13 실측: 1.5초 창으로는 놓친다).
  const noise = new Set();
  let baseline = null;
  for (let k = 0; k < 3; k++) {
    baseline = await window_(page, 2500, null);
    baseline.calls.forEach(c => noise.add(c.method + ' ' + c.url.split('?')[0]));
  }
  const newCalls = (w) => w.calls.filter(c => !noise.has(c.method + ' ' + c.url.split('?')[0]));

  const htmlA0 = await page.$eval('#inj-a', el => el.outerHTML);
  const a = await window_(page, WIN, '#inj-a');
  const htmlA1 = await page.$eval('#inj-a', el => el.outerHTML);
  const noEffectA = newCalls(a).length === 0 && !a.urlChanged && !a.textChanged && htmlA0 === htmlA1;

  const bw = await window_(page, WIN, '#inj-b');
  const bFires = bw.calls.filter(c => c.url.includes('/api/bs-probe')).length;
  const bNet = netLog.filter(x => x.includes('/api/bs-probe')).length;

  const dw = await window_(page, WIN, '#inj-d');
  const dFires = dw.calls.filter(c => c.url.includes('/api/health?d=1')).length;

  const cw = await window_(page, WIN, '#inj-c');
  const cBusy = await page.$eval('#inj-c', el => !!el.disabled).catch(() => null);

  console.log('\n=== 고장주입 반증 (대조군 있음) ===');
  console.log(`   대조군(클릭 없음): 요청 ${baseline.calls.length} · DOM변화 ${baseline.mut}  ← 배경 소음`);
  console.log(`A 무반응 버튼   → 무반응 판정 ${noEffectA}   (기대 true)  [새요청 ${newCalls(a).length} · DOM ${a.mut}]`);
  console.log(`B 두번쏘는 버튼 → 화면에서 ${bFires}회 · 서버까지 ${bNet}회   (기대 2·2)`);
  console.log(`D 정상 버튼     → 발사 ${dFires}회            (기대 1)  ← 음성 대조`);
  console.log(`C 잠금유지 버튼 → 잠금유지 ${cBusy}          (기대 true)`);
  const pass = noEffectA === true && bFires === 2 && bNet === 2 && dFires === 1 && cBusy === true;
  console.log('\n[디버그] A 창의 새 요청:', JSON.stringify(newCalls(a).map(c => c.method + ' ' + c.url).slice(0, 5)));
  console.log('[디버그] B 창의 전체 호출:', JSON.stringify(bw.calls.map(c => c.method + ' ' + c.url).slice(0, 8)));
  console.log(`\n판정기 반증: ${pass ? '4/4 성립 — 고장을 실제로 잡고, 정상은 잡지 않는다' : '실패 — 신뢰 불가'}`);
  await b.close();
  process.exit(pass ? 0 : 1);
})();
