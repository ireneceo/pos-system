/**
 * code_sequences — 코드 채번을 **원자 카운터**로 옮긴다 (2026-09-06).
 *
 * ## 왜
 * Irene: "코드는 지금 채우지 말고 체계만 잡아서 앞으로 제대로 되게만 해."
 * 지금 채번은 전부 `count + 1` 이다(`utils/codeGenerator.js :32`, `routes/brand-products.js :95`,
 * `routes/product-ingredients.js :369/:472/:832`). 행을 지우고 새로 만들면 **이미 쓰인 번호가 다시
 * 나온다** — 운영에 중복 코드 16쌍이 실재한다(메모리 reference_count_based_code_numbering).
 * 동시에 두 명이 등록하면 같은 번호가 나올 수도 있다.
 *
 * ## 무엇
 * `(scope_type, scope_id, prefix)` 마다 마지막 번호를 들고 있는 표 하나.
 * 발급은 MySQL 한 문장으로 원자적으로 올린다(`utils/codeGenerator.js` 의 `nextSeq`).
 * ⛔ **기존 행의 빈 코드를 채우지 않는다** — Irene 지시가 "지금 채우지 말고"다. 이 마이그는
 *   표만 만든다. 씨앗(기존 최대 번호)은 그 범위에서 **처음 발급할 때** 유틸이 넣는다.
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

async function main() {
  try {
    const [exists] = await sequelize.query(
      `SELECT COUNT(*) n FROM information_schema.TABLES
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'code_sequences'`,
      { type: QueryTypes.SELECT });

    if (Number(exists.n) === 0) {
      await sequelize.query(`
        CREATE TABLE code_sequences (
          id INT AUTO_INCREMENT PRIMARY KEY,
          scope_type VARCHAR(64) NOT NULL,
          scope_id INT NOT NULL DEFAULT 0,
          prefix VARCHAR(16) NOT NULL,
          last_no INT NOT NULL DEFAULT 0,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY uk_code_seq (scope_type, scope_id, prefix)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
      console.log('✅ code_sequences 생성');
    } else {
      console.log('➖ code_sequences 이미 있음 (멱등)');
    }

    // 멱등 ALTER — 먼저 만든 dev 표는 VARCHAR(32) 라 `restaurant:IngredientCategory`(29) 처럼
    //   모델 이름 하나만 길어져도 넘친다. 64 미만이면 늘린다.
    const [col] = await sequelize.query(
      `SELECT CHARACTER_MAXIMUM_LENGTH len FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'code_sequences' AND COLUMN_NAME = 'scope_type'`,
      { type: QueryTypes.SELECT });
    if (col && Number(col.len) < 64) {
      await sequelize.query('ALTER TABLE code_sequences MODIFY scope_type VARCHAR(64) NOT NULL');
      console.log(`✅ scope_type ${col.len} → 64 확장`);
    }

    const [c] = await sequelize.query('SELECT COUNT(*) n FROM code_sequences', { type: QueryTypes.SELECT });
    console.log(`현재 범위 ${c.n}개 — 씨앗은 각 범위 첫 발급 때 채워진다(기존 행은 건드리지 않는다).`);
    process.exit(0);
  } catch (e) {
    console.error('❌ 실패:', e.message);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = {};
