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
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
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
      return res.status(403).json({ success: false, error: { message: 'Only brand owner can edit brand recipes', code: 'FORBIDDEN' } });
    }

    // Restaurant recipe
    if (recipe.restaurant_id) {
      // Restaurant Admin can edit their own recipes
      if (user.role === 'Restaurant Admin'
          && user.restaurant_id === recipe.restaurant_id) {
        return next();
      }
      return res.status(403).json({ success: false, error: { message: 'Only restaurant admin can edit this recipe', code: 'FORBIDDEN' } });
    }

    return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });
  } catch (error) {
    console.error('canEditRecipe error:', error);
    return res.status(500).json({ success: false, error: { message: 'Error checking permissions', code: 'INTERNAL_ERROR' } });
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
      return res.status(404).json({ success: false, error: { message: 'Recipe not found', code: 'NOT_FOUND' } });
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

      return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });
    }

    // Restaurant recipe
    if (recipe.restaurant_id) {
      if (user.role === 'Restaurant Admin'
          && user.restaurant_id === recipe.restaurant_id) {
        return next();
      }
      return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });
    }

    return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });
  } catch (error) {
    console.error('canViewRecipe error:', error);
    return res.status(500).json({ success: false, error: { message: 'Error checking permissions', code: 'INTERNAL_ERROR' } });
  }
}

/**
 * Brand manager permission check
 * - System Admin: always allowed
 * - Brand General/Manager: must have brand_id in URL and own it (brands.owner_id === user.id)
 * - When URL has no brand_id, user.id must exist as an owner of at least one brand
 */
async function isBrandManager(req, res, next) {
  const user = req.user;

  if (user.role === 'System Admin') {
    return next();
  }

  if (user.role !== 'Brand General' && user.role !== 'Brand Manager') {
    return res.status(403).json({ success: false, message: 'Brand manager access only' });
  }

  const brand_id = req.params.brandId || req.params.brand_id;

  if (brand_id) {
    const brand = await Brand.findByPk(brand_id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    if (brand.owner_id !== user.id) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    return next();
  }

  // No URL brand_id — verify user owns at least one brand (prevents dangling BG from bypass)
  const ownsAny = await Brand.count({ where: { owner_id: user.id } });
  if (ownsAny === 0) {
    return res.status(403).json({ success: false, message: 'No brand owned by user' });
  }
  return next();
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

  return res.status(403).json({ success: false, error: { message: 'Restaurant admin access only', code: 'FORBIDDEN' } });
}

/**
 * Foodcourt manager permission check (mirror of isBrandManager)
 */
async function isFoodcourtManager(req, res, next) {
  const user = req.user;
  if (user.role === 'System Admin') return next();
  if (user.role !== 'Foodcourt General' && user.role !== 'Foodcourt Manager') {
    return res.status(403).json({ success: false, message: 'Foodcourt manager access only' });
  }
  const foodcourt_id = req.params.foodcourtId || req.params.foodcourt_id;
  if (foodcourt_id) {
    const Foodcourt = require('../models/Foodcourt');
    const fc = await Foodcourt.findByPk(foodcourt_id);
    if (!fc) return res.status(404).json({ success: false, message: 'Foodcourt not found' });
    if (fc.owner_id !== user.id) return res.status(404).json({ success: false, message: 'Foodcourt not found' });
    return next();
  }
  const Foodcourt = require('../models/Foodcourt');
  const ownsAny = await Foodcourt.count({ where: { owner_id: user.id } });
  if (ownsAny === 0) return res.status(403).json({ success: false, message: 'No foodcourt owned by user' });
  return next();
}

module.exports = {
  canEditRecipe,
  canViewRecipe,
  isBrandManager,
  isFoodcourtManager,
  isRestaurantManager
};
