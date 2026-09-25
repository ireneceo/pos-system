/**
 * Buyer scope middleware (Sprint 2 — Supply Chain Design 2)
 *
 * Resolves the buyer's (entity_type, entity_id) pair from the authenticated user's role:
 *   - Restaurant Admin / Staff → ('restaurant', user.restaurant_id)
 *   - Restaurant Owner       → ('restaurant', user.restaurant_id) if assigned
 *        + 소유 매장 «보기» 전환(?entity_type=restaurant&entity_id=N) — ownership 확인, GET /api/purchase-orders* 만
 *        + 소속 매장 없는 오너: 외부 공급업체 라우트 → ('owner', user.id) · 발주 목록 → 소유 매장 전체(§H-3)
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

  // Restaurant Owner — 소유 매장의 발주를 «보기만» (2026-09-24 Fable 판정 «오너=슈퍼바이저» §2-A).
  //   ?entity_type=restaurant&entity_id=N 를 주면 ownership 연결을 **서버가** 확인한 뒤 그 매장으로 본다.
  //   허용은 GET /api/purchase-orders* 뿐 — 오너는 발주를 만들거나 고치지 않는다(발주 주인은 항상 매장,
  //   오너의 주문 행위 = 승인. 승인·반려 라우트는 이 미들웨어 앞에 따로 있다). 공급업체 등 다른 구매자 라우트는 이 전환을 받지 않는다.
  if (user.role === 'Restaurant Owner' && req.query.entity_type === 'restaurant') {
    const wanted = parseInt(req.query.entity_id, 10);
    if (Number.isFinite(wanted)) {
      const isPoRead = req.method === 'GET' && /^\/api\/purchase-orders(\/|\?|$)/.test(req.originalUrl || '');
      if (!isPoRead) {
        return res.status(403).json({ success: false, message: 'Owners can only view purchase orders of their restaurants' });
      }
      try {
        const { RestaurantManager } = require('../models');
        const owned = await RestaurantManager.findOne({
          where: { restaurant_id: wanted, manager_id: user.id, relationship_type: 'ownership' }, attributes: ['id']
        });
        if (!owned) return res.status(403).json({ success: false, message: 'Not your restaurant' });
        req.buyerEntity = { type: 'restaurant', id: wanted };
        req.buyerIsAdmin = false;
        req.buyerIsOwnerView = true;
        return next();
      } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to resolve buyer restaurant' });
      }
    }
  }

  // Restaurant Owner (소속 매장 없음 = 다매장 오너) — 오너 자기 실체 (2026-09-24 Fable «오너=슈퍼바이저» §1-A·§2-B · docs/SUPPLIER_CONTRACT_SYSTEM.md §H-3)
  //   ① 외부 공급업체 등록·관리(/api/external-suppliers*, 업체 프로필 GET /api/supplier-directory/:id) → { type:'owner', id:user.id }.
  //      소유 매장들이 이 업체를 상속해 쓴다(utils/supplierAccess.findParentContract).
  //   ② 발주 목록 GET /api/purchase-orders(목록만) → 소유 매장 전체를 한 표로(req.buyerOwnerRestaurantIds).
  //   그 밖의 구매자 라우트(발주 작성·수령·재료 연결·재고 등)는 오너 실체를 받지 않는다 — 아래에서 403(fail-closed).
  if (user.role === 'Restaurant Owner' && !user.restaurant_id && !req.query.entity_type) {
    const url = (req.originalUrl || '').split('?')[0];
    if (/^\/api\/external-suppliers(\/|$)/.test(url) || (req.method === 'GET' && /^\/api\/supplier-directory\/\d+$/.test(url))) {
      req.buyerEntity = { type: 'owner', id: parseInt(user.id, 10) };
      req.buyerIsAdmin = false;
      return next();
    }
    if (req.method === 'GET' && /^\/api\/purchase-orders\/?$/.test(url)) {
      try {
        const { RestaurantManager } = require('../models');
        const rows = await RestaurantManager.findAll({ where: { manager_id: user.id, relationship_type: 'ownership' }, attributes: ['restaurant_id'], raw: true });
        req.buyerEntity = { type: 'owner', id: parseInt(user.id, 10) };
        req.buyerOwnerRestaurantIds = [...new Set(rows.map(r => Number(r.restaurant_id)).filter(Number.isFinite))];
        req.buyerIsAdmin = false;
        req.buyerIsOwnerView = true;
        return next();
      } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to resolve owner restaurants' });
      }
    }
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
