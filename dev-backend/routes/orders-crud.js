// 주문 CRUD + 아이템 조작 + 병합
// 마운트: /api/orders

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const Coupon = require('../models/Coupon');
const { logOrderActionSafe } = require('../services/orderAuditLog');
const OrderAction = require('../models/OrderAction');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { executeQuery, executeTransaction } = require('../utils/queryWrapper');
const { deductInventoryForOrder } = require('../services/inventoryDeductionService');
const { earnPointsForOrder, refundPointsForOrder, usePointsForOrder } = require('../services/pointService');
const { authenticateToken, optionalAuthenticateToken, requireRole } = require('../middleware/auth');
const ActivityLog = require('../models/ActivityLog');
const { logActivity } = require('../utils/activityLogger');
const { getTodayBounds, getOrderDatePrefix, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { checkPaymentMethodAllowed } = require('../utils/paymentMethodGuard');
const { enrichItemsWithStation } = require('../utils/stationEnrichment');
const { round2, computeOrderTotals } = require('../utils/orderTotals');

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
        payment_status: 'pending',
        status: { [Op.notIn]: ['served', 'completed', 'cancelled'] },
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
  const queryOptions = {
    where: {
      restaurant_id: restaurantId,
      table_number: tableNumber,
      payment_status: 'pending',
      status: {
        [Op.notIn]: ['served', 'completed', 'cancelled']
      },
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
  if (existingOrders.length === 0) return null;

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
async function mergeItemsIntoOrder(existingOrder, newItems, transaction = null) {
  const now = new Date().toISOString();

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
  const itemsWithTimestamp = enrichedNewItems.map(item => ({
    ...item,
    status: 'pending',
    added_at: now,
    order_group: nextGroup
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
    takeawayCharge: existingOrder.takeaway_charge,
    deliveryFee: existingOrder.delivery_fee,
    discount: existingOrder.discount,
    oldDiscountPolicyAmount: existingOrder.discount_policy_amount,
    oldCouponDiscount: existingOrder.coupon_discount,
    coupon: couponMeta,
    pointDiscount: existingOrder.point_discount,
    oldTax: existingOrder.tax,
    taxRate: existingOrder.tax_rate,
    oldServiceCharge: existingOrder.service_charge,
    serviceChargeRate: existingOrder.service_charge_rate
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
    needs_print: true
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
      const force = await Order.findByPk(orderData.forceMergeIntoOrderId);
      if (force && force.restaurant_id === orderData.restaurant_id) {
        const newItems = orderData.order_items || orderData.items || [];
        const mergeResult = await mergeItemsIntoOrder(force, newItems);
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
        return res.status(200).json({
          success: true, data: mergeResult.order, merged: true,
          mergeInfo: { originalOrderId: force.id, orderGroup: mergeResult.orderGroup, forced: true }
        });
      }
      return res.status(404).json({ success: false, message: 'forceMergeIntoOrderId not found or not in this restaurant' });
    }

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
        console.log(`🔀 [AUTO-MERGE] Found mergeable order ${mergeableOrder.id} for table ${orderData.table_number}`);

        // Merge items into existing order (support both 'items' and 'order_items')
        const newItems = orderData.order_items || orderData.items || [];
        const mergeResult = await mergeItemsIntoOrder(mergeableOrder, newItems);

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

          return await Order.create({
            ...orderData,
            order_number: generatedOrderNumber,
            order_items: itemsArray.length > 0 ? itemsArray : null,  // Pass array, not JSON string
            total_amount: calculatedTotal ?? 0,
            payment_proof: normalizedProof || orderData.payment_proof,
            // 2026-05-28: backend trigger for auto-print polling (POS direct trigger
            // still fires as fast path — this is the safety net for any device).
            needs_print: true
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
    console.error('✗ Order 업데이트 실패:', error.message);
    console.error(error.stack);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Status order for forward/backward detection
const STATUS_ORDER = { outstanding: 0, pending: 1, preparing: 2, ready: 3, served: 4, completed: 5, cancelled: -1 };

// Update order status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, kitchen_ready, served_at } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
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

    // If marking as served/completed, set all item statuses to completed
    if ((finalStatus === 'served' || finalStatus === 'completed') && order.order_items) {
      try {
        const items = Array.isArray(order.order_items) ? order.order_items : JSON.parse(order.order_items);
        const completedItems = items.map(item => ({
          ...item,
          status: 'completed'
        }));
        updateData.order_items = completedItems;
      } catch (e) {
        console.error('Failed to update item statuses:', e);
      }
    }

    // When reverting order status, do NOT reset individual item statuses.
    // Items that were already started/completed should keep their status
    // (only the user can manually change individual item statuses).

    // Track if status changed to completed (for inventory deduction)
    const wasCompleted = order.status === 'completed';
    const willBeCompleted = finalStatus === 'completed';
    const prevStatus = order.status;  // audit log 용 snapshot

    await order.update(updateData);
    await order.reload(); // Ensure we have the latest data

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
        metadata: { previous_status: prevStatus }
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

    // snapshot for audit diff
    let _prevItemsForAudit = order.order_items;
    if (typeof _prevItemsForAudit === 'string') {
      try { _prevItemsForAudit = JSON.parse(_prevItemsForAudit); } catch (_e) { _prevItemsForAudit = []; }
    }
    if (!Array.isArray(_prevItemsForAudit)) _prevItemsForAudit = [];

    // Note: Don't use JSON.stringify - Sequelize setter handles it automatically
    const updateData = {
      order_items: order_items
    };

    // Recalculate total_amount if requested or if items changed significantly
    if (recalculateTotal && order_items && Array.isArray(order_items)) {
      const newTotal = order_items.reduce((sum, item) => {
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
      attributes: ['id', 'action_type', 'from_status', 'to_status', 'performed_by_name', 'performed_by_role', 'source', 'reason', 'created_at']
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

      for (const order of orders) {
        if (order.payment_status === 'completed') {
          throw new Error(`Order ${order.order_number} is already paid and cannot be merged`);
        }
        if (['served', 'completed', 'cancelled'].includes(order.status)) {
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
        serviceChargeRate: target.service_charge_rate
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
        deletedOrderIds
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
    }

    res.json({
      success: true,
      data: result.mergedOrder,
      deletedOrderIds: result.deletedOrderIds,
      message: `Successfully merged ${orderIds.length} orders`
    });

  } catch (error) {
    console.error('✗ [MERGE] Error:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Add items to existing order
// POST /api/orders/:id/add-items
router.post('/:id/add-items', authenticateToken, async (req, res) => {
  try {
    const { items } = req.body;
    const orderId = req.params.id;

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

    if (['served', 'completed', 'cancelled'].includes(order.status)) {
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
    const mergeResult = await mergeItemsIntoOrder(order, items);
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

    if (['served', 'completed', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot add items to an order with status "${order.status}"`
      });
    }

    // Use mergeItemsIntoOrder for consistent order_group handling
    const mergeResult = await mergeItemsIntoOrder(order, items);

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
router.delete('/:id/items/:itemIndex', authenticateToken, async (req, res) => {
  try {
    const orderId = req.params.id;
    const itemIndex = parseInt(req.params.itemIndex);

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // Only allow deletion before payment
    if (order.payment_status === 'completed') {
      return res.status(400).json({ success: false, error: { message: 'Cannot remove items from a paid order', code: 'VALIDATION_ERROR' } });
    }

    if (['served', 'completed', 'cancelled'].includes(order.status)) {
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

    // Cannot delete last item - must cancel order instead
    if (orderItems.length === 1) {
      return res.status(400).json({ success: false, error: { message: 'Cannot remove the last item. Please cancel the order instead.', code: 'VALIDATION_ERROR' } });
    }

    // Calculate what the new subtotal would be BEFORE removing the item
    const itemToRemove = orderItems[itemIndex];
    const itemTotal = itemToRemove.quantity * parseFloat(itemToRemove.price || 0);
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

    // Remove the item
    const removedItem = orderItems.splice(itemIndex, 1)[0];
    console.log(`🗑️ [DELETE-ITEM] Removing item: ${removedItem.name} from order ${orderId}`);

    // Update subtotal and items
    order.subtotal = newSubtotal;
    order.order_items = orderItems;

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
      serviceChargeRate: order.service_charge_rate
    });
    order.service_charge = totals.serviceCharge;
    order.tax = totals.tax;
    order.discount_policy_amount = totals.discountPolicyAmount;
    order.coupon_discount = totals.couponDiscount;
    order.total_amount = Math.max(0, totals.total); // Ensure non-negative

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
      metadata: {
        removed_item: { name: removedItem.name, price: removedItem.price, quantity: removedItem.quantity },
        new_total: newTotal
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

      // Send VOID notification for kitchen display
      io.of('/orders').to(room).emit('item-voided', {
        orderId: order.id,
        orderNumber: order.order_number,
        tableNumber: order.table_number,
        voidedItem: {
          name: removedItem.name,
          quantity: removedItem.quantity,
          price: removedItem.price
        },
        voidedBy: req.user.username || req.user.email,
        voidedAt: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      data: order,
      removedItem,
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
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        [Op.or]: [{ needs_print: true }, { needs_bill: true }]
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

router.patch('/:id/printed', authenticateToken, async (req, res) => {
  try {
    const o = await Order.findByPk(req.params.id);
    if (!o) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== o.restaurant_id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    // 2026-05-29: stamp printed_at on every not-yet-printed item so the kitchen
    // auto-print history is persisted. pending-print's `kitchen_items` filters on
    // this flag, so a later +Round add reprints ONLY the new rows — already-sent
    // items are never re-emitted. Both the poller and the KDS socket path call
    // this endpoint after a successful print, keeping one shared history.
    const items = Array.isArray(o.order_items)
      ? o.order_items
      : (typeof o.order_items === 'string' ? (() => { try { return JSON.parse(o.order_items); } catch { return []; } })() : []);
    const now = new Date().toISOString();
    let changed = false;
    const stamped = items.map(it => {
      if (it && !it.printed_at) { changed = true; return { ...it, printed_at: now }; }
      return it;
    });
    await o.update({
      ...(changed ? { order_items: stamped } : {}),
      needs_print: false,
      needs_bill: false
    });
    res.json({ success: true });
  } catch (e) {
    console.error('[printed] error:', e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
