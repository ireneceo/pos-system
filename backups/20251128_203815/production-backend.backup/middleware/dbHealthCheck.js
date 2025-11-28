/**
 * DB 연결 상태 체크 미들웨어
 * 모든 API 요청 전에 DB 연결 상태를 확인하고,
 * 연결이 끊어져 있으면 자동으로 재연결 시도
 */

const { checkConnection, testConnection } = require('../config/database');

let lastCheckTime = 0;
const CHECK_INTERVAL = 5000; // 5초마다 체크
let isChecking = false;

const dbHealthCheck = async (req, res, next) => {
  // 정적 파일이나 헬스 체크 엔드포인트는 스킵
  if (req.path === '/health' || req.path === '/api/health' || req.path.startsWith('/static') || req.path.includes('/health')) {
    return next();
  }

  const now = Date.now();
  
  // 마지막 체크 후 일정 시간이 지났거나, 첫 체크인 경우
  if (now - lastCheckTime < CHECK_INTERVAL && lastCheckTime > 0) {
    return next(); // 체크 스킵
  }

  // 이미 체크 중이면 스킵 (동시 요청 방지)
  if (isChecking) {
    return next();
  }

  try {
    isChecking = true;
    lastCheckTime = now;

    // DB 연결 상태 확인
    const isConnected = await checkConnection();

    if (!isConnected) {
      console.warn('⚠️ DB 연결이 끊어졌습니다. 재연결 시도 중...');
      
      // 재연결 시도 (최대 3초 대기)
      const reconnectPromise = testConnection(true);
      const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve(false), 3000));
      
      const reconnected = await Promise.race([reconnectPromise, timeoutPromise]);

      if (!reconnected) {
        console.error('❌ DB 재연결 실패. 요청을 처리할 수 없습니다.');
        return res.status(503).json({
          success: false,
          error: {
            message: 'Database connection unavailable. Please try again in a moment.',
            code: 'DB_CONNECTION_ERROR',
            timestamp: new Date().toISOString()
          }
        });
      }

      console.log('✅ DB 연결이 복구되었습니다.');
    }
  } catch (error) {
    console.error('🔴 DB Health Check 에러:', error.message);
    // 에러가 발생해도 요청은 계속 진행 (기존 연결 사용)
  } finally {
    isChecking = false;
  }

  next();
};

module.exports = dbHealthCheck;

