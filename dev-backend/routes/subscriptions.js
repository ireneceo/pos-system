const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database');
const { QueryTypes, Op } = require('sequelize');
const { authenticateToken } = require('../middleware/auth');
const PlanTemplate = require('../models/PlanTemplate');
const PlanPrice = require('../models/PlanPrice');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Invoice = require('../models/Invoice');
const InvoiceItem = require('../models/InvoiceItem');
const ActivityLog = require('../models/ActivityLog');
const Product = require('../models/Product');
const SystemSettings = require('../models/SystemSettings');
const { getRestaurantTimezone } = require('../utils/dateTimeHelper');

// GET /api/subscriptions - Legacy dashboard
router.get('/', authenticateToken, async (req, res) => {
  try {
    const rows = await sequelize.query(
      `SELECT s.*, r.name as restaurant_name
       FROM subscriptions s
       LEFT JOIN restaurants r ON s.restaurant_id = r.id
       ORDER BY s.created_at DESC`,
      { type: QueryTypes.SELECT }
    );
    res.json({ data: rows });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.json({ data: [] });
  }
});

// ============================================================
// Self-service plan change APIs
// ============================================================

/**
 * Helper: Determine plan_target from user role
 */
function getPlanTarget(role) {
  const map = {
    'Restaurant Admin': 'restaurant',
    'Brand General': 'brand',
    'Foodcourt General': 'foodcourt',
    'Restaurant Owner': 'owner',
    'Supplier Admin': 'supplier'
  };
  return map[role] || null;
}

/**
 * Helper: Get current subscription data for any role
 */
async function getDefaultCurrency() {
  const setting = await SystemSettings.findOne({ where: { setting_key: 'default_currency' } });
  return setting?.setting_value || 'MYR';
}

// Build a restaurant's subscription snapshot (billing-relevant fields + change
// eligibility + usage). Extracted so both self-service (Restaurant Admin) and the
// manager-targets-a-managed-restaurant path share ONE source of truth.
async function buildRestaurantSubscription(restaurant, defaultCurrency) {
  // Check payment_model
  let billedToName = null;
  let canChange = true;
  let changeBlockedReason = null;

  if (restaurant.payment_model && restaurant.payment_model !== 'restaurant') {
    canChange = false;
    if (restaurant.payment_model === 'brand_manager' && restaurant.brand_id) {
      const brand = await Brand.findByPk(restaurant.brand_id, {
        include: [{ model: User, as: 'owner', attributes: ['full_name'] }]
      });
      billedToName = brand ? `${brand.name} (${brand.owner?.full_name || 'Brand General'})` : 'Brand General';
    } else if (restaurant.payment_model === 'foodcourt_manager' && restaurant.foodcourt_id) {
      const fc = await Foodcourt.findByPk(restaurant.foodcourt_id, {
        include: [{ model: User, as: 'owner', attributes: ['full_name'] }]
      });
      billedToName = fc ? `${fc.name} (${fc.owner?.full_name || 'Foodcourt General'})` : 'Foodcourt General';
    } else if (restaurant.payment_model === 'restaurant_owner') {
      const { RestaurantManager } = require('../models');
      const ownerLink = await RestaurantManager.findOne({
        where: { restaurant_id: restaurant.id, relationship_type: 'ownership' },
        include: [{ model: User, as: 'manager', attributes: ['full_name'] }]
      });
      billedToName = ownerLink?.manager?.full_name || 'Restaurant Owner';
    }
    changeBlockedReason = `Your POS subscription is billed to ${billedToName}. Please contact them for plan changes.`;
  }

  // Check overdue/suspended
  if (canChange && ['overdue', 'suspended'].includes(restaurant.status)) {
    canChange = false;
    changeBlockedReason = 'You have overdue invoices. Please settle them before changing your plan.';
  }

  // Get current usage for downgrade checks
  const [staffCount, menuItemCount, orderCount] = await Promise.all([
    User.count({ where: { restaurant_id: restaurant.id, role: 'Staff' } }),
    Product.count({ where: { restaurant_id: restaurant.id, is_active: true } }),
    sequelize.query(
      `SELECT COUNT(*) as cnt FROM orders WHERE restaurant_id = :rid AND MONTH(createdAt) = MONTH(NOW()) AND YEAR(createdAt) = YEAR(NOW())`,
      { replacements: { rid: restaurant.id }, type: QueryTypes.SELECT }
    ).then(r => r[0]?.cnt || 0)
  ]);

  return {
    entity_type: 'restaurant',
    entity_id: restaurant.id,
    plan_type: restaurant.plan_type,
    plan_amount: parseFloat(restaurant.plan_amount) || 0,
    billing_cycle: restaurant.billing_cycle || 'monthly',
    currency: defaultCurrency,
    status: restaurant.status,
    subscription_start: restaurant.subscription_start,
    subscription_end: restaurant.subscription_end,
    discount_type: restaurant.discount_type,
    discount_value: restaurant.discount_value ? parseFloat(restaurant.discount_value) : null,
    pending_plan_type: restaurant.pending_plan_type,
    pending_plan_amount: restaurant.pending_plan_amount ? parseFloat(restaurant.pending_plan_amount) : null,
    pending_billing_cycle: restaurant.pending_billing_cycle,
    plan_change_date: restaurant.plan_change_date,
    plan_change_type: restaurant.plan_change_type,
    can_change: canChange,
    change_blocked_reason: changeBlockedReason,
    current_usage: {
      staff_count: staffCount,
      menu_item_count: menuItemCount,
      order_count: parseInt(orderCount)
    }
  };
}

// Authorize a manager (Brand/Foodcourt General, Restaurant Owner, or a linked
// manager/admin) to act on a specific restaurant's subscription. Mirrors the
// scope of GET /subscriptions/manager/:id. IDOR-safe: returns the restaurant only
// when the caller genuinely oversees it, else null.
async function managerCanManageRestaurant(user, restaurantId) {
  const restaurant = await Restaurant.findByPk(restaurantId);
  if (!restaurant) return null;
  if (user.role === 'System Admin') return restaurant;
  // Direct admin of the restaurant.
  if (restaurant.admin_id && String(restaurant.admin_id) === String(user.id)) return restaurant;
  // Brand General owns the brand this restaurant belongs to.
  if (user.role === 'Brand General' && restaurant.brand_id) {
    const brand = await Brand.findOne({ where: { id: restaurant.brand_id, owner_id: user.id }, attributes: ['id'] });
    if (brand) return restaurant;
  }
  // Foodcourt General owns the foodcourt this restaurant belongs to.
  if (user.role === 'Foodcourt General' && restaurant.foodcourt_id) {
    const fc = await Foodcourt.findOne({ where: { id: restaurant.foodcourt_id, owner_id: user.id }, attributes: ['id'] });
    if (fc) return restaurant;
  }
  // Linked manager / owner via the restaurant_managers junction.
  const { RestaurantManager } = require('../models');
  const link = await RestaurantManager.findOne({ where: { restaurant_id: restaurant.id, manager_id: user.id }, attributes: ['id'] });
  if (link) return restaurant;
  return null;
}

async function getCurrentSubscription(user) {
  const role = user.role;
  const defaultCurrency = await getDefaultCurrency();

  if (role === 'Restaurant Admin') {
    const restaurant = await Restaurant.findOne({ where: { admin_id: user.id } });
    if (!restaurant) return null;
    return buildRestaurantSubscription(restaurant, defaultCurrency);
  }

  // Brand General, Foodcourt General, Restaurant Owner, Supplier Admin → users table
  const dbUser = await User.findByPk(user.id);
  if (!dbUser) return null;

  let canChange = true;
  let changeBlockedReason = null;

  if (['overdue', 'suspended'].includes(dbUser.subscription_status)) {
    canChange = false;
    changeBlockedReason = 'You have overdue invoices. Please settle them before changing your plan.';
  }

  return {
    entity_type: getPlanTarget(role),
    entity_id: dbUser.id,
    plan_type: dbUser.plan_type,
    plan_amount: parseFloat(dbUser.plan_amount) || 0,
    billing_cycle: dbUser.billing_cycle || 'monthly',
    currency: defaultCurrency,
    status: dbUser.subscription_status || 'active',
    subscription_start: dbUser.subscription_start,
    subscription_end: dbUser.subscription_end,
    discount_type: null,
    discount_value: null,
    pending_plan_type: dbUser.pending_plan_type,
    pending_plan_amount: dbUser.pending_plan_amount ? parseFloat(dbUser.pending_plan_amount) : null,
    pending_billing_cycle: dbUser.pending_billing_cycle,
    plan_change_date: dbUser.plan_change_date,
    plan_change_type: dbUser.plan_change_type,
    can_change: canChange,
    change_blocked_reason: changeBlockedReason,
    current_usage: null // Not applicable for non-restaurant roles
  };
}

/**
 * Helper: Calculate next billing date from subscription_start + billing_cycle
 */
function getNextBillingDate(subscriptionStart, subscriptionEnd, billingCycle) {
  if (subscriptionEnd) {
    return new Date(subscriptionEnd);
  }
  if (!subscriptionStart) return null;
  const start = new Date(subscriptionStart);
  const now = new Date();
  // Advance start until it's in the future
  while (start <= now) {
    if (billingCycle === 'annual') {
      start.setFullYear(start.getFullYear() + 1);
    } else {
      start.setMonth(start.getMonth() + 1);
    }
  }
  return start;
}

/**
 * Helper: Calculate proration for upgrade
 */
function calculateProration(currentAmount, newAmount, subscriptionEnd, billingCycle) {
  const now = new Date();
  const end = new Date(subscriptionEnd);
  const remainingDays = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));

  if (remainingDays === 0) return { credit: 0, charge: 0, net_amount: 0, remaining_days: 0, cycle_days: 0 };

  // Determine cycle days
  let cycleDays;
  if (billingCycle === 'annual') {
    cycleDays = 365;
  } else {
    // Days in the current billing month
    const endMonth = new Date(end);
    const startMonth = new Date(endMonth);
    startMonth.setMonth(startMonth.getMonth() - 1);
    cycleDays = Math.ceil((endMonth - startMonth) / (1000 * 60 * 60 * 24));
  }

  const credit = Math.round(currentAmount * (remainingDays / cycleDays) * 100) / 100;
  const charge = Math.round(newAmount * (remainingDays / cycleDays) * 100) / 100;
  const netAmount = Math.round((charge - credit) * 100) / 100;

  return { credit, charge, net_amount: netAmount, remaining_days: remainingDays, cycle_days: cycleDays };
}

// ============================================================
// GET /api/subscriptions/my-plan
// ============================================================
router.get('/my-plan', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const planTarget = getPlanTarget(user.role);

    if (!planTarget) {
      return res.status(403).json({ success: false, message: 'Your role does not have a subscription plan.' });
    }

    const current = await getCurrentSubscription(user);
    if (!current) {
      // More specific error messages
      if (user.role === 'Restaurant Admin') {
        return res.status(404).json({ success: false, message: 'No restaurant is linked to your account. Please contact your administrator.' });
      }
      return res.status(404).json({ success: false, message: 'Subscription data not found. Please contact your administrator.' });
    }

    // Auto-fill subscription_start/end if null (legacy data)
    if (!current.subscription_start || !current.subscription_end) {
      const now = new Date();
      const endDate = new Date(now);
      if (current.billing_cycle === 'annual') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }
      const fillData = {
        subscription_start: now.toISOString().split('T')[0],
        subscription_end: endDate.toISOString().split('T')[0]
      };
      if (current.entity_type === 'restaurant') {
        await Restaurant.update(fillData, { where: { id: current.entity_id } });
      } else {
        await User.update(fillData, { where: { id: current.entity_id } });
      }
      current.subscription_start = fillData.subscription_start;
      current.subscription_end = fillData.subscription_end;
    }

    // Get available plans for this role
    const plans = await PlanTemplate.findAll({
      where: { plan_target: planTarget, is_active: true },
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });

    const nextBillingDate = getNextBillingDate(current.subscription_start, current.subscription_end, current.billing_cycle);

    // Build available_plans with change_type and proration
    const availablePlans = await Promise.all(plans.map(async (plan) => {
      const planData = plan.toJSON();
      let features = planData.features;
      if (typeof features === 'string') {
        try { features = JSON.parse(features); } catch { features = []; }
      }
      let included_modules = planData.included_modules;
      if (typeof included_modules === 'string') {
        try { included_modules = JSON.parse(included_modules); } catch { included_modules = []; }
      }

      // Get prices for user's currency
      const prices = await PlanPrice.findAll({
        where: { plan_id: plan.id, is_active: true },
        attributes: ['currency', 'monthly_price', 'annual_price']
      });
      const currencyPrices = prices.reduce((acc, p) => {
        acc[p.currency] = { monthly: parseFloat(p.monthly_price), annual: parseFloat(p.annual_price) };
        return acc;
      }, {});

      const monthlyPrice = currencyPrices[current.currency]?.monthly ?? parseFloat(planData.base_price_monthly) ?? 0;
      const annualPrice = currencyPrices[current.currency]?.annual ?? parseFloat(planData.base_price_annual) ?? 0;

      // Determine if current plan
      const isCurrent = planData.display_name === current.plan_type || planData.name === current.plan_type;

      // Determine change type by sort_order (plan tier)
      let changeType = null;
      if (!isCurrent) {
        const currentPlanTemplate = plans.find(p => p.display_name === current.plan_type || p.name === current.plan_type);
        const currentSortOrder = currentPlanTemplate ? currentPlanTemplate.sort_order : 0;
        const newSortOrder = plan.sort_order || 0;
        changeType = newSortOrder > currentSortOrder ? 'upgrade' : 'downgrade';
      }

      // Calculate proration estimate for upgrades
      let prorationEstimate = null;
      if (changeType === 'upgrade' && current.subscription_end && current.status !== 'trial') {
        const newPrice = current.billing_cycle === 'annual' ? annualPrice : monthlyPrice;
        prorationEstimate = calculateProration(current.plan_amount, newPrice, current.subscription_end, current.billing_cycle);
      }

      return {
        id: planData.id,
        name: planData.name,
        display_name: planData.display_name,
        description: planData.description,
        monthly_price: monthlyPrice,
        annual_price: annualPrice,
        currency_prices: currencyPrices,
        features: Array.isArray(features) ? features : [],
        included_modules: Array.isArray(included_modules) ? included_modules : [],
        limits: {
          orders: planData.order_limit,
          menu_items: planData.menu_item_limit,
          staff: planData.staff_limit,
          restaurants: planData.restaurant_limit,
          managers: planData.manager_limit
        },
        sort_order: planData.sort_order || 0,
        is_current: isCurrent,
        change_type: changeType,
        proration_estimate: prorationEstimate
      };
    }));

    // Build pending_change info
    let pendingChange = null;
    if (current.pending_plan_type) {
      pendingChange = {
        plan_type: current.pending_plan_type,
        plan_amount: current.pending_plan_amount,
        billing_cycle: current.pending_billing_cycle,
        change_type: current.plan_change_type,
        effective_date: current.plan_change_date
      };
    }

    res.json({
      success: true,
      current: {
        plan_type: current.plan_type,
        plan_amount: current.plan_amount,
        billing_cycle: current.billing_cycle,
        currency: current.currency,
        status: current.status,
        subscription_start: current.subscription_start,
        subscription_end: current.subscription_end,
        next_billing_date: nextBillingDate,
        can_change: current.can_change,
        change_blocked_reason: current.change_blocked_reason,
        discount_type: current.discount_type,
        discount_value: current.discount_value
      },
      pending_change: pendingChange,
      current_usage: current.current_usage,
      available_plans: availablePlans
    });
  } catch (error) {
    console.error('Error fetching my plan:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch subscription data.' });
  }
});

// ============================================================
// GET /api/subscriptions/manager/restaurant/:restaurantId/plan-options
// Read-only: a manager views a managed restaurant's subscription + the plans
// they can switch it to. Money mutation stays in POST /change-plan.
// ============================================================
router.get('/manager/restaurant/:restaurantId/plan-options', authenticateToken, async (req, res) => {
  try {
    const restaurant = await managerCanManageRestaurant(req.user, req.params.restaurantId);
    if (!restaurant) {
      return res.status(403).json({ success: false, message: 'You do not manage this restaurant.' });
    }

    const defaultCurrency = await getDefaultCurrency();
    const current = await buildRestaurantSubscription(restaurant, defaultCurrency);

    // Build available_plans exactly like GET /my-plan does, but for the restaurant
    // plan_target and the restaurant's currency.
    const plans = await PlanTemplate.findAll({
      where: { plan_target: 'restaurant', is_active: true },
      order: [['sort_order', 'ASC'], ['id', 'ASC']]
    });

    const availablePlans = await Promise.all(plans.map(async (plan) => {
      const planData = plan.toJSON();
      let features = planData.features;
      if (typeof features === 'string') {
        try { features = JSON.parse(features); } catch { features = []; }
      }
      let included_modules = planData.included_modules;
      if (typeof included_modules === 'string') {
        try { included_modules = JSON.parse(included_modules); } catch { included_modules = []; }
      }

      const prices = await PlanPrice.findAll({
        where: { plan_id: plan.id, is_active: true },
        attributes: ['currency', 'monthly_price', 'annual_price']
      });
      const currencyPrices = prices.reduce((acc, p) => {
        acc[p.currency] = { monthly: parseFloat(p.monthly_price), annual: parseFloat(p.annual_price) };
        return acc;
      }, {});

      const monthlyPrice = currencyPrices[current.currency]?.monthly ?? parseFloat(planData.base_price_monthly) ?? 0;
      const annualPrice = currencyPrices[current.currency]?.annual ?? parseFloat(planData.base_price_annual) ?? 0;

      const isCurrent = planData.display_name === current.plan_type || planData.name === current.plan_type;

      let changeType = null;
      if (!isCurrent) {
        const currentPlanTemplate = plans.find(p => p.display_name === current.plan_type || p.name === current.plan_type);
        const currentSortOrder = currentPlanTemplate ? currentPlanTemplate.sort_order : 0;
        const newSortOrder = plan.sort_order || 0;
        changeType = newSortOrder > currentSortOrder ? 'upgrade' : 'downgrade';
      }

      let prorationEstimate = null;
      if (changeType === 'upgrade' && current.subscription_end && current.status !== 'trial') {
        const newPrice = current.billing_cycle === 'annual' ? annualPrice : monthlyPrice;
        prorationEstimate = calculateProration(current.plan_amount, newPrice, current.subscription_end, current.billing_cycle);
      }

      return {
        id: planData.id,
        name: planData.name,
        display_name: planData.display_name,
        description: planData.description,
        monthly_price: monthlyPrice,
        annual_price: annualPrice,
        currency_prices: currencyPrices,
        features: Array.isArray(features) ? features : [],
        included_modules: Array.isArray(included_modules) ? included_modules : [],
        limits: {
          orders: planData.order_limit,
          menu_items: planData.menu_item_limit,
          staff: planData.staff_limit,
          restaurants: planData.restaurant_limit,
          managers: planData.manager_limit
        },
        sort_order: planData.sort_order || 0,
        is_current: isCurrent,
        change_type: changeType,
        proration_estimate: prorationEstimate
      };
    }));

    res.json({ success: true, data: { current, available_plans: availablePlans } });
  } catch (error) {
    console.error('Error fetching manager restaurant plan options:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch plan options.' });
  }
});

// ============================================================
// POST /api/subscriptions/change-plan
// ============================================================
router.post('/change-plan', authenticateToken, async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const user = req.user;
    const { new_plan_id, new_billing_cycle, restaurant_id } = req.body;

    if (!new_plan_id) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'new_plan_id is required.' });
    }

    // Two modes: (a) self-service — the caller changes their OWN plan; (b) manager
    // — the caller changes a MANAGED restaurant's plan (restaurant_id provided).
    // Manager mode is upgrade/downgrade only; suspend/cancel stays System-Admin-only.
    let current;
    let planTarget;
    if (restaurant_id) {
      const restaurant = await managerCanManageRestaurant(user, restaurant_id);
      if (!restaurant) {
        await transaction.rollback();
        return res.status(403).json({ success: false, message: 'You do not manage this restaurant.' });
      }
      const defaultCurrency = await getDefaultCurrency();
      current = await buildRestaurantSubscription(restaurant, defaultCurrency);
      planTarget = 'restaurant';
    } else {
      planTarget = getPlanTarget(user.role);
      if (!planTarget) {
        await transaction.rollback();
        return res.status(403).json({ success: false, message: 'Your role does not have a subscription plan.' });
      }
      current = await getCurrentSubscription(user);
    }

    if (!current) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Subscription data not found.' });
    }

    if (!current.can_change) {
      await transaction.rollback();
      return res.status(403).json({ success: false, message: current.change_blocked_reason });
    }

    // Resolve entity timezone for date display (restaurant/brand/foodcourt)
    let entityTz = 'Asia/Kuala_Lumpur';
    try {
      let entityRecord = null;
      if (current.entity_type === 'restaurant') {
        entityRecord = await Restaurant.findByPk(current.entity_id, { attributes: ['operation_settings'] });
      } else if (current.entity_type === 'brand') {
        entityRecord = await Brand.findByPk(current.entity_id, { attributes: ['operation_settings'] });
      } else if (current.entity_type === 'foodcourt') {
        entityRecord = await Foodcourt.findByPk(current.entity_id, { attributes: ['operation_settings'] });
      }
      if (entityRecord) entityTz = getRestaurantTimezone(entityRecord);
    } catch (e) { /* fallback default */ }

    // Auto-fill subscription_start/end if null (legacy data)
    if (!current.subscription_start || !current.subscription_end) {
      const now = new Date();
      const endDate = new Date(now);
      if (current.billing_cycle === 'annual') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      } else {
        endDate.setMonth(endDate.getMonth() + 1);
      }
      const fillData = {
        subscription_start: now.toISOString().split('T')[0],
        subscription_end: endDate.toISOString().split('T')[0]
      };
      if (current.entity_type === 'restaurant') {
        await Restaurant.update(fillData, { where: { id: current.entity_id }, transaction });
      } else {
        await User.update(fillData, { where: { id: current.entity_id }, transaction });
      }
      current.subscription_start = fillData.subscription_start;
      current.subscription_end = fillData.subscription_end;
    }

    // Get the new plan
    const newPlan = await PlanTemplate.findOne({
      where: { id: new_plan_id, plan_target: planTarget, is_active: true }
    });
    if (!newPlan) {
      await transaction.rollback();
      return res.status(404).json({ success: false, message: 'Plan not found or not available for your role.' });
    }

    // Get price in user's currency
    const price = await PlanPrice.findOne({
      where: { plan_id: newPlan.id, currency: current.currency, is_active: true }
    });
    const effectiveBillingCycle = new_billing_cycle || current.billing_cycle;

    let newAmount;
    if (price) {
      newAmount = effectiveBillingCycle === 'annual' ? parseFloat(price.annual_price) : parseFloat(price.monthly_price);
    } else {
      newAmount = effectiveBillingCycle === 'annual' ? parseFloat(newPlan.base_price_annual) : parseFloat(newPlan.base_price_monthly);
    }

    // Check: same plan same cycle = no change
    const isSamePlan = (newPlan.display_name === current.plan_type || newPlan.name === current.plan_type);
    if (isSamePlan && effectiveBillingCycle === current.billing_cycle) {
      await transaction.rollback();
      return res.status(400).json({ success: false, message: 'You are already on this plan with this billing cycle.' });
    }

    // Check: Annual → Monthly blocked
    if (current.billing_cycle === 'annual' && effectiveBillingCycle === 'monthly') {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Annual plans cannot be switched to monthly billing. Please contact support for a full refund and re-subscription.',
        action: 'contact_support'
      });
    }

    // Determine change type (compare by monthly price to determine tier, not affected by cycle)
    let changeType;
    if (isSamePlan && effectiveBillingCycle !== current.billing_cycle) {
      changeType = 'cycle_change'; // Monthly → Annual
    } else {
      const currentPlan = await PlanTemplate.findOne({
        where: { [Op.or]: [{ display_name: current.plan_type }, { name: current.plan_type }], plan_target: planTarget }
      });
      const currentSortOrder = currentPlan ? currentPlan.sort_order : 0;
      const newSortOrder = newPlan.sort_order || 0;
      changeType = newSortOrder > currentSortOrder ? 'upgrade' : 'downgrade';
    }

    // Downgrade: check usage limits (staff + menu + monthly orders)
    if (changeType === 'downgrade' && current.current_usage) {
      const exceeded = [];
      if (newPlan.staff_limit > 0 && current.current_usage.staff_count > newPlan.staff_limit) {
        exceeded.push(`Staff: ${current.current_usage.staff_count} active (${newPlan.display_name} limit: ${newPlan.staff_limit})`);
      }
      if (newPlan.menu_item_limit > 0 && current.current_usage.menu_item_count > newPlan.menu_item_limit) {
        exceeded.push(`Menu items: ${current.current_usage.menu_item_count} active (${newPlan.display_name} limit: ${newPlan.menu_item_limit})`);
      }
      if (newPlan.order_limit > 0 && current.current_usage.order_count > newPlan.order_limit) {
        exceeded.push(`Orders this month: ${current.current_usage.order_count} (${newPlan.display_name} limit: ${newPlan.order_limit}/month)`);
      }
      if (exceeded.length > 0) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Your current usage exceeds the new plan limits. Please reduce usage before downgrading.',
          exceeded
        });
      }
    }

    const nextBillingDate = getNextBillingDate(current.subscription_start, current.subscription_end, current.billing_cycle);

    // ── UPGRADE: immediate ──
    if (changeType === 'upgrade') {
      const updateData = {
        plan_type: newPlan.display_name,
        plan_amount: newAmount,
        billing_cycle: effectiveBillingCycle,
        // Clear any pending changes
        pending_plan_type: null,
        pending_plan_amount: null,
        pending_billing_cycle: null,
        plan_change_date: null,
        plan_change_type: null
      };

      // Update limits for restaurants
      if (current.entity_type === 'restaurant') {
        updateData.order_limit = newPlan.order_limit;
        updateData.menu_item_limit = newPlan.menu_item_limit;
        updateData.staff_limit = newPlan.staff_limit;

        await Restaurant.update(updateData, {
          where: { id: current.entity_id },
          transaction
        });
      } else {
        await User.update(updateData, {
          where: { id: current.entity_id },
          transaction
        });
      }

      // Create proration invoice (unless trial)
      let prorationInvoice = null;
      if (current.status !== 'trial' && current.subscription_end) {
        const proration = calculateProration(current.plan_amount, newAmount, current.subscription_end, current.billing_cycle);

        if (proration.net_amount > 0) {
          // Generate invoice number
          const now = new Date();
          const year = now.getFullYear();
          const month = String(now.getMonth() + 1).padStart(2, '0');
          const count = await Invoice.count({
            where: { invoice_number: { [Op.like]: `INV-${year}${month}%` } }
          });
          const invoiceNumber = `INV-${year}${month}${String(count + 1).padStart(4, '0')}`;

          // Determine payer
          let payerType, payerId, restaurantId;
          if (current.entity_type === 'restaurant') {
            payerType = 'restaurant';
            payerId = null;
            restaurantId = current.entity_id;
          } else {
            const rolePayerMap = {
              brand: 'brand_manager',
              foodcourt: 'foodcourt_manager',
              owner: 'restaurant_owner'
            };
            payerType = rolePayerMap[current.entity_type] || 'restaurant';
            payerId = current.entity_id;
            restaurantId = null;
          }

          const endDate = new Date(current.subscription_end);
          const periodText = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: entityTz })} - ${endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: entityTz })}`;

          const invoice = await Invoice.create({
            restaurant_id: restaurantId,
            invoice_number: invoiceNumber,
            type: 'automatic',
            invoice_category: 'plan_upgrade',
            billing_period_start: now,
            billing_period_end: endDate,
            due_date: nextBillingDate || new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
            subtotal: proration.net_amount,
            total_amount: proration.net_amount,
            currency: current.currency,
            status: 'pending_payment',
            notes: `Plan upgrade: ${current.plan_type} → ${newPlan.display_name} (${periodText}). Prorated charge.`,
            issued_by: 0,
            issued_at: now,
            issuer_type: 'system_admin',
            payer_type: payerType,
            payer_id: payerId
          }, { transaction });

          await InvoiceItem.create({
            invoice_id: invoice.id,
            item_type: 'plan_upgrade',
            description: `Plan upgrade: ${current.plan_type} → ${newPlan.display_name} (${periodText})`,
            calculation_method: 'fixed',
            fixed_amount: proration.net_amount,
            calculated_amount: proration.net_amount,
            tax_rate: 0,
            tax_amount: 0,
            total_amount: proration.net_amount
          }, { transaction });

          const { finalizeInvoice } = require('../utils/invoiceCalculation');
          await finalizeInvoice(invoice.id, transaction);

          prorationInvoice = {
            invoice_id: invoice.id,
            invoice_number: invoiceNumber,
            amount: proration.net_amount,
            due_date: invoice.due_date,
            proration_details: proration
          };
        }
      }

      // Activity log
      await ActivityLog.create({
        restaurant_id: current.entity_type === 'restaurant' ? current.entity_id : null,
        user_id: user.id,
        username: user.username || user.email,
        full_name: user.full_name || user.name || null,
        action_type: 'update',
        entity_type: 'subscription',
        entity_id: String(current.entity_id),
        entity_name: newPlan.display_name,
        changes: {
          before: { plan_type: current.plan_type, plan_amount: current.plan_amount, billing_cycle: current.billing_cycle },
          after: { plan_type: newPlan.display_name, plan_amount: newAmount, billing_cycle: effectiveBillingCycle }
        },
        description: `Plan upgraded: ${current.plan_type} → ${newPlan.display_name}${prorationInvoice ? ` (${current.currency} ${prorationInvoice.amount.toFixed(2)} prorated)` : ''}`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      }, { transaction });

      await transaction.commit();

      return res.json({
        success: true,
        change_type: 'upgrade',
        effective: 'immediate',
        new_plan: newPlan.display_name,
        new_amount: newAmount,
        billing_cycle: effectiveBillingCycle,
        proration_invoice: prorationInvoice,
        next_billing: nextBillingDate ? {
          date: nextBillingDate,
          amount: newAmount
        } : null
      });
    }

    // ── DOWNGRADE or CYCLE_CHANGE: scheduled ──
    const updateData = {
      pending_plan_type: newPlan.display_name,
      pending_plan_amount: newAmount,
      pending_billing_cycle: effectiveBillingCycle,
      plan_change_date: nextBillingDate,
      plan_change_type: changeType
    };

    if (current.entity_type === 'restaurant') {
      await Restaurant.update(updateData, {
        where: { id: current.entity_id },
        transaction
      });
    } else {
      await User.update(updateData, {
        where: { id: current.entity_id },
        transaction
      });
    }

    // Activity log
    const changeLabel = changeType === 'cycle_change'
      ? `Billing cycle change scheduled: ${current.billing_cycle} → ${effectiveBillingCycle}`
      : `Plan downgrade scheduled: ${current.plan_type} → ${newPlan.display_name}`;

    await ActivityLog.create({
      restaurant_id: current.entity_type === 'restaurant' ? current.entity_id : null,
      user_id: user.id,
      username: user.username || user.email,
      full_name: user.full_name || user.name || null,
      action_type: 'update',
      entity_type: 'subscription',
      entity_id: String(current.entity_id),
      entity_name: newPlan.display_name,
      changes: {
        before: { plan_type: current.plan_type, plan_amount: current.plan_amount, billing_cycle: current.billing_cycle },
        after: { plan_type: newPlan.display_name, plan_amount: newAmount, billing_cycle: effectiveBillingCycle, effective_date: nextBillingDate }
      },
      description: `${changeLabel} (effective ${nextBillingDate ? new Date(nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: entityTz }) : 'next billing date'})`,
      ip_address: req.ip,
      user_agent: req.get('User-Agent')
    }, { transaction });

    await transaction.commit();

    return res.json({
      success: true,
      change_type: changeType,
      effective_date: nextBillingDate,
      new_plan: newPlan.display_name,
      new_amount: newAmount,
      billing_cycle: effectiveBillingCycle,
      message: changeType === 'cycle_change'
        ? `Billing cycle will change to ${effectiveBillingCycle} on ${nextBillingDate ? new Date(nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: entityTz }) : 'next billing date'}.`
        : `Plan will change to ${newPlan.display_name} on ${nextBillingDate ? new Date(nextBillingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: entityTz }) : 'next billing date'}.`
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error changing plan:', error);
    res.status(500).json({ success: false, message: 'Failed to change plan.' });
  }
});

// ============================================================
// DELETE /api/subscriptions/change-plan
// ============================================================
router.delete('/change-plan', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const planTarget = getPlanTarget(user.role);

    if (!planTarget) {
      return res.status(403).json({ success: false, message: 'Your role does not have a subscription plan.' });
    }

    const clearData = {
      pending_plan_type: null,
      pending_plan_amount: null,
      pending_billing_cycle: null,
      plan_change_date: null,
      plan_change_type: null
    };

    let currentPlanType;

    if (user.role === 'Restaurant Admin') {
      const restaurant = await Restaurant.findOne({ where: { admin_id: user.id } });
      if (!restaurant || !restaurant.pending_plan_type) {
        return res.status(400).json({ success: false, message: 'No pending plan change to cancel.' });
      }
      currentPlanType = restaurant.plan_type;
      await Restaurant.update(clearData, { where: { id: restaurant.id } });

      // Activity log
      await ActivityLog.create({
        restaurant_id: restaurant.id,
        user_id: user.id,
        username: user.username || user.email,
        full_name: user.full_name || user.name || null,
        action_type: 'update',
        entity_type: 'subscription',
        entity_id: String(restaurant.id),
        entity_name: restaurant.plan_type,
        description: `Plan change cancelled: kept ${restaurant.plan_type}`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
    } else {
      const dbUser = await User.findByPk(user.id);
      if (!dbUser || !dbUser.pending_plan_type) {
        return res.status(400).json({ success: false, message: 'No pending plan change to cancel.' });
      }
      currentPlanType = dbUser.plan_type;
      await User.update(clearData, { where: { id: user.id } });

      await ActivityLog.create({
        user_id: user.id,
        username: user.username || user.email,
        full_name: user.full_name || user.name || null,
        action_type: 'update',
        entity_type: 'subscription',
        entity_id: String(user.id),
        entity_name: dbUser.plan_type,
        description: `Plan change cancelled: kept ${dbUser.plan_type}`,
        ip_address: req.ip,
        user_agent: req.get('User-Agent')
      });
    }

    res.json({
      success: true,
      message: `Scheduled change cancelled. Your current plan (${currentPlanType}) will continue.`
    });
  } catch (error) {
    console.error('Error cancelling plan change:', error);
    res.status(500).json({ success: false, message: 'Failed to cancel plan change.' });
  }
});

module.exports = router;
