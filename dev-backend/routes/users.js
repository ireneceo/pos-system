const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const bcrypt = require('bcrypt');
const { authenticateToken, requireRole, demoProtection, userCanAccessRestaurant } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

// Get all users (System Admin only)
router.get('/', authenticateToken, async (req, res) => {
  console.log('🔄 GET /api/users - Request received');
  console.log('📝 Query params:', req.query);

  // Tenant-scoped management: Restaurant Admin / Brand (General|Manager) /
  // Foodcourt (General|Manager) can list users within their own scope.
  const ALLOWED_LIST_ROLES = ['System Admin', 'Restaurant Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager'];
  if (!ALLOWED_LIST_ROLES.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: `This action requires a tenant-management role. Your role is ${req.user.role}.`,
      code: 'INSUFFICIENT_ROLE'
    });
  }
  if (req.user.role === 'Restaurant Admin' && !req.user.restaurant_id) {
    return res.status(403).json({
      success: false,
      error: 'Your account is not assigned to a restaurant. Contact your administrator.',
      code: 'RESTAURANT_NOT_ASSIGNED'
    });
  }

  try {
    const { sequelize } = require('../config/database');

    // Build WHERE clauses for role filter + search
    const conditions = [];
    const replacements = [];

    // Tenant isolation
    if (req.user.role === 'Restaurant Admin') {
      conditions.push('u.restaurant_id = ?');
      replacements.push(req.user.restaurant_id);
    } else if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
      // Brand 측: owner 인 brand 들의 restaurants 안의 user
      const { Brand, Restaurant } = require('../models');
      const brands = await Brand.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
      const brandIds = brands.map(b => b.id);
      const rests = brandIds.length === 0 ? [] : await Restaurant.findAll({ where: { brand_id: brandIds }, attributes: ['id'] });
      const restIds = rests.map(r => r.id);
      if (restIds.length === 0) {
        conditions.push('1=0');
      } else {
        conditions.push(`u.restaurant_id IN (${restIds.map(() => '?').join(',')})`);
        replacements.push(...restIds);
      }
    } else if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
      const { Restaurant } = require('../models');
      const rests = !req.user.foodcourt_id ? [] : await Restaurant.findAll({ where: { foodcourt_id: req.user.foodcourt_id }, attributes: ['id'] });
      const restIds = rests.map(r => r.id);
      if (restIds.length === 0) {
        conditions.push('1=0');
      } else {
        conditions.push(`u.restaurant_id IN (${restIds.map(() => '?').join(',')})`);
        replacements.push(...restIds);
      }
    }

    if (req.query.role) {
      if (req.query.role === 'Manager') {
        // Map 'Manager' to all manager-level roles (including Restaurant Owner)
        conditions.push('u.role IN (?, ?, ?, ?, ?)');
        replacements.push('Foodcourt General', 'Foodcourt Manager', 'Brand General', 'Brand Manager', 'Restaurant Owner');
      } else {
        conditions.push('u.role = ?');
        replacements.push(req.query.role);
      }
    }

    // Search filter — substring match (works for middle characters)
    // Accepts both `search` and `q` for backward compat
    const searchTerm = (req.query.search || req.query.q || '').trim();
    if (searchTerm) {
      conditions.push('(u.full_name LIKE ? OR u.email LIKE ? OR u.username LIKE ?)');
      const pattern = `%${searchTerm}%`;
      replacements.push(pattern, pattern, pattern);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get users first (no brand/foodcourt join to avoid duplicates)
    const users = await sequelize.query(`
      SELECT u.*, r.name as restaurant_name
      FROM users u
      LEFT JOIN restaurants r ON u.restaurant_id = r.id
      ${whereClause}
      ORDER BY u.full_name
    `, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    // Fetch brand/foodcourt data separately and merge (first brand/fc per user for display)
    const brandGeneralIds = users.filter(u => u.role === 'Brand General').map(u => u.id);
    const fcGeneralIds = users.filter(u => u.role === 'Foodcourt General').map(u => u.id);

    let brandsMap = {};    // first brand per user (backward compat)
    let brandsAllMap = {}; // all brands per user
    if (brandGeneralIds.length > 0) {
      const brands = await sequelize.query(`
        SELECT b.* FROM brands b WHERE b.owner_id IN (?) ORDER BY b.id ASC
      `, { replacements: [brandGeneralIds], type: sequelize.QueryTypes.SELECT });
      for (const b of brands) {
        if (!brandsMap[b.owner_id]) brandsMap[b.owner_id] = b;
        if (!brandsAllMap[b.owner_id]) brandsAllMap[b.owner_id] = [];
        brandsAllMap[b.owner_id].push(b);
      }
    }

    let fcMap = {};
    let fcAllMap = {};
    if (fcGeneralIds.length > 0) {
      const fcs = await sequelize.query(`
        SELECT f.* FROM foodcourts f WHERE f.owner_id IN (?) ORDER BY f.id ASC
      `, { replacements: [fcGeneralIds], type: sequelize.QueryTypes.SELECT });
      for (const f of fcs) {
        if (!fcMap[f.owner_id]) fcMap[f.owner_id] = f;
        if (!fcAllMap[f.owner_id]) fcAllMap[f.owner_id] = [];
        fcAllMap[f.owner_id].push(f);
      }
    }

    // Merge brand/foodcourt entity info + map subscription from users table with backward-compat field names
    const usersWithoutPassword = users.map(user => {
      const { password, ...u } = user;
      const b = brandsMap[u.id];
      const f = fcMap[u.id];
      if (b) {
        u.brand_entity_id = b.id;
        u.brand_name = b.name;
      }
      if (brandsAllMap[u.id]) {
        u.brands = brandsAllMap[u.id].map(br => ({ id: br.id, name: br.name }));
      }
      if (f) {
        u.fc_entity_id = f.id;
        u.fc_name = f.name;
      }
      if (fcAllMap[u.id]) {
        u.foodcourts = fcAllMap[u.id].map(fc => ({ id: fc.id, name: fc.name }));
      }
      // Backward compat: map users table subscription fields to prefixed names for frontend
      if (u.role === 'Brand General') {
        u.brand_plan_type = u.plan_type;
        u.brand_plan_amount = u.plan_amount;
        u.brand_billing_cycle = u.billing_cycle;
        u.brand_subscription_status = u.subscription_status;
        u.brand_subscription_start = u.subscription_start;
        u.brand_subscription_end = u.subscription_end;
        u.brand_currency = u.currency;
      }
      if (u.role === 'Foodcourt General') {
        u.fc_plan_type = u.plan_type;
        u.fc_plan_amount = u.plan_amount;
        u.fc_billing_cycle = u.billing_cycle;
        u.fc_subscription_status = u.subscription_status;
        u.fc_subscription_start = u.subscription_start;
        u.fc_subscription_end = u.subscription_end;
        u.fc_currency = u.currency;
      }
      return u;
    });

    console.log(`✓ Found ${usersWithoutPassword.length} users with role: ${req.query.role || 'all'}`);
    res.json({ success: true, data: usersWithoutPassword });
  } catch (error) {
    console.error('✗ Error fetching users:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get available admin candidates (users not assigned to any restaurant)
router.get('/available-admins', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    const { sequelize } = require('../config/database');

    let searchFilter = '';
    let replacements = [];

    if (q && q.trim()) {
      searchFilter = 'AND (u.full_name LIKE ? OR u.email LIKE ? OR u.username LIKE ?)';
      const searchTerm = `%${q.trim()}%`;
      replacements = [searchTerm, searchTerm, searchTerm];
    }

    const users = await sequelize.query(`
      SELECT u.id, u.username, u.email, u.role, u.full_name, u.phone
      FROM users u
      WHERE u.restaurant_id IS NULL
        AND u.role IN ('Restaurant Admin', 'Staff')
        ${searchFilter}
      ORDER BY u.full_name
      LIMIT 20
    `, {
      replacements,
      type: sequelize.QueryTypes.SELECT
    });

    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching available admins:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Tutorial / walkthrough progress — per-tour completion state.
// Read: own progress only. Patch a single tour_key without disturbing other keys.
// Must be declared BEFORE /:id routes (Express routing order).
router.get('/me/tutorial-progress', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: ['tutorial_progress'] });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user.tutorial_progress || {} });
  } catch (error) {
    console.error('[Users] tutorial-progress GET error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to load tutorial progress' });
  }
});

router.put('/me/tutorial-progress', authenticateToken, async (req, res) => {
  try {
    const { tour_key, completed, skipped, version } = req.body || {};
    if (!tour_key || typeof tour_key !== 'string' || !/^[a-z0-9_]{2,40}$/i.test(tour_key)) {
      return res.status(400).json({ success: false, message: 'Invalid tour_key' });
    }
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const current = user.tutorial_progress && typeof user.tutorial_progress === 'object'
      ? { ...user.tutorial_progress } : {};
    const prev = current[tour_key] && typeof current[tour_key] === 'object' ? current[tour_key] : {};
    current[tour_key] = {
      ...prev,
      ...(typeof completed === 'boolean' ? { completed } : {}),
      ...(typeof skipped === 'boolean' ? { skipped } : {}),
      ...(typeof version === 'number' && Number.isFinite(version) ? { version } : {}),
      last_seen: new Date().toISOString()
    };

    user.tutorial_progress = current;
    await user.save();
    res.json({ success: true, data: current });
  } catch (error) {
    console.error('[Users] tutorial-progress PUT error:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update tutorial progress' });
  }
});

// Update user language preference (must be before /:id routes)
router.put('/language', authenticateToken, async (req, res) => {
  try {
    const { language } = req.body;
    const validLanguages = ['en', 'ko', 'zh', 'ms'];

    if (!language || !validLanguages.includes(language)) {
      return res.status(400).json({ success: false, message: `Invalid language. Must be one of: ${validLanguages.join(', ')}` });
    }

    await User.update(
      { preferred_language: language },
      { where: { id: req.user.id } }
    );

    res.json({ success: true, data: { preferred_language: language } });
  } catch (error) {
    console.error('[Users] Error updating language:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update language preference' });
  }
});

// Get single user
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    // 본인 정보 또는 System Admin만 조회 가능
    if (req.user.id.toString() !== req.params.id && req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create user — System Admin (any role) or Restaurant Admin (own restaurant, Staff only)
router.post('/', authenticateToken, async (req, res) => {
  console.log('🔄 POST /api/users - Request received');
  console.log('📝 Request body:', req.body);

  // Tenant guard: System Admin (any role), Restaurant Admin (own Staff), and
  // Brand/Foodcourt General (Restaurant Admins under their owned brand/foodcourt).
  // BG/FG were previously excluded → "Add Admin" always 403'd, blocking franchise
  // admin creation (chicken-and-egg with restaurant create). Scope enforced below.
  if (!['System Admin', 'Restaurant Admin', 'Brand General', 'Foodcourt General'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: `This action requires System Admin, Restaurant Admin, or Brand/Foodcourt General. Your role is ${req.user.role}.`,
      code: 'INSUFFICIENT_ROLE'
    });
  }

  try {
    const { username, email, password, role, full_name, first_name, last_name, phone, permissions, restaurantId, restaurant_id, department, company_name, manager_id, pin_code, skip_verification: skipVerification } = req.body;
    // Support both camelCase (new) and snake_case (legacy) for restaurant ID
    let finalRestaurantId = restaurantId || restaurant_id;

    // Restaurant Admin extra guards:
    //   - cannot create users in another restaurant — restaurant_id is FORCED
    //     to their own, ignoring whatever the client sent
    //   - can only create role='Staff' (cannot escalate to Restaurant Admin or
    //     anything more privileged)
    if (req.user.role === 'Restaurant Admin') {
      if (!req.user.restaurant_id) {
        return res.status(403).json({
          success: false,
          error: 'Your account is not assigned to a restaurant.',
          code: 'RESTAURANT_NOT_ASSIGNED'
        });
      }
      finalRestaurantId = req.user.restaurant_id; // ignore client value, prevent cross-tenant creation
      if (role && role !== 'Staff') {
        return res.status(403).json({
          success: false,
          error: 'Restaurant Admin can only create staff members (role=Staff). To add another admin, contact System Admin.',
          code: 'ROLE_NOT_ALLOWED'
        });
      }
    }

    // Brand/Foodcourt General guards: may create Restaurant Admins only, and only for
    // restaurants under their owned brand/foodcourt. restaurant_id may be omitted
    // (deferred assignment — admin created first, restaurant later). Cannot escalate.
    if (req.user.role === 'Brand General' || req.user.role === 'Foodcourt General') {
      if (role !== 'Restaurant Admin') {
        return res.status(403).json({
          success: false,
          error: `${req.user.role} can only create Restaurant Admin accounts.`,
          code: 'ROLE_NOT_ALLOWED'
        });
      }
      if (finalRestaurantId) {
        const allowed = await userCanAccessRestaurant(req.user, finalRestaurantId);
        if (!allowed) {
          return res.status(403).json({
            success: false,
            error: 'You can only add admins to restaurants under your own brand or foodcourt.',
            code: 'NOT_PERMITTED'
          });
        }
      }
    }

    // Validate required fields — 2026-06-03: 직원(Staff)은 이메일 선택(username/PIN 로그인).
    // 그 외 모든 역할은 이메일 필수 유지. docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md §3-A.
    if (!email && (role || 'Staff') !== 'Staff') {
      return res.status(400).json({ success: false, error: { message: 'Email is required', code: 'VALIDATION_ERROR' } });
    }

    // Staff 는 restaurant_id 가 필수 — 내부 username 네임스페이스(r{rid}:{id})와 PIN 전환이
    // restaurant_id 에 묶이기 때문(아래 effectiveUsername). 레스토랑 없으면 staff 식별 불가.
    // Restaurant Admin 은 2026-06-16 부터 레스토랑 선택식(Irene 결정): BG 가 가맹점 배정 전에
    // Admin 계정을 먼저 만들 수 있어야 함(레스토랑 등록 시 Admin 이 필수라 닭-달걀 모순 해소).
    // 미배정 Admin 은 로그인되나 매장 기능은 배정 전까지 제한됨(프론트에서 안내).
    if (role === 'Staff' && !finalRestaurantId) {
      return res.status(400).json({
        success: false,
        error: 'Staff requires a restaurant. Please select the restaurant this account belongs to.'
      });
    }

    // Auto-generate strong password if not provided
    let generatedPassword = null;
    let finalPassword = password;
    if (!password) {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
      generatedPassword = '';
      // Ensure at least one of each required type
      generatedPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
      generatedPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
      generatedPassword += '23456789'[Math.floor(Math.random() * 8)];
      generatedPassword += '!@#$%'[Math.floor(Math.random() * 5)];
      for (let i = 0; i < 8; i++) {
        generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      // Shuffle the password
      generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
      finalPassword = generatedPassword;
    }

    if (!username) {
      return res.status(400).json({ success: false, error: { message: 'Username is required', code: 'VALIDATION_ERROR' } });
    }

    // 2026-06-03: Staff ID 매장 네임스페이스 — 내부 username = r{restaurant_id}:{staffId}.
    // 매장마다 같은 ID(counter 등) 자유롭게 재사용 가능(전역 UNIQUE 우회). 화면엔 prefix 벗긴 ID 표시.
    // 로그인은 공용 단말 + PIN 전환(restaurant_id+pin_code)이라 username 직접 입력 불필요.
    // docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md §6.
    let effectiveUsername = username;
    if ((role || 'Staff') === 'Staff' && finalRestaurantId) {
      const bare = String(username).replace(/^r\d+:/i, '');
      effectiveUsername = `r${finalRestaurantId}:${bare}`;
    }

    console.log('📝 Parsed username:', username, '→ effective:', effectiveUsername);
    console.log('📝 Parsed email:', email);

    // Check if user already exists (by email or username).
    // 2026-06-03: 무이메일 직원 지원 — email 이 있을 때만 OR 조건에 포함(NULL 매칭 방지).
    const _orConds = [{ username: effectiveUsername }];
    if (email) _orConds.push({ email });
    const existingUser = await User.findOne({
      where: { [require('sequelize').Op.or]: _orConds }
    });

    if (existingUser) {
      // Build descriptive error message
      // 화면 표시는 매장 prefix(r5:) 벗긴 친근한 ID 로.
      const displayId = String(effectiveUsername).replace(/^r\d+:/i, '');
      let errorDetail = '';
      if (existingUser.email === email && existingUser.username === effectiveUsername) {
        errorDetail = `Both email "${email}" and Staff ID "${displayId}" are already in use`;
      } else if (existingUser.email === email) {
        errorDetail = `Email "${email}" is already in use`;
      } else {
        errorDetail = `Staff ID "${displayId}" is already in use`;
      }

      // Add context about existing user
      const userContext = existingUser.restaurant_id
        ? `by a ${existingUser.role} at restaurant ID ${existingUser.restaurant_id}`
        : `by a ${existingUser.role} (system user)`;

      return res.status(400).json({
        success: false,
        error: `${errorDetail} ${userContext}. Please use a different email or username.`
      });
    }

    // PIN duplicate check within same restaurant
    if (pin_code && finalRestaurantId) {
      const pinExists = await User.findOne({
        where: { restaurant_id: finalRestaurantId, pin_code }
      });
      if (pinExists) {
        return res.status(400).json({
          success: false,
          error: `PIN ${pin_code} is already used by another staff member in this restaurant`
        });
      }
    }

    // Staff / Restaurant Admin creation — enforce staff_limit from restaurant plan
    if (finalRestaurantId && (role === 'Staff' || role === 'Restaurant Admin')) {
      const Restaurant = require('../models/Restaurant');
      const restaurant = await Restaurant.findByPk(finalRestaurantId, {
        attributes: ['id', 'name', 'staff_limit']
      });
      if (restaurant && restaurant.staff_limit && restaurant.staff_limit > 0) {
        const currentStaffCount = await User.count({
          where: {
            restaurant_id: finalRestaurantId,
            role: { [require('sequelize').Op.in]: ['Staff', 'Restaurant Admin'] }
          }
        });
        if (currentStaffCount >= restaurant.staff_limit) {
          return res.status(403).json({
            success: false,
            error: `Staff limit reached. Your plan allows up to ${restaurant.staff_limit} staff members (including Restaurant Admin). Currently: ${currentStaffCount}.`,
            limit: restaurant.staff_limit,
            current: currentStaffCount,
            upgradeRequired: true
          });
        }
      }
    }

    // MX 레코드 검증: 이메일 도메인에 메일 서버가 존재하는지 확인 (이메일 있을 때만 — 무이메일 직원 스킵)
    const { verifyMxRecord, generateVerificationToken, getVerificationUrl } = require('../utils/emailValidator');
    if (email) {
      const mxResult = await verifyMxRecord(email);
      if (!mxResult.valid) {
        return res.status(400).json({ success: false, message: mxResult.message });
      }
    }

    const hashedPassword = await bcrypt.hash(finalPassword, 10);

    // Generate full_name from first_name and last_name if not provided
    const generatedFullName = full_name ||
      (first_name && last_name ? `${first_name} ${last_name}` :
       first_name || last_name || null);

    // Subscription fields from request
    const { plan_type, plan_amount, billing_cycle, currency, subscription_start, auto_renew,
            discount_type, discount_value, discount_reason } = req.body;

    // Roles that have their own subscription stored on the User model
    const SUBSCRIBING_ROLES = ['Brand General', 'Foodcourt General', 'Restaurant Owner', 'Supplier Admin'];
    const hasSubscription = SUBSCRIBING_ROLES.includes(role) && subscription_start && plan_type;

    // Calculate subscription end date (Monthly: +1 month - 1 day, Annual: +1 year - 1 day)
    // Derive subscription_status from subscription_start vs today
    let calcSubscriptionStartDate = null;
    let calcSubscriptionEndDate = null;
    let calcSubscriptionStatus = null;
    let calcTrialEndDate = null;

    if (hasSubscription) {
      calcSubscriptionStartDate = new Date(subscription_start);
      const cycle = billing_cycle || 'monthly';

      const endD = new Date(calcSubscriptionStartDate);
      if (cycle === 'annual') {
        endD.setFullYear(endD.getFullYear() + 1);
      } else {
        endD.setMonth(endD.getMonth() + 1);
      }
      endD.setDate(endD.getDate() - 1);
      calcSubscriptionEndDate = endD;

      // Derive status: if start is in the future → trial, else active
      const todayMid = new Date();
      todayMid.setHours(0, 0, 0, 0);
      const startMid = new Date(calcSubscriptionStartDate);
      startMid.setHours(0, 0, 0, 0);

      if (startMid > todayMid) {
        calcSubscriptionStatus = 'trial';
        calcTrialEndDate = new Date(startMid);
        calcTrialEndDate.setDate(calcTrialEndDate.getDate() - 1);
      } else {
        calcSubscriptionStatus = 'active';
        calcTrialEndDate = null;
      }
    }

    // 2026-06-03: 신규 Staff 는 "베이직 다 포함" 폐기 — admin 이 폼에서 작업 접근(access_pos/
    // access_serving/access_kitchen)을 직접 선택해 보낸다. 자동 부여 없음.
    // docs/STAFF_ACCESS_AND_IDENTITY_DESIGN.md §5.
    const finalPermissions = permissions || null;

    // Build user create data
    const userCreateData = {
      username: effectiveUsername,
      email: email || null,
      password: hashedPassword,
      role: role || 'Staff',
      full_name: generatedFullName,
      phone: phone || null,
      permissions: finalPermissions,
      restaurant_id: finalRestaurantId || null,
      department: department || null,
      company_name: company_name || null,
      manager_id: manager_id || null,
      pin_code: pin_code || null
    };

    // Subscription fields — applies to Brand General / Foodcourt General / Restaurant Owner / Supplier Admin
    if (hasSubscription) {
      userCreateData.plan_type = plan_type;
      userCreateData.plan_amount = plan_amount ? parseFloat(plan_amount) : null;
      userCreateData.billing_cycle = billing_cycle || 'monthly';
      userCreateData.currency = currency || 'MYR';
      userCreateData.subscription_status = calcSubscriptionStatus;
      userCreateData.subscription_start = calcSubscriptionStartDate;
      userCreateData.subscription_end = calcSubscriptionEndDate;
      userCreateData.trial_end_date = calcTrialEndDate;
      userCreateData.auto_renew = auto_renew !== false;

      // Discount (none/percentage/fixed) — mirrors Restaurant.discount_*
      const validDt = ['none', 'percentage', 'fixed'].includes(discount_type) ? discount_type : 'none';
      userCreateData.discount_type = validDt;
      userCreateData.discount_value = (validDt === 'none') ? 0 : (Number(discount_value) || 0);
      userCreateData.discount_reason = (validDt === 'none') ? null : (discount_reason || null);
    }

    // 이메일 인증 정책 (2026-06-01): 등록 계정도 인증 필요 (skipVerification 명시 시만 면제).
    // 미인증이어도 로그인 가능 + 알림 메일 미수신 + 화면 안내 배너. 아래서 인증메일 발송.
    userCreateData.email_verified = !!skipVerification;

    const user = await User.create(userCreateData);

    // 이메일 인증 토큰 생성 + 발송 (skip_verification이 아닌 경우 + 이메일 있을 때만 — 무이메일 직원 스킵)
    if (!skipVerification && user.email) {
      try {
        const { rawToken, hashedToken, expires } = await generateVerificationToken();
        await user.update({
          email_verification_token: hashedToken,
          email_verification_expires: expires
        });

        const verificationUrl = getVerificationUrl(rawToken, user.email);
        const { emailVerificationEmail } = require('../utils/notificationTemplates');
        const { sendPlatformEmail } = require('../utils/emailService');
        const emailContent = emailVerificationEmail(user.full_name || user.username, verificationUrl);

        await sendPlatformEmail({
          to: user.email,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
          allowUnverified: true   // 인증메일은 미인증 본인 주소에 도달해야 함
        }).catch(err => console.error('[USERS] Verification email failed:', err.message));
      } catch (verifyErr) {
        console.error('[USERS] Verification setup failed:', verifyErr.message);
      }
    }

    // Brand General / Foodcourt General: 유저만 생성
    // Brand/Foodcourt 엔티티는 본인이 로그인 후 직접 추가 (Brand Management / Foodcourt Management 페이지)

    // Auto-generate first subscription invoice for subscribing users (non-blocking)
    if (hasSubscription) {
      try {
        const { createInitialInvoice } = require('../services/subscriptionInvoiceService');
        const result = await createInitialInvoice({
          kind: 'user',
          id: user.id,
          role: user.role,
          plan_type: user.plan_type,
          plan_amount: user.plan_amount,
          billing_cycle: user.billing_cycle,
          currency: user.currency,
          subscription_start: user.subscription_start
        });
        if (result && result.invoice) {
          console.log(`[Auto-Invoice] Created ${result.invoiceNumber} for new ${role} "${user.full_name || user.email}"`);
        }
      } catch (invoiceError) {
        console.error('[Auto-Invoice] Failed to generate initial invoice for user:', invoiceError.message);
      }
    }

    console.log('✓ User created successfully:', user.id, user.username);

    logActivity(req, {
      action_type: 'create',
      entity_type: 'staff',
      entity_id: user.id,
      entity_name: user.full_name || user.username,
      description: `Created ${role || 'Staff'} "${user.full_name || user.username}" (${email})`,
      restaurant_id: finalRestaurantId
    });

    // Return user without password (include generated password if auto-generated)
    const { password: _, ...userWithoutPassword } = user.toJSON();
    const response = { success: true, data: userWithoutPassword };
    if (generatedPassword) {
      response.generatedPassword = generatedPassword;
    }
    res.status(201).json(response);
  } catch (error) {
    console.error('✗ Error creating user:', error);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Update user (본인 또는 System Admin만)
router.put('/:id', authenticateToken, demoProtection, async (req, res) => {
  // Permission gate: self / System Admin / Restaurant Admin (same restaurant, staff only)
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isSelf = req.user.id.toString() === req.params.id;
    const isSysAdmin = req.user.role === 'System Admin';
    const isRestaurantAdminMatch =
      req.user.role === 'Restaurant Admin' &&
      req.user.restaurant_id &&
      user.restaurant_id === req.user.restaurant_id &&
      user.role === 'Staff';

    // 2026-06-16 BG-1-2/1-3: BG/FG 가 자기 산하 매장의 Restaurant Admin 을 수정/비활성할 수 있어야 함.
    // (목록 조회는 허용하면서 수정만 403 이던 비대칭 — 가맹점 Admin 정보수정/Deactivate 가 막혔음)
    // userCanAccessRestaurant 가 BG=brand 소유, FG=foodcourt 소유, Owner=ownership 을 검증.
    let isSupervisorMatch = false;
    const supervisorRoles = ['Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner'];
    if (!isSelf && !isSysAdmin && !isRestaurantAdminMatch &&
        supervisorRoles.includes(req.user.role) &&
        user.restaurant_id && ['Restaurant Admin', 'Staff'].includes(user.role)) {
      try { isSupervisorMatch = await userCanAccessRestaurant(req.user, user.restaurant_id); } catch { isSupervisorMatch = false; }
    }

    if (!isSelf && !isSysAdmin && !isRestaurantAdminMatch && !isSupervisorMatch) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own account, staff in your restaurant, or admins of restaurants you oversee.',
        code: 'NOT_PERMITTED'
      });
    }

    // Restaurant Admin cannot promote a Staff into a higher role
    if (isRestaurantAdminMatch && req.body.role && req.body.role !== 'Staff') {
      return res.status(403).json({
        success: false,
        message: 'Restaurant Admin cannot change a staff member\'s role.',
        code: 'ROLE_CHANGE_NOT_ALLOWED'
      });
    }
    // Same guard for restaurant_id changes — Restaurant Admin must not move
    // staff to another restaurant.
    if (isRestaurantAdminMatch && req.body.restaurant_id !== undefined && req.body.restaurant_id !== user.restaurant_id) {
      return res.status(403).json({
        success: false,
        message: 'Restaurant Admin cannot reassign staff to another restaurant.',
        code: 'TENANT_CHANGE_NOT_ALLOWED'
      });
    }
    // 2026-06-16 (BG-1-3): can't deactivate your own account (would lock yourself out).
    if (isSelf && req.body.is_active === false) {
      return res.status(400).json({
        success: false,
        message: 'You cannot deactivate your own account.',
        code: 'CANNOT_DEACTIVATE_SELF'
      });
    }
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Permission check failed' });
  }

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('✓ User found:', user.username, user.email);

    const { password, first_name, last_name, ...updateData } = req.body;

    // Mass-assignment guard: account-classification and subscription/billing fields are
    // System-Admin-only. A non-admin caller (a user editing their own account, or a
    // Restaurant Admin / supervisor editing a sub-account) must never set these — otherwise
    // a BG could self-grant is_test (→ Enterprise gate) or edit plan_type/subscription_status.
    // A user also must not change their OWN role/permissions. (Fable 2026-07-05)
    const isSysAdminCaller = req.user.role === 'System Admin';
    const isSelfCaller = req.user.id.toString() === req.params.id;
    if (!isSysAdminCaller) {
      const ADMIN_ONLY_FIELDS = [
        'is_test', 'is_demo', 'plan_type', 'subscription_status', 'subscription_start',
        'subscription_end', 'plan_amount', 'pending_plan_type', 'pending_plan_amount',
        'plan_change_date', 'plan_change_type', 'discount_type', 'discount_value', 'discount_reason'
      ];
      for (const f of ADMIN_ONLY_FIELDS) delete updateData[f];
      if (isSelfCaller) { delete updateData.role; delete updateData.permissions; }
    }

    // Prevent leaving restaurant-scoped roles without a restaurant.
    // Covers both direct restaurant_id clears and role promotions/demotions that
    // would result in a Restaurant Admin / Staff with no restaurant.
    const nextRole = updateData.role !== undefined ? updateData.role : user.role;
    const nextRestaurantId = updateData.restaurant_id !== undefined
      ? updateData.restaurant_id
      : user.restaurant_id;
    if ((nextRole === 'Restaurant Admin' || nextRole === 'Staff') && !nextRestaurantId) {
      return res.status(400).json({
        success: false,
        error: `${nextRole} requires a restaurant. Please assign the account to a restaurant before saving.`
      });
    }

    // If password is being updated, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Generate full_name from first_name and last_name if provided
    if (first_name || last_name) {
      updateData.full_name = (first_name && last_name) ?
        `${first_name} ${last_name}` :
        (first_name || last_name);
    }

    const { Op } = require('sequelize');

    // Email duplicate check (only if email is being changed)
    if (updateData.email && updateData.email !== user.email) {
      const emailExists = await User.findOne({
        where: {
          email: updateData.email,
          id: { [Op.ne]: user.id }
        }
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          error: `Email "${updateData.email}" is already used by another user`
        });
      }
      // 이메일 변경 → 재인증 필요 (Irene 2026-06-01: "변경하려면 인증해야"). 미인증 처리.
      updateData.email_verified = false;
    }

    // PIN duplicate check within same restaurant (only if pin_code is being changed)
    if (updateData.pin_code && user.restaurant_id) {
      const pinExists = await User.findOne({
        where: {
          restaurant_id: user.restaurant_id,
          pin_code: updateData.pin_code,
          id: { [Op.ne]: user.id }
        }
      });
      if (pinExists) {
        return res.status(400).json({
          success: false,
          error: `PIN ${updateData.pin_code} is already used by another staff member`
        });
      }
    }

    // Subscription fields — all roles store on users table directly
    if (updateData.plan_amount !== undefined) {
      updateData.plan_amount = updateData.plan_amount ? parseFloat(updateData.plan_amount) : null;
    }

    // Discount fields (mirror Restaurant.discount_*)
    if (updateData.discount_type !== undefined) {
      const validDt = ['none', 'percentage', 'fixed'].includes(updateData.discount_type) ? updateData.discount_type : 'none';
      updateData.discount_type = validDt;
      if (validDt === 'none') {
        updateData.discount_value = 0;
        updateData.discount_reason = null;
      } else {
        updateData.discount_value = Number(updateData.discount_value) || 0;
      }
    }

    // Detect subscription field changes (for invoice sync later)
    const subscriptionFieldsChanged =
      updateData.plan_type !== undefined ||
      updateData.plan_amount !== undefined ||
      updateData.billing_cycle !== undefined ||
      updateData.subscription_start !== undefined ||
      updateData.currency !== undefined ||
      updateData.discount_type !== undefined ||
      updateData.discount_value !== undefined;

    // Auto-calculate subscription_end if start + billing_cycle provided
    // Monthly: +1 month - 1 day. Annual: +1 year - 1 day.
    const effectiveBillingCycle = updateData.billing_cycle || user.billing_cycle;
    const effectiveStart = updateData.subscription_start;
    if (effectiveStart && effectiveBillingCycle) {
      const startDate = new Date(effectiveStart);
      if (effectiveBillingCycle === 'annual') {
        startDate.setFullYear(startDate.getFullYear() + 1);
      } else {
        startDate.setMonth(startDate.getMonth() + 1);
      }
      startDate.setDate(startDate.getDate() - 1);
      updateData.subscription_end = startDate;

      // Re-derive subscription_status from start vs today
      const todayMid = new Date();
      todayMid.setHours(0, 0, 0, 0);
      const startMid = new Date(effectiveStart);
      startMid.setHours(0, 0, 0, 0);
      if (startMid > todayMid) {
        // Future service start MUST be trial (service hasn't begun) — force it even
        // if the client/form sent status='active'/'suspended', mirroring the create
        // path (line ~516) and restaurants-crud PUT. A soft (=== undefined) guard let
        // a future-start BG/FG account be saved active/suspended → the user 29 (thefire
        // BG) drift on 2026-06-13. Billing must wait until the start date.
        updateData.subscription_status = 'trial';
        const tEnd = new Date(startMid);
        tEnd.setDate(tEnd.getDate() - 1);
        updateData.trial_end_date = tEnd;
      } else {
        // Starts today/past → honor requested status (trial requires a future start)
        if (updateData.subscription_status === undefined) updateData.subscription_status = 'active';
        updateData.trial_end_date = null;
      }
    }

    await user.update(updateData);

    // 이메일 변경 시 새 주소로 인증메일 발송 (위 블록에서 email_verified=false 설정된 경우만).
    if (updateData.email_verified === false && updateData.email) {
      try { require('../services/authService').sendVerificationEmail(user); }
      catch (e) { console.warn('[profile email change] verification email skip:', e && e.message); }
    }

    // Sync pending invoice if subscription changed (for subscribing roles)
    const SUBSCRIBING_ROLES = ['Brand General', 'Foodcourt General', 'Restaurant Owner', 'Supplier Admin'];
    if (subscriptionFieldsChanged && SUBSCRIBING_ROLES.includes(user.role) && user.subscription_start && user.plan_type) {
      try {
        const { syncPendingInvoice, createInitialInvoice } = require('../services/subscriptionInvoiceService');
        const subject = {
          kind: 'user',
          id: user.id,
          role: user.role,
          plan_type: user.plan_type,
          plan_amount: user.plan_amount,
          billing_cycle: user.billing_cycle,
          currency: user.currency,
          subscription_start: user.subscription_start
        };
        const syncResult = await syncPendingInvoice(subject);
        if (syncResult.updated) {
          console.log(`[Auto-Invoice Sync] Updated ${syncResult.invoiceNumber} after subscription change for user ${user.id}`);
          logActivity(req, {
            action_type: 'update',
            entity_type: 'invoice',
            entity_id: syncResult.updated.id,
            entity_name: syncResult.invoiceNumber,
            description: `Auto-synced invoice ${syncResult.invoiceNumber} due to subscription update for ${user.role} "${user.full_name || user.username}"`
          });
        } else if (syncResult.reason === 'no_pending') {
          // No pending invoice — create a new one (first-time subscription activation via edit)
          const createResult = await createInitialInvoice(subject);
          if (createResult && createResult.invoice) {
            console.log(`[Auto-Invoice] Created ${createResult.invoiceNumber} on subscription edit for user ${user.id}`);
          }
        }
      } catch (invoiceError) {
        console.error('[Auto-Invoice Sync] Error syncing invoice for user:', invoiceError.message);
      }
    }

    logActivity(req, {
      action_type: 'update',
      entity_type: 'staff',
      entity_id: user.id,
      entity_name: user.full_name || user.username,
      description: `Updated ${user.role} "${user.full_name || user.username}"`,
      restaurant_id: user.restaurant_id
    });

    console.log('✓ User updated successfully');

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('✗ Error updating user:', error);
    // Duplicate entry 에러를 사용자 친화적 메시지로 변환
    if (error.original && error.original.code === 'ER_DUP_ENTRY') {
      const match = error.original.message.match(/Duplicate entry '(.+?)' for key '(.+?)'/);
      if (match) {
        return res.status(400).json({ success: false, error: `"${match[1]}" is already in use by another user` });
      }
    }
    res.status(400).json({ success: false, error: error.message });
  }
});

// Delete user (with cascade cleanup)
router.delete('/:id', authenticateToken, async (req, res) => {
  // Permission gate: System Admin (any) or Restaurant Admin (own staff only).
  // Self-delete blocked further below for both roles.
  if (!['System Admin', 'Restaurant Admin'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      error: `This action requires System Admin or Restaurant Admin. Your role is ${req.user.role}.`,
      code: 'INSUFFICIENT_ROLE'
    });
  }
  if (req.user.role === 'Restaurant Admin') {
    try {
      const target = await User.findByPk(req.params.id, { attributes: ['id', 'restaurant_id', 'role'] });
      if (!target) return res.status(404).json({ success: false, error: { message: 'User not found', code: 'NOT_FOUND' } });
      if (!req.user.restaurant_id || target.restaurant_id !== req.user.restaurant_id) {
        return res.status(403).json({
          success: false,
          error: 'You can only remove staff in your own restaurant.',
          code: 'TENANT_MISMATCH'
        });
      }
      if (target.role !== 'Staff') {
        return res.status(403).json({
          success: false,
          error: 'Restaurant Admin can only remove members with role=Staff.',
          code: 'ROLE_NOT_ALLOWED'
        });
      }
    } catch (e) {
      return res.status(500).json({ success: false, error: { message: 'Permission check failed', code: 'INTERNAL_ERROR' } });
    }
  }
  return deleteUserHandler(req, res);
});

async function deleteUserHandler(req, res) {
  const { sequelize } = require('../config/database');
  const RestaurantManager = require('../models/RestaurantManager');
  const Restaurant = require('../models/Restaurant');
  const Brand = require('../models/Brand');
  const Foodcourt = require('../models/Foodcourt');
  const OperationTicket = require('../models/OperationTicket');
  const Comment = require('../models/Comment');
  const Notice = require('../models/Notice');
  const NoticeRecipient = require('../models/NoticeRecipient');
  const EntityPlan = require('../models/EntityPlan');
  const RestaurantIngredientCost = require('../models/RestaurantIngredientCost');

  // Self-delete 차단 (System Admin이라도 자기 계정은 못 지움)
  if (req.user.id.toString() === req.params.id.toString()) {
    return res.status(400).json({ success: false, error: { message: 'You cannot delete your own account.', code: 'VALIDATION_ERROR' } });
  }

  const t = await sequelize.transaction();

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      await t.rollback();
      return res.status(404).json({ success: false, error: { message: 'User not found', code: 'NOT_FOUND' } });
    }

    const uid = user.id;

    // 0. Referral safety net — never delete a partner with unsettled balance or
    //    pending payout. Locking the wallet rows prevents a concurrent commission
    //    credit from sneaking in between this check and the user.destroy below.
    const ReferralWallet = require('../models/ReferralWallet');
    const ReferralPayout = require('../models/ReferralPayout');
    const wallets = await ReferralWallet.findAll({
      where: { user_id: uid },
      transaction: t,
      lock: t.LOCK.UPDATE
    });
    const nonZeroWallets = wallets.filter(w => parseFloat(w.balance) > 0);
    const inflightPayout = await ReferralPayout.findOne({
      where: { user_id: uid, status: { [require('sequelize').Op.in]: ['requested', 'approved'] } },
      transaction: t,
      lock: t.LOCK.UPDATE
    });
    if (nonZeroWallets.length > 0 || inflightPayout) {
      await t.rollback();
      const balanceSummary = nonZeroWallets
        .map(w => `${w.currency} ${parseFloat(w.balance).toFixed(2)}`)
        .join(', ');
      const reasons = [];
      if (nonZeroWallets.length > 0) reasons.push(`unsettled wallet balance (${balanceSummary})`);
      if (inflightPayout) reasons.push(`pending payout #${inflightPayout.id} (${inflightPayout.status})`);
      return res.status(409).json({
        success: false,
        error: `Cannot delete user — ${reasons.join(' and ')}. Settle the payout(s) first, then retry.`,
        code: 'REFERRAL_BALANCE_NOT_SETTLED',
        details: {
          unsettled_balances: nonZeroWallets.map(w => ({ currency: w.currency, balance: parseFloat(w.balance) })),
          pending_payout_id: inflightPayout?.id || null,
          pending_payout_status: inflightPayout?.status || null
        }
      });
    }

    // 1. Remove junction table records
    await RestaurantManager.destroy({ where: { manager_id: uid }, transaction: t });
    await NoticeRecipient.destroy({ where: { user_id: uid }, transaction: t });

    // 2. Unlink restaurants admin_id
    await Restaurant.update({ admin_id: null, admin_name: null }, { where: { admin_id: uid }, transaction: t });

    // 3. Unlink brand/foodcourt ownership
    await Brand.update({ owner_id: null }, { where: { owner_id: uid }, transaction: t });
    await Foodcourt.update({ owner_id: null }, { where: { owner_id: uid }, transaction: t });

    // 4. Unlink operation tickets
    await OperationTicket.update({ managerId: null }, { where: { managerId: uid }, transaction: t });
    await OperationTicket.update({ requesterId: null }, { where: { requesterId: uid }, transaction: t });

    // 5. Unlink comments and notices (set NULL for read_by)
    await Comment.update({ author_id: null }, { where: { author_id: uid }, transaction: t });
    await Notice.update({ author_id: null }, { where: { author_id: uid }, transaction: t });
    await NoticeRecipient.update({ read_by: null }, { where: { read_by: uid }, transaction: t });

    // 6. Unlink entity plans and ingredient costs
    await EntityPlan.update({ created_by: null }, { where: { created_by: uid }, transaction: t });
    await RestaurantIngredientCost.update({ updated_by: null }, { where: { updated_by: uid }, transaction: t });

    // 6b. Unlink activity logs and orders (cashier)
    const ActivityLog = require('../models/ActivityLog');
    await ActivityLog.update({ user_id: null }, { where: { user_id: uid }, transaction: t });
    const Order = require('../models/Order');
    await Order.update({ cashier_id: null }, { where: { cashier_id: uid }, transaction: t });

    // 6c. Unlink comment reads, import history, inventory, stock takes
    const CommentRead = require('../models/CommentRead');
    await CommentRead.update({ user_id: null }, { where: { user_id: uid }, transaction: t });
    const ImportHistory = require('../models/ImportHistory');
    await ImportHistory.update({ user_id: null }, { where: { user_id: uid }, transaction: t });
    const InventoryTransaction = require('../models/InventoryTransaction');
    await InventoryTransaction.update({ created_by: null }, { where: { created_by: uid }, transaction: t });
    const StockTake = require('../models/StockTake');
    await StockTake.update({ created_by: null }, { where: { created_by: uid }, transaction: t });

    // 7. Delete the user
    const userName = user.full_name || user.username;
    const userRole = user.role;
    const userRestaurantId = user.restaurant_id;
    await user.destroy({ transaction: t });

    await t.commit();

    logActivity(req, {
      action_type: 'delete',
      entity_type: 'staff',
      entity_id: uid,
      entity_name: userName,
      description: `Deleted ${userRole} "${userName}"`,
      restaurant_id: userRestaurantId
    });

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    await t.rollback();
    console.error('[Users] Error deleting user:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}

// Update user password
router.patch('/:id/password', authenticateToken, demoProtection, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'User not found', code: 'NOT_FOUND' } });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, error: { message: 'Current password is incorrect', code: 'VALIDATION_ERROR' } });
    }

    // Validate new password strength
    if (!newPassword || newPassword.length < 8) {
      return res.status(400).json({ success: false, error: { message: 'Password must be at least 8 characters long', code: 'VALIDATION_ERROR' } });
    }
    if (!/[a-z]/.test(newPassword)) {
      return res.status(400).json({ success: false, error: { message: 'Password must contain at least one lowercase letter', code: 'VALIDATION_ERROR' } });
    }
    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({ success: false, error: { message: 'Password must contain at least one uppercase letter', code: 'VALIDATION_ERROR' } });
    }
    if (!/[0-9]/.test(newPassword)) {
      return res.status(400).json({ success: false, error: { message: 'Password must contain at least one number', code: 'VALIDATION_ERROR' } });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// What and Why: 패스워드 리셋 - System Admin 또는 Restaurant Admin(자기 스태프만)
// - 강력한 임시 비밀번호 생성 (12자, 대소문자+숫자+특수문자)
// - 응답에 임시 비밀번호 포함하여 관리자가 사용자에게 전달
// Permission handled inline (System Admin OR Restaurant Admin for own staff).
// Removed router-level requireRole guard which previously contradicted the
// inline Restaurant Admin branch and made it unreachable.
router.post('/:id/reset-password', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, error: { message: 'User not found', code: 'NOT_FOUND' } });
    }

    // 데모 계정만 비밀번호 리셋 차단 (자정마다 자동 리셋되는 계정이라 의미 없음).
    // is_test 는 통계 제외용 표시일 뿐 — 실제 staff 계정이므로 admin 이 비번 리셋 가능해야 함.
    if (user.is_demo) {
      return res.status(403).json({ success: false, error: 'Demo account passwords cannot be changed.' });
    }

    // 권한 체크 (계층):
    //   System Admin     → 모든 user
    //   Brand General    → 본인 brand 산하 매장의 user (Restaurant Admin / Staff / Brand Manager)
    //   Foodcourt General→ 본인 foodcourt 산하 매장의 user + Foodcourt Manager
    //   Restaurant Admin → 본인 매장의 Staff (+ 본인 자신)
    //   Restaurant Owner → 본인 소유 매장의 user
    //   기타             → 차단
    const FORBIDDEN_RESP = { success: false, error: { message: 'Not authorized to reset this user\'s password', code: 'FORBIDDEN' } };

    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Brand General') {
      const Brand = require('../models/Brand');
      const myBrands = await Brand.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
      const myBrandIds = myBrands.map(b => b.id);
      if (myBrandIds.length === 0) return res.status(403).json(FORBIDDEN_RESP);

      // 분기 by target role:
      //   Brand Manager / Brand General → user.brand_id 가 myBrandIds 에 있어야
      //   Restaurant Admin / Staff      → restaurant.brand_id 가 myBrandIds 에 있어야
      //   그 외 (System Admin / Owner / Supplier 등) → 차단
      let allowed = false;
      if (['Brand Manager', 'Brand General'].includes(user.role)) {
        allowed = !!user.brand_id && myBrandIds.includes(user.brand_id);
      } else if (['Restaurant Admin', 'Staff'].includes(user.role) && user.restaurant_id) {
        const Restaurant = require('../models/Restaurant');
        const r = await Restaurant.findByPk(user.restaurant_id, { attributes: ['brand_id'] });
        allowed = !!r && myBrandIds.includes(r.brand_id);
      }
      if (!allowed) return res.status(403).json(FORBIDDEN_RESP);
    } else if (req.user.role === 'Foodcourt General') {
      const Foodcourt = require('../models/Foodcourt');
      const myFoodcourts = await Foodcourt.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
      const myFoodcourtIds = myFoodcourts.map(f => f.id);
      if (myFoodcourtIds.length === 0) return res.status(403).json(FORBIDDEN_RESP);

      let allowed = false;
      if (['Foodcourt Manager', 'Foodcourt General'].includes(user.role)) {
        allowed = !!user.foodcourt_id && myFoodcourtIds.includes(user.foodcourt_id);
      } else if (['Restaurant Admin', 'Staff'].includes(user.role) && user.restaurant_id) {
        const Restaurant = require('../models/Restaurant');
        const r = await Restaurant.findByPk(user.restaurant_id, { attributes: ['foodcourt_id'] });
        allowed = !!r && myFoodcourtIds.includes(r.foodcourt_id);
      }
      if (!allowed) return res.status(403).json(FORBIDDEN_RESP);
    } else if (req.user.role === 'Restaurant Admin') {
      if (!req.user.restaurant_id || user.restaurant_id?.toString() !== req.user.restaurant_id.toString()) {
        return res.status(403).json(FORBIDDEN_RESP);
      }
      if (user.role !== 'Staff' && user.id !== req.user.id) {
        return res.status(403).json(FORBIDDEN_RESP);
      }
    } else if (req.user.role === 'Restaurant Owner') {
      const RestaurantManager = require('../models/RestaurantManager');
      const owned = await RestaurantManager.findAll({
        where: { manager_id: req.user.id, relationship_type: 'ownership' },
        attributes: ['restaurant_id']
      });
      const ownedIds = owned.map(o => o.restaurant_id);
      if (!user.restaurant_id || !ownedIds.includes(user.restaurant_id)) {
        return res.status(403).json(FORBIDDEN_RESP);
      }
    } else {
      return res.status(403).json(FORBIDDEN_RESP);
    }

    // 강력한 임시 비밀번호 생성 (12자)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let tempPassword = '';
    for (let i = 0; i < 12; i++) {
      tempPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({
      success: true,
      message: 'Password has been reset successfully',
      tempPassword: tempPassword
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;