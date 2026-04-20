const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole, getManagerScope } = require('../middleware/auth');
const { FoodcourtFloorPlan, FoodcourtBranch, FoodcourtUnit } = require('../models');

// Access helper — only Foodcourt General/Manager of owning foodcourt + System Admin
async function assertBranchAccess(req, branchId) {
  const branch = await FoodcourtBranch.findByPk(branchId);
  if (!branch) return { ok: false, status: 404, message: 'Branch not found' };

  const user = req.user;
  if (user.role === 'System Admin') return { ok: true, branch };

  if (!['Foodcourt General', 'Foodcourt Manager'].includes(user.role)) {
    return { ok: false, status: 403, message: 'No access' };
  }
  if (Number(user.foodcourt_id) !== Number(branch.foodcourt_id)) {
    return { ok: false, status: 403, message: 'Not your foodcourt' };
  }
  // Branch-scoped Foodcourt Manager
  const scope = getManagerScope(user);
  if (scope.scoped && scope.branch_id && scope.branch_id !== branch.id) {
    return { ok: false, status: 403, message: 'Not your branch' };
  }
  return { ok: true, branch };
}

// List floor plans for a branch
// GET /api/foodcourt-branches/:branchId/floor-plans
router.get('/foodcourt-branches/:branchId/floor-plans', authenticateToken, async (req, res, next) => {
  try {
    const access = await assertBranchAccess(req, req.params.branchId);
    if (!access.ok) return res.status(access.status).json({ success: false, message: access.message });

    const plans = await FoodcourtFloorPlan.findAll({
      where: { branch_id: req.params.branchId },
      include: [{
        model: FoodcourtUnit,
        as: 'units',
        attributes: ['id', 'unit_number', 'status', 'plan_x', 'plan_y', 'plan_width', 'plan_height', 'plan_shape', 'location_description', 'current_contract_id']
      }],
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });
    res.json({ success: true, data: plans });
  } catch (e) { next(e); }
});

// Create floor plan
router.post('/foodcourt-branches/:branchId/floor-plans',
  authenticateToken,
  requireRole('System Admin', 'Foodcourt General'),
  async (req, res, next) => {
    try {
      const access = await assertBranchAccess(req, req.params.branchId);
      if (!access.ok) return res.status(access.status).json({ success: false, message: access.message });

      const body = req.body || {};
      if (!body.floor_name || !String(body.floor_name).trim()) {
        return res.status(400).json({ success: false, message: 'Floor name is required' });
      }
      const plan = await FoodcourtFloorPlan.create({
        branch_id: req.params.branchId,
        floor_name: String(body.floor_name).trim(),
        image_url: body.image_url || null,
        sort_order: body.sort_order != null ? Number(body.sort_order) : 0,
        notes: body.notes || null,
        canvas_width: body.canvas_width != null ? Number(body.canvas_width) : 1200,
        canvas_height: body.canvas_height != null ? Number(body.canvas_height) : 800,
        grid_size: body.grid_size != null ? Number(body.grid_size) : 20,
        show_grid: body.show_grid != null ? !!body.show_grid : true
      });
      res.status(201).json({ success: true, data: plan });
    } catch (e) { next(e); }
  }
);

// Update floor plan
router.put('/foodcourt-floor-plans/:id',
  authenticateToken,
  requireRole('System Admin', 'Foodcourt General'),
  async (req, res, next) => {
    try {
      const plan = await FoodcourtFloorPlan.findByPk(req.params.id);
      if (!plan) return res.status(404).json({ success: false, message: 'Floor plan not found' });

      const access = await assertBranchAccess(req, plan.branch_id);
      if (!access.ok) return res.status(access.status).json({ success: false, message: access.message });

      const body = req.body || {};
      const updates = {};
      ['floor_name', 'image_url', 'sort_order', 'notes',
       'canvas_width', 'canvas_height', 'grid_size', 'show_grid'].forEach(k => {
        if (k in body) updates[k] = body[k];
      });
      await plan.update(updates);
      res.json({ success: true, data: plan });
    } catch (e) { next(e); }
  }
);

// Delete floor plan — units on it get floor_plan_id=null (SET NULL FK)
router.delete('/foodcourt-floor-plans/:id',
  authenticateToken,
  requireRole('System Admin', 'Foodcourt General'),
  async (req, res, next) => {
    try {
      const plan = await FoodcourtFloorPlan.findByPk(req.params.id);
      if (!plan) return res.status(404).json({ success: false, message: 'Floor plan not found' });

      const access = await assertBranchAccess(req, plan.branch_id);
      if (!access.ok) return res.status(access.status).json({ success: false, message: access.message });

      await plan.destroy();
      res.json({ success: true, message: 'Floor plan deleted' });
    } catch (e) { next(e); }
  }
);

// Place unit on floor plan (set position, size, shape)
// PUT /api/foodcourt-units/:unitId/plan-position
router.put('/foodcourt-units/:unitId/plan-position',
  authenticateToken,
  async (req, res, next) => {
    try {
      const unit = await FoodcourtUnit.findByPk(req.params.unitId);
      if (!unit) return res.status(404).json({ success: false, message: 'Unit not found' });

      const access = await assertBranchAccess(req, unit.branch_id);
      if (!access.ok) return res.status(access.status).json({ success: false, message: access.message });

      const { floor_plan_id, plan_x, plan_y, plan_width, plan_height, plan_shape } = req.body || {};

      if (floor_plan_id != null) {
        const plan = await FoodcourtFloorPlan.findByPk(floor_plan_id);
        if (!plan) return res.status(400).json({ success: false, message: 'Floor plan not found' });
        if (plan.branch_id !== unit.branch_id) {
          return res.status(400).json({ success: false, message: 'Floor plan belongs to a different branch' });
        }
      }

      const num = (v) => (v == null || v === '') ? null : Number(v);
      const updates = {
        floor_plan_id: floor_plan_id != null ? Number(floor_plan_id) : null,
        plan_x: num(plan_x),
        plan_y: num(plan_y)
      };
      if (plan_width !== undefined) updates.plan_width = num(plan_width);
      if (plan_height !== undefined) updates.plan_height = num(plan_height);
      if (plan_shape !== undefined) updates.plan_shape = (plan_shape === 'circle' ? 'circle' : 'rect');

      await unit.update(updates);
      res.json({ success: true, data: unit });
    } catch (e) { next(e); }
  }
);

// Batch save unit positions for a floor plan — Save button in editor
// PUT /api/foodcourt-floor-plans/:id/layout
// Body: { units: [{ id, plan_x, plan_y, plan_width, plan_height, plan_shape }], unplace_ids: [id, ...] }
router.put('/foodcourt-floor-plans/:id/layout',
  authenticateToken,
  async (req, res, next) => {
    try {
      const plan = await FoodcourtFloorPlan.findByPk(req.params.id);
      if (!plan) return res.status(404).json({ success: false, message: 'Floor plan not found' });

      const access = await assertBranchAccess(req, plan.branch_id);
      if (!access.ok) return res.status(access.status).json({ success: false, message: access.message });

      const { units = [], unplace_ids = [] } = req.body || {};

      // Verify all target units belong to the same branch
      const targetIds = [...units.map(u => u.id), ...unplace_ids];
      if (targetIds.length > 0) {
        const check = await FoodcourtUnit.findAll({
          where: { id: targetIds, branch_id: plan.branch_id },
          attributes: ['id']
        });
        if (check.length !== targetIds.length) {
          return res.status(400).json({ success: false, message: 'Some units do not belong to this branch' });
        }
      }

      // Apply placements
      for (const u of units) {
        await FoodcourtUnit.update({
          floor_plan_id: plan.id,
          plan_x: u.plan_x != null ? Number(u.plan_x) : null,
          plan_y: u.plan_y != null ? Number(u.plan_y) : null,
          plan_width: u.plan_width != null ? Number(u.plan_width) : null,
          plan_height: u.plan_height != null ? Number(u.plan_height) : null,
          plan_shape: u.plan_shape === 'circle' ? 'circle' : 'rect'
        }, { where: { id: u.id } });
      }

      // Apply unplacements
      if (unplace_ids.length > 0) {
        await FoodcourtUnit.update({
          floor_plan_id: null, plan_x: null, plan_y: null,
          plan_width: null, plan_height: null
        }, { where: { id: unplace_ids } });
      }

      res.json({ success: true, applied: units.length, unplaced: unplace_ids.length });
    } catch (e) { next(e); }
  }
);

// Unit detail with current contract info — for floor plan click popup
// GET /api/foodcourt-units/:unitId/detail
router.get('/foodcourt-units/:unitId/detail',
  authenticateToken,
  async (req, res, next) => {
    try {
      const { Contract, Restaurant } = require('../models');
      const unit = await FoodcourtUnit.findByPk(req.params.unitId, {
        include: [
          { model: Contract, as: 'currentContract',
            attributes: ['id', 'contract_number', 'stage', 'contract_type',
                         'applicant_company_name', 'applicant_contact_person',
                         'applicant_email', 'applicant_phone',
                         'start_date', 'end_date', 'financial_terms',
                         'restaurant_id'],
            include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'branch_name', 'status', 'logo_url'] }]
          }
        ]
      });
      if (!unit) return res.status(404).json({ success: false, message: 'Unit not found' });

      const access = await assertBranchAccess(req, unit.branch_id);
      if (!access.ok) return res.status(access.status).json({ success: false, message: access.message });

      res.json({ success: true, data: unit });
    } catch (e) { next(e); }
  }
);

module.exports = router;
