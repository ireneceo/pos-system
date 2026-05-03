// /api/payments — Stripe Customer / saved card / auto-charge endpoints.
// 마운트: server.js → app.use('/api/payments', require('./routes/payments'))

const express = require('express');
const router = express.Router();
require('../models');
const { authenticateToken } = require('../middleware/auth');
const stripeCustomerService = require('../services/stripeCustomerService');
const { logActivity } = require('../utils/activityLogger');
const logger = require('../utils/logger');

// Authorize: user must own the entity (restaurant admin / brand owner / foodcourt owner) or System Admin.
async function authorize(req, entityType, entityId) {
  const { Restaurant, Brand, Foodcourt } = require('../models');
  if (req.user.role === 'System Admin') return true;
  if (entityType === 'restaurant') {
    const r = await Restaurant.findByPk(entityId, { attributes: ['id', 'admin_id'] });
    return r && r.admin_id === req.user.id;
  }
  if (entityType === 'brand') {
    const b = await Brand.findByPk(entityId, { attributes: ['id', 'owner_id'] });
    return b && b.owner_id === req.user.id;
  }
  if (entityType === 'foodcourt') {
    const f = await Foodcourt.findByPk(entityId, { attributes: ['id', 'owner_id'] });
    return f && f.owner_id === req.user.id;
  }
  return false;
}

function validateEntity(req, res) {
  const entity_type = (req.body.entity_type || req.query.entity_type || '').toString();
  const entity_id = parseInt(req.body.entity_id || req.query.entity_id || req.params.entity_id, 10);
  if (!['restaurant', 'brand', 'foodcourt'].includes(entity_type)) {
    res.status(400).json({
      success: false,
      error: { message: 'entity_type must be restaurant/brand/foodcourt', code: 'VALIDATION_ERROR', fieldErrors: { entity_type: 'Required' } }
    });
    return null;
  }
  if (!entity_id || isNaN(entity_id)) {
    res.status(400).json({
      success: false,
      error: { message: 'entity_id is required', code: 'VALIDATION_ERROR', fieldErrors: { entity_id: 'Required' } }
    });
    return null;
  }
  return { entity_type, entity_id };
}

// POST /api/payments/setup-intent
router.post('/setup-intent', authenticateToken, async (req, res) => {
  const e = validateEntity(req, res); if (!e) return;
  if (!(await authorize(req, e.entity_type, e.entity_id))) {
    return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
  }
  try {
    const result = await stripeCustomerService.createSetupIntent(e.entity_type, e.entity_id);
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error('[POST /payments/setup-intent]', err.message);
    res.status(500).json({ success: false, error: { message: err.message, code: 'INTERNAL_ERROR' } });
  }
});

// POST /api/payments/save-payment-method
router.post('/save-payment-method', authenticateToken, async (req, res) => {
  const e = validateEntity(req, res); if (!e) return;
  if (!(await authorize(req, e.entity_type, e.entity_id))) {
    return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
  }
  const { payment_method_id, set_default = true, consent = false } = req.body;
  if (!payment_method_id) {
    return res.status(400).json({ success: false, error: { message: 'payment_method_id required', code: 'VALIDATION_ERROR', fieldErrors: { payment_method_id: 'Required' } } });
  }
  if (!consent) {
    return res.status(400).json({
      success: false,
      error: { message: 'Consent is required to save a card for auto-charge', code: 'CONSENT_REQUIRED', hint: 'Tick the authorization checkbox.' }
    });
  }
  try {
    const result = await stripeCustomerService.savePaymentMethod(e.entity_type, e.entity_id, payment_method_id, { setDefault: set_default, consent });
    logActivity(req, {
      action_type: 'create',
      entity_type: 'payment_method',
      entity_id: payment_method_id,
      entity_name: `${result.brand} ****${result.last4}`,
      restaurant_id: e.entity_type === 'restaurant' ? e.entity_id : null,
      description: `Saved ${result.brand} card ****${result.last4} for ${e.entity_type} #${e.entity_id} (auto-charge: ${result.auto_charge_enabled ? 'on' : 'off'})`
    });
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error('[POST /payments/save-payment-method]', err.message);
    res.status(500).json({ success: false, error: { message: err.message, code: 'INTERNAL_ERROR' } });
  }
});

// GET /api/payments/saved-cards?entity_type=restaurant&entity_id=5
router.get('/saved-cards', authenticateToken, async (req, res) => {
  const e = validateEntity(req, res); if (!e) return;
  if (!(await authorize(req, e.entity_type, e.entity_id))) {
    return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
  }
  try {
    const result = await stripeCustomerService.listSavedCards(e.entity_type, e.entity_id);
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error('[GET /payments/saved-cards]', err.message);
    res.status(500).json({ success: false, error: { message: err.message, code: 'INTERNAL_ERROR' } });
  }
});

// DELETE /api/payments/saved-cards/:pm_id?entity_type=...&entity_id=...
router.delete('/saved-cards/:pm_id', authenticateToken, async (req, res) => {
  const e = validateEntity(req, res); if (!e) return;
  if (!(await authorize(req, e.entity_type, e.entity_id))) {
    return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
  }
  try {
    const result = await stripeCustomerService.deletePaymentMethod(e.entity_type, e.entity_id, req.params.pm_id);
    logActivity(req, {
      action_type: 'delete',
      entity_type: 'payment_method',
      entity_id: req.params.pm_id,
      restaurant_id: e.entity_type === 'restaurant' ? e.entity_id : null,
      description: `Deleted saved card ${req.params.pm_id} (was default: ${result.was_default})`
    });
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error('[DELETE /payments/saved-cards/:pm_id]', err.message);
    res.status(500).json({ success: false, error: { message: err.message, code: 'INTERNAL_ERROR' } });
  }
});

// PATCH /api/payments/auto-charge
router.patch('/auto-charge', authenticateToken, async (req, res) => {
  const e = validateEntity(req, res); if (!e) return;
  if (!(await authorize(req, e.entity_type, e.entity_id))) {
    return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
  }
  const { enabled, consent = false } = req.body;
  if (typeof enabled !== 'boolean') {
    return res.status(400).json({ success: false, error: { message: 'enabled (boolean) required', code: 'VALIDATION_ERROR', fieldErrors: { enabled: 'Required' } } });
  }
  try {
    const result = await stripeCustomerService.setAutoCharge(e.entity_type, e.entity_id, enabled, { consent });
    logActivity(req, {
      action_type: 'update',
      entity_type: 'auto_charge',
      entity_id: `${e.entity_type}#${e.entity_id}`,
      restaurant_id: e.entity_type === 'restaurant' ? e.entity_id : null,
      changes: { enabled, consent },
      description: `Auto-charge ${enabled ? 'enabled' : 'disabled'} for ${e.entity_type} #${e.entity_id}`
    });
    res.json({ success: true, data: result });
  } catch (err) {
    logger.error('[PATCH /payments/auto-charge]', err.message);
    res.status(400).json({
      success: false,
      error: {
        message: err.message,
        code: err.message.includes('consent') ? 'CONSENT_REQUIRED' : 'VALIDATION_ERROR',
        hint: err.message.includes('No default payment method') ? 'Save a card first, then enable auto-charge.'
          : err.message.includes('consent') ? 'Confirm the auto-charge authorization checkbox.' : null
      }
    });
  }
});

module.exports = router;
