import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { getAuthToken } from '../../utils/auth';
import { formatDateTime } from '../../utils/timezone';
import { StandardSelect as Select } from '../../components/UI/SelectComponents';

/**
 * 판매자 환불 칸 — 결제된 주문의 반품 (2026-11-23 · Fable 설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §5-1)
 *   Irene «고객이 돌려보내거나 환불요청 하는 거 기능 정확히 하고 서로 승인하고 대응하게»
 *   pending «Refund due» + «Mark refund sent» → sent «waiting for buyer» → confirmed
 *   구매자가 «못 받았음» 이면 pending 으로 돌아오고 그 사유를 호박색으로 보여 준다.
 *   돈은 시스템 밖에서 오간다(이체·현금) — 여기는 사실만 적는다.
 */

interface Props {
  poId: number;
  currency?: string;
  /** 바뀌면 다시 읽는다(반품 승인 뒤 등) */
  reloadKey?: unknown;
  onChanged?: () => void;
  tNs: (key: string, fallback?: string, vars?: Record<string, string | number>) => string;
  formatMoney: (amount: number | string | null | undefined, currency?: string) => string;
}

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
`;
const Field = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const METHODS = ['bank_transfer', 'cash', 'other'] as const;

const lastDispute = (r: any): string | null => {
  const h = Array.isArray(r?.history) ? r.history : [];
  const last = h[h.length - 1];
  return r?.status === 'pending' && last?.event === 'disputed' ? (last.note || '') : null;
};

const SellerRefundPanel: React.FC<Props> = ({ poId, currency, reloadKey, onChanged, tNs, formatMoney }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [sendFor, setSendFor] = useState<any | null>(null);
  const [method, setMethod] = useState<string>('bank_transfer');
  const [reference, setReference] = useState('');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/seller-orders/${poId}/refunds`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const d = await r.json();
      if (r.ok && d.success) setRows(Array.isArray(d.data) ? d.data : []);
    } catch { /* 표시용 */ }
  }, [poId]);
  useEffect(() => { load(); }, [load, reloadKey]);

  const openSend = (r: any) => { setSendFor(r); setMethod('bank_transfer'); setReference(''); setNote(''); setError(null); };
  const submitSent = async () => {
    if (!sendFor) return;
    setSubmitting(true); setError(null);
    try {
      const r = await fetch(`/api/seller-orders/${poId}/refunds/${sendFor.id}/sent`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ method, reference: reference.trim() || null, note: note.trim() || null })
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.success) { setError(d.message || 'Failed'); return; }
      setSendFor(null); load(); onChanged?.();
    } catch { setError('Network error'); } finally { setSubmitting(false); }
  };

  if (!rows.length) return null;
  const methodText = (m?: string | null) => (m ? tNs(`orders.refunds.method.${m}`, m) : '');

  return (
    <div data-testid="seller-refund-panel">
      <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', marginBottom: 8 }}>{tNs('orders.refunds.title', 'Refunds')}</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {rows.map((r) => {
          const disputed = lastDispute(r);
          const tone = r.status === 'confirmed' ? { bg: '#ECFDF5', fg: '#065F46' } : r.status === 'sent' ? { bg: '#EFF6FF', fg: '#1E40AF' } : { bg: '#FEF3C7', fg: '#92400E' };
          return (
            <div key={r.id} style={{ padding: 12, border: '1px solid #C7CED6', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0A2540' }}>{formatMoney(r.amount, currency)}</div>
                {r.status === 'sent' && (
                  <div style={{ fontSize: 12, color: '#4B5563', marginTop: 2 }}>
                    {tNs('orders.refunds.sentLine', 'Sent {{date}} by {{method}}', { date: r.sent_at ? formatDateTime(r.sent_at) : '', method: methodText(r.method) })}
                    {r.reference ? ` · ${tNs('orders.refunds.ref', 'ref')} ${r.reference}` : ''}
                  </div>
                )}
                {r.status === 'confirmed' && (
                  <div style={{ fontSize: 12, color: '#065F46', marginTop: 2 }}>
                    {tNs('orders.refunds.confirmedLine', 'Buyer confirmed receipt {{date}}', { date: r.confirmed_at ? formatDateTime(r.confirmed_at) : '' })}
                  </div>
                )}
                {disputed != null && (
                  <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F59E0B', borderRadius: '0 6px 6px 0', color: '#92400E', fontSize: 12, padding: '6px 10px', marginTop: 6 }}>
                    {tNs('orders.refunds.disputed', 'Buyer reports not received: {{note}}', { note: disputed })}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: tone.bg, color: tone.fg }}>
                  {r.status === 'confirmed' ? tNs('orders.refunds.status.confirmed', 'Refund confirmed')
                    : r.status === 'sent' ? tNs('orders.refunds.status.sent', 'Sent · waiting for buyer')
                      : tNs('orders.refunds.status.pending', 'Refund due')}
                </span>
                {r.status === 'pending' && (
                  <ThemedButton size="small" variant="primary" onClick={() => openSend(r)}>
                    {tNs('orders.refunds.markSent', 'Mark refund sent')}
                  </ThemedButton>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={!!sendFor}
        onClose={() => setSendFor(null)}
        title={tNs('orders.refunds.sendTitle', 'Mark refund sent')}
        size="small"
        footer={
          <>
            <ThemedButton variant="outline" onClick={() => setSendFor(null)} disabled={submitting}>{tNs('orders.correct.cancel', 'Cancel')}</ThemedButton>
            <ThemedButton variant="primary" onClick={submitSent} disabled={submitting}>{tNs('orders.refunds.markSent', 'Mark refund sent')}</ThemedButton>
          </>
        }
      >
        {sendFor && (
          <div>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
              {tNs('orders.refunds.sendHint', 'Pay {{amount}} back to the buyer outside the system first, then record it here. The buyer confirms when it arrives.', { amount: formatMoney(sendFor.amount, currency) })}
            </p>
            <div style={{ marginBottom: 12 }}>
              <Label>{tNs('orders.refunds.methodLabel', 'How did you pay it back?')}</Label>
              <Select value={method} onChange={(e) => setMethod(e.target.value)}>
                {METHODS.map(m => <option key={m} value={m}>{methodText(m)}</option>)}
              </Select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <Label>{tNs('orders.refunds.referenceLabel', 'Reference (optional)')}</Label>
              <Field value={reference} maxLength={100} placeholder={tNs('orders.refunds.referencePlaceholder', 'e.g. bank transfer number') as string} onChange={(e) => setReference(e.target.value)} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <Label>{tNs('orders.refunds.noteLabel', 'Note to the buyer (optional)')}</Label>
              <Field value={note} maxLength={500} onChange={(e) => setNote(e.target.value)} />
            </div>
            {error && <div style={{ color: '#DC2626', fontSize: 13 }}>{error}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SellerRefundPanel;
