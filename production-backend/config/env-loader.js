const path = require('path');
const fs = require('fs');
// dotenv는 loadEnvironmentConfig() 내에서 필요할 때만 로드

/**
 * 서버 환경 감지 함수 (도메인 기반)
 */
function detectServerEnvironment() {
  // 1. FRONTEND_URL 환경변수로 감지
  const frontendUrl = process.env.FRONTEND_URL || '';

  // 스테이징 서버 감지
  if (frontendUrl.includes('orderhere.wor-pro.com')) {
    return 'staging';
  }

  // 운영 서버 감지
  if (frontendUrl.includes('orderhere.center')) {
    return 'production';
  }

  // 2. 실행 경로로 도메인 추출
  const currentPath = process.cwd();
  if (currentPath.includes('orderhere.wor-pro.com')) {
    return 'staging';
  }
  if (currentPath.includes('orderhere.center')) {
    return 'production';
  }

  // 3. Plesk 서버인지 확인
  if (currentPath.includes('/var/www/vhosts/')) {
    return 'plesk'; // 도메인 미확인 Plesk
  }

  return null; // 로컬 개발 환경
}

/**
 * Plesk 서버 환경 감지 함수
 */
function isPleskeServer() {
  const env = detectServerEnvironment();
  return env === 'staging' || env === 'production' || env === 'plesk';
}

/**
 * 환경 자동 감지 및 설정 로더
 * 1. 도메인 기반 환경 감지 (orderhere.wor-pro.com = staging, orderhere.center = production)
 * 2. Plesk UI 환경변수 (최우선)
 * 3. GitHub Codespace
 * 4. 기타 환경: NODE_ENV 기반 판단
 */
function loadEnvironmentConfig() {
  let envFile = '.env'; // 기본값
  let environment = '알 수 없는 환경';
  let skipEnvFile = false;

  // 도메인 기반 환경 감지
  const serverEnv = detectServerEnvironment();

  // 0. Plesk UI 환경변수 확인 (최우선)
  // DB_HOST, DB_NAME, PORT가 이미 설정되어 있으면 Plesk UI에서 관리하는 것으로 판단
  if (isPleskeServer() && process.env.DB_HOST && process.env.DB_NAME && process.env.PORT) {
    const envLabel = serverEnv === 'staging' ? '스테이징' : serverEnv === 'production' ? '운영' : 'Plesk';
    environment = `🏭 ${envLabel} 서버 (${process.env.FRONTEND_URL || 'Plesk'})`;
    skipEnvFile = true;
    console.log(`환경: ${environment}`);
    console.log('✅ Plesk UI 환경변수 사용 (env 파일 로드 건너뜀)');
  }
  // 1. GitHub Codespace 환경 확인
  else if (process.env.CODESPACES === 'true' || process.env.CODESPACE_NAME) {
    envFile = '.env.codespace';
    environment = '🚀 GitHub Codespace';
  }
  // 2. 도메인 기반 Plesk 서버 - 스테이징
  else if (serverEnv === 'staging') {
    envFile = '.env.staging';
    environment = '🔄 스테이징 서버 (orderhere.wor-pro.com)';
  }
  // 3. 도메인 기반 Plesk 서버 - 운영
  else if (serverEnv === 'production') {
    envFile = '.env.production';
    environment = '🏭 운영 서버 (orderhere.center)';
  }
  // 4. Plesk 서버 (도메인 미확인)
  else if (isPleskeServer()) {
    envFile = '.env.production';
    environment = '🏭 Plesk 서버 (localhost MySQL)';
  }
  // 5. NODE_ENV 기반 판단 (fallback)
  else if (process.env.NODE_ENV === 'production') {
    envFile = '.env.production';
    environment = '🏭 운영 환경';
  }
  else if (process.env.NODE_ENV === 'staging') {
    envFile = '.env.staging';
    environment = '🔄 스테이징 환경';
  }
  // 6. 기본 개발 환경
  else {
    envFile = '.env.development';
    environment = '🔧 개발 환경';
  }

  if (!skipEnvFile) {
    console.log(`환경: ${environment}`);

    // 환경 파일 로드
    const envPath = path.join(__dirname, '..', envFile);
    if (fs.existsSync(envPath)) {
      require('dotenv').config({ path: envPath, override: true });
      console.log(`✅ 환경 파일 로드: ${envFile}`);
    } else {
      console.warn(`⚠️ 환경 파일을 찾을 수 없습니다: ${envFile}`);
      console.log('Plesk UI 환경변수 또는 기본 환경변수를 사용합니다.');
    }
  }

  // 최종 데이터베이스 정보 출력 (비밀번호는 일부만)
  console.log(`📊 데이터베이스: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`);
  console.log(`👤 DB 사용자: ${process.env.DB_USER}`);
  console.log(`🌐 포트: ${process.env.PORT}`);
}

module.exports = loadEnvironmentConfig;