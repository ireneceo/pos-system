import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OrderCutoffBadge from './OrderCutoffBadge';
import {
  OrderWindows, CUTOFF_COLORS, cutoffState, cutoffWhen, deliveryDateLabel, intlLocale
} from '../../utils/orderCutoff';

/**
 * 발주하기 맨 위 «Order cutoffs» 요약 띠 (2026-10-27 Fable 설계 M-4 ①).
 *   - 오늘 마감(closing·today·오늘 마감 지남)인 판매자를 마감 시각 순 칩으로(closing 맨 앞)
 *   - 오늘 마감이 없으면 «No order cutoffs today» + 가장 가까운 다음 마감 1개
 *   - «All suppliers (N)» 펼침 → 일정 있는 모든 판매자의 다음 마감·배송일 표
 *   - 일정 있는 판매자가 0이면 아무것도 그리지 않는다
 */
export interface CutoffSeller { key: string; name: string; windows: OrderWindows | null | undefined }

interface Props { sellers: CutoffSeller[]; nowMs: number; storeTimeZone: string }

const OrderCutoffSummary: React.FC<Props> = ({ sellers, nowMs, storeTimeZone }) => {
  const { t, i18n } = useTranslation('purchaseOrders');
  const tt = t as unknown as (k: string, d: string, o?: Record<string, unknown>) => string;
  const locale = intlLocale(i18n.language);
  const [open, setOpen] = useState(false);

  const rows = useMemo(() => {
    const seen = new Set<string>();
    const out: Array<CutoffSeller & { st: NonNullable<ReturnType<typeof cutoffState>> }> = [];
    for (const s of sellers) {
      if (seen.has(s.key)) continue;
      seen.add(s.key);
      const st = cutoffState(s.windows, nowMs, storeTimeZone);
      if (st) out.push({ ...s, st });
    }
    return out.sort((a, b) => Date.parse(a.st.window.cutoff_at) - Date.parse(b.st.window.cutoff_at));
  }, [sellers, nowMs, storeTimeZone]);

  if (rows.length === 0) return null;
  const todays = rows.filter(r => r.st.level !== 'upcoming' || r.st.missedToday);
  const nearest = rows[0];
  const anyClosing = todays.some(r => r.st.level === 'closing');

  return (
    <section
      data-testid="order-cutoff-summary"
      style={{
        margin: '0 0 12px', padding: '10px 14px', borderRadius: 8, background: '#FFFFFF',
        border: `1px solid ${anyClosing ? '#FCA5A5' : todays.length ? '#FDE68A' : '#E6EBF1'}`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540' }}>{tt('orderCutoff.title', 'Order cutoffs')}</div>
        <button
          type="button" onClick={() => setOpen(o => !o)} aria-expanded={open}
          style={{ background: 'transparent', border: 'none', color: '#635BFF', cursor: 'pointer', fontSize: 12, padding: '4px 0', minHeight: 32 }}
        >
          {tt('orderCutoff.allSuppliers', 'All suppliers ({{count}})', { count: rows.length })} {open ? '▴' : '▾'}
        </button>
      </div>

      {todays.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
          {[...todays.filter(r => r.st.level === 'closing'), ...todays.filter(r => r.st.level !== 'closing')].map(r => (
            <OrderCutoffBadge key={r.key} windows={r.windows} nowMs={nowMs} storeTimeZone={storeTimeZone} sellerName={r.name} />
          ))}
        </div>
      ) : (
        <div style={{ marginTop: 6, fontSize: 12, color: '#475569' }}>
          {tt('orderCutoff.noneToday', 'No order cutoffs today')} ·{' '}
          {tt('orderCutoff.nearestNext', 'Next: {{seller}} {{when}}', {
            seller: nearest.name, when: cutoffWhen(nearest.st.window, nowMs, storeTimeZone, locale, tt)
          })}
        </div>
      )}

      {open && (
        <div style={{ marginTop: 10, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ color: '#6B7280', textAlign: 'left' }}>
                <th style={{ padding: '4px 8px 4px 0', fontWeight: 500 }}>{tt('orderCutoff.colSeller', 'Supplier')}</th>
                <th style={{ padding: '4px 8px', fontWeight: 500 }}>{tt('orderCutoff.colCutoff', 'Next cutoff')}</th>
                <th style={{ padding: '4px 0 4px 8px', fontWeight: 500 }}>{tt('orderCutoff.colDelivery', 'Delivery')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => {
                const col = CUTOFF_COLORS[r.st.level];
                return (
                  <tr key={r.key} style={{ borderTop: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '6px 8px 6px 0', color: '#0A2540', overflowWrap: 'anywhere' }}>{r.name}</td>
                    <td style={{ padding: '6px 8px', color: col.fg, fontWeight: col.bold ? 600 : 400, whiteSpace: 'nowrap' }}>
                      {cutoffWhen(r.st.window, nowMs, storeTimeZone, locale, tt)}
                    </td>
                    <td style={{ padding: '6px 0 6px 8px', color: '#475569' }}>
                      {r.st.window.delivery_from
                        ? deliveryDateLabel(r.st.window.delivery_from, locale)
                          + (r.st.window.delivery_to && r.st.window.delivery_to !== r.st.window.delivery_from
                            ? `–${deliveryDateLabel(r.st.window.delivery_to, locale)}` : '')
                        : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default OrderCutoffSummary;
