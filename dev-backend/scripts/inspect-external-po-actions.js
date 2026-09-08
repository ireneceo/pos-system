/**
 * 읽기 전용 (2026-09-08) — 외부 공급업체 발주에서 «반품 요청»이 실제로 끝까지 가는가.
 * 반품은 **판매자가 승인/거절**해야 닫힌다(routes/po-returns.js). 외부 공급업체는 로그인이 없다.
 * ⛔ SELECT 만.
 */
require('../models');
const { sequelize } = require('../config/database');
const q = (s, r) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r });

(async () => {
  console.log(`\n=== DB: ${(await q('SELECT DATABASE() db'))[0].db} ===`);
  const rows = await q(`
    SELECT r.status,
           CASE WHEN sc.id IS NULL THEN '판매자=브랜드/푸드코트'
                WHEN sc.is_system_registered = 1 THEN '가입 공급업체'
                ELSE '외부 공급업체' END AS seller_kind,
           COUNT(*) n
      FROM purchase_order_returns r
      JOIN purchase_orders po ON po.id = r.purchase_order_id
      LEFT JOIN supplier_companies sc ON sc.id = po.seller_entity_id AND po.seller_type = 'supplier'
     GROUP BY r.status, seller_kind ORDER BY seller_kind, r.status`);
  console.log('\n반품 현황 (상태 × 판매자 종류):');
  if (!rows.length) console.log('  반품 기록 없음');
  for (const x of rows) console.log(`  ${x.seller_kind.padEnd(16)} ${String(x.status).padEnd(12)} ${x.n}건`);

  const ext = await q(`
    SELECT COUNT(*) n FROM purchase_orders po
      JOIN supplier_companies sc ON sc.id = po.seller_entity_id AND po.seller_type='supplier'
     WHERE sc.is_system_registered = 0 AND po.deleted_at IS NULL
       AND po.status IN ('received','partial_received','delivered')`);
  console.log(`\n반품 버튼이 뜨는 외부 공급업체 발주(수령 이후): ${ext[0].n}건`);
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
