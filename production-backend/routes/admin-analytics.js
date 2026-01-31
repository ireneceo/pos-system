const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Restaurant = require('../models/Restaurant');
const Order = require('../models/Order');
const User = require('../models/User');
const PlanTemplate = require('../models/PlanTemplate');
const { authenticateToken } = require('../middleware/auth');

// What and Why: 모든 admin-analytics API에 인증 필수
// - 민감한 비즈니스 데이터 보호 (매출, 주문, 구독 통계)
// - System Admin, Brand General, Foodcourt General만 접근 가능
const requireManagerRole = (req, res, next) => {
  const allowedRoles = ['System Admin', 'Brand General', 'Foodcourt General', 'Brand Manager', 'Foodcourt Manager'];
  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({ success: false, error: 'Access denied' });
  }
  next();
};

// 시스템 전체 통계 API
router.get('/system-stats', authenticateToken, requireManagerRole, async (req, res) => {
  try {
    const { period = 'month', restaurantId, restaurant_id, manager_id } = req.query;
    // Support both camelCase (new) and snake_case (legacy)
    const finalRestaurantId = restaurantId || restaurant_id;

    // 날짜 범위 계산
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // 필터 조건 구성
    const whereConditions = {
      order_date: {
        [Op.between]: [startDate, now]
      }
    };

    if (restaurant_id && restaurant_id !== 'all') {
      whereConditions.restaurant_id = restaurant_id;
    }

    // 매니저 필터가 있을 경우 해당 매니저의 레스토랑들만 포함
    if (manager_id && manager_id !== 'all') {
      const managerRestaurants = await Restaurant.findAll({
        where: { manager_id },
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

    // 전체 레스토랑 수
    const restaurantWhere = {};
    if (manager_id && manager_id !== 'all') {
      restaurantWhere.manager_id = manager_id;
    }

    const activeRestaurants = await Restaurant.count({
      where: {
        ...restaurantWhere,
        status: 'active'
      }
    });

    // 이전 기간과 비교를 위한 데이터
    const prevPeriodStart = new Date(startDate.getTime() - (now.getTime() - startDate.getTime()));
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

    const now = new Date();
    let startDate = new Date();
    let groupBy = '';
    let dateFormat = '';

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        groupBy = 'HOUR(order_date)';
        dateFormat = 'CONCAT(HOUR(order_date), "AM")';
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        groupBy = 'DAYNAME(order_date)';
        dateFormat = 'DAYNAME(order_date)';
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        groupBy = 'MONTH(order_date)';
        dateFormat = 'MONTHNAME(order_date)';
        break;
      case 'month':
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupBy = 'DAY(order_date)';
        dateFormat = 'DAY(order_date)';
        break;
    }

    const whereConditions = {
      order_date: {
        [Op.between]: [startDate, now]
      }
    };

    if (finalRestaurantId && finalRestaurantId !== 'all') {
      whereConditions.restaurant_id = finalRestaurantId;
    }

    if (manager_id && manager_id !== 'all') {
      const managerRestaurants = await Restaurant.findAll({
        where: { manager_id },
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
        status: 'active'
      },
      group: ['plan_type']
    });

    const totalSubscriptions = await Restaurant.count({
      where: { status: 'active' }
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
    const managers = await User.findAll({
      where: {
        role: {
          [Op.in]: ['Foodcourt General', 'Brand General', 'Foodcourt Manager', 'Brand Manager']
        }
      },
      attributes: ['id', 'full_name', 'email', 'role'],
      order: [['full_name', 'ASC']]
    });


    res.json({
      success: true,
      data: managers
    });

  } catch (error) {
    console.error('❌ Error fetching managers:', error);
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

    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
    }

    const restaurantWhere = {};
    if (manager_id && manager_id !== 'all') {
      restaurantWhere.manager_id = manager_id;
    }

    // 지역별 데이터 추출 (주소에서 첫 번째 단어를 지역으로 사용)
    const regionalData = await Restaurant.findAll({
      where: restaurantWhere,
      attributes: [
        [require('sequelize').fn('SUBSTRING_INDEX', require('sequelize').col('address'), ' ', 1), 'region'],
        [require('sequelize').fn('COUNT', require('sequelize').col('Restaurant.id')), 'restaurants']
      ],
      include: [{
        model: Order,
        attributes: [
          [require('sequelize').fn('SUM', require('sequelize').col('Orders.total_amount')), 'revenue'],
          [require('sequelize').fn('COUNT', require('sequelize').col('Orders.id')), 'orders']
        ],
        where: {
          order_date: {
            [Op.between]: [startDate, now]
          }
        },
        required: false
      }],
      group: [require('sequelize').literal('region')],
      raw: true
    });

    const processedData = regionalData.map(item => ({
      region: item.region || 'Unknown',
      restaurants: parseInt(item.restaurants),
      revenue: parseFloat(item['Orders.revenue'] || 0),
      orders: parseInt(item['Orders.orders'] || 0),
      growth: Math.round((Math.random() * 20) - 5) // 임시 성장률 (실제로는 이전 기간과 비교 필요)
    }));

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