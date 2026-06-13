// 주문 삭제/취소 감사 로그 — 사장 손실방지(anti-theft) 감시 리포트 전용 조회 API.
// 마운트: /api/order-audit
//
// 설계: docs/VOID_PIN_GATE_DESIGN.md §5 (Void & Cancellation Log)
//   - OrderAction (immutable audit) 에서 cancelled / item_removed 만 조회.
//   - Owner/Admin 전용 (직원이 자기 삭제 이력을 못 가리게).
//   - 현금 결제 완료 주문의 void/cancel = 가장 의심해야 할 패턴 → flag 로 노출.
//
// 🔒 인쇄 무관: 읽기 전용 조회. orders-crud(인쇄 파이프라인)와 분리된 파일.

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const OrderAction = require('../models/OrderAction');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { authenticateToken } = require('../middleware/auth');
const { getDateBounds, getRestaurantTimezone } = require('../utils/dateTimeHelper');

// 감사 리포트 접근 역할 — Owner/Admin 만 (Manager·Staff 제외: 본인 삭제 은폐 방지).
const AUDIT_VIEW_ROLES = ['Restaurant Admin', 'Restaurant Owner', 'System Admin'];
const AUDIT_ACTION_TYPES = ['cancelled', 'item_removed'];

// GET /api/order-audit/restaurant/:restaurantId/void-log
//   ?start=YYYY-MM-DD&end=YYYY-MM-DD&staffId=&paymentStatus=all|paid|unpaid&actionType=all|cancelled|item_removed
router.get('/restaurant/:restaurantId/void-log', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'restaurantId is required' });
    }

    // 역할 게이트 + 매장 소유권 (Owner/Admin 전용).
    const role = req.user?.role;
    if (!AUDIT_VIEW_ROLES.includes(role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    if (role !== 'System Admin' && Number(req.user?.restaurant_id) !== restaurantId) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'operation_settings'] });
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    const tz = getRestaurantTimezone(restaurant);

    // 필터 파라미터
    const { start, end, staffId, paymentStatus = 'all', actionType = 'all' } = req.query;

    const where = { restaurant_id: restaurantId };

    // action_type 필터 (기본 = cancelled + item_removed 둘 다)
    if (actionType !== 'all' && AUDIT_ACTION_TYPES.includes(actionType)) {
      where.action_type = actionType;
    } else {
      where.action_type = { [Op.in]: AUDIT_ACTION_TYPES };
    }

    // 기간 필터 (매장 타임존 기준 → UTC 경계로 변환)
    if (start || end) {
      const range = {};
      if (start) range[Op.gte] = getDateBounds(String(start), tz).startOfDay;
      if (end) range[Op.lte] = getDateBounds(String(end), tz).endOfDay;
      where.created_at = range;
    }

    // 직원(실행자) 필터
    if (staffId && !isNaN(parseInt(staffId, 10))) {
      where.performed_by_id = parseInt(staffId, 10);
    }

    const actions = await OrderAction.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit: 2000 // 안전 상한 — 기간 필터로 줄이는 게 정상.
    });

    // 주문 메타(주문번호/테이블/결제 폴백) batch fetch — OrderAction 에 association 없음.
    const orderIds = [...new Set(actions.map(a => a.order_id))];
    const orders = orderIds.length
      ? await Order.findAll({
          where: { id: { [Op.in]: orderIds } },
          attributes: ['id', 'order_number', 'table_number', 'order_type', 'payment_status', 'payment_method', 'total_amount']
        })
      : [];
    const orderById = new Map(orders.map(o => [o.id, o]));

    // 행 정규화 — metadata 에 캡처된 값 우선, 없으면 현재 주문값으로 폴백(옛 기록 호환).
    const rows = actions.map(a => {
      const md = a.metadata || {};
      const o = orderById.get(a.order_id);
      const paymentStatusVal = md.payment_status ?? (o ? o.payment_status : null);
      const paymentMethodVal = md.payment_method ?? (o ? o.payment_method : null);
      const amountVal = (md.amount != null)
        ? Number(md.amount)
        : (a.action_type === 'cancelled' && o ? Number(o.total_amount) || 0 : 0);
      const paid = paymentStatusVal === 'completed';
      const cash = paymentMethodVal === 'cash';
      return {
        id: a.id,
        created_at: a.created_at,
        action_type: a.action_type, // 'cancelled' | 'item_removed'
        order_id: a.order_id,
        order_number: o ? o.order_number : null,
        table_number: o ? o.table_number : null,
        order_type: o ? o.order_type : null,
        amount: amountVal,
        payment_status: paymentStatusVal,
        payment_method: paymentMethodVal,
        is_paid: paid,
        is_cash_paid: paid && cash, // 사장이 가장 의심해야 할 패턴 (현금 매출 빼돌리기)
        performed_by_id: a.performed_by_id,
        performed_by_name: a.performed_by_name,
        performed_by_role: a.performed_by_role,
        source: a.source,
        reason: a.reason || null,
        removed_item: md.removed_item || null,
        approved_by: md.approved_by_pin ? (md.approved_by_pin.name || null) : null
      };
    });

    // 결제상태 필터는 정규화 후 적용 (metadata/폴백 혼합이라 SQL where 부적합).
    let filtered = rows;
    if (paymentStatus === 'paid') filtered = rows.filter(r => r.is_paid);
    else if (paymentStatus === 'unpaid') filtered = rows.filter(r => !r.is_paid);

    // 요약(건수·금액·현금완료 위험 건수)
    const summary = filtered.reduce((acc, r) => {
      acc.count += 1;
      acc.totalAmount += Number(r.amount) || 0;
      if (r.is_paid) acc.paidCount += 1;
      if (r.is_cash_paid) acc.cashPaidCount += 1;
      acc.cashPaidAmount += r.is_cash_paid ? (Number(r.amount) || 0) : 0;
      return acc;
    }, { count: 0, totalAmount: 0, paidCount: 0, cashPaidCount: 0, cashPaidAmount: 0 });

    // 직원 필터 드롭다운용 — 기간 내 등장한 실행자 목록 (정규화 후 전체 기준).
    const staffMap = new Map();
    rows.forEach(r => {
      if (r.performed_by_id && !staffMap.has(r.performed_by_id)) {
        staffMap.set(r.performed_by_id, { id: r.performed_by_id, name: r.performed_by_name });
      }
    });

    res.json({
      success: true,
      data: {
        rows: filtered,
        summary,
        staff: [...staffMap.values()],
        timeZone: tz
      }
    });
  } catch (error) {
    console.error('✗ [void-log] error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
