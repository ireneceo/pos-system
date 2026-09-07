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
  } else if (user.role === 'Brand General' || user.role === 'Brand Manager') {
    // 🔴 브랜드는 **여러 개일 수 있다** (2026-09-07).
    //   GIT(user 23)은 `with MIN`(1)·`K-DINE with MIN`(2)을 둘 다 소유하는데
    //   `user.brand_id` 하나(=1)만 보다가, 브랜드 2 앞으로 온 발주
    //   `PO-R8-20260907-001`(RM 1,338.40 · 9품목)이 **판매자 화면에 아예 안 떴다**.
    //   구매자는 정상 제출했는데 파는 쪽이 못 봤다.
    //   `brands.owner_id` 로 소유 브랜드를 모두 모은다 — `brand-soa.js`·`brand-revenue.js` 의
    //   `brandIdsFromScope` 와 같은 규칙(거기는 이미 ownedBrandIds 를 쓴다).
    const owned = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
    const ids = [...new Set([
      ...owned.map((b) => parseInt(b.id, 10)),
      ...(user.brand_id ? [parseInt(user.brand_id, 10)] : []),   // 소속만 있고 소유가 아닌 매니저
    ])].filter(Boolean);
    if (ids.length === 0) return res.status(403).json({ success: false, message: 'No brand assigned' });
    // `id` 는 대표 브랜드(하위 호환), `ids` 는 전체 — 목록·소유권 판정은 `ids` 를 본다.
    entity = { type: 'brand', id: ids[0], ids };
  } else {
    if (!user.foodcourt_id) return res.status(403).json({ success: false, message: 'No foodcourt assigned' });
    entity = { type: 'foodcourt', id: parseInt(user.foodcourt_id, 10) };
  }

  req.sellerEntity = entity;
  req.sellerIsAdmin = false;
  next();
}

module.exports = { requireSellerRole, SELLER_ROLES };
