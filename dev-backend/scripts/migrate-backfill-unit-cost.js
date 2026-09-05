/**
 * scripts/migrate-backfill-unit-cost.js — 원가를 공급업체 가격에서 채운다 (H1 18건 + H2 125건 흡수).
 *
 * ## 왜 (Irene 2026-09-05)
 * > "원가는 원래 공급업체 가격 아니야? 이걸 따로 따로 넣어야 해?"
 *
 * 맞다(`docs/TRADE_STRUCTURE.md :11 :13`). 그런데 코드에 그 길이 없어서 사람이 행마다 채워야 했고,
 * 운영 실측 결과 **활성 재고아이템 308건 중 251건이 원가 0** 이었다. 그 때문에 프로덕트 레시피
 * 59줄의 원가가 실제보다 적게 나왔다.
 *
 * ## 규칙 — 이 파일에 규칙이 없다. `services/costSync.js` 가 단일 소스다.
 *   ①선호 판매자 가격 × 환산  ②없으면 프로덕트 출처 거울은 프로덕트 가격  ③둘 다 없으면 무접촉
 * 여기서는 그 함수를 **`onlyIfZero` 모드**로 전 행에 1회 돌린다 — **사람이 넣은 값은 안 덮는다.**
 * 앞으로는 판매자·프로덕트 가격이 바뀔 때 같은 함수가 자동으로 불려 따라간다(백필은 이번 1회).
 *
 * ## 폴백 1건 (규칙 밖 레거시 복구)
 * 재고아이템이 0 이고 **자기 거울에 값이 있고 기준(단위·기준숫자)이 같으면** 그 값을 복사한다.
 * 옛 모델에서 가격이 거울에만 들어간 18건이 여기 해당한다. 기준이 다르면 값의 뜻도 다르므로 목록만.
 *
 * 드라이런 = 적용 + 증명 + 무조건 롤백.
 * 사용: node scripts/migrate-backfill-unit-cost.js [--dry-run]
 * ⚠ 기본이 적용이다(배포 루프는 인자 없이 부른다).
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { recomputeUnitCost } = require('../services/costSync');

const DRY = process.argv.includes('--dry-run');
const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });
const run = (sql, r, t) => sequelize.query(sql, { replacements: r, transaction: t });
const num = (v) => (v == null ? null : parseFloat(v));

async function main() {
  const t = await sequelize.transaction();
  const rep = { filled: [], mirrorCopied: [], skipped: {}, humanNeeded: [], pushedToMirrors: 0, realigned: [], copiesAligned: 0 };
  const note = (k) => { rep.skipped[k] = (rep.skipped[k] || 0) + 1; };
  try {
    // ── 1. 규칙대로 채운다 (사람 값 보존) ────────────────────────────────────
    for (const [kind, table] of [['product_ingredient', 'product_ingredients'], ['ingredient', 'ingredients']]) {
      const rows = await q(`SELECT id, code, name FROM ${table}
                             WHERE is_active = 1 AND (unit_cost = 0 OR unit_cost IS NULL)`, {}, t);
      for (const r of rows) {
        const res = await recomputeUnitCost(kind, r.id, { transaction: t, onlyIfZero: true, sequelize });
        if (res.changed) rep.filled.push(`${r.code || kind + '#' + r.id} ${String(r.name).slice(0, 28)}: 0 → ${res.to} (${res.source})`);
        else if (res.skip) note(res.skip.startsWith('단위 비호환') ? '단위 비호환' : res.skip);
      }
    }

    // ── 2. 폴백 — 재고아이템 0 · 같은 기준의 거울에 값 있음 (옛 모델 잔재) ───────
    const legacy = await q(`SELECT pi.id, pi.code, pi.name, i.unit_cost ic
                              FROM product_ingredients pi JOIN ingredients i ON i.source_product_ingredient_id = pi.id
                             WHERE pi.is_active = 1 AND (pi.unit_cost = 0 OR pi.unit_cost IS NULL)
                               AND i.unit_cost > 0 AND pi.unit = i.unit AND pi.base_quantity = i.base_quantity`, {}, t);
    for (const r of legacy) {
      await run(`UPDATE product_ingredients SET unit_cost = :c WHERE id = :id`, { c: r.ic, id: r.id }, t);
      rep.mirrorCopied.push(`${r.code} ${String(r.name).slice(0, 28)}: 0 → ${r.ic} (거울 값 복사)`);
    }

    // ── 2-2. 채운 원가를 거울로 내려보낸다 ────────────────────────────────────
    //   레시피는 거울 행의 `unit_cost` 를 읽는다(`routes/recipes.js :471`). 아이템만 채우면
    //   화면 숫자는 안 움직인다. 0 은 미정이라 안 내려간다(stockItemMirror 규칙).
    const { ProductIngredient } = require('../models');
    const { syncMirrors } = require('../services/stockItemMirror');
    const toPush = await q(`SELECT DISTINCT pi.id FROM product_ingredients pi
                              JOIN ingredients i ON i.source_product_ingredient_id = pi.id
                             WHERE pi.is_active = 1 AND pi.unit_cost > 0
                               AND (i.unit_cost IS NULL OR ABS(i.unit_cost - pi.unit_cost) > 0.0001)`, {}, t);
    let pushed = 0;
    for (const r of toPush) {
      const item = await ProductIngredient.findByPk(r.id, { transaction: t });
      if (item) { const o = await syncMirrors(item, { transaction: t }); pushed += o.updated || 0; }
    }
    rep.pushedToMirrors = pushed;

    // ── 1b. 이미 값이 있는데 **판매자 현재가와 어긋난** 원가를 맞춘다 ──────────
    //   1단계는 `unit_cost = 0` 만 돈다. 그런데 운영에서 문제인 것은 원가가 **있는데 옛값**인
    //   행이다 — 공급업체 매핑 57건·브랜드 매핑 20건(2026-09-06 실측, 45 오름/12 내림).
    //   costSync 의 사본 갱신은 그 행을 방문할 때만 일어나므로, 여기서 훑지 않으면 판매자가
    //   다음에 가격을 고칠 때까지 옛값 그대로다. Irene 에게 "배포하면 바뀐다"고 말한 그 숫자다.
    const drifted = await q(`
      SELECT DISTINCT isp.product_ingredient_id pi_id, isp.ingredient_id ing_id
        FROM ingredient_seller_products isp
        LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
        LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
        LEFT JOIN foodcourt_products fp ON fp.id = isp.seller_product_id AND isp.seller_type = 'foodcourt'
       WHERE isp.is_active = 1 AND isp.seller_product_id IS NOT NULL
         AND COALESCE(sp.unit_price, bp.unit_price, fp.unit_price, 0) > 0
         AND ABS(COALESCE(sp.unit_price, bp.unit_price, fp.unit_price) - isp.unit_price) > 0.0001`, {}, t);
    // ⚠ `recomputeUnitCost` 는 타깃당 매핑을 **하나만** 고르고(ORDER BY is_preferred DESC, id DESC
    //   LIMIT 1) 사본도 그 하나만 갱신한다. 타깃에 연결 매핑이 둘 이상이고 어긋난 것이 고르지 않은
    //   쪽이면 그 사본이 남아 **증명 ④가 실패 → 전체 롤백 → 배포가 마이그 단계에서 멈춘다**.
    //   그래서 연결된 활성 매핑 **전부**의 사본을 현재가로 먼저 맞춘다(한 문장, 목록은 위에서 이미 뽑았다).
    const [, copyMeta] = await run(`
      UPDATE ingredient_seller_products isp
        LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
        LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
        LEFT JOIN foodcourt_products fp ON fp.id = isp.seller_product_id AND isp.seller_type = 'foodcourt'
         SET isp.unit_price = COALESCE(sp.unit_price, bp.unit_price, fp.unit_price)
       WHERE isp.is_active = 1 AND isp.seller_product_id IS NOT NULL
         AND COALESCE(sp.unit_price, bp.unit_price, fp.unit_price, 0) > 0
         AND ABS(COALESCE(sp.unit_price, bp.unit_price, fp.unit_price) - isp.unit_price) > 0.0001`, {}, t);
    rep.copiesAligned = (copyMeta && (copyMeta.affectedRows ?? copyMeta.changedRows)) || 0;

    for (const d of drifted) {
      if (d.pi_id) {
        const r = await recomputeUnitCost('product_ingredient', d.pi_id, { transaction: t, sequelize });
        if (r.changed) rep.realigned.push(`재고아이템#${d.pi_id}: ${r.from} → ${r.to}`);
      }
      if (d.ing_id) {
        const r = await recomputeUnitCost('ingredient', d.ing_id, { transaction: t, sequelize });
        if (r.changed) rep.realigned.push(`재료#${d.ing_id}: ${r.from} → ${r.to}`);
      }
    }

    // ── 3. 사람 몫 — 어느 출처도 없는 것 ─────────────────────────────────────
    const human = await q(`SELECT pi.code, pi.name FROM product_ingredients pi
       WHERE pi.is_active = 1 AND (pi.unit_cost = 0 OR pi.unit_cost IS NULL)
         AND NOT EXISTS (SELECT 1 FROM ingredient_seller_products s WHERE s.product_ingredient_id = pi.id AND s.unit_price > 0 AND s.is_active = 1)
         AND NOT EXISTS (SELECT 1 FROM ingredients i WHERE i.source_product_ingredient_id = pi.id AND i.unit_cost > 0)`, {}, t);
    human.forEach((r) => rep.humanNeeded.push(`${r.code} ${String(r.name).slice(0, 34)}`));

    // ── 증명 ────────────────────────────────────────────────────────────────
    //   "원가 0 = 0" 은 기대값이 아니다 — 출처가 없는 것은 사람이 넣어야 하고 그건 정상이다.
    //   증명할 것은 **"채울 수 있는데 안 채워진 것이 0"** 이다.
    const [v1] = await q(`SELECT COUNT(*) n FROM product_ingredients pi
      JOIN ingredient_seller_products isp ON isp.product_ingredient_id = pi.id AND isp.is_active = 1 AND isp.unit_price > 0
      JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
     WHERE pi.is_active = 1 AND (pi.unit_cost = 0 OR pi.unit_cost IS NULL) AND LOWER(sp.unit) COLLATE utf8mb4_general_ci = LOWER(pi.unit) COLLATE utf8mb4_general_ci`, {}, t);
    const [v2] = await q(`SELECT COUNT(*) n FROM ingredients i JOIN brand_products bp ON bp.id = i.source_brand_product_id
     WHERE i.is_active = 1 AND (i.unit_cost = 0 OR i.unit_cost IS NULL) AND bp.unit_price > 0 AND LOWER(bp.unit) = LOWER(i.unit)`, {}, t);

    console.log(`\n규칙으로 채움 ${rep.filled.length} · 현재가로 재정렬(사본) ${rep.copiesAligned} · 원가 ${rep.realigned.length} · 거울 값 복사 ${rep.mirrorCopied.length} · 거울로 내려보냄 ${rep.pushedToMirrors} · 사람 몫 ${rep.humanNeeded.length}`);
    rep.realigned.slice(0, 20).forEach((x) => console.log('  ↔ ' + x));
    if (rep.realigned.length > 20) console.log(`     … 외 ${rep.realigned.length - 20}건`);
    rep.filled.slice(0, 40).forEach((x) => console.log('  💰 ' + x));
    if (rep.filled.length > 40) console.log(`     … 외 ${rep.filled.length - 40}건`);
    rep.mirrorCopied.forEach((x) => console.log('  ↩ ' + x));
    console.log('\n  건너뛴 사유별:');
    Object.entries(rep.skipped).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(`     ${k}: ${n}건`));
    console.log(`\n  사람이 넣어야 하는 것 ${rep.humanNeeded.length}건 (공급처도 거울도 없음):`);
    rep.humanNeeded.slice(0, 20).forEach((x) => console.log('     · ' + x));
    if (rep.humanNeeded.length > 20) console.log(`     … 외 ${rep.humanNeeded.length - 20}건`);
    const [v3] = await q(`SELECT COUNT(*) n FROM product_ingredients pi
      JOIN ingredients i ON i.source_product_ingredient_id = pi.id
     WHERE pi.is_active = 1 AND i.is_active = 1 AND pi.unit_cost > 0
       AND ABS(COALESCE(i.unit_cost,0) - pi.unit_cost) > 0.0001`, {}, t);
    console.log(`\n증명 ① 같은 단위 판매자 가격이 있는데 원가 0 인 재고아이템 ${v1.n} (기대 0)`);
    console.log(`증명 ② 같은 단위 프로덕트 가격이 있는데 원가 0 인 거울 ${v2.n} (기대 0)`);
    const [v4] = await q(`SELECT COUNT(*) n FROM ingredient_seller_products isp
      LEFT JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
      LEFT JOIN brand_products bp ON bp.id = isp.seller_product_id AND isp.seller_type = 'brand'
      LEFT JOIN foodcourt_products fp ON fp.id = isp.seller_product_id AND isp.seller_type = 'foodcourt'
     WHERE isp.is_active = 1 AND isp.seller_product_id IS NOT NULL
       AND COALESCE(sp.unit_price, bp.unit_price, fp.unit_price, 0) > 0
       AND ABS(COALESCE(sp.unit_price, bp.unit_price, fp.unit_price) - isp.unit_price) > 0.0001`, {}, t);
    console.log(`증명 ③ 아이템 원가(>0)와 거울 원가가 다른 것 ${v3.n} (기대 0)`);
    console.log(`증명 ④ 연결된 매핑의 사본 ≠ 판매자 현재가 ${v4.n} (기대 0)`);
    if (Number(v1.n)) throw new Error(`증명 ① 실패 — ${v1.n}건 · 되돌린다`);
    if (Number(v2.n)) throw new Error(`증명 ② 실패 — ${v2.n}건 · 되돌린다`);
    if (Number(v3.n)) throw new Error(`증명 ③ 실패 — 아이템과 거울 원가가 다른 것 ${v3.n}건 · 되돌린다`);
    if (Number(v4.n)) throw new Error(`증명 ④ 실패 — 사본이 판매자 현재가와 다른 매핑 ${v4.n}건 · 되돌린다`);

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
