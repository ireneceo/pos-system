import { getApiBaseUrl } from '../config/api';
import { getAuthToken, clearAuthToken } from './auth';
import { getKioskToken, needsKioskHeader, clearKioskDevice } from './kioskDevice';
import { shouldDedupe, buildDedupeKey, dedupedFetch, invalidateDedupe } from './fetchDedupe';

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

// 컨텍스트("모자") 회수 감지 핸들러.
// 서버는 회수된 ctx 토큰에 401 을 주지 않는다 — 401 은 위 전역 자동 로그아웃을 트리거해
// "픽커로 복귀"가 아니라 강제 로그아웃이 되기 때문(설계 §4.3). 대신 200 + 이 헤더로 알린다.
let onContextFallbackHandler: (() => void) | null = null;
let fallbackNotified = false;

export function setOnContextFallbackHandler(handler: (() => void) | null): void {
  onContextFallbackHandler = handler;
  fallbackNotified = false;
}

/**
 * 알림 래치 해제 — **컨텍스트를 새로 바꿀 때마다 호출해야 한다.**
 *
 * 래치가 없으면 배너·네비게이션이 폭주하지만, 리셋이 없으면 반대로 **세션당 딱 한 번만** 울린다:
 * 모자 A 회수 → 배너 → 모자 B 착용 → **B 가 회수돼도 두 번째 배너가 안 뜬다**(요청은 조용히
 * 네이티브로 폴백돼 사용자는 이유를 모른 채 권한만 사라진 화면을 본다).
 */
export function resetContextFallbackNotice(): void {
  fallbackNotified = false;
}

// 같은 세션에서 여러 요청이 동시에 헤더를 물고 와도 **1회만** 알린다(배너·네비게이션 폭주 방지).
function notifyContextFallback(response: Response): void {
  if (fallbackNotified || !onContextFallbackHandler) return;
  try {
    if (response.headers.get('X-Context-Fallback') === 'revoked') {
      fallbackNotified = true;
      onContextFallbackHandler();
    }
  } catch {
    /* 헤더 접근 불가(opaque 응답 등) — 무시 */
  }
}

// 매장이 이 키오스크 등록을 해제했다 — 기기 토큰을 지우고 직원 로그인 화면으로 간다(한 번만).
let kioskRevokedHandled = false;
function onKioskRevoked(): void {
  if (kioskRevokedHandled) return;
  kioskRevokedHandled = true;
  clearKioskDevice();
  try { window.location.assign('/pos?kiosk_revoked=1'); } catch { /* ignore */ }
}

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
    let injectedAuth = '';
    if (includesApi && !isBypass) {
      const token = getAuthToken();
      if (token) {
        const headers = new Headers(init?.headers || {});
        if (!headers.has('Authorization')) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        resolvedInit = { ...(init || {}), headers };
        injectedAuth = headers.get('Authorization') || '';
      }
    }

    // 2-b) 등록된 키오스크 기기 토큰 — 주문·단말기·기기 확인 요청에만 싣는다(utils/kioskDevice).
    //      서버가 이 토큰으로 «키오스크» 를 판정한다(URL ?kiosk=1 은 화면 모양일 뿐). 직원 토큰과 별개.
    const kioskToken = includesApi ? getKioskToken() : null;
    const sentKiosk = !!kioskToken && needsKioskHeader(urlString);
    if (sentKiosk) {
      const headers = new Headers(resolvedInit?.headers || {});
      headers.set('X-Kiosk-Token', kioskToken as string);
      resolvedInit = { ...(resolvedInit || {}), headers };
    }

    // 3) GET dedupe — 같은 endpoint 가 짧은 시간 내 여러 useEffect 에서 호출되면
    //    단 1회만 네트워크로 보내고 응답을 공유한다. (페이지별 코드 변경 0)
    const method = (resolvedInit?.method || (typeof input !== 'string' && !(input instanceof URL) && (input as Request).method) || 'GET').toUpperCase();
    const resolvedUrl = typeof resolvedInput === 'string' ? resolvedInput : resolvedInput.toString();
    if (method === 'GET' && shouldDedupe(resolvedUrl)) {
      const key = buildDedupeKey(resolvedUrl, injectedAuth + (sentKiosk ? '|kiosk' : ''));
      // 공유 fetch 는 **호출자 signal 이 아니라 dedupe 가 만든 signal** 로 나간다.
      // 호출자 signal 은 구독 취소용으로만 쓰이고, 구독자가 전원 빠졌을 때만 실요청이 abort 된다.
      // (예전엔 리더 signal 이 그대로 실려, 리더가 언마운트하면 팔로워 전원이 AbortError 였다.)
      // ⚠ Request 객체에 내장된 signal 은 여기서 읽지 않는다 — 기존과 동일한 한계(범위 밖).
      const response = await dedupedFetch(
        key,
        resolvedInit?.signal ?? undefined,
        (sharedSignal) =>
          originalFetch(resolvedInput as RequestInfo, { ...(resolvedInit || {}), signal: sharedSignal })
      );
      if (response.status === 401 && includesApi && !isBypass && getAuthToken()) {
        const isCustomerOrMembership =
          urlString.includes('/api/customers/') || urlString.includes('/api/membership/');
        if (!isCustomerOrMembership) {
          console.log('[httpClient] 401 auto-logout. URL:', urlString);
          clearAuthToken();
          localStorage.removeItem('user');
          if (on401Handler) on401Handler();
        }
      }
      notifyContextFallback(response);
      if (sentKiosk && response.status === 401) onKioskRevoked();
      // dedupedFetch 가 이미 구독자별 clone 을 준다 — 여기서 다시 clone 하지 않는다.
      return response;
    }

    const response = await originalFetch(resolvedInput as RequestInfo, resolvedInit);

    // 3-b) 쓰기 뒤에는 GET 캐시를 비운다 — 이어지는 재조회가 쓰기 전 응답을 받지 않게(fetchDedupe 주석).
    if (method !== 'GET' && method !== 'HEAD' && includesApi) invalidateDedupe();

    // 4) 401 POS 자동 로그아웃 (POS 관리자 API 한정)
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

    // 5) 컨텍스트 회수 감지 (200 + X-Context-Fallback: revoked)
    notifyContextFallback(response);

    // 6) 키오스크 등록 해제(401 KIOSK_REVOKED) — 토큰을 지우고 직원 로그인 화면으로
    if (sentKiosk && response.status === 401) onKioskRevoked();

    return response;
  };
}
