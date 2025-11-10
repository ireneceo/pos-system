import React from 'react';
import { Modal, ModalButton as Button } from '../UI/Modal';
import {
  Section,
  TotalSection,
  TotalLabel,
  TotalPrice
} from '../common/Modal';
import styled, { createGlobalStyle } from 'styled-components';
import { useStore } from '../../contexts/StoreContext';
import { printBill } from '../../utils/thermalPrinter';

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

const PrintItem = styled.div`
  margin: 8px 0;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 5px;
`;

const PrintItemName = styled.div`
  font-weight: bold;
  margin-bottom: 2px;
`;

const PrintItemOptions = styled.div`
  font-size: 11px;
  margin-left: 10px;
  font-style: italic;
`;

const PrintTotal = styled.div`
  border-top: 2px solid #000;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`;

const PrintFooter = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 11px;
  border-top: 1px dashed #000;
  padding-top: 10px;
`;

interface OrderCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: {
    orderNumber: string;
    pickupNumber?: string;
    date: Date;
    items: Array<{
      id: string;
      menuItem: { id: string; name: string; price: number };
      quantity: number;
      options?: string[];
    }>;
    subtotal: number;
    discount: number;
    coupon: { code: string; discount: number } | null;
    tax: number;
    total: number;
    paymentMethod: string;
    amountReceived: number;
    change: number;
  };
  onPrintBill: () => void;
}

const OrderCompleteModal: React.FC<OrderCompleteModalProps> = ({
  isOpen,
  onClose,
  orderData,
  onPrintBill
}) => {
  const { getStoreInfo } = useStore();
  const storeInfo = getStoreInfo();

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-MY', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handlePrintBill = async () => {
    // Use thermal printer utility - automatically detects device type
    await printBill(orderData, storeInfo);

    // Callback after print
    setTimeout(() => {
      onPrintBill();
    }, 100);
  };

  const footer = (
    <>
      <Button variant="secondary" onClick={handlePrintBill}>
        Print Bill
      </Button>
      <Button variant="primary" onClick={onClose}>
        Close
      </Button>
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
      >
        <div style={{ textAlign: 'center' }}>
          <OrderNumber>Order {orderData.orderNumber}</OrderNumber>
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
              {orderData.pickupNumber || orderData.orderNumber.split('-')[1] || '000'}
            </div>
          </div>
        </div>
        
        <OrderDetails>
          <DetailRow>
            <DetailLabel>Date & Time</DetailLabel>
            <DetailValue>{formatDateTime(orderData.date)}</DetailValue>
          </DetailRow>
          <DetailRow>
            <DetailLabel>Payment Method</DetailLabel>
            <DetailValue>{orderData.paymentMethod}</DetailValue>
          </DetailRow>
          {orderData.paymentMethod === 'cash' && (
            <>
              <DetailRow>
                <DetailLabel>Amount Received</DetailLabel>
                <DetailValue>RM {orderData.amountReceived.toFixed(2)}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Change</DetailLabel>
                <DetailValue>RM {orderData.change.toFixed(2)}</DetailValue>
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
                <ItemPrice>RM {(item.menuItem.price * item.quantity).toFixed(2)}</ItemPrice>
              </ItemRow>
            ))}
          </ItemsList>
        </Section>

        <Section>
          <DetailRow>
            <DetailLabel>Subtotal</DetailLabel>
            <DetailValue>RM {orderData.subtotal.toFixed(2)}</DetailValue>
          </DetailRow>
          {orderData.discount > 0 && (
            <DetailRow>
              <DetailLabel>Discount</DetailLabel>
              <DetailValue style={{ color: '#10B981' }}>-RM {orderData.discount.toFixed(2)}</DetailValue>
            </DetailRow>
          )}
          {orderData.coupon && (
            <DetailRow>
              <DetailLabel>Coupon ({orderData.coupon.code})</DetailLabel>
              <DetailValue style={{ color: '#10B981' }}>-RM {orderData.coupon.discount.toFixed(2)}</DetailValue>
            </DetailRow>
          )}
          <DetailRow>
            <DetailLabel>Tax (6%)</DetailLabel>
            <DetailValue>RM {orderData.tax.toFixed(2)}</DetailValue>
          </DetailRow>
        </Section>
        
        <TotalSection style={{ marginTop: 0 }}>
          <TotalLabel>Total</TotalLabel>
          <TotalPrice>RM {orderData.total.toFixed(2)}</TotalPrice>
        </TotalSection>
      </Modal>
      
      {/* Bill Print Content - Hidden until print */}
      <BillPrintContent id="order-complete-bill-print">
        <PrintHeader>
          <PrintTitle>{storeInfo.name}</PrintTitle>
          <div style={{ fontSize: '11px', marginTop: '5px' }}>
            {storeInfo.address}<br />
            Tel: {storeInfo.phone}<br />
            GST Reg No: {storeInfo.gstRegNo}
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
            <span>POS Terminal</span>
          </PrintRow>
          <div style={{ fontSize: '20px', fontWeight: 'bold', textAlign: 'center', margin: '10px 0' }}>
            PICKUP #{orderData.pickupNumber || orderData.orderNumber.split('-')[1] || '000'}
          </div>
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
            <span>RM {orderData.subtotal.toFixed(2)}</span>
          </PrintRow>
          {orderData.discount > 0 && (
            <PrintRow>
              <span>Discount:</span>
              <span>-RM {orderData.discount.toFixed(2)}</span>
            </PrintRow>
          )}
          {orderData.coupon && (
            <PrintRow>
              <span>Coupon ({orderData.coupon.code}):</span>
              <span>-RM {orderData.coupon.discount.toFixed(2)}</span>
            </PrintRow>
          )}
          <PrintRow>
            <span>Tax (6%):</span>
            <span>RM {orderData.tax.toFixed(2)}</span>
          </PrintRow>
          <PrintRow style={{ borderTop: '1px solid #000', paddingTop: '5px', fontSize: '14px', fontWeight: 'bold' }}>
            <span>TOTAL:</span>
            <span>RM {orderData.total.toFixed(2)}</span>
          </PrintRow>
        </PrintSection>

        <PrintSection style={{ borderTop: '1px dashed #000', paddingTop: '10px' }}>
          <PrintRow>
            <span>Payment Method:</span>
            <span>{orderData.paymentMethod.toUpperCase()}</span>
          </PrintRow>
          {orderData.paymentMethod === 'cash' && (
            <>
              <PrintRow>
                <span>Amount Received:</span>
                <span>RM {orderData.amountReceived.toFixed(2)}</span>
              </PrintRow>
              <PrintRow>
                <span>Change:</span>
                <span>RM {orderData.change.toFixed(2)}</span>
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