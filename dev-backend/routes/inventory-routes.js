const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { Ingredient, InventoryTransaction, StockTake, StockTakeItem, StockAlert, Restaurant, InventoryBatch, GeneralStock, GeneralStockTransaction, Supplier, RestaurantIngredientCost } = require('../models');

// 레스토랑의 코스트 오버라이드 맵 조회 헬퍼
async function getRestaurantCostMap(restaurantId) {
  const costs = await RestaurantIngredientCost.findAll({
    where: { restaurant_id: restaurantId }
  });
  const map = {};
  costs.forEach(c => { map[c.ingredient_id] = parseFloat(c.unit_cost); });
  return map;
}
const { authenticateToken } = require('../middleware/auth');
const { deleteOldImages } = require('../utils/imageProcessor');

// Apply auth middleware to all routes
router.use(authenticateToken);

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

    // Add stock status
    ingredients = ingredients.map(ing => {
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;

      let stockStatus = 'normal';
      if (currentStock <= 0) {
        stockStatus = 'out_of_stock';
      } else if (currentStock <= minStock) {
        stockStatus = 'low_stock';
      }

      return {
        ...ing.toJSON(),
        stock_status: stockStatus
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

    ingredients.forEach(ing => {
      totalItems++;
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;

      if (currentStock <= 0) {
        outOfStockCount++;
      } else if (currentStock <= minStock) {
        lowStockCount++;
      }
    });

    // Get this month's loss from stock takes
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const stockTakes = await StockTake.findAll({
      where: {
        restaurant_id: restaurantId,
        status: 'completed',
        completed_at: { [Op.gte]: startOfMonth }
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
      const ingredient = await Ingredient.findByPk(item.ingredient_id);
      if (!ingredient) continue;

      const quantity = parseFloat(item.quantity) || 0;

      // Update ingredient stock
      await Ingredient.update(
        {
          current_stock: quantity,
          last_actual_stock: quantity,
          last_stock_take_at: new Date()
        },
        { where: { id: item.ingredient_id }, transaction }
      );

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

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    // Round to 2 decimal places for consistency
    const addQty = Math.round((parseFloat(quantity) || 0) * 100) / 100;
    const currentStock = Math.round((parseFloat(ingredient.current_stock) || 0) * 100) / 100;
    const newStock = Math.round((currentStock + addQty) * 100) / 100;

    // Update ingredient stock
    await Ingredient.update(
      { current_stock: newStock, last_stock_take_at: new Date() },
      { where: { id: ingredient_id }, transaction }
    );

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

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const wasteQty = parseFloat(quantity) || 0;
    const currentStock = parseFloat(ingredient.current_stock) || 0;
    const newStock = Math.max(0, currentStock - wasteQty);

    // Update ingredient stock
    await Ingredient.update(
      { current_stock: newStock },
      { where: { id: ingredient_id }, transaction }
    );

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
router.post('/:restaurantId/inventory/adjust', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId } = req.params;
    const { ingredient_id, quantity, notes } = req.body;
    const userId = req.user.id;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found' });
    }

    const adjustQty = parseFloat(quantity) || 0; // Can be positive or negative
    const currentStock = parseFloat(ingredient.current_stock) || 0;
    const newStock = Math.max(0, currentStock + adjustQty);

    // Update ingredient stock
    await Ingredient.update(
      { current_stock: newStock },
      { where: { id: ingredient_id }, transaction }
    );

    // Create transaction record
    await InventoryTransaction.create({
      restaurant_id: restaurantId,
      ingredient_id: ingredient_id,
      transaction_type: 'adjustment',
      quantity_change: adjustQty,
      unit: ingredient.unit,
      stock_after: newStock,
      notes: notes || 'Manual adjustment',
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

    // Get all active ingredients and create stock take items
    const ingredients = await Ingredient.findAll({
      where: { restaurant_id: restaurantId, is_active: true }
    });

    // 레스토랑 코스트 오버라이드 맵 조회
    const costMap = await getRestaurantCostMap(restaurantId);

    for (const ing of ingredients) {
      const effectiveCost = costMap[ing.id] !== undefined ? costMap[ing.id] : (parseFloat(ing.unit_cost) || 0);
      await StockTakeItem.create({
        stock_take_id: stockTake.id,
        ingredient_id: ing.id,
        theoretical_stock: parseFloat(ing.current_stock) || 0,
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
          attributes: ['id', 'name', 'unit', 'category']
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
    const { stockTakeId } = req.params;

    const stockTake = await StockTake.findByPk(stockTakeId, {
      include: [{
        model: StockTakeItem,
        as: 'items',
        include: [{
          model: Ingredient,
          as: 'ingredient',
          attributes: ['id', 'name', 'unit', 'category']
        }]
      }]
    });

    if (!stockTake) {
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
    const { stockTakeId } = req.params;
    const { items } = req.body; // [{ id, actual_stock, variance_reason, notes }]

    const stockTake = await StockTake.findByPk(stockTakeId);
    if (!stockTake || stockTake.status !== 'in_progress') {
      return res.status(400).json({ success: false, message: 'Stock take not found or not in progress' });
    }

    for (const item of items) {
      const actualStock = parseFloat(item.actual_stock);
      if (isNaN(actualStock)) continue;

      const stockTakeItem = await StockTakeItem.findByPk(item.id);
      if (!stockTakeItem) continue;

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
          attributes: ['id', 'name', 'unit', 'category']
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

    if (!stockTake || stockTake.status !== 'in_progress') {
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

      // Update ingredient stock to actual stock
      await Ingredient.update({
        current_stock: item.actual_stock,
        last_actual_stock: item.actual_stock,
        last_stock_take_at: new Date()
      }, { where: { id: item.ingredient_id }, transaction });

      // Create transaction record for adjustment
      if (variance !== 0) {
        await InventoryTransaction.create({
          restaurant_id: restaurantId,
          ingredient_id: item.ingredient_id,
          transaction_type: 'stock_take',
          quantity_change: -variance, // Negative if theoretical > actual
          unit: (await Ingredient.findByPk(item.ingredient_id)).unit,
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
          attributes: ['id', 'name', 'unit', 'category']
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
    const { stockTakeId } = req.params;

    const stockTake = await StockTake.findByPk(stockTakeId);
    if (!stockTake || stockTake.status !== 'in_progress') {
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

    const ingredients = await Ingredient.findAll({
      where: { restaurant_id: restaurantId, is_active: true }
    });

    // 레스토랑 코스트 오버라이드 맵 조회
    const costMap = await getRestaurantCostMap(restaurantId);

    const suggestions = [];

    for (const ing of ingredients) {
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;
      const avgDailyUsage = parseFloat(ing.avg_daily_usage) || 0;
      const leadTimeDays = ing.lead_time_days || 2;
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
              category: ing.category
            },
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

async function checkAndCreateAlert(ingredientId, restaurantId, newStock, transaction = null) {
  const ingredient = await Ingredient.findByPk(ingredientId);
  if (!ingredient) return;

  const minStock = parseFloat(ingredient.min_stock) || 0;
  const currentStock = newStock;

  // Check if there's already an unresolved alert
  const existingAlert = await StockAlert.findOne({
    where: {
      ingredient_id: ingredientId,
      is_resolved: false
    }
  });

  if (currentStock <= 0) {
    // Out of stock
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
    // Low stock
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
    // Stock is now above min_stock, resolve the alert
    await StockAlert.update(
      { is_resolved: true, resolved_at: new Date() },
      { where: { id: existingAlert.id }, transaction }
    );
  }
}

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
    const { ingredientId } = req.params;
    const { lead_time_days, safety_stock_percent, manual_daily_usage, min_stock, min_order } = req.body;

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
