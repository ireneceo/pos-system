const express = require('express');
const router = express.Router();
const { Foodcourt, Restaurant, User, EntityPlan, EntityPlanRestaurant, EntityPlanPrice, Order, Invoice, InvoiceItem } = require('../models');
const { authenticateToken, requireRole } = require('../middleware/auth');
const { requireFoodcourtModule } = require('../middleware/requireModule');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcrypt');
const { deleteOldImages } = require('../utils/imageProcessor');

// foodcourt subscription/plans/plan-restaurants/prices/revenue/invoice-preview/generate-invoices/subscriptions list/sales-trend
// split from foodcourts.js (2026-05-03)

router.get('/:id/subscription', authenticateToken, requireFoodcourtModule('fc_subscriptions'), async (req, res) => {
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
      if (['active', 'trial'].includes(subscription_status) && ['suspended', 'overdue'].includes(foodcourt.subscription_status)) {
        foodcourt.grace_period_start = null;
      }
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
    console.log(`✓ Foodcourt subscription updated: ${foodcourt.name}`);

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
 * Calculate charges for a single plan (1 plan = 1 charge item)
 */
function calculatePlanCharges(plan, revenue, taxRate = 0, currency = null) {
  const items = [];
  let subtotal = 0;
  const taxRateDecimal = parseFloat(taxRate) / 100;
  const planCurrency = currency || plan.currency || 'MYR';

  if (plan.charge_type === 'fixed') {
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
  } else if (plan.charge_type === 'combined') {
    // Min-guarantee pattern — rent = MAX(EntityPlanPrice.monthly_price, percentage × revenue)
    const priceRecord = (plan.prices || []).find(p => p.currency === planCurrency);
    const fixedAmount = parseFloat(priceRecord?.monthly_price || 0);
    const rate = parseFloat(plan.percentage_value || 0);
    const percentageAmount = Math.round(revenue * rate / 100 * 100) / 100;
    const amount = Math.max(fixedAmount, percentageAmount);
    if (amount > 0) {
      const tax = Math.round(amount * taxRateDecimal * 100) / 100;
      items.push({
        item_type: 'combined_charge',
        description: `${plan.name} (MAX of ${planCurrency} ${fixedAmount.toLocaleString()} or ${rate}% × ${planCurrency} ${revenue.toLocaleString()})`,
        calculation_method: 'combined',
        fixed_amount: fixedAmount,
        percentage_rate: rate,
        base_amount: revenue,
        minimum_amount: fixedAmount,
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

// --- Foodcourt Plans CRUD ---

// GET /api/foodcourts/:id/plans - List all plans for a foodcourt
router.get('/:id/plans', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plans = await EntityPlan.findAll({
      where: { entity_type: 'foodcourt', entity_id: id },
      include: [
        { model: EntityPlanRestaurant, as: 'planRestaurants', required: false },
        { model: EntityPlanPrice, as: 'prices' },
        // Phase 2-F: reverse lookup to originating contracts (if any)
        {
          model: require('../models').ContractPlan, as: 'contractLinks', required: false,
          include: [{
            model: require('../models').Contract, as: 'contract',
            attributes: ['id', 'contract_number', 'stage', 'start_date', 'end_date', 'applicant_company_name']
          }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ success: true, data: plans });
  } catch (error) {
    console.error('Error fetching foodcourt plans:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plans' });
  }
});

// GET /api/foodcourts/:id/plans/:planId - Get single plan detail
router.get('/:id/plans/:planId', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'foodcourt', entity_id: id },
      include: [{
        model: EntityPlanRestaurant, as: 'planRestaurants',
        include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'status', 'email'] }]
      }, {
        model: EntityPlanPrice, as: 'prices'
      }, {
        // Phase 2-F: reverse lookup to originating contracts
        model: require('../models').ContractPlan, as: 'contractLinks', required: false,
        include: [{
          model: require('../models').Contract, as: 'contract',
          attributes: ['id', 'contract_number', 'stage', 'start_date', 'end_date', 'applicant_company_name']
        }]
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
router.post('/:id/plans', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    // Validate billing_day: -1 (end of month), 1-28, or null/empty
    const billingDay = req.body.billing_day;
    if (billingDay != null && billingDay !== '' && billingDay !== -1 && (billingDay < 1 || billingDay > 28)) {
      return res.status(400).json({ success: false, message: 'Billing day must be 1-28 or -1 (end of month)' });
    }

    // Validate plan currency against system supported currencies
    const planCurrency = req.body.currency || access.foodcourt.currency || 'MYR';
    const SystemSettings = require('../models/SystemSettings');
    const sysCurrSetting = await SystemSettings.findOne({ where: { setting_key: 'supported_currencies' } });
    const systemCurrencies = sysCurrSetting?.setting_value || ['USD', 'MYR', 'KRW'];
    if (!systemCurrencies.includes(planCurrency)) {
      return res.status(400).json({ success: false, message: `Currency ${planCurrency} is not supported by the system` });
    }

    const plan = await EntityPlan.create({
      entity_type: 'foodcourt',
      entity_id: id,
      name: req.body.name,
      description: req.body.description,
      charge_type: req.body.charge_type || 'fixed',
      percentage_value: req.body.charge_type === 'percentage' ? (req.body.percentage_value || 0) : 0,
      revenue_base: req.body.charge_type === 'percentage' ? (req.body.revenue_base || 'previous_month') : 'previous_month',
      billing_day: req.body.billing_day != null && req.body.billing_day !== '' ? parseInt(req.body.billing_day) : null,
      auto_generate: req.body.auto_generate !== false,
      currency: planCurrency,
      is_active: true,
      category: req.body.category || 'custom',
      is_popular: req.body.is_popular || false,
      features: req.body.features || [],
      included_modules: req.body.included_modules || [],
      menu_item_limit: req.body.menu_item_limit !== undefined ? req.body.menu_item_limit : -1,
      order_limit: req.body.order_limit !== undefined ? req.body.order_limit : -1,
      staff_limit: req.body.staff_limit !== undefined ? req.body.staff_limit : -1,
      created_by: req.user.id
    });

    // Save multi-currency prices if provided
    if (req.body.currency_prices && typeof req.body.currency_prices === 'object') {
      for (const [currCode, prices] of Object.entries(req.body.currency_prices)) {
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
      include: [
        { model: EntityPlanRestaurant, as: 'planRestaurants', required: false },
        { model: EntityPlanPrice, as: 'prices' }
      ]
    });

    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Error creating foodcourt plan:', error);
    res.status(500).json({ success: false, message: 'Failed to create plan' });
  }
});

// PUT /api/foodcourts/:id/plans/:planId - Update plan
router.put('/:id/plans/:planId', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({ where: { id: planId, entity_type: 'foodcourt', entity_id: id } });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    await plan.update({
      name: req.body.name ?? plan.name,
      description: req.body.description ?? plan.description,
      charge_type: req.body.charge_type ?? plan.charge_type,
      percentage_value: req.body.percentage_value ?? plan.percentage_value,
      revenue_base: req.body.revenue_base ?? plan.revenue_base,
      billing_day: req.body.billing_day !== undefined ? req.body.billing_day : plan.billing_day,
      auto_generate: req.body.auto_generate ?? plan.auto_generate,
      currency: req.body.currency ?? plan.currency,
      is_active: req.body.is_active ?? plan.is_active,
      category: req.body.category ?? plan.category,
      is_popular: req.body.is_popular ?? plan.is_popular,
      features: req.body.features !== undefined ? req.body.features : plan.features,
      included_modules: req.body.included_modules !== undefined ? req.body.included_modules : plan.included_modules,
      menu_item_limit: req.body.menu_item_limit ?? plan.menu_item_limit,
      order_limit: req.body.order_limit ?? plan.order_limit,
      staff_limit: req.body.staff_limit ?? plan.staff_limit
    });

    const updated = await EntityPlan.findByPk(planId, {
      include: [
        { model: EntityPlanRestaurant, as: 'planRestaurants', required: false },
        { model: EntityPlanPrice, as: 'prices' }
      ]
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating foodcourt plan:', error);
    res.status(500).json({ success: false, message: 'Failed to update plan' });
  }
});

// DELETE /api/foodcourts/:id/plans/:planId - Delete plan
router.delete('/:id/plans/:planId', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
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

    // Phase 2-F: protect plans that are still attached to an open contract.
    const { ContractPlan } = require('../models');
    const openContractLink = await ContractPlan.count({ where: { entity_plan_id: planId, end_at: null } });
    if (openContractLink > 0) {
      return res.status(400).json({ success: false, message: `Cannot delete plan attached to ${openContractLink} open contract(s). Renew or terminate the contract first.` });
    }

    await EntityPlanPrice.destroy({ where: { entity_plan_id: planId } });
    await plan.destroy();
    res.json({ success: true, message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting foodcourt plan:', error);
    res.status(500).json({ success: false, message: 'Failed to delete plan' });
  }
});

// --- Plan ↔ Restaurant Assignment ---

// GET /api/foodcourts/:id/plans/:planId/restaurants
router.get('/:id/plans/:planId/restaurants', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
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

// Helper: compute next billing date for a plan
function computeNextBillingDateFc(billingDay) {
  const today = new Date();
  const day = Math.max(1, Math.min(31, parseInt(billingDay || 1)));
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  if (month > 11) { year++; month = 0; }
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  const targetDay = Math.min(day, lastDayOfMonth);
  const next = new Date(year, month, targetDay);
  const yyyy = next.getFullYear();
  const mm = String(next.getMonth() + 1).padStart(2, '0');
  const dd = String(next.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// POST /api/foodcourts/:id/plans/:planId/restaurants - Assign restaurants
// Same "schedule-for-next-cycle" behavior as brand: different active plan → pending; no active plan → immediate
router.post('/:id/plans/:planId/restaurants', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'foodcourt', entity_id: id },
      include: [{ model: EntityPlanPrice, as: 'prices' }]
    });
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found' });

    const { restaurant_ids } = req.body;
    if (!restaurant_ids || !Array.isArray(restaurant_ids) || restaurant_ids.length === 0) {
      return res.status(400).json({ success: false, message: 'restaurant_ids array is required' });
    }

    // R2 (restaurant.foodcourt_id == plan.entity_id) used to block assignment here.
    // Removed: restaurant's foodcourt membership is flexible; plan assignment is
    // a billing record, not a constraint. See docs/ADDRESS_STANDARDIZATION.md §2 (retrospective).
    const restaurants = await Restaurant.findAll({
      where: { id: restaurant_ids },
      attributes: ['id', 'name', 'currency', 'foodcourt_id']
    });

    if (restaurants.length !== restaurant_ids.length) {
      return res.status(400).json({ success: false, message: 'One or more restaurants not found' });
    }

    const results = [];
    const currency_warnings = [];

    for (const restaurant of restaurants) {
      try {
        const restCurrency = restaurant.currency || 'MYR';
        if (plan.charge_type === 'fixed') {
          const priceRecord = (plan.prices || []).find(p => p.currency === restCurrency);
          if (!priceRecord || parseFloat(priceRecord.monthly_price || 0) <= 0) {
            currency_warnings.push({
              restaurant_id: restaurant.id,
              restaurant_name: restaurant.name,
              currency: restCurrency,
              message: `Plan "${plan.name}" has no pricing for ${restCurrency}. Please add pricing for this currency before generating invoices.`
            });
          }
        }

        // Any active EPR for this restaurant under this foodcourt's plans
        const existingActive = await EntityPlanRestaurant.findOne({
          where: { restaurant_id: restaurant.id, is_active: true },
          include: [{
            model: EntityPlan,
            as: 'plan',
            where: { entity_type: 'foodcourt', entity_id: id },
            required: true
          }]
        });

        if (existingActive && existingActive.entity_plan_id === parseInt(planId)) {
          await existingActive.update({ pending_plan_id: null, pending_activation_date: null });
          results.push({ restaurant_id: restaurant.id, status: 'already_assigned' });
        } else if (existingActive) {
          const effectiveDate = computeNextBillingDateFc(plan.billing_day);
          await existingActive.update({
            pending_plan_id: parseInt(planId),
            pending_activation_date: effectiveDate
          });
          results.push({
            restaurant_id: restaurant.id,
            status: 'scheduled',
            pending_plan_id: parseInt(planId),
            pending_activation_date: effectiveDate
          });
        } else {
          const [assignment, created] = await EntityPlanRestaurant.findOrCreate({
            where: { entity_plan_id: planId, restaurant_id: restaurant.id },
            defaults: { is_active: true, activation_date: new Date() }
          });
          if (!created && !assignment.is_active) {
            await assignment.update({ is_active: true, activation_date: new Date(), pending_plan_id: null, pending_activation_date: null });
          }
          results.push({ restaurant_id: restaurant.id, status: created ? 'assigned' : 'reactivated' });
        }
      } catch (e) {
        results.push({ restaurant_id: restaurant.id, status: 'error', message: e.message });
      }
    }

    const response = { success: true, data: results };
    if (currency_warnings.length > 0) response.currency_warnings = currency_warnings;
    res.json(response);
  } catch (error) {
    console.error('Error assigning restaurants to plan:', error);
    res.status(500).json({ success: false, message: 'Failed to assign restaurants' });
  }
});

// DELETE /api/foodcourts/:id/plans/:planId/restaurants/:restaurantId - Unassign
router.delete('/:id/plans/:planId/restaurants/:restaurantId', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId, restaurantId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const assignment = await EntityPlanRestaurant.findOne({
      where: { entity_plan_id: planId, restaurant_id: restaurantId }
    });
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });

    await assignment.update({ is_active: false, pending_plan_id: null, pending_activation_date: null });
    res.json({ success: true, message: 'Restaurant unassigned from plan' });
  } catch (error) {
    console.error('Error unassigning restaurant:', error);
    res.status(500).json({ success: false, message: 'Failed to unassign restaurant' });
  }
});

// POST /api/foodcourts/:id/plans/:planId/restaurants/:restaurantId/cancel-pending - Cancel scheduled plan change
router.post('/:id/plans/:planId/restaurants/:restaurantId/cancel-pending', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId, restaurantId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const assignment = await EntityPlanRestaurant.findOne({
      where: { entity_plan_id: planId, restaurant_id: restaurantId, is_active: true }
    });
    if (!assignment) return res.status(404).json({ success: false, message: 'Active assignment not found' });
    if (!assignment.pending_plan_id) {
      return res.status(400).json({ success: false, message: 'No pending change to cancel' });
    }

    await assignment.update({ pending_plan_id: null, pending_activation_date: null });
    res.json({ success: true, message: 'Pending plan change cancelled' });
  } catch (error) {
    console.error('Error cancelling pending change:', error);
    res.status(500).json({ success: false, message: 'Failed to cancel pending change' });
  }
});

// PUT /api/foodcourts/:id/plans/:planId/restaurants/:restaurantId/discount - Set discount for a restaurant
router.put('/:id/plans/:planId/restaurants/:restaurantId/discount', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId, restaurantId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
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

// GET /api/foodcourts/:id/plans/:planId/prices - Get multi-currency prices for a plan
router.get('/:id/plans/:planId/prices', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
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

// PUT /api/foodcourts/:id/plans/:planId/prices - Update multi-currency prices for a plan
router.put('/:id/plans/:planId/prices', authenticateToken, requireFoodcourtModule('fc_plans'), async (req, res) => {
  try {
    const { id, planId } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const plan = await EntityPlan.findOne({
      where: { id: planId, entity_type: 'foodcourt', entity_id: id }
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

    const plan = await EntityPlan.findOne({
      where: { id: plan_id, entity_type: 'foodcourt', entity_id: id },
      include: [{ model: EntityPlanPrice, as: 'prices' }]
    });
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
        include: [{ model: Restaurant, as: 'restaurant', attributes: ['id', 'name', 'email', 'currency'] }]
      }, {
        model: EntityPlanPrice, as: 'prices'
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

    // Validate payment methods exist for each plan's currency
    const { hasPaymentMethodForCurrency } = require('../utils/paymentSettingsHelper');
    const foodcourtPaymentSettings = access.foodcourt.payment_settings || {};

    for (const plan of plans) {
      for (const pr of plan.planRestaurants) {
        const restaurant = pr.restaurant;
        if (!restaurant) continue;

        // Use restaurant's base currency (design rule: invoice in recipient's currency)
        const invoiceCurrency = restaurant.currency || 'MYR';

        // Validate issuer has payment methods for this restaurant's currency
        if (!hasPaymentMethodForCurrency(foodcourtPaymentSettings, invoiceCurrency)) {
          skipped++;
          results.push({
            restaurant: restaurant.name,
            status: 'skipped',
            reason: `No payment methods configured for ${invoiceCurrency}. Please set up payment settings first.`
          });
          continue;
        }

        // For fixed plans, verify pricing exists for restaurant's currency
        if (plan.charge_type === 'fixed') {
          const priceRecord = (plan.prices || []).find(p => p.currency === invoiceCurrency);
          if (!priceRecord || parseFloat(priceRecord.monthly_price || 0) <= 0) {
            skipped++;
            results.push({
              restaurant: restaurant.name,
              status: 'skipped',
              reason: `No pricing set for ${invoiceCurrency} in plan "${plan.name}". Please add pricing for this currency.`
            });
            continue;
          }
        }

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
        const charges = calculatePlanCharges(plan, revenue, 0, invoiceCurrency);

        if (charges.totalAmount <= 0) { skipped++; results.push({ restaurant: restaurant.name, status: 'skipped', reason: 'Zero amount' }); continue; }

        const invoiceNumber = await generateFoodcourtInvoiceNumber(id);

        const invoice = await Invoice.create({
          restaurant_id: restaurant.id, invoice_number: invoiceNumber, type: 'automatic',
          invoice_category: 'foodcourt_plan', category_display_name: plan.name,
          billing_period_start: periodStart, billing_period_end: periodEnd, due_date: dueDate,
          total_amount: charges.totalAmount, currency: invoiceCurrency,
          status: 'pending_payment',
          notes: `Auto-generated invoice for ${plan.name}. Period: ${periodStart.toISOString().split('T')[0]} ~ ${periodEnd.toISOString().split('T')[0]}`,
          issued_by: req.user.id, issued_at: now,
          issuer_type: 'foodcourt', issuer_id: parseInt(id),
          payer_type: 'restaurant', payer_id: null
        });

        await InvoiceItem.bulkCreate(charges.items.map(item => ({ ...item, invoice_id: invoice.id })));

        const { finalizeInvoice } = require('../utils/invoiceCalculation');
        await finalizeInvoice(invoice.id);

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
router.get('/:id/subscriptions', authenticateToken, requireFoodcourtModule('fc_subscriptions'), async (req, res) => {
  try {
    const { id } = req.params;
    const access = await verifyFoodcourtAccess(req, id);
    if (access.error) return res.status(access.status).json({ success: false, message: access.error });

    const restaurants = await Restaurant.findAll({
      where: { foodcourt_id: id },
      attributes: ['id', 'name', 'email', 'status', 'phone', 'address', 'currency'],
      include: [{
        model: EntityPlanRestaurant, as: 'entityPlanRestaurants', required: false,
        include: [{
          model: EntityPlan, as: 'plan', where: { entity_type: 'foodcourt', entity_id: id }, required: false,
          include: [{ model: EntityPlanPrice, as: 'prices' }]
        }]
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

    // Collect pending plan ids for bulk lookup
    const pendingPlanIds = new Set();
    restaurants.forEach(r => {
      (r.entityPlanRestaurants || []).forEach(epr => {
        if (epr.is_active && epr.pending_plan_id) pendingPlanIds.add(epr.pending_plan_id);
      });
    });
    const pendingPlansById = {};
    if (pendingPlanIds.size > 0) {
      const plans = await EntityPlan.findAll({
        where: { id: [...pendingPlanIds], entity_type: 'foodcourt', entity_id: id }
      });
      plans.forEach(p => { pendingPlansById[p.id] = p; });
    }

    const data = restaurants.map(r => {
      const activePlan = r.entityPlanRestaurants?.find(epr => epr.is_active && epr.plan);
      const latestInvoice = invoiceMap[r.id];
      const monthRevenue = revenueMap[r.id]?.revenue || 0;
      const monthOrders = revenueMap[r.id]?.order_count || 0;
      let estimatedCharges = null;
      if (activePlan?.plan) estimatedCharges = calculatePlanCharges(activePlan.plan, monthRevenue);

      let pending_plan = null;
      if (activePlan && activePlan.pending_plan_id && pendingPlansById[activePlan.pending_plan_id]) {
        const pp = pendingPlansById[activePlan.pending_plan_id];
        pending_plan = {
          id: pp.id, name: pp.name,
          charge_type: pp.charge_type,
          percentage_value: pp.percentage_value,
          billing_day: pp.billing_day,
          activation_date: activePlan.pending_activation_date
        };
      }

      return {
        restaurant_id: r.id, restaurant_name: r.name, restaurant_email: r.email, restaurant_status: r.status, restaurant_currency: r.currency || 'MYR',
        plan: activePlan ? {
          id: activePlan.plan.id, name: activePlan.plan.name,
          charge_type: activePlan.plan.charge_type,
          percentage_value: activePlan.plan.percentage_value,
          revenue_base: activePlan.plan.revenue_base,
          billing_day: activePlan.plan.billing_day,
          auto_generate: activePlan.plan.auto_generate, activation_date: activePlan.activation_date,
          discount_type: activePlan.discount_type || 'none',
          discount_value: parseFloat(activePlan.discount_value) || 0,
          discount_reason: activePlan.discount_reason || null
        } : null,
        pending_plan,
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

// Foodcourt Sales Trend API - 대시보드 차트용
router.get('/:id/sales-trend', authenticateToken, requireRole('Foodcourt General', 'Foodcourt Manager', 'System Admin'), async (req, res) => {
  try {
    const foodcourtId = req.params.id;
    const { period = 'month' } = req.query;

    // 푸드코트 접근 권한 확인
    const foodcourt = await Foodcourt.findByPk(foodcourtId);
    if (!foodcourt) return res.status(404).json({ success: false, message: 'Foodcourt not found' });
    if (req.user.role === 'Foodcourt General' && foodcourt.owner_id !== req.user.id && req.user.foodcourt_id !== foodcourt.id) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // 푸드코트 소속 레스토랑 ID 조회
    const restaurants = await Restaurant.findAll({
      where: { foodcourt_id: foodcourtId },
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
    console.error('Error fetching foodcourt sales trend:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch sales trend' });
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

// ============================================
// Foodcourt Manager (Staff) APIs
// ============================================

// Get all managers for a foodcourt

module.exports = router;
