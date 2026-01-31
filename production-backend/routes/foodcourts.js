const express = require('express');
const router = express.Router();
const { Foodcourt, Restaurant, User } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Get all foodcourts (filtered by owner for Foodcourt General)
router.get('/', authenticateToken, async (req, res) => {
  try {

    const whereClause = {};

    // Foodcourt General/Foodcourt Manager only see their own foodcourts
    if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
      whereClause.owner_id = req.user.id;
    } else if (req.user.role === 'System Admin') {
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

    res.json(foodcourts);
  } catch (error) {
    console.error('Error fetching foodcourts:', error);
    res.status(500).json({ error: 'Failed to fetch foodcourts' });
  }
});

// Get single foodcourt by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

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

    res.json({ message: 'Foodcourt deleted successfully' });
  } catch (error) {
    console.error('Error deleting foodcourt:', error);
    res.status(500).json({ error: 'Failed to delete foodcourt' });
  }
});

// Get company info for foodcourt owner
router.get('/company-info', authenticateToken, async (req, res) => {
  try {

    // Foodcourt General/Manager는 자신이 소유한 푸드코트의 회사정보를 가져옴
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

// Update company info for foodcourt owner
router.put('/company-info', authenticateToken, async (req, res) => {
  try {

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

    res.json({ success: true, message: 'Company info updated successfully' });
  } catch (error) {
    console.error('Error updating foodcourt company info:', error);
    res.status(500).json({ error: 'Failed to update company info' });
  }
});

// ============================================
// Payment Settings APIs (B2B Invoice Payment)
// ============================================

// Get payment settings for a foodcourt
router.get('/:id/payment-settings', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

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

module.exports = router;
