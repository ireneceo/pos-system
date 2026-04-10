// 주문 조회 뷰 (레스토랑 목록/카운트/테이블/주방/분석/주문번호)
// 마운트: /api/orders

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Restaurant = require('../models/Restaurant');
const Coupon = require('../models/Coupon');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { executeQuery, executeTransaction } = require('../utils/queryWrapper');
const { deductInventoryForOrder } = require('../services/inventoryDeductionService');
const { earnPointsForOrder, refundPointsForOrder, usePointsForOrder } = require('../services/pointService');
const { authenticateToken, optionalAuthenticateToken } = require('../middleware/auth');
const ActivityLog = require('../models/ActivityLog');
const { logActivity } = require('../utils/activityLogger');
const { getTodayBounds, getOrderDatePrefix, getRestaurantTimezone } = require('../utils/dateTimeHelper');

router.get('/restaurant/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 50,
      includeCompleted = 'true',
      startDate,
      endDate,
      search
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

    // Filter by date range if provided
    // Dates from frontend are in restaurant's timezone (e.g., "2026-01-29" in Asia/Kuala_Lumpur)
    // We need to convert them to UTC for database comparison
    if (startDate && endDate) {
      // Get restaurant's timezone setting
      const restaurant = await Restaurant.findByPk(req.params.restaurantId);
      let timezone = 'Asia/Kuala_Lumpur';
      if (restaurant?.operation_settings) {
        try {
          const opSettings = typeof restaurant.operation_settings === 'string'
            ? JSON.parse(restaurant.operation_settings)
            : restaurant.operation_settings;
          timezone = opSettings?.timeZone || timezone;
        } catch { /* use default */ }
      }

      // Convert restaurant local date to UTC range
      // e.g., "2026-01-29" in Asia/Kuala_Lumpur = "2026-01-28 16:00:00" to "2026-01-29 15:59:59" in UTC
      const getUTCRange = (dateStr, tz) => {
        try {
          // Create date at midnight in the restaurant's timezone
          const localMidnight = new Date(`${dateStr}T00:00:00`);

          // Get timezone offset in minutes
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            timeZoneName: 'shortOffset'
          });
          const parts = formatter.formatToParts(localMidnight);
          const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value || '+00:00';
          const offsetMatch = offsetPart.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);

          let offsetMinutes = 0;
          if (offsetMatch) {
            const sign = offsetMatch[1] === '+' ? 1 : -1;
            const hours = parseInt(offsetMatch[2]) || 0;
            const mins = parseInt(offsetMatch[3]) || 0;
            offsetMinutes = sign * (hours * 60 + mins);
          }

          // Create UTC dates by subtracting the offset
          const startUTC = new Date(`${dateStr}T00:00:00Z`);
          startUTC.setMinutes(startUTC.getMinutes() - offsetMinutes);

          return startUTC;
        } catch {
          // Fallback: treat as local server time
          const date = new Date(dateStr);
          date.setHours(0, 0, 0, 0);
          return date;
        }
      };

      const startUTC = getUTCRange(startDate, timezone);
      const endUTC = getUTCRange(endDate, timezone);
      endUTC.setDate(endUTC.getDate() + 1); // End of day = start of next day
      endUTC.setMilliseconds(endUTC.getMilliseconds() - 1); // 23:59:59.999

      whereCondition.order_date = {
        [Op.between]: [startUTC, endUTC]
      };
    }

    // Filter by status if provided
    if (status) {
      whereCondition.status = status;
    }

    // By default, exclude completed orders unless explicitly requested
    if (includeCompleted === 'false') {
      whereCondition.status = { [Op.ne]: 'completed' };
    }

    // Search filter - search across basic text fields
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      whereCondition[Op.or] = [
        { order_number: { [Op.like]: searchTerm } },
        { customer_name: { [Op.like]: searchTerm } },
        { customer_phone: { [Op.like]: searchTerm } },
        { table_number: { [Op.like]: searchTerm } }
      ];
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

    // Parse order_items for each order (getter may not work with res.json)
    const ordersWithParsedItems = orders.map(order => {
      const plainOrder = order.get({ plain: true });
      // Ensure order_items is parsed
      if (typeof plainOrder.order_items === 'string') {
        try {
          plainOrder.order_items = JSON.parse(plainOrder.order_items);
        } catch (e) {
          plainOrder.order_items = [];
        }
      }
      return plainOrder;
    });

    const totalPages = Math.ceil(totalCount / limitNum);

    res.json({
      success: true,
      data: ordersWithParsedItems,
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

// Get order counts by status (optimized for tab counts)
router.get('/restaurant/:restaurantId/counts', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const restaurantId = req.params.restaurantId;

    // Convert dates from restaurant's timezone to UTC
    let startUTC = null;
    let endUTC = null;

    if (startDate && endDate) {
      // Get restaurant's timezone setting
      const restaurant = await Restaurant.findByPk(restaurantId);
      let timezone = 'Asia/Kuala_Lumpur';
      if (restaurant?.operation_settings) {
        try {
          const opSettings = typeof restaurant.operation_settings === 'string'
            ? JSON.parse(restaurant.operation_settings)
            : restaurant.operation_settings;
          timezone = opSettings?.timeZone || timezone;
        } catch { /* use default */ }
      }

      // Helper to convert local date to UTC
      const getUTCFromLocal = (dateStr, tz) => {
        try {
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            timeZoneName: 'shortOffset'
          });
          const parts = formatter.formatToParts(new Date());
          const offsetPart = parts.find(p => p.type === 'timeZoneName')?.value || '+00:00';
          const offsetMatch = offsetPart.match(/GMT([+-])(\d{1,2}):?(\d{2})?/);

          let offsetMinutes = 0;
          if (offsetMatch) {
            const sign = offsetMatch[1] === '+' ? 1 : -1;
            const hours = parseInt(offsetMatch[2]) || 0;
            const mins = parseInt(offsetMatch[3]) || 0;
            offsetMinutes = sign * (hours * 60 + mins);
          }

          const utc = new Date(`${dateStr}T00:00:00Z`);
          utc.setMinutes(utc.getMinutes() - offsetMinutes);
          return utc;
        } catch {
          const date = new Date(dateStr);
          date.setHours(0, 0, 0, 0);
          return date;
        }
      };

      startUTC = getUTCFromLocal(startDate, timezone);
      endUTC = getUTCFromLocal(endDate, timezone);
      endUTC.setDate(endUTC.getDate() + 1);
      endUTC.setMilliseconds(endUTC.getMilliseconds() - 1);
    }

    // Use raw SQL for efficient counting and statistics
    const [results] = await sequelize.query(`
      SELECT
        status,
        COUNT(*) as count,
        SUM(total_amount) as total_sales,
        AVG(total_amount) as avg_amount,
        MAX(total_amount) as max_amount
      FROM orders
      WHERE restaurant_id = :restaurantId
        AND (is_deleted = false OR is_deleted IS NULL)
        ${startUTC && endUTC ? 'AND order_date BETWEEN :startDate AND :endDate' : ''}
      GROUP BY status
    `, {
      replacements: {
        restaurantId,
        startDate: startUTC,
        endDate: endUTC
      }
    });

    // Calculate counts by status
    const counts = {
      all: 0,
      outstanding: 0,
      pending: 0,
      preparing: 0,
      ready: 0,
      served: 0,
      completed: 0,
      cancelled: 0
    };

    let totalSales = 0;
    let completedSales = 0;
    let totalOrderCount = 0;
    let maxAmount = 0;

    // Calculate counts and statistics
    results.forEach(row => {
      const count = parseInt(row.count) || 0;
      const sales = parseFloat(row.total_sales) || 0;
      const rowMax = parseFloat(row.max_amount) || 0;

      counts.all += count;
      counts[row.status] = count;
      totalSales += sales;

      // Exclude cancelled from statistics (LiveOrders shows all non-cancelled)
      if (row.status !== 'cancelled') {
        totalOrderCount += count;
        if (rowMax > maxAmount) {
          maxAmount = rowMax;
        }
      }

      // Outstanding = status가 'outstanding'인 주문만
      if (row.status === 'outstanding') {
        counts.outstanding += count;
      }

      if (row.status === 'completed') {
        completedSales += sales;
      }
    });

    // Calculate average (excluding cancelled orders)
    const salesExcludingCancelled = results
      .filter(row => row.status !== 'cancelled')
      .reduce((sum, row) => sum + (parseFloat(row.total_sales) || 0), 0);
    const avgAmount = totalOrderCount > 0 ? salesExcludingCancelled / totalOrderCount : 0;

    res.json({
      success: true,
      data: {
        counts,
        totalSales,
        completedSales,
        statistics: {
          totalSales: salesExcludingCancelled,
          avgAmount,
          maxAmount,
          orderCount: totalOrderCount
        }
      }
    });
  } catch (error) {
    console.error('Error fetching order counts:', error);
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
    const restaurant = restaurantId ? await Restaurant.findByPk(restaurantId) : null;
    const timeZone = getRestaurantTimezone(restaurant);

    const datePrefix = getOrderDatePrefix(timeZone);
    const { startOfDay: todayStart, endOfDay: todayEnd } = getTodayBounds(timeZone);

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

module.exports = router;
