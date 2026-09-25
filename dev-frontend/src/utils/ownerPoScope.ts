/**
 * 오너의 발주 «보기» 범위 (2026-09-24 Fable 판정 «오너 = 슈퍼바이저» §2-A)
 *
 * 오너는 소유 매장들의 발주를 **보고 승인·반려만** 한다 — 만들거나 고치지 않는다(발주 주인은 항상 매장).
 * 서버(middleware/buyerScope.js)가 `?entity_type=restaurant&entity_id=N` 을 받으면 ownership 연결을 확인한 뒤
 * **GET /api/purchase-orders*** 만 그 매장으로 풀어 준다. 쓰기는 오너 전환이면 403.
 *
 * 고른 매장은 탭 단위(sessionStorage)로 기억한다 — 목록·상세·인쇄 화면이 같은 값을 본다.
 */
const KEY = 'ownerPoRestaurantId';

export const isOwnerRole = (role?: string | null): boolean => role === 'Restaurant Owner';

export function getOwnerPoRestaurantId(): number | null {
  try {
    const v = sessionStorage.getItem(KEY);
    const n = v ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function setOwnerPoRestaurantId(id: number): void {
  try { sessionStorage.setItem(KEY, String(id)); } catch { /* 저장 불가 브라우저 — 이번 화면에서만 유지 */ }
}

/** 오너면 발주 조회 URL 에 고른 소유 매장을 붙인다. 오너가 아니거나 아직 안 골랐으면 그대로. */
export function withOwnerPoScope(url: string, role?: string | null): string {
  if (!isOwnerRole(role)) return url;
  const rid = getOwnerPoRestaurantId();
  if (!rid) return url;
  return `${url}${url.includes('?') ? '&' : '?'}entity_type=restaurant&entity_id=${rid}`;
}

/**
 * 오너 발주 목록에서 고른 보기 — 0 = 소유 매장 전체 한 표(§2-B, 기본), 그 밖은 한 매장.
 * 상세·인쇄는 그 행의 매장으로 위 ownerPoRestaurantId 를 맞춘 뒤 연다(서버 상세는 매장 전환으로만 연다).
 */
const LIST_KEY = 'ownerPoListView';
export const OWNER_PO_ALL = 0;

export function getOwnerPoListView(): number {
  try {
    const v = sessionStorage.getItem(LIST_KEY);
    const n = v != null ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) ? n : OWNER_PO_ALL;
  } catch {
    return OWNER_PO_ALL;
  }
}

export function setOwnerPoListView(v: number): void {
  try { sessionStorage.setItem(LIST_KEY, String(v)); } catch { /* 저장 불가 브라우저 — 이번 화면에서만 유지 */ }
}
