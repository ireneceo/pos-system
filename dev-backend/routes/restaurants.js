const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const PlanTemplate = require('../models/PlanTemplate');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AddonModule = require('../models/AddonModule');
const { Recipe, Ingredient, RecipeIngredient } = require('../models');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { validateRestaurantCreation } = require('../middleware/validation');
const jwt = require('jsonwebtoken');

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
          restaurant_id: user.restaurant_id
        };
      }
    }
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};

// Get all restaurants (with role-based filtering)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { brand_id } = req.query;

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

    // Filter restaurants based on user role
    if (req.user && (req.user.role === 'Brand General' || req.user.role === 'Brand Manager')) {
      managersInclude.where = { id: req.user.id };
      managersInclude.required = true;
    }

    const restaurants = await Restaurant.findAll({
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
        }
      ],
      order: [['createdAt', 'DESC']]
    });

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
        // Admin (Owner) 정보
        admin: adminData ? {
          id: adminData.id.toString(),
          name: adminData.full_name || adminData.username,
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
        todaySales: 0, // Would need to calculate from orders
        todayOrders: 0, // Would need to calculate from orders
        staffCount: 0, // Would need to count from user assignments
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
        payment_model: restaurantData.payment_model || 'restaurant',
        foodcourt_id: restaurantData.foodcourt_id || null
      };
    });

    res.json(transformedRestaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// Get restaurants for a specific manager
router.get('/manager/:managerId', async (req, res) => {
  try {
    const { managerId } = req.params;

    const restaurants = await Restaurant.findAll({
      include: [{
        model: User,
        as: 'managers',
        where: { id: managerId },
        attributes: [],
        through: { attributes: [] }
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json(restaurants);
  } catch (error) {
    console.error('[Restaurants] Error fetching manager restaurants:', error.message);
    res.status(500).json({ error: 'Failed to fetch manager restaurants', details: error.message });
  }
});

// Get restaurant details
// Get restaurant by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      where: { slug: req.params.slug },
      include: [{
        model: User,
        as: 'managers',
        attributes: ['id', 'full_name', 'username', 'email', 'role', 'company_name', 'phone'],
        through: { attributes: ['is_primary'] }
      }]
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Transform restaurant data to include managers array
    const restaurantData = restaurant.toJSON();
    const managers = restaurantData.managers || [];

    const response = {
      ...restaurantData,
      managers: managers.map(m => ({
        id: m.id.toString(),
        name: m.full_name || m.username,
        email: m.email,
        role: m.role,
        company: m.company_name || '',
        phone: m.phone || '',
        isPrimary: m.RestaurantManager?.is_primary || false
      }))
    };

    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Error fetching restaurant by slug:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant details' });
  }
});

// Get restaurant company info (for invoices) - MUST be before /:id route
router.get('/:id/company-info', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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

    const restaurantData = restaurant.toJSON();
    const adminData = restaurantData.admin || null;
    const oversightManagers = (restaurantData.managers || []).filter(m =>
      m.role !== 'Restaurant Admin' && m.role !== 'Staff'
    );

    const response = {
      ...restaurantData,
      admin: adminData ? {
        id: adminData.id.toString(),
        name: adminData.full_name || adminData.username,
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
      }))
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

// Create new restaurant (with Restaurant Admin 1:1 coupling)
router.post('/', authenticateToken, validateRestaurantCreation, async (req, res) => {
  const { sequelize } = require('../config/database');
  const bcrypt = require('bcrypt');
  const transaction = await sequelize.transaction();

  try {
    // Validate brand_id permission if provided
    if (req.body.brand_id) {
      const brandCheck = await validateBrandPermission(req.body.brand_id, req.user.id, req.user.role);
      if (!brandCheck.valid) {
        await transaction.rollback();
        return res.status(403).json({ error: brandCheck.error });
      }
    }

    // Get plan template if specified
    let planSnapshot = null;
    let planLimits = {
      order_limit: 1000,
      menu_item_limit: 50,
      staff_limit: 5
    };

    if (req.body.planType) {
      const planName = req.body.planType.toLowerCase().replace(' plan', '');
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
      const { adminEmail, adminPassword, adminUsername, adminFullName, adminPhone } = req.body;

      if (!adminEmail || !adminPassword || !adminUsername || !adminFullName) {
        await transaction.rollback();
        return res.status(400).json({ error: 'Admin email, password, username, and full name are required' });
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

      // 비밀번호 해싱 & 유저 생성
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      adminUser = await User.create({
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: 'Restaurant Admin',
        full_name: adminFullName,
        phone: adminPhone || null
      }, { transaction });

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
      plan_type: req.body.planType || 'Basic Plan',
      plan_amount: parseFloat(req.body.planAmount) || (planSnapshot ? planSnapshot.base_price_monthly : 29.00),
      status: ['active', 'inactive', 'trial', 'overdue', 'suspended', 'expired', 'cancelled'].includes(req.body.status) ? req.body.status : 'active',
      subscription_start: req.body.subscriptionStart ? new Date(req.body.subscriptionStart) : new Date(),
      subscription_end: req.body.subscriptionEnd ? new Date(req.body.subscriptionEnd) : null,
      subscription_snapshot: planSnapshot,
      brand_id: req.body.brand_id || null,
      foodcourt_id: req.body.foodcourt_id || null,
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
          temporaryPassword: adminAction === 'create' ? req.body.adminPassword : null,
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

    const responseData = { success: true, restaurant };
    if (adminUser) {
      responseData.adminUser = {
        id: adminUser.id,
        email: adminUser.email,
        username: adminUser.username,
        fullName: adminUser.full_name
      };
    }

    res.status(201).json(responseData);
  } catch (error) {
    await transaction.rollback();
    console.error('[Restaurants] Error creating restaurant:', error.message);
    res.status(500).json({ error: 'Failed to create restaurant', details: error.message });
  }
});

// Update restaurant
router.put('/:id', authenticateToken, validateRestaurantCreation, async (req, res) => {
  try {
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
    if (req.body.trade_name !== undefined) updateData.trade_name = req.body.trade_name;
    if (req.body.tax_id !== undefined) updateData.tax_id = req.body.tax_id;
    if (req.body.website !== undefined) updateData.website = req.body.website;
    if (req.body.bank_name !== undefined) updateData.bank_name = req.body.bank_name;
    if (req.body.bank_account !== undefined) updateData.bank_account = req.body.bank_account;
    if (req.body.bank_account_name !== undefined) updateData.bank_account_name = req.body.bank_account_name;
    if (req.body.logo_url !== undefined) updateData.logo_url = req.body.logo_url;

    // Subscription fields - only update if explicitly provided (prevents accidental overwrites)
    if (req.body.planType !== undefined) updateData.plan_type = req.body.planType;
    if (req.body.planAmount !== undefined) updateData.plan_amount = parseFloat(req.body.planAmount);
    if (req.body.status !== undefined) updateData.status = req.body.status;
    if (req.body.subscriptionStart !== undefined) {
      updateData.subscription_start = req.body.subscriptionStart ? new Date(req.body.subscriptionStart) : null;
    }
    if (req.body.subscriptionEnd !== undefined) {
      updateData.subscription_end = req.body.subscriptionEnd ? new Date(req.body.subscriptionEnd) : null;
    }

    // Settings objects
    if (req.body.payment_settings !== undefined) updateData.payment_settings = req.body.payment_settings;
    if (req.body.operation_settings !== undefined) updateData.operation_settings = req.body.operation_settings;
    if (req.body.table_settings !== undefined) updateData.table_settings = req.body.table_settings;
    if (req.body.printer_settings !== undefined) updateData.printer_settings = req.body.printer_settings;

    // Brand association
    if (req.body.brand_id !== undefined) {
      updateData.brand_id = req.body.brand_id ? parseInt(req.body.brand_id) : null;
    }

    // Foodcourt association
    if (req.body.foodcourt_id !== undefined) {
      updateData.foodcourt_id = req.body.foodcourt_id ? parseInt(req.body.foodcourt_id) : null;
    }

    // Payment model (who pays invoices)
    if (req.body.payment_model !== undefined) {
      updateData.payment_model = req.body.payment_model;
    }

    // Cuisine field
    if (req.body.cuisine !== undefined) updateData.cuisine = req.body.cuisine;

    // === Restaurant Admin (Owner) 변경 처리 ===
    const adminAction = req.body.adminAction; // 'create' | 'change' | undefined

    if (adminAction === 'create' || adminAction === 'change') {
      const bcrypt = require('bcrypt');
      const { sequelize } = require('../config/database');
      const adminTransaction = await sequelize.transaction();

      try {
        let newAdminUser = null;

        if (adminAction === 'create') {
          const { adminEmail, adminPassword, adminUsername, adminFullName, adminPhone } = req.body;
          if (!adminEmail || !adminPassword || !adminUsername || !adminFullName) {
            await adminTransaction.rollback();
            return res.status(400).json({ error: 'Admin email, password, username, and full name are required' });
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
          const hashedPassword = await bcrypt.hash(adminPassword, 10);
          newAdminUser = await User.create({
            username: adminUsername,
            email: adminEmail,
            password: hashedPassword,
            role: 'Restaurant Admin',
            full_name: adminFullName,
            phone: adminPhone || null,
            restaurant_id: restaurant.id
          }, { transaction: adminTransaction });
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

    await restaurant.update(updateData);

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

    res.json({ success: true, restaurant });
  } catch (error) {
    console.error('[Restaurants] Error updating restaurant:', error.message);
    res.status(500).json({ error: 'Failed to update restaurant', details: error.message });
  }
});

// Delete restaurant
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    await restaurant.destroy();
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('[Restaurants] Error deleting restaurant:', error.message);
    res.status(500).json({ error: 'Failed to delete restaurant', details: error.message });
  }
});

// Update restaurant status
router.patch('/:id/status', async (req, res) => {
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

// Delete restaurant
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    await restaurant.destroy();
    res.json({ success: true, message: 'Restaurant deleted successfully' });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

// Get subscription data for manager
router.get('/subscriptions/manager/:managerId', async (req, res) => {
  try {
    const { managerId } = req.params;

    // Get restaurants managed by this manager via restaurant_managers junction table
    const RestaurantManager = require('../models/RestaurantManager');
    const managedLinks = await RestaurantManager.findAll({
      where: { manager_id: managerId },
      attributes: ['restaurant_id']
    });
    const managedRestaurantIds = managedLinks.map(link => link.restaurant_id);

    // Also include restaurants where this user is the admin
    const restaurants = await Restaurant.findAll({
      where: {
        [Op.or]: [
          { admin_id: managerId },
          ...(managedRestaurantIds.length > 0 ? [{ id: { [Op.in]: managedRestaurantIds } }] : [])
        ]
      },
      include: [
        {
          model: Invoice,
          as: 'invoices',
          attributes: ['id', 'status', 'paid_at', 'total_amount', 'due_date', 'billing_period_start', 'billing_period_end'],
          required: false
        },
        {
          model: Order,
          as: 'orders',
          attributes: ['id', 'total_amount', 'status', 'order_date'],
          required: false,
          where: {
            order_date: {
              [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1) // This month
            }
          }
        }
      ]
    });

    // Transform data to match frontend RestaurantSubscription interface
    const subscriptions = restaurants.map(restaurant => {
      const invoices = restaurant.invoices || [];
      const orders = restaurant.orders || [];
      
      // Get latest paid invoice for last payment info
      const lastPaidInvoice = invoices
        .filter(inv => inv.status === 'paid' && inv.paid_at)
        .sort((a, b) => new Date(b.paid_at) - new Date(a.paid_at))[0];
        
      // Get next unpaid invoice for next payment
      const nextInvoice = invoices
        .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];

      // Calculate current month orders
      const currentOrders = orders.filter(order => order.status === 'completed').length;
      
      // Determine order limit based on plan
      const orderLimits = {
        'Basic Plan': 1000,
        'Professional Plan': 10000,
        'Enterprise Plan': -1 // Unlimited
      };

      // Calculate fees based on plan
      const planFees = {
        'Basic Plan': { monthly: 29, annual: 290 },
        'Professional Plan': { monthly: 99, annual: 990 },
        'Enterprise Plan': { monthly: 199, annual: 2190 }
      };

      const fees = planFees[restaurant.plan_type] || planFees['Basic Plan'];

      return {
        id: `sub-${restaurant.id}`,
        restaurantId: restaurant.id.toString(),
        restaurantName: restaurant.name,
        managerId: (restaurant.admin_id || '').toString(),
        managerName: restaurant.admin_name || 'Unassigned',
        planType: restaurant.plan_type.toLowerCase().replace(' plan', ''),
        status: restaurant.status,
        startDate: restaurant.subscription_start?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
        endDate: restaurant.subscription_end?.toISOString().split('T')[0] || new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
        monthlyFee: fees.monthly,
        annualFee: fees.annual,
        billingCycle: restaurant.billing_cycle || 'monthly',
        // Map payment_model to frontend format: brand_manager -> manager, restaurant -> self
        paymentModel: restaurant.payment_model === 'brand_manager' ? 'manager' :
                      restaurant.payment_model === 'restaurant' ? 'self' : 'manager',
        payerId: restaurant.payment_model === 'restaurant' ? restaurant.id.toString() : (restaurant.admin_id?.toString() || ''),
        payerName: restaurant.payment_model === 'restaurant' ? restaurant.name : (restaurant.admin_name || 'Unassigned'),
        orderLimit: orderLimits[restaurant.plan_type] || 1000,
        currentOrders: currentOrders,
        features: [], // Will be filled by frontend based on plan
        lastPayment: lastPaidInvoice ? lastPaidInvoice.paid_at.toISOString().split('T')[0] : '-',
        nextPayment: nextInvoice ? nextInvoice.due_date.toISOString().split('T')[0] : new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
        autoRenew: restaurant.status === 'active',
        location: restaurant.address || 'No address provided'
      };
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching manager subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch manager subscriptions' });
  }
});

// Add new subscription for restaurant
router.post('/subscriptions', async (req, res) => {
  try {
    const { restaurantId, managerId, planType, billingCycle, paymentModel } = req.body;
    
    // Get restaurant
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Get manager
    const manager = await User.findByPk(managerId);
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    // Plan pricing
    const planPrices = {
      'basic': { monthly: 29, annual: 290 },
      'professional': { monthly: 99, annual: 990 },
      'enterprise': { monthly: 199, annual: 2190 }
    };

    const fees = planPrices[planType] || planPrices['basic'];

    // Update restaurant with subscription info
    await restaurant.update({
      admin_id: managerId,
      admin_name: manager.full_name || manager.username,
      plan_type: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`,
      plan_amount: fees.monthly,
      status: 'active',
      subscription_start: new Date(),
      subscription_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
    });

    // Create first invoice
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30); // 30 days from now

    const invoice = await Invoice.create({
      restaurant_id: restaurantId,
      invoice_number: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      type: 'manual',
      billing_period_start: new Date(),
      billing_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      due_date: dueDate,
      total_amount: billingCycle === 'annual' ? fees.annual * 1.06 : fees.monthly * 1.06, // Including 6% tax
      status: 'pending_payment',
      notes: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${billingCycle} subscription`,
      issued_by: managerId,
      issued_at: new Date()
    });

    // Create invoice item
    await require('../models/InvoiceItem').create({
      invoice_id: invoice.id,
      item_type: 'subscription',
      description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${billingCycle} Subscription`,
      calculation_method: 'fixed',
      fixed_amount: billingCycle === 'annual' ? fees.annual : fees.monthly,
      calculated_amount: billingCycle === 'annual' ? fees.annual : fees.monthly,
      tax_rate: 6.0,
      tax_amount: (billingCycle === 'annual' ? fees.annual : fees.monthly) * 0.06,
      total_amount: (billingCycle === 'annual' ? fees.annual : fees.monthly) * 1.06
    });

    // Send Invoice Email (non-blocking, system_admin SMTP for POS subscriptions)
    try {
      const { sendIssuerEmail } = require('../utils/emailService');
      const { invoiceEmail } = require('../utils/emailTemplates');

      const adminUser = restaurant.admin_id ? await User.findByPk(restaurant.admin_id) : null;
      if (adminUser && adminUser.email) {
        const billingAmount = billingCycle === 'annual' ? fees.annual : fees.monthly;
        const taxRate = 6;
        const taxAmount = billingAmount * 0.06;
        const totalAmount = billingAmount * 1.06;
        const siteUrl = process.env.SITE_URL || 'https://purplehere.com';

        const formatDate = (d) => new Date(d).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });

        const emailData = {
          adminName: adminUser.full_name || adminUser.username,
          restaurantName: restaurant.name,
          invoiceNumber: invoice.invoice_number,
          planType: planType.charAt(0).toUpperCase() + planType.slice(1) + ' Plan',
          billingCycle,
          subtotal: billingAmount,
          taxRate,
          taxAmount,
          totalAmount,
          currency: restaurant.currency || 'RM',
          billingPeriodStart: formatDate(invoice.billing_period_start),
          billingPeriodEnd: formatDate(invoice.billing_period_end),
          dueDate: formatDate(dueDate),
          dashboardUrl: siteUrl + '/pos/login'
        };

        const { subject, html, text } = invoiceEmail(emailData);
        sendIssuerEmail('system_admin', null, { to: adminUser.email, subject, html, text })
          .then(result => console.log(`[Email] Invoice email sent to ${adminUser.email} for ${invoice.invoice_number} (${result.messageId})`))
          .catch(err => console.error('[Email] Invoice email failed:', err.message));
      }
    } catch (emailError) {
      console.error('[Email] Invoice email setup failed:', emailError.message);
    }

    res.json({ success: true, message: 'Subscription added successfully' });
  } catch (error) {
    console.error('Error adding subscription:', error);
    res.status(500).json({ error: 'Failed to add subscription' });
  }
});

// Get available restaurants for manager (restaurants without active subscriptions)
router.get('/available/:managerId', async (req, res) => {
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
router.get('/:id/categories', async (req, res) => {
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
router.get('/:id/allowed-routes', async (req, res) => {
  try {
    const { id } = req.params;

    // Find restaurant
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Find plan
    const plan = await PlanTemplate.findOne({
      where: { display_name: restaurant.plan_type }
    });

    if (!plan) {
      // If no plan found, return empty routes (restricted access)
      return res.json({
        restaurant_id: restaurant.id,
        plan_type: restaurant.plan_type,
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
        plan_type: restaurant.plan_type,
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
      plan_type: restaurant.plan_type,
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

router.get('/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const ingredients = await Ingredient.findAll({
      where: { restaurant_id: restaurantId },
      order: [['name', 'ASC']]
    });
    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get restaurant ingredients error:', error);
    res.status(500).json({ error: '재료 목록 조회 실패' });
  }
});

router.post('/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock } = req.body;
    const ingredient = await Ingredient.create({
      brand_id: null,
      restaurant_id: restaurantId,
      code, name, category, unit, unit_cost, supplier_name,
      min_stock: min_stock || 0,
      current_stock: 0
    });
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 생성 실패' });
  }
});

router.put('/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock, image_url, ingredient_category_id, base_quantity, supplier_id, track_stock } = req.body;
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) return res.status(404).json({ error: '재료를 찾을 수 없습니다' });

    // Build update object with only provided fields
    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (unit !== undefined) updateData.unit = unit;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    if (supplier_name !== undefined) updateData.supplier_name = supplier_name;
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (ingredient_category_id !== undefined) updateData.ingredient_category_id = ingredient_category_id;
    if (base_quantity !== undefined) updateData.base_quantity = base_quantity;
    if (supplier_id !== undefined) updateData.supplier_id = supplier_id;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

    await ingredient.update(updateData);
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Update restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 수정 실패' });
  }
});

router.delete('/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) return res.status(404).json({ error: '재료를 찾을 수 없습니다' });
    await ingredient.destroy();
    res.json({ success: true, message: '재료가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant ingredient error:', error);
    res.status(500).json({ error: '재료 삭제 실패' });
  }
});

// ============================================
// Restaurant Recipes Routes - MOVED TO /routes/recipes.js
// ============================================

// ============================================
// Inventory Routes - Mount inventory router
// ============================================
const inventoryRoutes = require('./inventory-routes');
router.use('/', inventoryRoutes);

module.exports = router;