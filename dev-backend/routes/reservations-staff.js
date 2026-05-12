/**
 * Reservations — Staff / Restaurant Admin routes (R1 MVP)
 *
 * Auth: authenticateToken + checkRestaurantAccess (POS Admin JWT)
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');
const RestaurantCustomer = require('../models/RestaurantCustomer');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { getRestaurantTimezone, getDateBounds, getCurrentLocalDate } = require('../utils/dateTimeHelper');

// ────────────────────────────────────────────────────────────────────────────
// GET /restaurant/:restaurant_id?date=&status=
// ────────────────────────────────────────────────────────────────────────────
router.get('/restaurant/:restaurant_id', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurant_id);
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    const tz = getRestaurantTimezone(restaurant);
    const date = req.query.date || getCurrentLocalDate(tz);
    const status = req.query.status;
    const where = { restaurant_id: restaurantId };
    if (status) where.status = status;
    if (!status || status === 'today') {
      // 레스토랑 timezone 기준 하루의 UTC bounds 로 검색
      const { startOfDay, endOfDay } = getDateBounds(date, tz);
      where.reserved_at = { [Op.between]: [startOfDay, endOfDay] };
    }
    const list = await Reservation.findAll({ where, order: [['reserved_at', 'ASC']] });
    res.json({ success: true, data: list });
  } catch (e) {
    console.error('[Reservation] staff list error:', e);
    res.status(500).json({ success: false, message: 'Failed to load reservations' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /restaurant/:restaurant_id/pending
// ────────────────────────────────────────────────────────────────────────────
router.get('/restaurant/:restaurant_id/pending', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const list = await Reservation.findAll({
      where: { restaurant_id: parseInt(req.params.restaurant_id), status: 'pending' },
      order: [['reserved_at', 'ASC']]
    });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load pending reservations' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /restaurant/:restaurant_id  (staff direct create — phone reservation)
// ────────────────────────────────────────────────────────────────────────────
router.post('/restaurant/:restaurant_id', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurant_id);
    const { reserved_at, party_size, guest_name, guest_phone, guest_email, notes, table_number } = req.body;
    if (!reserved_at || !party_size || !guest_name || !guest_phone) {
      return res.status(400).json({ success: false, message: 'reserved_at, party_size, guest_name, guest_phone required' });
    }
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    const settings = restaurant.reservation_settings || {};
    const slot = settings.slot || {};

    const reservation = await Reservation.create({
      restaurant_id: restaurantId,
      guest_name,
      guest_phone,
      guest_email: guest_email || null,
      reserved_at: new Date(reserved_at),
      party_size,
      turn_minutes: slot.turn_time_minutes || 90,
      table_number: table_number || null,
      status: 'confirmed',                        // staff 직접 생성은 즉시 확정
      notes: notes || null,
      source: 'staff_phone',                      // staff 가 만든 모든 예약 (전화·내방·등록 모두 동일)
      confirmation_sent_at: new Date()
    });

    try {
      const svc = require('../services/reservationNotificationService');
      svc.notifyCreated(reservation, restaurant).catch(() => {});
    } catch (_) {}

    res.json({ success: true, data: reservation });
  } catch (e) {
    console.error('[Reservation] staff create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create reservation' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// PATCH /:id/status — state machine transitions
// ────────────────────────────────────────────────────────────────────────────
const ALLOWED_TRANSITIONS = {
  pending:   ['confirmed', 'cancelled'],
  confirmed: ['arrived', 'cancelled', 'no_show'],
  arrived:   ['seated', 'cancelled'],
  seated:    ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
  no_show:   []
};

router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const r = await Reservation.findByPk(req.params.id);
    if (!r) return res.status(404).json({ success: false, message: 'Reservation not found' });

    // restaurant access guard
    req.params.restaurantId = r.restaurant_id;
    await new Promise((resolve, reject) => {
      checkRestaurantAccess(req, res, (err) => err ? reject(err) : resolve());
    }).catch(() => null);
    if (res.headersSent) return;

    const { status, reason } = req.body;
    const allowed = ALLOWED_TRANSITIONS[r.status] || [];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: `Cannot transition from ${r.status} to ${status}` });
    }

    const update = { status };
    const now = new Date();
    if (status === 'confirmed') update.confirmation_sent_at = now;
    if (status === 'arrived')   update.arrived_at = now;
    if (status === 'seated')    update.seated_at = now;
    if (status === 'completed') update.completed_at = now;
    if (status === 'no_show')   update.no_show_at = now;
    if (status === 'cancelled') {
      update.cancelled_at = now;
      update.cancelled_by = 'staff';
      update.cancel_reason = reason || null;
    }
    await r.update(update);

    // 노쇼 카운트 +1
    if (status === 'no_show' && r.customer_id) {
      const c = await RestaurantCustomer.findByPk(r.customer_id);
      if (c) await c.increment('no_show_count');
    }
    // 완료 시 last_reservation_at 만 업데이트 — reservation_count 는 POST 단계에서 이미 증가.
    // 기존 코드에서 여기서도 +1 하여 이중계산 버그가 있었음(예약 1건이 카운트 2).
    if (status === 'completed' && r.customer_id) {
      const c = await RestaurantCustomer.findByPk(r.customer_id);
      if (c) await c.update({ last_reservation_at: now });
    }

    try {
      const svc = require('../services/reservationNotificationService');
      const restaurant = await Restaurant.findByPk(r.restaurant_id);
      svc.notifyStatusChanged(r, restaurant, status).catch(() => {});
    } catch (_) {}

    res.json({ success: true, data: r });
  } catch (e) {
    console.error('[Reservation] status change error:', e);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// PATCH /:id/table — assign table number
// ────────────────────────────────────────────────────────────────────────────
router.patch('/:id/table', authenticateToken, async (req, res) => {
  try {
    const r = await Reservation.findByPk(req.params.id);
    if (!r) return res.status(404).json({ success: false, message: 'Reservation not found' });
    req.params.restaurantId = r.restaurant_id;
    await new Promise((resolve) => checkRestaurantAccess(req, res, () => resolve()));
    if (res.headersSent) return;
    await r.update({ table_number: req.body.table_number || null });
    res.json({ success: true, data: r });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to assign table' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// DELETE /:id  (System Admin / Restaurant Admin)
// ────────────────────────────────────────────────────────────────────────────
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const r = await Reservation.findByPk(req.params.id);
    if (!r) return res.status(404).json({ success: false, message: 'Reservation not found' });
    if (!['System Admin', 'Restaurant Admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (req.user.role === 'Restaurant Admin' && r.restaurant_id !== req.user.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Cannot delete other restaurant reservation' });
    }
    await r.destroy();
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to delete reservation' });
  }
});

module.exports = router;
