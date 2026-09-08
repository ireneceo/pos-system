/**
 * 읽기 전용 (2026-09-08) — 발주(Purchase Order)에서 나온 청구서의 «종류»를 실측한다.
 * Irene 검토 요청: Issued/Due 의 의미, 외부 공급업체에 마감일이 필요한가, 수령 정보가 왜 안 보이나.
 * ⛔ SELECT 만.
 */
require('../models');
const { sequelize } = require('../config/database');
const q = (s, r) => sequelize.query(s, { type: sequelize.QueryTypes.SELECT, replacements: r });

(async () => {
  console.log(`\n=== DB: ${(await q('SELECT DATABASE() db'))[0].db} · 발주 청구서 종류 ===\n`);

  const kinds = await q(`
    SELECT i.issuer_type,
           CASE WHEN sc.id IS NULL THEN '(공급업체 아님)'
                WHEN sc.is_system_registered = 1 THEN '가입 공급업체'
                ELSE '외부 공급업체' END seller_kind,
           i.invoice_category, i.status, COUNT(*) n,
           ROUND(SUM(i.total_amount),2) amount
      FROM invoices i
      JOIN purchase_orders po ON po.trade_invoice_id = i.id
      LEFT JOIN supplier_companies sc ON sc.id = po.seller_entity_id AND po.seller_type='supplier'
     GROUP BY i.issuer_type, seller_kind, i.invoice_category, i.status
     ORDER BY n DESC`);
  console.log('발주에서 나온 청구서 (발행자 × 판매자종류 × 상태):');
  for (const k of kinds) {
    console.log(`  ${String(k.issuer_type).padEnd(12)} ${k.seller_kind.padEnd(14)} ${String(k.invoice_category).padEnd(8)} ${String(k.status).padEnd(16)} ${String(k.n).padStart(3)}건  ${k.amount}`);
  }

  console.log('\n날짜 3종 비교 (발행 / 마감 / 주문 / 수령):');
  const rows = await q(`
    SELECT i.invoice_number, i.status,
           DATE(i.issued_at) issued, DATE(i.due_date) due,
           DATE(COALESCE(po.submitted_at, po.created_at)) ordered, DATE(po.received_at) received,
           po.po_number, po.status po_status, po.payment_status,
           CASE WHEN sc.is_system_registered = 1 THEN '가입' WHEN sc.id IS NOT NULL THEN '외부' ELSE '브랜드/FC' END kind,
           DATEDIFF(i.due_date, i.issued_at) due_gap
      FROM invoices i
      JOIN purchase_orders po ON po.trade_invoice_id = i.id
      LEFT JOIN supplier_companies sc ON sc.id = po.seller_entity_id AND po.seller_type='supplier'
     ORDER BY i.id DESC LIMIT 12`);
  for (const r of rows) {
    const d = (x) => (x ? String(x).slice(0, 10) : '—');
    console.log(`  ${r.invoice_number.padEnd(26)} ${r.kind.padEnd(9)} 발행 ${d(r.issued)} · 마감 ${d(r.due)}(+${r.due_gap}일) · 주문 ${d(r.ordered)} · 수령 ${d(r.received)} · ${r.po_status}/${r.payment_status}`);
  }

  console.log('\n마감일이 발행일보다 앞선(이미 지난) 청구서:');
  const overdueAtBirth = await q(`
    SELECT COUNT(*) n FROM invoices i JOIN purchase_orders po ON po.trade_invoice_id = i.id
     WHERE i.due_date < i.issued_at`);
  console.log(`  ${overdueAtBirth[0].n}건`);

  console.log('\n수령 전인데 청구서가 나간 발주:');
  const notReceived = await q(`
    SELECT po.po_number, po.status, i.invoice_number, i.status inv_status
      FROM purchase_orders po JOIN invoices i ON i.id = po.trade_invoice_id
     WHERE po.received_at IS NULL AND po.deleted_at IS NULL LIMIT 10`);
  console.log(`  ${notReceived.length}건`);
  for (const r of notReceived) console.log(`    ${r.po_number} (${r.status}) → ${r.invoice_number} (${r.inv_status})`);

  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
