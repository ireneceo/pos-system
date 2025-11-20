const express = require('express');
const router = express.Router();
const { Ingredient } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { isBrandManager, isRestaurantManager } = require('../middleware/recipeAuth');

// ============================================
// Brand Ingredients
// ============================================

/**
 * GET /api/brands/:brand_id/ingredients
 * 브랜드 재료 목록 조회
 */
router.get('/brands/:brand_id/ingredients', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brand_id } = req.params;

    const ingredients = await Ingredient.findAll({
      where: { brand_id },
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get brand ingredients error:', error);
    res.status(500).json({ error: '재료 목록 조회 실패' });
  }
});

/**
 * POST /api/brands/:brand_id/ingredients
 * 브랜드 재료 생성
 */
router.post('/brands/:brand_id/ingredients', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brand_id } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.create({
      brand_id,
      restaurant_id: null,
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
 * PUT /api/brands/:brand_id/ingredients/:ingredient_id
 * 브랜드 재료 수정
 */
router.put('/brands/:brand_id/ingredients/:ingredient_id', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { ingredient_id } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    }

    await ingredient.update({
      code,
      name,
      category,
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
 * DELETE /api/brands/:brand_id/ingredients/:ingredient_id
 * 브랜드 재료 삭제
 */
router.delete('/brands/:brand_id/ingredients/:ingredient_id', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { ingredient_id } = req.params;

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
 * GET /api/restaurants/:restaurant_id/ingredients
 * 레스토랑 재료 목록 조회
 */
router.get('/restaurants/:restaurant_id/ingredients', authenticateToken, isRestaurantManager, async (req, res) => {
  try {
    const { restaurant_id } = req.params;

    const ingredients = await Ingredient.findAll({
      where: { restaurant_id },
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get restaurant ingredients error:', error);
    res.status(500).json({ error: '재료 목록 조회 실패' });
  }
});

/**
 * POST /api/restaurants/:restaurant_id/ingredients
 * 레스토랑 재료 생성
 */
router.post('/restaurants/:restaurant_id/ingredients', authenticateToken, isRestaurantManager, async (req, res) => {
  try {
    const { restaurant_id } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.create({
      brand_id: null,
      restaurant_id,
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
 * PUT /api/restaurants/:restaurant_id/ingredients/:ingredient_id
 * 레스토랑 재료 수정
 */
router.put('/restaurants/:restaurant_id/ingredients/:ingredient_id', authenticateToken, isRestaurantManager, async (req, res) => {
  try {
    const { ingredient_id } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock } = req.body;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    }

    await ingredient.update({
      code,
      name,
      category,
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
 * DELETE /api/restaurants/:restaurant_id/ingredients/:ingredient_id
 * 레스토랑 재료 삭제
 */
router.delete('/restaurants/:restaurant_id/ingredients/:ingredient_id', authenticateToken, isRestaurantManager, async (req, res) => {
  try {
    const { ingredient_id } = req.params;

    const ingredient = await Ingredient.findByPk(ingredient_id);
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
