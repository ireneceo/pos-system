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
  ALIGN_LEFT: ESC + 'a\x00',
  ALIGN_CENTER: ESC + 'a\x01',
  ALIGN_RIGHT: ESC + 'a\x02',

  // Text size
  TEXT_NORMAL: GS + '!\x00',
  TEXT_DOUBLE_HEIGHT: GS + '!\x01',
  TEXT_DOUBLE_WIDTH: GS + '!\x10',
  TEXT_DOUBLE: GS + '!\x11',

  // Text style
  BOLD_ON: ESC + 'E\x01',
  BOLD_OFF: ESC + 'E\x00',

  // Reverse mode (white text on black background)
  REVERSE_ON: GS + 'B\x01',
  REVERSE_OFF: GS + 'B\x00',

  // Line feed
  LINE_FEED: '\n',

  // Separators (80mm = 48 chars)
  DASHED_LINE: '------------------------------------------------',

  // Paper cut (partial)
  CUT_PARTIAL: GS + 'V\x41\x00'
};

// ============================================
// Helper Functions
// ============================================

/**
 * Format pickup time as range (e.g., "9:00 - 9:30 AM")
 */
function formatPickupTimeRange(dateString) {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000); // Add 30 minutes

  const formatTimeSlot = (d) => {
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
}

/**
 * Pad text to fit 48 characters (80mm printer)
 * Left-aligned text with right-aligned value
 */
function formatLine(left, right, width = 48) {
  const spaces = width - left.length - right.length;
  return left + ' '.repeat(Math.max(spaces, 1)) + right;
}

// ============================================
// Device Detection
// ============================================

/**
 * Check if browser print mode is selected
 */
function shouldUseBrowserPrint() {
  return localStorage.getItem('printerMode') === 'browser';
}

/**
 * Set printer mode
 * @param {'rawbt' | 'browser'} mode
 */
export function setPrinterMode(mode) {
  localStorage.setItem('printerMode', mode);
}

/**
 * Get current printer mode
 * @returns {'rawbt' | 'browser'}
 */
export function getPrinterMode() {
  const mode = localStorage.getItem('printerMode');
  return mode === 'browser' ? 'browser' : 'rawbt';
}

// Currency symbol mapping
const CURRENCY_SYMBOLS = {
  MYR: 'RM',
  USD: '$',
  SGD: 'S$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  KRW: '₩',
  THB: '฿',
  VND: '₫',
  IDR: 'Rp',
  PHP: '₱',
  INR: '₹',
  CNY: '¥',
  AUD: 'A$',
  NZD: 'NZ$',
  HKD: 'HK$',
  TWD: 'NT$'
};

function getCurrencySymbol(currency) {
  return CURRENCY_SYMBOLS[currency] || currency || 'RM';
}

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
 * @param {string} orderData.currency - Currency code (e.g., 'MYR', 'USD')
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
  const currencySymbol = getCurrencySymbol(orderData.currency);
  let content = '';

  // Initialize printer
  content += CMD.INIT;

  // === TAKEAWAY/PICKUP INDICATOR (if applicable) ===
  if (orderData.orderType === 'pickup') {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** PRE-ORDER PICKUP **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_ON;
    content += 'Pickup: ' + (orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP') + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.LINE_FEED;
    content += CMD.LINE_FEED;
  } else if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
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

  // Show Table if exists, otherwise show Pager, otherwise show Pickup
  if (orderData.tableNumber) {
    content += formatLine('Table:', orderData.tableNumber) + CMD.LINE_FEED;
  } else if (orderData.pagerNumber) {
    content += formatLine('Pager #:', orderData.pagerNumber) + CMD.LINE_FEED;
  } else if (orderData.pickupNumber) {
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
      currencySymbol + ' ' + total.toFixed(2)
    ) + CMD.LINE_FEED;

    // Quantity and unit price
    content += formatLine(
      '  ' + qty + ' x ' + currencySymbol + ' ' + price.toFixed(2),
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
  content += formatLine('Subtotal:', currencySymbol + ' ' + orderData.subtotal.toFixed(2)) + CMD.LINE_FEED;

  // Takeaway Charge (before discounts)
  if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
    content += formatLine('Takeaway Charge:', currencySymbol + ' ' + orderData.takeawayCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  // Fixed Amount Discount
  if (orderData.discount && orderData.discount > 0) {
    content += formatLine('Discount:', '- ' + currencySymbol + ' ' + orderData.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Percentage Discount Policy
  if (orderData.discountPolicy && orderData.discountPolicy.amount > 0) {
    const policyLabel = 'Discount (' + orderData.discountPolicy.name + '):';
    content += formatLine(policyLabel, '- ' + currencySymbol + ' ' + orderData.discountPolicy.amount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Coupon Discount
  if (orderData.coupon && orderData.coupon.discount > 0) {
    const couponLabel = 'Coupon (' + orderData.coupon.code + '):';
    content += formatLine(couponLabel, '- ' + currencySymbol + ' ' + orderData.coupon.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Points Discount
  if (orderData.pointDiscount && Number(orderData.pointDiscount) > 0) {
    const pointsLabel = 'Points (' + (orderData.pointsUsed || 0).toLocaleString() + ' pts):';
    content += formatLine(pointsLabel, '- ' + currencySymbol + ' ' + Number(orderData.pointDiscount).toFixed(2)) + CMD.LINE_FEED;
  }

  // Service Charge (after discounts)
  if (orderData.serviceCharge && orderData.serviceCharge > 0) {
    const scLabel = 'Service Charge (' + (orderData.serviceChargeRate || 10) + '%):';
    content += formatLine(scLabel, currencySymbol + ' ' + orderData.serviceCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  // Tax (after discounts)
  if (orderData.tax && orderData.tax > 0) {
    const taxLabel = 'Tax (' + (orderData.taxRate || 6) + '%):';
    content += formatLine(taxLabel, currencySymbol + ' ' + orderData.tax.toFixed(2)) + CMD.LINE_FEED;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += formatLine('TOTAL:', currencySymbol + ' ' + orderData.total.toFixed(2)) + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === FOOTER ===
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += 'Thank you for your purchase!' + CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

// ============================================
// HTML Generation for PC Print
// ============================================

/**
 * Generate HTML Bill for PC browser print
 */
function generateHTMLBill(orderData, storeInfo) {
  const currencySymbol = getCurrencySymbol(orderData.currency);
  const dateStr = orderData.date.toLocaleDateString('en-MY');
  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  let itemsHTML = '';
  orderData.items.forEach(item => {
    const itemName = item.menuItem.name;
    const qty = item.quantity;
    const price = item.menuItem.price;
    const total = qty * price;

    itemsHTML += `
      <tr>
        <td style="text-align: left;">${itemName}</td>
        <td style="text-align: right;">${currencySymbol} ${total.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="text-align: left; color: #000; font-size: 12px; font-weight: 600;">&nbsp;&nbsp;${qty} x ${currencySymbol} ${price.toFixed(2)}</td>
        <td></td>
      </tr>
    `;

    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        itemsHTML += `<tr><td style="text-align: left; color: #000; font-size: 12px; font-weight: 600;">&nbsp;&nbsp;+ ${option}</td><td></td></tr>`;
      });
    }
  });

  // Build totals section
  let totalsHTML = `<tr><td>Subtotal:</td><td style="text-align: right;">${currencySymbol} ${orderData.subtotal.toFixed(2)}</td></tr>`;

  if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
    totalsHTML += `<tr><td>Takeaway Charge:</td><td style="text-align: right;">${currencySymbol} ${orderData.takeawayCharge.toFixed(2)}</td></tr>`;
  }
  if (orderData.discount && orderData.discount > 0) {
    totalsHTML += `<tr><td>Discount:</td><td style="text-align: right;">- ${currencySymbol} ${orderData.discount.toFixed(2)}</td></tr>`;
  }
  if (orderData.discountPolicy && orderData.discountPolicy.amount > 0) {
    totalsHTML += `<tr><td>Discount (${orderData.discountPolicy.name}):</td><td style="text-align: right;">- ${currencySymbol} ${orderData.discountPolicy.amount.toFixed(2)}</td></tr>`;
  }
  if (orderData.coupon && orderData.coupon.discount > 0) {
    totalsHTML += `<tr><td>Coupon (${orderData.coupon.code}):</td><td style="text-align: right;">- ${currencySymbol} ${orderData.coupon.discount.toFixed(2)}</td></tr>`;
  }
  if (orderData.pointDiscount && Number(orderData.pointDiscount) > 0) {
    totalsHTML += `<tr><td>Points (${(orderData.pointsUsed || 0).toLocaleString()} pts):</td><td style="text-align: right;">- ${currencySymbol} ${Number(orderData.pointDiscount).toFixed(2)}</td></tr>`;
  }
  if (orderData.serviceCharge && orderData.serviceCharge > 0) {
    totalsHTML += `<tr><td>Service Charge (${orderData.serviceChargeRate || 10}%):</td><td style="text-align: right;">${currencySymbol} ${orderData.serviceCharge.toFixed(2)}</td></tr>`;
  }
  if (orderData.tax && orderData.tax > 0) {
    totalsHTML += `<tr><td>Tax (${orderData.taxRate || 6}%):</td><td style="text-align: right;">${currencySymbol} ${orderData.tax.toFixed(2)}</td></tr>`;
  }

  // Order type indicator
  let orderTypeHTML = '';
  if (orderData.orderType === 'pickup') {
    orderTypeHTML = `<div style="font-size: 16px; font-weight: bold; text-align: center; margin: 10px 0;">** PRE-ORDER PICKUP **</div>
      <div style="text-align: center; font-weight: bold;">Pickup: ${orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP'}</div>`;
  } else if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
    orderTypeHTML = `<div style="font-size: 16px; font-weight: bold; text-align: center; margin: 10px 0;">** TAKEAWAY **</div>`;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Bill - ${orderData.orderNumber}</title>
      <style>
        @page { size: 80mm auto; margin: 0; }
        @media print {
          body { margin: 0; padding: 0; }
          .no-print { display: none; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        body {
          font-family: 'Lucida Console', 'Courier New', monospace;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          box-sizing: border-box;
          -webkit-font-smoothing: none;
          letter-spacing: 0.5px;
        }
        .header { text-align: center; margin-bottom: 10px; }
        .store-name { font-size: 20px; font-weight: 900; }
        .divider { border-top: 2px dashed #000; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 3px 0; font-weight: 600; }
        .total-row { font-size: 18px; font-weight: 900; }
        .footer { text-align: center; margin-top: 15px; font-size: 12px; font-weight: 600; }
      </style>
    </head>
    <body>
      ${orderTypeHTML}
      <div class="header">
        <div class="store-name">${storeInfo.name || ''}</div>
        ${storeInfo.address ? `<div style="font-weight: 600;">${storeInfo.address}</div>` : ''}
        ${storeInfo.phone ? `<div style="font-weight: 600;">Tel: ${storeInfo.phone}</div>` : ''}
        ${storeInfo.gstRegNo ? `<div style="font-weight: 600;">Tax No: ${storeInfo.gstRegNo}</div>` : ''}
      </div>

      <div class="divider"></div>

      <table>
        <tr><td>Order:</td><td style="text-align: right;">${orderData.orderNumber}</td></tr>
        ${orderData.tableNumber
          ? `<tr><td style="font-weight: 900;">Table:</td><td style="text-align: right; font-weight: 900;">${orderData.tableNumber}</td></tr>`
          : (orderData.pagerNumber
            ? `<tr><td>Pager #:</td><td style="text-align: right;">${orderData.pagerNumber}</td></tr>`
            : (orderData.pickupNumber
              ? `<tr><td>Pickup #:</td><td style="text-align: right;">${orderData.pickupNumber}</td></tr>`
              : ''))}
        <tr><td>Date:</td><td style="text-align: right;">${dateStr}</td></tr>
        <tr><td>Time:</td><td style="text-align: right;">${timeStr}</td></tr>
      </table>

      <div class="divider"></div>

      <table>${itemsHTML}</table>

      <div class="divider"></div>

      <table>${totalsHTML}</table>

      <div class="divider"></div>

      <table>
        <tr class="total-row">
          <td>TOTAL:</td>
          <td style="text-align: right;">${currencySymbol} ${orderData.total.toFixed(2)}</td>
        </tr>
      </table>

      <div class="footer">
        Thank you for your purchase!
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate HTML Kitchen Ticket for PC browser print
 */
function generateHTMLKitchenTicket(orderData, storeInfo) {
  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';

  let itemsHTML = '';
  orderData.items.forEach((item, index) => {
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    itemsHTML += `<div style="font-size: 20px; font-weight: 900; margin: 8px 0;">${qty} x ${itemName}</div>`;

    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        itemsHTML += `<div style="margin-left: 15px; color: #000; font-weight: 700;">\u2605 ${option}</div>`;
      });
    }
  });

  // Group label
  let groupLabelHTML = '';
  if (orderData.groupLabel) {
    groupLabelHTML = `<div style="font-size: 22px; font-weight: 900; text-align: center; margin: 10px 0; background: #000; color: #fff; padding: 5px;">** ${orderData.groupLabel.toUpperCase()} **</div>`;
  }

  // Order type
  let orderTypeHTML = '';
  if (orderData.orderType === 'pickup') {
    orderTypeHTML = `<div style="font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">** PRE-ORDER PICKUP **</div>
      <div style="text-align: center; font-weight: bold;">Pickup: ${orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP'}</div>`;
  } else if (orderData.orderType === 'takeaway' || orderData.takeawayCharge > 0) {
    orderTypeHTML = `<div style="font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">** TAKEAWAY **</div>`;
  } else if (orderData.orderType === 'delivery') {
    orderTypeHTML = `<div style="font-size: 18px; font-weight: bold; text-align: center; margin: 10px 0;">** DELIVERY **</div>`;
    if (orderData.deliveryInfo) {
      orderTypeHTML += `<div style="margin: 10px 0; padding: 5px; border: 1px dashed #000;">
        <div style="font-weight: bold;">DELIVERY ADDRESS:</div>
        ${orderData.deliveryInfo.address ? `<div>${orderData.deliveryInfo.address}</div>` : ''}
        ${orderData.deliveryInfo.phone ? `<div>Phone: ${orderData.deliveryInfo.phone}</div>` : ''}
        ${orderData.deliveryInfo.zoneName ? `<div>Zone: ${orderData.deliveryInfo.zoneName}</div>` : ''}
        ${orderData.deliveryInfo.notes ? `<div>Notes: ${orderData.deliveryInfo.notes}</div>` : ''}
      </div>`;
    }
  }

  // Table, Pager, or Pickup number (priority: Table > Pager > Pickup)
  let pickupHTML = '';
  if (orderData.tableNumber) {
    pickupHTML = `<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">TABLE ${orderData.tableNumber}</div>`;
  } else if (orderData.pagerNumber) {
    pickupHTML = `<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">PAGER ${orderData.pagerNumber}</div>`;
  } else {
    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    pickupHTML = `<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">PICKUP ${pickupNum}</div>`;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Kitchen Ticket - ${orderData.orderNumber}</title>
      <style>
        @page { size: 80mm auto; margin: 0; }
        @media print {
          body { margin: 0; padding: 0; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        body {
          font-family: 'Lucida Console', 'Courier New', monospace;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          box-sizing: border-box;
          -webkit-font-smoothing: none;
          letter-spacing: 0.5px;
        }
        .divider { border-top: 2px dashed #000; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 3px 0; font-weight: 600; }
      </style>
    </head>
    <body>
      ${groupLabelHTML}

      <div class="divider"></div>

      <table>
        <tr><td style="font-weight: 700;">Order:</td><td style="text-align: right; font-weight: 700;">${orderData.orderNumber}</td></tr>
        <tr><td style="font-weight: 700;">Time:</td><td style="text-align: right; font-weight: 700;">${timeStr}</td></tr>
        <tr><td style="font-weight: 700;">Source:</td><td style="text-align: right; font-weight: 700;">${orderSource}</td></tr>
        ${orderData.customerName && orderData.customerName !== 'Walk-in Customer' ? `<tr><td style="font-weight: 700;">Customer:</td><td style="text-align: right; font-weight: 700;">${orderData.customerName}</td></tr>` : ''}
      </table>

      <div class="divider"></div>

      <div style="font-size: 16px; font-weight: 900; margin: 10px 0;">ORDER ITEMS:</div>
      ${itemsHTML}

      <div class="divider"></div>

      ${orderData.notes && orderData.notes.trim() ? `
        <div style="font-weight: bold;">** SPECIAL NOTES **</div>
        <div style="margin: 5px 0;">${orderData.notes}</div>
        <div class="divider"></div>
      ` : ''}

      ${pickupHTML}
      ${orderTypeHTML}
    </body>
    </html>
  `;
}

/**
 * Generate HTML Additional Items Ticket for PC browser print
 */
function generateHTMLAdditionalItemsTicket(orderData, storeInfo) {
  const addedItems = orderData.items.filter(item => item.added_at);

  if (addedItems.length === 0) {
    return null;
  }

  const timeStr = new Date().toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  let itemsHTML = '';
  addedItems.forEach((item, index) => {
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    itemsHTML += `<div style="font-size: 20px; font-weight: 900; margin: 8px 0;">${qty} x ${itemName}</div>`;

    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        itemsHTML += `<div style="margin-left: 15px; color: #000; font-weight: 700;">\u2605 ${option}</div>`;
      });
    }
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Additional Items - ${orderData.orderNumber}</title>
      <style>
        @page { size: 80mm auto; margin: 0; }
        @media print {
          body { margin: 0; padding: 0; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        body {
          font-family: 'Lucida Console', 'Courier New', monospace;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          box-sizing: border-box;
          -webkit-font-smoothing: none;
          letter-spacing: 0.5px;
        }
        .divider { border-top: 2px dashed #000; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 3px 0; font-weight: 600; }
      </style>
    </head>
    <body>
      <div style="font-size: 22px; font-weight: 900; text-align: center; margin: 10px 0; background: #000; color: #fff; padding: 5px;">** ADDITIONAL ORDER **</div>

      <div class="divider"></div>

      <table>
        <tr><td style="font-weight: 700;">Order:</td><td style="text-align: right; font-weight: 700;">${orderData.orderNumber}</td></tr>
        <tr><td style="font-weight: 700;">Time:</td><td style="text-align: right; font-weight: 700;">${timeStr}</td></tr>
        ${orderData.tableNumber ? `<tr><td style="font-weight: 900;">TABLE:</td><td style="text-align: right; font-weight: 900;">${orderData.tableNumber}</td></tr>` : ''}
      </table>

      <div class="divider"></div>

      <div style="font-size: 16px; font-weight: 900; margin: 10px 0;">ADDED ITEMS:</div>
      ${itemsHTML}

      <div class="divider"></div>

      <div style="font-size: 14px; font-weight: bold; text-align: center; margin: 15px 0;">ADDED TO EXISTING ORDER</div>
    </body>
    </html>
  `;
}

/**
 * Print HTML content via browser print dialog (for PC)
 */
function printHTMLContent(htmlContent, title) {
  const printWindow = window.open('', '_blank', 'width=400,height=600,scrollbars=yes');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then print
    printWindow.onload = function() {
      setTimeout(() => {
        printWindow.print();
        // Close window after print dialog closes
        printWindow.onafterprint = function() {
          printWindow.close();
        };
        // Fallback: close after delay if onafterprint not supported
        setTimeout(() => {
          if (!printWindow.closed) {
            printWindow.close();
          }
        }, 1000);
      }, 200);
    };

    return true;
  }
  return false;
}

// ============================================
// RawBT Integration
// ============================================

/**
 * Get printer settings from localStorage
 * @returns {Object} Printer settings
 */
function getPrinterSettings() {
  try {
    const savedSettings = localStorage.getItem('printerSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (e) {
    console.error('Failed to load printer settings:', e);
  }
  return {
    billPrinter: { enabled: true, name: '', autoPrint: false },
    kitchenPrinter: { enabled: true, name: '', autoPrint: true }
  };
}

/**
 * Print bill via RawBT app using Android Intent
 *
 * @param {Object} orderData - Order data
 * @param {Object} storeInfo - Store info
 * @param {string} [printerName] - Optional printer name (overrides settings)
 * @returns {Promise<boolean>} Success status
 */
export async function printBillViaRawBT(orderData, storeInfo, printerName) {
  try {
    // Check if bill printer is enabled
    const settings = getPrinterSettings();
    if (!settings.billPrinter.enabled) {
      console.log('Bill printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // Browser print mode selected in Settings
    if (shouldUseBrowserPrint()) {
      console.log('🖥️ Browser print mode - using browser print dialog');
      const htmlContent = generateHTMLBill(orderData, storeInfo);
      return printHTMLContent(htmlContent, 'Bill');
    }

    // Default: Use RawBT (원래 동작)
    console.log('📱 RawBT mode - using RawBT');

    // Use provided printerName or get from settings
    const targetPrinter = printerName || settings.billPrinter.name;

    // Generate ESC/POS content
    const escposContent = generateBillContent(orderData, storeInfo);

    // Convert to Base64 using proper encoding
    // Use unescape + encodeURIComponent for Korean/special characters
    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    // Build Android Intent URL for RawBT
    let intentScheme = '#Intent;scheme=rawbt;';
    // Add printer name if specified (RawBT uses S.s parameter for printer selection)
    if (targetPrinter) {
      intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    }
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
    console.error('❌ Print error:', error);
    const isPC = shouldUseBrowserPrint();
    alert(
      'Failed to print bill.\n\n' +
      (isPC
        ? 'Please check your browser popup settings and try again.'
        : 'Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready'
      ) +
      '\n\nError: ' + error.message
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

  // === GROUP LABEL (for partial order printing) ===
  if (orderData.groupLabel) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** ' + orderData.groupLabel.toUpperCase() + ' **' + CMD.LINE_FEED;
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

    // Options with marker (same as Bill format)
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        content += '  ★ ' + option + CMD.LINE_FEED;
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

  // === FOOTER - TABLE/PAGER/PICKUP NUMBER AND ORDER TYPE (at bottom) ===
  content += CMD.LINE_FEED;

  // TABLE NUMBER (priority) > PAGER NUMBER > PICKUP NUMBER - single line format
  if (orderData.tableNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'TABLE  ' + orderData.tableNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else if (orderData.pagerNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PAGER  ' + orderData.pagerNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else {
    // PICKUP NUMBER - single line format (same as TABLE/PAGER)
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    content += 'PICKUP  ' + pickupNum + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  }

  content += CMD.LINE_FEED;

  // ORDER TYPE (PICKUP/TAKEAWAY/DELIVERY) at very bottom
  if (orderData.orderType === 'pickup') {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += '** PRE-ORDER PICKUP **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += CMD.TEXT_NORMAL;
    content += CMD.ALIGN_CENTER;
    content += CMD.BOLD_ON;
    content += 'Pickup: ' + (orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP') + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
  } else if (orderData.orderType === 'takeaway' || orderData.takeawayCharge > 0) {
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

    // Delivery info section
    if (orderData.deliveryInfo) {
      content += CMD.LINE_FEED;
      content += CMD.ALIGN_LEFT;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.BOLD_ON;
      content += 'DELIVERY ADDRESS:' + CMD.LINE_FEED;
      content += CMD.BOLD_OFF;
      if (orderData.deliveryInfo.address) {
        content += orderData.deliveryInfo.address + CMD.LINE_FEED;
      }
      if (orderData.deliveryInfo.phone) {
        content += 'Phone: ' + orderData.deliveryInfo.phone + CMD.LINE_FEED;
      }
      if (orderData.deliveryInfo.zoneName) {
        content += 'Zone: ' + orderData.deliveryInfo.zoneName + CMD.LINE_FEED;
      }
      if (orderData.deliveryInfo.notes) {
        content += 'Notes: ' + orderData.deliveryInfo.notes + CMD.LINE_FEED;
      }
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
    }
  }

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
 * @param {string} [printerName] - Optional printer name (overrides settings)
 * @returns {Promise<boolean>} Success status
 */
export async function printKitchenTicketViaRawBT(orderData, storeInfo, printerName) {
  try {
    // Check if kitchen printer is enabled
    const settings = getPrinterSettings();
    if (!settings.kitchenPrinter.enabled) {
      console.log('Kitchen printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // PC: Use browser print dialog with HTML
    if (shouldUseBrowserPrint()) {
      console.log('🖥️ PC detected - using browser print dialog for kitchen ticket');
      const htmlContent = generateHTMLKitchenTicket(orderData, storeInfo);
      return printHTMLContent(htmlContent, 'Kitchen Ticket');
    }

    // Mobile/Tablet: Use RawBT Intent
    console.log('📱 Mobile/Tablet detected - using RawBT for kitchen ticket');

    // Use provided printerName or get from settings
    const targetPrinter = printerName || settings.kitchenPrinter.name;

    const escposContent = generateKitchenTicketContent(orderData, storeInfo);
    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    let intentScheme = '#Intent;scheme=rawbt;';
    // Add printer name if specified
    if (targetPrinter) {
      intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    }
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
    const isPC = shouldUseBrowserPrint();
    alert(
      'Failed to print kitchen order ticket.\n\n' +
      (isPC
        ? 'Please check your browser popup settings and try again.'
        : 'Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready'
      ) +
      '\n\nError: ' + error.message
    );
    return false;
  }
}

// ============================================
// Additional Items Kitchen Ticket
// ============================================

/**
 * Generate Additional Items Kitchen Ticket (추가 주문 티켓)
 * Only prints items that have been added after initial order
 *
 * @param {Object} orderData - Order information with added items
 * @param {Object} storeInfo - Store information
 * @returns {string} ESC/POS command string
 */
export function generateAdditionalItemsTicketContent(orderData, storeInfo) {
  let content = '';

  // Filter only newly added items (items with added_at timestamp)
  const addedItems = orderData.items.filter(item => item.added_at);

  if (addedItems.length === 0) {
    return ''; // No additional items to print
  }

  // Initialize printer
  content += CMD.INIT;

  // === HEADER - ADDITIONAL ORDER ===
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  content += '** ADDITIONAL ORDER **' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = new Date().toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Table info
  if (orderData.tableNumber) {
    content += CMD.BOLD_ON;
    content += formatLine('TABLE:', orderData.tableNumber) + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // === ADDED ITEMS ===
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += 'ADDED ITEMS:' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  addedItems.forEach((item, index) => {
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
        content += '  ★ ' + option + CMD.LINE_FEED;
      });
    }

    // Spacing between items
    if (index < addedItems.length - 1) {
      content += CMD.LINE_FEED;
    }
  });

  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === FOOTER ===
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += CMD.BOLD_ON;
  content += 'ADDED TO EXISTING ORDER' + CMD.LINE_FEED;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

/**
 * Print Additional Items Kitchen Ticket via RawBT
 *
 * @param {Object} orderData - Order data with added items
 * @param {Object} storeInfo - Store info
 * @param {string} [printerName] - Optional printer name (overrides settings)
 * @returns {Promise<boolean>} Success status
 */
export async function printAdditionalItemsTicketViaRawBT(orderData, storeInfo, printerName) {
  try {
    // Check if kitchen printer is enabled
    const settings = getPrinterSettings();
    if (!settings.kitchenPrinter.enabled) {
      console.log('Kitchen printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // PC: Use browser print dialog with HTML
    if (shouldUseBrowserPrint()) {
      console.log('🖥️ PC detected - using browser print dialog for additional items ticket');
      const htmlContent = generateHTMLAdditionalItemsTicket(orderData, storeInfo);
      if (!htmlContent) {
        console.log('No additional items to print');
        return true;
      }
      return printHTMLContent(htmlContent, 'Additional Items Ticket');
    }

    // Mobile/Tablet: Use RawBT Intent
    console.log('📱 Mobile/Tablet detected - using RawBT for additional items ticket');

    // Use provided printerName or get from settings
    const targetPrinter = printerName || settings.kitchenPrinter.name;

    const escposContent = generateAdditionalItemsTicketContent(orderData, storeInfo);

    // If no content (no added items), return success
    if (!escposContent) {
      console.log('No additional items to print');
      return true;
    }

    const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

    let intentScheme = '#Intent;scheme=rawbt;';
    // Add printer name if specified
    if (targetPrinter) {
      intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
    }
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
    console.error('Additional Items Ticket print error:', error);
    const isPC = shouldUseBrowserPrint();
    alert(
      'Failed to print additional items ticket.\n\n' +
      (isPC
        ? 'Please check your browser popup settings and try again.'
        : 'Please ensure:\n1. RawBT app is installed\n2. WiFi printer is configured in RawBT\n3. Printer is connected and ready'
      ) +
      '\n\nError: ' + error.message
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

    // Options with STAR marker (same as Bill format)
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        lines.push('  ★ ' + option);
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

  // === FOOTER - TABLE/PAGER/PICKUP NUMBER AND ORDER TYPE (at bottom) ===
  lines.push('');

  // TABLE NUMBER (priority) > PAGER NUMBER > PICKUP NUMBER - single line format
  if (orderData.tableNumber) {
    lines.push('              TABLE  ' + orderData.tableNumber);
  } else if (orderData.pagerNumber) {
    lines.push('              PAGER  ' + orderData.pagerNumber);
  } else {
    const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
    lines.push('             PICKUP  ' + pickupNum);
  }

  lines.push('');

  // ORDER TYPE (PICKUP/TAKEAWAY/DELIVERY) at very bottom
  if (orderData.orderType === 'pickup') {
    lines.push('        ** PRE-ORDER PICKUP **');
    lines.push('        Pickup: ' + (orderData.scheduledPickupTime ? formatPickupTimeRange(orderData.scheduledPickupTime) : 'ASAP'));
  } else if (orderData.orderType === 'takeaway' || orderData.takeawayCharge > 0) {
    lines.push('           ** TAKEAWAY **');
  } else if (orderData.orderType === 'delivery') {
    lines.push('           ** DELIVERY **');
  }

  return lines.join('\n');
}

/**
 * Print Table QR Code to thermal printer
 * @param {string} tableNumber - Table number (e.g., "T001")
 * @param {HTMLCanvasElement} qrCanvas - QR code canvas element
 * @param {string} storeName - Restaurant name
 */
export function printTableQR(tableNumber, qrCanvas, storeName = 'Restaurant') {
  // Check if RawBT is available (mobile/tablet)
  const isMobileOrTablet = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ||
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isMobileOrTablet && qrCanvas) {
    // Use RawBT for thermal printer
    try {
      // Get QR code as base64 image
      const qrImageData = qrCanvas.toDataURL('image/png');
      const base64Image = qrImageData.split(',')[1];

      // Build ESC/POS content
      let content = '';
      content += CMD.INIT;
      content += CMD.ALIGN_CENTER;

      // Store name
      content += CMD.TEXT_DOUBLE;
      content += storeName + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL;
      content += CMD.LINE_FEED;

      // Table number header
      content += CMD.BOLD_ON;
      content += CMD.TEXT_DOUBLE;
      content += tableNumber + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL;
      content += CMD.BOLD_OFF;
      content += CMD.LINE_FEED;

      // Note: ESC/POS QR image printing requires specific printer support
      // For now, we'll print text-based info and use browser print for QR
      content += 'Scan to order' + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.LINE_FEED;

      // Instructions
      content += '1. Scan QR code with phone' + CMD.LINE_FEED;
      content += '2. Browse menu & add items' + CMD.LINE_FEED;
      content += '3. Place your order' + CMD.LINE_FEED;
      content += CMD.LINE_FEED;

      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.CUT_PARTIAL;

      // Convert to base64 and send via RawBT
      const base64Content = btoa(unescape(encodeURIComponent(content)));
      const rawbtUrl = `rawbt:base64,${base64Content}`;

      console.log('🖨️ Sending Table QR to RawBT thermal printer');
      window.location.href = rawbtUrl;

      return true;
    } catch (error) {
      console.error('Failed to print via RawBT:', error);
      return false;
    }
  } else {
    // Desktop - use browser print with QR image
    const printWindow = window.open('', '', 'height=600,width=400');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Table ${tableNumber} QR Code</title>
            <style>
              body {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                font-family: Arial, sans-serif;
                text-align: center;
              }
              .store-name { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
              .table-number { font-size: 32px; font-weight: bold; margin: 15px 0; }
              .qr-container { margin: 20px 0; }
              .instruction { font-size: 14px; color: #666; margin-top: 15px; }
              @media print {
                body { height: auto; padding: 20px; }
              }
            </style>
          </head>
          <body>
            <div class="store-name">${storeName}</div>
            <div class="table-number">${tableNumber}</div>
            <div class="qr-container">
              <img src="${qrCanvas.toDataURL('image/png')}" width="200" height="200" />
            </div>
            <div class="instruction">Scan to order</div>
          </body>
        </html>
      `);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);

      return true;
    }
    return false;
  }
}

// All functions are already exported individually above
