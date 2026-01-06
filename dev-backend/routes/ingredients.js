const express = require('express');
const router = express.Router();
const { Ingredient, IngredientCategory, Restaurant, Supplier } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');
const { generateIngredientCode } = require('../utils/codeGenerator');

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
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
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
    const brand_id = brandId;
    const { code, name, image_url, category, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    // Auto-generate code if not provided
    const finalCode = code || await generateIngredientCode(Ingredient, 'brand', brandId);

    const ingredient = await Ingredient.create({
      owner_type: 'brand',
      brand_id,
      restaurant_id: null,
      ingredient_category_id: ingredient_category_id || null,
      code: finalCode,
      name,
      image_url: image_url || null,
      category: 'other', // Use default - category is managed via ingredient_category_id
      unit,
      base_quantity: base_quantity || 1,
      unit_cost,
      supplier_name,
      supplier_id: supplier_id || null,
      min_stock: min_stock || 0,
      current_stock: 0,
      track_stock: track_stock || false
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create brand ingredient error:', error);
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

/**
 * PUT /api/brands/:brandId/ingredients/:ingredientId
 * 브랜드 재료 수정
 */
router.put('/brands/:brandId/ingredients/:ingredientId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient_id = ingredientId;
    const { code, name, image_url, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (ingredient_category_id !== undefined) updateData.ingredient_category_id = ingredient_category_id;
    if (unit !== undefined) updateData.unit = unit;
    if (base_quantity !== undefined) updateData.base_quantity = base_quantity;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    if (supplier_name !== undefined) updateData.supplier_name = supplier_name;
    if (supplier_id !== undefined) updateData.supplier_id = supplier_id;
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

    await ingredient.update(updateData);

    // Reload with associations for frontend display
    const updatedIngredient = await Ingredient.findByPk(ingredient_id, {
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
    });

    res.json({ success: true, data: updatedIngredient });
  } catch (error) {
    console.error('Update brand ingredient error:', error);
    res.status(500).json({ error: 'Failed to update ingredient' });
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
 * 레스토랑 자체 재료 목록 조회 (owner_type = 'restaurant')
 */
router.get('/restaurants/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const ingredients = await Ingredient.findAll({
      where: {
        restaurant_id: restaurantId,
        owner_type: 'restaurant'
      },
      order: [['name', 'ASC']],
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
    });

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get restaurant ingredients error:', error);
    res.status(500).json({ error: '재료 목록 조회 실패' });
  }
});

/**
 * GET /api/restaurants/:restaurantId/brand-ingredients
 * 레스토랑이 속한 브랜드의 재료 조회 (읽기 전용)
 */
router.get('/restaurants/:restaurantId/brand-ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // 브랜드에 속하지 않은 레스토랑
    if (!restaurant.brand_id) {
      return res.json({ success: true, data: [] });
    }

    // 브랜드 재료 조회 (owner_type = 'brand')
    const brandIngredients = await Ingredient.findAll({
      where: {
        brand_id: restaurant.brand_id,
        owner_type: 'brand'
      },
      order: [['name', 'ASC']],
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
    });

    res.json({ success: true, data: brandIngredients });
  } catch (error) {
    console.error('Get brand ingredients for restaurant error:', error);
    res.status(500).json({ error: 'Failed to fetch brand ingredients' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/ingredients
 * 레스토랑 재료 생성
 */
router.post('/restaurants/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { code, name, image_url, category, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    // Auto-generate code if not provided
    const finalCode = code || await generateIngredientCode(Ingredient, 'restaurant', restaurantId);

    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      ingredient_category_id: ingredient_category_id || null,
      code: finalCode,
      name,
      image_url: image_url || null,
      category,
      unit,
      base_quantity: base_quantity || 1,
      unit_cost,
      supplier_name,
      supplier_id: supplier_id || null,
      min_stock: min_stock || 0,
      current_stock: 0,
      track_stock: track_stock || false
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/ingredients/:ingredientId
 * 레스토랑 재료 수정
 */
router.put('/restaurants/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const { code, name, image_url, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    console.log('[DEBUG] PUT restaurant ingredient - ingredientId:', ingredientId, 'body:', req.body);

    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (ingredient_category_id !== undefined) updateData.ingredient_category_id = ingredient_category_id;
    if (unit !== undefined) updateData.unit = unit;
    if (base_quantity !== undefined) updateData.base_quantity = base_quantity;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    if (supplier_name !== undefined) updateData.supplier_name = supplier_name;
    if (supplier_id !== undefined) updateData.supplier_id = supplier_id;
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

    console.log('[DEBUG] updateData:', updateData);
    await ingredient.update(updateData);
    console.log('[DEBUG] After update - track_stock:', ingredient.track_stock);

    // Reload with associations for frontend display
    const updatedIngredient = await Ingredient.findByPk(ingredientId, {
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
    });

    res.json({ success: true, data: updatedIngredient });
  } catch (error) {
    console.error('Update restaurant ingredient error:', error);
    res.status(500).json({ error: 'Failed to update ingredient' });
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
