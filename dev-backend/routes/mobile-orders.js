// 모바일 주문/결제 라우트
// 마운트: /api/mobile

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { getTodayBounds, getOrderDatePrefix, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { generateOrderNumber } = require('./mobile-helpers');
const { checkPaymentMethodAllowed, checkOrderTypeEnabled } = require('../utils/paymentMethodGuard');
const { logOrderActionSafe } = require('../services/orderAuditLog');

router.post('/cart/validate', async (req, res) => {
  try {
    const { items } = req.body;
    
    const validation = {
      isValid: true,
      items: items.map(item => ({
        ...item,
        isAvailable: true,
        currentPrice: item.price,
        priceChanged: false
      })),
      total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    res.json({ success: true, data: validation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper: Find mergeable order for auto-merge (mobile)
// Only merges orders from the same day (based on createdAt) with payment_status = 'pending'.
//
// 2026-05-28: order_type intentionally NOT filtered here. If a guest is sitting
// at table T20 and orders again via mobile — whether they pick "dine-in" or
// "takeaway" on the picker — staff still expect the new items to land on the
// SAME open bill for that table. Splitting takeaway-with-table into its own
// order makes the shop print two unrelated tickets and bill twice, which is
// exactly what the user reported. Same-table + payment pending = same bill.
async function findMergeableOrderMobile(restaurantId, tableNumber, orderType, transaction = null, timezone = 'Asia/Kuala_Lumpur') {
  if (!restaurantId || !tableNumber) return null;

  // Get today's date range in restaurant's timezone
  const { startOfDay: todayStart, endOfDay: todayEnd } = getTodayBounds(timezone);

  const queryOptions = {
    where: {
      restaurant_id: restaurantId,
      table_number: tableNumber,
      // order_type filter removed — see note above. POS auto-merge in
      // orders-crud.js applies the same rule (table + pending = one bill).
      payment_status: 'pending',
      status: {
        [Op.notIn]: ['served', 'completed', 'cancelled']
      },
      // Only merge orders from today (same date condition)
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

  if (transaction) {
    queryOptions.lock = transaction.LOCK.UPDATE;
    queryOptions.transaction = transaction;
  }

  const existingOrders = await Order.findAll(queryOptions);
  return existingOrders.length > 0 ? existingOrders[0] : null;
}

router.post('/order', async (req, res) => {
  try {
    const { items, paymentMethod, customerInfo, orderType, tableNumber, floorPlanTableId, storeId, scheduledPickupTime, skipAutoMerge } = req.body;

    // Debug logging
    console.log('📝 Mobile order received:');
    console.log('  - storeId (raw):', storeId, typeof storeId);
    console.log('  - items:', items);
    console.log('  - orderType:', orderType);
    console.log('  - paymentMethod:', paymentMethod);
    console.log('  - customerInfo:', customerInfo);
    console.log('  - tableNumber:', tableNumber);

    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // storeId must be explicit and valid — no silent fallback to id=1 (anonymous endpoint defence).
    if (!storeId) {
      return res.status(400).json({ success: false, error: { message: 'storeId is required', code: 'VALIDATION_ERROR' } });
    }
    const restaurantId = parseInt(storeId, 10);
    if (!Number.isFinite(restaurantId) || restaurantId <= 0) {
      return res.status(400).json({ success: false, error: { message: 'storeId must be a positive integer', code: 'VALIDATION_ERROR' } });
    }
    console.log('  - restaurantId (parsed):', restaurantId);

    // Keep tableNumber regardless of orderType — takeaway with a tableNumber
    // is intentionally treated as "an extra order on that table" by the shop
    // (Floor Plan / LiveOrders show it as an additional tab on the same table).
    const actualTableNumber = tableNumber || customerInfo?.tableNumber || null;
    // Frontend uses dash form ('dine-in'); DB ENUM uses underscore ('dine_in'). Normalize at the API boundary.
    const rawOrderType = orderType || 'dine_in';
    const actualOrderType = rawOrderType === 'dine-in' ? 'dine_in' : rawOrderType;

    // Get restaurant timezone + payment settings for date calculations & validation
    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['id', 'operation_settings', 'payment_settings', 'is_active', 'floor_plan'] });
    // Restaurant must exist and be active — prevents anonymous orders against unknown/disabled stores.
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }
    if (restaurant.is_active === false) {
      return res.status(403).json({ success: false, error: { message: 'Restaurant is not accepting orders', code: 'INACTIVE_STORE' } });
    }
    const tz = getRestaurantTimezone(restaurant);

    // Defence A: order_type must be enabled on restaurant's operation_settings.
    // Catches stale-QR-on-phone scenario where operator disabled an order type after the customer saved the QR.
    const otGuard = checkOrderTypeEnabled({
      operationSettings: restaurant?.operation_settings,
      orderType: actualOrderType
    });
    if (!otGuard.ok) {
      return res.status(400).json({ success: false, error: { message: otGuard.message, code: otGuard.code } });
    }

    // Defence B: payment_method must match the method's allowed_order_types for the chosen order_type.
    // The mobile frontend already filters disallowed methods, but a crafted request must not bypass.
    const guard = checkPaymentMethodAllowed({
      paymentSettings: restaurant?.payment_settings,
      paymentMethod,
      orderType: actualOrderType
    });
    if (!guard.ok) {
      return res.status(400).json({ success: false, error: { message: guard.message, code: guard.code } });
    }

    // Auto-merge: Check if there's an existing order to merge into
    if (!skipAutoMerge && actualTableNumber) {
      const mergeableOrder = await findMergeableOrderMobile(restaurantId, actualTableNumber, actualOrderType, null, tz);

      if (mergeableOrder) {
        console.log(`🔀 [MOBILE AUTO-MERGE] Found mergeable order ${mergeableOrder.id} for table ${actualTableNumber}`);

        const now = new Date().toISOString();

        // Get current items
        let currentItems = mergeableOrder.order_items || [];
        if (typeof currentItems === 'string') {
          currentItems = JSON.parse(currentItems);
        }

        // Ensure existing items have order_group preserved
        currentItems = currentItems.map(item => ({
          ...item,
          order_group: item.order_group !== undefined ? item.order_group : 0
        }));

        // Calculate next order_group number
        const existingGroups = currentItems.map(item => item.order_group || 0);
        const maxGroup = existingGroups.length > 0 ? Math.max(...existingGroups) : 0;
        const nextGroup = maxGroup + 1;

        // Add new items with added_at timestamp and order_group
        const newItemsWithTimestamp = items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          options: item.options || [],
          status: 'pending',
          added_at: now,
          order_group: nextGroup
        }));

        const mergedItems = [...currentItems, ...newItemsWithTimestamp];

        // Recalculate total
        const newTotal = mergedItems.reduce((sum, item) => {
          const itemPrice = parseFloat(item.price) || 0;
          const itemQty = parseInt(item.quantity) || 1;
          return sum + (itemPrice * itemQty);
        }, 0);

        // Update order — preserve 'outstanding' so a shop with
        // requirePaymentBeforeKitchen=true doesn't auto-send to the kitchen
        // when the customer adds more items but hasn't paid yet.
        const preserveOutstanding = mergeableOrder.status === 'outstanding';
        await mergeableOrder.update({
          order_items: mergedItems,
          total_amount: newTotal,
          status: preserveOutstanding ? 'outstanding' : 'pending'
        });
        await mergeableOrder.reload();

        console.log(`✓ [MOBILE AUTO-MERGE] Merged ${newItemsWithTimestamp.length} items into order ${mergeableOrder.id} (group: ${nextGroup})`);

        // Emit socket events for real-time update
        const io = req.app.get('io');
        if (io) {
          const room = `restaurant_${restaurantId}`;
          // Regular order update
          io.of('/orders').to(room).emit('order-updated', mergeableOrder);
          // Special event for new items added (for notification sound)
          io.of('/orders').to(room).emit('order-items-added', {
            orderId: mergeableOrder.id,
            orderNumber: mergeableOrder.order_number,
            tableNumber: mergeableOrder.table_number,
            orderGroup: nextGroup,
            addedItems: newItemsWithTimestamp,
            itemCount: newItemsWithTimestamp.length
          });
        }

        const orderResponse = {
          id: mergeableOrder.id,
          orderNumber: mergeableOrder.order_number,
          pickupNumber: mergeableOrder.order_number ? mergeableOrder.order_number.split('-')[1] : '000',
          items: mergedItems,
          total: newTotal,
          status: mergeableOrder.status,
          createdAt: mergeableOrder.createdAt,
          estimatedPickupTime: new Date(Date.now() + 20 * 60000),
          scheduledPickupTime: mergeableOrder.scheduled_pickup_time || null,
          paymentStatus: mergeableOrder.payment_status,
          orderType: mergeableOrder.order_type,
          orderSource: 'mobile',
          tableNumber: actualTableNumber,
          merged: true,
          addedItems: newItemsWithTimestamp
        };

        return res.json({ success: true, data: orderResponse });
      }
    }

    // Create order with transaction and retry logic
    let order;
    let orderNumber;
    let pickupNumber;
    const maxRetries = 5;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        order = await sequelize.transaction(async (t) => {
          // Generate order number within transaction (with row lock)
          const generated = await generateOrderNumber(restaurantId, t, tz);
          orderNumber = generated.orderNumber;
          pickupNumber = generated.pickupNumber;

          console.log('  - Generated orderNumber:', orderNumber);
          console.log('  - Generated pickupNumber:', pickupNumber);

          // Decide order status based on restaurant's "Require payment before kitchen" setting.
          // - OFF (default): payment-pending orders go straight to kitchen ('pending') — current behavior preserved.
          // - ON: payment-pending orders hold at 'awaiting_payment' — staff confirms before KDS sees it.
          // 결제 즉시 완료(prepaid) 흐름은 토글 무관 'pending' (키친 진입). undefined setting → false (현재 동작 유지).
          const reqPayBeforeKitchen = !!(restaurant.operation_settings &&
            restaurant.operation_settings.mobileOrderProcessing &&
            restaurant.operation_settings.mobileOrderProcessing.requirePaymentBeforeKitchen);
          // POST /order 진입 시점은 결제 전 — payment_status 항상 pending. 결제 완료 시 별도 라우트가 status 'pending' 로 update.
          // 'outstanding' = LiveOrders / Floor Plan 공통 상태 (Proceed Without
          // Payment 버튼 활성). 이전엔 'awaiting_payment' 였는데 두 UI 가
          // outstanding 만 처리해서 모바일 주문이 *버튼 없이 표시*되거나 아예
          // 안 보였음 (라벨만 매핑돼 있었음). pending 분기는 그대로 유지.
          const initialStatus = reqPayBeforeKitchen ? 'outstanding' : 'pending';

          // Create order in database
          console.log('  - Creating order with data: status=' + initialStatus + ' (reqPay=' + reqPayBeforeKitchen + ')');
          // Resolve floor_plan_table_id from the table label so dine-in mobile
          // orders show up on the Floor Plan canvas. Mobile frontend doesn't
          // know the canvas ID — match by label (preferred) or tableNumber.
          let resolvedFloorPlanTableId = floorPlanTableId || null;
          if (!resolvedFloorPlanTableId && actualTableNumber && actualOrderType === 'dine_in') {
            const fp = restaurant.floor_plan || {};
            const fpTables = Array.isArray(fp.tables) ? fp.tables : [];
            const matched = fpTables.find(t =>
              (t && t.label != null && String(t.label) === String(actualTableNumber)) ||
              (t && t.tableNumber != null && String(t.tableNumber) === String(actualTableNumber))
            );
            if (matched && matched.id) resolvedFloorPlanTableId = String(matched.id);
          }

          // Enrich each item with kitchen_station_id (Product 직접 / Category 매핑
          // 둘 다 lookup). 매장이 카테고리 단위로 station 매핑한 경우 — 이걸 안
          // 채우면 KDS 의 station-별 print 가 매핑 fail → unmapped → 같은 station
          // ticket 에 합쳐서 출력. 카테고리 매핑이 *필수* 라는 매장 운영 기준
          // (2026-05-27 매장 정정) 에 부합하게 backend 에서 자동 채움.
          const Product = require('../models/Product');
          const Category = require('../models/Category');
          const productIds = items.map(i => i.menu_item_id || i.id).filter(x => x && Number.isInteger(Number(x))).map(Number);
          const products = productIds.length > 0
            ? await Product.findAll({ where: { id: productIds }, attributes: ['id', 'kitchen_station_id', 'category'] })
            : [];
          const productMap = new Map(products.map(p => [Number(p.id), p]));
          const catIds = [...new Set(products.map(p => p.category).filter(Boolean))];
          const cats = catIds.length > 0
            ? await Category.findAll({ where: { id: catIds }, attributes: ['id', 'kitchen_station_id'] })
            : [];
          const catStationMap = new Map(cats.map(c => [Number(c.id), c.kitchen_station_id]));

          const orderData = {
            restaurant_id: restaurantId,
            table_number: actualTableNumber,
            floor_plan_table_id: resolvedFloorPlanTableId,
            customer_name: customerInfo?.name || 'Mobile Guest',
            customer_phone: customerInfo?.phone || null,
            total_amount: total,
            status: initialStatus,
            order_type: actualOrderType,
            payment_method: paymentMethod || 'counter',
            payment_status: 'pending',
            order_number: orderNumber,
            scheduled_pickup_time: scheduledPickupTime ? new Date(scheduledPickupTime) : null,
            order_items: items.map(item => {
              const pid = Number(item.menu_item_id || item.id);
              const product = productMap.get(pid);
              const kitchenStationId = product?.kitchen_station_id || (product?.category && catStationMap.get(Number(product.category))) || null;
              return {
                name: item.name,
                menu_item_id: item.menu_item_id || item.id || null,
                category: product?.category || null,
                kitchen_station_id: kitchenStationId,
                quantity: item.quantity,
                price: item.price,
                options: item.options || []
              };
            })
          };
          console.log('    restaurant_id:', orderData.restaurant_id);
          console.log('    order_number:', orderData.order_number);
          console.log('    customer_name:', orderData.customer_name);
          console.log('    total_amount:', orderData.total_amount);
          console.log('    order_items:', JSON.stringify(orderData.order_items, null, 2));

          return await Order.create(orderData, { transaction: t });
        });

        console.log('✓ Order created successfully:', order.id);
        break; // Success - exit retry loop

      } catch (error) {
        // Check if it's a duplicate key error
        if (error.name === 'SequelizeUniqueConstraintError' ||
            (error.parent && error.parent.code === 'ER_DUP_ENTRY')) {
          retryCount++;
          if (retryCount >= maxRetries) {
            throw new Error(`Failed to generate unique order number after ${maxRetries} attempts`);
          }
          console.log(`⚠️ Duplicate order number detected, retrying (${retryCount}/${maxRetries})...`);
          // Wait a bit before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 50 * retryCount));
          continue;
        }
        // Other errors - rethrow immediately
        throw error;
      }
    }

    const orderResponse = {
      id: order.id,
      orderNumber: orderNumber,
      pickupNumber: pickupNumber,
      items: items,
      total: total,
      status: 'pending',
      createdAt: order.createdAt,
      estimatedPickupTime: new Date(Date.now() + 20 * 60000),
      scheduledPickupTime: scheduledPickupTime || null,
      paymentStatus: 'pending',
      orderType: actualOrderType,
      orderSource: 'mobile',
      tableNumber: actualTableNumber || undefined
    };

    // Emit Socket.IO event for live orders
    const io = req.app.get('io');
    if (io) {
      io.of('/orders').to(`restaurant_${restaurantId}`).emit('order-created', {
        id: order.id,
        restaurant_id: restaurantId,
        order_number: orderNumber,
        customer_name: customerInfo?.name || 'Mobile Guest',
        customer_phone: customerInfo?.phone || null,
        table_number: actualTableNumber,
        total_amount: total,
        status: 'pending',
        order_type: actualOrderType,
        payment_method: paymentMethod || 'counter',
        payment_status: 'pending',
        order_date: new Date().toISOString(),
        scheduled_pickup_time: scheduledPickupTime || null,
        source: 'mobile',
        order_items: items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          options: item.options || []
        })),
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      });
    }

    // ── Audit log — order created via mobile ────────────────
    logOrderActionSafe({
      orderId: order.id, restaurantId: order.restaurant_id,
      actionType: 'created',
      toStatus: order.status,
      performedByUserId: null,
      performedByName: customerInfo?.name || 'Mobile Customer',
      performedByRole: 'customer',
      source: 'mobile',
      metadata: {
        order_number: orderNumber,
        total_amount: total,
        item_count: Array.isArray(items) ? items.length : 0,
        order_type: actualOrderType,
        payment_method: paymentMethod || 'counter',
        table_number: actualTableNumber || null
      }
    });

    res.json({ success: true, data: orderResponse });
    console.log('📤 Order response sent to client');
  } catch (error) {
    console.error('✗ Order creation error:', error);
    console.error('   Error stack:', error.stack);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all orders (for live order display)

router.get('/orders', async (req, res) => {
  try {
    const { status, limit = 50, restaurant_id, restaurantId } = req.query;
    const targetRestaurantId = restaurant_id || restaurantId;

    if (!targetRestaurantId) {
      return res.status(400).json({
        success: false,
        message: 'restaurant_id query parameter is required'
      });
    }

    let whereCondition = { restaurant_id: parseInt(targetRestaurantId) };
    if (status) {
      if (status.includes(',')) {
        whereCondition.status = { [Op.in]: status.split(',') };
      } else {
        whereCondition.status = status;
      }
    }

    const orders = await Order.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });
    
    const formattedOrders = orders.map(order => {
      // Parse order_items - it's stored as an array of items
      let items = [];
      if (order.order_items) {
        items = typeof order.order_items === 'string' ?
          JSON.parse(order.order_items) : order.order_items;

        // If it's not an array, try to extract items property
        if (!Array.isArray(items)) {
          items = items.items || [];
        }
      }

      return {
        id: 'ORD' + order.id,
        orderNumber: order.order_number || 'ORD' + order.id,
        pickupNumber: order.order_number ? order.order_number.split('-')[1] : '000',
        status: order.status,
        items: items,
        total: parseFloat(order.total_amount),
        createdAt: order.createdAt,
        estimatedPickupTime: new Date(order.createdAt.getTime() + 20 * 60000),
        paymentStatus: order.payment_status || 'pending',
        orderType: order.order_type || 'dine-in',
        orderSource: 'mobile',
        tableNumber: order.table_number > 0 ? `T${String(order.table_number).padStart(3, '0')}` : undefined
      };
    });
    
    res.json({ success: true, data: formattedOrders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Extract numeric ID from orderId (format: ORD123)
    const numericId = orderId.startsWith('ORD') ? orderId.substring(3) : orderId;

    const order = await Order.findByPk(numericId);

    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // Parse order_items - it's stored as an array of items
    let items = [];
    if (order.order_items) {
      items = typeof order.order_items === 'string' ?
        JSON.parse(order.order_items) : order.order_items;

      // If it's not an array, try to extract items property
      if (!Array.isArray(items)) {
        items = items.items || [];
      }
    }

    // Fetch restaurant info for receipt
    const restaurant = await Restaurant.findByPk(order.restaurant_id, {
      attributes: ['id', 'name', 'branch_name', 'address', 'city', 'state', 'postal_code', 'phone', 'business_registration', 'tax_id', 'logo_url', 'printer_settings']
    });

    const receiptSettings = restaurant?.printer_settings?.receiptSettings || {};

    const orderData = {
      id: 'ORD' + order.id,
      orderNumber: order.order_number || 'ORD' + order.id,
      pickupNumber: order.order_number ? order.order_number.split('-')[1] : '000',
      status: order.status,
      items: items,
      total: parseFloat(order.total_amount),
      total_amount: parseFloat(order.total_amount),
      subtotal: parseFloat(order.subtotal || 0),
      tax: parseFloat(order.tax || 0),
      taxRate: parseFloat(order.tax_rate || 0),
      discount: parseFloat(order.discount || 0),
      couponCode: order.coupon_code || null,
      couponDiscount: parseFloat(order.coupon_discount || 0),
      serviceCharge: parseFloat(order.service_charge || 0),
      serviceChargeRate: parseFloat(order.service_charge_rate || 0),
      takeawayCharge: parseFloat(order.takeaway_charge || 0),
      roundingAdjustment: parseFloat(order.rounding_adjustment || 0),
      pointsUsed: order.points_used || null,
      pointDiscount: parseFloat(order.point_discount || 0),
      createdAt: order.createdAt,
      estimatedPickupTime: new Date(order.createdAt.getTime() + 20 * 60000),
      paymentStatus: order.payment_status || 'pending',
      payment_status: order.payment_status || 'pending',
      paymentMethod: order.payment_method || 'counter',
      payment_method: order.payment_method || 'counter',
      currency: order.currency || 'MYR',
      orderType: order.order_type || 'dine-in',
      orderSource: 'mobile',
      table_number: order.table_number || null,
      tableNumber: order.table_number ? order.table_number : null,
      payment_proof: order.payment_proof || null,
      restaurant: restaurant ? {
        name: restaurant.name,
        branchName: restaurant.branch_name || null,
        address: restaurant.address || null,
        city: restaurant.city || null,
        state: restaurant.state || null,
        postalCode: restaurant.postal_code || null,
        phone: restaurant.phone || null,
        businessRegistration: restaurant.business_registration || null,
        taxId: restaurant.tax_id || null,
        logoUrl: restaurant.logo_url || null,
        receiptLogo: receiptSettings.receiptLogo || null,
        footerMessage: receiptSettings.footerMessage || null
      } : null
    };

    res.json({ success: true, data: orderData });
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Retry payment proof (모바일 전용 - 인증 불필요)

router.patch('/order/:orderId/retry-payment', async (req, res) => {
  try {
    const { orderId } = req.params;
    const numericId = orderId.startsWith('ORD') ? orderId.substring(3) : orderId;
    const { payment_proof } = req.body;

    if (!payment_proof) {
      return res.status(400).json({ success: false, error: { message: 'Payment proof is required', code: 'VALIDATION_ERROR' } });
    }

    const order = await Order.findByPk(numericId);
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }

    // rejected 상태에서만 retry 허용
    if (order.payment_status !== 'rejected') {
      return res.status(400).json({ success: false, error: { message: 'Order is not in rejected state', code: 'VALIDATION_ERROR' } });
    }

    // 기존 proof history 보존 + 새 proof를 current에 저장
    let existingProof = order.payment_proof
      ? (typeof order.payment_proof === 'string' ? JSON.parse(order.payment_proof) : order.payment_proof)
      : null;

    if (existingProof && !existingProof.hasOwnProperty('current')) {
      existingProof = { current: existingProof, history: [] };
    }

    const newProof = {
      current: payment_proof,
      history: existingProof ? (existingProof.history || []) : []
    };

    await order.update({
      payment_status: 'payment_verification_pending',
      payment_proof: newProof
    });

    // Socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      const plainOrder = order.get({ plain: true });
      if (typeof plainOrder.order_items === 'string') {
        try { plainOrder.order_items = JSON.parse(plainOrder.order_items); } catch(e) {}
      }
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', plainOrder);
    }

    res.json({ success: true, data: { id: order.id, payment_status: 'payment_verification_pending' } });
  } catch (error) {
    console.error('Retry payment error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/order/:orderId/cancel', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const numericId = orderId.startsWith('ORD') ? orderId.substring(3) : orderId;
    
    const order = await Order.findByPk(numericId);
    
    if (!order) {
      return res.status(404).json({ success: false, error: { message: 'Order not found', code: 'NOT_FOUND' } });
    }
    
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        error: 'Order cannot be cancelled',
        message: `Order is already ${order.status}`
      });
    }
    
    const _prevStatusMC = order.status;
    await order.update({ status: 'cancelled' });

    // ── Audit log — cancelled by customer (mobile) ────────────────
    logOrderActionSafe({
      orderId: order.id, restaurantId: order.restaurant_id,
      actionType: 'cancelled',
      fromStatus: _prevStatusMC, toStatus: 'cancelled',
      performedByUserId: null,
      performedByName: order.customer_name || 'Mobile Customer',
      performedByRole: 'customer',
      source: 'mobile',
      reason: (req.body && req.body.reason && String(req.body.reason).trim()) || 'Cancelled by customer (mobile)',
      metadata: { order_number: order.order_number, previous_status: _prevStatusMC }
    });

    const orderItems = typeof order.order_items === 'string' ?
      JSON.parse(order.order_items) : order.order_items || {};
    const refundStatus = orderItems.paymentStatus === 'completed' ? 'processing' : 'not_required';
    
    res.json({ 
      success: true, 
      message: 'Order cancelled successfully',
      refundStatus: refundStatus
    });
  } catch (error) {
    console.error('Order cancellation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/payment/intent', async (req, res) => {
  try {
    const { amount, currency = 'MYR' } = req.body;
    
    const paymentIntent = {
      id: 'pi_' + Date.now(),
      clientSecret: 'pi_secret_' + Date.now(),
      amount: amount,
      currency: currency,
      status: 'requires_payment_method'
    };
    
    res.json({ success: true, data: paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/payment/confirm', async (req, res) => {
  try {
    const { orderId } = req.body;
    
    res.json({ 
      success: true, 
      message: 'Payment confirmed',
      orderId: orderId
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
