/**
 * categorize-and-cleanup.js — assign content-matched categories to imported stock items
 * and blank garbage (dimension) SKUs. Idempotent. Run on the target DB directly.
 *
 *   node scripts/withmin-import/categorize-and-cleanup.js --bg 23 --restaurant 10 [--commit]
 *
 * - Creates ProductIngredientCategory (owner=BG) + IngredientCategory (restaurant) as needed.
 * - Classifies each stock item by name keywords → sets category_id / ingredient_category_id.
 * - Blanks SupplierProduct.sku / BrandProduct.sku that are dimensions ("90mm x90mm") not codes.
 */
require('dotenv/config');
const { sequelize } = require('../../config/database');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const BG = parseInt(arg('bg'), 10);
const REST = parseInt(arg('restaurant'), 10);
const COMMIT = process.argv.includes('--commit');

// Category taxonomy — order matters (first match wins). emoji + keyword list.
const CATS = [
  ['Staff Meal', '🍱', [/\bstaff\b/i, /직원식/]],
  ['Seafood', '🦐', [/prawn|squid|octopus|mackerel|salmon|clam|cockle|crab\b|scallop|fish(?!.*sauce)|seaweed|anchov|shrimp|kanika|lala|saba/i]],
  ['Poultry', '🍗', [/chicken|drumstick|\bbreast|gizzard|\bliver|frank|nugget|poultry|ayam/i]],
  ['Meat', '🥩', [/beef|brisket|bulgogi|pork|midfield/i]],
  ['Vegetables', '🥬', [/onion|garlic|ginger|potato|tomato|lettuce|cabbage|chilli|chili|cucumber|mushroom|spinach|carrot|radish|capsicum|zucchini|eggplant|broccoli|coral|salad|mesclun|kale|leek|shallot|enoki|beans?\b|okra|bendi|bitter melon|water spinach|tempeh|tofu|bean sprout|yaw mak|padi/i]],
  ['Fruit', '🍎', [/apple|lemon|lime\b|mango|strawberr|\bpear\b|peach|kiwi|grapefruit|citron|yuja|barry|berry|raisin|almond|jujube/i]],
  ['Dairy & Egg', '🧀', [/cheese|milk|cream\b|\begg|butter|margarine|mozzarella|condensed/i]],
  ['Tea & Coffee', '☕', [/\btea\b|coffee|matcha|herbal|earl grey|chamomile|peppermint|breakfast|barley/i]],
  ['Alcohol', '🍶', [/soju|makgeolli|beer|tiger/i]],
  ['Beverage', '🥤', [/cola|sprite|soda|mineral water|spritzer|\bjuice|cordial|oat milk|good day|club soda/i]],
  ['Base & Syrup', '🧴', [/\bbase\b|syrup|monin|maple|hershey/i]],
  ['Sauce & Condiment', '🫙', [/sauce|gochujang|doenjang|soybean paste|vinegar|ketchup|mayonn+aise|mayonaisse|oyster|fish sauce|soy\b|jjajang|udon|jam\b|honey|paste|chojang|marmalade/i]],
  ['Spice & Powder', '🧂', [/pepper|\bsalt\b|\bmsg\b|monosodium|curry|\bflour|starch|breadcrumb|bread crumb|\bpowder|\bsugar|baking soda|bicarbonate|stock\b|dashi|dhal|dhall|cumin|garlic powder|onion powder|seasoning/i]],
  ['Noodle, Rice & Grain', '🍚', [/\brice\b|noodle|ramen|ramyeon|spaghetti|glass noodle|somen|udon noodle|kimbob|kimbap|rice cake|croissant|bread|hotteok|yakgwa|dumpling|당면|면\b/i]],
  ['Packaging & Disposables', '📦', [/\bcup\b|bowl|\blid\b|\bbag\b|container|spoon|\bfork\b|glove|\bbox\b|paper|roll\b|straw|wrap|\btray|napkin|serviette|tissue|towel|twine|string|liner|candle|egg tray|pe singlet|zip lock|cling film|baking paper|jute/i]],
  ['Cleaning & Chemical', '🧽', [/detergent|bleach|clorox|dishwash|dish wash|cleaner|sponge|\bmop\b|deodor|kleen|hand cleanser|cocorex|scrub|filter/i]],
  ['Kitchen & Supplies', '🔧', [/\bgas\b|battery|lighter|colander|\bclip|pencil|\btape|staple|mosquito|torch|coil|fumakilla|broom|bottle$|note book|ez.?wrap|grabbit/i]],
];
function classify(name) {
  const s = String(name || '');
  for (const [cat, , kws] of CATS) if (kws.some(re => re.test(s))) return cat;
  return 'Other';
}
const isDimensionSku = (sku) => !!sku && /\bmm\b|\d+\s*mm|x\s*\d+\s*mm/i.test(sku) && !/^\d{3,4}-\d{2,3}$/.test(sku);

(async () => {
  const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];
  const run = async (s, r) => COMMIT ? sequelize.query(s, r ? { replacements: r } : undefined) : null;
  const catCount = {};

  // ---- BG ProductIngredient categorization ----
  const pis = await q('SELECT id, name, category_id FROM product_ingredients WHERE owner_user_id = ?', [BG]);
  // ensure categories
  const bgCatId = {};
  for (const [cat, emoji] of [...CATS, ['Other', '📋']]) {
    let row = (await q('SELECT id FROM product_ingredient_categories WHERE owner_user_id=? AND name=?', [BG, cat]))[0];
    if (!row) { if (COMMIT) { await run('INSERT INTO product_ingredient_categories (owner_user_id,name,emoji,created_at,updated_at) VALUES (?,?,?,NOW(),NOW())', [BG, cat, emoji]); row = (await q('SELECT id FROM product_ingredient_categories WHERE owner_user_id=? AND name=?', [BG, cat]))[0]; } else row = { id: `DRY:${cat}` }; }
    bgCatId[cat] = row.id;
  }
  let bgAssigned = 0;
  for (const pi of pis) {
    const cat = classify(pi.name);
    catCount[cat] = (catCount[cat] || 0) + 1;
    if (String(bgCatId[cat]) !== String(pi.category_id)) { await run('UPDATE product_ingredients SET category_id=? WHERE id=?', [bgCatId[cat], pi.id]); bgAssigned++; }
  }

  // ---- Restaurant Ingredient categorization ----
  const ings = await q("SELECT id, name, ingredient_category_id FROM ingredients WHERE restaurant_id=? AND owner_type='restaurant'", [REST]);
  const rCatId = {};
  for (const [cat, emoji] of [...CATS, ['Other', '📋']]) {
    let row = (await q("SELECT id FROM ingredient_categories WHERE owner_type='restaurant' AND restaurant_id=? AND name=?", [REST, cat]))[0];
    if (!row) { if (COMMIT) { await run("INSERT INTO ingredient_categories (owner_type,restaurant_id,name,emoji,is_active,created_at,updated_at) VALUES ('restaurant',?,?,?,1,NOW(),NOW())", [REST, cat, emoji]); row = (await q("SELECT id FROM ingredient_categories WHERE owner_type='restaurant' AND restaurant_id=? AND name=?", [REST, cat]))[0]; } else row = { id: `DRY:${cat}` }; }
    rCatId[cat] = row.id;
  }
  let rAssigned = 0;
  for (const ing of ings) {
    const cat = classify(ing.name);
    if (String(rCatId[cat]) !== String(ing.ingredient_category_id)) { await run('UPDATE ingredients SET ingredient_category_id=? WHERE id=?', [rCatId[cat], ing.id]); rAssigned++; }
  }

  // ---- BrandProduct categorization (source for the sync → IngredientCategory translation) ----
  const bps = await q('SELECT id, name, category_id FROM brand_products WHERE owner_user_id=?', [BG]);
  const bpCatId = {};
  for (const [cat, emoji] of [...CATS, ['Other', '📋']]) {
    let row = (await q('SELECT id FROM brand_product_categories WHERE owner_user_id=? AND name=?', [BG, cat]))[0];
    if (!row) { if (COMMIT) { await run('INSERT INTO brand_product_categories (owner_user_id,name,emoji,created_at,updated_at) VALUES (?,?,?,NOW(),NOW())', [BG, cat, emoji]); row = (await q('SELECT id FROM brand_product_categories WHERE owner_user_id=? AND name=?', [BG, cat]))[0]; } else row = { id: `DRY:${cat}` }; }
    bpCatId[cat] = row.id;
  }
  let bpAssigned = 0;
  for (const bp of bps) {
    const cat = classify(bp.name);
    if (String(bpCatId[cat]) !== String(bp.category_id)) { await run('UPDATE brand_products SET category_id=? WHERE id=?', [bpCatId[cat], bp.id]); bpAssigned++; }
  }

  // ---- garbage SKU cleanup ----
  const brandProds = await q('SELECT id, sku FROM brand_products WHERE owner_user_id=?', [BG]);
  let bpSku = 0; for (const p of brandProds) if (isDimensionSku(p.sku)) { await run('UPDATE brand_products SET sku=NULL WHERE id=?', [p.id]); bpSku++; }
  const supProds = await q("SELECT sp.id, sp.sku FROM supplier_products sp JOIN supplier_companies s ON sp.supplier_company_id=s.id WHERE s.is_system_registered=0 AND ((s.registered_by_entity_type='brand' AND s.registered_by_entity_id IN (SELECT id FROM brands WHERE owner_id=?)) OR (s.registered_by_entity_type='restaurant' AND s.registered_by_entity_id=?))", [BG, REST]);
  let spSku = 0; for (const p of supProds) if (isDimensionSku(p.sku)) { await run('UPDATE supplier_products SET sku=NULL WHERE id=?', [p.id]); spSku++; }

  console.log(`\n=== 카테고리+정리 ${COMMIT ? '(COMMIT)' : '(DRY)'} ===`);
  console.log('BG 재고', pis.length, '→ 카테고리 배정', bgAssigned, '| 레스토랑 재고', ings.length, '→ 배정', rAssigned, '| BrandProduct', bps.length, '→ 배정', bpAssigned);
  console.log('치수 SKU 정리: BrandProduct', bpSku, '· SupplierProduct', spSku);
  console.log('카테고리 분포:', Object.entries(catCount).sort((a,b)=>b[1]-a[1]).map(([c,n])=>`${c}:${n}`).join(' · '));
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
