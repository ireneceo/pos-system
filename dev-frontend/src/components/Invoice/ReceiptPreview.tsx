import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';

/**
 * 결제 영수증 표시 (2026-10-05) — 청구서 발행자 쪽 «고객이 낸 영수증» 자리 공용.
 * 이미지면 그림(클릭 시 새 탭), PDF 면 «Open PDF» 버튼(새 탭).
 * 서버가 영수증을 파일로 저장하므로 보통은 `/uploads/receipts/...` URL 이지만,
 * 예전 행에는 data URL(base64)이 남아 있을 수 있어 둘 다 처리한다.
 */

export const isPdfReceipt = (url?: string | null): boolean => {
  if (!url) return false;
  if (url.startsWith('data:application/pdf')) return true;
  return /\.pdf(\?|#|$)/i.test(url);
};

/** data URL 은 브라우저가 새 탭 최상위 이동을 막는다 → Blob URL 로 바꿔 연다. */
export const openReceiptUrl = (url: string) => {
  if (!url) return;
  if (url.startsWith('data:')) {
    try {
      const [head, body] = url.split(',', 2);
      const mime = (head.match(/^data:([^;]+)/) || [])[1] || 'application/octet-stream';
      const bin = atob(body || '');
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const blobUrl = URL.createObjectURL(new Blob([bytes], { type: mime }));
      window.open(blobUrl, '_blank', 'noopener');
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      return;
    } catch {
      // 디코드 실패 — 아래 일반 열기로
    }
  }
  window.open(url, '_blank', 'noopener');
};

interface ReceiptPreviewProps {
  url: string;
  /** 이미지 최대 높이(px) */
  maxHeight?: number;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({ url, maxHeight = 300 }) => {
  const { t } = useTranslation('common');
  if (!url) return null;

  if (isPdfReceipt(url)) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', background: 'white', padding: '12px', borderRadius: '8px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#4B5563', border: '1px solid #C7CED6', borderRadius: '4px', padding: '2px 6px' }}>PDF</span>
        <Button type="button" variant="secondary" size="small" onClick={() => openReceiptUrl(url)}>
          {t('receiptUpload.openPdf')}
        </Button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', background: 'white', padding: '12px', borderRadius: '8px' }}>
      <img
        src={url}
        alt={t('receiptUpload.receiptAlt')}
        style={{ maxWidth: '100%', maxHeight: `${maxHeight}px`, borderRadius: '8px', cursor: 'pointer' }}
        onClick={() => openReceiptUrl(url)}
      />
      <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#4B5563' }}>{t('receiptUpload.clickToEnlarge')}</p>
    </div>
  );
};

export default ReceiptPreview;
