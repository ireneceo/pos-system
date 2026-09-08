/**
 * 읽기 전용 운영 진단 (2026-09-08)
 *
 * 두 가지를 실측한다. **쓰기 없음** — SELECT 만 돈다.
 *   ① 통계: Irene 신고 "with MIN Cafe 가 Revenue/Orders/Customers 0 인데 Growth −100%"
 *      → 이전 기간에 실제 매출이 있었는지 대조한다. 있으면 −100% 는 계산상 정상이다.
 *   ② 거래 청구서 백필 대상: 수령이 끝났는데 거래 청구서가 없는 발주 목록·합계.
 *
 * 사용: node scripts/inspect-stats-and-trade-invoices.js
 */
const { sequelize } = require('../config/database');
const q = (sql, replacements) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, replacements });

(async () => {
  const dbName = (await q('SELECT DATABASE() db'))[0].db;
  console.log(`\n=== DB: ${dbName} · 읽기 전용 진단 ===\n`);

  // ── ① 통계: MIN 매장들의 기간별 매출
  console.log('── ① 통계 (Growth −100% 신고 대조) ──');
  const stores = await q(
    "SELECT id, name, status, is_demo FROM restaurants WHERE name LIKE '%MIN%' ORDER BY id");
  if (!stores.length) console.log('  이름에 MIN 이 든 매장 없음');
  for (const s of stores) {
    const rev = await q(
      `SELECT DATE_FORMAT(order_date, '%Y-%m') m,
              COUNT(*) orders,
              SUM(status IN ('completed','served')) rev_orders,
              ROUND(SUM(CASE WHEN status IN ('completed','served') THEN total_amount ELSE 0 END), 2) revenue,
              COUNT(DISTINCT customer_id) customers
         FROM orders WHERE restaurant_id = :id
        GROUP BY m ORDER BY m DESC LIMIT 8`, { id: s.id });
    console.log(`\n  [${s.id}] ${s.name} — status=${s.status} is_demo=${s.is_demo}`);
    if (!rev.length) { console.log('    주문 0건'); continue; }
    for (const r of rev) console.log(`    ${r.m}  주문 ${r.orders}건 / 매출인정 ${r.rev_orders}건 / 매출 ${r.revenue} / 고객 ${r.customers}`);
  }

  // ── ② 거래 청구서 누락 발주
  console.log('\n── ② 수령 완료인데 거래 청구서가 없는 발주 ──');
  const cols = await q("SHOW COLUMNS FROM purchase_orders LIKE 'status'");
  console.log('  purchase_orders.status ENUM =', cols[0] ? cols[0].Type : '(없음)');

  // 발주↔청구서 연결은 purchase_orders.trade_invoice_id 한 칸이다(invoices 쪽에 po 컬럼 없음).
  // 연결이 비었거나, 가리키는 청구서 행이 실제로 없는 경우(끊긴 링크) 둘 다 누락으로 센다.
  const orphans = await q(
    `SELECT po.id, po.po_number, po.status, po.total_amount, po.created_at, po.received_at,
            po.trade_invoice_id, po.payment_status,
            po.entity_type AS buyer_type, po.entity_id AS buyer_id,
            po.seller_type, po.seller_entity_id
       FROM purchase_orders po
       LEFT JOIN invoices i ON i.id = po.trade_invoice_id
      WHERE po.status IN ('received','partial_received')
        AND po.deleted_at IS NULL
        AND i.id IS NULL
      ORDER BY po.created_at`);
  console.log(`  누락 ${orphans.length}건 · 합계 ${orphans.reduce((a, o) => a + parseFloat(o.total_amount || 0), 0).toFixed(2)}`);
  for (const o of orphans) {
    console.log(`    #${o.id} ${o.po_number} ${o.status}/${o.payment_status} ${o.total_amount}  ` +
      `buyer=${o.buyer_type}:${o.buyer_id} seller=${o.seller_type}:${o.seller_entity_id} ` +
      `수령=${o.received_at ? String(o.received_at).slice(0, 10) : '-'} 링크=${o.trade_invoice_id ?? 'null'}`);
  }

  process.exit(0);
})().catch(e => { console.error('진단 실패:', e.message); process.exit(1); });
