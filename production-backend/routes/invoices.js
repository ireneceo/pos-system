const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const InvoiceSettings = require('../models/InvoiceSettings');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const CompanySettings = require('../models/CompanySettings');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');

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
router.get('/invoice-settings', async (req, res) => {
  try {
    const companySettings = await CompanySettings.findOne({
      where: { id: 1 } // System admin company settings
    });

    if (!companySettings) {
      return res.status(404).json({ error: 'Company settings not found' });
    }

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
        registrationNumber: companySettings.registration_number
      }
    });
  } catch (error) {
    console.error('Error fetching company settings:', error);
    res.status(500).json({ error: 'Failed to fetch company settings' });
  }
});

// Get all invoices for admin (system-wide overview)
router.get('/', async (req, res) => {
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
      order: [['createdAt', 'DESC']]
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
        amount: parseFloat(invoice.total_amount) - parseFloat(invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
        tax: parseFloat(invoice.items?.reduce((sum, item) => sum + parseFloat(item.tax_amount || 0), 0) || 0),
        total: parseFloat(invoice.total_amount),
        items: invoice.items?.map(item => ({
          description: item.description,
          quantity: 1,
          unitPrice: parseFloat(item.calculated_amount),
          total: parseFloat(item.total_amount)
        })) || [],
        billingPeriod: `${new Date(invoice.billing_period_start).toLocaleDateString()} - ${new Date(invoice.billing_period_end).toLocaleDateString()}`,
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
router.get('/manager/:managerId', async (req, res) => {
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

// Get invoice details with items
router.get('/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    const items = await InvoiceItem.findAll({
      where: { invoice_id: req.params.id }
    });
    
    res.json({ invoice, items });
  } catch (error) {
    console.error('Error fetching invoice details:', error);
    res.status(500).json({ error: 'Failed to fetch invoice details' });
  }
});

// Create new invoice (manual)
router.post('/', async (req, res) => {
  console.log('POST /api/invoices called with:', JSON.stringify(req.body, null, 2));
  try {
    const { invoice_data, items } = req.body;
    
    // Calculate total amount from items if not provided
    if (!invoice_data.total_amount && items && items.length > 0) {
      invoice_data.total_amount = items.reduce((sum, item) => sum + (parseFloat(item.total_amount) || 0), 0);
    }
    
    // Debug logging
    console.log('Invoice data before creation:', JSON.stringify(invoice_data, null, 2));
    
    // Generate invoice number
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const count = await Invoice.count({
      where: {
        invoice_number: {
          [Op.like]: `${invoice_data.invoice_prefix || 'INV'}-${year}${month}%`
        }
      }
    });
    
    invoice_data.invoice_number = `${invoice_data.invoice_prefix || 'INV'}-${year}${month}${String(count + 1).padStart(4, '0')}`;
    
    // Create invoice
    const invoice = await Invoice.create(invoice_data);
    
    // Create invoice items
    if (items && items.length > 0) {
      const invoiceItems = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }));
      await InvoiceItem.bulkCreate(invoiceItems);
    }
    
    res.status(201).json({ success: true, invoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// Update invoice status
router.patch('/:id/status', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
router.get('/settings/:restaurantId', async (req, res) => {
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
router.put('/settings/:restaurantId', async (req, res) => {
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
router.post('/generate-for-subscriptions', async (req, res) => {
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
        // Calculate billing period - issued on 1st day of each month for that month
        const now = new Date();
        const issueDate = new Date(now.getFullYear(), now.getMonth(), 1); // 1st of current month
        const billingStart = new Date(now.getFullYear(), now.getMonth(), 1); // 1st of current month
        const billingEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month
        const dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Due at end of current month

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

        // Calculate amounts based on plan
        const planAmount = parseFloat(restaurant.plan_amount || 29);
        const taxRate = 0.06; // 6% tax
        const taxAmount = planAmount * taxRate;
        const totalAmount = planAmount + taxAmount;

        // Create invoice
        const invoice = await Invoice.create({
          restaurant_id: restaurant.id,
          invoice_number: invoiceNumber,
          type: 'automatic',
          billing_period_start: billingStart,
          billing_period_end: billingEnd,
          due_date: dueDate,
          total_amount: totalAmount,
          status: 'pending_payment', // Auto-send subscription invoices
          notes: `Monthly subscription invoice for ${restaurant.plan_type}`,
          issued_by: 0, // System generated
          issued_at: issueDate
        });

        // Create invoice item
        await InvoiceItem.create({
          invoice_id: invoice.id,
          item_type: 'subscription',
          description: `${restaurant.plan_type} - Monthly Subscription`,
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
          amount: totalAmount
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
router.post('/generate-automatic', async (req, res) => {
  try {
    const { restaurant_id } = req.body;
    
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
router.put('/:invoiceId', async (req, res) => {
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

module.exports = router;