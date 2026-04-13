const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { requireBrandScope, applyBrandFilter, assertBrandOwnsRow } = require('../middleware/brandScope');
const {
  ProductRecipe,
  ProductIngredient,
  ProductRecipeCategory,
  ProductRecipeIngredient,
  BrandProduct
} = require('../models');
const { Op } = require('sequelize');

router.use(authenticateToken);
router.use(requireBrandScope());

// ==================== 프로덕트 레시피 CRUD ====================

// 목록 조회
router.get('/', async (req, res) => {
  try {
    const { category_id, search, is_active } = req.query;

    const where = {};
    applyBrandFilter(where, req);
    if (category_id) where.category_id = category_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { code: { [Op.like]: `%${search}%` } }
      ];
    }

    const recipes = await ProductRecipe.findAll({
      where,
      include: [
        { model: ProductRecipeCategory, as: 'category' },
        {
          model: ProductRecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: ProductIngredient, as: 'ingredient' }]
        }
      ],
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: recipes
    });
  } catch (error) {
    console.error('Error fetching product recipes:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 단일 조회
router.get('/:id', async (req, res) => {
  try {
    const recipe = await ProductRecipe.findByPk(req.params.id, {
      include: [
        { model: ProductRecipeCategory, as: 'category' },
        {
          model: ProductRecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: ProductIngredient, as: 'ingredient' }]
        }
      ]
    });

    if (!assertBrandOwnsRow(recipe, req, res)) return;

    res.json({
      success: true,
      data: recipe
    });
  } catch (error) {
    console.error('Error fetching product recipe:', error);
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
      name, description, category_id, image, emoji,
      yield_amount, yield_unit,
      prep_time, cook_time, instructions, instructions_summary, instructions_detail,
      suggested_price, is_set_menu, set_items, option_groups,
      ingredients
    } = req.body;

    // Resolve target brand_id: explicit body > scope single brand
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

    // 코드 자동 생성 (브랜드 스코프 내 카운트)
    const scopedCount = await ProductRecipe.count({ where: { brand_id: brandId } });
    const code = `PR-${String(scopedCount + 1).padStart(3, '0')}`;

    const recipe = await ProductRecipe.create({
      brand_id: brandId,
      code,
      name,
      description,
      category_id,
      image,
      emoji,
      yield_amount: yield_amount || 1,
      yield_unit: yield_unit || 'portion',
      prep_time,
      cook_time,
      instructions,
      instructions_summary,
      instructions_detail,
      suggested_price,
      is_set_menu: is_set_menu || false,
      set_items,
      option_groups,
      is_active: true
    });

    // 재료 추가
    if (ingredients && ingredients.length > 0) {
      let totalCost = 0;
      for (const ing of ingredients) {
        // 프론트엔드에서 단위 변환을 고려한 cost가 전달됨
        const cost = ing.cost || 0;
        totalCost += cost;

        await ProductRecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: ing.ingredient_id,
          quantity: ing.quantity,
          unit: ing.unit,
          cost,
          notes: ing.notes
        });
      }
      await recipe.update({ total_ingredient_cost: totalCost });
    }

    // 생성된 레시피 다시 조회
    const createdRecipe = await ProductRecipe.findByPk(recipe.id, {
      include: [
        { model: ProductRecipeCategory, as: 'category' },
        {
          model: ProductRecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: ProductIngredient, as: 'ingredient' }]
        }
      ]
    });

    res.status(201).json({
      success: true,
      data: createdRecipe,
      message: 'Product recipe created successfully'
    });
  } catch (error) {
    console.error('Error creating product recipe:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 수정
router.put('/:id', async (req, res) => {
  try {
    const recipe = await ProductRecipe.findByPk(req.params.id);
    if (!assertBrandOwnsRow(recipe, req, res)) return;

    const {
      name, description, category_id, image, emoji,
      yield_amount, yield_unit,
      prep_time, cook_time, instructions, instructions_summary, instructions_detail,
      suggested_price, is_set_menu, set_items, option_groups, is_active,
      ingredients
    } = req.body;

    await recipe.update({
      name, description, category_id, image, emoji,
      yield_amount: yield_amount || recipe.yield_amount,
      yield_unit: yield_unit || recipe.yield_unit,
      prep_time, cook_time, instructions, instructions_summary, instructions_detail,
      suggested_price, is_set_menu, set_items, option_groups, is_active
    });

    // 재료 업데이트
    if (ingredients !== undefined) {
      await ProductRecipeIngredient.destroy({ where: { recipe_id: recipe.id } });

      let totalCost = 0;
      for (const ing of ingredients) {
        // 프론트엔드에서 단위 변환을 고려한 cost가 전달됨
        const cost = ing.cost || 0;
        totalCost += cost;

        await ProductRecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: ing.ingredient_id,
          quantity: ing.quantity,
          unit: ing.unit,
          cost,
          notes: ing.notes
        });
      }
      await recipe.update({ total_ingredient_cost: totalCost });
    }

    // 수정된 레시피 다시 조회
    const updatedRecipe = await ProductRecipe.findByPk(recipe.id, {
      include: [
        { model: ProductRecipeCategory, as: 'category' },
        {
          model: ProductRecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: ProductIngredient, as: 'ingredient' }]
        }
      ]
    });

    res.json({
      success: true,
      data: updatedRecipe,
      message: 'Product recipe updated successfully'
    });
  } catch (error) {
    console.error('Error updating product recipe:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 삭제
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await ProductRecipe.findByPk(req.params.id);
    if (!assertBrandOwnsRow(recipe, req, res)) return;

    // 연결된 BrandProduct 확인
    const linkedProducts = await BrandProduct.count({ where: { product_recipe_id: recipe.id } });
    if (linkedProducts > 0) {
      return res.status(400).json({
        success: false,
        error: `Cannot delete recipe. ${linkedProducts} product(s) are linked to this recipe.`
      });
    }

    // 레시피 재료 삭제
    await ProductRecipeIngredient.destroy({ where: { recipe_id: recipe.id } });
    await recipe.destroy();

    res.json({
      success: true,
      message: 'Product recipe deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product recipe:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 원가 재계산
router.post('/:id/recalculate-cost', async (req, res) => {
  try {
    const recipe = await ProductRecipe.findByPk(req.params.id, {
      include: [{
        model: ProductRecipeIngredient,
        as: 'recipeIngredients',
        include: [{ model: ProductIngredient, as: 'ingredient' }]
      }]
    });

    if (!assertBrandOwnsRow(recipe, req, res)) return;

    let totalCost = 0;
    for (const ri of recipe.recipeIngredients) {
      const cost = ri.ingredient ? ri.ingredient.unit_cost * ri.quantity : 0;
      await ri.update({ cost });
      totalCost += cost;
    }

    await recipe.update({ total_ingredient_cost: totalCost });

    res.json({
      success: true,
      data: { total_ingredient_cost: totalCost },
      message: 'Cost recalculated successfully'
    });
  } catch (error) {
    console.error('Error recalculating cost:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
