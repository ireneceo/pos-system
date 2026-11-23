import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import { StandardSelect as Select } from '../../components/UI/SelectComponents';
import { getAuthToken } from '../../utils/auth';
import { formatDateTime } from '../../utils/timezone';

/**
 * 구매자 환불 카드 — 결제된 주문의 반품 (2026-11-23 · Fable 설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §5-2)
 *   Irene «고객이 돌려보내거나 환불요청 하는 거 기능 정확히 하고 서로 승인하고 대응하게»
 *   pending «waiting for the seller» → sent «The seller sent X» + «Refund received» / «Not received» → confirmed
 *   외부(미가입) 공급업체는 판매자 로그인이 없어 pending 에서 바로 «Refund received».
 *   «현금으로 받음» 을 고르면 서버가 드로어에 넣는다(이 주문으로 드로어에서 나간 만큼까지).
 */

interface Props {
  poId: number;
  formatMoney: (n: number) => string;
  /** 바뀌면 다시 읽는다 */
  reloadKey?: unknown;
  onChanged?: () => void;
}

const Label = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #4B5563;
  margin-bottom: 8px;
`;
const NoteInput = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  min-height: 72px;
  resize: vertical;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;

const BuyerRefundCard: React.FC<Props> = ({ poId, formatMoney, reloadKey, onChanged }) => {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const [rows, setRows] = useState<any[]>([]);
  const [external, setExternal] = useState(false);
  const [confirmFor, setConfirmFor] = useState<any | null>(null);
  const [disputeFor, setDisputeFor] = useState<any | null>(null);
  const [method, setMethod] = useState('bank_transfer');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [drawerNote, setDrawerNote] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(`/api/purchase-orders/${poId}/refunds`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
      const d = await r.json();
      if (r.ok && d.success) { setRows(Array.isArray(d.data) ? d.data : []); setExternal(!!d.external_seller); }
    } catch { /* 표시용 */ }
  }, [poId]);
  useEffect(() => { load(); }, [load, reloadKey]);

  const methodText = (m?: string | null) => (m ? t(`detail.refunds.method.${m}`, m) as string : '');

  const post = async (url: string, body: any) => {
    setBusy(true); setError(null);
    try {
      const r = await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.success) { setError(d.message || (t('detail.refunds.failed', 'Could not save') as string)); return null; }
      return d;
    } catch { setError(t('detail.returns.networkError', 'Network error') as string); return null; }
    finally { setBusy(false); }
  };

  const submitConfirm = async () => {
    if (!confirmFor) return;
    const d = await post(`/api/purchase-orders/${poId}/refunds/${confirmFor.id}/confirm`, { received_method: method });
    if (!d) return;
    setConfirmFor(null);
    if (d.drawer_amount > 0) setDrawerNote(t('detail.refunds.drawerIn', '{{amount}} was put back into the cash drawer.', { amount: formatMoney(Number(d.drawer_amount)) }) as string);
    else if (d.drawerSkipped) setDrawerNote(t('detail.refunds.drawerSkipped', 'No shift is open, so the cash drawer was not changed.') as string);
    load(); onChanged?.();
  };
  const submitDispute = async () => {
    if (!disputeFor || note.trim().length < 3) return;
    const d = await post(`/api/purchase-orders/${poId}/refunds/${disputeFor.id}/dispute`, { note: note.trim() });
    if (!d) return;
    setDisputeFor(null); load(); onChanged?.();
  };

  if (!rows.length) return null;

  return (
    <div data-testid="buyer-refund-card" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 8, padding: '12px 16px', marginBottom: 16, fontSize: 14, color: '#1E3A8A', lineHeight: 1.6 }}>
      <strong>{t('detail.refunds.title', 'Refunds for returned items')}</strong>
      <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
        {rows.map(r => {
          const canConfirm = r.status === 'sent' || (external && r.status === 'pending');
          return (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', background: '#fff', border: '1px solid #DBEAFE', borderRadius: 6, padding: '8px 12px' }}>
              <div style={{ flex: 1, minWidth: 180, fontSize: 13, color: '#374151' }}>
                <div style={{ fontWeight: 600, color: '#111827' }}>{formatMoney(Number(r.amount))}</div>
                {r.status === 'pending' && !external && <div>{t('detail.refunds.waiting', 'Waiting for the seller to send it')}</div>}
                {r.status === 'pending' && external && <div>{t('detail.refunds.externalHint', 'Mark it received once the supplier pays you back.')}</div>}
                {r.status === 'sent' && (
                  <div>
                    {t('detail.refunds.sentLine', 'The seller sent it {{date}} by {{method}}', { date: r.sent_at ? formatDateTime(r.sent_at) : '', method: methodText(r.method) })}
                    {r.reference ? ` · ${t('detail.refunds.ref', 'ref')} ${r.reference}` : ''}
                    {r.note ? <div style={{ color: '#6B7280' }}>{r.note}</div> : null}
                  </div>
                )}
                {r.status === 'confirmed' && <div style={{ color: '#065F46' }}>{t('detail.refunds.confirmedLine', 'You confirmed receiving it {{date}}', { date: r.confirmed_at ? formatDateTime(r.confirmed_at) : '' })}</div>}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {canConfirm && (
                  <ThemedButton size="small" variant="primary" onClick={() => { setMethod(r.method === 'cash' ? 'cash' : 'bank_transfer'); setError(null); setConfirmFor(r); }}>
                    {t('detail.refunds.received', 'Refund received')}
                  </ThemedButton>
                )}
                {r.status === 'sent' && (
                  <ThemedButton size="small" variant="outline" onClick={() => { setNote(''); setError(null); setDisputeFor(r); }}>
                    {t('detail.refunds.notReceived', 'Not received')}
                  </ThemedButton>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {drawerNote && <div style={{ fontSize: 13, color: '#065F46', marginTop: 8 }}>{drawerNote}</div>}
      {error && !confirmFor && !disputeFor && <div style={{ fontSize: 13, color: '#DC2626', marginTop: 8 }}>{error}</div>}

      <Modal
        isOpen={!!confirmFor}
        onClose={() => setConfirmFor(null)}
        title={t('detail.refunds.receivedTitle', 'Refund received') as string}
        size="small"
        footer={
          <>
            <ThemedButton variant="outline" onClick={() => setConfirmFor(null)} disabled={busy}>{t('common:cancel', 'Cancel')}</ThemedButton>
            <ThemedButton variant="primary" onClick={submitConfirm} disabled={busy}>{t('detail.refunds.received', 'Refund received')}</ThemedButton>
          </>
        }
      >
        {confirmFor && (
          <div>
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
              {t('detail.refunds.receivedHint', 'Confirm you got {{amount}} back. If it came in cash, it goes back into the cash drawer.', { amount: formatMoney(Number(confirmFor.amount)) })}
            </p>
            <Label>{t('detail.refunds.receivedHow', 'How did you get it?')}</Label>
            <Select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="bank_transfer">{methodText('bank_transfer')}</option>
              <option value="cash">{t('detail.refunds.method.cashDrawer', 'Cash (into the drawer)')}</option>
              <option value="other">{methodText('other')}</option>
            </Select>
            {error && <div style={{ color: '#DC2626', fontSize: 13, marginTop: 8 }}>{error}</div>}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!disputeFor}
        onClose={() => setDisputeFor(null)}
        title={t('detail.refunds.notReceivedTitle', 'Refund not received') as string}
        size="small"
        footer={
          <>
            <ThemedButton variant="outline" onClick={() => setDisputeFor(null)} disabled={busy}>{t('common:cancel', 'Cancel')}</ThemedButton>
            <ThemedButton variant="primary" onClick={submitDispute} disabled={busy || note.trim().length < 3}>{t('detail.refunds.tellSeller', 'Tell the seller')}</ThemedButton>
          </>
        }
      >
        {disputeFor && (
          <div>
            <Label>{t('detail.refunds.whatHappened', 'What happened? (required)')}</Label>
            <NoteInput value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('detail.refunds.whatPlaceholder', 'e.g. Nothing has arrived in our bank account yet') as string} />
            {error && <div style={{ color: '#DC2626', fontSize: 13, marginTop: 8 }}>{error}</div>}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BuyerRefundCard;
