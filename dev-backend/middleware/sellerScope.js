/**
 * Seller scope middleware (Sprint 4 — Supply Chain Design 4)
 *
 * Resolves the seller's (seller_type, seller_entity_id) pair from the user's role:
 *   - Supplier Admin → ('supplier', supplierCompany.id)
 *   - Brand General/Manager → ('brand', user.brand_id)
 *   - Foodcourt General/Manager → ('foodcourt', user.foodcourt_id)
 *   - System Admin → optional ?seller_type=&seller_entity_id= override
 *
 * Sets req.sellerEntity = { type, id } and req.sellerIsAdmin = boolean.
 */
const SELLER_ROLES = [
  'Supplier Admin',
  'Brand General', 'Brand Manager',
  'Foodcourt General', 'Foodcourt Manager'
];

const { SupplierCompany } = require('../models');

async function requireSellerRole(req, res, next) {
  const user = req.user;
  if (!user) return res.status(401).json({ success: false, message: 'Not authenticated' });

  if (user.role === 'System Admin') {
    const t = req.query.seller_type;
    const i = parseInt(req.query.seller_entity_id, 10);
    if (t && Number.isFinite(i) && ['system_admin', 'brand', 'foodcourt', 'supplier'].includes(t)) {
      req.sellerEntity = { type: t, id: i };
    } else if (t === 'system_admin') {
      req.sellerEntity = { type: 'system_admin', id: null };
    } else {
      req.sellerEntity = null;
    }
    req.sellerIsAdmin = true;
    return next();
  }

  if (!SELLER_ROLES.includes(user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Seller role required (Supplier Admin / Brand General / Foodcourt General)'
    });
  }

  let entity;
  if (user.role === 'Supplier Admin') {
    const company = await SupplierCompany.findOne({ where: { owner_id: user.id } });
    if (!company) return res.status(404).json({ success: false, message: 'No supplier company found' });
    entity = { type: 'supplier', id: company.id };
  } else if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    if (!user.brand_id) return res.status(403).json({ success: false, message: 'No brand assigned' });
    entity = { type: 'brand', id: parseInt(user.brand_id, 10) };
  } else {
    if (!user.foodcourt_id) return res.status(403).json({ success: false, message: 'No foodcourt assigned' });
    entity = { type: 'foodcourt', id: parseInt(user.foodcourt_id, 10) };
  }

  req.sellerEntity = entity;
  req.sellerIsAdmin = false;
  next();
}

module.exports = { requireSellerRole, SELLER_ROLES };
