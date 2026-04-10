const path = require('path');
const fs = require('fs');

/**
 * 환경 설정 로더
 * 단순하게 .env 파일 하나만 사용
 */
function loadEnvironmentConfig() {
  const envPath = path.join(__dirname, '..', '.env');

  if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
    console.log('✓ 환경 파일 로드: .env');
  } else {
    console.warn('⚠️ .env 파일을 찾을 수 없습니다.');
  }

  // 환경 정보 출력
  const nodeEnv = process.env.NODE_ENV || 'development';
  console.log(`환경: ${nodeEnv === 'production' ? '🏭 운영' : '🔧 개발'}`);
  console.log(`📊 데이터베이스: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`);
  console.log(`👤 DB 사용자: ${process.env.DB_USER}`);
  console.log(`🌐 포트: ${process.env.PORT}`);
}

module.exports = loadEnvironmentConfig;
