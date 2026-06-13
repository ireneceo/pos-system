const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// Apply authentication to all routes
router.use(authenticateToken);

// Get all staff for a restaurant
router.get('/', async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    const staff = await User.findAll({
      where: {
        restaurant_id: restaurantId,
        role: ['Restaurant Admin', 'Staff']
      },
      attributes: ['id', 'username', 'email', 'full_name', 'role', 'department', 'phone', 'pin_code', 'createdAt']
    });

    res.json({
      success: true,
      data: staff
    });
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Verify PIN for POS cashier quick switch (실제 로그인 전환 - JWT 재발급)
router.post('/verify-pin', async (req, res) => {
  try {
    const { pin_code } = req.body;
    const restaurantId = req.body.restaurant_id || req.user.restaurant_id;

    if (!pin_code || !restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'PIN code and restaurant ID are required', code: 'VALIDATION_ERROR' } });
    }

    const staff = await User.findOne({
      where: {
        restaurant_id: restaurantId,
        pin_code: pin_code,
        role: ['Restaurant Admin', 'Staff']
      },
      attributes: ['id', 'full_name', 'role', 'department', 'email', 'username',
        'brand_id', 'foodcourt_id', 'restaurant_id', 'manager_id', 'permissions']
    });

    if (!staff) {
      return res.status(401).json({ success: false, error: { message: 'Invalid PIN', code: 'UNAUTHORIZED' } });
    }

    // JWT 발급 (authService.js와 동일 패턴)
    const token = jwt.sign({
      userId: staff.id,
      email: staff.email,
      role: staff.role,
      username: staff.username,
      brand_id: staff.brand_id,
      foodcourt_id: staff.foodcourt_id,
      restaurant_id: staff.restaurant_id,
      manager_id: staff.manager_id
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });

    // permissions 파싱 (JSON string → array)
    let permissions = [];
    if (staff.permissions) {
      try {
        permissions = typeof staff.permissions === 'string'
          ? JSON.parse(staff.permissions)
          : staff.permissions;
      } catch (e) {
        permissions = [];
      }
    }

    res.json({
      success: true,
      data: {
        id: staff.id,
        name: staff.full_name || staff.email,
        role: staff.role,
        department: staff.department
      },
      token,
      user: {
        id: staff.id,
        email: staff.email,
        role: staff.role,
        username: staff.username,
        name: staff.full_name || staff.email,
        restaurant_id: staff.restaurant_id,
        manager_id: staff.manager_id,
        brand_id: staff.brand_id,
        foodcourt_id: staff.foodcourt_id,
        permissions
      }
    });
  } catch (error) {
    console.error('Error verifying PIN:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 할인 승인 PIN 검증 (#5) — 경량. JWT 재발급/세션 전환 없이 PIN 이 해당 권한 가진 직원인지만 확인.
// 반환 { authorized, by }. 감사로그 남김. 하드코딩 MANAGER123 대체.
router.post('/verify-pin-permission', async (req, res) => {
  try {
    const { pin_code, permission } = req.body;
    const restaurantId = req.body.restaurant_id || req.user.restaurant_id;
    if (!pin_code || !restaurantId) {
      return res.status(400).json({ success: false, message: 'PIN code and restaurant ID are required' });
    }
    const staff = await User.findOne({
      where: { restaurant_id: restaurantId, pin_code },
      attributes: ['id', 'full_name', 'email', 'role', 'permissions']
    });
    if (!staff) {
      return res.json({ success: true, data: { authorized: false } });
    }
    // 권한: Admin/Owner/Manager 는 자동 허용, 그 외엔 permissions 에 해당 권한 보유 시.
    const privilegedRoles = ['Restaurant Admin', 'Restaurant Owner', 'Restaurant Manager', 'Manager', 'System Admin'];
    let perms = [];
    try { perms = typeof staff.permissions === 'string' ? JSON.parse(staff.permissions) : (staff.permissions || []); } catch { perms = []; }
    const wanted = permission || 'discount_authorize';
    const authorized = privilegedRoles.includes(staff.role) || (Array.isArray(perms) && perms.includes(wanted));

    // 감사로그 (ActivityLog 있으면)
    try {
      const { ActivityLog } = require('../models');
      if (ActivityLog) {
        // 감사 라벨을 권한별로 구분 (void_authorize → void_pin_*, 그 외 → discount_pin_*).
        const labelBase = wanted === 'void_authorize' ? 'void_pin' : 'discount_pin';
        await ActivityLog.create({
          restaurant_id: restaurantId,
          user_id: req.user.id,
          action: authorized ? `${labelBase}_approved` : `${labelBase}_denied`,
          details: JSON.stringify({ approver_id: staff.id, approver: staff.full_name || staff.email, permission: wanted, requested_by: req.user.id })
        });
      }
    } catch (e) { /* non-fatal */ }

    return res.json({ success: true, data: { authorized, by: authorized ? (staff.full_name || staff.email) : null } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Staff logout (placeholder)
router.post('/logout', async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logged out'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
