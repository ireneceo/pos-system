/**
 * Brand General 의 브랜드 범위 — **소유 ∪ 소속 ∪ 형제**.
 *
 * 왜 형제까지 (Irene 2026-09-07 "여긴 모든 브랜드 주문 다 나와야 해"):
 *   `brands.owner_id` 는 값이 하나라 같은 조직의 **두 번째 BG 계정은 구조상 소유자가 될 수 없다**.
 *   `irene@gitconsulting.group`(브랜드 1 소속·소유 0)이 그 경우고, 그 계정이 조직과 이어진
 *   유일한 끈이 `brand_id` 다. 그래서 "내 소속 브랜드의 주인이 가진 브랜드 전부" 가 곧 조직이다.
 *   주인이 다르면 포함되지 않으므로 타 조직 누출은 구조적으로 불가능(dev 실측 0건).
 *
 * ⛔ Brand Manager 에게는 쓰지 않는다 — BM 은 소속 브랜드 하나다(2026-09-06 판정).
 */
async function resolveBrandScopeIds(user) {
  const ids = new Set();
  (await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] }))
    .forEach((b) => ids.add(parseInt(b.id, 10)));
  if (user.brand_id) {
    const mine = parseInt(user.brand_id, 10);
    ids.add(mine);
    const home = await Brand.findByPk(mine, { attributes: ['id', 'owner_id'] });
    if (home && home.owner_id) {
      (await Brand.findAll({ where: { owner_id: home.owner_id }, attributes: ['id'] }))
        .forEach((b) => ids.add(parseInt(b.id, 10)));
    }
  }
  return [...ids].filter(Boolean);
}

/**
 * 이 발주가 요청자(판매자)의 것인가 — **단일 소스**.
 *   종전에 `seller-orders.js`(목록·단건)와 `po-returns.js`(목록·반품승인)에 **세 벌 복제**돼 있었고,
 *   범위를 넓힐 때 `seller-orders.js` 만 고쳐 **목록엔 보이는데 반품은 404** 가 됐다(Fable 적발).
 */
function ownsPurchaseOrder(po, req) {
  if (!po) return false;
  if (!req.sellerEntity) return !!req.sellerIsAdmin;
  if (po.seller_type !== req.sellerEntity.type) return false;
  if (req.sellerEntity.id == null) return po.seller_entity_id == null;
  const ids = req.sellerEntity.ids;
  if (Array.isArray(ids) && ids.length > 0) {
    return ids.map(Number).includes(parseInt(po.seller_entity_id, 10));
  }
  return parseInt(po.seller_entity_id, 10) === parseInt(req.sellerEntity.id, 10);
}

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

const { SupplierCompany, Brand } = require('../models');

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
  } else if (user.role === 'Brand General') {
    const list = await resolveBrandScopeIds(user);
    if (list.length === 0) return res.status(403).json({ success: false, message: 'No brand assigned' });
    entity = { type: 'brand', id: user.brand_id ? parseInt(user.brand_id, 10) : list[0], ids: list };
  } else if (user.role === 'Brand Manager') {
    // ⛔ BM 은 **소속 브랜드 하나**다 — 2026-09-06 판정(`brandScope.js` BM 분기)과 같은 규칙.
    //   판매자 화면에서만 형제까지 열면 같은 사람이 재고·레시피에서는 한 브랜드,
    //   발주에서는 형제 전부를 보게 되어 규칙이 갈린다. 넓히지 않는다.
    if (!user.brand_id) return res.status(403).json({ success: false, message: 'No brand assigned to this manager' });
    const only = parseInt(user.brand_id, 10);
    entity = { type: 'brand', id: only, ids: [only] };
  } else {
    if (!user.foodcourt_id) return res.status(403).json({ success: false, message: 'No foodcourt assigned' });
    entity = { type: 'foodcourt', id: parseInt(user.foodcourt_id, 10) };
  }

  req.sellerEntity = entity;
  req.sellerIsAdmin = false;
  next();
}

module.exports = { requireSellerRole, SELLER_ROLES, resolveBrandScopeIds, ownsPurchaseOrder };
