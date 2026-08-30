/**
 * 운영 정리: 2026-08-28 UGS 등록 사고 수습 (Fable 판정 B″ + Irene 승인 유지4/철회10)
 *
 * 배경:
 *   2026-08-28 세션에서 UGS 공급업체 상품을 GIT Consulting(brand 1) 판매상품으로 등록하면서
 *   **공급업체 원가를 판매가 자리에 그대로 복사**했다(마진 단계 누락). 등록 55종.
 *   또 utils/catalogLink.js 의 connectExisting() 중복 판정 키에 seller_product_id 가 들어 있어
 *   같은 재료 × 같은 판매자라도 상품 행이 다르면 새 링크를 만들었다 → 활성 연결 2개.
 *
 * Irene 승인(2026-08-30): 유지 4종(212·213·218·237) / 철회 10종.
 *
 * ⛔ 이 스크립트는 판매가를 **쓰지 않는다**. 0.00 백필도 하지 않는다.
 *    가격은 Irene 이 화면에서 채운다(원가를 판매가 자리에 옮기면 마진 0 을 심는 게 이번 사고였다).
 *
 * 실행:
 *   node scripts/cleanup-ugs-duplicate-products.js                 # dry-run (기본, 아무것도 안 바꿈)
 *   node scripts/cleanup-ugs-duplicate-products.js --apply         # 실제 적용 (비활성 모드)
 *   node scripts/cleanup-ugs-duplicate-products.js --apply --hard  # 행 삭제 모드
 *
 * 안전장치:
 *   - 기본이 dry-run. --apply 없이는 트랜잭션조차 열지 않는다.
 *   - 실행 전 대상 행 전체를 JSON 으로 덤프(--out, 기본 /tmp/ugs_cleanup_backup_<ts>.json).
 *   - 사전 점검이 하나라도 어긋나면 즉시 중단(fail-closed). 특히:
 *       · DB 이름이 기대와 다르면 중단
 *       · 중복 그룹이 [옛1 + 오늘1] 형태가 아니면 중단
 *       · FK 3테이블에 참조가 남아 있으면 중단
 *       · 발주가 참조하는 링크를 지우려 하면 중단 (선행 해소 필요)
 *   - 전 과정 단일 트랜잭션. 증명 쿼리 실패 시 롤백.
 */

require('dotenv').config({ quiet: true });
const fs = require('fs');
const { Sequelize, QueryTypes } = require('sequelize');

const APPLY = process.argv.includes('--apply');
const HARD = process.argv.includes('--hard');
const OUT = (process.argv.find(a => a.startsWith('--out=')) || '').split('=')[1]
  || `/tmp/ugs_cleanup_backup_${Date.now()}.json`;
const EXPECT_DB = (process.argv.find(a => a.startsWith('--db=')) || '').split('=')[1] || 'purple_production_db';

// ── Irene 승인 분류 (2026-08-30) ────────────────────────────────────────────
const KEEP = [212, 213, 218, 237];                                  // 유지 4종 — 건드리지 않는다
const WITHDRAW = [187, 189, 200, 202, 226, 227, 228, 229, 230, 232]; // 철회 10종
const DUPLICATE = [
  188, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 201, 203, 204, 205,
  206, 207, 208, 209, 210, 211, 214, 215, 216, 217, 219, 220, 221, 222, 223,
  224, 225, 231, 233, 234, 235, 236, 238, 239, 240, 241
];                                                                   // 중복 41종
const REGISTERED_2026_08_28 = [...KEEP, ...WITHDRAW, ...DUPLICATE];  // 55종 전체
const TARGETS = [...DUPLICATE, ...WITHDRAW];                         // 제거 대상 51종
const SELLER_BRAND_ID = 1;                                           // GIT Consulting

const log = (...a) => console.log(...a);
const fail = (msg) => { throw new Error(msg); };

(async () => {
  if (REGISTERED_2026_08_28.length !== 55) fail(`분류 합계가 55 가 아니다: ${REGISTERED_2026_08_28.length}`);
  if (new Set(REGISTERED_2026_08_28).size !== 55) fail('분류 목록에 중복 id 가 있다');

  const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost', dialect: 'mysql', logging: false
  });
  const q = (sql, replacements, transaction) =>
    sequelize.query(sql, { replacements, transaction, type: QueryTypes.SELECT });

  log(`\n${'='.repeat(70)}`);
  log(`UGS 중복/철회 정리  —  ${APPLY ? (HARD ? '적용(행 삭제)' : '적용(비활성)') : 'DRY-RUN (아무것도 안 바꿈)'}`);
  log('='.repeat(70));

  // ── 0. 어느 DB 인지부터 확인 ─────────────────────────────────────────────
  const [{ db }] = await q('SELECT DATABASE() db');
  log(`\n[0] DB = ${db}`);
  if (db !== EXPECT_DB) fail(`기대한 DB(${EXPECT_DB}) 가 아니다: ${db}. --db= 로 명시하지 않으면 진행하지 않는다.`);

  // ── 1. 대상 상품 실측 ────────────────────────────────────────────────────
  const products = await q(
    'SELECT id, name, unit_price, is_active FROM brand_products WHERE id IN (:ids) ORDER BY id',
    { ids: REGISTERED_2026_08_28 }
  );
  const found = new Set(products.map(p => p.id));
  const missing = REGISTERED_2026_08_28.filter(i => !found.has(i));
  log(`[1] 등록 55종 중 현존 ${products.length}종` + (missing.length ? ` — 이미 없는 것: ${missing.join(',')}` : ''));
  const keepRows = products.filter(p => KEEP.includes(p.id));
  if (keepRows.length !== KEEP.length) fail(`유지 4종이 온전하지 않다: ${keepRows.length}/${KEEP.length}`);
  log(`    유지 4종 정상 확인 (건드리지 않음): ${KEEP.join(', ')}`);

  // ── 2. 중복 그룹이 정말 [옛1 + 오늘1] 인가 ───────────────────────────────
  const groups = await q(`
    SELECT isp.id link_id, isp.ingredient_id, isp.seller_entity_id, isp.seller_product_id,
           isp.is_active, bp.unit_price product_price, bp.name product_name
    FROM ingredient_seller_products isp
    JOIN brand_products bp ON bp.id = isp.seller_product_id
    WHERE isp.seller_type = 'brand'
      AND isp.ingredient_id IN (
        SELECT ingredient_id FROM (
          SELECT ingredient_id FROM ingredient_seller_products
          WHERE is_active = 1 AND seller_type = 'brand'
          GROUP BY ingredient_id, seller_entity_id HAVING COUNT(*) > 1
        ) t
      )
    ORDER BY isp.ingredient_id, isp.id`);

  const byIngredient = new Map();
  for (const g of groups) {
    g.is_new = REGISTERED_2026_08_28.includes(g.seller_product_id);
    if (!byIngredient.has(g.ingredient_id)) byIngredient.set(g.ingredient_id, []);
    byIngredient.get(g.ingredient_id).push(g);
  }
  const malformed = [];
  for (const [ing, ls] of byIngredient) {
    const news = ls.filter(l => l.is_new).length;
    const olds = ls.filter(l => !l.is_new).length;
    if (news !== 1 || olds !== 1) malformed.push({ ingredient_id: ing, news, olds, total: ls.length });
  }
  log(`[2] 중복 그룹 ${byIngredient.size}개 — [옛1+오늘1] 형태 ${byIngredient.size - malformed.length}개`);
  if (malformed.length) {
    log('    ⚠ 예외 형태:', JSON.stringify(malformed));
    fail('중복 그룹이 기대 형태가 아니다 — 사람이 먼저 봐야 한다. 중단.');
  }

  // ── 3. 지울 링크 확정 (오늘 등록분 쪽만) ─────────────────────────────────
  const linksToRemove = await q(
    `SELECT id, ingredient_id, seller_product_id, is_active, unit_price
     FROM ingredient_seller_products
     WHERE seller_type = 'brand' AND seller_entity_id = :b AND seller_product_id IN (:ids)
     ORDER BY id`,
    { b: SELLER_BRAND_ID, ids: TARGETS }
  );
  log(`[3] 제거 대상 링크 ${linksToRemove.length}개 (상품 ${TARGETS.length}종)`);

  // ── 4. 발주가 물고 있는 링크가 있으면 먼저 사람이 해소해야 한다 ──────────
  const linkIds = linksToRemove.map(l => l.id);
  const poRefs = linkIds.length ? await q(
    `SELECT poi.id item_id, poi.purchase_order_id, po.po_number, po.status,
            poi.ingredient_seller_product_id link_id, poi.unit_price, poi.quantity_ordered, poi.line_total
     FROM purchase_order_items poi
     JOIN purchase_orders po ON po.id = poi.purchase_order_id
     WHERE poi.ingredient_seller_product_id IN (:ids)
     ORDER BY poi.id`, { ids: linkIds }) : [];

  // 취소된 발주의 참조는 막을 이유가 없다 — 비활성 모드에서는 링크 행이 그대로 남아
  // 이력 표시가 끊기지 않는다(끊김 여부는 아래 증명 쿼리 orphan_po_lines 가 계속 감시).
  // 이 구분이 없으면 PO-10 을 취소해도 참조 행은 남으므로 --apply 가 영원히 중단된다(자기 교착).
  // --hard(행 삭제) 는 링크 행이 사라져 이력이 실제로 끊기므로 취소분도 계속 중단 사유다.
  const blockingRefs = HARD ? poRefs : poRefs.filter(r => r.status !== 'cancelled');
  const cancelledRefs = poRefs.length - blockingRefs.length;

  log(`[4] 이 링크들을 참조하는 발주 라인 ${poRefs.length}건` +
      (cancelledRefs ? ` (그중 취소된 발주 ${cancelledRefs}건 — 비활성 모드에서는 중단 사유 아님)` : ''));
  for (const r of poRefs) {
    const mark = blockingRefs.includes(r) ? '⛔' : '  ';
    log(`   ${mark} ${r.po_number} (${r.status}) item ${r.item_id} → link ${r.link_id}, ${r.quantity_ordered} × ${r.unit_price} = ${r.line_total}`);
  }
  if (blockingRefs.length) {
    log(`    ⛔ 살아 있는 발주가 참조 중인 링크 ${blockingRefs.length}건 — PO 처리(취소)가 선행되어야 한다.`);
    if (APPLY) fail('발주 참조 미해소 상태에서는 적용하지 않는다. 중단.');
  }

  // ── 5. FK 3테이블 전수 확인 ──────────────────────────────────────────────
  const fk = {};
  for (const [label, table] of [
    ['brand_product_brands', 'brand_product_brands'],
    ['brand_product_option_group_products', 'brand_product_option_group_products'],
    ['brand_product_restaurants', 'brand_product_restaurants']
  ]) {
    fk[label] = await q(`SELECT product_id, COUNT(*) c FROM ${table} WHERE product_id IN (:ids) GROUP BY product_id`, { ids: TARGETS });
  }
  const fkTotal = Object.values(fk).reduce((n, rows) => n + rows.length, 0);
  log(`[5] FK 참조: brand_product_brands ${fk.brand_product_brands.length} / option_group_products ${fk.brand_product_option_group_products.length} / brand_product_restaurants ${fk.brand_product_restaurants.length}`);
  if (fkTotal > 0 && HARD) fail('FK 참조가 남아 있는데 --hard(행 삭제) 는 위험하다. 먼저 참조를 해소하라. 중단.');

  // ── 6. 백업 덤프 ─────────────────────────────────────────────────────────
  const backup = {
    taken_at: new Date().toISOString(), db, mode: APPLY ? (HARD ? 'delete' : 'deactivate') : 'dry-run',
    classification: { KEEP, WITHDRAW, DUPLICATE },
    products, links_to_remove: linksToRemove, duplicate_groups: [...byIngredient.entries()],
    po_refs: poRefs, fk
  };
  fs.writeFileSync(OUT, JSON.stringify(backup, null, 1));
  log(`[6] 백업 덤프 → ${OUT} (${(fs.statSync(OUT).size / 1024).toFixed(1)} KB)`);

  if (!APPLY) {
    log(`\n${'─'.repeat(70)}`);
    log('DRY-RUN 종료 — 아무것도 바꾸지 않았다.');
    log(`적용하려면: --apply ${HARD ? '--hard' : '(비활성 모드)'}`);
    log('─'.repeat(70));
    await sequelize.close();
    process.exit(0);
  }

  // ── 7. 적용 (단일 트랜잭션) ──────────────────────────────────────────────
  const t = await sequelize.transaction();
  try {
    let linkChanged = 0, prodChanged = 0;
    if (linkIds.length) {
      const [, n] = await sequelize.query(
        HARD ? 'DELETE FROM ingredient_seller_products WHERE id IN (:ids)'
             : 'UPDATE ingredient_seller_products SET is_active = 0, updated_at = NOW() WHERE id IN (:ids)',
        { replacements: { ids: linkIds }, transaction: t });
      linkChanged = n === undefined ? linkIds.length : n;
    }
    const [, m] = await sequelize.query(
      HARD ? 'DELETE FROM brand_products WHERE id IN (:ids)'
           : 'UPDATE brand_products SET is_active = 0, updated_at = NOW() WHERE id IN (:ids)',
      { replacements: { ids: TARGETS }, transaction: t });
    prodChanged = m === undefined ? TARGETS.length : m;
    log(`[7] 링크 ${linkChanged}건 · 상품 ${prodChanged}건 ${HARD ? '삭제' : '비활성'}`);

    // ── 8. 증명 쿼리 4종 ───────────────────────────────────────────────────
    const proof = {};
    proof.dup_active_links = (await q(`
      SELECT COUNT(*) c FROM (
        SELECT ingredient_id FROM ingredient_seller_products
        WHERE is_active = 1 AND seller_type = 'brand'
        GROUP BY ingredient_id, seller_entity_id HAVING COUNT(*) > 1) t`, {}, t))[0].c;
    proof.target_still_active = (await q(
      'SELECT COUNT(*) c FROM brand_products WHERE id IN (:ids) AND is_active = 1', { ids: TARGETS }, t))[0].c;
    proof.keep_intact = (await q(
      'SELECT COUNT(*) c FROM brand_products WHERE id IN (:ids) AND is_active = 1', { ids: KEEP }, t))[0].c;
    proof.orphan_po_lines = (await q(`
      SELECT COUNT(*) c FROM purchase_order_items poi
      LEFT JOIN ingredient_seller_products isp ON isp.id = poi.ingredient_seller_product_id
      WHERE poi.ingredient_seller_product_id IS NOT NULL AND isp.id IS NULL`, {}, t))[0].c;

    log('[8] 증명:');
    log(`      중복 활성 링크 잔존 ......... ${proof.dup_active_links} (기대 0)`);
    log(`      제거대상 상품 활성 잔존 ..... ${proof.target_still_active} (기대 0)`);
    log(`      유지 4종 온전 ............... ${proof.keep_intact} (기대 ${KEEP.length})`);
    log(`      끊어진 발주 라인 ............ ${proof.orphan_po_lines} (기대 0)`);

    const ok = proof.dup_active_links === 0 && proof.target_still_active === 0
      && proof.keep_intact === KEEP.length && proof.orphan_po_lines === 0;
    if (!ok) { await t.rollback(); fail('증명 쿼리 불통과 — 롤백했다.'); }

    await t.commit();
    log('\n✓ 적용 완료 (증명 4/4 통과)');
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    if (!t.finished) await t.rollback();
    throw e;
  }
})().catch(e => {
  console.error('\n✗ 중단:', e.message);
  process.exit(1);
});
