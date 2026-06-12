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
  BrandMenuOptionGroupLink, Restaurant, Product, OptionGroup, Option, Category
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
      brand_menu_link_status: 'in_sync'
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
    if (locks.options) {
      updates.optionGroups = localOptionGroupIds;
    } else {
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
    if (locks.set_items) {
      updates.is_set_menu = !!brandMenu.is_set_menu;
      updates.set_items = brandMenu.set_items || null;
      // v2 set_groups — 구성품 brand_menu_id 를 매장 상품 id 로 변환해 미러
      updates.set_groups = await translateSetGroupsForRestaurant(brandMenu.set_groups, restaurantId, transaction);
    }
    // 브랜드가 순서를 강제(lock_sort_order)하면 매장 상품 display_order 를 브랜드 sort_order 로 고정
    if (locks.sort_order) updates.display_order = brandMenu.sort_order || 0;
    // set_only(세트 전용 — 단품 판매 안 함)는 브랜드 판매정책 → 버전 sync 마다 브랜드 값으로 갱신 (2026-06-12)
    updates.set_only = brandMenu.set_only === true;
    // emoji / description always refreshed (not in lock matrix per spec — informational)
    if (brandMenu.emoji) updates.emoji = brandMenu.emoji;
    if (brandMenu.description) updates.description = brandMenu.description;
    if (brandMenu.product_recipe_id) updates.product_recipe_id = brandMenu.product_recipe_id;
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

module.exports = {
  LOCK_FIELDS,
  buildLocksSnapshot,
  syncBrandMenuToRestaurant,
  pushBrandMenuToRestaurants,
  markPendingForBrandMenu,
  bumpMenusUsingOptionGroup,
  softUnlinkProductsFromBrandMenu,
  computeMenuDiff
};
