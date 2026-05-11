/**
 * Reservations — Customer (mobile) routes (R1 MVP)
 *
 * Auth: customer JWT (issued by /customers/auth)
 * Mounts at /api/reservations
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const Reservation = require('../models/Reservation');
const Restaurant = require('../models/Restaurant');
const RestaurantCustomer = require('../models/RestaurantCustomer');
const { authenticateCustomer } = require('../middleware/customerAuth');
const { requireRestaurantModule } = require('../middleware/requireModule');

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────
function getReservationSettings(restaurant) {
  return restaurant.reservation_settings || {};
}

function isWithinPolicy(reservedAt, hoursBefore) {
  return (new Date(reservedAt) - Date.now()) / (1000 * 3600) >= hoursBefore;
}

async function calcSlotAvailability(restaurant, date, partySize) {
  // R1 MVP: 단순 계산 — 같은 시간대 (turn_time 윈도우) 의 confirmed/pending 합 + 본 예약 < max_covers_per_slot
  const settings = getReservationSettings(restaurant);
  const slot = settings?.slot || {};
  const turnMin = slot.turn_time_minutes || 90;
  const slotMin = slot.duration_minutes || 30;
  const maxCovers = slot.max_covers_per_slot || 40;

  const dayStart = new Date(date + 'T00:00:00');
  const dayEnd = new Date(date + 'T23:59:59');
  const existing = await Reservation.findAll({
    where: {
      restaurant_id: restaurant.id,
      reserved_at: { [Op.between]: [dayStart, dayEnd] },
      status: { [Op.in]: ['pending', 'confirmed', 'arrived', 'seated'] }
    },
    attributes: ['reserved_at', 'party_size', 'turn_minutes'],
    raw: true
  });

  // 영업시간 — operation_settings.openingTime / closingTime (HH:MM) fallback
  const op = restaurant.operation_settings || {};
  const open = op.openingTime || '11:00';
  const close = op.closingTime || '22:00';
  const [oh, om] = open.split(':').map(Number);
  const [ch, cm] = close.split(':').map(Number);

  const slots = [];
  let cur = new Date(date + 'T' + open + ':00');
  const end = new Date(date + 'T' + close + ':00');
  while (cur < end) {
    const slotEnd = new Date(cur.getTime() + slotMin * 60000);
    const overlapping = existing.filter(r => {
      const rStart = new Date(r.reserved_at);
      const rEnd = new Date(rStart.getTime() + (r.turn_minutes || turnMin) * 60000);
      return rStart < slotEnd && rEnd > cur;
    });
    const covers = overlapping.reduce((s, r) => s + (r.party_size || 0), 0);
    const available = maxCovers - covers;
    slots.push({
      time: cur.toISOString(),
      label: `${String(cur.getHours()).padStart(2, '0')}:${String(cur.getMinutes()).padStart(2, '0')}`,
      available_covers: available,
      can_book: available >= partySize,
      status: available <= 0 ? 'full' : available < 5 ? 'few_left' : 'open'
    });
    cur = slotEnd;
  }
  return slots;
}

// ────────────────────────────────────────────────────────────────────────────
// GET /availability/:restaurant_id?date=YYYY-MM-DD&party=N  (public, but module-gated)
// ────────────────────────────────────────────────────────────────────────────
// availability 는 익명 접근 허용 — 모듈 게이팅은 reservation_settings.enabled 로 1차 차단
router.get('/availability/:restaurant_id', async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurant_id);
    const date = String(req.query.date || '').slice(0, 10);
    const party = parseInt(req.query.party) || 2;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ success: false, message: 'Invalid date format. Use YYYY-MM-DD' });
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    const settings = getReservationSettings(restaurant);
    if (!settings.enabled) return res.status(400).json({ success: false, message: 'Reservations are not enabled for this restaurant' });

    const slot = settings.slot || {};
    if (party < (slot.min_party || 1) || party > (slot.max_party || 20)) {
      return res.status(400).json({ success: false, message: 'Party size out of allowed range' });
    }
    if ((settings.closed_dates || []).includes(date)) {
      return res.json({ success: true, data: { date, slots: [], closed: true } });
    }

    const slots = await calcSlotAvailability(restaurant, date, party);
    res.json({ success: true, data: { date, party, slots, closed: false } });
  } catch (e) {
    console.error('[Reservation] availability error:', e);
    res.status(500).json({ success: false, message: 'Failed to load availability' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// POST /  (customer creates reservation)
// ────────────────────────────────────────────────────────────────────────────
router.post('/', authenticateCustomer, async (req, res) => {
  try {
    const { restaurant_id, reserved_at, party_size, guest_name, guest_phone, guest_email, notes } = req.body;
    if (!restaurant_id || !reserved_at || !party_size || !guest_name || !guest_phone) {
      return res.status(400).json({ success: false, message: 'restaurant_id, reserved_at, party_size, guest_name, guest_phone required' });
    }

    const restaurant = await Restaurant.findByPk(restaurant_id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    const settings = getReservationSettings(restaurant);
    if (!settings.enabled) return res.status(400).json({ success: false, message: 'Reservations not enabled' });

    const slot = settings.slot || {};
    if (party_size < (slot.min_party || 1) || party_size > (slot.max_party || 20)) {
      return res.status(400).json({ success: false, message: 'Party size out of allowed range' });
    }

    // 최소 사전 예약 시간 검증
    const minHours = slot.min_advance_hours || 1;
    if (!isWithinPolicy(reserved_at, minHours)) {
      return res.status(400).json({ success: false, message: `Reservation must be at least ${minHours}h in advance` });
    }

    // 슬롯 캐파 검증
    const date = String(reserved_at).slice(0, 10);
    const slots = await calcSlotAvailability(restaurant, date, party_size);
    const targetTime = new Date(reserved_at).toISOString().slice(0, 16);
    const matched = slots.find(s => s.time.slice(0, 16) === targetTime);
    if (matched && !matched.can_book) {
      return res.status(400).json({ success: false, message: 'Slot fully booked at this time' });
    }

    // RestaurantCustomer + Reservation 을 트랜잭션으로 묶어 customer_id 항상 보장.
    // 첫 예약(QR 스캔 등 prior visit 없음) 케이스에서 customer_id NULL 로 저장되어
    // 본인 /me 목록·취소가 불가능했던 R1 결함을 차단.
    // 신원(name/phone/email)은 Customer 글로벌 모델이 권원 — RestaurantCustomer 는 per-restaurant 통계만.
    const reservation = await sequelize.transaction(async (t) => {
      const [restaurantCustomer, created] = await RestaurantCustomer.findOrCreate({
        where: { restaurant_id, customer_id: req.customer.id },
        defaults: { restaurant_id, customer_id: req.customer.id },
        transaction: t
      });

      // 노쇼 차단 (RestaurantCustomer 확보 후 체크)
      const blockAfter = settings.no_show_policy?.block_after_count || 3;
      if (!created && restaurantCustomer.no_show_count >= blockAfter) {
        const err = new Error('Reservation blocked due to no-show history. Please contact the restaurant.');
        err.statusCode = 403;
        throw err;
      }

      const status = settings.auto_confirm ? 'confirmed' : 'pending';
      const newReservation = await Reservation.create({
        restaurant_id,
        customer_id: restaurantCustomer.id,
        guest_name,
        guest_phone,
        guest_email: guest_email || req.customer.email || null,
        reserved_at: new Date(reserved_at),
        party_size,
        turn_minutes: slot.turn_time_minutes || 90,
        status,
        notes: notes || null,
        source: 'customer_mobile',
        confirmation_sent_at: status === 'confirmed' ? new Date() : null
      }, { transaction: t });

      await restaurantCustomer.increment('reservation_count', { by: 1, transaction: t });

      return newReservation;
    });

    // 알림 비동기 (트랜잭션 커밋 후 실패해도 예약은 성공)
    try {
      const reservationNotificationService = require('../services/reservationNotificationService');
      reservationNotificationService.notifyCreated(reservation, restaurant).catch(() => {});
    } catch (_) {}

    res.json({ success: true, data: reservation });
  } catch (e) {
    if (e.statusCode === 403) {
      return res.status(403).json({ success: false, message: e.message });
    }
    console.error('[Reservation] create error:', e);
    res.status(500).json({ success: false, message: 'Failed to create reservation' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /me  (customer's reservations)
// ────────────────────────────────────────────────────────────────────────────
router.get('/me', authenticateCustomer, async (req, res) => {
  try {
    const customers = await RestaurantCustomer.findAll({ where: { customer_id: req.customer.id } });
    if (!customers.length) return res.json({ success: true, data: [] });
    const customerIds = customers.map(c => c.id);
    const list = await Reservation.findAll({
      where: { customer_id: { [Op.in]: customerIds } },
      order: [['reserved_at', 'DESC']],
      limit: 50
    });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to load reservations' });
  }
});

// ────────────────────────────────────────────────────────────────────────────
// GET /me/:id  +  PATCH /me/:id  +  DELETE /me/:id
// ────────────────────────────────────────────────────────────────────────────
async function loadOwnReservation(req, res) {
  const r = await Reservation.findByPk(req.params.id);
  if (!r) { res.status(404).json({ success: false, message: 'Reservation not found' }); return null; }
  const customer = await RestaurantCustomer.findByPk(r.customer_id);
  if (!customer || customer.customer_id !== req.customer.id) {
    res.status(403).json({ success: false, message: 'Not authorized' });
    return null;
  }
  return r;
}

router.get('/me/:id', authenticateCustomer, async (req, res) => {
  const r = await loadOwnReservation(req, res);
  if (!r) return;
  res.json({ success: true, data: r });
});

router.patch('/me/:id', authenticateCustomer, async (req, res) => {
  const r = await loadOwnReservation(req, res);
  if (!r) return;
  if (!['pending', 'confirmed'].includes(r.status)) {
    return res.status(400).json({ success: false, message: 'Cannot modify reservation in current state' });
  }
  const restaurant = await Restaurant.findByPk(r.restaurant_id);
  const settings = getReservationSettings(restaurant);
  const freeUntil = settings.cancellation_policy?.free_until_hours || 24;
  if (!isWithinPolicy(r.reserved_at, freeUntil)) {
    return res.status(400).json({ success: false, message: `Cannot modify within ${freeUntil}h of reservation` });
  }

  // 변경 후 값 계산 (POST 와 동일한 정책 강제)
  const slot = settings.slot || {};
  const newPartySize = req.body.party_size !== undefined ? Number(req.body.party_size) : r.party_size;
  const newReservedAt = req.body.reserved_at !== undefined ? new Date(req.body.reserved_at) : r.reserved_at;

  if (newPartySize < (slot.min_party || 1) || newPartySize > (slot.max_party || 20)) {
    return res.status(400).json({ success: false, message: 'Party size out of allowed range' });
  }

  // reserved_at 또는 party_size 가 변경되면 새 슬롯에서 최소 advance + 슬롯 캐파 재검증
  const reservedAtChanged = req.body.reserved_at !== undefined && String(newReservedAt) !== String(r.reserved_at);
  const partySizeChanged = req.body.party_size !== undefined && newPartySize !== r.party_size;
  if (reservedAtChanged || partySizeChanged) {
    const minHours = slot.min_advance_hours || 1;
    if (!isWithinPolicy(newReservedAt, minHours)) {
      return res.status(400).json({ success: false, message: `Reservation must be at least ${minHours}h in advance` });
    }
    const date = newReservedAt.toISOString().slice(0, 10);
    const slots = await calcSlotAvailability(restaurant, date, newPartySize);
    const targetTime = newReservedAt.toISOString().slice(0, 16);
    const matched = slots.find(s => s.time.slice(0, 16) === targetTime);
    if (matched && !matched.can_book) {
      // 본인 기존 예약이 같은 슬롯이라면 자기 자신을 제외하고 재계산
      const others = matched.available_covers + r.party_size;  // 본인 제외 가용
      if (others < newPartySize) {
        return res.status(400).json({ success: false, message: 'Slot fully booked at this time' });
      }
    }
  }

  const allowed = ['reserved_at', 'party_size', 'notes'];
  const update = {};
  for (const k of allowed) if (req.body[k] !== undefined) update[k] = req.body[k];
  await r.update(update);
  res.json({ success: true, data: r });
});

router.delete('/me/:id', authenticateCustomer, async (req, res) => {
  const r = await loadOwnReservation(req, res);
  if (!r) return;
  if (!['pending', 'confirmed'].includes(r.status)) {
    return res.status(400).json({ success: false, message: 'Cannot cancel reservation in current state' });
  }
  await r.update({
    status: 'cancelled',
    cancelled_at: new Date(),
    cancelled_by: 'customer',
    cancel_reason: req.body?.reason || null
  });

  try {
    const svc = require('../services/reservationNotificationService');
    const restaurant = await Restaurant.findByPk(r.restaurant_id);
    svc.notifyStatusChanged(r, restaurant, 'cancelled').catch(() => {});
  } catch (_) {}

  res.json({ success: true });
});

module.exports = router;
