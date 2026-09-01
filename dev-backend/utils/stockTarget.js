/**
 * 재고 타깃 단일 검증 — "넷 중 정확히 하나".
 *
 * 발주 라인(`purchase_order_items`)과 공급처 연결(`ingredient_seller_products`)은
 * 아래 넷 중 **정확히 하나**를 가리킨다:
 *   ingredient_id          RA/브랜드 재료
 *   product_ingredient_id  BG 재고아이템
 *   product_id             RA 레시피 없는 프로덕트 (= 그 자체가 재고아이템, 수량이 프로덕트에 산다)
 *   brand_product_id       BG 레시피 없는 브랜드 프로덕트
 *
 * 왜 필요한가 (2026-09-01):
 *   프로덕트 타깃 2개를 새로 열면서 "둘 다 채운 행"이 생기면 입고가 두 곳으로 가거나
 *   아무 데도 안 가는 조용한 결함이 된다. 검증을 쓰는 곳마다 따로 적으면 한 곳이 빠지므로
 *   **쓰기 경로가 전부 이 함수를 통과**하게 하고, 같은 불변식을 인스펙션 하니스가 DB 에서 다시 잰다.
 */

const TARGET_KEYS = ['ingredient_id', 'product_ingredient_id', 'product_id', 'brand_product_id'];

const KIND_BY_KEY = {
  ingredient_id: 'ingredient',
  product_ingredient_id: 'product_ingredient',
  product_id: 'product',
  brand_product_id: 'brand_product',
};

const KEY_BY_KIND = Object.fromEntries(Object.entries(KIND_BY_KEY).map(([k, v]) => [v, k]));

/** 값이 "채워졌다"고 볼 것인지. 0·''·null·undefined·NaN 은 비어 있는 것으로 본다. */
function filled(v) {
  if (v === null || v === undefined || v === '') return false;
  const n = Number(v);
  return Number.isFinite(n) && n > 0;
}

/**
 * 행(또는 생성 attrs)에서 재고 타깃을 뽑는다.
 * @param {object} row 넷 중 하나가 채워진 객체
 * @returns {{kind:string, key:string, id:number}}
 * @throws {Error} 0개이거나 2개 이상이면 던진다 — 조용히 넘어가지 않는다.
 */
function resolveStockTarget(row) {
  const hit = TARGET_KEYS.filter((k) => filled(row && row[k]));
  if (hit.length === 1) {
    const key = hit[0];
    return { kind: KIND_BY_KEY[key], key, id: Number(row[key]) };
  }
  const err = new Error(
    hit.length === 0
      ? '재고 타깃이 없다 (ingredient_id / product_ingredient_id / product_id / brand_product_id 중 하나 필요)'
      : `재고 타깃이 둘 이상이다: ${hit.join(', ')} — 정확히 하나만 채워야 한다`
  );
  err.statusCode = 400;
  err.code = 'STOCK_TARGET_INVALID';
  throw err;
}

/**
 * 타깃 하나를 4개 컬럼 형태로 펼친다(나머지는 null).
 * 생성 attrs 를 만들 때 이걸 쓰면 "예전 코드가 두 컬럼을 같이 채우는" 실수가 안 난다.
 * @param {string} keyOrKind 컬럼명('product_id') 또는 종류('product')
 */
function stockTargetAttrs(keyOrKind, id) {
  const key = TARGET_KEYS.includes(keyOrKind) ? keyOrKind : KEY_BY_KIND[keyOrKind];
  if (!key) {
    const err = new Error(`알 수 없는 재고 타깃: ${keyOrKind}`);
    err.statusCode = 400;
    err.code = 'STOCK_TARGET_INVALID';
    throw err;
  }
  const attrs = {};
  for (const k of TARGET_KEYS) attrs[k] = k === key ? Number(id) : null;
  resolveStockTarget(attrs); // 자기 검증 — 여기서 통과 못 하면 쓰지 않는다
  return attrs;
}

/** 프로덕트 계열(레시피 없는 프로덕트 = 재고아이템 자체)인지. */
function isProductKind(kind) {
  return kind === 'product' || kind === 'brand_product';
}

module.exports = { TARGET_KEYS, KIND_BY_KEY, KEY_BY_KIND, resolveStockTarget, stockTargetAttrs, isProductKind };
