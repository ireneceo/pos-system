// 공개 고객 인증/가입/비밀번호 재설정 라우트
// 마운트: /api/customers
// 보안: 모두 공개 (미들웨어 없음)

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { Customer, RestaurantCustomer, Restaurant } = require('../models');
const emailService = require('../utils/emailService');
const { emailLayout, getLogoAttachment } = require('../utils/emailTemplates');
const { signCustomerToken } = require('../utils/customerJwt');

// 재설정 토큰 저장소 (실제 운영에서는 Redis나 DB 사용 권장)
const resetTokens = new Map();

/**
 * POST /api/customers/auth
 * 고객 인증 (로그인)
 */
router.post('/auth', async (req, res) => {
  try {
    const { identifier, phone, password, restaurantId } = req.body;
    const loginIdentifier = identifier || phone;

    if (!loginIdentifier) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number is required'
      });
    }

    const isEmail = loginIdentifier.includes('@');
    let customer;

    if (isEmail) {
      customer = await Customer.findOne({ where: { email: loginIdentifier } });
    } else {
      const normalizedPhone = loginIdentifier.replace(/\D/g, '');
      customer = await Customer.findOne({
        where: {
          [Op.or]: [
            { phone: loginIdentifier },
            { phone: `+${normalizedPhone}` },
            { phone: normalizedPhone }
          ]
        }
      });
    }

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found. Please register first.'
      });
    }

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

    let restaurantInfo = null;
    if (restaurantId) {
      let relation = await RestaurantCustomer.findOne({
        where: {
          restaurant_id: restaurantId,
          customer_id: customer.id
        }
      });

      if (!relation) {
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

    const customerToken = signCustomerToken(customer);

    const customerData = {
      id: customer.id,
      phone: customer.phone,
      name: customer.name,
      email: customer.email,
      type: customer.type,
      token: customerToken,
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
 */
router.post('/register', async (req, res) => {
  try {
    const { phone, password, name, email, restaurantId } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        field: 'name',
        message: 'Name is required'
      });
    }

    if (!phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        field: 'phone',
        message: 'Phone number is required'
      });
    }

    if (email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          field: 'email',
          message: 'Please enter a valid email address'
        });
      }
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        field: 'password',
        message: 'Password must be at least 6 characters'
      });
    }

    const normalizedPhone = phone.replace(/\D/g, '');
    const existingByPhone = await Customer.findOne({
      where: {
        [Op.or]: [
          { phone: phone },
          { phone: `+${normalizedPhone}` },
          { phone: normalizedPhone }
        ],
        type: 'member'
      }
    });

    if (existingByPhone) {
      return res.status(400).json({
        success: false,
        field: 'phone',
        message: 'This phone number is already registered. Please login instead.'
      });
    }

    if (email && email.trim()) {
      const existingByEmail = await Customer.findOne({
        where: { email: email.trim().toLowerCase() }
      });

      if (existingByEmail) {
        return res.status(400).json({
          success: false,
          field: 'email',
          message: 'This email is already registered. Please login instead.'
        });
      }
    }

    const password_hash = password ? await bcrypt.hash(password, 10) : null;

    let customer = await Customer.findOne({
      where: {
        [Op.or]: [
          { phone: phone },
          { phone: `+${normalizedPhone}` },
          { phone: normalizedPhone }
        ],
        type: 'guest'
      }
    });

    const customerType = password_hash ? 'member' : 'guest';
    const customerEmail = (email && email.trim()) ? email.trim().toLowerCase() : null;

    if (customer) {
      const updateData = {
        name: name.trim(),
        phone,
        type: customerType
      };
      if (customerEmail) updateData.email = customerEmail;
      if (password_hash) updateData.password_hash = password_hash;
      await customer.update(updateData);
    } else {
      customer = await Customer.create({
        phone,
        name: name.trim(),
        email: customerEmail,
        password_hash,
        type: customerType
      });
    }

    let restaurantInfo = null;
    if (restaurantId) {
      let relation = await RestaurantCustomer.findOne({
        where: {
          restaurant_id: restaurantId,
          customer_id: customer.id
        }
      });

      if (!relation) {
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

    const customerToken = signCustomerToken(customer);

    const customerData = {
      id: customer.id,
      phone: customer.phone,
      name: customer.name,
      email: customer.email,
      type: customer.type,
      token: customerToken,
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

/**
 * GET /api/customers/verify-reset-token
 * 재설정 토큰 검증 — /:restaurantId 보다 먼저 정의되어야 함
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
      message: 'Token is valid',
      slug: tokenData.slug || null
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
 * POST /api/customers/find-email
 * 전화번호로 이메일 찾기 (마스킹된 이메일 반환)
 */
router.post('/find-email', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      });
    }

    const normalizedPhone = phone.replace(/\D/g, '');
    const customer = await Customer.findOne({
      where: {
        [Op.or]: [
          { phone: phone },
          { phone: `+${normalizedPhone}` },
          { phone: normalizedPhone }
        ],
        type: 'member'
      }
    });

    if (!customer || !customer.email) {
      return res.json({
        success: true,
        found: false,
        message: 'No account found with this phone number.'
      });
    }

    const email = customer.email;
    const [localPart, domain] = email.split('@');
    let maskedLocal;

    if (localPart.length <= 2) {
      maskedLocal = localPart[0] + '*';
    } else {
      maskedLocal = localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1];
    }

    const maskedEmail = `${maskedLocal}@${domain}`;

    res.json({
      success: true,
      found: true,
      maskedEmail,
      message: `Your email is ${maskedEmail}`
    });
  } catch (error) {
    console.error('Find email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to find email'
    });
  }
});

/**
 * POST /api/customers/forgot-password
 * 비밀번호 재설정 이메일 발송
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email, phone, slug } = req.body;

    console.log('🔑 [FORGOT-PASSWORD] Request:', { email: email || '(none)', phone: phone || '(none)', slug: slug || '(none)' });

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number is required'
      });
    }

    let restaurant = null;
    if (slug) {
      restaurant = await Restaurant.findOne({ where: { slug } });
    }

    let customer;
    if (email) {
      customer = await Customer.findOne({ where: { email } });
    } else if (phone) {
      const normalizedPhone = phone.replace(/\D/g, '');
      customer = await Customer.findOne({
        where: {
          [Op.or]: [
            { phone: phone },
            { phone: `+${normalizedPhone}` },
            { phone: normalizedPhone }
          ]
        }
      });
    }

    if (!customer || customer.type !== 'member') {
      return res.json({
        success: true,
        emailExists: false,
        message: 'No account found with this email address.'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000;

    resetTokens.set(resetToken, {
      customerId: customer.id,
      email: customer.email,
      expiry: tokenExpiry,
      slug: slug || null
    });

    setTimeout(() => {
      resetTokens.delete(resetToken);
    }, 3600000);

    let resetSlug = slug;
    if (!resetSlug) {
      const restaurantCustomer = await RestaurantCustomer.findOne({
        where: { customer_id: customer.id },
        include: [{ model: Restaurant, as: 'restaurant' }]
      });
      if (restaurantCustomer?.restaurant?.slug) {
        resetSlug = restaurantCustomer.restaurant.slug;
      }
    }

    const baseUrl = process.env.FRONTEND_URL || 'https://dev.purplehere.com';
    const resetLink = resetSlug
      ? `${baseUrl}/mobile/${resetSlug}/reset-password?token=${resetToken}`
      : `${baseUrl}/mobile/reset-password?token=${resetToken}`;

    try {
      // 1. 대상 레스토랑 결정 (slug 우선 → customer ↔ restaurant 관계 fallback)
      let targetRestaurant = restaurant;
      if (!targetRestaurant) {
        const rc = await RestaurantCustomer.findOne({
          where: { customer_id: customer.id },
          include: [{ model: Restaurant, as: 'restaurant' }]
        });
        targetRestaurant = rc?.restaurant || null;
      }

      // 2. 브랜딩 가져오기 (발송 SMTP와 무관하게 고객이 인식하는 브랜드 = 레스토랑)
      const { getEntityBranding } = require('../utils/emailBranding');
      const branding = targetRestaurant
        ? await getEntityBranding('restaurant', targetRestaurant.id)
        : null;
      const brandDisplayName = branding?.name || 'your restaurant';
      const brandColor = branding?.color || '#635BFF';

      // 3. 본문 (레스토랑 이름 명시, CTA 색상 브랜딩 반영)
      const resetBody = `
        <h2 style="color:#0A2540;font-size:20px;font-weight:600;margin:0 0 16px;">Password Reset Request</h2>
        <p style="color:#374151;font-size:14px;line-height:1.6;">Hi ${customer.name || 'there'},</p>
        <p style="color:#374151;font-size:14px;line-height:1.6;">We received a request to reset your password for your <strong>${brandDisplayName}</strong> account. Click the button below to create a new password:</p>
        <div style="text-align:center;margin:24px 0;">
          <a href="${resetLink}" style="display:inline-block;background:${brandColor};color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;font-size:15px;">Reset Password</a>
        </div>
        <p style="color:#6B7280;font-size:14px;">This link will expire in 1 hour.</p>
        <p style="color:#6B7280;font-size:14px;">If you didn't request this, you can safely ignore this email.</p>`;

      // 첨부: entity branding 있으면 entity 로고만, 없으면 PurpleHere 로고만
      // (둘 다 붙이면 Gmail 이 unreferenced attachment 를 본문 하단에 크게 표시)
      const attachments = branding?.logoAttachment
        ? branding.logoAttachment
        : getLogoAttachment();

      const mailOptions = {
        to: customer.email,
        subject: `Password Reset Request${branding ? ' - ' + branding.name : ''}`,
        html: emailLayout(resetBody, branding || undefined),
        attachments
      };

      // 4. 발송: 레스토랑 SMTP 있으면 그걸, 없으면 플랫폼 fallback
      if (targetRestaurant) {
        const result = await emailService.sendEntityOrPlatformEmail('restaurant', targetRestaurant.id, mailOptions);
        console.log(`✓ Password reset email sent to ${customer.email} via ${result.via} SMTP (restaurant #${targetRestaurant.id})`);
      } else {
        // 레스토랑 정보 없음 → 플랫폼 직접
        await emailService.sendPlatformEmail(mailOptions);
        console.log(`✓ Password reset email sent to ${customer.email} via platform SMTP (no restaurant context)`);
      }
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
    }

    res.json({
      success: true,
      emailExists: true,
      message: 'Password reset link has been sent to your email.'
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

    const customer = await Customer.findByPk(tokenData.customerId);
    if (!customer) {
      resetTokens.delete(token);
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const newPasswordHash = await bcrypt.hash(password, 10);
    await customer.update({ password_hash: newPasswordHash });

    resetTokens.delete(token);

    console.log(`✓ Password reset successful for customer ${customer.id}`);

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
