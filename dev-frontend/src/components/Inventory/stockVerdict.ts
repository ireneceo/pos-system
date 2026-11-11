/**
 * 재고 화면의 «상태» 판정 — 한 함수 (2026-11-10 Fable 설계 .claude/fable-design-20261110-stock-simple-reorder.md §2-1)
 *   Irene «스톡없다고 표시되게 하는게 도대체 무슨 기준이야 … 재고 몇 개 이하면 발주하는 거 헷갈리지 않게»
 *   배지 · 상태 필터 · 띠 숫자가 전부 이 함수를 쓴다. 옛 Normal/Low/Out(stock_status)을 화면에 직접 쓰지 않는다.
 *
 *   기준 = 품목마다 «발주 기준»(min_stock) 숫자 하나. 서버 reorderMath 가 같은 규칙으로 단계를 낸다:
 *     out(가용 ≤ 0) → order_now(가용 + 오는 중 ≤ 발주 기준) → soon(7일 안에 기준 도달) → ok / no_basis
 */
import type { SuggestionRow } from './hooks/useBulkOrder';

// 'off' = 재고아이템이 꺼짐(is_active=0 · Stock Items 에서 Deactivate). 발주 판정(서버)이 세지 않으므로
//   목록에서도 «꺼짐» 으로만 보이고 어느 상태 필터·띠 숫자에도 들지 않는다 — «전체» 에서만 보인다 (2026-11-10 Irene «탭을 누르면 나와야 하는 리스트에 안나와»)
export type StockVerdict = 'out' | 'order_now' | 'soon' | 'ok' | 'no_basis' | 'incoming' | 'off';

interface VerdictInput {
  id: number;
  current_stock: number;
  min_stock: number;
  stock_status?: string;
  on_order_quantity?: number;
  is_active?: boolean | number | null;
}

/**
 * @param isIngredient  재료 목록 행이면 true(전망 결과를 쓴다) · 일반재고(General Stock)면 false
 * @param loaded        전망(/purchase-orders/suggestions)을 읽었는가 — 못 읽었으면 옛 필드로 떨어진다
 */
export function stockVerdict(
  item: VerdictInput,
  sugg: SuggestionRow | undefined,
  noBasisIds: Set<number> | undefined,
  loaded: boolean,
  isIngredient: boolean,
): StockVerdict {
  if (item.is_active === false || item.is_active === 0) return 'off';
  const min = Number(item.min_stock) || 0;
  const stock = Number(item.current_stock) || 0;
  if (isIngredient && loaded) {
    if (sugg && sugg.status) return sugg.status;
    if (noBasisIds && noBasisIds.has(item.id)) return 'no_basis';
    if (min > 0 && stock <= min && Number(item.on_order_quantity) > 0) return 'incoming';
    return 'ok';
  }
  // 일반재고(또는 전망 못 읽음): 서버 stock_status — out_of_stock(재고 ≤ 0) · low_stock(재고 ≤ 발주 기준) — 와 같은 규칙
  const status = item.stock_status || (stock <= 0 ? 'out_of_stock' : (min > 0 && stock <= min ? 'low_stock' : 'normal'));
  if (status === 'out_of_stock') return 'out';
  if (status === 'low_stock') return 'order_now';
  return min > 0 ? 'ok' : 'no_basis';
}

/** 배지 색(지금 띠·배지가 쓰는 값 그대로) */
export const VERDICT_COLOR: Record<StockVerdict, { fg: string; bg: string }> = {
  out: { fg: '#B91C1C', bg: '#FEE2E2' },
  order_now: { fg: '#B45309', bg: '#FEF3C7' },
  soon: { fg: '#854D0E', bg: '#FEF9C3' },
  ok: { fg: '#047857', bg: '#D1FAE5' },
  no_basis: { fg: '#4B5563', bg: '#F1F4F8' },
  incoming: { fg: '#075985', bg: '#E0F2FE' },
  off: { fg: '#6B7280', bg: '#E5E7EB' },
};

/** 상태 필터 값(기존 fs_* 그대로 — 아침 알림 ?filter=fs_out 링크 보존) → 판정 */
export const FILTER_TO_VERDICT: Record<string, StockVerdict[]> = {
  fs_out: ['out'],
  fs_order_now: ['order_now'],
  fs_soon: ['soon'],
  fs_no_basis: ['no_basis'],
};
