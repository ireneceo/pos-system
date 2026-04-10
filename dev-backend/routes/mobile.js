// /api/mobile 라우트 barrel
// - mobile-public.js : 조회 (verify-qr, store, menu, payment/methods, auth/guest, featured, popular)
// - mobile-orders.js : 주문/결제 (cart, order, orders, order/:id, retry-payment, cancel, payment/intent, payment/confirm)
// - mobile-helpers.js: 공유 헬퍼 (parseImageData, generateOrderNumber, 카테고리 이모지 등)
//
// 마운트 순서는 무관 — 두 파일 간 경로 충돌 없음.

const express = require('express');
const router = express.Router();

router.use(require('./mobile-public'));
router.use(require('./mobile-orders'));

module.exports = router;
