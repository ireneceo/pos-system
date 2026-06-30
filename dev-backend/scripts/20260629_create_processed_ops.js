/**
 * 2026-06-29: processed_ops 테이블 생성 (오프라인 5단계 §8 opId 멱등 가드).
 * 신규 테이블. 멱등(테이블 존재 시 skip). 운영은 sync --alter 안 돎 → 전용 마이그(배포 목록 등록).
 * 이 테이블이 없으면 opIdGuard 가 no-op 으로 떨어져 오프라인 재생 add_items/pay 중복적용 위험.
 * process.exit() 필수 (sequelize 핸들 잔류로 배포 정지 방지 — reference_deploy_migration_must_exit).
 */
require('dotenv').config();
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const ProcessedOp = require('../models/ProcessedOp');

async function tableExists(table) {
  const r = await sequelize.query(
    `SELECT 1 x FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name=:table`,
    { type: QueryTypes.SELECT, replacements: { table } });
  return r.length > 0;
}

(async () => {
  try {
    if (await tableExists('processed_ops')) {
      console.log('[migrate-processed-ops] processed_ops 이미 존재 — skip');
    } else {
      // 모델 정의로 테이블 생성 (sync --alter 아님: 신규 테이블만 create).
      await ProcessedOp.sync();
      console.log('[migrate-processed-ops] processed_ops 생성 완료');
    }
    process.exit(0);
  } catch (e) {
    console.error('[migrate-processed-ops] ERROR', e.message);
    process.exit(1);
  }
})();
