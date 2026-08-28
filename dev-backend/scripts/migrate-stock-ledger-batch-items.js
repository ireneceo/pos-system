/**
 * Migration: stock_ledger_batch_items 표 생성 (재고 장부 이관·일괄링크 이력).
 *
 * 설계: docs/STOCK_LEDGER_UNIFICATION_DESIGN.md §10-1
 *
 * 왜 sync-database 에 안 맡기나:
 *   sync-database 는 스키마를 만드는 **단일 경로가 아니다**([[reference_deploy_schema_drift]]).
 *   ENUM·인덱스가 조용히 안 만들어지고 배포는 그냥 통과한 전례가 있다.
 *   → 이 표는 마이그가 유일 경로. registry `deploy` 에 등록되어 매 배포 재실행된다(멱등).
 *
 * 안전: CREATE TABLE IF NOT EXISTS + 인덱스 개별 존재 확인 후 추가. 기존 행 미수정. 드롭 없음.
 *       process.exit 필수([[reference_deploy_migration_must_exit]]).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const TABLE = 'stock_ledger_batch_items';

const CREATE_SQL = `
CREATE TABLE IF NOT EXISTS \`${TABLE}\` (
  \`id\` INT NOT NULL AUTO_INCREMENT,
  \`batch_id\` CHAR(36) NOT NULL,
  \`entity_type\` ENUM('brand','restaurant','foodcourt') NOT NULL,
  \`entity_id\` INT NOT NULL,
  \`action\` ENUM('create_ingredient','link_seller','update_cost','skip','hold') NOT NULL,
  \`target_table\` VARCHAR(64) NOT NULL,
  \`target_id\` INT NULL,
  \`source_ref\` VARCHAR(64) NULL,
  \`payload_before\` JSON NULL,
  \`payload_after\` JSON NULL,
  \`status\` ENUM('applied','failed','reverted') NOT NULL DEFAULT 'applied',
  \`error\` VARCHAR(255) NULL,
  \`created_by_user_id\` INT NOT NULL,
  \`created_at\` DATETIME NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;

const INDEXES = [
  { name: 'slbi_batch', cols: '`batch_id`' },
  { name: 'slbi_entity', cols: '`entity_type`,`entity_id`,`created_at`' },
  { name: 'slbi_target', cols: '`target_table`,`target_id`' }
];

async function indexExists(name) {
  const [rows] = await sequelize.query(
    `SELECT 1 FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND INDEX_NAME = :n LIMIT 1`,
    { replacements: { t: TABLE, n: name } }
  );
  return rows.length > 0;
}

(async () => {
  try {
    console.log('[migrate-stock-ledger-batch-items] Starting...');
    await sequelize.query(CREATE_SQL);

    let added = 0;
    for (const ix of INDEXES) {
      if (await indexExists(ix.name)) continue;
      await sequelize.query(`ALTER TABLE \`${TABLE}\` ADD INDEX \`${ix.name}\` (${ix.cols})`);
      added++;
    }

    const [chk] = await sequelize.query(
      `SELECT COUNT(*) AS c FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
      { replacements: { t: TABLE } }
    );
    if (!chk[0] || Number(chk[0].c) !== 1) throw new Error(`${TABLE} was not created`);

    console.log(`  ✓ ${TABLE} ready (indexes added this run: ${added})`);
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
