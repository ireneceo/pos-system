/**
 * ExternalInvoicePayAction — 외부 공급업체 청구서의 «결제함» (2026-09-11 · docs/PURCHASE_ORDER_SYSTEM.md §8-3 A-1 · §8-5 E-2)
 *
 * 받는 청구서 화면(매장 · 오너 · 브랜드 · 푸드코트)이 **같은 조각**을 쓴다.
 *   - 연결 발주가 있으면 발주 결제 모달(ReceivePayModal, mode pay)을 그대로 열되 **청구서 문** `POST /invoices/:id/mark-paid-external` 로 낸다
 *     (§8-5 E-2′ — 발주 문은 로그인 사용자의 primary 엔티티로만 구매자를 정해 다매장 오너 403 · BG 두 번째 브랜드 404 였다).
 *     안에서 발주·청구서·(매장이면)드로어를 recordPayment 한 손이 같은 트랜잭션에 쓰고, 이미 낸 결제는 409 로 막힌다.
 *   - 연결 발주가 없으면 낼 금액·드로어를 정할 근거가 없다 — 버튼 대신 «연결된 발주 없음».
 *   - 드로어(현금서랍)는 **구매자가 매장일 때만** — 브랜드·푸드코트 구매자는 현금이어도 드로어 이동이 없다.
 *   - **월별 정산서(SOA)** 면 발주 없이 정산서 문 하나로 — 묶인 청구서·발주를 서버가 한 번에 결제됨으로 적는다
 *     (2026-10-07 Fable 판정 ⑩ A-4 · 같은 `mark-paid-external`).
 * 가입 판매자 청구서는 이 조각을 쓰지 않는다(각 화면의 기존 Pay → submit-payment).
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReceivePayModal from '../PurchaseOrders/ReceivePayModal';
import AlertDialog from '../Common/AlertDialog';
import { Modal, ModalButton, FormGroup, FormLabel, FormInput, FormSelect } from '../UI/Modal';
import { getAuthToken } from '../../utils/auth';
import { Button } from '../UI/Button';
import { formatCurrency } from '../../utils/currency';

const SOA_METHODS: Array<{ value: string; labelKey: string; fallback: string }> = [
  { value: 'bank_transfer', labelKey: 'pay.method.bank', fallback: 'Bank transfer' },
  { value: 'cash', labelKey: 'pay.method.cash', fallback: 'Cash' },
  { value: 'card', labelKey: 'pay.method.card', fallback: 'Card' },
  { value: 'personal', labelKey: 'pay.method.personal', fallback: 'Personal money' },
];
const todayStr = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export interface ExternalPayInvoice {
  /** 청구서 id — 결제는 이 청구서의 문으로 들어간다 */
  id: number | string;
  purchaseOrderId?: number | null;
  purchaseOrderNumber?: string | null;
  purchaseOrderTotal?: number | string | null;
  /** 발주의 구매자 종류 — 'restaurant' 일 때만 드로어 안내 */
  purchaseOrderEntityType?: string | null;
  issuerName?: string | null;
  /** 서버 payableFrom 이 정한 낼 금액 — 화면에서 다시 계산하지 않는다 */
  payableAmount?: number | string | null;
  payableBasis?: 'purchase_order' | 'supplier_invoice' | null;
  supplierInvoiceTotal?: number | string | null;
  invoiceReconciledAt?: string | null;
  uploadedInvoiceUrl?: string | null;
  /** 'soa' 면 정산서 가지 — 발주 없이 묶인 청구서 전부를 한 번에 */
  invoiceCategory?: string | null;
  invoiceNumber?: string | null;
  total?: number | string | null;
  currency?: string | null;
  /** 정산서에 묶인 청구서 수(화면이 알면) */
  soaChildCount?: number | null;
}

interface Props {
  invoice: ExternalPayInvoice;
  /** 각 화면의 버튼 모양을 그대로 쓴다 — 누르면 open() */
  renderTrigger: (open: () => void) => React.ReactNode;
  /** 결제가 기록된 뒤(목록 새로고침 등) */
  onPaid?: () => void;
}

export default function ExternalInvoicePayAction({ invoice, renderTrigger, onPaid }: Props) {
  const { t } = useTranslation(['settings', 'purchaseOrders', 'common']);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [drawerSkipped, setDrawerSkipped] = useState(false);
  // 정산서 가지 상태
  const [soaMethod, setSoaMethod] = useState('bank_transfer');
  const [soaPaidAt, setSoaPaidAt] = useState(todayStr);
  const [soaNote, setSoaNote] = useState('');
  const [soaBusy, setSoaBusy] = useState(false);
  const [soaError, setSoaError] = useState<string | null>(null);
  const [soaResult, setSoaResult] = useState<string | null>(null);

  if (invoice.invoiceCategory === 'soa') {
    const openSoa = () => { setSoaMethod('bank_transfer'); setSoaPaidAt(todayStr()); setSoaNote(''); setSoaError(null); setOpen(true); };
    const submitSoa = async () => {
      setSoaBusy(true); setSoaError(null);
      try {
        const body: any = { payment_method: soaMethod };
        if (soaPaidAt && soaPaidAt !== todayStr()) body.paid_at = soaPaidAt;
        if (soaNote.trim()) body.notes = soaNote.trim();
        const res = await fetch(`/api/invoices/${invoice.id}/mark-paid-external`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getAuthToken()}` },
          body: JSON.stringify(body),
        });
        const j = await res.json().catch(() => null);
        if (!res.ok || !j?.success) {
          setSoaError(j?.code === 'MULTIPLE_OPEN_SHIFTS'
            ? (t('purchaseOrders:pay.error.multipleShifts', 'More than one shift is open — close one before recording a cash payment.') as string)
            : (j?.message || (t('purchaseOrders:pay.error.failed', 'Could not complete this action.') as string)));
          return;
        }
        setOpen(false);
        const parts = [t('settings:invoicesPage.soaPay.done', '{{n}} invoices and their orders were marked paid.', { n: (j.paid_children || []).length }) as string];
        if ((j.skipped || []).length) parts.push(t('settings:invoicesPage.soaPay.skipped', '{{n}} were already paid or cancelled and were left as they were.', { n: j.skipped.length }) as string);
        if (j.drawerSkipped) parts.push(t('purchaseOrders:pay.drawerSkipped.desc', 'No shift is open, so this was not recorded as a cash withdrawal from the drawer.') as string);
        setSoaResult(parts.join(' '));
        if (onPaid) onPaid();
      } catch {
        setSoaError(t('purchaseOrders:pay.error.network', 'Network error. Please try again.') as string);
      } finally { setSoaBusy(false); }
    };
    return (
      <>
        {renderTrigger(openSoa)}
        {open && (
          <Modal
            isOpen
            onClose={() => setOpen(false)}
            title={t('settings:invoicesPage.soaPay.title', 'Mark statement as paid') as string}
            size="small"
            footer={<>
              <ModalButton variant="secondary" onClick={() => setOpen(false)}>{t('common:button.cancel', 'Cancel')}</ModalButton>
              <Button variant="success" disabled={soaBusy} onClick={submitSoa}>{soaBusy ? '…' : t('settings:invoicesPage.markPaidLong', 'Mark as paid')}</Button>
            </>}
          >
            <div style={{ fontSize: 14, color: '#0A2540', marginBottom: 12, lineHeight: 1.6 }}>
              <div><strong>{invoice.invoiceNumber}</strong>{invoice.issuerName ? ` · ${invoice.issuerName}` : ''}</div>
              <div>{t('settings:invoicesPage.soaPay.amount', 'Amount')}: <strong>{formatCurrency(Number(invoice.total || 0), invoice.currency || 'MYR')}</strong>
                {invoice.soaChildCount != null ? ` · ${t('settings:invoicesPage.soaPay.children', '{{n}} invoices', { n: invoice.soaChildCount })}` : ''}</div>
            </div>
            <div style={{ fontSize: 12, color: '#4B5563', marginBottom: 12 }}>
              {t('settings:invoicesPage.soaPay.explain', 'All invoices in this statement and their purchase orders will be marked paid together. The money was paid outside the system — this only records it.')}
            </div>
            {soaError && <div style={{ color: '#DC2626', fontSize: 13, marginBottom: 12 }}>{soaError}</div>}
            <FormGroup>
              <FormLabel>{t('purchaseOrders:pay.method.label', 'Payment method')}</FormLabel>
              <FormSelect value={soaMethod} onChange={(e) => setSoaMethod(e.target.value)}>
                {SOA_METHODS.map(m => <option key={m.value} value={m.value}>{t(`purchaseOrders:${m.labelKey}`, m.fallback)}</option>)}
              </FormSelect>
              {soaMethod === 'cash' && (
                <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                  {t('settings:invoicesPage.soaPay.cashNote', 'Cash is taken from the open shift drawer — one line per order, plus one line for any statement difference.')}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('purchaseOrders:pay.paidAt', 'Payment date')}</FormLabel>
              <FormInput type="date" value={soaPaidAt} max={todayStr()} onChange={(e) => setSoaPaidAt(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <FormLabel>{t('purchaseOrders:pay.reason', 'Note')}</FormLabel>
              <FormInput type="text" value={soaNote} onChange={(e) => setSoaNote(e.target.value)} />
            </FormGroup>
          </Modal>
        )}
        {soaResult && (
          <AlertDialog
            isOpen
            title={t('settings:invoicesPage.soaPay.doneTitle', 'Statement marked paid') as string}
            message={soaResult}
            onClose={() => setSoaResult(null)}
          />
        )}
      </>
    );
  }

  if (!invoice.purchaseOrderId) {
    return (
      <span style={{ fontSize: 11, color: '#6B7280', alignSelf: 'center' }}>
        {t('settings:invoicesPage.noPurchaseOrder', 'No linked purchase order')}
      </span>
    );
  }

  const poId = invoice.purchaseOrderId;
  return (
    <>
      {renderTrigger(() => setOpen(true))}
      <ReceivePayModal
        open={open}
        mode="pay"
        invoiceId={invoice.id}
        po={open ? {
          id: poId,
          po_number: invoice.purchaseOrderNumber,
          total_amount: invoice.purchaseOrderTotal,
          seller_name: invoice.issuerName,
          payable_amount: invoice.payableAmount,
          payable_basis: invoice.payableBasis,
          invoice_total: invoice.supplierInvoiceTotal,
          invoice_reconciled_at: invoice.invoiceReconciledAt,
          external_invoice_url: invoice.uploadedInvoiceUrl,
        } : null}
        buyerIsRestaurant={(invoice.purchaseOrderEntityType || 'restaurant') === 'restaurant'}
        onGoReconcile={() => { setOpen(false); navigate(`/pos/purchase-orders/${poId}/reconcile`); }}
        onClose={() => setOpen(false)}
        onDone={(result) => {
          setOpen(false);
          // 드로어에 안 들어갔다는 사실을 숨기지 않는다 — 발주 목록과 같은 안내
          if (result.drawerSkipped) setDrawerSkipped(true);
          if (onPaid) onPaid();
        }}
      />
      {drawerSkipped && (
        <AlertDialog
          isOpen
          title={t('purchaseOrders:pay.drawerSkipped.title', 'Recorded without a drawer movement') as string}
          message={t('purchaseOrders:pay.drawerSkipped.desc', 'No shift is open, so this was not recorded as a cash withdrawal from the drawer.') as string}
          onClose={() => setDrawerSkipped(false)}
        />
      )}
    </>
  );
}
