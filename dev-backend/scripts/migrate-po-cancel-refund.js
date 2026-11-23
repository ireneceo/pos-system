'use strict';
/**
 * 판매자 주문 취소 · 결제 후 반품 환불 (2026-11-23 · 설계 .claude/fable-design-20261123-seller-order-cancel-edit-refund.md §6)
 *   새 표 purchase_order_refunds (환불할 금액 · pending → sent → confirmed)
 *   purchase_order_returns.refund_id (환불로 처리한 반품)
 *   purchase_order_returns.status 에 'withdrawn' (구매자 신청 철회) — expandEnum(늘리기만)
 * 멱등: 있으면 건너뜀. registry `deploy`.
 *
 * Usage: node scripts/migrate-po-cancel-refund.js
 */
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  try {
    const [[tbl]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'purchase_order_refunds'`
    );
    if (Number(tbl.c)) {
      console.log('- purchase_order_refunds already exists (skip)');
    } else {
      await sequelize.query(`CREATE TABLE purchase_order_refunds (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        purchase_order_id INT NOT NULL,
        amount DECIMAL(12,2) NOT NULL DEFAULT 0,
        currency VARCHAR(10) NULL,
        status VARCHAR(16) NOT NULL DEFAULT 'pending',
        method VARCHAR(20) NULL,
        reference VARCHAR(100) NULL,
        note TEXT NULL,
        sent_at DATETIME NULL,
        sent_by_user_id INT NULL,
        confirmed_at DATETIME NULL,
        confirmed_by_user_id INT NULL,
        received_method VARCHAR(20) NULL,
        cash_movement_id INT NULL,
        history JSON NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        KEY idx_po_refunds_po_status (purchase_order_id, status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
      console.log('- purchase_order_refunds created');
    }

    const [[col]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'purchase_order_returns' AND COLUMN_NAME = 'refund_id'`
    );
    if (Number(col.c)) console.log('- purchase_order_returns.refund_id already exists (skip)');
    else { await sequelize.query('ALTER TABLE purchase_order_returns ADD COLUMN refund_id INT NULL'); console.log('- purchase_order_returns.refund_id added'); }

    await expandEnum(sequelize, 'purchase_order_returns', 'status', ['withdrawn']);
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
