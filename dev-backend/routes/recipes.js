const express = require('express');
const router = express.Router();
const { Recipe, Ingredient, RecipeIngredient, Restaurant, Product, RecipeCategory, Category } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { canEditRecipe, canViewRecipe, isBrandManager } = require('../middleware/recipeAuth');

// ============================================
// Brand Recipes (Brand General/Manager)
// ============================================

/**
 * GET /api/brands/:brand_id/recipes
 * 브랜드 레시피 목록 조회
 */
router.get('/brands/:brand_id/recipes', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brand_id } = req.params;

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
 * POST /api/brands/:brand_id/recipes
 * 브랜드 레시피 생성
 */
router.post('/brands/:brand_id/recipes', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brand_id } = req.params;
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients, prep_time, cook_time, instructions, suggested_price } = req.body;

    // 레시피 생성
    const recipe = await Recipe.create({
      brand_id,
      restaurant_id: null,
      name,
      description,
      category,
      recipe_category_id: recipe_category_id || null,
      emoji,
      image,
      option_groups,
      prep_time,
      cook_time,
      instructions,
      suggested_price: suggested_price || 0,
      total_ingredient_cost: 0
    });

    // 재료 추가 및 원가 계산
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const item of ingredients) {
        const ingredient = await Ingredient.findByPk(item.ingredient_id);
        if (ingredient) {
          const cost = parseFloat(item.quantity) * parseFloat(ingredient.unit_cost);
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
 * PUT /api/brands/:brand_id/recipes/:recipe_id
 * 브랜드 레시피 수정
 */
router.put('/brands/:brand_id/recipes/:recipe_id', authenticateToken, canEditRecipe, async (req, res) => {
  try {
    const { recipe_id } = req.params;
    const { name, description, category, recipe_category_id, emoji, image, option_groups, ingredients, prep_time, cook_time, instructions, suggested_price } = req.body;

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // 기본 정보 업데이트
    await recipe.update({
      name,
      description,
      category,
      recipe_category_id: recipe_category_id !== undefined ? recipe_category_id : recipe.recipe_category_id,
      emoji,
      image,
      option_groups,
      prep_time,
      cook_time,
      instructions,
      suggested_price
    });

    // 재료 업데이트 (기존 삭제 후 재생성)
    if (ingredients) {
      await RecipeIngredient.destroy({ where: { recipe_id } });

      let totalCost = 0;
      for (const item of ingredients) {
        const ingredient = await Ingredient.findByPk(item.ingredient_id);
        if (ingredient) {
          const cost = parseFloat(item.quantity) * parseFloat(ingredient.unit_cost);
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
 * DELETE /api/brands/:brand_id/recipes/:recipe_id
 * 브랜드 레시피 삭제
 */
router.delete('/brands/:brand_id/recipes/:recipe_id', authenticateToken, canEditRecipe, async (req, res) => {
  try {
    const { recipe_id } = req.params;

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
 * 레스토랑에서 사용 가능한 모든 레시피 조회
 * recipe_manager_type에 따라 편집 권한 결정
 */
router.get('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const result = {
      brand_recipes: [],
      own_recipes: [],
      recipe_manager_type: restaurant.recipe_manager_type || 'restaurant'
    };

    // 브랜드 레시피 (brand_id가 있는 경우)
    if (restaurant.brand_id) {
      const brandRecipes = await Recipe.findAll({
        where: { brand_id: restaurant.brand_id },
        include: [
          {
            model: RecipeIngredient,
            as: 'recipeIngredients',
            include: [{ model: Ingredient, as: 'ingredient' }]
          }
        ],
        order: [['created_at', 'DESC']]
      });

      result.brand_recipes = brandRecipes.map(r => ({
        ...r.toJSON(),
        from_brand: true,
        editable: false  // 브랜드 레시피는 항상 수정 불가
      }));
    }

    // 레스토랑 자체 레시피
    // 독립 레스토랑이거나, 브랜드 소속이지만 recipe_manager_type이 'restaurant'인 경우
    const canManageOwnRecipes = !restaurant.brand_id || restaurant.recipe_manager_type === 'restaurant';

    const ownRecipes = await Recipe.findAll({
      where: { restaurant_id: restaurantId },
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient' }]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    result.own_recipes = ownRecipes.map(r => ({
      ...r.toJSON(),
      from_brand: false,
      editable: canManageOwnRecipes  // recipe_manager_type에 따라 결정
    }));

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get restaurant recipes error:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/recipes
 * 레스토랑 레시피 생성 (독립 또는 recipe_manager_type='restaurant'인 경우)
 */
router.post('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findByPk(restaurantId);

    // 브랜드 가맹점이고 recipe_manager_type이 'brand'인 경우 레시피 생성 불가
    if (restaurant.brand_id && restaurant.recipe_manager_type === 'brand') {
      return res.status(403).json({ error: 'Cannot create recipes in brand management mode. Please contact your brand administrator.' });
    }

    const { name, description, category, emoji, image, option_groups, ingredients, prep_time, cook_time, instructions, suggested_price } = req.body;

    // 레시피 생성
    const recipe = await Recipe.create({
      brand_id: null,
      restaurant_id: restaurantId,
      name,
      description,
      category,
      emoji,
      image,
      option_groups,
      prep_time,
      cook_time,
      instructions,
      suggested_price: suggested_price || 0,
      total_ingredient_cost: 0
    });

    // 재료 추가 및 원가 계산
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const item of ingredients) {
        const ingredient = await Ingredient.findByPk(item.ingredient_id);
        if (ingredient) {
          const cost = parseFloat(item.quantity) * parseFloat(ingredient.unit_cost);
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
 * 독립 레스토랑 레시피 수정
 */
router.put('/restaurants/:restaurantId/recipes/:recipeId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, recipeId } = req.params;
    const restaurant = await Restaurant.findByPk(restaurantId);

    // 브랜드 가맹점은 레시피 수정 불가 (recipe_manager_type 체크)
    if (restaurant.brand_id && restaurant.recipe_manager_type === 'brand') {
      return res.status(403).json({ error: 'Cannot edit brand-managed recipes' });
    }

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // 자신의 레시피인지 확인
    if (recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ error: 'You do not have permission to edit this recipe' });
    }

    const { name, description, category, emoji, image, option_groups, ingredients, prep_time, cook_time, instructions, suggested_price } = req.body;

    // 기본 정보 업데이트
    await recipe.update({
      name,
      description,
      category,
      emoji,
      image,
      option_groups,
      prep_time,
      cook_time,
      instructions,
      suggested_price
    });

    // 재료 업데이트 (기존 삭제 후 재생성)
    if (ingredients) {
      await RecipeIngredient.destroy({ where: { recipe_id: recipeId } });

      let totalCost = 0;
      for (const item of ingredients) {
        const ingredient = await Ingredient.findByPk(item.ingredient_id);
        if (ingredient) {
          const cost = parseFloat(item.quantity) * parseFloat(ingredient.unit_cost);
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
 * 독립 레스토랑 레시피 삭제
 */
router.delete('/restaurants/:restaurantId/recipes/:recipeId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, recipeId } = req.params;
    const restaurant = await Restaurant.findByPk(restaurantId);

    // 브랜드 가맹점은 레시피 삭제 불가 (recipe_manager_type 체크)
    if (restaurant.brand_id && restaurant.recipe_manager_type === 'brand') {
      return res.status(403).json({ error: 'Cannot delete brand-managed recipes' });
    }

    const recipe = await Recipe.findByPk(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // 자신의 레시피인지 확인
    if (recipe.restaurant_id !== parseInt(restaurantId)) {
      return res.status(403).json({ error: 'You do not have permission to delete this recipe' });
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
