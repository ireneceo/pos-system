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
 * Resolve the numeric PRODUCT id from an order item, regardless of shape.
 *
 * POS cart lines carry a client-generated string id (e.g. "order-1780040646788")
 * in `item.id`, while the real product id lives in `item.menuItem.id`. Mobile
 * paths may put the product id directly in `item.id` or `item.menu_item_id`.
 * We therefore prefer the explicit product-id fields and only accept `item.id`
 * when it is itself numeric — otherwise the non-numeric cart-line id would
 * shadow `menuItem.id` in a plain `||` chain and station resolution would fail
 * (The Fire 매장: every POS order saved kitchen_station_id=null → blank station tag).
 */
function resolveProductId(i) {
  if (!i) return null;
  const candidates = [i.menu_item_id, i.product_id, i.menuItem && i.menuItem.id, i.id];
  for (const c of candidates) {
    if (c != null && Number.isInteger(Number(c))) return Number(c);
  }
  return null;
}

/**
 * Enrich items with kitchen_station_id resolved from Product/Category.
 *
 * @param {number} restaurantId
 * @param {Array} items - order items (any shape; must contain menu_item_id or id)
 * @returns {Promise<Array>} new array with kitchen_station_id + category populated
 */
async function enrichItemsWithStation(restaurantId, items) {
  if (!Array.isArray(items) || items.length === 0) return items || [];

  // Collect candidate product ids (numeric product id, never the cart-line id).
  // 세트 구성품(set_components)의 product_id 도 함께 수집 → 구성품마다 자기 주방으로 분배.
  const productIds = [];
  items.forEach(it => {
    const pid = resolveProductId(it);
    if (pid != null) productIds.push(pid);
    if (Array.isArray(it && it.set_components)) {
      it.set_components.forEach(c => {
        const cpid = c && Number(c.product_id);
        if (Number.isInteger(cpid)) productIds.push(cpid);
      });
    }
  });

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

  // 구성품 product → station 해석 헬퍼 (item 해석과 동일 규칙: product → category)
  const stationForComp = (c) => {
    if (!c) return null;
    if (c.kitchen_station_id) return c.kitchen_station_id;
    const cprod = productMap.get(Number(c.product_id));
    return (cprod && cprod.kitchen_station_id)
      || (cprod && cprod.category && catStationMap.get(String(cprod.category)))
      || null;
  };

  let result = items.map(item => {
    const pid = resolveProductId(item);
    const product = pid ? productMap.get(pid) : null;
    const fromProduct = product && product.kitchen_station_id;
    const fromCategory = product && product.category && catStationMap.get(String(product.category));
    const kitchenStationId = item.kitchen_station_id || fromProduct || fromCategory || null;
    const out = {
      ...item,
      kitchen_station_id: kitchenStationId,
      category: item.category || (product && product.category) || null
    };
    // 세트: 구성품마다 자기 주방 station 부여 (걸려있는 메뉴대로 분배). 기존 item 동작 무변경.
    if (Array.isArray(item.set_components) && item.set_components.length > 0) {
      out.set_components = item.set_components.map(c => ({ ...c, kitchen_station_id: stationForComp(c) }));
    }
    return out;
  });

  // 2026-05-29: NAME-based fallback. Mobile/QR orders arrive with only a product
  // NAME (no numeric id — their line id is "item-<order>-<idx>"), so the id pass
  // above leaves kitchen_station_id null → the ticket piled onto station #1 and
  // missed its real station (e.g. a milkshake never reached the BAR printer).
  // Match the leftover items to a product by name. Only runs when something is
  // still unresolved (POS orders resolve by id and skip this — no extra query).
  const compNeedsName = (it) => Array.isArray(it.set_components) && it.set_components.some(c => !c.kitchen_station_id && c.name);
  if (result.some(it => (!it.kitchen_station_id && it.name) || compNeedsName(it))) {
    try {
      const allProducts = await Product.findAll({
        where: { restaurant_id: restaurantId },
        attributes: ['name', 'kitchen_station_id', 'category']
      });
      const nameStationMap = new Map();
      allProducts.forEach(p => {
        if (!p.name) return;
        const sid = p.kitchen_station_id || (p.category && catStationMap.get(String(p.category)));
        if (sid) nameStationMap.set(String(p.name).trim().toLowerCase(), sid);
      });
      const byName = (n) => n ? nameStationMap.get(String(n).trim().toLowerCase()) : null;
      result = result.map(it => {
        let next = it;
        if (!it.kitchen_station_id && it.name) {
          const sid = byName(it.name);
          if (sid) next = { ...next, kitchen_station_id: sid };
        }
        // 세트 구성품 이름 폴백
        if (compNeedsName(next)) {
          next = { ...next, set_components: next.set_components.map(c => {
            if (c.kitchen_station_id || !c.name) return c;
            const sid = byName(c.name);
            return sid ? { ...c, kitchen_station_id: sid } : c;
          }) };
        }
        return next;
      });
    } catch (e) { /* non-fatal — leave unresolved */ }
  }

  return result;
}

module.exports = { enrichItemsWithStation };
