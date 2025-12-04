const { Recipe, Restaurant, Brand } = require('../models');

/**
 * 레시피 수정 권한 체크
 */
async function canEditRecipe(req, res, next) {
  try {
    const { recipe_id } = req.params;
    const user = req.user;

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: '레시피를 찾을 수 없습니다' });
    }

    // System Admin은 모든 것 가능
    if (user.role === 'System Admin') {
      return next();
    }

    // 브랜드 레시피인 경우
    if (recipe.brand_id) {
      // Brand General/Manager만 수정 가능
      if ((user.role === 'Brand General' || user.role === 'Brand Manager')
          && user.brand_id === recipe.brand_id) {
        return next();
      }
      return res.status(403).json({
        error: '브랜드 레시피는 브랜드 관리자만 수정할 수 있습니다'
      });
    }

    // 레스토랑 레시피인 경우
    if (recipe.restaurant_id) {
      // Restaurant Admin만 수정 가능
      if (user.role === 'Restaurant Admin'
          && user.restaurant_id === recipe.restaurant_id) {
        return next();
      }
      return res.status(403).json({
        error: '해당 레스토랑 관리자만 수정할 수 있습니다'
      });
    }

    return res.status(403).json({ error: '권한 없음' });
  } catch (error) {
    console.error('canEditRecipe error:', error);
    return res.status(500).json({ error: '권한 확인 중 오류가 발생했습니다' });
  }
}

/**
 * 레시피 조회 권한 체크
 */
async function canViewRecipe(req, res, next) {
  try {
    const { recipe_id } = req.params;
    const user = req.user;

    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) {
      return res.status(404).json({ error: '레시피를 찾을 수 없습니다' });
    }

    // System Admin은 모든 것 조회 가능
    if (user.role === 'System Admin') {
      return next();
    }

    // 브랜드 레시피
    if (recipe.brand_id) {
      // Brand General/Manager
      if ((user.role === 'Brand General' || user.role === 'Brand Manager')
          && user.brand_id === recipe.brand_id) {
        return next();
      }

      // 해당 브랜드의 가맹점 Restaurant Admin
      if (user.role === 'Restaurant Admin') {
        const restaurant = await Restaurant.findByPk(user.restaurant_id);
        if (restaurant && restaurant.brand_id === recipe.brand_id) {
          return next();
        }
      }

      return res.status(403).json({ error: '권한 없음' });
    }

    // 레스토랑 레시피
    if (recipe.restaurant_id) {
      if (user.role === 'Restaurant Admin'
          && user.restaurant_id === recipe.restaurant_id) {
        return next();
      }
      return res.status(403).json({ error: '권한 없음' });
    }

    return res.status(403).json({ error: '권한 없음' });
  } catch (error) {
    console.error('canViewRecipe error:', error);
    return res.status(500).json({ error: '권한 확인 중 오류가 발생했습니다' });
  }
}

/**
 * Brand 관리자 권한 체크
 * URL의 brand_id 파라미터를 사용하여 브랜드 소유권을 확인
 */
async function isBrandManager(req, res, next) {
  const user = req.user;

  if (user.role === 'System Admin') {
    return next();
  }

  if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    const { brand_id } = req.params;

    if (!brand_id) {
      return res.status(400).json({ error: 'brand_id가 필요합니다' });
    }

    // 브랜드의 owner_id가 현재 사용자인지 확인
    const brand = await Brand.findByPk(brand_id);
    if (!brand) {
      return res.status(404).json({ error: '브랜드를 찾을 수 없습니다' });
    }

    if (brand.owner_id === user.id) {
      return next();
    }

    return res.status(403).json({ error: '해당 브랜드에 대한 권한이 없습니다' });
  }

  return res.status(403).json({ error: '브랜드 관리자만 접근할 수 있습니다' });
}

/**
 * Restaurant 관리자 권한 체크
 */
function isRestaurantManager(req, res, next) {
  const user = req.user;

  if (user.role === 'System Admin') {
    return next();
  }

  if (user.role === 'Restaurant Admin' && user.restaurant_id) {
    return next();
  }

  return res.status(403).json({ error: '레스토랑 관리자만 접근할 수 있습니다' });
}

module.exports = {
  canEditRecipe,
  canViewRecipe,
  isBrandManager,
  isRestaurantManager
};
