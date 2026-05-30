// 세트메뉴 v2 공용 로직 (SET_MENU_REDESIGN.md §8/§9)
// - resolveSetGroups: set_groups 우선, 없으면 레거시 set_items 를 fixed 그룹으로 폴백
// - validateSetGroups: 빌더 저장 시 set_groups 정의 검증
// - computeSetAvailability: 구성품 soldOut 기반 세트 품절 계산 (DB 미기록 → 자동 부활)
// - validateSetSelection: 주문 시 선택(set_components) 이 set_groups 규칙(택1 min/max, fixed 포함, 옵션 required)을 만족하는지
// 프론트(dev-frontend/src/utils/setMenu.ts)와 로직 동일하게 유지할 것.

// 레거시 set_items([{menuItemId,name,quantity}]) → set_groups(fixed) 런타임 변환 포함
function resolveSetGroups(product) {
  if (!product) return [];
  const sg = product.set_groups;
  if (Array.isArray(sg) && sg.length > 0) return sg;
  const si = product.set_items;
  if (Array.isArray(si) && si.length > 0) {
    return [{
      id: 'legacy',
      label: 'Set',
      type: 'fixed',
      items: si.map(i => ({
        product_id: i.product_id != null ? i.product_id : i.menuItemId,
        qty: i.qty != null ? i.qty : (i.quantity != null ? i.quantity : 1)
      })).filter(it => it.product_id != null)
    }];
  }
  return [];
}

// set_groups 정의 검증. opts.validProductIds = Set/array of 허용 product_id (같은 매장 · 비-세트 · 활성).
function validateSetGroups(setGroups, opts = {}) {
  const errors = [];
  if (!Array.isArray(setGroups) || setGroups.length === 0) {
    return { valid: false, errors: ['세트는 최소 1개의 구성 슬롯이 필요합니다.'] };
  }
  const validIds = opts.validProductIds != null
    ? (opts.validProductIds instanceof Set ? opts.validProductIds : new Set(opts.validProductIds.map(Number)))
    : null;

  setGroups.forEach((g, gi) => {
    const tag = `슬롯 ${gi + 1}`;
    if (!g || typeof g.label !== 'string' || !g.label.trim()) errors.push(`${tag}: 슬롯 이름이 필요합니다.`);
    if (g.type !== 'fixed' && g.type !== 'choice') errors.push(`${tag}: 타입은 fixed 또는 choice 여야 합니다.`);
    const items = Array.isArray(g.items) ? g.items : [];
    if (items.length === 0) errors.push(`${tag}: 구성품을 최소 1개 선택하세요.`);

    items.forEach((it, ii) => {
      const pid = Number(it && it.product_id);
      if (!Number.isInteger(pid)) errors.push(`${tag} 항목 ${ii + 1}: 잘못된 상품입니다.`);
      else if (validIds && !validIds.has(pid)) errors.push(`${tag} 항목 ${ii + 1}: 이 매장의 활성 단품이 아닙니다(세트 중첩 불가).`);
      if (it && it.upcharge != null && (isNaN(Number(it.upcharge)) || Number(it.upcharge) < 0)) {
        errors.push(`${tag} 항목 ${ii + 1}: upcharge 는 0 이상이어야 합니다.`);
      }
      if (it && it.qty != null && (!Number.isInteger(Number(it.qty)) || Number(it.qty) < 1)) {
        errors.push(`${tag} 항목 ${ii + 1}: 수량은 1 이상의 정수여야 합니다.`);
      }
    });

    if (g.type === 'choice') {
      const min = g.min == null ? 1 : Number(g.min);
      const max = g.max == null ? 1 : Number(g.max);
      // min=0 허용(선택적 슬롯 "0~N개"). max 는 1 이상, min ≤ max ≤ 구성품수.
      if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < 1 || max < min || max > items.length) {
        errors.push(`${tag}: 택1 범위(min ${min} / max ${max})가 잘못되었습니다 (0 ≤ min ≤ max ≤ 구성품수, max ≥ 1).`);
      }
    }
  });

  return { valid: errors.length === 0, errors };
}

// 구성품 soldOut 기반 세트 가용성. soldOutMap = { [product_id]: true } (품절). 미기록 상품은 미품절 취급.
// 반환: { available, reason, groups:[{...g, items:[{...it, soldOut}]}] }
function computeSetAvailability(setGroups, soldOutMap = {}) {
  const groups = resolveSetGroups({ set_groups: setGroups });
  let available = true;
  let reason = null;
  const out = groups.map(g => {
    const items = (g.items || []).map(it => ({ ...it, soldOut: !!soldOutMap[it.product_id] }));
    if (g.type === 'fixed') {
      if (items.some(it => it.soldOut)) { available = false; reason = 'component'; }
    } else { // choice
      if (items.length > 0 && items.every(it => it.soldOut)) { available = false; reason = 'component'; }
    }
    return { ...g, items };
  });
  return { available, reason, groups: out };
}

// 주문 선택 검증. selectedComponents = [{ group_id, product_id, qty?, options? }].
// fixed 슬롯의 상품은 자동 포함이어야 하고, choice 슬롯은 min~max 개 선택돼야 한다.
// opts.requiredOptionCheck(component) -> string|null : 구성품의 required 옵션 미충족 사유(있으면 에러).
function validateSetSelection(setGroups, selectedComponents, opts = {}) {
  const errors = [];
  const groups = resolveSetGroups({ set_groups: setGroups });
  const sel = Array.isArray(selectedComponents) ? selectedComponents : [];

  groups.forEach(g => {
    const picks = sel.filter(c => String(c.group_id) === String(g.id));
    const allowedIds = new Set((g.items || []).map(it => Number(it.product_id)));
    picks.forEach(p => {
      if (!allowedIds.has(Number(p.product_id))) errors.push(`슬롯 "${g.label}": 허용되지 않은 구성품입니다.`);
    });
    if (g.type === 'fixed') {
      (g.items || []).forEach(it => {
        if (!picks.some(p => Number(p.product_id) === Number(it.product_id))) {
          errors.push(`슬롯 "${g.label}": 고정 구성품이 누락되었습니다.`);
        }
      });
    } else {
      const min = g.min == null ? 1 : Number(g.min);
      const max = g.max == null ? 1 : Number(g.max);
      if (picks.length < min) errors.push(`슬롯 "${g.label}": 최소 ${min}개 선택하세요.`);
      if (picks.length > max) errors.push(`슬롯 "${g.label}": 최대 ${max}개까지 선택할 수 있습니다.`);
    }
    if (typeof opts.requiredOptionCheck === 'function') {
      picks.forEach(p => { const r = opts.requiredOptionCheck(p); if (r) errors.push(`슬롯 "${g.label}": ${r}`); });
    }
  });

  return { valid: errors.length === 0, errors };
}

// 세트 주문 가격 = 세트 기본가 + 선택 구성품 upcharge 합. price_share 안분도 계산.
// basePrice = product.price (세트 고정가). selectedComponents 각각에 upcharge 매핑.
function computeSetPricing(setGroups, basePrice, selectedComponents) {
  const groups = resolveSetGroups({ set_groups: setGroups });
  const upMap = new Map();
  groups.forEach(g => (g.items || []).forEach(it => upMap.set(`${g.id}:${it.product_id}`, Number(it.upcharge) || 0)));
  let upchargeTotal = 0;
  const comps = (selectedComponents || []).map(c => {
    const up = upMap.get(`${c.group_id}:${c.product_id}`) || 0;
    upchargeTotal += up;
    return { ...c, upcharge: up };
  });
  const total = (Number(basePrice) || 0) + upchargeTotal;
  // price_share: 세트 기본가는 구성품 수로 균등 안분 + 각 구성품 자기 upcharge 가산 (통계 매출 안분용)
  const n = comps.length || 1;
  const baseShare = (Number(basePrice) || 0) / n;
  const components = comps.map(c => ({ ...c, price_share: Math.round((baseShare + c.upcharge) * 100) / 100 }));
  return { total: Math.round(total * 100) / 100, upchargeTotal, components };
}

// 단일 세트 상품 resolve — 구성품(name/price/soldOut/상속 옵션그룹) + 품절계산을 붙여 반환.
// 단일 상품 열 때만 호출(모바일 ItemDetail / POS 상품상세) → 가볍다. models 는 순환참조 회피 위해 지연 require.
async function buildSetResolved(setProduct, restaurantId) {
  if (!setProduct || !setProduct.is_set_menu) return null;
  const db = require('../models');
  const Product = db.Product;
  const OptionGroup = db.OptionGroup;
  const Option = db.Option;

  const groups = resolveSetGroups(setProduct);
  const compIds = [...new Set(groups.flatMap(g => (g.items || []).map(it => Number(it.product_id))).filter(Number.isInteger))];
  if (compIds.length === 0) return { set_available: true, set_unavailable_reason: null, set_groups_resolved: [] };

  const comps = await Product.findAll({
    where: { id: compIds, restaurant_id: restaurantId },
    attributes: ['id', 'name', 'price', 'soldOut', 'optionGroups']
  });
  const parseOgIds = (v) => {
    if (!v) return [];
    let p = v; try { if (typeof p === 'string') p = JSON.parse(p); if (typeof p === 'string') p = JSON.parse(p); } catch { return []; }
    return Array.isArray(p) ? p.map(Number).filter(Number.isInteger) : [];
  };
  const compMap = new Map();
  const allOgIds = new Set();
  comps.forEach(c => {
    const ogIds = parseOgIds(c.optionGroups);
    ogIds.forEach(id => allOgIds.add(id));
    compMap.set(c.id, { id: c.id, name: c.name, price: Number(c.price) || 0, soldOut: !!c.soldOut, ogIds });
  });

  let ogMap = new Map();
  if (allOgIds.size) {
    const ogs = await OptionGroup.findAll({
      where: { id: [...allOgIds], restaurant_id: restaurantId, isActive: true },
      include: [{ model: Option, as: 'options' }]
    });
    ogMap = new Map(ogs.map(g => [g.id, {
      id: g.id, name: g.name, required: !!g.required, multiple: !!g.multiple,
      options: (g.options || []).filter(o => o.isActive !== false).map(o => ({ id: o.id, name: o.name, price: Number(o.price) || 0 }))
    }]));
  }

  const soldOutMap = {};
  compMap.forEach((v, id) => { soldOutMap[id] = v.soldOut; });
  const avail = computeSetAvailability(groups, soldOutMap);

  const resolved = groups.map(g => ({
    id: g.id, label: g.label, type: g.type,
    min: g.min == null ? 1 : Number(g.min), max: g.max == null ? 1 : Number(g.max),
    items: (g.items || []).map(it => {
      const cm = compMap.get(Number(it.product_id));
      return {
        product_id: Number(it.product_id),
        qty: it.qty != null ? Number(it.qty) : 1,
        upcharge: Number(it.upcharge) || 0,
        name: cm ? cm.name : `#${it.product_id}`,
        price: cm ? cm.price : 0,
        soldOut: cm ? cm.soldOut : false,
        optionGroups: cm ? cm.ogIds.map(id => ogMap.get(id)).filter(Boolean) : []
      };
    })
  }));

  return { set_available: avail.available, set_unavailable_reason: avail.reason, set_groups_resolved: resolved };
}

module.exports = {
  resolveSetGroups,
  validateSetGroups,
  computeSetAvailability,
  validateSetSelection,
  computeSetPricing,
  buildSetResolved,
};
