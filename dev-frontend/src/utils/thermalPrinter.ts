/**
 * Thermal Printer Utility for RawBT Integration
 * Handles direct printing to thermal printers via RawBT app
 */

import { formatCurrency } from './currency';

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
  businessRegistration?: string;
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
export const generateReceiptContent = (orderData: OrderData, storeInfo: StoreInfo, currency: string = 'MYR'): string => {
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
  if (storeInfo.businessRegistration) {
    content += 'Reg No: ' + storeInfo.businessRegistration + CMD.LINE_FEED;
  }
  if (storeInfo.gstRegNo) {
    content += 'Tax No: ' + storeInfo.gstRegNo + CMD.LINE_FEED;
  }
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
  content += formatLine('Subtotal:', formatCurrency(orderData.subtotal, currency)) + CMD.LINE_FEED;

  if (orderData.discount > 0) {
    content += formatLine('Discount:', formatCurrency(-orderData.discount, currency)) + CMD.LINE_FEED;
  }

  if (orderData.coupon) {
    content += formatLine('Coupon (' + orderData.coupon.code + '):', formatCurrency(-orderData.coupon.discount, currency)) + CMD.LINE_FEED;
  }

  content += formatLine('Tax (6%):', formatCurrency(orderData.tax, currency)) + CMD.LINE_FEED;

  // Total (bold, larger)
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += formatLine('TOTAL:', formatCurrency(orderData.total, currency)) + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;

  content += CMD.LINE_FEED;

  // Payment info
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Payment:', orderData.paymentMethod.toUpperCase()) + CMD.LINE_FEED;

  if (orderData.paymentMethod === 'cash') {
    content += formatLine('Received:', formatCurrency(orderData.amountReceived, currency)) + CMD.LINE_FEED;
    content += formatLine('Change:', formatCurrency(orderData.change, currency)) + CMD.LINE_FEED;
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
export const printToRawBT = async (orderData: OrderData, storeInfo: StoreInfo, currency: string = 'MYR'): Promise<boolean> => {
  try {
    console.log('🔍 Starting RawBT print process...');
    console.log('📦 Order data:', {
      orderNumber: orderData.orderNumber,
      total: orderData.total,
      itemCount: orderData.items.length
    });

    const content = generateReceiptContent(orderData, storeInfo, currency);
    console.log('📄 Receipt content length:', content.length, 'characters');

    // Convert content to Base64 for RawBT
    // Use TextEncoder for proper encoding without deprecated unescape
    const encoder = new TextEncoder();
    const bytes = encoder.encode(content);
    const base64Content = btoa(String.fromCharCode(...Array.from(bytes)));
    console.log('🔐 Base64 content length:', base64Content.length, 'characters');

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
    console.log('🔌 Will try these endpoints:', endpoints);

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

        console.log(`📡 ${endpoint} response status:`, response.status);

        if (response.ok) {
          const responseText = await response.text();
          console.log(`✅ Print sent to RawBT successfully via ${endpoint}`);
          console.log('📨 Response:', responseText);
          return true;
        } else {
          const errorText = await response.text();
          console.log(`⚠️ ${endpoint} responded with ${response.status}:`, errorText);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        console.log(`⚠️ ${endpoint} not available:`, errorMsg);
        console.log('🔍 Error details:', err);
        continue;
      }
    }

    console.error('❌ All RawBT endpoints failed');
    console.log('💡 Make sure RawBT app is running and check notification bar');
    return false;
  } catch (error) {
    console.error('❌ Error sending to RawBT:', error);
    console.log('🔍 Full error:', error);
    return false;
  }
};

/**
 * Print bill - automatically detects device and uses appropriate method
 * Returns true if print was successful, false otherwise
 */
export const printBill = async (orderData: OrderData, storeInfo: StoreInfo, currency: string = 'MYR'): Promise<boolean> => {
  const isTabletOrMobile = isMobileOrTablet();

  if (isTabletOrMobile) {
    // Mobile/Tablet: Use RawBT for thermal printer
    console.log('📱 Mobile/Tablet detected - using RawBT thermal printer');
    const success = await printToRawBT(orderData, storeInfo, currency);

    if (success) {
      console.log('✅ Bill printed successfully via RawBT');
      return true;
    } else {
      console.error('❌ RawBT print failed');
      // Show user-friendly error
      alert(
        'Unable to connect to RawBT printer.\n\n' +
        'Please ensure:\n' +
        '1. RawBT app is installed and running\n' +
        '2. Bluetooth printer is connected in RawBT\n' +
        '3. RawBT service is started (check notification bar)\n\n' +
        'Then try printing again.'
      );
      return false;
    }
  } else {
    // Desktop/PC: Use browser print dialog
    console.log('🖥️ Desktop detected - using browser print dialog');
    window.print();
    return true;
  }
};

export default {
  isMobileOrTablet,
  isRawBTAvailable,
  generateReceiptContent,
  printToRawBT,
  printBill
};
