/**
 * 원가를 «연결된 공급업체 가격» 으로 맞춘다 (2026-09-17 Irene 지시)
 *
 * Irene 원문: 「공급업체 가격이 원가인데 기본적으로 같게 넣어줘야 해」
 *             「재고아이템에 연결되는 공급업체 가격이 my cost인거야. 레스토랑 자체 코스트.」
 *
 * 왜 필요한가 (운영 실측 2026-09-17)
 *   선호 판매자가 연결된 행 중 원가가 공급업체 가격과 어긋난 것:
 *     · 매장 소유 재료 291건 중 21건 — 그중 9건은 **1g 값이 1,000g 자리에 들어가** 수백~수천 배 작다
 *       (양파 0.0035(→7.8) · 대파 0.01(→10) · 물엿18kg 0.0074(→133))
 *     · BG 재고아이템 200건 중 6건
 *   레시피 원가는 이 칸을 읽으므로, 그 재료를 레시피에 넣는 순간 원가가 통째로 틀어진다.
 *
 * ⛔ 공식을 여기서 다시 쓰지 않는다 — `services/costSync.js` 의 `recomputeUnitCost` 를 그대로 부른다.
 *    그 함수가 단일 소스이고, 원가 이력(cost_change_logs)과 거울 반영까지 같이 한다.
 *    (교훈: 검사와 수정이 다른 식을 쓰면 서로를 못 믿는다 — [[feedback_check_and_fix_same_sql]])
 *
 * 건드리지 않는 것
 *   판매자·프로덕트 출처가 **없는** 행(사람이 직접 넣는 값) · 단위가 호환되지 않는 행(개↔kg 등).
 *   그런 행은 함수가 스스로 «skip» 을 돌려준다.
 *
 * 사용
 *   node scripts/migrate-cost-from-seller-20260917.js            # 조사만(바뀔 것 목록)
 *   node scripts/migrate-cost-from-seller-20260917.js --apply
 *   node scripts/migrate-cost-from-seller-20260917.js --undo backups/cost-from-seller-*.json
 *   node scripts/migrate-cost-from-seller-20260917.js --undo <스냅샷> --only 196,1084   # 몇 건만
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { recomputeUnitCost } = require('../services/costSync');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const APPLY = process.argv.includes('--apply');
const UNDO = arg('undo', null);
const q = (s, r) => sequelize.query(s, { type: QueryTypes.SELECT, replacements: r });
const SNAP_DIR = path.join(__dirname, '..', 'backups');
/** 이 실행을 묶는 번호 — 원가 이력(cost_change_logs.batch_id)에 찍혀 되돌리기가 이것으로 찾는다. */
const BATCH = `cost-from-seller-${new Date().toISOString().replace(/[:.]/g, '')}`;

function writeSnapshot(payload) {
  if (!fs.existsSync(SNAP_DIR)) fs.mkdirSync(SNAP_DIR, { recursive: true });
  const f = path.join(SNAP_DIR, `cost-from-seller-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
  fs.writeFileSync(f, JSON.stringify(payload, null, 2));
  console.log(`\n💾 스냅샷 ${f}`);
  return f;
}

/** 선호 판매자 연결이 살아 있는 행만 대상 — 출처 없는 행은 사람 몫이라 부르지도 않는다 */
async function targets() {
  const ing = await q(`SELECT DISTINCT i.id, i.name, i.unit, i.unit_cost FROM ingredients i
      JOIN ingredient_seller_products isp ON isp.ingredient_id = i.id AND isp.is_active = 1 AND isp.is_preferred = 1
     WHERE i.is_active = 1`);
  const pi = await q(`SELECT DISTINCT p.id, p.name, p.unit, p.unit_cost FROM product_ingredients p
      JOIN ingredient_seller_products isp ON isp.product_ingredient_id = p.id AND isp.is_active = 1 AND isp.is_preferred = 1
     WHERE p.is_active = 1`);
  return [
    ...ing.map(r => ({ kind: 'ingredient', ...r })),
    ...pi.map(r => ({ kind: 'product_ingredient', ...r }))
  ];
}

async function main() {
  const rows = await targets();
  console.log(`선호 판매자가 연결된 행 ${rows.length}건 (재료 ${rows.filter(r => r.kind === 'ingredient').length} · 재고아이템 ${rows.filter(r => r.kind === 'product_ingredient').length})`);

  const t = APPLY ? await sequelize.transaction() : null;
  const changes = [], skipped = [];
  try {
    for (const r of rows) {
      // 조사 모드에서도 같은 함수를 쓴다 — 다만 트랜잭션을 롤백해 데이터는 그대로 둔다.
      const dryTx = APPLY ? t : await sequelize.transaction();
      const res = await recomputeUnitCost(r.kind, r.id, {
        sequelize, transaction: APPLY ? t : dryTx, onlyIfZero: false,
        // source 는 «사람이 시킨 정렬» 이라 manual. batch_id 로 묶어야 되돌리기가 이력을 거꾸로 읽을 수 있다.
        ctx: { source: 'manual', batch_id: BATCH, note: '2026-09-17 공급업체 가격으로 원가 정렬(Irene 지시)' }
      });
      if (!APPLY) await dryTx.rollback();
      if (res.skip) { skipped.push({ ...r, why: res.skip }); continue; }
      if (res.changed === false) continue;
      changes.push({ kind: r.kind, id: r.id, name: String(r.name).trim(), unit: r.unit,
        from: Number(res.from), to: Number(res.to), source: res.source });
    }

    console.log(`\n바뀔 것 ${changes.length}건 · 손대지 않음 ${skipped.length}건`);
    for (const c of changes) {
      const ratio = c.from > 0 ? (c.to / c.from) : null;
      const mark = ratio && (ratio >= 50 || ratio <= 0.02) ? '  ⚠ 자릿수가 달라집니다' : '';
      console.log(`  ${c.kind === 'ingredient' ? '재료' : '재고아이템'}#${c.id} ${c.name.slice(0, 34)} : ${c.from} → ${c.to} (${c.source})${mark}`);
    }

    if (!APPLY) {
      if (t) await t.rollback();
      console.log('\n(조사만 했습니다 — --apply 를 붙여야 실제로 바뀝니다. 스냅샷도 만들지 않았습니다.)');
      return;
    }
    writeSnapshot({ kind: 'cost-from-seller', at: new Date().toISOString(), batch_id: BATCH, changes });
    await t.commit();
    console.log(`\n✓ ${changes.length}건 원가를 공급업체 가격에 맞췄습니다 (이력 cost_change_logs 에 남음)`);
  } catch (e) {
    if (t) await t.rollback();
    throw e;
  }
}

/**
 * 되돌리기 — **원가 행만 되돌리면 절반이다** (2026-09-17 Fable 게이트 지적).
 *
 * `recomputeUnitCost` 는 적용할 때 세 가지를 쓴다:
 *   ① 원가 행 `unit_cost` ② 이력 `cost_change_logs` ③ 재고아이템이면 **거울 행**(`ingredients.source_product_ingredient_id`)
 * 레시피는 **거울 행**을 읽는다(`routes/recipes.js:471`). 거울을 안 되돌리면 «되돌렸는데 레시피 원가는 새 값» 이 된다.
 *
 * 규칙 (`scripts/catalog-alignment.js:502 restoreCosts` 와 같은 모양)
 *   · 지금 값이 **적용 때 넣은 값과 같을 때만** 되돌린다 — 그 뒤 사람이 바꿨으면 건드리지 않고 알린다.
 *   · 거울도 같은 조건으로 되돌린다.
 *   · 되돌린 것도 이력에 남긴다(`batch_id` 에 `-rollback`).
 *   · `--only 12,34` 로 몇 건만 되돌릴 수 있다 — 3건 고치자고 28건을 흔들지 않게.
 */
async function undo(file) {
  const { logCostChange } = require('../services/costSync');
  const snap = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const onlyRaw = arg('only', null);
  const only = onlyRaw ? new Set(String(onlyRaw).split(',').map((x) => Number(x.trim())).filter(Boolean)) : null;
  const same = (a, b) => Math.abs(Number(a) - Number(b)) < 0.0001;
  const batch = snap.batch_id || null;

  const t = await sequelize.transaction();
  const restored = [], conflicts = [];
  try {
    for (const c of snap.changes) {
      if (only && !only.has(Number(c.id))) continue;
      const table = c.kind === 'product_ingredient' ? 'product_ingredients' : 'ingredients';
      const [row] = await q(`SELECT id, unit_cost FROM \`${table}\` WHERE id = :id`, { id: c.id });
      if (!row) { conflicts.push({ ...c, why: '행이 없어짐' }); continue; }
      if (!same(row.unit_cost, c.to)) {
        conflicts.push({ ...c, why: `적용 뒤 원가가 다시 바뀜(지금 ${row.unit_cost}) — 건드리지 않음` });
        continue;
      }
      await sequelize.query(`UPDATE \`${table}\` SET unit_cost = :v WHERE id = :id`,
        { replacements: { v: c.from, id: c.id }, transaction: t });
      await logCostChange(sequelize, t, {
        subject_type: c.kind === 'product_ingredient' ? 'product_ingredient' : 'ingredient',
        subject_id: c.id, old_value: Number(row.unit_cost), new_value: Number(c.from), unit: c.unit,
        source: 'manual', batch_id: batch ? `${batch}-rollback` : 'cost-from-seller-rollback',
        note: '2026-09-17 원가 정렬 되돌리기'
      });
      restored.push({ table, id: c.id, name: c.name, from: Number(row.unit_cost), to: Number(c.from) });

      // 거울까지 — 레시피가 읽는 행이다
      if (c.kind === 'product_ingredient') {
        const mirrors = await q(`SELECT id, unit_cost FROM ingredients WHERE source_product_ingredient_id = :id`, { id: c.id });
        for (const m of mirrors) {
          if (!same(m.unit_cost, c.to)) { conflicts.push({ mirror_of: c.id, id: m.id, why: `거울 원가가 다시 바뀜(지금 ${m.unit_cost})` }); continue; }
          await sequelize.query(`UPDATE ingredients SET unit_cost = :v WHERE id = :id`,
            { replacements: { v: c.from, id: m.id }, transaction: t });
          restored.push({ table: 'ingredients', id: m.id, name: `${c.name} (거울)`, from: Number(m.unit_cost), to: Number(c.from) });
        }
      }
    }
    await t.commit();
  } catch (e) { await t.rollback(); throw e; }

  console.log(`되돌림 ${restored.length}건${only ? ` (--only ${[...only].join(',')})` : ''}`);
  for (const r of restored) console.log(`  ${r.table}#${r.id} ${String(r.name).slice(0, 32)} : ${r.from} → ${r.to}`);
  if (conflicts.length) {
    console.log(`\n건드리지 않은 것 ${conflicts.length}건`);
    for (const c of conflicts) console.log(`  #${c.id} ${String(c.name || '').slice(0, 30)} — ${c.why}`);
  }
}

(async () => {
  if (UNDO) await undo(UNDO); else await main();
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
