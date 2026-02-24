const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const {
  Product,
  Recipe,
  RecipeIngredient,
  Ingredient,
  Restaurant,
  RestaurantIngredientCost
} = require('../models');

// 레스토랑의 코스트 오버라이드 맵 조회 헬퍼
async function getRestaurantCostMap(restaurantId) {
  const costs = await RestaurantIngredientCost.findAll({
    where: { restaurant_id: restaurantId }
  });
  const map = {};
  costs.forEach(c => { map[c.ingredient_id] = parseFloat(c.unit_cost); });
  return map;
}

// ingredient의 effective unit_cost 반환 (restaurant override > brand cost)
function getEffectiveCost(ingredient, costMap) {
  if (!ingredient) return 0;
  const override = costMap[ingredient.id];
  return override !== undefined ? override : parseFloat(ingredient.unit_cost);
}

// Get product with recipe details
router.get('/restaurants/:restaurantId/products/:productId/recipe', async (req, res) => {
  try {
    const { restaurantId, productId } = req.params;

    const product = await Product.findOne({
      where: {
        id: productId,
        restaurant_id: restaurantId
      },
      include: [{
        model: Recipe,
        as: 'recipe',
        include: [{
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{
            model: Ingredient,
            as: 'ingredient',
            attributes: ['id', 'name', 'unit', 'unit_cost', 'category', 'current_stock']
          }]
        }]
      }]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // 레스토랑 코스트 오버라이드 맵 조회
    const costMap = await getRestaurantCostMap(restaurantId);

    // Calculate total ingredient cost if recipe exists (with effective cost)
    let totalCost = 0;
    if (product.recipe && product.recipe.recipeIngredients) {
      product.recipe.recipeIngredients.forEach(ri => {
        if (ri.ingredient) {
          const effectiveUnitCost = getEffectiveCost(ri.ingredient, costMap);
          const ingredientCost = effectiveUnitCost * parseFloat(ri.quantity);
          totalCost += ingredientCost;
        }
      });
    }

    res.json({
      success: true,
      data: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          category: product.category,
          recipe_id: product.recipe_id
        },
        recipe: product.recipe ? {
          id: product.recipe.id,
          name: product.recipe.name,
          description: product.recipe.description,
          prep_time: product.recipe.prep_time,
          cook_time: product.recipe.cook_time,
          instructions_summary: product.recipe.instructions_summary,
          instructions_detail: product.recipe.instructions_detail,
          total_ingredient_cost: totalCost,
          ingredients: product.recipe.recipeIngredients?.map(ri => {
            const effectiveUnitCost = getEffectiveCost(ri.ingredient, costMap);
            return {
              id: ri.id,
              ingredient_id: ri.ingredient_id,
              ingredient_name: ri.ingredient?.name,
              quantity: parseFloat(ri.quantity),
              unit: ri.unit,
              unit_cost: effectiveUnitCost,
              brand_cost: parseFloat(ri.ingredient?.unit_cost || 0),
              total_cost: effectiveUnitCost * parseFloat(ri.quantity),
              current_stock: parseFloat(ri.ingredient?.current_stock || 0),
              notes: ri.notes
            };
          }) || []
        } : null
      }
    });
  } catch (error) {
    console.error('Error fetching product recipe:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product recipe' });
  }
});

// Get all products with recipe status
router.get('/restaurants/:restaurantId/products/recipe-status', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const products = await Product.findAll({
      where: { restaurant_id: restaurantId },
      include: [{
        model: Recipe,
        as: 'recipe',
        attributes: ['id', 'name', 'total_ingredient_cost', 'owner_type'],
        required: false,
        include: [{
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'unit_cost'] }]
        }]
      }],
      order: [['category', 'ASC'], ['name', 'ASC']]
    });

    // 레스토랑 코스트 오버라이드 맵 조회
    const costMap = await getRestaurantCostMap(restaurantId);

    const data = products.map(p => {
      let ingredientCost = parseFloat(p.recipe?.total_ingredient_cost || 0);

      // 브랜드 레시피인 경우 effective_cost로 재계산
      if (p.recipe && p.recipe.owner_type === 'brand' && p.recipe.recipeIngredients) {
        let recalculated = 0;
        p.recipe.recipeIngredients.forEach(ri => {
          if (ri.ingredient) {
            recalculated += getEffectiveCost(ri.ingredient, costMap) * parseFloat(ri.quantity);
          }
        });
        ingredientCost = recalculated;
      }

      const price = parseFloat(p.price);
      return {
        id: p.id,
        name: p.name,
        code: p.code,
        price,
        category: p.category,
        has_recipe: !!p.recipe_id,
        recipe_id: p.recipe_id,
        recipe_name: p.recipe?.name || null,
        ingredient_cost: ingredientCost,
        profit_margin: p.recipe ? ((price - ingredientCost) / price * 100).toFixed(1) : null
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching products recipe status:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// Link/update recipe for a product
router.put('/restaurants/:restaurantId/products/:productId/recipe', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId, productId } = req.params;
    const { recipe_id } = req.body;

    const product = await Product.findOne({
      where: {
        id: productId,
        restaurant_id: restaurantId
      }
    });

    if (!product) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // If recipe_id is provided, verify it exists
    if (recipe_id) {
      const recipe = await Recipe.findByPk(recipe_id);
      if (!recipe) {
        await transaction.rollback();
        return res.status(404).json({ success: false, message: 'Recipe not found' });
      }
    }

    await product.update({ recipe_id: recipe_id || null }, { transaction });

    await transaction.commit();

    res.json({
      success: true,
      message: recipe_id ? 'Recipe linked successfully' : 'Recipe unlinked successfully',
      data: { product_id: productId, recipe_id }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating product recipe:', error);
    res.status(500).json({ success: false, message: 'Failed to update product recipe' });
  }
});

// Create inline recipe for a product (creates recipe and links it)
router.post('/restaurants/:restaurantId/products/:productId/recipe', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId, productId } = req.params;
    const { name, description, ingredients, prep_time, cook_time, instructions_summary, instructions_detail } = req.body;

    const product = await Product.findOne({
      where: {
        id: productId,
        restaurant_id: restaurantId
      }
    });

    if (!product) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get restaurant's brand_id
    const restaurant = await Restaurant.findByPk(restaurantId);

    // Create recipe
    const recipe = await Recipe.create({
      owner_type: 'restaurant',
      restaurant_id: parseInt(restaurantId),
      brand_id: restaurant?.brand_id || null,
      name: name || product.name,
      description,
      prep_time,
      cook_time,
      instructions_summary,
      instructions_detail,
      is_active: true
    }, { transaction });

    // Add ingredients if provided (with effective cost)
    let totalCost = 0;
    const costMap = await getRestaurantCostMap(restaurantId);
    if (ingredients && ingredients.length > 0) {
      for (const ing of ingredients) {
        const ingredient = await Ingredient.findByPk(ing.ingredient_id);
        const effectiveUnitCost = getEffectiveCost(ingredient, costMap);
        const cost = effectiveUnitCost * parseFloat(ing.quantity);
        totalCost += cost;

        await RecipeIngredient.create({
          recipe_id: recipe.id,
          ingredient_id: ing.ingredient_id,
          quantity: ing.quantity,
          unit: ing.unit,
          cost,
          notes: ing.notes
        }, { transaction });
      }

      // Update recipe total cost
      await recipe.update({ total_ingredient_cost: totalCost }, { transaction });
    }

    // Link recipe to product
    await product.update({ recipe_id: recipe.id }, { transaction });

    await transaction.commit();

    res.json({
      success: true,
      message: 'Recipe created and linked successfully',
      data: {
        product_id: productId,
        recipe_id: recipe.id,
        recipe_name: recipe.name,
        total_ingredient_cost: totalCost
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating product recipe:', error);
    res.status(500).json({ success: false, message: 'Failed to create product recipe' });
  }
});

// Update recipe ingredients for a product's recipe
router.put('/restaurants/:restaurantId/products/:productId/recipe/ingredients', async (req, res) => {
  const transaction = await database.sequelize.transaction();

  try {
    const { restaurantId, productId } = req.params;
    const { ingredients } = req.body;

    const product = await Product.findOne({
      where: {
        id: productId,
        restaurant_id: restaurantId
      }
    });

    if (!product || !product.recipe_id) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Product or recipe not found' });
    }

    const recipeId = product.recipe_id;

    // Delete existing ingredients
    await RecipeIngredient.destroy({
      where: { recipe_id: recipeId },
      transaction
    });

    // Add new ingredients (with effective cost)
    let totalCost = 0;
    const costMap = await getRestaurantCostMap(restaurantId);
    if (ingredients && ingredients.length > 0) {
      for (const ing of ingredients) {
        const ingredient = await Ingredient.findByPk(ing.ingredient_id);
        const effectiveUnitCost = getEffectiveCost(ingredient, costMap);
        const cost = effectiveUnitCost * parseFloat(ing.quantity);
        totalCost += cost;

        await RecipeIngredient.create({
          recipe_id: recipeId,
          ingredient_id: ing.ingredient_id,
          quantity: ing.quantity,
          unit: ing.unit,
          cost,
          notes: ing.notes
        }, { transaction });
      }
    }

    // Update recipe total cost
    await Recipe.update(
      { total_ingredient_cost: totalCost },
      { where: { id: recipeId }, transaction }
    );

    await transaction.commit();

    res.json({
      success: true,
      message: 'Recipe ingredients updated successfully',
      data: {
        recipe_id: recipeId,
        total_ingredient_cost: totalCost,
        ingredient_count: ingredients?.length || 0
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating recipe ingredients:', error);
    res.status(500).json({ success: false, message: 'Failed to update recipe ingredients' });
  }
});

// Get available recipes to link (not yet linked to any product in this restaurant)
router.get('/restaurants/:restaurantId/recipes/available', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Get restaurant's brand_id
    const restaurant = await Restaurant.findByPk(restaurantId);
    const brandId = restaurant?.brand_id;

    // Find recipes available for this restaurant
    const recipes = await Recipe.findAll({
      where: {
        [Op.or]: [
          { restaurant_id: restaurantId },
          ...(brandId ? [{ brand_id: brandId, owner_type: 'brand' }] : [])
        ],
        is_active: true
      },
      attributes: ['id', 'name', 'description', 'category', 'total_ingredient_cost', 'owner_type'],
      include: [{
        model: RecipeIngredient,
        as: 'recipeIngredients',
        include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'unit_cost'] }]
      }],
      order: [['name', 'ASC']]
    });

    // 브랜드 레시피에 대해 effective_cost 재계산
    const costMap = await getRestaurantCostMap(restaurantId);
    const enriched = recipes.map(r => {
      const plain = r.toJSON();
      if (plain.owner_type === 'brand' && plain.recipeIngredients) {
        let effectiveTotal = 0;
        plain.recipeIngredients.forEach(ri => {
          if (ri.ingredient) {
            effectiveTotal += getEffectiveCost(ri.ingredient, costMap) * parseFloat(ri.quantity);
          }
        });
        plain.effective_ingredient_cost = effectiveTotal;
      } else {
        plain.effective_ingredient_cost = parseFloat(plain.total_ingredient_cost || 0);
      }
      delete plain.recipeIngredients; // 응답에서 재료 상세 제외
      return plain;
    });

    res.json({ success: true, data: enriched });
  } catch (error) {
    console.error('Error fetching available recipes:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch recipes' });
  }
});

// Calculate ingredient cost for a product
router.get('/restaurants/:restaurantId/products/:productId/ingredient-cost', async (req, res) => {
  try {
    const { restaurantId, productId } = req.params;

    const product = await Product.findOne({
      where: {
        id: productId,
        restaurant_id: restaurantId
      },
      include: [{
        model: Recipe,
        as: 'recipe',
        include: [{
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [{
            model: Ingredient,
            as: 'ingredient',
            attributes: ['id', 'name', 'unit_cost']
          }]
        }]
      }]
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (!product.recipe) {
      return res.json({
        success: true,
        data: {
          product_id: productId,
          product_name: product.name,
          product_price: parseFloat(product.price),
          has_recipe: false,
          ingredient_cost: 0,
          profit_margin: 100
        }
      });
    }

    // 레스토랑 코스트 오버라이드 적용
    const costMap = await getRestaurantCostMap(restaurantId);

    let totalCost = 0;
    const ingredientBreakdown = [];

    product.recipe.recipeIngredients?.forEach(ri => {
      const effectiveUnitCost = getEffectiveCost(ri.ingredient, costMap);
      const quantity = parseFloat(ri.quantity);
      const cost = effectiveUnitCost * quantity;
      totalCost += cost;

      ingredientBreakdown.push({
        ingredient_name: ri.ingredient?.name,
        quantity,
        unit: ri.unit,
        unit_cost: effectiveUnitCost,
        brand_cost: parseFloat(ri.ingredient?.unit_cost || 0),
        total_cost: cost
      });
    });

    const productPrice = parseFloat(product.price);
    const profitMargin = productPrice > 0 ? ((productPrice - totalCost) / productPrice * 100) : 0;

    res.json({
      success: true,
      data: {
        product_id: productId,
        product_name: product.name,
        product_price: productPrice,
        has_recipe: true,
        recipe_name: product.recipe.name,
        ingredient_cost: totalCost,
        profit_margin: profitMargin.toFixed(1),
        ingredients: ingredientBreakdown
      }
    });
  } catch (error) {
    console.error('Error calculating ingredient cost:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate ingredient cost' });
  }
});

module.exports = router;
