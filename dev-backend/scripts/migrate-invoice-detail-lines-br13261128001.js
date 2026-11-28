/**
 * 청구서 INV-BR13261128001(GIT Consulting → K-DINE Noodles Pavilion) 의 «내용만 줄» 15개를 세부 줄 표식으로 바꾼다.
 * 2026-11-28 · 설계 .claude/fable-design-20261128-invoice-detail-lines.md §2-6
 *
 *   세부 줄 = invoice_items.item_type 'line_detail' (DB 구조 변경 없음 · STRING 자유 코드)
 *   이 청구서 번호로만 한정 · 금액 0 + 단가 없음/0 인 service 줄만 · 멱등(두 번째부터 0줄)
 *   개발 DB 에는 그 번호가 없어 0줄 = 정상.
 *   되돌리기: 같은 청구서에서 item_type 'line_detail' → 'service'.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const INVOICE_NUMBER = 'INV-BR13261128001';

(async () => {
  const tag = '[migrate-invoice-detail-lines-br13261128001]';
  try {
    const [, meta] = await sequelize.query(`
      UPDATE invoice_items ii
        JOIN invoices i ON i.id = ii.invoice_id
         SET ii.item_type = 'line_detail', ii.unit_price = NULL, ii.fixed_amount = NULL
       WHERE i.invoice_number = :num
         AND ii.item_type = 'service'
         AND ii.calculated_amount = 0
         AND (ii.unit_price IS NULL OR ii.unit_price = 0)`,
      { replacements: { num: INVOICE_NUMBER } });
    const changed = meta?.affectedRows ?? meta ?? 0;
    console.log(`${tag} ${INVOICE_NUMBER} 세부 줄로 바꾼 줄: ${changed}`);
    process.exit(0);
  } catch (e) {
    console.error(`${tag} 실패:`, e.message);
    process.exit(1);
  }
})();
