const express = require('express');
const router = express.Router();

/**
 * 카테고리를 지울 때, 그 안의 재료를 어디로 보낼지 정한다 (2026-09-16 Irene 지시).
 *   원문: 「카테고리 삭제할 때 다른 카테고리에 넣을지 선택하게 해줘.」
 * 전에는 재료가 1건이라도 있으면 400 으로 거부하고 「먼저 바꾸라」고만 해서,
 * 옮길 곳을 고르는 입력도 한꺼번에 옮기는 경로도 없었다.
 *
 * allowedIds = 이 요청자가 «보낼 수 있는» 카테고리 id 집합. 여기 없는 값은 거부한다
 * (남의 매장·남의 브랜드 카테고리로 밀어넣는 것을 막는다).
 * 재료 수는 category_id 로만 센다 — 브랜드 카테고리를 여러 매장 재료가 함께 쓰므로
 * 매장으로 좁히면 «남은 재료»를 놓친다.
 */
async function resolveReassign({ categoryId, reassignTo, allowedIds }) {
  const inUse = await Ingredient.count({ where: { ingredient_category_id: categoryId } });
  if (inUse === 0) return { ok: true, inUse: 0, target: null };

  if (reassignTo === undefined || reassignTo === null || reassignTo === '') {
    return {
      ok: false, inUse,
      status: 400, code: 'CATEGORY_IN_USE',
      message: `This category still holds ${inUse} ingredient(s). Choose where to move them first.`
    };
  }

  const target = parseInt(reassignTo, 10);
  if (!Number.isFinite(target)) {
    return { ok: false, inUse, status: 400, code: 'INVALID_TARGET', message: 'Destination category is not valid' };
  }
  if (target === parseInt(categoryId, 10)) {
    return { ok: false, inUse, status: 400, code: 'INVALID_TARGET', message: 'Cannot move ingredients into the category being deleted' };
  }
  if (!allowedIds.has(target)) {
    return { ok: false, inUse, status: 400, code: 'INVALID_TARGET', message: 'Destination category is not available here' };
  }
  return { ok: true, inUse, target };
}

const { IngredientCategory, Ingredient, Restaurant } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
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
 * 브랜드 소유 재료 카테고리는 **더 만들지 않는다** (2026-09-17 Fable 판정 ⑧ · 게이트 보류 A).
 *
 * 매장이 보는 재료 분류의 정본은 **매장 소유 한 벌**이다. 브랜드 소유 벌은 2026-07-05 에 폐기된
 * 프로덕트→재료 미러가 남긴 사본이고, 브랜드의 «진짜» 분류는 Stock Items 쪽
 * (`product_ingredient_categories`)에 따로 있다.
 *
 * ⛔ 이 문을 열어 두면 브랜드 사용자가 매장에 이미 있는 이름으로 카테고리를 하나 만드는 것만으로
 *    인스펙션 ING-UNI-026(이름 중복 0)이 켜져 **정상 사용자 행위가 배포를 막는다.**
 *    읽기(GET)와 비활성화(DELETE)는 남긴다 — 합치기 스크립트와 읽기 전용 표시가 쓴다.
 */
function brandCategoryWriteStopped(req, res) {
  return res.status(403).json({
    success: false,
    error: {
      code: 'BRAND_INGREDIENT_CATEGORY_WRITE_STOPPED',
      message: 'Brand-owned ingredient categories are no longer created. Use Stock Item categories instead.'
    },
    message: '브랜드 재료 카테고리는 더 만들지 않습니다 — Stock Items 분류를 쓰세요.'
  });
}

/**
 * POST /api/brands/:brandId/ingredient-categories — **쓰기 중단**
 */
router.post('/brands/:brandId/ingredient-categories', authenticateToken, isBrandManager, async (req, res) => {
  return brandCategoryWriteStopped(req, res);
  // eslint-disable-next-line no-unreachable
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
  return brandCategoryWriteStopped(req, res);
  // eslint-disable-next-line no-unreachable
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

    // 옮길 수 있는 곳 = 같은 브랜드의 다른 카테고리
    const siblings = await IngredientCategory.findAll({
      where: { brand_id, owner_type: 'brand' }, attributes: ['id']
    });
    const allowedIds = new Set(siblings.map((c) => c.id));

    const plan = await resolveReassign({
      categoryId: category_id,
      reassignTo: req.body && req.body.reassign_to_category_id,
      allowedIds
    });
    if (!plan.ok) {
      return res.status(plan.status).json({
        success: false, code: plan.code, message: plan.message,
        data: { ingredient_count: plan.inUse }
      });
    }

    let moved = 0;
    await sequelize.transaction(async (t) => {
      if (plan.target !== null) {
        const [n] = await Ingredient.update(
          { ingredient_category_id: plan.target },
          { where: { ingredient_category_id: category_id }, transaction: t }
        );
        moved = n;
      }
      await category.destroy({ transaction: t });
    });

    res.json({
      success: true,
      data: { moved, moved_to_category_id: plan.target },
      message: moved > 0 ? `Category deleted. ${moved} ingredient(s) moved.` : 'Category deleted'
    });
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
  return brandCategoryWriteStopped(req, res);
  // eslint-disable-next-line no-unreachable
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
router.get('/restaurants/:restaurantId/ingredient-categories', authenticateToken, checkRestaurantAccess, async (req, res) => {
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
router.post('/restaurants/:restaurantId/ingredient-categories', authenticateToken, checkRestaurantAccess, async (req, res) => {
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
router.put('/restaurants/:restaurantId/ingredient-categories/:categoryId', authenticateToken, checkRestaurantAccess, async (req, res) => {
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
router.delete('/restaurants/:restaurantId/ingredient-categories/:categoryId', authenticateToken, checkRestaurantAccess, async (req, res) => {
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

    // 옮길 수 있는 곳 = 이 매장의 다른 카테고리 + 이 매장이 속한 브랜드의 활성 카테고리.
    // 브랜드 것을 포함하는 이유: Irene 「브랜드에서 제대로 넘어온 카테고리로 보내려고 해」(2026-09-16).
    // 화면이 이미 두 목록을 함께 보여주므로(own_categories + brand_categories) 범위를 그대로 맞춘다.
    const own = await IngredientCategory.findAll({
      where: { restaurant_id, owner_type: 'restaurant' }, attributes: ['id']
    });
    const allowedIds = new Set(own.map((c) => c.id));
    const rest = await Restaurant.findByPk(restaurant_id, { attributes: ['brand_id'] });
    if (rest && rest.brand_id) {
      const brandCats = await IngredientCategory.findAll({
        where: { brand_id: rest.brand_id, owner_type: 'brand', is_active: true }, attributes: ['id']
      });
      brandCats.forEach((c) => allowedIds.add(c.id));
    }

    const plan = await resolveReassign({
      categoryId: category_id,
      reassignTo: req.body && req.body.reassign_to_category_id,
      allowedIds
    });
    if (!plan.ok) {
      return res.status(plan.status).json({
        success: false, code: plan.code, message: plan.message,
        data: { ingredient_count: plan.inUse }
      });
    }

    let moved = 0;
    await sequelize.transaction(async (t) => {
      if (plan.target !== null) {
        const [n] = await Ingredient.update(
          { ingredient_category_id: plan.target },
          { where: { ingredient_category_id: category_id }, transaction: t }
        );
        moved = n;
      }
      await category.destroy({ transaction: t });
    });

    res.json({
      success: true,
      data: { moved, moved_to_category_id: plan.target },
      message: moved > 0 ? `Category deleted. ${moved} ingredient(s) moved.` : 'Category deleted'
    });
  } catch (error) {
    console.error('Delete restaurant ingredient category error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete category', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;
