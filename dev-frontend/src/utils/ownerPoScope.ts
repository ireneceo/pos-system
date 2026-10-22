/**
 * 오너의 발주 매장 범위 (2026-09-24 Fable «오너 = 슈퍼바이저» → 2026-10-04 Fable 판정 owner-po-on-behalf ① 로 갱신)
 *
 * 오너는 소유 매장 하나를 골라 **그 매장 자격으로** 발주를 보고·만들고·제출·취소한다(발주 주인은 항상 매장).
 * 서버(middleware/buyerScope.js)가 `?entity_type=restaurant&entity_id=N` 을 받으면 ownership 연결을 확인한 뒤
 * OWNER_ACTING_ROUTES 만 그 매장으로 풀어 준다(10-22 부터 그 매장 공급업체 관리도). 수령·반품·재료 연결은 403.
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

/**
 * 오너의 공급업체 화면 범위 (2026-10-22 Fable 설계 owner-supplier-management §3-E · Irene «권고대로»)
 *
 * «내 공통 업체(전 매장)» = 매장 지정 없이 오너 자기 이름의 업체(소유 매장 전부가 상속) — 0.
 * 매장 N = 그 매장으로 전환해 매장 관리자와 같은 화면(업체·상품·가격·계약). 재고아이템 연결은 서버가 계속 막는다.
 * 매장을 고르면 발주 화면과 같은 값(ownerPoRestaurantId)도 맞춘다 — «지금 보는 매장» 은 하나.
 */
const SUPPLIER_KEY = 'ownerSupplierScope';
export const OWNER_SUPPLIER_COMMON = 0;

export function getOwnerSupplierScope(): number {
  try {
    const v = sessionStorage.getItem(SUPPLIER_KEY);
    const n = v != null ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : OWNER_SUPPLIER_COMMON;
  } catch {
    return OWNER_SUPPLIER_COMMON;
  }
}

export function setOwnerSupplierScope(v: number): void {
  try { sessionStorage.setItem(SUPPLIER_KEY, String(v > 0 ? v : OWNER_SUPPLIER_COMMON)); } catch { /* 저장 불가 브라우저 — 이번 화면에서만 유지 */ }
  if (v > 0) setOwnerPoRestaurantId(v);
}

/** 오너가 공급업체 화면에서 매장을 골랐으면 그 매장 번호, 아니면(공통·오너 아님) null. */
export function ownerSupplierActingRid(role?: string | null): number | null {
  if (!isOwnerRole(role)) return null;
  const v = getOwnerSupplierScope();
  return v > 0 ? v : null;
}

/** 공급업체 화면의 구매자 주소에 고른 매장을 붙인다. 공통 범위·오너 아님이면 그대로. */
export function withOwnerSupplierScope(url: string, role?: string | null): string {
  const rid = ownerSupplierActingRid(role);
  if (!rid) return url;
  return `${url}${url.includes('?') ? '&' : '?'}entity_type=restaurant&entity_id=${rid}`;
}
