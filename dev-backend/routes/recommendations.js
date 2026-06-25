/**
 * 모바일 크로스셀(#11c) — 레스토랑 관리자(RA) 추천 관리.
 * Mount: /api/restaurants  (restaurantsRouter 보다 먼저 — 구체 경로 우선, fall-through 회피)
 * 설계: docs/MOBILE_ADDON_CROSS_SELL.md §3.1
 *
 * Endpoints (token + checkRestaurantAccess):
 *   GET   /:restaurantId/products/:productId/recommendations         연결 목록(브랜드분 포함, 잠금표시)
 *   PUT   /:restaurantId/products/:productId/recommendations         { recommended_ids:[..] } origin='restaurant'만 교체
 *   PATCH /:restaurantId/categories/:categoryId/recommendation-source { value: true|false|null }
 */
const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { Product, Category, ProductRecommendation } = require('../models');

// 연결 목록 — 브랜드분(잠금표시) + 매장분. 추천상품 이름 동봉.
router.get('/:restaurantId/products/:productId/recommendations', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const productId = parseInt(req.params.productId, 10);
    const links = await ProductRecommendation.findAll({
      where: { restaurant_id: restaurantId, product_id: productId },
      order: [['origin', 'ASC'], ['sort_order', 'ASC'], ['id', 'ASC']],
    });
    const recIds = [...new Set(links.map(l => l.recommended_product_id))];
    const products = recIds.length
      ? await Product.findAll({ where: { id: { [Op.in]: recIds }, restaurant_id: restaurantId }, attributes: ['id', 'name', 'image', 'image_thumbnail', 'is_active'] })
      : [];
    const nameById = new Map(products.map(p => [p.id, p]));
    const data = links.map(l => {
      const p = nameById.get(l.recommended_product_id);
      return {
        id: l.id,
        recommended_product_id: l.recommended_product_id,
        name: p ? p.name : `#${l.recommended_product_id}`,
        image: p ? (p.image || p.image_thumbnail || null) : null,
        sort_order: l.sort_order,
        origin: l.origin,
        is_locked: l.is_locked,
        missing: !p,  // 추천상품이 삭제/타매장이면 표시
      };
    });
    res.json({ success: true, data });
  } catch (e) {
    console.error('GET recommendations:', e.message);
    res.status(500).json({ success: false, message: 'Failed to load recommendations' });
  }
});

// 매장분(origin='restaurant') 통째 교체. 브랜드분(origin='brand')과 잠금분은 보존.
router.put('/:restaurantId/products/:productId/recommendations', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const productId = parseInt(req.params.productId, 10);
    const recommendedIds = Array.isArray(req.body.recommended_ids) ? req.body.recommended_ids.map(Number).filter(Number.isFinite) : [];

    // 기준 상품이 이 매장 소유인지
    const base = await Product.findByPk(productId, { attributes: ['id', 'restaurant_id'] });
    if (!base || Number(base.restaurant_id) !== restaurantId) {
      return res.status(404).json({ success: false, message: 'Product not found in this restaurant' });
    }
    // 추천 대상들도 같은 매장 + 자기 자신 제외 + 중복 제거
    const cleanIds = [...new Set(recommendedIds.filter(id => id !== productId))];
    if (cleanIds.length) {
      const owned = await Product.findAll({ where: { id: { [Op.in]: cleanIds }, restaurant_id: restaurantId }, attributes: ['id'] });
      const ownedSet = new Set(owned.map(p => p.id));
      for (const id of cleanIds) {
        if (!ownedSet.has(id)) return res.status(400).json({ success: false, message: `Recommended product ${id} is not in this restaurant` });
      }
    }

    // origin='restaurant' 만 교체 (브랜드 동기화분 보존)
    await ProductRecommendation.destroy({ where: { restaurant_id: restaurantId, product_id: productId, origin: 'restaurant' } });
    let order = 0;
    for (const recId of cleanIds) {
      await ProductRecommendation.findOrCreate({
        where: { product_id: productId, recommended_product_id: recId },
        defaults: { restaurant_id: restaurantId, product_id: productId, recommended_product_id: recId, sort_order: order, origin: 'restaurant', is_locked: false },
      }).then(([row, created]) => { if (!created) return row.update({ sort_order: order, restaurant_id: restaurantId }); });
      order++;
    }
    res.json({ success: true });
  } catch (e) {
    console.error('PUT recommendations:', e.message);
    res.status(500).json({ success: false, message: 'Failed to save recommendations' });
  }
});

// 카테고리 추천소스 토글 — true=강제포함 / false=강제제외 / null=이름 자동감지
router.patch('/:restaurantId/categories/:categoryId/recommendation-source', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = parseInt(req.params.restaurantId, 10);
    const categoryId = parseInt(req.params.categoryId, 10);
    const { value } = req.body;
    if (!(value === true || value === false || value === null)) {
      return res.status(400).json({ success: false, message: 'value must be true, false, or null' });
    }
    const cat = await Category.findByPk(categoryId);
    if (!cat || Number(cat.restaurant_id) !== restaurantId) {
      return res.status(404).json({ success: false, message: 'Category not found in this restaurant' });
    }
    await cat.update({ is_recommendation_source: value });
    res.json({ success: true, data: { id: cat.id, is_recommendation_source: value } });
  } catch (e) {
    console.error('PATCH recommendation-source:', e.message);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

module.exports = router;
