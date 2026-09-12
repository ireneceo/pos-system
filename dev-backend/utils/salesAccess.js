/**
 * 판매자 «계약 필요 여부» — 단일 소스
 * 설계: docs/BUYER_FREE_TIER_DESIGN.md §6-2 (2026-09-12 Irene 확정)
 *
 * 판매자(공급업체·브랜드)가 스스로 고른다. **새 표·새 칸 없이** 이미 있는
 * `operation_settings` JSON 에 키 하나:
 *
 *   sales_access = 'contract_required'  계약을 맺은 곳에만 판매 (기본값 — 지금 공급업체 동작)
 *                | 'open'               누구나 주문 가능 (가입만)
 *
 * ⛔ 기본값은 반드시 'contract_required' 다. 값이 없거나 깨졌으면 닫는 쪽으로 —
 *    설정을 못 읽었다고 남의 카탈로그가 열리면 그게 사고다.
 * ⛔ 브랜드의 **가맹점**(Restaurant.brand_id 가 그 브랜드)은 이 설정과 무관하게
 *    지금처럼 자동 노출된다. 이 설정은 **가맹점 밖 거래처**에만 적용된다.
 */

const { Op } = require('sequelize');

const CONTRACT_REQUIRED = 'contract_required';
const OPEN = 'open';
/** 공급형 계약 — 가맹형(franchise)과 **같은 표·같은 폼**을 쓰고 종류 한 값만 다르다(§5-5).
 *  가맹점이 아닌 구매자가 브랜드에서 사려면 이 계약이 활성이어야 한다(브랜드가 열어 두지 않은 경우). */
const SUPPLY_CONTRACT_TYPE = 'supply';
const VALID_SALES_ACCESS = [CONTRACT_REQUIRED, OPEN];

/** operation_settings(객체 또는 JSON 문자열) 에서 sales_access 를 읽는다. 모르면 닫는다. */
function salesAccessOf(operationSettings) {
  let ops = operationSettings;
  if (typeof ops === 'string') {
    try { ops = JSON.parse(ops); } catch { return CONTRACT_REQUIRED; }
  }
  const v = ops && ops.sales_access;
  return VALID_SALES_ACCESS.includes(v) ? v : CONTRACT_REQUIRED;
}

/** 이 판매자가 «누구나 주문 가능» 인가. */
function isOpenAccess(operationSettings) {
  return salesAccessOf(operationSettings) === OPEN;
}

/** 활성 공급업체 중 sales_access='open' 인 회사 id 목록.
 *  operation_settings 는 TEXT(JSON) 라 SQL 로 거르지 않고 읽어서 판정한다 —
 *  회사 수가 수천 단위가 아니라 목록 전량 읽기가 더 정직하고 싸다. */
async function openSupplierCompanyIds() {
  const SupplierCompany = require('../models/SupplierCompany');
  const rows = await SupplierCompany.findAll({
    where: { status: 'active' },
    attributes: ['id', 'operation_settings']
  });
  return rows.filter(r => isOpenAccess(r.operation_settings)).map(r => r.id);
}

/** 활성 브랜드 중 sales_access='open' 인 브랜드 id 목록. */
async function openBrandIds() {
  const Brand = require('../models/Brand');
  const rows = await Brand.findAll({ attributes: ['id', 'operation_settings'] });
  return rows.filter(r => isOpenAccess(r.operation_settings)).map(r => r.id);
}

/** 이 매장과 **활성 공급형 계약**이 있는 브랜드 id 목록. */
async function supplyContractBrandIds(restaurantId) {
  const Contract = require('../models/Contract');
  const rows = await Contract.findAll({
    where: {
      entity_type: 'brand',
      restaurant_id: restaurantId,
      contract_type: SUPPLY_CONTRACT_TYPE,
      stage: 'active'
    },
    attributes: ['entity_id']
  });
  return [...new Set(rows.map(r => r.entity_id).filter(v => Number.isFinite(Number(v))).map(Number))];
}

/** 이 매장이 **가맹점이 아니면서도** 살 수 있는 브랜드 id 목록.
 *  = 브랜드가 열어 둔 곳(open) ∪ 활성 공급형 계약이 있는 곳.
 *  자기 가맹본부(Restaurant.brand_id)는 여기 없어도 별도로 통과한다. */
async function externalBuyerBrandIds(restaurantId) {
  const [open, contracted] = await Promise.all([
    openBrandIds(),
    supplyContractBrandIds(restaurantId)
  ]);
  return [...new Set([...open, ...contracted])];
}

/** 이 브랜드가 «누구나 주문 가능» 인가. */
async function isBrandOpen(brandId) {
  const Brand = require('../models/Brand');
  const b = await Brand.findByPk(brandId, { attributes: ['id', 'operation_settings'] });
  if (!b) return false;
  return isOpenAccess(b.operation_settings);
}

/** 이 공급업체가 «누구나 주문 가능» 인가. */
async function isSupplierOpen(supplierCompanyId) {
  const SupplierCompany = require('../models/SupplierCompany');
  const s = await SupplierCompany.findByPk(supplierCompanyId, {
    attributes: ['id', 'status', 'operation_settings']
  });
  if (!s || s.status !== 'active') return false;
  return isOpenAccess(s.operation_settings);
}

/**
 * open 공급업체의 **첫 주문 시** 계약 행을 만들어 둔다 (승인 대기로 막지 않는다).
 * 거래 이력·결제조건이 앉을 자리가 필요해서지, 관문을 하나 더 두려는 게 아니다.
 * 이미 어떤 계약이든 있으면(요청중·활성·해지) 새로 만들지 않고 그대로 둔다 —
 * 활성만 세면 해지된 거래처가 주문할 때마다 계약 행이 쌓인다.
 */
async function ensureOpenSupplierContract(supplierCompanyId, buyerEntity, userId) {
  const SupplierContract = require('../models/SupplierContract');
  const existing = await SupplierContract.findOne({
    where: {
      supplier_company_id: supplierCompanyId,
      entity_type: buyerEntity.type,
      entity_id: buyerEntity.id,
      status: { [Op.in]: ['active', 'requested'] }
    },
    order: [['created_at', 'DESC']]
  });
  if (existing) {
    if (existing.status === 'active') return existing;
    // 요청중이던 곳이 설정을 열었다면 그 요청을 승인된 것으로 본다 — 행을 또 만들지 않는다.
    await existing.update({ status: 'active', approved_at: new Date() });
    return existing;
  }
  return SupplierContract.create({
    supplier_company_id: supplierCompanyId,
    entity_type: buyerEntity.type,
    entity_id: buyerEntity.id,
    status: 'active',
    requested_by_user_id: userId || null,
    requested_at: new Date(),
    approved_at: new Date(),
    request_message: null
  });
}

module.exports = {
  CONTRACT_REQUIRED,
  OPEN,
  VALID_SALES_ACCESS,
  SUPPLY_CONTRACT_TYPE,
  openBrandIds,
  supplyContractBrandIds,
  externalBuyerBrandIds,
  salesAccessOf,
  isOpenAccess,
  openSupplierCompanyIds,
  isBrandOpen,
  isSupplierOpen,
  ensureOpenSupplierContract
};
