const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const RestaurantManager = require('../models/RestaurantManager');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const { validateGrantedContext } = require('../services/userContexts');

// ────────────────────────────────────────────────────────────────────────────
// 컨텍스트 투영 — 멀티 컨텍스트 로그인의 유일한 초크포인트.
// docs/MULTI_CONTEXT_LOGIN_DESIGN.md §4.3.
//
// 토큰 = "어느 모자를 쓰고 있는가"(세션 상태) / 서버 = "그 모자를 지금도 가졌는가"(권한).
// 역할이 나뉘어 있어 재로그인 없는 전환과 회수 즉시 반영이 동시에 성립한다.
//
// ⛔ 이 헬퍼는 req.user 를 만들 때 **한 번만** 개입한다. 접근판정 4곳
// (checkRestaurantAccess / userCanAccessRestaurant / 목록 WHERE / requireRestaurantScope)
// 본문은 절대 수정하지 않는다 — 투영된 req.user 가 "그 매장의 네이티브 RA 와 똑같은 모양"이라
// 4곳 규칙이 전부 일치하는 유일한 경로(RA 스칼라 비교) 위로만 태우는 것이 설계의 핵심이다.
//
// ctx 없음 → 아무 일도 하지 않는다(기존 경로 바이트 동일 = 무회귀 제1 조건).
// ctx 있고 회수됨 → 401 이 아니라 **네이티브 정체로 폴백**. 프론트 httpClient 가 모든 401 을
//   전역 로그아웃으로 처리하므로(설계 §4.3 F5), 401 이면 "픽커 복귀"가 아니라 강제 로그아웃이 된다.
//   폴백은 그 사람의 진짜 정체로 내려가는 것이라 권한 확대가 없다.
// ────────────────────────────────────────────────────────────────────────────
async function projectContext(baseUser, ctx) {
  if (!ctx || !baseUser) return { user: baseUser, fallback: false, projected: false };

  let granted = false;
  try {
    granted = await validateGrantedContext(baseUser.id, {
      entity_type: ctx.t,
      entity_id: ctx.id,
      role: ctx.r
    });
  } catch (e) {
    // 판정 실패는 "권한 없음"으로 닫는다(fail-closed) — 단 폴백이라 세션은 산다.
    console.error('[AUTH] context validation error:', e.message);
    granted = false;
  }

  if (!granted) return { user: baseUser, fallback: true, projected: false };

  // 투영 필드 전체 명세 — 설계 §4.3 표 그대로. 누락하면 이전 모자의 스코프가 새는 것이라
  // brand/foodcourt/branch/manager 는 **명시적으로 null**, permissions 는 **[]** 로 덮는다.
  return {
    user: {
      ...baseUser,
      role: ctx.r,
      restaurant_id: ctx.id,
      brand_id: null,
      foodcourt_id: null,
      branch_id: null,
      manager_id: null,
      permissions: []
    },
    fallback: false,
    projected: true
  };
}

// 회수된 모자 감지를 프론트에 알리는 응답 헤더(401 금지 — 위 주석 참조).
function markContextFallback(res) {
  try { res.set('X-Context-Fallback', 'revoked'); } catch { /* 헤더 전송 후면 무시 */ }
}

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

    // 컨텍스트 투영 (decoded.ctx 없으면 위 req.user 그대로 = 기존 경로 무변경).
    if (decoded.ctx) {
      const projection = await projectContext(req.user, decoded.ctx);
      req.user = projection.user;
      req.contextProjected = projection.projected;
      if (projection.fallback) markContextFallback(res);
    }

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
// Restaurant/System Admin = 항상 허용. Staff = permissions 에 'access_pos' 보유 시만.
// 서빙/주방 전용 직원(access_pos 없음)이 결제/취소/void 를 직접 호출해도 차단(UI 숨김만으론 부족).
// docs/SERVING_VIEW_DESIGN.md §7 / docs/ROLES_AND_PERMISSIONS.md.
const POS_COUNTER_ROLES = ['System Admin', 'Restaurant Admin'];
// access_pos = 포스/카운터 접근(메뉴 가시성 + 결제/취소/void/현금박스/정산 액션). 단일 키로 통합(2026-06-03).
const userCanOperatePosCounter = (user) =>
  !!user && (POS_COUNTER_ROLES.includes(user.role) || (Array.isArray(user.permissions) && user.permissions.includes('access_pos')));

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

// 2026-06-24: access_pos 에서 결제(payment) 와 취소/void 를 별도 권한으로 분리.
// 목적 = "서버(홀) 역할": 주문/테이블이동/서빙은 되지만 결제·주문취소는 못하게.
// Admin/RA/Owner 는 역할로 항상 허용(매니저 무영향). 기존 access_pos 직원은
// 마이그레이션으로 access_payment/access_void 를 함께 받아 동작 보존(하위호환).
const PAYMENT_VOID_ROLES = ['System Admin', 'Restaurant Admin', 'Restaurant Owner'];
const userCanTakePayment = (user) =>
  !!user && (PAYMENT_VOID_ROLES.includes(user.role) || (Array.isArray(user.permissions) && user.permissions.includes('access_payment')));
const userCanVoid = (user) =>
  !!user && (PAYMENT_VOID_ROLES.includes(user.role) || (Array.isArray(user.permissions) && user.permissions.includes('access_void')));

const requirePaymentAccess = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { message: 'Authentication required', code: 'UNAUTHORIZED' } });
  }
  if (!userCanTakePayment(req.user)) {
    return res.status(403).json({
      success: false,
      error: 'This action requires payment permission. This staff member cannot take payments.',
      code: 'PAYMENT_ACCESS_REQUIRED'
    });
  }
  next();
};

const requireVoidAccess = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, error: { message: 'Authentication required', code: 'UNAUTHORIZED' } });
  }
  if (!userCanVoid(req.user)) {
    return res.status(403).json({
      success: false,
      error: 'This action requires void/cancel permission. This staff member cannot cancel or void orders.',
      code: 'VOID_ACCESS_REQUIRED'
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

    // 🔴 id 정규화 — 이 게이트를 통째로 무력화하던 우회 (2026-07-25 Fable 적대검증 실증).
    // 판정은 `parseInt(target)` 으로 하는데 핸들러는 원문 문자열로 findByPk 를 돌고, MySQL 은
    // 그 문자열을 float 로 캐스팅한다. `parseInt('1.16e2') === 1` / MySQL `'1.16e2' → 116`
    // ⇒ 자기 매장 id 로 판정을 통과한 뒤 **남의 매장**이 조회·수정된다.
    // 실증: RA(매장1) → `/restaurants/1.16e2/company-info` 200, `/store/settings?restaurantId=1.16e2` 200.
    // 이 미들웨어는 103개 라우트가 쓰므로 테넌트 경계가 앱 전역에서 뚫렸다.
    // 정규 10진수만 받는다(조이는 방향 — 정상 호출은 전부 정수 id).
    if (!/^\d+$/.test(String(targetRestaurantId))) {
      return res.status(400).json({ success: false, error: { message: 'Invalid restaurant id', code: 'VALIDATION_ERROR' } });
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

      // 컨텍스트 투영 — authenticateToken 과 동일 규칙(공유 헬퍼).
      if (decoded.ctx) {
        const projection = await projectContext(req.user, decoded.ctx);
        req.user = projection.user;
        req.contextProjected = projection.projected;
        if (projection.fallback) markContextFallback(res);
      }
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

// Block demo/test accounts from modifying their OWN account (password, email, profile).
// 2026-06-16 (BG-1-2): scoped to self only. A demo/test account must still be able to
// manage OTHER users (e.g. a demo Brand General editing/deactivating its franchise
// Restaurant Admins) so the demo can showcase user-management features. The daily reset
// only needs to protect the shared demo login's own credentials.
// Routes without a :id param (self-only routes) are treated as self → still blocked.
const demoProtection = (req, res, next) => {
  if (req.user && (req.user.is_demo || req.user.is_test)) {
    const targetId = req.params.id;
    const isSelf = targetId === undefined || String(targetId) === String(req.user.id);
    if (isSelf) {
      return res.status(403).json({
        success: false,
        message: req.user.is_demo
          ? 'Demo accounts cannot modify account settings. This account resets daily.'
          : 'Test accounts cannot modify account settings.'
      });
    }
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

// Row-level tenant check for cases where the target restaurant_id comes from a
// fetched row (not params/query/body) — e.g. /coupons/:id, /option-groups/:id,
// PATCH /orders/:id. Mirrors checkRestaurantAccess role logic. Returns boolean.
// (checkRestaurantAccess can't be chained on routes whose :id is the resource id,
//  because it would mistake req.params.id for the target restaurant id.)
const userCanAccessRestaurant = async (user, targetRestaurantId) => {
  if (!user || targetRestaurantId === undefined || targetRestaurantId === null) return false;
  if (user.role === 'System Admin') return true;
  const target = parseInt(targetRestaurantId);

  if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
    return !!user.restaurant_id && parseInt(user.restaurant_id) === target;
  }

  if (user.role === 'Restaurant Owner') {
    const ownership = await RestaurantManager.findOne({
      where: { restaurant_id: target, manager_id: user.id, relationship_type: 'ownership' }
    });
    return !!ownership;
  }

  if (user.role.includes('Manager') || user.role.includes('General')) {
    const restaurant = await Restaurant.findByPk(target, {
      include: [{ model: User, as: 'managers', where: { id: user.id }, required: false }],
      attributes: ['id', 'admin_id', 'brand_id', 'foodcourt_id']
    });
    if (!restaurant) return false;
    const hasAccess = restaurant.managers && restaurant.managers.length > 0;
    if (hasAccess || restaurant.admin_id === user.id) return true;
    // Brand General owns brands → grant access to any restaurant under an owned brand
    // (mirrors the restaurant-list scope GET /restaurants/manager/:id). The manager-join
    // table alone misses brand restaurants without an explicit oversight row → write gate
    // (deactivate admin, etc.) wrongly 403'd while the list showed them. Same for Foodcourt.
    if (user.role === 'Brand General' && restaurant.brand_id) {
      const owns = await Brand.findOne({ where: { id: restaurant.brand_id, owner_id: user.id }, attributes: ['id'] });
      if (owns) return true;
    }
    if (user.role === 'Foodcourt General' && restaurant.foodcourt_id) {
      const owns = await Foodcourt.findOne({ where: { id: restaurant.foodcourt_id, owner_id: user.id }, attributes: ['id'] });
      if (owns) return true;
    }
    return false;
  }

  return false;
};

// Route gate for `/api/restaurants/:id` style paths where :id IS the restaurant id.
// 2026-07-25 보안: 이 경로들이 authenticateToken 만 달고 있어 아무 인증 계정이나 남의 매장
// 전 컬럼(payment_settings·printer_settings 포함)을 읽거나 status 를 바꿀 수 있었다.
//
// ⚠ checkRestaurantAccess 를 쓰지 않는 이유(실측): 그쪽에는 "Brand General 이 소유한 브랜드의
// 매장" / "Foodcourt General 이 소유한 푸드코트의 매장" 폴백이 없어, 자기 관할 매장인데도 403 이
// 난다(예: FG demo_foodcourt → 자기 푸드코트 44 산하 r38/r39 가 403). 목록(GET /restaurants)은
// foodcourt_id 로 스코핑해 보여주므로 "목록엔 보이는데 상세는 403" 인 화면 붕괴가 된다.
// userCanAccessRestaurant 는 그 폴백을 가지고 있다(위 정의 참조) → 이걸 단일 기준으로 쓴다.
//
// 주의: 라우트별 추가 제약(예: Foodcourt Manager 의 branch 일치)은 이 게이트가 대체하지 않는다.
// 핸들러에 이미 있는 검사는 AND 로 그대로 남긴다.
const requireRestaurantScope = (paramName = 'id') => async (req, res, next) => {
  try {
    const targetId = req.params[paramName];
    // 정규 10진수만 통과시킨다 → next('route') 로 넘겨 뒤쪽 구체 라우트가 잡게 한다.
    // (restaurants-crud 의 '/:id' 는 '/available/:managerId' 등보다 먼저 선언돼 있어서, 핸들러가
    //  isNaN 일 때 next('route') 로 폴스루하는 데 의존한다. 여기서 400 으로 삼키면 그 라우트들이
    //  전부 죽는다.)
    //
    // 🔴 `isNaN(parseInt(x))` 를 쓰면 안 된다(2026-07-25 Fable 적대검증이 실증한 우회):
    // `parseInt('3.8e1') === 3` 인데 MySQL 은 문자열 '3.8e1' 을 float 로 캐스팅해 **38** 로 읽는다.
    // 즉 게이트는 매장 3 을 검사하고 핸들러의 findByPk(req.params.id) 는 매장 38 을 돌려준다
    // → 자기 매장 id 로 남의 매장 전 컬럼(게이트웨이 비밀키 포함) 읽기·status 변경이 뚫렸다.
    // 그래서 ①정규 digits 만 허용하고 ②판정에 쓴 값으로 param 을 고정해 게이트와 핸들러가
    // **같은 값**을 보게 한다.
    if (targetId === undefined || targetId === null || !/^\d+$/.test(String(targetId))) {
      return next('route');
    }
    req.params[paramName] = String(parseInt(targetId, 10));
    if (await userCanAccessRestaurant(req.user, targetId)) return next();

    // ⚠ 불변식: **상세 게이트는 목록 스코핑보다 엄격하면 안 된다.**
    // GET /api/restaurants 는 Foodcourt General/Manager 에게 `whereClause.foodcourt_id =
    // user.foodcourt_id` (+FM 이면 branch_id) 로 매장을 **보여준다**. 그런데
    // userCanAccessRestaurant 의 푸드코트 폴백은 `Foodcourt General` **이면서 소유자**일 때만
    // 참이라, ①Foodcourt Manager ②소유자가 아닌 Foodcourt General 은 목록엔 뜨는데 상세는
    // 403 이 된다 = 매니저 콘솔에서 클릭하면 죽는다(2026-07-25 실측으로 발견).
    // 그래서 목록과 **동일한 규칙**을 여기서 그대로 반영한다.
    //
    // userCanAccessRestaurant 를 고치지 않는 이유: 그 함수는 쿠폰·인보이스 쓰기 게이트와
    // 소켓 room 인증 등 11개 파일이 공유한다. 거기서 느슨하게 하면 이번 절단면을 넘는
    // 권한 확대가 되므로, 이 라우트 쌍(list↔detail)의 불변식은 이 게이트에서 닫는다.
    // (근본 정리 = 접근판정 3중화 해소. 별건 설계 대상 — 아래 주석 참조.)
    const u = req.user;
    if (u && (u.role === 'Foodcourt General' || u.role === 'Foodcourt Manager') && u.foodcourt_id) {
      const r = await Restaurant.findByPk(parseInt(targetId), { attributes: ['id', 'foodcourt_id', 'branch_id'] });
      if (r && r.foodcourt_id && parseInt(r.foodcourt_id) === parseInt(u.foodcourt_id)) {
        // 지점 스코프 FM 은 자기 지점 매장만 (목록과 동일 조건)
        if (u.role === 'Foodcourt Manager' && u.branch_id) {
          if (parseInt(r.branch_id) === parseInt(u.branch_id)) return next();
        } else {
          return next();
        }
      }
    }

    return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
  } catch (error) {
    console.error('[AUTH] requireRestaurantScope error:', error.message);
    return res.status(500).json({ success: false, error: { message: 'Failed to verify access', code: 'INTERNAL_ERROR' } });
  }
};

// Generic entity-scope check used by settings/notification/report routes that key
// on (entity_type, entity_id) rather than a plain restaurant_id. Restaurant scope
// reuses userCanAccessRestaurant; brand/foodcourt scope = System Admin or the owner.
// 'system'/'platform' are global settings → System Admin only. Unknown types deny.
const userCanAccessEntity = async (user, entityType, entityId) => {
  if (!user) return false;
  if (user.role === 'System Admin') return true;
  const type = String(entityType || '').toLowerCase();
  if (type === 'system' || type === 'platform') return false; // System Admin already returned true above
  if (type === 'restaurant') return userCanAccessRestaurant(user, entityId);
  const id = parseInt(entityId);
  if (!Number.isFinite(id)) return false;
  // Personal, self-owned settings entity (owner/admin-level mail config keyed by user id).
  if (type === 'admin' || type === 'manager') return id === parseInt(user.id);
  if (type === 'brand') {
    const owns = await Brand.findOne({ where: { id, owner_id: user.id }, attributes: ['id'] });
    return !!owns;
  }
  if (type === 'foodcourt') {
    const owns = await Foodcourt.findOne({ where: { id, owner_id: user.id }, attributes: ['id'] });
    return !!owns;
  }
  return false;
};

module.exports = {
  authenticateToken,
  optionalAuthenticateToken,
  // 컨텍스트 투영 — routes/auth.js `/me` 가 같은 규칙을 쓰도록 공유(중복 구현 금지).
  projectContext,
  markContextFallback,
  requireRole,
  requirePosCounter,
  userCanOperatePosCounter,
  requirePaymentAccess,
  userCanTakePayment,
  requireVoidAccess,
  userCanVoid,
  checkRestaurantAccess,
  requireRestaurantScope,
  userCanAccessRestaurant,
  userCanAccessEntity,
  checkSubscriptionStatus,
  demoProtection,
  getManagerScope
};