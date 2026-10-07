/**
 * InvoiceModificationHistory — 청구서 수정 이력 (2026-10-07 Fable 판정 D5 · docs/PURCHASE_ORDER_SYSTEM.md §8-7)
 *
 * invoices.modification_history 를 그대로 그린다 — 청구서 직접 수정(PUT /api/invoices/:id)과
 * 총액 수정(대조, source:'reconcile')이 같은 칸·같은 모양으로 적는다.
 * 한 줄 = 시각(매장 타임존) · 이름 · 총액 from → to · 사유. 매장 관리자·오너 청구서 상세가 같이 쓴다.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateTime } from '../../utils/timezone';
import { formatCurrency } from '../../utils/currency';

interface Props {
  history?: any[] | null;
  currency?: string;
  /** 매장 타임존 — operationSettings.timeZone */
  timeZone?: string | null;
}

export default function InvoiceModificationHistory({ history, currency = 'MYR', timeZone }: Props) {
  const { t } = useTranslation(['settings']);
  const rows = Array.isArray(history) ? history : [];
  if (rows.length === 0) return null;

  const money = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? formatCurrency(n, currency) : String(v ?? '-');
  };
  const tzSettings = timeZone ? { timeZone } : undefined;

  return (
    <div style={{ marginTop: 16, marginBottom: 16, padding: 16, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#4B5563', marginBottom: 10, textTransform: 'uppercase' }}>
        {t('settings:invoicesPage.history.title', 'Change history')}
      </div>
      {/* 최근 것이 위 */}
      {[...rows].reverse().map((mod: any, idx: number, arr: any[]) => {
        const ts = mod.modified_at || mod.timestamp;
        const who = mod.modified_by_name || t('settings:invoicesPage.history.system', 'System');
        const isLast = idx === arr.length - 1;
        const changes = mod.changes && typeof mod.changes === 'object' ? Object.entries(mod.changes) : [];
        return (
          <div key={idx} style={{ fontSize: 12.5, color: '#334155', paddingBottom: isLast ? 0 : 10, marginBottom: isLast ? 0 : 10, borderBottom: isLast ? 'none' : '1px solid #E2E8F0' }}>
            <div style={{ fontWeight: 600, color: '#0A2540' }}>
              {ts ? formatDateTime(ts, tzSettings) : ''}{` · ${who}`}
            </div>
            {changes.map(([field, change]: [string, any]) => (
              <div key={field} style={{ marginTop: 2 }}>
                {field === 'total_amount'
                  ? <>{t('settings:invoicesPage.history.total', 'Total')}: {money(change?.from)} → <strong>{money(change?.to)}</strong></>
                  : <>{field}: {String(change?.from ?? '-')} → {String(change?.to ?? '-')}</>}
              </div>
            ))}
            {mod.reason && <div style={{ marginTop: 2, color: '#6B7280' }}>{mod.reason}</div>}
          </div>
        );
      })}
    </div>
  );
}
