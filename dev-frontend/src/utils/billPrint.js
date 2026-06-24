/**
 * Bill Print Utility
 *
 * Supports 3 print modes:
 * 1. RawBT (Android) - ESC/POS via RawBT Intent to Bluetooth printer
 * 2. Browser Print (PC) - HTML via window.print() to OS printer dialog
 * 3. QZ Tray (Network) - ESC/POS via QZ Tray to LAN network printers
 */
import qz from 'qz-tray';

// ============================================
// ESC/POS Command Definitions
// ============================================

const ESC = '\x1B';
const GS = '\x1D';

const CMD = {
  // Initialize printer
  INIT: ESC + '@',

  // Text alignment
  ALIGN_LEFT: ESC + 'a\x00',
  ALIGN_CENTER: ESC + 'a\x01',
  ALIGN_RIGHT: ESC + 'a\x02',

  // Text size
  TEXT_NORMAL: GS + '!\x00',
  TEXT_DOUBLE_HEIGHT: GS + '!\x01',
  TEXT_DOUBLE_WIDTH: GS + '!\x10',
  TEXT_DOUBLE: GS + '!\x11',

  // Text style
  BOLD_ON: ESC + 'E\x01',
  BOLD_OFF: ESC + 'E\x00',

  // Double-strike emphasis (prints each line twice → thicker, darker output)
  EMPHASIS_ON: ESC + 'G\x01',
  EMPHASIS_OFF: ESC + 'G\x00',

  // Reverse mode (white text on black background)
  REVERSE_ON: GS + 'B\x01',
  REVERSE_OFF: GS + 'B\x00',

  // Line feed
  LINE_FEED: '\n',

  // Line spacing (ESC 3 n / ESC 2). 2026-05-29: 빌 줄간격 축소 요청. ESC 3 n 으로
  // 라인 높이를 기본(~30/34 dot)보다 모더릿하게 줄인다(26 dot). ESC @ (INIT)가
  // 다음 작업에서 기본값으로 리셋하므로 주방 티켓 등 다른 출력에는 영향 없음.
  LINE_SPACING_TIGHT: ESC + '3' + '\x1A',
  LINE_SPACING_DEFAULT: ESC + '2',

  // Separators (80mm = 48 chars)
  DASHED_LINE: '------------------------------------------------',
  // Strong solid line — double-struck equals for visual emphasis (mirrors the
  // 1px solid border in the HTML bill). Use for section transitions where the
  // hyphen line is too faint on QZ Tray raw-socket output.
  SOLID_LINE: ESC + 'G\x01' + '================================================' + ESC + 'G\x00',

  // Paper cut (partial)
  CUT_PARTIAL: GS + 'V\x41\x00'
};

// ============================================
// Helper Functions
// ============================================

/**
 * Format pickup time as range (e.g., "9:00 - 9:30 AM")
 */
function formatPickupTimeRange(dateString) {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000); // Add 30 minutes

  const formatTimeSlot = (d) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    const displayMin = minutes.toString().padStart(2, '0');
    return { time: `${displayHour}:${displayMin}`, period };
  };

  const start = formatTimeSlot(date);
  const end = formatTimeSlot(endDate);

  if (start.period === end.period) {
    return `${start.time} - ${end.time} ${end.period}`;
  }
  return `${start.time} ${start.period} - ${end.time} ${end.period}`;
}

/**
 * Pad text to fit 48 characters (80mm printer)
 * Left-aligned text with right-aligned value
 */
function formatLine(left, right, width = 48) {
  const spaces = width - left.length - right.length;
  return left + ' '.repeat(Math.max(spaces, 1)) + right;
}

// ============================================
// Device Detection
// ============================================

/**
 * Set the legacy global printer mode.
 * Kept for backwards compatibility; new code should set `method` per printer
 * via printer_settings.{billPrinter,kitchenPrinter,kitchenStationPrinters[id]}.method.
 * @param {'rawbt' | 'browser' | 'qztray'} mode
 */
export function setPrinterMode(mode) {
  localStorage.setItem('printerMode', mode);
}

/**
 * Get the legacy global printer mode. Used as a fallback when a printer
 * has no `method` field configured (existing stores before per-printer methods).
 * @returns {'rawbt' | 'browser' | 'qztray'}
 */
export function getPrinterMode() {
  const mode = localStorage.getItem('printerMode');
  if (mode === 'browser') return 'browser';
  if (mode === 'qztray') return 'qztray';
  return 'rawbt';
}

/**
 * Get this device's active workstation id (set by WorkstationSelectorModal,
 * stored in localStorage so each POS device keeps its own choice).
 */
export function getActiveWorkstationId() {
  try {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('workstation_id') : null;
  } catch { return null; }
}

/**
 * Set this device's active workstation id. Dispatches a `workstation-changed`
 * event so React components can re-render.
 */
export function setActiveWorkstationId(id) {
  try {
    if (id) localStorage.setItem('workstation_id', id);
    else localStorage.removeItem('workstation_id');
    try { window.dispatchEvent(new CustomEvent('workstation-changed', { detail: { id } })); } catch {}
  } catch {}
}

/**
 * Resolve the bill-printer settings for THIS device's active workstation.
 *
 * Multi-POS shops: every POS device shares the Restaurant record, but each
 * one binds itself to a workstation entry (localStorage.workstation_id).
 * The active workstation's billPrinter is what we actually print to.
 *
 * Fallback chain:
 *   active workstation → first workstation → legacy single billPrinter → defaults.
 */
export function getActiveBillPrinter() {
  const settings = getPrinterSettings();
  const wsId = getActiveWorkstationId();
  if (wsId && Array.isArray(settings.workstations)) {
    const ws = settings.workstations.find(w => w && w.id === wsId);
    if (ws && ws.billPrinter) return ws.billPrinter;
  }
  if (Array.isArray(settings.workstations) && settings.workstations.length > 0 && settings.workstations[0].billPrinter) {
    return settings.workstations[0].billPrinter;
  }
  return settings.billPrinter || { enabled: false, name: '', autoPrint: false, method: 'browser', address: '' };
}

/**
 * Resolve the print method for a specific printer scope.
 *
 * Each printer (bill, kitchen, individual station) can use a different connection
 * method. This is the single source of truth for "how do I print to printer X?".
 *
 * Scope values:
 *   - 'bill'           → active workstation's billPrinter.method (multi-POS aware)
 *   - 'kitchen'        → settings.kitchenPrinter.method  (single kitchen, no stations)
 *   - 'station:<id>'   → settings.kitchenStationPrinters[id].method
 *
 * Fallback chain: scope method → kitchen method (for stations) → legacy global mode.
 *
 * @param {'bill' | 'kitchen' | string} scope
 * @returns {'browser' | 'rawbt' | 'qztray'}
 */
export function getPrinterMethod(scope = 'bill') {
  const settings = getPrinterSettings();
  if (scope === 'bill') {
    const wsBill = getActiveBillPrinter();
    return wsBill?.method || settings.billPrinter?.method || getPrinterMode();
  }
  if (scope === 'kitchen') {
    return settings.kitchenPrinter?.method || getPrinterMode();
  }
  if (typeof scope === 'string' && scope.startsWith('station:')) {
    const stationId = scope.slice('station:'.length);
    const sp = settings.kitchenStationPrinters?.[stationId];
    return sp?.method || settings.kitchenPrinter?.method || getPrinterMode();
  }
  return getPrinterMode();
}

/** Internal: should this scope use the browser print dialog? */
function shouldUseBrowserPrint(scope = 'bill') {
  return getPrinterMethod(scope) === 'browser';
}

/** Internal: should this scope use QZ Tray (network or OS printer)? */
function shouldUseQZTray(scope = 'bill') {
  return getPrinterMethod(scope) === 'qztray';
}

// ============================================
// QZ Tray Integration
// ============================================

let qzConnected = false;
let qzConnecting = false;

/**
 * Send the ESC/POS cash-drawer pulse to the active workstation's bill printer.
 * Most receipt printers expose an RJ-11 jack on the back; this pulse fires the
 * drawer solenoid open. Standard sequence: ESC p 0 100ms 100ms (drawer #1).
 *
 * Only QZ Tray / RawBT can deliver raw ESC/POS — browser print mode cannot.
 *
 * @returns {Promise<boolean>}
 */
export async function openCashDrawer() {
  try {
    const bp = getActiveBillPrinter();
    if (!bp || !bp.enabled) {
      console.warn('Cash drawer: bill printer disabled — cannot send drawer pulse');
      return false;
    }
    const method = getPrinterMethod('bill');
    // ESC p 0 100 100 — drawer #1, 100ms ON pulse, 100ms OFF gap (standard sequence)
    const pulse = '\x1B\x70\x00\x64\x64';

    if (method === 'qztray') {
      return await sendViaQZTray(pulse, bp.address);
    }
    if (method === 'rawbt') {
      const targetPrinter = bp.name;
      const base64 = btoa(unescape(encodeURIComponent(pulse)));
      let intentScheme = '#Intent;scheme=rawbt;';
      if (targetPrinter) intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
      const intentUrl = 'intent:base64,' + base64 + intentScheme + 'package=ru.a402d.rawbtprinter;end;';
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = intentUrl;
      document.body.appendChild(iframe);
      setTimeout(() => document.body.removeChild(iframe), 1000);
      return true;
    }
    console.warn('Cash drawer: browser print mode cannot send raw ESC/POS — switch to QZ Tray or RawBT to use the drawer pulse');
    return false;
  } catch (err) {
    console.error('Cash drawer pulse failed:', err);
    return false;
  }
}

/**
 * QZ Tray request signing.
 *
 * Without signing, QZ Tray asks the user to allow each print (security feature).
 * To avoid that, we send a signed request: the public certificate is installed
 * once in QZ Tray (as override.crt), and every print request is signed by the
 * backend using the matching private key.
 *
 * Flow on each print:
 *   1. QZ Tray asks the page for the certificate → we GET /api/qz-tray/certificate
 *   2. QZ Tray asks the page to sign the request payload → we POST it to /api/qz-tray/sign
 *   3. QZ Tray verifies the signature against override.crt → silent print, no prompt
 *
 * If the backend is unreachable, we fall back to empty cert/signature — the
 * user will see the "Allow" prompt, which is the legacy behaviour.
 */
let _qzSecurityConfigured = false;
// QZ Tray 데스크톱 버전에 맞춘 서명 알고리즘. 기본 SHA512(QZ 2.2.x+, 예: POS1 — 무변경).
// connectQZTray 가 연결 후 버전을 감지해 2.1.x(Windows 7) 면 'SHA1' 로 바꾼다(아래).
// 서명 promise 가 이 값을 백엔드 /sign?algorithm= 로 전달 → 구버전 QZ 의 anonymous/Allow 루프 해소.
let _qzSignAlgo = 'SHA512';

function setupQZSecurity() {
  if (_qzSecurityConfigured) return;
  _qzSecurityConfigured = true;

  // 2026-05-27: QZ Tray 2.2.x+ defaults to SHA512. The "Allow once / remember"
  // checkbox stays DISABLED whenever signature verification fails — the user
  // sees the prompt, ticks "remember", and the Allow button greys out. That was
  // SHA1 (us) vs SHA512 (QZ Tray) algorithm mismatch. Both sides now match SHA512;
  // backend `crypto.createSign('RSA-SHA512')` mirrors this declaration.
  if (typeof qz.security.setSignatureAlgorithm === 'function') {
    qz.security.setSignatureAlgorithm('SHA512');
  }

  qz.security.setCertificatePromise(function(resolve, reject) {
    console.log('[QZ Tray] requesting certificate from /api/qz-tray/certificate');
    fetch('/api/qz-tray/certificate', { method: 'GET', headers: { 'Accept': 'text/plain' } })
      .then(r => {
        if (!r.ok) return Promise.reject(new Error('cert fetch HTTP ' + r.status));
        return r.text();
      })
      .then(pem => {
        const looksLikePEM = typeof pem === 'string' && pem.indexOf('-----BEGIN CERTIFICATE-----') === 0;
        console.log('[QZ Tray] certificate', looksLikePEM ? 'OK (' + pem.length + ' chars)' : 'INVALID FORMAT — first 60: ' + pem.slice(0, 60));
        if (!looksLikePEM) return reject(new Error('cert not PEM'));
        resolve(pem);
      })
      .catch(err => {
        // Reject explicitly so QZ Tray surfaces a clean "no signed cert" error instead of
        // falling into anonymous mode (which made the user see "Untrusted" every time and
        // hid the real failure).
        console.error('[QZ Tray] certificate load failed:', err && err.message);
        reject(err);
      });
  });

  qz.security.setSignaturePromise(function(toSign) {
    return function(resolve, reject) {
      console.log('[QZ Tray] signing payload (' + (toSign || '').length + ' chars)');
      fetch('/api/qz-tray/sign?algorithm=' + encodeURIComponent(_qzSignAlgo), {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: toSign
      })
        .then(r => {
          if (!r.ok) return Promise.reject(new Error('sign HTTP ' + r.status));
          return r.text();
        })
        .then(sig => {
          console.log('[QZ Tray] signature OK (' + sig.length + ' chars)');
          resolve(sig);
        })
        .catch(err => {
          console.error('[QZ Tray] signing failed:', err && err.message);
          reject(err);
        });
    };
  });
}

/**
 * QZ Tray WebSocket 연결
 * QZ Tray는 PC에 설치된 프로그램으로, localhost:8182에서 WebSocket 서버를 실행한다.
 * 브라우저가 이 WebSocket에 연결하면 네트워크 프린터로 데이터를 전송할 수 있다.
 */
export async function connectQZTray() {
  if (qzConnected && qz.websocket.isActive()) return true;
  if (qzConnecting) {
    // 이미 연결 시도 중이면 완료 대기
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (!qzConnecting) {
          clearInterval(check);
          resolve(qzConnected);
        }
      }, 100);
    });
  }

  qzConnecting = true;
  try {
    setupQZSecurity();
    if (!qz.websocket.isActive()) {
      await qz.websocket.connect({ retries: 2, delay: 0.5 });
    }
    qzConnected = true;
    // 2026-06-23 (Irene): QZ 데스크톱 버전 감지 → 2.1.x(Windows 7) 는 SHA1 서명으로.
    // 2.2.x+(POS1 등)는 SHA512 유지(무변경). 우리 SDK(2.2.5)가 보내는 SHA512 서명을
    // 구버전 2.1.6 이 검증 못 해 "Validity: Invalid / anonymous" → Allow 무한이던 문제 해소.
    try {
      const ver = await qz.api.getVersion();
      const parts = String(ver || '').split('.');
      const major = parseInt(parts[0], 10) || 0;
      const minor = parseInt(parts[1], 10) || 0;
      const useSha1 = major < 2 || (major === 2 && minor < 2); // < 2.2 → SHA1
      _qzSignAlgo = useSha1 ? 'SHA1' : 'SHA512';
      if (typeof qz.security.setSignatureAlgorithm === 'function') {
        qz.security.setSignatureAlgorithm(_qzSignAlgo);
      }
      console.log('QZ Tray connected — version ' + ver + ', signing ' + _qzSignAlgo);
    } catch (e) {
      console.warn('QZ version detect failed, keeping ' + _qzSignAlgo, e && e.message);
    }
    return true;
  } catch (err) {
    qzConnected = false;
    console.error('QZ Tray connection failed:', err);
    return false;
  } finally {
    qzConnecting = false;
  }
}

/**
 * Self-test the QZ Tray pipeline end-to-end. Used by the "Auto-Configure & Test"
 * button in Settings → Printer to give the shop a 1-click pass/fail for every
 * link in the chain. Each step returns its own status so the UI can show a row
 * per step (▶ running → ✓ ok / ✗ failed + reason).
 *
 * Steps:
 *   1. installed       — qz-tray JS SDK loaded
 *   2. connected       — websocket to localhost handshake
 *   3. version         — QZ Tray desktop version (proves SDK ↔ app talk)
 *   4. signed-handshake— signed printer-list call. The TIMEOUT branch is the
 *                        single most useful signal: if this resolves silently
 *                        within 3 s, the cert is trusted and the user will NOT
 *                        see a permission prompt on real prints. If it times
 *                        out, QZ Tray is showing the "Allow / Deny" prompt
 *                        right now (we cannot see the dialog from JS, only
 *                        observe that the promise hangs).
 *   5. silent-print    — optional: send a 1-byte ESC/POS init (\x1b@) to the
 *                        default printer. Only run if step 4 was silent. Skip
 *                        otherwise to avoid double-prompting the cashier.
 *
 * @returns {Promise<{ok: boolean, steps: Array<{key, label, status, detail?}>, summary: object}>}
 */
export async function runQZDiagnostic() {
  const steps = [];
  const push = (key, label, status, detail) => {
    const step = { key, label, status, ...(detail ? { detail } : {}) };
    steps.push(step);
    return step;
  };
  const summary = {
    qzVersion: null,
    connected: false,
    certHandshake: 'not-run',
    silentPrint: 'not-run',
    lastError: null,
    method: 'qztray',
    os: (typeof navigator !== 'undefined' && navigator.platform) ? navigator.platform : 'unknown',
    userAgent: (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : 'unknown',
    probedAt: new Date().toISOString()
  };

  // Step 1: SDK loaded
  if (!qz || !qz.websocket) {
    push('installed', 'QZ Tray SDK loaded', 'failed', 'qz-tray module not available');
    summary.lastError = 'SDK missing';
    return { ok: false, steps, summary };
  }
  push('installed', 'QZ Tray SDK loaded', 'ok');

  // Step 2: connect
  try {
    setupQZSecurity();
    if (!qz.websocket.isActive()) {
      await qz.websocket.connect({ retries: 1, delay: 0.5 });
    }
    summary.connected = true;
    push('connected', 'QZ Tray desktop reachable', 'ok');
  } catch (err) {
    summary.lastError = (err && err.message) || String(err);
    push('connected', 'QZ Tray desktop reachable', 'failed',
      'QZ Tray app may not be running. Right-click the tray icon to start it, then retry.');
    return { ok: false, steps, summary };
  }

  // Step 3: version
  try {
    const ver = await Promise.race([
      qz.api.getVersion ? qz.api.getVersion() : Promise.reject(new Error('getVersion missing')),
      new Promise((_, rej) => setTimeout(() => rej(new Error('version probe timeout')), 2000))
    ]);
    summary.qzVersion = String(ver || '');
    push('version', `QZ Tray version ${summary.qzVersion}`, 'ok');
    const major = parseInt(String(ver).split('.')[0], 10);
    const minor = parseInt(String(ver).split('.')[1] || '0', 10);
    if (major < 2 || (major === 2 && minor < 1)) {
      push('version-warn', 'Old QZ Tray (needs 2.1+)', 'failed',
        `Detected ${ver}. SHA-512 signing requires QZ Tray 2.1 or newer — please update from qz.io.`);
      summary.lastError = `outdated QZ Tray ${ver}`;
      return { ok: false, steps, summary };
    }
  } catch (err) {
    push('version', 'QZ Tray version', 'failed', (err && err.message) || 'unable to read version');
    summary.lastError = (err && err.message) || 'version probe failed';
  }

  // Step 4: signed handshake via printers.find() — silent if cert is trusted.
  // If the prompt is showing, the promise just hangs; treat any wait > 3 s as
  // "prompt is up" so we can guide the user toward the installer.
  let handshakeSilent = false;
  try {
    await Promise.race([
      qz.printers.find(),
      new Promise((_, rej) => setTimeout(() => rej(new Error('PROMPT_TIMEOUT')), 3000))
    ]);
    handshakeSilent = true;
    summary.certHandshake = 'silent';
    push('handshake', 'Signed handshake (no permission prompt)', 'ok');
  } catch (err) {
    const msg = (err && err.message) || String(err);
    if (msg === 'PROMPT_TIMEOUT') {
      summary.certHandshake = 'prompt';
      summary.lastError = 'permission prompt visible';
      push('handshake', 'Signed handshake', 'failed',
        'QZ Tray is showing an "Allow" dialog. Click "Allow" + check "Remember", or run the installer to make the cert trusted permanently.');
    } else {
      summary.certHandshake = 'error';
      summary.lastError = msg;
      push('handshake', 'Signed handshake', 'failed', msg);
    }
    return { ok: handshakeSilent, steps, summary };
  }

  // Step 5: silent print probe — use the workstation's actual bill printer.
  // QZ Tray 2.2.x rejects qz.configs.create(null) with "A printer must be
  // specified", so we must pass an explicit printer name (or LAN host:port).
  // If the shop hasn't configured a bill printer yet, skip cleanly — that's
  // a setup step, not a failure.
  try {
    const activeBill = getActiveBillPrinter();
    const addr = (activeBill && activeBill.address) || '';
    const name = (activeBill && activeBill.name) || '';
    let cfg;
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(addr)) {
      // LAN thermal printer — raw TCP socket
      const [host, port] = addr.split(':');
      cfg = qz.configs.create(null, { host, port: parseInt(port || '9100', 10) });
    } else if (name) {
      cfg = qz.configs.create(name);
    } else if (addr) {
      cfg = qz.configs.create(addr);
    } else {
      summary.silentPrint = 'skipped';
      push('silent-print', 'Silent print probe — skipped (no bill printer configured yet)', 'ok',
        'Set the bill printer name in the workstation card below, then run this test again.');
      return { ok: true, steps, summary };
    }
    await Promise.race([
      qz.print(cfg, [{ type: 'raw', format: 'plain', data: '\x1b@' }]),
      new Promise((_, rej) => setTimeout(() => rej(new Error('PRINT_TIMEOUT')), 5000))
    ]);
    summary.silentPrint = 'ok';
    push('silent-print', 'Silent print probe (no prompt)', 'ok');
  } catch (err) {
    const msg = (err && err.message) || String(err);
    summary.silentPrint = 'failed';
    summary.lastError = msg;
    // Treat as warning, NOT a hard fail — handshake (step 4) is the authoritative
    // gate. Probe failures are usually a printer-side / driver issue and the real
    // auto-print path uses the same printer name via printBillViaRawBT.
    push('silent-print', 'Silent print probe (optional)', 'failed',
      (msg === 'PRINT_TIMEOUT'
        ? 'Print did not complete within 5 s.'
        : msg) + ' — Permission is already granted (step 4 passed); real receipts should still print.');
    return { ok: true, steps, summary };
  }

  return { ok: true, steps, summary };
}

/**
 * QZ Tray 연결 해제
 */
export async function disconnectQZTray() {
  if (qz.websocket.isActive()) {
    await qz.websocket.disconnect();
  }
  qzConnected = false;
}

/**
 * QZ Tray 연결 상태 확인
 */
export function isQZTrayConnected() {
  return qzConnected && qz.websocket.isActive();
}

/**
 * QZ Tray를 통해 설치된 프린터 목록 조회
 * OS에 등록된 프린터(USB, 네트워크 등) 목록을 반환한다.
 */
export async function getQZTrayPrinters() {
  try {
    const connected = await connectQZTray();
    if (!connected) return [];
    const printers = await qz.printers.find();
    return printers;
  } catch (err) {
    console.error('Failed to get printers via QZ Tray:', err);
    return [];
  }
}

// 2026-05-29: Commercial-POS routing — a device must only print to printers it
// physically has. Without this, a device that LACKS a printer would still "accept"
// the job (phantom success) → it stamped the order printed and the device that
// ACTUALLY has the printer skipped → blank output. With this check, every device
// (POS / KDS / Floor Plan — any number open at once) prints ONLY its own printers
// and silently skips the rest, so each ticket lands on the configured printer
// exactly where it's wired, with no interception.
let _qzPrinterCache = { names: null, at: 0 };
async function getCachedQZPrinterNames() {
  try {
    const now = Date.now();
    if (_qzPrinterCache.names && (now - _qzPrinterCache.at) < 20000) return _qzPrinterCache.names;
    const list = await qz.printers.find();
    _qzPrinterCache = { names: Array.isArray(list) ? list.map((n) => String(n)) : [], at: now };
    return _qzPrinterCache.names;
  } catch (e) {
    return _qzPrinterCache.names || [];
  }
}
/** True if THIS device's QZ Tray has the named printer. Fail-open (true) only when
 *  the list can't be determined, so a transient query failure never blocks printing
 *  (qz.print's own error is the backstop). Empty name = OS default → allowed. */
async function qzHasPrinter(name) {
  if (!name) return true;
  const names = await getCachedQZPrinterNames();
  if (!names || names.length === 0) return true;
  const target = String(name).trim().toLowerCase();
  return names.some((n) => String(n).trim().toLowerCase() === target);
}

/**
 * QZ Tray를 통해 ESC/POS 데이터를 네트워크 프린터로 전송
 *
 * @param {string} escposContent - ESC/POS 명령 문자열
 * @param {string} printerAddress - 프린터 식별자. 두 가지 형식 가능:
 *   1. LAN IP:포트 (예: '192.168.1.100:9100') - 네트워크 RAW 소켓으로 직접 전송
 *   2. OS 프린터 이름 (예: 'EPSON TM-T82') - OS에 등록된 프린터로 전송
 * @returns {Promise<boolean>}
 */
/**
 * Send HTML via QZ Tray using pixel/html mode — silent print + OS-driver based,
 * so the SAME wrapPrintHTML() design that the browser shows is rendered on the
 * thermal printer too. Unlike sendViaQZTray() (raw ESC/POS), this path:
 *   - Goes through the OS print driver (Windows / macOS), not raw socket.
 *   - Means the receipt design is identical across browser-print and QZ Tray.
 *   - Renders emoji / 한글 / styled text correctly via the OS font stack.
 *
 * The first arg must be an OS-registered printer name (e.g. "POS-80C"). Raw
 * IP:port LAN sockets are not supported for pixel/html — caller should fall
 * back to network ESC/POS for those rare configurations.
 *
 * @param {string} htmlContent — full HTML string from generateHTMLBill / generateHTMLKitchenTicket
 * @param {string} printerName — OS-installed printer name (empty = OS default)
 * @returns {Promise<boolean>} true on success
 */
async function sendHTMLViaQZTray(htmlContent, printerName, opts) {
  try {
    const connected = await connectQZTray();
    if (!connected) {
      console.error('QZ Tray not connected (HTML print)');
      return false;
    }
    let resolved = printerName;
    if (!resolved) {
      try { resolved = await qz.printers.getDefault(); } catch (e) { /* non-fatal */ }
      if (!resolved) {
        console.error('QZ Tray HTML: no printer name + no OS default');
        return false;
      }
    }
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(resolved)) {
      console.error('QZ Tray HTML pixel mode requires an OS printer name, not a LAN IP. Got:', resolved);
      return false;
    }
    const config = qz.configs.create(resolved, {
      size: { width: 80, height: null, units: 'mm' },
      units: 'mm',
      colorType: 'blackwhite',
      density: 203,
      orientation: 'portrait',
      margins: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    const payloads = [{ type: 'pixel', format: 'html', flavor: 'plain', data: htmlContent }];
    await qz.print(config, payloads);
    // 2026-05-28: Send drawer pulse as a SEPARATE qz.print() with a bare config.
    // Inline-mixed (pixel+raw in one call, prev approach) caused the raster
    // driver to swallow the ESC/POS bytes — receipt printed but drawer never
    // kicked (매장 영업 1일차 The Fire 보고). Separate raw config avoids the
    // garbage-page issue (the earlier standalone openCashDrawer used pixel
    // settings → printer rasterized the raw bytes) by reusing the same
    // printer name with NO size/density/colorType so the driver treats it as
    // a raw passthrough job.
    if (opts && opts.drawerPulse) {
      try {
        const rawConfig = qz.configs.create(resolved);
        await qz.print(rawConfig, [{ type: 'raw', format: 'plain', data: '\x1B\x70\x00\x64\x64' }]);
        console.log('QZ Tray drawer pulse sent to', resolved);
      } catch (drawerErr) {
        console.warn('QZ Tray drawer pulse failed:', drawerErr && drawerErr.message);
      }
    }
    console.log('QZ Tray HTML print: sent to', resolved, opts && opts.drawerPulse ? '(+ drawer pulse)' : '');
    return true;
  } catch (err) {
    console.error('QZ Tray HTML print failed:', err && err.message);
    return false;
  }
}

async function sendViaQZTray(escposContent, printerAddress) {
  try {
    const connected = await connectQZTray();
    if (!connected) {
      console.error('QZ Tray not connected');
      return false;
    }

    let config;
    let resolvedAddress = printerAddress;

    // Empty address → use this device's OS default printer.
    // Lets a multi-POS shop share the same DB setting (billPrinter.method='qztray', address='')
    // and still have each POS print to its own counter receipt printer — each PC's
    // OS default is set locally (Control Panel → Printers → Set as Default).
    if (!resolvedAddress) {
      try {
        resolvedAddress = await qz.printers.getDefault();
      } catch (e) {
        console.warn('QZ Tray: failed to query OS default printer:', e && e.message);
      }
      if (!resolvedAddress) {
        console.error('QZ Tray: no printer address configured and no OS default printer found on this device');
        return false;
      }
      console.log('QZ Tray: using OS default printer ->', resolvedAddress);
    }

    // IP:port → QZ Tray network raw socket. The first arg of qz.configs.create() is
    // the OS printer NAME — passing "IP:port" there made QZ Tray look for an OS printer
    // by that name (always missing). Pass null + host/port options for raw socket.
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(resolvedAddress)) {
      const [host, port] = resolvedAddress.split(':');
      config = qz.configs.create(null, {
        host: host,
        port: parseInt(port || '9100', 10),
        encoding: 'UTF-8'
      });
    } else {
      // OS-registered printer name (USB printer or LAN printer added via Control Panel)
      config = qz.configs.create(resolvedAddress);
    }

    // ESC/POS를 Base64로 인코딩하여 전송
    const base64Data = btoa(unescape(encodeURIComponent(escposContent)));
    await qz.print(config, [{
      type: 'raw',
      format: 'base64',
      data: base64Data
    }]);

    console.log('QZ Tray: sent to', printerAddress);
    return true;
  } catch (err) {
    console.error('QZ Tray print failed:', err);
    return false;
  }
}

/**
 * QZ Tray 테스트 프린트
 * Settings에서 연결 확인용으로 사용
 */
export async function qzTrayTestPrint(printerAddress) {
  const content = CMD.INIT +
    CMD.ALIGN_CENTER +
    CMD.TEXT_DOUBLE +
    CMD.BOLD_ON +
    'QZ Tray Test' + CMD.LINE_FEED +
    CMD.TEXT_NORMAL +
    CMD.BOLD_OFF +
    CMD.LINE_FEED +
    'Connection OK' + CMD.LINE_FEED +
    new Date().toLocaleString() + CMD.LINE_FEED +
    CMD.LINE_FEED +
    CMD.DASHED_LINE + CMD.LINE_FEED +
    CMD.LINE_FEED +
    CMD.LINE_FEED +
    CMD.CUT_PARTIAL;

  return sendViaQZTray(content, printerAddress);
}

// Currency symbol mapping
const CURRENCY_SYMBOLS = {
  MYR: 'RM',
  USD: '$',
  SGD: 'S$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  KRW: '₩',
  THB: '฿',
  VND: '₫',
  IDR: 'Rp',
  PHP: '₱',
  INR: '₹',
  CNY: '¥',
  AUD: 'A$',
  NZD: 'NZ$',
  HKD: 'HK$',
  TWD: 'NT$'
};

function getCurrencySymbol(currency) {
  // Always return a printable symbol — fall back to RM (Malaysian default) when
  // the currency code is missing or unmapped. Returning the raw code (e.g. 'MYR')
  // was leaking through to receipts.
  return CURRENCY_SYMBOLS[currency] || (currency === 'MYR' ? 'RM' : (currency || 'RM'));
}

// ============================================
// ESC/POS Receipt Content Generation
// ============================================

/**
 * Generate ESC/POS receipt content
 *
 * @param {Object} orderData - Order information
 * @param {string} orderData.orderNumber - Order number
 * @param {string} orderData.pickupNumber - Pickup number
 * @param {Date} orderData.date - Order date
 * @param {Array} orderData.items - Order items
 * @param {number} orderData.subtotal - Subtotal
 * @param {number} orderData.discount - Discount amount
 * @param {Object} orderData.coupon - Coupon info (code, discount)
 * @param {number} orderData.serviceCharge - Service charge amount
 * @param {number} orderData.serviceChargeRate - Service charge rate (%)
 * @param {number} orderData.tax - Tax amount
 * @param {number} orderData.taxRate - Tax rate (%)
 * @param {number} orderData.total - Total amount
 * @param {string} orderData.paymentMethod - Payment method
 * @param {number} orderData.amountReceived - Amount received (cash)
 * @param {number} orderData.change - Change given
 * @param {string} orderData.currency - Currency code (e.g., 'MYR', 'USD')
 *
 * @param {Object} storeInfo - Store information
 * @param {string} storeInfo.name - Store name
 * @param {string} storeInfo.address - Store address
 * @param {string} storeInfo.phone - Store phone
 * @param {string} storeInfo.gstRegNo - GST registration number
 *
 * @returns {string} ESC/POS command string
 */
// 2026-05-31 (Irene): 빌 영수증에 결제방식 상세 표시. CONTENT-ONLY helper — does not
// touch print method/timing/routing. Maps raw payment_method (+ card type) to a
// friendly label shown on both the HTML and ESC/POS bill.
function paymentMethodLabel(method, cardType) {
  if (!method) return '';
  const m = String(method).toLowerCase().replace(/[_\s-]/g, '');
  const map = {
    cash: 'Cash', card: 'Card', creditcard: 'Card', debitcard: 'Card',
    qr: 'QR Pay', qrpay: 'QR Pay', duitnow: 'DuitNow QR',
    ewallet: 'E-Wallet', wallet: 'E-Wallet', tng: "Touch 'n Go", grabpay: 'GrabPay', boost: 'Boost',
    banktransfer: 'Bank Transfer', bank: 'Bank Transfer',
    counter: 'Pay at Counter', paypal: 'PayPal', stripe: 'Card (Online)',
    staffmeal: 'Staff Meal', online: 'Online'
  };
  let label = map[m] || (String(method).charAt(0).toUpperCase() + String(method).slice(1));
  if ((m === 'card' || m === 'creditcard' || m === 'debitcard') && cardType) {
    const ctMap = { visa: 'Visa', master: 'Mastercard', mastercard: 'Mastercard', amex: 'Amex' };
    const ct = ctMap[String(cardType).toLowerCase()];
    const ctLabel = ct != null ? ct : (String(cardType).toLowerCase() === 'other' ? '' : cardType);
    if (ctLabel) label += ' (' + ctLabel + ')';
  }
  return label;
}

export function generateBillContent(orderData, storeInfo) {
  const currencySymbol = getCurrencySymbol(orderData.currency);
  let content = '';

  // Initialize printer
  content += CMD.INIT;
  // 2026-05-29: 빌 줄간격 축소 (매장 요청). 빌 출력에만 적용 — 주방 티켓은 INIT 가
  // 기본 라인 스페이싱으로 리셋하므로 영향 없음.
  content += CMD.LINE_SPACING_TIGHT;

  // Compute order type label — printed in meta row below, not as a big top banner.
  const _orderTypeLabel =
    orderData.orderType === 'pickup' ? 'PICKUP' :
    (orderData.orderType === 'takeaway' || (orderData.takeawayCharge && orderData.takeawayCharge > 0)) ? 'TAKEAWAY' :
    orderData.orderType === 'delivery' ? 'DELIVERY' :
    'DINE-IN';

  // Pickup time only printed at top when scheduled — too important to bury in meta.
  if (orderData.orderType === 'pickup' && orderData.scheduledPickupTime) {
    content += CMD.ALIGN_CENTER;
    content += CMD.BOLD_ON;
    content += 'Pickup: ' + formatPickupTimeRange(orderData.scheduledPickupTime) + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.LINE_FEED;
  }

  // === HEADER ===
  // See generateHTMLBill for the same field-priority rules.
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  const bigName_ = storeInfo.tradeName || storeInfo.name || '';
  if (bigName_) {
    content += bigName_ + CMD.LINE_FEED;
  }
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // Store info (only show if not empty) — full multi-line address.
  if (storeInfo.address) {
    content += storeInfo.address + CMD.LINE_FEED;
  }
  if (storeInfo.address_line_2) {
    content += storeInfo.address_line_2 + CMD.LINE_FEED;
  }
  const _cityStateLineEsc = [storeInfo.city, storeInfo.state, storeInfo.postalCode || storeInfo.postal_code].filter(Boolean).join(' ');
  if (_cityStateLineEsc) {
    content += _cityStateLineEsc + CMD.LINE_FEED;
  }
  if (storeInfo.legalName && storeInfo.legalName.trim() && storeInfo.legalName.trim() !== bigName_.trim()) {
    content += storeInfo.legalName + CMD.LINE_FEED;
  }
  if (storeInfo.telephone) {
    content += 'Tel: ' + storeInfo.telephone + CMD.LINE_FEED;
  }
  if (storeInfo.businessRegistration) {
    content += 'Reg No: ' + storeInfo.businessRegistration + CMD.LINE_FEED;
  }
  if (storeInfo.gstRegNo) {
    content += 'SST NO: ' + storeInfo.gstRegNo + CMD.LINE_FEED;
  }
  content += CMD.LINE_FEED;

  // Order info
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.ALIGN_LEFT;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;
  content += formatLine('Type:', _orderTypeLabel) + CMD.LINE_FEED;

  // Show Table if exists, otherwise show Pager, otherwise show Pickup
  if (orderData.tableNumber) {
    content += formatLine('Table:', orderData.tableNumber) + CMD.LINE_FEED;
  } else if (orderData.pagerNumber) {
    content += formatLine('Pager #:', orderData.pagerNumber) + CMD.LINE_FEED;
  } else if (orderData.pickupNumber) {
    content += formatLine('Pickup #:', orderData.pickupNumber) + CMD.LINE_FEED;
  }

  const dateStr = orderData.date.toLocaleDateString('en-MY', { timeZone: (storeInfo && storeInfo.timeZone) || undefined });
  const timeStr = orderData.date.toLocaleTimeString('en-MY', { timeZone: (storeInfo && storeInfo.timeZone) || undefined,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Date:', dateStr) + CMD.LINE_FEED;
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;
  if (orderData.cashierName) {
    content += formatLine('Cashier:', orderData.cashierName) + CMD.LINE_FEED;
  }
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === ITEMS ===
  // Column header (currency symbol printed once here → item rows stay clean).
  content += CMD.LINE_FEED;
  content += CMD.BOLD_ON;
  content += formatLine('QTY  ITEM', currencySymbol) + CMD.LINE_FEED;
  content += CMD.BOLD_OFF;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  orderData.items.forEach(item => {
    const itemName = item.menuItem.name;
    const qty = item.quantity;
    const price = item.menuItem.price;
    const total = qty * price;

    // qty (4-char column) + item name on left, line total on right (no currency repeat).
    // 2026-05-29: 단가(@ unit price) 라인 제거 (매장 요청) — 수량 + 품명 + 합계만 표기.
    const qtyCol = String(qty).padEnd(4, ' ');
    content += formatLine(qtyCol + itemName, total.toFixed(2)) + CMD.LINE_FEED;

    // Set menu sub-items — HTML 빌과 동일하게 구성품을 모두 표기 (완벽히 동일한 항목).
    // thermal 은 ↳ 글리프가 안 찍힐 수 있어 ASCII '>' 사용.
    // 세트 v2(set_components) 우선 — 구성품명 + 선택옵션. 없으면 레거시 set_items.
    if (Array.isArray(item.set_components) && item.set_components.length > 0) {
      item.set_components.forEach(c => {
        const cn = (c && c.name) || '';
        if (cn) content += '    > ' + cn + (Array.isArray(c.options) && c.options.length ? ' (' + c.options.join(', ') + ')' : '') + CMD.LINE_FEED;
      });
    } else if (item.menuItem.is_set_menu && Array.isArray(item.menuItem.set_items) && item.menuItem.set_items.length > 0) {
      item.menuItem.set_items.forEach(si => {
        const siName = typeof si === 'string' ? si : ((si && si.name) || '');
        if (siName) content += '    > ' + siName + CMD.LINE_FEED;
      });
    }

    // Options — 세트 자체 옵션(A). 구성품(B)은 위 set_components 가 표기, A 는 여기서. (둘은 별개)
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        content += '    + ' + option + CMD.LINE_FEED;
      });
    }
  });

  // === TOTALS ===
  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Subtotal:', currencySymbol + ' ' + orderData.subtotal.toFixed(2)) + CMD.LINE_FEED;

  // Takeaway Charge (before discounts)
  if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
    content += formatLine('Takeaway Charge:', currencySymbol + ' ' + orderData.takeawayCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  // Fixed Amount Discount
  if (orderData.discount && orderData.discount > 0) {
    content += formatLine('Discount:', '- ' + currencySymbol + ' ' + orderData.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Percentage Discount Policy
  if (orderData.discountPolicy && orderData.discountPolicy.amount > 0) {
    const policyLabel = 'Discount (' + orderData.discountPolicy.name + '):';
    content += formatLine(policyLabel, '- ' + currencySymbol + ' ' + orderData.discountPolicy.amount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Coupon Discount
  if (orderData.coupon && orderData.coupon.discount > 0) {
    const couponLabel = 'Coupon (' + orderData.coupon.code + '):';
    content += formatLine(couponLabel, '- ' + currencySymbol + ' ' + orderData.coupon.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Points Discount
  if (orderData.pointDiscount && Number(orderData.pointDiscount) > 0) {
    const pointsLabel = 'Points (' + (orderData.pointsUsed || 0).toLocaleString() + ' pts):';
    content += formatLine(pointsLabel, '- ' + currencySymbol + ' ' + Number(orderData.pointDiscount).toFixed(2)) + CMD.LINE_FEED;
  }

  // Service Charge (after discounts)
  if (orderData.serviceCharge && orderData.serviceCharge > 0) {
    const scLabel = 'Service Charge (' + (orderData.serviceChargeRate || 10) + '%):';
    content += formatLine(scLabel, currencySymbol + ' ' + orderData.serviceCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  // Service Tax (after discounts) — Malaysian SST standard label
  if (orderData.tax && orderData.tax > 0) {
    const taxLabel = 'Service Tax @ ' + (orderData.taxRate || 6) + '%:';
    content += formatLine(taxLabel, currencySymbol + ' ' + orderData.tax.toFixed(2)) + CMD.LINE_FEED;
  }

  // Rounding adjustment (auto-derived from final vs computed)
  const _computedPreRound = (orderData.subtotal || 0)
    + (orderData.takeawayCharge || 0)
    - (orderData.discount || 0)
    - ((orderData.discountPolicy && orderData.discountPolicy.amount) || 0)
    - ((orderData.coupon && orderData.coupon.discount) || 0)
    - Number(orderData.pointDiscount || 0)
    + (orderData.serviceCharge || 0)
    + (orderData.tax || 0);
  const _roundingDelta = (orderData.total || 0) - _computedPreRound;
  if (Math.abs(_roundingDelta) >= 0.005) {
    const _sign = _roundingDelta >= 0 ? '' : '- ';
    content += formatLine('Rounding Adj:', _sign + currencySymbol + ' ' + Math.abs(_roundingDelta).toFixed(2)) + CMD.LINE_FEED;
  }

  content += CMD.SOLID_LINE + CMD.LINE_FEED;
  content += CMD.BOLD_ON;
  content += CMD.EMPHASIS_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += formatLine('Net Total:', currencySymbol + ' ' + orderData.total.toFixed(2)) + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.EMPHASIS_OFF;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === PAYMENT METHOD DETAIL (2026-05-31 Irene) — parity with HTML bill ===
  const _pmLabelR = paymentMethodLabel(orderData.paymentMethod, orderData.cardType);
  const _pmRawR = String(orderData.paymentMethod || '').toLowerCase().replace(/[_\s-]/g, '');
  if (_pmLabelR && _pmRawR !== 'pending') {
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
    content += formatLine('Payment:', _pmLabelR) + CMD.LINE_FEED;
    if (_pmRawR === 'cash' && Number(orderData.amountReceived) > 0) {
      content += formatLine('Received:', currencySymbol + ' ' + Number(orderData.amountReceived).toFixed(2)) + CMD.LINE_FEED;
      content += formatLine('Change:', currencySymbol + ' ' + Number(orderData.change || 0).toFixed(2)) + CMD.LINE_FEED;
    }
    const _paidR = Number(orderData.amountPaid);
    if (!isNaN(_paidR) && _paidR > 0 && _paidR < (orderData.total || 0) - 0.005) {
      content += formatLine('Paid:', currencySymbol + ' ' + _paidR.toFixed(2)) + CMD.LINE_FEED;
      content += formatLine('Balance Due:', currencySymbol + ' ' + ((orderData.total || 0) - _paidR).toFixed(2)) + CMD.LINE_FEED;
    }
    content += CMD.LINE_FEED;
  }

  // === TAX SUMMARY (Malaysian SST standard breakdown) ===
  if (orderData.tax && orderData.tax > 0) {
    const taxable = (orderData.tax / ((orderData.taxRate || 6) / 100)) || 0;
    content += CMD.SOLID_LINE + CMD.LINE_FEED;
    content += CMD.ALIGN_LEFT;
    content += CMD.BOLD_ON;
    content += CMD.EMPHASIS_ON;
    content += 'Tax Summary' + CMD.LINE_FEED;
    content += CMD.EMPHASIS_OFF;
    content += CMD.BOLD_OFF;
    content += 'Service Tax @ ' + (orderData.taxRate || 6) + '%' + CMD.LINE_FEED;
    content += formatLine('  Taxable', currencySymbol + ' ' + taxable.toFixed(2)) + CMD.LINE_FEED;
    content += formatLine('  Tax', currencySymbol + ' ' + orderData.tax.toFixed(2)) + CMD.LINE_FEED;
    content += CMD.LINE_FEED;
  }

  // === FOOTER ===
  // Pull the custom footer message & QR text from receiptSettings so ESC/POS
  // receipts match the look the merchant configured in Settings (which the
  // HTML browser-print path already honours).
  const receiptCfg = getReceiptSettings();
  const footerMsg = storeInfo.footerMessage || receiptCfg.footerMessage || 'Thank you for your purchase!';
  const customQrText = storeInfo.customQrText || receiptCfg.customQrText || '';
  const customQrPosition = storeInfo.customQrPosition || receiptCfg.customQrPosition || 'back';

  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  if (customQrText && customQrPosition === 'front') {
    content += customQrText + CMD.LINE_FEED;
    content += CMD.LINE_FEED;
  }
  content += footerMsg + CMD.LINE_FEED;
  if (customQrText && customQrPosition === 'back') {
    content += CMD.LINE_FEED;
    content += customQrText + CMD.LINE_FEED;
  }
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

// ============================================
// HTML Generation for PC Print — Single Source of Truth
// ============================================
//
// All printable HTML (bill / kitchen ticket / QR / cancellation / settlement)
// MUST use `wrapPrintHTML()` so every print job shares the same typography,
// spacing, dividers, and totals styling.
//
// Design tokens live ONLY in PRINT_STYLES below. To change the look of every
// printed document, change PRINT_STYLES — nowhere else.
//
// See docs/PRINT_DESIGN_GUIDE.md for the design rules and class catalog.

/**
 * Shared stylesheet for every browser-printed document.
 * 80mm thermal width, modern sans-serif, monochrome, dashed/solid dividers,
 * generous use of weight (not color) for hierarchy.
 */
const PRINT_STYLES = `
@page { size: 80mm auto; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #fff; color: #000; }
body {
  font-family: 'Noto Sans KR', 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  font-size: 12px;
  line-height: 1.3;
  padding: 10px 8px 4px 8px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.receipt { width: 100%; text-align: center; }

/* Header */
.store-name { font-size: 18px; font-weight: 700; letter-spacing: -0.3px; line-height: 1.25; }
.store-trade-name { font-size: 13px; font-weight: 500; margin-top: 2px; }
.store-info { font-size: 11px; color: #111; margin-top: 4px; line-height: 1.45; }
.store-info-line { margin: 0; }

/* Section banner (TAKEAWAY / PICKUP / DELIVERY / CANCELLED) */
.banner { display: inline-block; padding: 4px 12px; margin: 6px 0; font-weight: 700; font-size: 14px; border: 2px solid #000; letter-spacing: 0.5px; }
.banner-strong { font-size: 16px; }

/* Dividers */
.divider { border-top: 1px dashed #000; margin: 8px 0; }
.divider-solid { border-top: 1px solid #000; margin: 8px 0; }

/* Meta rows (Order/Table/Date/Cashier) */
.meta { text-align: left; font-size: 12px; }
.meta-row { display: flex; justify-content: space-between; align-items: baseline; padding: 1px 0; }
.meta-label { font-weight: 600; }

/* Items */
.items-header { display: flex; align-items: baseline; gap: 8px; font-weight: 700; font-size: 12px; padding: 4px 0; border-top: 1px solid #000; border-bottom: 1px solid #000; margin: 4px 0; }
.items-header .ih-qty { width: 28px; text-align: left; }
.items-header .ih-name { flex: 1; text-align: left; }
.items-header .ih-price { width: 56px; text-align: right; white-space: nowrap; }
.items { text-align: left; margin: 3px 0; }
.item { margin-bottom: 3px; }
.item-row { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
.item-row .ih-qty { width: 28px; text-align: left; font-weight: 600; }
.item-name { flex: 1; font-weight: 600; word-break: break-word; }
.item-price { width: 56px; text-align: right; white-space: nowrap; }
.item-qty { font-size: 11px; color: #222; padding-left: 36px; margin-top: 1px; }
.item-option { font-size: 11px; padding-left: 36px; color: #222; }
.item-option::before { content: '+ '; }

/* Totals */
.totals { text-align: left; margin-top: 6px; }
.totals .meta-row { padding: 1px 0; }
.total-final { display: flex; justify-content: space-between; align-items: baseline; font-size: 16px; font-weight: 700; margin-top: 4px; padding-top: 4px; border-top: 1px solid #000; }

/* Big numbers (table/pickup) */
.big-number { font-size: 28px; font-weight: 700; letter-spacing: 1px; margin: 6px 0; }
.medium-number { font-size: 20px; font-weight: 700; letter-spacing: 0.5px; margin: 4px 0; }

/* QR */
.qr-container { display: flex; justify-content: center; margin: 8px 0 4px 0; }
.qr-container img { display: block; image-rendering: pixelated; }
.instruction { font-size: 13px; font-weight: 600; margin-top: 4px; }

/* Footer */
.footer { margin-top: 10px; font-size: 11px; line-height: 1.45; }
.footer-message { font-size: 12px; font-weight: 500; }
.time-info { font-size: 10px; color: #333; margin-top: 2px; }

/* Per-station header in kitchen tickets */
/* 스테이션 헤더 = 사방 박스 (위/아래 2선이 만나 밀리거나 잘리는 문제 방지 — 안정 레이아웃) */
.group-label { font-size: 16px; font-weight: 700; letter-spacing: 0.5px; text-align: center; padding: 6px 8px; margin: 8px 0; border: 2px solid #000; box-sizing: border-box; width: 100%; }
.station-tag { display: inline-block; padding: 1px 6px; margin-left: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; border: 1px solid #000; vertical-align: middle; }

/* Multi-page (kitchen per-item) */
@media print {
  html, body { height: auto; }
  .page-break { page-break-after: always; }
  .no-print { display: none !important; }
}
`;

/**
 * Wrap a print-ready inner-HTML body with the shared stylesheet + document chrome.
 * EVERY printable HTML (bill / kitchen / QR / cancellation / settlement) goes
 * through this function — there should be NO other <style> tags in this file.
 *
 * @param {string} title - Document title (used by browser print dialog and OS print logs)
 * @param {string} bodyHtml - Inner HTML to render inside <div class="receipt">
 * @returns {string} Complete HTML document
 */
function wrapPrintHTML(title, bodyHtml) {
  const safeTitle = String(title || 'Print').replace(/</g, '&lt;');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${safeTitle}</title>
<style>${PRINT_STYLES}</style>
</head><body><div class="receipt">${bodyHtml}</div></body></html>`;
}

/** HTML-escape user-provided strings before injecting into print HTML. */
// 2026-06-03: 인쇄 공용 — 옵션/이름의 이모지·아이콘 제거 (빌·오더티켓 모든 프린팅, Irene).
// 화살표(↳ → 등 U+2190~21FF / U+2B00~)는 구조 기호라 보존. 🌶️ ☕ 🍽️ 국기 등 픽토그램만 제거.
function stripPrintEmoji(s) {
  return String(s == null ? '' : s)
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{FE00}-\u{FE0F}\u{200D}]/gu, '')
    .replace(/[ \t]{2,}/g, ' ');
}

// raw ESC/POS 경로 전용 — 이모지만 제거(HTML escape 불필요). 단품/통합/스테이션 raw 티켓이
// 메뉴명·옵션·구성품명을 원문 그대로 출력해 LAN IP 프린터에서 이모지가 깨지던 문제(2026-06-04).
// HTML 경로(escapeHtmlForPrint)와 동일 기준. ⚠ 들여쓰기 prefix('  * ')는 감싸지 말 것 —
// stripPrintEmoji 가 연속 공백을 1칸으로 줄여 레이아웃이 깨진다. 변수(사용자 콘텐츠)만 감쌀 것.
function rawText(s) {
  return stripPrintEmoji(String(s == null ? '' : s)).trim();
}

function escapeHtmlForPrint(s) {
  return stripPrintEmoji(String(s == null ? '' : s))
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Generate HTML Bill for PC browser print
 */
function getReceiptSettings() {
  try {
    const saved = localStorage.getItem('receiptSettings');
    if (saved) return JSON.parse(saved);
  } catch {}
  return { receiptLogo: '', footerMessage: 'Thank you for your purchase!', showMembership: false, customQrImage: '', customQrText: '', customQrPosition: 'back' };
}

export function generateHTMLBill(orderData, storeInfo) {
  const receiptCfg = getReceiptSettings();
  // Merge precedence: storeInfo (React state) > receiptCfg (localStorage) > defaults
  const showMembership = storeInfo.showMembership !== undefined ? storeInfo.showMembership : (receiptCfg.showMembership !== undefined ? receiptCfg.showMembership : false);
  // Prefer the base64 data URL (set by StoreContext on mount). QZ Tray pixel/html
  // render cannot fetch external HTTP resources reliably — inline base64 makes
  // the logo render on every print path (browser + QZ Tray + RawBT).
  const receiptLogo = storeInfo.receiptLogoDataUrl || storeInfo.receiptLogo || receiptCfg.receiptLogoDataUrl || receiptCfg.receiptLogo || '';
  const footerMsg = storeInfo.footerMessage || receiptCfg.footerMessage || 'Thank you for your purchase!';
  const customQrImage = storeInfo.customQrImage || receiptCfg.customQrImage || '';
  const customQrText = storeInfo.customQrText || receiptCfg.customQrText || '';
  const customQrPosition = storeInfo.customQrPosition || receiptCfg.customQrPosition || 'back';

  const membershipQrDataUrl = storeInfo.membershipQrDataUrl || receiptCfg.membershipQrDataUrl || '';
  let customQrDataUrl = '';
  if (customQrImage && customQrImage.startsWith('/uploads/')) {
    customQrDataUrl = window.location.origin + customQrImage;
  } else if (customQrImage) {
    customQrDataUrl = customQrImage;
  }
  const currencySymbol = getCurrencySymbol(orderData.currency);
  const dateStr = orderData.date.toLocaleDateString('en-MY', { timeZone: (storeInfo && storeInfo.timeZone) || undefined });
  const timeStr = orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: (storeInfo && storeInfo.timeZone) || undefined });

  // Order-type label — always shown in the meta row (Type:). Big top banner is
  // reserved for pickup scheduled time / delivery address which need emphasis,
  // not for the type itself.
  const orderTypeLabel =
    orderData.orderType === 'pickup' ? 'PICKUP' :
    (orderData.orderType === 'takeaway' || (orderData.takeawayCharge && orderData.takeawayCharge > 0)) ? 'TAKEAWAY' :
    orderData.orderType === 'delivery' ? 'DELIVERY' :
    'DINE-IN';

  let bannerHtml = '';
  if (orderData.orderType === 'pickup' && orderData.scheduledPickupTime) {
    const pickupTime = formatPickupTimeRange(orderData.scheduledPickupTime);
    bannerHtml = `<div style="font-weight:600;margin:4px 0;">Pickup: ${escapeHtmlForPrint(pickupTime)}</div>`;
  } else if (orderData.orderType === 'delivery' && orderData.deliveryInfo) {
    const di = orderData.deliveryInfo;
    const parts = [di.address, di.phone && `Phone: ${di.phone}`, di.zoneName && `Zone: ${di.zoneName}`].filter(Boolean);
    if (parts.length) {
      bannerHtml = `<div style="font-weight:600;text-align:left;margin:4px 0;padding:4px;border:1px dashed #000;font-size:11px;">${parts.map(p => escapeHtmlForPrint(p)).join('<br>')}</div>`;
    }
  }

  // Header (logo + brand name + store info lines)
  const bigName = storeInfo.tradeName || storeInfo.name || '';
  const legalName = storeInfo.legalName || '';
  const showLegal = legalName && legalName.trim() && legalName.trim() !== bigName.trim();
  const infoLines = [];
  // Full address — output every populated component on its own line so the receipt
  // shows the complete posted address (street / address line 2 / city+state+postal).
  if (storeInfo.address) infoLines.push(escapeHtmlForPrint(storeInfo.address));
  if (storeInfo.address_line_2) infoLines.push(escapeHtmlForPrint(storeInfo.address_line_2));
  const _cityStateLine = [storeInfo.city, storeInfo.state, storeInfo.postalCode || storeInfo.postal_code].filter(Boolean).join(' ');
  if (_cityStateLine) infoLines.push(escapeHtmlForPrint(_cityStateLine));
  if (showLegal) infoLines.push(escapeHtmlForPrint(legalName));
  if (storeInfo.telephone) infoLines.push('Tel: ' + escapeHtmlForPrint(storeInfo.telephone));
  const regParts = [];
  if (storeInfo.businessRegistration) regParts.push('Reg No: ' + escapeHtmlForPrint(storeInfo.businessRegistration));
  if (storeInfo.gstRegNo) regParts.push('SST NO: ' + escapeHtmlForPrint(storeInfo.gstRegNo));
  if (regParts.length) infoLines.push(regParts.join(' &nbsp;|&nbsp; '));

  const headerHtml = `
    ${receiptLogo ? `<img src="${escapeHtmlForPrint(/^(data:|https?:\/\/)/.test(receiptLogo) ? receiptLogo : (typeof window !== 'undefined' ? window.location.origin : '') + receiptLogo)}" style="max-width:240px;max-height:80px;margin-bottom:4px;filter:grayscale(100%);">` : ''}
    <div class="store-name">${escapeHtmlForPrint(bigName)}</div>
    ${infoLines.map(l => `<p class="store-info store-info-line">${l}</p>`).join('')}
  `;

  // Meta rows
  const tableMetaHtml = orderData.tableNumber
    ? `<div class="meta-row"><span class="meta-label">Table</span><span><strong>${escapeHtmlForPrint(orderData.tableNumber)}</strong></span></div>`
    : (orderData.pagerNumber
      ? `<div class="meta-row"><span class="meta-label">Pager #</span><span>${escapeHtmlForPrint(orderData.pagerNumber)}</span></div>`
      : (orderData.pickupNumber
        ? `<div class="meta-row"><span class="meta-label">Pickup #</span><span>${escapeHtmlForPrint(orderData.pickupNumber)}</span></div>`
        : ''));

  const metaHtml = `
    <div class="meta">
      <div class="meta-row"><span class="meta-label">Order</span><span>${escapeHtmlForPrint(orderData.orderNumber)}</span></div>
      <div class="meta-row"><span class="meta-label">Type</span><span>${orderTypeLabel}</span></div>
      ${tableMetaHtml}
      <div class="meta-row"><span class="meta-label">Date</span><span>${dateStr}</span></div>
      <div class="meta-row"><span class="meta-label">Time</span><span>${timeStr}</span></div>
      ${orderData.cashierName ? `<div class="meta-row"><span class="meta-label">Cashier</span><span>${escapeHtmlForPrint(orderData.cashierName)}</span></div>` : ''}
    </div>
  `;

  // Items column header — currency printed ONCE in the header so item rows stay clean.
  const itemsHeaderHtml = `
    <div class="items-header">
      <span class="ih-qty">QTY</span>
      <span class="ih-name">ITEM</span>
      <span class="ih-price">${escapeHtmlForPrint(currencySymbol)}</span>
    </div>
  `;

  const itemsHtml = orderData.items.map(item => {
    const itemName = escapeHtmlForPrint(item.menuItem.name);
    const qty = item.quantity;
    const price = item.menuItem.price;
    const total = qty * price;
    const hasSetComps = Array.isArray(item.set_components) && item.set_components.length > 0;
    // options = 세트 자체 옵션(A) — 구성품(B)과 별개라 둘 다 표기.
    const optionsHtml = (item.options || []).map(o => `<div class="item-option">${escapeHtmlForPrint(typeof o === 'string' ? o : (o?.name || ''))}</div>`).join('');
    // Set menu — list every sub-item so the customer sees what's included
    // (previously only the wrapper name printed, hiding the contents).
    const setItemsHtml = (Array.isArray(item.set_components) && item.set_components.length > 0)
      ? item.set_components.map(c => `<div class="item-option">↳ ${escapeHtmlForPrint((c && c.name) || '')}${Array.isArray(c.options) && c.options.length ? ' (' + escapeHtmlForPrint(c.options.join(', ')) + ')' : ''}</div>`).join('')
      : (item.menuItem.is_set_menu && Array.isArray(item.menuItem.set_items) && item.menuItem.set_items.length > 0)
        ? item.menuItem.set_items.map(si => `<div class="item-option">↳ ${escapeHtmlForPrint(typeof si === 'string' ? si : (si?.name || ''))}</div>`).join('')
        : '';
    // 2026-05-29: 단가(@ unit price) 라인 제거 (매장 요청) — 수량 + 품명 + 합계만.
    return `
      <div class="item">
        <div class="item-row"><span class="ih-qty">${qty}</span><span class="item-name">${itemName}</span><span class="item-price">${total.toFixed(2)}</span></div>
        ${setItemsHtml}
        ${optionsHtml}
      </div>
    `;
  }).join('');

  // Totals
  const totalsRows = [];
  totalsRows.push(`<div class="meta-row"><span>Subtotal</span><span>${currencySymbol} ${orderData.subtotal.toFixed(2)}</span></div>`);
  if (orderData.takeawayCharge && orderData.takeawayCharge > 0) totalsRows.push(`<div class="meta-row"><span>Takeaway Charge</span><span>${currencySymbol} ${orderData.takeawayCharge.toFixed(2)}</span></div>`);
  if (orderData.discount && orderData.discount > 0) totalsRows.push(`<div class="meta-row"><span>Discount</span><span>− ${currencySymbol} ${orderData.discount.toFixed(2)}</span></div>`);
  if (orderData.discountPolicy && orderData.discountPolicy.amount > 0) totalsRows.push(`<div class="meta-row"><span>Discount (${escapeHtmlForPrint(orderData.discountPolicy.name)})</span><span>− ${currencySymbol} ${orderData.discountPolicy.amount.toFixed(2)}</span></div>`);
  if (orderData.coupon && orderData.coupon.discount > 0) totalsRows.push(`<div class="meta-row"><span>Coupon (${escapeHtmlForPrint(orderData.coupon.code)})</span><span>− ${currencySymbol} ${orderData.coupon.discount.toFixed(2)}</span></div>`);
  if (orderData.pointDiscount && Number(orderData.pointDiscount) > 0) totalsRows.push(`<div class="meta-row"><span>Points (${(orderData.pointsUsed || 0).toLocaleString()} pts)</span><span>− ${currencySymbol} ${Number(orderData.pointDiscount).toFixed(2)}</span></div>`);
  if (orderData.serviceCharge && orderData.serviceCharge > 0) totalsRows.push(`<div class="meta-row"><span>Service Charge (${orderData.serviceChargeRate || 10}%)</span><span>${currencySymbol} ${orderData.serviceCharge.toFixed(2)}</span></div>`);
  if (orderData.tax && orderData.tax > 0) totalsRows.push(`<div class="meta-row"><span>Service Tax @ ${orderData.taxRate || 6}%</span><span>${currencySymbol} ${orderData.tax.toFixed(2)}</span></div>`);

  // Rounding adjustment (auto-derived: difference between final total and computed pre-round total).
  // Cash-rounding setting on the restaurant rounds to nearest 5sen — print the delta line when non-zero
  // so the customer sees why total ≠ subtotal+tax exactly.
  const computedPreRound = (orderData.subtotal || 0)
    + (orderData.takeawayCharge || 0)
    - (orderData.discount || 0)
    - ((orderData.discountPolicy && orderData.discountPolicy.amount) || 0)
    - ((orderData.coupon && orderData.coupon.discount) || 0)
    - Number(orderData.pointDiscount || 0)
    + (orderData.serviceCharge || 0)
    + (orderData.tax || 0);
  const roundingDelta = (orderData.total || 0) - computedPreRound;
  if (Math.abs(roundingDelta) >= 0.005) {
    const sign = roundingDelta >= 0 ? '' : '− ';
    totalsRows.push(`<div class="meta-row"><span>Rounding Adj</span><span>${sign}${currencySymbol} ${Math.abs(roundingDelta).toFixed(2)}</span></div>`);
  }

  const totalsHtml = `
    <div class="totals">
      ${totalsRows.join('')}
      <div class="total-final"><span>Net Total</span><span>${currencySymbol} ${orderData.total.toFixed(2)}</span></div>
    </div>
  `;

  // Payment method detail (2026-05-31 Irene) — shown on EVERY bill, same format
  // regardless of order type. Cash → Received/Change; card → type; partial → Paid/Balance.
  const _pmLabel = paymentMethodLabel(orderData.paymentMethod, orderData.cardType);
  const _pmRaw = String(orderData.paymentMethod || '').toLowerCase().replace(/[_\s-]/g, '');
  const paymentRows = [];
  if (_pmLabel && _pmRaw !== 'pending') {
    paymentRows.push(`<div class="meta-row"><span class="meta-label">Payment</span><span>${escapeHtmlForPrint(_pmLabel)}</span></div>`);
    if (_pmRaw === 'cash' && Number(orderData.amountReceived) > 0) {
      paymentRows.push(`<div class="meta-row"><span>Received</span><span>${currencySymbol} ${Number(orderData.amountReceived).toFixed(2)}</span></div>`);
      paymentRows.push(`<div class="meta-row"><span>Change</span><span>${currencySymbol} ${Number(orderData.change || 0).toFixed(2)}</span></div>`);
    }
    const _paid = Number(orderData.amountPaid);
    if (!isNaN(_paid) && _paid > 0 && _paid < (orderData.total || 0) - 0.005) {
      paymentRows.push(`<div class="meta-row"><span>Paid</span><span>${currencySymbol} ${_paid.toFixed(2)}</span></div>`);
      paymentRows.push(`<div class="meta-row"><span>Balance Due</span><span>${currencySymbol} ${((orderData.total || 0) - _paid).toFixed(2)}</span></div>`);
    }
  }
  const paymentHtml = paymentRows.length ? `<div class="divider"></div><div class="meta">${paymentRows.join('')}</div>` : '';

  // Tax Summary — Malaysian SST standard breakdown (Taxable amount + Tax amount).
  // Auto-shown whenever tax > 0. Taxable = the base amount tax was calculated on.
  const taxSummaryHtml = (orderData.tax && orderData.tax > 0) ? `
    <div class="divider"></div>
    <div style="text-align:left;font-weight:700;margin:4px 0 2px 0;">Tax Summary</div>
    <div class="meta">
      <div class="meta-row"><span class="meta-label">Service Tax @ ${orderData.taxRate || 6}%</span><span></span></div>
      <div class="meta-row"><span>&nbsp;&nbsp;Taxable</span><span>${currencySymbol} ${((orderData.tax / ((orderData.taxRate || 6) / 100)) || 0).toFixed(2)}</span></div>
      <div class="meta-row"><span>&nbsp;&nbsp;Tax</span><span>${currencySymbol} ${orderData.tax.toFixed(2)}</span></div>
    </div>
  ` : '';

  // Membership QR (loyalty link)
  const membershipHtml = (showMembership && membershipQrDataUrl) ? `
    <div class="divider"></div>
    <div class="instruction">Order online &amp; earn points!</div>
    <div class="qr-container"><img src="${escapeHtmlForPrint(membershipQrDataUrl)}" width="96" height="96"></div>
  ` : '';

  // Custom QR (store-defined)
  const customQrHtml = customQrDataUrl ? `
    <div class="divider"></div>
    ${customQrText && customQrPosition === 'front' ? `<div class="instruction">${escapeHtmlForPrint(customQrText)}</div>` : ''}
    <div class="qr-container"><img src="${escapeHtmlForPrint(customQrDataUrl)}" width="96" height="96"></div>
    ${customQrText && customQrPosition === 'back' ? `<div class="instruction">${escapeHtmlForPrint(customQrText)}</div>` : ''}
  ` : '';

  const footerHtml = `<div class="footer footer-message">${escapeHtmlForPrint(footerMsg)}</div>`;

  return wrapPrintHTML(`Bill - ${orderData.orderNumber || ''}`, `
    ${bannerHtml}
    ${headerHtml}
    <div class="divider"></div>
    ${metaHtml}
    <div class="divider"></div>
    ${itemsHeaderHtml}
    <div class="items">${itemsHtml}</div>
    <div class="divider"></div>
    ${totalsHtml}
    ${paymentHtml}
    ${taxSummaryHtml}
    ${membershipHtml}
    ${customQrHtml}
    ${footerHtml}
  `);
}

/**
 * Generate HTML Kitchen Ticket for PC browser print
 */
export function generateHTMLKitchenTicket(orderData, storeInfo) {
  const timeStr = orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: (storeInfo && storeInfo.timeZone) || undefined });
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';

  // 취소표 통일 (2026-06-04): 취소표는 별도 디자인 폐기 → 이 일반 오더티켓 생성기를 그대로
  // 재사용하고 noticeHeader(CANCELLED 배너) + voided 플래그만 추가한다. 주방이 평소 보던
  // 오더티켓과 같은 모양 + 큰 CANCELLED 도장이라 레일의 원본 티켓과 즉시 짝맞춤 가능(업계 표준).
  // ⚠ voided 가 false(평소 주문)면 _strike 는 원문 그대로 → 일반 티켓 출력 100% 불변.
  const _void = !!orderData.voided;
  const _strike = (t) => _void ? `<span style="text-decoration:line-through;">${t}</span>` : t;

  // Items — kitchen format: large qty × name + starred options + inline station tag
  // The station tag lets POS staff (when this ticket comes out at the counter)
  // tell at a glance which kitchen station each item belongs to.
  // 2026-06-05 (Irene): 인라인 스테이션 태그는 통합(카운터) 티켓에서만 (showItemStations).
  // 스테이션별 티켓은 상단/그룹 라벨에 이미 스테이션이 있어 인라인 태그는 중복.
  const _showStations = !!orderData.showItemStations;
  const _stationTag = (sn) => (_showStations && sn)
    ? ` <span class="station-tag">${escapeHtmlForPrint(sn.toUpperCase())}</span>`
    : '';
  const itemsHtml = orderData.items.map(item => {
    const itemName = escapeHtmlForPrint(item.menuItem?.name || item.name);
    const qty = item.quantity;
    const stationTagHtml = _stationTag(item.stationName);
    // 세트 구성품: set_components 우선, 없으면 레거시 set_items 폴백(둘 다 메뉴명 보유).
    // (테이블이동/구주문이 set_components 없이 set_items 만 들고 와도 메뉴명 크게 펼침)
    const _comps = (Array.isArray(item.set_components) && item.set_components.length > 0) ? item.set_components
      : (Array.isArray(item.set_items) && item.set_items.length > 0 ? item.set_items : null);
    const hasSetComps = !!_comps;
    // 세트 자체 옵션(A) — 구성품(B)과 별개. 둘 다 표기.
    const setLevelOptionsHtml = (item.options || []).map(opt =>
      `<div class="item-option" style="font-size:13px;font-weight:600;">★ ${escapeHtmlForPrint(typeof opt === 'string' ? opt : (opt?.name || ''))}</div>`
    ).join('');
    // Per-item special request (2026-05-31 Irene) — kitchen must see it.
    const _si = item.special_instructions || item.specialInstructions || '';
    const siHtml = (_si && String(_si).trim())
      ? `<div class="item-option" style="font-size:14px;font-weight:700;color:#000;">** ${escapeHtmlForPrint(String(_si).trim())}</div>` : '';
    if (hasSetComps) {
      // 세트: 주방은 구성품(=실제 만드는 메뉴)을 봐야 한다. 구성품을 18px 메뉴로 크게 + 옵션,
      // 세트명은 작은 라벨로(맥락만). 방식 무변경 콘텐츠/레이아웃만.
      const compsHtml = _comps.map(c => {
        const cn = escapeHtmlForPrint((c && c.name) || '');
        if (!cn) return '';
        const cq = (Number(qty) || 1) * (Number(c.qty) || 1);
        const co = Array.isArray(c.options) && c.options.length
          ? `<div class="item-option" style="font-size:13px;font-weight:600;">★ ${escapeHtmlForPrint(c.options.join(', '))}</div>` : '';
        // 구성품은 각자 걸린 주방을 표시(통합 티켓 전용). 부모 세트 태그 대신 구성품 자기 station.
        return `<div class="item-name" style="font-size:18px;font-weight:700;">${_strike(`${cq} × ${cn}`)}${_stationTag(c.stationName)}</div>${co}`;
      }).join('');
      return `
      <div class="item">
        <div style="font-size:11px;font-weight:600;letter-spacing:0.3px;color:#000;">↳ ${_strike(itemName)}</div>
        ${compsHtml}
        ${setLevelOptionsHtml}
        ${siHtml}
      </div>
    `;
    }
    return `
      <div class="item">
        <div class="item-name" style="font-size:18px;font-weight:700;">${_strike(`${qty} × ${itemName}`)}${stationTagHtml}</div>
        ${setLevelOptionsHtml}
        ${siHtml}
      </div>
    `;
  }).join('');

  const groupLabelHtml = orderData.groupLabel
    ? `<div class="group-label">${escapeHtmlForPrint(orderData.groupLabel.toUpperCase())}</div>`
    : '';

  // Notice header (table-move reissue 등) — orderData.noticeHeader 설정 시에만.
  // 미설정이면 빈 문자열 → 일반 티켓 출력 동일(영향 0). docs/TABLE_MOVE_AND_VOID_TICKET.md § 설계 2-A.
  let noticeHeaderHtml = '';
  if (orderData.noticeHeader) {
    const _nh = orderData.noticeHeader;
    const _nhTitle = escapeHtmlForPrint(typeof _nh === 'string' ? _nh : (_nh.title || ''));
    const _nhLines = (_nh && typeof _nh === 'object' && Array.isArray(_nh.lines)) ? _nh.lines : [];
    const _sub = _nhLines.map(l => `<div style="font-size:13px;font-weight:600;">${escapeHtmlForPrint(String(l))}</div>`).join('');
    noticeHeaderHtml = `<div class="banner banner-strong" style="background:#000;color:#fff;border-color:#000;">${_nhTitle}</div>${_sub}`;
  }

  // Order-type banner
  let bannerHtml = '';
  if (orderData.orderType === 'pickup') {
    const pickupTime = orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP';
    bannerHtml = `<div class="banner banner-strong">PRE-ORDER PICKUP</div>
      <div style="font-weight:600;">Pickup: ${escapeHtmlForPrint(pickupTime)}</div>`;
  } else if (orderData.orderType === 'takeaway' || (orderData.takeawayCharge && orderData.takeawayCharge > 0)) {
    bannerHtml = `<div class="banner">TAKEAWAY</div>`;
  } else if (orderData.orderType === 'delivery') {
    bannerHtml = `<div class="banner">DELIVERY</div>`;
    if (orderData.deliveryInfo) {
      const di = orderData.deliveryInfo;
      const lines = [];
      if (di.address) lines.push(`<div>${escapeHtmlForPrint(di.address)}</div>`);
      if (di.phone) lines.push(`<div>Phone: ${escapeHtmlForPrint(di.phone)}</div>`);
      if (di.zoneName) lines.push(`<div>Zone: ${escapeHtmlForPrint(di.zoneName)}</div>`);
      if (di.notes) lines.push(`<div>Notes: ${escapeHtmlForPrint(di.notes)}</div>`);
      if (lines.length) {
        bannerHtml += `<div style="margin:6px 0;padding:6px;border:1px dashed #000;text-align:left;font-size:12px;">
          <div style="font-weight:700;">DELIVERY ADDRESS</div>${lines.join('')}
        </div>`;
      }
    }
  }

  // Table / pager / pickup big number (skipFooterLocation suppresses for group prints)
  let pickupHtml = '';
  if (!orderData.skipFooterLocation) {
    // 2026-06-24 (Irene): 테이블이동 재발행 티켓은 맨 아래 테이블 라인에 "이전(취소선) → 새"
    // 로 표기 — 주방이 어느 테이블에서 어디로 옮겼는지 즉시 안다. noticeHeader.fromTable/toTable
    // (backend pending_reprint.notice) 가 있을 때만. 공간 절약 위해 'TABLE' 라벨 생략, 번호만.
    const _nhMove = orderData.noticeHeader && typeof orderData.noticeHeader === 'object'
      && orderData.noticeHeader.fromTable != null && orderData.noticeHeader.toTable != null
      && String(orderData.noticeHeader.fromTable) !== String(orderData.noticeHeader.toTable);
    if (_nhMove) {
      const _ft = escapeHtmlForPrint(String(orderData.noticeHeader.fromTable));
      const _tt = escapeHtmlForPrint(String(orderData.noticeHeader.toTable));
      pickupHtml = `<div class="big-number"><span style="text-decoration:line-through;font-weight:700;">${_ft}</span> &rarr; ${_tt}</div>`;
    } else if (orderData.tableNumber) {
      pickupHtml = `<div class="big-number">TABLE ${escapeHtmlForPrint(orderData.tableNumber)}</div>`;
    } else if (orderData.pagerNumber) {
      pickupHtml = `<div class="big-number">PAGER ${escapeHtmlForPrint(orderData.pagerNumber)}</div>`;
    } else {
      const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
      pickupHtml = `<div class="big-number">PICKUP ${escapeHtmlForPrint(pickupNum)}</div>`;
    }
  }

  const metaHtml = `
    <div class="meta">
      <div class="meta-row"><span class="meta-label">Order</span><span>${escapeHtmlForPrint(orderData.orderNumber)}</span></div>
      <div class="meta-row"><span class="meta-label">Time</span><span>${timeStr}</span></div>
      <div class="meta-row"><span class="meta-label">Source</span><span>${orderSource}</span></div>
      ${orderData.customerName && orderData.customerName !== 'Walk-in Customer'
        ? `<div class="meta-row"><span class="meta-label">Customer</span><span>${escapeHtmlForPrint(orderData.customerName)}</span></div>`
        : ''}
    </div>
  `;

  const notesHtml = (orderData.notes && orderData.notes.trim()) ? `
    <div class="divider"></div>
    <div style="font-weight:700;text-align:left;">SPECIAL NOTES</div>
    <div style="font-size:13px;text-align:left;">${escapeHtmlForPrint(orderData.notes)}</div>
  ` : '';

  // 모든 주방 티켓 상단 station 이름 박스 (Irene 2026-06-02). station-routed 티켓은 items 가
  // 같은 stationName 을 가짐 → 거기서 도출. 미설정(단일 주방)이면 박스 생략.
  // 2026-06-03: 통합(카운터 미러) 티켓은 여러 스테이션이 섞여 있으므로 상단 박스 생략
  // (noStationBox). 카운터는 아이템별 인라인 [KQ1][KQ2] 태그로 라우팅 확인 — 박스에 첫
  // 스테이션(KQ1)만 찍히던 오류 제거.
  const _ticketStation = orderData.noStationBox ? '' : ((orderData.stationName
    || (orderData.items || []).map(i => i && i.stationName).find(Boolean)
    || '').toString().trim());
  const stationBoxHtml = _ticketStation
    ? `<div style="border:2px solid #000;border-radius:6px;padding:5px 0;text-align:center;font-size:17px;font-weight:800;letter-spacing:2px;margin-bottom:6px;">${escapeHtmlForPrint(_ticketStation.toUpperCase())}</div>`
    : '';

  return wrapPrintHTML(`Kitchen Ticket - ${orderData.orderNumber || ''}`, `
    ${stationBoxHtml}
    ${noticeHeaderHtml}
    ${groupLabelHtml}
    ${metaHtml}
    <div class="divider"></div>
    <div style="font-size:14px;font-weight:700;text-align:left;margin:4px 0;">ORDER ITEMS</div>
    <div class="items">${itemsHtml}</div>${_void ? `<div class="banner banner-strong" style="background:#000;color:#fff;border-color:#000;">${escapeHtmlForPrint(orderData.cancelFooter || '>> STOP PREPARATION <<')}</div>` : ''}
    ${notesHtml}
    <div class="divider"></div>
    ${pickupHtml}
    ${bannerHtml}
  `);
}

/**
 * Generate HTML Additional Items Ticket for PC browser print
 */
function generateHTMLAdditionalItemsTicket(orderData, storeInfo) {
  const addedItems = orderData.items.filter(item => item.added_at);
  if (addedItems.length === 0) return null;

  const timeStr = new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: (storeInfo && storeInfo.timeZone) || undefined });

  const itemsHtml = addedItems.map(item => {
    const itemName = escapeHtmlForPrint(item.menuItem?.name || item.name);
    const qty = item.quantity;
    const stationTagHtml = (orderData.showItemStations && item.stationName)
      ? ` <span class="station-tag">${escapeHtmlForPrint(item.stationName.toUpperCase())}</span>`
      : '';
    const hasSetComps = Array.isArray(item.set_components) && item.set_components.length > 0;
    const setCompHtml = hasSetComps
      ? item.set_components.map(c => {
          const cn = escapeHtmlForPrint((c && c.name) || '');
          const co = Array.isArray(c.options) && c.options.length ? `<div class="item-option" style="font-size:12px;">★ ${escapeHtmlForPrint(c.options.join(', '))}</div>` : '';
          return cn ? `<div class="item-option" style="font-size:14px;font-weight:700;">› ${cn}</div>${co}` : '';
        }).join('')
      : '';
    // options = 세트 자체 옵션(A) — 구성품(B, set_components)과 별개라 둘 다 표기.
    const optionsHtml = (item.options || []).map(opt =>
      `<div class="item-option" style="font-size:13px;font-weight:600;">★ ${escapeHtmlForPrint(typeof opt === 'string' ? opt : (opt?.name || ''))}</div>`
    ).join('');
    return `
      <div class="item">
        <div class="item-name" style="font-size:18px;font-weight:700;">${qty} × ${itemName}${stationTagHtml}</div>
        ${setCompHtml}
        ${optionsHtml}
      </div>
    `;
  }).join('');

  const metaHtml = `
    <div class="meta">
      <div class="meta-row"><span class="meta-label">Order</span><span>${escapeHtmlForPrint(orderData.orderNumber)}</span></div>
      <div class="meta-row"><span class="meta-label">Time</span><span>${timeStr}</span></div>
      ${orderData.tableNumber ? `<div class="meta-row"><span class="meta-label">Table</span><span><strong>${escapeHtmlForPrint(orderData.tableNumber)}</strong></span></div>` : ''}
    </div>
  `;

  const _ticketStation = orderData.noStationBox ? '' : ((orderData.stationName
    || (orderData.items || []).map(i => i && i.stationName).find(Boolean)
    || '').toString().trim());
  const stationBoxHtml = _ticketStation
    ? `<div style="border:2px solid #000;border-radius:6px;padding:5px 0;text-align:center;font-size:17px;font-weight:800;letter-spacing:2px;margin-bottom:6px;">${escapeHtmlForPrint(_ticketStation.toUpperCase())}</div>`
    : '';

  return wrapPrintHTML(`Additional Items - ${orderData.orderNumber || ''}`, `
    ${stationBoxHtml}
    <div class="group-label">ADDITIONAL ORDER</div>
    ${metaHtml}
    <div class="divider"></div>
    <div style="font-size:14px;font-weight:700;text-align:left;margin:4px 0;">ADDED ITEMS</div>
    <div class="items">${itemsHtml}</div>
    <div class="divider"></div>
    <div class="footer" style="font-weight:600;">ADDED TO EXISTING ORDER</div>
  `);
}

/**
 * Print HTML content via browser print dialog (for PC)
 *
 * 버그 이력 (2026-04-10):
 *   기존 코드는 iframe.onload 핸들러에서 print() 호출 → onload가 두 번 트리거되어
 *   ("about:blank" 로드 + doc.write 로드) print 다이얼로그가 2번 뜸.
 *   사용자가 첫 번째 다이얼로그를 취소하면 두 번째가 즉시 표시되어
 *   "취소해도 또 뜬다" 증상 발생.
 *
 * 해결: onload 핸들러 사용하지 않고 doc.close() 직후 setTimeout으로만 print 호출.
 *      hasPrinted flag로 이중 호출 보장.
 */
export function printHTMLContent(htmlContent, title) {
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  // onload 사용 금지 — 이중 트리거 원인. doc.close() 후 직접 호출 방식 사용.

  document.body.appendChild(iframe);

  // doc.write로 콘텐츠 주입
  const iframeDoc = iframe.contentWindow || iframe.contentDocument;
  const doc = iframeDoc.document || iframeDoc;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  let hasPrinted = false;
  const triggerPrint = () => {
    if (hasPrinted) return;
    hasPrinted = true;
    try {
      iframe.contentWindow.focus(); // 일부 브라우저에서 다이얼로그 포커스 보장
      iframe.contentWindow.print();
    } catch (e) {
      console.error('Print failed:', e);
    }
    // 인쇄 다이얼로그 닫힌 후 iframe 정리
    setTimeout(() => {
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    }, 2000);
  };

  // doc.close() 후 약간의 지연 — 콘텐츠 렌더링 + 이미지 로드 여유
  setTimeout(triggerPrint, 300);

  return true;
}

// ============================================
// RawBT Integration
// ============================================

/**
 * Get printer settings from localStorage
 * @returns {Object} Printer settings
 */
export function getPrinterSettings() {
  try {
    const savedSettings = localStorage.getItem('printerSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (e) {
    console.error('Failed to load printer settings:', e);
  }
  return {
    billPrinter: { enabled: false, name: '', autoPrint: false },
    kitchenPrinter: { enabled: false, name: '', autoPrint: false, printPerItem: false }
  };
}

/**
 * Print bill via RawBT app using Android Intent
 *
 * @param {Object} orderData - Order data
 * @param {Object} storeInfo - Store info
 * @param {string} [printerName] - Optional printer name (overrides settings)
 * @returns {Promise<boolean>} Success status
 */
export async function printBillViaRawBT(orderData, storeInfo, printerName) {
  // 현금박스는 현금결제일 때만 열린다 (Irene 2026-06-10). 폴러/POS 가 "현금결제 시 현금박스
  // 자동오픈" 설정이 켜져 있으면 마지막 영수증 copy 에 __drawerPulse 를 실어 보내는데, 여기서
  // 주문의 결제수단이 cash 일 때만 통과시킨다 → 카드/온라인/후불(counter) 결제는 박스 안 열림.
  // 단일 chokepoint — 5개 인쇄 호출처 + 아래 모든 인쇄 방식(QZ/ESC-POS/RawBT)을 한 번에 커버.
  if (orderData && orderData.__drawerPulse) {
    const __pmRawDraw = String(orderData.paymentMethod || '').toLowerCase().replace(/[_\s-]/g, '');
    if (__pmRawDraw !== 'cash') orderData = { ...orderData, __drawerPulse: false };
  }
  try {
    // Check if bill printer is enabled
    const settings = getPrinterSettings();
    const __bp = getActiveBillPrinter(); if (!__bp.enabled) {
      console.log('Bill printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // QZ Tray method: route HTML through OS driver for design parity with the
    // browser-print path. Network ESC/POS (raw socket) only for LAN IP printers
    // where pixel/html isn't supported.
    if (shouldUseQZTray('bill')) {
      const address = getActiveBillPrinter().address;
      if (!address) {
        console.warn('QZ Tray: no bill printer address configured');
        return false;
      }
      const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
      if (isLanIP) {
        console.log('🖨️ Bill via QZ Tray (LAN ESC/POS — raw socket, IP printer)');
        return await sendViaQZTray(generateBillContent(orderData, storeInfo), address);
      }
      console.log('🖨️ Bill via QZ Tray (HTML, OS driver — silent, browser-style design)');
      // `drawerPulse` opt-in via orderData — caller passes drawerPulse:true on
      // the LAST receipt copy so the cash drawer opens once (no garbage page).
      return await sendHTMLViaQZTray(generateHTMLBill(orderData, storeInfo), address, { drawerPulse: !!orderData.__drawerPulse });
    }

    // Browser method: open browser print dialog (uses OS default printer)
    if (shouldUseBrowserPrint('bill')) {
      console.log('🖥️ Bill via browser print');
      const htmlContent = generateHTMLBill(orderData, storeInfo);
      return printHTMLContent(htmlContent, 'Bill');
    }

    // Default: Use RawBT (Android thermal printer)
    console.log('📱 Bill via RawBT');

    // Use provided printerName or get from settings
    const targetPrinter = printerName || getActiveBillPrinter().name;

    // Generate ESC/POS content
    const escposContent = generateBillContent(orderData, storeInfo);

    // Convert to Base64 using proper encoding
    // Use unescape + encodeURIComponent for Korean/special characters
    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    // Build Android Intent URL for RawBT
    let intentScheme = '#Intent;scheme=rawbt;';
    // Add printer name if specified (RawBT uses S.s parameter for printer selection)
    if (targetPrinter) {
      intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    }
    const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
    const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

    // Open RawBT app via Intent using hidden iframe
    // This prevents the page from navigating away
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);

    // Remove iframe after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);

    return true;

  } catch (error) {
    console.error('❌ Bill print error:', error);
    const method = getPrinterMethod('bill');
    alert(
      'Failed to print bill.\n\n' +
      (method === 'qztray'
        ? 'Please ensure:\n1. QZ Tray is running on this device\n2. Printer IP address is correct\n3. Printer is connected to the network'
        : method === 'browser'
        ? 'Please check your browser popup settings and try again.'
        : 'Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready'
      ) +
      '\n\nError: ' + error.message
    );
    return false;
  }
}

// ============================================
// Kitchen Order Ticket Generation
// ============================================

/**
 * Generate Kitchen Order Ticket (주방용 주문서)
 *
 * @param {Object} orderData - Order information
 * @param {Object} storeInfo - Store information
 * @returns {string} ESC/POS command string
 */
export function generateKitchenTicketContent(orderData, storeInfo) {
  let content = '';

  // 2026-06-05 (Irene): 인라인 스테이션 태그는 통합(카운터) 티켓에서만 표시.
  const _showStations = !!orderData.showItemStations;

  // 취소표 통일 (2026-06-04): 취소표 별도 디자인 폐기 → 이 생성기를 재사용하고 noticeHeader
  // (CANCELLED 배너) + voided 플래그만 추가. voided 면 품목을 reverse-video(흰글자/검정바탕)
  // 로 "취소 줄" 강조 + 하단 STOP 푸터. voided 가 false(평소)면 출력 100% 불변.
  const _void = !!orderData.voided;

  // Initialize printer
  content += CMD.INIT;

  // === STATION NAME BOX (모든 주방 티켓 상단 — Irene 2026-06-02) ===
  // station-routed 티켓은 items 가 같은 stationName 을 가짐 → 거기서 도출.
  // 미설정(단일 주방)이면 박스 생략. raw thermal 이라 dashed line 으로 박스 표현.
  {
    // 통합(카운터 미러) 티켓은 상단 station 박스 생략 — 아이템별 인라인 태그로 확인.
    const _ts = orderData.noStationBox ? '' : ((orderData.stationName
      || (orderData.items || []).map(i => i && i.stationName).find(Boolean)
      || '').toString().trim());
    if (_ts) {
      content += CMD.ALIGN_CENTER;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.TEXT_DOUBLE + CMD.BOLD_ON;
      content += _ts.toUpperCase() + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL + CMD.BOLD_OFF;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.ALIGN_LEFT;
    }
  }

  // === NOTICE HEADER (table-move reissue 등) — orderData.noticeHeader 설정 시에만.
  // 일반 발행은 미설정이라 출력 100% 동일(영향 0). 방식 무변경, 콘텐츠 신규 필드만.
  // docs/TABLE_MOVE_AND_VOID_TICKET.md § 설계 2-A 단일 진실. ===
  if (orderData.noticeHeader) {
    const _nh = orderData.noticeHeader;
    const _nhTitle = typeof _nh === 'string' ? _nh : (_nh.title || '');
    const _nhLines = (_nh && typeof _nh === 'object' && Array.isArray(_nh.lines)) ? _nh.lines : [];
    content += CMD.ALIGN_CENTER;
    content += CMD.REVERSE_ON + CMD.TEXT_DOUBLE + CMD.BOLD_ON;
    content += ' ' + _nhTitle + ' ' + CMD.LINE_FEED;
    content += CMD.REVERSE_OFF + CMD.TEXT_NORMAL + CMD.BOLD_OFF;
    _nhLines.forEach(l => { content += String(l) + CMD.LINE_FEED; });
    content += CMD.LINE_FEED;
    content += CMD.ALIGN_LEFT;
  }

  // === GROUP LABEL (for partial order printing) ===
  if (orderData.groupLabel) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** ' + orderData.groupLabel.toUpperCase() + ' **' + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
    content += CMD.LINE_FEED;
  }

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = orderData.date.toLocaleTimeString('en-MY', { timeZone: (storeInfo && storeInfo.timeZone) || undefined,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Order Source (Mobile Order vs POS)
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  content += formatLine('Source:', orderSource) + CMD.LINE_FEED;

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    content += formatLine('Customer:', rawText(orderData.customerName)) + CMD.LINE_FEED;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // === ITEMS (MAIN FOCUS) ===
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += 'ORDER ITEMS:' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  orderData.items.forEach((item, index) => {
    const itemName = rawText(item.menuItem?.name || item.name);
    const qty = item.quantity;

    // Item: Quantity x Name (LARGE & BOLD). 취소표(voided)면 reverse-video 로 "취소 줄" 강조
    // (thermal 은 native line-through 없음 — 기존 취소표와 동일 표현).
    content += CMD.BOLD_ON;
    content += CMD.TEXT_DOUBLE;
    if (_void) content += CMD.REVERSE_ON;
    content += qty + ' x ' + itemName + (_void ? ' ' : '') + CMD.LINE_FEED;
    if (_void) content += CMD.REVERSE_OFF;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;

    // Inline station tag — printed on the next line at normal size so it
    // stays readable on 32-char thermal paper even when item names are long.
    // 2026-06-05 (Irene): 통합(카운터) 티켓에서만 (showItemStations). 스테이션별 티켓은
    // 상단/그룹 라벨에 이미 스테이션이 있어 중복.
    if (_showStations && item.stationName) {
      content += CMD.BOLD_ON;
      content += '  → ' + item.stationName.toUpperCase() + CMD.LINE_FEED;
      content += CMD.BOLD_OFF;
    }

    // 세트 v2 구성품 — 주방이 무엇을 만들지 보이게 (구성품명 + 선택옵션). 방식 무변경, 콘텐츠만.
    // set_components 없으면 레거시 set_items 폴백(테이블이동/구주문 대비).
    const _escComps = (Array.isArray(item.set_components) && item.set_components.length > 0) ? item.set_components
      : (Array.isArray(item.set_items) && item.set_items.length > 0 ? item.set_items : null);
    if (_escComps) {
      _escComps.forEach(c => {
        const cn = rawText((c && c.name) || '');
        if (!cn) return;
        content += CMD.BOLD_ON;
        content += '  > ' + cn + CMD.LINE_FEED;
        content += CMD.BOLD_OFF;
        // 구성품 각자 걸린 주방 (통합 티켓 전용).
        if (_showStations && c.stationName) {
          content += CMD.BOLD_ON;
          content += '    → ' + c.stationName.toUpperCase() + CMD.LINE_FEED;
          content += CMD.BOLD_OFF;
        }
        if (Array.isArray(c.options) && c.options.length > 0) {
          c.options.forEach(o => { content += '    * ' + rawText(o) + CMD.LINE_FEED; });
        }
      });
    }

    // Options with marker — 세트 자체 옵션(A). 구성품(B)은 위 set_components 가 표기, A 는 여기서 (별개).
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        content += '  ★ ' + rawText(option) + CMD.LINE_FEED;
      });
    }

    // Per-item special request (2026-05-31 Irene) — kitchen must see "no onions" /
    // "change rice to noodles" etc. Bold so the cook doesn't miss it.
    const _si = item.special_instructions || item.specialInstructions || '';
    if (_si && String(_si).trim()) {
      content += CMD.BOLD_ON;
      content += '  ** ' + rawText(_si) + CMD.LINE_FEED;
      content += CMD.BOLD_OFF;
    }

    // Spacing between items
    if (index < orderData.items.length - 1) {
      content += CMD.LINE_FEED;
    }
  });

  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === STOP PREPARATION 푸터 (취소표 voided 일 때만) ===
  if (_void) {
    content += CMD.ALIGN_CENTER + CMD.BOLD_ON + CMD.TEXT_DOUBLE_HEIGHT;
    content += (orderData.cancelFooter || '>> STOP PREPARATION <<') + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL + CMD.BOLD_OFF + CMD.ALIGN_LEFT;
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
  }

  // === SPECIAL NOTES ===
  if (orderData.notes && orderData.notes.trim()) {
    content += CMD.LINE_FEED;
    content += CMD.BOLD_ON;
    content += '** SPECIAL NOTES **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += rawText(orderData.notes) + CMD.LINE_FEED;
    content += CMD.LINE_FEED;
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
  }

  // === FOOTER - TABLE/PAGER/PICKUP NUMBER AND ORDER TYPE (at bottom) ===
  content += CMD.LINE_FEED;

  // Skip footer location for group prints (Item View)
  if (orderData.skipFooterLocation) {
    content += CMD.LINE_FEED;
    content += CMD.LINE_FEED;
    content += CMD.CUT;
    return content;
  }

  // TABLE NUMBER (priority) > PAGER NUMBER > PICKUP NUMBER - single line format
  if (orderData.tableNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'TABLE  ' + orderData.tableNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else if (orderData.pagerNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PAGER  ' + orderData.pagerNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else if (orderData.orderType === 'dine-in' || orderData.orderType === 'dine_in') {
    // 2026-05-31 (Irene): a dine-in order with no table must NOT print "PICKUP".
    // Show "DINE-IN (NO TABLE)" so kitchen/counter knows it's dine-in to be located,
    // not a pickup. Real fix = require a table (Settings → Table Number Required).
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'DINE-IN (NO TABLE)' + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else {
    // PICKUP NUMBER - single line format (same as TABLE/PAGER)
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    content += 'PICKUP  ' + pickupNum + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  }

  content += CMD.LINE_FEED;

  // ORDER TYPE (PICKUP/TAKEAWAY/DELIVERY) at very bottom
  if (orderData.orderType === 'pickup') {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** PRE-ORDER PICKUP **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;
    content += CMD.ALIGN_CENTER;
    content += CMD.BOLD_ON;
    content += 'Pickup: ' + (orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP') + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
  } else if (orderData.orderType === 'takeaway' || orderData.takeawayCharge > 0) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** TAKEAWAY **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;
  } else if (orderData.orderType === 'delivery') {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** DELIVERY **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;

    // Delivery info section
    if (orderData.deliveryInfo) {
      content += CMD.LINE_FEED;
      content += CMD.ALIGN_LEFT;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.BOLD_ON;
      content += 'DELIVERY ADDRESS:' + CMD.LINE_FEED;
      content += CMD.BOLD_OFF;
      if (orderData.deliveryInfo.address) {
        content += orderData.deliveryInfo.address + CMD.LINE_FEED;
      }
      if (orderData.deliveryInfo.phone) {
        content += 'Phone: ' + orderData.deliveryInfo.phone + CMD.LINE_FEED;
      }
      if (orderData.deliveryInfo.zoneName) {
        content += 'Zone: ' + orderData.deliveryInfo.zoneName + CMD.LINE_FEED;
      }
      if (orderData.deliveryInfo.notes) {
        content += 'Notes: ' + orderData.deliveryInfo.notes + CMD.LINE_FEED;
      }
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
    }
  }

  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

/**
 * Generate Single Item Kitchen Ticket Content (per-item print mode)
 *
 * @param {Object} orderData - Order information
 * @param {Object} item - Single item to print
 * @param {number} itemIndex - Current item index (1-based)
 * @param {number} totalItems - Total number of items in order
 * @param {Object} storeInfo - Store information
 * @returns {string} ESC/POS command string
 */
export function generateSingleItemKitchenTicket(orderData, item, itemIndex, totalItems, storeInfo) {
  let content = '';

  // Initialize printer
  content += CMD.INIT;

  // === STATION NAME BOX (모든 주방 티켓 상단 — Irene 2026-06-02) ===
  {
    const _ts = ((item && item.stationName) || orderData.stationName || '').toString().trim();
    if (_ts) {
      content += CMD.ALIGN_CENTER;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.TEXT_DOUBLE + CMD.BOLD_ON;
      content += _ts.toUpperCase() + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL + CMD.BOLD_OFF;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.ALIGN_LEFT;
    }
  }

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = orderData.date.toLocaleTimeString('en-MY', { timeZone: (storeInfo && storeInfo.timeZone) || undefined,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Order Source (Mobile Order vs POS)
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  content += formatLine('Source:', orderSource) + CMD.LINE_FEED;

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    content += formatLine('Customer:', rawText(orderData.customerName)) + CMD.LINE_FEED;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === ITEM NUMBER INDICATOR ===
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += CMD.BOLD_ON;
  content += `** ITEM ${itemIndex} of ${totalItems} **` + CMD.LINE_FEED;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === SINGLE ITEM (LARGE) ===
  content += CMD.ALIGN_LEFT;
  const itemName = rawText(item.menuItem?.name || item.name);
  const qty = item.quantity;

  // Item: Quantity x Name (LARGE & BOLD)
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE;
  content += qty + ' x ' + itemName + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;

  // Options with marker
  if (item.options && item.options.length > 0) {
    item.options.forEach(option => {
      content += '  * ' + rawText(option) + CMD.LINE_FEED;
    });
  }

  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === SPECIAL NOTES (only on first item or if item has specific note) ===
  if (itemIndex === 1 && orderData.notes && orderData.notes.trim()) {
    content += CMD.LINE_FEED;
    content += CMD.BOLD_ON;
    content += '** SPECIAL NOTES **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += rawText(orderData.notes) + CMD.LINE_FEED;
    content += CMD.LINE_FEED;
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
  }

  // === FOOTER - TABLE/PAGER/PICKUP NUMBER ===
  content += CMD.LINE_FEED;

  if (orderData.tableNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'TABLE  ' + orderData.tableNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else if (orderData.pagerNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PAGER #' + orderData.pagerNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else if (orderData.pickupNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PICKUP #' + orderData.pickupNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  }

  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

/**
 * Generate HTML with all items as separate pages (for browser print per-item mode)
 * Each item gets its own page with page-break
 */
function generateHTMLMultiPageKitchenTickets(orderData, storeInfo) {
  const timeStr = orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: (storeInfo && storeInfo.timeZone) || undefined });
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  const totalItems = orderData.items.length;

  // Order-type banner per page
  let bannerHtml = '';
  if (orderData.orderType === 'pickup') {
    const pickupTime = orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP';
    bannerHtml = `<div class="banner banner-strong">PRE-ORDER PICKUP</div>
      <div style="font-weight:600;">Pickup: ${escapeHtmlForPrint(pickupTime)}</div>`;
  } else if (orderData.orderType === 'takeaway' || (orderData.takeawayCharge && orderData.takeawayCharge > 0)) {
    bannerHtml = `<div class="banner">TAKEAWAY</div>`;
  } else if (orderData.orderType === 'delivery') {
    bannerHtml = `<div class="banner">DELIVERY</div>`;
  }

  // Pickup/table/pager identifier per page
  let pickupHtml = '';
  if (orderData.tableNumber) {
    pickupHtml = `<div class="big-number">TABLE ${escapeHtmlForPrint(orderData.tableNumber)}</div>`;
  } else if (orderData.pagerNumber) {
    pickupHtml = `<div class="big-number">PAGER ${escapeHtmlForPrint(orderData.pagerNumber)}</div>`;
  } else if (orderData.orderType === 'dine-in' || orderData.orderType === 'dine_in') {
    // 2026-05-31 (Irene): dine-in with no table must NOT print "PICKUP". No-table-number
    // stores → this is the normal label. Table-number stores → require a table instead.
    pickupHtml = `<div class="big-number">DINE-IN</div>`;
  } else {
    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    pickupHtml = `<div class="big-number">PICKUP ${escapeHtmlForPrint(pickupNum)}</div>`;
  }

  const metaHtml = `
    <div class="meta">
      <div class="meta-row"><span class="meta-label">Order</span><span>${escapeHtmlForPrint(orderData.orderNumber)}</span></div>
      <div class="meta-row"><span class="meta-label">Time</span><span>${timeStr}</span></div>
      <div class="meta-row"><span class="meta-label">Source</span><span>${orderSource}</span></div>
      ${orderData.customerName && orderData.customerName !== 'Walk-in Customer'
        ? `<div class="meta-row"><span class="meta-label">Customer</span><span>${escapeHtmlForPrint(orderData.customerName)}</span></div>`
        : ''}
    </div>
  `;

  const pagesHtml = orderData.items.map((item, index) => {
    const itemIndex = index + 1;
    const itemName = escapeHtmlForPrint(item.menuItem?.name || item.name);
    const qty = item.quantity;
    const stationTagHtml = (orderData.showItemStations && item.stationName)
      ? ` <span class="station-tag">${escapeHtmlForPrint(item.stationName.toUpperCase())}</span>`
      : '';
    const _pageStation = (item.stationName || orderData.stationName || '').toString().trim();
    const stationBoxHtml = _pageStation
      ? `<div style="border:2px solid #000;border-radius:6px;padding:5px 0;text-align:center;font-size:17px;font-weight:800;letter-spacing:2px;margin-bottom:6px;">${escapeHtmlForPrint(_pageStation.toUpperCase())}</div>`
      : '';
    const optionsHtml = (item.options || []).map(opt =>
      `<div class="item-option" style="font-size:13px;font-weight:600;">★ ${escapeHtmlForPrint(typeof opt === 'string' ? opt : (opt?.name || ''))}</div>`
    ).join('');
    const isLastPage = itemIndex === totalItems;
    const notesHtml = (itemIndex === 1 && orderData.notes && orderData.notes.trim()) ? `
      <div class="divider"></div>
      <div style="font-weight:700;text-align:left;">SPECIAL NOTES</div>
      <div style="font-size:13px;text-align:left;">${escapeHtmlForPrint(orderData.notes)}</div>
    ` : '';
    return `
      <div class="ticket-page${isLastPage ? '' : ' page-break'}">
        ${stationBoxHtml}
        ${metaHtml}
        <div class="divider"></div>
        <div class="group-label">ITEM ${itemIndex} of ${totalItems}</div>
        <div class="item">
          <div class="item-name" style="font-size:20px;font-weight:700;">${qty} × ${itemName}${stationTagHtml}</div>
          ${optionsHtml}
        </div>
        ${notesHtml}
        <div class="divider"></div>
        ${pickupHtml}
        ${bannerHtml}
      </div>
    `;
  }).join('');

  return wrapPrintHTML(`Kitchen Tickets - ${orderData.orderNumber || ''}`, pagesHtml);
}

/**
 * Print Kitchen Order Ticket via RawBT
 *
 * @param {Object} orderData - Order data
 * @param {Object} storeInfo - Store info
 * @param {string} [printerName] - Optional printer name (overrides settings)
 * @returns {Promise<boolean>} Success status
 */
export async function printKitchenTicketViaRawBT(orderData, storeInfo, printerName) {
  try {
    const settings = getPrinterSettings();
    console.log(`🖨️ printKitchenTicketViaRawBT: ${(orderData.items || []).length} items, printerMode=${getPrinterMode()}`);

    // 2026-05-27: Emergency Routing Mode — when ON, every kitchen ticket goes
    // to the cashier (bill) printer instead of the station-mapped printers.
    // Original routing data is untouched; turning the mode OFF restores normal
    // flow with no manual reconfiguration. Single-shop survival mode for
    // kitchen-printer / LAN / internet outages.
    if (settings.emergencyMode) {
      try {
        console.log('⚠️ EMERGENCY MODE: routing kitchen ticket to cashier (bill) printer');
        return await printBillViaRawBT(orderData, storeInfo);
      } catch (e) {
        console.error('Emergency mode redirect failed:', e && e.message);
        return false;
      }
    }

    // Mirror to counter — print the UNIFIED kitchen ticket (all items, no
    // station split) on the bill printer so counter staff sees the whole
    // order at a glance. Was previously calling printBillViaRawBT() which
    // produced the customer-facing receipt format — wrong UX. Must use the
    // kitchen ticket HTML so the counter copy looks like the kitchen copy.
    // Runs FIRST so station routing's `return` below doesn't block it.
    // 2026-06-09: the unified order ticket can now target a CONFIGURABLE printer —
    // Settings → "Consolidated Order Ticket" (e.g. a kitchen MAIN printer) — instead
    // of only the bill printer. When that feature is enabled it takes precedence and
    // the bill mirror is NOT also sent (one unified ticket, no duplicate). Otherwise
    // the legacy mirrorToBillPrinter → bill printer behaviour is unchanged. The
    // ticket itself is identical to the proven counter mirror; only the target
    // address changes. Fires for every kitchen path (new order + cancel/move
    // reprints), so the consolidated copy always matches the station tickets.
    // 2026-06-09 (Irene "POS별 통합티켓"): the consolidated/counter ticket mirrors the
    // whole order to ONE-OR-MORE POS (counter) printers. Each workstation carries a
    // `consolidatedTicket` toggle; when ON we send the unified ticket to THAT POS's
    // already-configured billPrinter (a real, tested printer) — so adding a 2nd POS just
    // adds a 2nd toggle (1 POS = 1 ticket). This replaces the old single free-typed
    // consolidatedOrderTicket.address (the "MASTER" typo that silently failed). Legacy
    // consolidatedOrderTicket.{enabled,address} and kitchenPrinter.mirrorToBillPrinter are
    // kept as fallbacks so shops configured the old way keep working. Dedup by address so
    // the same physical printer never gets two consolidated copies.
    // 2026-06-11 (Irene, The Fire 매장): 통합/카운터 오더티켓 대상·발행을 단일 헬퍼로 통일.
    //  ① 워크스테이션 "Print full order ticket here" 토글을 한 곳이라도 채택한 매장은
    //     레거시 폴백(mirrorToBillPrinter / consolidatedOrderTicket)을 무시 → 토글 안 한 Main POS
    //     로 통합티켓이 새던 오발행 차단(UI에서 제거된 옛 mirrorToBillPrinter 잔류값 때문이었음).
    //  ② 통합티켓 상단 라벨 = 해당 워크스테이션 이름(예: Main POS / POS 2). "COUNTER" 하드코딩 폐기.
    //  새 주문·취소가 동일한 sendUnifiedTickets 규칙을 공유(아래 정의). 스테이션 라우팅/주방 발행 무접촉.
    sendUnifiedTickets(orderData, storeInfo, settings, { voided: false });

    // 2026-05-27: Station routing — if the shop configured kitchenStationPrinters,
    // bucket items by station and send each station its own ticket. Without this
    // branch, auto-print on payment ignored station printers entirely (only the
    // legacy global kitchenPrinter.address received tickets), so shops that
    // moved to station printers saw nothing print after payment even though
    // the "Test print" button worked.
    const stationPrinters = settings.kitchenStationPrinters;
    const hasStationPrinters = stationPrinters && Object.keys(stationPrinters).length > 0;
    if (hasStationPrinters && !printerName) {
      return await printKitchenTicketsByStation(orderData, storeInfo, settings);
    }

    // kitchenPrinter.enabled 체크 — Station 유무 관계없이 동일
    if (!settings.kitchenPrinter.enabled) {
      console.log('Kitchen printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // QZ Tray method: HTML via OS driver for design parity (network ESC/POS for LAN IP only).
    if (shouldUseQZTray('kitchen')) {
      const address = settings.kitchenPrinter.address;
      if (!address) {
        console.warn('QZ Tray: no kitchen printer address configured');
        return false;
      }
      const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
      const printPerItem = settings.kitchenPrinter.printPerItem || false;
      if (printPerItem && orderData.items && orderData.items.length > 0) {
        for (let i = 0; i < orderData.items.length; i++) {
          const item = orderData.items[i];
          if (isLanIP) {
            await sendViaQZTray(generateSingleItemKitchenTicket(orderData, item, i + 1, orderData.items.length, storeInfo), address);
          } else {
            await sendHTMLViaQZTray(generateHTMLKitchenTicket({ ...orderData, items: [item] }, storeInfo), address);
          }
          if (i < orderData.items.length - 1) await new Promise(resolve => setTimeout(resolve, 300));
        }
        return true;
      }
      if (isLanIP) {
        console.log('🖨️ Kitchen via QZ Tray (LAN ESC/POS — raw socket)');
        return await sendViaQZTray(generateKitchenTicketContent(orderData, storeInfo), address);
      }
      console.log('🖨️ Kitchen via QZ Tray (HTML, OS driver)');
      return await sendHTMLViaQZTray(generateHTMLKitchenTicket(orderData, storeInfo), address);
    }

    // Use provided printerName or get from settings
    const targetPrinter = printerName || settings.kitchenPrinter.name;

    // Check if per-item printing is enabled
    const printPerItem = settings.kitchenPrinter.printPerItem || false;

    if (printPerItem && orderData.items && orderData.items.length > 0) {
      // Print separate ticket for each item
      console.log(`📋 Printing ${orderData.items.length} separate kitchen tickets (per-item mode)`);

      if (shouldUseBrowserPrint('kitchen')) {
        // Browser print mode: Generate all items as pages in one document
        console.log('🖥️ Kitchen via browser print (multi-page)');
        const htmlContent = generateHTMLMultiPageKitchenTickets(orderData, storeInfo);
        return printHTMLContent(htmlContent, `Kitchen Tickets - ${orderData.orderNumber}`);
      }

      // RawBT mode: Print each item separately with delay
      for (let i = 0; i < orderData.items.length; i++) {
        const item = orderData.items[i];
        const itemIndex = i + 1;
        const totalItems = orderData.items.length;

        const escposContent = generateSingleItemKitchenTicket(orderData, item, itemIndex, totalItems, storeInfo);
        const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

        let intentScheme = '#Intent;scheme=rawbt;';
        if (targetPrinter) {
          intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
        }
        const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
        const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = intentUrl;
        document.body.appendChild(iframe);

        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 500);

        // Delay between prints to prevent printer overload
        if (i < orderData.items.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }

      return true;
    }

    // Default: Print combined ticket (original behavior)
    if (shouldUseBrowserPrint('kitchen')) {
      console.log('🖥️ Kitchen via browser print');
      const htmlContent = generateHTMLKitchenTicket(orderData, storeInfo);
      return printHTMLContent(htmlContent, 'Kitchen Ticket');
    }

    // Fallback: RawBT Intent
    console.log('📱 Kitchen via RawBT');

    const escposContent = generateKitchenTicketContent(orderData, storeInfo);
    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    let intentScheme = '#Intent;scheme=rawbt;';
    // Add printer name if specified
    if (targetPrinter) {
      intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    }
    const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
    const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);

    return true;

  } catch (error) {
    console.error('❌ Kitchen Ticket print error:', error);
    const method = getPrinterMethod('kitchen');
    alert(
      'Failed to print kitchen order ticket.\n\n' +
      (method === 'qztray'
        ? 'Please ensure:\n1. QZ Tray is running on this device\n2. Printer IP address is correct\n3. Printer is connected to the network'
        : method === 'browser'
        ? 'Please check your browser popup settings and try again.'
        : 'Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready'
      ) +
      '\n\nError: ' + error.message
    );
    return false;
  }
}

// ============================================
// Order Ticket to Bill Printer
// ============================================

/**
 * Print a kitchen-style order ticket to the BILL printer (the one next to the POS).
 *
 * Used when staff manually triggers a ticket print from Live Orders / Floor Plan /
 * Order Detail Modal. UX principle: the printout should come out where the user
 * is standing (POS counter), not in the kitchen — Kitchen Display has its own
 * path that routes to station printers.
 *
 * Ticket content uses the kitchen format (cooking-focused, no prices), but the
 * transport (browser / QZ Tray / RawBT) follows the BILL printer's configured method.
 *
 * @param {Object} orderData
 * @param {Object} storeInfo
 * @returns {Promise<boolean>}
 */
export async function printOrderTicketToBillPrinter(orderData, storeInfo) {
  try {
    const settings = getPrinterSettings();
    const __bp = getActiveBillPrinter(); if (!__bp?.enabled) {
      console.log('Bill printer disabled — cannot print order ticket');
      return false;
    }
    const method = getPrinterMethod('bill');
    console.log(`🧾 Order ticket → bill printer (method=${method})`);

    // Tag the ticket with where it was printed AND which kitchen station each item
    // belongs to. This lets POS staff (who triggered the print) see at a glance
    // which station each item goes to, even though the receipt came out at the counter.
    const tagged = tagTicketWithStations(orderData, 'POS COUNTER', settings);

    // Browser: open print dialog with the kitchen-style HTML
    if (method === 'browser') {
      const html = generateHTMLKitchenTicket(tagged, storeInfo);
      return printHTMLContent(html, `Order Ticket - ${tagged.orderNumber || ''}`);
    }

    // QZ Tray: unify with the AUTO-PRINT path (printKitchenTicketViaRawBT) so the
    // manual "Print Kitchen Ticket" from Live Orders prints identically.
    // 2026-05-31 (Irene): manual ticket printed 한글 깨짐 because this branch always
    // sent RAW ESC/POS, while auto-print uses HTML pixel via the OS driver (Korean OK).
    // Now: HTML pixel for OS-driver printers, raw ESC/POS ONLY for LAN IP printers.
    if (method === 'qztray') {
      const address = getActiveBillPrinter().address;
      if (!address) {
        console.warn('QZ Tray: bill printer address not configured');
        return false;
      }
      const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
      if (isLanIP) {
        return await sendViaQZTray(generateKitchenTicketContent(tagged, storeInfo), address);
      }
      return await sendHTMLViaQZTray(generateHTMLKitchenTicket(tagged, storeInfo), address);
    }

    // RawBT (Android): fire intent with the bill printer name
    const targetPrinter = getActiveBillPrinter().name;
    const escpos = generateKitchenTicketContent(tagged, storeInfo);
    const base64 = btoa(unescape(encodeURIComponent(escpos)));
    let intentScheme = '#Intent;scheme=rawbt;';
    if (targetPrinter) intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    const intentUrl = 'intent:base64,' + base64 + intentScheme + 'package=ru.a402d.rawbtprinter;end;';
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);
    setTimeout(() => document.body.removeChild(iframe), 1000);
    return true;
  } catch (error) {
    console.error('❌ Order ticket print error:', error);
    return false;
  }
}

/**
 * Attach each item's target kitchen station name (resolved via the menu→station
 * map saved by Kitchen Display). Inline [STATION] tag shows next to each item.
 *
 * @param {Object} orderData
 * @param {string} printedAtLabel - e.g. 'POS COUNTER' / 'KQ1' / 'KITCHEN' (kept for backwards-compat; no longer printed as banner)
 * @param {Object} settings - getPrinterSettings() result (for station name lookup)
 * @returns {Object} new orderData with items[].stationName
 */
export function tagTicketWithStations(orderData, printedAtLabel, settings) {
  let menuStationMap = {};
  try {
    const saved = localStorage.getItem('kitchenStationMenuMap');
    if (saved) menuStationMap = JSON.parse(saved);
  } catch (e) {
    console.warn('Failed to load kitchen station menu map:', e);
  }
  // KDS caches a fresh KitchenStation list in localStorage as id→name so any
  // page can resolve a station name without depending on the printer_settings
  // entry having been seeded yet (handles the brief window between Settings
  // auto-seed and other devices reloading printer_settings from DB).
  let kdsStationNameById = {};
  try {
    const saved = localStorage.getItem('kitchenStationsById');
    if (saved) kdsStationNameById = JSON.parse(saved);
  } catch (e) { /* non-fatal */ }
  const stationPrinters = settings?.kitchenStationPrinters || {};
  // station id → 표시 이름 (아이템 + 세트 구성품 공용 single source).
  const resolveStationName = (sid) => {
    if (!sid) return null;
    return kdsStationNameById[sid] || stationPrinters[sid]?.stationName || `Station #${sid}`;
  };
  const items = (orderData.items || []).map(item => {
    // 세트 구성품도 각자 걸린 주방으로 태깅 — 통합(카운터) 티켓에서 구성품별 스테이션 표시.
    // (구성품 station = 백엔드 stationEnrichment 가 set_components[].kitchen_station_id 로 부여)
    let next = item;
    if (Array.isArray(item.set_components) && item.set_components.length > 0) {
      const taggedComps = item.set_components.map(c => {
        if (!c || c.stationName) return c;
        const csid = c.kitchen_station_id || (c.name ? menuStationMap[c.name] : null);
        const cName = resolveStationName(csid);
        return cName ? { ...c, stationName: cName } : c;
      });
      next = { ...item, set_components: taggedComps };
    }
    // 1) Backend-enriched item.stationName (polling endpoint) — single source.
    //    localStorage 의존 X. 매장 device 캐시 무관하게 항상 정확.
    if (next.stationName) return next;
    // 2) Fallback chain: kitchen_station_id → KDS DB cache → printer_settings → station id label.
    const itemName = next.menuItem?.name || next.name;
    const stationId = next.kitchen_station_id || menuStationMap[itemName];
    if (!stationId) return next;
    const stationName = resolveStationName(stationId);
    return { ...next, stationName };
  });
  return { ...orderData, items, printedAt: printedAtLabel };
}

// ============================================
// Additional Items Kitchen Ticket
// ============================================

/**
 * Generate Additional Items Kitchen Ticket (추가 주문 티켓)
 * Only prints items that have been added after initial order
 *
 * @param {Object} orderData - Order information with added items
 * @param {Object} storeInfo - Store information
 * @returns {string} ESC/POS command string
 */
export function generateAdditionalItemsTicketContent(orderData, storeInfo) {
  let content = '';

  // Filter only newly added items (items with added_at timestamp)
  const addedItems = orderData.items.filter(item => item.added_at);

  if (addedItems.length === 0) {
    return ''; // No additional items to print
  }

  // Initialize printer
  content += CMD.INIT;

  // === HEADER - ADDITIONAL ORDER ===
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  content += '** ADDITIONAL ORDER **' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = new Date().toLocaleTimeString('en-MY', { timeZone: (storeInfo && storeInfo.timeZone) || undefined,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Table info
  if (orderData.tableNumber) {
    content += CMD.BOLD_ON;
    content += formatLine('TABLE:', orderData.tableNumber) + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // === ADDED ITEMS ===
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += 'ADDED ITEMS:' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  addedItems.forEach((item, index) => {
    const itemName = rawText(item.menuItem?.name || item.name);
    const qty = item.quantity;

    // Item: Quantity x Name (LARGE & BOLD)
    content += CMD.BOLD_ON;
    content += CMD.TEXT_DOUBLE;
    content += qty + ' x ' + itemName + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;

    // Options with marker
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        content += '  ★ ' + rawText(option) + CMD.LINE_FEED;
      });
    }

    // Spacing between items
    if (index < addedItems.length - 1) {
      content += CMD.LINE_FEED;
    }
  });

  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === FOOTER ===
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += CMD.BOLD_ON;
  content += 'ADDED TO EXISTING ORDER' + CMD.LINE_FEED;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

/**
 * Print Additional Items Kitchen Ticket via RawBT
 *
 * @param {Object} orderData - Order data with added items
 * @param {Object} storeInfo - Store info
 * @param {string} [printerName] - Optional printer name (overrides settings)
 * @returns {Promise<boolean>} Success status
 */
export async function printAdditionalItemsTicketViaRawBT(orderData, storeInfo, printerName) {
  try {
    const settings = getPrinterSettings();

    // Station 프린터가 설정되어 있으면 station별 라우팅으로 처리
    const stationPrinters = settings.kitchenStationPrinters;
    const hasStationPrinters = stationPrinters && Object.keys(stationPrinters).length > 0;

    if (hasStationPrinters && !printerName) {
      return await printKitchenTicketsByStation(orderData, storeInfo, settings);
    }

    // Station이 없을 때만 kitchenPrinter.enabled 체크
    if (!settings.kitchenPrinter.enabled) {
      console.log('Kitchen printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // QZ Tray mode — HTML via OS driver (design parity) for OS printer names,
    // ESC/POS raw socket for LAN IPs.
    if (shouldUseQZTray()) {
      const address = settings.kitchenPrinter.address;
      if (!address) {
        console.warn('QZ Tray: no kitchen printer address configured');
        return false;
      }
      const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
      if (isLanIP) {
        const escposContent = generateAdditionalItemsTicketContent(orderData, storeInfo);
        if (!escposContent) { console.log('No additional items to print'); return true; }
        return await sendViaQZTray(escposContent, address);
      }
      // OS driver path — reuse the kitchen HTML renderer for the new items only.
      const newItems = (orderData.items || []).filter(it => it.is_new_item);
      if (newItems.length === 0) { console.log('No additional items to print'); return true; }
      const htmlContent = generateHTMLAdditionalItemsTicket(orderData, storeInfo);
      if (!htmlContent) { console.log('No additional items to print'); return true; }
      return await sendHTMLViaQZTray(htmlContent, address);
    }

    // PC: Use browser print dialog with HTML
    if (shouldUseBrowserPrint()) {
      console.log('🖥️ PC detected - using browser print dialog for additional items ticket');
      const htmlContent = generateHTMLAdditionalItemsTicket(orderData, storeInfo);
      if (!htmlContent) {
        console.log('No additional items to print');
        return true;
      }
      return printHTMLContent(htmlContent, 'Additional Items Ticket');
    }

    // Mobile/Tablet: Use RawBT Intent
    console.log('📱 Mobile/Tablet detected - using RawBT for additional items ticket');

    // Use provided printerName or get from settings
    const targetPrinter = printerName || settings.kitchenPrinter.name;

    const escposContent = generateAdditionalItemsTicketContent(orderData, storeInfo);

    // If no content (no added items), return success
    if (!escposContent) {
      console.log('No additional items to print');
      return true;
    }

    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    let intentScheme = '#Intent;scheme=rawbt;';
    // Add printer name if specified
    if (targetPrinter) {
      intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    }
    const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
    const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);

    return true;

  } catch (error) {
    console.error('Additional Items Ticket print error:', error);
    const mode = getPrinterMode();
    alert(
      'Failed to print additional items ticket.\n\n' +
      (mode === 'qztray'
        ? 'Please ensure:\n1. QZ Tray is running on this device\n2. Printer IP address is correct\n3. Printer is connected to the network'
        : mode === 'browser'
        ? 'Please check your browser popup settings and try again.'
        : 'Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready'
      ) +
      '\n\nError: ' + error.message
    );
    return false;
  }
}

// ============================================
// Preview Functions (No ESC/POS codes)
// ============================================

/**
 * Generate Kitchen Ticket Preview (for web display - no printer codes)
 *
 * @param {Object} orderData - Order information
 * @param {Object} storeInfo - Store information
 * @returns {string} Plain text preview content
 */
export function generateKitchenTicketPreview(orderData, storeInfo) {
  let lines = [];

  // === ORDER INFO ===
  lines.push('------------------------------------------------');
  lines.push('Order:                          ' + orderData.orderNumber);

  const timeStr = orderData.date.toLocaleTimeString('en-MY', { timeZone: (storeInfo && storeInfo.timeZone) || undefined,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  lines.push('Time:                                ' + timeStr);

  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  lines.push('Source:                              ' + orderSource);

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    lines.push('Customer:                       ' + orderData.customerName);
  }

  lines.push('------------------------------------------------');
  lines.push('');

  // === ITEMS (MAIN FOCUS) ===
  lines.push('ORDER ITEMS:');
  lines.push('');

  orderData.items.forEach((item, index) => {
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    lines.push(qty + ' x ' + itemName);

    // Options with STAR marker (same as Bill format)
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        lines.push('  ★ ' + option);
      });
    }

    if (index < orderData.items.length - 1) {
      lines.push('');
    }
  });

  lines.push('');
  lines.push('------------------------------------------------');

  // === SPECIAL NOTES ===
  if (orderData.notes && orderData.notes.trim()) {
    lines.push('');
    lines.push('** SPECIAL NOTES **');
    lines.push(orderData.notes);
    lines.push('');
    lines.push('------------------------------------------------');
  }

  // === FOOTER - TABLE/PAGER/PICKUP NUMBER AND ORDER TYPE (at bottom) ===
  lines.push('');

  // TABLE NUMBER (priority) > PAGER NUMBER > PICKUP NUMBER - single line format
  if (orderData.tableNumber) {
    lines.push('              TABLE  ' + orderData.tableNumber);
  } else if (orderData.pagerNumber) {
    lines.push('              PAGER  ' + orderData.pagerNumber);
  } else {
    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    lines.push('             PICKUP  ' + pickupNum);
  }

  lines.push('');

  // ORDER TYPE (PICKUP/TAKEAWAY/DELIVERY) at very bottom
  if (orderData.orderType === 'pickup') {
    lines.push('        ** PRE-ORDER PICKUP **');
    lines.push('        Pickup: ' + (orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP'));
  } else if (orderData.orderType === 'takeaway' || orderData.takeawayCharge > 0) {
    lines.push('           ** TAKEAWAY **');
  } else if (orderData.orderType === 'delivery') {
    lines.push('           ** DELIVERY **');
  }

  return lines.join('\n');
}

/**
 * Print Table QR Code to thermal printer
 * @param {string} tableNumber - Table number (e.g., "T001")
 * @param {HTMLCanvasElement} qrCanvas - QR code canvas element
 * @param {string} storeName - Restaurant name
 */
export async function printTableQR(tableNumber, qrCanvas, storeName = 'Restaurant', expiresAt = null, timezone = null, cashless = false) {
  const tzOpt = timezone ? { timeZone: timezone } : {};
  const now = new Date();
  const printedTime = now.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', ...tzOpt });
  const expiryTime = expiresAt ? new Date(expiresAt).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', ...tzOpt }) : '';
  const timeInfo = `<div class="time-info">Printed: ${printedTime}</div>` +
    (expiryTime ? `<div class="time-info">Orders accepted until ${expiryTime}</div>` : '');

  // 2026-05-29: 캐시리스 매장이면 손님이 QR 찍기 전에 바로 보이도록 굵은 박스 표시.
  // 인쇄는 흑백이므로 굵은 글씨 + 테두리로 강조 (영수증 전체가 영어이므로 영어 유지).
  const cashlessHtml = cashless
    ? `<div style="margin:8px auto;padding:5px 10px;border:2px solid #000;border-radius:6px;font-weight:700;font-size:13px;letter-spacing:0.5px;">CASHLESS STORE<br/><span style="font-weight:600;font-size:11px;">Card / e-wallet only — no cash</span></div>`
    : '';
  const cashlessEscpos = cashless
    ? (CMD.BOLD_ON + '** CASHLESS STORE **' + CMD.LINE_FEED + 'Card / e-wallet only - no cash' + CMD.LINE_FEED + CMD.BOLD_OFF + CMD.LINE_FEED)
    : '';

  // Browser-iframe path — works in every browser, no popup blocker, no QZ setup.
  // This is the safe fallback for the OS print dialog whenever the silent QZ/RawBT
  // path is unavailable or fails. We try it FIRST when the user has chosen
  // browser printing, and LAST as the universal fallback.
  const printViaIframe = () => {
    if (!qrCanvas) return false;
    const htmlContent = wrapPrintHTML(`Table ${tableNumber} QR`, `
      <div class="store-name" style="font-size:14px;">${escapeHtmlForPrint(storeName)}</div>
      <div class="big-number">${escapeHtmlForPrint(tableNumber)}</div>
      <div class="qr-container"><img src="${qrCanvas.toDataURL('image/png')}" width="140" height="140" /></div>
      <div class="instruction">Scan to order</div>
      ${cashlessHtml}
      ${timeInfo}
    `);
    return printHTMLContent(htmlContent, 'Table QR');
  };

  // Browser method: HTML page using the shared print stylesheet
  if (shouldUseBrowserPrint('bill') && qrCanvas) {
    return printViaIframe();
  }

  // QZ Tray method: HTML via OS driver (silent, browser-style design). QR image
  // embedded inside the HTML — same path as bill / kitchen for design parity.
  // ESC/POS raw raster path was failing on stores whose thermal printer didn't
  // accept the raster command set (matched the user report: "QR fails, Test OK").
  if (shouldUseQZTray('bill') && qrCanvas) {
    const address = getActiveBillPrinter().address;
    if (!address) {
      console.error('QZ Tray: bill printer address not configured');
      return false;
    }
    const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
    if (isLanIP) {
      // LAN raw socket — keep raster path (no OS driver available).
      try {
        const connected = await connectQZTray();
        if (!connected) return false;
        const [host, port] = address.split(':');
        const config = qz.configs.create(null, { host, port: parseInt(port || '9100', 10), encoding: 'UTF-8' });
        let header = CMD.INIT + CMD.ALIGN_CENTER + CMD.TEXT_DOUBLE + storeName + CMD.LINE_FEED + CMD.TEXT_NORMAL + CMD.LINE_FEED + CMD.BOLD_ON + CMD.TEXT_DOUBLE + tableNumber + CMD.LINE_FEED + CMD.TEXT_NORMAL + CMD.BOLD_OFF + CMD.LINE_FEED;
        let footer = CMD.ALIGN_CENTER + 'Scan to order' + CMD.LINE_FEED + CMD.LINE_FEED + cashlessEscpos + 'Printed: ' + printedTime + CMD.LINE_FEED + (expiryTime ? 'Orders accepted until ' + expiryTime + CMD.LINE_FEED : '') + CMD.LINE_FEED + CMD.LINE_FEED + CMD.CUT_PARTIAL;
        await qz.print(config, [
          { type: 'raw', format: 'base64', data: btoa(unescape(encodeURIComponent(header))) },
          { type: 'raw', format: 'image', data: qrCanvas.toDataURL('image/png'), options: { language: 'ESCPOS', dotDensity: 'double' } },
          { type: 'raw', format: 'base64', data: btoa(unescape(encodeURIComponent(footer))) }
        ]);
        console.log('🧾 Table QR printed via QZ Tray LAN raster');
        return true;
      } catch (err) {
        console.error('QZ Tray QR LAN print failed:', err && err.message);
        return false;
      }
    }
    // OS driver path — HTML with embedded QR image, same wrapPrintHTML design.
    const htmlContent = wrapPrintHTML(`Table ${tableNumber} QR`, `
      <div class="store-name" style="font-size:14px;">${escapeHtmlForPrint(storeName)}</div>
      <div class="big-number">${escapeHtmlForPrint(tableNumber)}</div>
      <div class="qr-container"><img src="${qrCanvas.toDataURL('image/png')}" width="140" height="140" /></div>
      <div class="instruction">Scan to order</div>
      ${cashlessHtml}
      ${timeInfo}
    `);
    console.log('🧾 Table QR via QZ Tray (HTML, OS driver)');
    return await sendHTMLViaQZTray(htmlContent, address);
  }

  // Check if RawBT is available (mobile/tablet)
  const isMobileOrTablet = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ||
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isMobileOrTablet && qrCanvas) {
    // Use RawBT for thermal printer
    try {
      // Build ESC/POS content
      let content = '';
      content += CMD.INIT;
      content += CMD.ALIGN_CENTER;

      // Store name
      content += CMD.TEXT_DOUBLE;
      content += storeName + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL;
      content += CMD.LINE_FEED;

      // Table number header
      content += CMD.BOLD_ON;
      content += CMD.TEXT_DOUBLE;
      content += tableNumber + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL;
      content += CMD.BOLD_OFF;
      content += CMD.LINE_FEED;

      // Note: ESC/POS QR image printing requires specific printer support
      // For now, we'll print text-based info and use browser print for QR
      content += 'Scan to order' + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.LINE_FEED;

      // Instructions
      content += '1. Scan QR code with phone' + CMD.LINE_FEED;
      content += '2. Browse menu & add items' + CMD.LINE_FEED;
      content += '3. Place your order' + CMD.LINE_FEED;
      content += CMD.LINE_FEED;

      if (cashlessEscpos) { content += cashlessEscpos; }

      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.CUT_PARTIAL;

      // Convert to base64 and send via RawBT
      const base64Content = btoa(unescape(encodeURIComponent(content)));
      const rawbtUrl = `rawbt:base64,${base64Content}`;

      console.log('🖨️ Sending Table QR to RawBT thermal printer');
      window.location.href = rawbtUrl;

      return true;
    } catch (error) {
      console.error('Failed to print via RawBT:', error);
      return false;
    }
  } else {
    // Desktop fallback — was window.open (popup-blocker prone). Switched to the
    // hidden-iframe path so the print dialog opens directly with no extra clicks
    // and no "allow pop-ups" guidance ever needed.
    return printViaIframe();
  }
}

/**
 * Print Daily Settlement Report
 * Follows the same printer settings flow as bill/kitchen ticket printing
 *
 * @param {string} htmlContent - Pre-generated HTML content for browser print
 * @param {string} escposContent - Pre-generated ESC/POS content for thermal printer (optional)
 * @returns {boolean} Success status
 */
export async function printSettlementReport(htmlContent, escposContent) {
  try {
    const settings = getPrinterSettings();
    const __bp = getActiveBillPrinter(); if (!__bp.enabled) {
      console.log('Bill printer is disabled in settings');
      return true;
    }

    // QZ Tray mode — bill 인쇄와 동일 경로. OS 이름 프린터(POS-80C 등)는
    // HTML pixel(sendHTMLViaQZTray)로 한글·디자인 정상, LAN IP 만 raw ESC/POS.
    // (이전엔 escposContent=null 이라 이 분기를 건너뛰고 브라우저 print 다이얼로그로
    //  폴백돼 빌과 다르게 출력됐다.)
    if (shouldUseQZTray()) {
      console.log('🖨️ QZ Tray mode - printing settlement report');
      const address = getActiveBillPrinter().address;
      if (address) {
        const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
        if (isLanIP && escposContent) {
          return await sendViaQZTray(escposContent, address);
        }
        return await sendHTMLViaQZTray(htmlContent, address);
      }
      // Fallback to browser print if no address
      return printHTMLContent(htmlContent, 'Daily Settlement');
    }

    // Browser print mode
    if (shouldUseBrowserPrint()) {
      console.log('🖥️ Browser print mode - printing settlement report');
      return printHTMLContent(htmlContent, 'Daily Settlement');
    }

    // RawBT mode - use ESC/POS content if provided
    if (escposContent) {
      console.log('📱 RawBT mode - printing settlement report');
      const base64Content = btoa(unescape(encodeURIComponent(escposContent)));
      const targetPrinter = getActiveBillPrinter().name;

      let intentScheme = '#Intent;scheme=rawbt;';
      if (targetPrinter) {
        intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
      }
      const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
      const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = intentUrl;
      document.body.appendChild(iframe);
      setTimeout(() => { document.body.removeChild(iframe); }, 1000);

      return true;
    }

    // RawBT mode but no ESC/POS content - fallback to browser print
    console.log('📱 RawBT mode but no ESC/POS content - falling back to browser print');
    return printHTMLContent(htmlContent, 'Daily Settlement');
  } catch (error) {
    console.error('❌ Settlement print error:', error);
    return false;
  }
}

/**
 * Send a kitchen ticket to a single printer.
 *
 * Chooses transport (QZ Tray / browser / RawBT) per the resolved scope:
 *   - if stationId is given → station-specific method
 *   - otherwise              → single kitchen printer method
 *
 * @param {Object} orderData
 * @param {Object} storeInfo
 * @param {Object} settings        — getPrinterSettings() result
 * @param {string} printerName     — OS / RawBT printer name (for non-network transport)
 * @param {string|null} stationName — printed as ticket header; null = no header
 * @param {string|null} printerAddress — LAN IP:port or OS printer name (QZ Tray)
 * @param {string|null} stationId  — used to resolve per-station method
 */
async function sendToRawBTPrinter(orderData, storeInfo, settings, printerName, stationName, printerAddress, stationId) {
  // 2026-06-04 (Irene): a station-routed ticket already shows its station as the
  // ** STATION ** group header (groupLabel, set below). The auto-print path enriches
  // each item with stationName too, so the generator ALSO drew the top [ STATION ] box
  // → station name printed TWICE at the top (only on auto-print; table-move/cancel use
  // raw DB items w/o stationName so they showed once). Suppress the redundant top box
  // for station tickets so it matches table-move exactly (one header). Inline per-item
  // tags are unaffected.
  if (stationName) orderData = { ...orderData, noStationBox: true };
  const scope = stationId ? `station:${stationId}` : 'kitchen';
  const method = getPrinterMethod(scope);
  const printPerItem = settings.kitchenPrinter.printPerItem || false;
  const items = orderData.items || [];
  console.log(`🖨️ sendToRawBTPrinter: ${items.length} items, printPerItem=${printPerItem}, station=${stationName}, scope=${scope}, method=${method}`);
  console.log(`🖨️ Item names:`, items.map(i => (i.menuItem?.name || i.name) + ' x' + i.quantity));

  // --- QZ Tray method (HTML via OS driver for design parity, ESC/POS for LAN IP) ---
  if (method === 'qztray') {
    const address = printerAddress || settings.kitchenPrinter.address;
    if (!address) return false;
    const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);

    // 2026-05-29: Kitchen tickets go HTML-pixel for OS-named printers (renders
    // 한글 + the ticket design correctly via the OS driver — raw ESC/POS garbled
    // Korean) and raw ESC/POS only for direct LAN-IP sockets (no OS driver there).
    // This mirrors how the bill printer (POS-80C) prints Korean fine via HTML pixel.
    // 2026-06-04 (Irene): RETURN THE ACTUAL SEND RESULT. Previously this branch
    // swallowed sendHTMLViaQZTray's return value and always returned true — so when
    // a station's QZ job failed (the documented "3rd/last station drop"), the caller
    // loop saw "ok" and never retried or fell back, silently losing that station's
    // ticket. Now a false from QZ propagates → retry + counter fallback + POS banner.
    if (printPerItem && items.length > 0) {
      let allOk = true;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const perItemData = { ...orderData, items: [item], groupLabel: stationName ? stationName.toUpperCase() : undefined, printedAt: stationName ? stationName.toUpperCase() : 'KITCHEN' };
        const r = isLanIP
          ? await sendViaQZTray(generateKitchenTicketContent(perItemData, storeInfo), address)
          : await sendHTMLViaQZTray(generateHTMLKitchenTicket(perItemData, storeInfo), address);
        if (r === false) allOk = false;
        if (i < items.length - 1) await new Promise(r => setTimeout(r, 300));
      }
      return allOk;
    } else {
      const ticketData = { ...orderData, groupLabel: stationName ? stationName.toUpperCase() : undefined, printedAt: stationName ? stationName.toUpperCase() : 'KITCHEN' };
      const r = isLanIP
        ? await sendViaQZTray(generateKitchenTicketContent(ticketData, storeInfo), address)
        : await sendHTMLViaQZTray(generateHTMLKitchenTicket(ticketData, storeInfo), address);
      return r !== false;
    }
  }

  // --- Browser / RawBT method ---
  if (printPerItem && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const perItemData = { ...orderData, items: [item], groupLabel: stationName ? stationName.toUpperCase() : undefined, printedAt: stationName ? stationName.toUpperCase() : 'KITCHEN' };

      if (method === 'browser') {
        const htmlContent = generateHTMLKitchenTicket(perItemData, storeInfo);
        printHTMLContent(htmlContent, `Kitchen - ${stationName || 'Ticket'} - ${item.name}`);
      } else {
        const escposContent = generateKitchenTicketContent(perItemData, storeInfo);
        const base64Content = btoa(unescape(encodeURIComponent(escposContent)));
        let intentScheme = '#Intent;scheme=rawbt;';
        if (printerName) intentScheme += 'S.s=' + encodeURIComponent(printerName) + ';';
        const intentUrl = 'intent:base64,' + base64Content + intentScheme + 'package=ru.a402d.rawbtprinter;end;';
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = intentUrl;
        document.body.appendChild(iframe);
        setTimeout(() => document.body.removeChild(iframe), 500);
      }
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
  } else {
    const ticketData = { ...orderData, groupLabel: stationName ? stationName.toUpperCase() : undefined, printedAt: stationName ? stationName.toUpperCase() : 'KITCHEN' };

    if (method === 'browser') {
      const htmlContent = generateHTMLKitchenTicket(ticketData, storeInfo);
      printHTMLContent(htmlContent, `Kitchen - ${stationName || 'Ticket'}`);
    } else {
      const escposContent = generateKitchenTicketContent(ticketData, storeInfo);
      const base64Content = btoa(unescape(encodeURIComponent(escposContent)));
      let intentScheme = '#Intent;scheme=rawbt;';
      if (printerName) intentScheme += 'S.s=' + encodeURIComponent(printerName) + ';';
      const intentUrl = 'intent:base64,' + base64Content + intentScheme + 'package=ru.a402d.rawbtprinter;end;';
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = intentUrl;
      document.body.appendChild(iframe);
      setTimeout(() => document.body.removeChild(iframe), 500);
    }
  }
  return true;
}

/**
 * Station별 분리 인쇄
 * RawBT 모드: 모든 아이템을 하나의 티켓으로 합쳐서 전송 (RawBT는 연속 intent 처리 불가)
 * Browser 모드: Station별 분리 인쇄 (각 Station 별도 페이지)
 */
// === Station 버킷팅 단일 소스 (kitchen 발행 + 취소표 라우팅 공용) ===
// printKitchenTicketsByStation 의 클로저를 모듈 스코프로 추출. 동작 동일(autoprint regression 안전망).
function _loadKitchenStationMenuMap() {
  try {
    const saved = localStorage.getItem('kitchenStationMenuMap');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load kitchen station menu map:', e);
  }
  return {};
}

function _bucketItemsByStation(items, stationPrinters, menuStationMap) {
  const stationItems = {};
  const unmappedItems = [];
  (items || []).forEach(item => {
    // SET: 구성품을 각자 걸린 주방으로 분배 (걸려있는 메뉴대로). 각 station 티켓엔
    // 그 주방 구성품만 담은 세트 클론을 넣어 → 주방별로 자기 아이템+옵션만 표기.
    // 구성품 station 은 백엔드 stationEnrichment 가 set_components[].kitchen_station_id 로 부여.
    if (Array.isArray(item.set_components) && item.set_components.length > 0) {
      const compByStation = {};
      const unmappedComps = [];
      item.set_components.forEach(c => {
        const cStation = c.kitchen_station_id || (c.name ? menuStationMap[c.name] : null) || null;
        if (cStation && stationPrinters[cStation]) {
          if (!compByStation[cStation]) compByStation[cStation] = [];
          compByStation[cStation].push(c);
        } else {
          unmappedComps.push(c);
        }
      });
      Object.keys(compByStation).forEach(sid => {
        if (!stationItems[sid]) stationItems[sid] = [];
        stationItems[sid].push({ ...item, set_components: compByStation[sid] });
      });
      if (unmappedComps.length > 0) {
        unmappedItems.push({ ...item, set_components: unmappedComps });
      }
      return;
    }
    // 1) Item-level kitchen_station_id (backend now resolves this from Product
    //    or Category for mobile orders; POS already attaches it directly).
    // 2) Fall back to the menu-name → station map (KDS localStorage), so
    //    legacy / un-enriched items still route via the old path.
    let stationId = item.kitchen_station_id || item.menuItem?.kitchen_station_id || null;
    if (!stationId) {
      const itemName = item.menuItem?.name || item.name;
      stationId = menuStationMap[itemName];
    }
    if (stationId && stationPrinters[stationId]) {
      if (!stationItems[stationId]) stationItems[stationId] = [];
      stationItems[stationId].push(item);
    } else {
      unmappedItems.push(item);
    }
  });
  return { stationItems, unmappedItems };
}

async function printKitchenTicketsByStation(orderData, storeInfo, settings) {
  const stationPrinters = settings.kitchenStationPrinters || {};
  const stationIds = Object.keys(stationPrinters);

  // Helpers factored to module scope (단일 소스) so the cancellation path
  // (printCancellationTicketsByStation) buckets items identically. 동작 무변경.
  const loadMenuStationMap = _loadKitchenStationMenuMap;
  const bucketItemsByStation = (menuStationMap) => _bucketItemsByStation(orderData.items, stationPrinters, menuStationMap);

  // Single station: send everything to it
  if (stationIds.length === 1) {
    const stationId = stationIds[0];
    const sp = stationPrinters[stationId];
    const stationName = sp.stationName || 'Kitchen';
    console.log(`🍳 Single station — sending all to: ${sp.name} (${stationName})`);
    return await sendToRawBTPrinter(orderData, storeInfo, settings, sp.name, stationName, sp.address, stationId);
  }

  // Multi-station, QZ Tray: route per-station to different network IPs / OS printers
  // (each station's method is resolved inside sendToRawBTPrinter via stationId).
  // 2026-05-29 (The Fire): gate on the STATIONS' own method, not just the master
  // kitchenPrinter.method. The Fire configured each station as 'qztray' but left
  // the master kitchenPrinter.method empty → getPrinterMode() defaulted to 'rawbt'
  // → this branch was skipped → tickets collapsed to one combined ticket (and only
  // the bill-printer mirror printed). Entering the per-station loop whenever any
  // station is qztray fixes station routing regardless of the master/global mode.
  const _stationsUseQZ = stationIds.some(id => stationPrinters[id] && stationPrinters[id].method === 'qztray');
  if (shouldUseQZTray('kitchen') || _stationsUseQZ) {
    const { stationItems, unmappedItems } = bucketItemsByStation(loadMenuStationMap());

    // No mapping at all: send everything to the first station as ONE ticket.
    if (Object.keys(stationItems).length === 0 && unmappedItems.length > 0) {
      const stationId = stationIds[0];
      const sp = stationPrinters[stationId];
      console.log(`🍳 QZ Tray: no menu-station map — sending all to first station: ${sp.stationName}`);
      return await sendToRawBTPrinter(orderData, storeInfo, settings, sp.name, sp.stationName || 'Kitchen', sp.address, stationId);
    }

    // Merge unmapped items into the FIRST station's ticket so they print on the
    // same job as that station's items (no separate ticket = no race / no drop).
    // 매장 보고 (2026-05-27): mobile 주문 items 가 menu_item_id 없어 unmapped 가 별도
    // ticket 으로 가다가 두 번째 print job 가 driver queue race 로 누락. 같은 ticket
    // 에 합쳐 한 print job 으로 처리.
    const mappedStationIds = Object.keys(stationItems);
    if (unmappedItems.length > 0 && mappedStationIds.length > 0) {
      const firstStationId = mappedStationIds[0];
      stationItems[firstStationId] = [...stationItems[firstStationId], ...unmappedItems];
    }

    // Mapped: send each station its own items (unmapped now in first station).
    // 2026-05-28 final hardening: per-station try/catch with one auto-retry so
    // a single station's print failure (LAN blip / driver queue race / printer
    // offline) never cascades into "all remaining stations skipped". The Fire
    // 매장 보고: 3번째 station drop 반복. 1500ms delay 는 driver queue race 마진,
    // 재시도는 transient 장애 자동 복구. retry 이후에도 실패하면 audit log 만 남기고
    // 다음 station 진행 (한 프린터 문제로 다른 주방 차단 금지).
    const stationResults = [];
    for (let i = 0; i < mappedStationIds.length; i++) {
      const stationId = mappedStationIds[i];
      const sp = stationPrinters[stationId];
      const items = stationItems[stationId];
      const stationName = sp.stationName || `Station ${stationId}`;
      let ok = false;
      let lastErr = null;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          const r = await sendToRawBTPrinter({ ...orderData, items }, storeInfo, settings, sp.name, stationName, sp.address, stationId);
          if (r !== false) { ok = true; break; }
        } catch (e) {
          lastErr = e;
          console.error(`🍳 Station ${stationName} attempt ${attempt} failed:`, e && e.message);
        }
        if (attempt === 1) await new Promise(r => setTimeout(r, 600));
      }
      stationResults.push({ stationId, stationName, ok, error: lastErr && lastErr.message });
      if (!ok) {
        console.error(`🍳 Station ${stationName} ALL attempts failed — moving to next station to avoid cascade.`);
      }
      if (i < mappedStationIds.length - 1) await new Promise(r => setTimeout(r, 800));
    }

    const allOk = stationResults.every(r => r.ok);
    if (!allOk) {
      console.warn('🍳 Station print summary:', stationResults);
      const failedStations = stationResults.filter(r => !r.ok);
      // Safety net (Irene 2026-06-04): a station printer didn't take the job → those
      // items must NOT silently vanish (the "last station drops" complaint). 1) Alert
      // the POS with a banner naming the failed station(s). 2) Unless the counter
      // mirror already carries the whole order, reprint the failed items at the counter
      // so staff can hand-deliver. Never lose a ticket silently.
      try { window.dispatchEvent(new CustomEvent('autoprint-failed', { detail: { scope: 'kitchen-station', stations: failedStations.map(f => f.stationName) } })); } catch (_) {}
      if (!(settings.kitchenPrinter && settings.kitchenPrinter.mirrorToBillPrinter)) {
        try {
          const failedItems = failedStations.flatMap(f => stationItems[f.stationId] || []);
          const bp = getActiveBillPrinter();
          if (failedItems.length > 0 && bp && bp.enabled && bp.address) {
            const fallbackData = { ...orderData, items: failedItems, noStationBox: true,
              noticeHeader: { title: '** STATION PRINT FAILED — DELIVER MANUALLY **', lines: failedStations.map(f => `${f.stationName}: not printed at station`) } };
            await sendToRawBTPrinter(fallbackData, storeInfo, settings, bp.name, 'COUNTER', bp.address, null);
          }
        } catch (e) { console.warn('🍳 Station fallback to counter failed:', e && e.message); }
      }
    }
    return allOk;
  }

  // Multi-station, RawBT: cannot fire multiple intents consecutively → collapse to one combined ticket
  if (!shouldUseBrowserPrint('kitchen')) {
    const stationId = stationIds[0];
    const sp = stationPrinters[stationId];
    console.log(`🍳 RawBT with ${stationIds.length} stations — sending combined ticket to first station`);
    return await sendToRawBTPrinter(orderData, storeInfo, settings, sp.name, null, sp.address, stationId);
  }

  // Multi-station, Browser: separate page per station
  const { stationItems, unmappedItems } = bucketItemsByStation(loadMenuStationMap());

  if (Object.keys(stationItems).length === 0 && unmappedItems.length > 0) {
    const stationId = stationIds[0];
    const sp = stationPrinters[stationId];
    console.log(`🍳 Browser: no menu-station map — sending all to first station: ${sp.name}`);
    return await sendToRawBTPrinter(orderData, storeInfo, settings, sp.name, sp.stationName || 'Kitchen', sp.address, stationId);
  }

  const mappedStationIds = Object.keys(stationItems);
  // Browser flow — merge unmapped into first station's bucket too (same fix as QZ Tray branch).
  if (unmappedItems.length > 0 && mappedStationIds.length > 0) {
    const firstStationId = mappedStationIds[0];
    stationItems[firstStationId] = [...stationItems[firstStationId], ...unmappedItems];
  }
  for (let i = 0; i < mappedStationIds.length; i++) {
    const stationId = mappedStationIds[i];
    const sp = stationPrinters[stationId];
    const items = stationItems[stationId];
    const stationName = sp.stationName || `Station ${stationId}`;
    await sendToRawBTPrinter({ ...orderData, items }, storeInfo, settings, sp.name, stationName, sp.address, stationId);
    if (i < mappedStationIds.length - 1) await new Promise(r => setTimeout(r, 700));
  }

  return true;
}

/**
 * Generate Station-specific Kitchen Ticket ESC/POS content
 * Same as generateKitchenTicketContent but with Station name header + ticket count
 */
// eslint-disable-next-line no-unused-vars
function generateStationKitchenTicket(orderData, storeInfo, stationName, ticketIndex, totalTickets) {
  let content = '';

  content += CMD.INIT;

  // === STATION NAME (Large, Bold, Center) ===
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  content += '[ ' + stationName + ' ]' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = orderData.date
    ? orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: (storeInfo && storeInfo.timeZone) || undefined })
    : new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: (storeInfo && storeInfo.timeZone) || undefined });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Table / Pager / Pickup
  if (orderData.tableNumber) {
    content += formatLine('Table:', orderData.tableNumber) + CMD.LINE_FEED;
  } else if (orderData.pagerNumber) {
    content += formatLine('Pager:', orderData.pagerNumber) + CMD.LINE_FEED;
  }

  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  content += formatLine('Source:', orderSource) + CMD.LINE_FEED;

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // === ITEMS ===
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += 'ORDER ITEMS:' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  orderData.items.forEach(item => {
    const itemName = rawText(item.menuItem?.name || item.name);
    const qty = item.quantity;

    content += CMD.BOLD_ON;
    content += CMD.TEXT_DOUBLE;
    content += qty + ' x ' + itemName + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;

    // 세트 v2 구성품(B) — 주방이 만들 항목 표기 (구성품명 + 선택옵션). 방식 무변경, 콘텐츠만.
    if (Array.isArray(item.set_components) && item.set_components.length > 0) {
      item.set_components.forEach(c => {
        const cn = rawText((c && c.name) || '');
        if (!cn) return;
        const co = (Array.isArray(c.options) && c.options.length) ? ' (' + rawText(c.options.join(', ')) + ')' : '';
        content += '  > ' + cn + co + CMD.LINE_FEED;
      });
    }

    // Options — 세트 자체 옵션(A) 포함 (구성품 B 는 위에서 표기, 별개)
    const options = item.options || [];
    options.forEach(opt => {
      if (!/^.+\sx\d+$/.test(opt)) {
        content += '  > ' + rawText(opt) + CMD.LINE_FEED;
      }
    });

    // Special instructions
    const special = item.special_instructions || item.specialInstructions || '';
    if (special) {
      content += CMD.BOLD_ON;
      content += '  *** ' + rawText(special) + ' ***' + CMD.LINE_FEED;
      content += CMD.BOLD_OFF;
    }

    content += CMD.LINE_FEED;
  });

  // === TICKET COUNT ===
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += 'Ticket ' + ticketIndex + ' of ' + totalTickets + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Cut paper
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.CUT;

  return content;
}

// ============================================
// CANCELLATION TICKET — 주문 취소 시 키친에 인쇄
// ============================================
// ⚠️ DEPRECATED (2026-06-04): 아래 두 함수(generateCancellationTicketContent /
// generateHTMLCancellationTicket)는 별도 취소표 디자인이었으나 폐기됨. 취소표는 이제
// 일반 오더티켓 생성기(generateKitchenTicketContent / generateHTMLKitchenTicket)를
// buildVoidTicketData 로 재사용한다(테이블이동과 동일 모양 + CANCELLED 배너 + voided 줄긋기).
// 호출처 0건. 절대 다시 연결하지 말 것 — 재연결 시 취소표 디자인 분기 재발.

/**
 * @deprecated 2026-06-04 — buildVoidTicketData + generateKitchenTicketContent 로 대체됨. 미사용.
 * Generate ESCPOS for a CANCELLED kitchen ticket.
 */
function generateCancellationTicketContent(orderData, storeInfo, reason) {
  let content = '';
  content += CMD.INIT;

  // station 이름 박스 — 모든 주방 티켓 상단 통일(신규/취소 동일, Irene 2026-06-02).
  // raw thermal 이라 dashed line 으로 박스 표현. orderData.stationLabel 없으면 미표기(하위호환).
  if (orderData.stationLabel) {
    content += CMD.ALIGN_CENTER;
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
    content += CMD.TEXT_DOUBLE + CMD.BOLD_ON;
    content += String(orderData.stationLabel).toUpperCase() + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL + CMD.BOLD_OFF;
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
    content += CMD.LINE_FEED;
  }

  content += CMD.ALIGN_CENTER;
  content += CMD.REVERSE_ON + CMD.TEXT_DOUBLE + CMD.BOLD_ON;
  // cancelTitle override: R9='*** ITEM CANCELLED ***' / R10='*** ORDER CANCELLED ***'.
  // 미설정 시 기존 '*** CANCELLED ***' 유지(하위호환).
  content += ' ' + (orderData.cancelTitle || '*** CANCELLED ***') + ' ';
  content += CMD.LINE_FEED + CMD.LINE_FEED;
  content += CMD.REVERSE_OFF + CMD.TEXT_NORMAL + CMD.BOLD_OFF;

  content += CMD.TEXT_DOUBLE_HEIGHT + CMD.BOLD_ON;
  content += 'Order #' + (orderData.orderNumber || orderData.order_number || '') + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL + CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  content += CMD.ALIGN_LEFT;
  if (orderData.tableNumber || orderData.table_number) {
    content += 'Table: ' + (orderData.tableNumber || orderData.table_number) + CMD.LINE_FEED;
  }
  const orderType = orderData.orderType || orderData.order_type || '';
  if (orderType) content += 'Type:  ' + String(orderType).replace(/_/g, '-') + CMD.LINE_FEED;
  if (reason) content += 'Reason: ' + reason + CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // Items to stop preparing — 줄긋기 emulation: thermal 은 native line-through 없음 →
  // reverse-video(흰글자 검정바탕) 로 "취소된 줄" 을 강하게 표시. (HTML 은 text line-through)
  const items = orderData.items || [];
  items.forEach(it => {
    const qty = (it.quantity != null ? it.quantity : 1);
    const name = rawText(it.name || (it.menuItem && it.menuItem.name) || '');
    content += CMD.REVERSE_ON + ' ' + qty + 'x  ' + name + ' ' + CMD.REVERSE_OFF + CMD.LINE_FEED;
    // 2026-06-03: 세트 구성품(메뉴)도 펼쳐 표시 — 주방이 무엇을 멈춰야 하는지 메뉴별로
    // 보이게(정상 티켓과 동일). 세트명은 위 줄에 있고, 구성품 메뉴명은 들여써서 나열.
    const cComps = (Array.isArray(it.set_components) && it.set_components.length) ? it.set_components
      : ((Array.isArray(it.set_items) && it.set_items.length) ? it.set_items : null);
    if (cComps) {
      cComps.forEach(c => {
        const cn = rawText((c && c.name) || '');
        if (!cn) return;
        const cq = (c.qty != null ? c.qty : (c.quantity != null ? c.quantity : 1));
        content += CMD.REVERSE_ON + '   > ' + cq + 'x ' + cn + ' ' + CMD.REVERSE_OFF + CMD.LINE_FEED;
      });
    }
    if (it.cancelReason) content += '   (' + rawText(it.cancelReason) + ')' + CMD.LINE_FEED;
  });
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  content += CMD.ALIGN_CENTER + CMD.BOLD_ON + CMD.TEXT_DOUBLE_HEIGHT;
  // cancelFooter override: R9='>> DO NOT PREPARE <<' / R10='>> DO NOT PREPARE - ALL CANCELLED <<'.
  content += (orderData.cancelFooter || '>> STOP PREPARATION <<') + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL + CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // Timestamp
  try {
    const tz = (storeInfo && storeInfo.timeZone) || undefined;
    const now = new Date();
    const ts = tz
      ? now.toLocaleString('en-MY', { timeZone: tz, hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
      : now.toLocaleString();
    content += ts + CMD.LINE_FEED;
  } catch (e) { /* silent */ }

  content += CMD.LINE_FEED + CMD.LINE_FEED + CMD.LINE_FEED;
  content += CMD.CUT_PARTIAL;
  return content;
}

/**
 * Generate HTML version of cancellation ticket (browser/QZ Tray HTML mode).
 */
function generateHTMLCancellationTicket(orderData, storeInfo, reason) {
  const items = orderData.items || [];
  const itemsHtml = items.map(it => {
    const qty = (it.quantity != null ? it.quantity : 1);
    const name = escapeHtmlForPrint(it.name || (it.menuItem && it.menuItem.name) || '');
    const stationTagHtml = it.stationName
      ? ` <span class="station-tag">${escapeHtmlForPrint(it.stationName.toUpperCase())}</span>`
      : '';
    // 줄긋기: qty×name 만 line-through (station tag 는 제외해 가독). 사유는 줄 아래.
    const reasonHtml = it.cancelReason
      ? `<div style="font-size:12px;font-weight:600;padding-left:18px;color:#333;">(${escapeHtmlForPrint(String(it.cancelReason))})</div>`
      : '';
    // 2026-06-03: 세트는 세트명 작게(라벨) + 구성품 메뉴명 크게 펼침(정상 티켓과 동일 규칙).
    const cComps = (Array.isArray(it.set_components) && it.set_components.length) ? it.set_components
      : ((Array.isArray(it.set_items) && it.set_items.length) ? it.set_items : null);
    if (cComps) {
      const compHtml = cComps.map(c => {
        const cn = escapeHtmlForPrint((c && c.name) || '');
        if (!cn) return '';
        const cq = (c.qty != null ? c.qty : (c.quantity != null ? c.quantity : 1));
        return `<div class="item-name" style="font-size:16px;font-weight:700;padding-left:14px;"><span style="text-decoration:line-through;">${cq} × ${cn}</span></div>`;
      }).join('');
      return `<div class="item"><div class="item-name" style="font-size:12px;font-weight:600;color:#555;"><span style="text-decoration:line-through;">${qty} × ${name}</span>${stationTagHtml}</div>${compHtml}${reasonHtml}</div>`;
    }
    return `<div class="item"><div class="item-name" style="font-size:16px;font-weight:700;"><span style="text-decoration:line-through;">${qty} × ${name}</span>${stationTagHtml}</div>${reasonHtml}</div>`;
  }).join('');

  const orderType = String(orderData.orderType || orderData.order_type || '').replace(/_/g, '-');
  const tableNum = orderData.tableNumber || orderData.table_number || '';
  const orderNumber = orderData.orderNumber || orderData.order_number || '';

  const metaRows = [];
  if (tableNum) metaRows.push(`<div class="meta-row"><span class="meta-label">Table</span><span><strong>${escapeHtmlForPrint(String(tableNum))}</strong></span></div>`);
  if (orderType) metaRows.push(`<div class="meta-row"><span class="meta-label">Type</span><span>${escapeHtmlForPrint(orderType)}</span></div>`);
  if (reason) metaRows.push(`<div class="meta-row"><span class="meta-label">Reason</span><span>${escapeHtmlForPrint(String(reason))}</span></div>`);

  return wrapPrintHTML(`Cancelled - ${orderNumber}`, `
    ${orderData.stationLabel ? `<div style="border:2px solid #000;border-radius:6px;padding:5px 0;text-align:center;font-size:17px;font-weight:800;letter-spacing:2px;margin-bottom:6px;">${escapeHtmlForPrint(String(orderData.stationLabel).toUpperCase())}</div>` : ''}
    <div class="banner banner-strong" style="background:#000;color:#fff;border-color:#000;">${escapeHtmlForPrint(orderData.cancelTitle || '*** CANCELLED ***')}</div>
    <div class="medium-number">Order #${escapeHtmlForPrint(orderNumber)}</div>
    ${metaRows.length ? `<div class="meta">${metaRows.join('')}</div>` : ''}
    <div class="divider"></div>
    <div class="items">${itemsHtml}</div>
    <div class="divider-solid"></div>
    <div class="banner banner-strong">${escapeHtmlForPrint(orderData.cancelFooter || '>> STOP PREPARATION <<')}</div>
    <div class="footer time-info">${new Date().toLocaleString()}</div>
  `);
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/**
 * 취소표 통일 어댑터 (2026-06-04) — 취소용 orderData 를 "일반 오더티켓 생성기"
 * (generateKitchenTicketContent / generateHTMLKitchenTicket) 가 이해하는 형태로 변환한다.
 * 별도 취소표 디자인(폐기) 대신, 테이블이동에서 검증된 그 오더티켓 모양 + CANCELLED 배너 +
 * voided(품목 줄긋기/STOP) 로 출력 → 주방이 평소 티켓과 즉시 짝맞춤. 라우팅/미러/스테이션
 * 분배 로직은 일절 건드리지 않는다(발행 안정성 유지).
 */
function buildVoidTicketData(orderData, reason) {
  const _lines = [];
  if (reason) _lines.push('Reason: ' + reason);
  const _station = orderData.stationName || orderData.stationLabel || null;
  return {
    ...orderData,
    // 일반 오더티켓 생성기는 items 에 `|| []` 방어가 없다(평소 주문은 항상 items 보유).
    // 취소 경로가 items 없이 호출돼도 크래시하지 않도록 여기서 보장(옛 취소 생성기와 동일 안전).
    items: Array.isArray(orderData.items) ? orderData.items : [],
    date: (orderData.date instanceof Date) ? orderData.date : new Date(),
    voided: true,
    noticeHeader: { title: orderData.cancelTitle || '*** ORDER CANCELLED ***', lines: _lines },
    // 2026-06-05 (Irene): 취소 티켓 스테이션을 테이블이동 티켓과 동일하게 — 상단 박스(stationName)가
    // 아니라 안내문(*** ORDER CANCELLED *** + Reason) 아래의 그룹 라벨(** STATION **)로 표시.
    // groupLabel + noStationBox 로 테이블이동 재발행 티켓과 레이아웃 100% 일치.
    groupLabel: _station || orderData.groupLabel || undefined,
    noStationBox: true,
    stationName: null,
    orderNumber: orderData.orderNumber || orderData.order_number,
    tableNumber: orderData.tableNumber || orderData.table_number,
    orderType: orderData.orderType || orderData.order_type,
  };
}

/**
 * 통합/카운터 오더티켓 대상 계산 (2026-06-11) — 새 주문·취소 공용.
 * 워크스테이션별 "Print full order ticket here"(consolidatedTicket) 토글이 켜진 POS 의
 * 빌프린터로 1장씩(주소+방식 중복 제거). 토글을 한 곳이라도 채택한 매장은 레거시 폴백
 * (mirrorToBillPrinter / consolidatedOrderTicket)을 무시 — 옛 잔류값이 토글 안 한 Main POS 로
 * 통합티켓을 오발행하던 문제 차단. 미채택(레거시) 매장은 기존 폴백 그대로(동작 100% 유지).
 * 각 대상은 워크스테이션 이름(label)을 들고 가, 티켓 상단에 "COUNTER" 대신 POS 이름이 찍힌다.
 */
function computeUnifiedTicketTargets(settings) {
  const targets = [];
  // 2026-06-12 (Irene): stations = 워크스테이션별 통합티켓 범위(주방 스테이션 id 배열).
  // null/빈배열 = 전체 주문(기존과 동일). 같은 프린터라도 범위가 다르면 별도 발행이므로
  // 중복 제거 키에 범위 서명을 포함한다.
  const add = (addr, method, label, stations) => {
    const a = (addr || '').trim();
    const m = method || 'qztray';
    const st = Array.isArray(stations) && stations.length > 0 ? stations.map(Number) : null;
    const sig = st ? st.slice().sort((x, y) => x - y).join(',') : '';
    if (targets.some(t => t.address === a && t.method === m && (t._stSig || '') === sig)) return;
    targets.push({ address: a, method: m, label: label || 'COUNTER', stations: st, _stSig: sig });
  };
  const wss = Array.isArray(settings.workstations) ? settings.workstations : [];
  let adopted = false; // 매장이 POS별 토글을 도입했는가
  wss.forEach(ws => {
    if (ws && ws.consolidatedTicket) {
      adopted = true;
      const bp = ws.billPrinter;
      if (bp && bp.enabled !== false && (bp.address || bp.method === 'browser')) {
        add(bp.address, bp.method, ws.name, ws.consolidatedStations);
      }
    }
  });
  if (!adopted) {
    // Legacy fallbacks (back-compat for shops set up before per-POS toggles).
    const co = settings.consolidatedOrderTicket;
    if (co && co.enabled && co.address) add(co.address, co.method, 'COUNTER');
    const bpMirror = getActiveBillPrinter();
    if (settings.kitchenPrinter && settings.kitchenPrinter.mirrorToBillPrinter && bpMirror && bpMirror.enabled && bpMirror.address) {
      add(bpMirror.address, bpMirror.method, 'COUNTER');
    }
  }
  return targets;
}

// 통합티켓 범위 필터용 아이템 스테이션 해석 — tagTicketWithStations 와 동일 체인
// (백엔드 enriched kitchen_station_id 우선, 이름→스테이션 localStorage 맵 폴백).
// 스테이션 미배정(null) 아이템은 범위 티켓에도 포함한다 — 매핑 누락으로 주방 티켓에서
// 품목이 조용히 빠지는 사고(silent drop)보다 한 줄 더 찍히는 쪽이 안전 (2026-06-12).
function _unifiedItemStationId(item) {
  let menuStationMap = {};
  try {
    const saved = localStorage.getItem('kitchenStationMenuMap');
    if (saved) menuStationMap = JSON.parse(saved);
  } catch (e) { /* non-fatal */ }
  const itemName = (item.menuItem && item.menuItem.name) || item.name;
  const sid = item.kitchen_station_id || (itemName ? menuStationMap[itemName] : null);
  return sid != null ? Number(sid) : null;
}

/**
 * 통합/카운터 오더티켓 발행 (2026-06-11) — 새 주문(voided=false)·취소(voided=true) 공용.
 * 대상별로 상단 라벨 = 워크스테이션 이름, 아이템별 인라인 스테이션 태그([KQ1][KQ2]) 유지.
 * fire-and-forget(기존 미러와 동일 200ms 지연). 스테이션 라우팅/주방 발행과는 완전히 별개 경로.
 */
function sendUnifiedTickets(orderData, storeInfo, settings, opts) {
  try {
    const targets = computeUnifiedTicketTargets(settings);
    if (targets.length === 0) return;
    const voided = !!(opts && opts.voided);
    const reason = opts && opts.reason;
    setTimeout(() => {
      try {
        const base = voided ? buildVoidTicketData(orderData, reason) : orderData;
        // Tag each item with its station name so the counter copy shows inline
        // [KQ1] [KQ2] [BARPR] next to each item — cashier verifies routing at a glance.
        const tagged = tagTicketWithStations(base, 'COUNTER', settings);
        targets.forEach(tgt => {
          const label = (tgt.label || 'COUNTER').toUpperCase();
          // 2026-06-12 (Irene): 워크스테이션별 범위 — 선택한 주방 스테이션의 품목만 모은
          // 통합티켓(예: 주방 워크스테이션은 BAR 메뉴 제외). 미배정 품목은 누락 방지를
          // 위해 포함. 범위 품목이 0개면 그 워크스테이션엔 발행 생략(빈 티켓 방지).
          let scoped = tagged;
          if (Array.isArray(tgt.stations) && tgt.stations.length > 0) {
            const want = new Set(tgt.stations.map(Number));
            const scopedItems = (tagged.items || []).filter(it => {
              const sid = _unifiedItemStationId(it);
              return sid == null || want.has(sid);
            });
            const hasScopedItem = scopedItems.some(it => {
              const sid = _unifiedItemStationId(it);
              return sid != null && want.has(sid);
            });
            if (!hasScopedItem) return; // 이 범위 품목 없음 → 이 워크스테이션 발행 생략
            scoped = { ...tagged, items: scopedItems };
          }
          // noStationBox: 통합 티켓은 상단 단일 station 박스 생략(여러 스테이션 혼재).
          // groupLabel/printedAt = 해당 워크스테이션 이름. voided 플래그는 base 에서 보존됨.
          const ticket = { ...scoped, groupLabel: label, printedAt: label, noStationBox: true, showItemStations: true };
          const billAddr = tgt.address;
          const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(billAddr || '');
          if (isLanIP) {
            sendViaQZTray(generateKitchenTicketContent(ticket, storeInfo), billAddr)
              .catch(e => console.warn('Unified ticket print failed:', e && e.message));
          } else {
            sendHTMLViaQZTray(generateHTMLKitchenTicket(ticket, storeInfo), billAddr)
              .catch(e => console.warn('Unified ticket print failed:', e && e.message));
          }
        });
      } catch (e) {
        console.warn('Unified ticket trigger failed:', e && e.message);
      }
    }, 200);
  } catch (e) {
    console.warn('Unified ticket setup failed:', e && e.message);
  }
}

/**
 * Print a cancellation ticket to the kitchen printer.
 * Returns Promise<boolean>. Silent no-op when kitchen printer disabled or option OFF.
 */
export async function printCancellationTicket(orderData, storeInfo, reason, printerName, printerAddress, suppressMirror) {
  try {
    const settings = getPrinterSettings();
    if (!settings.kitchenPrinter || !settings.kitchenPrinter.enabled) {
      console.log('[CANCEL TICKET] Kitchen printer disabled, skip');
      return true;
    }
    // 확정 스펙 v2 (2026-06-02): 취소는 주방이 무조건 알아야 하므로 항상 발송.
    // printCancellationTicket 설정 게이트 삭제(설정 자체 제거됨).
    // Emergency Routing Mode — cancellation ticket also goes to the cashier
    // printer so staff can hand-deliver the cancellation to the right station.
    if (settings.emergencyMode) {
      try {
        console.log('[CANCEL TICKET] ⚠️ EMERGENCY MODE: routing to cashier (bill) printer');
        await printCancellationToCounter(orderData, storeInfo, reason);
        return true;
      } catch (e) {
        console.error('Emergency cancellation redirect failed:', e && e.message);
        return false;
      }
    }

    const escpos = generateKitchenTicketContent(buildVoidTicketData(orderData, reason), storeInfo);
    const targetPrinter = printerName || settings.kitchenPrinter.name;

    // 통합/카운터 미러 — 새 주문과 동일한 POS별 토글/라벨 규칙(2026-06-11). 토글 채택 매장은
    // 토글된 POS(예: POS 2)로 워크스테이션 이름 라벨과 함께, 미채택 매장은 레거시 동작 유지.
    // (mirrorToBillPrinter 게이트는 computeUnifiedTicketTargets 안에서 처리.) suppressMirror 면 skip
    // — 주문취소(printCancellationTicketsByStation)가 전체 1장만 따로 미러하기 위함.
    if (!suppressMirror) {
      sendUnifiedTickets(orderData, storeInfo, settings, { voided: true, reason });
    }

    // QZ Tray — station 주소 우선(R9/R10 station 라우팅), 없으면 master kitchen 주소(기존 동작).
    if (shouldUseQZTray()) {
      const address = printerAddress || settings.kitchenPrinter.address;
      if (!address) {
        console.warn('[CANCEL TICKET] QZ Tray: no kitchen address');
        return false;
      }
      // 2026-06-04 (Irene): 일반 오더티켓 경로와 동일하게 — OS 드라이버 프린터는 HTML pixel
      // (한글 OK, 일반 티켓과 같은 폰트, 취소 줄긋기 = CSS line-through), raw ESC/POS 는 LAN IP
      // 프린터에만. 이전엔 항상 raw 라 취소표만 다른 폰트 + reverse-video(검정바탕)로 나왔다.
      const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
      if (isLanIP) return await sendViaQZTray(escpos, address);
      return await sendHTMLViaQZTray(generateHTMLKitchenTicket(buildVoidTicketData(orderData, reason), storeInfo), address);
    }

    // Browser print
    if (shouldUseBrowserPrint()) {
      const html = generateHTMLKitchenTicket(buildVoidTicketData(orderData, reason), storeInfo);
      return printHTMLContent(html, 'CANCELLED - ' + (orderData.orderNumber || ''));
    }

    // RawBT (Android)
    const base64Content = btoa(unescape(encodeURIComponent(escpos)));
    let intentScheme = '#Intent;scheme=rawbt;';
    if (targetPrinter) intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
    const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);
    setTimeout(() => { try { document.body.removeChild(iframe); } catch(e) {} }, 500);
    return true;
  } catch (e) {
    console.error('[CANCEL TICKET] failed:', e && e.message);
    return false;
  }
}

/**
 * R10 전체취소 — station별로 각 station 의 아이템만 줄긋기 취소표 발행.
 * 버킷팅은 kitchen 발행과 동일 단일소스(_bucketItemsByStation). station 없으면
 * 기존 printCancellationTicket(단일 프린터)로 폴백. 빌 미러는 전체 1회만.
 * orderData.cancelTitle/cancelFooter(예: '*** ORDER CANCELLED ***') 그대로 전달됨.
 */
export async function printCancellationTicketsByStation(orderData, storeInfo, reason) {
  try {
    const settings = getPrinterSettings();
    if (!settings.kitchenPrinter || !settings.kitchenPrinter.enabled) return true;
    // 확정 스펙 v2: 취소는 항상 발송 (printCancellationTicket 게이트 삭제).
    if (settings.emergencyMode) {
      // 비상모드: station 라우팅 무시, 캐셔 프린터로 (기존 취소표 정책과 동일).
      return await printCancellationTicket(orderData, storeInfo, reason);
    }

    const stationPrinters = settings.kitchenStationPrinters || {};
    const stationIds = Object.keys(stationPrinters);
    // Station 미설정 → 단일 주방 프린터(기존 동작 100% 동일).
    if (stationIds.length === 0) {
      return await printCancellationTicket(orderData, storeInfo, reason);
    }

    const menuMap = _loadKitchenStationMenuMap();
    const { stationItems, unmappedItems } = _bucketItemsByStation(orderData.items || [], stationPrinters, menuMap);
    const mappedIds = Object.keys(stationItems);

    // 매핑된 station 없으면 → 첫 station 으로 전체(주방이 한 곳).
    if (mappedIds.length === 0) {
      const sp0 = stationPrinters[stationIds[0]];
      return await printCancellationTicket({ ...orderData, stationLabel: sp0.stationName || ('Station ' + stationIds[0]) }, storeInfo, reason, sp0.name, sp0.address);
    }
    // unmapped 는 첫 매핑 station 에 합쳐 별도 job race 회피(kitchen 경로와 동일).
    if (unmappedItems.length > 0) {
      stationItems[mappedIds[0]] = [...stationItems[mappedIds[0]], ...unmappedItems];
    }

    // station별 발행 — per-station 미러는 suppress, 전체 미러 1회는 아래서.
    for (let i = 0; i < mappedIds.length; i++) {
      const sp = stationPrinters[mappedIds[i]];
      const perStation = { ...orderData, items: stationItems[mappedIds[i]], stationLabel: sp.stationName || ('Station ' + mappedIds[i]) };
      try {
        await printCancellationTicket(perStation, storeInfo, reason, sp.name, sp.address, true);
      } catch (e) {
        console.error('[CANCEL STATION] station 발행 실패:', sp && sp.stationName, e && e.message);
      }
      if (i < mappedIds.length - 1) await new Promise(r => setTimeout(r, 800));
    }

    // 통합/카운터 미러 — 전체 취소 주문 1장(station별 중복 방지). 새 주문과 동일한
    // POS별 토글/라벨 규칙(2026-06-11): 토글 채택 매장은 토글된 POS 로 워크스테이션 이름 라벨,
    // 미채택 매장은 레거시 mirrorToBillPrinter 동작(가드는 computeUnifiedTicketTargets 내부).
    sendUnifiedTickets(orderData, storeInfo, settings, { voided: true, reason });
    return true;
  } catch (e) {
    console.error('[CANCEL STATION] failed:', e && e.message);
    return false;
  }
}

// Mirror helper — same content to bill printer
async function printCancellationToCounter(orderData, storeInfo, reason) {
  const settings = getPrinterSettings();
  // 카운터 미러는 여러 스테이션 혼재 → 상단 station 박스 생략(noStationBox), 일반 오더티켓과 동일.
  // 2026-06-05 (Irene): 통합 취소 티켓도 아이템별 스테이션 인라인 표시(showItemStations).
  const _voidData = { ...buildVoidTicketData(orderData, reason), noStationBox: true, showItemStations: true };
  const escpos = generateKitchenTicketContent(_voidData, storeInfo);

  if (shouldUseQZTray()) {
    const address = getActiveBillPrinter().address;
    if (!address) return false;
    // 2026-06-04 (Irene): OS 드라이버 프린터엔 HTML pixel(일반 티켓과 같은 폰트 + line-through),
    // raw ESC/POS 는 LAN IP 에만. (이전엔 항상 raw → 카운터 미러 취소표만 폰트 다름.)
    const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(address);
    if (isLanIP) return await sendViaQZTray(escpos, address);
    return await sendHTMLViaQZTray(generateHTMLKitchenTicket(_voidData, storeInfo), address);
  }

  if (shouldUseBrowserPrint()) {
    const html = generateHTMLKitchenTicket(_voidData, storeInfo);
    return printHTMLContent(html, 'CANCELLED (counter) - ' + (orderData.orderNumber || ''));
  }

  // RawBT — uses bill printer name
  const targetPrinter = getActiveBillPrinter().name;
  const base64Content = btoa(unescape(encodeURIComponent(escpos)));
  let intentScheme = '#Intent;scheme=rawbt;';
  if (targetPrinter) intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
  const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
  const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = intentUrl;
  document.body.appendChild(iframe);
  setTimeout(() => { try { document.body.removeChild(iframe); } catch(e) {} }, 500);
  return true;
}

// All functions are already exported individually above
