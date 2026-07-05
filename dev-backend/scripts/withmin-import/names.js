/**
 * names.js — derive a clean English stock-item name from the supplier "Item" text,
 * then append the Korean: "English (한글)". Heuristic cleaner + hand overrides.
 * Irene reviews the dry-run preview and adds overrides for any awkward result.
 */

// Hand overrides keyed by the stock key (Korean name, or "EN::<item>" when no Korean).
// Add entries here after reviewing the preview.
const OVERRIDES = {
  '소고기 (불고기용)': 'Sliced Beef for Bulgogi',
  '커피원두 하우스커피/모닝펀치': 'House Coffee Beans (Morning Punch)',
  '고추장_해찬들태양초알찬17kg': 'Gochujang (Korean Chili Paste)',
  'CJ해찬들 재래식된장 14kg': 'Doenjang (Korean Soybean Paste)',
  '진미짜장소스5kg': 'Jjajang Sauce',
  '오쉐프순후추450g': 'Ground White Pepper (O\'Chef)',
  '면사랑 멸치밑국물육수1.8L': 'Anchovy Soup Stock',
  '라이터': 'Lighter',              // Item mislabeled as mayonnaise in source
};

// Tokens/patterns to strip from the raw Item to get a clean stock name.
function cleanItem(item) {
  let s = String(item || '').trim();
  // drop CJK (Chinese/Japanese) descriptive text
  s = s.replace(/[㐀-鿿豈-﫿぀-ヿ]+/g, ' ');
  // drop trailing supplier code like 1022-005 / 2007-018
  s = s.replace(/\b\d{3,4}-\d{2,3}\b/g, ' ');
  // drop bracketed pack specs (50PCS X 12PKTS) / dimensions
  s = s.replace(/\((?:[^()]*?(?:PCS|PKTS|PKT|CTN|X\s*\d|mm|CC|ML|OZ|GRAM|BOXES|ROLLS|SETS)[^()]*?)\)/gi, ' ');
  // drop trailing " - 5kg" / " 1.5kg" / " 500g" size tails
  s = s.replace(/\s[-_]?\s*\d+(?:\.\d+)?\s?(?:kg|g|l|ml|litre|liter|oz|cc|pcs?|pkt|ctn|btl|tin|tub|can|box)\b/gi, ' ');
  // brand tail after underscore: "Real Mayonnaise_Lady's Choice 3L" -> keep before _
  s = s.replace(/_+[^_]*$/, '');
  // collapse punctuation/space noise
  s = s.replace(/\s{2,}/g, ' ').replace(/\s*\/\s*/g, ' / ').replace(/^[\s\-\/]+|[\s\-\/]+$/g, '').trim();
  // title-case ALL-CAPS words (leave mixed case as-is)
  s = s.split(' ').map(w => (/^[A-Z0-9'./%-]+$/.test(w) && w.length > 2 && !/^\d/.test(w))
    ? w[0] + w.slice(1).toLowerCase() : w).join(' ');
  return s || String(item || '').trim();
}

const hasHangul = (s) => /[가-힣ㄱ-ㅎㅏ-ㅣ]/.test(s || '');

function stockName(stock) {
  const ko = (stock.ko || '').trim();
  const base = OVERRIDES[stock.key] || cleanItem(stock.sources[0].item);
  // Append the Korean only when it is actually Korean text and adds information
  // (the source sometimes puts English in the Korean column).
  if (ko && hasHangul(ko) && ko.toLowerCase() !== base.toLowerCase()) return `${base} (${ko})`;
  return base;
}

// A row is suspicious when the Korean name has Hangul but shares no token with the English
// Item — usually a shifted/misaligned source row. Surfaced in the preview for Irene.
function looksMisaligned(stock) {
  const ko = stock.ko || '';
  if (!hasHangul(ko)) return false;
  const item = (stock.sources[0].item || '').toLowerCase();
  // packaging Korean vs food English, or vice versa — cheap heuristic: none for now,
  // flagged manually. Placeholder kept for the importer to attach warnings.
  return false;
}

module.exports = { stockName, cleanItem, OVERRIDES };
