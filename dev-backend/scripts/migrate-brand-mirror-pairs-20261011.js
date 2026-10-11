/**
 * scripts/migrate-brand-mirror-pairs-20261011.js — 같은 물건이 브랜드 재료 두 줄 → 한 줄 (일회성 · manual · 사람이 확인한 짝만)
 *
 * ## 왜 (Fable 판정 `fable-verdict-20261011-kdine-ingredient-tidy` §4-2 · §6)
 * Irene 2026-10-11: «Yukgaejang beef … 그리고 이것들은 왜 있어? 정돈이 계속 안되고 혼란스러워서 너무 심각한 상황이야.
 *   제대로 레시피사용, 브랜드메뉴 재료, 우리 납품 브랜드로 공급업체 연결 제대로 해줄 수는 없는 거야??»
 * 9/4 통합 때 기계가 옛 브랜드 재료에서 GIT 재고아이템을 새로 만들어 붙인 줄(재고아이템 출처)과, GIT 이 실제로 파는 상품의 줄
 * (상품 출처)이 같은 물건인데 따로 살아 있다. 매 배포 합치기 마이그(`migrate-merge-product-mirrors.js`)는 **발주 연결로 짝이
 * 확정된 쌍만** 합치므로, 이름이 다르고 연결이 없는 쌍은 영원히 남는다. 짝은 이름으로 추측하지 않는다 — **사람이 확인한 표**만 받는다.
 *
 * ## 입력
 *   --pairs=<json>  [{ "loser": 51, "winner": 75, "note": "육개장 소고기" }, …]  (지는 줄 → 남는 줄, Irene 확인 표 그대로)
 *
 * ## 쌍마다 (조건 미달이면 **그 쌍만 건너뛰고 목록** — 나머지는 진행)
 *   전제: 둘 다 같은 브랜드의 브랜드 재료 · 남는 줄 활성 · 지는 줄 매장 재고 줄 전부 0 · 지는 줄에 매장이 붙인 연결 0 ·
 *         지는 줄을 매장 레시피가 안 씀 · 취급 단위가 같거나, 남는 줄에 레시피 0·재고 0 이면 남는 줄이 지는 줄의 단위·기준숫자를
 *         물려받는다(합치기 마이그 ① 과 같은 규칙). 그 밖의 단위 차이(kg↔g 수량 환산 필요)는 건너뜀 — 수량은 손대지 않는다.
 *         한 레시피가 두 줄을 다 쓰면 건너뜀(레시피·재료 한 쌍은 한 줄 — 수량 합치기는 사람 몫).
 *   옮기기: 브랜드 레시피 줄 `ingredient_id` 지는 → 남는(수량·단위 무접촉) · 지는 줄의 공용 연결 → 남는 줄(같은 판매자·상품이 이미 있으면 그대로 둠)
 *   지는 줄: 비활성 + 출처 칼럼 비움(동기화가 is_active 를 복사해 되살리는 것 방지 — K-Bulgogi ① 과 같은 이유). 행 삭제 없음
 *   남는 줄: 상품 출처면 출처 연결 보장(ensureSourceSellerLink) + 원가 재계산(costSync — 식은 거기 한 곳)
 *   지는 줄의 재고아이템: 참조 0·재고 0 이면 비활성, 아니면 무접촉 + 목록(합치기 마이그 ④ 와 같은 SELECT)
 *
 * ## 증명 (쌍마다 — 하나라도 어긋나면 그 쌍을 되돌리고 중단)
 *   브랜드 레시피 줄 수 보존 · 줄 수량 합 보존 · 지는 줄 레시피 0 · 남는 줄 활성 · (상품 출처면) 출처 연결 1 · 죽은 참조 증가 0
 *
 * 사용 (기본 = 드라이런: 적용 → 증명 → 무조건 롤백)
 *   node scripts/migrate-brand-mirror-pairs-20261011.js --pairs=pairs.json
 *   node scripts/migrate-brand-mirror-pairs-20261011.js --pairs=pairs.json --apply        # 적용 + 영수증 JSON
 *   node scripts/migrate-brand-mirror-pairs-20261011.js --undo=<영수증> [--apply]           # 되돌리기(--apply 없으면 드라이런)
 * ⛔ 하지 않는 것: 이름으로 짝 추측 · 거울 생성 · 수량·단위 환산 · 매장 소유 줄(restaurant_id) 읽기/쓰기 · 메뉴 표 · 행 삭제
 */
const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.split('=').slice(1).join('=') : d; };
const APPLY = process.argv.includes('--apply');
const PAIRS = arg('pairs', null);
const UNDO = arg('undo', null);
const RECEIPT_DIR = arg('receipt-dir', '/var/www/backups/data-migrations');

const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });
const run = (sql, r, t) => sequelize.query(sql, { replacements: r, transaction: t });
const num = (v) => (v == null ? null : parseFloat(v));
const norm = (u) => String(u || '').trim().toLowerCase();

const ING_COLS = `id, name, owner_type, brand_id, restaurant_id, is_active, unit, base_quantity, package_unit, package_quantity,
  unit_cost, source_product_ingredient_id, source_brand_product_id`;
const ingRow = async (id, t) => (await q(`SELECT ${ING_COLS} FROM ingredients WHERE id = :id`, { id }, t))[0];
const brandLines = (id, t) => q(`SELECT ri.id, ri.quantity FROM recipe_ingredients ri JOIN recipes r ON r.id = ri.recipe_id
   WHERE ri.ingredient_id = :id AND r.owner_type = 'brand' ORDER BY ri.id`, { id }, t);
const deadCount = async (t) => Number((await q(`SELECT COUNT(*) n FROM recipe_ingredients ri
   JOIN ingredients i ON i.id = ri.ingredient_id WHERE i.is_active = 0`, {}, t))[0].n);
const sum = (rows) => Math.round(rows.reduce((a, r) => a + (num(r.quantity) || 0), 0) * 10000) / 10000;

/** 그 쌍을 하지 않을 이유 — 없으면 null */
async function skipReason(L, W, t) {
  if (!L || !W) return '줄 없음';
  if (L.id === W.id) return '같은 줄';
  if (L.owner_type !== 'brand' || W.owner_type !== 'brand') return '브랜드 재료가 아님';
  if (Number(L.brand_id) !== Number(W.brand_id)) return '브랜드가 다름';
  if (!Number(L.is_active)) return '지는 줄이 이미 비활성(이미 정리됨?)';
  if (!Number(W.is_active)) return '남는 줄이 비활성';
  const [ov] = await q(`SELECT COUNT(*) n FROM restaurant_ingredient_stocks WHERE ingredient_id = :id AND current_stock <> 0`, { id: L.id }, t);
  if (Number(ov.n)) return `지는 줄에 매장 재고가 남음(${ov.n}곳) — 매장 실사로 0 을 맞춘 뒤`;
  const [sl] = await q(`SELECT COUNT(*) n FROM ingredient_seller_products WHERE ingredient_id = :id AND buyer_restaurant_id IS NOT NULL AND is_active = 1`, { id: L.id }, t);
  if (Number(sl.n)) return `지는 줄에 매장이 붙인 공급처 연결 ${sl.n}건`;
  const [sr] = await q(`SELECT COUNT(*) n FROM recipe_ingredients ri JOIN recipes r ON r.id = ri.recipe_id
     WHERE ri.ingredient_id = :id AND r.owner_type <> 'brand'`, { id: L.id }, t);
  if (Number(sr.n)) return `지는 줄을 매장 레시피 ${sr.n}줄이 씀 — 이 스크립트 범위 밖`;
  // 한 레시피가 두 줄을 다 쓰면 옮길 수 없다(레시피·재료 한 쌍은 한 줄 — unique_recipe_ingredient). 수량을 합칠지는 사람 몫.
  const [both] = await q(`SELECT COUNT(*) n FROM recipe_ingredients a JOIN recipe_ingredients b ON b.recipe_id = a.recipe_id
     WHERE a.ingredient_id = :l AND b.ingredient_id = :w`, { l: L.id, w: W.id }, t);
  if (Number(both.n)) return `한 레시피가 두 줄을 다 씀(${both.n}개) — 수량 합치기는 손으로`;
  if (norm(L.unit) !== norm(W.unit)) {
    const wl = await brandLines(W.id, t);
    const [wov] = await q(`SELECT COUNT(*) n FROM restaurant_ingredient_stocks WHERE ingredient_id = :id AND current_stock <> 0`, { id: W.id }, t);
    if (wl.length || Number(wov.n)) return `단위가 다름(${L.unit} ↔ ${W.unit})인데 남는 줄에 레시피·재고가 있음 — 수량 환산이 필요해 손으로`;
  }
  return null;
}

async function applyPair(pair, t) {
  const { ensureSourceSellerLink } = require('../services/stockItemMirror');
  const { recomputeUnitCost } = require('../services/costSync');
  const { Ingredient, BrandProduct } = require('../models');
  const L = await ingRow(pair.loser, t);
  const W = await ingRow(pair.winner, t);
  const why = await skipReason(L, W, t);
  if (why) return { skipped: why };

  const preDead = await deadCount(t);
  const lLines = await brandLines(L.id, t);
  const wLines = await brandLines(W.id, t);
  const rec = { loser: L.id, winner: W.id, note: pair.note || null, loserBefore: L, winnerBefore: W,
    movedRecipeLineIds: lLines.map((r) => r.id), movedLinkIds: [], createdLinkId: null, piDeactivated: null, unitInherited: false };

  // 단위 물려받기(남는 줄에 레시피·재고 0 일 때만 — skipReason 이 보장)
  if (norm(L.unit) !== norm(W.unit)) {
    await run(`UPDATE ingredients SET unit = :u, base_quantity = :b WHERE id = :id`, { u: L.unit, b: num(L.base_quantity), id: W.id }, t);
    rec.unitInherited = true;
  }
  // 레시피 줄 — ingredient_id 만
  if (lLines.length) {
    await run(`UPDATE recipe_ingredients SET ingredient_id = :to WHERE id IN (:ids)`, { to: W.id, ids: rec.movedRecipeLineIds }, t);
  }
  // 공용 연결 — 같은 판매자·상품이 남는 줄에 이미 있으면 그대로 둔다
  const lLinks = await q(`SELECT id, seller_type, seller_entity_id, seller_product_id FROM ingredient_seller_products
     WHERE ingredient_id = :id AND buyer_restaurant_id IS NULL`, { id: L.id }, t);
  for (const k of lLinks) {
    const [dup] = await q(`SELECT COUNT(*) n FROM ingredient_seller_products WHERE ingredient_id = :w AND buyer_restaurant_id IS NULL
       AND seller_type = :st AND seller_entity_id <=> :se AND seller_product_id = :sp`,
      { w: W.id, st: k.seller_type, se: k.seller_entity_id, sp: k.seller_product_id }, t);
    if (Number(dup.n)) continue;
    await run(`UPDATE ingredient_seller_products SET ingredient_id = :w WHERE id = :id`, { w: W.id, id: k.id }, t);
    rec.movedLinkIds.push(k.id);
  }
  // 지는 줄 — 비활성 + 출처 비움
  await run(`UPDATE ingredients SET is_active = 0, source_product_ingredient_id = NULL, source_brand_product_id = NULL WHERE id = :id`, { id: L.id }, t);
  // 남는 줄 — 상품 출처면 출처 연결 + 원가
  if (W.source_brand_product_id) {
    const wm = await Ingredient.findByPk(W.id, { transaction: t });
    const bp = await BrandProduct.findByPk(W.source_brand_product_id, { transaction: t });
    if (bp) { const r = await ensureSourceSellerLink(wm, bp, { transaction: t }); if (r.created) rec.createdLinkId = r.id; }
  }
  const cost = await recomputeUnitCost('ingredient', W.id, { transaction: t, sequelize });
  // 지는 줄의 재고아이템 재평가(합치기 마이그 ④ 와 같은 SELECT)
  if (L.source_product_ingredient_id) {
    const piId = L.source_product_ingredient_id;
    const [c] = await q(`SELECT
        (SELECT COUNT(*) FROM product_recipe_ingredients x WHERE x.ingredient_id = :id) a,
        (SELECT COUNT(*) FROM purchase_order_items x WHERE x.product_ingredient_id = :id) b,
        (SELECT COUNT(*) FROM ingredient_seller_products x WHERE x.product_ingredient_id = :id) c,
        (SELECT COUNT(*) FROM ingredients x WHERE x.source_product_ingredient_id = :id AND x.is_active = 1) d,
        (SELECT COUNT(*) FROM brand_products x WHERE x.product_ingredient_id = :id) e,
        (SELECT COUNT(*) FROM products x WHERE x.ingredient_id = :id) f,
        (SELECT current_stock FROM product_ingredients WHERE id = :id) st,
        (SELECT is_active FROM product_ingredients WHERE id = :id) act`, { id: piId }, t);
    const refs = ['a', 'b', 'c', 'd', 'e', 'f'].reduce((s, k) => s + Number(c[k]), 0);
    if (refs === 0 && num(c.st) === 0 && Number(c.act) === 1) {
      await run(`UPDATE product_ingredients SET is_active = 0 WHERE id = :id`, { id: piId }, t);
      rec.piDeactivated = piId;
    } else rec.piKept = `PI#${piId} 참조 ${refs} · 재고 ${c.st} — 무접촉`;
  }

  // ── 증명 ──
  const wAfter = await brandLines(W.id, t);
  const lAfter = await brandLines(L.id, t);
  const Wn = await ingRow(W.id, t);
  const proofs = {
    lines: wAfter.length === lLines.length + wLines.length,
    qty: sum(wAfter) === Math.round((sum(lLines) + sum(wLines)) * 10000) / 10000,
    loserEmpty: lAfter.length === 0,
    winnerActive: Number(Wn.is_active) === 1,
    dead: (await deadCount(t)) - preDead === 0,
    sourceLink: true
  };
  if (W.source_brand_product_id) {
    const [s] = await q(`SELECT COUNT(*) n FROM ingredient_seller_products WHERE ingredient_id = :w AND buyer_restaurant_id IS NULL
       AND seller_type = 'brand' AND seller_entity_id = :b AND seller_product_id = :p AND is_active = 1`,
      { w: W.id, b: W.brand_id, p: W.source_brand_product_id }, t);
    proofs.sourceLink = Number(s.n) === 1;
  }
  rec.proofs = proofs;
  rec.cost = { loser: `${num(L.unit_cost)} / ${num(L.base_quantity)} ${L.unit}`, winnerBefore: `${num(W.unit_cost)} / ${num(W.base_quantity)} ${W.unit}`,
    winnerAfter: `${num(Wn.unit_cost)} / ${num(Wn.base_quantity)} ${Wn.unit}`, recompute: cost.skip ? `건너뜀: ${cost.skip}` : 'ok' };
  const bad = Object.entries(proofs).filter(([, v]) => !v).map(([k]) => k);
  if (bad.length) throw new Error(`쌍 ${L.id}→${W.id} 증명 실패: ${bad.join(', ')}`);
  return { rec };
}

async function undoPair(rec, t) {
  const L = rec.loserBefore, W = rec.winnerBefore;
  if (rec.movedRecipeLineIds.length) await run(`UPDATE recipe_ingredients SET ingredient_id = :l WHERE id IN (:ids)`, { l: L.id, ids: rec.movedRecipeLineIds }, t);
  if (rec.movedLinkIds.length) await run(`UPDATE ingredient_seller_products SET ingredient_id = :l WHERE id IN (:ids)`, { l: L.id, ids: rec.movedLinkIds }, t);
  if (rec.createdLinkId) await run(`DELETE FROM ingredient_seller_products WHERE id = :id`, { id: rec.createdLinkId }, t);
  await run(`UPDATE ingredients SET is_active = :a, source_product_ingredient_id = :spi, source_brand_product_id = :sbp WHERE id = :id`,
    { a: Number(L.is_active), spi: L.source_product_ingredient_id, sbp: L.source_brand_product_id, id: L.id }, t);
  await run(`UPDATE ingredients SET unit = :u, base_quantity = :b, unit_cost = :c WHERE id = :id`,
    { u: W.unit, b: num(W.base_quantity), c: num(W.unit_cost), id: W.id }, t);
  if (rec.piDeactivated) await run(`UPDATE product_ingredients SET is_active = 1 WHERE id = :id`, { id: rec.piDeactivated }, t);
}

(async () => {
  const t = await sequelize.transaction();
  try {
    if (UNDO) {
      const receipt = JSON.parse(fs.readFileSync(UNDO, 'utf8'));
      for (const rec of [...receipt.applied].reverse()) { await undoPair(rec, t); console.log(`되돌림 ${rec.loser} ← ${rec.winner}`); }
      if (APPLY) { await t.commit(); console.log('되돌리기 적용'); } else { await t.rollback(); console.log('드라이런 — 롤백 (적용하려면 --apply)'); }
      process.exit(0);
    }
    if (!PAIRS) { console.log('사용: --pairs=<json> [--apply] | --undo=<영수증> [--apply]'); await t.rollback(); process.exit(1); }
    const pairs = JSON.parse(fs.readFileSync(PAIRS, 'utf8'));
    const applied = [], skipped = [];
    for (const p of pairs) {
      const r = await applyPair(p, t);
      if (r.skipped) { skipped.push({ ...p, why: r.skipped }); console.log(`건너뜀 ${p.loser} → ${p.winner}${p.note ? ` (${p.note})` : ''}: ${r.skipped}`); continue; }
      applied.push(r.rec);
      const c = r.rec.cost;
      console.log(`합침 ${p.loser} → ${p.winner}${p.note ? ` (${p.note})` : ''}: 레시피 ${r.rec.movedRecipeLineIds.length}줄 · 연결 ${r.rec.movedLinkIds.length} · 새 출처 연결 ${r.rec.createdLinkId ? 1 : 0}`
        + `${r.rec.unitInherited ? ' · 단위 물려받음' : ''} · 원가 ${c.loser} → ${c.winnerAfter} (남는 줄 전 ${c.winnerBefore}, ${c.recompute})`
        + `${r.rec.piDeactivated ? ` · 재고아이템 PI#${r.rec.piDeactivated} 비활성` : ''}${r.rec.piKept ? ` · ${r.rec.piKept}` : ''}`);
    }
    console.log(`\n합침 ${applied.length} · 건너뜀 ${skipped.length}${APPLY ? '' : ' — 드라이런(롤백)'}`);
    if (APPLY) {
      await t.commit();
      fs.mkdirSync(RECEIPT_DIR, { recursive: true });
      const file = path.join(RECEIPT_DIR, `brand-mirror-pairs-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
      fs.writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), pairs, applied, skipped }, null, 2));
      console.log(`영수증: ${file}  (되돌리기: --undo=${file} --apply)`);
    } else await t.rollback();
    process.exit(0);
  } catch (e) {
    if (!t.finished) await t.rollback();
    console.error('실패 — 전부 롤백:', e.message);
    process.exit(1);
  }
})();
