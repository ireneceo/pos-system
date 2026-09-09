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
const { resolveLineCost } = require('../utils/recipeCost');

router.use(authenticateToken);
router.use(requireBrandScope());

// ==================== 프로덕트 레시피 CRUD ====================

/**
 * 프로덕트 레시피 줄이 가리키는 **재고아이템(Stock Item)** 을 한 번에 읽는다.
 * 원가는 여기서 나온다 — Irene 2026-09-09: "재고아이템 가져다가 계산해야지."
 */
async function loadStockItemMap(items) {
  const ids = [...new Set((items || []).map(i => parseInt(i.ingredient_id, 10)).filter(Number.isFinite))];
  if (!ids.length) return new Map();
  const rows = await ProductIngredient.findAll({ where: { id: { [Op.in]: ids } } });
  return new Map(rows.map(r => [r.id, r]));
}

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

    // 채번 단일 소스(원자 카운터) — `count + 1` 은 지운 번호를 재사용한다(2026-09-06).
    const { generateCode, codeTakenResponse } = require('../utils/codeGenerator');
    const takenPR = await codeTakenResponse(ProductRecipe, req.body?.code, { brand_id: brandId });
    if (takenPR) return res.status(takenPR.status).json(takenPR.body);
    const code = req.body?.code || await generateCode(ProductRecipe, 'PR', { whereClause: { brand_id: brandId } });

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

    // 재료 추가 — **원가는 서버가 재고아이템 단가에서 계산한다**(2026-09-09 Irene 지시).
    //   예전엔 화면이 보낸 값을 그대로 저장해, 화면이 재료를 못 찾으면 0 이 박혔다.
    if (ingredients && ingredients.length > 0) {
      const stockMap = await loadStockItemMap(ingredients);
      let totalCost = 0;
      for (const ing of ingredients) {
        const cost = resolveLineCost(stockMap.get(parseInt(ing.ingredient_id, 10)), ing, null);
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

    // 재료 업데이트 — 원가는 서버가 재고아이템 단가에서 계산한다.
    if (ingredients !== undefined) {
      // 지우기 전에 저장돼 있던 원가를 들고 있는다 — 마지막 폴백(0 으로 덮지 않기).
      const prevRows = await ProductRecipeIngredient.findAll({ where: { recipe_id: recipe.id } });
      const prevCostByIngredient = new Map(prevRows.map(r => [r.ingredient_id, r.cost]));
      await ProductRecipeIngredient.destroy({ where: { recipe_id: recipe.id } });

      const stockMap = await loadStockItemMap(ingredients);
      let totalCost = 0;
      for (const ing of ingredients) {
        const ingId = parseInt(ing.ingredient_id, 10);
        const cost = resolveLineCost(stockMap.get(ingId), ing, prevCostByIngredient.get(ingId));
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

    // ⚠ 이 식이 저장·표시와 달랐다 — `unit_cost × quantity` 로 **base_quantity 를 안 나누고
    //   단위 환산도 없었다**(2000g 짜리 재고아이템이면 값이 2000배). 단일 소스로 통일한다.
    let totalCost = 0;
    for (const ri of recipe.recipeIngredients) {
      const cost = resolveLineCost(ri.ingredient, { quantity: ri.quantity, unit: ri.unit, cost: ri.cost }, ri.cost);
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
