/**
 * Migration: Add 'partial' to orders.payment_status ENUM.
 *
 * sync-database.js 는 ENUM 값 변경을 자동으로 못함 (deploy-to-production.sh:277).
 * 이 스크립트는 ALTER 1줄을 idempotent 하게 적용.
 *
 * 영향:
 *   - 기존 값 (pending/completed/failed 등) 그대로 보존.
 *   - 'partial' 만 추가 → split bill 결제 시 backend POST /payments 가 set 가능.
 *
 * 안전:
 *   - 기존 row 데이터 미수정.
 *   - 옛 결제 흐름 영향 0 ('partial' set 하는 곳은 POST /orders/:id/payments 뿐).
 *   - 운영 매장 무중단 (MySQL ENUM 확장은 metadata-only 변경, 빠름).
 *
 * 사용:
 *   node scripts/migrate-add-partial-payment.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');

(async () => {
  try {
    console.log('[migrate-add-partial-payment] Starting...');

    // Check current ENUM definition
    const [cols] = await sequelize.query(
      "SHOW COLUMNS FROM orders LIKE 'payment_status'"
    );
    if (cols.length === 0) {
      console.error('  ✗ orders.payment_status column not found');
      process.exit(1);
    }
    const currentType = cols[0].Type;
    console.log('  Current:', currentType);

    if (currentType.includes("'partial'")) {
      console.log('  ✓ partial already present');
    } else {
      console.log('  Applying ENUM ALTER...');
      await sequelize.query(
        `ALTER TABLE orders MODIFY COLUMN payment_status
         ENUM('pending','partial','completed','failed','payment_verification_pending','rejected')
         DEFAULT 'pending'`
      );
      console.log('  ✓ ENUM extended (partial added)');
    }

    // Also verify amount_paid column (sync-database.js 가 자동 추가하지만 안전망)
    const [amt] = await sequelize.query(
      "SHOW COLUMNS FROM orders LIKE 'amount_paid'"
    );
    if (amt.length === 0) {
      console.log('  Adding amount_paid column...');
      await sequelize.query(
        `ALTER TABLE orders ADD COLUMN amount_paid DECIMAL(10,2) NOT NULL DEFAULT 0 AFTER total_amount`
      );
      console.log('  ✓ amount_paid column added');
    } else {
      console.log('  ✓ amount_paid column already exists');
    }

    // order_payments + order_actions 테이블 (sync-database.js safe mode 는 자동 생성 안 함).
    console.log('  Ensuring order_payments + order_actions tables...');
    const OrderPayment = require('../models/OrderPayment');
    const OrderAction = require('../models/OrderAction');
    await OrderPayment.sync({ alter: false });
    console.log('  ✓ order_payments table ready');
    await OrderAction.sync({ alter: false });
    console.log('  ✓ order_actions table ready');

    process.exit(0);
  } catch (e) {
    console.error('  ✗ Migration failed:', e.message);
    process.exit(1);
  }
})();
