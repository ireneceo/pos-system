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
    
    // This month's stats
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    const monthlyOrders = orders.filter(order => {
      const orderDate = new Date(order.order_date);
      return orderDate >= thisMonth;
    });
    
    const monthlyRevenue = monthlyOrders
      .filter(order => order.status === 'completed')
      .reduce((sum, order) => sum + parseFloat(order.total_amount), 0);

    // This year's stats
    const thisYear = new Date();
    thisYear.setMonth(0); // January
    thisYear.setDate(1);
    thisYear.setHours(0, 0, 0, 0);

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
          status: restaurant.status
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
router.get('/restaurant/:restaurantId/sales-chart', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { period = 'week' } = req.query; // week, month, year

    // Calculate date range based on period
    let startDate, endDate;
    const now = new Date();

    if (period === 'week') {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'month') {
      startDate = new Date(now);
      startDate.setDate(startDate.getDate() - 27); // 4 weeks
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);
    } else if (period === 'year') {
      startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 11);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);
    }

    // Single query to get all orders in the range
    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        createdAt: {
          [Op.gte]: startDate,
          [Op.lte]: endDate
        },
        status: 'completed'
      },
      attributes: ['createdAt', 'total_amount']
    });

    // Group orders by the appropriate time unit
    const salesData = [];

    if (period === 'week') {
      // Group by day
      const ordersByDate = {};
      orders.forEach(order => {
        const dateKey = order.createdAt.toISOString().split('T')[0];
        if (!ordersByDate[dateKey]) {
          ordersByDate[dateKey] = { revenue: 0, orders: 0 };
        }
        ordersByDate[dateKey].revenue += parseFloat(order.total_amount);
        ordersByDate[dateKey].orders += 1;
      });

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        salesData.push({
          date: dateKey,
          revenue: ordersByDate[dateKey]?.revenue || 0,
          orders: ordersByDate[dateKey]?.orders || 0
        });
      }
    } else if (period === 'month') {
      // Group by week
      const weekData = [{revenue: 0, orders: 0}, {revenue: 0, orders: 0}, {revenue: 0, orders: 0}, {revenue: 0, orders: 0}];
      orders.forEach(order => {
        const daysAgo = Math.floor((now - order.createdAt) / (1000 * 60 * 60 * 24));
        const weekIndex = 3 - Math.floor(daysAgo / 7);
        if (weekIndex >= 0 && weekIndex < 4) {
          weekData[weekIndex].revenue += parseFloat(order.total_amount);
          weekData[weekIndex].orders += 1;
        }
      });

      for (let i = 0; i < 4; i++) {
        const weekStart = new Date();
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
        const monthKey = order.createdAt.toISOString().slice(0, 7); // YYYY-MM
        if (!ordersByMonth[monthKey]) {
          ordersByMonth[monthKey] = { revenue: 0, orders: 0 };
        }
        ordersByMonth[monthKey].revenue += parseFloat(order.total_amount);
        ordersByMonth[monthKey].orders += 1;
      });

      for (let i = 11; i >= 0; i--) {
        const monthStart = new Date();
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

module.exports = router;