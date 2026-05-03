// list/get only — split from invoices-main.js (2026-05-03)
// 마운트: routes/invoices.js barrel via app.use('/api/invoices', ...)
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
const RestaurantManager = require('../models/RestaurantManager');
const { Op } = require('sequelize');
const invoiceScheduler = require('../services/invoiceScheduler');
const subscriptionScheduler = require('../services/subscriptionScheduler');

const PAYMENT_SETTINGS_KEY = 'payment_settings';

const { authenticateToken, checkRestaurantAccess, getManagerScope } = require('../middleware/auth');
const InvoiceCategory = require('../models/InvoiceCategory');
const { normalizeAdditionalCharges, getAvailablePaymentMethods } = require('../utils/paymentSettingsHelper');
const { sendNotification, sendNotificationBatch, getSystemAdminIds, getBrandManagerIds, getFoodcourtManagerIds } = require('../utils/notificationService');
const { invoicePaidEmail } = require('../utils/notificationTemplates');
const { logActivity } = require('../utils/activityLogger');
const {
  generateInvoiceNumber,
  getAdditionalCharges,
  calculateAdditionalCharges,
  getBankInfoByCurrency,
  getIssuerCompanyInfo,
  getPayerCompanyInfo,
  formatBillingPeriod,
  getInvoiceTimezone,
  getCategoryDisplayName,
  checkPaymentPermission,
  checkConfirmPermission,
} = require('./invoices-helpers');
const { invoiceInBranch } = require('./invoices-helpers');

router.post('/generate-for-subscriptions', authenticateToken, async (req, res) => {
  try {
    // Get all active restaurants with subscriptions
    const restaurants = await Restaurant.findAll({
      where: {
        status: 'active',
        subscription_start: { [Op.not]: null },
        subscription_end: { [Op.gte]: new Date() } // Active subscriptions
      }
    });
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
          continue;
        }

        // Generate invoice number (system_admin issuer for auto-generated invoices)
        const invoiceNumber = await generateInvoiceNumber('system_admin', null, null);

        // Determine restaurant's currency (convert RM to MYR)
        let currency = restaurant.currency || 'MYR';
        if (currency === 'RM') currency = 'MYR';

        // Validate: System Admin has payment methods for this currency
        const { hasPaymentMethodForCurrency: hasMethod } = require('../utils/paymentSettingsHelper');
        const sysPaySettings = await SystemSettings.findOne({ where: { setting_key: 'payment_settings' } });
        if (!hasMethod(sysPaySettings?.setting_value || {}, currency)) {
          errors.push({ restaurant: restaurant.name, error: `No payment methods configured for ${currency}` });
          continue;
        }

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

        // Create invoice with currency - include site name for clarity
        const companyInfo = await CompanySettings.findOne({ where: { id: 1 }, attributes: ['site_name'] });
        const siteName = companyInfo?.site_name || 'POS';
        const categoryDisplayName = `${siteName} - ${restaurant.plan_type} (${cycleText})`;
        const invoice = await Invoice.create({
          restaurant_id: restaurant.id,
          invoice_number: invoiceNumber,
          type: 'automatic',
          invoice_category: 'subscription',
          category_display_name: categoryDisplayName,
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
    res.status(500).json({ success: false, error: { message: 'Failed to generate subscription invoices', code: 'INTERNAL_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: 'Auto-generation not enabled for this restaurant', code: 'VALIDATION_ERROR' } });
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
      return res.status(400).json({ success: false, error: { message: 'Invoice already exists for this period', code: 'VALIDATION_ERROR' } });
    }
    
    // Generate invoice number (system_admin issuer for settings-based auto invoices)
    const invoiceNumber = await generateInvoiceNumber('system_admin', null, null);
    
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
    res.status(500).json({ success: false, error: { message: 'Failed to generate automatic invoice', code: 'INTERNAL_ERROR' } });
  }
});

// (Removed duplicate PUT /:invoiceId - use PUT /:id above which handles discount, modification history, and transactions)

// ============================================
// Payment Flow APIs (Submit, Confirm, Reject)
// ============================================

// Create Stripe PaymentIntent for an invoice

router.post('/generate-missing/:restaurantId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { fromDate } = req.body;
    const result = await invoiceScheduler.generateMissingInvoices(restaurantId, fromDate);

    if (result.success) {
      res.json({
        success: true,
        message: `Generated ${result.generated.length} missing invoices`,
        generated: result.generated
      });
    } else {
      res.status(400).json({ error: result.error });
    }

  } catch (error) {
    console.error('Error generating missing invoices:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to generate missing invoices', code: 'INTERNAL_ERROR' } });
  }
});

// Trigger daily invoice generation manually (for testing)
router.post('/trigger-daily-generation', authenticateToken, async (req, res) => {
  try {
    await invoiceScheduler.generateSubscriptionInvoices();
    res.json({ success: true, message: 'Daily invoice generation triggered' });
  } catch (error) {
    console.error('Error triggering daily generation:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to trigger daily generation', code: 'INTERNAL_ERROR' } });
  }
});

// Bulk generate missing invoices for all active restaurants (System Admin)
router.post('/generate-missing-bulk', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'System Admin only' });
    }
    const subResult = await invoiceScheduler.generateSubscriptionInvoices();
    const entityResult = await invoiceScheduler.generateEntityPlanInvoices();
    const entitySubResult = await invoiceScheduler.generateEntitySubscriptionInvoices();

    const totalGenerated = (subResult.generated || 0) + (entityResult.generated || 0) + (entitySubResult.generated || 0);
    const totalSkipped = (subResult.skipped || 0) + (entityResult.skipped || 0) + (entitySubResult.skipped || 0);

    res.json({
      success: true,
      message: totalGenerated > 0
        ? `Generated ${totalGenerated} missing invoices (${subResult.generated || 0} restaurant, ${entityResult.generated || 0} entity plan, ${entitySubResult.generated || 0} entity subscription)`
        : 'No missing invoices found. All invoices are up to date.',
      subscription: subResult,
      entityPlan: entityResult,
      entitySubscription: entitySubResult,
      totalGenerated,
      totalSkipped
    });
  } catch (error) {
    console.error('Error bulk generating missing invoices:', error);
    res.status(500).json({ success: false, message: 'Failed to generate missing invoices' });
  }
});


module.exports = router;

module.exports = router;
