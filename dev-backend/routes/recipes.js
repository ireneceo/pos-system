const express = require('express');
const router = express.Router();
const { Recipe, Ingredient, RecipeIngredient, Restaurant, Product, RecipeCategory, Category, RestaurantIngredientCost } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { canEditRecipe, isBrandManager } = require('../middleware/recipeAuth');
const { generateRecipeCode } = require('../utils/codeGenerator');
const { deleteOldImages } = require('../utils/imageProcessor');

// ============================================
// Brand Recipes (Brand General/Manager)
// ============================================

/**
 * GET /api/brands/:brandId/recipes
 * 브랜드 레시피 목록 조회
 */
router.get('/brands/:brandId/recipes', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용

    const recipes = await Recipe.findAll({
      where: { brand_id },
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory'
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ success: true, data: recipes });
  } catch (error) {
    console.error('Get brand recipes error:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * POST /api/brands/:brandId/recipes
 * 브랜드 레시피 생성
 */
router.post('/brands/:brandId/recipes', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand_id = brandId; // DB 쿼리용
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;

    // 필수 필드 검증
    if (!name || !name.trim()) {
      return res.status(400).json({ error: '레시피 이름은 필수입니다' });
    }

    // Auto-generate code if not provided
    const finalCode = req.body.code || await generateRecipeCode(Recipe, 'brand', brandId);

    // 레시피 생성 (owner_type = 'brand')
    const recipe = await Recipe.create({
      owner_type: 'brand',
      brand_id,
      restaurant_id: null,
      code: finalCode,
      name: name.trim(),
      description: description || null,
      category: category || null,
      recipe_category_id: recipe_category_id || null,
      emoji: emoji || null,
      image: image || null,
      option_groups: option_groups || null,
      yield_amount: yield_amount || 1,
      yield_unit: yield_unit || 'portion',
      prep_time: prep_time ? parseInt(prep_time) : null,
      cook_time: cook_time ? parseInt(cook_time) : null,
      instructions: instructions || null,
      instructions_summary: instructions_summary || null,
      instructions_detail: instructions_detail || null,
      suggested_price: suggested_price ? parseFloat(suggested_price) : 0,
      total_ingredient_cost: 0
    });

    // 재료 추가 및 원가 계산
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const item of ingredients) {
        // 프론트엔드에서 단위 변환을 고려한 cost가 전달됨
        const cost = item.cost || 0;
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }
    }

    // 총 원가 업데이트
    await recipe.update({ total_ingredient_cost: totalCost });

    // 재료 포함해서 다시 조회
    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory'
        }
      ]
    });

    res.json({ success: true, data: createdRecipe });
  } catch (error) {
    console.error('Create brand recipe error:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

/**
 * PUT /api/brands/:brandId/recipes/:recipeId
 * 브랜드 레시피 수정
 */
router.put('/brands/:brandId/recipes/:recipeId', authenticateToken, canEditRecipe, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe_id = recipeId; // DB 쿼리용
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // 기본 정보 업데이트 (빈 문자열은 null로 처리)
    const updateData = {};
    if (name !== undefined) updateData.name = name || recipe.name;
    if (description !== undefined) updateData.description = description || null;
    if (category !== undefined) updateData.category = category || null;
    if (recipe_category_id !== undefined) updateData.recipe_category_id = recipe_category_id || null;
    if (emoji !== undefined) updateData.emoji = emoji || null;
    if (image !== undefined) {
      if (image && recipe.image && image !== recipe.image) {
        await deleteOldImages(recipe.image);
      }
      updateData.image = image || null;
    }
    if (option_groups !== undefined) updateData.option_groups = option_groups || null;
    if (yield_amount !== undefined) updateData.yield_amount = yield_amount || 1;
    if (yield_unit !== undefined) updateData.yield_unit = yield_unit || 'portion';
    if (prep_time !== undefined) updateData.prep_time = prep_time ? parseInt(prep_time) : null;
    if (cook_time !== undefined) updateData.cook_time = cook_time ? parseInt(cook_time) : null;
    if (instructions !== undefined) updateData.instructions = instructions || null;
    if (instructions_summary !== undefined) updateData.instructions_summary = instructions_summary || null;
    if (instructions_detail !== undefined) updateData.instructions_detail = instructions_detail || null;
    if (suggested_price !== undefined) updateData.suggested_price = suggested_price ? parseFloat(suggested_price) : 0;

    await recipe.update(updateData);

    // 재료 업데이트 (기존 삭제 후 재생성)
    if (ingredients) {
      await RecipeIngredient.destroy({ where: { recipe_id } });

      let totalCost = 0;
      for (const item of ingredients) {
        // 프론트엔드에서 단위 변환을 고려한 cost가 전달됨
        const cost = item.cost || 0;
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }

      await recipe.update({ total_ingredient_cost: totalCost });
    }

    // 재료 포함해서 다시 조회
    const updatedRecipe = await Recipe.findByPk(recipe_id, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory'
        }
      ]
    });

    res.json({ success: true, data: updatedRecipe });
  } catch (error) {
    console.error('Update brand recipe error:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

/**
 * DELETE /api/brands/:brandId/recipes/:recipeId
 * 브랜드 레시피 삭제
 */
router.delete('/brands/:brandId/recipes/:recipeId', authenticateToken, canEditRecipe, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe_id = recipeId; // DB 쿼리용

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    await recipe.destroy();

    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete brand recipe error:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// ============================================
// Restaurant Recipes (Restaurant Admin)
// ============================================

/**
 * GET /api/restaurants/:restaurantId/recipes
 * 레스토랑 자체 레시피만 조회 (owner_type = 'restaurant')
 * 브랜드 레시피는 별도 API로 조회
 */
router.get('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // 레스토랑 자체 레시피만 조회 (owner_type = 'restaurant')
    const recipes = await Recipe.findAll({
      where: {
        restaurant_id: restaurantId,
        owner_type: 'restaurant'
      },
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory'
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ success: true, data: recipes });
  } catch (error) {
    console.error('Get restaurant recipes error:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * GET /api/restaurants/:restaurantId/brand-recipes
 * 레스토랑이 속한 브랜드의 레시피 조회 (읽기 전용)
 */
router.get('/restaurants/:restaurantId/brand-recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
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

    // 브랜드 레시피 조회 (owner_type = 'brand')
    const brandRecipes = await Recipe.findAll({
      where: {
        brand_id: restaurant.brand_id,
        owner_type: 'brand'
      },
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        },
        {
          model: RecipeCategory,
          as: 'recipeCategory'
        }
      ],
      order: [['created_at', 'DESC']]
    });

    // 레스토랑 코스트 오버라이드 조회
    const restaurantCosts = await RestaurantIngredientCost.findAll({
      where: { restaurant_id: restaurantId }
    });
    const costMap = {};
    restaurantCosts.forEach(rc => {
      costMap[rc.ingredient_id] = parseFloat(rc.unit_cost);
    });

    // 각 레시피에 restaurant 기준 원가 계산
    const enrichedRecipes = brandRecipes.map(recipe => {
      const plain = recipe.toJSON();
      let restaurantTotalCost = 0;
      let hasAnyOverride = false;

      if (plain.recipeIngredients) {
        plain.recipeIngredients = plain.recipeIngredients.map(ri => {
          const brandUnitCost = ri.ingredient ? parseFloat(ri.ingredient.unit_cost) : 0;
          const baseQty = ri.ingredient ? parseFloat(ri.ingredient.base_quantity) || 1 : 1;
          const override = costMap[ri.ingredient_id];
          const effectiveUnitCost = override !== undefined ? override : brandUnitCost;
          const effectiveCostPerBase = effectiveUnitCost / baseQty;
          const qty = parseFloat(ri.quantity) || 0;
          const effectiveCost = qty * effectiveCostPerBase;
          const brandCost = qty * (brandUnitCost / baseQty);

          if (override !== undefined) hasAnyOverride = true;
          restaurantTotalCost += effectiveCost;

          ri.brand_cost = brandCost;
          ri.effective_cost = effectiveCost;
          if (ri.ingredient) {
            ri.ingredient.restaurant_cost = override !== undefined ? override : null;
            ri.ingredient.effective_cost = effectiveUnitCost;
          }
          return ri;
        });
      }

      plain.restaurant_ingredient_cost = hasAnyOverride ? restaurantTotalCost : null;
      plain.effective_ingredient_cost = restaurantTotalCost;
      return plain;
    });

    res.json({ success: true, data: enrichedRecipes });
  } catch (error) {
    console.error('Get brand recipes for restaurant error:', error);
    res.status(500).json({ error: 'Failed to fetch brand recipes' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/recipes
 * 레스토랑 레시피 생성 (모든 레스토랑 가능)
 */
router.post('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;

    // 필수 필드 검증
    if (!name || !name.trim()) {
      return res.status(400).json({ error: '레시피 이름은 필수입니다' });
    }

    // Auto-generate code if not provided
    const finalCode = req.body.code || await generateRecipeCode(Recipe, 'restaurant', restaurantId);

    // 레시피 생성 (owner_type = 'restaurant')
    const recipe = await Recipe.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      code: finalCode,
      name: name.trim(),
      description: description || null,
      category: category || null,
      recipe_category_id: recipe_category_id || null,
      emoji: emoji || null,
      image: image || null,
      option_groups: option_groups || null,
      yield_amount: yield_amount || 1,
      yield_unit: yield_unit || 'portion',
      prep_time: prep_time ? parseInt(prep_time) : null,
      cook_time: cook_time ? parseInt(cook_time) : null,
      instructions: instructions || null,
      instructions_summary: instructions_summary || null,
      instructions_detail: instructions_detail || null,
      suggested_price: suggested_price ? parseFloat(suggested_price) : 0,
      total_ingredient_cost: 0
    });

    // 재료 추가 및 원가 계산
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const item of ingredients) {
        // 프론트엔드에서 단위 변환을 고려한 cost가 전달됨
        const cost = item.cost || 0;
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }
    }

    await recipe.update({ total_ingredient_cost: totalCost });

    const createdRecipe = await Recipe.findByPk(recipe.id, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        }
      ]
    });

    res.json({ success: true, data: createdRecipe });
  } catch (error) {
    console.error('Create restaurant recipe error:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/recipes/:recipeId
 * 레스토랑 레시피 수정 (자신의 레시피만)
 */
router.put('/restaurants/:restaurantId/recipes/:recipeId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, recipeId } = req.params;

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // 자신의 레시피인지 확인 (owner_type이 'restaurant'이고 restaurant_id가 일치해야 함)
    if (recipe.owner_type !== 'restaurant' || recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ error: 'You can only edit your own restaurant recipes' });
    }

    const { name, description, category, emoji, image, option_groups, ingredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;

    // 이미지 변경 시 이전 파일 삭제
    if (image && recipe.image && image !== recipe.image) {
      await deleteOldImages(recipe.image);
    }

    // 기본 정보 업데이트
    await recipe.update({
      name,
      description,
      category,
      emoji,
      image,
      option_groups,
      yield_amount: yield_amount || recipe.yield_amount,
      yield_unit: yield_unit || recipe.yield_unit,
      prep_time,
      cook_time,
      instructions,
      instructions_summary,
      instructions_detail,
      suggested_price
    });

    // 재료 업데이트 (기존 삭제 후 재생성)
    if (ingredients) {
      await RecipeIngredient.destroy({ where: { recipe_id: recipeId } });

      let totalCost = 0;
      for (const item of ingredients) {
        // 프론트엔드에서 단위 변환을 고려한 cost가 전달됨
        const cost = item.cost || 0;
        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: item.ingredient_id,
          quantity: item.quantity,
          unit: item.unit,
          cost,
          notes: item.notes || null
        });
        totalCost += cost;
      }

      await recipe.update({ total_ingredient_cost: totalCost });
    }

    // 재료 포함해서 다시 조회
    const updatedRecipe = await Recipe.findByPk(recipeId, {
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        }
      ]
    });

    res.json({ success: true, data: updatedRecipe });
  } catch (error) {
    console.error('Update restaurant recipe error:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/recipes/:recipeId
 * 레스토랑 레시피 삭제 (자신의 레시피만)
 */
router.delete('/restaurants/:restaurantId/recipes/:recipeId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, recipeId } = req.params;

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // 자신의 레시피인지 확인 (owner_type이 'restaurant'이고 restaurant_id가 일치해야 함)
    if (recipe.owner_type !== 'restaurant' || recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ error: 'You can only delete your own restaurant recipes' });
    }

    await recipe.destroy();

    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete restaurant recipe error:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/products/create-from-recipe
 * 레시피를 메뉴로 등록
 */
router.post('/restaurants/:restaurantId/products/create-from-recipe', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { recipe_id, price } = req.body;

    // 레시피와 카테고리 정보를 함께 조회
    const recipe = await Recipe.findByPk(recipe_id, {
      include: [{
        model: RecipeCategory,
        as: 'recipeCategory'
      }]
    });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // 레시피 카테고리가 있으면 메뉴 카테고리로 매핑
    let categoryName = recipe.category; // 기본값: 기존 category 문자열

    if (recipe.recipeCategory) {
      const recipeCategoryName = recipe.recipeCategory.name;

      // 해당 레스토랑에 동일한 이름의 카테고리가 있는지 확인
      let menuCategory = await Category.findOne({
        where: {
          restaurant_id: restaurantId,
          name: recipeCategoryName
        }
      });

      // 없으면 새로 생성
      if (!menuCategory) {
        menuCategory = await Category.create({
          restaurant_id: restaurantId,
          name: recipeCategoryName,
          description: recipe.recipeCategory.description,
          emoji: recipe.recipeCategory.emoji,
          displayOrder: recipe.recipeCategory.display_order,
          isActive: true
        });
        console.log(`📦 새 메뉴 카테고리 생성: ${recipeCategoryName} (restaurant: ${restaurantId})`);
      }

      categoryName = menuCategory.name;
    }

    // 레시피의 모든 정보를 Product로 복사
    const product = await Product.create({
      restaurant_id: restaurantId,
      recipe_id,
      code: recipe.code,
      name: recipe.name,
      price,
      category: categoryName,
      description: recipe.description,
      optionGroups: recipe.option_groups,
      image: recipe.image,
      emoji: recipe.emoji,
      soldOut: false,
      is_set_menu: recipe.is_set_menu,
      set_items: recipe.set_items,
      set_display_order: recipe.set_display_order
    });

    res.json({
      success: true,
      data: product,
      message: 'Recipe has been added to the menu',
      category_created: recipe.recipeCategory && !categoryName ? false : !!recipe.recipeCategory
    });
  } catch (error) {
    console.error('Create product from recipe error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

module.exports = router;
