// /api/foodcourts 라우트 barrel — 2026-05-03 분리
// - foodcourts-core.js  : foodcourt 자체 CRUD + tenancy-map + company-info + restaurants + payment-settings + staff + allowed-routes + tenancy-dashboard
// - foodcourts-plans.js : subscription + plans + plan-restaurants + prices + revenue + invoice-preview + generate-invoices + subscriptions list + sales-trend
//
// 라우트 순서: 동일 method/path 가 한 sub-router 에만 존재 → mount 순서 무관.

const express = require('express');
const router = express.Router();

router.use(require('./foodcourts-core'));
router.use(require('./foodcourts-plans'));

module.exports = router;
