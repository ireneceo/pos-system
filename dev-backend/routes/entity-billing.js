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
const { Restaurant, Brand, Foodcourt } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBrandScope } = require('../middleware/brandScope');
const {
  validatePaymentTerms,
  buildPaymentTerms
} = require('../utils/paymentTerms');

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
      res.json({
        success: true,
        data: {
          restaurant_id: restaurant.id,
          brand_id: restaurant.brand_id,
          payment_terms: restaurant.brand_billing_terms || null
        }
      });
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

      const validationError = validatePaymentTerms(req.body.payment_terms);
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
      res.json({
        success: true,
        data: {
          restaurant_id: restaurant.id,
          foodcourt_id: restaurant.foodcourt_id,
          payment_terms: restaurant.foodcourt_billing_terms || null
        }
      });
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

      const validationError = validatePaymentTerms(req.body.payment_terms);
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

module.exports = router;
module.exports.requireFoodcourtScope = requireFoodcourtScope;
