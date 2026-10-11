'use strict';
/**
 * services/similarNameGuard.js — 등록·이름 바꾸기 때 «비슷한 이름이 이미 있어요» 후보 찾기
 * (2026-10-11 Fable 판정 `fable-verdict-20261011-similar-name-guard.md` §4 · Irene «권고대로»)
 *
 * GIT(주인) 이 보는 세 목록을 **가로질러** 찾는다 — 재고아이템 · 판매 상품 · 브랜드 재료(출처 없는 수동 줄).
 * 같은 물건이 목록마다 다른 이름으로 새로 생겨 연결이 갈라지던 것을 등록 순간에 묻는다(막지 않는다 — force 로 통과).
 * 규칙은 utils/nameSimilarity.compareNames 하나. 매장(레스토랑) 재료 등록에는 **붙이지 않는다**(Irene «레스토랑에 영향 미칠 것 같은 건 하지 말고» · Q1).
 * 비교 대상은 활성·비활성 모두(비활성은 is_active=false 로 표시 — 꺼 둔 같은 물건을 다시 만드는 것도 묻는다).
 */
const { Op } = require('sequelize');
const { compareNames, reasonText } = require('../utils/nameSimilarity');

const RANK = { same_name: 0, paren_only: 1, same_words: 2, contains: 3 };
const MAX = 10;

/**
 * @param {object} o
 * @param {number} o.ownerUserId    GIT(BG) 사용자 — 재고아이템·상품의 owner_user_id, 브랜드의 owner_id
 * @param {string} o.name
 * @param {'stock_item'|'brand_product'|'brand_ingredient'} o.kind  지금 만들거나 고치는 것
 * @param {number} [o.excludeId]    고치는 중인 자기 자신(같은 kind)
 * @param {number[]} [o.brandIds]   브랜드 재료를 볼 브랜드(없으면 주인이 가진 브랜드 전부)
 * @returns {Promise<Array<{kind,id,name,spec,is_active,rule,words,typos,reason}>>}
 */
async function findSimilarNames({ ownerUserId, name, kind, excludeId, brandIds }) {
  if (!ownerUserId || !String(name || '').trim()) return [];
  const { ProductIngredient, BrandProduct, Ingredient, Brand } = require('../models');
  const lists = [];
  // 무엇과 비교하나 — 판정 §4 표
  const want = kind === 'brand_product' ? ['brand_product', 'stock_item']
    : kind === 'brand_ingredient' ? ['brand_ingredient', 'stock_item', 'brand_product']
    : ['stock_item', 'brand_product', 'brand_ingredient'];

  if (want.includes('stock_item')) {
    const rows = await ProductIngredient.findAll({ where: { owner_user_id: ownerUserId },
      attributes: ['id', 'name', 'unit', 'base_quantity', 'is_active'] });
    rows.forEach((r) => lists.push({ kind: 'stock_item', id: r.id, name: r.name, spec: `${parseFloat(r.base_quantity) || 1} ${r.unit || ''}`.trim(), is_active: r.is_active !== false }));
  }
  if (want.includes('brand_product')) {
    const rows = await BrandProduct.findAll({ where: { owner_user_id: ownerUserId },
      attributes: ['id', 'name', 'unit', 'base_quantity', 'is_active', 'product_kind'] });
    rows.forEach((r) => lists.push({ kind: 'brand_product', id: r.id, name: r.name, spec: `${parseFloat(r.base_quantity) || 1} ${r.unit || ''}`.trim(), is_active: r.is_active !== false, product_kind: r.product_kind }));
  }
  if (want.includes('brand_ingredient')) {
    const ids = Array.isArray(brandIds) && brandIds.length ? brandIds
      : (await Brand.findAll({ where: { owner_id: ownerUserId }, attributes: ['id'] })).map((b) => b.id);
    if (ids.length) {
      // 출처 있는 줄(재고아이템·상품·레시피의 거울)은 그 출처가 위 목록에서 이미 비교된다 — 수동 줄만
      const rows = await Ingredient.findAll({ where: { owner_type: 'brand', brand_id: { [Op.in]: ids },
        source_product_ingredient_id: null, source_brand_product_id: null, source_recipe_id: null },
      attributes: ['id', 'name', 'unit', 'base_quantity', 'is_active', 'brand_id'] });
      rows.forEach((r) => lists.push({ kind: 'brand_ingredient', id: r.id, name: r.name, spec: `${parseFloat(r.base_quantity) || 1} ${r.unit || ''}`.trim(), is_active: r.is_active !== false, brand_id: r.brand_id }));
    }
  }

  const out = [];
  for (const row of lists) {
    if (excludeId != null && row.kind === kind && Number(row.id) === Number(excludeId)) continue;
    const m = compareNames(name, row.name);
    if (!m) continue;
    out.push({ ...row, rule: m.rule, words: m.words, typos: m.typos, reason: reasonText(m) });
  }
  out.sort((a, b) => (RANK[a.rule] - RANK[b.rule]) || (Number(b.is_active) - Number(a.is_active)) || String(a.name).localeCompare(String(b.name)));
  return out.slice(0, MAX);
}

/** 라우트 공용 409 본문 — 브랜드 상품의 기존 SIMILAR_EXISTS 와 같은 code */
function similarBody(candidates, message) {
  return { success: false, code: 'SIMILAR_EXISTS', message: message || 'Similar items already exist. Use one of them, or create anyway.',
    error: { code: 'SIMILAR_EXISTS', candidates }, candidates };
}

module.exports = { findSimilarNames, similarBody };
