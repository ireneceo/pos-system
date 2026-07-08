// 주문 CRUD + 아이템 조작 + 병합
// 마운트: /api/orders

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');
const Coupon = require('../models/Coupon');
const { logOrderActionSafe } = require('../services/orderAuditLog');
const OrderAction = require('../models/OrderAction');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { executeQuery, executeTransaction } = require('../utils/queryWrapper');
const { alreadyProcessed, recordProcessed, getProcessed } = require('../utils/opIdGuard');
const { deductInventoryForOrder } = require('../services/inventoryDeductionService');
const { earnPointsForOrder, refundPointsForOrder, usePointsForOrder } = require('../services/pointService');
const { authenticateToken, optionalAuthenticateToken, requireRole, requirePosCounter, userCanOperatePosCounter, requireVoidAccess, userCanVoid } = require('../middleware/auth');
const ActivityLog = require('../models/ActivityLog');
const { logActivity } = require('../utils/activityLogger');
const { getTodayBounds, getOrderDatePrefix, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { checkPaymentMethodAllowed } = require('../utils/paymentMethodGuard');
const { enforceVoidPin } = require('../utils/voidPinGuard');
const { enrichItemsWithStation } = require('../utils/stationEnrichment');
const { round2, computeOrderTotals, mixedDineInSubtotal } = require('../utils/orderTotals');

// 예약-주문 자동 링크 (P2-6, 인쇄 무관) — dine-in 주문이 'arrived'(체크인) 예약이 걸린
// 테이블에서 생성되면 그 예약을 주문에 연결(order.reservation_id) + 예약 arrived→seated.
// 테이블 기반 매칭이라 POS/모바일/플로어 전 경로 동일 동작. arrived 만 매칭(미래 confirmed
// 예약은 워크인 오링크 방지 위해 제외). 최근 6시간 내 도착분만.
async function linkArrivedReservationToOrder(order) {
  try {
    if (!order || order.reservation_id) return;
    const otNorm = String(order.order_type || 'dine_in').replace(/[_\s-]/g, '').toLowerCase();
    if (otNorm !== 'dinein') return;
    if (!order.floor_plan_table_id && !order.table_number) return;
    const where = { restaurant_id: order.restaurant_id, status: 'arrived', reserved_at: { [Op.gte]: new Date(Date.now() - 6 * 3600000) } };
    if (order.floor_plan_table_id) where.floor_plan_table_id = order.floor_plan_table_id;
    else where.table_number = order.table_number;
    const r = await Reservation.findOne({ where, order: [['reserved_at', 'DESC']] });
    if (!r) return;
    await order.update({ reservation_id: r.id });
    await r.update({ status: 'seated', seated_at: new Date() });
  } catch (e) { /* non-fatal — 링크 실패가 주문 생성을 막지 않음 */ }
}

// coupon_code 로 쿠폰 메타(type/value/max_discount)를 조회. 머지/삭제 시 % 쿠폰을
// 새 소계로 정확히 재계산하기 위함. 없으면 null → 비례 재계산 fallback.
async function resolveCouponMeta(restaurantId, couponCode, transaction = null) {
  if (!couponCode) return null;
  try {
    const c = await Coupon.findOne({
      where: { restaurant_id: restaurantId, code: String(couponCode).toUpperCase() },
      ...(transaction ? { transaction } : {})
    });
    if (!c) return null;
    return { type: c.type, value: parseFloat(c.value), maxDiscount: c.max_discount != null ? parseFloat(c.max_discount) : null };
  } catch (e) {
    return null;
  }
}

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, date, limit = 50, restaurantId, restaurant_id, start_date, end_date } = req.query;
    // Support both camelCase (new) and snake_case (legacy)
    const finalRestaurantId = restaurantId || restaurant_id;

    let whereCondition = {};

    // 역할별 접근 가능 레스토랑 제한
    if (req.user.role === 'System Admin') {
      // System Admin: 전체 접근 가능
      if (finalRestaurantId) {
        whereCondition.restaurant_id = parseInt(finalRestaurantId);
      }
    } else if (req.user.role === 'Restaurant Admin' || req.user.role === 'Staff') {
      // Restaurant Admin/Staff: 본인 레스토랑만
      whereCondition.restaurant_id = req.user.restaurant_id;
    } else if (['Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner'].includes(req.user.role)) {
      // Manager 역할: 관리 하는 레스토랑만
      const RestaurantManager = require('../models/RestaurantManager');
      const managedRests = await RestaurantManager.findAll({
        where: { manager_id: req.user.id },
        attributes: ['restaurant_id']
      });
      const allowedIds = managedRests.map(r => r.restaurant_id);
      if (finalRestaurantId && allowedIds.includes(parseInt(finalRestaurantId))) {
        whereCondition.restaurant_id = parseInt(finalRestaurantId);
      } else {
        whereCondition.restaurant_id = { [Op.in]: allowedIds };
      }
    } else {
      // 알 수 없는 역할: 접근 거부
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (status) {
      whereCondition.status = status;
    }
    if (start_date && end_date) {
      // Date range filter
      const rangeStart = new Date(start_date);
      const rangeEnd = new Date(end_date);
      rangeEnd.setHours(23, 59, 59, 999);
      whereCondition.createdAt = {
        [Op.between]: [rangeStart, rangeEnd]
      };
    } else if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      whereCondition.createdAt = {
        [Op.between]: [startDate, endDate]
      };
    }

    // 쿼리 래퍼 사용 (자동 재시도)
    // limit=0 means no limit (fetch all orders)
    const queryOptions = {
      where: whereCondition,
      order: [['createdAt', 'DESC']]
    };

    const parsedLimit = parseInt(limit);
    if (parsedLimit > 0) {
      queryOptions.limit = parsedLimit;
    }

    const orders = await executeQuery(async () => {
      return await Order.findAll(queryOptions);
    }, { maxRetries: 3 });

    // Parse order_items for each order
    const ordersWithParsedItems = orders.map(order => {
      const plainOrder = order.get({ plain: true });
      if (typeof plainOrder.order_items === 'string') {
        try {
          plainOrder.order_items = JSON.parse(plainOrder.order_items);
        } catch (e) {
          plainOrder.order_items = [];
        }
      }
      return plainOrder;
    });

    res.json({ success: true, data: ordersWithParsedItems });
  } catch (error) {
    console.error('✗ Orders 조회 실패:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single order
router.get('/:id', authenticateToken, async (req, res, next) => {
  // Guard: skip non-numeric IDs so concrete routes below (e.g. /restaurant/:id, /kitchen/active) can match
  if (isNaN(req.params.id)) return next('route');
  try {
    // 쿼리 래퍼 사용 (자동 재시도)
    const order = await executeQuery(async () => {
      return await Order.findByPk(req.params.id);
    }, { maxRetries: 3 });

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }
    // 2026-06-01 IDOR fix: this route had authenticateToken but NO ownership
    // check — any authenticated restaurant admin could read another store's
    // order by id (confirmed: r5 admin read r38's order, status 200). Mirror the
    // in-handler ownership check already used by GET /:id/payments
    // (orders-payment.js) since checkRestaurantAccess can't be used here (it
    // treats :id as a restaurant id, not an order id). System Admin sees all.
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('✗ Order 조회 실패:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders/mergeable
// 같은 테이블에 결제전 진행 중 주문 리스트.
// 2026-05-27: order_type 조건 제거 — 같은 테이블 = 같은 좌석 손님 가정,
// takeaway/dine-in 무관 머지 후보. payment_status='pending' 만 필터 (결제 후엔
// 별도 주문). POS source 만 (모바일 흐름은 mobile-orders.js 가 자체 처리).
router.get('/mergeable', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.query.restaurant_id, 10);
    const tableNumber = req.query.table_number;
    const paymentMethod = req.query.payment_method || null; // null = 결제 방식 무관 매칭
    if (!restaurantId || !tableNumber) {
      return res.status(400).json({ success: false, message: 'restaurant_id and table_number required' });
    }
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    const timezone = getRestaurantTimezone(restaurant);
    const { startOfDay: todayStart, endOfDay: todayEnd } = getTodayBounds(timezone);

    const list = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        table_number: tableNumber,
        // order_type 무관 — 같은 테이블 + 결제전 = 동일 손님 으로 통일.
        // 2026-06-26 (item 4): 'served' 제외하면 다 먹고 미결제인 테이블에 추가주문이
        // 새 빌로 갈라짐 → served 허용. table_cleared 가드로 비운 테이블만 차단.
        payment_status: 'pending',
        status: { [Op.notIn]: ['completed', 'cancelled'] },
        table_cleared: { [Op.not]: true },
        createdAt: { [Op.between]: [todayStart, todayEnd] },
        is_deleted: { [Op.not]: true },
        [Op.and]: [
          paymentMethod
            ? { [Op.or]: [{ payment_method: paymentMethod }, { payment_method: null }] }
            : {},
          // POS source only (mobile 은 자체 자동 머지 흐름)
          { [Op.or]: [{ source: { [Op.ne]: 'mobile' } }, { source: null }] }
        ]
      },
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json({ success: true, data: list });
  } catch (error) {
    console.error('✗ GET /mergeable:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Helper: Find mergeable order for auto-merge
// Merge rules:
// - Same restaurant, table, order_type, payment_method, today, both pending
// - POS→POS: table + payment_method match is enough (cashier controls)
// - Mobile→Mobile: additionally requires same customer (customer_id or customer_phone)
// - POS↔Mobile cross-source: never merge
// 2026-06-01: normalize a table label so "1" / "T001" / "Table 1" / "t1" all
// compare equal for auto-merge. Without this, a POS order created as "T001" and
// a mobile order carrying "1" (or differing QR labels) never merged → two bills
// on one table (The Fire risk if floor_plan label ≠ QR label). The 't' prefix is
// only stripped when followed by a digit, so real labels like "TEA1"/"A20" are
// left intact. Leading zeros dropped so "001" === "1".
function normalizeTableLabel(s) {
  if (s == null) return '';
  return String(s).trim().toLowerCase()
    .replace(/^table\s*/, '')
    .replace(/^t(?=\d)/, '')
    .replace(/[\s\-_]/g, '')
    .replace(/^0+(?=\d)/, '');
}

async function findMergeableOrder(restaurantId, tableNumber, orderType, newOrderData = {}, transaction = null, timezone = 'Asia/Kuala_Lumpur') {
  if (!restaurantId || !tableNumber) return null;

  // New order must also be pending to merge
  if (newOrderData.payment_status && newOrderData.payment_status !== 'pending') return null;

  const newSource = newOrderData.source || 'pos';
  const newPaymentMethod = newOrderData.payment_method || 'counter';
  const isMobile = (s) => s === 'mobile';

  // Get today's date range in restaurant's timezone
  const { startOfDay: todayStart, endOfDay: todayEnd } = getTodayBounds(timezone);

  // 2026-05-27: order_type + payment_method filters removed to match the rule
  // applied everywhere else (mobile-orders.js, GET /mergeable): same table +
  // payment pending = same bill, regardless of dine_in/takeaway split or what
  // payment method the customer ended up choosing. This is the path that
  // mobile orders actually hit (PaymentPage POSTs to /api/orders with
  // source:'mobile'); leaving order_type filtered here meant a takeaway-then-
  // dine-in sequence at the same table created two separate bills.
  // 2026-06-26 (item 4): 'served' was excluded here, which split the bill when a
  // guest finished eating (status='served') but had NOT paid yet (payment_status
  // 'pending') and ordered another round — the new order became a separate bill
  // (B-5 #026/#030). The shop's rule is "same table + payment pending = one bill"
  // regardless of stage, so served-but-unpaid must still merge. We only add a
  // table_cleared guard so a table that was explicitly freed (or auto-freed on
  // payment) never absorbs a fresh order. payment_status:'pending' already keeps
  // paid orders out.
  const queryOptions = {
    where: {
      restaurant_id: restaurantId,
      table_number: tableNumber,
      payment_status: 'pending',
      status: {
        [Op.notIn]: ['completed', 'cancelled']
      },
      table_cleared: { [Op.not]: true },
      createdAt: {
        [Op.between]: [todayStart, todayEnd]
      },
      [Op.or]: [
        { is_deleted: false },
        { is_deleted: null }
      ]
    },
    order: [['createdAt', 'DESC']],
    limit: 1
  };

  // Cross-source: POS↔Mobile never merge
  if (isMobile(newSource)) {
    queryOptions.where.source = 'mobile';
  } else {
    queryOptions.where[Op.and] = [
      { [Op.or]: [{ source: { [Op.ne]: 'mobile' } }, { source: null }] }
    ];
  }

  if (transaction) {
    queryOptions.lock = transaction.LOCK.UPDATE;
    queryOptions.transaction = transaction;
  }

  const existingOrders = await Order.findAll(queryOptions);
  if (existingOrders.length === 0) {
    // 2026-06-01: exact table_number match found nothing. Retry with normalized
    // label matching so "1"↔"T001"↔"Table 1" still land on one bill. Same WHERE
    // minus the exact table_number, then filter in JS by normalizeTableLabel.
    //
    // SAFETY: only merge when EXACTLY ONE open order normalizes to the same
    // label. If two+ candidates collide (e.g. multi-zone Zone1-"1" and Zone2-"1"
    // both normalize to "1"), we must NOT guess — a wrong merge combines two
    // tables' bills, which is worse than a missed merge. Ambiguous → no merge
    // (staff still sees both, recoverable). The Fire is 2-zone/59-table, so this
    // guard matters.
    const fbOptions = { ...queryOptions, where: { ...queryOptions.where }, limit: 10 };
    delete fbOptions.where.table_number;
    const candidates = await Order.findAll(fbOptions);
    const target = normalizeTableLabel(tableNumber);
    if (target === '') return null;
    const matches = candidates.filter(o => normalizeTableLabel(o.table_number) === target);
    if (matches.length !== 1) return null; // 0 = none, 2+ = ambiguous → safe no-merge
    return matches[0];
  }

  const existing = existingOrders[0];

  // 2026-05-27: removed the Mobile→Mobile "must be same customer" gate that
  // was blocking every guest-mobile order from auto-merging. The shop's real
  // intent is "same table + payment pending = one bill" regardless of who
  // ordered — anonymous guest, member, or a mix. Six guest orders on table
  // U-2 piled up as six separate bills because each was a fresh guest with
  // no phone, so the old phone-match path returned null. Same table is the
  // anchor; customer identity is metadata, not a merge key.
  return existing;
}

// Helper: Merge items into existing order
// #3 합본 빌: incomingOrderType = 합쳐 들어오는 주문의 order_type. 그 품목을 item_order_type 으로
// 태깅 → 혼합(테이크웨이+다인인) 시 서비스차지를 dine-in 품목에만 매긴다(computeOrderTotals dineInSubtotal).
async function mergeItemsIntoOrder(existingOrder, newItems, transaction = null, incomingOrderType = null, incomingTakeawayCharge = 0, opts = {}) {
  const now = new Date().toISOString();
  // §15-3-E 🔒 (이 블루프린트의 유일한 인쇄 라이프사이클 변경): 오프라인 중 POS1 이 라운드 티켓을
  // 로컬로 이미 찍었으면(printedOffline) 재생 시 폴러가 재인쇄하지 않게 한다. opts 미전달(기존 5개
  // 호출부) = 정확히 기존 동작. printedOffline 은 /add-items 가 op_id+printed_offline 일 때만 세운다(I2).
  const printedOffline = opts.printedOffline === true;
  // #3 합본 빌: 합쳐 들어오는 takeaway 주문의 포장비(프론트가 매장 설정 takeawayPricing 대로 계산해 보낸 값)를
  // 기존 주문 포장비에 더한다. 설정값을 그대로 적용 — 머지 때 버려지던 버그 수정.
  const combinedTakeawayCharge = (parseFloat(existingOrder.takeaway_charge) || 0) + (parseFloat(incomingTakeawayCharge) || 0);

  // Get current items
  let currentItems = existingOrder.order_items || [];
  if (typeof currentItems === 'string') {
    currentItems = JSON.parse(currentItems);
  }

  // Ensure existing items have order_group preserved (default to 0 if not set)
  currentItems = currentItems.map(item => ({
    ...item,
    order_group: item.order_group !== undefined ? item.order_group : 0
  }));

  // Calculate next order_group number
  // Original items have order_group: 0, first merge is order_group: 1, etc.
  const existingGroups = currentItems.map(item => item.order_group || 0);
  const maxGroup = existingGroups.length > 0 ? Math.max(...existingGroups) : 0;
  const nextGroup = maxGroup + 1;

  // 2026-05-28: Enrich new items with kitchen_station_id through the same
  // helper used by new-order paths. Without this, +Round N additional items
  // arrived at the kitchen with no station label, all bucketed as "unmapped"
  // by the frontend printer router → piled onto the first station's printer,
  // BARPR/KQ2 etc. printed nothing for additional orders (The Fire 매장 1일차
  // 영업 보고).
  const enrichedNewItems = await enrichItemsWithStation(existingOrder.restaurant_id, newItems);

  // Add new items with added_at timestamp and order_group
  // #3: 들어오는 주문타입을 품목에 태깅(혼합차지 판정용). 기존 태그가 있으면 보존.
  const itemsWithTimestamp = enrichedNewItems.map(item => ({
    ...item,
    status: 'pending',
    added_at: now,
    order_group: nextGroup,
    // §15-3-E: 오프라인 로컬인쇄분은 printed_at 스탬프 → 폴러 kitchen_items(未printed) 에서 제외(재인쇄 0).
    // create 경로(829~847)와 동일 메커니즘. printedOffline 아니면 스탬프 없음 = 기존 동작.
    ...(printedOffline ? { printed_at: now } : {}),
    ...(incomingOrderType ? { item_order_type: item.item_order_type || incomingOrderType } : {})
  }));

  const mergedItems = [...currentItems, ...itemsWithTimestamp];

  // Subtotal before adding the new items (% 할인·실효세율 비율 도출용)
  const oldSubtotal = currentItems.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQty = parseInt(item.quantity) || 1;
    return sum + (itemPrice * itemQty);
  }, 0);

  const itemsSubtotal = mergedItems.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQty = parseInt(item.quantity) || 1;
    return sum + (itemPrice * itemQty);
  }, 0);

  // 2026-05-29: 전체 금액을 정식 공식(computeOrderTotals)으로 재계산.
  //   - 세금·서비스차지: 새 할인후금액(afterDiscount) 기준으로 재계산
  //   - % 할인정책·% 쿠폰: 새 소계 기준 재계산 (매장 결정, Toast/Square 표준)
  //   - 고정 할인·포인트·포장/배달: 유지
  // 이전엔 tax/service 를 원시 소계로 계산하고 % 할인을 동결해서 청구액이 어긋났다.
  const couponMeta = await resolveCouponMeta(existingOrder.restaurant_id, existingOrder.coupon_code, transaction);
  const totals = computeOrderTotals({
    newSubtotal: itemsSubtotal,
    oldSubtotal,
    takeawayCharge: combinedTakeawayCharge, // #3 합본: 기존 + 들어온 takeaway 포장비(설정대로)
    deliveryFee: existingOrder.delivery_fee,
    discount: existingOrder.discount,
    oldDiscountPolicyAmount: existingOrder.discount_policy_amount,
    oldCouponDiscount: existingOrder.coupon_discount,
    coupon: couponMeta,
    pointDiscount: existingOrder.point_discount,
    oldTax: existingOrder.tax,
    taxRate: existingOrder.tax_rate,
    oldServiceCharge: existingOrder.service_charge,
    serviceChargeRate: existingOrder.service_charge_rate,
    // #3 합본 빌: 혼합(테이크웨이+다인인)이면 서비스차지를 dine-in 품목에만. 순수 주문이면 null=기존.
    dineInSubtotal: mixedDineInSubtotal(mergedItems, existingOrder.order_type)
  });
  const { tax, serviceCharge } = totals;
  const newTotal = totals.total;

  // Update order
  // Note: Don't use JSON.stringify - Sequelize setter handles it automatically
  // 2026-05-27: status preservation rule —
  //   - If the order is still 'outstanding' (shop has requirePaymentBeforeKitchen=true
  //     and the customer hasn't paid), DO NOT flip it to 'pending'. Doing so would
  //     auto-send the order to the kitchen against the shop's explicit setting.
  //     The status will transition to 'pending' on the existing pay-completion flow.
  //   - Any other in-progress status (pending / preparing / ready / served) drops
  //     back to 'pending' so the new items get picked up by the kitchen on the
  //     next KDS render. Already-completed items keep their per-item 'completed'
  //     status (the per-item status is stored on the line, not on the order).
  const updateOptions = transaction ? { transaction } : {};
  const preserveOutstanding = existingOrder.status === 'outstanding';
  await existingOrder.update({
    order_items: mergedItems,
    subtotal: itemsSubtotal,
    takeaway_charge: combinedTakeawayCharge, // #3 합본: 들어온 takeaway 포장비 영속화
    tax,
    service_charge: serviceCharge,
    discount_policy_amount: totals.discountPolicyAmount,
    coupon_discount: totals.couponDiscount,
    total_amount: newTotal,
    status: preserveOutstanding ? 'outstanding' : 'pending',
    // 2026-05-28: Flip needs_print so MainLayout polling triggers the
    // additional-items kitchen ticket regardless of which page each POS
    // device is on. Without this, only a device sitting on KDS would
    // receive the socket-based fast-path; everyone else missed the print.
    // §15-3-E: printedOffline 이면 needs_print/consolidated_printed_at 을 기존 값 보존(강제 true/null 아님).
    //   왜 보존이지 false 가 아닌가: 정전 중 서버에 도달한 모바일 라운드가 needs_print=true 로 대기 중일 수
    //   있다 — false 로 덮으면 그 티켓이 증발(zero-ticket 사고). 보존이면 대기분 없으면 그대로(아무것도 안 찍힘),
    //   대기분 있으면 폴러가 未printed 품목만(우리 스탬프분 제외) 찍는다 → 양쪽 모두 정확히 1장(I3).
    needs_print: printedOffline ? existingOrder.needs_print : true,
    // +Round/merge = 새 라운드 → 통합 가드 리셋(추가분 통합 카피 재발행). 새주문 hybrid+poller 더블만 가드, 재인쇄는 단일 소스라 안전.
    consolidated_printed_at: printedOffline ? existingOrder.consolidated_printed_at : null
  }, updateOptions);

  await existingOrder.reload(updateOptions);

  return {
    order: existingOrder,
    addedItems: itemsWithTimestamp,
    previousTotal: parseFloat(existingOrder.total_amount),
    newTotal,
    orderGroup: nextGroup
  };
}

// Create new order
// Uses optionalAuthenticateToken to allow both authenticated (POS) and guest (mobile) orders
router.post('/', optionalAuthenticateToken, async (req, res) => {
  try {
    const orderData = req.body;
    // Support both camelCase (new) and snake_case (legacy)
    if (orderData.restaurantId && !orderData.restaurant_id) {
      orderData.restaurant_id = orderData.restaurantId;
    }
    // Support customerId → customer_id mapping
    if (orderData.customerId && !orderData.customer_id) {
      orderData.customer_id = orderData.customerId;
    }

    // Validate restaurant_id exists
    if (!orderData.restaurant_id) {
      return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    }
    const restaurant = await Restaurant.findByPk(orderData.restaurant_id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    const timezone = getRestaurantTimezone(restaurant);

    // #9 오프라인 주문 큐 — 멱등. 끊긴 중 큐에 쌓였던 주문이 재연결 시 재전송될 때, 같은
    // idempotency_key(클라 UUID)가 이미 처리됐으면 새로 만들지 않고 기존 주문을 그대로 돌려준다(중복생성 0).
    const _idemKey = (orderData.idempotency_key || orderData.idempotencyKey || '').toString().slice(0, 64) || null;
    if (_idemKey) {
      orderData.idempotency_key = _idemKey;
      const existingIdem = await Order.findOne({ where: { idempotency_key: _idemKey } });
      if (existingIdem) {
        return res.status(200).json({ success: true, data: existingIdem, idempotent: true, message: 'Order already created (idempotent replay)' });
      }
    }

    // Defence: payment_method × order_type. Only enforced for mobile-sourced orders —
    // POS staff sees all enabled methods regardless of order_type (operator judgment).
    if (orderData.source === 'mobile') {
      const guard = checkPaymentMethodAllowed({
        paymentSettings: restaurant.payment_settings,
        paymentMethod: orderData.payment_method,
        orderType: orderData.order_type
      });
      if (!guard.ok) {
        return res.status(400).json({ success: false, message: guard.message, code: guard.code });
      }
    }

    // Defence: dine-in table requirement. When table_settings.tableNumberRequired
    // is enabled, a mobile dine-in order MUST carry a table number. This catches
    // the generic/representative-QR path (no ?table=) where the customer entered
    // the menu without a table — those previously slipped through table-less and
    // showed on Floor Plan as a "pickup N" label instead of on a table. Takeaway/
    // pickup/delivery are exempt. The mobile frontend already forces a table pick,
    // but a crafted request must not bypass. POS-sourced orders are not gated
    // (staff/operator judgment). This guard only validates input — it does not
    // touch print/kitchen routing.
    if (orderData.source === 'mobile') {
      const ts = restaurant.table_settings || {};
      const requireTable = ts.enableTableNumbers !== false && !!ts.tableNumberRequired;
      // 2026-06-01: treat a MISSING order_type as dine-in for this guard. The
      // mobile client always sends order_type, but a malformed/crafted body that
      // omits it must not slip through table-less (was: isDineIn=false → allowed
      // with null table). Only an explicit takeaway/pickup/delivery is exempt.
      const ot = orderData.order_type;
      const isDineIn = !ot || ot === 'dine_in' || ot === 'dine-in';
      if (requireTable && isDineIn && !orderData.table_number) {
        return res.status(400).json({ success: false, message: 'Table number is required for dine-in orders', code: 'TABLE_REQUIRED' });
      }
    }

    // 2026-06-01: Derive floor_plan_table_id for dine-in orders so they pin to
    // the correct Floor Plan table card. The mobile PaymentPage path POSTs here
    // (source:'mobile') but never sends floor_plan_table_id — only mobile-orders.js
    // resolved it, so every PaymentPage order landed with FPTI=null and, in a
    // multi-zone store like The Fire, could not be disambiguated (Zone1-T20 vs
    // Zone2-T20) and showed as "missing" from its table. Match by the table's
    // canvas id directly, else by label, else by tableNumber. POS already passes
    // floor_plan_table_id explicitly (from ?tableId=), so this only fills the gap
    // when it's absent. Pure data binding — no print/kitchen routing touched.
    {
      const otRaw = orderData.order_type;
      const isDineInOrder = !otRaw || otRaw === 'dine_in' || otRaw === 'dine-in';
      if (isDineInOrder && orderData.table_number && !orderData.floor_plan_table_id) {
        const fp = restaurant.floor_plan || {};
        const fpTables = Array.isArray(fp.tables) ? fp.tables : [];
        const tn = String(orderData.table_number);
        const matched = fpTables.find(tbl =>
          (tbl && tbl.id != null && String(tbl.id) === tn) ||
          (tbl && tbl.label != null && String(tbl.label) === tn) ||
          (tbl && tbl.tableNumber != null && String(tbl.tableNumber) === tn)
        );
        if (matched && matched.id != null) {
          orderData.floor_plan_table_id = String(matched.id);
        }
      }
    }

    // Auto-merge policy:
    //   - Mobile: 안전 (customer 검사) → default 자동 머지 유지
    //   - POS:   default 자동 머지 OFF (skipAutoMerge=true). POS UI 가 사전에 mergeable 조회 후
    //            사용자가 "기존 추가" 선택했을 때만 명시적으로 `forceMergeIntoOrderId` 또는
    //            `skipAutoMerge=false` 보낸다.
    const orderSource = (orderData.source || 'pos').toLowerCase();
    const isMobileSource = orderSource === 'mobile';
    // POS 면 기본 skipAutoMerge. 명시적으로 skipAutoMerge=false 보내야만 자동 머지.
    let skipAutoMerge = orderData.skipAutoMerge === true;
    if (!isMobileSource && orderData.skipAutoMerge === undefined) {
      skipAutoMerge = true;
    }

    // Mobile orders: status is decided by restaurant setting, not the client.
    // requirePaymentBeforeKitchen=true → 'outstanding' (hold until paid)
    // requirePaymentBeforeKitchen=false (default) → 'pending' (straight to kitchen)
    // The mobile client previously hard-coded status='outstanding', ignoring the setting.
    if (isMobileSource) {
      const reqPayBeforeKitchen = !!(restaurant.operation_settings &&
        restaurant.operation_settings.mobileOrderProcessing &&
        restaurant.operation_settings.mobileOrderProcessing.requirePaymentBeforeKitchen);
      orderData.status = reqPayBeforeKitchen ? 'outstanding' : 'pending';
    }

    // Force merge into a specific existing order (POS UI 의 "기존 주문에 추가" 선택)
    if (orderData.forceMergeIntoOrderId) {
      // §15-3-D 멱등 봉합: forceMerge 분기는 idempotency_key 를 어디에도 영속하지 않아
      // 응답 유실 후 재전송이 같은 품목을 두 번 머지 + 주방티켓 2장(온라인에서도 열린 구멍).
      // ProcessedOp 재사용('idem:' 네임스페이스, op_id 와 충돌 방지) → 재전송이면 기존 주문 반환.
      if (_idemKey) {
        // §15-3-D 하드닝(Fable): 반환을 요청 body 가 아닌 **실제 처리된 대상**(기록 meta.order_id) 기준으로 —
        // divergent replay(같은 key, 다른 target id)가 엉뚱한 주문을 반환하고 머지를 조용히 흘리는 것 방어.
        const prior = await getProcessed('idem:' + _idemKey);
        if (prior) {
          const force0 = await Order.findByPk(prior.order_id || orderData.forceMergeIntoOrderId);
          return res.status(200).json({ success: true, data: force0, merged: true, idempotent: true });
        }
      }
      const force = await Order.findByPk(orderData.forceMergeIntoOrderId);
      if (force && force.restaurant_id === orderData.restaurant_id) {
        const newItems = orderData.order_items || orderData.items || [];
        const mergeResult = await mergeItemsIntoOrder(force, newItems, null, orderData.order_type, orderData.takeaway_charge); // #3 들어온 takeaway 포장비 전달
        const io = req.app.get('io');
        if (io) {
          const room = `restaurant_${force.restaurant_id}`;
          const plainMerged = mergeResult.order.get ? mergeResult.order.get({ plain: true }) : mergeResult.order;
          if (typeof plainMerged.order_items === 'string') {
            try { plainMerged.order_items = JSON.parse(plainMerged.order_items); } catch (_e) { plainMerged.order_items = []; }
          }
          io.of('/orders').to(room).emit('order-updated', plainMerged);
          io.of('/orders').to(room).emit('order-items-added', {
            orderId: force.id, orderNumber: force.order_number,
            tableNumber: force.table_number, orderGroup: mergeResult.orderGroup,
            addedItems: mergeResult.addedItems, itemCount: mergeResult.addedItems.length
          });
        }
        // §15-3-D: 머지 성공을 idempotency_key 로 봉인 → 재전송 시 위 가드가 기존 주문 반환(이중 머지·이중인쇄 0).
        if (_idemKey) await recordProcessed('idem:' + _idemKey, { order_id: force.id, type: 'force_merge', restaurant_id: force.restaurant_id });
        return res.status(200).json({
          success: true, data: mergeResult.order, merged: true,
          mergeInfo: { originalOrderId: force.id, orderGroup: mergeResult.orderGroup, forced: true }
        });
      }
      return res.status(404).json({ success: false, message: 'forceMergeIntoOrderId not found or not in this restaurant' });
    }

    // 2026-06-11 (Irene): off-table 주문(takeaway/pickup/delivery)은 테이블의 기존 dine-in
    // 계산서에 자동 병합하지 않는다 — 명시적으로 takeaway 를 고른 주문은 항상 별도 takeaway 로
    // 남아 Takeout 리스트에 보여야 한다. (2026-05-27 '같은 테이블=한 계산서' 자동병합은 dine-in
    // 끼리만. 스태프가 의도적으로 합치려면 forceMergeIntoOrderId 명시 머지(위 분기)로.)
    const __otNorm = (orderData.order_type || 'dine_in').toString().replace(/[_\s-]/g, '').toLowerCase();
    const __isOffTableOrder = __otNorm === 'takeaway' || __otNorm === 'pickup' || __otNorm === 'delivery';

    // #3 합본 빌(2026-06-26, Irene): 테이블번호가 있는 off-table(테이크웨이/픽업) 주문은 그 테이블의
    // 기존 dine-in 계산서에 머지(별도/덮어쓰기 금지). 품목은 item_order_type 으로 태깅돼 서비스차지가
    // dine-in 품목에만 붙는다(혼합차지). 테이블 없는 순수 takeaway 는 table_number 가 없어 그대로 별도 유지.
    if (!skipAutoMerge && orderData.restaurant_id && orderData.table_number) {
      const mergeableOrder = await findMergeableOrder(
        orderData.restaurant_id,
        orderData.table_number,
        orderData.order_type || 'dine_in',
        orderData,
        null,
        timezone
      );

      if (mergeableOrder) {
        console.log(`🔀 [AUTO-MERGE] Found mergeable order ${mergeableOrder.id} for table ${orderData.table_number} (incoming ${orderData.order_type})`);

        // Merge items into existing order (support both 'items' and 'order_items')
        const newItems = orderData.order_items || orderData.items || [];
        const mergeResult = await mergeItemsIntoOrder(mergeableOrder, newItems, null, orderData.order_type, orderData.takeaway_charge); // #3 들어온 takeaway 포장비 전달

        console.log(`✓ [AUTO-MERGE] Merged ${mergeResult.addedItems.length} items into order ${mergeableOrder.id} (group: ${mergeResult.orderGroup})`);

        // Emit socket events for real-time update
        const io = req.app.get('io');
        if (io && mergeableOrder.restaurant_id) {
          const room = `restaurant_${mergeableOrder.restaurant_id}`;
          // Regular order update - convert to plain object for proper serialization
          const plainMerged = mergeResult.order.get ? mergeResult.order.get({ plain: true }) : mergeResult.order;
          if (typeof plainMerged.order_items === 'string') {
            try { plainMerged.order_items = JSON.parse(plainMerged.order_items); } catch(e) { plainMerged.order_items = []; }
          }
          io.of('/orders').to(room).emit('order-updated', plainMerged);
          // Special event for new items added (for notification sound)
          io.of('/orders').to(room).emit('order-items-added', {
            orderId: mergeableOrder.id,
            orderNumber: mergeableOrder.order_number,
            tableNumber: mergeableOrder.table_number,
            orderGroup: mergeResult.orderGroup,
            addedItems: mergeResult.addedItems,
            itemCount: mergeResult.addedItems.length
          });
        }

        return res.status(200).json({
          success: true,
          data: mergeResult.order,
          merged: true,
          mergeInfo: {
            originalOrderId: mergeableOrder.id,
            orderGroup: mergeResult.orderGroup,
            addedItems: mergeResult.addedItems,
            previousTotal: mergeResult.previousTotal,
            newTotal: mergeResult.newTotal
          }
        });
      }
    }

    // Check order limit if restaurant_id is provided
    if (orderData.restaurant_id) {
      const restaurant = await Restaurant.findByPk(orderData.restaurant_id);

      if (restaurant && restaurant.order_limit && restaurant.order_limit > 0) {
        // Get current month's start and end dates
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        // Count orders for this month
        const currentMonthOrders = await Order.count({
          where: {
            restaurant_id: orderData.restaurant_id,
            order_date: {
              [Op.between]: [startOfMonth, endOfMonth]
            },
            status: {
              [Op.ne]: 'cancelled' // Don't count cancelled orders
            }
          }
        });

        if (currentMonthOrders >= restaurant.order_limit) {
          return res.status(403).json({
            success: false,
            error: `Monthly order limit reached. Your plan allows up to ${restaurant.order_limit} orders per month.`,
            limit: restaurant.order_limit,
            current: currentMonthOrders,
            upgradeRequired: true
          });
        }
      }
    }

    // Calculate total amount if not provided
    // NOTE: total_amount === 0 is valid (e.g. 100% coupon discount). Use `== null` to catch only undefined/null.
    const itemsArray = orderData.order_items || orderData.items || [];
    if (orderData.total_amount == null && itemsArray.length > 0) {
      orderData.total_amount = itemsArray.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0);
    }
    // Ensure total_amount has a default value
    if (orderData.total_amount == null) {
      orderData.total_amount = 0;
    }

    // Ensure order_date is set - use actual UTC time (not timezone-shifted)
    if (!orderData.order_date) {
      orderData.order_date = new Date();
    }

    // Generate unique order number with transaction and retry logic
    let order;
    const maxRetries = 5;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        // Use transaction to ensure atomicity
        order = await sequelize.transaction(async (t) => {
          // Always generate order number if not provided
          const needsOrderNumber = !orderData.order_number || orderData.order_number === '';
          let generatedOrderNumber = orderData.order_number;

          if (needsOrderNumber || retryCount > 0) {
            // Generate order number using timezone-aware logic
            const datePrefix = getOrderDatePrefix(timezone);

            const existingOrders = await Order.findAll({
              where: {
                restaurant_id: orderData.restaurant_id,
                order_number: {
                  [Op.like]: `${datePrefix}-%`
                }
              },
              order: [['order_number', 'DESC']],
              limit: 1,
              lock: t.LOCK.UPDATE,  // Row-level lock
              transaction: t
            });

            let nextCounter = 1;
            if (existingOrders.length > 0) {
              const lastOrderNumber = existingOrders[0].order_number;
              const parts = lastOrderNumber.split('-');
              if (parts.length > 1) {
                const lastCounter = parseInt(parts[1]) || 0;
                nextCounter = lastCounter + 1;
              }
            }

            // Generate order number
            generatedOrderNumber = `${datePrefix}-${nextCounter.toString().padStart(3, '0')}`;
            console.log('Generated order_number:', generatedOrderNumber);
          }

          console.log('Creating order with order_number:', generatedOrderNumber);
          // Create order within transaction with generated number
          // Note: We bypass validation because order_number is generated dynamically

          // Prepare order data - add order_group: 0 to all original items
          // Note: Pass array directly to Order model - the model's setter will handle stringify
          //
          // 2026-05-28 (refactored): All station enrichment now goes through
          // utils/stationEnrichment.js so every order-write path (POS new /
          // POS add-items / mobile new / mobile auto-merge) resolves stations
          // identically — fixes The Fire 매장 영업 1일차 critical 보고 where
          // add-items / mobile-merge paths bypassed enrichment.
          const rawItems = orderData.order_items || orderData.items || [];
          const enriched = orderData.restaurant_id
            ? await enrichItemsWithStation(orderData.restaurant_id, rawItems)
            : rawItems;
          const itemsArray = enriched.map(item => ({
            ...item,
            order_group: item.order_group !== undefined ? item.order_group : 0
          }));

          // Calculate total if not set
          // NOTE: total_amount === 0 is valid (e.g. 100% coupon discount). Use `== null` to catch only undefined/null.
          let calculatedTotal = orderData.total_amount;
          if (calculatedTotal == null && itemsArray.length > 0) {
            calculatedTotal = itemsArray.reduce((sum, item) => {
              return sum + (parseFloat(item.price) * parseInt(item.quantity));
            }, 0);
          }

          // payment_proof 정규화: 단일 객체 → { current, history } 구조
          let normalizedProof = orderData.payment_proof;
          if (normalizedProof && !normalizedProof.hasOwnProperty('current')) {
            normalizedProof = { current: normalizedProof, history: [] };
          }

          // 오프라인 6단계: printed_offline=true → POS1 이 오프라인 중 로컬(QZ/RawBT)로 이미 주방
          // 티켓을 찍은 주문. 동기화 시 needs_print=false + 각 품목 printed_at 스탬프로 폴러/자동인쇄가
          // 재인쇄하지 않게 한다(기존 printed_at 중복방지 메커니즘 재사용). 미설정 시 기존 동작(true).
          const _printedOffline = orderData.printed_offline === true;
          delete orderData.printed_offline; // 모델 컬럼 아님 — 영속 안 함
          const _nowIso = new Date().toISOString();
          const _itemsForCreate = (_printedOffline && itemsArray.length > 0)
            ? itemsArray.map(it => (it && typeof it === 'object' && !it.printed_at) ? { ...it, printed_at: _nowIso } : it)
            : itemsArray;
          return await Order.create({
            ...orderData,
            order_number: generatedOrderNumber,
            order_items: _itemsForCreate.length > 0 ? _itemsForCreate : null,  // Pass array, not JSON string
            total_amount: calculatedTotal ?? 0,
            payment_proof: normalizedProof || orderData.payment_proof,
            // 2026-05-28: backend trigger for auto-print polling (POS direct trigger
            // still fires as fast path — this is the safety net for any device).
            // 오프라인 로컬인쇄분(printed_offline)은 이미 찍혔으니 needs_print=false.
            needs_print: _printedOffline ? false : true
          }, {
            transaction: t,
            validate: false  // Skip validation since we're generating order_number
          });
        });

        // Success - break the retry loop
        break;

      } catch (error) {
        // Check if it's a duplicate key error
        if (error.name === 'SequelizeUniqueConstraintError' ||
            (error.parent && error.parent.code === 'ER_DUP_ENTRY')) {
          // 멱등키 유니크 충돌 = 동시(concurrent) 요청이 같은 idempotency_key 로 이미 주문을 만든 경우.
          // order_number 충돌(재시도로 해결)과 구분: 기존 주문을 조회해 그대로 돌려준다(중복 0, 500 방지).
          // 이걸 안 하면 재시도 루프가 같은 키로 5회 재충돌 → 500 → 고객이 실패로 보고 재탭 → 진짜 중복.
          if (_idemKey) {
            const dupIdem = await Order.findOne({ where: { idempotency_key: _idemKey } });
            if (dupIdem) {
              return res.status(200).json({ success: true, data: dupIdem, idempotent: true, message: 'Order already created (concurrent idempotent replay)' });
            }
          }
          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error(`Failed to generate unique order number after ${maxRetries} attempts`);
          }
          // Wait a bit before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 50 * retryCount));
          continue;
        }
        // Other errors - rethrow immediately
        throw error;
      }
    }

    // 예약-주문 자동 링크 (P2-6) — 인쇄 무관. dine-in 주문이 'arrived' 예약 걸린 테이블에서
    // 생성되면 reservation_id 연결 + 예약 arrived→seated (체크인 루프). 실패는 비치명.
    await linkArrivedReservationToOrder(order);

    // Process points usage if provided
    if (order.points_used && order.points_used > 0 && order.customer_id && order.restaurant_id) {
      try {
        const pointResult = await usePointsForOrder(
          order.restaurant_id,
          order.customer_id,
          order.id,
          order.points_used
        );
        if (pointResult.success) {
          console.log(`✓ [POINTS] Used ${order.points_used} points for order ${order.id}`);
        } else {
          console.warn(`⚠️ [POINTS] Failed to use points for order ${order.id}:`, pointResult.error);
          // Note: We don't fail the order if points usage fails
          // The order will still be created, but points won't be deducted
        }
      } catch (pointError) {
        console.error(`✗ [POINTS] Error using points for order ${order.id}:`, pointError);
      }
    }

    // Increment coupon usage_count if coupon was used
    if (order.coupon_code && order.restaurant_id) {
      try {
        const coupon = await Coupon.findOne({
          where: {
            restaurant_id: order.restaurant_id,
            code: order.coupon_code.toUpperCase()
          }
        });
        if (coupon) {
          await coupon.update({
            usage_count: coupon.usage_count + 1
          });
          console.log(`✓ [COUPON] Incremented usage_count for coupon ${coupon.code} to ${coupon.usage_count}`);
        }
      } catch (couponError) {
        console.error(`✗ [COUPON] Error incrementing coupon usage:`, couponError);
      }
    }

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      console.log(`📡 Emitting order-created event to restaurant_${order.restaurant_id}`);
      console.log(`   Order ID: ${order.id}, Number: ${order.order_number}`);
      // Convert to plain object to ensure all fields are serialized properly
      const plainOrder = order.get ? order.get({ plain: true }) : order;
      if (typeof plainOrder.order_items === 'string') {
        try { plainOrder.order_items = JSON.parse(plainOrder.order_items); } catch(e) { plainOrder.order_items = []; }
      }
      // Always emit source so frontend can route the new-order banner correctly.
      // 'mobile' from /api/mobile/order; anything else (POS terminal, KDS) defaults to 'pos'.
      plainOrder.source = plainOrder.source || 'pos';
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-created', plainOrder);
      console.log(`✓ Socket event emitted successfully`);
    } else {
      console.warn('⚠️ Socket.IO not available or restaurant_id missing:', {
        hasIO: !!io,
        restaurantId: order.restaurant_id
      });
    }

    // Activity log
    if (req.user) {
      const itemCount = Array.isArray(order.order_items) ? order.order_items.length : 0;
      logActivity(req, {
        action_type: 'create',
        entity_type: 'order',
        entity_id: order.id,
        entity_name: order.order_number,
        description: `New ${order.order_type || 'dine_in'} order #${order.order_number} (${itemCount} items, ${order.currency || 'MYR'} ${parseFloat(order.total || 0).toFixed(2)})`,
        restaurant_id: order.restaurant_id
      });
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('✗ Order creation failed:', error.message);
    console.error('   Stack:', error.stack);
    console.error('   Request body:', JSON.stringify(req.body, null, 2).substring(0, 500));
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update order (full update)
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    // 쿼리 래퍼 사용 (트랜잭션 및 자동 재시도)
    const result = await executeTransaction(async (t) => {
      const order = await Order.findByPk(req.params.id, { transaction: t });

      if (!order) {
        throw new Error('Order not found');
      }

      // IDOR guard: cross-restaurant order mutation. Same ownership pattern as
      // GET /:id (line ~150). System Admin sees all. (No print routing touched.)
      if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
          && req.user.role !== 'System Admin') {
        throw new Error('FORBIDDEN_CROSS_RESTAURANT');
      }

      // Payment proof history 관리: reject 시 current → history로 이동
      if (req.body.payment_status === 'rejected' && order.payment_proof) {
        let proof = typeof order.payment_proof === 'string' ? JSON.parse(order.payment_proof) : order.payment_proof;
        // 기존 단일 객체 호환: { image, reference, ... } → { current: {...}, history: [] }
        if (!proof.hasOwnProperty('current')) {
          proof = { current: proof, history: [] };
        }
        if (proof.current) {
          const historyEntry = {
            ...proof.current,
            rejected_at: new Date().toISOString(),
            reject_count: (proof.history || []).length + 1
          };
          proof.history = [...(proof.history || []), historyEntry];
          proof.current = null;
        }
        req.body.payment_proof = proof;
      }

      // Payment proof 재결제: payment_verification_pending + payment_proof가 새로 들어오면 current에 저장
      if (req.body.payment_status === 'payment_verification_pending' && req.body.payment_proof) {
        let existingProof = order.payment_proof ? (typeof order.payment_proof === 'string' ? JSON.parse(order.payment_proof) : order.payment_proof) : null;
        // 기존 구조 호환
        if (existingProof && !existingProof.hasOwnProperty('current')) {
          existingProof = { current: existingProof, history: [] };
        }
        const newProofData = req.body.payment_proof;
        // 새 proof가 이미 { current, history } 구조가 아닌 단일 객체이면 current에 넣기
        if (!newProofData.hasOwnProperty('current')) {
          req.body.payment_proof = {
            current: newProofData,
            history: existingProof ? (existingProof.history || []) : []
          };
        }
      }

      // 2026-06-01 anti-wipe guard: never let a blind whole-body PATCH erase the
      // table binding of a dine-in order. The "Leave"/clear flow now sets
      // table_cleared:true (non-destructive) and no longer sends table_number:null,
      // but this endpoint applies req.body wholesale (same blind-update class as the
      // 5/31 settings-wipe). A stale cached build, a third path, or a crafted call
      // sending table_number:null would silently destroy the record's table. Drop a
      // null/empty table_number from the patch for dine-in orders rather than wiping.
      // An explicit table CHANGE (non-empty value) is still allowed.
      const otNow = req.body.order_type || order.order_type;
      const isDineInNow = !otNow || otNow === 'dine_in' || otNow === 'dine-in';
      if (isDineInNow && Object.prototype.hasOwnProperty.call(req.body, 'table_number')) {
        const newTn = req.body.table_number;
        if (newTn === null || newTn === undefined || newTn === '') {
          console.warn(`[ANTI-WIPE] Ignored table_number=${JSON.stringify(newTn)} on dine-in order ${order.id} (preserving "${order.table_number}"). Use table_cleared flag to free a table.`);
          delete req.body.table_number;
        }
      }

      // Update order with provided fields
      await order.update(req.body, { transaction: t });

      return order;
    }, { maxRetries: 3 });

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && result.restaurant_id) {
      const plainResult = result.get ? result.get({ plain: true }) : result;
      if (typeof plainResult.order_items === 'string') {
        try { plainResult.order_items = JSON.parse(plainResult.order_items); } catch(e) { plainResult.order_items = []; }
      }
      io.of('/orders').to(`restaurant_${result.restaurant_id}`).emit('order-updated', plainResult);
    }

    // ── Audit log — order updated (PATCH /:id).
    //   This is a PATCH handler; `orderData` was a POST-local variable that
    //   leaked here from a copy/paste and used to throw ReferenceError,
    //   bouncing every PATCH with a 400 even though the update itself
    //   succeeded. Read role / source from req.user + req.body instead.
    const bodySource = (req.body && req.body.source) || result.source || 'pos';
    logOrderActionSafe({
      orderId: result.id, restaurantId: result.restaurant_id,
      actionType: 'updated', toStatus: result.status,
      performedByUserId: req.user?.id,
      performedByName: req.user?.full_name || req.user?.username || (bodySource === 'mobile' ? 'Mobile Customer' : 'POS Staff'),
      performedByRole: bodySource === 'mobile' ? 'customer' : 'staff',
      source: bodySource === 'mobile' ? 'mobile' : 'pos',
      metadata: {
        order_number: result.order_number,
        total_amount: result.total_amount,
        item_count: Array.isArray(result.order_items) ? result.order_items.length : 0,
        order_type: result.order_type
      }
    });

    res.json({ success: true, data: result });
  } catch (error) {
    if (error.message === 'Order not found') {
      return res.status(404).json({ success: false, error: error.message });
    }
    if (error.message === 'FORBIDDEN_CROSS_RESTAURANT') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }
    console.error('✗ Order 업데이트 실패:', error.message);
    console.error(error.stack);
    res.status(400).json({ success: false, error: error.message });
  }
});

// ════════════════════════════════════════════════════════════════════════
// Table Move / Transfer — POST /orders/:id/move-table  (2026-06-01)
// ════════════════════════════════════════════════════════════════════════
// Moves an open dine-in order to another table, carrying ALL data (items,
// totals, customer, order_group, payments) — they live on the same row, so
// nothing is split. Updates BOTH table_number AND floor_plan_table_id
// atomically (the generic PATCH only set table_number → order stayed pinned to
// the old Floor Plan table; that's why staff had to edit the DB by hand).
//
// Concurrency: row-locked in a transaction so two staff moving the same/colliding
// tables can't race. Destination-occupied is resolved inside the same lock.
//
// Body: { destinationTableNumber, destinationFloorPlanTableId?, onOccupied?: 'block'|'merge' }
//   - onOccupied 'block' (default): if the destination already has an open order,
//     respond 409 with that order's summary so the UI can ask merge-or-cancel.
//   - onOccupied 'merge': merge this order's items into the destination's order.
//
// Auth: any authenticated staff of THIS restaurant (Irene: staff included). IDOR
//   guarded by ownership check (same pattern as GET /:id, /:id/payments).
//
// Print: this endpoint does NOT print. It returns `stationChanged` + the item
//   station map so the FRONTEND decides whether to fire a VOID ticket (old
//   station) + reprint (new station). Keeps all printing on the client per the
//   🔒 print-protection rules — no print method/routing touched here.
router.post('/:id/move-table', authenticateToken, async (req, res) => {
  try {
    const { destinationTableNumber, destinationFloorPlanTableId, onOccupied = 'block' } = req.body || {};
    if (!destinationTableNumber || String(destinationTableNumber).trim() === '') {
      return res.status(400).json({ success: false, message: 'destinationTableNumber is required', code: 'DEST_REQUIRED' });
    }

    // §15-3-C 오프라인 재생 멱등 (op_id 있을 때만 — 온라인 무접촉, I2).
    if (req.body.op_id && await alreadyProcessed(req.body.op_id)) {
      return res.json({ success: true, deduped: true });
    }

    const outcome = await executeTransaction(async (t) => {
      const order = await Order.findByPk(req.params.id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!order) { const e = new Error('Order not found'); e.code = 'NOT_FOUND'; throw e; }

      // Ownership (IDOR): non-System-Admin can only touch their own restaurant.
      if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
          && req.user.role !== 'System Admin') {
        const e = new Error('Forbidden'); e.code = 'FORBIDDEN'; throw e;
      }
      // Can't move a finished order.
      if (['completed', 'cancelled'].includes(String(order.status)) || order.payment_status === 'completed') {
        const e = new Error('Cannot move a completed/cancelled order'); e.code = 'ORDER_CLOSED'; throw e;
      }

      const sourceTableNumber = order.table_number;
      const sourceFloorPlanTableId = order.floor_plan_table_id;

      // No-op move (same table) — nothing to do, return early so we don't reprint.
      const sameTable = String(sourceTableNumber || '') === String(destinationTableNumber)
        && String(sourceFloorPlanTableId || '') === String(destinationFloorPlanTableId || sourceFloorPlanTableId || '');
      if (sameTable) {
        const e = new Error('Source and destination are the same table'); e.code = 'SAME_TABLE'; throw e;
      }

      // Resolve destination floor_plan_table_id (canvas id) from label if not given.
      const restaurant = await Restaurant.findByPk(order.restaurant_id, { transaction: t });
      let destFpti = destinationFloorPlanTableId || null;
      if (!destFpti) {
        const fp = (restaurant && restaurant.floor_plan) || {};
        const fpTables = Array.isArray(fp.tables) ? fp.tables : [];
        const dn = String(destinationTableNumber);
        const matched = fpTables.find(tbl =>
          (tbl && tbl.id != null && String(tbl.id) === dn) ||
          (tbl && tbl.label != null && String(tbl.label) === dn) ||
          (tbl && tbl.tableNumber != null && String(tbl.tableNumber) === dn)
        );
        if (matched && matched.id != null) destFpti = String(matched.id);
      }

      // Destination occupied? An open order on the destination table (excluding this one).
      // Keyed on floor_plan_table_id when available (zone-safe), else table_number.
      //
      // 2026-06-01 IMPORTANT: the occupancy check MUST match what the Floor Plan
      // actually SHOWS (table-status, restaurants-crud.js) — which only counts
      // orders created TODAY and not table_cleared. Without the same today-window,
      // an old unpaid order (e.g. a 10-day-old test row) made the table look
      // "occupied" and triggered a merge prompt even though the user sees an EMPTY
      // table. Aligning the window means: if the destination looks empty on the
      // floor, the move just goes through (no spurious merge prompt). (Irene)
      // 2026-06-01: match table-status (restaurants-crud.js) EXACTLY so "occupied"
      // means the same thing on both surfaces. Previously this used a narrower
      // filter (payment_status:'pending', excluded served/completed, no order_type)
      // → a served/unpaid or kept-on-floor paid order showed as occupied on the
      // Floor Plan but this check saw the table as EMPTY, so a move silently stacked
      // two orders on one table with no merge prompt. Same DB conditions as the
      // table-status query (status notIn cancelled / order_type dine_in|takeaway /
      // today / not is_deleted), then the same post-filters (not table_cleared, and
      // — when clearTableOnPayment is on — drop completed/paid).
      const moveTz = getRestaurantTimezone(restaurant);
      const { startOfDay: occToday, endOfDay: occTodayEnd } = getTodayBounds(moveTz);
      const clearOnPay = ((restaurant && restaurant.table_settings) || {}).clearTableOnPayment === true;
      const destWhere = {
        restaurant_id: order.restaurant_id,
        id: { [Op.ne]: order.id },
        order_type: { [Op.in]: ['dine_in', 'takeaway'] },
        status: { [Op.notIn]: ['cancelled'] },
        table_cleared: { [Op.not]: true },
        createdAt: { [Op.between]: [occToday, occTodayEnd] },
        [Op.or]: [{ is_deleted: false }, { is_deleted: null }]
      };
      // clearTableOnPayment: a completed (paid) order no longer occupies the table.
      if (clearOnPay) destWhere.status = { [Op.notIn]: ['cancelled', 'completed'] };
      if (destFpti) destWhere.floor_plan_table_id = destFpti;
      else destWhere.table_number = destinationTableNumber;
      const destOrder = await Order.findOne({ where: destWhere, lock: t.LOCK.UPDATE, transaction: t });

      if (destOrder) {
        if (onOccupied === 'merge') {
          // 2026-06-01 PAYMENT-SAFETY: a merge cancels THIS (source) order. If it
          // carries money already collected (partial payment / split bill), that
          // payment lives on order_payments.order_id = source and amount_paid on
          // the source row — neither of which mergeItemsIntoOrder carries over. So
          // merging a partially-paid source would orphan its payment on a cancelled
          // row and under-credit the destination bill → the customer gets charged
          // again. Refuse the merge in that case (the safe choice — staff settles
          // the paid order first). Plain MOVE is unaffected (same row, money stays).
          const srcPaid = parseFloat(order.amount_paid || 0) > 0
            || ['partial', 'completed'].includes(String(order.payment_status));
          if (srcPaid) {
            const e = new Error('Cannot merge an order that already has a payment. Settle it first.');
            e.code = 'SOURCE_HAS_PAYMENT';
            throw e;
          }
          // Likewise refuse if the source redeemed loyalty points — cancelling it
          // here bypasses the point-refund path (only the PATCH status route refunds),
          // so the points would be silently burned. Settle/handle first.
          if (parseFloat(order.points_used || 0) > 0) {
            const e = new Error('Cannot merge an order that redeemed points. Handle it first.');
            e.code = 'SOURCE_HAS_POINTS';
            throw e;
          }
          // Merge THIS order's items into the destination order, then cancel this one.
          let myItems = order.order_items || [];
          if (typeof myItems === 'string') { try { myItems = JSON.parse(myItems); } catch { myItems = []; } }
          const mergeResult = await mergeItemsIntoOrder(destOrder, myItems, t, order.order_type); // #3 혼합차지: 소스 주문 타입 태깅
          // Soft-cancel the now-empty source order so it leaves the source table.
          await order.update({ status: 'cancelled', is_deleted: true, table_cleared: true }, { transaction: t });
          return {
            kind: 'merged',
            order: mergeResult.order,
            mergedFromOrderId: order.id,
            mergedFromOrderNumber: order.order_number,
            destinationOrderId: destOrder.id,
            sourceTableNumber, destinationTableNumber,
            addedItems: mergeResult.addedItems, orderGroup: mergeResult.orderGroup,
            // 2026-06-01: 머지도 재발행 가능하게 — source 의 "이미 주방에 간"(printed) 아이템을
            // 반환. 프론트가 TABLE CHANGED + MERGED 헤더로 목적지 station 에 재발행한다.
            // 2026-06-28 (R8, Irene): 이미 served/completed 품목은 재발행 제외 — clean move(1252)·
            // 취소·아이템취소와 동일 정책(서브된 지 한참 된 걸 머지 때 주방에 다시 안 보냄).
            printedItems: (Array.isArray(myItems) ? myItems : []).filter(it => it && (it.printed_at || it.printed) && it.status !== 'served' && it.status !== 'completed')
          };
        }
        // Default: block, hand the UI the destination order summary to decide.
        const e = new Error('Destination table already has an open order');
        e.code = 'DEST_OCCUPIED';
        e.dest = {
          orderId: destOrder.id, orderNumber: destOrder.order_number,
          tableNumber: destOrder.table_number, total_amount: destOrder.total_amount,
          itemCount: (() => { let it = destOrder.order_items; if (typeof it === 'string') { try { it = JSON.parse(it); } catch { it = []; } } return Array.isArray(it) ? it.length : 0; })()
        };
        throw e;
      }

      // ── Clean move: update BOTH table_number and floor_plan_table_id atomically.
      const updateData = { table_number: destinationTableNumber, table_cleared: false };
      if (destFpti) updateData.floor_plan_table_id = destFpti;
      await order.update(updateData, { transaction: t });

      // Detect kitchen-station change for items that were ALREADY sent to the
      // kitchen (printed_at set). The frontend uses this to void at the old
      // station + reprint at the new one. We don't change stations here — station
      // is derived from product/category, not table — but the PHYSICAL printer a
      // station maps to can differ per zone, so the client decides per its
      // kitchenStationPrinters config. We surface the printed items + their station.
      let items = order.order_items || [];
      if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
      // 2026-06-26 (Irene "이미 다 완료한 건 이동 갈 필요 없지"): 이미 served/completed(손님에게 이미
      // 나간) 품목은 테이블이동 재발행 대상에서 제외 — 주방에 다시 안 보낸다.
      const printedItems = (Array.isArray(items) ? items : []).filter(it => it && (it.printed_at || it.printed) && it.status !== 'served' && it.status !== 'completed');

      // 2026-06-24 (Irene): 이동 재인쇄를 "누른 기기 직접인쇄" → "DB → 인쇄 전담 POS 폴러" 로 통일.
      // 누가/어느 기기/어느 계정으로 이동했든 인쇄 전담 POS 가 새 테이블로 재발행한다(자동인쇄는
      // 계정 무관해야 정상 — Irene). 이미 주방에 나간 품목이 있으면 needs_print 켜고 그 품목들의
      // printed_at 을 비워(새 테이블로 다시 발행) + pending_reprint 에 "TABLE CHANGED" 안내를 담아
      // 폴러가 헤더로 찍고, /printed 가 비운다. 죽은 claim 자동복구(print_claimed_at)도 그대로 적용.
      // 인쇄 방식(billPrint) 무변경 — 트리거를 기기→DB로 옮긴 것뿐. 프론트 직접 재인쇄는 제거.
      //
      // 2026-06-25 (Irene "2번 옮겼는데 1장만 나옴"): 직전 이동 재발행이 아직 인쇄되기 전
      // (needs_print=true + pending_reprint.type='move')에 또 옮기면, move#1 이 이미 printed_at 을
      // 비워 두 번째 move 에선 printedItems 가 비어 → 새 안내를 못 만들고 옛 from→to 1장만 나갔다.
      // 직전 이동이 대기 중이면 fromTable 은 '맨 처음 출발지'를 유지하고 toTable 만 최종 목적지로
      // 갱신한다 → 빠른 연속 이동도 '최초 → 최종' 1장으로 정확히 인쇄(물리적으로 이미 찍힌 티켓은
      // 합칠 수 없으므로, 시간 간격이 있어 move#1 이 먼저 인쇄됐으면 자연히 2장 — 의도된 동작).
      let _priorReprint = order.pending_reprint;
      if (typeof _priorReprint === 'string') { try { _priorReprint = JSON.parse(_priorReprint); } catch { _priorReprint = null; } }
      const _priorMovePending = !!(order.needs_print && _priorReprint && _priorReprint.type === 'move');
      const _originFrom = (_priorMovePending && _priorReprint.fromTable != null) ? _priorReprint.fromTable : (sourceTableNumber || null);
      // §15-3-C 🔒: 오프라인 중 POS1 이 이동 안내표를 로컬로 이미 찍었으면(op_id+printed_offline) 재발행 큐 스킵
      // (이동 자체는 위에서 항상 적용됨 — 여기선 재발행 큐잉만 스킵). 로컬인쇄 실패면 플래그 없음 → 폴러가 1장(I3).
      const _skipMoveReprint = !!(req.body.op_id && req.body.printed_offline === true);
      if ((printedItems.length > 0 || _priorMovePending) && !_skipMoveReprint) {
        const _reprintUpdate = {
          needs_print: true,
          print_claimed_at: null,
          // 테이블 이동 = 새 라운드 → 통합 가드 리셋(이동 안내 통합 카피 재발행).
          consolidated_printed_at: null,
          // fromTable/toTable: 티켓 맨 아래 테이블 라인에 "이전(취소선) → 새" 로 표기(어느 테이블에서
          // 어디로 옮겼는지 주방이 즉시 알게). 프론트 billPrint 가 noticeHeader.fromTable/toTable 로 렌더.
          pending_reprint: { type: 'move', fromTable: _originFrom, toTable: destinationTableNumber || null, notice: { title: '** TABLE CHANGED **', fromTable: _originFrom, toTable: destinationTableNumber || null, lines: ['Discard the previous ticket.', 'Use THIS ticket.'] } }
        };
        // 새로 주방에 간 품목이 있으면 그 printed_at 만 비운다(새 테이블로 다시 발행). 직전 이동만
        // 대기 중(printedItems 비었음)이면 order_items 는 건드리지 않는다(이미 비워져 있음).
        if (printedItems.length > 0) {
          _reprintUpdate.order_items = (Array.isArray(items) ? items : []).map(it => {
            if (!it || typeof it !== 'object') return it;
            // served/completed 품목은 새 테이블로 다시 발행하지 않는다(이미 손님에게 나감) → printed_at 유지.
            if (it.status === 'served' || it.status === 'completed') return it;
            const c = { ...it }; delete c.printed_at; delete c.printed; return c;
          });
        }
        await order.update(_reprintUpdate, { transaction: t });
      }

      return {
        kind: 'moved',
        order,
        sourceTableNumber, destinationTableNumber,
        sourceFloorPlanTableId, destinationFloorPlanTableId: destFpti,
        printedItems
      };
    }, { maxRetries: 3 });

    // Socket: refresh source + destination tables for every connected screen.
    const io = req.app.get('io');
    if (io && outcome.order && outcome.order.restaurant_id) {
      const room = `restaurant_${outcome.order.restaurant_id}`;
      const plain = outcome.order.get ? outcome.order.get({ plain: true }) : outcome.order;
      if (typeof plain.order_items === 'string') { try { plain.order_items = JSON.parse(plain.order_items); } catch { plain.order_items = []; } }
      io.of('/orders').to(room).emit('order-updated', plain);
      if (outcome.kind === 'moved') {
        // 2026-06-01: KDS 가 "이 주문 테이블 바뀜" 을 명시적으로 안내(팝업+알림음)
        // 할 수 있게 별도 이벤트. order-updated 로 테이블 라벨은 이미 갱신되지만,
        // 주방이 못 보고 같은 주문을 또 만드는 사고를 막기 위해 눈에 띄게 알린다.
        // 인쇄는 하지 않는다(Irene). 종이 재발행 없이 화면 안내만.
        io.of('/orders').to(room).emit('table-moved', {
          orderId: outcome.order.id,
          orderNumber: plain.order_number,
          fromTable: outcome.sourceTableNumber,
          toTable: outcome.destinationTableNumber,
          // 주방이 만들던 아이템(이미 주방에 간 것)만 — 스테이션별 필터용.
          items: (outcome.printedItems || []).map(it => ({
            name: it.name, quantity: it.quantity || 1,
            kitchen_station_id: it.kitchen_station_id || null, stationName: it.stationName || null
          })),
          movedAt: new Date().toISOString()
        });
      }
      if (outcome.kind === 'merged') {
        io.of('/orders').to(room).emit('order-items-added', {
          orderId: outcome.destinationOrderId, orderNumber: plain.order_number,
          tableNumber: plain.table_number, orderGroup: outcome.orderGroup,
          addedItems: outcome.addedItems, itemCount: (outcome.addedItems || []).length,
          // 2026-06-12 (Irene): 테이블이동 머지를 일반 +Round 추가주문과 구분 —
          // FloorPlan/LiveOrders 배너가 "New Items Added" 대신 "Orders Merged" 로
          // 표기할 수 있게 출처를 명시한다(additive 필드 — 기존 소비자 무영향).
          viaTableMove: true,
          mergedFromTable: outcome.sourceTableNumber || null,
          mergedFromOrderNumber: outcome.mergedFromOrderNumber || null
        });
        // 2026-06-02: KDS 가 "이 주문이 다른 테이블/주문에 합쳐졌다" 를 명시 안내(팝업).
        // 이동(table-moved)과 같은 채널, merged 플래그로 문구만 분기. 인쇄 무관(화면 안내).
        io.of('/orders').to(room).emit('table-moved', {
          orderId: outcome.mergedFromOrderId,
          orderNumber: outcome.mergedFromOrderNumber || null,
          fromTable: outcome.sourceTableNumber,
          toTable: outcome.destinationTableNumber,
          merged: true,
          intoOrderNumber: plain.order_number,
          // 주방에 간(printed) 아이템만 — 스테이션별 필터용.
          items: (outcome.printedItems || []).map(it => ({
            name: it.name, quantity: it.quantity || 1,
            kitchen_station_id: it.kitchen_station_id || null, stationName: it.stationName || null
          })),
          movedAt: new Date().toISOString()
        });
        // 2026-06-01 SYNC-FIX: the source order was soft-cancelled by the merge.
        // Without an order-deleted, it lingered on Live Orders / KDS / Customer
        // Display (those screens only drop a row on order-deleted; order-updated
        // just maps the survivor). Mirror the older POST /orders/merge behaviour.
        io.of('/orders').to(room).emit('order-deleted', { id: outcome.mergedFromOrderId });
      }
    }

    // Audit
    logOrderActionSafe({
      orderId: outcome.order.id, restaurantId: outcome.order.restaurant_id,
      actionType: 'table_moved',
      performedByUserId: req.user?.id,
      performedByName: req.user?.full_name || req.user?.username || 'POS Staff',
      performedByRole: ['System Admin', 'Restaurant Admin'].includes(req.user?.role) ? 'admin' : 'staff',
      source: 'pos',
      metadata: {
        from_table: outcome.sourceTableNumber, to_table: outcome.destinationTableNumber,
        mode: outcome.kind, merged_from_order_id: outcome.mergedFromOrderId || null
      }
    });

    // §15-3-C: 재생 멱등 봉인(성공 시에만) — op_id 있을 때만.
    if (req.body.op_id && outcome.order) await recordProcessed(req.body.op_id, { order_id: outcome.order.id, type: 'move_table', restaurant_id: outcome.order.restaurant_id });

    return res.json({
      success: true,
      data: outcome.order,
      moved: outcome.kind === 'moved',
      merged: outcome.kind === 'merged',
      sourceTableNumber: outcome.sourceTableNumber,
      destinationTableNumber: outcome.destinationTableNumber,
      // Items already sent to kitchen (for the client to void@old + reprint@new).
      printedItems: outcome.printedItems || []
    });
  } catch (error) {
    const map = { NOT_FOUND: 404, FORBIDDEN: 403, ORDER_CLOSED: 409, SAME_TABLE: 400, DEST_OCCUPIED: 409, SOURCE_HAS_PAYMENT: 409, SOURCE_HAS_POINTS: 409 };
    const status = map[error.code] || 400;
    const body = { success: false, message: error.message, code: error.code || 'MOVE_FAILED' };
    if (error.code === 'DEST_OCCUPIED') body.destination = error.dest;
    if (status >= 500) console.error('✗ [MOVE-TABLE] Error:', error.message);
    return res.status(status).json(body);
  }
});

// Apply / replace a manual discount on an EXISTING order and recompute every total
// via the single canonical formula (computeOrderTotals — the same one the cart and
// merge paths use). Lets staff discount at PAYMENT time, including deferred payment
// from Live Orders / Floor Plan, not just at cart creation. (2026-05-31 Irene)
// Money path: reuses the tested formula — NO ad-hoc arithmetic, NO trusting a
// client-sent total. Recompute is server-side so front/back can't diverge.
router.patch('/:id/apply-discount', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    // IDOR guard (same pattern as GET /:id). System Admin sees all.
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }
    const subtotal = parseFloat(order.subtotal || 0);
    const takeaway = parseFloat(order.takeaway_charge || 0);
    const maxD = Math.max(0, subtotal + takeaway); // never below zero
    let D = Math.max(0, Number(req.body.discount) || 0);
    if (D > maxD) D = round2(maxD);
    const coupon = await resolveCouponMeta(order.restaurant_id, order.coupon_code);
    const totals = computeOrderTotals({
      newSubtotal: subtotal, oldSubtotal: subtotal,
      takeawayCharge: takeaway, deliveryFee: parseFloat(order.delivery_fee || 0),
      discount: D,
      oldDiscountPolicyAmount: parseFloat(order.discount_policy_amount || 0),
      oldCouponDiscount: parseFloat(order.coupon_discount || 0),
      coupon,
      pointDiscount: parseFloat(order.point_discount || 0),
      oldTax: parseFloat(order.tax || 0), taxRate: parseFloat(order.tax_rate || 0),
      oldServiceCharge: parseFloat(order.service_charge || 0), serviceChargeRate: parseFloat(order.service_charge_rate || 0),
      // #3 혼합차지: 할인 적용 후에도 서비스차지는 dine-in 품목 기준(순수 주문이면 null=기존)
      dineInSubtotal: mixedDineInSubtotal(order.order_items, order.order_type)
    });
    await order.update({
      discount: D,
      discount_policy_amount: totals.discountPolicyAmount,
      coupon_discount: totals.couponDiscount,
      tax: totals.tax,
      service_charge: totals.serviceCharge,
      total_amount: totals.total
    });
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const plain = order.get ? order.get({ plain: true }) : order;
      if (typeof plain.order_items === 'string') { try { plain.order_items = JSON.parse(plain.order_items); } catch (e) { plain.order_items = []; } }
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', plain);
    }
    res.json({ success: true, data: order, totals });
  } catch (e) {
    console.error('apply-discount error:', e);
    res.status(400).json({ success: false, message: e.message });
  }
});

// Status order for forward/backward detection
const STATUS_ORDER = { outstanding: 0, pending: 1, preparing: 2, ready: 3, served: 4, completed: 5, cancelled: -1 };

// ── 단일 단계 모델 (2026-06-12, Irene "전 화면 주문 단계 실시간 동기화 통일") ──────
// 근본원인(P1): order.status(주문 단위)와 order_items[].status(아이템 단위)가 별도 저장인데
// 전파가 비대칭이었다 — 전진 served/completed 만 아이템에 강제, 되돌리기는 미전파 →
// "완료→되돌린 주문이 KDS 에 안 뜸 / 아이템리스트 5 vs KDS 3" 드리프트.
// 원칙: ① 주문 단위 이동은 아이템이 같이 다닌다(전진=목표 미달 아이템 끌어올림, 되돌리기=
//        목표 초과 아이템 내림). ② 아이템 단위 이동은 주문 단계가 아이템 최저(min) 단계로
//        따라온다(roll-up, 상한 served — completed 전환은 재고차감·포인트 부수효과가 있는
//        /status 경로 전용). cancelled/outstanding/awaiting_payment 는 결제·취소 축이므로 무접촉.
const COOK_LVL = { pending: 1, preparing: 2, ready: 3, served: 4, completed: 5 };

// 주문 단위 이동을 아이템(+세트 구성품)에 동행시킨다. direction 은 주문 단계의 이동
// 방향(전진/되돌리기) 기준 — 아이템별로 방향을 따로 판정하면 전진 중 앞서간 아이템을
// 끌어내리는 오동작이 생긴다. 같은 단계 재전송(no-op PATCH)은 호출부에서 걸러진다.
function cascadeItemsToOrderStatus(items, targetStatus, isForwardMove) {
  const targetLvl = COOK_LVL[targetStatus];
  if (!targetLvl || !Array.isArray(items)) return items;
  const lvlOf = (s) => COOK_LVL[s] || COOK_LVL.pending; // 미지정 status = pending 취급
  const carry = (entry) => {
    if (!entry || typeof entry !== 'object') return entry;
    const lvl = lvlOf(entry.status);
    if (isForwardMove ? lvl < targetLvl : lvl > targetLvl) return { ...entry, status: targetStatus };
    return entry;
  };
  return items.map(item => {
    if (!item || typeof item !== 'object') return item;
    let out = carry(item);
    if (Array.isArray(out.set_items)) out = { ...out, set_items: out.set_items.map(carry) };
    if (Array.isArray(out.set_components)) out = { ...out, set_components: out.set_components.map(carry) };
    return out;
  });
}

// 아이템 단계 → 주문 단계 roll-up. 쿠킹 범위의 주문에서만, 아이템 최저(min) 단계를
// 주문 단계로 파생한다. completed 아이템은 served 로 취급(roll-up 상한).
// 반환: 바뀌어야 할 새 주문 status 또는 null(변경 불필요/비대상).
function deriveOrderStatusFromItems(items, currentOrderStatus) {
  if (!['pending', 'preparing', 'ready', 'served'].includes(currentOrderStatus)) return null;
  if (!Array.isArray(items) || items.length === 0) return null;
  const CAP = 4; // served
  const minLvl = items.reduce((m, it) => {
    const lvl = Math.min(COOK_LVL[it && it.status] || COOK_LVL.pending, CAP);
    return Math.min(m, lvl);
  }, CAP);
  const BY_LVL = { 1: 'pending', 2: 'preparing', 3: 'ready', 4: 'served' };
  const derived = BY_LVL[minLvl];
  return derived && derived !== currentOrderStatus ? derived : null;
}

// Update order status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, kitchen_ready, served_at } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // IDOR guard (same pattern as GET /:id). System Admin sees all.
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }

    // §15-3-A 오프라인 재생 멱등 + 터미널 무후퇴 (op_id 있을 때만 — 온라인 트래픽 무접촉, I2).
    // 재생 재전송은 한 번만 적용. 정전 중 타채널로 이미 종결(완료/취소)된 주문을 재생이 건드리지 않는다(§15-6).
    if (req.body.op_id) {
      if (await alreadyProcessed(req.body.op_id)) return res.json({ success: true, deduped: true });
      // 주문이 이미 터미널(완료/취소)이면 — 다른 상태로든(충돌) 같은 상태로든(예: cancelled→cancelled 재생)
      // 재실행 금지. 같은상태를 흘려보내면 취소표 큐(§15-3-B) 가 다시 돌아 취소표 중복(Fable 지적). 봉인 후 반환.
      if (['completed', 'cancelled'].includes(order.status)) {
        await recordProcessed(req.body.op_id, { order_id: order.id, type: 'set_stage', restaurant_id: order.restaurant_id });
        return res.json({ success: true, skipped: status === order.status ? ('already-' + order.status) : 'terminal-state', data: order });
      }
    }

    // 주문 취소는 void 권한(access_void) 직원만 → 서버(홀)·서빙 전용 직원 차단
    // (2026-06-24 access_void 분리; 이전엔 access_pos 통합). 단계 이동(준비/서빙 등)은 허용.
    // docs/SERVING_VIEW_DESIGN.md §7. (이 PATCH 는 단계이동·취소 양쪽에 쓰이므로 status 로 분기.)
    if (status === 'cancelled' && !userCanVoid(req.user)) {
      return res.status(403).json({
        success: false,
        error: 'Cancelling an order requires void/cancel permission.',
        code: 'VOID_ACCESS_REQUIRED'
      });
    }

    // 손실방지 게이트(설계 §4.4): requireVoidPin 매장은 취소 전에 권한 PIN 재검증.
    // 진입부에서만 차단 — 인쇄/취소표 발행 로직(프론트)과 무관. 게이트 OFF 매장은 무영향.
    let voidApprover = null;
    if (status === 'cancelled') {
      // 취소 사유 강제 — operation_settings.requireCancelReason 가 명시적 'required' 일 때만 거부.
      // (미설정/기본값은 자동·시스템 취소를 깨지 않도록 관대; UI 는 required 기본.) print-neutral.
      try {
        const rRow = await Restaurant.findByPk(order.restaurant_id, { attributes: ['operation_settings'] });
        const mode = rRow && rRow.operation_settings && rRow.operation_settings.requireCancelReason;
        const hasReason = req.body.reason && String(req.body.reason).trim();
        if (mode === 'required' && !hasReason) {
          return res.status(400).json({ success: false, code: 'CANCEL_REASON_REQUIRED', message: 'A cancellation reason is required.' });
        }
      } catch (_e) { /* 조회 실패 시 막지 않음 */ }
      const gate = await enforceVoidPin(order.restaurant_id, req.body.void_pin);
      if (!gate.ok) {
        return res.status(gate.status).json({ success: false, code: gate.code, message: gate.message });
      }
      voidApprover = gate.approver; // 게이트 OFF 면 null
    }

    // Served + 결제완료 → 자동으로 completed로 점프 (순방향 진행일 때만, revert 제외)
    const isForward = STATUS_ORDER[status] > STATUS_ORDER[order.status];
    const finalStatus = (status === 'served' && order.payment_status === 'completed' && isForward) ? 'completed' : status;

    const updateData = { status: finalStatus };
    if (kitchen_ready !== undefined) {
      updateData.kitchen_ready = kitchen_ready;
    }

    // Record served_at timestamp when status changes to 'served' or 'completed'
    // Accept from frontend if provided, otherwise generate (only if not already set)
    if ((finalStatus === 'served' || finalStatus === 'completed') && !order.served_at) {
      updateData.served_at = served_at ? new Date(served_at) : new Date();
    }

    // ── 단일 단계 모델: 주문 단위 이동은 아이템이 같이 다닌다 (2026-06-12) ─────────
    // 전진: 목표 단계 미달 아이템을 목표 단계로 끌어올림 (served→'served', completed→'completed'
    //       — 이전엔 served 인데도 아이템을 'completed' 로 강제해 주문↔아이템이 안 맞았다).
    // 되돌리기: 목표 단계를 넘어선 아이템을 목표 단계로 내림 — 이전 "revert 시 아이템 유지"가
    //       P1(완료→되돌린 주문이 KDS 에 안 뜸, 아이템리스트 5 vs KDS 3)의 근본원인.
    // 세트 구성품(set_items/set_components)도 동일 규칙으로 동행. 같은 단계 재전송은 무접촉.
    // cancelled/outstanding/awaiting_payment 는 COOK_LVL 밖이라 cascade 안 탐(기존 동일).
    {
      const _prevLvl = COOK_LVL[order.status] || 0;
      const _targetLvl = COOK_LVL[finalStatus];
      if (_targetLvl && _targetLvl !== _prevLvl && order.order_items) {
        try {
          const items = Array.isArray(order.order_items) ? order.order_items : JSON.parse(order.order_items);
          updateData.order_items = cascadeItemsToOrderStatus(items, finalStatus, _targetLvl > _prevLvl);
        } catch (e) {
          console.error('Failed to cascade item statuses:', e);
        }
      }
    }

    // Track if status changed to completed (for inventory deduction)
    const wasCompleted = order.status === 'completed';
    const willBeCompleted = finalStatus === 'completed';
    const prevStatus = order.status;  // audit log 용 snapshot

    await order.update(updateData);
    await order.reload(); // Ensure we have the latest data

    // 2026-06-24 (Irene): 주문취소 취소표를 "누른 기기 직접인쇄" → "DB → 인쇄 전담 POS 폴러" 로 통일.
    // 취소표 = 일반 오더티켓 + CANCELLED (PRINT_RULES_MATRIX §8.6). 이미 주방에 나간 품목이 있으면
    // needs_print 켜고 printed_at 비워(전체 CANCELLED 티켓) + pending_reprint notice. 누른 기기/계정 무관
    // (자동인쇄 계정차이 제거). 인쇄 방식(billPrint) 무변경 — 트리거를 기기→DB로 옮긴 것뿐.
    // §15-3-B 🔒: 오프라인 중 POS1 이 취소표를 로컬로 이미 찍었으면(op_id+printed_offline) 재생이 재발행 큐를
    // 켜지 않는다 → 폴러 재발행 0(취소표 정확히 1장). 로컬인쇄 실패였으면 플래그 없음 → 아래 기존 경로로 폴러가
    // 복구 후 1장(늦지만 정확히 1장, I3). 온라인 취소는 op_id 없어 그대로.
    if (finalStatus === 'cancelled' && !(req.body.op_id && req.body.printed_offline === true)) {
      try {
        let citems = order.order_items; if (typeof citems === 'string') { try { citems = JSON.parse(citems); } catch { citems = []; } }
        // 2026-06-26 (Irene "이미 다 완료한 건 취소 갈 필요 없지"): 이미 served/completed(손님에게 이미
        // 나간) 품목은 취소표에서 제외 — printed_at 유지로 kitchen_items 에서 빠짐. 전부 served 면 취소표 자체 안 나감.
        const _notServed = (it) => it && it.status !== 'served' && it.status !== 'completed';
        const hadPrinted = (Array.isArray(citems) ? citems : []).some(it => it && (it.printed_at || it.printed) && _notServed(it));
        if (hadPrinted) {
          const cleared = (Array.isArray(citems) ? citems : []).map(it => { if (!it || typeof it !== 'object') return it; if (!_notServed(it)) return it; const c = { ...it }; delete c.printed_at; delete c.printed; return c; });
          const _creason = (req.body.reason && String(req.body.reason).trim()) || '';
          await order.update({
            order_items: cleared, needs_print: true, print_claimed_at: null,
            // 주문취소 = 새 라운드 → 통합 가드 리셋(취소 안내 통합 카피 재발행).
            consolidated_printed_at: null,
            pending_reprint: { type: 'cancel', notice: { title: '** ORDER CANCELLED **', lines: _creason ? ['Reason: ' + _creason, 'Do NOT make this order.'] : ['Do NOT make this order.'] } }
          });
        }
      } catch (_e) { console.error('[cancel-reprint] queue error:', _e.message); }
    }

    // 예약-주문 루프 닫기 (P2-6, 인쇄 무관) — 연결된 주문이 completed 되면 예약 seated→completed.
    // (백스톱: reservationScheduler.autoCompleteStale 이 turn+grace 후에도 닫음.) 실패 비치명.
    if (willBeCompleted && !wasCompleted && order.reservation_id) {
      try {
        const resv = await Reservation.findByPk(order.reservation_id);
        if (resv && ['arrived', 'seated'].includes(resv.status)) {
          await resv.update({ status: 'completed', completed_at: new Date() });
          if (resv.customer_id) {
            const RC = require('../models/RestaurantCustomer');
            const c = await RC.findByPk(resv.customer_id);
            if (c) await c.update({ last_reservation_at: new Date() });
          }
        }
      } catch (e) { /* non-fatal */ }
    }

    // ── Order Action audit log — fire-and-forget (실패해도 메인 흐름 영향 0) ─────
    // KDS PIN staff 정보 — req.body.kds_staff_id / kds_staff_name 으로 전달 (KDS PIN 흐름)
    const kdsStaffId = req.body.kds_staff_id;
    const kdsStaffName = req.body.kds_staff_name;
    const auditSource = req.body.source || (kdsStaffId ? 'kds' : 'pos');  // KDS PIN 있으면 source=kds
    const auditPerformerId = kdsStaffId || req.user?.id;
    const auditPerformerName = kdsStaffName || req.user?.full_name || req.user?.username || 'Unknown';
    const auditRole = req.user?.role === 'System Admin' || req.user?.role === 'Restaurant Admin'
      ? 'admin' : (kdsStaffId ? 'staff' : (req.user?.role === 'Staff' ? 'staff' : 'admin'));

    if (finalStatus === 'cancelled') {
      logOrderActionSafe({
        orderId: order.id, restaurantId: order.restaurant_id,
        actionType: 'cancelled', fromStatus: prevStatus, toStatus: 'cancelled',
        performedByUserId: auditPerformerId, performedByName: auditPerformerName, performedByRole: auditRole,
        source: auditSource,
        reason: (req.body.reason && String(req.body.reason).trim()) || 'No reason provided',
        // 손실방지 감사(설계 §4.5): 금액·결제상태·결제수단·승인자 캡처 → 사장 감시 리포트의 핵심.
        metadata: {
          previous_status: prevStatus,
          amount: parseFloat(order.total_amount) || 0,
          payment_status: order.payment_status || null,
          payment_method: order.payment_method || null,
          approved_by_pin: voidApprover || null
        }
      });
    } else if (prevStatus !== finalStatus) {
      logOrderActionSafe({
        orderId: order.id, restaurantId: order.restaurant_id,
        actionType: 'status_change', fromStatus: prevStatus, toStatus: finalStatus,
        performedByUserId: auditPerformerId, performedByName: auditPerformerName, performedByRole: auditRole,
        source: auditSource
      });
    }

    // Deduct inventory when order is completed (only if it wasn't already completed)
    // Note: deductInventoryForOrder uses its own transaction internally
    // If inventory deduction fails, the order status is already saved
    // This is intentional - we don't want to block order completion due to inventory issues
    if (willBeCompleted && !wasCompleted && order.order_items) {
      try {
        const items = Array.isArray(order.order_items) ? order.order_items : JSON.parse(order.order_items);
        const deductionResult = await deductInventoryForOrder(
          order.restaurant_id,
          items,
          order.order_number || order.id.toString()
        );

        if (!deductionResult.success) {
          console.error(`⚠️ [INVENTORY] Deduction failed for order ${order.id}:`, deductionResult.error);
        } else {
          console.log(`✓ [INVENTORY] Deducted ${deductionResult.deductions.length} ingredients for order ${order.id}`);
          if (deductionResult.warnings.length > 0) {
            console.warn(`⚠️ [INVENTORY] Warnings:`, deductionResult.warnings);
          }
        }
      } catch (inventoryError) {
        // Don't fail the order update if inventory deduction fails
        console.error(`✗ [INVENTORY] Error deducting inventory for order ${order.id}:`, inventoryError);
      }

      // Earn points when order is completed (if customer exists)
      if (order.customer_id) {
        try {
          const pointResult = await earnPointsForOrder(
            order.restaurant_id,
            order.customer_id,
            order.id,
            parseFloat(order.total_amount) || 0
          );

          if (pointResult.success && pointResult.earnedPoints > 0) {
            console.log(`✓ [POINTS] Earned ${pointResult.earnedPoints} points for order ${order.id}`);
          }
        } catch (pointError) {
          // Don't fail the order update if point earning fails
          console.error(`✗ [POINTS] Error earning points for order ${order.id}:`, pointError);
        }
      }
    }

    // Refund points when order is cancelled (if customer exists)
    if (status === 'cancelled' && order.customer_id) {
      try {
        const refundResult = await refundPointsForOrder(
          order.restaurant_id,
          order.customer_id,
          order.id
        );

        if (refundResult.success && refundResult.refundedPoints > 0) {
          console.log(`✓ [POINTS] Refunded ${refundResult.refundedPoints} points for order ${order.id}`);
        }
      } catch (pointError) {
        // Don't fail the order update if point refund fails
        console.error(`✗ [POINTS] Error refunding points for order ${order.id}:`, pointError);
      }
    }

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      console.log(`📡 [STATUS] Emitting order-updated for order ${order.id}, status: ${order.status}`);
      const plainStatusOrder = order.get ? order.get({ plain: true }) : order;
      if (typeof plainStatusOrder.order_items === 'string') {
        try { plainStatusOrder.order_items = JSON.parse(plainStatusOrder.order_items); } catch(e) { plainStatusOrder.order_items = []; }
      }
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', plainStatusOrder);
    } else {
      console.warn('⚠️ [STATUS] Socket.IO not available or restaurant_id missing');
    }

    // Activity log for status changes
    const oldStatus = wasCompleted ? 'completed' : (req.body.status !== finalStatus ? req.body.status : null);
    logActivity(req, {
      action_type: 'update',
      entity_type: 'order',
      entity_id: order.id,
      entity_name: order.order_number,
      description: `Order #${order.order_number} status → ${finalStatus}${order.table_number ? ` (Table ${order.table_number})` : ''}`,
      changes: { before: { status: oldStatus || order.status }, after: { status: finalStatus } },
      restaurant_id: order.restaurant_id
    });

    // §15-3-A: 재생 멱등 봉인(성공 시에만) — op_id 있을 때만.
    if (req.body.op_id) await recordProcessed(req.body.op_id, { order_id: order.id, type: 'set_stage', restaurant_id: order.restaurant_id });

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update order items (for kitchen item status tracking)
router.patch('/:id/items', authenticateToken, async (req, res) => {
  try {
    const { order_items, recalculateTotal = false } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // IDOR guard (same pattern as GET /:id). System Admin sees all.
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }

    // §15-3-F 오프라인 재생 멱등 (op_id 있을 때만 — 온라인 무접촉, I2). STALE_WRITE/forward-only
    // 가드는 그대로 아래에서 적용(재생도 동일 보호를 받는 것이 정답 — 정전 중 서버 드리프트 방어).
    if (req.body.op_id && await alreadyProcessed(req.body.op_id)) {
      return res.json({ success: true, deduped: true });
    }

    // ── STALE-WRITE GUARD (2026-06-26, item 5) — optimistic concurrency ───────
    // order_items is a FULL-ARRAY replace, so a device working from a stale cache
    // (it missed a concurrent edit during a connection blip) silently overwrites
    // another device's change. Reported case: T-3 계란찜 was reduced 2→1 on one POS,
    // then a 'served' write from a second POS carrying the cached [계란찜×2] restored
    // qty to 2 (only the total looked new). The forward-only guard below clamps
    // cooking STATUS but NOT quantities/removals, so it cannot catch this. A client
    // may send base_updated_at = the updatedAt it last read; if the row moved on
    // since (>1s newer), reject with 409 STALE_WRITE and return the current order so
    // the client refreshes and re-applies. Opt-in: callers that omit base_updated_at
    // behave exactly as before — no regression for KDS or any other writer. The 1s
    // tolerance absorbs DATETIME second-precision and rapid same-device edits (a real
    // stale write is many seconds old). No print routing touched.
    const _baseTs = req.body.base_updated_at ? new Date(req.body.base_updated_at).getTime() : null;
    if (_baseTs != null && !Number.isNaN(_baseTs) && order.updatedAt
        && (new Date(order.updatedAt).getTime() - _baseTs) > 1000) {
      let _curItems = order.order_items;
      if (typeof _curItems === 'string') { try { _curItems = JSON.parse(_curItems); } catch { _curItems = []; } }
      const _plain = order.get ? order.get({ plain: true }) : order;
      _plain.order_items = _curItems;
      return res.status(409).json({
        success: false, code: 'STALE_WRITE',
        message: 'This order was just changed on another device. Refresh and try again.',
        data: _plain
      });
    }

    // snapshot for audit diff
    let _prevItemsForAudit = order.order_items;
    if (typeof _prevItemsForAudit === 'string') {
      try { _prevItemsForAudit = JSON.parse(_prevItemsForAudit); } catch (_e) { _prevItemsForAudit = []; }
    }
    if (!Array.isArray(_prevItemsForAudit)) _prevItemsForAudit = [];

    // ── Forward-only cooking-stage guard (2026-05-31, Irene) ──────────────────
    // order_items is a FULL-ARRAY replace, so a STALE client (one that missed a
    // concurrent update) can overwrite an already-progressed item's cooking status
    // with an older/lower one — the root cause of "served item reappears / 주방
    // 단계가 자동으로 되돌아감". For each item matched by id, never let its cooking
    // status move BACKWARD on this write. The explicit manual Revert button sends
    // allowItemRevert=true to bypass. New items, removed items and quantity edits
    // are untouched (only the cooking status is clamped). This does NOT change order
    // status (so +Round/payment/outstanding flows are unaffected) and does NOT touch
    // print routing — it only prevents a regression of item status.
    const _allowItemRevert = req.body.allowItemRevert === true;
    let _itemsToSave = order_items;
    if (!_allowItemRevert && Array.isArray(order_items)) {
      const _STAGE = { pending: 0, preparing: 1, ready: 2, served: 3, completed: 4 };
      const _lvl = s => (_STAGE[s] != null ? _STAGE[s] : 0);
      const _exById = {};
      for (const it of _prevItemsForAudit) { if (it && it.id != null) _exById[it.id] = it; }
      _itemsToSave = order_items.map(it => {
        if (!it || it.id == null) return it;          // new / id-less item → as-is
        const ex = _exById[it.id];
        if (!ex) return it;                            // unmatched → as-is
        let out = it;
        if (_lvl(it.status) < _lvl(ex.status)) out = { ...out, status: ex.status }; // never lower
        if (Array.isArray(out.set_items) && Array.isArray(ex.set_items)) {
          const _exSi = {};
          for (const s of ex.set_items) { if (s && s.id != null) _exSi[s.id] = s; }
          out = { ...out, set_items: out.set_items.map(si => {
            if (!si || si.id == null) return si;
            const e = _exSi[si.id];
            return (e && _lvl(si.status) < _lvl(e.status)) ? { ...si, status: e.status } : si;
          }) };
        }
        return out;
      });
    }

    // Note: Don't use JSON.stringify - Sequelize setter handles it automatically
    const updateData = {
      order_items: _itemsToSave
    };

    // ── 단일 단계 모델: 아이템 → 주문 roll-up (2026-06-12) ─────────────────────
    // 아이템 단위 이동(전진·되돌리기 모두)이 곧바로 주문 단계에 반영된다 — 주문 단계 =
    // 아이템 최저(min) 단계. 이전엔 프론트 3곳(LiveOrders/FloorPlan/TableDetailPanel)이
    // "전부 served 면 /status served" 를 제각각 호출했고 되돌리기는 아무도 반영 안 해
    // 화면마다 단계가 달랐다. roll-up 상한은 served(— completed 는 재고차감·포인트
    // 부수효과가 있는 /status 경로 전용). 쿠킹 범위 밖 주문(outstanding 등)은 무접촉.
    const _prevOrderStatusItems = order.status;
    const _rolledStatus = deriveOrderStatusFromItems(_itemsToSave, order.status);
    if (_rolledStatus) {
      updateData.status = _rolledStatus;
      if (_rolledStatus === 'served' && !order.served_at) updateData.served_at = new Date();
    }

    // Recalculate total_amount if requested or if items changed significantly
    if (recalculateTotal && Array.isArray(_itemsToSave)) {
      const newTotal = _itemsToSave.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQty = parseInt(item.quantity) || 1;
        return sum + (itemPrice * itemQty);
      }, 0);
      updateData.total_amount = newTotal;
      console.log(`📊 [ITEMS] Recalculated total_amount for order ${order.id}: ${newTotal}`);
    }

    // Update order items
    await order.update(updateData);
    await order.reload();

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const plainItemsOrder = order.get ? order.get({ plain: true }) : order;
      if (typeof plainItemsOrder.order_items === 'string') {
        try { plainItemsOrder.order_items = JSON.parse(plainItemsOrder.order_items); } catch(e) { plainItemsOrder.order_items = []; }
      }
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', plainItemsOrder);
    }

    // ── Audit log — roll-up 으로 주문 단계가 따라 움직였으면 status_change 기록 ────
    if (_rolledStatus && _rolledStatus !== _prevOrderStatusItems) {
      logOrderActionSafe({
        orderId: order.id, restaurantId: order.restaurant_id,
        actionType: 'status_change', fromStatus: _prevOrderStatusItems, toStatus: _rolledStatus,
        performedByUserId: req.body.kds_staff_id || req.user?.id,
        performedByName: req.body.kds_staff_name || req.user?.full_name || req.user?.username,
        performedByRole: req.body.kds_staff_id ? 'staff' : (['System Admin','Restaurant Admin'].includes(req.user?.role) ? 'admin' : 'staff'),
        source: req.body.source || (req.body.kds_staff_id ? 'kds' : 'pos'),
        metadata: { derived_from_items: true }
      });
    }

    // ── Audit log — items modified (item_modified) ────────────────
    const _newItemsArr = Array.isArray(order_items) ? order_items : [];
    const _prevCount = _prevItemsForAudit.length;
    const _newCount = _newItemsArr.length;
    const _kdsStaffIdMod = req.body.kds_staff_id;
    const _kdsStaffNameMod = req.body.kds_staff_name;
    let _modActionType = 'item_modified';
    if (_newCount > _prevCount) _modActionType = 'item_added';
    else if (_newCount < _prevCount) _modActionType = 'item_removed';
    logOrderActionSafe({
      orderId: order.id, restaurantId: order.restaurant_id,
      actionType: _modActionType,
      performedByUserId: _kdsStaffIdMod || req.user?.id,
      performedByName: _kdsStaffNameMod || req.user?.full_name || req.user?.username,
      performedByRole: _kdsStaffIdMod ? 'staff' : (['System Admin','Restaurant Admin'].includes(req.user?.role) ? 'admin' : 'staff'),
      source: req.body.source || (_kdsStaffIdMod ? 'kds' : 'pos'),
      metadata: {
        previous_item_count: _prevCount,
        new_item_count: _newCount,
        total_changed: !!recalculateTotal
      }
    });

    // §15-3-F: 재생 멱등 봉인(성공 시에만) — op_id 있을 때만.
    if (req.body.op_id) await recordProcessed(req.body.op_id, { order_id: order.id, type: 'cancel_item', restaurant_id: order.restaurant_id });

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete order (soft delete - preserves order number)
// Hard rule: only Restaurant Admin (or higher) may permanently remove an order.
// Staff can cancel via PATCH /:id/status with status='cancelled'.
router.delete('/:id', authenticateToken, requireRole('Restaurant Admin', 'System Admin', 'Restaurant Owner'), async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    const restaurantId = order.restaurant_id;
    const orderId = order.id;

    // Soft delete - mark as deleted but preserve order number
    await order.update({
      is_deleted: true,
      deleted_at: new Date()
    });

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && restaurantId) {
      io.of('/orders').to(`restaurant_${restaurantId}`).emit('order-deleted', { id: orderId });
    }

    res.json({ success: true, message: 'Order removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders/:id/actions — audit trail (status changes, cancellation, payment events).
// Used by Live Orders detail modal to show "Cancelled from X at HH:MM by 직원이름".
router.get('/:id/actions', authenticateToken, async (req, res) => {
  try {
    const OrderAction = require('../models/OrderAction');
    const order = await Order.findByPk(req.params.id, { attributes: ['id', 'restaurant_id'] });
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }
    // Tenant guard — RA/Staff must belong to the same restaurant
    const userRestaurantId = req.user?.restaurantId || req.user?.restaurant_id;
    const isPrivileged = ['System Admin', 'Restaurant Owner', 'Brand General', 'Foodcourt General'].includes(req.user?.role);
    if (!isPrivileged && Number(userRestaurantId) !== Number(order.restaurant_id)) {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }
    const actions = await OrderAction.findAll({
      where: { order_id: order.id },
      order: [['created_at', 'ASC']],
      // metadata 포함(2026-06-25): table_moved 의 from_table/to_table 를 프론트가 "X → Y" 로 표시.
      attributes: ['id', 'action_type', 'from_status', 'to_status', 'performed_by_name', 'performed_by_role', 'source', 'reason', 'metadata', 'created_at']
    });
    res.json({ success: true, data: actions });
  } catch (error) {
    console.error('GET /orders/:id/actions error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: process.env.NODE_ENV === 'production' ? 'Failed to load order actions' : error.message,
        code: 'INTERNAL_ERROR'
      }
    });
  }
});

// Get orders by restaurant ID

router.post('/merge', authenticateToken, async (req, res) => {
  try {
    const { orderIds, targetOrderId } = req.body;

    // Validate input
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length < 2) {
      return res.status(400).json({ success: false, error: { message: 'At least 2 order IDs are required for merging', code: 'VALIDATION_ERROR' } });
    }

    // Use transaction for atomicity
    const result = await sequelize.transaction(async (t) => {
      // Fetch all orders with lock
      const orders = await Order.findAll({
        where: {
          id: { [Op.in]: orderIds }
        },
        lock: t.LOCK.UPDATE,
        transaction: t
      });

      if (orders.length !== orderIds.length) {
        throw new Error('Some orders were not found');
      }

      // Validate all orders are mergeable
      const restaurantIds = new Set(orders.map(o => o.restaurant_id));
      if (restaurantIds.size > 1) {
        throw new Error('Cannot merge orders from different restaurants');
      }

      // IDOR guard: caller must own the restaurant these orders belong to.
      // (Same ownership pattern as GET /:id; orders all share one restaurant_id here.)
      if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(orders[0].restaurant_id)
          && req.user.role !== 'System Admin') {
        throw new Error('FORBIDDEN_CROSS_RESTAURANT');
      }

      for (const order of orders) {
        if (order.payment_status === 'completed') {
          throw new Error(`Order ${order.order_number} is already paid and cannot be merged`);
        }
        if (['completed', 'cancelled'].includes(order.status)) {
          throw new Error(`Order ${order.order_number} has status "${order.status}" and cannot be merged`);
        }
      }

      // Determine target order (specified or oldest)
      let target;
      if (targetOrderId) {
        target = orders.find(o => o.id === targetOrderId);
        if (!target) {
          throw new Error('Target order not found in the provided order IDs');
        }
      } else {
        // Use the oldest order as target
        target = orders.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
      }

      const sourceOrders = orders.filter(o => o.id !== target.id);

      // Merge all items
      let targetItems = target.order_items || [];
      if (typeof targetItems === 'string') {
        targetItems = JSON.parse(targetItems);
      }
      // Snapshot target's own items before appending sources (% 할인 비율 도출 base)
      const targetOriginalItems = [...targetItems];

      const now = new Date().toISOString();
      const deletedOrderIds = [];
      const mergedSources = [];

      for (const source of sourceOrders) {
        let sourceItems = source.order_items || [];
        if (typeof sourceItems === 'string') {
          sourceItems = JSON.parse(sourceItems);
        }

        // Add merged_from info and timestamp to source items
        const itemsWithMergeInfo = sourceItems.map(item => ({
          ...item,
          merged_from: source.order_number,
          merged_at: now
        }));

        targetItems = [...targetItems, ...itemsWithMergeInfo];

        // Soft delete source order
        await source.update({
          is_deleted: true,
          deleted_at: new Date(),
          status: 'cancelled'
        }, { transaction: t });

        deletedOrderIds.push(source.id);
        // 2026-06-03: KDS 표시 전용 머지 안내용 소스 메타. 인쇄 아님 —
        // 스테이션 필터용 품목 이름/스테이션만 (재인쇄하지 않는다, Irene 결정).
        mergedSources.push({
          id: source.id,
          orderNumber: source.order_number,
          tableNumber: source.table_number,
          items: sourceItems.map(it => ({
            name: it.name,
            quantity: it.quantity || 1,
            kitchen_station_id: it.kitchen_station_id || null
          }))
        });
      }

      // Recalculate total - preserve existing discounts from target order
      const itemsSubtotal = targetItems.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQty = parseInt(item.quantity) || 1;
        return sum + (itemPrice * itemQty);
      }, 0);

      // Subtotal of the target BEFORE merging sources (% 할인 비율 도출용)
      const targetOldSubtotal = targetOriginalItems.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQty = parseInt(item.quantity) || 1;
        return sum + (itemPrice * itemQty);
      }, 0);

      // 2026-05-29: 정식 공식으로 전체 재계산 (세금·서비스차지 afterDiscount 기준,
      // % 할인정책·쿠폰 새 소계 재계산, 고정 할인·포인트 유지)
      const couponMeta = await resolveCouponMeta(target.restaurant_id, target.coupon_code, t);
      const totals = computeOrderTotals({
        newSubtotal: itemsSubtotal,
        oldSubtotal: targetOldSubtotal,
        takeawayCharge: target.takeaway_charge,
        deliveryFee: target.delivery_fee,
        discount: target.discount,
        oldDiscountPolicyAmount: target.discount_policy_amount,
        oldCouponDiscount: target.coupon_discount,
        coupon: couponMeta,
        pointDiscount: target.point_discount,
        oldTax: target.tax,
        taxRate: target.tax_rate,
        oldServiceCharge: target.service_charge,
        serviceChargeRate: target.service_charge_rate,
        // #3 혼합차지: 테이블 합본 후에도 서비스차지는 dine-in 품목 기준(순수면 null=기존)
        dineInSubtotal: mixedDineInSubtotal(targetItems, target.order_type)
      });

      // Update target order
      // Note: Don't use JSON.stringify - Sequelize setter handles it automatically
      await target.update({
        order_items: targetItems,
        subtotal: itemsSubtotal,
        tax: totals.tax,
        service_charge: totals.serviceCharge,
        discount_policy_amount: totals.discountPolicyAmount,
        coupon_discount: totals.couponDiscount,
        total_amount: totals.total,
        status: 'pending' // Reset to pending for kitchen re-review
      }, { transaction: t });

      await target.reload({ transaction: t });

      return {
        mergedOrder: target,
        deletedOrderIds,
        mergedSources
      };
    });

    console.log(`✓ [MERGE] Merged orders ${orderIds.join(', ')} into order ${result.mergedOrder.id}`);

    // Emit socket events
    const io = req.app.get('io');
    if (io && result.mergedOrder.restaurant_id) {
      const room = `restaurant_${result.mergedOrder.restaurant_id}`;

      // Emit update for merged order - convert to plain object
      const plainMergedOrder = result.mergedOrder.get ? result.mergedOrder.get({ plain: true }) : result.mergedOrder;
      if (typeof plainMergedOrder.order_items === 'string') {
        try { plainMergedOrder.order_items = JSON.parse(plainMergedOrder.order_items); } catch(e) { plainMergedOrder.order_items = []; }
      }
      io.of('/orders').to(room).emit('order-updated', plainMergedOrder);

      // Emit delete for source orders
      for (const deletedId of result.deletedOrderIds) {
        io.of('/orders').to(room).emit('order-deleted', { id: deletedId });
      }

      // 2026-06-03: KDS 표시 전용 머지 안내 팝업. 소스 주문 품목은 원래 주문
      // 생성 때 이미 주방에 인쇄됐으므로 재인쇄하지 않는다(Irene 결정: 팝업만).
      // order-items-added(자동인쇄 유발) 대신 table-moved(merged:true) 만 발행 —
      // FloorPlan 머지(:1213)와 동일한 표시 전용 채널. 티켓 중복 위험 0.
      const mergedToTable = plainMergedOrder.table_number || null;
      for (const src of (result.mergedSources || [])) {
        io.of('/orders').to(room).emit('table-moved', {
          orderId: src.id,
          orderNumber: src.orderNumber || String(src.id),
          fromTable: src.tableNumber || undefined,
          toTable: mergedToTable || undefined,
          merged: true,
          intoOrderNumber: plainMergedOrder.order_number,
          items: src.items || [],
          movedAt: new Date().toISOString()
        });
      }
    }

    res.json({
      success: true,
      data: result.mergedOrder,
      deletedOrderIds: result.deletedOrderIds,
      message: `Successfully merged ${orderIds.length} orders`
    });

  } catch (error) {
    console.error('✗ [MERGE] Error:', error.message);
    if (error.message === 'FORBIDDEN_CROSS_RESTAURANT') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }
    res.status(400).json({ success: false, error: error.message });
  }
});

// Add items to existing order
// POST /api/orders/:id/add-items
router.post('/:id/add-items', authenticateToken, async (req, res) => {
  try {
    const { items } = req.body;
    const orderId = req.params.id;

    // 오프라인 5단계(§8) opId 멱등 — SyncEngine 재생 시 응답유실 재전송을 한 번만 적용.
    // op_id 는 재생 요청만 보냄 → 온라인 일반 add-items 엔 없어 통과(동작 100% 동일).
    if (req.body.op_id && await alreadyProcessed(req.body.op_id)) {
      return res.json({ success: true, deduped: true });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: { message: 'Items array is required', code: 'VALIDATION_ERROR' } });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // Tenant guard (IDOR defence): order must belong to the requester's restaurant.
    // Privileged roles (multi-restaurant scope) bypass; they have their own scope filter elsewhere.
    {
      const userRid = req.user?.restaurant_id || req.user?.restaurantId;
      const privileged = ['System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner'].includes(req.user?.role);
      if (!privileged && Number(order.restaurant_id) !== Number(userRid)) {
        return res.status(403).json({ success: false, error: { message: 'Forbidden — order belongs to a different restaurant', code: 'FORBIDDEN' } });
      }
    }

    // Validate order can accept new items
    if (order.payment_status === 'completed') {
      return res.status(400).json({ success: false, error: { message: 'Cannot add items to a paid order', code: 'VALIDATION_ERROR' } });
    }

    if (['completed', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot add items to an order with status "${order.status}"`
      });
    }

    // 2026-05-28: Route through the shared mergeItemsIntoOrder helper so this
    // path gets the same station enrichment + needs_print=true + order_group
    // tracking as auto-merge / mobile merge / merge-items. Previously the
    // /add-items route had its own raw item-map without enrichment, so POS
    // 추가주문 (Live Orders 의 메뉴 추가 흐름) 에 station 라우팅이 빠지고
    // additional-items kitchen ticket 도 폴링 path 에서 누락됐다.
    // §15-3-E-3: takeaway_charge 5번째 인자(forceMerge 분기와 등가 — 오프라인 takeaway 라운드 포장비 유실 방지;
    // 온라인은 이 키를 안 보내 무접촉). printedOffline 6번째 = op_id+printed_offline 일 때만(재생 재인쇄 0, I2).
    const mergeResult = await mergeItemsIntoOrder(order, items, null, req.body.order_type, req.body.takeaway_charge, { printedOffline: !!(req.body.op_id && req.body.printed_offline === true) }); // #3 혼합차지: 추가분 타입 태깅(다르면 혼합)
    const newItemsWithTimestamp = mergeResult.addedItems;
    const newTotal = mergeResult.newTotal;

    console.log(`✓ [ADD-ITEMS] Added ${newItemsWithTimestamp.length} items to order ${order.id} (group: ${mergeResult.orderGroup})`);

    // Emit socket events. Both order-updated (UI refresh) and order-items-added
    // (KDS additional-items ticket fast path). The KDS handler consumes
    // addedItems with their enriched kitchen_station_id to route the ticket
    // to the correct station printer; without this event, KDS silently missed
    // every POS-side 추가주문 and had to wait for the polling cycle.
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const plainAddOrder = order.get ? order.get({ plain: true }) : order;
      if (typeof plainAddOrder.order_items === 'string') {
        try { plainAddOrder.order_items = JSON.parse(plainAddOrder.order_items); } catch(e) { plainAddOrder.order_items = []; }
      }
      const room = `restaurant_${order.restaurant_id}`;
      io.of('/orders').to(room).emit('order-updated', plainAddOrder);
      io.of('/orders').to(room).emit('order-items-added', {
        orderId: order.id,
        orderNumber: order.order_number,
        tableNumber: order.table_number,
        pagerNumber: order.pager_number,
        orderGroup: mergeResult.orderGroup,
        addedItems: newItemsWithTimestamp,
        itemCount: newItemsWithTimestamp.length,
        source: req.body.source || 'pos'
      });
    }

    // ── Audit log — items added ────────────────
    const _kdsStaffIdAdd = req.body.kds_staff_id;
    const _kdsStaffNameAdd = req.body.kds_staff_name;
    logOrderActionSafe({
      orderId: order.id, restaurantId: order.restaurant_id,
      actionType: 'item_added',
      performedByUserId: _kdsStaffIdAdd || req.user?.id,
      performedByName: _kdsStaffNameAdd || req.user?.full_name || req.user?.username,
      performedByRole: _kdsStaffIdAdd ? 'staff' : (['System Admin','Restaurant Admin'].includes(req.user?.role) ? 'admin' : 'staff'),
      source: req.body.source || (_kdsStaffIdAdd ? 'kds' : 'pos'),
      metadata: {
        added_count: newItemsWithTimestamp.length,
        added_items: newItemsWithTimestamp.map(i => ({ name: i.name, qty: i.quantity, price: i.price })),
        new_total: newTotal
      }
    });

    // opId 멱등 기록(성공 시에만) — 재생 재전송 시 위 alreadyProcessed 가 no-op 처리.
    if (req.body.op_id) await recordProcessed(req.body.op_id, { order_id: order.id, type: 'add_items', restaurant_id: order.restaurant_id });

    res.json({
      success: true,
      data: order,
      addedItems: newItemsWithTimestamp,
      previousTotal: parseFloat(order.total_amount) - newItemsWithTimestamp.reduce((sum, item) =>
        sum + (parseFloat(item.price) * parseInt(item.quantity)), 0),
      newTotal
    });

  } catch (error) {
    console.error('✗ [ADD-ITEMS] Error:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// POST /api/orders/:id/merge-items
// Add items with order_group tracking (used by Live Orders Add Items)
router.post('/:id/merge-items', authenticateToken, async (req, res) => {
  try {
    const { items, source } = req.body;
    const orderId = req.params.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: { message: 'Items array is required', code: 'VALIDATION_ERROR' } });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // Tenant guard (IDOR defence)
    {
      const userRid = req.user?.restaurant_id || req.user?.restaurantId;
      const privileged = ['System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner'].includes(req.user?.role);
      if (!privileged && Number(order.restaurant_id) !== Number(userRid)) {
        return res.status(403).json({ success: false, error: { message: 'Forbidden — order belongs to a different restaurant', code: 'FORBIDDEN' } });
      }
    }

    // Validate order can accept new items
    if (order.payment_status === 'completed') {
      return res.status(400).json({ success: false, error: { message: 'Cannot add items to a paid order', code: 'VALIDATION_ERROR' } });
    }

    if (['completed', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot add items to an order with status "${order.status}"`
      });
    }

    // Use mergeItemsIntoOrder for consistent order_group handling
    const mergeResult = await mergeItemsIntoOrder(order, items, null, req.body.order_type); // #3 혼합차지: 추가분 타입 태깅(다르면 혼합)

    console.log(`✓ [MERGE-ITEMS] Added ${mergeResult.addedItems.length} items to order ${order.id} (group: ${mergeResult.orderGroup}, source: ${source || 'unknown'})`);

    // Emit socket events
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const room = `restaurant_${order.restaurant_id}`;

      // Emit order-updated for general UI refresh - convert to plain object
      const plainMergeResult = mergeResult.order.get ? mergeResult.order.get({ plain: true }) : mergeResult.order;
      if (typeof plainMergeResult.order_items === 'string') {
        try { plainMergeResult.order_items = JSON.parse(plainMergeResult.order_items); } catch(e) { plainMergeResult.order_items = []; }
      }
      io.of('/orders').to(room).emit('order-updated', plainMergeResult);

      // Emit order-items-added for notification (same as auto-merge)
      io.of('/orders').to(room).emit('order-items-added', {
        orderId: order.id,
        orderNumber: order.order_number,
        tableNumber: order.table_number,
        pagerNumber: order.pager_number,
        orderGroup: mergeResult.orderGroup,
        itemCount: mergeResult.addedItems.length,
        source: source || 'live_orders'
      });
    }

    res.json({
      success: true,
      data: mergeResult.order,
      addedItems: mergeResult.addedItems,
      orderGroup: mergeResult.orderGroup,
      previousTotal: mergeResult.previousTotal,
      newTotal: mergeResult.newTotal
    });

  } catch (error) {
    console.error('✗ [MERGE-ITEMS] Error:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE /api/orders/:id/items/:itemIndex
// Remove a specific item from order (only before payment)
// 아이템 void(삭제) = void 권한(access_void) 직원만. 서버(홀)·서빙 전용 직원 차단
// (2026-06-24 access_void 분리). 서빙 토글(PATCH /items)은 허용.
router.delete('/:id/items/:itemIndex', authenticateToken, requireVoidAccess, async (req, res) => {
  try {
    const orderId = req.params.id;
    const itemIndex = parseInt(req.params.itemIndex);

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // IDOR guard (same pattern as GET /:id). System Admin sees all.
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, error: { message: 'Forbidden', code: 'FORBIDDEN' } });
    }

    // 손실방지 게이트(설계 §4.4): requireVoidPin 매장은 아이템 삭제 전에 권한 PIN 재검증.
    // 진입부에서만 차단 — VOID 취소표 발행(소켓 item-voided → 프론트)과 무관. 게이트 OFF 면 무영향.
    let voidApprover = null;
    {
      // 아이템 삭제 사유 강제 — requireCancelReason 가 명시적 'required' 일 때만 거부. print-neutral.
      try {
        const rRow = await Restaurant.findByPk(order.restaurant_id, { attributes: ['operation_settings'] });
        const mode = rRow && rRow.operation_settings && rRow.operation_settings.requireCancelReason;
        const hasReason = req.body.reason && String(req.body.reason).trim();
        if (mode === 'required' && !hasReason) {
          return res.status(400).json({ success: false, code: 'CANCEL_REASON_REQUIRED', message: 'A reason is required to remove an item.' });
        }
      } catch (_e) { /* 조회 실패 시 막지 않음 */ }
      const gate = await enforceVoidPin(order.restaurant_id, req.body.void_pin);
      if (!gate.ok) {
        return res.status(gate.status).json({ success: false, code: gate.code, message: gate.message });
      }
      voidApprover = gate.approver; // 게이트 OFF 면 null
    }

    // Only allow deletion before payment
    if (order.payment_status === 'completed') {
      return res.status(400).json({ success: false, error: { message: 'Cannot remove items from a paid order', code: 'VALIDATION_ERROR' } });
    }

    if (['completed', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot remove items from an order with status "${order.status}"`
      });
    }

    // Get current items
    let orderItems = order.order_items || [];
    if (typeof orderItems === 'string') {
      orderItems = JSON.parse(orderItems);
    }

    if (itemIndex < 0 || itemIndex >= orderItems.length) {
      return res.status(400).json({ success: false, error: { message: 'Invalid item index', code: 'VALIDATION_ERROR' } });
    }

    // #2 부분수량 취소 — "3개 중 1개만 취소". cancelQty 미지정/≥수량 = 기존 전량삭제(하위호환).
    const itemToRemove = orderItems[itemIndex];
    const origQty = Math.max(1, Number(itemToRemove.quantity) || 1);
    let cancelQty = req.body.cancelQty != null ? parseInt(req.body.cancelQty, 10) : origQty;
    if (!Number.isFinite(cancelQty) || cancelQty < 1) cancelQty = origQty;
    if (cancelQty > origQty) cancelQty = origQty;
    const isPartial = cancelQty < origQty;
    const remainingQty = origQty - cancelQty;

    // 마지막 한 줄 전량삭제만 금지(주문취소로 유도). 부분취소(잔여>0)는 마지막 줄이어도 허용.
    if (orderItems.length === 1 && !isPartial) {
      return res.status(400).json({ success: false, error: { message: 'Cannot remove the last item. Please cancel the order instead.', code: 'VALIDATION_ERROR' } });
    }

    // Calculate what the new subtotal would be BEFORE removing the item (취소분 = cancelQty 만큼만 차감)
    const itemTotal = cancelQty * parseFloat(itemToRemove.price || 0);
    const currentSubtotal = orderItems.reduce((sum, item) => {
      return sum + (item.quantity * parseFloat(item.price || 0));
    }, 0);
    const newSubtotal = currentSubtotal - itemTotal;

    // Check if discount would exceed new subtotal - reject if so
    const pointDiscount = parseFloat(order.point_discount || 0);
    const couponDiscount = parseFloat(order.coupon_discount || 0);
    const totalDiscount = pointDiscount + couponDiscount;

    if (totalDiscount > newSubtotal) {
      console.log(`⚠️ [DELETE-ITEM] Rejected: discount (${totalDiscount}) exceeds new subtotal (${newSubtotal})`);
      return res.status(400).json({ success: false, error: { message: 'Cannot remove this item. The applied discount exceeds the new subtotal. Please add other items first, then remove this item.', code: 'VALIDATION_ERROR' } });
    }

    // Check coupon min_order requirement if coupon is applied
    if (order.coupon_code && couponDiscount > 0) {
      const coupon = await Coupon.findOne({
        where: {
          restaurant_id: order.restaurant_id,
          code: order.coupon_code.toUpperCase()
        }
      });

      if (coupon && coupon.min_order && newSubtotal < parseFloat(coupon.min_order)) {
        console.log(`⚠️ [DELETE-ITEM] Rejected: new subtotal (${newSubtotal}) below coupon min_order (${coupon.min_order})`);
        return res.status(400).json({
          success: false,
          error: `Cannot remove this item. The order total would fall below the coupon's minimum order requirement (${coupon.min_order}). Please add other items first.`
        });
      }
    }

    // 취소된 "분량" 스냅샷(quantity = cancelQty) — VOID 티켓·감사·소켓·응답에 공통 사용.
    const removedItem = { ...itemToRemove, quantity: cancelQty };
    if (isPartial) {
      // 부분취소: 줄은 남기고 수량만 차감.
      orderItems[itemIndex] = { ...itemToRemove, quantity: remainingQty };
      console.log(`🗑️ [DELETE-ITEM] Partial cancel: ${removedItem.name} ${cancelQty}/${origQty} (remaining ${remainingQty}) from order ${orderId}`);
    } else {
      // 전량취소: 줄 제거.
      orderItems.splice(itemIndex, 1);
      console.log(`🗑️ [DELETE-ITEM] Removing item: ${removedItem.name} from order ${orderId}`);
    }

    // Update subtotal and items
    order.subtotal = newSubtotal;
    order.order_items = orderItems;

    // 2026-06-24 (Irene): 아이템 void 취소표를 "누른 기기 직접인쇄" → "DB → 인쇄 전담 POS 폴러" 로 통일.
    // 이미 주방에 나간 품목(printed_at)을 뺐을 때만 VOID 티켓. 뺀 품목 1개 스냅샷을 pending_reprint.data
    // 에 담아 needs_print 켠다(다른 품목 printed_at 유지). 폴러가 그 스냅샷을 ITEM VOIDED 헤더와 함께
    // 인쇄. 누른 기기/계정 무관. 인쇄 방식(billPrint) 무변경 — 트리거를 기기→DB로 옮긴 것뿐.
    if (removedItem && (removedItem.printed_at || removedItem.printed)) {
      const _vreason = (req.body.reason && String(req.body.reason).trim()) || '';
      const _vlines = [];
      if (_vreason) _vlines.push('Reason: ' + _vreason);
      // #2 부분취소: 주방에 "취소 분량 / 계속 만들 잔여" 명확히. (notice.lines = 기존에 인쇄되는 내용필드)
      if (isPartial) {
        _vlines.push('Cancelled ' + cancelQty + ' of ' + origQty + '.');
        _vlines.push('KEEP making ' + remainingQty + '.');
      } else {
        _vlines.push('Do NOT make this item.');
      }
      order.needs_print = true;
      order.print_claimed_at = null;
      // 아이템 void = 새 라운드 → 통합 가드 리셋(void 안내 통합 카피 재발행). MASTER(KQ POS) 미도달이면 자연히 안 감(#3).
      order.consolidated_printed_at = null;
      // 2026-06-27 (Irene 확정): 취소표는 "취소품목이 원래 찍힌 그 회차(order_group) 오더티켓"과 똑같게 —
      // 그 회차 품목만 + 취소품목 줄긋기. (전체 합본 아님.) 이유: 주방이 레일에 걸린 "그 회차 오더티켓"과
      // 짝맞춰 정확히 이해해야 함. 신규(group0)에서 취소 → group0(=처음 오더티켓) 품목만. +Round(group N)에서
      // 취소 → 그 라운드 오더티켓 품목만. 주문취소(type=cancel)가 data.items 없이 order_group 배치로 회차별
      // 분할되는 것과 동일 결과 — 아이템취소도 회차 기준으로 통일. served/completed 품목은 제외(주방 혼동 방지).
      const _vNotServed = (it) => it && it.status !== 'served' && it.status !== 'completed';
      const _vRound = removedItem.order_group != null ? Number(removedItem.order_group) : 0;
      const _vSameRound = (it) => (it && it.order_group != null ? Number(it.order_group) : 0) === _vRound;
      const _voidLines = [..._vlines, 'Discard the previous ticket.', 'Use THIS ticket.'];
      const _voidItems = [
        ...(Array.isArray(orderItems) ? orderItems : []).filter(it => _vNotServed(it) && _vSameRound(it)).map(it => ({ ...it, _voided: false })),
        { ...removedItem, _voided: true }
      ];
      order.pending_reprint = { type: 'void', notice: { title: '** ITEM CANCELLED **', lines: _voidLines }, data: { items: _voidItems } };
    }

    // 2026-05-29: 아이템 삭제도 머지와 동일한 정식 공식(computeOrderTotals)으로
    // 전체 재계산. 세금·서비스차지는 새 할인후금액 기준, % 할인정책·쿠폰은 줄어든
    // 소계 기준으로 재계산, 고정 할인·포인트는 유지. (이전 코드는 rate>0 만 보고
    // 재계산해서 세금 없던 주문에 6% 세금이 잘못 붙는 버그가 있었다.)
    const prevTotalAmount = parseFloat(order.total_amount) || 0; // 변경 전 총액 (audit 용)
    const prevTax = parseFloat(order.tax) || 0;
    const prevServiceCharge = parseFloat(order.service_charge) || 0;
    const couponMeta = await resolveCouponMeta(order.restaurant_id, order.coupon_code);
    const totals = computeOrderTotals({
      newSubtotal,
      oldSubtotal: currentSubtotal,
      takeawayCharge: order.takeaway_charge,
      deliveryFee: order.delivery_fee,
      discount: order.discount,
      oldDiscountPolicyAmount: order.discount_policy_amount,
      oldCouponDiscount: order.coupon_discount,
      coupon: couponMeta,
      pointDiscount: order.point_discount,
      oldTax: prevTax,
      taxRate: order.tax_rate,
      oldServiceCharge: prevServiceCharge,
      serviceChargeRate: order.service_charge_rate,
      // #3 혼합차지: 부분/전량 취소 후에도 서비스차지는 남은 dine-in 품목 기준(순수 주문이면 null=기존).
      dineInSubtotal: mixedDineInSubtotal(orderItems, order.order_type)
    });
    order.service_charge = totals.serviceCharge;
    order.tax = totals.tax;
    order.discount_policy_amount = totals.discountPolicyAmount;
    order.coupon_discount = totals.couponDiscount;
    order.total_amount = Math.max(0, totals.total); // Ensure non-negative
    // 2026-05-29 fix: computeOrderTotals refactor left audit-log refs to an
    // undefined `newTotal` → DELETE-ITEM threw "newTotal is not defined" and the
    // item removal failed. Define it from the recomputed total.
    const newTotal = order.total_amount;

    // ── 단일 단계 모델: 아이템 제거 후 남은 아이템 min 단계로 주문 단계 roll-up ──
    // (예: 유일하게 안 나간 아이템을 void → 남은 전부 ready 면 주문도 ready 로)
    const _voidRolled = deriveOrderStatusFromItems(orderItems, order.status);
    if (_voidRolled) {
      order.status = _voidRolled;
      if (_voidRolled === 'served' && !order.served_at) order.served_at = new Date();
    }

    await order.save();

    // Log the deletion for audit trail
    try {
      await ActivityLog.createLog({
        restaurant_id: order.restaurant_id,
        user_id: req.user.id,
        username: req.user.username || req.user.email,
        full_name: req.user.name || req.user.full_name || null,
        action_type: 'delete',
        entity_type: 'order_item',
        entity_id: orderId,
        entity_name: `${removedItem.name} (Order: ${order.order_number})`,
        changes: {
          removed_item: {
            name: removedItem.name,
            price: removedItem.price,
            quantity: removedItem.quantity
          },
          previous_total: round2(prevTotalAmount),
          new_total: newTotal
        },
        description: `Removed "${removedItem.name}" (qty: ${removedItem.quantity}, price: ${removedItem.price}) from order ${order.order_number}`,
        ip_address: req.ip || req.socket?.remoteAddress,
        user_agent: req.get('User-Agent')
      });
    } catch (logError) {
      console.error('⚠️ [DELETE-ITEM] Failed to create audit log:', logError.message);
      // Don't fail the operation if logging fails
    }

    // ── Order Action audit (정규화 trail) ────────────────
    const _kdsStaffIdDel = req.body.kds_staff_id;
    const _kdsStaffNameDel = req.body.kds_staff_name;
    logOrderActionSafe({
      orderId: order.id, restaurantId: order.restaurant_id,
      actionType: 'item_removed',
      performedByUserId: _kdsStaffIdDel || req.user?.id,
      performedByName: _kdsStaffNameDel || req.user?.full_name || req.user?.username,
      performedByRole: _kdsStaffIdDel ? 'staff' : (['System Admin','Restaurant Admin'].includes(req.user?.role) ? 'admin' : 'staff'),
      source: req.body.source || (_kdsStaffIdDel ? 'kds' : 'pos'),
      reason: req.body.reason || null,
      // 손실방지 감사(설계 §4.5): 지운 금액·결제상태·결제수단·승인자 캡처 → 사장 감시 리포트.
      metadata: {
        removed_item: { name: removedItem.name, price: removedItem.price, quantity: removedItem.quantity },
        new_total: newTotal,
        amount: round2(itemTotal),
        payment_status: order.payment_status || null,
        payment_method: order.payment_method || null,
        approved_by_pin: voidApprover || null
      }
    });

    console.log(`✓ [DELETE-ITEM] Item removed successfully. New total: ${newTotal}`);

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const room = `restaurant_${order.restaurant_id}`;

      // Send order update - convert to plain object
      const plainVoidOrder = order.get ? order.get({ plain: true }) : order;
      if (typeof plainVoidOrder.order_items === 'string') {
        try { plainVoidOrder.order_items = JSON.parse(plainVoidOrder.order_items); } catch(e) { plainVoidOrder.order_items = []; }
      }
      io.of('/orders').to(room).emit('order-updated', plainVoidOrder);

      // Send VOID notification for kitchen display.
      // 2026-06-01: carry kitchen_station_id + was_printed so the client can route
      // a VOID kitchen ticket to the SAME station that printed the item (not all
      // stations), and skip printing for items that never reached the kitchen.
      io.of('/orders').to(room).emit('item-voided', {
        orderId: order.id,
        orderNumber: order.order_number,
        tableNumber: order.table_number,
        voidedItem: {
          name: removedItem.name,
          quantity: removedItem.quantity,
          price: removedItem.price,
          kitchen_station_id: removedItem.kitchen_station_id || null,
          stationName: removedItem.stationName || null,
          was_printed: !!(removedItem.printed_at || removedItem.printed),
          options: Array.isArray(removedItem.options) ? removedItem.options : []
        },
        // #2 부분취소 — KDS 가 "N 취소, M 잔존" 표시. 전량취소면 isPartial=false.
        isPartial,
        cancelledQuantity: cancelQty,
        remainingQuantity: remainingQty,
        reason: req.body.reason || null,
        voidedBy: req.user.username || req.user.email,
        voidedAt: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: order,
      // Enriched so the caller (POS/LiveOrders) can print a station-routed VOID
      // ticket for only this item without a second lookup.
      removedItem: {
        ...removedItem,
        kitchen_station_id: removedItem.kitchen_station_id || null,
        was_printed: !!(removedItem.printed_at || removedItem.printed)
      },
      newTotal
    });

  } catch (error) {
    console.error('✗ [DELETE-ITEM] Error:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// ============================================================
// Online Payment Routes (Stripe / PayPal) for Mobile Orders
// ============================================================
// 보안 정책: 모바일 게스트 고객도 결제하므로 authenticateToken 강제 불가
// 대신 다음 제약으로 위변조 방어:
// 1. 주문 생성 후 30분 이내에만 결제 시도 가능 (시간 윈도우 제한)
// 2. 이미 payment_status='completed' 면 거부
// 3. 이미 payment_intent_id가 있으면 신규 생성 대신 기존 intent 반환 (중복 결제 방어)

const PAYMENT_WINDOW_MS = 30 * 60 * 1000; // 30분

function isPaymentAllowed(order) {
  if (!order) return { ok: false, status: 404, message: 'Order not found' };
  if (order.payment_status === 'completed') {
    return { ok: false, status: 400, message: 'Order is already paid' };
  }
  const age = Date.now() - new Date(order.createdAt).getTime();
  if (age > PAYMENT_WINDOW_MS) {
    return { ok: false, status: 403, message: 'Payment window expired for this order' };
  }
  return { ok: true };
}

// Create Stripe PaymentIntent for an order

// ─────────────────────────────────────────────────────────
// GET /api/orders/:id/actions — Order Action History
// 자세한 사양: docs/ORDER_MANAGEMENT_IMPROVEMENTS.md § 7
// ─────────────────────────────────────────────────────────
router.get('/:id/actions', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { attributes: ['id', 'restaurant_id'] });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // restaurant access — same restaurant 만 조회 (Owner/RA/BG/FG 공통)
    const userRestaurantId = req.user?.restaurant_id;
    const role = req.user?.role;
    const isAdminLike = ['System Admin'].includes(role);
    if (!isAdminLike && userRestaurantId && Number(userRestaurantId) !== Number(order.restaurant_id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const actions = await OrderAction.findAll({
      where: { order_id: order.id },
      order: [['created_at', 'ASC']]
    });

    res.json({ success: true, data: actions });
  } catch (error) {
    console.error('✗ [GET /:id/actions] error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2026-05-28 매장 critical: 자동 인쇄 polling endpoint.
// Backend 가 모든 신규 주문에 needs_print=true set, 매장 device 가 어떤
// 페이지에 있든 폴링으로 catch → 인쇄 후 PATCH printed.
// socket 의존성 제거 (socket 은 보조 빠른 경로로만 남음).
router.get('/restaurant/:restaurantId/pending-print', authenticateToken, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    if (!restaurantId) return res.status(400).json({ success: false, message: 'restaurantId required' });
    // RA / Staff 본인 매장만
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== restaurantId) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const { Op } = require('sequelize');
    // 2026-06-24 (Irene): 죽은 claim 자동복구. 어느 기기가 print-claim(needs_print→false,
    // print_claimed_at=NOW) 했는데 STALE_CLAIM_SEC 안에 인쇄확인(/printed → print_claimed_at NULL)
    // 도 재무장(/print-rearm)도 안 오면 = 그 기기가 실제로 못 찍은 죽은 claim. 자동으로 needs_print
    // 를 되살려(needs_print=true) 인쇄 전담 POS 가 다음 폴에서 받게 한다. 불변식상 print_claimed_at
    // 가 NOT NULL 인 채로 STALE = "claim됐으나 인쇄 미확인" 뿐이라 중복 인쇄 위험 없음(인쇄확인되면
    // NULL). 인쇄 방식·라우팅 무변경 — 분실 방지 트리거만. 기기 설정 무관(노트북/서버 어디서 넣어도 OK).
    // 2026-06-27 롤백: 30초로 늘렸더니 BAR 재시도(재인쇄)가 사라져 BAR가 아예 미인쇄(주문 누락)됐다.
    // BAR 프린터가 첫 시도엔 소리만 나고 안 찍히고 재시도에서 찍히는 상태라, 재시도가 필요. 10초로 원복.
    // (KQ 중복은 "실패 스테이션만 재시도"로 따로 근본수정 예정 — per-station printed 추적.)
    const STALE_CLAIM_SEC = 10;
    try {
      const _reRes = await Order.sequelize.query(
        // 2026-06-24 (Irene "취소했는데 프린트 안나옴"): 취소/삭제/이동 안내 재발행은 주문이
        // claim 직후 삭제(is_deleted=1)되는 레이스에 취약했다(취소→3초뒤 주문삭제 → claim된 채
        // 인쇄확인 못오고 삭제되어 stale복구 제외 → 취소표 영구분실). 명시적 재발행(pending_reprint
        // NOT NULL)은 삭제됐어도 죽은 claim 을 복구한다(단 최근 5분 claim 만 — 오래된 건 주방이 이미
        // 처리했으므로 되살리지 않음). 일반 라이브 주문(is_deleted=false)은 종전과 동일(상한 없음).
        `UPDATE orders SET needs_print = true, print_claimed_at = NULL
         WHERE restaurant_id = :rid
           AND needs_print = false AND print_claimed_at IS NOT NULL
           AND print_claimed_at < (NOW() - INTERVAL :sec SECOND)
           AND ( is_deleted = false
                 OR (pending_reprint IS NOT NULL AND print_claimed_at > (NOW() - INTERVAL 300 SECOND)) )`,
        { replacements: { rid: restaurantId, sec: STALE_CLAIM_SEC } }
      );
      // 인쇄 추적(검증 루트): 죽은-claim 복구가 재무장한 주문 수. >0 = 느린/끊긴 인쇄로 폴러 재시도 발동.
      // per-station 추적 정상이면 재시도는 안 찍힌 스테이션(BAR)만 → 이미 찍은 KQ 재인쇄 0.
      try { const _ra = (_reRes && _reRes[0] && _reRes[0].affectedRows) || 0; if (_ra > 0) console.log(`[print-trace] stale-recovery re-armed=${_ra} rid=${restaurantId}`); } catch {}
    } catch (reErr) { console.error('[pending-print] stale-claim recovery error:', reErr.message); }
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        [Op.or]: [
          // 일반 라이브 주문: 삭제 안 된 것만. 2026-06-13: 삭제됐는데 needs_print 가 남은 주문이
          // 고스트 티켓으로 재인쇄되는 사고 방지. 인쇄 방식/라우팅/타이밍 무변경.
          { is_deleted: false, [Op.or]: [{ needs_print: true }, { needs_bill: true }] },
          // 2026-06-24 (Irene "취소했는데 프린트 안나옴"): 명시적 재발행(취소/삭제/이동 안내,
          // pending_reprint NOT NULL)은 주문이 삭제됐어도 1회 인쇄한다. 취소는 보통 주문삭제를
          // 동반하는데(claim 직후 is_deleted=1), 위 is_deleted=false 필터가 취소표까지 큐에서
          // 빼버려 분실됐다. 고스트와 달리 이건 직원의 명시적 현재 동작이라 인쇄돼야 한다.
          // /printed 가 needs_print=false + pending_reprint=null 로 1회 후 정리(중복 없음).
          { needs_print: true, pending_reprint: { [Op.ne]: null } }
        ]
      },
      order: [['createdAt', 'ASC']],
      limit: 20
    });
    // 2026-05-28 매장 critical (revised): station name resolution moved to the
    // KitchenStation DB table directly. Previously we read it from
    // Restaurant.printer_settings.kitchenStationPrinters[sid].stationName, but
    // that field was only populated when the user touched the printer settings
    // UI — a freshly-added station that the user hadn't configured a printer
    // for had no stationName, so tickets printed with a blank station label.
    // The KitchenStation table is the single source of truth.
    const KitchenStation = require('../models/KitchenStation');
    const stations = await KitchenStation.findAll({
      where: { restaurant_id: restaurantId },
      attributes: ['id', 'name']
    });
    const stationNameById = new Map(stations.map(s => [Number(s.id), s.name]));
    const enrichItem = (it) => {
      const sid = it.kitchen_station_id ? Number(it.kitchen_station_id) : null;
      const sName = sid ? (stationNameById.get(sid) || null) : null;
      return { ...it, stationName: sName };
    };
    const result = orders.map(o => {
      const plain = o.toJSON();
      const items = Array.isArray(plain.order_items)
        ? plain.order_items
        : (typeof plain.order_items === 'string' ? (() => { try { return JSON.parse(plain.order_items); } catch { return []; } })() : []);
      // Full list (with station names) — used for the BILL/receipt.
      plain.order_items = items.map(enrichItem);
      // 2026-05-29: per-item auto-print history. `kitchen_items` carries ONLY the
      // items that have not been kitchen-printed yet (printed_at unset). On a
      // +Round add, this is just the newly added items — so the kitchen ticket
      // never reprints previously-sent rows. The PATCH /printed call stamps
      // printed_at, so each item is auto-printed exactly once across every device
      // (KDS socket fast-path OR polling), regardless of which one fires first.
      plain.kitchen_items = items.filter(it => !it.printed_at).map(enrichItem);
      return plain;
    });
    res.json({ success: true, data: result });
  } catch (e) {
    console.error('[pending-print] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// 2026-05-29: ATOMIC print claim — the single coordination point that makes the
// kitchen ticket auto-print EXACTLY ONCE across every path/device. Three paths can
// race for the same order: POS direct fast-path, KDS order-created/items-added
// socket, and the polling fallbacks (useAutoPrintPoller + MainLayout). Each calls
// this BEFORE printing; the conditional UPDATE (needs_print true→false) means only
// the first caller gets claimed:true and prints. Everyone else gets claimed:false
// and skips. On a print failure the caller re-arms via /print-rearm so another
// device/cycle retries. printed_at (history) is still stamped via /printed after a
// successful print, so +Round adds reprint only the new rows.
router.patch('/:id/print-claim', authenticateToken, async (req, res) => {
  try {
    const o = await Order.findByPk(req.params.id);
    if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== o.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    // 2026-06-24: claim 시 print_claimed_at=NOW 기록. /printed 가 NULL 로 지운다. NULL 이 아닌 채로
    // STALE 해지면(인쇄확인 미도착=죽은 claim) pending-print 가 자동 re-arm 한다(분실 방지).
    const [affected] = await Order.update(
      { needs_print: false, print_claimed_at: require('sequelize').fn('NOW') },
      { where: { id: o.id, needs_print: true } }
    );
    res.json({ success: true, claimed: affected > 0 });
  } catch (e) {
    console.error('[print-claim] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// 2026-06-22 (Irene): backlog DISMISS. The frontend backlog cutoff ("autoPrint ON
// prints only orders created AFTER the enable time") used to SKIP pre-enable orders
// while leaving needs_print=true. Those stale rows permanently occupied the
// oldest-20 pending-print window, so once ≥20 accumulated, genuinely NEW orders fell
// outside the window and never auto-printed ("주문 밀리면 자동인쇄 안 됨"). This clears
// needs_print for a backlog order WITHOUT stamping printed_at, so it leaves the
// auto-print queue but stays manually printable (the Kitchen Ticket button prints
// from order_items, not needs_print). needs_bill is left untouched (bill path is
// independent). Same DB effect as print-claim but a distinct name = distinct intent
// (not "I printed this", but "this pre-enable order is not for auto-print").
router.patch('/:id/print-dismiss', authenticateToken, async (req, res) => {
  try {
    const o = await Order.findByPk(req.params.id);
    if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== o.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    // dismiss = "이 주문은 자동인쇄 대상 아님"(백로그). print_claimed_at NULL 로 둬 자동복구 대상에서 제외.
    const [affected] = await Order.update(
      { needs_print: false, print_claimed_at: null },
      { where: { id: o.id, needs_print: true } }
    );
    res.json({ success: true, dismissed: affected > 0 });
  } catch (e) {
    console.error('[print-dismiss] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// Clear ONLY needs_bill — used by a device that auto-printed the receipt but did
// not win the kitchen claim (another device owns the kitchen ticket). Keeps the
// kitchen print history (printed_at) untouched.
router.patch('/:id/bill-printed', authenticateToken, async (req, res) => {
  try {
    const o = await Order.findByPk(req.params.id);
    if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== o.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    await o.update({ needs_bill: false });
    res.json({ success: true });
  } catch (e) {
    console.error('[bill-printed] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// Re-arm after a failed print so another device / next poll cycle retries.
router.patch('/:id/print-rearm', authenticateToken, async (req, res) => {
  try {
    const o = await Order.findByPk(req.params.id);
    if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== o.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    // re-arm = 다시 인쇄 대기열로. print_claimed_at NULL 로 지워 죽은 claim 표시 해제.
    await o.update({ needs_print: true, print_claimed_at: null });
    res.json({ success: true });
  } catch (e) {
    console.error('[print-rearm] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// 2026-06-29 (Irene, thefire01 BAR 2장): 인쇄 "진행 중" 하트비트. BAR 프린터처럼 첫 인쇄가
// ~15초로 느린데 죽은-claim 복구(STALE_CLAIM_SEC=10초)가 인쇄 도중 재무장 → 폴러가 같은 BAR 를
// 또 찍어 2장 나오던 근본. 인쇄 주체(하이브리드/폴러)가 인쇄 루프 동안 이 엔드포인트로 활성 claim 의
// print_claimed_at 을 NOW 로 갱신 → 그 동안 재무장이 안 떠 중복 0. 단순 하트비트는 2026-06-26 에
// hang 인쇄(끊긴 기기가 무한 갱신→복구불가)로 제거됐던 만큼, 프론트가 최대 ~40초까지만(cap) 보낸다
// → 진짜 끊긴 기기는 cap 후 갱신이 끊겨 10초 뒤 정상 복구(분실 0). 활성 claim 만 갱신(이미 인쇄확인
// /printed 로 print_claimed_at=NULL 됐거나 재무장된 주문은 건드리지 않음).
router.patch('/:id/print-heartbeat', authenticateToken, async (req, res) => {
  try {
    const _hbRes = await Order.sequelize.query(
      `UPDATE orders SET print_claimed_at = NOW()
       WHERE id = :id AND restaurant_id = :rid AND needs_print = false AND print_claimed_at IS NOT NULL`,
      { replacements: { id: req.params.id, rid: parseInt(req.user.restaurant_id) || -1 } }
    );
    // 진단(임시): 기기가 SW 4.37(하트비트) 로 도는지 + claim 갱신되는지 확인.
    try { const _a = (_hbRes && _hbRes[0] && _hbRes[0].affectedRows); console.log(`[print-trace] heartbeat order=${req.params.id} rid=${parseInt(req.user.restaurant_id)} affected=${_a}`); } catch {}
    res.json({ success: true });
  } catch (e) {
    console.error('[print-heartbeat] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

// 진단(임시, 인쇄 무변경): 클라이언트가 실제 발송 결과를 서버 로그로 보고. +Round 통합/스테이션 미인쇄 원인 실측용.
router.post('/print-debug', authenticateToken, async (req, res) => {
  try {
    const b = req.body || {};
    console.log(`[print-trace] CLIENT type=${b.type} order=${b.orderNumber || b.orderId} rid=${parseInt(req.user.restaurant_id)} printer=${b.printer} ok=${b.ok} added=${b.added} info=${b.info || ''}`);
    res.json({ success: true });
  } catch (e) { res.status(200).json({ success: false }); }
});

// 2026-06-27 (Irene, thefire02 신규/추가 KQ 중복): 스테이션별 인쇄확인. 한 주방(KQ1/KQ2)이 찍히는
// 즉시 "그 스테이션 품목만" printed_at 찍는다(needs_print/print_claimed_at 는 안 건드림 — 전체 인쇄는
// 아직 진행 중, BAR 등 느린 스테이션 남음). 효과: BAR 가 hang 해 죽은-claim 복구(10초)가 재무장해도
// 폴러의 kitchen_items 는 "안 찍힌 BAR 만" → 이미 찍은 KQ 는 재인쇄 안 됨(KQ 중복 0). 실패 스테이션만
// 재시도 = Irene "하이브리드 조건 통합". 신규·추가·이동·취소 모든 경로 공통(stationId 별 멱등).
router.patch('/:id/station-printed', authenticateToken, async (req, res) => {
  try {
    const stationId = req.body && req.body.stationId != null ? Number(req.body.stationId) : null;
    if (stationId == null || Number.isNaN(stationId)) return res.status(400).json({ success: false, message: 'stationId required' });
    // 2026-06-29 (Irene, KQ 중복 근본수리): 스테이션별 printed_at 스탬프는 order_items
    // 배열 전체를 read-modify-write 한다. 같은 주문의 여러 스테이션 스탬프(+ /printed)가
    // fire-and-forget 로 동시에 오면 서로의 stamp 를 덮어써(lost update) "이미 찍은 스테이션"이
    // 다시 안-찍힘으로 되살아나 → 죽은-claim 재무장 시 KQ 가 재인쇄(중복)됐다. 행 잠금
    // 트랜잭션으로 직렬화 → 스탬프 분실 0 → 재무장은 정말 안 찍힌 스테이션(BAR)만 재시도.
    // (인쇄 방식/라우팅/타이밍 무변경 — DB 일관성만 보강.)
    let rid = null, changed = false;
    let denied = false, notFound = false;
    await Order.sequelize.transaction(async (t) => {
      const o = await Order.findByPk(req.params.id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!o) { notFound = true; return; }
      rid = o.restaurant_id;
      if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== o.restaurant_id) { denied = true; return; }
      const items = Array.isArray(o.order_items)
        ? o.order_items
        : (typeof o.order_items === 'string' ? (() => { try { return JSON.parse(o.order_items); } catch { return []; } })() : []);
      const now = new Date().toISOString();
      const stamped = items.map(it => {
        if (it && !it.printed_at && Number(it.kitchen_station_id) === stationId) { changed = true; return { ...it, printed_at: now }; }
        return it;
      });
      if (changed) await o.update({ order_items: stamped }, { transaction: t });
    });
    if (notFound) return res.status(404).json({ success: false, message: 'Order not found' });
    if (denied) return res.status(403).json({ success: false, message: 'Access denied' });
    // 인쇄 추적(검증 루트): 같은 주문·같은 station 이 두 번 찍히면 changed=true 한 번 + (재인쇄 시도)변화. 정상=station당 1회.
    console.log(`[print-trace] station-printed order=${req.params.id} rid=${rid} station=${stationId} changed=${changed}`);
    res.json({ success: true, data: { stationId, changed } });
  } catch (e) {
    console.error('[station-printed] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

router.patch('/:id/printed', authenticateToken, async (req, res) => {
  try {
    // 2026-05-29: stamp printed_at on every not-yet-printed item so the kitchen
    // auto-print history is persisted. pending-print's `kitchen_items` filters on
    // this flag, so a later +Round add reprints ONLY the new rows — already-sent
    // items are never re-emitted. Both the poller and the KDS socket path call
    // this endpoint after a successful print, keeping one shared history.
    // 2026-06-29 (Irene): /station-printed 와 동일하게 행 잠금 트랜잭션으로 직렬화 —
    // 전체 스탬프(여기)와 스테이션별 스탬프가 동시에 order_items 를 덮어쓰는 lost-update 방지.
    let denied = false, notFound = false;
    await Order.sequelize.transaction(async (t) => {
      const o = await Order.findByPk(req.params.id, { lock: t.LOCK.UPDATE, transaction: t });
      if (!o) { notFound = true; return; }
      if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== o.restaurant_id) { denied = true; return; }
      const items = Array.isArray(o.order_items)
        ? o.order_items
        : (typeof o.order_items === 'string' ? (() => { try { return JSON.parse(o.order_items); } catch { return []; } })() : []);
      const now = new Date().toISOString();
      let changed = false;
      const stamped = items.map(it => {
        if (it && !it.printed_at) { changed = true; return { ...it, printed_at: now }; }
        return it;
      });
      // 인쇄확인 = print_claimed_at NULL 로 지운다(불변식: NULL ⟺ 인쇄확인됨). → 자동복구 대상 아님.
      // pending_reprint(테이블이동 "TABLE CHANGED" 안내 등)도 인쇄확인되면 비운다(1회 후 정리).
      await o.update({
        ...(changed ? { order_items: stamped } : {}),
        needs_print: false,
        needs_bill: false,
        print_claimed_at: null,
        pending_reprint: null
      }, { transaction: t });
    });
    if (notFound) return res.status(404).json({ success: false, message: 'Order not found' });
    if (denied) return res.status(403).json({ success: false, message: 'Access denied' });
    res.json({ success: true });
  } catch (e) {
    console.error('[printed] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
