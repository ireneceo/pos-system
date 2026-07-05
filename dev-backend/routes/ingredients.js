const express = require('express');
const router = express.Router();
const { Ingredient, IngredientCategory, Restaurant, Supplier, RestaurantIngredientCost } = require('../models');
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
        spInfoById[sp.id] = { name: sp.name || null, sku: sp.sku || null };
      }
      // Brand seller sources also carry the brand's own product name/SKU (different from our
      // internal name) — resolve them so brand-linked items show the brand product identity too.
      // (Irene 2026-07-05, ③ 브랜드 확장)
      const BrandProduct = require('../models/BrandProduct');
      const brandProductIds = [...new Set(mappings.filter(m => m.seller_type === 'brand').map(m => m.seller_product_id).filter(Boolean))];
      const bpInfoById = {};
      if (brandProductIds.length) {
        const bps = await BrandProduct.findAll({ where: { id: { [Op.in]: brandProductIds } }, attributes: ['id', 'name', 'sku'], paranoid: false });
        for (const bp of bps) bpInfoById[bp.id] = { name: bp.name || null, sku: bp.sku || null };
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
          // Seller's own sale-product identity (P0-1 + brand extension): supplier or brand product name/SKU.
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
  const t = await Ingredient.sequelize.transaction();
  try {
    const { brandId } = req.params;
    const bid = parseInt(brandId, 10);
    const body = req.body || {};
    const supplierProductId = parseInt(body.supplier_product_id, 10);
    const brandProductId = parseInt(body.brand_product_id, 10);
    const foodcourtProductId = parseInt(body.foodcourt_product_id, 10);
    const SupplierProduct = require('../models/SupplierProduct');
    const SupplierContract = require('../models/SupplierContract');
    const IngredientSellerProduct = require('../models/IngredientSellerProduct');
    const BrandProduct = require('../models/BrandProduct');
    const FoodcourtProduct = require('../models/FoodcourtProduct');

    let sellerType, sellerProductRow, sellerEntityId, productName, productUnit, productPrice, productMinQty;
    if (Number.isFinite(supplierProductId)) {
      const sp = await SupplierProduct.findByPk(supplierProductId, { transaction: t });
      if (!sp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Supplier product not found' }); }
      const contract = await SupplierContract.findOne({
        where: { entity_type: 'brand', entity_id: bid, supplier_company_id: sp.supplier_company_id, status: 'active' },
        transaction: t
      });
      if (!contract) { await t.rollback(); return res.status(403).json({ success: false, message: 'No active contract with this supplier' }); }
      sellerType = 'supplier'; sellerProductRow = sp; sellerEntityId = sp.supplier_company_id;
      productName = sp.name; productUnit = sp.unit; productPrice = sp.unit_price; productMinQty = sp.min_order_quantity;
    } else if (Number.isFinite(brandProductId)) {
      // BG → 다른 BG 의 product 매핑 (non-standard but supported for symmetry)
      const bp = await BrandProduct.findByPk(brandProductId, { transaction: t });
      if (!bp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Brand product not found' }); }
      sellerType = 'brand'; sellerProductRow = bp; sellerEntityId = bp.owner_user_id ? bid : bid;
      productName = bp.name; productUnit = bp.unit; productPrice = bp.unit_price; productMinQty = bp.min_order_quantity;
    } else if (Number.isFinite(foodcourtProductId)) {
      const fp = await FoodcourtProduct.findByPk(foodcourtProductId, { transaction: t });
      if (!fp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Foodcourt product not found' }); }
      sellerType = 'foodcourt'; sellerProductRow = fp; sellerEntityId = fp.foodcourt_id;
      productName = fp.name; productUnit = fp.unit; productPrice = fp.unit_price; productMinQty = fp.min_order_quantity;
    } else {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'supplier_product_id, brand_product_id, or foodcourt_product_id is required' });
    }

    // Connect mode — 기존 ingredient 에 매핑만 추가
    const existingIngredientId = parseInt(body.existing_ingredient_id, 10);
    const unitConversion = parseFloat(body.unit_conversion) > 0 ? parseFloat(body.unit_conversion) : 1;
    if (Number.isFinite(existingIngredientId)) {
      const targetIng = await Ingredient.findByPk(existingIngredientId, { transaction: t });
      if (!targetIng || targetIng.owner_type !== 'brand' || targetIng.brand_id !== bid) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target ingredient not found in this brand' });
      }
      const dup = await IngredientSellerProduct.findOne({
        where: {
          ingredient_id: targetIng.id, seller_type: sellerType,
          seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id
        },
        transaction: t
      });
      if (dup) {
        await t.commit();
        return res.json({ success: true, data: { ingredient: targetIng, mapping: dup, created: false, connected: true } });
      }
      const otherCount = await IngredientSellerProduct.count({
        where: { ingredient_id: targetIng.id, is_active: true }, transaction: t
      });
      const mapping = await IngredientSellerProduct.create({
        ingredient_id: targetIng.id,
        seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id,
        unit_price: parseFloat(productPrice) || 0,
        unit_conversion: unitConversion,
        min_order_quantity: parseInt(productMinQty, 10) || 1,
        lead_time_days: 0,
        is_preferred: otherCount === 0,
        is_active: true
      }, { transaction: t });
      await t.commit();
      return res.status(201).json({ success: true, data: { ingredient: targetIng, mapping, created: false, connected: true } });
    }

    // Idempotent — 이미 매핑된 ingredient 가 이 brand 의 것이면 그대로 반환
    const existing = await IngredientSellerProduct.findOne({
      where: { seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id },
      transaction: t
    });
    if (existing) {
      const ing = await Ingredient.findByPk(existing.ingredient_id, { transaction: t });
      if (ing && ing.owner_type === 'brand' && ing.brand_id === bid) {
        await t.commit();
        return res.json({ success: true, data: { ingredient: ing, mapping: existing, created: false } });
      }
    }

    const UNIT_ENUM = ['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'];
    const UNIT_MAP = {
      kg: 'kg', kgs: 'kg', kilogram: 'kg', kilograms: 'kg',
      g: 'g', gram: 'g', grams: 'g', gr: 'g',
      l: 'L', liter: 'L', liters: 'L', litre: 'L', litres: 'L',
      ml: 'ml',
      piece: 'piece', pcs: 'piece', pc: 'piece', ea: 'piece', each: 'piece', unit: 'piece',
      pack: 'pack', pkt: 'pack', packet: 'pack', bag: 'pack', sack: 'pack',
      box: 'pack', case: 'pack', carton: 'pack', ctn: 'pack',
      can: 'can', tin: 'can',
      bottle: 'bottle', btl: 'bottle'
    };
    const normalizeUnit = (u) => {
      if (!u) return 'piece';
      if (UNIT_ENUM.includes(u)) return u;
      const mapped = UNIT_MAP[String(u).toLowerCase().trim()];
      return mapped || 'piece';
    };
    const finalUnit = body.unit && UNIT_ENUM.includes(body.unit) ? body.unit : normalizeUnit(productUnit);

    const ingredient = await Ingredient.create({
      owner_type: 'brand',
      brand_id: bid,
      restaurant_id: null,
      name: body.name || productName,
      unit: finalUnit,
      base_quantity: 1,
      unit_cost: parseFloat(productPrice) || 0,
      supplier_name: null,
      supplier_id: null,
      min_stock: 0,
      current_stock: 0,
      track_stock: true,
      is_active: true,
      code: ''
    }, { transaction: t });

    const mapping = await IngredientSellerProduct.create({
      ingredient_id: ingredient.id,
      seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id,
      unit_price: parseFloat(productPrice) || 0,
      unit_conversion: unitConversion,
      min_order_quantity: parseInt(productMinQty, 10) || 1,
      lead_time_days: 0,
      is_preferred: true,
      is_active: true
    }, { transaction: t });

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
  try {
    const { brandId } = req.params;
    const brand_id = brandId;
    const { code, name, image_url, category, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    // Auto-generate code if not provided
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
      current_stock: 0,
      track_stock: track_stock || false
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
    const { code, name, image_url, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    const ingredient = await Ingredient.findByPk(ingredient_id);
    if (!ingredient) {
      return res.status(404).json({ success: false, error: { message: 'Ingredient not found', code: 'NOT_FOUND' } });
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
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    // 레거시 supplier_name/supplier_id 쓰기 중단 (2026-07-04) — 기존 값 보존, API 로 수정 안 함. 공급처=seller-source 매핑.
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

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

// ============================================
// Restaurant Ingredients
// ============================================

/**
 * GET /api/restaurants/:restaurantId/ingredients
 * 레스토랑 자체 재료 목록 조회 (owner_type = 'restaurant')
 */
router.get('/restaurants/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const includeSellers = req.query.include === 'sellers';
    const hasSellersFilter = req.query.has_sellers === '1' || req.query.has_sellers === 'true';

    const ingredients = await Ingredient.findAll({
      where: {
        restaurant_id: restaurantId,
        owner_type: 'restaurant'
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

    // ?include=sellers — cart-first PO UI 용. IngredientSellerProduct + seller 회사명 join.
    if (includeSellers) {
      const IngredientSellerProduct = require('../models/IngredientSellerProduct');
      const SupplierCompany = require('../models/SupplierCompany');
      const Brand = require('../models/Brand');
      const Foodcourt = require('../models/Foodcourt');

      const ingIds = ingredients.map(i => i.id);
      const mappings = ingIds.length === 0 ? [] : await IngredientSellerProduct.findAll({
        where: { ingredient_id: { [Op.in]: ingIds }, is_active: true },
        order: [['is_preferred', 'DESC'], ['unit_price', 'ASC']]
      });

      // Seller name 조회 (4종 entity 별 batch)
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

      // Supplier sale-product identity (name + SKU) for display alongside internal name/code (P0-1).
      const SupplierProduct = require('../models/SupplierProduct');
      const spIds = [...new Set(mappings.filter(m => m.seller_type === 'supplier' && m.seller_product_id).map(m => m.seller_product_id))];
      const spMap = spIds.length ? Object.fromEntries((await SupplierProduct.findAll({ where: { id: { [Op.in]: spIds } }, attributes: ['id', 'name', 'sku'], paranoid: false })).map(s => [s.id, s])) : {};

      const sellersByIngredient = {};
      for (const m of mappings) {
        const arr = sellersByIngredient[m.ingredient_id] || (sellersByIngredient[m.ingredient_id] = []);
        let sellerName = 'Unknown';
        if (m.seller_type === 'supplier') sellerName = supplierMap[m.seller_entity_id] || 'Supplier';
        else if (m.seller_type === 'brand') sellerName = brandMap[m.seller_entity_id] || 'Brand';
        else if (m.seller_type === 'foodcourt') sellerName = foodcourtMap[m.seller_entity_id] || 'Foodcourt';
        else if (m.seller_type === 'system_admin') sellerName = 'PurpleHere';
        const sp = m.seller_type === 'supplier' ? spMap[m.seller_product_id] : null;
        arr.push({
          id: m.id,
          seller_product_id: m.seller_product_id,
          seller_type: m.seller_type,
          seller_entity_id: m.seller_entity_id,
          seller_name: sellerName,
          seller_product_name: sp?.name || null,
          seller_product_sku: sp?.sku || null,
          unit_price: parseFloat(m.unit_price),
          unit_conversion: parseFloat(m.unit_conversion),
          min_order_quantity: m.min_order_quantity,
          lead_time_days: m.lead_time_days,
          is_preferred: m.is_preferred
        });
      }

      let enriched = ingredients.map(ing => {
        const plain = ing.toJSON();
        plain.sellers = sellersByIngredient[plain.id] || [];
        return plain;
      });

      // ?has_sellers=1 — 매핑된 재료만 (cart 검색용)
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

    // 각 재료에 restaurant_cost, effective_cost 추가
    const enrichedIngredients = brandIngredients.map(ing => {
      const plain = ing.toJSON();
      const override = costMap[plain.id];
      const brandCost = parseFloat(plain.unit_cost);
      plain.restaurant_cost = override ? override.unit_cost : null;
      plain.cost_notes = override ? override.notes : null;
      plain.effective_cost = override ? override.unit_cost : brandCost;
      return plain;
    });

    res.json({ success: true, data: enrichedIngredients });
  } catch (error) {
    console.error('Get brand ingredients for restaurant error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to fetch brand ingredients', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * POST /api/restaurants/:restaurantId/ingredients
 * 레스토랑 재료 생성
 */
router.post('/restaurants/:restaurantId/ingredients', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { code, name, image_url, category, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    // Auto-generate code if not provided
    const finalCode = code || await generateIngredientCode(Ingredient, 'restaurant', restaurantId);

    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      ingredient_category_id: ingredient_category_id || null,
      code: finalCode,
      name,
      image_url: image_url || null,
      category,
      unit,
      base_quantity: base_quantity || 1,
      unit_cost,
      // 레거시 단일공급 컬럼 쓰기 중단 (2026-07-04). 공급처=seller-source 매핑(ingredient_seller_products).
      supplier_name: null,
      supplier_id: null,
      min_stock: min_stock || 0,
      current_stock: 0,
      track_stock: track_stock || false
    });

    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to create ingredient', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * PUT /api/restaurants/:restaurantId/ingredients/:ingredientId
 * 레스토랑 재료 수정
 */
router.put('/restaurants/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const { code, name, image_url, ingredient_category_id, unit, base_quantity, unit_cost, supplier_name, supplier_id, min_stock, track_stock } = req.body;

    console.log('[DEBUG] PUT restaurant ingredient - ingredientId:', ingredientId, 'body:', req.body);

    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) {
      return res.status(404).json({ success: false, error: { message: 'Ingredient not found', code: 'NOT_FOUND' } });
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
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    // 레거시 supplier_name/supplier_id 쓰기 중단 (2026-07-04) — 기존 값 보존, API 로 수정 안 함. 공급처=seller-source 매핑.
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

    console.log('[DEBUG] updateData:', updateData);
    await ingredient.update(updateData);
    console.log('[DEBUG] After update - track_stock:', ingredient.track_stock);

    // Reload with associations for frontend display
    const updatedIngredient = await Ingredient.findByPk(ingredientId, {
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
    console.error('Update restaurant ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to update ingredient', code: 'INTERNAL_ERROR' } });
  }
});

/**
 * DELETE /api/restaurants/:restaurantId/ingredients/:ingredientId
 * 레스토랑 재료 삭제
 */
router.delete('/restaurants/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;

    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) {
      return res.status(404).json({ success: false, error: { message: 'Ingredient not found', code: 'NOT_FOUND' } });
    }

    await ingredient.destroy();

    res.json({ success: true, message: 'Ingredient deleted' });
  } catch (error) {
    console.error('Delete restaurant ingredient error:', error);
    res.status(500).json({ success: false, error: { message: 'Failed to delete ingredient', code: 'INTERNAL_ERROR' } });
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
    const { foodcourtId } = req.params;
    const fcid = parseInt(foodcourtId, 10);
    const body = req.body || {};
    const supplierProductId = parseInt(body.supplier_product_id, 10);
    const brandProductId = parseInt(body.brand_product_id, 10);
    const foodcourtProductId = parseInt(body.foodcourt_product_id, 10);
    const SupplierProduct = require('../models/SupplierProduct');
    const SupplierContract = require('../models/SupplierContract');
    const IngredientSellerProduct = require('../models/IngredientSellerProduct');
    const BrandProduct = require('../models/BrandProduct');
    const FoodcourtProduct = require('../models/FoodcourtProduct');

    let sellerType, sellerProductRow, sellerEntityId, productName, productUnit, productPrice, productMinQty;
    if (Number.isFinite(supplierProductId)) {
      const sp = await SupplierProduct.findByPk(supplierProductId, { transaction: t });
      if (!sp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Supplier product not found' }); }
      const contract = await SupplierContract.findOne({
        where: { entity_type: 'foodcourt', entity_id: fcid, supplier_company_id: sp.supplier_company_id, status: 'active' },
        transaction: t
      });
      if (!contract) { await t.rollback(); return res.status(403).json({ success: false, message: 'No active contract with this supplier' }); }
      sellerType = 'supplier'; sellerProductRow = sp; sellerEntityId = sp.supplier_company_id;
      productName = sp.name; productUnit = sp.unit; productPrice = sp.unit_price; productMinQty = sp.min_order_quantity;
    } else if (Number.isFinite(brandProductId)) {
      const bp = await BrandProduct.findByPk(brandProductId, { transaction: t });
      if (!bp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Brand product not found' }); }
      sellerType = 'brand'; sellerProductRow = bp; sellerEntityId = bp.owner_user_id || 0;
      productName = bp.name; productUnit = bp.unit; productPrice = bp.unit_price; productMinQty = bp.min_order_quantity;
    } else if (Number.isFinite(foodcourtProductId)) {
      const fp = await FoodcourtProduct.findByPk(foodcourtProductId, { transaction: t });
      if (!fp) { await t.rollback(); return res.status(404).json({ success: false, message: 'Foodcourt product not found' }); }
      sellerType = 'foodcourt'; sellerProductRow = fp; sellerEntityId = fp.foodcourt_id;
      productName = fp.name; productUnit = fp.unit; productPrice = fp.unit_price; productMinQty = fp.min_order_quantity;
    } else {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'supplier_product_id, brand_product_id, or foodcourt_product_id is required' });
    }

    const existingIngredientId = parseInt(body.existing_ingredient_id, 10);
    const unitConversion = parseFloat(body.unit_conversion) > 0 ? parseFloat(body.unit_conversion) : 1;
    if (Number.isFinite(existingIngredientId)) {
      const targetIng = await Ingredient.findByPk(existingIngredientId, { transaction: t });
      if (!targetIng || targetIng.owner_type !== 'foodcourt' || targetIng.foodcourt_id !== fcid) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'Target ingredient not found in this foodcourt' });
      }
      const dup = await IngredientSellerProduct.findOne({
        where: { ingredient_id: targetIng.id, seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id },
        transaction: t
      });
      if (dup) { await t.commit(); return res.json({ success: true, data: { ingredient: targetIng, mapping: dup, created: false, connected: true } }); }
      const otherCount = await IngredientSellerProduct.count({ where: { ingredient_id: targetIng.id, is_active: true }, transaction: t });
      const mapping = await IngredientSellerProduct.create({
        ingredient_id: targetIng.id, seller_type: sellerType, seller_entity_id: sellerEntityId,
        seller_product_id: sellerProductRow.id, unit_price: parseFloat(productPrice) || 0,
        unit_conversion: unitConversion, min_order_quantity: parseInt(productMinQty, 10) || 1,
        lead_time_days: 0, is_preferred: otherCount === 0, is_active: true
      }, { transaction: t });
      await t.commit();
      return res.status(201).json({ success: true, data: { ingredient: targetIng, mapping, created: false, connected: true } });
    }

    const existing = await IngredientSellerProduct.findOne({
      where: { seller_type: sellerType, seller_entity_id: sellerEntityId, seller_product_id: sellerProductRow.id },
      transaction: t
    });
    if (existing) {
      const ing = await Ingredient.findByPk(existing.ingredient_id, { transaction: t });
      if (ing && ing.owner_type === 'foodcourt' && ing.foodcourt_id === fcid) {
        await t.commit();
        return res.json({ success: true, data: { ingredient: ing, mapping: existing, created: false } });
      }
    }

    const UNIT_ENUM = ['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'];
    const UNIT_MAP = {
      kg: 'kg', kgs: 'kg', kilogram: 'kg', kilograms: 'kg',
      g: 'g', gram: 'g', grams: 'g', gr: 'g',
      l: 'L', liter: 'L', liters: 'L', litre: 'L', litres: 'L',
      ml: 'ml',
      piece: 'piece', pcs: 'piece', pc: 'piece', ea: 'piece', each: 'piece', unit: 'piece',
      pack: 'pack', pkt: 'pack', packet: 'pack', bag: 'pack', sack: 'pack',
      box: 'pack', case: 'pack', carton: 'pack', ctn: 'pack',
      can: 'can', tin: 'can', bottle: 'bottle', btl: 'bottle'
    };
    const normalizeUnit = (u) => {
      if (!u) return 'piece';
      if (UNIT_ENUM.includes(u)) return u;
      const mapped = UNIT_MAP[String(u).toLowerCase().trim()];
      return mapped || 'piece';
    };
    const finalUnit = body.unit && UNIT_ENUM.includes(body.unit) ? body.unit : normalizeUnit(productUnit);

    const ingredient = await Ingredient.create({
      owner_type: 'foodcourt', foodcourt_id: fcid, brand_id: null, restaurant_id: null,
      name: body.name || productName, unit: finalUnit,
      base_quantity: 1, unit_cost: parseFloat(productPrice) || 0,
      min_stock: 0, current_stock: 0, track_stock: true, is_active: true, code: ''
    }, { transaction: t });

    const mapping = await IngredientSellerProduct.create({
      ingredient_id: ingredient.id, seller_type: sellerType, seller_entity_id: sellerEntityId,
      seller_product_id: sellerProductRow.id, unit_price: parseFloat(productPrice) || 0,
      unit_conversion: unitConversion, min_order_quantity: parseInt(productMinQty, 10) || 1,
      lead_time_days: 0, is_preferred: true, is_active: true
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ success: true, data: { ingredient, mapping, created: true } });
  } catch (err) {
    if (!t.finished) await t.rollback();
    console.error('POST /foodcourts/:id/ingredients/from-catalog error:', err);
    res.status(500).json({ success: false, message: 'Failed to create ingredient from catalog' });
  }
});

module.exports = router;
