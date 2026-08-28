/**
 * 발주 메일에 실을 품목 내역을 모은다 — 단일 소스.
 *
 * 2026-08-28 Irene: "이메일에 내역이 다 나와야지. 굳이 들어가야만 보이면 불편하지."
 *   그전까지 발주 메일은 PO번호·구매자·총액·상태만 실어서, 받는 쪽이 화면에 들어가야 뭘 주문했는지 알 수 있었다.
 *
 * ⚠ 알림 경로에서만 쓴다 — 실패해도 절대 throw 하지 않는다(알림 실패가 PO 상태전이를 막으면 안 됨).
 *   못 읽으면 빈 배열을 돌려주고, 메일 템플릿은 items 가 비면 **기존과 똑같은 본문**을 낸다.
 * 표시명 우선순위: 재료명 > 브랜드 재료명 > description. (IngredientSellerProduct 에는 이름 컬럼이 없다)
 */
const PurchaseOrderItem = require('../models/PurchaseOrderItem');
const Ingredient = require('../models/Ingredient');
const ProductIngredient = require('../models/ProductIngredient');

async function loadPoEmailItems(poId) {
  try {
    const rows = await PurchaseOrderItem.findAll({
      where: { purchase_order_id: poId },
      include: [
        { model: Ingredient, as: 'ingredient', attributes: ['id', 'name'], required: false },
        { model: ProductIngredient, as: 'productIngredient', attributes: ['id', 'name'], required: false }
      ],
      order: [['id', 'ASC']]
    });
    return rows.map(r => ({
      name: r.ingredient?.name || r.productIngredient?.name || r.description || 'Item',
      unit: r.unit || null,
      quantity_ordered: r.quantity_ordered,
      unit_price: r.unit_price,
      line_total: r.line_total
    }));
  } catch (e) {
    console.error('[poEmailItems] load failed:', e.message);
    return [];
  }
}

module.exports = { loadPoEmailItems };
