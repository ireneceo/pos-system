/**
 * Buyer scope middleware (Sprint 2 — Supply Chain Design 2)
 *
 * Resolves the buyer's (entity_type, entity_id) pair from the authenticated user's role:
 *   - Restaurant Admin / Staff → ('restaurant', user.restaurant_id)
 *   - Restaurant Owner       → ('restaurant', user.restaurant_id) if assigned
 *                               or via RestaurantManager join (multi-restaurant owner)
 *   - Brand General / Manager → ('brand', user.brand_id)
 *        + Brand General 은 **자기가 소유한 다른 브랜드**로 전환 가능(?entity_type=brand&entity_id=N).
 *          한 오너가 브랜드를 여러 개 갖는 게 정상인데(project_brand_multi_owner) primary 한 곳에
 *          고정돼 있어, 두 번째 브랜드의 재료엔 공급처조차 못 붙였다 — 실제로 운영 K-DINE 이
 *          여기 걸려 공급처 0건이었다. 소유(Brand.owner_id === user.id) 확인 후에만 허용.
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

async function requireBuyerRole(req, res, next) {
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

  // Brand General 이 자기가 소유한 다른 브랜드로 전환 — 소유 확인 후에만.
  // (Brand Manager 는 전환 불가: 배정된 브랜드만.)
  if (user.role === 'Brand General' && req.query.entity_type === 'brand') {
    const wanted = parseInt(req.query.entity_id, 10);
    if (Number.isFinite(wanted) && wanted !== entity.id) {
      try {
        const { Brand } = require('../models');
        const owned = await Brand.findOne({ where: { id: wanted, owner_id: user.id }, attributes: ['id'] });
        if (!owned) {
          return res.status(403).json({ success: false, message: 'Not your brand' });
        }
        req.buyerEntity = { type: 'brand', id: wanted };
        req.buyerIsAdmin = false;
        return next();
      } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to resolve buyer brand' });
      }
    }
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
