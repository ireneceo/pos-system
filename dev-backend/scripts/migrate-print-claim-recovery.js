/**
 * 2026-06-24 — 인쇄 claim 자동복구. orders.print_claimed_at 컬럼 신설.
 *
 * 목적: 어느 기기가 주문을 print-claim(needs_print true→false) 했는데 실제 인쇄 확인(/printed)이
 * 안 오면(프린터 없는 노트북/서버가 가로챘다 실패, 또는 재무장 fetch 실패), 서버가 그 주문을
 * 자동으로 되살려(needs_print=true) 인쇄 전담 POS 가 받게 한다. 기기 설정 무관, 분실 0.
 *
 * print_claimed_at:
 *   - print-claim 시 NOW 기록
 *   - /printed(인쇄확인)·/print-rearm·/print-dismiss 시 NULL
 *   - pending-print 조회 시 NOT NULL 이면서 STALE(>20s) 이면 자동 re-arm
 *
 * 멱등: 컬럼 있으면 스킵.
 */
const { sequelize } = require('../config/database');

async function run() {
  await sequelize.authenticate();
  const [col] = await sequelize.query("SHOW COLUMNS FROM orders LIKE 'print_claimed_at'");
  if (col.length) {
    console.log('✓ print_claimed_at 컬럼 이미 있음 — 스킵. migrated');
    await sequelize.close();
    process.exit(0);
  }
  await sequelize.query('ALTER TABLE orders ADD COLUMN print_claimed_at DATETIME NULL DEFAULT NULL AFTER needs_print');
  console.log('✓ migrate-print-claim-recovery complete: orders.print_claimed_at 추가. migrated');
  await sequelize.close();
  process.exit(0);
}

run().catch(e => { console.error('마이그레이션 실패:', e.message); process.exit(1); });
