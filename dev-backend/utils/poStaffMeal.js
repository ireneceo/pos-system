/**
 * 발주 줄 «직원식» 표시 — 칸 없이 파생 (2026-10-07 Fable 판정 ⑪ · docs/TRADE_STRUCTURE.md ⑪)
 *
 * 줄이 재료(ingredient_id) 줄이고 그 재료의 분류가 `ingredient_categories.is_staff_meal = 1` 이면 직원식.
 * 다른 대상(product / brand_product / product_ingredient) 줄은 늘 일반. 재료 이름으로 판정하지 않는다.
 * 목록·상세·보고서가 이 한 곳의 규칙을 쓴다(보고서는 같은 JOIN 을 SQL 로).
 */
const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;

/** items(plain 객체 배열)에 is_staff_meal 을 붙인다. 쿼리 1개. */
async function attachStaffMeal(items) {
  const list = Array.isArray(items) ? items : [];
  const ingIds = [...new Set(list.map((it) => Number(it.ingredient_id)).filter(Boolean))];
  let staffSet = new Set();
  if (ingIds.length) {
    const { sequelize } = require('../config/database');
    const rows = await sequelize.query(
      `SELECT i.id FROM ingredients i
         JOIN ingredient_categories ic ON ic.id = i.ingredient_category_id
        WHERE i.id IN (:ids) AND ic.is_staff_meal = 1`,
      { type: sequelize.QueryTypes.SELECT, replacements: { ids: ingIds } }
    );
    staffSet = new Set(rows.map((r) => Number(r.id)));
  }
  for (const it of list) it.is_staff_meal = !!(it.ingredient_id && staffSet.has(Number(it.ingredient_id)));
  return list;
}

/** 직원식 / 일반 합계 — 줄 line_total 합(응답 계산, 저장 안 함) */
function staffMealTotals(items) {
  let staff = 0; let regular = 0;
  for (const it of (items || [])) {
    const v = Number(it.line_total) || 0;
    if (it.is_staff_meal) staff += v; else regular += v;
  }
  return { staff_meal_total: round2(staff), regular_total: round2(regular) };
}

module.exports = { attachStaffMeal, staffMealTotals };
