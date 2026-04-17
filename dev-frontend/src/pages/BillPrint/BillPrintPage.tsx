import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import QRCode from 'qrcode';
import { EmptyState } from '../../components/UI/TableComponents';
import { useOrders } from '../../contexts/OrderContext';
import { useStore } from '../../contexts/StoreContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/currency';
import { formatPaymentDisplay } from '../../constants';
import { formatDateTime as formatDateTimeUtil } from '../../utils/timezone';
import { useTranslation } from 'react-i18next';

import { getAuthToken } from '../../utils/auth';
import { getRestaurantDisplayName } from '../../utils/restaurantDisplay';
// Helper function to format pickup time as range (e.g., "9:00 - 9:30 AM")
const formatPickupTimeRange = (dateString: string): string => {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000); // Add 30 minutes

  const formatTimeSlot = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    const displayMin = minutes.toString().padStart(2, '0');
    return { time: `${displayHour}:${displayMin}`, period };
  };

  const start = formatTimeSlot(date);
  const end = formatTimeSlot(endDate);

  if (start.period === end.period) {
    return `${start.time} - ${end.time} ${end.period}`;
  }
  return `${start.time} ${start.period} - ${end.time} ${end.period}`;
};

const PageContainer = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0A2540;
  margin: 0;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #E6EBF1;
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #635BFF;
  }
  
  &::placeholder {
    color: #9CA3AF;
  }
`;

const SearchButton = styled.button`
  padding: 12px 24px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    background: #5A51E6;
  }
`;

const BillContainer = styled.div`
  background: white;
  border: 1px solid #E6EBF1;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;

  @media print {
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 10mm !important;
    margin: 0 !important;
    width: 80mm !important;
    max-width: 80mm !important;
  }
`;

const BillHeader = styled.div`
  text-align: center;
  border-bottom: 2px solid #E6EBF1;
  padding-bottom: 24px;
  margin-bottom: 24px;
`;

const StoreName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #0A2540;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
`;

const StoreInfo = styled.div`
  color: #6B7280;
  font-size: 12px;
  line-height: 1.5;
`;

const BillSection = styled.div`
  margin-bottom: 20px;
`;

const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  
  &.total {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #E6EBF1;
    font-size: 18px;
    font-weight: 600;
  }
`;

const Label = styled.span`
  color: #6B7280;
`;

const Value = styled.span`
  color: #1F2937;
  font-weight: 500;
`;

const ItemsTable = styled.table`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px 0;
  border-bottom: 2px solid #E6EBF1;
  font-size: 12px;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  
  &:last-child {
    text-align: right;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #F3F4F6;
`;

const TableCell = styled.td`
  padding: 12px 0;
  font-size: 14px;
  color: #1F2937;
  
  &:last-child {
    text-align: right;
    font-weight: 500;
  }
`;

const ItemName = styled.div`
  font-weight: 500;
`;

const ItemOptions = styled.div`
  font-size: 12px;
  color: #6B7280;
  margin-top: 4px;
`;

const PrintButton = styled.button`
  display: block;
  margin: 0 auto;
  padding: 12px 32px;
  background: #635BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  
  &:hover {
    background: #5A51E6;
  }
  
  svg {
    margin-right: 8px;
  }
`;


const Footer = styled.div`
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px dashed #E6EBF1;
  font-size: 12px;
  color: #6B7280;
`;

const ReceiptQrSection = styled.div`
  text-align: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px dashed #E6EBF1;
`;

const ReceiptPointsSection = styled.div`
  text-align: center;
  margin-top: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 6px;
  font-size: 13px;
  color: #374151;
`;

const BillPrintPage: React.FC = () => {
  const { t } = useTranslation('pos');
  const { orders } = useOrders();
  const storeContext = useStore();
  const companyInfo = (storeContext as any).companyInfo;
  const { operationSettings, paymentSettings } = useStore();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [receiptSettings, setReceiptSettings] = useState({ receiptLogo: '', footerMessage: 'Thank you for dining with us!', showMembership: true } as any);
  const [restaurantSlug, setRestaurantSlug] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');

  // Load receipt settings
  useEffect(() => {
    const loadReceiptSettings = async () => {
      if (!user?.restaurantId) return;
      try {
        const token = getAuthToken();
        const res = await fetch(`/api/restaurants/${user.restaurantId}`, { headers: { 'Authorization': `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          if (data.slug) setRestaurantSlug(data.slug);
          const ps = data.printer_settings || data.data?.printer_settings;
          if (ps?.receiptSettings) {
            const rs = { ...ps.receiptSettings };
            if ('showQrCode' in rs || 'showPointsInfo' in rs) {
              rs.showMembership = rs.showQrCode !== false || rs.showPointsInfo !== false;
              delete rs.showQrCode;
              delete rs.showPointsInfo;
            }
            setReceiptSettings((prev: any) => ({ ...prev, ...rs }));
          }
        }
      } catch {}
    };
    loadReceiptSettings();
  }, [user?.restaurantId]);

  // Generate QR code
  useEffect(() => {
    if (!receiptSettings.showMembership || !restaurantSlug) return;
    const mobileUrl = `https://purplehere.com/mobile/${restaurantSlug}/account`;
    QRCode.toDataURL(mobileUrl, { width: 120, margin: 1, color: { dark: '#000', light: '#FFF' } })
      .then((url: string) => setQrDataUrl(url))
      .catch(() => {});
  }, [receiptSettings.showMembership, restaurantSlug]);

  const handleSearch = () => {
    const order = orders.find(o =>
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.phone.includes(searchTerm)
    );
    setSelectedOrder(order);
  };

  const handlePrint = () => {
    window.print();
  };

  // Format date/time with restaurant timezone
  const formatDateTime = (date?: Date | string) => {
    return formatDateTimeUtil(date, (companyInfo as any)?.operation_settings);
  };

  return (
    <>
      <PageContainer className="no-print">
        <PageHeader>
          <Title>{t('pos:billPrintPage.billPrint')}</Title>
        </PageHeader>

        <SearchSection>
          <SearchInput
            type="text"
            placeholder="Search by order number or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>
            Search Order
          </SearchButton>
        </SearchSection>

        {selectedOrder && ReactDOM.createPortal(
          <BillContainer data-print-bill>
            <BillHeader>
              {receiptSettings.receiptLogo && (
                <img src={receiptSettings.receiptLogo} alt="Logo" style={{ maxWidth: '160px', maxHeight: '50px', marginBottom: '8px', filter: 'grayscale(100%)' }} />
              )}
              <StoreName>{getRestaurantDisplayName({ name: storeContext.storeSettings.name, branchName: storeContext.storeSettings.branchName })}</StoreName>
              <StoreInfo>
                {storeContext.storeSettings.address && <>{storeContext.storeSettings.address}<br /></>}
                {(storeContext.storeSettings.city || storeContext.storeSettings.state) && (
                  <>{[storeContext.storeSettings.city, storeContext.storeSettings.state, storeContext.storeSettings.postalCode].filter(Boolean).join(', ')}<br /></>
                )}
                {storeContext.storeSettings.phone && <>Tel: {storeContext.storeSettings.phone}<br /></>}
                {(storeContext.storeSettings.businessRegistration || storeContext.storeSettings.gstRegNo) && (
                  <>
                    {storeContext.storeSettings.businessRegistration && <>Reg No: {storeContext.storeSettings.businessRegistration}</>}
                    {storeContext.storeSettings.businessRegistration && storeContext.storeSettings.gstRegNo && ' | '}
                    {storeContext.storeSettings.gstRegNo && <>Tax No: {storeContext.storeSettings.gstRegNo}</>}
                  </>
                )}
              </StoreInfo>
            </BillHeader>

            <BillSection>
              <BillRow>
                <Label>Order No:</Label>
                <Value>{selectedOrder.orderNumber}</Value>
              </BillRow>
              <BillRow>
                <Label>Date:</Label>
                <Value>{formatDateTime(selectedOrder.createdAt)}</Value>
              </BillRow>
              <BillRow>
                <Label>Cashier:</Label>
                <Value>{t('pos:billPrintPage.posTerminal')}</Value>
              </BillRow>
              <BillRow>
                <Label>Customer:</Label>
                <Value>{selectedOrder.customer.name}</Value>
              </BillRow>
              <BillRow>
                <Label>Phone:</Label>
                <Value>{selectedOrder.customer.phone}</Value>
              </BillRow>
            </BillSection>

            <ItemsTable>
              <thead>
                <tr>
                  <TableHeader style={{ width: '60%' }}>{t('pos:billPrintPage.item')}</TableHeader>
                  <TableHeader style={{ width: '15%' }}>{t('pos:billPrintPage.qty')}</TableHeader>
                  <TableHeader style={{ width: '12.5%' }}>{t('pos:billPrintPage.price')}</TableHeader>
                  <TableHeader style={{ width: '12.5%' }}>{t('pos:billPrintPage.total')}</TableHeader>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      <ItemName>{item.menuItem.name}</ItemName>
                      {item.options && item.options.length > 0 && (
                        <ItemOptions>{item.options.join(', ')}</ItemOptions>
                      )}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.menuItem.price, operationSettings.currency)}</TableCell>
                    <TableCell>{formatCurrency(item.quantity * item.menuItem.price, operationSettings.currency)}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </ItemsTable>

            <BillSection>
              <BillRow>
                <Label>Subtotal:</Label>
                <Value>{formatCurrency(selectedOrder.subtotal, operationSettings.currency)}</Value>
              </BillRow>
              {selectedOrder.discount > 0 && (
                <BillRow>
                  <Label>Discount:</Label>
                  <Value style={{ color: '#10B981' }}>{formatCurrency(-selectedOrder.discount, operationSettings.currency)}</Value>
                </BillRow>
              )}
              {selectedOrder.coupon && (
                <BillRow>
                  <Label>Coupon ({selectedOrder.coupon.code}):</Label>
                  <Value style={{ color: '#10B981' }}>{formatCurrency(-selectedOrder.coupon.amount, operationSettings.currency)}</Value>
                </BillRow>
              )}
              {Number(selectedOrder.takeawayCharge || 0) > 0 && (
                <BillRow>
                  <Label>Takeaway Charge:</Label>
                  <Value>{formatCurrency(Number(selectedOrder.takeawayCharge), operationSettings.currency)}</Value>
                </BillRow>
              )}
              {selectedOrder.tax > 0 && (
                <BillRow>
                  <Label>Tax (6%):</Label>
                  <Value>{formatCurrency(selectedOrder.tax, operationSettings.currency)}</Value>
                </BillRow>
              )}
              <BillRow className="total">
                <Label>TOTAL:</Label>
                <Value>{formatCurrency(selectedOrder.total, operationSettings.currency)}</Value>
              </BillRow>
            </BillSection>

            <BillSection>
              <BillRow>
                <Label>Payment Method:</Label>
                <Value>{formatPaymentDisplay(selectedOrder.paymentMethod || selectedOrder.payment_method, selectedOrder.cardType || selectedOrder.card_type, paymentSettings || undefined).toUpperCase()}</Value>
              </BillRow>
              <BillRow>
                <Label>Order Type:</Label>
                <Value>{selectedOrder.orderType === 'dine-in' || selectedOrder.orderType === 'dine_in' ? 'DINE IN' : selectedOrder.orderType === 'pickup' ? 'PICKUP' : 'TAKEAWAY'}</Value>
              </BillRow>
              {(selectedOrder.orderType === 'takeaway' || selectedOrder.orderType === 'pickup') && (
                <BillRow>
                  <Label>Pickup Number:</Label>
                  <Value style={{ fontSize: '20px', fontWeight: '700' }}>
                    {selectedOrder.orderNumber.split('-')[1] || '000'}
                  </Value>
                </BillRow>
              )}
              {selectedOrder.orderType === 'pickup' && (
                <BillRow>
                  <Label>Pickup Time:</Label>
                  <Value style={{ fontWeight: '600', color: '#8B5CF6' }}>
                    {selectedOrder.scheduledPickupTime ? formatPickupTimeRange(selectedOrder.scheduledPickupTime) : 'ASAP'}
                  </Value>
                </BillRow>
              )}
            </BillSection>

            {/* Membership QR — all customers see the same */}
            {receiptSettings.showMembership && qrDataUrl && (
              <ReceiptQrSection>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0A2540', marginBottom: '6px' }}>{t('pos:billPrintPage.orderOnlineEarnPoints')}</div>
                <img src={qrDataUrl} alt="QR Code" style={{ width: '100px', height: '100px' }} />
              </ReceiptQrSection>
            )}

            <Footer>
              <div>{receiptSettings.footerMessage}</div>
            </Footer>

            <PrintButton onClick={handlePrint}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9V2H18V9M6 18H4C2.89543 18 2 17.1046 2 16V11C2 9.89543 2.89543 9 4 9H20C21.1046 9 22 9.89543 22 11V16C22 17.1046 21.1046 18 20 18H18M6 14H18V22H6V14Z" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Print Bill
            </PrintButton>
          </BillContainer>,
          document.body
        )}

        {!selectedOrder && searchTerm && (
          <EmptyState>
            <p>{t('pos:billPrintPage.noOrderFoundWithThatOrderNumberOrPhoneNumber')}</p>
          </EmptyState>
        )}
      </PageContainer>

      {/* Print-only styles */}
      <style>{`
        @media print {
          @page {
            size: 80mm auto;
            margin: 0mm;
          }

          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          .no-print {
            display: none !important;
          }

          [data-print-bill] {
            display: block !important;
            width: 80mm !important;
            max-width: 80mm !important;
            margin: 0 !important;
            padding: 5mm !important;
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          [data-print-bill] button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default BillPrintPage;