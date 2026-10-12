/**
 * 데모 계정 묶음 — 선택 화면에서 데모 5개를 오가기 + 상황판 «시험 계정으로 열기»(/dev-login) (2026-10-11).
 *
 * 둘 다 **다른 계정으로 새로 로그인**하는 일이다(모자 전환이 아님). 그래서 토큰만 바꾸고
 * 페이지를 통째로 다시 연다 — 이전 계정의 매장 정보·소켓·화면 상태가 남지 않게.
 * 부팅 복원(AuthContext)이 토큰으로 사용자·선택 목록을 다시 읽는다 = 보통 로그인과 같은 저장소.
 *
 * 데모 키는 로그인 화면 데모 카드와 같은 공개 키다(비밀번호 없음 · 서버가 데모 여부·실매장 연결을 다시 검사).
 */
import { setAuthToken } from './auth';
import { getDashboardPath } from './dashboardPath';

export interface DemoBundleAccount {
  key: string;
  role: string;
  glyph: string;
}

// 순서 = 로그인 화면 데모 카드와 같음. 데모 계정마다 역할이 하나라 역할로 «지금 계정»을 가린다.
export const DEMO_BUNDLE: DemoBundleAccount[] = [
  { key: 'demo_restaurant_admin', role: 'Restaurant Admin', glyph: '▦' },
  { key: 'demo_brand_general', role: 'Brand General', glyph: '◐' },
  { key: 'demo_foodcourt_general', role: 'Foodcourt General', glyph: '□' },
  { key: 'demo_multi_owner', role: 'Restaurant Owner', glyph: '◯' },
  { key: 'demo_supplier_admin', role: 'Supplier Admin', glyph: '≡' }
];

/** 지금 로그인한 계정이 데모 5개 중 하나인가 (demo-…@purplehere.com + 데모/시험 표시). */
export function isDemoBundleUser(user: { email?: string | null; isDemo?: boolean; isTest?: boolean } | null | undefined): boolean {
  const email = (user?.email || '').toLowerCase();
  return !!user && (!!user.isDemo || !!user.isTest) && email.startsWith('demo-') && email.endsWith('@purplehere.com');
}

interface LoginResponseData {
  token?: string;
  user?: { role?: string; restaurant_id?: number | string | null };
}

/** 로그인 응답(토큰)을 저장하고 그 주소로 페이지를 새로 연다. */
export function applyLoginAndReload(data: LoginResponseData, next?: string): void {
  if (!data?.token) throw new Error('No token in login response');
  setAuthToken(data.token);
  try { localStorage.removeItem('user'); } catch { /* ignore */ }
  const path = next || getDashboardPath(data.user?.role, { restaurantId: data.user?.restaurant_id ?? null });
  window.location.replace(path);
}

/** 데모 키로 다른 데모 계정에 들어간다. 실패하면 서버가 준 이유를 던진다. */
export async function switchToDemoAccount(key: string): Promise<void> {
  const res = await fetch('/api/auth/demo-login', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key })
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.success || !body.data) {
    throw new Error(body?.error?.message || body?.message || `Demo login failed (${res.status})`);
  }
  applyLoginAndReload(body.data);
}
