/**
 * Bill Print Utility
 *
 * Supports 3 print modes:
 * 1. RawBT (Android) - ESC/POS via RawBT Intent to Bluetooth printer
 * 2. Browser Print (PC) - HTML via window.print() to OS printer dialog
 * 3. QZ Tray (Network) - ESC/POS via QZ Tray to LAN network printers
 */
import qz from 'qz-tray';

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
 * Check if QZ Tray mode is selected
 */
function shouldUseQZTray() {
  return localStorage.getItem('printerMode') === 'qztray';
}

/**
 * Set printer mode
 * @param {'rawbt' | 'browser' | 'qztray'} mode
 */
export function setPrinterMode(mode) {
  localStorage.setItem('printerMode', mode);
}

/**
 * Get current printer mode
 * @returns {'rawbt' | 'browser' | 'qztray'}
 */
export function getPrinterMode() {
  const mode = localStorage.getItem('printerMode');
  if (mode === 'browser') return 'browser';
  if (mode === 'qztray') return 'qztray';
  return 'rawbt';
}

// ============================================
// QZ Tray Integration
// ============================================

let qzConnected = false;
let qzConnecting = false;

/**
 * QZ Tray 서명 콜백 설정 (보안 인증)
 * 프로덕션에서는 자체 인증서로 교체 가능
 */
function setupQZSecurity() {
  if (qz.security.getSignatureAlgorithm() !== undefined) return;
  qz.security.setCertificatePromise(function(resolve) {
    resolve('');
  });
  qz.security.setSignaturePromise(function() {
    return function(resolve) {
      resolve('');
    };
  });
}

/**
 * QZ Tray WebSocket 연결
 * QZ Tray는 PC에 설치된 프로그램으로, localhost:8182에서 WebSocket 서버를 실행한다.
 * 브라우저가 이 WebSocket에 연결하면 네트워크 프린터로 데이터를 전송할 수 있다.
 */
export async function connectQZTray() {
  if (qzConnected && qz.websocket.isActive()) return true;
  if (qzConnecting) {
    // 이미 연결 시도 중이면 완료 대기
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (!qzConnecting) {
          clearInterval(check);
          resolve(qzConnected);
        }
      }, 100);
    });
  }

  qzConnecting = true;
  try {
    setupQZSecurity();
    if (!qz.websocket.isActive()) {
      await qz.websocket.connect({ retries: 2, delay: 0.5 });
    }
    qzConnected = true;
    console.log('QZ Tray connected');
    return true;
  } catch (err) {
    qzConnected = false;
    console.error('QZ Tray connection failed:', err);
    return false;
  } finally {
    qzConnecting = false;
  }
}

/**
 * QZ Tray 연결 해제
 */
export async function disconnectQZTray() {
  if (qz.websocket.isActive()) {
    await qz.websocket.disconnect();
  }
  qzConnected = false;
}

/**
 * QZ Tray 연결 상태 확인
 */
export function isQZTrayConnected() {
  return qzConnected && qz.websocket.isActive();
}

/**
 * QZ Tray를 통해 설치된 프린터 목록 조회
 * OS에 등록된 프린터(USB, 네트워크 등) 목록을 반환한다.
 */
export async function getQZTrayPrinters() {
  try {
    const connected = await connectQZTray();
    if (!connected) return [];
    const printers = await qz.printers.find();
    return printers;
  } catch (err) {
    console.error('Failed to get printers via QZ Tray:', err);
    return [];
  }
}

/**
 * QZ Tray를 통해 ESC/POS 데이터를 네트워크 프린터로 전송
 *
 * @param {string} escposContent - ESC/POS 명령 문자열
 * @param {string} printerAddress - 프린터 식별자. 두 가지 형식 가능:
 *   1. LAN IP:포트 (예: '192.168.1.100:9100') - 네트워크 RAW 소켓으로 직접 전송
 *   2. OS 프린터 이름 (예: 'EPSON TM-T82') - OS에 등록된 프린터로 전송
 * @returns {Promise<boolean>}
 */
async function sendViaQZTray(escposContent, printerAddress) {
  try {
    const connected = await connectQZTray();
    if (!connected) {
      console.error('QZ Tray not connected');
      return false;
    }

    let config;
    // IP:포트 형식이면 네트워크 RAW 소켓, 아니면 OS 프린터 이름으로 전송
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(printerAddress)) {
      const [host, port] = printerAddress.split(':');
      config = qz.configs.create(host + ':' + (port || '9100'), {
        host: host,
        port: parseInt(port || '9100', 10)
      });
    } else {
      config = qz.configs.create(printerAddress);
    }

    // ESC/POS를 Base64로 인코딩하여 전송
    const base64Data = btoa(unescape(encodeURIComponent(escposContent)));
    await qz.print(config, [{
      type: 'raw',
      format: 'base64',
      data: base64Data
    }]);

    console.log('QZ Tray: sent to', printerAddress);
    return true;
  } catch (err) {
    console.error('QZ Tray print failed:', err);
    return false;
  }
}

/**
 * QZ Tray 테스트 프린트
 * Settings에서 연결 확인용으로 사용
 */
export async function qzTrayTestPrint(printerAddress) {
  const content = CMD.INIT +
    CMD.ALIGN_CENTER +
    CMD.TEXT_DOUBLE +
    CMD.BOLD_ON +
    'QZ Tray Test' + CMD.LINE_FEED +
    CMD.TEXT_NORMAL +
    CMD.BOLD_OFF +
    CMD.LINE_FEED +
    'Connection OK' + CMD.LINE_FEED +
    new Date().toLocaleString() + CMD.LINE_FEED +
    CMD.LINE_FEED +
    CMD.DASHED_LINE + CMD.LINE_FEED +
    CMD.LINE_FEED +
    CMD.LINE_FEED +
    CMD.CUT_PARTIAL;

  return sendViaQZTray(content, printerAddress);
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
  return CURRENCY_SYMBOLS[currency] || currency || 'MYR';
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
  if (storeInfo.businessRegistration) {
    content += 'Reg No: ' + storeInfo.businessRegistration + CMD.LINE_FEED;
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
  if (orderData.cashierName) {
    content += formatLine('Cashier:', orderData.cashierName) + CMD.LINE_FEED;
  }
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
function getReceiptSettings() {
  try {
    const saved = localStorage.getItem('receiptSettings');
    if (saved) return JSON.parse(saved);
  } catch {}
  return { receiptLogo: '', footerMessage: 'Thank you for your purchase!', showMembership: false, customQrImage: '', customQrText: '', customQrPosition: 'back' };
}

export function generateHTMLBill(orderData, storeInfo) {
  const receiptCfg = getReceiptSettings();
  // Migrate legacy fields
  const showMembership = receiptCfg.showMembership !== undefined ? receiptCfg.showMembership : (receiptCfg.showQrCode !== false || receiptCfg.showPointsInfo !== false);
  // Merge receipt settings: storeInfo overrides take precedence over localStorage
  const receiptLogo = storeInfo.receiptLogo || receiptCfg.receiptLogo || '';
  const footerMsg = storeInfo.footerMessage || receiptCfg.footerMessage || 'Thank you for your purchase!';
  const customQrImage = receiptCfg.customQrImage || '';
  const customQrText = receiptCfg.customQrText || '';
  const customQrPosition = receiptCfg.customQrPosition || 'back';
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <title>Bill - ${orderData.orderNumber}</title>
      <style>
        @page { size: 80mm auto; margin: 0; }
        @media print {
          body { margin: 0; padding: 0; }
          .no-print { display: none; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        body {
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          box-sizing: border-box;
          -webkit-font-smoothing: none;
          letter-spacing: -0.01em;
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
        ${receiptLogo ? `<img src="${receiptLogo}" style="max-width: 320px; max-height: 100px; margin-bottom: 6px; filter: grayscale(100%);" />` : ''}
        <div class="store-name">${storeInfo.name || ''}</div>
        ${storeInfo.address ? `<div style="font-size: 12px; font-weight: 500;">${storeInfo.address}</div>` : ''}
        ${storeInfo.phone ? `<div style="font-size: 12px; font-weight: 500;">Tel: ${storeInfo.phone}</div>` : ''}
        ${(storeInfo.businessRegistration || storeInfo.gstRegNo) ? `<div style="font-size: 12px; font-weight: 500;">${[storeInfo.businessRegistration ? 'Reg No: ' + storeInfo.businessRegistration : '', storeInfo.gstRegNo ? 'Tax No: ' + storeInfo.gstRegNo : ''].filter(Boolean).join(' | ')}</div>` : ''}
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
        ${orderData.cashierName ? `<tr><td>Cashier:</td><td style="text-align: right;">${orderData.cashierName}</td></tr>` : ''}
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

      ${showMembership ? `
      <div style="text-align: center; margin-top: 12px; padding-top: 12px; border-top: 1px dashed #000;">
        <div style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">Order online & earn points!</div>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent('https://purplehere.com/m/' + (storeInfo.restaurantId || ''))}" style="width: 80px; height: 80px;" />
        <div style="font-size: 9px; color: #666; margin-top: 4px;">purplehere.com/m/${storeInfo.restaurantId || ''}</div>
      </div>
      ` : ''}

      ${customQrImage ? `
      <div style="text-align: center; margin-top: 12px; padding-top: 12px; border-top: 1px dashed #000;">
        ${customQrText && customQrPosition === 'front' ? `<div style="font-size: 13px; font-weight: 700; margin-bottom: 6px;">${customQrText}</div>` : ''}
        <img src="${customQrImage.startsWith('/uploads/') ? (window.location.origin + customQrImage) : customQrImage}" style="width: 80px; height: 80px;" />
        ${customQrText && customQrPosition === 'back' ? `<div style="font-size: 13px; font-weight: 700; margin-top: 6px;">${customQrText}</div>` : ''}
      </div>
      ` : ''}

      <div class="footer">
        ${footerMsg}
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
  if (orderData.skipFooterLocation) {
    // 그룹 프린트: 하단 위치 정보 생략
    pickupHTML = '';
  } else if (orderData.tableNumber) {
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
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          box-sizing: border-box;
          -webkit-font-smoothing: none;
          letter-spacing: -0.01em;
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
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 5mm;
          box-sizing: border-box;
          -webkit-font-smoothing: none;
          letter-spacing: -0.01em;
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
export function printHTMLContent(htmlContent, title) {
  // Use hidden iframe to print without opening a new window
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';

  // Set onload BEFORE appending to DOM to avoid race condition
  iframe.onload = function() {
    setTimeout(() => {
      try {
        iframe.contentWindow.print();
      } catch (e) {
        console.error('Print failed:', e);
      }
      // Clean up iframe after printing
      setTimeout(() => {
        if (iframe.parentNode) {
          document.body.removeChild(iframe);
        }
      }, 2000);
    }, 300);
  };

  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentWindow || iframe.contentDocument;
  const doc = iframeDoc.document || iframeDoc;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  return true;
}

// ============================================
// RawBT Integration
// ============================================

/**
 * Get printer settings from localStorage
 * @returns {Object} Printer settings
 */
export function getPrinterSettings() {
  try {
    const savedSettings = localStorage.getItem('printerSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (e) {
    console.error('Failed to load printer settings:', e);
  }
  return {
    billPrinter: { enabled: false, name: '', autoPrint: false },
    kitchenPrinter: { enabled: false, name: '', autoPrint: false, printPerItem: false }
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

    // QZ Tray mode: send ESC/POS via QZ Tray to network printer
    if (shouldUseQZTray()) {
      console.log('🖨️ QZ Tray mode - sending to network printer');
      const address = settings.billPrinter.address;
      if (!address) {
        console.warn('QZ Tray: no bill printer address configured');
        return false;
      }
      const escposContent = generateBillContent(orderData, storeInfo);
      return await sendViaQZTray(escposContent, address);
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
    const mode = getPrinterMode();
    alert(
      'Failed to print bill.\n\n' +
      (mode === 'qztray'
        ? 'Please ensure:\n1. QZ Tray is running on this device\n2. Printer IP address is correct\n3. Printer is connected to the network'
        : mode === 'browser'
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

  // Skip footer location for group prints (Item View)
  if (orderData.skipFooterLocation) {
    content += CMD.LINE_FEED;
    content += CMD.LINE_FEED;
    content += CMD.CUT;
    return content;
  }

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
 * Generate Single Item Kitchen Ticket Content (per-item print mode)
 *
 * @param {Object} orderData - Order information
 * @param {Object} item - Single item to print
 * @param {number} itemIndex - Current item index (1-based)
 * @param {number} totalItems - Total number of items in order
 * @param {Object} storeInfo - Store information
 * @returns {string} ESC/POS command string
 */
export function generateSingleItemKitchenTicket(orderData, item, itemIndex, totalItems, storeInfo) {
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

  if (orderData.customerName && orderData.customerName !== 'Walk-in Customer') {
    content += formatLine('Customer:', orderData.customerName) + CMD.LINE_FEED;
  }

  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === ITEM NUMBER INDICATOR ===
  content += CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += CMD.BOLD_ON;
  content += `** ITEM ${itemIndex} of ${totalItems} **` + CMD.LINE_FEED;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === SINGLE ITEM (LARGE) ===
  content += CMD.ALIGN_LEFT;
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
      content += '  * ' + option + CMD.LINE_FEED;
    });
  }

  content += CMD.LINE_FEED;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;

  // === SPECIAL NOTES (only on first item or if item has specific note) ===
  if (itemIndex === 1 && orderData.notes && orderData.notes.trim()) {
    content += CMD.LINE_FEED;
    content += CMD.BOLD_ON;
    content += '** SPECIAL NOTES **' + CMD.LINE_FEED;
    content += CMD.BOLD_OFF;
    content += orderData.notes + CMD.LINE_FEED;
    content += CMD.LINE_FEED;
    content += CMD.DASHED_LINE + CMD.LINE_FEED;
  }

  // === FOOTER - TABLE/PAGER/PICKUP NUMBER ===
  content += CMD.LINE_FEED;

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
    content += 'PAGER #' + orderData.pagerNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  } else if (orderData.pickupNumber) {
    content += CMD.ALIGN_CENTER;
    content += CMD.TEXT_DOUBLE;
    content += CMD.BOLD_ON;
    content += 'PICKUP #' + orderData.pickupNumber + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;
  }

  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Paper cut
  content += CMD.CUT_PARTIAL;

  return content;
}

/**
 * Generate HTML with all items as separate pages (for browser print per-item mode)
 * Each item gets its own page with page-break
 */
function generateHTMLMultiPageKitchenTickets(orderData, storeInfo) {
  const timeStr = orderData.date.toLocaleTimeString('en-MY', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  const totalItems = orderData.items.length;

  let pagesHTML = '';

  orderData.items.forEach((item, index) => {
    const itemIndex = index + 1;
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    let optionsHTML = '';
    if (item.options && item.options.length > 0) {
      item.options.forEach(option => {
        optionsHTML += `<div style="margin-left: 15px; color: #000; font-weight: 700;">\u2605 ${option}</div>`;
      });
    }

    // Table/Pager/Pickup
    let pickupHTML = '';
    if (orderData.tableNumber) {
      pickupHTML = `<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">TABLE ${orderData.tableNumber}</div>`;
    } else if (orderData.pagerNumber) {
      pickupHTML = `<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">PAGER ${orderData.pagerNumber}</div>`;
    } else {
      const pickupNum = orderData.pickupNumber || (orderData.orderNumber ? orderData.orderNumber.split('-')[1] : '000');
      pickupHTML = `<div style="font-size: 28px; font-weight: 900; text-align: center; margin: 15px 0;">PICKUP ${pickupNum}</div>`;
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
    }

    pagesHTML += `
      <div class="ticket-page">
        <div class="divider"></div>

        <table>
          <tr><td style="font-weight: 700;">Order:</td><td style="text-align: right; font-weight: 700;">${orderData.orderNumber}</td></tr>
          <tr><td style="font-weight: 700;">Time:</td><td style="text-align: right; font-weight: 700;">${timeStr}</td></tr>
          <tr><td style="font-weight: 700;">Source:</td><td style="text-align: right; font-weight: 700;">${orderSource}</td></tr>
          ${orderData.customerName && orderData.customerName !== 'Walk-in Customer' ? `<tr><td style="font-weight: 700;">Customer:</td><td style="text-align: right; font-weight: 700;">${orderData.customerName}</td></tr>` : ''}
        </table>

        <div class="divider"></div>

        <div style="font-size: 18px; font-weight: 900; text-align: center; margin: 12px 0; background: #000; color: #fff; padding: 8px;">
          ITEM ${itemIndex} of ${totalItems}
        </div>

        <div style="font-size: 22px; font-weight: 900; margin: 12px 0;">${qty} x ${itemName}</div>
        ${optionsHTML}

        <div class="divider"></div>

        ${itemIndex === 1 && orderData.notes && orderData.notes.trim() ? `
          <div style="font-weight: bold;">** SPECIAL NOTES **</div>
          <div style="margin: 5px 0;">${orderData.notes}</div>
          <div class="divider"></div>
        ` : ''}

        ${pickupHTML}
        ${orderTypeHTML}
      </div>
    `;
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Kitchen Tickets - ${orderData.orderNumber}</title>
      <style>
        @page { size: 80mm auto; margin: 0; }
        @media print {
          body { margin: 0; padding: 0; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        body {
          font-family: 'Inter', Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #000;
          width: 80mm;
          max-width: 80mm;
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
          -webkit-font-smoothing: none;
          letter-spacing: -0.01em;
        }
        .ticket-page {
          padding: 5mm;
          min-height: 100mm;
          page-break-after: always;
          break-after: page;
          border-bottom: 3px dashed #999;
          margin-bottom: 10px;
        }
        .ticket-page:last-child {
          page-break-after: avoid;
          break-after: avoid;
          border-bottom: none;
          margin-bottom: 0;
        }
        .divider { border-top: 2px dashed #000; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 3px 0; font-weight: 600; }
      </style>
    </head>
    <body>
      ${pagesHTML}
    </body>
    </html>
  `;
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
    const settings = getPrinterSettings();
    console.log(`🖨️ printKitchenTicketViaRawBT: ${(orderData.items || []).length} items, printerMode=${getPrinterMode()}`);

    // kitchenPrinter.enabled 체크 — Station 유무 관계없이 동일
    if (!settings.kitchenPrinter.enabled) {
      console.log('Kitchen printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // QZ Tray mode
    if (shouldUseQZTray()) {
      console.log('🖨️ QZ Tray mode - sending kitchen ticket to network printer');
      const address = settings.kitchenPrinter.address;
      if (!address) {
        console.warn('QZ Tray: no kitchen printer address configured');
        return false;
      }
      const printPerItem = settings.kitchenPrinter.printPerItem || false;
      if (printPerItem && orderData.items && orderData.items.length > 0) {
        for (let i = 0; i < orderData.items.length; i++) {
          const item = orderData.items[i];
          const escpos = generateSingleItemKitchenTicket(orderData, item, i + 1, orderData.items.length, storeInfo);
          await sendViaQZTray(escpos, address);
          if (i < orderData.items.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }
        return true;
      }
      const escposContent = generateKitchenTicketContent(orderData, storeInfo);
      return await sendViaQZTray(escposContent, address);
    }

    // Use provided printerName or get from settings
    const targetPrinter = printerName || settings.kitchenPrinter.name;

    // Check if per-item printing is enabled
    const printPerItem = settings.kitchenPrinter.printPerItem || false;

    if (printPerItem && orderData.items && orderData.items.length > 0) {
      // Print separate ticket for each item
      console.log(`📋 Printing ${orderData.items.length} separate kitchen tickets (per-item mode)`);

      if (shouldUseBrowserPrint()) {
        // Browser print mode: Generate all items as pages in one document
        console.log('🖥️ Browser mode - generating multi-page document');
        const htmlContent = generateHTMLMultiPageKitchenTickets(orderData, storeInfo);
        return printHTMLContent(htmlContent, `Kitchen Tickets - ${orderData.orderNumber}`);
      }

      // RawBT mode: Print each item separately with delay
      for (let i = 0; i < orderData.items.length; i++) {
        const item = orderData.items[i];
        const itemIndex = i + 1;
        const totalItems = orderData.items.length;

        const escposContent = generateSingleItemKitchenTicket(orderData, item, itemIndex, totalItems, storeInfo);
        const base64Content = btoa(unescape(encodeURIComponent(escposContent)));

        let intentScheme = '#Intent;scheme=rawbt;';
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
        }, 500);

        // Delay between prints to prevent printer overload
        if (i < orderData.items.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 800));
        }
      }

      return true;
    }

    // Default: Print combined ticket (original behavior)
    if (shouldUseBrowserPrint()) {
      console.log('🖥️ PC detected - using browser print dialog for kitchen ticket');
      const htmlContent = generateHTMLKitchenTicket(orderData, storeInfo);
      return printHTMLContent(htmlContent, 'Kitchen Ticket');
    }

    // Mobile/Tablet: Use RawBT Intent
    console.log('📱 Mobile/Tablet detected - using RawBT for kitchen ticket');

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
    const mode = getPrinterMode();
    alert(
      'Failed to print kitchen order ticket.\n\n' +
      (mode === 'qztray'
        ? 'Please ensure:\n1. QZ Tray is running on this device\n2. Printer IP address is correct\n3. Printer is connected to the network'
        : mode === 'browser'
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
    const settings = getPrinterSettings();

    // Station 프린터가 설정되어 있으면 station별 라우팅으로 처리
    const stationPrinters = settings.kitchenStationPrinters;
    const hasStationPrinters = stationPrinters && Object.keys(stationPrinters).length > 0;

    if (hasStationPrinters && !printerName) {
      return await printKitchenTicketsByStation(orderData, storeInfo, settings);
    }

    // Station이 없을 때만 kitchenPrinter.enabled 체크
    if (!settings.kitchenPrinter.enabled) {
      console.log('Kitchen printer is disabled in settings');
      return true; // Return success but skip printing
    }

    // QZ Tray mode
    if (shouldUseQZTray()) {
      console.log('🖨️ QZ Tray mode - sending additional items ticket');
      const address = settings.kitchenPrinter.address;
      if (!address) {
        console.warn('QZ Tray: no kitchen printer address configured');
        return false;
      }
      const escposContent = generateAdditionalItemsTicketContent(orderData, storeInfo);
      if (!escposContent) {
        console.log('No additional items to print');
        return true;
      }
      return await sendViaQZTray(escposContent, address);
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
    const mode = getPrinterMode();
    alert(
      'Failed to print additional items ticket.\n\n' +
      (mode === 'qztray'
        ? 'Please ensure:\n1. QZ Tray is running on this device\n2. Printer IP address is correct\n3. Printer is connected to the network'
        : mode === 'browser'
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
export async function printTableQR(tableNumber, qrCanvas, storeName = 'Restaurant') {
  // QZ Tray mode: send ESC/POS text (QR image not supported in ESC/POS text mode)
  if (shouldUseQZTray()) {
    const settings = getPrinterSettings();
    const address = settings.billPrinter.address;
    if (address) {
      let content = '';
      content += CMD.INIT;
      content += CMD.ALIGN_CENTER;
      content += CMD.TEXT_DOUBLE;
      content += storeName + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL;
      content += CMD.LINE_FEED;
      content += CMD.BOLD_ON;
      content += CMD.TEXT_DOUBLE;
      content += tableNumber + CMD.LINE_FEED;
      content += CMD.TEXT_NORMAL;
      content += CMD.BOLD_OFF;
      content += CMD.LINE_FEED;
      content += 'Scan to order' + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.DASHED_LINE + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += '1. Scan QR code with phone' + CMD.LINE_FEED;
      content += '2. Browse menu & add items' + CMD.LINE_FEED;
      content += '3. Place your order' + CMD.LINE_FEED;
      content += CMD.LINE_FEED;
      content += CMD.CUT_PARTIAL;
      return await sendViaQZTray(content, address);
    }
  }

  // Check if RawBT is available (mobile/tablet)
  const isMobileOrTablet = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ||
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isMobileOrTablet && qrCanvas) {
    // Use RawBT for thermal printer
    try {
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

/**
 * Print Daily Settlement Report
 * Follows the same printer settings flow as bill/kitchen ticket printing
 *
 * @param {string} htmlContent - Pre-generated HTML content for browser print
 * @param {string} escposContent - Pre-generated ESC/POS content for thermal printer (optional)
 * @returns {boolean} Success status
 */
export async function printSettlementReport(htmlContent, escposContent) {
  try {
    const settings = getPrinterSettings();
    if (!settings.billPrinter.enabled) {
      console.log('Bill printer is disabled in settings');
      return true;
    }

    // QZ Tray mode
    if (shouldUseQZTray() && escposContent) {
      console.log('🖨️ QZ Tray mode - printing settlement report');
      const address = settings.billPrinter.address;
      if (address) {
        return await sendViaQZTray(escposContent, address);
      }
      // Fallback to browser print if no address
      return printHTMLContent(htmlContent, 'Daily Settlement');
    }

    // Browser print mode
    if (shouldUseBrowserPrint()) {
      console.log('🖥️ Browser print mode - printing settlement report');
      return printHTMLContent(htmlContent, 'Daily Settlement');
    }

    // RawBT mode - use ESC/POS content if provided
    if (escposContent) {
      console.log('📱 RawBT mode - printing settlement report');
      const base64Content = btoa(unescape(encodeURIComponent(escposContent)));
      const targetPrinter = settings.billPrinter.name;

      let intentScheme = '#Intent;scheme=rawbt;';
      if (targetPrinter) {
        intentScheme += 'S.s=' + encodeURIComponent(targetPrinter) + ';';
      }
      const intentPackage = 'package=ru.a402d.rawbtprinter;end;';
      const intentUrl = 'intent:base64,' + base64Content + intentScheme + intentPackage;

      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = intentUrl;
      document.body.appendChild(iframe);
      setTimeout(() => { document.body.removeChild(iframe); }, 1000);

      return true;
    }

    // RawBT mode but no ESC/POS content - fallback to browser print
    console.log('📱 RawBT mode but no ESC/POS content - falling back to browser print');
    return printHTMLContent(htmlContent, 'Daily Settlement');
  } catch (error) {
    console.error('❌ Settlement print error:', error);
    return false;
  }
}

/**
 * RawBT 프린터로 주방 티켓 전송 (단일 프린터 대상)
 */
async function sendToRawBTPrinter(orderData, storeInfo, settings, printerName, stationName, printerAddress) {
  const printPerItem = settings.kitchenPrinter.printPerItem || false;
  const items = orderData.items || [];
  console.log(`🖨️ sendToRawBTPrinter: ${items.length} items, printPerItem=${printPerItem}, station=${stationName}, mode=${getPrinterMode()}`);
  console.log(`🖨️ Item names:`, items.map(i => (i.menuItem?.name || i.name) + ' x' + i.quantity));

  // QZ Tray mode: send ESC/POS via network
  // printerAddress가 명시적으로 전달되면 우선 사용 (Station별 IP), 없으면 kitchenPrinter.address fallback
  if (shouldUseQZTray()) {
    const address = printerAddress || settings.kitchenPrinter.address;
    if (!address) return false;

    if (printPerItem && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const perItemData = { ...orderData, items: [item], groupLabel: stationName ? stationName.toUpperCase() : undefined };
        const escpos = generateKitchenTicketContent(perItemData, storeInfo);
        await sendViaQZTray(escpos, address);
        if (i < items.length - 1) await new Promise(r => setTimeout(r, 300));
      }
    } else {
      const ticketData = { ...orderData, groupLabel: stationName ? stationName.toUpperCase() : undefined };
      const escpos = generateKitchenTicketContent(ticketData, storeInfo);
      await sendViaQZTray(escpos, address);
    }
    return true;
  }

  if (printPerItem && items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const perItemData = { ...orderData, items: [item], groupLabel: stationName ? stationName.toUpperCase() : undefined };

      if (shouldUseBrowserPrint()) {
        const htmlContent = generateHTMLKitchenTicket(perItemData, storeInfo);
        printHTMLContent(htmlContent, `Kitchen - ${stationName || 'Ticket'} - ${item.name}`);
      } else {
        const escposContent = generateKitchenTicketContent(perItemData, storeInfo);
        const base64Content = btoa(unescape(encodeURIComponent(escposContent)));
        let intentScheme = '#Intent;scheme=rawbt;';
        if (printerName) intentScheme += 'S.s=' + encodeURIComponent(printerName) + ';';
        const intentUrl = 'intent:base64,' + base64Content + intentScheme + 'package=ru.a402d.rawbtprinter;end;';
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = intentUrl;
        document.body.appendChild(iframe);
        setTimeout(() => document.body.removeChild(iframe), 500);
      }
      if (i < items.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
    }
  } else {
    const ticketData = { ...orderData, groupLabel: stationName ? stationName.toUpperCase() : undefined };

    if (shouldUseBrowserPrint()) {
      const htmlContent = generateHTMLKitchenTicket(ticketData, storeInfo);
      printHTMLContent(htmlContent, `Kitchen - ${stationName || 'Ticket'}`);
    } else {
      const escposContent = generateKitchenTicketContent(ticketData, storeInfo);
      const base64Content = btoa(unescape(encodeURIComponent(escposContent)));
      let intentScheme = '#Intent;scheme=rawbt;';
      if (printerName) intentScheme += 'S.s=' + encodeURIComponent(printerName) + ';';
      const intentUrl = 'intent:base64,' + base64Content + intentScheme + 'package=ru.a402d.rawbtprinter;end;';
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = intentUrl;
      document.body.appendChild(iframe);
      setTimeout(() => document.body.removeChild(iframe), 500);
    }
  }
  return true;
}

/**
 * Station별 분리 인쇄
 * RawBT 모드: 모든 아이템을 하나의 티켓으로 합쳐서 전송 (RawBT는 연속 intent 처리 불가)
 * Browser 모드: Station별 분리 인쇄 (각 Station 별도 페이지)
 */
async function printKitchenTicketsByStation(orderData, storeInfo, settings) {
  const stationPrinters = settings.kitchenStationPrinters || {};
  const stationIds = Object.keys(stationPrinters);

  // Station이 1개면 매핑 없이 해당 프린터로 전체 전송
  if (stationIds.length === 1) {
    const sp = stationPrinters[stationIds[0]];
    const printerName = sp.name;
    const stationName = sp.stationName || 'Kitchen';

    console.log(`🍳 Single station — sending all to: ${printerName} (${stationName})`);
    return await sendToRawBTPrinter(orderData, storeInfo, settings, printerName, stationName, sp.address);
  }

  // QZ Tray 모드: Station별 각각 다른 프린터 IP로 전송 가능
  if (shouldUseQZTray()) {
    let menuStationMap = {};
    try {
      const saved = localStorage.getItem('kitchenStationMenuMap');
      if (saved) menuStationMap = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load kitchen station menu map:', e);
    }

    const stationItems = {};
    const unmappedItems = [];

    (orderData.items || []).forEach(item => {
      const itemName = item.menuItem?.name || item.name;
      const stationId = menuStationMap[itemName];
      if (stationId && stationPrinters[stationId]) {
        if (!stationItems[stationId]) stationItems[stationId] = [];
        stationItems[stationId].push(item);
      } else {
        unmappedItems.push(item);
      }
    });

    // 매핑이 없으면 첫 번째 Station 프린터로 전부 전송
    if (Object.keys(stationItems).length === 0 && unmappedItems.length > 0) {
      const sp = stationPrinters[stationIds[0]];
      console.log(`🍳 QZ Tray: No menu-station map — sending all to first station: ${sp.stationName}`);
      return await sendToRawBTPrinter(orderData, storeInfo, settings, sp.name, sp.stationName || 'Kitchen', sp.address);
    }

    // Station별 각각 전송
    const mappedStationIds = Object.keys(stationItems);
    for (let idx = 0; idx < mappedStationIds.length; idx++) {
      const stationId = mappedStationIds[idx];
      const sp = stationPrinters[stationId];
      const items = stationItems[stationId];
      const stationName = sp.stationName || `Station ${stationId}`;

      await sendToRawBTPrinter({ ...orderData, items }, storeInfo, settings, sp.name, stationName, sp.address);
    }

    // 매핑 안 된 아이템 → 첫 번째 Station 프린터로
    if (unmappedItems.length > 0) {
      const sp = stationPrinters[stationIds[0]];
      await sendToRawBTPrinter({ ...orderData, items: unmappedItems }, storeInfo, settings, sp.name, sp.stationName || 'Kitchen', sp.address);
    }

    return true;
  }

  // Station 2개 이상: RawBT 모드에서는 분리하지 않고 전체 합쳐서 한 장으로 출력
  // (RawBT는 연속 intent를 처리하지 못해서 첫 번째만 출력됨)
  if (!shouldUseBrowserPrint()) {
    const sp = stationPrinters[stationIds[0]];
    console.log(`🍳 RawBT mode with ${stationIds.length} stations — sending combined ticket`);
    return await sendToRawBTPrinter(orderData, storeInfo, settings, sp.name, null);
  }

  // Browser 모드: Station별 분리 인쇄 (각 Station 별도 페이지)
  let menuStationMap = {};
  try {
    const saved = localStorage.getItem('kitchenStationMenuMap');
    if (saved) menuStationMap = JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load kitchen station menu map:', e);
  }

  const stationItems = {};
  const unmappedItems = [];

  (orderData.items || []).forEach(item => {
    const itemName = item.menuItem?.name || item.name;
    const stationId = menuStationMap[itemName];
    if (stationId && stationPrinters[stationId]) {
      if (!stationItems[stationId]) stationItems[stationId] = [];
      stationItems[stationId].push(item);
    } else {
      unmappedItems.push(item);
    }
  });

  // 매핑이 없으면 첫 번째 Station 프린터로 전부 전송
  if (Object.keys(stationItems).length === 0 && unmappedItems.length > 0) {
    const sp = stationPrinters[stationIds[0]];
    console.log(`🍳 No menu-station map — sending all to first station: ${sp.name}`);
    return await sendToRawBTPrinter(orderData, storeInfo, settings, sp.name, sp.stationName || 'Kitchen');
  }

  // Browser 모드: Station별 인쇄 (printHTMLContent로 각각 출력)
  const mappedStationIds = Object.keys(stationItems);
  for (let idx = 0; idx < mappedStationIds.length; idx++) {
    const stationId = mappedStationIds[idx];
    const sp = stationPrinters[stationId];
    const items = stationItems[stationId];
    const stationName = sp.stationName || `Station ${stationId}`;

    await sendToRawBTPrinter({ ...orderData, items }, storeInfo, settings, sp.name, stationName);
  }

  // 매핑 안 된 아이템 → 첫 번째 Station 프린터로
  if (unmappedItems.length > 0) {
    const sp = stationPrinters[stationIds[0]];
    await sendToRawBTPrinter({ ...orderData, items: unmappedItems }, storeInfo, settings, sp.name, sp.stationName || 'Kitchen');
  }

  return true;
}

/**
 * Generate Station-specific Kitchen Ticket ESC/POS content
 * Same as generateKitchenTicketContent but with Station name header + ticket count
 */
function generateStationKitchenTicket(orderData, storeInfo, stationName, ticketIndex, totalTickets) {
  let content = '';

  content += CMD.INIT;

  // === STATION NAME (Large, Bold, Center) ===
  content += CMD.ALIGN_CENTER;
  content += CMD.TEXT_DOUBLE;
  content += CMD.BOLD_ON;
  content += '[ ' + stationName + ' ]' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  // === ORDER INFO ===
  content += CMD.ALIGN_LEFT;
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += formatLine('Order:', orderData.orderNumber) + CMD.LINE_FEED;

  const timeStr = orderData.date
    ? orderData.date.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true })
    : new Date().toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true });
  content += formatLine('Time:', timeStr) + CMD.LINE_FEED;

  // Table / Pager / Pickup
  if (orderData.tableNumber) {
    content += formatLine('Table:', orderData.tableNumber) + CMD.LINE_FEED;
  } else if (orderData.pagerNumber) {
    content += formatLine('Pager:', orderData.pagerNumber) + CMD.LINE_FEED;
  }

  const orderSource = orderData.orderSource === 'mobile' ? 'MOBILE ORDER' : 'POS';
  content += formatLine('Source:', orderSource) + CMD.LINE_FEED;

  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // === ITEMS ===
  content += CMD.BOLD_ON;
  content += CMD.TEXT_DOUBLE_HEIGHT;
  content += 'ORDER ITEMS:' + CMD.LINE_FEED;
  content += CMD.TEXT_NORMAL;
  content += CMD.BOLD_OFF;
  content += CMD.LINE_FEED;

  orderData.items.forEach(item => {
    const itemName = item.menuItem?.name || item.name;
    const qty = item.quantity;

    content += CMD.BOLD_ON;
    content += CMD.TEXT_DOUBLE;
    content += qty + ' x ' + itemName + CMD.LINE_FEED;
    content += CMD.TEXT_NORMAL;
    content += CMD.BOLD_OFF;

    // Options
    const options = item.options || [];
    options.forEach(opt => {
      if (!/^.+\sx\d+$/.test(opt)) {
        content += '  > ' + opt + CMD.LINE_FEED;
      }
    });

    // Special instructions
    const special = item.special_instructions || item.specialInstructions || '';
    if (special) {
      content += CMD.BOLD_ON;
      content += '  *** ' + special + ' ***' + CMD.LINE_FEED;
      content += CMD.BOLD_OFF;
    }

    content += CMD.LINE_FEED;
  });

  // === TICKET COUNT ===
  content += CMD.DASHED_LINE + CMD.LINE_FEED;
  content += CMD.ALIGN_CENTER;
  content += 'Ticket ' + ticketIndex + ' of ' + totalTickets + CMD.LINE_FEED;
  content += CMD.LINE_FEED;

  // Cut paper
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.LINE_FEED;
  content += CMD.CUT;

  return content;
}

// All functions are already exported individually above
