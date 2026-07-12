const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { Ingredient, InventoryTransaction, StockTake, StockTakeItem, StockAlert, Restaurant, InventoryBatch, GeneralStock, GeneralStockTransaction, Supplier, RestaurantIngredientCost } = require('../models');
const { getStartOfMonth, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { readableIngredient, writableIngredient } = require('../utils/brandStockAccess');

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
      const count = await GeneralStock.count({ where: { restaurant_id: restaurantId } });
      finalCode = `GS-${String(count + 1).padStart(3, '0')}`;
    }

    const newItem = await GeneralStock.create({
      restaurant_id: restaurantId,
      name: name.trim(),
      code: finalCode,
      image_url: image_url || null,
      category: category || 'Supplies',
      unit: stock_unit || 'piece',
      current_stock: parseFloat(current_stock) || 0,
      min_stock: parseFloat(min_stock) || 0,
      min_order: parseFloat(min_order) || 0,
      unit_cost: parseFloat(unit_cost) || 0,
      supplier_id: supplier_id || null,
      is_active: true
    });

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

    // Round to 2 decimal places for consistency
    const currentStock = Math.round((parseFloat(item.current_stock) || 0) * 100) / 100;
    const addedQty = Math.round((parseFloat(quantity) || 0) * 100) / 100;
    const newStock = Math.round((currentStock + addedQty) * 100) / 100;

    await item.update({ current_stock: newStock, last_stock_take_at: new Date() });

    // Record transaction
    try {
      if (GeneralStockTransaction) {
        await GeneralStockTransaction.create({
          owner_id: null,
          restaurant_id: parseInt(restaurantId),
          general_stock_id: item.id,
          transaction_type: 'receive',
          quantity_change: addedQty,
          unit: item.unit,
          stock_after: newStock,
          unit_cost: Math.round((parseFloat(item.unit_cost) || 0) * 100) / 100,
          total_cost: Math.round((addedQty * (parseFloat(item.unit_cost) || 0)) * 100) / 100,
          notes: notes || null,
          batch_number: batch_number || null,
          manufacture_date: manufacture_date || null,
          expiry_date: expiry_date || null,
          created_by: req.user?.id || null
        });
      }
    } catch (txError) {
      console.error('Transaction recording failed (non-critical):', txError.message);
    }

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

    // Round to 2 decimal places for consistency
    const currentStock = Math.round((parseFloat(item.current_stock) || 0) * 100) / 100;
    const newStock = Math.max(0, Math.round((parseFloat(new_quantity) || 0) * 100) / 100);

    await item.update({ current_stock: newStock, last_stock_take_at: new Date() });

    // Record transaction
    try {
      if (GeneralStockTransaction) {
        const quantityChange = newStock - currentStock;
        await GeneralStockTransaction.create({
          owner_id: null,
          restaurant_id: parseInt(restaurantId),
          general_stock_id: item.id,
          transaction_type: 'adjustment',
          quantity_change: quantityChange,
          unit: item.unit,
          stock_after: newStock,
          notes: reason || 'Stock adjustment',
          created_by: req.user?.id || null
        });
      }
    } catch (txError) {
      console.error('Transaction recording failed (non-critical):', txError.message);
    }

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
    if (current_stock !== undefined) updateData.current_stock = current_stock;
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

    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) {
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    // Get daily usage (from manual setting or calculated)
    const dailyUsage = parseFloat(ingredient.manual_daily_usage) || parseFloat(ingredient.avg_daily_usage) || 0;
    const leadTimeDays = parseInt(ingredient.lead_time_days) || 1;
    const safetyStockPercent = parseFloat(ingredient.safety_stock_percent) || 20;

    // PAR Level = (Daily Usage × Lead Time) + Safety Stock
    const leadTimeUsage = dailyUsage * leadTimeDays;
    const safetyStock = leadTimeUsage * (safetyStockPercent / 100);
    const parLevel = leadTimeUsage + safetyStock;

    // Reorder Point = PAR Level (simplified)
    const reorderPoint = parLevel;

    // Suggested Order Quantity = PAR Level - Current Stock (if current < PAR)
    const currentStock = parseFloat(ingredient.current_stock) || 0;
    const suggestedOrderQty = Math.max(0, parLevel - currentStock);

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
        prediction_confidence: ingredient.prediction_confidence || 'none',
        data_source: ingredient.manual_daily_usage ? 'manual' : (ingredient.avg_daily_usage > 0 ? 'calculated' : 'none')
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

    // 소유권 — 재료 행 자체를 고치는 API 다. 예전엔 검사가 없어 남의 재료 id 로도 수정됐고(IDOR),
    // 브랜드 표준 재료는 형제 매장이 공유하는 행이라 한 매장이 고치면 전 매장이 바뀐다.
    // (재고 수량은 매장별 오버레이라 별개 — docs/BRAND_STOCK_SHARING_DESIGN.md)
    const buyer = { type: 'restaurant', id: parseInt(restaurantId, 10) };
    const own = await writableIngredient(ingredientId, buyer);
    if (!own) {
      const shared = await readableIngredient(ingredientId, buyer);
      return res.status(shared ? 403 : 404).json({
        success: false,
        message: shared
          ? 'Brand-owned stock item is read-only. Ask the brand to change its settings.'
          : 'Ingredient not found'
      });
    }

    const updateData = {};
    if (lead_time_days !== undefined) updateData.lead_time_days = lead_time_days;
    if (safety_stock_percent !== undefined) updateData.safety_stock_percent = safety_stock_percent;
    if (manual_daily_usage !== undefined) updateData.manual_daily_usage = manual_daily_usage;
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (min_order !== undefined) updateData.min_order = min_order;

    await Ingredient.update(updateData, { where: { id: ingredientId } });

    const ingredient = await Ingredient.findByPk(ingredientId);
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Update ingredient settings error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/calculate-usage - 사용량 계산 (전체)
router.post('/:restaurantId/inventory/calculate-usage', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { days = 30 } = req.body;

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

    const results = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (const ingredient of ingredients) {
      // Get purchase transactions for this ingredient
      const transactions = await InventoryTransaction.findAll({
        where: {
          ingredient_id: ingredient.id,
          transaction_type: 'purchase',
          created_at: { [Op.gte]: startDate }
        },
        order: [['created_at', 'ASC']]
      });

      let avgDailyUsage = 0;
      let confidence = 'none';

      if (transactions.length >= 3) {
        const totalPurchased = transactions.reduce((sum, t) =>
          sum + parseFloat(t.quantity_change || 0), 0);

        const firstDate = new Date(transactions[0].created_at);
        const lastDate = new Date(transactions[transactions.length - 1].created_at);
        const daysBetween = Math.max(1, Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24)));

        avgDailyUsage = totalPurchased / daysBetween;

        if (transactions.length >= 10) {
          confidence = 'high';
        } else if (transactions.length >= 5) {
          confidence = 'medium';
        } else {
          confidence = 'low';
        }
      }

      await Ingredient.update({
        avg_daily_usage: avgDailyUsage,
        prediction_confidence: confidence
      }, { where: { id: ingredient.id } });

      results.push({
        ingredient_id: ingredient.id,
        ingredient_name: ingredient.name,
        avg_daily_usage: parseFloat(avgDailyUsage.toFixed(4)),
        prediction_confidence: confidence,
        transaction_count: transactions.length
      });
    }

    res.json({
      success: true,
      data: results,
      message: `Usage calculated for ${results.length} ingredients based on last ${days} days`
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
    const { ingredientId } = req.params;
    const { status } = req.query;

    const whereClause = { ingredient_id: ingredientId };
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

// FIFO 차감 함수 (내부 사용)
async function deductStockFIFO(ingredientId, quantityToDeduct, transaction) {
  let remainingToDeduct = parseFloat(quantityToDeduct);
  const deductedBatches = [];

  // Get active batches ordered by FIFO (oldest first, then by expiry date)
  const batches = await InventoryBatch.findAll({
    where: {
      ingredient_id: ingredientId,
      status: 'active',
      remaining_quantity: { [Op.gt]: 0 }
    },
    order: [
      ['expiry_date', 'ASC'],
      ['received_date', 'ASC']
    ],
    transaction
  });

  for (const batch of batches) {
    if (remainingToDeduct <= 0) break;

    const batchRemaining = parseFloat(batch.remaining_quantity);
    const deductFromBatch = Math.min(batchRemaining, remainingToDeduct);

    const newRemaining = batchRemaining - deductFromBatch;
    const newStatus = newRemaining <= 0 ? 'depleted' : 'active';

    await InventoryBatch.update({
      remaining_quantity: newRemaining,
      status: newStatus
    }, {
      where: { id: batch.id },
      transaction
    });

    deductedBatches.push({
      batch_id: batch.id,
      batch_number: batch.batch_number,
      quantity_deducted: deductFromBatch,
      expiry_date: batch.expiry_date
    });

    remainingToDeduct -= deductFromBatch;
  }

  return {
    success: remainingToDeduct <= 0,
    deducted_quantity: parseFloat(quantityToDeduct) - remainingToDeduct,
    remaining_to_deduct: remainingToDeduct,
    batches: deductedBatches
  };
}

// POST /api/restaurants/:restaurantId/inventory/deduct - FIFO 기반 재고 차감
router.post('/:restaurantId/inventory/deduct', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const { ingredient_id, quantity, reason, notes } = req.body;
    const userId = req.user.id;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const deductQty = parseFloat(quantity) || 0;
    const currentStock = parseFloat(ingredient.current_stock) || 0;

    if (deductQty > currentStock) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: `Insufficient stock. Available: ${currentStock} ${ingredient.unit}`
      });
    }

    // FIFO deduction from batches
    const fifoResult = await deductStockFIFO(ingredient_id, deductQty, transaction);

    const newStock = currentStock - fifoResult.deducted_quantity;

    // Update ingredient stock
    await Ingredient.update(
      { current_stock: newStock },
      { where: { id: ingredient_id }, transaction }
    );

    // Create transaction record
    await InventoryTransaction.create({
      restaurant_id: restaurantId,
      ingredient_id: ingredient_id,
      transaction_type: reason || 'order_deduct',
      quantity_change: -fifoResult.deducted_quantity,
      unit: ingredient.unit,
      stock_after: newStock,
      notes: notes || `Deducted via FIFO from ${fifoResult.batches.length} batch(es)`,
      created_by: userId
    }, { transaction });

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

    const batch = await InventoryBatch.findByPk(batchId);
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

    // Update ingredient stock
    const ingredient = await Ingredient.findByPk(batch.ingredient_id);
    const currentStock = parseFloat(ingredient.current_stock) || 0;
    const newStock = Math.max(0, currentStock - disposedQty);

    await Ingredient.update(
      { current_stock: newStock },
      { where: { id: batch.ingredient_id }, transaction }
    );

    // Create transaction record
    await InventoryTransaction.create({
      restaurant_id: restaurantId,
      ingredient_id: batch.ingredient_id,
      transaction_type: 'waste',
      quantity_change: -disposedQty,
      unit: batch.unit,
      stock_after: newStock,
      notes: reason || `Batch ${batch.batch_number || batchId} disposed`,
      created_by: userId
    }, { transaction });

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
