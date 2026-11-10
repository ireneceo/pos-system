#!/usr/bin/env node
/**
 * migrate-subscription-item-type-repair.js — «수정» 저장이 service 로 바꿔 놓은 구독 줄 되돌리기 (멱등 · 매 배포)
 *
 * 왜: 관리자 인보이스 «수정» 저장이 목록 응답의 줄(종류 없음)을 돌려보내고, 서버가 종류 없는 줄을 'service' 로
 *   저장했다 — 구독 청구서가 «서비스» 로 보였다(2026-11-08 Irene «구독항목 나간 거 같은데 서비스항목이라고 나오고»).
 *   저장 경로는 같은 날 고쳤다(routes/invoices-crud.js PUT · invoices-list itemType). 이 스크립트는 이미 바뀐 줄만 되돌린다.
 *
 * 대상(전부 만족할 때만 — 좁게 잡는다):
 *   청구서 분류 invoice_category='subscription' · 수정된 적 있음(is_modified=1) · 줄이 정확히 1개 ·
 *   그 줄이 'service' · subscription 줄 없음.
 *   (분류가 subscription 인데 진짜 서비스 줄을 더 붙인 청구서 — 예: 구독 + SMS 묶음 — 는 줄이 2개라 안 건드린다.)
 * 줄이 여러 개인 의심 건은 고치지 않고 번호만 출력한다(사람이 본다).
 * 실행: node scripts/migrate-subscription-item-type-repair.js [--dry-run]
 */
require('dotenv').config();
const { sequelize } = require('../config/database');

const DRY = process.argv.includes('--dry-run');

(async () => {
  const [targets] = await sequelize.query(`
    SELECT it.id AS item_id, i.id AS invoice_id, i.invoice_number, i.status
      FROM invoices i
      JOIN invoice_items it ON it.invoice_id = i.id
     WHERE i.invoice_category = 'subscription'
       AND i.is_modified = 1
       AND it.item_type = 'service'
       AND (SELECT COUNT(*) FROM invoice_items a WHERE a.invoice_id = i.id) = 1`);
  const [suspects] = await sequelize.query(`
    SELECT i.id AS invoice_id, i.invoice_number
      FROM invoices i
     WHERE i.invoice_category = 'subscription'
       AND i.is_modified = 1
       AND EXISTS (SELECT 1 FROM invoice_items s WHERE s.invoice_id = i.id AND s.item_type = 'service')
       AND NOT EXISTS (SELECT 1 FROM invoice_items s WHERE s.invoice_id = i.id AND s.item_type = 'subscription')
       AND (SELECT COUNT(*) FROM invoice_items a WHERE a.invoice_id = i.id) > 1`);

  let fixed = 0;
  for (const t of targets) {
    if (DRY) { console.log(`[dry] ${t.invoice_number} (#${t.invoice_id}, ${t.status}) item #${t.item_id} service → subscription`); fixed++; continue; }
    const [res] = await sequelize.query(
      `UPDATE invoice_items SET item_type = 'subscription' WHERE id = ? AND item_type = 'service'`,
      { replacements: [t.item_id] }
    );
    console.log(`[ok] ${t.invoice_number} (#${t.invoice_id}, ${t.status}) item #${t.item_id} → subscription (affected ${res.affectedRows ?? '?'})`);
    fixed++;
  }
  for (const s of suspects) console.log(`[check] ${s.invoice_number} (#${s.invoice_id}) — 줄 여러 개 · 구독 줄 없음 · 사람이 확인`);
  console.log(`subscription item type repair: ${DRY ? 'would fix' : 'fixed'} ${fixed} · to check ${suspects.length}`);
  process.exit(0);
})().catch(e => { console.error('[migrate-subscription-item-type-repair] ' + e.message); process.exit(1); });
