/**
 * 브랜드 소속 판정 단일 소스 (2026-09-08)
 *
 * ## 왜 생겼나
 * `/api/orders`(orders-crud.js)와 `manager-sales.js` 가 Brand General 범위를
 * **`Brand.owner_id` 하나로만** 잡고 있었다. 그런데 이 솔루션에서 브랜드 사람은 두 갈래다:
 *   ① 브랜드를 **소유**한 사람 (`brands.owner_id`)
 *   ② 브랜드에 **배정된** 사람 (`users.brand_id`) — Brand General/Manager 로 붙여 둔 계정
 *
 * ②가 빠져 있어서, 배정만 된 Brand General 은 주문이 **0건**으로 왔다.
 * 매장 목록은 다른 경로(브랜드 기준)로 오기 때문에 화면엔 **매장은 보이는데 숫자만 0** 으로 나온다.
 * 운영 실측(2026-09-08): `with MIN Cafe`(매장 10, 브랜드 1) — DB 25건/RM 1,352.29 인데
 * 소유자 계정은 25건, 배정 계정은 0건을 받았다. 같은 역할·같은 브랜드인데 사람마다 달랐다.
 *
 * ⛔ 형제 브랜드(같은 소유자의 다른 브랜드)는 여기 넣지 않는다 — 이 신고가 요구하지 않고,
 *    권한을 필요 이상으로 넓히지 않는다.
 */
const { Op } = require('sequelize');

/**
 * 이 사용자가 볼 수 있는 브랜드 id 들 — **소유 ∪ 배정**.
 * @param {{id:number, role:string, brand_id?:number|null}} user
 * @returns {Promise<number[]>}
 */
async function brandIdsForUser(user) {
  if (!user || !['Brand General', 'Brand Manager'].includes(user.role)) return [];
  if (user.role === 'Brand Manager') return managerBrandIds(user);
  const Brand = require('../models/Brand');
  const ids = new Set();

  const owned = await Brand.findAll({ where: { owner_id: user.id }, attributes: ['id'] });
  owned.forEach((b) => ids.add(b.id));

  // 배정된 브랜드 — 실제로 존재하는 브랜드일 때만 (지워진 브랜드 id 가 남아 있을 수 있다)
  const assigned = parseInt(user.brand_id, 10);
  if (Number.isFinite(assigned)) {
    const exists = await Brand.findByPk(assigned, { attributes: ['id'] });
    if (exists) ids.add(exists.id);
  }
  return [...ids];
}

/**
 * Brand Manager 의 브랜드 범위 (2026-10-11 · Fable 판정 fable-verdict-20261011-brand-manager-scope.md §2-1 C안).
 *
 * 매니저 = **회사 직원**, 브랜드는 필터. 회사 = 홈 브랜드(users.brand_id)의 소유자(brands.owner_id).
 *   - users.brand_scope_all = 1 → 그 소유자의 브랜드 **전부**(소유자 계정이 보는 것과 같은 규칙).
 *   - 0 → brand_manager_brands 행 ∩ 회사 브랜드 ∪ 홈. 소유자가 바뀐 브랜드는 행이 남아 있어도 닫힌다.
 *   - 홈 브랜드가 없거나 지워졌으면 0개(넓히지 않는다). 홈 소유자가 비어 있으면 홈 하나.
 * 브랜드 «모자»(user_contexts brand×Brand Manager — 다른 회사 사람에게 주는 자격)로 투영된 사용자는
 *   `brand_scope_fixed` 가 붙어 **모자 브랜드 하나**만이다(모자는 교체 — 설계 §5.4). 전체 칸·연결표를 읽지 않는다.
 * ⚠ 전체 칸은 DB 에서 다시 읽는다 — 넘겨받은 user 객체(토큰 시점·소켓 등)의 값은 믿지 않는다.
 */
async function managerBrandIds(user) {
  const Brand = require('../models/Brand');
  const home = parseInt(user.brand_id, 10);
  if (!Number.isFinite(home)) return [];
  const homeRow = await Brand.findByPk(home, { attributes: ['id', 'owner_id'] });
  if (!homeRow) return [];
  if (user.brand_scope_fixed || homeRow.owner_id == null) return [homeRow.id];

  const { sequelize } = require('../config/database');
  const [[me]] = await sequelize.query(
    'SELECT brand_scope_all FROM users WHERE id = :id AND role = \'Brand Manager\'',
    { replacements: { id: user.id } }
  );
  if (!me) return [homeRow.id];

  const company = (await Brand.findAll({ where: { owner_id: homeRow.owner_id }, attributes: ['id'] }))
    .map((b) => b.id);
  if (Number(me.brand_scope_all) === 1) return company;

  const [rows] = await sequelize.query(
    'SELECT brand_id FROM brand_manager_brands WHERE user_id = :id',
    { replacements: { id: user.id } }
  );
  const picked = new Set(rows.map((r) => Number(r.brand_id)));
  picked.add(homeRow.id);
  return company.filter((id) => picked.has(id));
}

/**
 * 매니저 범위 저장 — 추가·수정 화면 한 곳에서만 부른다.
 * all=true 면 연결표를 홈 1행으로 정리(전체를 끄면 홈만 남는다), false 면 brandIds 를 회사 브랜드로 걸러 그대로 둔다.
 * 홈 브랜드는 항상 포함. 회사 밖 브랜드 id 는 조용히 버리지 않고 에러로 돌려준다(부른 쪽이 400).
 * @returns {Promise<{ok:true, brandIds:number[]}|{ok:false, message:string}>}
 */
async function saveManagerBrandScope(userId, homeBrandId, all, brandIds, transaction) {
  const Brand = require('../models/Brand');
  const { sequelize } = require('../config/database');
  const homeRow = await Brand.findByPk(homeBrandId, { attributes: ['id', 'owner_id'], transaction });
  if (!homeRow) return { ok: false, message: 'Home brand not found' };
  const company = homeRow.owner_id == null
    ? [homeRow.id]
    : (await Brand.findAll({ where: { owner_id: homeRow.owner_id }, attributes: ['id'], transaction })).map((b) => b.id);
  const wanted = new Set([homeRow.id]);
  if (!all) {
    for (const raw of (Array.isArray(brandIds) ? brandIds : [])) {
      const id = parseInt(raw, 10);
      if (!Number.isFinite(id)) continue;
      if (!company.includes(id)) return { ok: false, message: `Brand ${id} does not belong to this company` };
      wanted.add(id);
    }
  }
  await sequelize.query('UPDATE users SET brand_scope_all = :all WHERE id = :id',
    { replacements: { all: all ? 1 : 0, id: userId }, transaction });
  await sequelize.query('DELETE FROM brand_manager_brands WHERE user_id = :id',
    { replacements: { id: userId }, transaction });
  for (const id of wanted) {
    await sequelize.query('INSERT INTO brand_manager_brands (user_id, brand_id) VALUES (:u, :b)',
      { replacements: { u: userId, b: id }, transaction });
  }
  return { ok: true, brandIds: [...wanted] };
}

/** 이 매니저 계정들의 저장된 범위 — 목록 화면 표시용. { [userId]: { all, brandIds } } */
async function managerScopesFor(userIds) {
  const ids = (userIds || []).map((x) => parseInt(x, 10)).filter(Number.isFinite);
  if (!ids.length) return {};
  const { sequelize } = require('../config/database');
  const [users] = await sequelize.query('SELECT id, brand_scope_all FROM users WHERE id IN (:ids)', { replacements: { ids } });
  const [rows] = await sequelize.query('SELECT user_id, brand_id FROM brand_manager_brands WHERE user_id IN (:ids)', { replacements: { ids } });
  const out = {};
  users.forEach((u) => { out[u.id] = { all: Number(u.brand_scope_all) === 1, brandIds: [] }; });
  rows.forEach((r) => { if (out[r.user_id]) out[r.user_id].brandIds.push(Number(r.brand_id)); });
  return out;
}

/**
 * 회사 공용 자료(브랜드 상품·상품 레시피·재고 아이템·실사·공급업체 — owner_user_id 로 걸린 것)의 주인 번호.
 *   Brand General → 자기 id(종전 그대로). Brand Manager → 홈 브랜드의 소유자 id(2026-10-11 Fable 판정 §2-2:
 *   매니저는 회사 직원이라 회사 것을 본다. 매니저 자기 id 로 찾으면 0건이었다). 홈이 없거나 소유자가 비면 null.
 */
async function companyOwnerIdFor(user) {
  if (!user) return null;
  if (user.role === 'Brand General') return user.id;
  if (user.role !== 'Brand Manager') return null;
  const home = parseInt(user.brand_id, 10);
  if (!Number.isFinite(home)) return null;
  const Brand = require('../models/Brand');
  const row = await Brand.findByPk(home, { attributes: ['owner_id'] });
  return row && row.owner_id != null ? Number(row.owner_id) : null;
}

/** 위 브랜드들에 속한 매장 id 들. */
async function brandRestaurantIdsForUser(user) {
  const brandIds = await brandIdsForUser(user);
  if (!brandIds.length) return [];
  const Restaurant = require('../models/Restaurant');
  const rs = await Restaurant.findAll({ where: { brand_id: { [Op.in]: brandIds } }, attributes: ['id'] });
  return rs.map((r) => r.id);
}

/**
 * 위 판정의 **역방향** — 이 브랜드를 «내 브랜드» 로 가진 사람들의 user id (소유자 ∪ 배정된 BG/BM).
 *
 * 브랜드 상품의 «All franchises»(distribution_mode='all') 는 «내 모든 브랜드의 가맹점» 이다.
 * 그런데 가맹점 쪽 판정이 `상품 주인 === 브랜드 소유자` 하나만 봐서, **배정만 된 Brand General**
 * 이 만든 상품은 자기 브랜드 가맹점에도 안 나왔다(2026-09-21 dev 재현: 상품 2개가 브랜드 1 매장 3곳에서 0/2).
 * 상품 주인 u 에 대해 `brand ∈ brandIdsForUser(u)` ⇔ `u ∈ brandOwnerUserIds(brand)` — 같은 규칙의 양면이다.
 * ⛔ 형제 브랜드는 여기서도 넣지 않는다.
 * @param {number} brandId
 * @returns {Promise<number[]>}
 */
async function brandOwnerUserIds(brandId) {
  const id = parseInt(brandId, 10);
  if (!Number.isFinite(id)) return [];
  const Brand = require('../models/Brand');
  const User = require('../models/User');
  const ids = new Set();
  const brand = await Brand.findByPk(id, { attributes: ['id', 'owner_id'] });
  if (!brand) return [];
  if (brand.owner_id != null) ids.add(Number(brand.owner_id));
  const assigned = await User.findAll({
    where: { brand_id: id, role: { [Op.in]: ['Brand General', 'Brand Manager'] } },
    attributes: ['id']
  });
  assigned.forEach((u) => ids.add(Number(u.id)));
  return [...ids];
}

module.exports = { brandIdsForUser, managerBrandIds, companyOwnerIdFor, saveManagerBrandScope, managerScopesFor, brandRestaurantIdsForUser, brandOwnerUserIds };
