const express = require('express');
const router = express.Router();
const { MembershipSettings, PointTransaction, RestaurantCustomer, Customer, Restaurant, Order } = require('../models');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

// 디버그용 테스트 엔드포인트
router.get('/test', (req, res) => {
  console.log('Membership test endpoint called');
  res.json({ success: true, message: 'Membership router is working!' });
});

// ========================================
// 멤버십 설정 조회/수정
// ========================================

/**
 * GET /api/membership/settings/:restaurantId
 * 레스토랑의 멤버십 설정 조회
 */
router.get('/settings/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    let settings = await MembershipSettings.findOne({
      where: { restaurant_id: restaurantId }
    });

    // 설정이 없으면 기본값으로 생성
    if (!settings) {
      settings = await MembershipSettings.create({
        restaurant_id: restaurantId
      });
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Get membership settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get membership settings'
    });
  }
});

/**
 * PUT /api/membership/settings/:restaurantId
 * 레스토랑의 멤버십 설정 수정
 */
router.put('/settings/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const updateData = req.body;

    let settings = await MembershipSettings.findOne({
      where: { restaurant_id: restaurantId }
    });

    if (!settings) {
      // 설정이 없으면 생성
      settings = await MembershipSettings.create({
        restaurant_id: restaurantId,
        ...updateData
      });
    } else {
      // 설정이 있으면 업데이트
      await settings.update(updateData);
    }

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Update membership settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update membership settings'
    });
  }
});

// ========================================
// 고객 멤버십 정보 조회
// ========================================

/**
 * GET /api/membership/customer/:restaurantId/:customerId
 * 고객의 멤버십 정보 (포인트, 등급 등) 조회
 */
router.get('/customer/:restaurantId/:customerId', async (req, res) => {
  try {
    const { restaurantId, customerId } = req.params;

    // 고객-레스토랑 관계 조회
    let customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId },
      include: [{
        model: Customer,
        as: 'customer',
        attributes: ['id', 'name', 'phone', 'email']
      }]
    });

    // 관계가 없으면 기본값 반환
    if (!customerRelation) {
      return res.json({
        success: true,
        data: {
          points: 0,
          total_orders: 0,
          total_spent: 0,
          loyalty_tier: 'Bronze',
          customer: null
        }
      });
    }

    res.json({
      success: true,
      data: {
        points: customerRelation.points || 0,
        total_orders: customerRelation.total_orders || 0,
        total_spent: customerRelation.total_spent || 0,
        loyalty_tier: customerRelation.loyalty_tier || 'Bronze',
        last_order_at: customerRelation.last_order_at,
        points_expiring: customerRelation.points_expiring || 0,
        points_expiry_date: customerRelation.points_expiry_date,
        customer: customerRelation.customer
      }
    });
  } catch (error) {
    console.error('Get customer membership error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer membership info'
    });
  }
});

// ========================================
// 포인트 적립/사용
// ========================================

/**
 * POST /api/membership/points/earn
 * 포인트 적립
 *
 * Body:
 * - restaurant_id: 레스토랑 ID (필수)
 * - customer_id: 고객 ID (필수)
 * - order_id: 주문 ID (선택)
 * - amount: 결제 금액 (필수) - 포인트 계산용
 * - description: 설명 (선택)
 */
router.post('/points/earn', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { restaurant_id, customer_id, order_id, amount, description } = req.body;

    if (!restaurant_id || !customer_id || !amount) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'restaurant_id, customer_id, and amount are required'
      });
    }

    // 멤버십 설정 조회
    let settings = await MembershipSettings.findOne({
      where: { restaurant_id },
      transaction: t
    });

    if (!settings) {
      settings = await MembershipSettings.create({ restaurant_id }, { transaction: t });
    }

    // 멤버십이 비활성화된 경우
    if (!settings.is_active) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Membership is not active for this restaurant'
      });
    }

    // 고객-레스토랑 관계 조회
    let customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id, customer_id },
      transaction: t
    });

    if (!customerRelation) {
      customerRelation = await RestaurantCustomer.create({
        restaurant_id,
        customer_id,
        points: 0,
        total_orders: 0,
        total_spent: 0,
        loyalty_tier: 'Bronze'
      }, { transaction: t });
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
    const basePoints = Math.floor(amount * parseFloat(settings.points_per_currency));
    const earnedPoints = Math.floor(basePoints * bonusRate);
    const newBalance = customerRelation.points + earnedPoints;

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id,
      customer_id,
      order_id: order_id || null,
      type: 'earn',
      points: earnedPoints,
      balance_after: newBalance,
      description: description || `Order points (${bonusRate}x bonus)`,
      bonus_rate: bonusRate
    }, { transaction: t });

    // 고객 포인트 업데이트
    await customerRelation.update({
      points: newBalance
    }, { transaction: t });

    await t.commit();

    res.json({
      success: true,
      data: {
        earned_points: earnedPoints,
        bonus_rate: bonusRate,
        new_balance: newBalance
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Earn points error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to earn points'
    });
  }
});

/**
 * POST /api/membership/points/use
 * 포인트 사용
 *
 * Body:
 * - restaurant_id: 레스토랑 ID (필수)
 * - customer_id: 고객 ID (필수)
 * - order_id: 주문 ID (선택)
 * - points: 사용할 포인트 (필수)
 * - description: 설명 (선택)
 */
router.post('/points/use', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { restaurant_id, customer_id, order_id, points, description } = req.body;

    if (!restaurant_id || !customer_id || !points) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'restaurant_id, customer_id, and points are required'
      });
    }

    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id },
      transaction: t
    });

    if (!settings || !settings.is_active) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Membership is not active for this restaurant'
      });
    }

    // 최소 사용 포인트 확인
    if (points < settings.min_points_to_use) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: `Minimum ${settings.min_points_to_use} points required to use`
      });
    }

    // 고객-레스토랑 관계 조회
    const customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id, customer_id },
      transaction: t
    });

    if (!customerRelation) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Customer not found for this restaurant'
      });
    }

    // 포인트 잔액 확인
    if (customerRelation.points < points) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Insufficient points'
      });
    }

    const newBalance = customerRelation.points - points;

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id,
      customer_id,
      order_id: order_id || null,
      type: 'use',
      points: -points,
      balance_after: newBalance,
      description: description || 'Points used for order'
    }, { transaction: t });

    // 고객 포인트 업데이트
    await customerRelation.update({
      points: newBalance
    }, { transaction: t });

    // 사용 포인트의 현금 가치 계산
    const cashValue = points / parseFloat(settings.points_to_currency);

    await t.commit();

    res.json({
      success: true,
      data: {
        used_points: points,
        cash_value: cashValue,
        new_balance: newBalance
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Use points error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to use points'
    });
  }
});

/**
 * POST /api/membership/points/refund
 * 포인트 환불 (주문 취소 시)
 */
router.post('/points/refund', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { restaurant_id, customer_id, order_id, points, description } = req.body;

    if (!restaurant_id || !customer_id || !points) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'restaurant_id, customer_id, and points are required'
      });
    }

    // 고객-레스토랑 관계 조회
    const customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id, customer_id },
      transaction: t
    });

    if (!customerRelation) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: 'Customer not found for this restaurant'
      });
    }

    const newBalance = customerRelation.points + Math.abs(points);

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id,
      customer_id,
      order_id: order_id || null,
      type: 'refund',
      points: Math.abs(points),
      balance_after: newBalance,
      description: description || 'Points refunded'
    }, { transaction: t });

    // 고객 포인트 업데이트
    await customerRelation.update({
      points: newBalance
    }, { transaction: t });

    await t.commit();

    res.json({
      success: true,
      data: {
        refunded_points: Math.abs(points),
        new_balance: newBalance
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Refund points error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refund points'
    });
  }
});

/**
 * POST /api/membership/points/adjust
 * 포인트 수동 조정 (관리자용)
 */
router.post('/points/adjust', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { restaurant_id, customer_id, points, description } = req.body;

    if (!restaurant_id || !customer_id || points === undefined) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'restaurant_id, customer_id, and points are required'
      });
    }

    // 고객-레스토랑 관계 조회
    let customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id, customer_id },
      transaction: t
    });

    if (!customerRelation) {
      customerRelation = await RestaurantCustomer.create({
        restaurant_id,
        customer_id,
        points: 0,
        total_orders: 0,
        total_spent: 0,
        loyalty_tier: 'Bronze'
      }, { transaction: t });
    }

    const newBalance = customerRelation.points + points;

    if (newBalance < 0) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Resulting balance cannot be negative'
      });
    }

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id,
      customer_id,
      type: 'adjust',
      points: points,
      balance_after: newBalance,
      description: description || 'Manual adjustment'
    }, { transaction: t });

    // 고객 포인트 업데이트
    await customerRelation.update({
      points: newBalance
    }, { transaction: t });

    await t.commit();

    res.json({
      success: true,
      data: {
        adjusted_points: points,
        new_balance: newBalance
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Adjust points error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to adjust points'
    });
  }
});

/**
 * POST /api/membership/points/welcome
 * 환영 포인트 지급
 */
router.post('/points/welcome', async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { restaurant_id, customer_id } = req.body;

    if (!restaurant_id || !customer_id) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'restaurant_id and customer_id are required'
      });
    }

    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id },
      transaction: t
    });

    if (!settings || !settings.is_active || settings.welcome_points <= 0) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Welcome points not available'
      });
    }

    // 이미 환영 포인트를 받았는지 확인
    const existingWelcome = await PointTransaction.findOne({
      where: {
        restaurant_id,
        customer_id,
        type: 'welcome'
      },
      transaction: t
    });

    if (existingWelcome) {
      await t.rollback();
      return res.status(400).json({
        success: false,
        message: 'Welcome points already received'
      });
    }

    // 고객-레스토랑 관계 조회/생성
    let customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id, customer_id },
      transaction: t
    });

    if (!customerRelation) {
      customerRelation = await RestaurantCustomer.create({
        restaurant_id,
        customer_id,
        points: 0,
        total_orders: 0,
        total_spent: 0,
        loyalty_tier: 'Bronze'
      }, { transaction: t });
    }

    const newBalance = customerRelation.points + settings.welcome_points;

    // 포인트 트랜잭션 기록
    await PointTransaction.create({
      restaurant_id,
      customer_id,
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

    res.json({
      success: true,
      data: {
        welcome_points: settings.welcome_points,
        new_balance: newBalance
      }
    });
  } catch (error) {
    await t.rollback();
    console.error('Welcome points error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to grant welcome points'
    });
  }
});

// ========================================
// 포인트 내역 조회
// ========================================

/**
 * GET /api/membership/points/history/:restaurantId/:customerId
 * 고객의 포인트 거래 내역 조회
 */
router.get('/points/history/:restaurantId/:customerId', async (req, res) => {
  try {
    const { restaurantId, customerId } = req.params;
    const { type, limit = 50, offset = 0 } = req.query;

    const whereClause = {
      restaurant_id: restaurantId,
      customer_id: customerId
    };

    if (type) {
      whereClause.type = type;
    }

    const { count, rows: transactions } = await PointTransaction.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        transactions,
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Get points history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get points history'
    });
  }
});

// ========================================
// 등급 관리
// ========================================

/**
 * POST /api/membership/tier/update/:restaurantId/:customerId
 * 고객 등급 재계산 및 업데이트
 */
router.post('/tier/update/:restaurantId/:customerId', async (req, res) => {
  try {
    const { restaurantId, customerId } = req.params;

    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id: restaurantId }
    });

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Membership settings not found'
      });
    }

    // 고객-레스토랑 관계 조회
    const customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId }
    });

    if (!customerRelation) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found for this restaurant'
      });
    }

    // 등급 계산
    const totalSpent = parseFloat(customerRelation.total_spent);
    let newTier = 'Bronze';

    if (totalSpent >= parseFloat(settings.vip_threshold)) {
      newTier = 'VIP';
    } else if (totalSpent >= parseFloat(settings.gold_threshold)) {
      newTier = 'Gold';
    } else if (totalSpent >= parseFloat(settings.silver_threshold)) {
      newTier = 'Silver';
    }

    // 등급 업데이트
    await customerRelation.update({ loyalty_tier: newTier });

    res.json({
      success: true,
      data: {
        previous_tier: customerRelation.loyalty_tier,
        new_tier: newTier,
        total_spent: totalSpent
      }
    });
  } catch (error) {
    console.error('Update tier error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update tier'
    });
  }
});

/**
 * GET /api/membership/tier/info/:restaurantId/:customerId
 * 고객 등급 정보 조회 (다음 등급까지 남은 금액 등)
 */
router.get('/tier/info/:restaurantId/:customerId', async (req, res) => {
  try {
    const { restaurantId, customerId } = req.params;

    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id: restaurantId }
    });

    if (!settings) {
      return res.status(404).json({
        success: false,
        message: 'Membership settings not found'
      });
    }

    // 고객-레스토랑 관계 조회
    const customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id: restaurantId, customer_id: customerId },
      include: [{
        model: Customer,
        as: 'customer',
        attributes: ['id', 'name', 'phone', 'email']
      }]
    });

    if (!customerRelation) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found for this restaurant'
      });
    }

    const totalSpent = parseFloat(customerRelation.total_spent);
    const currentTier = customerRelation.loyalty_tier;

    // 다음 등급 정보 계산
    let nextTier = null;
    let amountToNextTier = 0;
    let progressPercent = 100;

    const silverThreshold = parseFloat(settings.silver_threshold);
    const goldThreshold = parseFloat(settings.gold_threshold);
    const vipThreshold = parseFloat(settings.vip_threshold);

    switch (currentTier) {
      case 'Bronze':
        nextTier = 'Silver';
        amountToNextTier = silverThreshold - totalSpent;
        progressPercent = Math.min(100, (totalSpent / silverThreshold) * 100);
        break;
      case 'Silver':
        nextTier = 'Gold';
        amountToNextTier = goldThreshold - totalSpent;
        progressPercent = Math.min(100, ((totalSpent - silverThreshold) / (goldThreshold - silverThreshold)) * 100);
        break;
      case 'Gold':
        nextTier = 'VIP';
        amountToNextTier = vipThreshold - totalSpent;
        progressPercent = Math.min(100, ((totalSpent - goldThreshold) / (vipThreshold - goldThreshold)) * 100);
        break;
      case 'VIP':
        nextTier = null;
        amountToNextTier = 0;
        progressPercent = 100;
        break;
    }

    // 현재 등급 혜택
    let currentBonusRate = 1.00;
    let currentDiscountPercent = 0;

    switch (currentTier) {
      case 'Silver':
        currentBonusRate = parseFloat(settings.silver_bonus_rate);
        currentDiscountPercent = parseFloat(settings.silver_discount_percent);
        break;
      case 'Gold':
        currentBonusRate = parseFloat(settings.gold_bonus_rate);
        currentDiscountPercent = parseFloat(settings.gold_discount_percent);
        break;
      case 'VIP':
        currentBonusRate = parseFloat(settings.vip_bonus_rate);
        currentDiscountPercent = parseFloat(settings.vip_discount_percent);
        break;
      default:
        currentBonusRate = parseFloat(settings.bronze_bonus_rate);
        currentDiscountPercent = parseFloat(settings.bronze_discount_percent);
    }

    res.json({
      success: true,
      data: {
        customer: customerRelation.customer,
        current_tier: currentTier,
        total_spent: totalSpent,
        points: customerRelation.points,
        total_orders: customerRelation.total_orders,
        next_tier: nextTier,
        amount_to_next_tier: Math.max(0, amountToNextTier),
        progress_percent: Math.round(progressPercent * 100) / 100,
        benefits: {
          bonus_rate: currentBonusRate,
          discount_percent: currentDiscountPercent
        },
        thresholds: {
          silver: silverThreshold,
          gold: goldThreshold,
          vip: vipThreshold
        }
      }
    });
  } catch (error) {
    console.error('Get tier info error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get tier info'
    });
  }
});

// ========================================
// 포인트 사용 가능 금액 계산
// ========================================

/**
 * POST /api/membership/points/calculate-discount
 * 주문 시 사용 가능한 포인트 및 할인 금액 계산
 *
 * Body:
 * - restaurant_id: 레스토랑 ID
 * - customer_id: 고객 ID
 * - order_total: 주문 총액
 * - points_to_use: 사용하려는 포인트 (선택)
 */
router.post('/points/calculate-discount', async (req, res) => {
  try {
    const { restaurant_id, customer_id, order_total, points_to_use } = req.body;

    if (!restaurant_id || !customer_id || !order_total) {
      return res.status(400).json({
        success: false,
        message: 'restaurant_id, customer_id, and order_total are required'
      });
    }

    // 멤버십 설정 조회
    const settings = await MembershipSettings.findOne({
      where: { restaurant_id }
    });

    if (!settings || !settings.is_active) {
      return res.json({
        success: true,
        data: {
          available_points: 0,
          max_usable_points: 0,
          max_discount: 0,
          tier_discount_percent: 0,
          tier_discount_amount: 0,
          total_discount: 0,
          final_amount: order_total
        }
      });
    }

    // 고객 정보 조회
    const customerRelation = await RestaurantCustomer.findOne({
      where: { restaurant_id, customer_id }
    });

    if (!customerRelation) {
      return res.json({
        success: true,
        data: {
          available_points: 0,
          max_usable_points: 0,
          max_discount: 0,
          tier_discount_percent: 0,
          tier_discount_amount: 0,
          total_discount: 0,
          final_amount: order_total
        }
      });
    }

    // 등급별 할인율
    let tierDiscountPercent = 0;
    switch (customerRelation.loyalty_tier) {
      case 'Silver':
        tierDiscountPercent = parseFloat(settings.silver_discount_percent);
        break;
      case 'Gold':
        tierDiscountPercent = parseFloat(settings.gold_discount_percent);
        break;
      case 'VIP':
        tierDiscountPercent = parseFloat(settings.vip_discount_percent);
        break;
      default:
        tierDiscountPercent = parseFloat(settings.bronze_discount_percent);
    }

    // 등급 할인 금액
    const tierDiscountAmount = Math.floor(order_total * (tierDiscountPercent / 100));

    // 포인트 할인 계산
    const availablePoints = customerRelation.points;
    const maxPointsPercent = parseFloat(settings.max_points_per_order_percent);
    const maxPointsAmount = Math.floor(order_total * (maxPointsPercent / 100));
    const pointsToCurrency = parseFloat(settings.points_to_currency);
    const minPointsToUse = settings.min_points_to_use;

    // 최대 사용 가능 포인트 (주문액 제한과 보유 포인트 중 작은 값)
    const maxUsablePoints = Math.min(
      availablePoints,
      Math.floor(maxPointsAmount * pointsToCurrency)
    );

    // 실제 사용할 포인트
    let actualPointsToUse = 0;
    if (points_to_use && points_to_use >= minPointsToUse) {
      actualPointsToUse = Math.min(points_to_use, maxUsablePoints);
    }

    // 포인트 할인 금액
    const pointDiscountAmount = Math.floor(actualPointsToUse / pointsToCurrency);

    // 총 할인
    const totalDiscount = tierDiscountAmount + pointDiscountAmount;
    const finalAmount = Math.max(0, order_total - totalDiscount);

    res.json({
      success: true,
      data: {
        available_points: availablePoints,
        max_usable_points: maxUsablePoints,
        min_points_to_use: minPointsToUse,
        points_to_currency: pointsToCurrency,
        max_discount_percent: maxPointsPercent,
        points_to_use: actualPointsToUse,
        point_discount: pointDiscountAmount,
        tier: customerRelation.loyalty_tier,
        tier_discount_percent: tierDiscountPercent,
        tier_discount_amount: tierDiscountAmount,
        total_discount: totalDiscount,
        final_amount: finalAmount
      }
    });
  } catch (error) {
    console.error('Calculate discount error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate discount'
    });
  }
});

module.exports = router;
