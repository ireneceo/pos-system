const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authenticateToken);

// Get all menu items
router.get('/', async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    // or from authenticated user (for restaurant users)
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

    // Get products
    const products = await Product.findAll({
      where: { restaurant_id: restaurantId }
    });

    // Transform categories with emoji, id, and displayOrder
    const categories = dbCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.emoji || '🍽️',
      displayOrder: cat.displayOrder
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

      return {
        id: prod.id,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        categoryId: categoryId,  // Use matched category ID
        emoji: prod.emoji || '🍽️',
        image: prod.image,
        restaurant_id: prod.restaurant_id,
        soldOut: prod.soldOut || false,
        optionGroups: prod.optionGroups || [],  // Include optionGroups data
        // 세트 메뉴 관련 필드
        is_set_menu: prod.is_set_menu || false,
        set_items: prod.set_items || null,
        set_display_order: prod.set_display_order || 0
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

    res.json({
      success: true,
      data: {
        categories,
        items
      }
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
    // Allow restaurantId from body or authenticated user
    const restaurantId = req.body.restaurant_id || req.user.restaurant_id;

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

    await product.update(updateData);
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
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