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
// 테이블 배정 검증 (P2-6 하드닝) — FPTI 실재 + 실제 테이블(픽스처 거부) + 이중예약 충돌.
// 반환 {ok, tableNumber} 또는 {ok:false, status, code, message}.
async function validateTableAssignment(restaurant, restaurantId, fpti, reservedAtDate, turnMin, excludeId) {
  const tables = (restaurant.floor_plan && restaurant.floor_plan.tables) || [];
  const match = tables.find((t) => t.id === fpti);
  if (!match) return { ok: false, status: 400, code: 'TABLE_NOT_FOUND', message: 'Table not found in floor plan.' };
  // 픽스처(주방/카운터/입구)는 예약 대상 아님
  if (match.tableType && match.tableType !== 'table') {
    return { ok: false, status: 400, code: 'NOT_A_TABLE', message: 'That spot is not a seatable table.' };
  }
  // 이중예약 충돌 — 같은 테이블에 [reserved_at, reserved_at+turn] 겹치는 활성 예약이 있으면 거부.
  const newStart = reservedAtDate.getTime();
  const newEnd = newStart + (Number(turnMin) || 90) * 60000;
  const windowMs = 8 * 3600000; // 후보를 ±8h 로 좁혀 조회 후 JS 로 정밀 겹침 판정
  const where = {
    restaurant_id: restaurantId,
    floor_plan_table_id: fpti,
    status: { [Op.in]: ['confirmed', 'arrived', 'seated'] },
    reserved_at: { [Op.between]: [new Date(newStart - windowMs), new Date(newEnd + windowMs)] }
  };
  if (excludeId) where.id = { [Op.ne]: excludeId };
  const candidates = await Reservation.findAll({ where });
  for (const c of candidates) {
    const cStart = new Date(c.reserved_at).getTime();
    const cEnd = cStart + (Number(c.turn_minutes) || 90) * 60000;
    if (newStart < cEnd && cStart < newEnd) {
      return { ok: false, status: 409, code: 'TABLE_DOUBLE_BOOKED', message: `Table already reserved for ${c.guest_name} at that time.` };
    }
  }
  return { ok: true, tableNumber: match.tableNumber || match.label || null };
}

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

    // 테이블 배정 (P2-6) — FPTI 전달 시 실재+실제테이블+이중예약 검증 후 번호 파생.
    let fpti = req.body.floor_plan_table_id || null;
    let resolvedTableNumber = table_number || null;
    if (fpti) {
      const v = await validateTableAssignment(restaurant, restaurantId, fpti, new Date(reserved_at), slot.turn_time_minutes || 90, null);
      if (!v.ok) return res.status(v.status).json({ success: false, code: v.code, message: v.message });
      if (!resolvedTableNumber) resolvedTableNumber = v.tableNumber;
    }

    const reservation = await Reservation.create({
      restaurant_id: restaurantId,
      guest_name,
      guest_phone,
      guest_email: guest_email || null,
      reserved_at: new Date(reserved_at),
      party_size,
      turn_minutes: slot.turn_time_minutes || 90,
      table_number: resolvedTableNumber,
      floor_plan_table_id: fpti,
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
// PATCH /:id/table — assign floor-plan table (FPTI) + number (P2-6)
//   body { floor_plan_table_id?, table_number? }. FPTI 전달 시 매장 플로어플랜에
//   실재하는지 검증하고, 라벨/번호를 자동 파생해 둘 다 저장(Order 패턴과 동일).
//   FPTI 없이 번호만 와도(레거시/번호 직접입력) 허용. 빈 값 → 배정 해제.
// ────────────────────────────────────────────────────────────────────────────
router.patch('/:id/table', authenticateToken, async (req, res) => {
  try {
    const r = await Reservation.findByPk(req.params.id);
    if (!r) return res.status(404).json({ success: false, message: 'Reservation not found' });
    req.params.restaurantId = r.restaurant_id;
    await new Promise((resolve) => checkRestaurantAccess(req, res, () => resolve()));
    if (res.headersSent) return;

    const fpti = req.body.floor_plan_table_id || null;
    let tableNumber = req.body.table_number || null;

    if (fpti) {
      // 실재 + 실제테이블(픽스처 거부) + 이중예약 충돌 검증 (자기 자신 제외)
      const restaurant = await Restaurant.findByPk(r.restaurant_id, { attributes: ['floor_plan'] });
      const v = await validateTableAssignment(restaurant, r.restaurant_id, fpti, new Date(r.reserved_at), r.turn_minutes || 90, r.id);
      if (!v.ok) return res.status(v.status).json({ success: false, code: v.code, message: v.message });
      if (!tableNumber) tableNumber = v.tableNumber;
    }

    await r.update({ floor_plan_table_id: fpti, table_number: tableNumber });
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
