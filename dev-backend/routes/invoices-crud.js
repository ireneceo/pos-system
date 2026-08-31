// list/get only — split from invoices-main.js (2026-05-03)
// 마운트: routes/invoices.js barrel via app.use('/api/invoices', ...)
const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const InvoiceSettings = require('../models/InvoiceSettings');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const CompanySettings = require('../models/CompanySettings');
const SystemSettings = require('../models/SystemSettings');
const PlanPrice = require('../models/PlanPrice');
const PlanTemplate = require('../models/PlanTemplate');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const RestaurantManager = require('../models/RestaurantManager');
const { Op } = require('sequelize');
const invoiceScheduler = require('../services/invoiceScheduler');
const subscriptionScheduler = require('../services/subscriptionScheduler');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

const { authenticateToken, checkRestaurantAccess, getManagerScope, userCanAccessRestaurant, userCanAccessEntity } = require('../middleware/auth');
const InvoiceCategory = require('../models/InvoiceCategory');
const { normalizeAdditionalCharges, getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');
const { sendNotification, sendNotificationBatch, getSystemAdminIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
const { invoicePaidEmail } = require('../utils/notificationTemplates');
const { logActivity } = require('../utils/activityLogger');
const {
  generateInvoiceNumber,
  getAdditionalCharges,
  calculateAdditionalCharges,
  getBankInfoByCurrency,
  getIssuerCompanyInfo,
  getPayerCompanyInfo,
  formatBillingPeriod,
  getInvoiceTimezone,
  getCategoryDisplayName,
  checkPaymentPermission,
  checkConfirmPermission,
} = require('./invoices-helpers');
const { invoiceInBranch } = require('./invoices-helpers');

router.post('/categories', authenticateToken, async (req, res) => {
  try {
    const { name, code, description, display_order, is_active } = req.body;

    const fieldErrors = {};
    if (!name) fieldErrors.name = 'Name is required';
    if (!code) fieldErrors.code = 'Code is required';
    if (Object.keys(fieldErrors).length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Some fields are invalid. Please check the highlighted fields.',
          code: 'VALIDATION_ERROR',
          fieldErrors,
          hint: 'Both Name and Code are required to create a category.'
        }
      });
    }

    const existing = await InvoiceCategory.findOne({ where: { code } });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: {
          message: `Category code "${code}" already exists`,
          code: 'DUPLICATE',
          fieldErrors: { code: 'Already used by another category' },
          hint: 'Pick a different code, or edit the existing category instead.'
        }
      });
    }

    const category = await InvoiceCategory.create({
      name,
      code,
      description,
      display_order: display_order || 0,
      is_active: is_active !== false,
      is_system: false
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error('Error creating invoice category:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to create invoice category',
        code: 'INTERNAL_ERROR',
        hint: 'Please try again. If this persists, refresh the page or contact support.'
      }
    });
  }
});

// Update invoice category
router.put('/categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, code, description, display_order, is_active } = req.body;

    const category = await InvoiceCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }

    // Check for duplicate code if changing
    if (code && code !== category.code) {
      const existing = await InvoiceCategory.findOne({ where: { code } });
      if (existing) {
        return res.status(400).json({ success: false, error: { message: 'Category code already exists', code: 'VALIDATION_ERROR' } });
      }
    }

    // Don't allow changing system category code
    if (category.is_system && code && code !== category.code) {
      return res.status(400).json({ success: false, error: { message: 'Cannot change system category code', code: 'VALIDATION_ERROR' } });
    }

    await category.update({
      name: name || category.name,
      code: code || category.code,
      description: description !== undefined ? description : category.description,
      display_order: display_order !== undefined ? display_order : category.display_order,
      is_active: is_active !== undefined ? is_active : category.is_active
    });

    res.json({ success: true, data: category });
  } catch (error) {
    console.error('Error updating invoice category:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update invoice category', code: 'INTERNAL_ERROR' } });
  }
});

// Delete invoice category (soft delete by setting is_active = false, or hard delete)
router.delete('/categories/:categoryId', authenticateToken, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { force } = req.query;

    const category = await InvoiceCategory.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, error: { message: 'Category not found', code: 'NOT_FOUND' } });
    }

    if (force === 'true') {
      await category.destroy();
      res.json({ success: true, message: 'Category permanently deleted' });
    } else {
      await category.update({ is_active: false });
      res.json({ success: true, message: 'Category deactivated' });
    }
  } catch (error) {
    console.error('Error deleting invoice category:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete invoice category', code: 'INTERNAL_ERROR' } });
  }
});

// Initialize default invoice categories
router.post('/categories/init', authenticateToken, async (req, res) => {
  try {
    const defaultCategories = [
      { name: 'Subscription', code: 'subscription', description: 'Monthly/Annual subscription fees', display_order: 1, is_system: true },
      { name: 'Service', code: 'service', description: 'One-time service fees', display_order: 2, is_system: true },
      { name: 'Consulting', code: 'consulting', description: 'Consulting and support services', display_order: 3, is_system: true },
      { name: 'Hardware', code: 'hardware', description: 'Hardware and equipment', display_order: 4, is_system: false },
      { name: 'Training', code: 'training', description: 'Training and onboarding', display_order: 5, is_system: false },
      { name: 'Others', code: 'others', description: 'Other miscellaneous charges', display_order: 99, is_system: true }
    ];

    const created = [];
    const skipped = [];

    for (const cat of defaultCategories) {
      const existing = await InvoiceCategory.findOne({ where: { code: cat.code } });
      if (existing) {
        skipped.push(cat.code);
      } else {
        await InvoiceCategory.create({ ...cat, is_active: true });
        created.push(cat.code);
      }
    }

    res.json({
      success: true,
      message: `Created ${created.length} categories, skipped ${skipped.length} existing`,
      created,
      skipped
    });
  } catch (error) {
    console.error('Error initializing invoice categories:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to initialize invoice categories', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Invoice Detail and Management APIs
// ============================================

// Get invoices to pay (for payer view) - MUST be before /:id route
router.post('/', authenticateToken, async (req, res) => {
  const { sequelize } = require('../config/database');
  const transaction = await sequelize.transaction();

  try {
    const { invoice_data, items } = req.body;
    const { recomputeInvoiceTotals } = require('../utils/invoiceCalculation');

    // Auto-fill issued_by from authenticated user if not provided
    if (!invoice_data.issued_by) {
      invoice_data.issued_by = req.user.id;
    }
    if (!invoice_data.issued_at) {
      invoice_data.issued_at = new Date();
    }

    // Validate: issuer has payment methods for invoice currency
    const { hasPaymentMethodForCurrency } = require('../utils/paymentSettingsHelper');
    const issuerType = invoice_data.issuer_type || 'system_admin';
    const issuerId = invoice_data.issuer_id || null;
    const invoiceCurrency = invoice_data.currency || 'MYR';

    let issuerPaymentSettings = null;
    if (issuerType === 'system_admin') {
      const sysSettings = await SystemSettings.findOne({ where: { setting_key: 'payment_settings' } });
      issuerPaymentSettings = sysSettings?.setting_value || {};
    } else if (issuerType === 'brand' && issuerId) {
      const brand = await Brand.findByPk(issuerId);
      issuerPaymentSettings = brand?.payment_settings || {};
    } else if (issuerType === 'foodcourt' && issuerId) {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      issuerPaymentSettings = foodcourt?.payment_settings || {};
    }

    if (!hasPaymentMethodForCurrency(issuerPaymentSettings, invoiceCurrency)) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        error: `No payment methods configured for currency ${invoiceCurrency}. Please configure payment settings first.`
      });
    }

    // Map subtotal_before_discount → subtotal (DB column name)
    if (invoice_data.subtotal_before_discount != null && !invoice_data.subtotal) {
      invoice_data.subtotal = invoice_data.subtotal_before_discount;
      delete invoice_data.subtotal_before_discount;
    }

    // Single source of truth: items + additional_charges + discount drive
    // header.subtotal, .discount_amount, .total_amount. Caller-supplied values
    // are overwritten so the email/UI never disagrees with the DB rows.
    const recomputed = recomputeInvoiceTotals(invoice_data, items);
    Object.assign(invoice_data, recomputed.header);
    const normalizedItems = recomputed.items;

    // Generate invoice number using standardized format
    invoice_data.invoice_number = await generateInvoiceNumber(issuerType, issuerId, transaction);

    // Create invoice within transaction
    const invoice = await Invoice.create(invoice_data, { transaction });

    // Create invoice items within same transaction
    if (normalizedItems.length > 0) {
      const invoiceItems = normalizedItems.map(item => ({
        ...item,
        invoice_id: invoice.id
      }));
      await InvoiceItem.bulkCreate(invoiceItems, { transaction });
    }

    await transaction.commit();

    logActivity(req, {
      action_type: 'create',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Created invoice ${invoice.invoice_number} (${invoiceCurrency} ${invoice.total_amount})`,
      restaurant_id: invoice.restaurant_id
    });

    res.status(201).json({ success: true, invoice });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating invoice:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create invoice', code: 'INTERNAL_ERROR' } });
  }
});

// Update invoice (full update)
router.put('/:id', authenticateToken, async (req, res) => {
  const { sequelize } = require('../config/database');
  const transaction = await sequelize.transaction();

  try {
    const invoiceId = req.params.id;
    const {
      amount,
      tax,
      total,
      dueDate,
      status,
      payerType,
      payerId,
      items,
      invoiceCategory,
      customDescription,
      serviceDescription,
      notes
    } = req.body;

    // Find existing invoice
    const invoice = await Invoice.findByPk(invoiceId, { transaction });
    if (!invoice) {
      await transaction.rollback();
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    // Authorization: only the issuer or payer (restaurant) or System Admin can edit
    const userRole = req.user.role;
    const userBrandId = req.user.brand_id;
    const userFoodcourtId = req.user.foodcourt_id;
    const userRestaurantId = req.user.restaurant_id;
    const sameId = (a, b) => a != null && b != null && Number(a) === Number(b);
    let allowed = false;
    if (userRole === 'System Admin') allowed = true;
    else if (invoice.issuer_type === 'brand' && sameId(invoice.issuer_id, userBrandId)) allowed = true;
    else if (invoice.issuer_type === 'foodcourt' && sameId(invoice.issuer_id, userFoodcourtId)) allowed = true;
    else if (sameId(invoice.restaurant_id, userRestaurantId)) allowed = true;
    if (!allowed) {
      await transaction.rollback();
      return res.status(403).json({ success: false, error: { message: 'Access denied: you cannot edit this invoice', code: 'FORBIDDEN' } });
    }

    // Branch-scoped Foodcourt Manager: limit edits to their branch's invoices
    const mgrScope = getManagerScope(req.user);
    if (mgrScope.scoped && mgrScope.branch_id) {
      const inBranch = await invoiceInBranch(invoice, mgrScope.branch_id);
      if (!inBranch) {
        await transaction.rollback();
        return res.status(403).json({ success: false, error: { message: 'No access to this invoice', code: 'FORBIDDEN' } });
      }
    }

    // Prevent editing invoices that are paid, cancelled, or have payment submitted
    if (invoice.status === 'paid' || invoice.status === 'cancelled' || invoice.status === 'payment_submitted') {
      await transaction.rollback();
      return res.status(400).json({ error: `Cannot edit invoice with status: ${invoice.status}` });
    }

    // For automatic invoices, modification reason is required
    const { modificationReason } = req.body;
    if (invoice.type === 'automatic' && !modificationReason) {
      await transaction.rollback();
      return res.status(400).json({ success: false, error: { message: 'Modification reason is required for automatic invoices', code: 'VALIDATION_ERROR' } });
    }

    // Build modification history record
    const changes = {};
    if (amount !== undefined && parseFloat(amount) !== parseFloat(invoice.total_amount)) {
      changes.total_amount = { from: parseFloat(invoice.total_amount), to: parseFloat(total || amount) };
    }
    if (dueDate !== undefined && dueDate !== invoice.due_date?.toISOString?.()?.split('T')[0]) {
      changes.due_date = { from: invoice.due_date, to: dueDate };
    }
    if (notes !== undefined && notes !== invoice.notes) {
      changes.notes = { from: invoice.notes, to: notes };
    }

    // Update invoice fields (status is managed by PATCH /:id/status, not here)
    const updateData = {};
    if (amount !== undefined) updateData.total_amount = (total !== undefined && total !== null) ? total : amount;
    if (dueDate !== undefined) updateData.due_date = dueDate;
    if (payerType !== undefined) updateData.payer_type = payerType;
    if (payerId !== undefined) updateData.payer_id = payerId || null;
    const { restaurantId } = req.body;
    if (restaurantId !== undefined) updateData.restaurant_id = restaurantId || null;
    if (invoiceCategory !== undefined) updateData.invoice_category = invoiceCategory;
    const { contractId } = req.body;
    if (contractId !== undefined) updateData.contract_id = contractId || null;
    if (customDescription !== undefined) updateData.custom_description = customDescription;
    if (serviceDescription !== undefined) updateData.service_description = serviceDescription;
    if (notes !== undefined) updateData.notes = notes;

    // Track discount changes
    const { discountType, discountValue, discountAmount, discountReason, subtotal } = req.body;
    if (discountType !== undefined) {
      if (discountType !== invoice.discount_type) changes.discount_type = { from: invoice.discount_type, to: discountType };
      updateData.discount_type = discountType;
    }
    if (discountValue !== undefined) {
      if (parseFloat(discountValue) !== parseFloat(invoice.discount_value)) changes.discount_value = { from: parseFloat(invoice.discount_value), to: parseFloat(discountValue) };
      updateData.discount_value = discountValue;
    }
    if (discountAmount !== undefined) updateData.discount_amount = discountAmount;
    if (discountReason !== undefined) updateData.discount_reason = discountReason;
    if (subtotal !== undefined) updateData.subtotal = subtotal;

    // Update additional charges if provided
    const { additionalCharges } = req.body;
    if (additionalCharges !== undefined) {
      updateData.additional_charges = additionalCharges;
    }

    // Save modification history if there are actual changes
    if (Object.keys(changes).length > 0 || modificationReason) {
      const history = Array.isArray(invoice.modification_history) ? [...invoice.modification_history] : [];
      history.push({
        modified_at: new Date().toISOString(),
        modified_by: req.user.id,
        modified_by_name: req.user.full_name || req.user.username,
        changes,
        reason: modificationReason || ''
      });
      updateData.is_modified = true;
      updateData.modification_history = history;
    }

    // Determine items to use for recalculation: incoming `items` if provided,
    // else existing rows (so an additional_charges/discount edit alone still
    // recomputes header against the items already on disk).
    let itemsForRecalc;
    if (items && Array.isArray(items)) {
      itemsForRecalc = items.map(item => ({
        invoice_id: invoiceId,
        item_type: item.itemType || item.item_type || 'service',
        description: item.description || '',
        quantity: Number(item.quantity ?? 1),
        unit: item.unit || null,
        unit_price: item.unitPrice || item.unit_price || 0,
        calculation_method: item.calculationMethod || 'fixed',
        calculated_amount: item.unitPrice || item.unit_price || item.calculatedAmount || 0,
        tax_rate: item.taxRate || item.tax_rate || 0,
        tax_amount: item.taxAmount || item.tax_amount || 0,
        total_amount: item.total || item.total_amount || 0
      }));
    } else {
      const existingItems = await InvoiceItem.findAll({
        where: { invoice_id: invoiceId },
        transaction
      });
      itemsForRecalc = existingItems.map(r => r.toJSON());
    }

    // Single source of truth recalculation. Merge incoming partial updates
    // with the existing invoice row so unspecified fields (e.g. existing
    // additional_charges or discount) are still considered.
    const { recomputeInvoiceTotals } = require('../utils/invoiceCalculation');
    const mergedHeader = {
      subtotal: updateData.subtotal !== undefined ? updateData.subtotal : invoice.subtotal,
      additional_charges: updateData.additional_charges !== undefined ? updateData.additional_charges : invoice.additional_charges,
      discount_type: updateData.discount_type !== undefined ? updateData.discount_type : invoice.discount_type,
      discount_value: updateData.discount_value !== undefined ? updateData.discount_value : invoice.discount_value
    };
    const recomputed = recomputeInvoiceTotals(mergedHeader, itemsForRecalc);
    updateData.subtotal = recomputed.header.subtotal;
    updateData.discount_amount = recomputed.header.discount_amount;
    updateData.total_amount = recomputed.header.total_amount;

    await invoice.update(updateData, { transaction });

    // Update items if provided (replace) or normalize existing rows so each
    // row's total_amount = calculated_amount + tax_amount.
    if (items && Array.isArray(items)) {
      await InvoiceItem.destroy({
        where: { invoice_id: invoiceId },
        transaction
      });
      if (recomputed.items.length > 0) {
        await InvoiceItem.bulkCreate(
          recomputed.items.map(it => ({ ...it, invoice_id: invoiceId })),
          { transaction }
        );
      }
    } else if (recomputed.items.length > 0) {
      for (const it of recomputed.items) {
        await InvoiceItem.update(
          { calculated_amount: it.calculated_amount, tax_amount: it.tax_amount, total_amount: it.total_amount },
          { where: { id: it.id }, transaction }
        );
      }
    }

    await transaction.commit();

    // Fetch updated invoice with items
    const updatedInvoice = await Invoice.findByPk(invoiceId, {
      include: [{
        model: InvoiceItem,
        as: 'items'
      }]
    });

    // Optional: resend invoice email after update so the recipient sees the
    // current totals/items. Caller passes `resend_email: true` (or `resendEmail`).
    let emailResendStatus = null;
    if (req.body.resend_email === true || req.body.resendEmail === true) {
      try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const resp = await fetch(`${baseUrl}/api/invoices/${invoiceId}/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': req.headers.authorization || ''
          },
          body: JSON.stringify({})
        });
        emailResendStatus = resp.ok ? 'sent' : `failed_${resp.status}`;
      } catch (e) {
        console.error('Resend email after update failed:', e.message);
        emailResendStatus = 'error';
      }
    }

    res.json({ success: true, invoice: updatedInvoice, emailResendStatus });
  } catch (error) {
    await transaction.rollback();
    console.error('Error updating invoice:', error.message, error.sql || '');
    res.status(500).json({ error: 'Failed to update invoice', details: error.message });
  }
});

// Update invoice status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, paid_amount, paid_at, payment_notes } = req.body;

    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    // Authorization: only the payer (invoice's restaurant), the issuer entity, or a
    // System Admin may change an invoice's status (incl. marking it paid). Without
    // this, any authenticated user could tamper with any invoice cross-tenant.
    let canModify = req.user.role === 'System Admin';
    if (!canModify && invoice.restaurant_id) {
      canModify = await userCanAccessRestaurant(req.user, invoice.restaurant_id);
    }
    if (!canModify && invoice.issuer_type && invoice.issuer_id) {
      const issuerEntity = invoice.issuer_type === 'system_admin' ? 'system' : invoice.issuer_type;
      canModify = await userCanAccessEntity(req.user, issuerEntity, invoice.issuer_id);
    }
    if (!canModify) {
      return res.status(403).json({ success: false, error: { message: 'Not authorized to modify this invoice', code: 'FORBIDDEN' } });
    }

    const previousStatus = invoice.status;
    const updateData = { status };
    if (status === 'paid') {
      updateData.paid_amount = paid_amount || invoice.total_amount;
      updateData.paid_at = paid_at || new Date();
    }
    if (payment_notes) {
      updateData.payment_notes = payment_notes;
    }

    await invoice.update(updateData);

    // Centralised side-effects: subscription restore + referral commission on
    // entry to 'paid'; commission reversal on exit from 'paid'.
    if (status === 'paid' && previousStatus !== 'paid') {
      const { handleInvoicePaid } = require('../services/invoiceLifecycle');
      handleInvoicePaid(invoice.id).catch(e =>
        console.error('[invoices-main /:id/status] handleInvoicePaid:', e.message)
      );
    } else if (previousStatus === 'paid' && status !== 'paid') {
      const { handleInvoiceCancelled } = require('../services/invoiceLifecycle');
      handleInvoiceCancelled(invoice.id, `Invoice status changed from paid to ${status}`).catch(e =>
        console.error('[invoices-main /:id/status] handleInvoiceCancelled:', e.message)
      );
    }

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Updated invoice ${invoice.invoice_number} status to "${status}"`,
      restaurant_id: invoice.restaurant_id
    });

    res.json({ success: true, invoice });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update invoice status', code: 'INTERNAL_ERROR' } });
  }
});

// Record payment for invoice

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    // Branch-scoped Foodcourt Manager: limit deletes to their branch's invoices
    const mgrScope = getManagerScope(req.user);
    if (mgrScope.scoped && mgrScope.branch_id) {
      const inBranch = await invoiceInBranch(invoice, mgrScope.branch_id);
      if (!inBranch) return res.status(403).json({ success: false, message: 'No access to this invoice' });
    }

    // If the invoice was paid, reverse any referral commission BEFORE destroying
    // so the referrer's wallet stays in sync with actually-collected revenue.
    // cancelCommissionsForInvoice only needs the id, so the order is for
    // observability (we'd rather see the wallet adjustment alongside the delete).
    const wasPaid = invoice.status === 'paid';
    if (wasPaid) {
      const { handleInvoiceCancelled } = require('../services/invoiceLifecycle');
      try {
        await handleInvoiceCancelled(invoice.id, `Invoice ${invoice.invoice_number} deleted`);
      } catch (e) {
        console.error('[DELETE Invoice] handleInvoiceCancelled failed:', e.message);
      }
    }

    // Delete invoice items first
    await InvoiceItem.destroy({
      where: { invoice_id: req.params.id }
    });

    const invoiceNumber = invoice.invoice_number;
    const invoiceRestaurantId = invoice.restaurant_id;

    // Null out FK references from hardware_quotes before deleting.
    // hardware_quotes.invoice_id and subscription_invoice_id reference this invoice.
    // Without nulling, FK constraint blocks deletion.
    const { sequelize } = require('../config/database');
    try {
      await sequelize.query('UPDATE hardware_quotes SET invoice_id = NULL WHERE invoice_id = ?', { replacements: [req.params.id] });
      await sequelize.query('UPDATE hardware_quotes SET subscription_invoice_id = NULL WHERE subscription_invoice_id = ?', { replacements: [req.params.id] });
    } catch (fkError) {
      console.warn('[DELETE Invoice] Could not null hardware_quotes FK refs:', fkError.message);
    }

    // Delete invoice
    await invoice.destroy();

    logActivity(req, {
      action_type: 'delete',
      entity_type: 'invoice',
      entity_id: req.params.id,
      entity_name: invoiceNumber,
      description: `Deleted invoice ${invoiceNumber}`,
      restaurant_id: invoiceRestaurantId
    });

    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete invoice', code: 'INTERNAL_ERROR' } });
  }
});

// Get invoice settings for a restaurant
router.get('/settings/:restaurantId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const settings = await InvoiceSettings.findOne({
      where: { restaurant_id: req.params.restaurantId }
    });
    
    if (!settings) {
      // Return default settings if none exist
      return res.json({
        auto_generate: false,
        payment_terms: 30,
        solution_fee_enabled: true,
        tax_rate: 10,
        invoice_prefix: 'INV'
      });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching invoice settings:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch invoice settings', code: 'INTERNAL_ERROR' } });
  }
});

// Update invoice settings
router.put('/settings/:restaurantId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    let settings = await InvoiceSettings.findOne({
      where: { restaurant_id: restaurantId }
    });
    
    if (settings) {
      await settings.update(req.body);
    } else {
      settings = await InvoiceSettings.create({
        restaurant_id: restaurantId,
        ...req.body
      });
    }
    
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating invoice settings:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update invoice settings', code: 'INTERNAL_ERROR' } });
  }
});

router.put('/update-payer/:restaurantId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { payment_model } = req.body;
    // Get restaurant with brand/foodcourt info
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    // Determine new payer based on payment_model
    let newPayerType = 'restaurant';
    let newPayerId = null;

    if (payment_model === 'brand_manager' && restaurant.brand_id) {
      const brand = await Brand.findByPk(restaurant.brand_id);
      if (brand && brand.owner_id) {
        newPayerType = 'brand_manager';
        newPayerId = brand.owner_id;
      }
    } else if (payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
      const foodcourt = await Foodcourt.findByPk(restaurant.foodcourt_id);
      if (foodcourt && foodcourt.owner_id) {
        newPayerType = 'foodcourt_manager';
        newPayerId = foodcourt.owner_id;
      }
    }

    // Update all unpaid invoices (pending_payment, overdue, draft)
    const unpaidStatuses = ['draft', 'pending_payment', 'overdue'];
    const [updatedCount] = await Invoice.update(
      {
        payer_type: newPayerType,
        payer_id: newPayerId
      },
      {
        where: {
          restaurant_id: restaurantId,
          status: unpaidStatuses
        }
      }
    );
    res.json({
      success: true,
      message: `Updated ${updatedCount} unpaid invoices`,
      updatedCount,
      newPayerType,
      newPayerId
    });
  } catch (error) {
    console.error('Error updating invoice payers:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update invoice payers', code: 'INTERNAL_ERROR' } });
  }
});

// Send invoice via email (uses issuer's SMTP settings)
/**
 * POST /api/invoices/:id/link-account
 * Link an external (non-member) invoice to a user account
 */
router.post('/:id/link-account', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { restaurant_id, payer_id, payer_type } = req.body;

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    if (invoice.status === 'paid' || invoice.status === 'cancelled') {
      return res.status(400).json({ success: false, message: `Cannot modify invoice with status: ${invoice.status}` });
    }

    const updateData = {};
    if (restaurant_id !== undefined) updateData.restaurant_id = restaurant_id;
    if (payer_id !== undefined) updateData.payer_id = payer_id;
    if (payer_type !== undefined) updateData.payer_type = payer_type;

    await invoice.update(updateData);

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Linked invoice ${invoice.invoice_number} to account (restaurant_id: ${restaurant_id}, payer_id: ${payer_id})`,
      restaurant_id: restaurant_id
    });

    res.json({ success: true, message: 'Account linked successfully', data: invoice });
  } catch (error) {
    console.error('Link account error:', error);
    res.status(500).json({ success: false, message: 'Failed to link account' });
  }
});

// Send invoice via email (uses issuer's SMTP settings)
router.post('/:id/send-email', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    let { recipientEmail } = req.body;

    // Fallback to external payer email if not provided
    if (!recipientEmail) {
      const tempInvoice = await Invoice.findByPk(id, { attributes: ['external_payer_email'] });
      if (tempInvoice?.external_payer_email) {
        recipientEmail = tempInvoice.external_payer_email;
      }
    }

    if (!recipientEmail || !recipientEmail.includes('@')) {
      return res.status(400).json({ success: false, error: { message: 'Valid recipient email is required', code: 'VALIDATION_ERROR' } });
    }

    // Get the invoice with items and restaurant
    const invoice = await Invoice.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'admin_id', 'admin_name', 'plan_type', 'email', 'operation_settings']
      }, {
        model: InvoiceItem,
        as: 'items'
      }]
    });

    if (!invoice) {
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    const { sendIssuerEmail } = require('../utils/emailService');
    const { invoiceEmail, entityPlanInvoiceEmail } = require('../utils/emailTemplates');

    const siteUrl = process.env.SITE_URL || 'https://purplehere.com';
    const invTz = getInvoiceTimezone(invoice);
    const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric', timeZone: invTz }) : '-';
    const issuerType = invoice.issuer_type || 'system_admin';
    const issuerId = invoice.issuer_id;

    // Get issuer info for branding
    let issuerInfo = null;
    if (issuerType === 'brand' && issuerId) {
      const brand = await Brand.findByPk(issuerId);
      if (brand) {
        issuerInfo = { name: brand.name, logoUrl: brand.logo_url, companyName: brand.company_name, color: '#635BFF' };
      }
    } else if (issuerType === 'foodcourt' && issuerId) {
      const foodcourt = await Foodcourt.findByPk(issuerId);
      if (foodcourt) {
        issuerInfo = { name: foodcourt.name, logoUrl: foodcourt.logo_url, companyName: foodcourt.company_name, color: '#059669' };
      }
    }

    // Get recipient name
    let recipientName = 'Restaurant Admin';
    if (invoice.restaurant?.admin_id) {
      const adminUser = await User.findByPk(invoice.restaurant.admin_id);
      if (adminUser) recipientName = adminUser.full_name || adminUser.username;
    }

    // Build email based on invoice type. additional_charges + discount come
    // from the invoice header (recomputed at write time so they're authoritative).
    const additionalCharges = Array.isArray(invoice.additional_charges) ? invoice.additional_charges : [];
    const discountAmount = parseFloat(invoice.discount_amount || 0);
    const discountLabel = invoice.discount_type === 'percentage' && invoice.discount_value
      ? `Discount (${invoice.discount_value}%)`
      : (invoice.discount_type && invoice.discount_type !== 'none' ? 'Discount' : null);

    let emailContent;
    if (issuerType !== 'system_admin' && invoice.items && invoice.items.length > 0) {
      // Entity plan invoice (brand/foodcourt) — use multi-item template
      const items = invoice.items.map(item => ({
        description: item.description,
        calculated_amount: item.calculated_amount,
        tax_amount: item.tax_amount,
        total_amount: item.total_amount
      }));
      const subtotal = items.reduce((sum, i) => sum + parseFloat(i.calculated_amount), 0);
      const taxTotal = items.reduce((sum, i) => sum + parseFloat(i.tax_amount), 0);
      // Find revenue from base_amount of percentage items
      const revenueItem = invoice.items.find(i => i.base_amount && parseFloat(i.base_amount) > 0);
      const revenue = revenueItem ? parseFloat(revenueItem.base_amount) : undefined;

      emailContent = entityPlanInvoiceEmail({
        recipientName,
        restaurantName: invoice.restaurant?.name || 'Restaurant',
        invoiceNumber: invoice.invoice_number,
        planName: invoice.category_display_name || 'Plan',
        items,
        subtotal,
        taxAmount: taxTotal,
        additionalCharges,
        discountAmount,
        discountLabel,
        totalAmount: parseFloat(invoice.total_amount),
        currency: invoice.currency || 'MYR',
        billingPeriodStart: formatDate(invoice.billing_period_start),
        billingPeriodEnd: formatDate(invoice.billing_period_end),
        dueDate: formatDate(invoice.due_date),
        revenue,
        dashboardUrl: siteUrl + '/pos/login',
        issuerInfo
      });
    } else {
      // POS subscription invoice (system_admin) — use simple template
      const subtotal = invoice.items?.reduce((sum, i) => sum + parseFloat(i.calculated_amount || 0), 0)
        || parseFloat(invoice.subtotal || invoice.total_amount);
      const taxTotal = invoice.items?.reduce((sum, i) => sum + parseFloat(i.tax_amount || 0), 0) || 0;

      emailContent = invoiceEmail({
        adminName: recipientName,
        restaurantName: invoice.restaurant?.name || 'Restaurant',
        invoiceNumber: invoice.invoice_number,
        planType: invoice.category_display_name || invoice.restaurant?.plan_type || 'Subscription',
        billingCycle: 'Monthly',
        subtotal,
        taxRate: invoice.items?.[0]?.tax_rate || 0,
        taxAmount: taxTotal,
        additionalCharges,
        discountAmount,
        discountLabel,
        totalAmount: parseFloat(invoice.total_amount),
        currency: invoice.currency || 'MYR',
        billingPeriodStart: formatDate(invoice.billing_period_start),
        billingPeriodEnd: formatDate(invoice.billing_period_end),
        dueDate: formatDate(invoice.due_date),
        dashboardUrl: siteUrl + '/pos/login',
        issuerInfo
      });
    }

    // Send using issuer's SMTP
    const result = await sendIssuerEmail(issuerType, issuerId, {
      to: recipientEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    });
    res.json({
      success: true,
      message: `Invoice ${invoice.invoice_number} sent to ${recipientEmail}`,
      invoiceNumber: invoice.invoice_number,
      recipient: recipientEmail,
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({ error: `Failed to send invoice email: ${error.message}` });
  }
});

// Generate missing subscription invoices for a restaurant (backfill)

module.exports = router;
