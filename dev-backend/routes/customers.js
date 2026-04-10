// /api/customers 라우트 barrel
// 마운트 순서가 중요 — path 충돌 회피:
//   1) customers-self  : /stats/:cid, /:cid/orders (literal/specific first)
//   2) customers-auth  : /verify-reset-token, /auth, /register 등 (literal)
//   3) customers-admin : /:restaurantId, /:restaurantId/:cid (catch-all param last)
//
// 구 단일 파일은 이 3개로 분리됨. 진입점은 여전히 /api/customers.

const express = require('express');
const router = express.Router();

router.use(require('./customers-self'));
router.use(require('./customers-auth'));
router.use(require('./customers-admin'));

module.exports = router;
