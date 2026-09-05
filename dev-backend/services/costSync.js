/**
 * services/costSync.js — 원가는 **공급업체 가격에서 나온다.** 사람이 따로 넣는 값이 아니다.
 *
 * ## 왜 (Irene 2026-09-05)
 * > "원가는 원래 공급업체 가격 아니야? 이걸 따로 따로 넣어야 해?"
 *
 * 맞다. `docs/TRADE_STRUCTURE.md`
 *   `:11` **재판매 프로덕트 → 공급업체가 가진 가격이 그대로 원가**
 *   `:13` **매장 원가 = GIT 판매가**
 * 그런데 코드는 `unit_cost` 를 행마다 사람이 채우게 두고 판매자 가격에서 끌어오는 길이 없었다.
 * 결과: 활성 재고아이템 308건 중 **251건이 원가 0**, 프로덕트 레시피 59줄의 원가가 실제보다 적게
 * 나왔고, Irene 이 프로덕트 가격을 바꿔도 브랜드 레시피에 닿지 않았다.
 *
 * ## 규칙 (단일 소스 — 이 함수 하나)
 *   1. **선호 판매자 매핑**이 있고 단위가 호환되면
 *      `unit_cost = 매핑.unit_price × (내 포장량 ÷ 판매자 포장량) × package_quantity`
 *   2. 없고 **프로덕트 출처 거울**이면 → 그 프로덕트 판매가로 같은 식(매핑의 특수경우)
 *   3. 둘 다 없으면 **건드리지 않는다** — 사람이 넣은 값·레거시를 덮지 않는다.
 *   비호환 단위(piece ↔ g 등)는 계수를 모르므로 **건너뛰고 사유를 돌려준다.**
 *
 * ⛔ 사람 값을 덮지 않는다는 것이 이 파일의 두 번째 규칙이다. 호출부가 `onlyIfZero` 로
 *   "비어 있을 때만" 을 고를 수 있고, 백필은 그 모드로 돈다. 판매자 가격이 **바뀐 순간**의
 *   호출만 덮어쓴다(그게 Irene 이 기대한 "자동으로 따라간다" 다).
 *
 * 단위 주의: 반환 `cost` 는 **그 행의 `package_quantity` 기준 가격**이다
 *   (= `unit_cost` 칸의 뜻 — docs/TRADE_STRUCTURE.md §2-2 "기준양의 가격").
 */
const { QueryTypes } = require('sequelize');

const FACTOR = { 'kg->g': 1000, 'g->kg': 0.001, 'l->ml': 1000, 'ml->l': 0.001 };
const norm = (u) => String(u || '').toLowerCase();
const numOr = (v, d = null) => (v == null || v === '' ? d : parseFloat(v));

/**
 * 판매자 1 포장의 값을 **내 기준양의 값**으로 옮긴다.
 * @returns {{cost:number}|{skip:string}}
 */
function convertPrice({ sellerPrice, sellerUnit, sellerBase, myUnit, myBase, myPackageQty }) {
  const price = numOr(sellerPrice);
  if (!(price > 0)) return { skip: '판매자 가격이 0' };
  const su = norm(sellerUnit), mu = norm(myUnit);
  const f = su === mu ? 1 : FACTOR[`${su}->${mu}`];
  if (f == null) return { skip: `단위 비호환 (판매자 ${sellerUnit} ↔ 취급 ${myUnit})` };
  const sBase = numOr(sellerBase, 1) || 1;          // 판매자 1 주문단위에 든 양
  const mBase = numOr(myBase, 1) || 1;              // 내 취급 기준숫자
  const pkg = numOr(myPackageQty, 1) || 1;          // 내 기준양(포장 수)
  const perMyUnit = price / (sBase * f);            // 내 취급단위 1 당 값
  return { cost: Math.round(perMyUnit * mBase * pkg * 10000) / 10000 };
}

/**
 * 한 행(재고아이템 또는 재료)의 원가를 규칙대로 다시 계산한다.
 *
 * @param {'product_ingredient'|'ingredient'} kind
 * @param {number} id
 * @param {{transaction?:any, onlyIfZero?:boolean, sequelize:any}} opts
 * @returns {Promise<{changed:boolean, from:number, to:number, source:string}|{skip:string}>}
 */
async function recomputeUnitCost(kind, id, { transaction, onlyIfZero = false, sequelize } = {}) {
  const q = (sql, r) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction });
  const table = kind === 'product_ingredient' ? 'product_ingredients' : 'ingredients';
  const fk = kind === 'product_ingredient' ? 'product_ingredient_id' : 'ingredient_id';

  const [me] = await q(`SELECT id, name, unit, base_quantity, package_quantity, unit_cost
                          ${kind === 'ingredient' ? ', source_brand_product_id' : ''}
                          FROM ${table} WHERE id = :id`, { id });
  if (!me) return { skip: '행 없음' };
  const from = numOr(me.unit_cost, 0);
  if (onlyIfZero && from > 0) return { skip: '이미 값 있음(사람 값 보존)' };

  // ① 선호 판매자 매핑 — 선호가 없으면 가장 최근 것 하나
  //   ⚠ **가격은 판매자 상품의 현재가에서 읽는다.** 매핑의 `unit_price` 는 연결할 때 복사된
  //     사본일 뿐이고, 판매자가 가격을 고쳐도 아무도 갱신하지 않아 그대로 굳는다
  //     (docs/TRADE_STRUCTURE.md §5-1 "매장마다 가격 복사본이 따로 산다 ⚠ 가장 큰 것").
  //     실측 2026-09-05: 공급업체 8→12 로 올려도 매핑 8·원가 8 그대로였다.
  //     판매자 상품 행이 없는 **솔루션 밖 외부 공급업체** 매핑만 사본을 그대로 쓴다.
  const [map] = await q(`
    SELECT isp.id map_id, isp.unit_price, isp.is_preferred, isp.seller_product_id,
           COALESCE(sp.unit, bp.unit, fp.unit) s_unit,
           COALESCE(sp.base_quantity, bp.base_quantity, fp.base_quantity) s_base,
           COALESCE(sp.unit_price, bp.unit_price, fp.unit_price) s_price
      FROM ingredient_seller_products isp
      LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
      LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
      LEFT JOIN foodcourt_products fp ON fp.id = isp.seller_product_id AND isp.seller_type = 'foodcourt'
     WHERE isp.${fk} = :id AND isp.is_active = 1
       AND (isp.unit_price > 0 OR sp.unit_price > 0 OR bp.unit_price > 0 OR fp.unit_price > 0)
     ORDER BY isp.is_preferred DESC, isp.id DESC LIMIT 1`, { id });

  let picked = null, source = null;
  if (map) {
    const live = numOr(map.s_price);
    // 판매자 현재가가 0/없음이면 사본을 쓴다 — 0 은 "아직 안 정함"이지 "공짜"가 아니다.
    const useLive = live > 0;
    const sellerPrice = useLive ? live : map.unit_price;
    picked = convertPrice({ sellerPrice, sellerUnit: map.s_unit, sellerBase: map.s_base,
      myUnit: me.unit, myBase: me.base_quantity, myPackageQty: me.package_quantity });
    source = map.is_preferred ? '선호 판매자' : '판매자';

    // 사본을 현재가로 맞춘다 — **발주가 이 값을 읽기 때문이다**
    //   (`routes/purchase-orders-crud.js :803/:808` `priceFallback = mapping.unit_price`).
    //   안 맞추면 "레시피 원가는 12 인데 발주서는 8" 이 되고 그게 다음 신고가 된다.
    if (useLive && Math.abs(live - numOr(map.unit_price, 0)) >= 0.0001) {
      await sequelize.query(`UPDATE ingredient_seller_products SET unit_price = :p WHERE id = :m`,
        { replacements: { p: live, m: map.map_id }, transaction });
    }
  }

  // ② 매핑이 없거나 비호환이면 — 프로덕트 출처 거울은 그 프로덕트 가격
  if ((!picked || picked.skip) && kind === 'ingredient' && me.source_brand_product_id) {
    const [bp] = await q(`SELECT unit_price, unit, base_quantity FROM brand_products WHERE id = :b`,
      { b: me.source_brand_product_id });
    if (bp) {
      picked = convertPrice({ sellerPrice: bp.unit_price, sellerUnit: bp.unit, sellerBase: bp.base_quantity,
        myUnit: me.unit, myBase: me.base_quantity, myPackageQty: me.package_quantity });
      source = '프로덕트';
    }
  }

  // ③ 아무 출처도 없으면 손대지 않는다
  if (!picked) return { skip: '판매자·프로덕트 출처 없음 — 사람이 넣는다' };
  if (picked.skip) return { skip: picked.skip };
  if (Math.abs(picked.cost - from) < 0.0001) return { changed: false, from, to: picked.cost, source };

  await sequelize.query(`UPDATE ${table} SET unit_cost = :c WHERE id = :id`,
    { replacements: { c: picked.cost, id }, transaction });

  // 재고아이템 원가는 **거울까지 가야 레시피에 닿는다** — `routes/recipes.js :471` 이 거울 행의
  //   `unit_cost` 를 읽는다. raw UPDATE 는 모델 훅을 안 타므로 여기서 명시로 옮긴다.
  //   (동기화 규칙·0 예외는 `services/stockItemMirror.js` 가 정한다.)
  if (kind === 'product_ingredient') {
    try {
      const { ProductIngredient } = require('../models');
      const { syncMirrors } = require('./stockItemMirror');
      const item = await ProductIngredient.findByPk(id, { transaction });
      if (item) await syncMirrors(item, { transaction });
    } catch (e) {
      console.error(`[cost] 재고아이템 ${id} 원가를 거울로 옮기지 못함:`, e.message);
    }
  }
  return { changed: true, from, to: picked.cost, source, name: me.name };
}

/** 판매자 상품 하나의 가격이 바뀌었을 때 — 그 상품을 파는 모든 매핑의 타깃을 다시 계산한다. */
async function recomputeForSellerProduct(sellerType, sellerProductId, { transaction, sequelize } = {}) {
  const rows = await sequelize.query(
    `SELECT product_ingredient_id, ingredient_id FROM ingredient_seller_products
      WHERE seller_type = :st AND seller_product_id = :sp AND is_active = 1`,
    { type: QueryTypes.SELECT, replacements: { st: sellerType, sp: sellerProductId }, transaction });
  const out = [];
  for (const r of rows) {
    if (r.product_ingredient_id) out.push(await recomputeUnitCost('product_ingredient', r.product_ingredient_id, { transaction, sequelize }));
    if (r.ingredient_id) out.push(await recomputeUnitCost('ingredient', r.ingredient_id, { transaction, sequelize }));
  }
  return out;
}

/** 브랜드 프로덕트 가격이 바뀌었을 때 — 그 프로덕트를 출처로 하는 거울도 함께. */
async function recomputeForBrandProduct(brandProductId, { transaction, sequelize } = {}) {
  const out = await recomputeForSellerProduct('brand', brandProductId, { transaction, sequelize });
  const mirrors = await sequelize.query(
    `SELECT id FROM ingredients WHERE source_brand_product_id = :b AND is_active = 1`,
    { type: QueryTypes.SELECT, replacements: { b: brandProductId }, transaction });
  for (const m of mirrors) out.push(await recomputeUnitCost('ingredient', m.id, { transaction, sequelize }));
  return out;
}

module.exports = { recomputeUnitCost, recomputeForSellerProduct, recomputeForBrandProduct, convertPrice };
