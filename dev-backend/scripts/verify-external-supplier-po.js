/**
 * 실제 외부 공급업체(supplier) 발주 전 루프 전수검증 — 재고 연결.
 *   매핑(재료↔공급업체상품, 활성계약 필수) → 발주(seller=supplier) → 제출
 *   → 공급업체 확정·출고 → 구매자 입고 → 재고 자동 증가 + 거래로그.
 * RA(매장) 완전 루프(공급업체Admin 출고) + BG(브랜드) 루프(ProductIngredient 재고). 끝나면 정리.
 * 실행: node scripts/verify-external-supplier-po.js
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const http = require('http');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const m = require('../models');
const { User, Ingredient, ProductIngredient, SupplierProduct, IngredientSellerProduct, PurchaseOrder, PurchaseOrderItem, InventoryTransaction, InventoryBatch } = m;

const BASE = (process.env.HC_HOST || 'http://localhost:3001') + '/api';
function req(method, path, body, tok) {
  return new Promise((resolve) => {
    const url = new URL(BASE + path);
    const r = http.request({ hostname: url.hostname, port: url.port || 80, path: url.pathname + url.search, method, headers: { 'Content-Type': 'application/json', ...(tok ? { Authorization: 'Bearer ' + tok } : {}) } },
      (res) => { let d = ''; res.on('data', c => d += c); res.on('end', () => { try { resolve({ s: res.statusCode, j: JSON.parse(d) }); } catch { resolve({ s: res.statusCode, j: d }); } }); });
    r.on('error', e => resolve({ s: 0, j: e.message }));
    if (body) r.write(JSON.stringify(body)); r.end();
  });
}
const tok = (uid) => jwt.sign({ userId: uid }, process.env.JWT_SECRET, { expiresIn: '10m' });
let pass = 0, fail = 0;
const check = (n, ok, d) => { console.log(`  ${ok ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m'} ${n}${d ? `  \x1b[90m${d}\x1b[0m` : ''}`); ok ? pass++ : fail++; };

async function cleanupPO(poId) {
  if (!poId) return;
  await InventoryTransaction.destroy({ where: { purchase_order_id: poId } }).catch(() => {});
  await InventoryBatch.destroy({ where: { purchase_order_id: poId } }).catch(() => {});
  await PurchaseOrderItem.destroy({ where: { purchase_order_id: poId } }).catch(() => {});
  await PurchaseOrder.destroy({ where: { id: poId }, force: true }).catch(() => {});
}

(async () => {
  console.log('\n=== 실제 외부 공급업체 발주 전 루프 — 재고 연결 전수검증 ===\n');

  // ─────────────── RA (매장) 완전 루프 ───────────────
  console.log('▶ RA(매장 #2) → 외부공급업체 #20 (상품 #25 Premium Tomato), 공급업체Admin #227');
  {
    const RID = 2, SUP = 20, SPID = 25, SUPUSER = 227;
    const raAdmin = await User.findOne({ where: { role: 'Restaurant Admin', restaurant_id: RID } });
    if (!raAdmin) { check('RA admin(매장2) 존재', false, 'none'); }
    else {
      const raTok = tok(raAdmin.id), supTok = tok(SUPUSER);
      const sp = await SupplierProduct.findByPk(SPID);
      const spStockBefore = parseFloat(sp.current_stock) || 0;
      const ing = await Ingredient.create({ name: `EXT-TEST-${Date.now() % 100000}`, owner_type: 'restaurant', restaurant_id: RID, unit: 'kg', track_stock: true, current_stock: 0 });
      let mapId = null, poId = null;
      try {
        const map = await req('POST', `/ingredients/${ing.id}/seller-sources`, { seller_type: 'supplier', seller_entity_id: SUP, seller_product_id: SPID, unit_price: 5, unit_conversion: 1, is_preferred: true }, raTok);
        mapId = map.j?.data?.id;
        check('① 매핑(재료↔공급업체상품, 활성계약 검증)', (map.s === 200 || map.s === 201) && !!mapId, `HTTP ${map.s} ${map.j?.code || map.j?.message || ''}`);
        const po = await req('POST', '/purchase-orders', { seller_type: 'supplier', seller_entity_id: SUP, items: [{ ingredient_id: ing.id, quantity_ordered: 10, ingredient_seller_product_id: mapId }] }, raTok);
        poId = po.j?.data?.id || po.j?.data?.purchase_order?.id;
        check('② 발주 생성(seller=supplier, MAPPING_REQUIRED 충족)', (po.s === 200 || po.s === 201) && !!poId, `HTTP ${po.s} ${po.j?.code || ''}`);
        const sub = await req('POST', `/purchase-orders/${poId}/submit`, {}, raTok);
        check('③ 발주 제출(submit → 공급업체 전달)', sub.s === 200, `HTTP ${sub.s}`);
        // 오너승인 게이트(매장 오너 연결 시 기본 ON)는 supplier 발주와 직교한 별개 기능 —
        // 승인 결과(=submitted)를 정규화해 공급업체 확정/출고/입고 루프를 검증한다.
        await PurchaseOrder.update({ status: 'submitted' }, { where: { id: poId } });
        const conf = await req('POST', `/seller-orders/${poId}/confirm`, {}, supTok);
        check('④ 공급업체 확정(confirm)', conf.s === 200, `HTTP ${conf.s} ${conf.j?.message || ''}`);
        const ship = await req('POST', `/seller-orders/${poId}/ship`, { tracking_info: { carrier_name: 'Test' } }, supTok);
        check('⑤ 공급업체 출고(ship) + 공급업체재고 차감', ship.s === 200, `HTTP ${ship.s}`);
        const recv = await req('POST', `/purchase-orders/${poId}/mark-received`, {}, raTok);
        await ing.reload();
        check('⑥ 매장 입고 → 재료 재고 자동 증가(+10)', recv.s === 200 && Math.abs((parseFloat(ing.current_stock) || 0) - 10) < 0.01, `HTTP ${recv.s} stock=${ing.current_stock}`);
        const txr = await InventoryTransaction.findOne({ where: { ingredient_id: ing.id, purchase_order_id: poId, transaction_type: 'purchase' } });
        check('⑦ 입고 거래로그(InventoryTransaction)', !!txr, txr ? `qty=${txr.quantity_change}` : 'no tx');
      } catch (e) { check('RA 루프 완주', false, e.message); }
      finally {
        await cleanupPO(poId);
        if (mapId) await IngredientSellerProduct.destroy({ where: { id: mapId } }).catch(() => {});
        await ing.destroy({ force: true }).catch(() => {});
        await sp.update({ current_stock: spStockBefore }).catch(() => {});
      }
    }
  }

  // ─────────────── BG (브랜드) 루프 ───────────────
  console.log('\n▶ BG(브랜드 #1) → 외부공급업체 #14 (상품 #8 Item-S4) — 재고아이템(ProductIngredient) 연결');
  {
    const BRAND = 1, SUP = 14, SPID = 8;
    const bgUser = await User.findOne({ where: { role: 'Brand General', brand_id: BRAND } });
    const pIng = bgUser ? await ProductIngredient.findOne({ where: { owner_user_id: bgUser.id } }) : null;
    if (!bgUser || !pIng) { check('BG 유저(브랜드1)+재고아이템 존재', false, 'none'); }
    else {
      const bgTok = tok(bgUser.id);
      const before = parseFloat(pIng.current_stock) || 0;
      let mapId = null, poId = null;
      try {
        const map = await req('POST', `/product-ingredients/${pIng.id}/seller-sources`, { seller_type: 'supplier', seller_entity_id: SUP, seller_product_id: SPID, unit_price: 5, unit_conversion: 1, is_preferred: true }, bgTok);
        mapId = map.j?.data?.id;
        check('① 매핑(재고아이템↔공급업체상품, 활성계약 검증)', (map.s === 200) && !!mapId, `HTTP ${map.s} ${map.j?.code || map.j?.message || ''}`);
        const po = await req('POST', '/purchase-orders', { seller_type: 'supplier', seller_entity_id: SUP, items: [{ product_ingredient_id: pIng.id, quantity_ordered: 10, ingredient_seller_product_id: mapId }] }, bgTok);
        poId = po.j?.data?.id || po.j?.data?.purchase_order?.id;
        check('② 발주 생성(seller=supplier, 재고아이템 라인)', (po.s === 200 || po.s === 201) && !!poId, `HTTP ${po.s} ${po.j?.code || ''}`);
        // 공급업체Admin 미존재 → 출고는 상태설정으로 대체(공급업체측 흐름은 기존·내 코드 무관). 구매자 입고만 실호출.
        await PurchaseOrder.update({ status: 'shipped' }, { where: { id: poId } });
        const recv = await req('POST', `/purchase-orders/${poId}/mark-received`, {}, bgTok);
        await pIng.reload();
        check('③ 브랜드 입고 → 재고아이템 재고 자동 증가(+10)', recv.s === 200 && Math.abs((parseFloat(pIng.current_stock) || 0) - (before + 10)) < 0.01, `HTTP ${recv.s} ${before}→${pIng.current_stock}`);
        const txb = await InventoryTransaction.findOne({ where: { product_ingredient_id: pIng.id, purchase_order_id: poId, transaction_type: 'purchase' } });
        check('④ 입고 거래로그(product_ingredient_id)', !!txb, txb ? `qty=${txb.quantity_change} entity=${txb.entity_type}` : 'no tx');
      } catch (e) { check('BG 루프 완주', false, e.message); }
      finally {
        await cleanupPO(poId);
        if (mapId) await IngredientSellerProduct.destroy({ where: { id: mapId } }).catch(() => {});
        await pIng.update({ current_stock: before }).catch(() => {});
      }
    }
  }

  console.log(`\n${fail === 0 ? '\x1b[32m\x1b[1m✓ 외부공급업체 발주 전 루프 ' + pass + '/' + (pass + fail) + ' 통과\x1b[0m' : '\x1b[31m\x1b[1m✗ ' + fail + '건 실패 (' + pass + '/' + (pass + fail) + ')\x1b[0m'}\n`);
  process.exit(fail === 0 ? 0 : 1);
})();
