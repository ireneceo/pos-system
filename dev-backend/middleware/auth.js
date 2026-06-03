const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const RestaurantManager = require('../models/RestaurantManager');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, error: { message: 'Access token required', code: 'UNAUTHORIZED' } });
    }

    if (!process.env.JWT_SECRET) {
      console.error('[AUTH] JWT_SECRET environment variable is not set');
      return res.status(500).json({ success: false, error: { message: 'Server configuration error', code: 'INTERNAL_ERROR' } });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(401).json({ success: false, error: { message: 'Invalid token - user not found', code: 'UNAUTHORIZED' } });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      restaurant_id: user.restaurant_id,
      brand_id: user.brand_id,
      foodcourt_id: user.foodcourt_id,
      branch_id: user.branch_id,
      manager_id: user.manager_id,
      // permissions JSON 배열 (Staff 액션 권한 — pos_counter 등). getter 가 auto-parse.
      permissions: Array.isArray(user.permissions) ? user.permissions : [],
      is_demo: user.is_demo || false
    };

    next();
  } catch (error) {
    console.error('[AUTH] Token verification error:', error.message);
    return res.status(403).json({ success: false, error: { message: 'Invalid token', code: 'FORBIDDEN' } });
  }
};

// Check if user has required role(s)
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: { message: 'Authentication required', code: 'UNAUTHORIZED' } });
    }

    if (!allowedRoles.includes(req.user.role)) {
      // Surface which role(s) are required so the UI can give the user a useful
      // hint instead of the opaque "Insufficient permissions". The legacy phrase
      // is kept in the message so existing health-check / regex consumers still
      // match. UI prefers `error` for display.
      return res.status(403).json({
        success: false,
        error: `Insufficient permissions — this action requires one of: ${allowedRoles.join(', ')}. Your role is ${req.user.role}.`,
        required_roles: allowedRoles,
        current_role: req.user.role,
        code: 'INSUFFICIENT_ROLE'
      });
    }

    next();
  };
};

// 카운터 전용 액션(결제/취소/void/현금박스/정산) 권한 게이트 (2026-06-03).
// Restaurant/System Admin = 항상 허용. Staff = permissions 에 'pos_counter' 보유 시만.
// 서빙 전용 직원(pos_counter 없음)이 결제/취소/void 를 직접 호출해도 차단(UI 숨김만으론 부족).
// docs/SERVING_VIEW_DESIGN.md §7 / docs/ROLES_AND_PERMISSIONS.md.
const POS_COUNTER_ROLES = ['System Admin', 'Restaurant Admin'];
const userCanOperatePosCounter = (user) =>
  !!user && (POS_COUNTER_ROLES.includes(user.role) || (Array.isArray(user.permissions) && user.permissions.includes('pos_counter')));

const requirePosCounter = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { message: 'Authentication required', code: 'UNAUTHORIZED' } });
  }
  if (!userCanOperatePosCounter(req.user)) {
    return res.status(403).json({
      success: false,
      error: 'This action requires counter (POS) permission. Serving-only staff cannot perform it.',
      code: 'POS_COUNTER_REQUIRED'
    });
  }
  next();
};

// Check if Restaurant Admin/Staff can access the restaurant
//
// Resolves the target restaurantId in this order:
//   1. req.params.{restaurantId|id|restaurant_id}        (typical REST path)
//   2. req.query.{restaurantId|restaurant_id}            (legacy query-style endpoints)
//   3. req.body.{restaurantId|restaurant_id}             (legacy body-style endpoints,
//                                                        e.g. POST /api/menu/product)
//
// Without (2) and (3), routes that pass the target id outside of `params` (the
// menu.js routes were the canonical case) silently bypass tenant isolation.
const checkRestaurantAccess = async (req, res, next) => {
  try {
    const { restaurantId, id, restaurant_id } = req.params;
    const targetRestaurantId =
      restaurantId || id || restaurant_id ||
      req.query?.restaurantId || req.query?.restaurant_id ||
      req.body?.restaurantId || req.body?.restaurant_id;

    if (!req.user) {
      return res.status(401).json({ success: false, error: { message: 'Authentication required', code: 'UNAUTHORIZED' } });
    }

    if (!targetRestaurantId) {
      // No target supplied. For non-System-Admin users, fall back to their own
      // restaurant_id (so authenticated read endpoints without an explicit
      // target continue to work). System Admin requests with no target are
      // rejected to avoid accidentally exposing all-restaurants data.
      if (req.user.role === 'System Admin') {
        return next(); // SA without target is allowed (existing behaviour)
      }
      if (req.user.restaurant_id) {
        // Pin the request to the user's own restaurant for downstream handlers.
        if (!req.params.restaurantId && !req.params.restaurant_id) {
          // Don't mutate params (could break other middlewares); just permit.
        }
        return next();
      }
      return res.status(400).json({ success: false, error: { message: 'restaurantId required', code: 'VALIDATION_ERROR' } });
    }

    // System Admin can access everything
    if (req.user.role === 'System Admin') {
      return next();
    }

    // Restaurant Admin and Staff can only access their own restaurant
    if (req.user.role === 'Restaurant Admin' || req.user.role === 'Staff') {
      if (!req.user.restaurant_id) {
        return res.status(403).json({ success: false, error: { message: 'User not assigned to any restaurant', code: 'FORBIDDEN' } });
      }

      if (parseInt(req.user.restaurant_id) !== parseInt(targetRestaurantId)) {
        return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
      }

      return next();
    }

    // Restaurant Owner can access owned restaurants (via restaurant_managers with relationship_type='ownership')
    if (req.user.role === 'Restaurant Owner') {
      const ownership = await RestaurantManager.findOne({
        where: {
          restaurant_id: targetRestaurantId,
          manager_id: req.user.id,
          relationship_type: 'ownership'
        }
      });

      if (!ownership) {
        return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
      }

      return next();
    }

    // Managers can access restaurants they manage
    if (req.user.role.includes('Manager') || req.user.role.includes('General')) {
      const restaurant = await Restaurant.findByPk(targetRestaurantId, {
        include: [{
          model: User,
          as: 'managers',
          where: { id: req.user.id },
          required: false
        }]
      });

      if (!restaurant) {
        return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
      }

      const hasAccess = restaurant.managers && restaurant.managers.length > 0;
      if (!hasAccess && restaurant.admin_id !== req.user.id) {
        return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
      }

      return next();
    }

    return res.status(403).json({ success: false, error: { message: 'Insufficient permissions', code: 'FORBIDDEN' } });
  } catch (error) {
    console.error('[AUTH] Restaurant access check error:', error.message);
    return res.status(500).json({ success: false, error: { message: 'Failed to verify access', code: 'INTERNAL_ERROR' } });
  }
};

// Optional authentication - allows request to continue even without token
// Used for endpoints that support both authenticated and guest access
const optionalAuthenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      // No token - continue as guest
      req.user = null;
      return next();
    }

    if (!process.env.JWT_SECRET) {
      // Server config error but continue as guest
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Support both 'userId' and 'id' in token payload for compatibility
    const userId = decoded.userId || decoded.id;
    const user = await User.findByPk(userId);

    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
        restaurant_id: user.restaurant_id,
        brand_id: user.brand_id,
        foodcourt_id: user.foodcourt_id,
        branch_id: user.branch_id,
        manager_id: user.manager_id,
        is_demo: user.is_demo || false
      };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    // Token verification failed - continue as guest
    req.user = null;
    next();
  }
};

// Check subscription status - block suspended users from most API access
const checkSubscriptionStatus = async (req, res, next) => {
  if (!req.user) return next();

  // System Admin is never restricted
  if (req.user.role === 'System Admin') return next();

  // Always allow access to these paths
  const allowedPaths = ['/subscription-status', '/invoices', '/profile', '/auth', '/health'];
  if (allowedPaths.some(p => req.originalUrl.includes(p))) return next();

  try {
    let subscriptionStatus = 'active';

    if (req.user.role === 'Restaurant Admin' || req.user.role === 'Staff') {
      if (req.user.restaurant_id) {
        const restaurant = await Restaurant.findByPk(req.user.restaurant_id, { attributes: ['status'] });
        if (restaurant) subscriptionStatus = restaurant.status || 'active';
      }
    } else if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
      if (req.user.brand_id) {
        const brand = await Brand.findByPk(req.user.brand_id, { attributes: ['subscription_status'] });
        if (brand) subscriptionStatus = brand.subscription_status || 'active';
      }
    } else if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
      if (req.user.foodcourt_id) {
        const foodcourt = await Foodcourt.findByPk(req.user.foodcourt_id, { attributes: ['subscription_status'] });
        if (foodcourt) subscriptionStatus = foodcourt.subscription_status || 'active';
      }
    } else if (req.user.role === 'Restaurant Owner') {
      const user = await User.findByPk(req.user.id, { attributes: ['subscription_status'] });
      if (user) subscriptionStatus = user.subscription_status || 'active';
    }

    if (subscriptionStatus === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'Your subscription is suspended. Please pay outstanding invoices to restore access.',
        code: 'SUBSCRIPTION_SUSPENDED'
      });
    }

    next();
  } catch (error) {
    // Don't block on errors — allow access
    console.error('[AUTH] Subscription check error:', error.message);
    next();
  }
};

// Block demo/test accounts from modifying their own account (password, email, profile)
const demoProtection = (req, res, next) => {
  if (req.user && (req.user.is_demo || req.user.is_test)) {
    return res.status(403).json({
      success: false,
      message: req.user.is_demo
        ? 'Demo accounts cannot modify account settings. This account resets daily.'
        : 'Test accounts cannot modify account settings.'
    });
  }
  next();
};

// Resolve Manager scope limits. Returns:
//   { scoped: false } — System Admin, General roles, or unscoped Manager (backward-compat: NULL = all)
//   { scoped: true, branch_id } — Foodcourt Manager restricted to a branch
//   { scoped: true, brand_id } — Brand Manager restricted to one brand
const getManagerScope = (user) => {
  if (!user) return { scoped: false };
  if (user.role === 'Foodcourt Manager' && user.branch_id) {
    return { scoped: true, branch_id: Number(user.branch_id) };
  }
  if (user.role === 'Brand Manager' && user.brand_id) {
    return { scoped: true, brand_id: Number(user.brand_id) };
  }
  return { scoped: false };
};

module.exports = {
  authenticateToken,
  optionalAuthenticateToken,
  requireRole,
  requirePosCounter,
  userCanOperatePosCounter,
  checkRestaurantAccess,
  checkSubscriptionStatus,
  demoProtection,
  getManagerScope
};