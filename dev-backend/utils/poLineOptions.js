// 발주 줄 «고른 옵션» — 검증·가격 조정·표기 규칙 한 곳 (2026-10-15 Fable 설계 D3·D4
//   .claude/fable-design-20261015-supplier-product-options.md)
//
// 옵션 = 양을 바꾸지 않는 선택(손질·등급·숙성·브랜드). 규격(1 kg / 10 kg · 1팩 / 20팩 카톤)은 옵션이 아니라
//   판매 상품을 따로 둔다(docs/TRADE_STRUCTURE.md §2-2).
// 줄 단가 = 연결 단가 + 고른 옵션 조정액 합. **조정액은 DB 값이다** — 화면이 보낸 price_adjustment·
//   adjusted_unit_price 는 읽지 않는다. 줄에는 «무엇을 골랐나» 스냅샷(purchase_order_items.options)이 남아
//   가격 다시 불러오기(refresh-prices)·판매자 수정(poAmend)이 같은 조정액을 다시 더한다.
// 옵션이 붙는 판매자는 가입 공급업체(seller_type 'supplier')뿐 — 브랜드·푸드코트·외부 공급업체 상품은 옵션 없음.

const { sequelize } = require('../config/database');

class LineOptionError extends Error {
  constructor(code, message, meta = {}) {
    super(message);
    this.code = code;
    this.meta = meta;
  }
}

/** 요청의 option_ids → 양의 정수 배열(중복 제거). 형식이 틀리면 LineOptionError. */
function parseOptionIds(raw) {
  if (raw == null) return [];
  if (!Array.isArray(raw)) throw new LineOptionError('OPTION_INVALID', 'option_ids must be an array');
  const out = [];
  for (const v of raw) {
    const n = Number(v);
    if (!Number.isInteger(n) || n <= 0) throw new LineOptionError('OPTION_INVALID', 'option_ids must be positive integers');
    if (!out.includes(n)) out.push(n);
  }
  return out;
}

/**
 * 연결(ingredient_seller_products) 하나와 고른 옵션 번호 → { options: 스냅샷|null, adjustment }.
 *   - 옵션을 안 골랐으면 { null, 0 } — 옵션 창을 거치지 않는 발주 길(재고 화면 일괄 발주·제안·판매자 주문 추가)은
 *     지금처럼 기본가 줄이 된다. 필수 그룹 검사는 «고른 것이 있을 때» 그 묶음이 완전한지만 본다.
 *   - 연결이 가입 공급업체가 아니면 OPTIONS_NOT_SUPPORTED.
 *   - 그 판매 상품에 붙은 그룹의 활성 옵션만 허용(OPTION_INVALID) · 그룹 최대 개수(OPTION_TOO_MANY) ·
 *     필수 그룹 최소 개수(OPTION_REQUIRED).
 */
async function resolveLineOptions({ mapping, optionIds, transaction }) {
  const ids = parseOptionIds(optionIds);
  const isSupplier = mapping && mapping.seller_type === 'supplier' && mapping.seller_product_id;
  if (!isSupplier) {
    if (ids.length) throw new LineOptionError('OPTIONS_NOT_SUPPORTED', 'This seller product has no options');
    return { options: null, adjustment: 0 };
  }
  if (!ids.length) return { options: null, adjustment: 0 };

  const [groups] = await sequelize.query(
    `SELECT g.id, g.name, g.is_required, g.min_selections, g.max_selections, gp.sort_order
       FROM supplier_product_option_group_products gp
       JOIN supplier_product_option_groups g ON g.id = gp.option_group_id
      WHERE gp.product_id = :pid
      ORDER BY gp.sort_order, g.sort_order, g.id`,
    { replacements: { pid: mapping.seller_product_id }, transaction }
  );
  if (!groups.length) {
    if (ids.length) throw new LineOptionError('OPTION_INVALID', 'This seller product has no options');
    return { options: null, adjustment: 0 };
  }

  const [opts] = await sequelize.query(
    `SELECT id, option_group_id, name, price_adjustment, sort_order
       FROM supplier_product_options
      WHERE option_group_id IN (:gids) AND is_active = 1
      ORDER BY sort_order, id`,
    { replacements: { gids: groups.map(g => g.id) }, transaction }
  );
  const optById = new Map(opts.map(o => [Number(o.id), o]));
  const bad = ids.filter(id => !optById.has(id));
  if (bad.length) throw new LineOptionError('OPTION_INVALID', 'Selected option is not available for this product', { option_ids: bad });

  const snapshot = [];
  for (const g of groups) {
    const chosen = ids.filter(id => Number(optById.get(id).option_group_id) === Number(g.id));
    const max = Math.max(1, parseInt(g.max_selections, 10) || 1);
    if (chosen.length > max) {
      throw new LineOptionError('OPTION_TOO_MANY', `Too many selections in "${g.name}"`, { group_id: g.id });
    }
    if (g.is_required && chosen.length < Math.max(1, parseInt(g.min_selections, 10) || 0)) {
      throw new LineOptionError('OPTION_REQUIRED', `"${g.name}" is required`, { group_id: g.id });
    }
    for (const id of chosen) {
      const o = optById.get(id);
      snapshot.push({
        group_id: Number(g.id),
        group_name: g.name,
        option_id: Number(o.id),
        option_name: o.name,
        price_adjustment: Math.round((parseFloat(o.price_adjustment) || 0) * 100) / 100
      });
    }
  }
  if (!snapshot.length) return { options: null, adjustment: 0 };
  return { options: snapshot, adjustment: optionsAdjustment(snapshot) };
}

/** 스냅샷을 배열로 — 드라이버가 JSON 을 글자로 돌려줄 때도 같은 값. */
function optionsArray(optionsJson) {
  let v = optionsJson;
  if (typeof v === 'string') { try { v = JSON.parse(v); } catch { v = null; } }
  return Array.isArray(v) ? v : [];
}

/** 스냅샷 조정액 합(2자리). */
function optionsAdjustment(optionsJson) {
  const sum = optionsArray(optionsJson).reduce((s, o) => s + (parseFloat(o && o.price_adjustment) || 0), 0);
  return Math.round(sum * 100) / 100;
}

/** 같은 상품·다른 옵션을 가르는 키 — 고른 옵션 번호를 정렬해 이은 글자('' = 옵션 없음). */
function optionsKey(optionsJson) {
  return optionsArray(optionsJson).map(o => Number(o && o.option_id)).filter(Boolean).sort((a, b) => a - b).join(',');
}

/** 줄 설명 — «Beef Rib (Cut Style: Sliced, Trim Style: Boneless)», 255자 절단. */
function descriptionWithOptions(name, optionsJson) {
  const base = name ? String(name) : '';
  const opts = optionsArray(optionsJson);
  if (!opts.length) return base ? base.slice(0, 255) : null;
  const byGroup = [];
  for (const o of opts) {
    const g = byGroup.find(x => x.name === o.group_name);
    if (g) g.values.push(o.option_name); else byGroup.push({ name: o.group_name, values: [o.option_name] });
  }
  const label = byGroup.map(g => `${g.name}: ${g.values.join(', ')}`).join(', ');
  return `${base} (${label})`.slice(0, 255);
}

/**
 * 수정 요청 줄이 «원래 있던 줄» 이면 그 줄의 고른 옵션 스냅샷을 돌려준다.
 *   item_id 가 오면 그 줄(같은 연결일 때만). 없으면(옛 화면) 같은 연결의 원래 줄들이 옵션 하나로 같을 때만.
 */
function carriedOptionsFor(raw, mappingId, beforeRows) {
  const itemId = parseInt(raw && raw.item_id, 10);
  if (Number.isFinite(itemId)) {
    const hit = beforeRows.find(r => Number(r.id) === itemId && Number(r.ingredient_seller_product_id) === Number(mappingId));
    return hit ? (optionsArray(hit.options).length ? optionsArray(hit.options) : null) : null;
  }
  const same = beforeRows.filter(r => Number(r.ingredient_seller_product_id) === Number(mappingId));
  const keys = new Set(same.map(r => optionsKey(r.options)));
  if (same.length && keys.size === 1) {
    const opts = optionsArray(same[0].options);
    return opts.length ? opts : null;
  }
  return null;
}

function lineOptionErrorBody(e) {
  return { success: false, code: e.code, message: e.message, ...(e.meta && Object.keys(e.meta).length ? { data: e.meta } : {}) };
}

module.exports = {
  LineOptionError,
  parseOptionIds,
  resolveLineOptions,
  optionsArray,
  optionsAdjustment,
  optionsKey,
  descriptionWithOptions,
  carriedOptionsFor,
  lineOptionErrorBody
};
