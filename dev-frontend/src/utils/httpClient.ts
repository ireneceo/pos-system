import { getApiBaseUrl } from '../config/api';
import { getAuthToken, clearAuthToken } from './auth';

// POS 관리자 인증을 건너뛸 경로
// - 토큰 자동 주입 안 함
// - 401 자동 로그아웃 안 함
const POS_BYPASS_PATHS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/signup',
  '/api/auth/logout',
  '/api/public/',
  '/api/customers/auth',
  '/api/customers/register',
  '/api/customers/forgot-password',
  '/api/customers/reset-password',
  '/api/customers/find-email',
  '/api/customers/verify-reset-token',
  '/api/mobile/',
  '/api/membership/settings/',
  '/api/restaurants/slug/',
];

let on401Handler: (() => void) | null = null;

// AuthContext에서 로그아웃 콜백 등록
export function setOn401Handler(handler: (() => void) | null): void {
  on401Handler = handler;
}

// 앱 최상단에서 단 한 번만 호출. StrictMode/HMR에서도 안전.
export function installFetchInterceptor(): void {
  if ((window as any).__httpClientInstalled) return;
  (window as any).__httpClientInstalled = true;

  const originalFetch = window.fetch.bind(window);
  const API_BASE_URL = getApiBaseUrl();

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const urlString = typeof input === 'string' ? input : (input as Request | URL).toString();
    const startsWithApi = urlString.startsWith('/api/');
    const includesApi = urlString.includes('/api/');
    const isBypass = POS_BYPASS_PATHS.some((p) => urlString.includes(p));

    // 1) API_BASE_URL 프리픽스 (상대 /api/* 만, BASE 값이 있을 때만)
    let resolvedInput: RequestInfo | URL = input;
    if (startsWithApi && API_BASE_URL) {
      resolvedInput = `${API_BASE_URL}${urlString}`;
    }

    // 2) POS 관리자 토큰 자동 주입
    let resolvedInit = init;
    if (includesApi && !isBypass) {
      const token = getAuthToken();
      if (token) {
        const headers = new Headers(init?.headers || {});
        if (!headers.has('Authorization')) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        resolvedInit = { ...(init || {}), headers };
      }
    }

    const response = await originalFetch(resolvedInput as RequestInfo, resolvedInit);

    // 3) 401 POS 자동 로그아웃 (POS 관리자 API 한정)
    if (response.status === 401 && includesApi && !isBypass && getAuthToken()) {
      // customer/* 와 membership/* 은 POS 세션을 건드리지 않음 (모바일 고객 전용)
      const isCustomerOrMembership =
        urlString.includes('/api/customers/') || urlString.includes('/api/membership/');
      if (!isCustomerOrMembership) {
        console.log('[httpClient] 401 auto-logout. URL:', urlString);
        clearAuthToken();
        localStorage.removeItem('user');
        if (on401Handler) on401Handler();
      }
    }

    return response;
  };
}
