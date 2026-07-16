/**
 * printDiagnostics.ts — client-side pieces of the Print Self-Diagnose system.
 *
 * Design: docs/PRINT_SELF_DIAGNOSE_DESIGN.md.
 *
 * 🔒 Strictly READ-ONLY with respect to the print pipeline:
 *   - Reads localStorage / printer settings / window.__NATIVE_PRINT / qz.websocket.isActive().
 *   - Never opens a QZ websocket, never reshuffles printers, never touches the
 *     protected print files. The only outbound calls are the device-report POST
 *     (a passive snapshot) and, on explicit user action, runQZDiagnostic() /
 *     the existing test-print functions — all already exported by billPrint.js.
 *
 * This module is framework-free so both PrintDeviceReporter (App.tsx) and the
 * Settings self-diagnose panel can share it.
 */
import {
  getPrinterSettings,
  getPrinterMode,
  getActiveWorkstationId,
  getActiveBillPrinter,
  runQZDiagnostic,
} from './billPrint';
import { getAuthToken } from './auth';

// ─── Shared check shape (mirrors backend §2-3; title/cause/guide are i18n keys) ───
export type CheckStatus = 'pass' | 'warn' | 'fail' | 'unknown' | 'na';
export type CheckSeverity = 'critical' | 'major' | 'minor';
export interface DiagCheck {
  id: string;
  scope: 'server' | 'device';
  domain: 'print';
  status: CheckStatus;
  severity: CheckSeverity;
  title: string;              // i18n key
  cause: string | null;       // i18n key (interpolated with evidence)
  guide: string[];            // i18n keys
  fix: { type: 'api' | 'navigate' | 'test-print'; action: string; label: string } | null;
  evidence: Record<string, any>;
}

export type Platform = 'windows-app' | 'android-app' | 'web-qz' | 'web-rawbt' | 'web';

// ─── Stable per-device id (localStorage, never leaves this browser) ───
const DEVICE_ID_KEY = 'print_device_id';
export function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      id = (typeof crypto !== 'undefined' && crypto.randomUUID)
        ? crypto.randomUUID()
        : 'dev-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  } catch {
    return 'dev-ephemeral';
  }
}

function nativeBridge(): any {
  return (typeof window !== 'undefined') ? (window as any).__NATIVE_PRINT : null;
}

export function detectPlatform(): Platform {
  const np = nativeBridge();
  if (np) {
    const ua = (typeof navigator !== 'undefined' && navigator.userAgent) ? navigator.userAgent : '';
    return /Android/i.test(ua) ? 'android-app' : 'windows-app';
  }
  const mode = (() => { try { return getPrinterMode(); } catch { return null; } })();
  if (mode === 'rawbt') return 'web-rawbt';
  if (mode === 'qztray') return 'web-qz';
  return 'web';
}

/** websocket.isActive() — a passive read. Never connects. */
export function readQzActive(): boolean | null {
  try {
    const qz = (window as any).qz;
    if (qz?.websocket?.isActive) return !!qz.websocket.isActive();
  } catch { /* ignore */ }
  return null;
}

/** Is THIS device configured to auto-print (workstation-aware where possible)? */
export function readIsAutoPrint(): boolean {
  try {
    const ps: any = getPrinterSettings() || {};
    const wsId = (() => { try { return getActiveWorkstationId(); } catch { return null; } })();
    if (wsId && Array.isArray(ps.workstations)) {
      const ws = ps.workstations.find((w: any) => String(w?.id) === String(wsId));
      if (ws?.kitchenPrinter) return !!(ws.kitchenPrinter.enabled && ws.kitchenPrinter.autoPrint);
    }
    const kp = ps.kitchenPrinter || {};
    if (kp.enabled && kp.autoPrint) return true;
    const bill = (() => { try { return getActiveBillPrinter(); } catch { return null; } })();
    return !!(bill && bill.enabled && bill.autoPrint);
  } catch {
    return false;
  }
}

function platformLabel(platform: Platform): string {
  switch (platform) {
    case 'windows-app': return 'Windows app';
    case 'android-app': return 'Android app';
    case 'web-qz': return 'Browser + QZ Tray';
    case 'web-rawbt': return 'Browser + RawBT';
    default: return 'Browser';
  }
}

/** Human label for this device, e.g. "POS1 (Windows app)". Best-effort, read-only. */
export function buildDeviceLabel(platform: Platform): string {
  let station: string | null = null;
  try {
    const wsId = getActiveWorkstationId();
    if (wsId) {
      const ps: any = getPrinterSettings() || {};
      const ws = Array.isArray(ps.workstations) ? ps.workstations.find((w: any) => String(w?.id) === String(wsId)) : null;
      station = ws?.name || String(wsId);
    }
  } catch { /* ignore */ }
  const pl = platformLabel(platform);
  return station ? `${station} (${pl})` : pl;
}

/** Assemble the passive device-report payload. Reads only — no side effects. */
export function buildDeviceReport(isDiag = false): Record<string, any> {
  const platform = detectPlatform();
  const np = nativeBridge();
  let ps: any = {};
  try { ps = getPrinterSettings() || {}; } catch { /* ignore */ }
  const bill = ps.billPrinter || {};
  const kp = ps.kitchenPrinter || {};
  const stationPrinters = ps.kitchenStationPrinters || {};
  return {
    device_id: getDeviceId(),
    workstation_id: (() => { try { return getActiveWorkstationId() || null; } catch { return null; } })(),
    label: buildDeviceLabel(platform),
    platform,
    app_version: np ? String(np.version || '') : null,
    printer_mode: (() => { try { return getPrinterMode(); } catch { return null; } })(),
    is_auto_print: readIsAutoPrint(),
    qz_active: readQzActive(),
    is_diag: isDiag,
    snapshot: {
      billPrinter: { method: bill.method, name: bill.address || bill.name, enabled: !!bill.enabled },
      kitchenPrinter: { method: kp.method, name: kp.address || kp.name, enabled: !!kp.enabled, autoPrint: !!kp.autoPrint },
      stations: Object.keys(stationPrinters).length,
      hasNativeBridge: !!np,
    },
  };
}

/** Fire-and-forget POST of the device snapshot. Failure is harmless. */
export async function postDeviceReport(isDiag = false): Promise<void> {
  try {
    const token = getAuthToken();
    if (!token) return;
    await fetch('/api/print-diagnostics/device-report', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(buildDeviceReport(isDiag)),
    });
  } catch { /* fire-and-forget */ }
}

// ─── Device-side checks (D1..D8) — run only when the user presses "Run full check" ───

function chk(id: string, status: CheckStatus, opts: Partial<DiagCheck> = {}): DiagCheck {
  return {
    id, scope: 'device', domain: 'print', status,
    severity: opts.severity || 'minor',
    title: opts.title || `diag.check.${id}.title`,
    cause: opts.cause ?? null,
    guide: opts.guide || [],
    fix: opts.fix || null,
    evidence: opts.evidence || {},
  };
}

/**
 * Collect all configured printer names (bill + kitchen master + stations) so we
 * can 1:1 compare against the OS/QZ printer list (D3 — the #1 fake-green cause).
 */
function configuredPrinterNames(ps: any): string[] {
  const names = new Set<string>();
  const add = (p: any) => {
    if (!p || !p.enabled) return;
    const n = p.address || p.name;
    // Only NAMED printers can be matched against a list; LAN IPs / OS default cannot.
    if (n && typeof n === 'string' && !/^\d{1,3}(\.\d{1,3}){3}/.test(n)) names.add(n);
  };
  add(ps.billPrinter);
  add(ps.kitchenPrinter);
  Object.values(ps.kitchenStationPrinters || {}).forEach(add);
  return Array.from(names);
}

/**
 * Run the device-side diagnostic. Reuses runQZDiagnostic() (which itself branches
 * to the native bridge) — no new connection logic here.
 */
export async function runDeviceChecks(): Promise<DiagCheck[]> {
  const checks: DiagCheck[] = [];
  const platform = detectPlatform();
  const np = nativeBridge();
  let ps: any = {};
  try { ps = getPrinterSettings() || {}; } catch { /* ignore */ }

  const isAuto = readIsAutoPrint();

  // D1 role_identity — always first, to fix expectations.
  checks.push(chk('role_identity', isAuto ? 'pass' : 'na', {
    severity: 'minor',
    title: 'diag.check.role_identity.title',
    cause: isAuto ? 'diag.check.role_identity.printerCause' : 'diag.check.role_identity.displayCause',
    evidence: { platform, isAutoPrint: isAuto, label: buildDeviceLabel(platform) },
  }));

  // RawBT: sending is a fire-and-forget Android intent with no return value —
  // there is nothing to probe. Be honest: unknown + test print.
  if (platform === 'web-rawbt') {
    checks.push(chk('bridge_or_qz', 'unknown', {
      severity: 'major',
      cause: 'diag.check.bridge_or_qz.rawbtUnknown',
      guide: ['diag.check.bridge_or_qz.guide'],
      evidence: { platform },
    }));
    checks.push(...settingsAndFormatChecks(ps, platform));
    checks.push(testPrintCheck());
    return checks;
  }

  // D2 bridge_or_qz — reuse the existing 5-step probe (native branch included).
  let diag: any = null;
  try {
    diag = await runQZDiagnostic();
  } catch (e: any) {
    diag = { ok: false, steps: [], summary: { lastError: String(e?.message || e) } };
  }
  const bridgeOk = !!diag?.ok;
  checks.push(chk('bridge_or_qz', bridgeOk ? 'pass' : 'fail', {
    severity: 'critical',
    cause: bridgeOk ? null : (np ? 'diag.check.bridge_or_qz.nativeFail' : 'diag.check.bridge_or_qz.qzFail'),
    guide: bridgeOk ? [] : ['diag.check.bridge_or_qz.guide'],
    evidence: {
      platform,
      qzVersion: diag?.summary?.qzVersion || null,
      lastError: diag?.summary?.lastError || null,
      steps: (diag?.steps || []).map((s: any) => ({ key: s.key, status: s.status, detail: s.detail })),
    },
  }));

  // D3 printers_visible — configured NAMED printers must appear in the detected list.
  const detected: string[] = (() => {
    const step = (diag?.steps || []).find((s: any) => s.key === 'printers');
    if (step?.detail && typeof step.detail === 'string') {
      return step.detail.split(',').map((x: string) => x.trim()).filter(Boolean);
    }
    return [];
  })();
  const wanted = configuredPrinterNames(ps);
  if (wanted.length === 0) {
    checks.push(chk('printers_visible', 'na', { evidence: { wanted, detected } }));
  } else if (detected.length === 0) {
    // Could not read the list (e.g. bridge failed) — don't fake green.
    checks.push(chk('printers_visible', 'unknown', {
      severity: 'major',
      cause: 'diag.check.printers_visible.noList',
      guide: ['diag.check.printers_visible.guide'],
      evidence: { wanted, detected },
    }));
  } else {
    const missing = wanted.filter(n => !detected.includes(n));
    checks.push(chk('printers_visible', missing.length ? 'fail' : 'pass', {
      severity: 'critical',
      cause: missing.length ? 'diag.check.printers_visible.missing' : null,
      guide: missing.length ? ['diag.check.printers_visible.guide'] : [],
      evidence: { wanted, detected, missing, missingList: missing.join(', ') },
    }));
  }

  // D4 cert_trusted — QZ only (native has no handshake). Reads the existing probe.
  if (!np && platform === 'web-qz') {
    const certStep = (diag?.steps || []).find((s: any) => s.key === 'cert' || s.key === 'trust' || s.key === 'sign');
    const summaryTrust = diag?.summary?.certHandshake;
    const trusted = bridgeOk && (summaryTrust === 'ok' || summaryTrust === 'trusted' || (certStep && certStep.status === 'ok') || summaryTrust === 'n/a');
    checks.push(chk('cert_trusted', bridgeOk ? (trusted ? 'pass' : 'warn') : 'na', {
      severity: 'major',
      cause: trusted || !bridgeOk ? null : 'diag.check.cert_trusted.fail',
      guide: trusted || !bridgeOk ? [] : ['diag.check.cert_trusted.guide'],
      evidence: { certHandshake: summaryTrust ?? null },
    }));
  }

  checks.push(...settingsAndFormatChecks(ps, platform));
  checks.push(testPrintCheck());
  return checks;
}

/** D5 settings_sync + D6 print_format_fit — pure reads, no network. */
function settingsAndFormatChecks(ps: any, platform: Platform): DiagCheck[] {
  const out: DiagCheck[] = [];

  // D5 settings_sync — localStorage printerSettings vs (best-effort) its own persisted copy.
  // We compare the live in-memory settings against the raw localStorage string to
  // catch a drifted/emptied cache (the printer-settings-wipe family).
  let drift = false;
  try {
    const raw = localStorage.getItem('printerSettings');
    if (raw) {
      const cached = JSON.parse(raw);
      const liveHasKitchen = !!(ps.kitchenPrinter && (ps.kitchenPrinter.address || ps.kitchenPrinter.name));
      const cachedHasKitchen = !!(cached.kitchenPrinter && (cached.kitchenPrinter.address || cached.kitchenPrinter.name));
      drift = liveHasKitchen !== cachedHasKitchen;
    }
  } catch { /* ignore */ }
  out.push(chk('settings_sync', drift ? 'warn' : 'pass', {
    severity: 'major',
    cause: drift ? 'diag.check.settings_sync.drift' : null,
    guide: drift ? ['diag.check.settings_sync.guide'] : [],
    evidence: {},
  }));

  // D6 print_format_fit — informational guidance about blank-paper (withmin) class.
  if (platform === 'windows-app' || platform === 'web-qz' || platform === 'android-app') {
    let fmt = 'auto';
    try { fmt = (ps && ps.printFormat) || 'auto'; } catch { /* ignore */ }
    out.push(chk('print_format_fit', 'unknown', {
      severity: 'minor',
      cause: 'diag.check.print_format_fit.info',
      guide: ['diag.check.print_format_fit.guide'],
      evidence: { format: fmt },
    }));
  }
  return out;
}

/** D8 test_print — a manual, user-driven check. Status stays unknown until they answer. */
function testPrintCheck(): DiagCheck {
  return chk('test_print', 'unknown', {
    severity: 'minor',
    cause: 'diag.check.test_print.prompt',
    fix: { type: 'test-print', action: 'test_print', label: 'diag.fix.test_print' },
    evidence: {},
  });
}
