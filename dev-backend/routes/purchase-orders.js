// /api/purchase-orders 라우트 barrel — 2026-05-03 분리
// - purchase-orders-crud.js     : list/get/suggestions/create/bulk/update/pdf
// - purchase-orders-workflow.js : mark-sent-external/upload-invoice/mark-received/submit/mark-shipped/receive/discrepancy/cancel
//
// 라우트 순서: 동일 method/path 가 한 sub-router 에만 존재 → mount 순서 무관.

const express = require('express');
const router = express.Router();

router.use(require('./purchase-orders-crud'));
router.use(require('./purchase-orders-workflow'));

module.exports = router;
