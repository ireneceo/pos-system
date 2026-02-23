const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Invoice = require('../models/Invoice');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');

// Get restaurant-specific dashboard statistics - REMOVED DUPLICATE
// This route is duplicated at line 437 with more complete restaurant info
// Keeping only the comprehensive version below

// Get dashboard statistics (legacy - no restaurant filter)
router.get('/stats', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Today's stats
    const todayOrders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow
        }
      }
    });
    
    const todayRevenue = todayOrders.reduce((sum, order) => {
      if (order.status === 'completed') {
        return sum + parseFloat(order.total_amount);
      }
      return sum;
    }, 0);
    
    const todayOrderCount = todayOrders.length;
    const completedTodayCount = todayOrders.filter(o => o.status === 'completed').length;
    const pendingOrdersCount = todayOrders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
    
    // This week's stats
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);
    
    const weekOrders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: weekStart
        },
        status: 'completed'
      }
    });
    
    const weekRevenue = weekOrders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
    
    // Product stats
    const totalProducts = await Product.count();
    const totalUsers = await User.count();
    
    // Popular products (from completed orders)
    const completedOrders = await Order.findAll({
      where: { status: 'completed' },
      limit: 100
    });
    
    const productCounts = {};
    completedOrders.forEach(order => {
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach(item => {
          if (productCounts[item.name]) {
            productCounts[item.name] += item.quantity;
          } else {
            productCounts[item.name] = item.quantity;
          }
        });
      }
    });
    
    const popularProducts = Object.entries(productCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, orderCount: count }));
    
    res.json({
      success: true,
      data: {
        today: {
          revenue: todayRevenue,
          orders: todayOrderCount,
          completedOrders: completedTodayCount,
          pendingOrders: pendingOrdersCount
        },
        week: {
          revenue: weekRevenue,
          orders: weekOrders.length
        },
        totals: {
          products: totalProducts,
          users: totalUsers
        },
        popularProducts
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get sales data for charts (Optimized - single query instead of N+1)
router.get('/sales-chart', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const daysCount = parseInt(days);

    // Calculate date range
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysCount + 1);
    startDate.setHours(0, 0, 0, 0);

    // Single query to get all orders in the range
    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        status: 'completed'
      },
      attributes: ['createdAt', 'total_amount']
    });

    // Group by date in memory
    const ordersByDate = {};
    orders.forEach(order => {
      const dateKey = order.createdAt.toISOString().split('T')[0];
      if (!ordersByDate[dateKey]) {
        ordersByDate[dateKey] = { revenue: 0, orders: 0 };
      }
      ordersByDate[dateKey].revenue += parseFloat(order.total_amount);
      ordersByDate[dateKey].orders += 1;
    });

    // Build result for all days (including days with no orders)
    const salesData = [];
    for (let i = daysCount - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];

      salesData.push({
        date: dateKey,
        revenue: ordersByDate[dateKey]?.revenue || 0,
        orders: ordersByDate[dateKey]?.orders || 0
      });
    }

    res.json({
      success: true,
      data: salesData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get recent orders for dashboard
router.get('/recent-orders', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });
    
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get order status distribution
router.get('/order-status', async (req, res) => {
  try {
    const statusCounts = await Order.findAll({
      attributes: [
        'status',
        [require('sequelize').fn('COUNT', require('sequelize').col('status')), 'count']
      ],
      group: ['status']
    });
    
    const statusData = statusCounts.map(item => ({
      status: item.status,
      count: parseInt(item.get('count'))
    }));
    
    res.json({ success: true, data: statusData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get admin dashboard statistics
router.get('/admin/stats', async (req, res) => {
  try {
    // Get total managers
    const totalManagers = await User.count({
      where: { role: ['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'] }
    });
    
    // Get total restaurants
    const totalRestaurants = await Restaurant.count();
    
    // Get active restaurants
    const activeRestaurants = await Restaurant.count({
      where: { status: 'active' }
    });
    
    // Get total invoices
    const totalInvoices = await Invoice.count();
    
    // Get paid invoices this month
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const paidInvoicesThisMonth = await Invoice.count({
      where: {
        status: 'paid',
        paid_at: {
          [Op.gte]: thisMonth
        }
      }
    });
    
    // Calculate total revenue (paid invoices)
    const paidInvoices = await Invoice.findAll({
      where: { status: 'paid' },
      attributes: ['total_amount']
    });
    
    const totalRevenue = paidInvoices.reduce((sum, invoice) => {
      return sum + parseFloat(invoice.total_amount);
    }, 0);
    
    // Get revenue this month
    const revenueThisMonth = await Invoice.sum('total_amount', {
      where: {
        status: 'paid',
        paid_at: {
          [Op.gte]: thisMonth
        }
      }
    }) || 0;
    
    // Get overdue invoices
    const overdueInvoices = await Invoice.count({
      where: { status: 'overdue' }
    });
    
    // Get managers with subscription counts
    const managersWithStats = await User.findAll({
      where: { role: ['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager'] },
      include: [{
        model: Restaurant,
        as: 'managedRestaurants',
        attributes: ['id', 'status', 'plan_type'],
        required: false
      }],
      attributes: ['id', 'username', 'email', 'full_name', 'createdAt']
    });

    const managers = managersWithStats.map(manager => {
      const restaurants = manager.managedRestaurants || [];
      const activeRestaurantCount = restaurants.filter(r => r.status === 'active').length;
      
      // Calculate total revenue for this manager's restaurants
      const managerRevenue = restaurants.reduce((sum, restaurant) => {
        const planAmounts = {
          'Basic Plan': 29,
          'Professional Plan': 99,
          'Enterprise Plan': 199
        };
        return sum + (planAmounts[restaurant.plan_type] || 0);
      }, 0);
      
      return {
        id: manager.id.toString(),
        companyName: manager.full_name || manager.username,
        email: manager.email,
        planType: restaurants.length > 3 ? 'enterprise' : restaurants.length > 1 ? 'professional' : 'basic',
        subscriptionStatus: activeRestaurantCount > 0 ? 'active' : 'expired',
        restaurantCount: restaurants.length,
        totalRevenue: managerRevenue * 12, // Annual revenue
        createdAt: manager.createdAt.toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0] // Mock data
      };
    });

    res.json({
      success: true,
      data: {
        totals: {
          managers: totalManagers,
          restaurants: totalRestaurants,
          activeRestaurants: activeRestaurants,
          invoices: totalInvoices,
          revenue: totalRevenue,
          overdueInvoices: overdueInvoices
        },
        thisMonth: {
          paidInvoices: paidInvoicesThisMonth,
          revenue: revenueThisMonth
        },
        managers: managers.slice(0, 10) // Limit to 10 for dashboard
      }
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

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
      return res.status(404).json({ success: false, error: 'Restaurant not found' });
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
    
    const unpaidInvoices = invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue');
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
      return res.status(404).json({ success: false, error: 'Restaurant not found' });
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

    // Use order_date instead of createdAt for consistency with stats
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        order_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        status: 'completed'
      },
      attributes: ['order_date', 'total_amount']
    });

    // Group orders by the appropriate time unit (using restaurant timezone)
    const salesData = [];

    if (period === 'week') {
      // Group by day
      const ordersByDate = {};
      orders.forEach(order => {
        const dateKey = getDateInTimezone(new Date(order.order_date), timeZone);
        if (!ordersByDate[dateKey]) {
          ordersByDate[dateKey] = { revenue: 0, orders: 0 };
        }
        ordersByDate[dateKey].revenue += parseFloat(order.total_amount);
        ordersByDate[dateKey].orders += 1;
      });

      // Generate last 7 days in timezone
      for (let i = 6; i >= 0; i--) {
        const dateObj = new Date(todayStr);
        dateObj.setDate(dateObj.getDate() - i);
        const dateKey = dateObj.toISOString().split('T')[0];
        salesData.push({
          date: dateKey,
          revenue: ordersByDate[dateKey]?.revenue || 0,
          orders: ordersByDate[dateKey]?.orders || 0
        });
      }
    } else if (period === 'month') {
      // Group by week
      const weekData = [{revenue: 0, orders: 0}, {revenue: 0, orders: 0}, {revenue: 0, orders: 0}, {revenue: 0, orders: 0}];
      const todayDate = new Date(todayStr);

      orders.forEach(order => {
        const orderDateStr = getDateInTimezone(new Date(order.order_date), timeZone);
        const orderDate = new Date(orderDateStr);
        const daysAgo = Math.floor((todayDate - orderDate) / (1000 * 60 * 60 * 24));
        const weekIndex = 3 - Math.floor(daysAgo / 7);
        if (weekIndex >= 0 && weekIndex < 4) {
          weekData[weekIndex].revenue += parseFloat(order.total_amount);
          weekData[weekIndex].orders += 1;
        }
      });

      for (let i = 0; i < 4; i++) {
        const weekStart = new Date(todayStr);
        weekStart.setDate(weekStart.getDate() - ((3 - i) * 7 + 6));
        salesData.push({
          date: weekStart.toISOString().split('T')[0],
          revenue: weekData[i].revenue,
          orders: weekData[i].orders
        });
      }
    } else if (period === 'year') {
      // Group by month
      const ordersByMonth = {};
      orders.forEach(order => {
        const dateStr = getDateInTimezone(new Date(order.order_date), timeZone);
        const monthKey = dateStr.slice(0, 7); // YYYY-MM
        if (!ordersByMonth[monthKey]) {
          ordersByMonth[monthKey] = { revenue: 0, orders: 0 };
        }
        ordersByMonth[monthKey].revenue += parseFloat(order.total_amount);
        ordersByMonth[monthKey].orders += 1;
      });

      for (let i = 11; i >= 0; i--) {
        const monthStart = new Date(todayStr);
        monthStart.setMonth(monthStart.getMonth() - i);
        monthStart.setDate(1);
        const monthKey = monthStart.toISOString().slice(0, 7);
        salesData.push({
          date: monthStart.toISOString().split('T')[0],
          revenue: ordersByMonth[monthKey]?.revenue || 0,
          orders: ordersByMonth[monthKey]?.orders || 0
        });
      }
    }

    res.json({
      success: true,
      data: salesData
    });
  } catch (error) {
    console.error('Error fetching restaurant sales chart:', error);
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
      return res.status(400).json({ success: false, error: 'startDate and endDate are required' });
    }

    // Get restaurant timezone
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: 'Restaurant not found' });
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

    // Fetch completed orders with necessary fields
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
      attributes: ['id', 'order_date', 'total_amount', 'order_items', 'order_type', 'payment_method']
    });

    // Initialize aggregation containers
    const dailySales = {};
    const hourlySales = {};
    const categorySales = {};
    const menuSales = {};
    const orderTypeSales = {};
    const paymentMethodSales = {};

    let totalRevenue = 0;
    let totalOrders = orders.length;

    // Process each order
    orders.forEach(order => {
      const orderAmount = parseFloat(order.total_amount || 0);
      totalRevenue += orderAmount;

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

      // Payment method aggregation
      const paymentMethod = order.payment_method || 'unknown';
      if (!paymentMethodSales[paymentMethod]) {
        paymentMethodSales[paymentMethod] = { revenue: 0, orders: 0 };
      }
      paymentMethodSales[paymentMethod].revenue += orderAmount;
      paymentMethodSales[paymentMethod].orders += 1;

      // Category and menu item aggregation
      if (order.order_items && Array.isArray(order.order_items)) {
        order.order_items.forEach(item => {
          const category = item.category || 'Uncategorized';
          const itemName = item.name || 'Unknown';
          const quantity = parseInt(item.quantity) || 1;
          const itemRevenue = parseFloat(item.price) * quantity;

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
        dailySales: dailySalesArray,
        hourlySales: hourlySalesArray,
        categorySales: categorySalesArray,
        menuSales: menuSalesArray,
        orderTypeSales: orderTypeSalesArray,
        paymentMethodSales: paymentMethodSalesArray
      }
    });
  } catch (error) {
    console.error('Error fetching reports summary:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;