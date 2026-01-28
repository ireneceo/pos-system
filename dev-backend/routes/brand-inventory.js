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

// ========== Brand General Stock APIs ==========

// GET /api/brands/:brandId/general-stock - 브랜드 General Stock 목록
router.get('/brands/:brandId/general-stock', async (req, res) => {
  try {
    const { brandId } = req.params;
    const { category, status, search } = req.query;

    const whereClause = {
      brand_id: brandId,
      restaurant_id: null,
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
    console.error('Get brand general stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/brands/:brandId/general-stock - 브랜드 General Stock 추가
router.post('/brands/:brandId/general-stock', async (req, res) => {
  try {
    const { brandId } = req.params;
    const { name, stock_unit, unit_cost, category, current_stock, min_stock, min_order, supplier_id, code, image_url } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // Auto-generate code if not provided
    let finalCode = code;
    if (!finalCode) {
      const count = await GeneralStock.count({ where: { brand_id: brandId, restaurant_id: null } });
      finalCode = `BGS-${String(count + 1).padStart(3, '0')}`;
    }

    const newItem = await GeneralStock.create({
      brand_id: brandId,
      restaurant_id: null,
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
    console.error('Add brand general stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/brands/:brandId/general-stock/:itemId/receive - 브랜드 General Stock 입고
router.post('/brands/:brandId/general-stock/:itemId/receive', async (req, res) => {
  try {
    const { brandId, itemId } = req.params;
    const { quantity, notes } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, brand_id: brandId, restaurant_id: null, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    const currentStock = parseFloat(item.current_stock) || 0;
    const newStock = currentStock + parseFloat(quantity);

    await item.update({ current_stock: newStock });

    res.json({
      success: true,
      data: {
        id: item.id,
        name: item.name,
        previous_stock: currentStock,
        added_quantity: parseFloat(quantity),
        current_stock: newStock
      }
    });
  } catch (error) {
    console.error('Brand general stock receive error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/brands/:brandId/general-stock/:itemId/adjust - 브랜드 General Stock 조정
router.post('/brands/:brandId/general-stock/:itemId/adjust', async (req, res) => {
  try {
    const { brandId, itemId } = req.params;
    const { new_quantity, reason } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, brand_id: brandId, restaurant_id: null, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    const currentStock = parseFloat(item.current_stock) || 0;
    const newStock = Math.max(0, parseFloat(new_quantity));

    await item.update({ current_stock: newStock });

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
    console.error('Brand general stock adjust error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/brands/:brandId/general-stock/:itemId - 브랜드 General Stock 수정
router.put('/brands/:brandId/general-stock/:itemId', async (req, res) => {
  try {
    const { brandId, itemId } = req.params;
    const { name, code, image_url, stock_unit, unit_cost, category, current_stock, min_stock, min_order, supplier_id } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, brand_id: brandId, restaurant_id: null, is_active: true }
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'General stock item not found' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (code !== undefined) updateData.code = code;
    if (image_url !== undefined) updateData.image_url = image_url;
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
    console.error('Brand general stock update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/brands/:brandId/general-stock/:itemId - 브랜드 General Stock 삭제
router.delete('/brands/:brandId/general-stock/:itemId', async (req, res) => {
  try {
    const { brandId, itemId } = req.params;

    const item = await GeneralStock.findOne({
      where: { id: itemId, brand_id: brandId, restaurant_id: null, is_active: true }
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
    console.error('Brand general stock delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========== Brand General Stock Categories APIs ==========

// GET /api/brands/:brandId/general-stock-categories - 브랜드 카테고리 목록
router.get('/brands/:brandId/general-stock-categories', async (req, res) => {
  try {
    const { brandId } = req.params;

    const categories = await GeneralStockCategory.findAll({
      where: {
        brand_id: brandId,
        owner_type: 'brand',
        is_active: true
      },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get brand general stock categories error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/brands/:brandId/general-stock-categories - 브랜드 카테고리 추가
router.post('/brands/:brandId/general-stock-categories', async (req, res) => {
  try {
    const { brandId } = req.params;
    const { name, description, emoji, display_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // Check for duplicate name
    const existing = await GeneralStockCategory.findOne({
      where: {
        brand_id: brandId,
        owner_type: 'brand',
        name: name.trim(),
        is_active: true
      }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Category with this name already exists' });
    }

    const category = await GeneralStockCategory.create({
      brand_id: brandId,
      owner_type: 'brand',
      name: name.trim(),
      description: description || null,
      emoji: emoji || null,
      display_order: display_order || 0,
      is_active: true
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Add brand general stock category error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/brands/:brandId/general-stock-categories/:categoryId - 브랜드 카테고리 수정
router.put('/brands/:brandId/general-stock-categories/:categoryId', async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;
    const { name, description, emoji, display_order } = req.body;

    const category = await GeneralStockCategory.findOne({
      where: {
        id: categoryId,
        brand_id: brandId,
        owner_type: 'brand',
        is_active: true
      }
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (emoji !== undefined) updateData.emoji = emoji;
    if (display_order !== undefined) updateData.display_order = display_order;

    await category.update(updateData);

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Update brand general stock category error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/brands/:brandId/general-stock-categories/:categoryId - 브랜드 카테고리 삭제
router.delete('/brands/:brandId/general-stock-categories/:categoryId', async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;

    const category = await GeneralStockCategory.findOne({
      where: {
        id: categoryId,
        brand_id: brandId,
        owner_type: 'brand',
        is_active: true
      }
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await category.update({ is_active: false });

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Delete brand general stock category error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
