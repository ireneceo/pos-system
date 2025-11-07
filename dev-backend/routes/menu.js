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

    // Transform categories with emoji and id
    const categories = dbCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.emoji || '🍽️'
    }));

    // Transform products to ensure emoji and optionGroups are included
    const items = products.map(prod => ({
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      categoryId: prod.category,  // Use 'category' field from DB, map to 'categoryId'
      emoji: prod.emoji || '🍽️',
      image: prod.image,
      restaurant_id: prod.restaurant_id,
      soldOut: prod.soldOut || false,
      optionGroups: prod.optionGroups || []  // Include optionGroups data
    }));

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