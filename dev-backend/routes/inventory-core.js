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
  const costs = await RestaurantIngredientCost.findAll({
    where: { restaurant_id: restaurantId }
  });
  const map = {};
  costs.forEach(c => { map[c.ingredient_id] = parseFloat(c.unit_cost); });
  return map;
}
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
// 브랜드 공유 재료 접근·재고 규칙의 단일 소스 (docs/BRAND_STOCK_SHARING_DESIGN.md)
const { readableIngredient, stockFor, stockMapFor, overlayMapFor, effectiveSettings, applyStock, parentBrandIdOf } = require('../utils/brandStockAccess');
const { checkAndCreateAlert } = require('../utils/stockAlerts');

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
    // Only include ingredients with track_stock: true
    const orConditions = [{ restaurant_id: restaurantId }];
    if (restaurant?.brand_id) {
      orConditions.push({ brand_id: restaurant.brand_id });
    }

    const whereClause = {
      [Op.or]: orConditions,
      is_active: true,
      track_stock: true
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

    // 입고예정(on-order) — 활성 발주(주문됐으나 미입고)의 남은 수량을 ingredient 별로 집계.
    // 재고 증가 공식과 동일하게 (quantity_ordered - quantity_received) × unit_conversion 로 재고단위 환산.
    // 목적: "이미 발주해서 들어올 양"을 미리 보여 중복 발주 방지.
    const ACTIVE_PO_STATUSES = ['submitted', 'confirmed', 'shipped', 'in_transit', 'delivered', 'partial_received'];
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
router.post('/:restaurantId/inventory/initial', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const { items } = req.body; // [{ ingredient_id, quantity }]
    const userId = req.user.id;

    for (const item of items) {
      const ingredient = await ownedIngredient(item.ingredient_id, restaurantId, transaction);
      if (!ingredient) continue; // 남의 매장/브랜드 재료 → 무시

      const quantity = parseFloat(item.quantity) || 0;

      // 브랜드 공유 재료는 매장 오버레이에, 매장 재료는 재료 행에 (형제 매장 재고 오염 방지)
      await applyStock(ingredient, restaurantId, quantity, transaction, { stockTake: true });
      if (ingredient.owner_type !== 'brand') {
        await ingredient.update({ last_actual_stock: quantity }, { transaction });
      }

      // Create transaction record
      await InventoryTransaction.create({
        restaurant_id: restaurantId,
        ingredient_id: item.ingredient_id,
        transaction_type: 'initial',
        quantity_change: quantity,
        unit: ingredient.unit,
        stock_after: quantity,
        notes: 'Initial stock setup',
        created_by: userId
      }, { transaction });
    }

    await transaction.commit();
    res.json({ success: true, message: 'Initial stock set successfully' });
  } catch (error) {
    await transaction.rollback();
    console.error('Set initial stock error:', error);
    res.status(500).json({ success: false, message: error.message });
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
    const currentStock = Math.round((await stockFor(ingredient, restaurantId, transaction)) * 100) / 100;
    const newStock = Math.round((currentStock + addQty) * 100) / 100;

    await applyStock(ingredient, restaurantId, newStock, transaction, { stockTake: true });

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

    // Create transaction record
    await InventoryTransaction.create({
      restaurant_id: restaurantId,
      ingredient_id: ingredient_id,
      transaction_type: 'purchase',
      quantity_change: addQty,
      unit: ingredient.unit,
      stock_after: newStock,
      notes: notes || 'Stock received',
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
    const { ingredient_id, quantity, notes } = req.body;
    const userId = req.user.id;

    const ingredient = await ownedIngredient(ingredient_id, restaurantId, transaction);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const wasteQty = parseFloat(quantity) || 0;
    const currentStock = await stockFor(ingredient, restaurantId, transaction);
    const newStock = Math.max(0, currentStock - wasteQty);

    await applyStock(ingredient, restaurantId, newStock, transaction);

    // Create transaction record
    await InventoryTransaction.create({
      restaurant_id: restaurantId,
      ingredient_id: ingredient_id,
      transaction_type: 'waste',
      quantity_change: -wasteQty,
      unit: ingredient.unit,
      stock_after: newStock,
      notes: notes || 'Stock wasted',
      created_by: userId
    }, { transaction });

    // Check for low stock alert
    await checkAndCreateAlert(ingredient_id, restaurantId, newStock, transaction);

    await transaction.commit();
    res.json({ success: true, message: 'Waste recorded successfully', new_stock: newStock });
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
router.post('/:restaurantId/inventory/adjust', async (req, res) => {
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

    const currentStock = await stockFor(ingredient, restaurantId, transaction);
    let newStock;
    let adjustQty;

    if (new_quantity !== undefined && new_quantity !== null && new_quantity !== '') {
      // Absolute mode — set stock to exact value
      newStock = Math.max(0, parseFloat(new_quantity) || 0);
      adjustQty = newStock - currentStock;
    } else {
      // Incremental mode — add delta to current
      adjustQty = parseFloat(quantity) || 0;
      newStock = Math.max(0, currentStock + adjustQty);
    }

    await applyStock(ingredient, restaurantId, newStock, transaction);

    // Create transaction record
    await InventoryTransaction.create({
      restaurant_id: restaurantId,
      ingredient_id: ingredient_id,
      transaction_type: 'adjustment',
      quantity_change: adjustQty,
      unit: ingredient.unit,
      stock_after: newStock,
      notes: notes || reason || 'Manual adjustment',
      created_by: userId
    }, { transaction });

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

    // 실사 대상 = 내 재료 ∪ 부모 브랜드 표준 재료 (브랜드 쪽은 track_stock 만 —
    // 추적 안 하는 재료는 세어봐야 applyStock 이 기록을 스킵해 조용히 버려진다).
    const brandId = await parentBrandIdOf(restaurantId, transaction);
    const ingredients = await Ingredient.findAll({
      where: {
        is_active: true,
        [Op.or]: [
          { restaurant_id: restaurantId },
          ...(brandId ? [{ owner_type: 'brand', brand_id: brandId, track_stock: true }] : [])
        ]
      },
      transaction
    });

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
          attributes: ['id', 'name', 'unit', 'category', 'owner_type']
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
          attributes: ['id', 'name', 'unit', 'category', 'owner_type']
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
      const varianceValue = variance * parseFloat(stockTakeItem.unit_cost);

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
          attributes: ['id', 'name', 'unit', 'category', 'owner_type']
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
router.post('/:restaurantId/stock-takes/:stockTakeId/complete', async (req, res) => {
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

    // Check all items have actual_stock
    const uncountedItems = stockTake.items.filter(item => item.actual_stock === null);
    if (uncountedItems.length > 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: `${uncountedItems.length} items have not been counted yet`
      });
    }

    // Calculate summary
    let totalVarianceValue = 0;
    let itemsWithVariance = 0;
    let totalTheoreticalValue = 0;

    for (const item of stockTake.items) {
      const variance = parseFloat(item.variance) || 0;
      const varianceValue = parseFloat(item.variance_value) || 0;
      const theoreticalValue = parseFloat(item.theoretical_stock) * parseFloat(item.unit_cost);

      totalTheoreticalValue += theoreticalValue;

      if (variance !== 0) {
        itemsWithVariance++;
        totalVarianceValue += varianceValue;
      }

      // 재고 반영 — 브랜드 표준 재료는 **이 매장의 오버레이**에만(공유 행을 덮으면 형제 매장 오염).
      // 재료 1회만 조회해 unit 까지 재사용(예전엔 트랜잭션 로그용으로 또 조회했다).
      const ing = await Ingredient.findByPk(item.ingredient_id, { transaction });
      if (ing) {
        if (ing.owner_type === 'brand') {
          await applyStock(ing, restaurantId, item.actual_stock, transaction, { stockTake: true, recordActual: true });
        } else {
          await Ingredient.update({
            current_stock: item.actual_stock,
            last_actual_stock: item.actual_stock,
            last_stock_take_at: new Date()
          }, { where: { id: item.ingredient_id }, transaction });
        }
      }

      // Create transaction record for adjustment
      if (variance !== 0) {
        await InventoryTransaction.create({
          restaurant_id: restaurantId,
          ingredient_id: item.ingredient_id,
          transaction_type: 'stock_take',
          quantity_change: -variance, // Negative if theoretical > actual
          unit: ing ? ing.unit : null,
          stock_after: item.actual_stock,
          stock_take_id: stockTakeId,
          notes: `Stock take adjustment - Reason: ${item.variance_reason || 'not specified'}`,
          created_by: userId
        }, { transaction });
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
          attributes: ['id', 'name', 'unit', 'category', 'owner_type']
        }]
      }]
    });

    res.json({ success: true, data: completedStockTake });
  } catch (error) {
    await transaction.rollback();
    console.error('Complete stock take error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/stock-takes/:stockTakeId/cancel - 실사 취소
router.post('/:restaurantId/stock-takes/:stockTakeId/cancel', async (req, res) => {
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

    // 제안 대상 = 내 재료 ∪ 부모 브랜드 표준 재료 (브랜드 쪽은 track_stock 만)
    const reorderBrandId = await parentBrandIdOf(restaurantId);
    const ingredients = await Ingredient.findAll({
      where: {
        is_active: true,
        [Op.or]: [
          { restaurant_id: restaurantId },
          ...(reorderBrandId ? [{ owner_type: 'brand', brand_id: reorderBrandId, track_stock: true }] : [])
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

    const suggestions = [];

    for (const ing of ingredients) {
      const isBrandShared = ing.owner_type === 'brand';
      const overlay = isBrandShared ? reorderOverlay[ing.id] : null;
      const eff = effectiveSettings(ing, overlay);

      const currentStock = isBrandShared
        ? (overlay ? parseFloat(overlay.current_stock) || 0 : 0)
        : (parseFloat(ing.current_stock) || 0);
      const minStock = parseFloat(eff.min_stock) || 0;
      // 수동 입력 사용량이 있으면 그것이 우선 — par-level 은 이미 manual 우선인데 발주 제안만
      // avg 만 봐서 Settings 의 수동값이 무시되던 불일치를 통일한다(매장 재료에도 동일 적용).
      const avgDailyUsage = eff.manual_daily_usage != null
        ? (parseFloat(eff.manual_daily_usage) || 0)
        : (parseFloat(eff.avg_daily_usage) || 0);
      const leadTimeDays = eff.lead_time_days || 2;
      const effectiveCost = costMap[ing.id] !== undefined ? costMap[ing.id] : parseFloat(ing.unit_cost);

      // 발주점 = (일평균 사용량 × 리드타임) + 안전재고
      const reorderPoint = (avgDailyUsage * leadTimeDays) + minStock;

      // 현재고 <= 발주점이면 발주 필요
      if (currentStock <= reorderPoint) {
        // 제안 수량 = 발주점 - 현재고 + (일평균 × 7일)
        const suggestedQty = reorderPoint - currentStock + (avgDailyUsage * 7);
        const roundedQty = Math.ceil(suggestedQty * 10) / 10; // Round up to 1 decimal

        if (roundedQty > 0) {
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
            avg_daily_usage: avgDailyUsage,
            lead_time_days: leadTimeDays,
            reorder_point: reorderPoint,
            suggested_qty: roundedQty,
            estimated_cost: roundedQty * effectiveCost,
            urgency: currentStock <= 0 ? 'critical' : currentStock <= minStock ? 'high' : 'normal'
          });
        }
      }
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
