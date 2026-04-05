const express = require('express');
const router = express.Router();
const { HardwareQuote, SystemProduct, User, Restaurant, Invoice, InvoiceItem } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { Op } = require('sequelize');

// ============================================
// Hardware Quotes Management (System Admin)
// ============================================

/**
 * GET /api/hardware-quotes/stats
 * Quote statistics
 */
router.get('/stats', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const total = await HardwareQuote.count();
    const newCount = await HardwareQuote.count({ where: { status: 'new' } });
    const contacted = await HardwareQuote.count({ where: { status: 'contacted' } });
    const confirmed = await HardwareQuote.count({ where: { status: 'confirmed' } });
    const invoiced = await HardwareQuote.count({ where: { status: 'invoiced' } });

    res.json({
      success: true,
      data: { total, new: newCount, contacted, confirmed, invoiced }
    });
  } catch (error) {
    console.error('Get hardware quote stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

/**
 * GET /api/hardware-quotes
 * List all quotes with filters
 */
router.get('/', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { contact_name: { [Op.like]: `%${search}%` } },
        { contact_email: { [Op.like]: `%${search}%` } },
        { company_name: { [Op.like]: `%${search}%` } },
        { quote_number: { [Op.like]: `%${search}%` } }
      ];
    }

    const quotes = await HardwareQuote.findAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
        { model: SystemProduct, as: 'packageProduct', attributes: ['id', 'name', 'set_group', 'set_tier'] },
        { model: Invoice, as: 'invoice', attributes: ['id', 'invoice_number', 'status', 'total_amount'] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({ success: true, data: quotes });
  } catch (error) {
    console.error('Get hardware quotes error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch quotes' });
  }
});

/**
 * GET /api/hardware-quotes/:id
 * Single quote detail
 */
router.get('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const quote = await HardwareQuote.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'full_name', 'email', 'role', 'phone'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
        { model: SystemProduct, as: 'packageProduct', attributes: ['id', 'name', 'set_group', 'set_tier', 'set_use_case'] },
        { model: Invoice, as: 'invoice', attributes: ['id', 'invoice_number', 'status', 'total_amount', 'currency'] }
      ]
    });

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }

    res.json({ success: true, data: quote });
  } catch (error) {
    console.error('Get hardware quote error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch quote' });
  }
});

/**
 * PATCH /api/hardware-quotes/:id
 * Update quote status, notes, user link
 */
router.patch('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes, assigned_to, user_id, restaurant_id } = req.body;

    const quote = await HardwareQuote.findByPk(id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }

    const updates = {};
    if (status !== undefined) {
      updates.status = status;
      if (status === 'contacted' && !quote.replied_at) updates.replied_at = new Date();
      if (status === 'confirmed' && !quote.confirmed_at) updates.confirmed_at = new Date();
    }
    if (admin_notes !== undefined) updates.admin_notes = admin_notes;
    if (assigned_to !== undefined) updates.assigned_to = assigned_to;
    if (user_id !== undefined) updates.user_id = user_id;
    if (restaurant_id !== undefined) updates.restaurant_id = restaurant_id;

    await quote.update(updates);

    const updated = await HardwareQuote.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['id', 'full_name', 'email', 'role'] },
        { model: Restaurant, as: 'restaurant', attributes: ['id', 'name'] },
        { model: SystemProduct, as: 'packageProduct', attributes: ['id', 'name', 'set_group', 'set_tier'] },
        { model: Invoice, as: 'invoice', attributes: ['id', 'invoice_number', 'status', 'total_amount'] }
      ]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update hardware quote error:', error);
    res.status(500).json({ success: false, message: 'Failed to update quote' });
  }
});

/**
 * DELETE /api/hardware-quotes/:id
 */
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const quote = await HardwareQuote.findByPk(req.params.id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }

    await quote.destroy();
    res.json({ success: true, message: 'Quote deleted successfully' });
  } catch (error) {
    console.error('Delete hardware quote error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete quote' });
  }
});

/**
 * POST /api/hardware-quotes/:id/invoice
 * Create invoice from quote
 */
router.post('/:id/invoice', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { due_date, discount_type, discount_value, additional_charges } = req.body;

    const quote = await HardwareQuote.findByPk(id, {
      include: [
        { model: User, as: 'user' },
        { model: Restaurant, as: 'restaurant' }
      ]
    });

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }

    if (quote.status === 'invoiced') {
      return res.status(400).json({ success: false, message: 'Invoice already created for this quote' });
    }

    // Generate invoice number
    const now = new Date();
    const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
    const { sequelize } = require('../config/database');
    const [countResult] = await sequelize.query(
      `SELECT COUNT(*) as cnt FROM invoices WHERE DATE(createdAt) = CURDATE()`
    );
    const todayCount = countResult[0]?.cnt || 0;
    const invoiceNumber = `INV-${dateStr}${String(todayCount + 1).padStart(3, '0')}`;

    // Calculate amounts
    const subtotal = parseFloat(quote.total_amount) || 0;
    let discountAmount = 0;
    if (discount_type === 'percentage' && discount_value) {
      discountAmount = subtotal * (parseFloat(discount_value) / 100);
    } else if (discount_type === 'fixed' && discount_value) {
      discountAmount = parseFloat(discount_value);
    }
    const afterDiscount = subtotal - discountAmount;

    // Calculate additional charges (tax, etc.)
    let chargesTotal = 0;
    const charges = additional_charges || [];
    charges.forEach(charge => {
      if (charge.rate) {
        charge.amount = afterDiscount * (parseFloat(charge.rate) / 100);
        chargesTotal += charge.amount;
      }
    });

    const totalAmount = afterDiscount + chargesTotal;

    // Create invoice
    const invoice = await Invoice.create({
      restaurant_id: quote.restaurant_id || null,
      invoice_number: invoiceNumber,
      type: 'manual',
      invoice_category: 'hardware',
      category_display_name: 'Hardware Package',
      due_date: due_date || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      subtotal: subtotal,
      discount_type: discount_type || 'none',
      discount_value: discount_value || 0,
      discount_amount: discountAmount,
      total_amount: totalAmount,
      currency: quote.currency || 'MYR',
      status: 'draft',
      issuer_type: 'system_admin',
      issued_by: req.user.id,
      issued_at: new Date(),
      payer_type: 'restaurant',
      payer_id: quote.user_id || null,
      additional_charges: charges.length > 0 ? charges : null,
      notes: [
        `Hardware Quote: ${quote.quote_number}`,
        `${quote.contact_name} (${quote.contact_email})`,
        quote.company_name ? `Company: ${quote.company_name}` : null,
        quote.company_address ? `Address: ${quote.company_address}` : null,
        quote.tax_id ? `Tax ID: ${quote.tax_id}` : null
      ].filter(Boolean).join('\n'),
      custom_description: `Hardware package quote ${quote.quote_number}`
    });

    // Create invoice items
    // 1. Package item
    if (quote.package_snapshot) {
      const snapshot = typeof quote.package_snapshot === 'string'
        ? JSON.parse(quote.package_snapshot) : quote.package_snapshot;

      await InvoiceItem.create({
        invoice_id: invoice.id,
        item_type: 'hardware_package',
        description: `${snapshot.name || 'Hardware Package'} - ${(snapshot.set_items || []).map(i => `${i.name} x${i.quantity}`).join(', ')}`,
        calculation_method: 'fixed',
        fixed_amount: parseFloat(quote.package_price) || 0,
        calculated_amount: parseFloat(quote.package_price) || 0,
        tax_rate: 0,
        tax_amount: 0,
        total_amount: parseFloat(quote.package_price) || 0
      });
    }

    // 2. Addon items
    const addonItems = quote.addon_items || [];
    for (const addon of addonItems) {
      if (addon.quantity > 0) {
        await InvoiceItem.create({
          invoice_id: invoice.id,
          item_type: 'hardware_addon',
          description: `${addon.name} x${addon.quantity}`,
          calculation_method: 'fixed',
          fixed_amount: parseFloat(addon.subtotal) || 0,
          calculated_amount: parseFloat(addon.subtotal) || 0,
          tax_rate: 0,
          tax_amount: 0,
          total_amount: parseFloat(addon.subtotal) || 0
        });
      }
    }

    // Update quote - link invoice but keep current status (not closed)
    await quote.update({
      invoice_id: invoice.id
    });

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: {
        invoice_id: invoice.id,
        invoice_number: invoiceNumber,
        total_amount: totalAmount,
        quote_id: quote.id
      }
    });
  } catch (error) {
    console.error('Create invoice from quote error:', error);
    res.status(500).json({ success: false, message: 'Failed to create invoice' });
  }
});

/**
 * POST /api/hardware-quotes/:id/proceed
 * 계약 진행: hardware + subscription 인보이스 생성
 * 계정 연결 필수
 */
router.post('/:id/proceed', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { due_date, discount_type, discount_value, additional_charges, mark_as_paid } = req.body;

    const quote = await HardwareQuote.findByPk(id, {
      include: [
        { model: User, as: 'user' },
        { model: Restaurant, as: 'restaurant' }
      ]
    });

    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }

    const isExternal = !quote.user_id;

    if (quote.status === 'invoiced') {
      return res.status(400).json({ success: false, message: 'Already processed' });
    }

    const { sequelize } = require('../config/database');
    const { PlanTemplate, PlanPrice } = require('../models');

    // Generate invoice numbers
    const now = new Date();
    const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
    const [countResult] = await sequelize.query(
      `SELECT COUNT(*) as cnt FROM invoices WHERE DATE(createdAt) = CURDATE()`
    );
    let seqNum = (countResult[0]?.cnt || 0) + 1;

    const dueDate = due_date || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
    const invoiceStatus = mark_as_paid ? 'paid' : 'draft';
    const paidFields = mark_as_paid ? { paid_at: now, paid_amount: 0, confirmed_by: req.user.id, confirmed_at: now } : {};

    const results = { hardware_invoice: null, subscription_invoice: null };

    // === 1. Hardware Invoice ===
    const hwSubtotal = parseFloat(quote.total_amount) || 0;
    let hwDiscount = 0;
    if (discount_type === 'percentage' && discount_value) {
      hwDiscount = hwSubtotal * (parseFloat(discount_value) / 100);
    } else if (discount_type === 'fixed' && discount_value) {
      hwDiscount = parseFloat(discount_value);
    }
    const hwAfterDiscount = hwSubtotal - hwDiscount;
    let hwChargesTotal = 0;
    const charges = additional_charges || [];
    charges.forEach(charge => {
      if (charge.rate) {
        charge.amount = hwAfterDiscount * (parseFloat(charge.rate) / 100);
        hwChargesTotal += charge.amount;
      }
    });
    const hwTotal = hwAfterDiscount + hwChargesTotal;

    const hwInvoiceNumber = `INV-${dateStr}${String(seqNum).padStart(3, '0')}`;
    seqNum++;

    const hwInvoice = await Invoice.create({
      restaurant_id: quote.restaurant_id || null,
      invoice_number: hwInvoiceNumber,
      type: 'manual',
      invoice_category: 'hardware',
      category_display_name: 'Hardware Package',
      due_date: dueDate,
      subtotal: hwSubtotal,
      discount_type: discount_type || 'none',
      discount_value: discount_value || 0,
      discount_amount: hwDiscount,
      total_amount: hwTotal,
      currency: quote.currency || 'MYR',
      status: invoiceStatus,
      issuer_type: 'system_admin',
      issued_by: req.user.id,
      issued_at: now,
      payer_type: isExternal ? 'external' : 'restaurant',
      payer_id: isExternal ? null : quote.user_id,
      ...(isExternal ? {
        external_payer_name: quote.contact_name,
        external_payer_email: quote.contact_email,
        external_payer_phone: quote.contact_phone,
        external_payer_company: quote.company_name,
        external_payer_address: quote.company_address,
        external_payer_tax_id: quote.tax_id
      } : {}),
      additional_charges: charges.length > 0 ? charges : null,
      notes: [
        `Hardware Quote: ${quote.quote_number}`,
        `${quote.contact_name} (${quote.contact_email})`,
        quote.company_name ? `Company: ${quote.company_name}` : null,
        quote.company_address ? `Address: ${quote.company_address}` : null,
        quote.tax_id ? `Tax ID: ${quote.tax_id}` : null
      ].filter(Boolean).join('\n'),
      ...paidFields,
      ...(mark_as_paid ? { paid_amount: hwTotal } : {})
    });

    // Hardware invoice items
    if (quote.package_snapshot) {
      const snapshot = typeof quote.package_snapshot === 'string'
        ? JSON.parse(quote.package_snapshot) : quote.package_snapshot;
      await InvoiceItem.create({
        invoice_id: hwInvoice.id,
        item_type: 'hardware_package',
        description: `${snapshot.name || 'Hardware Package'} - ${(snapshot.set_items || []).map(i => `${i.name} x${i.quantity}`).join(', ')}`,
        calculation_method: 'fixed',
        fixed_amount: parseFloat(quote.package_price) || 0,
        calculated_amount: parseFloat(quote.package_price) || 0,
        tax_rate: 0, tax_amount: 0,
        total_amount: parseFloat(quote.package_price) || 0
      });
    }

    const addonItems = quote.addon_items || [];
    for (const addon of addonItems) {
      if (addon.quantity > 0) {
        await InvoiceItem.create({
          invoice_id: hwInvoice.id,
          item_type: 'hardware_addon',
          description: `${addon.name} x${addon.quantity}`,
          calculation_method: 'fixed',
          fixed_amount: parseFloat(addon.subtotal || addon.total_price || 0),
          calculated_amount: parseFloat(addon.subtotal || addon.total_price || 0),
          tax_rate: 0, tax_amount: 0,
          total_amount: parseFloat(addon.subtotal || addon.total_price || 0)
        });
      }
    }

    // Setup services line item (from package_snapshot.set_setup_items)
    const snapshot = quote.package_snapshot
      ? (typeof quote.package_snapshot === 'string' ? JSON.parse(quote.package_snapshot) : quote.package_snapshot)
      : null;
    if (snapshot?.set_setup_items && Array.isArray(snapshot.set_setup_items) && snapshot.set_setup_items.length > 0) {
      await InvoiceItem.create({
        invoice_id: hwInvoice.id,
        item_type: 'setup_service',
        description: `Included Setup: ${snapshot.set_setup_items.join(', ')}`,
        calculation_method: 'fixed',
        fixed_amount: 0,
        calculated_amount: 0,
        tax_rate: 0, tax_amount: 0,
        total_amount: 0
      });
    }

    results.hardware_invoice = { id: hwInvoice.id, invoice_number: hwInvoiceNumber, total_amount: hwTotal };

    // === 2. Subscription Invoice (if plan selected) ===
    let subInvoice = null;
    if (quote.plan_id) {
      const plan = await PlanTemplate.findByPk(quote.plan_id);
      if (plan) {
        const cycle = quote.billing_cycle || 'monthly';
        const currency = quote.currency || 'MYR';

        // Get plan price for currency
        const planPrice = await PlanPrice.findOne({
          where: { plan_id: plan.id, currency, is_active: true }
        });
        const price = planPrice
          ? (cycle === 'annual' ? parseFloat(planPrice.annual_price) : parseFloat(planPrice.monthly_price))
          : (cycle === 'annual' ? parseFloat(plan.base_price_annual) : parseFloat(plan.base_price_monthly));

        const subInvoiceNumber = `INV-${dateStr}${String(seqNum).padStart(3, '0')}`;

        const billingEnd = new Date(dueDate);
        if (cycle === 'annual') {
          billingEnd.setFullYear(billingEnd.getFullYear() + 1);
        } else {
          billingEnd.setMonth(billingEnd.getMonth() + 1);
        }

        subInvoice = await Invoice.create({
          restaurant_id: quote.restaurant_id || null,
          invoice_number: subInvoiceNumber,
          type: 'manual',
          invoice_category: 'subscription',
          category_display_name: `Subscription - ${plan.display_name || plan.name}`,
          billing_period_start: dueDate,
          billing_period_end: billingEnd,
          due_date: dueDate,
          subtotal: price,
          total_amount: price,
          currency: currency,
          status: invoiceStatus,
          issuer_type: 'system_admin',
          issued_by: req.user.id,
          issued_at: now,
          payer_type: isExternal ? 'external' : 'restaurant',
          payer_id: isExternal ? null : quote.user_id,
          ...(isExternal ? {
            external_payer_name: quote.contact_name,
            external_payer_email: quote.contact_email,
            external_payer_phone: quote.contact_phone,
            external_payer_company: quote.company_name,
            external_payer_address: quote.company_address,
            external_payer_tax_id: quote.tax_id
          } : {}),
          notes: `${plan.display_name || plan.name} - ${cycle} subscription. From hardware quote ${quote.quote_number}`,
          ...paidFields,
          ...(mark_as_paid ? { paid_amount: price } : {})
        });

        await InvoiceItem.create({
          invoice_id: subInvoice.id,
          item_type: 'subscription',
          description: `${plan.display_name || plan.name} - ${cycle === 'annual' ? 'Annual' : 'Monthly'} Subscription`,
          calculation_method: 'fixed',
          fixed_amount: price,
          calculated_amount: price,
          tax_rate: 0, tax_amount: 0,
          total_amount: price
        });

        results.subscription_invoice = { id: subInvoice.id, invoice_number: subInvoiceNumber, total_amount: price };
      }
    }

    // Update quote - link invoices but keep current status (not closed)
    await quote.update({
      invoice_id: hwInvoice.id,
      subscription_invoice_id: subInvoice ? subInvoice.id : null
    });

    res.status(201).json({
      success: true,
      message: 'Contract proceeded successfully',
      data: results
    });
  } catch (error) {
    console.error('Proceed contract error:', error);
    res.status(500).json({ success: false, message: 'Failed to proceed contract' });
  }
});

module.exports = router;
