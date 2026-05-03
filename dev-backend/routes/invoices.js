// /api/invoices 라우트 barrel
// - invoices-helpers.js     : 공유 헬퍼 (company-info, permission, invoiceInBranch 등)
// - invoices-list.js        : GET endpoints (list/get/categories list/to-pay/issued-by)
// - invoices-crud.js        : invoice CRUD + categories CRUD + settings + email + link-account + update-payer
// - invoices-generation.js  : auto/manual 인보이스 생성 (subscription/automatic/missing/bulk)
// - invoices-payment.js     : Stripe/PayPal/Manual 결제 흐름
//
// 라우트 순서: 동일 method/path 가 한 sub-router 에만 존재 → mount 순서 무관.
// 외부 모듈(routes/owner.js 등) 은 헬퍼를 ./invoices-helpers 에서 직접 require 권장,
// 하위 호환을 위해 이 배럴에서도 동일 헬퍼를 re-export한다.

const express = require('express');
const router = express.Router();

router.use(require('./invoices-list'));
router.use(require('./invoices-crud'));
router.use(require('./invoices-generation'));
router.use(require('./invoices-payment'));

module.exports = router;

// 하위 호환 — routes/owner.js가 기존에 `./invoices`에서 이 두 함수를 가져감
const helpers = require('./invoices-helpers');
module.exports.getIssuerCompanyInfo = helpers.getIssuerCompanyInfo;
module.exports.getPayerCompanyInfo = helpers.getPayerCompanyInfo;
