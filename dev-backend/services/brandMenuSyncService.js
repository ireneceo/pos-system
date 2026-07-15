/**
 * Brand Menu Sync Service
 *
 * Encapsulates the BG → Restaurant push and Restaurant pull flows so that
 * routes share a single transactional implementation. Idempotent.
 *
 * Lock rules:
 *   - Locked fields are forced to BG value (overwrites RA changes).
 *   - Non-locked fields are populated from BG on first sync, but RA can
 *     subsequently edit them without losing the link.
 *   - soldOut / is_active / stock are always RA-owned (not part of sync).
 *
 * Option groups:
 *   - Each BG option group mirrors into Restaurant.option_groups via
 *     option_groups.brand_menu_option_group_id.
 *   - Restaurant.Product.optionGroups (JSON id list) is rewritten with the
 *     mirror ids in BG-defined order when lock_options=true; merged when false.
 */
const { Op } = require('sequelize');
const {
  BrandMenu, BrandMenuCategory, BrandMenuOption, BrandMenuOptionGroup,
  BrandMenuOptionGroupLink, Restaurant, Product, OptionGroup, Option, Category,
  BrandMenuRecommendation, ProductRecommendation
} = require('../models');

const LOCK_FIELDS = ['name', 'price', 'category', 'image', 'options'];

function buildLocksSnapshot(brandMenu) {
  return {
    name:      !!brandMenu.lock_name,
    price:     !!brandMenu.lock_price,
    category:  !!brandMenu.lock_category,
    image:     !!brandMenu.lock_image,
    options:   !!brandMenu.lock_options,
    set_items: !!brandMenu.lock_set_items,
    sort_order: !!brandMenu.lock_sort_order
  };
}

/**
 * Find or create the Restaurant-side Category mirror for a given BrandMenuCategory.
 * Returns the local category name (Product.category is a string column).
 */
async function ensureLocalCategory(restaurantId, brandMenuCategoryId, transaction) {
  if (!brandMenuCategoryId) return null;
  const bmc = await BrandMenuCategory.findByPk(brandMenuCategoryId, { transaction });
  if (!bmc) return null;
  // Restaurant.Category is just a string column on Product. Ensure a Category row exists for filtering.
  const [cat] = await Category.findOrCreate({
    where: { restaurant_id: restaurantId, name: bmc.name },
    defaults: { restaurant_id: restaurantId, name: bmc.name, emoji: bmc.emoji, displayOrder: bmc.sort_order, isActive: true },
    transaction
  });
  return cat.name;
}

/**
 * Ensure the Restaurant.OptionGroup mirrors for each BrandMenuOptionGroup.
 * Returns an array of local OptionGroup ids in BG-defined order.
 */
async function ensureLocalOptionGroups(restaurantId, brandOptionGroups, transaction) {
  const localIds = [];
  for (const bog of brandOptionGroups) {
    // Restaurant.OptionGroup uses { required, multiple, isActive }, no min/max_select columns —
    // map: is_required → required, max_select > 1 → multiple. Restaurant.Option uses option_group_id + price + isActive.
    let local = await OptionGroup.findOne({
      where: { restaurant_id: restaurantId, brand_menu_option_group_id: bog.id },
      transaction
    });
    const mapped = {
      restaurant_id: restaurantId,
      name: bog.name,
      required: !!bog.is_required,
      multiple: (bog.max_select || 1) > 1,
      isActive: bog.is_active,
      brand_menu_option_group_id: bog.id,
      brand_menu_synced_version: bog.version
    };
    if (!local) {
      local = await OptionGroup.create(mapped, { transaction });
    } else if (local.brand_menu_synced_version !== bog.version) {
      await local.update(mapped, { transaction });
    }
    // Sync options — Restaurant.Option uses option_group_id (snake) + price + isActive + displayOrder
    const existingOpts = await Option.findAll({ where: { option_group_id: local.id }, transaction });
    const bgOpts = await BrandMenuOption.findAll({ where: { group_id: bog.id }, order: [['sort_order', 'ASC']], transaction });
    const bgNames = new Set(bgOpts.map(o => o.name));
    for (const eo of existingOpts) {
      if (!bgNames.has(eo.name)) await eo.destroy({ transaction });
    }
    for (const bo of bgOpts) {
      const existing = existingOpts.find(o => o.name === bo.name);
      const payload = { name: bo.name, price: bo.extra_price, displayOrder: bo.sort_order, isActive: bo.is_active };
      if (existing) {
        await existing.update(payload, { transaction });
      } else {
        await Option.create({ option_group_id: local.id, ...payload }, { transaction });
      }
    }
    localIds.push(local.id);
  }
  return localIds;
}

/**
 * Brand set_groups → Restaurant set_groups 변환.
 * 브랜드 set_groups 의 items[].product_id = 구성품 brand_menu_id. 매장 미러 상품 id 로 치환.
 * 그 매장에 아직 안 깔린 구성품은 drop(fallback). 슬롯이 비면 슬롯도 drop. 결과 없으면 null.
 */
async function translateSetGroupsForRestaurant(setGroups, restaurantId, transaction) {
  if (!Array.isArray(setGroups) || setGroups.length === 0) return null;
  const bmIds = [...new Set(setGroups.flatMap(g => (g.items || []).map(it => Number(it.product_id))).filter(Number.isInteger))];
  if (bmIds.length === 0) return null;
  const prods = await Product.findAll({
    where: { restaurant_id: restaurantId, brand_menu_id: { [Op.in]: bmIds } },
    attributes: ['id', 'brand_menu_id'], transaction
  });
  const map = new Map(prods.map(p => [Number(p.brand_menu_id), p.id]));
  const translated = setGroups.map(g => ({
    ...g,
    items: (g.items || []).map(it => {
      const rid = map.get(Number(it.product_id));
      return rid ? { ...it, product_id: rid } : null;
    }).filter(Boolean)
  })).filter(g => (g.items || []).length > 0);
  return translated.length ? translated : null;
}

/**
 * Sync a single BrandMenu into a single Restaurant. Idempotent.
 * Returns { product, created } indicating the local Product row and whether it was newly created.
 */
async function syncBrandMenuToRestaurant({ brandMenuId, restaurantId, transaction }) {
  const brandMenu = await BrandMenu.findByPk(brandMenuId, {
    include: [{ model: BrandMenuOptionGroup, as: 'optionGroups', include: [{ model: BrandMenuOption, as: 'options' }] }],
    transaction
  });
  if (!brandMenu) throw new Error(`BrandMenu ${brandMenuId} not found`);

  const restaurant = await Restaurant.findByPk(restaurantId, { transaction });
  if (!restaurant) throw new Error(`Restaurant ${restaurantId} not found`);
  if (restaurant.brand_id !== brandMenu.brand_id) {
    const e = new Error('Restaurant does not belong to this brand');
    e.code = 'BRAND_MISMATCH';
    throw e;
  }

  const locks = buildLocksSnapshot(brandMenu);
  const categoryName = await ensureLocalCategory(restaurantId, brandMenu.category_id, transaction);
  const localOptionGroupIds = await ensureLocalOptionGroups(restaurantId, brandMenu.optionGroups || [], transaction);

  // Find existing linked Product
  let product = await Product.findOne({
    where: { restaurant_id: restaurantId, brand_menu_id: brandMenu.id },
    transaction
  });

  if (product) {
    // Update — locked fields forced, non-locked fields refreshed from BG (RA can override after)
    const updates = {
      brand_menu_synced_version: brandMenu.version,
      brand_menu_synced_at: new Date(),
      brand_menu_locks_snapshot: locks,
      brand_menu_link_status: 'in_sync',
      // 범위에 (다시) 들어온 매장은 가시성 복원 — retract 됐던 상품도 살아남(숨김+보존)
      // RA 로컬 편집/주문이력 보존된 채 다시 노출. (2026-06-15 §14)
      brand_scope_active: true
    };
    if (locks.name || !product.name) updates.name = brandMenu.name;
    if (locks.price) updates.price = brandMenu.recommended_price;
    // Category: forced when locked, otherwise seed if the restaurant hasn't set a real one.
    if ((locks.category || !product.category || product.category === 'Uncategorized') && categoryName) {
      updates.category = categoryName;
    }
    if (locks.image) updates.image = brandMenu.image_url;
    // Options: when locked, BG fully controls. When unlocked, the BG-defined options
    // STILL carry over to the restaurant — merge the BG mirror groups with whatever
    // option groups the restaurant added on its own (own groups preserved). This is
    // why BG options now always appear on the linked product, even without a lock.
    // 2026-06-28 (1-3 Irene): 옵션 잠금 여부와 무관하게 항상 merge — 매장 자체 옵션그룹
    // (brand_menu_option_group_id = null)은 보존하고 브랜드 미러는 항상 포함한다. 잠금일 때
    // 매장 옵션을 통째로 지우던 기존 동작(=매장 추가분 소실)을 제거. "추가 허용 / 브랜드 보존"
    // (superset). 잠금의 강제력(브랜드 미러 제거 금지)은 매장 편집 가드(routes/menu.js)에서 보장.
    {
      const current = Array.isArray(product.optionGroups) ? product.optionGroups : [];
      // Identify which current groups are BG mirrors (linked by brand_menu_option_group_id)
      const mirrorRows = current.length ? await OptionGroup.findAll({
        where: {
          restaurant_id: restaurantId,
          id: { [Op.in]: current },
          brand_menu_option_group_id: { [Op.ne]: null }
        },
        attributes: ['id'],
        transaction
      }) : [];
      const mirrorIds = new Set(mirrorRows.map(r => r.id));
      const restaurantOwn = current.filter(id => !mirrorIds.has(id));   // keep store's own
      const merged = [...restaurantOwn];
      for (const id of localOptionGroupIds) if (!merged.includes(id)) merged.push(id);
      updates.optionGroups = merged;
    }
    // Set composition (is_set_menu / set_items / set_groups) is BG-defined and ALWAYS
    // mirrors to the restaurant on push — same philosophy as options above (BG-defined
    // content carries over even without a lock). The brand lock matrix only exposes
    // name/price/category/image/options (no per-menu "set lock" exists in the UI or in
    // brand default_locks), so gating set composition on locks.set_items — a flag that can
    // never be turned on — meant adding/removing set components never reached franchises
    // that already had the set menu (only the home restaurant, edited directly, looked
    // correct). Always re-mirror so set changes propagate like options. (2026-06-27 fix)
    updates.is_set_menu = !!brandMenu.is_set_menu;
    updates.set_items = brandMenu.set_items || null;
    // v2 set_groups — 구성품 brand_menu_id 를 매장 상품 id 로 변환해 미러
    updates.set_groups = await translateSetGroupsForRestaurant(brandMenu.set_groups, restaurantId, transaction);
    // 브랜드가 순서를 강제(lock_sort_order)하면 매장 상품 display_order 를 브랜드 sort_order 로 고정
    if (locks.sort_order) updates.display_order = brandMenu.sort_order || 0;
    // set_only(세트 전용 — 단품 판매 안 함)는 브랜드 판매정책 → 버전 sync 마다 브랜드 값으로 갱신 (2026-06-12)
    updates.set_only = brandMenu.set_only === true;
    // emoji / description always refreshed (not in lock matrix per spec — informational)
    if (brandMenu.emoji) updates.emoji = brandMenu.emoji;
    if (brandMenu.description) updates.description = brandMenu.description;
    if (brandMenu.product_recipe_id) updates.product_recipe_id = brandMenu.product_recipe_id;
    // "Linked Recipe"(recipe_id) — 재고차감이 쓰는 필드. 매장이 자기 레시피를 지정했으면
    // 절대 덮어쓰지 않는다(비클로버): 매장 recipe_id 가 비어 있을 때만 브랜드 값 상속.
    // 브랜드 링크 해제(recipe_id=null)는 매장 값을 건드리지 않는다(=매장 소유 존중).
    if (brandMenu.recipe_id && product.recipe_id == null) updates.recipe_id = brandMenu.recipe_id;
    await product.update(updates, { transaction });
    return { product, created: false };
  }

  // Create new Product on Restaurant side
  // Policy: pushed menus arrive INACTIVE — restaurant decides when to turn them on.
  // Existing restaurant menus and per-store edits stay untouched (recipe-style co-existence).
  product = await Product.create({
    restaurant_id: restaurantId,
    name: brandMenu.name,
    price: brandMenu.recommended_price,
    category: categoryName || 'Uncategorized',
    description: brandMenu.description || null,
    image: brandMenu.image_url || null,
    emoji: brandMenu.emoji || null,
    optionGroups: localOptionGroupIds,
    product_recipe_id: brandMenu.product_recipe_id || null,
    recipe_id: brandMenu.recipe_id || null, // "Linked Recipe" 상속(초기 푸시) — 재고차감이 쓰는 필드
    is_set_menu: !!brandMenu.is_set_menu,
    set_items: brandMenu.set_items || null,
    set_groups: await translateSetGroupsForRestaurant(brandMenu.set_groups, restaurantId, transaction),
    is_active: false,
    after_meal: brandMenu.after_meal === true, // 식후 제공 플래그 상속(초기 푸시). 이후엔 매장이 소유.
    set_only: brandMenu.set_only === true, // 세트 전용(단품 판매 안 함) — 브랜드 판매정책이므로 sync 에서도 항상 갱신 (2026-06-12)
    display_order: locks.sort_order ? (brandMenu.sort_order || 0) : 0, // 순서 강제 시 브랜드 순서 상속
    soldOut: false,
    // Sync tracking
    brand_menu_id: brandMenu.id,
    brand_menu_synced_version: brandMenu.version,
    brand_menu_synced_at: new Date(),
    brand_menu_locks_snapshot: locks,
    brand_menu_link_status: 'in_sync'
  }, { transaction });

  return { product, created: true };
}

/**
 * Push a BrandMenu to many restaurants. Each restaurant operates in its own transaction
 * so a single failure doesn't block the rest.
 *
 * Returns { pushed, created, updated, failed: [{ restaurant_id, error }] }.
 */
async function pushBrandMenuToRestaurants({ brandMenuId, restaurantIds }) {
  const result = { pushed: 0, created: 0, updated: 0, failed: [] };
  for (const rid of restaurantIds) {
    const t = await Product.sequelize.transaction();
    try {
      const { created } = await syncBrandMenuToRestaurant({ brandMenuId, restaurantId: rid, transaction: t });
      await t.commit();
      result.pushed++;
      created ? result.created++ : result.updated++;
    } catch (e) {
      await t.rollback();
      result.failed.push({ restaurant_id: rid, error: e.message, code: e.code });
    }
  }
  return result;
}

/**
 * Resolve the set of restaurant ids that a brand menu currently applies to.
 *   scope_mode='all'      → every restaurant under the brand.
 *   scope_mode='selected' → the brand_menu_restaurants allowlist, intersected with
 *                           the brand's restaurants (guards against stale rows).
 * Returns a de-duplicated array of restaurant ids. (2026-06-15 §14)
 */
async function resolveScopeTargetIds(brandMenu, transaction) {
  const { BrandMenuRestaurant } = require('../models');
  const brandRests = await Restaurant.findAll({
    where: { brand_id: brandMenu.brand_id }, attributes: ['id'], transaction
  });
  const brandRidSet = new Set(brandRests.map(r => r.id));
  if (brandMenu.scope_mode !== 'selected') {
    return [...brandRidSet];
  }
  const rows = await BrandMenuRestaurant.findAll({
    where: { brand_menu_id: brandMenu.id }, attributes: ['restaurant_id'], transaction
  });
  // allowlist ∩ brand restaurants (drop any restaurant that left the brand)
  return [...new Set(rows.map(r => r.restaurant_id).filter(id => brandRidSet.has(id)))];
}

/**
 * Declarative scope reconciler — make the restaurant world match a brand menu's scope.
 * Scope is a MEMBERSHIP concern, kept orthogonal to content propagation:
 *
 *   per in-scope restaurant:
 *     - no product yet            → create (fresh content, inactive). [both modes]
 *     - product exists, retracted → restore (brand_scope_active=true) + content sync,
 *                                   because it was hidden and needs current content. [both]
 *     - product exists, visible   → refreshMode='sync'      → content sync (refresh)
 *                                   refreshMode='membership' → left untouched (caller
 *                                     decides edit propagation: auto-sync vs mark-pending)
 *   out-of-scope linked products  → retract (brand_scope_active=false): hidden but PRESERVED
 *                                   (RA edits + order history survive; re-adding restores).
 *
 * Each restaurant syncs in its own transaction for per-store resilience. Retract is one bulk update.
 * Returns { targets, created, restored, refreshed, retracted, failed:[{restaurant_id,error}] }.
 */
async function applyScopeToBrandMenu({ brandMenuId, refreshMode = 'membership' }) {
  const brandMenu = await BrandMenu.findByPk(brandMenuId);
  if (!brandMenu) throw new Error(`BrandMenu ${brandMenuId} not found`);

  const targetIds = await resolveScopeTargetIds(brandMenu);
  const result = { targets: targetIds.length, created: 0, restored: 0, refreshed: 0, retracted: 0, failed: [] };

  for (const rid of targetIds) {
    const t = await Product.sequelize.transaction();
    try {
      const before = await Product.findOne({
        where: { restaurant_id: rid, brand_menu_id: brandMenuId },
        attributes: ['id', 'brand_scope_active'], transaction: t
      });
      const isRetracted = before && before.brand_scope_active === false;
      const needsContent = !before || isRetracted || refreshMode === 'sync';
      if (needsContent) {
        const { created } = await syncBrandMenuToRestaurant({ brandMenuId, restaurantId: rid, transaction: t });
        if (created) result.created++;
        else if (isRetracted) result.restored++;
        else result.refreshed++;
      }
      // visible product + membership mode → leave content to caller (no-op here)
      await t.commit();
    } catch (e) {
      await t.rollback();
      result.failed.push({ restaurant_id: rid, error: e.message, code: e.code });
    }
  }

  // Retract every linked product NOT in the target set (preserve, don't delete)
  const retractWhere = { brand_menu_id: brandMenuId, brand_scope_active: true };
  if (targetIds.length > 0) retractWhere.restaurant_id = { [Op.notIn]: targetIds };
  const [retracted] = await Product.update({ brand_scope_active: false }, { where: retractWhere });
  result.retracted = retracted;

  return result;
}

/**
 * Persist a brand menu's scope_mode + allowlist, then reconcile. Validates that
 * allowlist restaurants belong to the brand. Returns the reconcile result.
 *   refreshMode: 'sync' (auto distribution) | 'membership' (manual — caller marks pending).
 */
async function setBrandMenuScope({ brandMenuId, scopeMode, restaurantIds, refreshMode = 'membership' }) {
  const { BrandMenuRestaurant } = require('../models');
  const brandMenu = await BrandMenu.findByPk(brandMenuId);
  if (!brandMenu) throw new Error(`BrandMenu ${brandMenuId} not found`);

  const mode = scopeMode === 'selected' ? 'selected' : 'all';
  const t = await BrandMenu.sequelize.transaction();
  try {
    await brandMenu.update({ scope_mode: mode }, { transaction: t });
    if (mode === 'selected') {
      // validate ids belong to the brand
      const valid = await Restaurant.findAll({
        where: { id: Array.isArray(restaurantIds) ? restaurantIds : [], brand_id: brandMenu.brand_id },
        attributes: ['id'], transaction: t
      });
      const validIds = valid.map(r => r.id);
      // replace allowlist
      await BrandMenuRestaurant.destroy({ where: { brand_menu_id: brandMenuId }, transaction: t });
      for (const rid of validIds) {
        await BrandMenuRestaurant.create({ brand_menu_id: brandMenuId, restaurant_id: rid }, { transaction: t });
      }
    } else {
      // 'all' — allowlist is irrelevant; clear it to avoid stale rows
      await BrandMenuRestaurant.destroy({ where: { brand_menu_id: brandMenuId }, transaction: t });
    }
    await t.commit();
  } catch (e) {
    await t.rollback();
    throw e;
  }

  return applyScopeToBrandMenu({ brandMenuId, refreshMode });
}

/**
 * When a new restaurant joins a brand, auto-target it with every active brand menu
 * whose scope_mode='all' (scenario §14.7 #6). Best-effort, per-menu transaction.
 * 'selected'-scoped menus are NOT auto-added (BG must opt the new store in).
 */
async function syncAllScopedMenusToNewRestaurant({ restaurantId, brandId }) {
  const menus = await BrandMenu.findAll({
    where: { brand_id: brandId, scope_mode: 'all', is_active: true }, attributes: ['id']
  });
  const result = { menus: menus.length, created: 0, failed: [] };
  for (const m of menus) {
    const t = await Product.sequelize.transaction();
    try {
      await syncBrandMenuToRestaurant({ brandMenuId: m.id, restaurantId, transaction: t });
      await t.commit();
      result.created++;
    } catch (e) {
      await t.rollback();
      result.failed.push({ brand_menu_id: m.id, error: e.message });
    }
  }
  return result;
}

/**
 * Mark Restaurant.Product rows of a brand menu as pending_update (does not actually sync).
 * Used when BG edits a menu or option group with distribution_mode='manual'.
 */
async function markPendingForBrandMenu(brandMenuId, transaction) {
  await Product.update(
    { brand_menu_link_status: 'pending_update' },
    { where: { brand_menu_id: brandMenuId, brand_menu_link_status: { [Op.in]: ['in_sync', null] } }, transaction }
  );
}

/**
 * After an option group edit, mark all consuming BrandMenus as needing republish
 * (their version is bumped + their linked Products go pending_update).
 */
async function bumpMenusUsingOptionGroup(optionGroupId, transaction) {
  const links = await BrandMenuOptionGroupLink.findAll({
    where: { option_group_id: optionGroupId },
    attributes: ['brand_menu_id'],
    transaction
  });
  const menuIds = links.map(l => l.brand_menu_id);
  if (menuIds.length === 0) return { menus: 0 };

  await BrandMenu.update(
    { version: BrandMenu.sequelize.literal('version + 1') },
    { where: { id: { [Op.in]: menuIds } }, transaction }
  );
  await Product.update(
    { brand_menu_link_status: 'pending_update' },
    { where: { brand_menu_id: { [Op.in]: menuIds }, brand_menu_link_status: { [Op.in]: ['in_sync', null] } }, transaction }
  );
  return { menus: menuIds.length };
}

/**
 * Soft-unlink all Restaurant Products from a deleted BrandMenu.
 * Products survive (operationally critical), they just become independent.
 */
async function softUnlinkProductsFromBrandMenu(brandMenuId, transaction) {
  const [affected] = await Product.update({
    brand_menu_id: null,
    brand_menu_locks_snapshot: null,
    brand_menu_link_status: 'unlinked'
  }, { where: { brand_menu_id: brandMenuId }, transaction });
  return { unlinked: affected };
}

/**
 * Compute a diff between current Restaurant.Product and BrandMenu version.
 * Used by /brand-menu-updates so RA sees what would change.
 */
function computeMenuDiff(product, brandMenu, localCategoryName) {
  const fields = [];
  const cur = product ? {
    name: product.name,
    price: parseFloat(product.price),
    category: product.category,
    image: product.image,
    emoji: product.emoji,
    description: product.description
  } : null;
  const next = {
    name: brandMenu.name,
    price: parseFloat(brandMenu.recommended_price),
    category: localCategoryName,
    image: brandMenu.image_url,
    emoji: brandMenu.emoji,
    description: brandMenu.description
  };
  if (!cur) return { fields: ['*new'], is_new_menu: true };

  const fieldKeys = ['name', 'price', 'category', 'image', 'emoji', 'description'];
  for (const k of fieldKeys) {
    if ((cur[k] || null) !== (next[k] || null)) {
      fields.push({ field: k, old: cur[k], new: next[k], will_be_locked: !!(brandMenu[`lock_${k}`]) });
    }
  }
  return { fields, is_new_menu: false };
}

// ──────────────────────────────────────────────────────────────────────────
// #11c 모바일 크로스셀 — 브랜드 추천을 가맹점으로 동기화 (설계 §4.2)
// brand_menu_recommendations(BG) → product_recommendations(매장, origin='brand').
// 가맹점 자기 추천(origin='restaurant')은 절대 안 건드림. 매핑 안 되는 brand 분만 제거.
// ──────────────────────────────────────────────────────────────────────────
async function syncBrandRecommendationsToRestaurant({ brandId, restaurantId, transaction = null }) {
  const brandRecs = await BrandMenuRecommendation.findAll({ where: { brand_id: brandId }, transaction });

  // brand_menu_id → 그 매장의 로컬 product id (브랜드메뉴 sync 로 이미 생성됨)
  const bmIds = new Set();
  brandRecs.forEach(r => { bmIds.add(Number(r.brand_menu_id)); bmIds.add(Number(r.recommended_brand_menu_id)); });
  const prods = bmIds.size
    ? await Product.findAll({ where: { restaurant_id: restaurantId, brand_menu_id: { [Op.in]: [...bmIds] }, is_active: true }, attributes: ['id', 'brand_menu_id'], transaction })
    : [];
  const localByBm = new Map(prods.map(p => [Number(p.brand_menu_id), p.id]));

  const keep = new Set();
  let synced = 0;
  for (const r of brandRecs) {
    const baseLocal = localByBm.get(Number(r.brand_menu_id));
    const recLocal = localByBm.get(Number(r.recommended_brand_menu_id));
    if (!baseLocal || !recLocal || baseLocal === recLocal) continue; // 양쪽 매핑 안 되면 skip

    const [row, created] = await ProductRecommendation.findOrCreate({
      where: { product_id: baseLocal, recommended_product_id: recLocal },
      defaults: {
        restaurant_id: restaurantId, product_id: baseLocal, recommended_product_id: recLocal,
        origin: 'brand', brand_menu_recommendation_id: r.id, is_locked: !!r.is_locked, sort_order: r.sort_order || 0,
      },
      transaction,
    });
    if (created) { keep.add(row.id); synced++; }
    else if (row.origin === 'brand') {
      await row.update({ restaurant_id: restaurantId, brand_menu_recommendation_id: r.id, is_locked: !!r.is_locked, sort_order: r.sort_order || 0 }, { transaction });
      keep.add(row.id); synced++;
    }
    // else: 같은 pair 의 origin='restaurant' 행이 이미 존재 → 그 추천은 이미 표시됨, 매장 행 보존.
  }

  // 더 이상 존재하지 않는 brand 분 제거 (origin='brand' 만, restaurant 분 무접촉)
  const existingBrand = await ProductRecommendation.findAll({ where: { restaurant_id: restaurantId, origin: 'brand' }, attributes: ['id'], transaction });
  const stale = existingBrand.filter(r => !keep.has(r.id)).map(r => r.id);
  if (stale.length) await ProductRecommendation.destroy({ where: { id: { [Op.in]: stale } }, transaction });

  return { synced, removed: stale.length };
}

// 브랜드의 모든 가맹점에 추천 동기화 (BG PUT 저장 시 호출)
async function syncBrandRecommendationsToAllRestaurants({ brandId }) {
  const restaurants = await Restaurant.findAll({ where: { brand_id: brandId }, attributes: ['id'] });
  const results = [];
  for (const r of restaurants) {
    try {
      const res = await syncBrandRecommendationsToRestaurant({ brandId, restaurantId: r.id });
      results.push({ restaurant_id: r.id, ...res });
    } catch (e) {
      results.push({ restaurant_id: r.id, error: e.message });
    }
  }
  return results;
}

module.exports = {
  LOCK_FIELDS,
  buildLocksSnapshot,
  syncBrandMenuToRestaurant,
  syncBrandRecommendationsToRestaurant,
  syncBrandRecommendationsToAllRestaurants,
  pushBrandMenuToRestaurants,
  resolveScopeTargetIds,
  applyScopeToBrandMenu,
  setBrandMenuScope,
  syncAllScopedMenusToNewRestaurant,
  markPendingForBrandMenu,
  bumpMenusUsingOptionGroup,
  softUnlinkProductsFromBrandMenu,
  computeMenuDiff
};
