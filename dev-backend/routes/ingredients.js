const express = require('express');
const router = express.Router();

// 재료 목록 통합 (docs/INGREDIENT_UNIFICATION_DESIGN.md F3).
// 브랜드 재료는 Stock Items 의 거울이라 사람이 직접 만들지 않는다. 되돌리지 말 것 —
// 열면 같은 물건이 두 줄로 갈라지던 2026-06/07 분열이 재발한다.
const ALLOW_BRAND_INGREDIENT_WRITE = false;
const { Ingredient, IngredientCategory, Restaurant, Supplier, RestaurantIngredientCost, IngredientSellerProduct, SupplierProduct } = require('../models');
const { stockMapFor, readableIngredient, writableIngredient } = require('../utils/brandStockAccess');
const { resolveSellers, getSellerName } = require('../utils/sellerNames');
const { Op } = require('sequelize');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { isBrandManager } = require('../middleware/recipeAuth');
const { requireRestaurantModule } = require('../middleware/requireModule');
const { generateIngredientCode } = require('../utils/codeGenerator');
const { deleteOldImages, saveImageToFile } = require('../utils/imageProcessor');

// Tier gate (P0-3, 2026-06-08): a restaurant managing its OWN ingredients /
// ingredient costs is an Advanced-tier feature (inventory_management OR
// ingredients module — mirrors the frontend ui_routes for /ingredients). Scoped
// to the restaurant's own ingredient paths only. NOT applied to
// /restaurants/:id/brand-ingredients (read of HQ-pushed ingredients).
const ingredientGate = requireRestaurantModule(['inventory_management', 'ingredients'], 'restaurantId');
router.use('/restaurants/:restaurantId/ingredients', authenticateToken, ingredientGate);
router.use('/restaurants/:restaurantId/ingredient-costs', authenticateToken, ingredientGate);

async function normalizeIngredientImage(value, scopeId) {
  if (value == null) return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('/uploads/')) return trimmed;
  if (trimmed.startsWith('data:image/')) {
    const filename = `ingredient_brand${scopeId}_${Date.now()}`;
    const url = await saveImageToFile(trimmed, filename, { subdir: 'ingredients', maxWidth: 600, maxHeight: 600 });
    return url || null;
  }
  return null;
}

// ============================================
// Brand Ingredients
// ============================================

/**
 * GET /api/brands/:brandId/ingredients
 * 브랜드 재료 목록 조회
 */
router.get('/brands/:brandId/ingredients', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const includeSellers = req.query.include === 'sellers';
    const hasSellersFilter = req.query.has_sellers === '1' || req.query.has_sellers === 'true';

    // Get all brands owned by this user (shared ingredients across brands)
    const Brand = require('../models/Brand');
    const userBrands = await Brand.findAll({ where: { owner_id: req.user.id }, attributes: ['id'] });
    const allBrandIds = userBrands.map(b => b.id);

    // 소유 브랜드의 재료만. 예전엔 `OR brand_id IS NULL` 이 붙어 전 시스템의 모든 '레스토랑' 재료
    // (brand_id=null, restaurant_id 보유)를 끌어와 BG 에게 타 매장 재료 수십 건이 누출됐다(교차 테넌트).
    // 레스토랑 재료는 brand 재료가 아니므로 여기 절대 포함되면 안 됨. allBrandIds 빈 배열이면 빈 결과.
    const ingredients = await Ingredient.findAll({
      where: { brand_id: { [Op.in]: allBrandIds } },
      order: [['name', 'ASC']],
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
    });

    // ?include=sellers — Cart-first PO UI 용 (NewPurchaseOrderPage)
    if (includeSellers) {
      const IngredientSellerProduct = require('../models/IngredientSellerProduct');
      const SupplierCompany = require('../models/SupplierCompany');
      const SupplierProduct = require('../models/SupplierProduct');
      const SupplierProductOptionGroup = require('../models/SupplierProductOptionGroup');
      const SupplierProductOption = require('../models/SupplierProductOption');
      const Foodcourt = require('../models/Foodcourt');

      const ingIds = ingredients.map(i => i.id);
      const mappings = ingIds.length === 0 ? [] : await IngredientSellerProduct.findAll({
        where: { ingredient_id: { [Op.in]: ingIds }, is_active: true },
        order: [['is_preferred', 'DESC'], ['unit_price', 'ASC']]
      });

      const supplierIds = [...new Set(mappings.filter(m => m.seller_type === 'supplier').map(m => m.seller_entity_id).filter(Boolean))];
      const otherBrandIds = [...new Set(mappings.filter(m => m.seller_type === 'brand').map(m => m.seller_entity_id).filter(Boolean))];
      const fcIds = [...new Set(mappings.filter(m => m.seller_type === 'foodcourt').map(m => m.seller_entity_id).filter(Boolean))];
      const [suppliers, otherBrands, foodcourts] = await Promise.all([
        supplierIds.length ? SupplierCompany.findAll({ where: { id: { [Op.in]: supplierIds } }, attributes: ['id', 'name'] }) : [],
        otherBrandIds.length ? Brand.findAll({ where: { id: { [Op.in]: otherBrandIds } }, attributes: ['id', 'name'] }) : [],
        fcIds.length ? Foodcourt.findAll({ where: { id: { [Op.in]: fcIds } }, attributes: ['id', 'name'] }) : []
      ]);
      const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s.name]));
      const brandMap = Object.fromEntries(otherBrands.map(b => [b.id, b.name]));
      const foodcourtMap = Object.fromEntries(foodcourts.map(f => [f.id, f.name]));

      // Supplier product options lookup
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
      // Supplier product identity (name + SKU) — surfaced so screens can show the
      // supplier's own sale-product name/code alongside our internal ingredient
      // name/code. Design: docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md (P0-1).
      const spInfoById = {};
      for (const sp of supProds) {
        spInfoById[sp.id] = { name: sp.name || null, sku: sp.sku || null,
          unit: sp.unit || null,
          base_quantity: sp.base_quantity != null ? parseFloat(sp.base_quantity) : 1,
          order_mode: sp.order_mode || 'pack' };
      }
      // Brand seller sources also carry the brand's own product name/SKU (different from our
      // internal name) — resolve them so brand-linked items show the brand product identity too.
      // (Irene 2026-07-05, ③ 브랜드 확장)
      const BrandProduct = require('../models/BrandProduct');
      const brandProductIds = [...new Set(mappings.filter(m => m.seller_type === 'brand').map(m => m.seller_product_id).filter(Boolean))];
      const bpInfoById = {};
      if (brandProductIds.length) {
        const bps = await BrandProduct.findAll({ where: { id: { [Op.in]: brandProductIds } }, attributes: ['id', 'name', 'sku', 'unit', 'base_quantity', 'order_mode'], paranoid: false });
        // 규격·주문방식까지 싣는다. 예전엔 name/sku 만 담아서, 브랜드가 5kg 포대로 팔아도
        // 구매 화면엔 `seller_unit=null · base_quantity=1 · order_mode='pack'` 으로 나갔다.
        for (const bp of bps) bpInfoById[bp.id] = {
          name: bp.name || null, sku: bp.sku || null,
          unit: bp.unit || null,
          base_quantity: bp.base_quantity != null ? parseFloat(bp.base_quantity) : 1,
          order_mode: bp.order_mode || 'pack'
        };
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

      // 판매자 표시명 단일소스 — 각자 조회를 짜면 브랜드명/회사명이 어긋난다(2026-08-28).
      const sellerResolvedShared = await resolveSellers(
        mappings.map(m => ({ seller_type: m.seller_type, seller_entity_id: m.seller_entity_id }))
      );

      const sellersByIngredient = {};
      for (const m of mappings) {
        const arr = sellersByIngredient[m.ingredient_id] || (sellersByIngredient[m.ingredient_id] = []);
        // 판매자 표시명은 공용 단일소스(utils/sellerNames)를 쓴다 — 브랜드 테이블의 name 만 직접 읽으면
        // 거래처가 회사명(GIT Consulting) 대신 브랜드명(with MIN)으로 떠서 헷갈린다(2026-08-28 Irene).
        let sellerName = 'Unknown';
        if (m.seller_type === 'supplier') sellerName = supplierMap[m.seller_entity_id] || 'Supplier';
        else if (m.seller_type === 'brand') sellerName = getSellerName(sellerResolvedShared, 'brand', m.seller_entity_id) || brandMap[m.seller_entity_id] || 'Brand';
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
          // Seller's own sale-product identity (P0-1 + brand extension): supplier or brand product name/SKU.
          seller_product_name: spInfo.name || null,
          seller_product_sku: spInfo.sku || null,
          // 규격·주문방식 — 구매 화면이 "5kg/포대" 표시와 kg 소수 입력을 결정하는 데 쓴다.
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
      if (hasSellersFilter) enriched = enriched.filter(ing => ing.sellers.length > 0);
      return res.json({ success: true, data: enriched });
    }

    res.json({ success: true, data: ingredients });
  } catch (error) {
    console.error('Get brand ingredients error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to load ingredients', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// POST /api/brands/:brandId/ingredients/from-catalog
// — Cart drawer "Supplier Catalog" 탭에서 supplier_product 클릭 시 호출 (BG 용).
//   ingredient(owner_type='brand') + IngredientSellerProduct 매핑 자동 생성. idempotent.
// ============================================
router.post('/brands/:brandId/ingredients/from-catalog', authenticateToken, isBrandManager, async (req, res) => {
  // ⛔ F5/F3 (2026-09-04, docs/INGREDIENT_UNIFICATION_DESIGN.md):
  //   브랜드 재료를 만드는 길은 Stock Items 하나뿐이다. 이 입구(공급업체 카탈로그 → 브랜드 재료 생성)가
  //   열려 있으면 **출처 없는 브랜드 행**이 또 생기고, 인스펙션 ING-UNI-002 가 배포를 막는다.
  //   브랜드 구매자는 `/api/product-ingredients/from-catalog` 로 간다(거기서 Stock Item 이 생기고
  //   공유를 켜면 거울이 생긴다). 매장·푸드코트 경로는 무접촉.
  if (!ALLOW_BRAND_INGREDIENT_WRITE) {
    return res.status(403).json({
      success: false,
      error: { code: 'USE_STOCK_ITEMS', message: 'Brand buyers add catalog items in Stock Items.' }
    });
  }
  const t = await Ingredient.sequelize.transaction();
  try {
    const bid = parseInt(req.params.brandId, 10);
    const body = req.body || {};
    const SupplierContract = require('../models/SupplierContract');
    const catalogLink = require('../utils/catalogLink');

    const seller = await catalogLink.resolveSellerProduct({
      body,
      transaction: t,
      supplierContract: (supplierCompanyId) => SupplierContract.findOne({
        where: { entity_type: 'brand', entity_id: bid, supplier_company_id: supplierCompanyId, status: 'active' },
        transaction: t
      }),
      // ⚠ 원래 코드는 `bp.owner_user_id ? bid : bid` 라는 죽은 삼항이었다(두 분기 동일).
      //    동작 등가라 단순화. 의미 = 구매자 자기 brand id. 패밀리별 차이는 utils/catalogLink.js 상단 참조.
      brandSellerEntityId: async () => bid
    });
    if (!seller.ok) { await t.rollback(); return res.status(seller.status).json(seller.body); }

    const unitConversion = catalogLink.resolveUnitConversion(body.unit_conversion);

    // Connect mode — 기존 ingredient 에 매핑만 추가
    const existingIngredientId = parseInt(body.existing_ingredient_id, 10);
    if (Number.isFinite(existingIngredientId)) {
      const targetIng = await Ingredient.findByPk(existingIngredientId, { transaction: t });
      if (!targetIng || targetIng.owner_type !== 'brand' || targetIng.brand_id !== bid) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target ingredient not found in this brand' });
      }
      const r = await catalogLink.connectExisting({
        target: targetIng, seller, unitConversion, targetKey: 'ingredient_id', transaction: t
      });
      await t.commit();
      return res.status(r.status).json(r.body);
    }

    // Idempotent — 이미 매핑된 ingredient 가 이 brand 의 것이면 그대로 반환
    const already = await catalogLink.findAlreadyLinked({
      seller, targetKey: 'ingredient_id',
      findTarget: (id) => Ingredient.findByPk(id, { transaction: t }),
      ownsTarget: (ing) => ing.owner_type === 'brand' && ing.brand_id === bid,
      transaction: t
    });
    if (already) { await t.commit(); return res.status(already.status).json(already.body); }

    // 코드 자동 부여 — 여기가 빈 코드의 출처였다(2026-09-06 Irene: "입력 안하면 자동으로 들어가").
    //   채번 단일 소스 = utils/codeGenerator.js 원자 카운터.
    const catalogCode = await generateIngredientCode(Ingredient, 'brand', bid);
    const ingredient = await Ingredient.create({
      owner_type: 'brand',
      brand_id: bid,
      restaurant_id: null,
      name: body.name || seller.productName,
      unit: catalogLink.resolveUnit(body.unit, seller.productUnit),
      base_quantity: 1,
      unit_cost: parseFloat(seller.productPrice) || 0,
      supplier_name: null,
      supplier_id: null,
      min_stock: 0,
      current_stock: 0,
      is_active: true,
      code: catalogCode
    }, { transaction: t });

    const mapping = await catalogLink.createMappingFor({
      target: ingredient, seller, unitConversion, targetKey: 'ingredient_id', transaction: t
    });

    await t.commit();
    res.status(201).json({ success: true, data: { ingredient, mapping, created: true } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /brands/:brandId/ingredients/from-catalog error:', err);
    res.status(500).json({ success: false, message: 'Failed to create ingredient from catalog' });
  }
});

/**
 * POST /api/brands/:brandId/ingredients
 * 브랜드 재료 생성
 */
router.post('/brands/:brandId/ingredients', authenticateToken, isBrandManager, async (req, res) => {
  // ⛔ F3 (2026-09-04, docs/INGREDIENT_UNIFICATION_DESIGN.md):
  //   재료를 만드는 길은 Stock Items 하나뿐이다. 브랜드 재료 행은 그 **거울**이고 사람이 만들지 않는다.
  //   이 입구가 열려 있으면 같은 물건이 또 두 줄이 된다(2026-06/07 분열의 재발 경로).
  if (!ALLOW_BRAND_INGREDIENT_WRITE) {
    return res.status(403).json({
      success: false,
      error: { code: 'USE_STOCK_ITEMS', message: 'Ingredients are created in Stock Items. Turn on brand sharing there.' }
    });
  }
  try {
    const { brandId } = req.params;
    const brand_id = brandId;
    const { code, name, image_url, category, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock } = req.body;

    // Auto-generate code if not provided
    const { codeTakenResponse } = require('../utils/codeGenerator');
    const takenBI = await codeTakenResponse(Ingredient, code, { brand_id: brandId, owner_type: 'brand' });
    if (takenBI) return res.status(takenBI.status).json(takenBI.body);
    const finalCode = code || await generateIngredientCode(Ingredient, 'brand', brandId);

    const normalizedImage = await normalizeIngredientImage(image_url, brandId);
    const ingredient = await Ingredient.create({
      owner_type: 'brand',
      brand_id,
      restaurant_id: null,
      ingredient_category_id: ingredient_category_id || null,
      code: finalCode,
      name,
      image_url: normalizedImage,
      category: 'other', // Use default - category is managed via ingredient_category_id
      unit,
      base_quantity: base_quantity || 1,
      unit_cost,
      // 레거시 단일공급 컬럼 쓰기 중단 (2026-07-04). 공급처=seller-source 매핑(ingredient_seller_products).
      supplier_name: null,
      supplier_id: null,
      min_stock: min_stock || 0,
      current_stock: 0
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create brand ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create ingredient', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/brands/:brandId/ingredients/:ingredientId
 * 브랜드 재료 수정
 */
router.put('/brands/:brandId/ingredients/:ingredientId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient_id = ingredientId;
    const { code, name, image_url, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, is_active } = req.body;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ success: false, error: { message: 'Ingredient not found', code: 'NOT_FOUND' } });
    }

    // ⛔ F3 (2026-09-04): 이 행이 Stock Item 의 거울이면 **정체성 필드는 여기서 못 고친다.**
    //   Stock Items 에서 고치면 동기화(F2)가 따라온다. 방향은 Stock Item → 거울 한 방향뿐.
    //   ⚠ 막는 것은 거울 행 **자체**의 이름·단위·카테고리·코드뿐이다 —
    //     매장 재고·최소치 입력 경로는 그대로 열려 있어야 한다(min_stock·is_active 는 통과).
    if (ingredient.source_product_ingredient_id) {
      // `is_active` 도 잠근다 — 거울을 켜고 끄는 길은 공유/해제(F1) 하나뿐이다.
      // 여기서 열어두면 사람이 끈 거울을 F2 동기화가 되살려 서로 다투는 행이 생긴다.
      // `min_stock` 만 통과 — 매장 재고·최소치 경로는 열려 있어야 한다.
      // 다섯 칸은 전부 아이템이 주인이다 — 거울에서 고치면 동기화가 되돌린다(F2). 여기서 막는다.
      // `unit_cost` (2026-09-05): 원가도 원본이 주인이다 — 여기서 고치면 다음 동기화가 되돌린다.
      //   매장별 조정은 `restaurant_ingredient_costs` (레시피 원가 오버라이드) 가 맡는다.
      const locked = ['code', 'name', 'unit', 'base_quantity', 'package_unit', 'package_quantity',
        'ingredient_category_id', 'is_active', 'unit_cost'].filter((f) => req.body[f] !== undefined);
      if (locked.length) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'MIRROR_READONLY',
            message: `Edit these in Stock Items: ${locked.join(', ')}`,
            fields: locked
          }
        });
      }
    }

    // ⛔ 취급단위 잠금 (2026-09-05 · docs/TRADE_STRUCTURE.md §2-2) — 재고아이템 쪽과 같은 규칙.
    //   판매 차감(`inventoryDeductionService.js`)은 레시피 줄 수량을 **환산 없이** 뺀다.
    //   그래서 취급단위를 바꾸면 붙어 있는 줄의 뜻이 말없이 바뀐다(`20 g` → `20 pack`).
    //   ⚠ 매장 재료에는 이 잠금이 **없었다** — 재고아이템에만 있었다(2026-09-05 실측).
    if (unit !== undefined && String(unit) !== String(ingredient.unit)) {
      const [{ n: recipeLines }] = await Ingredient.sequelize.query(
        `SELECT COUNT(*) n FROM recipe_ingredients WHERE ingredient_id = :id`,
        { replacements: { id: ingredient.id }, type: Ingredient.sequelize.QueryTypes.SELECT }
      );
      if (Number(recipeLines) > 0) {
        return res.status(409).json({
          success: false,
          error: {
            code: 'UNIT_LOCKED_BY_RECIPES',
            message: `Unit is used by ${recipeLines} recipe line(s). Change the recipes first.`,
            recipe_lines: Number(recipeLines)
          }
        });
      }
    }

    // Build update object with only provided fields
    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (image_url !== undefined) {
      const normalized = await normalizeIngredientImage(image_url, ingredient.brand_id || ingredient.restaurant_id);
      if (normalized && ingredient.image_url && normalized !== ingredient.image_url) {
        await deleteOldImages(ingredient.image_url);
      }
      updateData.image_url = normalized;
    }
    if (ingredient_category_id !== undefined) updateData.ingredient_category_id = ingredient_category_id;
    if (unit !== undefined) updateData.unit = unit;
    if (base_quantity !== undefined) updateData.base_quantity = base_quantity;
    // 단위 다섯 칸 — 기준단위(포장)·기준양 (§2-2)
    if (req.body.package_unit !== undefined) updateData.package_unit = req.body.package_unit;
    if (req.body.package_quantity !== undefined) updateData.package_quantity = req.body.package_quantity;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    // 레거시 supplier_name/supplier_id 쓰기 중단 (2026-07-04) — 기존 값 보존, API 로 수정 안 함. 공급처=seller-source 매핑.
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    // 2026-09-02: 켜고 끄기. 그전에는 이 필드가 없어 **BG 가 자기 브랜드 재료를 끌 방법이 아예 없었다**
    //   (운영에서 꺼져 있던 63건은 API 밖에서 꺼진 것이다). 동기화는 이제 이 값을 존중한다 —
    //   brand-products.js 의 syncProductToIngredients 가 끄는 방향만 따라가고 재활성은 안 따라간다.
    if (is_active !== undefined) updateData.is_active = !!is_active;

    await ingredient.update(updateData);

    // Reload with associations for frontend display
    const updatedIngredient = await Ingredient.findByPk(ingredient_id, {
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
    });

    res.json({ success: true, data: updatedIngredient });
  } catch (error) {
    console.error('Update brand ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update ingredient', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/brands/:brandId/ingredients/:ingredientId
 * 브랜드 재료 삭제
 */
router.delete('/brands/:brandId/ingredients/:ingredientId', authenticateToken, isBrandManager, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient_id = ingredientId; // DB 쿼리용

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ success: false, error: { message: 'Ingredient not found', code: 'NOT_FOUND' } });
    }

    await ingredient.destroy();

    res.json({ success: true, message: 'Ingredient deleted' });
  } catch (error) {
    console.error('Delete brand ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete ingredient', code: 'INTERNAL_ERROR' } });
  }
});

// ⛔ 2026-09-06 삭제 — 여기 있던 매장 재료 CRUD 4개(`GET/POST/PUT/DELETE
//   /restaurants/:restaurantId/ingredients`)는 **그림자**였다. 같은 주소를
//   `routes/restaurants-ingredients.js`(:54 :246 :646 :713)가 먼저 잡아서
//   이 코드는 한 줄도 실행되지 않았다(라우트 스캔 실측).
//   ⚠ 위험은 "지금 안 돌아서"가 아니라 **앞 라우트가 옮겨지거나 지워지는 순간 조용히
//   되살아난다**는 것이다 — 실제로 증명했다: 승자 GET 을 잠깐 비활성화하니
//   이 그림자가 200 으로 응답했다. 그래서 지운다.
//   매장 재료 CRUD 의 단일 소스 = `routes/restaurants-ingredients.js`.
//
//   ⚠ 2026-09-06 복구: 처음 지울 때 이 블록 안에 있던 `GET /restaurants/:id/brand-ingredients`
//   (매장이 브랜드 재료를 **읽기 전용**으로 보는 유일한 경로)까지 같이 지웠다. 그림자가 아니라
//   살아 있는 라우트였고, health-check 계약 "매장은 브랜드 재료를 읽기전용으로 본다"가 잡았다.
//   경계를 줄 번호로 자른 것이 원인 — 지울 때는 **라우트를 하나씩** 확인해야 한다.

/**
 * GET /api/restaurants/:restaurantId/brand-ingredients
 * 레스토랑이 속한 브랜드의 재료 조회 (읽기 전용)
 */
router.get('/restaurants/:restaurantId/brand-ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ success: false, error: { message: 'Restaurant not found', code: 'NOT_FOUND' } });
    }

    // 브랜드에 속하지 않은 레스토랑
    if (!restaurant.brand_id) {
      return res.json({ success: true, data: [] });
    }

    // 레스토랑은 자기가 속한 브랜드(restaurant.brand_id) 재료만 본다. (Irene 2026-07-05)
    // 이전엔 오너가 소유한 '모든' 형제 브랜드 재료를 통합해 내려줘서, 카테고리를 자기 브랜드로
    // 좁힌 뒤에도 형제 브랜드 재료가 '탭에 없는 카테고리'를 달고 남는 불일치가 생겼다.
    // (재료 카테고리 브랜드 한정과 같은 절단면 — ingredient-categories.js 참고.)
    // is_active:true — BG가 비활성화한 브랜드 재료는 레스토랑에서 흐리게가 아니라 아예 숨김
    // (카테고리와 동일 원칙, Irene 2026-07-05). 레스토랑 자체 재료의 비활성 흐림은 별개(관리용).
    const brandIngredients = await Ingredient.findAll({
      where: {
        brand_id: restaurant.brand_id,
        owner_type: 'brand',
        is_active: true
      },
      order: [['name', 'ASC']],
      include: [
        {
          model: IngredientCategory,
          as: 'ingredientCategory',
          attributes: ['id', 'name', 'emoji']
        },
        {
          model: Supplier,
          as: 'supplier',
          attributes: ['id', 'name', 'owner_type']
        }
      ]
    });

    // 레스토랑 코스트 오버라이드 조회
    const restaurantCosts = await RestaurantIngredientCost.findAll({
      where: { restaurant_id: restaurantId }
    });
    const costMap = {};
    restaurantCosts.forEach(rc => {
      costMap[rc.ingredient_id] = {
        unit_cost: parseFloat(rc.unit_cost),
        notes: rc.notes
      };
    });

    // 매장별 실재고(브랜드 공유 행이 아니라 오버레이가 단일 소스) — docs/BRAND_STOCK_SHARING_DESIGN.md
    const brandIds = brandIngredients.map(i => i.id);
    const stockMap = await stockMapFor(restaurantId, brandIds);

    // 공급처(seller-sources) 첨부 — ?include=sellers. 브랜드가 붙여둔 공급처를 매장이 그대로
    // 보고 발주한다(연결·해제는 브랜드 전용 = 읽기전용). 무옵션 호출의 응답은 불변(하위호환).
    const wantSellers = String(req.query.include || '').split(',').includes('sellers');
    let sellerMap = {};
    if (wantSellers && brandIds.length) {
      const rows = await IngredientSellerProduct.findAll({
        where: { ingredient_id: brandIds, is_active: true },
        order: [['is_preferred', 'DESC'], ['unit_price', 'ASC']]
      });
      const spIds = [...new Set(rows.filter(r => r.seller_type === 'supplier' && r.seller_product_id).map(r => r.seller_product_id))];
      const spMap = spIds.length
        ? Object.fromEntries((await SupplierProduct.findAll({ where: { id: spIds }, attributes: ['id', 'name', 'sku', 'unit', 'base_quantity', 'order_mode'], paranoid: false })).map(sp => [sp.id, sp]))
        : {};
      // 판매자 표시 이름 — 발주와 같은 단일 해석기(utils/sellerNames)를 쓴다. 각자 조회를 짜면
      // 목록만 brand/foodcourt 를 빠뜨려 이름이 비어 보이던 사고가 재발한다(2026-07-12).
      const sellerMapResolved = await resolveSellers(
        rows.map(r => ({ seller_type: r.seller_type, seller_entity_id: r.seller_entity_id }))
      );
      // 브랜드가 파는 상품은 BrandProduct 가 이름/코드를 갖는다(공급업체 상품과 동일 취급)
      const BrandProduct = require('../models/BrandProduct');
      const bpIds = [...new Set(rows.filter(r => r.seller_type === 'brand' && r.seller_product_id).map(r => r.seller_product_id))];
      const bpMap = bpIds.length
        ? Object.fromEntries((await BrandProduct.findAll({ where: { id: bpIds }, attributes: ['id', 'name', 'sku', 'unit', 'base_quantity', 'order_mode'], paranoid: false })).map(b => [b.id, b]))
        : {};
      rows.forEach(r => {
        const prod = r.seller_type === 'supplier' ? spMap[r.seller_product_id]
                   : r.seller_type === 'brand' ? bpMap[r.seller_product_id]
                   : null;
        (sellerMap[r.ingredient_id] = sellerMap[r.ingredient_id] || []).push({
          ...r.toJSON(),
          seller_name: getSellerName(sellerMapResolved, r.seller_type, r.seller_entity_id),
          seller_product_name: prod?.name || null,
          seller_product_sku: prod?.sku || null,
          // 규격·주문방식 — 매장이 이 목록에서 바로 발주하므로 여기에도 실어야
          // "3 × 5kg" 표시와 kg 소수 입력이 동작한다(공급업체·브랜드 공통).
          seller_unit: prod?.unit ?? null,
          base_quantity: prod?.base_quantity != null ? parseFloat(prod.base_quantity) : 1,
          order_mode: prod?.order_mode || 'pack'
        });
      });
    }

    // 각 재료에 restaurant_cost, effective_cost 추가
    const enrichedIngredients = brandIngredients.map(ing => {
      const plain = ing.toJSON();
      const override = costMap[plain.id];
      const brandCost = parseFloat(plain.unit_cost);
      plain.restaurant_cost = override ? override.unit_cost : null;
      plain.cost_notes = override ? override.notes : null;
      plain.effective_cost = override ? override.unit_cost : brandCost;
      plain.current_stock = stockMap[plain.id] || 0;   // 이 매장의 실재고
      plain.is_brand_shared = true;                     // 프론트: Brand 배지 + 편집 차단
      plain.read_only = true;
      if (wantSellers) plain.sellerSources = sellerMap[plain.id] || [];
      return plain;
    });

    res.json({ success: true, data: enrichedIngredients });
  } catch (error) {
    console.error('Get brand ingredients for restaurant error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch brand ingredients', code: 'INTERNAL_ERROR' } });
  }
});


// ============================================
// Restaurant Ingredient Cost Override
// ============================================

/**
 * GET /api/restaurants/:restaurantId/ingredient-costs
 * 레스토랑 코스트 오버라이드 전체 목록
 */
router.get('/restaurants/:restaurantId/ingredient-costs', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const costs = await RestaurantIngredientCost.findAll({
      where: { restaurant_id: restaurantId },
      include: [{
        model: Ingredient,
        as: 'ingredient',
        attributes: ['id', 'name', 'unit', 'base_quantity', 'unit_cost']
      }]
    });

    res.json({ success: true, data: costs });
  } catch (error) {
    console.error('Get restaurant ingredient costs error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ingredient costs' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/ingredient-costs/bulk
 * 레스토랑 코스트 일괄 설정
 * NOTE: /bulk must come BEFORE /:ingredientId to avoid route conflict
 */
router.put('/restaurants/:restaurantId/ingredient-costs/bulk', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { costs } = req.body; // [{ ingredient_id, unit_cost, notes }]

    if (!Array.isArray(costs) || costs.length === 0) {
      return res.status(400).json({ success: false, message: 'costs array is required' });
    }

    const results = [];
    for (const item of costs) {
      const [cost] = await RestaurantIngredientCost.upsert({
        restaurant_id: restaurantId,
        ingredient_id: item.ingredient_id,
        unit_cost: parseFloat(item.unit_cost),
        notes: item.notes || null,
        updated_by: req.user.id
      });
      results.push(cost);
    }

    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Bulk set restaurant ingredient costs error:', error);
    res.status(500).json({ success: false, message: 'Failed to bulk set ingredient costs' });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/ingredient-costs/:ingredientId
 * 레스토랑 코스트 설정/수정 (upsert)
 */
router.put('/restaurants/:restaurantId/ingredient-costs/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;
    const { unit_cost, notes } = req.body;

    if (unit_cost === undefined || unit_cost === null) {
      return res.status(400).json({ success: false, message: 'unit_cost is required' });
    }

    // 해당 재료가 브랜드 재료인지 확인
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient || ingredient.owner_type !== 'brand') {
      return res.status(400).json({ success: false, message: 'Can only set cost override for brand ingredients' });
    }

    const [cost, created] = await RestaurantIngredientCost.upsert({
      restaurant_id: restaurantId,
      ingredient_id: ingredientId,
      unit_cost: parseFloat(unit_cost),
      notes: notes || null,
      updated_by: req.user.id
    }, {
      returning: true
    });

    res.json({
      success: true,
      data: cost,
      created
    });
  } catch (error) {
    console.error('Set restaurant ingredient cost error:', error);
    res.status(500).json({ success: false, message: 'Failed to set ingredient cost' });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/ingredient-costs/:ingredientId
 * 레스토랑 코스트 삭제 (브랜드 코스트로 복귀)
 */
router.delete('/restaurants/:restaurantId/ingredient-costs/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId, ingredientId } = req.params;

    const deleted = await RestaurantIngredientCost.destroy({
      where: {
        restaurant_id: restaurantId,
        ingredient_id: ingredientId
      }
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Cost override not found' });
    }

    res.json({ success: true, message: 'Cost override removed, reverted to brand cost' });
  } catch (error) {
    console.error('Delete restaurant ingredient cost error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete ingredient cost' });
  }
});

// ============================================
// FOODCOURT — Phase 2: 공급업체 발주 (Restaurant/Brand 와 동일 패턴)
// ============================================

// Inline middleware — Foodcourt scope check
async function isFoodcourtScope(req, res, next) {
  const role = req.user?.role;
  if (role === 'System Admin') return next();
  if (role !== 'Foodcourt General' && role !== 'Foodcourt Manager') {
    return res.status(403).json({ success: false, message: 'Foodcourt role required' });
  }
  const fcId = parseInt(req.params.foodcourtId, 10);
  // user.foodcourt_id 확인 (FG 의 default), 또는 Foodcourt.owner_id 검증
  if (req.user.foodcourt_id === fcId) return next();
  const Foodcourt = require('../models/Foodcourt');
  const fc = await Foodcourt.findByPk(fcId, { attributes: ['id', 'owner_id'] });
  if (fc && fc.owner_id === req.user.id) return next();
  return res.status(403).json({ success: false, message: 'Not your foodcourt' });
}

// GET /api/foodcourts/:foodcourtId/ingredients ?include=sellers
router.get('/foodcourts/:foodcourtId/ingredients', authenticateToken, isFoodcourtScope, async (req, res) => {
  try {
    const { foodcourtId } = req.params;
    const includeSellers = req.query.include === 'sellers';
    const hasSellersFilter = req.query.has_sellers === '1' || req.query.has_sellers === 'true';

    const ingredients = await Ingredient.findAll({
      where: { foodcourt_id: foodcourtId, owner_type: 'foodcourt' },
      order: [['name', 'ASC']],
      include: [{ model: IngredientCategory, as: 'ingredientCategory', attributes: ['id', 'name', 'emoji'] }]
    });

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

      const supplierIds = [...new Set(mappings.filter(m => m.seller_type === 'supplier').map(m => m.seller_entity_id).filter(Boolean))];
      const suppliers = supplierIds.length ? await SupplierCompany.findAll({ where: { id: { [Op.in]: supplierIds } }, attributes: ['id', 'name'] }) : [];
      const supplierMap = Object.fromEntries(suppliers.map(s => [s.id, s.name]));

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

      const sellersByIng = {};
      for (const m of mappings) {
        const arr = sellersByIng[m.ingredient_id] || (sellersByIng[m.ingredient_id] = []);
        let sellerName = m.seller_type === 'supplier' ? (supplierMap[m.seller_entity_id] || 'Supplier')
          : m.seller_type === 'system_admin' ? 'PurpleHere' : 'Unknown';
        const groups = m.seller_type === 'supplier' ? (optsBySpId[m.seller_product_id] || []) : [];
        arr.push({
          id: m.id, seller_product_id: m.seller_product_id,
          seller_type: m.seller_type, seller_entity_id: m.seller_entity_id, seller_name: sellerName,
          unit_price: parseFloat(m.unit_price), unit_conversion: parseFloat(m.unit_conversion),
          min_order_quantity: m.min_order_quantity, lead_time_days: m.lead_time_days,
          is_preferred: m.is_preferred, option_groups: groups, has_options: groups.length > 0
        });
      }
      let enriched = ingredients.map(ing => {
        const plain = ing.toJSON();
        plain.sellers = sellersByIng[plain.id] || [];
        return plain;
      });
      if (hasSellersFilter) enriched = enriched.filter(ing => ing.sellers.length > 0);
      return res.json({ success: true, data: enriched });
    }

    res.json({ success: true, data: ingredients });
  } catch (err) {
    console.error('GET /foodcourts/:id/ingredients error:', err);
    res.status(500).json({ success: false, message: 'Failed to load ingredients' });
  }
});

// POST /api/foodcourts/:foodcourtId/ingredients/from-catalog
router.post('/foodcourts/:foodcourtId/ingredients/from-catalog', authenticateToken, isFoodcourtScope, async (req, res) => {
  const t = await Ingredient.sequelize.transaction();
  try {
    const fcid = parseInt(req.params.foodcourtId, 10);
    const body = req.body || {};
    const SupplierContract = require('../models/SupplierContract');
    const catalogLink = require('../utils/catalogLink');

    const seller = await catalogLink.resolveSellerProduct({
      body,
      transaction: t,
      supplierContract: (supplierCompanyId) => SupplierContract.findOne({
        where: { entity_type: 'foodcourt', entity_id: fcid, supplier_company_id: supplierCompanyId, status: 'active' },
        transaction: t
      }),
      // ⚠ 이 패밀리는 **user id** 를 넣는다(brand id 아님) — 잠복 결함이지만 동작 보존 대상.
      //    이렇게 만들어진 행은 verifySellerRelation 과 어긋나 발주 불가. 설계문서 §7 별건.
      brandSellerEntityId: async (bp) => bp.owner_user_id || 0
    });
    if (!seller.ok) { await t.rollback(); return res.status(seller.status).json(seller.body); }

    const unitConversion = catalogLink.resolveUnitConversion(body.unit_conversion);

    const existingIngredientId = parseInt(body.existing_ingredient_id, 10);
    if (Number.isFinite(existingIngredientId)) {
      const targetIng = await Ingredient.findByPk(existingIngredientId, { transaction: t });
      if (!targetIng || targetIng.owner_type !== 'foodcourt' || targetIng.foodcourt_id !== fcid) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target ingredient not found in this foodcourt' });
      }
      const r = await catalogLink.connectExisting({
        target: targetIng, seller, unitConversion, targetKey: 'ingredient_id', transaction: t
      });
      await t.commit();
      return res.status(r.status).json(r.body);
    }

    const already = await catalogLink.findAlreadyLinked({
      seller, targetKey: 'ingredient_id',
      findTarget: (id) => Ingredient.findByPk(id, { transaction: t }),
      ownsTarget: (ing) => ing.owner_type === 'foodcourt' && ing.foodcourt_id === fcid,
      transaction: t
    });
    if (already) { await t.commit(); return res.status(already.status).json(already.body); }

    // 코드 자동 부여 — 위와 같은 이유. 푸드코트는 owner 범위가 foodcourt_id 다.
    const { generateCode } = require('../utils/codeGenerator');
    const fcCode = await generateCode(Ingredient, 'ING', { whereClause: { foodcourt_id: fcid }, transaction: t });
    const ingredient = await Ingredient.create({
      owner_type: 'foodcourt', foodcourt_id: fcid, brand_id: null, restaurant_id: null,
      name: body.name || seller.productName,
      unit: catalogLink.resolveUnit(body.unit, seller.productUnit),
      base_quantity: 1, unit_cost: parseFloat(seller.productPrice) || 0,
      min_stock: 0, current_stock: 0, is_active: true, code: fcCode
    }, { transaction: t });

    const mapping = await catalogLink.createMappingFor({
      target: ingredient, seller, unitConversion, targetKey: 'ingredient_id', transaction: t
    });

    await t.commit();
    res.status(201).json({ success: true, data: { ingredient, mapping, created: true } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /foodcourts/:id/ingredients/from-catalog error:', err);
    res.status(500).json({ success: false, message: 'Failed to create ingredient from catalog' });
  }
});

module.exports = router;
