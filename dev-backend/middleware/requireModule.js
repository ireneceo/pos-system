/**
 * requireModule — Subscription-tier gate middleware
 *
 * Blocks access to endpoints whose functionality belongs to an advanced
 * addon module (e.g. brand_plans, fc_plans, brand_subscriptions, fc_subscriptions)
 * unless the target entity's active PlanTemplate includes that module code.
 *
 * Why: UI gating via `hasModule` alone is cosmetic — a curl against
 * `/api/brands/:id/plans` would succeed without this. Module gating must be
 * enforced at the API layer so the advanced tier is actually paywalled.
 *
 * Rules:
 *   - System Admin  → bypass (always allowed)
 *   - Demo accounts → bypass (Enterprise tier for demo)
 *   - Otherwise     → target entity's plan_type → PlanTemplate.included_modules
 *                     must contain moduleCode; else 403 MODULE_NOT_INCLUDED.
 */

const { Op } = require('sequelize');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const SupplierCompany = require('../models/SupplierCompany');
const User = require('../models/User');
const PlanTemplate = require('../models/PlanTemplate');

async function resolveEntityModules(entityType, entityId) {
  const Model = entityType === 'brand' ? Brand : entityType === 'foodcourt' ? Foodcourt : SupplierCompany;
  const entity = await Model.findByPk(entityId);
  if (!entity) return { planType: null, modules: [], demo: false };

  // Subscription data sits on owner (User) row, or on the entity itself as a fallback.
  const owner = entity.owner_id ? await User.findByPk(entity.owner_id) : null;
  const demo = !!(owner?.is_demo || entity.is_demo);
  const planType = demo
    ? (entityType === 'brand' ? 'Brand Enterprise' : 'Foodcourt Enterprise')
    : (owner?.plan_type || entity.plan_type);

  if (!planType) return { planType: null, modules: [], demo };

  const plan = await PlanTemplate.findOne({
    where: {
      [Op.or]: [{ display_name: planType }, { name: planType }],
      plan_target: entityType
    }
  });

  return { planType, modules: plan?.included_modules || [], demo };
}

/**
 * Resolve modules from a SupplierCompany using its plan_id FK directly
 * (Supplier doesn't use plan_type string; uses plan_id like other newer entities).
 */
async function resolveSupplierModules(supplierCompany) {
  if (!supplierCompany) return { planType: null, modules: [], demo: false };
  const demo = !!supplierCompany.is_demo;
  if (demo) {
    const enterprise = await PlanTemplate.findOne({
      where: { plan_target: 'supplier', name: 'supplier_advanced' }
    });
    return { planType: enterprise?.display_name || 'Supplier Advanced', modules: enterprise?.included_modules || [], demo };
  }
  const plan = supplierCompany.plan_id
    ? await PlanTemplate.findByPk(supplierCompany.plan_id)
    : null;
  return { planType: plan?.display_name, modules: plan?.included_modules || [], demo };
}

/**
 * Check a brand's subscription plan for a module code.
 * Use for routes under `/api/brands/:id/...`.
 */
function requireBrandModule(moduleCode) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (req.user.role === 'System Admin') return next();

    const brandId = req.params.id;
    const { planType, modules } = await resolveEntityModules('brand', brandId);
    if (!modules.includes(moduleCode)) {
      return res.status(403).json({
        success: false,
        code: 'MODULE_NOT_INCLUDED',
        message: `This feature (${moduleCode}) is not included in the current subscription plan${planType ? ` (${planType})` : ''}.`,
        required_module: moduleCode
      });
    }
    next();
  };
}

/**
 * Check a foodcourt's subscription plan for a module code.
 * Use for routes under `/api/foodcourts/:id/...`.
 */
function requireFoodcourtModule(moduleCode) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (req.user.role === 'System Admin') return next();

    const foodcourtId = req.params.id;
    const { planType, modules } = await resolveEntityModules('foodcourt', foodcourtId);
    if (!modules.includes(moduleCode)) {
      return res.status(403).json({
        success: false,
        code: 'MODULE_NOT_INCLUDED',
        message: `This feature (${moduleCode}) is not included in the current subscription plan${planType ? ` (${planType})` : ''}.`,
        required_module: moduleCode
      });
    }
    next();
  };
}

/**
 * Resolve the module check dynamically from a contract's entity_type.
 * Use for routes under `/api/contracts/:id/...` where the gate should be
 * brand_plans for brand contracts and fc_plans for foodcourt contracts, etc.
 *
 * @param {Object} map  e.g. { brand: 'brand_plans', foodcourt: 'fc_plans' }
 */
function requireContractEntityModule(map) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (req.user.role === 'System Admin') return next();

    const Contract = require('../models/Contract');
    const contract = await Contract.findByPk(req.params.id, {
      attributes: ['id', 'entity_type', 'entity_id']
    });
    if (!contract) return res.status(404).json({ success: false, message: 'Contract not found' });

    const moduleCode = map[contract.entity_type];
    if (!moduleCode) return next(); // Unknown entity_type → let handler deal with it

    const { planType, modules } = await resolveEntityModules(contract.entity_type, contract.entity_id);
    if (!modules.includes(moduleCode)) {
      return res.status(403).json({
        success: false,
        code: 'MODULE_NOT_INCLUDED',
        message: `This feature (${moduleCode}) is not included in the current subscription plan${planType ? ` (${planType})` : ''}.`,
        required_module: moduleCode
      });
    }
    next();
  };
}

/**
 * Check Supplier Admin's SupplierCompany plan for a module code.
 * Use for routes that already have requireSupplierScope (req.supplierCompany set).
 */
function requireSupplierModule(moduleCode) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (req.user.role === 'System Admin') return next();
    if (!req.supplierCompany) return res.status(404).json({ success: false, message: 'Supplier company not resolved' });

    const { planType, modules } = await resolveSupplierModules(req.supplierCompany);
    if (!modules.includes(moduleCode)) {
      return res.status(403).json({
        success: false,
        code: 'MODULE_NOT_INCLUDED',
        message: `This feature (${moduleCode}) is not included in the current subscription plan${planType ? ` (${planType})` : ''}.`,
        required_module: moduleCode
      });
    }
    next();
  };
}

/**
 * Resolve the EFFECTIVE module set of a restaurant (branch) as the UNION of:
 *   (a) its own subscription — restaurant.plan_type → PlanTemplate(restaurant).included_modules
 *   (b) any ACTIVE brand/foodcourt entity plan assigned to this branch —
 *       EntityPlanRestaurant → EntityPlan.included_modules
 *
 * Why a union (P0-2, 2026-06-08): a multi-branch brand assigns entitlements to
 * its branches via EntityPlanRestaurant, NOT by setting restaurant.plan_type.
 * Reading plan_type alone would wrongly deny features a branch is entitled to
 * through the brand plan. Union is intentionally permissive — adding a backend
 * module gate can therefore never strip access a paying customer already had via
 * EITHER source. Demo restaurants bypass upstream (caller checks is_demo).
 */
async function resolveRestaurantModules(restaurant) {
  if (!restaurant) return [];
  const PlanTemplate = require('../models/PlanTemplate');
  const EntityPlan = require('../models/EntityPlan');
  const EntityPlanRestaurant = require('../models/EntityPlanRestaurant');
  const set = new Set();

  // (a) own restaurant subscription
  if (restaurant.plan_type) {
    const plan = await PlanTemplate.findOne({
      where: { [Op.or]: [{ display_name: restaurant.plan_type }, { name: restaurant.plan_type }], plan_target: 'restaurant' }
    });
    for (const m of (plan?.included_modules || [])) set.add(m);
  }

  // (b) brand/foodcourt entity plans assigned to this branch (active only)
  const links = await EntityPlanRestaurant.findAll({
    where: { restaurant_id: restaurant.id, is_active: true },
    include: [{ model: EntityPlan, as: 'plan' }]
  });
  for (const link of links) {
    for (const m of (link.plan?.included_modules || [])) set.add(m);
  }

  return Array.from(set);
}

/**
 * Check a restaurant's subscription plan for a module code.
 * Resolves modules via resolveRestaurantModules (own plan ∪ brand/foodcourt plan).
 *
 * `moduleCode` may be a single code OR an array of codes — access is granted if
 * the restaurant has ANY of them. This mirrors the frontend's route gating,
 * where a page is shown if ANY owned module's ui_routes covers it (e.g. the
 * /ingredients page is granted by either `inventory_management` OR `ingredients`).
 * Using any-of keeps the API gate from being stricter than the UI.
 *
 * Use for routes that gate Restaurant-tier addon features (inventory, recipes…).
 * `restaurantIdParam` defaults to 'restaurant_id' but accepts 'id' for routes
 * like `/restaurants/:id/...`.
 */
function requireRestaurantModule(moduleCode, restaurantIdParam = 'restaurant_id') {
  const Restaurant = require('../models/Restaurant');
  const required = Array.isArray(moduleCode) ? moduleCode : [moduleCode];
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (req.user.role === 'System Admin') return next();

    const restaurantId =
      req.params[restaurantIdParam] ||
      req.params.id ||
      req.body?.restaurant_id ||
      req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'restaurant_id required for module check' });
    }

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurant not found' });

    // Demo → bypass (consistent with other entity gates)
    if (restaurant.is_demo) return next();

    const modules = await resolveRestaurantModules(restaurant);
    if (!required.some(code => modules.includes(code))) {
      return res.status(403).json({
        success: false, code: 'MODULE_NOT_INCLUDED',
        message: `This feature (${required.join('/')}) is not included in the current subscription plan${restaurant.plan_type ? ` (${restaurant.plan_type})` : ''}.`,
        required_module: required[0]
      });
    }
    next();
  };
}

module.exports = {
  requireBrandModule,
  requireFoodcourtModule,
  requireRestaurantModule,
  requireContractEntityModule,
  requireSupplierModule,
  resolveEntityModules,
  resolveSupplierModules,
  resolveRestaurantModules
};
