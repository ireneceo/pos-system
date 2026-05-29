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
      fetch('/api/qz-tray/sign', {
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
    console.log('QZ Tray connected');
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

  const dateStr = orderData.date.toLocaleDateString('en-MY');
  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
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
    if (item.menuItem.is_set_menu && Array.isArray(item.menuItem.set_items) && item.menuItem.set_items.length > 0) {
      item.menuItem.set_items.forEach(si => {
        const siName = typeof si === 'string' ? si : ((si && si.name) || '');
        if (siName) content += '    > ' + siName + CMD.LINE_FEED;
      });
    }

    // Options
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
.group-label { font-size: 16px; font-weight: 700; letter-spacing: 0.5px; padding: 4px 0; margin: 4px 0; border-top: 2px solid #000; border-bottom: 2px solid #000; }
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
function escapeHtmlForPrint(s) {
  return String(s == null ? '' : s)
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
  const dateStr = orderData.date.toLocaleDateString('en-MY');
  const timeStr = orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true });

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
    const optionsHtml = (item.options || []).map(o => `<div class="item-option">${escapeHtmlForPrint(typeof o === 'string' ? o : (o?.name || ''))}</div>`).join('');
    // Set menu — list every sub-item so the customer sees what's included
    // (previously only the wrapper name printed, hiding the contents).
    const setItemsHtml = (item.menuItem.is_set_menu && Array.isArray(item.menuItem.set_items) && item.menuItem.set_items.length > 0)
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
  const timeStr = orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true });
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';

  // Items — kitchen format: large qty × name + starred options + inline station tag
  // The station tag lets POS staff (when this ticket comes out at the counter)
  // tell at a glance which kitchen station each item belongs to.
  const itemsHtml = orderData.items.map(item => {
    const itemName = escapeHtmlForPrint(item.menuItem?.name || item.name);
    const qty = item.quantity;
    const stationTagHtml = item.stationName
      ? ` <span class="station-tag">${escapeHtmlForPrint(item.stationName.toUpperCase())}</span>`
      : '';
    const optionsHtml = (item.options || []).map(opt =>
      `<div class="item-option" style="font-size:13px;font-weight:600;">★ ${escapeHtmlForPrint(typeof opt === 'string' ? opt : (opt?.name || ''))}</div>`
    ).join('');
    return `
      <div class="item">
        <div class="item-name" style="font-size:18px;font-weight:700;">${qty} × ${itemName}${stationTagHtml}</div>
        ${optionsHtml}
      </div>
    `;
  }).join('');

  const groupLabelHtml = orderData.groupLabel
    ? `<div class="group-label">${escapeHtmlForPrint(orderData.groupLabel.toUpperCase())}</div>`
    : '';

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
    if (orderData.tableNumber) {
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

  return wrapPrintHTML(`Kitchen Ticket - ${orderData.orderNumber || ''}`, `
    ${groupLabelHtml}
    ${metaHtml}
    <div class="divider"></div>
    <div style="font-size:14px;font-weight:700;text-align:left;margin:4px 0;">ORDER ITEMS</div>
    <div class="items">${itemsHtml}</div>
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

  const timeStr = new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true });

  const itemsHtml = addedItems.map(item => {
    const itemName = escapeHtmlForPrint(item.menuItem?.name || item.name);
    const qty = item.quantity;
    const stationTagHtml = item.stationName
      ? ` <span class="station-tag">${escapeHtmlForPrint(item.stationName.toUpperCase())}</span>`
      : '';
    const optionsHtml = (item.options || []).map(opt =>
      `<div class="item-option" style="font-size:13px;font-weight:600;">★ ${escapeHtmlForPrint(typeof opt === 'string' ? opt : (opt?.name || ''))}</div>`
    ).join('');
    return `
      <div class="item">
        <div class="item-name" style="font-size:18px;font-weight:700;">${qty} × ${itemName}${stationTagHtml}</div>
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

  return wrapPrintHTML(`Additional Items - ${orderData.orderNumber || ''}`, `
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

  // Initialize printer
  content += CMD.INIT;

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

  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Order Source (Mobile Order vs POS)
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  content += formatLine('Source:', orderSource) + CMD.LINE_FEED;

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    content += formatLine('Customer:', orderData.customerName) + CMD.LINE_FEED;
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
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    // Item: Quantity x Name (LARGE & BOLD)
    content += CMD.BOLD_ON;
    content += CMD.TEXT_DOUBLE;
    content += qty + ' x ' + itemName + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;

    // Inline station tag — printed on the next line at normal size so it
    // stays readable on 32-char thermal paper even when item names are long.
    if (item.stationName) {
      content += CMD.BOLD_ON;
      content += '  → ' + item.stationName.toUpperCase() + CMD.LINE_FEED;
      content += CMD.BOLD_OFF;
    }

    // Options with marker (same as Bill format)
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        content += '  ★ ' + option + CMD.LINE_FEED;
      });
    }

    // Spacing between items
    if (index < orderData.items.length - 1) {
      content += CMD.LINE_FEED;
    }
  });

  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === SPECIAL NOTES ===
  if (orderData.notes && orderData.notes.trim()) {
    content += CMD.LINE_FEED;
    content += CMD.BOLD_ON;
    content += '** SPECIAL NOTES **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += orderData.notes + CMD.LINE_FEED;
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

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Order Source (Mobile Order vs POS)
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  content += formatLine('Source:', orderSource) + CMD.LINE_FEED;

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    content += formatLine('Customer:', orderData.customerName) + CMD.LINE_FEED;
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
  const itemName = item.menuItem?.name || item.name;
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
      content += '  * ' + option + CMD.LINE_FEED;
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
    content += orderData.notes + CMD.LINE_FEED;
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
  const timeStr = orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true });
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
    const stationTagHtml = item.stationName
      ? ` <span class="station-tag">${escapeHtmlForPrint(item.stationName.toUpperCase())}</span>`
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
    const __bpMirror = getActiveBillPrinter();
    if (settings.kitchenPrinter?.mirrorToBillPrinter && __bpMirror && __bpMirror.enabled && __bpMirror.address) {
      setTimeout(() => {
        try {
          const billAddr = __bpMirror.address;
          const isLanIP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(billAddr);
          // Tag each item with its target station name so the counter mirror
          // ticket shows inline [KQ1] [KQ2] [BARPR] next to each item — cashier
          // can verify station routing at a glance (2026-05-28 The Fire 매장
          // 영업 1일차 보고: station 라벨 누락으로 어디로 가는지 불명).
          const tagged = tagTicketWithStations(orderData, 'COUNTER', settings);
          const unifiedTicket = { ...tagged, groupLabel: 'COUNTER', printedAt: 'COUNTER' };
          if (isLanIP) {
            sendViaQZTray(generateKitchenTicketContent(unifiedTicket, storeInfo), billAddr)
              .catch(e => console.warn('Kitchen → counter mirror print failed:', e && e.message));
          } else {
            sendHTMLViaQZTray(generateHTMLKitchenTicket(unifiedTicket, storeInfo), billAddr)
              .catch(e => console.warn('Kitchen → counter mirror print failed:', e && e.message));
          }
        } catch (e) {
          console.warn('Kitchen → counter mirror trigger failed:', e && e.message);
        }
      }, 200);
    }

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

    // QZ Tray: send ESC/POS to the bill printer's configured address
    if (method === 'qztray') {
      const address = getActiveBillPrinter().address;
      if (!address) {
        console.warn('QZ Tray: bill printer address not configured');
        return false;
      }
      const escpos = generateKitchenTicketContent(tagged, storeInfo);
      return await sendViaQZTray(escpos, address);
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
  const items = (orderData.items || []).map(item => {
    // 1) Backend-enriched item.stationName (polling endpoint) — single source.
    //    localStorage 의존 X. 매장 device 캐시 무관하게 항상 정확.
    if (item.stationName) return item;
    // 2) Fallback chain: kitchen_station_id → KDS DB cache → printer_settings → station id label.
    const itemName = item.menuItem?.name || item.name;
    const stationId = item.kitchen_station_id || menuStationMap[itemName];
    if (!stationId) return item;
    const fromKdsCache = kdsStationNameById[stationId];
    const fromSettings = stationPrinters[stationId]?.stationName;
    const stationName = fromKdsCache || fromSettings || `Station #${stationId}`;
    return { ...item, stationName };
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

  const timeStr = new Date().toLocaleTimeString('en-MY', {
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
    const itemName = item.menuItem?.name || item.name;
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
        content += '  ★ ' + option + CMD.LINE_FEED;
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

  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
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
    if (printPerItem && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const perItemData = { ...orderData, items: [item], groupLabel: stationName ? stationName.toUpperCase() : undefined, printedAt: stationName ? stationName.toUpperCase() : 'KITCHEN' };
        if (isLanIP) {
          await sendViaQZTray(generateKitchenTicketContent(perItemData, storeInfo), address);
        } else {
          await sendHTMLViaQZTray(generateHTMLKitchenTicket(perItemData, storeInfo), address);
        }
        if (i < items.length - 1) await new Promise(r => setTimeout(r, 300));
      }
    } else {
      const ticketData = { ...orderData, groupLabel: stationName ? stationName.toUpperCase() : undefined, printedAt: stationName ? stationName.toUpperCase() : 'KITCHEN' };
      if (isLanIP) {
        await sendViaQZTray(generateKitchenTicketContent(ticketData, storeInfo), address);
      } else {
        await sendHTMLViaQZTray(generateHTMLKitchenTicket(ticketData, storeInfo), address);
      }
    }
    return true;
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
async function printKitchenTicketsByStation(orderData, storeInfo, settings) {
  const stationPrinters = settings.kitchenStationPrinters || {};
  const stationIds = Object.keys(stationPrinters);

  // Helper: read the menu→station mapping (saved by Kitchen Display)
  const loadMenuStationMap = () => {
    try {
      const saved = localStorage.getItem('kitchenStationMenuMap');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load kitchen station menu map:', e);
    }
    return {};
  };

  // Helper: bucket items by station based on the menu→station mapping
  const bucketItemsByStation = (menuStationMap) => {
    const stationItems = {};
    const unmappedItems = [];
    (orderData.items || []).forEach(item => {
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
  };

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
    ? orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true })
    : new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true });
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
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    content += CMD.BOLD_ON;
    content += CMD.TEXT_DOUBLE;
    content += qty + ' x ' + itemName + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;

    // Options
    const options = item.options || [];
    options.forEach(opt => {
      if (!/^.+\sx\d+$/.test(opt)) {
        content += '  > ' + opt + CMD.LINE_FEED;
      }
    });

    // Special instructions
    const special = item.special_instructions || item.specialInstructions || '';
    if (special) {
      content += CMD.BOLD_ON;
      content += '  *** ' + special + ' ***' + CMD.LINE_FEED;
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
// CANCELLATION TICKET — 주문 취소 시 키친에 인쇄 (선택)
// ============================================

/**
 * Generate ESCPOS for a CANCELLED kitchen ticket.
 * 큰 "CANCELLED" 헤더 + 원본 주문 번호 + items 요약 + "STOP PREPARATION" 푸터.
 */
function generateCancellationTicketContent(orderData, storeInfo, reason) {
  let content = '';
  content += CMD.INIT;
  content += CMD.ALIGN_CENTER;
  content += CMD.REVERSE_ON + CMD.TEXT_DOUBLE + CMD.BOLD_ON;
  content += ' *** CANCELLED *** ';
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

  // Items to stop preparing
  const items = orderData.items || [];
  items.forEach(it => {
    const qty = (it.quantity != null ? it.quantity : 1);
    const name = it.name || (it.menuItem && it.menuItem.name) || '';
    content += qty + 'x  ' + name + CMD.LINE_FEED;
  });
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  content += CMD.ALIGN_CENTER + CMD.BOLD_ON + CMD.TEXT_DOUBLE_HEIGHT;
  content += '>> STOP PREPARATION <<' + CMD.LINE_FEED;
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
    return `<div class="item"><div class="item-name" style="font-size:16px;font-weight:700;">${qty} × ${name}${stationTagHtml}</div></div>`;
  }).join('');

  const orderType = String(orderData.orderType || orderData.order_type || '').replace(/_/g, '-');
  const tableNum = orderData.tableNumber || orderData.table_number || '';
  const orderNumber = orderData.orderNumber || orderData.order_number || '';

  const metaRows = [];
  if (tableNum) metaRows.push(`<div class="meta-row"><span class="meta-label">Table</span><span><strong>${escapeHtmlForPrint(String(tableNum))}</strong></span></div>`);
  if (orderType) metaRows.push(`<div class="meta-row"><span class="meta-label">Type</span><span>${escapeHtmlForPrint(orderType)}</span></div>`);
  if (reason) metaRows.push(`<div class="meta-row"><span class="meta-label">Reason</span><span>${escapeHtmlForPrint(String(reason))}</span></div>`);

  return wrapPrintHTML(`Cancelled - ${orderNumber}`, `
    <div class="banner banner-strong" style="background:#000;color:#fff;border-color:#000;">*** CANCELLED ***</div>
    <div class="medium-number">Order #${escapeHtmlForPrint(orderNumber)}</div>
    ${metaRows.length ? `<div class="meta">${metaRows.join('')}</div>` : ''}
    <div class="divider"></div>
    <div class="items">${itemsHtml}</div>
    <div class="divider-solid"></div>
    <div class="banner banner-strong">&gt;&gt; STOP PREPARATION &lt;&lt;</div>
    <div class="footer time-info">${new Date().toLocaleString()}</div>
  `);
}

function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/**
 * Print a cancellation ticket to the kitchen printer.
 * Returns Promise<boolean>. Silent no-op when kitchen printer disabled or option OFF.
 */
export async function printCancellationTicket(orderData, storeInfo, reason, printerName) {
  try {
    const settings = getPrinterSettings();
    if (!settings.kitchenPrinter || !settings.kitchenPrinter.enabled) {
      console.log('[CANCEL TICKET] Kitchen printer disabled, skip');
      return true;
    }
    if (settings.kitchenPrinter.printCancellationTicket === false) {
      console.log('[CANCEL TICKET] Option OFF, skip');
      return true;
    }
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

    const escpos = generateCancellationTicketContent(orderData, storeInfo, reason);
    const targetPrinter = printerName || settings.kitchenPrinter.name;

    // Mirror to bill printer (same toggle as normal kitchen tickets)
    const __bpMirror = getActiveBillPrinter(); if (settings.kitchenPrinter.mirrorToBillPrinter && __bpMirror && __bpMirror.enabled) {
      setTimeout(() => {
        printCancellationToCounter(orderData, storeInfo, reason).catch(e =>
          console.warn('Cancellation → counter mirror failed:', e && e.message)
        );
      }, 200);
    }

    // QZ Tray
    if (shouldUseQZTray()) {
      const address = settings.kitchenPrinter.address;
      if (!address) {
        console.warn('[CANCEL TICKET] QZ Tray: no kitchen address');
        return false;
      }
      return await sendViaQZTray(escpos, address);
    }

    // Browser print
    if (shouldUseBrowserPrint()) {
      const html = generateHTMLCancellationTicket(orderData, storeInfo, reason);
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

// Mirror helper — same content to bill printer
async function printCancellationToCounter(orderData, storeInfo, reason) {
  const settings = getPrinterSettings();
  const escpos = generateCancellationTicketContent(orderData, storeInfo, reason);

  if (shouldUseQZTray()) {
    const address = getActiveBillPrinter().address;
    if (!address) return false;
    return await sendViaQZTray(escpos, address);
  }

  if (shouldUseBrowserPrint()) {
    const html = generateHTMLCancellationTicket(orderData, storeInfo, reason);
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
