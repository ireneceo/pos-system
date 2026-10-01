/**
 * Migration: Create terminal_transactions table (카드단말기 ECR 연동 — 시도 1건 = 1행).
 *
 * 설계: .claude/fable-design-20261001-ghl-ecr.md §3-1 (Fable 판정 2026-10-01).
 *   진실의 원천 = 이 표. 승인·거절·타임아웃·복구·수동 기록까지 전부 남는다.
 *   orders.transaction_id / order_payments.transaction_id 는 기존 칸을 색인용으로 채울 뿐 — 기존 표 변경 0.
 *
 * 안전: 신규 테이블만(CREATE TABLE IF NOT EXISTS) · 멱등 · process.exit 필수.
 * ENUM 값을 늘릴 때는 목록을 바꾸지 말고 scripts/lib/enumExpand 로 부족한 값만 더한다.
 *
 * 사용: node scripts/migrate-create-terminal-transactions.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-create-terminal-transactions] Starting...');
    const [tbls] = await sequelize.query("SHOW TABLES LIKE 'terminal_transactions'");
    if (tbls.length > 0) {
      console.log('  ✓ terminal_transactions table already exists');
    } else {
    await sequelize.query(`
      CREATE TABLE terminal_transactions (
        id INT NOT NULL AUTO_INCREMENT,
        restaurant_id INT NOT NULL,
        order_id INT NULL,
        order_payment_id INT NULL,
        parent_id INT NULL,
        provider ENUM('ghl_ecr') NOT NULL DEFAULT 'ghl_ecr',
        command ENUM('sale','void','refund','reprint','check_status','settlement','echo') NOT NULL,
        ecr_invoice_no VARCHAR(40) NULL,
        amount DECIMAL(10,2) NULL,
        currency CHAR(3) NOT NULL DEFAULT 'MYR',
        status ENUM('created','sent','approved','declined','cancelled','pending','timeout','comm_error','recovering','not_found','voided','manual') NOT NULL DEFAULT 'created',
        status_code VARCHAR(4) NULL,
        status_message VARCHAR(200) NULL,
        request_hex TEXT NULL,
        response_hex TEXT NULL,
        terminal_invoice_no VARCHAR(20) NULL,
        terminal_batch_no VARCHAR(12) NULL,
        approval_code VARCHAR(12) NULL,
        rrn VARCHAR(20) NULL,
        masked_pan VARCHAR(24) NULL,
        card_type_code VARCHAR(4) NULL,
        card_brand VARCHAR(40) NULL,
        card_type VARCHAR(20) NULL,
        tender_method ENUM('card','ewallet') NULL,
        ewallet_type VARCHAR(20) NULL,
        entry_mode VARCHAR(20) NULL,
        terminal_id VARCHAR(16) NULL,
        merchant_id VARCHAR(20) NULL,
        txn_ref VARCHAR(48) NULL,
        txn_datetime VARCHAR(12) NULL,
        message_prompt VARCHAR(80) NULL,
        cashier_id INT NULL,
        cashier_name VARCHAR(150) NULL,
        device_label VARCHAR(80) NULL,
        manual_override TINYINT(1) NOT NULL DEFAULT 0,
        manual_note VARCHAR(300) NULL,
        sent_at DATETIME NULL,
        responded_at DATETIME NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        PRIMARY KEY (id),
        UNIQUE KEY terminal_txn_ecr_invoice (ecr_invoice_no),
        INDEX terminal_txn_rest_time (restaurant_id, created_at),
        INDEX terminal_txn_order (order_id),
        INDEX terminal_txn_parent (parent_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('  ✓ terminal_transactions table created');
    }
    // 2026-10-01 결제 수단 분류(Fable 추가 판정 C-2) — 표를 먼저 만든 환경(dev)에도 두 칸을 보장한다(멱등).
    // ENUM 값을 늘릴 때는 목록을 바꾸지 말고 scripts/lib/enumExpand 의 expandEnum 으로 부족한 값만 더한다.
    const [cols] = await sequelize.query(
      "SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'terminal_transactions'");
    const have = new Set(cols.map((c) => c.COLUMN_NAME));
    if (!have.has('tender_method')) {
      await sequelize.query("ALTER TABLE terminal_transactions ADD COLUMN tender_method ENUM('card','ewallet') NULL AFTER card_type");
      console.log('  ✓ tender_method added');
    }
    if (!have.has('ewallet_type')) {
      await sequelize.query('ALTER TABLE terminal_transactions ADD COLUMN ewallet_type VARCHAR(20) NULL AFTER tender_method');
      console.log('  ✓ ewallet_type added');
    }
    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
