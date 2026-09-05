/**
 * scripts/migrate-merge-product-mirrors.js — K-소스 이중 거울 병합 + 프로덕트 가격 전파.
 *
 * ## 무엇이 문제였나 (Irene 신고 2026-09-05, 운영 실측)
 * > "브랜드레시피에서 재료를 검색하면 … 같은게 여러 개 나와"
 * > "프로덕트에서 가격 바꾸면 브랜드레시피에서 … 재료계산이 되고 반영되어야 하는데 이것도 연결이 안돼"
 *
 * 같은 K-소스가 브랜드 재료에 **두 줄**로 있다:
 *   - **PI 거울** — 재고아이템(`source_product_ingredient_id`) 출처. `1000 g`, GIT 원가.
 *                  **레시피 47줄이 전부 여기 붙어 있고**, 발주 매핑 10건도 여기 있다.
 *   - **BP 거울** — 프로덕트(`source_brand_product_id`) 출처. `1 kg`, GIT 판매가. **참조 0.**
 *
 * 프로덕트 가격을 바꿔도 레시피에 안 닿은 이유: 동기화가 닿는 곳은 BP 거울인데
 * 레시피는 PI 거울을 본다. 게다가 `MIRRORED_FIELDS` 에 `unit_cost` 가 없어 **가격은 어느 경로로도
 * 전파되지 않았다.**
 *
 * ## 정본 = 프로덕트 거울 (Irene 결정 + docs/TRADE_STRUCTURE.md :13 :23)
 * "매장 원가 = GIT 판매가" 이고, Irene 이 "프로덕트 가격에 맞춰 재료 계산" 을 지시했다.
 * 매핑(발주) 경로의 가격은 **입고 때 가중평균**으로만 재고 원가에 들어가지 레시피 원가를
 * 즉시 바꾸지 않는다. 즉 Irene 이 기대한 동작은 `source_brand_product_id` 경로로만 성립한다.
 *
 * ## 쌍을 잇는 열쇠 — 이름이 아니라 **발주 매핑**
 * PI 거울의 매핑이 `seller_type='brand'` 로 **바로 그 프로덕트**를 가리킨다.
 * `매핑.seller_product_id == BP 거울.source_brand_product_id` 로 쌍이 확정된다 — 추측 0.
 * 그래서 이름이 다른 `K-Soy` ↔ `K-Soy Sauce 1kg` 도 사람 확인 없이 잡힌다.
 *
 * ## 하는 일 (한 트랜잭션, 순서가 안전장치)
 *   ① BP 거울에 PI 거울의 **취급 단위**를 물려준다(`g / 1000`), 기준은 프로덕트 단위(`kg / 1`),
 *      가격은 **프로덕트 판매가**.
 *   ② 레시피 줄 47 + 매핑 10 의 `ingredient_id` 를 BP 거울로 **바꾸기만** 한다
 *      (수량·단위·환산 무접촉 — 값이 그대로여야 원가가 안 튄다).
 *   ③ PI 거울 비활성.
 *   ④ **그 뒤에** PI(재고아이템)의 참조를 재평가해 0 이면 비활성. 아니면 무접촉 + 목록.
 *      ⛔ 순서가 중요하다 — ②전에 세면 "거울 경유 레시피 줄" 때문에 참조가 0 이 아니다.
 *   ⑤ BP 거울이 없는 쌍(`K-Bulgogi`)은 **만들지 않고 목록**으로 뺀다 — 거울 생성은 공유 결정이라
 *      사람이 화면에서 한다(F1). 자동 생성이 2026-06/07 분열을 만든 그 경로다.
 *
 * ⛔ 하지 않는 것: 이름으로 쌍 추측 · 거울 자동 생성 · 재고 환산(전부 0 이어야 하고 아니면 중단)
 *   · PI(재고아이템) 삭제(비활성만 — 원장·이력이 붙어 있을 수 있다).
 *
 * 드라이런 = **적용 + 증명 + 무조건 롤백** (2026-09-05 교훈: 증명이 `if(APPLY)` 안에만 있으면
 *   드라이런이 증명을 한 번도 안 돌린다).
 *
 * 사용: node scripts/migrate-merge-product-mirrors.js [--dry-run]
 * ⚠ 기본이 적용이다(배포 루프는 인자 없이 부른다).
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { recomputeUnitCost } = require('../services/costSync');

const DRY = process.argv.includes('--dry-run');
const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });
const run = (sql, r, t) => sequelize.query(sql, { replacements: r, transaction: t });
const num = (v) => (v == null ? null : parseFloat(v));

// ⛔ 가격 환산 로직은 여기 두지 않는다 — `services/costSync.js` 의 `convertPrice` 가 단일 소스다.
//   같은 식을 두 곳에 두면 한쪽만 고쳐지는 사고가 난다(달력 부품이 둘로 갈라졌던 것과 같은 형태).

async function main() {
  const t = await sequelize.transaction();
  const rep = { merged: [], noMirror: [], piDeactivated: [], piKept: [], priceSet: [], priceSkipped: [] };
  try {
    // 쌍 확정 — 매핑이 가리키는 프로덕트 == BP 거울의 출처
    const pairs = await q(`
      SELECT DISTINCT bp.id bp_id, bp.name bp_name, bp.unit bp_unit, bp.base_quantity bp_base, bp.unit_price bp_price,
             pim.id pim_id, pim.name pim_name, pim.unit pim_unit, pim.base_quantity pim_base,
             pim.unit_cost pim_cost, pim.current_stock pim_stock, pim.source_product_ingredient_id pi_id,
             bpm.id bpm_id, bpm.unit bpm_unit, bpm.base_quantity bpm_base
        FROM ingredient_seller_products isp
        JOIN ingredients pim ON pim.id = isp.ingredient_id AND pim.source_product_ingredient_id IS NOT NULL AND pim.is_active = 1
        JOIN brand_products bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
        LEFT JOIN ingredients bpm ON bpm.source_brand_product_id = bp.id AND bpm.brand_id = pim.brand_id AND bpm.is_active = 1
       ORDER BY bp.name`, {}, t);

    for (const p of pairs) {
      if (!p.bpm_id) {
        rep.noMirror.push(`${p.bp_name} — 프로덕트 거울이 없다(PI 거울 ing#${p.pim_id} 만 있음). 화면에서 공유를 켜면 거울이 생긴다 — 자동 생성하지 않음`);
        continue;
      }
      // 재고가 남아 있으면 환산 판단이 필요하다 — 이 스크립트 범위 밖
      const [ov] = await q(`SELECT COUNT(*) n FROM restaurant_ingredient_stocks WHERE ingredient_id IN (:a,:b) AND current_stock <> 0`,
        { a: p.pim_id, b: p.bpm_id }, t);
      if (num(p.pim_stock) !== 0 || Number(ov.n) > 0) {
        throw new Error(`${p.bp_name}: 재고가 0이 아니다(PI 거울 ${p.pim_stock} · 오버레이 ${ov.n}) — 중단`);
      }

      // ① BP 거울이 PI 거울의 취급 단위를 물려받고, 기준은 프로덕트 단위.
      //   ⛔ 가격은 여기서 계산하지 않는다 — **원가 규칙의 단일 소스는 `services/costSync.js`** 다
      //     (Irene: "원가는 원래 공급업체 가격 아니야?"). 단위를 먼저 세우고 그 다음 재계산한다.
      await run(`UPDATE ingredients SET unit = :u, base_quantity = :b, package_unit = :pu, package_quantity = :pq
                  WHERE id = :id`,
        { u: p.pim_unit, b: num(p.pim_base), pu: p.bp_unit, pq: num(p.bp_base), id: p.bpm_id }, t);

      // ② 레시피 줄·매핑을 BP 거울로 — `ingredient_id` 만 바꾼다
      const [lr] = await run(`UPDATE recipe_ingredients SET ingredient_id = :to WHERE ingredient_id = :from`,
        { to: p.bpm_id, from: p.pim_id }, t);
      const [mr] = await run(`UPDATE ingredient_seller_products SET ingredient_id = :to WHERE ingredient_id = :from`,
        { to: p.bpm_id, from: p.pim_id }, t);

      // ③ PI 거울 비활성
      await run(`UPDATE ingredients SET is_active = 0 WHERE id = :id`, { id: p.pim_id }, t);

      // 가격 — costSync 가 규칙대로 계산해 넣는다(프로덕트 출처 거울 → 프로덕트 가격 × 환산)
      const cost = await recomputeUnitCost('ingredient', p.bpm_id, { transaction: t, sequelize });
      const newPrice = cost.skip ? null : cost.to;
      if (cost.skip) rep.priceSkipped.push(`${p.bp_name} — ${cost.skip}`);
      const delta = newPrice != null ? Math.round((newPrice - num(p.pim_cost)) * 100) / 100 : 0;
      rep.merged.push(`${p.bp_name}: 줄 ${lr?.affectedRows ?? '?'} · 매핑 ${mr?.affectedRows ?? '?'} → ing#${p.bpm_id}`
        + ` (${p.pim_base} ${p.pim_unit} · 기준 ${p.bp_base} ${p.bp_unit} · 가격 ${p.pim_cost} → ${newPrice}`
        + (delta ? `  ⚠ 원가 ${delta > 0 ? '+' : ''}${delta}` : '') + `) · PI 거울 ing#${p.pim_id} 비활성`);
      if (newPrice != null) rep.priceSet.push({ bp: p.bp_name, from: num(p.pim_cost), to: newPrice, delta });
    }

    // ④ 병합 **뒤에** PI(재고아이템) 참조 재평가
    const piIds = [...new Set(pairs.filter((p) => p.bpm_id).map((p) => p.pi_id))].filter(Boolean);
    for (const piId of piIds) {
      const [c] = await q(`SELECT
          (SELECT COUNT(*) FROM product_recipe_ingredients x WHERE x.ingredient_id = :id) a,
          (SELECT COUNT(*) FROM purchase_order_items x WHERE x.product_ingredient_id = :id) b,
          (SELECT COUNT(*) FROM ingredient_seller_products x WHERE x.product_ingredient_id = :id) c,
          (SELECT COUNT(*) FROM ingredients x WHERE x.source_product_ingredient_id = :id AND x.is_active = 1) d,
          (SELECT COUNT(*) FROM brand_products x WHERE x.product_ingredient_id = :id) e,
          (SELECT COUNT(*) FROM products x WHERE x.ingredient_id = :id) f,
          (SELECT current_stock FROM product_ingredients WHERE id = :id) st,
          (SELECT code FROM product_ingredients WHERE id = :id) code`, { id: piId }, t);
      const refs = ['프로덕트레시피', '발주', '매핑', '활성거울', '프로덕트다이렉트', '메뉴다이렉트']
        .map((k, i) => [k, Number(c[['a', 'b', 'c', 'd', 'e', 'f'][i]])]).filter(([, n]) => n > 0);
      if (refs.length === 0 && num(c.st) === 0) {
        await run(`UPDATE product_ingredients SET is_active = 0 WHERE id = :id`, { id: piId }, t);
        rep.piDeactivated.push(`${c.code} (PI#${piId}) — 참조 0, 비활성`);
      } else {
        rep.piKept.push(`${c.code} (PI#${piId}) — ${refs.map(([k, n]) => `${k} ${n}`).join(' · ') || `재고 ${c.st}`} 남아 무접촉`);
      }
    }

    // ── 증명 ────────────────────────────────────────────────────────────────
    const [v1] = await q(`SELECT COUNT(*) n FROM ingredients pim
       JOIN ingredient_seller_products isp ON isp.ingredient_id = pim.id AND isp.seller_type='brand'
       JOIN ingredients bpm ON bpm.source_brand_product_id = isp.seller_product_id AND bpm.brand_id = pim.brand_id AND bpm.is_active = 1
      WHERE pim.source_product_ingredient_id IS NOT NULL AND pim.is_active = 1`, {}, t);
    const [v2] = await q(`SELECT COUNT(*) n FROM recipe_ingredients ri JOIN ingredients i ON i.id = ri.ingredient_id WHERE i.is_active = 0`, {}, t);
    const [v3] = await q(`SELECT COUNT(*) n FROM ingredients i JOIN brand_products bp ON bp.id = i.source_brand_product_id
      WHERE i.is_active = 1 AND i.unit_cost = 0 AND bp.unit_price > 0`, {}, t);

    console.log(`\n병합 ${rep.merged.length}쌍 · 거울 없음 ${rep.noMirror.length} · PI 비활성 ${rep.piDeactivated.length} · PI 유지 ${rep.piKept.length}`);
    rep.merged.forEach((x) => console.log('  ✔ ' + x));
    rep.noMirror.forEach((x) => console.log('  ○ ' + x));
    rep.piDeactivated.forEach((x) => console.log('  − ' + x));
    rep.piKept.forEach((x) => console.log('  · ' + x));
    rep.priceSkipped.forEach((x) => console.log('  ⏭ ' + x));
    const moved = rep.priceSet.filter((x) => x.delta);
    if (moved.length) {
      console.log('\n⚠ 레시피 원가가 달라지는 것:');
      moved.forEach((x) => console.log(`    ${x.bp}: ${x.from} → ${x.to} (${x.delta > 0 ? '+' : ''}${x.delta})`));
    }
    console.log(`\n증명 ① 같은 물건 두 줄(PI 거울·BP 거울 동시 활성) ${v1.n} (기대 0)`);
    console.log(`증명 ② 비활성 재료를 가리키는 레시피 줄 ${v2.n} (기대 0)`);
    console.log(`증명 ③ 프로덕트 출처 거울인데 가격 0 ${v3.n} (기대 0)`);
    if (Number(v1.n)) throw new Error(`증명 ① 실패 — 두 줄 ${v1.n}건 남음 · 되돌린다`);
    if (Number(v2.n)) throw new Error(`증명 ② 실패 — 비활성 재료를 가리키는 줄 ${v2.n}건 · 되돌린다`);
    if (Number(v3.n)) throw new Error(`증명 ③ 실패 — 가격 0 인 프로덕트 거울 ${v3.n}건 · 되돌린다`);

    if (DRY) { await t.rollback(); console.log('\n○ 드라이런 — 적용했다가 **되돌렸습니다**(증명은 위에서 실제로 돌았습니다).'); }
    else { await t.commit(); console.log('\n✅ 적용 완료'); }
    process.exit(0);
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('❌ 실패 — 롤백:', e.message);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = {};
