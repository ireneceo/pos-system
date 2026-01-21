const express = require('express');
const router = express.Router();
const { InvoiceCategory } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// Get all invoice categories
router.get('/', async (req, res) => {
  console.log('📂 [INVOICE-CATEGORIES] GET / called');
  try {
    const categories = await InvoiceCategory.findAll({
      where: { is_active: true },
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching invoice categories:', error);
    res.status(500).json({ error: 'Failed to fetch invoice categories' });
  }
});

// Get all invoice categories (including inactive) - admin only
router.get('/all', authenticateToken, async (req, res) => {
  try {
    const categories = await InvoiceCategory.findAll({
      order: [['display_order', 'ASC'], ['name', 'ASC']]
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching all invoice categories:', error);
    res.status(500).json({ error: 'Failed to fetch invoice categories' });
  }
});

// Create new invoice category
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, code, description, display_order } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }

    // Check for duplicate code
    const existing = await InvoiceCategory.findOne({ where: { code } });
    if (existing) {
      return res.status(400).json({ error: 'Category code already exists' });
    }

    const category = await InvoiceCategory.create({
      name,
      code: code.toLowerCase().replace(/\s+/g, '_'),
      description,
      display_order: display_order || 0,
      is_system: false,
      is_active: true
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating invoice category:', error);
    res.status(500).json({ error: 'Failed to create invoice category' });
  }
});

// Update invoice category
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description, display_order, is_active } = req.body;

    const category = await InvoiceCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Check for duplicate code (excluding current)
    if (code && code !== category.code) {
      const existing = await InvoiceCategory.findOne({
        where: {
          code,
          id: { [require('sequelize').Op.ne]: id }
        }
      });
      if (existing) {
        return res.status(400).json({ error: 'Category code already exists' });
      }
    }

    await category.update({
      name: name || category.name,
      code: code ? code.toLowerCase().replace(/\s+/g, '_') : category.code,
      description: description !== undefined ? description : category.description,
      display_order: display_order !== undefined ? display_order : category.display_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json(category);
  } catch (error) {
    console.error('Error updating invoice category:', error);
    res.status(500).json({ error: 'Failed to update invoice category' });
  }
});

// Delete invoice category
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const category = await InvoiceCategory.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Prevent deletion of system categories
    if (category.is_system) {
      return res.status(400).json({ error: 'Cannot delete system category' });
    }

    await category.destroy();
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice category:', error);
    res.status(500).json({ error: 'Failed to delete invoice category' });
  }
});

// Initialize default categories (run once)
router.post('/init', authenticateToken, async (req, res) => {
  try {
    const defaultCategories = [
      { name: 'Subscription', code: 'subscription', description: 'Monthly/Annual subscription plans', display_order: 1, is_system: true },
      { name: 'Service', code: 'service', description: 'One-time service fees', display_order: 2, is_system: true },
      { name: 'Consulting', code: 'consulting', description: 'Consulting and advisory services', display_order: 3, is_system: false },
      { name: 'Rent', code: 'rent', description: 'Rental fees for foodcourt tenants', display_order: 4, is_system: false },
      { name: 'Custom Service', code: 'custom_service', description: 'Custom development and services', display_order: 5, is_system: false },
      { name: 'Others', code: 'others', description: 'Other miscellaneous charges', display_order: 99, is_system: true }
    ];

    const created = [];
    for (const cat of defaultCategories) {
      const [category, wasCreated] = await InvoiceCategory.findOrCreate({
        where: { code: cat.code },
        defaults: cat
      });
      if (wasCreated) {
        created.push(category);
      }
    }

    res.json({
      message: `Initialized ${created.length} new categories`,
      created
    });
  } catch (error) {
    console.error('Error initializing invoice categories:', error);
    res.status(500).json({ error: 'Failed to initialize invoice categories' });
  }
});

module.exports = router;
