/**
 * Autoprint diagnostic endpoints.
 *
 * GET /preview/:restaurantId — for the last N orders, show per-station
 *   breakdown of what would print (using the SAME bucketing logic the
 *   frontend uses) + warnings for known traps (station has items but
 *   printer not configured / items with no station id).
 *
 * Purpose: visual confirmation before a customer order arrives that the
 *   auto-print routing actually distributes items to the right station
 *   printers. Catches config drift even when code is fine.
 */
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const KitchenStation = require('../models/KitchenStation');

function parseItems(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return [];
}

// Mirror of frontend printKitchenTicketsByStation > bucketItemsByStation
// (dev-frontend/src/utils/billPrint.js around line 3037).
// Keep both in sync when changing bucketing behavior.
function bucketItemsByStation(items, stationPrinters) {
  const stationItems = {};
  const unmappedItems = [];
  items.forEach(item => {
    const sid = item.kitchen_station_id
      || (item.menuItem && item.menuItem.kitchen_station_id)
      || null;
    if (sid && stationPrinters[sid]) {
      stationItems[sid] = stationItems[sid] || [];
      stationItems[sid].push(item);
    } else {
      unmappedItems.push(item);
    }
  });
  const mappedIds = Object.keys(stationItems);
  if (mappedIds.length > 0 && unmappedItems.length > 0) {
    stationItems[mappedIds[0]] = [...stationItems[mappedIds[0]], ...unmappedItems];
  }
  return { stationItems, unmappedItems };
}

router.get('/preview/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'restaurantId required' });
    }
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== restaurantId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const limit = Math.min(parseInt(req.query.limit || 5, 10) || 5, 20);

    const restaurant = await Restaurant.findByPk(restaurantId, {
      attributes: ['id', 'name', 'printer_settings']
    });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    const printerSettings = restaurant.printer_settings || {};
    const stationPrinters = printerSettings.kitchenStationPrinters || {};

    const stations = await KitchenStation.findAll({
      where: { restaurant_id: restaurantId },
      attributes: ['id', 'name', 'is_active']
    });
    const stationById = new Map(stations.map(s => [Number(s.id), s.toJSON()]));

    const orders = await Order.findAll({
      where: { restaurant_id: restaurantId },
      order: [['createdAt', 'DESC']],
      limit
    });

    const previews = orders.map(o => {
      const order = o.toJSON();
      const items = parseItems(order.order_items);
      const { stationItems, unmappedItems } = bucketItemsByStation(items, stationPrinters);

      const stationsBreakdown = Object.keys(stationItems).map(sid => {
        const sidNum = Number(sid);
        const sp = stationPrinters[sid] || {};
        const dbStation = stationById.get(sidNum);
        return {
          stationId: sidNum,
          stationName: sp.stationName || dbStation?.name || `Station #${sid}`,
          printerName: sp.name || null,
          printerAddress: sp.address || null,
          method: sp.method || null,
          items: stationItems[sid].map(it => ({
            name: it.menuItem?.name || it.name || 'Item',
            quantity: it.quantity || 1,
            kitchen_station_id: it.kitchen_station_id || null,
            options: Array.isArray(it.options) ? it.options : []
          }))
        };
      });

      // Warnings: items tagged with station X but printerSettings[X] missing
      const warnings = [];
      const taggedStations = new Set();
      items.forEach(it => { if (it.kitchen_station_id) taggedStations.add(Number(it.kitchen_station_id)); });
      taggedStations.forEach(sid => {
        if (!stationPrinters[sid]) {
          const dbStation = stationById.get(sid);
          warnings.push({
            type: 'station_no_printer',
            stationId: sid,
            stationName: dbStation?.name || `Station #${sid}`,
            message: `${dbStation?.name || 'Station #' + sid} has no printer configured — its items are absorbed into the first station and printed there`
          });
        }
      });

      // Warning: items with no kitchen_station_id at all
      const orphans = items.filter(it => !it.kitchen_station_id && !(it.menuItem && it.menuItem.kitchen_station_id));
      if (orphans.length > 0) {
        warnings.push({
          type: 'unmapped_items',
          count: orphans.length,
          itemNames: orphans.map(it => it.menuItem?.name || it.name || '(unnamed)').slice(0, 8),
          message: `${orphans.length} item(s) have no station assigned — station mapping is required at the category or menu level`
        });
      }

      // Warning: only 1 station configured but multiple stations exist in DB
      const activeStations = stations.filter(s => s.is_active !== false);
      const configuredStationIds = Object.keys(stationPrinters);
      if (activeStations.length > configuredStationIds.length) {
        const missing = activeStations.filter(s => !stationPrinters[String(s.id)]);
        if (missing.length > 0) {
          warnings.push({
            type: 'station_drift',
            count: missing.length,
            stationNames: missing.map(s => s.name),
            message: `This restaurant has ${activeStations.length} station(s) registered but only ${configuredStationIds.length} have a printer configured. Items for unconfigured stations are absorbed into the first station.`
          });
        }
      }

      return {
        orderId: order.id,
        orderNumber: order.order_number,
        tableNumber: order.table_number,
        source: order.source,
        orderType: order.order_type,
        paymentStatus: order.payment_status,
        createdAt: order.createdAt,
        totalAmount: order.total_amount,
        totalItems: items.length,
        stations: stationsBreakdown,
        unmappedItemCount: unmappedItems.length,
        warnings
      };
    });

    res.json({
      success: true,
      data: {
        restaurant: { id: restaurant.id, name: restaurant.name },
        configuredStationCount: Object.keys(stationPrinters).length,
        dbActiveStationCount: stations.filter(s => s.is_active !== false).length,
        previews
      }
    });
  } catch (e) {
    console.error('[autoprint-diagnostic/preview] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// ─── Self-heal endpoints ─────────────────────────────────────────────
// Each one targets a SPECIFIC failure mode that has bitten the store.
// They are explicit (user clicks a button), idempotent, and audited.

const { Op } = require('sequelize');

// POST /clear-stuck-print-flags/:restaurantId
// Clears needs_print/needs_bill on orders older than X minutes.
// Failure mode: PATCH /printed never fires (browser closed mid-print,
// network drop) → flag stuck forever → polling re-attempts indefinitely.
router.post('/clear-stuck-print-flags/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurantId required' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== restaurantId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const minutesOld = Math.min(parseInt(req.body?.minutesOld || 60, 10) || 60, 24 * 60);
    const cutoff = new Date(Date.now() - minutesOld * 60 * 1000);

    const stuck = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        [Op.or]: [{ needs_print: true }, { needs_bill: true }],
        createdAt: { [Op.lt]: cutoff }
      },
      attributes: ['id', 'order_number']
    });

    if (stuck.length === 0) {
      return res.json({ success: true, data: { cleared: 0, message: 'No stale stuck flags' } });
    }

    const ids = stuck.map(o => o.id);
    await Order.update({ needs_print: false, needs_bill: false }, { where: { id: ids } });
    res.json({
      success: true,
      data: {
        cleared: ids.length,
        orderIds: ids,
        orderNumbers: stuck.map(o => o.order_number),
        message: `Cleared stuck print flags on ${ids.length} order(s)`
      }
    });
  } catch (e) {
    console.error('[autoprint-diagnostic/clear-stuck] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST /seed-missing-printer-configs/:restaurantId
// For every active station in DB without an entry in printer_settings.kitchenStationPrinters,
// add a placeholder entry (method=browser, no IP) so the routing layer at least
// recognizes the station id. Without this, items tagged with the missing station
// silently merge into the first configured station. The placeholder still requires
// the user to set a real printer IP afterward, but it stops the silent-merge bug
// from biting between station creation and printer assignment.
router.post('/seed-missing-printer-configs/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurantId required' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== restaurantId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'printer_settings'] });
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    const stations = await KitchenStation.findAll({
      where: { restaurant_id: restaurantId, is_active: true },
      attributes: ['id', 'name']
    });

    const printerSettings = restaurant.printer_settings || {};
    const stationPrinters = { ...(printerSettings.kitchenStationPrinters || {}) };
    const seeded = [];
    stations.forEach(s => {
      const key = String(s.id);
      if (!stationPrinters[key]) {
        stationPrinters[key] = {
          name: '',                  // user fills in
          stationName: s.name,
          address: '',
          method: 'browser',         // safe default — fires browser print dialog
          autoPrint: false,          // explicit opt-in
          _seededAt: new Date().toISOString(),
          _seededBy: req.user.id
        };
        seeded.push({ stationId: s.id, stationName: s.name });
      }
    });

    if (seeded.length === 0) {
      return res.json({ success: true, data: { seeded: 0, message: 'All active stations have a printer configured' } });
    }

    await restaurant.update({
      printer_settings: { ...printerSettings, kitchenStationPrinters: stationPrinters }
    });

    res.json({
      success: true,
      data: {
        seeded: seeded.length,
        stations: seeded,
        message: `Seeded placeholder configs for ${seeded.length} station(s) — enter the printer IP in Settings`
      }
    });
  } catch (e) {
    console.error('[autoprint-diagnostic/seed-missing] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
