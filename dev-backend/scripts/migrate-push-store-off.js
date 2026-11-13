'use strict';
/**
 * 매장별 기기 알림 끄기 — users.push_store_off (JSON NULL) 칸 + push_logs.status 에 'store_off' 값.
 * 설계 .claude/fable-design-20261113-notification-store-scope.md (N4).
 *
 * 멱등: 칸은 information_schema 로 있으면 건너뜀 · ENUM 은 expandEnum(부족한 값만 더함 — 목록 교체 금지).
 * 기존 행은 NULL = 모든 매장 받음(종전 동작). 값 쓰기 0행. registry `deploy`.
 *
 * Usage: node scripts/migrate-push-store-off.js
 */
const { sequelize } = require('../config/database');
const { expandEnum } = require('./lib/enumExpand');

(async () => {
  try {
    const [[col]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users' AND COLUMN_NAME = 'push_store_off'`
    );
    if (Number(col.c)) {
      console.log('- users.push_store_off already exists (skip)');
    } else {
      await sequelize.query('ALTER TABLE users ADD COLUMN push_store_off JSON NULL AFTER push_muted_hours');
      console.log('- users.push_store_off added');
    }
    const [[t]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'push_logs'`
    );
    if (Number(t.c)) {
      const r = await expandEnum(sequelize, 'push_logs', 'status', ['store_off']);
      console.log(`- push_logs.status added: ${r.added.join(',') || '(none)'}`);
    } else {
      console.log('- push_logs table missing (skip enum — model sync will create it with store_off)');
    }
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
