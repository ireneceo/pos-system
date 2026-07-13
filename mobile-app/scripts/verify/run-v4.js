#!/usr/bin/env node
'use strict';
/**
 * V4 — Android end-to-end through the REAL app poller (design §8-6).
 *
 * V3 proves the bridge emits correct bytes when called directly. V4 proves the whole
 * chain a shop actually depends on: an order lands → the web app's auto-print poller
 * (running inside the Android WebView) claims it → billPrint dispatches → the native
 * bridge sends → the printer gets exactly ONE ticket, and the order is stamped printed.
 *
 * And the failure direction, which matters more: with a printer name that does not
 * exist on the tablet, NOTHING is printed AND the order is NOT stamped — it must stay
 * armed for a retry. A "success-looking non-print" is the one outcome a shop can't see.
 *
 * Demo restaurant only (is_demo) — never touches a live shop's data.
 *
 *   node scripts/verify/run-v4.js [--keep]
 */
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');
const net = require('net');

const ROOT = path.resolve(__dirname, '../..');
const SDK = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME || '/opt/android-sdk';
const ADB = path.join(SDK, 'platform-tools/adb');
const EMULATOR = path.join(SDK, 'emulator/emulator');
// AOSP (no-GMS) AVD. A google_apis image drags Google Play Services into a headless CI
// box; on a memory-tight server GMS ANRs, dies, and takes the app down with it
// ("Killing com.purplehere.pos.mobile: depends on provider ...FontsProvider in dying proc
// com.google.android.gms.persistent") — which reads as "the app never loaded" and hid the
// real V4 result for three runs. The gate needs a WebView, not Google Play.
const AVD = process.env.PURPLE_AVD || 'purplepos-ci';
const APK = path.join(ROOT, 'android/app/build/outputs/apk/debug/app-debug.apk');
const PKG = 'com.purplehere.pos.mobile';
const CAP = '/tmp/fake-printer-v4.jsonl';       // 'KITCHEN' — the master kitchen printer
const CAP_ST = '/tmp/fake-printer-v4-station.jsonl'; // 'KQ1' — a station printer
const API = 'http://localhost:3001/api';
const MARKER = '__V4_ANDROID_PRINT__';
// The demo-login key the app logs in with, and the account it maps to
// (services/authService.js). Its restaurant is the one the poller watches.
const DEMO_RA_KEY = 'test_restaurant_admin';
const DEMO_RA_EMAIL = 'admin@kdine.com';
const KEEP = process.argv.includes('--keep');

const children = [];
let failed = 0;
// Set once the shop's real printer config has been snapshotted. The gate REWIRES a live
// (demo) shop's printers to run, so every exit path — crash, ctrl-C, SSH drop — has to put
// it back. An interrupted run once left the demo shop with its station printers deleted,
// which is precisely the kind of silent config damage the print rules exist to prevent.
let restoreShop = null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const sh = (cmd, args, opts = {}) => spawnSync(cmd, args, { encoding: 'utf8', timeout: 120000, ...opts });
function assert(name, pass, detail) {
  if (!pass) failed++;
  console.log(`  ${pass ? '✓' : '✗'} ${name}${detail ? `  — ${detail}` : ''}`);
}
async function waitFor(label, fn, timeoutMs, intervalMs = 2000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try { if (await fn()) return true; } catch { /* keep polling */ }
    await sleep(intervalMs);
  }
  throw new Error(`timeout waiting for ${label}`);
}
function cleanup() {
  if (KEEP) return;
  for (const c of children) { try { c.kill('SIGKILL'); } catch { /* gone */ } }
  sh(ADB, ['emu', 'kill']);
}

// ── dev API ────────────────────────────────────────────────────────────────
function api(method, urlPath, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const u = new URL(API + urlPath);
    const req = http.request({
      hostname: u.hostname, port: u.port, path: u.pathname + u.search, method,
      headers: {
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }, (res) => {
      let b = '';
      res.on('data', (c) => (b += c));
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(b); } catch { /* non-json */ }
        resolve({ status: res.statusCode, body: parsed });
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => req.destroy(new Error('api timeout')));
    if (data) req.write(data);
    req.end();
  });
}

const jobs = (file = CAP) => {
  try { return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)); }
  catch { return []; }
};
const clearJobs = () => { fs.writeFileSync(CAP, ''); fs.writeFileSync(CAP_ST, ''); };

// The app must be alive to be judged. Without this check a system-killed app looks exactly
// like a broken bridge, and the gate blames the code for an emulator problem.
const appAlive = () => !!(sh(ADB, ['shell', 'pidof', PKG], { timeout: 15000 }).stdout || '').trim();

// ── CDP: evaluate one expression in the app's WebView ───────────────────────
function evalInApp(expression) {
  const f = path.join(__dirname, 'expr/.v4.json');
  fs.writeFileSync(f, JSON.stringify([{ label: 'e', expression }]));
  const r = sh('node', [path.join(__dirname, 'cdp-eval.js'), '9222', f], { timeout: 60000 });
  try { return JSON.parse(r.stdout)[0].value; }
  catch { throw new Error(`cdp eval failed: ${(r.stderr || r.stdout || '').slice(0, 200)}`); }
}

// The emulator is the heaviest thing this box ever runs (~4.5 GB RSS). Booting one on a
// server that is already short of memory doesn't just fail the gate — it starves the dev
// backend and MySQL, and the box stops answering (2026-07-13: the session's own SSH died
// that way). Refuse to start rather than take the server down; the gate is worthless if it
// costs an outage to run.
function assertRoomForEmulator() {
  const info = fs.readFileSync('/proc/meminfo', 'utf8');
  const availKb = parseInt((info.match(/MemAvailable:\s+(\d+) kB/) || [])[1] || '0', 10);
  const availMb = Math.round(availKb / 1024);
  if (availMb < 3000) {
    throw new Error(`가용 메모리 ${availMb}MB — 에뮬레이터(약 4.5GB)를 띄우면 서버가 죽는다. 3000MB 이상 확보 후 실행 (다른 에뮬레이터/빌드 종료)`);
  }
  console.log(`  가용 메모리 ${availMb}MB — 에뮬레이터 기동 가능`);
}

async function main() {
  console.log('\n=== V4 — Android 폴러 전 구간 E2E (데모 매장, 실제 주문 → 앱이 인쇄) ===\n');
  if (!fs.existsSync(APK)) throw new Error(`APK 없음: ${APK}`);
  assertRoomForEmulator();

  // The models read DB creds from dev-backend's .env — load it explicitly, since this
  // script runs from mobile-app.
  require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
  const { Order, Restaurant, User } = require('/var/www/dev-backend/models');

  // The restaurant MUST be the one the app's user logs into — the poller only ever picks
  // up its own restaurant's orders, so an order created anywhere else simply never prints
  // (which reads as "the app is broken" when it is the test that is wrong).
  const raUser = await User.findOne({ where: { email: DEMO_RA_EMAIL } });
  const rid = raUser && raUser.restaurant_id;
  if (!rid) throw new Error(`demo-login 계정(${DEMO_RA_EMAIL})의 restaurant_id 를 찾을 수 없다`);
  const shop = await Restaurant.findByPk(rid);
  if (!shop) throw new Error(`rid=${rid} 매장 없음`);
  // Hard guard: this gate creates and deletes orders, so it must NEVER touch the
  // production database. The dev DB is the only allowed target — the demo-login account
  // itself is a dev fixture (admin@kdine.com), and production runs on its own DB.
  const dbName = Order.sequelize.config.database;
  if (!/dev/i.test(dbName)) {
    throw new Error(`DB '${dbName}' 은 개발 DB 가 아니다 — 주문을 만드는 게이트라 중단한다`);
  }
  console.log(`  검증 매장 rid=${rid} (${shop.name}) · DB=${dbName}`);

  // Orphan sweep — marker-scoped, so a previous interrupted run can't skew this one.
  await Order.destroy({ where: { customer_name: MARKER, restaurant_id: rid }, force: true });

  // 1. fake printers — the master kitchen printer and one station printer. Two of them,
  //    because "a ticket came out" is not the contract: it must come out of the RIGHT
  //    printer. One capture file per printer is what makes mis-routing visible.
  for (const [port, cap] of [['9100', CAP], ['9101', CAP_ST]]) {
    const fp = spawn('node', [path.join(__dirname, 'fake-printer.js'), port, cap], { stdio: 'ignore' });
    children.push(fp);
  }
  await sleep(400);

  // 2. token + printer settings (the REAL path: server printer_settings, restaurant-admin)
  const login = await api('POST', '/auth/demo-login', { key: DEMO_RA_KEY });
  const token = login.body?.token || login.body?.data?.token;
  if (!token) throw new Error('demo-login 실패');

  const readPrinter = async () => {
    const r = await api('GET', `/store/settings?restaurant_id=${rid}`, null, token);
    const ps = r.body?.data?.printer_settings || null;
    return typeof ps === 'string' ? JSON.parse(ps) : ps;
  };
  // Snapshot from the ROW, so the restore at the end puts back exactly what was there
  // (an API read-back can normalise keys; this gate must leave the shop bit-for-bit as found).
  const savedPrinter = (() => {
    const ps = shop.printer_settings;
    if (!ps) return null;
    if (typeof ps === 'string') { try { return JSON.parse(ps); } catch { return null; } }
    return JSON.parse(JSON.stringify(ps));
  })();
  restoreShop = async () => {
    if (!savedPrinter) return;
    await shop.update({ printer_settings: savedPrinter });
    await Order.destroy({ where: { customer_name: MARKER, restaurant_id: rid }, force: true });
    console.log('  매장 프린터 설정 원복 + 테스트 주문 정리 완료');
  };

  // The settings route only accepts snake_case `printer_settings` (routes/store.js
  // allowedFields). A camelCase key is not rejected — it is silently dropped and the
  // route still answers 200, which is exactly the "success-looking non-effect" this
  // gate exists to catch. So never trust the status code: write, read back, and refuse
  // to run the gate on settings that did not actually land.
  //
  // Write the STATION printers too, always. billPrint routes a kitchen ticket to the
  // station printers whenever the shop has any (printKitchenTicketViaRawBT → the
  // `hasStationPrinters` branch) and NEVER falls back to kitchenPrinter.address in that
  // case. The demo shop happens to carry two stations pointed at 'BAR', so setting only
  // the master printer left the app printing to a name this tablet has never heard of:
  // zero bytes, and a gate that blamed the app for its own fixture. The config under test
  // must be stated in full — every field the dispatch reads.
  // Written straight to the row, not through PUT /store/settings, for ONE reason: the
  // settings route is deliberately wipe-proof (utils/settingsGuard — the 2026-06-25 thefire
  // accident where a half-loaded Settings page PUT an empty config and silently switched the
  // kitchen off). It therefore restores station printers that an incoming payload omits, so
  // no API caller can hand us a station-free shop — and a station-free shop is exactly the
  // config the master-printer phase must run on. The fixture is still judged through the API
  // read-back below, because that GET is what the app actually consumes.
  const setKitchen = async ({ address, stations }) => {
    await shop.update({
      printer_settings: {
        ...(savedPrinter || {}),
        kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address, copies: 1 },
        kitchenStationPrinters: stations || {},
      },
    });
    const now = await readPrinter();
    const kp = (now && now.kitchenPrinter) || {};
    const st = (now && now.kitchenStationPrinters) || {};
    const wantSt = JSON.stringify(Object.entries(stations || {}).map(([id, s]) => [id, s.address]).sort());
    const gotSt = JSON.stringify(Object.entries(st).map(([id, s]) => [id, s && s.address]).sort());
    if (kp.address !== address || kp.method !== 'qztray' || kp.autoPrint !== true || wantSt !== gotSt) {
      throw new Error(`프린터 설정이 앱이 읽는 API 에 안 보인다 (kitchen=${JSON.stringify(kp)}, stations=${gotSt} — 기대 ${wantSt}) — 설정이 안 먹은 채로 인쇄를 판정하면 거짓 결과가 된다`);
    }
    return true;
  };
  const STATION = { 25: { name: '', autoPrint: true, method: 'qztray', address: 'KQ1', stationName: 'Kitchen Station 01' } };
  await setKitchen({ address: 'KITCHEN', stations: {} });
  console.log(`  프린터 설정: kitchen → 'KITCHEN' (qztray · autoPrint ON) · 스테이션 없음 — 서버 되읽기로 확인`);

  // 3. emulator + app
  if ((sh(ADB, ['shell', 'getprop', 'sys.boot_completed']).stdout || '').trim() !== '1') {
    console.log('  에뮬레이터 부팅 중...');
    const emu = spawn(EMULATOR, ['-avd', AVD, '-no-window', '-no-audio', '-no-snapshot',
      '-gpu', 'swiftshader_indirect', '-no-boot-anim'], { stdio: 'ignore' });
    children.push(emu);
    await waitFor('boot', () => (sh(ADB, ['shell', 'getprop', 'sys.boot_completed']).stdout || '').trim() === '1', 300000, 3000);
  }
  sh(ADB, ['install', '-r', APK]);
  sh(ADB, ['shell', 'am', 'start', '-n', `${PKG}/.MainActivity`]);

  // Re-resolve the devtools socket on EVERY poll: `adb install -r` restarts the app, so
  // the socket name carries a new pid. Forwarding once to the pre-install socket leaves
  // the port pointing at a dead process and the wait never succeeds (looks like "the app
  // never loaded" when the app is fine).
  let attempt = 0;
  await waitFor('page target', () => new Promise((resolve) => {
    attempt++;
    // Short adb timeouts: a sluggish emulator can make `adb shell` take a long time, and
    // a 120s default would burn the whole budget in one poll and report "app never loaded".
    const socks = sh(ADB, ['shell', 'cat', '/proc/net/unix'], { timeout: 15000 }).stdout || '';
    const m = socks.match(/webview_devtools_remote_\d+/);
    if (!m) { console.log(`   [${attempt}] devtools 소켓 없음 (앱 기동 대기)`); return resolve(false); }
    sh(ADB, ['forward', 'tcp:9222', `localabstract:${m[0]}`], { timeout: 15000 });
    // Use a real HTTP client, not a hand-rolled socket write: devtools answers with
    // keep-alive, so a raw socket reader that waits for 'close' can end up with the
    // headers only and conclude "no page" while the app is perfectly fine.
    const req = http.get({ host: '127.0.0.1', port: 9222, path: '/json', timeout: 5000 }, (res) => {
      let d = '';
      res.on('data', (c) => { d += c; });
      res.on('end', () => {
        const ok = /purplehere\.com/.test(d);
        if (!ok) console.log(`   [${attempt}] 원격 페이지 아직 없음 (${d.length}바이트)`);
        resolve(ok);
      });
    });
    req.on('error', (e) => { console.log(`   [${attempt}] devtools 연결 실패: ${e.message}`); resolve(false); });
    req.on('timeout', () => { req.destroy(); resolve(false); });
  }), 240000, 3000);
  // waitFor() swallows exceptions by design (transient adb/cdp hiccups shouldn't abort the
  // gate), so the app-death check gets its own loop — a killed app must be REPORTED, not
  // polled for 90 seconds and then reported as "no bridge" (an app problem it isn't).
  const bridgeUp = () => {
    try { return evalInApp("(async () => typeof window.__NATIVE_PRINT === 'object' && typeof window.__NATIVE_PRINT_SETUP === 'object')()") === true; }
    catch { return false; }
  };
  const t0Bridge = Date.now();
  while (!bridgeUp()) {
    if (!appAlive()) throw new Error('앱 프로세스가 죽었다 — 코드가 아니라 에뮬레이터 환경 문제 (logcat: 시스템이 앱을 kill). GMS 없는 AVD 인지 확인');
    if (Date.now() - t0Bridge > 90000) throw new Error('브릿지(__NATIVE_PRINT)가 90초 안에 안 뜬다 — 앱은 살아 있음');
    await sleep(3000);
  }
  console.log('  앱 기동 + 브릿지 확인');

  // 4. register the printer ON THE TABLET (name → host:port; Android has no OS spooler,
  //    which is the whole reason the registry exists), log the app in, then load /pos.
  //
  // The printer SETTINGS are deliberately NOT injected into localStorage here. billPrint
  // reads them from localStorage, but StoreContext overwrites that key with the server's
  // printer_settings on every store load — so an injected value is wiped the moment the app
  // reloads, and the gate would be testing a state no shop can ever be in. The honest path
  // is the real one: the settings live on the server (written above, read back), and the app
  // pulls them down. reloadAndWaitForPrinter() below proves the app actually received them.
  // 10.0.2.2 = the host loopback as seen from the emulator, so both names resolve to the
  // fake printers running on this server. 'KQ1' is registered even for the master-printer
  // phase: a tablet in a real shop carries every printer it might be pointed at.
  evalInApp(`(async () => {
    await window.__NATIVE_PRINT_SETUP.addNetPrinter({name:'KITCHEN', host:'10.0.2.2', port:9100});
    await window.__NATIVE_PRINT_SETUP.addNetPrinter({name:'KQ1', host:'10.0.2.2', port:9101});
    localStorage.setItem('auth_token', ${JSON.stringify(token)});
    return true;
  })()`);

  // Reload the app and wait until the poller's OWN view of the printer settings (the exact
  // localStorage key billPrint reads) matches what the server holds. Judging on a sleep()
  // instead would race the store fetch and report "the app doesn't print" for an app that
  // simply had not been told which printer to use yet.
  //
  // The signature covers the STATIONS as well as the master. Waiting on the master address
  // alone would pass instantly when only the stations changed — the app would still hold the
  // previous routing, and the gate would judge a config that is not the one under test.
  const appPrinterSig = () => evalInApp(`(async () => { try {
    const ps = JSON.parse(localStorage.getItem('printerSettings')||'{}');
    const st = ps.kitchenStationPrinters || {};
    return JSON.stringify([(ps.kitchenPrinter||{}).address || null,
      Object.entries(st).map(([id, s]) => [id, s && s.address]).sort()]);
  } catch { return null; } })()`);
  const wantSig = ({ address, stations }) => JSON.stringify([address,
    Object.entries(stations || {}).map(([id, s]) => [id, s.address]).sort()]);
  const reloadAndWaitForPrinter = async (cfg) => {
    const want = wantSig(cfg);
    evalInApp("(async () => { location.href = '/pos'; return true; })()");
    await sleep(10000); // app reloads, authenticates, StoreContext syncs settings, poller arms
    await waitFor('bridge after reload', () => { try { return evalInApp("(async () => typeof window.__NATIVE_PRINT === 'object')()") === true; } catch { return false; } }, 60000, 3000);
    await waitFor(`app to receive printer config ${want}`, () => appPrinterSig() === want, 60000, 3000);
  };
  const MASTER_CFG = { address: 'KITCHEN', stations: {} };
  const STATION_CFG = { address: 'KITCHEN', stations: STATION };
  const GHOST_CFG = { address: 'GHOST', stations: {} };
  await reloadAndWaitForPrinter(MASTER_CFG);
  const loggedIn = evalInApp("(async () => ({ url: location.pathname, token: !!localStorage.getItem('auth_token') }))()");
  console.log(`  앱 로그인 상태: ${JSON.stringify(loggedIn)} · 앱이 받은 프린터 설정: ${appPrinterSig()}`);

  // The order the poller stamps as printed is judged on the ITEM printed_at stamps, not on
  // needs_print. print-claim already sets needs_print=false while the print is still in
  // flight, so a needs_print snapshot cannot tell "claimed, printing" from "declared
  // printed" — the earlier gate read a mid-flight claim as silent ticket loss. printed_at is
  // written by PATCH /printed alone, i.e. only when the app CLAIMS the paper came out.
  const printedStamps = async (id) => {
    const o = await Order.findByPk(id);
    let items = o && o.order_items;
    if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
    return { stamped: (items || []).filter((i) => i && i.printed_at).length, needsPrint: o && o.needs_print };
  };

  clearJobs();
  console.log('\n판정:\n');

  // ── V4-1: a real order must print exactly once, and be stamped printed ────
  const order = await Order.create({
    restaurant_id: rid,
    customer_name: MARKER,
    total_amount: 30,
    status: 'pending',
    source: 'pos',
    order_type: 'dine_in',
    needs_print: true,
    order_items: [
      { id: 'v4-1', name: '불고기 덮밥', quantity: 2, price: 12 },
      { id: 'v4-2', name: 'Iced Latte', quantity: 1, price: 6 },
    ],
  });

  let printedJobs = [];
  try {
    await waitFor('ticket at the fake printer', () => jobs().length >= 1, 90000, 2000).catch(() => {});
    await sleep(8000); // would a duplicate arrive? (the claim contract must prevent it)
    printedJobs = jobs();

    assert('V4-1 폴러가 주문을 잡아 앱이 티켓을 인쇄 (정확히 1장)',
      printedJobs.length === 1,
      `${printedJobs.length}장 도착${printedJobs[0] ? ` (${printedJobs[0].len}바이트)` : ''}`);

    const raster = printedJobs[0] && printedJobs[0].hex.startsWith('1b40');
    const hasCut = printedJobs[0] && printedJobs[0].hex.includes('1d564200');
    assert('V4-2 인쇄된 것이 진짜 티켓 (ESC @ 시작 · 컷 포함 · 빈 잡 아님)',
      !!raster && !!hasCut && printedJobs[0].len > 500,
      printedJobs[0] ? `${printedJobs[0].len}바이트 raster=${raster} cut=${hasCut}` : '없음');

    // Judge on the printed_at STAMP, not on needs_print: print-claim clears needs_print
    // before the paper exists, so only the stamp says "the app declared this printed".
    const st = await waitFor('printed stamp', async () => (await printedStamps(order.id)).stamped > 0, 30000, 2000)
      .then(() => printedStamps(order.id)).catch(() => printedStamps(order.id));
    assert('V4-3 인쇄 후 printed 도장 (needs_print=0 + 품목 printed_at) — 재인쇄 0',
      st.stamped > 0 && (st.needsPrint === false || st.needsPrint === 0),
      `printed_at ${st.stamped}건 · needs_print=${st.needsPrint}`);
  } finally {
    await Order.destroy({ where: { id: order.id }, force: true });
  }

  // ── V4-6: a station shop routes to the STATION printer, never to the master ──
  // This is how a real kitchen is configured (thefire: KQ1/KQ2/BAR), and billPrint honours
  // it by IGNORING kitchenPrinter.address once any station exists. A gate that only ever
  // tests the master printer would call a shop "printing fine" while every station ticket
  // goes to a name the tablet cannot resolve.
  await setKitchen(STATION_CFG);
  await reloadAndWaitForPrinter(STATION_CFG);
  clearJobs();
  const stationOrder = await Order.create({
    restaurant_id: rid,
    customer_name: MARKER,
    total_amount: 18,
    status: 'pending',
    source: 'pos',
    order_type: 'dine_in',
    needs_print: true,
    order_items: [{ id: 'v4-s', name: '김치찌개', quantity: 1, price: 18 }],
  });
  try {
    await waitFor('ticket at the station printer', () => jobs(CAP_ST).length >= 1, 90000, 2000).catch(() => {});
    await sleep(8000);
    const stJobs = jobs(CAP_ST);
    const masterJobs = jobs(CAP);
    assert('V4-6 스테이션 매장 → 티켓이 스테이션 프린터(KQ1)로 정확히 1장, 마스터로는 0장',
      stJobs.length === 1 && masterJobs.length === 0,
      `KQ1 ${stJobs.length}장 / KITCHEN ${masterJobs.length}장 (1/0 이어야 함)`);
  } finally {
    await Order.destroy({ where: { id: stationOrder.id }, force: true });
  }

  // ── V4-4/V4-5: unknown printer → nothing printed AND no "printed" stamp ─────
  // The app must genuinely be pointed at the unregistered printer before we judge it.
  // Otherwise "no bytes went out" would pass for the most boring reason imaginable — the
  // app never got the setting — and V4-4/V4-5 would be green while proving nothing.
  await setKitchen(GHOST_CFG);
  await reloadAndWaitForPrinter(GHOST_CFG);
  clearJobs();
  const ghostOrder = await Order.create({
    restaurant_id: rid,
    customer_name: MARKER,
    total_amount: 10,
    status: 'pending',
    source: 'pos',
    order_type: 'dine_in',
    needs_print: true,
    order_items: [{ id: 'v4-g', name: 'Ghost Item', quantity: 1, price: 10 }],
  });
  try {
    // Wait for the poller to SETTLE: it claims (needs_print=0), fails to print, then
    // re-arms. Judging on a fixed sleep can land mid-claim and mistake an in-flight print
    // for a lost ticket — that false alarm is what the previous run reported.
    await waitFor('poller to settle (re-armed)', async () => {
      const s = await printedStamps(ghostOrder.id);
      return s.stamped > 0 || s.needsPrint === true || s.needsPrint === 1;
    }, 60000, 2000).catch(() => {});
    const ghostJobs = jobs();
    const ghostStation = jobs(CAP_ST);
    const gs = await printedStamps(ghostOrder.id);

    assert('V4-4 등록 안 된 프린터 → 어떤 바이트도 나가지 않음', ghostJobs.length === 0 && ghostStation.length === 0,
      `KITCHEN ${ghostJobs.length}장 / KQ1 ${ghostStation.length}장 (0/0 이어야 함)`);
    assert('V4-5 실패한 주문은 "인쇄됨" 도장을 받지 않는다 (재시도 유지 — 무언의 티켓 유실 금지)',
      gs.stamped === 0 && (gs.needsPrint === true || gs.needsPrint === 1),
      gs.stamped > 0
        ? `🔴 종이 0장인데 printed_at ${gs.stamped}건 = 티켓 유실`
        : `needs_print=${gs.needsPrint} · printed_at 0건`);
  } finally {
    await Order.destroy({ where: { id: ghostOrder.id }, force: true });
    // Put the shop back exactly as found — same path the fixture was written on, so the
    // restore cannot be silently "guarded" into something else.
    if (savedPrinter) await shop.update({ printer_settings: savedPrinter });
  }

  console.log(failed === 0 ? '\n✓ V4 전부 통과 (6/6)\n' : `\n✗ V4 실패 ${failed}건\n`);
  return failed === 0 ? 0 : 1;
}

const restoreThenExit = async (code, err) => {
  if (err) console.error('\n✗ V4 하니스 오류:', err.message, '\n');
  try { if (restoreShop) await restoreShop(); }
  catch (e) { console.error('  🔴 매장 설정 원복 실패 — 수동 확인 필요:', e.message); }
  cleanup();
  process.exit(code);
};
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(sig, () => { console.log(`\n(${sig}) 중단 — 매장 설정 원복 후 종료`); restoreThenExit(1); });
}
main()
  .then((c) => restoreThenExit(c))
  .catch((e) => restoreThenExit(1, e));
