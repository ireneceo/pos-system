/**
 * 무게로 «달아서» 사는 물건인데 재고를 «개수» 로 세던 것 바로잡기 (2026-09-17 Irene 지시)
 *
 * Irene 원문: 「발주처가 kg 인데 우리 재고가 piece인게 말이 돼? box에서 piece는 말이 되는데.」
 *             「kg가 공급업체 거면 우리 재고관리도 kg로 해줄래?」
 *
 * 무엇만 고치는가 — **저울에 달아서 주문하는 것(order_mode = 'measure')** 만이다.
 *   그 경우 「1kg 이 몇 개」가 성립하지 않으므로 재고 단위가 애초에 잘못 들어간 것이다.
 *   ⛔ pack 주문은 건드리지 않는다. 거기서 kg·L 은 판매 단위가 아니라 **그 안에 든 양**이다
 *      (진간장 표기는 1 L 이지만 실제로 사는 단위는 «병» 이고, 재고를 병으로 세는 것이 맞다).
 *      그런 행은 단위를 바꾸면 오히려 어긋난다 — 환산값(1병 = 1L)으로 풀 자리다.
 *
 * 손대지 않는 것
 *   현재고 숫자 · 원가 · 과거 원장 · 발주 이력. **라벨만 바꾼다.**
 *   (실측상 그 숫자들은 이미 kg 기준으로 쓰이고 있었다 — 0.6개·0.4개 같은 값이 그 증거다.)
 *
 * 건너뛰는 것 (보고만 한다)
 *   · 레시피가 쓰는 행 — 레시피 수량의 뜻이 말없이 바뀐다(5 개 → 5 kg). 라우트 가드와 같은 기준.
 *   · 판매자마다 단위가 다른 행(한 곳은 g, 다른 곳은 kg) — 기계가 못 정한다.
 *
 * 거울 규칙
 *   `ingredients` 가 `source_product_ingredient_id` 를 가지면 그건 **거울**이다. 거울만 고치면
 *   다음 동기화 때 원본 값으로 되돌아간다(services/stockItemMirror.js 의 MIRRORED_FIELDS 에 unit 있음).
 *   그래서 **원본(product_ingredients)을 고치고 거울을 같이 맞춘다.**
 *
 * 사용
 *   node scripts/migrate-stock-unit-follows-seller-20260917.js            # 조사만
 *   node scripts/migrate-stock-unit-follows-seller-20260917.js --rehearse # 썼다가 되돌림
 *   node scripts/migrate-stock-unit-follows-seller-20260917.js --apply
 *   node scripts/migrate-stock-unit-follows-seller-20260917.js --undo backups/stock-unit-*.json
 */
require('dotenv/config');
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const REHEARSE = process.argv.includes('--rehearse');
const APPLY = process.argv.includes('--apply') || REHEARSE;
const UNDO = arg('undo', null);
const q = (s, r) => sequelize.query(s, { type: QueryTypes.SELECT, replacements: r });
const SNAP_DIR = path.join(__dirname, '..', 'backups');

const MEASURE_UNITS = ['kg', 'g', 'l', 'ml'];
const COUNT_UNITS = ['piece', 'pcs', 'pc', 'ea', 'unit', 'pack', 'box', 'bottle', 'can', 'tray', 'cup', 'bag'];
const inList = (arr) => arr.map((u) => `'${u}'`).join(',');

function writeSnapshot(payload) {
  if (!fs.existsSync(SNAP_DIR)) fs.mkdirSync(SNAP_DIR, { recursive: true });
  const f = path.join(SNAP_DIR, `stock-unit-${new Date().toISOString().replace(/[:.]/g, '')}.json`);
  fs.writeFileSync(f, JSON.stringify(payload, null, 2));
  console.log(`\n💾 스냅샷 ${f}`);
  return f;
}

/** 저울 주문인데 재고가 개수 단위인 행 — 두 다리(재료·재고아이템) 전수 */
async function loadCandidates() {
  const rows = [];
  for (const b of [
    { col: 'ingredient_id', table: 'ingredients', label: '재료' },
    { col: 'product_ingredient_id', table: 'product_ingredients', label: '재고아이템' }
  ]) {
    // 저울 주문(order_mode='measure')은 공급업체 상품에만 있다 — 브랜드 상품은 항상 pack 이다.
    rows.push(...await q(`
      SELECT isp.id link_id, '${b.label}' bridge, t.id tid, t.name, t.unit stock_unit,
             t.current_stock, t.unit_cost,
             ${b.label === '재료' ? 't.source_product_ingredient_id' : 'NULL'} src,
             s.name seller_name, LOWER(TRIM(s.unit)) seller_unit
        FROM ingredient_seller_products isp
        JOIN \`${b.table}\` t ON t.id = isp.${b.col}
        JOIN supplier_products s ON s.id = isp.seller_product_id
       WHERE isp.is_active = 1 AND isp.seller_type = 'supplier' AND t.is_active = 1
         AND s.order_mode = 'measure'
         AND LOWER(TRIM(s.unit)) COLLATE utf8mb4_general_ci IN (${inList(MEASURE_UNITS)})
         AND LOWER(TRIM(t.unit)) COLLATE utf8mb4_general_ci IN (${inList(COUNT_UNITS)})`));
  }
  return rows;
}

/** 이 재고행을 쓰는 활성 레시피 줄 수 — 라우트의 단위 변경 가드와 같은 두 갈래로 센다 */
async function recipeLines(row) {
  if (row.bridge === '재료') {
    const [c] = await q(`SELECT COUNT(*) c FROM recipe_ingredients ri
        JOIN recipes r ON r.id = ri.recipe_id AND r.is_active = 1
       WHERE ri.ingredient_id = :id`, { id: row.tid });
    return Number(c.c);
  }
  const [c] = await q(`SELECT (SELECT COUNT(*) FROM recipe_ingredients ri
                                JOIN ingredients i ON i.id = ri.ingredient_id
                               WHERE i.source_product_ingredient_id = :id)
                            + (SELECT COUNT(*) FROM product_recipe_ingredients pri
                               WHERE pri.ingredient_id = :id) c`, { id: row.tid });
  return Number(c.c);
}

async function main() {
  const rows = await loadCandidates();
  if (!rows.length) { console.log('✓ 저울로 사는데 개수로 세는 행이 없습니다.'); return; }

  // 재고행 단위로 묶고 판매자 단위를 모은다
  const byTarget = new Map();
  for (const r of rows) {
    const k = `${r.bridge}#${r.tid}`;
    const cur = byTarget.get(k);
    if (cur) { cur.sellerUnits.add(r.seller_unit); cur.sellers.add(String(r.seller_name).trim()); }
    else byTarget.set(k, { ...r, key: k, sellerUnits: new Set([r.seller_unit]), sellers: new Set([String(r.seller_name).trim()]) });
  }

  const plan = [], skipped = [];
  for (const t of byTarget.values()) {
    const units = [...t.sellerUnits];
    if (units.length > 1) {
      skipped.push({ ...t, why: `판매자마다 단위가 다름(${units.join('/')}) — 사람이 정해야 함` });
      continue;
    }
    const uses = await recipeLines(t);
    if (uses > 0) {
      skipped.push({ ...t, why: `레시피 ${uses}줄이 쓰는 중 — 레시피 수량의 뜻이 바뀐다` });
      continue;
    }
    plan.push({ ...t, from: t.stock_unit, to: units[0], uses });
  }

  console.log(`저울로 사는데 개수로 세는 재고행 ${byTarget.size}개 → 바꿀 것 ${plan.length} · 건너뛸 것 ${skipped.length}`);
  if (plan.length) {
    console.log('\n[바꿀 것]');
    for (const p of plan) {
      const stock = Number(p.current_stock) !== 0 ? `  ⚠ 현재고 ${p.current_stock} (숫자는 그대로 두고 라벨만 바뀝니다)` : '';
      console.log(`  ${p.key} ${String(p.name).trim().slice(0, 40)} : ${p.from} → ${p.to}${stock}`);
    }
  }
  if (skipped.length) {
    console.log('\n[건너뜀 — 손대지 않습니다]');
    for (const s of skipped) console.log(`  ${s.key} ${String(s.name).trim().slice(0, 40)} : ${s.why}`);
  }

  if (!plan.length) { console.log('\n바꿀 것이 없습니다.'); return; }
  if (!APPLY) { console.log('\n(조사만 했습니다 — --apply 를 붙여야 실제로 바뀝니다. 스냅샷도 만들지 않았습니다.)'); return; }

  if (!REHEARSE) writeSnapshot({
    kind: 'stock-unit-follows-seller', at: new Date().toISOString(),
    changes: plan.map(p => ({ bridge: p.bridge, id: p.tid, name: p.name, from: p.from, to: p.to, src: p.src })),
    skipped: skipped.map(s => ({ key: s.key, name: s.name, why: s.why }))
  });

  const t = await sequelize.transaction();
  try {
    const { syncMirrors } = require('../services/stockItemMirror');
    const { ProductIngredient } = require('../models');
    for (const p of plan) {
      if (p.bridge === '재고아이템') {
        await sequelize.query(`UPDATE product_ingredients SET unit = :u WHERE id = :id`,
          { replacements: { u: p.to, id: p.tid }, transaction: t });
        const src = await ProductIngredient.findByPk(p.tid, { transaction: t });
        if (src) await syncMirrors(src, { transaction: t });   // 거울도 같이
      } else if (p.src) {
        // 이 재료는 거울이다 — 원본을 고치고 거울을 따라오게 한다(원본만 고치면 화면이 안 바뀌고,
        //   거울만 고치면 다음 동기화 때 되돌아간다).
        await sequelize.query(`UPDATE product_ingredients SET unit = :u WHERE id = :id`,
          { replacements: { u: p.to, id: p.src }, transaction: t });
        const src = await ProductIngredient.findByPk(p.src, { transaction: t });
        if (src) await syncMirrors(src, { transaction: t });
      } else {
        await sequelize.query(`UPDATE ingredients SET unit = :u WHERE id = :id`,
          { replacements: { u: p.to, id: p.tid }, transaction: t });
      }
    }
    if (REHEARSE) { await t.rollback(); console.log('\n↩ 리허설 — 썼다가 되돌렸습니다. 데이터는 그대로입니다.'); }
    else await t.commit();
  } catch (e) { await t.rollback(); throw e; }

  if (!REHEARSE) console.log(`\n✓ ${plan.length}건 단위 정정 (현재고·원가·과거 기록은 건드리지 않았습니다)`);
}

async function undo(file) {
  const snap = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const t = await sequelize.transaction();
  try {
    const { syncMirrors } = require('../services/stockItemMirror');
    const { ProductIngredient } = require('../models');
    for (const c of snap.changes) {
      const targetTable = (c.bridge === '재고아이템' || c.src) ? 'product_ingredients' : 'ingredients';
      const targetId = c.bridge === '재고아이템' ? c.id : (c.src || c.id);
      await sequelize.query(`UPDATE \`${targetTable}\` SET unit = :u WHERE id = :id`,
        { replacements: { u: c.from, id: targetId }, transaction: t });
      if (targetTable === 'product_ingredients') {
        const src = await ProductIngredient.findByPk(targetId, { transaction: t });
        if (src) await syncMirrors(src, { transaction: t });
      }
    }
    await t.commit();
  } catch (e) { await t.rollback(); throw e; }
  console.log(`되돌림: ${snap.changes.length}건`);
}

(async () => {
  if (UNDO) await undo(UNDO); else await main();
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
