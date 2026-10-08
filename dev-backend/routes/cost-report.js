// 기간 원가 · 폐기 리포트 (2026-10-08 · Fable 판정 Ⅱ-3-B·D) — 계산은 services/foodCostReport 한 곳
//   원가·마진은 관리 정보라 Staff 는 못 본다(재고 숫자를 통째로 바꾸는 권한과 같은 선 — inventory-core requireStockManager).
//   장부 금액이 없는 매장(재고 모듈 없음)엔 의미가 없으므로 재고 모듈 게이트 아래 둔다.
//   ⚠ router.use 는 경로를 붙여서만 쓴다 — 경로 없는 router.use 가드는 /api 전체로 샌다(메모리 reference_router_use_leaks_to_api_root).
const express = require('express');
const router = express.Router();
const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const { restaurantFoodCost, restaurantWaste } = require('../services/foodCostReport');

const COST_VIEW_ROLES = ['System Admin', 'Restaurant Admin', 'Restaurant Owner', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager'];
const guard = [authenticateToken, checkRestaurantAccess, requireRole(...COST_VIEW_ROLES), requireRestaurantModule('inventory_management', 'restaurantId')];

const handle = (fn, label) => async (req, res) => {
  try {
    const data = await fn(parseInt(req.params.restaurantId, 10), req.query.start, req.query.end);
    res.json({ success: true, data });
  } catch (error) {
    if (error.status === 400) return res.status(400).json({ success: false, message: error.message });
    console.error(`${label} error:`, error);
    res.status(500).json({ success: false, message: `Failed to build ${label}` });
  }
};

router.get('/:restaurantId/reports/food-cost', ...guard, handle(restaurantFoodCost, 'food cost report'));
router.get('/:restaurantId/reports/waste', ...guard, handle(restaurantWaste, 'waste report'));

module.exports = router;
