// 레스토랑 재료(ingredient) 라우트
// 마운트: /api/restaurants

const express = require('express');
const router = express.Router();
require('../models'); // Load associations
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
const { validateRestaurantCreation } = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const { getTodayBounds, getRestaurantTimezone } = require('../utils/dateTimeHelper');
const { deleteOldImages } = require('../utils/imageProcessor');

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

      const sellersByIngredient = {};
      for (const m of mappings) {
        const arr = sellersByIngredient[m.ingredient_id] || (sellersByIngredient[m.ingredient_id] = []);
        let sellerName = 'Unknown';
        if (m.seller_type === 'supplier') sellerName = supplierMap[m.seller_entity_id] || 'Supplier';
        else if (m.seller_type === 'brand') sellerName = brandMap[m.seller_entity_id] || 'Brand';
        else if (m.seller_type === 'foodcourt') sellerName = foodcourtMap[m.seller_entity_id] || 'Foodcourt';
        else if (m.seller_type === 'system_admin') sellerName = 'PurpleHere';
        const groups = (m.seller_type === 'supplier' ? (optsBySpId[m.seller_product_id] || []) : []);
        arr.push({
          id: m.id,
          seller_product_id: m.seller_product_id,
          seller_type: m.seller_type,
          seller_entity_id: m.seller_entity_id,
          seller_name: sellerName,
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
    res.status(500).json({ success: false, error: { message: '재료 목록 조회 실패', code: 'INTERNAL_ERROR' } });
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
    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      brand_id: null,
      restaurant_id: restaurantId,
      code: code || null,
      name,
      image_url: image_url || null,
      category,
      ingredient_category_id: ingredient_category_id || null,
      unit,
      base_quantity: base_quantity || 1,
      unit_cost,
      supplier_name,
      supplier_id: supplier_id || null,
      min_stock: min_stock || 0,
      current_stock: 0,
      track_stock: track_stock || false
    });
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Create restaurant ingredient error:', error);
    res.status(500).json({ error: error.message || '재료 생성 실패' });
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
    const { restaurantId } = req.params;
    const supplierProductId = parseInt(req.body?.supplier_product_id, 10);
    if (!Number.isFinite(supplierProductId)) {
      await t.rollback();
      return res.status(400).json({ success: false, message: 'supplier_product_id is required' });
    }

    const SupplierProduct = require('../models/SupplierProduct');
    const SupplierContract = require('../models/SupplierContract');
    const IngredientSellerProduct = require('../models/IngredientSellerProduct');

    const sp = await SupplierProduct.findByPk(supplierProductId, { transaction: t });
    if (!sp) {
      await t.rollback();
      return res.status(404).json({ success: false, message: 'Supplier product not found' });
    }

    // Active contract 검증 — 임의 supplier 의 상품 매핑 금지
    const contract = await SupplierContract.findOne({
      where: {
        entity_type: 'restaurant', entity_id: restaurantId,
        supplier_company_id: sp.supplier_company_id,
        status: 'active'
      },
      transaction: t
    });
    if (!contract) {
      await t.rollback();
      return res.status(403).json({ success: false, message: 'No active contract with this supplier' });
    }

    // 이미 매핑됐으면 idempotent
    const existing = await IngredientSellerProduct.findOne({
      where: { seller_type: 'supplier', seller_entity_id: sp.supplier_company_id, seller_product_id: sp.id },
      transaction: t
    });
    if (existing) {
      const ing = await Ingredient.findByPk(existing.ingredient_id, { transaction: t });
      if (ing && ing.restaurant_id === parseInt(restaurantId, 10)) {
        await t.commit();
        return res.json({ success: true, data: { ingredient: ing, mapping: existing, created: false } });
      }
    }

    // supplier_product.unit (free string) → Ingredient.unit (ENUM) 매핑
    // Ingredient.unit ENUM: kg / g / L / ml / piece / pack / can / bottle
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
      if (UNIT_ENUM.includes(u)) return u;            // 정확히 일치
      const mapped = UNIT_MAP[String(u).toLowerCase().trim()];
      return mapped || 'piece';
    };
    const finalUnit = req.body?.unit && UNIT_ENUM.includes(req.body.unit)
      ? req.body.unit
      : normalizeUnit(sp.unit);

    // ingredient 생성
    const ingredient = await Ingredient.create({
      owner_type: 'restaurant',
      restaurant_id: restaurantId,
      brand_id: null,
      name: req.body?.name || sp.name,
      unit: finalUnit,
      base_quantity: 1,
      unit_cost: parseFloat(sp.unit_price) || 0,
      supplier_name: null,
      supplier_id: null,
      min_stock: 0,
      current_stock: 0,
      track_stock: true,
      is_active: true,
      code: ''
    }, { transaction: t });

    // 매핑 생성
    const mapping = await IngredientSellerProduct.create({
      ingredient_id: ingredient.id,
      seller_type: 'supplier',
      seller_entity_id: sp.supplier_company_id,
      seller_product_id: sp.id,
      unit_price: parseFloat(sp.unit_price) || 0,
      unit_conversion: 1,
      min_order_quantity: parseInt(sp.min_order_quantity, 10) || 1,
      lead_time_days: 0,
      is_preferred: true,
      is_active: true
    }, { transaction: t });

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
    const { ingredientId } = req.params;
    const { code, name, category, unit, unit_cost, supplier_name, min_stock, image_url, ingredient_category_id, base_quantity, supplier_id, track_stock } = req.body;
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) return res.status(404).json({ success: false, error: { message: '재료를 찾을 수 없습니다', code: 'NOT_FOUND' } });

    // Build update object with only provided fields
    const updateData = {};
    if (code !== undefined) updateData.code = code;
    if (name !== undefined) updateData.name = name;
    if (category !== undefined) updateData.category = category;
    if (unit !== undefined) updateData.unit = unit;
    if (unit_cost !== undefined) updateData.unit_cost = unit_cost;
    if (supplier_name !== undefined) updateData.supplier_name = supplier_name;
    if (min_stock !== undefined) updateData.min_stock = min_stock;
    if (image_url !== undefined) {
      if (image_url && ingredient.image_url && image_url !== ingredient.image_url) {
        await deleteOldImages(ingredient.image_url);
      }
      updateData.image_url = image_url;
    }
    if (ingredient_category_id !== undefined) updateData.ingredient_category_id = ingredient_category_id;
    if (base_quantity !== undefined) updateData.base_quantity = base_quantity;
    if (supplier_id !== undefined) updateData.supplier_id = supplier_id;
    if (track_stock !== undefined) updateData.track_stock = track_stock;

    await ingredient.update(updateData);
    res.json({ success: true, data: ingredient });
  } catch (error) {
    console.error('Update restaurant ingredient error:', error);
    res.status(500).json({ success: false, error: { message: '재료 수정 실패', code: 'INTERNAL_ERROR' } });
  }
});

router.delete('/:restaurantId/ingredients/:ingredientId', authenticateToken, checkRestaurantAccess, async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findByPk(ingredientId);
    if (!ingredient) return res.status(404).json({ success: false, error: { message: '재료를 찾을 수 없습니다', code: 'NOT_FOUND' } });
    await ingredient.destroy();
    res.json({ success: true, message: '재료가 삭제되었습니다' });
  } catch (error) {
    console.error('Delete restaurant ingredient error:', error);
    res.status(500).json({ success: false, error: { message: '재료 삭제 실패', code: 'INTERNAL_ERROR' } });
  }
});

// ============================================
// Restaurant Recipes Routes - MOVED TO /routes/recipes.js
// ============================================

// ============================================
// Inventory Routes - Mount inventory router
// ============================================

module.exports = router;
