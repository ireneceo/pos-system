// 인보이스 결제 (Stripe/PayPal/Manual submit/confirm/reject)
// 마운트: /api/invoices

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
const { handleInvoicePaid } = require('../services/invoiceLifecycle');

const PAYMENT_SETTINGS_KEY = 'payment_settings';
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
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
  getCategoryDisplayName,
  checkPaymentPermission,
  checkConfirmPermission,
} = require('./invoices-helpers');

router.post('/:id/payment', authenticateToken, async (req, res) => {
  try {
    const { payment_method, transaction_id, payment_date, notes, receipt_url } = req.body;

    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    if (invoice.status === 'paid') {
      return res.status(400).json({ success: false, error: { message: 'Invoice is already paid', code: 'VALIDATION_ERROR' } });
    }

    // Update invoice with payment information + SOA cascade (B1 재설계)
    const updateData = {
      status: 'paid',
      paid_amount: invoice.total_amount,
      paid_at: payment_date || new Date(),
      payment_method: payment_method || 'bank_transfer',
      transaction_id,
      payment_notes: notes,
      receipt_url
    };
    const { sequelize: _seqA } = require('../config/database');
    await _seqA.transaction(async (t) => {
      await invoice.update(updateData, { transaction: t });
      if (invoice.invoice_category === 'soa') {
        const [updatedCount] = await Invoice.update(
          { status: 'paid', paid_at: payment_date || new Date() },
          {
            where: { parent_soa_invoice_id: invoice.id, status: { [require('sequelize').Op.ne]: 'paid' } },
            transaction: t
          }
        );
      }
    });

    // Centralised post-paid side-effects (subscription restore + referral commission).
    // Fire-and-forget — never block or fail the payment record on a side-effect error.
    handleInvoicePaid(invoice.id).catch(e =>
      console.error('[invoices-payment /payment] handleInvoicePaid:', e.message)
    );

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Recorded payment for invoice ${invoice.invoice_number} via ${payment_method || 'bank_transfer'}`,
      restaurant_id: invoice.restaurant_id
    });

    res.json({ success: true, invoice: await Invoice.findByPk(req.params.id) });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to record payment', code: 'INTERNAL_ERROR' } });
  }
});

// Delete invoice

router.post('/:id/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const systemLogger = require('../utils/systemLogger');
    const { getStripeForIssuer, getPublishableKeyForIssuer } = require('../utils/stripeService');

    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    if (!invoice) return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    if (invoice.status !== 'pending_payment' && invoice.status !== 'rejected') {
      return res.status(400).json({ success: false, error: `Cannot pay invoice with status: ${invoice.status}` });
    }

    // Check payment permission
    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });

    // Get Stripe for the correct issuer
    const stripe = await getStripeForIssuer(invoice.issuer_type, invoice.issuer_id);

    // Convert amount to smallest currency unit
    const ZERO_DECIMAL = ['JPY', 'KRW', 'VND'];
    const multiplier = ZERO_DECIMAL.includes(invoice.currency?.toUpperCase()) ? 1 : 100;
    const amountInSmallestUnit = Math.round(parseFloat(invoice.total_amount) * multiplier);

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: (invoice.currency || 'MYR').toLowerCase(),
      metadata: {
        invoice_id: String(invoice.id),
        invoice_number: invoice.invoice_number,
        restaurant_id: String(invoice.restaurant_id || ''),
        issuer_type: invoice.issuer_type,
        issuer_id: String(invoice.issuer_id || '')
      },
      description: `Invoice ${invoice.invoice_number} - ${invoice.restaurant?.name || 'N/A'}`
    });

    // Store payment_intent_id on invoice
    await invoice.update({
      payment_intent_id: paymentIntent.id,
      payment_provider: 'stripe',
      payment_method: 'stripe'
    });

    const publishableKey = await getPublishableKeyForIssuer(invoice.issuer_type, invoice.issuer_id);

    await systemLogger.info('payment', 'stripe', `PaymentIntent created: ${invoice.invoice_number}`, {
      paymentIntentId: paymentIntent.id, amount: amountInSmallestUnit, currency: invoice.currency
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      publishableKey,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    const systemLogger = require('../utils/systemLogger');
    await systemLogger.error('payment', 'stripe', 'PaymentIntent creation failed', { error: error.message, invoiceId: req.params.id });
    res.status(500).json({ success: false, error: 'Failed to create payment intent', details: error.message });
  }
});

// Create PayPal order for an invoice (mirrors create-payment-intent)
router.post('/:id/create-paypal-order', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const systemLogger = require('../utils/systemLogger');
    const { createPayPalClient, getClientIdForIssuer } = require('../utils/paypalService');
    const paypal = require('@paypal/checkout-server-sdk');

    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    if (!invoice) return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    if (invoice.status !== 'pending_payment' && invoice.status !== 'rejected') {
      return res.status(400).json({ success: false, error: `Cannot pay invoice with status: ${invoice.status}` });
    }

    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });

    const { client } = await createPayPalClient(invoice.issuer_type, invoice.issuer_id);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: String(invoice.id),
        description: `Invoice ${invoice.invoice_number} - ${invoice.restaurant?.name || 'N/A'}`,
        custom_id: String(invoice.id),
        amount: {
          currency_code: (invoice.currency || 'MYR').toUpperCase(),
          value: parseFloat(invoice.total_amount).toFixed(2)
        }
      }]
    });

    const order = await client.execute(request);

    await invoice.update({
      payment_intent_id: order.result.id,
      payment_provider: 'paypal',
      payment_method: 'paypal'
    });

    const clientId = await getClientIdForIssuer(invoice.issuer_type, invoice.issuer_id);

    await systemLogger.info('payment', 'paypal', `PayPal order created: ${invoice.invoice_number}`, {
      orderId: order.result.id, amount: invoice.total_amount, currency: invoice.currency
    });

    res.json({
      success: true,
      orderId: order.result.id,
      clientId,
      status: order.result.status
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    const systemLogger = require('../utils/systemLogger');
    await systemLogger.error('payment', 'paypal', 'PayPal order creation failed', { error: error.message, invoiceId: req.params.id });
    res.status(500).json({ success: false, error: 'Failed to create PayPal order', details: error.message });
  }
});

// Capture PayPal order after user approval
router.post('/:id/capture-paypal-order', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId } = req.body;
    const systemLogger = require('../utils/systemLogger');
    const { createPayPalClient } = require('../utils/paypalService');
    const paypal = require('@paypal/checkout-server-sdk');

    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    if (!invoice) return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });

    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) return res.status(403).json({ success: false, error: { message: 'Permission denied', code: 'FORBIDDEN' } });

    if (invoice.payment_intent_id !== orderId) {
      return res.status(400).json({ success: false, error: { message: 'Order ID mismatch', code: 'VALIDATION_ERROR' } });
    }

    const { client } = await createPayPalClient(invoice.issuer_type, invoice.issuer_id);

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      const captureId = capture.result.purchase_units?.[0]?.payments?.captures?.[0]?.id;
      await invoice.update({
        status: 'paid',
        paid_at: new Date(),
        paid_amount: invoice.total_amount,
        payment_method: 'paypal',
        payment_provider: 'paypal',
        transaction_id: captureId || orderId,
        confirmed_at: new Date(),
        confirmed_by: 0
      });

      await systemLogger.info('payment', 'paypal', `Invoice ${invoice.invoice_number} paid via PayPal`, {
        orderId, captureId, amount: invoice.total_amount
      });

      // Centralised post-paid side-effects (this path was missing restoreSubscription pre-1B)
      handleInvoicePaid(invoice.id).catch(e =>
        console.error('[invoices-payment /capture-paypal-order] handleInvoicePaid:', e.message)
      );

      res.json({ success: true, status: 'COMPLETED', captureId });
    } else {
      await systemLogger.warn('payment', 'paypal', `PayPal capture not completed: ${capture.result.status}`, {
        orderId, status: capture.result.status
      });
      res.json({ success: true, status: capture.result.status });
    }
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    const systemLogger = require('../utils/systemLogger');
    await systemLogger.error('payment', 'paypal', 'PayPal capture failed', { error: error.message, invoiceId: req.params.id });
    res.status(500).json({ success: false, error: 'Failed to capture PayPal payment', details: error.message });
  }
});

// Submit payment for an invoice (by payer - restaurant, brand manager, foodcourt manager)
router.post('/:id/submit-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Support both camelCase (frontend) and snake_case field names
    const payment_method = req.body.payment_method || req.body.paymentMethod;
    const payment_provider = req.body.payment_provider || req.body.paymentProvider;
    const payment_intent_id = req.body.payment_intent_id || req.body.paymentIntentId;
    const receipt_url = req.body.receipt_url || req.body.receiptUrl;
    const transaction_id = req.body.transaction_id || req.body.transactionId;
    const notes = req.body.notes || req.body.payment_notes;


    const invoice = await Invoice.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurant'
      }]
    });

    if (!invoice) {
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    // Check if invoice is in payable state
    if (invoice.status !== 'pending_payment' && invoice.status !== 'rejected') {
      return res.status(400).json({
        error: `Cannot submit payment for invoice with status: ${invoice.status}`
      });
    }

    // Verify user has permission to pay this invoice
    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) {
      return res.status(403).json({ success: false, error: { message: 'You do not have permission to pay this invoice', code: 'FORBIDDEN' } });
    }

    // Validate payment_method against issuer's configured methods
    if (payment_method) {
      let paymentSettings = null;
      const currency = invoice.currency || 'MYR';

      if (invoice.issuer_type === 'brand' && invoice.issuer_id) {
        const brand = await Brand.findByPk(invoice.issuer_id);
        paymentSettings = brand?.payment_settings;
      } else if (invoice.issuer_type === 'foodcourt' && invoice.issuer_id) {
        const foodcourt = await Foodcourt.findByPk(invoice.issuer_id);
        paymentSettings = foodcourt?.payment_settings;
      } else {
        // system_admin issuer
        const settings = await SystemSettings.findOne({ where: { setting_key: PAYMENT_SETTINGS_KEY } });
        paymentSettings = settings?.setting_value;
      }

      if (paymentSettings) {
        const { methods } = getAvailablePaymentMethods(paymentSettings, currency);
        const validMethodIds = methods.map(m => m.id);
        if (validMethodIds.length > 0 && !validMethodIds.includes(payment_method)) {
          return res.status(400).json({
            error: `Payment method '${payment_method}' is not available for this invoice`
          });
        }
      }
    }

    // Update invoice with payment submission + SOA cascade (B1 재설계)
    const { sequelize: _seqB } = require('../config/database');
    await _seqB.transaction(async (t) => {
      await invoice.update({
        status: 'payment_submitted',
        payment_method: payment_method || 'bank_transfer',
        transaction_id: transaction_id || null,
        payment_provider: payment_provider || null,
        payment_intent_id: payment_intent_id || null,
        receipt_url: receipt_url || null,
        payment_notes: notes || null,
        payment_submitted_at: new Date(),
        rejection_reason: null
      }, { transaction: t });

      if (invoice.invoice_category === 'soa') {
        const [updatedCount] = await Invoice.update(
          { status: 'payment_submitted', payment_submitted_at: new Date() },
          {
            where: {
              parent_soa_invoice_id: invoice.id,
              status: { [require('sequelize').Op.in]: ['pending_payment', 'overdue', 'pending'] }
            },
            transaction: t
          }
        );
      }
    });


    res.json({
      success: true,
      message: 'Payment submitted successfully. Awaiting confirmation.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error submitting payment:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to submit payment', code: 'INTERNAL_ERROR' } });
  }
});

// Confirm payment for an invoice (by issuer - system admin, brand general, foodcourt general)
router.post('/:id/confirm-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;


    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    // Check if invoice is in confirmable state
    if (invoice.status !== 'payment_submitted') {
      return res.status(400).json({
        error: `Cannot confirm payment for invoice with status: ${invoice.status}. Expected: payment_submitted`
      });
    }

    // Verify user has permission to confirm this invoice
    const canConfirm = await checkConfirmPermission(req.user, invoice);
    if (!canConfirm) {
      return res.status(403).json({ success: false, error: { message: 'You do not have permission to confirm this invoice', code: 'FORBIDDEN' } });
    }

    // Update invoice as paid + cascade to SOA children if this is a SOA invoice (B1 재설계)
    const { sequelize: _seq } = require('../config/database');
    await _seq.transaction(async (t) => {
      await invoice.update({
        status: 'paid',
        paid_at: new Date(),
        paid_amount: invoice.total_amount,
        confirmed_by: req.user.id,
        confirmed_at: new Date(),
        payment_notes: notes ? `${invoice.payment_notes || ''}\n[Confirmation note]: ${notes}` : invoice.payment_notes
      }, { transaction: t });

      // SOA cascading: paying SOA marks all child trade invoices paid
      if (invoice.invoice_category === 'soa') {
        const [updatedCount] = await Invoice.update(
          {
            status: 'paid',
            paid_at: new Date(),
            confirmed_by: req.user.id,
            confirmed_at: new Date()
          },
          {
            where: { parent_soa_invoice_id: invoice.id, status: { [require('sequelize').Op.ne]: 'paid' } },
            transaction: t
          }
        );
      }
    });


    // Centralised post-paid side-effects (this path was missing restoreSubscription pre-1B).
    // Runs after the SOA cascade transaction has committed.
    handleInvoicePaid(invoice.id).catch(e =>
      console.error('[invoices-payment /confirm-payment] handleInvoicePaid:', e.message)
    );

    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Confirmed payment for invoice ${invoice.invoice_number}`,
      restaurant_id: invoice.restaurant_id
    });

    // Notify issuer about payment confirmation (non-blocking)
    (async () => {
      try {
        const restaurant = await Restaurant.findByPk(invoice.restaurant_id, { attributes: ['id', 'name'] });
        const mail = invoicePaidEmail(invoice, restaurant?.name || 'Unknown Restaurant');
        let issuerIds = [];
        if (invoice.issuer_type === 'system_admin') {
          issuerIds = await getSystemAdminIds();
        } else if (invoice.issuer_type === 'brand' && invoice.issuer_id) {
          issuerIds = await getBrandManagerIds(invoice.issuer_id);
        } else if (invoice.issuer_type === 'foodcourt' && invoice.issuer_id) {
          issuerIds = await getFoodcourtManagerIds(invoice.issuer_id);
        }
        const filteredIds = issuerIds.filter(id => id !== req.user.id);
        if (filteredIds.length > 0) {
          await sendNotificationBatch(filteredIds, 'invoice_paid', mail);
        }
      } catch (e) {
        console.error('[Invoice paid notification error]', e.message);
      }
    })();

    res.json({
      success: true,
      message: 'Payment confirmed successfully.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to confirm payment', code: 'INTERNAL_ERROR' } });
  }
});

// Reject payment for an invoice (by issuer - system admin, brand general, foodcourt general)
router.post('/:id/reject-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;


    if (!reason || reason.trim() === '') {
      return res.status(400).json({ success: false, error: { message: 'Rejection reason is required', code: 'VALIDATION_ERROR' } });
    }

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ success: false, error: { message: 'Invoice not found', code: 'NOT_FOUND' } });
    }

    // Check if invoice is in rejectable state
    if (invoice.status !== 'payment_submitted') {
      return res.status(400).json({
        error: `Cannot reject payment for invoice with status: ${invoice.status}. Expected: payment_submitted`
      });
    }

    // Verify user has permission to reject this invoice
    const canReject = await checkConfirmPermission(req.user, invoice);
    if (!canReject) {
      return res.status(403).json({ success: false, error: { message: 'You do not have permission to reject this invoice', code: 'FORBIDDEN' } });
    }

    // Update invoice back to pending with rejection reason
    await invoice.update({
      status: 'pending_payment',
      rejection_reason: reason,
      payment_submitted_at: null
    });


    logActivity(req, {
      action_type: 'update',
      entity_type: 'invoice',
      entity_id: invoice.id,
      entity_name: invoice.invoice_number,
      description: `Rejected payment for invoice ${invoice.invoice_number}. Reason: ${reason}`,
      restaurant_id: invoice.restaurant_id
    });

    res.json({
      success: true,
      message: 'Payment rejected. Invoice returned to pending status.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error rejecting payment:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to reject payment', code: 'INTERNAL_ERROR' } });
  }
});

// Get invoices by issuer (for brand/foodcourt to see invoices they issued)

module.exports = router;
