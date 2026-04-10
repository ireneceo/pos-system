/**
 * Point Service
 * 포인트 적립/사용/환불 관련 비즈니스 로직
 */

const { MembershipSettings, PointTransaction, RestaurantCustomer, Customer } = require('../models');
const { sequelize } = require('../config/database');

/**
 * 주문 완료 시 포인트 적립
 * @param {number} restaurantId - 레스토랑 ID
 * @param {number} customerId - 고객 ID
 * @param {number} orderId - 주문 ID
 * @param {number} orderAmount - 주문 금액 (포인트 사용 전 금액)
 * @returns {Promise<{success: boolean, earnedPoints?: number, error?: string}>}
 */
async function earnPointsForOrder(restaurantId, customerId, orderId, orderAmount) {
  const t = await sequelize.transaction();

  try {
    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id: restaurantId },
      transaction: t
    });

    const membershipActive = settings && settings.is_active;

    // 멤버십 비활성이어도 주문 통계(total_orders/total_spent)는 업데이트
    if (!membershipActive) {
      // 고객-레스토랑 관계 조회/생성 후 통계만 업데이트
      let relation = await RestaurantCustomer.findOne({
        where: { restaurant_id: restaurantId, customer_id: customerId },
        transaction: t
      });
      if (!relation) {
        relation = await RestaurantCustomer.create({
          restaurant_id: restaurantId, customer_id: customerId,
          points: 0, total_orders: 0, total_spent: 0, loyalty_tier: 'Bronze'
        }, { transaction: t });
      }
      const newSpent = parseFloat(relation.total_spent) + orderAmount;
      let newTier = 'Bronze';
      if (newSpent >= 5000) newTier = 'VIP';
      else if (newSpent >= 2000) newTier = 'Gold';
      else if (newSpent >= 500) newTier = 'Silver';
      await relation.update({
        total_spent: newSpent,
        total_orders: relation.total_orders + 1,
        loyalty_tier: newTier,
        last_order_at: new Date()
      }, { transaction: t });
      await t.commit();
      return { success: true, earnedPoints: 0, message: 'Membership not active — stats updated' };
    }

    // 고객-레스토랑 관계 조회
    let customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId },
      transaction: t
    });

    if (!customerRelation) {
      // 관계가 없으면 생성
      customerRelation = await RestaurantCustomer.create({
        restaurant_id: restaurantId,
        customer_id: customerId,
        points: 0,
        total_orders: 0,
        total_spent: 0,
        loyalty_tier: 'Bronze'
      }, { transaction: t });
    }

    // 이미 이 주문에 대해 포인트가 적립되었는지 확인
    const existingTransaction = await PointTransaction.findOne({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId,
        order_id: orderId,
        type: 'earn'
      },
      transaction: t
    });

    if (existingTransaction) {
      await t.commit();
      return { success: true, earnedPoints: 0, message: 'Points already earned for this order' };
    }

    // 등급별 보너스 적용
    let bonusRate = 1.00;
    switch (customerRelation.loyalty_tier) {
      case 'Silver':
        bonusRate = parseFloat(settings.silver_bonus_rate);
        break;
      case 'Gold':
        bonusRate = parseFloat(settings.gold_bonus_rate);
        break;
      case 'VIP':
        bonusRate = parseFloat(settings.vip_bonus_rate);
        break;
      default:
        bonusRate = parseFloat(settings.bronze_bonus_rate);
    }

    // 적립 포인트 계산
    const basePoints = Math.floor(orderAmount * parseFloat(settings.points_per_currency));
    const earnedPoints = Math.floor(basePoints * bonusRate);

    if (earnedPoints <= 0) {
      await t.commit();
      return { success: true, earnedPoints: 0, message: 'No points to earn' };
    }

    const newBalance = customerRelation.points + earnedPoints;

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id: restaurantId,
      customer_id: customerId,
      order_id: orderId,
      type: 'earn',
      points: earnedPoints,
      balance_after: newBalance,
      description: `Order completed (${bonusRate}x bonus)`,
      bonus_rate: bonusRate
    }, { transaction: t });

    // 고객 포인트 업데이트
    await customerRelation.update({
      points: newBalance
    }, { transaction: t });

    // 등급 재계산
    const totalSpent = parseFloat(customerRelation.total_spent) + orderAmount;
    let newTier = 'Bronze';

    if (totalSpent >= parseFloat(settings.vip_threshold)) {
      newTier = 'VIP';
    } else if (totalSpent >= parseFloat(settings.gold_threshold)) {
      newTier = 'Gold';
    } else if (totalSpent >= parseFloat(settings.silver_threshold)) {
      newTier = 'Silver';
    }

    // 총 지출 및 등급 업데이트 (주문 완료 시)
    await customerRelation.update({
      total_spent: totalSpent,
      total_orders: customerRelation.total_orders + 1,
      loyalty_tier: newTier,
      last_order_at: new Date()
    }, { transaction: t });

    await t.commit();

    console.log(`✓ [POINTS] Earned ${earnedPoints} points for customer ${customerId}, order ${orderId}`);

    return {
      success: true,
      earnedPoints,
      bonusRate,
      newBalance,
      newTier
    };
  } catch (error) {
    await t.rollback();
    console.error('✗ [POINTS] Error earning points:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 주문 생성 시 포인트 사용
 * @param {number} restaurantId - 레스토랑 ID
 * @param {number} customerId - 고객 ID
 * @param {number} orderId - 주문 ID
 * @param {number} pointsToUse - 사용할 포인트
 * @returns {Promise<{success: boolean, usedPoints?: number, cashValue?: number, error?: string}>}
 */
async function usePointsForOrder(restaurantId, customerId, orderId, pointsToUse) {
  const t = await sequelize.transaction();

  try {
    if (!pointsToUse || pointsToUse <= 0) {
      await t.commit();
      return { success: true, usedPoints: 0, cashValue: 0 };
    }

    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id: restaurantId },
      transaction: t
    });

    if (!settings || !settings.is_active) {
      await t.rollback();
      return { success: false, error: 'Membership not active' };
    }

    // 최소 사용 포인트 확인
    if (pointsToUse < settings.min_points_to_use) {
      await t.rollback();
      return { success: false, error: `Minimum ${settings.min_points_to_use} points required` };
    }

    // 고객-레스토랑 관계 조회
    const customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId },
      transaction: t
    });

    if (!customerRelation) {
      await t.rollback();
      return { success: false, error: 'Customer not found' };
    }

    // 포인트 잔액 확인
    if (customerRelation.points < pointsToUse) {
      await t.rollback();
      return { success: false, error: 'Insufficient points' };
    }

    const newBalance = customerRelation.points - pointsToUse;
    const cashValue = pointsToUse / parseFloat(settings.points_to_currency);

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id: restaurantId,
      customer_id: customerId,
      order_id: orderId,
      type: 'use',
      points: -pointsToUse,
      balance_after: newBalance,
      description: 'Points used for order'
    }, { transaction: t });

    // 고객 포인트 업데이트
    await customerRelation.update({
      points: newBalance
    }, { transaction: t });

    await t.commit();

    console.log(`✓ [POINTS] Used ${pointsToUse} points for customer ${customerId}, order ${orderId}`);

    return {
      success: true,
      usedPoints: pointsToUse,
      cashValue,
      newBalance
    };
  } catch (error) {
    await t.rollback();
    console.error('✗ [POINTS] Error using points:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 주문 취소 시 포인트 환불
 * @param {number} restaurantId - 레스토랑 ID
 * @param {number} customerId - 고객 ID
 * @param {number} orderId - 주문 ID
 * @returns {Promise<{success: boolean, refundedPoints?: number, error?: string}>}
 */
async function refundPointsForOrder(restaurantId, customerId, orderId) {
  const t = await sequelize.transaction();

  try {
    // 이 주문에서 사용한 포인트 조회
    const usedTransaction = await PointTransaction.findOne({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId,
        order_id: orderId,
        type: 'use'
      },
      transaction: t
    });

    // 이 주문에서 적립한 포인트 조회
    const earnedTransaction = await PointTransaction.findOne({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId,
        order_id: orderId,
        type: 'earn'
      },
      transaction: t
    });

    // 이미 환불 처리되었는지 확인
    const existingRefund = await PointTransaction.findOne({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId,
        order_id: orderId,
        type: 'refund'
      },
      transaction: t
    });

    if (existingRefund) {
      await t.commit();
      return { success: true, refundedPoints: 0, message: 'Already refunded' };
    }

    // 고객-레스토랑 관계 조회
    const customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId },
      transaction: t
    });

    if (!customerRelation) {
      await t.commit();
      return { success: true, refundedPoints: 0, message: 'Customer relation not found' };
    }

    let totalRefund = 0;
    let newBalance = customerRelation.points;

    // 사용한 포인트 환불
    if (usedTransaction) {
      const usedPoints = Math.abs(usedTransaction.points);
      newBalance += usedPoints;
      totalRefund += usedPoints;

      await PointTransaction.create({
        restaurant_id: restaurantId,
        customer_id: customerId,
        order_id: orderId,
        type: 'refund',
        points: usedPoints,
        balance_after: newBalance,
        description: 'Points refunded (order cancelled)'
      }, { transaction: t });
    }

    // 적립한 포인트 회수 (adjust로 기록)
    if (earnedTransaction) {
      const earnedPoints = earnedTransaction.points;
      newBalance -= earnedPoints;

      await PointTransaction.create({
        restaurant_id: restaurantId,
        customer_id: customerId,
        order_id: orderId,
        type: 'adjust',
        points: -earnedPoints,
        balance_after: newBalance,
        description: 'Points deducted (order cancelled)'
      }, { transaction: t });
    }

    // 고객 포인트 업데이트
    if (usedTransaction || earnedTransaction) {
      await customerRelation.update({
        points: newBalance
      }, { transaction: t });
    }

    await t.commit();

    console.log(`✓ [POINTS] Refunded points for customer ${customerId}, order ${orderId}`);

    return {
      success: true,
      refundedPoints: totalRefund,
      newBalance
    };
  } catch (error) {
    await t.rollback();
    console.error('✗ [POINTS] Error refunding points:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 환영 포인트 지급
 */
async function grantWelcomePoints(restaurantId, customerId) {
  const t = await sequelize.transaction();

  try {
    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id: restaurantId },
      transaction: t
    });

    if (!settings || !settings.is_active || settings.welcome_points <= 0) {
      await t.commit();
      return { success: true, welcomePoints: 0, message: 'Welcome points not available' };
    }

    // 이미 환영 포인트를 받았는지 확인
    const existingWelcome = await PointTransaction.findOne({
      where: {
        restaurant_id: restaurantId,
        customer_id: customerId,
        type: 'welcome'
      },
      transaction: t
    });

    if (existingWelcome) {
      await t.commit();
      return { success: true, welcomePoints: 0, message: 'Welcome points already granted' };
    }

    // 고객-레스토랑 관계 조회/생성
    let customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId },
      transaction: t
    });

    if (!customerRelation) {
      customerRelation = await RestaurantCustomer.create({
        restaurant_id: restaurantId,
        customer_id: customerId,
        points: 0,
        total_orders: 0,
        total_spent: 0,
        loyalty_tier: 'Bronze'
      }, { transaction: t });
    }

    const newBalance = customerRelation.points + settings.welcome_points;

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id: restaurantId,
      customer_id: customerId,
      type: 'welcome',
      points: settings.welcome_points,
      balance_after: newBalance,
      description: 'Welcome points'
    }, { transaction: t });

    // 고객 포인트 업데이트
    await customerRelation.update({
      points: newBalance
    }, { transaction: t });

    await t.commit();

    console.log(`✓ [POINTS] Granted ${settings.welcome_points} welcome points to customer ${customerId}`);

    return {
      success: true,
      welcomePoints: settings.welcome_points,
      newBalance
    };
  } catch (error) {
    await t.rollback();
    console.error('✗ [POINTS] Error granting welcome points:', error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  earnPointsForOrder,
  usePointsForOrder,
  refundPointsForOrder,
  grantWelcomePoints
};
