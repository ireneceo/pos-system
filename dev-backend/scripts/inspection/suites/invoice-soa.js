/**
 * suites/invoice-soa.js — 정산서(SOA) 정합 불변식 (2026-10-05 Fable «soa-child-status» ④)
 * 정산서는 «여러 청구서를 한 번에 내는 묶음»이라 상태가 하나다. 묶인 청구서가 정산서와 다른 상태면 결함.
 * 조건은 services/soaChildSync.MISMATCH_FROM_SQL 하나 — 복구 스크립트(migrate-soa-child-status-sync)와 같은 술어.
 */
module.exports = {
  name: 'invoice-soa',
  async run({ q }) {
    const checks = [];
    const add = (name, pass, detail) => checks.push({ name, pass, detail });

    const { MISMATCH_FROM_SQL } = require('../../../services/soaChildSync');
    const rows = await q(`SELECT p.invoice_number soa, p.status soa_status, c.invoice_number child, c.status child_status ${MISMATCH_FROM_SQL} LIMIT 5`);
    const [{ c }] = await q(`SELECT COUNT(*) c ${MISMATCH_FROM_SQL}`);
    add('I-SOA-001 묶인 청구서 상태가 정산서와 같다',
      Number(c) === 0,
      Number(c) ? `${c}건 — 예: ${rows.map((r) => `${r.soa}(${r.soa_status})↔${r.child}(${r.child_status})`).join(', ')}` : '');

    // I-HW-001 (2026-10-07 Fable 판정 [2]) — 견적 청구서의 «매장» 종류에 사람 번호. 술어는 utils/hardwarePayerMismatch
    //   하나(보정 마이그 migrate-hardware-invoice-payer 와 같은 SQL).
    const { HW_PAYER_MISMATCH_FROM_SQL } = require('../../../utils/hardwarePayerMismatch');
    const hw = await q(`SELECT DISTINCT i.invoice_number n, i.payer_id p ${HW_PAYER_MISMATCH_FROM_SQL} LIMIT 5`);
    const [{ hc }] = await q(`SELECT COUNT(DISTINCT i.id) hc ${HW_PAYER_MISMATCH_FROM_SQL}`);
    add('I-HW-001 하드웨어 청구서 낼 사람 종류와 번호가 맞는다',
      Number(hc) === 0,
      Number(hc) ? `${hc}건 — 예: ${hw.map((r) => `${r.n}(payer_id ${r.p})`).join(', ')}` : '');

    return checks;
  }
};
