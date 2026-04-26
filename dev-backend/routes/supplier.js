/**
 * Supplier (Self) Routes — Sprint 1 (Supply Chain Design 1)
 *
 * Supplier Admin's own data: company info, settings (AutoSave), dashboard,
 * subscription, and view of subscription invoices issued by System Admin.
 *
 * Security: authenticateToken + requireSupplierScope on all endpoints.
 *           IDOR via owner_id match for invoices. SA bypass when
 *           req.supplierIsAdmin === true.
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  SupplierCompany,
  SupplierProduct,
  SupplierContract,
  Invoice,
  InvoiceItem,
  PlanTemplate,
  User,
  Restaurant,
  Brand,
  Foodcourt
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireSupplierScope } = require('../middleware/supplierScope');
const { requireSupplierModule } = require('../middleware/requireModule');
const { sanitizeString } = require('../middleware/validation');
const {
  supplierContractApprovedEmail,
  supplierContractRejectedEmail,
  supplierContractTerminatedEmail
} = require('../utils/notificationTemplates');
const { sendNotificationBatch } = require('../utils/notificationService');

router.use(authenticateToken);
router.use(requireSupplierScope);

// AutoSave whitelist for PUT /company
const COMPANY_ALLOWED_FIELDS = [
  'name', 'code', 'description', 'logo_url',
  'company_name', 'registration_no', 'trade_name', 'tax_no',
  'email', 'phone',
  'address', 'address_line_2', 'city', 'state', 'postal_code', 'country',
  'website', 'latitude', 'longitude',
  'bank_name', 'bank_account', 'bank_account_name'
];

// Fields stored as plain strings (sanitized on save)
const COMPANY_STRING_FIELDS = new Set([
  'name', 'code', 'description', 'logo_url',
  'company_name', 'registration_no', 'trade_name', 'tax_no',
  'email', 'phone',
  'address', 'address_line_2', 'city', 'state', 'postal_code',
  'website',
  'bank_name', 'bank_account', 'bank_account_name'
]);

// Allowed top-level keys for payment_settings JSON merge
const PAYMENT_SETTINGS_ALLOWED_KEYS = new Set([
  'currencies', 'defaultCurrency', 'stripe', 'paypal', 'bankTransfer', 'qrPayment'
]);

// AutoSave whitelist + types for invoice_settings
const INVOICE_SETTINGS_ALLOWED = {
  invoicePrefix: 'string',
  paymentTerms: 'int',
  taxRate: 'decimal',
  autoGenerate: 'bool',
  autoSendEmail: 'bool'
};

// Helper: ensure SA path has supplierCompany resolved (most endpoints need it)
function requireResolvedCompany(req, res) {
  if (!req.supplierCompany) {
    res.status(400).json({
      success: false,
      message: 'supplier_company_id query param required for System Admin'
    });
    return false;
  }
  return true;
}

/**
 * GET /api/supplier/dashboard
 */
router.get('/dashboard', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;

    const products = await SupplierProduct.findAll({
      where: { supplier_company_id: company.id },
      attributes: ['id', 'is_active', 'current_stock', 'low_stock_threshold', 'unit_price']
    });

    let products_total = products.length;
    let products_active = 0;
    let low_stock_count = 0;
    let inventory_value = 0;

    for (const p of products) {
      if (p.is_active) {
        products_active += 1;
        const stock = parseFloat(p.current_stock) || 0;
        const threshold = parseFloat(p.low_stock_threshold) || 0;
        const price = parseFloat(p.unit_price) || 0;
        inventory_value += stock * price;
        if (stock <= 0 || (threshold > 0 && stock <= threshold)) {
          low_stock_count += 1;
        }
      }
    }

    let plan_name = null;
    if (company.plan_id) {
      const plan = await PlanTemplate.findByPk(company.plan_id, {
        attributes: ['id', 'name', 'display_name']
      });
      plan_name = plan ? (plan.display_name || plan.name) : null;
    }

    let days_until_trial_end = null;
    if (company.trial_end_date) {
      const ms = new Date(company.trial_end_date).getTime() - Date.now();
      days_until_trial_end = Math.ceil(ms / (1000 * 60 * 60 * 24));
    }

    res.json({
      success: true,
      data: {
        products_total,
        products_active,
        low_stock_count,
        inventory_value: Number(inventory_value.toFixed(2)),
        subscription: {
          plan_name,
          status: company.subscription_status,
          trial_end_date: company.trial_end_date,
          days_until_trial_end
        }
      }
    });
  } catch (err) {
    console.error('[supplier] dashboard error:', err);
    res.status(500).json({ success: false, message: 'Failed to load dashboard' });
  }
});

/**
 * GET /api/supplier/company
 */
router.get('/company', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    res.json({ success: true, data: req.supplierCompany.toJSON() });
  } catch (err) {
    console.error('[supplier] get company error:', err);
    res.status(500).json({ success: false, message: 'Failed to load company' });
  }
});

/**
 * PUT /api/supplier/company
 * AutoSave: body should be a single { field_name: value } pair.
 */
router.put('/company', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;

    const body = req.body || {};
    const incomingKeys = Object.keys(body);
    if (incomingKeys.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided' });
    }

    const rejected = incomingKeys.filter(k => !COMPANY_ALLOWED_FIELDS.includes(k));
    if (rejected.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Field(s) not allowed: ${rejected.join(', ')}`
      });
    }

    for (const key of incomingKeys) {
      let value = body[key];

      if (key === 'country') {
        if (value !== null && value !== undefined && value !== '') {
          if (typeof value !== 'string' || value.length !== 2) {
            return res.status(400).json({
              success: false,
              message: 'country must be CHAR(2) ISO 3166-1 alpha-2'
            });
          }
          value = value.toUpperCase();
        }
      } else if (key === 'latitude' || key === 'longitude') {
        if (value === '' || value === null || value === undefined) {
          value = null;
        } else {
          const num = parseFloat(value);
          if (Number.isNaN(num)) {
            return res.status(400).json({ success: false, message: `${key} must be numeric` });
          }
          value = num;
        }
      } else if (COMPANY_STRING_FIELDS.has(key)) {
        if (typeof value === 'string') {
          value = sanitizeString(value);
        }
      }

      company[key] = value;
    }

    await company.save();
    res.json({ success: true, data: company.toJSON() });
  } catch (err) {
    console.error('[supplier] update company error:', err);
    res.status(500).json({ success: false, message: 'Failed to update company' });
  }
});

/**
 * GET /api/supplier/payment-settings
 */
router.get('/payment-settings', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    res.json({ success: true, data: req.supplierCompany.payment_settings });
  } catch (err) {
    console.error('[supplier] get payment-settings error:', err);
    res.status(500).json({ success: false, message: 'Failed to load payment settings' });
  }
});

/**
 * PUT /api/supplier/payment-settings
 * Merges body keys into existing payment_settings (whitelisted top-level keys).
 */
router.put('/payment-settings', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const body = req.body || {};
    const keys = Object.keys(body);
    if (keys.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided' });
    }
    const rejected = keys.filter(k => !PAYMENT_SETTINGS_ALLOWED_KEYS.has(k));
    if (rejected.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Key(s) not allowed: ${rejected.join(', ')}`
      });
    }

    const company = req.supplierCompany;
    const current = company.payment_settings || {};
    const merged = { ...current };
    for (const k of keys) {
      merged[k] = body[k];
    }
    company.payment_settings = merged;
    await company.save();

    res.json({ success: true, data: company.payment_settings });
  } catch (err) {
    console.error('[supplier] update payment-settings error:', err);
    res.status(500).json({ success: false, message: 'Failed to update payment settings' });
  }
});

/**
 * GET /api/supplier/invoice-settings
 */
router.get('/invoice-settings', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    res.json({ success: true, data: req.supplierCompany.invoice_settings });
  } catch (err) {
    console.error('[supplier] get invoice-settings error:', err);
    res.status(500).json({ success: false, message: 'Failed to load invoice settings' });
  }
});

/**
 * PUT /api/supplier/invoice-settings
 * AutoSave one field at a time: body { field_name: value }.
 */
router.put('/invoice-settings', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const body = req.body || {};
    const keys = Object.keys(body);
    if (keys.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided' });
    }
    const rejected = keys.filter(k => !(k in INVOICE_SETTINGS_ALLOWED));
    if (rejected.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Field(s) not allowed: ${rejected.join(', ')}`
      });
    }

    const company = req.supplierCompany;
    const current = { ...(company.invoice_settings || {}) };

    for (const key of keys) {
      const expected = INVOICE_SETTINGS_ALLOWED[key];
      let value = body[key];
      if (expected === 'string') {
        if (typeof value !== 'string') {
          return res.status(400).json({ success: false, message: `${key} must be a string` });
        }
        value = sanitizeString(value);
      } else if (expected === 'int') {
        const n = parseInt(value, 10);
        if (Number.isNaN(n)) {
          return res.status(400).json({ success: false, message: `${key} must be an integer` });
        }
        value = n;
      } else if (expected === 'decimal') {
        const n = parseFloat(value);
        if (Number.isNaN(n)) {
          return res.status(400).json({ success: false, message: `${key} must be a number` });
        }
        value = n;
      } else if (expected === 'bool') {
        if (typeof value !== 'boolean') {
          return res.status(400).json({ success: false, message: `${key} must be a boolean` });
        }
      }
      current[key] = value;
    }

    company.invoice_settings = current;
    await company.save();
    res.json({ success: true, data: company.invoice_settings });
  } catch (err) {
    console.error('[supplier] update invoice-settings error:', err);
    res.status(500).json({ success: false, message: 'Failed to update invoice settings' });
  }
});

/**
 * GET /api/supplier/subscription
 */
router.get('/subscription', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;

    let plan = null;
    if (company.plan_id) {
      plan = await PlanTemplate.findByPk(company.plan_id);
    }

    res.json({
      success: true,
      data: {
        plan: plan ? plan.toJSON() : null,
        status: company.subscription_status,
        trial_end_date: company.trial_end_date,
        current_period_start: company.subscription_start,
        current_period_end: company.subscription_end,
        plan_amount: company.plan_amount,
        billing_cycle: company.billing_cycle
      }
    });
  } catch (err) {
    console.error('[supplier] subscription error:', err);
    res.status(500).json({ success: false, message: 'Failed to load subscription' });
  }
});

/**
 * GET /api/supplier/invoices
 * Query: ?status=&page=1&limit=20
 * Filter: payer_type='external' AND payer_id = company.owner_id
 */
router.get('/invoices', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;
    if (!company.owner_id) {
      return res.json({
        success: true,
        data: [],
        pagination: { total: 0, page: 1, limit: 20, totalPages: 0 }
      });
    }

    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;

    const where = {
      payer_type: 'external',
      payer_id: company.owner_id
    };
    if (req.query.status) {
      where.status = req.query.status;
    }

    const { rows, count } = await Invoice.findAndCountAll({
      where,
      include: [{ model: InvoiceItem, as: 'items' }],
      order: [['createdAt', 'DESC']],
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
    console.error('[supplier] list invoices error:', err);
    res.status(500).json({ success: false, message: 'Failed to load invoices' });
  }
});

/**
 * GET /api/supplier/invoices/:invoiceId
 */
router.get('/invoices/:invoiceId', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;

    const invoice = await Invoice.findByPk(req.params.invoiceId, {
      include: [{ model: InvoiceItem, as: 'items' }]
    });
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    // IDOR — must be the supplier's external invoice
    if (!req.supplierIsAdmin) {
      if (invoice.payer_type !== 'external' || invoice.payer_id !== company.owner_id) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
    }

    res.json({ success: true, data: invoice });
  } catch (err) {
    console.error('[supplier] get invoice error:', err);
    res.status(500).json({ success: false, message: 'Failed to load invoice' });
  }
});

/**
 * GET /api/supplier/reports/summary
 * Query: ?from=&to=
 * Sprint 1: only inventory KPIs. Future sprints add sales/orders.
 */
router.get('/reports/summary', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;
    const { from, to } = req.query;

    const products = await SupplierProduct.findAll({
      where: { supplier_company_id: company.id },
      attributes: ['id', 'is_active', 'current_stock', 'low_stock_threshold', 'unit_price']
    });

    let products_total = products.length;
    let products_active = 0;
    let low_stock_count = 0;
    let inventory_value = 0;

    for (const p of products) {
      if (p.is_active) {
        products_active += 1;
        const stock = parseFloat(p.current_stock) || 0;
        const threshold = parseFloat(p.low_stock_threshold) || 0;
        const price = parseFloat(p.unit_price) || 0;
        inventory_value += stock * price;
        if (stock <= 0 || (threshold > 0 && stock <= threshold)) {
          low_stock_count += 1;
        }
      }
    }

    res.json({
      success: true,
      data: {
        products_total,
        products_active,
        low_stock_count,
        inventory_value: Number(inventory_value.toFixed(2)),
        period_start: from || null,
        period_end: to || null
        // TODO future sprint: sales totals, order counts, top products
      }
    });
  } catch (err) {
    console.error('[supplier] report summary error:', err);
    res.status(500).json({ success: false, message: 'Failed to load report' });
  }
});

// ==========================================================================
// Sprint 2 — Contracts (Supplier-side)
// ==========================================================================

const VALID_PAYMENT_TERMS = ['COD', 'NET_15', 'NET_30', 'NET_60'];
const VALID_INVOICE_CYCLES = ['immediate', 'monthly_soa'];

const FRONTEND_BASE_URL = process.env.FRONTEND_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

/** Resolve buyer entity (Restaurant/Brand/Foodcourt) for supplier-side display + notifications. */
async function resolveBuyerEntityFull(entityType, entityId) {
  if (entityType === 'restaurant') {
    const r = await Restaurant.findByPk(entityId, {
      attributes: ['id', 'name', 'admin_id', 'admin_name', 'email', 'phone']
    });
    if (!r) return null;
    return {
      type: entityType,
      id: r.id,
      name: r.name,
      contact_name: r.admin_name,
      email: r.email,
      phone: r.phone,
      ownerIds: r.admin_id ? [r.admin_id] : []
    };
  }
  if (entityType === 'brand') {
    const b = await Brand.findByPk(entityId, {
      attributes: ['id', 'name', 'owner_id']
    });
    if (!b) return null;
    return {
      type: entityType,
      id: b.id,
      name: b.name,
      ownerIds: b.owner_id ? [b.owner_id] : []
    };
  }
  if (entityType === 'foodcourt') {
    const f = await Foodcourt.findByPk(entityId, {
      attributes: ['id', 'name', 'owner_id']
    });
    if (!f) return null;
    return {
      type: entityType,
      id: f.id,
      name: f.name,
      ownerIds: f.owner_id ? [f.owner_id] : []
    };
  }
  return null;
}

/**
 * Validate that the contract belongs to req.supplierCompany (or SA without override).
 * On failure, sends 404 and returns false.
 */
function assertContractIsMine(contract, req, res) {
  if (!contract) {
    res.status(404).json({ success: false, message: 'Contract not found' });
    return false;
  }
  // SA without override sees all
  if (req.supplierIsAdmin && !req.supplierCompany) return true;
  if (!req.supplierCompany || contract.supplier_company_id !== req.supplierCompany.id) {
    res.status(404).json({ success: false, message: 'Contract not found' });
    return false;
  }
  return true;
}

function validatePaymentTerms(pt) {
  if (!pt || typeof pt !== 'object') return 'payment_terms is required';
  if (!VALID_PAYMENT_TERMS.includes(pt.terms)) {
    return `payment_terms.terms must be one of ${VALID_PAYMENT_TERMS.join(', ')}`;
  }
  if (!VALID_INVOICE_CYCLES.includes(pt.invoice_cycle)) {
    return `payment_terms.invoice_cycle must be one of ${VALID_INVOICE_CYCLES.join(', ')}`;
  }
  if (pt.payment_due_day !== undefined && pt.payment_due_day !== null) {
    const d = parseInt(pt.payment_due_day, 10);
    if (!Number.isFinite(d) || d < 0 || d > 31) {
      return 'payment_terms.payment_due_day must be 0-31';
    }
  }
  if (pt.credit_limit !== undefined && pt.credit_limit !== null) {
    const cl = parseFloat(pt.credit_limit);
    if (!Number.isFinite(cl) || cl < 0) {
      return 'payment_terms.credit_limit must be a non-negative number';
    }
  }
  if (pt.currency !== undefined && pt.currency !== null) {
    if (typeof pt.currency !== 'string' || pt.currency.length < 3 || pt.currency.length > 8) {
      return 'payment_terms.currency must be a 3-8 character string';
    }
  }
  return null;
}

function buildPaymentTerms(pt) {
  return {
    terms: pt.terms,
    invoice_cycle: pt.invoice_cycle,
    payment_due_day: pt.payment_due_day !== undefined && pt.payment_due_day !== null
      ? parseInt(pt.payment_due_day, 10) : null,
    credit_limit: pt.credit_limit !== undefined && pt.credit_limit !== null
      ? parseFloat(pt.credit_limit) : null,
    currency: pt.currency ? String(pt.currency).toUpperCase() : null,
    notes: pt.notes ? sanitizeString(String(pt.notes)) : null
  };
}

/**
 * GET /api/supplier/contracts
 * List contracts addressed to req.supplierCompany.
 */
router.get('/contracts', requireSupplierModule('supplier_contracts'), async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const offset = (page - 1) * limit;

    const where = {};
    if (req.supplierCompany) where.supplier_company_id = req.supplierCompany.id;
    // SA without override → no filter (see all)
    if (req.query.status) where.status = req.query.status;

    const { rows, count } = await SupplierContract.findAndCountAll({
      where,
      include: [
        { model: User, as: 'requestedBy', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'approvedBy', attributes: ['id', 'full_name', 'email'] }
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset,
      distinct: true
    });

    // Resolve buyer entity for each contract
    const data = await Promise.all(rows.map(async (c) => {
      const buyer = await resolveBuyerEntityFull(c.entity_type, c.entity_id);
      return {
        ...c.toJSON(),
        buyer_entity: buyer
          ? { type: buyer.type, id: buyer.id, name: buyer.name }
          : { type: c.entity_type, id: c.entity_id, name: null }
      };
    }));

    res.json({
      success: true,
      data,
      pagination: { total: count, page, limit, totalPages: Math.ceil(count / limit) }
    });
  } catch (err) {
    console.error('[supplier] list contracts error:', err);
    res.status(500).json({ success: false, message: 'Failed to load contracts' });
  }
});

/**
 * GET /api/supplier/contracts/:contractId
 */
router.get('/contracts/:contractId', requireSupplierModule('supplier_contracts'), async (req, res) => {
  try {
    const contract = await SupplierContract.findByPk(req.params.contractId, {
      include: [
        { model: User, as: 'requestedBy', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'approvedBy', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'rejectedBy', attributes: ['id', 'full_name', 'email'] },
        { model: User, as: 'terminatedByUser', attributes: ['id', 'full_name', 'email'] }
      ]
    });
    if (!assertContractIsMine(contract, req, res)) return;

    const buyer = await resolveBuyerEntityFull(contract.entity_type, contract.entity_id);

    res.json({
      success: true,
      data: {
        ...contract.toJSON(),
        buyer_entity: buyer
      }
    });
  } catch (err) {
    console.error('[supplier] get contract error:', err);
    res.status(500).json({ success: false, message: 'Failed to load contract' });
  }
});

/**
 * POST /api/supplier/contracts/:contractId/approve
 * Body: { payment_terms: { terms, invoice_cycle, payment_due_day, credit_limit, currency, notes? } }
 */
router.post('/contracts/:contractId/approve', requireSupplierModule('supplier_contracts'), async (req, res) => {
  try {
    const contract = await SupplierContract.findByPk(req.params.contractId);
    if (!assertContractIsMine(contract, req, res)) return;

    if (contract.status !== 'requested') {
      return res.status(400).json({
        success: false,
        message: 'Only requested contracts can be approved'
      });
    }

    const pt = req.body.payment_terms;
    const err = validatePaymentTerms(pt);
    if (err) return res.status(400).json({ success: false, message: err });

    await contract.update({
      status: 'active',
      approved_by_user_id: req.user.id,
      approved_at: new Date(),
      payment_terms: buildPaymentTerms(pt)
    });

    // Notify buyer (non-blocking)
    (async () => {
      try {
        const buyer = await resolveBuyerEntityFull(contract.entity_type, contract.entity_id);
        if (buyer && buyer.ownerIds.length > 0) {
          const supplier = req.supplierCompany || await SupplierCompany.findByPk(contract.supplier_company_id);
          const link = `${FRONTEND_BASE_URL}/pos/supply/contracts`;
          const mail = supplierContractApprovedEmail({
            supplierName: supplier?.name || 'the supplier',
            paymentTerms: contract.payment_terms,
            link
          });
          await sendNotificationBatch(buyer.ownerIds, 'supplier_contract', mail);
        }
      } catch (e) {
        console.error('[supplier] approve notify error:', e.message);
      }
    })();

    res.json({ success: true, data: contract });
  } catch (err) {
    console.error('[supplier] approve contract error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve contract' });
  }
});

/**
 * POST /api/supplier/contracts/:contractId/reject
 * Body: { reason }
 */
router.post('/contracts/:contractId/reject', requireSupplierModule('supplier_contracts'), async (req, res) => {
  try {
    const contract = await SupplierContract.findByPk(req.params.contractId);
    if (!assertContractIsMine(contract, req, res)) return;

    if (contract.status !== 'requested') {
      return res.status(400).json({
        success: false,
        message: 'Only requested contracts can be rejected'
      });
    }

    const reason = req.body.reason ? sanitizeString(String(req.body.reason)) : null;
    if (!reason) {
      return res.status(400).json({ success: false, message: 'reason is required' });
    }

    await contract.update({
      status: 'rejected',
      rejected_by_user_id: req.user.id,
      rejected_at: new Date(),
      rejection_reason: reason
    });

    (async () => {
      try {
        const buyer = await resolveBuyerEntityFull(contract.entity_type, contract.entity_id);
        if (buyer && buyer.ownerIds.length > 0) {
          const supplier = req.supplierCompany || await SupplierCompany.findByPk(contract.supplier_company_id);
          const link = `${FRONTEND_BASE_URL}/pos/supply/contracts`;
          const mail = supplierContractRejectedEmail({
            supplierName: supplier?.name || 'the supplier',
            reason,
            link
          });
          await sendNotificationBatch(buyer.ownerIds, 'supplier_contract', mail);
        }
      } catch (e) {
        console.error('[supplier] reject notify error:', e.message);
      }
    })();

    res.json({ success: true, data: contract });
  } catch (err) {
    console.error('[supplier] reject contract error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject contract' });
  }
});

/**
 * POST /api/supplier/contracts/:contractId/terminate
 * Body: { reason }
 */
router.post('/contracts/:contractId/terminate', requireSupplierModule('supplier_contracts'), async (req, res) => {
  try {
    const contract = await SupplierContract.findByPk(req.params.contractId);
    if (!assertContractIsMine(contract, req, res)) return;

    if (contract.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Only active contracts can be terminated'
      });
    }

    const reason = req.body.reason ? sanitizeString(String(req.body.reason)) : null;
    if (!reason) {
      return res.status(400).json({ success: false, message: 'reason is required' });
    }

    await contract.update({
      status: 'terminated',
      terminated_by: 'supplier',
      terminated_by_user_id: req.user.id,
      terminated_at: new Date(),
      termination_reason: reason
    });

    (async () => {
      try {
        const buyer = await resolveBuyerEntityFull(contract.entity_type, contract.entity_id);
        if (buyer && buyer.ownerIds.length > 0) {
          const link = `${FRONTEND_BASE_URL}/pos/supply/contracts`;
          const mail = supplierContractTerminatedEmail({
            otherPartyName: (req.supplierCompany?.name) || 'the supplier',
            terminatedBy: 'supplier',
            reason,
            link
          });
          await sendNotificationBatch(buyer.ownerIds, 'supplier_contract', mail);
        }
      } catch (e) {
        console.error('[supplier] terminate notify error:', e.message);
      }
    })();

    res.json({ success: true, data: contract });
  } catch (err) {
    console.error('[supplier] terminate contract error:', err);
    res.status(500).json({ success: false, message: 'Failed to terminate contract' });
  }
});

/**
 * PUT /api/supplier/contracts/:contractId/payment-terms
 * Body: { payment_terms: {...} }
 */
router.put('/contracts/:contractId/payment-terms', requireSupplierModule('supplier_contracts'), async (req, res) => {
  try {
    const contract = await SupplierContract.findByPk(req.params.contractId);
    if (!assertContractIsMine(contract, req, res)) return;

    if (contract.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: 'Only active contracts can have payment terms updated'
      });
    }

    const pt = req.body.payment_terms;
    const err = validatePaymentTerms(pt);
    if (err) return res.status(400).json({ success: false, message: err });

    await contract.update({ payment_terms: buildPaymentTerms(pt) });
    res.json({ success: true, data: contract });
  } catch (err) {
    console.error('[supplier] update payment-terms error:', err);
    res.status(500).json({ success: false, message: 'Failed to update payment terms' });
  }
});

/**
 * GET /api/supplier/customers
 * List active customers derived from active contracts.
 */
router.get('/customers', requireSupplierModule('supplier_customers'), async (req, res) => {
  try {
    const where = { status: 'active' };
    if (req.supplierCompany) where.supplier_company_id = req.supplierCompany.id;

    const contracts = await SupplierContract.findAll({
      where,
      order: [['approved_at', 'DESC']]
    });

    const data = await Promise.all(contracts.map(async (c) => {
      const buyer = await resolveBuyerEntityFull(c.entity_type, c.entity_id);
      return {
        contract_id: c.id,
        entity_type: c.entity_type,
        entity_id: c.entity_id,
        approved_at: c.approved_at,
        payment_terms: c.payment_terms,
        buyer_entity: buyer
          ? {
              type: buyer.type,
              id: buyer.id,
              name: buyer.name,
              contact_name: buyer.contact_name || null,
              email: buyer.email || null,
              phone: buyer.phone || null
            }
          : { type: c.entity_type, id: c.entity_id, name: null }
      };
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error('[supplier] list customers error:', err);
    res.status(500).json({ success: false, message: 'Failed to load customers' });
  }
});

module.exports = router;
