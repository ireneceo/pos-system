/**
 * Purchase Order Refunds — 결제된 주문의 반품 환불 (2026-11-23)
 *   설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §4-3
 *   Irene «고객이 돌려보내거나 환불요청 하는 거 기능 정확히 하고 서로 승인하고 대응하게»
 *
 *   결제된 주문의 반품 승인 → 환불할 금액(pending) 생김(services/poRefund.addToPending, po-returns 승인 본체에서)
 *   GET  /api/seller-orders/:id/refunds                       — 판매자 목록
 *   GET  /api/purchase-orders/:id/refunds                     — 구매자 목록
 *   POST /api/seller-orders/:id/refunds/:rid/sent             — 판매자 «환불 보냄» pending → sent
 *   POST /api/purchase-orders/:id/refunds/:rid/confirm        — 구매자 «받았음» sent → confirmed (외부 업체: pending 에서 바로)
 *   POST /api/purchase-orders/:id/refunds/:rid/dispute        — 구매자 «못 받았음» sent → pending
 *   돈은 시스템 밖에서 오간다(이체·현금) — 시스템은 사실만 적는다. 발주·환불 행 잠금(이중 클릭·동시 2발 방지). 소유권 실패 404.
 */
const express = require('express');
const router = express.Router();
const database = require('../config/database');
const { PurchaseOrder, PurchaseOrderRefund, PurchaseOrderReturn } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { requireSellerRole, ownsPurchaseOrder } = require('../middleware/sellerScope');
const { sanitizeString } = require('../middleware/validation');
const { emitPoEvent } = require('../services/poRealtimeService');
const poRefund = require('../services/poRefund');

const actorOf = (req) => ({ id: req.user?.id || null, name: req.user?.full_name || req.user?.username || null });
const ownsAsBuyer = (po, req) => !!(req.buyerEntity && po.entity_type === req.buyerEntity.type
  && parseInt(po.entity_id, 10) === parseInt(req.buyerEntity.id, 10));

/** 판매자가 외부(솔루션 미가입) 공급업체인가 — 그쪽은 로그인이 없어 구매자가 스스로 닫는다. */
async function isExternalSellerOf(po) {
  if (po.seller_type !== 'supplier' || !po.seller_entity_id) return false;
  const SupplierCompany = require('../models/SupplierCompany');
  const sc = await SupplierCompany.findByPk(po.seller_entity_id, { attributes: ['id', 'is_system_registered'] });
  return !!sc && !sc.is_system_registered;
}

async function listFor(po) {
  const rows = await PurchaseOrderRefund.findAll({ where: { purchase_order_id: po.id }, order: [['id', 'DESC']] });
  const rets = await PurchaseOrderReturn.findAll({
    where: { purchase_order_id: po.id, refund_id: rows.map(r => r.id) },
    attributes: ['id', 'refund_id', 'purchase_order_item_id', 'quantity', 'unit', 'unit_price']
  });
  return rows.map(r => {
    const o = r.toJSON();
    o.returns = rets.filter(x => x.refund_id === r.id).map(x => x.toJSON());
    return o;
  });
}

/** 잠가서 읽기 — 발주 → 환불 행. 소유권 판정은 호출자가 넘긴다. */
async function loadLocked(req, t, owns) {
  const id = parseInt(req.params.id, 10);
  const rid = parseInt(req.params.rid, 10);
  if (!Number.isFinite(id) || !Number.isFinite(rid)) return null;
  const po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
  if (!po || !(await owns(po))) return null;
  const refund = await PurchaseOrderRefund.findByPk(rid, { lock: t.LOCK.UPDATE, transaction: t });
  if (!refund || refund.purchase_order_id !== po.id) return null;
  return { po, refund };
}

function sendErr(res, err, what) {
  if (err && err.http) return res.status(err.http).json({ success: false, code: err.code, message: err.message });
  console.error(`[po-refunds] ${what} error:`, err);
  return res.status(500).json({ success: false, message: `Failed to ${what}` });
}

// ============================================
// Seller
// ============================================
router.use('/seller-orders/:id/refunds', authenticateToken, requireSellerRole);

router.get('/seller-orders/:id/refunds', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const po = Number.isFinite(id) ? await PurchaseOrder.findByPk(id) : null;
    if (!po || !ownsPurchaseOrder(po, req)) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: await listFor(po) });
  } catch (err) { sendErr(res, err, 'fetch refunds'); }
});

router.post('/seller-orders/:id/refunds/:rid/sent', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const got = await loadLocked(req, t, async (po) => ownsPurchaseOrder(po, req));
    if (!got) { await t.rollback(); return res.status(404).json({ success: false, message: 'Refund not found' }); }
    const { po, refund } = got;
    const method = String(req.body?.method || '');
    const reference = req.body?.reference ? sanitizeString(String(req.body.reference)).slice(0, 100) : null;
    const note = req.body?.note ? sanitizeString(String(req.body.note)).slice(0, 1000) : null;
    await poRefund.markSent({ po, refund, method, reference, note, t, actor: actorOf(req) });
    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    notifyBuyerRefundSent(po, refund);
    res.json({ success: true, data: refund, message: 'Refund marked as sent' });
  } catch (err) {
    if (!t.finished) await t.rollback();
    sendErr(res, err, 'mark refund sent');
  }
});

/** 커밋 뒤 — 구매자 메일 «Refund sent»(실패해도 기록은 유효). */
function notifyBuyerRefundSent(po, refund) {
  setImmediate(async () => {
    try {
      const { buyerNotify } = require('./seller-orders');
      const { currencySymbol } = require('../utils/currency');
      const esc = (x) => String(x == null ? '' : x).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      const money = `${currencySymbol(po.currency)} ${(parseFloat(refund.amount) || 0).toFixed(2)}`;
      const method = { bank_transfer: 'bank transfer', cash: 'cash', other: 'other' }[refund.method] || refund.method;
      const sellerName = await buyerNotify.sellerNameOf(po);
      const html = buyerNotify.buyerMail(
        'Refund Sent',
        (link) => `<p style="color:#374151;font-size:16px;margin:0 0 16px;">The seller sent a refund of <strong>${money}</strong> for your purchase order <strong>${esc(po.po_number)}</strong> by ${esc(method)}${refund.reference ? ` (ref ${esc(refund.reference)})` : ''}.</p>
         <p style="color:#374151;font-size:14px;margin:0 0 12px;">Open the order and confirm once you have received it — or tell the seller if it has not arrived.</p>
         ${refund.note ? `<div style="background:#F9FAFB;border-left:4px solid #635BFF;padding:16px;margin:12px 0 24px;border-radius:0 8px 8px 0;"><p style="color:#374151;font-size:14px;margin:0;">${esc(refund.note).slice(0, 600)}</p></div>` : ''}
         <div style="text-align:center;margin:24px 0;"><a href="${link}" style="display:inline-block;background:#635BFF;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">View Order</a></div>`
      );
      await buyerNotify.fireBuyerNotification(po, 'seller_order_received', {
        subject: `Refund sent: ${po.po_number} · ${money}${sellerName ? ` · by ${sellerName}` : ''}`,
        action: { state: 'action', key: 'review_changes' },
        html,
        text: `The seller sent a refund of ${money} for purchase order ${po.po_number}. Please confirm once received.`
      });
    } catch (e) {
      console.error('[po-refunds] buyer notification error:', e.message);
    }
  });
}

// ============================================
// Buyer
// ============================================
router.use('/purchase-orders/:id/refunds', authenticateToken, requireBuyerRole);

router.get('/purchase-orders/:id/refunds', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const po = Number.isFinite(id) ? await PurchaseOrder.findByPk(id) : null;
    if (!po || !ownsAsBuyer(po, req)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const data = await listFor(po);
    res.json({ success: true, data, external_seller: await isExternalSellerOf(po) });
  } catch (err) { sendErr(res, err, 'fetch refunds'); }
});

router.post('/purchase-orders/:id/refunds/:rid/confirm', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const got = await loadLocked(req, t, async (po) => ownsAsBuyer(po, req));
    if (!got) { await t.rollback(); return res.status(404).json({ success: false, message: 'Refund not found' }); }
    const { po, refund } = got;
    const isExternal = await isExternalSellerOf(po);
    const out = await poRefund.confirmReceived({
      po, refund, receivedMethod: String(req.body?.received_method || ''), isExternal, t, actor: actorOf(req)
    });
    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    if (!isExternal) {
      setImmediate(() => {
        require('../services/poNotifications').fireSellerReturnRefundNotification(po, { kind: 'refund_confirmed', amount: refund.amount })
          .catch(e => console.error('[po-refunds] seller notify error:', e.message));
      });
    }
    res.json({
      success: true, data: refund, message: 'Refund confirmed',
      ...(out.movement ? { cash_movement_id: out.movement.id, drawer_amount: out.drawerAmount } : {}),
      ...(out.drawerSkipped ? { drawerSkipped: true } : {})
    });
  } catch (err) {
    if (!t.finished) await t.rollback();
    if (err && err.code === 'MULTIPLE_OPEN_SHIFTS') return res.status(400).json({ success: false, code: err.code, message: err.message });
    sendErr(res, err, 'confirm refund');
  }
});

router.post('/purchase-orders/:id/refunds/:rid/dispute', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const got = await loadLocked(req, t, async (po) => ownsAsBuyer(po, req));
    if (!got) { await t.rollback(); return res.status(404).json({ success: false, message: 'Refund not found' }); }
    const { po, refund } = got;
    const note = sanitizeString(String(req.body?.note || '').trim()).slice(0, 1000);
    if (note.length < 3) { await t.rollback(); return res.status(400).json({ success: false, code: 'NOTE_REQUIRED', message: 'Please say what happened' }); }
    await poRefund.dispute({ po, refund, note, t, actor: actorOf(req) });
    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    setImmediate(() => {
      require('../services/poNotifications').fireSellerReturnRefundNotification(po, { kind: 'refund_disputed', amount: refund.amount, note })
        .catch(e => console.error('[po-refunds] seller notify error:', e.message));
    });
    res.json({ success: true, data: refund, message: 'Seller notified that the refund has not arrived' });
  } catch (err) {
    if (!t.finished) await t.rollback();
    sendErr(res, err, 'dispute refund');
  }
});

module.exports = router;
