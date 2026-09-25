/**
 * 브랜드 공급업체 «매장에 공유» = 복사본 (2026-09-24 · Fable ⑥ 판정 1·2회차 · docs/SUPPLIER_CONTRACT_SYSTEM.md §H)
 *
 * Irene 「공급업체는 브랜드제너럴에서 브랜드에 공유해주고 싶으면 해주고 대신 수정 등록 모두 독립적으로 각각 운영하는 거야」
 *       「공급업체를 관리하는 건 브랜드라고 해도 서로 연동하지 않아」
 *
 * - 공유 = 브랜드 업체 행을 매장 소유 행으로 **복사**한다. 이후 브랜드·매장은 서로 영향 없음(동기화·전파 없음).
 * - 출처 칸(copied_from_*)은 추적용이다. 살아 있는 사본은 (매장, 원본)당 하나 — DB UNIQUE 가 강제.
 * - 같은 트랜잭션에서 그 매장이 원본에 걸어 둔 것을 사본으로 옮긴다: 매장 재료·상품 연결(ISP, 행 id 유지 → 발주 줄 안 깨짐),
 *   매장 발주 헤더(seller_entity_id) · 매장이 지불자인 거래 청구서 발행자(issuer_id) · 매장 범위 원가 변경 이력.
 *   브랜드 쪽(브랜드 재고아이템 연결·브랜드 발주·브랜드 지불 청구서·레거시 suppliers)은 무접촉.
 * - 라우트(POST /external-suppliers/:id/share)와 이전 마이그(migrate-share-brand-suppliers-to-stores)가 **이 함수 하나**를 쓴다.
 */
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const {
  SupplierCompany, SupplierProduct, SupplierProductCategory, SupplierProductOptionGroup, SupplierContract,
} = require('../models');

/**
 * 발주 ↔ 거래 청구서 발행자 불일치 — `FROM … WHERE …` 조각(별칭 p=purchase_orders, i=invoices).
 * 인스펙션 S-SUP-004 와 copySupplierToStore 의 사후 확인이 **같은 조건**을 쓴다(검사와 수정은 같은 술어).
 * system_admin 판매는 발행자 id 가 1 로 고정이라 제외. BINARY — 개발 DB 는 두 칸의 collation 이 다르다.
 */
const ISSUER_MISMATCH_SQL = `FROM purchase_orders p JOIN invoices i ON i.id = p.trade_invoice_id
  WHERE p.seller_type IN ('supplier', 'brand', 'foodcourt')
    AND NOT (BINARY i.issuer_type = BINARY p.seller_type AND i.issuer_id = p.seller_entity_id)`;

class SupplierShareError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

// 업체 행에서 복사하지 않는 칸 — 고유 칸(code·slug)·등록 주체·가입 공급업체 구독 칸·출처 칸·시간 칸
const COMPANY_SKIP = new Set([
  'id', 'code', 'shop_slug', 'owner_id', 'registered_by_entity_type', 'registered_by_entity_id', 'is_system_registered',
  'shared_with_stores', 'subscription_status', 'subscription_start', 'subscription_end', 'trial_end_date',
  'grace_period_start', 'last_trial_reminder_day', 'plan_id', 'plan_type', 'plan_amount', 'billing_cycle',
  'copied_from_supplier_company_id', 'copied_at', 'copied_by_user_id',
  'created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt',
]);
// 상품 — 소속·분류는 다시 매기고, 공급업체 자기 재고(외부 업체에는 뜻 없음)는 0 에서 시작
const PRODUCT_SKIP = new Set([
  'id', 'supplier_company_id', 'category_id', 'copied_from_supplier_product_id', 'current_stock',
  'created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt',
]);
const CATEGORY_SKIP = new Set(['id', 'supplier_company_id', 'created_at', 'updated_at', 'deleted_at', 'createdAt', 'updatedAt', 'deletedAt']);

const pick = (row, skip) => Object.fromEntries(Object.entries(row.get({ plain: true })).filter(([k]) => !skip.has(k)));

// 그 매장이 소유한 재료·상품 (재료는 owner_type 이 비어 있는 옛 행도 매장 id 로 본다)
const STORE_LINK_WHERE = `(isp.ingredient_id IN (SELECT id FROM ingredients WHERE restaurant_id = :rid AND (owner_type IS NULL OR owner_type = 'restaurant'))
   OR isp.product_id IN (SELECT id FROM products WHERE restaurant_id = :rid))`;

/** 매장이 원본 업체를 «쓴» 흔적 — 매장 발주 수 · 매장 재료/상품 연결 수 · 매장 자기 켜기 행의 마지막 상태 */
async function storeUsage(sourceId, restaurantId, transaction) {
  const [[o]] = await sequelize.query(
    "SELECT COUNT(*) n FROM purchase_orders WHERE seller_type = 'supplier' AND seller_entity_id = :src AND entity_type = 'restaurant' AND entity_id = :rid",
    { replacements: { src: sourceId, rid: restaurantId }, transaction });
  const [[l]] = await sequelize.query(
    `SELECT COUNT(*) n FROM ingredient_seller_products isp WHERE isp.seller_type = 'supplier' AND isp.seller_entity_id = :src AND ${STORE_LINK_WHERE}`,
    { replacements: { src: sourceId, rid: restaurantId }, transaction });
  const last = await SupplierContract.findOne({
    where: { supplier_company_id: sourceId, entity_type: 'restaurant', entity_id: restaurantId },
    order: [['id', 'DESC']], attributes: ['status'], transaction,
  });
  return { orders: Number(o.n), links: Number(l.n), lastOwnStatus: last ? last.status : null };
}

/**
 * 이전 마이그의 «쓴 매장» 판정 (Fable 2회차 §1)
 *   - 마지막 자기 켜기 행 active → 사본(켜짐)
 *   - 발주·연결 이력이 있으면 → 사본, 켜기 상태는 마지막 자기 행 그대로(껐으면 꺼진 사본)
 *   - 이력 없고 켜 둔 적도 없으면 → 사본 안 만듦(브랜드가 «매장에 공유» 로 언제든 다시 줄 수 있다)
 */
function decideCopy(usage) {
  const hasHistory = usage.orders > 0 || usage.links > 0;
  if (usage.lastOwnStatus === 'active') return { copy: true, contractStatus: 'active' };
  if (hasHistory) return { copy: true, contractStatus: usage.lastOwnStatus === 'terminated' ? 'terminated' : 'active' };
  return { copy: false, contractStatus: null };
}

let _hasCopyCol = null;
async function hasCopyColumn(transaction) {
  if (_hasCopyCol === null) {
    const [r] = await sequelize.query(
      "SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'supplier_companies' AND COLUMN_NAME = 'copied_from_supplier_company_id'",
      { transaction });
    _hasCopyCol = r.length > 0;
  }
  return _hasCopyCol;
}

async function findLiveCopy(sourceId, restaurantId, transaction) {
  // 출처 칸이 아직 없는 DB(칸 마이그 전 운영에서 돌리는 dry-run)에는 사본이 있을 수 없다
  if (!(await hasCopyColumn(transaction))) return null;
  return SupplierCompany.findOne({
    where: { registered_by_entity_type: 'restaurant', registered_by_entity_id: restaurantId, copied_from_supplier_company_id: sourceId },
    attributes: ['id', 'copied_at'], transaction,
  });
}

/**
 * 매장 연결 중 **옮길 짝이 없는 것** — 상품 행이 아예 없는 연결(하드 삭제·다른 업체 상품을 가리키는 고아).
 * 지워진(soft delete) 상품은 여기 들지 않는다 — 아래 findDeletedLinkedProducts 로 «지워진 채로» 복사한다(Fable 게이트 판정 2 §1).
 * dry-run 과 copySupplierToStore 가 **같은 함수**로 판정한다(검사와 수정은 같은 술어 — Fable 게이트 (a)).
 */
async function findUnmappedLinks(sourceId, restaurantId, transaction) {
  const [rows] = await sequelize.query(
    `SELECT isp.id, isp.seller_product_id FROM ingredient_seller_products isp
      WHERE isp.seller_type = 'supplier' AND isp.seller_entity_id = :src AND ${STORE_LINK_WHERE}
        AND isp.seller_product_id IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM supplier_products sp WHERE sp.id = isp.seller_product_id AND sp.supplier_company_id = :src)`,
    { replacements: { src: sourceId, rid: restaurantId }, transaction });
  return rows;
}

/**
 * 매장 연결이 가리키는 **지워진(soft delete) 원본 상품** — 사본에도 지워진 채(deleted_at·is_active 그대로) 만들어
 * 연결·발주 줄·이력이 지금 모양 그대로 사본 쪽에 재현되게 한다. 아무 연결도 안 가리키는 지워진 상품은 복사하지 않는다.
 * (운영 실측 2026-09-24: New Seoul Mart #28 — 매장 연결 4건이 09-12 에 지운 상품 189·204 를 가리킴)
 * @returns {{ products: number[], links: number }} 상품 id 목록 · 그 상품을 가리키는 매장 연결 수
 */
async function findDeletedLinkedProducts(sourceId, restaurantId, transaction) {
  const [rows] = await sequelize.query(
    `SELECT isp.id, isp.seller_product_id FROM ingredient_seller_products isp
      JOIN supplier_products sp ON sp.id = isp.seller_product_id AND sp.supplier_company_id = :src AND sp.deleted_at IS NOT NULL
      WHERE isp.seller_type = 'supplier' AND isp.seller_entity_id = :src AND ${STORE_LINK_WHERE}`,
    { replacements: { src: sourceId, rid: restaurantId }, transaction });
  return { products: [...new Set(rows.map(r => Number(r.seller_product_id)))].sort((a, b) => a - b), links: rows.length };
}

/**
 * 원본 브랜드 업체 → 매장 사본. 반드시 호출자가 연 트랜잭션 안에서 부른다.
 * @returns {{ status: 'created'|'already_shared', copy_id, copied_at?, products?, categories?, links_moved?, orders_moved? }}
 */
async function copySupplierToStore({ sourceId, restaurantId, userId, contractStatus = 'active', transaction }) {
  if (!transaction) throw new Error('copySupplierToStore needs a transaction');
  const src = await SupplierCompany.findByPk(sourceId, { transaction, lock: transaction.LOCK.UPDATE });
  if (!src) throw new SupplierShareError('NOT_FOUND', 'Supplier not found');
  if (src.is_system_registered || src.registered_by_entity_type !== 'brand') {
    throw new SupplierShareError('NOT_BRAND_EXTERNAL', 'Only external suppliers registered by a brand can be shared');
  }

  const existing = await findLiveCopy(sourceId, restaurantId, transaction);
  if (existing) return { status: 'already_shared', copy_id: existing.id, copied_at: existing.copied_at };

  const optionGroups = await SupplierProductOptionGroup.count({ where: { supplier_company_id: sourceId }, transaction });
  if (optionGroups > 0) {
    // 옵션 상품은 복사 대상이 아니다 — 조용히 빼지 않고 막는다(Fable 2회차 §3-b)
    throw new SupplierShareError('OPTIONS_NOT_COPIED', 'This supplier has product options, which cannot be copied to a store');
  }

  const now = new Date();
  const copy = await SupplierCompany.create({
    ...pick(src, COMPANY_SKIP),
    code: null,
    shop_slug: null,
    owner_id: null,
    is_system_registered: false,
    registered_by_entity_type: 'restaurant',
    registered_by_entity_id: restaurantId,
    shared_with_stores: false,
    copied_from_supplier_company_id: src.id,
    copied_at: now,
    copied_by_user_id: userId || null,
  }, { transaction });

  const catMap = new Map();
  const cats = await SupplierProductCategory.findAll({ where: { supplier_company_id: sourceId }, transaction });
  for (const c of cats) {
    const nc = await SupplierProductCategory.create({ ...pick(c, CATEGORY_SKIP), supplier_company_id: copy.id }, { transaction });
    catMap.set(c.id, nc.id);
  }

  const prodMap = new Map();
  const prods = await SupplierProduct.findAll({ where: { supplier_company_id: sourceId }, order: [['id', 'ASC']], transaction });
  // 매장 연결이 가리키는 지워진 원본 상품 — 지워진 채로 함께 복사(Fable 게이트 판정 2 §1)
  const deletedLinked = await findDeletedLinkedProducts(sourceId, restaurantId, transaction);
  const deletedProds = deletedLinked.products.length
    ? await SupplierProduct.findAll({ where: { id: deletedLinked.products, supplier_company_id: sourceId }, paranoid: false, order: [['id', 'ASC']], transaction })
    : [];
  for (const p of [...prods, ...deletedProds]) {
    const np = await SupplierProduct.create({
      ...pick(p, PRODUCT_SKIP),
      supplier_company_id: copy.id,
      category_id: p.category_id ? (catMap.get(p.category_id) || null) : null,
      copied_from_supplier_product_id: p.id,
    }, { transaction });
    if (p.deleted_at) {
      await sequelize.query('UPDATE supplier_products SET deleted_at = :d WHERE id = :id', { replacements: { d: p.deleted_at, id: np.id }, transaction });
    }
    prodMap.set(p.id, np.id);
  }

  await SupplierContract.create({
    supplier_company_id: copy.id,
    entity_type: 'restaurant',
    entity_id: restaurantId,
    status: contractStatus,
    requested_by_user_id: userId || 1,
    requested_at: now,
    approved_at: now,
    ...(contractStatus === 'terminated'
      ? { terminated_by: 'buyer', terminated_by_user_id: userId || null, terminated_at: now, termination_reason: 'Turned off before the brand shared a copy' }
      : {}),
  }, { transaction });

  // 매장 재료·상품 연결 → 사본 (행 id 유지). 짝 상품 행이 아예 없으면 옮기지 않고 멈춘다 — 조용한 끊김 금지
  const [links] = await sequelize.query(
    `SELECT isp.id, isp.seller_product_id FROM ingredient_seller_products isp WHERE isp.seller_type = 'supplier' AND isp.seller_entity_id = :src AND ${STORE_LINK_WHERE}`,
    { replacements: { src: sourceId, rid: restaurantId }, transaction });
  const unmapped = await findUnmappedLinks(sourceId, restaurantId, transaction);
  if (unmapped.length) {
    throw new SupplierShareError('UNMAPPED_LINKS', `${unmapped.length} store links point to supplier product rows that do not exist (ISP ${unmapped.map(u => u.id).join(',')})`);
  }
  for (const l of links) {
    // 사본에 짝이 안 만들어진 상품을 가리키면 null 로 끊지 않고 멈춘다(위 판정과 복사 목록이 어긋난 경우의 마지막 방어)
    if (l.seller_product_id && !prodMap.has(Number(l.seller_product_id))) {
      throw new SupplierShareError('UNMAPPED_LINKS', `store link ${l.id} points to supplier product ${l.seller_product_id}, which was not copied`);
    }
    await sequelize.query(
      'UPDATE ingredient_seller_products SET seller_entity_id = :copy, seller_product_id = :sp WHERE id = :id',
      { replacements: { copy: copy.id, sp: l.seller_product_id ? prodMap.get(Number(l.seller_product_id)) : null, id: l.id }, transaction });
  }

  // 매장 발주 헤더 → 사본 (상태 무관 — 상속이 없어지면 원본은 매장에서 닿지 않는다, Fable 2회차 §3-a)
  const [poRes] = await sequelize.query(
    "UPDATE purchase_orders SET seller_entity_id = :copy WHERE seller_type = 'supplier' AND seller_entity_id = :src AND entity_type = 'restaurant' AND entity_id = :rid",
    { replacements: { copy: copy.id, src: sourceId, rid: restaurantId }, transaction });

  // 매장이 받은 거래 청구서의 발행자 → 사본 (Fable 3회차 §1). 금액·상태·결제 기록은 청구서 id 에 매달려 있어 무접촉.
  //   브랜드가 지불자인 청구서는 대상이 아니다.
  const [invRes] = await sequelize.query(
    "UPDATE invoices SET issuer_id = :copy WHERE issuer_type = 'supplier' AND issuer_id = :src AND payer_type = 'restaurant' AND payer_id = :rid",
    { replacements: { copy: copy.id, src: sourceId, rid: restaurantId }, transaction });

  // 그 매장 범위의 원가 변경 이력만 사본으로 (감사 로그 — 매장 칸이 있는 행만 귀속, Fable 3회차 §1)
  const [costRes] = await sequelize.query(
    "UPDATE cost_change_logs SET seller_entity_id = :copy WHERE seller_type = 'supplier' AND seller_entity_id = :src AND entity_type = 'restaurant' AND entity_id = :rid",
    { replacements: { copy: copy.id, src: sourceId, rid: restaurantId }, transaction });

  // 옮긴 뒤 발주 ↔ 청구서 발행자가 어긋난 행이 이 매장에 남았으면 되돌린다 — 인스펙션과 같은 조건(ISSUER_MISMATCH_SQL)
  const [[mis]] = await sequelize.query(
    `SELECT COUNT(*) n ${ISSUER_MISMATCH_SQL} AND p.entity_type = 'restaurant' AND p.entity_id = :rid`,
    { replacements: { rid: restaurantId }, transaction });
  if (Number(mis.n) > 0) {
    throw new SupplierShareError('ISSUER_MISMATCH', `${mis.n} purchase orders of this store would point to a different issuer than their invoice`);
  }

  return {
    status: 'created', copy_id: copy.id, copied_at: now,
    products: prods.length, deleted_products: deletedProds.length, categories: cats.length, links_moved: links.length, orders_moved: poRes.affectedRows || 0,
    invoices_moved: invRes.affectedRows || 0, cost_logs_moved: costRes.affectedRows || 0,
  };
}

module.exports = { copySupplierToStore, storeUsage, decideCopy, findLiveCopy, findUnmappedLinks, findDeletedLinkedProducts, hasCopyColumn, SupplierShareError, ISSUER_MISMATCH_SQL };
