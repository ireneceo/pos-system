import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

/**
 * AutoPrintFailureBanner — PRINT_RULES_MATRIX rule 6: when an auto-print fails,
 * the POS MUST surface it (with remediation). Auto-print paths dispatch a
 * `window` CustomEvent('autoprint-failed', { detail: { orderNumber, scope } }).
 * The system keeps needs_print=true on failure, so the poller auto-retries every
 * ~5s — which re-dispatches the SAME failure event repeatedly.
 *
 * DISPLAY-ONLY. This component only *listens* to the event and shows/hides a
 * toast. It performs no printing and touches none of the print-pipeline files.
 *
 * Two behaviours the store reported broke (2026-07-21 Windows app test), fixed here:
 *  1) Dismiss now *remembers* the dismissed failure (per scope+order) for a
 *     cooldown window, so the 5s auto-retry no longer re-opens the banner the
 *     user just closed. A genuinely NEW failure (different order) still alerts
 *     immediately; a persistent one re-alerts only after the cooldown, not every 5s.
 *  2) Rendered as a bottom-centre toast (was a full-width top bar that overlaid
 *     and blocked the top navigation buttons). It no longer covers the top nav.
 *
 * The "Printer Settings" button deep-links into Settings > Printer with ?diag=1
 * so the Print Self-Diagnose panel auto-runs a full check on arrival
 * (docs/PRINT_SELF_DIAGNOSE_DESIGN.md §5-1).
 */

// 사용자가 Dismiss 한 실패는 이 시간 동안 재알림하지 않는다(5초 폴러 재발화 무시).
// 그 뒤에도 계속 실패하면 다시 한 번 알린다(문제를 영영 숨기지 않음).
const DISMISS_COOLDOWN_MS = 10 * 60 * 1000;

const failKey = (scope?: string, orderNumber?: string) => `${scope || ''}|${orderNumber || ''}`;

const AutoPrintFailureBanner: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const [fail, setFail] = useState<{ orderNumber?: string; scope?: string; at: number } | null>(null);
  // key → suppress-until timestamp. Dismiss puts the current failure's key here.
  const dismissedRef = useRef<Map<string, number>>(new Map());
  // 현재 표시 중인 실패의 key — 같은 key 반복 이벤트로 불필요하게 리렌더하지 않기 위함.
  const shownKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const onFail = (e: any) => {
      const d = (e && e.detail) || {};
      const key = failKey(d.scope, d.orderNumber);
      const now = Date.now();

      // 만료된 dismiss 기록 정리(누수 방지).
      for (const [k, until] of dismissedRef.current) {
        if (until <= now) dismissedRef.current.delete(k);
      }

      // 사용자가 닫은 실패는 쿨다운 동안 무시(백그라운드 재시도는 계속되지만 UI 는 안 뜬다).
      const until = dismissedRef.current.get(key);
      if (until && now < until) return;

      // 이미 같은 실패를 표시 중이면 리렌더하지 않는다(동일 오류 = 하나의 알림).
      if (shownKeyRef.current === key) return;

      shownKeyRef.current = key;
      setFail({ orderNumber: d.orderNumber, scope: d.scope, at: now });
    };
    window.addEventListener('autoprint-failed', onFail as EventListener);
    return () => window.removeEventListener('autoprint-failed', onFail as EventListener);
  }, []);

  if (!fail) return null;

  const scopeLabel = fail.scope === 'bill'
    ? t('printFailBanner.scopeBill', 'Receipt')
    : t('printFailBanner.scopeKitchen', 'Kitchen');

  const closeBanner = () => {
    // 현재 실패 key 를 쿨다운 동안 억제 등록 → 다음 5초 재시도 이벤트가 배너를 다시 열지 않음.
    dismissedRef.current.set(failKey(fail.scope, fail.orderNumber), Date.now() + DISMISS_COOLDOWN_MS);
    shownKeyRef.current = null;
    setFail(null);
  };

  return (
    <div
      style={{
        // 하단 중앙 토스트 — 상단 내비게이션 버튼을 가리지 않는다(기존 top:0 full-width bar 회귀).
        position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)',
        width: 'calc(100vw - 32px)', maxWidth: 680, zIndex: 100020,
        background: '#FF6B6B', color: '#fff', padding: '12px 16px', borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        boxShadow: '0 6px 20px rgba(0,0,0,0.28)', fontSize: 15, fontWeight: 600
      }}
      role="alert"
    >
      <span style={{ fontSize: 18 }}>⚠</span>
      <span style={{ flex: 1, minWidth: 200 }}>
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
            closeBanner();
          }}
          style={{ background: '#fff', color: '#FF6B6B', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 700, cursor: 'pointer' }}
        >
          {t('printFailBanner.printerSettings', 'Printer Settings')}
        </button>
        <button
          onClick={closeBanner}
          style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.7)', borderRadius: 6, padding: '6px 12px', fontWeight: 700, cursor: 'pointer' }}
        >
          {t('printFailBanner.dismiss', 'Dismiss')}
        </button>
      </span>
    </div>
  );
};

export default AutoPrintFailureBanner;
