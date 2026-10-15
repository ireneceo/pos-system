/**
 * 판매자 주문 수정(amend) — 판정 단일 소스.
 *
 * 원칙 (2026-10-15 Fable 설계 — Irene «브랜드제너럴이 추가하고 수정하는게 자유로워야 해» 로 09-24 원칙 대체):
 *   **발주서는 구매자의 돈 약속이다. 판매자는 그 약속을 줄이거나 바꿀 수 있고, 늘릴 때는
 *   ①판매자가 확인하고(confirm_increase) ②구매자에게 전후 금액이 안내되며
 *   ③오너 승인이 켜진 매장이면 새 주문과 같은 승인을 다시 받는다(poOwnerApproval.applyAmendRaiseGate).**
 *   (옛 원칙 2026-09-24: «구매자 동의 없이 늘릴 수 없다» — 대리 주문 추가는 상한이 없는데 인상만 막아 일관성이 없었다.)
 *
 * ⚠ 왜 판정이 여기 한 곳인가: 후보 목록(GET amendable-products)과 실제 수정(POST amend)이
 *   **서로 다른 조건**을 쓰면 "화면엔 떴는데 저장하면 400" 이거나 그 반대가 된다.
 *   둘 다 이 파일의 `mappingUsableBy` 를 부른다. (메모리 feedback_check_and_fix_same_sql)
 */

const { Ingredient, Product, IngredientSellerProduct } = require('../models');
const { resolveStockTarget, stockTargetAttrs } = require('./stockTarget');
const { readableIngredient, sellerLinkVisible } = require('./brandStockAccess');
const { resolveOrderLine } = require('./poLineSpec');
const { attachSellerProductActive } = require('./poSellerProductActive');
const { attachSellerProductIdentity, supplierFacingName } = require('./sellerProductIdentity');
const { optionsArray, optionsAdjustment, optionsKey, descriptionWithOptions } = require('./poLineOptions');

/** 판매자가 고칠 수 있는 상태 = 출고 전. shipped 이후는 물건이 이미 나갔다. */
const AMENDABLE_STATUSES = ['submitted', 'confirmed'];

/** 발주에서 구매자 주체를 꺼낸다 (판매자 라우트에는 req.buyerEntity 가 없다). */
function buyerEntityOf(po) {
  return { type: po.entity_type, id: parseInt(po.entity_id, 10) };
}

/**
 * 이 매핑(판매자 상품 ↔ 구매자 재고 대상)을 이 주문에 쓸 수 있는가.
 * @returns {{ok:true, target:object, stockRow:object}} | {{ok:false, code:string, message:string}}
 */
async function mappingUsableBy(mapping, po, buyerEntity, transaction) {
  if (!mapping) {
    return { ok: false, code: 'PRODUCT_NOT_FOUND', message: 'Seller product not found' };
  }
  if (mapping.is_active === false) {
    return { ok: false, code: 'PRODUCT_INACTIVE', message: 'That seller product is no longer active' };
  }

  // ① 판매자 일치 — 남의 카탈로그 상품을 이 주문에 끼워 넣지 못하게.
  const sameSellerType = String(mapping.seller_type) === String(po.seller_type);
  const mapSellerId = mapping.seller_entity_id === null ? null : parseInt(mapping.seller_entity_id, 10);
  const poSellerId = po.seller_entity_id === null ? null : parseInt(po.seller_entity_id, 10);
  if (!sameSellerType || mapSellerId !== poSellerId) {
    return { ok: false, code: 'PRODUCT_NOT_YOURS', message: 'That product belongs to a different seller' };
  }

  // ② 재고 타깃 해석 — 넷 중 정확히 하나(utils/stockTarget.js 가 단일 소스).
  let target;
  try {
    target = resolveStockTarget(mapping);
  } catch (e) {
    return { ok: false, code: 'STOCK_TARGET_INVALID', message: e.message };
  }

  // ③ 구매자에게 그 재고 자리가 있는가 — 수령한 물건이 들어갈 곳이 없으면 줄을 만들면 안 된다.
  //    지원 범위는 구매자 수정 라우트(PUT /purchase-orders/:id, ingredient 전용)와 같거나 조금 넓다.
  //    product_ingredient / brand_product(=BG 가 구매자인 경우)는 이번 범위 밖 — 조용히 통과시키지 않고 거부한다.
  if (target.kind === 'ingredient') {
    const ing = await readableIngredient(target.id, buyerEntity, transaction);
    // 형제 매장이 브랜드 재료에 붙인 연결은 이 구매자의 연결이 아니다(2026-10-04)
    if (!ing || !sellerLinkVisible(mapping, ing, buyerEntity)) {
      return { ok: false, code: 'NOT_LINKED_TO_BUYER', message: 'Buyer has no stock item linked to this product' };
    }
    return { ok: true, target, stockRow: ing };
  }
  if (target.kind === 'product' && buyerEntity.type === 'restaurant') {
    const prod = await Product.findByPk(target.id, { transaction });
    if (!prod || parseInt(prod.restaurant_id, 10) !== buyerEntity.id) {
      return { ok: false, code: 'NOT_LINKED_TO_BUYER', message: 'Buyer has no stock item linked to this product' };
    }
    return { ok: true, target, stockRow: prod };
  }

  return {
    ok: false,
    code: 'UNSUPPORTED_STOCK_TARGET',
    message: `Amending a '${target.kind}' line is not supported yet — reject the order and ask the buyer to reorder`
  };
}

/**
 * 이 주문에 쓸 수 있는 판매자 상품 후보.
 * 판매자 카탈로그 ∩ 이 구매자에게 연결된 것. 화면 선택지와 저장 검증이 같은 답을 보게 한다.
 */
async function listAmendableProducts(po, buyerEntity, transaction, { keepMappingIds = [] } = {}) {
  const where = { seller_type: po.seller_type, is_active: true };
  if (po.seller_entity_id === null || po.seller_entity_id === undefined) {
    where.seller_entity_id = null;
  } else {
    where.seller_entity_id = parseInt(po.seller_entity_id, 10);
  }

  const mappings = await IngredientSellerProduct.findAll({ where, transaction });
  // 판매자가 끈 상품은 고르는 목록에서 뺀다 — 판정은 구매자 발주와 같은 함수(sellerProductOff).
  //   이 주문에 이미 들어 있는 줄의 상품은 남긴다(줄 이름·합계가 그 항목을 찾아야 한다).
  const keep = new Set((keepMappingIds || []).map(Number).filter(Number.isFinite));
  const srcs = mappings.map(m => ({ seller_type: m.seller_type, seller_product_id: m.seller_product_id }));
  await attachSellerProductActive(srcs);

  const candidates = [];
  for (let i = 0; i < mappings.length; i++) {
    const m = mappings[i];
    if (srcs[i].seller_product_active === false && !keep.has(m.id)) continue;
    const check = await mappingUsableBy(m, po, buyerEntity, transaction);
    if (!check.ok) continue;
    candidates.push({ m, check });
  }

  // 같은 판매자 상품이 구매자 재고 자리 둘에 연결돼 있으면(브랜드 공유 재료 + 매장 자기 재료 등) 한 줄만 보인다
  //   (2026-10-12 Irene «같은 이름이 2개씩 나와»). 고르는 순서: 이 주문이 쓰는 연결 → 구매자 자기 재고 자리 →
  //   선호 연결 → 최신 연결. 다른 판매자 상품끼리는 이름이 같아도 그대로 둔다.
  const ownRow = (c) => (c.check.target.kind === 'product'
    || parseInt(c.check.stockRow.restaurant_id, 10) === buyerEntity.id) ? 1 : 0;
  const rank = (c) => [keep.has(c.m.id) ? 1 : 0, ownRow(c), c.m.is_preferred ? 1 : 0, c.m.id];
  const better = (a, b) => {
    const ra = rank(a); const rb = rank(b);
    for (let k = 0; k < ra.length; k++) if (ra[k] !== rb[k]) return ra[k] > rb[k];
    return false;
  };
  const bySp = new Map();
  const picked = [];
  for (const c of candidates) {
    if (c.m.seller_product_id == null || keep.has(c.m.id)) { picked.push(c); continue; }
    const key = String(c.m.seller_product_id);
    const cur = bySp.get(key);
    if (!cur || better(c, cur)) bySp.set(key, c);
  }
  const keptSp = new Set(picked.filter(c => c.m.seller_product_id != null).map(c => String(c.m.seller_product_id)));
  for (const [key, c] of bySp) if (!keptSp.has(key)) picked.push(c);

  const out = [];
  for (const { m, check } of picked) {
    const spec = await resolveOrderLine(m, check.stockRow, transaction);
    out.push({
      ingredient_seller_product_id: m.id,
      name: check.stockRow.name || null,
      unit_price: parseFloat(m.unit_price) || 0,
      unit_conversion: parseFloat(m.unit_conversion) || 1,
      min_order_quantity: m.min_order_quantity === null ? null : parseFloat(m.min_order_quantity),
      unit: spec.unit || null,
      base_quantity: spec.base_quantity,
      base_unit: spec.base_unit,
      stock_target: check.target.kind
    });
  }
  // 판매자가 고르는 목록 — 이름은 **판매자 자기 상품명**(받은 주문 목록·상세와 같은 단일 소스).
  //   구매자 재고 이름을 쓰면 한 재고에 연결된 다른 상품 둘(옛 이름·새 이름)이 같은 이름으로 보인다.
  await attachSellerProductIdentity({ items: out });
  for (const p of out) p.name = p.seller_product_name || supplierFacingName(p.name) || null;
  out.sort((a, b) => String(a.name || '').localeCompare(String(b.name || '')));
  return out;
}

/** 금액 한 줄 — 반올림 규칙은 구매자 경로와 같아야 한다. */
function lineTotalOf(qty, unitPrice) {
  return Math.round((qty * unitPrice) * 100) / 100;
}

/**
 * 요청 줄 → PurchaseOrderItem 생성 attrs.
 * ⚠ 단가는 **판매자 카탈로그의 현재 값**을 서버가 채운다 — 요청 본문의 unit_price 는 믿지 않는다.
 */
async function buildAmendedLine(po, raw, mapping, stockRow, target, transaction, carriedOptions = null) {
  const qty = parseFloat(raw.quantity_ordered);
  // 남는 줄의 고른 옵션은 그대로 따라간다 — 단가 = 연결 현재가 + 그 줄 스냅샷 조정액(utils/poLineOptions.js).
  //   수정 화면은 옵션을 고르지 못하므로 새로 넣는 줄은 옵션 없음.
  const options = optionsArray(carriedOptions).length ? optionsArray(carriedOptions) : null;
  const unitPrice = Math.round(((parseFloat(mapping.unit_price) || 0) + optionsAdjustment(options)) * 100) / 100;
  const spec = await resolveOrderLine(mapping, stockRow, transaction);
  return {
    purchase_order_id: po.id,
    ...stockTargetAttrs(target.key, target.id),
    ingredient_seller_product_id: mapping.id,
    quantity_ordered: qty,
    quantity_received: 0,
    unit: spec.unit || null,
    base_quantity: spec.base_quantity,
    base_unit: spec.base_unit,
    unit_price: unitPrice,
    unit_conversion: parseFloat(mapping.unit_conversion) || 1,
    line_total: lineTotalOf(qty, unitPrice),
    options,
    notes: raw.notes ? String(raw.notes).slice(0, 255) : null,
    description: descriptionWithOptions(stockRow.name, options)
  };
}


/**
 * 무엇이 바뀌었는지 — 이유가 비어도 구매자는 이걸 보고 안다(그래서 이유는 선택, diff 는 항상).
 * 같은 상품이 여러 줄일 수 있으므로 «상품 + 순서» 로 짝짓지 않고 상품 기준으로 합쳐 비교한다.
 */
function diffLines(beforeRows, afterAttrs) {
  const keyOf = (r) => {
    const t = ['ingredient_id', 'product_ingredient_id', 'product_id', 'brand_product_id']
      .map((k) => (r[k] ? `${k}:${r[k]}` : null)).filter(Boolean)[0] || 'unknown';
    return `${t}|${r.ingredient_seller_product_id || 0}|${optionsKey(r.options)}`;
  };
  const snap = (r) => ({
    name: r.description || null,
    quantity: parseFloat(r.quantity_ordered) || 0,
    unit: r.unit || null,
    unit_price: parseFloat(r.unit_price) || 0,
    line_total: parseFloat(r.line_total) || 0
  });

  const before = new Map();
  for (const r of beforeRows) before.set(keyOf(r), snap(r));
  const after = new Map();
  for (const r of afterAttrs) after.set(keyOf(r), snap(r));

  const changes = [];
  for (const [k, b] of before) {
    const a = after.get(k);
    if (!a) { changes.push({ type: 'removed', before: b, after: null }); continue; }
    if (a.quantity !== b.quantity || a.unit_price !== b.unit_price) {
      changes.push({ type: 'changed', before: b, after: a });
    }
  }
  for (const [k, a] of after) {
    if (!before.has(k)) changes.push({ type: 'added', before: null, after: a });
  }
  return changes;
}

module.exports = {
  AMENDABLE_STATUSES,
  buyerEntityOf,
  mappingUsableBy,
  listAmendableProducts,
  buildAmendedLine,
  diffLines,
  lineTotalOf
};
