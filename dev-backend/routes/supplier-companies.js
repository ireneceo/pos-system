/**
 * Supplier Companies — System Admin only management endpoints
 *
 * Sprint 1 (Supply Chain System) — SA can list, view, create, update, soft-delete
 * SupplierCompany rows. Owner must be a 'Supplier Admin' user; plan must target
 * 'supplier'. All endpoints require authenticateToken + requireRole('System Admin').
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  SupplierCompany,
  User,
  PlanTemplate,
  SupplierProduct
} = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { sanitizeString } = require('../middleware/validation');

// Whitelist of fields SA can update
const UPDATABLE_FIELDS = [
  // status / subscription
  'status', 'plan_id', 'plan_type', 'plan_amount', 'billing_cycle',
  'subscription_status', 'subscription_start', 'subscription_end',
  'trial_end_date', 'grace_period_start',
  // flags
  'is_demo', 'is_test',
  // company info
  'name', 'code', 'description', 'logo_url',
  'company_name', 'registration_no', 'trade_name', 'tax_no',
  // contact / address
  'email', 'phone', 'address', 'address_line_2', 'city', 'state',
  'postal_code', 'country', 'website', 'latitude', 'longitude',
  // banking
  'bank_name', 'bank_account', 'bank_account_name', 'currency'
];

const STRING_FIELDS = new Set([
  'name', 'code', 'description', 'company_name', 'registration_no',
  'trade_name', 'tax_no', 'email', 'phone', 'address', 'address_line_2',
  'city', 'state', 'postal_code', 'country', 'website',
  'bank_name', 'bank_account', 'bank_account_name'
]);

function applySanitize(payload) {
  const out = {};
  for (const key of Object.keys(payload)) {
    const val = payload[key];
    if (val === undefined) continue;
    if (STRING_FIELDS.has(key) && typeof val === 'string') {
      out[key] = sanitizeString(val);
    } else {
      out[key] = val;
    }
  }
  return out;
}

// All endpoints SA-only
router.use(authenticateToken, requireRole('System Admin'));

/**
 * GET /api/supplier-companies
 * List with pagination, status filter, and search by name/email/company_name.
 */
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit) || 50));
    const offset = (page - 1) * limit;

    const where = {};
    if (status) where.status = status;
    if (search && search.trim()) {
      const term = `%${search.trim()}%`;
      where[Op.or] = [
        { name: { [Op.like]: term } },
        { email: { [Op.like]: term } },
        { company_name: { [Op.like]: term } }
      ];
    }

    const { rows, count } = await SupplierCompany.findAndCountAll({
      where,
      include: [
        { model: User, as: 'owner', attributes: ['id', 'email', 'full_name', 'role'] },
        { model: PlanTemplate, as: 'plan', attributes: ['id', 'name', 'display_name', 'plan_target'] }
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (err) {
    console.error('GET /api/supplier-companies:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch supplier companies' });
  }
});

/**
 * GET /api/supplier-companies/:id
 * Full row + owner + plan + product count.
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await SupplierCompany.findByPk(id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'email', 'full_name', 'role'] },
        { model: PlanTemplate, as: 'plan', attributes: ['id', 'name', 'display_name', 'plan_target', 'included_modules'] }
      ]
    });

    if (!company) {
      return res.status(404).json({ success: false, message: 'Supplier company not found' });
    }

    let productCount = 0;
    if (SupplierProduct) {
      productCount = await SupplierProduct.count({ where: { supplier_company_id: id } });
    }

    res.json({
      success: true,
      data: {
        ...company.toJSON(),
        product_count: productCount
      }
    });
  } catch (err) {
    console.error('GET /api/supplier-companies/:id:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch supplier company' });
  }
});

/**
 * POST /api/supplier-companies
 * Create new supplier company. Owner must be a 'Supplier Admin' user; plan must
 * target 'supplier'.
 */
router.post('/', async (req, res) => {
  try {
    const { name, owner_user_id, plan_id } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ success: false, message: 'name is required' });
    }
    if (!owner_user_id) {
      return res.status(400).json({ success: false, message: 'owner_user_id is required' });
    }

    // Validate owner
    const owner = await User.findByPk(owner_user_id);
    if (!owner) {
      return res.status(400).json({ success: false, message: 'owner_user_id not found' });
    }
    if (owner.role !== 'Supplier Admin') {
      return res.status(400).json({
        success: false,
        message: "Owner user must have role 'Supplier Admin'"
      });
    }

    // Validate plan if provided
    if (plan_id) {
      const plan = await PlanTemplate.findByPk(plan_id);
      if (!plan) {
        return res.status(400).json({ success: false, message: 'plan_id not found' });
      }
      if (plan.plan_target !== 'supplier') {
        return res.status(400).json({
          success: false,
          message: "plan_id must target 'supplier'"
        });
      }
    }

    // Numeric guard
    const { plan_amount, latitude, longitude } = req.body;
    if (plan_amount !== undefined && plan_amount !== null && Number(plan_amount) < 0) {
      return res.status(400).json({ success: false, message: 'plan_amount must be >= 0' });
    }

    // Build payload via whitelist + sanitize
    const payload = {};
    for (const f of UPDATABLE_FIELDS) {
      if (req.body[f] !== undefined) payload[f] = req.body[f];
    }
    payload.name = name.trim();
    payload.owner_id = owner_user_id;
    if (plan_id) payload.plan_id = plan_id;

    const sanitized = applySanitize(payload);
    sanitized.latitude = latitude !== undefined ? latitude : sanitized.latitude;
    sanitized.longitude = longitude !== undefined ? longitude : sanitized.longitude;

    const created = await SupplierCompany.create(sanitized);

    const reload = await SupplierCompany.findByPk(created.id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'email', 'full_name', 'role'] },
        { model: PlanTemplate, as: 'plan', attributes: ['id', 'name', 'display_name', 'plan_target'] }
      ]
    });

    res.status(201).json({ success: true, data: reload });
  } catch (err) {
    console.error('POST /api/supplier-companies:', err);
    res.status(500).json({ success: false, message: 'Failed to create supplier company' });
  }
});

/**
 * PUT /api/supplier-companies/:id
 * Update supplier company (whitelist enforced).
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await SupplierCompany.findByPk(id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Supplier company not found' });
    }

    // Validate plan if changed
    if (req.body.plan_id !== undefined && req.body.plan_id !== null) {
      const plan = await PlanTemplate.findByPk(req.body.plan_id);
      if (!plan) {
        return res.status(400).json({ success: false, message: 'plan_id not found' });
      }
      if (plan.plan_target !== 'supplier') {
        return res.status(400).json({
          success: false,
          message: "plan_id must target 'supplier'"
        });
      }
    }

    if (req.body.plan_amount !== undefined && req.body.plan_amount !== null
        && Number(req.body.plan_amount) < 0) {
      return res.status(400).json({ success: false, message: 'plan_amount must be >= 0' });
    }

    const payload = {};
    for (const f of UPDATABLE_FIELDS) {
      if (req.body[f] !== undefined) payload[f] = req.body[f];
    }
    if (payload.name && typeof payload.name === 'string') payload.name = payload.name.trim();

    const sanitized = applySanitize(payload);
    await company.update(sanitized);

    const reload = await SupplierCompany.findByPk(id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'email', 'full_name', 'role'] },
        { model: PlanTemplate, as: 'plan', attributes: ['id', 'name', 'display_name', 'plan_target'] }
      ]
    });

    res.json({ success: true, data: reload });
  } catch (err) {
    console.error('PUT /api/supplier-companies/:id:', err);
    res.status(500).json({ success: false, message: 'Failed to update supplier company' });
  }
});

/**
 * DELETE /api/supplier-companies/:id
 * Soft delete (paranoid: true). Sets status='inactive' before destroy.
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const company = await SupplierCompany.findByPk(id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Supplier company not found' });
    }

    await company.update({ status: 'inactive' });
    await company.destroy();

    res.json({ success: true, message: 'Supplier company deleted' });
  } catch (err) {
    console.error('DELETE /api/supplier-companies/:id:', err);
    res.status(500).json({ success: false, message: 'Failed to delete supplier company' });
  }
});

module.exports = router;
