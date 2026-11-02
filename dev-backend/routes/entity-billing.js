/**
 * Entity Billing Terms (BG/FG → Restaurant trade billing)
 *
 * Mirrors SupplierContract.payment_terms but stored directly on Restaurant
 * (since BG↔RA / FG↔RA are auto relations via brand_id/foodcourt_id; no contract
 * status machine).
 *
 * Endpoints:
 *   PUT  /api/brand/restaurants/:restaurantId/billing-terms
 *   GET  /api/brand/restaurants/:restaurantId/billing-terms
 *   PUT  /api/foodcourt/restaurants/:restaurantId/billing-terms
 *   GET  /api/foodcourt/restaurants/:restaurantId/billing-terms
 *   POST /api/{brand|foodcourt}/restaurants/:restaurantId/billing-terms/settle-internal
 *        — 직영(INTERNAL) 저장 뒤 이미 열려 있던 청구서를 «결제됨(internal)» 으로 정리 (2026-11-02)
 *
 * Auth: authenticateToken + (BG → requireBrandScope, FG → requireFoodcourtScope)
 *  - BG can only set terms for Restaurants whose brand_id ∈ ownedBrandIds.
 *  - FG can only set terms for Restaurants whose foodcourt_id matches user.foodcourt_id.
 *  - System Admin can override via ?brand_id=N or ?foodcourt_id=N.
 *
 * Security:
 *  - Cross-brand / cross-foodcourt access returns 404 (no existence leak).
 *  - payment_terms validated via utils/paymentTerms.js.
 *  - body.payment_terms === null clears terms (= immediate default).
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Restaurant, Brand, Foodcourt, Invoice } = require('../models');
const { sequelize } = require('../config/database');
const { syncSoaChildren } = require('../services/soaChildSync');
const { mirrorPaidToPurchaseOrders } = require('../services/purchaseOrderPayment');
const { authenticateToken } = require('../middleware/auth');
const { requireBrandScope } = require('../middleware/brandScope');
const {
  validatePaymentTerms,
  buildPaymentTerms,
  isInternalSettlement
} = require('../utils/paymentTerms');

// ──────────────────────────────────────────────────────────────────────────────
// 직영(INTERNAL) — 이미 열려 있던 청구서 (2026-11-02 Fable 설계 direct-store-billing §1-4)
//   새로 나오는 청구서는 createTradeInvoice 가 처음부터 «결제됨(internal)» 으로 낸다. 저장 전에 쌓인 것은
//   자동으로 바꾸지 않는다(되돌릴 길이 없다) — BG/FG 가 버튼으로 한 번 정리한다.
//   «몇 건 열려 있나»(GET) 와 «정리»(POST) 는 같은 조건(openInternalWhere)을 쓴다.
// ──────────────────────────────────────────────────────────────────────────────
const OPEN_STATUSES = ['pending_payment', 'overdue', 'payment_submitted'];
const INTERNAL_NOTE = 'Internal settlement — brand-operated store, no payment required';

function openInternalWhere(issuerType, issuerId, restaurantId) {
  return {
    issuer_type: issuerType,
    issuer_id: issuerId,
    payer_type: 'restaurant',
    payer_id: restaurantId,
    status: { [Op.in]: OPEN_STATUSES },
    [Op.or]: [
      // 정산서에 묶이지 않은 단독 발주 청구서
      { invoice_category: 'trade', parent_soa_invoice_id: null },
      // 정산서 — 자식은 syncSoaChildren 이 따라간다
      { invoice_category: 'soa' }
    ]
  };
}

async function openInternalSummary(issuerType, issuerId, restaurantId) {
  const rows = await Invoice.findAll({
    where: openInternalWhere(issuerType, issuerId, restaurantId),
    attributes: ['id', 'total_amount', 'paid_amount']
  });
  const amount = rows.reduce((sum, r) => sum + (Number(r.total_amount || 0) - Number(r.paid_amount || 0)), 0);
  return { count: rows.length, amount: Math.round(amount * 100) / 100 };
}

async function settleInternal(issuerType, issuerId, restaurantId, actorId) {
  const now = new Date();
  return sequelize.transaction(async (t) => {
    const open = await Invoice.findAll({
      where: openInternalWhere(issuerType, issuerId, restaurantId),
      transaction: t,
      lock: t.LOCK.UPDATE
    });
    let invoices = 0;
    let soa = 0;
    let totalAmount = 0;
    const paidTradeIds = [];
    for (const inv of open) {
      const total = Number(inv.total_amount || 0);
      totalAmount += total - Number(inv.paid_amount || 0);
      await inv.update({
        status: 'paid',
        paid_amount: total,
        paid_at: now,
        payment_method: 'internal',
        payment_notes: INTERNAL_NOTE,
        confirmed_by: actorId || null,
        confirmed_at: now
      }, { transaction: t });
      if (inv.invoice_category === 'soa') {
        soa += 1;
        // 메모리 «SOA 상태 = soaChildSync — 새 길도 반드시 호출»
        await syncSoaChildren(inv, 'paid', { transaction: t, actorId: actorId || null, at: now });
        const children = await Invoice.findAll({
          where: { parent_soa_invoice_id: inv.id }, attributes: ['id'], transaction: t
        });
        children.forEach((c) => paidTradeIds.push(c.id));
      } else {
        invoices += 1;
        paidTradeIds.push(inv.id);
      }
    }
    const purchaseOrders = await mirrorPaidToPurchaseOrders(paidTradeIds, now, t, { method: 'internal' });
    return {
      invoices,
      soa,
      purchase_orders: purchaseOrders,
      total_amount: Math.round(totalAmount * 100) / 100
    };
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Foodcourt scope helper (mirrors brandScope but inline — no separate middleware
// file exists yet; FG resources are scoped per user.foodcourt_id directly).
// ──────────────────────────────────────────────────────────────────────────────
function isSysAdmin(user) { return user?.role === 'System Admin'; }
function isFG(user) {
  return user?.role === 'Foodcourt General' || user?.role === 'Foodcourt Manager';
}

async function requireFoodcourtScope(req, res, next) {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

    if (isSysAdmin(user)) {
      const override = req.query.foodcourt_id ? parseInt(req.query.foodcourt_id, 10) : null;
      req.foodcourtScope = {
        foodcourtId: Number.isFinite(override) ? override : null,
        ownedFoodcourtIds: null,
        isAdmin: true
      };
      return next();
    }

    if (!isFG(user)) {
      return res.status(403).json({ success: false, message: 'Foodcourt General access only' });
    }

    // FG owns one foodcourt (user.foodcourt_id). Multi-foodcourt ownership not modeled today.
    const owned = await Foodcourt.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
    const ownedIds = owned.map(f => f.id);
    if (user.foodcourt_id && !ownedIds.includes(user.foodcourt_id)) {
      ownedIds.push(parseInt(user.foodcourt_id, 10));
    }
    if (ownedIds.length === 0) {
      return res.status(403).json({ success: false, message: 'No foodcourt owned by user' });
    }

    req.foodcourtScope = {
      foodcourtId: user.foodcourt_id ? parseInt(user.foodcourt_id, 10) : ownedIds[0],
      ownedFoodcourtIds: ownedIds,
      isAdmin: false
    };
    return next();
  } catch (err) {
    console.error('requireFoodcourtScope error:', err);
    return res.status(500).json({ success: false, message: 'Scope check failed' });
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Resolve restaurant + ownership check.
// Returns the restaurant if scope owns it, or sends 404 and returns null.
// ──────────────────────────────────────────────────────────────────────────────
async function resolveRestaurantForBrand(req, res) {
  const restaurantId = parseInt(req.params.restaurantId, 10);
  if (!Number.isFinite(restaurantId)) {
    res.status(404).json({ success: false, message: 'Restaurant not found' });
    return null;
  }
  const restaurant = await Restaurant.findByPk(restaurantId);
  if (!restaurant || !restaurant.brand_id) {
    res.status(404).json({ success: false, message: 'Restaurant not found' });
    return null;
  }
  const scope = req.brandScope;
  if (scope.isAdmin) return restaurant;
  if (!scope.ownedBrandIds.includes(restaurant.brand_id)) {
    res.status(404).json({ success: false, message: 'Restaurant not found' });
    return null;
  }
  return restaurant;
}

async function resolveRestaurantForFoodcourt(req, res) {
  const restaurantId = parseInt(req.params.restaurantId, 10);
  if (!Number.isFinite(restaurantId)) {
    res.status(404).json({ success: false, message: 'Restaurant not found' });
    return null;
  }
  const restaurant = await Restaurant.findByPk(restaurantId);
  if (!restaurant || !restaurant.foodcourt_id) {
    res.status(404).json({ success: false, message: 'Restaurant not found' });
    return null;
  }
  const scope = req.foodcourtScope;
  if (scope.isAdmin) return restaurant;
  if (!scope.ownedFoodcourtIds.includes(restaurant.foodcourt_id)) {
    res.status(404).json({ success: false, message: 'Restaurant not found' });
    return null;
  }
  return restaurant;
}

// ──────────────────────────────────────────────────────────────────────────────
// BRAND endpoints
// ──────────────────────────────────────────────────────────────────────────────

router.get(
  '/brand/restaurants/:restaurantId/billing-terms',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const restaurant = await resolveRestaurantForBrand(req, res);
      if (!restaurant) return;
      const data = {
        restaurant_id: restaurant.id,
        brand_id: restaurant.brand_id,
        payment_terms: restaurant.brand_billing_terms || null
      };
      if (isInternalSettlement(restaurant.brand_billing_terms)) {
        data.open_invoices = await openInternalSummary('brand', restaurant.brand_id, restaurant.id);
      }
      res.json({ success: true, data });
    } catch (err) {
      console.error('GET /api/brand/restaurants/:id/billing-terms error:', err);
      res.status(500).json({ success: false, message: 'Failed to load billing terms' });
    }
  }
);

router.put(
  '/brand/restaurants/:restaurantId/billing-terms',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const restaurant = await resolveRestaurantForBrand(req, res);
      if (!restaurant) return;

      // null/undefined → clear (= immediate default)
      if (req.body.payment_terms === null) {
        await restaurant.update({ brand_billing_terms: null });
        return res.json({
          success: true,
          data: {
            restaurant_id: restaurant.id,
            brand_id: restaurant.brand_id,
            payment_terms: null
          }
        });
      }

      const validationError = validatePaymentTerms(req.body.payment_terms, { allowInternal: true });
      if (validationError) {
        return res.status(400).json({ success: false, message: validationError });
      }

      const stored = buildPaymentTerms(req.body.payment_terms);
      await restaurant.update({ brand_billing_terms: stored });

      res.json({
        success: true,
        data: {
          restaurant_id: restaurant.id,
          brand_id: restaurant.brand_id,
          payment_terms: stored
        }
      });
    } catch (err) {
      console.error('PUT /api/brand/restaurants/:id/billing-terms error:', err);
      res.status(500).json({ success: false, message: 'Failed to update billing terms' });
    }
  }
);

router.post(
  '/brand/restaurants/:restaurantId/billing-terms/settle-internal',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const restaurant = await resolveRestaurantForBrand(req, res);
      if (!restaurant) return;
      if (!isInternalSettlement(restaurant.brand_billing_terms)) {
        return res.status(409).json({ success: false, code: 'NOT_INTERNAL', message: 'Save the payment terms as Internal first' });
      }
      const result = await settleInternal('brand', restaurant.brand_id, restaurant.id, req.user?.id);
      res.json({ success: true, data: result });
    } catch (err) {
      console.error('POST /api/brand/restaurants/:id/billing-terms/settle-internal error:', err);
      res.status(500).json({ success: false, message: 'Failed to settle invoices' });
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// FOODCOURT endpoints
// ──────────────────────────────────────────────────────────────────────────────

router.get(
  '/foodcourt/restaurants/:restaurantId/billing-terms',
  authenticateToken,
  requireFoodcourtScope,
  async (req, res) => {
    try {
      const restaurant = await resolveRestaurantForFoodcourt(req, res);
      if (!restaurant) return;
      const data = {
        restaurant_id: restaurant.id,
        foodcourt_id: restaurant.foodcourt_id,
        payment_terms: restaurant.foodcourt_billing_terms || null
      };
      if (isInternalSettlement(restaurant.foodcourt_billing_terms)) {
        data.open_invoices = await openInternalSummary('foodcourt', restaurant.foodcourt_id, restaurant.id);
      }
      res.json({ success: true, data });
    } catch (err) {
      console.error('GET /api/foodcourt/restaurants/:id/billing-terms error:', err);
      res.status(500).json({ success: false, message: 'Failed to load billing terms' });
    }
  }
);

router.put(
  '/foodcourt/restaurants/:restaurantId/billing-terms',
  authenticateToken,
  requireFoodcourtScope,
  async (req, res) => {
    try {
      const restaurant = await resolveRestaurantForFoodcourt(req, res);
      if (!restaurant) return;

      if (req.body.payment_terms === null) {
        await restaurant.update({ foodcourt_billing_terms: null });
        return res.json({
          success: true,
          data: {
            restaurant_id: restaurant.id,
            foodcourt_id: restaurant.foodcourt_id,
            payment_terms: null
          }
        });
      }

      const validationError = validatePaymentTerms(req.body.payment_terms, { allowInternal: true });
      if (validationError) {
        return res.status(400).json({ success: false, message: validationError });
      }

      const stored = buildPaymentTerms(req.body.payment_terms);
      await restaurant.update({ foodcourt_billing_terms: stored });

      res.json({
        success: true,
        data: {
          restaurant_id: restaurant.id,
          foodcourt_id: restaurant.foodcourt_id,
          payment_terms: stored
        }
      });
    } catch (err) {
      console.error('PUT /api/foodcourt/restaurants/:id/billing-terms error:', err);
      res.status(500).json({ success: false, message: 'Failed to update billing terms' });
    }
  }
);

router.post(
  '/foodcourt/restaurants/:restaurantId/billing-terms/settle-internal',
  authenticateToken,
  requireFoodcourtScope,
  async (req, res) => {
    try {
      const restaurant = await resolveRestaurantForFoodcourt(req, res);
      if (!restaurant) return;
      if (!isInternalSettlement(restaurant.foodcourt_billing_terms)) {
        return res.status(409).json({ success: false, code: 'NOT_INTERNAL', message: 'Save the payment terms as Internal first' });
      }
      const result = await settleInternal('foodcourt', restaurant.foodcourt_id, restaurant.id, req.user?.id);
      res.json({ success: true, data: result });
    } catch (err) {
      console.error('POST /api/foodcourt/restaurants/:id/billing-terms/settle-internal error:', err);
      res.status(500).json({ success: false, message: 'Failed to settle invoices' });
    }
  }
);

module.exports = router;
module.exports.requireFoodcourtScope = requireFoodcourtScope;
