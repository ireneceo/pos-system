'use strict';
/**
 * 반품 금액 차감 — 단일 소스 (2026-11-17)
 *   설계 .claude/fable-design-20261117-po-returns-seller-and-deduct.md §4
 *   Irene «반품 … 그럼 비용이 차감되고 결제가 된 경우 말고는 되어야 해»
 *
 * 예전엔 승인 때 Credit Note 만 만들고 아무도 읽지 않아 청구서·정산서·발주 낼 금액이 그대로였다.
 * 이제 승인 순간 거래 청구서 additional_charges 끝에 음수 줄을 넣어 총액을 내리고(finalizeInvoice),
 * 발주 returned_amount 를 올린다(payableFrom 이 뺀다). 정산서 따라가기는 호출자가 커밋 뒤에 한다.
 *
 * - 차감액 = 반품 수량 × 반품 행 단가(품목 값만 · 배송비·세금 그대로).
 * - 품목 줄은 건드리지 않는다 — 출고 뒤 정정이 품목 줄을 다시 써도 이 요금 줄은 살아남는다.
 * - Credit Note 는 더 만들지 않는다(같은 돈의 문서 두 장 = 이중 차감 위험).
 */
const { finalizeInvoice } = require('../utils/invoiceCalculation');
const { appendTrackingEvent } = require('./poRealtimeService');

const num = (v) => (v == null ? 0 : Number(v) || 0);
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

function readArr(v) {
  if (Array.isArray(v)) return v.slice();
  if (typeof v === 'string') { try { const a = JSON.parse(v); return Array.isArray(a) ? a : []; } catch { return []; } }
  return [];
}

/** 반품 행 한 줄 → 청구서 요금 줄. 대조 동기화가 요금 줄을 다시 만들 때도 같은 모양을 쓴다. */
function chargeLineFor(ret, label) {
  const qty = num(ret.quantity);
  const amount = round2(num(ret.deducted_amount != null ? ret.deducted_amount : qty * num(ret.unit_price)));
  const name = `Return R${ret.id} — ${label || 'item'} × ${qty}${ret.unit ? ` ${ret.unit}` : ''}`.slice(0, 200);
  return { name, amount: -amount, kind: 'po_return', return_id: ret.id };
}

/**
 * 승인 트랜잭션 안에서 부른다.
 * @returns {{amount:number, invoice:object|null, invoiceTotalBefore:number|null, invoiceTotalAfter:number|null}}
 */
async function applyReturnDeduction({ po, ret, item, invoice, t, actor = {}, initiatedBy = 'buyer' }) {
  const amount = round2(num(ret.quantity) * num(ret.unit_price));
  const label = (item && (item.seller_product_name || item.description)) || null;

  let before = null;
  let after = null;
  if (invoice && amount > 0) {
    before = round2(num(invoice.total_amount));
    const charges = readArr(invoice.additional_charges);
    const plainRet = typeof ret.get === 'function' ? ret.get({ plain: true }) : ret;
    charges.push(chargeLineFor({ ...plainRet, deducted_amount: amount }, label));
    await invoice.update({ additional_charges: charges }, { transaction: t });
    await finalizeInvoice(invoice.id, t);
    await invoice.reload({ transaction: t });
    after = round2(num(invoice.total_amount));

    const tail = {};
    // 직영 정산(INTERNAL) 청구서는 처음부터 paid — 낸 금액도 같이 내린다(대조 allowPaid 와 같은 처리).
    if (invoice.status === 'paid' && invoice.payment_method === 'internal') tail.paid_amount = after;
    if (after !== before) {
      const history = readArr(invoice.modification_history);
      history.push({
        modified_at: new Date().toISOString(),
        modified_by: actor.id || null,
        modified_by_name: actor.name || null,
        changes: { total_amount: { from: before, to: after } },
        reason: `Return R${ret.id} approved — PO ${po.po_number}`,
        source: 'po_return'
      });
      tail.modification_history = history;
      tail.is_modified = true;
    }
    if (Object.keys(tail).length) await invoice.update(tail, { transaction: t });
  }

  const tracking = appendTrackingEvent(po, 'returned', `Return R${ret.id}: ${label || 'item'} × ${num(ret.quantity)}`, null, {
    return_id: ret.id, item_id: ret.purchase_order_item_id, qty: num(ret.quantity), amount,
    by_user_id: actor.id || null, initiated_by: initiatedBy,
    invoice_id: invoice ? invoice.id : null, invoice_total_before: before, invoice_total_after: after
  });
  await po.update({
    returned_amount: round2(num(po.returned_amount) + amount),
    tracking_info: tracking
  }, { transaction: t });
  // 전체 반품으로 0원이 된 청구서는 닫는다(연체·0원 메일 방지)
  if (invoice) await closeIfFullyReturned({ po, invoice, t });

  return { amount, invoice: invoice || null, invoiceTotalBefore: before, invoiceTotalAfter: after };
}

/**
 * 반품으로 총액이 0 이 된 청구서를 닫는다 (2026-11-17 Fable gate ①).
 *   안 닫으면 «미결제 RM 0.00» 로 남아 마감일이 지나면 연체로 바뀌고 0원 연체 메일이 나간다(카드 결제는 0원 거부).
 *   대상: 총액 0 · 직영 아님 · 정산서에 안 묶임 · pending_payment/overdue. 드로어 이동 없음 · 발주 payment_method 무접촉.
 * @returns {boolean} 닫았는가
 */
async function closeIfFullyReturned({ po, invoice, t }) {
  if (!invoice) return false;
  if (round2(num(invoice.total_amount)) !== 0) return false;
  if (invoice.payment_method === 'internal') return false;
  if (invoice.parent_soa_invoice_id) return false;
  if (!['pending_payment', 'overdue'].includes(invoice.status)) return false;
  const now = new Date();
  await invoice.update({ status: 'paid', paid_amount: 0, paid_at: now, payment_notes: 'Fully returned — nothing to pay' }, { transaction: t });
  if (po && po.payment_status !== 'paid') {
    await po.update({ payment_status: 'paid', paid_at: now }, { transaction: t });
  }
  return true;
}

/**
 * 청구서를 **나중에** 만들 때(createTradeInvoice) — 승인 때 청구서가 없어 아직 안 뺀 반품을 요금 줄로 붙인다 (Fable gate ②).
 *   대상: 이 발주의 승인 반품 중 deducted_amount 가 있고 deducted_invoice_id 가 null 인 것. 붙인 뒤 그 행에 청구서 id 를 적는다
 *   (대조 재동기화 returnChargesFor 가 다시 붙일 수 있게).
 * @returns {number} 붙인 줄 수
 */
async function attachPendingReturnsToInvoice({ poId, invoice, t }) {
  const { PurchaseOrderReturn, PurchaseOrderItem } = require('../models');
  const { Op } = require('sequelize');
  const rets = await PurchaseOrderReturn.findAll({
    where: { purchase_order_id: poId, status: 'approved', deducted_invoice_id: null, deducted_amount: { [Op.gt]: 0 } },
    order: [['id', 'ASC']], transaction: t
  });
  if (!rets.length) return 0;
  const items = await PurchaseOrderItem.findAll({
    where: { id: [...new Set(rets.map(r => r.purchase_order_item_id))] }, attributes: ['id', 'description'], transaction: t
  });
  const byId = new Map(items.map(i => [i.id, i]));
  const charges = readArr(invoice.additional_charges);
  for (const r of rets) {
    if (charges.some(c => c && c.kind === 'po_return' && Number(c.return_id) === r.id)) continue;
    charges.push(chargeLineFor(r.get({ plain: true }), byId.get(r.purchase_order_item_id)?.description || null));
  }
  await invoice.update({ additional_charges: charges }, { transaction: t });
  await PurchaseOrderReturn.update({ deducted_invoice_id: invoice.id }, { where: { id: rets.map(r => r.id) }, transaction: t });
  return rets.length;
}

/**
 * 이 청구서에서 이미 뺀 승인 반품들의 요금 줄 — 대조 동기화가 요금 줄을 처음부터 다시 만든 뒤 덧붙인다.
 * 요금 줄의 kind 키에 기대지 않고 반품 행에서 다시 만든다.
 */
async function returnChargesFor(poId, invoiceId, t) {
  const { PurchaseOrderReturn, PurchaseOrderItem } = require('../models');
  const rets = await PurchaseOrderReturn.findAll({
    where: { purchase_order_id: poId, status: 'approved', deducted_invoice_id: invoiceId },
    order: [['id', 'ASC']],
    transaction: t
  });
  if (!rets.length) return [];
  const items = await PurchaseOrderItem.findAll({
    where: { id: [...new Set(rets.map(r => r.purchase_order_item_id))] },
    attributes: ['id', 'description'], transaction: t
  });
  const byId = new Map(items.map(i => [i.id, i]));
  return rets.map(r => chargeLineFor(r.get({ plain: true }), byId.get(r.purchase_order_item_id)?.description || null));
}

/**
 * 목록·상세 장식 (§3-4) — 판매자 목록/상세 · 구매자 상세가 같이 쓴다.
 *   발주: can_return · return_blocked{code,message} · returned_amount
 *   줄: returned_qty(승인 합) · return_pending_qty(신청 합) · returnable_qty(받은 양 − 둘)
 * 청구서·정산서·반품 합을 각각 한 쿼리로 모은다. 판정은 utils/poAmend.returnMoneyBlock 하나.
 */
async function attachReturnState(objs) {
  const list = (Array.isArray(objs) ? objs : [objs]).filter(Boolean);
  if (!list.length) return objs;
  const { Invoice, PurchaseOrderReturn } = require('../models');
  const { Op } = require('sequelize');
  const { returnMoneyBlock } = require('../utils/poAmend');

  const invIds = [...new Set(list.map(o => o.trade_invoice_id).filter(Boolean))];
  const invs = invIds.length ? await Invoice.findAll({
    where: { id: invIds }, attributes: ['id', 'status', 'paid_amount', 'payment_method', 'parent_soa_invoice_id']
  }) : [];
  const invById = new Map(invs.map(i => [i.id, i]));
  const soaIds = [...new Set(invs.map(i => i.parent_soa_invoice_id).filter(Boolean))];
  const soas = soaIds.length ? await Invoice.findAll({ where: { id: soaIds }, attributes: ['id', 'status'] }) : [];
  const soaById = new Map(soas.map(x => [x.id, x]));

  const poIds = list.map(o => o.id).filter(Boolean);
  const sums = poIds.length ? await PurchaseOrderReturn.findAll({
    where: { purchase_order_id: { [Op.in]: poIds }, status: { [Op.in]: ['requested', 'approved'] } },
    attributes: ['purchase_order_item_id', 'status', 'quantity'], raw: true
  }) : [];
  const byItem = new Map();
  for (const r of sums) {
    const k = Number(r.purchase_order_item_id);
    const e = byItem.get(k) || { approved: 0, requested: 0 };
    e[r.status] += num(r.quantity);
    byItem.set(k, e);
  }

  for (const o of list) {
    const inv = o.trade_invoice_id ? invById.get(o.trade_invoice_id) || null : null;
    const soa = inv && inv.parent_soa_invoice_id ? soaById.get(inv.parent_soa_invoice_id) || null : null;
    const blk = returnMoneyBlock(o, inv, soa);
    o.returned_amount = round2(num(o.returned_amount));
    let anyReturnable = false;
    for (const it of (Array.isArray(o.items) ? o.items : [])) {
      const e = byItem.get(Number(it.id)) || { approved: 0, requested: 0 };
      it.returned_qty = Math.round(e.approved * 1000) / 1000;
      it.return_pending_qty = Math.round(e.requested * 1000) / 1000;
      it.returnable_qty = Math.max(0, Math.round((num(it.quantity_received) - e.approved - e.requested) * 1000) / 1000);
      if (it.returnable_qty > 0) anyReturnable = true;
    }
    o.can_return = !blk;
    o.return_blocked = blk ? { code: blk.code, message: blk.message } : null;
    o.has_returnable = anyReturnable;
  }
  return objs;
}

module.exports = { applyReturnDeduction, returnChargesFor, chargeLineFor, attachReturnState, closeIfFullyReturned, attachPendingReturnsToInvoice };
