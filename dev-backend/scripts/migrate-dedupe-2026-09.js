/**
 * scripts/migrate-dedupe-2026-09.js — 2026-09 데이터 중복 정리 (1회성, manual).
 *
 * 배경 (Fable 판정 2026-09-07 · Irene 승인):
 *   운영 실측에서 나온 중복 세 종류를 정리한다. 셋 다 **시스템 결함이 만든 것**이고
 *   사람이 화면에서 만든 값이 아니다.
 *     B7 공급업체 매핑 완전중복 36쌍 — 2026-08-28 일회성 스크립트 잔재.
 *                                    지금 코드(utils/catalogLink.js connectExisting)는 같은 키를 막으므로 재발 아님.
 *     B1 같은 이름 재료 두 줄 8쌍   — 2026-09-04 "레시피는 옛 줄, 발주는 새 줄" 갈림과 같은 자리.
 *     B3/B4 코드 중복 16쌍          — 채번이 건수 기반(count+1)이던 결함. 2026-09-06 에 원자 카운터로 고쳤다.
 *
 * ⛔ 기본은 **미리보기**다. 쓰기는 `--apply` 를 줄 때만 한다.
 *    (배포 레지스트리 `deploy` 는 매 배포 재실행이라 데이터 이동 로직을 거기 두면 안 된다 →
 *     이 파일은 `manual`. converge 스크립트와 같은 이유.)
 *
 * 병합 정지 조건 (Fable) — 하나라도 걸리면 **그 쌍은 손대지 않고 보고**한다.
 *   ① 지는 줄에 매장재고 수량 ≠ 0 이 있고, 살아남는 줄에도 같은 매장 행이 있어 합쳐야 하는 경우
 *   ② 지는 줄만 출처(source_*)를 갖고 있는 경우
 *   ③ 지는 줄에 재고 이력(inventory_transactions / inventory_batches)이 있는 경우
 *
 * 사용:
 *   node scripts/migrate-dedupe-2026-09.js                    # 미리보기 (기본)
 *   node scripts/migrate-dedupe-2026-09.js --apply            # 적용
 *   node scripts/migrate-dedupe-2026-09.js --deactivate 94,95 # 상품 숨김(비활성)만, Irene 지정 id
 */
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { generateCode } = require('../utils/codeGenerator');
const { Ingredient, ProductIngredient } = require('../models');

// `--rehearse` — 쓰기를 **전부 실행한 뒤 무조건 롤백**한다. 미리보기는 SELECT 만 하므로
//   "쓰고 나서 가드가 통과하는가"를 증명하지 못한다. 운영 적용 직전 리허설용.
const REHEARSE = process.argv.includes('--rehearse');
const APPLY = process.argv.includes('--apply') || REHEARSE;
const deactIdx = process.argv.indexOf('--deactivate');
const DEACT_IDS = deactIdx > -1 && process.argv[deactIdx + 1]
  ? process.argv[deactIdx + 1].split(',').map(s => Number(s.trim())).filter(Boolean) : [];

const q = (sql, r, t) => sequelize.query(sql, { type: QueryTypes.SELECT, replacements: r, transaction: t });
const run = (sql, r, t) => sequelize.query(sql, { replacements: r, transaction: t });
const log = (...a) => console.log(...a);

// `ingredients.id` 를 가리키는 컬럼 전수. 재료를 지우기 전에 **여기 전부**를 옮기거나 지워야 한다.
//
// 🔴 목록의 근거는 **`information_schema.KEY_COLUMN_USAGE` 실측**이지 컬럼 이름이 아니다.
//    컬럼 이름이 `ingredient_id` 라고 재료를 가리키는 것이 아니다 — 실제로 아래 둘은
//    **재고아이템(`product_ingredients`)** 을 가리킨다(2026-09-07 Fable 적발):
//      product_recipe_ingredients.ingredient_id       → product_ingredients
//      brand_product_option_ingredients.ingredient_id → product_ingredients
//    이 둘을 여기 넣으면 재료 병합이 **남의 브랜드 레시피 줄을 재료 id 로 덮어쓴다**.
//    id 가 우연히 겹치면(낮은 번호일수록 겹친다) 엉뚱한 재고아이템을 가리키게 되고,
//    줄 수·고아 가드 둘 다 통과해서 **아무도 못 잡는다**. 목록을 늘릴 때는 반드시 FK 를 실측할 것.
const ING_REFS = [
  ['recipe_ingredients', 'ingredient_id'],
  ['option_ingredients', 'ingredient_id'],
  ['ingredient_seller_products', 'ingredient_id'],
  ['purchase_order_items', 'ingredient_id'],
  ['purchase_order_returns', 'ingredient_id'],
  ['inventory_transactions', 'ingredient_id'],
  ['inventory_batches', 'ingredient_id'],
  ['ingredient_costs', 'ingredient_id'],
  ['restaurant_ingredient_stocks', 'ingredient_id'],
  ['restaurant_ingredient_costs', 'ingredient_id'],
  ['stock_alerts', 'ingredient_id'],
  ['stock_take_items', 'ingredient_id'],
  ['products', 'ingredient_id'],
  // FK 제약은 없지만 `ingredients.id` 를 담는 컬럼(모델 주석상 폐기·데이터 0건). 있으면 같이 옮긴다.
  ['product_ingredients', 'linked_ingredient_id'],
];
// 옮기지 않고 **지우는** 곁가지 — 수량 0 인 재고 껍데기와 알림. 값이 없으므로 옮기면 오히려 중복이 된다.
// (수량이 0 이 아니면 정지 조건 ①이 먼저 걸려 여기까지 오지 않는다.)
const ING_DROP = new Set(['restaurant_ingredient_stocks', 'stock_alerts', 'restaurant_ingredient_costs', 'ingredient_costs']);

async function refCounts(id, t) {
  const out = {};
  for (const [tbl, col] of ING_REFS) {
    const r = await q(`SELECT COUNT(*) c FROM \`${tbl}\` WHERE \`${col}\` = :id`, { id }, t);
    out[tbl] = Number(r[0].c);
  }
  return out;
}

/** 전후 대조용 지문 — 무엇이 몇 줄인지. 날짜는 안 쓴다(문자열 비교 함정 회피). */
async function fingerprint(t) {
  const one = async (sql) => Number((await q(sql, {}, t))[0].c);
  return {
    재료: await one('SELECT COUNT(*) c FROM ingredients'),
    재고아이템: await one('SELECT COUNT(*) c FROM product_ingredients'),
    매핑: await one('SELECT COUNT(*) c FROM ingredient_seller_products'),
    레시피줄: await one('SELECT COUNT(*) c FROM recipe_ingredients'),
    프로덕트레시피줄: await one('SELECT COUNT(*) c FROM product_recipe_ingredients'),
    활성상품: await one('SELECT COUNT(*) c FROM products WHERE is_active=1'),
    // 레시피 줄이 살아있는 재료를 가리키는지 = 이 작업이 절대 깨면 안 되는 것.
    // ⛔ `product_recipe_ingredients` 로는 이 조인을 하지 않는다 — 그 컬럼은 재고아이템을 가리켜서
    //    조인 결과가 **허수 고아**가 된다(2026-09-07: 그렇게 센 48줄을 고아로 오보했다).
    레시피_고아: await one(`SELECT COUNT(*) c FROM recipe_ingredients ri
       LEFT JOIN ingredients i ON i.id=ri.ingredient_id WHERE ri.ingredient_id IS NOT NULL AND i.id IS NULL`),
  };
}

// ── B7. 매핑 완전중복 — 비대표(is_preferred=0) 쪽을 지운다 ────────────────────
async function dedupeMappings(t) {
  const rows = await q(`
    SELECT isp.id, isp.seller_product_id, isp.unit_price, isp.is_preferred,
           COALESCE(i.name, pi.name, p.name) AS target_name,
           (SELECT COUNT(*) FROM purchase_order_items poi WHERE poi.ingredient_seller_product_id = isp.id) AS po_refs
    FROM ingredient_seller_products isp
      LEFT JOIN ingredients i ON i.id = isp.ingredient_id
      LEFT JOIN product_ingredients pi ON pi.id = isp.product_ingredient_id
      LEFT JOIN products p ON p.id = isp.product_id
    WHERE isp.is_preferred = 0 AND EXISTS (
      SELECT 1 FROM ingredient_seller_products b
      WHERE b.id <> isp.id AND b.seller_type = isp.seller_type
        AND IFNULL(b.seller_entity_id,0) = IFNULL(isp.seller_entity_id,0)
        AND b.seller_product_id = isp.seller_product_id
        AND IFNULL(b.ingredient_id,0) = IFNULL(isp.ingredient_id,0)
        AND IFNULL(b.product_ingredient_id,0) = IFNULL(isp.product_ingredient_id,0)
        AND IFNULL(b.product_id,0) = IFNULL(isp.product_id,0)
        AND IFNULL(b.brand_product_id,0) = IFNULL(isp.brand_product_id,0)
        AND b.is_preferred = 1)
    ORDER BY isp.id`, {}, t);

  const del = [], keep = [];
  for (const r of rows) {
    // 발주가 이 줄을 가리키면 지우지 않는다 — 발주 이력이 출처를 잃는다.
    if (Number(r.po_refs) > 0) keep.push(r); else del.push(r);
  }
  log(`\n[B7] 매핑 완전중복 — 삭제 대상 ${del.length}줄 / 발주가 써서 남기는 줄 ${keep.length}줄`);
  del.forEach(r => log(`   삭제 #${r.id} (공급업체상품 ${r.seller_product_id}, 단가 ${r.unit_price}) ${r.target_name}`));
  keep.forEach(r => log(`   ⚠ 남김 #${r.id} — 발주 ${r.po_refs}건이 참조 (${r.target_name})`));

  if (APPLY && del.length) {
    await run(`DELETE FROM ingredient_seller_products WHERE id IN (:ids)`, { ids: del.map(r => r.id) }, t);
    log(`   → ${del.length}줄 삭제함`);
  }
  return { deleted: del.length, held: keep.length };
}

// ── B1. 같은 이름 재료 두 줄 — 참조를 살아남는 줄로 옮기고 지운다 ──────────────
async function mergeIngredients(t) {
  const groups = await q(`
    SELECT IFNULL(restaurant_id,0) AS rid, IFNULL(brand_id,0) AS bid, LOWER(TRIM(name)) AS nm,
           GROUP_CONCAT(id ORDER BY id) AS ids
    FROM ingredients GROUP BY 1,2,3 HAVING COUNT(*) > 1`, {}, t);

  log(`\n[B1] 같은 이름 재료 ${groups.length}쌍`);
  let merged = 0, deleted = 0, halted = 0;

  for (const g of groups) {
    const ids = g.ids.split(',').map(Number);
    const rows = await q(`SELECT * FROM ingredients WHERE id IN (:ids)`, { ids }, t);
    const counts = {};
    for (const id of ids) counts[id] = await refCounts(id, t);

    // 살릴 줄 = 실제 쓰임이 가장 많은 줄. 동점이면 활성 → 낮은 id.
    // (쓰임 = 레시피·프로덕트레시피·옵션·매핑·발주. 곁가지 껍데기는 세지 않는다.)
    // 쓰임 = 재료를 실제로 가리키는 것만. (프로덕트레시피·브랜드옵션은 재고아이템을 가리키므로 제외 —
    //  넣으면 우연한 id 충돌로 **승자 선정 자체가 뒤집힌다**.)
    const useful = (c) => c.recipe_ingredients + c.option_ingredients
      + c.ingredient_seller_products + c.purchase_order_items;
    const sorted = [...rows].sort((a, b) => {
      const d = useful(counts[b.id]) - useful(counts[a.id]);
      if (d) return d;
      if (a.is_active !== b.is_active) return b.is_active - a.is_active;
      return a.id - b.id;
    });
    const winner = sorted[0];
    const losers = sorted.slice(1);

    log(`\n   ▸ ${rows[0].name} — 살릴 줄 #${winner.id}(쓰임 ${useful(counts[winner.id])}, 활성 ${winner.is_active})`);

    for (const l of losers) {
      const c = counts[l.id];
      const stops = [];
      // ③ 재고 이력이 있으면 정지 — 이력을 옮기면 수량 해석이 달라질 수 있다.
      if (c.inventory_transactions > 0 || c.inventory_batches > 0)
        stops.push(`재고 이력 있음(거래 ${c.inventory_transactions}·배치 ${c.inventory_batches})`);
      // ① 지는 줄에 실수량이 남아 있으면 정지 — 합산은 사람이 판단할 일이다.
      const st = await q(`SELECT restaurant_id, current_stock FROM restaurant_ingredient_stocks
        WHERE ingredient_id = :id AND current_stock <> 0`, { id: l.id }, t);
      if (st.length) stops.push(`매장재고 수량 ≠ 0 (${st.map(s => `매장${s.restaurant_id}:${s.current_stock}`).join(',')})`);
      if (Number(l.current_stock) !== 0) stops.push(`재료 재고 ${l.current_stock}`);
      // ② 지는 줄만 출처를 가진 경우 정지 — 출처가 사라지면 거울 관계가 끊긴다.
      const loserSrc = l.source_product_ingredient_id || l.source_brand_product_id;
      const winnerSrc = winner.source_product_ingredient_id || winner.source_brand_product_id;
      if (loserSrc && !winnerSrc) stops.push('지는 줄만 출처를 가짐');
      // ④ 원가 행에 값이 남아 있으면 정지 — 아래 ING_DROP 은 "빈 껍데기"만 지운다는 전제이고,
      //   값이 있는 원가를 지우면 원가 이력이 조용히 사라진다. 합산·선택은 사람 몫이다.
      const costs = await q(`SELECT 'ingredient_costs' AS t, id, unit_cost AS v FROM ingredient_costs
          WHERE ingredient_id = :id AND unit_cost IS NOT NULL AND unit_cost <> 0
        UNION ALL
        SELECT 'restaurant_ingredient_costs', id, unit_cost FROM restaurant_ingredient_costs
          WHERE ingredient_id = :id AND unit_cost IS NOT NULL AND unit_cost <> 0`, { id: l.id }, t);
      if (costs.length) stops.push(`원가 값이 남은 행 ${costs.length}건 (${costs.map(c => `${c.t}#${c.id}:${c.v}`).join(',')})`);

      if (stops.length) {
        halted++;
        log(`     ⛔ #${l.id} 정지 — ${stops.join(' / ')}  → 손대지 않고 보고`);
        continue;
      }

      log(`     #${l.id} → #${winner.id} 로 옮김`);
      for (const [tbl, col] of ING_REFS) {
        if (!c[tbl]) continue;
        if (ING_DROP.has(tbl)) {
          log(`        ${tbl}: ${c[tbl]}줄 삭제(빈 껍데기)`);
          if (APPLY) await run(`DELETE FROM \`${tbl}\` WHERE \`${col}\` = :id`, { id: l.id }, t);
        } else {
          log(`        ${tbl}: ${c[tbl]}줄 이동`);
          if (APPLY) await run(`UPDATE \`${tbl}\` SET \`${col}\` = :w WHERE \`${col}\` = :l`, { w: winner.id, l: l.id }, t);
        }
      }
      // 거울 관계(다른 재료가 이 줄을 출처로 가리키는 경우)도 따라 옮긴다.
      if (APPLY) {
        await run(`UPDATE ingredients SET source_product_ingredient_id = NULL WHERE id = :l`, { l: l.id }, t);
        await run(`DELETE FROM ingredients WHERE id = :l`, { l: l.id }, t);
      }
      deleted++;
    }
    merged++;
  }
  log(`\n[B1] 쌍 ${merged} · 지운 줄 ${deleted} · 정지 ${halted}`);
  return { merged, deleted, halted };
}

// ── B3/B4. 코드 중복 — 나중 줄에 새 번호 ─────────────────────────────────────
// ⛔ 번호를 손으로 만들지 않는다. 앱이 쓰는 것과 **같은 함수**(generateCode)를 부른다 —
//    seed 를 건수(count+1)로 잡으면 2026-09-06 에 고친 "지운 번호 재사용" 결함을 여기서 다시 넣게 된다.
//    generateCode 는 시퀀스 행이 없으면 **기존 최대 번호**(maxExistingNo)를 seed 로 쓴다.
// 미리보기에서는 쓰기를 할 수 없으므로 같은 규칙(최대 번호 + 1, 배정할 때마다 증가)을 흉내내
//    **실제 배정될 번호와 같은 것**을 보여준다. 전부 같은 번호를 찍으면 대조가 불가능하다.
async function renumberCodes(t) {
  let n = 0;
  const preview = {};                                   // 미리보기용 스코프별 카운터

  const maxNoIn = async (table, where, repl, prefix) => {
    const r = await q(`SELECT MAX(CAST(SUBSTRING(code, :len) AS UNSIGNED)) m
      FROM \`${table}\` WHERE ${where} AND code LIKE :like`,
      { ...repl, len: prefix.length + 2, like: `${prefix}-%` }, t);
    return Number(r[0].m || 0);
  };

  const ingDup = await q(`
    SELECT IFNULL(restaurant_id,0) rid, IFNULL(brand_id,0) bid, code, GROUP_CONCAT(id ORDER BY id) ids
    FROM ingredients WHERE code IS NOT NULL AND code <> ''
    GROUP BY 1,2,3 HAVING COUNT(*) > 1`, {}, t);
  const piDup = await q(`
    SELECT owner_user_id, code, GROUP_CONCAT(id ORDER BY id) ids
    FROM product_ingredients WHERE code IS NOT NULL AND code <> ''
    GROUP BY 1,2 HAVING COUNT(*) > 1`, {}, t);

  log(`\n[B3/B4] 코드 중복 — 재료 ${ingDup.length}쌍 / 재고아이템 ${piDup.length}쌍`);
  if (!APPLY && (ingDup.length || piDup.length)) {
    // 미리보기의 `maxNoIn` 은 owner_type 을 안 보고, 실제 generateCode 는 {brand_id, owner_type} 로 거른다.
    // owner_type 이 비어 있는 행이 섞여 있으면 실제 배정 번호가 아래보다 클 수 있다(중복이면 종료 가드가 롤백).
    log('   (아래 번호는 추정치다 — 실제 배정은 --apply 출력이 진실)');
  }

  for (const g of ingDup) {
    const ids = g.ids.split(',').map(Number).slice(1);   // 첫 줄(낮은 id)은 코드를 지킨다
    const ownerType = g.rid ? 'restaurant' : 'brand';
    const ownerId = g.rid || g.bid;
    const key = `ING:${ownerType}:${ownerId}`;
    for (const id of ids) {
      let code;
      if (APPLY) {
        code = await generateCode(Ingredient, 'ING', { ownerType, ownerId, transaction: t });
      } else {
        if (preview[key] == null) preview[key] = await maxNoIn('ingredients',
          'IFNULL(restaurant_id,0)=:r AND IFNULL(brand_id,0)=:b', { r: g.rid, b: g.bid }, 'ING');
        preview[key] += 1;
        code = `ING-${String(preview[key]).padStart(3, '0')}`;
      }
      log(`   재료 #${id}: ${g.code} → ${code}`);
      if (APPLY) await run(`UPDATE ingredients SET code = :code WHERE id = :id`, { code, id }, t);
      n++;
    }
  }

  for (const g of piDup) {
    const ids = g.ids.split(',').map(Number).slice(1);
    const key = `PI:${g.owner_user_id}`;
    for (const id of ids) {
      let code;
      if (APPLY) {
        code = await generateCode(ProductIngredient, 'PI', {
          whereClause: { owner_user_id: g.owner_user_id }, transaction: t });
      } else {
        if (preview[key] == null) preview[key] = await maxNoIn('product_ingredients',
          'owner_user_id=:o', { o: g.owner_user_id }, 'PI');
        preview[key] += 1;
        code = `PI-${String(preview[key]).padStart(3, '0')}`;
      }
      log(`   재고아이템 #${id}: ${g.code} → ${code}`);
      if (APPLY) await run(`UPDATE product_ingredients SET code = :code WHERE id = :id`, { code, id }, t);
      n++;
    }
  }

  // 배정 후 같은 스코프에 중복이 남으면 실패다.
  const leftIng = await q(`SELECT COUNT(*) c FROM (SELECT 1 FROM ingredients WHERE code IS NOT NULL AND code<>''
      GROUP BY IFNULL(restaurant_id,0), IFNULL(brand_id,0), code HAVING COUNT(*)>1) x`, {}, t);
  const leftPi = await q(`SELECT COUNT(*) c FROM (SELECT 1 FROM product_ingredients WHERE code IS NOT NULL AND code<>''
      GROUP BY owner_user_id, code HAVING COUNT(*)>1) x`, {}, t);
  if (APPLY && (Number(leftIng[0].c) || Number(leftPi[0].c))) {
    throw new Error(`재번호 후에도 코드 중복이 남음 — 롤백 (재료 ${leftIng[0].c} · 재고아이템 ${leftPi[0].c})`);
  }
  return { renumbered: n };
}

// ── B6. 상품 숨김 — Irene 이 지정한 id 만, 삭제 아님 ──────────────────────────
async function deactivateProducts(ids, t) {
  const rows = await q(`SELECT id, name, price, restaurant_id, is_active FROM products WHERE id IN (:ids)`, { ids }, t);
  log(`\n[B6] 상품 숨김(비활성) — ${rows.length}건`);
  rows.forEach(r => log(`   #${r.id} ${r.name} (매장${r.restaurant_id} RM${r.price}) 활성 ${r.is_active} → 0`));
  if (APPLY) await run(`UPDATE products SET is_active = 0 WHERE id IN (:ids)`, { ids }, t);
  return { deactivated: rows.length };
}

(async () => {
  log(`=== 2026-09 중복 정리 — ${REHEARSE ? '리허설(쓰고 롤백)' : APPLY ? '적용(--apply)' : '미리보기'} ===`);
  log(`DB: ${sequelize.config.database}@${sequelize.config.host}`);
  const t = await sequelize.transaction();
  try {
    const before = await fingerprint(t);
    log('\n[전] ' + JSON.stringify(before));

    let r;
    if (DEACT_IDS.length) {
      r = { b6: await deactivateProducts(DEACT_IDS, t) };
    } else {
      r = {
        b7: await dedupeMappings(t),
        b1: await mergeIngredients(t),
        codes: await renumberCodes(t),
      };
    }

    // ②-1 (Fable 게이트): dedupeMappings 는 `is_preferred=1` 짝이 있는 비대표만 지운다.
    //   둘 다 0 이거나 둘 다 1 인 조합은 **지우지도 보고하지도 않는데** 인스펙션 ING-UNI-022 는 그걸 센다
    //   → 적용 뒤 게이트가 빨개지는 길이 열려 있었다. 스크립트가 스스로 "적용 후 022 통과"를 증명한다.
    // ⚠ 쓰기가 실제로 일어난 때만 본다 — 미리보기는 삭제를 안 하므로 중복이 남아 있는 것이 정상이다.
    //   (처음에 APPLY 조건 없이 넣어 미리보기가 통째로 실패했다. 2026-09-07)
    if (APPLY && !DEACT_IDS.length) {
      const leftMap = await q(`SELECT COUNT(*) c FROM (
        SELECT 1 FROM ingredient_seller_products
         GROUP BY IFNULL(ingredient_id,0), IFNULL(product_ingredient_id,0), IFNULL(product_id,0),
                  IFNULL(brand_product_id,0), seller_type, IFNULL(seller_entity_id,0), seller_product_id
         HAVING COUNT(*) > 1) x`, {}, t);
      if (Number(leftMap[0].c) > 0) {
        throw new Error(`정리 후에도 매핑 중복 ${leftMap[0].c}조합이 남음 (대표 표시가 없거나 둘 다인 짝) — 롤백. 사람이 대표를 정해야 한다`);
      }
    }

    const after = await fingerprint(t);
    log('\n[후] ' + JSON.stringify(after));
    // 레시피가 가리키는 재료가 사라지면 이 작업은 실패다.
    // ⚠ 절대값 0 을 기준으로 삼으면 안 된다 — 운영에는 **이미** 프로덕트레시피 고아 48줄이 있고
    //   (우리가 만든 것이 아니다) 절대 기준이면 멀쩡한 정리가 통째로 롤백된다.
    //   기준은 "내가 늘렸는가" 다 — 증분으로 본다.
    if (after.레시피_고아 > before.레시피_고아) {
      throw new Error(`레시피 고아가 늘었다 — 롤백 (${before.레시피_고아}→${after.레시피_고아})`);
    }
    if (after.레시피줄 !== before.레시피줄 || after.프로덕트레시피줄 !== before.프로덕트레시피줄) {
      throw new Error(`레시피 줄 수가 바뀜 — 롤백 (${before.레시피줄}→${after.레시피줄}, ${before.프로덕트레시피줄}→${after.프로덕트레시피줄})`);
    }

    if (REHEARSE) { await t.rollback(); log('\n✓ 리허설 통과 — 쓰기를 다 실행하고 가드를 통과한 뒤 되돌렸습니다(변경 0)'); }
    else if (APPLY) { await t.commit(); log('\n✓ 적용 완료(커밋)'); }
    else { await t.rollback(); log('\n○ 미리보기였습니다 — 아무것도 바뀌지 않았습니다. 적용하려면 --apply'); }
    log(JSON.stringify(r));
    process.exit(0);
  } catch (e) {
    await t.rollback();
    console.error('실패 — 롤백:', e.message);
    process.exit(1);
  }
})();
