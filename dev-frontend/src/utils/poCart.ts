/**
 * 발주 장바구니 — 저장 키·줄 키·판매처 채우기의 **단일 소스** (2026-10-09 Fable 판정 C-1 #6)
 *
 * 장바구니는 발주 화면(NewPurchaseOrderPage)과 재고 화면 «카트에 담기»(InventoryManager)가 같이 쓴다.
 * 예전엔 두 곳이 키를 따로 만들어(재고 화면 `pi:${id}` · 발주 화면 `pi-${id}`) 판매처 목록도 비운 채 저장했다 →
 * 발주 화면은 판매처 없는 줄을 건너뛰어 «Cart (1)» 인데 줄이 안 보이고 보내지지도 않았다(dev 재현 2026-10-09).
 * 이제 두 곳이 이 파일의 함수만 쓰고, 발주 화면은 열릴 때 판매처가 빈 줄을 내 품목 목록으로 채운다.
 */

export interface PoCartKeySource {
  id?: number;
  product_id?: number;
  brand_product_id?: number;
  product_ingredient_id?: number;
}

/** 구매자별 장바구니 저장 키 — type 은 발주 화면 buyerEntity.type('restaurants' | 'brands' | 'foodcourts') */
export function poCartStorageKey(type: string, id: number | string): string {
  return `po-cart:${type}:${id}`;
}

/**
 * 재료가 아닌 줄의 네임스페이스 키. 다른 테이블의 id 라 종류별로 갈라야 한다
 * (재료 3번과 프로덕트 3번이 같은 줄로 합쳐지면 엉뚱한 물건을 주문한다). 재료 줄이면 null.
 */
export function poCartNamespacedKey(row: PoCartKeySource): string | null {
  return row.product_id ? `prod-${row.product_id}`
    : row.brand_product_id ? `bprod-${row.brand_product_id}`
    : row.product_ingredient_id ? `pi-${row.product_ingredient_id}`
    : null;
}

interface SellerLike { id: number; is_preferred?: boolean }
interface MineLike extends PoCartKeySource { id: number; sellers: SellerLike[] }
interface CartLike extends PoCartKeySource {
  cart_key: string;
  ingredient_id: number;
  selected_seller_id: number;
  quantity: number;
  available_sellers: SellerLike[];
  selected_options?: unknown[];
}

/** 이 카트 줄이 가리키는 내 품목 줄 */
function findMine<M extends MineLike>(row: CartLike, mine: M[]): M | undefined {
  if (row.product_ingredient_id) return mine.find(m => m.product_ingredient_id === row.product_ingredient_id);
  if (row.product_id) return mine.find(m => m.product_id === row.product_id);
  if (row.brand_product_id) return mine.find(m => m.brand_product_id === row.brand_product_id);
  return mine.find(m => !m.product_ingredient_id && !m.product_id && !m.brand_product_id && m.id === row.ingredient_id);
}

/**
 * 판매처가 빈(또는 고른 판매처가 목록에 없는) 줄을 내 품목 목록으로 채우고, 키를 표준 키로 맞춘 뒤 같은 키 줄은 수량을 합친다.
 * 바뀐 게 없으면 **같은 배열**을 돌려준다(불필요한 저장·렌더 방지). 내 품목에서 못 찾은 줄은 그대로 둔다.
 */
export function hydratePoCart<C extends CartLike, M extends MineLike>(cart: C[], mine: M[]): C[] {
  if (!cart.length || !mine.length) return cart;
  let changed = false;
  const fixed = cart.map((row) => {
    const hasSeller = row.available_sellers?.some(s => s.id === row.selected_seller_id);
    if (hasSeller) return row;
    const m = findMine(row, mine);
    if (!m || !m.sellers?.length) return row;
    const preferred = m.sellers.find(s => s.is_preferred) || m.sellers[0];
    changed = true;
    const ns = poCartNamespacedKey(row);
    return {
      ...row,
      ingredient_id: m.id,
      cart_key: ns || row.cart_key,
      available_sellers: m.sellers,
      selected_seller_id: preferred.id,
    };
  });
  if (!changed) return cart;
  // 같은 키(옵션 없는 줄)끼리 합친다 — 재고 화면에서 담고 발주 화면에서 또 담으면 두 줄이 되던 것
  const out: C[] = [];
  for (const row of fixed) {
    const dup = (!row.selected_options || row.selected_options.length === 0)
      ? out.find(r => r.cart_key === row.cart_key && (!r.selected_options || r.selected_options.length === 0))
      : undefined;
    if (dup) dup.quantity = (dup.quantity || 0) + (row.quantity || 0);
    else out.push({ ...row });
  }
  return out;
}
