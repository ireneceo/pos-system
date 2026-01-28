const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const { authenticateToken } = require('../middleware/auth');
const { processImage, getImageUrl } = require('../utils/imageProcessor');

// Apply authentication to all routes
router.use(authenticateToken);

// Get all menu items
router.get('/', async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    // or from authenticated user (for restaurant users)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;
    const { page = 1, limit = 0, categoryId } = req.query; // limit 0 = all items (backward compatible)
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
      isActive: cat.isActive
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

      // Parse image data - support both old format (string) and new format (JSON with sizes)
      let imageData = null;
      if (prod.image) {
        try {
          // Try to parse as JSON (new format with multiple sizes)
          const parsed = JSON.parse(prod.image);
          imageData = parsed;
        } catch {
          // Old format - single image string
          imageData = { thumbnail: prod.image, medium: prod.image, original: prod.image };
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
        image: imageData?.medium || imageData?.original || null,  // Default to medium for admin
        imageThumbnail: imageData?.thumbnail || null,
        imageMedium: imageData?.medium || null,
        imageOriginal: imageData?.original || null,
        restaurant_id: prod.restaurant_id,
        soldOut: prod.soldOut || false,
        optionGroups: prod.optionGroups || [],  // Include optionGroups data
        // 세트 메뉴 관련 필드
        is_set_menu: prod.is_set_menu || false,
        set_items: prod.set_items || null,
        set_display_order: prod.set_display_order || 0,
        // 레시피 연결
        recipe_id: prod.recipe_id || null,
        // 활성화 상태
        is_active: prod.is_active !== false  // 기본값 true
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
router.get('/categories', async (req, res) => {
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
router.get('/product/:id', async (req, res) => {
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
router.post('/product', async (req, res) => {
  try {
    // Allow restaurantId from body or authenticated user (support both camelCase and snake_case)
    const restaurantId = req.body.restaurantId || req.body.restaurant_id || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
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

    // Process image if provided (generate thumbnail, medium, original)
    if (productData.image && productData.image.startsWith('data:image/')) {
      try {
        const processedImages = await processImage(productData.image);
        if (processedImages) {
          // Store as JSON with multiple sizes
          productData.image = JSON.stringify(processedImages);
          console.log('Image processed for new product');
        }
      } catch (imgError) {
        console.error('Image processing error:', imgError);
        // Keep original image if processing fails
      }
    }

    const product = await Product.create(productData);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update product
router.put('/product/:id', async (req, res) => {
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

    // Process image if provided and it's a new base64 image
    if (updateData.image && updateData.image.startsWith('data:image/')) {
      try {
        const processedImages = await processImage(updateData.image);
        if (processedImages) {
          // Store as JSON with multiple sizes
          updateData.image = JSON.stringify(processedImages);
          console.log('Image processed for product update:', req.params.id);
        }
      } catch (imgError) {
        console.error('Image processing error:', imgError);
        // Keep original image if processing fails
      }
    }

    await product.update(updateData);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Copy/Duplicate product
router.post('/product/:id/copy', async (req, res) => {
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
router.put('/product/:id/toggle-active', async (req, res) => {
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
router.delete('/product/:id', async (req, res) => {
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

    await product.destroy();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;