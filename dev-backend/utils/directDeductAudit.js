/**
 * 재고아이템 다이렉트 브랜드 상품의 출고 차감 환산 — 점검 목록(인스펙션 ING-UNI-034)과
 * 운영 읽기 보고(scripts/report-direct-deduct-unit.js)가 **같은 조회·같은 판정**을 쓰게 하는 한 곳.
 *   판정 = services/sellerLinkConversion.directDeductConversion (출고·반품 차감과 같은 함수).
 *   2026-10-22 Fable 판정 D3·D4 (.claude/fable-design-20261022-direct-deduct-unit.md)
 *
 * @param {(sql:string, r?:object) => Promise<object[]>} q  SELECT 행 배열을 돌려주는 함수
 * @returns {Promise<Array<{product_id, product_name, sell_unit, sell_base, stock_item_id, stock_unit, stock_base, conv, compatible, sold_lines, sold_qty, return_lines, return_qty}>>}
 *   환산이 1 이 아니거나(규격 있는 상품) 단위가 안 맞는 행만.
 */
async function listDirectDeductRows(q) {
  const { directDeductConversion } = require('../services/sellerLinkConversion');
  const rows = await q(`SELECT bp.id product_id, bp.name product_name, bp.unit, bp.base_quantity, bp.order_mode,
        pi.id stock_item_id, pi.unit stock_unit, pi.base_quantity stock_base, pi.package_unit, pi.package_quantity,
        (SELECT COUNT(*) FROM inventory_transactions it WHERE it.product_ingredient_id = pi.id AND it.notes LIKE 'Sold on PO %') sold_lines,
        (SELECT COALESCE(SUM(it.quantity_change), 0) FROM inventory_transactions it WHERE it.product_ingredient_id = pi.id AND it.notes LIKE 'Sold on PO %') sold_qty,
        (SELECT COUNT(*) FROM inventory_transactions it WHERE it.product_ingredient_id = pi.id AND it.notes LIKE 'Return #%') return_lines,
        (SELECT COALESCE(SUM(it.quantity_change), 0) FROM inventory_transactions it WHERE it.product_ingredient_id = pi.id AND it.notes LIKE 'Return #%') return_qty
      FROM brand_products bp JOIN product_ingredients pi ON pi.id = bp.product_ingredient_id
     WHERE bp.product_recipe_id IS NULL`);
  const out = [];
  for (const r of rows) {
    const { conv, compatible } = directDeductConversion({
      stock: { unit: r.stock_unit, base_quantity: r.stock_base, package_unit: r.package_unit, package_quantity: r.package_quantity },
      sellerProduct: { unit: r.unit, base_quantity: r.base_quantity, order_mode: r.order_mode },
    });
    if (conv === 1 && compatible) continue;
    out.push({
      product_id: r.product_id, product_name: r.product_name, sell_unit: r.unit, sell_base: Number(r.base_quantity),
      stock_item_id: r.stock_item_id, stock_unit: r.stock_unit, stock_base: Number(r.stock_base),
      conv, compatible,
      sold_lines: Number(r.sold_lines), sold_qty: Number(r.sold_qty),
      return_lines: Number(r.return_lines), return_qty: Number(r.return_qty),
    });
  }
  return out;
}

module.exports = { listDirectDeductRows };
