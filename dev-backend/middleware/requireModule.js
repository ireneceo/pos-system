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

module.exports = {
  requireBrandModule,
  requireFoodcourtModule,
  requireContractEntityModule,
  requireSupplierModule,
  resolveEntityModules,
  resolveSupplierModules
};
