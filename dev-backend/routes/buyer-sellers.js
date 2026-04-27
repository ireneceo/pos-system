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
const {
  SupplierContract,
  SupplierCompany,
  Brand,
  Foodcourt,
  Restaurant
} = require('../models');
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

    const sellers = [];

    // 1. Suppliers — every active contract
    const contracts = await SupplierContract.findAll({
      where: {
        entity_type: buyer.type,
        entity_id: buyer.id,
        status: 'active'
      }
    });
    if (contracts.length > 0) {
      const supplierIds = contracts.map(c => c.supplier_company_id);
      const suppliers = await SupplierCompany.findAll({
        where: { id: supplierIds },
        attributes: ['id', 'name', 'logo_url', 'company_name', 'trade_name']
      });
      const supplierById = new Map(suppliers.map(s => [s.id, s]));
      for (const c of contracts) {
        const s = supplierById.get(c.supplier_company_id);
        if (!s) continue;
        sellers.push({
          seller_type: 'supplier',
          seller_id: s.id,
          name: s.trade_name || s.name || s.company_name,
          logo_url: s.logo_url || null,
          contract_id: c.id
        });
      }
    }

    // 2. Brand / Foodcourt — only Restaurant buyer
    if (buyer.type === 'restaurant') {
      const restaurant = await Restaurant.findByPk(buyer.id, {
        attributes: ['id', 'brand_id', 'foodcourt_id']
      });
      if (restaurant) {
        if (restaurant.brand_id) {
          const brand = await Brand.findByPk(restaurant.brand_id, {
            attributes: ['id', 'name', 'logo_url', 'trade_name']
          });
          if (brand) {
            sellers.push({
              seller_type: 'brand',
              seller_id: brand.id,
              name: brand.trade_name || brand.name,
              logo_url: brand.logo_url || null,
              contract_id: null
            });
          }
        }
        if (restaurant.foodcourt_id) {
          const fc = await Foodcourt.findByPk(restaurant.foodcourt_id, {
            attributes: ['id', 'name', 'logo_url', 'trade_name']
          });
          if (fc) {
            sellers.push({
              seller_type: 'foodcourt',
              seller_id: fc.id,
              name: fc.trade_name || fc.name,
              logo_url: fc.logo_url || null,
              contract_id: null
            });
          }
        }
      }
    }

    // 3. System Admin — POS catalog (always available)
    sellers.push({
      seller_type: 'system_admin',
      seller_id: null,
      name: 'POS Catalog',
      logo_url: null,
      contract_id: null
    });

    res.json({ success: true, data: sellers });
  } catch (err) {
    console.error('GET /api/buyer-sellers error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch buyer sellers' });
  }
});

module.exports = router;
