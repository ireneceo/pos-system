/**
 * ReceivePayModal — 발주 "수령 + 결제" / "수령만" / "결제만" / "결제 취소" 한 곳 (P4-5, 2026-09-02).
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md §5-3
 *
 * 왜 확인창이 필요한가: 이 동작들은 **되돌리기가 쉽지 않다.** 한 번에 세 가지가 일어난다 —
 *   ① 재고가 실제로 늘고 ② 결제가 기록되고 ③ 현금이면 드로어에서 돈이 나간다.
 * 그래서 무엇이 일어나는지 **먼저 적어 보여 주고** 누르게 한다.
 *
 * 서버가 돌려주는 두 가지 사정을 그대로 전한다(숨기면 직원이 드로어를 잘못 센다):
 *   - `drawerSkipped` → 시프트가 열려 있지 않아 드로어 출금으로 기록되지 않음
 *   - `MULTIPLE_OPEN_SHIFTS` → 열린 시프트가 둘 이상이라 서버가 거절(임의로 고르지 않는다)
 */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput, FormSelect } from '../UI/Modal';
import { getAuthToken } from '../../utils/auth';

export type ReceivePayMode = 'receive_and_pay' | 'receive_only' | 'pay' | 'refund';

interface Props {
  open: boolean;
  mode: ReceivePayMode;
  po: { id: number; po_number?: string | null; total_amount?: number | string | null; seller_name?: string | null } | null;
  /** 구매자가 매장일 때만 드로어(현금서랍)가 있다 — BG·푸드코트는 현금이어도 드로어 이동이 없다. */
  buyerIsRestaurant?: boolean;
  /** 성공 후. drawerSkipped 면 부모가 안내를 띄운다. */
  onDone: (result: { drawerSkipped?: boolean }) => void;
  onClose: () => void;
}

const METHODS: Array<{ value: string; labelKey: string; fallback: string }> = [
  { value: 'cash', labelKey: 'pay.method.cash', fallback: 'Cash' },
  { value: 'bank_transfer', labelKey: 'pay.method.bank', fallback: 'Bank transfer' },
  { value: 'card', labelKey: 'pay.method.card', fallback: 'Card' },
];

export default function ReceivePayModal({ open, mode, po, buyerIsRestaurant = true, onDone, onClose }: Props) {
  const { t } = useTranslation('purchaseOrders');
  const [method, setMethod] = useState('cash');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setMethod('cash'); setReason(''); setError(null);
  }, [open, po?.id]);

  if (!open || !po) return null;

  const needsMethod = mode === 'receive_and_pay' || mode === 'pay';
  const cashFromDrawer = needsMethod && method === 'cash' && buyerIsRestaurant;

  const titleFor: Record<ReceivePayMode, string> = {
    receive_and_pay: t('pay.title.receiveAndPay', 'Receive and pay') as string,
    receive_only: t('pay.title.receiveOnly', 'Receive without paying') as string,
    pay: t('pay.title.pay', 'Record payment') as string,
    refund: t('pay.title.refund', 'Reverse this payment') as string,
  };

  const submit = async () => {
    setBusy(true); setError(null);
    try {
      const endpoint =
        mode === 'receive_and_pay' ? `/api/purchase-orders/${po.id}/receive-and-pay`
        : mode === 'receive_only' ? `/api/purchase-orders/${po.id}/mark-received`
        : mode === 'pay' ? `/api/purchase-orders/${po.id}/pay`
        : `/api/purchase-orders/${po.id}/refund-payment`;
      const body: any = {};
      if (needsMethod) body.payment_method = method;
      if (reason.trim()) body.reason = reason.trim();
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
        body: JSON.stringify(body),
      });
      const j = await res.json().catch(() => null);
      if (!res.ok || !j?.success) {
        // 서버 사정을 그대로 보여 준다 — 특히 "열린 시프트가 둘 이상" 은 사람이 정리해야 풀린다.
        setError(j?.code === 'MULTIPLE_OPEN_SHIFTS'
          ? (t('pay.error.multipleShifts', 'More than one shift is open — close one before recording a cash payment.') as string)
          : (j?.message || (t('pay.error.failed', 'Could not complete this action.') as string)));
        setBusy(false);
        return;
      }
      onDone({ drawerSkipped: !!j.drawerSkipped });
      onClose();
    } catch {
      setError(t('pay.error.network', 'Network error. Please try again.') as string);
    } finally {
      setBusy(false);
    }
  };

  const amount = Number(po.total_amount || 0).toFixed(2);

  return (
    <Modal isOpen onClose={onClose} title={titleFor[mode]} size="small"
      footer={<>
        <ModalButton variant="secondary" onClick={onClose} disabled={busy}>{t('common.cancel', 'Cancel')}</ModalButton>
        <ModalButton variant="primary" onClick={submit} disabled={busy}>
          {busy ? '…' : t('pay.confirm', 'Confirm')}
        </ModalButton>
      </>}
    >
      {error && (
        <div style={{ background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#DC2626', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13 }}>
          {error}
        </div>
      )}
      <div style={{ fontSize: 13, color: '#4B5563', marginBottom: 12 }}>
        <strong style={{ color: '#0A2540' }}>{po.po_number || `#${po.id}`}</strong>
        {po.seller_name ? ` · ${po.seller_name}` : ''} · RM {amount}
      </div>

      {/* 되돌리기 어려운 동작이라 **무엇이 일어나는지 먼저 적는다** */}
      <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: '10px 12px', marginBottom: 14, fontSize: 12.5, color: '#334155', lineHeight: 1.7 }}>
        <div style={{ fontWeight: 700, marginBottom: 4, color: '#0A2540' }}>{t('pay.effects.title', 'What this does')}</div>
        {(mode === 'receive_and_pay' || mode === 'receive_only') && (
          <div>· {t('pay.effects.stock', 'Stock goes up by the ordered quantity.')}</div>
        )}
        {needsMethod && <div>· {t('pay.effects.payment', 'The order is marked as paid.')}</div>}
        {cashFromDrawer && <div>· {t('pay.effects.drawer', { amount, defaultValue: 'RM {{amount}} is taken out of the open shift cash drawer.' })}</div>}
        {mode === 'refund' && <div>· {t('pay.effects.refund', 'A matching cash-in movement is created — the payment is reversed, not deleted. Stock and receipt are not touched.')}</div>}
      </div>

      {needsMethod && (
        <FormGroup>
          <FormLabel>{t('pay.method.label', 'Payment method')}</FormLabel>
          <FormSelect value={method} onChange={(e) => setMethod(e.target.value)}>
            {METHODS.map(m => <option key={m.value} value={m.value}>{t(m.labelKey, m.fallback)}</option>)}
          </FormSelect>
          {method !== 'cash' && (
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
              {t('pay.method.nonCashNote', 'Non-cash payments are recorded on the order only — the cash drawer is not touched.')}
            </div>
          )}
        </FormGroup>
      )}

      <FormGroup>
        <FormLabel>{t('pay.reason', 'Note')}</FormLabel>
        <FormInput type="text" value={reason} onChange={(e) => setReason(e.target.value)}
          placeholder={t('pay.reasonPlaceholder', 'Optional — shown on the cash movement') as string} />
      </FormGroup>
    </Modal>
  );
}
