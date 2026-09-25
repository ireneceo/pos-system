/**
 * supplierAccess.js — single source of truth for "can this buyer order from this supplier?".
 *
 * 2026-09-24: 브랜드 → 매장 계약 상속은 끝났다(⑥ 복사본). 부모는 이제 **오너** — 오너가 등록한 외부 업체를 소유 매장이 같이 쓴다(아래 findParentContract, §H-3).
 *
 * System-registered (solution-member) suppliers are NEVER inherited — the restaurant must hold its
 * own contract (billing / contract-party integrity; a member supplier bills the contracting entity).
 * (Fable structural review 2026-07-05)
 */
const { SupplierContract } = require('../models');

async function findEffectiveContract(supplierCompanyId, buyerEntity) {
  if (!buyerEntity || !supplierCompanyId) return null;

  // 1) the buyer's own contract row — **if the buyer has one (any status), it is the answer.**
  //    (2026-09-11 · docs/SUPPLIER_CONTRACT_SYSTEM.md §G · Irene 「브랜드에서 넣어준 공급업체여도 사용 안하는 경우 비활성 가능하게」)
  //    A buyer turns a supplier off by holding its own `terminated` row. Before this rule, a non-active own row fell
  //    through to the brand inheritance below, so a restaurant could never switch off a brand-added supplier.
  //    Inheritance applies only when the buyer has no row of its own.
  const own = await SupplierContract.findOne({
    where: {
      supplier_company_id: supplierCompanyId,
      entity_type: buyerEntity.type,
      entity_id: buyerEntity.id,
    },
    order: [['id', 'DESC']],
  });
  if (own) return own.status === 'active' ? own : null;

  // 2) 부모 계약 — 오너 상속(자기 행이 없을 때만)
  return findParentContract(supplierCompanyId, buyerEntity);
}

/**
 * 이 매장의 오너 계정 id 목록 — restaurant_managers(ownership). 오너가 여럿이면 모두.
 */
async function ownerIdsOfRestaurant(restaurantId) {
  const { RestaurantManager } = require('../models');
  const rows = await RestaurantManager.findAll({
    where: { restaurant_id: restaurantId, relationship_type: 'ownership' }, attributes: ['manager_id'], raw: true,
  });
  return [...new Set(rows.map(r => Number(r.manager_id)).filter(Number.isFinite))];
}

/**
 * 부모 계약 — **오너 상속** (2026-09-24 · Fable «오너=슈퍼바이저» 판정 §1-A · docs/SUPPLIER_CONTRACT_SYSTEM.md §H-3).
 * 브랜드 → 매장 상속은 끝났다(⑥ 복사본, 서로 독립). 오너(같은 사람)는 다르다 — 오너가 등록한 외부 업체
 * 한 행을 소유 매장들이 같이 쓴다. 매장이 자기 행을 가지면(끄기 = terminated) 위 1) 에서 이미 결정됐다.
 * 조건: 매장 구매자 · 업체가 **오너 등록 외부 업체**(가입 공급업체는 상속하지 않는다) · 그 매장의 어느 오너든
 * 그 업체에 active 계약.
 */
async function findParentContract(supplierCompanyId, buyerEntity) {
  if (buyerEntity.type !== 'restaurant') return null;
  const { SupplierCompany } = require('../models');
  const sc = await SupplierCompany.findByPk(supplierCompanyId, { attributes: ['id', 'is_system_registered', 'registered_by_entity_type', 'registered_by_entity_id'] });
  if (!sc || sc.is_system_registered || sc.registered_by_entity_type !== 'owner') return null;
  const owners = await ownerIdsOfRestaurant(buyerEntity.id);
  if (!owners.includes(Number(sc.registered_by_entity_id))) return null;
  return SupplierContract.findOne({
    where: { supplier_company_id: supplierCompanyId, entity_type: 'owner', entity_id: Number(sc.registered_by_entity_id), status: 'active' },
    order: [['id', 'DESC']],
  });
}

/**
 * 매장이 오너에게서 물려받는 외부 업체 id 목록(오너 쪽 계약 active) — 목록·카탈로그용.
 * 매장이 끈 것(자기 terminated 행)은 호출자가 자기 행으로 가린다(findEffectiveContract 와 같은 규칙).
 */
async function inheritedOwnerSupplierIds(restaurantId) {
  const owners = await ownerIdsOfRestaurant(restaurantId);
  if (!owners.length) return [];
  const { SupplierCompany } = require('../models');
  const { Op } = require('sequelize');
  const rows = await SupplierCompany.findAll({
    where: { is_system_registered: false, status: 'active', registered_by_entity_type: 'owner', registered_by_entity_id: { [Op.in]: owners } },
    attributes: ['id', 'registered_by_entity_id'], raw: true,
  });
  if (!rows.length) return [];
  const active = await SupplierContract.findAll({
    where: { supplier_company_id: { [Op.in]: rows.map(r => r.id) }, entity_type: 'owner', status: 'active' },
    attributes: ['supplier_company_id', 'entity_id'], raw: true,
  });
  const ok = new Set(active.map(a => `${a.supplier_company_id}:${a.entity_id}`));
  return rows.filter(r => ok.has(`${r.id}:${r.registered_by_entity_id}`)).map(r => r.id);
}

module.exports = { findEffectiveContract, inheritedOwnerSupplierIds, ownerIdsOfRestaurant };
