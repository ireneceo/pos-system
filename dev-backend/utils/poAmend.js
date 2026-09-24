/**
 * 판매자 주문 수정(amend) — 판정 단일 소스.
 *
 * Fable 판정 2026-09-24 의 원칙 한 줄이 이 파일의 전부다:
 *   **발주서는 구매자의 돈 약속이다. 판매자는 그 약속을 줄이거나 같은 값으로 바꿀 수는 있어도,
 *   구매자 동의 없이 늘릴 수는 없다.**
 * 그래서 오너 승인(제출 전 금액 승인)을 우회하지 않고, 「수정 제안 → 구매자 승인」 왕복 상태도 필요 없다.
 *
 * ⚠ 왜 판정이 여기 한 곳인가: 후보 목록(GET amendable-products)과 실제 수정(POST amend)이
 *   **서로 다른 조건**을 쓰면 "화면엔 떴는데 저장하면 400" 이거나 그 반대가 된다.
 *   둘 다 이 파일의 `mappingUsableBy` 를 부른다. (메모리 feedback_check_and_fix_same_sql)
 */

const { Ingredient, Product, IngredientSellerProduct } = require('../models');
const { resolveStockTarget, stockTargetAttrs } = require('./stockTarget');
const { readableIngredient } = require('./brandStockAccess');
const { resolveOrderLine } = require('./poLineSpec');

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
    if (!ing) {
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
async function listAmendableProducts(po, buyerEntity, transaction) {
  const where = { seller_type: po.seller_type, is_active: true };
  if (po.seller_entity_id === null || po.seller_entity_id === undefined) {
    where.seller_entity_id = null;
  } else {
    where.seller_entity_id = parseInt(po.seller_entity_id, 10);
  }

  const mappings = await IngredientSellerProduct.findAll({ where, transaction });
  const out = [];
  for (const m of mappings) {
    const check = await mappingUsableBy(m, po, buyerEntity, transaction);
    if (!check.ok) continue;
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
async function buildAmendedLine(po, raw, mapping, stockRow, target, transaction) {
  const qty = parseFloat(raw.quantity_ordered);
  const unitPrice = parseFloat(mapping.unit_price) || 0;
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
    notes: raw.notes ? String(raw.notes).slice(0, 255) : null,
    description: stockRow.name ? String(stockRow.name).slice(0, 255) : null
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
    return `${t}|${r.ingredient_seller_product_id || 0}`;
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
