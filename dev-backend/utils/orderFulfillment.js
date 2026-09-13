/**
 * 발주 이행 방식 판정 — «배송이 있는 주문인가» 단일 소스 (2026-09-13).
 *
 * Irene 확정: 상품 종류는 셋이다.
 *   stock          재고 셈 · 배송 함
 *   made_to_order  재고 안 셈 · 배송 함
 *   service        재고 안 셈 · **배송 없음** → 판매자가 «완료 처리» 하면 바로 끝
 *
 * 섞여 담긴 발주 규칙(Irene 확정): **물건 줄이 하나라도 있으면 배송 있는 주문**이다.
 *   같은 판매자 상품은 한 장의 발주로 합쳐지므로 «컨설팅 10시간 + 소스 2kg» 이 한 장에 담길 수 있다.
 *   그때 배송을 없애면 «배송 중인데 완료» 같은 모순이 생긴다 → 서비스만 담긴 발주일 때만 배송을 건너뛴다.
 *
 * ⛔ 이 판정을 화면·라우트에 복사하지 말 것. 세 벌이 갈라지면 «목록엔 완료인데 상세는 배송 대기» 가 된다.
 */
const { QueryTypes } = require('sequelize');

/**
 * 이 발주가 «서비스만» 담고 있는가 (= 배송 단계를 건너뛰어야 하는가).
 * 판매자 상품을 가리키지 않는 줄(옛 발주·직접 입력)은 물건으로 본다 — 모르면 배송 있는 쪽이 안전하다.
 * @returns {Promise<boolean>}
 */
async function isServiceOnlyOrder(sequelize, purchaseOrderId, transaction) {
  const rows = await sequelize.query(
    `SELECT COUNT(*) AS total,
            SUM(CASE WHEN bp.product_kind = 'service' THEN 1 ELSE 0 END) AS service_lines
       FROM purchase_order_items poi
       LEFT JOIN ingredient_seller_products m ON m.id = poi.ingredient_seller_product_id
       LEFT JOIN brand_products bp ON bp.id = m.seller_product_id AND m.seller_type = 'brand'
      WHERE poi.purchase_order_id = :id`,
    { type: QueryTypes.SELECT, replacements: { id: purchaseOrderId }, transaction });
  const total = Number(rows[0]?.total || 0);
  const service = Number(rows[0]?.service_lines || 0);
  return total > 0 && service === total;
}

module.exports = { isServiceOnlyOrder };
