/**
 * Bill Print Utility for RawBT Integration
 *
 * Uses RawBT Schema: rawbt:base64,<ESC/POS_BASE64>
 * NO window.print() or browser print dialog
 * Direct WiFi printer communication via RawBT app
 */

// ============================================
// ESC/POS Command Definitions
// ============================================

const ESC = '\x1B';
const GS = '\x1D';

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

  // Text style
  BOLD_ON: ESC + 'E' + '\x01',
  BOLD_OFF: ESC + 'E' + '\x00',

  // Line feed
  LINE_FEED: '\n',

  // Separators
  DASHED_LINE: '--------------------------------',

  // Paper cut (partial)
  CUT_PARTIAL: GS + 'V' + '\x41' + '\x00'
};

// ============================================
// Helper Functions
// ============================================

/**
 * Pad text to fit 32 characters (58mm printer)
 * Left-aligned text with right-aligned value
 */
function formatLine(left, right, width = 32) {
  const spaces = width - left.length - right.length;
  return left + ' '.repeat(Math.max(spaces, 1)) + right;
}

// centerText function removed - not used in current implementation

// ============================================
// ESC/POS Receipt Content Generation
// ============================================

/**
 * Generate ESC/POS receipt content
 *
 * @param {Object} orderData - Order information
 * @param {string} orderData.orderNumber - Order number
 * @param {string} orderData.pickupNumber - Pickup number
 * @param {Date} orderData.date - Order date
 * @param {Array} orderData.items - Order items
 * @param {number} orderData.subtotal - Subtotal
 * @param {number} orderData.discount - Discount amount
 * @param {Object} orderData.coupon - Coupon info (code, discount)
 * @param {number} orderData.tax - Tax amount
 * @param {number} orderData.total - Total amount
 * @param {string} orderData.paymentMethod - Payment method
 * @param {number} orderData.amountReceived - Amount received (cash)
 * @param {number} orderData.change - Change given
 *
 * @param {Object} storeInfo - Store information
 * @param {string} storeInfo.name - Store name
 * @param {string} storeInfo.address - Store address
 * @param {string} storeInfo.phone - Store phone
 * @param {string} storeInfo.gstRegNo - GST registration number
 *
 * @returns {string} ESC/POS command string
 */
export function generateBillContent(orderData, storeInfo) {
  let content = '';

  // Initialize printer
  content += CMD.INIT;

  // === HEADER ===
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  content += storeInfo.name + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // Store info
  content += storeInfo.address + CMD.LINE_FEED;
  content += 'Tel: ' + storeInfo.phone + CMD.LINE_FEED;
  if (storeInfo.gstRegNo) {
    content += 'GST Reg: ' + storeInfo.gstRegNo + CMD.LINE_FEED;
  }
  content += CMD.LINE_FEED;

  // Order info
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.ALIGN_LEFT;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  if (orderData.pickupNumber) {
    content += formatLine('Pickup #:', orderData.pickupNumber) + CMD.LINE_FEED;
  }

  const dateStr = orderData.date.toLocaleDateString('en-MY');
  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Date:', dateStr) + CMD.LINE_FEED;
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === ITEMS ===
  content += CMD.LINE_FEED;

  orderData.items.forEach(item => {
    const itemName = item.menuItem.name;
    const qty = item.quantity;
    const price = item.menuItem.price;
    const total = qty * price;

    // Item name and total
    content += formatLine(
      itemName,
      'RM ' + total.toFixed(2)
    ) + CMD.LINE_FEED;

    // Quantity and unit price
    content += formatLine(
      '  ' + qty + ' x RM ' + price.toFixed(2),
      ''
    ) + CMD.LINE_FEED;

    // Options
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        content += '  + ' + option + CMD.LINE_FEED;
      });
    }
  });

  // === TOTALS ===
  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Subtotal:', 'RM ' + orderData.subtotal.toFixed(2)) + CMD.LINE_FEED;

  if (orderData.discount > 0) {
    content += formatLine('Discount:', '- RM ' + orderData.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  if (orderData.coupon && orderData.coupon.discount > 0) {
    content += formatLine('Coupon (' + orderData.coupon.code + '):', '- RM ' + orderData.coupon.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  if (orderData.tax > 0) {
    content += formatLine('Tax:', 'RM ' + orderData.tax.toFixed(2)) + CMD.LINE_FEED;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += formatLine('TOTAL:', 'RM ' + orderData.total.toFixed(2)) + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === PAYMENT INFO ===
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  const paymentMethodDisplay = orderData.paymentMethod ? orderData.paymentMethod.toUpperCase() : 'CASH';
  content += formatLine('Payment:', paymentMethodDisplay) + CMD.LINE_FEED;

  if (orderData.paymentMethod === 'cash' && orderData.amountReceived > 0) {
    content += formatLine('Received:', 'RM ' + orderData.amountReceived.toFixed(2)) + CMD.LINE_FEED;
    content += formatLine('Change:', 'RM ' + orderData.change.toFixed(2)) + CMD.LINE_FEED;
  }

  // === FOOTER ===
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += '*** CUSTOMER COPY ***' + CMD.LINE_FEED;
  content += 'Thank you for your purchase!' + CMD.LINE_FEED;
  content += 'Please keep this receipt' + CMD.LINE_FEED;
  content += 'for your records' + CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

// ============================================
// RawBT Integration
// ============================================

/**
 * Print bill via RawBT app using Android Intent
 *
 * @param {Object} orderData - Order data
 * @param {Object} storeInfo - Store info
 * @returns {Promise<boolean>} Success status
 */
export async function printBillViaRawBT(orderData, storeInfo) {
  try {
    console.log('🖨️ Starting RawBT bill print (Intent method)...');
    console.log('📦 Order:', orderData.orderNumber, '| Total: RM', orderData.total);

    // Generate ESC/POS content
    const escposContent = generateBillContent(orderData, storeInfo);
    console.log('📄 ESC/POS content generated:', escposContent.length, 'chars');

    // Convert to Base64 using proper encoding
    // Use unescape + encodeURIComponent for Korean/special characters
    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));
    console.log('🔐 Base64 encoded:', base64Content.length, 'chars');

    // Build Android Intent URL for RawBT
    const intentScheme = '#Intent;scheme=rawbt;';
    const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
    const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

    console.log('🔗 RawBT Intent URL created');

    // Open RawBT app via Intent
    window.location.href = intentUrl;
    console.log('✅ RawBT app opened successfully via Intent');

    return true;

  } catch (error) {
    console.error('❌ RawBT print error:', error);
    alert(
      'Failed to print bill.\n\n' +
      'Please ensure:\n' +
      '1. RawBT app is installed\n' +
      '2. WiFi printer is configured in RawBT\n' +
      '3. Printer is connected and ready\n\n' +
      'Error: ' + error.message
    );
    return false;
  }
}

// ============================================
// Exports
// ============================================

export default {
  generateBillContent,
  printBillViaRawBT
};
