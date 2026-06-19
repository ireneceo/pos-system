'use strict';
// 현금관리/마감(Cash-up) — 교대 open → 예상 집계 → 실제 대조(variance) → close.
// 인쇄 방식 코드 무관(드로어킥/billPrint 미접촉). docs/CASH_MANAGEMENT_SHIFT_CLOSE.md.

const express = require('express');
const router = express.Router();
const { Op, fn, col } = require('sequelize');
const { CashierShift, CashReconciliation, OrderPayment } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { getRestaurantTimezone } = require('../utils/dateTimeHelper');
const Restaurant = require('../models/Restaurant');

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

// 매장 타임존 기준 영업일(YYYY-MM-DD)
function businessDate(tz) {
  try {
    const parts = new Intl.DateTimeFormat('en-CA', { timeZone: tz || 'Asia/Kuala_Lumpur', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    return parts; // en-CA → YYYY-MM-DD
  } catch { return null; }
}

// order_payments(window) → { cash, card:{visa,..}, other:{ewallet,..} }
async function computeExpected(restaurantId, start, end) {
  const where = { restaurant_id: restaurantId, paid_at: { [Op.gte]: start } };
  if (end) where.paid_at[Op.lte] = end;
  const rows = await OrderPayment.findAll({
    where,
    attributes: ['payment_method', 'card_type', [fn('SUM', col('amount')), 'total']],
    group: ['payment_method', 'card_type'],
    raw: true
  });
  const expected = { cash: 0, card: {}, other: {} };
  for (const r of rows) {
    const m = String(r.payment_method || '').toLowerCase();
    const amt = round2(r.total);
    if (m === 'cash') expected.cash = round2(expected.cash + amt);
    else if (m === 'card') {
      const ct = String(r.card_type || 'card').toLowerCase();
      expected.card[ct] = round2((expected.card[ct] || 0) + amt);
    } else {
      expected.other[m] = round2((expected.other[m] || 0) + amt);
    }
  }
  return expected;
}

// GET 현재 open 교대
router.get('/restaurant/:restaurantId/shift/current', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const shift = await CashierShift.findOne({ where: { restaurant_id: restaurantId, status: 'open' }, order: [['opened_at', 'DESC']] });
    res.json({ success: true, data: shift });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST 교대 시작 — opening_float(미입력 시 직전 마감현금 자동)
router.post('/restaurant/:restaurantId/shift/open', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const existing = await CashierShift.findOne({ where: { restaurant_id: restaurantId, status: 'open' } });
    if (existing) {
      return res.status(400).json({ success: false, code: 'SHIFT_ALREADY_OPEN', message: 'A shift is already open. Close it first.' });
    }
    // 직전 교대 마감현금 → 개시현금 기본값
    let suggested = 0;
    const lastRec = await CashReconciliation.findOne({ where: { restaurant_id: restaurantId, closing_balance: { [Op.ne]: null } }, order: [['reconciled_at', 'DESC']] });
    if (lastRec && lastRec.closing_balance != null) suggested = round2(lastRec.closing_balance);
    const opening_float = req.body.opening_float != null ? round2(req.body.opening_float) : suggested;

    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['operation_settings'] });
    const tz = getRestaurantTimezone(restaurant);
    const shift = await CashierShift.create({
      restaurant_id: restaurantId,
      cashier_id: req.user.id || null,
      cashier_name: req.user.full_name || req.user.username || null,
      business_date: businessDate(tz),
      opened_at: new Date(),
      opening_float,
      status: 'open',
      timezone: tz,
      notes: req.body.notes || null
    });
    res.json({ success: true, data: shift, suggestedFloat: suggested });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// GET 교대 예상 집계 (현재까지)
router.get('/restaurant/:restaurantId/shift/:id/expected', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const shift = await CashierShift.findOne({ where: { id: req.params.id, restaurant_id: restaurantId } });
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    const end = shift.closed_at || new Date();
    const expected = await computeExpected(restaurantId, shift.opened_at, end);
    const expectedCashWithFloat = round2(Number(shift.opening_float || 0) + expected.cash);
    res.json({ success: true, data: { expected, opening_float: round2(shift.opening_float), expectedCashInDrawer: expectedCashWithFloat } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST 대조 — actual 입력 → variance 계산, closing_balance 확정
router.post('/restaurant/:restaurantId/shift/:id/reconcile', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const shift = await CashierShift.findOne({ where: { id: req.params.id, restaurant_id: restaurantId } });
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });

    const end = shift.closed_at || new Date();
    const expected = await computeExpected(restaurantId, shift.opened_at, end);
    const actual = req.body.actual || {};
    const cashCounted = round2(req.body.cash_counted);
    const openingFloat = round2(shift.opening_float || 0);

    // variance: 현금은 개시현금 포함 / 카드·기타는 expected 대비
    const variance = { cash: round2(cashCounted - (openingFloat + expected.cash)), card: {}, other: {} };
    const actualCard = actual.card || {};
    for (const k of new Set([...Object.keys(expected.card), ...Object.keys(actualCard)])) {
      variance.card[k] = round2((Number(actualCard[k]) || 0) - (expected.card[k] || 0));
    }
    const actualOther = actual.other || {};
    for (const k of new Set([...Object.keys(expected.other), ...Object.keys(actualOther)])) {
      variance.other[k] = round2((Number(actualOther[k]) || 0) - (expected.other[k] || 0));
    }
    const anyVariance = variance.cash !== 0
      || Object.values(variance.card).some(v => v !== 0)
      || Object.values(variance.other).some(v => v !== 0);

    const closing_balance = cashCounted; // 드로어 실제 현금이 다음 개시현금

    const recon = await CashReconciliation.create({
      shift_id: shift.id,
      restaurant_id: restaurantId,
      expected,
      actual: { cash: cashCounted, card: actualCard, other: actualOther },
      variance,
      cash_counted: cashCounted,
      closing_balance,
      reconciled_at: new Date(),
      reconciled_by_id: req.user.id || null,
      reconciled_by_name: req.user.full_name || req.user.username || null,
      status: anyVariance ? 'variance' : 'matched',
      notes: req.body.notes || null
    });
    res.json({ success: true, data: recon, expected, variance, closing_balance });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST 교대 마감 (reconcile 후)
router.post('/restaurant/:restaurantId/shift/:id/close', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const shift = await CashierShift.findOne({ where: { id: req.params.id, restaurant_id: restaurantId } });
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    if (shift.status === 'closed' || shift.status === 'reconciled') {
      return res.status(400).json({ success: false, code: 'SHIFT_ALREADY_CLOSED', message: 'Shift is already closed.' });
    }
    await shift.update({ status: 'reconciled', closed_at: new Date() });
    const recon = await CashReconciliation.findOne({ where: { shift_id: shift.id }, order: [['reconciled_at', 'DESC']] });
    res.json({ success: true, data: { shift, reconciliation: recon } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// GET 교대 이력
router.get('/restaurant/:restaurantId/shift/history', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const limit = Math.min(parseInt(req.query.limit, 10) || 30, 100);
    const shifts = await CashierShift.findAll({
      where: { restaurant_id: restaurantId },
      include: [{ model: CashReconciliation, as: 'reconciliations' }],
      order: [['opened_at', 'DESC']],
      limit
    });
    res.json({ success: true, data: shifts });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
