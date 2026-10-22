// 오너 공급업체 관리 · 올리기 · 직원 권한 분리 — 설계 §5 ①~④ 실호출 (개발 데모 오너 289 = 매장 2·3 · 남의 매장 38)
// 만든 것은 끝에 전부 지운다. 직원 330 권한은 원본을 먼저 떠 두고 되돌린다.
process.chdir('/var/www/dev-backend');
require('/var/www/dev-backend/node_modules/dotenv').config({ path: '/var/www/dev-backend/.env' });
const jwt = require('/var/www/dev-backend/node_modules/jsonwebtoken');
const { sequelize } = require('/var/www/dev-backend/config/database');
const B = 'http://127.0.0.1:3001';
const OWNER = 289, R2 = 2, R3 = 3, R38 = 38, STAFF = 330, MEMBER_SC = 20, ING = 126;
const tag = '[확인용] OS' + Date.now().toString(36);
const tok = (id) => jwt.sign({ userId: id }, process.env.JWT_SECRET, { expiresIn: '10m' });
const q = async (s, r) => (await sequelize.query(s, { replacements: r, logging: false }))[0];
let pass = 0, fail = 0; const out = [];
const ok = (name, cond, extra) => { (cond ? pass++ : fail++); out.push(`${cond ? '✓' : '✗'} ${name}${extra ? ' — ' + extra : ''}`); };
async function call(t, m, p, body) {
  const r = await fetch(B + p, { method: m, headers: { Authorization: 'Bearer ' + t, 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  let j = null; try { j = await r.json(); } catch {}
  return { s: r.status, j };
}
const as = (rid) => `entity_type=restaurant&entity_id=${rid}`;
const made = { sc: [], po: [], isp: [] };
let staffOrig = null;

(async () => {
  const T = tok(OWNER);
  try {
    // ① 매장 2 로 전환해 등록·상품·가격·끄기
    const c1 = await call(T, 'POST', `/api/external-suppliers?${as(R2)}`, { name: tag + ' A' });
    const A = c1.j?.data?.supplier?.id; if (A) made.sc.push(A);
    const scA = A ? (await q('SELECT registered_by_entity_type t, registered_by_entity_id i FROM supplier_companies WHERE id=:id', { id: A }))[0] : null;
    ok('① 전환 등록 201 · 매장 2 소유', c1.s === 201 && scA && scA.t === 'restaurant' && Number(scA.i) === R2, `${c1.s} ${JSON.stringify(scA)}`);
    const p1 = await call(T, 'POST', `/api/external-suppliers/${A}/products?${as(R2)}`, { name: tag + ' Rice', unit: 'pack', unit_price: 30 });
    const P1 = p1.j?.data?.id || p1.j?.data?.product?.id;
    ok('① 전환 상품 추가', p1.s === 201 || p1.s === 200, `${p1.s} ${p1.j?.message || ''}`);
    const u1 = await call(T, 'PUT', `/api/external-suppliers/${A}/products/${P1}?${as(R2)}`, { name: tag + ' Rice', unit: 'pack', unit_price: 32 });
    const price = P1 ? (await q('SELECT unit_price FROM supplier_products WHERE id=:id', { id: P1 }))[0] : null;
    ok('① 전환 가격 수정 32', u1.s === 200 && price && Number(price.unit_price) === 32, `${u1.s} ${JSON.stringify(price)}`);
    const l2 = await call(T, 'GET', `/api/external-suppliers?${as(R2)}`);
    const l3 = await call(T, 'GET', `/api/external-suppliers?${as(R3)}`);
    const in2 = (l2.j?.data || []).find(s => s.id === A); const in3 = (l3.j?.data || []).find(s => s.id === A);
    ok('① 매장 2 목록 scope own · 매장 3 에 없음', !!in2 && in2.scope !== 'owner' && !in3, `in2=${in2 && in2.scope} in3=${!!in3}`);
    const off = await call(T, 'PUT', `/api/external-suppliers/${A}/active?${as(R2)}`, { is_active: false });
    const on = await call(T, 'PUT', `/api/external-suppliers/${A}/active?${as(R2)}`, { is_active: true });
    ok('① 전환 끄기·켜기', off.s === 200 && on.s === 200, `${off.s}/${on.s}`);
    const x38 = await call(T, 'GET', `/api/external-suppliers?${as(R38)}`);
    ok('① 남의 매장(38) 전환 403', x38.s === 403, `${x38.s}`);
    const noAct = await call(T, 'PUT', `/api/external-suppliers/${A}`, { name: tag + ' A2' });
    ok('① 전환 없이 매장 2 업체 수정 403', noAct.s === 403, `${noAct.s}`);
    const ct = await call(T, 'GET', `/api/supplier-contracts?status=active&${as(R2)}`);
    const dir = await call(T, 'GET', `/api/supplier-directory?${as(R2)}`);
    const cat = await call(T, 'GET', `/api/supplier-catalog?${as(R2)}`);
    ok('① 전환 계약·찾기·카탈로그 200', ct.s === 200 && dir.s === 200 && cat.s === 200, `${ct.s}/${dir.s}/${cat.s}`);

    // ② 재고아이템 연결은 전환해도 403
    const i1 = await call(T, 'POST', `/api/ingredient-seller-products?${as(R2)}`, { ingredient_id: ING, seller_type: 'supplier', seller_entity_id: A, seller_product_id: P1 });
    const i2 = await call(T, 'GET', `/api/ingredients?${as(R2)}`);
    const i3 = await call(T, 'GET', `/api/seller-catalog?${as(R2)}`);
    ok('② 재고아이템 연결 라우트 전환 403 유지', i1.s === 403 && i2.s === 403 && i3.s === 403, `${i1.s}/${i2.s}/${i3.s}`);

    // ③ 올리기 — 매장 2 업체 C(상품 2 · 매장 2 연결 1 · 발주 1)
    const cC = await call(T, 'POST', `/api/external-suppliers?${as(R2)}`, { name: tag + ' C' });
    const C = cC.j?.data?.supplier?.id; if (C) made.sc.push(C);
    const pc1 = await call(T, 'POST', `/api/external-suppliers/${C}/products?${as(R2)}`, { name: tag + ' Oil', unit: 'pack', unit_price: 12 });
    await call(T, 'POST', `/api/external-suppliers/${C}/products?${as(R2)}`, { name: tag + ' Salt', unit: 'pack', unit_price: 3 });
    const PC1 = pc1.j?.data?.id || pc1.j?.data?.product?.id;
    const [ispId] = await sequelize.query(
      `INSERT INTO ingredient_seller_products (ingredient_id, seller_type, seller_entity_id, seller_product_id, unit_price, unit_conversion, is_active, created_at, updated_at)
       VALUES (:ing, 'supplier', :sc, :sp, 12, 1, 1, NOW(), NOW())`, { replacements: { ing: ING, sc: C, sp: PC1 }, logging: false });
    made.isp.push(ispId);
    const po = await call(T, 'POST', `/api/purchase-orders?${as(R2)}`, { seller_type: 'supplier', seller_entity_id: C, items: [{ ingredient_id: ING, quantity_ordered: 1, ingredient_seller_product_id: ispId }] });
    const POID = po.j?.data?.id; if (POID) made.po.push(POID);
    ok('③ 준비: 발주 초안 1', !!POID, `${po.s} ${po.j?.message || ''}`);
    const pr = await call(T, 'POST', `/api/external-suppliers/${C}/promote-to-owner?${as(R2)}`);
    const scC = (await q('SELECT registered_by_entity_type t, registered_by_entity_id i FROM supplier_companies WHERE id=:id', { id: C }))[0];
    const rows2 = await q("SELECT COUNT(*) n FROM supplier_contracts WHERE supplier_company_id=:id AND entity_type='restaurant' AND entity_id=:r AND deleted_at IS NULL", { id: C, r: R2 });
    const ownerC = await q("SELECT id, status FROM supplier_contracts WHERE supplier_company_id=:id AND entity_type='owner' AND entity_id=:o AND deleted_at IS NULL", { id: C, o: OWNER });
    const ispAfter = (await q('SELECT id, seller_entity_id FROM ingredient_seller_products WHERE id=:id', { id: ispId }))[0];
    const poAfter = POID ? (await q('SELECT seller_entity_id FROM purchase_orders WHERE id=:id', { id: POID }))[0] : null;
    const prods = await q('SELECT COUNT(*) n FROM supplier_products WHERE supplier_company_id=:id AND deleted_at IS NULL', { id: C });
    ok('③ 올리기 200 · 주인 owner 289 · id 유지', pr.s === 200 && scC.t === 'owner' && Number(scC.i) === OWNER && pr.j?.data?.id === C, `${pr.s} ${JSON.stringify(scC)} ${pr.j?.message || ''}`);
    ok('③ 매장 2 계약 행 0 · 오너 계약 active 1', Number(rows2[0].n) === 0 && ownerC.length === 1 && ownerC[0].status === 'active', `store=${rows2[0].n} owner=${JSON.stringify(ownerC)}`);
    ok('③ 연결 id·발주 판매자·상품 2 그대로', ispAfter && Number(ispAfter.seller_entity_id) === C && poAfter && Number(poAfter.seller_entity_id) === C && Number(prods[0].n) === 2, `${JSON.stringify(ispAfter)} ${JSON.stringify(poAfter)} prods=${prods[0].n}`);
    const g2 = await call(T, 'GET', `/api/external-suppliers?${as(R2)}`); const g3 = await call(T, 'GET', `/api/external-suppliers?${as(R3)}`);
    const s2 = (g2.j?.data || []).find(s => s.id === C); const s3 = (g3.j?.data || []).find(s => s.id === C);
    ok('③ 매장 2·3 목록 scope owner', s2 && s2.scope === 'owner' && s3 && s3.scope === 'owner', `${s2 && s2.scope}/${s3 && s3.scope}`);
    const again = await call(T, 'POST', `/api/external-suppliers/${C}/promote-to-owner?${as(R2)}`);
    ok('③ 다시 올리기 400', again.s === 400, `${again.s} ${again.j?.code}`);
    const mem = await call(T, 'POST', `/api/external-suppliers/${MEMBER_SC}/promote-to-owner?${as(R2)}`);
    ok('③ 가입 공급업체 400', mem.s === 400 && mem.j?.code === 'MEMBER_SUPPLIER_NOT_PROMOTABLE', `${mem.s} ${mem.j?.code}`);
    // 월결제 업체
    const cM = await call(T, 'POST', `/api/external-suppliers?${as(R2)}`, { name: tag + ' M', billing: { invoice_cycle: 'monthly_soa', soa_issue_day: 1, payment_due_day: 15 } });
    const M = cM.j?.data?.supplier?.id; if (M) made.sc.push(M);
    const pm = await call(T, 'POST', `/api/external-suppliers/${M}/promote-to-owner?${as(R2)}`);
    ok('③ 월결제 업체 400', pm.s === 400 && pm.j?.code === 'MONTHLY_BILLING_STORE_ONLY', `${cM.s} ${pm.s} ${pm.j?.code}`);
    // 남의 매장(3) 업체를 매장 2 전환으로 올리기
    const cD = await call(T, 'POST', `/api/external-suppliers?${as(R3)}`, { name: tag + ' D' });
    const D = cD.j?.data?.supplier?.id; if (D) made.sc.push(D);
    const pd = await call(T, 'POST', `/api/external-suppliers/${D}/promote-to-owner?${as(R2)}`);
    ok('③ 다른 매장 업체 403', pd.s === 403, `${pd.s}`);
    // 전환 없이 / RA·직원 은 올리기 불가
    const pn = await call(T, 'POST', `/api/external-suppliers/${D}/promote-to-owner`);
    ok('③ 전환 없이 올리기 403', pn.s === 403, `${pn.s}`);
    // 같은 브랜드 원본 사본 2개 → 두 번째 409
    const srcRow = (await q("SELECT id FROM supplier_companies WHERE registered_by_entity_type='brand' AND deleted_at IS NULL LIMIT 1"))[0];
    const mk = async (rid, nm) => {
      const [id] = await sequelize.query(`INSERT INTO supplier_companies (name, status, is_system_registered, registered_by_entity_type, registered_by_entity_id, copied_from_supplier_company_id, created_at, updated_at)
        VALUES (:nm, 'active', 0, 'restaurant', :rid, :src, NOW(), NOW())`, { replacements: { nm, rid, src: srcRow.id }, logging: false });
      made.sc.push(id); return id;
    };
    const E2 = await mk(R2, tag + ' E2'), E3 = await mk(R3, tag + ' E3');
    const pe2 = await call(T, 'POST', `/api/external-suppliers/${E2}/promote-to-owner?${as(R2)}`);
    const pe3 = await call(T, 'POST', `/api/external-suppliers/${E3}/promote-to-owner?${as(R3)}`);
    const e3 = (await q('SELECT registered_by_entity_type t FROM supplier_companies WHERE id=:id', { id: E3 }))[0];
    ok('③ 같은 원본 사본 두 번째 409 · 첫째 200 · 둘째 그대로', pe2.s === 200 && pe3.s === 409 && pe3.j?.code === 'ALREADY_PROMOTED_COPY' && e3.t === 'restaurant', `${pe2.s}/${pe3.s} ${pe3.j?.code} ${e3.t}`);

    // ④ 직원 권한 분리 — 직원 330(매장 2) 권한 원본을 떠 둔다
    staffOrig = (await q('SELECT permissions FROM users WHERE id=:id', { id: STAFF }))[0].permissions;
    const setP = (arr) => sequelize.query('UPDATE users SET permissions=:p WHERE id=:id', { replacements: { p: JSON.stringify(arr), id: STAFF }, logging: false });
    const TS = tok(STAFF);
    // [발주 GET, 업체 목록 GET, 계약 GET, 카탈로그 GET, 업체 등록 POST(빈 몸통: 권한 있으면 400, 없으면 403)] — 2026-10-22 게이트 정정: 읽기는 purchasing 도, 쓰기는 inventory 만
    const probe = async () => [(await call(TS, 'GET', '/api/purchase-orders')).s, (await call(TS, 'GET', '/api/external-suppliers')).s, (await call(TS, 'GET', '/api/supplier-contracts')).s,
      (await call(TS, 'GET', '/api/supplier-catalog')).s, (await call(TS, 'POST', '/api/external-suppliers', {})).s];
    await setP(['access_pos', 'inventory']); const a1 = await probe();
    await setP(['access_pos', 'purchasing']); const a2 = await probe();
    await setP(['access_pos', 'inventory', 'purchasing']); const a3 = await probe();
    await setP(['access_pos']); const a4 = await probe();
    ok('④ inventory 만: 발주 403 · 업체 읽기 200 · 카탈로그 200 · 업체 쓰기 통과(400)', a1[0] === 403 && a1[1] === 200 && a1[2] === 200 && a1[3] === 200 && a1[4] === 400, a1.join('/'));
    ok('④ purchasing 만: 발주 200 · 업체 읽기 200 · 카탈로그 200 · 업체 쓰기 403', a2[0] === 200 && a2[1] === 200 && a2[2] === 200 && a2[3] === 200 && a2[4] === 403, a2.join('/'));
    ok('④ 둘 다: 전부 통과', a3[0] === 200 && a3[1] === 200 && a3[2] === 200 && a3[3] === 200 && a3[4] === 400, a3.join('/'));
    ok('④ 둘 다 없음: 전부 403', a4[0] === 403 && a4[1] === 403 && a4[2] === 403 && a4[3] === 403 && a4[4] === 403, a4.join('/'));
  } catch (e) {
    ok('예외 없음', false, e.stack);
  } finally {
    if (staffOrig !== null) await sequelize.query('UPDATE users SET permissions=:p WHERE id=:id', { replacements: { p: staffOrig, id: STAFF }, logging: false });
    for (const id of made.po) { await q('DELETE FROM purchase_order_items WHERE purchase_order_id=:id', { id }); await q('DELETE FROM purchase_orders WHERE id=:id', { id }); }
    for (const id of made.isp) await q('DELETE FROM ingredient_seller_products WHERE id=:id', { id });
    if (made.sc.length) {
      await q('DELETE FROM supplier_contracts WHERE supplier_company_id IN (:ids)', { ids: made.sc });
      await q('DELETE FROM supplier_products WHERE supplier_company_id IN (:ids)', { ids: made.sc });
      await q('DELETE FROM supplier_companies WHERE id IN (:ids)', { ids: made.sc });
    }
    const left = await q("SELECT COUNT(*) n FROM supplier_companies WHERE name LIKE :t", { t: tag + '%' });
    const st = (await q('SELECT permissions FROM users WHERE id=:id', { id: STAFF }))[0].permissions;
    out.push(`정리: 남은 시험 업체 ${left[0].n} · 직원 330 권한 원복 ${st === staffOrig || staffOrig === null}`);
    console.log(out.join('\n')); console.log(`결과 ${pass}/${pass + fail}`);
    process.exit(fail ? 1 : 0);
  }
})();
