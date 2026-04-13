const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireBrandScope, applyBrandFilter, assertBrandOwnsRow } = require('../middleware/brandScope');
const { ProductRecipeCategory, ProductRecipe } = require('../models');

router.use(authenticateToken);
router.use(requireBrandScope());

// ==================== 프로덕트 레시피 카테고리 CRUD ====================

// 목록 조회
router.get('/', async (req, res) => {
  try {
    const { is_active } = req.query;

    const where = {};
    applyBrandFilter(where, req);
    if (is_active !== undefined) where.is_active = is_active === 'true';

    const categories = await ProductRecipeCategory.findAll({
      where,
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const recipeCount = await ProductRecipe.count({ where: { category_id: cat.id } });
        return {
          ...cat.toJSON(),
          recipe_count: recipeCount
        };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCount
    });
  } catch (error) {
    console.error('Error fetching product recipe categories:', error);
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
      return res.status(400).json({
        success: false,
        error: 'categoryIds must be an array'
      });
    }

    const where = {};
    applyBrandFilter(where, req);

    await Promise.all(
      categoryIds.map((id, index) =>
        ProductRecipeCategory.update(
          { display_order: index },
          { where: { id, ...where } }
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
    const category = await ProductRecipeCategory.findByPk(req.params.id);
    if (!assertBrandOwnsRow(category, req, res)) return;

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Error fetching product recipe category:', error);
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

    let brandId = req.body.brand_id != null ? parseInt(req.body.brand_id, 10) : req.brandScope.brandId;
    if (brandId == null && !req.brandScope.isAdmin && req.brandScope.ownedBrandIds?.length === 1) {
      brandId = req.brandScope.ownedBrandIds[0];
    }
    if (brandId == null) {
      return res.status(400).json({ success: false, message: 'brand_id required' });
    }
    if (!req.brandScope.isAdmin && !req.brandScope.ownedBrandIds.includes(brandId)) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    const maxOrder = await ProductRecipeCategory.max('display_order', {
      where: { brand_id: brandId }
    }) || 0;

    const category = await ProductRecipeCategory.create({
      brand_id: brandId,
      name,
      description,
      emoji,
      display_order: maxOrder + 1,
      is_active: true
    });

    res.status(201).json({
      success: true,
      data: category,
      message: 'Product recipe category created successfully'
    });
  } catch (error) {
    console.error('Error creating product recipe category:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const category = await ProductRecipeCategory.findByPk(req.params.id);
    if (!assertBrandOwnsRow(category, req, res)) return;

    const { name, description, emoji, is_active } = req.body;

    await category.update({
      name, description, emoji, is_active
    });

    res.json({
      success: true,
      data: category,
      message: 'Product recipe category updated successfully'
    });
  } catch (error) {
    console.error('Error updating product recipe category:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const category = await ProductRecipeCategory.findByPk(req.params.id);
    if (!assertBrandOwnsRow(category, req, res)) return;

    const recipeCount = await ProductRecipe.count({ where: { category_id: category.id } });
    if (recipeCount > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete category. ${recipeCount} recipe(s) are using this category.`
      });
    }

    await category.destroy();

    res.json({
      success: true,
      message: 'Product recipe category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product recipe category:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
