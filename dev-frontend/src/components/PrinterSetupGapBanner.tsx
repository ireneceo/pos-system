import React, { useEffect, useMemo, useRef, useState } from 'react';
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
// 2026-11-18 (Fable 설계 B2): 띠의 왼쪽 기준 = 본문 칸 왼쪽 끝. 사이드바(매장 전환·내 정보)를 덮지 않게
// 화면 왼쪽에 붙어 세로로 긴 메뉴 칸(nav)의 오른쪽 끝을 찾는다. 못 찾으면 예전처럼 16.
const contentLeft = (): number => {
  try {
    let right = 0;
    for (const el of Array.from(document.querySelectorAll('nav'))) {
      const r = el.getBoundingClientRect();
      if (r.left <= 1 && r.right > 40 && r.height > window.innerHeight * 0.5) right = Math.max(right, r.right);
    }
    // 하위 메뉴 창(사이드바 옆에 뜨는 창)이 열려 있으면 그 오른쪽으로 — 창 아래 항목(«프린터» 등)을 덮어
    // 알림이 대신 눌렸다(2026-11-18 Fable 검증 ①)
    for (const el of Array.from(document.querySelectorAll('[data-sec-popover]'))) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) right = Math.max(right, r.right);
    }
    return Math.round(right) + 16;
  } catch { return 16; }
};
const COMPACT_MAX = 1024; // 이 폭 이하(폰·태블릿)는 한 줄 알약으로 접어 둔다(Fable 설계 B1)

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
  const [left, setLeft] = useState(16);
  const [vw, setVw] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440));
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const tick = () => { setGaps(readGaps()); setNow(Date.now()); setLeft(contentLeft()); };
    const onResize = () => { setVw(window.innerWidth); setLeft(contentLeft()); };
    const id = window.setInterval(tick, POLL_MS);
    window.addEventListener('storage', tick);
    window.addEventListener('resize', onResize);
    const first = window.setTimeout(() => setLeft(contentLeft()), 300);
    // 하위 메뉴 창은 누르거나 마우스를 올리는 순간 열리므로 왼쪽 기준을 자주(0.4초) 다시 잰다 — 메뉴 칸 몇 개만 읽어 가볍다
    const fast = window.setInterval(() => setLeft((prev) => { const v = contentLeft(); return v === prev ? prev : v; }), 400);
    return () => { window.clearInterval(id); window.clearInterval(fast); window.clearTimeout(first); window.removeEventListener('storage', tick); window.removeEventListener('resize', onResize); };
  }, []);
  useEffect(() => { setGaps(readGaps()); setOpen(false); setLeft(contentLeft()); }, [pathname]);
  // 펼친 상자는 바깥을 누르면 다시 알약으로
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('touchstart', onDown); };
  }, [open]);

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

  const compact = vw <= COMPACT_MAX && !open;
  const leftPx = Math.min(left, Math.max(16, vw - 276));

  if (compact) {
    return (
      <button
        type="button"
        role="alert"
        data-testid="printer-gap-banner"
        data-compact="1"
        onClick={() => setOpen(true)}
        aria-expanded={false}
        style={{
          position: 'fixed', left: leftPx, bottom: 16, zIndex: 100010,
          maxWidth: 260, height: 40, boxSizing: 'border-box', display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#FFFBEB', color: '#92400E', border: '1px solid #FCD34D', borderRadius: 20,
          padding: '0 14px', boxShadow: '0 4px 14px rgba(0,0,0,0.16)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          whiteSpace: 'nowrap', overflow: 'hidden',
        }}
      >
        <span aria-hidden>●</span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {t('printerGap.pill', { count: gaps.length, defaultValue: 'No printer: {{count}} kitchen(s)' })}
        </span>
        <span aria-hidden>›</span>
      </button>
    );
  }

  return (
    <div
      ref={boxRef}
      role="alert"
      data-testid="printer-gap-banner"
      style={{
        position: 'fixed', left: vw <= COMPACT_MAX ? leftPx : left, bottom: 16, zIndex: 100010,
        width: `calc(100vw - ${(vw <= COMPACT_MAX ? leftPx : left) + 16}px)`, maxWidth: 440, boxSizing: 'border-box',
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
