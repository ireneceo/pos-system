/**
 * make-sellable-products.js — UGS/Tourmanium 재고아이템을 '판매품목(BrandProduct)'으로 만들고
 * 재고에 다이렉트 연결(단일재료 auto-recipe)한다. BG는 이들을 매입(supplier)도 하고 판매(BrandProduct)도 하므로,
 * 판매품목 → 재고(자기가 매입한 스톡) 다이렉트 연결이 레스토랑 모델과 동형인 정답. (Fable 2026-07-05)
 *
 *   node scripts/withmin-import/make-sellable-products.js --port 3002 --bg 23 --suppliers 34,35 [--commit]
 *
 * 멱등: 같은 이름 BrandProduct 있으면 스킵. directIngredients=[{ingredient_id: PI, quantity:1}].
 */
require('dotenv/config');
const http = require('http');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../../config/database');

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i > -1 ? process.argv[i + 1] : d; };
const PORT = parseInt(arg('port', '3002'), 10);
const BG = parseInt(arg('bg', '23'), 10);
const SUP_IDS = (arg('suppliers', '') || '').split(',').map(s => parseInt(s, 10)).filter(Boolean);
const COMMIT = process.argv.includes('--commit');
const bgTok = jwt.sign({ userId: BG }, process.env.JWT_SECRET, { expiresIn: '2h' });

function req(method, path, body) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const r = http.request({ host: 'localhost', port: PORT, path: '/api' + path, method,
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + bgTok, ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {}) } },
      res => { let b = ''; res.on('data', c => b += c); res.on('end', () => { let j; try { j = JSON.parse(b); } catch { j = b; } resolve({ status: res.statusCode, body: j }); }); });
    r.on('error', e => resolve({ status: 0, body: String(e.message) })); if (data) r.write(data); r.end();
  });
}

(async () => {
  const q = async (s, r) => (await sequelize.query(s, r ? { replacements: r } : undefined))[0];
  // UGS/Tourmanium 공급업체에서 매입하는 BG 스톡 = 판매품목화 대상
  const stocks = await q(`
    SELECT DISTINCT pi.id, pi.name, pi.unit, pi.unit_cost
    FROM product_ingredients pi
    JOIN ingredient_seller_products isp ON isp.product_ingredient_id = pi.id AND isp.seller_type='supplier'
    WHERE pi.owner_user_id = ? AND isp.seller_entity_id IN (${SUP_IDS.join(',') || '0'})
    ORDER BY pi.name`, [BG]);
  console.log(`대상 재고(UGS/Tourmanium 매입): ${stocks.length}개`);

  // 기존 BrandProduct 이름 세트 (멱등)
  const existing = new Set((await q(`SELECT name FROM brand_products WHERE owner_user_id=?`, [BG])).map(r => String(r.name).toLowerCase().trim()));

  let created = 0, skipped = 0, err = 0;
  for (const st of stocks) {
    if (existing.has(String(st.name).toLowerCase().trim())) { skipped++; continue; }
    if (!COMMIT) { created++; continue; }
    const r = await req('POST', '/brand-products', {
      name: st.name, unit: st.unit || 'piece', unit_price: parseFloat(st.unit_cost) || 0,
      base_quantity: 1, distribution_mode: 'all',
      directIngredients: [{ ingredient_id: st.id, quantity: 1, unit: st.unit || 'piece' }],
    });
    if (r.status >= 400 || !(r.body?.data?.id || r.body?.data?.product?.id)) { console.log('  fail', st.name, r.status, JSON.stringify(r.body).slice(0, 100)); err++; }
    else created++;
  }
  console.log(`\n판매품목 생성 ${COMMIT ? '' : '(DRY)'}: ${created} · 스킵(기존) ${skipped} · 오류 ${err}`);
  process.exit(err ? 1 : 0);
})().catch(e => { console.error('ERR', e.message); process.exit(2); });
