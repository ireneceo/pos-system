const express = require('express');
const router = express.Router();
const { SystemProductOptionGroup, SystemProductOption, SystemProductOptionGroupProduct } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

/**
 * GET /api/system-product-option-groups
 */
router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const optionGroups = await SystemProductOptionGroup.findAll({
      where: { is_active: true },
      include: [{ model: SystemProductOption, as: 'options', order: [['sort_order', 'ASC']] }],
      order: [['sort_order', 'ASC'], ['name', 'ASC']]
    });
    res.json({ success: true, data: optionGroups });
  } catch (error) {
    console.error('Get system product option groups error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch option groups' });
  }
});

/**
 * POST /api/system-product-option-groups
 */
router.post('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Option group name is required' });
    }

    let finalSortOrder = sort_order;
    if (finalSortOrder === undefined || finalSortOrder === null) {
      const maxOrder = await SystemProductOptionGroup.max('sort_order');
      finalSortOrder = (maxOrder || 0) + 1;
    }

    const optionGroup = await SystemProductOptionGroup.create({
      name: name.trim(),
      is_required: is_required || false,
      min_selections: min_selections || 0,
      max_selections: max_selections || 1,
      sort_order: finalSortOrder
    });

    if (options && options.length > 0) {
      for (let j = 0; j < options.length; j++) {
        const opt = options[j];
        await SystemProductOption.create({
          option_group_id: optionGroup.id,
          name: opt.name,
          price_adjustment: opt.price_adjustment || 0,
          sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
          is_active: opt.is_active !== false
        });
      }
    }

    const created = await SystemProductOptionGroup.findByPk(optionGroup.id, {
      include: [{ model: SystemProductOption, as: 'options' }]
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Create system product option group error:', error);
    res.status(500).json({ success: false, message: 'Failed to create option group' });
  }
});

/**
 * PUT /api/system-product-option-groups/:id
 */
router.put('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, is_required, min_selections, max_selections, sort_order, options } = req.body;

    const optionGroup = await SystemProductOptionGroup.findByPk(id);
    if (!optionGroup) {
      return res.status(404).json({ success: false, message: 'Option group not found' });
    }

    await optionGroup.update({
      name: name !== undefined ? name.trim() : optionGroup.name,
      is_required: is_required !== undefined ? is_required : optionGroup.is_required,
      min_selections: min_selections !== undefined ? min_selections : optionGroup.min_selections,
      max_selections: max_selections !== undefined ? max_selections : optionGroup.max_selections,
      sort_order: sort_order !== undefined ? sort_order : optionGroup.sort_order
    });

    if (options !== undefined) {
      await SystemProductOption.destroy({ where: { option_group_id: id } });
      if (options && options.length > 0) {
        for (let j = 0; j < options.length; j++) {
          const opt = options[j];
          await SystemProductOption.create({
            option_group_id: id,
            name: opt.name,
            price_adjustment: opt.price_adjustment || 0,
            sort_order: opt.sort_order !== undefined ? opt.sort_order : j,
            is_active: opt.is_active !== false
          });
        }
      }
    }

    const updated = await SystemProductOptionGroup.findByPk(id, {
      include: [{ model: SystemProductOption, as: 'options' }]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update system product option group error:', error);
    res.status(500).json({ success: false, message: 'Failed to update option group' });
  }
});

/**
 * DELETE /api/system-product-option-groups/:id
 */
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const optionGroup = await SystemProductOptionGroup.findByPk(id);
    if (!optionGroup) {
      return res.status(404).json({ success: false, message: 'Option group not found' });
    }

    const linkedProducts = await SystemProductOptionGroupProduct.count({ where: { option_group_id: id } });
    if (linkedProducts > 0) {
      return res.status(400).json({
        success: false,
        message: `This option group is linked to ${linkedProducts} product(s). Remove the link first.`
      });
    }

    await SystemProductOption.destroy({ where: { option_group_id: id } });
    await optionGroup.destroy();

    res.json({ success: true, message: 'Option group deleted successfully' });
  } catch (error) {
    console.error('Delete system product option group error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete option group' });
  }
});

module.exports = router;
