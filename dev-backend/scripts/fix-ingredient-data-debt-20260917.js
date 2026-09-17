/**
 * 운영 재료 데이터 부채 정리 (2026-09-17) — 드라이런 기본 · 스냅샷 · 되돌리기
 *
 * 무엇을 고치는가 (`--task` 로 하나씩)
 *   orphan   고아 셀러매핑 — 가리키는 대상이 아예 없거나(둘 다 NULL) 지워진 재료를 가리키는 활성 매핑을 **비활성**
 *   code     코드 중복 — 같은 소유 안에서 같은 코드를 쓰는 행 중 **나중에 만들어진 것**에 다음 빈 번호를 준다
 *
 * 왜 이렇게 나눴나
 *   두 부채는 «답이 데이터 안에 있는» 것이고, 재료 되살리기·단위환산은 규칙이 서야 해서 여기 없다.
 *   (그 둘은 Fable 판정 뒤 별도 처리 — 이 파일에 섞지 않는다.)
 *
 * 안전
 *   - 기본이 드라이런. `--apply` 없이는 **스냅샷 파일도 만들지 않는다.**
 *   - `--apply` 는 바꾸기 전 대상 행 전체를 JSON 으로 뜬다. `--undo <파일>` 로 그대로 되돌린다.
 *   - 한 트랜잭션. 중간 실패면 전부 롤백.
 *
 * 사용
 *   node scripts/fix-ingredient-data-debt-20260917.js --task orphan
 *   node scripts/fix-ingredient-data-debt-20260917.js --task orphan --apply
 *   node scripts/fix-ingredient-data-debt-20260917.js --task code
 *   node scripts/fix-ingredient-data-debt-20260917.js --task code --apply
 *   node scripts/fix-ingredient-data-debt-20260917.js --undo backups/ingredient-debt-orphan-*.json
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
// 채번은 **생성 라우트가 쓰는 그 함수**를 그대로 쓴다 — 손으로 번호를 만들면 규칙이 두 벌이 된다.
//   (2026-09-06 원자 카운터. 씨앗은 기존 최대값이라 새 번호는 안 겹친다.)
const { generateIngredientCode, generateCode } = require('../utils/codeGenerator');
const { Ingredient, ProductIngredient } = require('../models');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
// --rehearse: 실제로 쓰고 **커밋하지 않고 되돌린다**. 운영에 손대기 전 «정말 이 행들만 바뀌는가» 를
//   같은 코드로 확인하는 용도. 드라이런이 못 잡는 것(제약·트리거·FK)을 여기서 잡는다.
const REHEARSE = process.argv.includes('--rehearse');
const APPLY = process.argv.includes('--apply') || REHEARSE;
const TASK = arg('task', null);
const UNDO = arg('undo', null);

const q = (sql, replacements) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements });
const SNAP_DIR = path.join(__dirname, '..', 'backups');

function writeSnapshot(kind, payload) {
  if (!fs.existsSync(SNAP_DIR)) fs.mkdirSync(SNAP_DIR, { recursive: true });
  const f = path.join(SNAP_DIR, `ingredient-debt-${kind}-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
  fs.writeFileSync(f, JSON.stringify(payload, null, 2));
  console.log(`\n💾 스냅샷 ${f}`);
  return f;
}

/** 고아 셀러매핑 — 아무 대상도 못 가리키는 활성 매핑을 비활성 */
async function orphan() {
  // ⚠ 활성 필터 없음 — 검사(R-SC-003/008)가 활성 무관으로 세기 때문 (2026-09-17 Fable 후속 판정)
  const noTarget = await q(`
    SELECT id, seller_type, seller_entity_id, seller_product_id, is_active
      FROM ingredient_seller_products
     WHERE ingredient_id IS NULL AND product_ingredient_id IS NULL`);

  const deadTarget = await q(`
    SELECT isp.id, isp.seller_type, isp.ingredient_id, isp.product_ingredient_id, isp.is_active
      FROM ingredient_seller_products isp
      LEFT JOIN ingredients i ON i.id = isp.ingredient_id
      LEFT JOIN product_ingredients p ON p.id = isp.product_ingredient_id
     WHERE ((isp.ingredient_id IS NOT NULL AND i.id IS NULL)
         OR (isp.product_ingredient_id IS NOT NULL AND p.id IS NULL))`);

  const rows = [...noTarget, ...deadTarget];
  console.log(`대상 없음 ${noTarget.length}건 · 지워진 대상 ${deadTarget.length}건 = 합계 ${rows.length}건`);
  if (!rows.length) { console.log('\n✓ 고칠 것이 없습니다.'); return; }

  // ⛔ 발주 줄이 가리키는 매핑은 **지우지 않는다** — 발주 이력의 포인터가 끊긴다
  //   (`purchase_order_items.ingredient_seller_product_id`). 그건 비활성만.
  const refCounts = {};
  for (const r of rows) {
    const [c] = await q(
      `SELECT COUNT(*) c FROM purchase_order_items WHERE ingredient_seller_product_id = :id`, { id: r.id });
    refCounts[r.id] = Number(c.c);
  }
  const toDelete = rows.filter(r => refCounts[r.id] === 0);
  // 발주 줄이 붙든 행은 지울 수 없다 — 이미 꺼져 있으면 손대지 않는다(무의미한 UPDATE 방지).
  const toDeactivate = rows.filter(r => refCounts[r.id] > 0 && r.is_active);
  const alreadyOff = rows.filter(r => refCounts[r.id] > 0 && !r.is_active);

  for (const r of rows) {
    const how = refCounts[r.id] > 0
      ? (r.is_active ? `비활성(발주 줄 ${refCounts[r.id]}개가 가리킴)` : `무접촉(이미 꺼짐 · 발주 줄 ${refCounts[r.id]}개)`)
      : '삭제';
    console.log(`  #${r.id} ${r.seller_type} 판매자상품 ${r.seller_product_id ?? '-'} · 재료 ${r.ingredient_id ?? 'null'} · 재고아이템 ${r.product_ingredient_id ?? 'null'} → ${how}`);
  }
  console.log(`\n삭제 ${toDelete.length}건 · 비활성 ${toDeactivate.length}건 · 이미 꺼져 있어 무접촉 ${alreadyOff.length}건`);

  if (!APPLY) {
    console.log('\n(드라이런 — --apply 를 붙여야 실제로 바뀝니다. 스냅샷 파일도 만들지 않았습니다.)');
    return;
  }

  // 스냅샷은 **행 전체** — 삭제한 것을 다시 INSERT 로 되살리기 위함
  const full = rows.length
    ? await q(`SELECT * FROM ingredient_seller_products WHERE id IN (:ids)`, { ids: rows.map(r => r.id) })
    : [];
  if (!REHEARSE) writeSnapshot('orphan', {
    kind: 'orphan', at: new Date().toISOString(),
    deleted_ids: toDelete.map(r => r.id), deactivated_ids: toDeactivate.map(r => r.id), full
  });

  const t = await sequelize.transaction();
  try {
    if (toDeactivate.length) {
      await sequelize.query(`UPDATE ingredient_seller_products SET is_active = 0 WHERE id IN (:ids)`,
        { replacements: { ids: toDeactivate.map(r => r.id) }, transaction: t });
    }
    if (toDelete.length) {
      await sequelize.query(`DELETE FROM ingredient_seller_products WHERE id IN (:ids)`,
        { replacements: { ids: toDelete.map(r => r.id) }, transaction: t });
    }
    if (REHEARSE) {
      await t.rollback();
      console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.');
    } else {
      await t.commit();
    }
  } catch (e) { await t.rollback(); throw e; }
  console.log(`\n✓ 삭제 ${toDelete.length}건 · 비활성 ${toDeactivate.length}건 (--undo 로 되돌릴 수 있습니다)`);
}

/** 코드 중복 — 같은 소유 안에서 나중 행에 다음 빈 번호를 준다 */
async function code() {
  const plan = [];

  // 재료: 소유 단위 = (owner_type, restaurant_id, brand_id)
  // ⚠ 활성 필터를 넣지 않는다 (2026-09-17 Fable 후속 판정) — 검사 ING-UNI-023 이 활성 무관으로 세므로
  //   «활성만» 고치면 **검사가 못 잡는 게 아니라 수정이 덜 고친다.** 꺼진 재고아이템은 화면에서 다시
  //   켤 수 있고(①이 그 경우였다) 켜는 순간 활성 중복이 된다.
  const ingDup = await q(`
    SELECT owner_type, COALESCE(restaurant_id,0) rid, COALESCE(brand_id,0) bid, code
      FROM ingredients
     WHERE code IS NOT NULL AND TRIM(code) <> ''
     GROUP BY owner_type, COALESCE(restaurant_id,0), COALESCE(brand_id,0), code
    HAVING COUNT(*) > 1`);
  for (const g of ingDup) {
    const rows = await q(`
      SELECT id, name, code, is_active FROM ingredients
       WHERE code = :c AND owner_type = :o
         AND COALESCE(restaurant_id,0) = :r AND COALESCE(brand_id,0) = :b
       ORDER BY id ASC`, { c: g.code, o: g.owner_type, r: g.rid, b: g.bid });
    // 첫 행(먼저 만들어진 것)은 그대로 두고, 뒤 행들만 새 번호를 받는다.
    for (const row of rows.slice(1)) {
      const next = await generateIngredientCode(Ingredient, g.owner_type,
        g.owner_type === 'brand' ? g.bid : g.rid);
      plan.push({ table: 'ingredients', id: row.id, name: row.name, from: row.code, to: next });
    }
  }

  // 재고아이템: 소유 단위 = owner_user_id
  const piDup = await q(`
    SELECT owner_user_id, code FROM product_ingredients
     WHERE code IS NOT NULL AND TRIM(code) <> ''
     GROUP BY owner_user_id, code HAVING COUNT(*) > 1`);
  for (const g of piDup) {
    const rows = await q(`
      SELECT id, name, code, is_active FROM product_ingredients
       WHERE code = :c AND owner_user_id = :o ORDER BY id ASC`,
      { c: g.code, o: g.owner_user_id });
    for (const row of rows.slice(1)) {
      const next = await generateCode(ProductIngredient, 'PI', { whereClause: { owner_user_id: g.owner_user_id } });
      plan.push({ table: 'product_ingredients', id: row.id, name: row.name, from: row.code, to: next });
    }
  }

  console.log(`새 번호를 줄 행 ${plan.length}건`);
  for (const p of plan) console.log(`  ${p.table}#${p.id} ${String(p.name).slice(0, 30)}  ${p.from} → ${p.to}`);
  if (!plan.length) { console.log('\n✓ 고칠 것이 없습니다.'); return; }

  if (!APPLY) {
    console.log('\n(드라이런 — --apply 를 붙여야 실제로 바뀝니다. 스냅샷 파일도 만들지 않았습니다.)');
    return;
  }
  if (!REHEARSE) writeSnapshot('code', { kind: 'code', at: new Date().toISOString(), plan });

  const t = await sequelize.transaction();
  try {
    for (const p of plan) {
      await sequelize.query(`UPDATE ${p.table} SET code = :to WHERE id = :id`,
        { replacements: { to: p.to, id: p.id }, transaction: t });
    }
    if (REHEARSE) {
      await t.rollback();
      console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.');
    } else {
      await t.commit();
    }
  } catch (e) { await t.rollback(); throw e; }
  console.log(`\n✓ ${plan.length}건에 새 번호 부여`);
}

async function undo(file) {
  const snap = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const t = await sequelize.transaction();
  try {
    if (snap.kind === 'orphan') {
      // 비활성한 것은 다시 켜고, **삭제한 것은 행 전체를 다시 넣는다**(스냅샷에 통째로 떠 두었다).
      if (snap.deactivated_ids?.length) {
        await sequelize.query(`UPDATE ingredient_seller_products SET is_active = 1 WHERE id IN (:ids)`,
          { replacements: { ids: snap.deactivated_ids }, transaction: t });
      }
      const deleted = (snap.full || []).filter(r => (snap.deleted_ids || []).includes(r.id));
      for (const row of deleted) {
        const cols = Object.keys(row);
        await sequelize.query(
          `INSERT INTO ingredient_seller_products (${cols.map(c => '`' + c + '`').join(',')})
           VALUES (${cols.map((_, i) => ':v' + i).join(',')})`,
          { replacements: Object.fromEntries(cols.map((c, i) => ['v' + i, row[c]])), transaction: t });
      }
      console.log(`되돌림: 다시 활성 ${snap.deactivated_ids?.length || 0}건 · 다시 넣음 ${deleted.length}건`);
    } else if (snap.kind === 'code') {
      for (const p of snap.plan) {
        await sequelize.query(`UPDATE ${p.table} SET code = :from WHERE id = :id`,
          { replacements: { from: p.from, id: p.id }, transaction: t });
      }
      console.log(`되돌림: ${snap.plan.length}건 옛 번호로`);
    } else {
      throw new Error('알 수 없는 스냅샷 종류: ' + snap.kind);
    }
    if (REHEARSE) {
      await t.rollback();
      console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.');
    } else {
      await t.commit();
    }
  } catch (e) { await t.rollback(); throw e; }
}

(async () => {
  if (UNDO) await undo(UNDO);
  else if (TASK === 'orphan') await orphan();
  else if (TASK === 'code') await code();
  else {
    console.error('--task orphan | --task code | --undo <스냅샷json> 중 하나가 필요합니다');
    process.exit(2);
  }
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
