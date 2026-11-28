/**
 * 공급업체 전용 상품 — «이 손님에게 보이고 주문되는가» 단일 판정 (2026-11-28 · 맞춤 제작 루트 1단계 N2)
 * 설계: docs/TRADE_STRUCTURE.md §2-6 · .claude/fable-design-20261128-quote-custom-product-route.md
 *
 * 규칙:
 *   audience_mode = 'all'      → 지금처럼(계약·«누구나 주문» 규칙만 따른다)
 *   audience_mode = 'selected' → supplier_product_buyers 에 **그 손님 자신**(발주서 구매자 칸과 같은 type/id)이 있을 때만.
 *     가입 공급업체는 계약 상속이 없으므로(utils/supplierAccess.js) 오너·브랜드를 거친 상속도 없다.
 *   손님을 모르면(익명 · 공개 상품 링크) selected 는 **언제나 안 보인다**(닫는 쪽).
 *
 * ⛔ 구매자 쪽에서 공급업체 상품을 읽는 곳은 전부 이 파일만 쓴다 — 조건을 라우트에 복사하지 않는다.
 * ⛔ 판매자 자기 화면(상품 목록·주문 처리)은 이 판정을 쓰지 않는다 — 자기 상품이다.
 */
const { Op, literal } = require('sequelize');

const AUDIENCE_ALL = 'all';
const AUDIENCE_SELECTED = 'selected';
const AUDIENCE_MODES = [AUDIENCE_ALL, AUDIENCE_SELECTED];
const BUYER_TYPES = ['restaurant', 'brand', 'foodcourt'];

/** 손님 {type,id} 를 정규화한다. 모르는 형태면 null(= 익명 취급 → 전용 상품 안 보임). */
function normBuyer(buyer) {
  if (!buyer) return null;
  const type = buyer.type || buyer.entity_type;
  const id = parseInt(buyer.id != null ? buyer.id : buyer.entity_id, 10);
  if (!BUYER_TYPES.includes(type) || !Number.isFinite(id)) return null;
  return { type, id };
}

/**
 * Sequelize where 조각 — `SupplierProduct.findAll({ where: { ...기존, [Op.and]: [audienceWhere(buyer)] } })`.
 * 별칭 없는 단일 표 조회(supplier_products 가 바깥 표)에서 쓴다. include 와 함께 쓸 때도 `SupplierProduct` 별칭이 바깥이다.
 */
function audienceWhere(buyer, tableAlias = 'SupplierProduct') {
  const b = normBuyer(buyer);
  if (!b) return { audience_mode: AUDIENCE_ALL };
  // type 은 화이트리스트, id 는 정수 — literal 안에 바로 넣어도 안전하다.
  return {
    [Op.or]: [
      { audience_mode: AUDIENCE_ALL },
      literal(`EXISTS (SELECT 1 FROM supplier_product_buyers spb WHERE spb.supplier_product_id = \`${tableAlias}\`.\`id\` AND spb.entity_type = '${b.type}' AND spb.entity_id = ${b.id})`)
    ]
  };
}

/**
 * 상품 행 하나(또는 여러 개)에 대해 이 손님이 볼 수 있는 상품 id 집합.
 * @param {Array<{id, audience_mode}>} rows
 */
async function visibleIdsFor(rows, buyer, { transaction } = {}) {
  const list = (rows || []).filter(Boolean);
  const out = new Set();
  const selectedIds = [];
  for (const r of list) {
    if ((r.audience_mode || AUDIENCE_ALL) === AUDIENCE_ALL) out.add(Number(r.id));
    else selectedIds.push(Number(r.id));
  }
  const b = normBuyer(buyer);
  if (!selectedIds.length || !b) return out;
  const { SupplierProductBuyer } = require('../models');
  const hits = await SupplierProductBuyer.findAll({
    where: { supplier_product_id: { [Op.in]: selectedIds }, entity_type: b.type, entity_id: b.id },
    attributes: ['supplier_product_id'], raw: true, transaction
  });
  for (const h of hits) out.add(Number(h.supplier_product_id));
  return out;
}

/** 상품 행 하나를 이 손님이 볼 수 있는가. */
async function canBuyerSee(row, buyer, opts = {}) {
  if (!row) return false;
  return (await visibleIdsFor([row], buyer, opts)).has(Number(row.id));
}

/**
 * 재료에 공급처를 «직접» 붙이는 문(seller-sources · 브랜드 재고아이템 공급처)용 — 이 상품을 이 손님(들)이 붙일 수 있는가.
 * (2026-11-28 Fable 게이트 F2) 상품이 없음 · 그 업체 것이 아님 · 전용인데 손님 누구도 대상 아님 → 404 «없는 상품» 과 같은 답.
 * @param {number} supplierCompanyId  요청이 말한 업체
 * @param {number} sellerProductId
 * @param {Array<{type,id}>} buyers  이 요청의 손님 후보(브랜드 제너럴은 그 업체와 계약한 자기 브랜드 전부)
 * @returns {Promise<{ok:true, product} | {ok:false, status:404, body}>}
 */
async function assertSupplierProductLinkable(supplierCompanyId, sellerProductId, buyers, { transaction } = {}) {
  const notFound = { ok: false, status: 404, body: { success: false, message: 'Supplier product not found' } };
  const { SupplierProduct } = require('../models');
  const sp = Number.isFinite(Number(sellerProductId))
    ? await SupplierProduct.findByPk(Number(sellerProductId), { attributes: ['id', 'supplier_company_id', 'audience_mode'], transaction })
    : null;
  if (!sp || Number(sp.supplier_company_id) !== Number(supplierCompanyId)) return notFound;
  if ((sp.audience_mode || AUDIENCE_ALL) === AUDIENCE_ALL) return { ok: true, product: sp };
  for (const b of buyers || []) {
    if (await canBuyerSee(sp, b, { transaction })) return { ok: true, product: sp };
  }
  return notFound;
}

/** 브랜드 제너럴용 손님 후보 — 이 업체와 활성 계약이 있는 내 브랜드 전부({type:'brand', id}). */
async function contractedBrandBuyers(supplierCompanyId, brandIds, { transaction } = {}) {
  const ids = (brandIds || []).map(Number).filter(Number.isFinite);
  if (!ids.length) return [];
  const { SupplierContract } = require('../models');
  const rows = await SupplierContract.findAll({
    where: { supplier_company_id: supplierCompanyId, entity_type: 'brand', entity_id: { [Op.in]: ids }, status: 'active' },
    attributes: ['entity_id'], raw: true, transaction
  });
  return [...new Set(rows.map(r => Number(r.entity_id)))].map(id => ({ type: 'brand', id }));
}

/**
 * 판매자가 상품 저장 때 보낸 손님 목록을 검증한다 — **그 판매자와 거래 관계가 있는 손님만**.
 * 관계 = 계약 행(거절 제외 — 요청 중·활성·해지 모두 «아는 손님») 또는 그 판매자에게 발주한 적이 있음.
 * 남의 손님을 끼워 넣어 존재를 떠보는 것을 막는다(모르는 손님이 하나라도 있으면 전체 거부).
 * @returns {{ok:true, buyers:Array<{entity_type, entity_id}>} | {ok:false, message, unknown}}
 */
async function validateAudienceBuyers(supplierCompanyId, input, { transaction } = {}) {
  if (!Array.isArray(input)) return { ok: false, message: 'audience_buyers must be an array' };
  const seen = new Set();
  const buyers = [];
  for (const raw of input) {
    const b = normBuyer(raw);
    if (!b) return { ok: false, message: 'Each buyer needs entity_type (restaurant|brand|foodcourt) and entity_id' };
    const k = `${b.type}:${b.id}`;
    if (seen.has(k)) continue;
    seen.add(k);
    buyers.push({ entity_type: b.type, entity_id: b.id });
  }
  if (!buyers.length) return { ok: true, buyers };
  const known = await knownBuyerKeys(supplierCompanyId, { transaction });
  const unknown = buyers.filter(b => !known.has(`${b.entity_type}:${b.entity_id}`));
  if (unknown.length) return { ok: false, message: 'Some buyers are not your customers', unknown };
  return { ok: true, buyers };
}

/** 이 판매자의 «아는 손님» 키 집합 — 계약(거절 제외) ∪ 발주한 적 있는 구매자. */
async function knownBuyerKeys(supplierCompanyId, { transaction } = {}) {
  const { sequelize } = require('../config/database');
  const [rows] = await sequelize.query(`
    SELECT entity_type, entity_id FROM supplier_contracts
     WHERE supplier_company_id = :sid AND status <> 'rejected' AND entity_type IN ('restaurant','brand','foodcourt')
    UNION
    SELECT entity_type, entity_id FROM purchase_orders
     WHERE seller_type = 'supplier' AND seller_entity_id = :sid AND deleted_at IS NULL`,
    { replacements: { sid: supplierCompanyId }, transaction });
  return new Set(rows.map(r => `${r.entity_type}:${Number(r.entity_id)}`));
}

/** 상품의 손님 목록을 통째로 바꾼다(같은 트랜잭션). mode 가 all 이면 목록을 비운다. */
async function replaceAudienceBuyers(productId, mode, buyers, { transaction } = {}) {
  const { SupplierProductBuyer } = require('../models');
  await SupplierProductBuyer.destroy({ where: { supplier_product_id: productId }, transaction });
  if (mode !== AUDIENCE_SELECTED || !buyers || !buyers.length) return;
  await SupplierProductBuyer.bulkCreate(
    buyers.map(b => ({ supplier_product_id: productId, entity_type: b.entity_type, entity_id: b.entity_id })),
    { transaction });
}

module.exports = {
  AUDIENCE_ALL, AUDIENCE_SELECTED, AUDIENCE_MODES, BUYER_TYPES,
  normBuyer, audienceWhere, visibleIdsFor, canBuyerSee, assertSupplierProductLinkable, contractedBrandBuyers,
  validateAudienceBuyers, knownBuyerKeys, replaceAudienceBuyers
};
