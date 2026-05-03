const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireBGScope, applyBGFilter, assertBGOwnsRow } = require('../middleware/brandScope');
const { ProductIngredientCategory, ProductIngredient } = require('../models');

router.use(authenticateToken);
router.use(requireBGScope);

// ==================== 프로덕트 재료 카테고리 CRUD ====================

// 목록 조회
router.get('/', async (req, res) => {
  try {
    const { is_active } = req.query;

    const where = {};
    applyBGFilter(where, req);
    if (is_active !== undefined) where.is_active = is_active === 'true';

    const categories = await ProductIngredientCategory.findAll({
      where,
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

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

// 순서 변경 (must come before /:id)
router.put('/reorder', async (req, res) => {
  try {
    const { categoryIds } = req.body;

    if (!Array.isArray(categoryIds)) {
      return res.status(400).json({ success: false, error: { message: 'categoryIds must be an array', code: 'VALIDATION_ERROR' } });
    }

    const scopedWhere = req.bgOwnerIsAdmin && req.bgOwnerId == null
      ? {}
      : { owner_user_id: req.bgOwnerId };

    await Promise.all(
      categoryIds.map((id, index) =>
        ProductIngredientCategory.update(
          { display_order: index },
          { where: { id, ...scopedWhere } }
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

// 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const category = await ProductIngredientCategory.findByPk(req.params.id);
    if (!assertBGOwnsRow(category, req, res)) return;

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

    if (req.bgOwnerId == null) {
      return res.status(400).json({ success: false, message: 'owner_user_id required' });
    }

    // display_order 자동 설정 (BG 스코프 내 max)
    const maxOrder = await ProductIngredientCategory.max('display_order', {
      where: { owner_user_id: req.bgOwnerId }
    }) || 0;

    const category = await ProductIngredientCategory.create({
      owner_user_id: req.bgOwnerId,
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
    if (!assertBGOwnsRow(category, req, res)) return;

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
    if (!assertBGOwnsRow(category, req, res)) return;

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

module.exports = router;
