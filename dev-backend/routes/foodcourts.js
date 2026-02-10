const express = require('express');
const router = express.Router();
const { Foodcourt, Restaurant, User, EntityPlan, EntityPlanRestaurant, Order, Invoice, InvoiceItem } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');

// Get all foodcourts (filtered by owner for Foodcourt General)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/foodcourts - User: ${req.user.email} (${req.user.role})`);

    const whereClause = {};

    // Foodcourt General/Foodcourt Manager only see their own foodcourts
    if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
      whereClause.owner_id = req.user.id;
      console.log(`🔐 Filtering foodcourts for ${req.user.role}: owner_id = ${req.user.id}`);
    } else if (req.user.role === 'System Admin') {
      console.log(`👑 System Admin: Returning all foodcourts`);
    } else {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const foodcourts = await Foodcourt.findAll({
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

    console.log(`📊 Found ${foodcourts.length} foodcourts`);
    res.json(foodcourts);
  } catch (error) {
    console.error('Error fetching foodcourts:', error);
    res.status(500).json({ error: 'Failed to fetch foodcourts' });
  }
});

// Get company info for foodcourt owner (MUST be before /:id to avoid route conflict)
router.get('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 GET /api/foodcourts/company-info - User: ${req.user.email} (${req.user.role})`);

    if (req.user.role !== 'Foodcourt General' && req.user.role !== 'Foodcourt Manager') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const foodcourt = await Foodcourt.findOne({
      where: { owner_id: req.user.id }
    });

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    res.json({
      company_name: foodcourt.company_name || foodcourt.name,
      registration_no: foodcourt.registration_no,
      trade_name: foodcourt.trade_name,
      address: foodcourt.address,
      city: foodcourt.city,
      state: foodcourt.state,
      postal_code: foodcourt.postal_code,
      country: foodcourt.country || 'MY',
      phone: foodcourt.phone,
      email: foodcourt.email,
      website: foodcourt.website,
      tax_no: foodcourt.tax_no,
      bank_name: foodcourt.bank_name,
      bank_account: foodcourt.bank_account,
      bank_account_name: foodcourt.bank_account_name,
      logo_url: foodcourt.logo_url,
      operation_settings: foodcourt.operation_settings
    });
  } catch (error) {
    console.error('Error fetching foodcourt company info:', error);
    res.status(500).json({ error: 'Failed to fetch company info' });
  }
});

// Update company info for foodcourt owner (MUST be before /:id)
router.put('/company-info', authenticateToken, async (req, res) => {
  try {
    console.log(`🏢 PUT /api/foodcourts/company-info - User: ${req.user.email}`);

    if (req.user.role !== 'Foodcourt General' && req.user.role !== 'Foodcourt Manager') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const foodcourt = await Foodcourt.findOne({
      where: { owner_id: req.user.id }
    });

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
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
      bank_name: req.body.bank_name,
      bank_account: req.body.bank_account,
      bank_account_name: req.body.bank_account_name,
      logo_url: req.body.logo_url,
      operation_settings: req.body.operation_settings
    };

    await foodcourt.update(updateData);
    console.log(`✅ Foodcourt company info updated: ${foodcourt.name}`);

    res.json({ success: true, message: 'Company info updated successfully' });
  } catch (error) {
    console.error('Error updating foodcourt company info:', error);
    res.status(500).json({ error: 'Failed to update company info' });
  }
});

// Get single foodcourt by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 GET /api/foodcourts/${id} - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id, {
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

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    res.json(foodcourt);
  } catch (error) {
    console.error('Error fetching foodcourt:', error);
    res.status(500).json({ error: 'Failed to fetch foodcourt' });
  }
});

// Create new foodcourt
router.post('/', authenticateToken, requireRole('Foodcourt General', 'System Admin'), async (req, res) => {
  try {
    console.log(`🆕 POST /api/foodcourts - User: ${req.user.email}`);
    console.log('📝 Foodcourt data:', req.body);

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    // Set owner_id to current user if Foodcourt General
    const owner_id = req.user.role === 'Foodcourt General' ? req.user.id : req.body.owner_id;

    const foodcourt = await Foodcourt.create({
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

    console.log(`✅ Foodcourt created: ${foodcourt.name} (ID: ${foodcourt.id})`);

    // Fetch with associations
    const createdFoodcourt = await Foodcourt.findByPk(foodcourt.id, {
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'full_name', 'email', 'role']
        }
      ]
    });

    res.status(201).json(createdFoodcourt);
  } catch (error) {
    console.error('Error creating foodcourt:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Foodcourt code already exists' });
    }

    res.status(500).json({ error: 'Failed to create foodcourt' });
  }
});

// Update foodcourt
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📝 PUT /api/foodcourts/${id} - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    const { name, code, description, logo_url, email, phone, address, website, status, currency } = req.body;

    await foodcourt.update({
      name: name || foodcourt.name,
      code: code || foodcourt.code,
      description,
      logo_url,
      email,
      phone,
      address,
      website,
      currency: currency || foodcourt.currency,
      status: status || foodcourt.status
    });

    console.log(`✅ Foodcourt updated: ${foodcourt.name}`);

    // Fetch with associations
    const updatedFoodcourt = await Foodcourt.findByPk(id, {
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

    res.json(updatedFoodcourt);
  } catch (error) {
    console.error('Error updating foodcourt:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Foodcourt code already exists' });
    }

    res.status(500).json({ error: 'Failed to update foodcourt' });
  }
});

// Get restaurants for a foodcourt
router.get('/:id/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🏪 GET /api/foodcourts/${id}/restaurants - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    const restaurants = await Restaurant.findAll({
      where: { foodcourt_id: id },
      attributes: ['id', 'name', 'status', 'address', 'phone'],
      order: [['name', 'ASC']]
    });

    res.json({ success: true, data: restaurants });
  } catch (error) {
    console.error('Error fetching foodcourt restaurants:', error);
    res.status(500).json({ error: 'Failed to fetch foodcourt restaurants' });
  }
});

// Delete foodcourt
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ DELETE /api/foodcourts/${id} - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurants'
      }]
    });

    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    // Check if foodcourt has restaurants
    if (foodcourt.restaurants && foodcourt.restaurants.length > 0) {
      return res.status(400).json({
        error: `Cannot delete foodcourt with ${foodcourt.restaurants.length} restaurant(s). Please remove or reassign restaurants first.`
      });
    }

    await foodcourt.destroy();
    console.log(`✅ Foodcourt deleted: ${foodcourt.name}`);

    res.json({ message: 'Foodcourt deleted successfully' });
  } catch (error) {
    console.error('Error deleting foodcourt:', error);
    res.status(500).json({ error: 'Failed to delete foodcourt' });
  }
});

// ============================================
// Payment Settings APIs (B2B Invoice Payment)
// ============================================

// Get payment settings for a foodcourt
router.get('/:id/payment-settings', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`💳 GET /api/foodcourts/${id}/payment-settings - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    res.json({
      success: true,
      data: {
        payment_settings: foodcourt.payment_settings,
        invoice_settings: foodcourt.invoice_settings,
        supported_currencies: foodcourt.supported_currencies
      }
    });
  } catch (error) {
    console.error('Error fetching foodcourt payment settings:', error);
    res.status(500).json({ error: 'Failed to fetch payment settings' });
  }
});

// Update payment settings for a foodcourt
router.put('/:id/payment-settings', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`💳 PUT /api/foodcourts/${id}/payment-settings - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions (Foodcourt General only or System Admin)
    if (req.user.role !== 'System Admin' &&
        (req.user.role !== 'Foodcourt General' || foodcourt.owner_id !== req.user.id)) {
      return res.status(403).json({ error: 'Access denied. Only Foodcourt General or System Admin can update payment settings.' });
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
        qrPayment: payment_settings.qrPayment || {}
      };
      foodcourt.payment_settings = validPaymentSettings;
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
      foodcourt.invoice_settings = validInvoiceSettings;
    }

    // Update supported currencies if provided
    if (supported_currencies && Array.isArray(supported_currencies)) {
      foodcourt.supported_currencies = supported_currencies;
    }

    await foodcourt.save();
    console.log(`✅ Foodcourt payment settings updated: ${foodcourt.name}`);

    res.json({
      success: true,
      message: 'Payment settings updated successfully',
      data: {
        payment_settings: foodcourt.payment_settings,
        invoice_settings: foodcourt.invoice_settings,
        supported_currencies: foodcourt.supported_currencies
      }
    });
  } catch (error) {
    console.error('Error updating foodcourt payment settings:', error);
    res.status(500).json({ error: 'Failed to update payment settings' });
  }
});

// Get subscription info for a foodcourt (System Admin can set, Foodcourt General can view)
router.get('/:id/subscription', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📋 GET /api/foodcourts/${id}/subscription - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Check access permissions
    if (req.user.role !== 'System Admin' && foodcourt.owner_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied to this foodcourt' });
    }

    res.json({
      success: true,
      data: {
        subscription_status: foodcourt.subscription_status,
        subscription_start: foodcourt.subscription_start,
        subscription_end: foodcourt.subscription_end,
        plan_type: foodcourt.plan_type
      }
    });
  } catch (error) {
    console.error('Error fetching foodcourt subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription info' });
  }
});

// Update subscription info for a foodcourt (System Admin only)
router.put('/:id/subscription', authenticateToken, requireRole('System Admin'), async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`📋 PUT /api/foodcourts/${id}/subscription - User: ${req.user.email}`);

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    const { subscription_status, subscription_start, subscription_end, plan_type } = req.body;

    if (subscription_status) {
      foodcourt.subscription_status = subscription_status;
    }
    if (subscription_start !== undefined) {
      foodcourt.subscription_start = subscription_start;
    }
    if (subscription_end !== undefined) {
      foodcourt.subscription_end = subscription_end;
    }
    if (plan_type !== undefined) {
      foodcourt.plan_type = plan_type;
    }

    await foodcourt.save();
    console.log(`✅ Foodcourt subscription updated: ${foodcourt.name}`);

    res.json({
      success: true,
      message: 'Subscription info updated successfully',
      data: {
        subscription_status: foodcourt.subscription_status,
        subscription_start: foodcourt.subscription_start,
        subscription_end: foodcourt.subscription_end,
        plan_type: foodcourt.plan_type
      }
    });
  } catch (error) {
    console.error('Error updating foodcourt subscription:', error);
    res.status(500).json({ error: 'Failed to update subscription info' });
  }
});

// ============================================
// Foodcourt Plans CRUD & Revenue/Invoice APIs
// ============================================

/**
 * Verify foodcourt access for the current user
 */
async function verifyFoodcourtAccess(req, foodcourtId) {
  const foodcourt = await Foodcourt.findByPk(foodcourtId);
  if (!foodcourt) return { error: 'Foodcourt not found', status: 404 };
  if (req.user.role === 'System Admin') return { foodcourt };
  if (foodcourt.owner_id === req.user.id) return { foodcourt };
  if (req.user.foodcourt_id === parseInt(foodcourtId)) return { foodcourt };
  return { error: 'Access denied', status: 403 };
}

/**
 * Calculate charges based on entity plan and revenue (shared with brands)
 */
function calculatePlanCharges(plan, revenue) {
  const items = [];
  let subtotal = 0;
  const taxRate = parseFloat(plan.tax_rate || 0) / 100;

  if (parseFloat(plan.subscription_fee) > 0) {
    const fee = parseFloat(plan.subscription_fee);
    const tax = fee * taxRate;
    items.push({
      item_type: 'subscription_fee',
      description: `${plan.name} - Management Fee`,
      calculation_method: 'fixed',
      fixed_amount: fee,
      calculated_amount: fee,
      tax_rate: parseFloat(plan.tax_rate || 0),
      tax_amount: Math.round(tax * 100) / 100,
      total_amount: Math.round((fee + tax) * 100) / 100
    });
    subtotal += fee;
  }

  if (parseFloat(plan.revenue_percentage) > 0) {
    const rate = parseFloat(plan.revenue_percentage);
    const amount = Math.round(revenue * rate / 100 * 100) / 100;
    const tax = amount * taxRate;
    items.push({
      item_type: 'revenue_percentage',
      description: `${plan.name} - Revenue Share (${rate}% of ${plan.currency} ${revenue.toLocaleString()})`,
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

  if (plan.rent_type !== 'none') {
    let rentAmount = 0;
    let description = '';
    let calcMethod = 'fixed';

    if (plan.rent_type === 'fixed') {
      rentAmount = parseFloat(plan.rent_fixed || 0);
      description = `${plan.name} - Rent (Fixed)`;
    } else if (plan.rent_type === 'percentage') {
      const rate = parseFloat(plan.rent_percentage || 0);
      rentAmount = Math.round(revenue * rate / 100 * 100) / 100;
      description = `${plan.name} - Rent (${rate}% of ${plan.currency} ${revenue.toLocaleString()})`;
      calcMethod = 'percentage';
    } else if (plan.rent_type === 'combined') {
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

// --- Foodcourt Plans CRUD ---

// GET /api/foodcourts/:id/plans - List all plans for a foodcourt
router.get('/:id/plans', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plans = await EntityPlan.findAll({
      where: { entity_type: 'foodcourt', entity_id: id },
      include: [{ model: EntityPlanRestaurant, as: 'planRestaurants', required: false }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error fetching foodcourt plans:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plans' });
  }
});

// GET /api/foodcourts/:id/plans/:planId - Get single plan detail
router.get('/:id/plans/:planId', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'foodcourt', entity_id: id },
      include: [{
        model: EntityPlanRestaurant, as: 'planRestaurants',
        include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'status', 'email'] }]
      }]
    });

    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });
    res.json({ success: true, data: plan });
  } catch (error) {
    console.error('Error fetching foodcourt plan:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plan' });
  }
});

// POST /api/foodcourts/:id/plans - Create new plan
router.post('/:id/plans', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.create({
      entity_type: 'foodcourt',
      entity_id: id,
      name: req.body.name,
      description: req.body.description,
      subscription_fee: req.body.subscription_fee || 0,
      revenue_percentage: req.body.revenue_percentage || 0,
      rent_type: req.body.rent_type || 'none',
      rent_fixed: req.body.rent_fixed || 0,
      rent_percentage: req.body.rent_percentage || 0,
      billing_cycle: req.body.billing_cycle || 'monthly',
      auto_generate: req.body.auto_generate !== false,
      tax_rate: req.body.tax_rate || 0,
      currency: req.body.currency || 'MYR',
      is_active: true,
      created_by: req.user.id
    });

    res.status(201).json({ success: true, data: plan });
  } catch (error) {
    console.error('Error creating foodcourt plan:', error);
    res.status(500).json({ success: false, message: 'Failed to create plan' });
  }
});

// PUT /api/foodcourts/:id/plans/:planId - Update plan
router.put('/:id/plans/:planId', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({ where: { id: planId, entity_type: 'foodcourt', entity_id: id } });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    await plan.update({
      name: req.body.name ?? plan.name,
      description: req.body.description ?? plan.description,
      subscription_fee: req.body.subscription_fee ?? plan.subscription_fee,
      revenue_percentage: req.body.revenue_percentage ?? plan.revenue_percentage,
      rent_type: req.body.rent_type ?? plan.rent_type,
      rent_fixed: req.body.rent_fixed ?? plan.rent_fixed,
      rent_percentage: req.body.rent_percentage ?? plan.rent_percentage,
      billing_cycle: req.body.billing_cycle ?? plan.billing_cycle,
      auto_generate: req.body.auto_generate ?? plan.auto_generate,
      tax_rate: req.body.tax_rate ?? plan.tax_rate,
      currency: req.body.currency ?? plan.currency,
      is_active: req.body.is_active ?? plan.is_active
    });

    res.json({ success: true, data: plan });
  } catch (error) {
    console.error('Error updating foodcourt plan:', error);
    res.status(500).json({ success: false, message: 'Failed to update plan' });
  }
});

// DELETE /api/foodcourts/:id/plans/:planId - Delete plan
router.delete('/:id/plans/:planId', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'foodcourt', entity_id: id },
      include: [{ model: EntityPlanRestaurant, as: 'planRestaurants', where: { is_active: true }, required: false }]
    });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    if (plan.planRestaurants && plan.planRestaurants.length > 0) {
      return res.status(400).json({ success: false, message: `Cannot delete plan with ${plan.planRestaurants.length} active restaurant(s). Unassign them first.` });
    }

    await plan.destroy();
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting foodcourt plan:', error);
    res.status(500).json({ success: false, message: 'Failed to delete plan' });
  }
});

// --- Plan ↔ Restaurant Assignment ---

// GET /api/foodcourts/:id/plans/:planId/restaurants
router.get('/:id/plans/:planId/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const assignments = await EntityPlanRestaurant.findAll({
      where: { entity_plan_id: planId },
      include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'status', 'email'] }]
    });

    res.json({ success: true, data: assignments });
  } catch (error) {
    console.error('Error fetching plan restaurants:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch restaurants' });
  }
});

// POST /api/foodcourts/:id/plans/:planId/restaurants - Assign restaurants
router.post('/:id/plans/:planId/restaurants', authenticateToken, async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { restaurant_ids } = req.body;
    if (!restaurant_ids || !Array.isArray(restaurant_ids) || restaurant_ids.length === 0) {
      return res.status(400).json({ success: false, message: 'restaurant_ids array is required' });
    }

    const results = [];
    for (const restaurantId of restaurant_ids) {
      const [assignment, created] = await EntityPlanRestaurant.findOrCreate({
        where: { entity_plan_id: planId, restaurant_id: restaurantId },
        defaults: { is_active: true, activation_date: new Date() }
      });
      if (!created && !assignment.is_active) {
        await assignment.update({ is_active: true, activation_date: new Date() });
        results.push({ restaurant_id: restaurantId, status: 'reactivated' });
      } else if (created) {
        results.push({ restaurant_id: restaurantId, status: 'assigned' });
      } else {
        results.push({ restaurant_id: restaurantId, status: 'already_assigned' });
      }
    }

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error assigning restaurants to plan:', error);
    res.status(500).json({ success: false, message: 'Failed to assign restaurants' });
  }
});

// DELETE /api/foodcourts/:id/plans/:planId/restaurants/:restaurantId - Unassign
router.delete('/:id/plans/:planId/restaurants/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const { id, planId, restaurantId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const assignment = await EntityPlanRestaurant.findOne({
      where: { entity_plan_id: planId, restaurant_id: restaurantId }
    });
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });

    await assignment.update({ is_active: false });
    res.json({ success: true, message: 'Restaurant unassigned from plan' });
  } catch (error) {
    console.error('Error unassigning restaurant:', error);
    res.status(500).json({ success: false, message: 'Failed to unassign restaurant' });
  }
});

// --- Revenue & Invoice APIs ---

// GET /api/foodcourts/:id/revenue - Revenue summary for foodcourt restaurants
router.get('/:id/revenue', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { start_date, end_date, restaurant_id } = req.query;
    if (!start_date || !end_date) {
      return res.status(400).json({ success: false, message: 'start_date and end_date are required' });
    }

    const restaurantWhere = { foodcourt_id: id };
    if (restaurant_id) restaurantWhere.id = restaurant_id;

    const restaurants = await Restaurant.findAll({ where: restaurantWhere, attributes: ['id', 'name'] });
    const restaurantIds = restaurants.map(r => r.id);
    if (restaurantIds.length === 0) {
      return res.json({ success: true, data: { total_revenue: 0, restaurants: [] } });
    }

    const revenueData = await Order.findAll({
      attributes: [
        'restaurant_id',
        [sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'order_count']
      ],
      where: {
        restaurant_id: { [Op.in]: restaurantIds },
        status: 'completed',
        order_date: { [Op.between]: [new Date(start_date), new Date(end_date + 'T23:59:59')] },
        is_deleted: false
      },
      group: ['restaurant_id'],
      raw: true
    });

    const revenueMap = {};
    revenueData.forEach(r => { revenueMap[r.restaurant_id] = { revenue: parseFloat(r.revenue || 0), order_count: parseInt(r.order_count || 0) }; });

    const result = restaurants.map(r => ({
      restaurant_id: r.id, restaurant_name: r.name,
      revenue: revenueMap[r.id]?.revenue || 0, order_count: revenueMap[r.id]?.order_count || 0
    }));

    res.json({ success: true, data: { period: { start_date, end_date }, total_revenue: result.reduce((sum, r) => sum + r.revenue, 0), restaurants: result } });
  } catch (error) {
    console.error('Error fetching revenue:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch revenue data' });
  }
});

// GET /api/foodcourts/:id/invoice-preview - Preview invoice charges
router.get('/:id/invoice-preview', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { plan_id, restaurant_id } = req.query;
    if (!plan_id || !restaurant_id) {
      return res.status(400).json({ success: false, message: 'plan_id and restaurant_id are required' });
    }

    const plan = await EntityPlan.findOne({ where: { id: plan_id, entity_type: 'foodcourt', entity_id: id } });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const now = new Date();
    const periodEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const periodStart = new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 1);

    const revenueResult = await Order.findOne({
      attributes: [[sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue']],
      where: { restaurant_id, status: 'completed', order_date: { [Op.between]: [periodStart, periodEnd] }, is_deleted: false },
      raw: true
    });

    const revenue = parseFloat(revenueResult?.revenue || 0);
    const charges = calculatePlanCharges(plan, revenue);

    res.json({ success: true, data: { plan_id: plan.id, plan_name: plan.name, restaurant_id: parseInt(restaurant_id), period: { start: periodStart.toISOString().split('T')[0], end: periodEnd.toISOString().split('T')[0] }, revenue, ...charges } });
  } catch (error) {
    console.error('Error generating invoice preview:', error);
    res.status(500).json({ success: false, message: 'Failed to generate preview' });
  }
});

// POST /api/foodcourts/:id/generate-invoices - Generate invoices for foodcourt plans
router.post('/:id/generate-invoices', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const { plan_id, billing_period_start, billing_period_end } = req.body;

    const planWhere = { entity_type: 'foodcourt', entity_id: id, is_active: true, auto_generate: true };
    if (plan_id) planWhere.id = plan_id;

    const plans = await EntityPlan.findAll({
      where: planWhere,
      include: [{
        model: EntityPlanRestaurant, as: 'planRestaurants', where: { is_active: true },
        include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'email'] }]
      }]
    });

    if (plans.length === 0) {
      return res.json({ success: true, message: 'No active plans with assigned restaurants', generated: 0 });
    }

    const now = new Date();
    const periodEnd = billing_period_end ? new Date(billing_period_end + 'T23:59:59') : new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const periodStart = billing_period_start ? new Date(billing_period_start) : new Date(periodEnd.getFullYear(), periodEnd.getMonth(), 1);
    const dueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14);

    let generated = 0, skipped = 0;
    const results = [];

    for (const plan of plans) {
      for (const pr of plan.planRestaurants) {
        const restaurant = pr.restaurant;
        if (!restaurant) continue;

        const existing = await Invoice.findOne({
          where: { restaurant_id: restaurant.id, issuer_type: 'foodcourt', issuer_id: parseInt(id), billing_period_start: periodStart, type: 'automatic' }
        });
        if (existing) { skipped++; results.push({ restaurant: restaurant.name, status: 'skipped', reason: 'Invoice already exists' }); continue; }

        const revenueResult = await Order.findOne({
          attributes: [[sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue']],
          where: { restaurant_id: restaurant.id, status: 'completed', order_date: { [Op.between]: [periodStart, periodEnd] }, is_deleted: false },
          raw: true
        });
        const revenue = parseFloat(revenueResult?.revenue || 0);
        const charges = calculatePlanCharges(plan, revenue);

        if (charges.totalAmount <= 0) { skipped++; results.push({ restaurant: restaurant.name, status: 'skipped', reason: 'Zero amount' }); continue; }

        const invoiceNumber = await generateFoodcourtInvoiceNumber(id);

        const invoice = await Invoice.create({
          restaurant_id: restaurant.id, invoice_number: invoiceNumber, type: 'automatic',
          invoice_category: 'foodcourt_plan', category_display_name: plan.name,
          billing_period_start: periodStart, billing_period_end: periodEnd, due_date: dueDate,
          total_amount: charges.totalAmount, currency: plan.currency || 'MYR',
          status: 'pending_payment',
          notes: `Auto-generated invoice for ${plan.name}. Period: ${periodStart.toISOString().split('T')[0]} ~ ${periodEnd.toISOString().split('T')[0]}`,
          issued_by: req.user.id, issued_at: now,
          issuer_type: 'foodcourt', issuer_id: parseInt(id),
          payer_type: 'restaurant', payer_id: null
        });

        await InvoiceItem.bulkCreate(charges.items.map(item => ({ ...item, invoice_id: invoice.id })));
        generated++;
        results.push({ restaurant: restaurant.name, status: 'generated', invoice_number: invoiceNumber, amount: charges.totalAmount, revenue });
      }
    }

    res.json({ success: true, data: { generated, skipped, total: generated + skipped, period: { start: periodStart.toISOString().split('T')[0], end: periodEnd.toISOString().split('T')[0] }, results } });
  } catch (error) {
    console.error('Error generating foodcourt invoices:', error);
    res.status(500).json({ success: false, message: 'Failed to generate invoices' });
  }
});

// GET /api/foodcourts/:id/subscriptions - Subscription status for foodcourt restaurants
router.get('/:id/subscriptions', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const restaurants = await Restaurant.findAll({
      where: { foodcourt_id: id },
      attributes: ['id', 'name', 'email', 'status', 'phone', 'address'],
      include: [{
        model: EntityPlanRestaurant, as: 'entityPlanRestaurants', required: false,
        include: [{ model: EntityPlan, as: 'plan', where: { entity_type: 'foodcourt', entity_id: id }, required: false }]
      }]
    });

    const restaurantIds = restaurants.map(r => r.id);
    let latestInvoices = [];
    if (restaurantIds.length > 0) {
      latestInvoices = await Invoice.findAll({
        where: { restaurant_id: { [Op.in]: restaurantIds }, issuer_type: 'foodcourt', issuer_id: parseInt(id) },
        order: [['createdAt', 'DESC']],
        attributes: ['id', 'restaurant_id', 'invoice_number', 'total_amount', 'status', 'billing_period_start', 'billing_period_end', 'due_date', 'createdAt']
      });
    }

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    let revenueData = [];
    if (restaurantIds.length > 0) {
      revenueData = await Order.findAll({
        attributes: ['restaurant_id', [sequelize.fn('SUM', sequelize.col('total_amount')), 'revenue'], [sequelize.fn('COUNT', sequelize.col('id')), 'order_count']],
        where: { restaurant_id: { [Op.in]: restaurantIds }, status: 'completed', order_date: { [Op.between]: [monthStart, monthEnd] }, is_deleted: false },
        group: ['restaurant_id'], raw: true
      });
    }

    const revenueMap = {};
    revenueData.forEach(r => { revenueMap[r.restaurant_id] = { revenue: parseFloat(r.revenue || 0), order_count: parseInt(r.order_count || 0) }; });

    const invoiceMap = {};
    latestInvoices.forEach(inv => { if (!invoiceMap[inv.restaurant_id]) invoiceMap[inv.restaurant_id] = inv; });

    const data = restaurants.map(r => {
      const activePlan = r.entityPlanRestaurants?.find(epr => epr.is_active && epr.plan);
      const latestInvoice = invoiceMap[r.id];
      const monthRevenue = revenueMap[r.id]?.revenue || 0;
      const monthOrders = revenueMap[r.id]?.order_count || 0;
      let estimatedCharges = null;
      if (activePlan?.plan) estimatedCharges = calculatePlanCharges(activePlan.plan, monthRevenue);

      return {
        restaurant_id: r.id, restaurant_name: r.name, restaurant_email: r.email, restaurant_status: r.status,
        plan: activePlan ? {
          id: activePlan.plan.id, name: activePlan.plan.name,
          subscription_fee: activePlan.plan.subscription_fee, revenue_percentage: activePlan.plan.revenue_percentage,
          rent_type: activePlan.plan.rent_type, billing_cycle: activePlan.plan.billing_cycle,
          auto_generate: activePlan.plan.auto_generate, activation_date: activePlan.activation_date
        } : null,
        latest_invoice: latestInvoice ? {
          id: latestInvoice.id, invoice_number: latestInvoice.invoice_number, total_amount: latestInvoice.total_amount,
          status: latestInvoice.status, billing_period_start: latestInvoice.billing_period_start,
          billing_period_end: latestInvoice.billing_period_end, due_date: latestInvoice.due_date
        } : null,
        current_month: { revenue: monthRevenue, order_count: monthOrders, estimated_charges: estimatedCharges }
      };
    });

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching foodcourt subscriptions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscriptions' });
  }
});

async function generateFoodcourtInvoiceNumber(foodcourtId) {
  const now = new Date();
  const year = String(now.getFullYear()).slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const prefix = `INV-FC${foodcourtId}${year}${month}${day}`;

  const lastInvoice = await Invoice.findOne({
    where: { invoice_number: { [Op.like]: `${prefix}%` } },
    order: [['invoice_number', 'DESC']], attributes: ['invoice_number']
  });

  let nextNumber = 1;
  if (lastInvoice?.invoice_number) {
    const match = lastInvoice.invoice_number.match(/(\d{3})$/);
    if (match) nextNumber = parseInt(match[1], 10) + 1;
  }
  return `${prefix}${String(nextNumber).padStart(3, '0')}`;
}

module.exports = router;
