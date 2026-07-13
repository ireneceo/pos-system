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
const AVD = process.env.PURPLE_AVD || 'purplepos';
const APK = path.join(ROOT, 'android/app/build/outputs/apk/debug/app-debug.apk');
const PKG = 'com.purplehere.pos.mobile';
const CAP = '/tmp/fake-printer-v4.jsonl';
const API = 'http://localhost:3001/api';
const MARKER = '__V4_ANDROID_PRINT__';
// The demo-login key the app logs in with, and the account it maps to
// (services/authService.js). Its restaurant is the one the poller watches.
const DEMO_RA_KEY = 'test_restaurant_admin';
const DEMO_RA_EMAIL = 'admin@kdine.com';
const KEEP = process.argv.includes('--keep');

const children = [];
let failed = 0;

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

const jobs = () => {
  try { return fs.readFileSync(CAP, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l)); }
  catch { return []; }
};

// ── CDP: evaluate one expression in the app's WebView ───────────────────────
function evalInApp(expression) {
  const f = path.join(__dirname, 'expr/.v4.json');
  fs.writeFileSync(f, JSON.stringify([{ label: 'e', expression }]));
  const r = sh('node', [path.join(__dirname, 'cdp-eval.js'), '9222', f], { timeout: 60000 });
  try { return JSON.parse(r.stdout)[0].value; }
  catch { throw new Error(`cdp eval failed: ${(r.stderr || r.stdout || '').slice(0, 200)}`); }
}

async function main() {
  console.log('\n=== V4 — Android 폴러 전 구간 E2E (데모 매장, 실제 주문 → 앱이 인쇄) ===\n');
  if (!fs.existsSync(APK)) throw new Error(`APK 없음: ${APK}`);

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

  // 1. fake printer
  const p = spawn('node', [path.join(__dirname, 'fake-printer.js'), '9100', CAP], { stdio: 'ignore' });
  children.push(p);
  await sleep(400);

  // 2. token + printer settings (the REAL path: server printer_settings, restaurant-admin)
  const login = await api('POST', '/auth/demo-login', { key: DEMO_RA_KEY });
  const token = login.body?.token || login.body?.data?.token;
  if (!token) throw new Error('demo-login 실패');

  const before = await api('GET', `/store/settings?restaurant_id=${rid}`, null, token);
  const savedPrinter = before.body?.data?.printerSettings || before.body?.data?.printer_settings || null;

  const setPrinter = async (address) => {
    const r = await api('PUT', '/store/settings', {
      restaurant_id: rid,
      printerSettings: {
        ...(savedPrinter || {}),
        kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address, copies: 1 },
      },
    }, token);
    return r.status === 200;
  };
  const okSet = await setPrinter('KITCHEN');
  console.log(`  프린터 설정: kitchen → 'KITCHEN' (autoPrint ON) ${okSet ? 'OK' : '실패'}`);

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
  await waitFor('bridge', () => evalInApp("(async () => typeof window.__NATIVE_PRINT === 'object' && typeof window.__NATIVE_PRINT_SETUP === 'object')()") === true, 90000, 3000);
  console.log('  앱 기동 + 브릿지 확인');

  // 4. register the printer on the device + log the app in, then reload so the poller starts.
  //
  // billPrint reads printer settings from localStorage (the store syncs them there), and it
  // dispatches by METHOD: 'rawbt' fires a RawBT intent (the legacy per-device print app),
  // and only 'qztray' + an address reaches the native bridge. A shop that still carries the
  // legacy rawbt setting would therefore print nothing inside our app. Configuring the
  // printer from the in-app Settings page writes method='qztray' + the printer name, which is
  // the supported path — so the gate configures exactly that, deliberately and explicitly,
  // rather than depending on whatever the store had before.
  const appSettings = {
    ...(savedPrinter || {}),
    kitchenPrinter: { enabled: true, autoPrint: true, method: 'qztray', address: 'KITCHEN', copies: 1 },
  };
  evalInApp(`(async () => {
    await window.__NATIVE_PRINT_SETUP.addNetPrinter({name:'KITCHEN', host:'10.0.2.2', port:9100});
    localStorage.setItem('auth_token', ${JSON.stringify(token)});
    localStorage.setItem('printerSettings', ${JSON.stringify(JSON.stringify(appSettings))});
    return true;
  })()`);
  evalInApp("(async () => { location.href = '/pos'; return true; })()");
  await sleep(12000); // app reloads, authenticates, mounts, poller arms
  await waitFor('bridge after reload', () => evalInApp("(async () => typeof window.__NATIVE_PRINT === 'object')()") === true, 60000, 3000);
  const loggedIn = evalInApp("(async () => ({ url: location.pathname, token: !!localStorage.getItem('auth_token') }))()");
  console.log(`  앱 로그인 상태: ${JSON.stringify(loggedIn)}`);

  fs.writeFileSync(CAP, '');
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

    // Judge on the DB stamp, not on "it left the pending list": an order also leaves that
    // list when it is merely CLAIMED, so absence proves nothing about paper.
    await order.reload();
    assert('V4-3 인쇄 후 needs_print=0 (printed 도장) — 재인쇄 0', order.needs_print === false || order.needs_print === 0,
      `needs_print=${order.needs_print}`);
  } finally {
    await Order.destroy({ where: { id: order.id }, force: true });
  }

  // ── V4-4: unknown printer → nothing printed AND the order stays armed ─────
  await setPrinter('GHOST');
  await sleep(3000);
  fs.writeFileSync(CAP, '');
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
    await sleep(35000); // give the poller several cycles
    const ghostJobs = jobs();
    await ghostOrder.reload();
    const stillArmed = ghostOrder.needs_print === true || ghostOrder.needs_print === 1;

    assert('V4-4 등록 안 된 프린터 → 어떤 바이트도 나가지 않음', ghostJobs.length === 0,
      `${ghostJobs.length}장 (0이어야 함)`);
    assert('V4-5 실패한 주문은 "인쇄됨" 도장을 받지 않는다 (재시도 유지 — 무언의 티켓 유실 금지)',
      stillArmed, stillArmed ? 'needs_print=1 유지 = 재시도 가능' : '🔴 인쇄 안 됐는데 needs_print=0 = 티켓 유실');
  } finally {
    await Order.destroy({ where: { id: ghostOrder.id }, force: true });
    // restore the shop's real printer settings
    if (savedPrinter) {
      await api('PUT', '/store/settings', { restaurant_id: rid, printerSettings: savedPrinter }, token);
    }
  }

  console.log(failed === 0 ? '\n✓ V4 전부 통과 (5/5)\n' : `\n✗ V4 실패 ${failed}건\n`);
  return failed === 0 ? 0 : 1;
}

main()
  .then((c) => { cleanup(); process.exit(c); })
  .catch((e) => { console.error('\n✗ V4 하니스 오류:', e.message, '\n'); cleanup(); process.exit(1); });
