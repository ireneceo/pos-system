/**
 * deploy_records 테이블 — 배포 회차별 개발 현황 기록.
 * 멱등: 이미 있으면 아무것도 하지 않는다. 레지스트리 분류 `deploy`(매 배포 재실행).
 */
const { sequelize } = require('../config/database');

(async () => {
  try {
    const [rows] = await sequelize.query("SHOW TABLES LIKE 'deploy_records'");
    if (rows.length) {
      console.log('deploy_records 이미 존재 — 건너뜀');
      await sequelize.close();
      process.exit(0);          // ⚠ 배포 마이그는 반드시 명시 종료(메모리: 안 끝나면 배포가 멈춘다)
    }
    await sequelize.query(`
      CREATE TABLE deploy_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tag VARCHAR(120) NOT NULL UNIQUE,
        deployed_at DATETIME NOT NULL,
        git_commit VARCHAR(60) NULL,
        sw_version VARCHAR(60) NULL,
        public_release VARCHAR(20) NULL,
        sections JSON NOT NULL,
        fable_note TEXT NULL,
        deployed_by VARCHAR(60) NULL,
        created_at DATETIME NOT NULL,
        updated_at DATETIME NOT NULL,
        INDEX idx_deploy_records_deployed_at (deployed_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✓ deploy_records 생성');
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error('ERR', e.message);
    await sequelize.close().catch(() => {});
    process.exit(1);
  }
})();
