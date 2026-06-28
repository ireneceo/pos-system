// 주문 결제 (Stripe/PayPal)
// 마운트: /api/orders

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const Reservation = require('../models/Reservation');
const RestaurantCustomer = require('../models/RestaurantCustomer');
const Coupon = require('../models/Coupon');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { stripStaffNs } = require('../utils/staffName');
const { executeQuery, executeTransaction } = require('../utils/queryWrapper');
const { deductInventoryForOrder } = require('../services/inventoryDeductionService');
const { earnPointsForOrder, refundPointsForOrder, usePointsForOrder } = require('../services/pointService');
const { authenticateToken, optionalAuthenticateToken, requirePaymentAccess } = require('../middleware/auth');
const ActivityLog = require('../models/ActivityLog');
const { logActivity } = require('../utils/activityLogger');
const { getTodayBounds, getOrderDatePrefix, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { logOrderActionSafe } = require('../services/orderAuditLog');

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

router.post('/:id/create-payment-intent', async (req, res) => {
  try {
    const { id } = req.params;
    const { getStripeForIssuer, getPublishableKeyForIssuer } = require('../utils/stripeService');

    const order = await Order.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    const check = isPaymentAllowed(order);
    if (!check.ok) {
      return res.status(check.status).json({ success: false, message: check.message });
    }

    // Use restaurant-level Stripe keys
    const restaurantId = order.restaurant_id;
    const stripe = await getStripeForIssuer('restaurant', restaurantId);

    // Convert amount to smallest currency unit
    const currency = order.restaurant?.currency || 'MYR';
    const ZERO_DECIMAL = ['JPY', 'KRW', 'VND'];
    const multiplier = ZERO_DECIMAL.includes(currency.toUpperCase()) ? 1 : 100;
    const amountInSmallestUnit = Math.round(parseFloat(order.total_amount) * multiplier);

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInSmallestUnit,
      currency: currency.toLowerCase(),
      metadata: {
        order_id: String(order.id),
        order_number: order.order_number || '',
        restaurant_id: String(restaurantId)
      },
      description: `Order ${order.order_number || order.id} - ${order.restaurant?.name || 'N/A'}`
    });

    // Store payment_intent_id on order
    await order.update({
      payment_intent_id: paymentIntent.id,
      payment_provider: 'stripe',
      payment_method: 'online'
    });

    const publishableKey = await getPublishableKeyForIssuer('restaurant', restaurantId);

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      publishableKey,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Error creating PaymentIntent for order:', error);
    res.status(500).json({ success: false, error: 'Failed to create payment intent', details: error.message });
  }
});

// Create PayPal order for a mobile order
router.post('/:id/create-paypal-order', async (req, res) => {
  try {
    const { id } = req.params;
    const { createPayPalClient, getClientIdForIssuer } = require('../utils/paypalService');
    const paypal = require('@paypal/checkout-server-sdk');

    const order = await Order.findByPk(id, {
      include: [{ model: Restaurant, as: 'restaurant' }]
    });

    const check = isPaymentAllowed(order);
    if (!check.ok) {
      return res.status(check.status).json({ success: false, message: check.message });
    }

    const restaurantId = order.restaurant_id;
    const { client } = await createPayPalClient('restaurant', restaurantId);
    const currency = order.restaurant?.currency || 'MYR';

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        reference_id: String(order.id),
        description: `Order ${order.order_number || order.id} - ${order.restaurant?.name || 'N/A'}`,
        custom_id: String(order.id),
        amount: {
          currency_code: currency.toUpperCase(),
          value: parseFloat(order.total_amount).toFixed(2)
        }
      }]
    });

    const paypalOrder = await client.execute(request);

    await order.update({
      payment_intent_id: paypalOrder.result.id,
      payment_provider: 'paypal',
      payment_method: 'online'
    });

    const clientId = await getClientIdForIssuer('restaurant', restaurantId);

    res.json({
      success: true,
      orderId: paypalOrder.result.id,
      clientId,
      status: paypalOrder.result.status
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ success: false, error: 'Failed to create PayPal order', details: error.message });
  }
});

// Capture PayPal order after user approval
router.post('/:id/capture-paypal-order', async (req, res) => {
  try {
    const { id } = req.params;
    const { orderId } = req.body;
    const { createPayPalClient } = require('../utils/paypalService');
    const paypal = require('@paypal/checkout-server-sdk');

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.payment_status === 'completed') {
      return res.status(400).json({ success: false, message: 'Order is already paid' });
    }

    // 보안: 클라이언트가 보낸 orderId가 DB의 payment_intent_id와 일치해야 함
    // (임의 PayPal orderId로 capture 시도 차단)
    if (order.payment_intent_id !== orderId) {
      return res.status(400).json({ success: false, message: 'Order ID mismatch' });
    }

    const { client } = await createPayPalClient('restaurant', order.restaurant_id);

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await client.execute(request);

    if (capture.result.status === 'COMPLETED') {
      const captureId = capture.result.purchase_units?.[0]?.payments?.captures?.[0]?.id;
      const updatePayload = {
        payment_status: 'completed',
        payment_method: 'online',
        payment_provider: 'paypal',
        transaction_id: captureId || orderId
      };
      // 결제 완료 → "Require payment before kitchen" 토글로 awaiting_payment 였던 주문을 키친 진입(pending)으로 전환.
      const _prevStatusPP = order.status;
      if (order.status === 'awaiting_payment') updatePayload.status = 'pending';
      await order.update(updatePayload);

      // ── Audit log — payment_received (+ status_change if awaiting_payment → pending) ────────────────
      logOrderActionSafe({
        orderId: order.id, restaurantId: order.restaurant_id,
        actionType: 'payment_received',
        performedByUserId: null,
        performedByName: 'Customer',
        performedByRole: 'customer',
        source: 'mobile',
        metadata: { provider: 'paypal', transaction_id: captureId || orderId, amount: order.total_amount }
      });
      if (_prevStatusPP === 'awaiting_payment' && updatePayload.status === 'pending') {
        logOrderActionSafe({
          orderId: order.id, restaurantId: order.restaurant_id,
          actionType: 'status_change',
          fromStatus: 'awaiting_payment', toStatus: 'pending',
          performedByName: 'Payment Webhook',
          performedByRole: 'system',
          source: 'auto',
          metadata: { trigger: 'payment_completed', provider: 'paypal' }
        });
      }

      res.json({ success: true, status: 'COMPLETED', captureId });
    } else {
      res.json({ success: true, status: capture.result.status });
    }
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    res.status(500).json({ success: false, error: 'Failed to capture PayPal payment', details: error.message });
  }
});

// Confirm Stripe payment for an order (called after Stripe Elements completes)
router.post('/:id/confirm-stripe-payment', async (req, res) => {
  try {
    const { id } = req.params;
    const { getStripeForIssuer } = require('../utils/stripeService');

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.payment_status === 'completed') {
      return res.status(400).json({ success: false, message: 'Order is already paid' });
    }

    if (!order.payment_intent_id) {
      return res.status(400).json({ success: false, message: 'No payment intent found for this order' });
    }

    const stripe = await getStripeForIssuer('restaurant', order.restaurant_id);
    const paymentIntent = await stripe.paymentIntents.retrieve(order.payment_intent_id);

    if (paymentIntent.status === 'succeeded') {
      const updatePayload = {
        payment_status: 'completed',
        payment_method: 'online',
        payment_provider: 'stripe',
        transaction_id: paymentIntent.id
      };
      // 결제 완료 → awaiting_payment 주문을 키친 진입(pending) 으로 전환.
      const _prevStatusSt = order.status;
      if (order.status === 'awaiting_payment') updatePayload.status = 'pending';
      await order.update(updatePayload);

      // ── Audit log — payment_received (+ status_change if awaiting_payment → pending) ────────────────
      logOrderActionSafe({
        orderId: order.id, restaurantId: order.restaurant_id,
        actionType: 'payment_received',
        performedByUserId: null,
        performedByName: 'Customer',
        performedByRole: 'customer',
        source: 'mobile',
        metadata: { provider: 'stripe', transaction_id: paymentIntent.id, amount: order.total_amount }
      });
      if (_prevStatusSt === 'awaiting_payment' && updatePayload.status === 'pending') {
        logOrderActionSafe({
          orderId: order.id, restaurantId: order.restaurant_id,
          actionType: 'status_change',
          fromStatus: 'awaiting_payment', toStatus: 'pending',
          performedByName: 'Payment Webhook',
          performedByRole: 'system',
          source: 'auto',
          metadata: { trigger: 'payment_completed', provider: 'stripe' }
        });
      }

      res.json({ success: true, status: 'succeeded' });
    } else {
      res.json({ success: true, status: paymentIntent.status });
    }
  } catch (error) {
    console.error('Error confirming Stripe payment:', error);
    res.status(500).json({ success: false, error: 'Failed to confirm payment', details: error.message });
  }
});


// ─────────────────────────────────────────────────────────
// Split bill — partial payment endpoints (POS only)
// 1 order → N OrderPayment rows. order.amount_paid 누적.
// amount_paid >= total_amount 이면 payment_status='completed', 아니면 'partial'.
// ─────────────────────────────────────────────────────────
const OrderPayment = require('../models/OrderPayment');

// GET /api/orders/:id/payments — payment history for receipts / audit
router.get('/:id/payments', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, { attributes: ['id', 'restaurant_id'] });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && !['System Admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const payments = await OrderPayment.findAll({
      where: { order_id: order.id },
      order: [['paid_at', 'ASC']]
    });
    res.json({ success: true, data: payments });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// POST /api/orders/:id/payments — record a (possibly partial) payment
// 2026-06-28 (Irene): Staff Meal 결제 시 품목별 '직원 이름' 저장 — 영수증/스탭밀 정산서에
// 누가 먹었는지 품목마다 표기(샘플 영수증의 "zafry*" 자리). 이미 존재하는 주문(FloorPlan/분할)에
// 결제 직전 PaymentModal 이 호출. POS 신규주문은 생성 items 에 staff_name 을 직접 실음(별도 경로).
// order_items 의 데이터 필드만 추가 — 인쇄 dispatch 무관.
router.post('/:id/staff-meal-names', authenticateToken, requirePaymentAccess, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && !['System Admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const { staff_names } = req.body || {};
    if (!Array.isArray(staff_names)) {
      return res.status(400).json({ success: false, message: 'staff_names array required' });
    }
    let items = order.order_items;
    if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
    if (!Array.isArray(items) || items.length === 0) {
      return res.json({ success: true, data: { updated: 0 } });
    }
    let updated = 0;
    // staff_names[idx] = 그 품목의 수량만큼 이름 배열(같은 메뉴 2개=2명). 빈칸은 제거하지 않고 위치 보존.
    const merged = items.map((it, idx) => {
      const arr = staff_names[idx];
      if (Array.isArray(arr) && arr.some(n => (n || '').toString().trim())) {
        updated++;
        return { ...it, staff_names: arr.map(n => (n || '').toString().trim()) };
      }
      return it;
    });
    await order.update({ order_items: merged });
    res.json({ success: true, data: { updated } });
  } catch (error) {
    console.error('staff-meal-names save error:', error);
    res.status(500).json({ success: false, message: 'Failed to save staff meal names' });
  }
});

// Body: { amount, payment_method, items_paid?, amount_received?, change_amount?, card_type?, transaction_id?, cashier_name? }
// 카운터 결제 기록(현금/카드 수납) — 결제권한(access_payment) 직원만. 서버(홀)·서빙 전용
// 직원은 차단(2026-06-24 access_payment 분리). 모바일 게스트는 이 경로가 아닌
// create-payment-intent/capture(공개) 사용이므로 영향 없음. docs/SERVING_VIEW_DESIGN.md §7.
router.post('/:id/payments', authenticateToken, requirePaymentAccess, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (req.user?.restaurant_id && Number(req.user.restaurant_id) !== Number(order.restaurant_id)
        && !['System Admin'].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    if (order.payment_status === 'completed') {
      return res.status(400).json({ success: false, message: 'Order is already fully paid' });
    }

    const { amount, payment_method, items_paid, amount_received, change_amount, card_type, transaction_id, cashier_name } = req.body || {};
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      return res.status(400).json({ success: false, message: 'amount must be > 0' });
    }
    if (!payment_method) {
      return res.status(400).json({ success: false, message: 'payment_method required' });
    }

    const total = parseFloat(order.total_amount || 0);
    const prevPaid = parseFloat(order.amount_paid || 0);
    const rawNewPaid = prevPaid + parsedAmount;
    // amount_paid 는 order.total 로 cap (overpaid 시 시스템 정합성 보호).
    // 단 order_payments 의 amount 는 실제 받은 값 그대로 (통계/회계 정확).
    const newPaid = Math.min(rawNewPaid, total);

    // 영수증 번호: ORDxx-Px (1st partial, 2nd, ...)
    const existingPayments = await OrderPayment.count({ where: { order_id: order.id } });
    const receiptNumber = `${order.order_number || `ORD${order.id}`}-P${existingPayments + 1}`;

    const payment = await OrderPayment.create({
      order_id: order.id,
      restaurant_id: order.restaurant_id,
      amount: parsedAmount,
      payment_method,
      card_type: card_type || null,
      transaction_id: transaction_id || null,
      items_paid: items_paid || null,
      amount_received: amount_received != null ? parseFloat(amount_received) : null,
      change_amount: change_amount != null ? parseFloat(change_amount) : null,
      receipt_number: receiptNumber,
      cashier_id: req.user?.id || null,
      cashier_name: stripStaffNs(cashier_name || req.user?.full_name || req.user?.username) || null,
      paid_at: new Date()
    });

    // Update order amount_paid + payment_status
    // newPaid 가 total 에 cap 되었으므로 (overpaid 도 total) — fullyPaid 판단 정확.
    const fullyPaid = Math.abs(newPaid - total) < 0.01 || rawNewPaid >= total;
    const updateData = {
      amount_paid: newPaid,
      payment_status: fullyPaid ? 'completed' : 'partial'
    };
    // First payment defines headline payment_method for backward compat queries (POS report 등)
    if (existingPayments === 0) {
      updateData.payment_method = payment_method;
    }
    // awaiting_payment → pending (kitchen 진입) — fully paid 일 때만
    if (fullyPaid && order.status === 'awaiting_payment') {
      updateData.status = 'pending';
    }
    await order.update(updateData);

    // 예약-주문 루프 닫기 (P2-6) — 연결된 예약이 있고 완납되면 예약 completed (결제완료 시 자동완료).
    // 백스톱: orders-crud completed 전이 + reservationScheduler.autoCompleteStale. 실패 비치명.
    if (fullyPaid && order.reservation_id) {
      try {
        const resv = await Reservation.findByPk(order.reservation_id);
        if (resv && ['arrived', 'seated'].includes(resv.status)) {
          await resv.update({ status: 'completed', completed_at: new Date() });
          if (resv.customer_id) {
            const c = await RestaurantCustomer.findByPk(resv.customer_id);
            if (c) await c.update({ last_reservation_at: new Date() });
          }
        }
      } catch (e) { /* non-fatal */ }
    }

    // Audit log
    logOrderActionSafe({
      orderId: order.id, restaurantId: order.restaurant_id,
      actionType: 'payment_received',
      performedByUserId: req.user?.id || null,
      performedByName: cashier_name || req.user?.full_name || req.user?.username || 'Cashier',
      performedByRole: ['System Admin', 'Restaurant Admin'].includes(req.user?.role) ? 'admin' : 'staff',
      source: 'pos',
      metadata: {
        amount: parsedAmount,
        method: payment_method,
        partial: !fullyPaid,
        receipt_number: receiptNumber,
        items_paid: items_paid ? items_paid.length || 0 : 0,
        new_total_paid: newPaid,
        order_total: total
      }
    });

    // Real-time emit
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const plain = (await order.reload()).get({ plain: true });
      if (typeof plain.order_items === 'string') {
        try { plain.order_items = JSON.parse(plain.order_items); } catch { plain.order_items = []; }
      }
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', plain);
    }

    res.status(201).json({
      success: true,
      data: {
        payment,
        order: {
          id: order.id,
          payment_status: updateData.payment_status,
          amount_paid: newPaid,
          remaining: Math.max(0, total - newPaid)
        }
      }
    });
  } catch (e) {
    console.error('✗ POST /:id/payments:', e);
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
