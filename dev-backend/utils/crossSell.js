/**
 * 모바일 크로스셀(#11c) 추천 해석 — docs/MOBILE_ADDON_CROSS_SELL.md §1.1/1.2
 *
 * 우선순위(1소스만):
 *   ① product_recommendations 수동연결(브랜드분 먼저 → 매장분) 있으면 그걸
 *   ② 없으면 "추천 카테고리"(is_recommendation_source 또는 이름 자동감지)의 상품
 *   ③ 그래도 없으면 []
 * 공통 필터: is_active, brand_scope_active!=false, 재고(track_stock=false||current_stock>0),
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
  return !p.track_stock || (Number(p.current_stock) || 0) > 0;
}
function visible(p) {
  // 노출 = is_active(RA) AND brand_scope_active(BG, false=숨김)
  return p.is_active !== false && p.brand_scope_active !== false;
}

const PUBLIC_PRODUCT_ATTRS = ['id', 'name', 'price', 'image', 'image_thumbnail', 'category', 'is_set_menu', 'description'];

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

  let candidates = [];
  if (links.length) {
    const recIds = [...new Set(links.map(l => l.recommended_product_id))];
    const found = await Product.findAll({ where: { id: { [Op.in]: recIds }, restaurant_id: restaurantId }, attributes: [...PUBLIC_PRODUCT_ATTRS, 'is_active', 'brand_scope_active', 'track_stock', 'current_stock'] });
    const byId = new Map(found.map(p => [p.id, p]));
    candidates = recIds.map(id => byId.get(id)).filter(Boolean); // preserve link order
  } else {
    // ② 추천 카테고리의 상품
    const cats = await Category.findAll({ where: { restaurant_id: restaurantId }, attributes: ['name', 'is_recommendation_source'] });
    const recNames = cats.filter(categoryIsRecommendationSource).map(c => c.name);
    if (recNames.length) {
      candidates = await Product.findAll({
        where: { restaurant_id: restaurantId, category: { [Op.in]: recNames } },
        attributes: [...PUBLIC_PRODUCT_ATTRS, 'is_active', 'brand_scope_active', 'track_stock', 'current_stock'],
        order: [['display_order', 'ASC'], ['id', 'DESC']],
      });
    }
  }

  const out = [];
  for (const p of candidates) {
    if (p.id === Number(productId)) continue;     // 자신 제외
    if (!visible(p) || !inStock(p)) continue;
    out.push({
      id: p.id, name: p.name, price: p.price,
      image: p.image || p.image_thumbnail || null,
      category: p.category, is_set_menu: p.is_set_menu, description: p.description || null,
    });
    if (out.length >= limit) break;
  }
  return out;
}

module.exports = { resolveRecommendations, categoryIsRecommendationSource, REC_CATEGORY_KEYWORDS };
