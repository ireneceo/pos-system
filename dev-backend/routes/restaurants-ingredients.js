// 레스토랑 재료(ingredient) 라우트
// 마운트: /api/restaurants

const express = require('express');
const router = express.Router();
require('../models'); // Load associations
const { readableIngredient, writableIngredient } = require('../utils/brandStockAccess');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Foodcourt = require('../models/Foodcourt');
const Invoice = require('../models/Invoice');
const Order = require('../models/Order');
const PlanTemplate = require('../models/PlanTemplate');
const Category = require('../models/Category');
const Product = require('../models/Product');
const AddonModule = require('../models/AddonModule');
const { Recipe, Ingredient, RecipeIngredient } = require('../models');
const CompanySettings = require('../models/CompanySettings');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess, requireRole } = require('../middleware/auth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const { validateRestaurantCreation } = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const { getTodayBounds, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { deleteOldImages, saveImageToFile } = require('../utils/imageProcessor');

// Tier gate (P0-3, 2026-06-08): restaurant-owned ingredient management is an
// Advanced-tier feature (inventory_management OR ingredients module — mirrors the
// frontend ui_routes for /ingredients). This router (mounted in the
// /api/restaurants barrel) is the primary handler for /:rid/ingredients, so the
// gate must live here too — the ingredients.js gate only covers the fall-through
// paths it serves at /api. Scoped to the /:restaurantId/ingredients prefix so
// sibling /:restaurantId/* routes in the barrel are unaffected.
const restaurantIngredientGate = requireRestaurantModule(['inventory_management', 'ingredients'], 'restaurantId');
router.use('/:restaurantId/ingredients', authenticateToken, restaurantIngredientGate);

// base64 data URL이 들어오면 디스크 파일로 저장하고 URL 반환.
// 이미 URL이면 그대로, 빈/null이면 null. ingredient image_url 표준화.
async function normalizeIngredientImage(value, scopeId) {
  if (value == null) return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('/uploads/')) return trimmed;
  if (trimmed.startsWith('data:image/')) {
    const filename = `ingredient_${scopeId}_${Date.now()}`;
    const url = await saveImageToFile(trimmed, filename, { subdir: 'ingredients', maxWidth: 600, maxHeight: 600 });
    return url || null;
  }
  return null;
}

router.get('/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const includeSellers = req.query.include === 'sellers';
    const hasSellersFilter = req.query.has_sellers === '1' || req.query.has_sellers === 'true';

    const IngredientCategory = require('../models/IngredientCategory');
    const ingredients = await Ingredient.findAll({
      where: { restaurant_id: restaurantId },
      order: [['name', 'ASC']],
      include: [{
        model: IngredientCategory,
        as: 'ingredientCategory',
        attributes: ['id', 'name', 'emoji']
      }]
    });

    // ?include=sellers — cart-first PO UI 용. IngredientSellerProduct + seller 회사명 join.
    if (includeSellers) {
      const IngredientSellerProduct = require('../models/IngredientSellerProduct');
      const SupplierCompany = require('../models/SupplierCompany');
      const SupplierProduct = require('../models/SupplierProduct');
      const SupplierProductOptionGroup = require('../models/SupplierProductOptionGroup');
      const SupplierProductOption = require('../models/SupplierProductOption');

      const ingIds = ingredients.map(i => i.id);
      const mappings = ingIds.length === 0 ? [] : await IngredientSellerProduct.findAll({
        where: { ingredient_id: { [Op.in]: ingIds }, is_active: true },
        order: [['is_preferred', 'DESC'], ['unit_price', 'ASC']]
      });

      // 매핑된 supplier_product 의 옵션 그룹 lookup (Mine 탭 카드 옵션 표시용)
      const supplierProductIds = [...new Set(mappings.filter(m => m.seller_type === 'supplier').map(m => m.seller_product_id))];
      const supProds = supplierProductIds.length === 0 ? [] : await SupplierProduct.findAll({
        where: { id: { [Op.in]: supplierProductIds } },
        include: [{
          model: SupplierProductOptionGroup,
          as: 'optionGroups',
          attributes: ['id', 'name', 'is_required', 'min_selections', 'max_selections', 'sort_order'],
          through: { attributes: [] },
          include: [{
            model: SupplierProductOption,
            as: 'options',
            attributes: ['id', 'name', 'price_adjustment', 'sort_order'],
            where: { is_active: true },
            required: false
          }],
          required: false
        }]
      });
      // Supplier product identity (name + SKU) for display next to internal name/code (P0-1).
      const spInfoById = {};
      for (const sp of supProds) {
        spInfoById[sp.id] = { name: sp.name || null, sku: sp.sku || null };
      }
      const optsBySpId = {};
      for (const sp of supProds) {
        optsBySpId[sp.id] = (sp.optionGroups || [])
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
          .map(g => ({
            id: g.id, name: g.name, is_required: !!g.is_required,
            min_selections: g.min_selections || 0, max_selections: g.max_selections || 1,
            options: (g.options || [])
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map(o => ({ id: o.id, name: o.name, price_adjustment: parseFloat(o.price_adjustment) || 0 }))
          }));
      }

      const supplierIds = [...new Set(mappings.filter(m => m.seller_type === 'supplier').map(m => m.seller_entity_id).filter(Boolean))];
      const brandIds = [...new Set(mappings.filter(m => m.seller_type === 'brand').map(m => m.seller_entity_id).filter(Boolean))];
      const foodcourtIds = [...new Set(mappings.filter(m => m.seller_type === 'foodcourt').map(m => m.seller_entity_id).filter(Boolean))];

      const [suppliers, brands, foodcourts] = await Promise.all([
        supplierIds.length ? SupplierCompany.findAll({ where: { id: { [Op.in]: supplierIds } }, attributes: ['id', 'name'] }) : [],
        brandIds.length ? Brand.findAll({ where: { id: { [Op.in]: brandIds } }, attributes: ['id', 'name'] }) : [],
        foodcourtIds.length ? Foodcourt.findAll({ where: { id: { [Op.in]: foodcourtIds } }, attributes: ['id', 'name'] }) : []
      ]);
      const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s.name]));
      const brandMap = Object.fromEntries(brands.map(b => [b.id, b.name]));
      const foodcourtMap = Object.fromEntries(foodcourts.map(f => [f.id, f.name]));

      // Brand seller sources carry the brand's OWN product name/SKU — different from the
      // restaurant's internal stock item name. Resolve them like supplier products so the
      // item shows the brand's product name + code, not just "BRAND · <brand>". (Irene 2026-07-05, ③ 확장)
      const BrandProduct = require('../models/BrandProduct');
      const brandProductIds = [...new Set(mappings.filter(m => m.seller_type === 'brand').map(m => m.seller_product_id).filter(Boolean))];
      const brandProds = brandProductIds.length
        ? await BrandProduct.findAll({ where: { id: { [Op.in]: brandProductIds } }, attributes: ['id', 'name', 'sku'], paranoid: false })
        : [];
      const bpInfoById = Object.fromEntries(brandProds.map(b => [b.id, { name: b.name, sku: b.sku }]));

      const sellersByIngredient = {};
      for (const m of mappings) {
        const arr = sellersByIngredient[m.ingredient_id] || (sellersByIngredient[m.ingredient_id] = []);
        let sellerName = 'Unknown';
        if (m.seller_type === 'supplier') sellerName = supplierMap[m.seller_entity_id] || 'Supplier';
        else if (m.seller_type === 'brand') sellerName = brandMap[m.seller_entity_id] || 'Brand';
        else if (m.seller_type === 'foodcourt') sellerName = foodcourtMap[m.seller_entity_id] || 'Foodcourt';
        else if (m.seller_type === 'system_admin') sellerName = 'PurpleHere';
        const groups = (m.seller_type === 'supplier' ? (optsBySpId[m.seller_product_id] || []) : []);
        const spInfo = (m.seller_type === 'supplier' ? spInfoById[m.seller_product_id]
                      : m.seller_type === 'brand' ? bpInfoById[m.seller_product_id]
                      : null) || {};
        arr.push({
          id: m.id,
          seller_product_id: m.seller_product_id,
          seller_type: m.seller_type,
          seller_entity_id: m.seller_entity_id,
          seller_name: sellerName,
          seller_product_name: spInfo.name || null,
          seller_product_sku: spInfo.sku || null,
          unit_price: parseFloat(m.unit_price),
          unit_conversion: parseFloat(m.unit_conversion),
          min_order_quantity: m.min_order_quantity,
          lead_time_days: m.lead_time_days,
          is_preferred: m.is_preferred,
          option_groups: groups,
          has_options: groups.length > 0
        });
      }

      let enriched = ingredients.map(ing => {
        const plain = ing.toJSON();
        plain.sellers = sellersByIngredient[plain.id] || [];
        return plain;
      });

      if (hasSellersFilter) {
        enriched = enriched.filter(ing => ing.sellers.length > 0);
      }

      return res.json({ success: true, data: enriched });
    }

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get restaurant ingredients error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to load ingredients', code: 'INTERNAL_ERROR' } });
  }
});

// Get linked recipes/products for an ingredient
router.get('/:restaurantId/ingredients/:ingredientId/usage', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;
    const { RecipeIngredient, Recipe, Product } = require('../models');
    const { Op } = require('sequelize');

    // Recipes using this ingredient (scoped to this restaurant or brand recipes)
    const recipeLinks = await RecipeIngredient.findAll({
      where: { ingredient_id: ingredientId },
      include: [{ model: Recipe, as: 'recipe', attributes: ['id', 'name', 'owner_type', 'restaurant_id', 'brand_id'] }]
    });
    const recipes = recipeLinks
      .filter(rl => rl.recipe)
      .filter(rl => rl.recipe.restaurant_id == restaurantId || rl.recipe.owner_type === 'brand')
      .map(rl => ({ id: rl.recipe.id, name: rl.recipe.name, owner_type: rl.recipe.owner_type }));

    // Deduplicate recipes by id
    const uniqueRecipes = [...new Map(recipes.map(r => [r.id, r])).values()];

    // Products (menus) in THIS restaurant linked via recipe_id
    const recipeIds = uniqueRecipes.map(r => r.id);
    let products = [];
    if (recipeIds.length > 0) {
      products = await Product.findAll({
        where: { recipe_id: { [Op.in]: recipeIds }, restaurant_id: restaurantId },
        attributes: ['id', 'name', 'price', 'recipe_id']
      });
      products = products.map(p => p.get({ plain: true }));
    }

    res.json({ success: true, data: { recipes: uniqueRecipes, products } });
  } catch (error) {
    console.error('Get ingredient usage error:', error);
    res.status(500).json({ success: false, message: 'Failed to get ingredient usage' });
  }
});

router.post('/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const {
      code, name, image_url, category, ingredient_category_id, unit,
      base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock
    } = req.body;
    const normalizedImage = await normalizeIngredientImage(image_url, restaurantId);
    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      code: code || null,
      name,
      image_url: normalizedImage,
      category,
      ingredient_category_id: ingredient_category_id || null,
      unit,
      base_quantity: base_quantity || 1,
      unit_cost,
      // 레거시 단일공급 컬럼 쓰기 중단 (2026-07-04). 공급처는 seller-source 매핑(ingredient_seller_products)으로 관리.
      // 신규 재고는 레거시 supplier_name/supplier_id 를 채우지 않는다(데이터 드리프트 방지). 표시는 매핑 기준.
      supplier_name: null,
      supplier_id: null,
      min_stock: min_stock || 0,
      current_stock: 0,
      track_stock: track_stock || false
    });
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ error: error.message || 'Failed to create ingredient' });
  }
});

// ============================================
// POST /api/restaurants/:restaurantId/ingredients/from-catalog
// — Cart drawer "카탈로그" tab 에서 supplier_product 클릭 시 호출.
//   ingredient 자동 생성 + IngredientSellerProduct 매핑 자동 생성. 응답에 둘 다 반환.
//   이미 매핑된 supplier_product 면 기존 ingredient 그대로 반환 (idempotent).
// ============================================
router.post('/:restaurantId/ingredients/from-catalog', authenticateToken, checkRestaurantAccess, async (req, res) => {
  const t = await Ingredient.sequelize.transaction();
  try {
    const rid = parseInt(req.params.restaurantId, 10);
    const body = req.body || {};
    const SupplierContract = require('../models/SupplierContract');
    const BrandProductBrand = require('../models/BrandProductBrand');
    const FoodcourtProduct = require('../models/FoodcourtProduct');
    const catalogLink = require('../utils/catalogLink');

    const seller = await catalogLink.resolveSellerProduct({
      body,
      transaction: t,
      supplierContract: (supplierCompanyId) => SupplierContract.findOne({
        where: { entity_type: 'restaurant', entity_id: rid, supplier_company_id: supplierCompanyId, status: 'active' },
        transaction: t
      }),
      // ✅ 이 패밀리만 verifySellerRelation(restaurant.brand_id === seller_entity_id)과 정합한다.
      //    새 코드는 이 의미를 따를 것. 다른 패밀리는 다르다 — utils/catalogLink.js 상단 참조.
      brandSellerEntityId: async () => {
        const rest = await Restaurant.findByPk(rid, { attributes: ['id', 'brand_id'], transaction: t });
        return rest && rest.brand_id ? rest.brand_id : null;
      },
      // distribution_mode 별 가맹 관계 검증 (원래 로직 그대로)
      brandAccessCheck: async (bp) => {
        const rest = await Restaurant.findByPk(rid, { attributes: ['id', 'brand_id'], transaction: t });
        if (!rest || !rest.brand_id) return false;
        if (bp.distribution_mode === 'all') {
          const ownerBrand = await require('../models').Brand.findByPk(rest.brand_id, { attributes: ['owner_id'], transaction: t });
          return !!(ownerBrand && bp.owner_user_id === ownerBrand.owner_id);
        }
        if (bp.distribution_mode === 'specific_brands') {
          return !!(await BrandProductBrand.findOne({ where: { product_id: bp.id, brand_id: rest.brand_id }, transaction: t }));
        }
        if (bp.distribution_mode === 'specific_restaurants') {
          const BrandProductRestaurant = require('../models/BrandProductRestaurant');
          return !!(await BrandProductRestaurant.findOne({ where: { product_id: bp.id, restaurant_id: rid }, transaction: t }));
        }
        return false;
      }
    });
    if (!seller.ok) { await t.rollback(); return res.status(seller.status).json(seller.body); }

    // 부모 브랜드가 없으면 brand seller 를 해석할 수 없다 (원래 403 계약 유지)
    if (seller.sellerType === 'brand' && !seller.sellerEntityId) {
      await t.rollback();
      return res.status(403).json({ success: false, message: 'Restaurant has no parent brand' });
    }

    // foodcourt 판매자 추가 검증 (원래 로직 그대로 — 공용 함수 밖의 패밀리 고유 규칙)
    if (seller.sellerType === 'foodcourt') {
      const fp = seller.sellerProductRow;
      const rest = await Restaurant.findByPk(rid, { attributes: ['id', 'foodcourt_id'], transaction: t });
      if (!rest?.foodcourt_id || rest.foodcourt_id !== fp.foodcourt_id) {
        await t.rollback();
        return res.status(403).json({ success: false, message: 'This foodcourt product is not available for your foodcourt' });
      }
      if (fp.distribution_mode === 'specific_restaurants') {
        const FoodcourtProductRestaurant = require('../models/FoodcourtProductRestaurant');
        const flink = await FoodcourtProductRestaurant.findOne({ where: { product_id: fp.id, restaurant_id: rid }, transaction: t });
        if (!flink) {
          await t.rollback();
          return res.status(403).json({ success: false, message: 'This foodcourt product is not available for your restaurant' });
        }
      }
    }

    // Connect mode — body.unit_conversion 우선, 기본 1
    const bodyConversion = catalogLink.resolveUnitConversion(body.unit_conversion);
    const existingIngredientId = parseInt(body.existing_ingredient_id, 10);
    if (Number.isFinite(existingIngredientId)) {
      const targetIng = await Ingredient.findByPk(existingIngredientId, { transaction: t });
      if (!targetIng || targetIng.restaurant_id !== rid) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target ingredient not found in this restaurant' });
      }
      const r = await catalogLink.connectExisting({
        target: targetIng, seller, unitConversion: bodyConversion, targetKey: 'ingredient_id', transaction: t
      });
      await t.commit();
      return res.status(r.status).json(r.body);
    }

    const already = await catalogLink.findAlreadyLinked({
      seller, targetKey: 'ingredient_id',
      findTarget: (id) => Ingredient.findByPk(id, { transaction: t }),
      ownsTarget: (ing) => ing.restaurant_id === rid,
      transaction: t
    });
    if (already) { await t.commit(); return res.status(already.status).json(already.body); }

    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      restaurant_id: rid,
      brand_id: null,
      name: body.name || seller.productName,
      unit: catalogLink.resolveUnit(body.unit, seller.productUnit),
      base_quantity: 1,
      unit_cost: parseFloat(seller.productPrice) || 0,
      supplier_name: null,
      supplier_id: null,
      min_stock: 0,
      current_stock: 0,
      // ⚠ 이 패밀리만 true 다(다른 3벌은 false). 동작 보존 — 임의로 맞추지 말 것.
      track_stock: true,
      is_active: true,
      code: ''
    }, { transaction: t });

    // ⚠ 생성 흐름의 매핑은 원래 unit_conversion 을 **1 로 고정**했다(body 값 무시). 보존.
    const mapping = await catalogLink.createMappingFor({
      target: ingredient, seller, unitConversion: 1, targetKey: 'ingredient_id', transaction: t
    });

    await t.commit();
    res.status(201).json({ success: true, data: { ingredient, mapping, created: true } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /restaurants/:restaurantId/ingredients/from-catalog error:', err);
    res.status(500).json({ success: false, message: 'Failed to create ingredient from catalog' });
  }
});

router.put('/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock, image_url, ingredient_category_id, base_quantity, supplier_id, track_stock } = req.body;

    // 소유권 — 재료 행 자체를 고치는 API. 예전엔 findByPk 만 하고 소유권을 안 봐서
    // 남의 매장 재료나 브랜드 표준 재료(형제 매장 공유 행)까지 수정·삭제됐다.
    // 브랜드 재료의 정의는 브랜드가 소유한다(매장은 재고만) — docs/BRAND_STOCK_SHARING_DESIGN.md
    const buyer = { type: 'restaurant', id: parseInt(restaurantId, 10) };
    const own = await writableIngredient(ingredientId, buyer);
    if (!own) {
      const shared = await readableIngredient(ingredientId, buyer);
      return res.status(shared ? 403 : 404).json({
        success: false,
        message: shared ? 'Brand-owned stock item is read-only. Only the brand can change it.' : 'Ingredient not found'
      });
    }

    const ingredient = own;

    // Build update object with only provided fields
    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (unit !== undefined) updateData.unit = unit;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    // 레거시 supplier_name/supplier_id 쓰기 중단 (2026-07-04) — 기존 값은 보존, API 로는 더는 수정하지 않음. 공급처=seller-source 매핑.
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (image_url !== undefined) {
      const normalized = await normalizeIngredientImage(image_url, ingredient.restaurant_id);
      if (normalized && ingredient.image_url && normalized !== ingredient.image_url) {
        await deleteOldImages(ingredient.image_url);
      }
      updateData.image_url = normalized;
    }
    if (ingredient_category_id !== undefined) updateData.ingredient_category_id = ingredient_category_id;
    if (base_quantity !== undefined) updateData.base_quantity = base_quantity;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

    await ingredient.update(updateData);
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Update restaurant ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update ingredient', code: 'INTERNAL_ERROR' } });
  }
});

router.delete('/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;
    // 소유권 — 남의 매장 재료/브랜드 표준 재료 삭제 차단 (예전엔 id 만으로 삭제됐다)
    const buyer = { type: 'restaurant', id: parseInt(restaurantId, 10) };
    const ingredient = await writableIngredient(ingredientId, buyer);
    if (!ingredient) {
      const shared = await readableIngredient(ingredientId, buyer);
      return res.status(shared ? 403 : 404).json({
        success: false,
        message: shared ? 'Brand-owned stock item is read-only. Only the brand can delete it.' : 'Ingredient not found'
      });
    }
    await ingredient.destroy();
    res.json({ success: true, message: 'Ingredient deleted' });
  } catch (error) {
    console.error('Delete restaurant ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete ingredient', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Restaurant Recipes Routes - MOVED TO /routes/recipes.js
// ============================================

// ============================================
// Inventory Routes - Mount inventory router
// ============================================

module.exports = router;
