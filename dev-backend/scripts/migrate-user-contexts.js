'use strict';
/**
 * user_contexts 테이블 생성 — 멀티 컨텍스트 로그인 P1.
 * docs/MULTI_CONTEXT_LOGIN_DESIGN.md §3.2 / §3.4.
 *
 * CREATE TABLE 만 한다. **백필·INSERT 0행** — 네이티브 정체는 users.role 에서 파생하므로
 * 백필할 것 자체가 없다(설계 §3.4: v1 의 "전 유저 1:1 백필" 규칙은 운영 실측으로 반증돼 폐기).
 * 따라서 이 마이그레이션은 기존 사용자 동작을 한 바이트도 바꾸지 않는다.
 *
 * 멱등 — model.sync() 는 테이블이 없을 때만 만들고, 있으면 아무것도 하지 않는다(컬럼 드롭 없음).
 * 여러 번 실행해도 안전하므로 registry 의 `deploy`(매 배포 재실행) 분류.
 *
 * Usage: node scripts/migrate-user-contexts.js
 */
const db = require('../models');
// models/index.js 는 sequelize 인스턴스를 export 하지 않는다 — config 에서 직접 가져온다.
const { sequelize } = require('../config/database');

(async () => {
  try {
    await db.UserContext.sync();
    const [[{ c }]] = await sequelize.query('SELECT COUNT(*) c FROM user_contexts');
    console.log('- user_contexts ensured (rows: ' + c + ')');
    console.log('✓ done');
  } catch (e) {
    console.log('ERROR', e.message);
    process.exit(1);
  }
  process.exit(0);
})();
