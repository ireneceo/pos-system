const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Order = require('../models/Order');
const RestaurantDailyStats = require('../models/RestaurantDailyStats');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Invoice = require('../models/Invoice');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { getTodayBounds, getDateRange, getStartOfMonth, getSiteTimezone } = require('../utils/dateTimeHelper');

// Get restaurant-specific dashboard statistics - REMOVED DUPLICATE
// This route is duplicated at line 437 with more complete restaurant info
// Keeping only the comprehensive version below

// Get restaurant dashboard statistics
router.get('/restaurant/:restaurantId/stats', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Get restaurant info - force reload from database to avoid any caching
    const restaurant = await Restaurant.findByPk(restaurantId, {
      raw: false,
      nest: false
    });
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    // Reload the restaurant to ensure we have the latest data
    await restaurant.reload();

    // Get timezone from operation_settings (default: Asia/Kuala_Lumpur)
    const operationSettings = restaurant.operation_settings || {};
    const timeZone = operationSettings.timeZone || 'Asia/Kuala_Lumpur';

    // Helper function to get today's start and end in restaurant's timezone
    const getTodayBounds = (tz) => {
      const now = new Date();
      // Get current date string in the target timezone
      const dateStr = now.toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD format
      // Create start and end of day in UTC that corresponds to the timezone's day
      const startOfDay = new Date(`${dateStr}T00:00:00`);
      const endOfDay = new Date(`${dateStr}T23:59:59.999`);

      // Adjust for timezone offset
      const tzOffset = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
      const offsetMatch = tzOffset.match(/GMT([+-]\d+)/);
      const offsetHours = offsetMatch ? parseInt(offsetMatch[1]) : 8; // Default to +8 for Asia/Kuala_Lumpur

      startOfDay.setHours(startOfDay.getHours() - offsetHours);
      endOfDay.setHours(endOfDay.getHours() - offsetHours);

      return { startOfDay, endOfDay };
    };

    const { startOfDay: today, endOfDay: todayEnd } = getTodayBounds(timeZone);
    const tomorrow = new Date(todayEnd.getTime() + 1);

    // Get restaurant orders
    const orders = await Order.findAll({
      where: { restaurant_id: restaurantId }
    });

    // Today's orders (using timezone-aware bounds)
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.order_date);
      return orderDate >= today && orderDate < tomorrow;
    });
    
    const todayRevenue = todayOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
    
    // Helper to get month/year start in restaurant timezone
    const getMonthStartInTimezone = (tz) => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD
      const [year, month] = dateStr.split('-');
      // First day of current month in timezone
      const monthStartStr = `${year}-${month}-01T00:00:00`;
      const monthStart = new Date(monthStartStr);

      // Adjust for timezone offset
      const tzOffset = now.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
      const offsetMatch = tzOffset.match(/GMT([+-]\d+)/);
      const offsetHours = offsetMatch ? parseInt(offsetMatch[1]) : 8;
      monthStart.setHours(monthStart.getHours() - offsetHours);

      return monthStart;
    };

    const getYearStartInTimezone = (tz) => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD
      const year = dateStr.split('-')[0];
      // First day of current year in timezone
      const yearStartStr = `${year}-01-01T00:00:00`;
      const yearStart = new Date(yearStartStr);

      // Adjust for timezone offset
      const tzOffset = now.toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
      const offsetMatch = tzOffset.match(/GMT([+-]\d+)/);
      const offsetHours = offsetMatch ? parseInt(offsetMatch[1]) : 8;
      yearStart.setHours(yearStart.getHours() - offsetHours);

      return yearStart;
    };

    // This month's stats (timezone-aware)
    const thisMonth = getMonthStartInTimezone(timeZone);

    const monthlyOrders = orders.filter(order => {
      const orderDate = new Date(order.order_date);
      return orderDate >= thisMonth;
    });

    const monthlyRevenue = monthlyOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

    // This year's stats (timezone-aware)
    const thisYear = getYearStartInTimezone(timeZone);

    const yearlyOrders = orders.filter(order => {
      const orderDate = new Date(order.order_date);
      return orderDate >= thisYear;
    });

    const yearlyRevenue = yearlyOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

    // All-time stats
    const totalRevenue = orders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

    const totalOrders = orders.length;
    const totalCompletedOrders = orders.filter(order => order.status === 'completed').length;

    // Get restaurant invoices
    const invoices = await Invoice.findAll({
      where: { restaurant_id: restaurantId }
    });
    
    // Match the canonical Invoice.status ENUM ('draft'|'pending_payment'|
    // 'payment_submitted'|'paid'|'overdue'|'cancelled'). The legacy 'sent'
    // value never existed in this schema, which silently zero-counted every
    // pending invoice on the restaurant dashboard. /invoices/to-pay already
    // uses the same set; keeping them aligned.
    const unpaidInvoices = invoices.filter(inv =>
      inv.status === 'pending_payment' ||
      inv.status === 'payment_submitted' ||
      inv.status === 'overdue'
    );
    const totalUnpaidAmount = unpaidInvoices.reduce((sum, inv) => sum + parseFloat(inv.total_amount), 0);
    
    // Format recent orders with items
    const recentOrdersList = orders.slice(-10).reverse().map(order => {
      let items = [];
      try {
        // Try to parse order_items if it's stored as JSON
        if (order.order_items) {
          if (typeof order.order_items === 'string') {
            items = JSON.parse(order.order_items);
          } else {
            items = order.order_items;
          }
        }
      } catch (e) {
        console.error('Error parsing order items:', e);
        items = [];
      }

      return {
        id: order.id,
        order_number: order.order_number,
        customer_name: order.customer_name || 'Guest',
        customer_phone: order.customer_phone || 'N/A',
        table_number: order.table_number,
        items: items,
        status: order.status,
        order_date: order.order_date || order.createdAt,
        total_amount: order.total_amount || 0,
        payment_status: order.payment_status || 'pending',
        payment_method: order.payment_method || 'Cash'
      };
    });

    // Set cache control headers to prevent stale data
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json({
      success: true,
      data: {
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          planType: restaurant.plan_type,
          status: restaurant.status,
          subscriptionStart: restaurant.subscription_start,
          subscriptionEnd: restaurant.subscription_end,
          trialEndDate: restaurant.trial_end_date
        },
        today: {
          orders: todayOrders.length || 0,
          revenue: todayRevenue || 0,
          completedOrders: todayOrders.filter(o => o.status === 'completed').length || 0,
          pendingOrders: todayOrders.filter(o => o.status === 'pending' || o.status === 'preparing').length || 0
        },
        monthly: {
          orders: monthlyOrders.length || 0,
          revenue: monthlyRevenue || 0,
          completedOrders: monthlyOrders.filter(o => o.status === 'completed').length || 0
        },
        yearly: {
          orders: yearlyOrders.length || 0,
          revenue: yearlyRevenue || 0,
          completedOrders: yearlyOrders.filter(o => o.status === 'completed').length || 0
        },
        total: {
          orders: totalOrders || 0,
          revenue: totalRevenue || 0,
          completedOrders: totalCompletedOrders || 0
        },
        billing: {
          unpaidInvoices: unpaidInvoices.length || 0,
          totalUnpaidAmount: totalUnpaidAmount || 0,
          nextDueDate: unpaidInvoices.length > 0 ? unpaidInvoices[0].due_date : null
        },
        recentOrders: recentOrdersList
      }
    });
  } catch (error) {
    console.error('Error fetching restaurant stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get restaurant sales chart data (Optimized - single query instead of N+1)
// Uses order_date (not createdAt) for consistency with stats API
// Applies restaurant timezone for accurate date grouping
router.get('/restaurant/:restaurantId/sales-chart', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { period = 'week' } = req.query; // week, month, year

    // Get restaurant timezone
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }
    const operationSettings = restaurant.operation_settings || {};
    const timeZone = operationSettings.timeZone || 'Asia/Kuala_Lumpur';

    // Helper to get timezone offset in hours
    const getTimezoneOffset = (tz) => {
      const tzOffset = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
      const offsetMatch = tzOffset.match(/GMT([+-]\d+)/);
      return offsetMatch ? parseInt(offsetMatch[1]) : 8;
    };

    // Helper to get today's date string in timezone
    const getTodayInTimezone = (tz) => {
      return new Date().toLocaleDateString('en-CA', { timeZone: tz }); // YYYY-MM-DD
    };

    // Helper to convert local date to UTC bounds
    const getUTCBoundsForDate = (dateStr, tz, isEnd = false) => {
      const offsetHours = getTimezoneOffset(tz);
      const date = new Date(`${dateStr}T${isEnd ? '23:59:59.999' : '00:00:00'}`);
      date.setHours(date.getHours() - offsetHours);
      return date;
    };

    // Helper to get date string in timezone from UTC date
    const getDateInTimezone = (utcDate, tz) => {
      return utcDate.toLocaleDateString('en-CA', { timeZone: tz });
    };

    // Calculate date range based on period (in restaurant timezone)
    const todayStr = getTodayInTimezone(timeZone);
    let startDate, endDate;
    const now = new Date();

    if (period === 'week') {
      // Last 7 days including today
      const startDateObj = new Date(todayStr);
      startDateObj.setDate(startDateObj.getDate() - 6);
      const startStr = startDateObj.toISOString().split('T')[0];
      startDate = getUTCBoundsForDate(startStr, timeZone, false);
      endDate = getUTCBoundsForDate(todayStr, timeZone, true);
    } else if (period === 'month') {
      // Last 28 days (4 weeks)
      const startDateObj = new Date(todayStr);
      startDateObj.setDate(startDateObj.getDate() - 27);
      const startStr = startDateObj.toISOString().split('T')[0];
      startDate = getUTCBoundsForDate(startStr, timeZone, false);
      endDate = getUTCBoundsForDate(todayStr, timeZone, true);
    } else if (period === 'year') {
      // Last 12 months
      const startDateObj = new Date(todayStr);
      startDateObj.setMonth(startDateObj.getMonth() - 11);
      startDateObj.setDate(1);
      const startStr = startDateObj.toISOString().split('T')[0];
      startDate = getUTCBoundsForDate(startStr, timeZone, false);
      endDate = getUTCBoundsForDate(todayStr, timeZone, true);
    }

    // B9 v2 (2026-05-03): pre-aggregated daily stats + today live fallback.
    // Replaces the prior raw Order.findAll + in-memory grouping which scaled
    // O(orders × restaurants). Now O(days × restaurants) for completed orders.

    // Date range as YYYY-MM-DD strings (in restaurant timezone)
    const rangeStartStr = getDateInTimezone(startDate, timeZone);
    const rangeEndStr = getDateInTimezone(endDate, timeZone);

    // Yesterday in restaurant timezone (cron has aggregated up to here)
    const yesterdayObj = new Date(todayStr);
    yesterdayObj.setDate(yesterdayObj.getDate() - 1);
    const yesterdayStr = yesterdayObj.toISOString().split('T')[0];

    // Pre-aggregated rows: from rangeStart through min(yesterday, rangeEnd)
    const aggUntil = rangeEndStr <= yesterdayStr ? rangeEndStr : yesterdayStr;
    const aggregated = aggUntil >= rangeStartStr ? await RestaurantDailyStats.findAll({
      where: {
        restaurant_id: restaurantId,
        date: { [Op.between]: [rangeStartStr, aggUntil] }
      },
      attributes: ['date', 'revenue', 'order_count'],
      order: [['date', 'ASC']]
    }) : [];

    const dailyMap = {};
    aggregated.forEach(a => {
      // a.date is DATEONLY → string "YYYY-MM-DD" in node-sequelize
      const ds = typeof a.date === 'string' ? a.date : new Date(a.date).toISOString().split('T')[0];
      dailyMap[ds] = { revenue: parseFloat(a.revenue || 0), orders: a.order_count };
    });

    // Today: compute live (cron hasn't aggregated today yet). Only if today is in range.
    if (rangeStartStr <= todayStr && todayStr <= rangeEndStr) {
      const todayStart = getUTCBoundsForDate(todayStr, timeZone, false);
      const todayEnd = getUTCBoundsForDate(todayStr, timeZone, true);
      const todayOrders = await Order.findAll({
        where: {
          restaurant_id: restaurantId,
          order_date: { [Op.gte]: todayStart, [Op.lte]: todayEnd },
          status: 'completed'
        },
        attributes: ['total_amount']
      });
      const todayRevenue = todayOrders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0);
      dailyMap[todayStr] = { revenue: Math.round(todayRevenue * 100) / 100, orders: todayOrders.length };
    }

    // Group daily data into the requested period bucket (week → daily, month → weekly, year → monthly)
    const salesData = [];

    if (period === 'week') {
      // Daily bucket: last 7 days
      for (let i = 6; i >= 0; i--) {
        const dateObj = new Date(todayStr);
        dateObj.setDate(dateObj.getDate() - i);
        const dateKey = dateObj.toISOString().split('T')[0];
        const row = dailyMap[dateKey];
        salesData.push({
          date: dateKey,
          revenue: row?.revenue || 0,
          orders: row?.orders || 0
        });
      }
    } else if (period === 'month') {
      // Weekly bucket: last 28 days into 4 buckets of 7 days each
      const weekData = [{revenue: 0, orders: 0}, {revenue: 0, orders: 0}, {revenue: 0, orders: 0}, {revenue: 0, orders: 0}];
      const todayDate = new Date(todayStr);
      Object.entries(dailyMap).forEach(([dateKey, row]) => {
        const orderDate = new Date(dateKey);
        const daysAgo = Math.floor((todayDate - orderDate) / (1000 * 60 * 60 * 24));
        const weekIndex = 3 - Math.floor(daysAgo / 7);
        if (weekIndex >= 0 && weekIndex < 4) {
          weekData[weekIndex].revenue += row.revenue;
          weekData[weekIndex].orders += row.orders;
        }
      });
      for (let i = 0; i < 4; i++) {
        const weekStart = new Date(todayStr);
        weekStart.setDate(weekStart.getDate() - ((3 - i) * 7 + 6));
        salesData.push({
          date: weekStart.toISOString().split('T')[0],
          revenue: Math.round(weekData[i].revenue * 100) / 100,
          orders: weekData[i].orders
        });
      }
    } else if (period === 'year') {
      // Monthly bucket: last 12 months
      const ordersByMonth = {};
      Object.entries(dailyMap).forEach(([dateKey, row]) => {
        const monthKey = dateKey.slice(0, 7);
        if (!ordersByMonth[monthKey]) ordersByMonth[monthKey] = { revenue: 0, orders: 0 };
        ordersByMonth[monthKey].revenue += row.revenue;
        ordersByMonth[monthKey].orders += row.orders;
      });
      for (let i = 11; i >= 0; i--) {
        const monthStart = new Date(todayStr);
        monthStart.setMonth(monthStart.getMonth() - i);
        monthStart.setDate(1);
        const monthKey = monthStart.toISOString().slice(0, 7);
        const row = ordersByMonth[monthKey];
        salesData.push({
          date: monthStart.toISOString().split('T')[0],
          revenue: row ? Math.round(row.revenue * 100) / 100 : 0,
          orders: row?.orders || 0
        });
      }
    }

    res.json({
      success: true,
      data: salesData,
      source: 'pre_aggregated_with_today_live'
    });
  } catch (error) {
    console.error('Error fetching restaurant sales chart:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Pre-aggregated daily stats lookup (B9 — see docs/DASHBOARD_AGGREGATION.md).
// Returns daily revenue/order_count/AOV from RestaurantDailyStats (cron-populated)
// + today's row computed live (cron hasn't run yet for today).
//
// Query: ?from=YYYY-MM-DD&to=YYYY-MM-DD (both required, restaurant timezone dates)
router.get('/restaurant/:restaurantId/daily-stats', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { from, to } = req.query;

    if (!from || !to || !/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) {
      return res.status(400).json({ success: false, error: { message: 'from and to are required (YYYY-MM-DD)', code: 'VALIDATION_ERROR' } });
    }
    if (from > to) {
      return res.status(400).json({ success: false, error: { message: 'from must be <= to', code: 'VALIDATION_ERROR' } });
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }
    const tz = restaurant.operation_settings?.timeZone || 'Asia/Kuala_Lumpur';
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: tz });

    // Pre-aggregated rows (yesterday and earlier — today is computed live below)
    const aggUntil = todayStr <= to ? (() => {
      const d = new Date(todayStr);
      d.setDate(d.getDate() - 1);
      return d.toISOString().split('T')[0];
    })() : to;
    const aggregated = await RestaurantDailyStats.findAll({
      where: {
        restaurant_id: restaurantId,
        date: { [Op.between]: [from, aggUntil] }
      },
      attributes: ['date', 'revenue', 'order_count', 'average_order_value', 'currency'],
      order: [['date', 'ASC']]
    });

    const aggMap = {};
    aggregated.forEach(a => {
      aggMap[a.date] = {
        date: a.date,
        revenue: parseFloat(a.revenue),
        order_count: a.order_count,
        average_order_value: parseFloat(a.average_order_value),
        currency: a.currency
      };
    });

    // Today's row computed live (cron hasn't aggregated today yet)
    let todayRow = null;
    if (from <= todayStr && todayStr <= to) {
      const offsetMatch = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' }).match(/GMT([+-]\d+)/);
      const offsetHours = offsetMatch ? parseInt(offsetMatch[1], 10) : 0;
      const start = new Date(`${todayStr}T00:00:00`);
      start.setHours(start.getHours() - offsetHours);
      const end = new Date(`${todayStr}T23:59:59.999`);
      end.setHours(end.getHours() - offsetHours);

      const todayOrders = await Order.findAll({
        where: {
          restaurant_id: restaurantId,
          order_date: { [Op.gte]: start, [Op.lte]: end },
          status: 'completed'
        },
        attributes: ['total_amount']
      });
      const revenue = todayOrders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0);
      const order_count = todayOrders.length;
      todayRow = {
        date: todayStr,
        revenue: Math.round(revenue * 100) / 100,
        order_count,
        average_order_value: order_count > 0 ? Math.round(revenue / order_count * 100) / 100 : 0,
        currency: restaurant.operation_settings?.currency || 'MYR',
        live: true
      };
    }

    // Build full date range result (fill missing dates with zero)
    const result = [];
    const cur = new Date(from);
    const end = new Date(to);
    while (cur <= end) {
      const ds = cur.toISOString().split('T')[0];
      if (ds === todayStr && todayRow) {
        result.push(todayRow);
      } else if (aggMap[ds]) {
        result.push(aggMap[ds]);
      } else {
        result.push({
          date: ds,
          revenue: 0,
          order_count: 0,
          average_order_value: 0,
          currency: restaurant.operation_settings?.currency || 'MYR',
          missing: true
        });
      }
      cur.setDate(cur.getDate() + 1);
    }

    res.json({ success: true, data: result, source: 'pre_aggregated_with_today_live' });
  } catch (error) {
    console.error('Error fetching daily-stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get earliest order date for "All" period filter
router.get('/restaurant/:restaurantId/earliest-order', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const earliest = await Order.findOne({
      where: { restaurant_id: restaurantId, status: 'completed' },
      attributes: ['order_date'],
      order: [['order_date', 'ASC']],
      raw: true
    });
    res.json({
      success: true,
      data: { earliestDate: earliest?.order_date || null }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2026-06-28 (Irene): 스탭밀(직원식) 전용 데이터 — 매장 타임존 기준 하루치 UTC 경계 계산 헬퍼.
// reports-summary 와 동일 로직을 작은 형태로 재사용(이 두 엔드포인트가 같이 씀).
function staffMealUTCBounds(dateStr, tz) {
  const tzOffset = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
  const m = tzOffset.match(/GMT([+-]\d+)/);
  const offsetHours = m ? parseInt(m[1]) : 8;
  const start = new Date(`${dateStr}T00:00:00`); start.setHours(start.getHours() - offsetHours);
  const end = new Date(`${dateStr}T23:59:59.999`); end.setHours(end.getHours() - offsetHours);
  return { start, end };
}

/**
 * Staff Meal 이름 자동완성 — 과거 스탭밀 주문의 품목에 쓰인 직원 이름 distinct 목록.
 * PaymentModal 의 품목별 직원이름 입력칸에서 이미 쓴 이름을 추천하는 데 사용.
 */
router.get('/restaurant/:restaurantId/staff-meal-names', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const recent = await Order.findAll({
      where: { restaurant_id: restaurantId, payment_method: 'staffMeal' },
      attributes: ['order_items'],
      order: [['order_date', 'DESC']],
      limit: 400
    });
    const names = new Set();
    recent.forEach(o => {
      let items = o.order_items;
      if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
      (Array.isArray(items) ? items : []).forEach(it => {
        // staff_names(수량별 배열) 우선, 구버전 staff_name(단일) 호환.
        const arr = Array.isArray(it && it.staff_names) ? it.staff_names : (it && it.staff_name ? [it.staff_name] : []);
        arr.forEach(n => { const nm = (n || '').toString().trim(); if (nm) names.add(nm); });
      });
    });
    res.json({ success: true, data: Array.from(names).sort((a, b) => a.localeCompare(b)) });
  } catch (error) {
    console.error('staff-meal-names error:', error);
    res.status(500).json({ success: false, message: 'Failed to load staff meal names' });
  }
});

/**
 * Staff Meal Settlement — 하루 마감분(일별 배치). 그날 스탭밀 주문 전체 + 품목별 직원이름 + 합계.
 * Daily Settlement 처럼 하루치를 모아 정산서로 인쇄(프론트 billPrint 재사용, 인쇄엔진 무변경).
 */
router.get('/restaurant/:restaurantId/staff-meal-settlement', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const date = req.query.date;
    if (!date) return res.status(400).json({ success: false, message: 'date required' });

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });
    const tz = (restaurant.operation_settings || {}).timeZone || 'Asia/Kuala_Lumpur';
    const { start, end } = staffMealUTCBounds(date, tz);

    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        payment_method: 'staffMeal',
        order_date: { [Op.gte]: start, [Op.lte]: end },
        status: 'completed',
        [Op.or]: [{ is_deleted: false }, { is_deleted: null }]
      },
      attributes: ['id', 'order_number', 'order_date', 'order_type', 'total_amount', 'subtotal', 'order_items', 'table_number'],
      order: [['order_date', 'ASC']]
    });

    let grandTotal = 0;
    let itemCount = 0;
    const result = orders.map(o => {
      let items = o.order_items;
      if (typeof items === 'string') { try { items = JSON.parse(items); } catch { items = []; } }
      const cleanItems = (Array.isArray(items) ? items : []).map(it => {
        const qty = Number(it.quantity) || 1;
        itemCount += qty;
        // staff_names = 수량별 직원이름 배열(같은 메뉴 2개=2명). 구버전 staff_name(단일) 호환.
        const staffNames = Array.isArray(it.staff_names)
          ? it.staff_names.map(n => (n || '').toString().trim())
          : (it.staff_name ? [String(it.staff_name).trim()] : []);
        return {
          name: it.name || it.product_name || 'Item',
          quantity: qty,
          price: Number(it.price) || Number(it.unit_price) || 0,
          staff_names: staffNames,
          options: it.options || it.selectedOptions || it.option_groups || null,
          special_instructions: it.special_instructions || null
        };
      });
      grandTotal += Number(o.total_amount) || 0;
      return {
        id: o.id,
        order_number: o.order_number,
        order_date: o.order_date,
        order_type: o.order_type,
        table_number: o.table_number,
        total_amount: Number(o.total_amount) || 0,
        subtotal: Number(o.subtotal) || 0,
        items: cleanItems
      };
    });

    res.json({ success: true, data: { date, timeZone: tz, orders: result, orderCount: result.length, itemCount, grandTotal } });
  } catch (error) {
    console.error('staff-meal-settlement error:', error);
    res.status(500).json({ success: false, message: 'Failed to load staff meal settlement' });
  }
});

/**
 * Reports Aggregation API
 * What and Why: 대량 데이터 클라이언트 처리 대신 서버에서 집계하여 성능 최적화
 * - 10000개 주문 데이터를 프론트엔드로 전송하는 대신 서버에서 집계 후 요약 데이터만 전송
 * - 카테고리별, 메뉴별, 시간대별, 일별 매출 통계를 한 번의 API 호출로 제공
 */
router.get('/restaurant/:restaurantId/reports-summary', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, error: { message: 'startDate and endDate are required', code: 'VALIDATION_ERROR' } });
    }

    // Get restaurant timezone
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }
    const operationSettings = restaurant.operation_settings || {};
    const timeZone = operationSettings.timeZone || 'Asia/Kuala_Lumpur';

    // Helper functions
    const getTimezoneOffset = (tz) => {
      const tzOffset = new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'shortOffset' });
      const offsetMatch = tzOffset.match(/GMT([+-]\d+)/);
      return offsetMatch ? parseInt(offsetMatch[1]) : 8;
    };

    const getUTCBoundsForDate = (dateStr, tz, isEnd = false) => {
      const offsetHours = getTimezoneOffset(tz);
      const date = new Date(`${dateStr}T${isEnd ? '23:59:59.999' : '00:00:00'}`);
      date.setHours(date.getHours() - offsetHours);
      return date;
    };

    const getDateInTimezone = (utcDate, tz) => {
      return utcDate.toLocaleDateString('en-CA', { timeZone: tz });
    };

    const getHourInTimezone = (utcDate, tz) => {
      return parseInt(utcDate.toLocaleString('en-US', { timeZone: tz, hour: 'numeric', hour12: false }));
    };

    // Convert dates to UTC bounds
    const startUTC = getUTCBoundsForDate(startDate, timeZone, false);
    const endUTC = getUTCBoundsForDate(endDate, timeZone, true);

    // Fetch completed orders with financial fields for settlement
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_date: {
          [Op.gte]: startUTC,
          [Op.lte]: endUTC
        },
        status: 'completed',
        [Op.or]: [
          { is_deleted: false },
          { is_deleted: null }
        ]
      },
      attributes: [
        'id', 'order_date', 'total_amount', 'order_items', 'order_type',
        'payment_method', 'card_type', 'source', 'amount_paid',
        'subtotal', 'tax', 'tax_rate', 'service_charge', 'service_charge_rate',
        'discount', 'discount_policy_amount', 'coupon_discount', 'point_discount',
        'takeaway_charge', 'delivery_fee'
      ]
    });

    // Fetch all order_payments for these orders — split bill row 별 method 정확 집계.
    // 한 order 에 여러 payment row (다른 method) 가 있을 수 있어서 group by 가 order 가 아니라 payment row.
    const OrderPayment = require('../models/OrderPayment');
    const orderIds = orders.map(o => o.id);
    const paymentsByOrderId = new Map();
    if (orderIds.length > 0) {
      const payments = await OrderPayment.findAll({
        where: { order_id: { [Op.in]: orderIds } },
        attributes: ['order_id', 'payment_method', 'card_type', 'amount']
      });
      payments.forEach(p => {
        if (!paymentsByOrderId.has(p.order_id)) paymentsByOrderId.set(p.order_id, []);
        paymentsByOrderId.get(p.order_id).push({
          method: p.payment_method,
          card_type: p.card_type,
          amount: Number(p.amount) || 0
        });
      });
    }

    // Fetch cancelled orders (separate query for settlement tracking)
    const cancelledOrders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_date: { [Op.gte]: startUTC, [Op.lte]: endUTC },
        status: 'cancelled',
        [Op.or]: [{ is_deleted: false }, { is_deleted: null }]
      },
      attributes: ['id', 'total_amount']
    });

    // Fetch outstanding orders
    const outstandingOrders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_date: { [Op.gte]: startUTC, [Op.lte]: endUTC },
        status: 'outstanding',
        [Op.or]: [{ is_deleted: false }, { is_deleted: null }]
      },
      attributes: ['id', 'total_amount']
    });

    // 아이템 void 요약(손실방지 — 마감 리포트용). OrderAction item_removed 중 실제 void(삭제 경로:
    // metadata.removed_item 존재)만. 편집으로 수량만 준 건(previous_item_count) 제외. billed = void 시점
    // 결제완료(결제 후 취소) = 사장 감시 red flag. void 이벤트 시각(created_at) 기준 집계.
    let voidedCount = 0, voidedAmount = 0, voidedBilledCount = 0, voidedBilledAmount = 0;
    try {
      const OrderAction = require('../models/OrderAction');
      const voidActions = await OrderAction.findAll({
        where: {
          restaurant_id: restaurantId,
          action_type: 'item_removed',
          created_at: { [Op.gte]: startUTC, [Op.lte]: endUTC }
        },
        attributes: ['metadata']
      });
      voidActions.forEach(a => {
        const m = a.metadata || {};
        if (!m.removed_item) return; // 실제 void 만(편집 감소 제외)
        const amt = Number(m.amount) || 0;
        voidedCount += 1; voidedAmount += amt;
        if (m.payment_status === 'completed') { voidedBilledCount += 1; voidedBilledAmount += amt; }
      });
    } catch (e) { /* non-fatal — void 요약은 optional */ }

    // Build product ID → category name mapping for order_items that lack category
    const products = await Product.findAll({
      where: { restaurant_id: restaurantId },
      attributes: ['id', 'name', 'category']
    });
    const categories = await Category.findAll({
      where: { restaurant_id: restaurantId },
      attributes: ['id', 'name']
    });
    const categoryIdToName = {};
    categories.forEach(c => { categoryIdToName[c.id] = c.name; });
    const productCategoryMap = {};
    products.forEach(p => {
      // product.category can be a category ID (number string) or category name
      const catVal = p.category;
      if (catVal && categoryIdToName[catVal]) {
        productCategoryMap[p.id] = categoryIdToName[catVal];
      } else if (catVal) {
        productCategoryMap[p.id] = catVal;
      }
      // Also map by product name for fallback
      if (!productCategoryMap[`name:${p.name}`] && (catVal && categoryIdToName[catVal])) {
        productCategoryMap[`name:${p.name}`] = categoryIdToName[catVal];
      } else if (!productCategoryMap[`name:${p.name}`] && catVal) {
        productCategoryMap[`name:${p.name}`] = catVal;
      }
    });

    // Initialize aggregation containers
    const dailySales = {};
    const hourlySales = {};
    const categorySales = {};
    const menuSales = {};
    const orderTypeSales = {};
    const paymentMethodSales = {};
    const cardTypeSales = {};

    let totalRevenue = 0;
    let totalOrders = 0;
    let staffMealRevenue = 0;
    let staffMealOrders = 0;

    // Settlement financial totals
    let grossSales = 0;
    let totalDiscount = 0;
    let totalCouponDiscount = 0;
    let totalPointDiscount = 0;
    let totalTakeawayCharge = 0;
    let totalDeliveryFee = 0;
    let totalServiceCharge = 0;
    let totalTax = 0;
    const sourceSales = {};

    // Process each order
    orders.forEach(order => {
      const orderAmount = parseFloat(order.total_amount || 0);
      const isStaffMeal = order.payment_method === 'staffMeal';

      // Staff meal: track separately, exclude from revenue
      if (isStaffMeal) {
        staffMealRevenue += orderAmount;
        staffMealOrders += 1;
        return; // Skip rest of aggregation
      }

      totalRevenue += orderAmount;
      totalOrders += 1;

      // Settlement financial aggregation
      // If subtotal field has a value, use it. Otherwise derive from total_amount minus known additions.
      const subtotal = order.subtotal !== null && order.subtotal !== undefined ? parseFloat(order.subtotal) : null;
      if (subtotal !== null) {
        grossSales += subtotal;
      } else {
        // Fallback: total_amount = subtotal - discounts + charges + tax + svc
        // So subtotal ≈ total - tax - svc - takeaway - delivery + discounts
        grossSales += orderAmount
          - parseFloat(order.tax || 0)
          - parseFloat(order.service_charge || 0)
          - parseFloat(order.takeaway_charge || 0)
          - parseFloat(order.delivery_fee || 0)
          + parseFloat(order.discount || 0)
          + parseFloat(order.coupon_discount || 0)
          + parseFloat(order.point_discount || 0);
      }
      totalDiscount += parseFloat(order.discount || 0);
      totalCouponDiscount += parseFloat(order.coupon_discount || 0);
      totalPointDiscount += parseFloat(order.point_discount || 0);
      totalTakeawayCharge += parseFloat(order.takeaway_charge || 0);
      totalDeliveryFee += parseFloat(order.delivery_fee || 0);
      totalServiceCharge += parseFloat(order.service_charge || 0);
      totalTax += parseFloat(order.tax || 0);

      // Source aggregation (pos / mobile)
      const source = order.source || 'pos';
      if (!sourceSales[source]) {
        sourceSales[source] = { revenue: 0, orders: 0 };
      }
      sourceSales[source].revenue += orderAmount;
      sourceSales[source].orders += 1;

      // Daily aggregation
      const dateKey = getDateInTimezone(new Date(order.order_date), timeZone);
      if (!dailySales[dateKey]) {
        dailySales[dateKey] = { revenue: 0, orders: 0 };
      }
      dailySales[dateKey].revenue += orderAmount;
      dailySales[dateKey].orders += 1;

      // Hourly aggregation
      const hour = getHourInTimezone(new Date(order.order_date), timeZone);
      if (!hourlySales[hour]) {
        hourlySales[hour] = { revenue: 0, orders: 0 };
      }
      hourlySales[hour].revenue += orderAmount;
      hourlySales[hour].orders += 1;

      // Order type aggregation
      const orderType = order.order_type || 'unknown';
      if (!orderTypeSales[orderType]) {
        orderTypeSales[orderType] = { revenue: 0, orders: 0 };
      }
      orderTypeSales[orderType].revenue += orderAmount;
      orderTypeSales[orderType].orders += 1;

      // Payment method aggregation — split bill 정확 반영.
      // order_payments 에 row 가 있으면 row 별 method × amount 로 집계 (한 주문에 여러 method 가능).
      // 없으면 order.payment_method 기반 (구 데이터 / 단일 결제 fallback).
      const paymentRows = paymentsByOrderId.get(order.id) || [];
      const aggregateMethodSale = (method, amount, cardType) => {
        let pm = method || 'unknown';
        if (pm === 'bank_transfer') pm = 'bankTransfer';
        if (!paymentMethodSales[pm]) paymentMethodSales[pm] = { revenue: 0, orders: 0 };
        paymentMethodSales[pm].revenue += amount;
        // orders 카운트는 row 가 아닌 order 단위. 첫 row 에서만 +1 (아래 별도 처리).
        if (pm === 'card') {
          const ct = cardType || 'unspecified';
          if (!cardTypeSales[ct]) cardTypeSales[ct] = { revenue: 0, orders: 0 };
          cardTypeSales[ct].revenue += amount;
        }
      };

      if (paymentRows.length > 0) {
        // Split bill / 명시 결제 row → row 별 amount 로 분배
        paymentRows.forEach(p => aggregateMethodSale(p.method, p.amount, p.card_type));
        // orders 카운트: 첫 row 의 method 에 +1 (split 주문도 1건)
        const headlinePm = (paymentRows[0].method === 'bank_transfer') ? 'bankTransfer' : (paymentRows[0].method || 'unknown');
        if (paymentMethodSales[headlinePm]) paymentMethodSales[headlinePm].orders += 1;
        if (paymentRows[0].method === 'card') {
          const ct = paymentRows[0].card_type || 'unspecified';
          if (cardTypeSales[ct]) cardTypeSales[ct].orders += 1;
        }
      } else {
        // Fallback — order.payment_method (단일 결제 또는 옛 주문)
        aggregateMethodSale(order.payment_method, orderAmount, order.card_type);
        let pm = order.payment_method || 'unknown';
        if (pm === 'bank_transfer') pm = 'bankTransfer';
        if (paymentMethodSales[pm]) paymentMethodSales[pm].orders += 1;
        if (pm === 'card') {
          const ct = order.card_type || 'unspecified';
          if (cardTypeSales[ct]) cardTypeSales[ct].orders += 1;
        }
      }

      // Category and menu item aggregation
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach(item => {
          // Resolve category: item.category > product lookup by menuItem.id > product lookup by name > 'Uncategorized'
          const productId = item.menuItem?.id || item.productId || item.id;
          const itemName = item.name || 'Unknown';
          const category = item.category
            || (productId && productCategoryMap[productId])
            || productCategoryMap[`name:${itemName}`]
            || 'Uncategorized';
          const quantity = parseInt(item.quantity) || 1;
          const itemRevenue = (parseFloat(item.price) || 0) * quantity;

          // Category sales
          if (!categorySales[category]) {
            categorySales[category] = { revenue: 0, quantity: 0, orders: 0 };
          }
          categorySales[category].revenue += itemRevenue;
          categorySales[category].quantity += quantity;
          categorySales[category].orders += 1;

          // Menu item sales
          const menuKey = `${category}|${itemName}`;
          if (!menuSales[menuKey]) {
            menuSales[menuKey] = {
              name: itemName,
              category: category,
              revenue: 0,
              quantity: 0,
              orders: 0
            };
          }
          menuSales[menuKey].revenue += itemRevenue;
          menuSales[menuKey].quantity += quantity;
          menuSales[menuKey].orders += 1;

          // 세트 구성품 통합 집계(SET_MENU_REDESIGN §3): 구성품 판매수에 세트 내장분 포함.
          // 매출은 구성품 upcharge 만 가산(세트 기본가는 위 세트 라인에 이미 계상 → 중복 방지).
          if (Array.isArray(item.set_components)) {
            item.set_components.forEach(c => {
              const cName = c.name || 'Component';
              const cCat = productCategoryMap[`name:${cName}`] || category;
              const cQty = (parseInt(c.qty) || 1) * quantity;
              const cRev = (parseFloat(c.upcharge) || 0) * quantity;
              const ck = `${cCat}|${cName}`;
              if (!menuSales[ck]) menuSales[ck] = { name: cName, category: cCat, revenue: 0, quantity: 0, orders: 0 };
              menuSales[ck].quantity += cQty;
              menuSales[ck].revenue += cRev;
            });
          }
        });
      }
    });

    // Convert dailySales object to sorted array
    const dailySalesArray = Object.entries(dailySales)
      .map(([date, data]) => ({ date, ...data }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Convert hourlySales to array (0-23 hours)
    const hourlySalesArray = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      revenue: hourlySales[hour]?.revenue || 0,
      orders: hourlySales[hour]?.orders || 0
    }));

    // Convert categorySales to sorted array (by revenue descending)
    const categorySalesArray = Object.entries(categorySales)
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.revenue - a.revenue);

    // Convert menuSales to sorted array (by revenue descending)
    const menuSalesArray = Object.values(menuSales)
      .sort((a, b) => b.revenue - a.revenue);

    // Convert orderTypeSales to array
    const orderTypeSalesArray = Object.entries(orderTypeSales)
      .map(([type, data]) => ({ type, ...data }))
      .sort((a, b) => b.revenue - a.revenue);

    // Convert paymentMethodSales to array
    const paymentMethodSalesArray = Object.entries(paymentMethodSales)
      .map(([method, data]) => ({ method, ...data }))
      .sort((a, b) => b.revenue - a.revenue);

    // Convert cardTypeSales to array
    const cardTypeSalesArray = Object.entries(cardTypeSales)
      .map(([type, data]) => ({ type, ...data }))
      .sort((a, b) => b.revenue - a.revenue);

    // Convert sourceSales to array
    const sourceSalesArray = Object.entries(sourceSales)
      .map(([source, data]) => ({ source, ...data }))
      .sort((a, b) => b.revenue - a.revenue);

    // Cancelled / Outstanding aggregation
    const cancelledCount = cancelledOrders.length;
    const cancelledAmount = cancelledOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);
    const outstandingCount = outstandingOrders.length;
    const outstandingAmount = outstandingOrders.reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0);

    res.json({
      success: true,
      data: {
        summary: {
          totalRevenue,
          totalOrders,
          averageOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
          startDate,
          endDate
        },
        // Settlement financial breakdown
        settlement: {
          grossSales,
          totalDiscount,
          totalCouponDiscount,
          totalPointDiscount,
          totalTakeawayCharge,
          totalDeliveryFee,
          totalServiceCharge,
          totalTax,
          netSales: totalRevenue,
          cancelledOrders: cancelledCount,
          cancelledAmount,
          outstandingOrders: outstandingCount,
          outstandingAmount,
          // 아이템 void 요약(손실방지). billed = 결제 후 취소(red flag).
          voidedItems: voidedCount,
          voidedAmount,
          voidedBilledItems: voidedBilledCount,
          voidedBilledAmount
        },
        dailySales: dailySalesArray,
        hourlySales: hourlySalesArray,
        categorySales: categorySalesArray,
        menuSales: menuSalesArray,
        orderTypeSales: orderTypeSalesArray,
        paymentMethodSales: paymentMethodSalesArray,
        cardTypeSales: cardTypeSalesArray,
        sourceSales: sourceSalesArray,
        staffMeal: {
          revenue: staffMealRevenue,
          orders: staffMealOrders
        }
      }
    });
  } catch (error) {
    console.error('Error fetching reports summary:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;