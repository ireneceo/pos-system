const express = require('express');
const router = express.Router();
const { Foodcourt, Restaurant, User, EntityPlan, EntityPlanRestaurant, EntityPlanPrice, Order, Invoice, InvoiceItem } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { requireFoodcourtModule } = require('../middleware/requireModule');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const { deleteOldImages } = require('../utils/imageProcessor');

// foodcourt 자체 CRUD + tenancy-map + company-info + restaurants + payment-settings + staff + allowed-routes + tenancy-dashboard
// split from foodcourts.js (2026-05-03)


// Tenancy map — returns branches with lat/lng, units with status, tenant restaurants
router.get('/:id/tenancy-map', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { FoodcourtBranch, FoodcourtUnit, Contract } = require('../models');

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) return res.status(404).json({ success: false, message: 'Foodcourt not found' });

    const canAccess = req.user.role === 'System Admin'
      || foodcourt.owner_id === req.user.id
      || (['Foodcourt General', 'Foodcourt Manager'].includes(req.user.role) && Number(req.user.foodcourt_id) === Number(id));
    if (!canAccess) return res.status(403).json({ success: false, message: 'Access denied' });

    // Branch-scoped Foodcourt Manager: restrict to their branch
    const branchWhere = { foodcourt_id: id };
    if (req.user.role === 'Foodcourt Manager' && req.user.branch_id) {
      branchWhere.id = req.user.branch_id;
    }

    const branches = await FoodcourtBranch.findAll({
      where: branchWhere,
      attributes: ['id', 'name', 'code', 'status', 'address', 'city', 'state', 'country', 'phone', 'email', 'latitude', 'longitude', 'is_primary'],
      order: [['is_primary', 'DESC'], ['name', 'ASC']]
    });

    const branchIds = branches.map(b => b.id);
    const units = branchIds.length > 0 ? await FoodcourtUnit.findAll({
      where: { branch_id: { [Op.in]: branchIds } },
      attributes: ['id', 'branch_id', 'unit_number', 'status', 'current_contract_id', 'location_description', 'size_value', 'size_unit']
    }) : [];

    // Pick highest-priority contract per unit (same rule as Floor Plan API)
    const unitIds = units.map(u => u.id);
    const unitContracts = unitIds.length > 0 ? await Contract.findAll({
      where: { unit_id: { [Op.in]: unitIds }, stage: ['proposal', 'contracting', 'setup', 'active', 'expired'] },
      attributes: ['id', 'unit_id', 'stage', 'contract_type', 'applicant_company_name',
                   'start_date', 'end_date', 'renewal_alert_months', 'financial_terms', 'restaurant_id'],
      include: [{ model: Restaurant, as: 'restaurant',
                  attributes: ['id', 'name', 'branch_name', 'logo_url'] }]
    }) : [];
    const STAGE_PRIORITY = { active: 5, setup: 4, contracting: 3, proposal: 2, expired: 1 };
    const contractByUnit = {};
    unitContracts.forEach(c => {
      const uid = c.unit_id;
      const existing = contractByUnit[uid];
      if (!existing || (STAGE_PRIORITY[c.stage] || 0) > (STAGE_PRIORITY[existing.stage] || 0)) {
        contractByUnit[uid] = c;
      }
    });
    const isManager = req.user.role === 'Foodcourt Manager';

    // Tenant restaurants with 30-day sales
    const restaurants = await Restaurant.findAll({
      where: { foodcourt_id: id, ...(req.user.role === 'Foodcourt Manager' && req.user.branch_id ? { branch_id: req.user.branch_id } : {}) },
      attributes: ['id', 'name', 'branch_name', 'status', 'branch_id', 'latitude', 'longitude', 'logo_url', 'is_demo']
    });

    const restaurantIds = restaurants.map(r => r.id);
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const salesRows = restaurantIds.length > 0 ? await sequelize.query(`
      SELECT restaurant_id, COALESCE(SUM(total_amount), 0) AS sales_30d, COUNT(*) AS order_count
      FROM orders
      WHERE restaurant_id IN (:ids)
        AND status IN ('completed', 'served')
        AND (is_deleted = false OR is_deleted IS NULL)
        AND order_date >= :since
      GROUP BY restaurant_id
    `, { replacements: { ids: restaurantIds, since }, type: sequelize.QueryTypes.SELECT }) : [];
    const salesMap = new Map(salesRows.map(r => [Number(r.restaurant_id), Number(r.sales_30d) || 0]));

    const activeContracts = restaurantIds.length > 0 ? await Contract.findAll({
      where: { restaurant_id: { [Op.in]: restaurantIds }, stage: 'active', entity_type: 'foodcourt', entity_id: id },
      attributes: ['id', 'restaurant_id', 'contract_type', 'exclusivity_terms']
    }) : [];
    const contractMap = new Map();
    activeContracts.forEach(c => {
      const terms = c.exclusivity_terms || {};
      contractMap.set(Number(c.restaurant_id), {
        contract_id: c.id,
        contract_type: c.contract_type || null,
        radius_km: Number(terms.radius_km) > 0 ? Number(terms.radius_km) : null
      });
    });

    const enrichedRestaurants = restaurants.map(r => {
      const obj = r.toJSON();
      const c = contractMap.get(r.id) || { contract_id: null, contract_type: null, radius_km: null };
      return { ...obj, sales_30d: salesMap.get(r.id) || 0, ...c };
    });

    const maxSales = enrichedRestaurants.reduce((m, r) => Math.max(m, r.sales_30d), 0);

    // Unit occupancy per branch — breakdown by contract stage (active/setup/contracting/proposal/vacant)
    // Falls back to unit.status when no contract is assigned (still useful for legacy data).
    const emptyStats = () => ({ total: 0, active: 0, setup: 0, contracting: 0, proposal: 0, vacant: 0, expired: 0 });
    const unitsByBranch = {};
    const unitsDetailByBranch = {};
    units.forEach(u => {
      if (!unitsByBranch[u.branch_id]) unitsByBranch[u.branch_id] = emptyStats();
      if (!unitsDetailByBranch[u.branch_id]) unitsDetailByBranch[u.branch_id] = [];
      unitsByBranch[u.branch_id].total++;

      const c = contractByUnit[u.id];
      let bucket = 'vacant';
      if (c) {
        if (c.stage === 'active') bucket = 'active';
        else if (c.stage === 'setup') bucket = 'setup';
        else if (c.stage === 'contracting') bucket = 'contracting';
        else if (c.stage === 'proposal') bucket = 'proposal';
        else if (c.stage === 'expired') bucket = 'expired';
      }
      unitsByBranch[u.branch_id][bucket]++;

      const cj = c ? c.toJSON() : null;
      if (cj && isManager) { cj.financial_terms = null; cj.financial_redacted = true; }
      else if (cj) cj.financial_redacted = false;

      unitsDetailByBranch[u.branch_id].push({
        id: u.id,
        unit_number: u.unit_number,
        status: u.status,
        size_value: u.size_value,
        size_unit: u.size_unit,
        location_description: u.location_description,
        displayStage: bucket, // 'active' | 'setup' | 'contracting' | 'proposal' | 'expired' | 'vacant'
        currentContract: cj
      });
    });

    const enrichedBranches = branches.map(b => ({
      ...b.toJSON(),
      unit_stats: unitsByBranch[b.id] || emptyStats(),
      units: unitsDetailByBranch[b.id] || []
    }));

    const mappedBranches = enrichedBranches.filter(b => b.latitude != null && b.longitude != null);
    const unmappedBranches = enrichedBranches.filter(b => b.latitude == null || b.longitude == null);

    // Expose foodcourt's currency + timezone so the map panel no longer hardcodes.
    let fcOps = foodcourt.operation_settings;
    if (typeof fcOps === 'string') { try { fcOps = JSON.parse(fcOps); } catch { fcOps = null; } }
    const fcTimeZone = fcOps?.timeZone || 'Asia/Kuala_Lumpur';

    res.json({
      success: true,
      data: {
        foodcourt: {
          id: foodcourt.id,
          name: foodcourt.name,
          code: foodcourt.code,
          logo_url: foodcourt.logo_url,
          currency: foodcourt.currency || 'MYR',
          time_zone: fcTimeZone
        },
        mappedBranches,
        unmappedBranches,
        restaurants: enrichedRestaurants,
        max_sales_30d: maxSales,
        total_branches: branches.length,
        total_restaurants: restaurants.length
      }
    });
  } catch (error) {
    console.error('Error fetching tenancy map:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tenancy map' });
  }
});

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
      address_line_2: foodcourt.address_line_2 || '',
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
      address_line_2: req.body.address_line_2 || null,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.postal_code,
      country: req.body.country ? String(req.body.country).toUpperCase().slice(0, 2) : req.body.country,
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

    // 로고 변경 시 이전 파일 삭제
    if (req.body.logo_url && foodcourt.logo_url && req.body.logo_url !== foodcourt.logo_url) {
      await deleteOldImages(foodcourt.logo_url);
    }

    await foodcourt.update(updateData);
    console.log(`✓ Foodcourt company info updated: ${foodcourt.name}`);

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

    // Check access permissions — System Admin (all), owner (Foodcourt General),
    // or any user scoped to this foodcourt (Foodcourt Manager).
    const isSA = req.user.role === 'System Admin';
    const isOwner = foodcourt.owner_id === req.user.id;
    const isScoped = Number(req.user.foodcourt_id) === Number(foodcourt.id);
    if (!isSA && !isOwner && !isScoped) {
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
      currency: currency || 'MYR',
      status: status || 'active'
    });

    console.log(`✓ Foodcourt created: ${foodcourt.name} (ID: ${foodcourt.id})`);

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

    // 로고 변경 시 이전 파일 삭제
    if (logo_url && foodcourt.logo_url && logo_url !== foodcourt.logo_url) {
      await deleteOldImages(foodcourt.logo_url);
    }

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

    console.log(`✓ Foodcourt updated: ${foodcourt.name}`);

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
    console.log(`✓ Foodcourt deleted: ${foodcourt.name}`);

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
        qrPayment: payment_settings.qrPayment || {},
        additionalCharges: payment_settings.additionalCharges || {}
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

    // Update supported currencies if provided (validate against system currencies)
    if (supported_currencies && Array.isArray(supported_currencies)) {
      const SystemSettings = require('../models/SystemSettings');
      const sysCurrSetting = await SystemSettings.findOne({ where: { setting_key: 'supported_currencies' } });
      const systemCurrencies = sysCurrSetting?.setting_value || ['USD', 'MYR', 'KRW'];
      const invalid = supported_currencies.filter(c => !systemCurrencies.includes(c));
      if (invalid.length > 0) {
        return res.status(400).json({ error: `Currencies not supported by system: ${invalid.join(', ')}` });
      }
      foodcourt.supported_currencies = supported_currencies;
    }

    await foodcourt.save();
    console.log(`✓ Foodcourt payment settings updated: ${foodcourt.name}`);

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

// Get available payment methods for a foodcourt (used by invoice payers)
router.get('/:id/payment-settings/available/:currency', authenticateToken, async (req, res) => {
  try {
    const { id, currency } = req.params;
    const { getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    const result = getAvailablePaymentMethods(foodcourt.payment_settings || {}, currency);
    res.json(result);
  } catch (error) {
    console.error('Error fetching foodcourt available payment methods:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch payment methods' });
  }
});

// Get subscription info for a foodcourt (System Admin can set, Foodcourt General can view)
router.get('/:id/staff', authenticateToken, async (req, res) => {
  try {
    const foodcourtId = req.params.id;

    // Verify access: System Admin or Foodcourt General/Manager of this foodcourt
    if (req.user.role === 'System Admin') {
      // OK
    } else if ((req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') && req.user.foodcourt_id === parseInt(foodcourtId)) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const managers = await User.findAll({
      where: {
        foodcourt_id: foodcourtId,
        role: 'Foodcourt Manager'
      },
      attributes: { exclude: ['password'] },
      order: [['full_name', 'ASC']]
    });

    res.json({ success: true, data: managers });
  } catch (error) {
    console.error('Error fetching foodcourt managers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch managers' });
  }
});

// Create a foodcourt manager
router.post('/:id/staff', authenticateToken, async (req, res) => {
  try {
    const foodcourtId = req.params.id;

    // Only Foodcourt General or System Admin can create managers
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Foodcourt General' && req.user.foodcourt_id === parseInt(foodcourtId)) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied. Only Foodcourt General can create managers.' });
    }

    // Verify foodcourt exists
    const foodcourt = await Foodcourt.findByPk(foodcourtId);
    if (!foodcourt) {
      return res.status(404).json({ success: false, message: 'Foodcourt not found' });
    }

    const { username, email, full_name, phone, permissions, branch_id } = req.body;

    // Validate required fields
    if (!username || !email || !full_name) {
      return res.status(400).json({ success: false, message: 'Username, email, and full name are required' });
    }

    // Validate branch_id (if provided) belongs to this foodcourt
    if (branch_id != null) {
      const FoodcourtBranch = require('../models/FoodcourtBranch');
      const branch = await FoodcourtBranch.findByPk(branch_id);
      if (!branch) return res.status(400).json({ success: false, message: 'Branch not found' });
      if (branch.foodcourt_id !== parseInt(foodcourtId)) {
        return res.status(400).json({ success: false, message: 'Branch does not belong to this foodcourt' });
      }
    }

    // Check duplicate email/username
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      }
    });

    if (existingUser) {
      let errorDetail = '';
      if (existingUser.email === email && existingUser.username === username) {
        errorDetail = `Both email "${email}" and username "${username}" are already in use`;
      } else if (existingUser.email === email) {
        errorDetail = `Email "${email}" is already in use`;
      } else {
        errorDetail = `Username "${username}" is already in use`;
      }
      return res.status(400).json({ success: false, message: errorDetail });
    }

    // Auto-generate password (12 chars)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let generatedPassword = '';
    generatedPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
    generatedPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
    generatedPassword += '23456789'[Math.floor(Math.random() * 8)];
    generatedPassword += '!@#$%'[Math.floor(Math.random() * 5)];
    for (let i = 0; i < 8; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const manager = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'Foodcourt Manager',
      full_name,
      phone: phone || null,
      foodcourt_id: parseInt(foodcourtId),
      branch_id: branch_id || null,
      permissions: permissions || '[]'
    });

    const { password: _, ...managerData } = manager.toJSON();
    res.status(201).json({
      success: true,
      data: managerData,
      generatedPassword
    });
  } catch (error) {
    console.error('Error creating foodcourt manager:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a foodcourt manager
router.put('/:id/staff/:userId', authenticateToken, async (req, res) => {
  try {
    const foodcourtId = req.params.id;
    const userId = req.params.userId;

    // Only Foodcourt General or System Admin
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Foodcourt General' && req.user.foodcourt_id === parseInt(foodcourtId)) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, foodcourt_id: foodcourtId, role: 'Foodcourt Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this foodcourt' });
    }

    const { full_name, email, phone, username, branch_id, permissions } = req.body;
    const updateData = {};

    if (full_name) updateData.full_name = full_name;
    if (phone !== undefined) updateData.phone = phone;
    if (permissions !== undefined) updateData.permissions = permissions;
    if (branch_id !== undefined) {
      if (branch_id === null || branch_id === '') {
        updateData.branch_id = null;
      } else {
        const FoodcourtBranch = require('../models/FoodcourtBranch');
        const branch = await FoodcourtBranch.findByPk(branch_id);
        if (!branch) return res.status(400).json({ success: false, message: 'Branch not found' });
        if (branch.foodcourt_id !== parseInt(foodcourtId)) {
          return res.status(400).json({ success: false, message: 'Branch does not belong to this foodcourt' });
        }
        updateData.branch_id = branch_id;
      }
    }

    // Check email uniqueness if changing
    if (email && email !== manager.email) {
      const emailExists = await User.findOne({ where: { email, id: { [Op.ne]: userId } } });
      if (emailExists) {
        return res.status(400).json({ success: false, message: `Email "${email}" is already in use` });
      }
      updateData.email = email;
    }

    // Check username uniqueness if changing
    if (username && username !== manager.username) {
      const usernameExists = await User.findOne({ where: { username, id: { [Op.ne]: userId } } });
      if (usernameExists) {
        return res.status(400).json({ success: false, message: `Username "${username}" is already in use` });
      }
      updateData.username = username;
    }

    await manager.update(updateData);

    const { password: _, ...managerData } = manager.toJSON();
    res.json({ success: true, data: managerData });
  } catch (error) {
    console.error('Error updating foodcourt manager:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete a foodcourt manager
router.delete('/:id/staff/:userId', authenticateToken, async (req, res) => {
  try {
    const foodcourtId = req.params.id;
    const userId = req.params.userId;

    // Only Foodcourt General or System Admin
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Foodcourt General' && req.user.foodcourt_id === parseInt(foodcourtId)) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, foodcourt_id: foodcourtId, role: 'Foodcourt Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this foodcourt' });
    }

    await manager.destroy();
    res.json({ success: true, message: 'Manager deleted successfully' });
  } catch (error) {
    console.error('Error deleting foodcourt manager:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update foodcourt manager permissions
router.put('/:id/staff/:userId/permissions', authenticateToken, async (req, res) => {
  try {
    const foodcourtId = req.params.id;
    const userId = req.params.userId;

    // Only Foodcourt General or System Admin
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Foodcourt General' && req.user.foodcourt_id === parseInt(foodcourtId)) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, foodcourt_id: foodcourtId, role: 'Foodcourt Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this foodcourt' });
    }

    const { permissions } = req.body;
    if (!Array.isArray(permissions)) {
      return res.status(400).json({ success: false, message: 'Permissions must be an array' });
    }

    await manager.update({ permissions: JSON.stringify(permissions) });

    const { password: _, ...managerData } = manager.toJSON();
    res.json({ success: true, data: managerData });
  } catch (error) {
    console.error('Error updating foodcourt manager permissions:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Reset foodcourt manager password
router.put('/:id/staff/:userId/reset-password', authenticateToken, async (req, res) => {
  try {
    const foodcourtId = req.params.id;
    const userId = req.params.userId;

    // Only Foodcourt General or System Admin
    if (req.user.role === 'System Admin') {
      // OK
    } else if (req.user.role === 'Foodcourt General' && req.user.foodcourt_id === parseInt(foodcourtId)) {
      // OK
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const manager = await User.findOne({
      where: { id: userId, foodcourt_id: foodcourtId, role: 'Foodcourt Manager' }
    });

    if (!manager) {
      return res.status(404).json({ success: false, message: 'Manager not found in this foodcourt' });
    }

    // Generate new password
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
    let newPassword = '';
    newPassword += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
    newPassword += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
    newPassword += '23456789'[Math.floor(Math.random() * 8)];
    newPassword += '!@#$%'[Math.floor(Math.random() * 5)];
    for (let i = 0; i < 8; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await manager.update({ password: hashedPassword });

    res.json({ success: true, generatedPassword: newPassword });
  } catch (error) {
    console.error('Error resetting foodcourt manager password:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// Foodcourt Allowed Routes (module-based sidebar filtering)
// ============================================
router.get('/:id/allowed-routes', async (req, res) => {
  try {
    const { id } = req.params;
    const PlanTemplate = require('../models/PlanTemplate');
    const AddonModule = require('../models/AddonModule');

    const foodcourt = await Foodcourt.findByPk(id);
    if (!foodcourt) {
      return res.status(404).json({ error: 'Foodcourt not found' });
    }

    // Subscription data is on users table (foodcourt owner)
    const User = require('../models/User');
    const owner = foodcourt.owner_id ? await User.findByPk(foodcourt.owner_id) : null;

    // Demo accounts: use highest plan (enterprise) for full access
    const isDemo = owner?.is_demo || foodcourt.is_demo;
    const planType = isDemo ? 'Foodcourt Enterprise' : (owner?.plan_type || foodcourt.plan_type);
    const subStatus = isDemo ? 'active' : (owner?.subscription_status || foodcourt.subscription_status);

    if (!planType) {
      return res.json({
        entity_id: foodcourt.id,
        entity_type: 'foodcourt',
        plan_type: null,
        subscription_status: subStatus,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    const plan = await PlanTemplate.findOne({
      where: {
        [Op.or]: [
          { display_name: planType },
          { name: planType }
        ],
        plan_target: 'foodcourt'
      }
    });

    if (!plan) {
      return res.json({
        entity_id: foodcourt.id,
        entity_type: 'foodcourt',
        plan_type: planType,
        subscription_status: subStatus,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    const includedModuleCodes = plan.included_modules || [];
    if (includedModuleCodes.length === 0) {
      return res.json({
        entity_id: foodcourt.id,
        entity_type: 'foodcourt',
        plan_type: planType,
        subscription_status: subStatus,
        included_modules: [],
        allowed_routes: [],
        modules: []
      });
    }

    const modules = await AddonModule.findAll({
      where: { module_code: includedModuleCodes, is_active: true }
    });

    const allowedRoutes = [...new Set(
      modules.reduce((routes, m) => [...routes, ...(m.ui_routes || [])], [])
    )];

    res.json({
      entity_id: foodcourt.id,
      entity_type: 'foodcourt',
      plan_type: planType,
      subscription_status: subStatus,
      included_modules: includedModuleCodes,
      allowed_routes: allowedRoutes,
      modules: modules.map(m => ({ code: m.module_code, name: m.name, category: m.category }))
    });
  } catch (error) {
    console.error('Error fetching foodcourt allowed routes:', error);
    res.status(500).json({ error: 'Failed to fetch allowed routes' });
  }
});

// ============================================================================
// Tenancy Operations Dashboard — single-shot aggregation for the Foodcourt
// General dashboard widgets. Covers pipeline counts, expiring contracts,
// billing gaps (active contracts without a linked plan), unit occupancy, and
// an estimated monthly revenue forecast computed across linked plans.
// GET /api/foodcourts/:id/tenancy-dashboard
// ============================================================================
router.get('/:id/tenancy-dashboard', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { FoodcourtBranch, FoodcourtUnit, Contract, ContractPlan, EntityPlan, EntityPlanPrice } = require('../models');

    const foodcourt = await Foodcourt.findByPk(id, { attributes: ['id', 'name', 'currency', 'supported_currencies', 'owner_id'] });
    if (!foodcourt) return res.status(404).json({ success: false, message: 'Foodcourt not found' });

    // Access: System Admin / Foodcourt General (owner) / Foodcourt Manager (own fc)
    const canAccess = req.user.role === 'System Admin'
      || foodcourt.owner_id === req.user.id
      || (['Foodcourt General', 'Foodcourt Manager'].includes(req.user.role) && Number(req.user.foodcourt_id) === Number(id));
    if (!canAccess) return res.status(403).json({ success: false, message: 'Access denied' });

    const isManager = req.user.role === 'Foodcourt Manager';
    const managerBranch = isManager && req.user.branch_id ? Number(req.user.branch_id) : null;

    // Branch scope: manager sees only their branch's contracts
    const branchWhere = { foodcourt_id: id };
    if (managerBranch) branchWhere.id = managerBranch;
    const branches = await FoodcourtBranch.findAll({ where: branchWhere, attributes: ['id'] });
    const branchIds = branches.map(b => b.id);

    // Units within scope
    const units = branchIds.length > 0 ? await FoodcourtUnit.findAll({
      where: { branch_id: { [Op.in]: branchIds } },
      attributes: ['id', 'status', 'branch_id']
    }) : [];
    const unitIds = units.map(u => u.id);

    // All contracts for these units (any non-dead stage)
    const contracts = unitIds.length > 0 ? await Contract.findAll({
      where: {
        unit_id: { [Op.in]: unitIds },
        stage: ['proposal', 'contracting', 'setup', 'active', 'expired']
      },
      attributes: ['id', 'contract_number', 'stage', 'unit_id', 'restaurant_id', 'applicant_company_name',
                   'start_date', 'end_date', 'renewal_alert_months', 'currency', 'created_at']
    }) : [];

    // Priority-pick current contract per unit (same rule as Floor Plan API)
    const STAGE_PRIORITY = { active: 5, setup: 4, contracting: 3, proposal: 2, expired: 1 };
    const currentByUnit = {};
    contracts.forEach(c => {
      const prev = currentByUnit[c.unit_id];
      if (!prev || (STAGE_PRIORITY[c.stage] || 0) > (STAGE_PRIORITY[prev.stage] || 0)) {
        currentByUnit[c.unit_id] = c;
      }
    });

    // Pipeline counts (based on current contract per unit)
    const pipeline = { proposal: 0, contracting: 0, setup: 0, active: 0, expired: 0, vacant: 0, total: units.length };
    units.forEach(u => {
      const c = currentByUnit[u.id];
      if (!c) pipeline.vacant++;
      else if (pipeline[c.stage] !== undefined) pipeline[c.stage]++;
    });

    // Active contracts + gap detection (contracts with no open ContractPlan)
    const activeContracts = contracts.filter(c => c.stage === 'active');
    const activeIds = activeContracts.map(c => c.id);
    const openPlanLinks = activeIds.length > 0 ? await ContractPlan.findAll({
      where: { contract_id: { [Op.in]: activeIds }, end_at: null },
      attributes: ['id', 'contract_id', 'entity_plan_id']
    }) : [];
    const linkedContractIds = new Set(openPlanLinks.map(l => l.contract_id));
    const gapContracts = activeContracts.filter(c => !linkedContractIds.has(c.id));

    // Expiring contracts (active, within max(renewal_alert_months, 90 days) ahead)
    const now = new Date();
    const expiring30 = [];
    const expiring90 = [];
    activeContracts.forEach(c => {
      if (!c.end_date) return;
      const end = new Date(c.end_date);
      const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (24 * 3600 * 1000));
      if (daysLeft < 0) return; // past end — expired handled separately
      if (daysLeft <= 30) expiring30.push({ ...c.toJSON(), days_left: daysLeft });
      if (daysLeft <= 90) expiring90.push({ ...c.toJSON(), days_left: daysLeft });
    });
    expiring90.sort((a, b) => a.days_left - b.days_left);

    // Revenue forecast — sum estimated monthly charge across all linked plans.
    // Fetch linked plans + their fixed prices in one go.
    let monthlyForecast = 0;
    const planIds = openPlanLinks.map(l => l.entity_plan_id);
    if (planIds.length > 0) {
      const plans = await EntityPlan.findAll({
        where: { id: { [Op.in]: planIds } },
        attributes: ['id', 'charge_type', 'percentage_value', 'currency']
      });
      const prices = await EntityPlanPrice.findAll({
        where: { entity_plan_id: { [Op.in]: planIds }, is_active: true },
        attributes: ['entity_plan_id', 'currency', 'monthly_price']
      });
      const priceByPlan = {};
      prices.forEach(p => {
        if (!priceByPlan[p.entity_plan_id]) priceByPlan[p.entity_plan_id] = {};
        priceByPlan[p.entity_plan_id][p.currency] = Number(p.monthly_price);
      });

      // For percentage/combined, we need recent revenue per restaurant. Keep simple:
      // use the *fixed* floor for combined, 0 for percentage-only (no revenue available here).
      for (const plan of plans) {
        const priceMap = priceByPlan[plan.id] || {};
        const fixed = priceMap[foodcourt.currency] || Object.values(priceMap)[0] || 0;
        if (plan.charge_type === 'fixed') monthlyForecast += fixed;
        else if (plan.charge_type === 'combined') monthlyForecast += fixed; // min-guarantee floor
        // percentage-only: skip (needs per-restaurant revenue — shown as "variable" in UI)
      }
    }

    // Redact amounts for Manager role
    const redact = (list) => isManager ? [] : list;

    res.json({
      success: true,
      data: {
        currency: foodcourt.currency || 'MYR',
        scope: { manager_branch_only: !!managerBranch, branch_ids: branchIds },
        pipeline,
        expiring: {
          count_30d: expiring30.length,
          count_90d: expiring90.length,
          list: expiring90.slice(0, 10).map(c => ({
            id: c.id,
            contract_number: c.contract_number,
            applicant_company_name: c.applicant_company_name,
            end_date: c.end_date,
            days_left: c.days_left
          }))
        },
        billing_gaps: {
          count: gapContracts.length,
          list: gapContracts.slice(0, 10).map(c => ({
            id: c.id,
            contract_number: c.contract_number,
            applicant_company_name: c.applicant_company_name,
            days_since_start: c.start_date
              ? Math.max(0, Math.floor((Date.now() - new Date(c.start_date).getTime()) / (24 * 3600 * 1000)))
              : null
          }))
        },
        revenue_forecast: isManager ? { financial_redacted: true } : {
          currency: foodcourt.currency || 'MYR',
          active_plans_count: openPlanLinks.length,
          estimated_monthly_fixed_floor: Math.round(monthlyForecast * 100) / 100,
          disclaimer: 'Fixed + combined min-guarantee only. Percentage-based variable portion excluded from estimate (depends on restaurant revenue).'
        }
      }
    });
  } catch (error) {
    console.error('Error fetching tenancy dashboard:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch tenancy dashboard' });
  }
});

module.exports = router;
