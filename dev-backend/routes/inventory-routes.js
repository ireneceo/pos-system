// /api/restaurants 마운트의 inventory 관련 barrel — 2026-05-03 분리
// - inventory-core.js  : inventory CRUD + alerts + transactions + stock-takes + reorder + expiring
// - inventory-extra.js : general-stock + par-level + batches + deduct/dispose
//
// 라우트 순서: 동일 method/path 가 한 sub-router 에만 존재 → mount 순서 무관.

const express = require('express');
const router = express.Router();

// Tier gate (P0-3, 2026-06-08): restaurant inventory is an Advanced-tier feature
// (inventory_management module — Enterprise plan, or granted via brand/foodcourt
// plan; see resolveRestaurantModules). Scoped strictly to the inventory +
// stock-take path prefixes so unrelated /api/restaurants/:id/* routes that fall
// through this barrel (table-qr, etc.) are NOT affected. authenticateToken runs
// first here (idempotent with inventory-core's) so the gate has req.user.
const { authenticateToken } = require('../middleware/auth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const inventoryGate = requireRestaurantModule('inventory_management', 'restaurantId');
router.use('/:restaurantId/inventory', authenticateToken, inventoryGate);
router.use('/:restaurantId/stock-takes', authenticateToken, inventoryGate);

router.use(require('./inventory-core'));
router.use(require('./inventory-extra'));

module.exports = router;
