const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const RestaurantCustomer = require('../models/RestaurantCustomer');
const { Op } = require('sequelize');
const { authenticateToken, optionalAuthenticateToken } = require('../middleware/auth');

// Get all coupons for a restaurant
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { restaurantId, restaurant_id, active } = req.query;
    const finalRestaurantId = restaurantId || restaurant_id;

    if (!finalRestaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID is required'
      });
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
    console.error('❌ [COUPONS] Error fetching coupons:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Validate coupon (for order placement) - MUST be before /:id routes
// POST /api/coupons/validate
router.post('/validate', optionalAuthenticateToken, async (req, res) => {
  try {
    const {
      code,
      restaurantId,
      restaurant_id,
      customerId,
      customer_id,
      orderTotal,
      order_total,
      order_amount,
      orderType,
      order_type
    } = req.body;

    const finalRestaurantId = restaurantId || restaurant_id;
    const finalCustomerId = customerId || customer_id;
    const finalOrderTotal = parseFloat(orderTotal || order_total || order_amount || 0);
    const finalOrderType = orderType || order_type || 'dine_in';

    if (!code || !finalRestaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Coupon code and restaurant ID are required'
      });
    }

    // Find coupon
    const coupon = await Coupon.findOne({
      where: {
        restaurant_id: finalRestaurantId,
        code: code.toUpperCase()
      }
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        error: 'Invalid coupon code',
        valid: false
      });
    }

    // Check if active
    if (!coupon.is_active) {
      return res.status(400).json({
        success: false,
        error: 'This coupon is no longer active',
        valid: false
      });
    }

    // Check validity dates
    const now = new Date();
    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
      return res.status(400).json({
        success: false,
        error: 'This coupon is not yet valid',
        valid: false
      });
    }

    if (coupon.valid_until && new Date(coupon.valid_until) < now) {
      return res.status(400).json({
        success: false,
        error: 'This coupon has expired',
        valid: false
      });
    }

    // Check usage limit
    if (coupon.usage_limit !== null && coupon.usage_count >= coupon.usage_limit) {
      return res.status(400).json({
        success: false,
        error: 'This coupon has reached its usage limit',
        valid: false
      });
    }

    // Check minimum order amount
    if (coupon.min_order && finalOrderTotal < parseFloat(coupon.min_order)) {
      return res.status(400).json({
        success: false,
        error: `Minimum order amount is ${coupon.min_order}`,
        valid: false,
        minOrder: parseFloat(coupon.min_order)
      });
    }

    // Check applicable order types
    if (coupon.applicable_order_types && coupon.applicable_order_types.length > 0) {
      if (!coupon.applicable_order_types.includes(finalOrderType)) {
        return res.status(400).json({
          success: false,
          error: `This coupon is not applicable for ${finalOrderType} orders`,
          valid: false
        });
      }
    }

    // Check target audience (customer/tier targeting)
    if (coupon.target_type === 'customers' && coupon.target_customer_ids) {
      if (!finalCustomerId) {
        return res.status(400).json({
          success: false,
          error: 'This coupon is for specific customers only',
          valid: false
        });
      }
      if (!coupon.target_customer_ids.includes(parseInt(finalCustomerId))) {
        return res.status(400).json({
          success: false,
          error: 'This coupon is not available for your account',
          valid: false
        });
      }
    }

    if (coupon.target_type === 'tiers' && coupon.target_loyalty_tiers) {
      if (!finalCustomerId) {
        return res.status(400).json({
          success: false,
          error: 'This coupon is for specific membership tiers only',
          valid: false
        });
      }
      const customerRecord = await RestaurantCustomer.findOne({
        where: {
          restaurant_id: finalRestaurantId,
          customer_id: finalCustomerId
        }
      });
      if (!customerRecord || !coupon.target_loyalty_tiers.includes(customerRecord.loyalty_tier)) {
        return res.status(400).json({
          success: false,
          error: 'This coupon is not available for your membership tier',
          valid: false
        });
      }
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.type === 'percentage') {
      discountAmount = finalOrderTotal * (parseFloat(coupon.value) / 100);
      // Apply max discount cap if set
      if (coupon.max_discount && discountAmount > parseFloat(coupon.max_discount)) {
        discountAmount = parseFloat(coupon.max_discount);
      }
    } else {
      // Fixed amount
      discountAmount = parseFloat(coupon.value);
      // Don't exceed order total
      if (discountAmount > finalOrderTotal) {
        discountAmount = finalOrderTotal;
      }
    }

    // Round to 2 decimal places
    discountAmount = Math.round(discountAmount * 100) / 100;

    res.json({
      success: true,
      valid: true,
      data: {
        coupon: {
          id: coupon.id,
          code: coupon.code,
          name: coupon.name,
          type: coupon.type,
          value: parseFloat(coupon.value)
        },
        discountAmount,
        originalTotal: finalOrderTotal,
        finalTotal: Math.round((finalOrderTotal - discountAmount) * 100) / 100
      }
    });
  } catch (error) {
    console.error('❌ [COUPONS] Error validating coupon:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single coupon
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Coupon not found' });
    }

    res.json({ success: true, data: coupon });
  } catch (error) {
    console.error('❌ [COUPONS] Error fetching coupon:', error);
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
      return res.status(400).json({
        success: false,
        error: 'Restaurant ID, code, type, and value are required'
      });
    }

    // Check for duplicate code
    const existing = await Coupon.findOne({
      where: {
        restaurant_id: finalRestaurantId,
        code: code.toUpperCase()
      }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'A coupon with this code already exists'
      });
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

    console.log(`✅ [COUPONS] Created coupon ${coupon.code} for restaurant ${finalRestaurantId}`);
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    console.error('❌ [COUPONS] Error creating coupon:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update coupon
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Coupon not found' });
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
        return res.status(400).json({
          success: false,
          error: 'A coupon with this code already exists'
        });
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

    console.log(`✅ [COUPONS] Updated coupon ${coupon.code}`);
    res.json({ success: true, data: coupon });
  } catch (error) {
    console.error('❌ [COUPONS] Error updating coupon:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete coupon
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Coupon not found' });
    }

    await coupon.destroy();

    console.log(`✅ [COUPONS] Deleted coupon ${coupon.code}`);
    res.json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('❌ [COUPONS] Error deleting coupon:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Increment usage count (called after order completion)
// POST /api/coupons/:id/use
router.post('/:id/use', authenticateToken, async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);

    if (!coupon) {
      return res.status(404).json({ success: false, error: 'Coupon not found' });
    }

    await coupon.update({
      usage_count: coupon.usage_count + 1
    });

    console.log(`✅ [COUPONS] Incremented usage count for coupon ${coupon.code} to ${coupon.usage_count}`);
    res.json({ success: true, data: coupon });
  } catch (error) {
    console.error('❌ [COUPONS] Error incrementing usage:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
