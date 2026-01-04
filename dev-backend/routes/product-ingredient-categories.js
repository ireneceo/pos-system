const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { ProductIngredientCategory, ProductIngredient } = require('../models');
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

// ==================== 프로덕트 재료 카테고리 CRUD ====================

// 목록 조회
router.get('/', async (req, res) => {
  try {
    const { is_active } = req.query;

    const where = {};
    if (is_active !== undefined) where.is_active = is_active === 'true';

    const categories = await ProductIngredientCategory.findAll({
      where,
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    // 각 카테고리별 재료 수 추가
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const ingredientCount = await ProductIngredient.count({ where: { category_id: cat.id } });
        return {
          ...cat.toJSON(),
          ingredient_count: ingredientCount
        };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCount
    });
  } catch (error) {
    console.error('Error fetching product ingredient categories:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const category = await ProductIngredientCategory.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Product ingredient category not found'
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching product ingredient category:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 생성
router.post('/', async (req, res) => {
  try {
    const { name, description, emoji } = req.body;

    // display_order 자동 설정
    const maxOrder = await ProductIngredientCategory.max('display_order') || 0;

    const category = await ProductIngredientCategory.create({
      name,
      description,
      emoji,
      display_order: maxOrder + 1,
      is_active: true
    });

    res.status(201).json({
      success: true,
      data: category,
      message: 'Product ingredient category created successfully'
    });
  } catch (error) {
    console.error('Error creating product ingredient category:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const category = await ProductIngredientCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Product ingredient category not found'
      });
    }

    const { name, description, emoji, is_active } = req.body;

    await category.update({
      name, description, emoji, is_active
    });

    res.json({
      success: true,
      data: category,
      message: 'Product ingredient category updated successfully'
    });
  } catch (error) {
    console.error('Error updating product ingredient category:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const category = await ProductIngredientCategory.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Product ingredient category not found'
      });
    }

    // 카테고리 사용 중인지 확인
    const ingredientCount = await ProductIngredient.count({ where: { category_id: category.id } });
    if (ingredientCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete category. ${ingredientCount} ingredient(s) are using this category.`
      });
    }

    await category.destroy();

    res.json({
      success: true,
      message: 'Product ingredient category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product ingredient category:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 순서 변경
router.put('/reorder', async (req, res) => {
  try {
    const { categoryIds } = req.body;

    if (!Array.isArray(categoryIds)) {
      return res.status(400).json({
        success: false,
        error: 'categoryIds must be an array'
      });
    }

    await Promise.all(
      categoryIds.map((id, index) =>
        ProductIngredientCategory.update(
          { display_order: index },
          { where: { id } }
        )
      )
    );

    res.json({
      success: true,
      message: 'Categories reordered successfully'
    });
  } catch (error) {
    console.error('Error reordering categories:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
