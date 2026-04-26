/**
 * requirePlanLimit — block writes when subscription plan limit reached
 *
 * Sprint 1: supplier products (`product_limit`) only. Customer/order/staff limits
 * extend in later sprints (just add a counter for the relevant entity below).
 *
 * Bypass:
 *  - System Admin
 *  - limit value is null (not applicable to this plan_target)
 *  - limit value is -1 (unlimited)
 *
 * Returns 400 with `code: 'PLAN_LIMIT_REACHED'` so frontend can show upgrade CTA.
 *
 * Usage:
 *   router.post('/api/supplier-products',
 *     authenticateToken, requireSupplierScope,
 *     requirePlanLimit('product_limit'),
 *     handler);
 */
const { PlanTemplate, SupplierProduct } = require('../models');

async function countCurrent(limitField, req) {
  if (limitField === 'product_limit') {
    return SupplierProduct.count({
      where: { supplier_company_id: req.supplierCompany.id }
    });
  }
  // Sprint 2~4 will add: customer_limit, order_limit (per month), staff_limit
  return 0;
}

function requirePlanLimit(limitField) {
  return async (req, res, next) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Not authenticated' });
    if (req.user.role === 'System Admin') return next();
    if (!req.supplierCompany) return next(); // SA without supplier override

    const plan = req.supplierCompany.plan_id
      ? await PlanTemplate.findByPk(req.supplierCompany.plan_id)
      : null;
    const limit = plan?.[limitField];

    // null = not applicable, -1 = unlimited
    if (limit === null || limit === undefined || limit === -1) return next();

    const current = await countCurrent(limitField, req);
    if (current >= limit) {
      return res.status(400).json({
        success: false,
        code: 'PLAN_LIMIT_REACHED',
        message: 'Plan limit reached. Upgrade to Advanced.',
        data: { limit, current, field: limitField, plan: plan?.display_name }
      });
    }
    next();
  };
}

module.exports = { requirePlanLimit };
