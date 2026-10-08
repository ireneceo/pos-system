/**
 * 재료 분류에 «직원식(비용)» 표시 칸 추가 + 이미 있는 직원식 분류 켜기 (2026-10-07 Fable 판정 ⑪ · docs/TRADE_STRUCTURE.md ⑪)
 *
 * ① ingredient_categories.is_staff_meal TINYINT(1) NOT NULL DEFAULT 0 — 없을 때만 추가
 * ② 매장 소유 분류 중 이름이 «Staff Meal(s) / 직원식 / 스탭밀 / 스텝밀»(공백·대소문자 무시)이고 아직 꺼진 것 → 1
 *    (분류 이름으로만 판정한다 — 재료 이름은 보지 않는다. 재료 이름은 표시용이지 분류가 아니다.)
 *
 * 성질: 멱등(두 번째 실행 0건) · 재료·레시피·재고·발주 무접촉 · 되돌리기 = 칸을 남긴 채 옛 코드(옛 코드는 칸을 안 읽음).
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const NAMES = ['staffmeal', 'staffmeals', '직원식', '스탭밀', '스텝밀'];

async function main() {
  const cols = await sequelize.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ingredient_categories' AND COLUMN_NAME = 'is_staff_meal'`,
    { type: QueryTypes.SELECT }
  );
  if (!cols.length) {
    await sequelize.query("ALTER TABLE `ingredient_categories` ADD COLUMN `is_staff_meal` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '직원식(비용) 분류'");
    console.log('[staff-meal-category] ingredient_categories.is_staff_meal 추가');
  } else {
    console.log('[staff-meal-category] is_staff_meal 이미 존재 — 칸 추가 skip');
  }
  const rows = await sequelize.query(
    `SELECT id, restaurant_id, name FROM ingredient_categories
      WHERE owner_type = 'restaurant' AND is_staff_meal = 0
        AND LOWER(REPLACE(name, ' ', '')) IN (:names)`,
    { type: QueryTypes.SELECT, replacements: { names: NAMES } }
  );
  for (const r of rows) console.log(`[staff-meal-category] 켬: #${r.id} 매장 ${r.restaurant_id} «${r.name}»`);
  if (rows.length) {
    await sequelize.query('UPDATE ingredient_categories SET is_staff_meal = 1 WHERE id IN (:ids)', { replacements: { ids: rows.map(r => r.id) } });
  }
  console.log(`[staff-meal-category] 완료 — 켠 분류 ${rows.length}건`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[staff-meal-category] 실패:', e.message); process.exit(1); });
