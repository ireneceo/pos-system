/**
 * 브랜드 재고 공유 — 합격조건 6개 실호출 검증 (dev 전용, 데모 매장 38 / 브랜드 17)
 * docs/BRAND_STOCK_SHARING_DESIGN.md §⑥
 */
require('dotenv').config({ quiet: true });
const BASE = 'http://localhost:3001';
const { Ingredient, RestaurantIngredientStock, RestaurantIngredientCost, IngredientSellerProduct,
        PurchaseOrder, PurchaseOrderItem, Recipe, RecipeIngredient, ProductIngredient, SupplierProduct,
        SupplierCompany, SupplierContract } = require('./models');

const RID = 38;           // 데모 매장 (brand 17)
const SIB = 158;          // 형제 매장 (같은 brand 17)
const BRAND = 17;
const BRAND_ING = 119;    // Coffee (brand 17 소유)
const OTHER_BRAND_ING = 2; // brand 1 소유 → 매장 38 은 접근 불가여야
let pass = 0, fail = 0;
const ok = (n, c, extra = '') => { c ? (pass++, console.log(`  ✓ ${n}${extra ? ' — ' + extra : ''}`)) : (fail++, console.log(`  ✗ ${n}${extra ? ' — ' + extra : ''}`)); };

const login = async (key) => {
  const r = await fetch(`${BASE}/api/auth/demo-login`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key })
  });
  const j = await r.json();
  return j.token || j.data?.token;
};
const api = (tok) => async (path, opts = {}) => {
  const r = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tok}`, ...(opts.headers || {}) }
  });
  let body = null; try { body = await r.json(); } catch {}
  return { status: r.status, body };
};

(async () => {
  const raTok = await login('demo_restaurant_admin');
  const bgTok = await login('demo_brand_general');
  if (!raTok || !bgTok) { console.log('로그인 실패 — RA', !!raTok, 'BG', !!bgTok); process.exit(1); }
  const RA = api(raTok), BG = api(bgTok);

  // 기준선 스냅샷 (T6 무접촉 증명용)
  const beforePI = await ProductIngredient.count();
  const beforePIMap = await IngredientSellerProduct.count({ where: { product_ingredient_id: { [require('sequelize').Op.ne]: null } } });
  const brandRecipeRefs = await RecipeIngredient.count();
  const brandIngRow0 = await Ingredient.findByPk(BRAND_ING);
  const brandStockBefore = parseFloat(brandIngRow0.current_stock) || 0;

  console.log('\n=== T1. 매장이 브랜드 재료를 읽기전용으로 본다 ===');
  const bi = await RA(`/api/restaurants/${RID}/brand-ingredients?include=sellers`);
  const items = bi.body?.data || [];
  ok('브랜드 재료 조회', bi.status === 200 && items.length > 0, `${items.length}건`);
  ok('is_brand_shared/read_only 표식', items.every(i => i.is_brand_shared && i.read_only));
  ok('sellerSources 포함(include=sellers)', items.every(i => Array.isArray(i.sellerSources)));
  const put = await RA(`/api/restaurants/${RID}/ingredients/${BRAND_ING}`, { method: 'PUT', body: JSON.stringify({ name: 'HACK' }) });
  ok('매장이 브랜드 재료 수정 → 4xx', put.status >= 400 && put.status < 500, `status ${put.status}`);
  const settings = await RA(`/api/restaurants/${RID}/inventory/${BRAND_ING}/settings`, { method: 'PUT', body: JSON.stringify({ min_stock: 999 }) });
  ok('매장이 브랜드 재료 설정(PAR) 변경 → 403', settings.status === 403, `status ${settings.status}`);
  const sib = await RA(`/api/restaurants/${RID}/inventory/${OTHER_BRAND_ING}/settings`, { method: 'PUT', body: JSON.stringify({ min_stock: 999 }) });
  ok('남의 브랜드 재료 설정 변경 → 404 (IDOR 차단)', sib.status === 404, `status ${sib.status}`);

  const del = await RA(`/api/restaurants/${RID}/ingredients/${BRAND_ING}`, { method: 'DELETE' });
  ok('매장이 브랜드 재료 삭제 → 403', del.status === 403, `status ${del.status}`);
  const delOther = await RA(`/api/restaurants/${RID}/ingredients/${OTHER_BRAND_ING}`, { method: 'DELETE' });
  ok('남의 브랜드 재료 삭제 → 404 (IDOR 차단)', delOther.status === 404, `status ${delOther.status}`);
  const notMine = await BG('/api/ingredients/2/seller-sources?entity_type=brand&entity_id=1');
  ok('BG 가 소유하지 않은 브랜드로 전환 → 403', notMine.status === 403, `status ${notMine.status}`);

  console.log('\n=== T2. 브랜드가 공급처를 붙이면 매장이 읽는다 (쓰기는 403) ===');
  // BG 가 브랜드 재료에 공급처 연결 — 테스트 전용 외부공급업체+상품을 만든다(기존 데이터 무변경)
  const B = '?entity_type=brand&entity_id=' + BRAND;
  const extRes = await BG('/api/external-suppliers' + B, {
    method: 'POST', body: JSON.stringify({ name: '__TEST_BRAND_STOCK_SUP__', city: 'KL', country: 'MY' })
  });
  const supId = extRes.body?.data?.supplier?.id;
  ok('테스트용 외부공급업체 생성(BG)', !!supId, `id ${supId}`);
  const prodRes = await BG(`/api/external-suppliers/${supId}/products${B}`, {
    method: 'POST', body: JSON.stringify({ name: '__TEST_COFFEE_BEAN__', unit: 'kg', unit_price: 20, min_order_quantity: 1 })
  });
  const spId = prodRes.body?.data?.id || prodRes.body?.data?.product?.id;
  ok('공급업체 상품 생성(BG)', !!spId, `id ${spId}`);
  const link = await BG(`/api/ingredients/${BRAND_ING}/seller-sources${B}`, {
    method: 'POST', body: JSON.stringify({ seller_type: 'supplier', seller_entity_id: supId, seller_product_id: spId, unit_price: 20, unit_conversion: 1 })
  });
  const mappingId = link.body?.data?.id;
  ok('BG 가 브랜드 재료에 공급처 연결', link.status === 201 && !!mappingId, `status ${link.status}`);

  const raSources = await RA(`/api/ingredients/${BRAND_ING}/seller-sources`);
  ok('매장이 브랜드 재료의 공급처를 읽는다', raSources.status === 200 && (raSources.body?.data || []).some(s => s.id === mappingId));
  const raLink = await RA(`/api/ingredients/${BRAND_ING}/seller-sources`, {
    method: 'POST', body: JSON.stringify({ seller_type: 'supplier', seller_entity_id: supId, seller_product_id: spId, unit_price: 5 })
  });
  ok('매장이 브랜드 재료에 공급처 연결 → 403', raLink.status === 403, `status ${raLink.status}`);
  const raUnlink = await RA(`/api/ingredient-seller-products/${mappingId}`, { method: 'DELETE' });
  ok('매장이 브랜드 재료 공급처 해제 → 403', raUnlink.status === 403, `status ${raUnlink.status}`);

  console.log('\n=== T3. 매장이 브랜드 재료로 발주한다 (형제/타브랜드는 차단) ===');
  const poRes = await RA('/api/purchase-orders/bulk', {
    method: 'POST',
    body: JSON.stringify({ items: [{ ingredient_id: BRAND_ING, ingredient_seller_product_id: mappingId, quantity: 3 }] })
  });
  const poId = (poRes.body?.data?.[0]?.id) || poRes.body?.data?.purchase_orders?.[0]?.id || poRes.body?.data?.id;
  ok('브랜드 재료로 발주 생성', poRes.status < 300 && !!poId, `status ${poRes.status} po ${poId} ${poRes.status >= 300 ? JSON.stringify(poRes.body).slice(0,200) : ''}`);
  const badPo = await RA('/api/purchase-orders/bulk', {
    method: 'POST',
    body: JSON.stringify({ items: [{ ingredient_id: OTHER_BRAND_ING, ingredient_seller_product_id: mappingId, quantity: 1 }] })
  });
  ok('타 브랜드 재료로 발주 → 4xx', badPo.status >= 400, `status ${badPo.status}`);

  console.log('\n=== T4. 입고는 매장 재고에만 반영 (브랜드 행 불변) ===');
  const recv = await RA(`/api/restaurants/${RID}/inventory/receive`, {
    method: 'POST', body: JSON.stringify({ ingredient_id: BRAND_ING, quantity: 5, unit_cost: 20 })
  });
  ok('브랜드 재료 입고 성공', recv.status === 200, `status ${recv.status}`);
  const overlay = await RestaurantIngredientStock.findOne({ where: { restaurant_id: RID, ingredient_id: BRAND_ING } });
  ok('매장 오버레이 재고 증가', overlay && parseFloat(overlay.current_stock) === 5, `overlay=${overlay?.current_stock}`);
  const brandIngAfter = await Ingredient.findByPk(BRAND_ING);
  ok('브랜드 재료 행 current_stock 불변', (parseFloat(brandIngAfter.current_stock) || 0) === brandStockBefore, `${brandStockBefore} → ${brandIngAfter.current_stock}`);
  const sibOverlay = await RestaurantIngredientStock.findOne({ where: { restaurant_id: SIB, ingredient_id: BRAND_ING } });
  ok('형제 매장(158) 재고는 그대로 0/없음', !sibOverlay || parseFloat(sibOverlay.current_stock) === 0);
  const idor = await RA(`/api/restaurants/${RID}/inventory/receive`, {
    method: 'POST', body: JSON.stringify({ ingredient_id: OTHER_BRAND_ING, quantity: 5 })
  });
  ok('남의 재료 id 로 입고 → 404 (IDOR 차단)', idor.status === 404, `status ${idor.status}`);

  console.log('\n=== T5. 매장 레시피가 브랜드 재료를 쓴다 (타 브랜드 재료는 거부) ===');
  const rec = await RA(`/api/restaurants/${RID}/recipes`, {
    method: 'POST',
    body: JSON.stringify({ name: '__TEST_BRAND_RECIPE__', ingredients: [{ ingredient_id: BRAND_ING, quantity: 1, unit: 'kg', cost: 20 }] })
  });
  const recId = rec.body?.data?.id;
  ok('브랜드 재료로 매장 레시피 생성', rec.status < 300 && !!recId, `status ${rec.status}`);
  const badRec = await RA(`/api/restaurants/${RID}/recipes`, {
    method: 'POST',
    body: JSON.stringify({ name: '__TEST_BAD_RECIPE__', ingredients: [{ ingredient_id: OTHER_BRAND_ING, quantity: 1, unit: 'kg', cost: 1 }] })
  });
  ok('타 브랜드 재료로 레시피 생성 → 400', badRec.status === 400, `status ${badRec.status}`);

  console.log('\n=== T6. 본사 구매 체인(product_ingredients) 무접촉 ===');
  const afterPI = await ProductIngredient.count();
  const afterPIMap = await IngredientSellerProduct.count({ where: { product_ingredient_id: { [require('sequelize').Op.ne]: null } } });
  ok('product_ingredients 건수 불변', afterPI === beforePI, `${beforePI} → ${afterPI}`);
  ok('본사 스톡 공급처 매핑 불변', afterPIMap === beforePIMap, `${beforePIMap} → ${beforePIMap}`);

  // ---- 정리 (테스트가 만든 것만 삭제) ----
  console.log('\n=== 정리 ===');
  if (recId) await Recipe.destroy({ where: { id: recId } }).then(() => RecipeIngredient.destroy({ where: { recipe_id: recId } }));
  await Recipe.destroy({ where: { name: ['__TEST_BRAND_RECIPE__', '__TEST_BAD_RECIPE__'] } });
  if (poId) { await PurchaseOrderItem.destroy({ where: { purchase_order_id: poId } }); await PurchaseOrder.destroy({ where: { id: poId }, force: true }); }
  await RestaurantIngredientStock.destroy({ where: { restaurant_id: RID, ingredient_id: BRAND_ING } });
  await RestaurantIngredientCost.destroy({ where: { restaurant_id: RID, ingredient_id: BRAND_ING } });
  if (mappingId) await IngredientSellerProduct.destroy({ where: { id: mappingId } });
  if (spId) await SupplierProduct.destroy({ where: { id: spId }, force: true });
  if (supId) { await SupplierContract.destroy({ where: { supplier_company_id: supId }, force: true }); await SupplierCompany.destroy({ where: { id: supId }, force: true }); }
  console.log('  테스트 생성물 삭제 완료 (기존 데이터 무변경)');

  console.log(`\n=== 결과: ${pass} 통과 / ${fail} 실패 ===`);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error('테스트 오류:', e); process.exit(1); });
