/**
 * 환경별 API URL 자동 설정
 * 호스트명에 따라 적절한 백엔드 서버 URL을 반환
 */

// API URL is set at build time from REACT_APP_API_URL environment variable
// Webpack will replace process.env.REACT_APP_API_URL with actual value
const getApiUrl = () => process.env.REACT_APP_API_URL || '';

function getEnvironmentName() {
  const hostname = window.location.hostname;

  if (hostname.includes('orderhere.center')) {
    return 'production';
  }

  if (hostname.includes('orderhere.wor-pro.com')) {
    return 'staging';
  }
  
  if (hostname.includes('github.dev')) {
    return 'codespace';
  }
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'local-development';
  }
  
  return 'unknown';
}

// 환경 정보 콘솔 출력 (항상 출력하여 문제 진단)
console.log('🌍 Environment Detection:');
console.log('  - Hostname:', window.location.hostname);
console.log('  - Protocol:', window.location.protocol);
console.log('  - Origin:', window.location.origin);
console.log('  - Environment Name:', getEnvironmentName());
console.log('  - API URL:', getApiUrl());
console.log('  - NODE_ENV:', process.env.NODE_ENV);

export const API_URL = getApiUrl();
export const ENVIRONMENT = getEnvironmentName();

// Socket.IO 연결 URL
export const SOCKET_URL = API_URL;

export default {
  API_URL,
  ENVIRONMENT,
  SOCKET_URL
};