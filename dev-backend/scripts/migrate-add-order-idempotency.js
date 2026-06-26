/**
 * Migration: Add orders.idempotency_key (#9 오프라인 주문 큐 — 중복생성 방지).
 *
 * 배경 (#9, 2026-06-26):
 *   매장 연결이 끊긴 중 생성된 주문을 클라가 localStorage 큐에 담아 재연결 시 재전송한다.
 *   재전송이 원본과 겹치면 같은 주문이 2번 만들어질 수 있다. 클라가 만든 idempotency_key(UUID)를
 *   orders 에 저장하고, 같은 key 가 다시 오면 새로 만들지 않고 기존 주문을 그대로 돌려준다(멱등).
 *
 * 안전:
 *   - 새 nullable 컬럼 + UNIQUE 인덱스만 추가. 기존 row/데이터 미수정.
 *   - 멱등 (이미 있으면 skip). sync-database --alter 의존 금지([[reference_sync_alter_drops_columns]]).
 *   - 인쇄 무관 (billPrint 무변경).
 *   - process.exit 필수([[reference_deploy_migration_must_exit]]).
 *
 * 사용: node scripts/migrate-add-order-idempotency.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-add-order-idempotency] Starting...');
    const [cols] = await sequelize.query("SHOW COLUMNS FROM orders LIKE 'idempotency_key'");
    if (cols.length > 0) {
      console.log('  ✓ orders.idempotency_key already exists —', cols[0].Type);
    } else {
      console.log('  Adding orders.idempotency_key (VARCHAR(64) NULL)...');
      await sequelize.query("ALTER TABLE orders ADD COLUMN idempotency_key VARCHAR(64) NULL AFTER order_number");
      console.log('  ✓ orders.idempotency_key column added');
    }
    // UNIQUE 인덱스 (NULL 은 MySQL 에서 중복 허용 → 키 없는 기존/일반 주문엔 영향 없음)
    const [idx] = await sequelize.query("SHOW INDEX FROM orders WHERE Key_name = 'uniq_orders_idempotency_key'");
    if (idx.length > 0) {
      console.log('  ✓ unique index uniq_orders_idempotency_key already exists');
    } else {
      console.log('  Adding UNIQUE index uniq_orders_idempotency_key...');
      await sequelize.query("ALTER TABLE orders ADD UNIQUE INDEX uniq_orders_idempotency_key (idempotency_key)");
      console.log('  ✓ unique index added');
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
