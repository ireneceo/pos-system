/**
 * Kitchen station enrichment — single source of truth for resolving each
 * order item's kitchen_station_id.
 *
 * Used by every order-write path (POS new / POS add-items merge / mobile new /
 * mobile auto-merge) so the kitchen_station_id is always populated on the row
 * the kitchen printer reads from. Without this, station routing fails on the
 * frontend → items fall into the "unmapped" bucket → all tickets pile onto
 * the first station and other stations print nothing.
 *
 * Resolution order (highest → lowest):
 *   1. item.kitchen_station_id          — explicit per-item override from client
 *   2. Product.kitchen_station_id       — menu-level override (BG/RA setting)
 *   3. Category.kitchen_station_id      — category default (matched by id OR name)
 *
 * Note on Product.category: it's a STRING(50) that legacy stores hold as either
 * the numeric category id ("91") or the category NAME ("Uncategorized"). We
 * build the Category lookup map keyed by BOTH id and name so the resolution
 * works regardless of which value the row carries.
 */

const Product = require('../models/Product');
const Category = require('../models/Category');

/**
 * Enrich items with kitchen_station_id resolved from Product/Category.
 *
 * @param {number} restaurantId
 * @param {Array} items - order items (any shape; must contain menu_item_id or id)
 * @returns {Promise<Array>} new array with kitchen_station_id + category populated
 */
async function enrichItemsWithStation(restaurantId, items) {
  if (!Array.isArray(items) || items.length === 0) return items || [];

  // Collect candidate product ids from common field names
  const productIds = items
    .map(i => i.menu_item_id || i.id || (i.menuItem && i.menuItem.id))
    .filter(x => x != null && Number.isInteger(Number(x)))
    .map(Number);

  const products = productIds.length > 0
    ? await Product.findAll({
        where: { id: productIds },
        attributes: ['id', 'kitchen_station_id', 'category']
      })
    : [];
  const productMap = new Map(products.map(p => [Number(p.id), p]));

  // Build category → station map keyed by BOTH id and name
  const categories = await Category.findAll({
    where: { restaurant_id: restaurantId },
    attributes: ['id', 'name', 'kitchen_station_id']
  });
  const catStationMap = new Map();
  categories.forEach(c => {
    catStationMap.set(String(c.id), c.kitchen_station_id);
    if (c.name) catStationMap.set(c.name, c.kitchen_station_id);
  });

  return items.map(item => {
    const pid = Number(item.menu_item_id || item.id || (item.menuItem && item.menuItem.id));
    const product = pid ? productMap.get(pid) : null;
    const fromProduct = product && product.kitchen_station_id;
    const fromCategory = product && product.category && catStationMap.get(String(product.category));
    const kitchenStationId = item.kitchen_station_id || fromProduct || fromCategory || null;
    return {
      ...item,
      kitchen_station_id: kitchenStationId,
      category: item.category || (product && product.category) || null
    };
  });
}

module.exports = { enrichItemsWithStation };
