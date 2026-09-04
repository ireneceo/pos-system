const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Restaurant = require('../models/Restaurant');
const Category = require('../models/Category');
const { Recipe, RecipeIngredient, Ingredient } = require('../models');
const { authenticateToken, checkRestaurantAccess } = require('../middleware/auth');
const { validateSetGroups, resolveSetGroups, computeSetAvailability } = require('../utils/setMenu');
const { OptionGroup, Option } = require('../models');
const { Op } = require('sequelize');

// products.category 는 categories.name 을 FK 로 참조한다. 그런데 프론트 드롭다운은 category **id**
// 를 보낸다(읽기 API 는 name→categoryId 변환, 쓰기는 변환 없었음 → FK 깨짐). 여기서 양쪽 입력
// (name 또는 id)을 받아 항상 categories.name 으로 정규화한다. 이름이 숫자("33")인 경우를 위해
// 이름 일치를 먼저 본다. 2026-06-05.
async function normalizeCategoryToName(body, restaurantId) {
  if (body.category == null || body.category === '') return;
  const raw = String(body.category).trim();
  const byName = await Category.findOne({ where: { name: raw, restaurant_id: restaurantId }, attributes: ['name'] });
  if (byName) { body.category = byName.name; return; }
  if (/^\d+$/.test(raw)) {
    const byId = await Category.findOne({ where: { id: Number(raw), restaurant_id: restaurantId }, attributes: ['name'] });
    if (byId) body.category = byId.name;
  }
}

// Sequelize/DB 에러를 사용자에게 그대로 노출하지 않는다(날 SQL/FK 문구 금지). 친절한 문구로 치환.
function cleanDbError(error) {
  const name = error && error.name;
  if (name === 'SequelizeForeignKeyConstraintError') {
    if (String(error.message || '').includes('category')) {
      return 'The selected category is no longer available. Please pick a category again.';
    }
    return 'A referenced item is no longer available. Please review your selection.';
  }
  if (name === 'SequelizeValidationError' || name === 'SequelizeUniqueConstraintError') {
    return (error.errors && error.errors[0] && error.errors[0].message) || 'Some fields are invalid. Please check and try again.';
  }
  // 알 수 없는 내부 오류는 일반 문구 (스택/SQL 숨김)
  return 'Could not save. Please try again.';
}

// 세트 set_groups 검증 공용 — is_set_menu 상품 저장 시 호출. set_groups 우선, 없으면 레거시 set_items.
// 반환 null=통과, 또는 에러 메시지 문자열.
async function validateSetPayload(body, restaurantId, existingProduct) {
  const sg = body.set_groups !== undefined ? body.set_groups
    : (existingProduct ? existingProduct.set_groups : undefined);
  if (Array.isArray(sg) && sg.length > 0) {
    const ids = [...new Set(sg.flatMap(g => (g.items || []).map(it => Number(it.product_id))).filter(Number.isInteger))];
    const refs = ids.length ? await Product.findAll({ where: { id: ids, restaurant_id: restaurantId } }) : [];
    const validIds = new Set(refs.filter(p => !p.is_set_menu).map(p => p.id));
    const { valid, errors } = validateSetGroups(sg, { validProductIds: validIds });
    if (!valid) return errors[0] || 'Invalid set configuration.';
    return null;
  }
  // 레거시 set_items 경로
  const si = body.set_items !== undefined ? body.set_items : (existingProduct ? existingProduct.set_items : undefined);
  if (!si || !Array.isArray(si) || si.length === 0) return 'Set menu must contain at least one item';
  for (const item of si) {
    if (!item.menuItemId || !item.name || !item.quantity || item.quantity < 1) return 'Each set item must have menuItemId, name, and quantity (minimum 1)';
  }
  const menuItemIds = si.map(item => item.menuItemId);
  const referencedProducts = await Product.findAll({ where: { id: menuItemIds, restaurant_id: restaurantId } });
  if (referencedProducts.some(prod => prod.is_set_menu === true)) return 'Set menu cannot contain other set menus';
  if (referencedProducts.length !== menuItemIds.length) return 'One or more referenced menu items do not exist';
  return null;
}

// Local guard: enforce tenant isolation for `/product/:id` routes where
// `:id` is the **product** id. `checkRestaurantAccess` falls back to
// `req.params.id` as a restaurantId source — that is correct for routes like
// `/restaurants/:id` but produces 403 false-positives here. This local guard
// resolves the target restaurantId from query/body/user only and rejects
// non-System-Admin overrides. Handler-level WHERE `{ id, restaurant_id }`
// then enforces row-level ownership.
function checkProductTenant(req, res, next) {
  if (!req.user) return res.status(401).json({ success: false, error: { message: 'Authentication required', code: 'UNAUTHORIZED' } });
  if (req.user.role === 'System Admin') return next();

  const requested =
    req.query?.restaurantId || req.query?.restaurant_id ||
    req.body?.restaurantId || req.body?.restaurant_id;

  if (requested && parseInt(requested) !== parseInt(req.user.restaurant_id)) {
    return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
  }
  return next();
}
/**
 * 메뉴의 "Ingredients (direct)" 로 걸 수 있는 재료인가 — 소유 범위 판정 단일 소스.
 *
 * 규칙 (Irene 2026-09-04): **메뉴 = 재고아이템 or 메뉴 = 레시피 = 재고아이템.**
 * 그 재고아이템은 두 곳에서 온다 —
 *   ① 이 매장이 직접 만든 재료(owner_type='restaurant', 그 매장 것)
 *   ② 이 매장이 속한 브랜드가 공유한 재료(owner_type='brand', restaurant.brand_id 의 것)
 * 이 둘 밖의 id 는 남의 것이다. `checkRestaurantAccess` 는 "이 매장에 들어올 수 있는가"만 보고
 * 본문에 실려 온 ingredient_id 의 주인은 보지 않으므로, 여기서 한 번 더 좁힌다.
 */
async function isIngredientInScope(ingredient, restaurantId, transaction) {
  if (!ingredient) return false;
  const rid = String(restaurantId);
  if (ingredient.owner_type === 'restaurant') {
    return String(ingredient.restaurant_id) === rid;
  }
  if (ingredient.owner_type === 'brand') {
    const restaurant = await Restaurant.findByPk(restaurantId, { transaction });
    return !!(restaurant && restaurant.brand_id && String(ingredient.brand_id) === String(restaurant.brand_id));
  }
  return false;
}

/**
 * 재고아이템 다이렉트 연결 검증 — 메뉴 = 재고아이템 (docs/TRADE_STRUCTURE.md §2-1).
 * 브랜드 프로덕트 쪽 `resolveDirectLink` 와 같은 규칙이다: 레시피 또는 재고아이템, 둘 중 하나만.
 */
async function resolveMenuDirectLink(body, current, restaurantId) {
  const hasDirect = Object.prototype.hasOwnProperty.call(body, 'ingredient_id');
  const hasRecipe = Object.prototype.hasOwnProperty.call(body, 'recipe_id');

  const bodyDirect = hasDirect ? (body.ingredient_id || null) : null;
  const bodyRecipe = hasRecipe ? (body.recipe_id || null) : null;

  // ⚠ 배타 판정은 **이번 요청에 둘 다 실렸을 때만** 한다.
  //   기존에 걸려 있던 값까지 세면, 레시피가 있던 것을 재고아이템으로 **바꾸는** 정상 동작이
  //   전부 400 이 된다(2026-09-04 실측: 기존 레시피 프로덕트에 다이렉트를 걸면 저장이 막혔다).
  //   한쪽을 세우면 다른 쪽은 비운다 — 그게 "둘 중 하나"를 지키는 방식이다.
  if (bodyDirect && bodyRecipe) {
    return { ok: false, status: 400, body: { success: false, code: 'LINK_EXCLUSIVE',
      message: 'A menu item links to a stock item OR a recipe — not both.' } };
  }

  const nextDirect = bodyDirect || (hasRecipe && bodyRecipe ? null : (hasDirect ? null : (current ? current.ingredient_id : null)));
  const nextRecipe = bodyRecipe || (hasDirect && bodyDirect ? null : (hasRecipe ? null : (current ? current.recipe_id : null)));

  const patch = {};
  if (hasDirect || hasRecipe) {
    // 한쪽을 세우면 다른 쪽은 비운다 — 남겨두면 "둘 다"가 다시 생긴다.
    patch.ingredient_id = nextDirect;
    patch.recipe_id = nextRecipe;
  }

  if (nextDirect) {
    const ing = await Ingredient.findByPk(nextDirect);
    if (!ing || !(await isIngredientInScope(ing, restaurantId))) {
      return { ok: false, status: 400, body: { success: false, code: 'STOCK_ITEM_NOT_FOUND',
        message: 'Stock item not found, or it belongs to another store.' } };
    }
  }
  return { ok: true, patch };
}

const { processImage, deleteOldImages } = require('../utils/imageProcessor');
const { logActivity } = require('../utils/activityLogger');

// Apply authentication to all routes
router.use(authenticateToken);

// Per-route tenant isolation: every endpoint that takes a restaurantId — whether
// from params, query, or body — must run through checkRestaurantAccess. The
// middleware was extended (middleware/auth.js) to resolve the target id from
// all three sources, closing the IDOR where an authenticated user could
// previously pass `restaurantId` in body/query to act on someone else's menu.

// Get all menu items
router.get('/', checkRestaurantAccess, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    // or from authenticated user (for restaurant users)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;
    const { page = 1, limit = 0, categoryId, excludeImage } = req.query; // limit 0 = all items (backward compatible)
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (!restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    // Get categories from categories table
    // 관리 페이지에서는 모든 카테고리 표시 (비활성화된 것도 포함)
    const dbCategories = await Category.findAll({
      where: {
        restaurant_id: restaurantId
      },
      order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    // Build product query
    // brand_scope_active: BG가 적용범위에서 뺀 상품(retracted)은 숨김 — POS/관리 목록에서 제외.
    // 보존(soft)이므로 DB엔 남아있고 재추가 시 복원. 일반 단품/독립상품은 기본값 true 라 영향 없음. §14
    const productWhere = { restaurant_id: restaurantId, brand_scope_active: true };
    if (categoryId) {
      productWhere.category = categoryId;
    }

    // Get total count for pagination
    const totalCount = await Product.count({ where: productWhere });

    // Get products (with pagination if limit > 0)
    // Sort: admin display_order first (0 = unset), then newest-added.
    const queryOptions = {
      where: productWhere,
      order: [['display_order', 'ASC'], ['createdAt', 'DESC'], ['id', 'DESC']]
    };

    if (limitNum > 0) {
      queryOptions.limit = limitNum;
      queryOptions.offset = (pageNum - 1) * limitNum;
    }

    const products = await Product.findAll(queryOptions);

    // Transform categories with emoji, id, displayOrder, and isActive
    const categories = dbCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.emoji || '🍽️',
      displayOrder: cat.displayOrder,
      isActive: cat.isActive,
      kitchen_station_id: cat.kitchen_station_id || null,
      // #11c 크로스셀 — 카테고리 추천소스 플래그(true=강제포함 / false=강제제외 / null=이름 자동감지)
      is_recommendation_source: cat.is_recommendation_source ?? null
    }));

    // Transform products to ensure emoji and optionGroups are included
    const items = products.map(prod => {
      // Find matching category by ID or name
      let categoryId = null;

      // Try to match by ID first (if category is a number)
      const categoryById = dbCategories.find(cat => cat.id.toString() === prod.category);
      if (categoryById) {
        categoryId = categoryById.id.toString();
      } else {
        // Try to match by name (if category is a string)
        const categoryByName = dbCategories.find(cat =>
          cat.name.toLowerCase().replace(/\s+/g, '_') === prod.category ||
          cat.name === prod.category
        );
        if (categoryByName) {
          categoryId = categoryByName.id.toString();
        } else {
          // Fallback: use the category value as-is
          categoryId = prod.category;
        }
      }

      // Parse image data - support URL format, old JSON format, and legacy base64
      let imageUrl = null;
      let thumbnailUrl = null;

      if (excludeImage === 'true') {
        // Skip image parsing entirely (for Reports etc. that only need names/categories)
        imageUrl = null;
        thumbnailUrl = null;
      } else if (prod.image) {
        // New URL format (starts with /uploads/)
        if (prod.image.startsWith('/uploads/')) {
          imageUrl = prod.image;
          thumbnailUrl = prod.image_thumbnail || prod.image.replace('/products/', '/products/thumbnails/');
        }
        // Old JSON format with multiple sizes
        else if (prod.image.startsWith('{')) {
          try {
            const parsed = JSON.parse(prod.image);
            imageUrl = parsed.medium || parsed.original || null;
            thumbnailUrl = parsed.thumbnail || imageUrl;
          } catch {
            imageUrl = prod.image;
            thumbnailUrl = prod.image;
          }
        }
        // Legacy base64 format
        else {
          imageUrl = prod.image;
          thumbnailUrl = prod.image_thumbnail || prod.image;
        }
      }

      return {
        id: prod.id,
        code: prod.code || null,
        name: prod.name,
        description: prod.description,
        price: prod.price,
        categoryId: categoryId,  // Use matched category ID
        emoji: prod.emoji || '🍽️',
        image: imageUrl,
        imageThumbnail: thumbnailUrl,
        restaurant_id: prod.restaurant_id,
        soldOut: prod.soldOut || false,
        optionGroups: (() => {
          // Handle double-encoded JSON strings
          if (!prod.optionGroups) return [];
          try {
            let parsed = typeof prod.optionGroups === 'string'
              ? JSON.parse(prod.optionGroups)
              : prod.optionGroups;
            if (typeof parsed === 'string') {
              parsed = JSON.parse(parsed);
            }
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })(),  // Include optionGroups data
        // 세트 메뉴 관련 필드
        is_set_menu: prod.is_set_menu || false,
        set_items: prod.set_items || null,
        set_groups: prod.set_groups || null,  // 세트 v2 (구성품/상속옵션 resolve 는 프론트 utils/setMenu)
        set_display_order: prod.set_display_order || 0,
        // 레시피 연결
        recipe_id: prod.recipe_id || null,
        // 활성화 상태
        is_active: prod.is_active !== false,  // 기본값 true
        // 식후 제공(디저트 등) 등록 플래그
        after_meal: prod.after_meal || false,
        // 세트 구성 전용 단품 — 단품 판매 안 함 (POS/모바일 주문 화면 숨김, 2026-06-12)
        set_only: prod.set_only === true,
        // 관리자 지정 상품 순서(카테고리 내). 0 = 미설정
        display_order: prod.display_order || 0,
        // Kitchen Station 배정
        kitchen_station_id: prod.kitchen_station_id || null,
        // Brand Menu linkage (v3.32+)
        brand_menu_id: prod.brand_menu_id || null,
        brand_menu_locks_snapshot: prod.brand_menu_locks_snapshot || null,
        brand_menu_synced_version: prod.brand_menu_synced_version || null,
        brand_menu_status: prod.brand_menu_link_status || null,
        // Per-item packaging fee override (when takeawayPricing.pricingType=per-item-individual)
        // null = no override (use defaultPerItemCharge from operation_settings)
        // number (incl. 0) = explicit per-item override
        takeaway_charge: prod.takeaway_charge != null ? Number(prod.takeaway_charge) : null,
        // Per-item mobile availability schedule (events). null = always available.
        availability: prod.availability || null,
        // POS Terminal sort 기준 (Newest)
        createdAt: prod.createdAt || null
      };
    });

    // 정렬: 같은 카테고리 내
    items.sort((a, b) => {
      // 카테고리가 다르면 카테고리 순서대로
      if (a.categoryId !== b.categoryId) {
        return 0;
      }

      // 1순위: 관리자 지정 순서 display_order (0 = 미설정 → 뒤로)
      const ao = a.display_order || 0, bo = b.display_order || 0;
      if (ao !== bo) {
        if (ao === 0) return 1;
        if (bo === 0) return -1;
        return ao - bo;
      }

      // 미설정(둘 다 0)일 때 기존 규칙 유지:
      // 2순위: 세트 메뉴 우선
      if (a.is_set_menu && !b.is_set_menu) return -1;
      if (!a.is_set_menu && b.is_set_menu) return 1;
      // 3순위: 세트끼리는 set_display_order
      if (a.is_set_menu && b.is_set_menu) {
        return a.set_display_order - b.set_display_order;
      }
      // 4순위: 일반 메뉴끼리는 최근 추가가 위로 (newest first)
      return b.id - a.id;
    });

    // Build response with pagination info if limit was specified
    const response = {
      success: true,
      data: {
        categories,
        items
      }
    };

    if (limitNum > 0) {
      const totalPages = Math.ceil(totalCount / limitNum);
      response.pagination = {
        page: pageNum,
        limit: limitNum,
        totalItems: totalCount,
        totalPages,
        hasMore: pageNum < totalPages
      };
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get categories only (lightweight endpoint for fast initial load)
router.get('/categories', checkRestaurantAccess, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    // Get categories from categories table
    const dbCategories = await Category.findAll({
      where: {
        restaurant_id: restaurantId,
        isActive: true
      },
      order: [['displayOrder', 'ASC'], ['createdAt', 'DESC']]
    });

    const categories = dbCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      emoji: cat.emoji || '🍽️',
      displayOrder: cat.displayOrder
    }));

    res.json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single product
router.get('/product/:id', checkProductTenant, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }
    // 세트면 구성품(name/price/soldOut/상속옵션) + 품절계산 resolve 첨부 (POS 주문 UI 용)
    let data = product.toJSON();
    if (product.is_set_menu) {
      try {
        const { buildSetResolved } = require('../utils/setMenu');
        const resolved = await buildSetResolved(product, product.restaurant_id);
        if (resolved) data = { ...data, ...resolved };
      } catch (e) { console.error('set resolve(POS) 실패:', e.message); }
    }
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create product
router.post('/product', checkRestaurantAccess, async (req, res) => {
  try {
    // Allow restaurantId from body or authenticated user (support both camelCase and snake_case)
    const restaurantId = req.body.restaurantId || req.body.restaurant_id || req.user.restaurant_id;

    if (!restaurantId) {
      return res.status(400).json({ success: false, error: { message: 'Restaurant ID is required', code: 'VALIDATION_ERROR' } });
    }

    if (!req.body.name || !req.body.category) {
      return res.status(400).json({ success: false, error: { message: 'Name and category are required', code: 'VALIDATION_ERROR' } });
    }

    // category(id 또는 name) → categories.name 으로 정규화 (FK 충족)
    await normalizeCategoryToName(req.body, restaurantId);

    // Check menu item limit
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (restaurant && restaurant.menu_item_limit && restaurant.menu_item_limit > 0) {
      // 2026-06-17 franchise fix: brand-pushed menus (brand_menu_id != null) are the BRAND's content,
      // not items the restaurant added — they must NOT count against the restaurant's plan limit.
      // Otherwise a brand that pushes more items than the plan allows (e.g. 126 brand menus on a
      // 100-item plan) blocks the restaurant from adding even its first own item. The limit now
      // governs only the restaurant's OWN products.
      const currentItemCount = await Product.count({
        where: { restaurant_id: restaurantId, brand_menu_id: null }
      });

      if (currentItemCount >= restaurant.menu_item_limit) {
        return res.status(403).json({
          success: false,
          error: `Menu item limit reached. Your plan allows up to ${restaurant.menu_item_limit} menu items.`,
          limit: restaurant.menu_item_limit,
          current: currentItemCount
        });
      }
    }

    // Set menu validation (set_groups v2 우선, 레거시 set_items 폴백)
    if (req.body.is_set_menu) {
      const setErr = await validateSetPayload(req.body, restaurantId, null);
      if (setErr) return res.status(400).json({ success: false, message: setErr, error: { message: setErr, code: 'VALIDATION_ERROR' } });
    }

    // Automatically set restaurant_id from authenticated user
    const productData = {
      ...req.body,
      restaurant_id: restaurantId
    };

    // 이미지 처리: URL이면 그대로 저장, base64면 파일로 저장
    if (productData.image) {
      // 이미 URL 형식이면 그대로 사용
      if (productData.image.startsWith('/uploads/')) {
        // URL 형식 - 썸네일 URL도 설정
        if (!productData.image_thumbnail) {
          productData.image_thumbnail = productData.image.replace('/products/', '/products/thumbnails/');
        }
      }
      // base64 이미지면 파일로 저장
      else if (productData.image.startsWith('data:image/')) {
        try {
          const processedImages = await processImage(productData.image, productData.name);
          if (processedImages && processedImages.original) {
            productData.image = processedImages.original;
            productData.image_thumbnail = processedImages.thumbnail;
          } else {
            // 저장 실패 시 이미지 필드 제거하여 빈 값으로 저장
            delete productData.image;
            delete productData.image_thumbnail;
            console.warn('Image processing failed on create — image field cleared');
          }
        } catch (imgError) {
          console.error('Image processing error:', imgError);
          delete productData.image;
          delete productData.image_thumbnail;
        }
      }
    }

    // 옛 클라이언트가 아직 보낼 수 있으니 받되 **쓰지 않는다** — 컬럼이 아니라 저장에 섞이면 안 된다.
    delete productData.directIngredients;

    // 재고아이템 다이렉트 (docs/TRADE_STRUCTURE.md §2-1) — 자동 레시피를 만들지 않는다.
    // 예전엔 `directIngredients` 배열을 받아 `"<이름> (auto)"` 레시피를 몰래 만들어 붙였다.
    // 그게 "둘 중 하나"에 없는 세 번째 길이었다(2026-09-04 Irene·Fable 판정). 이제 FK 하나만 받는다.
    //
    // ⚠ 검증은 **반드시 생성 앞**에서 한다. `ingredient_id` 가 진짜 컬럼이라
    //   `Product.create(productData)` 가 본문 값을 그대로 써버리고, 그 뒤에 400 을 내도
    //   **남의 매장 재료가 붙은 행이 이미 만들어진다**(2026-09-04 health-check 가 실측으로 잡음).
    const link = await resolveMenuDirectLink(req.body, null, restaurantId);
    if (!link.ok) return res.status(link.status).json(link.body);
    delete productData.ingredient_id;
    delete productData.recipe_id;
    Object.assign(productData, link.patch);

    const product = await Product.create(productData);

    logActivity(req, {
      action_type: 'create',
      entity_type: 'menu_item',
      entity_id: product.id,
      entity_name: product.name,
      description: `Created menu item "${product.name}" in category "${product.category}"`,
      restaurant_id: restaurantId
    });

    // Reload to include recipe_id
    await product.reload();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('[menu POST /product] error:', error.message);
    res.status(400).json({ success: false, message: cleanDbError(error), error: cleanDbError(error) });
  }
});

// Update product
router.put('/product/:id', checkProductTenant, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }

    // category(id 또는 name) → categories.name 으로 정규화 (FK 충족). category 가 올 때만.
    if (req.body.category !== undefined) {
      await normalizeCategoryToName(req.body, product.restaurant_id || restaurantId);
    }

    // Brand Menu Lock guard — block edits to fields locked by the linked BrandMenu.
    // soldOut / is_active / stock / is_featured / kitchen_station_id / image_thumbnail
    // are always RA-owned even when linked (品절 등 운영 자율).
    if (product.brand_menu_id && product.brand_menu_locks_snapshot) {
      const locks = typeof product.brand_menu_locks_snapshot === 'string'
        ? JSON.parse(product.brand_menu_locks_snapshot) : product.brand_menu_locks_snapshot;
      // 스칼라 잠금 필드 — 값이 바뀌면 차단(완전 보존).
      const scalarFieldToLockKey = {
        name: 'name', price: 'price', category: 'category', image: 'image'
      };
      const locked = [];
      for (const [field, lockKey] of Object.entries(scalarFieldToLockKey)) {
        if (req.body[field] !== undefined && locks[lockKey] === true) {
          const changed = JSON.stringify(product[field] ?? null) !== JSON.stringify(req.body[field] ?? null);
          if (changed) locked.push(field);
        }
      }
      // 옵션 잠금(2026-06-28, 1-3 Irene 결정 = superset): 잠겨 있어도 매장이 자기 옵션그룹 '추가'는
      // 허용한다. 단 브랜드 미러 옵션그룹(OptionGroup.brand_menu_option_group_id != null)은 모두
      // 유지해야 한다(하나라도 빠지면=브랜드 옵션 제거 → 차단). 매장 자체 옵션 추가/삭제는 자유.
      if (req.body.optionGroups !== undefined && locks.options === true) {
        const curIds = Array.isArray(product.optionGroups) ? product.optionGroups : [];
        const nextSet = new Set((Array.isArray(req.body.optionGroups) ? req.body.optionGroups : []).map(String));
        const brandRows = curIds.length ? await OptionGroup.findAll({
          where: {
            restaurant_id: product.restaurant_id || restaurantId,
            id: { [Op.in]: curIds },
            brand_menu_option_group_id: { [Op.ne]: null }
          },
          attributes: ['id']
        }) : [];
        const removedBrand = brandRows.map(r => r.id).filter(id => !nextSet.has(String(id)));
        if (removedBrand.length > 0) locked.push('optionGroups');
      }
      if (locked.length > 0) {
        return res.status(400).json({
          success: false,
          error: {
            message: `These fields are locked by the linked Brand Menu and cannot be changed: ${locked.join(', ')}`,
            code: 'PRODUCT_FIELD_LOCKED_BY_BRAND',
            locked_fields: locked
          }
        });
      }
    }

    // Set menu validation (if updating to set menu or already is set menu)
    const willBeSetMenu = req.body.is_set_menu !== undefined ? req.body.is_set_menu : product.is_set_menu;

    if (willBeSetMenu) {
      const setErr = await validateSetPayload(req.body, restaurantId, product);
      if (setErr) return res.status(400).json({ success: false, message: setErr, error: { message: setErr, code: 'VALIDATION_ERROR' } });
    }

    // Prevent changing restaurant_id
    const updateData = { ...req.body };
    delete updateData.restaurant_id;

    // 이미지가 undefined이거나 빈 값이면 기존 값 유지 (덮어쓰기 방지)
    if (updateData.image === undefined || updateData.image === '' || updateData.image === null) {
      delete updateData.image;
    }
    if (updateData.image_thumbnail === undefined || updateData.image_thumbnail === '' || updateData.image_thumbnail === null) {
      delete updateData.image_thumbnail;
    }

    // 이전 이미지 파일 삭제 (새 이미지로 교체 시)
    if (updateData.image && product.image) {
      try {
        const oldImage = product.image;
        // JSON 형식이면 파싱하여 URL 추출
        if (oldImage.startsWith('{') || oldImage.startsWith('[')) {
          const parsed = JSON.parse(oldImage);
          const urls = typeof parsed === 'object' ? Object.values(parsed) : [parsed];
          await deleteOldImages(urls.filter(u => typeof u === 'string' && u.startsWith('/uploads/')));
        } else if (oldImage.startsWith('/uploads/')) {
          await deleteOldImages(oldImage);
        }
      } catch (e) { /* ignore parse errors */ }
    }

    // 이미지 처리: URL이면 그대로 저장, base64면 파일로 저장
    if (updateData.image) {
      // 이미 URL 형식이면 그대로 사용
      if (updateData.image.startsWith('/uploads/')) {
        // URL 형식 - 썸네일 URL도 설정
        if (!updateData.image_thumbnail) {
          updateData.image_thumbnail = updateData.image.replace('/products/', '/products/thumbnails/');
        }
      }
      // base64 이미지면 파일로 저장
      else if (updateData.image.startsWith('data:image/')) {
        try {
          const processedImages = await processImage(updateData.image, updateData.name || product.name);
          if (processedImages && processedImages.original) {
            updateData.image = processedImages.original;
            updateData.image_thumbnail = processedImages.thumbnail;
          } else {
            // 저장 실패 시 이미지 필드 제거하여 기존값 유지
            delete updateData.image;
            delete updateData.image_thumbnail;
            console.warn('Image processing failed on update — keeping existing image:', req.params.id);
          }
        } catch (imgError) {
          console.error('Image processing error:', imgError);
          delete updateData.image;
          delete updateData.image_thumbnail;
        }
      }
      // JSON 형식(이전 데이터)이면 그대로 유지 — 마이그레이션 스크립트가 처리
    }

    // 옛 클라이언트 호환 — 배열이 와도 무시한다(컬럼이 아니라 저장에 섞이면 안 된다).
    delete updateData.directIngredients;

    // 재고아이템 다이렉트 (docs/TRADE_STRUCTURE.md §2-1) — 자동 레시피 갱신 경로를 없앴다.
    // 예전엔 재료 배열을 받아 기존 재료를 **지우고 다시 넣으며** `(auto)` 레시피를 유지했다.
    // 이제 FK 하나만 받고, 레시피와 재고아이템은 상호 배타다(둘 다 오면 400 LINK_EXCLUSIVE).
    //
    // ⚠ 검증은 **반드시 쓰기 앞**에서 한다. `updateData = {...req.body}` 라
    //   `product.update(updateData)` 가 두 컬럼을 먼저 써버리고, 그 뒤에 400 을 내도
    //   **남의 매장 재료가 붙은 채로 행이 남는다**(2026-09-04 Fable 실측: 400 인데 ingredient_id 오염).
    //   POST 와 같은 순서로 맞춘다 — 검증 → 본문에서 링크 컬럼 제거 → patch 합쳐 **한 번만** 쓴다.
    const link = await resolveMenuDirectLink(req.body, product, product.restaurant_id);
    if (!link.ok) return res.status(link.status).json(link.body);
    delete updateData.ingredient_id;
    delete updateData.recipe_id;
    Object.assign(updateData, link.patch);

    await product.update(updateData);

    logActivity(req, {
      action_type: 'update',
      entity_type: 'menu_item',
      entity_id: product.id,
      entity_name: product.name,
      description: `Updated menu item "${product.name}"`,
      restaurant_id: product.restaurant_id
    });

    res.json({ success: true, data: product });
  } catch (error) {
    console.error('[menu PUT /product] error:', error.message);
    res.status(400).json({ success: false, message: cleanDbError(error), error: cleanDbError(error) });
  }
});

// Copy/Duplicate product
router.post('/product/:id/copy', checkProductTenant, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const sourceProduct = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!sourceProduct) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }

    // Check menu item limit
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (restaurant && restaurant.menu_item_limit && restaurant.menu_item_limit > 0) {
      // 2026-06-17 franchise fix: brand-pushed menus (brand_menu_id != null) are the BRAND's content,
      // not items the restaurant added — they must NOT count against the restaurant's plan limit.
      // Otherwise a brand that pushes more items than the plan allows (e.g. 126 brand menus on a
      // 100-item plan) blocks the restaurant from adding even its first own item. The limit now
      // governs only the restaurant's OWN products.
      const currentItemCount = await Product.count({
        where: { restaurant_id: restaurantId, brand_menu_id: null }
      });

      if (currentItemCount >= restaurant.menu_item_limit) {
        return res.status(403).json({
          success: false,
          error: `Menu item limit reached. Your plan allows up to ${restaurant.menu_item_limit} menu items.`,
          limit: restaurant.menu_item_limit,
          current: currentItemCount
        });
      }
    }

    // Create copy with modified name
    const copyData = {
      restaurant_id: sourceProduct.restaurant_id,
      code: sourceProduct.code ? `${sourceProduct.code}-COPY` : null,
      name: `${sourceProduct.name} (Copy)`,
      price: sourceProduct.price,
      category: sourceProduct.category,
      description: sourceProduct.description,
      optionGroups: sourceProduct.optionGroups,
      image: sourceProduct.image,
      image_thumbnail: sourceProduct.image_thumbnail,
      emoji: sourceProduct.emoji,
      soldOut: false,
      is_active: true,
      current_stock: 0,  // Reset stock for copy
      min_stock: sourceProduct.min_stock,
      stock_unit: sourceProduct.stock_unit,
      supplier_id: sourceProduct.supplier_id,
      unit_cost: sourceProduct.unit_cost,
      is_set_menu: sourceProduct.is_set_menu,
      set_items: sourceProduct.set_items,
      set_display_order: sourceProduct.set_display_order,
      after_meal: sourceProduct.after_meal,
      recipe_id: sourceProduct.recipe_id
    };

    const newProduct = await Product.create(copyData);

    logActivity(req, {
      action_type: 'create',
      entity_type: 'menu_item',
      entity_id: newProduct.id,
      entity_name: newProduct.name,
      description: `Duplicated menu item "${sourceProduct.name}" as "${newProduct.name}"`,
      restaurant_id: sourceProduct.restaurant_id
    });

    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Menu item copied successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Toggle product active status
router.put('/product/:id/toggle-active', checkProductTenant, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }

    const newActiveState = !product.is_active;
    await product.update({ is_active: newActiveState });

    res.json({
      success: true,
      data: {
        id: product.id,
        is_active: newActiveState
      },
      message: newActiveState ? 'Menu item activated' : 'Menu item deactivated'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 품절(sold-out) 토글 (#4) — toggle-active 미러. Staff 허용(checkProductTenant). is_active 와 별개.
// 즉시 회색+SOLD OUT + 전 POS/모바일 반영(소켓 브로드캐스트).
router.put('/product/:id/toggle-soldout', checkProductTenant, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;
    const product = await Product.findOne({
      where: { id: req.params.id, ...(restaurantId && { restaurant_id: restaurantId }) }
    });
    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }
    // body 로 명시 가능, 없으면 토글
    const newSoldOut = typeof req.body?.soldOut === 'boolean' ? req.body.soldOut : !product.soldOut;
    await product.update({ soldOut: newSoldOut });

    // 소켓 브로드캐스트 — POS/모바일 메뉴가 실시간 회색 처리
    try {
      const io = req.app.get('io');
      if (io) {
        io.of('/orders').to(`restaurant_${product.restaurant_id}`)
          .emit('product-soldout', { id: product.id, soldOut: newSoldOut });
      }
    } catch (e) { /* non-fatal */ }

    res.json({
      success: true,
      data: { id: product.id, soldOut: newSoldOut },
      message: newSoldOut ? 'Marked sold out' : 'Back in stock'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2026-06-28 (2-1): 옵션 품절(sold-out) 토글 — 상품 toggle-soldout 미러. Staff 허용(checkProductTenant).
// is_active(메뉴 노출)와 별개로 운영 자율. 품절 옵션은 주문화면(POS/모바일)에서 선택 불가.
// 소유권은 옵션의 OptionGroup.restaurant_id 로 확인(IDOR 방지). 소켓 option-soldout 로 실시간 반영.
router.put('/option/:id/toggle-soldout', checkProductTenant, async (req, res) => {
  try {
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;
    const option = await Option.findByPk(req.params.id);
    if (!option) {
      return res.status(404).json({ success: false, error: { message: 'Option not found', code: 'NOT_FOUND' } });
    }
    const og = await OptionGroup.findByPk(option.option_group_id, { attributes: ['id', 'restaurant_id'] });
    const ogRid = og && og.restaurant_id;
    if (req.user.role !== 'System Admin' && restaurantId && ogRid && parseInt(ogRid) !== parseInt(restaurantId)) {
      return res.status(403).json({ success: false, error: { message: 'Access denied to this restaurant', code: 'FORBIDDEN' } });
    }
    const newSoldOut = typeof req.body?.soldOut === 'boolean' ? req.body.soldOut : !option.sold_out;
    await option.update({ sold_out: newSoldOut });

    try {
      const io = req.app.get('io');
      if (io && ogRid) {
        io.of('/orders').to(`restaurant_${ogRid}`).emit('option-soldout', { id: option.id, soldOut: newSoldOut });
      }
    } catch (e) { /* non-fatal */ }

    res.json({
      success: true,
      data: { id: option.id, soldOut: newSoldOut },
      message: newSoldOut ? 'Marked sold out' : 'Back in stock'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 상품 표시 순서 재정렬 (관리자) — 카테고리 내 보이는 순서를 display_order 1..N 으로 저장.
// body: { restaurant_id?, order: [productId, ...] } (위→아래 순서). 모바일/POS 메뉴에 즉시 반영.
router.put('/products/reorder', async (req, res) => {
  try {
    const restaurantId = req.body.restaurant_id || req.body.restaurantId || req.user.restaurant_id;
    if (!restaurantId) {
      return res.status(400).json({ success: false, message: 'restaurant_id required' });
    }
    // 본인 매장만 (System Admin 예외)
    if (req.user.role !== 'System Admin' && parseInt(req.user.restaurant_id) !== parseInt(restaurantId)) {
      return res.status(403).json({ success: false, message: 'Access denied to this restaurant' });
    }
    const order = Array.isArray(req.body.order) ? req.body.order : [];
    if (order.length === 0) {
      return res.status(400).json({ success: false, message: 'order array required' });
    }
    let i = 1;
    for (const pid of order) {
      await Product.update({ display_order: i++ }, { where: { id: pid, restaurant_id: restaurantId } });
    }
    // 소켓 브로드캐스트 — 다른 단말 메뉴 순서 즉시 갱신
    try {
      const io = req.app.get('io');
      if (io) io.of('/orders').to(`restaurant_${restaurantId}`).emit('menu-reordered', { restaurant_id: Number(restaurantId) });
    } catch (e) { /* non-fatal */ }
    res.json({ success: true, data: { updated: order.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete product
router.delete('/product/:id', checkProductTenant, async (req, res) => {
  try {
    // Allow restaurantId from query parameter (for System Admin)
    const restaurantId = req.query.restaurantId || req.user.restaurant_id;

    const product = await Product.findOne({
      where: {
        id: req.params.id,
        ...(restaurantId && { restaurant_id: restaurantId })
      }
    });

    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }

    const productName = product.name;
    const productId = product.id;
    const productRestaurantId = product.restaurant_id;
    const deletedImage = product.image;
    await product.destroy();

    // 고아 이미지 정리: 삭제된 상품의 이미지 파일을 지운다. 단 다른 상품이 같은 파일을
    // 참조하면(공유 자산) 절대 지우지 않는다(2026-06-12 thefire 공유삭제 사고 방지).
    // deleteOldImages 는 /brand-menus/(BG 공유)도 자체 보호 + 썸네일까지 정리.
    if (deletedImage && typeof deletedImage === 'string' && deletedImage.startsWith('/uploads/')) {
      try {
        const stillUsed = await Product.count({ where: { image: deletedImage } });
        if (stillUsed === 0) {
          await deleteOldImages(deletedImage);
        }
      } catch (e) {
        console.error('Orphan image cleanup on delete failed:', e.message);
      }
    }

    logActivity(req, {
      action_type: 'delete',
      entity_type: 'menu_item',
      entity_id: productId,
      entity_name: productName,
      description: `Deleted menu item "${productName}"`,
      restaurant_id: productRestaurantId
    });

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;