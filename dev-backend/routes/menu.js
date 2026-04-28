const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const { Recipe, RecipeIngredient, Ingredient } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');

// Local guard: enforce tenant isolation for `/product/:id` routes where
// `:id` is the **product** id. `checkRestaurantAccess` falls back to
// `req.params.id` as a restaurantId source — that is correct for routes like
// `/restaurants/:id` but produces 403 false-positives here. This local guard
// resolves the target restaurantId from query/body/user only and rejects
// non-System-Admin overrides. Handler-level WHERE `{ id, restaurant_id }`
// then enforces row-level ownership.
function checkProductTenant(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Authentication required' });
  if (req.user.role === 'System Admin') return next();

  const requested =
    req.query?.restaurantId || req.query?.restaurant_id ||
    req.body?.restaurantId || req.body?.restaurant_id;

  if (requested && parseInt(requested) !== parseInt(req.user.restaurant_id)) {
    return res.status(403).json({ error: 'Access denied to this restaurant' });
  }
  return next();
}
const { processImage, deleteOldImages } = require('../utils/imageProcessor');
const { logActivity } = require('../utils/activityLogger');

// Apply authentication to all routes
router.use(authenticateToken);

// Per-route tenant isolation: every endpoint that takes a restaurantId — whether
// from params, query, or body — must run through checkRestaurantAccess. The
// middleware was extended (middleware/auth.js) to resolve the target id from
// all three sources, closing the IDOR where an authenticated user could
// previously pass `restaurantId` in body/query to act on someone else's menu.

// Get all menu items
router.get('/', checkRestaurantAccess, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    // or from authenticated user (for restaurant users)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;
    const { page = 1, limit = 0, categoryId, excludeImage } = req.query; // limit 0 = all items (backward compatible)
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    // Get categories from categories table
    // 관리 페이지에서는 모든 카테고리 표시 (비활성화된 것도 포함)
    const dbCategories = await Category.findAll({
      where: {
        restaurant_id: restaurantId
      },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    // Build product query
    const productWhere = { restaurant_id: restaurantId };
    if (categoryId) {
      productWhere.category = categoryId;
    }

    // Get total count for pagination
    const totalCount = await Product.count({ where: productWhere });

    // Get products (with pagination if limit > 0)
    const queryOptions = {
      where: productWhere,
      order: [['id', 'ASC']]
    };

    if (limitNum > 0) {
      queryOptions.limit = limitNum;
      queryOptions.offset = (pageNum - 1) * limitNum;
    }

    const products = await Product.findAll(queryOptions);

    // Transform categories with emoji, id, displayOrder, and isActive
    const categories = dbCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.emoji || '🍽️',
      displayOrder: cat.displayOrder,
      isActive: cat.isActive,
      kitchen_station_id: cat.kitchen_station_id || null
    }));

    // Transform products to ensure emoji and optionGroups are included
    const items = products.map(prod => {
      // Find matching category by ID or name
      let categoryId = null;

      // Try to match by ID first (if category is a number)
      const categoryById = dbCategories.find(cat => cat.id.toString() === prod.category);
      if (categoryById) {
        categoryId = categoryById.id.toString();
      } else {
        // Try to match by name (if category is a string)
        const categoryByName = dbCategories.find(cat =>
          cat.name.toLowerCase().replace(/\s+/g, '_') === prod.category ||
          cat.name === prod.category
        );
        if (categoryByName) {
          categoryId = categoryByName.id.toString();
        } else {
          // Fallback: use the category value as-is
          categoryId = prod.category;
        }
      }

      // Parse image data - support URL format, old JSON format, and legacy base64
      let imageUrl = null;
      let thumbnailUrl = null;

      if (excludeImage === 'true') {
        // Skip image parsing entirely (for Reports etc. that only need names/categories)
        imageUrl = null;
        thumbnailUrl = null;
      } else if (prod.image) {
        // New URL format (starts with /uploads/)
        if (prod.image.startsWith('/uploads/')) {
          imageUrl = prod.image;
          thumbnailUrl = prod.image_thumbnail || prod.image.replace('/products/', '/products/thumbnails/');
        }
        // Old JSON format with multiple sizes
        else if (prod.image.startsWith('{')) {
          try {
            const parsed = JSON.parse(prod.image);
            imageUrl = parsed.medium || parsed.original || null;
            thumbnailUrl = parsed.thumbnail || imageUrl;
          } catch {
            imageUrl = prod.image;
            thumbnailUrl = prod.image;
          }
        }
        // Legacy base64 format
        else {
          imageUrl = prod.image;
          thumbnailUrl = prod.image_thumbnail || prod.image;
        }
      }

      return {
        id: prod.id,
        code: prod.code || null,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        categoryId: categoryId,  // Use matched category ID
        emoji: prod.emoji || '🍽️',
        image: imageUrl,
        imageThumbnail: thumbnailUrl,
        restaurant_id: prod.restaurant_id,
        soldOut: prod.soldOut || false,
        optionGroups: (() => {
          // Handle double-encoded JSON strings
          if (!prod.optionGroups) return [];
          try {
            let parsed = typeof prod.optionGroups === 'string'
              ? JSON.parse(prod.optionGroups)
              : prod.optionGroups;
            if (typeof parsed === 'string') {
              parsed = JSON.parse(parsed);
            }
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })(),  // Include optionGroups data
        // 세트 메뉴 관련 필드
        is_set_menu: prod.is_set_menu || false,
        set_items: prod.set_items || null,
        set_display_order: prod.set_display_order || 0,
        // 레시피 연결
        recipe_id: prod.recipe_id || null,
        // 활성화 상태
        is_active: prod.is_active !== false,  // 기본값 true
        // Kitchen Station 배정
        kitchen_station_id: prod.kitchen_station_id || null
      };
    });

    // 정렬: 같은 카테고리 내에서 세트 메뉴 우선
    items.sort((a, b) => {
      // 카테고리가 다르면 카테고리 순서대로
      if (a.categoryId !== b.categoryId) {
        return 0;
      }

      // 같은 카테고리 내에서
      // 1순위: 세트 메뉴 우선
      if (a.is_set_menu && !b.is_set_menu) return -1;
      if (!a.is_set_menu && b.is_set_menu) return 1;

      // 2순위: 세트 메뉴끼리는 set_display_order
      if (a.is_set_menu && b.is_set_menu) {
        return a.set_display_order - b.set_display_order;
      }

      // 3순위: 일반 메뉴끼리는 ID 순서 (생성 순)
      return a.id - b.id;
    });

    // Build response with pagination info if limit was specified
    const response = {
      success: true,
      data: {
        categories,
        items
      }
    };

    if (limitNum > 0) {
      const totalPages = Math.ceil(totalCount / limitNum);
      response.pagination = {
        page: pageNum,
        limit: limitNum,
        totalItems: totalCount,
        totalPages,
        hasMore: pageNum < totalPages
      };
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get categories only (lightweight endpoint for fast initial load)
router.get('/categories', checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    // Get categories from categories table
    const dbCategories = await Category.findAll({
      where: {
        restaurant_id: restaurantId,
        isActive: true
      },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    const categories = dbCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.emoji || '🍽️',
      displayOrder: cat.displayOrder
    }));

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single product
router.get('/product/:id', checkProductTenant, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create product
router.post('/product', checkRestaurantAccess, async (req, res) => {
  try {
    // Allow restaurantId from body or authenticated user (support both camelCase and snake_case)
    const restaurantId = req.body.restaurantId || req.body.restaurant_id || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    if (!req.body.name || !req.body.category) {
      return res.status(400).json({
        success: false,
        error: 'Name and category are required'
      });
    }

    // Check menu item limit
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (restaurant && restaurant.menu_item_limit && restaurant.menu_item_limit > 0) {
      const currentItemCount = await Product.count({
        where: { restaurant_id: restaurantId }
      });

      if (currentItemCount >= restaurant.menu_item_limit) {
        return res.status(403).json({
          success: false,
          error: `Menu item limit reached. Your plan allows up to ${restaurant.menu_item_limit} menu items.`,
          limit: restaurant.menu_item_limit,
          current: currentItemCount
        });
      }
    }

    // Set menu validation
    if (req.body.is_set_menu) {
      // Check if set_items exists and has at least one item
      if (!req.body.set_items || !Array.isArray(req.body.set_items) || req.body.set_items.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Set menu must contain at least one item'
        });
      }

      // Validate each set item structure
      for (const item of req.body.set_items) {
        if (!item.menuItemId || !item.name || !item.quantity || item.quantity < 1) {
          return res.status(400).json({
            success: false,
            error: 'Each set item must have menuItemId, name, and quantity (minimum 1)'
          });
        }
      }

      // Check for circular references (prevent sets containing other sets)
      const menuItemIds = req.body.set_items.map(item => item.menuItemId);
      const referencedProducts = await Product.findAll({
        where: {
          id: menuItemIds,
          restaurant_id: restaurantId
        }
      });

      const hasSetMenu = referencedProducts.some(prod => prod.is_set_menu === true);
      if (hasSetMenu) {
        return res.status(400).json({
          success: false,
          error: 'Set menu cannot contain other set menus'
        });
      }

      // Verify all referenced menu items exist
      if (referencedProducts.length !== menuItemIds.length) {
        return res.status(400).json({
          success: false,
          error: 'One or more referenced menu items do not exist'
        });
      }
    }

    // Automatically set restaurant_id from authenticated user
    const productData = {
      ...req.body,
      restaurant_id: restaurantId
    };

    // 이미지 처리: URL이면 그대로 저장, base64면 파일로 저장
    if (productData.image) {
      // 이미 URL 형식이면 그대로 사용
      if (productData.image.startsWith('/uploads/')) {
        // URL 형식 - 썸네일 URL도 설정
        if (!productData.image_thumbnail) {
          productData.image_thumbnail = productData.image.replace('/products/', '/products/thumbnails/');
        }
      }
      // base64 이미지면 파일로 저장
      else if (productData.image.startsWith('data:image/')) {
        try {
          const processedImages = await processImage(productData.image);
          if (processedImages && processedImages.original) {
            productData.image = processedImages.original;
            productData.image_thumbnail = processedImages.thumbnail;
          } else {
            // 저장 실패 시 이미지 필드 제거하여 빈 값으로 저장
            delete productData.image;
            delete productData.image_thumbnail;
            console.warn('Image processing failed on create — image field cleared');
          }
        } catch (imgError) {
          console.error('Image processing error:', imgError);
          delete productData.image;
          delete productData.image_thumbnail;
        }
      }
    }

    // Remove directIngredients from productData before creating product
    const directIngredients = productData.directIngredients;
    delete productData.directIngredients;

    const product = await Product.create(productData);

    // Auto-create recipe if directIngredients provided
    if (directIngredients && Array.isArray(directIngredients) && directIngredients.length > 0 && !product.recipe_id) {
      try {
        const recipe = await Recipe.create({
          name: `${product.name} (auto)`,
          owner_type: 'restaurant',
          restaurant_id: restaurantId,
          is_active: true,
          total_ingredient_cost: 0
        });

        let totalCost = 0;
        for (const di of directIngredients) {
          if (!di.ingredient_id || !di.quantity) continue;
          const ingredient = await Ingredient.findByPk(di.ingredient_id);
          if (!ingredient) continue;
          const cost = parseFloat(ingredient.unit_cost || 0) * parseFloat(di.quantity);
          await RecipeIngredient.create({
            recipe_id: recipe.id,
            ingredient_id: di.ingredient_id,
            quantity: di.quantity,
            unit: di.unit || ingredient.unit,
            cost: cost
          });
          totalCost += cost;
        }

        await recipe.update({ total_ingredient_cost: totalCost });
        await product.update({ recipe_id: recipe.id });
      } catch (recipeError) {
        console.error('Auto-recipe creation error:', recipeError.message);
        // Product is already created, recipe creation failure is non-fatal
      }
    }

    logActivity(req, {
      action_type: 'create',
      entity_type: 'menu_item',
      entity_id: product.id,
      entity_name: product.name,
      description: `Created menu item "${product.name}" in category "${product.category}"`,
      restaurant_id: restaurantId
    });

    // Reload to include recipe_id
    await product.reload();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update product
router.put('/product/:id', checkProductTenant, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Set menu validation (if updating to set menu or already is set menu)
    const willBeSetMenu = req.body.is_set_menu !== undefined ? req.body.is_set_menu : product.is_set_menu;

    if (willBeSetMenu) {
      const setItems = req.body.set_items !== undefined ? req.body.set_items : product.set_items;

      // Check if set_items exists and has at least one item
      if (!setItems || !Array.isArray(setItems) || setItems.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Set menu must contain at least one item'
        });
      }

      // Validate each set item structure
      for (const item of setItems) {
        if (!item.menuItemId || !item.name || !item.quantity || item.quantity < 1) {
          return res.status(400).json({
            success: false,
            error: 'Each set item must have menuItemId, name, and quantity (minimum 1)'
          });
        }
      }

      // Check for circular references (prevent sets containing other sets)
      const menuItemIds = setItems.map(item => item.menuItemId);

      // Exclude self from circular reference check
      const referencedProducts = await Product.findAll({
        where: {
          id: menuItemIds,
          restaurant_id: restaurantId
        }
      });

      const hasSetMenu = referencedProducts.some(prod => prod.is_set_menu === true);
      if (hasSetMenu) {
        return res.status(400).json({
          success: false,
          error: 'Set menu cannot contain other set menus'
        });
      }

      // Verify all referenced menu items exist
      if (referencedProducts.length !== menuItemIds.length) {
        return res.status(400).json({
          success: false,
          error: 'One or more referenced menu items do not exist'
        });
      }
    }

    // Prevent changing restaurant_id
    const updateData = { ...req.body };
    delete updateData.restaurant_id;

    // 이미지가 undefined이거나 빈 값이면 기존 값 유지 (덮어쓰기 방지)
    if (updateData.image === undefined || updateData.image === '' || updateData.image === null) {
      delete updateData.image;
    }
    if (updateData.image_thumbnail === undefined || updateData.image_thumbnail === '' || updateData.image_thumbnail === null) {
      delete updateData.image_thumbnail;
    }

    // 이전 이미지 파일 삭제 (새 이미지로 교체 시)
    if (updateData.image && product.image) {
      try {
        const oldImage = product.image;
        // JSON 형식이면 파싱하여 URL 추출
        if (oldImage.startsWith('{') || oldImage.startsWith('[')) {
          const parsed = JSON.parse(oldImage);
          const urls = typeof parsed === 'object' ? Object.values(parsed) : [parsed];
          await deleteOldImages(urls.filter(u => typeof u === 'string' && u.startsWith('/uploads/')));
        } else if (oldImage.startsWith('/uploads/')) {
          await deleteOldImages(oldImage);
        }
      } catch (e) { /* ignore parse errors */ }
    }

    // 이미지 처리: URL이면 그대로 저장, base64면 파일로 저장
    if (updateData.image) {
      // 이미 URL 형식이면 그대로 사용
      if (updateData.image.startsWith('/uploads/')) {
        // URL 형식 - 썸네일 URL도 설정
        if (!updateData.image_thumbnail) {
          updateData.image_thumbnail = updateData.image.replace('/products/', '/products/thumbnails/');
        }
      }
      // base64 이미지면 파일로 저장
      else if (updateData.image.startsWith('data:image/')) {
        try {
          const processedImages = await processImage(updateData.image);
          if (processedImages && processedImages.original) {
            updateData.image = processedImages.original;
            updateData.image_thumbnail = processedImages.thumbnail;
          } else {
            // 저장 실패 시 이미지 필드 제거하여 기존값 유지
            delete updateData.image;
            delete updateData.image_thumbnail;
            console.warn('Image processing failed on update — keeping existing image:', req.params.id);
          }
        } catch (imgError) {
          console.error('Image processing error:', imgError);
          delete updateData.image;
          delete updateData.image_thumbnail;
        }
      }
      // JSON 형식(이전 데이터)이면 그대로 유지 — 마이그레이션 스크립트가 처리
    }

    // Handle directIngredients: auto-create or update recipe
    const directIngredients = updateData.directIngredients;
    delete updateData.directIngredients;

    await product.update(updateData);

    if (directIngredients && Array.isArray(directIngredients)) {
      try {
        const rid = product.restaurant_id;
        if (directIngredients.length > 0) {
          let recipe;
          if (product.recipe_id) {
            // Update existing auto-recipe: clear old ingredients, add new
            recipe = await Recipe.findByPk(product.recipe_id);
            if (recipe) {
              await RecipeIngredient.destroy({ where: { recipe_id: recipe.id } });
            }
          }
          if (!recipe) {
            // Create new recipe
            recipe = await Recipe.create({
              name: `${product.name} (auto)`,
              owner_type: 'restaurant',
              restaurant_id: rid,
              is_active: true,
              total_ingredient_cost: 0
            });
            await product.update({ recipe_id: recipe.id });
          }

          let totalCost = 0;
          for (const di of directIngredients) {
            if (!di.ingredient_id || !di.quantity) continue;
            const ingredient = await Ingredient.findByPk(di.ingredient_id);
            if (!ingredient) continue;
            const cost = parseFloat(ingredient.unit_cost || 0) * parseFloat(di.quantity);
            await RecipeIngredient.create({
              recipe_id: recipe.id,
              ingredient_id: di.ingredient_id,
              quantity: di.quantity,
              unit: di.unit || ingredient.unit,
              cost: cost
            });
            totalCost += cost;
          }
          await recipe.update({ total_ingredient_cost: totalCost, name: `${product.name} (auto)` });
        } else if (directIngredients.length === 0 && product.recipe_id) {
          // Empty array = remove direct ingredients, but keep recipe_id if it was manually linked
          const recipe = await Recipe.findByPk(product.recipe_id);
          if (recipe && recipe.name.endsWith('(auto)')) {
            // Only remove auto-generated recipes
            await RecipeIngredient.destroy({ where: { recipe_id: recipe.id } });
            await recipe.destroy();
            await product.update({ recipe_id: null });
          }
        }
      } catch (recipeError) {
        console.error('Auto-recipe update error:', recipeError.message);
      }
    }

    logActivity(req, {
      action_type: 'update',
      entity_type: 'menu_item',
      entity_id: product.id,
      entity_name: product.name,
      description: `Updated menu item "${product.name}"`,
      restaurant_id: product.restaurant_id
    });

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Copy/Duplicate product
router.post('/product/:id/copy', checkProductTenant, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const sourceProduct = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!sourceProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    // Check menu item limit
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (restaurant && restaurant.menu_item_limit && restaurant.menu_item_limit > 0) {
      const currentItemCount = await Product.count({
        where: { restaurant_id: restaurantId }
      });

      if (currentItemCount >= restaurant.menu_item_limit) {
        return res.status(403).json({
          success: false,
          error: `Menu item limit reached. Your plan allows up to ${restaurant.menu_item_limit} menu items.`,
          limit: restaurant.menu_item_limit,
          current: currentItemCount
        });
      }
    }

    // Create copy with modified name
    const copyData = {
      restaurant_id: sourceProduct.restaurant_id,
      code: sourceProduct.code ? `${sourceProduct.code}-COPY` : null,
      name: `${sourceProduct.name} (Copy)`,
      price: sourceProduct.price,
      category: sourceProduct.category,
      description: sourceProduct.description,
      optionGroups: sourceProduct.optionGroups,
      image: sourceProduct.image,
      image_thumbnail: sourceProduct.image_thumbnail,
      emoji: sourceProduct.emoji,
      soldOut: false,
      is_active: true,
      track_stock: sourceProduct.track_stock,
      current_stock: 0,  // Reset stock for copy
      min_stock: sourceProduct.min_stock,
      stock_unit: sourceProduct.stock_unit,
      supplier_id: sourceProduct.supplier_id,
      unit_cost: sourceProduct.unit_cost,
      is_set_menu: sourceProduct.is_set_menu,
      set_items: sourceProduct.set_items,
      set_display_order: sourceProduct.set_display_order,
      recipe_id: sourceProduct.recipe_id
    };

    const newProduct = await Product.create(copyData);

    logActivity(req, {
      action_type: 'create',
      entity_type: 'menu_item',
      entity_id: newProduct.id,
      entity_name: newProduct.name,
      description: `Duplicated menu item "${sourceProduct.name}" as "${newProduct.name}"`,
      restaurant_id: sourceProduct.restaurant_id
    });

    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Menu item copied successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Toggle product active status
router.put('/product/:id/toggle-active', checkProductTenant, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const newActiveState = !product.is_active;
    await product.update({ is_active: newActiveState });

    res.json({
      success: true,
      data: {
        id: product.id,
        is_active: newActiveState
      },
      message: newActiveState ? 'Menu item activated' : 'Menu item deactivated'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete product
router.delete('/product/:id', checkProductTenant, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const productName = product.name;
    const productId = product.id;
    const productRestaurantId = product.restaurant_id;
    await product.destroy();

    logActivity(req, {
      action_type: 'delete',
      entity_type: 'menu_item',
      entity_id: productId,
      entity_name: productName,
      description: `Deleted menu item "${productName}"`,
      restaurant_id: productRestaurantId
    });

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;