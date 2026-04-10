/**
 * 인증 토큰 단일 진입점 (POS 관리자용)
 *
 * - 모든 코드는 localStorage 키를 직접 만지지 말고 이 헬퍼를 사용한다
 * - dead-key 버그 방지 (예: 'token' vs 'auth_token' 혼용)
 * - 향후 토큰 저장소 변경 시 한 곳만 수정
 *
 * 모바일 고객 토큰은 별도 (`mobile/utils/mobileApi.ts`의 mobileToken 헬퍼 사용)
 */

const AUTH_TOKEN_KEY = 'auth_token';

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAuthToken(token: string): void {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function clearAuthToken(): void {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Authorization 헤더 객체 생성 헬퍼
 * 토큰이 없으면 빈 객체 반환
 */
export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
