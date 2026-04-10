// POS 관리자 전용 고객 라우트
// 마운트: /api/customers
// 보안: authenticateToken + checkRestaurantAccess (해당 라우트에 명시)

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Customer, RestaurantCustomer, Restaurant, Order } = require('../models');
const Coupon = require('../models/Coupon');
const { sequelize } = require('../config/database');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');

/**
 * GET /api/customers/phone/:phone
 * 전화번호로 고객 조회 (모든 레스토랑 관계 포함)
 */
router.get('/phone/:phone', authenticateToken, async (req, res) => {
  try {
    const { phone } = req.params;

    // 국가코드 유무 모두 매칭: +60110000000 ↔ 0110000000 ↔ 110000000
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    const variants = [cleaned];
    if (cleaned.startsWith('+')) {
      const withoutPlus = cleaned.slice(1);
      for (let i = 1; i <= 3; i++) {
        variants.push('0' + withoutPlus.slice(i));
        variants.push(withoutPlus.slice(i));
      }
      variants.push(withoutPlus);
    } else if (cleaned.startsWith('0')) {
      variants.push('+60' + cleaned.slice(1));
      variants.push('+82' + cleaned.slice(1));
      variants.push('+1' + cleaned.slice(1));
      variants.push(cleaned.slice(1));
    } else {
      variants.push('+' + cleaned);
      variants.push('+60' + cleaned);
      variants.push('0' + cleaned);
    }

    const customer = await Customer.findOne({
      where: { phone: { [Op.in]: [...new Set(variants)] } },
      attributes: ['id', 'phone', 'name', 'email', 'type'],
      include: [{
        model: Restaurant,
        as: 'restaurants',
        through: {
          model: RestaurantCustomer,
          attributes: ['points', 'total_orders', 'total_spent', 'loyalty_tier']
        },
        attributes: ['id', 'name']
      }]
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    res.json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error('Get customer by phone error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer'
    });
  }
});

/**
 * GET /api/customers/:restaurantId
 * 레스토랑의 고객 목록 조회 (쿠폰 사용 가능/사용 이력 포함)
 */
router.get('/:restaurantId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { search, tier, type } = req.query;

    const whereClause = {};
    if (search) {
      const digitsOnly = search.replace(/[^\d]/g, '');
      const phoneConditions = [
        { '$customer.phone$': { [Op.like]: `%${search}%` } }
      ];
      if (digitsOnly.length >= 6) {
        phoneConditions.push(
          sequelize.where(
            sequelize.fn('REPLACE', sequelize.fn('REPLACE', sequelize.fn('REPLACE', sequelize.col('customer.phone'), '+', ''), '-', ''), ' ', ''),
            { [Op.like]: `%${digitsOnly.slice(-8)}%` }
          )
        );
      }
      whereClause[Op.or] = [
        { '$customer.name$': { [Op.like]: `%${search}%` } },
        { '$customer.email$': { [Op.like]: `%${search}%` } },
        ...phoneConditions
      ];
    }
    if (tier) {
      whereClause.loyalty_tier = tier;
    }

    const customerTypeWhere = {};
    if (type) {
      customerTypeWhere.type = type;
    }

    const customers = await RestaurantCustomer.findAll({
      where: {
        restaurant_id: restaurantId,
        ...whereClause
      },
      include: [{
        model: Customer,
        as: 'customer',
        attributes: ['id', 'phone', 'name', 'email', 'type'],
        where: customerTypeWhere
      }],
      order: [['total_spent', 'DESC']]
    });

    // 쿠폰 요약 집계
    const now = new Date();
    const activeCoupons = await Coupon.findAll({
      where: {
        restaurant_id: restaurantId,
        is_active: true,
        [Op.and]: [
          { [Op.or]: [{ valid_until: null }, { valid_until: { [Op.gte]: now } }] },
          { [Op.or]: [{ valid_from: null }, { valid_from: { [Op.lte]: now } }] }
        ]
      }
    });

    const couponOrders = await Order.findAll({
      where: { restaurant_id: restaurantId, coupon_code: { [Op.ne]: null } },
      attributes: ['customer_id', 'coupon_code']
    });
    const usageMap = {};
    couponOrders.forEach(o => {
      if (!o.customer_id) return;
      if (!usageMap[o.customer_id]) usageMap[o.customer_id] = {};
      const code = o.coupon_code?.toUpperCase();
      usageMap[o.customer_id][code] = (usageMap[o.customer_id][code] || 0) + 1;
    });

    const result = customers.map(rc => {
      const cid = rc.customer_id;
      const cTier = rc.loyalty_tier || 'Bronze';
      const myUsage = usageMap[cid] || {};

      const availableCount = activeCoupons.filter(c => {
        if (c.usage_limit !== null && c.usage_count >= c.usage_limit) return false;
        if (c.per_user_limit !== null && (myUsage[c.code] || 0) >= c.per_user_limit) return false;
        if (c.target_type === 'customers' && c.target_customer_ids && !c.target_customer_ids.includes(cid)) return false;
        if (c.target_type === 'tiers' && c.target_loyalty_tiers && !c.target_loyalty_tiers.includes(cTier)) return false;
        return true;
      }).length;

      const usedCount = Object.values(myUsage).reduce((sum, v) => sum + v, 0);

      return { ...rc.toJSON(), coupons_available: availableCount, coupons_used: usedCount };
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customers'
    });
  }
});

/**
 * GET /api/customers/:restaurantId/:customerId
 * 특정 고객의 레스토랑별 상세 정보 조회
 */
router.get('/:restaurantId/:customerId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, customerId } = req.params;

    const relation = await RestaurantCustomer.findOne({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId
      },
      include: [{
        model: Customer,
        as: 'customer',
        attributes: ['id', 'phone', 'name', 'email', 'type']
      }]
    });

    if (!relation) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found for this restaurant'
      });
    }

    const orders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId
      },
      order: [['createdAt', 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: {
        ...relation.toJSON(),
        recentOrders: orders
      }
    });
  } catch (error) {
    console.error('Get customer detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer detail'
    });
  }
});

/**
 * POST /api/customers/:restaurantId/:customerId/points
 * 포인트 적립/사용
 */
router.post('/:restaurantId/:customerId/points', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, customerId } = req.params;
    const { points, reason } = req.body;

    const relation = await RestaurantCustomer.findOne({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId
      }
    });

    if (!relation) {
      return res.status(404).json({
        success: false,
        message: 'Customer relation not found'
      });
    }

    const newPoints = relation.points + points;
    if (newPoints < 0) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient points'
      });
    }

    await relation.update({ points: newPoints });

    res.json({
      success: true,
      data: {
        points: newPoints,
        reason
      }
    });
  } catch (error) {
    console.error('Points update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update points'
    });
  }
});

/**
 * DELETE /api/customers/:customerId
 * 고객 삭제
 */
router.delete('/:customerId', authenticateToken, async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    await RestaurantCustomer.destroy({
      where: { customer_id: customerId }
    });

    await customer.destroy();

    res.json({
      success: true,
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer'
    });
  }
});

module.exports = router;
