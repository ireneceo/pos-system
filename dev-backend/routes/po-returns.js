/**
 * Purchase Order Returns — Sprint 6 (2026-04-27).
 *
 * Buyer-initiated returns on received PO line items.
 * Seller approves → amount taken off the trade invoice (services/poReturnDeduction) + stock reversal.
 *   (Before 2026-11-17 a Credit Note was issued instead — nobody read it, so the bill never went down.)
 *
 *   POST /api/purchase-orders/:id/returns                     — buyer initiate
 *   GET  /api/purchase-orders/:id/returns                     — buyer view
 *   GET  /api/seller-orders/:id/returns                       — seller view
 *   POST /api/seller-orders/:id/returns                       — seller direct return (2026-11-17, approved at once)
 *   POST /api/seller-orders/:id/returns/:returnId/approve     — seller approve
 *   POST /api/seller-orders/:id/returns/:returnId/reject      — seller reject
 */

const express = require('express');
// 재고 되돌림(금액 근거 = 반품 줄 가격 ÷ 환산)은 services/poStockReversal 이 한다.
const router = express.Router();
const database = require('../config/database');
const { Op } = require('sequelize');
const {
  PurchaseOrder, PurchaseOrderItem, PurchaseOrderReturn,
  Ingredient, IngredientSellerProduct, SupplierProduct, SupplierInventoryTransaction,
  InventoryTransaction, FoodcourtProduct,
  BrandProduct, ProductRecipeIngredient, ProductIngredient,
  Invoice, InvoiceItem
} = require('../models');
const { resolvePayer } = require('../services/purchaseOrderService');
const { stockFor, applyStock } = require('../utils/brandStockAccess');
const { reverseBuyerStock, restoreSellerStock } = require('../services/poStockReversal');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { requireSellerRole , ownsPurchaseOrder } = require('../middleware/sellerScope');
const { sanitizeString } = require('../middleware/validation');
const { emitPoEvent } = require('../services/poRealtimeService');
const { returnMoneyBlock } = require('../utils/poAmend');
const { applyReturnDeduction } = require('../services/poReturnDeduction');

// ─────────────────────────────────────────────────────────────────────────────
// 2026-11-17 반품 개편 (Fable 설계 .claude/fable-design-20261117-po-returns-seller-and-deduct.md)
//   ① 판정 returnMoneyBlock 하나 — 결제된 주문은 신청·직접 반품·승인 모두 막는다
//   ② 판매자 직접 반품 POST /seller-orders/:id/returns (넣는 즉시 승인)
//   ③ 승인 = 청구서에서 금액을 뺀다(services/poReturnDeduction) — Credit Note 는 더 안 만든다
// ─────────────────────────────────────────────────────────────────────────────

/** 발주의 거래 청구서·그 정산서를 (잠가서) 읽는다. 판정·차감이 같은 행을 본다. */
async function loadMoneyDocs(po, t) {
  const lock = t ? { lock: t.LOCK.UPDATE, transaction: t } : {};
  const invoice = po.trade_invoice_id ? await Invoice.findByPk(po.trade_invoice_id, lock) : null;
  const soa = invoice && invoice.parent_soa_invoice_id
    ? await Invoice.findByPk(invoice.parent_soa_invoice_id, { attributes: ['id', 'status'], ...(t ? { transaction: t } : {}) })
    : null;
  return { invoice, soa };
}

/**
 * 반품 한 줄 검증 — 구매자 신청·판매자 직접 반품이 같이 쓴다(복제 금지).
 * 한도 = 받은 양 − 이미 신청·승인된 반품 합.
 * @returns {{error?:{http:number, code:string, message:string}}}
 */
async function validateReturnLine(poItem, itemId, qty, t) {
  if (!poItem) return { error: { http: 400, code: 'BAD_ITEM', message: `Item ${itemId} does not belong to this PO` } };
  const received = parseFloat(poItem.quantity_received) || 0;
  if (received <= 0) {
    return { error: { http: 400, code: 'NOTHING_RECEIVED', message: 'Nothing has been received on this line yet — use Correct quantities instead' } };
  }
  const priorSum = (await PurchaseOrderReturn.sum('quantity', {
    where: { purchase_order_item_id: itemId, status: { [Op.in]: ['requested', 'approved'] } },
    transaction: t
  })) || 0;
  if (qty + priorSum > received + 1e-9) {
    return { error: { http: 400, code: 'EXCEEDS_RECEIVED',
      message: `Return qty (${qty}) + already requested/approved (${priorSum}) exceeds received (${received}) for item ${itemId}` } };
  }
  return {};
}

/** 반품 행에 적을 단가 — 대조된 줄은 실제 청구가로(외부 업체가 청구한 값으로 빼야 금액이 맞는다). */
const returnUnitPriceOf = (poItem) => (poItem.invoiced_unit_price != null ? poItem.invoiced_unit_price : poItem.unit_price);

// ============================================
// Buyer endpoints — owns the PO
// ============================================
router.use('/purchase-orders/:id/returns', authenticateToken, requireBuyerRole);

router.post('/purchase-orders/:id/returns', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Purchase order not found' }); }
    const po = await PurchaseOrder.findByPk(id, { include: [{ model: PurchaseOrderItem, as: 'items' }], transaction: t });
    if (!po) { await t.rollback(); return res.status(404).json({ success: false, message: 'Purchase order not found' }); }

    // Buyer ownership
    const buyer = req.buyerEntity;
    if (!buyer || po.entity_type !== buyer.type || parseInt(po.entity_id, 10) !== parseInt(buyer.id, 10)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }

    // 판정 하나 — 배송 뒤 · 결제 안 된 주문만 (utils/poAmend.returnMoneyBlock)
    {
      const { invoice, soa } = await loadMoneyDocs(po, null);
      const blk = returnMoneyBlock(po, invoice, soa);
      if (blk) { await t.rollback(); return res.status(blk.http).json({ success: false, code: blk.code, message: blk.message }); }
    }

    const items = req.body?.items;
    if (!Array.isArray(items) || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'items array is required' });
    }

    const itemMap = new Map();
    for (const it of po.items) itemMap.set(it.id, it);

    const reasonGlobal = sanitizeString(String(req.body?.reason || '')).slice(0, 1000);
    const created = [];

    for (const r of items) {
      const itemId = parseInt(r.purchase_order_item_id, 10);
      const qty = parseFloat(r.quantity);
      if (!Number.isFinite(itemId) || !(qty > 0)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Each return line requires purchase_order_item_id and quantity > 0' });
      }
      const poItem = itemMap.get(itemId);
      const v = await validateReturnLine(poItem, itemId, qty, t);
      if (v.error) {
        await t.rollback();
        return res.status(v.error.http).json({ success: false, code: v.error.code, message: v.error.message });
      }

      const ret = await PurchaseOrderReturn.create({
        purchase_order_id: po.id,
        purchase_order_item_id: itemId,
        // 발주 라인과 같은 모양으로: 매장/푸드코트 = ingredient_id · BG 본사 = product_ingredient_id.
        // 예전엔 ingredient_id 가 NOT NULL 이라 BG 구매자 반품이 **500** 으로 죽었다.
        ingredient_id: poItem.ingredient_id,
        product_ingredient_id: poItem.product_ingredient_id || null,
        quantity: qty,
        unit: poItem.unit,
        unit_price: returnUnitPriceOf(poItem),
        reason: r.reason ? sanitizeString(String(r.reason)).slice(0, 1000) : reasonGlobal || null,
        status: 'requested',
        initiated_by: 'buyer',
        requested_by_user_id: req.user.id
      }, { transaction: t });
      created.push(ret);
    }

    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST returns error:', err);
    res.status(500).json({ success: false, message: 'Failed to create return' });
  }
});

router.get('/purchase-orders/:id/returns', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const buyer = req.buyerEntity;
    if (!buyer || po.entity_type !== buyer.type || parseInt(po.entity_id, 10) !== parseInt(buyer.id, 10)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const list = await PurchaseOrderReturn.findAll({
      where: { purchase_order_id: po.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error('GET returns error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch returns' });
  }
});

// ============================================
// Seller endpoints — approve/reject
// ============================================
router.use('/seller-orders/:id/returns', authenticateToken, requireSellerRole);

router.get('/seller-orders/:id/returns', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Order not found' });
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Order not found' });
    // 판정은 `middleware/sellerScope.js` 단일 소스 — 여기서 복제하지 않는다.
    //   종전 복제본이 단일 id 만 비교해, 브랜드를 여럿 가진 판매자는 **목록엔 보이는데 반품은 404** 였다.
    const sellerOk = ownsPurchaseOrder(po, req);
    if (!sellerOk) return res.status(404).json({ success: false, message: 'Order not found' });

    const list = await PurchaseOrderReturn.findAll({
      where: { purchase_order_id: po.id },
      order: [['created_at', 'DESC']]
    });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error('GET seller returns error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch returns' });
  }
});

/**
 * 판매자 직접 반품 — POST /api/seller-orders/:id/returns (2026-11-17 §3-2)
 *   Irene «incoming-orders 여기에서 아이템 한개씩 또는 주문 전체 반품 처리할 수 있어야 해»
 *   body: { items: [{ purchase_order_item_id, quantity, reason? }], reason }   — reason 필수(3자 이상)
 *   넣는 즉시 승인(한 트랜잭션) — 한 줄이라도 실패하면 전부 롤백(반쯤 된 반품 없음).
 *   «주문 전체» 는 서버에 따로 없다 — 화면이 모든 줄을 반품 가능 수량으로 채워 같은 POST 를 보낸다.
 */
router.post('/seller-orders/:id/returns', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Order not found' }); }
    const po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
    if (!po || !ownsPurchaseOrder(po, req)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Order not found' }); }
    {
      const { sellerBlockError } = require('../utils/sellerVisibility');
      const blk = sellerBlockError(po);   // 숨김 404 · 오너 승인 대기 409
      if (blk) { await t.rollback(); return res.status(blk.http || 409).json({ success: false, code: blk.code, message: blk.message }); }
    }
    { // 판정은 승인 본체에서도 다시 보지만, 아무것도 만들기 전에 이유를 알려 준다
      const { invoice, soa } = await loadMoneyDocs(po, t);
      const blk = returnMoneyBlock(po, invoice, soa);
      if (blk) { await t.rollback(); return res.status(blk.http).json({ success: false, code: blk.code, message: blk.message }); }
    }

    const reason = sanitizeString(String(req.body?.reason || '').trim()).slice(0, 1000);
    if (reason.length < 3) { await t.rollback(); return res.status(400).json({ success: false, code: 'REASON_REQUIRED', message: 'Please give a reason for the return' }); }
    const items = Array.isArray(req.body?.items) ? req.body.items : [];
    if (items.length === 0) { await t.rollback(); return res.status(400).json({ success: false, message: 'items array is required' }); }

    const lines = await PurchaseOrderItem.findAll({ where: { purchase_order_id: po.id }, transaction: t });
    const itemMap = new Map(lines.map(l => [l.id, l]));
    const actor = actorOf(req);
    const done = [];
    let firstInvoice = null; let totalBefore = null; let totalAfter = null;
    const seen = new Set();
    for (const r of items) {
      const itemId = parseInt(r && r.purchase_order_item_id, 10);
      const qty = Math.round((parseFloat(r && r.quantity) || 0) * 1000) / 1000;
      if (!Number.isFinite(itemId) || !(qty > 0)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Each return line requires purchase_order_item_id and quantity > 0' });
      }
      if (seen.has(itemId)) { await t.rollback(); return res.status(400).json({ success: false, message: `Item ${itemId} is listed twice` }); }
      seen.add(itemId);
      const poItem = itemMap.get(itemId);
      const v = await validateReturnLine(poItem, itemId, qty, t);
      if (v.error) { await t.rollback(); return res.status(v.error.http).json({ success: false, code: v.error.code, message: v.error.message }); }

      const ret = await PurchaseOrderReturn.create({
        purchase_order_id: po.id,
        purchase_order_item_id: itemId,
        ingredient_id: poItem.ingredient_id,
        product_ingredient_id: poItem.product_ingredient_id || null,
        quantity: qty,
        unit: poItem.unit,
        unit_price: returnUnitPriceOf(poItem),
        reason: r.reason ? sanitizeString(String(r.reason)).slice(0, 1000) : reason,
        status: 'requested',
        initiated_by: 'seller',
        requested_by_user_id: req.user.id
      }, { transaction: t });
      const out = await approveReturnCore({ po, ret, t, actor, initiatedBy: 'seller' });
      if (out.error) { await t.rollback(); return res.status(out.error.http).json({ success: false, code: out.error.code, message: out.error.message }); }
      const d = out.deduction;
      if (d.invoice) {
        firstInvoice = d.invoice;
        if (totalBefore == null) totalBefore = d.invoiceTotalBefore;
        totalAfter = d.invoiceTotalAfter;
      }
      done.push({ ret, name: poItem.description || 'Item', qty, unit: poItem.unit, amount: d.amount, reason: ret.reason });
    }
    await t.commit();

    const invOut = firstInvoice ? { id: firstInvoice.id, invoice_number: firstInvoice.invoice_number, total_before: totalBefore, total_after: totalAfter } : null;
    const soa = await followSoaAfterReturns(firstInvoice, totalBefore, totalAfter, actor);
    emitPoEvent(req, po, 'seller-order-updated');
    notifyBuyerReturnProcessed(po, done, invOut);
    const amount = Math.round(done.reduce((s2, x) => s2 + x.amount, 0) * 100) / 100;
    const { resolvePayableAmount } = require('../services/purchaseOrderPayment');
    let payableAfter = null;
    try { payableAfter = (await resolvePayableAmount(await PurchaseOrder.findByPk(po.id))).amount; } catch (_) { /* 표시용 */ }
    res.status(201).json({
      success: true,
      data: { returns: done.map(x => x.ret), deduction: { amount, invoice: invOut, payable_after: payableAfter, soa } },
      message: 'Return processed'
    });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST seller returns error:', err);
    res.status(500).json({ success: false, message: 'Failed to process return' });
  }
});

/**
 * 반품 로드 + 판매자 소유권 확인.
 * ⚠ 트랜잭션(t)을 주면 PO·반품 행을 **잠근다**. 안 잠그면 동시 승인 2발이 둘 다
 *   status='requested' 를 읽어 **재고를 두 번 환원하고 크레딧노트를 두 장** 발행한다.
 *   PO 락은 같은 PO 의 승인들을 직렬화해 누적 합산검사의 정합 전제도 만든다.
 */
async function loadAndCheckReturn(req, t) {
  const id = parseInt(req.params.id, 10);
  const returnId = parseInt(req.params.returnId, 10);
  if (!Number.isFinite(id) || !Number.isFinite(returnId)) return { error: 'Order/Return not found', status: 404 };
  const lockOpts = t ? { lock: t.LOCK.UPDATE, transaction: t } : undefined;
  const po = await PurchaseOrder.findByPk(id, lockOpts);
  if (!po) return { error: 'Order not found', status: 404 };
  // 판정은 `middleware/sellerScope.js` 단일 소스 (위 주석 참조).
  const sellerOk = ownsPurchaseOrder(po, req);
  // 외부(솔루션 미가입) 공급업체 발주는 **구매자가 자기 반품을 닫는다** (2026-09-08).
  //   그쪽은 로그인이 없어 승인할 사람이 자체가 없다. 반품서는 왓츠앱·메일·PDF 로 밖에 보내고
  //   시스템 기록은 구매자가 닫는다 — 결제에서 이미 같은 모양을 택했다(설계 §5 "결제함 체크").
  //   ⛔ 가입 공급업체·브랜드·푸드코트는 여기 해당하지 않는다(판매자만 닫을 수 있다).
  let buyerOk = false;
  if (!sellerOk && req.buyerEntity
      && po.entity_type === req.buyerEntity.type && po.entity_id === req.buyerEntity.id
      && po.seller_type === 'supplier' && po.seller_entity_id) {
    const SupplierCompany = require('../models/SupplierCompany');
    const sc = await SupplierCompany.findByPk(po.seller_entity_id, { attributes: ['id', 'is_system_registered'] });
    buyerOk = !!sc && !sc.is_system_registered;
  }
  if (!sellerOk && !buyerOk) return { error: 'Order not found', status: 404 };
  const ret = await PurchaseOrderReturn.findByPk(returnId, lockOpts);
  if (!ret || ret.purchase_order_id !== po.id) return { error: 'Return not found', status: 404 };
  return { po, ret };
}

/**
 * 승인 본체 — 승인 라우트 두 입구와 판매자 직접 반품이 같이 부른다 (2026-11-17 §3-1).
 *   판정(returnMoneyBlock) → 합산 검사 → 재고 되돌림 → 청구서 금액 차감 → 반품 행 승인.
 *   정산서 따라가기·구매자 알림은 **커밋 뒤** 호출자가 afterReturnCommit 으로 한다.
 * 실패는 { error:{http,code,message} } 로 돌려준다(호출자가 롤백).
 */
async function approveReturnCore({ po, ret, t, actor, initiatedBy }) {
  const { invoice, soa } = await loadMoneyDocs(po, t);
  const blk = returnMoneyBlock(po, invoice, soa);
  if (blk) return { error: blk };

  const item = await PurchaseOrderItem.findByPk(ret.purchase_order_item_id, { transaction: t });
  const delta = parseFloat(ret.quantity) || 0;

  // 승인 합산 검사 — 이미 승인된 반품 + 이번 건이 입고량을 넘으면 안 된다
  const approvedSum = (await PurchaseOrderReturn.sum('quantity', {
    where: {
      purchase_order_item_id: ret.purchase_order_item_id,
      status: 'approved',
      id: { [Op.ne]: ret.id }
    },
    transaction: t
  })) || 0;
  const receivedQty = parseFloat(item?.quantity_received) || 0;
  if (approvedSum + delta > receivedQty + 1e-9) {
    return { error: { http: 400, code: 'EXCEEDS_RECEIVED',
      message: `Approved returns (${approvedSum}) + this return (${delta}) exceed received (${receivedQty})` } };
  }

  // 재고 되돌림 — services/poStockReversal 단일 소스(2026-11-07 추출 · 출고 뒤 수량 정정과 같은 함수).
  //   구매자 재고 −q×환산(입고의 역방향, 라인 모양으로 분기 · 실제 이동량만 장부에) →
  //   판매자 재고 +q(출고의 역방향 — 각 판매자가 **자기 재고**를 되돌린다. 구매자 재료 행을 올리면 net 0, 2026-07-13 사고).
  const buyerRev = await reverseBuyerStock({
    po, item, qty: delta, unitPrice: ret.unit_price, t, userId: actor.id || null,
    note: `Return #${ret.id} approved — buyer stock reversal`,
    ingredientId: ret.ingredient_id || null,
    productIngredientId: ret.product_ingredient_id || item?.product_ingredient_id || null,
    unit: ret.unit,
  });
  if (buyerRev && buyerRev.moved < buyerRev.requested) {
    console.warn(`[po-returns] Return #${ret.id}: 반품 ${buyerRev.requested} 요청이나 재고 ${buyerRev.before} 뿐 — ${buyerRev.moved} 만 차감(클램프)`);
  }
  await restoreSellerStock({
    po, item, qty: delta, t, userId: actor.id || null, note: `Return #${ret.id} approved`,
  });

  // 금액 차감 — 청구서 음수 요금 줄 + 발주 returned_amount (services/poReturnDeduction).
  //   예전 Credit Note 는 아무도 읽지 않아 청구가 그대로였다(PO-R5-20260605-001 RM 95 실례) → 더 만들지 않는다.
  const ded = await applyReturnDeduction({ po, ret, item, invoice, t, actor, initiatedBy: initiatedBy || ret.initiated_by || 'buyer' });

  await ret.update({
    status: 'approved',
    approved_by_user_id: actor.id,
    resolved_at: new Date(),
    deducted_invoice_id: ded.invoice ? ded.invoice.id : null,
    deducted_amount: ded.amount
  }, { transaction: t });

  return { ret, item, deduction: ded };
}

/** 커밋 뒤 — 정산서 합계 따라가기(자기 트랜잭션). 결과 요약을 돌려준다. */
async function followSoaAfterReturns(invoice, totalBefore, totalAfter, actor) {
  if (!invoice || !invoice.parent_soa_invoice_id || totalBefore == null || Math.abs(totalAfter - totalBefore) <= 0.005) return null;
  try {
    const { followChildToSoa } = require('../services/externalSoa');
    const r = await followChildToSoa(invoice, { prevChildTotal: totalBefore, actorId: actor.id || null, actorName: actor.name || null });
    return r && r.soa_locked ? { soa_locked: true, soa_id: r.soa_id } : (r && r.followed ? { soa_id: r.soa_id, total: r.total } : null);
  } catch (e) {
    console.error('[po-returns] SOA follow failed:', e.message);
    return { error: e.message };
  }
}

/** 커밋 뒤 — 구매자 메일 1통(실패해도 반품은 유효). 판매자 직접 반품·승인 공용. */
function notifyBuyerReturnProcessed(po, rows, invOut) {
  setImmediate(async () => {
    try {
      const { buyerNotify } = require('./seller-orders');
      const { currencySymbol } = require('../utils/currency');
      const sym = currencySymbol(po.currency);
      const money = (n) => `${sym} ${(parseFloat(n) || 0).toFixed(2)}`;
      const esc = (x) => String(x == null ? '' : x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      const lines = rows.map(r => `<tr><td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;">${esc(r.name)}</td>`
        + `<td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;text-align:right;">${esc(r.qty)} ${esc(r.unit || '')}</td>`
        + `<td style="padding:6px 8px;border-bottom:1px solid #E5E7EB;text-align:right;">−${money(r.amount)}</td></tr>`).join('');
      const reason = rows.map(r => r.reason).filter(Boolean)[0] || '';
      const sellerName = await buyerNotify.sellerNameOf(po);
      const html = buyerNotify.buyerMail(
        'Return Processed',
        (link) => `<p style="color:#374151;font-size:16px;margin:0 0 16px;">A return on your purchase order <strong>${esc(po.po_number)}</strong> has been processed.</p>
         <table style="width:100%;border-collapse:collapse;font-size:14px;color:#374151;margin:0 0 16px;">${lines}</table>
         ${invOut ? `<p style="color:#374151;font-size:14px;margin:0 0 12px;">Invoice <strong>${esc(invOut.invoice_number)}</strong>: <span style="color:#9CA3AF;">${money(invOut.total_before)}</span> → <strong>${money(invOut.total_after)}</strong></p>` : ''}
         ${reason ? `<div style="background:#F9FAFB;border-left:4px solid #635BFF;padding:16px;margin:12px 0 24px;border-radius:0 8px 8px 0;"><p style="color:#4B5563;font-size:13px;font-weight:600;margin:0 0 6px;">Reason</p><p style="color:#374151;font-size:14px;margin:0;">${esc(reason).slice(0, 600)}</p></div>` : ''}
         <div style="text-align:center;margin:24px 0;"><a href="${link}" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">View Order</a></div>`
      );
      await buyerNotify.fireBuyerNotification(po, 'seller_order_received', {
        subject: `Return processed: ${po.po_number}${sellerName ? ` · by ${sellerName}` : ''}`,
        action: { state: 'info', key: 'review_changes' },
        html,
        text: `A return on your purchase order ${po.po_number} has been processed.${invOut ? ` Invoice ${invOut.invoice_number}: ${invOut.total_before} -> ${invOut.total_after}.` : ''}`
      });
    } catch (e) {
      console.error('[po-returns] buyer notification error:', e.message);
    }
  });
}

const actorOf = (req) => ({ id: req.user?.id || null, name: req.user?.full_name || req.user?.username || null });

async function approveReturnHandler(req, res) {
  const t = await database.sequelize.transaction();
  try {
    const { error, status, po, ret } = await loadAndCheckReturn(req, t);   // 행 잠금 — 이중 승인 방지
    if (error) { await t.rollback(); return res.status(status).json({ success: false, message: error }); }
    if (ret.status !== 'requested') {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Return cannot be approved in status '${ret.status}'` });
    }
    const actor = actorOf(req);
    const out = await approveReturnCore({ po, ret, t, actor });
    if (out.error) {
      await t.rollback();
      return res.status(out.error.http).json({ success: false, code: out.error.code, message: out.error.message });
    }
    await t.commit();

    const d = out.deduction;
    const invOut = d.invoice ? { id: d.invoice.id, invoice_number: d.invoice.invoice_number, total_before: d.invoiceTotalBefore, total_after: d.invoiceTotalAfter } : null;
    const soa = await followSoaAfterReturns(d.invoice, d.invoiceTotalBefore, d.invoiceTotalAfter, actor);
    emitPoEvent(req, po, 'seller-order-updated');
    if (ret.initiated_by !== 'seller') {
      notifyBuyerReturnProcessed(po, [{ name: out.item?.description || 'Item', qty: parseFloat(ret.quantity), unit: ret.unit, amount: d.amount, reason: ret.reason }], invOut);
    }
    const { resolvePayableAmount } = require('../services/purchaseOrderPayment');
    let payableAfter = null;
    try { payableAfter = (await resolvePayableAmount(await PurchaseOrder.findByPk(po.id))).amount; } catch (_) { /* 표시용 */ }
    res.json({
      success: true,
      data: { return: ret, deduction: { amount: d.amount, invoice: invOut, payable_after: payableAfter, soa } },
      message: 'Return approved'
    });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST approve return error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve return' });
  }
}

async function rejectReturnHandler(req, res) {
  // 승인과 같은 트랜잭션·락 — 안 그러면 approve ↔ reject 레이스로
  // "재고는 환원됐는데 상태는 rejected" 가 만들어진다.
  const t = await database.sequelize.transaction();
  try {
    const { error, status, po, ret } = await loadAndCheckReturn(req, t);
    if (error) { await t.rollback(); return res.status(status).json({ success: false, message: error }); }
    if (ret.status !== 'requested') {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Return cannot be rejected in status '${ret.status}'` });
    }
    const reason = sanitizeString(String(req.body?.reason || '').trim()).slice(0, 1000);
    if (!reason) { await t.rollback(); return res.status(400).json({ success: false, message: 'reason is required' }); }

    await ret.update({
      status: 'rejected',
      rejected_by_user_id: req.user.id,
      resolved_at: new Date(),
      rejection_reason: reason
    }, { transaction: t });
    await t.commit();

    emitPoEvent(req, po, 'seller-order-updated');
    res.json({ success: true, data: ret, message: 'Return rejected' });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST reject return error:', err);
    res.status(500).json({ success: false, message: 'Failed to reject return' });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 승인/거절은 **판매자와 구매자 두 입구**에 같은 함수를 건다 (2026-09-08).
//
// 왜: 외부(솔루션 미가입) 공급업체는 로그인이 없어 아무도 승인 버튼을 못 누른다.
//   운영 실측 — 외부 공급업체 반품 1건이 `requested` 로 멈춰 있었고, 그동안 **구매자 재고가
//   되돌아가지 않아 실제보다 많게** 남아 있었다. 반품 버튼이 뜨는 외부 발주는 15건이다.
//   Irene 지시(2026-09-08): "외부공급업체는 발주처럼 왓츠앱 메일, pdf 로 보내게 해줘야지."
//   → 반품서를 밖으로 보내고(아래 send/mark-sent), 시스템 안에서는 **구매자가 닫는다.**
// ⛔ 가입 공급업체·브랜드·푸드코트 발주에서는 구매자 입구가 열리지 않는다
//   (loadAndCheckReturn 이 외부 판매자일 때만 구매자를 통과시킨다).
// ─────────────────────────────────────────────────────────────────────────────
// 반품서를 **외부 공급업체에 보낸다** — 발주와 같은 3경로 (2026-09-08)
//   메일: 여기서 보낸다(왓츠앱·PDF 는 화면이 열고, 보냈다는 사실만 아래 mark-sent 로 남긴다)
//   ⛔ 자동 발송이 아니라 구매자가 누르는 명시 액션이다. 언어는 'en' 고정 —
//     계정이 없어 수신자 언어 축이 존재하지 않는다(없는 축을 만들지 않는다).
// ─────────────────────────────────────────────────────────────────────────────

/** 이 발주의 판매자가 외부(솔루션 미가입) 공급업체인가 + 구매자 소유인가. */
async function loadExternalReturnForBuyer(req) {
  const id = parseInt(req.params.id, 10);
  const returnId = parseInt(req.params.returnId, 10);
  if (!Number.isFinite(id) || !Number.isFinite(returnId)) return { error: 'Not found', status: 404 };
  const po = await PurchaseOrder.findByPk(id);
  if (!po) return { error: 'Not found', status: 404 };
  if (!req.buyerEntity || po.entity_type !== req.buyerEntity.type || po.entity_id !== req.buyerEntity.id) {
    return { error: 'Not found', status: 404 };
  }
  if (po.seller_type !== 'supplier' || !po.seller_entity_id) {
    return { error: 'External send is only for supplier orders', status: 400 };
  }
  const SupplierCompany = require('../models/SupplierCompany');
  const sc = await SupplierCompany.findByPk(po.seller_entity_id);
  if (!sc) return { error: 'Supplier not found', status: 404 };
  if (sc.is_system_registered) {
    return { error: '가입 공급업체는 시스템 안에서 반품을 확인합니다', status: 400 };
  }
  const ret = await PurchaseOrderReturn.findByPk(returnId);
  if (!ret || ret.purchase_order_id !== po.id) return { error: 'Return not found', status: 404 };
  return { po, ret, sc };
}

/** 반품 라인을 메일 품목표 모양으로. 발주 메일과 같은 표를 쓴다. */
async function returnEmailItems(po, ret) {
  const item = await PurchaseOrderItem.findByPk(ret.purchase_order_item_id);
  let name = item?.description || 'Item';
  try {
    const { attachSellerProductIdentity } = require('../utils/sellerProductIdentity');
    const plain = [item ? item.toJSON() : {}];
    await attachSellerProductIdentity({ items: plain });
    if (plain[0]?.seller_product_name) name = plain[0].seller_product_name;
  } catch (_) { /* 내부명 폴백 */ }
  const qty = parseFloat(ret.quantity) || 0;
  const price = parseFloat(ret.unit_price ?? item?.unit_price ?? 0) || 0;
  return [{
    name, unit: ret.unit || item?.unit || null,
    quantity_ordered: qty, unit_price: price,
    line_total: Math.round(qty * price * 100) / 100
  }];
}

router.post('/purchase-orders/:id/returns/:returnId/send-external-email', async (req, res) => {
  try {
    const loaded = await loadExternalReturnForBuyer(req);
    if (loaded.error) return res.status(loaded.status).json({ success: false, message: loaded.error });
    const { po, ret, sc } = loaded;
    if (!sc.email) return res.status(400).json({ success: false, message: 'Supplier has no email address on file' });

    let buyerName = 'A buyer';
    try {
      const { resolveBuyerName } = require('../services/poNotifications');
      if (typeof resolveBuyerName === 'function') buyerName = await resolveBuyerName(po);
    } catch (_) { /* keep default */ }

    const items = await returnEmailItems(po, ret);
    const { returnExternalSendEmail } = require('../utils/notificationTemplates');
    const mail = returnExternalSendEmail({
      buyerName, poNumber: po.po_number,
      total: items[0].line_total, currency: po.currency || 'MYR', items
    }, 'en');

    const { sendPlatformEmail } = require('../utils/emailService');
    const result = await sendPlatformEmail({ to: sc.email, subject: mail.subject, html: mail.html, text: mail.text });

    // 가드에 걸려 안 나갔으면 그대로 알린다 — "보냈다" 고 거짓말하지 않는다.
    if (result && result.skipped) {
      return res.json({ success: true, data: { sent: false, reason: result.reason }, message: 'Email not sent (blocked by guard)' });
    }
    await ret.update({
      sent_to_seller_at: new Date(), sent_channel: 'email', sent_by_user_id: req.user?.id || null
    });
    res.json({ success: true, data: { sent: true, to: sc.email, return: ret } });
  } catch (err) {
    console.error('send return external email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send return email' });
  }
});

/** 왓츠앱·PDF 처럼 **화면이 보낸** 경우 사실만 기록한다. */
router.post('/purchase-orders/:id/returns/:returnId/mark-sent-external', async (req, res) => {
  try {
    const loaded = await loadExternalReturnForBuyer(req);
    if (loaded.error) return res.status(loaded.status).json({ success: false, message: loaded.error });
    const { ret } = loaded;
    const allowed = ['whatsapp', 'pdf', 'manual', 'email', 'share'];   // share = 카톡·다른 앱(2026-10-30)
    const channel = allowed.includes(String(req.body?.channel)) ? String(req.body.channel) : 'manual';
    await ret.update({
      sent_to_seller_at: new Date(), sent_channel: channel, sent_by_user_id: req.user?.id || null
    });
    res.json({ success: true, data: ret });
  } catch (err) {
    console.error('mark return sent error:', err);
    res.status(500).json({ success: false, message: 'Failed to record' });
  }
});

router.post('/seller-orders/:id/returns/:returnId/approve', approveReturnHandler);
router.post('/seller-orders/:id/returns/:returnId/reject', rejectReturnHandler);
router.post('/purchase-orders/:id/returns/:returnId/approve', approveReturnHandler);
router.post('/purchase-orders/:id/returns/:returnId/reject', rejectReturnHandler);

module.exports = router;
