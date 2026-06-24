/**
 * 2026-06-24 — 테이블이동·취소·void 재인쇄 DB 큐. orders.pending_reprint(JSON) + reprint_claimed_at(DATETIME).
 * 액션 라우트가 pending_reprint={type,data} 설정 → 인쇄 전담 POS 폴러가 인쇄 후 NULL. 죽은 claim 자동복구.
 * 멱등: 컬럼 있으면 스킵.
 */
const { sequelize } = require('../config/database');

async function run() {
  await sequelize.authenticate();
  const [pr] = await sequelize.query("SHOW COLUMNS FROM orders LIKE 'pending_reprint'");
  const [rc] = await sequelize.query("SHOW COLUMNS FROM orders LIKE 'reprint_claimed_at'");
  if (pr.length && rc.length) {
    console.log('✓ pending_reprint/reprint_claimed_at 이미 있음 — 스킵. migrated');
    await sequelize.close(); process.exit(0);
  }
  if (!pr.length) await sequelize.query("ALTER TABLE orders ADD COLUMN pending_reprint JSON NULL DEFAULT NULL AFTER print_claimed_at");
  if (!rc.length) await sequelize.query("ALTER TABLE orders ADD COLUMN reprint_claimed_at DATETIME NULL DEFAULT NULL AFTER pending_reprint");
  console.log('✓ migrate-pending-reprint complete: pending_reprint, reprint_claimed_at 추가. migrated');
  await sequelize.close(); process.exit(0);
}
run().catch(e => { console.error('마이그레이션 실패:', e.message); process.exit(1); });
