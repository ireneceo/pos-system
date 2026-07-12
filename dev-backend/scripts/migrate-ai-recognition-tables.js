/**
 * migrate-ai-recognition-tables — AI 음식인식 테이블 2개 생성 (멱등)
 *
 * 왜 필요한가: 배포의 `sync-database.js` 는 **--alter 없이** 돌아(과거 --alter 컬럼 드롭 사고),
 * 모델만 로드하고 스키마는 건드리지 않는다. 즉 **신규 테이블은 배포로 절대 생성되지 않는다**.
 * 그래서 menu_reference_photos / recognition_logs 가 운영에 없는 채로 남아 있었고
 * (배포 로그가 매번 "New tables (need sync)" 경고만 냈다), AI 인식 라우트는 운영에서
 * 테이블 부재로 실패할 수밖에 없었다. 신규 테이블은 이렇게 마이그로 명시 생성한다.
 *
 * 안전성: 추가형(CREATE TABLE IF NOT EXISTS). 기존 테이블/컬럼 변경 0. 재실행 안전.
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const MODELS = [
  { name: 'MenuReferencePhoto', table: 'menu_reference_photos', model: require('../models/MenuReferencePhoto') },
  { name: 'RecognitionLog', table: 'recognition_logs', model: require('../models/RecognitionLog') }
];

(async () => {
  try {
    await sequelize.authenticate();
    let created = 0;

    for (const { name, table, model } of MODELS) {
      const [rows] = await sequelize.query(
        `SELECT COUNT(*) AS c FROM information_schema.tables
         WHERE table_schema = DATABASE() AND table_name = '${table}'`
      );
      const exists = Number(rows[0].c) > 0;

      if (exists) {
        console.log(`✓ ${table} already exists — skipping`);
        continue;
      }
      // alter 없이 생성만 (기존 테이블 무접촉)
      await model.sync();
      console.log(`✓ ${table} created (${name})`);
      created += 1;
    }

    console.log(`Migration complete — ${created} table(s) created, ${MODELS.length - created} already present.`);
    process.exit(0);
  } catch (err) {
    console.error('✗ migrate-ai-recognition-tables failed:', err.message);
    process.exit(1);
  }
})();
