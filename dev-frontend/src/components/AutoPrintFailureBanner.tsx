import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

/**
 * AutoPrintFailureBanner — PRINT_RULES_MATRIX rule 6: when an auto-print fails,
 * the POS MUST surface it (with remediation). Auto-print paths dispatch a
 * `window` CustomEvent('autoprint-failed', { detail: { orderNumber, scope } }).
 * The system keeps needs_print=true on failure, so the poller auto-retries —
 * this banner tells staff what to check if it keeps failing.
 *
 * Non-blocking fixed banner (does not cover the POS). Dismissible.
 * The "Printer Settings" button deep-links into Settings > Printer with ?diag=1
 * so the Print Self-Diagnose panel auto-runs a full check on arrival
 * (docs/PRINT_SELF_DIAGNOSE_DESIGN.md §5-1).
 */
const AutoPrintFailureBanner: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [fail, setFail] = useState<{ orderNumber?: string; scope?: string; at: number } | null>(null);

  useEffect(() => {
    const onFail = (e: any) => {
      const d = (e && e.detail) || {};
      setFail({ orderNumber: d.orderNumber, scope: d.scope, at: Date.now() });
    };
    window.addEventListener('autoprint-failed', onFail as EventListener);
    return () => window.removeEventListener('autoprint-failed', onFail as EventListener);
  }, []);

  if (!fail) return null;

  const scopeLabel = fail.scope === 'bill'
    ? t('printFailBanner.scopeBill', 'Receipt')
    : t('printFailBanner.scopeKitchen', 'Kitchen');

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100020,
        background: '#FF6B6B', color: '#fff', padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)', fontSize: 15, fontWeight: 600
      }}
      role="alert"
    >
      <span style={{ fontSize: 18 }}>⚠</span>
      <span>
        {fail.orderNumber
          ? t('printFailBanner.failedOrder', '{{scope}} auto-print failed — order {{n}}. Retrying automatically.', { scope: scopeLabel, n: fail.orderNumber })
          : t('printFailBanner.failed', '{{scope}} auto-print failed. Retrying automatically.', { scope: scopeLabel })}
        {' '}
        {t('printFailBanner.hint', 'If it keeps failing, check whether QZ Tray is running and the printer connection / printer name.')}
      </span>
      <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button
          onClick={() => {
            const rid = user?.restaurantId || (user as any)?.restaurant_id;
            // Real RA settings route is /restaurant/:restaurantId/settings (App.tsx).
            // ?diag=1 makes the self-diagnose panel auto-run its full check on load.
            if (rid) { try { window.location.href = `/restaurant/${rid}/settings?tab=printer&diag=1`; return; } catch { /* fall through */ } }
            setFail(null);
          }}
          style={{ background: '#fff', color: '#FF6B6B', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 700, cursor: 'pointer' }}
        >
          {t('printFailBanner.printerSettings', 'Printer Settings')}
        </button>
        <button
          onClick={() => setFail(null)}
          style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.7)', borderRadius: 6, padding: '6px 12px', fontWeight: 700, cursor: 'pointer' }}
        >
          {t('printFailBanner.dismiss', 'Dismiss')}
        </button>
      </span>
    </div>
  );
};

export default AutoPrintFailureBanner;
