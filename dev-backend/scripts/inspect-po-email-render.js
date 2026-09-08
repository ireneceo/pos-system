/**
 * 읽기 전용 (2026-09-08) — 발주 메일이 **지금** 만드는 품목 표를 그대로 찍는다.
 * 메일을 보내지 않는다. loadPoEmailItems() 를 그대로 호출해 결과만 출력한다.
 */
require('../models'); // 연관관계 등록 — 이걸 빼면 loadPoEmailItems 가 서버와 다르게 동작한다
const { sequelize } = require('../config/database');
const q = (sql, r) => sequelize.query(sql, { type: sequelize.QueryTypes.SELECT, replacements: r });

(async () => {
  const ids = process.argv.slice(2).map(Number).filter(Boolean);
  const { loadPoEmailItems } = require('../utils/poEmailItems');
  for (const id of ids) {
    const [po] = await q('SELECT id, po_number, status, seller_type, seller_entity_id, created_at, submitted_at, updated_at FROM purchase_orders WHERE id = :i', { i: id });
    if (!po) { console.log(`PO ${id} 없음`); continue; }
    console.log(`\n=== PO ${po.id} ${po.po_number} (${po.status}) seller=${po.seller_type}:${po.seller_entity_id}`);
    console.log(`    created=${po.created_at} submitted=${po.submitted_at} updated=${po.updated_at}`);
    const items = await loadPoEmailItems(po.id);
    console.log('    메일이 찍을 값 (Item / Qty+Unit / Unit price / Amount):');
    for (const it of items) {
      console.log(`      ${String(it.name).slice(0,46).padEnd(48)} ${it.quantity_ordered} ${it.unit || '(없음)'}   ${it.unit_price}   ${it.line_total}`);
    }
  }
  process.exit(0);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
