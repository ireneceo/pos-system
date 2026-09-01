/**
 * Purchase Order Returns — Sprint 6 (2026-04-27).
 *
 * Buyer-initiated returns on received PO line items.
 * Seller approves → Credit Note Invoice auto-issued + stock reversal.
 *
 *   POST /api/purchase-orders/:id/returns                     — buyer initiate
 *   GET  /api/purchase-orders/:id/returns                     — buyer view
 *   GET  /api/seller-orders/:id/returns                       — seller view
 *   POST /api/seller-orders/:id/returns/:returnId/approve     — seller approve
 *   POST /api/seller-orders/:id/returns/:returnId/reject      — seller reject
 */

const express = require('express');
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
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');
const { requireSellerRole } = require('../middleware/sellerScope');
const { sanitizeString } = require('../middleware/validation');
const { emitPoEvent } = require('../services/poRealtimeService');

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

    // Allowed status: only after delivery (received or partial_received or delivered)
    if (!['received', 'partial_received', 'delivered'].includes(po.status)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Returns only allowed after delivery (current status: ${po.status})` });
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
      if (!poItem) {
        await t.rollback();
        return res.status(400).json({ success: false, message: `Item ${itemId} does not belong to this PO` });
      }
      // 입고량을 넘겨 반품할 수 없다 — **기존 반품 합산**까지 본다.
      // (예전엔 라인별 단건 검사뿐이라 5개 입고에 5개 반품을 세 번 요청해도 다 통과했다.)
      const received = parseFloat(poItem.quantity_received) || 0;
      const priorSum = (await PurchaseOrderReturn.sum('quantity', {
        where: { purchase_order_item_id: itemId, status: { [Op.in]: ['requested', 'approved'] } },
        transaction: t
      })) || 0;
      if (qty + priorSum > received) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: `Return qty (${qty}) + already requested/approved (${priorSum}) exceeds received (${received}) for item ${itemId}`
        });
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
        unit_price: poItem.unit_price,
        reason: r.reason ? sanitizeString(String(r.reason)).slice(0, 1000) : reasonGlobal || null,
        status: 'requested',
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
    const sellerOk = req.sellerEntity
      ? po.seller_type === req.sellerEntity.type &&
        (req.sellerEntity.id == null
          ? po.seller_entity_id == null
          : parseInt(po.seller_entity_id, 10) === parseInt(req.sellerEntity.id, 10))
      : !!req.sellerIsAdmin;
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
  const sellerOk = req.sellerEntity
    ? po.seller_type === req.sellerEntity.type &&
      (req.sellerEntity.id == null
        ? po.seller_entity_id == null
        : parseInt(po.seller_entity_id, 10) === parseInt(req.sellerEntity.id, 10))
    : !!req.sellerIsAdmin;
  if (!sellerOk) return { error: 'Order not found', status: 404 };
  const ret = await PurchaseOrderReturn.findByPk(returnId, lockOpts);
  if (!ret || ret.purchase_order_id !== po.id) return { error: 'Return not found', status: 404 };
  return { po, ret };
}

router.post('/seller-orders/:id/returns/:returnId/approve', async (req, res) => {
  const t = await database.sequelize.transaction();
  try {
    const { error, status, po, ret } = await loadAndCheckReturn(req, t);   // 행 잠금 — 이중 승인 방지
    if (error) { await t.rollback(); return res.status(status).json({ success: false, message: error }); }
    if (ret.status !== 'requested') {
      await t.rollback();
      return res.status(400).json({ success: false, message: `Return cannot be approved in status '${ret.status}'` });
    }

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
    if (approvedSum + delta > receivedQty) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: `Approved returns (${approvedSum}) + this return (${delta}) exceed received (${receivedQty})`
      });
    }

    // 1. 구매자 재고 차감 — 입고의 정확한 역방향.
    //    입고는 `quantity × unit_conversion` 을 더했으므로 반품도 같은 양을 뺀다(환산 누락 시 어긋난다).
    //
    //    ⚠ **엔티티 타입이 아니라 라인 모양으로 분기한다** — 입고가 그렇게 하기 때문이다.
    //      BG 본사 라인 = product_ingredient_id (ProductIngredient), 그 외 = ingredient_id.
    //      예전엔 `po.entity_type === 'restaurant'` 만 처리해서 **BG/FG 가 구매자면 반품해도
    //      재고가 안 줄었다**(Fable 2026-07-13 B2).
    const buyerPIngId = ret.product_ingredient_id || item?.product_ingredient_id || null;

    if (buyerPIngId) {
      // (a) BG 본사 재고아이템 라인 — 입고(purchase-orders-workflow: ProductIngredient += qty×conv)의 역방향
      const pIng = await ProductIngredient.findByPk(buyerPIngId, { lock: t.LOCK.UPDATE, transaction: t });
      if (pIng) {
        const conv = parseFloat(item?.unit_conversion) || 1;
        const reverseQty = Math.round(delta * conv * 100) / 100;
        const cur = parseFloat(pIng.current_stock) || 0;
        // 2026-09-01(Q5): track_stock 게이트 제거 — 항상 되돌린다
        const newStock = Math.max(0, Math.round((cur - reverseQty) * 100) / 100);
        await pIng.update({ current_stock: newStock }, { transaction: t });

        const applied = Math.round((cur - newStock) * 100) / 100;
        if (applied < reverseQty) {
          console.warn(`[po-returns] Return #${ret.id}: 반품 ${reverseQty} 요청이나 본사 재고 ${cur} 뿐 — ${applied} 만 차감(클램프)`);
        }

        await InventoryTransaction.create({
          entity_type: po.entity_type, entity_id: po.entity_id,
          product_ingredient_id: pIng.id,
          transaction_type: 'return_out',
          quantity_change: -applied,
          unit: pIng.unit || ret.unit || 'unit',
          stock_after: newStock,
          purchase_order_id: po.id,
          notes: `Return #${ret.id} approved — buyer stock reversal`,
          created_by: req.user?.id || null
        }, { transaction: t });
      }
    } else if (po.entity_type === 'restaurant' && ret.ingredient_id) {
      const ingredient = await Ingredient.findByPk(ret.ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
      if (ingredient) {
        const conv = parseFloat(item?.unit_conversion) || 1;
        const reverseQty = Math.round(delta * conv * 100) / 100;
        const cur = await stockFor(ingredient, po.entity_id, t);
        // 2026-09-01(Q5): track_stock 게이트 제거 — 항상 되돌린다
        const newStock = Math.max(0, Math.round((cur - reverseQty) * 100) / 100);
        await applyStock(ingredient, po.entity_id, newStock, t);

        // 원장에는 **실제 이동량**을 적는다 — 재고가 모자라 클램프가 걸리면 의도량보다 작다.
        // 의도량을 적으면 `이전재고 + quantity_change ≠ stock_after` 가 되어 원장 합산이
        // 실재고와 영원히 어긋난다(감사·실사가 깨진다). 선례: inventoryDeductionService 도
        // 실제 차감량을 기록한다.
        const applied = Math.round((cur - newStock) * 100) / 100;
        if (applied < reverseQty) {
          console.warn(`[po-returns] Return #${ret.id}: 반품 ${reverseQty} 요청이나 매장 재고 ${cur} 뿐 — ${applied} 만 차감(클램프)`);
        }

        // 원장 기록 — 입고('purchase')는 남기는데 반품은 아무것도 안 남기고 있었다(감사 구멍)
        await InventoryTransaction.create({
          entity_type: 'restaurant', entity_id: po.entity_id,
          ingredient_id: ingredient.id,
          transaction_type: 'return_out',
          quantity_change: -applied,
          unit: ingredient.unit || ret.unit || 'unit',
          stock_after: newStock,
          purchase_order_id: po.id,
          notes: `Return #${ret.id} approved — buyer stock reversal`,
          created_by: req.user?.id || null
        }, { transaction: t });
      }
    } else if (ret.ingredient_id) {
      // (c) BG(레거시 Ingredient 소유)·FG 구매자 — 입고의 else 분기(ingredient.current_stock 직접 증가)의 역방향.
      //     오버레이는 매장 전용이므로 여기선 재료 행을 직접 다룬다.
      const ingredient = await Ingredient.findByPk(ret.ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
      if (ingredient) {
        const conv = parseFloat(item?.unit_conversion) || 1;
        const reverseQty = Math.round(delta * conv * 100) / 100;
        const cur = parseFloat(ingredient.current_stock) || 0;
        // 2026-09-01(Q5): track_stock 게이트 제거 — 항상 되돌린다
        const newStock = Math.max(0, Math.round((cur - reverseQty) * 100) / 100);
        await ingredient.update({ current_stock: newStock }, { transaction: t });

        const applied = Math.round((cur - newStock) * 100) / 100;
        if (applied < reverseQty) {
          console.warn(`[po-returns] Return #${ret.id}: 반품 ${reverseQty} 요청이나 재고 ${cur} 뿐 — ${applied} 만 차감(클램프)`);
        }

        await InventoryTransaction.create({
          entity_type: po.entity_type, entity_id: po.entity_id,
          ingredient_id: ingredient.id,
          transaction_type: 'return_out',
          quantity_change: -applied,
          unit: ingredient.unit || ret.unit || 'unit',
          stock_after: newStock,
          purchase_order_id: po.id,
          notes: `Return #${ret.id} approved — buyer stock reversal`,
          created_by: req.user?.id || null
        }, { transaction: t });
      }
    }

    // 2. 판매자 재고 환원 (양방향 무결성) — 각 판매자가 **자기 재고**를 되돌린다

    if (po.seller_type === 'supplier' && po.seller_entity_id) {
      // 기존 — Supplier 환원
      if (item?.ingredient_seller_product_id) {
        const mapping = await IngredientSellerProduct.findByPk(item.ingredient_seller_product_id, { transaction: t });
        if (mapping?.seller_product_id) {
          const sp = await SupplierProduct.findByPk(mapping.seller_product_id, { lock: t.LOCK.UPDATE, transaction: t });
          if (sp) {
            const old = parseFloat(sp.current_stock) || 0;
            const nu = Math.round((old + delta) * 100) / 100;
            await sp.update({ current_stock: nu }, { transaction: t });
            await SupplierInventoryTransaction.create({
              supplier_company_id: po.seller_entity_id,
              supplier_product_id: sp.id,
              transaction_type: 'manual_adjust',
              quantity_change: delta,
              unit: sp.unit || null,
              stock_after: nu,
              reason: 'return_approved',
              reference_type: 'purchase_order',
              reference_id: po.id,
              notes: `Return #${ret.id} approved`,
              created_by: req.user?.id || null
            }, { transaction: t });
          }
        }
      }
    } else if (po.seller_type === 'brand' && po.seller_entity_id && item?.ingredient_seller_product_id) {
      // Brand seller 환원 = **출고의 정확한 역방향**.
      //   출고(seller-orders.js ship): BrandProduct.recipe(BOM) → ProductIngredient 차감
      //   따라서 반품도 같은 BOM 으로 ProductIngredient 를 되돌린다.
      // ⚠ 예전 코드는 `Ingredient.findByPk(ret.ingredient_id)`(= **구매자**의 재료 행)를 올렸다.
      //   1단계에서 깎은 바로 그 행이라 −q 후 +q = **net 0** — 반품해도 매장 재고가 안 줄고
      //   본사 재고는 복구되지 않았다. (2026-07-13 실증 후 수정)
      const mapping = await IngredientSellerProduct.findByPk(item.ingredient_seller_product_id, { transaction: t });
      if (mapping?.seller_product_id) {
        const bp = await BrandProduct.findByPk(mapping.seller_product_id, { transaction: t });
        if (bp?.product_recipe_id) {   // 레시피 없으면 환원 없음 — 출고도 차감하지 않았다(대칭)
          const recipeIngs = await ProductRecipeIngredient.findAll({
            where: { recipe_id: bp.product_recipe_id }, transaction: t
          });
          for (const ri of recipeIngs) {
            const pIng = await ProductIngredient.findByPk(ri.ingredient_id, { lock: t.LOCK.UPDATE, transaction: t });
            if (!pIng) continue;
            const backQty = Math.round((parseFloat(ri.quantity) || 0) * delta * 100) / 100;
            if (backQty <= 0) continue;
            const cur = parseFloat(pIng.current_stock) || 0;
            const nu = Math.round((cur + backQty) * 100) / 100; // 2026-09-01(Q5): 게이트 제거
            await pIng.update({ current_stock: nu }, { transaction: t });
            await InventoryTransaction.create({
              entity_type: 'brand', entity_id: po.seller_entity_id,
              product_ingredient_id: pIng.id,
              transaction_type: 'return_in',
              quantity_change: backQty,
              unit: pIng.unit, stock_after: nu,
              purchase_order_id: po.id,
              notes: `Return #${ret.id} approved (brand seller, ${bp.name})`,
              created_by: req.user?.id || null
            }, { transaction: t });
          }
        }
      }
    } else if (po.seller_type === 'foodcourt' && po.seller_entity_id && item?.ingredient_seller_product_id) {
      // Sprint 7 — Foodcourt seller 환원
      // FoodcourtProduct는 IngredientSellerProduct → seller_product_id 가 FoodcourtProduct.id 이라고 가정
      const mapping = await IngredientSellerProduct.findByPk(item.ingredient_seller_product_id, { transaction: t });
      if (mapping?.seller_product_id) {
        const fp = await FoodcourtProduct.findByPk(mapping.seller_product_id, { lock: t.LOCK.UPDATE, transaction: t });
        if (fp) {
          const old = parseFloat(fp.current_stock) || 0;
          const nu = Math.round((old + delta) * 100) / 100;
          await fp.update({ current_stock: nu }, { transaction: t });
          await InventoryTransaction.create({
            entity_type: 'foodcourt',
            entity_id: po.seller_entity_id,
            ingredient_id: ret.ingredient_id,
            transaction_type: 'return_in',
            quantity_change: delta,
            unit: fp.unit || ret.unit || 'unit',
            stock_after: nu,
            purchase_order_id: po.id,
            notes: `Return #${ret.id} approved (foodcourt seller)`,
            created_by: req.user?.id || null
          }, { transaction: t });
        }
      }
    }

    const payer = await resolvePayer(po);

    // 3. Issue Credit Note Invoice (negative-style: use status='credit')
    // Sprint 7: currency assertion (PO ↔ Credit Note 정합)
    const lineTotal = Math.round((parseFloat(ret.quantity) * (parseFloat(ret.unit_price) || 0)) * 100) / 100;
    const poCurrency = po.currency || 'MYR';
    const creditInvoice = await Invoice.create({
      invoice_number: `CN-${po.po_number}-R${ret.id}`,
      type: 'automatic',
      invoice_category: 'credit_note',
      category_display_name: 'Credit Note (Return)',
      issuer_type: po.seller_type === 'system_admin' ? 'system_admin' : po.seller_type,
      issuer_id: po.seller_entity_id || 1,
      issued_by: req.user?.id || 1,
      issued_at: new Date(),
      // payer 해석은 트레이드 인보이스와 **같은 단일 소스**(purchaseOrderService.resolvePayer).
      // 예전엔 payer_id 를 po.entity_id(브랜드 id) 로 넣어, BG/FG 구매자의 크레딧노트가
      // 그들의 인보이스·SOA 화면에 붙지 않았다(트레이드 인보이스는 owner user id 를 쓴다).
      payer_type: payer.payer_type,
      payer_id: payer.payer_id,
      restaurant_id: payer.restaurant_id,
      contract_id: po.contract_id || null,
      billing_period_start: new Date(),
      billing_period_end: new Date(),
      due_date: new Date(),
      subtotal: lineTotal,
      tax_amount: 0,
      discount_amount: 0,
      total_amount: lineTotal,
      currency: poCurrency,
      status: 'credit',
      notes: `Credit Note for Return #${ret.id} (PO ${po.po_number})`
    }, { transaction: t });

    // Currency invariant: credit note must match PO currency
    if (creditInvoice.currency !== poCurrency) {
      await t.rollback();
      console.error(`[po-returns:approve] Currency mismatch — PO=${poCurrency} CreditNote=${creditInvoice.currency}`);
      return res.status(500).json({ success: false, message: 'Currency mismatch between PO and Credit Note' });
    }

    await InvoiceItem.create({
      invoice_id: creditInvoice.id,
      description: `Return: ${ret.ingredient_id ? `ingredient #${ret.ingredient_id}` : `stock item #${ret.product_ingredient_id}`} × ${ret.quantity} ${ret.unit || ''}`,
      quantity: ret.quantity,
      unit_price: ret.unit_price || 0,
      calculated_amount: lineTotal,
      total_amount: lineTotal,
      tax_amount: 0,
      item_type: 'product',
      calculation_method: 'fixed'
    }, { transaction: t });

    await ret.update({
      status: 'approved',
      approved_by_user_id: req.user.id,
      resolved_at: new Date(),
      credit_invoice_id: creditInvoice.id
    }, { transaction: t });

    await t.commit();
    emitPoEvent(req, po, 'seller-order-updated');
    res.json({ success: true, data: { return: ret, credit_invoice: creditInvoice }, message: 'Return approved' });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST approve return error:', err);
    res.status(500).json({ success: false, message: 'Failed to approve return' });
  }
});

router.post('/seller-orders/:id/returns/:returnId/reject', async (req, res) => {
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
});

module.exports = router;
