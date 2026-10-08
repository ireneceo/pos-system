/**
 * «장부 합 = 현재고» 어긋남 찾기 — 검사(인스펙션 stock-ledger LEDGER-001)와 보정(scripts/reconcile-ledger-drift.js)이
 * **같은 SQL** 을 쓴다(검사와 수정의 WHERE 가 다르면 수정이 덜 고친다 — 메모리 feedback_check_and_fix_same_sql).
 *
 * 대상별로 지금 재고와 장부(inventory_transactions) 수량 합을 비교한다:
 *   restaurant_ingredient  매장 소유 재료 — 재료 행 current_stock  vs  그 매장 entity 의 줄 합
 *   brand_overlay          브랜드 공유 재료의 매장분 — restaurant_ingredient_stocks  vs  그 매장 줄 합
 *   product_ingredient     BG 재고아이템 — 행 current_stock  vs  product_ingredient_id 줄 합
 *   product                매장 메뉴 자체 재고 — products.current_stock  vs  restaurant entity · product_id 줄 합
 *   brand_product          브랜드 상품 자체 재고
 *   foodcourt_product      푸드코트 상품 — entity foodcourt · product_id 줄 합
 * 0.01 보다 크게 다르면 어긋남. 장부 줄이 하나도 없고 재고도 0 이면 어긋남이 아니다(자연히 0 = 0).
 */
const TOL = 0.01;

const QUERIES = {
  restaurant_ingredient: `
    SELECT i.id, 'restaurant' entity_type, i.restaurant_id entity_id, i.name,
           CAST(i.current_stock AS DECIMAL(14,2)) current_stock,
           CAST(COALESCE(SUM(t.quantity_change),0) AS DECIMAL(14,2)) ledger_sum
      FROM ingredients i
      LEFT JOIN inventory_transactions t
        ON t.ingredient_id = i.id AND t.entity_type = 'restaurant' AND t.entity_id = i.restaurant_id
     WHERE i.owner_type = 'restaurant' AND i.restaurant_id IS NOT NULL
     GROUP BY i.id
    HAVING ABS(current_stock - ledger_sum) > ${TOL}`,
  brand_overlay: `
    SELECT r.ingredient_id id, 'restaurant' entity_type, r.restaurant_id entity_id, i.name,
           CAST(r.current_stock AS DECIMAL(14,2)) current_stock,
           CAST(COALESCE(SUM(t.quantity_change),0) AS DECIMAL(14,2)) ledger_sum
      FROM restaurant_ingredient_stocks r
      JOIN ingredients i ON i.id = r.ingredient_id AND i.owner_type = 'brand'
      LEFT JOIN inventory_transactions t
        ON t.ingredient_id = r.ingredient_id AND t.entity_type = 'restaurant' AND t.entity_id = r.restaurant_id
     GROUP BY r.id
    HAVING ABS(current_stock - ledger_sum) > ${TOL}`,
  product_ingredient: `
    SELECT p.id, 'brand' entity_type, NULL entity_id, p.name,
           CAST(p.current_stock AS DECIMAL(14,2)) current_stock,
           CAST(COALESCE(SUM(t.quantity_change),0) AS DECIMAL(14,2)) ledger_sum
      FROM product_ingredients p
      LEFT JOIN inventory_transactions t ON t.product_ingredient_id = p.id
     GROUP BY p.id
    HAVING ABS(current_stock - ledger_sum) > ${TOL}`,
  product: `
    SELECT p.id, 'restaurant' entity_type, p.restaurant_id entity_id, p.name,
           CAST(COALESCE(p.current_stock,0) AS DECIMAL(14,2)) current_stock,
           CAST(COALESCE(SUM(t.quantity_change),0) AS DECIMAL(14,2)) ledger_sum
      FROM products p
      LEFT JOIN inventory_transactions t
        ON t.product_id = p.id AND t.entity_type = 'restaurant'
     GROUP BY p.id
    HAVING ABS(current_stock - ledger_sum) > ${TOL}`,
  brand_product: `
    SELECT b.id, 'brand' entity_type, NULL entity_id, b.name,
           CAST(COALESCE(b.current_stock,0) AS DECIMAL(14,2)) current_stock,
           CAST(COALESCE(SUM(t.quantity_change),0) AS DECIMAL(14,2)) ledger_sum
      FROM brand_products b
      LEFT JOIN inventory_transactions t ON t.brand_product_id = b.id
     GROUP BY b.id
    HAVING ABS(current_stock - ledger_sum) > ${TOL}`,
  foodcourt_product: `
    SELECT f.id, 'foodcourt' entity_type, f.foodcourt_id entity_id, f.name,
           CAST(COALESCE(f.current_stock,0) AS DECIMAL(14,2)) current_stock,
           CAST(COALESCE(SUM(t.quantity_change),0) AS DECIMAL(14,2)) ledger_sum
      FROM foodcourt_products f
      LEFT JOIN inventory_transactions t
        ON t.product_id = f.id AND t.entity_type = 'foodcourt' AND t.entity_id = f.foodcourt_id
     GROUP BY f.id
    HAVING ABS(current_stock - ledger_sum) > ${TOL}`,
};

/**
 * @param {(sql:string)=>Promise<object[]>} q  SELECT 를 돌려 행 배열을 주는 함수
 * @param {{kinds?:string[]}} [opts]
 * @returns {Promise<Array<{kind,id,entity_type,entity_id,name,current_stock,ledger_sum,diff}>>}
 */
async function findLedgerDrift(q, { kinds } = {}) {
  const out = [];
  for (const [kind, sql] of Object.entries(QUERIES)) {
    if (kinds && !kinds.includes(kind)) continue;
    const rows = await q(sql);
    for (const r of rows) {
      const cur = Number(r.current_stock) || 0;
      const sum = Number(r.ledger_sum) || 0;
      out.push({ kind, id: r.id, entity_type: r.entity_type, entity_id: r.entity_id, name: r.name,
        current_stock: cur, ledger_sum: sum, diff: Math.round((cur - sum) * 100) / 100 });
    }
  }
  return out;
}

/**
 * 장부 줄 사슬 검사 — CUTOFF 이후 줄마다 «바로 앞 줄 stock_after + 이 줄 quantity_change = 이 줄 stock_after».
 * 장부를 안 거친 재고 변경이 두 장부 줄 사이에 끼면 여기서 끊긴다(새 누수를 막는 살아 있는 게이트).
 * 같은 대상 판정 키는 stockLedger 의 대상 칸과 같다.
 */
const CHAIN_KEY = `CASE
    WHEN product_ingredient_id IS NOT NULL THEN CONCAT('pi:', product_ingredient_id)
    WHEN brand_product_id IS NOT NULL THEN CONCAT('bp:', brand_product_id)
    WHEN ingredient_id IS NOT NULL THEN CONCAT('i:', ingredient_id, ':', COALESCE(entity_type,''), ':', COALESCE(entity_id,''))
    ELSE CONCAT('p:', COALESCE(entity_type,''), ':', product_id) END`;

function chainBreakSql(cutoff) {
  return `SELECT id, k, prev_after, quantity_change, stock_after FROM (
      SELECT id, created_at, reason_code, ${CHAIN_KEY} k, quantity_change, stock_after,
             LAG(stock_after) OVER (PARTITION BY ${CHAIN_KEY} ORDER BY id) prev_after
        FROM inventory_transactions) x
     WHERE created_at >= '${cutoff}' AND prev_after IS NOT NULL
       AND COALESCE(reason_code, '') <> 'ledger_reconcile'   -- 보정 줄은 옛 장부를 현재고에 맞추는 «기준점» 이라 앞 줄과 안 이어진다
       AND ABS(prev_after + quantity_change - stock_after) > ${TOL}`;
}

module.exports = { findLedgerDrift, chainBreakSql, TOL };
