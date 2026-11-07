/**
 * 발주 재고 되돌림 — 단일 소스 (2026-11-07 Fable 설계 `.claude/fable-design-20261107-post-delivery-amend.md` §3-2).
 *
 * 반품 승인(`routes/po-returns.js` approveReturnHandler)의 재고 두 블록을 그대로 뽑았다.
 * 반품 승인과 «출고 뒤 수량 정정»(`POST /api/seller-orders/:id/correct-delivery`)이 같은 함수를 부른다 —
 * «반품 = 출고·입고의 정확한 역방향» 규칙(메모리 reference_po_return_stock_symmetry)이 한 곳에 산다.
 *
 *   reverseBuyerStock  — 구매자 재고 −qty×환산 (입고의 역방향)
 *   restoreSellerStock — 판매자 재고 +qty     (출고의 역방향)
 *
 * 반품 승인은 기본값(return_out / return_in / return_approved)으로 불러 장부 모양이 예전과 같다.
 * 정정은 ledgerType 'adjustment' · reasonCode 'seller_correction' · supplierReason 'po_correction' 로 부른다
 * (물건이 오간 적이 없으니 «반품» 으로 적지 않는다).
 *
 * 금액 근거·clampAtZero·[unit_mismatch] 표기·directDeductConversion 은 반품 승인 코드 그대로다. 새 환산 규칙 금지.
 */
const stockLedger = require('./stockLedger');
const {
  Ingredient, IngredientSellerProduct, SupplierProduct, SupplierInventoryTransaction,
  FoodcourtProduct, BrandProduct, ProductRecipeIngredient, ProductIngredient
} = require('../models');

// 금액 근거 = 그 줄 가격(주문 단위) ÷ 환산 = 취급단위 1 의 값
const perStockUnit = (unitPrice, item) => (parseFloat(unitPrice) || 0) / (parseFloat(item && item.unit_conversion) || 1);

/**
 * 구매자 재고 −qty×환산 — 입고의 정확한 역방향.
 *   ⚠ 엔티티 타입이 아니라 라인 모양으로 분기한다 — 입고가 그렇게 하기 때문이다.
 *   (d) product / brand_product 줄(수령이 receiveIntoProduct 로 올린 것) — 입고와 같은 순서로 먼저 본다.
 *   (a) product_ingredient (BG 본사 재고아이템) (b) 매장 + ingredient (c) 그 외 ingredient.
 * @param ingredientId / productIngredientId  반품은 반품 행의 값을, 정정은 줄의 값을 넘긴다(기본 = 줄).
 * @returns {{ moved:number, requested:number } | null}  null = 되돌릴 대상 없음
 */
async function reverseBuyerStock({
  po, item, qty, unitPrice, t, userId = null, note,
  ledgerType = 'return_out', reasonCode = null,
  ingredientId = undefined, productIngredientId = undefined, unit = null
}) {
  const delta = parseFloat(qty) || 0;
  if (!(delta > 0)) return null;
  const conv = parseFloat(item && item.unit_conversion) || 1;
  const reverseQty = Math.round(delta * conv * 100) / 100;
  const price = unitPrice != null ? unitPrice : (item && item.unit_price);
  const extra = reasonCode ? { reasonCode } : {};
  const ingId = ingredientId !== undefined ? ingredientId : (item && item.ingredient_id) || null;
  const pIngId = productIngredientId !== undefined ? productIngredientId : (item && item.product_ingredient_id) || null;

  // (d) 레시피 없는 프로덕트 줄 — 입고(receiveIntoProduct)의 역방향. 반품에는 없던 분기(반품 행이 product 를 못 가리킨다).
  if (item && (item.product_id || item.brand_product_id) && !pIngId && !ingId) {
    const isBrandSide = !!item.brand_product_id;
    const Model = require(isBrandSide ? '../models/BrandProduct' : '../models/Product');
    const prod = await Model.findByPk(isBrandSide ? item.brand_product_id : item.product_id, { lock: t.LOCK.UPDATE, transaction: t });
    if (!prod) return null;
    const pUnit = isBrandSide ? require('../utils/poLineSpec').selfStockUnit(prod, prod.unit || null) : (prod.stock_unit || prod.unit || null);
    const r = await stockLedger.record({
      target: { kind: isBrandSide ? 'brand_product' : 'product', row: prod },
      entity: { type: po.entity_type, id: po.entity_id },
      type: ledgerType, delta: -reverseQty, clampAtZero: true, unit: pUnit || unit || 'unit',
      cost: { unit_cost: perStockUnit(price, item), base_quantity: 1 },
      refs: { purchase_order_id: po.id }, notes: note, userId, transaction: t, ...extra,
    });
    return { moved: -r.change, requested: reverseQty, before: r.before };
  }

  if (pIngId) {
    // (a) BG 본사 재고아이템 라인 — 입고(ProductIngredient += qty×conv)의 역방향
    const pIng = await ProductIngredient.findByPk(pIngId, { lock: t.LOCK.UPDATE, transaction: t });
    if (!pIng) return null;
    const base = parseFloat(pIng.base_quantity) || 1;
    const r = await stockLedger.record({
      target: { kind: 'product_ingredient', row: pIng }, entity: { type: po.entity_type, id: po.entity_id },
      type: ledgerType, delta: -reverseQty, clampAtZero: true, unit: pIng.unit || unit || 'unit',
      cost: { unit_cost: perStockUnit(price, item) * base, base_quantity: base },
      refs: { purchase_order_id: po.id }, notes: note, userId, transaction: t, ...extra,
    });
    return { moved: -r.change, requested: reverseQty, before: r.before };
  }
  if (po.entity_type === 'restaurant' && ingId) {
    // (b) 매장 — 원장에는 실제 이동량(클램프 반영)을 적는다(stockLedger 가 after−before 로 적는다).
    const ingredient = await Ingredient.findByPk(ingId, { lock: t.LOCK.UPDATE, transaction: t });
    if (!ingredient) return null;
    const base = parseFloat(ingredient.base_quantity) || 1;
    const r = await stockLedger.record({
      target: { kind: 'ingredient', row: ingredient }, restaurantId: po.entity_id,
      type: ledgerType, delta: -reverseQty, clampAtZero: true, unit: ingredient.unit || unit || 'unit',
      cost: { unit_cost: perStockUnit(price, item) * base, base_quantity: base },
      refs: { purchase_order_id: po.id }, notes: note, userId, transaction: t, ...extra,
    });
    return { moved: -r.change, requested: reverseQty, before: r.before };
  }
  if (ingId) {
    // (c) BG(레거시 Ingredient 소유)·FG 구매자 — 오버레이는 매장 전용이므로 재료 행 직접
    const ingredient = await Ingredient.findByPk(ingId, { lock: t.LOCK.UPDATE, transaction: t });
    if (!ingredient) return null;
    const base = parseFloat(ingredient.base_quantity) || 1;
    const r = await stockLedger.record({
      target: { kind: 'ingredient', row: ingredient }, entity: { type: po.entity_type, id: po.entity_id },
      type: ledgerType, delta: -reverseQty, clampAtZero: true, unit: ingredient.unit || unit || 'unit',
      cost: { unit_cost: perStockUnit(price, item) * base, base_quantity: base },
      refs: { purchase_order_id: po.id }, notes: note, userId, transaction: t, ...extra,
    });
    return { moved: -r.change, requested: reverseQty, before: r.before };
  }
  return null;
}

/**
 * 판매자 재고 +qty — 출고(`routes/seller-orders.js` /ship)의 정확한 역방향. 각 판매자가 **자기 재고**를 되돌린다.
 *   supplier : SupplierProduct + SupplierInventoryTransaction(manual_adjust)
 *   brand    : 레시피 > 다이렉트 > 자체 재고 — 출고와 같은 우선순위
 *   foodcourt: FoodcourtProduct
 * @returns {boolean} 무언가 되돌렸으면 true
 */
async function restoreSellerStock({
  po, item, qty, t, userId = null, note,
  ledgerType = 'return_in', reasonCode = null, supplierReason = 'return_approved'
}) {
  const delta = parseFloat(qty) || 0;
  if (!(delta > 0) || !item || !item.ingredient_seller_product_id || !po.seller_entity_id) return false;
  const extra = reasonCode ? { reasonCode } : {};
  const mapping = await IngredientSellerProduct.findByPk(item.ingredient_seller_product_id, { transaction: t });
  if (!mapping || !mapping.seller_product_id) return false;

  if (po.seller_type === 'supplier') {
    const sp = await SupplierProduct.findByPk(mapping.seller_product_id, { lock: t.LOCK.UPDATE, transaction: t });
    if (!sp) return false;
    const old = parseFloat(sp.current_stock) || 0;
    const nu = Math.round((old + delta) * 100) / 100;
    await sp.update({ current_stock: nu }, { transaction: t });
    await SupplierInventoryTransaction.create({
      supplier_company_id: po.seller_entity_id,
      supplier_product_id: sp.id,
      transaction_type: 'manual_adjust',
      quantity_change: delta,
      unit: sp.unit || null,
      stock_after: nu,
      reason: supplierReason,
      reference_type: 'purchase_order',
      reference_id: po.id,
      notes: note,
      created_by: userId
    }, { transaction: t });
    return true;
  }

  if (po.seller_type === 'brand') {
    // ⚠ 구매자 재료 행이 아니라 **본사 재고**를 올린다(2026-07-13 net 0 사고).
    const bp = await BrandProduct.findByPk(mapping.seller_product_id, { transaction: t });
    if (!bp) return false;
    if (bp.product_recipe_id) {
      const recipeIngs = await ProductRecipeIngredient.findAll({ where: { recipe_id: bp.product_recipe_id }, transaction: t });
      let any = false;
      for (const ri of recipeIngs) {
        const pIng = await ProductIngredient.findByPk(ri.ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
        if (!pIng) continue;
        const backQty = Math.round((parseFloat(ri.quantity) || 0) * delta * 100) / 100;
        if (backQty <= 0) continue;
        await stockLedger.record({
          target: { kind: 'product_ingredient', row: pIng }, entity: { type: 'brand', id: po.seller_entity_id },
          type: ledgerType, delta: backQty, refs: { purchase_order_id: po.id },
          notes: `${note} (brand seller, ${bp.name})`, userId, transaction: t, ...extra,
        });
        any = true;
      }
      return any;
    }
    if (bp.product_ingredient_id) {
      // 재고아이템 다이렉트 — 출고에서 «주문 수량 × 상품 규격» 으로 깎았으므로 같은 환산으로 환원(2026-10-22)
      const pIngD = await ProductIngredient.findByPk(bp.product_ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!pIngD) return false;
      const { directDeductConversion } = require('./sellerLinkConversion');
      const { conv, compatible } = directDeductConversion({ stock: pIngD, sellerProduct: bp });
      await stockLedger.record({
        target: { kind: 'product_ingredient', row: pIngD }, entity: { type: 'brand', id: po.seller_entity_id },
        type: ledgerType, delta: Math.round(delta * conv * 100) / 100, refs: { purchase_order_id: po.id },
        notes: `${note} (brand seller, ${bp.name})` + (compatible ? '' : ` [unit_mismatch ${bp.unit}↔${pIngD.unit}]`),
        userId, transaction: t, ...extra,
      });
      return true;
    }
    // 레시피·다이렉트 없는 프로덕트 = 상품 자체가 재고 — 출고(/ship)가 product_kind 'stock'(또는 비어 있음)이면 깎는다.
    //   예전 반품 승인에는 이 분기가 없어(«출고도 차감하지 않았다» 주석은 2026-09-01 이후 틀림) 반품해도 본사 재고가 안 돌아왔다.
    //   출고가 건너뛴 종류(주문제작·서비스)는 여기도 건너뛴다(대칭).
    if (bp.product_kind && bp.product_kind !== 'stock') return false;
    const bpLocked = await BrandProduct.findByPk(bp.id, { lock: t.LOCK.UPDATE, transaction: t });
    // ⚠ 출고는 이 분기만 0 에서 멈춘다(takeBp = min(주문량, 재고) — 모자라면 [stock_shortfall] 만 남기고 덜 뺀다).
    //   그래서 되돌림도 «이 발주가 실제로 뺀 양 − 이미 되돌린 양» 까지만 — 안 뺀 재고를 돌려주면 본사 재고가 부풀어 오른다
    //   (2026-11-07 실측: 재고 0 인 상품을 출고 → 장부 0, 정정이 +1 을 돌려줌). 장부(같은 발주·같은 상품)가 진실이다.
    const { InventoryTransaction } = require('../models');
    const moved = await InventoryTransaction.findAll({
      where: { brand_product_id: bp.id, purchase_order_id: po.id }, attributes: ['transaction_type', 'quantity_change'], transaction: t
    });
    const taken = -moved.filter(m => m.transaction_type === 'order_deduct').reduce((a, m) => a + (parseFloat(m.quantity_change) || 0), 0);
    const given = moved.filter(m => m.transaction_type !== 'order_deduct' && (parseFloat(m.quantity_change) || 0) > 0)
      .reduce((a, m) => a + (parseFloat(m.quantity_change) || 0), 0);
    const back = Math.round(Math.min(delta, Math.max(0, taken - given)) * 100) / 100;
    if (!(back > 0)) return false;
    await stockLedger.record({
      target: { kind: 'brand_product', row: bpLocked }, entity: { type: 'brand', id: po.seller_entity_id },
      type: ledgerType, delta: back,
      unit: require('../utils/poLineSpec').selfStockUnit(bpLocked, 'ea'),
      refs: { purchase_order_id: po.id }, notes: `${note} (brand seller, ${bp.name})`, userId, transaction: t, ...extra,
    });
    return true;
  }

  if (po.seller_type === 'foodcourt') {
    const fp = await FoodcourtProduct.findByPk(mapping.seller_product_id, { lock: t.LOCK.UPDATE, transaction: t });
    if (!fp) return false;
    await stockLedger.record({
      target: { kind: 'foodcourt_product', row: fp }, entity: { type: 'foodcourt', id: po.seller_entity_id },
      type: ledgerType, delta, unit: fp.unit || item.unit || 'unit', refs: { purchase_order_id: po.id },
      notes: `${note} (foodcourt seller)`, userId, transaction: t, ...extra,
    });
    return true;
  }
  return false;
}

module.exports = { reverseBuyerStock, restoreSellerStock };
