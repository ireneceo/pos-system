import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import { formatCurrency } from '../../../utils/currency';
import { formatDateTime as formatDateTimeTz } from '../../../utils/timezone';

interface OrderItem {
  name?: string;
  menuItem?: { name?: string; price?: number };
  quantity?: number;
  item_price?: number;
  price?: number;
  options?: string[];
  selectedOptions?: string[];
  special_instructions?: string;
  specialInstructions?: string;
}

interface RestaurantInfo {
  name?: string;
  branchName?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  phone?: string | null;
  businessRegistration?: string | null;
  taxId?: string | null;
  logoUrl?: string | null;
  receiptLogo?: string | null;
  footerMessage?: string | null;
}

interface OrderData {
  order_number?: string;
  orderNumber?: string;
  id?: string | number;
  order_date?: string;
  createdAt?: string;
  created_at?: string;
  order_items?: OrderItem[];
  items?: OrderItem[];
  total_amount?: number;
  total?: number;
  subtotal?: number;
  tax?: number;
  taxRate?: number;
  discount?: number;
  couponCode?: string | null;
  couponDiscount?: number;
  serviceCharge?: number;
  serviceChargeRate?: number;
  takeawayCharge?: number;
  roundingAdjustment?: number;
  payment_status?: string;
  paymentStatus?: string;
  payment_method?: string;
  paymentMethod?: string;
  order_type?: string;
  orderType?: string;
  point_discount?: number;
  pointDiscount?: number;
  points_used?: number;
  pointsUsed?: number;
  table_number?: string | number | null;
  tableNumber?: string | number | null;
  pickupNumber?: string;
  restaurant?: RestaurantInfo | null;
}

interface ReceiptShareProps {
  order: OrderData;
  storeName: string;
  branchName?: string | null;
  currency: string;
}

// --- Styled Components ---

const ShareContainer = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #E5E7EB;
`;

const ShareLabel = styled.div`
  font-size: 12px;
  color: #9CA3AF;
  margin-bottom: 10px;
  text-align: center;
`;

const ButtonRows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #E5E7EB;
  background: white;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.96);
    background: #F9FAFB;
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

const DownloadButton = styled(ShareButton)`
  flex: 1;
  max-width: 280px;
  border-color: #635BFF;
  color: #635BFF;
  font-weight: 600;
`;

const CopiedToast = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #1F2937;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  opacity: ${props => props.visible ? 1 : 0};
  transition: opacity 0.3s;
  pointer-events: none;
  z-index: 1000;
`;

// Hidden receipt for html2canvas capture
const HiddenReceipt = styled.div`
  position: fixed;
  left: -9999px;
  top: 0;
  width: 320px;
  background: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  color: #000;
  padding: 20px;
  line-height: 1.5;
`;

const ReceiptHeader = styled.div`
  text-align: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px dashed #999;
`;

const ReceiptStoreName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ReceiptStoreInfo = styled.div`
  font-size: 11px;
  color: #444;
  line-height: 1.4;
`;

const ReceiptSection = styled.div`
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #ccc;
`;

const ReceiptRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const ReceiptTotalRow = styled(ReceiptRow)`
  font-weight: 700;
  font-size: 14px;
  margin-top: 4px;
  padding-top: 4px;
  border-top: 1px solid #000;
`;

const ReceiptItemRow = styled.div`
  margin-bottom: 4px;
`;

const ReceiptFooter = styled.div`
  text-align: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed #999;
  font-size: 11px;
  color: #666;
`;

// --- Icons ---

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" fill="#0088cc">
    <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#635BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// --- Helpers ---

const getOrderTypeLabel = (type: string) => {
  switch (type) {
    case 'dine-in': case 'dine_in': return 'Dine In';
    case 'takeaway': return 'Takeaway';
    case 'pickup': return 'Pre-order Pickup';
    case 'delivery': return 'Delivery';
    default: return type;
  }
};

const getPaymentMethodLabel = (method: string) => {
  switch (method) {
    case 'cash': return 'CASH';
    case 'card': return 'CARD';
    case 'e_wallet': return 'E-WALLET';
    case 'bank_transfer': return 'BANK TRANSFER';
    case 'counter': return 'PAY AT COUNTER';
    default: return (method || '').toUpperCase();
  }
};

const getPaymentStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': case 'paid': return 'Paid';
    case 'payment_verification_pending': return 'Verifying';
    case 'rejected': return 'Rejected';
    default: return 'Pending';
  }
};

// --- Component ---

const ReceiptShare: React.FC<ReceiptShareProps> = ({ order, storeName, branchName, currency }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const supportsShare = typeof navigator !== 'undefined' && !!navigator.share;

  const items = order.order_items || order.items || [];
  const orderNumber = order.order_number || order.orderNumber || order.id || 'N/A';
  const dateStr = order.createdAt || order.order_date || order.created_at;
  const date = dateStr ? new Date(dateStr) : new Date();
  const formattedDate = formatDateTimeTz(date, null);
  const orderType = order.order_type || order.orderType || '';
  const paymentStatus = order.payment_status || order.paymentStatus || 'pending';
  const paymentMethod = order.payment_method || order.paymentMethod || '';
  const isPaid = paymentStatus === 'completed' || paymentStatus === 'paid';
  const rest = order.restaurant;
  const locationName = (rest?.branchName || branchName)
    ? `${rest?.name || storeName} - ${rest?.branchName || branchName}`
    : (rest?.name || storeName);

  // Financial data
  const subtotal = Number(order.subtotal || 0);
  const tax = Number(order.tax || 0);
  const taxRate = Number(order.taxRate || 0);
  const discount = Number(order.discount || 0);
  const couponDiscount = Number(order.couponDiscount || 0);
  const serviceCharge = Number(order.serviceCharge || 0);
  const serviceChargeRate = Number(order.serviceChargeRate || 0);
  const takeawayCharge = Number(order.takeawayCharge || 0);
  const roundingAdjustment = Number(order.roundingAdjustment || 0);
  const pointDiscount = Number(order.pointDiscount || order.point_discount || 0);
  const totalAmount = Number(order.total_amount || order.total || 0);

  // --- Text share (order summary) ---
  const buildOrderText = (): string => {
    let text = `Order Summary\n${locationName}\nOrder #${orderNumber}\n${formattedDate}\n\n`;

    items.forEach((item: OrderItem) => {
      const name = item.name || item.menuItem?.name || 'Item';
      const qty = item.quantity || 1;
      const price = Number(item.item_price || item.price || item.menuItem?.price || 0);
      text += `${qty}x ${name} - ${formatCurrency(price * qty, currency)}\n`;
    });

    text += `──────────\n`;
    if (subtotal > 0) text += `Subtotal: ${formatCurrency(subtotal, currency)}\n`;
    if (serviceCharge > 0) text += `Service Charge (${serviceChargeRate}%): ${formatCurrency(serviceCharge, currency)}\n`;
    if (tax > 0) text += `Tax (${taxRate}%): ${formatCurrency(tax, currency)}\n`;
    if (discount > 0) text += `Discount: -${formatCurrency(discount, currency)}\n`;
    if (couponDiscount > 0) text += `Coupon (${order.couponCode}): -${formatCurrency(couponDiscount, currency)}\n`;
    if (pointDiscount > 0) text += `Points Discount: -${formatCurrency(pointDiscount, currency)}\n`;
    if (takeawayCharge > 0) text += `Takeaway Charge: ${formatCurrency(takeawayCharge, currency)}\n`;
    text += `Total: ${formatCurrency(totalAmount, currency)}\n`;
    text += `Payment: ${getPaymentMethodLabel(paymentMethod)} (${getPaymentStatusLabel(paymentStatus)})\n`;
    if (orderType) text += `Order Type: ${getOrderTypeLabel(orderType)}\n`;

    return text;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(buildOrderText())}`, '_blank');
  };

  const handleTelegram = () => {
    window.open(`https://t.me/share/url?text=${encodeURIComponent(buildOrderText())}`, '_blank');
  };

  const handleShare = async () => {
    const text = buildOrderText();
    if (supportsShare) {
      try { await navigator.share({ text }); } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  // --- Receipt image download ---
  const handleDownloadReceipt = useCallback(async () => {
    if (!receiptRef.current || downloading) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `receipt-${orderNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Receipt download error:', err);
    } finally {
      setDownloading(false);
    }
  }, [downloading, orderNumber]);

  // Build address line
  const addressParts = [rest?.address, rest?.city, rest?.state, rest?.postalCode].filter(Boolean);
  const addressLine = addressParts.join(', ');

  return (
    <>
      {/* Hidden receipt for capture — only rendered when paid */}
      {isPaid && <HiddenReceipt ref={receiptRef}>
        <ReceiptHeader>
          {rest?.receiptLogo && (
            <img
              src={rest.receiptLogo}
              alt=""
              style={{ maxWidth: '140px', maxHeight: '40px', marginBottom: '6px', display: 'block', margin: '0 auto 6px' }}
              crossOrigin="anonymous"
            />
          )}
          <ReceiptStoreName>{rest?.name || storeName}</ReceiptStoreName>
          {rest?.branchName && <div style={{ fontSize: '12px', marginBottom: '2px' }}>{rest.branchName}</div>}
          <ReceiptStoreInfo>
            {addressLine && <div>{addressLine}</div>}
            {rest?.phone && <div>Tel: {rest.phone}</div>}
            {(rest?.businessRegistration || rest?.taxId) && (
              <div>
                {rest.businessRegistration && <>Reg No: {rest.businessRegistration}</>}
                {rest.businessRegistration && rest.taxId && ' | '}
                {rest.taxId && <>Tax No: {rest.taxId}</>}
              </div>
            )}
          </ReceiptStoreInfo>
        </ReceiptHeader>

        <ReceiptSection>
          <ReceiptRow><span>Order No:</span><span style={{ fontWeight: 700 }}>#{orderNumber}</span></ReceiptRow>
          <ReceiptRow><span>Date:</span><span>{formattedDate}</span></ReceiptRow>
          <ReceiptRow><span>Order Type:</span><span>{getOrderTypeLabel(orderType)}</span></ReceiptRow>
          {(order.table_number || order.tableNumber) && (
            <ReceiptRow><span>Table:</span><span>{order.table_number || order.tableNumber}</span></ReceiptRow>
          )}
          <ReceiptRow><span>Payment:</span><span>{getPaymentMethodLabel(paymentMethod)}</span></ReceiptRow>
        </ReceiptSection>

        <ReceiptSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontWeight: 700 }}>
            <span style={{ flex: 1 }}>Item</span>
            <span style={{ width: '30px', textAlign: 'center' }}>Qty</span>
            <span style={{ width: '70px', textAlign: 'right' }}>Amount</span>
          </div>
          {items.map((item: OrderItem, idx: number) => {
            const name = item.name || item.menuItem?.name || 'Item';
            const qty = item.quantity || 1;
            const price = Number(item.item_price || item.price || item.menuItem?.price || 0);
            const opts = item.options || item.selectedOptions || [];
            const note = item.special_instructions || item.specialInstructions;
            return (
              <ReceiptItemRow key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ flex: 1 }}>{name}</span>
                  <span style={{ width: '30px', textAlign: 'center' }}>{qty}</span>
                  <span style={{ width: '70px', textAlign: 'right' }}>{formatCurrency(price * qty, currency)}</span>
                </div>
                {opts.length > 0 && <div style={{ fontSize: '10px', color: '#666', paddingLeft: '8px' }}>{opts.join(', ')}</div>}
                {note && <div style={{ fontSize: '10px', color: '#888', paddingLeft: '8px', fontStyle: 'italic' }}>Note: {note}</div>}
              </ReceiptItemRow>
            );
          })}
        </ReceiptSection>

        <div style={{ marginBottom: '8px' }}>
          <ReceiptRow><span>Subtotal</span><span>{formatCurrency(subtotal, currency)}</span></ReceiptRow>
          {serviceCharge > 0 && (
            <ReceiptRow><span>Service Charge ({serviceChargeRate}%)</span><span>{formatCurrency(serviceCharge, currency)}</span></ReceiptRow>
          )}
          {tax > 0 && (
            <ReceiptRow><span>Tax ({taxRate}%)</span><span>{formatCurrency(tax, currency)}</span></ReceiptRow>
          )}
          {discount > 0 && (
            <ReceiptRow><span>Discount</span><span>-{formatCurrency(discount, currency)}</span></ReceiptRow>
          )}
          {couponDiscount > 0 && (
            <ReceiptRow><span>Coupon ({order.couponCode})</span><span>-{formatCurrency(couponDiscount, currency)}</span></ReceiptRow>
          )}
          {pointDiscount > 0 && (
            <ReceiptRow><span>Points Discount</span><span>-{formatCurrency(pointDiscount, currency)}</span></ReceiptRow>
          )}
          {takeawayCharge > 0 && (
            <ReceiptRow><span>Takeaway Charge</span><span>{formatCurrency(takeawayCharge, currency)}</span></ReceiptRow>
          )}
          {roundingAdjustment !== 0 && (
            <ReceiptRow><span>Rounding</span><span>{formatCurrency(roundingAdjustment, currency)}</span></ReceiptRow>
          )}
          <ReceiptTotalRow><span>TOTAL</span><span>{formatCurrency(totalAmount, currency)}</span></ReceiptTotalRow>
        </div>

        <ReceiptFooter>
          {rest?.footerMessage || 'Thank you for your order!'}
        </ReceiptFooter>
      </HiddenReceipt>}

      {/* Visible buttons */}
      <ShareContainer>
        <ButtonRows>
          {isPaid && (
            <ButtonRow>
              <DownloadButton onClick={handleDownloadReceipt} disabled={downloading}>
                <DownloadIcon />
                {downloading ? 'Saving...' : 'Download Receipt'}
              </DownloadButton>
            </ButtonRow>
          )}
          <ShareLabel>Share Order</ShareLabel>
          <ButtonRow>
            <ShareButton onClick={handleWhatsApp}>
              <WhatsAppIcon />
              WhatsApp
            </ShareButton>
            <ShareButton onClick={handleTelegram}>
              <TelegramIcon />
              Telegram
            </ShareButton>
            <ShareButton onClick={handleShare}>
              {supportsShare ? <ShareIcon /> : <CopyIcon />}
              {supportsShare ? 'Share' : 'Copy'}
            </ShareButton>
          </ButtonRow>
        </ButtonRows>
      </ShareContainer>
      <CopiedToast visible={showCopied}>Copied to clipboard</CopiedToast>
    </>
  );
};

export default ReceiptShare;
