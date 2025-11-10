/**
 * Thermal Printer Utility for RawBT Integration
 * Handles direct printing to thermal printers via RawBT app
 */

interface OrderItem {
  menuItem: { name: string; price: number };
  quantity: number;
  options?: string[];
}

interface OrderData {
  orderNumber: string;
  pickupNumber?: string;
  date: Date;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  coupon: { code: string; discount: number } | null;
  tax: number;
  total: number;
  paymentMethod: string;
  amountReceived: number;
  change: number;
}

interface StoreInfo {
  name: string;
  address: string;
  phone: string;
  gstRegNo: string;
}

// ESC/POS Commands
const ESC = '\x1B';
const GS = '\x1D';

// Command helpers
const CMD = {
  // Initialize printer
  INIT: ESC + '@',
  // Text alignment
  ALIGN_LEFT: ESC + 'a' + '\x00',
  ALIGN_CENTER: ESC + 'a' + '\x01',
  ALIGN_RIGHT: ESC + 'a' + '\x02',
  // Text size
  TEXT_NORMAL: GS + '!' + '\x00',
  TEXT_DOUBLE_HEIGHT: GS + '!' + '\x01',
  TEXT_DOUBLE_WIDTH: GS + '!' + '\x10',
  TEXT_DOUBLE: GS + '!' + '\x11',
  TEXT_LARGE: GS + '!' + '\x22',
  // Text style
  BOLD_ON: ESC + 'E' + '\x01',
  BOLD_OFF: ESC + 'E' + '\x00',
  UNDERLINE_ON: ESC + '-' + '\x01',
  UNDERLINE_OFF: ESC + '-' + '\x00',
  // Line feed
  LINE_FEED: '\n',
  // Cut paper
  CUT_PAPER: GS + 'V' + '\x00',
  CUT_PARTIAL: GS + 'V' + '\x01',
  // Horizontal line
  HORIZONTAL_LINE: '--------------------------------',
  DASHED_LINE: '- - - - - - - - - - - - - - - -'
};

/**
 * Check if device is mobile or tablet
 */
export const isMobileOrTablet = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check screen size
  const isSmallScreen = window.innerWidth <= 1024;

  return isMobile || isTablet || (isTouchDevice && isSmallScreen);
};

/**
 * Check if RawBT is available
 */
export const isRawBTAvailable = (): boolean => {
  // RawBT typically listens on localhost:9100
  // We can't directly check, but we can assume it's available on mobile/tablet
  return isMobileOrTablet();
};

/**
 * Format text to fixed width (for thermal printer 32 chars width)
 */
const formatLine = (left: string, right: string, width: number = 32): string => {
  const spaces = width - left.length - right.length;
  if (spaces <= 0) return left + right;
  return left + ' '.repeat(spaces) + right;
};

/**
 * Format date/time
 */
const formatDateTime = (date: Date): string => {
  return date.toLocaleString('en-MY', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Generate ESC/POS receipt content
 */
export const generateReceiptContent = (orderData: OrderData, storeInfo: StoreInfo): string => {
  let content = '';

  // Initialize
  content += CMD.INIT;

  // Header - Store name (centered, large)
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  content += storeInfo.name + CMD.LINE_FEED;
  content += CMD.BOLD_OFF;
  content += CMD.TEXT_NORMAL;
  content += CMD.LINE_FEED;

  // Store info (centered, small)
  content += storeInfo.address + CMD.LINE_FEED;
  content += 'Tel: ' + storeInfo.phone + CMD.LINE_FEED;
  content += 'GST Reg No: ' + storeInfo.gstRegNo + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Separator
  content += CMD.ALIGN_LEFT;
  content += CMD.HORIZONTAL_LINE + CMD.LINE_FEED;

  // Order details
  content += formatLine('Order No:', orderData.orderNumber) + CMD.LINE_FEED;
  content += formatLine('Date:', formatDateTime(orderData.date)) + CMD.LINE_FEED;
  content += formatLine('Cashier:', 'POS Terminal') + CMD.LINE_FEED;

  // Pickup number (centered, large)
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_LARGE;
  content += CMD.BOLD_ON;
  content += 'PICKUP #' + (orderData.pickupNumber || orderData.orderNumber.split('-')[1] || '000') + CMD.LINE_FEED;
  content += CMD.BOLD_OFF;
  content += CMD.TEXT_NORMAL;
  content += CMD.LINE_FEED;

  // Items separator
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // Items header
  content += formatLine('Item', 'Qty Price  Total', 32) + CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // Items
  orderData.items.forEach(item => {
    // Item name
    content += item.menuItem.name + CMD.LINE_FEED;

    // Options (if any)
    if (item.options && item.options.length > 0) {
      content += '  + ' + item.options.join(', ') + CMD.LINE_FEED;
    }

    // Quantity, price, total
    const qty = item.quantity.toString();
    const price = item.menuItem.price.toFixed(2);
    const total = (item.quantity * item.menuItem.price).toFixed(2);
    const itemLine = formatLine('', `${qty}x  ${price}  ${total}`, 32);
    content += itemLine + CMD.LINE_FEED;
  });

  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // Totals
  content += formatLine('Subtotal:', 'RM ' + orderData.subtotal.toFixed(2)) + CMD.LINE_FEED;

  if (orderData.discount > 0) {
    content += formatLine('Discount:', '-RM ' + orderData.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  if (orderData.coupon) {
    content += formatLine('Coupon (' + orderData.coupon.code + '):', '-RM ' + orderData.coupon.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  content += formatLine('Tax (6%):', 'RM ' + orderData.tax.toFixed(2)) + CMD.LINE_FEED;

  // Total (bold, larger)
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += formatLine('TOTAL:', 'RM ' + orderData.total.toFixed(2)) + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;

  content += CMD.LINE_FEED;

  // Payment info
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Payment:', orderData.paymentMethod.toUpperCase()) + CMD.LINE_FEED;

  if (orderData.paymentMethod === 'cash') {
    content += formatLine('Received:', 'RM ' + orderData.amountReceived.toFixed(2)) + CMD.LINE_FEED;
    content += formatLine('Change:', 'RM ' + orderData.change.toFixed(2)) + CMD.LINE_FEED;
  }

  // Footer
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += '*** CUSTOMER COPY ***' + CMD.LINE_FEED;
  content += 'Thank you for your purchase!' + CMD.LINE_FEED;
  content += 'Please keep this receipt' + CMD.LINE_FEED;
  content += 'for your records' + CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Cut paper
  content += CMD.CUT_PARTIAL;

  return content;
};

/**
 * Send to RawBT printer
 */
export const printToRawBT = async (orderData: OrderData, storeInfo: StoreInfo): Promise<boolean> => {
  try {
    const content = generateReceiptContent(orderData, storeInfo);

    // Convert content to Base64 for RawBT
    // Use TextEncoder for proper encoding without deprecated unescape
    const encoder = new TextEncoder();
    const bytes = encoder.encode(content);
    const base64Content = btoa(String.fromCharCode(...Array.from(bytes)));

    // RawBT listens on localhost:19100 by default (standard RawBT port)
    // Try multiple endpoints in case user configured differently
    const endpoints = [
      'http://localhost:19100/print',
      'http://127.0.0.1:19100/print',
      'http://localhost:9100/print',
      'http://localhost:19100',
      'http://127.0.0.1:19100'
    ];

    console.log('📱 Attempting to connect to RawBT...');

    for (const endpoint of endpoints) {
      try {
        console.log(`🔄 Trying ${endpoint}...`);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: base64Content,
            type: 'base64'
          })
        });

        if (response.ok) {
          console.log(`✅ Print sent to RawBT successfully via ${endpoint}`);
          return true;
        } else {
          console.log(`⚠️ ${endpoint} responded with ${response.status}`);
        }
      } catch (err) {
        console.log(`⚠️ ${endpoint} not available:`, err instanceof Error ? err.message : 'Unknown error');
        continue;
      }
    }

    console.error('❌ All RawBT endpoints failed');
    return false;
  } catch (error) {
    console.error('❌ Error sending to RawBT:', error);
    return false;
  }
};

/**
 * Print bill - automatically detects device and uses appropriate method
 */
export const printBill = async (orderData: OrderData, storeInfo: StoreInfo): Promise<void> => {
  const isTabletOrMobile = isMobileOrTablet();

  if (isTabletOrMobile) {
    // Mobile/Tablet: Try RawBT first
    console.log('📱 Mobile/Tablet detected - attempting RawBT print');
    const success = await printToRawBT(orderData, storeInfo);

    if (!success) {
      // Fallback: Open browser print dialog which will open RawBT app
      console.log('⚠️ RawBT direct connection failed - opening browser print dialog for RawBT');
      window.print();
    }
  } else {
    // Desktop/PC: Use browser print dialog
    console.log('🖥️ Desktop detected - using browser print dialog');
    window.print();
  }
};

export default {
  isMobileOrTablet,
  isRawBTAvailable,
  generateReceiptContent,
  printToRawBT,
  printBill
};
