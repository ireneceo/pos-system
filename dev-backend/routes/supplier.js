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
  PurchaseOrder,
  PurchaseOrderItem,
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
const bcrypt = require('bcrypt');

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

    // Time anchors
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const sixMonthsStart = new Date(now.getFullYear(), now.getMonth() - 5, 1);

    // ─── Products ───────────────────────────────────────────────
    const products = await SupplierProduct.findAll({
      where: { supplier_company_id: company.id },
      attributes: ['id', 'name', 'is_active', 'current_stock', 'low_stock_threshold', 'unit_price', 'unit']
    });

    let products_total = products.length;
    let products_active = 0;
    let low_stock_count = 0;
    let inventory_value = 0;
    const lowStockItems = [];

    for (const p of products) {
      if (p.is_active) {
        products_active += 1;
        const stock = parseFloat(p.current_stock) || 0;
        const threshold = parseFloat(p.low_stock_threshold) || 0;
        const price = parseFloat(p.unit_price) || 0;
        inventory_value += stock * price;
        if (stock <= 0 || (threshold > 0 && stock <= threshold)) {
          low_stock_count += 1;
          if (lowStockItems.length < 5) {
            lowStockItems.push({ id: p.id, name: p.name, current_stock: stock, low_stock_threshold: threshold, unit: p.unit });
          }
        }
      }
    }

    // ─── Orders ─────────────────────────────────────────────────
    const orderStatusCounts = await PurchaseOrder.findAll({
      where: { seller_type: 'supplier', seller_entity_id: company.id },
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count']
      ],
      group: ['status'],
      raw: true
    });
    const ordCount = (s) => {
      const row = orderStatusCounts.find(r => r.status === s);
      return row ? parseInt(row.count, 10) : 0;
    };

    const orders_pending = ordCount('submitted');
    const orders_confirmed = ordCount('confirmed');
    const orders_shipped = ordCount('shipped');

    const orders_received_this_month = await PurchaseOrder.count({
      where: {
        seller_type: 'supplier',
        seller_entity_id: company.id,
        status: 'received',
        received_at: { [Op.gte]: monthStart }
      }
    });

    // ─── Trade Invoices (financials) ────────────────────────────
    const tradeInvoices = await Invoice.findAll({
      where: {
        invoice_category: 'trade',
        issuer_type: 'supplier',
        issuer_id: company.id
      },
      attributes: ['id', 'invoice_number', 'total_amount', 'status', 'issued_at', 'due_date', 'payer_type', 'payer_id'],
      order: [['issued_at', 'DESC']]
    });

    let monthly_revenue = 0;
    let outstanding_balance = 0;
    let overdue_invoices_count = 0;
    const revenueByMonth = new Map();

    for (const inv of tradeInvoices) {
      const total = parseFloat(inv.total_amount) || 0;
      const issuedAt = inv.issued_at ? new Date(inv.issued_at) : null;
      if (issuedAt && issuedAt >= monthStart) {
        monthly_revenue += total;
      }
      if (inv.status === 'pending_payment') {
        outstanding_balance += total;
        if (inv.due_date && new Date(inv.due_date) < now) {
          overdue_invoices_count += 1;
        }
      }
      if (issuedAt && issuedAt >= sixMonthsStart) {
        const key = `${issuedAt.getFullYear()}-${String(issuedAt.getMonth() + 1).padStart(2, '0')}`;
        revenueByMonth.set(key, (revenueByMonth.get(key) || 0) + total);
      }
    }

    // 6-month series with zero-fill
    const revenue_trend_6m = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      revenue_trend_6m.push({ month: key, revenue: Number((revenueByMonth.get(key) || 0).toFixed(2)) });
    }

    // ─── Customers / Contracts ──────────────────────────────────
    const active_customers = await SupplierContract.count({
      where: { supplier_company_id: company.id, status: 'active' }
    });
    const pending_contract_requests = await SupplierContract.count({
      where: { supplier_company_id: company.id, status: 'requested' }
    });

    // ─── Customer name resolver (cached per dashboard call) ─────
    const restaurantIds = new Set();
    const brandIds = new Set();
    const foodcourtIds = new Set();
    const recentPOsRaw = await PurchaseOrder.findAll({
      where: { seller_type: 'supplier', seller_entity_id: company.id },
      attributes: ['id', 'po_number', 'status', 'total_amount', 'currency', 'entity_type', 'entity_id', 'submitted_at', 'created_at'],
      order: [['created_at', 'DESC']],
      limit: 5
    });
    const recentInvoicesRaw = tradeInvoices.slice(0, 5);

    [...recentPOsRaw, ...recentInvoicesRaw].forEach(row => {
      const eType = row.entity_type || row.payer_type;
      const eId = row.entity_id || row.payer_id;
      if (eType === 'restaurant') restaurantIds.add(eId);
      else if (eType === 'brand_manager' || eType === 'brand') brandIds.add(eId);
      else if (eType === 'foodcourt_manager' || eType === 'foodcourt') foodcourtIds.add(eId);
    });

    const restaurantsMap = restaurantIds.size > 0
      ? Object.fromEntries((await Restaurant.findAll({ where: { id: [...restaurantIds] }, attributes: ['id', 'name'] })).map(r => [r.id, r.name]))
      : {};
    const brandsMap = brandIds.size > 0
      ? Object.fromEntries((await Brand.findAll({ where: { id: [...brandIds] }, attributes: ['id', 'name'] })).map(b => [b.id, b.name]))
      : {};
    const foodcourtsMap = foodcourtIds.size > 0
      ? Object.fromEntries((await Foodcourt.findAll({ where: { id: [...foodcourtIds] }, attributes: ['id', 'name'] })).map(f => [f.id, f.name]))
      : {};

    const resolveCustomer = (eType, eId) => {
      if (eType === 'restaurant') return restaurantsMap[eId] || `Restaurant #${eId}`;
      if (eType === 'brand_manager' || eType === 'brand') return brandsMap[eId] || `Brand #${eId}`;
      if (eType === 'foodcourt_manager' || eType === 'foodcourt') return foodcourtsMap[eId] || `Foodcourt #${eId}`;
      return `${eType} #${eId}`;
    };

    const recent_orders = recentPOsRaw.map(po => ({
      id: po.id,
      po_number: po.po_number,
      status: po.status,
      total_amount: parseFloat(po.total_amount) || 0,
      currency: po.currency,
      customer: resolveCustomer(po.entity_type, po.entity_id),
      created_at: po.created_at
    }));

    const recent_invoices = recentInvoicesRaw.map(inv => ({
      id: inv.id,
      invoice_number: inv.invoice_number,
      status: inv.status,
      total_amount: parseFloat(inv.total_amount) || 0,
      customer: resolveCustomer(inv.payer_type, inv.payer_id),
      issued_at: inv.issued_at,
      due_date: inv.due_date
    }));

    // ─── Alerts (computed) ──────────────────────────────────────
    const alerts = [];
    if (orders_pending > 0) {
      alerts.push({ type: 'warning', title: `${orders_pending} new order${orders_pending > 1 ? 's' : ''} awaiting confirmation`, message: 'Review and confirm new orders to keep customers updated.', link: '/pos/supplier/orders?status=submitted' });
    }
    if (orders_confirmed > 0) {
      alerts.push({ type: 'info', title: `${orders_confirmed} order${orders_confirmed > 1 ? 's' : ''} ready to ship`, message: 'Add tracking and mark as shipped.', link: '/pos/supplier/orders?status=confirmed' });
    }
    if (overdue_invoices_count > 0) {
      alerts.push({ type: 'error', title: `${overdue_invoices_count} overdue invoice${overdue_invoices_count > 1 ? 's' : ''}`, message: 'Outstanding payment is past due. Follow up with customers.', link: '/pos/supplier/trade-invoices?status=pending_payment' });
    }
    if (low_stock_count > 0) {
      alerts.push({ type: 'warning', title: `${low_stock_count} product${low_stock_count > 1 ? 's' : ''} low on stock`, message: lowStockItems.map(i => i.name).slice(0, 3).join(', ') + (lowStockItems.length > 3 ? '…' : ''), link: '/pos/supplier/inventory' });
    }
    if (pending_contract_requests > 0) {
      alerts.push({ type: 'info', title: `${pending_contract_requests} new contract request${pending_contract_requests > 1 ? 's' : ''}`, message: 'New buyers want to work with you. Review and approve.', link: '/pos/supplier/customers' });
    }

    // ─── Subscription ───────────────────────────────────────────
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
        orders_pending,
        orders_confirmed,
        orders_shipped,
        orders_received_this_month,
        monthly_revenue: Number(monthly_revenue.toFixed(2)),
        outstanding_balance: Number(outstanding_balance.toFixed(2)),
        overdue_invoices_count,
        active_customers,
        pending_contract_requests,
        currency: company.currency || 'MYR',
        recent_orders,
        recent_invoices,
        revenue_trend_6m,
        low_stock_items: lowStockItems,
        alerts,
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

// ============================================================================
// Supplier Staff (B2 — Advanced module: supplier_admin_staff)
//   Only Supplier Admin (the company owner) can manage staff.
//   All endpoints require requireSupplierModule('supplier_admin_staff').
// ============================================================================

function requireSupplierAdminOnly(req, res) {
  if (req.user?.role === 'System Admin') return true;
  if (req.user?.role !== 'Supplier Admin') {
    res.status(403).json({ success: false, message: 'Only Supplier Admin can manage staff' });
    return false;
  }
  return true;
}

/**
 * GET /api/supplier/staff
 * List staff (Supplier Admin owner + Supplier Staff scoped to this company)
 */
router.get('/staff', requireSupplierModule('supplier_admin_staff'), async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;
    const staff = await User.findAll({
      where: {
        [Op.or]: [
          { id: company.owner_id || 0 },
          { supplier_company_id: company.id }
        ]
      },
      attributes: ['id', 'username', 'email', 'full_name', 'role', 'phone', 'pin_code', 'createdAt'],
      order: [['createdAt', 'ASC']]
    });
    res.json({ success: true, data: staff });
  } catch (err) {
    console.error('[supplier] GET /staff error:', err);
    res.status(500).json({ success: false, message: 'Failed to load staff' });
  }
});

/**
 * POST /api/supplier/staff
 * Create new Supplier Staff user (assigned to this supplier company)
 */
router.post('/staff', requireSupplierModule('supplier_admin_staff'), async (req, res) => {
  try {
    if (!requireSupplierAdminOnly(req, res)) return;
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;

    const { username, email, password, full_name, phone, pin_code } = req.body;
    if (!username || !email || !password || !full_name) {
      return res.status(400).json({ success: false, message: 'username, email, password, full_name are required' });
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ success: false, message: 'Username must be 3-30 chars, alphanumeric/underscore only' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }
    if (pin_code && !/^\d{4}$/.test(pin_code)) {
      return res.status(400).json({ success: false, message: 'PIN must be 4 digits' });
    }

    // Uniqueness checks
    const existing = await User.findOne({
      where: { [Op.or]: [{ email: email.toLowerCase() }, { username }] }
    });
    if (existing) {
      const which = existing.email === email.toLowerCase() ? 'Email' : 'Username';
      return res.status(400).json({ success: false, message: `${which} is already in use` });
    }
    if (pin_code) {
      const pinDup = await User.findOne({ where: { supplier_company_id: company.id, pin_code } });
      if (pinDup) return res.status(400).json({ success: false, message: 'PIN already in use within this company' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashed,
      role: 'Supplier Staff',
      full_name: sanitizeString(String(full_name).trim()),
      phone: phone ? sanitizeString(String(phone).trim()) : null,
      pin_code: pin_code || null,
      supplier_company_id: company.id,
      email_verified: true  // created by Supplier Admin → trusted
    });

    res.status(201).json({
      success: true,
      data: { id: user.id, username, email: user.email, full_name: user.full_name, role: user.role }
    });
  } catch (err) {
    console.error('[supplier] POST /staff error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to create staff' });
  }
});

/**
 * PUT /api/supplier/staff/:id
 * Update Supplier Staff (must belong to this company; cannot edit owner via this endpoint)
 */
router.put('/staff/:id', requireSupplierModule('supplier_admin_staff'), async (req, res) => {
  try {
    if (!requireSupplierAdminOnly(req, res)) return;
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Staff not found' });

    const target = await User.findByPk(id);
    if (!target || target.role !== 'Supplier Staff' || target.supplier_company_id !== company.id) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }

    const { full_name, phone, pin_code, password } = req.body;
    const updates = {};
    if (full_name != null) updates.full_name = sanitizeString(String(full_name).trim());
    if (phone != null) updates.phone = sanitizeString(String(phone).trim());
    if (pin_code != null) {
      if (pin_code === '') {
        updates.pin_code = null;
      } else {
        if (!/^\d{4}$/.test(pin_code)) return res.status(400).json({ success: false, message: 'PIN must be 4 digits' });
        const pinDup = await User.findOne({
          where: { supplier_company_id: company.id, pin_code, id: { [Op.ne]: id } }
        });
        if (pinDup) return res.status(400).json({ success: false, message: 'PIN already in use within this company' });
        updates.pin_code = pin_code;
      }
    }
    if (password) {
      if (password.length < 8) return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
      updates.password = await bcrypt.hash(password, 10);
    }

    await target.update(updates);
    res.json({
      success: true,
      data: { id: target.id, username: target.username, email: target.email, full_name: target.full_name, role: target.role }
    });
  } catch (err) {
    console.error('[supplier] PUT /staff/:id error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to update staff' });
  }
});

/**
 * DELETE /api/supplier/staff/:id
 * Remove Supplier Staff from this company. Hard delete (their orphaned data is rare —
 * they don't own POs/invoices, only created_by references which can be null).
 */
router.delete('/staff/:id', requireSupplierModule('supplier_admin_staff'), async (req, res) => {
  try {
    if (!requireSupplierAdminOnly(req, res)) return;
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Staff not found' });

    const target = await User.findByPk(id);
    if (!target || target.role !== 'Supplier Staff' || target.supplier_company_id !== company.id) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }
    if (target.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    await target.destroy();
    res.json({ success: true, message: 'Staff removed' });
  } catch (err) {
    console.error('[supplier] DELETE /staff/:id error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to delete staff' });
  }
});

/**
 * GET /api/supplier/soa/current
 * Aggregate unpaid trade invoices issued by this supplier, grouped by buyer (payer).
 * Filter: only include buyers whose contract has invoice_cycle='monthly_soa'.
 * Returns one bundle per buyer with totals + invoice list.
 *
 * Mirror of /api/purchase-invoices/soa/current (buyer-side) — but groups by payer
 * instead of issuer. Used by SupplierTradeInvoicesPage SoaBundleRow inline view.
 */
router.get('/soa/current', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;
    const supplierId = company.id;

    // Fetch all this supplier's unpaid trade invoices
    const invoices = await Invoice.findAll({
      where: {
        invoice_category: 'trade',
        issuer_type: 'supplier',
        issuer_id: supplierId,
        status: { [Op.in]: ['pending_payment', 'overdue', 'pending'] }
      },
      include: [{ model: InvoiceItem, as: 'items' }],
      order: [['payer_type', 'ASC'], ['payer_id', 'ASC'], ['createdAt', 'DESC']]
    });

    // Resolve buyer entity (restaurant_id / brand.id / foodcourt.id) per invoice
    // and check the contract has monthly_soa cycle
    const grouped = new Map();
    for (const inv of invoices) {
      let entityType = null, entityId = null, buyerName = null;
      if (inv.payer_type === 'restaurant') {
        entityType = 'restaurant'; entityId = inv.payer_id;
        const r = await Restaurant.findByPk(entityId, { attributes: ['id', 'name'] });
        buyerName = r?.name || null;
      } else if (inv.payer_type === 'brand_manager') {
        const b = await Brand.findOne({ where: { owner_id: inv.payer_id }, attributes: ['id', 'name'] });
        if (b) { entityType = 'brand'; entityId = b.id; buyerName = b.name; }
      } else if (inv.payer_type === 'foodcourt_manager') {
        const f = await Foodcourt.findOne({ where: { owner_id: inv.payer_id }, attributes: ['id', 'name'] });
        if (f) { entityType = 'foodcourt'; entityId = f.id; buyerName = f.name; }
      }
      if (!entityType) continue;

      const contract = await SupplierContract.findOne({
        where: {
          supplier_company_id: supplierId,
          entity_type: entityType,
          entity_id: entityId,
          status: 'active'
        }
      });
      if (!contract) continue;
      if (contract.payment_terms?.invoice_cycle !== 'monthly_soa') continue;

      // Group key = buyer (payer_type + payer_id)
      const key = `${inv.payer_type}:${inv.payer_id}`;
      if (!grouped.has(key)) {
        grouped.set(key, {
          payer_type: inv.payer_type,
          payer_id: inv.payer_id,
          buyer: { entity_type: entityType, entity_id: entityId, name: buyerName },
          contract_id: contract.id,
          payment_terms: contract.payment_terms || null,
          invoices: [],
          subtotal: 0,
          total: 0,
          count: 0,
          currency: inv.currency || 'MYR'
        });
      }
      const g = grouped.get(key);
      g.invoices.push(inv.toJSON());
      g.subtotal += Number(inv.subtotal || 0);
      g.total += Number(inv.total_amount || 0);
      g.count += 1;
    }
    for (const g of grouped.values()) {
      g.subtotal = Math.round(g.subtotal * 100) / 100;
      g.total = Math.round(g.total * 100) / 100;
    }

    res.json({ success: true, data: { groups: Array.from(grouped.values()) } });
  } catch (err) {
    console.error('[supplier] /soa/current error:', err);
    res.status(500).json({ success: false, message: 'Failed to load SOA' });
  }
});

/**
 * POST /api/supplier/soa/:contractId/remind
 * Send SOA reminder email to the buyer's recipients (Restaurant Admin / BG / FG).
 */
router.post('/soa/:contractId/remind', async (req, res) => {
  try {
    if (!requireResolvedCompany(req, res)) return;
    const company = req.supplierCompany;
    const contractId = parseInt(req.params.contractId, 10);
    if (!Number.isFinite(contractId)) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }
    const contract = await SupplierContract.findByPk(contractId);
    if (!contract || contract.supplier_company_id !== company.id) {
      return res.status(404).json({ success: false, message: 'Contract not found' });
    }

    // Get unpaid trade invoices for this contract's buyer
    let payerWhere;
    if (contract.entity_type === 'restaurant') {
      payerWhere = { payer_type: 'restaurant', payer_id: contract.entity_id };
    } else if (contract.entity_type === 'brand') {
      const b = await Brand.findByPk(contract.entity_id, { attributes: ['owner_id'] });
      if (!b?.owner_id) return res.status(400).json({ success: false, message: 'Buyer payer not resolved' });
      payerWhere = { payer_type: 'brand_manager', payer_id: b.owner_id };
    } else if (contract.entity_type === 'foodcourt') {
      const f = await Foodcourt.findByPk(contract.entity_id, { attributes: ['owner_id'] });
      if (!f?.owner_id) return res.status(400).json({ success: false, message: 'Buyer payer not resolved' });
      payerWhere = { payer_type: 'foodcourt_manager', payer_id: f.owner_id };
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported buyer entity' });
    }

    const invoices = await Invoice.findAll({
      where: {
        ...payerWhere,
        invoice_category: 'trade',
        issuer_type: 'supplier',
        issuer_id: company.id,
        status: { [Op.in]: ['pending_payment', 'overdue', 'pending'] }
      }
    });
    if (invoices.length === 0) {
      return res.status(400).json({ success: false, message: 'No unpaid invoices to remind' });
    }

    const totalDue = invoices.reduce((s, i) => s + Number(i.total_amount || 0), 0);
    const currency = invoices[0]?.currency || company.currency || 'MYR';

    // Resolve recipient user ids based on buyer entity
    let recipients = [];
    const { getRestaurantAdminAndOwnerIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
    if (contract.entity_type === 'restaurant') {
      recipients = await getRestaurantAdminAndOwnerIds(contract.entity_id);
    } else if (contract.entity_type === 'brand') {
      recipients = await getBrandManagerIds(contract.entity_id);
    } else if (contract.entity_type === 'foodcourt') {
      recipients = await getFoodcourtManagerIds(contract.entity_id);
    }

    if (recipients.length === 0) {
      return res.status(400).json({ success: false, message: 'No recipients found' });
    }

    const supplierName = company.company_name || company.name || 'Supplier';
    const link = `${FRONTEND_BASE_URL}/pos/restaurant/invoices`;
    const html = `
      <p>This is a friendly reminder that you have <strong>${invoices.length} unpaid invoice${invoices.length > 1 ? 's' : ''}</strong> from ${supplierName}.</p>
      <p><strong>Total due:</strong> ${currency} ${totalDue.toFixed(2)}</p>
      <p><a href="${link}">View invoices in Purple POS</a></p>
    `;
    await sendNotificationBatch(recipients, 'monthly_soa', {
      subject: `[Reminder] Unpaid invoices from ${supplierName}`,
      html
    });

    res.json({ success: true, data: { recipientCount: recipients.length, invoiceCount: invoices.length } });
  } catch (err) {
    console.error('[supplier] /soa/remind error:', err);
    res.status(500).json({ success: false, message: 'Failed to send reminder' });
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

const {
  VALID_PAYMENT_TERMS,
  VALID_INVOICE_CYCLES,
  validatePaymentTerms,
  buildPaymentTerms
} = require('../utils/paymentTerms');

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

// validatePaymentTerms / buildPaymentTerms — moved to utils/paymentTerms.js
// (shared with Brand/Foodcourt → Restaurant trade billing — see docs/BG_FG_TRADE_BILLING.md)

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
