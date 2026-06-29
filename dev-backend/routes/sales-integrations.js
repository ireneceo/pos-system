const express = require('express');
const router = express.Router();
const { RestaurantSalesIntegration } = require('../models');
const { authenticateToken } = require('../middleware/auth');
const { encrypt } = require('../utils/encryption');
const mallSalesService = require('../services/mallSalesService');

/**
 * 입점몰 매출보고 API 연동 설정 CRUD + 수동 트리거(연결테스트/지금전송).
 * 자격증명(password)은 암호화 저장, 응답엔 절대 평문 노출 안 함(password_set 불리언만).
 * 권한: System Admin(전체) / Restaurant Admin(자기 매장만). Staff 불가(민감 자격증명).
 */

// 매장 접근 가드 — restaurant_id 는 query/body/대상행에서 해석.
async function accessGuard(req, res, next) {
  try {
    const role = req.user.role;
    if (role !== 'System Admin' && role !== 'Restaurant Admin') {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }
    // 대상 행이 있으면 행의 restaurant_id 로 소유권 확인
    let restaurantId = parseInt(req.query.restaurant_id || req.body.restaurant_id);
    if (req.params.id) {
      const row = await RestaurantSalesIntegration.findByPk(req.params.id);
      if (!row) return res.status(404).json({ success: false, message: 'Integration not found' });
      req.integration = row;
      restaurantId = row.restaurant_id;
    }
    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    }
    if (role === 'Restaurant Admin' && parseInt(req.user.restaurant_id) !== parseInt(restaurantId)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    req.restaurantId = parseInt(restaurantId);
    next();
  } catch (e) {
    console.error('[SalesIntegrations] access check error:', e.message);
    return res.status(500).json({ success: false, message: 'Access check failed' });
  }
}

// 응답 직렬화 — password_enc 제거, password_set 불리언만.
function serialize(row) {
  const o = row.toJSON ? row.toJSON() : row;
  const { password_enc, ...rest } = o;
  return { ...rest, password_set: !!password_enc };
}

// 수정 허용 필드(평문). password 는 별도 처리. restaurant_id/provider 는 생성 시 고정.
const EDITABLE = [
  'mall_name', 'mall_operator', 'environment', 'token_url', 'sales_url',
  'machine_id', 'user_id', 'gst_registered', 'cadence', 'send_window_days', 'enabled'
];

function applyEditable(target, body) {
  for (const k of EDITABLE) {
    if (body[k] !== undefined) target[k] = body[k];
  }
  // password 가 비어있지 않게 들어오면 암호화 갱신(빈 문자열/미전송 = 기존 보존).
  if (typeof body.password === 'string' && body.password.length > 0) {
    target.password_enc = encrypt(body.password);
  }
}

// GET /api/sales-integrations?restaurant_id=16 — 매장 연동 목록
router.get('/', authenticateToken, accessGuard, async (req, res) => {
  try {
    const rows = await RestaurantSalesIntegration.findAll({
      where: { restaurant_id: req.restaurantId },
      order: [['id', 'ASC']]
    });
    res.json({ success: true, data: rows.map(serialize) });
  } catch (e) {
    console.error('[SalesIntegrations] list error:', e.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/sales-integrations — 신규 연동 생성
router.post('/', authenticateToken, accessGuard, async (req, res) => {
  try {
    const row = RestaurantSalesIntegration.build({
      restaurant_id: req.restaurantId,
      provider: req.body.provider || 'tangent_synthesis'
    });
    applyEditable(row, req.body);
    await row.save();
    res.json({ success: true, data: serialize(row) });
  } catch (e) {
    console.error('[SalesIntegrations] create error:', e.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// PUT /api/sales-integrations/:id — 수정
router.put('/:id', authenticateToken, accessGuard, async (req, res) => {
  try {
    const row = req.integration;
    applyEditable(row, req.body);
    await row.save();
    res.json({ success: true, data: serialize(row) });
  } catch (e) {
    console.error('[SalesIntegrations] update error:', e.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// DELETE /api/sales-integrations/:id
router.delete('/:id', authenticateToken, accessGuard, async (req, res) => {
  try {
    await req.integration.destroy();
    res.json({ success: true });
  } catch (e) {
    console.error('[SalesIntegrations] delete error:', e.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// POST /api/sales-integrations/:id/test — 연결 테스트(토큰만 발급)
router.post('/:id/test', authenticateToken, accessGuard, async (req, res) => {
  try {
    await mallSalesService.fetchToken(req.integration);
    res.json({ success: true, message: 'Connection OK (token acquired)' });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
});

// POST /api/sales-integrations/:id/send-now — 수동 전송(최근 N일)
router.post('/:id/send-now', authenticateToken, accessGuard, async (req, res) => {
  try {
    const days = req.body.days ? parseInt(req.body.days) : undefined;
    const result = await mallSalesService.sendForRestaurant(req.integration, { days });
    const hadFailure = result.failed.length > 0;
    await req.integration.update({
      last_run_at: new Date(),
      last_status: hadFailure ? (result.sent.length ? 'partial' : 'error') : 'success',
      last_error: hadFailure ? result.failed.map(f => `${f.date}: ${f.error}`).join(' | ').slice(0, 1000) : null
    });
    res.json({ success: true, data: result });
  } catch (e) {
    console.error('[SalesIntegrations] send-now error:', e.message);
    res.status(400).json({ success: false, message: e.message });
  }
});

// GET /api/sales-integrations/:id/preview?date=YYYY-MM-DD — 전송 미리보기(전송 안 함)
router.get('/:id/preview', authenticateToken, accessGuard, async (req, res) => {
  try {
    const { Restaurant } = require('../models');
    const restaurant = await Restaurant.findByPk(req.integration.restaurant_id, {
      attributes: ['id', 'name', 'operation_settings', 'floor_plan']
    });
    const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
    const dateStr = req.query.date || new Date().toLocaleDateString('en-CA', { timeZone: tz });
    const agg = await mallSalesService.aggregateDay(restaurant, dateStr);
    const sales = mallSalesService.buildSalesPayload(req.integration, dateStr, agg);
    res.json({ success: true, data: { date: dateStr, orders: agg.orderCount, sales } });
  } catch (e) {
    console.error('[SalesIntegrations] preview error:', e.message);
    res.status(400).json({ success: false, message: e.message });
  }
});

module.exports = router;
