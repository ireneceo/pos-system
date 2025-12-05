const express = require('express');
const router = express.Router();
const { Ingredient, IngredientCategory } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');

// ============================================
// Brand Ingredients
// ============================================

/**
 * GET /api/brands/:brandId/ingredients
 * 브랜드 재료 목록 조회
 */
router.get('/brands/:brandId/ingredients', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용

    const ingredients = await Ingredient.findAll({
      where: { brand_id },
      order: [['name', 'ASC']],
      include: [{
        model: IngredientCategory,
        as: 'ingredientCategory',
        attributes: ['id', 'name', 'emoji']
      }]
    });

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get brand ingredients error:', error);
    res.status(500).json({ error: '재료 목록 조회 실패' });
  }
});

/**
 * POST /api/brands/:brandId/ingredients
 * 브랜드 재료 생성
 */
router.post('/brands/:brandId/ingredients', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const { code, name, category, ingredient_category_id, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.create({
      brand_id,
      restaurant_id: null,
      ingredient_category_id: ingredient_category_id || null,
      code,
      name,
      category,
      unit,
      unit_cost,
      supplier_name,
      min_stock: min_stock || 0,
      current_stock: 0
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create brand ingredient error:', error);
    res.status(500).json({ error: '재료 생성 실패' });
  }
});

/**
 * PUT /api/brands/:brandId/ingredients/:ingredientId
 * 브랜드 재료 수정
 */
router.put('/brands/:brandId/ingredients/:ingredientId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient_id = ingredientId; // DB 쿼리용
    const { code, name, category, ingredient_category_id, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    }

    await ingredient.update({
      code,
      name,
      category,
      ingredient_category_id: ingredient_category_id !== undefined ? ingredient_category_id : ingredient.ingredient_category_id,
      unit,
      unit_cost,
      supplier_name,
      min_stock
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Update brand ingredient error:', error);
    res.status(500).json({ error: '재료 수정 실패' });
  }
});

/**
 * DELETE /api/brands/:brandId/ingredients/:ingredientId
 * 브랜드 재료 삭제
 */
router.delete('/brands/:brandId/ingredients/:ingredientId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient_id = ingredientId; // DB 쿼리용

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    }

    await ingredient.destroy();

    res.json({ success: true, message: '재료가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand ingredient error:', error);
    res.status(500).json({ error: '재료 삭제 실패' });
  }
});

// ============================================
// Restaurant Ingredients
// ============================================

/**
 * GET /api/restaurants/:restaurantId/ingredients
 * 레스토랑 재료 목록 조회
 */
router.get('/restaurants/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const ingredients = await Ingredient.findAll({
      where: { restaurant_id: restaurantId },
      order: [['name', 'ASC']],
      include: [{
        model: IngredientCategory,
        as: 'ingredientCategory',
        attributes: ['id', 'name', 'emoji']
      }]
    });

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get restaurant ingredients error:', error);
    res.status(500).json({ error: '재료 목록 조회 실패' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/ingredients
 * 레스토랑 재료 생성
 */
router.post('/restaurants/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { code, name, category, ingredient_category_id, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.create({
      brand_id: null,
      restaurant_id: restaurantId,
      ingredient_category_id: ingredient_category_id || null,
      code,
      name,
      category,
      unit,
      unit_cost,
      supplier_name,
      min_stock: min_stock || 0,
      current_stock: 0
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 생성 실패' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/ingredients/:ingredientId
 * 레스토랑 재료 수정
 */
router.put('/restaurants/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const { code, name, category, ingredient_category_id, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) {
      return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    }

    await ingredient.update({
      code,
      name,
      category,
      ingredient_category_id: ingredient_category_id !== undefined ? ingredient_category_id : ingredient.ingredient_category_id,
      unit,
      unit_cost,
      supplier_name,
      min_stock
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Update restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 수정 실패' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/ingredients/:ingredientId
 * 레스토랑 재료 삭제
 */
router.delete('/restaurants/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;

    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) {
      return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    }

    await ingredient.destroy();

    res.json({ success: true, message: '재료가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 삭제 실패' });
  }
});

module.exports = router;
