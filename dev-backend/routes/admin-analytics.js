const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { Op } = require('sequelize');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const User = require('../models/User');
const PlanTemplate = require('../models/PlanTemplate');
const { authenticateToken } = require('../middleware/auth');
const { getPeriodBounds, getSiteTimezone } = require('../utils/dateTimeHelper');

// Heavy compute (sales-trend, regional-stats etc.) — limit per IP to protect DB.
// Tighter than apiLimiter (1000/15min global). 30/min ≈ tab refresh + manual queries.
const heavyAnalyticsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1min
  max: 30,
  message: { success: false, message: 'Too many analytics requests. Slow down.' },
  standardHeaders: true,
  legacyHeaders: false
});

router.use(heavyAnalyticsLimiter);

// What and Why: 모든 admin-analytics API에 인증 필수
// - 민감한 비즈니스 데이터 보호 (매출, 주문, 구독 통계)
// - System Admin, Brand General, Foodcourt General만 접근 가능
const requireManagerRole = (req, res, next) => {
  const allowedRoles = ['System Admin', 'Brand General', 'Foodcourt General', 'Brand Manager', 'Foodcourt Manager'];
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, error: { message: 'Access denied', code: 'FORBIDDEN' } });
  }
  next();
};

// Cache demo restaurant IDs for System Admin filtering
router.use(authenticateToken, async (req, res, next) => {
  if (req.user.role === 'System Admin') {
    try {
      const demoRestaurants = await Restaurant.findAll({
        where: { is_demo: true },
        attributes: ['id'],
        raw: true
      });
      req.demoRestaurantIds = demoRestaurants.map(r => r.id);
    } catch (e) {
      req.demoRestaurantIds = [];
    }
  } else {
    req.demoRestaurantIds = [];
  }
  next();
});

// 시스템 전체 통계 API
router.get('/system-stats', authenticateToken, requireManagerRole, async (req, res) => {
  try {
    const { period = 'month', restaurantId, restaurant_id, manager_id } = req.query;
    // Support both camelCase (new) and snake_case (legacy)
    const finalRestaurantId = restaurantId || restaurant_id;

    // 날짜 범위 계산 (사이트 타임존 기준)
    const tz = await getSiteTimezone();
    const { startDate, endDate } = getPeriodBounds(period, tz);

    // Demo filter for System Admin
    const demoFilter = req.demoRestaurantIds.length > 0
      ? { restaurant_id: { [Op.notIn]: req.demoRestaurantIds } } : {};

    // 필터 조건 구성
    const whereConditions = {
      order_date: {
        [Op.between]: [startDate, endDate]
      },
      ...demoFilter
    };

    if (restaurant_id && restaurant_id !== 'all') {
      whereConditions.restaurant_id = restaurant_id;
    }

    // 매니저 필터가 있을 경우 해당 매니저의 레스토랑들만 포함
    if (manager_id && manager_id !== 'all') {
      const managerRestaurants = await Restaurant.findAll({
        where: { admin_id: manager_id },
        attributes: ['id']
      });
      const restaurantIds = managerRestaurants.map(r => r.id);
      whereConditions.restaurant_id = restaurantIds;
    }

    // 총 매출 및 주문 수
    const orders = await Order.findAll({
      where: whereConditions,
      attributes: ['total_amount', 'order_date']
    });

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);
    const totalOrders = orders.length;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // 전체 레스토랑 수 (exclude demo)
    const restaurantWhere = { is_demo: false };
    if (manager_id && manager_id !== 'all') {
      restaurantWhere.admin_id = manager_id;
    }

    const activeRestaurants = await Restaurant.count({
      where: {
        ...restaurantWhere,
        status: 'active'
      }
    });

    // 이전 기간과 비교를 위한 데이터
    const prevPeriodStart = new Date(startDate.getTime() - (endDate.getTime() - startDate.getTime()));
    const prevOrders = await Order.findAll({
      where: {
        ...whereConditions,
        order_date: {
          [Op.between]: [prevPeriodStart, startDate]
        }
      },
      attributes: ['total_amount']
    });

    const prevRevenue = prevOrders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);
    const revenueGrowth = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue * 100) : 0;

    const prevOrderCount = prevOrders.length;
    const orderGrowth = prevOrderCount > 0 ? ((totalOrders - prevOrderCount) / prevOrderCount * 100) : 0;

    const prevAvgOrderValue = prevOrderCount > 0 ? prevRevenue / prevOrderCount : 0;
    const avgOrderGrowth = prevAvgOrderValue > 0 ? ((avgOrderValue - prevAvgOrderValue) / prevAvgOrderValue * 100) : 0;

    res.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        avgOrderValue,
        activeRestaurants,
        growth: {
          revenue: revenueGrowth,
          orders: orderGrowth,
          avgOrderValue: avgOrderGrowth
        }
      }
    });

  } catch (error) {
    console.error('Error fetching system stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system statistics',
      details: error.message
    });
  }
});

// 매출 트렌드 데이터 API
router.get('/sales-trend', authenticateToken, requireManagerRole, async (req, res) => {
  try {
    const { period = 'month', restaurantId, restaurant_id, manager_id } = req.query;
    // Support both camelCase (new) and snake_case (legacy)
    const finalRestaurantId = restaurantId || restaurant_id;

    const tz = await getSiteTimezone();
    const { startDate, endDate } = getPeriodBounds(period, tz);
    let groupBy = '';
    let dateFormat = '';

    switch (period) {
      case 'today':
        groupBy = 'HOUR(order_date)';
        dateFormat = 'CONCAT(HOUR(order_date), "AM")';
        break;
      case 'week':
        groupBy = 'DAYNAME(order_date)';
        dateFormat = 'DAYNAME(order_date)';
        break;
      case 'year':
        groupBy = 'MONTH(order_date)';
        dateFormat = 'MONTHNAME(order_date)';
        break;
      case 'month':
      default:
        groupBy = 'DAY(order_date)';
        dateFormat = 'DAY(order_date)';
        break;
    }

    // Demo filter for System Admin
    const demoFilterSales = req.demoRestaurantIds.length > 0
      ? { restaurant_id: { [Op.notIn]: req.demoRestaurantIds } } : {};

    const whereConditions = {
      order_date: {
        [Op.between]: [startDate, endDate]
      },
      ...demoFilterSales
    };

    if (finalRestaurantId && finalRestaurantId !== 'all') {
      whereConditions.restaurant_id = finalRestaurantId;
    }

    if (manager_id && manager_id !== 'all') {
      const managerRestaurants = await Restaurant.findAll({
        where: { admin_id: manager_id },
        attributes: ['id']
      });
      const restaurantIds = managerRestaurants.map(r => r.id);
      whereConditions.restaurant_id = restaurantIds;
    }

    const trendData = await Order.findAll({
      where: whereConditions,
      attributes: [
        [require('sequelize').fn('SUM', require('sequelize').col('total_amount')), 'sales'],
        [require('sequelize').fn('COUNT', require('sequelize').col('*')), 'orders'],
        [require('sequelize').literal(dateFormat), 'date']
      ],
      group: [require('sequelize').literal(groupBy)],
      order: [require('sequelize').literal(groupBy)]
    });

    res.json({
      success: true,
      data: trendData.map(item => ({
        date: item.dataValues.date,
        sales: parseFloat(item.dataValues.sales || 0),
        orders: parseInt(item.dataValues.orders || 0)
      }))
    });

  } catch (error) {
    console.error('Error fetching sales trend:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch sales trend',
      details: error.message
    });
  }
});

// 구독 통계 API
router.get('/subscription-stats', authenticateToken, requireManagerRole, async (req, res) => {
  try {
    const subscriptionStats = await Restaurant.findAll({
      attributes: [
        'plan_type',
        [require('sequelize').fn('COUNT', require('sequelize').col('*')), 'count'],
        [require('sequelize').fn('SUM', require('sequelize').col('plan_amount')), 'revenue']
      ],
      where: {
        status: 'active',
        is_demo: false
      },
      group: ['plan_type']
    });

    const totalSubscriptions = await Restaurant.count({
      where: { status: 'active', is_demo: false }
    });

    const planDistribution = subscriptionStats.map(stat => ({
      name: stat.plan_type,
      subscriptions: parseInt(stat.dataValues.count),
      revenue: parseFloat(stat.dataValues.revenue || 0),
      percentage: Math.round((parseInt(stat.dataValues.count) / totalSubscriptions) * 100)
    }));

    res.json({
      success: true,
      data: {
        totalSubscriptions,
        planDistribution
      }
    });

  } catch (error) {
    console.error('Error fetching subscription stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription statistics',
      details: error.message
    });
  }
});

// 매니저 목록 API
router.get('/managers', authenticateToken, requireManagerRole, async (req, res) => {
  try {
    console.log('🔍 Fetching managers from database...');
    const managers = await User.findAll({
      where: {
        role: {
          [Op.in]: ['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']
        }
      },
      attributes: ['id', 'full_name', 'email', 'role'],
      order: [['full_name', 'ASC']]
    });

    console.log('👥 Found managers:', managers.length);
    console.log('📋 Managers data:', managers.map(m => ({ id: m.id, full_name: m.full_name, email: m.email, role: m.role })));

    res.json({
      success: true,
      data: managers
    });

  } catch (error) {
    console.error('✗ Error fetching managers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch managers',
      details: error.message
    });
  }
});

// 지역별 레스토랑 통계 API
router.get('/regional-stats', authenticateToken, requireManagerRole, async (req, res) => {
  try {
    const { period = 'month', manager_id } = req.query;

    const tz = await getSiteTimezone();
    const { startDate, endDate } = getPeriodBounds(period, tz);

    const restaurantWhere = { is_demo: false };
    if (manager_id && manager_id !== 'all') {
      restaurantWhere.admin_id = manager_id;
    }

    // 지역별 데이터 추출 (주소에서 첫 번째 단어를 지역으로 사용)
    const regionalFor = (from, to) => Restaurant.findAll({
      where: restaurantWhere,
      attributes: [
        [require('sequelize').fn('SUBSTRING_INDEX', require('sequelize').col('address'), ' ', 1), 'region'],
        [require('sequelize').fn('COUNT', require('sequelize').col('Restaurant.id')), 'restaurants']
      ],
      include: [{
        model: Order,
        as: 'orders',
        attributes: [
          [require('sequelize').fn('SUM', require('sequelize').col('orders.total_amount')), 'revenue'],
          [require('sequelize').fn('COUNT', require('sequelize').col('orders.id')), 'orders']
        ],
        where: {
          order_date: {
            [Op.between]: [from, to]
          }
        },
        required: false
      }],
      group: [require('sequelize').literal('region')],
      raw: true
    });

    // 성장률은 **직전 같은 길이의 기간**과 비교한다. 2026-09-08 이전에는 이 자리가
    // Math.random() 이었다 — 새로고침할 때마다 값이 바뀌는 가짜 숫자였다.
    // 기준은 위 /system-stats 의 전기간 비교와 같은 식이다(같은 길이만큼 뒤로).
    const prevPeriodStart = new Date(startDate.getTime() - (endDate.getTime() - startDate.getTime()));
    const [regionalData, prevRegionalData] = await Promise.all([
      regionalFor(startDate, endDate),
      regionalFor(prevPeriodStart, startDate)
    ]);

    const prevRevenueByRegion = new Map(
      prevRegionalData.map(item => [item.region || 'Unknown', parseFloat(item['orders.revenue'] || 0)])
    );

    const processedData = regionalData.map(item => {
      const region = item.region || 'Unknown';
      const revenue = parseFloat(item['orders.revenue'] || 0);
      const prevRevenue = prevRevenueByRegion.get(region) || 0;
      // 이전 기간 매출이 0이면 비율을 낼 수 없다. 이번 기간에 매출이 생겼으면 +100%,
      // 둘 다 0이면 0% — 브랜드 성과 화면(BrandPerformance)과 같은 규칙을 쓴다.
      const growth = prevRevenue > 0
        ? ((revenue - prevRevenue) / prevRevenue) * 100
        : (revenue > 0 ? 100 : 0);
      return {
        region,
        restaurants: parseInt(item.restaurants),
        revenue,
        orders: parseInt(item['orders.orders'] || 0),
        growth: Math.round(growth * 10) / 10
      };
    });

    res.json({
      success: true,
      data: processedData
    });

  } catch (error) {
    console.error('Error fetching regional stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch regional statistics',
      details: error.message
    });
  }
});

module.exports = router;