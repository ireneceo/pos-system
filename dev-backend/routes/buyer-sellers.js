/**
 * Buyer-side seller directory — Phase 2 (2026-04-27).
 *
 * Returns the list of sellers this buyer can place a Purchase Order with.
 * Mirrors the seller-relation rules in routes/purchase-orders.js:
 *   - supplier      → SupplierContract status='active'
 *   - brand   (BG)  → Restaurant.brand_id   (BG buyer can never appear here for brand seller)
 *   - foodcourt(FG) → Restaurant.foodcourt_id
 *   - system_admin  → always (POS catalog)
 *
 * Endpoint: GET /api/buyer-sellers
 *   Auth: authenticateToken + requireBuyerRole
 */

const express = require('express');
const router = express.Router();
const { listBuyerSellers } = require('../utils/buyerSellers');
const { authenticateToken } = require('../middleware/auth');
const { requireBuyerRole } = require('../middleware/buyerScope');

// Path-level guard so unrelated /api/* fall-throughs aren't blocked by buyer-role.
router.use('/buyer-sellers', authenticateToken, requireBuyerRole);

router.get('/buyer-sellers', async (req, res) => {
  try {
    const buyer = req.buyerEntity;
    if (!buyer) {
      return res.status(400).json({
        success: false,
        message: 'entity_type & entity_id query params required for System Admin'
      });
    }

    const sellers = await listBuyerSellers(buyer);   // utils/buyerSellers — 승인 예외 후보와 같은 목록

    res.json({ success: true, data: sellers });
  } catch (err) {
    console.error('GET /api/buyer-sellers error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch buyer sellers' });
  }
});

module.exports = router;
