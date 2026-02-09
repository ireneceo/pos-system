const express = require('express');
const router = express.Router();
const { Brand, Restaurant, User, EntityPlan, EntityPlanRestaurant, Order, Invoice, InvoiceItem } = require('../models');
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

    // Update supported currencies if provided
    if (supported_currencies && Array.isArray(supported_currencies)) {
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
      subscription_fee, revenue_percentage,
      rent_type, rent_fixed, rent_percentage,
      billing_cycle, auto_generate, tax_rate, currency
    } = req.body;

    if (!name) return res.status(400).json({ success: false, message: 'Plan name is required' });

    const plan = await EntityPlan.create({
      entity_type: 'brand',
      entity_id: id,
      name,
      description: description || null,
      subscription_fee: subscription_fee || 0,
      revenue_percentage: revenue_percentage || 0,
      rent_type: rent_type || 'none',
      rent_fixed: rent_fixed || 0,
      rent_percentage: rent_percentage || 0,
      billing_cycle: billing_cycle || 'monthly',
      auto_generate: auto_generate !== undefined ? auto_generate : true,
      tax_rate: tax_rate || 0,
      currency: currency || access.brand.currency || 'MYR',
      created_by: req.user.id
    });

    res.status(201).json({ success: true, data: plan });
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
      subscription_fee, revenue_percentage,
      rent_type, rent_fixed, rent_percentage,
      billing_cycle, auto_generate, tax_rate, currency, is_active
    } = req.body;

    await plan.update({
      name: name !== undefined ? name : plan.name,
      description: description !== undefined ? description : plan.description,
      subscription_fee: subscription_fee !== undefined ? subscription_fee : plan.subscription_fee,
      revenue_percentage: revenue_percentage !== undefined ? revenue_percentage : plan.revenue_percentage,
      rent_type: rent_type !== undefined ? rent_type : plan.rent_type,
      rent_fixed: rent_fixed !== undefined ? rent_fixed : plan.rent_fixed,
      rent_percentage: rent_percentage !== undefined ? rent_percentage : plan.rent_percentage,
      billing_cycle: billing_cycle !== undefined ? billing_cycle : plan.billing_cycle,
      auto_generate: auto_generate !== undefined ? auto_generate : plan.auto_generate,
      tax_rate: tax_rate !== undefined ? tax_rate : plan.tax_rate,
      currency: currency !== undefined ? currency : plan.currency,
      is_active: is_active !== undefined ? is_active : plan.is_active
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

    // Remove all assignments then delete plan
    await EntityPlanRestaurant.destroy({ where: { entity_plan_id: planId } });
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
        // Deactivate any existing brand plan assignment for this restaurant
        await EntityPlanRestaurant.update(
          { is_active: false },
          {
            where: {
              restaurant_id: restaurantId,
              entity_plan_id: { [require('sequelize').Op.ne]: planId }
            },
            include: [{
              model: EntityPlan,
              as: 'plan',
              where: { entity_type: 'brand', entity_id: id }
            }]
          }
        ).catch(() => {
          // Fallback: direct query for complex update
        });

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

// ============================================
// Revenue & Invoice Calculation APIs
// ============================================

/**
 * Calculate charges based on entity plan and revenue
 * @param {object} plan - EntityPlan instance
 * @param {number} revenue - Total revenue for the billing period
 * @returns {object} { items: [], subtotal, taxAmount, totalAmount }
 */
function calculatePlanCharges(plan, revenue) {
  const items = [];
  let subtotal = 0;
  const taxRate = parseFloat(plan.tax_rate || 0) / 100;

  // 1. Fixed subscription fee
  if (parseFloat(plan.subscription_fee) > 0) {
    const fee = parseFloat(plan.subscription_fee);
    const tax = fee * taxRate;
    items.push({
      item_type: 'subscription_fee',
      description: `${plan.name} - Subscription Fee`,
      calculation_method: 'fixed',
      fixed_amount: fee,
      calculated_amount: fee,
      tax_rate: parseFloat(plan.tax_rate || 0),
      tax_amount: Math.round(tax * 100) / 100,
      total_amount: Math.round((fee + tax) * 100) / 100
    });
    subtotal += fee;
  }

  // 2. Revenue percentage (royalty)
  if (parseFloat(plan.revenue_percentage) > 0) {
    const rate = parseFloat(plan.revenue_percentage);
    const amount = Math.round(revenue * rate / 100 * 100) / 100;
    const tax = amount * taxRate;
    items.push({
      item_type: 'revenue_percentage',
      description: `${plan.name} - Revenue Royalty (${rate}% of ${plan.currency} ${revenue.toLocaleString()})`,
      calculation_method: 'percentage',
      percentage_rate: rate,
      base_amount: revenue,
      calculated_amount: amount,
      tax_rate: parseFloat(plan.tax_rate || 0),
      tax_amount: Math.round(tax * 100) / 100,
      total_amount: Math.round((amount + tax) * 100) / 100
    });
    subtotal += amount;
  }

  // 3. Rent based on rent_type
  if (plan.rent_type !== 'none') {
    let rentAmount = 0;
    let description = '';
    let calcMethod = 'fixed';

    if (plan.rent_type === 'fixed') {
      rentAmount = parseFloat(plan.rent_fixed || 0);
      description = `${plan.name} - Rent (Fixed)`;
      calcMethod = 'fixed';
    } else if (plan.rent_type === 'percentage') {
      const rate = parseFloat(plan.rent_percentage || 0);
      rentAmount = Math.round(revenue * rate / 100 * 100) / 100;
      description = `${plan.name} - Rent (${rate}% of ${plan.currency} ${revenue.toLocaleString()})`;
      calcMethod = 'percentage';
    } else if (plan.rent_type === 'combined') {
      // MAX(fixed minimum, revenue percentage)
      const fixedMin = parseFloat(plan.rent_fixed || 0);
      const rate = parseFloat(plan.rent_percentage || 0);
      const percentageAmount = Math.round(revenue * rate / 100 * 100) / 100;
      rentAmount = Math.max(fixedMin, percentageAmount);
      description = `${plan.name} - Rent (MAX: Fixed ${plan.currency} ${fixedMin.toLocaleString()} vs ${rate}% of ${plan.currency} ${revenue.toLocaleString()})`;
      calcMethod = 'combined';
    }

    if (rentAmount > 0) {
      const tax = rentAmount * taxRate;
      items.push({
        item_type: 'rent',
        description,
        calculation_method: calcMethod,
        fixed_amount: plan.rent_type === 'fixed' || plan.rent_type === 'combined' ? parseFloat(plan.rent_fixed || 0) : null,
        percentage_rate: plan.rent_type === 'percentage' || plan.rent_type === 'combined' ? parseFloat(plan.rent_percentage || 0) : null,
        base_amount: revenue,
        minimum_amount: plan.rent_type === 'combined' ? parseFloat(plan.rent_fixed || 0) : null,
        calculated_amount: rentAmount,
        tax_rate: parseFloat(plan.tax_rate || 0),
        tax_amount: Math.round(tax * 100) / 100,
        total_amount: Math.round((rentAmount + tax) * 100) / 100
      });
      subtotal += rentAmount;
    }
  }

  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
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
      where: { id: plan_id, entity_type: 'brand', entity_id: id }
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

    for (const plan of plans) {
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
          required: false
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
          subscription_fee: activePlan.plan.subscription_fee,
          revenue_percentage: activePlan.plan.revenue_percentage,
          rent_type: activePlan.plan.rent_type,
          billing_cycle: activePlan.plan.billing_cycle,
          auto_generate: activePlan.plan.auto_generate,
          activation_date: activePlan.activation_date
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
