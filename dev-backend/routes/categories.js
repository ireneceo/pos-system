const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

// Apply authentication to all routes
router.use(authenticateToken);

// Get all categories
router.get('/', async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
    }

    // Get categories from categories table filtered by restaurant
    // 관리 페이지에서는 모든 카테고리 표시 (비활성화된 것도 포함)
    const categories = await Category.findAll({
      where: {
        restaurant_id: restaurantId
      },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    // Get product counts for each category
    const categoryData = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.count({
          where: {
            category: cat.name,
            restaurant_id: restaurantId
          }
        });
        return {
          id: cat.id,
          name: cat.name,
          emoji: cat.emoji || '🍽️',
          description: cat.description,
          displayOrder: cat.displayOrder,
          isActive: cat.isActive,
          productCount: count
        };
      })
    );

    res.json({ success: true, data: categoryData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get products by category
router.get('/:categoryName/products', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const restaurantId = req.user.restaurant_id;

    const products = await Product.findAll({
      where: {
        category: categoryName,
        restaurant_id: restaurantId
      }
    });

    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update category by ID (supports emoji, name, description)
router.put('/id/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, emoji, description } = req.body;
    const restaurantId = req.user.restaurant_id;

    // Find the category
    const category = await Category.findOne({
      where: {
        id: categoryId,
        restaurant_id: restaurantId
      }
    });

    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    const oldName = category.name;
    const updateData = {};

    // Check if name is being changed
    if (name && name !== oldName) {
      // Check if new name already exists
      const existingCategory = await Category.findOne({
        where: {
          name: name,
          restaurant_id: restaurantId
        }
      });

      if (existingCategory) {
        return res.status(400).json({
          success: false,
          error: 'Category with this name already exists'
        });
      }

      updateData.name = name;

      // Update all products in the category
      await Product.update(
        { category: name },
        {
          where: {
            category: oldName,
            restaurant_id: restaurantId
          }
        }
      );
    }

    // Add emoji and description to update
    if (emoji !== undefined) updateData.emoji = emoji;
    if (description !== undefined) updateData.description = description;

    // Update category
    await Category.update(
      updateData,
      {
        where: {
          id: categoryId,
          restaurant_id: restaurantId
        }
      }
    );

    logActivity(req, {
      action_type: 'update',
      entity_type: 'category',
      entity_id: categoryId,
      entity_name: updateData.name || oldName,
      changes: { before: { name: oldName }, after: updateData },
      description: `Updated category "${oldName}"${updateData.name ? ` → "${updateData.name}"` : ''}`,
      restaurant_id: restaurantId
    });

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { id: categoryId, ...updateData }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update category display orders (reorder) - MUST BE BEFORE /:oldName
router.put('/reorder', async (req, res) => {
  try {
    const { categories } = req.body;
    const restaurantId = req.user.restaurant_id;

    console.log('🔄 Reorder categories API called');
    console.log('   Restaurant ID:', restaurantId);
    console.log('   Categories:', JSON.stringify(categories));

    if (!Array.isArray(categories)) {
      return res.status(400).json({ success: false, error: 'Categories array is required' });
    }

    // Update each category's displayOrder
    await Promise.all(
      categories.map(async (cat) => {
        console.log(`   Updating category ${cat.id} (${cat.name}) to order ${cat.order}`);
        await Category.update(
          { displayOrder: cat.order },
          {
            where: {
              id: cat.id,
              restaurant_id: restaurantId
            }
          }
        );
      })
    );

    console.log('✓ Category order updated successfully');

    res.json({
      success: true,
      message: 'Category order updated successfully'
    });
  } catch (error) {
    console.error('✗ Reorder error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update category name (updates all products in that category) - Legacy endpoint
router.put('/:oldName', async (req, res) => {
  try {
    const { oldName } = req.params;
    const { newName } = req.body;
    const restaurantId = req.user.restaurant_id;

    if (!newName) {
      return res.status(400).json({ success: false, error: 'New category name is required' });
    }

    // Check if new name already exists for this restaurant
    const existingCategory = await Category.findOne({
      where: {
        name: newName,
        restaurant_id: restaurantId
      }
    });

    if (existingCategory && newName !== oldName) {
      return res.status(400).json({
        success: false,
        error: 'Category with this name already exists'
      });
    }

    // Update category in categories table
    await Category.update(
      { name: newName },
      {
        where: {
          name: oldName,
          restaurant_id: restaurantId
        }
      }
    );

    // Update all products in the category
    const result = await Product.update(
      { category: newName },
      {
        where: {
          category: oldName,
          restaurant_id: restaurantId
        }
      }
    );

    res.json({
      success: true,
      message: `Updated ${result[0]} products to category '${newName}'`,
      updatedCount: result[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete category (moves all products to 'Uncategorized')
router.delete('/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const restaurantId = req.user.restaurant_id;

    // Move all products to 'Uncategorized'
    const result = await Product.update(
      { category: 'Uncategorized' },
      {
        where: {
          category: categoryName,
          restaurant_id: restaurantId
        }
      }
    );

    // Delete category from categories table
    await Category.destroy({
      where: {
        name: categoryName,
        restaurant_id: restaurantId
      }
    });

    logActivity(req, {
      action_type: 'delete',
      entity_type: 'category',
      entity_name: categoryName,
      description: `Deleted category "${categoryName}" (${result[0]} items moved to Uncategorized)`,
      restaurant_id: restaurantId
    });

    res.json({
      success: true,
      message: `Moved ${result[0]} products to 'Uncategorized' and deleted category '${categoryName}'`,
      movedCount: result[0]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new category (without placeholder product)
router.post('/', async (req, res) => {
  try {
    const { name, description, emoji } = req.body;
    const restaurantId = req.user.restaurant_id;

    if (!name) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }

    // Check if category already exists for this restaurant
    const existingCategory = await Category.findOne({
      where: {
        name,
        restaurant_id: restaurantId
      }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: 'Category already exists'
      });
    }

    // Create category in categories table with restaurant_id
    const category = await Category.create({
      name,
      description: description || '',
      emoji: emoji || '',
      displayOrder: 0,
      isActive: true,
      restaurant_id: restaurantId
    });

    logActivity(req, {
      action_type: 'create',
      entity_type: 'category',
      entity_id: category.id,
      entity_name: category.name,
      description: `Created category "${category.name}"`,
      restaurant_id: restaurantId
    });

    res.status(201).json({
      success: true,
      data: { name: category.name, productCount: 0 },
      message: 'Category created successfully'
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Toggle category active status
router.put('/id/:categoryId/toggle-active', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const category = await Category.findOne({
      where: {
        id: categoryId,
        restaurant_id: restaurantId
      }
    });

    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    const newIsActive = !category.isActive;
    await Category.update(
      { isActive: newIsActive },
      { where: { id: categoryId, restaurant_id: restaurantId } }
    );

    res.json({
      success: true,
      data: { id: categoryId, isActive: newIsActive },
      message: `Category ${newIsActive ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get category statistics
router.get('/:categoryName/stats', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const restaurantId = req.user.restaurant_id;

    const products = await Product.findAll({
      where: {
        category: categoryName,
        restaurant_id: restaurantId
      }
    });

    if (products.length === 0) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    const totalProducts = products.length;
    const avgPrice = products.reduce((sum, p) => sum + parseFloat(p.price), 0) / totalProducts;
    const minPrice = Math.min(...products.map(p => parseFloat(p.price)));
    const maxPrice = Math.max(...products.map(p => parseFloat(p.price)));

    res.json({
      success: true,
      data: {
        categoryName,
        totalProducts,
        avgPrice: parseFloat(avgPrice.toFixed(2)),
        minPrice,
        maxPrice,
        products
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;