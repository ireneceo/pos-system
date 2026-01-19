const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const InvoiceSettings = require('../models/InvoiceSettings');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const CompanySettings = require('../models/CompanySettings');
const SystemSettings = require('../models/SystemSettings');
const PlanPrice = require('../models/PlanPrice');
const PlanTemplate = require('../models/PlanTemplate');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const { Op } = require('sequelize');

const PAYMENT_SETTINGS_KEY = 'payment_settings';
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');

// Helper function to get bank info from Payment Settings based on currency
async function getBankInfoByCurrency(currency) {
  try {
    const paymentSettings = await SystemSettings.findOne({
      where: { setting_key: PAYMENT_SETTINGS_KEY }
    });

    if (paymentSettings && paymentSettings.setting_value) {
      const settings = paymentSettings.setting_value;
      const bankConfig = settings.bankTransfer?.[currency];

      if (bankConfig?.enabled) {
        return {
          bankName: bankConfig.bankName || '',
          bankAccount: bankConfig.accountNumber || '',
          bankAccountName: bankConfig.accountName || '',
          swiftCode: bankConfig.swiftCode || ''
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching bank info by currency:', error);
    return null;
  }
}

// Helper function to build company info object
async function getIssuerCompanyInfo(issuerType, issuerId, currency = 'MYR') {
  if (issuerType === 'system_admin') {
    // Get system admin company settings
    const companySettings = await CompanySettings.findOne({ where: { id: 1 } });

    // Get bank info from Payment Settings based on currency
    const bankInfo = await getBankInfoByCurrency(currency);

    if (companySettings) {
      return {
        name: companySettings.company_name || 'System Admin',
        logoUrl: companySettings.logo_url || null,
        address: companySettings.address || '',
        city: companySettings.city || '',
        state: companySettings.state || '',
        postalCode: companySettings.postal_code || '',
        country: companySettings.country || 'Malaysia',
        phone: companySettings.phone || '',
        email: companySettings.email || '',
        website: companySettings.website || '',
        taxId: companySettings.tax_number || '',
        businessRegistration: companySettings.registration_number || '',
        // Use bank info from Payment Settings (currency-based) if available
        bankName: bankInfo?.bankName || '',
        bankAccount: bankInfo?.bankAccount || '',
        bankAccountName: bankInfo?.bankAccountName || '',
        swiftCode: bankInfo?.swiftCode || ''
      };
    }
  } else if (issuerType === 'brand' && issuerId) {
    const brand = await Brand.findByPk(issuerId);
    if (brand) {
      return {
        name: brand.name || 'Brand',
        logoUrl: brand.logo_url || null,
        address: brand.address || '',
        city: brand.city || '',
        state: brand.state || '',
        postalCode: brand.postal_code || '',
        country: brand.country || 'Malaysia',
        phone: brand.phone || '',
        email: brand.email || '',
        website: brand.website || '',
        taxId: brand.tax_id || '',
        businessRegistration: brand.business_registration || '',
        bankName: brand.bank_name || '',
        bankAccount: brand.bank_account || '',
        bankAccountName: brand.bank_account_name || '',
        swiftCode: ''
      };
    }
  } else if (issuerType === 'foodcourt' && issuerId) {
    const foodcourt = await Foodcourt.findByPk(issuerId);
    if (foodcourt) {
      return {
        name: foodcourt.name || 'Foodcourt',
        logoUrl: foodcourt.logo_url || null,
        address: foodcourt.address || '',
        city: foodcourt.city || '',
        state: foodcourt.state || '',
        postalCode: foodcourt.postal_code || '',
        country: foodcourt.country || 'Malaysia',
        phone: foodcourt.phone || '',
        email: foodcourt.email || '',
        website: foodcourt.website || '',
        taxId: foodcourt.tax_id || '',
        businessRegistration: foodcourt.business_registration || '',
        bankName: foodcourt.bank_name || '',
        bankAccount: foodcourt.bank_account || '',
        bankAccountName: foodcourt.bank_account_name || '',
        swiftCode: ''
      };
    }
  }
  return null;
}

// Helper function to build payer company info
async function getPayerCompanyInfo(payerType, payerId, restaurant) {
  if (payerType === 'restaurant' || !payerId) {
    // Restaurant pays - use restaurant info
    if (restaurant) {
      return {
        name: restaurant.name || 'Restaurant',
        logoUrl: restaurant.logo_url || null,
        address: restaurant.address || '',
        city: restaurant.city || '',
        state: restaurant.state || '',
        postalCode: restaurant.postal_code || '',
        country: restaurant.country || 'Malaysia',
        phone: restaurant.phone || '',
        email: restaurant.email || '',
        taxId: restaurant.tax_id || '',
        businessRegistration: restaurant.business_registration || ''
      };
    }
  } else if (payerType === 'brand_manager' && payerId) {
    // Brand manager pays - use brand owner (user) info
    const user = await User.findByPk(payerId);
    if (user) {
      return {
        name: user.company_name || user.full_name || 'Manager',
        address: user.address || '',
        phone: user.phone || '',
        email: user.email || ''
      };
    }
  } else if (payerType === 'foodcourt_manager' && payerId) {
    // Foodcourt manager pays - use foodcourt owner (user) info
    const user = await User.findByPk(payerId);
    if (user) {
      return {
        name: user.company_name || user.full_name || 'Manager',
        address: user.address || '',
        phone: user.phone || '',
        email: user.email || ''
      };
    }
  }
  return null;
}

// Helper function to format billing period display
function formatBillingPeriod(startDate, endDate) {
  if (!startDate || !endDate) return '-';

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Format: "Jan 23, 2026 - Feb 22, 2026"
  const formatDate = (date) => date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return `${formatDate(start)} - ${formatDate(end)}`;
}

// Helper function to get display name for invoice category
function getCategoryDisplayName(category, customDescription, planType, billingCycle) {
  switch (category) {
    case 'subscription':
      const basePlan = planType || 'Subscription Plan';
      let planDisplay = basePlan;

      // Add billing cycle info if available
      if (billingCycle) {
        const cycleText = billingCycle === 'monthly' ? 'Monthly' : 'Annual';
        planDisplay = `${basePlan} (${cycleText})`;
      }

      return planDisplay;
    case 'service':
      return 'Service';
    case 'consulting':
      return 'Consulting';
    case 'others':
      return customDescription || 'Others';
    default:
      return planType || 'Subscription Plan';
  }
}

// Get company settings for invoice generation
// Accepts optional currency query param for currency-specific bank info
router.get('/invoice-settings', async (req, res) => {
  try {
    const currency = req.query.currency || 'MYR';

    const companySettings = await CompanySettings.findOne({
      where: { id: 1 } // System admin company settings
    });

    if (!companySettings) {
      return res.status(404).json({ error: 'Company settings not found' });
    }

    // Get bank info from Payment Settings based on currency
    const bankInfo = await getBankInfoByCurrency(currency);

    res.json({
      data: {
        companyName: companySettings.company_name,
        address: companySettings.address,
        city: companySettings.city,
        state: companySettings.state,
        postalCode: companySettings.postal_code,
        country: companySettings.country,
        phone: companySettings.phone,
        email: companySettings.email,
        website: companySettings.website,
        taxNumber: companySettings.tax_number,
        registrationNumber: companySettings.registration_number,
        companyLogo: companySettings.company_logo || '',
        // Use bank info from Payment Settings (currency-based) if available
        bankName: bankInfo?.bankName || '',
        bankAccount: bankInfo?.bankAccount || '',
        bankAccountName: bankInfo?.bankAccountName || '',
        swiftCode: bankInfo?.swiftCode || ''
      }
    });
  } catch (error) {
    console.error('Error fetching company settings:', error);
    res.status(500).json({ error: 'Failed to fetch company settings' });
  }
});

// Get all invoices for admin (system-wide overview)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'manager_id', 'manager_name', 'plan_type', 'phone', 'email', 'subscription_snapshot', 'billing_cycle']
      }, {
        model: InvoiceItem,
        as: 'items',
        attributes: ['description', 'calculated_amount', 'tax_amount', 'total_amount']
      }],
      order: [['due_date', 'DESC'], ['id', 'DESC']]
    });

    // Get all unique payer IDs to fetch manager data
    const payerIds = [...new Set(invoices
      .filter(inv => inv.payer_id && inv.payer_type !== 'restaurant')
      .map(inv => inv.payer_id)
    )];

    // Fetch payer (manager) information
    const payers = payerIds.length > 0 ? await User.findAll({
      where: { id: { [Op.in]: payerIds } }
    }) : [];

    // Transform data to match frontend expectations
    const transformedInvoices = invoices.map(invoice => {
      // Determine customer info based on payer type
      let customerName, customerAddress, customerCompany;

      if (invoice.payer_type === 'restaurant' || !invoice.payer_id) {
        // Restaurant pays
        customerName = invoice.restaurant?.name || 'Unknown Restaurant';
        customerAddress = invoice.restaurant?.address || 'No address';
        customerCompany = invoice.restaurant?.name || 'Unknown Restaurant';
      } else {
        // Manager pays (foodcourt or brand manager)
        const payer = payers.find(p => p.id === invoice.payer_id);
        if (payer) {
          customerName = payer.company_name || payer.full_name || 'Unknown Manager';
          customerAddress = payer.address || 'No address';
          customerCompany = payer.company_name || payer.full_name || 'Unknown Company';
        } else {
          customerName = 'Unknown Payer';
          customerAddress = 'No address';
          customerCompany = 'Unknown Company';
        }
      }

      // Get original manager info for reference
      const managerId = invoice.restaurant?.manager_id;
      const managerName = invoice.restaurant?.manager_name || 'Unknown Manager';

      return {
        id: invoice.id.toString(),
        invoiceNumber: invoice.invoice_number,
        managerId: managerId ? managerId.toString() : '',
        managerName: managerName,
        companyName: customerCompany,
        customerName: customerName,
        customerAddress: customerAddress,
        restaurantId: invoice.restaurant_id?.toString(),
        restaurantName: invoice.restaurant?.name || 'Unknown Restaurant',
        issueDate: invoice.issued_at || invoice.createdAt,
        dueDate: invoice.due_date,
        paidDate: invoice.paid_at,
        status: invoice.status || 'pending_payment',
        currency: invoice.currency || 'MYR',
        amount: parseFloat(invoice.total_amount) - parseFloat(invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
        tax: parseFloat(invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
        total: parseFloat(invoice.total_amount),
        items: invoice.items?.map(item => ({
          description: item.description,
          quantity: 1,
          unitPrice: parseFloat(item.calculated_amount),
          total: parseFloat(item.total_amount)
        })) || [],
        billingPeriod: formatBillingPeriod(invoice.billing_period_start, invoice.billing_period_end),
        planType: invoice.restaurant?.plan_type || 'Basic Plan',
        type: invoice.type,
        payerType: invoice.payer_type,
        payerId: invoice.payer_id?.toString(),
        invoiceCategory: invoice.invoice_category || 'subscription',
        customDescription: invoice.custom_description,
        serviceDescription: invoice.service_description,
        categoryDisplayName: getCategoryDisplayName(invoice.invoice_category, invoice.custom_description, invoice.restaurant?.plan_type, invoice.restaurant?.billing_cycle)
      };
    });

    console.log('📊 Transformed invoices count:', transformedInvoices.length);
    console.log('📊 First 3 invoices:', transformedInvoices.slice(0, 3).map(inv => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      status: inv.status
    })));
    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching all invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get all invoices for a restaurant
router.get('/restaurant/:restaurantId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const invoices = await Invoice.findAll({
      where: { restaurant_id: restaurantId },
      order: [['createdAt', 'DESC']]
    });
    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get all invoices for manager (across all restaurants they manage)
router.get('/manager/:managerId', authenticateToken, async (req, res) => {
  try {
    const { managerId } = req.params;
    
    // Get restaurants managed by this manager
    const restaurants = await Restaurant.findAll({
      where: { manager_id: managerId }
    });
    
    const restaurantIds = restaurants.map(r => r.id);
    
    // Get invoices for these restaurants with restaurant details
    const invoices = await Invoice.findAll({
      where: {
        restaurant_id: {
          [Op.in]: restaurantIds
        }
      },
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'manager_name', 'plan_type']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    // Transform data to match frontend format
    const transformedInvoices = invoices.map(invoice => ({
      id: invoice.id,
      invoiceNumber: invoice.invoice_number,
      restaurantId: invoice.restaurant_id,
      restaurantName: invoice.restaurant?.name || 'Unknown Restaurant',
      restaurantManager: invoice.restaurant?.manager_name || 'Unknown Manager',
      issueDate: invoice.issued_at?.toISOString().split('T')[0] || invoice.createdAt.toISOString().split('T')[0],
      dueDate: invoice.due_date.toISOString().split('T')[0],
      paidDate: invoice.paid_at?.toISOString().split('T')[0] || null,
      status: invoice.status,
      amount: parseFloat(invoice.total_amount) - (parseFloat(invoice.total_amount) * 0.06), // Remove tax for display
      tax: parseFloat(invoice.total_amount) * 0.06,
      total: parseFloat(invoice.total_amount),
      billingPeriod: `${invoice.billing_period_start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      planType: invoice.restaurant?.plan_type || 'Basic Plan',
      items: [
        {
          description: `${invoice.restaurant?.plan_type || 'Basic Plan'} - Monthly Subscription`,
          quantity: 1,
          unitPrice: parseFloat(invoice.total_amount) - (parseFloat(invoice.total_amount) * 0.06),
          total: parseFloat(invoice.total_amount) - (parseFloat(invoice.total_amount) * 0.06)
        }
      ]
    }));
    
    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching manager invoices:', error);
    res.status(500).json({ error: 'Failed to fetch manager invoices' });
  }
});

// Get invoice details with items and company info
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'address', 'city', 'state', 'postal_code', 'country',
                     'phone', 'email', 'tax_id', 'business_registration', 'logo_url',
                     'manager_id', 'manager_name', 'plan_type', 'billing_cycle']
      }]
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    const items = await InvoiceItem.findAll({
      where: { invoice_id: req.params.id }
    });

    // Get issuer company info (with currency for bank info)
    const issuerCompany = await getIssuerCompanyInfo(
      invoice.issuer_type || 'system_admin',
      invoice.issuer_id,
      invoice.currency || 'MYR'
    );

    // Get payer company info
    const payerCompany = await getPayerCompanyInfo(
      invoice.payer_type,
      invoice.payer_id,
      invoice.restaurant
    );

    // Transform invoice with company info
    const transformedInvoice = {
      id: invoice.id.toString(),
      invoiceNumber: invoice.invoice_number,
      issuerType: invoice.issuer_type || 'system_admin',
      issuerId: invoice.issuer_id?.toString(),
      issuerName: issuerCompany?.name || 'System Admin',
      issuerCompany: issuerCompany,
      payerType: invoice.payer_type || 'restaurant',
      payerId: invoice.payer_id?.toString(),
      payerName: payerCompany?.name || invoice.restaurant?.name || 'Customer',
      payerCompany: payerCompany,
      restaurantId: invoice.restaurant_id?.toString(),
      restaurantName: invoice.restaurant?.name || 'Unknown Restaurant',
      issueDate: invoice.issued_at || invoice.createdAt,
      dueDate: invoice.due_date,
      paidDate: invoice.paid_at,
      status: invoice.status || 'pending_payment',
      currency: invoice.currency || 'MYR',
      amount: parseFloat(invoice.total_amount) - (items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
      tax: items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0,
      total: parseFloat(invoice.total_amount),
      items: items?.map(item => ({
        id: item.id?.toString(),
        description: item.description,
        quantity: item.quantity || 1,
        unitPrice: parseFloat(item.calculated_amount || item.fixed_amount || 0),
        taxRate: parseFloat(item.tax_rate || 0),
        taxAmount: parseFloat(item.tax_amount || 0),
        total: parseFloat(item.total_amount || 0)
      })) || [],
      billingPeriod: invoice.billing_period_start && invoice.billing_period_end
        ? `${new Date(invoice.billing_period_start).toLocaleDateString()} - ${new Date(invoice.billing_period_end).toLocaleDateString()}`
        : null,
      planType: invoice.restaurant?.plan_type || 'Basic Plan',
      type: invoice.type,
      notes: invoice.notes,
      paymentMethod: invoice.payment_method,
      paymentProvider: invoice.payment_provider,
      receiptUrl: invoice.receipt_url,
      confirmedBy: invoice.confirmed_by?.toString(),
      confirmedAt: invoice.confirmed_at,
      rejectionReason: invoice.rejection_reason
    };

    res.json({ invoice: transformedInvoice, items });
  } catch (error) {
    console.error('Error fetching invoice details:', error);
    res.status(500).json({ error: 'Failed to fetch invoice details' });
  }
});

// Create new invoice (manual)
router.post('/', authenticateToken, async (req, res) => {
  console.log('POST /api/invoices called with:', JSON.stringify(req.body, null, 2));
  const { sequelize } = require('../config/database');
  const transaction = await sequelize.transaction();

  try {
    const { invoice_data, items } = req.body;

    // Calculate total amount from items if not provided
    if (!invoice_data.total_amount && items && items.length > 0) {
      invoice_data.total_amount = items.reduce((sum, item) => sum + (parseFloat(item.total_amount) || 0), 0);
    }

    // Debug logging
    console.log('Invoice data before creation:', JSON.stringify(invoice_data, null, 2));

    // Generate invoice number with lock to prevent duplicates
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const count = await Invoice.count({
      where: {
        invoice_number: {
          [Op.like]: `${invoice_data.invoice_prefix || 'INV'}-${year}${month}%`
        }
      },
      transaction
    });

    invoice_data.invoice_number = `${invoice_data.invoice_prefix || 'INV'}-${year}${month}${String(count + 1).padStart(4, '0')}`;

    // Create invoice within transaction
    const invoice = await Invoice.create(invoice_data, { transaction });

    // Create invoice items within same transaction
    if (items && items.length > 0) {
      const invoiceItems = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }));
      await InvoiceItem.bulkCreate(invoiceItems, { transaction });
    }

    await transaction.commit();
    res.status(201).json({ success: true, invoice });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// Update invoice status
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status, paid_amount, paid_at } = req.body;
    
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    const updateData = { status };
    if (status === 'paid') {
      updateData.paid_amount = paid_amount || invoice.total_amount;
      updateData.paid_at = paid_at || new Date();
    }
    
    await invoice.update(updateData);
    res.json({ success: true, invoice });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'Failed to update invoice status' });
  }
});

// Record payment for invoice
router.post('/:id/payment', authenticateToken, async (req, res) => {
  try {
    const { payment_method, transaction_id, payment_date, notes, receipt_url } = req.body;
    
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    if (invoice.status === 'paid') {
      return res.status(400).json({ error: 'Invoice is already paid' });
    }
    
    // Update invoice with payment information
    const updateData = {
      status: 'paid',
      paid_amount: invoice.total_amount,
      paid_at: payment_date || new Date(),
      payment_method: payment_method || 'bank_transfer',
      transaction_id,
      payment_notes: notes,
      receipt_url
    };
    
    await invoice.update(updateData);
    res.json({ success: true, invoice: await Invoice.findByPk(req.params.id) });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
});

// Delete invoice
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Delete invoice items first
    await InvoiceItem.destroy({
      where: { invoice_id: req.params.id }
    });
    
    // Delete invoice
    await invoice.destroy();
    
    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

// Get invoice settings for a restaurant
router.get('/settings/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const settings = await InvoiceSettings.findOne({
      where: { restaurant_id: req.params.restaurantId }
    });
    
    if (!settings) {
      // Return default settings if none exist
      return res.json({
        auto_generate: false,
        payment_terms: 30,
        solution_fee_enabled: true,
        tax_rate: 10,
        invoice_prefix: 'INV'
      });
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Error fetching invoice settings:', error);
    res.status(500).json({ error: 'Failed to fetch invoice settings' });
  }
});

// Update invoice settings
router.put('/settings/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    
    let settings = await InvoiceSettings.findOne({
      where: { restaurant_id: restaurantId }
    });
    
    if (settings) {
      await settings.update(req.body);
    } else {
      settings = await InvoiceSettings.create({
        restaurant_id: restaurantId,
        ...req.body
      });
    }
    
    res.json({ success: true, settings });
  } catch (error) {
    console.error('Error updating invoice settings:', error);
    res.status(500).json({ error: 'Failed to update invoice settings' });
  }
});

// Generate invoices for all active subscriptions
router.post('/generate-for-subscriptions', authenticateToken, async (req, res) => {
  try {
    console.log('Generating invoices for all active subscriptions...');

    // Get all active restaurants with subscriptions
    const restaurants = await Restaurant.findAll({
      where: {
        status: 'active',
        subscription_start: { [Op.not]: null },
        subscription_end: { [Op.gte]: new Date() } // Active subscriptions
      }
    });

    console.log(`Found ${restaurants.length} active restaurants with subscriptions`);

    const results = [];
    const errors = [];

    for (const restaurant of restaurants) {
      try {
        // Anniversary Billing: Calculate billing period based on subscription start date
        const now = new Date();
        const subscriptionStart = new Date(restaurant.subscription_start);
        const billingCycle = restaurant.billing_cycle || 'monthly';
        const anchorDay = subscriptionStart.getDate(); // e.g., 15 if started on 15th

        // Calculate the next billing period based on subscription anniversary
        let billingStart, billingEnd, dueDate, issueDate;

        if (billingCycle === 'annual') {
          // Annual billing: Full year from subscription anniversary
          const currentYear = now.getFullYear();
          const subscriptionMonth = subscriptionStart.getMonth();

          // Find the next annual billing date
          const anniversaryThisYear = new Date(currentYear, subscriptionMonth, anchorDay);

          if (now >= anniversaryThisYear) {
            // Anniversary this year has passed, bill for next year
            billingStart = new Date(currentYear, subscriptionMonth, anchorDay);
            billingEnd = new Date(currentYear + 1, subscriptionMonth, anchorDay - 1);
          } else {
            // Anniversary hasn't come yet
            billingStart = new Date(currentYear - 1, subscriptionMonth, anchorDay);
            billingEnd = new Date(currentYear, subscriptionMonth, anchorDay - 1);
          }

          // Due date is the start of service period (prepaid model)
          dueDate = new Date(billingStart);
          // Issue invoice 7 days before due date
          issueDate = new Date(billingStart);
          issueDate.setDate(issueDate.getDate() - 7);

        } else {
          // Monthly billing: Based on subscription start day
          const currentMonth = now.getMonth();
          const currentYear = now.getFullYear();

          // Calculate the anchor day for current month (handle month end edge cases)
          const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
          const adjustedAnchorDay = Math.min(anchorDay, daysInCurrentMonth);

          // Find the upcoming billing period
          const anchorThisMonth = new Date(currentYear, currentMonth, adjustedAnchorDay);

          if (now >= anchorThisMonth) {
            // Anchor day this month has passed, bill for next period
            billingStart = new Date(currentYear, currentMonth, adjustedAnchorDay);

            // Calculate end date (day before next anchor)
            const nextMonth = currentMonth + 1;
            const daysInNextMonth = new Date(currentYear, nextMonth + 1, 0).getDate();
            const nextAnchorDay = Math.min(anchorDay, daysInNextMonth);
            billingEnd = new Date(currentYear, nextMonth, nextAnchorDay - 1);
          } else {
            // Anchor day hasn't come yet - bill for current period
            const prevMonth = currentMonth - 1;
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
            const prevAnchorDay = Math.min(anchorDay, daysInPrevMonth);

            billingStart = new Date(currentYear, prevMonth, prevAnchorDay);
            billingEnd = new Date(currentYear, currentMonth, adjustedAnchorDay - 1);
          }

          // Due date is the start of service period (prepaid model)
          dueDate = new Date(billingStart);
          // Issue invoice 7 days before due date
          issueDate = new Date(billingStart);
          issueDate.setDate(issueDate.getDate() - 7);
        }

        // Ensure issue date is not in the past (issue today if so)
        if (issueDate < now) {
          issueDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }

        // Check if invoice already exists for this period
        const existingInvoice = await Invoice.findOne({
          where: {
            restaurant_id: restaurant.id,
            billing_period_start: billingStart,
            billing_period_end: billingEnd
          }
        });

        if (existingInvoice) {
          console.log(`Invoice already exists for restaurant ${restaurant.name} for this period`);
          continue;
        }

        // Generate invoice number
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const count = await Invoice.count({
          where: {
            invoice_number: {
              [Op.like]: `INV-${year}${month}%`
            }
          }
        });

        const invoiceNumber = `INV-${year}${month}${String(count + 1).padStart(4, '0')}`;

        // Determine restaurant's currency (convert RM to MYR)
        let currency = restaurant.currency || 'MYR';
        if (currency === 'RM') currency = 'MYR';

        // Get plan price from plan_prices table based on restaurant's currency
        let planAmount = parseFloat(restaurant.plan_amount || 29);
        // billingCycle already defined above for anniversary billing calculation

        // Find plan_id from plan_templates by matching plan_type
        const planTemplate = await PlanTemplate.findOne({
          where: { display_name: restaurant.plan_type }
        });

        if (planTemplate) {
          // Get price for this currency
          const planPrice = await PlanPrice.findOne({
            where: {
              plan_id: planTemplate.id,
              currency: currency,
              is_active: true
            }
          });

          if (planPrice) {
            planAmount = billingCycle === 'annual'
              ? parseFloat(planPrice.annual_price) / 12  // Monthly portion of annual price
              : parseFloat(planPrice.monthly_price);
          }
        }

        const taxRate = 0.06; // 6% tax
        const taxAmount = planAmount * taxRate;
        const totalAmount = planAmount + taxAmount;

        // Format dates for notes
        const formatDate = (date) => {
          const d = new Date(date);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };
        const cycleText = billingCycle === 'annual' ? 'Annual' : 'Monthly';
        const periodText = `${formatDate(billingStart)} ~ ${formatDate(billingEnd)}`;

        // Determine payer based on restaurant's payment_model setting
        let payerType = 'restaurant';  // Default: Restaurant Admin pays
        let payerId = null;

        if (restaurant.payment_model === 'brand_manager' && restaurant.brand_id) {
          // Brand Manager pays - find the brand owner
          const brand = await Brand.findByPk(restaurant.brand_id);
          if (brand && brand.owner_id) {
            payerType = 'brand_manager';
            payerId = brand.owner_id;
          }
        } else if (restaurant.payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
          // Foodcourt Manager pays - find the foodcourt owner
          const foodcourt = await Foodcourt.findByPk(restaurant.foodcourt_id);
          if (foodcourt && foodcourt.owner_id) {
            payerType = 'foodcourt_manager';
            payerId = foodcourt.owner_id;
          }
        }

        // Create invoice with currency
        const invoice = await Invoice.create({
          restaurant_id: restaurant.id,
          invoice_number: invoiceNumber,
          type: 'automatic',
          billing_period_start: billingStart,
          billing_period_end: billingEnd,
          due_date: dueDate,
          total_amount: totalAmount,
          currency: currency,
          status: 'pending_payment', // Auto-send subscription invoices
          notes: `${cycleText} subscription invoice for ${restaurant.plan_type}. Service period: ${periodText}. Prepaid - Due on service start date.`,
          issued_by: 0, // System generated
          issued_at: issueDate,
          issuer_type: 'system_admin',
          payer_type: payerType,
          payer_id: payerId
        });

        // Create invoice item
        await InvoiceItem.create({
          invoice_id: invoice.id,
          item_type: 'subscription',
          description: `${restaurant.plan_type} - ${cycleText} Subscription (${periodText})`,
          calculation_method: 'fixed',
          fixed_amount: planAmount,
          calculated_amount: planAmount,
          tax_rate: taxRate * 100,
          tax_amount: taxAmount,
          total_amount: totalAmount
        });

        results.push({
          restaurant_id: restaurant.id,
          restaurant_name: restaurant.name,
          invoice_number: invoiceNumber,
          amount: totalAmount,
          currency: currency
        });

        console.log(`Created invoice ${invoiceNumber} for ${restaurant.name} - ${totalAmount}`);

      } catch (error) {
        console.error(`Error creating invoice for restaurant ${restaurant.name}:`, error);
        errors.push({
          restaurant_id: restaurant.id,
          restaurant_name: restaurant.name,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      generated: results.length,
      invoices: results,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error generating subscription invoices:', error);
    res.status(500).json({ error: 'Failed to generate subscription invoices' });
  }
});

// Generate invoices automatically (for cron job or manual trigger)
router.post('/generate-automatic', authenticateToken, async (req, res) => {
  try {
    // Support both camelCase and snake_case
    const restaurant_id = req.body.restaurantId || req.body.restaurant_id;
    
    // Get settings for the restaurant
    const settings = await InvoiceSettings.findOne({
      where: { 
        restaurant_id,
        auto_generate: true
      }
    });
    
    if (!settings) {
      return res.status(400).json({ error: 'Auto-generation not enabled for this restaurant' });
    }
    
    // Calculate billing period (previous month)
    const now = new Date();
    const billingStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const billingEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const dueDate = new Date(now.getFullYear(), now.getMonth(), settings.payment_terms);
    
    // Check if invoice already exists for this period
    const existingInvoice = await Invoice.findOne({
      where: {
        restaurant_id,
        billing_period_start: billingStart,
        billing_period_end: billingEnd,
        type: 'automatic'
      }
    });
    
    if (existingInvoice) {
      return res.status(400).json({ error: 'Invoice already exists for this period' });
    }
    
    // Generate invoice number
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const count = await Invoice.count({
      where: {
        invoice_number: {
          [Op.like]: `${settings.invoice_prefix}-${year}${month}%`
        }
      }
    });
    
    const invoiceNumber = `${settings.invoice_prefix}-${year}${month}${String(count + 1).padStart(4, '0')}`;
    
    // Calculate items and amounts
    const items = [];
    let totalAmount = 0;
    
    // Solution fee
    if (settings.solution_fee_enabled && settings.solution_fee_amount) {
      const solutionFee = {
        item_type: 'solution_fee',
        description: 'POS System Monthly Subscription',
        calculation_method: 'fixed',
        fixed_amount: settings.solution_fee_amount,
        calculated_amount: settings.solution_fee_amount,
        tax_rate: settings.tax_rate,
        tax_amount: settings.solution_fee_amount * (settings.tax_rate / 100),
        total_amount: settings.solution_fee_amount * (1 + settings.tax_rate / 100)
      };
      items.push(solutionFee);
      totalAmount += solutionFee.total_amount;
    }
    
    // Rent calculation
    if (settings.rent_enabled) {
      let rentAmount = 0;
      let description = '';
      
      if (settings.rent_type === 'fixed') {
        rentAmount = settings.rent_fixed_amount;
        description = 'Monthly Rent (Fixed)';
      } else if (settings.rent_type === 'percentage') {
        // TODO: Calculate based on monthly sales
        // For now, we'll use a placeholder
        const monthlySales = 0; // This should be calculated from orders
        rentAmount = monthlySales * (settings.rent_percentage_rate / 100);
        description = `Monthly Rent (${settings.rent_percentage_rate}% of sales)`;
      } else if (settings.rent_type === 'combined') {
        // TODO: Calculate based on monthly sales
        const monthlySales = 0;
        const percentageAmount = monthlySales * (settings.rent_percentage_rate / 100);
        rentAmount = Math.max(settings.rent_minimum_amount, percentageAmount);
        description = `Monthly Rent (Higher of ${settings.rent_minimum_amount} or ${settings.rent_percentage_rate}% of sales)`;
      }
      
      if (rentAmount > 0) {
        const rentItem = {
          item_type: `rent_${settings.rent_type}`,
          description,
          calculation_method: settings.rent_type,
          fixed_amount: settings.rent_type === 'fixed' ? rentAmount : null,
          percentage_rate: settings.rent_type !== 'fixed' ? settings.rent_percentage_rate : null,
          minimum_amount: settings.rent_type === 'combined' ? settings.rent_minimum_amount : null,
          calculated_amount: rentAmount,
          tax_rate: settings.tax_rate,
          tax_amount: rentAmount * (settings.tax_rate / 100),
          total_amount: rentAmount * (1 + settings.tax_rate / 100)
        };
        items.push(rentItem);
        totalAmount += rentItem.total_amount;
      }
    }
    
    // Additional fees from JSON configuration
    if (settings.additional_fees && Array.isArray(settings.additional_fees)) {
      settings.additional_fees.forEach(fee => {
        const feeItem = {
          item_type: fee.type || 'other',
          description: fee.description,
          calculation_method: 'fixed',
          fixed_amount: fee.amount,
          calculated_amount: fee.amount,
          tax_rate: fee.tax_rate || settings.tax_rate,
          tax_amount: fee.amount * ((fee.tax_rate || settings.tax_rate) / 100),
          total_amount: fee.amount * (1 + (fee.tax_rate || settings.tax_rate) / 100)
        };
        items.push(feeItem);
        totalAmount += feeItem.total_amount;
      });
    }
    
    // Create invoice
    const invoice = await Invoice.create({
      restaurant_id,
      invoice_number: invoiceNumber,
      type: 'automatic',
      billing_period_start: billingStart,
      billing_period_end: billingEnd,
      due_date: dueDate,
      total_amount: totalAmount,
      status: 'pending_payment',
      notes: settings.notes_template,
      issued_by: 0, // System generated
      issued_at: new Date()
    });
    
    // Create invoice items
    if (items.length > 0) {
      const invoiceItems = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }));
      await InvoiceItem.bulkCreate(invoiceItems);
    }
    
    res.json({ success: true, invoice, items });
  } catch (error) {
    console.error('Error generating automatic invoice:', error);
    res.status(500).json({ error: 'Failed to generate automatic invoice' });
  }
});

// Update an invoice
router.put('/:invoiceId', authenticateToken, async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const {
      amount,
      tax,
      total,
      dueDate,
      status,
      payerType,
      payerId,
      items
    } = req.body;

    console.log('🔄 Updating invoice:', invoiceId, {
      amount,
      tax,
      total,
      dueDate,
      status,
      payerType,
      payerId
    });

    // Find the invoice
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Update invoice fields
    const updateData = {
      total_amount: total,
      due_date: dueDate,
      status: status,
      payer_type: payerType,
      payer_id: payerId || null
    };

    await invoice.update(updateData);

    // Update invoice items if provided
    if (items && items.length > 0) {
      // Delete existing items
      await InvoiceItem.destroy({
        where: { invoice_id: invoiceId }
      });

      // Create new items
      const invoiceItems = items.map(item => ({
        invoice_id: invoiceId,
        description: item.description,
        calculated_amount: item.unitPrice || amount,
        tax_amount: tax,
        total_amount: item.total || total
      }));

      await InvoiceItem.bulkCreate(invoiceItems);
    }

    console.log('✅ Invoice updated successfully:', invoiceId);
    res.json({ success: true, message: 'Invoice updated successfully' });

  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

// ============================================
// Payment Flow APIs (Submit, Confirm, Reject)
// ============================================

// Submit payment for an invoice (by payer - restaurant, brand manager, foodcourt manager)
router.post('/:id/submit-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      payment_method,
      payment_provider,
      payment_intent_id,
      receipt_url,
      notes
    } = req.body;

    console.log(`💸 POST /api/invoices/${id}/submit-payment - User: ${req.user.email}`);

    const invoice = await Invoice.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurant'
      }]
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check if invoice is in payable state
    if (invoice.status !== 'pending_payment' && invoice.status !== 'rejected') {
      return res.status(400).json({
        error: `Cannot submit payment for invoice with status: ${invoice.status}`
      });
    }

    // Verify user has permission to pay this invoice
    const canPay = await checkPaymentPermission(req.user, invoice);
    if (!canPay) {
      return res.status(403).json({ error: 'You do not have permission to pay this invoice' });
    }

    // Update invoice with payment submission
    await invoice.update({
      status: 'payment_submitted',
      payment_method: payment_method || 'bank_transfer',
      payment_provider: payment_provider || null,
      payment_intent_id: payment_intent_id || null,
      receipt_url: receipt_url || null,
      payment_notes: notes || null,
      payment_submitted_at: new Date(),
      rejection_reason: null // Clear any previous rejection
    });

    console.log(`✅ Payment submitted for invoice ${invoice.invoice_number}`);

    res.json({
      success: true,
      message: 'Payment submitted successfully. Awaiting confirmation.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error submitting payment:', error);
    res.status(500).json({ error: 'Failed to submit payment' });
  }
});

// Confirm payment for an invoice (by issuer - system admin, brand general, foodcourt general)
router.post('/:id/confirm-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    console.log(`✅ POST /api/invoices/${id}/confirm-payment - User: ${req.user.email}`);

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check if invoice is in confirmable state
    if (invoice.status !== 'payment_submitted') {
      return res.status(400).json({
        error: `Cannot confirm payment for invoice with status: ${invoice.status}. Expected: payment_submitted`
      });
    }

    // Verify user has permission to confirm this invoice
    const canConfirm = await checkConfirmPermission(req.user, invoice);
    if (!canConfirm) {
      return res.status(403).json({ error: 'You do not have permission to confirm this invoice' });
    }

    // Update invoice as paid
    await invoice.update({
      status: 'paid',
      paid_at: new Date(),
      paid_amount: invoice.total_amount,
      confirmed_by: req.user.id,
      confirmed_at: new Date(),
      payment_notes: notes ? `${invoice.payment_notes || ''}\n[Confirmation note]: ${notes}` : invoice.payment_notes
    });

    console.log(`✅ Payment confirmed for invoice ${invoice.invoice_number} by user ${req.user.id}`);

    res.json({
      success: true,
      message: 'Payment confirmed successfully.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
});

// Reject payment for an invoice (by issuer - system admin, brand general, foodcourt general)
router.post('/:id/reject-payment', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    console.log(`❌ POST /api/invoices/${id}/reject-payment - User: ${req.user.email}`);

    if (!reason || reason.trim() === '') {
      return res.status(400).json({ error: 'Rejection reason is required' });
    }

    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Check if invoice is in rejectable state
    if (invoice.status !== 'payment_submitted') {
      return res.status(400).json({
        error: `Cannot reject payment for invoice with status: ${invoice.status}. Expected: payment_submitted`
      });
    }

    // Verify user has permission to reject this invoice
    const canReject = await checkConfirmPermission(req.user, invoice);
    if (!canReject) {
      return res.status(403).json({ error: 'You do not have permission to reject this invoice' });
    }

    // Update invoice back to pending with rejection reason
    await invoice.update({
      status: 'pending_payment',
      rejection_reason: reason,
      payment_submitted_at: null
    });

    console.log(`❌ Payment rejected for invoice ${invoice.invoice_number} by user ${req.user.id}. Reason: ${reason}`);

    res.json({
      success: true,
      message: 'Payment rejected. Invoice returned to pending status.',
      invoice: await Invoice.findByPk(id)
    });
  } catch (error) {
    console.error('Error rejecting payment:', error);
    res.status(500).json({ error: 'Failed to reject payment' });
  }
});

// Get invoices by issuer (for brand/foodcourt to see invoices they issued)
router.get('/issued-by/:issuerType/:issuerId', authenticateToken, async (req, res) => {
  try {
    const { issuerType, issuerId } = req.params;
    console.log(`📋 GET /api/invoices/issued-by/${issuerType}/${issuerId} - User: ${req.user.email}`);

    // Validate issuer type
    if (!['system_admin', 'brand', 'foodcourt'].includes(issuerType)) {
      return res.status(400).json({ error: 'Invalid issuer type' });
    }

    // Check permission
    if (req.user.role !== 'System Admin') {
      if (issuerType === 'brand') {
        const brand = await Brand.findByPk(issuerId);
        if (!brand || brand.owner_id !== req.user.id) {
          return res.status(403).json({ error: 'Access denied' });
        }
      } else if (issuerType === 'foodcourt') {
        const foodcourt = await Foodcourt.findByPk(issuerId);
        if (!foodcourt || foodcourt.owner_id !== req.user.id) {
          return res.status(403).json({ error: 'Access denied' });
        }
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    const whereClause = {
      issuer_type: issuerType
    };

    if (issuerType !== 'system_admin') {
      whereClause.issuer_id = issuerId;
    }

    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'manager_name', 'plan_type']
      }, {
        model: InvoiceItem,
        as: 'items'
      }],
      order: [['createdAt', 'DESC']]
    });

    // Transform for frontend
    const transformedInvoices = invoices.map(invoice => ({
      id: invoice.id.toString(),
      invoiceNumber: invoice.invoice_number,
      restaurantId: invoice.restaurant_id?.toString(),
      restaurantName: invoice.restaurant?.name || 'Unknown',
      issueDate: invoice.issued_at || invoice.createdAt,
      dueDate: invoice.due_date,
      paidDate: invoice.paid_at,
      status: invoice.status,
      currency: invoice.currency || 'MYR',
      total: parseFloat(invoice.total_amount),
      paymentSubmittedAt: invoice.payment_submitted_at,
      rejectionReason: invoice.rejection_reason,
      confirmedAt: invoice.confirmed_at,
      confirmedBy: invoice.confirmed_by
    }));

    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching issued invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Get invoices to pay (for brand/foodcourt managers to see invoices they need to pay)
router.get('/to-pay', authenticateToken, async (req, res) => {
  try {
    console.log(`💳 GET /api/invoices/to-pay - User: ${req.user.email} (${req.user.role})`);

    let whereClause = {};

    // System Admin sees all
    if (req.user.role === 'System Admin') {
      // Return all invoices for monitoring
    }
    // Brand General/Manager sees invoices issued by system admin to their brand
    else if (req.user.role === 'Brand General' || req.user.role === 'Brand Manager') {
      const brand = await Brand.findOne({ where: { owner_id: req.user.id } });
      if (!brand) {
        return res.json([]);
      }
      whereClause = {
        issuer_type: 'system_admin',
        payer_type: 'brand',
        payer_id: brand.id
      };
    }
    // Foodcourt General/Manager sees invoices issued by system admin to their foodcourt
    else if (req.user.role === 'Foodcourt General' || req.user.role === 'Foodcourt Manager') {
      const foodcourt = await Foodcourt.findOne({ where: { owner_id: req.user.id } });
      if (!foodcourt) {
        return res.json([]);
      }
      whereClause = {
        issuer_type: 'system_admin',
        payer_type: 'foodcourt',
        payer_id: foodcourt.id
      };
    }
    // Restaurant Admin sees invoices for their restaurant
    else if (req.user.role === 'Restaurant Admin') {
      const restaurant = await Restaurant.findOne({ where: { manager_id: req.user.id } });
      if (!restaurant) {
        return res.json([]);
      }
      whereClause = {
        restaurant_id: restaurant.id
      };
    }
    else {
      return res.status(403).json({ error: 'Access denied' });
    }

    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'manager_name']
      }, {
        model: InvoiceItem,
        as: 'items'
      }],
      order: [['createdAt', 'DESC']]
    });

    // Transform for frontend
    const transformedInvoices = invoices.map(invoice => ({
      id: invoice.id.toString(),
      invoiceNumber: invoice.invoice_number,
      restaurantId: invoice.restaurant_id?.toString(),
      restaurantName: invoice.restaurant?.name || 'Unknown',
      issueDate: invoice.issued_at || invoice.createdAt,
      dueDate: invoice.due_date,
      paidDate: invoice.paid_at,
      status: invoice.status,
      currency: invoice.currency || 'MYR',
      total: parseFloat(invoice.total_amount),
      issuerType: invoice.issuer_type,
      paymentSubmittedAt: invoice.payment_submitted_at,
      rejectionReason: invoice.rejection_reason
    }));

    res.json(transformedInvoices);
  } catch (error) {
    console.error('Error fetching invoices to pay:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

// Helper function: Check if user can pay this invoice
async function checkPaymentPermission(user, invoice) {
  // System Admin can pay any invoice (for testing/support)
  if (user.role === 'System Admin') {
    return true;
  }

  // Restaurant Admin can pay invoices for their restaurant
  if (user.role === 'Restaurant Admin') {
    const restaurant = await Restaurant.findOne({ where: { manager_id: user.id } });
    return restaurant && invoice.restaurant_id === restaurant.id;
  }

  // Brand General/Manager can pay invoices where they are the payer
  if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    const brand = await Brand.findOne({ where: { owner_id: user.id } });
    return brand && invoice.payer_type === 'brand' && invoice.payer_id === brand.id;
  }

  // Foodcourt General/Manager can pay invoices where they are the payer
  if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
    const foodcourt = await Foodcourt.findOne({ where: { owner_id: user.id } });
    return foodcourt && invoice.payer_type === 'foodcourt' && invoice.payer_id === foodcourt.id;
  }

  return false;
}

// Helper function: Check if user can confirm/reject this invoice
async function checkConfirmPermission(user, invoice) {
  // System Admin can confirm any invoice
  if (user.role === 'System Admin') {
    return true;
  }

  // Brand General can confirm invoices they issued
  if (user.role === 'Brand General') {
    const brand = await Brand.findOne({ where: { owner_id: user.id } });
    return brand && invoice.issuer_type === 'brand' && invoice.issuer_id === brand.id;
  }

  // Foodcourt General can confirm invoices they issued
  if (user.role === 'Foodcourt General') {
    const foodcourt = await Foodcourt.findOne({ where: { owner_id: user.id } });
    return foodcourt && invoice.issuer_type === 'foodcourt' && invoice.issuer_id === foodcourt.id;
  }

  return false;
}

// Update payer for unpaid invoices when payment_model changes
router.put('/update-payer/:restaurantId', authenticateToken, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { payment_model } = req.body;

    console.log(`💰 Updating payer for unpaid invoices of restaurant ${restaurantId} to ${payment_model}`);

    // Get restaurant with brand/foodcourt info
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    // Determine new payer based on payment_model
    let newPayerType = 'restaurant';
    let newPayerId = null;

    if (payment_model === 'brand_manager' && restaurant.brand_id) {
      const brand = await Brand.findByPk(restaurant.brand_id);
      if (brand && brand.owner_id) {
        newPayerType = 'brand_manager';
        newPayerId = brand.owner_id;
      }
    } else if (payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
      const foodcourt = await Foodcourt.findByPk(restaurant.foodcourt_id);
      if (foodcourt && foodcourt.owner_id) {
        newPayerType = 'foodcourt_manager';
        newPayerId = foodcourt.owner_id;
      }
    }

    // Update all unpaid invoices (pending_payment, overdue, draft)
    const unpaidStatuses = ['draft', 'pending_payment', 'overdue'];
    const [updatedCount] = await Invoice.update(
      {
        payer_type: newPayerType,
        payer_id: newPayerId
      },
      {
        where: {
          restaurant_id: restaurantId,
          status: unpaidStatuses
        }
      }
    );

    console.log(`✅ Updated ${updatedCount} unpaid invoices to payer_type: ${newPayerType}`);

    res.json({
      success: true,
      message: `Updated ${updatedCount} unpaid invoices`,
      updatedCount,
      newPayerType,
      newPayerId
    });
  } catch (error) {
    console.error('Error updating invoice payers:', error);
    res.status(500).json({ error: 'Failed to update invoice payers' });
  }
});

// Send invoice via email
router.post('/:id/send-email', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { recipientEmail } = req.body;

    if (!recipientEmail || !recipientEmail.includes('@')) {
      return res.status(400).json({ error: 'Valid recipient email is required' });
    }

    // Get the invoice
    const invoice = await Invoice.findByPk(id, {
      include: [{
        model: Restaurant,
        as: 'restaurant',
        attributes: ['id', 'name', 'manager_id', 'manager_name', 'plan_type', 'email']
      }, {
        model: InvoiceItem,
        as: 'items'
      }]
    });

    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Get company settings for the invoice
    const companySettings = await CompanySettings.findOne({ where: { id: 1 } });
    const bankInfo = await getBankInfoByCurrency(invoice.currency || 'MYR');

    // For now, return a message that email sending is not configured
    // This can be implemented later when system-level SMTP is set up
    // TODO: Implement actual email sending with system SMTP settings

    console.log(`📧 Invoice email request: ${invoice.invoice_number} to ${recipientEmail}`);

    // Placeholder response - email functionality to be implemented
    res.json({
      success: true,
      message: `Invoice ${invoice.invoice_number} email request received for ${recipientEmail}. Email sending will be available once SMTP is configured.`,
      invoiceNumber: invoice.invoice_number,
      recipient: recipientEmail
    });

  } catch (error) {
    console.error('Error sending invoice email:', error);
    res.status(500).json({ error: 'Failed to send invoice email' });
  }
});

module.exports = router;