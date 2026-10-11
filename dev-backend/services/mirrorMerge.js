/**
 * services/mirrorMerge.js — 같은 물건인 브랜드 재료 두 줄 → 한 줄 (규칙 단일 소스)
 *
 * 2026-10-11 Fable 판정 `fable-verdict-20261011-stock-item-replace-on-delete.md` §3·§4:
 *   일회성 스크립트(scripts/migrate-brand-mirror-pairs-20261011.js)와 GIT «다른 재료로 바꾸고 삭제»
 *   (POST /api/product-ingredients/:id/replace)가 **같은 함수**를 쓴다. 규칙을 두 벌로 두면 화면과 스크립트가 다른 답을 낸다.
 *   Irene 2026-10-11: «이런거 연결된 재고아이템 삭제할 때 다른 재고아이템이나 프로덕트로 연결 교체하기 기능을 만들면 안돼?»
 *
 * 옮기기만 한다 — 레시피 줄은 ingredient_id 만 바꾸고 수량·단위는 그대로(9-12 F8 «줄을 지우는 것»과 다르다 · F8-2).
 * 지는 줄은 비활성 + 출처 비움(동기화가 되살리는 것 방지), 행 삭제 없음. 막는 조건은 skipReason 하나.
 * ⛔ 이름으로 짝 추측 · 거울 생성 · 수량·단위 환산 · 매장 소유 줄·메뉴 표 쓰기 — 없음.
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

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
async function skipReason(L, W, t, { ownerUserId } = {}) {
  if (!L || !W) return '줄 없음';
  if (L.id === W.id) return '같은 줄';
  if (L.owner_type !== 'brand' || W.owner_type !== 'brand') return '브랜드 재료가 아님';
  if (Number(L.brand_id) !== Number(W.brand_id)) return '브랜드가 다름';
  if (!Number(L.is_active)) return '지는 줄이 이미 비활성(이미 정리됨?)';
  if (!Number(W.is_active)) return '남는 줄이 비활성';
  // 화면 경로(교체하고 삭제)는 요청자가 그 브랜드의 주인일 때만 — 남의 브랜드 레시피는 건드리지 않는다(F8 선 · 2026-10-11 Fable 판정 §3-3)
  if (ownerUserId != null) {
    const [b] = await q(`SELECT owner_id FROM brands WHERE id = :b`, { b: L.brand_id }, t);
    if (!b || Number(b.owner_id) !== Number(ownerUserId)) return '다른 주인의 브랜드 재료 — 그 브랜드 주인만 바꿀 수 있음';
  }
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

async function mergePair(pair, t, { ownerUserId } = {}) {
  const { ensureSourceSellerLink } = require('./stockItemMirror');
  const { recomputeUnitCost } = require('./costSync');
  const { Ingredient, BrandProduct } = require('../models');
  const L = await ingRow(pair.loser, t);
  const W = await ingRow(pair.winner, t);
  const why = await skipReason(L, W, t, { ownerUserId });
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

module.exports = { skipReason, mergePair, undoPair, ingRow };
