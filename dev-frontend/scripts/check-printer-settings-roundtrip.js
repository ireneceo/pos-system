// 설정›프린터 2026-11-08 b 확인 — UI(상자 0·단계 수) + 배포 안전(S2 라운드트립·S3 쓰기 0·S4 표시=저장값·반증).
// 실행: cd /var/www/dev-frontend && OUT_DIR=/tmp node scripts/check-printer-settings-roundtrip.js (개발서버 · 데모 매장 38 · 끝에 원본 바이트 복원)
// 데모 매장 38 만. 원본 printer_settings 는 DB 원문 그대로 보관 → 끝에 바이트 그대로 되돌림.
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env', quiet: true });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { chromium } = require('/var/www/dev-frontend/node_modules/playwright');
const { sequelize } = require('/var/www/dev-backend/config/database');
const BASE = 'https://dev.purplehere.com';
const URL = BASE + '/restaurant/38/settings?tab=printer';
const OUT = (process.env.OUT_DIR || '/tmp') + '/';
const TOKEN = jwt.sign({ userId: 23 }, process.env.JWT_SECRET, { expiresIn: '40m' });
const UA = {
  linux: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  win: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  android: 'Mozilla/5.0 (Linux; Android 13; Pad) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  ipad: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
};
let pass = 0, fail = 0; const report = [];
const ok = (c, m) => { (c ? pass++ : fail++); const l = (c ? '  ✓ ' : '  ✗ ') + m; console.log(l); report.push(l); };
const readRaw = async () => (await sequelize.query('SELECT printer_settings ps FROM restaurants WHERE id=38', { type: 'SELECT' }))[0].ps;
const writeRaw = (raw) => sequelize.query('UPDATE restaurants SET printer_settings = :raw WHERE id=38', { replacements: { raw: typeof raw === 'string' ? raw : JSON.stringify(raw) } });
const apiGet = async () => { const r = await fetch(BASE + '/api/restaurants/38', { headers: { Authorization: 'Bearer ' + TOKEN } }); const j = await r.json(); const d = j.data || j; let ps = d.printer_settings; return typeof ps === 'string' ? JSON.parse(ps) : ps; };
const canon = (o) => JSON.stringify(o, (k, v) => (v && typeof v === 'object' && !Array.isArray(v) ? Object.keys(v).sort().reduce((a, kk) => (a[kk] = v[kk], a), {}) : v));
// Fable 판정 §9: 저장이 «없음» 을 읽는 쪽과 같은 기본값으로 채우는 칸은 동치로 본다(화이트리스트). receiptSettings 는 따로 보고.
const EQUIV = { 'kitchenPrinter.printPerItem': false, 'kitchenPrinter.mirrorToBillPrinter': false, 'kitchenPrinter.printCancellationTicket': true, 'emergencyMode': false, 'emergencyEnabledAt': null, 'printFormat': 'auto', 'consolidatedOrderTicket': { enabled: false, method: 'qztray', address: '', autoPrint: false } };
const norm = (o) => { const x = JSON.parse(JSON.stringify(o || {})); for (const [path, dv] of Object.entries(EQUIV)) { const ks = path.split('.'); let c = x; for (const k of ks.slice(0, -1)) c = c?.[k]; const last = ks[ks.length - 1]; if (c && JSON.stringify(c[last]) === JSON.stringify(dv)) delete c[last]; } for (const sp of Object.values(x.kitchenStationPrinters || {})) if (sp && (sp.copies === 1 || sp.copies === undefined)) delete sp.copies; delete x.receiptSettings; return x; };
const diffKeys = (a, b, p = '') => { const out = []; const ks = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]); for (const k of ks) { const x = a?.[k], y = b?.[k]; if (x && y && typeof x === 'object' && typeof y === 'object' && !Array.isArray(x)) out.push(...diffKeys(x, y, p + k + '.')); else if (JSON.stringify(x) !== JSON.stringify(y)) out.push(`${p}${k}: ${JSON.stringify(x)} → ${JSON.stringify(y)}`); } return out; };

async function open(browser, { ua = UA.linux, init, lang = 'en', width = 1280, conn = 'wifi', model = 'std', route } = {}) {
  const ctx = await browser.newContext({ userAgent: ua, viewport: { width, height: 900 } });
  await ctx.addInitScript(([t, l, c, m]) => {
    localStorage.setItem('auth_token', t); localStorage.setItem('currentUserRole', 'Restaurant Admin'); localStorage.setItem('i18nextLng', l);
    if (c) localStorage.setItem('printer_setup_conn', c); else localStorage.removeItem('printer_setup_conn');
    localStorage.setItem('printer_setup_model', m);
  }, [TOKEN, lang, conn, model]);
  if (init) await ctx.addInitScript(init);
  const page = await ctx.newPage();
  const writes = [], errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('request', (r) => { if (['PUT', 'POST', 'PATCH', 'DELETE'].includes(r.method()) && /\/api\/restaurants\/38|\/api\/store\/settings/.test(r.url())) writes.push(r.method() + ' ' + r.url()); });
  if (route) await route(page);
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('#printer-sec-connect', { timeout: 30000 });
  await page.waitForTimeout(1500);
  return { ctx, page, writes, errs };
}
const txt = (p) => p.evaluate(() => document.body.innerText);
const steps = (p, id = 'setup-steps') => p.getByTestId(id).locator(':scope > li').count();
// S7: §1 안내 카드 안 «테두리+배경» 상자 수 (버튼·입력·링크 제외)
const boxCount = (p, anchorSel) => p.evaluate((sel) => {
  const a = document.querySelector(sel); if (!a) return { err: 'no anchor' };
  let card = a.parentElement; while (card && !(parseFloat(getComputedStyle(card).borderTopWidth) > 0 && getComputedStyle(card).borderRadius !== '0px')) card = card.parentElement;
  if (!card) return { err: 'no card' };
  const boxes = []; card.querySelectorAll('*').forEach((el) => {
    if (['BUTTON', 'SELECT', 'INPUT', 'A', 'OPTION', 'TEXTAREA', 'CODE'].includes(el.tagName) || el.closest('button')) return;
    const cs = getComputedStyle(el); const bw = ['Top', 'Right', 'Bottom', 'Left'].filter((s) => parseFloat(cs['border' + s + 'Width']) > 0).length;
    const bg = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent';
    if (bw >= 3 && bg) boxes.push((el.textContent || '').trim().slice(0, 40));
  });
  const list = card.querySelector('ol'); return { boxes, olWidth: list ? list.clientWidth : null };
}, anchorSel);

(async () => {
  const ORIG = await readRaw();
  const origObj = typeof ORIG === 'string' ? JSON.parse(ORIG) : ORIG;
  const browser = await chromium.launch();
  try {
    // ── A. PC 브라우저 — 틀
    console.log('A. PC browser — layout'); report.push('A. PC browser');
    {
      const { ctx, page, writes, errs } = await open(browser, {});
      ok((await page.getByTestId('setup-device-label').first().innerText()) === 'PC · web browser', '기기 줄');
      let n = await steps(page); ok(n === 9, 'Wi-Fi + 표준 = 9단계 (' + n + ')');
      const b = await txt(page);
      ok(!b.includes('Which method should I pick?') && !b.includes('QZ Tray runs on each'), '옛 표·QZ 설명 문단 없음');
      ok(!b.includes('PurpleHere standard printer — recommended model'), '«추천 기종» 접힘 없음');
      ok(b.includes('Open App Store (iPhone · iPad)') && b.includes('Download EspTouch (Android)') && !b.includes('Open Google Play'), 'EspTouch 버튼 2개 · Play 없음');
      ok((await page.getByTestId('setup-helper-row').count()) === 1, '도우미 단계 안 버튼 줄');
      const s6 = await page.getByTestId('setup-steps').locator(':scope > li').nth(5).innerText();
      ok(s6.includes('Download Printer Setup (Windows)') && s6.includes('Check Connection') && s6.includes('Find Printers'), '⑥ 단계에 설치·연결 확인·찾기 버튼');
      ok(/Not connected — install, then/.test(s6), '상태 한 줄(연결 안 됨 — 설치 뒤 연결 확인)');
      const bx = await boxCount(page, '[data-testid=setup-device-label]');
      ok(bx.boxes && bx.boxes.length === 0, '안내 카드 안 상자 0 (' + JSON.stringify(bx.boxes) + ')');
      ok(bx.olWidth && bx.olWidth <= 760, '목록 폭 ≤ 760 (' + bx.olWidth + ')');
      await page.locator('button:has-text("Did not work?")').first().click();
      ok((await txt(page)).includes('App says Timeout'), '«안 될 때 ▸» 펼침');
      await page.screenshot({ path: OUT + 'b-A-pc-wifi-std.png', fullPage: true });
      for (const [m, label, exp] of [['epson', 'Epson TM', 7], ['star', 'Star', 7], ['other', 'Other model', 7]]) {
        await page.locator(`[role=radio]:has-text("${label}")`).first().click();
        n = await steps(page); ok(n === exp, `Wi-Fi + ${m} = ${exp}단계 (${n})`);
      }
      const s1 = await page.getByTestId('setup-steps').locator(':scope > li').first().innerText();
      ok(s1.includes('the Other model way') && s1.includes('setup sheet'), '다른 기종 1단계 = 그 기종 방법');
      await page.screenshot({ path: OUT + 'b-A-pc-wifi-other.png', fullPage: true });
      await page.locator('[role=radio]:has-text("LAN cable")').first().click(); n = await steps(page); ok(n === 7, 'LAN = 7 (' + n + ')');
      await page.locator('[role=radio]:has-text("USB cable")').first().click(); n = await steps(page); ok(n === 5, 'USB = 5 (' + n + ')');
      ok((await page.getByTestId('setup-model').count()) === 0 && (await txt(page)).includes('Buying a printer?'), 'USB 면 기종 줄 대신 «새로 사신다면»');
      await page.screenshot({ path: OUT + 'b-A-pc-usb.png', fullPage: true });
      await page.locator('[role=radio]:has-text("PurpleHere standard")').count();
      await page.locator('button:has-text("Two printers (counter + kitchen)")').click();
      const two = await page.getByTestId('setup-two-printers').locator('li').count(); ok(two === 7, '2대 7줄 (' + two + ')');
      ok((await page.getByTestId('setup-two-printers').innerText()).includes('fails the Test in section 2'), 'l5 새 문구(M5)');
      // §2 글자(M4·M6)
      const testBtn = page.locator('#printer-sec-assign ~ * button:has-text("Test")').first();
      ok(writes.length === 0, 'S3 PC 쓰기 0 (' + writes.join(', ') + ')');
      ok(errs.length === 0, '화면 오류 0 ' + errs.slice(0, 2).join(' | '));
      await ctx.close();
    }
    // ── A2. 한국어
    console.log('A2. ko'); report.push('A2. ko');
    {
      const { ctx, page, errs } = await open(browser, { ua: UA.win, lang: 'ko' });
      const b = await txt(page);
      ok(b.includes('내 프린터') && b.includes('PurpleHere 표준') && b.includes('먼저: 폰을 매장 2.4 GHz'), 'ko 글자(기종 줄 · e3First)');
      ok(!/setupGuide\.|printer\.assign\./.test(b), '키 이름 노출 0');
      await page.screenshot({ path: OUT + 'b-A2-ko.png', fullPage: true });
      ok(errs.length === 0, '화면 오류 0'); await ctx.close();
    }
    // ── C. Windows 앱 흉내
    console.log('C. Windows app (sim)'); report.push('C. Windows app (sim)');
    {
      const init = () => { window.__NATIVE_PRINT = { available: true, version: '0.2.0', listPrinters: async () => ['COUNTER', 'KITCHEN'], getDefaultPrinter: async () => 'COUNTER', diagnostics: async () => ({}) }; };
      const { ctx, page, errs, writes } = await open(browser, { ua: UA.win, init });
      const b = await txt(page);
      ok(!b.includes('Direct printing is active'), '녹색 띠 없음(M7)');
      ok(b.includes('Network printer (enter IP)…”') || b.includes('“Network printer (enter IP)…”'), '등록 A 문구 = 앱 드롭다운 글자(M1)');
      const s6 = await page.getByTestId('setup-steps').locator(':scope > li').nth(5).innerText();
      ok(s6.includes('Reload printers') && !s6.includes('Check Connection') && s6.includes('COUNTER, KITCHEN'), '⑥ = 다시 읽기 + 찾은 프린터');
      const bx = await boxCount(page, '[data-testid=setup-device-label]'); ok(bx.boxes && bx.boxes.length === 0, '상자 0 (' + JSON.stringify(bx.boxes) + ')');
      await page.screenshot({ path: OUT + 'b-C-win-app.png', fullPage: true });
      ok(writes.length === 0, 'S3 쓰기 0'); ok(errs.length === 0, '화면 오류 0 ' + errs.slice(0, 2).join(' | ')); await ctx.close();
    }
    // ── B. 안드로이드 앱 흉내
    console.log('B. Android app (sim)'); report.push('B. Android app (sim)');
    {
      const init = () => {
        window.__NATIVE_PRINT = { available: true, version: '0.4.1', listPrinters: async () => ['KITCHEN'], getDefaultPrinter: async () => null, diagnostics: async () => ({}) };
        window.__NATIVE_PRINT_SETUP = { platform: 'android', getState: async () => ({ net: [{ name: 'KITCHEN', host: '192.168.0.104', port: 9100 }], btPermission: 'granted', bonded: [] }), addNetPrinter: async () => ({ ok: true }), removeNetPrinter: async () => ({ ok: true }), requestBtPermission: async () => ({ state: 'granted' }), openSystemBluetoothSettings: async () => ({ ok: true }), openAppSettings: async () => ({ ok: true }) };
        localStorage.setItem('android_printer_conn', 'wifi');
      };
      const { ctx, page, errs, writes } = await open(browser, { ua: UA.android, init, width: 1100 });
      let n = await steps(page, 'android-steps'); ok(n === 8, '안드로이드 Wi-Fi + 표준 = 8단계 (' + n + ')');
      const b = await txt(page);
      ok((b.match(/How is the printer connected\?/g) || []).length <= 1 && !b.includes('Direct printing is active'), '연결 방식 고르기 1번만 · 녹색 띠 없음(M7)');
      ok(/Not ready to auto-print yet|Ready to auto-print/.test(b), '준비 상자 그대로');
      const ready = await page.locator('text=/— step \\d/').first().innerText().catch(() => '');
      ok(!ready || /step (5|6|7)/.test(ready), '준비 상자 «— N단계» = 8단계 순서 기준 (' + ready.slice(0, 80) + ')');
      const bx = await boxCount(page, '[data-testid=android-steps]');
      ok(bx.boxes && bx.boxes.length <= 1, '안내 카드 상자 ≤1(준비 상자) (' + JSON.stringify(bx.boxes) + ')');
      await page.screenshot({ path: OUT + 'b-B-android-std.png', fullPage: true });
      await page.locator('[role=radio]:has-text("Epson TM")').first().click();
      n = await steps(page, 'android-steps'); ok(n === 6, '안드로이드 Wi-Fi + Epson = 6단계 (' + n + ')');
      ok(writes.length === 0, 'S3 쓰기 0'); ok(errs.length === 0, '화면 오류 0 ' + errs.slice(0, 2).join(' | ')); await ctx.close();
    }
    // ── D/E. 안드로이드 브라우저 · iPad
    console.log('D/E'); report.push('D/E');
    for (const [ua, name] of [[UA.android, 'android-browser'], [UA.ipad, 'ipad']]) {
      const { ctx, page, errs, writes } = await open(browser, { ua, width: 1100 });
      const bx = await boxCount(page, '[data-testid=setup-device-label]'); ok(bx.boxes && bx.boxes.length === 0, name + ' 상자 0 (' + JSON.stringify(bx.boxes) + ')');
      await page.screenshot({ path: OUT + 'b-' + name + '.png', fullPage: true });
      ok(writes.length === 0 && errs.length === 0, name + ' 쓰기 0 · 오류 0 ' + JSON.stringify(writes) + ' ' + errs.slice(0, 2).join(' | ')); await ctx.close();
    }
    // ── S2 · S4 라운드트립 (모양 3가지) + 반증
    console.log('S2/S4 round trip'); report.push('S2/S4 round trip');
    const st = origObj.kitchenStationPrinters || {};
    const shapes = {
      a: ORIG,
      b: JSON.stringify({ printerMode: 'rawbt', billPrinter: { enabled: true, name: '', autoPrint: false, address: '' }, kitchenPrinter: { enabled: true, name: '', autoPrint: true, address: 'KITCHEN' }, kitchenStationPrinters: st, workstations: [{ id: 'ws_default', name: 'Main POS', billPrinter: { enabled: true, name: '', autoPrint: true, method: 'qztray', address: 'POS-80C' } }] }),
      c: JSON.stringify({ printerMode: 'rawbt', billPrinter: { enabled: true, name: '', autoPrint: false, address: '' }, kitchenPrinter: { enabled: true, name: '', autoPrint: true, method: 'qztray', address: 'KITCHEN' }, kitchenStationPrinters: st, workstations: [{ id: 'ws_default', name: 'Main POS', billPrinter: { enabled: true, name: '', autoPrint: true, method: 'qztray', address: 'POS-80C' } }, { id: 'ws_check2', name: 'POS 2', billPrinter: { enabled: true, name: '', autoPrint: false, method: 'rawbt', address: '' } }] }),
    };
    const roundTrip = async (shapeName, raw, stripMethod = false) => {
      await writeRaw(raw);
      const A = await apiGet();
      const route = stripMethod ? async (page) => {
        await page.route(/\/api\/store\/settings/, async (r) => {
          if (r.request().method() !== 'PUT') return r.continue();
          const body = JSON.parse(r.request().postData() || '{}');
          if (body.printer_settings) { delete body.printer_settings.billPrinter?.method; delete body.printer_settings.kitchenPrinter?.method; }
          return r.continue({ postData: JSON.stringify(body) });
        });
      } : undefined;
      const { ctx, page, writes } = await open(browser, { route });
      await page.waitForTimeout(8000);
      const mountWrites = writes.length;
      // S4: 연결 방식 select(값 집합 browser/qztray/rawbt) 표시값
      const shown = await page.evaluate(() => [...document.querySelectorAll('select')].filter((s) => { const v = [...s.options].map((o) => o.value).sort().join(','); return v === 'browser,qztray,rawbt'; }).map((s) => s.value));
      const expWs = (A.workstations || []).map((w) => w.billPrinter?.method || 'browser');
      // 같은 값 다시 고르기: 스테이션 Print Copies 를 다른 값 → 원래 값(자동저장 2번)
      const copies = page.locator('select:has(option[value="3"]):has(option[value="1"])').first();
      const cur = await copies.inputValue();
      const other = cur === '2' ? '1' : '2';
      const w1 = page.waitForResponse((r) => r.request().method() === 'PUT' && /\/api\/store\/settings/.test(r.url()), { timeout: 20000 });
      await copies.selectOption(other); await (await w1).finished?.();
      await page.waitForTimeout(1500);
      const w2 = page.waitForResponse((r) => r.request().method() === 'PUT' && /\/api\/store\/settings/.test(r.url()), { timeout: 20000 });
      await copies.selectOption(cur); await w2;
      await page.waitForTimeout(2500);
      const B = await apiGet();
      await ctx.close();
      return { A, B, mountWrites, shown, expWs, saves: writes.length - mountWrites };
    };
    try {
      for (const name of ['a', 'b', 'c']) {
        const r = await roundTrip(name, shapes[name]);
        const same = canon(norm(r.A)) === canon(norm(r.B));
        ok(same, `S2 모양 (${name}) 불러오기→저장 ${r.saves}회→다시 불러오기 동일(동치 기본값 제외)` + (same ? '' : ' — 다름: ' + diffKeys(norm(r.A), norm(r.B)).slice(0, 6).join(' ; ')));
        const rcpt = JSON.stringify(r.A.receiptSettings) === JSON.stringify(r.B.receiptSettings);
        report.push(`  · 정보 — 모양 (${name}) receiptSettings: ${rcpt ? '그대로' : (r.A.receiptSettings ? '바뀜' : '없던 것이 저장 1회에 생김(기존 동작 · Fable §9 이번엔 안 고침)')}`); console.log(report[report.length - 1]);
        ok(r.mountWrites === 0, `S3 모양 (${name}) 열기만 했을 때 쓰기 0 (${r.mountWrites})`);
        ok(r.expWs.every((m, i) => r.shown[i] === m), `S4 모양 (${name}) POS 자리 연결 방식 표시=저장값 (보임 ${JSON.stringify(r.shown.slice(0, r.expWs.length))} · 저장 ${JSON.stringify(r.expWs)})`);
        if (name === 'c') ok(r.B.kitchenPrinter?.method === 'qztray', `M3 모양 (c) 저장 뒤에도 kitchenPrinter.method = qztray (${r.B.kitchenPrinter?.method})`);
      }
      // S3 (a) 원본 모양으로 5번 열기 — 시드 경합 고친 뒤 쓰기 0
      await writeRaw(ORIG);
      let tot = 0;
      for (let i = 0; i < 5; i++) { const o = await open(browser, {}); await o.page.waitForTimeout(8000); tot += o.writes.length; await o.ctx.close(); }
      ok(tot === 0, 'S3 모양 (a) 5번 열기 — 쓰기 ' + tot + '건');
      // 반증: 저장 본문에서 method 를 빼면(= M3 이전 동작) 검사가 실패해야 한다
      const f = await roundTrip('c', shapes.c, true);
      const caught = canon(f.A) !== canon(f.B) && f.B.kitchenPrinter?.method === 'rawbt';
      ok(caught, `반증: method 를 뺀 저장이면 검사가 잡는다 (kitchenPrinter.method ${f.A.kitchenPrinter?.method} → ${f.B.kitchenPrinter?.method})`);
    } finally {
      await writeRaw(ORIG);
      const back = await readRaw();
      ok(back === ORIG, '매장 38 원본 printer_settings 바이트 그대로 복원');
    }
  } finally {
    await browser.close();
    await sequelize.close().catch(() => {});
  }
  console.log(`\n${pass} pass / ${fail} fail`);
  require('fs').writeFileSync(OUT + 'check-printer-b.result.txt', report.join('\n') + `\n${pass} pass / ${fail} fail\n`);
  process.exit(fail ? 1 : 0);
})();
