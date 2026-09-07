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
    // 🔴 판매자 화면은 **그 조직이 파는 모든 브랜드**를 봐야 한다 (Irene 2026-09-07:
    //   "여긴 모든 브랜드 주문 다 나와야 해").
    //
    //   실측한 사고: GIT 은 `with MIN`(1)·`K-DINE with MIN`(2)을 함께 운영하는데
    //   K-DINE 발주 `PO-R8-20260907-001`(RM 1,338.40 · 9품목)이 **브랜드 2** 앞으로 갔다.
    //   종전 코드는 `user.brand_id` 하나(=1)만 봐서 그 발주가 판매자 화면에서 통째로 사라졌다.
    //   구매자는 정상 제출했는데 파는 쪽이 못 봤다.
    //
    //   범위는 셋의 합집합이다:
    //     ① 내가 주인인 브랜드            (`brands.owner_id = 나`)
    //     ② 내 소속 브랜드                (`user.brand_id` — 주인이 아닌 매니저)
    //     ③ **내 소속 브랜드와 주인이 같은 형제 브랜드**
    //        ③ 이 없으면 `irene@gitconsulting.group`(브랜드 1 소속·소유 0) 은 여전히 브랜드 1만 본다.
    //        같은 주인이 가진 브랜드는 같은 조직이므로 판매 내역을 함께 보는 것이 맞다.
    //        (2026-09-06 Brand Manager 접근 수정 때 쓴 "형제 판정식"과 같은 생각.)
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
    const list = [...ids].filter(Boolean);
    if (list.length === 0) return res.status(403).json({ success: false, message: 'No brand assigned' });
    // `id` 는 대표(하위 호환), `ids` 가 실제 범위다 — 목록·소유권 판정은 `ids` 를 본다.
    entity = { type: 'brand', id: user.brand_id ? parseInt(user.brand_id, 10) : list[0], ids: list };
  } else {
    if (!user.foodcourt_id) return res.status(403).json({ success: false, message: 'No foodcourt assigned' });
    entity = { type: 'foodcourt', id: parseInt(user.foodcourt_id, 10) };
  }

  req.sellerEntity = entity;
  req.sellerIsAdmin = false;
  next();
}

module.exports = { requireSellerRole, SELLER_ROLES };
