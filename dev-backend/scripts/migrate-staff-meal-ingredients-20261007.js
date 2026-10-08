/**
 * 매장 10(with MIN Cafe) 직원식 재료를 «Staff Meal» 분류로 옮긴다 — 일회성 (2026-10-07 Fable 판정 ⑪ B5)
 *
 * 왜: 직원식 전용 재료 12개 중 4개만 «Staff Meal» 분류에 있고 8개는 다른 분류에 흩어져 보고서로 못 묶는다.
 * 무엇: 재료 이름에 «직원식 / staff» 가 들어 있고, 지금 분류가 직원식 분류가 아닌 재료의 분류(FK)만 바꾼다.
 *       레시피·재고·발주 줄·재료 이름 무접촉. 대상 분류 = 그 매장의 is_staff_meal=1 분류(정확히 1개여야 함).
 * ⚠ 이름은 «후보를 찾는 데만» 쓴다 — 실제 적용은 Irene 이 표를 보고 승인한 뒤(--apply). 코드 판정은 분류 칸뿐이다.
 *
 * 사용:
 *   node scripts/migrate-staff-meal-ingredients-20261007.js                  # 드라이런(표만)
 *   node scripts/migrate-staff-meal-ingredients-20261007.js --apply          # 적용(전 스냅샷 JSON 저장)
 *   node scripts/migrate-staff-meal-ingredients-20261007.js --undo=<스냅샷> --apply   # 되돌리기
 *   --restaurant=<id> 로 다른 매장(기본 10)
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');
const undoArg = args.find(a => a.startsWith('--undo='));
const RID = parseInt((args.find(a => a.startsWith('--restaurant=')) || '--restaurant=10').split('=')[1], 10);
const q = (sql, replacements) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements });

async function undo(file) {
  const snap = JSON.parse(fs.readFileSync(file, 'utf8'));
  console.log(`[staff-meal-ingredients] 되돌리기 ${snap.rows.length}건 (${file})${APPLY ? '' : ' — 드라이런'}`);
  for (const r of snap.rows) console.log(`  #${r.id} ${r.name}  → 분류 #${r.from_category_id}`);
  if (!APPLY) return;
  await sequelize.transaction(async (t) => {
    for (const r of snap.rows) {
      const [, meta] = await sequelize.query('UPDATE ingredients SET ingredient_category_id = :c WHERE id = :id AND restaurant_id = :rid AND ingredient_category_id = :to',
        { replacements: { c: r.from_category_id, id: r.id, rid: snap.restaurant_id, to: r.to_category_id }, transaction: t });
      const n = meta && meta.affectedRows !== undefined ? meta.affectedRows : meta;
      if (n !== 1) throw new Error(`#${r.id} 되돌리기 영향 ${n}행 — 그 뒤 바뀐 것이 있다. 중단(롤백)`);
    }
  });
  console.log('[staff-meal-ingredients] 되돌리기 완료');
}

async function main() {
  if (undoArg) return undo(undoArg.split('=')[1]);
  const targets = await q("SELECT id, name FROM ingredient_categories WHERE owner_type='restaurant' AND restaurant_id = :rid AND is_staff_meal = 1", { rid: RID });
  if (targets.length !== 1) {
    console.log(`[staff-meal-ingredients] 매장 ${RID} 의 직원식 분류가 ${targets.length}개 — 정확히 1개여야 합니다. 중단.`);
    return;
  }
  const to = targets[0];
  const rows = await q(
    `SELECT i.id, i.name, i.ingredient_category_id from_category_id, ic.name from_category_name
       FROM ingredients i LEFT JOIN ingredient_categories ic ON ic.id = i.ingredient_category_id
      WHERE i.restaurant_id = :rid
        AND (i.name LIKE '%직원식%' OR LOWER(i.name) LIKE '%staff%')
        AND (i.ingredient_category_id IS NULL OR i.ingredient_category_id <> :to)
      ORDER BY i.id`, { rid: RID, to: to.id });
  console.log(`[staff-meal-ingredients] 매장 ${RID} · 옮길 곳 #${to.id} «${to.name}» · 대상 ${rows.length}건${APPLY ? '' : ' — 드라이런(--apply 로 적용)'}`);
  for (const r of rows) console.log(`  #${r.id}  ${r.name}  |  ${r.from_category_name || '(분류 없음)'}(#${r.from_category_id ?? '-'}) → ${to.name}(#${to.id})`);
  if (!APPLY || !rows.length) return;

  const dir = path.join(__dirname, '../../backups/data-migrations');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `staff-meal-ingredients-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
  fs.writeFileSync(file, JSON.stringify({ restaurant_id: RID, rows: rows.map(r => ({ ...r, to_category_id: to.id })) }, null, 2));
  await sequelize.transaction(async (t) => {
    const [, meta] = await sequelize.query('UPDATE ingredients SET ingredient_category_id = :to WHERE id IN (:ids) AND restaurant_id = :rid',
      { replacements: { to: to.id, ids: rows.map(r => r.id), rid: RID }, transaction: t });
    const n = meta && meta.affectedRows !== undefined ? meta.affectedRows : meta;
    if (n !== rows.length) throw new Error(`영향 ${n}행 ≠ 대상 ${rows.length} — 롤백`);
  });
  console.log(`[staff-meal-ingredients] 적용 ${rows.length}건 · 되돌리기: --undo=${file} --apply`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error('[staff-meal-ingredients] 실패:', e.message); process.exit(1); });
