#!/usr/bin/env node
'use strict';
/**
 * V3 — Android print gate WITHOUT hardware (design §8-6).
 *
 * Boots the emulator, installs the debug APK, points it at the real dev web app,
 * registers two fake ESC/POS printers, drives window.__NATIVE_PRINT from the live
 * page over CDP, and then JUDGES THE ACTUAL BYTES that arrived on the wire.
 *
 * This is the gate that was designed but never run (the exprFile it needed did not
 * exist). "The APK builds" is not evidence that it prints — these assertions are.
 *
 *   node scripts/verify/run-v3.js [--keep]      (--keep leaves the emulator running)
 *
 * Exit 0 = all assertions pass.
 */
const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const net = require('net');

const ROOT = path.resolve(__dirname, '../..');
const SDK = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME || '/opt/android-sdk';
const ADB = path.join(SDK, 'platform-tools/adb');
const EMULATOR = path.join(SDK, 'emulator/emulator');
const AVD = process.env.PURPLE_AVD || 'purplepos';
const APK = path.join(ROOT, 'android/app/build/outputs/apk/debug/app-debug.apk');
const PKG = 'com.purplehere.pos.mobile';
const CAP_KITCHEN = '/tmp/fake-printer-9100.jsonl';
const CAP_BAR = '/tmp/fake-printer-9101.jsonl';
const KEEP = process.argv.includes('--keep');

const children = [];
const results = [];
let failed = 0;

function sh(cmd, args, opts = {}) {
  return spawnSync(cmd, args, { encoding: 'utf8', timeout: 120000, ...opts });
}
function assert(name, pass, detail) {
  results.push({ name, pass, detail });
  if (!pass) failed++;
  console.log(`  ${pass ? '✓' : '✗'} ${name}${detail ? `  — ${detail}` : ''}`);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitFor(label, fn, timeoutMs, intervalMs = 2000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try { if (await fn()) return true; } catch { /* keep polling */ }
    await sleep(intervalMs);
  }
  throw new Error(`timeout waiting for ${label} (${Math.round(timeoutMs / 1000)}s)`);
}

// Single-instance lock, shared with run-v4: two concurrent gates fight over adb, the
// emulator and the capture ports, and the loser's cleanup (`adb emu kill`) murders the
// winner's emulator mid-run — 2026-07-15: a duplicated invocation clobbered a passing
// V3's log and killed a booting V4. Fail loudly instead of interleaving.
const LOCK = '/tmp/purple-android-gate.lock';
function acquireLock() {
  try {
    const pid = parseInt(fs.readFileSync(LOCK, 'utf8'), 10);
    if (pid) { process.kill(pid, 0); throw new Error(`다른 게이트가 이미 실행 중 (pid=${pid}) — 동시 실행 금지, 끝나길 기다릴 것`); }
  } catch (e) {
    if (String(e.message).includes('동시 실행')) throw e; // live holder → refuse
    // ENOENT / ESRCH(죽은 pid) → stale, take it
  }
  fs.writeFileSync(LOCK, String(process.pid));
}
function releaseLock() {
  try { if (parseInt(fs.readFileSync(LOCK, 'utf8'), 10) === process.pid) fs.unlinkSync(LOCK); } catch { /* not ours */ }
}

function cleanup() {
  releaseLock();
  // --keep means "leave the emulator and the fake printers up so a failure can be
  // debugged live" — killing our children would defeat exactly that.
  if (KEEP) return;
  for (const c of children) { try { c.kill('SIGKILL'); } catch { /* gone */ } }
  sh(ADB, ['emu', 'kill']);
}

// ── byte judging helpers ────────────────────────────────────────────────────
const jobs = (file) => {
  try {
    return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  } catch { return []; }
};
const hexOf = (s) => Buffer.from(s, 'utf8').toString('hex');
const findJob = (list, needleHex) => list.find((j) => j.hex.includes(needleHex));

// See run-v4.js: the emulator takes ~4.5GB. Starting one on a memory-starved server takes
// the dev backend / MySQL / SSH down with it. Refuse rather than cause an outage.
const GATE = '/var/www/scripts/heavy-task-gate.sh';

function assertRoomForEmulator() {
  const g = spawnSync('bash', [GATE, 'emulator'], { encoding: 'utf8' });
  if (g.status !== 0) throw new Error((g.stdout || g.stderr || '').trim() || '메모리 게이트 차단');
  const info = fs.readFileSync('/proc/meminfo', 'utf8');
  const availMb = Math.round(parseInt((info.match(/MemAvailable:\s+(\d+) kB/) || [])[1] || '0', 10) / 1024);
  console.log(`  가용 메모리 ${availMb}MB — 에뮬레이터 기동 가능`);
}

// A runaway qemu must die alone, not freeze the box (see run-v4.js).
function emulatorCmd() {
  const args = ['-avd', AVD, '-no-window', '-no-audio', '-no-snapshot',
    '-gpu', 'swiftshader_indirect', '-no-boot-anim'];
  const boxed = spawnSync('systemd-run', ['--user', '--scope', '-q', '-p', 'MemoryMax=10M', 'true'], { encoding: 'utf8' });
  if (boxed.status === 0) {
    return { cmd: 'systemd-run', args: ['--user', '--scope', '-q', '-p', 'MemoryMax=5G', EMULATOR, ...args] };
  }
  console.log('  ⚠ systemd-run 사용 불가 — cgroup 상자 없이 에뮬레이터 기동');
  return { cmd: EMULATOR, args };
}

async function main() {
  console.log('\n=== V3 — Android 인쇄 게이트 (하드웨어 없이 바이트 판정) ===\n');
  if (!fs.existsSync(APK)) throw new Error(`APK 없음: ${APK} (먼저 ./gradlew assembleDebug)`);
  acquireLock();
  assertRoomForEmulator();

  // 1. fake printers (the emulator reaches the host at 10.0.2.2)
  // Stale printers from an interrupted run still hold the ports; the new spawn then dies
  // on EADDRINUSE with stdio:ignore — captures stay empty and the gate blames the app.
  sh('pkill', ['-f', 'verify/fake-printer.js']);
  await sleep(300);
  for (const [port, out] of [[9100, CAP_KITCHEN], [9101, CAP_BAR]]) {
    const p = spawn('node', [path.join(__dirname, 'fake-printer.js'), String(port), out], { stdio: 'ignore' });
    children.push(p);
  }
  await sleep(500);
  console.log('  가짜 프린터 2대 기동 (9100=KITCHEN, 9101=BAR)');

  // 2. emulator
  const booted = sh(ADB, ['shell', 'getprop', 'sys.boot_completed']).stdout || '';
  if (booted.trim() !== '1') {
    console.log('  에뮬레이터 부팅 중...');
    const e = emulatorCmd();
    const emu = spawn(e.cmd, e.args, { stdio: 'ignore', detached: false });
    children.push(emu);
    await waitFor('boot', () => (sh(ADB, ['shell', 'getprop', 'sys.boot_completed']).stdout || '').trim() === '1', 300000, 3000);
  }
  console.log('  에뮬레이터 준비됨');

  // 3. install + launch (fresh state: the registry is SharedPreferences)
  sh(ADB, ['uninstall', PKG]);
  const inst = sh(ADB, ['install', '-r', APK]);
  if (!/Success/.test(inst.stdout || '')) throw new Error(`APK 설치 실패: ${(inst.stderr || inst.stdout || '').slice(0, 200)}`);
  sh(ADB, ['shell', 'am', 'start', '-n', `${PKG}/.MainActivity`]);
  console.log('  APK 설치·기동 — 원격 웹앱(dev) 로드 대기...');

  // 4. devtools forward to the WebView — re-resolve the socket on EVERY poll: `adb
  // install -r` restarts the app, so the socket name carries a new pid. Forwarding once
  // to the pre-install socket leaves the port pointing at a dead process, and the wait
  // never succeeds even though the app is running fine.
  await waitFor('page target', () => new Promise((resolve) => {
    const socks = sh(ADB, ['shell', 'cat', '/proc/net/unix']).stdout || '';
    const m = socks.match(/webview_devtools_remote_\d+/);
    if (!m) return resolve(false);
    sh(ADB, ['forward', 'tcp:9222', `localabstract:${m[0]}`]);
    const req = net.connect(9222, '127.0.0.1', () => {
      req.write('GET /json HTTP/1.1\r\nHost: localhost\r\n\r\n');
    });
    let d = '';
    req.on('data', (c) => { d += c; });
    req.on('close', () => resolve(/purplehere\.com/.test(d)));
    req.on('error', () => resolve(false));
    setTimeout(() => { try { req.destroy(); } catch { /* closed */ } }, 3000);
  }), 180000, 3000);
  console.log('  WebView devtools 연결됨 (원격 페이지 로드 확인)');

  // 4b. Wait for the bridge to actually be injected. The devtools page target exists
  // as soon as the WebView has a document, but MainActivity injects the bridge on
  // page-load — evaluating before that reads undefined and looks exactly like a real
  // "bridge missing" bug (it did, on the first run of this harness). Poll for the real
  // thing instead. If it never appears, THAT is a genuine failure and we say so.
  const READY = path.join(__dirname, 'expr/.ready.json');
  // Plain synchronous boolean, and the page must have been up for 45s WITH the bridge.
  // Two measured traps live here (2026-07-15):
  //  1) The bridge injects at t≈18s, well after the page target exists — so poll, don't
  //     assume.
  //  2) The web app is a PWA: on a FRESH install the service worker finishes installing
  //     seconds after first load and index.tsx's controllerchange handler force-reloads
  //     the page. A reload mid-judging destroys the JS context — the expressions in
  //     flight return undefined (looks like "bridge missing"), the printer registration
  //     evaporates, and every later print honestly answers PRINTER_NOT_FOUND. That was
  //     this gate's 10/13-fail signature. performance.now() resets on reload, so
  //     requiring 45s of uptime with the bridge present guarantees the one-time SW
  //     reload has already happened before we start judging.
  fs.writeFileSync(READY, JSON.stringify([
    { label: 'ready', expression: "typeof window.__NATIVE_PRINT === 'object' && typeof window.__NATIVE_PRINT_SETUP === 'object' && performance.now() > 45000" },
    { label: 'diag', expression: "JSON.stringify({np:typeof window.__NATIVE_PRINT,setup:typeof window.__NATIVE_PRINT_SETUP,cap:typeof window.Capacitor,plugin:typeof (window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.NativePrint),up:Math.round(performance.now()/1000),href:location.href})" },
  ]));
  let relaunches = 0;
  await waitFor('bridge injection (__NATIVE_PRINT)', () => {
    // Re-resolve + re-forward the socket every poll, exactly like the page-target
    // wait above. The initial page target can appear on an early WebView socket
    // that a renderer restart / real-page load then replaces with a new pid — the
    // one-time forward from the page-target wait goes stale and every bridge poll
    // hits a dead process, so __NATIVE_PRINT looks missing even though it injected
    // fine (proven via CDP on a freshly-forwarded socket). Without this the gate
    // false-times-out at 90s on a slow box. (2026-07-15 — 4th env/harness trap.)
    const socks = sh(ADB, ['shell', 'cat', '/proc/net/unix']).stdout || '';
    const all = socks.match(/webview_devtools_remote_\d+/g) || [];
    const m = all[0];
    if (!m) return false;
    sh(ADB, ['forward', 'tcp:9222', `localabstract:${m}`]);
    const r = sh('node', [path.join(__dirname, 'cdp-eval.js'), '9222', READY], { timeout: 30000 });
    if (process.env.V_DEBUG) { let diag='?'; try { diag = JSON.parse(r.stdout)[1].value; } catch (e) { diag = 'parse-fail status='+r.status+' err='+((r.stderr||'').trim().slice(0,120)+' out='+(r.stdout||'').trim().slice(0,120)); } console.log(`    [bridge poll] socks=${JSON.stringify(all)} ${diag}`); }
    // A fresh emulator's guest network can still be settling when the app first
    // navigates; the load then fails and the WebView parks on
    // chrome-error://chromewebdata FOREVER (a WebView never retries by itself) —
    // measured 2026-07-15: 180s of polls all on the error page while the server was
    // fine. A stuck error page is an env flake, not an app verdict: relaunch the app
    // (bounded) and keep polling.
    let href = '';
    try { href = JSON.parse(JSON.parse(r.stdout)[1].value).href || ''; } catch { /* no diag */ }
    if (href.startsWith('chrome-error://') && relaunches < 4) {
      relaunches++;
      console.log(`    페이지 로드 실패(chrome-error) — 앱 재기동 ${relaunches}/4`);
      sh(ADB, ['shell', 'am', 'force-stop', PKG]);
      sh(ADB, ['shell', 'am', 'start', '-n', `${PKG}/.MainActivity`]);
      return false;
    }
    try { return JSON.parse(r.stdout)[0].value === true; } catch { return false; }
  }, 180000, 3000);
  fs.unlinkSync(READY);
  console.log('  브릿지 주입 확인 (__NATIVE_PRINT + __NATIVE_PRINT_SETUP)\n');

  // 5. drive the live page
  fs.writeFileSync(CAP_KITCHEN, ''); fs.writeFileSync(CAP_BAR, '');
  const cdp = sh('node', [path.join(__dirname, 'cdp-eval.js'), '9222', path.join(__dirname, 'expr/v3.json')], { timeout: 240000 });
  if (cdp.status !== 0 || !cdp.stdout || !cdp.stdout.trim()) {
    // Fail loudly with the real reason — an empty stdout used to surface as an
    // opaque "Unexpected end of JSON input".
    throw new Error(
      `cdp-eval 실패 (status=${cdp.status}${cdp.signal ? ` signal=${cdp.signal}` : ''})\n` +
      `  stderr: ${(cdp.stderr || '(없음)').trim().slice(0, 500)}\n` +
      `  stdout: ${(cdp.stdout || '(비어 있음)').trim().slice(0, 200)}`
    );
  }
  const out = JSON.parse(cdp.stdout);
  // An evaluation error (e.g. "Execution context was destroyed" from a page reload) is
  // otherwise swallowed into value=undefined and mis-judged as an app failure — say it.
  for (const o of out) { if (o.error !== undefined) console.log(`  ⚠ [cdp] ${o.label}: ${String(o.error).slice(0, 140)}`); }
  const byLabel = (frag) => (out.find((o) => o.label.includes(frag)) || {}).value;
  await sleep(1500); // let the last socket close land in the capture

  const K = jobs(CAP_KITCHEN);
  const B = jobs(CAP_BAR);

  // ── assertions ────────────────────────────────────────────────────────────
  console.log('판정:\n');

  const v0 = byLabel('V3-0') || {};
  assert('V3-0 브릿지 주입 (__NATIVE_PRINT 7메서드 + SETUP)',
    v0.available === true && (v0.methods || []).length === 6 && v0.setup === true && (v0.setupMethods || []).length === 5,
    `native=${v0.available} methods=${(v0.methods || []).length}/6 setup=${v0.setup} setupMethods=${(v0.setupMethods || []).length}/5`);

  const reg = byLabel('V3-7a') || {};
  assert('V3-7a 프린터 등록 (웹 Settings 경로 = SETUP 브릿지)',
    reg.a && reg.a.ok === true && (reg.names || []).includes('KITCHEN') && (reg.names || []).includes('BAR'),
    `listPrinters=${JSON.stringify(reg.names)}`);

  const diag = byLabel('V3-2 diagnostics') || {};
  const gradleVersion = (fs.readFileSync(path.join(ROOT, 'android/app/build.gradle'), 'utf8')
    .match(/versionName\s+"([^"]+)"/) || [])[1];
  assert('V3-2 diagnostics 계약 (§4 shape, appVersion=gradle 단일소스)',
    diag.platform === 'android' && diag.appVersion === gradleVersion && diag.hasPrinters === true && diag.bridgeVersion === gradleVersion,
    `appVersion=${diag.appVersion} gradle=${gradleVersion} bridge=${diag.bridgeVersion}`);

  // V3-1a: bytes on the wire == exactly what the caller passed (QZ sends the same decoded base64)
  const rawByName = findJob(K, hexOf('RAW_BY_NAME'));
  assert('V3-1a printRaw(이름 경유) 바이트 동일 — 캡처 ≡ base64 디코드',
    !!rawByName && Buffer.from(rawByName.hex, 'hex').toString('utf8') === 'RAW_BY_NAME',
    rawByName ? `${rawByName.len}바이트` : '캡처 없음');

  // V3-1b: full 0x00..0xFF must survive (no charset mangling — the 한글 깨짐 class of bug)
  const edge = K.find((j) => j.len === 256);
  const edgeOk = edge && Buffer.from(edge.hex, 'hex').every((b, i) => b === i);
  assert('V3-1b 바이너리 엣지 0x00~0xFF 무손실 (256바이트 그대로)',
    !!edgeOk, edge ? `${edge.len}바이트, 순서일치=${edgeOk}` : '캡처 없음');

  const drawer = K.find((j) => j.hex === '1b7000' + '6464');
  assert('V3-3 드로어 = 정확히 5바이트 1B 70 00 64 64 (그 외 0바이트)',
    !!drawer, drawer ? drawer.hex : `일치 없음 (후보: ${K.filter((j) => j.len === 5).map((j) => j.hex).join(',') || '없음'})`);

  const ghost = byLabel('V3-4a') || {};
  const ghostBytes = findJob(K, hexOf('GHOST_MUST_NOT_PRINT')) || findJob(B, hexOf('GHOST_MUST_NOT_PRINT'));
  assert('V3-4a 미등록 이름 → PRINTER_NOT_FOUND + 어느 프린터에도 0바이트',
    ghost.ok === false && ghost.error === 'PRINTER_NOT_FOUND' && !ghostBytes,
    `${JSON.stringify(ghost)} 유출바이트=${ghostBytes ? 'YES' : 'none'}`);

  const emptyName = byLabel('V3-4b') || {};
  assert('V3-4b 빈 이름 + 기본프린터 미지정 → PRINTER_NOT_FOUND (조용한 폴백 금지)',
    emptyName.ok === false && emptyName.error === 'PRINTER_NOT_FOUND', JSON.stringify(emptyName));

  const ci = byLabel('V3-4c') || {};
  assert('V3-4c 대소문자 무시 매칭 (kitchen → KITCHEN)',
    ci.ok === true && !!findJob(K, hexOf('CASE_INSENSITIVE')), JSON.stringify(ci));

  // V3-5: arrival order == call order
  const seqIdx = ['SEQ_1', 'SEQ_2', 'SEQ_3'].map((m) => K.findIndex((j) => j.hex.includes(hexOf(m))));
  assert('V3-5 같은 프린터 3잡 = 도착순 == 호출순 (레인 FIFO)',
    seqIdx.every((i) => i >= 0) && seqIdx[0] < seqIdx[1] && seqIdx[1] < seqIdx[2],
    `도착 index=${JSON.stringify(seqIdx)}`);

  // V3-2b: the Korean ticket must be a real raster — ESC @ + GS v 0, 576px wide, and INK on the page
  const html = byLabel('V3-2b') || {};
  const raster = K.filter((j) => j.hex.startsWith('1b40')).sort((a, b) => b.len - a.len)[0];
  let rasterOk = false, inkRatio = 0, widthOk = false, cutOk = false;
  if (raster) {
    const buf = Buffer.from(raster.hex, 'hex');
    const gsv = buf.indexOf(Buffer.from([0x1d, 0x76, 0x30]));            // GS v 0
    widthOk = gsv >= 0 && buf[gsv + 4] === 72 && buf[gsv + 5] === 0;      // xL=72,xH=0 → 576px
    cutOk = raster.hex.includes('1d564200');                              // GS V B 0
    const ink = buf.subarray(gsv + 8).reduce((n, b) => n + (b ? 1 : 0), 0);
    inkRatio = ink / Math.max(1, buf.length - gsv - 8);
    rasterOk = gsv >= 0 && widthOk && cutOk && inkRatio > 0.02;           // not a blank page
  }
  assert('V3-2b printHtml 한글 래스터 (ESC @ · GS v 0 · 576px · 컷 · 백지 아님)',
    html.r && html.r.ok === true && rasterOk,
    raster ? `${raster.len}바이트 width576=${widthOk} cut=${cutOk} ink=${(inkRatio * 100).toFixed(1)}%` : '래스터 캡처 없음');

  // V3-6: THE regression this P0 fixes — a dead printer must not stall a healthy lane
  const iso = byLabel('V3-6') || {};
  const deadFailed = iso.dead && iso.dead.r && iso.dead.r.ok === false;
  const deadMs = iso.dead ? iso.dead.ms : -1;
  assert('V3-6 죽은 프린터가 정상 프린터를 막지 않음 (레인 분리 + 5s 타임아웃)',
    iso.live && iso.live.ok === true && iso.liveMs < 8000 && deadFailed && deadMs < 12000,
    `정상 BAR=${iso.liveMs}ms(ok=${iso.live && iso.live.ok}) / DEAD=${deadMs}ms(${deadFailed ? '실패로 종료' : '실패 안 함'})`);

  const rt = byLabel('V3-7b') || {};
  assert('V3-7b 레지스트리 왕복 (BAR 삭제 → 목록에서 사라짐 → PRINTER_NOT_FOUND)',
    rt.rm && rt.rm.ok === true && !(rt.after || []).includes('BAR') && rt.p && rt.p.error === 'PRINTER_NOT_FOUND',
    `after=${JSON.stringify(rt.after)} print=${JSON.stringify(rt.p)}`);

  console.log(`\n캡처: KITCHEN ${K.length}잡 / BAR ${B.length}잡`);
  console.log(failed === 0
    ? `\n✓ V3 전부 통과 (${results.length}/${results.length})\n`
    : `\n✗ V3 실패 ${failed}건 / ${results.length}건\n`);
  return failed === 0 ? 0 : 1;
}

main()
  .then((code) => { cleanup(); process.exit(code); })
  .catch((e) => { console.error('\n✗ V3 하니스 오류:', e.message, '\n'); cleanup(); process.exit(1); });
