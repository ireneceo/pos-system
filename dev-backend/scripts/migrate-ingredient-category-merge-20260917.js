/**
 * 재료 카테고리 두 벌 합치기 (2026-09-17 Fable 판정 ⑧) — 매장 소유 한 벌이 정본.
 *
 * 왜
 *   매장 재료 화면에 «매장 카테고리» 와 «Brand Categories (Read Only)» 두 벌이 나오고 이름이 겹친다.
 *   브랜드 소유 벌은 2026-07-05 프로덕트→재료 미러가 만든 잔재이고, 그 미러 경로는 09-04 에 잠겼다
 *   (지금 살아 있는 생성 경로 0개). 브랜드 쪽 «진짜» 분류는 product_ingredient_categories 에 따로 있다.
 *
 * 무엇을
 *   A(기본)  브랜드 소유 카테고리를 가리키는 재료를 **같은 이름의 매장 카테고리**로 옮기고,
 *            참조가 0 이 된 브랜드 카테고리를 **비활성**(삭제 아님 — 되돌릴 수 있게)한다.
 *   B(--classify)  매장 «Uncategorized» + 카테고리 없는 재료에 분류표로 **제안**만 낸다.
 *                  승인분만 `--apply --only <id,id,...>` 로 들어간다. 안 걸리는 것은 'Other' 로
 *                  밀지 않고 그대로 둔다(사람 몫).
 *
 * 안전장치 (하나라도 걸리면 **아무것도 쓰지 않고 중단**)
 *   1) 브랜드 활성 카테고리마다 같은 이름(공백·대소문자 무시)의 매장 카테고리가 있어야 한다.
 *   2) **살아있는 참조만 막는다** (2026-09-17 Fable 판정 ⑧-2):
 *      다른 매장 소유 행(활성 무관) 또는 살아있는 브랜드 소유 행이 1건이라도 있으면 중단.
 *      비활성 브랜드 잔재(2026-07-05 미러가 남긴 것)는 **손대지 않고 기록만** 하고 넘어간다.
 *
 * 사용
 *   node scripts/migrate-ingredient-category-merge-20260917.js --restaurant 10 --brand 1
 *   node scripts/migrate-ingredient-category-merge-20260917.js --restaurant 10 --brand 1 --apply
 *   node scripts/migrate-ingredient-category-merge-20260917.js --restaurant 10 --classify
 *   node scripts/migrate-ingredient-category-merge-20260917.js --restaurant 10 --classify --apply --only 12,15,19
 *   node scripts/migrate-ingredient-category-merge-20260917.js --undo backups/ingredient-category-merge-*.json
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { classify } = require('./withmin-import/categorize-and-cleanup');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const APPLY = process.argv.includes('--apply');
const CLASSIFY = process.argv.includes('--classify');
const UNDO = arg('undo', null);
const REST = parseInt(arg('restaurant'), 10);
const BRAND = parseInt(arg('brand'), 10);
const ONLY = (arg('only', '') || '').split(',').map(s => parseInt(s, 10)).filter(Number.isFinite);

const q = (sql, replacements) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements });
const norm = (s) => String(s || '').trim().toLowerCase();
const SNAP_DIR = path.join(__dirname, '..', 'backups');

function die(msg) {
  console.error(`\n⛔ 중단 — ${msg}`);
  console.error('   아무것도 쓰지 않았습니다.');
  process.exit(2);
}

/** 되돌리기용 스냅샷 — --apply 없이는 파일도 만들지 않는다. */
function writeSnapshot(kind, payload) {
  if (!fs.existsSync(SNAP_DIR)) fs.mkdirSync(SNAP_DIR, { recursive: true });
  const f = path.join(SNAP_DIR, `ingredient-category-${kind}-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
  fs.writeFileSync(f, JSON.stringify(payload, null, 2));
  console.log(`\n💾 스냅샷 ${f}`);
  return f;
}

/** A — 브랜드 벌을 매장 벌로 합친다 */
async function merge() {
  if (!Number.isFinite(REST) || !Number.isFinite(BRAND)) die('--restaurant 와 --brand 가 필요합니다');

  const brandCats = await q(
    `SELECT id, name FROM ingredient_categories
      WHERE owner_type = 'brand' AND brand_id = :b AND is_active = 1 ORDER BY name`, { b: BRAND });
  const restCats = await q(
    `SELECT id, name FROM ingredient_categories
      WHERE owner_type = 'restaurant' AND restaurant_id = :r AND is_active = 1 ORDER BY name`, { r: REST });

  console.log(`브랜드 ${BRAND} 활성 카테고리 ${brandCats.length}개 · 매장 ${REST} 활성 카테고리 ${restCats.length}개`);
  if (brandCats.length === 0) {
    console.log('\n✓ 브랜드 소유 활성 카테고리가 없습니다 — 이미 한 목록입니다. 할 일 없음.');
    return { moved: [], deactivated: [] };
  }

  const byName = new Map(restCats.map(c => [norm(c.name), c]));

  // 안전장치 1 — 짝 없는 브랜드 카테고리
  const orphans = brandCats.filter(c => !byName.has(norm(c.name)));
  if (orphans.length) {
    die(`매장에 같은 이름이 없는 브랜드 카테고리 ${orphans.length}개: `
      + orphans.map(o => `#${o.id} ${o.name}`).join(', '));
  }

  const brandCatIds = brandCats.map(c => c.id);
  // 안전장치 2 — **살아있는 참조만 막는다** (2026-09-17 Fable 판정 ⑧-2)
  //   (a) 다른 매장 소유 행: **활성 여부와 무관하게** 중단 — 남의 매장 분류 결정을 대신 내리지 않는다.
  //   (b) 살아있는 브랜드 소유 행: 중단 — 실제로 쓰이는 분류를 끄면 안 된다.
  //   (c) **비활성** 브랜드 소유 행: 통과. 2026-07-05 프로덕트→재료 미러(09-04 폐기)가 남긴 잔재로,
  //       되살리는 경로가 출처 id 로만 매치돼 이 행들엔 영원히 안 걸리고(services/stockItemMirror.js),
  //       목록·인스펙션이 전부 is_active=1 로 걸러 어디에도 안 보인다. 손대지 않고 **기록만** 남긴다.
  const foreignStore = await q(
    `SELECT id, name, restaurant_id, is_active FROM ingredients
      WHERE ingredient_category_id IN (:ids) AND restaurant_id IS NOT NULL AND restaurant_id <> :r`,
    { ids: brandCatIds, r: REST });
  if (foreignStore.length) {
    die(`이 브랜드 카테고리를 쓰는 **다른 매장 재료** ${foreignStore.length}건: `
      + foreignStore.slice(0, 10).map(f => `#${f.id}(${f.name}, 매장 ${f.restaurant_id})`).join(', '));
  }

  const liveBrandRefs = await q(
    `SELECT id, name FROM ingredients
      WHERE ingredient_category_id IN (:ids) AND restaurant_id IS NULL AND is_active = 1`,
    { ids: brandCatIds });
  if (liveBrandRefs.length) {
    die(`이 브랜드 카테고리를 쓰는 **살아있는 브랜드 소유 재료** ${liveBrandRefs.length}건: `
      + liveBrandRefs.slice(0, 10).map(f => `#${f.id}(${f.name})`).join(', '));
  }

  // (c) 넘어가는 잔재 — 전량 출력하고 스냅샷에 남긴다(조용히 지나가지 않게).
  const leftInactive = await q(
    `SELECT id, name, ingredient_category_id FROM ingredients
      WHERE ingredient_category_id IN (:ids) AND restaurant_id IS NULL AND is_active = 0`,
    { ids: brandCatIds });
  if (leftInactive.length) {
    console.log(`\n· 손대지 않고 넘어가는 비활성 브랜드 잔재 ${leftInactive.length}건 (2026-07-05 미러 잔재):`);
    for (const x of leftInactive) console.log(`    #${x.id} ${x.name}`);
  }

  const targets = await q(
    `SELECT i.id, i.name, i.ingredient_category_id FROM ingredients i
      WHERE i.ingredient_category_id IN (:ids) AND i.restaurant_id = :r`,
    { ids: brandCatIds, r: REST });

  const catById = new Map(brandCats.map(c => [c.id, c]));
  const moves = targets.map(t => {
    const from = catById.get(t.ingredient_category_id);
    const to = byName.get(norm(from.name));
    return { ingredient_id: t.id, name: t.name, from_category_id: from.id, to_category_id: to.id, category_name: from.name };
  });

  console.log(`\n옮길 재료 ${moves.length}건`);
  for (const m of moves.slice(0, 40)) {
    console.log(`  #${m.ingredient_id} ${m.name}  [${m.category_name}] ${m.from_category_id} → ${m.to_category_id}`);
  }
  if (moves.length > 40) console.log(`  ... 그 외 ${moves.length - 40}건`);
  console.log(`\n비활성으로 바꿀 브랜드 카테고리 ${brandCats.length}개: ` + brandCats.map(c => `#${c.id} ${c.name}`).join(', '));

  if (!APPLY) {
    console.log('\n(드라이런 — --apply 를 붙여야 실제로 바뀝니다. 스냅샷 파일도 만들지 않았습니다.)');
    return { moved: moves, deactivated: brandCats, dry: true };
  }

  const snapshot = {
    kind: 'merge', restaurant_id: REST, brand_id: BRAND, at: new Date().toISOString(),
    moves, deactivated: brandCats,
    // 손대지 않은 비활성 브랜드 잔재 — undo 대상이 아니다(건드린 적이 없으므로). 기록용.
    left_inactive_brand_refs: leftInactive
  };
  writeSnapshot('merge', snapshot);

  const t = await sequelize.transaction();
  try {
    for (const m of moves) {
      await sequelize.query(
        `UPDATE ingredients SET ingredient_category_id = :to WHERE id = :id`,
        { replacements: { to: m.to_category_id, id: m.ingredient_id }, transaction: t });
    }
    await sequelize.query(
      `UPDATE ingredient_categories SET is_active = 0 WHERE id IN (:ids)`,
      { replacements: { ids: brandCatIds }, transaction: t });
    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
  }
  console.log(`\n✓ 재료 ${moves.length}건 이동 · 브랜드 카테고리 ${brandCatIds.length}개 비활성`);
  return { moved: moves, deactivated: brandCats };
}

/** B — 미분류 재료에 분류 제안 */
async function classifyUncategorized() {
  if (!Number.isFinite(REST)) die('--restaurant 가 필요합니다');

  const rows = await q(
    `SELECT i.id, i.name, i.ingredient_category_id, c.name category_name
       FROM ingredients i
       LEFT JOIN ingredient_categories c ON c.id = i.ingredient_category_id
      WHERE i.restaurant_id = :r AND i.is_active = 1
        AND (i.ingredient_category_id IS NULL OR LOWER(c.name) = 'uncategorized')
      ORDER BY i.name`, { r: REST });

  const cats = await q(
    `SELECT id, name FROM ingredient_categories
      WHERE owner_type = 'restaurant' AND restaurant_id = :r AND is_active = 1`, { r: REST });
  const byName = new Map(cats.map(c => [norm(c.name), c]));

  const proposals = [];
  const unmatched = [];
  for (const r of rows) {
    const guess = classify(r.name);
    // 분류표에 안 걸린 것('Other')·매장에 그 카테고리가 없는 것은 **손대지 않는다**.
    const target = guess === 'Other' ? null : byName.get(norm(guess));
    if (target) proposals.push({ ingredient_id: r.id, name: r.name, to_category_id: target.id, to_category: target.name });
    else unmatched.push({ ingredient_id: r.id, name: r.name, guess });
  }

  console.log(`미분류 대상 ${rows.length}건 → 제안 ${proposals.length}건 · 그대로 둘 것 ${unmatched.length}건`
    + ` (매칭률 ${rows.length ? Math.round(proposals.length / rows.length * 100) : 0}%)`);
  console.log('\n재료id  이름                                     제안 카테고리');
  for (const p of proposals) {
    console.log(`  ${String(p.ingredient_id).padEnd(6)}${String(p.name).slice(0, 40).padEnd(42)}${p.to_category}`);
  }
  if (unmatched.length) {
    console.log('\n분류표에 안 걸림 (그대로 둠 — Other 로 밀지 않습니다):');
    for (const u of unmatched.slice(0, 30)) console.log(`  ${String(u.ingredient_id).padEnd(6)}${u.name}`);
    if (unmatched.length > 30) console.log(`  ... 그 외 ${unmatched.length - 30}건`);
  }

  if (!APPLY) {
    console.log('\n(드라이런 — 승인한 것만 넣으려면: --classify --apply --only 12,15,19)');
    return { proposals, unmatched, dry: true };
  }
  const picked = ONLY.length ? proposals.filter(p => ONLY.includes(p.ingredient_id)) : proposals;
  if (!picked.length) die('--only 로 고른 항목이 제안 목록에 없습니다');

  const before = await q(
    `SELECT id, ingredient_category_id FROM ingredients WHERE id IN (:ids)`,
    { ids: picked.map(p => p.ingredient_id) });
  writeSnapshot('classify', { kind: 'classify', restaurant_id: REST, at: new Date().toISOString(), before, picked });

  const t = await sequelize.transaction();
  try {
    for (const p of picked) {
      await sequelize.query(`UPDATE ingredients SET ingredient_category_id = :c WHERE id = :id`,
        { replacements: { c: p.to_category_id, id: p.ingredient_id }, transaction: t });
    }
    await t.commit();
  } catch (e) { await t.rollback(); throw e; }
  console.log(`\n✓ ${picked.length}건 분류 적용 (남은 미분류 ${rows.length - picked.length}건)`);
  return { picked };
}

/** 되돌리기 */
async function undo(file) {
  const snap = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const t = await sequelize.transaction();
  try {
    if (snap.kind === 'merge') {
      for (const m of snap.moves) {
        await sequelize.query(`UPDATE ingredients SET ingredient_category_id = :c WHERE id = :id`,
          { replacements: { c: m.from_category_id, id: m.ingredient_id }, transaction: t });
      }
      if (snap.deactivated.length) {
        await sequelize.query(`UPDATE ingredient_categories SET is_active = 1 WHERE id IN (:ids)`,
          { replacements: { ids: snap.deactivated.map(c => c.id) }, transaction: t });
      }
      console.log(`되돌림: 재료 ${snap.moves.length}건 · 카테고리 ${snap.deactivated.length}개 다시 활성`);
    } else if (snap.kind === 'classify') {
      for (const b of snap.before) {
        await sequelize.query(`UPDATE ingredients SET ingredient_category_id = :c WHERE id = :id`,
          { replacements: { c: b.ingredient_category_id, id: b.id }, transaction: t });
      }
      console.log(`되돌림: 재료 ${snap.before.length}건`);
    } else {
      throw new Error('알 수 없는 스냅샷 종류: ' + snap.kind);
    }
    await t.commit();
  } catch (e) { await t.rollback(); throw e; }
}

(async () => {
  if (UNDO) await undo(UNDO);
  else if (CLASSIFY) await classifyUncategorized();
  else await merge();
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
