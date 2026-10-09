/**
 * 쿠폰 검증 — 단일 소스 (2026-10-09 사전점검 S1 · Fable 판정 fable-verdict-20261009-s1-repricing.md §4-3).
 * routes/coupons.js POST /validate 의 본문을 그대로 옮겼다(응답 모양·문구 무변경). 라우트와
 * 손님 주문 서버 재계산(utils/guestOrderPricing.js)이 같은 판정을 쓴다.
 *
 * @returns {{ status:number, body:object }} 라우트는 res.status(status).json(body) 그대로 돌려준다.
 *   유효하면 status 200, body.valid=true, body.data.{coupon, discountAmount}.
 */
const Coupon = require('../models/Coupon');
const RestaurantCustomer = require('../models/RestaurantCustomer');
const Order = require('../models/Order');

const reply = (status, body) => ({ status, body });

async function validateCoupon(input) {
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
    } = input || {};

    const finalRestaurantId = restaurantId || restaurant_id;
    const finalCustomerId = customerId || customer_id;
    const finalOrderTotal = parseFloat(orderTotal || order_total || order_amount || 0);
    // POS Terminal/Mobile 은 'dine-in' (kebab), DB applicable_order_types 는 보통 'dine_in' (snake).
    // 둘 다 수용하기 위해 매칭 시 양쪽 모두 snake_case 로 정규화. (시스템 전체 통일은 별도 사이클.)
    const normalizeOrderType = (s) => String(s || '').trim().toLowerCase().replace(/-/g, '_');
    const finalOrderType = normalizeOrderType(orderType || order_type || 'dine_in');

    if (!code || !finalRestaurantId) {
      return reply(400, { success: false, error: { message: 'Coupon code and restaurant ID are required', code: 'VALIDATION_ERROR' } });
    }

    // Find coupon
    const coupon = await Coupon.findOne({
      where: {
        restaurant_id: finalRestaurantId,
        code: code.toUpperCase()
      }
    });

    if (!coupon) {
      return reply(404, {
        success: false,
        error: 'Invalid coupon code',
        valid: false
      });
    }

    // Check if active
    if (!coupon.is_active) {
      return reply(400, {
        success: false,
        error: 'This coupon is no longer active',
        valid: false
      });
    }

    // Check validity dates
    const now = new Date();
    if (coupon.valid_from && new Date(coupon.valid_from) > now) {
      return reply(400, {
        success: false,
        error: 'This coupon is not yet valid',
        valid: false
      });
    }

    if (coupon.valid_until && new Date(coupon.valid_until) < now) {
      return reply(400, {
        success: false,
        error: 'This coupon has expired',
        valid: false
      });
    }

    // Check usage limit
    if (coupon.usage_limit !== null && coupon.usage_count >= coupon.usage_limit) {
      return reply(400, {
        success: false,
        error: 'This coupon has reached its usage limit',
        valid: false
      });
    }

    // Check per-user limit (orders 테이블에서 실사용 횟수 집계)
    if (coupon.per_user_limit !== null && finalCustomerId) {
      const userUsageCount = await Order.count({
        where: {
          restaurant_id: finalRestaurantId,
          customer_id: finalCustomerId,
          coupon_code: code.toUpperCase()
        }
      });
      if (userUsageCount >= coupon.per_user_limit) {
        return reply(400, {
          success: false,
          error: `You have already used this coupon ${userUsageCount} time(s). Limit: ${coupon.per_user_limit}`,
          valid: false
        });
      }
    }

    // Check minimum order amount
    if (coupon.min_order && finalOrderTotal < parseFloat(coupon.min_order)) {
      return reply(400, {
        success: false,
        error: `Minimum order amount is ${coupon.min_order}`,
        valid: false,
        minOrder: parseFloat(coupon.min_order)
      });
    }

    // Check applicable order types — DB 값도 동일하게 정규화 후 매칭 (kebab/snake 혼용 안전)
    if (coupon.applicable_order_types && coupon.applicable_order_types.length > 0) {
      const allowedNormalized = coupon.applicable_order_types.map(normalizeOrderType);
      if (!allowedNormalized.includes(finalOrderType)) {
        return reply(400, {
          success: false,
          error: `This coupon is not applicable for ${finalOrderType} orders`,
          valid: false
        });
      }
    }

    // Check target audience (customer/tier targeting)
    if (coupon.target_type === 'customers' && coupon.target_customer_ids) {
      if (!finalCustomerId) {
        return reply(400, {
          success: false,
          error: 'This coupon is for specific customers only',
          valid: false
        });
      }
      if (!coupon.target_customer_ids.includes(parseInt(finalCustomerId))) {
        return reply(400, {
          success: false,
          error: 'This coupon is not available for your account',
          valid: false
        });
      }
    }

    if (coupon.target_type === 'tiers' && coupon.target_loyalty_tiers) {
      if (!finalCustomerId) {
        return reply(400, {
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
        return reply(400, {
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

    return reply(200, {
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
}

module.exports = { validateCoupon };
