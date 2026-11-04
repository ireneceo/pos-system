// 일회성 · 운영 전용 — PO-R10-20261101-003(Guan Kee Poultry) 매장 수정 되돌리기
// (2026-11-04 Irene «이 상품은 발주 전 90.70 가격의 항목으로 돌려줘»)
//
// 하는 일: 이 발주의 «마지막 매장 수정(amended · by_buyer)» 이력에 남은 «고치기 전» 줄 값(수량·단가·줄 금액)으로
//   지금 줄을 되돌리고, 합계를 다시 계산해 그 이력의 total_before(90.70)와 같을 때만 저장한다.
//   상태는 그 수정 직후 «승인 대기» 이력이 적어 둔 status_before 로(오너가 이미 승인했던 발주면 submitted — 승인 기록 approved_at 은 그대로).
//   이력에 «store_edit_reverted» 한 줄을 남긴다. 메일·알림은 보내지 않는다.
// 안전: 트랜잭션 · 발주 행 잠금 · 조건 하나라도 다르면 ROLLBACK(아무것도 안 바뀜) · 전후 출력.
// 실행(운영): scp 로 /tmp 에 올려 production-backend 에서 node. 개발 리허설: PH_ROOT=/var/www/dev-backend PO_NUMBER=<시험 발주>
const ROOT = process.env.PH_ROOT || '/var/www/production-backend';
const PO_NUMBER = process.env.PO_NUMBER || 'PO-R10-20261101-003';
const EXPECT_BEFORE = process.env.EXPECT_BEFORE ? Number(process.env.EXPECT_BEFORE) : 90.70;
process.chdir(ROOT);
const { sequelize } = require(`${ROOT}/config/database`);
const { computeTotalsWithDelivery } = require(`${ROOT}/utils/purchaseOrderTotals`);
const near = (a, b) => Math.abs(Number(a) - Number(b)) < 0.005;
const r2 = (n) => Math.round(Number(n) * 100) / 100;
const OWNER_NOTE = /^(Approved by Owner|Pre-approved by Owner|Submitted by Owner)/;

(async () => {
  const show = async (label, id) => {
    const [[p]] = await sequelize.query('SELECT id, po_number, status, subtotal, tax_amount, delivery_fee, total_amount, approved_at, submitted_at, payment_status, trade_invoice_id FROM purchase_orders WHERE id = ?', { replacements: [id] });
    const [items] = await sequelize.query('SELECT id, description, quantity_ordered, quantity_received, unit_price, line_total, shipped_at FROM purchase_order_items WHERE purchase_order_id = ? ORDER BY id', { replacements: [id] });
    console.log(label, JSON.stringify(p));
    items.forEach((i) => console.log('   ', JSON.stringify(i)));
  };
  const [[head]] = await sequelize.query('SELECT id FROM purchase_orders WHERE po_number = ? AND deleted_at IS NULL', { replacements: [PO_NUMBER] });
  if (!head) { console.log('NOT FOUND', PO_NUMBER); process.exit(1); }
  await show('BEFORE', head.id);

  const t = await sequelize.transaction();
  try {
    const [[po]] = await sequelize.query('SELECT * FROM purchase_orders WHERE id = ? FOR UPDATE', { replacements: [head.id], transaction: t });
    let ti = po.tracking_info;
    if (typeof ti === 'string') ti = JSON.parse(ti);
    const events = (ti && Array.isArray(ti.events)) ? ti.events : [];
    let ai = -1;
    for (let i = events.length - 1; i >= 0; i--) if (events[i].status === 'amended' && events[i].by_buyer) { ai = i; break; }
    if (ai < 0) throw new Error('매장 수정 이력이 없음');
    const am = events[ai];
    console.log('AMEND EVENT', JSON.stringify(am));
    if (am.by_owner) throw new Error('마지막 수정이 오너 수정 — 대상 아님');
    if (!near(am.total_before, EXPECT_BEFORE)) throw new Error(`수정 전 총액 ${am.total_before} ≠ ${EXPECT_BEFORE}`);
    if (!near(po.total_amount, am.total_after)) throw new Error(`지금 총액 ${po.total_amount} ≠ 수정 후 ${am.total_after} — 그 뒤 또 바뀜`);
    if (po.payment_status === 'paid' || po.trade_invoice_id) throw new Error('결제·청구서가 있는 발주 — 손대지 않음');
    const gate = events.slice(ai + 1).find((e) => e.status === 'pending_approval' && e.edited_by_buyer);
    const later = events.slice(ai + 1).filter((e) => e !== gate);
    if (later.length) throw new Error(`수정 뒤 다른 이력 ${later.map((e) => e.status).join(',')} — 손으로 확인 필요`);
    const statusBack = gate ? gate.status_before : po.status;
    if (gate && po.status !== 'pending_approval') throw new Error(`지금 상태 ${po.status} — 승인 대기가 아님`);
    // 오너 손을 거친 발주였는지 — 수정 전 마지막 submitted 이력
    let ownerSigned = false;
    for (let i = ai - 1; i >= 0; i--) {
      if (events[i].status !== 'submitted') continue;
      ownerSigned = events[i].owner_signed === true || OWNER_NOTE.test(String(events[i].note || ''));
      break;
    }

    const changes = Array.isArray(am.changes) ? am.changes : [];
    if (!changes.length || changes.some((c) => c.type !== 'changed')) {
      throw new Error(`되돌릴 수 있는 것은 수량·단가 변경뿐 — 이력 ${changes.map((c) => c.type).join(',')}`);
    }
    const [items] = await sequelize.query('SELECT * FROM purchase_order_items WHERE purchase_order_id = ? ORDER BY id', { replacements: [po.id], transaction: t });
    if (items.some((i) => Number(i.quantity_received) > 0 || i.shipped_at)) throw new Error('받았거나 보낸 줄이 있음');
    for (const c of changes) {
      const hits = items.filter((i) => (i.description || null) === c.after.name
        && near(i.quantity_ordered, c.after.quantity) && near(i.unit_price, c.after.unit_price));
      if (hits.length !== 1) throw new Error(`줄 «${c.after.name}» 짝 ${hits.length}개`);
      const it = hits[0];
      const [res] = await sequelize.query(
        'UPDATE purchase_order_items SET quantity_ordered = ?, unit_price = ?, line_total = ?, updated_at = NOW() WHERE id = ? AND purchase_order_id = ?',
        { replacements: [c.before.quantity, c.before.unit_price, r2(c.before.line_total), it.id, po.id], transaction: t });
      if (res.affectedRows !== 1) throw new Error(`줄 ${it.id} 영향 ${res.affectedRows}`);
      Object.assign(it, { quantity_ordered: c.before.quantity, unit_price: c.before.unit_price, line_total: r2(c.before.line_total) });
      console.log('LINE', it.id, c.after.name, `${c.after.quantity} → ${c.before.quantity}`, `@${c.after.unit_price} → @${c.before.unit_price}`);
    }
    const totals = await computeTotalsWithDelivery(items, po, { orderCurrency: po.currency });
    if (!near(totals.total_amount, am.total_before)) throw new Error(`다시 계산한 총액 ${totals.total_amount} ≠ 수정 전 ${am.total_before}`);

    events.push({
      at: new Date().toISOString(),
      status: statusBack,
      note: `Store edit reverted — order restored to ${Number(am.total_before).toFixed(2)} (requested by platform admin)`,
      store_edit_reverted: true,
      reverted_event_at: am.at,
      total_before: Number(am.total_after),
      total_after: Number(totals.total_amount),
      ...(statusBack === 'submitted' && ownerSigned ? { owner_signed: true } : {})
    });
    const [res] = await sequelize.query(
      `UPDATE purchase_orders SET subtotal = ?, tax_amount = ?, delivery_fee = ?, delivery_fee_basis = ?, total_amount = ?, status = ?, tracking_info = ?, updated_at = NOW()
        WHERE id = ? AND status = ? AND total_amount = ?`,
      { replacements: [totals.subtotal, totals.tax_amount, totals.delivery_fee, JSON.stringify(totals.delivery_fee_basis), totals.total_amount,
        statusBack, JSON.stringify({ ...ti, events }), po.id, po.status, po.total_amount], transaction: t });
    if (res.affectedRows !== 1) throw new Error(`발주 영향 ${res.affectedRows}`);
    await t.commit();
    console.log('COMMIT', `status ${po.status} → ${statusBack}`, `total ${po.total_amount} → ${totals.total_amount}`, `ownerSigned=${ownerSigned}`);
  } catch (e) {
    await t.rollback();
    console.log('ROLLBACK (아무것도 안 바뀜):', e.message);
  }
  await show('AFTER', head.id);
  process.exit(0);
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
