#!/usr/bin/env node
/**
 * Referral System Migration (Phase 1A)
 *
 * Applies:
 *  - ALTER users.role ENUM (add 'Referral Partner'; Supplier Admin/Staff already in DB)
 *  - ALTER users (referral_code, referred_by, referral_discount_applied,
 *                 bank_name, bank_account_number, bank_account_holder)
 *  - CREATE TABLE referral_wallets, referral_commissions, referral_wallet_transactions,
 *                 referral_payouts, referral_clicks, referral_settings
 *  - INSERT INTO referral_settings DEFAULT row (id=1)
 *
 * Usage:
 *   node scripts/migrate-referral.js --dry-run    # plan only
 *   node scripts/migrate-referral.js              # execute
 *
 * Idempotent: information_schema pre-check, IF NOT EXISTS, INSERT IGNORE.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (msg) => console.log(`[migrate-referral]${DRY ? ' [DRY]' : ''} ${msg}`);

async function columnExists(table, column) {
  const r = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    { replacements: [table, column], type: QueryTypes.SELECT }
  );
  return r[0].c > 0;
}

async function tableExists(table) {
  const r = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.tables
     WHERE table_schema = DATABASE() AND table_name = ?`,
    { replacements: [table], type: QueryTypes.SELECT }
  );
  return r[0].c > 0;
}

async function indexExists(table, indexName) {
  const r = await sequelize.query(
    `SELECT COUNT(*) AS c FROM information_schema.statistics
     WHERE table_schema = DATABASE() AND table_name = ? AND index_name = ?`,
    { replacements: [table, indexName], type: QueryTypes.SELECT }
  );
  return r[0].c > 0;
}

async function getEnumValues(table, column) {
  const r = await sequelize.query(
    `SELECT COLUMN_TYPE FROM information_schema.columns
     WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?`,
    { replacements: [table, column], type: QueryTypes.SELECT }
  );
  if (!r.length) return [];
  const t = r[0].COLUMN_TYPE;
  const m = t.match(/^enum\((.+)\)$/i);
  if (!m) return [];
  return m[1].split(',').map(s => s.trim().replace(/^'|'$/g, ''));
}

async function run(sql, replacements) {
  if (DRY) { log(`SQL: ${sql.split('\n').map(s => s.trim()).join(' ').slice(0, 240)}`); return; }
  await sequelize.query(sql, replacements ? { replacements } : {});
}

async function ensureRoleEnum() {
  const values = await getEnumValues('users', 'role');
  const desired = [
    'System Admin', 'Foodcourt General', 'Brand General',
    'Foodcourt Manager', 'Brand Manager', 'Restaurant Owner',
    'Restaurant Admin', 'Staff',
    'Supplier Admin', 'Supplier Staff',
    'Referral Partner'
  ];
  const missing = desired.filter(v => !values.includes(v));
  if (missing.length === 0) {
    log('users.role ENUM already complete — skip');
    return;
  }
  log(`users.role ENUM missing: [${missing.join(', ')}] — extending`);
  const enumLiteral = desired.map(v => `'${v.replace(/'/g, "''")}'`).join(', ');
  await run(`ALTER TABLE users MODIFY COLUMN role ENUM(${enumLiteral}) DEFAULT 'Staff'`);
}

async function ensureUserColumns() {
  const cols = [
    { name: 'referral_code', sql: "VARCHAR(20) NULL DEFAULT NULL COMMENT 'PURPLE-XXXX format'" },
    { name: 'referred_by', sql: "INT NULL DEFAULT NULL COMMENT 'User.id of referrer'" },
    { name: 'referral_discount_applied', sql: "TINYINT(1) NOT NULL DEFAULT 0" },
    { name: 'bank_name', sql: "VARCHAR(100) NULL DEFAULT NULL" },
    { name: 'bank_account_number', sql: "VARCHAR(50) NULL DEFAULT NULL" },
    { name: 'bank_account_holder', sql: "VARCHAR(100) NULL DEFAULT NULL" }
  ];
  for (const c of cols) {
    if (await columnExists('users', c.name)) {
      log(`users.${c.name} exists — skip`);
      continue;
    }
    log(`adding users.${c.name}`);
    await run(`ALTER TABLE users ADD COLUMN ${c.name} ${c.sql}`);
  }
  if (!(await indexExists('users', 'idx_users_referral_code'))) {
    log('adding UNIQUE INDEX idx_users_referral_code');
    await run(`ALTER TABLE users ADD UNIQUE INDEX idx_users_referral_code (referral_code)`);
  }
  if (!(await indexExists('users', 'idx_users_referred_by'))) {
    log('adding INDEX idx_users_referred_by');
    await run(`ALTER TABLE users ADD INDEX idx_users_referred_by (referred_by)`);
  }
}

const TABLES = [
  {
    name: 'referral_wallets',
    sql: `CREATE TABLE IF NOT EXISTS referral_wallets (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      currency VARCHAR(10) NOT NULL DEFAULT 'MYR',
      balance DECIMAL(12,2) NOT NULL DEFAULT 0,
      total_earned DECIMAL(12,2) NOT NULL DEFAULT 0,
      total_withdrawn DECIMAL(12,2) NOT NULL DEFAULT 0,
      total_credited DECIMAL(12,2) NOT NULL DEFAULT 0,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      UNIQUE KEY uniq_referral_wallet_user_currency (user_id, currency),
      KEY idx_referral_wallet_user (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  },
  {
    name: 'referral_commissions',
    sql: `CREATE TABLE IF NOT EXISTS referral_commissions (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      referrer_id INT NOT NULL,
      referred_id INT NOT NULL,
      invoice_id INT NOT NULL,
      invoice_amount DECIMAL(12,2) NOT NULL,
      commission_rate DECIMAL(5,2) NOT NULL,
      commission_amount DECIMAL(12,2) NOT NULL,
      currency VARCHAR(10) NOT NULL,
      status ENUM('credited','cancelled') NOT NULL DEFAULT 'credited',
      cancelled_reason VARCHAR(255) NULL DEFAULT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      UNIQUE KEY uniq_referral_commission_invoice_referrer (invoice_id, referrer_id),
      KEY idx_referral_commission_referrer_status (referrer_id, status),
      KEY idx_referral_commission_referred (referred_id),
      KEY idx_referral_commission_invoice (invoice_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  },
  {
    name: 'referral_wallet_transactions',
    sql: `CREATE TABLE IF NOT EXISTS referral_wallet_transactions (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      wallet_id INT NOT NULL,
      type ENUM('commission','credit_used','payout','adjustment') NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      balance_after DECIMAL(12,2) NOT NULL,
      reference_type VARCHAR(50) NULL DEFAULT NULL,
      reference_id INT NULL DEFAULT NULL,
      description VARCHAR(255) NULL DEFAULT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      KEY idx_referral_wallet_tx_wallet_created (wallet_id, createdAt),
      KEY idx_referral_wallet_tx_type (type),
      KEY idx_referral_wallet_tx_reference (reference_type, reference_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  },
  {
    name: 'referral_payouts',
    sql: `CREATE TABLE IF NOT EXISTS referral_payouts (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      amount DECIMAL(12,2) NOT NULL,
      currency VARCHAR(10) NOT NULL,
      bank_name VARCHAR(100) NOT NULL,
      bank_account_number VARCHAR(50) NOT NULL,
      bank_account_holder VARCHAR(100) NOT NULL,
      status ENUM('requested','approved','paid','rejected') NOT NULL DEFAULT 'requested',
      reviewed_by INT NULL DEFAULT NULL,
      reviewed_at DATETIME NULL DEFAULT NULL,
      paid_at DATETIME NULL DEFAULT NULL,
      reject_reason VARCHAR(500) NULL DEFAULT NULL,
      transaction_reference VARCHAR(255) NULL DEFAULT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      KEY idx_referral_payout_user_status (user_id, status),
      KEY idx_referral_payout_status_created (status, createdAt)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  },
  {
    name: 'referral_clicks',
    sql: `CREATE TABLE IF NOT EXISTS referral_clicks (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      referral_code VARCHAR(20) NOT NULL,
      ip_address VARCHAR(45) NULL DEFAULT NULL,
      user_agent VARCHAR(500) NULL DEFAULT NULL,
      source VARCHAR(50) NULL DEFAULT NULL,
      converted TINYINT(1) NOT NULL DEFAULT 0,
      converted_at DATETIME NULL DEFAULT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      KEY idx_referral_click_code_created (referral_code, createdAt),
      KEY idx_referral_click_ip_created (ip_address, createdAt),
      KEY idx_referral_click_converted (converted)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  },
  {
    name: 'referral_settings',
    sql: `CREATE TABLE IF NOT EXISTS referral_settings (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      commission_rate DECIMAL(5,2) NOT NULL DEFAULT 15.00,
      first_month_discount DECIMAL(5,2) NOT NULL DEFAULT 20.00,
      min_payout_amounts JSON NOT NULL,
      program_active TINYINT(1) NOT NULL DEFAULT 1,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
  }
];

async function ensureTables() {
  for (const t of TABLES) {
    if (await tableExists(t.name)) {
      log(`table ${t.name} exists — skip`);
      continue;
    }
    log(`creating table ${t.name}`);
    await run(t.sql);
  }
}

async function ensureSettingsRow() {
  if (DRY) { log('would seed referral_settings id=1'); return; }
  const r = await sequelize.query('SELECT COUNT(*) AS c FROM referral_settings', { type: QueryTypes.SELECT });
  if (r[0].c > 0) {
    log('referral_settings row already exists — skip seed');
    return;
  }
  log('seeding referral_settings id=1');
  await sequelize.query(
    `INSERT INTO referral_settings (id, commission_rate, first_month_discount, min_payout_amounts, program_active, createdAt, updatedAt)
     VALUES (1, 15.00, 20.00, ?, 1, NOW(), NOW())`,
    { replacements: [JSON.stringify({ MYR: 50, USD: 20, KRW: 50000, SGD: 30 })] }
  );
}

(async () => {
  try {
    log('start');
    await ensureRoleEnum();
    await ensureUserColumns();
    await ensureTables();
    await ensureSettingsRow();
    log('done ✓');
    process.exit(0);
  } catch (err) {
    console.error('[migrate-referral] error:', err);
    process.exit(1);
  }
})();
