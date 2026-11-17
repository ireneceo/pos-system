// 운영 읽기 전용 (2026-11-17) — 승인됐는데 청구서에서 안 빠진 옛 반품(Credit Note 만 있음) 목록. 쓰기 없음.
const { sequelize } = require('/var/www/production-backend/config/database');
(async () => {
  try {
    const [rows] = await sequelize.query(`
      SELECT r.id rid, r.purchase_order_id po_id, po.po_number, po.seller_type, po.entity_type, po.entity_id,
             r.quantity, r.unit_price, ROUND(r.quantity * COALESCE(r.unit_price,0), 2) amount, r.resolved_at,
             cn.invoice_number cn_no, cn.total_amount cn_total,
             po.payment_status, po.payment_method, ti.invoice_number trd_no, ti.status trd_status, ti.total_amount trd_total,
             soa.invoice_number soa_no, soa.status soa_status
        FROM purchase_order_returns r
        JOIN purchase_orders po ON po.id = r.purchase_order_id
        LEFT JOIN invoices cn ON cn.id = r.credit_invoice_id
        LEFT JOIN invoices ti ON ti.id = po.trade_invoice_id
        LEFT JOIN invoices soa ON soa.id = ti.parent_soa_invoice_id
       WHERE r.status = 'approved'
       ORDER BY r.id`);
    console.log('approved returns:', rows.length);
    for (const x of rows) console.log(JSON.stringify(x));
    const [[c]] = await sequelize.query(`SELECT COUNT(*) n, SUM(status='requested') req FROM purchase_order_returns`);
    console.log('all returns:', JSON.stringify(c));
  } catch (e) { console.log('ERROR', e.message); }
  process.exit(0);
})();
