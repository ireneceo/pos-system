/**
 * Supplier scope middleware (Sprint 1 — Supply Chain Design 1)
 *
 * Mirrors brandScope.js pattern:
 *  - requireSupplierScope: ensures user is Supplier Admin (or SA with override)
 *    and resolves their SupplierCompany via owner_id → req.supplierCompany.
 *
 * Usage:
 *   router.get('/', authenticateToken, requireSupplierScope, handler);
 *   // handler accesses: req.supplierCompany (full row), req.supplierCompany.id (FK)
 *
 * SA bypass:
 *   System Admin can pass ?supplier_company_id=N to operate on any company
 *   (mirrors BG's ?owner_user_id pattern).
 */
const { SupplierCompany } = require('../models');

function isSysAdmin(user) {
  return user?.role === 'System Admin';
}

function isSupplierAdmin(user) {
  return user?.role === 'Supplier Admin';
}

async function requireSupplierScope(req, res, next) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  // System Admin: optional supplier_company_id override
  if (isSysAdmin(user)) {
    const override = req.query.supplier_company_id ? parseInt(req.query.supplier_company_id, 10) : null;
    if (override) {
      const company = await SupplierCompany.findByPk(override);
      if (!company) {
        return res.status(404).json({ success: false, message: 'Supplier company not found' });
      }
      req.supplierCompany = company;
      req.supplierIsAdmin = true;
      return next();
    }
    // SA without override: req.supplierCompany null (handler must filter or skip)
    req.supplierCompany = null;
    req.supplierIsAdmin = true;
    return next();
  }

  if (!isSupplierAdmin(user)) {
    return res.status(403).json({ success: false, message: 'Supplier Admin access only' });
  }

  const company = await SupplierCompany.findOne({
    where: { owner_id: user.id }
  });
  if (!company) {
    return res.status(404).json({ success: false, message: 'No supplier company found for this user' });
  }
  req.supplierCompany = company;
  req.supplierIsAdmin = false;
  next();
}

/**
 * Apply supplier_company_id filter to a Sequelize where clause.
 * SA without override: no filter (sees all).
 */
function applySupplierFilter(where, req) {
  if (req.supplierIsAdmin && !req.supplierCompany) return where;
  where.supplier_company_id = req.supplierCompany.id;
  return where;
}

module.exports = {
  requireSupplierScope,
  applySupplierFilter,
  isSupplierAdmin
};
