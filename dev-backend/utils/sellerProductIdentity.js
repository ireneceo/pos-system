/**
 * 발주 라인에 **공급업체 자기 판매품목 정체성**(판매품목명 + SKU)을 붙인다 — 단일 소스.
 *
 * 내부 재고명("우리 주방이 부르는 이름")과 공급업체 판매품목명은 서로 다른 정체성이고,
 * 발주 라인(`purchase_order_items`)은 이름 컬럼이 `description`(내부명 스냅샷) 하나뿐이라
 * 판매품목명·SKU 는 `ingredient_seller_product_id` FK 로 read-time 조인해야 나온다.
 * (설계 단일 진실: docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md ①·③-4)
 *
 * 같은 조인을 화면마다 복사하면 구매자 상세·인쇄본·공유메시지·공급업체 수신함이
 * 서로 다른 이름을 보여주게 된다 → 네 경로가 이 함수 하나를 쓴다.
 *
 * - SKU 는 supplier 판매품목에만 있다. 브랜드/푸드코트 판매자, 매핑 없는 라인은 null →
 *   **호출부가 내부명으로 폴백**한다(옛 발주·외부 판매자도 빈칸이 되지 않게).
 * - SupplierProduct 는 paranoid(soft delete) 라 `paranoid: false` 로 조회한다 —
 *   판매품목이 지워져도 과거 발주서의 이름·SKU 는 그대로 나와야 한다.
 */

/**
 * @param {object|object[]} pos - PO plain object(들). 각각 `items` 배열을 가진다.
 *                                items 는 제자리에서 `seller_product_name`/`seller_product_sku` 를 부여받는다.
 */
async function attachSellerProductIdentity(pos) {
  const list = Array.isArray(pos) ? pos : [pos];
  const allItems = list.flatMap(p => (p && p.items) || []);
  if (!allItems.length) return;

  // 매핑이 없는 라인도 필드는 존재해야 한다(프론트가 undefined 와 null 을 구분하지 않게)
  for (const it of allItems) {
    it.seller_product_name = null;
    it.seller_product_sku = null;
  }

  const ispIds = [...new Set(allItems.map(it => it.ingredient_seller_product_id).filter(Boolean))];
  if (!ispIds.length) return;

  const { IngredientSellerProduct, SupplierProduct } = require('../models');
  const isps = await IngredientSellerProduct.findAll({
    where: { id: ispIds },
    attributes: ['id', 'seller_type', 'seller_product_id']
  });

  const spIds = [...new Set(
    isps.filter(m => m.seller_type === 'supplier' && m.seller_product_id).map(m => m.seller_product_id)
  )];
  const spRows = spIds.length
    ? await SupplierProduct.findAll({ where: { id: spIds }, attributes: ['id', 'name', 'sku'], paranoid: false })
    : [];
  const spMap = Object.fromEntries(spRows.map(s => [s.id, s]));

  const ispMap = Object.fromEntries(isps.map(m => {
    const sp = m.seller_type === 'supplier' ? spMap[m.seller_product_id] : null;
    return [m.id, sp ? { name: sp.name, sku: sp.sku } : null];
  }));

  for (const it of allItems) {
    const sp = it.ingredient_seller_product_id ? ispMap[it.ingredient_seller_product_id] : null;
    if (sp) {
      it.seller_product_name = sp.name || null;
      it.seller_product_sku = sp.sku || null;
    }
  }
}

module.exports = { attachSellerProductIdentity };
