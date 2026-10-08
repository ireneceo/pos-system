/**
 * 하드웨어 견적 청구서의 «낼 사람» 3칸 보정 (2026-10-07 Fable 판정 [2] · docs/INVOICE_SYSTEM.md)
 *
 * 대상 = utils/hardwarePayerMismatch 의 술어(인스펙션 I-HW-001 과 같은 SQL) — 견적 청구서인데
 *   payer_type 'restaurant' 에 사람 번호(payer_id = 회원 id)가 들어가고 매장 칸이 빈 행.
 * 보정 = payer_id 로 회원을 읽어 routes/invoices-helpers.payerForUser(새 생성 코드와 같은 함수)로 3칸 재계산.
 *   회원이 없거나 역할이 매핑 밖이면 **건너뛰고 목록만** 출력(외부로 바꾸지 않는다 — 사람이 정한다).
 * 성질: 멱등(보정된 행은 술어에서 빠짐 → 두 번째 실행 0건) · 행마다 트랜잭션·영향행 1 확인 ·
 *   되돌리기 = 출력된 «전» 값 3칸으로 UPDATE.
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { HW_PAYER_MISMATCH_FROM_SQL, HW_PAYER_MISMATCH_JOIN, HW_PAYER_MISMATCH_WHERE } = require('../utils/hardwarePayerMismatch');
const { payerForUser } = require('../routes/invoices-helpers');

async function main() {
  const rows = await sequelize.query(
    `SELECT DISTINCT i.id, i.invoice_number, i.status, i.payer_type, i.payer_id, i.restaurant_id ${HW_PAYER_MISMATCH_FROM_SQL}`,
    { type: QueryTypes.SELECT }
  );
  let fixed = 0; const skipped = [];
  for (const r of rows) {
    const [user] = await sequelize.query('SELECT id, role, restaurant_id FROM users WHERE id = ?', { replacements: [r.payer_id], type: QueryTypes.SELECT });
    const p = payerForUser(user);
    if (!p) { skipped.push(`#${r.id} ${r.invoice_number} payer_id=${r.payer_id} role=${user ? user.role : '(회원 없음)'}`); continue; }
    // 매장 칸은 생성 규칙(quote.restaurant_id || 회원의 매장)과 같게 — 이미 채워져 있으면 그대로, 비었으면 회원의 매장.
    const newRestaurantId = r.restaurant_id != null ? r.restaurant_id : p.restaurant_id;
    const t = await sequelize.transaction();
    try {
      // WHERE 는 탐지 술어 그대로(검사와 수정은 같은 SQL) + 이 행 + 읽은 payer_id 그대로일 때만.
      const [, meta] = await sequelize.query(
        `UPDATE invoices i ${HW_PAYER_MISMATCH_JOIN}
            SET i.payer_type = ?, i.payer_id = ?, i.restaurant_id = ?
          WHERE ${HW_PAYER_MISMATCH_WHERE} AND i.id = ? AND i.payer_id = ?`,
        { replacements: [p.payer_type, p.payer_id, newRestaurantId, r.id, r.payer_id], transaction: t }
      );
      const affected = meta && meta.affectedRows != null ? meta.affectedRows : meta;
      if (Number(affected) !== 1) throw new Error(`영향행 ${affected} (1 이어야 함)`);
      await t.commit();
      fixed++;
      console.log(`[hw-invoice-payer] #${r.id} ${r.invoice_number} (${r.status}) 전: restaurant/${r.payer_id}/${r.restaurant_id ?? 'NULL'} → 후: ${p.payer_type}/${p.payer_id}/${newRestaurantId ?? 'NULL'}`);
    } catch (e) {
      await t.rollback();
      throw new Error(`#${r.id} 보정 실패: ${e.message}`);
    }
  }
  for (const s of skipped) console.log(`[hw-invoice-payer] 건너뜀(사람이 정할 것): ${s}`);
  console.log(`[hw-invoice-payer] 완료 — 대상 ${rows.length} · 보정 ${fixed} · 건너뜀 ${skipped.length}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[hw-invoice-payer] 실패:', e.message); process.exit(1); });
