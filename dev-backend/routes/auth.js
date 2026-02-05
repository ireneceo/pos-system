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

    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      restaurant_id: user.restaurant_id,
      manager_id: user.manager_id,
      brand_id: user.brand_id,
      foodcourt_id: user.foodcourt_id
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