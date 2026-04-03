const express = require('express');
const router = express.Router();
const { SystemProductCategory, SystemProduct } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

/**
 * GET /api/system-product-categories
 */
router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const categories = await SystemProductCategory.findAll({
      include: [{ model: SystemProduct, as: 'products', attributes: ['id'] }],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });

    const data = categories.map(cat => ({
      ...cat.toJSON(),
      product_count: cat.products ? cat.products.length : 0
    }));

    res.json({ success: true, data });
  } catch (error) {
    console.error('Get system product categories error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

/**
 * POST /api/system-product-categories
 */
router.post('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { name, description, emoji, sort_order, is_active } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const existing = await SystemProductCategory.findOne({ where: { name: name.trim() } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'A category with this name already exists' });
    }

    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await SystemProductCategory.max('sort_order');
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const category = await SystemProductCategory.create({
      name: name.trim(),
      description: description || null,
      emoji: emoji || null,
      sort_order: finalSortOrder,
      is_active: is_active !== false
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Create system product category error:', error);
    res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

/**
 * PUT /api/system-product-categories/:id
 */
router.put('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, emoji, sort_order, is_active } = req.body;

    const category = await SystemProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (name && name.trim() !== category.name) {
      const existing = await SystemProductCategory.findOne({ where: { name: name.trim() } });
      if (existing && existing.id !== parseInt(id)) {
        return res.status(400).json({ success: false, message: 'A category with this name already exists' });
      }
    }

    await category.update({
      name: name ? name.trim() : category.name,
      description: description !== undefined ? description : category.description,
      emoji: emoji !== undefined ? emoji : category.emoji,
      sort_order: sort_order !== undefined ? sort_order : category.sort_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Update system product category error:', error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

/**
 * PUT /api/system-product-categories/:id/reorder
 */
router.put('/:id/reorder', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { direction } = req.body;

    if (!direction || !['up', 'down'].includes(direction)) {
      return res.status(400).json({ success: false, message: 'direction must be up or down' });
    }

    const category = await SystemProductCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const allCategories = await SystemProductCategory.findAll({
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });

    const currentIndex = allCategories.findIndex(c => c.id === parseInt(id));
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= allCategories.length) {
      return res.status(400).json({ success: false, message: 'Cannot move further' });
    }

    const targetCategory = allCategories[targetIndex];
    const tempOrder = category.sort_order;
    await category.update({ sort_order: targetCategory.sort_order });
    await targetCategory.update({ sort_order: tempOrder });

    res.json({ success: true, message: 'Order changed successfully' });
  } catch (error) {
    console.error('Reorder system product category error:', error);
    res.status(500).json({ success: false, message: 'Failed to reorder category' });
  }
});

/**
 * DELETE /api/system-product-categories/:id
 */
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const category = await SystemProductCategory.findByPk(id, {
      include: [{ model: SystemProduct, as: 'products' }]
    });

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (category.products && category.products.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'This category has products. Please delete or move products first.'
      });
    }

    await category.destroy();
    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete system product category error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
});

module.exports = router;
