/**
 * 정산서에 «공급업체가 보낸 SOA» 기록 칸 추가 (2026-10-07 Fable 판정 ⑩ A-5 · docs/TRADE_STRUCTURE.md ⑩)
 *
 * invoices.external_document JSON NULL — { url, filename, number, date, total, uploaded_at, uploaded_by }
 * 외부(앱 안 쓰는) 공급업체의 월별 정산서에만 쓴다. 거래 청구서 원본은 발주의 external_invoice_* 그대로.
 *
 * 성질: 칸 추가만. 기존 데이터 변경 0 · 백필 0 · ENUM 무관 · NULL 허용. 멱등(있으면 skip).
 *       되돌리기는 칸을 남긴 채 옛 코드로 복원하면 된다(옛 코드는 이 칸을 읽지 않는다).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function main() {
  const rows = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'invoices' AND COLUMN_NAME = 'external_document'`,
    { type: QueryTypes.SELECT }
  );
  if (rows.length) { console.log('[invoice-external-document] invoices.external_document 이미 존재 — skip'); return; }
  await sequelize.query("ALTER TABLE `invoices` ADD COLUMN `external_document` JSON NULL COMMENT '공급업체가 보낸 SOA 기록 (외부 공급업체 정산서 전용)'");
  console.log('[invoice-external-document] invoices.external_document 추가 (데이터 변경 없음)');
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[invoice-external-document] 실패:', e.message); process.exit(1); });
