const { Recipe, Restaurant, Brand } = require('../models');

/**
 * 레시피 수정 권한 체크
 */
async function canEditRecipe(req, res, next) {
  try {
    const recipe_id = req.params.recipeId || req.params.recipe_id;
    const user = req.user;

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // System Admin can do everything
    if (user.role === 'System Admin') {
      return next();
    }

    // Brand recipe
    if (recipe.brand_id) {
      // Brand General/Manager can edit if they own the brand
      if (user.role === 'Brand General' || user.role === 'Brand Manager') {
        const brand = await Brand.findByPk(recipe.brand_id);
        if (brand && brand.owner_id === user.id) {
          return next();
        }
      }
      return res.status(403).json({
        error: 'Only brand owner can edit brand recipes'
      });
    }

    // Restaurant recipe
    if (recipe.restaurant_id) {
      // Restaurant Admin can edit their own recipes
      if (user.role === 'Restaurant Admin'
          && user.restaurant_id === recipe.restaurant_id) {
        return next();
      }
      return res.status(403).json({
        error: 'Only restaurant admin can edit this recipe'
      });
    }

    return res.status(403).json({ error: 'Permission denied' });
  } catch (error) {
    console.error('canEditRecipe error:', error);
    return res.status(500).json({ error: 'Error checking permissions' });
  }
}

/**
 * Recipe view permission check
 */
async function canViewRecipe(req, res, next) {
  try {
    const recipe_id = req.params.recipeId || req.params.recipe_id;
    const user = req.user;

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // System Admin can view everything
    if (user.role === 'System Admin') {
      return next();
    }

    // Brand recipe
    if (recipe.brand_id) {
      // Brand General/Manager who owns the brand
      if (user.role === 'Brand General' || user.role === 'Brand Manager') {
        const brand = await Brand.findByPk(recipe.brand_id);
        if (brand && brand.owner_id === user.id) {
          return next();
        }
      }

      // Restaurant Admin of a restaurant belonging to the brand
      if (user.role === 'Restaurant Admin') {
        const restaurant = await Restaurant.findByPk(user.restaurant_id);
        if (restaurant && restaurant.brand_id === recipe.brand_id) {
          return next();
        }
      }

      return res.status(403).json({ error: 'Permission denied' });
    }

    // Restaurant recipe
    if (recipe.restaurant_id) {
      if (user.role === 'Restaurant Admin'
          && user.restaurant_id === recipe.restaurant_id) {
        return next();
      }
      return res.status(403).json({ error: 'Permission denied' });
    }

    return res.status(403).json({ error: 'Permission denied' });
  } catch (error) {
    console.error('canViewRecipe error:', error);
    return res.status(500).json({ error: 'Error checking permissions' });
  }
}

/**
 * Brand manager permission check
 * If brand_id is in URL params, verifies brand ownership
 * If no brand_id in URL, just checks if user is Brand General/Manager
 */
async function isBrandManager(req, res, next) {
  const user = req.user;

  if (user.role === 'System Admin') {
    return next();
  }

  if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    const brand_id = req.params.brandId || req.params.brand_id;

    // If no brand_id in URL, just allow Brand General/Manager access
    if (!brand_id) {
      return next();
    }

    const brand = await Brand.findByPk(brand_id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    if (brand.owner_id === user.id) {
      return next();
    }

    return res.status(403).json({ error: 'No permission for this brand' });
  }

  return res.status(403).json({ error: 'Brand manager access only' });
}

/**
 * Restaurant manager permission check
 */
function isRestaurantManager(req, res, next) {
  const user = req.user;

  if (user.role === 'System Admin') {
    return next();
  }

  if (user.role === 'Restaurant Admin' && user.restaurant_id) {
    return next();
  }

  return res.status(403).json({ error: 'Restaurant admin access only' });
}

module.exports = {
  canEditRecipe,
  canViewRecipe,
  isBrandManager,
  isRestaurantManager
};
