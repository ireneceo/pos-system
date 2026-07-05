const { parse } = require('./parse.js');
const { stockName, cleanItem } = require('./names.js');
const fs = require('fs');
const { rows, stocks } = parse();

const sup = {};
rows.forEach(r => { (sup[r.supplier] = sup[r.supplier] || { bucket: r.bucket, n: 0 }).n++; });
const buckets = {
  BG_SOLD: Object.entries(sup).filter(([, v]) => v.bucket === 'BG_SOLD'),
  REST_ONLY: Object.entries(sup).filter(([, v]) => v.bucket === 'REST_ONLY'),
  BG_EXT: Object.entries(sup).filter(([, v]) => v.bucket === 'BG_EXT'),
};
const data = stocks.map(s => ({
  name: stockName(s),
  level: s.level,
  unit: s.unit,
  sources: s.sources.map(x => ({ sup: x.supplier, bucket: x.bucket, item: x.item, price: x.price, code: x.code })),
}));
const issues = [];
stocks.forEach(s => {
  if (s.sources.every(x => !x.price)) issues.push({ name: stockName(s), why: '가격 없음(전 소스)' });
});
// known source misalignment
data.forEach(d => { if (/포장PE봉투/.test(d.name)) d.flag = '한글칸/품명 불일치(소스 밀림?)'; });

const stats = {
  rows: rows.length, stocks: stocks.length, suppliers: Object.keys(sup).length,
  brandProducts: rows.filter(r => r.bucket === 'BG_SOLD').length,
  bgStock: stocks.filter(s => s.level === 'BG').length,
  restStock: stocks.filter(s => s.level === 'RESTAURANT').length,
  noPrice: rows.filter(r => !r.price).length,
};
fs.writeFileSync(__dirname + '/preview-data.json', JSON.stringify({ stats, buckets, data, issues }));
console.log('data →', stats);
