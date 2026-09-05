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
const { validateRestaurantCreation, sanitizeString } = require('../middleware/validation');
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
        spInfoById[sp.id] = { name: sp.name || null, sku: sp.sku || null,
          unit: sp.unit || null,
          base_quantity: sp.base_quantity != null ? parseFloat(sp.base_quantity) : 1,
          order_mode: sp.order_mode || 'pack' };
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

      // 판매자 표시명은 **공용 단일소스**(utils/sellerNames)를 쓴다.
      // ⚠ 2026-08-28 Irene: 거래처가 "with MIN"(브랜드명)으로 떠서 헷갈렸다 — 여기서 브랜드 테이블의
      //   `name` 만 직접 읽고 `company_name`(GIT Consulting)을 안 봤기 때문이다.
      //   각자 조회를 짜면 이런 어긋남이 또 난다. 단일소스 경유로 고정한다.
      const { resolveSellers, getSellerName } = require('../utils/sellerNames');
      const sellerResolved = await resolveSellers(
        mappings.map(m => ({ seller_type: m.seller_type, seller_entity_id: m.seller_entity_id }))
      );

      // Brand seller sources carry the brand's OWN product name/SKU — different from the
      // restaurant's internal stock item name. Resolve them like supplier products so the
      // item shows the brand's product name + code, not just "BRAND · <brand>". (Irene 2026-07-05, ③ 확장)
      const BrandProduct = require('../models/BrandProduct');
      const brandProductIds = [...new Set(mappings.filter(m => m.seller_type === 'brand').map(m => m.seller_product_id).filter(Boolean))];
      const brandProds = brandProductIds.length
        ? await BrandProduct.findAll({ where: { id: { [Op.in]: brandProductIds } },
            attributes: ['id', 'name', 'sku', 'unit', 'base_quantity', 'order_mode'], paranoid: false })
        : [];
      // 규격·주문방식까지 담는다 — 빠뜨리면 브랜드 상품이 늘 "낱개 주문"으로 보인다.
      const bpInfoById = Object.fromEntries(brandProds.map(b => [b.id, {
        name: b.name, sku: b.sku,
        unit: b.unit || null,
        base_quantity: b.base_quantity != null ? parseFloat(b.base_quantity) : 1,
        order_mode: b.order_mode || 'pack'
      }]));

      const sellersByIngredient = {};
      for (const m of mappings) {
        const arr = sellersByIngredient[m.ingredient_id] || (sellersByIngredient[m.ingredient_id] = []);
        let sellerName = m.seller_type === 'system_admin'
          ? 'PurpleHere'
          : (getSellerName(sellerResolved, m.seller_type, m.seller_entity_id) || 'Unknown');
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
          // 규격·주문방식 — 구매 화면의 "5kg/포대" 표시와 kg 소수 입력을 결정한다.
          // (2026-08-30 단위주문. 공급업체·브랜드 양쪽에서 온다 — 없으면 'pack' = 현행 동작)
          seller_unit: spInfo.unit ?? null,
          base_quantity: spInfo.base_quantity ?? 1,
          order_mode: spInfo.order_mode ?? 'pack',
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
      base_quantity, unit_cost, supplier_name, supplier_id, min_stock
    } = req.body;
    const normalizedImage = await normalizeIngredientImage(image_url, restaurantId);
    // 코드 자동 부여 — 자동 생성이 그림자 라우트(`ingredients.js :765`)에만 있어서
    //   **실제로 도는 이 경로**로 만든 매장 재료는 코드가 비었다(2026-09-06).
    const { generateIngredientCode, codeTakenResponse } = require('../utils/codeGenerator');
    const takenIng = await codeTakenResponse(Ingredient, code, { restaurant_id: restaurantId, owner_type: 'restaurant' });
    if (takenIng) return res.status(takenIng.status).json(takenIng.body);
    const finalCode = code || await generateIngredientCode(Ingredient, 'restaurant', restaurantId);
    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      code: finalCode,
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
    });
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ error: error.message || 'Failed to create ingredient' });
  }
});

// ============================================
// POST /api/restaurants/:restaurantId/ingredients/:ingredientId/register-as-product
// 재고아이템(재료)을 **그대로 파는 프로덕트**로도 등록한다 (P3-③ · 설계 Q1-부속).
//
// 왜 레시피를 만드는가: 한 물건이 재료이면서 그대로도 팔리는 경우(병음료를 칵테일 재료로도,
// 낱개로도) **수량은 재료 한 곳에만 살아야 한다.** 프로덕트에 따로 수량을 두면 같은 물건이
// 둘로 갈라진다(GIT 포장재가 정확히 그 사고였다). 그래서 프로덕트에는 재고를 두지 않고
// **재료 ×1 레시피**를 걸어, 팔릴 때 재료에서 빠지게 한다.
//
// ⛔ 판매가는 필수 입력이다 — 공급가(원가)를 판매가로 복사하지 않는다
//    ([[reference_supplier_cost_copied_as_price]]: 스크립트로 복사해 마진 0 을 운영에 박은 사고).
// 중복(이미 이 재료 ×1 레시피로 파는 프로덕트가 있음) → 409. 전부 한 트랜잭션.
router.post('/:restaurantId/ingredients/:ingredientId/register-as-product', authenticateToken, checkRestaurantAccess, async (req, res) => {
  const { sequelize } = require('../config/database');
  const t = await sequelize.transaction();
  try {
    const rid = parseInt(req.params.restaurantId, 10);
    const ingredientId = parseInt(req.params.ingredientId, 10);
    const { Recipe, RecipeIngredient, Product } = require('../models');
    const { generateRecipeCode } = require('../utils/codeGenerator');

    const price = parseFloat(req.body?.price);
    if (!Number.isFinite(price) || price <= 0) {
      await t.rollback();
      return res.status(400).json({
        success: false, code: 'PRICE_REQUIRED',
        message: 'Selling price is required (supplier cost is never copied into it)'
      });
    }

    const ing = await Ingredient.findByPk(ingredientId, { transaction: t });
    // 이 매장 소유 재료만. 부모 브랜드의 표준 재료는 브랜드가 관리한다(매장은 읽기전용).
    if (!ing || ing.owner_type !== 'restaurant' || parseInt(ing.restaurant_id, 10) !== rid) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Ingredient not found in this restaurant' });
    }

    // 중복 검사 — "이 재료 하나만 쓰는 레시피에 걸린 이 매장 프로덕트"가 이미 있으면 그것이 답이다.
    // 표시(마커) 컬럼이 아니라 **데이터 자체**로 판정한다(마커는 사람이 지우면 중복이 다시 생긴다).
    const linksOfIngredient = await RecipeIngredient.findAll({
      where: { ingredient_id: ingredientId }, attributes: ['recipe_id'], transaction: t
    });
    const candidateRecipeIds = [...new Set(linksOfIngredient.map((l) => l.recipe_id))];
    let soloRecipeIds = [];
    if (candidateRecipeIds.length) {
      const allLinks = await RecipeIngredient.findAll({
        where: { recipe_id: candidateRecipeIds }, attributes: ['recipe_id', 'ingredient_id'], transaction: t
      });
      const countByRecipe = allLinks.reduce((m, l) => { m[l.recipe_id] = (m[l.recipe_id] || 0) + 1; return m; }, {});
      soloRecipeIds = candidateRecipeIds.filter((id) => countByRecipe[id] === 1);
    }
    if (soloRecipeIds.length) {
      const dup = await Product.findOne({
        where: { restaurant_id: rid, recipe_id: soloRecipeIds, is_active: true },
        attributes: ['id', 'name'], transaction: t
      });
      if (dup) {
        await t.rollback();
        return res.status(409).json({
          success: false, code: 'ALREADY_A_PRODUCT',
          message: `Already sold as a product: ${dup.name}`,
          data: { product_id: dup.id, product_name: dup.name }
        });
      }
    }

    const recipe = await Recipe.create({
      owner_type: 'restaurant',
      restaurant_id: rid,
      brand_id: null,
      code: await generateRecipeCode(Recipe, 'restaurant', rid),
      name: sanitizeString(String(req.body?.name || ing.name)).slice(0, 100),
      // ×1 — "이 재료 한 단위를 그대로 판다"
      yield_amount: 1,
      yield_unit: ing.unit || 'piece',
      is_active: true,
    }, { transaction: t });

    await RecipeIngredient.create({
      recipe_id: recipe.id,
      ingredient_id: ing.id,
      quantity: 1,
      unit: ing.unit || 'piece',
      cost: parseFloat(ing.unit_cost) || 0,
    }, { transaction: t });

    const product = await Product.create({
      restaurant_id: rid,
      name: sanitizeString(String(req.body?.name || ing.name)).slice(0, 100),
      // products.category 는 NOT NULL(기본값 없음)
      category: req.body?.category ? sanitizeString(String(req.body.category)).slice(0, 50) : 'Uncategorized',
      price,
      recipe_id: recipe.id,
      is_active: true,
      // 재고는 재료에 산다 — 프로덕트 수량은 쓰지 않는다(레시피가 걸린 프로덕트는 재료에서 차감).
      current_stock: 0,
      min_stock: 0,
      stock_unit: ing.unit || 'piece',
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ success: true, data: { product, recipe } });
  } catch (error) {
    await t.rollback().catch(() => {});
    console.error('register-as-product (restaurant) error:', error);
    res.status(500).json({ success: false, message: 'Failed to register ingredient as a product' });
  }
});

// ============================================
// GET /api/restaurants/:restaurantId/stock-products
// 레시피 없는 프로덕트 = 그 자체가 재고아이템. 발주 화면·재고 목록이 재료와 **같은 모양**으로 받아
// 한 목록에 섞어 보여줄 수 있게 한다(프론트가 분기하지 않도록 필드명을 재료 쪽에 맞춘다).
// 2026-09-02(P3): P1 에서 서버·컬럼은 열렸는데 이 목록이 없어 화면에서 프로덕트를 고를 수 없었다.
router.get('/:restaurantId/stock-products', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const rid = parseInt(req.params.restaurantId, 10);
    const { Product, IngredientSellerProduct } = require('../models');
    const rows = await Product.findAll({
      where: {
        restaurant_id: rid,
        is_active: true,
        is_set_menu: false,
        recipe_id: null,
        product_recipe_id: null,
      },
      // ⚠ products 는 createdAt(카멜)이다 — 다른 테이블과 달리 underscored 가 아니다
      attributes: ['id', 'name', 'stock_unit', 'current_stock', 'min_stock', 'category', 'createdAt'],
      order: [['name', 'ASC']],
    });
    const ids = rows.map((r) => r.id);
    const links = ids.length
      ? await IngredientSellerProduct.findAll({ where: { product_id: ids, is_active: true } })
      : [];
    const bySource = links.reduce((m, l) => {
      (m[l.product_id] = m[l.product_id] || []).push(l);
      return m;
    }, {});
    const { attachSellerProductIdentity } = require('../utils/sellerProductIdentity');
    const data = rows.map((r) => ({
      id: r.id,
      kind: 'product',          // 재료 행과 구분하는 유일한 필드
      name: r.name,
      unit: r.stock_unit || null,
      current_stock: r.current_stock != null ? Number(r.current_stock) : null,
      min_stock: r.min_stock != null ? Number(r.min_stock) : null,
      category: r.category || null,
      created_at: r.createdAt || null,
      sellerSources: (bySource[r.id] || []).map((s) => ({
        id: s.id,
        seller_product_id: s.seller_product_id,
        seller_type: s.seller_type,
        seller_entity_id: s.seller_entity_id,
        unit_price: Number(s.unit_price) || 0,
        unit_conversion: Number(s.unit_conversion) || 1,
        min_order_quantity: Number(s.min_order_quantity) || 1,
        lead_time_days: Number(s.lead_time_days) || 0,
        is_preferred: !!s.is_preferred,
      })),
    }));
    try { await attachSellerProductIdentity(data.flatMap((d) => d.sellerSources)); } catch { /* 표시용 — 실패해도 목록은 준다 */ }
    res.json({ success: true, data });
  } catch (err) {
    console.error('GET /restaurants/:restaurantId/stock-products error:', err);
    res.status(500).json({ success: false, message: 'Failed to load stock products' });
  }
});

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
    // 2026-09-02(P3-②): 레시피 없는 프로덕트도 "우리 쪽 항목"이 될 수 있다.
    //   P1 에서 서버·컬럼은 열렸는데 입구(화면·라우트)가 재료만 받아 프로덕트를 고를 수 없었다.
    //   ⛔ 판매가를 공급가로 채우지 않는다 — 예전에 스크립트로 원가를 판매가에 복사해
    //      마진 0 을 운영에 박은 사고가 있었다([[reference_supplier_cost_copied_as_price]]).
    const existingProductId = parseInt(body.existing_product_id, 10);
    if (Number.isFinite(existingProductId)) {
      const { Product } = require('../models');
      const prod = await Product.findByPk(existingProductId, { transaction: t });
      if (!prod || parseInt(prod.restaurant_id, 10) !== rid) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target product not found in this restaurant' });
      }
      if (prod.recipe_id || prod.product_recipe_id || prod.is_set_menu) {
        await t.rollback();
        return res.status(400).json({
          success: false, code: 'PRODUCT_HAS_RECIPE',
          message: 'This product has a recipe — its stock comes from ingredients, not from purchases'
        });
      }
      const r = await catalogLink.connectExisting({
        target: prod, seller, unitConversion: bodyConversion, targetKey: 'product_id', transaction: t
      });
      await t.commit();
      return res.status(r.status).json(r.body);
    }

    // 새 프로덕트로 등록 — 판매가는 **사람이 넣어야 한다**(빈 값·0 이하면 400)
    if (body.new_product && typeof body.new_product === 'object') {
      const np = body.new_product;
      const price = parseFloat(np.price);
      if (!Number.isFinite(price) || price <= 0) {
        await t.rollback();
        return res.status(400).json({
          success: false, code: 'PRICE_REQUIRED',
          message: 'Selling price is required for a new product (supplier cost is never copied into it)'
        });
      }
      const { Product } = require('../models');
      const prod = await Product.create({
        restaurant_id: rid,
        name: sanitizeString(String(np.name || seller.productName || '')).slice(0, 255),
        // products.category 는 NOT NULL(기본값 없음) — null 로 넣으면 통째로 500 이 난다.
        // 이 화면엔 카테고리 칸이 없으므로 기존 관행값으로 떨어뜨린다(운영·dev 공통 'Uncategorized').
        category: np.category ? sanitizeString(String(np.category)).slice(0, 50) : 'Uncategorized',
        price,
        is_active: true,
        current_stock: 0,
        min_stock: parseFloat(np.min_stock) || 0,
        stock_unit: catalogLink.resolveUnit(np.unit, seller.productUnit),
      }, { transaction: t });
      const mapping = await catalogLink.createMappingFor({
        target: prod, seller, unitConversion: bodyConversion, targetKey: 'product_id', transaction: t
      });
      await t.commit();
      return res.status(201).json({ success: true, data: { product: prod, mapping, created: true } });
    }

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
      is_active: true,
      code: ''
    }, { transaction: t });

    // 생성 흐름도 body 의 unit_conversion 을 받는다 (2026-08-30 수정).
    //   그전까지 여기만 **1 로 고정**돼 있었다 — 나머지 3벌(ingredients.js 2곳·product-ingredients.js)은
    //   원래부터 body 값을 넘기고 있었고, 이 패밀리만 예외였다.
    //   결과: 판매자 kg ↔ 재고 g 처럼 단위가 다른 링크가 환산비 1 로 만들어져
    //   **1kg 입고가 1g 으로 기록**됐다. 2026-08-30 실측으로 그런 링크 6건 확인
    //   (측정 사이에 4→6 으로 증가 = 이 버그가 계속 새 불량 링크를 만들고 있었다).
    //   bodyConversion 은 connect 모드가 쓰던 것과 **같은 값**이다(위에서 이미 해석됨) —
    //   `resolveUnitConversion` 이 양수만 통과시키고 그 외에는 1 로 떨어뜨린다.
    //   ⛔ 기존 6건 자동 백필은 하지 않는다 — tray→kg 는 기계가 추측할 수 없다(사람이 입력).
    const mapping = await catalogLink.createMappingFor({
      target: ingredient, seller, unitConversion: bodyConversion, targetKey: 'ingredient_id', transaction: t
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
    const { code, name, category, unit, unit_cost, supplier_name, min_stock, image_url, ingredient_category_id, base_quantity, supplier_id } = req.body;

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

    // ⛔ 거울 행은 **동기화가 덮어쓸 칸**을 여기서 못 고친다 — 고쳐 봐야 다음 동기화가 되돌린다.
    //   잠그는 것 = 덮어써질 것, 그 이상은 아니다. 손목록을 적지 않고 `MIRRORED_FIELDS` 에서
    //   파생시킨다 — 목록이 늘거나 줄면 잠금도 같이 움직인다.
    //   카테고리·최소치처럼 **동기화하지 않는 칸은 열어 둔다**(매장이 자기 행을 분류할 수 있어야 한다).
    //   매장별 원가 조정은 `/restaurants/:id/ingredient-costs` (restaurant_ingredient_costs) 가 맡는다.
    if (ingredient.source_product_ingredient_id || ingredient.source_brand_product_id) {
      const { MIRRORED_FIELDS } = require('../services/stockItemMirror');
      const locked = MIRRORED_FIELDS.filter((f) => req.body[f] !== undefined);
      if (locked.length) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'MIRROR_READONLY',
            message: `Edit these at the source (Stock Items / Product): ${locked.join(', ')}`,
            fields: locked
          }
        });
      }
    }

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
