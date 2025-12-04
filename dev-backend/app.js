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
const dbHealthCheck = require('./middleware/dbHealthCheck');

// PID 파일 관리 - 단일 프로세스 보장
const PID_FILE = path.join(__dirname, '.server.pid');
const CURRENT_PID = process.pid;

// 시작 시 기존 프로세스 체크
try {
  if (fs.existsSync(PID_FILE)) {
    const oldPid = parseInt(fs.readFileSync(PID_FILE, 'utf8'));
    try {
      // 기존 프로세스가 살아있는지 확인
      process.kill(oldPid, 0);
      console.log(`Found existing process ${oldPid}, signaling shutdown...`);
      process.kill(oldPid, 'SIGTERM');
      // 잠시 대기
      setTimeout(() => {}, 1000);
    } catch (e) {
      // 프로세스가 이미 죽었으면 무시
    }
  }
  // 현재 PID 저장
  fs.writeFileSync(PID_FILE, CURRENT_PID.toString());
} catch (error) {
  console.error('PID file management error:', error.message);
}

// 종료 시 PID 파일 삭제
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

// DB 헬스 체크 미들웨어 (모든 API 요청 전에 실행)
app.use('/api', dbHealthCheck);

// CORS 설정 - 환경별 허용 도메인
const allowedOrigins = [
  'https://pos.orderhere.center',
  'https://solution.orderhere.center',
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
const healthRouter = require('./routes/health');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const recipeCategoriesRouter = require('./routes/recipe-categories');
const brandsRouter = require('./routes/brands');
const currenciesRouter = require('./routes/currencies');

// 헬스 체크 라우터 (가장 먼저, DB 체크 없이)
app.use('/api/health', healthRouter);

// 루트 라우터 연결
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
// Recipes, ingredients and recipe categories routes need to be available at both /api/brands and /api/restaurants
app.use('/api', recipesRouter);
app.use('/api', ingredientsRouter);
app.use('/api', recipeCategoriesRouter);
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/plans', plansRouter);
app.use('/api/admin-analytics', adminAnalyticsRouter);
app.use('/api/admin/settings', adminSettingsRouter);
app.use('/api/admin-settings', adminSettingsRouter); // Alternative route for backward compatibility
app.use('/api/support-tickets', supportTicketsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/operation-tickets', operationTicketsRouter);
app.use('/api/activity-logs', activityLogsRouter);
app.use('/api/option-groups', optionGroupsRouter);
app.use('/api/brands', brandsRouter);
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

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Server bound to 0.0.0.0:${PORT} (accessible from all IPs)`);
      console.log('Invoice scheduler is running');
      console.log('Socket.IO is running on all namespaces');
    });

    // Handle port conflicts gracefully
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Exiting to avoid conflicts.`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
