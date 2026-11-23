import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';

/**
 * 판매자 주문 취소 창 (2026-11-23 · Fable 설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §5-1)
 *   Irene «주문 삭제하는 게 없어. 배송완료해도 수정이나 삭제가 필요한 경우 해야 해. 인보이스도 같이 바뀌어야 하고 결제 안된 건.»
 *   - 무엇이 일어나는지 서버 값으로(해당하는 것만): 청구서 취소 · 보낸 품목 재고 복귀 · 구매자 재고 차감
 *   - 사유 필수 → 확인 창 → POST /api/seller-orders/:id/cancel
 *   - 판정(결제된 주문 막기 등)은 서버 can_cancel / cancel_blocked 그대로 — 화면이 상태 목록을 복사하지 않는다
 */

export interface SellerCancelTarget {
  id: number;
  po_number?: string;
  currency?: string;
}

interface Props {
  target: SellerCancelTarget | null;
  onClose: () => void;
  onDone: (message: string) => void;
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
const ReasonInput = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  color: #4B5563;
  padding: 4px 0;
`;

const SellerCancelModal: React.FC<Props> = ({ target, onClose, onDone, tNs, formatMoney }) => {
  const [loading, setLoading] = useState(false);
  const [po, setPo] = useState<any>(null);
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currency = target?.currency;

  useEffect(() => {
    if (!target) return;
    let alive = true;
    setLoading(true); setError(null); setPo(null); setReason('');
    (async () => {
      try {
        const res = await fetch(`/api/seller-orders/${target.id}`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
        const data = await res.json();
        if (alive) setPo(data?.data || null);
      } catch (e) {
        if (alive) setError('Network error');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [target]);

  const items: any[] = Array.isArray(po?.items) ? po.items : [];
  const shippedCount = items.filter(l => !!l.shipped_at || (!!po?.shipped_at && !items.some(x => x.shipped_at))).length;
  const receivedAny = items.some(l => (Number(l.quantity_received) || 0) > 0);
  const invoice = po?.trade_invoice && po.trade_invoice.status !== 'cancelled' ? po.trade_invoice : null;
  const canCancel = !!po?.can_cancel;
  const blocked = po?.cancel_blocked as { code: string; message: string } | null | undefined;
  const canSave = canCancel && !loading && !submitting && reason.trim().length >= 3;

  const submit = async () => {
    if (!target || !canSave) return;
    setSubmitting(true); setError(null);
    try {
      const res = await fetch(`/api/seller-orders/${target.id}/cancel`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: reason.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) { setError(tNs(`orders.cancel.blocked.${data.code}`, data.message || 'Failed to cancel order')); return; }
      const inv = data?.cancellation?.invoice;
      onDone(inv
        ? tNs('orders.cancel.doneInvoice', 'Order {{po}} cancelled. Invoice {{number}} was cancelled too.', { po: target.po_number || '', number: inv.invoice_number })
        : tNs('orders.cancel.done', 'Order {{po}} cancelled.', { po: target.po_number || '' }));
    } catch (e) {
      setError('Network error');
    } finally {
      setSubmitting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={!!target}
        onClose={onClose}
        title={tNs('orders.cancel.title', 'Cancel order')}
        size="medium"
        footer={
          <>
            <ThemedButton variant="outline" onClick={onClose} disabled={submitting}>
              {tNs('orders.cancel.keep', 'Keep order')}
            </ThemedButton>
            <ThemedButton variant="danger" onClick={() => setConfirmOpen(true)} disabled={!canSave}>
              {tNs('orders.cancel.submit', 'Cancel order')}
            </ThemedButton>
          </>
        }
      >
        {loading ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#6B7280', fontSize: 14 }}>{tNs('orders.amend.loading', 'Loading…')}</div>
        ) : (
          <div data-testid="seller-cancel-modal">
            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: '12px 14px', margin: '0 0 16px' }}>
              <Row><span>{tNs('orders.cancel.order', 'Order')}</span><strong style={{ color: '#111827' }}>{po?.po_number || target?.po_number}</strong></Row>
              {po?.buyer?.name && <Row><span>{tNs('orders.cancel.buyer', 'Buyer')}</span><span style={{ color: '#111827' }}>{po.buyer.name}</span></Row>}
              <Row><span>{tNs('orders.cancel.total', 'Total')}</span><strong style={{ color: '#111827' }}>{formatMoney(po?.total_amount, currency)}</strong></Row>
            </div>

            {!canCancel && blocked && (
              <div style={{ color: '#DC2626', fontSize: 13, margin: '0 0 12px', lineHeight: 1.6 }}>
                {tNs(`orders.cancel.blocked.${blocked.code}`, blocked.message)}
              </div>
            )}

            {canCancel && (
              <>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0A2540', marginBottom: 6 }}>{tNs('orders.cancel.whatHappens', 'What happens')}</div>
                <ul style={{ margin: '0 0 16px', paddingLeft: 18, fontSize: 13, color: '#374151', lineHeight: 1.8 }}>
                  <li>{tNs('orders.cancel.stays', 'The order stays in the Cancelled tab with your reason — it is not erased.')}</li>
                  {invoice && <li>{tNs('orders.cancel.invoiceCancelled', 'Invoice {{number}} ({{total}}) will be cancelled — the buyer owes nothing for this order.', { number: invoice.invoice_number, total: formatMoney(invoice.total_amount, currency) })}</li>}
                  {shippedCount > 0 && <li>{tNs('orders.cancel.stockBack', '{{n}} dispatched item(s) go back into your stock.', { n: shippedCount })}</li>}
                  {receivedAny && <li>{tNs('orders.cancel.buyerStock', 'The buyer already received this order — their stock will be reduced.')}</li>}
                  <li>{tNs('orders.cancel.mail', 'The buyer is told by email.')}</li>
                </ul>
                <div style={{ marginBottom: 12 }}>
                  <Label>{tNs('orders.correct.reason', 'Reason (required)')}</Label>
                  <ReasonInput
                    rows={3}
                    placeholder={tNs('orders.cancel.reasonPlaceholder', 'e.g. Duplicate order — the buyer ordered twice') as string}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
              </>
            )}
            {error && <div style={{ color: '#DC2626', fontSize: 13 }}>{error}</div>}
          </div>
        )}
      </Modal>
      <ConfirmModal
        isOpen={confirmOpen}
        title={tNs('orders.cancel.confirmTitle', 'Cancel order {{po}}?', { po: po?.po_number || target?.po_number || '' })}
        message={tNs('orders.cancel.confirmBody', 'This cannot be undone. To deliver it again later, add a new order.')}
        confirmText={submitting ? '…' : tNs('orders.cancel.submit', 'Cancel order')}
        cancelText={tNs('orders.cancel.keep', 'Keep order')}
        type="danger"
        onConfirm={submit}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default SellerCancelModal;
