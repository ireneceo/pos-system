/**
 * Payment Gateway Routes (v3.24+)
 *
 * Hosted payment flows — Stripe Checkout / Subscriptions / Customer Portal.
 * (PayPal Subscriptions / Orders attached in next phase.)
 *
 * Card details never touch this server. PurpleHere holds tokens only.
 */

const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { Restaurant, Brand, Foodcourt, Invoice, Subscription, PaymentCustomer } = require('../models');
const stripeCheckout = require('../services/stripeCheckoutService');
const paypalCheckout = require('../services/paypalCheckoutService');
const { gatewayPayableError, resolvePayerParty } = require('../utils/invoicePayable');
const { normalizeIssuerType } = require('../utils/stripeService');

/**
 * Determine if `user` is allowed to act as `payer_type/payer_id`.
 * Allowed:
 *   - System Admin
 *   - The owner of the payer entity
 *   - (Restaurant Admin / Brand General / Foodcourt General matching payer)
 */
async function ensurePayerAccess(req, payer_type, payer_id) {
  const user = req.user;
  if (!user) return false;
  if (user.role === 'System Admin') return true;

  if (payer_type === 'restaurant') {
    const r = await Restaurant.findByPk(payer_id);
    if (!r) return false;
    if (r.admin_id === user.id) return true;
    if (user.restaurant_id === r.id) return true;
    return false;
  }
  if (payer_type === 'brand') {
    const b = await Brand.findByPk(payer_id);
    if (!b) return false;
    if (b.owner_id === user.id) return true;
    return false;
  }
  if (payer_type === 'foodcourt') {
    const f = await Foodcourt.findByPk(payer_id);
    if (!f) return false;
    if (f.owner_id === user.id) return true;
    return false;
  }
  return false;
}

/**
 * Validate body shape and return { errors, data } where errors is fieldErrors map.
 */
function validateStartBody(body) {
  const errors = {};
  const ALLOWED_GW = ['stripe', 'paypal'];
  const ALLOWED_MODE = ['subscription', 'payment'];
  const ALLOWED_ISSUER = ['system', 'brand', 'foodcourt', 'supplier'];
  const ALLOWED_PAYER = ['restaurant', 'brand', 'foodcourt'];

  if (!ALLOWED_GW.includes(body.gateway)) errors.gateway = 'Must be stripe or paypal';
  if (!ALLOWED_MODE.includes(body.mode)) errors.mode = 'Must be subscription or payment';
  // 청구서 결제(payment)는 당사자를 서버가 청구서에서 꺼낸다 — 화면이 보낸 issuer/payer 는 받지도 믿지도 않는다
  // (2026-10-11 Fable 판정 F2). 당사자 칸은 정기구독(subscription) 모드에서만 필수다.
  if (body.mode === 'subscription') {
    if (!ALLOWED_ISSUER.includes(body.issuer_type)) errors.issuer_type = 'Invalid issuer_type';
    if (!ALLOWED_PAYER.includes(body.payer_type)) errors.payer_type = 'Invalid payer_type';
    if (!body.payer_id || typeof body.payer_id !== 'number') errors.payer_id = 'Required (number)';
    if (body.issuer_type !== 'system' && (!body.issuer_id || typeof body.issuer_id !== 'number')) {
      errors.issuer_id = 'Required for non-system issuer';
    }
    if (!body.plan_id || typeof body.plan_id !== 'number') {
      errors.plan_id = 'Required for subscription mode';
    }
  }
  // 청구서 목록(to-pay)은 id 를 글자로 준다 — 양의 정수로 읽히면 받는다
  if (body.mode === 'payment' && !(Number.isInteger(Number(body.invoice_id)) && Number(body.invoice_id) > 0)) {
    errors.invoice_id = 'Required for payment mode';
  }
  if (!body.success_url) errors.success_url = 'Required';
  if (!body.cancel_url) errors.cancel_url = 'Required';
  return { errors, ok: Object.keys(errors).length === 0 };
}

// POST /api/payments/checkout/start
router.post('/checkout/start', authenticateToken, async (req, res) => {
  try {
    const { errors, ok } = validateStartBody(req.body || {});
    if (!ok) {
      return res.status(400).json({
        success: false,
        error: { message: 'Validation failed', code: 'VALIDATION_ERROR', fieldErrors: errors }
      });
    }
    const { gateway, mode, success_url, cancel_url } = req.body;

    // 청구서 결제 — 발행자·지불자는 청구서에서 꺼낸다. 결제 가능 판정은 utils/invoicePayable.js 한 곳.
    if (mode === 'payment') {
      const invoice = await Invoice.findByPk(Number(req.body.invoice_id));
      const blocked = await gatewayPayableError(invoice, req.user);
      if (blocked) return res.status(blocked.status).json(blocked.body);
      const payer = await resolvePayerParty(invoice);
      if (!payer) {
        return res.status(400).json({
          success: false,
          error: { message: 'Cannot resolve the payer of this invoice', code: 'PAYER_UNRESOLVED' }
        });
      }
      const issuer_type = normalizeIssuerType(invoice.issuer_type || 'system');
      const issuer_id = issuer_type === 'system' ? null : invoice.issuer_id;
      const svc = gateway === 'stripe' ? stripeCheckout : gateway === 'paypal' ? paypalCheckout : null;
      if (!svc) {
        return res.status(400).json({
          success: false,
          error: { message: 'Unsupported gateway/mode combination', code: 'UNSUPPORTED' }
        });
      }
      const out = await svc.startInvoiceCheckout({
        invoice, issuer_type, issuer_id,
        payer_type: payer.payer_type, payer_id: payer.payer_id,
        success_url, cancel_url
      });
      return res.json({ success: true, data: out });
    }

    const {
      issuer_type, issuer_id, payer_type, payer_id, plan_id, currency
    } = req.body;

    const allowed = await ensurePayerAccess(req, payer_type, payer_id);
    if (!allowed) {
      return res.status(403).json({
        success: false,
        error: { message: 'You are not allowed to pay for this payer', code: 'FORBIDDEN' }
      });
    }

    if (gateway === 'stripe' && mode === 'subscription') {
      const out = await stripeCheckout.startSubscriptionCheckout({
        issuer_type, issuer_id: issuer_id || null,
        payer_type, payer_id, plan_id,
        currency: currency || 'MYR',
        success_url, cancel_url
      });
      return res.json({ success: true, data: out });
    }

    if (gateway === 'paypal' && mode === 'subscription') {
      const out = await paypalCheckout.startSubscriptionCheckout({
        issuer_type, issuer_id: issuer_id || null,
        payer_type, payer_id, plan_id,
        currency: currency || 'MYR',
        success_url, cancel_url
      });
      return res.json({ success: true, data: out });
    }

    return res.status(400).json({
      success: false,
      error: { message: 'Unsupported gateway/mode combination', code: 'UNSUPPORTED' }
    });
  } catch (e) {
    console.error('[payments] checkout/start failed', e);
    return res.status(500).json({
      success: false,
      error: { message: e.message || 'Internal error', code: 'INTERNAL_ERROR' }
    });
  }
});

// POST /api/payments/portal/start
router.post('/portal/start', authenticateToken, async (req, res) => {
  try {
    const { issuer_type, issuer_id, payer_type, payer_id, return_url } = req.body || {};
    const errors = {};
    if (!['system', 'brand', 'foodcourt', 'supplier'].includes(issuer_type)) errors.issuer_type = 'Invalid';
    if (!['restaurant', 'brand', 'foodcourt'].includes(payer_type)) errors.payer_type = 'Invalid';
    if (!payer_id) errors.payer_id = 'Required';
    if (!return_url) errors.return_url = 'Required';
    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        error: { message: 'Validation failed', code: 'VALIDATION_ERROR', fieldErrors: errors }
      });
    }

    const allowed = await ensurePayerAccess(req, payer_type, payer_id);
    if (!allowed) {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }

    const out = await stripeCheckout.startCustomerPortal({
      issuer_type, issuer_id: issuer_id || null,
      payer_type, payer_id, return_url
    });
    return res.json({ success: true, data: out });
  } catch (e) {
    if (e.code === 'NO_CUSTOMER') {
      return res.status(404).json({
        success: false,
        error: { message: e.message, code: 'NO_CUSTOMER' }
      });
    }
    console.error('[payments] portal/start failed', e);
    return res.status(500).json({
      success: false,
      error: { message: e.message || 'Internal error', code: 'INTERNAL_ERROR' }
    });
  }
});

// GET /api/payments/subscriptions?payer_type=restaurant&payer_id=129
router.get('/subscriptions', authenticateToken, async (req, res) => {
  try {
    const { payer_type, payer_id } = req.query;
    if (!['restaurant', 'brand', 'foodcourt'].includes(payer_type)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid payer_type', code: 'VALIDATION_ERROR' }
      });
    }
    const allowed = await ensurePayerAccess(req, payer_type, parseInt(payer_id, 10));
    if (!allowed) {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }
    const subs = await Subscription.findAll({
      where: { payer_type, payer_id: parseInt(payer_id, 10) },
      order: [['created_at', 'DESC']]
    });
    return res.json({ success: true, data: { subscriptions: subs } });
  } catch (e) {
    console.error('[payments] subscriptions list failed', e);
    return res.status(500).json({
      success: false,
      error: { message: e.message || 'Internal error', code: 'INTERNAL_ERROR' }
    });
  }
});

// POST /api/payments/subscriptions/:id/cancel
router.post('/subscriptions/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const sub = await Subscription.findByPk(id);
    if (!sub) {
      return res.status(404).json({
        success: false,
        error: { message: 'Subscription not found', code: 'NOT_FOUND' }
      });
    }
    const allowed = await ensurePayerAccess(req, sub.payer_type, sub.payer_id);
    if (!allowed) {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }
    const at_period_end = req.body?.at_period_end !== false;
    if (sub.gateway === 'stripe') {
      await stripeCheckout.cancelSubscription({ subscription_id: id, at_period_end });
    } else if (sub.gateway === 'paypal') {
      await paypalCheckout.cancelSubscription({ subscription_id: id, reason: req.body?.reason });
    }
    return res.json({ success: true, data: { subscription: await Subscription.findByPk(id) } });
  } catch (e) {
    console.error('[payments] subscriptions cancel failed', e);
    return res.status(500).json({
      success: false,
      error: { message: e.message || 'Internal error', code: 'INTERNAL_ERROR' }
    });
  }
});

// GET /api/payments/issuer-gateways?issuer_type=brand&issuer_id=7
// 활성 게이트웨이 목록 — 시크릿 노출 X, enabled 플래그만
router.get('/issuer-gateways', authenticateToken, async (req, res) => {
  try {
    const { issuer_type, issuer_id } = req.query;
    if (!['system', 'brand', 'foodcourt', 'supplier'].includes(issuer_type)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid issuer_type', code: 'VALIDATION_ERROR' }
      });
    }

    let stripeEnabled = false;
    let paypalEnabled = false;

    const SystemSettings = require('../models/SystemSettings');
    const Brand = require('../models/Brand');
    const Foodcourt = require('../models/Foodcourt');
    const SupplierCompany = require('../models/SupplierCompany');

    if (issuer_type === 'system') {
      const s = await SystemSettings.findOne({ where: { setting_key: 'payment_settings' } });
      const ps = s?.setting_value;
      stripeEnabled = !!(ps?.stripe?.enabled && ps?.stripe?.secretKey && ps?.stripe?.publishableKey);
      paypalEnabled = !!(ps?.paypal?.enabled && ps?.paypal?.clientId && ps?.paypal?.clientSecret);
    } else {
      const Model = issuer_type === 'brand' ? Brand
                  : issuer_type === 'foodcourt' ? Foodcourt
                  : SupplierCompany;
      const ent = await Model.findByPk(parseInt(issuer_id, 10));
      if (!ent) {
        return res.status(404).json({
          success: false,
          error: { message: 'Issuer not found', code: 'NOT_FOUND' }
        });
      }
      const ps = typeof ent.payment_settings === 'string'
        ? JSON.parse(ent.payment_settings) : ent.payment_settings;
      stripeEnabled = !!(ps?.stripe?.enabled && ps?.stripe?.secretKey && ps?.stripe?.publishableKey);
      paypalEnabled = !!(ps?.paypal?.enabled && ps?.paypal?.clientId && ps?.paypal?.clientSecret);
    }
    return res.json({
      success: true,
      data: { stripe: { enabled: stripeEnabled }, paypal: { enabled: paypalEnabled } }
    });
  } catch (e) {
    console.error('[payments] issuer-gateways failed', e);
    return res.status(500).json({
      success: false,
      error: { message: e.message || 'Internal error', code: 'INTERNAL_ERROR' }
    });
  }
});

module.exports = router;
