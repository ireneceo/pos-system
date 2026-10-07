import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../UI/Button';
import { isPdfReceipt, openReceiptUrl } from './ReceiptPreview';

/**
 * 결제 영수증 올리기 칸 (2026-10-05) — 청구서 «결제 제출» 모달 5곳 공용.
 * Irene 「여기 왜 드래그는 안들어가? 그리고 왜 pdf는 안들어가? 은행이 주는 영수증은 pdf도 있는데?」
 * - 클릭 또는 끌어다 놓기
 * - 이미지(JPG/PNG/WEBP) + PDF, 5MB 상한
 * - 값은 data URL 문자열 — 서버(submit-payment)가 받아서 파일로 저장하고 URL 로 바꾼다.
 */

export const RECEIPT_MAX_BYTES = 5 * 1024 * 1024;
export const RECEIPT_ACCEPT = 'image/jpeg,image/png,image/webp,application/pdf';
const ALLOWED_TYPES = RECEIPT_ACCEPT.split(',');
const ALLOWED_EXT = /\.(jpe?g|png|webp|pdf)$/i;

export type ReceiptFileProblem = 'tooLarge' | 'badType' | null;

/** 받을 수 있는 파일인지 — 종류 먼저, 그다음 크기. */
export const validateReceiptFile = (file: { name: string; type: string; size: number }): ReceiptFileProblem => {
  const typeOk = file.type ? ALLOWED_TYPES.includes(file.type) : ALLOWED_EXT.test(file.name);
  if (!typeOk) return 'badType';
  if (file.size > RECEIPT_MAX_BYTES) return 'tooLarge';
  return null;
};

interface ReceiptUploadFieldProps {
  /** data URL (또는 이미 저장된 URL). 비어 있으면 '' */
  value: string;
  onChange: (value: string) => void;
  /** 거절 사유(번역된 문장). 정상 선택 시 null 로 한 번 불러 이전 오류를 지운다. */
  onError?: (message: string | null) => void;
  disabled?: boolean;
}

const ReceiptUploadField: React.FC<ReceiptUploadFieldProps> = ({ value, onChange, onError, disabled }) => {
  const { t } = useTranslation('common');
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');

  const takeFile = (file: File | undefined | null) => {
    if (!file || disabled) return;
    const problem = validateReceiptFile(file);
    if (problem) {
      onError?.(problem === 'tooLarge' ? t('receiptUpload.tooLarge') : t('receiptUpload.badType'));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onError?.(null);
      setFileName(file.name);
      onChange(reader.result as string);
    };
    reader.onerror = () => onError?.(t('receiptUpload.readFailed'));
    reader.readAsDataURL(file);
  };

  const clear = () => {
    setFileName('');
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const pdf = isPdfReceipt(value);
  const shownName = fileName || (value && !value.startsWith('data:') ? decodeURIComponent(value.split('/').pop() || '') : '');

  return (
    <div
      data-testid="receipt-upload-field"
      onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); if (!disabled) setDragOver(true); }}
      onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); if (!disabled) setDragOver(true); }}
      onDragLeave={(e) => {
        e.preventDefault();
        // 안쪽 요소로 옮겨갈 때 깜빡이지 않게 — 칸 밖으로 나갈 때만 해제
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        takeFile(e.dataTransfer?.files?.[0]);
      }}
      style={{
        border: `2px dashed ${dragOver ? '#635BFF' : '#C7CED6'}`,
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        background: dragOver ? '#F5F3FF' : value ? '#F0FDF4' : '#F9FAFB',
        transition: 'background 0.15s, border-color 0.15s',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={RECEIPT_ACCEPT}
        data-testid="receipt-upload-input"
        onChange={(e) => { takeFile(e.target.files?.[0]); e.target.value = ''; }}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      {value ? (
        <div>
          {pdf ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#4B5563', border: '1px solid #C7CED6', borderRadius: '4px', padding: '2px 6px', background: 'white' }}>PDF</span>
              <span style={{ fontSize: '14px', color: '#111827', wordBreak: 'break-all' }}>{shownName || t('receiptUpload.pdfFile')}</span>
            </div>
          ) : (
            <img src={value} alt={t('receiptUpload.receiptAlt')} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px', marginBottom: '12px' }} />
          )}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {pdf && (
              <Button type="button" variant="secondary" size="small" onClick={() => openReceiptUrl(value)}>
                {t('receiptUpload.open')}
              </Button>
            )}
            <Button type="button" variant="secondary" size="small" onClick={() => inputRef.current?.click()} disabled={disabled}>
              {t('receiptUpload.change')}
            </Button>
            <Button type="button" variant="danger" size="small" onClick={clear} disabled={disabled}>
              {t('receiptUpload.remove')}
            </Button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
          style={{ cursor: disabled ? 'default' : 'pointer', color: '#4B5563', fontSize: '14px' }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>+</div>
          <div>{dragOver ? t('receiptUpload.dropHere') : t('receiptUpload.prompt')}</div>
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#6B7280' }}>{t('receiptUpload.hint')}</div>
        </div>
      )}
    </div>
  );
};

export default ReceiptUploadField;
