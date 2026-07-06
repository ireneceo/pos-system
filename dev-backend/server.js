// ============================================
// PM2 필수 체크 - PM2 없이 실행 시 즉시 종료
// 이 파일은 반드시 PM2를 통해서만 실행되어야 합니다.
// 직접 실행 방지로 포트 충돌 문제를 영구적으로 해결합니다.
// ============================================
if (process.env.pm_id === undefined) {
  console.error('✗ ERROR: This server must be run through PM2!');
  console.error('✗ Direct execution is not allowed to prevent port conflicts.');
  console.error('');
  console.error('📌 Correct usage:');
  console.error('   pm2 start ecosystem.config.js --only dev-backend');
  console.error('   pm2 restart dev-backend');
  console.error('');
  console.error('🚫 Exiting immediately...');
  process.exit(1);
}

// ============================================
// ROOT 실행 방지 - root로 실행 시 즉시 종료
// 개발서버는 irene 유저로만 실행되어야 합니다.
// root로 실행하면 PM2(irene)와 포트 충돌이 발생합니다.
// ============================================
if (process.getuid && process.getuid() === 0) {
  console.error('✗ ERROR: Do NOT run this server as root!');
  console.error('✗ Running as root causes port conflicts with PM2 (irene user).');
  console.error('');
  console.error('📌 Correct usage:');
  console.error('   pm2 start ecosystem.config.js --only dev-backend');
  console.error('   (PM2 runs as irene user)');
  console.error('');
  console.error('🚫 Exiting immediately...');
  process.exit(1);
}

// ============================================
// 실행 사용자 제한 - 허용된 OS 사용자만 실행 가능 (2026-06-01)
// 사고: lua 사용자(POS read-only 범위)가 자기 PM2 로 dev-backend 를 띄워 3001
// 포트를 선점 → irene 의 코드 변경이 반영 안 되고, lua 의 옛 코드가 운영처럼
// 동작. lua 는 랜딩/콘텐츠 전용이므로 dev-backend 를 실행할 이유가 없음.
// PM2 가드(pm_id)는 lua 가 자기 PM2 를 쓰면 통과하므로, 사용자명으로 직접 차단.
// 운영/CI 등 다른 환경은 ALLOW_BACKEND_USER 환경변수로 명시 허용.
// ============================================
try {
  const os = require('os');
  const runUser = (os.userInfo().username || '').toLowerCase();
  // 허용: irene(개발) + 운영 배포 사용자. 필요 시 ALLOW_BACKEND_USER 로 확장.
  const allowedUsers = ['irene', 'root-disabled-above'];
  const extra = (process.env.ALLOW_BACKEND_USER || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  const allowList = allowedUsers.concat(extra);
  if (runUser && !allowList.includes(runUser)) {
    console.error(`✗ ERROR: User "${runUser}" is not allowed to run dev-backend.`);
    console.error('✗ This backend must run as the development user (irene), not POS-read-only users (e.g. lua).');
    console.error('✗ Running as another user causes port 3001 conflicts and serves stale code.');
    console.error('📌 If this is an intended host/user, set ALLOW_BACKEND_USER=<username> in the environment.');
    console.error('🚫 Exiting immediately...');
    process.exit(1);
  }
} catch (e) {
  // os.userInfo 실패(드문 컨테이너 환경)면 가드 통과 — 다른 가드(root/pm2)가 1차 방어.
  console.warn('[startup] user-guard skipped:', e && e.message);
}

// 환경 설정 자동 로드 (가장 먼저 실행)
const loadEnvironmentConfig = require('./config/env-loader');
loadEnvironmentConfig();

// Sentry 미사용 결정 (2026-05-03) — PM2 logrotate + utils/logger.js 로 대체.
// 코드 잔존 시 SDK 가 require-in-the-middle 패치를 모든 라우트에 적용하므로 init 자체를 제거.

const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
app.set('trust proxy', 1); // Cloudflare/Nginx 프록시 신뢰 (Rate Limiter 정확한 IP 감지)
const server = http.createServer(app);
const { syncDatabase } = require('./db');
const invoiceScheduler = require('./services/invoiceScheduler');
const subscriptionScheduler = require('./services/subscriptionScheduler');
const demoResetScheduler = require('./services/demoResetScheduler');
const dailyStatsScheduler = require('./services/dailyStatsScheduler');
const mallSalesScheduler = require('./services/mallSalesScheduler');
const invoiceOverdueScheduler = require('./services/invoiceOverdueScheduler');
const reservationScheduler = require('./services/reservationScheduler');
const base64ImageSweep = require('./services/base64ImageSweep');
const { startSoaCron } = require('./services/soaScheduler');
const { errorHandler } = require('./middleware/errorHandler');
const { initSocketServer, getSocketAuthStats } = require('./services/socketService');

// PID 파일 관리 - PM2 사용 시 비활성화 (PM2가 프로세스 관리)
// PM2 환경에서는 PID 파일 관리가 불필요하고 권한 문제를 일으킬 수 있음
const isPM2 = process.env.pm_id !== undefined;
const PID_FILE = path.join(__dirname, '.server.pid');

if (!isPM2) {
  // PM2가 아닌 경우에만 PID 파일 관리
  const CURRENT_PID = process.pid;
  try {
    if (fs.existsSync(PID_FILE)) {
      const oldPid = parseInt(fs.readFileSync(PID_FILE, 'utf8'));
      try {
        process.kill(oldPid, 0);
        console.log(`Found existing process ${oldPid}, signaling shutdown...`);
        process.kill(oldPid, 'SIGTERM');
        setTimeout(() => {}, 1000);
      } catch (e) {
        // 프로세스가 이미 죽었으면 무시
      }
    }
    fs.writeFileSync(PID_FILE, CURRENT_PID.toString());
  } catch (error) {
    // 권한 문제 시 무시 (PM2가 관리하므로)
    if (error.code !== 'EACCES') {
      console.error('PID file management error:', error.message);
    }
  }

  process.on('exit', () => {
    try {
      if (fs.existsSync(PID_FILE)) {
        const savedPid = parseInt(fs.readFileSync(PID_FILE, 'utf8'));
        if (savedPid === CURRENT_PID) {
          fs.unlinkSync(PID_FILE);
        }
      }
    } catch (e) {}
  });
}

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  server.close(() => {
    process.exit(0);
  });
});

// 프로세스 크래시 가드 (2026-06-20 감사) — 미처리 Promise 거부는 Node 15+ 에서 기본 워커 종료.
// 요청 단위 거부로 매장 전체 백엔드가 죽으면 영업 마비 → 로깅만 하고 살린다(가용성 우선).
process.on('unhandledRejection', (reason) => {
  console.error('[FATAL] Unhandled Promise Rejection:', reason);
});
// uncaughtException 은 프로세스 상태가 불확실 → 로깅 후 graceful 종료(PM2 가 재시작).
process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught Exception:', err);
  try { server.close(() => process.exit(1)); } catch { process.exit(1); }
  setTimeout(() => process.exit(1), 5000).unref();
});

// ============================================
// 보안 미들웨어 설정
// ============================================
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { securityHeaders, sqlInjectionProtection } = require('./middleware/security');

// Helmet - HTTP 헤더 보안 (CSP는 프론트엔드에서 관리하므로 비활성화)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// 추가 보안 헤더 (XSS, Clickjacking, Referrer, Permissions-Policy, Cache-Control)
app.use(securityHeaders);

// SQL Injection 패턴 감지 (Sequelize ORM 위에 추가 방어층)
app.use(sqlInjectionProtection);

// Rate Limiting - API 요청 제한 (IP당 15분에 1000회)
// 2026-06-25 (Irene "429 로그인오류"): rate limit 은 IP당인데 매장 전 기기(POS1/2·KDS·손님폰)가
// 한 공인 IP(NAT)를 공유한다. 폴러(5초마다 × 여러 기기)+모바일주문+설정로드가 한 IP로 합산돼
// 1000/15min 을 넘겨 site-settings 등이 429 로 막혔다. 다기기 매장 현실에 맞게 상향(여전히 유한 →
// DoS 방어 유지). 인증된 요청은 더 관대해도 안전하지만 우선 한도만 올림.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  message: { success: false, error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);

// 로그인 엔드포인트 더 엄격한 제한 (IP당 15분에 20회)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many login attempts, please try again later.' }
});
app.use('/api/auth/login', authLimiter);

// Anonymous mobile order endpoint — IP당 15분에 60회 (한 매장에서 손님들이 동시 주문해도 60건이면 충분).
// 익명 endpoint 이므로 brute-force / coupon validation 남용 / DoS 방어.
const mobileOrderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  message: { success: false, error: 'Too many orders, please try again later.' }
});
app.use('/api/mobile/order', mobileOrderLimiter);

// Staff PIN verification — a 4-digit PIN is far weaker than a password (10k combos),
// and /staff/verify-pin is unauthenticated + accepts restaurant_id in the body. The
// general apiLimiter (1000/15min) is far too loose to stop PIN brute-force, so throttle
// this endpoint hard (per IP). Required before exposing PIN as a primary login (P1-4).
// 2026-06-25 (Irene "429"): 15/15min 은 IP당이라 매장(NAT, 여러 직원 PIN 전환 + 재시도)에서 금방
// 초과돼 로그인이 막혔다. 50/15min 으로 — 정상 매장 사용엔 충분, 4자리 PIN brute-force(10k조합)는
// 여전히 비실용적으로 느림(≈42시간) + 매장이 즉시 알아챔. 보안/사용성 균형.
const pinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, error: { message: 'Too many PIN attempts, please try again later.', code: 'PIN_RATE_LIMITED' } }
});
app.use('/api/staff/verify-pin', pinLimiter);

// Payment Gateway Webhooks (v3.24+) — Stripe + PayPal 통합 라우터, signature + dedupe + 8 종 처리
// MUST be before express.json() for raw body signature verification
app.use('/api/webhooks', require('./routes/webhooks-payments'));


// Sprint 7: Carrier Webhook - MUST be before express.json() for HMAC raw body verification
app.use('/api/carrier-webhooks/:carrier_code',
  express.raw({ type: 'application/json', limit: '256kb' }));

// Express 미들웨어 설정
// Increase payload size limit to support base64 image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS 설정 - 환경별 허용 도메인
const allowedOrigins = [
  'https://pos.orderhere.center',
  'https://solution.orderhere.center',
  'https://dev.purplehere.com',
  'https://purplehere.com',
  'http://localhost:3001',
  'http://localhost:3000'
];

// FRONTEND_URL 환경변수가 설정되어 있으면 추가 (Plesk 등)
if (process.env.FRONTEND_URL && !allowedOrigins.includes(process.env.FRONTEND_URL)) {
  allowedOrigins.push(process.env.FRONTEND_URL);
  console.log(`✓ CORS: FRONTEND_URL 추가 - ${process.env.FRONTEND_URL}`);
}

// Codespace 환경 감지 및 허용
if (process.env.CODESPACES === 'true' || process.env.CODESPACE_NAME) {
  allowedOrigins.push('https://*.github.dev');
  allowedOrigins.push('https://*.app.github.dev');
}

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // 허용된 오리진 확인 (와일드카드 지원)
  const isAllowed = allowedOrigins.some(allowedOrigin => {
    if (allowedOrigin.includes('*')) {
      const pattern = allowedOrigin.replace('*', '.*');
      return new RegExp(pattern).test(origin);
    }
    return allowedOrigin === origin;
  });

  if (isAllowed || !origin) { // origin이 없는 경우 (서버간 통신) 허용
    res.header('Access-Control-Allow-Origin', origin || '*');
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 라우터 연결
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const menuRouter = require('./routes/menu');
const mobileRouter = require('./routes/mobile');
const invoicesRouter = require('./routes/invoices');
const ordersRouter = require('./routes/orders');
const orderAuditRouter = require('./routes/order-audit');
const cashManagementRouter = require('./routes/cash-management');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');
const categoriesRouter = require('./routes/categories');
const restaurantsRouter = require('./routes/restaurants');
const plansRouter = require('./routes/plans');
const adminAnalyticsRouter = require('./routes/admin-analytics');
const adminSettingsRouter = require('./routes/admin-settings');
const addressSuggestionsRouter = require('./routes/address-suggestions');
const schedulerRunsRouter = require('./routes/scheduler-runs');
const salesIntegrationsRouter = require('./routes/sales-integrations');
const adminPaymentSettingsRouter = require('./routes/admin-payment-settings');
const paymentsRouter = require('./routes/payments');
const supportTicketsRouter = require('./routes/support-tickets');
const operationTicketsRouter = require('./routes/operationTickets');
const customersRouter = require('./routes/customers');
const membershipRouter = require('./routes/membership');
const activityLogsRouter = require('./routes/activityLogs');
const optionGroupsRouter = require('./routes/optionGroups');
const staffRouter = require('./routes/staff');
const storeRouter = require('./routes/store');
const siteSettingsRouter = require('./routes/siteSettings');
const addonModulesRouter = require('./routes/addon-modules');
const notificationSettingsRouter = require('./routes/notification-settings');
const pushRouter = require('./routes/push');
const brandsRouter = require('./routes/brands');
const foodcourtsRouter = require('./routes/foodcourts');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const recipeCategoriesRouter = require('./routes/recipe-categories');
const ingredientCategoriesRouter = require('./routes/ingredient-categories');
const currenciesRouter = require('./routes/currencies');
const brandProductsRouter = require('./routes/brand-products');
// Brand Menu System (v3.32+)
const brandMenusRouter = require('./routes/brand-menus');
const brandMenuCategoriesRouter = require('./routes/brand-menu-categories');
const brandMenuOptionGroupsRouter = require('./routes/brand-menu-option-groups');
const restaurantBrandMenusRouter = require('./routes/restaurant-brand-menus');
const suppliersRouter = require('./routes/suppliers');
const inventoryRouter = require('./routes/inventory-routes');
const brandInventoryRouter = require('./routes/brand-inventory');
// Sprint 1 — Supply Chain Design 1
const supplierRouter = require('./routes/supplier');
const supplierProductsRouter = require('./routes/supplier-products');
const supplierInventoryRouter = require('./routes/supplier-inventory');
const supplierCompaniesRouter = require('./routes/supplier-companies');
const adminSupplierInvitationsRouter = require('./routes/admin-supplier-invitations');
// Sprint 2 — Supply Chain Design 2 (Buyer-side directory + contracts)
const supplierDirectoryRouter = require('./routes/supplier-directory');
// Sprint 3 — Supply Chain Design 3 (Purchase orders + ingredient ↔ seller mapping)
const purchaseOrdersRouter = require('./routes/purchase-orders');
// 발주 오너 승인 (2026-06-21) — 멀티매장 오너 scope. purchaseOrdersRouter "앞"에 마운트하여
// /purchase-orders/:id/approve|reject + /pending-approval 이 requireBuyerRole 을 건너뛰게 함.
const purchaseOrdersApprovalRouter = require('./routes/purchase-orders-approval');
// Phase 2 (2026-04-27) — Buyer-side seller picker
const buyerSellersRouter = require('./routes/buyer-sellers');
// Sprint 5 (2026-04-27) — Carrier catalog (delivery tracking)
const carriersRouter = require('./routes/carriers');
// Sprint 6 (2026-04-27) — PO returns / credit notes
const poReturnsRouter = require('./routes/po-returns');
// Sprint 7 (2026-04-28) — Carrier webhooks (HMAC + 2-stage processing)
const carrierWebhooksRouter = require('./routes/carrier-webhooks');
// Sprint 4 — Supply Chain Design 4 (Seller-side order management + buyer-side trade invoices)
const sellerOrdersRouter = require('./routes/seller-orders');
const purchaseInvoicesRouter = require('./routes/purchase-invoices');
// BG/FG → Restaurant trade billing — see docs/BG_FG_TRADE_BILLING.md
const entityBillingRouter = require('./routes/entity-billing');
const brandSoaRouter = require('./routes/brand-soa');
const foodcourtSoaRouter = require('./routes/foodcourt-soa');
const ingredientSellerProductsRouter = require('./routes/ingredient-seller-products');
const foodcourtProductsRouter = require('./routes/foodcourt-products');
const foodcourtInventoryRouter = require('./routes/foodcourt-inventory');
const productRecipeRouter = require('./routes/product-recipe');
const productRecipesRouter = require('./routes/product-recipes');
const productIngredientsRouter = require('./routes/product-ingredients');
const productRecipeCategoriesRouter = require('./routes/product-recipe-categories');
const productIngredientCategoriesRouter = require('./routes/product-ingredient-categories');
const generalStockCategoriesRouter = require('./routes/general-stock-categories');
const generalStockRouter = require('./routes/general-stock');
const couponsRouter = require('./routes/coupons');
const couponGroupsRouter = require('./routes/coupon-groups');
const uploadRouter = require('./routes/upload');
const publicRouter = require('./routes/public');
const contentsRouter = require('./routes/contents');
const subscriptionsRouter = require('./routes/subscriptions');
const ownerRouter = require('./routes/owner');
const systemLogsRouter = require('./routes/system-logs');
const adminReportsRouter = require('./routes/admin-reports');
const commentsRouter = require('./routes/comments');
const noticesRouter = require('./routes/notices');
const inboxRouter = require('./routes/inbox');
const workManualsRouter = require('./routes/work-manuals');
const badgeCountsRouter = require('./routes/badgeCounts');
const kitchenStationsRouter = require('./routes/kitchen-stations');
const autoprintDiagnosticRouter = require('./routes/autoprint-diagnostic');
const systemProductsRouter = require('./routes/system-products');
const systemProductCategoriesRouter = require('./routes/system-product-categories');
const systemProductOptionGroupsRouter = require('./routes/system-product-option-groups');
const hardwareQuotesRouter = require('./routes/hardware-quotes');
const tableQRRouter = require('./routes/table-qr');

// Health check endpoint - PM2 모니터링 및 로드밸런서용 (가장 먼저)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    pm2: {
      enabled: process.env.pm_id !== undefined,
      instance: process.env.pm_id || 'N/A'
    }
  });
});

// 정적 파일 서빙 (업로드된 이미지)
app.use('/uploads', express.static('/var/www/uploads'));

// 루트 라우터 연결 (가장 먼저)
app.use('/', indexRouter);

// API 라우터들
// IMPORTANT: coupons must be before /api mounted routers to prevent /:id matching
app.use('/api/coupons', couponsRouter);
app.use('/api/coupon-groups', couponGroupsRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/public', publicRouter);
app.use('/api/contents', contentsRouter);
app.use('/api/auth', authRouter);
// QZ Tray request signing — public (no auth) so it works from any merchant POS device.
// The endpoints only return a generic certificate + sign arbitrary text; they expose
// no merchant data and the private key never leaves the server.
app.use('/api/qz-tray', require('./routes/qz-tray'));
app.use('/api/consolidated-print', require('./routes/consolidated-print'));  // Consolidated Order Ticket — independent print-state (additive; never touches existing auto-print path)
app.use('/api/referrals', require('./routes/referrals'));  // Referral System — mount EARLY (before /api fall-through routers) so public validate-code/track-click are not gated by another router's middleware

// Reservations (v3.29) — staff first (more specific path-level guards), then public.
// Both mount under /api/reservations; express routes by definition order within each.
app.use('/api/reservations', require('./routes/reservations-staff'));
app.use('/api/reservations', require('./routes/reservations-public'));
app.use('/api/menu', menuRouter);
app.use('/api/mobile', mobileRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/order-audit', orderAuditRouter);
app.use('/api/cash', cashManagementRouter);
app.use('/api/users', usersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/categories', categoriesRouter);
// External QR ↔ Coupon mapping — must mount BEFORE restaurantsRouter (inventory-core uses
// router.use(authenticateToken) which would otherwise gate all /api/restaurants/* requests)
app.use('/api/restaurants', require('./routes/external-qrs').router);
// #11c 크로스셀 RA 추천 — restaurantsRouter 보다 먼저(구체 경로 우선, fall-through 회피)
app.use('/api/restaurants', require('./routes/recommendations'));
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/restaurant', restaurantsRouter); // Support singular form for backward compatibility
app.use('/api/plans', plansRouter);
app.use('/api/addon-modules', addonModulesRouter);
app.use('/api/admin-analytics', adminAnalyticsRouter);
app.use('/api/admin-reports', adminReportsRouter);
app.use('/api/admin/settings', adminSettingsRouter);
app.use('/api/address', addressSuggestionsRouter);
app.use('/api/admin/payment-settings', adminPaymentSettingsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/support-tickets', supportTicketsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/membership', membershipRouter);
app.use('/api/operation-tickets', operationTicketsRouter);
app.use('/api/activity-logs', activityLogsRouter);
app.use('/api/option-groups', optionGroupsRouter);
app.use('/api/staff', staffRouter);
app.use('/api/store', storeRouter);
app.use('/api/site-settings', siteSettingsRouter);
app.use('/api/notification-settings', notificationSettingsRouter);
app.use('/api/push', pushRouter);
app.use('/api', brandProductsRouter);  // Brand products routes (must be before /api/brands to handle /api/brands/:id/product-categories)
// Brand Menu System (v3.32+)
app.use('/api/brand-menus', brandMenusRouter);
app.use('/api/brand-menu-categories', brandMenuCategoriesRouter);
app.use('/api/brand-menu-option-groups', brandMenuOptionGroupsRouter);
app.use('/api/restaurant/:restaurantId/brand-menus', restaurantBrandMenusRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/foodcourts', foodcourtsRouter);
app.use('/api', recipesRouter);
app.use('/api', ingredientsRouter);
app.use('/api', recipeCategoriesRouter);
app.use('/api', ingredientCategoriesRouter);
app.use('/api', suppliersRouter);
app.use('/api/currencies', currenciesRouter);
app.use('/api/restaurants', inventoryRouter);
app.use('/api', brandInventoryRouter);
// Sprint 1 — Supply Chain Design 1
app.use('/api/supplier', supplierRouter);
app.use('/api', supplierProductsRouter);  // exposes /api/supplier-products + /api/supplier-product-categories + /api/supplier-product-option-groups
app.use('/api/supplier-inventory', supplierInventoryRouter);  // routes are relative (/, /summary, /receive, etc.)
app.use('/api/supplier-companies', supplierCompaniesRouter);
app.use('/api/admin/supplier-invitations', adminSupplierInvitationsRouter);
// Sprint 4 — seller routes FIRST (avoid buyer-role middleware blocking)
app.use('/api/seller-orders', sellerOrdersRouter);  // routes are relative inside the router
// Sprint 2 — Supply Chain Design 2
app.use('/api', supplierDirectoryRouter);  // exposes /api/supplier-directory + /api/supplier-contracts
// Sprint 3 — Supply Chain Design 3
// 발주 오너 승인 라우터를 먼저 마운트(승인/반려/대기큐가 requireBuyerRole 일괄가드를 건너뛰도록)
app.use('/api', purchaseOrdersApprovalRouter);  // /api/purchase-orders/{pending-approval,:id/approve,:id/reject}
app.use('/api', purchaseOrdersRouter);  // exposes /api/purchase-orders/*
// Phase 2 (2026-04-27) — Buyer-side seller picker
app.use('/api', buyerSellersRouter);  // exposes /api/buyer-sellers
// Sprint 5 (2026-04-27) — Carriers
app.use('/api', carriersRouter);  // exposes /api/carriers + /api/admin/carriers/*
// Sprint 6 (2026-04-27) — PO Returns
app.use('/api', poReturnsRouter);  // exposes /api/purchase-orders/:id/returns + /api/seller-orders/:id/returns/*
app.use('/api', carrierWebhooksRouter);  // Sprint 7: /api/carrier-webhooks/:carrier_code + /api/admin/carrier-webhook-events/*
// Sprint 4 — buyer-side
app.use('/api', purchaseInvoicesRouter);  // exposes /api/purchase-invoices/*
// BG/FG → Restaurant trade billing endpoints (must be on /api root for full path control)
app.use('/api', entityBillingRouter);     // /api/{brand|foodcourt}/restaurants/:id/billing-terms
app.use('/api', brandSoaRouter);          // /api/brand/soa/*
app.use('/api', foodcourtSoaRouter);      // /api/foodcourt/soa/*
app.use('/api', ingredientSellerProductsRouter);  // exposes /api/ingredients/:id/seller-sources, /api/ingredient-seller-products/:id, /api/seller-catalog
app.use('/api', foodcourtProductsRouter);  // exposes /api/foodcourt-products + /api/foodcourt-product-categories + /api/foodcourt-product-option-groups
app.use('/api', foodcourtInventoryRouter);  // exposes /api/foodcourts/:foodcourtId/inventory/*
app.use('/api', productRecipeRouter);
app.use('/api/product-recipes', productRecipesRouter);
app.use('/api/product-ingredients', productIngredientsRouter);
app.use('/api/product-recipe-categories', productRecipeCategoriesRouter);
app.use('/api', generalStockCategoriesRouter);
app.use('/api', generalStockRouter);  // Company-wide general stock routes for Brand General
app.use('/api/product-ingredient-categories', productIngredientCategoriesRouter);
app.use('/api/subscriptions', subscriptionsRouter);  // Subscriptions (dashboard)
app.use('/api/owner', ownerRouter);  // Restaurant Owner routes
app.use('/api/manager', require('./routes/manager-sales'));  // Manager (Brand/Foodcourt) real sales aggregation
app.use('/api/comments', commentsRouter);  // Polymorphic comments (notices, tickets)
app.use('/api/notices', noticesRouter);  // Notices (공지) system
app.use('/api/inbox', inboxRouter);  // Unified inbox (Notice + Tickets)
app.use('/api/admin/scheduler-runs', schedulerRunsRouter);  // Scheduler monitoring
app.use('/api/sales-integrations', salesIntegrationsRouter);  // 입점몰 매출보고 API 연동 설정
app.use('/api/work-manuals', workManualsRouter);  // Work Manuals (업무매뉴얼) system
app.use('/api/badge-counts', badgeCountsRouter);  // Sidebar badge counts
app.use('/api/kitchen-stations', kitchenStationsRouter);  // Kitchen station management
app.use('/api/diagnostic/autoprint', autoprintDiagnosticRouter);  // Auto-print preview + self-test
app.use('/api/print-events', require('./routes/print-events'));  // Print Visibility & Diagnostics (additive; never touches existing print path)
app.use('/api/system-products', systemProductsRouter);  // System products (hardware)
app.use('/api/system-product-categories', systemProductCategoriesRouter);  // System product categories
app.use('/api/system-product-option-groups', systemProductOptionGroupsRouter);  // System product option groups
app.use('/api/hardware-quotes', hardwareQuotesRouter);  // Hardware quote management
app.use('/api/restaurants', tableQRRouter);  // Table QR session management
const importRouter = require('./routes/import');
app.use('/api/import', importRouter);  // CSV data import (migration)

const aiServingRouter = require('./routes/ai-serving');
app.use('/api/ai-serving', aiServingRouter);  // Track B: AI camera serving (recognize/ready-items/reference-photos)

const contractsRouter = require('./routes/contracts');
app.use('/api/contracts', contractsRouter);  // Franchise & Tenancy contract management
const foodcourtUnitsRouter = require('./routes/foodcourt-units');
app.use('/api/foodcourts', foodcourtUnitsRouter);  // Foodcourt unit management
const foodcourtBranchesRouter = require('./routes/foodcourt-branches');
app.use('/api', foodcourtBranchesRouter);  // Foodcourt branches — mounts /foodcourts/:id/branches + /foodcourt-branches/:id
const foodcourtFloorPlansRouter = require('./routes/foodcourt-floor-plans');
app.use('/api', foodcourtFloorPlansRouter);  // Floor plans — /foodcourt-branches/:id/floor-plans + /foodcourt-floor-plans/:id + /foodcourt-units/:id/plan-position

// GitHub Webhook for Auto-Deployment (보안: System Admin 인증 필요)
const { exec } = require('child_process');
const { authenticateToken, requireRole } = require('./middleware/auth');
app.use('/api/system-logs', authenticateToken, requireRole('System Admin'), systemLogsRouter);
// 소켓 인증 모니터 통계 (Phase B 강제 전환 안전 판단용 — withToken vs withoutToken 비율 + 토큰없는 클라 출처). 2026-06-16
app.get('/api/socket-auth-monitor', authenticateToken, requireRole('System Admin'), (req, res) => {
  res.json({ success: true, data: getSocketAuthStats() });
});
app.post('/api/deploy', authenticateToken, requireRole('System Admin'), (req, res) => {
  console.log('Deployment request received from:', req.user?.email);

  const deployScript = process.env.DEPLOY_SCRIPT || '/var/www/vhosts/orderhere.wor-pro.com/deploy.sh';

  exec(deployScript, (error, stdout, stderr) => {
    if (error) {
      console.error('Deployment failed:', error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
        stderr: stderr
      });
    }

    console.log('Deployment completed successfully');
    console.log(stdout);

    res.json({
      success: true,
      message: 'Deployment completed successfully',
      output: stdout
    });
  });
});

// Global error handler (must be last middleware)
app.use(errorHandler);

// 데이터베이스 동기화 및 서버 시작
const PORT = process.env.PORT || 3000;

async function startServer() {
  // sequelize.sync() 가 매 실행마다 중복 unique 인덱스를 누적해 64-key 한도를
  // 터뜨리는 결함이 있어, 기본적으로 startup sync 를 끄고 인덱스 정리만 수행한다.
  // 스키마 변경이 필요하면 `node sync-database.js --alter` 를 명시적으로 실행.
  const RUN_STARTUP_SYNC = process.env.STARTUP_DB_SYNC === 'true';
  if (RUN_STARTUP_SYNC) {
    try {
      await Promise.race([
        syncDatabase(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Database sync timeout after 10s')), 10000))
      ]);
      console.log('✓ Database synchronized successfully');
    } catch (error) {
      console.error('⚠️  Database sync failed, but continuing to start server:', error.message);
    }
  } else {
    // sync 는 건너뛰되, 누적된 중복 인덱스만 정리.
    try {
      const { sequelize: seq } = require('./config/database');
      const [rows] = await seq.query(`
        SELECT TABLE_NAME, INDEX_NAME, NON_UNIQUE,
               GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS cols
        FROM information_schema.STATISTICS
        WHERE TABLE_SCHEMA = DATABASE() AND INDEX_NAME <> 'PRIMARY'
        GROUP BY TABLE_NAME, INDEX_NAME, NON_UNIQUE
      `);
      const groups = new Map();
      for (const r of rows) {
        const key = `${r.TABLE_NAME}::${r.cols}::${r.NON_UNIQUE}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(r);
      }
      const dropsByTable = {};
      for (const indexes of groups.values()) {
        if (indexes.length <= 1) continue;
        indexes.sort((a, b) => {
          const aN = /_\d+$/.test(a.INDEX_NAME);
          const bN = /_\d+$/.test(b.INDEX_NAME);
          if (aN !== bN) return aN ? 1 : -1;
          return a.INDEX_NAME.length - b.INDEX_NAME.length;
        });
        const [, ...dupes] = indexes;
        for (const d of dupes) {
          if (!dropsByTable[d.TABLE_NAME]) dropsByTable[d.TABLE_NAME] = [];
          dropsByTable[d.TABLE_NAME].push(d.INDEX_NAME);
        }
      }
      if (Object.keys(dropsByTable).length > 0) {
        await seq.query('SET FOREIGN_KEY_CHECKS = 0');
        let total = 0;
        for (const [table, indexes] of Object.entries(dropsByTable)) {
          const clauses = indexes.map(i => `DROP INDEX \`${i}\``).join(', ');
          try { await seq.query(`ALTER TABLE \`${table}\` ${clauses}`); total += indexes.length; } catch (_) {}
        }
        await seq.query('SET FOREIGN_KEY_CHECKS = 1');
        if (total > 0) console.log(`✓ 중복 인덱스 ${total}개 자동 정리`);
      }
    } catch (e) {
      console.warn('⚠️ 중복 인덱스 정리 스킵:', e.message);
    }
  }

  try {
    // Initialize Socket.IO
    const io = initSocketServer(server);
    console.log('✓ Socket.IO initialized');

    // Make io available globally for routes
    app.set('io', io);
    module.exports.io = io;

    // Start invoice scheduler
    invoiceScheduler.start();

    // Start subscription scheduler (Trial/Unpaid/Suspended transitions)
    subscriptionScheduler.start();

    // Start demo data reset scheduler (daily at midnight, site timezone)
    demoResetScheduler.start();

    // Start monthly SOA scheduler (Sprint 4) — runs at 00:30 on the 1st of each month
    startSoaCron();

    // Start daily stats aggregation scheduler — runs daily at 00:30 SGT (UTC+8)
    dailyStatsScheduler.start();

    // Start mall sales reporting scheduler — daily 02:00 MYT, uploads 24 hourly
    // records per restaurant (last 7 days upsert) to the mall's POS sales API.
    mallSalesScheduler.start();

    // Start invoice overdue scheduler — runs daily at 02:30 UTC, transitions
    // non-subscription invoices past due_date to 'overdue' status.
    invoiceOverdueScheduler.start();

    // Start reservation scheduler — runs hourly (24h/2h reminders + no_show auto)
    reservationScheduler.start();

    // Start base64 image sweep — weekly Sunday 04:00 UTC, detects inline base64
    // images in DB columns and alerts System Admins (v3.30 perf incident guard).
    base64ImageSweep.start();

    // 포트 충돌 체크 - PM2 환경에서는 더 유연하게 처리
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`✓ Server is running on port ${PORT}`);
      console.log(`✓ Server bound to 0.0.0.0:${PORT} (accessible from all IPs)`);
      console.log('✓ Invoice scheduler is running');
      console.log('✓ Subscription scheduler is running');
      console.log('✓ Socket.IO is running on all namespaces');
      console.log(`✓ Health check: http://localhost:${PORT}/api/health`);
    });

    // Handle port conflicts gracefully
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`⚠️  Port ${PORT} is already in use.`);
        console.error('✗ Another process is using this port. Please check with: lsof -i :' + PORT);
        // Don't auto-restart to avoid infinite loop - manual intervention needed
        process.exit(1);
      } else {
        console.error('✗ Server error:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
