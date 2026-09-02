/**
 * 발주 수령 — 재고 반영 **단일 소스** (P4-2, 2026-09-02).
 *
 * 왜 뺐나: 같은 일을 `/purchase-orders/:id/receive`(385줄)와 `mark-received`(155줄)가
 * **따로 적고 있었다.** 프로덕트 분기·BG 재고아이템 분기·재료(배치+원장+가중평균원가+오버레이)
 * 세 갈래가 두 벌씩 있어, 한쪽만 고치면 조용히 갈라진다
 * (실제로 P1 에서 `track_stock` 게이트를 지울 때 두 곳을 따로 고쳐야 했다).
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md §5-3 "receive 본체를 서비스로 빼서 공유(복제 금지)".
 *
 * ⚠ 이 추출은 **동작 변경 0** 이 목적이다. 두 호출부의 다른 점은 **인자로** 남긴다:
 *   - note        : "PO x mark-received" / "PO x receive" (원장·배치 메모 문구가 다르다)
 *   - lockIngredient: receive 만 재료 행을 잠근다(FIFO 차감과의 경합 방지). mark-received 는
 *                     원래 안 잠갔다 — 여기서 임의로 잠그면 그게 동작 변경이다.
 *   - currentStock : receive 는 한 아이템의 여러 split 을 이어 처리하므로 직전 결과를 물려준다.
 * 결제(P4-3)는 이 파일에 넣지 않는다 — 수령과 결제는 다른 계약이다.
 */
const {
  Ingredient,
  ProductIngredient,
  InventoryBatch,
  InventoryTransaction,
  RestaurantIngredientCost,
} = require('../models');
const { stockFor, applyStock } = require('../utils/brandStockAccess');

/**
 * 레시피 없는 프로덕트로 입고 — 수량이 프로덕트 행에 산다(2026-09-01 P1).
 * 소유권을 여기서 다시 검사한다: 남의 프로덕트로 입고가 흘러가면 재고가 조용히 남에게 간다.
 */
async function receiveIntoProduct({ item, po, delta, userId, t, note }) {
  const isBrandSide = !!item.brand_product_id;
  const id = isBrandSide ? item.brand_product_id : item.product_id;
  const Model = require(isBrandSide ? '../models/BrandProduct' : '../models/Product');
  const prod = await Model.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
  if (!prod) return { ok: false, message: `Product ${id} not found` };

  if (isBrandSide) {
    if (po.entity_type !== 'brand') return { ok: false, message: `Product ${id} is a brand product but PO buyer is ${po.entity_type}` };
    const Brand = require('../models/Brand');
    const brand = await Brand.findByPk(po.entity_id, { transaction: t });
    const ownerOk = brand && prod.owner_user_id != null && parseInt(brand.owner_id, 10) === parseInt(prod.owner_user_id, 10);
    if (!ownerOk) return { ok: false, message: `Product ${id} does not belong to this buyer` };
  } else {
    if (po.entity_type !== 'restaurant' || parseInt(prod.restaurant_id, 10) !== parseInt(po.entity_id, 10)) {
      return { ok: false, message: `Product ${id} does not belong to this buyer` };
    }
  }

  const cur = parseFloat(prod.current_stock) || 0;
  const next = Math.round((cur + delta) * 100) / 100;
  const unit = prod.stock_unit || prod.unit || null;
  await InventoryTransaction.create({
    entity_type: po.entity_type, entity_id: po.entity_id,
    ...(isBrandSide ? { brand_product_id: id } : { product_id: id, restaurant_id: po.entity_id }),
    transaction_type: 'purchase', quantity_change: delta,
    unit, stock_after: next, purchase_order_id: po.id,
    notes: note, created_by: userId
  }, { transaction: t });
  await prod.update({ current_stock: next }, { transaction: t });
  return { ok: true, stockAfter: next };
}

/** BG 재고아이템(ProductIngredient) 입고 — 배치·가중평균 없이 수량과 원장만. */
async function receiveIntoProductIngredient({ item, po, quantity, userId, t, note, pIng }) {
  const target = pIng || await ProductIngredient.findByPk(item.product_ingredient_id, { transaction: t });
  // 타깃 행이 없으면 **호출부가 정책을 정한다**: mark-received 는 예전처럼 건너뛰고(옛 발주에서
  // 삭제된 재고아이템 하나 때문에 수령 전체가 막히면 안 된다), /receive 는 400 으로 끊는다.
  // 재료 경로와 같은 플래그 이름을 쓴다 — 의미는 "타깃 행이 없다" 하나다.
  if (!target) return { ok: false, missingIngredient: true, message: `Product ingredient ${item.product_ingredient_id} not found` };
  const conv = parseFloat(item.unit_conversion) || 1;
  const qty = parseFloat(quantity) || 0;
  if (qty <= 0) return { ok: true, skipped: true };
  const delta = Math.round(qty * conv * 100) / 100;
  const cur = parseFloat(target.current_stock) || 0;
  // 2026-09-01: track_stock 스위치 제거 — 항상 추적한다.
  const next = Math.round((cur + delta) * 100) / 100;
  await InventoryTransaction.create({
    entity_type: po.entity_type, entity_id: po.entity_id,
    product_ingredient_id: item.product_ingredient_id,
    transaction_type: 'purchase', quantity_change: delta,
    unit: target.unit, stock_after: next, purchase_order_id: po.id,
    notes: note, created_by: userId
  }, { transaction: t });
  await target.update({ current_stock: next }, { transaction: t });
  return { ok: true, stockAfter: next, normalQty: qty };
}

/**
 * 재료(Ingredient) 입고 — 배치 + 원장 + 매장 가중평균 원가 + (매장이면) 오버레이 반영.
 * @param currentStock 직전 재고. 안 주면 조회한다(receive 는 split 사이에서 물려준다).
 */
async function receiveIntoIngredient({
  item, po, quantity, unitCost, batchNumber, expiryDate,
  userId, t, note, ingredient, currentStock,
}) {
  const conv = parseFloat(item.unit_conversion) || 1;
  const qty = parseFloat(quantity) || 0;
  if (qty <= 0) return { ok: true, skipped: true, stockAfter: currentStock };

  const before = currentStock != null
    ? currentStock
    : (po.entity_type === 'restaurant'
      ? await stockFor(ingredient, po.entity_id, t)
      : parseFloat(ingredient.current_stock) || 0);

  const stockDelta = Math.round(qty * conv * 100) / 100;
  const newStock = Math.round((before + stockDelta) * 100) / 100;
  const cost = unitCost != null ? parseFloat(unitCost) : (parseFloat(item.unit_price) || 0);

  await InventoryBatch.create({
    entity_type: po.entity_type, entity_id: po.entity_id,
    ingredient_id: item.ingredient_id,
    batch_number: batchNumber || null,
    initial_quantity: stockDelta, remaining_quantity: stockDelta,
    unit: ingredient.unit, unit_cost: cost,
    expiry_date: expiryDate || null, received_date: new Date(), status: 'active',
    purchase_order_id: po.id, created_by: userId
  }, { transaction: t });

  await InventoryTransaction.create({
    entity_type: po.entity_type, entity_id: po.entity_id,
    ingredient_id: item.ingredient_id,
    transaction_type: 'purchase', quantity_change: stockDelta,
    unit: ingredient.unit, stock_after: newStock, purchase_order_id: po.id,
    notes: note, created_by: userId
  }, { transaction: t });

  // 매장 구매자 가중평균 원가 — 매장별 원가 행이 단일 소스(재료 행의 unit_cost 는 초기값 폴백)
  if (po.entity_type === 'restaurant') {
    const incomingCostPerIng = (parseFloat(item.unit_price) || 0) / conv;
    const existingCostRow = await RestaurantIngredientCost.findOne({
      where: { restaurant_id: po.entity_id, ingredient_id: item.ingredient_id },
      transaction: t
    });
    const oldCost = existingCostRow
      ? parseFloat(existingCostRow.unit_cost) || 0
      : (parseFloat(ingredient.unit_cost) || 0);
    const weighted = before > 0 && newStock > 0
      ? (before * oldCost + stockDelta * incomingCostPerIng) / newStock
      : incomingCostPerIng;
    const newAvg = Math.round(weighted * 10000) / 10000;
    if (existingCostRow) {
      await existingCostRow.update({ unit_cost: newAvg, notes: note, updated_by: userId }, { transaction: t });
    } else {
      await RestaurantIngredientCost.create({
        restaurant_id: po.entity_id, ingredient_id: item.ingredient_id,
        unit_cost: newAvg, notes: note, updated_by: userId
      }, { transaction: t });
    }
  }

  if (po.entity_type === 'restaurant') {
    // 브랜드 공유 재료 → 매장 오버레이 / 매장 재료 → 재료 행 (형제 매장 재고 오염 방지)
    await applyStock(ingredient, po.entity_id, newStock, t, { stockTake: true });
  } else {
    await ingredient.update({ current_stock: newStock, last_stock_take_at: new Date() }, { transaction: t });
  }

  return { ok: true, stockAfter: newStock, normalQty: qty };
}

/**
 * 한 라인의 "정상 수령분" 하나를 재고에 반영한다 — **타깃 종류를 여기서 가른다.**
 * 라인은 ingredient / product_ingredient / product / brand_product **넷 중 하나**를 가리킨다
 * (utils/stockTarget 이 쓰기 시점에 강제하는 불변식).
 */
async function applyReceipt({
  item, po, quantity, userId, t, note,
  unitCost = null, batchNumber = null, expiryDate = null,
  lockIngredient = false, currentStock = null, pIng = null, ingredientRow = null,
}) {
  if (item.product_id || item.brand_product_id) {
    const conv = parseFloat(item.unit_conversion) || 1;
    const qty = parseFloat(quantity) || 0;
    if (qty <= 0) return { ok: true, skipped: true };
    const delta = Math.round(qty * conv * 100) / 100;
    const r = await receiveIntoProduct({ item, po, delta, userId, t, note });
    return r.ok ? { ...r, normalQty: qty } : r;
  }
  if (item.product_ingredient_id) {
    return receiveIntoProductIngredient({ item, po, quantity, userId, t, note, pIng });
  }
  if (!item.ingredient_id) return { ok: true, skipped: true };
  // 호출부가 이미 잠가서 들고 있으면 그 인스턴스를 쓴다(/receive 는 split 루프 앞에서 잠근다) —
  // 다시 읽으면 같은 트랜잭션이라 값은 같지만 쿼리만 늘고 인스턴스가 갈라진다.
  const ingredient = ingredientRow || await Ingredient.findByPk(item.ingredient_id, {
    ...(lockIngredient ? { lock: t.LOCK.UPDATE } : {}),
    transaction: t
  });
  if (!ingredient) return { ok: false, message: `Ingredient ${item.ingredient_id} not found`, missingIngredient: true };
  return receiveIntoIngredient({
    item, po, quantity, unitCost, batchNumber, expiryDate, userId, t, note, ingredient, currentStock
  });
}

/**
 * 발주 **전량 수령 처리** — 라인 재고 반영 + 상태·시각·tracking 갱신까지 한 묶음.
 *
 * `mark-received` 와 `receive-and-pay` 가 **같은 절차**를 쓴다(P4-3).
 * 재고 반영만 공유하고 "전량 수령 처리" 절차를 각자 적으면, P4-2 가 없앤 것과 같은
 * 갈라짐이 그대로 다시 생긴다 — 다음에 mark-received 에 무언가 더할 때 조용히 어긋난다.
 *
 * 알림 발사는 **여기서 하지 않는다** — 커밋 뒤 non-blocking 이어야 하므로 라우트가 한다.
 *
 * @returns {{ok:true}} | {{ok:false, message:string}}  (400 으로 끊어야 하는 경우만 ok:false)
 */
async function markAllReceived(po, { userId, note, trackingSource }, t) {
  const { PurchaseOrderItem } = require('../models');
  const { appendTrackingEvent } = require('./poRealtimeService');
  const items = await PurchaseOrderItem.findAll({ where: { purchase_order_id: po.id }, transaction: t });
  for (const item of items) {
    const r = await applyReceipt({
      item, po,
      quantity: parseFloat(item.quantity_ordered) || 0,
      userId, t, note,
      // 이 라우트는 원래 재료 행을 잠그지 않았다 — 임의로 잠그면 동작 변경이다(P4-2 참조).
      lockIngredient: false,
    });
    // 프로덕트 소유권 실패만 끊는다. 타깃 행이 사라진 라인은 예전처럼 건너뛴다 —
    // 여기서 막으면 옛 발주의 수령이 통째로 불가능해진다.
    if (!r.ok && !r.missingIngredient) return { ok: false, message: r.message };
  }
  const now = new Date();
  const tracking = appendTrackingEvent(po, 'received', null, { source: trackingSource });
  await po.update({
    status: 'received', received_at: now, actual_delivery_date: now, tracking_info: tracking
  }, { transaction: t });
  return { ok: true };
}

module.exports = { applyReceipt, markAllReceived, receiveIntoProduct, receiveIntoProductIngredient, receiveIntoIngredient };
