const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../middleware/errorHandler');

// 로그인
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email/Username and password are required', 400, 'MISSING_CREDENTIALS');
    }

    const result = await authService.login(email, password);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
});

// 회원가입
router.post('/register', async (req, res, next) => {
  try {
    const userData = req.body;

    if (!userData.email || !userData.password) {
      return errorResponse(res, 'Email and password are required', 400, 'MISSING_REQUIRED_FIELDS');
    }

    const result = await authService.register(userData);
    successResponse(res, result, 'Registration successful', 201);
  } catch (error) {
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-key');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return errorResponse(res, 'User not found', 401, 'USER_NOT_FOUND');
    }

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      restaurant_id: user.restaurant_id,
      manager_id: user.manager_id
    };

    successResponse(res, userData, 'User information retrieved');
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Invalid or expired token', 401, 'INVALID_TOKEN');
    }
    next(error);
  }
});

// 로그아웃
router.post('/logout', async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return errorResponse(res, 'Logout failed', 500, 'LOGOUT_ERROR');
      }
      res.clearCookie('connect.sid');
      successResponse(res, null, 'Logout successful');
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;