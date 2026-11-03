'use strict';
/**
 * 브랜드(BG) 판매 재고 «가용량» — 단일 공식 (2026-11-03 Fable 설계 .claude/fable-design-20261103-stock-foresight-phase2.md §3)
 *
 * Irene: «재고 부족한 거 주문들어오면 브랜드제너럴에서 관리를 하게 해줘. 재고없음 표시되서 문제 인지하게.
 *         그리고 막을지 안막을지는 설정으로 할 수 있게 …»
 *
 * 뜻: 브랜드가 받아 두고 아직 안 보낸 매장 주문(OPEN_OUTBOUND_STATUSES · shipped_at NULL)을 **접수 순**으로
 *   재고에 배정한다. 그러면 ① 줄마다 «지금 재고로 못 채우는 양(short)» ② 다 배정한 뒤 «남은 양(pool)» 이 나온다.
 *   매장 화면 안내(seller_stock) · BG 받은 주문 배지(stock_short_*) · 막기(BRAND_STOCK_SHORT) · 1단계 committed 가
 *   전부 이 한 벌을 쓴다 — 숫자가 화면마다 갈라지지 않게.
 *
 * 프로덕트 → 재고 환산 = **출고 차감(routes/seller-orders.js 출고 블록)과 같은 갈래**:
 *   레시피(product_recipe_id) → Σ 주문수량 × 레시피양 (재고아이템 product_ingredients)
 *   다이렉트(product_ingredient_id) → 주문수량 × directDeductConversion.conv
 *   자체 재고(둘 다 없고 product_kind 없음/'stock') → brand_products.current_stock (주문 단위)
 *   그 밖(주문제작·서비스) → 세지 않는다
 */
const { Op } = require('sequelize');
const { OPEN_OUTBOUND_STATUSES } = require('./poStatuses');

const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const piKey = (id) => `pi:${Number(id)}`;
const bpKey = (id) => `bp:${Number(id)}`;

// ── 조회 ────────────────────────────────────────────────────────────────

/** 재고 주인(brands.owner_id)이 가진 브랜드 전부 — 같은 재고를 여러 브랜드가 깎는다 */
async function ownerBrandIds(ownerUserId) {
  if (!ownerUserId) return [];
  const Brand = require('../models/Brand');
  return (await Brand.findAll({ where: { owner_id: ownerUserId }, attributes: ['id'] })).map(b => Number(b.id));
}

/** 브랜드들의 열린 미출고 판매 줄 — 접수 순(먼저 들어온 주문이 먼저 가져간다) */
async function openOutboundLines(brandIds, { transaction } = {}) {
  if (!brandIds || !brandIds.length) return [];
  const { sequelize } = require('../config/database');
  return sequelize.query(
    `SELECT p.id po_id, i.id item_id, p.entity_type, p.entity_id, p.seller_entity_id brand_id,
            i.quantity_ordered qty, bp.id bp_id, bp.product_recipe_id rid, bp.product_ingredient_id pid,
            bp.product_kind, bp.current_stock bp_stock
       FROM purchase_order_items i
       JOIN purchase_orders p ON p.id = i.purchase_order_id
       JOIN ingredient_seller_products isp ON isp.id = i.ingredient_seller_product_id AND isp.seller_type = 'brand'
       JOIN brand_products bp ON bp.id = isp.seller_product_id
      WHERE p.seller_type = 'brand' AND p.seller_entity_id IN (:bids) AND p.status IN (:st) AND p.deleted_at IS NULL
        AND i.shipped_at IS NULL
      ORDER BY COALESCE(p.submitted_at, p.created_at), p.id, i.id`,
    { replacements: { bids: brandIds, st: OPEN_OUTBOUND_STATUSES }, type: sequelize.QueryTypes.SELECT, transaction });
}

/**
 * 프로덕트 → 「주문 1단위가 먹는 재고」 규칙 (출고 차감과 같은 갈래).
 * @param {Array<{bp_id, rid, pid, product_kind}>} products
 * @returns {Promise<Map<number, Array<{key, per}>>>}  bp_id → [{key:'pi:3'|'bp:7', per}] · 빈 배열 = 세지 않음
 */
async function productRules(products, { transaction } = {}) {
  const rules = new Map();
  const uniq = new Map();
  (products || []).forEach(p => { if (p && p.bp_id != null) uniq.set(Number(p.bp_id), p); });
  if (!uniq.size) return rules;
  const list = [...uniq.values()];

  const recipeIds = [...new Set(list.filter(p => p.rid).map(p => Number(p.rid)))];
  const byRecipe = new Map();
  if (recipeIds.length) {
    const { sequelize } = require('../config/database');
    const rows = await sequelize.query(
      `SELECT recipe_id, ingredient_id, quantity FROM product_recipe_ingredients WHERE recipe_id IN (:ids)`,
      { replacements: { ids: recipeIds }, type: sequelize.QueryTypes.SELECT, transaction });
    rows.forEach(r => {
      const k = Number(r.recipe_id);
      if (!byRecipe.has(k)) byRecipe.set(k, []);
      const q = Number(r.quantity) || 0;
      if (q > 0) byRecipe.get(k).push({ key: piKey(r.ingredient_id), per: q });
    });
  }

  const direct = list.filter(p => !p.rid && p.pid);
  const convByBp = new Map();
  if (direct.length) {
    const { BrandProduct, ProductIngredient } = require('../models');
    const { directDeductConversion } = require('../services/sellerLinkConversion');
    const bps = await BrandProduct.findAll({ where: { id: direct.map(p => Number(p.bp_id)) }, transaction, paranoid: false });
    const pis = await ProductIngredient.findAll({ where: { id: [...new Set(direct.map(p => Number(p.pid)))] }, transaction });
    const piById = new Map(pis.map(p => [Number(p.id), p]));
    bps.forEach(bp => {
      const st = piById.get(Number(bp.product_ingredient_id));
      if (st) convByBp.set(Number(bp.id), directDeductConversion({ stock: st, sellerProduct: bp }).conv);
    });
  }

  for (const p of list) {
    const id = Number(p.bp_id);
    if (p.rid) rules.set(id, byRecipe.get(Number(p.rid)) || []);
    else if (p.pid) {
      const conv = convByBp.get(id);
      rules.set(id, conv != null ? [{ key: piKey(p.pid), per: Number(conv) || 1 }] : []);
    } else if (!p.product_kind || p.product_kind === 'stock') rules.set(id, [{ key: bpKey(id), per: 1 }]);
    else rules.set(id, []);   // 주문제작·서비스 — 재고를 세지 않는다
  }
  return rules;
}

/** 재고 수량 — pi:{id} = 재고아이템 취급단위 · bp:{id} = 자체 재고 프로덕트 주문 단위 */
async function poolOnHand(keys, { transaction } = {}) {
  const out = new Map();
  const piIds = [], bpIds = [];
  (keys || []).forEach(k => { const [t, id] = k.split(':'); (t === 'pi' ? piIds : bpIds).push(Number(id)); });
  const { ProductIngredient, BrandProduct } = require('../models');
  if (piIds.length) (await ProductIngredient.findAll({ where: { id: [...new Set(piIds)] }, attributes: ['id', 'current_stock'], transaction }))
    .forEach(r => out.set(piKey(r.id), Number(r.current_stock) || 0));
  if (bpIds.length) (await BrandProduct.findAll({ where: { id: [...new Set(bpIds)] }, attributes: ['id', 'current_stock'], transaction, paranoid: false }))
    .forEach(r => out.set(bpKey(r.id), Number(r.current_stock) || 0));
  (keys || []).forEach(k => { if (!out.has(k)) out.set(k, 0); });
  return out;
}

// ── 순수 계산 (jest 대상) ────────────────────────────────────────────────

/**
 * 접수 순 배정.
 * @param {Array<{item_id, qty, bp_id}>} lines  접수 순
 * @param {Map<number, Array<{key, per}>>} rules
 * @param {Map<string, number>} onHand
 * @returns {{ lines: Object<item_id, {short_units, tracked, available_units}>, pool: Map<string, number> }}
 */
function allocate({ lines, rules, onHand }) {
  const pool = new Map(onHand);
  const out = {};
  for (const ln of lines || []) {
    const qty = Number(ln.qty) || 0;
    const needs = rules.get(Number(ln.bp_id)) || [];
    let short = 0;
    // 이 줄 차례에 남아 있던 양 → 주문 단위로 몇 개(가장 모자란 재료 기준 · 음수 = 이미 모자람)
    let availBefore = needs.length ? Infinity : null;
    for (const n of needs) availBefore = Math.min(availBefore, Math.floor((pool.has(n.key) ? pool.get(n.key) : 0) / n.per + 1e-9));
    for (const n of needs) {
      const need = qty * n.per;
      const left = pool.has(n.key) ? pool.get(n.key) : 0;
      const take = Math.min(need, Math.max(0, left));
      pool.set(n.key, r2(left - need));
      if (need > take + 1e-9) short = Math.max(short, Math.ceil((need - take) / n.per - 1e-9));
    }
    out[ln.item_id] = { short_units: short, tracked: needs.length > 0, available_units: availBefore };
  }
  return { lines: out, pool };
}

/** 프로덕트 하나를 지금(pool) 몇 단위 더 받을 수 있나 — 음수면 «이미 모자람». 세지 않는 종류는 null. */
function availableUnitsFor(rule, pool) {
  if (!rule || !rule.length) return null;
  let min = Infinity;
  for (const n of rule) {
    const left = pool.has(n.key) ? pool.get(n.key) : 0;
    min = Math.min(min, Math.floor(left / n.per + 1e-9));
  }
  return Number.isFinite(min) ? min : null;
}

/** 재고아이템별 약속한 양(취급단위) = 미출고 줄 필요량 합 — 1단계 committedOutboundBrand 와 같은 답 */
function committedByPi({ lines, rules }) {
  const out = new Map();
  for (const ln of lines || []) {
    const qty = Number(ln.qty) || 0;
    if (qty <= 0) continue;
    for (const n of rules.get(Number(ln.bp_id)) || []) {
      if (!n.key.startsWith('pi:')) continue;
      const id = Number(n.key.slice(3));
      out.set(id, r2((out.get(id) || 0) + qty * n.per));
    }
  }
  return out;
}

// ── 묶음 ─────────────────────────────────────────────────────────────────

/** 주인 하나의 배정 결과 — extraProducts 는 미출고 줄에 없어도 «남은 양» 을 알고 싶은 프로덕트 */
async function poolForOwner(ownerUserId, { extraProducts = [], transaction } = {}) {
  const brandIds = await ownerBrandIds(ownerUserId);
  const lines = await openOutboundLines(brandIds, { transaction });
  const rules = await productRules([...lines, ...extraProducts], { transaction });
  const keys = new Set();
  rules.forEach(r => r.forEach(n => keys.add(n.key)));
  const onHand = await poolOnHand([...keys], { transaction });
  const res = allocate({ lines, rules, onHand });
  // rawLines = 미출고 줄(접수 순) · alloc = 줄별 배정 결과(item_id →) · pool = 다 배정한 뒤 남은 양
  return { brandIds, rawLines: lines, rules, onHand, alloc: res.lines, pool: res.pool };
}

/** 프로덕트 id → { owner_user_id, rid, pid, product_kind } */
async function productMeta(bpIds, { transaction } = {}) {
  const ids = [...new Set((bpIds || []).map(Number).filter(Number.isFinite))];
  if (!ids.length) return new Map();
  const { BrandProduct } = require('../models');
  const rows = await BrandProduct.findAll({
    where: { id: ids }, attributes: ['id', 'owner_user_id', 'product_recipe_id', 'product_ingredient_id', 'product_kind'], transaction, paranoid: false
  });
  return new Map(rows.map(r => [Number(r.id), {
    bp_id: Number(r.id), owner: r.owner_user_id, rid: r.product_recipe_id, pid: r.product_ingredient_id, product_kind: r.product_kind
  }]));
}

/** 브랜드 행들의 재고 정책(막기 여부) — brands.operation_settings.stock */
async function policyByBrand(brandIds, { transaction } = {}) {
  const ids = [...new Set((brandIds || []).map(Number).filter(Number.isFinite))];
  const out = new Map();
  if (!ids.length) return out;
  const Brand = require('../models/Brand');
  const { stockSettingsOf } = require('./brandStockPolicy');
  (await Brand.findAll({ where: { id: ids }, attributes: ['id', 'operation_settings'], transaction }))
    .forEach(b => out.set(Number(b.id), stockSettingsOf(b.operation_settings).short_order_policy));
  return out;
}

/**
 * 매장 안내용 — [{ bpId, brandId }] → Map `${brandId}:${bpId}` → seller_stock | null
 *   seller_stock = { tracked:true, available_units, status:'ok'|'out', policy:'warn'|'block', computed_at }
 */
async function brandSellerStockMap(pairs, { transaction } = {}) {
  const out = new Map();
  const list = (pairs || []).filter(p => p && p.bpId != null);
  if (!list.length) return out;
  const meta = await productMeta(list.map(p => p.bpId), { transaction });
  const policies = await policyByBrand(list.map(p => p.brandId), { transaction });
  const byOwner = new Map();
  meta.forEach(m => { if (m.owner) { if (!byOwner.has(m.owner)) byOwner.set(m.owner, []); byOwner.get(m.owner).push(m); } });
  const now = new Date().toISOString();
  for (const [owner, prods] of byOwner) {
    const r = await poolForOwner(owner, { extraProducts: prods, transaction });
    for (const p of list) {
      const m = meta.get(Number(p.bpId));
      if (!m || m.owner !== owner) continue;
      const avail = availableUnitsFor(r.rules.get(Number(p.bpId)), r.pool);
      out.set(`${p.brandId}:${p.bpId}`, avail === null ? null : {
        tracked: true, available_units: avail, status: avail <= 0 ? 'out' : 'ok',
        policy: policies.get(Number(p.brandId)) || 'warn', computed_at: now
      });
    }
  }
  return out;
}

/** 공급처 줄들(sellerSources·sellers)에 seller_stock 을 붙인다 — 브랜드 줄만. 표시용(실패해도 목록은 준다). */
async function attachBrandSellerStock(sources) {
  const brandRows = (sources || []).filter(s => s && s.seller_type === 'brand' && s.seller_product_id && s.seller_entity_id);
  if (!brandRows.length) return;
  const map = await brandSellerStockMap(brandRows.map(s => ({ bpId: Number(s.seller_product_id), brandId: Number(s.seller_entity_id) })));
  brandRows.forEach(s => { s.seller_stock = map.get(`${Number(s.seller_entity_id)}:${Number(s.seller_product_id)}`) ?? null; });
}

/**
 * BG 받은 주문(목록·상세)에 줄별 부족을 붙인다 — 판매자가 브랜드인 주문만.
 *   item.stock_short_units · item.stock_available_units · item.stock_tracked · po.stock_short_count
 */
async function attachStockShortage(pos, { transaction } = {}) {
  const list = (Array.isArray(pos) ? pos : [pos]).filter(p => p && p.seller_type === 'brand');
  if (!list.length) return;
  const Brand = require('../models/Brand');
  const brandIds = [...new Set(list.map(p => Number(p.seller_entity_id)))];
  const owners = new Map((await Brand.findAll({ where: { id: brandIds }, attributes: ['id', 'owner_id'], transaction }))
    .map(b => [Number(b.id), b.owner_id]));
  const results = new Map();
  for (const owner of new Set([...owners.values()].filter(Boolean))) {
    results.set(owner, await poolForOwner(owner, { transaction }));
  }
  for (const po of list) {
    const r = results.get(owners.get(Number(po.seller_entity_id)));
    const open = r && OPEN_OUTBOUND_STATUSES.includes(po.status);
    let count = 0;
    for (const it of po.items || []) {
      const a = open && !it.shipped_at ? r.alloc[it.id] : null;
      it.stock_tracked = !!(a && a.tracked);
      it.stock_short_units = a ? a.short_units : 0;
      it.stock_available_units = a && a.tracked ? a.available_units : null;   // 이 줄 차례에 남아 있던 양(앞 주문 뒤)
      if (a && a.short_units > 0) count++;
    }
    po.stock_short_count = count;
  }
}

/** BG 받은 주문 요약 — 지금 재고로 다 못 보내는 열린 주문 수 */
async function stockShortOrderCount(brandIds, { transaction } = {}) {
  if (!brandIds || !brandIds.length) return 0;
  const Brand = require('../models/Brand');
  const want = new Set(brandIds.map(Number));
  const owners = new Set((await Brand.findAll({ where: { id: [...want] }, attributes: ['owner_id'], transaction }))
    .map(b => b.owner_id).filter(Boolean));
  const shortPos = new Set();
  for (const owner of owners) {
    const r = await poolForOwner(owner, { transaction });
    for (const ln of r.rawLines) {
      if (!want.has(Number(ln.brand_id))) continue;
      if (r.alloc[ln.item_id] && r.alloc[ln.item_id].short_units > 0) shortPos.add(Number(ln.po_id));
    }
  }
  return shortPos.size;
}

// ── 막기 ─────────────────────────────────────────────────────────────────

class BrandStockShortError extends Error {
  constructor(lines) {
    super('Brand stock is short for this order');
    this.name = 'BrandStockShortError';
    this.code = 'BRAND_STOCK_SHORT';
    this.status = 400;
    this.lines = lines;
  }
}

function brandStockShortErrorBody(err) {
  const names = (err.lines || []).map(l => `${l.description || l.seller_product_name} (up to ${l.available_units})`).filter(Boolean);
  return {
    success: false,
    code: 'BRAND_STOCK_SHORT',
    message: names.length
      ? `The brand can't accept more than its available stock right now: ${names.join(', ')}. Reduce the quantity to continue.`
      : 'The brand can\'t accept more than its available stock right now. Reduce the quantity to continue.',
    data: { lines: err.lines || [] }
  };
}

/**
 * 보내는 순간 검사 — 판매 브랜드 설정이 «막기(block)» 일 때만. 이 주문(아직 draft)의 브랜드 줄 필요량이
 * 다른 열린 주문을 다 배정한 뒤 남은 양을 넘으면 BrandStockShortError.
 * 호출 = 구매자가 보내는 길 3곳(assertLinesSellerProductActive 바로 뒤). 담기·출고·승인 뒤는 부르지 않는다.
 */
async function assertLinesWithinBrandStock(items, { transaction } = {}) {
  const withMap = (items || []).filter(it => it && it.ingredient_seller_product_id);
  if (!withMap.length) return;
  const { IngredientSellerProduct } = require('../models');
  const maps = await IngredientSellerProduct.findAll({
    where: { id: [...new Set(withMap.map(it => Number(it.ingredient_seller_product_id)))], seller_type: 'brand' },
    attributes: ['id', 'seller_entity_id', 'seller_product_id'], transaction
  });
  if (!maps.length) return;
  const mapById = new Map(maps.map(m => [Number(m.id), m]));
  const policies = await policyByBrand(maps.map(m => m.seller_entity_id), { transaction });
  const lines = withMap
    .map(it => ({ it, m: mapById.get(Number(it.ingredient_seller_product_id)) }))
    .filter(x => x.m && x.m.seller_product_id && policies.get(Number(x.m.seller_entity_id)) === 'block');
  if (!lines.length) return;

  const meta = await productMeta(lines.map(x => x.m.seller_product_id), { transaction });
  const byOwner = new Map();
  lines.forEach(x => { const m = meta.get(Number(x.m.seller_product_id)); if (m && m.owner) { if (!byOwner.has(m.owner)) byOwner.set(m.owner, []); byOwner.get(m.owner).push(x); } });
  const violations = [];
  for (const [owner, xs] of byOwner) {
    const r = await poolForOwner(owner, { extraProducts: xs.map(x => meta.get(Number(x.m.seller_product_id))), transaction });
    // 이 주문 줄들을 같은 pool 에서 차례로 — 같은 재료를 두 줄이 나눠 쓰면 둘째가 모자란다
    const mine = xs.map((x, i) => ({ item_id: `new${i}`, qty: Number(x.it.quantity_ordered) || 0, bp_id: Number(x.m.seller_product_id) }));
    const before = new Map(r.pool);
    const a = allocate({ lines: mine, rules: r.rules, onHand: before });
    xs.forEach((x, i) => {
      const res = a.lines[`new${i}`];
      if (res && res.tracked && res.short_units > 0) {
        const avail = availableUnitsFor(r.rules.get(Number(x.m.seller_product_id)), before);
        violations.push({
          item_id: x.it.id || null,
          description: x.it.description || null,
          requested: Number(x.it.quantity_ordered) || 0,
          available_units: avail === null ? null : Math.max(0, avail),
          order_unit: x.it.unit || null,
        });
      }
    });
  }
  if (violations.length) throw new BrandStockShortError(violations);
}

module.exports = {
  ownerBrandIds, openOutboundLines, productRules, poolOnHand,
  allocate, availableUnitsFor, committedByPi,
  poolForOwner, brandSellerStockMap, attachBrandSellerStock, attachStockShortage, stockShortOrderCount,
  BrandStockShortError, brandStockShortErrorBody, assertLinesWithinBrandStock,
};
