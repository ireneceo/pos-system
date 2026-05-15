#!/usr/bin/env node
/**
 * Detect English-looking values in non-English locale files.
 *
 * Heuristics:
 *   ko/zh/ms values that are ≥ 50% ASCII letters AND contain at least one
 *   English word ≥ 4 chars are flagged. Reports per-file count and top files.
 *
 * Use to prioritize i18n fix sweeps.
 *
 *   node scripts/i18n-find-english-leaks.js
 *   node scripts/i18n-find-english-leaks.js --file zh/brand.json   # show all leaks in one file
 *   node scripts/i18n-find-english-leaks.js --top 10               # top 10 worst files only
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES = path.join(ROOT, 'public/locales');

const argv = process.argv.slice(2);
const showFile = (() => {
  const i = argv.indexOf('--file');
  return i >= 0 ? argv[i + 1] : null;
})();
const topN = (() => {
  const i = argv.indexOf('--top');
  return i >= 0 ? parseInt(argv[i + 1], 10) : null;
})();

// Allow-list: brand/proper-noun terms that are English on purpose
const ALLOW = new Set([
  'POS', 'PWA', 'API', 'JWT', 'SOA', 'PO', 'QR', 'RM', 'KRW', 'USD', 'MYR', 'IDR',
  'PIN', 'URL', 'JSON', 'PDF', 'CSV', 'PNG', 'JPG', 'JPEG', 'SVG',
  'PurpleHere', 'Purple', 'Stripe', 'PayPal', 'Wise',
  'Toyyibpay', 'iPay88', 'eGHL', 'Razer', 'Senangpay',
  'KitaB', 'ComeOn', 'Loyverse', 'Square',
  'AUTO', 'OK',
  'Wi-Fi', 'WiFi',
  'KakaoPay', 'NaverPay', 'TossPay',
  'GrabPay', 'TouchnGo', 'BoostPay',
  'iOS', 'Android', 'Chrome', 'Edge', 'Safari', 'Firefox',
  'WebRTC', 'HTTP', 'HTTPS',
  'A4', 'A5', 'B4', 'B5',
  // Malaysian banks (proper nouns — keep as English in all locales)
  'Maybank', 'CIMB', 'Public', 'RHB', 'Hong', 'Leong', 'AmBank', 'OCBC', 'HSBC',
  'Standard', 'Chartered', 'Bank', 'Islam', 'Rakyat', 'BSN', 'BPMB', 'Affin', 'Alliance',
  // Korean banks
  'KB', 'Shinhan', 'Woori', 'Hana', 'NH', 'IBK', 'KEB',
  // Common product names
  'RawBT', 'QZ', 'Tray', 'WhatsApp', 'Telegram', 'Facebook', 'Instagram', 'Google',
  'Apple', 'Microsoft', 'Notion', 'Slack', 'Zoom',
  // Currency / countries kept short
  'Malaysia', 'Korea', 'Singapore', 'Indonesia', 'Thailand', 'Vietnam',
  // SI units / generic short
  'mg', 'ml', 'kg', 'cm', 'mm', 'inch'
]);

function isLikelyEnglish(value, lang) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < 3) return false;
  if (/^\d/.test(trimmed)) return false; // starts with number
  if (/^[!@#$%^&*()_+={}\[\]|\\:;"'<>,.?/~`-]+$/.test(trimmed)) return false; // punctuation only

  // Strip allow-listed tokens
  let cleaned = trimmed;
  for (const tok of ALLOW) {
    cleaned = cleaned.split(new RegExp(`\\b${tok}\\b`, 'g')).join('');
  }

  const letters = cleaned.match(/[A-Za-z]/g) || [];
  const total = cleaned.replace(/\s/g, '').length;
  if (total === 0) return false;

  // For ko/zh: any English word >=4 chars OR >=30% ASCII letters
  // For ms: language is Latin alphabet so heuristic is harder — only flag if value contains
  //   recognizable English-only words (the/and/with/your/etc) OR mixed phrases with English fragments
  if (lang === 'ms') {
    const enWords = ['the','and','with','your','this','that','for','from','have','has','been','are','was','were','will','can','should','please','click','open','close','enter','select','choose','available','create','add','new','edit','delete','remove','update','save','load','loading','search','filter','export','import','download','upload','submit','cancel','confirm','yes','no','ok'];
    const wordsInValue = trimmed.toLowerCase().match(/[a-z]+/g) || [];
    const hits = wordsInValue.filter(w => enWords.includes(w));
    return hits.length > 0;
  }

  if (lang === 'ko' || lang === 'zh') {
    const ratio = letters.length / total;
    const hasLongEnWord = /[A-Za-z]{4,}/.test(cleaned);
    return ratio >= 0.3 && hasLongEnWord;
  }
  return false;
}

const stats = {};

for (const lang of ['ko', 'zh', 'ms']) {
  const dir = path.join(LOCALES, lang);
  if (!fs.existsSync(dir)) continue;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
  for (const file of files) {
    const fp = path.join(dir, file);
    const obj = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const leaks = [];
    for (const [key, value] of Object.entries(obj)) {
      if (isLikelyEnglish(value, lang)) leaks.push({ key, value });
    }
    if (leaks.length > 0) {
      const id = `${lang}/${file}`;
      stats[id] = leaks;
    }
  }
}

if (showFile) {
  const leaks = stats[showFile];
  if (!leaks) { console.log(`No leaks in ${showFile} (or file not found).`); process.exit(0); }
  console.log(`\n=== ${showFile} (${leaks.length} suspected leaks) ===\n`);
  for (const l of leaks) console.log(`  ${l.key}\n    "${l.value}"`);
  process.exit(0);
}

const sorted = Object.entries(stats).sort((a, b) => b[1].length - a[1].length);
const display = topN ? sorted.slice(0, topN) : sorted;

console.log(`\n=== English-leak heatmap (${sorted.length} files affected) ===\n`);
for (const [file, leaks] of display) {
  console.log(`  ${leaks.length.toString().padStart(4)}  ${file}`);
}
const total = sorted.reduce((a, [, l]) => a + l.length, 0);
console.log(`\n  Total suspect leaks: ${total}`);
console.log(`  Drill into one file: node scripts/i18n-find-english-leaks.js --file <lang>/<name>.json\n`);
