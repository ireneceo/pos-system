const express = require('express');
const router = express.Router();
const { Recipe, Ingredient, RecipeIngredient, Restaurant, Product, RecipeCategory, Category, RestaurantIngredientCost } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { canEditRecipe, isBrandManager } = require('../middleware/recipeAuth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const { generateRecipeCode } = require('../utils/codeGenerator');
const { processImage, deleteOldImages } = require('../utils/imageProcessor');

// Tier gate (P0-3, 2026-06-08): a restaurant managing its OWN recipes is an
// Advanced-tier feature (recipe_management module — Enterprise, or granted via
// brand/foodcourt plan). Scoped to the restaurant's own recipe paths only.
// NOT applied to /restaurants/:id/brand-recipes (read of HQ-pushed recipes) so a
// franchise branch can always see the brand's recipes regardless of its own tier.
const recipeGate = requireRestaurantModule('recipe_management', 'restaurantId');
router.use('/restaurants/:restaurantId/recipes', authenticateToken, recipeGate);
router.use('/restaurants/:restaurantId/products/create-from-recipe', authenticateToken, recipeGate);

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
    res.status(500).json({ success: false, error: { message: 'Failed to fetch recipes', code: 'INTERNAL_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: 'Recipe name is required', code: 'VALIDATION_ERROR' } });
    }

    // 이미지 처리 (base64 → 파일 저장)
    let imageUrl = null;
    if (image && image.startsWith('data:image')) {
      const processed = await processImage(image);
      imageUrl = processed?.original || null;
    } else if (image) {
      imageUrl = image; // 이미 URL인 경우
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
      image: imageUrl,
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
    res.status(500).json({ success: false, error: { message: 'Failed to create recipe', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 기본 정보 업데이트 (빈 문자열은 null로 처리)
    const updateData = {};
    if (name !== undefined) updateData.name = name || recipe.name;
    if (description !== undefined) updateData.description = description || null;
    if (category !== undefined) updateData.category = category || null;
    if (recipe_category_id !== undefined) updateData.recipe_category_id = recipe_category_id || null;
    if (emoji !== undefined) updateData.emoji = emoji || null;
    if (image !== undefined) {
      let newImageUrl = image || null;
      if (image && image.startsWith('data:image')) {
        const processed = await processImage(image);
        newImageUrl = processed?.original || null;
      }
      if (newImageUrl && recipe.image && newImageUrl !== recipe.image) {
        await deleteOldImages(recipe.image);
      }
      updateData.image = newImageUrl;
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
    res.status(500).json({ success: false, error: { message: 'Failed to update recipe', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    await recipe.destroy();

    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete brand recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete recipe', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: 'Failed to fetch recipes', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: 'Failed to fetch brand recipes', code: 'INTERNAL_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: 'Recipe name is required', code: 'VALIDATION_ERROR' } });
    }

    // 이미지 처리 (base64 → 파일 저장)
    let imageUrl = null;
    if (image && image.startsWith('data:image')) {
      const processed = await processImage(image);
      imageUrl = processed?.original || null;
    } else if (image) {
      imageUrl = image;
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
      image: imageUrl,
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
    res.status(500).json({ success: false, error: { message: 'Failed to create recipe', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 자신의 레시피인지 확인 (owner_type이 'restaurant'이고 restaurant_id가 일치해야 함)
    if (recipe.owner_type !== 'restaurant' || recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ success: false, error: { message: 'You can only edit your own restaurant recipes', code: 'FORBIDDEN' } });
    }

    const { name, description, category, emoji, image, option_groups, ingredients, yield_amount, yield_unit, prep_time, cook_time, instructions, instructions_summary, instructions_detail, suggested_price } = req.body;

    // 이미지 처리 (base64 → 파일 저장)
    let newImageUrl = image;
    if (image && image.startsWith('data:image')) {
      const processed = await processImage(image);
      newImageUrl = processed?.original || null;
    }
    if (newImageUrl && recipe.image && newImageUrl !== recipe.image) {
      await deleteOldImages(recipe.image);
    }

    // 기본 정보 업데이트
    await recipe.update({
      name,
      description,
      category,
      emoji,
      image: newImageUrl,
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
    res.status(500).json({ success: false, error: { message: 'Failed to update recipe', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
    }

    // 자신의 레시피인지 확인 (owner_type이 'restaurant'이고 restaurant_id가 일치해야 함)
    if (recipe.owner_type !== 'restaurant' || recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ success: false, error: { message: 'You can only delete your own restaurant recipes', code: 'FORBIDDEN' } });
    }

    await recipe.destroy();

    res.json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Delete restaurant recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete recipe', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
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
    res.status(500).json({ success: false, error: { message: 'Failed to create product', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/brands/:brandId/recipes/:recipeId/copy
 * Copy a brand recipe (with ingredients) to another brand the BG owns.
 *
 * body: { target_brand_id: number, name?: string }
 *
 * - Source brand ownership is enforced by `isBrandManager` middleware.
 * - Target brand ownership re-checked inside handler.
 * - recipe_category_id is NOT carried — categories are brand-scoped, re-link in target.
 * - Image URL is reused as-is (uploaded files survive a reference copy).
 */
router.post('/brands/:brandId/recipes/:recipeId/copy', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const sourceBrandId = parseInt(req.params.brandId, 10);
    const sourceRecipeId = parseInt(req.params.recipeId, 10);
    const targetBrandId = parseInt(req.body.target_brand_id, 10);

    if (!Number.isFinite(targetBrandId) || targetBrandId === sourceBrandId) {
      return res.status(400).json({
        success: false,
        error: { message: 'Valid target_brand_id required (must differ from source)', code: 'VALIDATION_ERROR' }
      });
    }

    // Target brand ownership check — re-use Brand model
    const { Brand } = require('../models');
    const targetBrand = await Brand.findByPk(targetBrandId);
    if (!targetBrand) {
      return res.status(404).json({ success: false, error: { message: 'Target brand not found', code: 'NOT_FOUND' } });
    }
    // System Admin skips ownership; otherwise the BG must own the target brand too
    if (req.user.role !== 'System Admin' && targetBrand.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: { message: 'Target brand not owned by you', code: 'FORBIDDEN' } });
    }

    // Source recipe (with ingredients)
    const source = await Recipe.findByPk(sourceRecipeId, {
      include: [{ model: RecipeIngredient, as: 'recipeIngredients' }]
    });
    if (!source || source.brand_id !== sourceBrandId) {
      return res.status(404).json({ success: false, error: { message: 'Source recipe not found', code: 'NOT_FOUND' } });
    }

    const newCode = await generateRecipeCode(Recipe, 'brand', targetBrandId);

    const copy = await Recipe.create({
      owner_type: 'brand',
      brand_id: targetBrandId,
      restaurant_id: null,
      code: newCode,
      name: req.body.name || `${source.name} (Copy)`,
      description: source.description,
      category: null,                // brand-scoped — drop
      recipe_category_id: null,      // brand-scoped — drop
      emoji: source.emoji,
      image: source.image,           // image URL is reusable
      option_groups: source.option_groups,
      yield_amount: source.yield_amount,
      yield_unit: source.yield_unit,
      prep_time: source.prep_time,
      cook_time: source.cook_time,
      instructions: source.instructions,
      instructions_summary: source.instructions_summary,
      instructions_detail: source.instructions_detail,
      suggested_price: source.suggested_price,
      total_ingredient_cost: source.total_ingredient_cost,
      is_active: source.is_active
    });

    // Copy ingredients
    let totalCost = 0;
    for (const ri of (source.recipeIngredients || [])) {
      await RecipeIngredient.create({
        recipe_id: copy.id,
        ingredient_id: ri.ingredient_id,
        quantity: ri.quantity,
        unit: ri.unit,
        cost: ri.cost,
        notes: ri.notes
      });
      totalCost += Number(ri.cost || 0);
    }
    if (totalCost !== Number(source.total_ingredient_cost)) {
      await copy.update({ total_ingredient_cost: totalCost });
    }

    const result = await Recipe.findByPk(copy.id, {
      include: [
        { model: RecipeIngredient, as: 'recipeIngredients', include: [{ model: Ingredient, as: 'ingredient' }] }
      ]
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error('Copy brand recipe error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to copy recipe', code: 'INTERNAL_ERROR' } });
  }
});

module.exports = router;
