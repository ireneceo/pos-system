const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../middleware/errorHandler');
const { validateLogin, validateRegister } = require('../middleware/validation');

// 로그인 (validateLogin 미들웨어로 입력 검증)
router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    if (error.message === 'Invalid email/username or password') {
      return errorResponse(res, error.message, 401, 'INVALID_CREDENTIALS');
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
router.post('/signup', async (req, res, next) => {
  try {
    const { role, full_name, email, username, password, phone,
            restaurant_name, restaurant_address, restaurant_phone, restaurant_email,
            brand_name,
            foodcourt_name, foodcourt_address,
            company_name,
            plan_id, billing_cycle, currency } = req.body;

    // Validate required fields
    if (!role || !full_name || !email || !username || !password || !plan_id) {
      return errorResponse(res, 'All required fields must be provided', 400, 'VALIDATION_ERROR');
    }

    // Validate allowed roles for self-signup
    const allowedRoles = ['Restaurant Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner'];
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
      plan_id, billing_cycle, currency
    });

    successResponse(res, result, 'Account created successfully', 201);
  } catch (error) {
    if (error.message.includes('already registered') || error.message.includes('already taken')) {
      return errorResponse(res, error.message, 409, 'DUPLICATE_ERROR');
    }
    if (error.message.includes('not available') || error.message.includes('Invalid account type')) {
      return errorResponse(res, error.message, 400, 'VALIDATION_ERROR');
    }
    next(error);
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

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      restaurant_id: user.restaurant_id,
      manager_id: user.manager_id,
      brand_id: user.brand_id,
      foodcourt_id: user.foodcourt_id,
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
router.post('/forgot-password', async (req, res, next) => {
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
router.post('/reset-password', async (req, res, next) => {
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

module.exports = router;