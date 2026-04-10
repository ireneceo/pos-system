// /api/orders 라우트 barrel
// - orders-crud.js   : 주문 CRUD + 아이템/병합
// - orders-views.js  : 레스토랑/주방/테이블/분석 뷰
// - orders-payment.js: Stripe/PayPal 결제
//
// 마운트 순서 무관 — 세 파일 간 경로 충돌 없음 (세그먼트 길이/리터럴로 분리됨).

const express = require('express');
const router = express.Router();

router.use(require('./orders-crud'));
router.use(require('./orders-views'));
router.use(require('./orders-payment'));

module.exports = router;
