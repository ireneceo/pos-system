const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const { Ingredient, InventoryTransaction, StockTake, StockTakeItem, StockAlert, Restaurant } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authenticateToken);

// ============================================
// 재고 현황 APIs
// ============================================

// GET /api/restaurants/:restaurantId/inventory - 재고 현황 (전체)
router.get('/restaurants/:restaurantId/inventory', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { category, status, search } = req.query;

    // Get restaurant to check if it belongs to a brand
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    // Build where clause to include both restaurant's own ingredients and brand ingredients
    const whereConditions = [
      { restaurant_id: restaurantId, is_active: true }
    ];

    // If restaurant belongs to a brand, also include brand ingredients
    if (restaurant.brand_id) {
      whereConditions.push({
        brand_id: restaurant.brand_id,
        owner_type: 'brand',
        is_active: true
      });
    }

    const whereClause = {
      [Op.or]: whereConditions
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
router.get('/restaurants/:restaurantId/inventory/summary', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Get restaurant to check if it belongs to a brand
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    // Build where clause to include both restaurant's own ingredients and brand ingredients
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
router.get('/restaurants/:restaurantId/inventory/alerts', async (req, res) => {
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
router.put('/restaurants/:restaurantId/inventory/alerts/:alertId/resolve', async (req, res) => {
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
router.post('/restaurants/:restaurantId/inventory/initial', async (req, res) => {
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

// POST /api/restaurants/:restaurantId/inventory/receive - 입고 처리
router.post('/restaurants/:restaurantId/inventory/receive', async (req, res) => {
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

    const addQty = parseFloat(quantity) || 0;
    const currentStock = parseFloat(ingredient.current_stock) || 0;
    const newStock = currentStock + addQty;

    // Update ingredient stock
    await Ingredient.update(
      { current_stock: newStock },
      { where: { id: ingredient_id }, transaction }
    );

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
    res.json({ success: true, message: 'Stock received successfully', new_stock: newStock });
  } catch (error) {
    await transaction.rollback();
    console.error('Receive stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/restaurants/:restaurantId/inventory/waste - 폐기 처리
router.post('/restaurants/:restaurantId/inventory/waste', async (req, res) => {
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
router.post('/restaurants/:restaurantId/inventory/adjust', async (req, res) => {
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

// GET /api/restaurants/:restaurantId/inventory/transactions - 거래 내역
router.get('/restaurants/:restaurantId/inventory/transactions', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { ingredient_id, type, from_date, to_date, limit = 100, offset = 0 } = req.query;

    const whereClause = { restaurant_id: restaurantId };

    if (ingredient_id) {
      whereClause.ingredient_id = ingredient_id;
    }

    if (type) {
      whereClause.transaction_type = type;
    }

    if (from_date || to_date) {
      whereClause.created_at = {};
      if (from_date) whereClause.created_at[Op.gte] = new Date(from_date);
      if (to_date) whereClause.created_at[Op.lte] = new Date(to_date);
    }

    const { count, rows: transactions } = await InventoryTransaction.findAndCountAll({
      where: whereClause,
      include: [{
        model: Ingredient,
        as: 'ingredient',
        attributes: ['id', 'name', 'unit']
      }],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: transactions,
      pagination: {
        total: count,
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
router.get('/restaurants/:restaurantId/stock-takes', async (req, res) => {
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
router.post('/restaurants/:restaurantId/stock-takes', async (req, res) => {
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

    for (const ing of ingredients) {
      await StockTakeItem.create({
        stock_take_id: stockTake.id,
        ingredient_id: ing.id,
        theoretical_stock: parseFloat(ing.current_stock) || 0,
        unit_cost: parseFloat(ing.unit_cost) || 0
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
router.get('/restaurants/:restaurantId/stock-takes/:stockTakeId', async (req, res) => {
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
router.put('/restaurants/:restaurantId/stock-takes/:stockTakeId/items', async (req, res) => {
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
router.post('/restaurants/:restaurantId/stock-takes/:stockTakeId/complete', async (req, res) => {
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
router.post('/restaurants/:restaurantId/stock-takes/:stockTakeId/cancel', async (req, res) => {
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
router.get('/restaurants/:restaurantId/inventory/reorder-suggestions', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const ingredients = await Ingredient.findAll({
      where: { restaurant_id: restaurantId, is_active: true }
    });

    const suggestions = [];

    for (const ing of ingredients) {
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;
      const avgDailyUsage = parseFloat(ing.avg_daily_usage) || 0;
      const leadTimeDays = ing.lead_time_days || 2;

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
              unit_cost: ing.unit_cost,
              category: ing.category
            },
            current_stock: currentStock,
            min_stock: minStock,
            avg_daily_usage: avgDailyUsage,
            lead_time_days: leadTimeDays,
            reorder_point: reorderPoint,
            suggested_qty: roundedQty,
            estimated_cost: roundedQty * parseFloat(ing.unit_cost),
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

module.exports = router;
