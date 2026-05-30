// 세트메뉴 v2 공용 로직 (프론트) — 백엔드 dev-backend/utils/setMenu.js 와 로직 동일하게 유지.
// 빌더/주문 UI 가 함께 쓴다. (SET_MENU_REDESIGN.md §8~§10)

export interface SetGroupItem {
  product_id: number;
  qty?: number;
  upcharge?: number;
  soldOut?: boolean;
}
export interface SetGroup {
  id: string;
  label: string;
  type: 'fixed' | 'choice';
  min?: number;
  max?: number;
  items: SetGroupItem[];
}
export interface SelectedComponent {
  group_id: string;
  product_id: number;
  qty?: number;
  options?: string[];
  upcharge?: number;
}

// set_groups 우선, 없으면 레거시 set_items 를 fixed 그룹으로 폴백
export function resolveSetGroups(product: any): SetGroup[] {
  if (!product) return [];
  const sg = product.set_groups;
  if (Array.isArray(sg) && sg.length > 0) return sg;
  const si = product.set_items;
  if (Array.isArray(si) && si.length > 0) {
    return [{
      id: 'legacy',
      label: 'Set',
      type: 'fixed',
      items: si
        .map((i: any) => ({
          product_id: i.product_id != null ? i.product_id : i.menuItemId,
          qty: i.qty != null ? i.qty : (i.quantity != null ? i.quantity : 1),
        }))
        .filter((it: any) => it.product_id != null),
    }];
  }
  return [];
}

// 빌더 저장 전 검증. validProductIds = 허용 단품 id 집합(같은 매장 · 비-세트 · 활성).
export function validateSetGroups(setGroups: SetGroup[], validProductIds?: Set<number>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!Array.isArray(setGroups) || setGroups.length === 0) {
    return { valid: false, errors: ['세트는 최소 1개의 구성 슬롯이 필요합니다.'] };
  }
  setGroups.forEach((g, gi) => {
    const tag = `슬롯 ${gi + 1}`;
    if (!g || typeof g.label !== 'string' || !g.label.trim()) errors.push(`${tag}: 슬롯 이름이 필요합니다.`);
    if (g.type !== 'fixed' && g.type !== 'choice') errors.push(`${tag}: 타입이 올바르지 않습니다.`);
    const items = Array.isArray(g.items) ? g.items : [];
    if (items.length === 0) errors.push(`${tag}: 구성품을 최소 1개 선택하세요.`);
    items.forEach((it, ii) => {
      const pid = Number(it?.product_id);
      if (!Number.isInteger(pid)) errors.push(`${tag} 항목 ${ii + 1}: 잘못된 상품입니다.`);
      else if (validProductIds && !validProductIds.has(pid)) errors.push(`${tag} 항목 ${ii + 1}: 활성 단품이 아닙니다.`);
      if (it?.upcharge != null && (isNaN(Number(it.upcharge)) || Number(it.upcharge) < 0)) errors.push(`${tag} 항목 ${ii + 1}: 추가금은 0 이상이어야 합니다.`);
    });
    if (g.type === 'choice') {
      const min = g.min == null ? 1 : Number(g.min);
      const max = g.max == null ? 1 : Number(g.max);
      // min=0 허용(선택적 슬롯). max ≥ 1, min ≤ max ≤ 구성품수.
      if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < 1 || max < min || max > items.length) {
        errors.push(`${tag}: 택1 범위(min ${min}/max ${max})가 올바르지 않습니다.`);
      }
    }
  });
  return { valid: errors.length === 0, errors };
}

// 구성품 soldOut 기반 세트 가용성. soldOutMap[product_id] = true 면 품절.
export function computeSetAvailability(
  setGroups: SetGroup[],
  soldOutMap: Record<number, boolean> = {}
): { available: boolean; reason: string | null; groups: SetGroup[] } {
  const groups = resolveSetGroups({ set_groups: setGroups });
  let available = true;
  let reason: string | null = null;
  const out = groups.map(g => {
    const items = (g.items || []).map(it => ({ ...it, soldOut: !!soldOutMap[it.product_id] }));
    if (g.type === 'fixed') {
      if (items.some(it => it.soldOut)) { available = false; reason = 'component'; }
    } else if (items.length > 0 && items.every(it => it.soldOut)) {
      available = false; reason = 'component';
    }
    return { ...g, items };
  });
  return { available, reason, groups: out };
}

// 주문 선택 유효성 (담기 버튼 활성 판단). requiredOptionOk(component) -> boolean.
export function isSetSelectionValid(
  setGroups: SetGroup[],
  selected: SelectedComponent[],
  requiredOptionOk?: (c: SelectedComponent) => boolean
): boolean {
  const groups = resolveSetGroups({ set_groups: setGroups });
  const sel = Array.isArray(selected) ? selected : [];
  for (const g of groups) {
    const picks = sel.filter(c => String(c.group_id) === String(g.id));
    if (g.type === 'fixed') {
      for (const it of g.items || []) {
        if (!picks.some(p => Number(p.product_id) === Number(it.product_id))) return false;
      }
    } else {
      const min = g.min == null ? 1 : Number(g.min);
      const max = g.max == null ? 1 : Number(g.max);
      if (picks.length < min || picks.length > max) return false;
    }
    if (requiredOptionOk) {
      for (const p of picks) if (!requiredOptionOk(p)) return false;
    }
  }
  return true;
}

// 합계 = 세트 기본가 + 선택 upcharge 합
export function computeSetTotal(setGroups: SetGroup[], basePrice: number, selected: SelectedComponent[]): number {
  const groups = resolveSetGroups({ set_groups: setGroups });
  const upMap = new Map<string, number>();
  groups.forEach(g => (g.items || []).forEach(it => upMap.set(`${g.id}:${it.product_id}`, Number(it.upcharge) || 0)));
  let total = Number(basePrice) || 0;
  (selected || []).forEach(c => { total += upMap.get(`${c.group_id}:${c.product_id}`) || 0; });
  return Math.round(total * 100) / 100;
}
