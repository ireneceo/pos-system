const express = require('express');
const router = express.Router();
const { IngredientCategory, Ingredient, Restaurant } = require('../models');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');

// ============================================
// Brand Ingredient Categories
// ============================================

/**
 * GET /api/brands/:brandId/ingredient-categories
 * 브랜드 재료 카테고리 목록 조회
 */
router.get('/brands/:brandId/ingredient-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    // Shared across all brands owned by this user
    const Brand = require('../models/Brand');
    const userBrands = await Brand.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
    const allBrandIds = userBrands.map(b => b.id);

    const categories = await IngredientCategory.findAll({
      where: { brand_id: { [Op.or]: [{ [Op.in]: allBrandIds }, null] } },
      order: [['display_order', 'ASC'], ['name', 'ASC']],
      include: [{
        model: Ingredient,
        as: 'ingredients',
        attributes: ['id']
      }]
    });

    // 각 카테고리별 재료 수 추가
    const result = categories.map(cat => ({
      ...cat.toJSON(),
      ingredient_count: cat.ingredients ? cat.ingredients.length : 0
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get brand ingredient categories error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to load categories', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brands/:brandId/ingredient-categories
 * 브랜드 재료 카테고리 생성
 */
router.post('/brands/:brandId/ingredient-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const { name, description, emoji, display_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Category name is required', code: 'VALIDATION_ERROR' } });
    }

    // 중복 확인
    const existing = await IngredientCategory.findOne({
      where: { brand_id, name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'A category with this name already exists', code: 'VALIDATION_ERROR' } });
    }

    // display_order 자동 설정
    let order = display_order;
    if (order === undefined || order === null) {
      const maxOrder = await IngredientCategory.max('display_order', { where: { brand_id } });
      order = (maxOrder || 0) + 1;
    }

    const category = await IngredientCategory.create({
      owner_type: 'brand',
      brand_id,
      restaurant_id: null,
      name: name.trim(),
      description,
      emoji,
      display_order: order
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Create brand ingredient category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brands/:brandId/ingredient-categories/:categoryId
 * 브랜드 재료 카테고리 수정
 */
router.put('/brands/:brandId/ingredient-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const category_id = categoryId;
    const { name, description, emoji, display_order, is_active } = req.body;

    const category = await IngredientCategory.findOne({
      where: { id: category_id, brand_id }
    });

    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }

    // 이름 중복 확인 (자기 자신 제외)
    if (name && name.trim() !== category.name) {
      const existing = await IngredientCategory.findOne({
        where: { brand_id, name: name.trim() }
      });
      if (existing) {
        return res.status(400).json({ success: false, error: { message: 'A category with this name already exists', code: 'VALIDATION_ERROR' } });
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
    console.error('Update brand ingredient category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/brands/:brandId/ingredient-categories/:categoryId
 * 브랜드 재료 카테고리 삭제
 */
router.delete('/brands/:brandId/ingredient-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const category_id = categoryId;

    const category = await IngredientCategory.findOne({
      where: { id: category_id, brand_id }
    });

    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }

    // 해당 카테고리를 사용하는 재료가 있는지 확인
    const ingredientCount = await Ingredient.count({
      where: { ingredient_category_id: category_id }
    });

    if (ingredientCount > 0) {
      return res.status(400).json({
        error: `This category has ${ingredientCount} ingredient(s). Please change those ingredients' category first.`
      });
    }

    await category.destroy();

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Delete brand ingredient category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brands/:brandId/ingredient-categories/reorder
 * 브랜드 재료 카테고리 순서 변경
 */
router.put('/brands/:brandId/ingredient-categories/reorder', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const { orders } = req.body; // [{ id: 1, display_order: 0 }, { id: 2, display_order: 1 }, ...]

    if (!orders || !Array.isArray(orders)) {
      return res.status(400).json({ success: false, error: { message: 'Order information is required', code: 'VALIDATION_ERROR' } });
    }

    for (const item of orders) {
      await IngredientCategory.update(
        { display_order: item.display_order },
        { where: { id: item.id, brand_id } }
      );
    }

    res.json({ success: true, message: 'Order updated' });
  } catch (error) {
    console.error('Reorder brand ingredient categories error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update order', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Restaurant Ingredient Categories (독립 레스토랑용)
// ============================================

/**
 * GET /api/restaurants/:restaurantId/ingredient-categories
 * 레스토랑 재료 카테고리 목록 조회
 */
router.get('/restaurants/:restaurantId/ingredient-categories', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    const result = {
      own_categories: [],
      brand_categories: []
    };

    // 레스토랑 자체 카테고리
    const ownCategories = await IngredientCategory.findAll({
      where: { restaurant_id },
      order: [['display_order', 'ASC'], ['name', 'ASC']],
      include: [{
        model: Ingredient,
        as: 'ingredients',
        attributes: ['id']
      }]
    });

    result.own_categories = ownCategories.map(cat => ({
      ...cat.toJSON(),
      ingredient_count: cat.ingredients ? cat.ingredients.length : 0,
      editable: true
    }));

    // 브랜드 카테고리 — 레스토랑은 자기가 속한 브랜드(restaurant.brand_id) 것만, 그리고
    // 활성(is_active) 카테고리만 본다. (Irene 2026-07-05)
    //  · 이전엔 브랜드 오너가 소유한 '모든' 브랜드 카테고리를 통합해 내려줘서, 형제 브랜드
    //    카테고리까지 한 레스토랑에 겹쳐 보였다 → 자기 브랜드 하나로 한정.
    //  · BG가 비활성화한 브랜드 카테고리는 레스토랑에서 흐리게가 아니라 아예 안 보여야 한다
    //    → is_active:true 로 서버에서 제외(프론트 노출을 원천 차단). own_categories(레스토랑
    //    자체 카테고리)는 대상 아님 — 관리자가 자기 것을 껐다 켤 수 있어야 하므로 그대로 표시.
    if (restaurant.brand_id) {
      const brandCategories = await IngredientCategory.findAll({
        where: { brand_id: restaurant.brand_id, is_active: true },
        order: [['display_order', 'ASC'], ['name', 'ASC']],
        include: [{
          model: Ingredient,
          as: 'ingredients',
          attributes: ['id']
        }]
      });

      result.brand_categories = brandCategories.map(cat => ({
        ...cat.toJSON(),
        ingredient_count: cat.ingredients ? cat.ingredients.length : 0,
        editable: false
      }));
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get restaurant ingredient categories error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to load categories', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/restaurants/:restaurantId/ingredient-categories
 * 레스토랑 재료 카테고리 생성 (독립 레스토랑만)
 */
router.post('/restaurants/:restaurantId/ingredient-categories', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용
    const { name, description, emoji, display_order } = req.body;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: { message: 'Category name is required', code: 'VALIDATION_ERROR' } });
    }

    // 중복 확인
    const existing = await IngredientCategory.findOne({
      where: { restaurant_id, name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'A category with this name already exists', code: 'VALIDATION_ERROR' } });
    }

    // display_order 자동 설정
    let order = display_order;
    if (order === undefined || order === null) {
      const maxOrder = await IngredientCategory.max('display_order', { where: { restaurant_id } });
      order = (maxOrder || 0) + 1;
    }

    const category = await IngredientCategory.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id,
      name: name.trim(),
      description,
      emoji,
      display_order: order
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Create restaurant ingredient category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/ingredient-categories/:categoryId
 * 레스토랑 재료 카테고리 수정
 */
router.put('/restaurants/:restaurantId/ingredient-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, categoryId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용
    const category_id = categoryId;
    const { name, description, emoji, display_order, is_active } = req.body;

    const category = await IngredientCategory.findOne({
      where: { id: category_id, restaurant_id }
    });

    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }

    // 이름 중복 확인 (자기 자신 제외)
    if (name && name.trim() !== category.name) {
      const existing = await IngredientCategory.findOne({
        where: { restaurant_id, name: name.trim() }
      });
      if (existing) {
        return res.status(400).json({ success: false, error: { message: 'A category with this name already exists', code: 'VALIDATION_ERROR' } });
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
    console.error('Update restaurant ingredient category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update category', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/ingredient-categories/:categoryId
 * 레스토랑 재료 카테고리 삭제
 */
router.delete('/restaurants/:restaurantId/ingredient-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, categoryId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용
    const category_id = categoryId;

    const category = await IngredientCategory.findOne({
      where: { id: category_id, restaurant_id }
    });

    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }

    // 해당 카테고리를 사용하는 재료가 있는지 확인
    const ingredientCount = await Ingredient.count({
      where: { ingredient_category_id: category_id }
    });

    if (ingredientCount > 0) {
      return res.status(400).json({
        error: `This category has ${ingredientCount} ingredient(s). Please change those ingredients' category first.`
      });
    }

    await category.destroy();

    res.json({ success: true, message: 'Category deleted' });
  } catch (error) {
    console.error('Delete restaurant ingredient category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete category', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;
