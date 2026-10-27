import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  OrderWindows, CUTOFF_COLORS, cutoffState, cutoffWhen, cutoffClock, deliveryText, durationText, intlLocale
} from '../../utils/orderCutoff';

/**
 * 판매자 발주 마감 한 줄 (2026-10-27 Fable 설계 M-4) — 발주하기 묶음 머리 · 발주 대기 카드 · 오너 승인 대기 공용.
 *   closing(2시간 이내) 빨강 · today 주황 굵게 · upcoming 회색. 오늘 마감을 놓쳤으면 앞에 «지남».
 *   시계는 페이지가 1분 간격 하나로 돌리고 nowMs 로 내려 준다(배지마다 타이머 금지).
 *   일정이 없으면 아무것도 그리지 않는다(«마감 없음» 이라고 쓰지 않는다).
 */
interface Props {
  windows: OrderWindows | null | undefined;
  nowMs: number;
  storeTimeZone: string;
  /** 앞에 판매자 이름을 붙인다(요약 띠 칩) */
  sellerName?: string;
  style?: React.CSSProperties;
}

const OrderCutoffBadge: React.FC<Props> = ({ windows, nowMs, storeTimeZone, sellerName, style }) => {
  const { t, i18n } = useTranslation('purchaseOrders');
  const st = cutoffState(windows, nowMs, storeTimeZone);
  if (!st || !windows) return null;
  const tt = t as unknown as (k: string, d: string, o?: Record<string, unknown>) => string;
  const locale = intlLocale(i18n.language);
  const col = CUTOFF_COLORS[st.level];
  const when = cutoffWhen(st.window, nowMs, storeTimeZone, locale, tt);
  const sellerTz = windows.timezone && windows.timezone !== storeTimeZone ? ` ${tt('orderCutoff.sellerTz', '({{tz}})', { tz: windows.timezone })}` : '';
  const main = st.level === 'upcoming'
    ? tt('orderCutoff.nextCutoff', 'Next cutoff {{when}}', { when: when + sellerTz })
    : tt('orderCutoff.orderBy', 'Order by {{when}}', { when: when + sellerTz });
  const parts = [main];
  if (st.level === 'closing') parts.push(tt('orderCutoff.closesIn', 'closes in {{duration}}', { duration: durationText(st.minutesLeft, tt) }));
  const dv = deliveryText(st.window, locale, tt);
  if (dv) parts.push(dv);

  return (
    <span
      data-cutoff-level={st.level}
      style={{
        display: 'inline-flex', flexWrap: 'wrap', alignItems: 'baseline', gap: 4, maxWidth: '100%',
        fontSize: 12, lineHeight: 1.4, padding: col.bg ? '2px 8px' : 0, borderRadius: 4,
        background: col.bg || 'transparent', color: col.fg, fontWeight: col.bold ? 600 : 400,
        overflowWrap: 'anywhere', ...style
      }}
    >
      {sellerName && <span style={{ color: '#0A2540', fontWeight: 600 }}>{sellerName}:</span>}
      {st.missedToday && st.missedAt && (
        <span style={{ color: CUTOFF_COLORS.missed.fg, fontWeight: 400 }}>
          {tt('orderCutoff.passedToday', "Today's cutoff passed ({{time}})", { time: cutoffClock(st.missedAt, storeTimeZone, locale) })} —
        </span>
      )}
      <span>{parts.join(' · ')}</span>
    </span>
  );
};

/** 페이지에 하나 — 1분마다 현재 시각(ms). 배지들은 이 값만 받는다. */
export function useMinuteNow(): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export default OrderCutoffBadge;
