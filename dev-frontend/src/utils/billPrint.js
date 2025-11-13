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

  // Reverse mode (white text on black background)
  REVERSE_ON: GS + 'B' + '\x01',
  REVERSE_OFF: GS + 'B' + '\x00',

  // Line feed
  LINE_FEED: '\n',

  // Separators (80mm = 48 chars)
  DASHED_LINE: '------------------------------------------------',

  // Paper cut (partial)
  CUT_PARTIAL: GS + 'V' + '\x41' + '\x00'
};

// ============================================
// Helper Functions
// ============================================

/**
 * Pad text to fit 48 characters (80mm printer)
 * Left-aligned text with right-aligned value
 */
function formatLine(left, right, width = 48) {
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
 * @param {number} orderData.serviceCharge - Service charge amount
 * @param {number} orderData.serviceChargeRate - Service charge rate (%)
 * @param {number} orderData.tax - Tax amount
 * @param {number} orderData.taxRate - Tax rate (%)
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

  // === TAKEAWAY INDICATOR (if applicable) ===
  if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** TAKEAWAY **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;
    content += CMD.LINE_FEED;
    content += CMD.LINE_FEED;
  }

  // === HEADER ===
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  if (storeInfo.name) {
    content += storeInfo.name + CMD.LINE_FEED;
  }
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // Store info (only show if not empty)
  if (storeInfo.address) {
    content += storeInfo.address + CMD.LINE_FEED;
  }
  if (storeInfo.phone) {
    content += 'Tel: ' + storeInfo.phone + CMD.LINE_FEED;
  }
  if (storeInfo.gstRegNo) {
    content += 'Tax No: ' + storeInfo.gstRegNo + CMD.LINE_FEED;
  }
  content += CMD.LINE_FEED;

  // Order info
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.ALIGN_LEFT;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  if (orderData.pickupNumber) {
    content += formatLine('Pickup #:', orderData.pickupNumber) + CMD.LINE_FEED;
  }

  if (orderData.pagerNumber) {
    content += formatLine('Pager #:', orderData.pagerNumber) + CMD.LINE_FEED;
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

  if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
    content += formatLine('Takeaway Charge:', 'RM ' + orderData.takeawayCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  if (orderData.serviceCharge && orderData.serviceCharge > 0) {
    const scLabel = 'Service Charge (' + (orderData.serviceChargeRate || 10) + '%):';
    content += formatLine(scLabel, 'RM ' + orderData.serviceCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  if (orderData.tax && orderData.tax > 0) {
    const taxLabel = 'Tax (' + (orderData.taxRate || 6) + '%):';
    content += formatLine(taxLabel, 'RM ' + orderData.tax.toFixed(2)) + CMD.LINE_FEED;
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
    // Generate ESC/POS content
    const escposContent = generateBillContent(orderData, storeInfo);

    // Convert to Base64 using proper encoding
    // Use unescape + encodeURIComponent for Korean/special characters
    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    // Build Android Intent URL for RawBT
    const intentScheme = '#Intent;scheme=rawbt;';
    const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
    const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

    // Open RawBT app via Intent using hidden iframe
    // This prevents the page from navigating away
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);

    // Remove iframe after a short delay
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);

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
// Kitchen Order Ticket Generation
// ============================================

/**
 * Generate Kitchen Order Ticket (주방용 주문서)
 *
 * @param {Object} orderData - Order information
 * @param {Object} storeInfo - Store information
 * @returns {string} ESC/POS command string
 */
export function generateKitchenTicketContent(orderData, storeInfo) {
  let content = '';

  // Initialize printer
  content += CMD.INIT;

  // === HEADER - ORDER TYPE (ONLY TAKEAWAY/DELIVERY) ===
  if (orderData.orderType === 'takeaway' || orderData.takeawayCharge > 0) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** TAKEAWAY **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;
  } else if (orderData.orderType === 'delivery') {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** DELIVERY **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;
  }
  // DINE-IN: No header display

  // === PAGER NUMBER (if exists) OR PICKUP NUMBER ===
  if (orderData.pagerNumber) {
    // PAGER EXISTS - Show only PAGER on one line with large bold number
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PAGER  ' + orderData.pagerNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
    content += CMD.LINE_FEED;
    content += CMD.LINE_FEED;
  } else {
    // NO PAGER - Show PICKUP NUMBER
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PICKUP #' + CMD.LINE_FEED;

    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    content += pickupNum + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
    content += CMD.LINE_FEED;
  }

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Order Source (Mobile Order vs POS)
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  content += formatLine('Source:', orderSource) + CMD.LINE_FEED;

  // Table info
  if (orderData.tableNumber) {
    content += CMD.BOLD_ON;
    content += formatLine('TABLE:', orderData.tableNumber) + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
  }

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    content += formatLine('Customer:', orderData.customerName) + CMD.LINE_FEED;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // === ITEMS (MAIN FOCUS) ===
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += 'ORDER ITEMS:' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  orderData.items.forEach((item, index) => {
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    // Item: Quantity x Name (LARGE & BOLD)
    content += CMD.BOLD_ON;
    content += CMD.TEXT_DOUBLE;
    content += qty + ' x ' + itemName + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;

    // Options with marker
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        content += CMD.BOLD_ON;
        content += '  + ' + option + CMD.LINE_FEED;
        content += CMD.BOLD_OFF;
      });
    }

    // Set menu items (if applicable)
    if (item.menuItem?.is_set_menu && item.menuItem?.set_items) {
      content += '   [Set Items:]' + CMD.LINE_FEED;
      item.menuItem.set_items.forEach(setItem => {
        content += '   - ' + setItem.quantity + 'x ' + setItem.name + CMD.LINE_FEED;
      });
    }

    // Spacing between items
    if (index < orderData.items.length - 1) {
      content += CMD.LINE_FEED;
    }
  });

  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === SPECIAL NOTES ===
  if (orderData.notes && orderData.notes.trim()) {
    content += CMD.LINE_FEED;
    content += CMD.BOLD_ON;
    content += '** SPECIAL NOTES **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += orderData.notes + CMD.LINE_FEED;
    content += CMD.LINE_FEED;
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
  }

  // === FOOTER (NO KITCHEN COPY TEXT) ===
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

/**
 * Print Kitchen Order Ticket via RawBT
 *
 * @param {Object} orderData - Order data
 * @param {Object} storeInfo - Store info
 * @returns {Promise<boolean>} Success status
 */
export async function printKitchenTicketViaRawBT(orderData, storeInfo) {
  try {
    const escposContent = generateKitchenTicketContent(orderData, storeInfo);
    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    const intentScheme = '#Intent;scheme=rawbt;';
    const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
    const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = intentUrl;
    document.body.appendChild(iframe);

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);

    return true;

  } catch (error) {
    console.error('❌ Kitchen Ticket print error:', error);
    alert(
      'Failed to print kitchen order ticket.\n\n' +
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
// Preview Functions (No ESC/POS codes)
// ============================================

/**
 * Generate Kitchen Ticket Preview (for web display - no printer codes)
 *
 * @param {Object} orderData - Order information
 * @param {Object} storeInfo - Store information
 * @returns {string} Plain text preview content
 */
export function generateKitchenTicketPreview(orderData, storeInfo) {
  let lines = [];

  // === HEADER - ORDER TYPE (ONLY TAKEAWAY/DELIVERY) ===
  if (orderData.orderType === 'takeaway' || orderData.takeawayCharge > 0) {
    lines.push('           ** TAKEAWAY **');
  } else if (orderData.orderType === 'delivery') {
    lines.push('           ** DELIVERY **');
  }

  // === PAGER NUMBER (if exists) OR PICKUP NUMBER ===
  if (orderData.pagerNumber) {
    // PAGER EXISTS - Show title and number on one line (large)
    lines.push('');
    lines.push('                PAGER: ' + orderData.pagerNumber);
    lines.push('');
  } else {
    // NO PAGER - Show PICKUP NUMBER
    lines.push('');
    lines.push('                 PICKUP #');
    lines.push('');
    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    lines.push('                   ' + pickupNum);
    lines.push('');
  }

  // === ORDER INFO ===
  lines.push('------------------------------------------------');
  lines.push('Order:                          ' + orderData.orderNumber);

  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  lines.push('Time:                                ' + timeStr);

  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  lines.push('Source:                              ' + orderSource);

  if (orderData.tableNumber) {
    lines.push('TABLE:                               ' + orderData.tableNumber);
  }

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    lines.push('Customer:                       ' + orderData.customerName);
  }

  lines.push('------------------------------------------------');
  lines.push('');

  // === ITEMS (MAIN FOCUS) ===
  lines.push('ORDER ITEMS:');
  lines.push('');

  orderData.items.forEach((item, index) => {
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    lines.push(qty + ' x ' + itemName);

    // Options with STAR marker
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        lines.push('  ★ ' + option);
      });
    }

    // Set menu items
    if (item.menuItem?.is_set_menu && item.menuItem?.set_items) {
      lines.push('   [Set Items:]');
      item.menuItem.set_items.forEach(setItem => {
        lines.push('   - ' + setItem.quantity + 'x ' + setItem.name);
      });
    }

    if (index < orderData.items.length - 1) {
      lines.push('');
    }
  });

  lines.push('');
  lines.push('------------------------------------------------');

  // === SPECIAL NOTES ===
  if (orderData.notes && orderData.notes.trim()) {
    lines.push('');
    lines.push('** SPECIAL NOTES **');
    lines.push(orderData.notes);
    lines.push('');
    lines.push('------------------------------------------------');
  }

  return lines.join('\n');
}

// ============================================
// Exports
// ============================================

export default {
  generateBillContent,
  printBillViaRawBT,
  generateKitchenTicketContent,
  printKitchenTicketViaRawBT,
  generateKitchenTicketPreview
};
