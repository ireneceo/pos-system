// /api/brands 라우트 barrel — 2026-05-03 분리
// - brands-core.js  : brand 자체 CRUD + company-info + payment-settings + restaurants + franchise-map + staff + allowed-routes + franchise-dashboard
// - brands-plans.js : subscription + plans + plan-restaurants + prices + revenue + invoice-preview + generate-invoices + subscriptions list + sales-trend
//
// 라우트 순서: 동일 method/path 가 한 sub-router 에만 존재 → mount 순서 무관.

const express = require('express');
const router = express.Router();

router.use(require('./brands-core'));
router.use(require('./brands-plans'));

module.exports = router;
