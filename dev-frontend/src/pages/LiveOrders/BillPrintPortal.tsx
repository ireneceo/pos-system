import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';
import { DbOrder, CompanyInfo } from './types';
import { formatPickupTimeRange } from './helpers';
import {
  BillPrintContainer, BillHeader, BillTitle, BillSection, BillRow, BillFooter
} from './styles';

interface BillPrintPortalProps {
  selectedOrder: DbOrder;
  companyInfo: CompanyInfo | null;
  receiptSettings: { receiptLogo: string; footerMessage: string; showMembership: boolean; customQrImage: string; customQrText: string; customQrPosition: string };
  operationSettings: any;
  paymentSettings: any;
  formatDateTime: (date?: Date | string) => string;
}

const BillPrintPortal: React.FC<BillPrintPortalProps> = ({
  selectedOrder, companyInfo, receiptSettings, operationSettings, paymentSettings, formatDateTime
}) => {
  const { t } = useTranslation('orders');

  return ReactDOM.createPortal(
    <BillPrintContainer id="bill-print-content">
      <BillHeader>
        {receiptSettings.receiptLogo && (
          <img src={receiptSettings.receiptLogo} alt="Logo" style={{ maxWidth: '160px', maxHeight: '50px', marginBottom: '8px', filter: 'grayscale(100%)' }} />
        )}
        <BillTitle>{companyInfo?.companyName || 'Restaurant'}</BillTitle>
        {companyInfo && (
          <>
            <div style={{ fontSize: '11px', marginTop: '5px' }}>{companyInfo.address}</div>
            <div style={{ fontSize: '11px' }}>{companyInfo.city}, {companyInfo.state} {companyInfo.postcode}</div>
            <div style={{ fontSize: '11px' }}>Tel: {companyInfo.phone}</div>
            {companyInfo.email && (<div style={{ fontSize: '11px' }}>Email: {companyInfo.email}</div>)}
            {companyInfo.taxNo && (<div style={{ fontSize: '11px', marginTop: '3px' }}>Tax No: {companyInfo.taxNo}</div>)}
          </>
        )}
        <div style={{ fontSize: '12px', fontWeight: 'bold', marginTop: '5px' }}>ORDER RECEIPT</div>
      </BillHeader>

      <BillSection style={{ borderTop: '2px solid #000', paddingTop: '10px' }}>
        <BillRow><strong>Order No:</strong><span>{selectedOrder.order_number}</span></BillRow>
        <BillRow><strong>Date:</strong><span>{formatDateTime(selectedOrder.order_date || selectedOrder.createdAt)}</span></BillRow>
        <BillRow><strong>Customer:</strong><span>{selectedOrder.customer_name || 'Guest'}</span></BillRow>
        {selectedOrder.customer_phone && (<BillRow><strong>Phone:</strong><span>{selectedOrder.customer_phone}</span></BillRow>)}
        <BillRow><strong>Order Type:</strong><span>{selectedOrder.order_type === 'dine_in' ? 'DINE IN' : selectedOrder.order_type?.toUpperCase()}</span></BillRow>
        {selectedOrder.table_number && (<BillRow><strong>Table:</strong><span>{selectedOrder.table_number}{selectedOrder.guest_count ? ` (${selectedOrder.guest_count}p)` : ''}</span></BillRow>)}
        {(selectedOrder.order_type === 'takeaway' || selectedOrder.order_type === 'pickup') && (
          <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '10px 0' }}>
            PICKUP #{selectedOrder.order_number.split('-')[1] || '000'}
          </div>
        )}
        {selectedOrder.order_type === 'pickup' && (
          <div style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', margin: '5px 0', color: '#8B5CF6' }}>
            Pickup: {selectedOrder.scheduled_pickup_time ? formatPickupTimeRange(selectedOrder.scheduled_pickup_time) : 'ASAP'}
          </div>
        )}
      </BillSection>

      <BillSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
        <table style={{ width: '100%', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px dashed #000' }}>
              <th style={{ textAlign: 'left', padding: '5px 0' }}>{t('orders:liveOrdersPage.item')}</th>
              <th style={{ textAlign: 'center', width: '40px' }}>{t('orders:liveOrdersPage.qty')}</th>
              <th style={{ textAlign: 'right', width: '60px' }}>{t('orders:liveOrdersPage.price')}</th>
              <th style={{ textAlign: 'right', width: '60px' }}>{t('orders:liveOrdersPage.total')}</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.order_items && Array.isArray(selectedOrder.order_items) && selectedOrder.order_items.map((item: any, index: number) => (
              <tr key={index}>
                <td style={{ padding: '5px 0' }}>
                  {item.name || item.menuItem?.name || 'Item'}
                  {item.options && item.options.length > 0 && (
                    <div style={{ fontSize: '10px', fontStyle: 'italic', marginLeft: '10px' }}>
                      {Array.isArray(item.options) ? item.options.join(', ') : item.options}
                    </div>
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ textAlign: 'right' }}>{parseFloat(item.price || item.menuItem?.price || 0).toFixed(2)}</td>
                <td style={{ textAlign: 'right' }}>{(item.quantity * parseFloat(item.price || item.menuItem?.price || 0)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </BillSection>

      <BillSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
        <BillRow><span>Subtotal:</span><span>{formatCurrency(Number((selectedOrder as any).subtotal || selectedOrder.total_amount), operationSettings.currency)}</span></BillRow>
        {(selectedOrder as any).discount > 0 && (<BillRow><span>Discount:</span><span>{formatCurrency(-Number((selectedOrder as any).discount), operationSettings.currency)}</span></BillRow>)}
        {(selectedOrder as any).coupon_discount > 0 && (<BillRow><span>Coupon ({(selectedOrder as any).coupon_code}):</span><span>{formatCurrency(-Number((selectedOrder as any).coupon_discount), operationSettings.currency)}</span></BillRow>)}
        {parseFloat((selectedOrder as any).takeaway_charge || 0) > 0 && (<BillRow><span>Takeaway Charge:</span><span>{formatCurrency(parseFloat((selectedOrder as any).takeaway_charge), operationSettings.currency)}</span></BillRow>)}
        {(selectedOrder as any).service_charge > 0 && (<BillRow><span>Service Charge ({(selectedOrder as any).service_charge_rate || 10}%):</span><span>{formatCurrency(Number((selectedOrder as any).service_charge), operationSettings.currency)}</span></BillRow>)}
        {(selectedOrder as any).tax > 0 && (<BillRow><span>Tax ({(selectedOrder as any).tax_rate || 6}%):</span><span>{formatCurrency(Number((selectedOrder as any).tax), operationSettings.currency)}</span></BillRow>)}
        <BillRow style={{ borderTop: '1px solid #000', paddingTop: '5px', fontSize: '14px', fontWeight: 'bold' }}><span>TOTAL:</span><span>{formatCurrency(Number(selectedOrder.total_amount), operationSettings.currency)}</span></BillRow>
      </BillSection>

      <BillSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
        <BillRow><span>Payment Method:</span><span>{formatPaymentDisplay(selectedOrder.payment_method, (selectedOrder as any).card_type, paymentSettings || undefined).toUpperCase()}</span></BillRow>
        <BillRow><span>Order Status:</span><span>{selectedOrder.status.toUpperCase()}</span></BillRow>
      </BillSection>

      <BillFooter>
        <div>*** CUSTOMER COPY ***</div>
        <div>{t('orders:liveOrdersPage.thankYouForYourPurchase')}</div>
        <div>{t('orders:liveOrdersPage.pleaseKeepThisReceiptForYourRecords')}</div>
      </BillFooter>
    </BillPrintContainer>,
    document.body
  );
};

export default BillPrintPortal;
