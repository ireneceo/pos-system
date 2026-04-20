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
                       'phone', 'email', 'latitude', 'longitude', 'operating_hours', 'notes', 'status',
                       'unit_config'];
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

// Helper: generate unit_number list from unit_config.
// New format (preferred): zone = { prefix?, numbers: string }
//   numbers is comma/newline-separated list. Ranges supported:
//     "01-20"  → 01, 02, ..., 20
//     "A01-A10" → A01, A02, ..., A10
//     "P-2-01A, P-2-02A" → each entry used as-is
//   Optional prefix is prepended to every generated number.
// Backward compat: old zones with { template/count/start/padding } still supported.
function generateUnitNumbers(config) {
  if (!config || !config.enabled || !Array.isArray(config.zones)) return [];
  const out = [];
  for (const z of config.zones) {
    const prefix = String(z.prefix || '').trim();
    // Free-form list mode
    if (z.numbers != null && String(z.numbers).trim()) {
      const input = String(z.numbers).trim();
      const tokens = input.split(/[,\n]/).map(s => s.trim()).filter(Boolean);
      for (const token of tokens) {
        // Range: prefixNNN-prefixNNN or prefixNNNsuffix-prefixNNNsuffix
        const rangeMatch = token.match(/^(.*?)(\d+)(.*?)\s*-\s*(.*?)(\d+)(.*?)$/);
        if (rangeMatch && rangeMatch[1] === rangeMatch[4] && rangeMatch[3] === rangeMatch[6]) {
          const basePrefix = rangeMatch[1];
          const baseSuffix = rangeMatch[3];
          const start = parseInt(rangeMatch[2], 10);
          const end = parseInt(rangeMatch[5], 10);
          const padding = rangeMatch[2].length;
          if (end >= start && end - start <= 999) {
            for (let i = start; i <= end; i++) {
              out.push(prefix + basePrefix + String(i).padStart(padding, '0') + baseSuffix);
            }
            continue;
          }
        }
        out.push(prefix + token);
      }
      continue;
    }
    // Backward compat: pattern mode (template/count/padding/start)
    const template = String(z.template != null ? z.template : prefix).trim();
    const count = Math.max(0, Math.min(9999, parseInt(z.count, 10) || 0));
    const padding = Math.max(1, Math.min(6, parseInt(z.padding, 10) || 2));
    const startNum = Math.max(0, parseInt(z.start, 10) || 1);
    const hasPlaceholder = template.includes('{n}');
    for (let i = 0; i < count; i++) {
      const num = String(startNum + i).padStart(padding, '0');
      out.push(hasPlaceholder ? template.replace(/\{n\}/g, num) : `${template}${num}`);
    }
  }
  return out;
}

// POST /api/foodcourt-branches/:id/sync-units
// Body: { unit_config, confirm: bool }
// Preview (confirm=false): returns { to_create, to_delete_ok, blocked_by_contract }
// Apply (confirm=true): persists unit_config + creates/deletes units
router.post('/foodcourt-branches/:id/sync-units',
  authenticateToken,
  requireRole('System Admin', 'Foodcourt General'),
  async (req, res, next) => {
    try {
      const branch = await FoodcourtBranch.findByPk(req.params.id);
      if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });

      // Scope check
      const { getManagerScope } = require('../middleware/auth');
      const scope = getManagerScope(req.user);
      if (req.user.role !== 'System Admin') {
        if (Number(req.user.foodcourt_id) !== Number(branch.foodcourt_id)) {
          return res.status(403).json({ success: false, message: 'Not your foodcourt' });
        }
        if (scope.scoped && scope.branch_id && scope.branch_id !== branch.id) {
          return res.status(403).json({ success: false, message: 'Not your branch' });
        }
      }

      const { unit_config, confirm } = req.body || {};
      if (!unit_config || typeof unit_config !== 'object') {
        return res.status(400).json({ success: false, message: 'unit_config is required' });
      }

      const desiredNumbers = generateUnitNumbers(unit_config);
      const desiredSet = new Set(desiredNumbers);

      // Existing units in this branch
      const existing = await FoodcourtUnit.findAll({
        where: { branch_id: branch.id },
        attributes: ['id', 'unit_number', 'current_contract_id']
      });
      const existingSet = new Set(existing.map(u => u.unit_number));

      const to_create = desiredNumbers.filter(n => !existingSet.has(n));
      const candidates_to_delete = existing.filter(u => !desiredSet.has(u.unit_number));
      const to_delete_ok = candidates_to_delete.filter(u => !u.current_contract_id);
      const blocked_by_contract = candidates_to_delete
        .filter(u => u.current_contract_id)
        .map(u => ({ id: u.id, unit_number: u.unit_number }));

      // Duplicate unit_number within desired list → refuse
      if (desiredNumbers.length !== desiredSet.size) {
        return res.status(400).json({ success: false, message: 'Duplicate unit numbers in config (check zone prefixes)' });
      }

      if (!confirm) {
        return res.json({
          success: true,
          data: {
            to_create, to_delete_ok: to_delete_ok.map(u => u.unit_number),
            blocked_by_contract, total_after: desiredNumbers.length
          }
        });
      }

      // Apply — refuse if any contract-blocked
      if (blocked_by_contract.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete ${blocked_by_contract.length} unit(s) linked to active contracts. Terminate contracts first.`,
          blocked_by_contract
        });
      }

      // Transaction: save config, delete old, create new
      const { sequelize } = require('../config/database');
      const t = await sequelize.transaction();
      try {
        await branch.update({ unit_config }, { transaction: t });
        if (to_delete_ok.length > 0) {
          await FoodcourtUnit.destroy({ where: { id: to_delete_ok.map(u => u.id) }, transaction: t });
        }
        if (to_create.length > 0) {
          await FoodcourtUnit.bulkCreate(
            to_create.map(unit_number => ({
              foodcourt_id: branch.foodcourt_id,
              branch_id: branch.id,
              unit_number,
              status: 'vacant'
            })),
            { transaction: t }
          );
        }
        await t.commit();
        res.json({ success: true, data: { created: to_create.length, deleted: to_delete_ok.length } });
      } catch (e) {
        await t.rollback();
        throw e;
      }
    } catch (e) { next(e); }
  }
);

module.exports = router;
