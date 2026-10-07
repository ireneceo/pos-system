/**
 * Buyer scope middleware (Sprint 2 — Supply Chain Design 2)
 *
 * Resolves the buyer's (entity_type, entity_id) pair from the authenticated user's role:
 *   - Restaurant Admin / Staff → ('restaurant', user.restaurant_id)
 *   - Restaurant Owner       → ('restaurant', user.restaurant_id) if assigned
 *        + 소유 매장 «으로 행동» 전환(?entity_type=restaurant&entity_id=N) — ownership 확인, OWNER_ACTING_ROUTES 만(보기·작성·제출·취소)
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

// 오너가 소유 매장으로 전환해 부를 수 있는 라우트 (2026-10-04 Fable 판정 owner-po-on-behalf ①·§6, 2026-10-05 화면 실측).
//   목록 밖은 전부 403 — 화면이 다른 라우트를 부르게 되면 여기에 **명시적으로** 더한다(fail-closed).
const OWNER_ACTING_ROUTES = [
  ['GET',    /^\/api\/purchase-orders(\/|$)/],                        // 보기(목록·상세·PDF·반품 이력)
  ['POST',   /^\/api\/purchase-orders$/],                              // 초안 만들기
  ['POST',   /^\/api\/purchase-orders\/bulk$/],                        // 장바구니 → 공급처별 초안
  ['POST',   /^\/api\/purchase-orders\/consolidate-drafts$/],          // Staging 같은 공급처 초안 합치기
  ['POST',   /^\/api\/purchase-orders\/\d+\/refresh-prices$/],         // Staging 초안 가격 갱신
  ['POST',   /^\/api\/purchase-orders\/\d+\/submit$/],                 // 제출(승인 게이트 단일 소스)
  ['POST',   /^\/api\/purchase-orders\/\d+\/mark-sent-external$/],     // 외부 공급업체 보냄 표시(같은 게이트)
  ['POST',   /^\/api\/purchase-orders\/\d+\/cancel$/],                 // 취소(§6)
  ['DELETE', /^\/api\/purchase-orders\/\d+$/],                         // 초안 버리기(라우트가 draft 만 허용)
  ['DELETE', /^\/api\/purchase-orders\/\d+\/items\/\d+$/],             // 초안 품목 빼기(라우트가 draft 만 허용)
  // 청구서 총액 수정(2026-10-07 Fable 판정 «오너 총액만») — 10-04 «원가대조 403» 의 유일한 예외.
  //   라우트(cost-reconciliation POST)가 오너면 total_only 아닌 요청을 403 OWNER_TOTAL_ONLY 로 거절한다.
  ['POST',   /^\/api\/purchase-orders\/\d+\/reconcile$/],
];

function isOwnerActingRoute(method, originalUrl) {
  const path = String(originalUrl || '').split('?')[0];
  return OWNER_ACTING_ROUTES.some(([m, re]) => m === method && re.test(path));
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

  // 직원(Staff)의 발주 = «Stock Management»(inventory) 권한 직원만 (2026-10-04 Irene «직원 로그인에서 Purchase Order 안 뜬다»).
  //   화면 메뉴가 같은 권한으로 보이고 숨는다(MainLayout hasMenuPermission('inventory')). 서버가 더 넓으면 안 된다.
  //   발주 주소(/api/purchase-orders*)만 — 이 가드는 재료·공급업체 라우터에도 걸려 있어 넓히면 레시피 편집 직원이 막힌다.
  if (user.role === 'Staff' && /^\/api\/purchase-orders(\/|\?|$)/.test(req.originalUrl || '')
      && !(Array.isArray(user.permissions) && user.permissions.includes('inventory'))) {
    return res.status(403).json({ success: false, message: 'Stock Management permission required for purchase orders' });
  }

  // Restaurant Owner — 소유 매장 «으로 행동» (2026-10-04 Fable 판정 owner-po-on-behalf ① — 9-24 §2-A «오너는 만들지 않는다» 대체).
  //   ?entity_type=restaurant&entity_id=N 를 주면 ownership 연결을 **서버가** 확인한 뒤 그 매장 RA 와 같은 구매자 실체가 된다.
  //   발주 주인은 그대로 매장(그 매장 Order History 에 들어간다). 오너가 제출하면 승인 생략(utils/poOwnerApproval).
  //   허용 = OWNER_ACTING_ROUTES(발주 보기 + 작성 흐름이 실제로 부르는 라우트 + 취소). 그 밖(외부 공급업체 등록·수정,
  //   재고, 재료 연결, 수령·결제·반품·원가대조)은 403 그대로 — 수령은 물건이 있는 매장 몫, 공급업체 추가는 오너 자기 실체(상속 경로).
  if (user.role === 'Restaurant Owner' && req.query.entity_type === 'restaurant') {
    const wanted = parseInt(req.query.entity_id, 10);
    if (Number.isFinite(wanted)) {
      if (!isOwnerActingRoute(req.method, req.originalUrl || '')) {
        return res.status(403).json({ success: false, message: 'Owners can view, create, submit and cancel purchase orders of their restaurants only' });
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
