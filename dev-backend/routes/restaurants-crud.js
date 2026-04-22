// 레스토랑 CRUD (list/get/create/update/delete) + 조회
// 마운트: /api/restaurants

const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const PlanTemplate = require('../models/PlanTemplate');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AddonModule = require('../models/AddonModule');
const { Recipe, Ingredient, RecipeIngredient } = require('../models');
const CompanySettings = require('../models/CompanySettings');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
const { validateRestaurantCreation } = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const { getTodayBounds, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { deleteOldImages } = require('../utils/imageProcessor');


// Optional authentication middleware
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token && process.env.JWT_SECRET) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          restaurant_id: user.restaurant_id,
          brand_id: user.brand_id,
          foodcourt_id: user.foodcourt_id,
          branch_id: user.branch_id,
          manager_id: user.manager_id
        };
      }
    }
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};

router.get('/', optionalAuth, async (req, res) => {
  try {
    const { brand_id, search, limit, status } = req.query;
    const { Op } = require('sequelize');

    // Build include options for managers
    const managersInclude = {
      model: User,
      as: 'managers',
      attributes: ['id', 'full_name', 'username', 'email', 'role'],
      through: { attributes: ['is_primary'] }
    };

    // Build where clause
    const whereClause = {};

    // Filter by brand_id if provided
    if (brand_id) {
      whereClause.brand_id = brand_id;
    }

    // Filter by status (comma-separated multi-value support, e.g. ?status=active,trial)
    if (status && typeof status === 'string' && status.trim()) {
      const allowed = ['active', 'inactive', 'trial', 'overdue', 'suspended', 'expired', 'cancelled'];
      const values = status.split(',').map(s => s.trim()).filter(v => allowed.includes(v));
      if (values.length === 1) whereClause.status = values[0];
      else if (values.length > 1) whereClause.status = { [Op.in]: values };
    }

    // Server-side text search (name, branch_name, slug, phone, address)
    if (search && typeof search === 'string' && search.trim().length > 0) {
      const term = `%${search.trim()}%`;
      whereClause[Op.or] = [
        { name: { [Op.like]: term } },
        { branch_name: { [Op.like]: term } },
        { slug: { [Op.like]: term } },
        { phone: { [Op.like]: term } },
        { address: { [Op.like]: term } }
      ];
    }

    // Filter restaurants based on user role
    if (req.user && (req.user.role === 'Brand General' || req.user.role === 'Brand Manager')) {
      managersInclude.where = { id: req.user.id };
      managersInclude.required = true;
    } else if (req.user && (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') && req.user.foodcourt_id) {
      // Scope to restaurants assigned to this foodcourt
      whereClause.foodcourt_id = req.user.foodcourt_id;
      // Branch-scoped Foodcourt Manager: further limit to restaurants in their branch
      if (req.user.role === 'Foodcourt Manager' && req.user.branch_id) {
        whereClause.branch_id = req.user.branch_id;
      }
    }

    const findOpts = {
      where: whereClause,
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'full_name', 'username', 'email', 'phone', 'role']
        },
        managersInclude,
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'code', 'logo_url']
        },
        {
          model: require('../models').FoodcourtBranch,
          as: 'branch',
          attributes: ['id', 'name', 'code']
        }
      ],
      order: [['createdAt', 'DESC']]
    };

    // Apply limit when explicitly requested (e.g., dropdown search)
    const parsedLimit = parseInt(limit, 10);
    if (Number.isFinite(parsedLimit) && parsedLimit > 0 && parsedLimit <= 100) {
      findOpts.limit = parsedLimit;
    }

    const restaurants = await Restaurant.findAll(findOpts);

    // Batch fetch today's sales, orders, and staff count for all restaurants
    const restaurantIds = restaurants.map(r => r.id);
    const todayStatsMap = {};
    const staffCountMap = {};

    if (restaurantIds.length > 0) {
      try {
        const { sequelize } = require('../config/database');
        const { QueryTypes } = require('sequelize');

        // Today's sales & orders (completed/served orders)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const salesStats = await sequelize.query(`
          SELECT restaurant_id,
            COALESCE(SUM(total_amount), 0) as total_sales,
            COUNT(*) as order_count
          FROM orders
          WHERE restaurant_id IN (:ids)
            AND status IN ('completed', 'served')
            AND createdAt BETWEEN :start AND :end
          GROUP BY restaurant_id
        `, {
          replacements: { ids: restaurantIds, start: todayStart, end: todayEnd },
          type: QueryTypes.SELECT
        });

        salesStats.forEach(s => {
          todayStatsMap[s.restaurant_id] = {
            sales: parseFloat(s.total_sales) || 0,
            orders: parseInt(s.order_count) || 0
          };
        });

        // Staff count per restaurant
        const staffStats = await sequelize.query(`
          SELECT restaurant_id, COUNT(*) as cnt
          FROM users
          WHERE restaurant_id IN (:ids)
            AND role IN ('Staff', 'Restaurant Admin')
          GROUP BY restaurant_id
        `, {
          replacements: { ids: restaurantIds },
          type: QueryTypes.SELECT
        });

        staffStats.forEach(s => {
          staffCountMap[s.restaurant_id] = parseInt(s.cnt) || 0;
        });
      } catch (err) {
        console.error('Error fetching restaurant stats:', err.message);
      }
    }

    // Transform data to match frontend interface
    const transformedRestaurants = restaurants.map(restaurant => {
      const restaurantData = restaurant.toJSON();

      // Restaurant Admin (Owner) - via admin_id (1:1)
      const adminData = restaurantData.admin || null;

      // Oversight managers (Brand/Foodcourt) - via RestaurantManager (N:M)
      const managers = (restaurantData.managers || []).filter(m =>
        m.role !== 'Restaurant Admin' && m.role !== 'Staff'
      );
      const primaryManager = managers.find(m => m.RestaurantManager?.is_primary) || managers[0];

      return {
        id: restaurantData.id.toString(),
        name: restaurantData.name,
        branch_name: restaurantData.branch_name || null,
        // Admin (Owner) 정보
        admin: adminData ? {
          id: adminData.id.toString(),
          name: adminData.full_name || adminData.username,
          username: adminData.username,
          email: adminData.email,
          phone: adminData.phone || '',
          role: adminData.role
        } : null,
        // 하위 호환: managerId/managerName 유지 (프론트엔드 호환)
        managerId: restaurantData.admin_id ? restaurantData.admin_id.toString() : (primaryManager ? primaryManager.id.toString() : ''),
        managerName: restaurantData.admin_name || (adminData ? adminData.full_name || adminData.username : (primaryManager ? primaryManager.full_name || primaryManager.username : 'Unassigned')),
        // 감독 매니저 (Brand/Foodcourt만)
        managers: managers.map(m => ({
          id: m.id.toString(),
          name: m.full_name || m.username,
          email: m.email,
          role: m.role,
          isPrimary: m.RestaurantManager?.is_primary || false
        })),
        brandId: restaurantData.brand_id ? restaurantData.brand_id.toString() : null,
        brand_id: restaurantData.brand_id || null,
        brand: restaurantData.brand ? {
          id: restaurantData.brand.id.toString(),
          name: restaurantData.brand.name,
          code: restaurantData.brand.code,
          logoUrl: restaurantData.brand.logo_url
        } : null,
        location: restaurantData.address || '',
        cuisine: restaurantData.cuisine || 'Various',
        status: restaurantData.status || 'inactive',
        todaySales: todayStatsMap[restaurantData.id]?.sales || 0,
        todayOrders: todayStatsMap[restaurantData.id]?.orders || 0,
        staffCount: staffCountMap[restaurantData.id] || 0,
        rating: 4.5, // Default value
        createdAt: restaurantData.createdAt,
        lastOrder: restaurantData.updatedAt,
        email: restaurantData.email || '',
        phone: restaurantData.phone || '',
        address: restaurantData.address || '',
        planType: restaurantData.plan_type || 'Basic Plan',
        planAmount: restaurantData.plan_amount ? restaurantData.plan_amount.toString() : '29.00',
        subscriptionStart: restaurantData.subscription_start ? restaurantData.subscription_start.toISOString().split('T')[0] : null,
        subscriptionEnd: restaurantData.subscription_end ? restaurantData.subscription_end.toISOString().split('T')[0] : null,
        billing_cycle: restaurantData.billing_cycle || 'monthly',
        auto_renew: restaurantData.auto_renew !== undefined && restaurantData.auto_renew !== null ? restaurantData.auto_renew : true,
        menu_item_limit: restaurantData.menu_item_limit || 50,
        order_limit: restaurantData.order_limit || 1000,
        staff_limit: restaurantData.staff_limit || 5,
        payment_model: restaurantData.payment_model || 'restaurant',
        foodcourt_id: restaurantData.foodcourt_id || null,
        branch_id: restaurantData.branch_id || null,
        branch: restaurantData.branch ? {
          id: restaurantData.branch.id,
          name: restaurantData.branch.name,
          code: restaurantData.branch.code
        } : null,
        city: restaurantData.city || '',
        state: restaurantData.state || '',
        postalCode: restaurantData.postal_code || '',
        country: restaurantData.country || 'MY',
        latitude: restaurantData.latitude ?? null,
        longitude: restaurantData.longitude ?? null,
        businessRegistration: restaurantData.business_registration || '',
        taxId: restaurantData.tax_id || '',
        currency: restaurantData.currency || 'MYR',
        discount_type: restaurantData.discount_type || 'none',
        discount_value: restaurantData.discount_value ? parseFloat(restaurantData.discount_value) : 0,
        discount_reason: restaurantData.discount_reason || null,
        is_demo: restaurantData.is_demo || false,
        is_test: restaurantData.is_test || false
      };
    });

    res.json(transformedRestaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Get restaurants for a specific manager
router.get('/manager/:managerId', authenticateToken, async (req, res) => {
  try {
    const { managerId } = req.params;

    // Get the target user to determine scope strategy
    const targetUser = await User.findByPk(managerId, { attributes: ['id', 'role', 'brand_id', 'foodcourt_id'] });
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    let restaurants;
    if ((targetUser.role === 'Foodcourt General' || targetUser.role === 'Foodcourt Manager') && targetUser.foodcourt_id) {
      // Foodcourt-scoped: all restaurants in this foodcourt
      restaurants = await Restaurant.findAll({
        where: { foodcourt_id: targetUser.foodcourt_id },
        order: [['createdAt', 'DESC']]
      });
    } else {
      // Default (Brand General, Brand Manager, Restaurant Owner): restaurants via RestaurantManager join
      restaurants = await Restaurant.findAll({
        include: [{
          model: User,
          as: 'managers',
          where: { id: managerId },
          attributes: [],
          through: { attributes: [] }
        }],
        order: [['createdAt', 'DESC']]
      });
    }

    // Batch fetch today's sales, orders, and staff count
    const restaurantIds = restaurants.map(r => r.id);
    const todayStatsMap = {};
    const staffCountMap = {};

    if (restaurantIds.length > 0) {
      try {
        const { sequelize } = require('../config/database');
        const { QueryTypes } = require('sequelize');

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const salesStats = await sequelize.query(`
          SELECT restaurant_id,
            COALESCE(SUM(total_amount), 0) as total_sales,
            COUNT(*) as order_count
          FROM orders
          WHERE restaurant_id IN (:ids)
            AND status IN ('completed', 'served')
            AND createdAt BETWEEN :start AND :end
          GROUP BY restaurant_id
        `, {
          replacements: { ids: restaurantIds, start: todayStart, end: todayEnd },
          type: QueryTypes.SELECT
        });

        salesStats.forEach(s => {
          todayStatsMap[s.restaurant_id] = {
            sales: parseFloat(s.total_sales) || 0,
            orders: parseInt(s.order_count) || 0
          };
        });

        const staffStats = await sequelize.query(`
          SELECT restaurant_id, COUNT(*) as cnt
          FROM users
          WHERE restaurant_id IN (:ids)
            AND role IN ('Staff', 'Restaurant Admin')
          GROUP BY restaurant_id
        `, {
          replacements: { ids: restaurantIds },
          type: QueryTypes.SELECT
        });

        staffStats.forEach(s => {
          staffCountMap[s.restaurant_id] = parseInt(s.cnt) || 0;
        });
      } catch (err) {
        console.error('Error fetching manager restaurant stats:', err.message);
      }
    }

    const result = restaurants.map(r => {
      const data = r.toJSON();
      return {
        ...data,
        todaySales: todayStatsMap[data.id]?.sales || 0,
        todayOrders: todayStatsMap[data.id]?.orders || 0,
        staffCount: staffCountMap[data.id] || 0
      };
    });

    res.json(result);
  } catch (error) {
    console.error('[Restaurants] Error fetching manager restaurants:', error.message);
    res.status(500).json({ error: 'Failed to fetch manager restaurants', details: error.message });
  }
});

// Get restaurant details
// Get restaurant by slug
// 공개 라우트 - 모바일 고객이 slug로 레스토랑 정보 조회
// 보안: 민감정보(business_registration, tax_id, bank_account_name 등 일부)는 응답에 포함되지만
// 결제 흐름에 필요. manager 개인정보(email/phone)는 제외.
router.get('/slug/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { slug: req.params.slug }
    });

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const restaurantData = restaurant.toJSON();
    // 민감정보 마스킹: manager 정보는 제외
    delete restaurantData.admin_id;

    res.json({ success: true, data: restaurantData });
  } catch (error) {
    console.error('Error fetching restaurant by slug:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch restaurant details' });
  }
});

// Get table status for floor plan - MUST be before /:id route
router.get('/:id/table-status', authenticateToken, async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // 레스토랑 timezone 기준으로 "오늘" 계산
    const restaurant = await Restaurant.findByPk(restaurantId, { attributes: ['operation_settings'] });
    const timezone = getRestaurantTimezone(restaurant);
    const { startOfDay: todayStartUTC, endOfDay: todayEndUTC } = getTodayBounds(timezone);

    const activeOrders = await Order.findAll({
      where: {
        restaurant_id: restaurantId,
        table_number: { [Op.ne]: null },
        order_type: 'dine_in',
        status: { [Op.notIn]: ['cancelled'] },
        [Op.or]: [{ is_deleted: false }, { is_deleted: null }],
        createdAt: { [Op.between]: [todayStartUTC, todayEndUTC] }
      },
      attributes: [
        'table_number', 'status', 'payment_status', 'order_number', 'id',
        'total_amount', 'createdAt', 'customer_name', 'customer_id',
        'guest_count', 'order_items', 'subtotal', 'tax', 'service_charge',
        'discount', 'coupon_discount', 'discount_policy_amount', 'point_discount',
        'order_type', 'cashier_name',
        'coupon_code', 'discount_policy_name', 'points_used',
        'payment_method', 'card_type', 'source', 'customer_phone',
        'service_charge_rate', 'tax_rate', 'payment_proof'
      ],
      order: [['createdAt', 'DESC']]
    });

    // Build order info helper
    function buildOrderInfo(order) {
      let orderItems = [];
      try {
        orderItems = typeof order.order_items === 'string'
          ? JSON.parse(order.order_items)
          : (order.order_items || []);
      } catch (e) { orderItems = []; }

      const elapsed = Math.round((Date.now() - new Date(order.createdAt).getTime()) / 60000);

      let tableStatus = 'occupied';
      if (order.payment_status === 'failed' || order.status === 'outstanding') {
        tableStatus = 'needs-attention';
      } else if (order.status === 'ready' || order.status === 'served') {
        tableStatus = 'ready';
      } else if (order.status === 'completed') {
        tableStatus = 'completed';
      }

      return {
        tableNumber: order.table_number,
        status: tableStatus,
        totalAmount: parseFloat(order.total_amount || 0),
        elapsedMinutes: elapsed,
        orderId: order.id,
        orderNumber: order.order_number,
        customerName: order.customer_name,
        customerId: order.customer_id,
        paymentStatus: order.payment_status,
        guestCount: order.guest_count,
        orderItems: orderItems,
        subtotal: parseFloat(order.subtotal || 0),
        tax: parseFloat(order.tax || 0),
        serviceCharge: parseFloat(order.service_charge || 0),
        discount: parseFloat(order.discount || 0) + parseFloat(order.coupon_discount || 0) + parseFloat(order.discount_policy_amount || 0) + parseFloat(order.point_discount || 0),
        cashierName: order.cashier_name,
        orderStatus: order.status,
        couponCode: order.coupon_code || null,
        couponDiscount: parseFloat(order.coupon_discount || 0),
        discountPolicyName: order.discount_policy_name || null,
        discountPolicyAmount: parseFloat(order.discount_policy_amount || 0),
        pointDiscount: parseFloat(order.point_discount || 0),
        pointsUsed: parseInt(order.points_used || 0),
        paymentMethod: order.payment_method || null,
        cardType: order.card_type || null,
        orderSource: order.source || 'pos',
        customerPhone: order.customer_phone || null,
        serviceChargeRate: parseFloat(order.service_charge_rate || 0),
        taxRate: parseFloat(order.tax_rate || 0),
        orderCreatedAt: order.createdAt,
        notes: null,
        orderType: order.order_type || 'dine_in',
        paymentProof: order.payment_proof || null
      };
    }

    // Filter: exclude only cancelled. Keep completed (Leave button) and served (still at table).
    const activeOnly = activeOrders.filter(o => o.status !== 'cancelled');

    // Group all active orders per table
    const tableStatusMap = {};

    for (const order of activeOnly) {
      const tn = order.table_number;
      const info = buildOrderInfo(order);

      if (!tableStatusMap[tn]) {
        // First order for this table — set as primary (backward compatible)
        tableStatusMap[tn] = {
          ...info,
          orderCount: 1,
          orders: [info]
        };
      } else {
        // Additional order for same table
        tableStatusMap[tn].orders.push(info);
        tableStatusMap[tn].orderCount = tableStatusMap[tn].orders.length;
      }
    }

    res.json({ success: true, data: tableStatusMap });
  } catch (error) {
    console.error('Error fetching table status:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get restaurant company info (for invoices) - MUST be before /:id route
// 보안: 사업자등록번호, 은행계좌 등 민감정보 → 인증 + 레스토랑 접근권한 필수
router.get('/:id/company-info', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      attributes: [
        'id', 'name', 'trade_name', 'email', 'phone', 'address',
        'city', 'state', 'postal_code', 'country',
        'business_registration', 'tax_id', 'website',
        'bank_name', 'bank_account', 'bank_account_name', 'logo_url'
      ]
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Format response similar to brand/foodcourt company-info
    const companyInfo = {
      id: restaurant.id,
      name: restaurant.name,
      trade_name: restaurant.trade_name || restaurant.name,
      email: restaurant.email || '',
      phone: restaurant.phone || '',
      address: restaurant.address || '',
      city: restaurant.city || '',
      state: restaurant.state || '',
      postal_code: restaurant.postal_code || '',
      country: restaurant.country || 'MY',
      business_registration: restaurant.business_registration || '',
      tax_id: restaurant.tax_id || '',
      website: restaurant.website || '',
      bank_name: restaurant.bank_name || '',
      bank_account: restaurant.bank_account || '',
      bank_account_name: restaurant.bank_account_name || '',
      logo_url: restaurant.logo_url || ''
    };

    res.json(companyInfo);
  } catch (error) {
    console.error('Error fetching restaurant company info:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant company info' });
  }
});

// Get restaurant details
router.get('/:id', authenticateToken, async (req, res, next) => {
  // Guard: skip non-numeric IDs so concrete routes below (e.g. /subscriptions/manager/:id, /available/:id) can match
  if (isNaN(req.params.id)) return next('route');
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'admin',
          attributes: ['id', 'full_name', 'username', 'email', 'role', 'phone']
        },
        {
          model: User,
          as: 'managers',
          attributes: ['id', 'full_name', 'username', 'email', 'role', 'company_name', 'phone'],
          through: { attributes: ['is_primary'] }
        },
        {
          model: Brand,
          as: 'brand',
          attributes: ['id', 'name', 'logo_url']
        }
      ]
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Branch-scoped Foodcourt Manager: restrict to restaurants in their branch
    if (req.user.role === 'Foodcourt Manager' && req.user.branch_id) {
      if (restaurant.branch_id !== req.user.branch_id) {
        return res.status(403).json({ error: 'No access to this restaurant' });
      }
    }

    const restaurantData = restaurant.toJSON();

    // Normalize payment_settings: sync enabled flag with availableIn
    if (restaurantData.payment_settings) {
      const ps = typeof restaurantData.payment_settings === 'string'
        ? JSON.parse(restaurantData.payment_settings) : restaurantData.payment_settings;
      Object.keys(ps).forEach(key => {
        if (key === '_order') return;
        const m = ps[key];
        if (m && typeof m === 'object' && 'enabled' in m && 'availableIn' in m) {
          m.enabled = Array.isArray(m.availableIn) && m.availableIn.length > 0;
        }
      });
      restaurantData.payment_settings = ps;
    }

    const adminData = restaurantData.admin || null;
    const oversightManagers = (restaurantData.managers || []).filter(m =>
      m.role !== 'Restaurant Admin' && m.role !== 'Staff'
    );

    // Phase A (Restaurant-Contract-Plan linking): attach summary of current Contract +
    // Franchise/Tenancy Plan linked to this restaurant. Restaurant Edit modal and
    // Profile > Subscription tab use these to render the Franchise/Tenancy sections.
    let contract_summary = null;
    let contract_summaries = [];
    let entity_plan_summary = null;
    try {
      const { Contract, ContractPlan, EntityPlan, EntityPlanRestaurant, EntityPlanPrice } = require('../models');
      const { Op: SeqOp } = require('sequelize');
      // Find all linked contracts EXCEPT terminal stages — show active + in-progress (proposal/contracting/setup).
      // Primary = first by priority (active → setup → contracting → proposal), tie-break by latest updated.
      const stagePriority = { active: 0, setup: 1, contracting: 2, proposal: 3 };
      const linkedContracts = await Contract.findAll({
        where: { restaurant_id: restaurant.id, stage: { [SeqOp.notIn]: ['terminated', 'expired', 'renewed'] } },
        attributes: ['id', 'contract_number', 'entity_type', 'entity_id', 'contract_type', 'stage', 'start_date', 'end_date', 'currency', 'financial_terms', 'updatedAt'],
        order: [['updatedAt', 'DESC']]
      });
      if (linkedContracts.length > 0) {
        const sorted = [...linkedContracts].sort((a, b) =>
          (stagePriority[a.stage] ?? 99) - (stagePriority[b.stage] ?? 99)
        );
        const pick = (c) => ({
          id: c.id,
          contract_number: c.contract_number,
          entity_type: c.entity_type,
          entity_id: c.entity_id,
          contract_type: c.contract_type,
          stage: c.stage,
          start_date: c.start_date,
          end_date: c.end_date,
          currency: c.currency,
          financial_terms: c.financial_terms
        });
        contract_summary = pick(sorted[0]);
        contract_summaries = sorted.map(pick);
      }
      // Open entity-plan assignment (brand or foodcourt franchise/tenancy plan)
      const epr = await EntityPlanRestaurant.findOne({
        where: { restaurant_id: restaurant.id, is_active: true },
        include: [{ model: EntityPlan, as: 'plan', include: [{ model: EntityPlanPrice, as: 'prices' }] }]
      });
      if (epr && epr.plan) {
        const p = epr.plan;
        entity_plan_summary = {
          id: p.id,
          name: p.name,
          entity_type: p.entity_type,
          entity_id: p.entity_id,
          charge_type: p.charge_type,
          percentage_value: p.percentage_value,
          billing_day: p.billing_day,
          currency: p.currency,
          prices: (p.prices || []).map(r => ({ currency: r.currency, monthly_price: r.monthly_price, annual_price: r.annual_price, is_active: r.is_active }))
        };
      }
    } catch (e) {
      console.error('Restaurant contract/plan summary load error:', e.message);
    }

    const response = {
      ...restaurantData,
      admin: adminData ? {
        id: adminData.id.toString(),
        name: adminData.full_name || adminData.username,
        username: adminData.username,
        email: adminData.email,
        phone: adminData.phone || '',
        role: adminData.role
      } : null,
      managers: oversightManagers.map(m => ({
        id: m.id.toString(),
        name: m.full_name || m.username,
        email: m.email,
        role: m.role,
        company: m.company_name || '',
        phone: m.phone || '',
        isPrimary: m.RestaurantManager?.is_primary || false
      })),
      contract_summary,
      contract_summaries,
      entity_plan_summary
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching restaurant details:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant details' });
  }
});

// Helper function to validate brand_id permission
// Brand General/Manager can only set brand_id to their own brand
const validateBrandPermission = async (brandId, userId, userRole) => {
  if (!brandId) return { valid: true };

  // System Admin can set any brand
  if (userRole === 'System Admin') return { valid: true };

  // Brand General/Manager must own the brand
  if (userRole === 'Brand General' || userRole === 'Brand Manager') {
    const brand = await Brand.findByPk(brandId);
    if (!brand) {
      return { valid: false, error: 'Brand not found' };
    }
    if (brand.owner_id !== userId) {
      return { valid: false, error: 'You can only assign restaurants to your own brand' };
    }
    return { valid: true };
  }

  return { valid: false, error: 'Unauthorized to set brand' };
};

// Helper function to validate foodcourt_id permission
const validateFoodcourtPermission = async (foodcourtId, userId, userRole) => {
  if (!foodcourtId) return { valid: true };
  if (userRole === 'System Admin') return { valid: true };
  if (userRole === 'Foodcourt General' || userRole === 'Foodcourt Manager') {
    const foodcourt = await Foodcourt.findByPk(foodcourtId);
    if (!foodcourt) return { valid: false, error: 'Foodcourt not found' };
    if (foodcourt.owner_id !== userId) return { valid: false, error: 'You can only assign restaurants to your own foodcourt' };
    return { valid: true };
  }
  return { valid: false, error: 'Unauthorized to set foodcourt' };
};

// Create new restaurant (with Restaurant Admin 1:1 coupling)
router.post('/', authenticateToken, requireRole(
  'System Admin',
  'Brand General', 'Brand Manager',
  'Foodcourt General', 'Foodcourt Manager',
  'Restaurant Owner'
), validateRestaurantCreation, async (req, res) => {
  const { sequelize } = require('../config/database');
  const bcrypt = require('bcrypt');
  const transaction = await sequelize.transaction();

  try {
    // Auto-link brand_id/foodcourt_id based on creator's role if not explicitly provided
    if (!req.body.brand_id && (req.user.role === 'Brand General' || req.user.role === 'Brand Manager')) {
      const userBrand = await Brand.findOne({ where: { owner_id: req.user.id } });
      if (userBrand) req.body.brand_id = userBrand.id;
    }
    if (!req.body.foodcourt_id && (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager')) {
      const userFoodcourt = await Foodcourt.findOne({ where: { owner_id: req.user.id } });
      if (userFoodcourt) req.body.foodcourt_id = userFoodcourt.id;
    }

    // Validate brand_id permission if provided
    if (req.body.brand_id) {
      const brandCheck = await validateBrandPermission(req.body.brand_id, req.user.id, req.user.role);
      if (!brandCheck.valid) {
        await transaction.rollback();
        return res.status(403).json({ error: brandCheck.error });
      }
    }

    // Validate branch_id — must belong to the target foodcourt
    if (req.body.branch_id) {
      const FoodcourtBranch = require('../models/FoodcourtBranch');
      const branch = await FoodcourtBranch.findByPk(req.body.branch_id);
      if (!branch) {
        return res.status(400).json({ success: false, message: 'Branch not found' });
      }
      if (req.body.foodcourt_id && Number(branch.foodcourt_id) !== Number(req.body.foodcourt_id)) {
        return res.status(400).json({ success: false, message: 'Branch does not belong to the selected foodcourt' });
      }
      if (branch.status === 'inactive') {
        return res.status(400).json({ success: false, message: 'Cannot assign restaurant to an inactive branch' });
      }
      // Branch-scoped Foodcourt Manager: must match their assigned branch
      if (req.user.role === 'Foodcourt Manager' && req.user.branch_id && Number(req.body.branch_id) !== Number(req.user.branch_id)) {
        await transaction.rollback();
        return res.status(403).json({ success: false, message: 'Cannot assign restaurant to a different branch' });
      }
    }

    // Validate foodcourt_id permission if provided
    if (req.body.foodcourt_id) {
      const foodcourtCheck = await validateFoodcourtPermission(req.body.foodcourt_id, req.user.id, req.user.role);
      if (!foodcourtCheck.valid) {
        await transaction.rollback();
        return res.status(403).json({ error: foodcourtCheck.error });
      }
    }

    // Get plan template if specified
    let planSnapshot = null;
    let planLimits = {
      order_limit: 1000,
      menu_item_limit: 50,
      staff_limit: 5
    };

    const incomingPlanType = req.body.planType || req.body.plan_type;
    if (incomingPlanType) {
      const planName = incomingPlanType.toLowerCase().replace(' plan', '');
      const planTemplate = await PlanTemplate.findOne({ where: { name: planName } });

      if (planTemplate) {
        planSnapshot = {
          plan_id: planTemplate.id,
          name: planTemplate.name,
          display_name: planTemplate.display_name,
          base_price_monthly: planTemplate.base_price_monthly,
          base_price_annual: planTemplate.base_price_annual,
          features: planTemplate.features,
          limits: {
            order_limit: planTemplate.order_limit,
            menu_item_limit: planTemplate.menu_item_limit,
            staff_limit: planTemplate.staff_limit
          },
          captured_at: new Date()
        };
        planLimits = {
          order_limit: planTemplate.order_limit,
          menu_item_limit: planTemplate.menu_item_limit,
          staff_limit: planTemplate.staff_limit
        };
      }
    }

    // === Restaurant Admin (Owner) 처리 ===
    let adminUser = null;
    const adminAction = req.body.adminAction; // 'create' | 'assign' | undefined(하위 호환)

    if (adminAction === 'create') {
      // 새 Restaurant Admin 계정 생성
      const { adminEmail, adminUsername, adminFullName, adminPhone } = req.body;

      if (!adminEmail || !adminUsername || !adminFullName) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Admin email, username, and full name are required' });
      }

      // 이메일/유저네임 중복 체크
      const existingEmail = await User.findOne({ where: { email: adminEmail } });
      if (existingEmail) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Admin email is already in use' });
      }
      const existingUsername = await User.findOne({ where: { username: adminUsername } });
      if (existingUsername) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Admin username is already in use' });
      }

      // 비밀번호 자동 생성 (12자, 대소문자+숫자+특수문자)
      const pwChars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
      let generatedAdminPassword = '';
      generatedAdminPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
      generatedAdminPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
      generatedAdminPassword += '23456789'[Math.floor(Math.random() * 8)];
      generatedAdminPassword += '!@#$%'[Math.floor(Math.random() * 5)];
      for (let i = 0; i < 8; i++) {
        generatedAdminPassword += pwChars.charAt(Math.floor(Math.random() * pwChars.length));
      }
      generatedAdminPassword = generatedAdminPassword.split('').sort(() => Math.random() - 0.5).join('');

      const hashedPassword = await bcrypt.hash(generatedAdminPassword, 10);
      adminUser = await User.create({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: 'Restaurant Admin',
        full_name: adminFullName,
        phone: adminPhone || null,
        email_verified: true
      }, { transaction });
      adminUser._generatedPassword = generatedAdminPassword;

    } else if (adminAction === 'assign') {
      // 기존 유저를 Restaurant Admin으로 배정
      const { adminUserId } = req.body;
      if (!adminUserId) {
        await transaction.rollback();
        return res.status(400).json({ error: 'adminUserId is required when assigning existing user' });
      }

      adminUser = await User.findByPk(adminUserId);
      if (!adminUser) {
        await transaction.rollback();
        return res.status(404).json({ error: 'Admin user not found' });
      }
      if (adminUser.restaurant_id) {
        await transaction.rollback();
        return res.status(400).json({ error: `This user is already assigned to another restaurant (ID: ${adminUser.restaurant_id})` });
      }
    }
    // else: 하위 호환 - adminAction 없으면 기존 managerId 방식 사용

    // Map frontend fields to database fields
    const restaurantData = {
      name: req.body.name,
      branch_name: req.body.branch_name || null,
      admin_id: adminUser ? adminUser.id : (req.body.managerId || null),
      admin_name: adminUser ? (adminUser.full_name || adminUser.username) : null,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city || null,
      state: req.body.state || null,
      postal_code: req.body.postal_code || null,
      country: req.body.country || 'MY',
      business_registration: req.body.business_registration || null,
      tax_id: req.body.tax_id || null,
      plan_type: incomingPlanType || 'Basic Plan',
      plan_amount: parseFloat(req.body.planAmount || req.body.plan_amount) || (planSnapshot ? planSnapshot.base_price_monthly : 29.00),
      currency: req.body.currency || 'MYR',
      billing_cycle: req.body.billingCycle || req.body.billing_cycle || 'monthly',
      status: (() => {
        const requestedStatus = req.body.status;
        const validStatuses = ['active', 'inactive', 'trial', 'overdue', 'suspended', 'expired', 'cancelled'];
        if (!validStatuses.includes(requestedStatus)) return 'active';
        // Trial status is System Admin only
        if (requestedStatus === 'trial' && req.user.role !== 'System Admin') return 'active';
        return requestedStatus;
      })(),
      subscription_start: req.body.subscriptionStart ? new Date(req.body.subscriptionStart) : new Date(),
      subscription_end: req.body.subscriptionEnd ? new Date(req.body.subscriptionEnd) : null,
      subscription_snapshot: planSnapshot,
      brand_id: req.body.brand_id || null,
      foodcourt_id: req.body.foodcourt_id || null,
      branch_id: req.body.branch_id || null,
      payment_model: req.body.payment_model || 'restaurant',
      ...planLimits
    };

    // 하위 호환: adminAction 없이 managerId만 전송된 경우 admin_name 조회
    if (!adminUser && restaurantData.admin_id) {
      const adminLookup = await User.findByPk(restaurantData.admin_id);
      if (adminLookup) {
        restaurantData.admin_name = adminLookup.full_name || adminLookup.username;
      }
    }

    const restaurant = await Restaurant.create(restaurantData, { transaction });

    // Auto-geocode in background (non-blocking) if lat/lng not explicitly provided
    if (!restaurantData.latitude && !restaurantData.longitude && restaurantData.address) {
      const { geocodeAddress } = require('../utils/geocoding');
      geocodeAddress(restaurantData).then(async (coords) => {
        if (coords) {
          try { await restaurant.update({ latitude: coords.latitude, longitude: coords.longitude }); }
          catch (e) { console.warn('[geocoding] update failed:', e.message); }
        }
      }).catch(e => console.warn('[geocoding] bg fail:', e.message));
    }

    // Admin User의 restaurant_id를 생성된 레스토랑으로 설정
    if (adminUser) {
      await adminUser.update({
        restaurant_id: restaurant.id,
        role: 'Restaurant Admin'
      }, { transaction });
    }

    // Brand/Foodcourt 감독 매니저 처리 (RestaurantManager N:M 유지)
    if (req.body.managerIds && Array.isArray(req.body.managerIds) && req.body.managerIds.length > 0) {
      const RestaurantManager = require('../models/RestaurantManager');

      const managerAssociations = req.body.managerIds.map((managerId, index) => ({
        restaurant_id: restaurant.id,
        manager_id: managerId,
        is_primary: index === 0
      }));

      await RestaurantManager.bulkCreate(managerAssociations, { transaction });
    }

    await transaction.commit();

    // Auto-start trial period if status is 'trial'
    if (restaurant.status === 'trial') {
      try {
        const subscriptionScheduler = require('../services/subscriptionScheduler');
        await subscriptionScheduler.startTrial(restaurant.id);
        console.log(`✓ Trial auto-started for restaurant: ${restaurant.name}`);
      } catch (trialError) {
        console.error('[Trial] Auto-start failed:', trialError.message);
      }
    }

    // Send Welcome Email (non-blocking, uses creator's SMTP)
    if (adminUser && (adminAction === 'create' || adminAction === 'assign')) {
      try {
        const { sendIssuerEmail } = require('../utils/emailService');
        const { welcomeEmail } = require('../utils/emailTemplates');

        // Determine issuer based on who created the restaurant
        let issuerType = 'system_admin';
        let issuerId = null;
        let issuerInfo = null;

        if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
          issuerType = 'brand';
          issuerId = req.user.brand_id || restaurant.brand_id;
          if (issuerId) {
            const Brand = require('../models/Brand');
            const brand = await Brand.findByPk(issuerId);
            if (brand) {
              issuerInfo = { name: brand.name, logoUrl: brand.logo_url, companyName: brand.company_name, color: '#635BFF' };
            }
          }
        } else if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
          issuerType = 'foodcourt';
          issuerId = req.user.foodcourt_id || restaurant.foodcourt_id;
          if (issuerId) {
            const Foodcourt = require('../models/Foodcourt');
            const foodcourt = await Foodcourt.findByPk(issuerId);
            if (foodcourt) {
              issuerInfo = { name: foodcourt.name, logoUrl: foodcourt.logo_url, companyName: foodcourt.company_name, color: '#059669' };
            }
          }
        }

        const siteUrl = process.env.SITE_URL || 'https://purplehere.com';
        const emailData = {
          adminName: adminUser.full_name || adminUser.username,
          restaurantName: restaurant.name,
          email: adminUser.email,
          username: adminUser.username,
          temporaryPassword: adminAction === 'create' ? adminUser._generatedPassword : null,
          planType: restaurant.plan_type || 'Basic Plan',
          dashboardUrl: siteUrl + '/pos/login',
          issuerInfo
        };

        const { subject, html, text } = welcomeEmail(emailData);
        sendIssuerEmail(issuerType, issuerId, { to: adminUser.email, subject, html, text })
          .then(result => console.log(`[Email] Welcome email sent to ${adminUser.email} via ${issuerType} SMTP (${result.messageId})`))
          .catch(err => console.error('[Email] Welcome email failed:', err.message));
      } catch (emailError) {
        console.error('[Email] Welcome email setup failed:', emailError.message);
      }
    }

    // Auto-generate first POS subscription invoice for restaurants with subscription info (non-blocking).
    // Creates invoice for both 'active' and 'trial' statuses — trial users see their upcoming invoice.
    //
    // `activate_subscription` flag (default true for backward compat):
    //   false → skip invoice generation. Use case: hardware-only customer,
    //           admin wants to create restaurant record without forcing subscription billing.
    //           Subscription can be activated later via PUT (which triggers sync).
    const activateSubscription = req.body.activate_subscription !== false;
    if (activateSubscription && restaurant.subscription_start && restaurant.plan_type) {
      try {
        const { createInitialInvoice } = require('../services/subscriptionInvoiceService');
        const result = await createInitialInvoice({
          kind: 'restaurant',
          id: restaurant.id,
          plan_type: restaurant.plan_type,
          plan_amount: restaurant.plan_amount,
          billing_cycle: restaurant.billing_cycle || 'monthly',
          currency: restaurant.currency || 'MYR',
          subscription_start: restaurant.subscription_start,
          restaurant: {
            id: restaurant.id,
            payment_model: restaurant.payment_model,
            brand_id: restaurant.brand_id,
            foodcourt_id: restaurant.foodcourt_id
          }
        });
        if (result && result.invoice) {
          console.log(`[Auto-Invoice] Created ${result.invoiceNumber} for new restaurant "${restaurant.name}"`);
        }
      } catch (invoiceError) {
        console.error('[Auto-Invoice] Failed to generate initial invoice:', invoiceError.message);
      }
    }

    const responseData = { success: true, restaurant };
    if (adminUser) {
      responseData.adminUser = {
        id: adminUser.id,
        email: adminUser.email,
        username: adminUser.username,
        fullName: adminUser.full_name
      };
      if (adminUser._generatedPassword) {
        responseData.generatedPassword = adminUser._generatedPassword;
      }
    }

    res.status(201).json(responseData);
  } catch (error) {
    await transaction.rollback();
    console.error('[Restaurants] Error creating restaurant:', error.message);
    res.status(500).json({ error: 'Failed to create restaurant', details: error.message });
  }
});

// Phase A (Restaurant-Contract-Plan linking): cancel any scheduled POS plan change.
// Clears pending_* + plan_change_date/type. Writes ActivityLog audit trail.
router.post('/:id/cancel-pending-change', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const ActivityLog = require('../models/ActivityLog');
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    const hasPending = restaurant.pending_plan_type || restaurant.pending_plan_amount || restaurant.pending_billing_cycle || restaurant.plan_change_date;
    if (!hasPending) {
      return res.status(400).json({ success: false, message: 'No pending plan change to cancel' });
    }

    const before = {
      pending_plan_type: restaurant.pending_plan_type,
      pending_plan_amount: restaurant.pending_plan_amount != null ? Number(restaurant.pending_plan_amount) : null,
      pending_billing_cycle: restaurant.pending_billing_cycle,
      plan_change_date: restaurant.plan_change_date,
      plan_change_type: restaurant.plan_change_type
    };

    await restaurant.update({
      pending_plan_type: null,
      pending_plan_amount: null,
      pending_billing_cycle: null,
      plan_change_date: null,
      plan_change_type: null
    });

    await ActivityLog.create({
      restaurant_id: restaurant.id,
      user_id: req.user.id,
      username: req.user.username || req.user.email || 'unknown',
      full_name: req.user.full_name || req.user.username || req.user.email || null,
      action_type: 'update',
      entity_type: 'subscription',
      entity_id: String(restaurant.id),
      entity_name: restaurant.plan_type,
      changes: { before, after: null, action: 'cancel_pending' },
      description: 'Cancelled scheduled plan change'
    });

    res.json({ success: true, message: 'Pending plan change cancelled' });
  } catch (error) {
    console.error('Cancel pending plan change error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update restaurant (no creation validation — fields are all optional on update)
router.put('/:id', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    // Sanitize string inputs to prevent XSS
    const { sanitizeString } = require('../middleware/validation');
    const stringFields = ['name', 'address', 'phone', 'email', 'cuisine', 'description', 'slug'];
    stringFields.forEach(field => {
      if (typeof req.body[field] === 'string') {
        req.body[field] = sanitizeString(req.body[field]);
      }
    });

    // Validate brand_id permission if being changed
    if (req.body.brand_id !== undefined && req.body.brand_id) {
      const brandCheck = await validateBrandPermission(req.body.brand_id, req.user.id, req.user.role);
      if (!brandCheck.valid) {
        return res.status(403).json({ error: brandCheck.error });
      }

      // Also verify user is a manager of this restaurant (for Brand General/Manager)
      if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
        const RestaurantManager = require('../models/RestaurantManager');
        const isManager = await RestaurantManager.findOne({
          where: {
            restaurant_id: req.params.id,
            manager_id: req.user.id
          }
        });
        if (!isManager) {
          return res.status(403).json({ error: 'You can only set brand for restaurants you manage' });
        }
      }
    }

    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Branch-scoped Foodcourt Manager: block edits outside their branch + block moving to another branch
    if (req.user.role === 'Foodcourt Manager' && req.user.branch_id) {
      if (restaurant.branch_id !== req.user.branch_id) {
        return res.status(403).json({ error: 'No access to this restaurant' });
      }
      if (req.body.branch_id !== undefined && req.body.branch_id !== null && Number(req.body.branch_id) !== Number(req.user.branch_id)) {
        return res.status(403).json({ error: 'Cannot move restaurant to another branch' });
      }
    }

    // Map frontend fields to database fields - only include fields that are explicitly provided
    const updateData = {};

    // Basic info fields
    if (req.body.name !== undefined) updateData.name = req.body.name;
    if (req.body.managerId !== undefined) updateData.admin_id = req.body.managerId ? parseInt(req.body.managerId) : null;
    if (req.body.email !== undefined) updateData.email = req.body.email;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.location !== undefined || req.body.address !== undefined) {
      updateData.address = req.body.location || req.body.address;
    }
    if (req.body.city !== undefined) updateData.city = req.body.city;
    if (req.body.state !== undefined) updateData.state = req.body.state;
    if (req.body.postal_code !== undefined) updateData.postal_code = req.body.postal_code;
    if (req.body.country !== undefined) updateData.country = req.body.country;
    if (req.body.business_registration !== undefined) updateData.business_registration = req.body.business_registration;
    if (req.body.branch_name !== undefined) updateData.branch_name = req.body.branch_name;
    if (req.body.trade_name !== undefined) updateData.trade_name = req.body.trade_name;
    if (req.body.tax_id !== undefined) updateData.tax_id = req.body.tax_id;
    if (req.body.website !== undefined) updateData.website = req.body.website;
    if (req.body.bank_name !== undefined) updateData.bank_name = req.body.bank_name;
    if (req.body.bank_account !== undefined) updateData.bank_account = req.body.bank_account;
    if (req.body.bank_account_name !== undefined) updateData.bank_account_name = req.body.bank_account_name;
    if (req.body.logo_url !== undefined) {
      // 로고 변경 시 이전 파일 삭제
      if (req.body.logo_url && restaurant.logo_url && req.body.logo_url !== restaurant.logo_url) {
        await deleteOldImages(restaurant.logo_url);
      }
      updateData.logo_url = req.body.logo_url;
    }

    // Subscription fields - only update if explicitly provided (prevents accidental overwrites)
    // Accept both camelCase and snake_case for plan_type and plan_amount
    if (req.body.planType !== undefined || req.body.plan_type !== undefined) {
      updateData.plan_type = req.body.planType || req.body.plan_type;
    }
    if (req.body.planAmount !== undefined || req.body.plan_amount !== undefined) {
      updateData.plan_amount = parseFloat(req.body.planAmount || req.body.plan_amount);
    }
    if (req.body.status !== undefined) {
      updateData.status = req.body.status;
      // When restoring from suspended/overdue to active, clear grace period
      if (['active', 'trial'].includes(req.body.status) && ['suspended', 'overdue'].includes(restaurant.status)) {
        updateData.grace_period_start = null;
      }
    }
    if (req.body.subscriptionStart !== undefined) {
      updateData.subscription_start = req.body.subscriptionStart ? new Date(req.body.subscriptionStart) : null;
    }
    if (req.body.subscriptionEnd !== undefined) {
      updateData.subscription_end = req.body.subscriptionEnd ? new Date(req.body.subscriptionEnd) : null;
    }
    if (req.body.billingCycle !== undefined || req.body.billing_cycle !== undefined) {
      updateData.billing_cycle = req.body.billingCycle || req.body.billing_cycle;
    }
    if (req.body.currency !== undefined) {
      updateData.currency = req.body.currency;
    }
    if (req.body.autoRenew !== undefined || req.body.auto_renew !== undefined) {
      updateData.auto_renew = req.body.autoRenew !== undefined ? req.body.autoRenew : req.body.auto_renew;
    }

    // Phase A (Restaurant-Contract-Plan linking): Brand General / Foodcourt General cannot
    // change POS plan fields immediately — the change is deferred to the next billing cycle
    // via pending_* fields. The existing invoiceScheduler.applyPendingPlanChanges() daily job
    // applies them + writes ActivityLog. System Admin retains direct edit.
    const ActivityLog = require('../models/ActivityLog');
    const isPlatformAdmin = req.user.role === 'System Admin';

    const planTypeChanged = updateData.plan_type !== undefined && String(updateData.plan_type) !== String(restaurant.plan_type || '');
    const planAmountChanged = updateData.plan_amount !== undefined && Number(updateData.plan_amount) !== Number(restaurant.plan_amount || 0);
    const billingCycleChanged = updateData.billing_cycle !== undefined && String(updateData.billing_cycle) !== String(restaurant.billing_cycle || '');
    const divertToPending = !isPlatformAdmin && (planTypeChanged || planAmountChanged || billingCycleChanged);

    let pendingLogEntry = null;
    if (divertToPending && restaurant.subscription_start) {
      const substart = new Date(restaurant.subscription_start);
      const now = new Date();
      const effDay = Math.min(28, substart.getDate());
      let nextBillingDate = new Date(now.getFullYear(), now.getMonth(), effDay);
      if (nextBillingDate <= now) {
        nextBillingDate = new Date(now.getFullYear(), now.getMonth() + 1, effDay);
      }

      const before = {
        plan_type: restaurant.plan_type,
        plan_amount: Number(restaurant.plan_amount || 0),
        billing_cycle: restaurant.billing_cycle
      };
      const after = { ...before };

      if (planTypeChanged) {
        updateData.pending_plan_type = updateData.plan_type;
        after.plan_type = updateData.plan_type;
        delete updateData.plan_type;
      }
      if (planAmountChanged) {
        updateData.pending_plan_amount = updateData.plan_amount;
        after.plan_amount = Number(updateData.plan_amount);
        delete updateData.plan_amount;
      }
      if (billingCycleChanged) {
        updateData.pending_billing_cycle = updateData.billing_cycle;
        after.billing_cycle = updateData.billing_cycle;
        delete updateData.billing_cycle;
      }
      updateData.plan_change_date = nextBillingDate;
      updateData.plan_change_type = billingCycleChanged ? 'cycle_change' : 'downgrade';

      const bits = [];
      if (planTypeChanged) bits.push(`plan ${before.plan_type} → ${after.plan_type}`);
      if (planAmountChanged) bits.push(`amount ${before.plan_amount} → ${after.plan_amount}`);
      if (billingCycleChanged) bits.push(`cycle ${before.billing_cycle} → ${after.billing_cycle}`);
      pendingLogEntry = {
        restaurant_id: restaurant.id,
        user_id: req.user.id,
        username: req.user.username || req.user.email || 'unknown',
        full_name: req.user.full_name || req.user.username || req.user.email || null,
        action_type: 'update',
        entity_type: 'subscription',
        entity_id: String(restaurant.id),
        entity_name: after.plan_type || restaurant.plan_type,
        changes: { before, after, effective_at: nextBillingDate.toISOString().slice(0, 10) },
        description: `Scheduled plan change (effective ${nextBillingDate.toISOString().slice(0, 10)}): ${bits.join(', ')}`
      };
    }

    // Auto-calculate subscription_end if start + billing_cycle changed.
    // Rule: Monthly = start + 1 month - 1 day. Annual = start + 1 year - 1 day.
    const effectiveStart = updateData.subscription_start || restaurant.subscription_start;
    const effectiveCycle = updateData.billing_cycle || restaurant.billing_cycle;
    if (effectiveStart && effectiveCycle && (updateData.subscription_start !== undefined || updateData.billing_cycle !== undefined)) {
      const startDate = new Date(effectiveStart);
      if (effectiveCycle === 'annual') {
        startDate.setFullYear(startDate.getFullYear() + 1);
      } else {
        startDate.setMonth(startDate.getMonth() + 1);
      }
      startDate.setDate(startDate.getDate() - 1);
      updateData.subscription_end = startDate;

      // Re-derive status from start vs today
      const todayMid = new Date();
      todayMid.setHours(0, 0, 0, 0);
      const startMid = new Date(effectiveStart);
      startMid.setHours(0, 0, 0, 0);
      if (startMid > todayMid) {
        if (updateData.status === undefined) updateData.status = 'trial';
        const tEnd = new Date(startMid);
        tEnd.setDate(tEnd.getDate() - 1);
        updateData.trial_end_date = tEnd;
      } else {
        if (updateData.status === undefined) updateData.status = 'active';
        updateData.trial_end_date = null;
      }
    }

    // Detect subscription changes for invoice sync (after update)
    const subscriptionFieldsChanged =
      updateData.plan_type !== undefined ||
      updateData.plan_amount !== undefined ||
      updateData.billing_cycle !== undefined ||
      updateData.subscription_start !== undefined ||
      updateData.currency !== undefined;

    // Limit fields
    if (req.body.menuItemLimit !== undefined || req.body.menu_item_limit !== undefined) {
      updateData.menu_item_limit = req.body.menuItemLimit || req.body.menu_item_limit;
    }
    if (req.body.orderLimit !== undefined || req.body.order_limit !== undefined) {
      updateData.order_limit = req.body.orderLimit || req.body.order_limit;
    }
    if (req.body.staffLimit !== undefined || req.body.staff_limit !== undefined) {
      updateData.staff_limit = req.body.staffLimit || req.body.staff_limit;
    }

    // Settings objects
    if (req.body.payment_settings !== undefined) updateData.payment_settings = req.body.payment_settings;
    if (req.body.operation_settings !== undefined) updateData.operation_settings = req.body.operation_settings;
    if (req.body.table_settings !== undefined) updateData.table_settings = req.body.table_settings;
    if (req.body.floor_plan !== undefined) updateData.floor_plan = req.body.floor_plan;
    if (req.body.printer_settings !== undefined) updateData.printer_settings = req.body.printer_settings;

    // Brand association
    if (req.body.brand_id !== undefined) {
      updateData.brand_id = req.body.brand_id ? parseInt(req.body.brand_id) : null;
    }

    // Foodcourt association
    if (req.body.foodcourt_id !== undefined) {
      updateData.foodcourt_id = req.body.foodcourt_id ? parseInt(req.body.foodcourt_id) : null;
    }

    // Branch association (within a foodcourt)
    if (req.body.branch_id !== undefined) {
      if (req.body.branch_id) {
        const FoodcourtBranch = require('../models/FoodcourtBranch');
        const branch = await FoodcourtBranch.findByPk(req.body.branch_id);
        if (!branch) {
          return res.status(400).json({ success: false, message: 'Branch not found' });
        }
        const targetFcId = updateData.foodcourt_id !== undefined ? updateData.foodcourt_id : restaurant.foodcourt_id;
        if (targetFcId && Number(branch.foodcourt_id) !== Number(targetFcId)) {
          return res.status(400).json({ success: false, message: 'Branch does not belong to the restaurant\'s foodcourt' });
        }
        if (branch.status === 'inactive') {
          return res.status(400).json({ success: false, message: 'Cannot assign restaurant to an inactive branch' });
        }
        updateData.branch_id = parseInt(req.body.branch_id);
      } else {
        updateData.branch_id = null;
      }
    }

    // Payment model (who pays invoices)
    if (req.body.payment_model !== undefined) {
      updateData.payment_model = req.body.payment_model;
    }

    // Discount fields
    if (req.body.discount_type !== undefined) {
      updateData.discount_type = req.body.discount_type;
    }
    if (req.body.discount_value !== undefined) {
      updateData.discount_value = parseFloat(req.body.discount_value) || 0;
    }
    if (req.body.discount_reason !== undefined) {
      updateData.discount_reason = req.body.discount_reason || null;
    }

    // Cuisine field
    if (req.body.cuisine !== undefined) updateData.cuisine = req.body.cuisine;

    // Kitchen station assignment mode
    if (req.body.kitchen_assignment_mode !== undefined) updateData.kitchen_assignment_mode = req.body.kitchen_assignment_mode;
    if (req.body.kitchen_item_merge !== undefined) {
      const merge = req.body.kitchen_item_merge;
      updateData.kitchen_item_merge = {
        time_limit: Math.max(0, parseInt(merge.time_limit) || 0),
        max_count: Math.max(0, parseInt(merge.max_count) || 0)
      };
    }

    // === Restaurant Admin (Owner) 변경 처리 ===
    const adminAction = req.body.adminAction; // 'create' | 'change' | undefined

    if (adminAction === 'create' || adminAction === 'change') {
      const bcrypt = require('bcrypt');
      const { sequelize } = require('../config/database');
      const adminTransaction = await sequelize.transaction();

      try {
        let newAdminUser = null;

        if (adminAction === 'create') {
          const { adminEmail, adminUsername, adminFullName, adminPhone } = req.body;
          if (!adminEmail || !adminUsername || !adminFullName) {
            await adminTransaction.rollback();
            return res.status(400).json({ error: 'Admin email, username, and full name are required' });
          }
          const existingEmail = await User.findOne({ where: { email: adminEmail } });
          if (existingEmail) {
            await adminTransaction.rollback();
            return res.status(400).json({ error: 'Admin email is already in use' });
          }
          const existingUsername = await User.findOne({ where: { username: adminUsername } });
          if (existingUsername) {
            await adminTransaction.rollback();
            return res.status(400).json({ error: 'Admin username is already in use' });
          }
          // 비밀번호 자동 생성
          const pwChars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
          let generatedAdminPassword = '';
          generatedAdminPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
          generatedAdminPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
          generatedAdminPassword += '23456789'[Math.floor(Math.random() * 8)];
          generatedAdminPassword += '!@#$%'[Math.floor(Math.random() * 5)];
          for (let i = 0; i < 8; i++) {
            generatedAdminPassword += pwChars.charAt(Math.floor(Math.random() * pwChars.length));
          }
          generatedAdminPassword = generatedAdminPassword.split('').sort(() => Math.random() - 0.5).join('');

          const hashedPassword = await bcrypt.hash(generatedAdminPassword, 10);
          newAdminUser = await User.create({
            username: adminUsername,
            email: adminEmail,
            password: hashedPassword,
            role: 'Restaurant Admin',
            full_name: adminFullName,
            phone: adminPhone || null,
            restaurant_id: restaurant.id,
            email_verified: true
          }, { transaction: adminTransaction });
          newAdminUser._generatedPassword = generatedAdminPassword;
        } else if (adminAction === 'change') {
          const { adminUserId } = req.body;
          if (!adminUserId) {
            await adminTransaction.rollback();
            return res.status(400).json({ error: 'adminUserId is required' });
          }
          newAdminUser = await User.findByPk(adminUserId);
          if (!newAdminUser) {
            await adminTransaction.rollback();
            return res.status(404).json({ error: 'Admin user not found' });
          }
          if (newAdminUser.restaurant_id && newAdminUser.restaurant_id !== restaurant.id) {
            await adminTransaction.rollback();
            return res.status(400).json({ error: `This user is already assigned to another restaurant (ID: ${newAdminUser.restaurant_id})` });
          }
          await newAdminUser.update({
            restaurant_id: restaurant.id,
            role: 'Restaurant Admin'
          }, { transaction: adminTransaction });
        }

        // 기존 admin 해제
        if (restaurant.admin_id && (!newAdminUser || restaurant.admin_id !== newAdminUser.id)) {
          const oldAdmin = await User.findByPk(restaurant.admin_id);
          if (oldAdmin && oldAdmin.role === 'Restaurant Admin') {
            await oldAdmin.update({ restaurant_id: null }, { transaction: adminTransaction });
          }
        }

        // Restaurant의 admin_id 갱신
        if (newAdminUser) {
          updateData.admin_id = newAdminUser.id;
          updateData.admin_name = newAdminUser.full_name || newAdminUser.username;
        }

        await restaurant.update(updateData, { transaction: adminTransaction });

        // Handle oversight managers
        if (req.body.managerIds && Array.isArray(req.body.managerIds)) {
          const RestaurantManager = require('../models/RestaurantManager');
          await RestaurantManager.destroy({ where: { restaurant_id: restaurant.id }, transaction: adminTransaction });
          if (req.body.managerIds.length > 0) {
            const managerAssociations = req.body.managerIds.map((managerId, index) => ({
              restaurant_id: restaurant.id,
              manager_id: managerId,
              is_primary: index === 0
            }));
            await RestaurantManager.bulkCreate(managerAssociations, { transaction: adminTransaction });
          }
        }

        await adminTransaction.commit();
        return res.json({ success: true, restaurant });
      } catch (adminError) {
        await adminTransaction.rollback();
        throw adminError;
      }
    }

    // 기존 방식 (adminAction 없음) - 하위 호환
    if (updateData.admin_id) {
      const adminLookup = await User.findByPk(updateData.admin_id);
      if (adminLookup) {
        updateData.admin_name = adminLookup.full_name || adminLookup.username;
      }
    } else if (req.body.managerId !== undefined) {
      updateData.admin_name = null;
    }

    // Capture pre-update values for address-change detection
    const prevAddr = {
      address: restaurant.address, city: restaurant.city, state: restaurant.state,
      postal_code: restaurant.postal_code, country: restaurant.country
    };

    await restaurant.update(updateData);

    // Phase A: write ActivityLog for pending plan change schedule (non-admin path)
    if (pendingLogEntry) {
      try {
        await ActivityLog.create(pendingLogEntry);
      } catch (e) {
        console.error('Failed to write pending plan ActivityLog:', e.message);
      }
    }

    // Auto-geocode in background when address changed and coords not manually set
    const { addressChanged, geocodeAddress } = require('../utils/geocoding');
    const latLngManuallyProvided = updateData.latitude !== undefined || updateData.longitude !== undefined;
    if (!latLngManuallyProvided && addressChanged(prevAddr, updateData)) {
      geocodeAddress({
        address: restaurant.address, city: restaurant.city, state: restaurant.state,
        postal_code: restaurant.postal_code, country: restaurant.country
      }).then(async (coords) => {
        if (coords) {
          try { await restaurant.update({ latitude: coords.latitude, longitude: coords.longitude }); }
          catch (e) { console.warn('[geocoding] update failed:', e.message); }
        }
      }).catch(e => console.warn('[geocoding] bg fail:', e.message));
    }

    // Handle multiple managers if managerIds array is provided
    if (req.body.managerIds && Array.isArray(req.body.managerIds)) {
      const RestaurantManager = require('../models/RestaurantManager');

      await RestaurantManager.destroy({
        where: { restaurant_id: restaurant.id }
      });

      if (req.body.managerIds.length > 0) {
        const managerAssociations = req.body.managerIds.map((managerId, index) => ({
          restaurant_id: restaurant.id,
          manager_id: managerId,
          is_primary: index === 0
        }));

        await RestaurantManager.bulkCreate(managerAssociations);
      }
    }

    // Sync pending invoice if subscription fields changed
    if (subscriptionFieldsChanged && restaurant.subscription_start && restaurant.plan_type) {
      try {
        const { syncPendingInvoice, createInitialInvoice } = require('../services/subscriptionInvoiceService');
        const subject = {
          kind: 'restaurant',
          id: restaurant.id,
          plan_type: restaurant.plan_type,
          plan_amount: restaurant.plan_amount,
          billing_cycle: restaurant.billing_cycle,
          currency: restaurant.currency,
          subscription_start: restaurant.subscription_start,
          restaurant: {
            id: restaurant.id,
            payment_model: restaurant.payment_model,
            brand_id: restaurant.brand_id,
            foodcourt_id: restaurant.foodcourt_id
          }
        };
        const syncResult = await syncPendingInvoice(subject);
        if (syncResult.updated) {
          console.log(`[Auto-Invoice Sync] Updated ${syncResult.invoiceNumber} after subscription change for restaurant ${restaurant.id}`);
        } else if (syncResult.reason === 'no_pending') {
          // No pending invoice — create new (happens when editing a restaurant that had no subscription before)
          const createResult = await createInitialInvoice(subject);
          if (createResult && createResult.invoice) {
            console.log(`[Auto-Invoice] Created ${createResult.invoiceNumber} on subscription edit for restaurant ${restaurant.id}`);
          }
        }
      } catch (invoiceError) {
        console.error('[Auto-Invoice Sync] Error syncing invoice for restaurant:', invoiceError.message);
      }
    }

    res.json({ success: true, restaurant });
  } catch (error) {
    console.error('[Restaurants] Error updating restaurant:', error.message);
    res.status(500).json({ error: 'Failed to update restaurant', details: error.message });
  }
});

// Delete restaurant (with cascade cleanup)
router.delete('/:id', authenticateToken, requireRole('System Admin'), async (req, res) => {
  const { sequelize } = require('../config/database');
  const RestaurantManager = require('../models/RestaurantManager');
  const RestaurantCustomer = require('../models/RestaurantCustomer');
  const OptionGroup = require('../models/OptionGroup');
  const OperationTicket = require('../models/OperationTicket');
  const MembershipSettings = require('../models/MembershipSettings');
  const PointTransaction = require('../models/PointTransaction');
  const EntityPlanRestaurant = require('../models/EntityPlanRestaurant');
  const RestaurantIngredientCost = require('../models/RestaurantIngredientCost');
  const NoticeRecipient = require('../models/NoticeRecipient');
  const RecipeCategory = require('../models/RecipeCategory');
  const IngredientCategory = require('../models/IngredientCategory');
  const Supplier = require('../models/Supplier');
  const SupplierCategory = require('../models/SupplierCategory');
  const InventoryTransaction = require('../models/InventoryTransaction');
  const StockTake = require('../models/StockTake');
  const StockAlert = require('../models/StockAlert');
  const InventoryBatch = require('../models/InventoryBatch');
  const GeneralStock = require('../models/GeneralStock');
  const GeneralStockCategory = require('../models/GeneralStockCategory');
  const Coupon = require('../models/Coupon');

  const t = await sequelize.transaction();

  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      await t.rollback();
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const rid = restaurant.id;

    // 1. Remove junction table records
    await RestaurantManager.destroy({ where: { restaurant_id: rid }, transaction: t });
    await RestaurantCustomer.destroy({ where: { restaurant_id: rid }, transaction: t });
    await EntityPlanRestaurant.destroy({ where: { restaurant_id: rid }, transaction: t });
    await NoticeRecipient.destroy({ where: { restaurant_id: rid }, transaction: t });

    // 2. Remove related business data
    await PointTransaction.destroy({ where: { restaurant_id: rid }, transaction: t });
    await MembershipSettings.destroy({ where: { restaurant_id: rid }, transaction: t });
    await RestaurantIngredientCost.destroy({ where: { restaurant_id: rid }, transaction: t });
    await Coupon.destroy({ where: { restaurant_id: rid }, transaction: t });

    // 3. Remove inventory-related data
    await StockAlert.destroy({ where: { restaurant_id: rid }, transaction: t });
    await InventoryBatch.destroy({ where: { restaurant_id: rid }, transaction: t });
    await InventoryTransaction.destroy({ where: { restaurant_id: rid }, transaction: t });
    await StockTake.destroy({ where: { restaurant_id: rid }, transaction: t });
    await Supplier.destroy({ where: { restaurant_id: rid }, transaction: t });
    await SupplierCategory.destroy({ where: { restaurant_id: rid }, transaction: t });
    await GeneralStock.destroy({ where: { restaurant_id: rid }, transaction: t });
    await GeneralStockCategory.destroy({ where: { restaurant_id: rid }, transaction: t });

    // 4. Remove recipe/ingredient categories
    await RecipeCategory.destroy({ where: { restaurant_id: rid }, transaction: t });
    await IngredientCategory.destroy({ where: { restaurant_id: rid }, transaction: t });

    // 5. Remove menu data (options → option groups → products → categories)
    const KitchenStation = require('../models/KitchenStation');
    const ActivityLog = require('../models/ActivityLog');
    const ImportHistory = require('../models/ImportHistory');
    await KitchenStation.destroy({ where: { restaurant_id: rid }, transaction: t });
    await OptionGroup.destroy({ where: { restaurant_id: rid }, transaction: t });
    await Product.destroy({ where: { restaurant_id: rid }, transaction: t });
    await Category.destroy({ where: { restaurant_id: rid }, transaction: t });

    // 6. Remove orders and invoices (child tables first)
    const InvoiceItem = require('../models/InvoiceItem');
    const invoiceIds = (await Invoice.findAll({ where: { restaurant_id: rid }, attributes: ['id'], transaction: t })).map(i => i.id);
    if (invoiceIds.length > 0) {
      await InvoiceItem.destroy({ where: { invoice_id: invoiceIds }, transaction: t });
    }
    await Invoice.destroy({ where: { restaurant_id: rid }, transaction: t });
    await Order.destroy({ where: { restaurant_id: rid }, transaction: t });

    // 6b. Remove subscriptions
    await sequelize.query('DELETE FROM subscriptions WHERE restaurant_id = ?', { replacements: [rid], transaction: t });

    // 7. Remove activity logs and import history
    await ActivityLog.destroy({ where: { restaurant_id: rid }, transaction: t });
    await ImportHistory.destroy({ where: { restaurant_id: rid }, transaction: t });

    // 8. Unlink operation tickets (set NULL instead of delete)
    await OperationTicket.update({ restaurantId: null }, { where: { restaurantId: rid }, transaction: t });

    // 9. Unlink admin user
    await User.update({ restaurant_id: null }, { where: { restaurant_id: rid }, transaction: t });

    // 9. Delete the restaurant
    await restaurant.destroy({ transaction: t });

    await t.commit();
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    await t.rollback();
    console.error('[Restaurants] Error deleting restaurant:', error.message);
    res.status(500).json({ error: 'Failed to delete restaurant', details: error.message });
  }
});

// Update restaurant status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    await restaurant.update({ status });
    res.json({ success: true, restaurant });
  } catch (error) {
    console.error('Error updating restaurant status:', error);
    res.status(500).json({ error: 'Failed to update restaurant status' });
  }
});

// Get subscription data for manager

router.get('/available/:managerId', authenticateToken, async (req, res) => {
  try {
    const { managerId } = req.params;
    
    // Get all restaurants that are either unassigned or inactive
    const availableRestaurants = await Restaurant.findAll({
      where: {
        [Op.or]: [
          { admin_id: null },
          { status: 'inactive' }
        ]
      },
      attributes: ['id', 'name', 'address', 'status']
    });
    
    res.json(availableRestaurants.map(restaurant => ({
      id: restaurant.id.toString(),
      name: restaurant.name,
      location: restaurant.address || 'No address provided'
    })));
  } catch (error) {
    console.error('Error fetching available restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch available restaurants' });
  }
});

// Get categories for a specific restaurant
router.get('/:id/categories', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Verify restaurant exists
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        error: 'Restaurant not found'
      });
    }

    // Get categories from categories table filtered by restaurant
    const categories = await Category.findAll({
      where: {
        isActive: true,
        restaurant_id: id
      },
      order: [['displayOrder', 'ASC'], ['name', 'ASC']]
    });

    // Get product counts for each category
    const categoryData = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.count({
          where: {
            category: cat.name,
            restaurant_id: id
          }
        });
        return {
          id: cat.id,
          name: cat.name,
          emoji: cat.emoji || '🍽️',
          description: cat.description,
          displayOrder: cat.displayOrder,
          isActive: cat.isActive,
          productCount: count
        };
      })
    );

    res.json({ success: true, data: categoryData });
  } catch (error) {
    console.error('Error fetching restaurant categories:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get allowed routes for a restaurant based on their plan
router.get('/:id/allowed-routes', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Find restaurant
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Demo restaurants: use highest plan for full access
    const effectivePlanType = restaurant.is_demo ? 'Enterprise Plan' : restaurant.plan_type;

    // Find plan
    const plan = await PlanTemplate.findOne({
      where: { display_name: effectivePlanType }
    });

    if (!plan) {
      // If no plan found, return empty routes (restricted access)
      return res.json({
        restaurant_id: restaurant.id,
        plan_type: effectivePlanType,
        included_modules: [],
        allowed_routes: []
      });
    }

    // Get included modules from plan
    const includedModuleCodes = plan.included_modules || [];

    if (includedModuleCodes.length === 0) {
      // No modules included, return empty routes
      return res.json({
        restaurant_id: restaurant.id,
        plan_type: effectivePlanType,
        included_modules: [],
        allowed_routes: []
      });
    }

    // Find all modules with these codes
    const modules = await AddonModule.findAll({
      where: {
        module_code: includedModuleCodes,
        is_active: true
      }
    });

    // Collect all UI routes from modules
    const allowedRoutes = modules.reduce((routes, module) => {
      const moduleRoutes = module.ui_routes || [];
      return [...routes, ...moduleRoutes];
    }, []);

    // Remove duplicates
    const uniqueRoutes = [...new Set(allowedRoutes)];

    res.json({
      restaurant_id: restaurant.id,
      plan_type: effectivePlanType,
      included_modules: includedModuleCodes,
      allowed_routes: uniqueRoutes,
      modules: modules.map(m => ({
        code: m.module_code,
        name: m.name,
        category: m.category
      }))
    });
  } catch (error) {
    console.error('Error fetching allowed routes:', error);
    res.status(500).json({ error: 'Failed to fetch allowed routes' });
  }
});

// ============================================
// Restaurant Ingredients Routes
// ============================================


module.exports = router;
