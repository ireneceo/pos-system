/**
 * withmin-import/parse.js — Stage 1: parse + normalize + bucket + dedup the raw supply TSV.
 * Pure analysis, NO writes. Produces the structured plan the importer will act on.
 *
 * Buckets (Irene 2026-07-05):
 *   BG_SOLD   = UGS, Tourmanium → GITconsulting BrandProducts (판매품목, owner-shared)
 *   REST_ONLY = KK Mart, Village Grocer, Direct, Shopee, Seven Eleven, Mak'Cik,
 *               Guardian, Semi mill, Cellar Eighteen → external suppliers on with MIN (RA) only
 *   BG_EXT    = everything else → external suppliers registered at BG (brand) level, shared
 *
 * Stock item = 1 per unique Korean name (or English Item when no Korean). Cross-bucket dupes
 * consolidate into ONE BG stock item (Irene decision), so a stock item touched by any BG-bucket
 * source is BG-level; only items sold EXCLUSIVELY by REST_ONLY suppliers are restaurant-level.
 */
const fs = require('fs');
const path = require('path');

const TSV = path.join(__dirname, '..', 'data', 'withmin-supply-import.tsv');

const REST_ONLY = ['KK Mart', 'Village Grocer', 'Direct', 'Shopee', 'Seven Eleven',
  "Mak'Cik", 'Guardian', 'Semi mill', 'Cellar Eighteen'];

function canonSupplier(s) {
  let n = (s || '').replace(/\s+/g, ' ').replace(/\.+$/, '').trim();
  if (/^bila\s*bila/i.test(n)) return 'Bila Bila Mart';
  if (/^indus grocer/i.test(n)) return 'Indus Grocers';
  if (/^the paper clip/i.test(n)) return 'The Paper Clip & Co';
  if (/^guan kee/i.test(n)) return 'Guan Kee Poultry';
  if (/^nsk/i.test(n)) return 'NSK';
  if (/^lee'?s fandbee/i.test(n)) return "Lee's Fandbee Frozen";
  if (/^de green/i.test(n)) return 'De Green Wholesale Enterprise';
  if (/^de lettuce/i.test(n)) return 'De Lettuce Bear';
  return n;
}

function bucketOf(canonSup) {
  // UGS·Tourmanium은 BG가 '사오는' 외부 공급업체(매입)다. 초기 임포트가 이들을 BG_SOLD(BG가
  // 파는 판매품목)로 오분류해 59개 잘못된 BrandProduct + self-brand 매핑을 만들었다.
  // (Fable 구조검토 2026-07-05) → BG_EXT(외부 공급업체 매입)로 정정.
  if (REST_ONLY.some(r => r.toLowerCase() === canonSup.toLowerCase())) return 'REST_ONLY';
  return 'BG_EXT';
}

// Parse "Standard Unit" cell like "1kg", "835ml", "1pkt/24can", "10ea/box", "500g/pkt"
// → { qtyText, unitEnum } where unitEnum ∈ kg|g|L|ml|piece|pack|can|bottle
const UNIT_ENUM = ['kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle'];
function parseUnit(std) {
  const s = (std || '').toLowerCase();
  if (!s) return 'piece';
  if (/\bkg\b/.test(s)) return 'kg';
  if (/\bg\b|gram|gr\b/.test(s)) return 'g';
  if (/\bml\b/.test(s)) return 'ml';
  if (/\b(l|litre|liter)\b/.test(s)) return 'L';
  if (/can\b/.test(s)) return 'can';
  if (/btl|bottle/.test(s)) return 'bottle';
  if (/pkt|pack|pcs|box|ctn|tub|tin|drum|roll|bundle|tray|set|pc\b|ea\b|pc\/|매/.test(s)) return 'pack';
  return 'piece';
}

function parsePrice(p) {
  const n = parseFloat(String(p || '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function parse() {
  const raw = fs.readFileSync(TSV, 'utf8').split('\n').slice(1).filter(l => l.trim());
  const rows = [];
  for (const line of raw) {
    const c = line.split('\t');
    const ko = (c[0] || '').trim();
    const item = (c[1] || '').trim();
    const code = (c[2] || '').trim();
    const supRaw = (c[3] || '').trim();
    const std = (c[6] || '').trim();
    const price = (c[7] || '').trim();
    if (!supRaw && /delivery fee/i.test(item)) continue; // Grab delivery fee — not a supply row
    if (!item && !ko) continue;
    const supplier = canonSupplier(supRaw);
    if (!supplier) continue;
    rows.push({
      ko, item, code, supplier, bucket: bucketOf(supplier),
      unit: parseUnit(std), price: parsePrice(price), stdUnitText: std,
    });
  }

  // Dedup stock items by Korean name (fallback English item). Consolidate bucket:
  // any BG-bucket source ⇒ BG-level stock; else restaurant-level.
  const stockByKey = new Map();
  for (const r of rows) {
    const key = r.ko || `EN::${r.item}`;
    let st = stockByKey.get(key);
    if (!st) {
      st = { key, ko: r.ko, sources: [], level: null };
      stockByKey.set(key, st);
    }
    st.sources.push(r);
  }
  for (const st of stockByKey.values()) {
    const hasBG = st.sources.some(s => s.bucket === 'BG_SOLD' || s.bucket === 'BG_EXT');
    st.level = hasBG ? 'BG' : 'RESTAURANT';
    st.unit = st.sources[0].unit;
  }

  return { rows, stocks: [...stockByKey.values()] };
}

if (require.main === module) {
  const { rows, stocks } = parse();
  const supSet = {};
  rows.forEach(r => { (supSet[r.supplier] = supSet[r.supplier] || { bucket: r.bucket, n: 0 }).n++; });
  console.log('행:', rows.length, '| 재고(dedup):', stocks.length, '| 공급업체:', Object.keys(supSet).length);
  const byBucket = { BG_SOLD: 0, REST_ONLY: 0, BG_EXT: 0 };
  Object.values(supSet).forEach(s => byBucket[s.bucket]++);
  console.log('공급업체 버킷 수:', JSON.stringify(byBucket));
  const stockLvl = { BG: 0, RESTAURANT: 0 };
  stocks.forEach(s => stockLvl[s.level]++);
  console.log('재고 레벨:', JSON.stringify(stockLvl));
  const multi = stocks.filter(s => new Set(s.sources.map(x => x.supplier)).size > 1);
  console.log('멀티-공급업체 재고:', multi.length);
  console.log('\n공급업체별(버킷):');
  Object.entries(supSet).sort((a, b) => b[1].n - a[1].n).forEach(([s, v]) => console.log(`  ${String(v.n).padStart(3)} [${v.bucket}] ${s}`));
  module.exports = { parse };
}
module.exports = { parse, canonSupplier, bucketOf, parseUnit, parsePrice };
