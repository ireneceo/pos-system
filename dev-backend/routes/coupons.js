const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const RestaurantCustomer = require('../models/RestaurantCustomer');
const Order = require('../models/Order');
const { Op } = require('sequelize');
const { authenticateToken, optionalAuthenticateToken, userCanAccessRestaurant } = require('../middleware/auth');
const { authenticateAdminOrCustomerSelf } = require('../middleware/customerAuth');
const { validateCoupon } = require('../utils/couponValidate');

// Get all coupons for a restaurant
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, restaurant_id, active } = req.query;
    const finalRestaurantId = restaurantId || restaurant_id;

    if (!finalRestaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    if (!(await userCanAccessRestaurant(req.user, finalRestaurantId))) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
    }

    const whereCondition = {
      restaurant_id: parseInt(finalRestaurantId)
    };

    if (active === 'true') {
      whereCondition.is_active = true;
    } else if (active === 'false') {
      whereCondition.is_active = false;
    }

    const coupons = await Coupon.findAll({
      where: whereCondition,
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: coupons });
  } catch (error) {
    console.error('✗ [COUPONS] Error fetching coupons:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get customer's available coupons + usage history
// GET /api/coupons/customer/:customerId?restaurant_id=X
router.get('/customer/:customerId', authenticateAdminOrCustomerSelf, async (req, res) => {
  try {
    const { customerId } = req.params;
    const restaurantId = req.query.restaurant_id || req.query.restaurantId;
    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'restaurant_id is required' });
    }

    // 고객의 tier 조회
    const relation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId }
    });
    const customerTier = relation?.loyalty_tier || 'Bronze';

    // 사용 가능한 쿠폰: active + 유효기간 내 + 사용한도 안 찬 + 타겟 매칭
    const now = new Date();
    const allCoupons = await Coupon.findAll({
      where: {
        restaurant_id: restaurantId,
        is_active: true,
        [Op.or]: [
          { valid_from: null },
          { valid_from: { [Op.lte]: now } }
        ]
      }
    });

    // 고객의 쿠폰별 사용횟수 (orders 테이블에서 집계)
    const usedOrders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId,
        coupon_code: { [Op.ne]: null }
      },
      attributes: ['coupon_code', 'coupon_discount', 'order_number', 'total_amount', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    const usageCountMap = {};
    usedOrders.forEach(o => {
      const code = o.coupon_code?.toUpperCase();
      if (code) usageCountMap[code] = (usageCountMap[code] || 0) + 1;
    });

    // 공통 필터: 유효기간/한도 체크
    const passesBasicFilter = (c) => {
      if (c.valid_until && new Date(c.valid_until) < now) return false;
      if (c.usage_limit !== null && c.usage_count >= c.usage_limit) return false;
      const myUsage = usageCountMap[c.code] || 0;
      if (c.per_user_limit !== null && myUsage >= c.per_user_limit) return false;
      return true;
    };

    const formatCoupon = (c) => ({
      id: c.id, code: c.code, name: c.name, type: c.type,
      value: parseFloat(c.value), min_order: parseFloat(c.min_order || 0),
      max_discount: c.max_discount ? parseFloat(c.max_discount) : null,
      valid_until: c.valid_until,
      per_user_limit: c.per_user_limit,
      my_usage: usageCountMap[c.code] || 0,
      applicable_order_types: c.applicable_order_types,
      target_type: c.target_type
    });

    // myCoupons: 명시적으로 이 고객에게 발급된 쿠폰만 (개인 타겟 또는 본인 티어 타겟)
    const myCoupons = allCoupons.filter(c => {
      if (!passesBasicFilter(c)) return false;
      if (c.target_type === 'customers' && c.target_customer_ids) {
        return c.target_customer_ids.includes(parseInt(customerId));
      }
      if (c.target_type === 'tiers' && c.target_loyalty_tiers) {
        return c.target_loyalty_tiers.includes(customerTier);
      }
      return false; // target_type='all' 또는 null은 myCoupons 아님
    }).map(formatCoupon);

    // promotions: 매장 전체 공개 쿠폰 (target_type='all' 또는 null)
    const promotions = allCoupons.filter(c => {
      if (!passesBasicFilter(c)) return false;
      return c.target_type === 'all' || c.target_type === null || !c.target_type;
    }).map(formatCoupon);

    // available: 결제 시 사용 가능한 모든 쿠폰 (myCoupons + promotions, 호환성 유지)
    const available = [...myCoupons, ...promotions];

    // 사용 이력
    const history = usedOrders.map(o => ({
      code: o.coupon_code,
      discount: parseFloat(o.coupon_discount || 0),
      order_number: o.order_number,
      order_total: parseFloat(o.total_amount || 0),
      used_at: o.createdAt
    }));

    res.json({ success: true, data: { available, myCoupons, promotions, history } });
  } catch (error) {
    console.error('✗ [COUPONS] Error fetching customer coupons:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Validate coupon (for order placement) - MUST be before /:id routes
// POST /api/coupons/validate
router.post('/validate', optionalAuthenticateToken, async (req, res) => {
  try {
    // 본문은 utils/couponValidate.js 로 옮겼다(손님 주문 서버 재계산과 같은 판정 — 2026-10-09 S1).
    const r = await validateCoupon(req.body);
    res.status(r.status).json(r.body);
  } catch (error) {
    console.error('✗ [COUPONS] Error validating coupon:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single coupon
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: { message: 'Coupon not found', code: 'NOT_FOUND' } });
    }

    if (!(await userCanAccessRestaurant(req.user, coupon.restaurant_id))) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this coupon', code: 'FORBIDDEN' } });
    }

    res.json({ success: true, data: coupon });
  } catch (error) {
    console.error('✗ [COUPONS] Error fetching coupon:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create new coupon
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      restaurant_id,
      restaurantId,
      code,
      name,
      description,
      type,
      value,
      min_order,
      max_discount,
      usage_limit,
      per_user_limit,
      valid_from,
      valid_until,
      is_active,
      applicable_order_types,
      target_type,
      target_customer_ids,
      target_loyalty_tiers
    } = req.body;

    const finalRestaurantId = restaurant_id || restaurantId;

    if (!finalRestaurantId || !code || !type || value === undefined) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID, code, type, and value are required', code: 'VALIDATION_ERROR' } });
    }

    if (!(await userCanAccessRestaurant(req.user, finalRestaurantId))) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
    }

    // Check for duplicate code
    const existing = await Coupon.findOne({
      where: {
        restaurant_id: finalRestaurantId,
        code: code.toUpperCase()
      }
    });

    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'A coupon with this code already exists', code: 'VALIDATION_ERROR' } });
    }

    const coupon = await Coupon.create({
      restaurant_id: finalRestaurantId,
      code: code.toUpperCase(),
      name,
      description,
      type,
      value,
      min_order: min_order || 0,
      max_discount,
      usage_limit,
      per_user_limit,
      valid_from: valid_from ? new Date(valid_from) : null,
      valid_until: valid_until ? new Date(valid_until) : null,
      is_active: is_active !== false,
      applicable_order_types,
      target_type: target_type || 'all',
      target_customer_ids: target_type === 'customers' ? target_customer_ids : null,
      target_loyalty_tiers: target_type === 'tiers' ? target_loyalty_tiers : null
    });

    console.log(`✓ [COUPONS] Created coupon ${coupon.code} for restaurant ${finalRestaurantId}`);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    console.error('✗ [COUPONS] Error creating coupon:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update coupon
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: { message: 'Coupon not found', code: 'NOT_FOUND' } });
    }

    if (!(await userCanAccessRestaurant(req.user, coupon.restaurant_id))) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this coupon', code: 'FORBIDDEN' } });
    }

    const {
      code,
      name,
      description,
      type,
      value,
      min_order,
      max_discount,
      usage_limit,
      per_user_limit,
      valid_from,
      valid_until,
      is_active,
      applicable_order_types,
      target_type,
      target_customer_ids,
      target_loyalty_tiers
    } = req.body;

    // Check for duplicate code if code is being changed
    if (code && code.toUpperCase() !== coupon.code) {
      const existing = await Coupon.findOne({
        where: {
          restaurant_id: coupon.restaurant_id,
          code: code.toUpperCase(),
          id: { [Op.ne]: coupon.id }
        }
      });

      if (existing) {
        return res.status(400).json({ success: false, error: { message: 'A coupon with this code already exists', code: 'VALIDATION_ERROR' } });
      }
    }

    const finalTargetType = target_type !== undefined ? target_type : coupon.target_type;

    await coupon.update({
      code: code ? code.toUpperCase() : coupon.code,
      name: name !== undefined ? name : coupon.name,
      description: description !== undefined ? description : coupon.description,
      type: type || coupon.type,
      value: value !== undefined ? value : coupon.value,
      min_order: min_order !== undefined ? min_order : coupon.min_order,
      max_discount: max_discount !== undefined ? max_discount : coupon.max_discount,
      usage_limit: usage_limit !== undefined ? usage_limit : coupon.usage_limit,
      per_user_limit: per_user_limit !== undefined ? per_user_limit : coupon.per_user_limit,
      valid_from: valid_from !== undefined ? (valid_from ? new Date(valid_from) : null) : coupon.valid_from,
      valid_until: valid_until !== undefined ? (valid_until ? new Date(valid_until) : null) : coupon.valid_until,
      is_active: is_active !== undefined ? is_active : coupon.is_active,
      applicable_order_types: applicable_order_types !== undefined ? applicable_order_types : coupon.applicable_order_types,
      target_type: finalTargetType,
      target_customer_ids: target_type !== undefined ? (finalTargetType === 'customers' ? target_customer_ids : null) : coupon.target_customer_ids,
      target_loyalty_tiers: target_type !== undefined ? (finalTargetType === 'tiers' ? target_loyalty_tiers : null) : coupon.target_loyalty_tiers
    });

    console.log(`✓ [COUPONS] Updated coupon ${coupon.code}`);
    res.json({ success: true, data: coupon });
  } catch (error) {
    console.error('✗ [COUPONS] Error updating coupon:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete coupon
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: { message: 'Coupon not found', code: 'NOT_FOUND' } });
    }

    if (!(await userCanAccessRestaurant(req.user, coupon.restaurant_id))) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this coupon', code: 'FORBIDDEN' } });
    }

    await coupon.destroy();

    console.log(`✓ [COUPONS] Deleted coupon ${coupon.code}`);
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('✗ [COUPONS] Error deleting coupon:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Increment usage count (called after order completion)
// POST /api/coupons/:id/use
router.post('/:id/use', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: { message: 'Coupon not found', code: 'NOT_FOUND' } });
    }

    if (!(await userCanAccessRestaurant(req.user, coupon.restaurant_id))) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this coupon', code: 'FORBIDDEN' } });
    }

    await coupon.update({
      usage_count: coupon.usage_count + 1
    });

    console.log(`✓ [COUPONS] Incremented usage count for coupon ${coupon.code} to ${coupon.usage_count}`);
    res.json({ success: true, data: coupon });
  } catch (error) {
    console.error('✗ [COUPONS] Error incrementing usage:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
