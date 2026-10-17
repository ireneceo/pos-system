'use strict';
/**
 * user_context_requests 테이블 생성 — 멀티 로그인 v1.3 「역할 추가 요청」.
 * .claude/fable-design-20261005-context-request.md §4.1 · docs/MULTI_CONTEXT_LOGIN_DESIGN.md §3.7.
 *
 * CREATE TABLE 만 한다(INSERT 0행). 표가 없을 때만 model.sync() — 있으면 아무것도 안 한다(색인 포함) — 멱등.
 * ENUM 은 새 표에만 있다(기존 ENUM 변경 0 — expand-only 규칙과 충돌 없음). registry `deploy`.
 *
 * Usage: node scripts/migrate-user-context-requests.js
 */
const db = require('../models');
const { sequelize } = require('../config/database');

(async () => {
  try {
    // 표가 있으면 손대지 않는다 — 있는 표에 sync() 를 하면 모델의 새 색인까지 만들려다, 그 칸을 더하는
    // migrate-user-context-requests-invite.js 보다 먼저 돌 때 운영에서 죽는다(2026-10-17 배포 실패).
    const [[t]] = await sequelize.query(
      `SELECT COUNT(*) c FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'user_context_requests'`
    );
    if (!Number(t.c)) await db.UserContextRequest.sync();
    const [[{ c }]] = await sequelize.query('SELECT COUNT(*) c FROM user_context_requests');
    console.log('- user_context_requests ensured (rows: ' + c + ')');
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
