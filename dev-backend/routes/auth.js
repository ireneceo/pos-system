const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../middleware/errorHandler');
const { validateLogin, validateRegister } = require('../middleware/validation');

// Per-route rate limits — global apiLimiter (1000/15min) is too loose for
// signup/forgot-password (spam vector). Tight per-IP windows here.
const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  max: 10,
  message: { success: false, message: 'Too many signup attempts. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15min
  max: 5,
  message: { success: false, message: 'Too many password reset requests. Try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

// 로그인 (validateLogin 미들웨어로 입력 검증)
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    if (error.code === 'ACCOUNT_SUSPENDED') {
      return errorResponse(res, error.message, 403, 'ACCOUNT_SUSPENDED');
    }
    if (error.code === 'ACCOUNT_DEACTIVATED') {
      return errorResponse(res, error.message, 403, 'ACCOUNT_DEACTIVATED');
    }
    if (error.code === 'EMAIL_NOT_VERIFIED') {
      return res.status(403).json({
        success: false,
        error: { message: error.message, code: 'EMAIL_NOT_VERIFIED', email: error.email }
      });
    }
    if (error.message === 'Invalid email/username or password') {
      return errorResponse(res, error.message, 401, 'INVALID_CREDENTIALS');
    }
    next(error);
  }
});

// Quick demo / test login (no password — server resolves email by whitelist key).
// Used by LoginPage quick-login cards so passwords stay out of the bundle.
const demoLoginLimiter = rateLimit({
  windowMs: 60 * 1000, max: 30,
  message: { success: false, message: 'Too many demo-login attempts.' },
  standardHeaders: true, legacyHeaders: false
});

router.post('/demo-login', demoLoginLimiter, async (req, res, next) => {
  try {
    const { key } = req.body || {};
    if (typeof key !== 'string' || !key) {
      return errorResponse(res, 'key is required', 400, 'VALIDATION_ERROR');
    }
    const result = await authService.loginAsDemo(key);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    if (error.code === 'INVALID_DEMO_KEY') {
      return errorResponse(res, error.message, 400, 'INVALID_DEMO_KEY');
    }
    if (error.code === 'DEMO_ACCOUNT_MISSING') {
      return errorResponse(res, error.message, 404, 'DEMO_ACCOUNT_MISSING');
    }
    if (error.code === 'NOT_DEMO_ACCOUNT') {
      return errorResponse(res, error.message, 403, 'NOT_DEMO_ACCOUNT');
    }
    next(error);
  }
});

// 회원가입 (validateRegister 미들웨어로 입력 검증 + 강력한 비밀번호 정책)
router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await authService.register(userData);
    successResponse(res, result, 'Registration successful', 201);
  } catch (error) {
    next(error);
  }
});

// Self-signup (public endpoint)
router.post('/signup', signupLimiter, async (req, res, next) => {
  try {
    const { role, full_name, email, username, password, phone,
            restaurant_name, restaurant_address, restaurant_phone, restaurant_email,
            brand_name,
            foodcourt_name, foodcourt_address,
            company_name,
            supplier_name, invitation_token,
            plan_id, billing_cycle, currency,
            referral_code } = req.body;

    // Validate required fields
    if (!role || !full_name || !email || !username || !password || !plan_id) {
      return errorResponse(res, 'All required fields must be provided', 400, 'VALIDATION_ERROR');
    }

    // Validate allowed roles for self-signup
    const allowedRoles = ['Restaurant Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner', 'Supplier Admin'];
    if (!allowedRoles.includes(role)) {
      return errorResponse(res, 'Invalid account type', 400, 'VALIDATION_ERROR');
    }

    // Role-specific field validation
    if (role === 'Restaurant Admin' && !restaurant_name) {
      return errorResponse(res, 'Restaurant name is required', 400, 'VALIDATION_ERROR');
    }
    if (role === 'Brand General' && !brand_name) {
      return errorResponse(res, 'Brand name is required', 400, 'VALIDATION_ERROR');
    }
    if (role === 'Foodcourt General' && !foodcourt_name) {
      return errorResponse(res, 'Food court name is required', 400, 'VALIDATION_ERROR');
    }
    if (role === 'Supplier Admin' && !supplier_name) {
      return errorResponse(res, 'Supplier name is required', 400, 'VALIDATION_ERROR');
    }

    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return errorResponse(res, 'Password must be at least 8 characters with uppercase, lowercase, and number', 400, 'VALIDATION_ERROR');
    }

    // Username format validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(username)) {
      return errorResponse(res, 'Username must be 3-30 characters (letters, numbers, underscore only)', 400, 'VALIDATION_ERROR');
    }

    const result = await authService.signup({
      role, full_name, email, username, password, phone,
      restaurant_name, restaurant_address, restaurant_phone, restaurant_email,
      brand_name,
      foodcourt_name, foodcourt_address,
      company_name,
      supplier_name, invitation_token,
      plan_id, billing_cycle, currency,
      referral_code
    });

    successResponse(res, result, 'Account created successfully', 201);
  } catch (error) {
    if (error.message.includes('already registered') || error.message.includes('already taken')) {
      return errorResponse(res, error.message, 409, 'DUPLICATE_ERROR');
    }
    if (error.message.includes('not available') || error.message.includes('Invalid account type')) {
      return errorResponse(res, error.message, 400, 'VALIDATION_ERROR');
    }
    if (error.message.includes('does not have a mail server') || error.message.includes('Invalid email format')) {
      return errorResponse(res, error.message, 400, 'INVALID_EMAIL_DOMAIN');
    }
    next(error);
  }
});

// Self-signup for Referral Partner (no plan, no entity, no trial)
router.post('/referral-signup', signupLimiter, async (req, res, next) => {
  try {
    const { full_name, email, username, password, phone, referral_code } = req.body;

    if (!full_name || !email || !username || !password) {
      return errorResponse(res, 'Full name, email, username and password are required', 400, 'VALIDATION_ERROR');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return errorResponse(res, 'Password must be at least 8 characters with uppercase, lowercase, and number', 400, 'VALIDATION_ERROR');
    }

    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
    if (!usernameRegex.test(username)) {
      return errorResponse(res, 'Username must be 3-30 characters (letters, numbers, underscore only)', 400, 'VALIDATION_ERROR');
    }

    const result = await authService.signupReferralPartner({
      full_name, email, username, password, phone, referral_code
    });

    successResponse(res, result, 'Referral Partner account created successfully', 201);
  } catch (error) {
    if (error.message.includes('already registered') || error.message.includes('already taken')) {
      return errorResponse(res, error.message, 409, 'DUPLICATE_ERROR');
    }
    if (error.message.includes('does not have a mail server') || error.message.includes('Invalid email format')) {
      return errorResponse(res, error.message, 400, 'INVALID_EMAIL_DOMAIN');
    }
    next(error);
  }
});

// Public: validate invitation token + return prefill data (Sprint 1 — Supplier Admin signup A flow)
router.get('/invitation/:token', async (req, res) => {
  try {
    const SupplierInvitation = require('../models/SupplierInvitation');
    const PlanTemplate = require('../models/PlanTemplate');
    const invitation = await SupplierInvitation.findOne({
      where: { token: req.params.token },
      include: [{ model: PlanTemplate, as: 'plan', attributes: ['id', 'name', 'display_name'] }]
    });
    if (!invitation) {
      return errorResponse(res, 'Invalid invitation', 404, 'INVITATION_NOT_FOUND');
    }
    if (invitation.status === 'used') {
      return errorResponse(res, 'Invitation already used', 400, 'INVITATION_USED');
    }
    if (invitation.status === 'revoked') {
      return errorResponse(res, 'Invitation revoked', 400, 'INVITATION_REVOKED');
    }
    if (invitation.expires_at < new Date()) {
      return errorResponse(res, 'Invitation expired', 400, 'INVITATION_EXPIRED');
    }
    successResponse(res, {
      email: invitation.email,
      supplier_name: invitation.supplier_name,
      plan: invitation.plan,
      expires_at: invitation.expires_at
    });
  } catch (e) {
    console.error('GET /auth/invitation/:token:', e);
    errorResponse(res, e.message, 500);
  }
});

// 현재 사용자 정보 조회 (JWT 토큰 확인)
router.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return errorResponse(res, 'No token provided', 401, 'NOT_AUTHENTICATED');
    }

    const jwt = require('jsonwebtoken');
    const User = require('../models/User');

    if (!process.env.JWT_SECRET) {
      return errorResponse(res, 'Server configuration error', 500, 'CONFIG_ERROR');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return errorResponse(res, 'User not found', 401, 'USER_NOT_FOUND');
    }

    // permissions 파싱 (JSON string → array)
    let permissions = [];
    if (user.permissions) {
      try {
        permissions = typeof user.permissions === 'string'
          ? JSON.parse(user.permissions)
          : user.permissions;
      } catch (e) {
        permissions = [];
      }
    }

    // Resolve supplier_company_id for supplier roles (Admin via owner_id reverse FK)
    let supplierCompanyId = user.supplier_company_id || null;
    if (!supplierCompanyId && user.role === 'Supplier Admin') {
      const SupplierCompany = require('../models/SupplierCompany');
      const sc = await SupplierCompany.findOne({ where: { owner_id: user.id }, attributes: ['id'] });
      if (sc) supplierCompanyId = sc.id;
    }

    // Resolve restaurant.status for RA/Staff so the frontend can pin suspended
    // accounts to the invoice page (rather than blocking login outright).
    // Demo / test restaurants are reported but flagged so the frontend can
    // exclude them from the invoice-page pin.
    let restaurantStatus = null;
    let restaurantName = null;
    let restaurantIsDemo = false;
    let restaurantIsTest = false;
    if (user.restaurant_id) {
      const Restaurant = require('../models/Restaurant');
      const r = await Restaurant.findByPk(user.restaurant_id, {
        attributes: ['status', 'name', 'is_demo', 'is_test']
      });
      if (r) {
        restaurantStatus = r.status;
        restaurantName = r.name;
        restaurantIsDemo = !!r.is_demo;
        restaurantIsTest = !!r.is_test;
      }
    }

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      restaurant_id: user.restaurant_id,
      manager_id: user.manager_id,
      brand_id: user.brand_id,
      foodcourt_id: user.foodcourt_id,
      supplier_company_id: supplierCompanyId,
      subscription_status: user.subscription_status || null,
      plan_type: user.plan_type || null,
      plan_amount: user.plan_amount || null,
      billing_cycle: user.billing_cycle || null,
      subscription_start: user.subscription_start || null,
      subscription_end: user.subscription_end || null,
      restaurantStatus,
      restaurantName,
      restaurantIsDemo,
      restaurantIsTest,
      is_demo: !!user.is_demo,
      is_test: !!user.is_test,
      email_verified: !!user.email_verified,   // 프론트 미인증 안내 배너용
      preferred_language: user.preferred_language || 'en',
      permissions
    };

    successResponse(res, userData, 'User information retrieved');
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Invalid or expired token', 401, 'INVALID_TOKEN');
    }
    next(error);
  }
});

// Forgot password - send reset email
router.post('/forgot-password', forgotPasswordLimiter, async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return errorResponse(res, 'Email is required', 400, 'VALIDATION_ERROR');
    }

    const crypto = require('crypto');
    const bcrypt = require('bcrypt');
    const User = require('../models/User');
    const { sendPlatformEmail } = require('../utils/emailService');
    const { passwordResetEmail } = require('../utils/emailTemplates');

    const user = await User.findOne({
      where: { email: email.toLowerCase().trim() }
    });

    // Always return success (don't reveal if email exists)
    if (!user) {
      return successResponse(res, null, 'If an account with that email exists, a password reset link has been sent.');
    }

    // Don't allow reset for demo accounts
    if (user.is_demo) {
      return successResponse(res, null, 'If an account with that email exists, a password reset link has been sent.');
    }

    // Generate token
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(rawToken, 10);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await user.update({
      reset_token: hashedToken,
      reset_token_expires: expiresAt
    });

    // Build reset URL
    const baseUrl = process.env.FRONTEND_URL || 'https://dev.purplehere.com';
    const resetUrl = `${baseUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(user.email)}`;

    const emailData = passwordResetEmail({
      fullName: user.full_name,
      resetUrl,
      expiresInMinutes: 60
    });

    // Send email (non-blocking)
    sendPlatformEmail({
      to: user.email,
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text
    }).catch(err => {
      console.error('[ForgotPassword] Email send failed:', err.message);
    });

    successResponse(res, null, 'If an account with that email exists, a password reset link has been sent.');
  } catch (error) {
    next(error);
  }
});

// Reset password with token
router.post('/reset-password', forgotPasswordLimiter, async (req, res, next) => {
  try {
    const { email, token, password } = req.body;
    if (!email || !token || !password) {
      return errorResponse(res, 'All fields are required', 400, 'VALIDATION_ERROR');
    }

    // Password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      return errorResponse(res, 'Password must be at least 8 characters with uppercase, lowercase, and number', 400, 'VALIDATION_ERROR');
    }

    const bcrypt = require('bcrypt');
    const { Op } = require('sequelize');
    const User = require('../models/User');

    const user = await User.findOne({
      where: {
        email: email.toLowerCase().trim(),
        reset_token: { [Op.ne]: null },
        reset_token_expires: { [Op.gt]: new Date() }
      }
    });

    if (!user) {
      return errorResponse(res, 'Invalid or expired reset link. Please request a new one.', 400, 'INVALID_TOKEN');
    }

    // Verify token against hash
    const isValid = await bcrypt.compare(token, user.reset_token);
    if (!isValid) {
      return errorResponse(res, 'Invalid or expired reset link. Please request a new one.', 400, 'INVALID_TOKEN');
    }

    // Update password and clear token
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({
      password: hashedPassword,
      reset_token: null,
      reset_token_expires: null
    });

    successResponse(res, null, 'Password has been reset successfully. You can now log in.');
  } catch (error) {
    next(error);
  }
});

// 로그아웃
router.post('/logout', async (req, res, next) => {
  try {
    // 세션이 없는 경우에도 정상 처리
    if (!req.session) {
      res.clearCookie('connect.sid');
      return successResponse(res, null, 'Logout successful');
    }

    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        // 에러가 발생해도 쿠키는 삭제하고 성공 응답
        res.clearCookie('connect.sid');
        return successResponse(res, null, 'Logout successful');
      }
      res.clearCookie('connect.sid');
      successResponse(res, null, 'Logout successful');
    });
  } catch (error) {
    // 예외 발생 시에도 쿠키 삭제 후 성공 응답
    res.clearCookie('connect.sid');
    successResponse(res, null, 'Logout successful');
  }
});

// ============================================
// Email Verification
// ============================================

const { verifyMxRecord, generateVerificationToken, verifyToken, getVerificationUrl } = require('../utils/emailValidator');
const { emailVerificationEmail } = require('../utils/notificationTemplates');
const { sendPlatformEmail } = require('../utils/emailService');
const User = require('../models/User');

/**
 * 이메일 인증 링크 클릭 시
 * GET /api/auth/verify-email?token=...&email=...
 */
router.get('/verify-email', async (req, res) => {
  try {
    const { token, email } = req.query;
    if (!token || !email) {
      return errorResponse(res, 'Token and email are required', 400);
    }

    const user = await User.findOne({ where: { email: decodeURIComponent(email) } });
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    if (user.email_verified) {
      return successResponse(res, { already_verified: true }, 'Email already verified');
    }

    if (!user.email_verification_token || !user.email_verification_expires) {
      return errorResponse(res, 'No verification token found. Please request a new one.', 400);
    }

    if (new Date() > new Date(user.email_verification_expires)) {
      return errorResponse(res, 'Verification link has expired. Please request a new one.', 400);
    }

    const isValid = await verifyToken(decodeURIComponent(token), user.email_verification_token);
    if (!isValid) {
      return errorResponse(res, 'Invalid verification token', 400);
    }

    await user.update({
      email_verified: true,
      email_verification_token: null,
      email_verification_expires: null
    });

    successResponse(res, { verified: true }, 'Email verified successfully');
  } catch (error) {
    console.error('[AUTH] Email verification error:', error.message);
    errorResponse(res, 'Verification failed', 500);
  }
});

/**
 * 인증 이메일 재발송
 * POST /api/auth/resend-verification
 */
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return errorResponse(res, 'Email is required', 400);
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // 보안: 유저 존재 여부 노출하지 않음
      return successResponse(res, null, 'If an account exists with this email, a verification link has been sent.');
    }

    if (user.email_verified) {
      return successResponse(res, { already_verified: true }, 'Email is already verified');
    }

    // 쿨다운: 마지막 토큰 생성 후 1분 이내면 거부
    if (user.email_verification_expires) {
      const tokenCreatedAt = new Date(user.email_verification_expires).getTime() - 24 * 60 * 60 * 1000;
      if (Date.now() - tokenCreatedAt < 60 * 1000) {
        return errorResponse(res, 'Please wait 1 minute before requesting another verification email', 429);
      }
    }

    const { rawToken, hashedToken, expires } = await generateVerificationToken();
    await user.update({
      email_verification_token: hashedToken,
      email_verification_expires: expires
    });

    const verificationUrl = getVerificationUrl(rawToken, user.email);
    const emailContent = emailVerificationEmail(user.full_name || user.username, verificationUrl);

    try {
      await sendPlatformEmail({
        to: user.email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text,
        allowUnverified: true   // 재인증 메일도 미인증 주소(본인)에 도달해야 함
      });
    } catch (emailError) {
      console.error('[AUTH] Failed to send verification email:', emailError.message);
    }

    successResponse(res, null, 'If an account exists with this email, a verification link has been sent.');
  } catch (error) {
    console.error('[AUTH] Resend verification error:', error.message);
    errorResponse(res, 'Failed to resend verification email', 500);
  }
});

module.exports = router;