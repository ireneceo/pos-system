/**
 * suites/suppliers.js — 공급업체/계약 정합 불변식 (크로스커팅).
 * "셀러정보가 이게 뭐야"·유령 카드·잘못된 라벨 클래스를 박제. 계약·상품이 존재하는 공급업체를
 * 가리키고, 활성 계약은 활성 공급업체에만 걸리는지 검사.
 */
module.exports = {
  name: 'suppliers',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });

    // S-SUP-001: 고아 계약 = 존재하지 않는 공급업체를 가리키는 SupplierContract
    const orphanContract = (await q(`
      SELECT COUNT(*) c FROM supplier_contracts sc
      WHERE NOT EXISTS (SELECT 1 FROM supplier_companies s WHERE s.id = sc.supplier_company_id)`))[0].c;
    add('S-SUP-001 고아 계약 없음 (삭제된 공급업체 참조)',
      Number(orphanContract) === 0, Number(orphanContract) ? `${orphanContract}건` : '');

    // S-SUP-002: 활성 계약인데 공급업체가 비활성/삭제 = 유령(발주 가능처럼 보이나 실체 없음)
    const activeOnDead = (await q(`
      SELECT COUNT(*) c FROM supplier_contracts sc
      JOIN supplier_companies s ON s.id = sc.supplier_company_id
      WHERE sc.status = 'active' AND s.status <> 'active'`))[0].c;
    add('S-SUP-002 활성 계약은 활성 공급업체에만',
      Number(activeOnDead) === 0, Number(activeOnDead) ? `${activeOnDead}건 — 비활성 공급업체에 활성 계약(유령 발주처)` : '');

    // S-SUP-003: 고아 공급업체 상품 = 존재하지 않는 공급업체의 SupplierProduct
    const orphanSupProd = (await q(`
      SELECT COUNT(*) c FROM supplier_products sp
      WHERE NOT EXISTS (SELECT 1 FROM supplier_companies s WHERE s.id = sp.supplier_company_id)`))[0].c;
    add('S-SUP-003 고아 공급업체 상품 없음',
      Number(orphanSupProd) === 0, Number(orphanSupProd) ? `${orphanSupProd}건` : '');

    return checks;
  },
};
