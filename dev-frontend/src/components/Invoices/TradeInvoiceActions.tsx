/**
 * TradeInvoiceActions — 청구서 상세 창의 «공급업체 인보이스» 네 가지 일 (2026-10-09 Fable 판정 A-1 · docs/PURCHASE_ORDER_SYSTEM.md §8-8)
 *
 * Irene: «인보이스페이지에서는 어떤 역할이든 인보이스업로드(있을경우 재업로드) 가격확인 비교수정 인보이스 보기 기능 토탈금액 변경이 다 있어야 해.
 *         주문내역에만 있으면 불편해. 오너 레스토랑관리자 다.»
 *
 * 네 버튼 — ①올리기 / 다시 올리기 ②올린 인보이스 보기 ③대조하기 / 대조 내역 보기 ④총액 수정(SupplierInvoiceTotalFix).
 * 매장 관리자 · 오너 · 브랜드 · 푸드코트 보기 창이 **같은 조각**을 쓴다(역할별 분기 없음).
 *   - 뜨는 조건 = isExternalTradeInvoice 하나(거래 청구서 + 연결 발주 + 외부 공급업체 발행 + 취소 아님).
 *   - 부르는 자격 = 그 청구서에 붙은 **발주의 주인**(tradeInvoiceScopeQS) — 오너·둘째 브랜드도 같은 길.
 *   - 새 저장 경로 없음: 올리기 = `POST /purchase-orders/:id/upload-invoice`(덮어쓰기 허용), 대조 = 대조 화면.
 *   - 다시 올리기는 파일만 바꾼다 — 적어 둔 대조·총액 기록은 그대로(파일은 증거, 숫자는 장부 · 판정 A-3).
 */
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { Modal, ModalButton } from '../UI/Modal';
import SupplierInvoiceTotalFix, { TotalFixInvoice, isExternalTradeInvoice, withTradeInvoiceScope } from './SupplierInvoiceTotalFix';
import { getAuthToken } from '../../utils/auth';
import { getErrorMessage } from '../../utils/apiError';

interface Props {
  invoice: TotalFixInvoice;
  /** 올리기·총액 수정 뒤(목록 새로고침 · 창 닫기 등) */
  onChanged?: () => void;
}

export default function TradeInvoiceActions({ invoice, onChanged }: Props) {
  const { t } = useTranslation(['settings', 'common']);
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isExternalTradeInvoice(invoice)) return null;

  const fileUrl = invoice.uploadedInvoiceUrl || null;
  const poStatus = invoice.purchaseOrderStatus || '';
  const canUpload = poStatus !== 'draft' && poStatus !== 'cancelled';

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const token = getAuthToken();
      const fd = new FormData();
      fd.append('files', file);
      const up = await fetch('/api/upload/files', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const upData = await up.json().catch(() => ({}));
      if (!up.ok || !upData.success || !upData.data?.[0]) {
        setError(getErrorMessage(upData, t('settings:invoicesPage.tradeActions.uploadFailed', 'Upload failed') as string));
        return;
      }
      const f = upData.data[0];
      const res = await fetch(withTradeInvoiceScope(`/api/purchase-orders/${invoice.purchaseOrderId}/upload-invoice`, invoice), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: f.url, filename: f.originalName }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setError(getErrorMessage(data, t('settings:invoicesPage.tradeActions.attachFailed', 'Could not attach the invoice') as string));
        return;
      }
      onChanged?.();
    } catch {
      setError(t('settings:invoicesPage.tradeActions.network', 'Network error. Please try again.') as string);
    } finally {
      setBusy(false);
    }
  };

  const pickFile = () => fileRef.current?.click();

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = '';
        }}
      />
      {fileUrl && (
        <Button variant="secondary" onClick={() => window.open(fileUrl, '_blank', 'noopener')}>
          {t('settings:invoicesPage.viewUploadedInvoice', 'View uploaded invoice')}
        </Button>
      )}
      {canUpload && (
        <Button variant="secondary" disabled={busy} onClick={() => (fileUrl ? setConfirmReplace(true) : pickFile())}>
          {busy
            ? t('settings:invoicesPage.uploadingSupplierInvoice', 'Uploading...')
            : fileUrl
              ? t('settings:invoicesPage.tradeActions.reupload', 'Re-upload invoice')
              : t('settings:invoicesPage.uploadSupplierInvoice', 'Upload supplier invoice')}
        </Button>
      )}
      {/* 가격 대조 — 오너도 (2026-10-09 Fable §3-1 · Irene «권고대로») */}
      <Button variant="secondary" onClick={() => navigate(withTradeInvoiceScope(`/pos/purchase-orders/${invoice.purchaseOrderId}/reconcile`, invoice))}>
        {invoice.invoiceReconciledAt
          ? t('settings:invoicesPage.viewReconcile', 'View price check')
          : t('settings:invoicesPage.reconcileNow', 'Check prices against invoice')}
      </Button>
      <SupplierInvoiceTotalFix
        invoice={invoice}
        onSaved={onChanged}
        renderTrigger={(open) => (
          <Button variant="secondary" onClick={open}>
            {t('settings:invoicesPage.totalFix.button', 'Correct total')}
          </Button>
        )}
      />

      {confirmReplace && (
        <Modal isOpen onClose={() => setConfirmReplace(false)} size="small" zIndex={1100}
          title={t('settings:invoicesPage.tradeActions.reuploadTitle', 'Replace the invoice file?') as string}
          footer={(
            <>
              <ModalButton variant="secondary" onClick={() => setConfirmReplace(false)}>
                {t('common:cancel', 'Cancel')}
              </ModalButton>
              <ModalButton variant="primary" onClick={() => { setConfirmReplace(false); pickFile(); }}>
                {t('settings:invoicesPage.tradeActions.reuploadChoose', 'Choose new file')}
              </ModalButton>
            </>
          )}>
          <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.7 }}>
            {t('settings:invoicesPage.tradeActions.reuploadBody', 'The current file will be replaced with the new one. Prices and totals already checked stay as they are — check again if the new invoice is different.')}
          </div>
        </Modal>
      )}
      {error && (
        <Modal isOpen onClose={() => setError(null)} size="small" zIndex={1100}
          title={t('common:error.title', 'Error') as string}
          footer={<ModalButton variant="primary" onClick={() => setError(null)}>OK</ModalButton>}>
          <div style={{ fontSize: 13, color: '#DC2626', lineHeight: 1.7 }}>{error}</div>
        </Modal>
      )}
    </>
  );
}
