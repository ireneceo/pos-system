/**
 * 알림 버튼의 «받는 자격(ctx)» ↔ 지금 로그인 상태 · 고를 수 있는 모자 대조 — 한 곳.
 * (2026-10-22 Fable 설계 notification-addressee §4-3 · 백엔드 utils/notificationLinks.js ctxOf 와 짝)
 *
 * ctx = «entity_type:entity_id:role» — 예 «restaurant:38:Restaurant Admin» · «brand:2:Brand General»
 *       · «owner:38:Restaurant Owner»(오너는 사람 단위 카드라 매장 번호는 대조에 안 쓴다) · «system::System Admin».
 * /go 진입 화면과 선택 화면 안내가 같이 쓴다(목록≠판정 갈라짐 방지).
 */
import type { User, UserContextOption } from '../contexts/AuthContext';

export interface ParsedCtx {
  entityType: string;
  entityId: string | null;
  role: string;
}

export function parseCtx(raw: string | null | undefined): ParsedCtx | null {
  if (!raw) return null;
  const parts = String(raw).split(':');
  if (parts.length < 3) return null;
  const [entityType, id, ...rest] = parts;
  const role = rest.join(':');
  if (!entityType || !role) return null;
  return { entityType, entityId: id && /^\d+$/.test(id) ? id : null, role };
}

// 이 역할이면 엔티티 번호가 달라도 같은 자리다 — 브랜드 총괄은 소유한 브랜드 전부를 한 화면에서 본다.
const ROLE_ONLY = new Set(['Brand General', 'Foodcourt General', 'Restaurant Owner', 'Supplier Admin', 'Supplier Staff', 'System Admin', 'Referral Partner']);

function sameEntity(ctx: ParsedCtx, entityType: string, entityId: string | number | null | undefined): boolean {
  if (ROLE_ONLY.has(ctx.role)) return true;
  if (ctx.entityType !== entityType) return false;
  if (!ctx.entityId) return true;
  return entityId != null && String(entityId) === ctx.entityId;
}

const SUPPLIER_ROLES = new Set(['Supplier Admin', 'Supplier Staff']);

/** 지금 토큰이 이미 그 자격인가 → 확인 없이 바로 연다. */
export function isCurrentContext(ctx: ParsedCtx, user: User | null): boolean {
  if (!user) return false;
  // 공급업체 자리는 관리자·직원이 같은 «공급업체» 자격으로 받는다
  if (SUPPLIER_ROLES.has(ctx.role) && SUPPLIER_ROLES.has(user.role)) return true;
  if (user.role !== ctx.role) return false;
  if (ctx.entityType === 'restaurant') return sameEntity(ctx, 'restaurant', user.restaurantId ?? user.restaurant_id);
  if (ctx.entityType === 'brand') return sameEntity(ctx, 'brand', user.brand_id);
  if (ctx.entityType === 'foodcourt') return sameEntity(ctx, 'foodcourt', user.foodcourt_id);
  return true; // owner · supplier · system — 역할이 곧 자리
}

/** 고를 수 있는 모자 중 그 자격 카드. 없으면 null. */
export function findContextCard(ctx: ParsedCtx, cards: UserContextOption[]): UserContextOption | null {
  const want = ctx.entityType === 'owner' ? 'owner' : ctx.entityType;
  return cards.find((c) => c.role === ctx.role && (
    want === 'owner' ? c.entity_type === 'owner' : sameEntity(ctx, c.entity_type, c.entity_id)
  )) || null;
}

/** 이동할 앱 안 경로 검사 — / 로 시작, // · javascript: 금지(LoginPage 와 같은 규칙). */
export function safeInternalPath(raw: string | null | undefined): string {
  const p = (raw || '').trim();
  if (!p.startsWith('/') || p.startsWith('//') || p.toLowerCase().includes('javascript:')) return '/pos';
  return p;
}
