const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Customer, RestaurantCustomer, Restaurant, Order } = require('../models');
const { Op } = require('sequelize');
const emailService = require('../utils/emailService');

// ========================================
// 고객 인증 (전화번호 기반)
// ========================================

/**
 * POST /api/customers/auth
 * 고객 인증 (로그인)
 *
 * Body:
 * - phone: 전화번호 (필수)
 * - password: 비밀번호 (회원인 경우)
 * - restaurantId: 레스토랑 ID (선택) - 레스토랑별 포인트/등급 조회용
 */
router.post('/auth', async (req, res) => {
  try {
    const { phone, password, restaurantId } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    // 1. 고객 찾기
    let customer = await Customer.findOne({ where: { phone } });

    if (!customer) {
      // 고객이 존재하지 않음 - 로그인 실패
      return res.status(404).json({
        success: false,
        message: 'Customer not found. Please register first.'
      });
    }

    // 2. 비밀번호 검증 (회원인 경우)
    if (customer.type === 'member') {
      if (!password) {
        return res.status(400).json({
          success: false,
          message: 'Password is required for member login'
        });
      }

      const isPasswordValid = await bcrypt.compare(password, customer.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid password'
        });
      }
    }
    // 게스트는 전화번호만으로 로그인 가능

    // 3. 레스토랑별 정보 조회 (restaurantId 제공된 경우)
    let restaurantInfo = null;
    if (restaurantId) {
      let relation = await RestaurantCustomer.findOne({
        where: {
          restaurant_id: restaurantId,
          customer_id: customer.id
        }
      });

      if (!relation) {
        // 이 레스토랑에서 첫 로그인 - 관계 생성
        relation = await RestaurantCustomer.create({
          restaurant_id: restaurantId,
          customer_id: customer.id,
          points: 0,
          total_orders: 0,
          total_spent: 0,
          loyalty_tier: 'Bronze',
          first_order_at: new Date()
        });
      }

      restaurantInfo = {
        points: relation.points,
        totalOrders: relation.total_orders,
        totalSpent: relation.total_spent,
        loyaltyTier: relation.loyalty_tier
      };
    }

    // 4. 고객 정보 반환 (비밀번호 제외)
    const customerData = {
      id: customer.id,
      phone: customer.phone,
      name: customer.name,
      email: customer.email,
      type: customer.type,
      // 레스토랑별 정보 포함
      points: restaurantInfo?.points || 0,
      totalOrders: restaurantInfo?.totalOrders || 0,
      totalSpent: restaurantInfo?.totalSpent || 0,
      loyaltyTier: restaurantInfo?.loyaltyTier || 'Bronze'
    };

    res.json({
      success: true,
      data: customerData
    });
  } catch (error) {
    console.error('Customer auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to authenticate customer'
    });
  }
});

/**
 * POST /api/customers/register
 * 게스트 → 회원 전환 or 신규 회원가입
 *
 * Body:
 * - phone: 전화번호 (필수)
 * - password: 비밀번호 (필수)
 * - name: 이름 (필수)
 * - email: 이메일 (선택)
 * - restaurantId: 레스토랑 ID (선택) - 레스토랑별 포인트/등급 조회용
 */
router.post('/register', async (req, res) => {
  try {
    const { phone, password, name, email, restaurantId } = req.body;

    // 🔍 DEBUG: 받은 데이터 로깅
    console.log('📝 Registration Request:');
    console.log('   Phone:', phone);
    console.log('   Name:', name);
    console.log('   Email:', email);
    console.log('   Password:', password ? `[${password.length} chars]` : 'MISSING');
    console.log('   Restaurant ID:', restaurantId);

    if (!phone || !password || !name) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Phone, password, and name are required'
      });
    }

    // 비밀번호 해시
    const password_hash = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed successfully');

    // 기존 고객 확인
    let customer = await Customer.findOne({ where: { phone } });

    if (customer) {
      // 이미 회원인 경우
      if (customer.type === 'member') {
        return res.status(400).json({
          success: false,
          message: 'Customer already registered as member'
        });
      }

      // 게스트 → 회원 전환
      await customer.update({
        name,
        email,
        password_hash,
        type: 'member'
      });
    } else {
      // 신규 회원 생성
      customer = await Customer.create({
        phone,
        name,
        email,
        password_hash,
        type: 'member'
      });
    }

    // 레스토랑별 정보 조회 및 생성
    let restaurantInfo = null;
    if (restaurantId) {
      let relation = await RestaurantCustomer.findOne({
        where: {
          restaurant_id: restaurantId,
          customer_id: customer.id
        }
      });

      if (!relation) {
        // 이 레스토랑에서 첫 등록 - 관계 생성
        relation = await RestaurantCustomer.create({
          restaurant_id: restaurantId,
          customer_id: customer.id,
          points: 0,
          total_orders: 0,
          total_spent: 0,
          loyalty_tier: 'Bronze',
          first_order_at: new Date()
        });
      }

      restaurantInfo = {
        points: relation.points,
        totalOrders: relation.total_orders,
        totalSpent: relation.total_spent,
        loyaltyTier: relation.loyalty_tier
      };
    }

    const customerData = {
      id: customer.id,
      phone: customer.phone,
      name: customer.name,
      email: customer.email,
      type: customer.type,
      // 레스토랑별 정보 포함
      points: restaurantInfo?.points || 0,
      totalOrders: restaurantInfo?.totalOrders || 0,
      totalSpent: restaurantInfo?.totalSpent || 0,
      loyaltyTier: restaurantInfo?.loyaltyTier || 'Bronze'
    };

    res.json({
      success: true,
      data: customerData,
      message: 'Member registered successfully'
    });
  } catch (error) {
    console.error('Customer registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register customer'
    });
  }
});

// ========================================
// 고객 조회
// ========================================

/**
 * GET /api/customers/phone/:phone
 * 전화번호로 고객 조회 (모든 레스토랑 관계 포함)
 */
router.get('/phone/:phone', async (req, res) => {
  try {
    const { phone } = req.params;

    const customer = await Customer.findOne({
      where: { phone },
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
 * GET /api/customers/stats/:customerId
 * 고객 통계 조회
 */
router.get('/stats/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { restaurant_id } = req.query;

    if (!restaurant_id) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant ID is required'
      });
    }

    const relation = await RestaurantCustomer.findOne({
      where: {
        customer_id: customerId,
        restaurant_id: restaurant_id
      }
    });

    if (!relation) {
      // 관계가 없으면 기본값 반환
      return res.json({
        success: true,
        data: {
          total_orders: 0,
          total_spent: '0',
          points: 0,
          loyalty_tier: 'Bronze'
        }
      });
    }

    res.json({
      success: true,
      data: {
        total_orders: relation.total_orders,
        total_spent: relation.total_spent,
        points: relation.points,
        loyalty_tier: relation.loyalty_tier
      }
    });
  } catch (error) {
    console.error('Get customer stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer stats'
    });
  }
});

/**
 * GET /api/customers/:restaurantId
 * 레스토랑의 고객 목록 조회
 */
router.get('/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { search, tier, type } = req.query;

    const whereClause = {};
    if (search) {
      whereClause[Op.or] = [
        { '$customer.name$': { [Op.like]: `%${search}%` } },
        { '$customer.phone$': { [Op.like]: `%${search}%` } },
        { '$customer.email$': { [Op.like]: `%${search}%` } }
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

    res.json({
      success: true,
      data: customers
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
router.get('/:restaurantId/:customerId', async (req, res) => {
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

    // 주문 이력 조회
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

// ========================================
// 고객 정보 업데이트
// ========================================

/**
 * PUT /api/customers/:customerId
 * 고객 정보 업데이트
 */
router.put('/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { name, email } = req.body;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    await customer.update({ name, email });

    res.json({
      success: true,
      data: {
        id: customer.id,
        phone: customer.phone,
        name: customer.name,
        email: customer.email,
        type: customer.type
      }
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer'
    });
  }
});

// ========================================
// 포인트 관리
// ========================================

/**
 * POST /api/customers/:restaurantId/:customerId/points
 * 포인트 적립/사용
 *
 * Body:
 * - points: 포인트 (양수=적립, 음수=사용)
 * - reason: 사유
 */
router.post('/:restaurantId/:customerId/points', async (req, res) => {
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

// ========================================
// 고객 삭제
// ========================================

/**
 * DELETE /api/customers/:customerId
 * 고객 삭제
 */
router.delete('/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // 관련된 레스토랑 관계도 모두 삭제
    await RestaurantCustomer.destroy({
      where: { customer_id: customerId }
    });

    // 고객 정보 삭제
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

// ========================================
// 비밀번호 변경
// ========================================

/**
 * PUT /api/customers/:customerId/password
 * 비밀번호 변경 (로그인 상태에서)
 */
router.put('/:customerId/password', async (req, res) => {
  try {
    const { customerId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters'
      });
    }

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    if (customer.type !== 'member' || !customer.password_hash) {
      return res.status(400).json({
        success: false,
        message: 'Password change is only available for members'
      });
    }

    // 현재 비밀번호 확인
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, customer.password_hash);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // 새 비밀번호 해시 및 저장
    const newPasswordHash = await bcrypt.hash(newPassword, 10);
    await customer.update({ password_hash: newPasswordHash });

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

// ========================================
// 비밀번호 재설정 (이메일 기반)
// ========================================

// 재설정 토큰 저장소 (실제 운영에서는 Redis나 DB 사용 권장)
const resetTokens = new Map();

/**
 * POST /api/customers/forgot-password
 * 비밀번호 재설정 이메일 발송
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // 이메일로 고객 찾기
    const customer = await Customer.findOne({ where: { email } });

    // 보안: 이메일 존재 여부와 관계없이 동일한 응답
    if (!customer || customer.type !== 'member') {
      // 이메일이 없어도 성공 응답 (이메일 열거 공격 방지)
      return res.json({
        success: true,
        message: 'If an account exists with this email, a reset link has been sent.'
      });
    }

    // 재설정 토큰 생성
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1시간 후 만료

    // 토큰 저장
    resetTokens.set(resetToken, {
      customerId: customer.id,
      email: customer.email,
      expiry: tokenExpiry
    });

    // 1시간 후 토큰 자동 삭제
    setTimeout(() => {
      resetTokens.delete(resetToken);
    }, 3600000);

    // 재설정 링크 생성
    const resetLink = `${process.env.FRONTEND_URL || 'https://dev.purplehere.com'}/mobile/reset-password?token=${resetToken}`;

    // 이메일 발송 시도
    try {
      // 레스토랑 정보 조회 (이메일 설정용) - 고객이 속한 레스토랑 또는 기본 레스토랑 (ID=1) 사용
      let restaurantId = null;

      const restaurantCustomer = await RestaurantCustomer.findOne({
        where: { customer_id: customer.id },
        include: [{ model: Restaurant, as: 'restaurant' }]
      });

      if (restaurantCustomer?.restaurant) {
        restaurantId = restaurantCustomer.restaurant.id;
      } else {
        // 기본 레스토랑 사용
        restaurantId = 1;
      }

      await emailService.sendEmail('restaurant', restaurantId, {
        to: customer.email,
        subject: 'Password Reset Request - Purple Here',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1F2937;">Password Reset Request</h2>
            <p style="color: #4B5563;">Hi ${customer.name || 'there'},</p>
            <p style="color: #4B5563;">We received a request to reset your password. Click the button below to create a new password:</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetLink}" style="background: #635BFF; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">Reset Password</a>
            </div>
            <p style="color: #6B7280; font-size: 14px;">This link will expire in 1 hour.</p>
            <p style="color: #6B7280; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;">
            <p style="color: #9CA3AF; font-size: 12px;">This email was sent by Purple Here POS</p>
          </div>
        `
      });
      console.log(`✅ Password reset email sent to ${customer.email}`);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // 이메일 발송 실패해도 성공 응답 (보안)
    }

    res.json({
      success: true,
      message: 'If an account exists with this email, a reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process request'
    });
  }
});

/**
 * GET /api/customers/verify-reset-token
 * 재설정 토큰 검증
 */
router.get('/verify-reset-token', async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        valid: false,
        message: 'Token is required'
      });
    }

    const tokenData = resetTokens.get(token);

    if (!tokenData) {
      return res.json({
        valid: false,
        message: 'Invalid or expired token'
      });
    }

    if (Date.now() > tokenData.expiry) {
      resetTokens.delete(token);
      return res.json({
        valid: false,
        message: 'Token has expired'
      });
    }

    res.json({
      valid: true,
      message: 'Token is valid'
    });
  } catch (error) {
    console.error('Verify reset token error:', error);
    res.status(500).json({
      valid: false,
      message: 'Failed to verify token'
    });
  }
});

/**
 * POST /api/customers/reset-password
 * 비밀번호 재설정 (토큰 기반)
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }

    const tokenData = resetTokens.get(token);

    if (!tokenData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    if (Date.now() > tokenData.expiry) {
      resetTokens.delete(token);
      return res.status(400).json({
        success: false,
        message: 'Token has expired'
      });
    }

    // 고객 찾기
    const customer = await Customer.findByPk(tokenData.customerId);
    if (!customer) {
      resetTokens.delete(token);
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    // 새 비밀번호 해시 및 저장
    const newPasswordHash = await bcrypt.hash(password, 10);
    await customer.update({ password_hash: newPasswordHash });

    // 토큰 삭제 (사용 완료)
    resetTokens.delete(token);

    console.log(`✅ Password reset successful for customer ${customer.id}`);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reset password'
    });
  }
});

module.exports = router;
