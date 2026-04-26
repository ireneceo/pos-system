/**
 * Buyer scope middleware (Sprint 2 — Supply Chain Design 2)
 *
 * Resolves the buyer's (entity_type, entity_id) pair from the authenticated user's role:
 *   - Restaurant Admin / Staff → ('restaurant', user.restaurant_id)
 *   - Restaurant Owner       → ('restaurant', user.restaurant_id) if assigned
 *                               or via RestaurantManager join (multi-restaurant owner)
 *   - Brand General / Manager → ('brand', user.brand_id)
 *   - Foodcourt General / Manager → ('foodcourt', user.foodcourt_id)
 *   - System Admin → optional ?entity_type=&entity_id= override
 *
 * Sets req.buyerEntity = { type, id } and req.buyerIsAdmin = boolean.
 */

const BUYER_ROLES = [
  'Restaurant Admin', 'Restaurant Owner', 'Staff',
  'Brand General', 'Brand Manager',
  'Foodcourt General', 'Foodcourt Manager'
];

function resolveBuyerFromUser(user) {
  if (user.role === 'Restaurant Admin' || user.role === 'Staff') {
    if (!user.restaurant_id) return null;
    return { type: 'restaurant', id: parseInt(user.restaurant_id, 10) };
  }
  if (user.role === 'Restaurant Owner') {
    if (user.restaurant_id) return { type: 'restaurant', id: parseInt(user.restaurant_id, 10) };
    return null; // Multi-restaurant owner: handler must use RestaurantManager join
  }
  if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    if (!user.brand_id) return null;
    return { type: 'brand', id: parseInt(user.brand_id, 10) };
  }
  if (user.role === 'Foodcourt General' || user.role === 'Foodcourt Manager') {
    if (!user.foodcourt_id) return null;
    return { type: 'foodcourt', id: parseInt(user.foodcourt_id, 10) };
  }
  return null;
}

function requireBuyerRole(req, res, next) {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  // System Admin: optional override
  if (user.role === 'System Admin') {
    const t = req.query.entity_type;
    const i = parseInt(req.query.entity_id, 10);
    if (t && Number.isFinite(i) && ['restaurant', 'brand', 'foodcourt'].includes(t)) {
      req.buyerEntity = { type: t, id: i };
    } else {
      req.buyerEntity = null;
    }
    req.buyerIsAdmin = true;
    return next();
  }

  if (!BUYER_ROLES.includes(user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Buyer role required (Restaurant / Brand General / Foodcourt General)'
    });
  }

  const entity = resolveBuyerFromUser(user);
  if (!entity) {
    return res.status(403).json({
      success: false,
      message: 'No buyer entity assigned to your account (restaurant_id / brand_id / foodcourt_id missing)'
    });
  }

  req.buyerEntity = entity;
  req.buyerIsAdmin = false;
  next();
}

module.exports = {
  requireBuyerRole,
  resolveBuyerFromUser,
  BUYER_ROLES
};
