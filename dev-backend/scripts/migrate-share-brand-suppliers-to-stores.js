#!/usr/bin/env node
/**
 * 브랜드 → 매장 공급업체 «상속» 종료 · 쓴 매장에 복사본 (2026-09-24 · Fable ⑥ 판정 1~3회차 · docs/SUPPLIER_CONTRACT_SYSTEM.md §H)
 *
 * 코드에서 브랜드 상속이 끝났다(utils/supplierAccess.findParentContract = null, 목록·권한도 자기 것만).
 * 그래서 지금 «공유(shared_with_stores=1)» 로 매장이 물려받아 쓰던 브랜드 업체는 매장에게 **복사본**으로 넘겨 줘야 끊기지 않는다.
 *
 * 규칙 (utils/supplierShare.decideCopy — 라우트와 같은 함수)
 *   - 매장이 그 업체를 «썼으면»(매장 발주 ≥1 · 매장 재료/상품 연결 ≥1 · 마지막 자기 켜기 행 active) 사본을 만든다.
 *     이력이 있는데 매장이 꺼 두었으면 사본도 꺼진 채(terminated). 이력 없고 켜 둔 적 없으면 만들지 않는다.
 *   - 매장 연결이 가리키는 지워진 원본 상품은 사본에도 지워진 채 복사한다(Fable 게이트 판정 2 — 연결·발주 줄 모양 그대로).
 *   - 사본을 만들 때 같은 트랜잭션에서 매장 연결·매장 발주·매장 지불 청구서 발행자·매장 원가 이력을 사본으로 옮긴다.
 *   - 한 업체의 모든 매장이 끝나면 그 브랜드 행 shared_with_stores=0 (더 이상 코드가 읽지 않는 칸 — 완료 표시).
 *     실패한 매장이 있으면 그 업체는 1 로 남겨 다음 배포에서 다시 시도하고, 종료 코드 1 로 크게 알린다.
 *   - 브랜드 쪽(브랜드 행·브랜드 재고아이템 연결·브랜드 발주·브랜드 지불 청구서)은 무접촉. 고아 연결(재료가 없음)은 건드리지 않고 목록만.
 *
 * 멱등: 사본은 (매장, 원본)당 하나(DB UNIQUE) · 이미 있으면 already_shared · 끝난 업체는 shared_with_stores=0 이라 다시 안 잡힌다.
 *
 * 사용:  node scripts/migrate-share-brand-suppliers-to-stores.js --dry-run   # 바꾸지 않고 무엇을 할지만
 *        node scripts/migrate-share-brand-suppliers-to-stores.js             # 적용 (registry: deploy)
 */
require('dotenv/config');
const { sequelize } = require('../config/database');
const { QueryTypes } = require('sequelize');
const { copySupplierToStore, storeUsage, decideCopy, findLiveCopy, findUnmappedLinks, findDeletedLinkedProducts, hasCopyColumn, ISSUER_MISMATCH_SQL } = require('../utils/supplierShare');

const TAG = '[migrate-share-brand-suppliers-to-stores]';
const DRY = process.argv.includes('--dry-run');

(async () => {
  // 적용(APPLY)은 출처 칸이 있어야 한다(앞 마이그). dry-run 은 칸이 없어도 돈다 — 칸 마이그 전 운영에서 미리 보기 위해(Fable 게이트 (b)).
  const hasCol = await hasCopyColumn();
  if (!hasCol && !DRY) { console.log(`${TAG} copied_from 칸 없음 — migrate-add-supplier-copy-columns 먼저. 건너뜀`); await sequelize.close(); process.exit(0); }
  if (!hasCol) console.log(`${TAG} (출처 칸 없음 — 사본이 아직 있을 수 없는 DB 로 보고 미리 보기만 한다)`);

  const sources = await sequelize.query(
    `SELECT id, name, registered_by_entity_id AS brand_id FROM supplier_companies
      WHERE is_system_registered = 0 AND registered_by_entity_type = 'brand' AND shared_with_stores = 1 AND deleted_at IS NULL
      ORDER BY id`, { type: QueryTypes.SELECT });
  console.log(`${TAG} ${DRY ? 'DRY-RUN' : 'APPLY'} — 공유 중인 브랜드 업체 ${sources.length}곳`);

  const tot = { created: 0, already: 0, skipped: 0, failed: 0, products: 0, links: 0, orders: 0, invoices: 0, cost_logs: 0, terminated: 0, unmapped: 0, deleted_links: 0, deleted_products: 0 };
  const clashes = []; const orphans = [];
  for (const src of sources) {
    const stores = await sequelize.query('SELECT id, name FROM restaurants WHERE brand_id = ? ORDER BY id', { replacements: [src.brand_id], type: QueryTypes.SELECT });
    const [[orph]] = await sequelize.query(
      "SELECT COUNT(*) n FROM ingredient_seller_products isp WHERE isp.seller_type = 'supplier' AND isp.seller_entity_id = ? AND isp.ingredient_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ingredients i WHERE i.id = isp.ingredient_id)",
      { replacements: [src.id] });
    if (Number(orph.n)) orphans.push(`#${src.id} ${src.name}: ${orph.n}`);
    let failedHere = 0;
    for (const st of stores) {
      const usage = await storeUsage(src.id, st.id);
      const d = decideCopy(usage);
      const live = await findLiveCopy(src.id, st.id);
      const clash = await sequelize.query(
        `SELECT id FROM supplier_companies WHERE registered_by_entity_type = 'restaurant' AND registered_by_entity_id = ? ${hasCol ? 'AND copied_from_supplier_company_id IS NULL' : ''} AND deleted_at IS NULL AND LOWER(TRIM(name)) = LOWER(TRIM(?))`,
        { replacements: [st.id, src.name], type: QueryTypes.SELECT });
      if (d.copy && clash.length) clashes.push(`매장 ${st.id} «${src.name}» — 매장 자기 행 #${clash.map(c => c.id).join(',')} 와 이름 같음(사본은 따로 생김)`);
      const head = `  #${src.id} ${src.name} → 매장 ${st.id} ${st.name}: 발주 ${usage.orders} · 연결 ${usage.links} · 자기 켜기 ${usage.lastOwnStatus || '-'}`;
      if (live) { tot.already++; console.log(`${head} → 이미 사본 #${live.id}`); continue; }
      if (!d.copy) { tot.skipped++; console.log(`${head} → 안 만듦(쓴 적 없음)`); continue; }
      if (DRY) {
        const unm = await findUnmappedLinks(src.id, st.id);
        if (unm.length) { tot.unmapped += unm.length; tot.failed++; console.log(`${head} → ✗ 매핑 안 되는 연결 ${unm.length} (ISP ${unm.map(u => u.id).join(',')}) — 적용 때 이 업체는 실패한다`); continue; }
        const [[p]] = await sequelize.query('SELECT COUNT(*) n FROM supplier_products WHERE supplier_company_id = ? AND deleted_at IS NULL', { replacements: [src.id] });
        const del = await findDeletedLinkedProducts(src.id, st.id);
        tot.deleted_links += del.links; tot.deleted_products += del.products.length;
        const [[inv]] = await sequelize.query("SELECT COUNT(*) n FROM invoices WHERE issuer_type = 'supplier' AND issuer_id = ? AND payer_type = 'restaurant' AND payer_id = ?", { replacements: [src.id, st.id] });
        const [[cl]] = await sequelize.query("SELECT COUNT(*) n FROM cost_change_logs WHERE seller_type = 'supplier' AND seller_entity_id = ? AND entity_type = 'restaurant' AND entity_id = ?", { replacements: [src.id, st.id] });
        console.log(`${head} → 사본 만들 예정(계약 ${d.contractStatus}) · 상품 ${p.n}${del.products.length ? ` + 지워진 채 ${del.products.length}(#${del.products.join(',')})` : ''} · 연결 ${usage.links} · 발주 ${usage.orders} · 청구서 ${inv.n} · 원가이력 ${cl.n}`);
        tot.created++; tot.products += Number(p.n); tot.links += usage.links; tot.orders += usage.orders; tot.invoices += Number(inv.n); tot.cost_logs += Number(cl.n);
        if (d.contractStatus === 'terminated') tot.terminated++;
        continue;
      }
      const t = await sequelize.transaction();
      try {
        const r = await copySupplierToStore({ sourceId: src.id, restaurantId: st.id, userId: null, contractStatus: d.contractStatus, transaction: t });
        await t.commit();
        if (r.status === 'created') {
          tot.created++; tot.products += r.products; tot.deleted_products += r.deleted_products; tot.links += r.links_moved; tot.orders += r.orders_moved; tot.invoices += r.invoices_moved; tot.cost_logs += r.cost_logs_moved;
          if (d.contractStatus === 'terminated') tot.terminated++;
          console.log(`${head} → 사본 #${r.copy_id}(계약 ${d.contractStatus}) · 상품 ${r.products}${r.deleted_products ? ` + 지워진 채 ${r.deleted_products}` : ''} · 연결 ${r.links_moved} · 발주 ${r.orders_moved} · 청구서 ${r.invoices_moved} · 원가이력 ${r.cost_logs_moved}`);
        } else { tot.already++; console.log(`${head} → 이미 사본 #${r.copy_id}`); }
      } catch (e) {
        await t.rollback(); failedHere++; tot.failed++;
        console.error(`${head} → ✗ 실패 ${e.code || ''} ${e.message}`);
      }
    }
    if (!DRY && failedHere === 0) {
      await sequelize.query('UPDATE supplier_companies SET shared_with_stores = 0 WHERE id = ?', { replacements: [src.id] });
    }
  }

  const [[mis]] = await sequelize.query(`SELECT COUNT(*) n ${ISSUER_MISMATCH_SQL}`);
  console.log(`${TAG} 합계 — 사본 ${DRY ? '예정 ' : ''}${tot.created}(꺼진 채 ${tot.terminated}) · 이미 ${tot.already} · 안 만듦 ${tot.skipped} · 실패 ${tot.failed}`);
  console.log(`${TAG}        상품 ${tot.products} · 매장 연결 ${tot.links} · 매장 발주 ${tot.orders} · 매장 청구서 ${tot.invoices} · 원가이력 ${tot.cost_logs}`);
  console.log(`${TAG} 매핑 안 되는 연결(상품 행 자체가 없음): ${tot.unmapped}`);
  console.log(`${TAG} 지워진 상품 참조: ${DRY ? `연결 ${tot.deleted_links}건 · ` : ''}상품 ${tot.deleted_products}개 — 사본도 지워진 채`);
  console.log(`${TAG} 고아 연결(재료 없음, 무접촉): ${orphans.length ? orphans.join(' / ') : '0'}`);
  console.log(`${TAG} 이름 같은 매장 자기 업체(사본은 따로 생김): ${clashes.length ? '\n    ' + clashes.join('\n    ') : '0'}`);
  console.log(`${TAG} 발주↔청구서 발행자 어긋남(S-SUP-004): ${mis.n}`);
  await sequelize.close();
  process.exit(tot.failed || Number(mis.n) ? 1 : 0);
})().catch(async (e) => { console.error(`${TAG} 실패:`, e.message); try { await sequelize.close(); } catch {} process.exit(1); });
