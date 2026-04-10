/**
 * 모바일 고객 전용 fetch wrapper
 *
 * - localStorage `mobile_token` 자동 주입
 * - POS 관리자 토큰(`auth_token`)과 분리
 * - 401 응답 시 mobile_token 만 정리 (POS 세션은 건드리지 않음)
 *
 * 사용: import { mobileFetch } from '../utils/mobileApi';
 *      const res = await mobileFetch('/api/customers/stats/123');
 */

// 모바일 토큰은 레스토랑 slug별로 스코프 분리
// - /mobile/:slug 경로: 'mobile_token:<slug>'
// - 그 외: 'mobile_token' (하위 호환, 실제로는 모바일 페이지에서만 호출됨)
function getCurrentMobileSlug(): string | null {
  if (typeof window === 'undefined') return null;
  const m = window.location.pathname.match(/\/mobile\/([^/]+)/);
  return m ? m[1] : null;
}

function mobileTokenKey(): string {
  const slug = getCurrentMobileSlug();
  return slug ? `mobile_token:${slug}` : 'mobile_token';
}

export function getMobileToken(): string | null {
  try {
    return localStorage.getItem(mobileTokenKey());
  } catch {
    return null;
  }
}

export function setMobileToken(token: string): void {
  try {
    localStorage.setItem(mobileTokenKey(), token);
  } catch {
    /* ignore */
  }
}

export function clearMobileToken(): void {
  try {
    localStorage.removeItem(mobileTokenKey());
  } catch {
    /* ignore */
  }
}

interface MobileFetchInit extends RequestInit {
  /** 토큰 주입 강제 비활성화 (공개 API용) */
  skipAuth?: boolean;
}

export async function mobileFetch(input: string, init: MobileFetchInit = {}): Promise<Response> {
  const { skipAuth, ...rest } = init;
  const headers = new Headers(rest.headers || {});

  // 모바일 토큰 주입 (있을 때만)
  if (!skipAuth) {
    const token = getMobileToken();
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  if (!headers.has('Content-Type') && rest.body) {
    headers.set('Content-Type', 'application/json');
  }

  // window.fetch는 AuthContext 인터셉터에 의해 패치되어 있음
  // 인터셉터는 customer/mobile 경로를 publicPath로 인식하여 POS 토큰을 주입하지 않음
  // 401 응답 시에도 POS 세션을 건드리지 않음 (이미 보호됨)
  const response = await window.fetch(input, { ...rest, headers });

  // 401 = 모바일 토큰 만료/무효 → mobile_token만 정리
  if (response.status === 401 && getMobileToken()) {
    clearMobileToken();
  }

  return response;
}
