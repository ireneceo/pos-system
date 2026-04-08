const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { FoodcourtUnit, Contract, Foodcourt } = require('../models');

// List units for a foodcourt
router.get('/:foodcourtId/units', authenticateToken, async (req, res, next) => {
  try {
    // Verify access
    if (req.user.role !== 'System Admin' && req.user.foodcourt_id !== parseInt(req.params.foodcourtId)) {
      return res.status(403).json({ success: false, message: 'No access to this foodcourt' });
    }

    const units = await FoodcourtUnit.findAll({
      where: { foodcourt_id: req.params.foodcourtId },
      include: [{
        model: Contract,
        as: 'currentContract',
        attributes: ['id', 'applicant_name', 'stage', 'start_date', 'end_date'],
        required: false
      }],
      order: [['unit_number', 'ASC']]
    });

    res.json({ success: true, data: units });
  } catch (error) {
    next(error);
  }
});

// Create unit
router.post('/:foodcourtId/units', authenticateToken, async (req, res, next) => {
  try {
    if (req.user.role !== 'System Admin' && req.user.foodcourt_id !== parseInt(req.params.foodcourtId)) {
      return res.status(403).json({ success: false, message: 'No access' });
    }

    const unit = await FoodcourtUnit.create({
      foodcourt_id: req.params.foodcourtId,
      unit_number: req.body.unit_number,
      size_value: req.body.size_value,
      size_unit: req.body.size_unit || 'sqft',
      location_description: req.body.location_description
    });

    res.status(201).json({ success: true, data: unit });
  } catch (error) {
    next(error);
  }
});

// Update unit
router.put('/:foodcourtId/units/:unitId', authenticateToken, async (req, res, next) => {
  try {
    if (req.user.role !== 'System Admin' && req.user.foodcourt_id !== parseInt(req.params.foodcourtId)) {
      return res.status(403).json({ success: false, message: 'No access' });
    }

    const unit = await FoodcourtUnit.findOne({
      where: { id: req.params.unitId, foodcourt_id: req.params.foodcourtId }
    });
    if (!unit) return res.status(404).json({ success: false, message: 'Unit not found' });

    const { unit_number, size_value, size_unit, location_description, status } = req.body;
    await unit.update({ unit_number, size_value, size_unit, location_description, status });

    res.json({ success: true, data: unit });
  } catch (error) {
    next(error);
  }
});

// Delete unit
router.delete('/:foodcourtId/units/:unitId', authenticateToken, async (req, res, next) => {
  try {
    if (req.user.role !== 'System Admin' && req.user.foodcourt_id !== parseInt(req.params.foodcourtId)) {
      return res.status(403).json({ success: false, message: 'No access' });
    }

    const unit = await FoodcourtUnit.findOne({
      where: { id: req.params.unitId, foodcourt_id: req.params.foodcourtId }
    });
    if (!unit) return res.status(404).json({ success: false, message: 'Unit not found' });

    if (unit.status === 'occupied') {
      return res.status(400).json({ success: false, message: 'Cannot delete occupied unit' });
    }

    await unit.destroy();
    res.json({ success: true, message: 'Unit deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
