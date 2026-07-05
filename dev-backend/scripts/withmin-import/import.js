/**
 * import.js — idempotent supply-chain importer for the With MIN list.
 * API-driven (respects all validation, auto-contracts, brand mirrors). Default = DRY RUN.
 *
 *   node scripts/withmin-import/import.js --port 3001 --bg 11 --brand 1 --ra 21 --restaurant 10 [--commit]
 *
 * Scopes (Irene 2026-07-05):
 *   BG_SOLD (UGS/Tourmanium) → BrandProduct (owner=BG). Stock always BG-level. Link seller_type=brand.
 *   BG_EXT   → external SupplierCompany registered at BG (brand scope). Stock BG-level. seller_type=supplier.
 *   REST_ONLY→ external SupplierCompany registered at RA (restaurant scope). Stock restaurant-level.
 *             EXCEPT a cross-bucket item (also sold by a BG-bucket supplier) consolidates to a BG stock;
 *             that item's REST_ONLY source then also needs a BG-scoped registration of the supplier.
 *
 * Idempotent: every create is guarded by a name/scope existence check; from-catalog dedupes links.
 */
const http = require('http');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const { parse } = require('./parse.js');
const { stockName } = require('./names.js');

// ---- args ----
const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const PORT = parseInt(arg('port', '3001'), 10);
const BG_USER = parseInt(arg('bg'), 10);
const BRAND_ID = parseInt(arg('brand'), 10);
const RA_USER = parseInt(arg('ra'), 10);
const REST_ID = parseInt(arg('restaurant'), 10);
const COMMIT = process.argv.includes('--commit');
const LIMIT = parseInt(arg('limit', '0'), 10); // optional: only first N stocks (for smoke)

const SECRET = process.env.JWT_SECRET;
const bgTok = jwt.sign({ userId: BG_USER }, SECRET, { expiresIn: '2h' });
const raTok = jwt.sign({ userId: RA_USER }, SECRET, { expiresIn: '2h' });

function req(method, path, token, body) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const r = http.request({ host: 'localhost', port: PORT, path: '/api' + path, method,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token,
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) } }, (res) => {
      let b = ''; res.on('data', c => b += c);
      res.on('end', () => { let j; try { j = JSON.parse(b); } catch { j = b; } resolve({ status: res.statusCode, body: j }); });
    });
    r.on('error', e => resolve({ status: 0, body: String(e.message) }));
    if (data) r.write(data); r.end();
  });
}
const listData = (r) => Array.isArray(r.body?.data) ? r.body.data : (Array.isArray(r.body) ? r.body : []);
const norm = (s) => String(s || '').trim().toLowerCase();
// Space/paren-insensitive key so "Korean Leek(대파)" == "Korean Leek (대파)" — lets the import
// REUSE gitconsulting's existing hand-made stock items instead of creating near-duplicates.
// Keeps the Korean inside, so genuinely different items (다른 한글) stay distinct.
const nkey = (s) => String(s || '').toLowerCase().replace(/[\s()·]/g, '');
const findByName = (arr, name) => arr.find(p => nkey(p.name) === nkey(name)) || arr.find(p => norm(p.name) === norm(name));

let created = { supplier: 0, supProduct: 0, brandProduct: 0, bgStock: 0, restStock: 0, link: 0, skip: 0, err: 0 };
const log = (...a) => console.log(...a);
const errlog = [];

async function ensureSupplier(name, scope /* 'brand'|'restaurant' */) {
  const tok = scope === 'brand' ? bgTok : raTok;
  const list = listData(await req('GET', '/external-suppliers', tok));
  let found = list.find(s => norm(s.name) === norm(name));
  if (found) return found.id;
  if (!COMMIT) { created.supplier++; return `DRY:sup:${scope}:${name}`; }
  const r = await req('POST', '/external-suppliers', tok, { name });
  const id = r.body?.data?.supplier?.id;
  if (!id) { errlog.push(`supplier create fail ${name}@${scope}: ${r.status} ${JSON.stringify(r.body).slice(0, 120)}`); created.err++; return null; }
  created.supplier++; return id;
}

async function ensureSupProduct(supId, scope, prod /* {name,unit,price,sku,code} */) {
  const tok = scope === 'brand' ? bgTok : raTok;
  if (String(supId).startsWith('DRY')) { created.supProduct++; return `DRY:sp:${prod.name}`; }
  const list = listData(await req('GET', `/external-suppliers/${supId}/products`, tok));
  let found = list.find(p => norm(p.name) === norm(prod.name));
  if (found) return found.id;
  if (!COMMIT) { created.supProduct++; return `DRY:sp:${prod.name}`; }
  const body = { name: prod.name, unit_price: prod.price || 0, unit: prod.unit, min_order_quantity: 1 };
  if (prod.code) body.sku = prod.code;
  const r = await req('POST', `/external-suppliers/${supId}/products`, tok, body);
  const id = r.body?.data?.id;
  if (!id) { errlog.push(`supProduct fail ${prod.name}: ${r.status} ${JSON.stringify(r.body).slice(0, 120)}`); created.err++; return null; }
  created.supProduct++; return id;
}

async function ensureBrandProduct(prod /* {name,unit,price,sku} */) {
  const list = listData(await req('GET', '/brand-products', bgTok));
  let found = list.find(p => norm(p.name) === norm(prod.name));
  if (found) return found.id;
  if (!COMMIT) { created.brandProduct++; return `DRY:bp:${prod.name}`; }
  // distribution_mode MUST be 'all' (BrandProduct ENUM: all | specific_brands | specific_restaurants).
  // 'all_restaurants' is not a valid mode — server silently coerces it to specific_brands with 0 brand
  // links, making the product invisible in the restaurant catalog (verified on dev BP 74-77).
  const body = { name: prod.name, unit: prod.unit, unit_price: prod.price || 0, base_quantity: 1,
    min_order_quantity: 1, distribution_mode: 'all', sku: prod.sku || undefined };
  const r = await req('POST', '/brand-products', bgTok, body);
  const id = r.body?.data?.id || r.body?.data?.product?.id;
  if (!id) { errlog.push(`brandProduct fail ${prod.name}: ${r.status} ${JSON.stringify(r.body).slice(0, 140)}`); created.err++; return null; }
  created.brandProduct++; return id;
}

async function ensureBgStock(name, unit) {
  const list = listData(await req('GET', '/product-ingredients', bgTok));
  let found = findByName(list, name);
  if (found) return found.id;
  if (!COMMIT) { created.bgStock++; return `DRY:pi:${name}`; }
  const r = await req('POST', '/product-ingredients', bgTok, { name, unit, base_quantity: 1, unit_cost: 0, track_stock: true });
  const id = r.body?.data?.id || r.body?.data?.ingredient?.id;
  if (!id) { errlog.push(`bgStock fail ${name}: ${r.status} ${JSON.stringify(r.body).slice(0, 140)}`); created.err++; return null; }
  created.bgStock++; return id;
}

async function ensureRestStock(name, unit) {
  const raw = await req('GET', `/restaurants/${REST_ID}/ingredients`, raTok);
  const arr = Array.isArray(raw.body?.data) ? raw.body.data
    : Array.isArray(raw.body?.data?.ingredients) ? raw.body.data.ingredients
    : Array.isArray(raw.body) ? raw.body : [];
  const found = findByName(arr, name);
  if (found) return found.id;
  if (!COMMIT) { created.restStock++; return `DRY:ing:${name}`; }
  const r = await req('POST', `/restaurants/${REST_ID}/ingredients`, raTok, { name, unit, base_quantity: 1, unit_cost: 0, track_stock: true });
  const id = r.body?.data?.id || r.body?.data?.ingredient?.id;
  if (!id) { errlog.push(`restStock fail ${name}: ${r.status} ${JSON.stringify(r.body).slice(0, 140)}`); created.err++; return null; }
  created.restStock++; return id;
}

// link a BG stock to a seller product via from-catalog (idempotent server-side)
async function linkBgStock(piId, sellerRef /* {kind:'supplier'|'brand', id} */) {
  if (!COMMIT || String(piId).startsWith('DRY') || String(sellerRef.id).startsWith('DRY')) { created.link++; return; }
  const body = sellerRef.kind === 'brand' ? { brand_product_id: sellerRef.id, existing_product_ingredient_id: piId }
    : { supplier_product_id: sellerRef.id, existing_product_ingredient_id: piId };
  const r = await req('POST', '/product-ingredients/from-catalog', bgTok, body);
  if (r.status >= 400) { errlog.push(`link BG ${piId}<-${JSON.stringify(sellerRef)}: ${r.status} ${JSON.stringify(r.body).slice(0, 120)}`); created.err++; return; }
  created.link++;
}
async function linkRestStock(ingId, supProductId) {
  if (!COMMIT || String(ingId).startsWith('DRY') || String(supProductId).startsWith('DRY')) { created.link++; return; }
  const r = await req('POST', `/restaurants/${REST_ID}/ingredients/from-catalog`, raTok, { supplier_product_id: supProductId, existing_ingredient_id: ingId });
  if (r.status >= 400) { errlog.push(`link REST ${ingId}<-${supProductId}: ${r.status} ${JSON.stringify(r.body).slice(0, 120)}`); created.err++; return; }
  created.link++;
}

(async () => {
  const { stocks } = parse();
  const targetStocks = LIMIT ? stocks.slice(0, LIMIT) : stocks;
  log(`\n=== WITH MIN IMPORT ${COMMIT ? '(COMMIT)' : '(DRY RUN — no writes)'} ===`);
  log(`port ${PORT} | BG user ${BG_USER}/brand ${BRAND_ID} | RA ${RA_USER}/restaurant ${REST_ID} | 재고 ${targetStocks.length}\n`);

  // caches so we don't re-register the same supplier repeatedly
  const supCache = new Map();   // `${name}@${scope}` -> supplierId
  const supProdCache = new Map(); // `${supId}::${item}` -> supProductId
  const bpCache = new Map();     // brand product name -> id

  let done = 0;
  for (const st of targetStocks) {
    const level = st.level; // 'BG' | 'RESTAURANT'
    const name = stockName(st);
    // create the stock item
    const stockId = level === 'BG' ? await ensureBgStock(name, st.unit) : await ensureRestStock(name, st.unit);
    if (stockId == null) continue;

    for (const src of st.sources) {
      const isBGSold = src.bucket === 'BG_SOLD';
      // determine link scope: BG stock -> brand scope; RESTAURANT stock -> restaurant scope
      const linkScope = level === 'BG' ? 'brand' : 'restaurant';
      if (isBGSold) {
        // UGS/Tourmanium -> BrandProduct, link seller_type=brand (only valid on BG stock)
        let bpId = bpCache.get(norm(src.item));
        if (bpId == null) { bpId = await ensureBrandProduct({ name: src.item, unit: src.unit, price: src.price, sku: src.code }); bpCache.set(norm(src.item), bpId); }
        if (bpId != null && level === 'BG') await linkBgStock(stockId, { kind: 'brand', id: bpId });
        else if (level !== 'BG') { errlog.push(`SKIP brandProduct on restaurant stock "${name}" (${src.item})`); created.skip++; }
      } else {
        // external supplier at the link scope
        const supKey = `${norm(src.supplier)}@${linkScope}`;
        let supId = supCache.get(supKey);
        if (supId == null) { supId = await ensureSupplier(src.supplier, linkScope); supCache.set(supKey, supId); }
        if (supId == null) { created.err++; continue; }
        const spKey = `${supId}::${norm(src.item)}`;
        let spId = supProdCache.get(spKey);
        if (spId == null) { spId = await ensureSupProduct(supId, linkScope, { name: src.item, unit: src.unit, price: src.price, code: src.code }); supProdCache.set(spKey, spId); }
        if (spId == null) continue;
        if (level === 'BG') await linkBgStock(stockId, { kind: 'supplier', id: spId });
        else await linkRestStock(stockId, spId);
      }
    }
    if (++done % 40 === 0) log(`  …${done}/${targetStocks.length}`);
  }

  log('\n=== 결과 ===');
  log(JSON.stringify(created, null, 2));
  if (errlog.length) { log(`\n오류/스킵 ${errlog.length}건 (상위 20):`); errlog.slice(0, 20).forEach(e => log('  ✗ ' + e)); }
  process.exit(errlog.length ? 1 : 0);
})();
