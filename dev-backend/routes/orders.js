const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { executeQuery, executeTransaction } = require('../utils/queryWrapper');
const { deductInventoryForOrder } = require('../services/inventoryDeductionService');
const { earnPointsForOrder, refundPointsForOrder, usePointsForOrder } = require('../services/pointService');
const { authenticateToken, optionalAuthenticateToken } = require('../middleware/auth');

// Get all orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, date, limit = 50, restaurantId, restaurant_id } = req.query;
    // Support both camelCase (new) and snake_case (legacy)
    const finalRestaurantId = restaurantId || restaurant_id;

    let whereCondition = {};

    // Restaurant ID 필터링 (필수)
    if (finalRestaurantId) {
      whereCondition.restaurant_id = parseInt(finalRestaurantId);
    }

    if (status) {
      whereCondition.status = status;
    }
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      whereCondition.createdAt = {
        $between: [startDate, endDate]
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

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('❌ Orders 조회 실패:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single order
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    // 쿼리 래퍼 사용 (자동 재시도)
    const order = await executeQuery(async () => {
      return await Order.findByPk(req.params.id);
    }, { maxRetries: 3 });
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('❌ Order 조회 실패:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Helper: Find mergeable order for auto-merge
async function findMergeableOrder(restaurantId, tableNumber, orderType, transaction = null) {
  if (!restaurantId || !tableNumber) return null;

  const queryOptions = {
    where: {
      restaurant_id: restaurantId,
      table_number: tableNumber,
      order_type: orderType || 'dine_in',
      payment_status: 'pending',
      status: {
        [Op.notIn]: ['served', 'completed', 'cancelled']
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

// Helper: Merge items into existing order
async function mergeItemsIntoOrder(existingOrder, newItems, transaction = null) {
  const now = new Date().toISOString();

  // Get current items
  let currentItems = existingOrder.order_items || [];
  if (typeof currentItems === 'string') {
    currentItems = JSON.parse(currentItems);
  }

  // Add new items with added_at timestamp
  const itemsWithTimestamp = newItems.map(item => ({
    ...item,
    status: 'pending',
    added_at: now
  }));

  const mergedItems = [...currentItems, ...itemsWithTimestamp];

  // Recalculate total
  const newTotal = mergedItems.reduce((sum, item) => {
    const itemPrice = parseFloat(item.price) || 0;
    const itemQty = parseInt(item.quantity) || 1;
    return sum + (itemPrice * itemQty);
  }, 0);

  // Update order
  const updateOptions = transaction ? { transaction } : {};
  await existingOrder.update({
    order_items: JSON.stringify(mergedItems),
    total_amount: newTotal,
    status: 'pending' // Reset to pending for kitchen
  }, updateOptions);

  await existingOrder.reload(updateOptions);

  return {
    order: existingOrder,
    addedItems: itemsWithTimestamp,
    previousTotal: parseFloat(existingOrder.total_amount),
    newTotal
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

    // Auto-merge: Check if there's an existing order to merge into
    // Only merge if: same restaurant, same table (non-null), same order_type, payment pending
    const skipAutoMerge = orderData.skipAutoMerge === true;
    if (!skipAutoMerge && orderData.restaurant_id && orderData.table_number) {
      const mergeableOrder = await findMergeableOrder(
        orderData.restaurant_id,
        orderData.table_number,
        orderData.order_type || 'dine_in'
      );

      if (mergeableOrder) {
        console.log(`🔀 [AUTO-MERGE] Found mergeable order ${mergeableOrder.id} for table ${orderData.table_number}`);

        // Merge items into existing order (support both 'items' and 'order_items')
        const newItems = orderData.order_items || orderData.items || [];
        const mergeResult = await mergeItemsIntoOrder(mergeableOrder, newItems);

        console.log(`✅ [AUTO-MERGE] Merged ${mergeResult.addedItems.length} items into order ${mergeableOrder.id}`);

        // Emit socket event for real-time update
        const io = req.app.get('io');
        if (io && mergeableOrder.restaurant_id) {
          io.of('/orders').to(`restaurant_${mergeableOrder.restaurant_id}`).emit('order-updated', mergeResult.order);
        }

        return res.status(200).json({
          success: true,
          data: mergeResult.order,
          merged: true,
          mergeInfo: {
            originalOrderId: mergeableOrder.id,
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
    const itemsArray = orderData.order_items || orderData.items || [];
    if (!orderData.total_amount && itemsArray.length > 0) {
      orderData.total_amount = itemsArray.reduce((sum, item) => {
        return sum + (parseFloat(item.price) * parseInt(item.quantity));
      }, 0);
    }
    // Ensure total_amount has a default value
    if (!orderData.total_amount) {
      orderData.total_amount = 0;
    }

    // Get restaurant for timezone and operation settings
    const restaurant = orderData.restaurant_id ? await Restaurant.findByPk(orderData.restaurant_id) : null;
    let timezone = 'Asia/Kuala_Lumpur';
    
    if (restaurant) {
      try {
        const operationSettings = restaurant.operation_settings ? 
          (typeof restaurant.operation_settings === 'string' ? 
            JSON.parse(restaurant.operation_settings) : 
            restaurant.operation_settings) : null;
        if (operationSettings?.timeZone) {
          timezone = operationSettings.timeZone;
        }
      } catch (e) {
        console.warn('Failed to parse operation_settings:', e);
      }
    }

    // Ensure order_date is set with timezone consideration
    if (!orderData.order_date) {
      // Create date in restaurant timezone
      const now = new Date();
      const dateStr = now.toLocaleString('en-US', { timeZone: timezone });
      orderData.order_date = new Date(dateStr);
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
            const now = new Date();
            const dateStr = now.toLocaleString('en-US', { timeZone: timezone });
            const localDate = new Date(dateStr);
            const year = localDate.getFullYear();
            const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
            const day = localDate.getDate().toString().padStart(2, '0');
            const datePrefix = `${year.toString().slice(-2)}${month}${day}`;

            // Check for existing orders today (in timezone) with lock
            const todayStart = new Date(year, localDate.getMonth(), day, 0, 0, 0, 0);
            const todayEnd = new Date(year, localDate.getMonth(), day, 23, 59, 59, 999);

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

          // Prepare order data - convert items to order_items JSON
          const itemsArray = orderData.order_items || orderData.items || [];
          const orderItemsJson = itemsArray.length > 0 ? JSON.stringify(itemsArray) : null;

          // Calculate total if not set
          let calculatedTotal = orderData.total_amount;
          if (!calculatedTotal && itemsArray.length > 0) {
            calculatedTotal = itemsArray.reduce((sum, item) => {
              return sum + (parseFloat(item.price) * parseInt(item.quantity));
            }, 0);
          }

          return await Order.create({
            ...orderData,
            order_number: generatedOrderNumber,
            order_items: orderItemsJson,
            total_amount: calculatedTotal || 0
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
          console.log(`✅ [POINTS] Used ${order.points_used} points for order ${order.id}`);
        } else {
          console.warn(`⚠️ [POINTS] Failed to use points for order ${order.id}:`, pointResult.error);
          // Note: We don't fail the order if points usage fails
          // The order will still be created, but points won't be deducted
        }
      } catch (pointError) {
        console.error(`❌ [POINTS] Error using points for order ${order.id}:`, pointError);
      }
    }

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      console.log(`📡 Emitting order-created event to restaurant_${order.restaurant_id}`);
      console.log(`   Order ID: ${order.id}, Number: ${order.order_number}`);
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-created', order);
      console.log(`✅ Socket event emitted successfully`);
    } else {
      console.warn('⚠️ Socket.IO not available or restaurant_id missing:', {
        hasIO: !!io,
        restaurantId: order.restaurant_id
      });
    }

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    console.error('❌ Order creation failed:', error.message);
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

      // Update order with provided fields
      await order.update(req.body, { transaction: t });

      return order;
    }, { maxRetries: 3 });

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && result.restaurant_id) {
      io.of('/orders').to(`restaurant_${result.restaurant_id}`).emit('order-updated', result);
    }

    res.json({ success: true, data: result });
  } catch (error) {
    if (error.message === 'Order not found') {
      return res.status(404).json({ success: false, error: error.message });
    }
    console.error('❌ Order 업데이트 실패:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update order status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, kitchen_ready, served_at } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const updateData = { status };
    if (kitchen_ready !== undefined) {
      updateData.kitchen_ready = kitchen_ready;
    }

    // Record served_at timestamp when status changes to 'served' or 'completed'
    // Accept from frontend if provided, otherwise generate (only if not already set)
    if ((status === 'served' || status === 'completed') && !order.served_at) {
      updateData.served_at = served_at ? new Date(served_at) : new Date();
    }

    // If reverting to pending, reset all item statuses
    if (status === 'pending' && order.order_items) {
      try {
        // order_items는 모델의 getter에서 이미 파싱됨
        const items = Array.isArray(order.order_items) ? order.order_items : JSON.parse(order.order_items);
        const resetItems = items.map(item => ({
          ...item,
          status: 'pending'
        }));
        updateData.order_items = resetItems; // 모델의 setter가 stringify 처리
      } catch (e) {
        console.error('Failed to reset item statuses:', e);
      }
    }

    // Track if status changed to completed (for inventory deduction)
    const wasCompleted = order.status === 'completed';
    const willBeCompleted = status === 'completed';

    await order.update(updateData);
    await order.reload(); // Ensure we have the latest data

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
          console.log(`✅ [INVENTORY] Deducted ${deductionResult.deductions.length} ingredients for order ${order.id}`);
          if (deductionResult.warnings.length > 0) {
            console.warn(`⚠️ [INVENTORY] Warnings:`, deductionResult.warnings);
          }
        }
      } catch (inventoryError) {
        // Don't fail the order update if inventory deduction fails
        console.error(`❌ [INVENTORY] Error deducting inventory for order ${order.id}:`, inventoryError);
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
            console.log(`✅ [POINTS] Earned ${pointResult.earnedPoints} points for order ${order.id}`);
          }
        } catch (pointError) {
          // Don't fail the order update if point earning fails
          console.error(`❌ [POINTS] Error earning points for order ${order.id}:`, pointError);
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
          console.log(`✅ [POINTS] Refunded ${refundResult.refundedPoints} points for order ${order.id}`);
        }
      } catch (pointError) {
        // Don't fail the order update if point refund fails
        console.error(`❌ [POINTS] Error refunding points for order ${order.id}:`, pointError);
      }
    }

    // Emit socket event for real-time update
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      console.log(`📡 [STATUS] Emitting order-updated for order ${order.id}, status: ${order.status}`);
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', order);
    } else {
      console.warn('⚠️ [STATUS] Socket.IO not available or restaurant_id missing');
    }

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
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const updateData = {
      order_items: JSON.stringify(order_items)
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
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', order);
    }

    res.json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete order (soft delete - preserves order number)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
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

// Get orders by restaurant ID
router.get('/restaurant/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 50,
      includeCompleted = 'true'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    let whereCondition = {
      restaurant_id: req.params.restaurantId,
      // Exclude soft-deleted orders
      [Op.or]: [
        { is_deleted: false },
        { is_deleted: null }
      ]
    };

    // Filter by status if provided
    if (status) {
      whereCondition.status = status;
    }

    // By default, exclude completed orders unless explicitly requested
    if (includeCompleted === 'false') {
      whereCondition.status = { [Op.ne]: 'completed' };
    }

    // Get total count
    const totalCount = await Order.count({ where: whereCondition });

    // Get paginated orders
    const orders = await Order.findAll({
      where: whereCondition,
      order: [['order_date', 'DESC'], ['createdAt', 'DESC']],
      limit: limitNum,
      offset: offset
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      data: orders,
      pagination: {
        currentPage: pageNum,
        totalPages: totalPages,
        totalCount: totalCount,
        limit: limitNum,
        hasMore: pageNum < totalPages
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get orders by table number
router.get('/table/:tableNumber', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        table_number: req.params.tableNumber,
        status: ['pending', 'preparing']
      },
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get kitchen orders (pending and preparing)
router.get('/kitchen/active', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { 
        status: ['pending', 'preparing']
      },
      order: [['createdAt', 'ASC']]
    });
    
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get sales data
router.get('/analytics/sales', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let whereCondition = { status: 'completed' };
    if (startDate && endDate) {
      whereCondition.createdAt = {
        $between: [new Date(startDate), new Date(endDate)]
      };
    }
    
    const orders = await Order.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']]
    });
    
    const totalSales = orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
    const totalOrders = orders.length;
    const averageOrder = totalOrders > 0 ? totalSales / totalOrders : 0;
    
    res.json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        averageOrder,
        orders
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate next order number (prevents duplicates)
router.get('/restaurant/:restaurantId/next-order-number', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    let timeZone = req.query.timeZone || 'Asia/Kuala_Lumpur';

    // Get timezone from restaurant settings if not provided
    if (restaurantId) {
      const restaurant = await Restaurant.findByPk(restaurantId);
      if (restaurant && restaurant.operation_settings) {
        try {
          const operationSettings = typeof restaurant.operation_settings === 'string' ? 
            JSON.parse(restaurant.operation_settings) : 
            restaurant.operation_settings;
          if (operationSettings?.timeZone) {
            timeZone = operationSettings.timeZone;
          }
        } catch (e) {
          console.warn('Failed to parse operation_settings:', e);
        }
      }
    }

    // Get current date in the specified timezone
    const now = new Date();
    const localDateStr = now.toLocaleString('en-US', { timeZone });
    const localDate = new Date(localDateStr);

    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');
    const datePrefix = `${year.toString().slice(-2)}${month}${day}`; // YYMMDD

    // Find the highest order number for today (in timezone)
    const todayStart = new Date(year, localDate.getMonth(), day, 0, 0, 0, 0);
    const todayEnd = new Date(year, localDate.getMonth(), day, 23, 59, 59, 999);

    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_number: {
          [Op.like]: `${datePrefix}-%`
        },
        createdAt: {
          [Op.between]: [todayStart, todayEnd]
        }
      },
      order: [['order_number', 'DESC']],
      limit: 1
    });

    let nextCounter = 1;
    if (orders.length > 0) {
      const lastOrderNumber = orders[0].order_number;
      const parts = lastOrderNumber.split('-');
      if (parts.length > 1) {
        const lastCounter = parseInt(parts[1]) || 0;
        nextCounter = lastCounter + 1;
      }
    }

    const counterStr = nextCounter.toString().padStart(3, '0');
    const orderNumber = `${datePrefix}-${counterStr}`;
    const pickupNumber = counterStr;

    res.json({
      success: true,
      data: {
        orderNumber,
        pickupNumber,
        counter: nextCounter
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Manual merge orders
// POST /api/orders/merge
router.post('/merge', authenticateToken, async (req, res) => {
  try {
    const { orderIds, targetOrderId } = req.body;

    // Validate input
    if (!orderIds || !Array.isArray(orderIds) || orderIds.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'At least 2 order IDs are required for merging'
      });
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

      // Recalculate total
      const newTotal = targetItems.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price) || 0;
        const itemQty = parseInt(item.quantity) || 1;
        return sum + (itemPrice * itemQty);
      }, 0);

      // Update target order
      await target.update({
        order_items: JSON.stringify(targetItems),
        total_amount: newTotal,
        status: 'pending' // Reset to pending for kitchen re-review
      }, { transaction: t });

      await target.reload({ transaction: t });

      return {
        mergedOrder: target,
        deletedOrderIds
      };
    });

    console.log(`✅ [MERGE] Merged orders ${orderIds.join(', ')} into order ${result.mergedOrder.id}`);

    // Emit socket events
    const io = req.app.get('io');
    if (io && result.mergedOrder.restaurant_id) {
      const room = `restaurant_${result.mergedOrder.restaurant_id}`;

      // Emit update for merged order
      io.of('/orders').to(room).emit('order-updated', result.mergedOrder);

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
    console.error('❌ [MERGE] Error:', error.message);
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
      return res.status(400).json({
        success: false,
        error: 'Items array is required'
      });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Validate order can accept new items
    if (order.payment_status === 'completed') {
      return res.status(400).json({
        success: false,
        error: 'Cannot add items to a paid order'
      });
    }

    if (['served', 'completed', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot add items to an order with status "${order.status}"`
      });
    }

    const now = new Date().toISOString();

    // Get current items
    let currentItems = order.order_items || [];
    if (typeof currentItems === 'string') {
      currentItems = JSON.parse(currentItems);
    }

    // Add new items with added_at timestamp
    const newItemsWithTimestamp = items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      options: item.options || [],
      status: 'pending',
      added_at: now
    }));

    const mergedItems = [...currentItems, ...newItemsWithTimestamp];

    // Recalculate total
    const newTotal = mergedItems.reduce((sum, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQty = parseInt(item.quantity) || 1;
      return sum + (itemPrice * itemQty);
    }, 0);

    // Update order
    await order.update({
      order_items: JSON.stringify(mergedItems),
      total_amount: newTotal,
      status: 'pending' // Reset to pending for kitchen
    });

    await order.reload();

    console.log(`✅ [ADD-ITEMS] Added ${newItemsWithTimestamp.length} items to order ${order.id}`);

    // Emit socket event
    const io = req.app.get('io');
    if (io && order.restaurant_id) {
      io.of('/orders').to(`restaurant_${order.restaurant_id}`).emit('order-updated', order);
    }

    res.json({
      success: true,
      data: order,
      addedItems: newItemsWithTimestamp,
      previousTotal: parseFloat(order.total_amount) - newItemsWithTimestamp.reduce((sum, item) =>
        sum + (parseFloat(item.price) * parseInt(item.quantity)), 0),
      newTotal
    });

  } catch (error) {
    console.error('❌ [ADD-ITEMS] Error:', error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;