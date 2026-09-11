/**
 * TradeInvoiceDates — 구입(거래) 청구서의 «발주일 / 수령일 / 공급업체 인보이스» (2026-09-11 · §8-3 C-4 · §8-5 E-2)
 *
 * > Irene: 「발주한 날자랑 받은 날짜 등으로 해야지 구입한 건. 왜 구독기간처럼 표시해?」
 *
 * 구입 청구서에는 «기간» 이 없다. 받는 청구서 화면(매장 · 오너 · 브랜드 · 푸드코트)이 같은 조각을 쓴다.
 *   - variant 'cell'   : 목록 칸 — «Ordered d1» / «Received d2»(안 받았으면 «Not received») 두 줄
 *   - variant 'detail' : 상세 — Order date · Received · (대조했으면) Supplier invoice 행
 * 날짜 표시는 각 화면의 formatDate(매장 타임존)를 받아 쓴다 — 여기서 시간대를 새로 정하지 않는다.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  variant: 'cell' | 'detail';
  orderedAt?: string | null;
  receivedAt?: string | null;
  supplierInvoiceNumber?: string | null;
  supplierInvoiceDate?: string | null;
  reconciledAt?: string | null;
  formatDate: (value: string) => string;
}

const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'flex-end', gap: '8px', marginBottom: '6px', fontSize: '13px' };
const labelStyle: React.CSSProperties = { color: '#4B5563' };
const valueStyle: React.CSSProperties = { color: '#0A2540', fontWeight: 500, minWidth: '140px' };

export default function TradeInvoiceDates({ variant, orderedAt, receivedAt, supplierInvoiceNumber, supplierInvoiceDate, reconciledAt, formatDate }: Props) {
  const { t } = useTranslation('settings');

  if (variant === 'cell') {
    return (
      <>
        <div>{t('settings:invoicesPage.ordered', 'Ordered')} {orderedAt ? formatDate(orderedAt) : '-'}</div>
        <div>
          {receivedAt
            ? `${t('settings:invoicesPage.received', 'Received')} ${formatDate(receivedAt)}`
            : t('settings:invoicesPage.notReceived', 'Not received')}
        </div>
      </>
    );
  }

  const supplierRef = [supplierInvoiceNumber, supplierInvoiceDate ? formatDate(supplierInvoiceDate) : ''].filter(Boolean).join(' · ');
  return (
    <>
      <div style={rowStyle}>
        <span style={labelStyle}>{t('settings:invoicesPage.orderDate', 'Order date')}:</span>
        <span style={valueStyle}>{orderedAt ? formatDate(orderedAt) : '-'}</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>{t('settings:invoicesPage.receivedDate', 'Received')}:</span>
        <span style={valueStyle}>{receivedAt ? formatDate(receivedAt) : t('settings:invoicesPage.notReceived', 'Not received')}</span>
      </div>
      {reconciledAt && supplierRef && (
        <div style={rowStyle}>
          <span style={labelStyle}>{t('settings:invoicesPage.supplierInvoice', 'Supplier invoice')}:</span>
          <span style={valueStyle}>{supplierRef}</span>
        </div>
      )}
    </>
  );
}
