const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { FoodcourtUnit, Contract, Foodcourt, FoodcourtBranch } = require('../models');

// List units for a foodcourt (optionally filter by branch_id)
router.get('/:foodcourtId/units', authenticateToken, async (req, res, next) => {
  try {
    if (req.user.role !== 'System Admin' && req.user.foodcourt_id !== parseInt(req.params.foodcourtId)) {
      return res.status(403).json({ success: false, message: 'No access to this foodcourt' });
    }

    const where = { foodcourt_id: req.params.foodcourtId };
    if (req.query.branch_id) where.branch_id = Number(req.query.branch_id);

    const units = await FoodcourtUnit.findAll({
      where,
      include: [
        { model: Contract, as: 'currentContract', attributes: ['id', 'applicant_company_name', 'applicant_contact_person', 'stage', 'start_date', 'end_date'], required: false },
        { model: FoodcourtBranch, as: 'branch', attributes: ['id', 'name', 'code', 'status'], required: false }
      ],
      order: [['unit_number', 'ASC']]
    });

    res.json({ success: true, data: units });
  } catch (error) { next(error); }
});

// Create unit — branch_id 필수, (branch_id, unit_number) 유일성 검증
router.post('/:foodcourtId/units', authenticateToken, async (req, res, next) => {
  try {
    if (req.user.role !== 'System Admin' && req.user.foodcourt_id !== parseInt(req.params.foodcourtId)) {
      return res.status(403).json({ success: false, message: 'No access' });
    }

    const branchId = req.body.branch_id;
    if (!branchId) {
      return res.status(400).json({ success: false, message: 'branch_id is required' });
    }

    const branch = await FoodcourtBranch.findByPk(branchId);
    if (!branch) return res.status(400).json({ success: false, message: 'Branch not found' });
    if (branch.foodcourt_id !== Number(req.params.foodcourtId)) {
      return res.status(400).json({ success: false, message: 'Branch does not belong to this foodcourt' });
    }
    if (branch.status === 'inactive') {
      return res.status(400).json({ success: false, message: 'Cannot add units to an inactive branch' });
    }

    // (branch_id, unit_number) uniqueness
    if (req.body.unit_number) {
      const dup = await FoodcourtUnit.findOne({
        where: { branch_id: branchId, unit_number: req.body.unit_number }
      });
      if (dup) return res.status(400).json({ success: false, message: `Unit '${req.body.unit_number}' already exists in branch ${branch.code}` });
    }

    const unit = await FoodcourtUnit.create({
      foodcourt_id: req.params.foodcourtId,
      branch_id: branchId,
      unit_number: req.body.unit_number,
      size_value: req.body.size_value,
      size_unit: req.body.size_unit || 'sqft',
      location_description: req.body.location_description
    });

    res.status(201).json({ success: true, data: unit });
  } catch (error) { next(error); }
});

// Update unit — branch_id 이동 허용 (같은 foodcourt 내)
router.put('/:foodcourtId/units/:unitId', authenticateToken, async (req, res, next) => {
  try {
    if (req.user.role !== 'System Admin' && req.user.foodcourt_id !== parseInt(req.params.foodcourtId)) {
      return res.status(403).json({ success: false, message: 'No access' });
    }

    const unit = await FoodcourtUnit.findOne({
      where: { id: req.params.unitId, foodcourt_id: req.params.foodcourtId }
    });
    if (!unit) return res.status(404).json({ success: false, message: 'Unit not found' });

    const updates = {};
    const { unit_number, size_value, size_unit, location_description, status, branch_id } = req.body;

    if (branch_id !== undefined) {
      const branch = await FoodcourtBranch.findByPk(branch_id);
      if (!branch) return res.status(400).json({ success: false, message: 'Branch not found' });
      if (branch.foodcourt_id !== Number(req.params.foodcourtId)) {
        return res.status(400).json({ success: false, message: 'Branch does not belong to this foodcourt' });
      }
      updates.branch_id = branch_id;
    }
    const targetBranchId = updates.branch_id ?? unit.branch_id;
    const targetUnitNumber = (unit_number !== undefined) ? unit_number : unit.unit_number;

    // Duplicate check on new (branch_id, unit_number)
    if (targetBranchId && (updates.branch_id !== undefined || unit_number !== undefined)) {
      const dup = await FoodcourtUnit.findOne({
        where: { branch_id: targetBranchId, unit_number: targetUnitNumber }
      });
      if (dup && dup.id !== unit.id) {
        return res.status(400).json({ success: false, message: `Unit number '${targetUnitNumber}' already exists in target branch` });
      }
    }

    if (unit_number !== undefined) updates.unit_number = unit_number;
    if (size_value !== undefined) updates.size_value = size_value;
    if (size_unit !== undefined) updates.size_unit = size_unit;
    if (location_description !== undefined) updates.location_description = location_description;
    if (status !== undefined) updates.status = status;

    await unit.update(updates);
    res.json({ success: true, data: unit });
  } catch (error) { next(error); }
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
  } catch (error) { next(error); }
});

module.exports = router;
