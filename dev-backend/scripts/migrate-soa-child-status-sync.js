/**
 * 정산서(SOA) ↔ 묶인 청구서 상태 복구 — 멱등, 매 배포 재실행 (2026-10-05 Fable 판정 «soa-child-status» ③)
 *
 * 정산서 상태를 바꾸는 길 중 PATCH status·reject-payment 가 자식을 안 끌고 가서 갈라진 행을,
 * services/soaChildSync 의 **같은 규칙·같은 조건(MISMATCH_FROM_SQL)** 으로 맞춘다.
 * 자식 paid 의 시각·확인자는 정산서 값을 그대로 쓴다(지금 시각을 찍으면 사실과 다르다).
 * 실행 후 같은 조건으로 다시 세어 0 이 아니면 exit 1.
 */
const path = require('path');
require(path.join(__dirname, '..', 'node_modules', 'dotenv')).config({ path: path.join(__dirname, '..', '.env') });
const { sequelize } = require('../config/database');
const { childRuleFor, MISMATCH_FROM_SQL } = require('../services/soaChildSync');

(async () => {
  try {
    const rows = await sequelize.query(
      `SELECT DISTINCT p.id, p.invoice_number, p.status, p.paid_at, p.confirmed_by, p.confirmed_at, p.payment_submitted_at ${MISMATCH_FROM_SQL}`,
      { type: 'SELECT' });
    let fixed = 0;
    for (const soa of rows) {
      const at = soa.status === 'paid'
        ? (soa.paid_at || soa.confirmed_at || new Date())
        : (soa.payment_submitted_at || new Date());
      const rule = childRuleFor(soa.status, { actorId: soa.confirmed_by || null, at });
      if (soa.status === 'paid') rule.set.confirmed_at = soa.confirmed_at || at;
      const sets = Object.keys(rule.set).map((k) => `${k} = :${k}`).join(', ');
      const [, meta] = await sequelize.query(
        `UPDATE invoices SET ${sets} WHERE parent_soa_invoice_id = :pid AND status IN (:from)`,
        { replacements: { ...rule.set, pid: soa.id, from: rule.from } });
      const n = (meta && meta.affectedRows) || 0;
      fixed += n;
      console.log(`[soa-child-sync] ${soa.invoice_number} (${soa.status}) — 자식 ${n}건 맞춤`);
    }
    const [{ c }] = await sequelize.query(`SELECT COUNT(*) c ${MISMATCH_FROM_SQL}`, { type: 'SELECT' });
    console.log(`[soa-child-sync] 맞춘 자식 ${fixed}건 · 남은 불일치 ${c}건`);
    process.exit(Number(c) === 0 ? 0 : 1);
  } catch (e) {
    console.error('[soa-child-sync] 실패:', e.message);
    process.exit(1);
  }
})();
