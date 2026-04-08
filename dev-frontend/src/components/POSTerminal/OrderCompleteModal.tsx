import React from 'react';
import { Modal, ModalButton as Button } from '../UI/Modal';
import {
  Section,
  TotalSection,
  TotalLabel,
  TotalPrice
} from '../Common/Modal';
import styled, { createGlobalStyle } from 'styled-components';
import { useStore } from '../../contexts/StoreContext';
// OLD: import { printBill } from '../../utils/thermalPrinter';
import { printBillViaRawBT, printKitchenTicketViaRawBT } from '../../utils/billPrint';
import { formatDateTime as formatDateTimeUtil } from '../../utils/timezone';
import { formatCurrency } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';
import { useTranslation } from 'react-i18next';

// Global print styles
const PrintStyles = createGlobalStyle`
  @media print {
    /* Reset body for print */
    body {
      margin: 0 !important;
      padding: 0 !important;
      background: white !important;
    }

    /* Hide all elements by default */
    body > * {
      display: none !important;
    }

    /* Show only the print content */
    #order-complete-bill-print {
      display: block !important;
      position: static !important;
      left: 0 !important;
      top: 0 !important;
      visibility: visible !important;
    }

    #order-complete-bill-print * {
      visibility: visible !important;
    }

    /* Ensure proper page settings */
    @page {
      size: 80mm auto;
      margin: 0;
    }
  }
`;

const OrderNumber = styled.div`
  font-size: 20px;
  color: #635BFF;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`;

const OrderDetails = styled.div`
  background: #F8FAFC;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #E2E8F0;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  color: #6B7280;
`;

const DetailValue = styled.span`
  font-weight: 500;
  color: #1F2937;
`;

const ItemsList = styled.div`
  margin-bottom: 20px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #F3F4F6;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const ItemOptions = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const ItemQuantity = styled.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 16px;
`;

const ItemPrice = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1F2937;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1F2937;
  margin: 0 0 16px 0;
`;

// Bill print styles for kitchen
const BillPrintContent = styled.div`
  position: fixed;
  top: -9999px;
  left: -9999px;
  width: 80mm;
  background: white;
  padding: 10mm;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.4;
  color: #000;
  z-index: -1;

  @media print {
    position: static !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 9999 !important;
  }

  * {
    color: #000 !important;
    background: white !important;
  }
`;

const PrintHeader = styled.div`
  text-align: center;
  border-bottom: 1px dashed #000;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const PrintTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 5px 0;
  text-transform: uppercase;
`;

const PrintSection = styled.div`
  margin: 10px 0;
  padding: 5px 0;
`;

const PrintRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3px 0;
`;

const PrintFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`;

const HeaderActionButton = styled.button`
  background: none;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  color: #6B7C93;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;
  font-weight: 500;

  &:hover {
    background: #F8FAFC;
    color: #0A2540;
    border-color: #CBD5E1;
  }

  &:active {
    transform: scale(0.98);
  }
`;

interface OrderCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderNumber: string;
    pickupNumber?: string;
    tableNumber?: string | null;
    pagerNumber?: string | null;
    date: Date;
    items: Array<{
      id: string;
      menuItem: { id: string; name: string; price: number };
      quantity: number;
      options?: string[];
    }>;
    subtotal: number;
    discount: number;
    discountPolicy?: { name: string; amount: number };
    coupon: { code: string; discount: number } | null;
    takeawayCharge?: number;
    serviceCharge?: number;
    serviceChargeRate?: number;
    tax: number;
    taxRate?: number;
    total: number;
    paymentMethod: string;
    cardType?: string | null;
    amountReceived: number;
    change: number;
    // Points
    pointsUsed?: number;
    pointDiscount?: number;
    // Cashier
    cashierName?: string | null;
  };
  onPrintBill: () => void;
}

const OrderCompleteModal: React.FC<OrderCompleteModalProps> = ({
  isOpen,
  onClose,
  orderData,
  onPrintBill
}) => {
  const { t } = useTranslation('common');
  const { getStoreInfo, operationSettings, paymentSettings } = useStore();
  const storeInfo = getStoreInfo();
  // Auto-print is handled in POSTerminalPage after payment completion

  // Format date/time with restaurant timezone
  const formatDateTime = (date?: Date | string) => {
    return formatDateTimeUtil(date, operationSettings);
  };

  const handlePrintBill = async () => {
    // Use RawBT printer with proper URL schema
    // OLD: const success = await printBill(orderData, storeInfo);
    const success = await printBillViaRawBT(orderData, storeInfo);

    // Only trigger callback if print was successful
    if (success) {
      setTimeout(() => {
        onPrintBill();
      }, 100);
    }
    // If failed, printBillViaRawBT already showed error message to user
  };

  const handlePrintKitchenTicket = async () => {
    await printKitchenTicketViaRawBT(orderData, storeInfo);
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={handlePrintBill}>
        Print Bill
      </Button>
      <Button variant="secondary" onClick={handlePrintKitchenTicket}>
        Print Order Ticket
      </Button>
      <Button variant="primary" onClick={onClose}>
        Close
      </Button>
    </>
  );

  const headerActions = (
    <>
      <HeaderActionButton onClick={handlePrintBill} title="Print Bill">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6,9 6,2 18,2 18,9"/>
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
          <rect x="6" y="14" width="12" height="8"/>
        </svg>
        <span>Bill</span>
      </HeaderActionButton>
      <HeaderActionButton onClick={handlePrintKitchenTicket} title="Print Order Ticket">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
        <span>Ticket</span>
      </HeaderActionButton>
    </>
  );

  return (
    <>
      <PrintStyles />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Order Complete!"
        footer={footer}
        headerActions={headerActions}
      >
        <div style={{ textAlign: 'center' }}>
          <OrderNumber>Order {orderData.orderNumber}</OrderNumber>
          {orderData.pagerNumber ? (
            /* Pager Number가 있으면 Pager만 표시 */
            <div style={{
              background: '#10B981',
              color: 'white',
              borderRadius: '12px',
              padding: '16px 24px',
              margin: '0 auto 24px',
              display: 'inline-block'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Pager Number</div>
              <div style={{ fontSize: '36px', fontWeight: '700', lineHeight: 1 }}>
                {orderData.pagerNumber}
              </div>
            </div>
          ) : (
            /* Pager Number가 없으면 Pickup Number 표시 */
            <div style={{
              background: '#635BFF',
              color: 'white',
              borderRadius: '12px',
              padding: '16px 24px',
              margin: '0 auto 24px',
              display: 'inline-block'
            }}>
              <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Pickup Number</div>
              <div style={{ fontSize: '36px', fontWeight: '700', lineHeight: 1 }}>
                {orderData.pickupNumber || (orderData.orderNumber?.includes('-') ? orderData.orderNumber.split('-')[1] : orderData.orderNumber) || '-'}
              </div>
            </div>
          )}
        </div>

        <OrderDetails>
          <DetailRow>
            <DetailLabel>Date & Time</DetailLabel>
            <DetailValue>{formatDateTime(orderData.date)}</DetailValue>
          </DetailRow>
          {orderData.cashierName && (
            <DetailRow>
              <DetailLabel>Cashier</DetailLabel>
              <DetailValue>{orderData.cashierName}</DetailValue>
            </DetailRow>
          )}
          <DetailRow>
            <DetailLabel>Payment Method</DetailLabel>
            <DetailValue>{formatPaymentDisplay(orderData.paymentMethod, orderData.cardType, paymentSettings || undefined)}</DetailValue>
          </DetailRow>
          {orderData.paymentMethod === 'cash' && (
            <>
              <DetailRow>
                <DetailLabel>Amount Received</DetailLabel>
                <DetailValue>{formatCurrency(orderData.amountReceived, operationSettings.currency)}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Change</DetailLabel>
                <DetailValue>{formatCurrency(orderData.change, operationSettings.currency)}</DetailValue>
              </DetailRow>
            </>
          )}
        </OrderDetails>

        <Section>
          <SectionTitle>Order Items</SectionTitle>
          <ItemsList>
            {orderData.items.map((item, index) => (
              <ItemRow key={index}>
                <ItemInfo>
                  <ItemName>{item.menuItem.name}</ItemName>
                  {item.options && item.options.length > 0 && (
                    <ItemOptions>{item.options.join(', ')}</ItemOptions>
                  )}
                </ItemInfo>
                <ItemQuantity>{item.quantity}x</ItemQuantity>
                <ItemPrice>{formatCurrency(item.menuItem.price * item.quantity, operationSettings.currency)}</ItemPrice>
              </ItemRow>
            ))}
          </ItemsList>
        </Section>

        <Section>
          <DetailRow>
            <DetailLabel>Subtotal</DetailLabel>
            <DetailValue>{formatCurrency(orderData.subtotal, operationSettings.currency)}</DetailValue>
          </DetailRow>
          {Number(orderData.takeawayCharge) > 0 && (
            <DetailRow>
              <DetailLabel>Takeaway Charge</DetailLabel>
              <DetailValue>{formatCurrency(Number(orderData.takeawayCharge), operationSettings.currency)}</DetailValue>
            </DetailRow>
          )}
          {Number(orderData.discount) > 0 && (
            <DetailRow>
              <DetailLabel>Discount</DetailLabel>
              <DetailValue style={{ color: '#10B981' }}>{formatCurrency(-Number(orderData.discount), operationSettings.currency)}</DetailValue>
            </DetailRow>
          )}
          {orderData.discountPolicy && Number(orderData.discountPolicy.amount) > 0 && (
            <DetailRow>
              <DetailLabel>Discount ({orderData.discountPolicy.name})</DetailLabel>
              <DetailValue style={{ color: '#10B981' }}>{formatCurrency(-Number(orderData.discountPolicy.amount), operationSettings.currency)}</DetailValue>
            </DetailRow>
          )}
          {orderData.coupon && Number(orderData.coupon.discount) > 0 && (
            <DetailRow>
              <DetailLabel>Coupon ({orderData.coupon.code})</DetailLabel>
              <DetailValue style={{ color: '#10B981' }}>{formatCurrency(-Number(orderData.coupon.discount), operationSettings.currency)}</DetailValue>
            </DetailRow>
          )}
          {Number(orderData.pointDiscount) > 0 && (
            <DetailRow>
              <DetailLabel>Points ({orderData.pointsUsed?.toLocaleString()} pts)</DetailLabel>
              <DetailValue style={{ color: '#10B981' }}>{formatCurrency(-Number(orderData.pointDiscount), operationSettings.currency)}</DetailValue>
            </DetailRow>
          )}
          {Number(orderData.serviceCharge) > 0 && (
            <DetailRow>
              <DetailLabel>Service Charge ({orderData.serviceChargeRate || 10}%)</DetailLabel>
              <DetailValue>{formatCurrency(Number(orderData.serviceCharge), operationSettings.currency)}</DetailValue>
            </DetailRow>
          )}
          {Number(orderData.tax) > 0 && (
            <DetailRow>
              <DetailLabel>Tax ({orderData.taxRate || 6}%)</DetailLabel>
              <DetailValue>{formatCurrency(Number(orderData.tax), operationSettings.currency)}</DetailValue>
            </DetailRow>
          )}
        </Section>

        <TotalSection style={{ marginTop: 0 }}>
          <TotalLabel>Total</TotalLabel>
          <TotalPrice>{formatCurrency(orderData.total, operationSettings.currency)}</TotalPrice>
        </TotalSection>
      </Modal>
      
      {/* Bill Print Content - Hidden until print */}
      <BillPrintContent id="order-complete-bill-print">
        <PrintHeader>
          <PrintTitle>{storeInfo.name}</PrintTitle>
          <div style={{ fontSize: '11px', marginTop: '5px' }}>
            {storeInfo.address}<br />
            Tel: {storeInfo.phone}
            {(storeInfo.businessRegistration || storeInfo.gstRegNo) && (
              <>
                <br />
                {storeInfo.businessRegistration && <>Reg No: {storeInfo.businessRegistration}</>}
                {storeInfo.businessRegistration && storeInfo.gstRegNo && ' | '}
                {storeInfo.gstRegNo && <>Tax No: {storeInfo.gstRegNo}</>}
              </>
            )}
          </div>
        </PrintHeader>

        <PrintSection style={{ borderTop: '2px solid #000', paddingTop: '10px' }}>
          <PrintRow>
            <strong>Order No:</strong>
            <span>{orderData.orderNumber}</span>
          </PrintRow>
          <PrintRow>
            <strong>Date:</strong>
            <span>{formatDateTime(orderData.date)}</span>
          </PrintRow>
          <PrintRow>
            <strong>Cashier:</strong>
            <span>{orderData.cashierName || 'POS Terminal'}</span>
          </PrintRow>
          <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '10px 0' }}>
            PICKUP #{orderData.pickupNumber || (orderData.orderNumber?.includes('-') ? orderData.orderNumber.split('-')[1] : orderData.orderNumber) || '-'}
          </div>
          {orderData.pagerNumber && (
            <div style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', margin: '5px 0' }}>
              PAGER #{orderData.pagerNumber}
            </div>
          )}
        </PrintSection>

        <PrintSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
          <table style={{ width: '100%', fontSize: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '1px dashed #000' }}>
                <th style={{ textAlign: 'left', padding: '5px 0' }}>Item</th>
                <th style={{ textAlign: 'center', width: '40px' }}>Qty</th>
                <th style={{ textAlign: 'right', width: '60px' }}>Price</th>
                <th style={{ textAlign: 'right', width: '60px' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData.items.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td style={{ padding: '5px 0' }}>
                      {item.menuItem.name}
                      {item.options && item.options.length > 0 && (
                        <div style={{ fontSize: '10px', fontStyle: 'italic', marginLeft: '10px' }}>
                          {item.options.join(', ')}
                        </div>
                      )}
                    </td>
                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ textAlign: 'right' }}>{item.menuItem.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'right' }}>{(item.quantity * item.menuItem.price).toFixed(2)}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </PrintSection>

        <PrintSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
          <PrintRow>
            <span>Subtotal:</span>
            <span>{formatCurrency(orderData.subtotal, operationSettings.currency)}</span>
          </PrintRow>
          {Number(orderData.takeawayCharge) > 0 && (
            <PrintRow>
              <span>Takeaway Charge:</span>
              <span>{formatCurrency(Number(orderData.takeawayCharge), operationSettings.currency)}</span>
            </PrintRow>
          )}
          {Number(orderData.discount) > 0 && (
            <PrintRow>
              <span>Discount:</span>
              <span>{formatCurrency(-Number(orderData.discount), operationSettings.currency)}</span>
            </PrintRow>
          )}
          {orderData.discountPolicy && Number(orderData.discountPolicy.amount) > 0 && (
            <PrintRow>
              <span>Discount ({orderData.discountPolicy.name}):</span>
              <span>{formatCurrency(-Number(orderData.discountPolicy.amount), operationSettings.currency)}</span>
            </PrintRow>
          )}
          {orderData.coupon && Number(orderData.coupon.discount) > 0 && (
            <PrintRow>
              <span>Coupon ({orderData.coupon.code}):</span>
              <span>{formatCurrency(-Number(orderData.coupon.discount), operationSettings.currency)}</span>
            </PrintRow>
          )}
          {Number(orderData.pointDiscount) > 0 && (
            <PrintRow>
              <span>Points ({orderData.pointsUsed?.toLocaleString()} pts):</span>
              <span>{formatCurrency(-Number(orderData.pointDiscount), operationSettings.currency)}</span>
            </PrintRow>
          )}
          {Number(orderData.serviceCharge) > 0 && (
            <PrintRow>
              <span>Service Charge ({orderData.serviceChargeRate || 10}%):</span>
              <span>{formatCurrency(Number(orderData.serviceCharge), operationSettings.currency)}</span>
            </PrintRow>
          )}
          {Number(orderData.tax) > 0 && (
            <PrintRow>
              <span>Tax ({orderData.taxRate || 6}%):</span>
              <span>{formatCurrency(Number(orderData.tax), operationSettings.currency)}</span>
            </PrintRow>
          )}
          <PrintRow style={{ borderTop: '1px solid #000', paddingTop: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            <span>TOTAL:</span>
            <span>{formatCurrency(orderData.total, operationSettings.currency)}</span>
          </PrintRow>
        </PrintSection>

        <PrintSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
          <PrintRow>
            <span>Payment Method:</span>
            <span>{formatPaymentDisplay(orderData.paymentMethod, orderData.cardType, paymentSettings || undefined).toUpperCase()}</span>
          </PrintRow>
          {orderData.paymentMethod === 'cash' && (
            <>
              <PrintRow>
                <span>Amount Received:</span>
                <span>{formatCurrency(orderData.amountReceived, operationSettings.currency)}</span>
              </PrintRow>
              <PrintRow>
                <span>Change:</span>
                <span>{formatCurrency(orderData.change, operationSettings.currency)}</span>
              </PrintRow>
            </>
          )}
        </PrintSection>

        <PrintFooter>
          <div>*** CUSTOMER COPY ***</div>
          <div>Thank you for your purchase!</div>
          <div>Please keep this receipt for your records</div>
        </PrintFooter>
      </BillPrintContent>
    </>
  );
};

export default OrderCompleteModal;