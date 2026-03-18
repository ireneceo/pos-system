// ============================================
// PM2 필수 체크 - PM2 없이 실행 시 즉시 종료
// 이 파일은 반드시 PM2를 통해서만 실행되어야 합니다.
// 직접 실행 방지로 포트 충돌 문제를 영구적으로 해결합니다.
// ============================================
if (process.env.pm_id === undefined) {
  console.error('❌ ERROR: This server must be run through PM2!');
  console.error('❌ Direct execution is not allowed to prevent port conflicts.');
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
  console.error('❌ ERROR: Do NOT run this server as root!');
  console.error('❌ Running as root causes port conflicts with PM2 (irene user).');
  console.error('');
  console.error('📌 Correct usage:');
  console.error('   pm2 start ecosystem.config.js --only dev-backend');
  console.error('   (PM2 runs as irene user)');
  console.error('');
  console.error('🚫 Exiting immediately...');
  process.exit(1);
}

// 환경 설정 자동 로드 (가장 먼저 실행)
const loadEnvironmentConfig = require('./config/env-loader');
loadEnvironmentConfig();

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
const serverHealthMonitor = require('./services/serverHealthMonitor');
const { errorHandler } = require('./middleware/errorHandler');
const { initSocketServer } = require('./services/socketService');

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
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
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

// Stripe Webhook - MUST be before express.json() for raw body signature verification
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const systemLogger = require('./utils/systemLogger');
  try {
    const sig = req.headers['stripe-signature'];
    if (!sig) {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    const Invoice = require('./models/Invoice');
    const { getWebhookSecretForIssuer } = require('./utils/stripeService');
    const Stripe = require('stripe');

    const webhookSecret = await getWebhookSecretForIssuer('system_admin', null);
    if (!webhookSecret) {
      await systemLogger.warn('payment', 'stripe-webhook', 'No webhook secret configured');
      return res.status(400).json({ error: 'Webhook secret not configured' });
    }

    let event;
    try {
      event = Stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      await systemLogger.error('security', 'stripe-webhook', 'Webhook signature verification failed', { error: err.message });
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const invoiceId = paymentIntent.metadata?.invoice_id;
        if (invoiceId) {
          const invoice = await Invoice.findByPk(invoiceId);
          if (invoice && invoice.payment_intent_id === paymentIntent.id) {
            await invoice.update({
              status: 'paid',
              paid_at: new Date(),
              paid_amount: invoice.total_amount,
              payment_method: 'stripe',
              payment_provider: 'stripe',
              transaction_id: paymentIntent.id,
              confirmed_at: new Date(),
              confirmed_by: 0
            });
            await systemLogger.info('payment', 'stripe-webhook', `Invoice ${invoice.invoice_number} auto-confirmed via Stripe`, { paymentIntentId: paymentIntent.id });
          }
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const invoiceId = paymentIntent.metadata?.invoice_id;
        if (invoiceId) {
          const invoice = await Invoice.findByPk(invoiceId);
          if (invoice) {
            await invoice.update({
              payment_notes: `Stripe payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`
            });
            await systemLogger.warn('payment', 'stripe-webhook', `Payment failed: ${invoice.invoice_number}`, {
              paymentIntentId: paymentIntent.id, error: paymentIntent.last_payment_error?.message
            });
          }
        }
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    await systemLogger.error('payment', 'stripe-webhook', 'Webhook handler error', { error: error.message });
    res.status(500).json({ error: 'Webhook handler error' });
  }
});

// PayPal Webhook - MUST be before express.json() for raw body verification
app.post('/api/webhooks/paypal', express.raw({ type: 'application/json' }), async (req, res) => {
  const systemLogger = require('./utils/systemLogger');
  try {
    const Invoice = require('./models/Invoice');
    const { getWebhookIdForIssuer, getPayPalConfigForIssuer } = require('./utils/paypalService');

    const rawBody = req.body.toString();
    const event = JSON.parse(rawBody);

    // ========================================
    // PayPal Webhook Signature Verification
    // ========================================
    const webhookId = await getWebhookIdForIssuer('system_admin', null);
    if (webhookId) {
      const transmissionId = req.headers['paypal-transmission-id'];
      const transmissionTime = req.headers['paypal-transmission-time'];
      const transmissionSig = req.headers['paypal-transmission-sig'];
      const certUrl = req.headers['paypal-cert-url'];
      const authAlgo = req.headers['paypal-auth-algo'];

      if (!transmissionId || !transmissionTime || !transmissionSig || !certUrl) {
        await systemLogger.error('security', 'paypal-webhook', 'Missing PayPal signature headers');
        return res.status(400).json({ error: 'Missing PayPal signature headers' });
      }

      // Verify signature via PayPal API
      try {
        const config = await getPayPalConfigForIssuer('system_admin', null);
        const baseUrl = config.sandbox !== false
          ? 'https://api-m.sandbox.paypal.com'
          : 'https://api-m.paypal.com';

        // Get access token
        const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=client_credentials'
        });
        const tokenData = await tokenRes.json();

        if (!tokenData.access_token) {
          await systemLogger.error('security', 'paypal-webhook', 'Failed to get PayPal access token for verification');
          return res.status(500).json({ error: 'Verification failed' });
        }

        // Verify webhook signature
        const verifyRes = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            auth_algo: authAlgo,
            cert_url: certUrl,
            transmission_id: transmissionId,
            transmission_sig: transmissionSig,
            transmission_time: transmissionTime,
            webhook_id: webhookId,
            webhook_event: event
          })
        });
        const verifyData = await verifyRes.json();

        if (verifyData.verification_status !== 'SUCCESS') {
          await systemLogger.error('security', 'paypal-webhook', 'Webhook signature verification FAILED', {
            status: verifyData.verification_status
          });
          return res.status(400).json({ error: 'Webhook signature verification failed' });
        }
      } catch (verifyError) {
        await systemLogger.error('security', 'paypal-webhook', 'Signature verification error', { error: verifyError.message });
        return res.status(400).json({ error: 'Signature verification error' });
      }
    } else {
      // No webhookId configured — log warning but still process (graceful degradation)
      await systemLogger.warn('payment', 'paypal-webhook', 'No webhookId configured — processing without signature verification');
    }

    // ========================================
    // Process webhook event
    // ========================================
    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const resource = event.resource;
        const invoiceId = resource.custom_id;
        if (invoiceId) {
          const invoice = await Invoice.findByPk(invoiceId);
          if (invoice && invoice.payment_provider === 'paypal' && invoice.status !== 'paid') {
            await invoice.update({
              status: 'paid',
              paid_at: new Date(),
              paid_amount: invoice.total_amount,
              payment_method: 'paypal',
              payment_provider: 'paypal',
              transaction_id: resource.id,
              confirmed_at: new Date(),
              confirmed_by: 0
            });
            await systemLogger.info('payment', 'paypal-webhook',
              `Invoice ${invoice.invoice_number} auto-confirmed via PayPal webhook`,
              { captureId: resource.id });
          }
        }
        break;
      }
      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.DECLINED': {
        const resource = event.resource;
        const invoiceId = resource.custom_id;
        if (invoiceId) {
          const invoice = await Invoice.findByPk(invoiceId);
          if (invoice) {
            await invoice.update({
              payment_notes: `PayPal payment denied: ${resource.status_details?.reason || 'Unknown error'}`
            });
            await systemLogger.warn('payment', 'paypal-webhook',
              `Payment denied: ${invoice.invoice_number}`,
              { captureId: resource.id, reason: resource.status_details?.reason });
          }
        }
        break;
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('PayPal webhook error:', error);
    const systemLogger = require('./utils/systemLogger');
    await systemLogger.error('payment', 'paypal-webhook', 'Webhook handler error', { error: error.message });
    res.status(500).json({ error: 'Webhook handler error' });
  }
});

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
  console.log(`✅ CORS: FRONTEND_URL 추가 - ${process.env.FRONTEND_URL}`);
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
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');
const categoriesRouter = require('./routes/categories');
const restaurantsRouter = require('./routes/restaurants');
const plansRouter = require('./routes/plans');
const adminAnalyticsRouter = require('./routes/admin-analytics');
const adminSettingsRouter = require('./routes/admin-settings');
const adminPaymentSettingsRouter = require('./routes/admin-payment-settings');
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
const brandsRouter = require('./routes/brands');
const foodcourtsRouter = require('./routes/foodcourts');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const recipeCategoriesRouter = require('./routes/recipe-categories');
const ingredientCategoriesRouter = require('./routes/ingredient-categories');
const currenciesRouter = require('./routes/currencies');
const brandProductsRouter = require('./routes/brand-products');
const suppliersRouter = require('./routes/suppliers');
const inventoryRouter = require('./routes/inventory-routes');
const brandInventoryRouter = require('./routes/brand-inventory');
const productRecipeRouter = require('./routes/product-recipe');
const productRecipesRouter = require('./routes/product-recipes');
const productIngredientsRouter = require('./routes/product-ingredients');
const productRecipeCategoriesRouter = require('./routes/product-recipe-categories');
const productIngredientCategoriesRouter = require('./routes/product-ingredient-categories');
const generalStockCategoriesRouter = require('./routes/general-stock-categories');
const generalStockRouter = require('./routes/general-stock');
const couponsRouter = require('./routes/coupons');
const uploadRouter = require('./routes/upload');
const publicRouter = require('./routes/public');
const contentsRouter = require('./routes/contents');
const subscriptionsRouter = require('./routes/subscriptions');
const ownerRouter = require('./routes/owner');
const systemLogsRouter = require('./routes/system-logs');
const adminReportsRouter = require('./routes/admin-reports');
const commentsRouter = require('./routes/comments');
const noticesRouter = require('./routes/notices');
const badgeCountsRouter = require('./routes/badgeCounts');
const kitchenStationsRouter = require('./routes/kitchen-stations');

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
app.use('/api/upload', uploadRouter);
app.use('/api/public', publicRouter);
app.use('/api/contents', contentsRouter);
app.use('/api/auth', authRouter);
app.use('/api/menu', menuRouter);
app.use('/api/mobile', mobileRouter);
app.use('/api/invoices', invoicesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/restaurant', restaurantsRouter); // Support singular form for backward compatibility
app.use('/api/plans', plansRouter);
app.use('/api/addon-modules', addonModulesRouter);
app.use('/api/admin-analytics', adminAnalyticsRouter);
app.use('/api/admin-reports', adminReportsRouter);
app.use('/api/admin/settings', adminSettingsRouter);
app.use('/api/admin/payment-settings', adminPaymentSettingsRouter);
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
app.use('/api', brandProductsRouter);  // Brand products routes (must be before /api/brands to handle /api/brands/:id/product-categories)
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
app.use('/api', productRecipeRouter);
app.use('/api/product-recipes', productRecipesRouter);
app.use('/api/product-ingredients', productIngredientsRouter);
app.use('/api/product-recipe-categories', productRecipeCategoriesRouter);
app.use('/api', generalStockCategoriesRouter);
app.use('/api', generalStockRouter);  // Company-wide general stock routes for Brand General
app.use('/api/product-ingredient-categories', productIngredientCategoriesRouter);
app.use('/api/subscriptions', subscriptionsRouter);  // Subscriptions (dashboard)
app.use('/api/owner', ownerRouter);  // Restaurant Owner routes
app.use('/api/comments', commentsRouter);  // Polymorphic comments (notices, tickets)
app.use('/api/notices', noticesRouter);  // Notices (공지) system
app.use('/api/badge-counts', badgeCountsRouter);  // Sidebar badge counts
app.use('/api/kitchen-stations', kitchenStationsRouter);  // Kitchen station management

// GitHub Webhook for Auto-Deployment (보안: System Admin 인증 필요)
const { exec } = require('child_process');
const { authenticateToken, requireRole } = require('./middleware/auth');
app.use('/api/system-logs', authenticateToken, requireRole('System Admin'), systemLogsRouter);
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
  try {
    // DB sync with 10 second timeout
    await Promise.race([
      syncDatabase(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Database sync timeout after 10s')), 10000))
    ]);
    console.log('✅ Database synchronized successfully');
  } catch (error) {
    console.error('⚠️  Database sync failed, but continuing to start server:', error.message);
    console.log('📝 Note: Database sync error is expected due to MySQL key limit issue or network timeout');
  }

  try {
    // Initialize Socket.IO
    const io = initSocketServer(server);
    console.log('✅ Socket.IO initialized');

    // Make io available globally for routes
    app.set('io', io);

    // Start invoice scheduler
    invoiceScheduler.start();

    // Start subscription scheduler (Trial/Unpaid/Suspended transitions)
    subscriptionScheduler.start();

    // Start demo data reset scheduler (daily at midnight, site timezone)
    demoResetScheduler.start();

    // Start production server health monitor
    serverHealthMonitor.start();

    // 포트 충돌 체크 - PM2 환경에서는 더 유연하게 처리
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`✅ Server bound to 0.0.0.0:${PORT} (accessible from all IPs)`);
      console.log('✅ Invoice scheduler is running');
      console.log('✅ Subscription scheduler is running');
      console.log('✅ Socket.IO is running on all namespaces');
      console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    });

    // Handle port conflicts gracefully
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`⚠️  Port ${PORT} is already in use.`);
        console.error('❌ Another process is using this port. Please check with: lsof -i :' + PORT);
        // Don't auto-restart to avoid infinite loop - manual intervention needed
        process.exit(1);
      } else {
        console.error('❌ Server error:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
