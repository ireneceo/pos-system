/**
 * stockAlerts — 재고 부족/품절 알림 생성·해소의 단일 소스.
 *
 * inventory-core 안에 정의돼 있었는데 라우트를 core/extra 로 쪼갤 때 헬퍼가 따라가지 않아,
 * `POST /inventory/deduct`(inventory-extra) 가 호출부만 남고 정의가 없어 **항상 500** 이었다
 * (호출하는 화면이 없어 발견되지 않은 잠복 결함 — Fable 2026-07-12 검증에서 적발).
 * 사본을 늘리지 말고 여기 하나만 쓴다.
 */
const { Ingredient, StockAlert } = require('../models');
const { effectiveMinStock } = require('./brandStockAccess');

/**
 * 재고 변동 후 알림 상태를 맞춘다.
 *   0 이하        → out_of_stock 알림
 *   min_stock 이하 → low_stock 알림
 *   그 위          → 기존 알림 해소
 *
 * 알림은 **매장별**이다. 브랜드 공유 재료는 형제 매장이 같은 ingredient_id 를 쓰므로
 * restaurant_id 로 좁히지 않으면 A 매장의 입고가 B 매장의 부족 알림을 지운다.
 */
async function checkAndCreateAlert(ingredientId, restaurantId, newStock, transaction = null) {
  // 읽기도 호출부 트랜잭션으로 — 재고 행을 잠근 트랜잭션이 연결을 쥔 채 둘째 연결을 기다리면,
  //   같은 행을 기다리는 요청들이 풀을 다 잡아 50초 잠금 대기로 실패한다(2026-10-16 장부 잠금 · 풀 고갈 같은 결함)
  const ingredient = await Ingredient.findByPk(ingredientId, { transaction });
  if (!ingredient) return;

  // 임계치도 매장별 — 브랜드 재료면 이 매장의 오버라이드가 우선(지점마다 발주점이 다르다)
  const minStock = await effectiveMinStock(ingredient, restaurantId, transaction);
  const currentStock = newStock;

  const existingAlert = await StockAlert.findOne({
    where: {
      ingredient_id: ingredientId,
      restaurant_id: restaurantId,
      is_resolved: false
    },
    transaction
  });

  if (currentStock <= 0) {
    if (existingAlert) {
      await StockAlert.update(
        { alert_type: 'out_of_stock', current_stock: currentStock },
        { where: { id: existingAlert.id }, transaction }
      );
    } else {
      await StockAlert.create({
        restaurant_id: restaurantId,
        ingredient_id: ingredientId,
        alert_type: 'out_of_stock',
        current_stock: currentStock,
        min_stock: minStock
      }, { transaction });
    }
  } else if (currentStock <= minStock) {
    if (existingAlert) {
      await StockAlert.update(
        { alert_type: 'low_stock', current_stock: currentStock },
        { where: { id: existingAlert.id }, transaction }
      );
    } else {
      await StockAlert.create({
        restaurant_id: restaurantId,
        ingredient_id: ingredientId,
        alert_type: 'low_stock',
        current_stock: currentStock,
        min_stock: minStock
      }, { transaction });
    }
  } else if (existingAlert) {
    await StockAlert.update(
      { is_resolved: true, resolved_at: new Date() },
      { where: { id: existingAlert.id }, transaction }
    );
  }
}

module.exports = { checkAndCreateAlert };
