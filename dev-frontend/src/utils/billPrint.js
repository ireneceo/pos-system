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

  // Show Pager if exists, otherwise show Pickup (same as Order Ticket)
  if (orderData.pagerNumber) {
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

  // Takeaway Charge (before discounts)
  if (orderData.takeawayCharge && orderData.takeawayCharge > 0) {
    content += formatLine('Takeaway Charge:', 'RM ' + orderData.takeawayCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  // Fixed Amount Discount
  if (orderData.discount && orderData.discount > 0) {
    content += formatLine('Discount:', '- RM ' + orderData.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Percentage Discount Policy
  if (orderData.discountPolicy && orderData.discountPolicy.amount > 0) {
    const policyLabel = 'Discount (' + orderData.discountPolicy.name + '):';
    content += formatLine(policyLabel, '- RM ' + orderData.discountPolicy.amount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Coupon Discount
  if (orderData.coupon && orderData.coupon.discount > 0) {
    const couponLabel = 'Coupon (' + orderData.coupon.code + '):';
    content += formatLine(couponLabel, '- RM ' + orderData.coupon.discount.toFixed(2)) + CMD.LINE_FEED;
  }

  // Service Charge (after discounts)
  if (orderData.serviceCharge && orderData.serviceCharge > 0) {
    const scLabel = 'Service Charge (' + (orderData.serviceChargeRate || 10) + '%):';
    content += formatLine(scLabel, 'RM ' + orderData.serviceCharge.toFixed(2)) + CMD.LINE_FEED;
  }

  // Tax (after discounts)
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

  // === FOOTER - PAGER/PICKUP NUMBER AND ORDER TYPE (at bottom) ===
  content += CMD.LINE_FEED;

  // PAGER NUMBER (if exists) OR PICKUP NUMBER - single line format
  if (orderData.pagerNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PAGER  ' + orderData.pagerNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else {
    // PICKUP NUMBER - single line format (same as PAGER)
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

  // === FOOTER - PAGER/PICKUP NUMBER AND ORDER TYPE (at bottom) ===
  lines.push('');

  // PAGER NUMBER (if exists) OR PICKUP NUMBER - single line format
  if (orderData.pagerNumber) {
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
      content += 'TABLE ' + tableNumber + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL;
      content += CMD.BOLD_OFF;
      content += CMD.LINE_FEED;

      // Note: ESC/POS QR image printing requires specific printer support
      // For now, we'll print text-based info and use browser print for QR
      content += 'Scan QR code to order' + CMD.LINE_FEED;
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
            <div class="table-number">TABLE ${tableNumber}</div>
            <div class="qr-container">
              <img src="${qrCanvas.toDataURL('image/png')}" width="200" height="200" />
            </div>
            <div class="instruction">Scan to order from this table</div>
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
