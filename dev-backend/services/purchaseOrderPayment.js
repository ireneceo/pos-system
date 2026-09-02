/**
 * 발주 결제 · 되돌리기 — **단일 소스** (P4-3, 2026-09-02).
 * 설계: docs/PURCHASE_ORDER_SYSTEM.md §5-3 (Fable 확정)
 *
 * 무엇이 규칙인가:
 *   - 결제 사실은 **발주 행**에 기록한다(payment_status/method/paid_at/paid_by_user_id).
 *     별도 결제 원장 테이블을 만들지 않는다 — 인보이스 결제와 같은 모양이다.
 *   - **현금**이고 구매자가 **매장**이고 **열린 시프트가 정확히 1개**일 때만 드로어 출금(`out`)을 만든다.
 *       · 열린 시프트 0개 → 결제는 기록하되 이동은 만들지 않고 `drawerSkipped` 로 알린다
 *         (막지 않는다 — 시프트 밖에서 쓴 돈은 드로어 돈이 아니다).
 *       · 열린 시프트 2개 이상 → **400 으로 거절한다.** 임의로 하나를 고르면 그 시프트의
 *         마감 기대금액이 조용히 틀어진다. 앱은 매장당 1개를 강제하지만(cash-management.js
 *         SHIFT_ALREADY_OPEN) DB 유니크가 아니라 드리프트가 가능하다.
 *       · BG·푸드코트 구매자는 드로어가 없으므로 결제 기록만.
 *   - **되돌리기는 삭제가 아니다.** 취소·환불은 그 시점의 열린 시프트에 **반대 방향 `in`** 을 만든다
 *     (감사 기록 보존). 열린 시프트가 없으면 `refunded` 만 기록하고 알린다.
 *     마감 기대금액 공식(cash-management.js:258 `openingFloat + expected.cash + mv.net`)은
 *     `shift_id` 로만 묶고 `source` 를 보지 않으므로, 이 이동들이 **자동으로** 그 공식에 잡힌다.
 */
const { PurchaseOrder, CashMovement, CashierShift } = require('../models');

const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

function err(message, code, statusCode = 400) {
  const e = new Error(message);
  e.code = code; e.statusCode = statusCode;
  return e;
}

/** 매장의 열린 시프트를 **정확히 하나** 고른다. 2개 이상이면 고르지 않고 던진다. */
async function resolveOpenShift(restaurantId, t) {
  const open = await CashierShift.findAll({
    where: { restaurant_id: restaurantId, status: 'open' },
    order: [['opened_at', 'DESC']],
    transaction: t,
  });
  if (open.length > 1) {
    throw err(
      `Multiple open shifts (${open.length}) for this restaurant — close one before recording a cash payment`,
      'MULTIPLE_OPEN_SHIFTS'
    );
  }
  return open[0] || null;
}

/**
 * 발주 결제 기록.
 * @returns {{po, movement:CashMovement|null, drawerSkipped:boolean}}
 */
async function recordPayment(po, { method, userId, reason }, t) {
  if (!['cash', 'bank_transfer', 'card'].includes(method)) {
    throw err('payment_method must be cash, bank_transfer or card', 'INVALID_PAYMENT_METHOD');
  }
  // 이미 낸 발주를 또 내면 드로어에서 두 번 빠진다 — 한 번만 허용한다.
  if (po.payment_status === 'paid') {
    throw err('This purchase order is already paid', 'ALREADY_PAID', 409);
  }

  let movement = null;
  let drawerSkipped = false;
  if (method === 'cash' && po.entity_type === 'restaurant') {
    const shift = await resolveOpenShift(po.entity_id, t);
    if (shift) {
      movement = await CashMovement.create({
        shift_id: shift.id,
        restaurant_id: po.entity_id,
        type: 'out',
        amount: round2(po.total_amount),
        reason: reason || `Purchase order ${po.po_number}`,
        source: 'purchase_order',
        purchase_order_id: po.id,
        created_by_id: userId || null,
      }, { transaction: t });
    } else {
      // 막지 않는다 — 시프트를 안 연 매장도 외상·현금 지출을 기록할 수 있어야 한다.
      drawerSkipped = true;
    }
  }

  await po.update({
    payment_status: 'paid',
    payment_method: method,
    paid_at: new Date(),
    paid_by_user_id: userId || null,
    cash_movement_id: movement ? movement.id : null,
  }, { transaction: t });

  return { po, movement, drawerSkipped };
}

/**
 * 결제 되돌리기(취소·환불). **삭제하지 않는다** — 반대 방향 이동을 만든다.
 * @returns {{po, movement:CashMovement|null, drawerSkipped:boolean, noop:boolean}}
 */
async function reversePayment(po, { userId, reason }, t) {
  if (po.payment_status !== 'paid') {
    // 안 낸 발주는 되돌릴 것이 없다 — 조용히 넘어간다(취소 자체를 막지 않기 위해).
    return { po, movement: null, drawerSkipped: false, noop: true };
  }

  let movement = null;
  let drawerSkipped = false;
  // 원래 현금으로 드로어에서 나갔던 것만 드로어로 되돌린다(계좌이체·카드는 드로어 밖 돈이다).
  if (po.payment_method === 'cash' && po.entity_type === 'restaurant' && po.cash_movement_id) {
    const shift = await resolveOpenShift(po.entity_id, t);
    if (shift) {
      const original = await CashMovement.findByPk(po.cash_movement_id, { transaction: t });
      movement = await CashMovement.create({
        // **그 시점의 열린 시프트**에 넣는다 — 이미 마감된 시프트를 건드리면 확정된 마감이 흔들린다.
        shift_id: shift.id,
        restaurant_id: po.entity_id,
        type: 'in',
        amount: round2(original ? original.amount : po.total_amount),
        reason: reason || `Refund — purchase order ${po.po_number}`,
        source: 'purchase_order',
        purchase_order_id: po.id,
        created_by_id: userId || null,
      }, { transaction: t });
    } else {
      drawerSkipped = true;
    }
  }

  await po.update({ payment_status: 'refunded' }, { transaction: t });
  return { po, movement, drawerSkipped, noop: false };
}

module.exports = { recordPayment, reversePayment, resolveOpenShift };
