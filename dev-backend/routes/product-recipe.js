const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const {
  Product,
  Recipe,
  RecipeIngredient,
  Ingredient,
  Restaurant
} = require('../models');

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

    // Calculate total ingredient cost if recipe exists
    let totalCost = 0;
    if (product.recipe && product.recipe.recipeIngredients) {
      product.recipe.recipeIngredients.forEach(ri => {
        if (ri.ingredient) {
          const ingredientCost = parseFloat(ri.ingredient.unit_cost) * parseFloat(ri.quantity);
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
          ingredients: product.recipe.recipeIngredients?.map(ri => ({
            id: ri.id,
            ingredient_id: ri.ingredient_id,
            ingredient_name: ri.ingredient?.name,
            quantity: parseFloat(ri.quantity),
            unit: ri.unit,
            unit_cost: parseFloat(ri.ingredient?.unit_cost || 0),
            total_cost: parseFloat(ri.ingredient?.unit_cost || 0) * parseFloat(ri.quantity),
            current_stock: parseFloat(ri.ingredient?.current_stock || 0),
            notes: ri.notes
          })) || []
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
        attributes: ['id', 'name', 'total_ingredient_cost'],
        required: false
      }],
      order: [['category', 'ASC'], ['name', 'ASC']]
    });

    const data = products.map(p => ({
      id: p.id,
      name: p.name,
      code: p.code,
      price: parseFloat(p.price),
      category: p.category,
      has_recipe: !!p.recipe_id,
      recipe_id: p.recipe_id,
      recipe_name: p.recipe?.name || null,
      ingredient_cost: parseFloat(p.recipe?.total_ingredient_cost || 0),
      profit_margin: p.recipe ?
        ((parseFloat(p.price) - parseFloat(p.recipe.total_ingredient_cost || 0)) / parseFloat(p.price) * 100).toFixed(1) : null
    }));

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

    // Add ingredients if provided
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const ing of ingredients) {
        // Get ingredient unit cost
        const ingredient = await Ingredient.findByPk(ing.ingredient_id);
        const cost = ingredient ? parseFloat(ingredient.unit_cost) * parseFloat(ing.quantity) : 0;
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

    // Add new ingredients
    let totalCost = 0;
    if (ingredients && ingredients.length > 0) {
      for (const ing of ingredients) {
        const ingredient = await Ingredient.findByPk(ing.ingredient_id);
        const cost = ingredient ? parseFloat(ingredient.unit_cost) * parseFloat(ing.quantity) : 0;
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
          { brand_id: brandId, owner_type: 'brand' }
        ],
        is_active: true
      },
      attributes: ['id', 'name', 'description', 'category', 'total_ingredient_cost', 'owner_type'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: recipes });
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

    let totalCost = 0;
    const ingredientBreakdown = [];

    product.recipe.recipeIngredients?.forEach(ri => {
      const unitCost = parseFloat(ri.ingredient?.unit_cost || 0);
      const quantity = parseFloat(ri.quantity);
      const cost = unitCost * quantity;
      totalCost += cost;

      ingredientBreakdown.push({
        ingredient_name: ri.ingredient?.name,
        quantity,
        unit: ri.unit,
        unit_cost: unitCost,
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
