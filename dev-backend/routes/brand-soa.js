/**
 * Brand-side SOA (Statement of Account) endpoints — BG → Restaurant trade flow.
 *
 * Mirror of routes/supplier.js SOA flow but issuer_type='brand', issuer_id=brand.id.
 * Buyer (Restaurant) is identified by Restaurant.id (with brand_billing_terms set).
 *
 * Endpoints:
 *   GET  /api/brand/soa/current
 *     → Aggregate unpaid trade invoices issued by THIS brand to its restaurants
 *       whose brand_billing_terms.invoice_cycle === 'monthly_soa'.
 *       Grouped by restaurant.
 *
 *   POST /api/brand/soa/:restaurantId/remind
 *     → Send a reminder email to that restaurant's recipients (Admin + Owner).
 *       Uses 'monthly_soa' notification category.
 *
 * Auth: authenticateToken + requireBrandScope.
 *  - BG/Brand Manager → resolved to user's owned brand IDs.
 *  - System Admin → can override via ?brand_id=N (otherwise unfiltered).
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  Invoice,
  InvoiceItem,
  Restaurant,
  Brand
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { requireBrandScope } = require('../middleware/brandScope');
const {
  sendNotificationBatch,
  getRestaurantAdminAndOwnerIds
} = require('../utils/notificationService');

const FRONTEND_BASE_URL = process.env.FRONTEND_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

/**
 * Resolve which brand id(s) this request operates on.
 * Returns array of brand ids (length 1 for BG with explicit brand, or all owned).
 */
function brandIdsFromScope(req) {
  const scope = req.brandScope;
  if (scope.isAdmin) {
    return scope.brandId != null ? [scope.brandId] : null; // null = all brands
  }
  return scope.brandId != null ? [scope.brandId] : scope.ownedBrandIds;
}

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/brand/soa/current
// ──────────────────────────────────────────────────────────────────────────────
router.get(
  '/brand/soa/current',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const brandIds = brandIdsFromScope(req);

      // 1. Find this brand's restaurants whose brand_billing_terms.invoice_cycle === 'monthly_soa'
      const restaurantWhere = {};
      if (brandIds) restaurantWhere.brand_id = brandIds;
      const restaurants = await Restaurant.findAll({
        where: restaurantWhere,
        attributes: ['id', 'name', 'brand_id', 'brand_billing_terms']
      });

      const monthlyRestaurants = restaurants.filter(r =>
        r.brand_billing_terms?.invoice_cycle === 'monthly_soa'
      );
      if (monthlyRestaurants.length === 0) {
        return res.json({ success: true, data: { groups: [] } });
      }

      const restaurantIds = monthlyRestaurants.map(r => r.id);
      const brandIdsInUse = [...new Set(monthlyRestaurants.map(r => r.brand_id))];

      // 2. Fetch unpaid trade invoices issued by these brands to these restaurants
      const invoices = await Invoice.findAll({
        where: {
          invoice_category: 'trade',
          issuer_type: 'brand',
          issuer_id: brandIdsInUse,
          payer_type: 'restaurant',
          payer_id: restaurantIds,
          status: { [Op.in]: ['pending_payment', 'overdue', 'pending'] }
        },
        include: [{ model: InvoiceItem, as: 'items' }],
        order: [['payer_id', 'ASC'], ['createdAt', 'DESC']]
      });

      // 3. Group by restaurant (payer_id)
      const restaurantById = new Map(monthlyRestaurants.map(r => [r.id, r]));
      const grouped = new Map();
      for (const inv of invoices) {
        const restaurant = restaurantById.get(inv.payer_id);
        if (!restaurant) continue;
        // Ensure invoice issuer matches the restaurant's brand
        if (inv.issuer_id !== restaurant.brand_id) continue;

        const key = `r:${restaurant.id}`;
        if (!grouped.has(key)) {
          grouped.set(key, {
            seller_type: 'brand',
            seller_id: restaurant.brand_id,
            buyer: {
              entity_type: 'restaurant',
              entity_id: restaurant.id,
              name: restaurant.name
            },
            payment_terms: restaurant.brand_billing_terms || null,
            invoices: [],
            subtotal: 0,
            total: 0,
            count: 0,
            currency: inv.currency || restaurant.brand_billing_terms?.currency || 'MYR'
          });
        }
        const g = grouped.get(key);
        g.invoices.push(inv.toJSON());
        g.subtotal += Number(inv.subtotal || 0);
        g.total += Number(inv.total_amount || 0);
        g.count += 1;
      }

      for (const g of grouped.values()) {
        g.subtotal = Math.round(g.subtotal * 100) / 100;
        g.total = Math.round(g.total * 100) / 100;
      }

      res.json({ success: true, data: { groups: Array.from(grouped.values()) } });
    } catch (err) {
      console.error('GET /api/brand/soa/current error:', err);
      res.status(500).json({ success: false, message: 'Failed to load SOA' });
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/brand/soa/:restaurantId/remind
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/brand/soa/:restaurantId/remind',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const restaurantId = parseInt(req.params.restaurantId, 10);
      if (!Number.isFinite(restaurantId)) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
      const brandIds = brandIdsFromScope(req);

      const restaurant = await Restaurant.findByPk(restaurantId, {
        attributes: ['id', 'name', 'brand_id', 'admin_id', 'brand_billing_terms']
      });
      if (!restaurant || !restaurant.brand_id) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
      if (brandIds && !brandIds.includes(restaurant.brand_id)) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }

      // Fetch unpaid invoices
      const invoices = await Invoice.findAll({
        where: {
          invoice_category: 'trade',
          issuer_type: 'brand',
          issuer_id: restaurant.brand_id,
          payer_type: 'restaurant',
          payer_id: restaurant.id,
          status: { [Op.in]: ['pending_payment', 'overdue', 'pending'] }
        }
      });
      if (invoices.length === 0) {
        return res.status(400).json({ success: false, message: 'No unpaid invoices to remind' });
      }

      const totalDue = invoices.reduce((s, i) => s + Number(i.total_amount || 0), 0);
      const currency = invoices[0]?.currency || 'MYR';

      // Recipients = Restaurant Admin + Restaurant Owner
      const recipients = new Set(await getRestaurantAdminAndOwnerIds(restaurant.id));

      if (recipients.size === 0) {
        return res.status(400).json({ success: false, message: 'No recipients found' });
      }

      const brand = await Brand.findByPk(restaurant.brand_id, { attributes: ['name'] });
      const sellerName = brand?.name || 'Brand';
      const link = `${FRONTEND_BASE_URL}/restaurant/${restaurant.id}/trade-invoices`;
      const html = `
        <p>This is a friendly reminder that you have <strong>${invoices.length} unpaid invoice${invoices.length > 1 ? 's' : ''}</strong> from ${sellerName}.</p>
        <p><strong>Total due:</strong> ${currency} ${totalDue.toFixed(2)}</p>
        <p><a href="${link}">View invoices in Purple POS</a></p>
      `;

      await sendNotificationBatch(Array.from(recipients), 'monthly_soa', {
        subject: `[Reminder] Unpaid invoices from ${sellerName}`,
        html
      });

      res.json({
        success: true,
        data: { recipientCount: recipients.size, invoiceCount: invoices.length }
      });
    } catch (err) {
      console.error('POST /api/brand/soa/:id/remind error:', err);
      res.status(500).json({ success: false, message: 'Failed to send reminder' });
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/brand/soa/:restaurantId/generate
// On-demand monthly statement — bundle this restaurant's currently-unbundled brand
// trade invoices into a SOA NOW (instead of waiting for the 1st-of-month cron).
// Idempotent: only unbundled invoices are picked. (2026-06-15)
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/brand/soa/:restaurantId/generate',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const restaurantId = parseInt(req.params.restaurantId, 10);
      if (!Number.isFinite(restaurantId)) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
      const brandIds = brandIdsFromScope(req);
      const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'brand_id'] });
      if (!restaurant || !restaurant.brand_id) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
      if (brandIds && !brandIds.includes(restaurant.brand_id)) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }

      const { generateSoaNow } = require('../services/soaScheduler');
      const result = await generateSoaNow({ issuerType: 'brand', issuerId: restaurant.brand_id, restaurantId });
      if (!result.issued) {
        const msg = result.reason === 'no_invoices'
          ? 'No unbilled invoices to statement (nothing outstanding to bundle).'
          : (result.reason === 'no_recipients' ? 'No recipients to notify.' : 'Could not generate statement.');
        return res.status(400).json({ success: false, code: result.reason, message: msg });
      }
      res.json({ success: true, data: { soa_invoice_id: result.soaId } });
    } catch (err) {
      console.error('POST /api/brand/soa/:id/generate error:', err);
      res.status(500).json({ success: false, message: 'Failed to generate statement' });
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/brand/trade-invoices
// List trade invoices issued by this brand (across all its restaurants).
// Used by BG/Brand Manager TradeInvoicesPage. Mirrors supplier trade invoice list.
// ──────────────────────────────────────────────────────────────────────────────
router.get(
  '/brand/trade-invoices',
  authenticateToken,
  requireBrandScope(),
  async (req, res) => {
    try {
      const brandIds = brandIdsFromScope(req);
      const where = {
        invoice_category: { [Op.in]: ['trade', 'soa'] },
        issuer_type: 'brand'
      };
      if (brandIds) where.issuer_id = brandIds;
      if (req.query.status && req.query.status !== 'all') where.status = req.query.status;
      if (req.query.from || req.query.to) {
        where.createdAt = {};
        if (req.query.from) where.createdAt[Op.gte] = new Date(req.query.from);
        if (req.query.to) where.createdAt[Op.lte] = new Date(req.query.to + 'T23:59:59.999Z');
      }

      const invoices = await Invoice.findAll({
        where,
        include: [{ model: InvoiceItem, as: 'items' }],
        order: [['createdAt', 'DESC']],
        limit: 500
      });

      // Resolve buyer name (Restaurant) for each invoice
      const restaurantIds = [...new Set(invoices
        .filter(i => i.payer_type === 'restaurant' && i.payer_id)
        .map(i => i.payer_id))];
      const restaurants = restaurantIds.length > 0
        ? await Restaurant.findAll({ where: { id: restaurantIds }, attributes: ['id', 'name'] })
        : [];
      const restaurantById = new Map(restaurants.map(r => [r.id, r]));

      const data = invoices.map(inv => {
        const obj = inv.toJSON();
        const r = inv.payer_type === 'restaurant' ? restaurantById.get(inv.payer_id) : null;
        obj.buyer_name = r?.name || null;
        obj.buyer_entity_type = inv.payer_type === 'restaurant' ? 'restaurant' : null;
        return obj;
      });

      res.json({ success: true, data });
    } catch (err) {
      console.error('GET /api/brand/trade-invoices error:', err);
      res.status(500).json({ success: false, message: 'Failed to load trade invoices' });
    }
  }
);

module.exports = router;
