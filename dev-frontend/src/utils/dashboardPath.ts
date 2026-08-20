/**
 * 역할 → 대시보드 경로 단일 소스.
 *
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §6.1. LoginPage 의 role 스위치를 여기로 추출했다 —
 * 로그인 직후 이동 / 컨텍스트 전환 후 이동 / 다른 탭 팔로우 이동이 **같은 규칙**을 써야 하기 때문.
 * 세 곳이 각자 스위치를 들고 있으면 역할이 하나 늘 때 한 곳만 고쳐져 조용히 갈라진다.
 *
 * ⚠ 필드 규약은 기존 혼용을 그대로 따른다(AuthContext user 는 camelCase `restaurantId`).
 *   새 규약을 도입하지 않는다 — 프론트 68파일이 기존 규약을 읽고 있다.
 */

export interface DashboardIds {
  restaurantId?: number | string | null;
}

/**
 * 역할과 소속 id 로 진입 대시보드 경로를 만든다.
 * 매장 소속이 없는 RA/Staff 는 `/pos` 로 보낸다 — PosRootRedirect 가 "매장 미배정" 화면을
 * 그리며, 여기서 매장 1번으로 새는 것을 막는다(기존 LoginPage 주석의 의도 그대로).
 */
export function getDashboardPath(role?: string | null, ids: DashboardIds = {}): string {
  const rid = ids.restaurantId;

  switch (role) {
    case 'System Admin':
      return '/pos/admin/dashboard';
    case 'Foodcourt General':
      return '/pos/foodcourt/general/dashboard';
    case 'Brand General':
      return '/pos/brand/general/dashboard';
    case 'Foodcourt Manager':
      return '/pos/foodcourt/dashboard';
    case 'Brand Manager':
      return '/pos/brand/dashboard';
    case 'Restaurant Admin':
    case 'Staff':
      return rid ? `/restaurant/${rid}/dashboard` : '/pos';
    case 'Restaurant Owner':
      return '/pos/owner/dashboard';
    case 'Supplier Admin':
      return '/pos/supplier/dashboard';
    default:
      return '/pos/basic';
  }
}

/**
 * 전체화면/현장 라우트 — 다른 탭에서 컨텍스트가 바뀌어도 **여기서는 조용히 이동시키면 안 된다**.
 * 결제·주방 인쇄가 진행 중일 수 있어, 화면을 갈아치우는 대신 차단 안내를 먼저 보여준다.
 * (설계 §4.7 / §6.3 — 🔒 인쇄 안전 직결)
 */
export const FULLSCREEN_ROUTE_PREFIXES = [
  '/pos-terminal',
  '/kitchen',
  '/display',
  '/checkout-display',
  '/floor-plan'
];

export function isFullscreenRoute(pathname: string): boolean {
  return FULLSCREEN_ROUTE_PREFIXES.some((p) => pathname.startsWith(p) || pathname.includes(p));
}
