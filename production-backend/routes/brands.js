const express = require('express');
const router = express.Router();
const { Brand, Restaurant, User } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

// ============================================
// Company Info APIs (MUST be before /:id routes)
// ============================================

// Get company info for brand owner
router.get('/company-info', authenticateToken, async (req, res) => {
  try {

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

    res.json({ success: true, message: 'Company info updated successfully' });
  } catch (error) {
    console.error('Error updating brand company info:', error);
    res.status(500).json({ error: 'Failed to update company info' });
  }
});

// Get all brands (filtered by owner for Brand General)
router.get('/', authenticateToken, async (req, res) => {
  try {

    const whereClause = {};

    // Brand General/Brand Manager only see their own brands
    if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
      whereClause.owner_id = req.user.id;
    } else if (req.user.role === 'System Admin') {
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

module.exports = router;
