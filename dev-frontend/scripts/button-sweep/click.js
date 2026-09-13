#!/usr/bin/env node
/**
 * 버튼 전수검사 2계층 — 실제 클릭 (데모 매장 전용 · 위험요청 차단)
 * ---------------------------------------------------------------------------
 * 안전장치 3중 (하나라도 못 걸면 클릭하지 않는다):
 *  ① 계정   : 데모 매장(dev id=38) 계정만. 운영 매장·운영 DB 무접촉.
 *  ② 대상   : 로그아웃·외부창 등은 제외 목록. 그 외는 클릭하되 ③이 보호한다.
 *  ③ 네트워크: DELETE/PUT/PATCH + 결제·환불·인쇄·주문생성 경로는 **서버에 닿기 전에 차단**하고
 *              "차단됨"으로 기록한다. 요청이 나갔다는 사실은 그대로 검증되고, 실행만 막힌다.
 *
 * 각 버튼 판정: 클릭 1회 = API 정확히 1회 / 응답코드 / 주소·화면 변화 / 모달 / 콘솔오류 /
 *              연속클릭 중복요청 / 클릭 후 잠금이 풀리는지.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const TOKENS = JSON.parse(fs.readFileSync(process.env.TOKENS_FILE, 'utf8'));
const OUT_DIR = path.join(__dirname, 'out');
const argv = process.argv.slice(2);
const argOf = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const MAX_PER_PAGE = parseInt(argOf('--max', '60'), 10);
const ROUTES = (argOf('--routes', '') || '').split(',').filter(Boolean);

const RID = TOKENS.ra_demo_rid || 38;

// ── 역할별 라우트: 기존 sweep 파일에서 그대로 읽는다(단일 소스 유지) ──
function arrayLiteral(src, name, vars) {
  const start = src.indexOf(`const ${name} = [`);
  if (start < 0) return [];
  const from = src.indexOf('[', start);
  let depth = 0, end = from;
  for (let i = from; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  // eslint-disable-next-line no-new-func
  return new Function(...Object.keys(vars), `return ${src.slice(from, end + 1)}`)(...Object.values(vars));
}
function rolesObject(src) {
  const start = src.indexOf('const ROLES = {');
  const from = src.indexOf('{', start);
  let depth = 0, end = from;
  for (let i = from; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  // eslint-disable-next-line no-new-func
  return new Function('process', `return ${src.slice(from, end + 1)}`)({ env: {} });
}
function routesForRole(key) {
  const pageSrc = fs.readFileSync(path.join(__dirname, '..', 'headless-page-sweep.js'), 'utf8');
  const rolesSrc = fs.readFileSync(path.join(__dirname, '..', 'headless-roles-sweep.js'), 'utf8');
  if (key === 'bg') return arrayLiteral(pageSrc, 'BG_ROUTES', { BG_BRANDID: String(TOKENS.bg_brand_id || 1) });
  const obj = rolesObject(rolesSrc);
  return (obj[key] && obj[key].routes) || [];
}
const ROLE_TOKEN = { ra: TOKENS.ra_demo, bg: TOKENS.bg, fg: TOKENS.fg, owner: TOKENS.owner,
                     supplier: TOKENS.supplier, admin: TOKENS.admin, bm: TOKENS.bm, fcm: TOKENS.fcm };
const ROLE_LABEL = { ra: 'Restaurant Admin', bg: 'Brand General', fg: 'Foodcourt General',
                     owner: 'Restaurant Owner', supplier: 'Supplier Admin', admin: 'System Admin',
                     bm: 'Brand Manager', fcm: 'Foodcourt Manager' };
const ROLE = argOf('--role', 'ra');

const DEFAULT_ROUTES = [
  `/restaurant/${RID}/pos-terminal`,
  `/restaurant/${RID}/floor-plan`,
  `/restaurant/${RID}/live-orders`,
  `/restaurant/${RID}/kitchen`,
  `/restaurant/${RID}/dashboard`,
  `/restaurant/${RID}/cash-management`,
  `/restaurant/${RID}/menu`,
  `/restaurant/${RID}/settings?tab=store`,
];

// ③ 서버에 닿으면 안 되는 요청 — 차단하고 기록만 한다.
const BLOCK_URL = /\/(payments?|refunds?|void|print|printed|print-claim|consolidated-print|cash-?(up|reconcil)|close|settle|deploy)/i;
const BLOCK_METHOD = /^(DELETE|PUT|PATCH)$/;
const BLOCK_POST = /\/api\/(orders|mobile\/order|invoices|purchase-orders|seller-orders)(\/|\?|$)/i;
// ② 누르면 검사 자체가 끝나버리는 것 — 제외
const SKIP_TEXT = /^(logout|sign out|로그아웃|log out)$/i;

function isBlocked(method, url) {
  if (BLOCK_METHOD.test(method)) return 'method:' + method;
  if (BLOCK_URL.test(url)) return 'path:danger';
  if (method === 'POST' && BLOCK_POST.test(url)) return 'post:write';
  return null;
}

const SEL = 'button, a, [role="button"], [role="tab"], [role="menuitem"]';

// 화면 «안» 에서 fetch/XHR 호출 자체를 센다. 왜 네트워크로 안 세는가:
//  ① 앱이 window.fetch 를 감싸고 GET 중복을 합친다(utils/fetchDedupe.ts) → 네트워크만 보면 «몇 번 쏘려 했는가» 를 못 본다
//  ② 브라우저도 동일 GET 동시요청을 합친다
// 그래서 **로드가 끝난 뒤** 현재 fetch 위에 올라탄다(맨 위 층).
const INSTRUMENT = () => {
  if (window.__bsInstalled) return;
  window.__bsInstalled = true;
  window.__calls = [];
  const of = window.fetch;
  window.fetch = function (...a) {
    const url = typeof a[0] === 'string' ? a[0] : (a[0] && a[0].url) || '';
    const method = (a[1] && a[1].method) || (a[0] && a[0].method) || 'GET';
    window.__calls.push({ method, url: String(url).slice(0, 120) });
    return of.apply(this, a);
  };
  const oo = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u, ...r) {
    window.__calls.push({ method: m, url: String(u).slice(0, 120) });
    return oo.call(this, m, u, ...r);
  };
};
const startWindow = (page) => page.evaluate(() => {
  window.__calls = []; window.__mut = 0; window.__native = 0;
  if (!window.__nativeHooked) {
    window.__nativeHooked = true;
    document.addEventListener('invalid', () => { window.__native++; }, true);   // 「칸을 채우세요」
    document.addEventListener('submit', () => { window.__native++; }, true);
  }
  if (window.__mutObs) window.__mutObs.disconnect();
  window.__mutObs = new MutationObserver(r => { window.__mut += r.length; });
  window.__mutObs.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true });
});
const endWindow = (page) => page.evaluate(() => {
  const c = (window.__calls || []).slice(); const m = window.__mut || 0; const n = window.__native || 0;
  if (window.__mutObs) window.__mutObs.disconnect();
  return { calls: c, mut: m, native: n };
});
const keyOf = (c) => c.method + ' ' + String(c.url).split('?')[0];

// 이 앱은 배경 폴링이 계속 돌아 'networkidle' 이 오지 않는다 → domcontentloaded + 고정 대기.
// 실패해도 검사를 통째로 죽이지 않는다(부분 결과 보존).
async function go(page, url, settle = 2500) {
  try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 }); }
  catch (e) {
    try { await page.goto(url, { waitUntil: 'commit', timeout: 15000 }); }
    catch (e2) { return false; }
  }
  await page.waitForTimeout(settle);
  return true;
}

async function snapshot(page) {
  return page.evaluate((SEL) => {
    const els = Array.from(document.querySelectorAll(SEL));
    return els.map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        text: (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 40),
        tag: el.tagName.toLowerCase(),
        disabled: !!(el.disabled || el.getAttribute('aria-disabled') === 'true'),
        visible: r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0.01,
        target: el.getAttribute('target') || '',
        cls: (typeof el.className === 'string' ? el.className.split(' ').slice(0, 2).join('.') : '').slice(0, 40),
        inChrome: !!el.closest('nav, aside, header, [class*="Sidebar"], [class*="sidebar"], [class*="TopBar"], [class*="Topbar"]'),
      };
    });
  }, SEL);
}

// 클릭 대상 자신의 outerHTML — 토글 상태(class·aria)가 바뀌면 여기서 잡힌다.
async function loc0Html(page, idx) {
  try { return await page.locator(SEL).nth(idx).evaluate(el => el.outerHTML.slice(0, 400), undefined, { timeout: 3000 }); }
  catch { return null; }
}

function pageState(page) {
  return page.evaluate(() => {
    // 모달 찾기: body 바로 아래에 붙는 «화면을 덮는 고정 오버레이» (createPortal 방식).
    // role/class 로는 안 잡힌다 — styled-components 라 클래스 이름이 sc-xxxx 다.
    const overlays = Array.from(document.body.children).filter((el) => {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed') return false;
      if (cs.display === 'none' || cs.visibility === 'hidden') return false;
      const z = parseInt(cs.zIndex || '0', 10) || 0;
      const r = el.getBoundingClientRect();
      return z >= 900 && r.width > 200 && r.height > 120;
    });
    overlays.forEach((el, i) => el.setAttribute('data-bs-modal', String(i)));
    return {
      url: location.pathname + location.search,
      textLen: (document.body.innerText || '').length,
      dialogs: overlays.length + document.querySelectorAll('[role="dialog"]').length,
      bodyOverflowHidden: getComputedStyle(document.body).overflow === 'hidden',
    };
  });
}

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const routes = ROUTES.length ? ROUTES : (ROLE === 'ra' ? DEFAULT_ROUTES : routesForRole(ROLE));
  const token = ROLE_TOKEN[ROLE];
  if (!token) { console.error(`역할 토큰 없음: ${ROLE}`); process.exit(1); }
  console.log(`역할: ${ROLE_LABEL[ROLE]} · 화면 ${routes.length}개`);
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    ignoreHTTPSErrors: true, serviceWorkers: 'block',
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [
      { name: 'auth_token', value: token }, { name: 'currentUserRole', value: ROLE_LABEL[ROLE] } ] }] },
  });

  let reqLog = [], consoleLog = [];
  const attach = async (pg) => {
  await pg.route('**/api/**', async (route) => {
    const req = route.request();
    const why = isBlocked(req.method(), req.url());
    reqLog.push({ method: req.method(), url: req.url().replace(BASE, '').slice(0, 110), blocked: why });
    if (why) return route.abort('blockedbyclient');
    return route.continue();
  });
  pg.on('pageerror', (e) => {
    // 서비스워커를 막고 검사하기 때문에 index.tsx:128 의 60초 주기 reg.update() 가 터진다.
    // 이건 «그때 눌린 버튼» 과 무관한 검사 환경 소음이다(2026-09-13 실측으로 확인).
    if (/reading 'update'/.test(e.message)) return;
    consoleLog.push('pageerror: ' + e.message.slice(0, 140));
  });
  pg.on('console', (m) => { if (m.type() === 'error') {
    const t = m.text();
    if (t.includes('Failed to load resource') && (t.includes('/uploads/') || t.includes('.png') || t.includes('.jpg'))) return;
    if (t.includes('net::ERR_BLOCKED_BY_CLIENT')) return;      // ③이 일부러 막은 것
    if (t.includes('Download the React DevTools')) return;
    consoleLog.push(t.slice(0, 140));
  } });
  };

  let page = await ctx.newPage();
  await attach(page);

  const popups = [];
  ctx.on('page', (pg) => { popups.push(pg.url()); pg.close().catch(() => {}); });

  const results = [];
  for (const route of routes) {
    console.log(`\n=== ${route} ===`);
    try {
    const ok0 = await go(page, BASE + route, 3000);
    if (!ok0) { console.log('  ✗ 화면을 못 열었다 — 건너뜀'); results.push({ route, fatal: 'NAV_FAIL' }); continue; }
    await page.evaluate(INSTRUMENT);
    // 배경 소음 목록 — 이 화면이 «클릭 없이도» 부르는 주소들(폴링·소켓 갱신). 두 번 재서 모은다.
    const noise = new Set();
    let noiseMut = 0;
    for (let k = 0; k < 3; k++) {
      await startWindow(page); await page.waitForTimeout(2500);
      const w = await endWindow(page); w.calls.forEach(c => noise.add(keyOf(c))); noiseMut = Math.max(noiseMut, w.mut);
    }
    const base = await snapshot(page);
    const all = base.map((b, i) => ({ ...b, i }))
      .filter(b => b.visible && !b.disabled && !SKIP_TEXT.test(b.text) && b.target !== '_blank');
    // 본문 먼저, 남는 예산이 있으면 사이드바·헤더(화면마다 같은 것)를 뒤에 붙인다.
    const body = all.filter(b => !b.inChrome);
    const chrome = all.filter(b => b.inChrome);
    const targets = [...body, ...chrome].slice(0, MAX_PER_PAGE);
    console.log(`  대상 ${targets.length} / 보이는 요소 ${base.filter(b => b.visible).length}`);

    let needReload = true;
    for (const t of targets) {
     try {
      // 매 클릭은 깨끗한 상태에서 — 앞 클릭의 잔상(모달·주소이동)이 다음 판정을 오염시키지 않게.
      // 매 버튼마다 화면을 새로 열면 버튼당 2분이 든다(2026-09-13 실측) → 필요할 때만 연다:
      //   주소가 바뀌었거나 · 모달이 열렸거나 · 위험요청이 차단됐거나 · 자리가 밀렸을 때.
      // 배경 소음(대조군)은 화면마다 한 번만 재도 된다 — 판정은 «버튼 자신의 변화» 로 하기 때문.
      if (needReload) {
        if (!await go(page, BASE + route, 2000)) { results.push({ route, i: t.i, text: t.text, fatal: 'NAV_FAIL' }); continue; }
        await page.evaluate(INSTRUMENT);
        needReload = false;
      }
      const ctrl = { mut: noiseMut };
      const before = await pageState(page);
      const htmlBefore = await loc0Html(page, t.i);
      await startWindow(page);
      reqLog = []; consoleLog = [];
      let loc = page.locator(SEL).nth(t.i);
      let drift = null;
      const nowText = await loc.evaluate(el => (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 40), undefined, { timeout: 3000 }).catch(() => null);
      if (nowText !== t.text) {
        // 자리가 밀렸다 → 화면을 새로 열고 «같은 이름» 의 요소를 다시 찾는다(글자·aria-label 둘 다 본다).
        await go(page, BASE + route, 2000);
        await page.evaluate(INSTRUMENT);
        const idx = await page.evaluate(([SEL, want]) => {
          const label = (el) => (el.innerText || el.getAttribute('aria-label') || el.getAttribute('title') || '').trim().replace(/\s+/g, ' ').slice(0, 40);
          return Array.from(document.querySelectorAll(SEL)).findIndex(el => label(el) === want);
        }, [SEL, t.text]).catch(() => -1);
        if (idx >= 0) { loc = page.locator(SEL).nth(idx); drift = `자리밀림 ${t.i}→${idx}`; }
        else { results.push({ route, i: t.i, text: t.text, skipped: `사라짐(그 자리는 "${nowText}")`, consoleErrors: [] });
               console.log(`   ~ [${t.i}] "${t.text}" 건너뜀 — 화면에서 사라짐`); needReload = true; continue; }
      }
      let clickErr = null;
      try { await loc.click({ timeout: 4000, noWaitAfter: true }); }
      catch (e) { clickErr = e.message.split('\n')[0].slice(0, 100); }
      await page.waitForTimeout(1600);
      const win = await endWindow(page);
      const mutations = win.mut;
      const newCalls = win.calls.filter(c => !noise.has(keyOf(c)));
      const after = await pageState(page);
      const htmlAfter = await loc0Html(page, t.i);
      const elChanged = htmlBefore !== null && htmlAfter !== null && htmlBefore !== htmlAfter;
      const reqs = reqLog.slice();
      const errs = consoleLog.slice();
      const stillBusy = await loc.evaluate((el) => !!(el.disabled || el.getAttribute('aria-busy') === 'true'), undefined, { timeout: 3000 }).catch(() => null);

      const openedPopup = popups.length;
      const changed = {
        url: before.url !== after.url,
        text: Math.abs(before.textLen - after.textLen) > 20,
        modal: after.dialogs > before.dialogs || (!before.bodyOverflowHidden && after.bodyOverflowHidden),
      };
      // 무반응 = 요청도 없고 · 주소도 그대로 · 화면 글도 그대로 · 모달도 없고 · **DOM 이 한 번도 안 바뀜**
      // 무반응 = 새 호출 0 · 주소 그대로 · 글자 그대로 · 모달 없음 · DOM 변화가 대조군 수준
      // 무반응 후보 = 새 호출 0 · 주소 그대로 · 모달 없음 · 화면 글 그대로 · **누른 버튼 자신도 안 변함**
      const noEffect = !clickErr && newCalls.length === 0 && !changed.url && !changed.text
                       && !changed.modal && !elChanged && !(win.native > 0) && openedPopup === 0;

      // 연속클릭 중복 검사 — 요청을 정확히 1건 냈고 주소이동이 없는 버튼만(상태 오염 최소화)
      // 연속클릭 시험은 화면을 두 번 더 열어야 해서 버튼당 2분이 든다(2026-09-13 실측).
      // 중복 제출이 «해를 끼치는» 곳은 저장·제출·결제·발송 계열이다 → 그 버튼에만 건다.
      let doubleFire = null, doubleNet = null;
      const worthDoubleCheck = /save|submit|confirm|create|add|apply|pay|send|update|저장|제출|확인|추가|적용|결제|보내/i.test(t.text || '')
                               || (newCalls[0] && /^(POST|PUT|PATCH|DELETE)$/.test(newCalls[0].method));
      if (!clickErr && newCalls.length === 1 && !changed.url && worthDoubleCheck) {
        const target = keyOf(newCalls[0]);
        await go(page, BASE + route, 2000);
        await page.evaluate(INSTRUMENT);
        needReload = true;
        await startWindow(page);
        reqLog = [];
        const l2 = loc;
        try {
          await l2.click({ timeout: 3000, noWaitAfter: true });
          await l2.click({ timeout: 3000, noWaitAfter: true, force: true });
          await page.waitForTimeout(1600);
          const w2 = await endWindow(page);
          doubleFire = w2.calls.filter(c => keyOf(c) === target).length;          // 화면이 쏘려 한 횟수
          doubleNet = reqLog.filter(r => (r.method + ' ' + r.url.split('?')[0]) === target).length;  // 서버까지 간 횟수
        } catch (e) { doubleFire = null; }
      }

      const rec = { route, i: t.i, text: t.text, tag: t.tag, cls: t.cls, clickErr,
        reqs: reqs.map(r => `${r.method} ${r.url}${r.blocked ? ' [차단:' + r.blocked + ']' : ''}`),
        blockedCount: reqs.filter(r => r.blocked).length,
        changed, elChanged, openedPopup, popupUrls: popups.slice(0, 2), nativeValidation: win.native, mutations, ctrlMut: ctrl.mut, noEffect, consoleErrors: errs, stillBusy, doubleFire, doubleNet };
      // ── 모달 안 버튼 (2026-09-13 확대) ─────────────────────────────
      // 모달을 여는 버튼이면 그 안까지 들어가 같은 잣대로 잰다. 모달 밖에서는 보이지도 않던
      // 버튼들이라 1계층·초기 2계층이 통째로 놓치던 자리다(모달을 여는 화면이 178개).
      if (changed.modal && !clickErr) {
        const MODAL_SEL = '[data-bs-modal] button, [data-bs-modal] a, [data-bs-modal] [role="button"], [role="dialog"] button';
        const inModal = await page.$$eval(MODAL_SEL, (els) => els.map((el) => {
          const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
          return { text: (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40),
                   visible: r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden',
                   disabled: !!el.disabled };
        })).catch(() => []);
        // 닫기·취소는 맨 뒤로 — 먼저 누르면 모달이 닫혀 안쪽을 못 본다(2026-09-13 실측).
        const CLOSER = /^(×|x|✕|close|cancel|닫기|취소|back|뒤로)$/i;
        const modalTargets = inModal.map((m, mi) => ({ ...m, mi }))
          .filter(m => m.visible && !m.disabled)
          // 의미 있는 버튼(저장·추가·확인 등 글자 있는 것) 먼저, 아이콘·이모지 버튼은 뒤로, 닫기는 맨 뒤.
          .map(m => ({ ...m, rank: CLOSER.test(m.text) ? 2 : (m.text && m.text.replace(/[\p{Emoji}\s]/gu, '').length >= 2 ? 0 : 1) }))
          .sort((a, b) => a.rank - b.rank)
          .slice(0, 8);
        for (const m of modalTargets) {
          const mloc = page.locator(MODAL_SEL).nth(m.mi);
          const mHtml0 = await mloc.evaluate(el => el.outerHTML.slice(0, 300), undefined, { timeout: 2000 }).catch(() => null);
          await startWindow(page);
          reqLog = []; consoleLog = []; popups.length = 0;
          const mBefore = await pageState(page);
          const mText0 = await page.evaluate(() => { const ov = document.querySelector('[data-bs-modal]'); return ov ? ov.innerText.replace(/\s+/g, ' ').trim() : null; }).catch(() => null);
          let mErr = null;
          try { await mloc.click({ timeout: 3000, noWaitAfter: true }); }
          catch (e) { mErr = e.message.split('\n')[0].slice(0, 80); }
          await page.waitForTimeout(1400);
          const mWin = await endWindow(page);
          const mAfter = await pageState(page);
          const mText1 = await page.evaluate(() => { const ov = document.querySelector('[data-bs-modal]'); return ov ? ov.innerText.replace(/\s+/g, ' ').trim() : null; }).catch(() => null);
          const mTextChanged = mText0 !== null && mText1 !== null && mText0 !== mText1;
          const mHtml1 = await mloc.evaluate(el => el.outerHTML.slice(0, 300), undefined, { timeout: 2000 }).catch(() => null);
          const mNew = mWin.calls.filter(c => !noise.has(keyOf(c)));
          const mClosed = mAfter.dialogs < mBefore.dialogs;
          const mChanged = mBefore.url !== mAfter.url || mTextChanged
                           || mClosed || (mHtml0 && mHtml1 && mHtml0 !== mHtml1) || mWin.native > 0 || popups.length > 0;
          const mNoEffect = !mErr && mNew.length === 0 && !mChanged;
          results.push({ route, modalOf: t.text, text: m.text, tag: 'modal-button', clickErr: mErr,
            newCalls: mNew.map(c => c.method + ' ' + c.url), blockedCount: reqLog.filter(r => r.blocked).length,
            noEffect: mNoEffect, consoleErrors: consoleLog.slice(), closedModal: mClosed });
          console.log(`     ${mErr ? '✗' : mNoEffect ? '·무반응' : '✓'} (모달:${t.text}) "${m.text || '(글자없음)'}"`
            + (mNew.length ? ` API ${mNew.length}` : '') + (mClosed ? ' 닫힘' : ''));
          if (mClosed || mErr) break;                       // 모달이 닫혔으면 그 안은 더 못 본다
        }
        await page.keyboard.press('Escape').catch(() => {});
        needReload = true;
      }

      if (changed.url || changed.modal || rec.blockedCount > 0 || drift) needReload = true;
      results.push(rec);
      const mark = clickErr ? '✗클릭실패' : noEffect ? '·무반응' : '✓';
      const extra = [
        newCalls.length ? `API ${newCalls.length}` : '',
        changed.url ? '주소이동' : '', changed.modal ? '모달' : '',
        openedPopup ? `새창 ${openedPopup}` : '',
        (!newCalls.length && !changed.url && !changed.modal && elChanged) ? '버튼상태변화' : '',
        win.native > 0 ? '입력검사' : '',
        doubleNet && doubleNet > 1 ? `⚠서버중복 ${doubleNet}` : (doubleFire && doubleFire > 1 ? `중복시도 ${doubleFire}(앱이 합침)` : ''),
        stillBusy ? '⚠잠금유지' : '',
        errs.length ? `⚠콘솔 ${errs.length}` : '',
      ].filter(Boolean).join(' ');
      console.log(`   ${mark} [${t.i}] "${t.text || '(글자없음)'}" ${extra}`);
     } catch (err) {
       console.log(`   ✗ [${t.i}] "${t.text}" 검사 중 오류: ${String(err.message).split('\n')[0].slice(0, 80)}`);
       results.push({ route, i: t.i, text: t.text, fatal: String(err.message).slice(0, 120) });
     }
    }
    } catch (screenErr) {
      // 탭이 죽어도(Target crashed) 다음 화면으로 간다 — 한 화면이 전체 검사를 죽이지 않게.
      console.log(`  ✗ 화면 검사 중단: ${String(screenErr.message).split('\n')[0].slice(0, 90)}`);
      results.push({ route, fatal: String(screenErr.message).slice(0, 140) });
      try {
        if (!page.isClosed()) await page.close().catch(() => {});
        page = await ctx.newPage();
        await attach(page);
      } catch { /* 다음 화면 진입에서 다시 시도한다 */ }
    }
    // 화면 하나 끝날 때마다 중간 저장 — 뒤에서 터져도 앞의 결과는 남는다.
    fs.writeFileSync(path.join(OUT_DIR, `click-partial-${ROLE}.json`), JSON.stringify({ at: new Date().toISOString(), results }, null, 1));
  }

  await browser.close();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const file = path.join(OUT_DIR, `click-${ROLE}-${stamp}.json`);
  fs.writeFileSync(file, JSON.stringify({ base: BASE, rid: RID, at: new Date().toISOString(), results }, null, 1));
  const noEff = results.filter(r => r.noEffect).length;
  const skipped = results.filter(r => r.skipped).length;
  const dbl = results.filter(r => r.doubleNet && r.doubleNet > 1).length;
  const busy = results.filter(r => r.stillBusy).length;
  const cerr = results.filter(r => (r.consoleErrors || []).length).length;
  const cfail = results.filter(r => r.clickErr).length;
  console.log(`\n=== 요약: 클릭 ${results.length} · 무반응 ${noEff} · 서버중복 ${dbl} · 잠금유지 ${busy} · 콘솔오류 ${cerr} · 클릭실패 ${cfail} · 건너뜀 ${skipped} ===`);
  console.log(`기록: ${file}`);
}
run().catch(e => { console.error(e); process.exit(1); });
