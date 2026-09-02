/**
 * Purchase Orders — Sprint 3 (Supply Chain Design 3)
 *
 * Buyer-facing PO endpoints. Buyer is one of:
 *   - Restaurant (Restaurant Admin / Owner / Staff)
 *   - Brand (Brand General / Manager)
 *   - Foodcourt (Foodcourt General / Manager)
 *
 * Sprint 3 simplifications (will be relaxed in Sprint 4):
 *   - submit transitions draft → confirmed (no separate supplier-confirm step)
 *   - mark-shipped is buyer self-action
 *   - cancel only allowed on draft
 *
 * 9 endpoints — all require: authenticateToken + requireBuyerRole
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const database = require('../config/database');
const {
  PurchaseOrder,
  PurchaseOrderItem,
  PurchaseOrderReturn,
  IngredientSellerProduct,
  Ingredient,
  ProductIngredient,
  SupplierContract,
  SupplierCompany,
  StockAlert,
  Restaurant,
} = require('../models');
// 재고 반영은 services/purchaseOrderReceive 로 갔다 — 이 파일은 stockFor(표시용 현재고 조회)만 쓴다
const { stockFor } = require('../utils/brandStockAccess');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');
const { appendTrackingEvent, emitPoEvent } = require('../services/poRealtimeService');
const { isApprovalRequiredForRestaurant, applySubmitGate } = require('../utils/poOwnerApproval');
const { fireSellerSubmittedNotification, fireOwnerApprovalPendingNotification, fireBuyerConfirmNotification, fireBuyerReceivedNotification } = require('../services/poNotifications');
// 수령 시 재고 반영 단일 소스 — /receive 와 mark-received 가 같은 함수를 쓴다(P4-2, 복제 금지)
const { applyReceipt, markAllReceived } = require('../services/purchaseOrderReceive');
// 결제·되돌리기 단일 소스 (P4-3) — 발주 행 기록 + 현금이면 드로어 이동. 마감 공식은 자동으로 잡는다.
const { recordPayment, reversePayment } = require('../services/purchaseOrderPayment');

// Path-level guards so unrelated /api/* fall-throughs aren't blocked by buyer-role.
router.use('/purchase-orders', authenticateToken, requireBuyerRole);

// ============================================
// Helpers
// ============================================

const VALID_SELLER_TYPES = ['system_admin', 'brand', 'foodcourt', 'supplier'];

// 입고 가능한 상태 — mark-received(전량 lite)와 receive(splits 정식)가 같은 집합을 쓴다.
// 판매자가 shipped/delivered 를 눌러주지 않는 매장이 많아(운영 PO 전건이 submitted 에 머묾)
// 구매자가 물건을 받았으면 그 시점 상태와 무관하게 입고할 수 있어야 한다.
// draft·pending_approval 은 계속 막는다 — 승인 우회 방지(2026-07-13 판정).
// 화면도 같은 목록을 봐야 해서 공용 상수로 뺐다(P4-5) — 복사본을 두면 상태가 늘 때 갈라진다.
const { RECEIVABLE_STATUSES } = require('../utils/poStatuses');

// 레시피 없는 프로덕트로의 입고(2026-09-01)·BG 재고아이템·재료 입고는 전부
// services/purchaseOrderReceive.js 로 옮겼다(P4-2). /receive 와 mark-received 가 같은 구현을 쓴다 —
// 예전에는 두 벌이라 한쪽만 고치면 조용히 갈라졌다(P1 에서 게이트를 두 곳 따로 지워야 했다).

const ENTITY_TYPE_PREFIX = {
  restaurant: 'R',
  brand: 'B',
  foodcourt: 'F'
};

function buyerScopeRequired(req, res) {
  if (!req.buyerEntity) {
    res.status(400).json({
      success: false,
      message: 'entity_type & entity_id query params required for System Admin'
    });
    return false;
  }
  return true;
}

function checkPOOwnership(po, req) {
  if (req.buyerIsAdmin && !req.buyerEntity) return true; // SA without override
  if (!req.buyerEntity) return false;
  return po.entity_type === req.buyerEntity.type && po.entity_id === req.buyerEntity.id;
}

/** Verify ingredient is owned by the buyer entity. */
async function ingredientBelongsToBuyer(ingredientId, buyerEntity) {
  const ing = await Ingredient.findByPk(ingredientId);
  if (!ing) return null;
  if (!buyerEntity) return ing; // SA without override: allow
  if (buyerEntity.type === 'restaurant') {
    if (parseInt(ing.restaurant_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'brand') {
    if (parseInt(ing.brand_id, 10) === buyerEntity.id) return ing;
  } else if (buyerEntity.type === 'foodcourt') {
    // Phase 2 (2026-04-29): foodcourt 도 ingredient 소유 (owner_type='foodcourt')
    if (parseInt(ing.foodcourt_id, 10) === buyerEntity.id) return ing;
  }
  return null;
}

/**
 * Verify the buyer can purchase from this seller (Phase 2 — 2026-04-27).
 *
 *  supplier      → SupplierContract status='active' required
 *  brand   (BG)  → Restaurant.brand_id === seller_id (소속 자체가 계약)
 *  foodcourt(FG) → Restaurant.foodcourt_id === seller_id (입점 자체가 계약)
 *  system_admin  → 항상 허용 (POS 자체 카탈로그)
 *
 * Returns { allowed: boolean, contractId: number|null, reason?: string }.
 */
async function verifySellerRelation(sellerType, sellerEntityId, buyerEntity) {
  if (!buyerEntity) return { allowed: false, contractId: null, reason: 'NO_BUYER_SCOPE' };

  if (sellerType === 'system_admin') {
    return { allowed: true, contractId: null };
  }

  const sellerId = parseInt(sellerEntityId, 10);
  if (!Number.isFinite(sellerId)) {
    return { allowed: false, contractId: null, reason: 'INVALID_SELLER' };
  }

  if (sellerType === 'supplier') {
    const contract = await SupplierContract.findOne({
      where: {
        supplier_company_id: sellerId,
        entity_type: buyerEntity.type,
        entity_id: buyerEntity.id,
        status: 'active'
      }
    });
    if (!contract) return { allowed: false, contractId: null, reason: 'NO_ACTIVE_CONTRACT' };
    return { allowed: true, contractId: contract.id };
  }

  // brand / foodcourt sellers: only Restaurant buyers can purchase from them.
  if (buyerEntity.type !== 'restaurant') {
    return { allowed: false, contractId: null, reason: 'BG_FG_RESTAURANT_ONLY' };
  }

  const restaurant = await Restaurant.findByPk(buyerEntity.id);
  if (!restaurant) return { allowed: false, contractId: null, reason: 'RESTAURANT_NOT_FOUND' };

  if (sellerType === 'brand') {
    if (parseInt(restaurant.brand_id, 10) !== sellerId) {
      return { allowed: false, contractId: null, reason: 'NOT_OWN_BRAND' };
    }
    return { allowed: true, contractId: null };
  }

  if (sellerType === 'foodcourt') {
    if (parseInt(restaurant.foodcourt_id, 10) !== sellerId) {
      return { allowed: false, contractId: null, reason: 'NOT_OWN_FOODCOURT' };
    }
    return { allowed: true, contractId: null };
  }

  return { allowed: false, contractId: null, reason: 'INVALID_SELLER_TYPE' };
}

/** Generate the next PO number for this buyer entity.
 *  Uses MAX(seq) of existing po_numbers (paranoid:false to include soft-deleted)
 *  so hard-deleted gaps don't cause duplicate-key collisions.
 *  offset: in-transaction sequence offset (bulk creates use 0, 1, 2, ...).
 */
async function generatePoNumber(buyerEntity, offset = 0) {
  const prefix = ENTITY_TYPE_PREFIX[buyerEntity.type] || 'X';
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  const baseNumber = `PO-${prefix}${buyerEntity.id}-${dateStr}`;
  // Use raw SQL to inspect raw + soft-deleted po_numbers (paranoid:false).
  const { sequelize } = require('../config/database');
  const [rows] = await sequelize.query(
    `SELECT po_number FROM purchase_orders
     WHERE po_number LIKE :pat
     ORDER BY po_number DESC
     LIMIT 1`,
    { replacements: { pat: `${baseNumber}-%` } }
  );
  let nextSeq = 1;
  if (rows && rows[0] && rows[0].po_number) {
    const match = String(rows[0].po_number).match(/-(\d+)$/);
    if (match) nextSeq = parseInt(match[1], 10) + 1;
  }
  const seq = String(nextSeq + offset).padStart(3, '0');
  return `${baseNumber}-${seq}`;
}

/** Recompute totals from the items array. */
function computeTotals(items) {
  let subtotal = 0;
  for (const it of items) {
    const qty = parseFloat(it.quantity_ordered) || 0;
    const price = parseFloat(it.unit_price) || 0;
    const line = Math.round(qty * price * 100) / 100;
    subtotal += line;
  }
  subtotal = Math.round(subtotal * 100) / 100;
  return { subtotal, total_amount: subtotal, tax_amount: 0 };
}

// ============================================
// 1. GET /api/purchase-orders
// ============================================
// PO workflow: pdf + mark-sent-external/upload-invoice/mark-received/submit/mark-shipped/receive/discrepancy/cancel
// split from purchase-orders.js (2026-05-03)

router.get('/purchase-orders/:id/pdf', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });
    const po = await PurchaseOrder.findByPk(id, { include: [{ model: PurchaseOrderItem, as: 'items' }] });
    if (!po) return res.status(404).json({ success: false, message: 'Not found' });
    if (!checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });

    // Seller 정보 — supplier/brand/foodcourt 공통 해석기(utils/sellerNames).
    // 예전엔 supplier 만 조회해서 브랜드 발주서의 공급업체 칸이 비었다.
    const { resolveSellers, getSeller } = require('../utils/sellerNames');
    const sellerMap = await resolveSellers([po]);
    const seller = getSeller(sellerMap, po.seller_type, po.seller_entity_id);

    // Buyer 정보 — 구매자는 restaurant / brand / foodcourt 3종.
    // (2026-07-12: 존재하지 않는 `po.buyer_entity_type` 을 보고 있어 조건이 항상 거짓 →
    //  공급업체에게 나가는 발주서의 구매자 이름·주소가 늘 비어 있었다. 실제 컬럼은 entity_type/entity_id.)
    let buyerName = '';
    let buyerAddress = '';
    const buyerModels = {
      restaurant: require('../models/Restaurant'),
      brand: require('../models/Brand'),
      foodcourt: require('../models/Foodcourt')
    };
    const BuyerModel = buyerModels[po.entity_type];
    if (BuyerModel && po.entity_id) {
      const b = await BuyerModel.findByPk(po.entity_id).catch(() => null);
      if (b) { buyerName = b.name || ''; buyerAddress = b.address || ''; }
    }

    // Internal item names (RA Ingredient + BG ProductIngredient) and — for the
    // supplier-facing document — the supplier's OWN sale-product name + SKU so the
    // supplier can find it in their warehouse. Design P0-3.
    const { ProductIngredient, IngredientSellerProduct, SupplierProduct } = require('../models');
    const ingIds = [...new Set((po.items || []).map(i => i.ingredient_id).filter(Boolean))];
    const pIngIds = [...new Set((po.items || []).map(i => i.product_ingredient_id).filter(Boolean))];
    const ispIds = [...new Set((po.items || []).map(i => i.ingredient_seller_product_id).filter(Boolean))];
    const [ings, pIngs, isps] = await Promise.all([
      ingIds.length ? Ingredient.findAll({ where: { id: { [Op.in]: ingIds } }, attributes: ['id', 'name', 'unit'] }) : [],
      pIngIds.length ? ProductIngredient.findAll({ where: { id: { [Op.in]: pIngIds } }, attributes: ['id', 'name', 'unit'] }) : [],
      ispIds.length ? IngredientSellerProduct.findAll({ where: { id: { [Op.in]: ispIds } }, attributes: ['id', 'seller_type', 'seller_product_id'] }) : []
    ]);
    const ingMap = Object.fromEntries(ings.map(i => [i.id, i]));
    const pIngMap = Object.fromEntries(pIngs.map(i => [i.id, i]));
    const spIds = [...new Set(isps.filter(m => m.seller_type === 'supplier' && m.seller_product_id).map(m => m.seller_product_id))];
    const spMap = spIds.length ? Object.fromEntries((await SupplierProduct.findAll({ where: { id: { [Op.in]: spIds } }, attributes: ['id', 'name', 'sku'], paranoid: false })).map(s => [s.id, s])) : {};
    const ispMap = Object.fromEntries(isps.map(m => {
      const sp = m.seller_type === 'supplier' ? spMap[m.seller_product_id] : null;
      return [m.id, sp ? { name: sp.name, sku: sp.sku } : null];
    }));

    const items = (po.items || []).map(it => {
      const internal = ingMap[it.ingredient_id] || pIngMap[it.product_ingredient_id];
      const internalName = internal?.name || it.description || `Item #${it.ingredient_id || it.product_ingredient_id || ''}`;
      const sp = it.ingredient_seller_product_id ? ispMap[it.ingredient_seller_product_id] : null;
      const qty = parseFloat(it.quantity_ordered) || 0;
      const unitPrice = parseFloat(it.unit_price) || 0;
      return {
        // Supplier's own product name is primary (they receive this doc); our internal
        // name is shown as a buyer reference only when it differs.
        name: sp?.name || internalName,
        sku: sp?.sku || '',
        buyer_ref: sp?.name ? internalName : '',
        unit: internal?.unit || it.unit || '',
        qty,
        unit_price: unitPrice,
        line_total: qty * unitPrice
      };
    });
    const subtotal = items.reduce((s, i) => s + i.line_total, 0);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>PO ${po.po_number || po.id}</title>
<style>
* { box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0A2540; padding: 32px; max-width: 800px; margin: 0 auto; }
h1 { font-size: 24px; margin: 0 0 4px; }
.meta { color: #6B7280; font-size: 13px; margin-bottom: 28px; }
.parties { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px; }
.party { padding: 14px; border: 1px solid #E6EBF1; border-radius: 8px; }
.party h3 { margin: 0 0 8px; font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.4px; }
.party .name { font-weight: 600; font-size: 15px; }
.party .line { font-size: 13px; color: #374151; margin-top: 4px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
th { background: #F8FAFC; text-align: left; padding: 10px 12px; font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #E6EBF1; }
th.num, td.num { text-align: right; }
td { padding: 10px 12px; border-bottom: 1px solid #F3F4F6; font-size: 13px; }
.total-row td { font-weight: 700; font-size: 15px; border-bottom: none; padding-top: 16px; }
.notes { padding: 14px; background: #F8FAFC; border-radius: 8px; font-size: 13px; color: #374151; line-height: 1.5; margin-bottom: 20px; }
.notes h3 { margin: 0 0 6px; font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.4px; }
.footer { font-size: 11px; color: #9CA3AF; margin-top: 28px; padding-top: 16px; border-top: 1px solid #F1F5F9; }
@media print { body { padding: 0; } }
</style>
</head>
<body>
<h1>Purchase Order</h1>
<div class="meta">
  <strong>${po.po_number || `#${po.id}`}</strong> · ${new Date(po.created_at).toLocaleDateString('en-MY')}
  ${po.expected_delivery_date ? ` · Expected: ${po.expected_delivery_date}` : ''}
</div>
<div class="parties">
  <div class="party">
    <h3>From (Buyer)</h3>
    <div class="name">${buyerName || '—'}</div>
    ${buyerAddress ? `<div class="line">${buyerAddress}</div>` : ''}
    ${po.delivery_address ? `<div class="line"><strong>Deliver to:</strong> ${po.delivery_address}</div>` : ''}
  </div>
  <div class="party">
    <h3>To (Supplier)</h3>
    <div class="name">${seller?.name || '—'}</div>
    ${seller?.phone ? `<div class="line">Phone: ${seller.phone}</div>` : ''}
    ${seller?.email ? `<div class="line">Email: ${seller.email}</div>` : ''}
    ${seller?.address ? `<div class="line">${seller.address}</div>` : ''}
  </div>
</div>
<table>
  <thead><tr><th>Item</th><th>SKU</th><th class="num">Qty</th><th>Unit</th><th class="num">Unit Price</th><th class="num">Total</th></tr></thead>
  <tbody>
    ${items.map(i => `<tr><td>${i.name}${i.buyer_ref ? `<div style="font-size:11px;color:#9CA3AF;margin-top:2px;">Buyer ref: ${i.buyer_ref}</div>` : ''}</td><td>${i.sku || '—'}</td><td class="num">${i.qty}</td><td>${i.unit}</td><td class="num">${i.unit_price.toFixed(2)}</td><td class="num">${i.line_total.toFixed(2)}</td></tr>`).join('')}
    <tr class="total-row"><td colspan="5" class="num">Total (${po.currency || 'MYR'})</td><td class="num">${subtotal.toFixed(2)}</td></tr>
  </tbody>
</table>
${po.notes ? `<div class="notes"><h3>Notes</h3>${po.notes.replace(/\n/g, '<br>')}</div>` : ''}
<div class="footer">Generated via PurpleHere · ${new Date().toLocaleString('en-MY')}</div>
<script>window.onload = function() { setTimeout(() => window.print(), 300); };</script>
</body></html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(html);
  } catch (err) {
    console.error('GET /purchase-orders/:id/pdf error:', err);
    res.status(500).json({ success: false, message: 'Failed to render PDF' });
  }
});

// ============================================
// POST /api/purchase-orders/:id/mark-sent-external — 외부 PO 수동 발송 완료 마킹 (status='submitted')
// ============================================
router.post('/purchase-orders/:id/mark-sent-external', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    const po = await PurchaseOrder.findByPk(id, { transaction: t });
    if (!po) { await t.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }
    if (!checkPOOwnership(po, req)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }
    if (po.status !== 'draft') { await t.rollback(); return res.status(400).json({ success: false, message: 'Only draft can be marked sent' }); }

    // 외부업체 수동 전송도 **발주가 나가는 경로**다 → 오너 승인 게이트를 반드시 탄다.
    // (예전엔 draft → submitted 직행이라 승인 ON 이어도 그냥 나갔다 — Fable 2026-07-13)
    const needsApproval = await applySubmitGate(po, t, (p, st, note) =>
      appendTrackingEvent(p, st, note, { source: 'external_manual_send', method: req.body?.method || 'manual' })
    );
    await t.commit();

    if (needsApproval) {
      emitPoEvent(req, po, 'seller-order-updated');
      setImmediate(() => fireOwnerApprovalPendingNotification(po));
    }
    res.json({ success: true, data: po });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('mark-sent-external error:', err);
    res.status(500).json({ success: false, message: 'Failed' });
  }
});

// ============================================
// POST /api/purchase-orders/:id/send-external-email — 계정 없는 외부 공급업체에게 발주서 메일 발송
//
// 2026-08-30 신설. 그전까지 외부 공급업체 경로는 `mark-sent-external`(사람이 밖에서 보낸 뒤 "보냈음" 마킹)뿐이라
// **시스템이 메일을 한 통도 보내지 않았다.** 이건 자동 발송이 아니라 **구매자가 누르는 명시 액션**이다.
// 언어는 'en' 고정 — 계정이 없어 수신자 언어 축이 존재하지 않는다(없는 축을 만들지 않는다).
// 발송은 `sendPlatformEmail` 경유 — placeholder/미인증 차단·바운스 차단 가드를 그대로 탄다.
// ============================================
router.post('/purchase-orders/:id/send-external-email', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Not found' });
    if (!checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });
    if (po.seller_type !== 'supplier' || !po.seller_entity_id) {
      return res.status(400).json({ success: false, message: 'External email is only for supplier orders' });
    }

    const SupplierCompany = require('../models/SupplierCompany');
    const sc = await SupplierCompany.findByPk(po.seller_entity_id);
    if (!sc) return res.status(404).json({ success: false, message: 'Supplier not found' });
    if (sc.owner_id) {
      return res.status(400).json({ success: false, message: 'This supplier has an account — they are notified in the app' });
    }
    if (!sc.email) {
      return res.status(400).json({ success: false, message: 'Supplier has no email address on file' });
    }

    // 구매자 표시명 — 판매자/구매자 신원 단일 소스 규칙과 같은 계열
    let buyerName = 'A buyer';
    try {
      const { resolveBuyerName } = require('../services/poNotifications');
      if (typeof resolveBuyerName === 'function') buyerName = await resolveBuyerName(po);
    } catch (_) { /* keep default */ }

    const { poExternalSendEmail } = require('../utils/notificationTemplates');
    const { loadPoEmailItems } = require('../utils/poEmailItems');
    const mail = poExternalSendEmail({
      buyerName,
      poNumber: po.po_number,
      total: po.total_amount,
      currency: po.currency || 'MYR',
      items: await loadPoEmailItems(po.id)
    }, 'en');

    const { sendPlatformEmail } = require('../utils/emailService');
    const result = await sendPlatformEmail({ to: sc.email, subject: mail.subject, html: mail.html, text: mail.text });

    // 가드에 걸려 안 나갔으면 그대로 알린다 — "보냈다" 고 거짓말하지 않는다.
    if (result && result.skipped) {
      return res.json({ success: true, data: { sent: false, reason: result.reason }, message: 'Email not sent (blocked by guard)' });
    }

    appendTrackingEvent(po, po.status, `Purchase order emailed to ${sc.email}`, { source: 'system_email' });
    await po.save();

    res.json({ success: true, data: { sent: true, to: sc.email } });
  } catch (err) {
    console.error('send-external-email error:', err);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// ============================================
// POST /api/purchase-orders/:id/upload-invoice — 외부 공급업체 인보이스 파일 URL 저장
//   url 은 /api/upload/files 호출로 사전 업로드된 결과 (relativePath, originalName 포함)
// ============================================
router.post('/purchase-orders/:id/upload-invoice', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Not found' });

    const { url, filename } = req.body || {};
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ success: false, message: 'Invoice URL required' });
    }
    if (!url.startsWith('/uploads/')) {
      return res.status(400).json({ success: false, message: 'Invalid invoice URL' });
    }

    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Not found' });
    if (!checkPOOwnership(po, req)) return res.status(404).json({ success: false, message: 'Not found' });

    // 외부 공급업체만 업로드 허용
    if (po.seller_type !== 'supplier') {
      return res.status(400).json({ success: false, message: 'Invoice upload only available for supplier orders' });
    }
    const SupplierCompany = require('../models/SupplierCompany');
    const supplier = await SupplierCompany.findByPk(po.seller_entity_id);
    if (!supplier || supplier.is_system_registered) {
      return res.status(400).json({ success: false, message: 'Invoice upload only for external (non-system) suppliers' });
    }

    await po.update({
      external_invoice_url: url,
      external_invoice_filename: filename || url.split('/').pop(),
      external_invoice_uploaded_at: new Date()
    });

    res.json({ success: true, data: po });
  } catch (err) {
    console.error('upload-invoice error:', err);
    res.status(500).json({ success: false, message: 'Failed to save invoice' });
  }
});

// ============================================
// ─────────────────────────────────────────────────────────────────────────────
// 결제 (P4-3) — 설계 docs/PURCHASE_ORDER_SYSTEM.md §5-3
// 결제 사실은 **발주 행**에 남고, 현금이면 그 시프트 드로어에서 나간다.
// 마감 기대금액 공식은 손대지 않는다 — 그 공식이 source 를 안 보고 시프트로만 묶기 때문에
// 여기서 만든 이동이 자동으로 잡힌다(cash-management.js:258).
// ─────────────────────────────────────────────────────────────────────────────

// POST /api/purchase-orders/:id/pay — 이미 받은(또는 아직 안 받은) 발주의 결제만 기록
router.post('/purchase-orders/:id/pay', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const method = req.body && req.body.payment_method;
    const result = await database.sequelize.transaction(async (t) => {
      const po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!po) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(po, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      // 취소된 발주에 돈을 기록하지 않는다(되돌릴 대상이 없는 돈이 생긴다)
      if (po.status === 'cancelled') { const e = new Error('Cannot pay a cancelled purchase order'); e.code = 'BAD_STATUS'; throw e; }
      return recordPayment(po, {
        method,
        userId: req.user && req.user.id,
        reason: req.body && req.body.reason ? sanitizeString(String(req.body.reason)).slice(0, 255) : null,
      }, t);
    });
    res.json({
      success: true,
      data: result.po,
      ...(result.movement ? { cash_movement_id: result.movement.id } : {}),
      ...(result.drawerSkipped ? { drawerSkipped: true } : {}),
    });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.statusCode) return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, code: err.code, message: err.message });
    console.error('POST /api/purchase-orders/:id/pay error:', err);
    res.status(500).json({ success: false, message: 'Failed to record payment' });
  }
});

// POST /api/purchase-orders/:id/refund-payment — **명시 결제취소**(발주 상태는 건드리지 않는다).
// 왜 필요한가: 주 결제 순간은 `receive-and-pay`(받으면서 지불)인데, 수령 뒤에는 발주 취소가
// 불가능하다(cancel 은 draft/submitted/pending_approval 만). 그래서 이 라우트가 없으면
// **가장 흔한 결제를 잘못 눌러도 되돌릴 길이 없다** — 드로어 out 만 남고 발주는 paid 로 굳는다.
// 되돌리기는 삭제가 아니라 반대 방향 `in` 이동이다(설계 §5-3, 감사 기록 보존).
router.post('/purchase-orders/:id/refund-payment', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const result = await database.sequelize.transaction(async (t) => {
      const po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!po) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(po, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (po.payment_status !== 'paid') {
        const e = new Error('This purchase order is not paid'); e.code = 'NOT_PAID'; e.statusCode = 409; throw e;
      }
      return reversePayment(po, {
        userId: req.user && req.user.id,
        reason: req.body && req.body.reason ? sanitizeString(String(req.body.reason)).slice(0, 255) : null,
      }, t);
    });
    res.json({
      success: true,
      data: result.po,
      ...(result.movement ? { cash_movement_id: result.movement.id } : {}),
      ...(result.drawerSkipped ? { drawerSkipped: true } : {}),
    });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.statusCode) return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    console.error('POST /api/purchase-orders/:id/refund-payment error:', err);
    res.status(500).json({ success: false, message: 'Failed to reverse payment' });
  }
});

// POST /api/purchase-orders/:id/receive-and-pay — 수령 + 결제를 **한 트랜잭션**으로.
// 프론트가 receive 다음 pay 를 따로 부르면 중간 실패 때 "받았는데 미결제"가 남는다(설계 §5-3).
// 수령 본체는 mark-received 와 **같은 applyReceipt** 를 쓴다 — 복제 금지.
router.post('/purchase-orders/:id/receive-and-pay', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const method = req.body && req.body.payment_method;
    const result = await database.sequelize.transaction(async (t) => {
      const po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!po) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(po, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!RECEIVABLE_STATUSES.includes(po.status)) {
        const e = new Error(po.status === 'pending_approval'
          ? 'Purchase order is awaiting Owner approval'
          : `Cannot receive a ${po.status} purchase order`);
        e.code = 'BAD_STATUS'; throw e;
      }

      // 수령 절차는 mark-received 와 **같은 함수**를 쓴다(복제 금지 — P4-3 Fable 지적)
      const rcv = await markAllReceived(po, {
        userId: req.user.id,
        note: `PO ${po.po_number} receive-and-pay`,
        trackingSource: 'receive_and_pay_action',
      }, t);
      if (!rcv.ok) { const e = new Error(rcv.message); e.code = 'BAD_STATUS'; throw e; }

      // 결제가 실패하면 수령도 통째로 롤백된다 — 그게 이 라우트가 존재하는 이유다.
      return recordPayment(po, {
        method,
        userId: req.user && req.user.id,
        reason: req.body && req.body.reason ? sanitizeString(String(req.body.reason)).slice(0, 255) : null,
      }, t);
    });
    // 수령 사실을 판매자에게 알린다(mark-received 와 같은 규칙 — non-blocking)
    setImmediate(() => fireBuyerReceivedNotification(result.po));
    res.json({
      success: true,
      data: result.po,
      ...(result.movement ? { cash_movement_id: result.movement.id } : {}),
      ...(result.drawerSkipped ? { drawerSkipped: true } : {}),
    });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.statusCode) return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, code: err.code, message: err.message });
    console.error('POST /api/purchase-orders/:id/receive-and-pay error:', err);
    res.status(500).json({ success: false, message: 'Failed to receive and pay' });
  }
});

// POST /api/purchase-orders/:id/mark-received — 수령 완료 (간단 마킹, /receive 의 lite 버전)
//   /receive 는 품목별 수량 검증 + GeneralStock 업데이트가 있어 무거움. 단순 수령 확인용.
// ============================================
router.post('/purchase-orders/:id/mark-received', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }

    const po = await PurchaseOrder.findByPk(id, { transaction: t });
    if (!po) { await t.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }
    if (!checkPOOwnership(po, req)) { await t.rollback(); return res.status(404).json({ success: false, message: 'Not found' }); }
    // 수령은 **발주가 실제로 나간 뒤**에만 가능하다. 예전엔 received/cancelled 만 막아서
    // **승인 대기(pending_approval) 발주를 입고 처리로 끝낼 수** 있었다(승인 우회 — Fable 2026-07-13).
    if (!RECEIVABLE_STATUSES.includes(po.status)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: po.status === 'pending_approval'
          ? 'Purchase order is awaiting Owner approval'
          : `Cannot receive a ${po.status} purchase order`
      });
    }

    // 전량 수령 처리(라인 재고 반영 + 상태·시각·tracking)는 **services 단일 소스**를 쓴다(P4-3).
    // receive-and-pay 도 같은 함수를 부른다 — 절차를 두 벌로 적으면 다음에 한쪽만 바뀐다.
    const rcv = await markAllReceived(po, {
      userId: req.user.id,
      note: `PO ${po.po_number} mark-received`,
      trackingSource: 'mark_received_action',
    }, t);
    if (!rcv.ok) {
      await t.rollback();
      return res.status(400).json({ success: false, message: rcv.message });
    }

    await t.commit();
    // 2026-09-01(Q6): 구매자가 받았다는 사실을 판매자에게 알린다.
    // 판매자 재고는 "출고"에서만 빠지는데 구매자가 먼저 받는 경로가 실제로는 유일했다
    // → 알려주지 않으면 판매자 재고가 영영 안 빠진다. 발송 실패가 수령을 막지 않도록 non-blocking.
    setImmediate(() => fireBuyerReceivedNotification(po));
    res.json({ success: true, data: po });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('mark-received error:', err);
    res.status(500).json({ success: false, message: 'Failed to mark received' });
  }
});

router.post('/purchase-orders/:id/submit', async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    po = await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, {
        lock: t.LOCK.UPDATE,
        include: [{ model: PurchaseOrderItem, as: 'items' }],
        transaction: t
      });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'draft') {
        const e = new Error('Only draft orders can be submitted');
        e.code = 'BAD_STATUS';
        throw e;
      }
      if (!locked.items || locked.items.length === 0) {
        const e = new Error('Purchase order has no items');
        e.code = 'EMPTY_ITEMS';
        throw e;
      }
      // Owner approval gate — restaurant POs only, when an Owner is connected
      // and operation_settings.requirePoOwnerApproval !== false (default ON).
      // 승인 게이트는 utils/poOwnerApproval 단일 소스 (submit / bulk / 외부전송 3경로 공유)
      await applySubmitGate(locked, t, appendTrackingEvent);
      return locked;
    });

    if (po.status === 'pending_approval') {
      // Do NOT notify seller yet — wait for Owner approval. Notify Owner instead.
      emitPoEvent(req, po, 'seller-order-updated');
      setImmediate(() => fireOwnerApprovalPendingNotification(po));
    } else {
      emitPoEvent(req, po, 'seller-order-created');
      // Notify seller asynchronously — don't block response
      setImmediate(() => fireSellerSubmittedNotification(po));
      setImmediate(() => fireBuyerConfirmNotification(po));
    }

    res.json({ success: true, data: po });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    if (err.code === 'EMPTY_ITEMS') return res.status(400).json({ success: false, message: err.message });
    console.error('POST /api/purchase-orders/:id/submit error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit purchase order' });
  }
});

// ============================================
// 6. POST /api/purchase-orders/:id/mark-shipped
// ============================================
router.post('/purchase-orders/:id/mark-shipped', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const po = await PurchaseOrder.findByPk(id);
    if (!po) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (!checkPOOwnership(po, req)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    // External suppliers only — system supplier shipping must go through seller flow
    // (so SupplierProduct stock decrement + InventoryTransaction는 seller-orders.js 에서 처리)
    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      const supplier = await SupplierCompany.findByPk(po.seller_entity_id, { attributes: ['is_system_registered'] });
      if (supplier && supplier.is_system_registered) {
        return res.status(403).json({
          success: false,
          message: 'System supplier orders must be shipped by the seller. Buyer mark-shipped is only allowed for external suppliers.'
        });
      }
    }
    if (po.status !== 'confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Only confirmed orders can be marked shipped'
      });
    }

    const newTracking = appendTrackingEvent(po, 'shipped', 'Marked shipped by buyer');
    await po.update({ status: 'shipped', shipped_at: new Date(), tracking_info: newTracking });
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({ success: true, data: po });
  } catch (err) {
    console.error('POST /api/purchase-orders/:id/mark-shipped error:', err);
    res.status(500).json({ success: false, message: 'Failed to mark shipped' });
  }
});

// ============================================
// 7. POST /api/purchase-orders/:id/receive
// ============================================
router.post('/purchase-orders/:id/receive', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const po = await PurchaseOrder.findByPk(id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }],
      transaction: t
    });
    if (!po) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    if (!checkPOOwnership(po, req)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    if (!RECEIVABLE_STATUSES.includes(po.status)) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: po.status === 'pending_approval'
          ? 'Purchase order is awaiting Owner approval'
          : `Cannot receive a ${po.status} purchase order`
      });
    }

    const { items: receivedItems } = req.body;
    if (!Array.isArray(receivedItems) || receivedItems.length === 0) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'items array is required' });
    }

    // Map for fast lookup
    const itemMap = new Map();
    for (const it of po.items) itemMap.set(it.id, it);

    const affectedIngredientIds = new Set();
    const autoReturns = [];          // Sprint 7: damaged/wrong_item auto-generated
    const discrepancyLines = [];      // Sprint 7: short/pending 보고만

    // Sprint 7: each item can have splits[] — backward compat with quantity_received-only payload
    // - Old payload: { item_id, quantity_received, unit_cost?, batch_no?, expiry_date? }
    // - New payload: { item_id, splits: [{ quantity, reason, unit_cost?, batch_no?, expiry_date?, discrepancy_note? }, ...] }
    const normalizeItemPayload = (r) => {
      if (Array.isArray(r.splits)) return r.splits.map(s => ({
        quantity: parseFloat(s.quantity),
        reason: s.reason ?? null,
        unit_cost: s.unit_cost,
        batch_no: s.batch_no,
        expiry_date: s.expiry_date,
        discrepancy_note: s.discrepancy_note
      }));
      // Legacy single-split (정상 수령) — backward compat
      return [{
        quantity: parseFloat(r.quantity_received),
        reason: null,
        unit_cost: r.unit_cost,
        batch_no: r.batch_no,
        expiry_date: r.expiry_date
      }];
    };

    for (const r of receivedItems) {
      const itemId = parseInt(r.item_id, 10);
      if (!Number.isFinite(itemId)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'item_id is required' });
      }
      const item = itemMap.get(itemId);
      if (!item) {
        await t.rollback();
        return res.status(400).json({
          success: false, message: `item_id ${itemId} does not belong to this PO`
        });
      }

      const splits = normalizeItemPayload(r);
      const totalSplitQty = splits.reduce((sum, s) => sum + (Number.isFinite(s.quantity) ? s.quantity : 0), 0);
      if (!(totalSplitQty > 0)) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `item ${itemId}: total split quantity must be > 0` });
      }

      // Validate Σ split.quantity ≤ remaining
      const ordered = parseFloat(item.quantity_ordered) || 0;
      const alreadyReceived = parseFloat(item.quantity_received) || 0;
      const remaining = ordered - alreadyReceived;
      if (totalSplitQty > remaining + 0.001) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `item ${itemId}: total quantity ${totalSplitQty} exceeds remaining ${remaining}`
        });
      }

      // Validate reason ENUM
      const ALLOWED = new Set([null, 'short', 'damaged', 'wrong_item', 'pending']);
      for (const s of splits) {
        if (!ALLOWED.has(s.reason)) {
          await t.rollback();
          return res.status(400).json({ success: false, message: `Invalid discrepancy_reason: ${s.reason}` });
        }
        if (!(s.quantity > 0)) {
          await t.rollback();
          return res.status(400).json({ success: false, message: 'Each split requires quantity > 0' });
        }
      }

      // 레시피 없는 프로덕트 수령 — 정상분만 프로덕트 수량에 더한다(2026-09-01).
      // 재고 반영은 applyReceipt 단일 소스(P4-2). 파손·부족분은 재고에 안 넣는다(재료 경로와 같은 규칙).
      if (item.product_id || item.brand_product_id) {
        let normalP = 0;
        for (const split of splits) {
          if (split.reason !== null) continue;
          normalP = Math.round((normalP + split.quantity) * 100) / 100;
          const r = await applyReceipt({
            item, po, quantity: split.quantity, userId: req.user.id, t,
            note: `PO ${po.po_number} receive`
          });
          if (!r.ok) { await t.rollback(); return res.status(400).json({ success: false, message: r.message }); }
        }
        await item.update({ quantity_received: Math.round((alreadyReceived + normalP) * 100) / 100 }, { transaction: t });
        continue;
      }

      // BG 재고아이템(ProductIngredient) 수령 — 정상분만 재고 반영 (split/damage 미적용, RA Ingredient 경로와 분리)
      if (item.product_ingredient_id) {
        // 행을 잠그고(FIFO 차감 경합 방지) 같은 인스턴스를 split 마다 물려준다 — 재고 반영은 applyReceipt(P4-2).
        const pIng = await ProductIngredient.findByPk(item.product_ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
        if (!pIng) {
          await t.rollback();
          return res.status(400).json({ success: false, message: `Product ingredient ${item.product_ingredient_id} not found` });
        }
        let normalB = 0;
        for (const split of splits) {
          if (split.reason !== null) continue; // BG: 정상분만 재고 반영
          normalB = Math.round((normalB + split.quantity) * 100) / 100;
          const r = await applyReceipt({
            item, po, quantity: split.quantity, userId: req.user.id, t,
            note: `PO ${po.po_number} receive`, pIng
          });
          if (!r.ok) { await t.rollback(); return res.status(400).json({ success: false, message: r.message }); }
        }
        await item.update({ quantity_received: Math.round((alreadyReceived + normalB) * 100) / 100 }, { transaction: t });
        continue;
      }

      // Lock ingredient row to prevent race with FIFO deduction
      const ingredient = await Ingredient.findByPk(item.ingredient_id, {
        lock: t.LOCK.UPDATE,
        transaction: t
      });
      if (!ingredient) {
        await t.rollback();
        return res.status(400).json({
          success: false, message: `Ingredient ${item.ingredient_id} not found`
        });
      }

      const conv = parseFloat(item.unit_conversion) || 1;
      let currentStock = po.entity_type === 'restaurant'
        ? await stockFor(ingredient, po.entity_id, t)
        : parseFloat(ingredient.current_stock) || 0;
      let normalQtyTotal = 0;             // sum of split.quantity where reason === null
      let lastDiscrepancyReason = null;   // 마지막 short/pending split 기록 — UI에서 표시용

      // ─── Sprint 7: process splits ───────────────────────
      for (const split of splits) {
        const qty = split.quantity;
        const reason = split.reason;

        if (reason === null) {
          // 정상 수령 — 배치 + 원장 + 가중평균원가 + 오버레이. 전부 applyReceipt 단일 소스(P4-2).
          //   split 사이에서 currentStock 을 물려준다(한 라인에 정상분이 여러 번 올 수 있다).
          normalQtyTotal = Math.round((normalQtyTotal + qty) * 100) / 100;
          const r = await applyReceipt({
            item, po, quantity: qty, userId: req.user.id, t,
            note: `PO ${po.po_number} receive`,
            unitCost: split.unit_cost != null ? parseFloat(split.unit_cost) : null,
            batchNumber: split.batch_no || null,
            expiryDate: split.expiry_date || null,
            ingredientRow: ingredient,
            currentStock,
          });
          if (!r.ok) { await t.rollback(); return res.status(400).json({ success: false, message: r.message }); }
          currentStock = r.stockAfter;
        } else if (reason === 'damaged' || reason === 'wrong_item') {
          // Auto returns — 재고 변동 없음
          const sourceEvent = reason === 'damaged' ? 'receive_damage' : 'receive_wrong_item';
          const ar = await PurchaseOrderReturn.create({
            purchase_order_id: po.id,
            purchase_order_item_id: item.id,
            // 발주 라인과 같은 모양으로 — BG 본사 라인은 ingredient_id 가 없다(예전엔 500)
            ingredient_id: item.ingredient_id,
            product_ingredient_id: item.product_ingredient_id || null,
            quantity: qty,
            unit: item.unit || ingredient.unit,
            unit_price: parseFloat(item.unit_price) || 0,
            reason: split.discrepancy_note || `Auto-generated: ${reason} on receive`,
            status: 'requested',
            requested_by_user_id: req.user.id,
            auto_generated: true,
            source_event: sourceEvent
          }, { transaction: t });
          autoReturns.push({
            id: ar.id, item_id: item.id, ingredient_id: item.ingredient_id,
            quantity: qty, reason
          });
        } else if (reason === 'short' || reason === 'pending') {
          // 보고만 — discrepancy 컬럼 update
          await PurchaseOrderItem.update({
            discrepancy_reason: reason,
            discrepancy_note: split.discrepancy_note || null,
            discrepancy_reported_at: new Date(),
            discrepancy_reported_by_user_id: req.user.id
          }, { where: { id: item.id }, transaction: t });
          lastDiscrepancyReason = reason;
          discrepancyLines.push({ item_id: item.id, quantity: qty, reason });
        }
      }

      // Update item.quantity_received with normal split sum
      if (normalQtyTotal > 0) {
        const newRecv = Math.round((alreadyReceived + normalQtyTotal) * 100) / 100;
        await PurchaseOrderItem.update(
          { quantity_received: newRecv },
          { where: { id: item.id }, transaction: t }
        );
        item.quantity_received = newRecv;
      }
      // (legacy block removed — splits 처리로 대체됨 below)
      affectedIngredientIds.add(item.ingredient_id);
    }

    // Determine PO completion status
    const allReceived = po.items.every(it =>
      (parseFloat(it.quantity_received) || 0) >= (parseFloat(it.quantity_ordered) || 0)
    );

    const newStatus = allReceived ? 'received' : 'partial_received';
    const newTracking = appendTrackingEvent(po, newStatus,
      allReceived ? 'Order received in full' : 'Order partially received');
    const updates = allReceived
      ? { status: 'received', received_at: new Date(), tracking_info: newTracking }
      : { status: 'partial_received', tracking_info: newTracking };
    await po.update(updates, { transaction: t });

    // Resolve stock alerts (best-effort, restaurant-scoped — Sprint 7: brand/foodcourt 미지원, restaurant only)
    if (po.entity_type === 'restaurant' && affectedIngredientIds.size > 0) {
      await StockAlert.update(
        { is_resolved: true, resolved_at: new Date() },
        {
          where: {
            restaurant_id: po.entity_id,
            ingredient_id: { [Op.in]: Array.from(affectedIngredientIds) },
            is_resolved: false
          },
          transaction: t
        }
      );
    }

    await t.commit();

    const updated = await PurchaseOrder.findByPk(po.id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }]
    });

    // Sprint 5: emit realtime event to seller + buyer rooms
    emitPoEvent(req, updated, 'seller-order-updated');

    // Sprint 7: response includes auto_returns + discrepancy_lines for UI feedback
    res.locals.sprint7Extra = { auto_returns: autoReturns, discrepancy_lines: discrepancyLines };

    // Sprint 4: Auto-issue Trade Invoice when fully received (idempotent, non-blocking)
    if (updated.status === 'received') {
      (async () => {
        try {
          const { createTradeInvoice } = require('../services/purchaseOrderService');
          await createTradeInvoice(updated);
        } catch (e) {
          console.error('[Sprint 4] Trade invoice auto-issue failed:', e.message);
        }
      })();
    }

    // 2026-09-01(Q6): mark-received 와 같은 규칙 — 구매자 수령을 판매자에게 알린다
    setImmediate(() => fireBuyerReceivedNotification(updated));
    res.json({
      success: true,
      data: updated,
      auto_returns: autoReturns,
      discrepancy_lines: discrepancyLines
    });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /api/purchase-orders/:id/receive error:', err);
    res.status(500).json({ success: false, message: 'Failed to receive purchase order' });
  }
});

// ============================================
// Sprint 7 — PUT /api/purchase-orders/:id/items/:itemId/discrepancy
// 사후 차이 보고/변경 (예: pending → damaged 발견)
// ============================================
router.put('/purchase-orders/:id/items/:itemId/discrepancy', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const id = parseInt(req.params.id, 10);
    const itemId = parseInt(req.params.itemId, 10);
    if (!Number.isFinite(id) || !Number.isFinite(itemId)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    const po = await PurchaseOrder.findByPk(id, { transaction: t });
    if (!po || !checkPOOwnership(po, req)) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Not found' });
    }

    const item = await PurchaseOrderItem.findByPk(itemId, { transaction: t });
    if (!item || item.purchase_order_id !== po.id) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const ALLOWED = new Set([null, 'short', 'damaged', 'wrong_item', 'pending']);
    const reason = req.body?.reason ?? null;
    if (!ALLOWED.has(reason)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Invalid reason: ${reason}` });
    }
    const note = (req.body?.note != null) ? String(req.body.note).slice(0, 500) : null;
    const qty = req.body?.quantity != null ? parseFloat(req.body.quantity) : null;

    // Update line discrepancy fields
    await PurchaseOrderItem.update({
      discrepancy_reason: reason,
      discrepancy_note: note,
      discrepancy_reported_at: reason ? new Date() : null,
      discrepancy_reported_by_user_id: reason ? req.user.id : null
    }, { where: { id: itemId }, transaction: t });

    // damaged/wrong_item으로 사후 변경 시 auto-return 자동 생성 (qty 필수)
    let autoReturn = null;
    if ((reason === 'damaged' || reason === 'wrong_item') && qty > 0) {
      const sourceEvent = reason === 'damaged' ? 'receive_damage' : 'receive_wrong_item';
      autoReturn = await PurchaseOrderReturn.create({
        purchase_order_id: po.id,
        purchase_order_item_id: itemId,
        // 발주 라인과 같은 모양으로 — BG 본사 라인은 ingredient_id 가 없다(예전엔 500)
        ingredient_id: item.ingredient_id,
        product_ingredient_id: item.product_ingredient_id || null,
        quantity: qty,
        unit: item.unit,
        unit_price: parseFloat(item.unit_price) || 0,
        reason: note || `Auto-generated (post-receive): ${reason}`,
        status: 'requested',
        requested_by_user_id: req.user.id,
        auto_generated: true,
        source_event: sourceEvent
      }, { transaction: t });
    }

    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({
      success: true,
      data: { item_id: itemId, reason, note, quantity: qty },
      auto_return: autoReturn ? { id: autoReturn.id, quantity: qty, reason } : null
    });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('PUT discrepancy error:', err);
    res.status(500).json({ success: false, message: 'Failed to update discrepancy' });
  }
});

// ============================================
// 8. POST /api/purchase-orders/:id/cancel
// ============================================
router.post('/purchase-orders/:id/cancel', async (req, res) => {
  let po;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const reason = req.body.reason ? sanitizeString(String(req.body.reason)) : null;
    let cancelDrawerSkipped = false;   // 열린 시프트가 없어 드로어로 되돌리지 못한 경우 안내용
    po = await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      // pending_approval 도 철회 가능 — 오너가 반려할 때까지 묶여 있으면 안 된다
      if (!['draft', 'submitted', 'pending_approval'].includes(locked.status)) {
        const e = new Error(`Cannot cancel order in status '${locked.status}'. Use returns flow after delivery.`);
        e.code = 'BAD_STATUS';
        throw e;
      }
      const tracking = appendTrackingEvent(locked, 'cancelled', reason ? `Cancelled by buyer: ${reason.slice(0, 200)}` : 'Cancelled by buyer');
      await locked.update({
        status: 'cancelled',
        cancelled_at: new Date(),
        cancelled_reason: reason,
        tracking_info: tracking
      }, { transaction: t });
      // 낸 돈이 있으면 되돌린다 — **삭제가 아니라 반대 방향 이동**(감사 기록 보존, P4-3).
      // 안 낸 발주면 noop 이라 취소 흐름 자체는 그대로다.
      const rev = await reversePayment(locked, { userId: req.user && req.user.id, reason: `Cancelled PO ${locked.po_number}` }, t);
      if (rev.drawerSkipped) cancelDrawerSkipped = true;
      return locked;
    });
    emitPoEvent(req, po, 'seller-order-updated');

    res.json({ success: true, data: po, ...(cancelDrawerSkipped ? { drawerSkipped: true } : {}) });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    if (err.code === 'MULTIPLE_OPEN_SHIFTS') return res.status(400).json({ success: false, code: err.code, message: err.message });
    console.error('POST /api/purchase-orders/:id/cancel error:', err);
    res.status(500).json({ success: false, message: 'Failed to cancel purchase order' });
  }
});

// ============================================
// DELETE /api/purchase-orders/:id — DRAFT 전용 폐기(완전 삭제). 2026-06-22 (Irene)
// staging 은 cart 가 아니라 "발송 전 draft 검토" 영역인데, 카트 제출마다 draft 가 쌓이기만 하고
// 개별 제거 수단이 없었다. cancel 은 'cancelled' 기록을 남겨 history 를 더럽히므로, 발송 안 한
// draft 는 라인아이템과 함께 완전 삭제한다. draft 외 상태는 거부(발송된 PO 는 cancel/returns 사용).
// owner-scoped (checkPOOwnership) — 남의 PO 는 404.
// ============================================
router.delete('/purchase-orders/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const PurchaseOrderItem = require('../models/PurchaseOrderItem');
    await database.sequelize.transaction(async (t) => {
      const locked = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!locked) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(locked, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (locked.status !== 'draft') {
        const e = new Error(`Only draft orders can be discarded (current: '${locked.status}').`);
        e.code = 'BAD_STATUS'; throw e;
      }
      await PurchaseOrderItem.destroy({ where: { purchase_order_id: id }, transaction: t });
      await locked.destroy({ transaction: t });
    });
    res.json({ success: true });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('DELETE /api/purchase-orders/:id error:', err);
    res.status(500).json({ success: false, message: 'Failed to discard purchase order' });
  }
});

// ============================================
// DELETE /api/purchase-orders/:id/items/:itemId — DRAFT PO 의 개별 품목 삭제. 2026-06-22 (Irene)
// 총액 재계산. 마지막 품목 삭제 시 빈 PO 는 함께 삭제(빈 발주서 방지). draft 전용 + owner-scoped.
// ============================================
router.delete('/purchase-orders/:id/items/:itemId', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const itemId = parseInt(req.params.itemId, 10);
    if (!Number.isFinite(id) || !Number.isFinite(itemId)) return res.status(404).json({ success: false, message: 'Not found' });
    const out = await database.sequelize.transaction(async (t) => {
      const po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!po) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (!checkPOOwnership(po, req)) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      if (po.status !== 'draft') { const e = new Error(`Only draft order items can be removed (status '${po.status}').`); e.code = 'BAD_STATUS'; throw e; }
      const item = await PurchaseOrderItem.findOne({ where: { id: itemId, purchase_order_id: id }, transaction: t });
      if (!item) { const e = new Error('NOT_FOUND'); e.code = 'NOT_FOUND'; throw e; }
      await item.destroy({ transaction: t });
      const remaining = await PurchaseOrderItem.findAll({ where: { purchase_order_id: id }, transaction: t });
      if (remaining.length === 0) {
        await po.destroy({ transaction: t });
        return { po_deleted: true };
      }
      let subtotal = 0;
      for (const r of remaining) subtotal += Math.round((parseFloat(r.quantity_ordered) || 0) * (parseFloat(r.unit_price) || 0) * 100) / 100;
      subtotal = Math.round(subtotal * 100) / 100;
      await po.update({ subtotal, tax_amount: 0, total_amount: subtotal }, { transaction: t });
      return { po_deleted: false, total_amount: subtotal };
    });
    res.json({ success: true, data: out });
  } catch (err) {
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Not found' });
    if (err.code === 'BAD_STATUS') return res.status(400).json({ success: false, message: err.message });
    console.error('DELETE /api/purchase-orders/:id/items/:itemId error:', err);
    res.status(500).json({ success: false, message: 'Failed to remove item' });
  }
});

// ============================================
// POST /api/purchase-orders/consolidate-drafts — 같은 공급업체(buyer+seller)의 draft PO 들을
// 하나로 합친다(가장 오래된 PO 로 품목 이동 + 총액 누적, 나머지 삭제). 2026-06-22 (Irene
// "같은 공급업체는 합쳐라"). 발주 전(draft) 만 — 제출된 PO 는 손대지 않음. owner-scoped.
// 이후 카트 제출(bulk mergeDraft)이 단일 draft 를 유지한다.
// ============================================
router.post('/purchase-orders/consolidate-drafts', async (req, res) => {
  try {
    if (!req.buyerEntity) return res.status(400).json({ success: false, message: 'Buyer context required' });
    const { Op } = require('sequelize');
    const result = await database.sequelize.transaction(async (t) => {
      const drafts = await PurchaseOrder.findAll({
        where: { entity_type: req.buyerEntity.type, entity_id: req.buyerEntity.id, status: 'draft' },
        order: [['created_at', 'ASC']],
        lock: t.LOCK.UPDATE, transaction: t
      });
      // group by seller_type:seller_entity_id
      const groups = {};
      for (const d of drafts) {
        const key = `${d.seller_type}:${d.seller_entity_id == null ? 'null' : d.seller_entity_id}`;
        (groups[key] = groups[key] || []).push(d);
      }
      let mergedGroups = 0, removed = 0;
      for (const key of Object.keys(groups)) {
        const list = groups[key];
        if (list.length < 2) continue;
        const primary = list[0]; // oldest
        for (let i = 1; i < list.length; i++) {
          const dup = list[i];
          await PurchaseOrderItem.update({ purchase_order_id: primary.id }, { where: { purchase_order_id: dup.id }, transaction: t });
          await dup.destroy({ transaction: t });
          removed++;
        }
        // recompute primary total from all its items
        const items = await PurchaseOrderItem.findAll({ where: { purchase_order_id: primary.id }, transaction: t });
        let subtotal = 0;
        for (const r of items) subtotal += Math.round((parseFloat(r.quantity_ordered) || 0) * (parseFloat(r.unit_price) || 0) * 100) / 100;
        subtotal = Math.round(subtotal * 100) / 100;
        await primary.update({ subtotal, tax_amount: 0, total_amount: subtotal }, { transaction: t });
        mergedGroups++;
      }
      return { mergedGroups, removed };
    });
    res.json({ success: true, data: result });
  } catch (err) {
    console.error('POST /api/purchase-orders/consolidate-drafts error:', err);
    res.status(500).json({ success: false, message: 'Failed to consolidate drafts' });
  }
});

module.exports = router;
