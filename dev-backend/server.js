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

// 환경 설정 자동 로드 (가장 먼저 실행)
const loadEnvironmentConfig = require('./config/env-loader');
loadEnvironmentConfig();

const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { syncDatabase } = require('./db');
const invoiceScheduler = require('./services/invoiceScheduler');
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

  // 디버깅을 위한 로그 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log(`🌐 CORS: Origin=${origin}, Allowed=${isAllowed}`);
  }

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
const supportTicketsRouter = require('./routes/support-tickets');
const operationTicketsRouter = require('./routes/operationTickets');
const customersRouter = require('./routes/customers');
const activityLogsRouter = require('./routes/activityLogs');
const optionGroupsRouter = require('./routes/optionGroups');
const staffRouter = require('./routes/staff');
const storeRouter = require('./routes/store');
const siteSettingsRouter = require('./routes/siteSettings');
const addonModulesRouter = require('./routes/addon-modules');
const notificationSettingsRouter = require('./routes/notification-settings');
const brandsRouter = require('./routes/brands');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const recipeCategoriesRouter = require('./routes/recipe-categories');
const currenciesRouter = require('./routes/currencies');

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

// 루트 라우터 연결 (가장 먼저)
app.use('/', indexRouter);

// API 라우터들
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
app.use('/api/admin/settings', adminSettingsRouter);
app.use('/api/support-tickets', supportTicketsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/operation-tickets', operationTicketsRouter);
app.use('/api/activity-logs', activityLogsRouter);
app.use('/api/option-groups', optionGroupsRouter);
app.use('/api/staff', staffRouter);
app.use('/api/store', storeRouter);
app.use('/api/site-settings', siteSettingsRouter);
app.use('/api/notification-settings', notificationSettingsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api', recipesRouter);
app.use('/api', ingredientsRouter);
app.use('/api', recipeCategoriesRouter);
app.use('/api/currencies', currenciesRouter);

// GitHub Webhook for Auto-Deployment
const { exec } = require('child_process');
app.post('/api/deploy', (req, res) => {
  console.log('📥 GitHub Webhook received - Starting deployment...');

  const deployScript = process.env.DEPLOY_SCRIPT || '/var/www/vhosts/orderhere.wor-pro.com/deploy.sh';

  exec(deployScript, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Deployment failed:', error.message);
      return res.status(500).json({
        success: false,
        error: error.message,
        stderr: stderr
      });
    }

    console.log('✅ Deployment completed successfully');
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

    // 포트 충돌 체크 - PM2 환경에서는 더 유연하게 처리
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`✅ Server bound to 0.0.0.0:${PORT} (accessible from all IPs)`);
      console.log('✅ Invoice scheduler is running');
      console.log('✅ Socket.IO is running on all namespaces');
      console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    });

    // Handle port conflicts gracefully - PM2 환경에서는 재시작하도록
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`⚠️  Port ${PORT} is already in use.`);
        if (isPM2) {
          console.log('🔄 PM2 will handle restart automatically');
          // PM2가 자동으로 재시작하므로 즉시 종료하지 않음
          setTimeout(() => process.exit(1), 5000);
        } else {
          console.error('❌ Exiting to avoid conflicts.');
          process.exit(1);
        }
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
