/**
 * 구매자(매장) 쪽 발주 품목 수정 — 2026-10-15 Fable 설계 `.claude/fable-design-20261015-buyer-po-edit.md`
 *
 * Irene: «미스 발주 했을 때 다 삭제하고 다시 하기에 너무 힘들어. 아이템별 삭제 그리고 아이템추가(해당공급업체 것)을
 *        발주내역에서 가능하게 하고 오너 승인 절차가 있는 경우에는 수정요청 … 상황확인하고 승인»
 *
 * 판매자 amend(routes/seller-orders.js POST /:id/amend + utils/poAmend.js)의 **거울**이다 — 같은 판정 함수
 * (mappingUsableBy·listAmendableProducts·buildAmendedLine·diffLines)·같은 금액식(computeTotalsWithDelivery)·
 * 같은 이력 이벤트('amended' + by_buyer:true). 다른 점은 셋:
 *   ① 누가 — requireBuyerRole(RA · inventory 권한 직원 · 오너는 OWNER_ACTING_ROUTES)
 *   ② 언제 — poAmend.buyerAmendBlock(판매자 확인 전 · 돈/물건이 안 움직였을 때)
 *   ③ 오너 승인 매장이면 **모든** 수정이 다시 승인 — poOwnerApproval.applyBuyerAmendGate
 *
 * 결제 라우트가 든 workflow.js 에 넣지 않으려고 따로 둔다. PUT /purchase-orders/:id 는 품목 수정 경로로 쓰지 않는다(설계 §8).
 *
 * Endpoints:
 *   GET  /purchase-orders/:id/amendable-products — 추가 후보(이 판매자 상품 중 내 재고에 연결된 것) + can_amend
 *   POST /purchase-orders/:id/amend              — 줄 전체 교체(단가는 서버가 채움)
 */
const express = require('express');
const router = express.Router();

const database = require('../config/database');
const { PurchaseOrder, PurchaseOrderItem, IngredientSellerProduct } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { sanitizeString } = require('../middleware/validation');
const { appendTrackingEvent, emitPoEvent } = require('../services/poRealtimeService');
const { resolveSellers, isExternalSeller } = require('../utils/sellerNames');
const {
  mappingUsableBy, listAmendableProducts, buildAmendedLine, diffLines, buyerAmendBlock
} = require('../utils/poAmend');
const { carriedOptionsFor, resolveLineOptions, LineOptionError, lineOptionErrorBody } = require('../utils/poLineOptions');
const { isApprovalRequiredForPo, applyBuyerAmendGate } = require('../utils/poOwnerApproval');
const { computeTotalsWithDelivery } = require('../utils/purchaseOrderTotals');
const { assertLinesMeetMinOrder, minOrderRulesByMapping, MinOrderError, minOrderErrorBody } = require('../utils/poMinOrder');
const { assertLinesSellerProductActive, InactiveSellerProductError, inactiveSellerProductErrorBody } = require('../utils/poSellerProductActive');
const { fireSellerAmendedByBuyerNotification, fireOwnerApprovalPendingNotification } = require('../services/poNotifications');

router.use('/purchase-orders', authenticateToken, requireBuyerRole);

// purchase-orders-crud.js checkPOOwnership 와 같은 본문이어야 한다.
function checkPOOwnership(po, req) {
  if (req.buyerIsAdmin && !req.buyerEntity) return true; // SA without override
  if (!req.buyerEntity) return false;
  return po.entity_type === req.buyerEntity.type && po.entity_id === req.buyerEntity.id;
}

async function isExternalPo(po) {
  const sellerMap = await resolveSellers([po]);
  return isExternalSeller(sellerMap, po.seller_type, po.seller_entity_id);
}

function buyerEntityFor(po, req) {
  return req.buyerEntity || { type: po.entity_type, id: parseInt(po.entity_id, 10) };
}

function fail(code, message, http = 400) {
  const e = new Error(message);
  e.code = code; e.http = http;
  return e;
}

// ============================================
// GET /api/purchase-orders/:id/amendable-products
// ============================================
router.get('/purchase-orders/:id/amendable-products', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });
    const po = await PurchaseOrder.findByPk(id);
    if (!po || !checkPOOwnership(po, req)) {
      return res.status(404).json({ success: false, message: 'Purchase order not found' });
    }
    const lines = await PurchaseOrderItem.findAll({ where: { purchase_order_id: po.id } });
    const isExternal = await isExternalPo(po);
    const block = buyerAmendBlock(po, lines, { isExternal });
    const keepMappingIds = lines.map(r => r.ingredient_seller_product_id).filter(Boolean);
    const products = block ? [] : await listAmendableProducts(po, buyerEntityFor(po, req), undefined, { keepMappingIds });
    // 화면이 고를 때 미리 채우는 하한 = 저장 검사와 같은 규칙(판매자 상품 현재 값, utils/poMinOrder). 연결 사본 값은 덮어쓴다.
    if (products.length) {
      const rules = await minOrderRulesByMapping(products.map(p => p.ingredient_seller_product_id));
      for (const p of products) {
        const r = rules[p.ingredient_seller_product_id];
        p.min_order_quantity = r ? r.min : null;
      }
    }
    const approvalOn = await isApprovalRequiredForPo(po);
    res.json({
      success: true,
      data: {
        products,
        can_amend: !block,
        blocked: block ? block.code : null,
        approval_required_on_edit: approvalOn && !req.buyerIsOwnerView,
        is_external: isExternal
      }
    });
  } catch (err) {
    console.error('GET /api/purchase-orders/:id/amendable-products error:', err);
    res.status(500).json({ success: false, message: 'Failed to load products' });
  }
});

// ============================================
// POST /api/purchase-orders/:id/amend
// ============================================
router.post('/purchase-orders/:id/amend', async (req, res) => {
  let result;
  try {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) return res.status(404).json({ success: false, message: 'Purchase order not found' });

    const reason = sanitizeString(String(req.body?.reason || '').trim()).slice(0, 1000);
    const items = req.body?.items;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false, code: 'EMPTY_ITEMS',
        message: 'At least one item is required — cancel the order to remove everything'
      });
    }

    result = await database.sequelize.transaction(async (t) => {
      const po = await PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!po || !checkPOOwnership(po, req)) throw fail('NOT_FOUND', 'Purchase order not found', 404);

      const beforeRows = await PurchaseOrderItem.findAll({ where: { purchase_order_id: po.id }, transaction: t });
      const isExternal = await isExternalPo(po);
      const block = buyerAmendBlock(po, beforeRows, { isExternal });
      if (block) throw fail(block.code, block.message, block.http);

      const buyerEntity = buyerEntityFor(po, req);
      const validated = [];
      for (const raw of items) {
        const mappingId = parseInt(raw && raw.ingredient_seller_product_id, 10);
        const qty = parseFloat(raw && raw.quantity_ordered);
        if (!Number.isFinite(mappingId) || !(qty > 0)) {
          throw fail('BAD_ITEM', 'Each item requires ingredient_seller_product_id and quantity_ordered > 0');
        }
        const mapping = await IngredientSellerProduct.findByPk(mappingId, { transaction: t });
        const check = await mappingUsableBy(mapping, po, buyerEntity, t);
        if (!check.ok) throw fail(check.code, check.message);
        // 남기는 줄(item_id)은 고른 옵션이 따라가고, 새 줄은 option_ids 를 서버가 검증한다(가입 공급업체 상품만).
        const opts = Number.isFinite(parseInt(raw.item_id, 10))
          ? carriedOptionsFor(raw, mappingId, beforeRows)
          : (await resolveLineOptions({ mapping, optionIds: raw.option_ids, transaction: t })).options;
        const line = await buildAmendedLine(po, raw, mapping, check.stockRow, check.target, t, opts);
        if (line.notes) line.notes = sanitizeString(String(line.notes)).slice(0, 255);
        validated.push(line);
      }

      // 구매자 경로는 제출 라우트와 같은 두 규칙을 건다(판매자 amend 는 규칙 주인이라 안 건다).
      await assertLinesMeetMinOrder(validated, { transaction: t });
      await assertLinesSellerProductActive(validated, { transaction: t });

      const totals = await computeTotalsWithDelivery(validated, po, { orderCurrency: po.currency });
      const totalBefore = parseFloat(po.total_amount) || 0;
      const totalAfter = parseFloat(totals.total_amount) || 0;
      const changes = diffLines(beforeRows, validated);
      const byOwner = !!req.buyerIsOwnerView;

      await PurchaseOrderItem.destroy({ where: { purchase_order_id: po.id }, transaction: t });
      await PurchaseOrderItem.bulkCreate(validated, { transaction: t });

      const userId = req.user?.id || req.user?.userId || null;
      const tracking = appendTrackingEvent(
        po, 'amended',
        `Edited by ${byOwner ? 'Owner' : 'buyer'}${reason ? `: ${reason.slice(0, 200)}` : ''}`,
        null,
        {
          by_buyer: true,
          by_owner: byOwner,
          changes,
          reason: reason || null,
          by_user_id: userId,
          total_before: totalBefore,
          total_after: totalAfter,
          total_increased: totalAfter - totalBefore > 0.005
        }
      );
      // ⚠ status 는 여기서 바꾸지 않는다 — 'amended' 는 이력 이벤트 이름. 승인 매장이면 아래 게이트가 바꾼다.
      await po.update({
        subtotal: totals.subtotal,
        tax_amount: totals.tax_amount,
        delivery_fee: totals.delivery_fee,
        delivery_fee_basis: totals.delivery_fee_basis,
        total_amount: totals.total_amount,
        tracking_info: tracking
      }, { transaction: t });

      const needsApproval = await applyBuyerAmendGate(po, t, appendTrackingEvent, {
        actor: req.user, totalBefore, totalAfter
      });
      return { po, changes, reason, totalBefore, totalAfter, needsApproval };
    });

    emitPoEvent(req, result.po, 'seller-order-updated');
    if (result.needsApproval) {
      setImmediate(() => fireOwnerApprovalPendingNotification(result.po));
    } else if (result.po.status !== 'pending_approval') {
      // 승인 대기 중인 발주는 판매자에게 아직 없는 주문 — 승인 뒤 approve 라우트가 통지한다.
      setImmediate(() => fireSellerAmendedByBuyerNotification(result.po, {
        changes: result.changes, reason: result.reason,
        totalBefore: result.totalBefore, totalAfter: result.totalAfter
      }));
    }

    const updated = await PurchaseOrder.findByPk(result.po.id, {
      include: [{ model: PurchaseOrderItem, as: 'items' }]
    });
    res.json({
      success: true, data: updated,
      message: result.needsApproval ? 'Order edited — awaiting Owner approval' : 'Order edited'
    });
  } catch (err) {
    if (err instanceof MinOrderError) return res.status(400).json(minOrderErrorBody(err));
    if (err instanceof InactiveSellerProductError) return res.status(400).json(inactiveSellerProductErrorBody(err));
    if (err instanceof LineOptionError) return res.status(400).json(lineOptionErrorBody(err));
    if (err.code === 'NOT_FOUND') return res.status(404).json({ success: false, message: 'Purchase order not found' });
    if (err.code && err.http) return res.status(err.http).json({ success: false, code: err.code, message: err.message });
    if (err.code && typeof err.code === 'string' && /^[A-Z_]+$/.test(err.code)) {
      return res.status(400).json({ success: false, code: err.code, message: err.message });
    }
    console.error('POST /api/purchase-orders/:id/amend error:', err);
    res.status(500).json({ success: false, message: 'Failed to edit purchase order' });
  }
});

module.exports = router;
