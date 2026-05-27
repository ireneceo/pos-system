#!/usr/bin/env node
/**
 * Visual verification of all print HTML — render with FULL realistic data
 * (logo, membership QR, custom QR, coupon, discount policy, point discount,
 * service charge, tax, set menu, options) so we can SEE every element renders
 * before shipping. Output PNG.
 */
const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const OUT = '/tmp/print-design';
fs.mkdirSync(OUT, { recursive: true });

const orderData = {
  orderNumber: 'TEST-001',
  pickupNumber: '001',
  date: new Date(),
  tableNumber: 'A-7',
  orderType: 'dine-in',
  cashierName: 'Test Cashier',
  items: [
    { menuItem: { name: '치즈라면 l Cheese Ramyun', emoji: '🍜', price: 18 }, quantity: 2, options: [{ name: '맵게 추가', price: 1 }] },
    { menuItem: { name: '블루베리 크로플 l Blueberry Croffle', emoji: '🥐', price: 21 }, quantity: 1, options: [] },
    { menuItem: { name: '세트 메뉴 (Set Menu)', is_set_menu: true, set_items: [{ name: '치즈라면' }, { name: '아메리카노' }], price: 35 }, quantity: 1, options: [] }
  ],
  subtotal: 92,
  takeawayCharge: 0,
  discount: 5,
  discountPolicy: { name: '단골 할인', amount: 3 },
  coupon: { code: 'WELCOME10', discount: 10 },
  pointDiscount: 4,
  pointsUsed: 400,
  tax: 4.5,
  taxRate: 6,
  serviceCharge: 7.5,
  serviceChargeRate: 10,
  total: 82,
  paymentMethod: 'card'
};

const memberQr = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjMDAwIi8+PHRleHQgeD0iNDgiIHk9IjUyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIj5NRU0gUVI8L3RleHQ+PC9zdmc+';
const customQr = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiI+PHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjMDAwIi8+PHRleHQgeD0iNDgiIHk9IjUyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIiBmb250LXNpemU9IjEyIj5DVVNUIFFSPC90ZXh0Pjwvc3ZnPg==';

const storeInfo = {
  name: 'The Fire Korean Restaurant',
  address: '123 Test St, KL',
  phone: '+60-12-3456789',
  currency: 'MYR',
  timeZone: 'Asia/Kuala_Lumpur',
  taxRate: 6,
  serviceChargeRate: 10,
  receiptLogo: 'https://purplehere.com/uploads/products/1779635208125_5fb4d1276289f7d1.svg',
  footerMessage: 'Thank you for dining with us!',
  showMembership: true,
  membershipQrDataUrl: memberQr,
  customQrImage: customQr,
  customQrText: 'Follow @TheFire',
  customQrPosition: 'back'
};

async function snap(name, html) {
  fs.writeFileSync(path.join(OUT, `${name}.html`), html);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 302, height: 2000 } });
  await page.setContent(html, { waitUntil: 'networkidle' });
  const h = await page.evaluate(() => Math.ceil(document.body.scrollHeight));
  await page.setViewportSize({ width: 302, height: Math.min(h + 20, 4000) });
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
  await browser.close();
  console.log(`  ✓ ${name}.png (${h}px height)`);
}

(async () => {
  const billPrint = require('/var/www/dev-frontend/src/utils/billPrint');
  console.log('=== Print design check — FULL sample ===');
  console.log(`Output: ${OUT}/`);
  await snap('bill-full', billPrint.generateHTMLBill(orderData, storeInfo));
})().catch(e => { console.error('FAIL:', e.message); process.exit(1); });
