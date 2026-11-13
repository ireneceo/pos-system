const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');

// PIN 로그인 (P1-4) — 공용 POS 단말 1차 로그인. 토큰이 없는 익명 상태에서 호출되므로
// 반드시 router.use(authenticateToken) "위"에 두어 공개로 노출한다. (server.js 의 pinLimiter
// 가 브루트포스 방어.) 아래 router.use 밑에 두면 모든 로그인 시도가 401 로 막힌다.
router.post('/verify-pin', async (req, res) => {
  try {
    const { pin_code } = req.body;
    const restaurantId = req.body.restaurant_id || (req.user && req.user.restaurant_id);

    if (!pin_code || !restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'PIN code and restaurant ID are required', code: 'VALIDATION_ERROR' } });
    }

    // PIN 조회 한 곳(utils/storePin · 2026-11-13 Fable 설계 hat-admin-pin §2.2): 본래 계정 먼저(지금과 같은 조건) → 매장 모자 → 비활성 제외.
    const holder = await require('../utils/storePin').findStorePinHolder(restaurantId, pin_code, { nativeRoles: ['Restaurant Admin', 'Staff'] });
    if (!holder) {
      return res.status(401).json({ success: false, error: { message: 'Invalid PIN', code: 'UNAUTHORIZED' } });
    }
    const staff = holder.user;
    const expiresIn = process.env.JWT_EXPIRES_IN || '24h';
    let token;
    let userOut;
    if (holder.via === 'hat') {
      // 연결(모자) 관리자·직원 — /api/auth/switch-context 가 내는 것과 같은 모양(투영값 + ctx). 권한은 매 요청 서버가 user_contexts 로 다시 확인.
      const rid = holder.context.entity_id;
      token = jwt.sign({
        userId: staff.id, email: staff.email, username: staff.username, branch_id: staff.branch_id, manager_id: staff.manager_id,
        role: holder.role, restaurant_id: rid, brand_id: null, foodcourt_id: null,
        ctx: { v: 1, t: 'restaurant', id: rid, r: holder.role },
        amr: 'pin'
      }, process.env.JWT_SECRET, { expiresIn });
      try { await require('../services/userContexts').touchContextUsage(holder.context.id); } catch (_) { /* 정렬용 · 실패 무시 */ }
      userOut = {
        id: staff.id, email: staff.email, role: holder.role, username: staff.username,
        name: staff.full_name || staff.email, restaurant_id: rid, manager_id: null,
        brand_id: null, foodcourt_id: null, permissions: holder.permissions
      };
    } else {
      // JWT 발급 (authService.js와 동일 패턴) — 본래 계정은 지금과 같고 amr 만 더한다.
      token = jwt.sign({
        userId: staff.id,
        email: staff.email,
        role: staff.role,
        username: staff.username,
        brand_id: staff.brand_id,
        foodcourt_id: staff.foodcourt_id,
        restaurant_id: staff.restaurant_id,
        manager_id: staff.manager_id,
        amr: 'pin'
      }, process.env.JWT_SECRET, { expiresIn });
      userOut = {
        id: staff.id,
        email: staff.email,
        role: staff.role,
        username: staff.username,
        name: staff.full_name || staff.email,
        restaurant_id: staff.restaurant_id,
        manager_id: staff.manager_id,
        brand_id: staff.brand_id,
        foodcourt_id: staff.foodcourt_id,
        permissions: holder.permissions
      };
    }

    res.json({
      success: true,
      data: {
        id: staff.id,
        name: staff.full_name || staff.email,
        role: userOut.role,
        department: staff.department
      },
      token,
      user: userOut
    });
  } catch (error) {
    console.error('Error verifying PIN:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Apply authentication to all routes below (verify-pin login above is public on purpose)
router.use(authenticateToken);

// Get all staff for a restaurant
// checkRestaurantAccess: 교차테넌트 차단 — 없으면 타매장 staff 명단+pin_code 유출(IDOR P0, 2026-06-20 감사).
router.get('/', checkRestaurantAccess, async (req, res) => {
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

// 할인 승인 PIN 검증 (#5) — 경량. JWT 재발급/세션 전환 없이 PIN 이 해당 권한 가진 직원인지만 확인.
// 반환 { authorized, by }. 감사로그 남김. 하드코딩 MANAGER123 대체.
router.post('/verify-pin-permission', async (req, res) => {
  try {
    const { pin_code, permission } = req.body;
    // 교차테넌트 PIN 프로빙 차단 — restaurant_id 는 항상 인증 사용자 매장으로 고정(body 무시).
    // (body 신뢰 시 타매장 매니저 PIN 무차별 추측 가능 — pinLimiter 는 /verify-pin 만 보호) (감사 P1).
    const restaurantId = req.user.restaurant_id;
    if (!pin_code || !restaurantId) {
      return res.status(400).json({ success: false, message: 'PIN code and restaurant ID are required' });
    }
    // PIN 조회 한 곳(utils/storePin) — 본래 계정(지금과 같은 조건: 역할 조건 없음) → 매장 모자 → 비활성 제외.
    const holder = await require('../utils/storePin').findStorePinHolder(restaurantId, pin_code, { nativeRoles: null });
    if (!holder) {
      return res.json({ success: true, data: { authorized: false } });
    }
    const staff = { id: holder.user.id, full_name: holder.user.full_name, email: holder.user.email, role: holder.role, permissions: holder.permissions };
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
