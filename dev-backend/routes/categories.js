const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');
const { checkParent } = require('../utils/menuCategoryTree');

// Apply authentication to all routes
router.use(authenticateToken);

// Get all categories
// checkRestaurantAccess: query.restaurantId 교차테넌트 차단 (IDOR read, 2026-06-20 감사 P0).
router.get('/', checkRestaurantAccess, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
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
          parent_id: cat.parent_id ?? null,
          kitchen_station_id: cat.kitchen_station_id || null,
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
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }

    const oldName = category.name;
    const updateData = {};

    // 2단 카테고리 — 상위 바꾸기(parent_id 가 올 때만). 규칙은 utils/menuCategoryTree 한 곳.
    let parentToEmpty = null;
    if (req.body.parent_id !== undefined) {
      const nextParent = req.body.parent_id === '' ? null : req.body.parent_id;
      if (String(nextParent ?? '') !== String(category.parent_id ?? '')) {
        const chk = await checkParent(restaurantId, category, nextParent);
        if (!chk.ok) return res.status(chk.status).json({ success: false, message: chk.message, error: { message: chk.message, code: chk.code } });
        if (chk.parentMenuCount > 0) {
          if (req.body.move_menus !== true) {
            const msg = `"${chk.parent.name}" has ${chk.parentMenuCount} menu item(s). Move them into this subcategory to continue.`;
            return res.status(400).json({ success: false, message: msg, error: { message: msg, code: 'PARENT_HAS_MENUS', count: chk.parentMenuCount } });
          }
          parentToEmpty = chk.parent;
        }
        updateData.parent_id = chk.parent ? chk.parent.id : null;
        // 하위가 된 카테고리에 주방이 비어 있으면 상위 주방을 미리 채운다(주방 배정 코드는 그대로 이름만 본다).
        if (chk.parent && !category.kitchen_station_id && chk.parent.kitchen_station_id) {
          updateData.kitchen_station_id = chk.parent.kitchen_station_id;
        }
      }
    }

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
        return res.status(400).json({ success: false, error: { message: 'Category with this name already exists', code: 'VALIDATION_ERROR' } });
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

    // 상위 메뉴를 이 하위로 옮기기(사용자가 «옮기기» 를 고른 경우만) — 이름 바꾸기와 같은 일괄 변경.
    // 카테고리 행을 먼저 저장한 뒤에 옮긴다(products.category → categories.name 참조)
    let movedCount = 0;
    if (parentToEmpty) {
      const [n] = await Product.update(
        { category: updateData.name || oldName },
        { where: { category: parentToEmpty.name, restaurant_id: restaurantId } }
      );
      movedCount = n;
    }

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
      data: { id: categoryId, ...updateData, movedCount }
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
      return res.status(400).json({ success: false, error: { message: 'Categories array is required', code: 'VALIDATION_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: 'New category name is required', code: 'VALIDATION_ERROR' } });
    }

    // Check if new name already exists for this restaurant
    const existingCategory = await Category.findOne({
      where: {
        name: newName,
        restaurant_id: restaurantId
      }
    });

    if (existingCategory && newName !== oldName) {
      return res.status(400).json({ success: false, error: { message: 'Category with this name already exists', code: 'VALIDATION_ERROR' } });
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

    // 하위가 있는 카테고리는 지울 수 없다 — 하위를 먼저 옮기거나 지운다.
    const selfRow = await Category.findOne({ where: { name: categoryName, restaurant_id: restaurantId }, attributes: ['id'] });
    if (selfRow) {
      const childCount = await Category.count({ where: { restaurant_id: restaurantId, parent_id: selfRow.id } });
      if (childCount > 0) {
        const msg = 'This category has subcategories. Move or delete its subcategories first.';
        return res.status(400).json({ success: false, message: msg, error: { message: msg, code: 'CATEGORY_HAS_CHILDREN', count: childCount } });
      }
    }

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
      return res.status(400).json({ success: false, error: { message: 'Category name is required', code: 'VALIDATION_ERROR' } });
    }

    // 2단 카테고리 — 하위로 만들 때. 상위에 메뉴가 있으면 «옮기기»(move_menus) 없이 거절.
    const chk = await checkParent(restaurantId, null, req.body.parent_id);
    if (!chk.ok) return res.status(chk.status).json({ success: false, message: chk.message, error: { message: chk.message, code: chk.code } });
    if (chk.parentMenuCount > 0 && req.body.move_menus !== true) {
      const msg = `"${chk.parent.name}" has ${chk.parentMenuCount} menu item(s). Move them into the new subcategory to continue.`;
      return res.status(400).json({ success: false, message: msg, error: { message: msg, code: 'PARENT_HAS_MENUS', count: chk.parentMenuCount } });
    }

    // Check if category already exists for this restaurant
    const existingCategory = await Category.findOne({
      where: {
        name,
        restaurant_id: restaurantId
      }
    });

    if (existingCategory) {
      return res.status(400).json({ success: false, error: { message: 'Category already exists', code: 'VALIDATION_ERROR' } });
    }

    // Create category in categories table with restaurant_id
    const category = await Category.create({
      name,
      description: description || '',
      emoji: emoji || '',
      displayOrder: 0,
      isActive: true,
      restaurant_id: restaurantId,
      parent_id: chk.parent ? chk.parent.id : null,
      // 하위는 상위 주방을 미리 채워 저장 — 주방 배정 코드(🔒)는 변경 없이 이름만 본다.
      kitchen_station_id: chk.parent ? (chk.parent.kitchen_station_id || null) : null
    });

    let movedCount = 0;
    if (chk.parent && chk.parentMenuCount > 0) {
      const [n] = await Product.update(
        { category: category.name },
        { where: { category: chk.parent.name, restaurant_id: restaurantId } }
      );
      movedCount = n;
    }

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
      data: { id: category.id, name: category.name, parent_id: category.parent_id ?? null, productCount: movedCount, movedCount },
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
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
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
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
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