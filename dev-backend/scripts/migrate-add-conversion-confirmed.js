/**
 * 「사람이 이 값을 확인했다」를 담을 칸 3개 추가 (2026-09-17 Fable 설계 판정 B6)
 *
 * 왜 필요한가
 *   `unit_conversion` 은 기본값이 1 이라, 사람이 「1 이 맞다」고 확인해도 「아직 안 정했다」와
 *   구분되지 않는다. 운영 273건 중 125건(차류)이 바로 그 경우다 — 업체는 piece 로 팔고 우리는
 *   pack 으로 세지만 실은 같은 물건이라 답이 1 이다. 값만으로는 그 1 을 인정할 방법이 없다.
 *
 * 왜 단위쌍까지 저장하는가
 *   나중에 카탈로그 정리로 판매자 단위가 piece → kg 로 바뀌면 「piece→pack 은 1」이라는 확인은
 *   더 이상 사실이 아니다. 쌍을 같이 적어 두지 않으면 확인 표시가 영원히 남아 검사기가 눈먼다.
 *   규칙(`utils/unitConversionRule.js`)은 **현재 쌍과 저장된 쌍이 같을 때만** 확인으로 인정한다.
 *
 * 성질: 칸 추가만. 기존 데이터 변경 0 · 백필 0 · ENUM 무관 · 전부 NULL 허용.
 *       되돌리기는 칸을 남긴 채 옛 코드로 복원하면 된다(옛 코드가 읽어도 무해).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TABLE = 'ingredient_seller_products';
const COLUMNS = [
  { name: 'conversion_confirmed_at', ddl: 'DATETIME NULL COMMENT "사람이 이 값을 확인·저장한 시각"' },
  { name: 'conversion_confirmed_by', ddl: 'INT NULL COMMENT "확인한 사용자 id"' },
  { name: 'conversion_confirmed_pair', ddl: 'VARCHAR(64) NULL COMMENT "확인 당시 단위쌍 (판매자단위>재고단위). 지금 쌍과 다르면 확인 무효"' }
];

async function main() {
  const existing = await sequelize.query(
    `SELECT COLUMN_NAME name FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t`,
    { type: QueryTypes.SELECT, replacements: { t: TABLE } }
  );
  const have = new Set(existing.map((r) => r.name));

  let added = 0;
  for (const col of COLUMNS) {
    if (have.has(col.name)) {
      console.log(`[conversion-confirmed] ${col.name} 이미 존재 — skip`);
      continue;
    }
    await sequelize.query(`ALTER TABLE \`${TABLE}\` ADD COLUMN \`${col.name}\` ${col.ddl}`);
    console.log(`[conversion-confirmed] ${col.name} 추가`);
    added += 1;
  }
  console.log(`[conversion-confirmed] 완료 — 추가 ${added}건 (데이터 변경 없음)`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[conversion-confirmed] 실패:', e.message); process.exit(1); });
