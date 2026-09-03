// Headless sweep for non-RA/BG roles: Admin / FG / Owner / Supplier / Manager.
// Captures pageerrors + ErrorBoundary fallback + non-noise console errors.
const { chromium } = require('playwright');
const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';

const ROLES = {
  admin: {
    token: process.env.ADMIN_TOKEN,
    role: 'System Admin',
    routes: [
      '/pos/admin/dashboard',
      '/pos/admin/staff', '/pos/admin/managers', '/pos/admin/restaurants',
      '/pos/admin/supplier-companies', '/pos/admin/supplier-invitations',
      '/pos/admin/plans', '/pos/admin/subscriptions',
      '/pos/admin/invoices', '/pos/admin/payment-settings',
      '/pos/admin/notices', '/pos/admin/work-manuals', '/pos/admin/support',
      '/pos/admin/contact-inquiries', '/pos/admin/hardware-quotes',
      '/pos/admin/content', '/pos/admin/site-settings',
      '/pos/admin/notification-settings', '/pos/admin/referrals',
      '/pos/admin/carriers', '/pos/admin/carrier-webhooks',
      '/pos/admin/scheduler-monitor', '/pos/admin/logs',
      '/pos/admin/history', '/pos/admin/settings', '/pos/admin/report',
    ],
  },
  fg: {
    token: process.env.FG_TOKEN,
    role: 'Foodcourt General',
    routes: [
      '/pos/foodcourt/general/dashboard',
      '/pos/foodcourt/general/incoming-orders',
      '/pos/foodcourt/general/products', '/pos/foodcourt/general/inventory',
      '/pos/foodcourt/branches', '/pos/foodcourt/tenancy', '/pos/foodcourt/tenancy-map',
      '/pos/foodcourt/floor-plan',
      '/pos/foodcourt/invoices', '/pos/foodcourt/trade-invoices',
      '/pos/foodcourt/payment-settings', '/pos/foodcourt/plans',
      '/pos/foodcourt/general/subscriptions',
      '/pos/foodcourt/general/reports?tab=sales',
      '/pos/foodcourt/general/reports?tab=details',
      '/pos/foodcourt/general/reports?tab=menu',
      '/pos/foodcourt/general/reports?tab=customers',
      '/pos/foodcourt/general/reports?tab=ranking',
      '/pos/foodcourt/general/reports?tab=operations',
      '/pos/foodcourt/general/notices', '/pos/foodcourt/general/work-manuals',
      '/pos/foodcourt/general/system-inquiry', '/pos/foodcourt/general/operation-inquiry',
      '/pos/foodcourt/manager', '/pos/foodcourt/company-info', '/pos/foodcourt/history',
    ],
  },
  owner: {
    token: process.env.OWNER_TOKEN,
    role: 'Restaurant Owner',
    routes: [
      '/pos/owner/dashboard',
      '/pos/owner/restaurants', '/pos/owner/performance',
      '/pos/owner/invoices',
      '/pos/owner/reports?tab=sales', '/pos/owner/reports?tab=details',
      '/pos/owner/reports?tab=menu', '/pos/owner/reports?tab=customers',
      '/pos/owner/reports?tab=ranking', '/pos/owner/reports?tab=operations',
      '/pos/owner/notices', '/pos/owner/work-manuals',
      '/pos/owner/system-inquiry', '/pos/owner/operation-inquiry',
      '/pos/owner/history',
    ],
  },
  supplier: {
    token: process.env.SUPPLIER_TOKEN,
    role: 'Supplier Admin',
    routes: [
      '/pos/supplier/dashboard',
      '/pos/supplier/products', '/pos/supplier/inventory',
      '/pos/supplier/orders', '/pos/supplier/customers',
      '/pos/supplier/contracts', '/pos/supplier/invoices', '/pos/supplier/trade-invoices',
      '/pos/supplier/payment-settings', '/pos/supplier/invoice-settings',
      '/pos/supplier/staff', '/pos/supplier/company-info',
      '/pos/supplier/notices', '/pos/supplier/system-inquiry',
    ],
  },
  fcm: {
    token: process.env.FCM_TOKEN,
    role: 'Foodcourt Manager',
    routes: [
      '/pos/foodcourt/general/dashboard',
      '/pos/foodcourt/general/incoming-orders',
      '/pos/foodcourt/general/products',
      '/pos/foodcourt/floor-plan',
      '/pos/foodcourt/general/notices',
      '/pos/foodcourt/general/system-inquiry',
    ],
  },
  bm: {
    token: process.env.BM_TOKEN,
    role: 'Brand Manager',
    routes: [
      '/pos/brand/general/dashboard',
      '/pos/brand/general/restaurants',
      '/pos/brand/general/brand-products',
      '/pos/brand/general/brand-menus',
      '/pos/brand/general/notices',
      '/pos/brand/general/system-inquiry',
    ],
  },
  // /pos/manager/* — Foodcourt/Brand General·Manager 4역할 공용 화면. 2026-07-11 이전 어떤
  // sweep 에도 없어(커버리지 갭) ManagerDashboard 의 Math.random 가짜 매출이 오래 살아남았다.
  // BG 토큰으로 진입(ProtectedRoute requiredRole 에 Brand General 포함).
  manager: {
    token: process.env.BG_TOKEN,
    role: 'Brand General',
    routes: [
      '/pos/manager/dashboard',
      '/pos/manager/sales',
      '/pos/manager/reports',
      '/pos/manager/subscriptions',
      '/pos/manager/restaurants',
      '/pos/manager/admins',
      '/pos/manager/invoices',
      '/pos/manager/coupons',
      '/pos/manager/plans',
      '/pos/manager/support',
      '/pos/manager/operation-inquiry',
      '/pos/manager/notification-settings',
    ],
  },
};

const ERR_MARKERS = [
  'Something went wrong',
  '문제가 발생했습니다',
  '出错了',
  'Sesuatu telah berlaku',
];

async function visit(context, route) {
  const page = await context.newPage();
  const errors = [];
  const consoleErrs = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (t.includes('Failed to load resource') && (t.includes('/uploads/') || t.includes('.png') || t.includes('.jpg'))) return;
    if (t.includes('WebSocket connection') && t.includes('closed before')) return;
    if (t.includes('Download the React DevTools')) return;
    consoleErrs.push(t);
  });
  let status = '';
  let fallback = false;
  try {
    await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(2500);
    const body = await page.evaluate(() => document.body?.innerText?.slice(0, 5000) || '');
    fallback = ERR_MARKERS.some(m => body.includes(m));
    // 직원 아이디의 내부 네임스페이스가 화면에 새면 안 된다.
    // 운영 신고 SUPP-2026-4317-944: "리플래시하면 다시 r16.server1 로 아이디표시되는 거 여전해."
    // 표시는 displayStaffName/stripStaffNs 가 벗겨야 하며, 어느 화면에서든 `r<숫자>.` 이
    // 보이면 그 경로가 유틸을 안 타는 것이다.
    const nsLeak = /\br\d+\.[A-Za-z0-9_]/.exec(body);
    status = fallback ? 'ERROR_BOUNDARY' : (nsLeak ? `STAFF_NS_LEAK(${nsLeak[0]})` : 'OK');
  } catch (e) {
    status = 'NAV_FAIL';
  }
  await page.close();
  return { route, status, pageerrors: errors, consoleErrs, fallback };
}

async function runRole(label, cfg) {
  if (!cfg.token) { console.log(`(no token for ${label}, skip)`); return []; }
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    storageState: { cookies: [], origins: [{ origin: BASE, localStorage: [{ name: 'auth_token', value: cfg.token }, { name: 'currentUserRole', value: cfg.role }] }] },
  });
  console.log(`\n=== ${label} (${cfg.role}, ${cfg.routes.length} routes) ===`);
  const out = [];
  for (const r of cfg.routes) {
    let v = await visit(context, r);
    // 2026-07-10: 전이적 flake(배포 빌드 직후 blip) 흡수 — 실패 시 1회 재검. 진짜 크래시는 재검도 실패 → 여전히 차단.
    if (v.status !== 'OK' || v.pageerrors.length > 0) {
      await new Promise((res) => setTimeout(res, 1500));
      const retry = await visit(context, r);
      if (retry.status === 'OK' && retry.pageerrors.length === 0) console.log(`  ↻ [${label}] ${r} 재검 통과(전이적 flake 흡수)`);
      v = retry;
    }
    const flag = v.status === 'OK' && v.pageerrors.length === 0 ? '✓' : '✗';
    console.log(`${flag} [${label}] ${r} → ${v.status}` +
      (v.pageerrors.length ? ` | ${v.pageerrors.length} pageerror` : '') +
      (v.consoleErrs.length ? ` | ${v.consoleErrs.length} console err` : ''));
    v.pageerrors.slice(0, 2).forEach(e => console.log('    ⚠ ' + e.slice(0, 250)));
    out.push({ ...v, label });
  }
  await browser.close();
  return out;
}

(async () => {
  const all = [];
  const skipped = [];
  for (const [k, cfg] of Object.entries(ROLES)) {
    if (!cfg.token) skipped.push(k);
    all.push(...await runRole(k, cfg));
  }
  const failed = all.filter(r => r.status !== 'OK' || r.pageerrors.length > 0);
  console.log(`\n=== Summary: ${all.length - failed.length}/${all.length} OK · ${failed.length} failed ===`);
  failed.forEach(r => console.log(`  [${r.label}] ${r.route} → ${r.status}`));

  // 🚨 거짓 통과 방지 (2026-08-20) — 토큰이 없으면 역할을 조용히 건너뛰고 `0/0 OK` 로
  // **성공 종료**하던 구조였다. 실측 사고: 이 스크립트가 전 역할을 skip 한 채 초록불을 냈고,
  // 그대로 "mount 검증 통과"로 보고될 뻔했다. 검사기가 아무것도 검사하지 않았으면
  // 그건 통과가 아니라 고장이다 — fail-closed 로 닫는다.
  // (같은 클래스: check-route-guard `--summary` fail-open 사고 → 이 프로젝트의 확정 규칙)
  if (all.length === 0) {
    console.error('\n✗ 검사한 페이지가 0건입니다 — 토큰 미주입으로 전 역할이 skip 됐을 수 있습니다.');
    console.error('  필요한 env: ' + Object.keys(ROLES).map(k => k.toUpperCase() + '_TOKEN').join(', '));
    process.exit(1);
  }
  if (skipped.length) {
    console.error(`\n✗ 토큰이 없어 건너뛴 역할 ${skipped.length}개: ${skipped.join(', ')}`);
    console.error('  일부만 검사하고 통과로 보고하지 않기 위해 실패로 처리합니다.');
    console.error('  의도적으로 일부만 돌리려면 SWEEP_ALLOW_PARTIAL=1 을 설정하세요(그 사실이 로그에 남습니다).');
    if (!process.env.SWEEP_ALLOW_PARTIAL) process.exit(1);
    console.error('  → SWEEP_ALLOW_PARTIAL=1 로 부분 실행을 허용했습니다.');
  }

  process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
