#!/usr/bin/env node
/**
 * Migration — users.is_active 컬럼 추가 (BG-1-3 Admin Activate/Deactivate)
 *
 * 배경: Admin/Staff 관리 화면(AdminManagementPage)이 사용자를 활성/비활성 토글한다.
 *       프론트는 GET /api/users 에서 u.is_active 를 읽고, [Deactivate] 시
 *       PUT /api/users/:id { is_active:false } 를 보낸다. 그러나 users 테이블/User
 *       모델에 is_active 컬럼이 자체가 없어 — 목록은 항상 Active 로 보이고,
 *       토글 저장은 조용히 무시(모델 밖 필드) → "비활성이 안 된다" 버그.
 *       Sequelize sync 는 컬럼을 추가할 수 있지만 운영은 --alter 를 돌리지 않으므로
 *       명시적 멱등 ALTER 가 필요. (deploy-to-production.sh 9a-2 목록에 등록)
 *
 *       비활성(false) 사용자는 로그인 차단(authService.login → ACCOUNT_DEACTIVATED).
 *       기존 모든 행은 active(=1) 로 백필되어 아무도 락아웃되지 않는다.
 *
 * Usage:
 *   node scripts/migrate-user-is-active.js --dry-run   # plan만
 *   node scripts/migrate-user-is-active.js             # 실제 실행
 *
 * 멱등성: users.is_active 컬럼이 이미 있으면 skip.
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const log = (msg) => console.log(`[migrate-user-is-active]${DRY ? ' [DRY]' : ''} ${msg}`);

async function run() {
  try {
    const rows = await sequelize.query(
      `SELECT COLUMN_NAME AS c FROM information_schema.columns
       WHERE table_schema = DATABASE() AND table_name = 'users' AND column_name = 'is_active'`,
      { type: QueryTypes.SELECT }
    );
    if (rows.length) {
      log('skip — users.is_active already present');
      process.exit(0);
    }

    const sql = `ALTER TABLE users ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1`;
    log(`적용 SQL: ${sql}`);
    if (DRY) { log('DRY-RUN — 적용 안 함'); process.exit(0); }

    await sequelize.query(sql);
    // 기존 행 명시 백필 (DEFAULT 가 이미 1 이지만 안전망)
    await sequelize.query(`UPDATE users SET is_active = 1 WHERE is_active IS NULL`);
    log('✓ done — users.is_active 추가 + 기존 행 active 백필 완료');
    process.exit(0);
  } catch (e) {
    console.error('[migrate-user-is-active] ✗ failed:', e && e.message);
    process.exit(1);
  }
}
run();
