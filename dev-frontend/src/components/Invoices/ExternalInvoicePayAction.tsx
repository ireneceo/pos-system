/**
 * ExternalInvoicePayAction — 외부 공급업체 청구서의 «결제함» (2026-09-11 · docs/PURCHASE_ORDER_SYSTEM.md §8-3 A-1 · §8-5 E-2)
 *
 * 받는 청구서 화면(매장 · 오너 · 브랜드 · 푸드코트)이 **같은 조각**을 쓴다.
 *   - 연결 발주가 있으면 발주 결제 모달(ReceivePayModal, mode pay)을 그대로 열되 **청구서 문** `POST /invoices/:id/mark-paid-external` 로 낸다
 *     (§8-5 E-2′ — 발주 문은 로그인 사용자의 primary 엔티티로만 구매자를 정해 다매장 오너 403 · BG 두 번째 브랜드 404 였다).
 *     안에서 발주·청구서·(매장이면)드로어를 recordPayment 한 손이 같은 트랜잭션에 쓰고, 이미 낸 결제는 409 로 막힌다.
 *   - 연결 발주가 없으면 낼 금액·드로어를 정할 근거가 없다 — 버튼 대신 «연결된 발주 없음».
 *   - 드로어(현금서랍)는 **구매자가 매장일 때만** — 브랜드·푸드코트 구매자는 현금이어도 드로어 이동이 없다.
 * 가입 판매자 청구서는 이 조각을 쓰지 않는다(각 화면의 기존 Pay → submit-payment).
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReceivePayModal from '../PurchaseOrders/ReceivePayModal';
import AlertDialog from '../Common/AlertDialog';

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
}

interface Props {
  invoice: ExternalPayInvoice;
  /** 각 화면의 버튼 모양을 그대로 쓴다 — 누르면 open() */
  renderTrigger: (open: () => void) => React.ReactNode;
  /** 결제가 기록된 뒤(목록 새로고침 등) */
  onPaid?: () => void;
}

export default function ExternalInvoicePayAction({ invoice, renderTrigger, onPaid }: Props) {
  const { t } = useTranslation(['settings', 'purchaseOrders']);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [drawerSkipped, setDrawerSkipped] = useState(false);

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
