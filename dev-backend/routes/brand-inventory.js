const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  Brand,
  Restaurant,
  Ingredient,
  InventoryBatch,
  GeneralStock,
  GeneralStockCategory,
  Supplier
} = require('../models');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Get brand's restaurants
router.get('/brands/:brandId/restaurants', async (req, res) => {
  try {
    const { brandId } = req.params;

    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id', 'name', 'brand_id'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching brand restaurants:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch restaurants' });
  }
});

// Get brand-wide inventory summary
router.get('/brands/:brandId/inventory/summary', async (req, res) => {
  try {
    const { brandId } = req.params;

    // Get all restaurants under this brand
    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id']
    });

    const restaurantIds = restaurants.map(r => r.id);

    if (restaurantIds.length === 0) {
      return res.json({
        success: true,
        data: {
          total_restaurants: 0,
          total_ingredients: 0,
          low_stock_count: 0,
          out_of_stock_count: 0,
          expiring_count: 0
        }
      });
    }

    // Count ingredients across all restaurants
    const ingredients = await Ingredient.findAll({
      where: {
        [Op.or]: [
          { restaurant_id: { [Op.in]: restaurantIds } },
          { brand_id: brandId }
        ],
        is_active: true
      }
    });

    let lowStockCount = 0;
    let outOfStockCount = 0;

    ingredients.forEach(ing => {
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;

      if (currentStock <= 0) {
        outOfStockCount++;
      } else if (currentStock <= minStock) {
        lowStockCount++;
      }
    });

    // Count expiring items (within 7 days)
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const expiringBatches = await InventoryBatch.count({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: 'active',
        remaining_quantity: { [Op.gt]: 0 },
        expiry_date: {
          [Op.and]: [
            { [Op.not]: null },
            { [Op.lte]: sevenDaysFromNow }
          ]
        }
      }
    });

    res.json({
      success: true,
      data: {
        total_restaurants: restaurantIds.length,
        total_ingredients: ingredients.length,
        low_stock_count: lowStockCount,
        out_of_stock_count: outOfStockCount,
        expiring_count: expiringBatches
      }
    });
  } catch (error) {
    console.error('Error fetching brand inventory summary:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch summary' });
  }
});

// Get all inventory across brand's restaurants
router.get('/brands/:brandId/inventory', async (req, res) => {
  try {
    const { brandId } = req.params;

    // Get all restaurants under this brand
    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id', 'name']
    });

    const restaurantIds = restaurants.map(r => r.id);
    const restaurantMap = {};
    restaurants.forEach(r => {
      restaurantMap[r.id] = r.name;
    });

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // Get all ingredients for these restaurants
    const ingredients = await Ingredient.findAll({
      where: {
        [Op.or]: [
          { restaurant_id: { [Op.in]: restaurantIds } },
          { brand_id: brandId }
        ],
        is_active: true
      },
      order: [['name', 'ASC']]
    });

    const inventoryData = ingredients.map(ing => {
      const currentStock = parseFloat(ing.current_stock) || 0;
      const minStock = parseFloat(ing.min_stock) || 0;

      let stockStatus = 'normal';
      if (currentStock <= 0) {
        stockStatus = 'out_of_stock';
      } else if (currentStock <= minStock) {
        stockStatus = 'low_stock';
      }

      return {
        id: ing.id,
        name: ing.name,
        unit: ing.unit,
        unit_cost: parseFloat(ing.unit_cost) || 0,
        category: ing.category,
        current_stock: currentStock,
        min_stock: minStock,
        avg_daily_usage: parseFloat(ing.avg_daily_usage) || 0,
        prediction_confidence: ing.prediction_confidence || 'none',
        stock_status: stockStatus,
        restaurant_id: ing.restaurant_id,
        restaurant_name: restaurantMap[ing.restaurant_id] || 'Brand Level'
      };
    });

    res.json({ success: true, data: inventoryData });
  } catch (error) {
    console.error('Error fetching brand inventory:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch inventory' });
  }
});

// Get expiring items across brand's restaurants
router.get('/brands/:brandId/inventory/expiring', async (req, res) => {
  try {
    const { brandId } = req.params;
    const { days = 14 } = req.query;

    // Get all restaurants under this brand
    const restaurants = await Restaurant.findAll({
      where: {
        brand_id: brandId,
        status: 'active'
      },
      attributes: ['id', 'name']
    });

    const restaurantIds = restaurants.map(r => r.id);
    const restaurantMap = {};
    restaurants.forEach(r => {
      restaurantMap[r.id] = r.name;
    });

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + parseInt(days));

    const expiringBatches = await InventoryBatch.findAll({
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: 'active',
        remaining_quantity: { [Op.gt]: 0 },
        expiry_date: {
          [Op.and]: [
            { [Op.not]: null },
            { [Op.lte]: targetDate }
          ]
        }
      },
      include: [{
        model: Ingredient,
        as: 'ingredient',
        attributes: ['id', 'name', 'unit']
      }],
      order: [['expiry_date', 'ASC']]
    });

    const now = new Date();
    const data = expiringBatches.map(batch => {
      const expiryDate = new Date(batch.expiry_date);
      const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));

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
        unit: batch.unit,
        expiry_date: batch.expiry_date,
        days_until_expiry: daysUntilExpiry,
        urgency,
        restaurant_id: batch.restaurant_id,
        restaurant_name: restaurantMap[batch.restaurant_id] || 'Unknown'
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching expiring items:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch expiring items' });
  }
});

module.exports = router;
