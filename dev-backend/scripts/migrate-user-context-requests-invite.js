'use strict';
/**
 * user_context_requests 에 «초대» 칸 3개 + 인덱스 1 — 멀티 로그인 v1.4.
 * .claude/fable-design-20261016-link-existing-account-staff.md §4.1.
 *
 *   initiator  ENUM('requester','grantor') NOT NULL DEFAULT 'requester' — 누가 시작했나(기존 행 = requester)
 *   created_by INT NULL   — 시작한 사람(요청 = 본인, 초대 = RA). 기존 행 NULL
 *   permissions JSON NULL — 초대 전용(RA 가 고른 Staff 권한). 요청 행 NULL
 *
 * 새 칸이라 ENUM expand-only 와 충돌 없음(status ENUM 은 건드리지 않는다). 값 쓰기 0행 · 멱등 · registry `deploy`.
 * 표가 없으면(새 환경) 모델 sync 로 만든다 — 모델에 세 칸이 이미 있다.
 *
 * Usage: node scripts/migrate-user-context-requests-invite.js
 */
const db = require('../models');
const { sequelize } = require('../config/database');

const COLUMNS = [
  ['initiator', "ADD COLUMN initiator ENUM('requester','grantor') NOT NULL DEFAULT 'requester' AFTER status"],
  ['created_by', 'ADD COLUMN created_by INT NULL AFTER initiator'],
  ['permissions', 'ADD COLUMN permissions JSON NULL AFTER created_by']
];
const INDEX_NAME = 'user_context_requests_entity_status_initiator';

(async () => {
  try {
    const [[t]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_context_requests'`
    );
    if (!Number(t.c)) {
      await db.UserContextRequest.sync();
      console.log('- user_context_requests created (with invite columns)');
    }
    for (const [name, ddl] of COLUMNS) {
      const [[col]] = await sequelize.query(
        `SELECT COUNT(*) c FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_context_requests' AND COLUMN_NAME = :name`,
        { replacements: { name } }
      );
      if (Number(col.c)) {
        console.log(`- user_context_requests.${name} already exists (skip)`);
      } else {
        await sequelize.query(`ALTER TABLE user_context_requests ${ddl}`);
        console.log(`- user_context_requests.${name} added`);
      }
    }
    const [[idx]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.STATISTICS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_context_requests' AND INDEX_NAME = :n`,
      { replacements: { n: INDEX_NAME } }
    );
    if (Number(idx.c)) {
      console.log(`- index ${INDEX_NAME} already exists (skip)`);
    } else {
      await sequelize.query(
        `CREATE INDEX ${INDEX_NAME} ON user_context_requests (entity_type, entity_id, status, initiator)`
      );
      console.log(`- index ${INDEX_NAME} added`);
    }
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
