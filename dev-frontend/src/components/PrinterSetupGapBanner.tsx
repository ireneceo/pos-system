import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { findPrinterSetupGaps, PrinterGap } from '../utils/printerSetupGaps';

/**
 * PrinterSetupGapBanner — «프린터가 안 정해진 주방» 을 매장 화면 어디서나 알린다 (2026-11-12 · 표시 전용).
 * Irene «설정 안된 거 있으면 정확히 알려줘서 미싱 못하게 해야 하고».
 *
 * - 판정 = utils/printerSetupGaps (인쇄 코드와 같은 규칙). 이 기기의 설정 사본(localStorage.printerSettings ·
 *   StoreContext 가 서버에서 받아 씀)을 5초마다 다시 읽는다. 인쇄 경로·🔒 보호 파일은 손대지 않는다.
 * - 관리자(RA·SA): «프린터 정하기» → 설정 › 프린터 §2. 직원: 관리자에게 부탁하라는 안내(직원은 설정 못 바꿈).
 * - 닫으면 1시간 뒤 다시 알린다(빠진 게 그대로면 영영 숨기지 않는다). 설정 › 프린터 화면에선 그 화면 상자가 대신 보여 준다.
 */

const DISMISS_KEY = 'printerGapDismissed';
const DISMISS_MS = 60 * 60 * 1000;
const POLL_MS = 5 * 1000; // StoreContext 가 서버에서 받아 사본을 쓰는 시점을 놓치지 않게(읽기만 — 가벼움)
const STAFF_ROUTE = /^\/(restaurant|pos)\//;

const readGaps = (): PrinterGap[] => {
  try {
    const raw = localStorage.getItem('printerSettings');
    if (!raw) return [];
    return findPrinterSetupGaps(JSON.parse(raw), localStorage.getItem('printerMode'));
  } catch { return []; }
};
const sigOf = (gaps: PrinterGap[]) => gaps.map((g) => (g.kind === 'station' ? `s${g.stationId}` : 'k')).join(',');
const readDismissed = (): { sig: string; until: number } | null => {
  try { const v = JSON.parse(localStorage.getItem(DISMISS_KEY) || 'null'); return v && typeof v.until === 'number' ? v : null; } catch { return null; }
};

const PrinterSetupGapBanner: React.FC = () => {
  const { t } = useTranslation('common');
  const { user } = useAuth();
  const { pathname, search } = useLocation();
  const [gaps, setGaps] = useState<PrinterGap[]>(readGaps);
  const [dismissed, setDismissed] = useState(readDismissed);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const tick = () => { setGaps(readGaps()); setNow(Date.now()); };
    const id = window.setInterval(tick, POLL_MS);
    window.addEventListener('storage', tick);
    return () => { window.clearInterval(id); window.removeEventListener('storage', tick); };
  }, []);
  useEffect(() => { setGaps(readGaps()); }, [pathname]);

  const sig = useMemo(() => sigOf(gaps), [gaps]);
  const rid = user?.restaurantId || (user as any)?.restaurant_id;
  const onPrinterTab = /\/settings/.test(pathname) && /tab=printer/.test(search);
  if (!user || !rid || gaps.length === 0 || !STAFF_ROUTE.test(pathname) || onPrinterTab) return null;
  if (dismissed && dismissed.sig === sig && now < dismissed.until) return null;

  const canEdit = user.role === 'Restaurant Admin' || user.role === 'System Admin';
  const names = gaps.map((g) => (g.kind === 'station' ? g.name : t('printerGap.kitchenMain', 'Kitchen'))).join(', ');
  const close = () => {
    const v = { sig, until: Date.now() + DISMISS_MS };
    try { localStorage.setItem(DISMISS_KEY, JSON.stringify(v)); } catch { /* blocked storage */ }
    setDismissed(v);
  };

  return (
    <div
      role="alert"
      data-testid="printer-gap-banner"
      style={{
        position: 'fixed', left: 16, bottom: 16, zIndex: 100010,
        width: 'calc(100vw - 32px)', maxWidth: 440, boxSizing: 'border-box',
        background: '#FFFBEB', color: '#92400E', border: '1px solid #FDE68A', borderRadius: 10,
        padding: '12px 14px', boxShadow: '0 6px 20px rgba(0,0,0,0.18)', fontSize: 14,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>
        <span aria-hidden style={{ marginRight: 6 }}>●</span>
        {t('printerGap.title', { names, count: gaps.length, defaultValue: 'No printer chosen: {{names}}' })}
      </div>
      <div style={{ lineHeight: 1.45 }}>
        {canEdit
          ? t('printerGap.bodyAdmin', 'Tickets for this kitchen will not print until you choose its printer.')
          : t('printerGap.bodyStaff', 'Tickets for this kitchen will not print. Only the restaurant admin can choose the printer — please tell them.')}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        <button
          type="button" onClick={close}
          style={{ background: 'transparent', color: '#92400E', border: '1px solid #FCD34D', borderRadius: 6, padding: '6px 12px', fontWeight: 600, cursor: 'pointer', minHeight: 36 }}
        >
          {t('printerGap.later', 'Remind me in 1 hour')}
        </button>
        {canEdit && (
          <button
            type="button" data-testid="printer-gap-fix"
            onClick={() => { window.location.href = `/restaurant/${rid}/settings?tab=printer#printer-sec-assign`; }}
            style={{ background: '#635BFF', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 700, cursor: 'pointer', minHeight: 36 }}
          >
            {t('printerGap.fix', 'Choose printer')}
          </button>
        )}
      </div>
    </div>
  );
};

export default PrinterSetupGapBanner;
