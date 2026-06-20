'use strict';
// 현금관리/마감(Cash-up) — 교대 open → 예상 집계 → 실제 대조(variance) → close.
// 인쇄 방식 코드 무관(드로어킥/billPrint 미접촉). docs/CASH_MANAGEMENT_SHIFT_CLOSE.md.

const express = require('express');
const router = express.Router();
const { Op, fn, col, literal } = require('sequelize');
const { CashierShift, CashReconciliation, CashMovement, PaymentMethodSetting, OrderPayment } = require('../models');
const { authenticateToken, checkRestaurantAccess, requirePosCounter } = require('../middleware/auth');
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
// 취소/소프트삭제 주문의 결제는 제외 — OrderPayment 는 환불/void 컬럼도 reverse 행위도 없어
// (orders 취소 시 결제행이 그대로 남음) 그대로 합산하면 expected 현금이 부풀려져 '가짜 부족'
// (직원 횡령 누명)이 발생. dashboard 매출 집계(is_deleted/cancelled 제외)와 동일 규칙. (P0)
async function computeExpected(restaurantId, start, end) {
  const where = {
    restaurant_id: restaurantId,
    paid_at: { [Op.gte]: start },
    order_id: { [Op.notIn]: literal(`(SELECT id FROM orders WHERE restaurant_id = ${Number(restaurantId)} AND (status = 'cancelled' OR is_deleted = true))`) }
  };
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

// 교대 인출/입금 합 → { paidIn, paidOut, net }
async function computeMovements(shiftId) {
  const rows = await CashMovement.findAll({
    where: { shift_id: shiftId },
    attributes: ['type', [fn('SUM', col('amount')), 'total']],
    group: ['type'],
    raw: true
  });
  let paidIn = 0, paidOut = 0;
  for (const r of rows) {
    if (r.type === 'in') paidIn = round2(r.total);
    else if (r.type === 'out') paidOut = round2(r.total);
  }
  return { paidIn, paidOut, net: round2(paidIn - paidOut) };
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
router.post('/restaurant/:restaurantId/shift/open', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
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
    const mv = await computeMovements(shift.id);
    const registered = await PaymentMethodSetting.findAll({
      where: { restaurant_id: restaurantId, enabled: true },
      order: [['sort_order', 'ASC'], ['id', 'ASC']], raw: true
    });
    // 블라인드 카운트(P1) — 예상 '금액'은 카운트 전 클라이언트에 절대 보내지 않는다(목표값 노출 =
    // 손실방지 무력화). 카운트할 '수단 목록'(키/그룹)만 반환. 실제 expected/variance 는 reconcile
    // 응답에서만 공개. movements 는 직원 본인 입력값이라 노출 무방.
    const methodKeys = { card: Object.keys(expected.card), other: Object.keys(expected.other) };
    res.json({ success: true, data: { methodKeys, opening_float: round2(shift.opening_float), movements: mv, registeredMethods: registered } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST 대조 — actual 입력 → variance 계산, closing_balance 확정
router.post('/restaurant/:restaurantId/shift/:id/reconcile', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const shift = await CashierShift.findOne({ where: { id: req.params.id, restaurant_id: restaurantId } });
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    // 마감/이미 대조된 교대는 재대조 금지 — 두 번째 대조로 첫 variance 를 덮어 숨기는 것 방지(P1).
    if (shift.status !== 'open') {
      return res.status(400).json({ success: false, code: 'SHIFT_NOT_OPEN', message: 'Shift is not open for reconciliation.' });
    }

    const end = shift.closed_at || new Date();
    const expected = await computeExpected(restaurantId, shift.opened_at, end);
    const mv = await computeMovements(shift.id);
    const actual = req.body.actual || {};
    const cashCounted = round2(req.body.cash_counted);
    const openingFloat = round2(shift.opening_float || 0);

    // variance: 현금은 (개시현금 + 현금매출 + 입금 − 출금) 대비 / 카드·기타는 expected 대비
    const expectedCash = round2(openingFloat + expected.cash + mv.net);
    const variance = { cash: round2(cashCounted - expectedCash), card: {}, other: {} };
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

    // 1 교대 = 1 대조 (upsert) — 재제출이 새 행을 쌓아 '최신 by reconciled_at' 로 첫 variance 를
    // 가리는 것 방지(P1). 기존 대조가 있으면 갱신, 없으면 생성.
    const reconFields = {
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
    };
    let recon = await CashReconciliation.findOne({ where: { shift_id: shift.id } });
    if (recon) await recon.update(reconFields);
    else recon = await CashReconciliation.create(reconFields);
    res.json({ success: true, data: recon, expected, variance, movements: mv, expectedCashInDrawer: expectedCash, closing_balance });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST 교대 마감 (reconcile 후) — Z-Report 요약 생성·저장 + closing_balance 확정
router.post('/restaurant/:restaurantId/shift/:id/close', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const shift = await CashierShift.findOne({ where: { id: req.params.id, restaurant_id: restaurantId } });
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    if (shift.status === 'closed' || shift.status === 'reconciled') {
      return res.status(400).json({ success: false, code: 'SHIFT_ALREADY_CLOSED', message: 'Shift is already closed.' });
    }
    // 대조 없이 마감 금지 — 감사기록 없는 닫힌 교대 방지(P1). 반드시 reconcile 먼저.
    const recon = await CashReconciliation.findOne({ where: { shift_id: shift.id }, order: [['reconciled_at', 'DESC']] });
    if (!recon) {
      return res.status(400).json({ success: false, code: 'NO_RECONCILIATION', message: 'Reconcile the drawer before closing the shift.' });
    }
    await shift.update({ status: 'reconciled', closed_at: new Date() });

    // Z-Report 요약 — 교대 + 대조 + 인출입금 종합 (프론트가 인쇄 HTML 로 렌더; billPrint 무변경).
    {
      const mv = await computeMovements(shift.id);
      const orderCount = await OrderPayment.count({
        where: { restaurant_id: restaurantId, paid_at: { [Op.between]: [shift.opened_at, shift.closed_at || new Date()] } }
      });
      const exp = recon.expected || { cash: 0, card: {}, other: {} };
      const totalSales = round2(
        (exp.cash || 0)
        + Object.values(exp.card || {}).reduce((s, v) => s + (Number(v) || 0), 0)
        + Object.values(exp.other || {}).reduce((s, v) => s + (Number(v) || 0), 0)
      );
      const zreport = {
        shift_id: shift.id,
        cashier_name: shift.cashier_name || null,
        opened_at: shift.opened_at,
        closed_at: shift.closed_at,
        opening_float: round2(shift.opening_float),
        expected: exp,
        actual: recon.actual,
        variance: recon.variance,
        movements: mv,
        payment_count: orderCount,
        total_sales: totalSales,
        closing_balance: round2(recon.closing_balance),
        generated_at: new Date()
      };
      await recon.update({ zreport });
    }
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

// ── Phase 2 ──────────────────────────────────────────────────────────────────

// POST 인출/입금 (paid in/out) — open 교대에만
router.post('/restaurant/:restaurantId/shift/:id/movement', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const shift = await CashierShift.findOne({ where: { id: req.params.id, restaurant_id: restaurantId } });
    if (!shift) return res.status(404).json({ success: false, message: 'Shift not found' });
    if (shift.status !== 'open') return res.status(400).json({ success: false, code: 'SHIFT_NOT_OPEN', message: 'Shift is not open.' });
    // 대조(카운트) 이후 현금이동 금지 — 카운트한 스냅샷을 사후에 흔들어 감사기록을 무력화하는 것 방지(P1).
    const reconciled = await CashReconciliation.findOne({ where: { shift_id: shift.id }, attributes: ['id'] });
    if (reconciled) return res.status(400).json({ success: false, code: 'ALREADY_RECONCILED', message: 'Drawer already counted — cash movements are locked. Re-count if needed.' });
    const type = req.body.type === 'out' ? 'out' : (req.body.type === 'in' ? 'in' : null);
    const amount = round2(req.body.amount);
    if (!type || !(amount > 0)) return res.status(400).json({ success: false, code: 'INVALID_MOVEMENT', message: 'type (in/out) and positive amount required.' });
    const movement = await CashMovement.create({
      shift_id: shift.id, restaurant_id: restaurantId, type, amount,
      reason: req.body.reason || null,
      created_by_id: req.user.id || null,
      created_by_name: req.user.full_name || req.user.username || null
    });
    const mv = await computeMovements(shift.id);
    res.json({ success: true, data: movement, movements: mv });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// PUT 입출금 수정 (회계 정정 — 잘못 입력 수정). counter 권한.
router.put('/restaurant/:restaurantId/movement/:movementId', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const mv = await CashMovement.findOne({ where: { id: req.params.movementId, restaurant_id: restaurantId } });
    if (!mv) return res.status(404).json({ success: false, message: 'Movement not found' });
    const upd = {};
    if (req.body.type === 'in' || req.body.type === 'out') upd.type = req.body.type;
    if (req.body.amount != null) { const a = round2(req.body.amount); if (!(a > 0)) return res.status(400).json({ success: false, code: 'INVALID_MOVEMENT', message: 'amount must be > 0' }); upd.amount = a; }
    if ('reason' in req.body) upd.reason = req.body.reason || null;
    await mv.update(upd);
    res.json({ success: true, data: mv });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// DELETE 입출금 삭제 (회계 정정). counter 권한.
router.delete('/restaurant/:restaurantId/movement/:movementId', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const mv = await CashMovement.findOne({ where: { id: req.params.movementId, restaurant_id: restaurantId } });
    if (!mv) return res.status(404).json({ success: false, message: 'Movement not found' });
    await mv.destroy();
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, message: e.message }); }
});

// GET 인출/입금 내역 (단일 교대)
router.get('/restaurant/:restaurantId/shift/:id/movements', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const list = await CashMovement.findAll({
      where: { shift_id: req.params.id, restaurant_id: restaurantId },
      order: [['created_at', 'ASC']]
    });
    const mv = await computeMovements(req.params.id);
    res.json({ success: true, data: list, movements: mv });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// GET 현금 입출금 전체 내역 (매장 단위, 과거 모든 교대 포함) — 시재관리 회계 리스트용.
// 기간필터: ?startDate&endDate (ISO datetime). 없으면 전체. created_at 기준.
router.get('/restaurant/:restaurantId/movements', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const limit = Math.min(parseInt(req.query.limit, 10) || 500, 2000);
    const where = { restaurant_id: restaurantId };
    const { startDate, endDate } = req.query;
    if (startDate || endDate) {
      where.created_at = {};
      // date-only(YYYY-MM-DD) → 하루 경계로 확장. ISO datetime 이면 그대로.
      if (startDate) where.created_at[Op.gte] = new Date(/^\d{4}-\d{2}-\d{2}$/.test(startDate) ? `${startDate}T00:00:00` : startDate);
      if (endDate) where.created_at[Op.lte] = new Date(/^\d{4}-\d{2}-\d{2}$/.test(endDate) ? `${endDate}T23:59:59.999` : endDate);
    }
    const list = await CashMovement.findAll({
      where,
      include: [{ model: CashierShift, as: 'shift', attributes: ['business_date', 'cashier_name'] }],
      order: [['created_at', 'DESC']],
      limit
    });
    // 합계(필터 범위 내)
    let totalIn = 0, totalOut = 0;
    for (const m of list) { if (m.type === 'in') totalIn += Number(m.amount) || 0; else totalOut += Number(m.amount) || 0; }
    res.json({ success: true, data: list, summary: { totalIn: round2(totalIn), totalOut: round2(totalOut), net: round2(totalIn - totalOut), count: list.length } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST Z-Report 인쇄 기록 (실제 인쇄는 프론트 billPrint 재사용 — 방식 무변경)
router.post('/restaurant/:restaurantId/shift/:id/zreport-printed', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const recon = await CashReconciliation.findOne({ where: { shift_id: req.params.id, restaurant_id: restaurantId }, order: [['reconciled_at', 'DESC']] });
    if (!recon) return res.status(404).json({ success: false, message: 'Reconciliation not found' });
    await recon.update({ zreport_printed_at: new Date() });
    res.json({ success: true, data: { zreport_printed_at: recon.zreport_printed_at } });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// GET 결제수단 사전등록 목록
router.get('/restaurant/:restaurantId/payment-methods', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const list = await PaymentMethodSetting.findAll({
      where: { restaurant_id: restaurantId },
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// PUT 결제수단 사전등록 (전체 교체 — 매장당 목록 관리). 빈/누락 키는 거부(소실 방지).
router.put('/restaurant/:restaurantId/payment-methods', authenticateToken, checkRestaurantAccess, requirePosCounter, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const items = Array.isArray(req.body.methods) ? req.body.methods : null;
    if (!items) return res.status(400).json({ success: false, code: 'INVALID_PAYLOAD', message: 'methods array required.' });
    const valid = items.filter(m => m && m.method_key && m.label);
    // 전체 교체 (매장 스코프) — 트랜잭션으로 일괄
    await PaymentMethodSetting.sequelize.transaction(async (tx) => {
      await PaymentMethodSetting.destroy({ where: { restaurant_id: restaurantId }, transaction: tx });
      for (let i = 0; i < valid.length; i++) {
        const m = valid[i];
        await PaymentMethodSetting.create({
          restaurant_id: restaurantId,
          method_key: String(m.method_key),
          label: String(m.label),
          type: ['cash', 'card', 'ewallet', 'other'].includes(m.type) ? m.type : 'other',
          sort_order: Number.isFinite(m.sort_order) ? m.sort_order : i,
          enabled: m.enabled !== false
        }, { transaction: tx });
      }
    });
    const list = await PaymentMethodSetting.findAll({ where: { restaurant_id: restaurantId }, order: [['sort_order', 'ASC'], ['id', 'ASC']] });
    res.json({ success: true, data: list });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
