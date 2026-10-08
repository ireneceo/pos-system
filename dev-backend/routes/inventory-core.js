const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { Ingredient, InventoryTransaction, StockTake, StockTakeItem, StockAlert, Restaurant, InventoryBatch, GeneralStock, GeneralStockTransaction, Supplier, RestaurantIngredientCost, PurchaseOrder, PurchaseOrderItem } = require('../models');
const { getStartOfMonth, getRestaurantTimezone } = require('../utils/dateTimeHelper');

// 레스토랑의 코스트 오버라이드 맵 조회 헬퍼

// inventory CRUD + alerts + transactions + stock-takes + reorder + expiring
// split from inventory-routes.js (2026-05-03)

async function getRestaurantCostMap(restaurantId) {
  // 브랜드 공유 재료의 오버레이만 (2026-09-11 §8-4 D-5) — 매장 소유 재료는 재료 행 unit_cost 가 매장 층이라
  //   그 재료에 남은 옛 오버레이를 읽지 않는다(원가 칸 둘 → 하나). 단일 소스는 services/storeCost.js.
  const overlay = await require('../services/storeCost').loadOverlayMap(restaurantId);
  const map = {};
  overlay.forEach((v, k) => { map[k] = v; });
  return map;
}
const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
// 재고 숫자를 통째로 바꾸는 셋(초기재고·조정·실사 확정/취소)은 매니저 이상 — 일상 작업(입고·폐기·실사 입력)은 Staff 도 된다
//   (2026-10-08 Irene 컨펌 ④ · Fable 판정 Ⅱ-2-E). 매장엔 «매니저» 역할이 따로 없어 Staff 만 빠진다.
const STOCK_MANAGER_ROLES = ['System Admin', 'Restaurant Admin', 'Restaurant Owner', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager'];
const requireStockManager = requireRole(...STOCK_MANAGER_ROLES);
// 브랜드 공유 재료 접근·재고 규칙의 단일 소스 (docs/BRAND_STOCK_SHARING_DESIGN.md)
const { readableIngredient, stockFor, stockMapFor, overlayMapFor, effectiveSettings, applyStock, parentBrandIdOf, sellerLinkVisible } = require('../utils/brandStockAccess');
const { checkAndCreateAlert } = require('../utils/stockAlerts');
const { perBaseCost } = require('../utils/recipeCost');
const stockLedger = require('../services/stockLedger');
const { deductStockFIFO } = require('../services/inventoryDeductionService');
const { WASTE_REASONS, isWasteReason } = require('../utils/wasteReasons');

/**
 * 실사가 이 매장 소유인지 — URL 의 :restaurantId 는 checkRestaurantAccess 가 보지만,
 * :stockTakeId 가 그 매장 것인지는 아무도 안 봤다(남의 매장 실사를 열람·수정·완료·취소 가능).
 */
const stockTakeBelongsTo = (stockTake, restaurantId) =>
  !!stockTake && parseInt(stockTake.restaurant_id, 10) === parseInt(restaurantId, 10);

/**
 * 이 매장이 다룰 수 있는 재료인가 — 자기 재료 ∪ 부모 브랜드 재료.
 * 예전엔 Ingredient.findByPk 만 하고 소유권을 안 봐서 남의 매장 재료 id 로도 입고가 됐다(IDOR).
 */
const ownedIngredient = (ingredientId, restaurantId, transaction) =>
  readableIngredient(ingredientId, { type: 'restaurant', id: parseInt(restaurantId, 10) }, transaction);
const { deleteOldImages } = require('../utils/imageProcessor');

// Apply auth middleware to all routes
router.use(authenticateToken);

// 보안: 모든 라우트가 :restaurantId 파라미터를 가지므로 IDOR 방어를 위해
// :restaurantId 패턴에 checkRestaurantAccess 일괄 적용
router.use('/:restaurantId', checkRestaurantAccess);

// ============================================
// 재고 현황 APIs
// ============================================

// GET /api/restaurants/:restaurantId/inventory - 재고 현황 (전체)
router.get('/:restaurantId/inventory', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { category, status, search } = req.query;

    // Get restaurant's brand_id
    const restaurant = await Restaurant.findByPk(restaurantId, {
      attributes: ['id', 'brand_id']
    });

    // Build where clause to include both restaurant and brand ingredients
    const orConditions = [{ restaurant_id: restaurantId }];
    if (restaurant?.brand_id) {
      orConditions.push({ brand_id: restaurant.brand_id });
    }

    const whereClause = {
      [Op.or]: orConditions,
      is_active: true
      // 2026-09-01(Q5): track_stock 필터 제거 — 목록은 활성 재료를 전부 보여준다.
      // 예전에는 스위치가 꺼진 재료가 목록에서 사라져, 발주 화면에 "스톡엔 있는데 없다"가 났다.
    };

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    let ingredients = await Ingredient.findAll({
      where: whereClause,
      order: [['name', 'ASC']]
    });

    // 준비 재료의 «어느 레시피에서 나왔나» 이름 — 화면이 출처 줄을 그린다. 한 번에 읽는다(N+1 방지).
    const prepRecipeIds = [...new Set(ingredients.map(i => i.source_recipe_id).filter(Boolean))];
    const prepRecipeNames = {};
    if (prepRecipeIds.length) {
      const { Recipe } = require('../models');
      const rows = await Recipe.findAll({ where: { id: prepRecipeIds }, attributes: ['id', 'name'] });
      for (const r of rows) prepRecipeNames[r.id] = r.name;
    }

    // 입고예정(on-order) — 활성 발주(주문됐으나 미입고)의 남은 수량을 ingredient 별로 집계.
    // 재고 증가 공식과 동일하게 (quantity_ordered - quantity_received) × unit_conversion 로 재고단위 환산.
    // 목적: "이미 발주해서 들어올 양"을 미리 보여 중복 발주 방지.
    // pending_approval 포함 — 승인 대기 중인 수량이 '입고예정'에 안 잡히면 같은 재료를 또 발주하게 된다
    const ACTIVE_PO_STATUSES = ['pending_approval', 'submitted', 'confirmed', 'shipped', 'in_transit', 'delivered', 'partial_received'];
    const onOrderMap = {}; // ingredient_id → { qty, date }
    const ingIds = ingredients.map(i => i.id);
    if (ingIds.length > 0) {
      const activePOs = await PurchaseOrder.findAll({
        where: {
          entity_type: 'restaurant',
          entity_id: restaurantId,
          status: { [Op.in]: ACTIVE_PO_STATUSES }
        },
        attributes: ['id', 'expected_delivery_date'],
        include: [{
          model: PurchaseOrderItem,
          as: 'items',
          attributes: ['ingredient_id', 'quantity_ordered', 'quantity_received', 'unit_conversion'],
          where: { ingredient_id: { [Op.in]: ingIds } },
          required: true
        }]
      });
      for (const po of activePOs) {
        for (const it of (po.items || [])) {
          const remaining = (parseFloat(it.quantity_ordered) || 0) - (parseFloat(it.quantity_received) || 0);
          if (remaining <= 0) continue;
          const conv = parseFloat(it.unit_conversion) || 1;
          const add = Math.round(remaining * conv * 100) / 100;
          const cur = onOrderMap[it.ingredient_id] || { qty: 0, date: null };
          cur.qty = Math.round((cur.qty + add) * 100) / 100;
          // 가장 빠른 입고예정일
          if (po.expected_delivery_date && (!cur.date || po.expected_delivery_date < cur.date)) {
            cur.date = po.expected_delivery_date;
          }
          onOrderMap[it.ingredient_id] = cur;
        }
      }
    }

    // 공급처 연결 여부 — **발주 가능한가**의 단일 소스. (2026-08-25)
    // 재고 화면이 이 값을 "재고부족 발주제안"(/purchase-orders/suggestions)에서 유추하고 있었는데,
    // 그 목록은 `min_stock > 0 && 현재고 < min_stock` 인 것만 담는다. 최소치를 안 정한 품목은
    // 연결이 멀쩡해도 제안에 안 나오고, 화면은 그걸 "No supplier linked" 로 읽어 **주문 버튼을
    // 통째로 감췄다**(운영 실측: 매장 77건이 연결돼 있는데 발주 불가로 보였다).
    // 연결 여부와 부족 여부는 다른 질문이다 — 여기서 연결만 따로 답한다.
    const sellerLinkedIds = new Set();
    if (ingIds.length > 0) {
      const { IngredientSellerProduct } = require('../models');
      const links = await IngredientSellerProduct.findAll({
        where: { ingredient_id: { [Op.in]: ingIds }, is_active: true },
        attributes: ['ingredient_id', 'buyer_restaurant_id', 'seller_type', 'seller_entity_id']
      });
      // 형제 매장이 브랜드 재료에 붙인 연결은 이 매장의 «발주 가능» 이 아니다(2026-10-04)
      const ingById = new Map(ingredients.map(i => [i.id, i]));
      const buyerForLinks = { type: 'restaurant', id: parseInt(restaurantId, 10) };
      for (const l of links) {
        if (sellerLinkVisible(l, ingById.get(l.ingredient_id), buyerForLinks)) sellerLinkedIds.add(l.ingredient_id);
      }
    }

    // 브랜드 공유 재료의 실재고·PAR 은 매장 오버레이가 단일 소스 (브랜드 행 값이 아님).
    // PAR(min_stock/리드타임/사용량)이 매장별인 이유: 지점마다 좌석·회전율이 달라 발주점이 같을 수 없다.
    const brandOverlay = await overlayMapFor(
      restaurantId,
      ingredients.filter(i => i.owner_type === 'brand').map(i => i.id)
    );

    // Add stock status
    ingredients = ingredients.map(ing => {
      const isBrandShared = ing.owner_type === 'brand';
      const overlay = isBrandShared ? brandOverlay[ing.id] : null;
      const eff = effectiveSettings(ing, overlay);       // 브랜드 기본값 + 매장 오버라이드
      const currentStock = isBrandShared
        ? (overlay ? parseFloat(overlay.current_stock) || 0 : 0)
        : (parseFloat(ing.current_stock) || 0);
      const minStock = parseFloat(eff.min_stock) || 0;

      let stockStatus = 'normal';
      if (currentStock <= 0) {
        stockStatus = 'out_of_stock';
      } else if (currentStock <= minStock) {
        stockStatus = 'low_stock';
      }

      const onOrder = onOrderMap[ing.id] || null;
      return {
        ...eff,                                          // 재료 정의 + 이 매장의 유효 PAR
        current_stock: currentStock,
        is_brand_shared: isBrandShared, // 프론트: Brand 배지 (재료 정의는 여전히 읽기전용)
        read_only: isBrandShared,
        stock_status: stockStatus,
        has_seller_source: sellerLinkedIds.has(ing.id),
        // 준비된 재고(1차 가공) — 이 재료를 «만드는» 레시피 (2026-09-17 Fable 판정).
        //   화면은 이 값이 있으면 «입고» 대신 «만들기» 를 띄운다.
        source_recipe_id: ing.source_recipe_id || null,
        source_recipe_name: prepRecipeNames[ing.source_recipe_id] || null,
        on_order_quantity: onOrder ? onOrder.qty : 0,
        on_order_delivery_date: onOrder ? onOrder.date : null
      };
    });

    // Filter by status if provided
    if (status) {
      ingredients = ingredients.filter(ing => ing.stock_status === status);
    }

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/restaurants/:restaurantId/inventory/summary - 요약
router.get('/:restaurantId/inventory/summary', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Get restaurant's brand_id
    const restaurant = await Restaurant.findByPk(restaurantId, {
      attributes: ['id', 'brand_id']
    });

    // Build where clause to include both restaurant and brand ingredients
    const orConditions = [{ restaurant_id: restaurantId }];
    if (restaurant?.brand_id) {
      orConditions.push({ brand_id: restaurant.brand_id });
    }

    const ingredients = await Ingredient.findAll({
      where: { [Op.or]: orConditions, is_active: true }
    });

    let totalItems = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    // 브랜드 공유 재료의 재고·임계치는 매장 오버레이가 단일 소스 — 브랜드 행으로 집계하면
    // 부족/품절 수가 왜곡된다(지점마다 재고도 발주점도 다르다)
    const summaryOverlay = await overlayMapFor(
      restaurantId,
      ingredients.filter(i => i.owner_type === 'brand').map(i => i.id)
    );

    ingredients.forEach(ing => {
      totalItems++;
      const ov = ing.owner_type === 'brand' ? summaryOverlay[ing.id] : null;
      const effS = effectiveSettings(ing, ov);
      const currentStock = ing.owner_type === 'brand'
        ? (ov ? parseFloat(ov.current_stock) || 0 : 0)
        : (parseFloat(ing.current_stock) || 0);
      const minStock = parseFloat(effS.min_stock) || 0;

      if (currentStock <= 0) {
        outOfStockCount++;
      } else if (currentStock <= minStock) {
        lowStockCount++;
      }
    });

    // Get this month's loss from stock takes (timezone-aware)
    const tz = getRestaurantTimezone(restaurant);
    const monthStart = getStartOfMonth(tz);

    const stockTakes = await StockTake.findAll({
      where: {
        restaurant_id: restaurantId,
        status: 'completed',
        completed_at: { [Op.gte]: monthStart }
      }
    });

    const monthlyLoss = stockTakes.reduce((sum, st) => {
      return sum + (parseFloat(st.total_variance_value) || 0);
    }, 0);

    // Get unresolved alerts count
    const unresolvedAlerts = await StockAlert.count({
      where: {
        restaurant_id: restaurantId,
        is_resolved: false
      }
    });

    res.json({
      success: true,
      data: {
        total_items: totalItems,
        low_stock_count: lowStockCount,
        out_of_stock_count: outOfStockCount,
        monthly_loss: monthlyLoss,
        unresolved_alerts: unresolvedAlerts
      }
    });
  } catch (error) {
    console.error('Get inventory summary error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/restaurants/:restaurantId/inventory/alerts - 알림 목록
router.get('/:restaurantId/inventory/alerts', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { resolved } = req.query;

    const whereClause = { restaurant_id: restaurantId };
    if (resolved !== undefined) {
      whereClause.is_resolved = resolved === 'true';
    }

    const alerts = await StockAlert.findAll({
      where: whereClause,
      include: [{
        model: Ingredient,
        as: 'ingredient',
        attributes: ['id', 'name', 'unit', 'unit_cost']
      }],
      order: [['created_at', 'DESC']]
    });

    res.json({ success: true, data: alerts });
  } catch (error) {
    console.error('Get alerts error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/restaurants/:restaurantId/inventory/alerts/:alertId/resolve - 알림 해결
router.put('/:restaurantId/inventory/alerts/:alertId/resolve', async (req, res) => {
  try {
    const { alertId } = req.params;

    await StockAlert.update(
      { is_resolved: true, resolved_at: new Date() },
      { where: { id: alertId } }
    );

    res.json({ success: true, message: 'Alert resolved' });
  } catch (error) {
    console.error('Resolve alert error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// 재고 변동 APIs
// ============================================

// POST /api/restaurants/:restaurantId/inventory/initial - 초기 재고 설정
router.post('/:restaurantId/inventory/initial', requireStockManager, async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const { items } = req.body; // [{ ingredient_id, quantity }]
    const userId = req.user.id;

    for (const item of items) {
      const ingredient = await ownedIngredient(item.ingredient_id, restaurantId, transaction);
      if (!ingredient) continue; // 남의 매장/브랜드 재료 → 무시

      const quantity = parseFloat(item.quantity) || 0;

      // 브랜드 공유 재료는 매장 오버레이에, 매장 재료는 재료 행에 (형제 매장 재고 오염 방지) — stockLedger 가 같은 규칙.
      // 장부 수량 = 실제 바뀐 양(새 값 − 지금 값). 예전엔 새 값 자체를 적어 기존 재고가 있으면 장부 합이 틀어졌다.
      await stockLedger.record({
        target: { kind: 'ingredient', row: ingredient }, restaurantId, type: 'initial',
        setTo: quantity, applyOpts: { stockTake: true }, keepZero: true,
        notes: 'Initial stock setup', userId, transaction,
      });
      if (ingredient.owner_type !== 'brand') {
        await ingredient.update({ last_actual_stock: quantity }, { transaction });
      }
    }

    await transaction.commit();
    res.json({ success: true, message: 'Initial stock set successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Set initial stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/restaurants/:restaurantId/inventory/open-po-lines?ingredient_id=N
// 이 재료가 담긴 "입고 가능한" 발주 라인을 돌려준다.
// 용도: 재고 화면에서 입고하려는 품목이 진행 중 발주에 들어 있으면 사용자에게 알려주고
//       발주 입고 경로로 태울지 고르게 한다. 재고 입고와 발주 입고가 서로를 몰라
//       같은 물건이 두 번 더해지던 구멍을 막는 것이 목적이다.
// ⚠ 조회 전용 — 상태를 바꾸지 않는다. 실제 입고는 POST /purchase-orders/:id/receive 가 유일한 경로.
router.get('/:restaurantId/inventory/open-po-lines', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const ingredientId = parseInt(req.query.ingredient_id, 10);
    if (!Number.isFinite(ingredientId)) {
      return res.status(400).json({ success: false, message: 'ingredient_id is required' });
    }
    // 남의 매장 재료 id 로 남의 발주를 들여다보지 못하게 소유권부터 본다.
    const ingredient = await ownedIngredient(ingredientId, restaurantId);
    if (!ingredient) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    // purchase-orders-workflow.js 의 RECEIVABLE_STATUSES 와 같은 집합.
    // pending_approval 은 제외 — 승인 전에는 입고할 수 없다.
    const RECEIVABLE = ['submitted', 'confirmed', 'shipped', 'in_transit', 'delivered', 'partial_received'];

    const pos = await PurchaseOrder.findAll({
      where: {
        entity_type: 'restaurant',
        entity_id: restaurantId,
        status: { [Op.in]: RECEIVABLE }
      },
      attributes: ['id', 'po_number', 'status', 'expected_delivery_date', 'submitted_at'],
      include: [{
        model: PurchaseOrderItem,
        as: 'items',
        attributes: ['id', 'ingredient_id', 'quantity_ordered', 'quantity_received', 'unit_conversion', 'unit_price'],
        where: { ingredient_id: ingredientId },
        required: true
      }],
      order: [['submitted_at', 'ASC']]
    });

    const lines = [];
    for (const po of pos) {
      for (const it of (po.items || [])) {
        const remaining = Math.round(((parseFloat(it.quantity_ordered) || 0) - (parseFloat(it.quantity_received) || 0)) * 100) / 100;
        if (remaining <= 0) continue; // 이미 다 받은 줄은 제안하지 않는다
        lines.push({
          purchase_order_id: po.id,
          po_number: po.po_number,
          po_status: po.status,
          expected_delivery_date: po.expected_delivery_date,
          item_id: it.id,
          quantity_ordered: parseFloat(it.quantity_ordered) || 0,
          quantity_received: parseFloat(it.quantity_received) || 0,
          quantity_remaining: remaining,
          unit_conversion: parseFloat(it.unit_conversion) || 1,
          unit_price: parseFloat(it.unit_price) || 0,
          ingredient_unit: ingredient.unit
        });
      }
    }

    res.json({ success: true, data: lines });
  } catch (error) {
    console.error('open-po-lines error:', error);
    res.status(500).json({ success: false, message: 'Failed to load open purchase order lines' });
  }
});

// POST /api/restaurants/:restaurantId/inventory/receive - 입고 처리 (배치 정보 포함)
router.post('/:restaurantId/inventory/receive', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const {
      ingredient_id,
      quantity,
      notes,
      // Batch fields
      batch_number,
      manufacture_date,
      expiry_date,
      unit_cost,
      supplier_id
    } = req.body;
    const userId = req.user.id;

    const ingredient = await ownedIngredient(ingredient_id, restaurantId, transaction);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    // Round to 2 decimal places for consistency
    const addQty = Math.round((parseFloat(quantity) || 0) * 100) / 100;
    // 재고 + 장부를 한 번에. 수동 입고도 실제 매입이다 — 본문 unit_cost(취급단위 1 의 값)가 있으면
    //   장부 금액 = 그 값 × 기준양 기준, 매장 원가도 «마지막 실제 매입가» 로 (2026-10-08 Fable 게이트 Ⅲ-B 2).
    //   없으면 그 순간 매장 원가로 금액만 남긴다(원가는 안 바꿈).
    const manualUnit = parseFloat(unit_cost);
    const baseQty = parseFloat(ingredient.base_quantity) || 1;
    const hasPrice = Number.isFinite(manualUnit) && manualUnit > 0;
    const { after: newStock } = await stockLedger.record({
      target: { kind: 'ingredient', row: ingredient }, restaurantId, type: 'purchase',
      delta: addQty, applyOpts: { stockTake: true },
      cost: hasPrice ? { unit_cost: manualUnit * baseQty, base_quantity: baseQty } : null,
      notes: notes || 'Stock received', userId, transaction,
    });
    if (hasPrice) {
      const { writeStoreCost } = require('../services/storeCost');
      await writeStoreCost(restaurantId, ingredient, Math.round(manualUnit * baseQty * 10000) / 10000, {
        transaction, userId, notes: notes || 'Manual receive', log: { source: 'receive' },
      });
    }

    // Create inventory batch for FIFO tracking
    const batch = await InventoryBatch.create({
      restaurant_id: restaurantId,
      ingredient_id: ingredient_id,
      batch_number: batch_number || null,
      initial_quantity: addQty,
      remaining_quantity: addQty,
      unit: ingredient.unit,
      unit_cost: unit_cost || (await getRestaurantCostMap(restaurantId))[ingredient_id] || ingredient.unit_cost || 0,
      manufacture_date: manufacture_date || null,
      expiry_date: expiry_date || null,
      received_date: new Date(),
      status: 'active',
      supplier_id: supplier_id || ingredient.supplier_id || null,
      notes: notes || null,
      created_by: userId
    }, { transaction });

    // Resolve any related alerts
    await StockAlert.update(
      { is_resolved: true, resolved_at: new Date() },
      {
        where: {
          ingredient_id: ingredient_id,
          restaurant_id: restaurantId, // 브랜드 공유 재료는 매장마다 알림이 다르다
          is_resolved: false
        },
        transaction
      }
    );

    await transaction.commit();
    res.json({
      success: true,
      message: 'Stock received successfully',
      new_stock: newStock,
      batch_id: batch.id
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Receive stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/waste - 폐기 처리
router.post('/:restaurantId/inventory/waste', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const { ingredient_id, quantity, notes, reason_code } = req.body;
    const userId = req.user.id;

    // 폐기 사유 코드 필수 — 폐기 리포트가 «왜 버렸나» 로 나눠 센다(utils/wasteReasons.js)
    if (!isWasteReason(reason_code)) {
      await transaction.rollback();
      return res.status(400).json({ success: false, code: 'WASTE_REASON_REQUIRED', message: `reason_code must be one of: ${WASTE_REASONS.join(', ')}`, reasons: WASTE_REASONS });
    }

    const ingredient = await ownedIngredient(ingredient_id, restaurantId, transaction);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const wasteQty = parseFloat(quantity) || 0;
    // 장부에는 «실제로 깎인 양» — 재고보다 많이 폐기하면 재고는 0 에서 멈춘다(clampAtZero)
    const { after: newStock, change } = await stockLedger.record({
      target: { kind: 'ingredient', row: ingredient }, restaurantId, type: 'waste',
      delta: -wasteQty, clampAtZero: true, reasonCode: reason_code,
      notes: notes || 'Stock wasted', userId, transaction,
    });
    const actualWasted = -change;
    // 폐기도 배치를 줄인다 — 안 줄이면 유통기한 목록에 이미 버린 양이 남는다
    if (actualWasted > 0) await deductStockFIFO(ingredient.id, actualWasted, transaction, restaurantId);

    // Check for low stock alert
    await checkAndCreateAlert(ingredient_id, restaurantId, newStock, transaction);

    await transaction.commit();
    res.json({ success: true, message: 'Waste recorded successfully', new_stock: newStock, wasted: actualWasted, clamped: actualWasted < wasteQty });
  } catch (error) {
    await transaction.rollback();
    console.error('Record waste error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/adjust - 수동 조정
// Accepts either:
//   { ingredient_id, quantity }       — incremental delta (legacy)
//   { ingredient_id, new_quantity }   — absolute target value (used by inline edit)
router.post('/:restaurantId/inventory/adjust', requireStockManager, async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const { ingredient_id, quantity, new_quantity, notes, reason } = req.body;
    const userId = req.user.id;

    const ingredient = await ownedIngredient(ingredient_id, restaurantId, transaction);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const absolute = new_quantity !== undefined && new_quantity !== null && new_quantity !== '';
    // Absolute mode — set stock to exact value / Incremental mode — add delta to current (둘 다 0 아래로는 안 간다)
    const { after: newStock } = await stockLedger.record({
      target: { kind: 'ingredient', row: ingredient }, restaurantId, type: 'adjustment',
      ...(absolute ? { setTo: Math.max(0, parseFloat(new_quantity) || 0) } : { delta: parseFloat(quantity) || 0, clampAtZero: true }),
      notes: notes || reason || 'Manual adjustment', userId, transaction,
    });

    // Check for low stock alert
    await checkAndCreateAlert(ingredient_id, restaurantId, newStock, transaction);

    await transaction.commit();
    res.json({ success: true, message: 'Stock adjusted successfully', new_stock: newStock });
  } catch (error) {
    await transaction.rollback();
    console.error('Adjust stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/restaurants/:restaurantId/inventory/transactions - 거래 내역 (Ingredients + General Stock)
router.get('/:restaurantId/inventory/transactions', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { ingredient_id, type, from_date, to_date, limit = 100, offset = 0 } = req.query;

    // 1. Ingredient transactions
    const ingredientWhereClause = { restaurant_id: restaurantId };

    if (ingredient_id) {
      ingredientWhereClause.ingredient_id = ingredient_id;
    }

    if (type) {
      ingredientWhereClause.transaction_type = type;
    }

    if (from_date || to_date) {
      ingredientWhereClause.created_at = {};
      if (from_date) ingredientWhereClause.created_at[Op.gte] = new Date(from_date);
      if (to_date) ingredientWhereClause.created_at[Op.lte] = new Date(to_date);
    }

    const ingredientTransactions = await InventoryTransaction.findAll({
      where: ingredientWhereClause,
      include: [{
        model: Ingredient,
        as: 'ingredient',
        attributes: ['id', 'name', 'unit']
      }],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit)
    });

    // 2. General Stock transactions
    let generalStockTransactions = [];
    try {
      if (GeneralStockTransaction) {
        const gsWhereClause = { restaurant_id: parseInt(restaurantId) };

        if (type) {
          // Map transaction types between the two models
          const typeMap = { 'purchase': 'receive', 'receive': 'receive' };
          gsWhereClause.transaction_type = typeMap[type] || type;
        }

        if (from_date || to_date) {
          gsWhereClause.created_at = {};
          if (from_date) gsWhereClause.created_at[Op.gte] = new Date(from_date);
          if (to_date) gsWhereClause.created_at[Op.lte] = new Date(to_date);
        }

        generalStockTransactions = await GeneralStockTransaction.findAll({
          where: gsWhereClause,
          include: [{
            model: GeneralStock,
            as: 'generalStock',
            attributes: ['id', 'name', 'unit']
          }],
          order: [['created_at', 'DESC']],
          limit: parseInt(limit)
        });
      }
    } catch (gsError) {
      console.error('General stock transactions fetch error (non-critical):', gsError.message);
    }

    // 3. Combine and format transactions
    const formattedIngredientTx = ingredientTransactions.map(t => ({
      id: t.id,
      source: 'ingredient',
      transaction_type: t.transaction_type,
      quantity_change: parseFloat(t.quantity_change),
      unit: t.unit,
      stock_after: parseFloat(t.stock_after),
      notes: t.notes,
      created_at: t.created_at,
      ingredient: t.ingredient ? {
        id: t.ingredient.id,
        name: t.ingredient.name,
        unit: t.ingredient.unit
      } : null
    }));

    const formattedGsTx = generalStockTransactions.map(t => ({
      id: `gs-${t.id}`,
      source: 'general_stock',
      transaction_type: t.transaction_type === 'receive' ? 'purchase' : t.transaction_type,
      quantity_change: parseFloat(t.quantity_change),
      unit: t.unit,
      stock_after: parseFloat(t.stock_after),
      notes: t.notes,
      created_at: t.created_at,
      ingredient: t.generalStock ? {
        id: t.generalStock.id,
        name: `[GS] ${t.generalStock.name}`,
        unit: t.generalStock.unit
      } : null
    }));

    // 4. Merge and sort by date
    const allTransactions = [...formattedIngredientTx, ...formattedGsTx]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: allTransactions,
      pagination: {
        total: allTransactions.length,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// 재고 실사 APIs
// ============================================

// GET /api/restaurants/:restaurantId/stock-takes - 실사 목록
router.get('/:restaurantId/stock-takes', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { status, limit = 20, offset = 0 } = req.query;

    const whereClause = { restaurant_id: restaurantId };
    if (status) {
      whereClause.status = status;
    }

    const { count, rows: stockTakes } = await StockTake.findAndCountAll({
      where: whereClause,
      order: [['stock_take_date', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: stockTakes,
      pagination: { total: count, limit: parseInt(limit), offset: parseInt(offset) }
    });
  } catch (error) {
    console.error('Get stock takes error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/stock-takes - 새 실사 시작
router.post('/:restaurantId/stock-takes', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const userId = req.user.id;

    // Check if there's an in-progress stock take
    const existingStockTake = await StockTake.findOne({
      where: {
        restaurant_id: restaurantId,
        status: 'in_progress'
      }
    });

    if (existingStockTake) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'There is already an in-progress stock take',
        existing_id: existingStockTake.id
      });
    }

    // Create new stock take
    const stockTake = await StockTake.create({
      restaurant_id: restaurantId,
      stock_take_date: new Date(),
      status: 'in_progress',
      created_by: userId
    }, { transaction });

    // 실사 대상 = 내 재료 ∪ 부모 브랜드 표준 재료 (2026-09-01: track_stock 조건 제거, is_active 만 —
    // 추적 안 하는 재료는 세어봐야 applyStock 이 기록을 스킵해 조용히 버려진다).
    // 부분 실사(2026-10-08 · Fable 판정 Ⅱ-3-E): category_ids 를 주면 그 분류 재료만 센다(냉장고 하나·건자재만 등)
    const categoryIds = Array.isArray(req.body && req.body.category_ids)
      ? req.body.category_ids.map(Number).filter(n => Number.isInteger(n) && n > 0) : [];
    const brandId = await parentBrandIdOf(restaurantId, transaction);
    const ingredients = await Ingredient.findAll({
      where: {
        is_active: true,
        [Op.or]: [
          { restaurant_id: restaurantId },
          ...(brandId ? [{ owner_type: 'brand', brand_id: brandId }] : [])
        ],
        ...(categoryIds.length ? { ingredient_category_id: categoryIds } : {})
      },
      transaction
    });
    if (!ingredients.length) {
      await transaction.rollback();
      return res.status(400).json({ success: false, code: 'NO_ITEMS', message: 'No ingredients to count in the selected categories' });
    }

    // 레스토랑 코스트 오버라이드 맵 조회
    const costMap = await getRestaurantCostMap(restaurantId);
    // 브랜드 재료의 기대재고는 브랜드 행이 아니라 **이 매장의 오버레이**가 진실이다
    const takeStockMap = await stockMapFor(
      restaurantId,
      ingredients.filter(i => i.owner_type === 'brand').map(i => i.id),
      transaction
    );

    for (const ing of ingredients) {
      const effectiveCost = costMap[ing.id] !== undefined ? costMap[ing.id] : (parseFloat(ing.unit_cost) || 0);
      const theoretical = ing.owner_type === 'brand'
        ? (takeStockMap[ing.id] || 0)
        : (parseFloat(ing.current_stock) || 0);
      await StockTakeItem.create({
        stock_take_id: stockTake.id,
        ingredient_id: ing.id,
        theoretical_stock: theoretical,
        unit_cost: effectiveCost
      }, { transaction });
    }

    await StockTake.update(
      { total_items: ingredients.length },
      { where: { id: stockTake.id }, transaction }
    );

    await transaction.commit();

    // Fetch the complete stock take with items
    const completeStockTake = await StockTake.findByPk(stockTake.id, {
      include: [{
        model: StockTakeItem,
        as: 'items',
        include: [{
          model: Ingredient,
          as: 'ingredient',
          attributes: ['id', 'name', 'unit', 'category', 'owner_type', 'base_quantity']
        }]
      }]
    });

    res.json({ success: true, data: completeStockTake });
  } catch (error) {
    await transaction.rollback();
    console.error('Create stock take error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/restaurants/:restaurantId/stock-takes/:stockTakeId - 실사 상세
router.get('/:restaurantId/stock-takes/:stockTakeId', async (req, res) => {
  try {
    const { restaurantId, stockTakeId } = req.params;

    const stockTake = await StockTake.findByPk(stockTakeId, {
      include: [{
        model: StockTakeItem,
        as: 'items',
        include: [{
          model: Ingredient,
          as: 'ingredient',
          attributes: ['id', 'name', 'unit', 'category', 'owner_type', 'base_quantity']
        }]
      }]
    });

    if (!stockTakeBelongsTo(stockTake, restaurantId)) {
      return res.status(404).json({ success: false, message: 'Stock take not found' });
    }

    res.json({ success: true, data: stockTake });
  } catch (error) {
    console.error('Get stock take error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/restaurants/:restaurantId/stock-takes/:stockTakeId/items - 실사 항목 업데이트
router.put('/:restaurantId/stock-takes/:stockTakeId/items', async (req, res) => {
  try {
    const { restaurantId, stockTakeId } = req.params;
    const { items } = req.body; // [{ id, actual_stock, variance_reason, notes }]

    const stockTake = await StockTake.findByPk(stockTakeId);
    if (!stockTakeBelongsTo(stockTake, restaurantId)) {
      return res.status(404).json({ success: false, message: 'Stock take not found' });
    }
    if (stockTake.status !== 'in_progress') {
      return res.status(400).json({ success: false, message: 'Stock take not found or not in progress' });
    }

    for (const item of items) {
      const actualStock = parseFloat(item.actual_stock);
      if (isNaN(actualStock)) continue;

      const stockTakeItem = await StockTakeItem.findByPk(item.id);
      // 이 실사에 속한 항목만 — 남의 실사 항목 id 를 섞어 보내는 것을 막는다
      if (!stockTakeItem || parseInt(stockTakeItem.stock_take_id, 10) !== parseInt(stockTake.id, 10)) continue;

      const variance = parseFloat(stockTakeItem.theoretical_stock) - actualStock;
      // unit_cost 는 «기준양(base_quantity)의 가격» — 수량에 곱하기 전에 기준양으로 나눈다
      //   (docs/TRADE_STRUCTURE.md §2-2). 안 나누면 1000 g 재료는 손실 금액이 1000배.
      const costIng = await Ingredient.findByPk(stockTakeItem.ingredient_id, { attributes: ['base_quantity'] });
      const varianceValue = variance * perBaseCost(stockTakeItem.unit_cost, costIng && costIng.base_quantity);

      await StockTakeItem.update({
        actual_stock: actualStock,
        variance: variance,
        variance_value: varianceValue,
        variance_reason: item.variance_reason || null,
        notes: item.notes || null,
        counted_at: new Date()
      }, { where: { id: item.id } });
    }

    // Fetch updated stock take
    const updatedStockTake = await StockTake.findByPk(stockTakeId, {
      include: [{
        model: StockTakeItem,
        as: 'items',
        include: [{
          model: Ingredient,
          as: 'ingredient',
          attributes: ['id', 'name', 'unit', 'category', 'owner_type', 'base_quantity']
        }]
      }]
    });

    res.json({ success: true, data: updatedStockTake });
  } catch (error) {
    console.error('Update stock take items error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/stock-takes/:stockTakeId/complete - 실사 완료
router.post('/:restaurantId/stock-takes/:stockTakeId/complete', requireStockManager, async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId, stockTakeId } = req.params;
    const userId = req.user.id;

    const stockTake = await StockTake.findByPk(stockTakeId, {
      include: [{ model: StockTakeItem, as: 'items' }]
    });

    if (!stockTakeBelongsTo(stockTake, restaurantId)) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Stock take not found' });
    }
    if (stockTake.status !== 'in_progress') {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'Stock take not found or not in progress' });
    }

    // 센 항목만 반영한다(2026-10-08 · Fable 판정 Ⅱ-3-E) — 안 센 항목은 수량·장부 그대로(skipped).
    //   예전엔 한 개라도 안 세면 완료가 400 이라 «냉장고 하나만» 같은 부분 실사가 불가능했다.
    const countedItems = stockTake.items.filter(item => item.actual_stock !== null);
    const skippedCount = stockTake.items.length - countedItems.length;
    if (!countedItems.length) {
      await transaction.rollback();
      return res.status(400).json({ success: false, code: 'NOTHING_COUNTED', message: 'No items have been counted yet' });
    }

    // 실사 시작 뒤 움직인 양(판매·입고·폐기 …) — 기대 재고 = 시작 때 재고 + 그 뒤 움직임. 차이는 이 기대값과 비교한다.
    //   (재고 반영 자체는 stockLedger 가 «실측 − 지금 재고» 로 맞추므로 따로 보정할 필요가 없다)
    const movementRows = await database.sequelize.query(
      `SELECT ingredient_id, SUM(quantity_change) q FROM inventory_transactions
        WHERE entity_type = 'restaurant' AND entity_id = :rid AND ingredient_id IN (:ids)
          AND created_at >= :since AND transaction_type <> 'stock_take'
        GROUP BY ingredient_id`,
      { replacements: { rid: parseInt(restaurantId, 10), ids: countedItems.map(i => i.ingredient_id), since: stockTake.created_at },
        type: database.sequelize.QueryTypes.SELECT, transaction });
    const movement = new Map(movementRows.map(r => [Number(r.ingredient_id), Number(r.q) || 0]));
    const movementSinceStart = [];

    // Calculate summary
    let totalVarianceValue = 0;
    let itemsWithVariance = 0;
    let totalTheoreticalValue = 0;

    for (const item of countedItems) {
      // 재료 1회만 조회해 기준양·unit 까지 재사용(예전엔 트랜잭션 로그용으로 또 조회했다).
      const ing = await Ingredient.findByPk(item.ingredient_id, { transaction });
      const perUnit = perBaseCost(item.unit_cost, ing && ing.base_quantity);
      const moved = Math.round((movement.get(Number(item.ingredient_id)) || 0) * 100) / 100;
      const expected = Math.round((parseFloat(item.theoretical_stock) + moved) * 100) / 100;
      const variance = Math.round((expected - parseFloat(item.actual_stock)) * 100) / 100;
      const varianceValue = Math.round(variance * perUnit * 100) / 100;
      if (moved !== 0) movementSinceStart.push({ item_id: item.id, ingredient_id: item.ingredient_id, movement: moved, expected });
      await StockTakeItem.update({ variance, variance_value: varianceValue }, { where: { id: item.id }, transaction });
      const theoreticalValue = expected * perUnit;

      totalTheoreticalValue += theoreticalValue;

      if (variance !== 0) {
        itemsWithVariance++;
        totalVarianceValue += varianceValue;
      }

      // 재고 반영 + 장부 — 브랜드 표준 재료는 **이 매장의 오버레이**에만(공유 행을 덮으면 형제 매장 오염, stockLedger 가 같은 규칙).
      // 장부 수량 = 실측 − **지금** 재고(실사 시작 뒤 판매·입고가 있었어도 장부 합 = 현재고가 유지된다).
      // 금액 근거 = 실사 생성 때 찍은 원가(item.unit_cost, 기준양의 가격).
      if (ing) {
        await stockLedger.record({
          target: { kind: 'ingredient', row: ing }, restaurantId, type: 'stock_take',
          setTo: parseFloat(item.actual_stock), applyOpts: { stockTake: true, recordActual: true },
          cost: { unit_cost: item.unit_cost, base_quantity: ing.base_quantity },
          refs: { stock_take_id: stockTakeId },
          notes: `Stock take adjustment - Reason: ${item.variance_reason || 'not specified'}`,
          userId, transaction,
        });
      }

      // Check for low stock alert
      await checkAndCreateAlert(item.ingredient_id, restaurantId, parseFloat(item.actual_stock), transaction);
    }

    const variancePercentage = totalTheoreticalValue > 0
      ? (totalVarianceValue / totalTheoreticalValue) * 100
      : 0;

    // Update stock take
    await StockTake.update({
      status: 'completed',
      items_with_variance: itemsWithVariance,
      total_variance_value: totalVarianceValue,
      variance_percentage: variancePercentage,
      completed_at: new Date()
    }, { where: { id: stockTakeId }, transaction });

    await transaction.commit();

    // Fetch completed stock take
    const completedStockTake = await StockTake.findByPk(stockTakeId, {
      include: [{
        model: StockTakeItem,
        as: 'items',
        include: [{
          model: Ingredient,
          as: 'ingredient',
          attributes: ['id', 'name', 'unit', 'category', 'owner_type', 'base_quantity']
        }]
      }]
    });

    res.json({ success: true, data: completedStockTake, skipped_count: skippedCount, movement_since_start: movementSinceStart });
  } catch (error) {
    await transaction.rollback();
    console.error('Complete stock take error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/stock-takes/:stockTakeId/cancel - 실사 취소
router.post('/:restaurantId/stock-takes/:stockTakeId/cancel', requireStockManager, async (req, res) => {
  try {
    const { restaurantId, stockTakeId } = req.params;

    const stockTake = await StockTake.findByPk(stockTakeId);
    if (!stockTakeBelongsTo(stockTake, restaurantId)) {
      return res.status(404).json({ success: false, message: 'Stock take not found' });
    }
    if (stockTake.status !== 'in_progress') {
      return res.status(400).json({ success: false, message: 'Stock take not found or not in progress' });
    }

    await StockTake.update(
      { status: 'cancelled' },
      { where: { id: stockTakeId } }
    );

    res.json({ success: true, message: 'Stock take cancelled' });
  } catch (error) {
    console.error('Cancel stock take error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// 발주 제안 API
// ============================================

// GET /api/restaurants/:restaurantId/inventory/reorder-suggestions - 발주 제안 목록
router.get('/:restaurantId/inventory/reorder-suggestions', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // 제안 대상 = 내 재료 ∪ 부모 브랜드 표준 재료 (2026-09-01: is_active 만. 제안은 min_stock>0 이 거른다)
    const reorderBrandId = await parentBrandIdOf(restaurantId);
    const ingredients = await Ingredient.findAll({
      where: {
        is_active: true,
        [Op.or]: [
          { restaurant_id: restaurantId },
          ...(reorderBrandId ? [{ owner_type: 'brand', brand_id: reorderBrandId }] : [])
        ]
      }
    });

    // 레스토랑 코스트 오버라이드 맵 조회
    const costMap = await getRestaurantCostMap(restaurantId);
    // 브랜드 재료의 재고·PAR 은 **이 매장의 오버레이**가 진실 (지점마다 회전율이 다르다)
    const reorderOverlay = await overlayMapFor(
      restaurantId,
      ingredients.filter(i => i.owner_type === 'brand').map(i => i.id)
    );

    // 공식은 utils/reorderMath 한 벌(2026-10-08) — 하루 사용량은 판매·폐기 장부로, 오는 중인 발주량은 뺀다
    const reorderMath = require('../utils/reorderMath');
    const ids = ingredients.map(i => i.id);
    const usage = await reorderMath.ledgerUsage(parseInt(restaurantId, 10), ids);
    const incoming = await reorderMath.onOrderQty(parseInt(restaurantId, 10), ids);
    const suggestions = [];

    for (const ing of ingredients) {
      const isBrandShared = ing.owner_type === 'brand';
      const overlay = isBrandShared ? reorderOverlay[ing.id] : null;
      const eff = effectiveSettings(ing, overlay);

      const currentStock = isBrandShared
        ? (overlay ? parseFloat(overlay.current_stock) || 0 : 0)
        : (parseFloat(ing.current_stock) || 0);
      const minStock = parseFloat(eff.min_stock) || 0;
      const picked = reorderMath.pickDailyUsage(usage.get(Number(ing.id)), eff.manual_daily_usage);
      const r = reorderMath.compute({
        dailyUsage: picked.daily, leadTimeDays: eff.lead_time_days || 2, minStock,
        safetyStockPercent: eff.safety_stock_percent, onHand: currentStock, onOrder: incoming.get(Number(ing.id)) || 0,
      });
      const effectiveCost = costMap[ing.id] !== undefined ? costMap[ing.id] : parseFloat(ing.unit_cost);
      if (!r.needs_order) continue;
      suggestions.push({
        ingredient: {
          id: ing.id,
          name: ing.name,
          unit: ing.unit,
          unit_cost: effectiveCost,
          category: ing.category,
          owner_type: ing.owner_type
        },
        is_brand_shared: isBrandShared,
        current_stock: currentStock,
        min_stock: minStock,
        avg_daily_usage: r.daily_usage,
        usage_source: picked.source,
        lead_time_days: r.lead_time_days,
        reorder_point: r.reorder_point,
        on_order: r.on_order,
        suggested_qty: r.suggested_qty,
        // 원가(unit_cost)는 기준양의 가격 — 취급단위 수량에 곱하기 전에 기준양으로 나눈다
        estimated_cost: Math.round(r.suggested_qty * perBaseCost(effectiveCost, ing.base_quantity) * 100) / 100,
        urgency: currentStock <= 0 ? 'critical' : currentStock <= minStock ? 'high' : 'normal'
      });
    }

    // Sort by urgency
    const urgencyOrder = { critical: 0, high: 1, normal: 2 };
    suggestions.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

    res.json({ success: true, data: suggestions });
  } catch (error) {
    console.error('Get reorder suggestions error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// Helper Functions
// ============================================

// checkAndCreateAlert 는 utils/stockAlerts.js 로 이동 (inventory-extra 와 공유 — 사본 금지)
// GET /api/restaurants/:restaurantId/inventory/expiring - 유통기한 임박 항목 조회
router.get('/:restaurantId/inventory/expiring', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { days = 14 } = req.query;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(days));

    const batches = await InventoryBatch.findAll({
      where: {
        restaurant_id: restaurantId,
        status: 'active',
        remaining_quantity: { [Op.gt]: 0 },
        expiry_date: {
          [Op.ne]: null,
          [Op.lte]: expiryDate
        }
      },
      include: [{
        model: Ingredient,
        as: 'ingredient',
        attributes: ['id', 'name', 'unit', 'category']
      }],
      order: [['expiry_date', 'ASC']]
    });

    const now = new Date();
    const result = batches.map(batch => {
      const daysUntilExpiry = Math.ceil((new Date(batch.expiry_date) - now) / (1000 * 60 * 60 * 24));
      let urgency = 'normal';
      if (daysUntilExpiry <= 0) {
        urgency = 'expired';
      } else if (daysUntilExpiry <= 3) {
        urgency = 'critical';
      } else if (daysUntilExpiry <= 7) {
        urgency = 'warning';
      }

      return {
        id: batch.id,
        batch_number: batch.batch_number,
        ingredient_id: batch.ingredient_id,
        ingredient_name: batch.ingredient?.name || 'Unknown',
        remaining_quantity: parseFloat(batch.remaining_quantity),
        unit: batch.ingredient?.unit || batch.unit,
        expiry_date: batch.expiry_date,
        days_until_expiry: daysUntilExpiry,
        urgency
      };
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get expiring items error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// General Stock APIs (Restaurant용)
// ============================================

// GET /api/restaurants/:restaurantId/inventory/general-stock - 일반 재고 목록 조회

module.exports = router;
