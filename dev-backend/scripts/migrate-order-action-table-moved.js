#!/usr/bin/env node
/**
 * Migration — order_actions.action_type ENUM 에 'table_moved' 추가
 *
 * 배경: 테이블 이동(POST /orders/:id/move-table) 감사로그가 actionType='table_moved'
 *       를 기록한다. dev 모델/DB 에는 추가됐으나 운영 DB ENUM 에는 없어, 운영에서
 *       이동 시 감사 INSERT 가 ENUM 오류로 조용히 실패(logOrderActionSafe 가 삼킴)
 *       → 이동 감사기록 유실 + warn 스팸. Sequelize sync 는 ENUM 값 추가를 못 하므로
 *       명시적 ALTER 가 필요하다. (deploy-to-production.sh 9a-2 목록에 등록)
 *
 * Usage:
 *   node scripts/migrate-order-action-table-moved.js --dry-run   # plan만
 *   node scripts/migrate-order-action-table-moved.js             # 실제 실행
 *
 * 멱등성: 현재 COLUMN_TYPE 에 'table_moved' 가 이미 있으면 skip.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (msg) => console.log(`[migrate-order-action-table-moved]${DRY ? ' [DRY]' : ''} ${msg}`);

// OrderAction 모델 action_type 와 1:1 일치해야 함 (models/OrderAction.js)
const ENUM_VALUES = [
  'created', 'status_change',
  'item_added', 'item_removed', 'item_modified',
  'payment_received', 'payment_method_changed', 'payment_refunded',
  'discount_applied', 'discount_removed',
  'coupon_applied', 'coupon_removed',
  'cancelled', 'printed', 'reprinted',
  'merged', 'note_added', 'table_moved'
];

async function run() {
  try {
    const rows = await sequelize.query(
      `SELECT COLUMN_TYPE AS t FROM information_schema.columns
       WHERE table_schema = DATABASE() AND table_name = 'order_actions' AND column_name = 'action_type'`,
      { type: QueryTypes.SELECT }
    );
    if (!rows.length) {
      log('⚠ order_actions.action_type 컬럼이 없음 — sync-database.js 가 테이블을 먼저 만들어야 함. skip.');
      process.exit(0);
    }
    const current = rows[0].t || '';
    if (current.includes("'table_moved'")) {
      log("skip — 'table_moved' already present in ENUM");
      process.exit(0);
    }

    const enumSql = ENUM_VALUES.map(v => `'${v}'`).join(',');
    const sql = `ALTER TABLE order_actions MODIFY COLUMN action_type ENUM(${enumSql}) NOT NULL`;
    log(`현재: ${current}`);
    log(`적용 SQL: ${sql}`);
    if (DRY) { log('DRY-RUN — 적용 안 함'); process.exit(0); }

    await sequelize.query(sql);
    log("✓ done — 'table_moved' 추가 완료");
    process.exit(0);
  } catch (e) {
    console.error('[migrate-order-action-table-moved] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
