#!/usr/bin/env node
/**
 * Migration — coupons 다매장 타게팅(scope) 컬럼
 *
 * FG/BG 가 "전 매장 / 선택 매장" 으로 쿠폰을 발행할 수 있게 한다.
 * 쿠폰은 여전히 매장당 1행(restaurant_id+code 유니크)으로 materialize 되며,
 * 아래 컬럼은 형제 행들을 한 묶음으로 관리(목록/수정/삭제)하기 위한 그룹 메타다.
 * 결제/검증 로직(orders-crud / mobile-orders / coupons validate)은 (restaurant_id, code)
 * 조회 그대로 → 무변경(인쇄 인접 코드 접촉 0).
 *
 *   scope_group_id   VARCHAR(40)  — 같이 만든 형제 행 묶음 id (NULL = 기존 단일매장 쿠폰)
 *   scope_owner_type ENUM('brand','foodcourt') — 발행 주체
 *   scope_owner_id   INT          — 해당 brand_id / foodcourt_id
 *   scope_mode       ENUM('all','selected') — 발행 시 타게팅 방식(정보/재현용)
 *
 * 운영은 sync-database --alter 를 안 돌리므로([[reference_sync_alter_drops_columns]])
 * 명시적 멱등 마이그. deploy-to-production.sh 9a-2 등록.
 *
 * Usage: node scripts/migrate-coupon-scope.js [--dry-run]
 * 멱등성: 컬럼/인덱스가 이미 있으면 skip.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (m) => console.log(`[migrate-coupon-scope]${DRY ? ' [DRY]' : ''} ${m}`);

async function columnExists(table, col) {
  const r = await sequelize.query(
    `SELECT 1 AS x FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = :table AND column_name = :col`,
    { type: QueryTypes.SELECT, replacements: { table, col } });
  return r.length > 0;
}
async function indexExists(table, idx) {
  const r = await sequelize.query(
    `SELECT 1 AS x FROM information_schema.statistics WHERE table_schema = DATABASE() AND table_name = :table AND index_name = :idx`,
    { type: QueryTypes.SELECT, replacements: { table, idx } });
  return r.length > 0;
}

async function addCol(col, ddl) {
  if (await columnExists('coupons', col)) { log(`skip — coupons.${col} already present`); return; }
  if (DRY) { log(`would add coupons.${col}`); return; }
  await sequelize.query(`ALTER TABLE coupons ADD COLUMN ${ddl}`);
  log(`✓ added coupons.${col}`);
}

async function run() {
  try {
    await addCol('scope_group_id', `scope_group_id VARCHAR(40) NULL`);
    await addCol('scope_owner_type', `scope_owner_type ENUM('brand','foodcourt') NULL`);
    await addCol('scope_owner_id', `scope_owner_id INT NULL`);
    await addCol('scope_mode', `scope_mode ENUM('all','selected') NULL`);

    if (await indexExists('coupons', 'coupons_scope_group_id')) {
      log('skip — index coupons_scope_group_id already present');
    } else if (!DRY) {
      await sequelize.query(`ALTER TABLE coupons ADD INDEX coupons_scope_group_id (scope_group_id)`);
      log('✓ added index coupons_scope_group_id');
    } else { log('would add index coupons_scope_group_id'); }

    if (await indexExists('coupons', 'coupons_scope_owner')) {
      log('skip — index coupons_scope_owner already present');
    } else if (!DRY) {
      await sequelize.query(`ALTER TABLE coupons ADD INDEX coupons_scope_owner (scope_owner_type, scope_owner_id)`);
      log('✓ added index coupons_scope_owner');
    } else { log('would add index coupons_scope_owner'); }

    log('done');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-coupon-scope] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
