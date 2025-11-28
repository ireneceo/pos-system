const express = require('express');
const router = express.Router();
const { Recipe, Ingredient, RecipeIngredient, Restaurant, Product } = require('../models');
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
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ success: true, data: recipes });
  } catch (error) {
    console.error('Get brand recipes error:', error);
    res.status(500).json({ error: '레시피 목록 조회 실패' });
  }
});

/**
 * POST /api/brands/:brand_id/recipes
 * 브랜드 레시피 생성
 */
router.post('/brands/:brand_id/recipes', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { brand_id } = req.params;
    const { name, description, category, emoji, image, option_groups, ingredients, prep_time, cook_time, instructions, suggested_price } = req.body;

    // 레시피 생성
    const recipe = await Recipe.create({
      brand_id,
      restaurant_id: null,
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

    // 총 원가 업데이트
    await recipe.update({ total_ingredient_cost: totalCost });

    // 재료 포함해서 다시 조회
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
    console.error('Create brand recipe error:', error);
    res.status(500).json({ error: '레시피 생성 실패' });
  }
});

/**
 * PUT /api/brands/:brand_id/recipes/:recipe_id
 * 브랜드 레시피 수정
 */
router.put('/brands/:brand_id/recipes/:recipe_id', authenticateToken, canEditRecipe, async (req, res) => {
  try {
    const { recipe_id } = req.params;
    const { name, description, category, emoji, image, option_groups, ingredients, prep_time, cook_time, instructions, suggested_price } = req.body;

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: '레시피를 찾을 수 없습니다' });
    }

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
        }
      ]
    });

    res.json({ success: true, data: updatedRecipe });
  } catch (error) {
    console.error('Update brand recipe error:', error);
    res.status(500).json({ error: '레시피 수정 실패' });
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
      return res.status(404).json({ error: '레시피를 찾을 수 없습니다' });
    }

    await recipe.destroy();

    res.json({ success: true, message: '레시피가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete brand recipe error:', error);
    res.status(500).json({ error: '레시피 삭제 실패' });
  }
});

// ============================================
// Restaurant Recipes (Restaurant Admin)
// ============================================

/**
 * GET /api/restaurants/:restaurantId/recipes
 * 레스토랑에서 사용 가능한 모든 레시피 조회
 */
router.get('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: '레스토랑을 찾을 수 없습니다' });
    }

    const result = {
      brand_recipes: [],
      own_recipes: []
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
        editable: false
      }));
    }

    // 레스토랑 자체 레시피 (독립 레스토랑만)
    if (!restaurant.brand_id) {
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
        editable: true
      }));
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Get restaurant recipes error:', error);
    res.status(500).json({ error: '레시피 목록 조회 실패' });
  }
});

/**
 * POST /api/restaurants/:restaurantId/recipes
 * 독립 레스토랑 레시피 생성
 */
router.post('/restaurants/:restaurantId/recipes', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await Restaurant.findByPk(restaurantId);

    // 브랜드 가맹점은 레시피 생성 불가
    if (restaurant.brand_id) {
      return res.status(403).json({ error: '브랜드 가맹점은 레시피를 생성할 수 없습니다' });
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
    res.status(500).json({ error: '레시피 생성 실패' });
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

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: '레시피를 찾을 수 없습니다' });
    }

    // 레시피의 모든 정보를 Product로 복사
    const product = await Product.create({
      restaurant_id: restaurantId,
      recipe_id,
      code: recipe.code,
      name: recipe.name,
      price,
      category: recipe.category,
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
      message: '레시피가 메뉴로 등록되었습니다'
    });
  } catch (error) {
    console.error('Create product from recipe error:', error);
    res.status(500).json({ error: '메뉴 등록 실패' });
  }
});

module.exports = router;
