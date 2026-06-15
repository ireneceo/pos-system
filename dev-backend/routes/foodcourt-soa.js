/**
 * Foodcourt-side SOA — FG → Restaurant trade flow.
 *
 * Mirror of brand-soa.js but issuer_type='foodcourt', issuer_id=foodcourt.id.
 * Buyer (Restaurant) identified by foodcourt_id + foodcourt_billing_terms.
 *
 * Endpoints:
 *   GET  /api/foodcourt/soa/current
 *   POST /api/foodcourt/soa/:restaurantId/remind
 */

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const {
  Invoice,
  InvoiceItem,
  Restaurant,
  Foodcourt
} = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const {
  sendNotificationBatch,
  getRestaurantOwnerIds
} = require('../utils/notificationService');
const { requireFoodcourtScope } = require('./entity-billing');

const FRONTEND_BASE_URL = process.env.FRONTEND_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://purplehere.com' : 'https://dev.purplehere.com');

function foodcourtIdsFromScope(req) {
  const scope = req.foodcourtScope;
  if (scope.isAdmin) {
    return scope.foodcourtId != null ? [scope.foodcourtId] : null;
  }
  return scope.foodcourtId != null ? [scope.foodcourtId] : scope.ownedFoodcourtIds;
}

// ──────────────────────────────────────────────────────────────────────────────
router.get(
  '/foodcourt/soa/current',
  authenticateToken,
  requireFoodcourtScope,
  async (req, res) => {
    try {
      const foodcourtIds = foodcourtIdsFromScope(req);

      const restaurantWhere = {};
      if (foodcourtIds) restaurantWhere.foodcourt_id = foodcourtIds;
      const restaurants = await Restaurant.findAll({
        where: restaurantWhere,
        attributes: ['id', 'name', 'foodcourt_id', 'foodcourt_billing_terms']
      });

      const monthlyRestaurants = restaurants.filter(r =>
        r.foodcourt_billing_terms?.invoice_cycle === 'monthly_soa'
      );
      if (monthlyRestaurants.length === 0) {
        return res.json({ success: true, data: { groups: [] } });
      }

      const restaurantIds = monthlyRestaurants.map(r => r.id);
      const fcIdsInUse = [...new Set(monthlyRestaurants.map(r => r.foodcourt_id))];

      const invoices = await Invoice.findAll({
        where: {
          invoice_category: 'trade',
          issuer_type: 'foodcourt',
          issuer_id: fcIdsInUse,
          payer_type: 'restaurant',
          payer_id: restaurantIds,
          status: { [Op.in]: ['pending_payment', 'overdue', 'pending'] }
        },
        include: [{ model: InvoiceItem, as: 'items' }],
        order: [['payer_id', 'ASC'], ['createdAt', 'DESC']]
      });

      const restaurantById = new Map(monthlyRestaurants.map(r => [r.id, r]));
      const grouped = new Map();
      for (const inv of invoices) {
        const restaurant = restaurantById.get(inv.payer_id);
        if (!restaurant) continue;
        if (inv.issuer_id !== restaurant.foodcourt_id) continue;

        const key = `r:${restaurant.id}`;
        if (!grouped.has(key)) {
          grouped.set(key, {
            seller_type: 'foodcourt',
            seller_id: restaurant.foodcourt_id,
            buyer: {
              entity_type: 'restaurant',
              entity_id: restaurant.id,
              name: restaurant.name
            },
            payment_terms: restaurant.foodcourt_billing_terms || null,
            invoices: [],
            subtotal: 0,
            total: 0,
            count: 0,
            currency: inv.currency || restaurant.foodcourt_billing_terms?.currency || 'MYR'
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
      console.error('GET /api/foodcourt/soa/current error:', err);
      res.status(500).json({ success: false, message: 'Failed to load SOA' });
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/foodcourt/soa/:restaurantId/remind',
  authenticateToken,
  requireFoodcourtScope,
  async (req, res) => {
    try {
      const restaurantId = parseInt(req.params.restaurantId, 10);
      if (!Number.isFinite(restaurantId)) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
      const foodcourtIds = foodcourtIdsFromScope(req);

      const restaurant = await Restaurant.findByPk(restaurantId, {
        attributes: ['id', 'name', 'foodcourt_id', 'foodcourt_billing_terms']
      });
      if (!restaurant || !restaurant.foodcourt_id) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }
      if (foodcourtIds && !foodcourtIds.includes(restaurant.foodcourt_id)) {
        return res.status(404).json({ success: false, message: 'Restaurant not found' });
      }

      const invoices = await Invoice.findAll({
        where: {
          invoice_category: 'trade',
          issuer_type: 'foodcourt',
          issuer_id: restaurant.foodcourt_id,
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

      const recipients = new Set();
      const admins = await sequelize.query(
        `SELECT id FROM users WHERE restaurant_id = :rid AND role = 'Restaurant Admin' AND email IS NOT NULL`,
        { replacements: { rid: restaurant.id }, type: QueryTypes.SELECT }
      );
      admins.forEach(a => recipients.add(a.id));
      const owners = await getRestaurantOwnerIds(restaurant.id);
      owners.forEach(id => recipients.add(id));

      if (recipients.size === 0) {
        return res.status(400).json({ success: false, message: 'No recipients found' });
      }

      const fc = await Foodcourt.findByPk(restaurant.foodcourt_id, { attributes: ['name'] });
      const sellerName = fc?.name || 'Foodcourt';
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
      console.error('POST /api/foodcourt/soa/:id/remind error:', err);
      res.status(500).json({ success: false, message: 'Failed to send reminder' });
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// POST /api/foodcourt/soa/:restaurantId/generate — 온디맨드 월명세서 (brand 미러). (2026-06-15)
// ──────────────────────────────────────────────────────────────────────────────
router.post(
  '/foodcourt/soa/:restaurantId/generate',
  authenticateToken,
  requireFoodcourtScope,
  async (req, res) => {
    try {
      const restaurantId = parseInt(req.params.restaurantId, 10);
      if (!Number.isFinite(restaurantId)) return res.status(404).json({ success: false, message: 'Restaurant not found' });
      const foodcourtIds = foodcourtIdsFromScope(req);
      const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'foodcourt_id'] });
      if (!restaurant || !restaurant.foodcourt_id) return res.status(404).json({ success: false, message: 'Restaurant not found' });
      if (foodcourtIds && !foodcourtIds.includes(restaurant.foodcourt_id)) return res.status(404).json({ success: false, message: 'Restaurant not found' });

      const { generateSoaNow } = require('../services/soaScheduler');
      const result = await generateSoaNow({ issuerType: 'foodcourt', issuerId: restaurant.foodcourt_id, restaurantId });
      if (!result.issued) {
        const msg = result.reason === 'no_invoices'
          ? 'No unbilled invoices to statement (nothing outstanding to bundle).'
          : (result.reason === 'no_recipients' ? 'No recipients to notify.' : 'Could not generate statement.');
        return res.status(400).json({ success: false, code: result.reason, message: msg });
      }
      res.json({ success: true, data: { soa_invoice_id: result.soaId } });
    } catch (err) {
      console.error('POST /api/foodcourt/soa/:id/generate error:', err);
      res.status(500).json({ success: false, message: 'Failed to generate statement' });
    }
  }
);

// ──────────────────────────────────────────────────────────────────────────────
// GET /api/foodcourt/trade-invoices
// ──────────────────────────────────────────────────────────────────────────────
router.get(
  '/foodcourt/trade-invoices',
  authenticateToken,
  requireFoodcourtScope,
  async (req, res) => {
    try {
      const foodcourtIds = foodcourtIdsFromScope(req);
      const where = {
        invoice_category: { [Op.in]: ['trade', 'soa'] },
        issuer_type: 'foodcourt'
      };
      if (foodcourtIds) where.issuer_id = foodcourtIds;
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
      console.error('GET /api/foodcourt/trade-invoices error:', err);
      res.status(500).json({ success: false, message: 'Failed to load trade invoices' });
    }
  }
);

module.exports = router;
