const express = require('express');
const router = express.Router();
const { GeneralStockCategory, GeneralStock, Restaurant } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// ============================================
// Restaurant General Stock Categories
// ============================================

/**
 * GET /api/restaurants/:restaurantId/general-stock-categories
 * 레스토랑 일반재고 카테고리 목록 조회
 */
router.get('/restaurants/:restaurantId/general-stock-categories', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const result = {
      own_categories: [],
      brand_categories: []
    };

    // 레스토랑 자체 카테고리
    const ownCategories = await GeneralStockCategory.findAll({
      where: { restaurant_id: restaurantId },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    result.own_categories = await Promise.all(ownCategories.map(async cat => {
      const stockCount = await GeneralStock.count({
        where: { restaurant_id: restaurantId, category: cat.name }
      });
      return {
        ...cat.toJSON(),
        stock_count: stockCount,
        editable: true
      };
    }));

    // 브랜드제너럴 카테고리는 회사 단위(owner_id 기준)로 관리되므로
    // 레스토랑 관리자는 자신의 카테고리만 관리함
    // brand_categories는 빈 배열로 유지

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get restaurant general stock categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/general-stock-categories
 * 레스토랑 일반재고 카테고리 생성
 */
router.post('/restaurants/:restaurantId/general-stock-categories', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, emoji, display_order } = req.body;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // 중복 확인
    const existing = await GeneralStockCategory.findOne({
      where: { restaurant_id: restaurantId, name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    // display_order 자동 설정
    let order = display_order;
    if (order === undefined || order === null) {
      const maxOrder = await GeneralStockCategory.max('display_order', { where: { restaurant_id: restaurantId } });
      order = (maxOrder || 0) + 1;
    }

    const category = await GeneralStockCategory.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      name: name.trim(),
      description,
      emoji,
      display_order: order
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Create restaurant general stock category error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/general-stock-categories/:categoryId
 * 레스토랑 일반재고 카테고리 수정
 */
router.put('/restaurants/:restaurantId/general-stock-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, categoryId } = req.params;
    const { name, description, emoji, display_order, is_active } = req.body;

    const category = await GeneralStockCategory.findOne({
      where: { id: categoryId, restaurant_id: restaurantId }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // 이름 중복 확인 (자기 자신 제외)
    if (name && name.trim() !== category.name) {
      const existing = await GeneralStockCategory.findOne({
        where: { restaurant_id: restaurantId, name: name.trim() }
      });
      if (existing) {
        return res.status(400).json({ error: 'Category name already exists' });
      }
    }

    await category.update({
      name: name ? name.trim() : category.name,
      description: description !== undefined ? description : category.description,
      emoji: emoji !== undefined ? emoji : category.emoji,
      display_order: display_order !== undefined ? display_order : category.display_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Update restaurant general stock category error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/general-stock-categories/:categoryId
 * 레스토랑 일반재고 카테고리 삭제
 */
router.delete('/restaurants/:restaurantId/general-stock-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, categoryId } = req.params;

    const category = await GeneralStockCategory.findOne({
      where: { id: categoryId, restaurant_id: restaurantId }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // 해당 카테고리를 사용하는 일반재고가 있는지 확인
    const stockCount = await GeneralStock.count({
      where: { restaurant_id: restaurantId, category: category.name }
    });

    if (stockCount > 0) {
      return res.status(400).json({
        error: `This category has ${stockCount} stock items. Please change the category first.`
      });
    }

    await category.destroy();

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Delete restaurant general stock category error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/general-stock-categories/reorder
 * 레스토랑 일반재고 카테고리 순서 변경
 */
router.put('/restaurants/:restaurantId/general-stock-categories/reorder', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { orders } = req.body;

    if (!orders || !Array.isArray(orders)) {
      return res.status(400).json({ error: 'Order data is required' });
    }

    for (const item of orders) {
      await GeneralStockCategory.update(
        { display_order: item.display_order },
        { where: { id: item.id, restaurant_id: restaurantId } }
      );
    }

    res.json({ success: true, message: 'Order updated' });
  } catch (error) {
    console.error('Reorder restaurant general stock categories error:', error);
    res.status(500).json({ error: 'Failed to reorder' });
  }
});

module.exports = router;
