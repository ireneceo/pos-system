#!/usr/bin/env node
/**
 * 읽기 전용 보고서 — 공급업체 상품 옵션을 실제로 썼는가 (2026-10-15 Fable 설계 §3-5 · 쓰기 0)
 *   ① 업체별 옵션 그룹 수·옵션 수·가격 붙은 옵션(조정액 ≠ 0) 수·옵션이 붙은 상품 수
 *   ② 예전 방식 발주 — 머리 메모에 «[Options]» 가 들어간 발주(옵션 가격이 저장되지 않고 기본가로 저장·청구된 것)
 *   ③ 새 방식 발주 줄 — purchase_order_items.options 가 있는 줄(칸이 없는 DB 면 건너뜀)
 *   결과는 목록 보고만 한다 — 지난 발주는 고치지 않는다(보낸 뒤 금액 차이는 인보이스 대조 몫).
 * 사용: node scripts/report-supplier-options-usage.js          (개발 DB)
 *       node scripts/report-supplier-options-usage.js --prod   (운영 — scripts/prod-query.js 읽기 전용 경로)
 */
const Q1 = `SELECT g.supplier_company_id AS company_id, sc.name AS company,
  COUNT(DISTINCT g.id) AS option_groups, COUNT(o.id) AS options,
  SUM(o.price_adjustment <> 0) AS priced_options,
  (SELECT COUNT(DISTINCT gp.product_id) FROM supplier_product_option_group_products gp
     JOIN supplier_product_option_groups g2 ON g2.id = gp.option_group_id WHERE g2.supplier_company_id = g.supplier_company_id) AS products_with_options
  FROM supplier_product_option_groups g
  LEFT JOIN supplier_product_options o ON o.option_group_id = g.id
  LEFT JOIN supplier_companies sc ON sc.id = g.supplier_company_id
  GROUP BY g.supplier_company_id, sc.name ORDER BY g.supplier_company_id`;
const Q2 = `SELECT po.id, po.po_number, po.status, po.entity_type, po.entity_id, po.seller_type, po.seller_entity_id,
  po.total_amount, po.currency, po.created_at, REPLACE(LEFT(po.notes, 200), '\\n', ' | ') AS notes
  FROM purchase_orders po WHERE po.notes LIKE '%[Options]%' AND po.deleted_at IS NULL ORDER BY po.id`;
const Q3 = `SELECT COUNT(*) AS lines_with_options FROM purchase_order_items WHERE options IS NOT NULL`;

async function runDev() {
  require('dotenv/config');
  const { sequelize } = require('../config/database');
  const q = (s) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT });
  console.log('① 업체별 옵션'); console.table(await q(Q1));
  console.log('② «[Options]» 메모가 든 발주 (옵션 가격이 저장되지 않은 예전 방식)'); console.table(await q(Q2));
  try { console.log('③ 옵션 스냅샷이 있는 발주 줄'); console.table(await q(Q3)); }
  catch (e) { console.log('   (options 칸 없음 — 이 DB 는 아직 새 방식 전)'); }
  process.exit(0);
}

function runProd() {
  const { execFileSync } = require('child_process');
  const pq = require('path').join(__dirname, 'prod-query.js');
  for (const [label, sql] of [['① 업체별 옵션', Q1], ['② «[Options]» 메모가 든 발주', Q2], ['③ 옵션 스냅샷이 있는 발주 줄', Q3]]) {
    console.log(label);
    try { process.stdout.write(execFileSync('node', [pq, sql], { encoding: 'utf8' })); }
    catch (e) { console.log(`   (실패: ${String(e.stderr || e.message).split('\n')[0]})`); }
  }
  process.exit(0);
}

(process.argv.includes('--prod') ? runProd : runDev)();
