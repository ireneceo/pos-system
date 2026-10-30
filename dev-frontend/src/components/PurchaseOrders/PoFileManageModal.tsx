/**
 * PoFileManageModal — 발주에 붙인 인보이스·영수증 «열기 · 다시 올리기 · 삭제» 창 (2026-10-30)
 *
 * Irene 「영수증이나 인보이스를 업로드하면 재업로드 기능이 나와야 해. 그래서 재업로드하면 이전 거
 *         그냥 삭제하면 될 것 같아. 삭제도 가능해야 하지 않아?」
 *
 * - 다시 올리기: 새 파일을 고르면 바로 바뀐다(서버가 옛 파일을 지움).
 * - 삭제: 창 안에서 한 번 더 확인 → 파일만 뗀다. 결제·대조·총액 기록은 그대로.
 * - canEdit=false(오너가 매장 영수증 보기 등)면 열기만.
 */
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ModalButton } from '../UI/Modal';
import { attachPoFile, removePoFile, poAttachmentErrorText, PoAttachmentKind } from '../../utils/poAttachment';

export const PO_FILE_ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp';

interface Props {
  poId: number | string;
  kind: PoAttachmentKind;
  fileUrl: string;
  fileName?: string | null;
  canEdit: boolean;
  onClose: () => void;
  /** 바꾸거나 지운 뒤 — 목록·상세 새로고침 */
  onChanged: () => void;
  scopeUrl?: (url: string) => string;
  zIndex?: number;
}

export default function PoFileManageModal({ poId, kind, fileUrl, fileName, canEdit, onClose, onChanged, scopeUrl, zIndex }: Props) {
  const { t } = useTranslation(['purchaseOrders', 'common']);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shownName = fileName || decodeURIComponent(fileUrl.split('/').pop() || '');
  const title = kind === 'invoice'
    ? t('fileManage.invoiceTitle', 'Uploaded invoice')
    : t('fileManage.receiptTitle', 'Attached receipt');

  const replace = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      await attachPoFile(poId, kind, file, scopeUrl);
      onChanged();
      onClose();
    } catch (e) {
      setError(poAttachmentErrorText(e, t('fileManage.replaceFailed', 'Could not replace the file. Please try again.') as string));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    setError(null);
    try {
      await removePoFile(poId, kind, scopeUrl);
      onChanged();
      onClose();
    } catch (e) {
      setError(poAttachmentErrorText(e, t('fileManage.deleteFailed', 'Could not delete the file. Please try again.') as string));
      setConfirmDelete(false);
    } finally {
      setBusy(false);
    }
  };

  const footer = confirmDelete ? (
    <>
      <ModalButton variant="secondary" onClick={() => setConfirmDelete(false)} disabled={busy}>
        {t('common:cancel', 'Cancel')}
      </ModalButton>
      <ModalButton variant="danger" onClick={remove} disabled={busy} data-testid="po-file-delete-confirm">
        {busy ? t('fileManage.deleting', 'Deleting...') : t('fileManage.deleteConfirm', 'Delete file')}
      </ModalButton>
    </>
  ) : (
    <>
      <ModalButton variant="secondary" onClick={() => window.open(fileUrl, '_blank', 'noopener')}>
        {t('fileManage.open', 'Open')}
      </ModalButton>
      {canEdit && (
        <>
          <ModalButton variant="danger" onClick={() => setConfirmDelete(true)} disabled={busy} data-testid="po-file-delete">
            {t('fileManage.delete', 'Delete')}
          </ModalButton>
          <ModalButton variant="primary" onClick={() => fileRef.current?.click()} disabled={busy} data-testid="po-file-replace">
            {busy ? t('fileManage.uploading', 'Uploading...') : t('fileManage.replace', 'Re-upload')}
          </ModalButton>
        </>
      )}
    </>
  );

  return (
    <Modal isOpen onClose={() => !busy && onClose()} size="small" zIndex={zIndex} title={title as string} footer={footer}>
      <input
        ref={fileRef}
        type="file"
        accept={PO_FILE_ACCEPT}
        style={{ display: 'none' }}
        data-testid="po-file-input"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) replace(f);
          e.target.value = '';
        }}
      />
      <div style={{ fontSize: 14, color: '#0A2540', fontWeight: 600, wordBreak: 'break-all' }}>{shownName}</div>
      <div style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7, marginTop: 8 }}>
        {confirmDelete
          ? (kind === 'invoice'
              ? t('fileManage.deleteInvoiceBody', 'The invoice file will be deleted. Prices and totals already checked stay as they are.')
              : t('fileManage.deleteReceiptBody', 'The receipt file will be deleted. The payment record stays as it is.'))
          : canEdit
            ? t('fileManage.replaceHint', 'Re-uploading replaces this file and deletes the old one.')
            : null}
      </div>
      {error && <div style={{ fontSize: 13, color: '#DC2626', marginTop: 8 }}>{error}</div>}
    </Modal>
  );
}
