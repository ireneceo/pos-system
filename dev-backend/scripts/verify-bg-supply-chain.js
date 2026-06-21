/**
 * BG 제품체인 신규 연결 e2e — 재고아이템↔공급업체상품 매핑 → 발주 → 입고 → 재고 자동증가.
 * BG 실데이터(데모/개발) 사용, 끝나면 전량 정리. 운영 무관(BG dev). 실행: node scripts/verify-bg-supply-chain.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const http = require('http');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User, Brand, ProductIngredient, PurchaseOrder, PurchaseOrderItem, IngredientSellerProduct, InventoryTransaction } = require('../models');

const BASE = (process.env.HC_HOST || 'http://localhost:3001') + '/api';
function request(method, path, body, headers = {}) {
  return new Promise((resolve) => {
    const url = new URL(BASE + path);
    const req = http.request({ hostname: url.hostname, port: url.port || 80, path: url.pathname + url.search, method, headers: { 'Content-Type': 'application/json', ...headers } },
      (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(d) }); } catch { resolve({ status: res.statusCode, body: d }); } }); });
    req.on('error', e => resolve({ status: 0, body: e.message }));
    if (body) req.write(JSON.stringify(body)); req.end();
  });
}
let pass = 0, fail = 0;
const check = (n, ok, d) => { console.log(`  ${ok ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m'} ${n}${d ? `  \x1b[90m${d}\x1b[0m` : ''}`); ok ? pass++ : fail++; };

(async () => {
  // BG 유저(brand_id 보유) + 본인 소유 ProductIngredient
  const bgUsers = await User.findAll({ where: { role: 'Brand General', brand_id: { [Op.ne]: null } }, attributes: ['id', 'brand_id'] });
  let bg = null, pIng = null;
  for (const u of bgUsers) {
    const pi = await ProductIngredient.findOne({ where: { owner_user_id: u.id } });
    if (pi) { bg = u; pIng = pi; break; }
  }
  if (!bg) { console.error('brand_id 있는 BG 유저 + ProductIngredient 없음 — 검증 불가'); process.exit(1); }
  const brand = await Brand.findByPk(bg.brand_id);
  console.log(`\nBG 공급망 e2e — 유저 #${bg.id}, 브랜드 #${brand.id} (${brand.name}), 재고아이템 #${pIng.id} (${pIng.name})\n`);

  const token = jwt.sign({ userId: bg.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  const auth = { Authorization: `Bearer ${token}` };

  // 브랜드 통화 보장(없으면 임시 MYR, 끝에 복원)
  const origCurrency = brand.currency;
  if (!origCurrency) await brand.update({ currency: 'MYR' });

  const origStock = parseFloat(pIng.current_stock) || 0;
  let mappingId = null, poId = null;

  try {
    // ── 1) 재고아이템 ↔ 공급업체상품 매핑 (system_admin: 계약 불필요) ──
    const mapRes = await request('POST', `/product-ingredients/${pIng.id}/seller-sources`,
      { seller_type: 'system_admin', seller_product_id: 999001, unit_price: 5.0, unit_conversion: 1, is_preferred: true }, auth);
    mappingId = mapRes.body?.data?.id;
    check('매핑 생성: 재고아이템↔공급업체상품', mapRes.status === 200 && !!mappingId, `HTTP ${mapRes.status} id=${mappingId}`);
    const listRes = await request('GET', `/product-ingredients/${pIng.id}/seller-sources`, null, auth);
    check('매핑 조회: 목록에 존재', listRes.status === 200 && (listRes.body?.data || []).some(m => m.id === mappingId), `HTTP ${listRes.status} n=${(listRes.body?.data||[]).length}`);

    // ── 2) 발주 생성 (재고아이템 라인) ──
    const poRes = await request('POST', '/purchase-orders',
      { seller_type: 'system_admin', items: [{ product_ingredient_id: pIng.id, quantity_ordered: 10, ingredient_seller_product_id: mappingId, unit_price: 5.0, unit_conversion: 1 }] }, auth);
    poId = poRes.body?.data?.id || poRes.body?.data?.purchase_order?.id;
    check('발주 생성: 재고아이템으로 PO 생성', (poRes.status === 200 || poRes.status === 201) && !!poId, `HTTP ${poRes.status} po=${poId} ${poRes.body?.message || poRes.body?.code || ''}`);
    const poItem = poId ? await PurchaseOrderItem.findOne({ where: { purchase_order_id: poId } }) : null;
    check('발주 라인: product_ingredient_id 기록 + ingredient_id null', !!poItem && poItem.product_ingredient_id === pIng.id && poItem.ingredient_id == null, poItem ? `pi=${poItem.product_ingredient_id} ing=${poItem.ingredient_id}` : 'no item');

    // ── 3) 입고 → 재고 자동 증가 + 거래로그 ──
    if (poId) {
      await PurchaseOrder.update({ status: 'submitted' }, { where: { id: poId } }); // 수령 가능 상태로
      const recv = await request('POST', `/purchase-orders/${poId}/mark-received`, {}, auth);
      await pIng.reload();
      const newStock = parseFloat(pIng.current_stock) || 0;
      check('입고: ProductIngredient 재고 자동 증가(+10)', (recv.status === 200) && Math.abs(newStock - (origStock + 10)) < 0.01, `HTTP ${recv.status} ${origStock}→${newStock}`);
      const tx = await InventoryTransaction.findOne({ where: { product_ingredient_id: pIng.id, purchase_order_id: poId } });
      check('입고: 거래로그(InventoryTransaction) 기록', !!tx && parseFloat(tx.quantity_change) === 10, tx ? `qty=${tx.quantity_change} entity=${tx.entity_type}` : 'no tx');
    }
  } catch (e) {
    check('예외 없이 완주', false, e.message);
  } finally {
    // 정리: 거래로그→발주라인→발주, 매핑, 재고/통화 복원
    if (poId) {
      await InventoryTransaction.destroy({ where: { purchase_order_id: poId } }).catch(() => {});
      await PurchaseOrderItem.destroy({ where: { purchase_order_id: poId } }).catch(() => {});
      await PurchaseOrder.destroy({ where: { id: poId }, force: true }).catch(() => {});
    }
    if (mappingId) await IngredientSellerProduct.destroy({ where: { id: mappingId } }).catch(() => {});
    await pIng.update({ current_stock: origStock }).catch(() => {});
    if (!origCurrency) await brand.update({ currency: null }).catch(() => {});
    console.log('\n  정리 완료 (재고/통화 복원, 테스트 PO·매핑·거래 삭제)');
  }

  console.log(`\n${fail === 0 ? '\x1b[32m\x1b[1m✓ BG 공급망 ' + pass + '/' + (pass + fail) + ' 통과\x1b[0m' : '\x1b[31m\x1b[1m✗ ' + fail + '건 실패 (' + pass + '/' + (pass + fail) + ')\x1b[0m'}\n`);
  process.exit(fail === 0 ? 0 : 1);
})();
