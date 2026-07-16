import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { ModalComponent } from '../UI/Modal';
import { getAuthToken } from '../../utils/auth';
import { formatDateTime } from '../../utils/dateFormat';
import {
  runDeviceChecks,
  detectPlatform,
  readIsAutoPrint,
  buildDeviceLabel,
  DiagCheck,
  CheckStatus,
} from '../../utils/printDiagnostics';
import {
  qzTrayTestPrint,
  printHTMLContent,
  getPrinterSettings,
} from '../../utils/billPrint';

/**
 * PrintSelfDiagnosePanel — the in-store "Run full check" panel (design §5-1),
 * rendered inside Settings > Printer. Merges server checks (S*) with device
 * checks (D*) into one honest list: plain-language title, cause, guide, and a
 * whitelisted one-click fix. Fake-green is forbidden — `unknown` is shown as-is.
 *
 * 🔒 No print-pipeline changes: server checks are READs, device checks reuse the
 * already-exported runQZDiagnostic() via runDeviceChecks(), and test prints call
 * existing exported functions. All recovery goes through existing APIs.
 */

interface Props {
  restaurantId: string | number | null | undefined;
}

const STATUS_STYLE: Record<CheckStatus, { glyph: string; color: string; bg: string; border: string }> = {
  pass:    { glyph: '✓', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
  warn:    { glyph: '!', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
  fail:    { glyph: '✕', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  unknown: { glyph: '?', color: '#4B5563', bg: '#F9FAFB', border: '#E5E7EB' },
  na:      { glyph: '–', color: '#9CA3AF', bg: '#F9FAFB', border: '#F3F4F6' },
};

const STATUS_RANK: Record<CheckStatus, number> = { fail: 0, warn: 1, unknown: 2, pass: 3, na: 4 };
const SEVERITY_RANK: Record<string, number> = { critical: 0, major: 1, minor: 2 };

// Whitelisted recovery actions (design §3-3). The renderer ignores anything else.
const API_FIX_PATH: Record<string, (rid: string | number) => string> = {
  clear_stuck_flags: (rid) => `/api/diagnostic/autoprint/clear-stuck-print-flags/${rid}`,
  seed_station_configs: (rid) => `/api/diagnostic/autoprint/seed-missing-printer-configs/${rid}`,
};

type TestTarget = 'bill' | 'kitchen';
type TestFormat = 'text' | 'image';

const PrintSelfDiagnosePanel: React.FC<Props> = ({ restaurantId }) => {
  const { t } = useTranslation('printDiagnostics');

  const [running, setRunning] = useState(false);
  const [checks, setChecks] = useState<DiagCheck[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fixBusy, setFixBusy] = useState<string | null>(null);
  const [fixResult, setFixResult] = useState<Record<string, string>>({});
  const [testOpen, setTestOpen] = useState(false);
  const [testPending, setTestPending] = useState<{ target: TestTarget; format: TestFormat } | null>(null);
  const [testMsg, setTestMsg] = useState<string | null>(null);

  const platform = detectPlatform();
  const isAuto = readIsAutoPrint();
  const deviceLabel = buildDeviceLabel(platform);

  // Translate a check's cause/guide, guarding against i18next plural triggers
  // (a raw `count` param makes i18next hunt for _one/_other keys). Rename to `n`.
  const tp = useCallback((key: string, evidence?: Record<string, any>) => {
    const params: Record<string, any> = { ...(evidence || {}) };
    if ('count' in params) { params.n = params.count; delete params.count; }
    return t(key, params);
  }, [t]);

  const runFullCheck = useCallback(async () => {
    setRunning(true);
    setError(null);
    setFixResult({});
    try {
      const token = getAuthToken();
      const serverPromise = restaurantId
        ? fetch(`/api/print-diagnostics/restaurant/${restaurantId}/checks`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }).then(r => r.json()).catch(() => null)
        : Promise.resolve(null);
      const devicePromise = runDeviceChecks().catch(() => [] as DiagCheck[]);

      const [serverRes, deviceChecks] = await Promise.all([serverPromise, devicePromise]);
      const serverChecks: DiagCheck[] = (serverRes?.success && Array.isArray(serverRes.data?.checks))
        ? serverRes.data.checks
        : [];

      const merged = [...deviceChecks, ...serverChecks];
      // role_identity pinned first; then fail(critical→minor) → warn → unknown → pass → na.
      merged.sort((a, b) => {
        if (a.id === 'role_identity') return -1;
        if (b.id === 'role_identity') return 1;
        const s = (STATUS_RANK[a.status] ?? 9) - (STATUS_RANK[b.status] ?? 9);
        if (s !== 0) return s;
        return (SEVERITY_RANK[a.severity] ?? 9) - (SEVERITY_RANK[b.severity] ?? 9);
      });
      setChecks(merged);

      // Let the reporter push this device's fresh snapshot to the server (§2-5).
      try { window.dispatchEvent(new CustomEvent('print-diag-ran')); } catch { /* ignore */ }
    } catch (e: any) {
      setError(String(e?.message || e));
    } finally {
      setRunning(false);
    }
  }, [restaurantId]);

  // Deep-link entry: AutoPrintFailureBanner / URL ?diag=1 auto-runs the check once.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('diag') === '1' && !checks && !running) {
        runFullCheck();
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runApiFix = useCallback(async (action: string) => {
    if (!restaurantId || !API_FIX_PATH[action]) return;
    setFixBusy(action);
    try {
      const token = getAuthToken();
      const res = await fetch(API_FIX_PATH[action](restaurantId), {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data?.success) {
        const n = data.data?.cleared ?? data.data?.seeded ?? 0;
        setFixResult(prev => ({ ...prev, [action]: t('panel.recoveredCount', { n }) }));
        // Re-run so the list reflects the recovery (design §6 round-trip).
        setTimeout(() => runFullCheck(), 400);
      } else {
        setFixResult(prev => ({ ...prev, [action]: t('panel.recoverFailed') }));
      }
    } catch {
      setFixResult(prev => ({ ...prev, [action]: t('panel.recoverFailed') }));
    } finally {
      setFixBusy(null);
    }
  }, [restaurantId, runFullCheck, t]);

  const handleFix = useCallback((fix: NonNullable<DiagCheck['fix']>) => {
    if (fix.type === 'api') { runApiFix(fix.action); return; }
    if (fix.type === 'navigate') {
      try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch { /* ignore */ }
      return;
    }
    if (fix.type === 'test-print') { setTestOpen(true); setTestMsg(null); setTestPending(null); return; }
  }, [runApiFix]);

  // ─── Test print: attempt via existing exported functions, then ask the user ───
  const doTestPrint = useCallback((target: TestTarget, format: TestFormat) => {
    setTestMsg(null);
    try {
      const ps: any = getPrinterSettings() || {};
      const printer = target === 'bill' ? (ps.billPrinter || {}) : (ps.kitchenPrinter || {});
      const address = printer.address || printer.name || '';
      if (format === 'text') {
        // Raw ESC/POS text path (what every "Test print" button in Settings uses).
        qzTrayTestPrint(address);
      } else {
        // HTML / image path — the withmin blank-paper class fails here on cheap drivers.
        const now = formatDateTime(new Date());  // 매장 타임존
        const html = `<html><head><meta charset="utf-8"><style>
          body{font-family:sans-serif;text-align:center;padding:12px;}
          h2{margin:4px 0;} .k{font-size:28px;letter-spacing:2px;}
        </style></head><body>
          <h2>${t('panel.testTicketTitle')}</h2>
          <div class="k">${target === 'bill' ? t('panel.targetBill') : t('panel.targetKitchen')}</div>
          <p>${t('panel.testTicketFormatImage')}</p>
          <p>${now}</p>
          <p>___________________________</p>
        </body></html>`;
        printHTMLContent(html, 'Print test');
      }
      setTestPending({ target, format });
    } catch (e: any) {
      setTestMsg(t('panel.testError'));
    }
  }, [t]);

  const recordTestResult = useCallback(async (ok: boolean) => {
    if (!testPending) return;
    try {
      const token = getAuthToken();
      const ps: any = getPrinterSettings() || {};
      const printer = testPending.target === 'bill' ? (ps.billPrinter || {}) : (ps.kitchenPrinter || {});
      await fetch('/api/print-events', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          outcome: ok ? 'success' : 'failed',
          reason_code: 'diag_test_print',
          reason_detail: `${testPending.target}-${testPending.format}`,
          intended_printer: printer.address || printer.name || null,
        }),
      });
    } catch { /* non-fatal */ }
    setTestMsg(ok ? t('panel.testRecordedOk') : t('panel.testRecordedFail'));
    setTestPending(null);
  }, [testPending, t]);

  const allPass = checks && checks.length > 0 && checks.every(c => c.status === 'pass' || c.status === 'na');

  return (
    <div style={{ marginBottom: 20, padding: 16, background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111827' }}>{t('panel.title')}</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{t('panel.desc')}</div>
        </div>
        <Button variant="primary" size="small" onClick={runFullCheck} disabled={running}>
          {running ? t('panel.running') : t('panel.runButton')}
        </Button>
      </div>

      {/* This device identity (D1 expectation-setting) */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', marginTop: 8,
        background: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, color: '#374151',
      }}>
        <span style={{ fontWeight: 600 }}>{t('panel.thisDevice')}:</span>
        <span>{deviceLabel}</span>
        <span style={{
          marginLeft: 'auto', fontSize: 12, fontWeight: 600,
          color: isAuto ? '#065F46' : '#6B7280',
        }}>
          {isAuto ? t('panel.roleLabel.printer') : t('panel.roleLabel.display')}
        </span>
      </div>

      {error && (
        <div style={{ marginTop: 12, padding: '10px 12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: 13, color: '#B42318' }}>
          {t('panel.error')}
        </div>
      )}

      {allPass && (
        <div style={{ marginTop: 12, padding: '10px 12px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 8, fontSize: 13, color: '#065F46', fontWeight: 600 }}>
          {t('panel.allGoodCount', { n: checks!.filter(c => c.status === 'pass').length })}
        </div>
      )}

      {checks && checks.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {checks.map((c) => {
            const s = STATUS_STYLE[c.status];
            const showFix = c.fix && ['clear_stuck_flags', 'seed_station_configs', 'navigate_settings', 'test_print'].includes(c.fix.action);
            return (
              <div key={`${c.scope}.${c.id}`} style={{ padding: '10px 12px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, fontSize: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: s.color, fontWeight: 800, minWidth: 14, fontSize: 15, textAlign: 'center' }}>{s.glyph}</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{tp(c.title, c.evidence)}</span>
                </div>
                {c.cause && (
                  <div style={{ marginLeft: 22, marginTop: 4, color: '#4B5563', lineHeight: 1.5 }}>
                    {tp(c.cause, c.evidence)}
                  </div>
                )}
                {c.guide && c.guide.length > 0 && (
                  <ol style={{ margin: '6px 0 0 40px', padding: 0, color: '#4B5563', fontSize: 12.5, lineHeight: 1.6 }}>
                    {c.guide.map((g, i) => <li key={i}>{tp(g, c.evidence)}</li>)}
                  </ol>
                )}
                {showFix && c.fix && (
                  <div style={{ marginLeft: 22, marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant={c.fix.type === 'api' ? 'primary' : 'secondary'}
                      size="small"
                      disabled={fixBusy === c.fix.action}
                      onClick={() => handleFix(c.fix!)}
                    >
                      {fixBusy === c.fix.action ? t('panel.recovering') : t(c.fix.label)}
                    </Button>
                    {fixResult[c.fix.action] && (
                      <span style={{ fontSize: 12, color: '#065F46' }}>{fixResult[c.fix.action]}</span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Test print modal — manual print + user confirmation → print_events */}
      <ModalComponent isOpen={testOpen} onClose={() => setTestOpen(false)} title={t('panel.testModalTitle')} size="small">
        <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginTop: 0 }}>{t('panel.testModalDesc')}</p>
        {!testPending ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280' }}>{t('panel.targetBill')}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="small" fullWidth onClick={() => doTestPrint('bill', 'text')}>{t('panel.testText')}</Button>
              <Button variant="secondary" size="small" fullWidth onClick={() => doTestPrint('bill', 'image')}>{t('panel.testImage')}</Button>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', marginTop: 8 }}>{t('panel.targetKitchen')}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="small" fullWidth onClick={() => doTestPrint('kitchen', 'text')}>{t('panel.testText')}</Button>
              <Button variant="secondary" size="small" fullWidth onClick={() => doTestPrint('kitchen', 'image')}>{t('panel.testImage')}</Button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{t('panel.testPrompt')}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="success" size="small" fullWidth onClick={() => recordTestResult(true)}>{t('panel.testYes')}</Button>
              <Button variant="danger" size="small" fullWidth onClick={() => recordTestResult(false)}>{t('panel.testNo')}</Button>
            </div>
          </div>
        )}
        {testMsg && (
          <div style={{ marginTop: 12, fontSize: 13, color: '#374151' }}>{testMsg}</div>
        )}
      </ModalComponent>
    </div>
  );
};

export default PrintSelfDiagnosePanel;
