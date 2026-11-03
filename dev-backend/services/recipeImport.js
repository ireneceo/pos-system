/**
 * 레시피 CSV 업로드 — 미리보기 · 확정 · 되돌리기 (2026-11-03 Fable 설계)
 *   설계: docs/RECIPE_MANAGEMENT_SYSTEM.md «CSV 업로드 + 표 보기»
 *   Irene 원문: «레시피 관리 페이지들에 CSV 업로드도 있어야 해 … 레시피 관리가 힘들어.»
 *
 * 규칙 요약 (설계 문서가 단일 진실):
 *   - CSV 형식 = 화면 «Download CSV» 13열 그대로(왕복). 빈 칸 = 유지. Recipe Cost·Source 는 무시.
 *   - 판정: 코드 → 이름 1건 → 새로 만들기. 범위(이 브랜드 / 이 매장의 owner_type 레시피) 밖은 절대 안 건드린다.
 *   - 재료는 **선택기와 같은 목록에서만** 이름으로 찾는다. 못 찾거나 겹치면 사람이 고른다.
 *     ⛔ 재료를 자동으로 만들지 않는다(docs/TRADE_STRUCTURE.md). 브랜드가 Stock Item·브랜드 상품을 고르면
 *     화면 저장과 같은 길(shareToBrand / shareProductToBrand)로 이 브랜드의 거울 줄에 붙는다.
 *   - 확정은 트랜잭션 하나(전부 아니면 전무). 수정한 레시피는 이전 모습을 import_history 에 남겨 되돌린다.
 *   - 확정은 미리보기와 **같은 함수**로 다시 평가한다 — 화면이 보낸 결과를 믿지 않는다.
 */
const csv = require('csv-parser');
const { Readable } = require('stream');
const crypto = require('crypto');
const { Op } = require('sequelize');
const {
  Recipe, RecipeIngredient, RecipeCategory, Ingredient, Restaurant, Brand, Product,
  ProductIngredient, BrandProduct
} = require('../models');
const ImportHistory = require('../models/ImportHistory');
const { sequelize } = require('../config/database');
const { UNITS, resolveLineCost } = require('../utils/recipeCost');
const { generateCode } = require('../utils/codeGenerator');
const { sanitizeString } = require('../middleware/validation');
const {
  loadIngredientMap, loadRestaurantCostOverrides, withOverrideCost, findDisallowedIngredientIds
} = require('./recipeIngredientResolve');

const MAX_ROWS = 500;
const NAME_MAX = 100;     // recipes.name STRING(100)
const CODE_MAX = 20;      // recipes.code STRING(20)
const SUMMARY_MAX = 500;  // recipes.instructions_summary STRING(500)
const QTY_MAX = 999999.9999; // recipe_ingredients.quantity DECIMAL(10,4)

class ImportError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}

// ── 작은 도구 ────────────────────────────────────────────────────────────────
const norm = (v) => String(v == null ? '' : v).trim().replace(/\s+/g, ' ').toLowerCase();
const headerKey = (h) => String(h || '').replace(/^﻿/, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const cell = (v) => (v == null ? '' : String(v).trim());
/** 내려받기와 같은 «한 줄로 펴기» — 비교는 이 모양끼리 한다. */
const flat = (v) => String(v || '').replace(/\r\n|\r|\n/g, ' | ').replace(/\s+/g, ' ').trim();
/** 내려받기의 역 — ` | ` 를 줄바꿈으로 되돌린다. */
const unflat = (v) => String(v || '').split(' | ').join('\n').trim();
/** 화면 수량 표기(utils/unitConversion.ts formatQuantity)와 같은 식 — 비교 기준. */
function formatQuantity(q) {
  const n = typeof q === 'number' ? q : parseFloat(q);
  if (!Number.isFinite(n)) return '0';
  return n.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}
const UNIT_BY_LOWER = Object.fromEntries(Object.keys(UNITS).map((u) => [u.toLowerCase(), u]));
const canonUnit = (u) => (u ? UNIT_BY_LOWER[String(u).toLowerCase()] || null : null);
// 레시피 재료 줄이 받는 단위(recipe_ingredients.unit ENUM) — 이 밖의 값은 DB 가 거부한다.
const LINE_UNITS = new Set(['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle']);

const HEADER_ALIASES = {
  recipename: 'name', name: 'name',
  category: 'category',
  source: 'source',
  yield: 'yield',
  ingredients: 'ingredients',
  recipesummary: 'summary', summary: 'summary',
  instructions: 'instructions',
  preptime: 'prep', preptimemin: 'prep',
  cooktime: 'cook', cooktimemin: 'cook',
  recipecost: 'cost',
  suggestedprice: 'price',
  recipecode: 'code', code: 'code',
  active: 'active'
};

function parseCsvBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const rows = [];
    let headers = [];
    const text = buffer.toString('utf-8').replace(/^﻿/, '');
    Readable.from([text])
      .pipe(csv({ mapHeaders: ({ header }) => HEADER_ALIASES[headerKey(header)] || null }))
      .on('headers', (h) => { headers = h.filter(Boolean); })
      // 모든 칸이 빈 줄(엑셀이 끝에 남기는 줄)은 버린다 — 오류 줄로 보이지 않게(2026-11-03 Fable 권고)
      .on('data', (row) => { if (Object.values(row).some((v) => String(v == null ? '' : v).trim())) rows.push(row); })
      .on('end', () => resolve({ rows, headers }))
      .on('error', reject);
  });
}

// ── 범위 ────────────────────────────────────────────────────────────────────
/** scope = { kind:'brand', brandId } | { kind:'restaurant', restaurantId } → 필요한 행을 붙여 돌려준다 */
async function loadScope(scope) {
  if (scope.kind === 'brand') {
    const brand = await Brand.findByPk(scope.brandId, { attributes: ['id', 'owner_id'] });
    if (!brand) throw new ImportError('Brand not found', 404);
    return { ...scope, brand };
  }
  const restaurant = await Restaurant.findByPk(scope.restaurantId, { attributes: ['id', 'brand_id'] });
  if (!restaurant) throw new ImportError('Restaurant not found', 404);
  return { ...scope, restaurant };
}
const ownerType = (scope) => (scope.kind === 'brand' ? 'brand' : 'restaurant');
const ownerId = (scope) => (scope.kind === 'brand' ? scope.brandId : scope.restaurantId);
const recipeWhere = (scope) => (scope.kind === 'brand'
  ? { owner_type: 'brand', brand_id: scope.brandId }
  : { owner_type: 'restaurant', restaurant_id: scope.restaurantId });
const historyWhere = (scope) => (scope.kind === 'brand'
  ? { owner_type: 'brand', brand_id: scope.brandId, import_type: 'recipes' }
  : { owner_type: 'restaurant', restaurant_id: scope.restaurantId, import_type: 'recipes' });

/**
 * 재료 이름 색인 — **선택기와 같은 후보**만.
 *   브랜드: ① 거울이 아닌 브랜드 재료 → ② GIT Stock Item·브랜드 상품(이미 이 브랜드 거울이 있으면 그 거울로)
 *           → ③ 그 밖의 거울(출처가 꺼졌거나 상품으로 팔리는 재고아이템의 옛 거울). 앞 단계에서 찾으면 뒤는 보지 않는다
 *           — 선택기가 «이미 같은 이름이 있으면 또 얹지 않는» 것과 같은 순서다.
 *   매장: 매장 재료 ∪ 부모 브랜드 재료(활성) 한 단계.
 * 반환: { tiers: [Map(norm → [cand])], universe: Map('kind:id' → cand) }
 *   cand = { kind:'ingredient'|'stock_item'|'brand_product', id, name, unit, source }
 */
async function buildIngredientNameIndex(scope) {
  const tiers = [];
  const universe = new Map();
  const put = (map, cand) => {
    const k = norm(cand.name);
    if (!k) return;
    const arr = map.get(k) || [];
    if (!arr.some((c) => c.kind === cand.kind && c.id === cand.id)) arr.push(cand);
    map.set(k, arr);
  };
  const reg = (cand) => { universe.set(`${cand.kind}:${cand.id}`, cand); return cand; };

  if (scope.kind === 'brand') {
    const brandIngs = await Ingredient.findAll({
      where: { owner_type: 'brand', brand_id: scope.brandId, is_active: true },
      attributes: ['id', 'name', 'unit', 'source_product_ingredient_id', 'source_brand_product_id']
    });
    const mirrorBySi = new Map();
    const mirrorByBp = new Map();
    const t1 = new Map();
    const mirrors = [];
    for (const i of brandIngs) {
      const cand = reg({ kind: 'ingredient', id: i.id, name: i.name, unit: i.unit, source: 'Brand ingredient' });
      if (i.source_product_ingredient_id) { if (!mirrorBySi.has(i.source_product_ingredient_id)) mirrorBySi.set(i.source_product_ingredient_id, cand); mirrors.push(cand); }
      else if (i.source_brand_product_id) { if (!mirrorByBp.has(i.source_brand_product_id)) mirrorByBp.set(i.source_brand_product_id, cand); mirrors.push(cand); }
      else put(t1, cand);
    }
    tiers.push(t1);

    const ownerUserId = scope.brand.owner_id;
    const t2 = new Map();
    if (ownerUserId != null) {
      const products = await BrandProduct.findAll({
        where: { owner_user_id: ownerUserId, is_active: true },
        attributes: ['id', 'name', 'unit', 'product_ingredient_id']
      });
      // 상품이 직접 가리키는 재고아이템은 선택기에서 빠진다(2026-10-11 R4) — 상품이 대신 뜬다.
      const soldSi = new Set(products.filter((p) => p.product_ingredient_id).map((p) => Number(p.product_ingredient_id)));
      const stocks = await ProductIngredient.findAll({
        where: { owner_user_id: ownerUserId, is_active: true },
        attributes: ['id', 'name', 'unit']
      });
      for (const s of stocks) {
        if (soldSi.has(Number(s.id))) continue;
        const m = mirrorBySi.get(s.id);
        // 거울이 이미 있으면 그 거울 — 사람이 «Stock item» 으로 골라 보내도 같은 거울로 받는다(별칭)
        if (m) universe.set(`stock_item:${s.id}`, m);
        put(t2, m ? { ...m, name: s.name } : reg({ kind: 'stock_item', id: s.id, name: s.name, unit: s.unit, source: 'Stock item' }));
      }
      for (const p of products) {
        const m = mirrorByBp.get(p.id);
        if (m) universe.set(`brand_product:${p.id}`, m);
        put(t2, m ? { ...m, name: p.name } : reg({ kind: 'brand_product', id: p.id, name: p.name, unit: p.unit, source: 'Brand product' }));
      }
    }
    tiers.push(t2);
    const t3 = new Map();
    mirrors.forEach((m) => put(t3, m));
    tiers.push(t3);
  } else {
    const { ownIngredientWhere, brandIngredientWhere } = require('../utils/restaurantStockScopes');
    const own = await Ingredient.findAll({ where: { ...ownIngredientWhere(scope.restaurant), is_active: true }, attributes: ['id', 'name', 'unit'] });
    const bw = brandIngredientWhere(scope.restaurant);
    const brandRows = bw ? await Ingredient.findAll({ where: bw, attributes: ['id', 'name', 'unit'] }) : [];
    const t1 = new Map();
    brandRows.forEach((i) => put(t1, reg({ kind: 'ingredient', id: i.id, name: i.name, unit: i.unit, source: 'Brand ingredient' })));
    own.forEach((i) => put(t1, reg({ kind: 'ingredient', id: i.id, name: i.name, unit: i.unit, source: 'Restaurant ingredient' })));
    tiers.push(t1);
  }
  return { tiers, universe };
}

function lookupName(index, name) {
  const k = norm(name);
  for (const tier of index.tiers) {
    const hits = tier.get(k);
    if (hits && hits.length) return hits;
  }
  return [];
}

// ── 칸 해석 ─────────────────────────────────────────────────────────────────
/** `이름 수량 단위 (메모); …` → [{ raw, name, quantity, unitToken, notes, error }] */
function parseIngredientsCell(text) {
  return String(text || '').split(';').map((s) => s.trim()).filter(Boolean).map((raw) => {
    let body = raw;
    let notes = '';
    if (body.endsWith(')')) {
      const open = body.lastIndexOf(' (');
      if (open > 0) { notes = body.slice(open + 2, -1).trim(); body = body.slice(0, open).trim(); }
    }
    const m = body.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*([A-Za-z]+)?$/);
    if (!m) return { raw, name: body, quantity: null, unitToken: null, notes, error: 'Quantity missing' };
    const quantity = parseFloat(m[2]);
    let error = null;
    if (!(quantity > 0)) error = 'Quantity must be more than 0';
    else if (quantity > QTY_MAX) error = 'Quantity too large';
    else if (formatQuantity(quantity) === '0') error = 'Quantity too small (shows as 0)';
    return { raw, name: m[1].trim(), quantity, unitToken: m[3] || null, notes, error };
  });
}

function parseYield(text) {
  const m = String(text).trim().match(/^(\d+(?:\.\d+)?)\s*([A-Za-z]+)?$/);
  if (!m) return { error: `Yield «${text}» — use «2 portion»` };
  const amount = parseFloat(m[1]);
  if (!(amount > 0)) return { error: 'Yield must be more than 0' };
  const unit = m[2] ? canonUnit(m[2]) : 'portion';
  if (!unit) return { error: `Unknown yield unit «${m[2]}»` };
  return { amount, unit };
}

function parseActive(text) {
  const v = norm(text);
  if (['y', 'yes', 'true', '1', 'active'].includes(v)) return true;
  if (['n', 'no', 'false', '0', 'inactive'].includes(v)) return false;
  return undefined;
}

// ── 평가 (미리보기·확정 공용) ─────────────────────────────────────────────────
/**
 * @param scope   loadScope 결과
 * @param rows    parseCsvBuffer().rows
 * @param matching { "<정규화 이름>": { kind, id } } — 미리보기에서 사람이 고른 재료
 * @returns { rows: [...], summary, total_rows, ctx }
 */
async function evaluate(scope, rows, matching = {}) {
  const recipes = await Recipe.findAll({
    where: recipeWhere(scope),
    include: [{ model: RecipeIngredient, as: 'recipeIngredients', include: [{ model: Ingredient, as: 'ingredient', attributes: ['id', 'name', 'unit'] }] }]
  });
  const byCode = new Map();
  const byName = new Map();
  for (const r of recipes) {
    if (r.code) byCode.set(norm(r.code), r);
    const k = norm(r.name);
    byName.set(k, [...(byName.get(k) || []), r]);
  }
  // 매장: 부모 브랜드 레시피는 매장에서 고칠 수 없다 — 코드가 그쪽을 가리키면 건너뛴다.
  let brandRecipeCodes = new Set();
  if (scope.kind === 'restaurant' && scope.restaurant.brand_id) {
    const br = await Recipe.findAll({ where: { owner_type: 'brand', brand_id: scope.restaurant.brand_id }, attributes: ['code'] });
    brandRecipeCodes = new Set(br.filter((r) => r.code).map((r) => norm(r.code)));
  }

  const catWhere = scope.kind === 'brand' ? { brand_id: scope.brandId } : { restaurant_id: scope.restaurantId };
  const ownCats = await RecipeCategory.findAll({ where: catWhere, attributes: ['id', 'name'] });
  const brandCats = scope.kind === 'restaurant' && scope.restaurant.brand_id
    ? await RecipeCategory.findAll({ where: { brand_id: scope.restaurant.brand_id, is_active: true }, attributes: ['id', 'name'] })
    : [];
  const catByName = new Map();
  [...brandCats, ...ownCats].forEach((c) => catByName.set(norm(c.name), c)); // 매장 자기 분류가 우선
  const newCats = new Map(); // norm → 표시 이름

  const index = await buildIngredientNameIndex(scope);

  const out = [];
  const targetLines = new Map(); // 대상 키 → [줄 번호]
  rows.forEach((row, i) => {
    const line = i + 2; // 머리글이 1번 줄
    const r = { line, action: 'Create', reason: '', name: cell(row.name), code: cell(row.code), category_name: cell(row.category), category_new: false, ingredients: [], changes: [], errors: [], _plan: null };
    const fail = (msg) => { r.errors.push(msg); };

    if (!r.name) fail('Recipe Name is empty');
    else if (r.name.length > NAME_MAX) fail(`Recipe Name longer than ${NAME_MAX}`);
    if (r.code.length > CODE_MAX) fail(`Recipe Code longer than ${CODE_MAX}`);

    // 매장: 브랜드 레시피 줄은 건너뛴다
    if (scope.kind === 'restaurant' && (norm(row.source) === 'brand' || (r.code && brandRecipeCodes.has(norm(r.code)) && !byCode.has(norm(r.code))))) {
      r.action = 'Skip';
      r.reason = 'Brand recipe — cannot be changed from the restaurant';
      out.push(r);
      return;
    }

    // 대상 판정
    let target = null;
    if (r.code && byCode.has(norm(r.code))) { target = byCode.get(norm(r.code)); }
    else if (!r.code && r.name) {
      const same = byName.get(norm(r.name)) || [];
      if (same.length === 1) { target = same[0]; r.reason = 'Matched by name'; }
      else if (same.length > 1) fail(`${same.length} recipes have this name — add the Recipe Code`);
    }
    r.action = target ? 'Update' : 'Create';
    r.recipe_id = target ? target.id : null;
    const tkey = target ? `r:${target.id}` : `c:${r.code ? norm(r.code) : 'n:' + norm(r.name)}`;
    targetLines.set(tkey, [...(targetLines.get(tkey) || []), out.length]);

    const fields = {};
    // 이름
    if (r.name && (!target || r.name !== target.name)) { fields.name = sanitizeString(r.name); if (target) r.changes.push('name'); }
    if (!target && r.code) fields.code = r.code;
    // 분류
    if (r.category_name) {
      const k = norm(r.category_name);
      const hit = catByName.get(k);
      const legacySame = target && !target.recipe_category_id && norm(target.category) === k;
      if (hit) {
        if (!target || (target.recipe_category_id !== hit.id && !legacySame)) { fields.recipe_category_id = hit.id; if (target) r.changes.push('category'); }
      } else if (!legacySame) {
        r.category_new = true;
        if (!newCats.has(k)) newCats.set(k, sanitizeString(r.category_name));
        fields.__newCategory = k;
        if (target) r.changes.push('category');
      }
    }
    // 분량
    if (cell(row.yield)) {
      const y = parseYield(cell(row.yield));
      if (y.error) fail(y.error);
      else if (!target || Number(target.yield_amount) !== y.amount || (target.yield_unit || 'portion') !== y.unit) {
        fields.yield_amount = y.amount; fields.yield_unit = y.unit; if (target) r.changes.push('yield');
      }
    }
    // 요약·조리법
    if (cell(row.summary)) {
      const v = unflat(cell(row.summary));
      if (v.length > SUMMARY_MAX) fail(`Recipe Summary longer than ${SUMMARY_MAX}`);
      else if (!target || flat(target.instructions_summary) !== flat(cell(row.summary))) { fields.instructions_summary = v; if (target) r.changes.push('summary'); }
    }
    if (cell(row.instructions)) {
      const v = unflat(cell(row.instructions));
      if (!target || flat(target.instructions_detail || target.instructions) !== flat(cell(row.instructions))) { fields.instructions_detail = v; if (target) r.changes.push('instructions'); }
    }
    // 시간
    for (const [col, key] of [['prep', 'prep_time'], ['cook', 'cook_time']]) {
      const v = cell(row[col]);
      if (!v) continue;
      if (!/^\d+$/.test(v)) { fail(`${col === 'prep' ? 'Prep' : 'Cook'} Time must be whole minutes`); continue; }
      const n = parseInt(v, 10);
      if (!target || Number(target[key]) !== n || target[key] == null) { fields[key] = n; if (target) r.changes.push(key === 'prep_time' ? 'prep' : 'cook'); }
    }
    // 가격
    if (cell(row.price)) {
      const n = Number(cell(row.price).replace(/[,\s]/g, '').replace(/^[^\d.-]+/, ''));
      if (!Number.isFinite(n) || n < 0) fail('Suggested Price must be a number');
      else if (!target || Number(target.suggested_price) !== Math.round(n * 100) / 100) { fields.suggested_price = Math.round(n * 100) / 100; if (target) r.changes.push('price'); }
    }
    // 활성
    if (cell(row.active)) {
      const a = parseActive(cell(row.active));
      if (a === undefined) fail('Active must be Y or N');
      else if (!target || !!target.is_active !== a) { fields.is_active = a; if (target) r.changes.push('active'); }
    }

    // 재료
    let lines = null;
    if (cell(row.ingredients)) {
      const existingByName = new Map();
      (target?.recipeIngredients || []).forEach((ri) => {
        if (ri.ingredient) existingByName.set(norm(ri.ingredient.name), { kind: 'ingredient', id: ri.ingredient.id, name: ri.ingredient.name, unit: ri.ingredient.unit, source: 'In this recipe' });
      });
      const parsed = parseIngredientsCell(cell(row.ingredients));
      const seen = new Set();
      lines = parsed.map((p) => {
        const li = { raw: p.raw, name: p.name, quantity: p.quantity, unit: null, notes: p.notes, status: 'ok', kind: null, target_id: null, ingredient_id: null, candidates: [], error: p.error };
        const pick = matching[norm(p.name)];
        let hit = null;
        if (pick && universeHas(index, existingByName, pick)) hit = universeGet(index, existingByName, pick);
        else if (existingByName.has(norm(p.name))) hit = existingByName.get(norm(p.name));
        else {
          const hits = lookupName(index, p.name);
          if (hits.length === 1) hit = hits[0];
          else if (hits.length > 1) { li.status = 'ambiguous'; li.candidates = hits.map(publicCand); }
          else li.status = 'not_found';
        }
        if (hit) {
          li.kind = hit.kind; li.target_id = hit.id; li.matched_name = hit.name;
          if (hit.kind === 'ingredient') li.ingredient_id = hit.id;
          // 단위: 적힌 단위가 줄 단위 목록에 있으면 그것, 없으면 재료의 단위(거울이 아직 없으면 저장 때 거울 단위).
          const tokenUnit = canonUnit(p.unitToken);
          if (tokenUnit && !LINE_UNITS.has(tokenUnit)) li.error = li.error || `Unit «${p.unitToken}» can't be used for ingredients — use ${[...LINE_UNITS].join(', ')}`;
          li.unit = (tokenUnit && LINE_UNITS.has(tokenUnit)) ? tokenUnit : (LINE_UNITS.has(hit.unit) ? hit.unit : null);
          const key = `${hit.kind}:${hit.id}`;
          if (seen.has(key)) { li.status = 'duplicate'; li.error = li.error || 'Same ingredient twice in this recipe'; }
          seen.add(key);
        }
        if (li.error && li.status === 'ok') li.status = 'invalid';
        return li;
      });
      r.ingredients = lines.map(publicLine);
      const bad = lines.filter((l) => l.status !== 'ok');
      if (bad.length) {
        const nf = bad.filter((l) => l.status === 'not_found').length;
        const am = bad.filter((l) => l.status === 'ambiguous').length;
        if (nf) fail(`${nf} ingredient${nf > 1 ? 's' : ''} not found — choose ${nf > 1 ? 'them' : 'it'} below`);
        if (am) fail(`${am} ingredient name${am > 1 ? 's match' : ' matches'} several items — choose below`);
        bad.filter((l) => l.status === 'duplicate' || l.status === 'invalid').forEach((l) => fail(`«${l.raw}»: ${l.error}`));
      } else if (target) {
        const keyOf = (id, q, u, n) => `${id}|${formatQuantity(q)}|${u || ''}|${flat(n)}`;
        const before = (target.recipeIngredients || []).map((ri) => keyOf(ri.ingredient_id, ri.quantity, ri.unit, ri.notes)).sort();
        const after = lines.map((l) => (l.kind === 'ingredient' ? keyOf(l.ingredient_id, l.quantity, l.unit, l.notes) : `new:${l.kind}:${l.target_id}`)).sort();
        if (before.join('\n') === after.join('\n')) lines = null; // 같으면 재료는 손대지 않는다 — 원래 수량(소수 4자리)을 지킨다
        else r.changes.push('ingredients');
      }
    }

    if (!target) {
      if (!lines && !cell(row.ingredients)) { /* 재료 없는 새 레시피 허용 — 화면과 같다 */ }
    }
    r._plan = { target, fields, lines };
    out.push(r);
  });

  // 파일 안 중복 — 같은 레시피를 두 줄이 가리키면 둘 다 오류
  for (const [, idxs] of targetLines) {
    if (idxs.length > 1) idxs.forEach((ix) => out[ix].errors.push(`Same recipe appears on lines ${idxs.map((j) => out[j].line).join(', ')}`));
  }

  // 소유 범위 검증 — 이미 있는 재료 줄 id 를 한 번에(화면 저장과 같은 함수)
  const ingIds = [];
  out.forEach((r) => (r._plan?.lines || []).forEach((l) => { if (l.kind === 'ingredient') ingIds.push({ ingredient_id: l.ingredient_id }); }));
  if (ingIds.length) {
    const bad = new Set(await findDisallowedIngredientIds(ingIds, scope.kind === 'brand' ? { brandId: scope.brandId } : { restaurantId: scope.restaurantId }));
    if (bad.size) {
      out.forEach((r) => (r._plan?.lines || []).forEach((l) => {
        if (l.kind === 'ingredient' && bad.has(Number(l.ingredient_id))) r.errors.push(`«${l.name}» is not available here`);
      }));
    }
  }

  // 최종 동작
  const summary = { create: 0, update: 0, unchanged: 0, skip: 0, error: 0, new_categories: 0 };
  const usedNewCats = new Set();
  for (const r of out) {
    if (r.action !== 'Skip') {
      if (r.errors.length) { r.action = 'Error'; r.reason = r.errors.join(' · '); }
      else if (r.action === 'Update' && !r.changes.length) { r.action = 'Unchanged'; r.reason = r.reason || 'No changes'; }
      else if (r.action === 'Update') r.reason = [r.reason, `Changes: ${r.changes.join(', ')}`].filter(Boolean).join(' · ');
    }
    if ((r.action === 'Create' || r.action === 'Update') && r._plan.fields.__newCategory) usedNewCats.add(r._plan.fields.__newCategory);
    summary[r.action.toLowerCase()] += 1;
  }
  summary.new_categories = usedNewCats.size;
  const newCategoryNames = [...usedNewCats].map((k) => newCats.get(k));
  return { rows: out, summary, total_rows: out.length, newCats: new Map([...usedNewCats].map((k) => [k, newCats.get(k)])), new_category_names: newCategoryNames };
}

function universeHas(index, existingByName, pick) {
  const key = `${pick.kind}:${parseInt(pick.id, 10)}`;
  if (index.universe.has(key)) return true;
  return [...existingByName.values()].some((c) => `${c.kind}:${c.id}` === key);
}
function universeGet(index, existingByName, pick) {
  const key = `${pick.kind}:${parseInt(pick.id, 10)}`;
  return index.universe.get(key) || [...existingByName.values()].find((c) => `${c.kind}:${c.id}` === key);
}
const publicCand = (c) => ({ kind: c.kind, id: c.id, name: c.name, unit: c.unit, source: c.source });
const publicLine = (l) => ({
  raw: l.raw, name: l.name, quantity: l.quantity, unit: l.unit, notes: l.notes || '',
  status: l.status, kind: l.kind, id: l.target_id, matched_name: l.matched_name || null,
  candidates: l.candidates, error: l.error || null
});

/** 응답용 — 내부 계획(_plan)을 뺀다 */
function publicResult(ev) {
  return {
    rows: ev.rows.map(({ _plan, errors, ...rest }) => rest),
    summary: ev.summary,
    total_rows: ev.total_rows,
    new_categories: ev.new_category_names
  };
}

// ── 공개 API ────────────────────────────────────────────────────────────────
async function readFile(file) {
  if (!file || !file.buffer) throw new ImportError('CSV file is required');
  const { rows, headers } = await parseCsvBuffer(file.buffer);
  if (!headers.includes('name')) throw new ImportError('«Recipe Name» column not found — use the downloaded CSV or the template');
  if (!rows.length) throw new ImportError('The CSV has no rows');
  if (rows.length > MAX_ROWS) throw new ImportError(`Too many rows (${rows.length}) — up to ${MAX_ROWS} per file`);
  return rows;
}

function parseMatching(raw) {
  if (!raw) return {};
  try {
    const m = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!m || typeof m !== 'object' || Array.isArray(m)) return {};
    const out = {};
    for (const [k, v] of Object.entries(m)) {
      if (v && ['ingredient', 'stock_item', 'brand_product'].includes(v.kind) && Number.isFinite(parseInt(v.id, 10))) out[norm(k)] = { kind: v.kind, id: parseInt(v.id, 10) };
    }
    return out;
  } catch (_) { return {}; }
}

async function preview(rawScope, file, matchingRaw) {
  const scope = await loadScope(rawScope);
  const rows = await readFile(file);
  const ev = await evaluate(scope, rows, parseMatching(matchingRaw));
  return publicResult(ev);
}

const running = new Set(); // 같은 범위 동시 확정 1건

async function execute(rawScope, file, matchingRaw, user) {
  const scope = await loadScope(rawScope);
  const rows = await readFile(file);
  const lockKey = `${scope.kind}:${ownerId(scope)}`;
  if (running.has(lockKey)) throw new ImportError('Another import is running for this list — try again in a moment', 409);
  running.add(lockKey);
  try {
    const ev = await evaluate(scope, rows, parseMatching(matchingRaw));
    const todo = ev.rows.filter((r) => r.action === 'Create' || r.action === 'Update');
    if (!todo.length) throw new ImportError('Nothing to import — every row is unchanged, skipped or has an error');

    const { syncPrepIngredientForRecipe, PrepError } = require('./prepIngredientSync');
    const { shareToBrand, shareProductToBrand } = require('./stockItemMirror');
    const t = await sequelize.transaction();
    const created = [];
    const updated = [];
    const categoriesCreated = [];
    const snapshot = {};
    let currentLine = null;
    try {
      // 1) 새 분류
      const catIdByNorm = new Map();
      if (ev.newCats.size) {
        const catWhere = scope.kind === 'brand' ? { brand_id: scope.brandId } : { restaurant_id: scope.restaurantId };
        let order = (await RecipeCategory.max('display_order', { where: catWhere, transaction: t })) || 0;
        for (const [k, name] of ev.newCats) {
          order += 1;
          const c = await RecipeCategory.create({
            owner_type: ownerType(scope),
            brand_id: scope.kind === 'brand' ? scope.brandId : null,
            restaurant_id: scope.kind === 'restaurant' ? scope.restaurantId : null,
            name, display_order: order
          }, { transaction: t });
          catIdByNorm.set(k, c.id);
          categoriesCreated.push(c.id);
        }
      }

      // 2) 재료 줄이 가리킬 재료 행 — 이미 있는 것은 읽고, 브랜드가 고른 Stock Item·상품은 거울로
      const existingIds = [];
      todo.forEach((r) => (r._plan.lines || []).forEach((l) => { if (l.kind === 'ingredient') existingIds.push({ ingredient_id: l.ingredient_id }); }));
      const ingMap = await loadIngredientMap(existingIds);
      const mirrorMemo = new Map();
      const resolveLine = async (l) => {
        if (l.kind === 'ingredient') return l.ingredient_id;
        const key = `${l.kind}:${l.target_id}`;
        if (mirrorMemo.has(key)) return mirrorMemo.get(key);
        let ing;
        if (l.kind === 'stock_item') {
          const stock = await ProductIngredient.findByPk(l.target_id, { transaction: t });
          ({ ingredient: ing } = await shareToBrand(stock, scope.brandId, { transaction: t }));
        } else {
          const product = await BrandProduct.findByPk(l.target_id, { transaction: t });
          ({ ingredient: ing } = await shareProductToBrand(product, scope.brandId, { transaction: t }));
        }
        ingMap.set(ing.id, ing);
        mirrorMemo.set(key, ing.id);
        return ing.id;
      };

      // 3) 줄마다 저장
      for (const r of todo) {
        currentLine = r.line;
        const { target, fields, lines } = r._plan;
        const data = { ...fields };
        if (data.__newCategory) { data.recipe_category_id = catIdByNorm.get(data.__newCategory); }
        delete data.__newCategory;

        let recipe;
        if (target) {
          recipe = await Recipe.findByPk(target.id, { transaction: t, lock: t.LOCK.UPDATE });
          const prevLines = await RecipeIngredient.findAll({ where: { recipe_id: recipe.id }, transaction: t });
          snapshot[recipe.id] = {
            recipe: pickSnapshot(recipe),
            ingredients: prevLines.map((ri) => ({ ingredient_id: ri.ingredient_id, quantity: ri.quantity, unit: ri.unit, cost: ri.cost, notes: ri.notes }))
          };
          if (Object.keys(data).length) await recipe.update(data, { transaction: t });
          updated.push(recipe.id);
        } else {
          const code = data.code || await generateCode(Recipe, 'RCP', { ownerType: ownerType(scope), ownerId: ownerId(scope), transaction: t });
          recipe = await Recipe.create({
            owner_type: ownerType(scope),
            brand_id: scope.kind === 'brand' ? scope.brandId : null,
            restaurant_id: scope.kind === 'restaurant' ? scope.restaurantId : null,
            yield_amount: 1, yield_unit: 'portion', suggested_price: 0, total_ingredient_cost: 0, is_active: true,
            ...data,
            code
          }, { transaction: t });
          created.push(recipe.id);
        }

        if (lines) {
          const prevCost = new Map((snapshot[recipe.id]?.ingredients || []).map((x) => [x.ingredient_id, x.cost]));
          const items = [];
          for (const l of lines) {
            const ingredientId = await resolveLine(l);
            const unit = l.unit || ingMap.get(ingredientId)?.unit;
            if (!LINE_UNITS.has(unit)) throw new ImportError(`Line ${r.line}: «${l.name}» has no usable unit — write one (${[...LINE_UNITS].join(', ')}) — nothing was imported`);
            items.push({ ingredient_id: ingredientId, quantity: l.quantity, unit, notes: l.notes || null });
          }
          const overrides = scope.kind === 'restaurant' ? await loadRestaurantCostOverrides(scope.restaurantId, items) : new Map();
          await RecipeIngredient.destroy({ where: { recipe_id: recipe.id }, transaction: t });
          let total = 0;
          for (const it of items) {
            const ing = ingMap.get(it.ingredient_id);
            const cost = resolveLineCost(scope.kind === 'restaurant' ? withOverrideCost(ing, overrides.get(it.ingredient_id)) : ing, it, prevCost.get(it.ingredient_id));
            await RecipeIngredient.create({ recipe_id: recipe.id, ...it, cost }, { transaction: t });
            total += cost;
          }
          await recipe.update({ total_ingredient_cost: total }, { transaction: t });
        }
        // 준비 재료면 이름·단위·원가를 다시 맞춘다(스위치는 건드리지 않음)
        await syncPrepIngredientForRecipe(recipe, undefined, { transaction: t });
      }
      currentLine = null;

      const batchId = `rcp-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      const skipped = ev.rows.filter((r) => r.action === 'Skip' || r.action === 'Unchanged').length;
      const failed = ev.rows.filter((r) => r.action === 'Error').length;
      const history = await ImportHistory.create({
        batch_id: batchId,
        owner_type: ownerType(scope),
        brand_id: scope.kind === 'brand' ? scope.brandId : null,
        restaurant_id: scope.kind === 'restaurant' ? scope.restaurantId : null,
        user_id: user?.id || null,
        import_type: 'recipes',
        file_name: file.originalname ? String(file.originalname).slice(0, 255) : null,
        total_rows: ev.total_rows,
        success_count: todo.length,
        skipped_count: skipped,
        failed_count: failed,
        imported_ids: JSON.stringify({ created, updated, categories_created: categoriesCreated }),
        undo_snapshot: JSON.stringify(snapshot),
        status: 'completed'
      }, { transaction: t });
      await t.commit();
      return {
        batch_id: history.batch_id,
        created: created.length,
        updated: updated.length,
        categories_created: categoriesCreated.length,
        not_imported: ev.rows.filter((r) => !['Create', 'Update'].includes(r.action)).map((r) => ({ line: r.line, name: r.name, action: r.action, reason: r.reason }))
      };
    } catch (e) {
      await t.rollback();
      if (e instanceof PrepError) throw new ImportError(`Line ${currentLine}: ${e.message} — nothing was imported`, e.status || 400);
      throw e;
    }
  } finally {
    running.delete(lockKey);
  }
}

const SNAP_FIELDS = ['name', 'code', 'category', 'recipe_category_id', 'yield_amount', 'yield_unit', 'prep_time', 'cook_time',
  'instructions', 'instructions_summary', 'instructions_detail', 'suggested_price', 'is_active', 'total_ingredient_cost'];
function pickSnapshot(recipe) {
  const o = {};
  SNAP_FIELDS.forEach((f) => { o[f] = recipe.get(f); });
  return o;
}

async function undo(rawScope, batchId) {
  const scope = await loadScope(rawScope);
  const h = await ImportHistory.findOne({ where: { ...historyWhere(scope), batch_id: String(batchId) } });
  if (!h) throw new ImportError('Import not found', 404);
  if (h.status !== 'completed') throw new ImportError('This import was already undone');
  const ids = JSON.parse(h.imported_ids || '{}');
  const snap = JSON.parse(h.undo_snapshot || '{}');
  const since = new Date(h.createdAt).getTime();
  const { disablePrepIngredient, syncPrepIngredientForRecipe, PrepError } = require('./prepIngredientSync');
  const skipped = [];
  let deleted = 0;
  let restored = 0;
  const t = await sequelize.transaction();
  try {
    for (const id of ids.created || []) {
      const recipe = await Recipe.findOne({ where: { id, ...recipeWhere(scope) }, transaction: t });
      if (!recipe) continue;
      if (new Date(recipe.updated_at).getTime() > since + 1000) { skipped.push({ id, name: recipe.name, reason: 'Changed after the import' }); continue; }
      const sp = await sequelize.transaction({ transaction: t });
      try {
        await disablePrepIngredient(recipe.id, { transaction: sp });
        await Product.update({ recipe_id: null }, { where: { recipe_id: recipe.id }, transaction: sp });
        await recipe.destroy({ transaction: sp });
        await sp.commit();
        deleted += 1;
      } catch (e) {
        await sp.rollback();
        skipped.push({ id, name: recipe.name, reason: e instanceof PrepError ? e.message : 'In use elsewhere' });
      }
    }
    for (const id of ids.updated || []) {
      const before = snap[id];
      const recipe = await Recipe.findOne({ where: { id, ...recipeWhere(scope) }, transaction: t, lock: t.LOCK.UPDATE });
      if (!recipe || !before) continue;
      if (new Date(recipe.updated_at).getTime() > since + 1000) { skipped.push({ id, name: recipe.name, reason: 'Changed after the import' }); continue; }
      await recipe.update(before.recipe, { transaction: t });
      await RecipeIngredient.destroy({ where: { recipe_id: recipe.id }, transaction: t });
      for (const ri of before.ingredients || []) await RecipeIngredient.create({ recipe_id: recipe.id, ...ri }, { transaction: t });
      await syncPrepIngredientForRecipe(recipe, undefined, { transaction: t });
      restored += 1;
    }
    let categoriesRemoved = 0;
    for (const cid of ids.categories_created || []) {
      const uses = await Recipe.count({ where: { recipe_category_id: cid }, transaction: t });
      if (uses) continue;
      categoriesRemoved += await RecipeCategory.destroy({ where: { id: cid }, transaction: t });
    }
    await h.update({ status: 'undone' }, { transaction: t });
    await t.commit();
    return { deleted, restored, categories_removed: categoriesRemoved, skipped };
  } catch (e) {
    await t.rollback();
    if (e instanceof PrepError) throw new ImportError(e.message, e.status || 400);
    throw e;
  }
}

async function history(rawScope) {
  const scope = await loadScope(rawScope);
  const rows = await ImportHistory.findAll({
    where: historyWhere(scope),
    attributes: ['batch_id', 'file_name', 'total_rows', 'success_count', 'skipped_count', 'failed_count', 'imported_ids', 'status', 'createdAt'],
    order: [['createdAt', 'DESC']],
    limit: 10
  });
  return rows.map((r) => {
    let ids = {};
    try { ids = JSON.parse(r.imported_ids || '{}'); } catch (_) { /* 옛 행 */ }
    return {
      batch_id: r.batch_id, file_name: r.file_name, total_rows: r.total_rows,
      created: (ids.created || []).length, updated: (ids.updated || []).length,
      skipped: r.skipped_count, failed: r.failed_count, status: r.status, created_at: r.createdAt
    };
  });
}

module.exports = {
  ImportError, preview, execute, undo, history,
  // 검사용
  parseIngredientsCell, parseYield, buildIngredientNameIndex, formatQuantity, MAX_ROWS
};
