const { Sequelize } = require('sequelize');

// 간단한 .env 파일 로드 (Codespace에서는 env-loader 사용)
if (process.env.CODESPACES === 'true' || process.env.CODESPACE_NAME) {
  // Codespace 환경: env-loader 사용 (.env.codespace 로드)
  require('./env-loader')();
} else {
  // 일반 환경: 기본 .env 파일 로드
  require('dotenv').config();
}

// 환경 변수에서 직접 가져오기 (필수)
if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD) {
  console.error('❌ 필수 환경변수가 설정되지 않았습니다!');
  console.error('   필요한 변수: DB_HOST, DB_NAME, DB_USER, DB_PASSWORD');
  console.error('   .env 파일을 확인하세요.');
  process.exit(1);
}

const dbConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

console.log('📊 데이터베이스 설정:');
console.log(`   Host: ${dbConfig.host}`);
console.log(`   Port: ${dbConfig.port}`);
console.log(`   Database: ${dbConfig.database}`);
console.log(`   User: ${dbConfig.username}`);

// 연결 상태 추적
let isConnected = false;
let connectionAttempts = 0;
const MAX_CONNECTION_ATTEMPTS = 5;
let reconnectTimer = null;

// Sequelize 인스턴스 생성 - 최적화된 설정
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'production' ? false : (msg) => {
      // 프로덕션에서는 에러만 로깅
      if (msg.includes('ERROR') || msg.includes('timeout') || msg.includes('connection')) {
        console.error('🔴 DB Query Error:', msg);
      }
    },
    dialectOptions: {
      connectTimeout: 60000, // 1분 타임아웃 (초기 연결)
      multipleStatements: true,
      // 타임존 설정
      timezone: '+00:00', // UTC 사용
      // SSL 설정 (필요시)
      ssl: process.env.DB_SSL === 'true' ? {
        rejectUnauthorized: false
      } : false,
      // MySQL 연결 안정성 향상 옵션
      dateStrings: false,
      typeCast: true
    },
    // Connection Pool 최적화 - 동시 요청 처리 능력 향상
    pool: {
      max: 20, // 최대 연결 수 증가 (기존 5 -> 20)
      min: 2,  // 최소 유지 연결 수 (기존 0 -> 2)
      acquire: 60000, // 연결 획득 타임아웃 (1분)
      idle: 10000, // 유휴 연결 타임아웃 (10초)
      evict: 1000, // 연결 체크 간격 (1초)
      handleDisconnects: true // 자동 재연결
    },
    // 재시도 로직 강화
    retry: {
      match: [
        /ETIMEDOUT/,
        /EHOSTUNREACH/,
        /ECONNRESET/,
        /ECONNREFUSED/,
        /ESOCKETTIMEDOUT/,
        /EPIPE/,
        /EAI_AGAIN/,
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /Connection lost/,
        /Lost connection to MySQL server/,
        /MySQL server has gone away/,
        /Too many connections/,
        /ER_LOCK_WAIT_TIMEOUT/,
        /ER_LOCK_DEADLOCK/
      ],
      max: 5 // 재시도 횟수 증가 (기존 3 -> 5)
    },
    // 쿼리 실행 옵션
    query: {
      raw: false
    },
    // 트랜잭션 격리 수준
    transactionType: 'IMMEDIATE',
    isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
  }
);

// 연결 테스트 및 상태 관리
const testConnection = async (retry = false) => {
  try {
    await sequelize.authenticate();
    isConnected = true;
    connectionAttempts = 0;
    
    if (retry) {
      console.log('✅ MySQL 데이터베이스 재연결 성공!');
    } else {
      console.log('✅ MySQL 데이터베이스 연결 성공!');
    }
    
    // 연결 상태 확인 (프로덕션에서는 로깅 안 함)
    if (process.env.NODE_ENV === 'development') {
      try {
        const poolStatus = sequelize.connectionManager.pool;
        if (poolStatus) {
          const poolInfo = {
            size: poolStatus.size || 0,
            available: poolStatus.available || 0,
            using: poolStatus.using ? poolStatus.using.length : 0,
            waiting: poolStatus.waiting ? poolStatus.waiting.length : 0
          };
          console.log(`📊 Connection Pool 상태:`, poolInfo);
        }
      } catch (e) {
        // Pool 정보 접근 실패는 무시
      }
    }
    
    return true;
  } catch (error) {
    isConnected = false;
    connectionAttempts++;
    
    console.error(`❌ MySQL 연결 실패 (시도 ${connectionAttempts}/${MAX_CONNECTION_ATTEMPTS}):`, error.message);
    console.error('   연결 시도 정보:');
    console.error(`   Host: ${dbConfig.host}:${dbConfig.port}`);
    console.error(`   Database: ${dbConfig.database}`);
    console.error(`   User: ${dbConfig.username}`);
    
    // 자동 재연결 시도
    if (connectionAttempts < MAX_CONNECTION_ATTEMPTS && retry) {
      const delay = Math.min(1000 * Math.pow(2, connectionAttempts), 30000); // 지수 백오프 (최대 30초)
      console.log(`   ${delay/1000}초 후 재연결 시도...`);
      
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
      
      reconnectTimer = setTimeout(() => {
        testConnection(true);
      }, delay);
    }
    
    return false;
  }
};

// 연결 상태 확인 함수
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};

// 주기적 연결 상태 확인 (5분마다)
if (process.env.NODE_ENV === 'production') {
  setInterval(async () => {
    const connected = await checkConnection();
    if (!connected && isConnected) {
      console.warn('⚠️ DB 연결이 끊어졌습니다. 재연결 시도 중...');
      isConnected = false;
      await testConnection(true);
    } else if (connected && !isConnected) {
      console.log('✅ DB 연결이 복구되었습니다.');
      isConnected = true;
    }
  }, 5 * 60 * 1000); // 5분마다
}

// 이벤트 리스너 등록 (pool이 있는 경우)
try {
  const pool = sequelize.connectionManager.pool;
  if (pool && typeof pool.on === 'function') {
    pool.on('acquire', (connection) => {
      // 연결 획득 시 로깅 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log('📥 DB 연결 획득');
      }
    });

    pool.on('release', (connection) => {
      // 연결 해제 시 로깅 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log('📤 DB 연결 해제');
      }
    });

    pool.on('error', (error) => {
      console.error('🔴 DB Connection Pool 에러:', error.message);
      isConnected = false;
      
      // 에러 발생 시 재연결 시도
      if (!reconnectTimer) {
        reconnectTimer = setTimeout(() => {
          reconnectTimer = null;
          testConnection(true);
        }, 5000); // 5초 후 재연결
      }
    });
  }
} catch (e) {
  // Pool 이벤트 리스너 등록 실패는 무시
  console.warn('⚠️ Pool 이벤트 리스너 등록 실패 (무시됨):', e.message);
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 데이터베이스 연결 종료 중...');
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
  }
  await sequelize.close();
  console.log('✅ 데이터베이스 연결이 종료되었습니다.');
});

process.on('SIGINT', async () => {
  console.log('🛑 데이터베이스 연결 종료 중...');
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
  }
  await sequelize.close();
  console.log('✅ 데이터베이스 연결이 종료되었습니다.');
});

// 초기 연결 테스트
testConnection();

module.exports = {
  sequelize,
  Sequelize,
  testConnection,
  checkConnection,
  isConnected: () => isConnected
};
