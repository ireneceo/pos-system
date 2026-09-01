/**
 * 모바일 크로스셀(#11c) 추천 해석 — docs/MOBILE_ADDON_CROSS_SELL.md §1.1/1.2
 *
 * 우선순위(1소스만):
 *   ① product_recommendations 수동연결(브랜드분 먼저 → 매장분) 있으면 그걸
 *   ② 없으면 "추천 카테고리"(is_recommendation_source 또는 이름 자동감지)의 상품
 *   ③ 그래도 없으면 []
 * 공통 필터: is_active, brand_scope_active!=false,
 *           담은 상품 자신 제외, 최대 limit(기본 6). (장바구니 중복 제외는 프론트.)
 */
const { Op } = require('sequelize');
const { Product, Category, ProductRecommendation } = require('../models');

const REC_CATEGORY_KEYWORDS = [
  'dessert', 'desserts', '디저트',
  'drink', 'drinks', '음료', '음료수',
  'beverage', 'beverages',
];

function categoryIsRecommendationSource(cat) {
  // 명시 플래그 우선(true=강제포함 / false=강제제외), null=이름 자동감지
  if (cat.is_recommendation_source === true) return true;
  if (cat.is_recommendation_source === false) return false;
  const name = (cat.name || '').toString().trim().toLowerCase();
  if (!name) return false;
  return REC_CATEGORY_KEYWORDS.some(k => name.includes(k));
}

function inStock(p) {
  // 2026-09-01(Q5): 재고 기반 숨김 제거. 품절 표시는 별도 플래그 몫 —
  // 재고 0 이 판매를 막지 않는 한 추천도 막지 않는다(POS·모바일은 0 에서 안 막힌다).
  return p.is_active !== false;
}
function visible(p) {
  // 노출 = is_active(RA) AND brand_scope_active(BG, false=숨김)
  return p.is_active !== false && p.brand_scope_active !== false;
}

const PUBLIC_PRODUCT_ATTRS = ['id', 'name', 'price', 'image', 'image_thumbnail', 'emoji', 'category', 'is_set_menu', 'description'];

/**
 * @returns {Promise<Array>} 추천 상품 목록(공개 필드). 최대 limit.
 */
async function resolveRecommendations(restaurantId, productId, limit = 6) {
  const base = await Product.findByPk(productId, { attributes: ['id', 'restaurant_id', 'category'] });
  if (!base || Number(base.restaurant_id) !== Number(restaurantId)) return [];

  // ① 수동 연결 — 브랜드분(origin=brand) 먼저, 그다음 매장분. 각 그룹 sort_order ASC.
  const links = await ProductRecommendation.findAll({
    where: { restaurant_id: restaurantId, product_id: productId },
    order: [['origin', 'ASC'], ['sort_order', 'ASC'], ['id', 'ASC']], // 'brand' < 'restaurant' 알파벳순 → 브랜드 먼저
    attributes: ['recommended_product_id', 'sort_order', 'origin'],
  });

  const baseCategory = (base.category || '').toString().trim();
  let candidates = [];
  if (links.length) {
    const recIds = [...new Set(links.map(l => l.recommended_product_id))];
    const found = await Product.findAll({ where: { id: { [Op.in]: recIds }, restaurant_id: restaurantId }, attributes: [...PUBLIC_PRODUCT_ATTRS, 'is_active', 'brand_scope_active'] });
    const byId = new Map(found.map(p => [p.id, p]));
    candidates = recIds.map(id => byId.get(id)).filter(Boolean); // preserve link order
  } else {
    // ② 추천 카테고리의 상품
    const cats = await Category.findAll({ where: { restaurant_id: restaurantId }, attributes: ['name', 'is_recommendation_source'] });
    const recNames = cats.filter(categoryIsRecommendationSource).map(c => c.name);
    if (recNames.length) {
      candidates = await Product.findAll({
        where: { restaurant_id: restaurantId, category: { [Op.in]: recNames } },
        attributes: [...PUBLIC_PRODUCT_ATTRS, 'is_active', 'brand_scope_active'],
        order: [['display_order', 'ASC'], ['id', 'DESC']],
      });
    }
    // ③ 폴백 — 명시 추천(①)도 추천카테고리(②)도 없으면, 토글만 켜도 보이도록
    //    "다른 카테고리"의 노출 상품을 보완 추천으로(같은 카테고리 제외는 아래 루프가 처리).
    //    세트는 정확한 구성이 필요하니 폴백에선 제외(수동연결로만 추천).
    if (candidates.length === 0) {
      candidates = await Product.findAll({
        where: { restaurant_id: restaurantId, is_active: true, is_set_menu: false },
        attributes: [...PUBLIC_PRODUCT_ATTRS, 'is_active', 'brand_scope_active'],
        order: [['display_order', 'ASC'], ['id', 'DESC']],
        limit: 40,
      });
    }
  }

  // 자동 카테고리 모드(②)에서만 "보고 있는 상품과 같은 카테고리"를 제외한다.
  // 예: 디저트를 보는 중이면 다른 디저트 대신 음료만 추천(정석 크로스셀). 수동 연결(①)은
  // 매장이 일부러 고른 것이라 같은 카테고리여도 그대로 노출한다.
  const isAutoCategory = links.length === 0;
  const out = [];
  for (const p of candidates) {
    if (p.id === Number(productId)) continue;     // 자신 제외
    if (isAutoCategory && baseCategory && (p.category || '').toString().trim() === baseCategory) continue; // 같은 카테고리 제외(자동 모드)
    if (!visible(p) || !inStock(p)) continue;
    out.push({
      id: p.id, name: p.name, price: p.price,
      image: p.image || p.image_thumbnail || null,
      emoji: p.emoji || null,
      category: p.category, is_set_menu: p.is_set_menu, description: p.description || null,
    });
    if (out.length >= limit) break;
  }
  return out;
}

module.exports = { resolveRecommendations, categoryIsRecommendationSource, REC_CATEGORY_KEYWORDS };
