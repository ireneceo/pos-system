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

    // S-SUP-004: 발주 ↔ 거래 청구서 발행자 일치 (2026-09-24 Fable ⑥ 3회차 — 매장 공유 복사본 이전이 청구서를 빠뜨리면 여기서 걸린다)
    //   조건은 utils/supplierShare.ISSUER_MISMATCH_SQL 하나 — 복사 함수의 사후 확인과 같은 술어.
    const { ISSUER_MISMATCH_SQL } = require('../../../utils/supplierShare');
    const issuerMismatch = (await q(`SELECT COUNT(*) c ${ISSUER_MISMATCH_SQL}`))[0].c;
    add('S-SUP-004 발주와 거래 청구서의 발행자가 같다',
      Number(issuerMismatch) === 0, Number(issuerMismatch) ? `${issuerMismatch}건 — 발주는 한 업체, 청구서는 다른 업체를 가리킴` : '');

    return checks;
  },
};
