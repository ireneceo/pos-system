import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../../components/UI';
import { ThemedButton } from '../../components/Theme/ThemedButton';
import ConfirmModal from '../../components/ConfirmModal';
import { getAuthToken } from '../../utils/auth';
import { lineQtyText } from '../../utils/unitConversion';
import { supplierFacingName } from '../../utils/poShare';

/**
 * 판매자 직접 반품 창 (2026-11-17 · Fable 설계 .claude/fable-design-20261117-po-returns-seller-and-deduct.md §5-1)
 *   Irene «incoming-orders 여기에서 아이템 한개씩 또는 주문 전체 반품 처리할 수 있어야 해»
 *   - 줄마다 반품 수량(최대 = 서버 returnable_qty) · «주문 전체» 는 모든 줄을 반품 가능 수량으로 채운다
 *   - 저장 = POST /api/seller-orders/:id/returns (넣는 즉시 처리 · 청구서에서 금액이 빠짐)
 *   - 2026-11-23 결제된 주문(return_settlement 'refund') = 청구서 그대로 · 환불할 금액이 생김(SellerRefundPanel 에서 «보냄»)
 *   - 판정(결제된 주문 막기 등)은 서버 can_return / return_blocked 그대로 — 화면이 상태 목록을 복사하지 않는다
 */

export interface SellerReturnTarget {
  id: number;
  po_number?: string;
  currency?: string;
}

interface ReturnLine {
  id: number;
  description?: string | null;
  seller_product_name?: string | null;
  ingredient?: { name?: string } | null;
  ingredient_id?: number | null;
  unit?: string | null;
  unit_price?: number | string | null;
  quantity_ordered: number | string;
  quantity_received?: number | string | null;
  returned_qty?: number;
  return_pending_qty?: number;
  returnable_qty?: number;
  base_quantity?: number | string | null;
  base_unit?: string | null;
}

interface Props {
  target: SellerReturnTarget | null;
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
const NumInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border: 1px solid #C7CED6;
  border-radius: 6px;
  font-size: 14px;
  &:focus { outline: none; border-color: #635BFF; box-shadow: 0 0 0 3px rgba(99,91,255,0.1); }
  &:disabled { background: #F9FAFB; color: #6B7280; cursor: not-allowed; }
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

const round2 = (n: number) => Math.round(n * 100) / 100;

const SellerReturnModal: React.FC<Props> = ({ target, onClose, onDone, tNs, formatMoney }) => {
  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState<ReturnLine[]>([]);
  const [qty, setQty] = useState<Record<number, string>>({});
  const [reason, setReason] = useState('');
  const [canReturn, setCanReturn] = useState(false);
  const [blocked, setBlocked] = useState<{ code: string; message: string } | null>(null);
  const [invoice, setInvoice] = useState<{ invoice_number: string; total_amount: number | string } | null>(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  // 결제된 주문 = 청구서에서 못 빼고 환불로 (2026-11-23 · 서버 return_settlement)
  const [settlement, setSettlement] = useState<'deduct' | 'refund' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currency = target?.currency;

  useEffect(() => {
    if (!target) return;
    let alive = true;
    setLoading(true); setError(null); setLines([]); setQty({}); setReason(''); setInvoice(null); setDeliveryFee(0); setSettlement(null);
    (async () => {
      try {
        const res = await fetch(`/api/seller-orders/${target.id}`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
        const data = await res.json();
        if (!alive) return;
        const d = data?.data || {};
        setLines(Array.isArray(d.items) ? d.items : []);
        setCanReturn(!!d.can_return);
        setBlocked(d.return_blocked || null);
        setInvoice(d.trade_invoice || null);
        setDeliveryFee(Number(d.delivery_fee) || 0);
        setSettlement(d.return_settlement || null);
      } catch (e) {
        if (alive) setError('Network error');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [target]);

  const maxOf = (l: ReturnLine) => Number(l.returnable_qty) || 0;
  const qOf = (l: ReturnLine) => { const v = parseFloat(qty[l.id] ?? ''); return Number.isFinite(v) ? v : 0; };
  const overOf = (l: ReturnLine) => qOf(l) > maxOf(l) + 0.0005;
  const badOf = (l: ReturnLine) => qOf(l) < 0 || overOf(l);
  const chosen = lines.filter(l => qOf(l) > 0 && !badOf(l));
  const total = round2(chosen.reduce((s, l) => s + round2(qOf(l) * (Number(l.unit_price) || 0)), 0));
  const nothingReceived = lines.length > 0 && lines.every(l => (Number(l.quantity_received) || 0) <= 0);
  const nothingLeft = lines.length > 0 && lines.every(l => maxOf(l) <= 0);
  const canSave = canReturn && !loading && !submitting && chosen.length > 0 && !lines.some(badOf) && reason.trim().length >= 3;
  const isRefund = settlement === 'refund';
  const invBefore = invoice && !isRefund ? Number(invoice.total_amount) || 0 : null;
  const invAfter = invBefore != null ? Math.max(0, round2(invBefore - total)) : null;

  const fillAll = () => setQty(Object.fromEntries(lines.map(l => [l.id, maxOf(l) > 0 ? String(maxOf(l)) : ''])));
  const clearAll = () => setQty({});

  const submit = async () => {
    if (!target || !canSave) return;
    setSubmitting(true); setError(null);
    try {
      const res = await fetch(`/api/seller-orders/${target.id}/returns`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getAuthToken()}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: chosen.map(l => ({ purchase_order_item_id: l.id, quantity: qOf(l) })), reason: reason.trim() })
      });
      const data = await res.json();
      if (!res.ok || !data.success) { setError(data.message || 'Failed to process return'); return; }
      const inv = data?.data?.deduction?.invoice;
      const rf = data?.data?.refund;
      onDone(rf
        ? tNs('orders.returns.doneRefund', 'Return processed. Refund {{amount}} is due to the buyer — mark it sent once you pay it back.', { amount: formatMoney(rf.amount, currency) })
        : inv
        ? tNs('orders.returns.doneInvoice', 'Return processed. Invoice {{number}} is now {{total}}.', { number: inv.invoice_number, total: formatMoney(inv.total_after, currency) })
        : tNs('orders.returns.done', 'Return processed.'));
    } catch (e) {
      setError('Network error');
    } finally {
      setSubmitting(false);
      setConfirmOpen(false);
    }
  };

  const nameOf = (l: ReturnLine) => l.seller_product_name || supplierFacingName(l.ingredient?.name || l.description || `#${l.ingredient_id}`);

  return (
    <>
      <Modal
        isOpen={!!target}
        onClose={onClose}
        title={tNs('orders.returns.sellerTitle', 'Return items')}
        size="large"
        footer={
          <>
            <ThemedButton variant="outline" onClick={onClose} disabled={submitting}>
              {tNs('orders.correct.cancel', 'Cancel')}
            </ThemedButton>
            <ThemedButton variant="primary" onClick={() => setConfirmOpen(true)} disabled={!canSave}>
              {tNs('orders.returns.submit', 'Process return')}
            </ThemedButton>
          </>
        }
      >
        {loading ? (
          <div style={{ padding: 24, textAlign: 'center', color: '#6B7280', fontSize: 14 }}>{tNs('orders.amend.loading', 'Loading…')}</div>
        ) : (
          <div data-testid="seller-return-modal">
            <p style={{ margin: '0 0 16px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
              {isRefund
                ? tNs('orders.returns.sellerHintRefund', "This order is paid. Enter what the buyer sent back — stock moves back, and the amount becomes a refund you send to the buyer. The paid invoice stays as it is.")
                : tNs('orders.returns.sellerHint', "Enter what the buyer sent back. The buyer's stock goes down, your stock comes back, and the amount is taken off the invoice.")}
            </p>
            {!canReturn && blocked && (
              <div style={{ color: '#DC2626', fontSize: 13, margin: '0 0 12px' }}>{tNs(`orders.returns.blocked.${blocked.code}`, blocked.message)}</div>
            )}
            {canReturn && nothingReceived && (
              <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F59E0B', borderRadius: '0 8px 8px 0', color: '#92400E', fontSize: 13, padding: '10px 14px', margin: '0 0 16px', lineHeight: 1.6 }}>
                {tNs('orders.returns.notReceived', 'The buyer has not received this order yet — use Correct quantities instead.')}
              </div>
            )}
            {canReturn && !nothingReceived && nothingLeft && (
              <div style={{ color: '#6B7280', fontSize: 13, margin: '0 0 12px' }}>{tNs('orders.returns.allReturned', 'Everything received on this order has already been returned.')}</div>
            )}

            {canReturn && !nothingLeft && (
              <div style={{ display: 'flex', gap: 8, margin: '0 0 8px', flexWrap: 'wrap' }}>
                <ThemedButton size="small" variant="outline" onClick={fillAll} data-testid="seller-return-all">
                  {tNs('orders.returns.returnAll', 'Return entire order')}
                </ThemedButton>
                <ThemedButton size="small" variant="outline" onClick={clearAll}>
                  {tNs('orders.returns.clear', 'Clear')}
                </ThemedButton>
              </div>
            )}

            {lines.map((l) => {
              const max = maxOf(l);
              const already = (Number(l.returned_qty) || 0) + (Number(l.return_pending_qty) || 0);
              const amt = badOf(l) ? 0 : round2(qOf(l) * (Number(l.unit_price) || 0));
              return (
                <div key={l.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ flex: '2 1 200px', minWidth: 0 }}>
                    <Label>{tNs('orders.correct.item', 'Item')}</Label>
                    <div style={{ fontSize: 14, color: '#111827', paddingBottom: 8 }}>{nameOf(l)}</div>
                  </div>
                  <div style={{ flex: '0 1 110px' }}>
                    <Label>{tNs('orders.returns.received', 'Received')}</Label>
                    <div style={{ fontSize: 14, color: '#6B7280', paddingBottom: 8 }}>{lineQtyText(l as any, l.quantity_received || 0)}</div>
                  </div>
                  <div style={{ flex: '0 1 110px' }}>
                    <Label>{tNs('orders.returns.alreadyReturned', 'Already returned')}</Label>
                    <div style={{ fontSize: 14, color: '#6B7280', paddingBottom: 8 }}>{already > 0 ? lineQtyText(l as any, already) : '—'}</div>
                  </div>
                  <div style={{ flex: '0 1 120px' }}>
                    <Label>{tNs('orders.returns.returnQty', 'Return')}</Label>
                    <NumInput
                      type="number" min="0" max={String(max)} step="any"
                      disabled={!canReturn || max <= 0}
                      value={qty[l.id] ?? ''}
                      placeholder="0"
                      style={overOf(l) ? { borderColor: '#DC2626' } : undefined}
                      onChange={(e) => setQty(prev => ({ ...prev, [l.id]: e.target.value }))}
                    />
                    {overOf(l) && (
                      <div style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}>{tNs('orders.returns.exceeds', 'Up to {{n}}', { n: max })}</div>
                    )}
                  </div>
                  <div style={{ flex: '0 1 120px', textAlign: 'right', paddingBottom: 8, fontSize: 13, color: '#374151' }}>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>{tNs('orders.returns.amount', 'Amount')}</div>
                    {amt > 0 ? `−${formatMoney(amt, currency)}` : '—'}
                  </div>
                </div>
              );
            })}

            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: '12px 14px', margin: '16px 0', fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <span>{tNs('orders.returns.returnTotal', 'Return total')}</span>
                <strong style={{ color: '#111827', fontSize: 14 }}>{total > 0 ? `−${formatMoney(total, currency)}` : formatMoney(0, currency)}</strong>
              </div>
              {isRefund && total > 0 && (
                <div>{tNs('orders.returns.refundDue', 'Refund to the buyer: {{amount}}', { amount: formatMoney(total, currency) })}</div>
              )}
              {invoice && invBefore != null && invAfter != null && (
                <div>{tNs('orders.returns.invoiceChange', 'Invoice {{number}}: {{from}} → {{to}}', { number: invoice.invoice_number, from: formatMoney(invBefore, currency), to: formatMoney(invAfter, currency) })}</div>
              )}
              {deliveryFee > 0 && (
                <div>{tNs('orders.correct.deliveryUnchanged', 'Delivery fee {{fee}} stays the same', { fee: formatMoney(deliveryFee, currency) })}</div>
              )}
            </div>

            <div style={{ marginBottom: 12 }}>
              <Label>{tNs('orders.correct.reason', 'Reason (required)')}</Label>
              <ReasonInput
                rows={3}
                placeholder={tNs('orders.returns.reasonPlaceholder', 'e.g. 2 packs arrived damaged') as string}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
            {error && <div style={{ color: '#DC2626', fontSize: 13 }}>{error}</div>}
          </div>
        )}
      </Modal>
      <ConfirmModal
        isOpen={confirmOpen}
        title={tNs('orders.returns.confirmTitle', 'Return {{n}} item(s), −{{amount}}?', { n: chosen.length, amount: formatMoney(total, currency) })}
        message={isRefund
          ? tNs('orders.returns.confirmBodyRefund', 'Stock moves back right away and a refund of this amount is recorded for the buyer. The buyer is told by email. This cannot be undone here.')
          : tNs('orders.returns.confirmBody', 'Stock moves back right away and the amount is taken off the invoice. The buyer is told by email. This cannot be undone here.')}
        confirmText={submitting ? '…' : tNs('orders.returns.submit', 'Process return')}
        cancelText={tNs('orders.correct.cancel', 'Cancel')}
        type="warning"
        onConfirm={submit}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default SellerReturnModal;
