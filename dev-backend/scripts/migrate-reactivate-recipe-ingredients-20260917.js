/**
 * 살아있는 레시피가 쓰는데 꺼져 있는 재료·재고아이템을 다시 켠다 (2026-09-17 Fable 판정 ①)
 *
 * 무엇이 문제였나 (운영 실측)
 *   활성 레시피 21줄이 꺼진 재료 4건(Rice Cake · Sunflower & Canola Oil · Rice Carlos · Cooking Oil)을 쓴다.
 *   **원가는 정상 계산되고 있었다**(Tteokbokki 총 4.22 에 떡 1.82 포함) — 「원가·차감이 0」은 인스펙션 주석이지
 *   코드 실측이 아니다(차감·원가 어디에도 is_active 필터가 없다).
 *   실제 피해는 **목록·발주 카탈로그·저재고에서 사라져 «못 사고 안 보이는» 것**이다:
 *   4건 전부 활성 0 → 발주 화면에 안 뜸 · 재고 0 · 미해결 저재고 경보 3건.
 *
 * 왜 이렇게 됐나
 *   `services/stockItemMirror.js` 의 MIRRORED_FIELDS 에 `is_active` 가 있어 **Stock Item 을 끄면 거울도 꺼진다.**
 *   그런데 그 PUT 에는 «레시피가 쓰는 중인가» 가드가 없었다(가드는 삭제·단위 변경에만 있었다).
 *   이 스크립트는 그 구멍이 만든 데이터를 되돌리고, 구멍 자체는 라우트 가드로 막는다(같은 라운드).
 *
 * 규칙
 *   - id 를 박지 않는다. **조건으로 찾는다** — 활성 레시피 줄이 가리키는 `ingredients.is_active=0` 행과
 *     그 `source_product_ingredient_id` 원본.
 *   - 원본이 살아 있는데 거울만 꺼졌으면 **거울만** 켠다.
 *   - 원본 행이 **없어진** 거울은 손대지 않고 보고한다(ING-UNI-003 영역).
 *
 * 사용
 *   node scripts/migrate-reactivate-recipe-ingredients-20260917.js
 *   node scripts/migrate-reactivate-recipe-ingredients-20260917.js --apply
 *   node scripts/migrate-reactivate-recipe-ingredients-20260917.js --undo backups/reactivate-*.json
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
// --rehearse: 실제로 쓰고 **커밋하지 않고 되돌린다**. 운영에 손대기 전 «정말 이 행들만 바뀌는가» 를
//   같은 코드로 확인하는 용도. 드라이런이 못 잡는 것(제약·트리거·FK)을 여기서 잡는다.
const REHEARSE = process.argv.includes('--rehearse');
const APPLY = process.argv.includes('--apply') || REHEARSE;
const UNDO = arg('undo', null);
const q = (sql, r) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r });
const SNAP_DIR = path.join(__dirname, '..', 'backups');

function writeSnapshot(payload) {
  if (!fs.existsSync(SNAP_DIR)) fs.mkdirSync(SNAP_DIR, { recursive: true });
  const f = path.join(SNAP_DIR, `reactivate-recipe-ingredients-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
  fs.writeFileSync(f, JSON.stringify(payload, null, 2));
  console.log(`\n💾 스냅샷 ${f}`);
  return f;
}

async function main() {
  // 살아있는 레시피 줄이 가리키는 꺼진 재료
  const targets = await q(`
    SELECT DISTINCT i.id, i.name, i.owner_type, i.restaurant_id, i.brand_id,
           i.source_product_ingredient_id spi,
           p.id p_id, p.name p_name, p.is_active p_active
      FROM recipe_ingredients ri
      JOIN recipes r ON r.id = ri.recipe_id AND r.is_active = 1
      JOIN ingredients i ON i.id = ri.ingredient_id AND i.is_active = 0
      LEFT JOIN product_ingredients p ON p.id = i.source_product_ingredient_id
     ORDER BY i.id`);

  if (!targets.length) {
    console.log('✓ 살아있는 레시피가 쓰는 꺼진 재료가 없습니다. 할 일 없음.');
    return;
  }

  const lineCounts = {};
  for (const t of targets) {
    const [c] = await q(`
      SELECT COUNT(*) c FROM recipe_ingredients ri
        JOIN recipes r ON r.id = ri.recipe_id AND r.is_active = 1
       WHERE ri.ingredient_id = :id`, { id: t.id });
    lineCounts[t.id] = Number(c.c);
  }

  // 원본이 사라진 거울은 손대지 않는다
  const orphanMirrors = targets.filter(t => t.spi && !t.p_id);
  const actionable = targets.filter(t => !(t.spi && !t.p_id));

  console.log(`살아있는 레시피가 쓰는 꺼진 재료 ${targets.length}건`);
  for (const t of actionable) {
    const src = t.p_id
      ? `재고아이템#${t.p_id} ${t.p_name}(활성${t.p_active})`
      : '원본 없음(거울 아님)';
    console.log(`  재료#${t.id} ${String(t.name).trim()} ← ${src} · 쓰는 레시피 줄 ${lineCounts[t.id]}개`);
  }
  if (orphanMirrors.length) {
    console.log(`\n⚠ 원본 재고아이템이 사라진 거울 ${orphanMirrors.length}건 — 손대지 않습니다(출처 규칙 영역):`);
    for (const t of orphanMirrors) console.log(`    재료#${t.id} ${String(t.name).trim()} (출처 id ${t.spi})`);
  }

  const ingIds = actionable.map(t => t.id);
  const piIds = [...new Set(actionable.filter(t => t.p_id && !t.p_active).map(t => t.p_id))];
  console.log(`\n켤 것 — 재료 ${ingIds.length}건 · 재고아이템 ${piIds.length}건`);

  if (!APPLY) {
    console.log('\n(드라이런 — --apply 를 붙여야 실제로 켜집니다. 스냅샷 파일도 만들지 않았습니다.)');
    return;
  }

  if (!REHEARSE) writeSnapshot({
    kind: 'reactivate', at: new Date().toISOString(),
    ingredients: actionable.map(t => ({ id: t.id, name: t.name, was_active: 0 })),
    product_ingredients: piIds.map(id => ({ id, was_active: 0 })),
    untouched_orphan_mirrors: orphanMirrors.map(t => ({ id: t.id, name: t.name, spi: t.spi }))
  });

  const t = await sequelize.transaction();
  try {
    // 원본을 먼저 켠다 — 거울 동기화가 원본을 따라가므로 순서가 이 방향이어야 한다.
    if (piIds.length) {
      await sequelize.query(`UPDATE product_ingredients SET is_active = 1 WHERE id IN (:ids)`,
        { replacements: { ids: piIds }, transaction: t });
    }
    if (ingIds.length) {
      await sequelize.query(`UPDATE ingredients SET is_active = 1 WHERE id IN (:ids)`,
        { replacements: { ids: ingIds }, transaction: t });
    }
    if (REHEARSE) {
      await t.rollback();
      console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.');
    } else {
      await t.commit();
    }
  } catch (e) { await t.rollback(); throw e; }

  console.log(`\n✓ 재고아이템 ${piIds.length}건 · 재료 ${ingIds.length}건 다시 활성`);
}

async function undo(file) {
  const snap = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const t = await sequelize.transaction();
  try {
    if (snap.ingredients?.length) {
      await sequelize.query(`UPDATE ingredients SET is_active = 0 WHERE id IN (:ids)`,
        { replacements: { ids: snap.ingredients.map(x => x.id) }, transaction: t });
    }
    if (snap.product_ingredients?.length) {
      await sequelize.query(`UPDATE product_ingredients SET is_active = 0 WHERE id IN (:ids)`,
        { replacements: { ids: snap.product_ingredients.map(x => x.id) }, transaction: t });
    }
    if (REHEARSE) {
      await t.rollback();
      console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.');
    } else {
      await t.commit();
    }
  } catch (e) { await t.rollback(); throw e; }
  console.log(`되돌림: 재료 ${snap.ingredients?.length || 0}건 · 재고아이템 ${snap.product_ingredients?.length || 0}건 다시 비활성`);
}

(async () => {
  if (UNDO) await undo(UNDO); else await main();
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
