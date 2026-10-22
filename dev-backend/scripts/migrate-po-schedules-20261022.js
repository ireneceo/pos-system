/**
 * 정기 발주(Standing order) 표 2개 + purchase_orders.schedule_id — 2026-10-22 Fable 설계 recurring-po §2-4.
 *
 * 멱등: CREATE TABLE IF NOT EXISTS · 칸/색인은 information_schema 로 있는지 보고 더한다.
 * purchase_orders.status ENUM 은 건드리지 않는다(새 상태 없음). Model.sync 를 쓰지 않는다(운영 순서 게이트 4f 교훈).
 * 사용: node scripts/migrate-po-schedules-20261022.js
 */
const { sequelize } = require('../config/database');

async function hasColumn(table, col) {
  const [r] = await sequelize.query(
    'SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?',
    { replacements: [table, col] });
  return r.length > 0;
}
async function hasIndex(table, name) {
  const [r] = await sequelize.query(
    'SELECT 1 FROM information_schema.STATISTICS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?',
    { replacements: [table, name] });
  return r.length > 0;
}

(async () => {
  const done = [];
  try {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS purchase_order_schedules (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        entity_type ENUM('restaurant','brand','foodcourt') NOT NULL,
        entity_id INT NOT NULL,
        seller_type ENUM('system_admin','brand','foodcourt','supplier') NOT NULL,
        seller_entity_id INT NULL,
        name VARCHAR(100) NULL,
        line_items JSON NOT NULL,
        frequency ENUM('weekly','biweekly','monthly') NOT NULL,
        weekday TINYINT NULL,
        day_of_month TINYINT NULL,
        next_run_date DATE NULL,
        last_run_date DATE NULL,
        last_po_id INT NULL,
        status ENUM('pending_approval','active','paused','ended') NOT NULL DEFAULT 'active',
        paused_reason VARCHAR(255) NULL,
        ends_on DATE NULL,
        approval_required TINYINT(1) NOT NULL DEFAULT 0,
        approved_by_user_id INT NULL,
        approved_at DATETIME NULL,
        approved_total DECIMAL(12,2) NULL,
        rejected_by_user_id INT NULL,
        rejected_at DATETIME NULL,
        rejected_reason TEXT NULL,
        price_tolerance_pct DECIMAL(5,2) NOT NULL DEFAULT 10,
        source_po_id INT NULL,
        created_by_user_id INT NOT NULL,
        consecutive_failures TINYINT NOT NULL DEFAULT 0,
        last_error VARCHAR(500) NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        deleted_at DATETIME NULL,
        INDEX purchase_order_schedules_status_next_run_date (status, next_run_date),
        INDEX purchase_order_schedules_entity_type_entity_id (entity_type, entity_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
    done.push('purchase_order_schedules');

    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS purchase_order_schedule_runs (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        schedule_id INT NOT NULL,
        run_date DATE NOT NULL,
        po_id INT NULL,
        outcome ENUM('submitted','pending_approval','skipped','failed') NULL,
        reason VARCHAR(500) NULL,
        total_amount DECIMAL(12,2) NULL,
        drift_pct DECIMAL(8,2) NULL,
        created_at DATETIME NOT NULL,
        UNIQUE KEY uq_po_schedule_run_date (schedule_id, run_date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
    done.push('purchase_order_schedule_runs');

    // 하루 1건 보장 색인 — 표가 이미 있어도 빠져 있으면 다시 단다(CREATE IF NOT EXISTS 는 색인을 고치지 않는다)
    if (!(await hasIndex('purchase_order_schedule_runs', 'uq_po_schedule_run_date'))) {
      await sequelize.query('ALTER TABLE purchase_order_schedule_runs ADD UNIQUE KEY uq_po_schedule_run_date (schedule_id, run_date)');
      done.push('unique uq_po_schedule_run_date');
    }
    if (!(await hasColumn('purchase_orders', 'schedule_id'))) {
      await sequelize.query('ALTER TABLE purchase_orders ADD COLUMN schedule_id INT NULL');
      done.push('purchase_orders.schedule_id');
    }
    if (!(await hasIndex('purchase_orders', 'purchase_orders_schedule_id'))) {
      await sequelize.query('ALTER TABLE purchase_orders ADD INDEX purchase_orders_schedule_id (schedule_id)');
      done.push('index purchase_orders_schedule_id');
    }
    console.log(`[migrate-po-schedules-20261022] OK: ${done.join(', ')}`);
    process.exit(0);
  } catch (err) {
    console.error('[migrate-po-schedules-20261022] FAILED:', err.message);
    process.exit(1);
  }
})();
