'use strict';
/**
 * user_contexts.permissions (JSON NULL) 칸 추가 — 멀티 로그인 v1.3 Staff 모자.
 * .claude/fable-design-20261005-context-request.md §4.2.
 *
 * MySQL 8 은 ADD COLUMN IF NOT EXISTS 가 없으므로 information_schema 로 존재를 확인해 멱등으로 만든다.
 * 기존 행(RA·오너·BM 모자)은 NULL = 종전 동작. 값 쓰기 0행. registry `deploy`.
 * 표 자체가 없으면(새 환경에서 실행 순서가 앞설 때) 모델 sync 로 만든다 — 모델에 이 칸이 이미 있다.
 *
 * Usage: node scripts/migrate-user-contexts-permissions.js
 */
const db = require('../models');
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [[t]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_contexts'`
    );
    if (!Number(t.c)) {
      await db.UserContext.sync();
      console.log('- user_contexts created (with permissions)');
    }
    const [[col]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_contexts' AND COLUMN_NAME = 'permissions'`
    );
    if (Number(col.c)) {
      console.log('- user_contexts.permissions already exists (skip)');
    } else {
      await sequelize.query('ALTER TABLE user_contexts ADD COLUMN permissions JSON NULL AFTER granted_by');
      console.log('- user_contexts.permissions added');
    }
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
