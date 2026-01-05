const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  ProductIngredient,
  ProductIngredientCategory,
  ProductRecipeIngredient
} = require('../models');
const { Op } = require('sequelize');

// 인증 필수
router.use(authenticateToken);

// Brand General/Manager 권한 체크
const checkBrandAccess = (req, res, next) => {
  const userRole = req.user.role;
  if (!['Brand General', 'Brand Manager', 'System Admin'].includes(userRole)) {
    return res.status(403).json({
      success: false,
      error: 'Access denied. Brand General/Manager role required.'
    });
  }
  next();
};

router.use(checkBrandAccess);

// ==================== 프로덕트 재료 CRUD ====================

// 목록 조회
router.get('/', async (req, res) => {
  try {
    const { category_id, search, is_active, track_stock } = req.query;

    const where = {};
    if (category_id) where.category_id = category_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (track_stock !== undefined) where.track_stock = track_stock === 'true';
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } }
      ];
    }

    const ingredients = await ProductIngredient.findAll({
      where,
      include: [
        { model: ProductIngredientCategory, as: 'category' }
      ],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: ingredients
    });
  } catch (error) {
    console.error('Error fetching product ingredients:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id, {
      include: [
        { model: ProductIngredientCategory, as: 'category' }
      ]
    });

    if (!ingredient) {
      return res.status(404).json({
        success: false,
        error: 'Product ingredient not found'
      });
    }

    res.json({
      success: true,
      data: ingredient
    });
  } catch (error) {
    console.error('Error fetching product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 생성
router.post('/', async (req, res) => {
  try {
    const {
      name, category_id, image_url, unit, base_quantity,
      unit_cost, supplier_name, supplier_id,
      min_stock, min_order, current_stock,
      lead_time_days, safety_stock_percent,
      manual_daily_usage, track_stock
    } = req.body;

    // 코드 자동 생성
    const count = await ProductIngredient.count();
    const code = `PI-${String(count + 1).padStart(3, '0')}`;

    const ingredient = await ProductIngredient.create({
      code,
      name,
      category_id,
      image_url,
      unit,
      base_quantity: base_quantity || 1,
      unit_cost: unit_cost || 0,
      supplier_name,
      supplier_id,
      min_stock: min_stock || 0,
      min_order: min_order || 0,
      current_stock: current_stock || 0,
      lead_time_days: lead_time_days || 1,
      safety_stock_percent: safety_stock_percent || 20,
      manual_daily_usage,
      track_stock: track_stock !== false,
      is_active: true
    });

    const createdIngredient = await ProductIngredient.findByPk(ingredient.id, {
      include: [{ model: ProductIngredientCategory, as: 'category' }]
    });

    res.status(201).json({
      success: true,
      data: createdIngredient,
      message: 'Product ingredient created successfully'
    });
  } catch (error) {
    console.error('Error creating product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id);
    if (!ingredient) {
      return res.status(404).json({
        success: false,
        error: 'Product ingredient not found'
      });
    }

    const {
      name, category_id, image_url, unit, base_quantity,
      unit_cost, supplier_name, supplier_id,
      min_stock, min_order, current_stock,
      lead_time_days, safety_stock_percent,
      manual_daily_usage, track_stock, is_active
    } = req.body;

    await ingredient.update({
      name, category_id, image_url, unit, base_quantity,
      unit_cost, supplier_name, supplier_id,
      min_stock, min_order, current_stock,
      lead_time_days, safety_stock_percent,
      manual_daily_usage, track_stock, is_active
    });

    const updatedIngredient = await ProductIngredient.findByPk(ingredient.id, {
      include: [{ model: ProductIngredientCategory, as: 'category' }]
    });

    res.json({
      success: true,
      data: updatedIngredient,
      message: 'Product ingredient updated successfully'
    });
  } catch (error) {
    console.error('Error updating product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id);
    if (!ingredient) {
      return res.status(404).json({
        success: false,
        error: 'Product ingredient not found'
      });
    }

    // 레시피에서 사용 중인지 확인
    const usageCount = await ProductRecipeIngredient.count({
      where: { ingredient_id: ingredient.id }
    });
    if (usageCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete ingredient. It is used in ${usageCount} recipe(s).`
      });
    }

    await ingredient.destroy();

    res.json({
      success: true,
      message: 'Product ingredient deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product ingredient:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 재고 조정
router.post('/:id/adjust-stock', async (req, res) => {
  try {
    const ingredient = await ProductIngredient.findByPk(req.params.id);
    if (!ingredient) {
      return res.status(404).json({
        success: false,
        error: 'Product ingredient not found'
      });
    }

    const { adjustment, reason } = req.body;
    const newStock = parseFloat(ingredient.current_stock) + parseFloat(adjustment);

    await ingredient.update({
      current_stock: Math.max(0, newStock)
    });

    res.json({
      success: true,
      data: {
        previous_stock: ingredient.current_stock,
        adjustment,
        new_stock: newStock,
        reason
      },
      message: 'Stock adjusted successfully'
    });
  } catch (error) {
    console.error('Error adjusting stock:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
