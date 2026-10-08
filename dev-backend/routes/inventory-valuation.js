// 매장 재고 총액 · 원가 측정 준비도 (2026-10-08 · Fable 판정 Ⅱ-3-A·F) — 계산은 services/inventoryValuation 한 곳
//   /api/restaurants 마운트(inventory-routes barrel) — 같은 요금제 게이트·같은 :restaurantId 접근 검사 아래 둔다.
const express = require('express');
const router = express.Router();
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { restaurantValuation, restaurantReadiness } = require('../services/inventoryValuation');

router.get('/:restaurantId/inventory/valuation', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    res.json({ success: true, data: await restaurantValuation(parseInt(req.params.restaurantId, 10)) });
  } catch (error) {
    console.error('inventory valuation error:', error);
    res.status(500).json({ success: false, message: 'Failed to compute inventory value' });
  }
});

router.get('/:restaurantId/inventory/readiness', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    res.json({ success: true, data: await restaurantReadiness(parseInt(req.params.restaurantId, 10)) });
  } catch (error) {
    console.error('inventory readiness error:', error);
    res.status(500).json({ success: false, message: 'Failed to compute cost readiness' });
  }
});

module.exports = router;
