const express = require('express');
const router = express.Router();
const { Brand, Restaurant, User, EntityPlan, EntityPlanRestaurant, EntityPlanPrice, Order, Invoice, InvoiceItem } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

// ============================================
// Company Info APIs (MUST be before /:id routes)
// ============================================

// Get company info for brand owner
router.get('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/brands/company-info - User: ${req.user.email} (${req.user.role})`);

    // Brand General/Manager는 자신이 소유한 브랜드의 회사정보를 가져옴
    if (req.user.role !== 'Brand General' && req.user.role !== 'Brand Manager') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Try by brand_id from user first (더 직접적)
    let brand = null;
    if (req.user.brand_id) {
      brand = await Brand.findByPk(req.user.brand_id);
    }

    // Fallback to owner_id
    if (!brand) {
      brand = await Brand.findOne({
        where: { owner_id: req.user.id }
      });
    }

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    res.json({
      company_name: brand.company_name || brand.name,
      registration_no: brand.registration_no,
      trade_name: brand.trade_name,
      address: brand.address,
      city: brand.city,
      state: brand.state,
      postal_code: brand.postal_code,
      country: brand.country || 'MY',
      phone: brand.phone,
      email: brand.email,
      website: brand.website,
      tax_no: brand.tax_no,
      logo_url: brand.logo_url,
      operation_settings: brand.operation_settings
    });
  } catch (error) {
    console.error('Error fetching brand company info:', error);
    res.status(500).json({ error: 'Failed to fetch company info' });
  }
});

// Update company info for brand owner
router.put('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 PUT /api/brands/company-info - User: ${req.user.email}`);
    console.log(`  req.user.id: ${req.user.id}, req.user.brand_id: ${req.user.brand_id}, role: ${req.user.role}`);

    if (req.user.role !== 'Brand General' && req.user.role !== 'Brand Manager') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Try by brand_id from user first (더 직접적)
    let brand = null;
    if (req.user.brand_id) {
      brand = await Brand.findByPk(req.user.brand_id);
    }

    // Fallback to owner_id
    if (!brand) {
      brand = await Brand.findOne({
        where: { owner_id: req.user.id }
      });
    }

    console.log(`  Brand found: ${brand ? brand.name : 'NOT FOUND'}`);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    const updateData = {
      company_name: req.body.company_name,
      registration_no: req.body.registration_no,
      trade_name: req.body.trade_name,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code,
      country: req.body.country,
      phone: req.body.phone,
      email: req.body.email,
      website: req.body.website,
      tax_no: req.body.tax_no,
      logo_url: req.body.logo_url,
      operation_settings: req.body.operation_settings
    };

    await brand.update(updateData);
    console.log(`✅ Brand company info updated: ${brand.name}`);

    res.json({ success: true, message: 'Company info updated successfully' });
  } catch (error) {
    console.error('Error updating brand company info:', error);
    res.status(500).json({ error: 'Failed to update company info' });
  }
});

// Get all brands (filtered by owner for Brand General)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/brands - User: ${req.user.email} (${req.user.role})`);

    const whereClause = {};

    // Brand General/Brand Manager only see their own brands
    if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
      whereClause.owner_id = req.user.id;
      console.log(`🔐 Filtering brands for ${req.user.role}: owner_id = ${req.user.id}`);
    } else if (req.user.role === 'System Admin') {
      console.log(`👑 System Admin: Returning all brands`);
    } else {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const brands = await Brand.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status']
        }
      ],
      order: [['created_at', 'DESC']]
    });

    console.log(`📊 Found ${brands.length} brands`);
    res.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Failed to fetch brands' });
  }
});

// Get single brand by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 GET /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status', 'address', 'phone']
        }
      ]
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ error: 'Failed to fetch brand' });
  }
});

// Create new brand
router.post('/', authenticateToken, requireRole('Brand General', 'System Admin'), async (req, res) => {
  try {
    console.log(`🆕 POST /api/brands - User: ${req.user.email}`);
    console.log('📝 Brand data:', req.body);

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    // Set owner_id to current user if Brand General
    const owner_id = req.user.role === 'Brand General' ? req.user.id : req.body.owner_id;

    const brand = await Brand.create({
      name,
      code,
      description,
      logo_url,
      owner_id,
      email,
      phone,
      address,
      website,
      currency: currency || 'RM',
      status: status || 'active'
    });

    console.log(`✅ Brand created: ${brand.name} (ID: ${brand.id})`);

    // Fetch with associations
    const createdBrand = await Brand.findByPk(brand.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        }
      ]
    });

    res.status(201).json(createdBrand);
  } catch (error) {
    console.error('Error creating brand:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Brand code already exists' });
    }

    res.status(500).json({ error: 'Failed to create brand' });
  }
});

// Update brand
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📝 PUT /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    await brand.update({
      name: name || brand.name,
      code: code || brand.code,
      description,
      logo_url,
      email,
      phone,
      address,
      website,
      currency: currency || brand.currency,
      status: status || brand.status
    });

    console.log(`✅ Brand updated: ${brand.name}`);

    // Fetch with associations
    const updatedBrand = await Brand.findByPk(id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        },
        {
          model: Restaurant,
          as: 'restaurants',
          attributes: ['id', 'name', 'status']
        }
      ]
    });

    res.json(updatedBrand);
  } catch (error) {
    console.error('Error updating brand:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Brand code already exists' });
    }

    res.status(500).json({ error: 'Failed to update brand' });
  }
});

// Get restaurants for a brand
router.get('/:id/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🏪 GET /api/brands/${id}/restaurants - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    const restaurants = await Restaurant.findAll({
      where: { brand_id: id },
      attributes: ['id', 'name', 'status', 'address', 'phone'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching brand restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch brand restaurants' });
  }
});

// Delete brand
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ DELETE /api/brands/${id} - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurants'
      }]
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    // Check if brand has restaurants
    if (brand.restaurants && brand.restaurants.length > 0) {
      return res.status(400).json({
        error: `Cannot delete brand with ${brand.restaurants.length} restaurant(s). Please remove or reassign restaurants first.`
      });
    }

    await brand.destroy();
    console.log(`✅ Brand deleted: ${brand.name}`);

    res.json({ message: 'Brand deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Failed to delete brand' });
  }
});

// ============================================
// Payment Settings APIs (B2B Invoice Payment)
// ============================================

// Get payment settings for a brand
router.get('/:id/payment-settings', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`💳 GET /api/brands/${id}/payment-settings - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    res.json({
      success: true,
      data: {
        payment_settings: brand.payment_settings,
        invoice_settings: brand.invoice_settings,
        supported_currencies: brand.supported_currencies
      }
    });
  } catch (error) {
    console.error('Error fetching brand payment settings:', error);
    res.status(500).json({ error: 'Failed to fetch payment settings' });
  }
});

// Update payment settings for a brand
router.put('/:id/payment-settings', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`💳 PUT /api/brands/${id}/payment-settings - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions (Brand General only or System Admin)
    if (req.user.role !== 'System Admin' &&
        (req.user.role !== 'Brand General' || brand.owner_id !== req.user.id)) {
      return res.status(403).json({ error: 'Access denied. Only Brand General or System Admin can update payment settings.' });
    }

    const { payment_settings, invoice_settings, supported_currencies } = req.body;

    // Validate payment_settings structure if provided
    if (payment_settings) {
      const validPaymentSettings = {
        currencies: payment_settings.currencies || ['MYR'],
        defaultCurrency: payment_settings.defaultCurrency || 'MYR',
        stripe: payment_settings.stripe || { enabled: false },
        paypal: payment_settings.paypal || { enabled: false },
        bankTransfer: payment_settings.bankTransfer || {},
        qrPayment: payment_settings.qrPayment || {},
        // 추가 청구 설정 (3개 항목)
        additionalCharges: payment_settings.additionalCharges || [
          { enabled: false, name: '', rate: 0 },
          { enabled: false, name: '', rate: 0 },
          { enabled: false, name: '', rate: 0 }
        ]
      };
      brand.payment_settings = validPaymentSettings;
    }

    // Validate invoice_settings structure if provided
    if (invoice_settings) {
      const validInvoiceSettings = {
        invoicePrefix: invoice_settings.invoicePrefix || 'INV',
        paymentTerms: invoice_settings.paymentTerms || 30,
        taxRate: invoice_settings.taxRate || 6,
        autoGenerate: invoice_settings.autoGenerate || false,
        autoSendEmail: invoice_settings.autoSendEmail || false,
        ...invoice_settings
      };
      brand.invoice_settings = validInvoiceSettings;
    }

    // Update supported currencies if provided (validate against system currencies)
    if (supported_currencies && Array.isArray(supported_currencies)) {
      const SystemSettings = require('../models/SystemSettings');
      const sysCurrSetting = await SystemSettings.findOne({ where: { setting_key: 'supported_currencies' } });
      const systemCurrencies = sysCurrSetting?.setting_value || ['USD', 'MYR', 'KRW'];
      const invalid = supported_currencies.filter(c => !systemCurrencies.includes(c));
      if (invalid.length > 0) {
        return res.status(400).json({ error: `Currencies not supported by system: ${invalid.join(', ')}` });
      }
      brand.supported_currencies = supported_currencies;
    }

    await brand.save();
    console.log(`✅ Brand payment settings updated: ${brand.name}`);

    res.json({
      success: true,
      message: 'Payment settings updated successfully',
      data: {
        payment_settings: brand.payment_settings,
        invoice_settings: brand.invoice_settings,
        supported_currencies: brand.supported_currencies
      }
    });
  } catch (error) {
    console.error('Error updating brand payment settings:', error);
    res.status(500).json({ error: 'Failed to update payment settings' });
  }
});

// Get available payment methods for a brand (used by invoice payers)
router.get('/:id/payment-settings/available/:currency', authenticateToken, async (req, res) => {
  try {
    const { id, currency } = req.params;
    const { getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    const result = getAvailablePaymentMethods(brand.payment_settings || {}, currency);
    res.json(result);
  } catch (error) {
    console.error('Error fetching brand available payment methods:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch payment methods' });
  }
});

// Get subscription info for a brand (System Admin can set, Brand General can view)
router.get('/:id/subscription', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📋 GET /api/brands/${id}/subscription - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && brand.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this brand' });
    }

    res.json({
      success: true,
      data: {
        subscription_status: brand.subscription_status,
        subscription_start: brand.subscription_start,
        subscription_end: brand.subscription_end,
        plan_type: brand.plan_type
      }
    });
  } catch (error) {
    console.error('Error fetching brand subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription info' });
  }
});

// Update subscription info for a brand (System Admin only)
router.put('/:id/subscription', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📋 PUT /api/brands/${id}/subscription - User: ${req.user.email}`);

    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    const { subscription_status, subscription_start, subscription_end, plan_type } = req.body;

    if (subscription_status) {
      brand.subscription_status = subscription_status;
    }
    if (subscription_start !== undefined) {
      brand.subscription_start = subscription_start;
    }
    if (subscription_end !== undefined) {
      brand.subscription_end = subscription_end;
    }
    if (plan_type !== undefined) {
      brand.plan_type = plan_type;
    }

    await brand.save();
    console.log(`✅ Brand subscription updated: ${brand.name}`);

    res.json({
      success: true,
      message: 'Subscription info updated successfully',
      data: {
        subscription_status: brand.subscription_status,
        subscription_start: brand.subscription_start,
        subscription_end: brand.subscription_end,
        plan_type: brand.plan_type
      }
    });
  } catch (error) {
    console.error('Error updating brand subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription info' });
  }
});

// ============================================
// Brand Plans APIs (EntityPlan CRUD)
// ============================================

// Helper: verify brand access
async function verifyBrandAccess(req, brandId) {
  const brand = await Brand.findByPk(brandId);
  if (!brand) return { error: 'Brand not found', status: 404 };

  if (req.user.role === 'System Admin') return { brand };
  if ((req.user.role === 'Brand General' || req.user.role === 'Brand Manager') &&
      (brand.owner_id === req.user.id || req.user.brand_id === brand.id)) {
    return { brand };
  }
  return { error: 'Access denied', status: 403 };
}

// GET /api/brands/:id/plans - Get all plans for a brand
router.get('/:id/plans', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plans = await EntityPlan.findAll({
      where: { entity_type: 'brand', entity_id: id },
      include: [{
        model: EntityPlanRestaurant,
        as: 'planRestaurants',
        include: [{
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'status']
        }]
      }, {
        model: EntityPlanPrice,
        as: 'prices'
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error fetching brand plans:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plans' });
  }
});

// GET /api/brands/:id/plans/:planId - Get single plan detail
router.get('/:id/plans/:planId', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'brand', entity_id: id },
      include: [{
        model: EntityPlanRestaurant,
        as: 'planRestaurants',
        include: [{
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'status', 'address']
        }]
      }, {
        model: EntityPlanPrice,
        as: 'prices'
      }]
    });

    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error('Error fetching brand plan:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plan' });
  }
});

// POST /api/brands/:id/plans - Create a new plan
router.post('/:id/plans', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const {
      name, description,
      auto_generate, currency,
      category, is_popular, features, included_modules,
      menu_item_limit, order_limit, staff_limit,
      charge_type, percentage_value, revenue_base, billing_day,
      currency_prices
    } = req.body;

    if (!name) return res.status(400).json({ success: false, message: 'Plan name is required' });

    // Validate plan currency against system supported currencies
    const planCurrency = currency || access.brand.currency || 'MYR';
    const SystemSettings = require('../models/SystemSettings');
    const sysCurrSetting = await SystemSettings.findOne({ where: { setting_key: 'supported_currencies' } });
    const systemCurrencies = sysCurrSetting?.setting_value || ['USD', 'MYR', 'KRW'];
    if (!systemCurrencies.includes(planCurrency)) {
      return res.status(400).json({ success: false, message: `Currency ${planCurrency} is not supported by the system` });
    }

    const plan = await EntityPlan.create({
      entity_type: 'brand',
      entity_id: id,
      name,
      description: description || null,
      charge_type: charge_type || 'fixed',
      percentage_value: charge_type === 'percentage' ? (percentage_value || 0) : 0,
      revenue_base: charge_type === 'percentage' ? (revenue_base || 'previous_month') : 'previous_month',
      billing_day: billing_day || null,
      auto_generate: auto_generate !== undefined ? auto_generate : true,
      currency: planCurrency,
      category: category || 'custom',
      is_popular: is_popular || false,
      features: features || [],
      included_modules: included_modules || [],
      menu_item_limit: menu_item_limit !== undefined ? menu_item_limit : -1,
      order_limit: order_limit !== undefined ? order_limit : -1,
      staff_limit: staff_limit !== undefined ? staff_limit : -1,
      created_by: req.user.id
    });

    // Save multi-currency prices if provided
    if (currency_prices && typeof currency_prices === 'object') {
      for (const [currCode, prices] of Object.entries(currency_prices)) {
        if (prices.monthly_price > 0 || prices.annual_price > 0) {
          await EntityPlanPrice.create({
            entity_plan_id: plan.id,
            currency: currCode,
            monthly_price: prices.monthly_price || 0,
            annual_price: prices.annual_price || 0,
            is_active: true
          });
        }
      }
    }

    // Fetch with associations for response
    const created = await EntityPlan.findByPk(plan.id, {
      include: [{
        model: EntityPlanRestaurant,
        as: 'planRestaurants',
        include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'status'] }]
      }, {
        model: EntityPlanPrice,
        as: 'prices'
      }]
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Error creating brand plan:', error);
    res.status(500).json({ success: false, message: 'Failed to create plan' });
  }
});

// PUT /api/brands/:id/plans/:planId - Update a plan
router.put('/:id/plans/:planId', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'brand', entity_id: id }
    });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const {
      name, description,
      auto_generate, currency, is_active,
      category, is_popular, features, included_modules,
      menu_item_limit, order_limit, staff_limit,
      charge_type, percentage_value, revenue_base, billing_day
    } = req.body;

    await plan.update({
      name: name !== undefined ? name : plan.name,
      description: description !== undefined ? description : plan.description,
      charge_type: charge_type !== undefined ? charge_type : plan.charge_type,
      percentage_value: percentage_value !== undefined ? percentage_value : plan.percentage_value,
      revenue_base: revenue_base !== undefined ? revenue_base : plan.revenue_base,
      billing_day: billing_day !== undefined ? billing_day : plan.billing_day,
      auto_generate: auto_generate !== undefined ? auto_generate : plan.auto_generate,
      currency: currency !== undefined ? currency : plan.currency,
      is_active: is_active !== undefined ? is_active : plan.is_active,
      category: category !== undefined ? category : plan.category,
      is_popular: is_popular !== undefined ? is_popular : plan.is_popular,
      features: features !== undefined ? features : plan.features,
      included_modules: included_modules !== undefined ? included_modules : plan.included_modules,
      menu_item_limit: menu_item_limit !== undefined ? menu_item_limit : plan.menu_item_limit,
      order_limit: order_limit !== undefined ? order_limit : plan.order_limit,
      staff_limit: staff_limit !== undefined ? staff_limit : plan.staff_limit
    });

    const updated = await EntityPlan.findByPk(planId, {
      include: [{
        model: EntityPlanRestaurant,
        as: 'planRestaurants',
        include: [{
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'status']
        }]
      }, {
        model: EntityPlanPrice,
        as: 'prices'
      }]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating brand plan:', error);
    res.status(500).json({ success: false, message: 'Failed to update plan' });
  }
});

// DELETE /api/brands/:id/plans/:planId - Delete a plan
router.delete('/:id/plans/:planId', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'brand', entity_id: id },
      include: [{ model: EntityPlanRestaurant, as: 'planRestaurants' }]
    });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    // Check if plan has active restaurant assignments
    const activeAssignments = plan.planRestaurants.filter(pr => pr.is_active);
    if (activeAssignments.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete plan with ${activeAssignments.length} active restaurant(s). Please unassign restaurants first.`
      });
    }

    // Remove all assignments and prices then delete plan
    await EntityPlanRestaurant.destroy({ where: { entity_plan_id: planId } });
    await EntityPlanPrice.destroy({ where: { entity_plan_id: planId } });
    await plan.destroy();

    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting brand plan:', error);
    res.status(500).json({ success: false, message: 'Failed to delete plan' });
  }
});

// ============================================
// Brand Plan - Restaurant Assignment APIs
// ============================================

// GET /api/brands/:id/plans/:planId/restaurants - Get restaurants assigned to a plan
router.get('/:id/plans/:planId/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const assignments = await EntityPlanRestaurant.findAll({
      where: { entity_plan_id: planId },
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'status', 'address', 'phone']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: assignments });
  } catch (error) {
    console.error('Error fetching plan restaurants:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plan restaurants' });
  }
});

// POST /api/brands/:id/plans/:planId/restaurants - Assign restaurants to a plan
router.post('/:id/plans/:planId/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    // Verify plan exists and belongs to this brand
    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'brand', entity_id: id }
    });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const { restaurant_ids } = req.body;
    if (!restaurant_ids || !Array.isArray(restaurant_ids) || restaurant_ids.length === 0) {
      return res.status(400).json({ success: false, message: 'restaurant_ids array is required' });
    }

    // Verify all restaurants belong to this brand
    const restaurants = await Restaurant.findAll({
      where: { id: restaurant_ids, brand_id: id },
      attributes: ['id', 'name']
    });

    if (restaurants.length !== restaurant_ids.length) {
      return res.status(400).json({
        success: false,
        message: 'Some restaurants do not belong to this brand'
      });
    }

    const results = [];
    for (const restaurantId of restaurant_ids) {
      try {
        const [assignment, created] = await EntityPlanRestaurant.findOrCreate({
          where: { entity_plan_id: planId, restaurant_id: restaurantId },
          defaults: { activation_date: new Date(), is_active: true }
        });

        if (!created && !assignment.is_active) {
          await assignment.update({ is_active: true, activation_date: new Date() });
        }

        results.push({ restaurant_id: restaurantId, status: created ? 'assigned' : 'reactivated' });
      } catch (e) {
        results.push({ restaurant_id: restaurantId, status: 'error', message: e.message });
      }
    }

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error assigning restaurants to plan:', error);
    res.status(500).json({ success: false, message: 'Failed to assign restaurants' });
  }
});

// DELETE /api/brands/:id/plans/:planId/restaurants/:restaurantId - Unassign a restaurant
router.delete('/:id/plans/:planId/restaurants/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const { id, planId, restaurantId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const assignment = await EntityPlanRestaurant.findOne({
      where: { entity_plan_id: planId, restaurant_id: restaurantId }
    });

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Assignment not found' });
    }

    await assignment.update({ is_active: false });

    res.json({ success: true, message: 'Restaurant unassigned from plan' });
  } catch (error) {
    console.error('Error unassigning restaurant:', error);
    res.status(500).json({ success: false, message: 'Failed to unassign restaurant' });
  }
});

// PUT /api/brands/:id/plans/:planId/restaurants/:restaurantId/discount - Set discount for a restaurant
router.put('/:id/plans/:planId/restaurants/:restaurantId/discount', authenticateToken, async (req, res) => {
  try {
    const { id, planId, restaurantId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { discount_type, discount_value, discount_reason } = req.body;

    if (!['none', 'percentage', 'fixed'].includes(discount_type)) {
      return res.status(400).json({ success: false, message: 'Invalid discount_type. Must be none, percentage, or fixed.' });
    }

    const numValue = parseFloat(discount_value) || 0;
    if (discount_type === 'percentage' && (numValue < 0 || numValue > 100)) {
      return res.status(400).json({ success: false, message: 'Percentage discount must be between 0 and 100.' });
    }
    if (numValue < 0) {
      return res.status(400).json({ success: false, message: 'Discount value cannot be negative.' });
    }

    const assignment = await EntityPlanRestaurant.findOne({
      where: { entity_plan_id: planId, restaurant_id: restaurantId, is_active: true }
    });

    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Active plan assignment not found' });
    }

    await assignment.update({
      discount_type: discount_type || 'none',
      discount_value: numValue,
      discount_reason: discount_reason || null
    });

    res.json({ success: true, data: assignment });
  } catch (error) {
    console.error('Error setting discount:', error);
    res.status(500).json({ success: false, message: 'Failed to set discount' });
  }
});

// GET /api/brands/:id/plans/:planId/prices - Get multi-currency prices for a plan
router.get('/:id/plans/:planId/prices', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const prices = await EntityPlanPrice.findAll({
      where: { entity_plan_id: planId },
      order: [['currency', 'ASC']]
    });

    res.json({ success: true, data: prices });
  } catch (error) {
    console.error('Error fetching plan prices:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plan prices' });
  }
});

// PUT /api/brands/:id/plans/:planId/prices - Update multi-currency prices for a plan
router.put('/:id/plans/:planId/prices', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'brand', entity_id: id }
    });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const { prices } = req.body;
    if (!prices || typeof prices !== 'object') {
      return res.status(400).json({ success: false, message: 'prices object is required' });
    }

    const results = [];
    for (const [currCode, priceData] of Object.entries(prices)) {
      const monthlyPrice = parseFloat(priceData.monthly_price) || 0;
      const annualPrice = parseFloat(priceData.annual_price) || 0;

      const [priceRecord, created] = await EntityPlanPrice.findOrCreate({
        where: { entity_plan_id: planId, currency: currCode },
        defaults: { monthly_price: monthlyPrice, annual_price: annualPrice, is_active: true }
      });

      if (!created) {
        await priceRecord.update({ monthly_price: monthlyPrice, annual_price: annualPrice });
      }

      results.push({ currency: currCode, monthly_price: monthlyPrice, annual_price: annualPrice, created });
    }

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error updating plan prices:', error);
    res.status(500).json({ success: false, message: 'Failed to update plan prices' });
  }
});

// ============================================
// Revenue & Invoice Calculation APIs
// ============================================

/**
 * Calculate charges for a single plan (1 plan = 1 charge item)
 * @param {object} plan - EntityPlan instance (with prices if fixed type)
 * @param {number} revenue - Total revenue for the billing period
 * @param {number} taxRate - Tax rate percentage (e.g., 6 for 6%) from payment settings
 * @param {string} currency - Currency code for fixed pricing lookup
 * @returns {object} { items: [], subtotal, taxAmount, totalAmount }
 */
function calculatePlanCharges(plan, revenue, taxRate = 0, currency = null) {
  const items = [];
  let subtotal = 0;
  const taxRateDecimal = parseFloat(taxRate) / 100;
  const planCurrency = currency || plan.currency || 'MYR';

  if (plan.charge_type === 'fixed') {
    // Fixed: lookup monthly_price from EntityPlanPrice for this currency
    const priceRecord = (plan.prices || []).find(p => p.currency === planCurrency);
    const amount = parseFloat(priceRecord?.monthly_price || 0);
    if (amount > 0) {
      const tax = Math.round(amount * taxRateDecimal * 100) / 100;
      items.push({
        item_type: 'fixed_charge',
        description: plan.name,
        calculation_method: 'fixed',
        fixed_amount: amount,
        percentage_rate: null,
        base_amount: null,
        calculated_amount: amount,
        tax_rate: parseFloat(taxRate),
        tax_amount: tax,
        total_amount: Math.round((amount + tax) * 100) / 100
      });
      subtotal += amount;
    }
  } else if (plan.charge_type === 'percentage') {
    const rate = parseFloat(plan.percentage_value || 0);
    const amount = Math.round(revenue * rate / 100 * 100) / 100;
    if (amount > 0) {
      const tax = Math.round(amount * taxRateDecimal * 100) / 100;
      items.push({
        item_type: 'percentage_charge',
        description: `${plan.name} (${rate}% of ${planCurrency} ${revenue.toLocaleString()})`,
        calculation_method: 'percentage',
        fixed_amount: null,
        percentage_rate: rate,
        base_amount: revenue,
        calculated_amount: amount,
        tax_rate: parseFloat(taxRate),
        tax_amount: tax,
        total_amount: Math.round((amount + tax) * 100) / 100
      });
      subtotal += amount;
    }
  }

  const taxAmount = Math.round(subtotal * taxRateDecimal * 100) / 100;
  const totalAmount = Math.round((subtotal + taxAmount) * 100) / 100;

  return { items, subtotal, taxAmount, totalAmount };
}

// GET /api/brands/:id/revenue - Get revenue summary for brand restaurants
router.get('/:id/revenue', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { start_date, end_date, restaurant_id } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({ success: false, message: 'start_date and end_date are required' });
    }

    // Build restaurant filter
    const restaurantWhere = { brand_id: id };
    if (restaurant_id) {
      restaurantWhere.id = restaurant_id;
    }

    const restaurants = await Restaurant.findAll({
      where: restaurantWhere,
      attributes: ['id', 'name']
    });

    const restaurantIds = restaurants.map(r => r.id);
    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: { total_revenue: 0, restaurants: [] } });
    }

    // Query completed orders revenue per restaurant
    const revenueData = await Order.findAll({
      attributes: [
        'restaurant_id',
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'order_count']
      ],
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: 'completed',
        order_date: {
          [Op.between]: [new Date(start_date), new Date(end_date + 'T23:59:59')]
        },
        is_deleted: false
      },
      group: ['restaurant_id'],
      raw: true
    });

    // Map revenue to restaurants
    const revenueMap = {};
    revenueData.forEach(r => {
      revenueMap[r.restaurant_id] = {
        revenue: parseFloat(r.revenue || 0),
        order_count: parseInt(r.order_count || 0)
      };
    });

    const result = restaurants.map(r => ({
      restaurant_id: r.id,
      restaurant_name: r.name,
      revenue: revenueMap[r.id]?.revenue || 0,
      order_count: revenueMap[r.id]?.order_count || 0
    }));

    const totalRevenue = result.reduce((sum, r) => sum + r.revenue, 0);

    res.json({
      success: true,
      data: {
        period: { start_date, end_date },
        total_revenue: totalRevenue,
        restaurants: result
      }
    });
  } catch (error) {
    console.error('Error fetching revenue:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch revenue data' });
  }
});

// GET /api/brands/:id/invoice-preview - Preview invoice charges for a restaurant+plan
router.get('/:id/invoice-preview', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { plan_id, restaurant_id, start_date, end_date } = req.query;

    if (!plan_id || !restaurant_id) {
      return res.status(400).json({ success: false, message: 'plan_id and restaurant_id are required' });
    }

    const plan = await EntityPlan.findOne({
      where: { id: plan_id, entity_type: 'brand', entity_id: id },
      include: [{ model: EntityPlanPrice, as: 'prices' }]
    });
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found' });
    }

    // Calculate period if not provided (default: last month)
    const now = new Date();
    const periodEnd = end_date ? new Date(end_date + 'T23:59:59') : new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const periodStart = start_date ? new Date(start_date) : new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 1);

    // Get revenue for this restaurant in the period
    const revenueResult = await Order.findOne({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue']
      ],
      where: {
        restaurant_id,
        status: 'completed',
        order_date: { [Op.between]: [periodStart, periodEnd] },
        is_deleted: false
      },
      raw: true
    });

    const revenue = parseFloat(revenueResult?.revenue || 0);
    const charges = calculatePlanCharges(plan, revenue);

    res.json({
      success: true,
      data: {
        plan_id: plan.id,
        plan_name: plan.name,
        restaurant_id: parseInt(restaurant_id),
        period: {
          start: periodStart.toISOString().split('T')[0],
          end: periodEnd.toISOString().split('T')[0]
        },
        revenue,
        ...charges
      }
    });
  } catch (error) {
    console.error('Error generating invoice preview:', error);
    res.status(500).json({ success: false, message: 'Failed to generate preview' });
  }
});

// POST /api/brands/:id/generate-invoices - Manually trigger invoice generation for brand plans
router.post('/:id/generate-invoices', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { plan_id, billing_period_start, billing_period_end } = req.body;

    // Get active plans for this brand
    const planWhere = { entity_type: 'brand', entity_id: id, is_active: true, auto_generate: true };
    if (plan_id) planWhere.id = plan_id;

    const plans = await EntityPlan.findAll({
      where: planWhere,
      include: [{
        model: EntityPlanRestaurant,
        as: 'planRestaurants',
        where: { is_active: true },
        include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'email'] }]
      }, {
        model: EntityPlanPrice,
        as: 'prices'
      }]
    });

    if (plans.length === 0) {
      return res.json({ success: true, message: 'No active plans with assigned restaurants', generated: 0 });
    }

    // Calculate billing period (default: previous month)
    const now = new Date();
    const periodEnd = billing_period_end
      ? new Date(billing_period_end + 'T23:59:59')
      : new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const periodStart = billing_period_start
      ? new Date(billing_period_start)
      : new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 1);
    const dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14); // 14 days from now

    let generated = 0;
    let skipped = 0;
    const results = [];

    // Validate payment methods exist for each plan's currency
    const { hasPaymentMethodForCurrency } = require('../utils/paymentSettingsHelper');
    const brandPaymentSettings = access.brand.payment_settings || {};

    for (const plan of plans) {
      const planCurrency = plan.currency || 'MYR';
      if (!hasPaymentMethodForCurrency(brandPaymentSettings, planCurrency)) {
        for (const pr of plan.planRestaurants) {
          skipped++;
          results.push({
            restaurant: pr.restaurant?.name || 'Unknown',
            status: 'skipped',
            reason: `No payment methods configured for ${planCurrency}. Please set up payment settings first.`
          });
        }
        continue;
      }

      for (const pr of plan.planRestaurants) {
        const restaurant = pr.restaurant;
        if (!restaurant) continue;

        // Check for duplicate
        const existing = await Invoice.findOne({
          where: {
            restaurant_id: restaurant.id,
            issuer_type: 'brand',
            issuer_id: parseInt(id),
            billing_period_start: periodStart,
            type: 'automatic'
          }
        });

        if (existing) {
          skipped++;
          results.push({ restaurant: restaurant.name, status: 'skipped', reason: 'Invoice already exists' });
          continue;
        }

        // Get revenue
        const revenueResult = await Order.findOne({
          attributes: [[sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue']],
          where: {
            restaurant_id: restaurant.id,
            status: 'completed',
            order_date: { [Op.between]: [periodStart, periodEnd] },
            is_deleted: false
          },
          raw: true
        });
        const revenue = parseFloat(revenueResult?.revenue || 0);

        // Calculate charges
        const charges = calculatePlanCharges(plan, revenue);

        if (charges.totalAmount <= 0) {
          skipped++;
          results.push({ restaurant: restaurant.name, status: 'skipped', reason: 'Zero amount' });
          continue;
        }

        // Generate invoice number
        const invoiceNumber = await generateBrandInvoiceNumber(id);

        // Create invoice
        const invoice = await Invoice.create({
          restaurant_id: restaurant.id,
          invoice_number: invoiceNumber,
          type: 'automatic',
          invoice_category: 'brand_plan',
          category_display_name: plan.name,
          billing_period_start: periodStart,
          billing_period_end: periodEnd,
          due_date: dueDate,
          total_amount: charges.totalAmount,
          currency: plan.currency || 'MYR',
          status: 'pending_payment',
          notes: `Auto-generated invoice for ${plan.name}. Billing period: ${periodStart.toISOString().split('T')[0]} ~ ${periodEnd.toISOString().split('T')[0]}`,
          issued_by: req.user.id,
          issued_at: now,
          issuer_type: 'brand',
          issuer_id: parseInt(id),
          payer_type: 'restaurant',
          payer_id: null
        });

        // Create invoice items
        const invoiceItems = charges.items.map(item => ({
          ...item,
          invoice_id: invoice.id
        }));
        await InvoiceItem.bulkCreate(invoiceItems);

        generated++;
        results.push({
          restaurant: restaurant.name,
          status: 'generated',
          invoice_number: invoiceNumber,
          amount: charges.totalAmount,
          revenue
        });
      }
    }

    res.json({
      success: true,
      data: {
        generated,
        skipped,
        total: generated + skipped,
        period: { start: periodStart.toISOString().split('T')[0], end: periodEnd.toISOString().split('T')[0] },
        results
      }
    });
  } catch (error) {
    console.error('Error generating brand invoices:', error);
    res.status(500).json({ success: false, message: 'Failed to generate invoices' });
  }
});

// GET /api/brands/:id/subscriptions - Get subscription status for brand restaurants
router.get('/:id/subscriptions', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyBrandAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    // Get all restaurants with their plan assignments
    const restaurants = await Restaurant.findAll({
      where: { brand_id: id },
      attributes: ['id', 'name', 'email', 'status', 'phone', 'address'],
      include: [{
        model: EntityPlanRestaurant,
        as: 'entityPlanRestaurants',
        required: false,
        include: [{
          model: EntityPlan,
          as: 'plan',
          where: { entity_type: 'brand', entity_id: id },
          required: false,
          include: [{ model: EntityPlanPrice, as: 'prices' }]
        }]
      }]
    });

    // Get latest invoices per restaurant (brand-issued)
    const restaurantIds = restaurants.map(r => r.id);
    let latestInvoices = [];
    if (restaurantIds.length > 0) {
      latestInvoices = await Invoice.findAll({
        where: {
          restaurant_id: { [Op.in]: restaurantIds },
          issuer_type: 'brand',
          issuer_id: parseInt(id)
        },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'restaurant_id', 'invoice_number', 'total_amount', 'status', 'billing_period_start', 'billing_period_end', 'due_date', 'createdAt']
      });
    }

    // Get current month revenue per restaurant
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    let revenueData = [];
    if (restaurantIds.length > 0) {
      revenueData = await Order.findAll({
        attributes: [
          'restaurant_id',
          [sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'order_count']
        ],
        where: {
          restaurant_id: { [Op.in]: restaurantIds },
          status: 'completed',
          order_date: { [Op.between]: [monthStart, monthEnd] },
          is_deleted: false
        },
        group: ['restaurant_id'],
        raw: true
      });
    }

    const revenueMap = {};
    revenueData.forEach(r => {
      revenueMap[r.restaurant_id] = { revenue: parseFloat(r.revenue || 0), order_count: parseInt(r.order_count || 0) };
    });

    // Build invoice map (latest per restaurant)
    const invoiceMap = {};
    latestInvoices.forEach(inv => {
      if (!invoiceMap[inv.restaurant_id]) {
        invoiceMap[inv.restaurant_id] = inv;
      }
    });

    // Build response
    const data = restaurants.map(r => {
      const activePlan = r.entityPlanRestaurants?.find(epr => epr.is_active && epr.plan);
      const latestInvoice = invoiceMap[r.id];
      const monthRevenue = revenueMap[r.id]?.revenue || 0;
      const monthOrders = revenueMap[r.id]?.order_count || 0;

      // Calculate estimated charges if plan exists
      let estimatedCharges = null;
      if (activePlan?.plan) {
        estimatedCharges = calculatePlanCharges(activePlan.plan, monthRevenue);
      }

      return {
        restaurant_id: r.id,
        restaurant_name: r.name,
        restaurant_email: r.email,
        restaurant_status: r.status,
        plan: activePlan ? {
          id: activePlan.plan.id,
          name: activePlan.plan.name,
          charge_type: activePlan.plan.charge_type,
          percentage_value: activePlan.plan.percentage_value,
          revenue_base: activePlan.plan.revenue_base,
          billing_day: activePlan.plan.billing_day,
          auto_generate: activePlan.plan.auto_generate,
          activation_date: activePlan.activation_date,
          discount_type: activePlan.discount_type || 'none',
          discount_value: parseFloat(activePlan.discount_value) || 0,
          discount_reason: activePlan.discount_reason || null
        } : null,
        latest_invoice: latestInvoice ? {
          id: latestInvoice.id,
          invoice_number: latestInvoice.invoice_number,
          total_amount: latestInvoice.total_amount,
          status: latestInvoice.status,
          billing_period_start: latestInvoice.billing_period_start,
          billing_period_end: latestInvoice.billing_period_end,
          due_date: latestInvoice.due_date
        } : null,
        current_month: {
          revenue: monthRevenue,
          order_count: monthOrders,
          estimated_charges: estimatedCharges
        }
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching brand subscriptions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscriptions' });
  }
});

// Brand Sales Trend API - 대시보드 차트용
router.get('/:id/sales-trend', authenticateToken, requireRole('Brand General', 'Brand Manager', 'System Admin'), async (req, res) => {
  try {
    const brandId = req.params.id;
    const { period = 'month' } = req.query;

    // 브랜드 접근 권한 확인
    const brand = await Brand.findByPk(brandId);
    if (!brand) return res.status(404).json({ success: false, message: 'Brand not found' });
    if (req.user.role === 'Brand General' && brand.owner_id !== req.user.id && req.user.brand_id !== brand.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // 브랜드 소속 레스토랑 ID 조회
    const restaurants = await Restaurant.findAll({
      where: { brand_id: brandId },
      attributes: ['id']
    });
    const restaurantIds = restaurants.map(r => r.id);

    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: [] });
    }

    // 기간 계산
    const now = new Date();
    let startDate = new Date();
    let groupBy = '';
    let dateFormat = '';

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        groupBy = 'DATE(order_date)';
        dateFormat = 'DATE_FORMAT(order_date, "%m/%d")';
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        groupBy = 'MONTH(order_date)';
        dateFormat = 'DATE_FORMAT(order_date, "%Y-%m")';
        break;
      case 'month':
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        groupBy = 'DATE(order_date)';
        dateFormat = 'DATE_FORMAT(order_date, "%m/%d")';
        break;
    }

    const sequelize = require('sequelize');
    const trendData = await Order.findAll({
      where: {
        restaurant_id: restaurantIds,
        order_date: { [Op.between]: [startDate, now] },
        status: { [Op.notIn]: ['cancelled', 'refunded'] }
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'sales'],
        [sequelize.fn('COUNT', sequelize.col('*')), 'orders'],
        [sequelize.literal(dateFormat), 'date']
      ],
      group: [sequelize.literal(dateFormat)],
      order: [sequelize.literal(dateFormat)]
    });

    res.json({
      success: true,
      data: trendData.map(item => ({
        date: item.dataValues.date,
        sales: parseFloat(item.dataValues.sales || 0),
        orders: parseInt(item.dataValues.orders || 0)
      }))
    });
  } catch (error) {
    console.error('Error fetching brand sales trend:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch sales trend' });
  }
});

/**
 * Generate invoice number for brand: INV-BR{brandId}YYMMDDNNN
 */
async function generateBrandInvoiceNumber(brandId) {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const prefix = `INV-BR${brandId}${year}${month}${day}`;

  const lastInvoice = await Invoice.findOne({
    where: { invoice_number: { [Op.like]: `${prefix}%` } },
    order: [['invoice_number', 'DESC']],
    attributes: ['invoice_number']
  });

  let nextNumber = 1;
  if (lastInvoice?.invoice_number) {
    const match = lastInvoice.invoice_number.match(/(\d{3})$/);
    if (match) nextNumber = parseInt(match[1], 10) + 1;
  }

  return `${prefix}${String(nextNumber).padStart(3, '0')}`;
}

module.exports = router;
