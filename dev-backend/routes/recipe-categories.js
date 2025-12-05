const express = require('express');
const router = express.Router();
const { RecipeCategory, Recipe, Restaurant } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');

// ============================================
// Brand Recipe Categories
// ============================================

/**
 * GET /api/brands/:brandId/recipe-categories
 * 브랜드 레시피 카테고리 목록 조회
 */
router.get('/brands/:brandId/recipe-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용

    const categories = await RecipeCategory.findAll({
      where: { brand_id },
      order: [['display_order', 'ASC'], ['name', 'ASC']],
      include: [{
        model: Recipe,
        as: 'recipes',
        attributes: ['id']
      }]
    });

    // 각 카테고리별 레시피 수 추가
    const result = categories.map(cat => ({
      ...cat.toJSON(),
      recipe_count: cat.recipes ? cat.recipes.length : 0
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get brand recipe categories error:', error);
    res.status(500).json({ error: '카테고리 목록 조회 실패' });
  }
});

/**
 * POST /api/brands/:brandId/recipe-categories
 * 브랜드 레시피 카테고리 생성
 */
router.post('/brands/:brandId/recipe-categories', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const { name, description, emoji, display_order } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: '카테고리 이름은 필수입니다' });
    }

    // 중복 확인
    const existing = await RecipeCategory.findOne({
      where: { brand_id, name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ error: '이미 존재하는 카테고리 이름입니다' });
    }

    // display_order 자동 설정
    let order = display_order;
    if (order === undefined || order === null) {
      const maxOrder = await RecipeCategory.max('display_order', { where: { brand_id } });
      order = (maxOrder || 0) + 1;
    }

    const category = await RecipeCategory.create({
      brand_id,
      restaurant_id: null,
      name: name.trim(),
      description,
      emoji,
      display_order: order
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Create brand recipe category error:', error);
    res.status(500).json({ error: '카테고리 생성 실패' });
  }
});

/**
 * PUT /api/brands/:brandId/recipe-categories/:categoryId
 * 브랜드 레시피 카테고리 수정
 */
router.put('/brands/:brandId/recipe-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const category_id = categoryId;
    const { name, description, emoji, display_order, is_active } = req.body;

    const category = await RecipeCategory.findOne({
      where: { id: category_id, brand_id }
    });

    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    // 이름 중복 확인 (자기 자신 제외)
    if (name && name.trim() !== category.name) {
      const existing = await RecipeCategory.findOne({
        where: { brand_id, name: name.trim() }
      });
      if (existing) {
        return res.status(400).json({ error: '이미 존재하는 카테고리 이름입니다' });
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
    console.error('Update brand recipe category error:', error);
    res.status(500).json({ error: '카테고리 수정 실패' });
  }
});

/**
 * DELETE /api/brands/:brandId/recipe-categories/:categoryId
 * 브랜드 레시피 카테고리 삭제
 */
router.delete('/brands/:brandId/recipe-categories/:categoryId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId, categoryId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const category_id = categoryId;

    const category = await RecipeCategory.findOne({
      where: { id: category_id, brand_id }
    });

    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    // 해당 카테고리를 사용하는 레시피가 있는지 확인
    const recipeCount = await Recipe.count({
      where: { recipe_category_id: category_id }
    });

    if (recipeCount > 0) {
      return res.status(400).json({
        error: `이 카테고리에 ${recipeCount}개의 레시피가 있습니다. 먼저 레시피의 카테고리를 변경해주세요.`
      });
    }

    await category.destroy();

    res.json({ success: true, message: '카테고리가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand recipe category error:', error);
    res.status(500).json({ error: '카테고리 삭제 실패' });
  }
});

/**
 * PUT /api/brands/:brandId/recipe-categories/reorder
 * 브랜드 레시피 카테고리 순서 변경
 */
router.put('/brands/:brandId/recipe-categories/reorder', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const { orders } = req.body; // [{ id: 1, display_order: 0 }, { id: 2, display_order: 1 }, ...]

    if (!orders || !Array.isArray(orders)) {
      return res.status(400).json({ error: '순서 정보가 필요합니다' });
    }

    for (const item of orders) {
      await RecipeCategory.update(
        { display_order: item.display_order },
        { where: { id: item.id, brand_id } }
      );
    }

    res.json({ success: true, message: '순서가 변경되었습니다' });
  } catch (error) {
    console.error('Reorder brand recipe categories error:', error);
    res.status(500).json({ error: '순서 변경 실패' });
  }
});

// ============================================
// Restaurant Recipe Categories (독립 레스토랑용)
// ============================================

/**
 * GET /api/restaurants/:restaurantId/recipe-categories
 * 레스토랑 레시피 카테고리 목록 조회
 */
router.get('/restaurants/:restaurantId/recipe-categories', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ error: '레스토랑을 찾을 수 없습니다' });
    }

    const result = {
      own_categories: [],
      brand_categories: []
    };

    // 레스토랑 자체 카테고리
    const ownCategories = await RecipeCategory.findAll({
      where: { restaurant_id },
      order: [['display_order', 'ASC'], ['name', 'ASC']],
      include: [{
        model: Recipe,
        as: 'recipes',
        attributes: ['id']
      }]
    });

    result.own_categories = ownCategories.map(cat => ({
      ...cat.toJSON(),
      recipe_count: cat.recipes ? cat.recipes.length : 0,
      editable: true
    }));

    // 브랜드 카테고리 (브랜드 소속인 경우)
    if (restaurant.brand_id) {
      const brandCategories = await RecipeCategory.findAll({
        where: { brand_id: restaurant.brand_id },
        order: [['display_order', 'ASC'], ['name', 'ASC']],
        include: [{
          model: Recipe,
          as: 'recipes',
          attributes: ['id']
        }]
      });

      result.brand_categories = brandCategories.map(cat => ({
        ...cat.toJSON(),
        recipe_count: cat.recipes ? cat.recipes.length : 0,
        editable: false
      }));
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get restaurant recipe categories error:', error);
    res.status(500).json({ error: '카테고리 목록 조회 실패' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/recipe-categories
 * 레스토랑 레시피 카테고리 생성 (독립 레스토랑만)
 */
router.post('/restaurants/:restaurantId/recipe-categories', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용
    const { name, description, emoji, display_order } = req.body;

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ error: '레스토랑을 찾을 수 없습니다' });
    }

    // 브랜드 소속이고 recipe_manager_type이 brand인 경우 생성 불가
    if (restaurant.brand_id && restaurant.recipe_manager_type === 'brand') {
      return res.status(403).json({ error: '브랜드 관리 모드에서는 카테고리를 생성할 수 없습니다' });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ error: '카테고리 이름은 필수입니다' });
    }

    // 중복 확인
    const existing = await RecipeCategory.findOne({
      where: { restaurant_id, name: name.trim() }
    });
    if (existing) {
      return res.status(400).json({ error: '이미 존재하는 카테고리 이름입니다' });
    }

    // display_order 자동 설정
    let order = display_order;
    if (order === undefined || order === null) {
      const maxOrder = await RecipeCategory.max('display_order', { where: { restaurant_id } });
      order = (maxOrder || 0) + 1;
    }

    const category = await RecipeCategory.create({
      brand_id: null,
      restaurant_id,
      name: name.trim(),
      description,
      emoji,
      display_order: order
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Create restaurant recipe category error:', error);
    res.status(500).json({ error: '카테고리 생성 실패' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/recipe-categories/:categoryId
 * 레스토랑 레시피 카테고리 수정
 */
router.put('/restaurants/:restaurantId/recipe-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, categoryId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용
    const category_id = categoryId;
    const { name, description, emoji, display_order, is_active } = req.body;

    const category = await RecipeCategory.findOne({
      where: { id: category_id, restaurant_id }
    });

    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    // 이름 중복 확인 (자기 자신 제외)
    if (name && name.trim() !== category.name) {
      const existing = await RecipeCategory.findOne({
        where: { restaurant_id, name: name.trim() }
      });
      if (existing) {
        return res.status(400).json({ error: '이미 존재하는 카테고리 이름입니다' });
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
    console.error('Update restaurant recipe category error:', error);
    res.status(500).json({ error: '카테고리 수정 실패' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/recipe-categories/:categoryId
 * 레스토랑 레시피 카테고리 삭제
 */
router.delete('/restaurants/:restaurantId/recipe-categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, categoryId } = req.params;
    const restaurant_id = restaurantId; // DB 쿼리용
    const category_id = categoryId;

    const category = await RecipeCategory.findOne({
      where: { id: category_id, restaurant_id }
    });

    if (!category) {
      return res.status(404).json({ error: '카테고리를 찾을 수 없습니다' });
    }

    // 해당 카테고리를 사용하는 레시피가 있는지 확인
    const recipeCount = await Recipe.count({
      where: { recipe_category_id: category_id }
    });

    if (recipeCount > 0) {
      return res.status(400).json({
        error: `이 카테고리에 ${recipeCount}개의 레시피가 있습니다. 먼저 레시피의 카테고리를 변경해주세요.`
      });
    }

    await category.destroy();

    res.json({ success: true, message: '카테고리가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant recipe category error:', error);
    res.status(500).json({ error: '카테고리 삭제 실패' });
  }
});

module.exports = router;
