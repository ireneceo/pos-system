/**
 * External QR ↔ Coupon mapping endpoints.
 *
 * GET /api/restaurants/:id/external-qr-coupon?name=<table>
 *   Anonymous (mobile order entry) — returns coupon for given external-QR name if linked + active.
 *
 * GET /api/restaurants/:id/coupons-linked-qrs
 *   Authenticated — for Coupons list page: which external-QR names reference each coupon.
 */

const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const Coupon = require('../models/Coupon');
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');

async function ensureRestaurantAccess(req, restaurantId) {
  const u = req.user;
  if (!u) return false;
  if (u.role === 'System Admin') return true;
  if (parseInt(u.restaurant_id) === restaurantId) return true;
  // RA without restaurant_id in token — fall back to admin_id mapping
  const r = await Restaurant.findByPk(restaurantId, { attributes: ['admin_id'] });
  if (r && r.admin_id === u.id) return true;
  return false;
}

/**
 * Normalize externalQRs entries to {name, coupon_id?, order_type?} objects.
 * Accepts legacy string form for backward compatibility.
 */
// 'reservation' is a meta-pin (routes to /reservation, not a menu order_type).
// Storing it here keeps external-QR config in one place; mobile entry handles the routing.
const VALID_ORDER_TYPES = ['dine-in', 'takeaway', 'pickup', 'delivery', 'reservation'];

function normalizeEntries(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(e => {
      if (typeof e === 'string') return { name: e };
      if (e && typeof e === 'object' && typeof e.name === 'string') {
        const out = { name: e.name };
        if (e.coupon_id != null && Number.isInteger(Number(e.coupon_id))) {
          out.coupon_id = Number(e.coupon_id);
        }
        if (typeof e.order_type === 'string' && VALID_ORDER_TYPES.includes(e.order_type)) {
          out.order_type = e.order_type;
        }
        return out;
      }
      return null;
    })
    .filter(Boolean);
}

function isCouponCurrentlyValid(coupon) {
  if (!coupon || coupon.is_active === false) return false;
  const now = new Date();
  if (coupon.valid_from && new Date(coupon.valid_from) > now) return false;
  if (coupon.valid_until && new Date(coupon.valid_until) < now) return false;
  if (coupon.usage_limit != null && coupon.usage_count >= coupon.usage_limit) return false;
  return true;
}

/**
 * Public-safe coupon shape (no PII / target_customer_ids).
 */
function publicCoupon(c) {
  return {
    id: c.id,
    code: c.code,
    name: c.name,
    type: c.type,
    value: Number(c.value),
    min_order: c.min_order != null ? Number(c.min_order) : 0,
    max_discount: c.max_discount != null ? Number(c.max_discount) : null,
    valid_from: c.valid_from,
    valid_until: c.valid_until,
    is_active: c.is_active,
    applicable_order_types: c.applicable_order_types || null
  };
}

// GET /api/restaurants/:id/external-qr-coupon?name=Hotel ABC
router.get('/:id/external-qr-coupon', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id, 10);
    const name = (req.query.name || '').toString();
    if (!Number.isInteger(restaurantId) || !name) {
      return res.status(400).json({
        success: false,
        error: { message: 'restaurant id and ?name are required', code: 'VALIDATION_ERROR' }
      });
    }

    const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'table_settings'] });
    if (!r) {
      return res.status(404).json({
        success: false,
        error: { message: 'Restaurant not found', code: 'NOT_FOUND' }
      });
    }

    const ts = typeof r.table_settings === 'string'
      ? JSON.parse(r.table_settings || '{}') : (r.table_settings || {});
    const entries = normalizeEntries(ts.externalQRs);
    const match = entries.find(e => e.name === name);
    if (!match) {
      return res.json({ success: true, data: { linked: false } });
    }
    // Order type pin always returned when present (even if no coupon).
    const orderType = match.order_type || null;
    if (!match.coupon_id) {
      return res.json({ success: true, data: { linked: false, order_type: orderType } });
    }

    const coupon = await Coupon.findOne({
      where: { id: match.coupon_id, restaurant_id: restaurantId }
    });
    if (!coupon || !isCouponCurrentlyValid(coupon)) {
      return res.json({ success: true, data: { linked: false, order_type: orderType } });
    }
    return res.json({
      success: true,
      data: { linked: true, coupon: publicCoupon(coupon), order_type: orderType }
    });
  } catch (e) {
    console.error('[external-qrs] coupon lookup failed', e);
    return res.status(500).json({
      success: false,
      error: { message: e.message || 'Internal error', code: 'INTERNAL_ERROR' }
    });
  }
});

// GET /api/restaurants/:id/coupons-linked-qrs  — { coupon_id: [name, ...] } map
router.get('/:id/coupons-linked-qrs', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.id, 10);
    if (!Number.isInteger(restaurantId)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid restaurant id', code: 'VALIDATION_ERROR' }
      });
    }

    if (!(await ensureRestaurantAccess(req, restaurantId))) {
      return res.status(403).json({
        success: false,
        error: { message: 'Forbidden', code: 'FORBIDDEN' }
      });
    }

    const r = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'table_settings'] });
    if (!r) {
      return res.status(404).json({
        success: false,
        error: { message: 'Restaurant not found', code: 'NOT_FOUND' }
      });
    }
    const ts = typeof r.table_settings === 'string'
      ? JSON.parse(r.table_settings || '{}') : (r.table_settings || {});
    const entries = normalizeEntries(ts.externalQRs);

    const map = {};
    for (const e of entries) {
      if (e.coupon_id) {
        if (!map[e.coupon_id]) map[e.coupon_id] = [];
        map[e.coupon_id].push(e.name);
      }
    }
    return res.json({ success: true, data: { byCouponId: map } });
  } catch (e) {
    console.error('[external-qrs] linked-qrs failed', e);
    return res.status(500).json({
      success: false,
      error: { message: e.message || 'Internal error', code: 'INTERNAL_ERROR' }
    });
  }
});

module.exports = { router, normalizeEntries, isCouponCurrentlyValid, publicCoupon };
