const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole, getManagerScope } = require('../middleware/auth');
const { FoodcourtBranch, FoodcourtUnit, Foodcourt } = require('../models');

// Scope helper — Foodcourt General / Manager should only access their own foodcourt
function getFoodcourtScope(user) {
  if (user.role === 'System Admin') return { scope: 'all' };
  if (['Foodcourt General', 'Foodcourt Manager'].includes(user.role) && user.foodcourt_id) {
    return { scope: 'entity', foodcourt_id: user.foodcourt_id };
  }
  return null;
}

// List branches of a foodcourt
// GET /api/foodcourts/:foodcourtId/branches
router.get('/foodcourts/:foodcourtId/branches', authenticateToken, async (req, res, next) => {
  try {
    const scope = getFoodcourtScope(req.user);
    if (!scope) return res.status(403).json({ success: false, message: 'No access' });
    const foodcourtId = Number(req.params.foodcourtId);
    if (scope.scope === 'entity' && scope.foodcourt_id !== foodcourtId) {
      return res.status(403).json({ success: false, message: 'Not your foodcourt' });
    }

    const where = { foodcourt_id: foodcourtId };
    const mgrScope = getManagerScope(req.user);
    if (mgrScope.scoped && mgrScope.branch_id) where.id = mgrScope.branch_id;

    const branches = await FoodcourtBranch.findAll({
      where,
      include: [{ model: FoodcourtUnit, as: 'units', attributes: ['id', 'unit_number', 'status'] }],
      order: [['is_primary', 'DESC'], ['created_at', 'ASC']]
    });
    res.json({ success: true, data: branches });
  } catch (e) { next(e); }
});

// Create branch
// POST /api/foodcourts/:foodcourtId/branches
router.post('/foodcourts/:foodcourtId/branches',
  authenticateToken,
  requireRole('System Admin', 'Foodcourt General'),
  async (req, res, next) => {
    try {
      const scope = getFoodcourtScope(req.user);
      if (!scope) return res.status(403).json({ success: false, message: 'No access' });
      const foodcourtId = Number(req.params.foodcourtId);
      if (scope.scope === 'entity' && scope.foodcourt_id !== foodcourtId) {
        return res.status(403).json({ success: false, message: 'Not your foodcourt' });
      }

      const body = req.body || {};
      if (!body.name || !String(body.name).trim()) {
        return res.status(400).json({ success: false, message: 'Branch name is required' });
      }
      if (!body.code || !String(body.code).trim()) {
        return res.status(400).json({ success: false, message: 'Branch code is required' });
      }
      const code = String(body.code).trim().toUpperCase();
      if (!/^[A-Z0-9][A-Z0-9\-_]{0,49}$/.test(code)) {
        return res.status(400).json({ success: false, message: 'Branch code must be alphanumeric (A-Z, 0-9, - _), max 50 chars' });
      }

      // Duplicate code check within foodcourt
      const dup = await FoodcourtBranch.findOne({ where: { foodcourt_id: foodcourtId, code } });
      if (dup) return res.status(400).json({ success: false, message: `Branch code '${code}' already exists for this foodcourt` });

      const fc = await Foodcourt.findByPk(foodcourtId);
      if (!fc) return res.status(404).json({ success: false, message: 'Foodcourt not found' });

      const branch = await FoodcourtBranch.create({
        foodcourt_id: foodcourtId,
        name: String(body.name).trim(),
        code,
        status: body.status || 'active',
        address: body.address || null,
        city: body.city || null,
        state: body.state || null,
        postal_code: body.postal_code || null,
        country: body.country || fc.country,
        phone: body.phone || null,
        email: body.email || null,
        latitude: body.latitude != null ? body.latitude : null,
        longitude: body.longitude != null ? body.longitude : null,
        operating_hours: body.operating_hours || null,
        notes: body.notes || null
      });
      res.status(201).json({ success: true, data: branch });
    } catch (e) { next(e); }
  }
);

// Get branch detail
router.get('/foodcourt-branches/:id', authenticateToken, async (req, res, next) => {
  try {
    const scope = getFoodcourtScope(req.user);
    if (!scope) return res.status(403).json({ success: false, message: 'No access' });

    const branch = await FoodcourtBranch.findByPk(req.params.id, {
      include: [
        { model: Foodcourt, as: 'foodcourt', attributes: ['id', 'name', 'code'] },
        { model: FoodcourtUnit, as: 'units' }
      ]
    });
    if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
    if (scope.scope === 'entity' && scope.foodcourt_id !== branch.foodcourt_id) {
      return res.status(403).json({ success: false, message: 'Not your foodcourt' });
    }
    const mgrScope = getManagerScope(req.user);
    if (mgrScope.scoped && mgrScope.branch_id && branch.id !== mgrScope.branch_id) {
      return res.status(403).json({ success: false, message: 'No access to this branch' });
    }
    res.json({ success: true, data: branch });
  } catch (e) { next(e); }
});

// Update branch
router.put('/foodcourt-branches/:id',
  authenticateToken,
  requireRole('System Admin', 'Foodcourt General'),
  async (req, res, next) => {
    try {
      const scope = getFoodcourtScope(req.user);
      if (!scope) return res.status(403).json({ success: false, message: 'No access' });

      const branch = await FoodcourtBranch.findByPk(req.params.id);
      if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
      if (scope.scope === 'entity' && scope.foodcourt_id !== branch.foodcourt_id) {
        return res.status(403).json({ success: false, message: 'Not your foodcourt' });
      }

      const body = req.body || {};
      const updates = {};
      const allowed = ['name', 'address', 'city', 'state', 'postal_code', 'country',
                       'phone', 'email', 'latitude', 'longitude', 'operating_hours', 'notes', 'status'];
      for (const k of allowed) {
        if (k in body) updates[k] = body[k];
      }
      // Code update with validation
      if ('code' in body) {
        const code = String(body.code || '').trim().toUpperCase();
        if (!code) return res.status(400).json({ success: false, message: 'Branch code cannot be empty' });
        if (!/^[A-Z0-9][A-Z0-9\-_]{0,49}$/.test(code)) {
          return res.status(400).json({ success: false, message: 'Invalid branch code format' });
        }
        if (code !== branch.code) {
          const dup = await FoodcourtBranch.findOne({ where: { foodcourt_id: branch.foodcourt_id, code } });
          if (dup && dup.id !== branch.id) {
            return res.status(400).json({ success: false, message: `Branch code '${code}' already exists` });
          }
          updates.code = code;
        }
      }
      // is_primary protection — only System Admin can flip
      if ('is_primary' in body && req.user.role === 'System Admin') {
        updates.is_primary = !!body.is_primary;
      }

      await branch.update(updates);
      res.json({ success: true, data: branch });
    } catch (e) { next(e); }
  }
);

// Delete branch — System Admin only, blocked if units exist
router.delete('/foodcourt-branches/:id',
  authenticateToken,
  requireRole('System Admin'),
  async (req, res, next) => {
    try {
      const branch = await FoodcourtBranch.findByPk(req.params.id);
      if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
      if (branch.is_primary) return res.status(400).json({ success: false, message: 'Cannot delete primary branch' });

      const unitCount = await FoodcourtUnit.count({ where: { branch_id: branch.id } });
      if (unitCount > 0) {
        return res.status(400).json({ success: false, message: `Branch has ${unitCount} unit(s). Move or remove them first.` });
      }

      await branch.destroy();
      res.json({ success: true, message: 'Branch deleted' });
    } catch (e) { next(e); }
  }
);

module.exports = router;
