/**
 * 브랜드·푸드코트 판매자에 «배송 가능 지역 안내» 칸 추가 (2026-09-28 Fable 판정 2회차 R7)
 *
 * 공급업체(supplier_companies.delivery_policy)에는 이미 있는 칸을 **같은 이름·같은 뜻**으로
 * 브랜드·푸드코트에도 둔다 — 판매자 종류마다 다른 개념을 만들지 않는다.
 * 보여주기만 한다(발주 담기 화면 한 줄). 계산·매칭에는 쓰지 않는다.
 *
 * 성질: 칸 추가만. 기존 데이터 변경 0 · 백필 0 · ENUM 무관 · NULL 허용. 멱등(있으면 skip).
 *       되돌리기는 칸을 남긴 채 옛 코드로 복원하면 된다(옛 코드는 이 칸을 읽지 않는다).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const TABLES = ['brands', 'foodcourts'];
const DDL = 'TEXT NULL COMMENT "배송 메모 (배송 요일·지역 등 자유 텍스트) — 계산에는 쓰지 않는다"';

async function main() {
  let added = 0;
  for (const t of TABLES) {
    const rows = await sequelize.query(
      `SELECT COLUMN_NAME FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :t AND COLUMN_NAME = 'delivery_policy'`,
      { type: QueryTypes.SELECT, replacements: { t } }
    );
    if (rows.length) { console.log(`[seller-delivery-policy] ${t}.delivery_policy 이미 존재 — skip`); continue; }
    await sequelize.query(`ALTER TABLE \`${t}\` ADD COLUMN \`delivery_policy\` ${DDL}`);
    console.log(`[seller-delivery-policy] ${t}.delivery_policy 추가`);
    added += 1;
  }
  console.log(`[seller-delivery-policy] 완료 — 추가 ${added}건 (데이터 변경 없음)`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[seller-delivery-policy] 실패:', e.message); process.exit(1); });
