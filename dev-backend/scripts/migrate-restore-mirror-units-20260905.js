/**
 * scripts/migrate-restore-mirror-units-20260905.js — H1 핫픽스.
 *
 * ## 무엇이 났나 (실측으로 확정, 2026-09-05)
 * 단위 모델 배포(v3.85)가 **PM2 재시작 전에 한 번 실패**해, 운영 백엔드가 몇 시간 동안
 * **옛 코드**로 돌았다. 옛 코드는 `stockItemMirror.MIRRORED_FIELDS` 에 `unit` 이 있어
 * **재고아이템을 저장하면 브랜드 재료(거울)의 단위가 아이템 단위로 덮인다** —
 * P0(`9ba5b5d2f`)가 막으려던 바로 그 사고다. 그 창에서 실제로 4건이 덮였다.
 *
 * 12시 스냅샷 vs 배포 직전 감사로그 `before` 를 id 로 조인해 전수를 냈다:
 *   ing#40 Thailand Fish Sauce   880 g     → 880 bottle   ← **복구 대상**
 *   ing#87 K-Oriental Salad 1kg  1 piece   → 1 kg         ← 무접촉(아래)
 *   ing#93 K-Soy Sauce 1kg       1 piece   → 1 kg         ← 무접촉
 *   ing#94 K-Kimchi Sauce 1kg    1 piece   → 1 kg         ← 무접촉
 *   PI-073 Frozen Squid Ring     1 pack    → 400 g        ← **사람 수정**(아이템만 바뀜) 무접촉
 *
 * ## 왜 액젓만 되돌리나 (Fable 판정)
 * - **액젓**: 거울이 `g/880`(1병 = 880 g) 이었고 레시피 3줄이 `120 g·5 g·12 g` 로 맞았다.
 *   `bottle/880` 은 "1병 = 880병" 이라 뜻이 안 되고, 그 3줄이 지금 단위 불일치다. 되돌린다.
 * - **K-소스 3건**: 덮인 건 맞지만 **결과가 더 맞다** — 붙은 레시피 줄 0, 아이템도 `kg`,
 *   레시피 단위로 `kg` 이 `piece` 보다 옳다(취급단위 = 내부 사용단위).
 *   `1 piece` 는 옛 모델에서 포장 이름이 취급단위 자리에 있던 것이라 되돌리면 병을 되살린다.
 *   **무접촉**하고 사람 몫 목록에만 남긴다(포장 이름은 화면에서 기준단위에 채우면 된다).
 * - **PI-073**: 거울은 안 바뀌고 아이템만 바뀌었다 = 사람이 화면에서 고친 것. 건드리지 않는다.
 *
 * ## 함께 하는 것 — 아이템 원가 복사 (수렴 스크립트에서 빠뜨린 규칙)
 * `unit_cost := 거울 값` 을 넣기로 해 놓고 UPDATE 문에 안 넣었다. 조건이 맞는 것만 채운다:
 *   `아이템 0 · 거울 > 0 · unit 동일 · base_quantity 동일`  (예상 18건)
 * 조건이 안 맞는 행은 목록만 낸다 — 기준이 다르면 가격의 뜻도 다르다.
 * ⛔ 공급업체 가격으로 채우는 125건은 **이 스크립트가 하지 않는다**(H2 별건, 규칙 미확정).
 *
 * ## 드라이런의 뜻 (2026-09-05 교훈)
 * **"적용 없이 결과만 보는 것" 이 아니라 "적용하고 되돌리는 것"** 이다.
 * 수렴 스크립트는 증명이 `if(APPLY)` 안에만 있어 드라이런 4회가 증명을 한 번도 안 돌렸고,
 * 자기모순이 운영에서야 드러났다. 여기서는 드라이런도 **적용 → 증명 → 무조건 롤백**이다.
 *
 * 단위 주의: `ratio` 는 무차원(새 base ÷ 옛 base). 금액에는 곱하지 않는다.
 *
 * 사용: node scripts/migrate-restore-mirror-units-20260905.js [--dry-run]
 * ⚠ 기본이 적용이다(배포 루프는 인자 없이 부른다).
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');

const DRY = process.argv.includes('--dry-run');
const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });
const run = (sql, r, t) => sequelize.query(sql, { replacements: r, transaction: t });
const num = (v) => (v == null ? null : parseFloat(v));

/** 손상 지문 — **현재 상태가 정확히 이것일 때만** 손댄다(멱등, 이미 복구됐으면 건너뜀). */
const DAMAGED = [{
  mirrorId: 40,
  damaged: { unit: 'bottle', base_quantity: 880 },
  restore: { unit: 'g', base_quantity: 880, package_unit: 'bottle', package_quantity: 1 },
  why: '2026-09-05 옛 코드 동기화로 g→bottle 덮임 (12시 스냅샷 g/880)',
}];

async function main() {
  const t = await sequelize.transaction();
  const report = { restored: [], costCopied: [], costSkipped: [], untouched: [] };
  try {
    // ── 1. 덮인 거울 복구 ────────────────────────────────────────────────────
    for (const d of DAMAGED) {
      const [m] = await q(`SELECT id, name, unit, base_quantity, unit_cost, current_stock, source_product_ingredient_id
                             FROM ingredients WHERE id = :id`, { id: d.mirrorId }, t);
      if (!m) { report.untouched.push(`ing#${d.mirrorId} 없음`); continue; }
      if (String(m.unit) !== d.damaged.unit || num(m.base_quantity) !== d.damaged.base_quantity) {
        report.untouched.push(`ing#${d.mirrorId} 손상 지문 불일치(현재 ${m.base_quantity} ${m.unit}) — 이미 복구됐거나 다른 손, 건너뜀`);
        continue;
      }
      // 재고가 남아 있으면 환산이 필요해진다 — 이 스크립트 범위 밖이므로 멈춘다.
      const [ov] = await q(`SELECT COUNT(*) n FROM restaurant_ingredient_stocks WHERE ingredient_id = :id AND current_stock <> 0`, { id: m.id }, t);
      if (num(m.current_stock) !== 0 || Number(ov.n) > 0) {
        throw new Error(`ing#${m.id} 재고가 0이 아니다(행 ${m.current_stock} · 오버레이 ${ov.n}) — 환산 판단이 필요하니 중단`);
      }
      await run(`UPDATE ingredients SET unit = :u, base_quantity = :b, package_unit = :pu, package_quantity = :pq WHERE id = :id`,
        { u: d.restore.unit, b: d.restore.base_quantity, pu: d.restore.package_unit, pq: d.restore.package_quantity, id: m.id }, t);
      report.restored.push(`ing#${m.id} ${m.name}: ${m.base_quantity} ${m.unit} → ${d.restore.base_quantity} ${d.restore.unit} (기준 ${d.restore.package_quantity} ${d.restore.package_unit})`);

      // 아이템도 같은 값으로 (거울과 갈라지면 다음 동기화가 또 덮는다)
      if (m.source_product_ingredient_id) {
        const [pi] = await q(`SELECT id, code, unit, base_quantity FROM product_ingredients WHERE id = :id`, { id: m.source_product_ingredient_id }, t);
        if (pi) {
          const ratio = d.restore.base_quantity / (num(pi.base_quantity) || 1);
          await run(`UPDATE product_ingredients SET unit = :u, base_quantity = :b, package_unit = :pu, package_quantity = :pq WHERE id = :id`,
            { u: d.restore.unit, b: d.restore.base_quantity, pu: d.restore.package_unit, pq: d.restore.package_quantity, id: pi.id }, t);
          report.restored.push(`  ${pi.code} 아이템도 ${pi.base_quantity} ${pi.unit} → ${d.restore.base_quantity} ${d.restore.unit}`);
          // 판매단위가 **덮이기 전 취급단위**(= 지금의 기준단위)와 같은 매핑만 ×ratio
          if (ratio !== 1) {
            const maps = await q(`SELECT isp.id FROM ingredient_seller_products isp
                                    JOIN supplier_products sp ON sp.id = isp.seller_product_id AND isp.seller_type = 'supplier'
                                   WHERE isp.product_ingredient_id = :id AND LOWER(sp.unit) = LOWER(:su)`,
              { id: pi.id, su: d.restore.package_unit }, t);
            if (maps.length) {
              await run(`UPDATE ingredient_seller_products SET unit_conversion = unit_conversion * :r WHERE id IN (:ids)`,
                { r: ratio, ids: maps.map((x) => x.id) }, t);
              report.restored.push(`  매핑 ${maps.length}건 ×${ratio}`);
            }
          }
        }
      }
    }

    // ── 1-b. 아이템 ↔ 거울 단위 불일치 정합 ─────────────────────────────────
    //   P1 수렴 뒤에도 남은 쌍이 있다(운영 실측: PI-139 볶은참깨 1건 — 이름 500 g 과 거울 1000 g 이
    //   충돌해 리뷰로 빠지면서 아이템만 `pack/1` 로 남았다). 이 상태에서 아이템을 저장하면
    //   동기화가 거울을 덮는다 — 방금 넣은 가드가 코드로는 막지만, **데이터도 맞춰 둔다.**
    //   규칙: 거울에 레시피 줄이 있으면 **아이템을 거울에 맞춘다**(줄이 진실이다).
    //         줄이 없으면 거울을 아이템에 맞춘다(K-소스와 같은 논리).
    //   ⛔ 이름의 숫자(500 g)는 채택하지 않는다 — 기존값(1000 g)과 2배 차이라 사람 확인 대상이다.
    const pairs = await q(`SELECT pi.id pi_id, pi.code, pi.name, pi.unit pu, pi.base_quantity pb,
                                  i.id ing_id, i.unit iu, i.base_quantity ib,
                                  (SELECT COUNT(*) FROM recipe_ingredients ri WHERE ri.ingredient_id = i.id) lines_n
                             FROM product_ingredients pi JOIN ingredients i ON i.source_product_ingredient_id = pi.id
                            WHERE pi.is_active = 1 AND pi.unit <> i.unit`, {}, t);
    for (const p of pairs) {
      if (Number(p.lines_n) > 0) {
        // 아이템을 거울에 맞춘다. 덮이기 전 아이템 단위는 **기준단위**로 살린다(1 pack = 1000 g).
        await run(`UPDATE product_ingredients SET unit = :u, base_quantity = :b,
                          package_unit = COALESCE(package_unit, :pu), package_quantity = COALESCE(package_quantity, 1)
                    WHERE id = :id`,
          { u: p.iu, b: num(p.ib), pu: p.pu, id: p.pi_id }, t);
        report.restored.push(`${p.code} ${String(p.name).slice(0, 30)}: 아이템 ${p.pb} ${p.pu} → ${p.ib} ${p.iu} (거울 기준 · 줄 ${p.lines_n}개) · 기준 1 ${p.pu}`);
      } else {
        await run(`UPDATE ingredients SET unit = :u, base_quantity = :b WHERE id = :id`,
          { u: p.pu, b: num(p.pb), id: p.ing_id }, t);
        report.restored.push(`${p.code} ${String(p.name).slice(0, 30)}: 거울 ${p.ib} ${p.iu} → ${p.pb} ${p.pu} (줄 0개라 아이템 기준)`);
      }
    }

    // ── 2. 아이템 원가 복사 (수렴에서 빠진 규칙) ─────────────────────────────
    const costRows = await q(`SELECT pi.id, pi.code, pi.name, pi.unit pu, pi.base_quantity pb, pi.unit_cost pc,
                                     i.unit iu, i.base_quantity ib, i.unit_cost ic
                                FROM product_ingredients pi
                                JOIN ingredients i ON i.source_product_ingredient_id = pi.id
                               WHERE pi.is_active = 1 AND (pi.unit_cost = 0 OR pi.unit_cost IS NULL) AND i.unit_cost > 0`, {}, t);
    for (const r of costRows) {
      const same = String(r.pu) === String(r.iu) && num(r.pb) === num(r.ib);
      if (!same) {
        report.costSkipped.push(`${r.code} ${String(r.name).slice(0, 30)} — 기준이 다름(아이템 ${r.pb} ${r.pu} ↔ 거울 ${r.ib} ${r.iu}) · 거울가 ${r.ic}`);
        continue;
      }
      await run(`UPDATE product_ingredients SET unit_cost = :c WHERE id = :id`, { c: r.ic, id: r.id }, t);
      report.costCopied.push(`${r.code} ${String(r.name).slice(0, 30)}: 0 → ${r.ic} (${r.pb} ${r.pu} 당)`);
    }

    // ── 3. 증명 ─────────────────────────────────────────────────────────────
    const [v011] = await q(`SELECT COUNT(*) n FROM recipe_ingredients ri JOIN ingredients i ON i.id = ri.ingredient_id WHERE ri.unit <> i.unit`, {}, t);
    const [v014] = await q(`SELECT COUNT(*) n FROM product_ingredients pi JOIN ingredients i ON i.source_product_ingredient_id = pi.id
                             WHERE pi.is_active = 1 AND (pi.unit_cost = 0 OR pi.unit_cost IS NULL) AND i.unit_cost > 0
                               AND pi.unit = i.unit AND pi.base_quantity = i.base_quantity`, {}, t);
    console.log(`\n복구 ${report.restored.length}줄 · 원가 복사 ${report.costCopied.length}건 · 기준 달라 건너뜀 ${report.costSkipped.length}건`);
    report.restored.forEach((x) => console.log('  ' + x));
    report.costCopied.forEach((x) => console.log('  💰 ' + x));
    report.costSkipped.forEach((x) => console.log('  ⏭  ' + x));
    report.untouched.forEach((x) => console.log('  ○ ' + x));
    console.log(`\n증명 ① 레시피 줄 단위 불일치 ${v011.n} (기대 1 — 육개장 ri#1300 은 원래부터이며 Irene 확인 대상)`);
    const [v016] = await q(`SELECT COUNT(*) n FROM product_ingredients pi JOIN ingredients i ON i.source_product_ingredient_id = pi.id
                             WHERE pi.is_active = 1 AND pi.unit <> i.unit`, {}, t);
    console.log(`증명 ② 조건 맞는데 원가 안 채워진 행 ${v014.n} (기대 0)`);
    console.log(`증명 ③ 아이템 ↔ 거울 단위 불일치 ${v016.n} (기대 0)`);
    if (Number(v011.n) > 1) throw new Error(`증명 ① 실패 — 불일치 ${v011.n}건(기대 1) · 되돌린다`);
    if (Number(v014.n) !== 0) throw new Error(`증명 ② 실패 — ${v014.n}건 남음 · 되돌린다`);
    if (Number(v016.n) !== 0) throw new Error(`증명 ③ 실패 — 아이템↔거울 단위 불일치 ${v016.n}건 · 되돌린다`);

    if (DRY) {
      await t.rollback();
      console.log('\n○ 드라이런 — 적용했다가 **되돌렸습니다**(증명은 위에서 실제로 돌았습니다).');
    } else {
      await t.commit();
      console.log('\n✅ 적용 완료');
    }
    process.exit(0);
  } catch (e) {
    await t.rollback().catch(() => {});
    console.error('❌ 실패 — 롤백:', e.message);
    process.exit(1);
  }
}

if (require.main === module) main();
module.exports = { DAMAGED };
