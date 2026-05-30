const express = require('express');
const router = express.Router();
const OptionGroup = require('../models/OptionGroup');
const Option = require('../models/Option');
const { OptionIngredient, Ingredient } = require('../models');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Get all option groups with their options
router.get('/', async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user?.restaurant_id;

    // Build where clause
    const whereClause = { isActive: true };
    if (restaurantId) {
      whereClause.restaurant_id = restaurantId;
    }

    const optionGroups = await OptionGroup.findAll({
      where: whereClause,
      include: [{
        model: Option,
        as: 'options',
        where: { isActive: true },
        required: false,
        include: [{
          model: OptionIngredient,
          as: 'optionIngredients',
          include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'name', 'unit', 'unit_cost'] }]
        }]
      }],
      order: [
        ['created_at', 'DESC'],
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    // Transform to match frontend format
    const transformed = optionGroups.map(group => ({
      id: group.id.toString(),
      name: group.name,
      required: group.required,
      multiple: group.multiple,
      options: group.options ? group.options.map(opt => ({
        id: opt.id.toString(),
        name: opt.name,
        price: parseFloat(opt.price),
        ingredient_id: opt.optionIngredients?.[0]?.ingredient_id || null,
        ingredient_name: opt.optionIngredients?.[0]?.ingredient?.name || null,
        ingredient_quantity: opt.optionIngredients?.[0]?.quantity ? parseFloat(opt.optionIngredients[0].quantity) : null,
        ingredient_unit: opt.optionIngredients?.[0]?.ingredient?.unit || null
      })) : []
    }));

    res.json({ success: true, data: transformed });
  } catch (error) {
    console.error('Error fetching option groups:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single option group
router.get('/:id', async (req, res) => {
  try {
    const optionGroup = await OptionGroup.findOne({
      where: { id: req.params.id, isActive: true },
      include: [{
        model: Option,
        as: 'options',
        where: { isActive: true },
        required: false
      }],
      order: [
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    if (!optionGroup) {
      return res.status(404).json({ success: false, error: { message: 'Option group not found', code: 'NOT_FOUND' } });
    }

    res.json({ success: true, data: optionGroup });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create option group with options
router.post('/', async (req, res) => {
  try {
    const { name, required, multiple, options } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, error: { message: 'Option group name is required', code: 'VALIDATION_ERROR' } });
    }

    // Create option group (support both camelCase and snake_case)
    const optionGroup = await OptionGroup.create({
      name,
      required: required || false,
      multiple: multiple || false,
      restaurant_id: req.body.restaurantId || req.body.restaurant_id || null,
      isActive: true
    });

    // Create options if provided
    if (options && Array.isArray(options) && options.length > 0) {
      const optionsData = options.map((opt, index) => ({
        option_group_id: optionGroup.id,
        name: opt.name,
        price: opt.price || 0,
        displayOrder: index,
        isActive: true
      }));

      const createdOptions = await Option.bulkCreate(optionsData);

      // Save option_ingredients if provided
      for (let i = 0; i < options.length; i++) {
        if (options[i].ingredient_id && createdOptions[i]) {
          await OptionIngredient.create({
            option_id: createdOptions[i].id,
            ingredient_id: options[i].ingredient_id,
            quantity: options[i].ingredient_quantity || 1
          });
        }
      }
    }

    // Fetch the created group with options
    const createdGroup = await OptionGroup.findOne({
      where: { id: optionGroup.id },
      include: [{
        model: Option,
        as: 'options'
      }],
      order: [
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    res.status(201).json({
      success: true,
      data: {
        id: createdGroup.id.toString(),
        name: createdGroup.name,
        required: createdGroup.required,
        multiple: createdGroup.multiple,
        options: createdGroup.options.map(opt => ({
          id: opt.id.toString(),
          name: opt.name,
          price: parseFloat(opt.price)
        }))
      },
      message: 'Option group created successfully'
    });
  } catch (error) {
    console.error('Error creating option group:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update option group
router.put('/:id', async (req, res) => {
  try {
    const { name, required, multiple, options } = req.body;

    const optionGroup = await OptionGroup.findByPk(req.params.id);
    if (!optionGroup) {
      return res.status(404).json({ success: false, error: { message: 'Option group not found', code: 'NOT_FOUND' } });
    }

    // 브랜드 잠금 가드 (lock 갭 수정): 이 옵션그룹이 브랜드메뉴 미러이고, 이를 사용하는 상품 중
    // options 잠금이 걸린 게 있으면 레스토랑의 옵션 수정을 거부 → PUT /optionGroups 로 브랜드 잠금 우회 방지.
    if (optionGroup.brand_menu_option_group_id) {
      const { Op } = require('sequelize');
      const { Product } = require('../models');
      const consumers = await Product.findAll({
        where: { restaurant_id: optionGroup.restaurant_id, brand_menu_id: { [Op.ne]: null } },
        attributes: ['id', 'optionGroups', 'brand_menu_locks_snapshot']
      });
      const locked = consumers.some(p => {
        let ogs = p.optionGroups; try { if (typeof ogs === 'string') ogs = JSON.parse(ogs); if (typeof ogs === 'string') ogs = JSON.parse(ogs); } catch { ogs = []; }
        if (!Array.isArray(ogs) || !ogs.map(String).includes(String(optionGroup.id))) return false;
        let snap = p.brand_menu_locks_snapshot; try { if (typeof snap === 'string') snap = JSON.parse(snap); } catch { snap = {}; }
        return snap && snap.options === true;
      });
      if (locked) {
        return res.status(403).json({ success: false, message: 'These options are locked by the brand and cannot be edited at the restaurant level.', code: 'OPTION_LOCKED_BY_BRAND' });
      }
    }

    // Update option group
    await optionGroup.update({
      name: name || optionGroup.name,
      required: required !== undefined ? required : optionGroup.required,
      multiple: multiple !== undefined ? multiple : optionGroup.multiple
    });

    // Update options if provided
    if (options && Array.isArray(options)) {
      // Delete existing option_ingredients first
      const existingOptions = await Option.findAll({ where: { option_group_id: optionGroup.id } });
      for (const eo of existingOptions) {
        await OptionIngredient.destroy({ where: { option_id: eo.id } });
      }

      // Delete existing options
      await Option.destroy({
        where: { option_group_id: optionGroup.id }
      });

      // Create new options
      if (options.length > 0) {
        const optionsData = options.map((opt, index) => ({
          option_group_id: optionGroup.id,
          name: opt.name,
          price: opt.price || 0,
          displayOrder: index
        }));

        const createdOptions = await Option.bulkCreate(optionsData);

        // Save option_ingredients
        for (let i = 0; i < options.length; i++) {
          if (options[i].ingredient_id && createdOptions[i]) {
            await OptionIngredient.create({
              option_id: createdOptions[i].id,
              ingredient_id: options[i].ingredient_id,
              quantity: options[i].ingredient_quantity || 1
            });
          }
        }
      }
    }

    // Fetch updated group with options
    const updatedGroup = await OptionGroup.findOne({
      where: { id: optionGroup.id },
      include: [{
        model: Option,
        as: 'options'
      }],
      order: [
        [{ model: Option, as: 'options' }, 'displayOrder', 'ASC']
      ]
    });

    res.json({
      success: true,
      data: {
        id: updatedGroup.id.toString(),
        name: updatedGroup.name,
        required: updatedGroup.required,
        multiple: updatedGroup.multiple,
        options: updatedGroup.options.map(opt => ({
          id: opt.id.toString(),
          name: opt.name,
          price: parseFloat(opt.price)
        }))
      },
      message: 'Option group updated successfully'
    });
  } catch (error) {
    console.error('Error updating option group:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete option group (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const optionGroup = await OptionGroup.findByPk(req.params.id);
    if (!optionGroup) {
      return res.status(404).json({ success: false, error: { message: 'Option group not found', code: 'NOT_FOUND' } });
    }

    // Soft delete: set isActive to false
    await optionGroup.update({ isActive: false });

    // Also deactivate all options in this group
    await Option.update(
      { isActive: false },
      { where: { option_group_id: optionGroup.id } }
    );

    res.json({
      success: true,
      message: 'Option group deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting option group:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
