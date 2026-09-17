/**
 * 판매자 링크 환산비 정리 (2026-09-17 Fable 판정 ③) — 기계가 정할 수 있는 것만 고친다
 *
 * 문제
 *   판매자 단위와 내 재고 단위가 다른데 `unit_conversion` 이 1 인 행들. 입고가 `수량 × conv` 라
 *   「소스통 1팩 = 50개」인데 1 로 들어와 **재고가 팩 수만큼만 는다**. 원가식은 `base_quantity` 로
 *   계산하므로 같은 행 안에서 두 식이 갈려 있다.
 *
 * 규칙은 여기 없다 — `utils/unitConversionRule.js` 하나뿐이고 인스펙션 R-SC-007 도 같은 함수를 쓴다.
 *   N 정상(무접촉) · D 기계가 정함(적용) · H 사람 몫(목록만, **추측값을 쓰지 않는다**)
 *
 * 건드리지 않는 것
 *   현재고 · 과거 원장 · unit_cost. 환산비는 **앞으로의 입고에만** 작용한다.
 *   지금 어긋난 재고 숫자는 재고실사로 맞춘다.
 *
 * 사용
 *   node scripts/migrate-unit-conversion-derivable-20260917.js              # 전수 N/D/H 표
 *   node scripts/migrate-unit-conversion-derivable-20260917.js --apply      # D 만 적용
 *   node scripts/migrate-unit-conversion-derivable-20260917.js --undo backups/unit-conversion-*.json
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { classifyConversion } = require('../utils/unitConversionRule');

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
  const f = path.join(SNAP_DIR, `unit-conversion-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
  fs.writeFileSync(f, JSON.stringify(payload, null, 2));
  console.log(`\n💾 스냅샷 ${f}`);
  return f;
}

/** 두 다리(재료·재고아이템) × 두 판매자(공급업체·브랜드) 전수 */
async function loadRows() {
  const out = [];
  for (const bridge of [
    { col: 'ingredient_id', table: 'ingredients', label: '재료' },
    { col: 'product_ingredient_id', table: 'product_ingredients', label: '재고아이템' }
  ]) {
    for (const leg of [
      { type: 'supplier', table: 'supplier_products' },
      { type: 'brand', table: 'brand_products' }
    ]) {
      // ⚠ seller_product_id 는 다형 참조 — seller_type 으로 갈라 조인하지 않으면 id 충돌로 엉뚱한 행이 붙는다.
      // ⚠ COLLATE 를 빼면 «Illegal mix of collations» 이거나 조용히 0건이 된다.
      const modeCol = leg.type === 'supplier' ? 's.order_mode' : "'pack'";
      const baseCol = leg.type === 'supplier' ? 's.base_quantity' : '1';
      const rows = await q(`
        SELECT isp.id, isp.unit_conversion AS conv, '${leg.type}' AS seller_leg, '${bridge.label}' AS bridge,
               t.name AS target_name, t.unit AS stock_unit, t.base_quantity AS stock_base,
               t.package_unit AS stock_package_unit, t.package_quantity AS stock_package_quantity,
               s.name AS seller_name, s.unit AS seller_unit, ${baseCol} AS seller_base, ${modeCol} AS order_mode,
               -- ⚠ 이 두 칸을 안 넘기면 **사람이 1 로 확인해 둔 행을 기계가 덮어쓴다**
               -- (확인 칸이 없으면 conv=1 → D 로 분류된다). 검사와 수정은 같은 SQL 이어야 한다.
               isp.conversion_confirmed_at AS confirmed_at, isp.conversion_confirmed_pair AS confirmed_pair
          FROM ingredient_seller_products isp
          JOIN \`${bridge.table}\` t ON t.id = isp.${bridge.col}
          JOIN \`${leg.table}\` s ON s.id = isp.seller_product_id
         WHERE isp.is_active = 1 AND isp.seller_type = '${leg.type}'
           AND t.unit IS NOT NULL AND s.unit IS NOT NULL
           AND LOWER(TRIM(t.unit)) COLLATE utf8mb4_general_ci <> LOWER(TRIM(s.unit)) COLLATE utf8mb4_general_ci`);
      out.push(...rows);
    }
  }
  return out;
}

async function main() {
  const rows = await loadRows();
  const classified = rows.map(r => ({ ...r, ...classifyConversion(r) }));
  const N = classified.filter(x => x.kind === 'N');
  const D = classified.filter(x => x.kind === 'D');
  const H = classified.filter(x => x.kind === 'H');

  console.log(`단위가 다른 활성 링크 ${rows.length}건 → 정상 ${N.length} · 기계가 정함 ${D.length} · 사람 몫 ${H.length}`);

  if (D.length) {
    console.log('\n[D] 기계가 정함 — 적용 대상');
    for (const x of D) {
      console.log(`  #${x.id} ${x.bridge}/${x.seller_leg} [${String(x.seller_name).slice(0, 28)}] ${x.seller_base}${x.seller_unit}`
        + ` → [${String(x.target_name).slice(0, 28)}] ${x.stock_base}${x.stock_unit}`
        + `  conv ${x.conv} → ${x.want}  (${x.rule}: ${x.why})`);
    }
  }
  if (H.length) {
    console.log('\n[H] 사람이 정해야 함 — 손대지 않습니다');
    for (const x of H) {
      console.log(`  #${x.id} ${x.bridge}/${x.seller_leg} [${String(x.seller_name).slice(0, 28)}] ${x.seller_base}${x.seller_unit}`
        + ` → [${String(x.target_name).slice(0, 28)}] ${x.stock_base}${x.stock_unit}  conv ${x.conv}  — ${x.why}`);
    }
  }

  if (!D.length) { console.log('\n✓ 기계가 정할 수 있는 것이 없습니다.'); return; }
  if (!APPLY) {
    console.log('\n(드라이런 — --apply 를 붙여야 D 만 실제로 바뀝니다. 스냅샷 파일도 만들지 않았습니다.)');
    return;
  }

  if (!REHEARSE) writeSnapshot({
    kind: 'unit-conversion', at: new Date().toISOString(),
    changes: D.map(x => ({ id: x.id, old_conv: Number(x.conv), new_conv: x.want, rule: x.rule })),
    left_for_human: H.map(x => ({ id: x.id, target: x.target_name, seller: x.seller_name, why: x.why }))
  });

  const t = await sequelize.transaction();
  try {
    for (const x of D) {
      await sequelize.query(`UPDATE ingredient_seller_products SET unit_conversion = :c WHERE id = :id`,
        { replacements: { c: x.want, id: x.id }, transaction: t });
    }
    if (REHEARSE) {
      await t.rollback();
      console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.');
    } else {
      await t.commit();
    }
  } catch (e) { await t.rollback(); throw e; }
  console.log(`\n✓ ${D.length}건 환산비 수정 (현재고·과거 원장·원가는 건드리지 않았습니다)`);
}

async function undo(file) {
  const snap = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const t = await sequelize.transaction();
  try {
    for (const c of snap.changes) {
      await sequelize.query(`UPDATE ingredient_seller_products SET unit_conversion = :c WHERE id = :id`,
        { replacements: { c: c.old_conv, id: c.id }, transaction: t });
    }
    if (REHEARSE) {
      await t.rollback();
      console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.');
    } else {
      await t.commit();
    }
  } catch (e) { await t.rollback(); throw e; }
  console.log(`되돌림: ${snap.changes.length}건`);
}

(async () => {
  if (UNDO) await undo(UNDO); else await main();
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
