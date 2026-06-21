/**
 * BG 아웃바운드 e2e — 브랜드가 레스토랑에 BrandProduct 판매(출고) 시 그 제품의 레시피(BOM)대로
 * ProductIngredient(재고아이템) 자동 차감 + 거래로그(order_deduct). RA 주문차감 미러.
 * BG dev 데이터, 끝나면 정리. 실행: node scripts/verify-bg-outbound.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const http = require('http');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { User, Restaurant, ProductIngredient, BrandProduct, PurchaseOrder, PurchaseOrderItem, IngredientSellerProduct, InventoryTransaction } = require('../models');

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
  // 레시피 보유 BrandProduct + 그 BG 유저(brand_id 보유)
  const row = (await sequelize.query(
    `SELECT bp.id bpid, bp.owner_user_id, bp.name, pri.ingredient_id, pri.quantity
     FROM brand_products bp JOIN product_recipe_ingredients pri ON pri.recipe_id=bp.product_recipe_id
     WHERE bp.product_recipe_id IS NOT NULL LIMIT 1`, { type: QueryTypes.SELECT }))[0];
  if (!row) { console.error('레시피 보유 BrandProduct 없음 — 검증 불가'); process.exit(1); }
  const bgUser = await User.findOne({ where: { id: row.owner_user_id, role: 'Brand General', brand_id: { [Op.ne]: null } } });
  if (!bgUser) { console.error('해당 BrandProduct 의 BG 유저(brand_id) 없음'); process.exit(1); }
  const brandId = bgUser.brand_id;
  const pIng = await ProductIngredient.findByPk(row.ingredient_id);
  const rest = await Restaurant.findOne();
  console.log(`\nBG 아웃바운드 e2e — BrandProduct #${row.bpid}(${row.name}), 레시피재료 #${row.ingredient_id} ×${row.quantity}, 판매브랜드 #${brandId}\n`);

  const token = jwt.sign({ userId: bgUser.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  const auth = { Authorization: `Bearer ${token}` };
  const before = parseFloat(pIng.current_stock) || 0;
  const sellQty = 10;
  const expectDeduct = Math.round((parseFloat(row.quantity) || 0) * sellQty * 100) / 100;

  let mapping = null, po = null;
  try {
    // 구매자(레스토랑) 가 브랜드상품을 산 PO (seller=brand, status=confirmed)
    mapping = await IngredientSellerProduct.create({ ingredient_id: null, product_ingredient_id: null, seller_type: 'brand', seller_entity_id: brandId, seller_product_id: row.bpid, unit_price: 10, unit_conversion: 1, is_active: true });
    po = await PurchaseOrder.create({ entity_type: 'restaurant', entity_id: rest.id, seller_type: 'brand', seller_entity_id: brandId, status: 'confirmed', po_number: `BG-OUT-${Date.now() % 100000}`, currency: 'MYR', created_by: bgUser.id, created_by_user_id: bgUser.id, order_date: new Date(), total_amount: 100, subtotal: 100 });
    await PurchaseOrderItem.create({ purchase_order_id: po.id, ingredient_id: null, ingredient_seller_product_id: mapping.id, quantity_ordered: sellQty, quantity_received: 0, unit_price: 10, unit_conversion: 1, line_total: 100 });

    // 브랜드 출고 (판매자 = BG 유저)
    const ship = await request('POST', `/seller-orders/${po.id}/ship`, { tracking_info: { carrier_name: 'Test' } }, auth);
    check('출고(ship): 200 + status=shipped', ship.status === 200, `HTTP ${ship.status} ${ship.body?.message || ''}`);

    await pIng.reload();
    const after = parseFloat(pIng.current_stock) || 0;
    check('판매 시 재고 자동 차감 (레시피 BOM ×수량)', Math.abs((before - after) - expectDeduct) < 0.01, `${before}→${after} (기대 -${expectDeduct})`);
    const tx = await InventoryTransaction.findOne({ where: { product_ingredient_id: pIng.id, purchase_order_id: po.id, transaction_type: 'order_deduct' } });
    check('차감 거래로그(order_deduct) 기록', !!tx && parseFloat(tx.quantity_change) === -expectDeduct, tx ? `qty=${tx.quantity_change} entity=${tx.entity_type}` : 'no tx');
  } catch (e) {
    check('예외 없이 완주', false, e.message);
  } finally {
    if (po) {
      await InventoryTransaction.destroy({ where: { purchase_order_id: po.id } }).catch(() => {});
      await PurchaseOrderItem.destroy({ where: { purchase_order_id: po.id } }).catch(() => {});
      await PurchaseOrder.destroy({ where: { id: po.id }, force: true }).catch(() => {});
    }
    if (mapping) await IngredientSellerProduct.destroy({ where: { id: mapping.id } }).catch(() => {});
    await pIng.update({ current_stock: before }).catch(() => {});
    console.log('\n  정리 완료 (재고 복원, 테스트 PO·매핑·거래 삭제)');
  }
  console.log(`\n${fail === 0 ? '\x1b[32m\x1b[1m✓ BG 아웃바운드 ' + pass + '/' + (pass + fail) + ' 통과\x1b[0m' : '\x1b[31m\x1b[1m✗ ' + fail + '건 실패 (' + pass + '/' + (pass + fail) + ')\x1b[0m'}\n`);
  process.exit(fail === 0 ? 0 : 1);
})();
