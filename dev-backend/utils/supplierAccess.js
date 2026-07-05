/**
 * supplierAccess.js — single source of truth for "can this buyer order from this supplier?".
 *
 * A restaurant inherits its PARENT BRAND's active contract, but ONLY for EXTERNAL suppliers
 * (is_system_registered = false). Those auto-contracts are enablement flags (the buyer registered
 * the supplier themselves), so inheriting them down to the brand's restaurants is safe and is what
 * lets a brand-registered supplier be ordered by its restaurants.
 *
 * System-registered (solution-member) suppliers are NEVER inherited — the restaurant must hold its
 * own contract (billing / contract-party integrity; a member supplier bills the contracting entity).
 * (Fable structural review 2026-07-05)
 */
const { SupplierContract, SupplierCompany, Restaurant } = require('../models');

async function findEffectiveContract(supplierCompanyId, buyerEntity) {
  if (!buyerEntity || !supplierCompanyId) return null;

  // 1) the buyer's own active contract
  const own = await SupplierContract.findOne({
    where: {
      supplier_company_id: supplierCompanyId,
      entity_type: buyerEntity.type,
      entity_id: buyerEntity.id,
      status: 'active',
    },
  });
  if (own) return own;

  // 2) a restaurant inherits its parent brand's contract — external suppliers only
  if (buyerEntity.type === 'restaurant') {
    const sc = await SupplierCompany.findByPk(supplierCompanyId, { attributes: ['is_system_registered'] });
    if (sc && sc.is_system_registered === false) {
      const rest = await Restaurant.findByPk(buyerEntity.id, { attributes: ['brand_id'] });
      if (rest && rest.brand_id) {
        return SupplierContract.findOne({
          where: {
            supplier_company_id: supplierCompanyId,
            entity_type: 'brand',
            entity_id: rest.brand_id,
            status: 'active',
          },
        });
      }
    }
  }

  return null;
}

module.exports = { findEffectiveContract };
