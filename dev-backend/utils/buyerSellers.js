/**
 * 구매자가 발주할 수 있는 판매자 목록 — 단일 소스 (2026-11-01 §G-7-5 에서 routes/buyer-sellers.js 본문 추출).
 *   - supplier      → 구매자 자기 SupplierContract status='active' (외부·가입 둘 다)
 *                     + 레스토랑이면 오너 공통 공급업체(utils/supplierAccess.inheritedOwnerSupplierIds — 매장이 자기 행으로 끈 것은 뺌)
 *   - brand         → Restaurant.brand_id
 *   - foodcourt     → Restaurant.foodcourt_id
 *   - system_admin  → 항상(POS 카탈로그, seller_id null)
 * 쓰는 곳: GET /api/buyer-sellers · 오너 승인 예외 후보(utils/poApprovalExemptions).
 */
const { Op } = require('sequelize');

async function listBuyerSellers(buyer) {
  const { SupplierContract, SupplierCompany, Brand, Foodcourt, Restaurant } = require('../models');
  const sellers = [];

  const contracts = await SupplierContract.findAll({
    where: { entity_type: buyer.type, entity_id: buyer.id }
  });
  const activeContracts = contracts.filter(c => c.status === 'active');
  const ownRowIds = new Set(contracts.map(c => c.supplier_company_id));   // 매장 자기 행(꺼짐 포함) — 오너 공통 업체를 매장이 끈 표시
  let inheritedIds = [];
  if (buyer.type === 'restaurant') {
    const { inheritedOwnerSupplierIds } = require('./supplierAccess');
    inheritedIds = (await inheritedOwnerSupplierIds(buyer.id)).filter(id => !ownRowIds.has(id));
  }
  const supplierIds = [...new Set([...activeContracts.map(c => c.supplier_company_id), ...inheritedIds])];
  if (supplierIds.length > 0) {
    const suppliers = await SupplierCompany.findAll({
      where: { id: { [Op.in]: supplierIds } },
      attributes: ['id', 'name', 'logo_url', 'company_name', 'trade_name', 'is_system_registered']
    });
    const supplierById = new Map(suppliers.map(s => [s.id, s]));
    const contractBySupplier = new Map(activeContracts.map(c => [c.supplier_company_id, c]));
    for (const sid of supplierIds) {
      const s = supplierById.get(sid);
      if (!s) continue;
      const c = contractBySupplier.get(sid);
      sellers.push({
        seller_type: 'supplier',
        seller_id: s.id,
        name: s.trade_name || s.name || s.company_name,
        logo_url: s.logo_url || null,
        contract_id: c ? c.id : null,
        is_external: !s.is_system_registered,
        inherited_from_owner: !c
      });
    }
  }

  if (buyer.type === 'restaurant') {
    const restaurant = await Restaurant.findByPk(buyer.id, { attributes: ['id', 'brand_id', 'foodcourt_id'] });
    if (restaurant) {
      if (restaurant.brand_id) {
        const brand = await Brand.findByPk(restaurant.brand_id, { attributes: ['id', 'name', 'logo_url', 'trade_name'] });
        if (brand) {
          sellers.push({ seller_type: 'brand', seller_id: brand.id, name: brand.trade_name || brand.name, logo_url: brand.logo_url || null, contract_id: null });
        }
      }
      if (restaurant.foodcourt_id) {
        const fc = await Foodcourt.findByPk(restaurant.foodcourt_id, { attributes: ['id', 'name', 'logo_url', 'trade_name'] });
        if (fc) {
          sellers.push({ seller_type: 'foodcourt', seller_id: fc.id, name: fc.trade_name || fc.name, logo_url: fc.logo_url || null, contract_id: null });
        }
      }
    }
  }

  sellers.push({ seller_type: 'system_admin', seller_id: null, name: 'POS Catalog', logo_url: null, contract_id: null });
  return sellers;
}

module.exports = { listBuyerSellers };
