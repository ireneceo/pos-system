// Headless mount test: visits each RA + BG sidebar destination, captures
// console errors and pageerror events. Detects ErrorBoundary fallback by
// scanning for known fallback strings.
//
// Usage: RA_TOKEN=... BG_TOKEN=... RA_RID=8 BG_BRANDID=1 \
//        node scripts/headless-page-sweep.js
const { chromium } = require('playwright');

const BASE = process.env.BASE_URL || 'https://dev.purplehere.com';
const RA_TOKEN = process.env.RA_TOKEN;
const BG_TOKEN = process.env.BG_TOKEN;
const RA_RID = process.env.RA_RID || '5';
const BG_BRANDID = process.env.BG_BRANDID || '1';

// Routes that load real components (skip pure redirects / external).
// Source of truth: MainLayout.tsx restaurantCategories + brandCategories.
const RA_ROUTES = [
  `/restaurant/${RA_RID}/dashboard`,
  `/restaurant/${RA_RID}/live-orders`,
  `/restaurant/${RA_RID}/reservations`,
  `/restaurant/${RA_RID}/pos-terminal`,
  `/restaurant/${RA_RID}/floor-plan`,
  `/restaurant/${RA_RID}/floor-plan?view=items`,
  `/restaurant/${RA_RID}/floor-plan?view=takeaway`,
  `/restaurant/${RA_RID}/kitchen`,
  `/restaurant/${RA_RID}/display`,
  `/restaurant/${RA_RID}/menu`,
  `/restaurant/${RA_RID}/categories`,
  `/restaurant/${RA_RID}/options`,
  `/restaurant/${RA_RID}/recipe-management`,
  `/restaurant/${RA_RID}/recipe-management?tab=categories`,
  `/restaurant/${RA_RID}/recipe-management?tab=recipe-categories`,
  `/restaurant/${RA_RID}/recipe-management?tab=ingredient-categories`,
  `/restaurant/${RA_RID}/recipe-management?tab=stock-categories`,
  `/restaurant/${RA_RID}/recipe-management?tab=ingredients`,
  `/restaurant/${RA_RID}/brand-menu-updates`,
  `/restaurant/${RA_RID}/invoices`,
  `/pos/purchase-orders`,
  `/pos/purchase-orders/history`,
  `/restaurant/${RA_RID}/ingredients`,
  `/restaurant/${RA_RID}/inventory`,
  `/pos/suppliers`,
  `/restaurant/${RA_RID}/reports?tab=sales`,
  `/restaurant/${RA_RID}/reports?tab=details`,
  `/restaurant/${RA_RID}/reports?tab=payment`,
  `/restaurant/${RA_RID}/reports?tab=menu`,
  `/restaurant/${RA_RID}/reports?tab=customers`,
  `/restaurant/${RA_RID}/reports?tab=operations`,
  `/restaurant/${RA_RID}/staff`,
  `/restaurant/${RA_RID}/customers`,
  `/restaurant/${RA_RID}/coupons`,
  `/restaurant/${RA_RID}/notices`,
  `/restaurant/${RA_RID}/work-manuals`,
  `/restaurant/${RA_RID}/support`,
  `/restaurant/${RA_RID}/operation-inquiry`,
  `/restaurant/${RA_RID}/profile`,
  `/restaurant/${RA_RID}/company-information`,
  `/restaurant/${RA_RID}/settings?tab=store`,
  `/restaurant/${RA_RID}/settings?tab=payment`,
  `/restaurant/${RA_RID}/settings?tab=printer`,
  `/restaurant/${RA_RID}/settings?tab=kitchenStations`,
  `/restaurant/${RA_RID}/settings?tab=mobileOrder`,
  `/restaurant/${RA_RID}/settings?tab=reservation`,
  `/restaurant/${RA_RID}/settings?tab=membership`,
  `/restaurant/${RA_RID}/notification-settings`,
  `/restaurant/${RA_RID}/history`,
];

// 2026-06-15: 실제 App.tsx 라우트로 교정 + 빈-렌더 감지 추가. 기존 목록의 다수 경로가
// router 에 없어(예: /pos/brand/general/restaurants) 빈 렌더를 "OK"로 오판하던 false positive 제거.
const BG_ROUTES = [
  '/pos/brand/general/dashboard',
  '/pos/admin/restaurants',
  '/pos/admin/staff',
  '/pos/admin/managers',
  '/pos/brand/franchise',
  '/pos/brand-products',
  '/pos/brand-product-recipes',
  '/pos/brand-menus',                 // 브랜드메뉴 (적용범위 Scope 포함)
  '/pos/brand-menus?tab=categories',  // Categories 탭
  '/pos/brand-menus?tab=options',     // Option groups 탭
  '/pos/brand/invoices',
  '/pos/brand/trade-invoices',
  '/pos/brand/plans',
  '/pos/brand/general/subscriptions',
  '/pos/brand/general/reports',
  '/pos/brand/general/notices',
  '/pos/brand/general/work-manuals',
  '/pos/brand/general/system-inquiry',
  '/pos/brand/general/operation-inquiry',
  '/pos/profile',
  '/pos/admin/notification-settings',
];

// Strings that indicate the ErrorBoundary fallback rendered.
// Must be specific to the fallback UI — generic words like "Reload" appear in
// normal pages too and produce false positives.
const ERROR_BOUNDARY_MARKERS = [
  'Something went wrong',
  '문제가 발생했습니다',
  '出错了',
  'Sesuatu telah berlaku',
];

async function visitRoute(context, route, label) {
  const page = await context.newPage();
  const errors = [];
  const consoleErrors = [];

  page.on('pageerror', (err) => { errors.push(err.message); });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Ignore some noise that doesn't break the page
      if (text.includes('Failed to load resource') && (text.includes('/uploads/') || text.includes('.png') || text.includes('.jpg'))) return;
      if (text.includes('WebSocket connection') && text.includes('closed before')) return;
      if (text.includes('Download the React DevTools')) return;
      consoleErrors.push(text);
    }
  });

  let url = BASE + route;
  let fallbackDetected = false;
  let status = '';
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    // Settle async data loads
    await page.waitForTimeout(2500);
    const bodyText = await page.evaluate(() => document.body?.innerText?.slice(0, 5000) || '');
    // 2026-06-15: 빈 렌더 감지 — React 가 #root 에 아무것도 안 그리면(잘못된 라우트/무음 mount 실패)
    // 예전엔 bodyText 가 비어 ERROR_BOUNDARY 마커도 없어서 "OK" 로 오판했다(false positive).
    const rootKids = await page.evaluate(() => document.getElementById('root')?.children?.length || 0);
    fallbackDetected = ERROR_BOUNDARY_MARKERS.some(m => bodyText.includes(m));
    if (fallbackDetected) status = 'ERROR_BOUNDARY';
    else if (rootKids === 0 || bodyText.trim().length === 0) status = 'EMPTY_RENDER';
    else status = 'OK';
  } catch (e) {
    status = 'TIMEOUT/NAV_FAIL: ' + e.message.slice(0, 80);
  }

  await page.close();
  return { route, label, status, pageerrors: errors, consoleErrors, fallbackDetected };
}

async function runFor(label, token, routes) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    // 2026-06-05: PWA Service Worker 가 헤드리스 네비게이션을 가로채 /pos(로그인)로
    // 리다이렉트시켜 실제 인증 페이지가 mount 안 되던 문제 → SW 차단으로 토큰 인증이
    // 실제로 적용된다(이전엔 로그인 페이지를 "OK"로 오판할 수 있었음).
    serviceWorkers: 'block',
    storageState: {
      cookies: [],
      origins: [
        {
          origin: BASE,
          localStorage: [
            { name: 'auth_token', value: token },
            { name: 'currentUserRole', value: label === 'RA' ? 'Restaurant Admin' : 'Brand General' },
          ],
        },
      ],
    },
  });

  const results = [];
  for (const route of routes) {
    const r = await visitRoute(context, route, label);
    const flag = r.status === 'OK' && r.pageerrors.length === 0 ? '✓' : '✗';
    console.log(`${flag} [${label}] ${route} → ${r.status}` + (r.pageerrors.length ? ` | ${r.pageerrors.length} pageerror(s)` : '') + (r.consoleErrors.length ? ` | ${r.consoleErrors.length} console err` : ''));
    if (r.pageerrors.length) r.pageerrors.slice(0, 2).forEach(e => console.log('    ⚠ ' + e.slice(0, 200)));
    if (r.fallbackDetected) console.log('    ⚠ ErrorBoundary fallback rendered');
    results.push(r);
  }

  await browser.close();
  return results;
}

(async () => {
  const all = [];
  if (RA_TOKEN) {
    console.log(`\n=== RA sweep (${RA_ROUTES.length} routes) ===`);
    all.push(...await runFor('RA', RA_TOKEN, RA_ROUTES));
  }
  if (BG_TOKEN) {
    console.log(`\n=== BG sweep (${BG_ROUTES.length} routes) ===`);
    all.push(...await runFor('BG', BG_TOKEN, BG_ROUTES));
  }

  const failed = all.filter(r => r.status !== 'OK' || r.pageerrors.length > 0);
  console.log(`\n=== Summary: ${all.length - failed.length}/${all.length} OK · ${failed.length} failed ===`);
  if (failed.length) {
    console.log('\nFailing routes:');
    failed.forEach(r => {
      console.log(`  [${r.label}] ${r.route} → ${r.status}`);
      r.pageerrors.slice(0, 1).forEach(e => console.log('    ⚠ ' + e.slice(0, 200)));
    });
  }
  process.exit(failed.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
