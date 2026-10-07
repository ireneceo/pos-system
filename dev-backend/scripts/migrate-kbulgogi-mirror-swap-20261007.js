/**
 * scripts/migrate-kbulgogi-mirror-swap-20261007.js — K-Bulgogi 1kg 브랜드 재료 두 줄 → 한 줄 (일회성 · manual)
 *
 * ## 왜 (Fable 판정 `.claude/fable-verdict-20261007-kbulgogi.md` §2-7 · §5)
 * Irene 2026-10-05 「k-불고기는 … 그냥 재고 없이 주문 후 만드는 제품으로 두는게 맞아」「나중에 해결해야 해」
 *
 * 같은 물건이 브랜드 재료에 두 줄로 살아 있다(운영 10-05 실측):
 *   - ing#23 «K-Bulgogi»     — PI 거울(재고아이템 PI-302 출처). 레시피 4줄 · 발주 매핑 · K-DINE IPC 원장 119건 ·
 *                              배치 4 · 매장 재고 8,590 g 이 **전부 여기** 붙어 있다.
 *   - ing#89 «K-Bulgogi 1kg» — BP 거울(프로덕트 bp#30 출처). 참조 0. bp#30 을 저장할 때마다 동기화가
 *                              is_active 까지 복사해 다시 켜진다(services/stockItemMirror.js MIRRORED_FIELDS).
 *
 * 일반 합치기 마이그(`migrate-merge-product-mirrors.js`)는 **BP 거울을 남기는** 방향이라 이 쌍엔 이력 5종을
 * 옮겨야 한다. 대신 **#23 을 남기고 출처 칼럼만 프로덕트로 바꾼다** → 이력 이동 0 으로 한 줄.
 *
 * ## 하는 일 (한 트랜잭션)
 *   ① BP 거울(#89) 비활성 + 출처 비움 — 그래야 bp#30 저장 때 다시 안 켜진다
 *   ② PI 거울(#23) 출처 교체: source_product_ingredient_id → NULL, source_brand_product_id → bp
 *   ③ #23 원가를 costSync 규칙으로 재계산(단일 소스 — 여기서 식을 쓰지 않는다)
 *   ④ 재고아이템(PI) 참조 재평가 — 참조 0·재고 0 이면 비활성, 아니면 무접촉+목록(합치기 마이그 ④ 와 같은 SELECT)
 *   ⑤ 증명 — 드라이런이면 무조건 롤백
 *
 * ⛔ 하지 않는 것: 원장·배치·매장 재고(오버레이)·레시피 줄·발주 매핑의 ingredient_id 이동 · 수량 변경 ·
 *   #89 삭제 · 판매 상품(bp) 수정(종류 «주문제작»·규격은 화면에서 사람이 한다 — 판정 §5).
 *   매장 숫자(8,590 g · 매장 소유 ing#1122 4 kg)는 매장 실사 몫(판정 Q2).
 *
 * 사용 (기본 = 드라이런: 적용 → 증명 → 롤백)
 *   node scripts/migrate-kbulgogi-mirror-swap-20261007.js                  # 운영 기본값 --pim=23 --bpm=89 --bp=30
 *   node scripts/migrate-kbulgogi-mirror-swap-20261007.js --apply          # 적용 + 영수증 JSON
 *   node scripts/migrate-kbulgogi-mirror-swap-20261007.js --undo=<영수증>  # 되돌리기(드라이런은 --undo=… 만, 적용은 --apply 추가)
 * 이미 적용됐거나 모양이 다르면 아무것도 안 하고 이유를 출력한다(멱등).
 */
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { recomputeUnitCost } = require('../services/costSync');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const APPLY = process.argv.includes('--apply');
const UNDO = arg('undo', null);
const PIM = parseInt(arg('pim', '23'), 10);
const BPM = parseInt(arg('bpm', '89'), 10);
const BP = parseInt(arg('bp', '30'), 10);
const RECEIPT_DIR = arg('receipt-dir', '/var/www/backups/data-migrations');

const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });
const run = (sql, r, t) => sequelize.query(sql, { replacements: r, transaction: t });
const num = (v) => (v == null ? null : parseFloat(v));

// 이력 지문 — 이 스크립트가 **건드리지 않아야 하는 것**을 전후로 센다
async function footprint(id, t) {
  const [f] = await q(`SELECT
      (SELECT COUNT(*) FROM recipe_ingredients WHERE ingredient_id = :id) recipe_lines,
      (SELECT COALESCE(SUM(quantity),0) FROM recipe_ingredients WHERE ingredient_id = :id) recipe_qty,
      (SELECT COUNT(*) FROM ingredient_seller_products WHERE ingredient_id = :id) mappings,
      (SELECT COUNT(*) FROM inventory_transactions WHERE ingredient_id = :id) ledger,
      (SELECT COUNT(*) FROM inventory_batches WHERE ingredient_id = :id) batches,
      (SELECT COALESCE(SUM(remaining_quantity),0) FROM inventory_batches WHERE ingredient_id = :id) batch_qty,
      (SELECT COUNT(*) FROM restaurant_ingredient_stocks WHERE ingredient_id = :id) overlays,
      (SELECT COALESCE(SUM(current_stock),0) FROM restaurant_ingredient_stocks WHERE ingredient_id = :id) overlay_qty`, { id }, t);
  return Object.fromEntries(Object.entries(f).map(([k, v]) => [k, num(v)]));
}
const row = async (id, t) => (await q(`SELECT id, name, brand_id, unit, base_quantity, unit_cost, current_stock, is_active,
    source_product_ingredient_id, source_brand_product_id FROM ingredients WHERE id = :id`, { id }, t))[0];
const perUnit = (r) => (num(r.base_quantity) > 0 ? Math.round((num(r.unit_cost) / num(r.base_quantity)) * 1e6) / 1e6 : null);
const deadRefs = async (t) => Number((await q(`SELECT COUNT(*) n FROM recipe_ingredients ri
    JOIN ingredients i ON i.id = ri.ingredient_id WHERE i.is_active = 0`, {}, t))[0].n);

async function swap(t) {
  const pim = await row(PIM, t);
  const bpm = await row(BPM, t);
  const [bp] = await q(`SELECT id, name, unit, base_quantity, unit_price, product_kind, product_ingredient_id, product_recipe_id
    FROM brand_products WHERE id = :id`, { id: BP }, t);
  console.log('대상');
  console.log(`  PI 거울  ing#${PIM}: ${JSON.stringify(pim)}`);
  console.log(`  BP 거울  ing#${BPM}: ${JSON.stringify(bpm)}`);
  console.log(`  판매상품 bp#${BP}: ${JSON.stringify(bp)}`);

  // 모양 확인 — 하나라도 다르면 손대지 않는다(이미 적용됐거나 다른 데이터)
  const [map] = await q(`SELECT COUNT(*) n FROM ingredient_seller_products
    WHERE ingredient_id = :pim AND seller_type = 'brand' AND seller_product_id = :bp`, { pim: PIM, bp: BP }, t);
  const why = [];
  if (!pim || !bpm || !bp) why.push('행 없음');
  else {
    if (!pim.source_product_ingredient_id) why.push(`ing#${PIM} 이 PI 거울이 아님(이미 적용됐을 수 있음 — source_brand_product_id=${pim.source_brand_product_id})`);
    if (Number(pim.is_active) !== 1) why.push(`ing#${PIM} 비활성`);
    if (Number(bpm.source_brand_product_id) !== BP) why.push(`ing#${BPM} 출처가 bp#${BP} 가 아님(${bpm.source_brand_product_id})`);
    if (String(pim.brand_id) !== String(bpm.brand_id)) why.push(`브랜드가 다름(${pim.brand_id} ≠ ${bpm.brand_id})`);
    if (Number(map.n) === 0) why.push(`ing#${PIM} 의 발주 매핑이 bp#${BP} 를 가리키지 않음 — 같은 물건이라는 근거 없음`);
    if (String(pim.unit) !== String(bpm.unit)) why.push(`단위가 다름(${pim.unit} ≠ ${bpm.unit}) — 원가 환산 판단 필요`);
    const bpmRefs = await footprint(BPM, t);
    if (bpmRefs.recipe_lines || bpmRefs.ledger || bpmRefs.batches || bpmRefs.overlay_qty || num(bpm.current_stock))
      why.push(`ing#${BPM} 에 붙은 것이 있음 ${JSON.stringify(bpmRefs)} — 이력 이동은 이 스크립트 범위 밖`);
  }
  if (why.length) return { skipped: why };

  const before = { pim: await footprint(PIM, t), perUnit: perUnit(pim), dead: await deadRefs(t) };
  const piId = pim.source_product_ingredient_id;

  // ① BP 거울 끄기 + 출처 비움
  await run(`UPDATE ingredients SET is_active = 0, source_brand_product_id = NULL WHERE id = :id`, { id: BPM }, t);
  // ② PI 거울의 출처를 프로덕트로
  await run(`UPDATE ingredients SET source_product_ingredient_id = NULL, source_brand_product_id = :bp WHERE id = :id`,
    { bp: BP, id: PIM }, t);
  // ③ 원가 — costSync 단일 소스
  const cost = await recomputeUnitCost('ingredient', PIM, { transaction: t, sequelize });
  console.log(`  원가 재계산: ${JSON.stringify(cost)}`);
  // ④ 재고아이템 참조 재평가 (migrate-merge-product-mirrors.js ④ 와 같은 SELECT)
  const [c] = await q(`SELECT
      (SELECT COUNT(*) FROM product_recipe_ingredients x WHERE x.ingredient_id = :id) a,
      (SELECT COUNT(*) FROM purchase_order_items x WHERE x.product_ingredient_id = :id) b,
      (SELECT COUNT(*) FROM ingredient_seller_products x WHERE x.product_ingredient_id = :id) c,
      (SELECT COUNT(*) FROM ingredients x WHERE x.source_product_ingredient_id = :id AND x.is_active = 1) d,
      (SELECT COUNT(*) FROM brand_products x WHERE x.product_ingredient_id = :id) e,
      (SELECT COUNT(*) FROM products x WHERE x.ingredient_id = :id) f,
      (SELECT current_stock FROM product_ingredients WHERE id = :id) st,
      (SELECT is_active FROM product_ingredients WHERE id = :id) act,
      (SELECT code FROM product_ingredients WHERE id = :id) code`, { id: piId }, t);
  const refs = ['프로덕트레시피', '발주', '매핑', '활성거울', '프로덕트다이렉트', '메뉴다이렉트']
    .map((k, i) => [k, Number(c[['a', 'b', 'c', 'd', 'e', 'f'][i]])]).filter(([, n]) => n > 0);
  let piDeactivated = false;
  if (refs.length === 0 && num(c.st) === 0 && Number(c.act) === 1) {
    await run(`UPDATE product_ingredients SET is_active = 0 WHERE id = :id`, { id: piId }, t);
    piDeactivated = true;
    console.log(`  − 재고아이템 ${c.code} (PI#${piId}) — 참조 0·재고 0, 비활성`);
  } else {
    console.log(`  · 재고아이템 ${c.code} (PI#${piId}) — ${refs.map(([k, n]) => `${k} ${n}`).join(' · ') || `재고 ${c.st} / 활성 ${c.act}`} → 무접촉`);
  }

  // ⑤ 증명
  const pimA = await row(PIM, t);
  const bpmA = await row(BPM, t);
  const after = { pim: await footprint(PIM, t), perUnit: perUnit(pimA), dead: await deadRefs(t) };
  const [twin] = await q(`SELECT COUNT(*) n FROM ingredients pim
      JOIN ingredient_seller_products isp ON isp.ingredient_id = pim.id AND isp.seller_type = 'brand'
      JOIN ingredients bpm ON bpm.source_brand_product_id = isp.seller_product_id
                          AND bpm.brand_id = pim.brand_id AND bpm.is_active = 1
     WHERE pim.source_product_ingredient_id IS NOT NULL AND pim.is_active = 1 AND isp.seller_product_id = :bp`, { bp: BP }, t);
  const [mirrors] = await q(`SELECT COUNT(*) n FROM ingredients WHERE source_brand_product_id = :bp AND brand_id = :b AND is_active = 1`,
    { bp: BP, b: pim.brand_id }, t);
  const proofs = [
    ['P1 이 물건의 두 줄(ING-UNI-018 모양) = 0', Number(twin.n) === 0, twin.n],
    ['P2 이 브랜드의 bp 출처 활성 거울 = 1 (ing#' + PIM + ')', Number(mirrors.n) === 1, mirrors.n],
    [`P3 ing#${PIM} 출처 = bp#${BP} · 재고아이템 출처 NULL · 활성`,
      Number(pimA.source_brand_product_id) === BP && pimA.source_product_ingredient_id == null && Number(pimA.is_active) === 1,
      `${pimA.source_brand_product_id}/${pimA.source_product_ingredient_id}/${pimA.is_active}`],
    [`P4 ing#${BPM} 비활성 · 출처 NULL`, Number(bpmA.is_active) === 0 && bpmA.source_brand_product_id == null,
      `${bpmA.is_active}/${bpmA.source_brand_product_id}`],
    ['P5 이력 지문 전후 동일(레시피 줄·수량·매핑·원장·배치·매장 재고)', JSON.stringify(before.pim) === JSON.stringify(after.pim),
      `${JSON.stringify(before.pim)} → ${JSON.stringify(after.pim)}`],
    ['P6 기준양 1 당 원가 전후 동일(레시피 원가 무변화)', before.perUnit === after.perUnit, `${before.perUnit} → ${after.perUnit}`],
    ['P7 죽은 레시피 참조 증가 0', after.dead - before.dead === 0, `${before.dead} → ${after.dead}`]
  ];
  return { proofs, receipt: { at: new Date().toISOString(), pim: PIM, bpm: BPM, bp: BP, piId, piDeactivated,
    before: { pim, bpm }, after: { pim: pimA, bpm: bpmA } } };
}

async function undo(file, t) {
  const r = JSON.parse(fs.readFileSync(file, 'utf8'));
  const cur = await row(r.pim, t);
  if (Number(cur.source_brand_product_id) !== r.bp || cur.source_product_ingredient_id != null)
    return { skipped: [`ing#${r.pim} 이 적용 후 모양이 아님 — 되돌릴 것 없음`] };
  const b = r.before;
  await run(`UPDATE ingredients SET source_product_ingredient_id = :spi, source_brand_product_id = NULL, unit_cost = :uc WHERE id = :id`,
    { spi: b.pim.source_product_ingredient_id, uc: b.pim.unit_cost, id: r.pim }, t);
  await run(`UPDATE ingredients SET source_brand_product_id = :sbp, is_active = :a WHERE id = :id`,
    { sbp: b.bpm.source_brand_product_id, a: b.bpm.is_active, id: r.bpm }, t);
  if (r.piDeactivated) await run(`UPDATE product_ingredients SET is_active = 1 WHERE id = :id`, { id: r.piId }, t);
  const p = await row(r.pim, t);
  const m = await row(r.bpm, t);
  return { proofs: [
    ['U1 ing#' + r.pim + ' 원래 값', String(p.source_product_ingredient_id) === String(b.pim.source_product_ingredient_id)
      && p.source_brand_product_id == null && num(p.unit_cost) === num(b.pim.unit_cost), JSON.stringify(p)],
    ['U2 ing#' + r.bpm + ' 원래 값', String(m.source_brand_product_id) === String(b.bpm.source_brand_product_id)
      && String(m.is_active) === String(b.bpm.is_active), JSON.stringify(m)]
  ] };
}

async function main() {
  const t = await sequelize.transaction();
  try {
    const res = UNDO ? await undo(UNDO, t) : await swap(t);
    if (res.skipped) {
      await t.rollback();
      console.log('\n○ 손대지 않음:'); res.skipped.forEach((x) => console.log('  - ' + x));
      process.exit(0);
    }
    console.log('\n증명');
    res.proofs.forEach(([k, ok, v]) => console.log(`  ${ok ? '✔' : '✘'} ${k}  (${v})`));
    const bad = res.proofs.filter(([, ok]) => !ok);
    if (bad.length) throw new Error(`증명 실패 ${bad.length}건 — 되돌린다`);
    if (!APPLY) { await t.rollback(); console.log('\n○ 드라이런 — 적용했다가 되돌렸습니다(증명은 위에서 실제로 돌았습니다). 적용은 --apply'); process.exit(0); }
    // 영수증을 **커밋 전에** 쓴다 — 못 쓰면 되돌릴 근거가 없으니 적용도 하지 않는다
    let f = null;
    if (!UNDO) {
      fs.mkdirSync(RECEIPT_DIR, { recursive: true });
      f = path.join(RECEIPT_DIR, `kbulgogi-mirror-swap-${res.receipt.at.replace(/[:.]/g, '-')}.json`);
      fs.writeFileSync(f, JSON.stringify(res.receipt, null, 2));
    }
    await t.commit();
    if (f) console.log(`\n✅ 적용 완료 · 영수증 ${f}\n   되돌리기: node scripts/migrate-kbulgogi-mirror-swap-20261007.js --undo=${f} --apply`);
    else console.log('\n✅ 되돌리기 완료');
    process.exit(0);
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('❌ 실패 — 롤백:', e.message);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = {};
