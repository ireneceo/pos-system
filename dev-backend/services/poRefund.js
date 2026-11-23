'use strict';
/**
 * 결제된 주문의 반품 환불 — 단일 소스 (2026-11-23)
 *   설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §4-3
 *   Irene «고객이 돌려보내거나 환불요청 하는 거 기능 정확히 하고 서로 승인하고 대응하게»
 *
 * 결제된 청구서·정산서는 건드리지 않는다(낸 문서는 그대로). 돌려줄 돈은 purchase_order_refunds 한 줄로 적는다.
 *   pending(판매자가 줘야 함) → sent(판매자 «환불 보냄») → confirmed(구매자 «받았음»)
 *   구매자 «못 받았음» = sent → pending + history. 자동으로 닫지 않는다. 돈은 시스템 밖에서 오간다.
 */
const { appendTrackingEvent } = require('./poRealtimeService');

const num = (v) => (v == null ? 0 : Number(v) || 0);
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const METHODS = ['bank_transfer', 'cash', 'other'];

function readArr(v) {
  if (Array.isArray(v)) return v.slice();
  if (typeof v === 'string') { try { const a = JSON.parse(v); return Array.isArray(a) ? a : []; } catch { return []; } }
  return [];
}

function fail(code, message, http = 400) {
  const e = new Error(message); e.code = code; e.http = http; return e;
}

function pushHistory(refund, entry) {
  const h = readArr(refund.history);
  h.push({ at: new Date().toISOString(), ...entry });
  return h;
}

/**
 * 반품 승인(환불 방식) — approveReturnCore 트랜잭션 안에서 부른다.
 *   같은 발주의 pending 환불 행이 있으면 금액을 더하고, 없으면 새로 만든다(판매자는 한 번에 보낸다).
 *   발주 returned_amount += · 추적 이벤트 returned(settlement 'refund') — 차감과 같은 칸이라 «낼 금액» 이 한 식으로 맞는다.
 * @returns {{amount:number, refund:object, invoice:null, invoiceTotalBefore:null, invoiceTotalAfter:null}}
 */
async function addToPending({ po, ret, item, t, actor = {}, initiatedBy = 'buyer' }) {
  const { PurchaseOrderRefund } = require('../models');
  const amount = round2(num(ret.quantity) * num(ret.unit_price));
  const label = (item && (item.seller_product_name || item.description)) || null;

  let refund = await PurchaseOrderRefund.findOne({
    where: { purchase_order_id: po.id, status: 'pending' },
    order: [['id', 'ASC']], lock: t.LOCK.UPDATE, transaction: t
  });
  if (refund) {
    await refund.update({
      amount: round2(num(refund.amount) + amount),
      history: pushHistory(refund, { event: 'added', return_id: ret.id, amount, by_user_id: actor.id || null })
    }, { transaction: t });
  } else {
    refund = await PurchaseOrderRefund.create({
      purchase_order_id: po.id, amount, currency: po.currency || null, status: 'pending',
      history: [{ at: new Date().toISOString(), event: 'added', return_id: ret.id, amount, by_user_id: actor.id || null }]
    }, { transaction: t });
  }

  const tracking = appendTrackingEvent(po, 'returned', `Return R${ret.id}: ${label || 'item'} × ${num(ret.quantity)} — refund due`, null, {
    return_id: ret.id, item_id: ret.purchase_order_item_id, qty: num(ret.quantity), amount,
    by_user_id: actor.id || null, initiated_by: initiatedBy,
    settlement: 'refund', refund_id: refund.id, invoice_id: null
  });
  await po.update({ returned_amount: round2(num(po.returned_amount) + amount), tracking_info: tracking }, { transaction: t });

  return { amount, refund, invoice: null, invoiceTotalBefore: null, invoiceTotalAfter: null };
}

/** 판매자 «환불 보냄» — pending → sent. */
async function markSent({ po, refund, method, reference, note, t, actor = {} }) {
  if (refund.status !== 'pending') throw fail('BAD_STATUS', `Refund cannot be marked sent in status '${refund.status}'`, 409);
  if (!METHODS.includes(method)) throw fail('BAD_METHOD', `method must be one of: ${METHODS.join(', ')}`);
  const now = new Date();
  await refund.update({
    status: 'sent', method, reference: reference || null, note: note || null,
    sent_at: now, sent_by_user_id: actor.id || null,
    history: pushHistory(refund, { event: 'sent', method, reference: reference || null, note: note || null, by_user_id: actor.id || null })
  }, { transaction: t });
  const tracking = appendTrackingEvent(po, 'refund_sent', `Refund sent: ${round2(refund.amount).toFixed(2)} (${method})`, null, {
    refund_id: refund.id, amount: round2(refund.amount), method, reference: reference || null, by_user_id: actor.id || null
  });
  await po.update({ tracking_info: tracking }, { transaction: t });
  return refund;
}

/**
 * 구매자 «받았음» — sent → confirmed (외부 업체 = 판매자 로그인이 없어 pending 에서 바로).
 *   현금으로 받고 매장 발주면 드로어에 넣는다 — «드로어는 낼 금액을 따라간다»(adjustPaidAmount 와 같은 식):
 *   넣는 금액 = max(0, min(환불액, 이 발주로 드로어에서 나간 순금액 − 낼 금액)). 이체·카드로 낸 주문은 순출금 0 → 0.
 */
async function confirmReceived({ po, refund, receivedMethod, isExternal, t, actor = {} }) {
  const okFrom = isExternal ? ['pending', 'sent'] : ['sent'];
  if (!okFrom.includes(refund.status)) {
    throw fail('BAD_STATUS', refund.status === 'pending'
      ? 'The seller has not sent this refund yet'
      : `Refund cannot be confirmed in status '${refund.status}'`, 409);
  }
  if (!METHODS.includes(receivedMethod)) throw fail('BAD_METHOD', `received_method must be one of: ${METHODS.join(', ')}`);

  let movement = null; let drawerSkipped = false; let drawerAmount = 0;
  if (receivedMethod === 'cash' && po.entity_type === 'restaurant') {
    const { netDrawerOut, resolvePayableAmount, resolveOpenShift } = require('./purchaseOrderPayment');
    const out = await netDrawerOut(po.id, t);
    const payable = (await resolvePayableAmount(po)).amount;
    drawerAmount = Math.max(0, round2(Math.min(num(refund.amount), out - payable)));
    if (drawerAmount > 0) {
      const shift = await resolveOpenShift(po.entity_id, t);
      if (shift) {
        const { CashMovement } = require('../models');
        movement = await CashMovement.create({
          shift_id: shift.id, restaurant_id: po.entity_id, type: 'in', amount: drawerAmount,
          reason: `Refund received — purchase order ${po.po_number}`,
          source: 'purchase_order', purchase_order_id: po.id, created_by_id: actor.id || null
        }, { transaction: t });
      } else {
        drawerSkipped = true;
      }
    }
  }
  const now = new Date();
  await refund.update({
    status: 'confirmed', received_method: receivedMethod, confirmed_at: now, confirmed_by_user_id: actor.id || null,
    cash_movement_id: movement ? movement.id : null,
    history: pushHistory(refund, { event: 'confirmed', received_method: receivedMethod, drawer_amount: movement ? drawerAmount : 0, drawer_skipped: drawerSkipped, by_user_id: actor.id || null })
  }, { transaction: t });
  const tracking = appendTrackingEvent(po, 'refund_confirmed', `Refund received by buyer: ${round2(refund.amount).toFixed(2)}`, null, {
    refund_id: refund.id, amount: round2(refund.amount), received_method: receivedMethod, by_user_id: actor.id || null
  });
  await po.update({ tracking_info: tracking }, { transaction: t });
  return { refund, movement, drawerSkipped, drawerAmount: movement ? drawerAmount : 0 };
}

/** 구매자 «못 받았음» — sent → pending + 사유. */
async function dispute({ po, refund, note, t, actor = {} }) {
  if (refund.status !== 'sent') throw fail('BAD_STATUS', `Refund cannot be disputed in status '${refund.status}'`, 409);
  await refund.update({
    status: 'pending',
    history: pushHistory(refund, { event: 'disputed', note, by_user_id: actor.id || null })
  }, { transaction: t });
  const tracking = appendTrackingEvent(po, 'refund_disputed', `Buyer reports refund not received: ${String(note).slice(0, 200)}`, null, {
    refund_id: refund.id, amount: round2(refund.amount), note, by_user_id: actor.id || null
  });
  await po.update({ tracking_info: tracking }, { transaction: t });
  return refund;
}

/** 목록용 요약 — 발주 id → { pending_amount, sent_amount, confirmed_amount, status, last_dispute } (한 쿼리). */
async function refundSummaryFor(poIds) {
  const out = new Map();
  if (!poIds.length) return out;
  const { PurchaseOrderRefund } = require('../models');
  const rows = await PurchaseOrderRefund.findAll({
    where: { purchase_order_id: poIds },
    attributes: ['id', 'purchase_order_id', 'status', 'amount', 'history'], order: [['id', 'ASC']]
  });
  for (const r of rows) {
    const k = Number(r.purchase_order_id);
    const e = out.get(k) || { pending_amount: 0, sent_amount: 0, confirmed_amount: 0, status: null, disputed: false };
    if (r.status === 'pending') e.pending_amount = round2(e.pending_amount + num(r.amount));
    else if (r.status === 'sent') e.sent_amount = round2(e.sent_amount + num(r.amount));
    else if (r.status === 'confirmed') e.confirmed_amount = round2(e.confirmed_amount + num(r.amount));
    if (r.status === 'pending') {
      const h = readArr(r.history);
      if (h.length && h[h.length - 1].event === 'disputed') e.disputed = true;
    }
    e.status = e.pending_amount > 0 ? 'pending' : e.sent_amount > 0 ? 'sent' : (e.confirmed_amount > 0 ? 'confirmed' : e.status);
    out.set(k, e);
  }
  return out;
}

module.exports = { addToPending, markSent, confirmReceived, dispute, refundSummaryFor, METHODS };
