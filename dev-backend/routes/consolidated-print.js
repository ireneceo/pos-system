/**
 * Consolidated Order Ticket — independent print-state endpoints.
 *
 * Feature (2026-06-09, Irene): print the WHOLE order on a single ticket to a
 * configurable printer (e.g. a kitchen MAIN printer) ALONGSIDE the existing
 * per-station kitchen tickets. This is an ADDITIVE subsystem — it never touches
 * the existing auto-print / QZ-print path (billPrint.js, useAutoPrintPoller,
 * MainLayout, orders-crud pending-print, etc.). It tracks its own print-state via
 * orders.consolidated_printed_at so it can never interfere with the per-item
 * printed_at / needs_print cycle that drives station + bill printing.
 *
 *   GET   /api/consolidated-print/restaurant/:restaurantId/pending
 *         → recent orders with kitchen items that have NOT yet been
 *           consolidated-printed (consolidated_printed_at IS NULL). Enriched the
 *           same way pending-print is (station names) so the ticket renders right.
 *   PATCH /api/consolidated-print/:id/printed
 *         → stamp consolidated_printed_at = now (idempotent; prints exactly once).
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const Order = require('../models/Order');
const KitchenStation = require('../models/KitchenStation');

// Only surface RECENT unconsolidated orders so enabling the feature never floods
// the printer with historical orders. The client poller additionally ignores
// anything created before its own session start (mirrors the §8.7 backlog cutoff
// used by the kitchen poller).
const RECENT_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours

router.get('/restaurant/:restaurantId/pending', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurantId required' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== restaurantId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const since = new Date(Date.now() - RECENT_WINDOW_MS);
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        consolidated_printed_at: null,
        createdAt: { [Op.gte]: since }
      },
      order: [['createdAt', 'ASC']],
      limit: 20
    });

    // Station name resolution from the KitchenStation table (single source of
    // truth) — same approach pending-print uses, so the consolidated ticket shows
    // the correct inline station tags.
    const stations = await KitchenStation.findAll({
      where: { restaurant_id: restaurantId },
      attributes: ['id', 'name']
    });
    const stationNameById = new Map(stations.map(s => [Number(s.id), s.name]));
    const enrichItem = (it) => {
      const sid = it && it.kitchen_station_id ? Number(it.kitchen_station_id) : null;
      return { ...it, stationName: sid ? (stationNameById.get(sid) || null) : null };
    };

    const result = orders.map(o => {
      const plain = o.toJSON();
      const items = Array.isArray(plain.order_items)
        ? plain.order_items
        : (typeof plain.order_items === 'string' ? (() => { try { return JSON.parse(plain.order_items); } catch { return []; } })() : []);
      plain.order_items = items.map(enrichItem);
      return plain;
    })
    // Only orders that actually have kitchen-relevant items.
    .filter(o => Array.isArray(o.order_items) && o.order_items.length > 0);

    res.json({ success: true, data: result });
  } catch (e) {
    console.error('[consolidated-print/pending] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

router.patch('/:id/printed', authenticateToken, async (req, res) => {
  try {
    const o = await Order.findByPk(req.params.id);
    if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== parseInt(o.restaurant_id)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    // Idempotent — if already stamped, keep the original time (prints exactly once).
    if (!o.consolidated_printed_at) {
      await o.update({ consolidated_printed_at: new Date() });
    }
    res.json({ success: true, data: { id: o.id, consolidated_printed_at: o.consolidated_printed_at } });
  } catch (e) {
    console.error('[consolidated-print/printed] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
