// /api/invoices 라우트 barrel
// - invoices-helpers.js : 공유 헬퍼 (company-info, permission 체크 등)
// - invoices-main.js    : list/CRUD/settings/categories/generation/email
// - invoices-payment.js : Stripe/PayPal/Manual 결제 흐름
//
// 마운트 순서 무관. routes/owner.js 등 외부 모듈은 헬퍼를 ./invoices-helpers 에서 직접 require 권장,
// 하위 호환을 위해 이 배럴에서도 동일 헬퍼를 re-export한다.

const express = require('express');
const router = express.Router();

router.use(require('./invoices-main'));
router.use(require('./invoices-payment'));

module.exports = router;

// 하위 호환 — routes/owner.js가 기존에 `./invoices`에서 이 두 함수를 가져감
const helpers = require('./invoices-helpers');
module.exports.getIssuerCompanyInfo = helpers.getIssuerCompanyInfo;
module.exports.getPayerCompanyInfo = helpers.getPayerCompanyInfo;
