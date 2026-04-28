// 레스토랑 구독/결제 관련 라우트
// 마운트: /api/restaurants

const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const PlanTemplate = require('../models/PlanTemplate');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AddonModule = require('../models/AddonModule');
const { Recipe, Ingredient, RecipeIngredient } = require('../models');
const CompanySettings = require('../models/CompanySettings');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
const { validateRestaurantCreation } = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const { getTodayBounds, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { deleteOldImages } = require('../utils/imageProcessor');

router.get('/subscription-status', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    let status = { subscriptionStatus: 'active', overdueAmount: 0, daysOverdue: 0, hasInvoice: false };

    // Demo/test accounts: always active, skip all checks
    const fullUser = await User.findByPk(user.id);
    if (fullUser?.is_demo) {
      return res.json({ success: true, data: status });
    }

    // Determine entity based on role
    if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
      const restaurant = await Restaurant.findByPk(user.restaurant_id);
      if (restaurant) {
        const overdueInvoice = await Invoice.findOne({
          where: { restaurant_id: restaurant.id, status: { [Op.in]: ['pending', 'overdue'] }, invoice_category: { [Op.in]: ['subscription', 'pos_subscription'] } },
          order: [['due_date', 'ASC']]
        });
        const daysOverdue = overdueInvoice && overdueInvoice.due_date < new Date()
          ? Math.floor((Date.now() - new Date(overdueInvoice.due_date).getTime()) / (1000 * 60 * 60 * 24))
          : 0;
        status = {
          subscriptionStatus: restaurant.status,
          overdueAmount: overdueInvoice ? parseFloat(overdueInvoice.total_amount) : 0,
          daysOverdue,
          hasInvoice: !!overdueInvoice,
          currency: restaurant.currency || 'MYR',
          trialEndDate: restaurant.trial_end_date,
          planType: restaurant.plan_type,
          pendingChange: restaurant.pending_plan_type ? {
            planType: restaurant.pending_plan_type,
            planAmount: parseFloat(restaurant.pending_plan_amount),
            billingCycle: restaurant.pending_billing_cycle,
            changeType: restaurant.plan_change_type,
            effectiveDate: restaurant.plan_change_date
          } : null
        };
      }
    } else if (user.role === 'Brand General' || user.role === 'Brand Manager') {
      // Subscription data is on users table
      const fullUser = await User.findByPk(user.id);
      if (fullUser) {
        const overdueInvoice = await Invoice.findOne({
          where: { payer_type: 'brand_manager', payer_id: user.id, status: { [Op.in]: ['pending', 'overdue', 'pending_payment'] }, invoice_category: { [Op.in]: ['subscription', 'pos_subscription'] } },
          order: [['due_date', 'ASC']]
        });
        const daysOverdue = overdueInvoice && overdueInvoice.due_date < new Date()
          ? Math.floor((Date.now() - new Date(overdueInvoice.due_date).getTime()) / (1000 * 60 * 60 * 24))
          : 0;
        status = {
          subscriptionStatus: fullUser.subscription_status || 'active',
          overdueAmount: overdueInvoice ? parseFloat(overdueInvoice.total_amount) : 0,
          daysOverdue,
          hasInvoice: !!overdueInvoice,
          currency: fullUser.currency || 'MYR',
          trialEndDate: fullUser.trial_end_date,
          planType: fullUser.plan_type,
          pendingChange: fullUser.pending_plan_type ? {
            planType: fullUser.pending_plan_type,
            planAmount: parseFloat(fullUser.pending_plan_amount),
            billingCycle: fullUser.pending_billing_cycle,
            changeType: fullUser.plan_change_type,
            effectiveDate: fullUser.plan_change_date
          } : null
        };
      }
    } else if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
      // Subscription data is on users table
      const fullUser = await User.findByPk(user.id);
      if (fullUser) {
        const overdueInvoice = await Invoice.findOne({
          where: { payer_type: 'foodcourt_manager', payer_id: user.id, status: { [Op.in]: ['pending', 'overdue', 'pending_payment'] }, invoice_category: { [Op.in]: ['subscription', 'pos_subscription'] } },
          order: [['due_date', 'ASC']]
        });
        const daysOverdue = overdueInvoice && overdueInvoice.due_date < new Date()
          ? Math.floor((Date.now() - new Date(overdueInvoice.due_date).getTime()) / (1000 * 60 * 60 * 24))
          : 0;
        status = {
          subscriptionStatus: fullUser.subscription_status || 'active',
          overdueAmount: overdueInvoice ? parseFloat(overdueInvoice.total_amount) : 0,
          daysOverdue,
          hasInvoice: !!overdueInvoice,
          currency: fullUser.currency || 'MYR',
          trialEndDate: fullUser.trial_end_date,
          planType: fullUser.plan_type,
          pendingChange: fullUser.pending_plan_type ? {
            planType: fullUser.pending_plan_type,
            planAmount: parseFloat(fullUser.pending_plan_amount),
            billingCycle: fullUser.pending_billing_cycle,
            changeType: fullUser.plan_change_type,
            effectiveDate: fullUser.plan_change_date
          } : null
        };
      }
    } else if (user.role === 'Restaurant Owner') {
      const overdueInvoice = await Invoice.findOne({
        where: { payer_id: user.id, payer_type: 'restaurant_owner', status: { [Op.in]: ['pending', 'overdue'] }, invoice_category: { [Op.in]: ['subscription', 'pos_subscription'] } },
        order: [['due_date', 'ASC']]
      });
      const daysOverdue = overdueInvoice && overdueInvoice.due_date < new Date()
        ? Math.floor((Date.now() - new Date(overdueInvoice.due_date).getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      const ownerUser = await User.findByPk(user.id);
      status = {
        subscriptionStatus: ownerUser?.subscription_status || user.subscription_status || 'active',
        overdueAmount: overdueInvoice ? parseFloat(overdueInvoice.total_amount) : 0,
        daysOverdue,
        hasInvoice: !!overdueInvoice,
        currency: ownerUser?.currency || 'MYR',
        trialEndDate: ownerUser?.trial_end_date || user.trial_end_date,
        planType: ownerUser?.plan_type || user.plan_type,
        pendingChange: ownerUser?.pending_plan_type ? {
          planType: ownerUser.pending_plan_type,
          planAmount: parseFloat(ownerUser.pending_plan_amount),
          billingCycle: ownerUser.pending_billing_cycle,
          changeType: ownerUser.plan_change_type,
          effectiveDate: ownerUser.plan_change_date
        } : null
      };
    }

    res.json({ success: true, ...status });
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscription status' });
  }
});


router.get('/subscriptions/manager/:managerId', authenticateToken, async (req, res) => {
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
        autoRenew: restaurant.auto_renew !== undefined && restaurant.auto_renew !== null ? restaurant.auto_renew : restaurant.status === 'active',
        location: restaurant.address || 'No address provided',
        discountType: restaurant.discount_type || 'none',
        discountValue: parseFloat(restaurant.discount_value) || 0,
        discountReason: restaurant.discount_reason || ''
      };
    });

    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching manager subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch manager subscriptions' });
  }
});

// POST /api/restaurants/:id/restore-subscription — System Admin restores a suspended/overdue restaurant
router.post('/:id/restore-subscription', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Only System Admin can restore subscriptions' });
    }

    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    const previousStatus = restaurant.status;
    if (!['suspended', 'overdue'].includes(previousStatus)) {
      return res.json({ success: true, message: `Restaurant is already ${previousStatus}` });
    }

    await restaurant.update({
      status: 'active',
      grace_period_start: null
    });

    console.log(`✓ [ADMIN] Subscription restored: ${restaurant.name} (${previousStatus} → active)`);

    res.json({
      success: true,
      message: `Subscription restored: ${previousStatus} → active`,
      data: { id: restaurant.id, name: restaurant.name, previousStatus, newStatus: 'active' }
    });
  } catch (error) {
    console.error('Error restoring subscription:', error);
    res.status(500).json({ success: false, message: 'Failed to restore subscription' });
  }
});

// POST /api/restaurants/:id/generate-invoice — System Admin manually generates a subscription invoice
router.post('/:id/generate-invoice', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'System Admin') {
      return res.status(403).json({ success: false, message: 'Only System Admin can generate invoices' });
    }

    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    if (!restaurant.plan_type || !restaurant.subscription_start) {
      return res.status(400).json({ success: false, message: 'Restaurant has no active subscription plan' });
    }

    const invoiceScheduler = require('../services/invoiceScheduler');
    const billingCycle = restaurant.billing_cycle || 'monthly';
    const now = new Date();
    const billingStart = new Date(now);
    const billingEnd = billingCycle === 'annual'
      ? new Date(now.getFullYear() + 1, now.getMonth(), now.getDate() - 1)
      : new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() - 1);

    await invoiceScheduler.createSubscriptionInvoice(restaurant, billingStart, billingEnd, billingCycle);

    console.log(`✓ [ADMIN] Manual invoice generated for: ${restaurant.name}`);

    res.json({
      success: true,
      message: `Invoice generated for ${restaurant.name}`,
      data: { restaurantId: restaurant.id, billingCycle, billingStart, billingEnd }
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ success: false, message: 'Failed to generate invoice' });
  }
});

// Add new subscription for restaurant
router.post('/subscriptions', authenticateToken, async (req, res) => {
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

    // Create invoice item — header recalc below makes tax_amount=0 (Path B)
    await require('../models/InvoiceItem').create({
      invoice_id: invoice.id,
      item_type: 'subscription',
      description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${billingCycle} Subscription`,
      calculation_method: 'fixed',
      fixed_amount: billingCycle === 'annual' ? fees.annual : fees.monthly,
      calculated_amount: billingCycle === 'annual' ? fees.annual : fees.monthly,
      tax_rate: 6.0,
      tax_amount: 0,
      total_amount: billingCycle === 'annual' ? fees.annual : fees.monthly
    });

    // Persist tax as additional_charges so the recompute helper preserves it.
    const taxAmt = Math.round((billingCycle === 'annual' ? fees.annual : fees.monthly) * 0.06 * 100) / 100;
    await invoice.update({ additional_charges: [{ name: 'SST', rate: 6, amount: taxAmt }] });

    const { finalizeInvoice } = require('../utils/invoiceCalculation');
    await finalizeInvoice(invoice.id);

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

        const restaurantTz = getRestaurantTimezone(restaurant);
        const formatDate = (d) => new Date(d).toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric', timeZone: restaurantTz });

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
          currency: restaurant.currency || 'MYR',
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

module.exports = router;
