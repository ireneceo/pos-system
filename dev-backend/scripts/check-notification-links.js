#!/usr/bin/env node
/**
 * 알림 버튼 주소 대조 (2026-10-22 Fable 설계 notification-addressee §8 ②) — 게이트 밖, 수동.
 *  ① utils/notificationLinks.js 표의 모든 경로가 dev-frontend/src/App.tsx 의 <Route path> 에 있는가
 *  ② 알림 발송 파일에 «없는 화면» 옛 주소가 남아 있지 않은가
 * 종료코드 0 = 통과, 1 = 실패.
 */
const fs = require('fs');
const path = require('path');
const { allPatterns } = require('../utils/notificationLinks');

const app = fs.readFileSync(path.join(__dirname, '../../dev-frontend/src/App.tsx'), 'utf8');
const norm = (p) => p.replace(/:\w+/g, ':x');
const routes = new Set([...app.matchAll(/path="([^"]+)"/g)].map(m => norm(m[1])));
let fail = 0;
for (const p of allPatterns()) {
  if (!routes.has(norm(p))) { console.log(`✗ 표 경로가 App.tsx 에 없음: ${p}`); fail++; }
}
console.log(`① 표 경로 ${allPatterns().length}개 대조 — 없는 것 ${fail}건`);

// 옛 «없는 화면» 주소 — 알림 발송 파일에서 0건이어야 한다
const DEAD = ['/pos/seller-orders', '/pos/invoices`', "/pos/invoices'", '/pos/notices', '/pos/supply/contracts',
  '/supplier/contracts', '/pos/seller/orders', '/pos/brand/general/invoices', '/pos/foodcourt/general/invoices',
  '/pos/purchase-invoices', '/pos/restaurant/invoices', '/pos/reservations'];
const FILES = ['services/poNotifications.js', 'routes/seller-orders.js', 'utils/notificationTemplates.js',
  'services/invoiceScheduler.js', 'services/invoiceOverdueScheduler.js', 'routes/invoices-payment.js',
  'services/soaScheduler.js', 'routes/brand-soa.js', 'routes/foodcourt-soa.js', 'routes/supplier.js',
  'routes/supplier-directory.js', 'routes/notices.js', 'routes/comments.js', 'routes/support-tickets.js',
  'routes/operationTickets.js', 'services/subscriptionScheduler.js', 'services/reservationNotificationService.js',
  'services/orderNotificationService.js'];
let dead = 0;
for (const f of FILES) {
  const lines = fs.readFileSync(path.join(__dirname, '..', f), 'utf8').split('\n');
  lines.forEach((ln, i) => {
    if (/^\s*(\/\/|\*)/.test(ln)) return;
    for (const d of DEAD) if (ln.includes(d)) { console.log(`✗ 없는 화면 주소: ${f}:${i + 1} ${d}`); dead++; }
  });
}
console.log(`② 발송 파일 ${FILES.length}개 — 옛 없는 주소 ${dead}건`);
process.exit(fail + dead ? 1 : 0);
