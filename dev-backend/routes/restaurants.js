// /api/restaurants 라우트 barrel
// - restaurants-crud.js         : list/get/create/update/delete + 보조 조회
// - restaurants-subscription.js : subscription-status, /subscriptions/*
// - restaurants-ingredients.js  : /:rid/ingredients/*
// - inventory-routes.js         : /:rid/inventory/* (기존 파일)
//
// 마운트 순서: subscription 먼저 (/subscription-status가 /:id보다 먼저 매칭되어야 함).

const express = require('express');
const router = express.Router();

router.use(require('./restaurants-subscription'));
router.use(require('./restaurants-crud'));
router.use(require('./restaurants-ingredients'));
router.use('/', require('./inventory-routes'));

module.exports = router;
