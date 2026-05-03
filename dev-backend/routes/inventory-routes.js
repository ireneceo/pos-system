// /api/restaurants 마운트의 inventory 관련 barrel — 2026-05-03 분리
// - inventory-core.js  : inventory CRUD + alerts + transactions + stock-takes + reorder + expiring
// - inventory-extra.js : general-stock + par-level + batches + deduct/dispose
//
// 라우트 순서: 동일 method/path 가 한 sub-router 에만 존재 → mount 순서 무관.

const express = require('express');
const router = express.Router();

router.use(require('./inventory-core'));
router.use(require('./inventory-extra'));

module.exports = router;
