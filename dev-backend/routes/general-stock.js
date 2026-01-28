/**
 * General Stock Routes - Company-wide inventory for Brand General
 *
 * Brand General의 회사 전체 재고 관리 API
 * owner_id (Brand General User ID) 기준으로 데이터 관리
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { GeneralStock, GeneralStockCategory, Supplier } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// ========== General Stock APIs (Company-wide) ==========

// GET /api/general-stock - 회사 전체 General Stock 목록
router.get('/general-stock', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, status, search } = req.query;

    const whereClause = {
      owner_id: userId,
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
    console.error('Get general stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/general-stock - General Stock 추가
router.post('/general-stock', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, stock_unit, unit_cost, category, current_stock, min_stock, min_order, supplier_id, code, image_url } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // Auto-generate code if not provided
    let finalCode = code;
    if (!finalCode) {
      const count = await GeneralStock.count({ where: { owner_id: userId, restaurant_id: null } });
      finalCode = `GS-${String(count + 1).padStart(3, '0')}`;
    }

    const newItem = await GeneralStock.create({
      owner_id: userId,
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
    console.error('Add general stock error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/general-stock/transactions - 회사 전체 General Stock 트랜잭션 내역
// NOTE: This route must be defined BEFORE routes with :itemId parameter
router.get('/general-stock/transactions', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 50;

    // 브랜드제너럴의 General Stock 트랜잭션 조회
    const { GeneralStockTransaction } = require('../models');

    // Check if model exists
    if (!GeneralStockTransaction) {
      return res.json({ success: true, data: [] });
    }

    const transactions = await GeneralStockTransaction.findAll({
      where: { owner_id: userId },
      include: [{
        model: GeneralStock,
        as: 'generalStock',
        attributes: ['id', 'name', 'unit']
      }],
      order: [['created_at', 'DESC']],
      limit
    });

    const formattedTransactions = transactions.map(t => ({
      id: t.id,
      transaction_type: t.transaction_type,
      quantity_change: parseFloat(t.quantity_change),
      unit: t.unit,
      stock_after: parseFloat(t.stock_after),
      notes: t.notes,
      created_at: t.created_at,
      ingredient: t.generalStock ? {
        id: t.generalStock.id,
        name: t.generalStock.name,
        unit: t.generalStock.unit
      } : null
    }));

    res.json({ success: true, data: formattedTransactions });
  } catch (error) {
    console.error('Get general stock transactions error:', error);
    // Return empty array if table doesn't exist yet
    res.json({ success: true, data: [] });
  }
});

// POST /api/general-stock/:itemId/receive - General Stock 입고
router.post('/general-stock/:itemId/receive', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { quantity, notes } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, owner_id: userId, restaurant_id: null, is_active: true }
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
    console.error('General stock receive error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/general-stock/:itemId/adjust - General Stock 조정
router.post('/general-stock/:itemId/adjust', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { new_quantity, reason } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, owner_id: userId, restaurant_id: null, is_active: true }
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
    console.error('General stock adjust error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/general-stock/:itemId - General Stock 수정
router.put('/general-stock/:itemId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { name, code, image_url, stock_unit, unit_cost, category, current_stock, min_stock, min_order, supplier_id } = req.body;

    const item = await GeneralStock.findOne({
      where: { id: itemId, owner_id: userId, restaurant_id: null, is_active: true }
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
    console.error('General stock update error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/general-stock/:itemId - General Stock 삭제
router.delete('/general-stock/:itemId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;

    const item = await GeneralStock.findOne({
      where: { id: itemId, owner_id: userId, restaurant_id: null, is_active: true }
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

// ========== General Stock Categories APIs (Company-wide) ==========

// GET /api/general-stock-categories - 회사 전체 카테고리 목록
router.get('/general-stock-categories', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await GeneralStockCategory.findAll({
      where: {
        owner_type: 'brand',
        brand_id: userId,  // owner_id 역할로 사용
        is_active: true
      },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Get general stock categories error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/general-stock-categories - 카테고리 추가
router.post('/general-stock-categories', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description, emoji, display_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    // Check for duplicate name
    const existing = await GeneralStockCategory.findOne({
      where: {
        owner_type: 'brand',
        brand_id: userId,
        name: name.trim(),
        is_active: true
      }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: 'Category with this name already exists' });
    }

    const category = await GeneralStockCategory.create({
      owner_type: 'brand',
      brand_id: userId,  // owner_id 역할로 사용
      name: name.trim(),
      description: description || null,
      emoji: emoji || null,
      display_order: display_order || 0,
      is_active: true
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Add general stock category error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/general-stock-categories/:categoryId - 카테고리 수정
router.put('/general-stock-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;
    const { name, description, emoji, display_order } = req.body;

    const category = await GeneralStockCategory.findOne({
      where: {
        id: categoryId,
        owner_type: 'brand',
        brand_id: userId,
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
    console.error('Update general stock category error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/general-stock-categories/reorder - 카테고리 순서 변경
router.put('/general-stock-categories/reorder', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { orders } = req.body;

    if (!orders || !Array.isArray(orders)) {
      return res.status(400).json({ success: false, message: 'Orders array is required' });
    }

    for (const item of orders) {
      await GeneralStockCategory.update(
        { display_order: item.display_order },
        {
          where: {
            id: item.id,
            owner_type: 'brand',
            brand_id: userId,
            is_active: true
          }
        }
      );
    }

    res.json({ success: true, message: 'Categories reordered' });
  } catch (error) {
    console.error('Reorder general stock categories error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/general-stock-categories/:categoryId - 카테고리 삭제
router.delete('/general-stock-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;

    const category = await GeneralStockCategory.findOne({
      where: {
        id: categoryId,
        owner_type: 'brand',
        brand_id: userId,
        is_active: true
      }
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    await category.update({ is_active: false });

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Delete general stock category error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
