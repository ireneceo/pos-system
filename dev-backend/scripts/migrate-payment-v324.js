#!/usr/bin/env node
/**
 * Payment Architecture v3.24 — idempotent migration
 *
 * 1. payment_customers / subscriptions / webhook_events 테이블 생성
 * 2. Invoice 에 gateway_session_id, subscription_id 컬럼 추가
 * 3. 폐기 컬럼 제거 (Restaurant/Brand/Foodcourt 의 Phase 1-3 잔재)
 *
 * 모든 단계는 컬럼/테이블 존재 여부 체크 후 진행 — 재실행 안전.
 */
const database = require('../config/database');
const sequelize = database.sequelize;
require('../models'); // 모델 로드 + association

async function columnExists(table, column) {
  const [rows] = await sequelize.query(
    `SELECT COUNT(*) AS cnt FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    { replacements: [table, column] }
  );
  return rows[0].cnt > 0;
}

async function tableExists(table) {
  const [rows] = await sequelize.query(
    `SELECT COUNT(*) AS cnt FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    { replacements: [table] }
  );
  return rows[0].cnt > 0;
}

async function indexExists(table, indexName) {
  const [rows] = await sequelize.query(
    `SELECT COUNT(*) AS cnt FROM information_schema.STATISTICS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?`,
    { replacements: [table, indexName] }
  );
  return rows[0].cnt > 0;
}

async function step(label, fn) {
  process.stdout.write(`  ${label} ... `);
  try {
    const result = await fn();
    console.log(result === false ? 'skip' : 'ok');
  } catch (e) {
    console.log('FAIL');
    console.error(`    ${e.message}`);
    throw e;
  }
}

(async () => {
  console.log('▶ Payment Architecture v3.24 마이그레이션');

  console.log('\n[1] 새 테이블 생성');
  const PaymentCustomer = require('../models/PaymentCustomer');
  const Subscription = require('../models/Subscription');
  const WebhookEvent = require('../models/WebhookEvent');

  await step('payment_customers', async () => {
    if (await tableExists('payment_customers')) return false;
    await PaymentCustomer.sync();
  });
  await step('payment_subscriptions', async () => {
    if (await tableExists('payment_subscriptions')) return false;
    await Subscription.sync();
  });
  await step('webhook_events', async () => {
    if (await tableExists('webhook_events')) return false;
    await WebhookEvent.sync();
  });

  console.log('\n[2] Invoice 컬럼 추가');
  await step('invoices.gateway_session_id', async () => {
    if (await columnExists('invoices', 'gateway_session_id')) return false;
    await sequelize.query(
      `ALTER TABLE invoices ADD COLUMN gateway_session_id VARCHAR(120) NULL
         COMMENT 'Stripe Checkout session id or PayPal order id'`
    );
  });
  await step('invoices.subscription_id', async () => {
    if (await columnExists('invoices', 'subscription_id')) return false;
    await sequelize.query(
      `ALTER TABLE invoices ADD COLUMN subscription_id INT NULL
         COMMENT 'Subscription FK if part of recurring cycle'`
    );
  });
  await step('idx_invoices_gateway_session', async () => {
    if (await indexExists('invoices', 'idx_invoices_gateway_session')) return false;
    await sequelize.query(
      `CREATE INDEX idx_invoices_gateway_session ON invoices(gateway_session_id)`
    );
  });
  await step('idx_invoices_subscription', async () => {
    if (await indexExists('invoices', 'idx_invoices_subscription')) return false;
    await sequelize.query(
      `CREATE INDEX idx_invoices_subscription ON invoices(subscription_id)`
    );
  });

  console.log('\n[3] 폐기 컬럼 제거 (Phase 1-3 잔재)');
  for (const table of ['restaurants', 'brands', 'foodcourts']) {
    for (const col of [
      'stripe_customer_id',
      'stripe_default_payment_method',
      'auto_charge_enabled',
      'auto_charge_consent_at'
    ]) {
      await step(`${table}.${col} drop`, async () => {
        if (!(await columnExists(table, col))) return false;
        await sequelize.query(`ALTER TABLE \`${table}\` DROP COLUMN \`${col}\``);
      });
    }
    await step(`${table} idx_stripe_customer drop`, async () => {
      if (!(await indexExists(table, 'idx_stripe_customer'))) return false;
      await sequelize.query(`ALTER TABLE \`${table}\` DROP INDEX idx_stripe_customer`);
    });
  }

  console.log('\n[+] 완료');
  process.exit(0);
})().catch(e => {
  console.error('\nFATAL', e);
  process.exit(1);
});
