const express = require('express');
const { recordGeneralStock } = require('../utils/generalStockLedger');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { Ingredient, InventoryTransaction, StockTake, StockTakeItem, StockAlert, Restaurant, InventoryBatch, GeneralStock, GeneralStockTransaction, Supplier, RestaurantIngredientCost } = require('../models');
const { getStartOfMonth, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { readableIngredient, writableIngredient, stockFor, applyStock, applySettings, overlayMapFor, effectiveSettings } = require('../utils/brandStockAccess');
const { checkAndCreateAlert } = require('../utils/stockAlerts');

// 레스토랑의 코스트 오버라이드 맵 조회 헬퍼

// inventory CRUD + alerts + transactions + stock-takes + reorder + expiring
// split from inventory-routes.js (2026-05-03)

// general-stock + par-level + batches + deduct/dispose (deductStockFIFO 헬퍼 포함)

router.get('/:restaurantId/inventory/general-stock', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { category, status, search } = req.query;

    const whereClause = {
      restaurant_id: restaurantId,
      is_active: true
    };

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      whereClause.name = { [Op.like]: `%${search}%` };
    }

    let items = await GeneralStock.findAll({
      where: whereClause,
      include: [{
        model: Supplier,
        as: 'supplier',
        attributes: ['id', 'name', 'code', 'contact_name', 'phone'],
        required: false
      }],
      order: [['name', 'ASC']]
    });

    // Add stock status
    items = items.map(item => {
      const currentStock = parseFloat(item.current_stock) || 0;
      const minStock = parseFloat(item.min_stock) || 0;

      let stockStatus = 'normal';
      if (currentStock <= 0) {
        stockStatus = 'out_of_stock';
      } else if (currentStock <= minStock) {
        stockStatus = 'low_stock';
      }

      const itemData = item.toJSON();
      return {
        ...itemData,
        item_type: 'general_stock',
        stock_status: stockStatus,
        stock_unit: itemData.unit,
        supplier_name: itemData.supplier?.name || null
      };
    });

    // Filter by status if provided
    if (status) {
      items = items.filter(item => item.stock_status === status);
    }

    res.json({ success: true, data: items });
  } catch (error) {
    console.error('Get general stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/general-stock - 일반 재고 항목 추가
router.post('/:restaurantId/inventory/general-stock', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, stock_unit, unit_cost, category, current_stock, min_stock, min_order, supplier_id, code, image_url } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // Auto-generate code if not provided
    let finalCode = code;
    if (!finalCode) {
      // 2026-09-06: `count + 1` 제거 — 행을 지우고 새로 만들면 이미 쓰인 번호가 다시 나온다.
      //   채번 단일 소스 = utils/codeGenerator.js 의 원자 카운터(범위는 whereClause 에서 뽑는다).
      const { generateGeneralStockCode } = require('../utils/codeGenerator');
      finalCode = await generateGeneralStockCode(GeneralStock, restaurantId);
    }

    const newItem = await GeneralStock.create({
      restaurant_id: restaurantId,
      name: name.trim(),
      code: finalCode,
      image_url: image_url || null,
      category: category || 'Supplies',
      unit: stock_unit || 'piece',
      current_stock: 0, // 시작 재고는 아래 장부(initial)로 넣는다 — 장부 없이 수량이 생기지 않게
      min_stock: parseFloat(min_stock) || 0,
      min_order: parseFloat(min_order) || 0,
      unit_cost: parseFloat(unit_cost) || 0,
      supplier_id: supplier_id || null,
      is_active: true
    });
    const startQty = parseFloat(current_stock) || 0;
    if (startQty > 0) {
      await database.sequelize.transaction(t => recordGeneralStock({
        item: newItem, type: 'initial', setTo: startQty, ownerId: null, restaurantId: parseInt(restaurantId), notes: 'Initial stock', userId: req.user?.id || null, transaction: t,
      }));
    }

    res.json({
      success: true,
      data: {
        ...newItem.toJSON(),
        stock_unit: newItem.unit
      }
    });
  } catch (error) {
    console.error('Add general stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/general-stock/:itemId/receive - 일반 재고 입고
router.post('/:restaurantId/inventory/general-stock/:itemId/receive', async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const { quantity, notes, batch_number, manufacture_date, expiry_date } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, restaurant_id: restaurantId, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    // 수량 + 장부를 한 트랜잭션으로 (장부 실패 = 전체 롤백 — 예전엔 장부 실패를 삼키고 수량만 바뀌었다)
    const addedQty = Math.round((parseFloat(quantity) || 0) * 100) / 100;
    const { before: currentStock, after: newStock } = await database.sequelize.transaction(t => recordGeneralStock({
      item, type: 'receive', delta: addedQty, ownerId: null, restaurantId: parseInt(restaurantId),
      notes: notes || null, extra: { batch_number: batch_number || null, manufacture_date: manufacture_date || null, expiry_date: expiry_date || null },
      userId: req.user?.id || null, transaction: t,
    }));

    res.json({
      success: true,
      data: {
        id: item.id,
        name: item.name,
        previous_stock: currentStock,
        added_quantity: addedQty,
        current_stock: newStock
      }
    });
  } catch (error) {
    console.error('General stock receive error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/general-stock/:itemId/adjust - 일반 재고 조정
router.post('/:restaurantId/inventory/general-stock/:itemId/adjust', async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const { new_quantity, reason } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, restaurant_id: restaurantId, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    const { before: currentStock, after: newStock } = await database.sequelize.transaction(t => recordGeneralStock({
      item, type: 'adjustment', setTo: Math.max(0, parseFloat(new_quantity) || 0), ownerId: null, restaurantId: parseInt(restaurantId),
      notes: reason || 'Stock adjustment', userId: req.user?.id || null, transaction: t,
    }));

    res.json({
      success: true,
      data: {
        id: item.id,
        name: item.name,
        previous_stock: currentStock,
        current_stock: newStock,
        reason: reason || 'adjustment'
      }
    });
  } catch (error) {
    console.error('General stock adjust error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/restaurants/:restaurantId/inventory/general-stock/:itemId/settings - 일반 재고 설정
router.put('/:restaurantId/inventory/general-stock/:itemId/settings', async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const { min_stock, unit, supplier_id, unit_cost } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, restaurant_id: restaurantId, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    const updateData = {};
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (unit !== undefined) updateData.unit = unit;
    if (supplier_id !== undefined) updateData.supplier_id = supplier_id;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;

    await item.update(updateData);

    res.json({
      success: true,
      data: {
        ...item.toJSON(),
        stock_unit: item.unit
      }
    });
  } catch (error) {
    console.error('General stock settings error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/restaurants/:restaurantId/inventory/general-stock/:itemId - 일반 재고 전체 수정
router.put('/:restaurantId/inventory/general-stock/:itemId', async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;
    const { name, code, image_url, stock_unit, unit_cost, category, current_stock, min_stock, min_order, supplier_id } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, restaurant_id: restaurantId, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (code !== undefined) updateData.code = code;
    if (image_url !== undefined) {
      if (image_url && item.image_url && image_url !== item.image_url) {
        await deleteOldImages(item.image_url);
      }
      updateData.image_url = image_url;
    }
    if (stock_unit !== undefined) updateData.unit = stock_unit;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    if (category !== undefined) updateData.category = category;
    // current_stock 은 여기서 안 바꾼다 — 수량은 receive/adjust(장부) 로만 (2026-10-08 장부 단일 진실)
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (min_order !== undefined) updateData.min_order = min_order;
    if (supplier_id !== undefined) updateData.supplier_id = supplier_id;

    await item.update(updateData);

    res.json({
      success: true,
      data: {
        ...item.toJSON(),
        stock_unit: item.unit
      }
    });
  } catch (error) {
    console.error('General stock update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/restaurants/:restaurantId/inventory/general-stock/:itemId - 일반 재고 삭제
router.delete('/:restaurantId/inventory/general-stock/:itemId', async (req, res) => {
  try {
    const { restaurantId, itemId } = req.params;

    const item = await GeneralStock.findOne({
      where: { id: itemId, restaurant_id: restaurantId, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    await item.update({ is_active: false });

    res.json({
      success: true,
      message: 'General stock item deleted'
    });
  } catch (error) {
    console.error('General stock delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// PAR Level & Prediction APIs
// ============================================

// GET /api/restaurants/:restaurantId/inventory/:ingredientId/par-level - PAR Level 계산
router.get('/:restaurantId/inventory/:ingredientId/par-level', async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;

    // 소유권 — 남의 매장 재료 수치를 조회할 수 없다
    const ingredient = await readableIngredient(ingredientId, { type: 'restaurant', id: parseInt(restaurantId, 10) });
    if (!ingredient) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    // PAR 은 매장별 — 브랜드 재료면 오버레이 오버라이드가 브랜드 기본값을 덮는다
    const parOverlay = (await overlayMapFor(restaurantId, [parseInt(ingredientId, 10)]))[ingredientId];
    const eff = effectiveSettings(ingredient, parOverlay);

    // 공식은 utils/reorderMath 한 벌(2026-10-08) — 발주 제안과 같은 답이 나와야 한다
    const reorderMath = require('../utils/reorderMath');
    const rid = parseInt(restaurantId, 10);
    const iid = parseInt(ingredientId, 10);
    const picked = reorderMath.pickDailyUsage((await reorderMath.ledgerUsage(rid, [iid])).get(iid), eff.manual_daily_usage);
    // 브랜드 공유 재료면 이 매장 오버레이 재고 기준
    const currentStock = await stockFor(ingredient, restaurantId);
    const safetyStockPercent = parseFloat(eff.safety_stock_percent) || 20;
    const r = reorderMath.compute({
      dailyUsage: picked.daily, leadTimeDays: parseInt(eff.lead_time_days) || 2, minStock: parseFloat(eff.min_stock) || 0,
      safetyStockPercent, onHand: currentStock, onOrder: (await reorderMath.onOrderQty(rid, [iid])).get(iid) || 0,
    });
    const dailyUsage = r.daily_usage;
    const leadTimeDays = r.lead_time_days;
    const leadTimeUsage = dailyUsage * leadTimeDays;
    const safetyStock = r.safety_stock;
    const parLevel = r.reorder_point;
    const reorderPoint = r.reorder_point;
    const suggestedOrderQty = r.suggested_qty;

    res.json({
      success: true,
      data: {
        ingredient_id: ingredientId,
        ingredient_name: ingredient.name,
        unit: ingredient.unit,
        current_stock: currentStock,
        daily_usage: dailyUsage,
        lead_time_days: leadTimeDays,
        safety_stock_percent: safetyStockPercent,
        lead_time_usage: leadTimeUsage,
        safety_stock: safetyStock,
        par_level: parseFloat(parLevel.toFixed(2)),
        reorder_point: parseFloat(reorderPoint.toFixed(2)),
        suggested_order_qty: parseFloat(suggestedOrderQty.toFixed(2)),
        on_order: r.on_order,
        prediction_confidence: eff.prediction_confidence || 'none',
        // ledger = 최근 28일 판매·폐기 장부 · manual = 수동 입력 · none = 둘 다 없음
        data_source: picked.source,
        data_days: picked.days
      }
    });
  } catch (error) {
    console.error('Get PAR level error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/restaurants/:restaurantId/inventory/:ingredientId/settings - PAR 설정 업데이트
router.put('/:restaurantId/inventory/:ingredientId/settings', async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;
    const { lead_time_days, safety_stock_percent, manual_daily_usage, min_stock, min_order } = req.body;

    // PAR 설정은 **매장별**이다 — 지점마다 좌석·회전율이 달라 발주점·리드타임이 같을 수 없다
    // (프랜차이즈 표준: 본사가 재료를 표준화하고 PAR 은 지점이 정한다).
    // 브랜드 표준 재료면 공유 행 대신 **매장 오버레이**에 저장한다(형제 매장 무영향).
    // ⚠ 재료 정의(이름·단위·단가·공급처)는 여전히 브랜드 전용 — 그건 routes/ingredients.js 가 403.
    const buyer = { type: 'restaurant', id: parseInt(restaurantId, 10) };
    const target = await readableIngredient(ingredientId, buyer);
    if (!target) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const updateData = {};
    if (lead_time_days !== undefined) updateData.lead_time_days = lead_time_days;
    if (safety_stock_percent !== undefined) updateData.safety_stock_percent = safety_stock_percent;
    if (manual_daily_usage !== undefined) updateData.manual_daily_usage = manual_daily_usage;
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (min_order !== undefined) updateData.min_order = min_order;

    await applySettings(target, restaurantId, updateData);

    // 응답 = 이 매장의 유효값(브랜드 기본값 + 오버라이드)
    const fresh = await Ingredient.findByPk(ingredientId);
    const overlay = (await overlayMapFor(restaurantId, [parseInt(ingredientId, 10)]))[ingredientId];
    res.json({
      success: true,
      data: { ...effectiveSettings(fresh, overlay), is_brand_shared: fresh.owner_type === 'brand' }
    });
  } catch (error) {
    console.error('Update ingredient settings error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/calculate-usage - 사용량 계산 (전체)
router.post('/:restaurantId/inventory/calculate-usage', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    // 기간은 utils/reorderMath.WINDOW_DAYS(28일) 고정 — 발주 제안·PAR 과 같은 창이어야 같은 답이 나온다

    // Get restaurant to check brand
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const whereConditions = [
      { restaurant_id: restaurantId, is_active: true }
    ];
    if (restaurant.brand_id) {
      whereConditions.push({
        brand_id: restaurant.brand_id,
        owner_type: 'brand',
        is_active: true
      });
    }

    const ingredients = await Ingredient.findAll({
      where: { [Op.or]: whereConditions }
    });

    // 하루 사용량 = 판매·폐기 장부(나간 양)로 — 예전엔 **입고**(purchase)로 계산해 «많이 산 것 = 많이 쓴 것» 이 됐다 (2026-10-08)
    const reorderMath = require('../utils/reorderMath');
    const usage = await reorderMath.ledgerUsage(parseInt(restaurantId, 10), ingredients.map(i => i.id));
    const results = [];
    for (const ingredient of ingredients) {
      const u = usage.get(Number(ingredient.id));
      const days = u ? u.days_with_data : 0;
      const avgDailyUsage = u && days >= reorderMath.MIN_DAYS ? u.used / days : 0;
      const confidence = days >= 21 ? 'high' : days >= 14 ? 'medium' : days >= reorderMath.MIN_DAYS ? 'low' : 'none';
      // 사용량은 매장별 값이다 — 브랜드 공유 행에 쓰면 **형제 매장 전부의 사용량이 덮인다**. applySettings 가 분기한다.
      await applySettings(ingredient, restaurantId, { avg_daily_usage: avgDailyUsage, prediction_confidence: confidence });
      results.push({
        ingredient_id: ingredient.id,
        ingredient_name: ingredient.name,
        avg_daily_usage: parseFloat(avgDailyUsage.toFixed(4)),
        prediction_confidence: confidence,
        days_with_data: days
      });
    }

    res.json({
      success: true,
      data: results,
      message: `Usage calculated for ${results.length} ingredients from the last ${reorderMath.WINDOW_DAYS} days of sales and waste`
    });
  } catch (error) {
    console.error('Calculate usage error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// Batch Management APIs
// ============================================

// GET /api/restaurants/:restaurantId/inventory/:ingredientId/batches - 배치 목록 조회
router.get('/:restaurantId/inventory/:ingredientId/batches', async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;
    const { status } = req.query;

    const owned = await readableIngredient(ingredientId, { type: 'restaurant', id: parseInt(restaurantId, 10) });
    if (!owned) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    // 브랜드 공유 재료는 형제 매장도 같은 ingredient_id 로 배치를 만든다 → 매장 스코프 필수
    const whereClause = { ingredient_id: ingredientId, restaurant_id: parseInt(restaurantId, 10) };
    if (status) {
      whereClause.status = status;
    }

    const batches = await InventoryBatch.findAll({
      where: whereClause,
      order: [['received_date', 'ASC']], // FIFO order
      include: [{
        model: Supplier,
        as: 'supplier',
        attributes: ['id', 'name'],
        required: false
      }]
    });

    res.json({ success: true, data: batches });
  } catch (error) {
    console.error('Get batches error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// FIFO 차감은 services/inventoryDeductionService.js 가 단일 소스다.
// 예전에는 이 파일에도 같은 함수가 복사돼 있었다 — 한쪽만 고쳐지면 "주문 차감은 맞는데
// 수동 차감은 틀린" 식으로 갈라진다. 정의를 지우고 가져다 쓴다.
const { deductStockFIFO } = require('../services/inventoryDeductionService');
const stockLedger = require('../services/stockLedger');
const { isWasteReason } = require('../utils/wasteReasons');
const MANUAL_DEDUCT_TYPES = ['order_deduct', 'adjustment', 'production', 'waste'];

// POST /api/restaurants/:restaurantId/inventory/deduct - FIFO 기반 재고 차감
router.post('/:restaurantId/inventory/deduct', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const { ingredient_id, quantity, reason, notes } = req.body;
    const userId = req.user.id;

    // 소유권 — 자기 매장 재료 ∪ 부모 브랜드 재료 (예전엔 검사가 없어 남의 재료 id 로도 차감됐다)
    const ingredient = await readableIngredient(
      ingredient_id, { type: 'restaurant', id: parseInt(restaurantId, 10) }, transaction
    );
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const deductQty = parseFloat(quantity) || 0;
    // 브랜드 공유 재료면 이 매장의 오버레이 재고가 기준
    const currentStock = await stockFor(ingredient, restaurantId, transaction);

    if (deductQty > currentStock) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${currentStock} ${ingredient.unit}`
      });
    }

    // FIFO deduction from batches (매장 스코프)
    const fifoResult = await deductStockFIFO(ingredient_id, deductQty, transaction, restaurantId);

    // 배치가 모자라도 **요청한 만큼** 줄인다(주문 차감과 동일 규칙).
    // 배치는 입고 로트 장부일 뿐이고, 사람이 "이만큼 뺐다"고 기록한 것이 실제 사건이다.
    // 배치로 못 덮은 몫은 notes 에 `batch_shortfall` 로 남겨 나중에 맞출 수 있게 한다.
    const batchCovered = fifoResult.deducted_quantity || 0;
    const shortfall = Math.round((deductQty - batchCovered) * 10000) / 10000;
    // 장부 유형은 정해진 넷 중 하나만(예전엔 클라이언트 값을 그대로 넣었다). 폐기면 사유 코드(없으면 other).
    const txType = MANUAL_DEDUCT_TYPES.includes(reason) ? reason : 'order_deduct';
    const { after: newStock } = await stockLedger.record({
      target: { kind: 'ingredient', row: ingredient }, restaurantId, type: txType, delta: -deductQty,
      reasonCode: txType === 'waste' ? (isWasteReason(req.body.reason_code) ? req.body.reason_code : 'other') : null,
      notes: (notes || `Deducted via FIFO from ${fifoResult.batches.length} batch(es)`)
        + (shortfall > 0 ? ` [batch_shortfall ${shortfall}]` : ''),
      userId, transaction,
    });

    // Check and create alerts if needed
    await checkAndCreateAlert(ingredient_id, restaurantId, newStock, transaction);

    await transaction.commit();

    res.json({
      success: true,
      message: 'Stock deducted successfully',
      new_stock: newStock,
      fifo_details: fifoResult
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Deduct stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/restaurants/:restaurantId/inventory/batches/:batchId/dispose - 배치 폐기
router.put('/:restaurantId/inventory/batches/:batchId/dispose', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId, batchId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    // 배치 소유권 — 남의 매장 배치를 폐기할 수 없다(브랜드 공유 재료는 형제 매장도 같은 재료 id)
    const batch = await InventoryBatch.findOne({
      where: { id: batchId, restaurant_id: parseInt(restaurantId, 10) }
    });
    if (!batch) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Batch not found' });
    }

    const disposedQty = parseFloat(batch.remaining_quantity);

    // Update batch status
    await InventoryBatch.update({
      status: 'disposed',
      remaining_quantity: 0,
      notes: reason || 'Disposed'
    }, {
      where: { id: batchId },
      transaction
    });

    // 재고 반영 — 브랜드 공유 재료면 매장 오버레이
    const ingredient = await Ingredient.findByPk(batch.ingredient_id, { transaction });
    // 배치 폐기 = 폐기(사유 기본 expired). 장부 수량 = 실제로 깎인 양
    const { after: newStock } = await stockLedger.record({
      target: { kind: 'ingredient', row: ingredient }, restaurantId, type: 'waste', delta: -disposedQty, clampAtZero: true,
      reasonCode: isWasteReason(req.body.reason_code) ? req.body.reason_code : 'expired',
      unit: batch.unit, notes: reason || `Batch ${batch.batch_number || batchId} disposed`, userId, transaction,
    });

    await transaction.commit();

    res.json({
      success: true,
      message: 'Batch disposed successfully',
      disposed_quantity: disposedQty,
      new_stock: newStock
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Dispose batch error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
