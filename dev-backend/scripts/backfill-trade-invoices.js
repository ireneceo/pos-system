/**
 * scripts/backfill-trade-invoices.js — 청구서가 빠진 "수령 완료" 발주에 거래 청구서를 뒤늦게 발행한다.
 *
 * 배경 (2026-09-07 실측 · Fable 판정 · Irene 승인):
 *   수령을 끝내는 길이 셋인데(`/receive` · `/mark-received` · `/receive-and-pay`) 청구서를 만드는 곳이
 *   `/receive` 하나뿐이었다. 매장이 실제로 쓰는 길은 나머지 둘이라, 운영에
 *   **청구서 없는 수령 발주 14건 / RM 4,020.57** 이 쌓였다. SOA 는 묶을 자식이 없어 0장이었다.
 *   코드는 고쳤고(헬퍼 `issueTradeInvoiceAfterCommit`), 이 스크립트는 **이미 쌓인 것**만 채운다.
 *
 * 🔴 발행일은 **실행하는 날**이다. 소급하지 않는다 —
 *    오늘 만드는 문서에 지난 달 날짜를 찍는 것이 오히려 조작이다.
 *    언제 받은 물건인지는 `createTradeInvoice` 가 비고에 `received YYYY-MM-DD` 로 남긴다.
 *    9월에 발행하면 10/1 월간 정산서가 자동으로 묶는다(별도 처리 없음).
 *
 * ⛔ 기본은 미리보기다. 쓰기는 `--apply` 를 줄 때만.
 * 멱등: `createTradeInvoice` 가 `trade_invoice_id` 로 막으므로 재실행이 두 장을 만들지 않는다.
 * 레지스트리에 넣지 않는다 — 일회성이고, 매 배포 재실행할 성질이 아니다.
 *
 * 사용:
 *   node scripts/backfill-trade-invoices.js            # 미리보기
 *   node scripts/backfill-trade-invoices.js --apply    # 발행
 */
const { PurchaseOrder, Invoice, Restaurant } = require('../models');
const { createTradeInvoice } = require('../services/purchaseOrderService');
const { sequelize } = require('../config/database');

/**
 * 발주 헤더 금액과 품목 합이 어긋나면 **건너뛴다**.
 *
 * 왜 (2026-09-07 Fable 게이트): 청구서 총액은 `finalizeInvoice` 가 **품목 합**으로 다시 계산한다.
 *   품목이 0건이거나 합이 헤더와 다르면, 발주 목록에 보이는 금액과 청구서 금액이 갈린다.
 *   dev 백필 실측에서 166장 중 151장이 "헤더 30 · 청구서 0" 으로 나왔다.
 *   그런 건은 사람이 발주를 먼저 고쳐야 한다 — 기계가 임의로 정할 값이 아니다.
 */
async function lineSum(poId) {
  const [r] = await sequelize.query(
    'SELECT COUNT(*) n, COALESCE(SUM(line_total),0) s FROM purchase_order_items WHERE purchase_order_id = :id',
    { replacements: { id: poId }, type: sequelize.QueryTypes.SELECT });
  return { count: Number(r.n), sum: Math.round(Number(r.s) * 100) / 100 };
}

const APPLY = process.argv.includes('--apply');

async function targets() {
  return PurchaseOrder.findAll({
    where: { status: 'received', trade_invoice_id: null, deleted_at: null },
    order: [['id', 'ASC']]
  });
}

(async () => {
  console.log(`=== 거래 청구서 백필 — ${APPLY ? '발행(--apply)' : '미리보기'} ===`);
  console.log(`DB: ${sequelize.config.database}@${sequelize.config.host}`);

  const list = await targets();
  if (list.length === 0) { console.log('\n대상 없음 — 채울 것이 없습니다.'); process.exit(0); }

  const names = new Map();
  const rids = [...new Set(list.filter(p => p.entity_type === 'restaurant').map(p => p.entity_id))];
  if (rids.length) (await Restaurant.findAll({ where: { id: rids }, attributes: ['id', 'name'] }))
    .forEach(r => names.set(r.id, r.name));

  let total = 0;
  const ok = [], skipped = [];
  console.log(`\n대상 ${list.length}건:`);
  for (const po of list) {
    const paid = po.payment_status === 'paid';
    const ls = await lineSum(po.id);
    const header = Math.round(Number(po.total_amount || 0) * 100) / 100;
    const mismatch = ls.count === 0 ? '품목 0건'
      : (Math.abs(ls.sum - header) > 0.01 ? `헤더 ${header} ≠ 품목합 ${ls.sum}` : null);
    (mismatch ? skipped : ok).push({ po, header });
    if (!mismatch) total += header;
    console.log(`   ${po.po_number}  ${po.currency || 'MYR'} ${header}  품목 ${ls.count}건/합 ${ls.sum}  `
      + `판매자 ${po.seller_type}#${po.seller_entity_id}  구매 ${names.get(po.entity_id) || po.entity_type + '#' + po.entity_id}  `
      + `수령 ${po.received_at ? new Date(po.received_at).toISOString().slice(0, 10) : '-'}  `
      + (mismatch ? `→ ⛔ 건너뜀 (${mismatch})` : `→ 청구서 ${paid ? '결제됨' : '미수'}`));
  }
  console.log(`\n발행 대상 ${ok.length}건 · 합계 ${Math.round(total * 100) / 100} · 건너뜀 ${skipped.length}건`);

  if (!APPLY) {
    console.log('\n○ 미리보기였습니다 — 아무것도 발행하지 않았습니다. 발행하려면 --apply');
    process.exit(0);
  }

  let issued = 0; const failed = []; let invoicedTotal = 0, headerTotal = 0;
  for (const { po, header } of ok) {
    try {
      const inv = await createTradeInvoice(po);
      if (inv) {
        await inv.reload();
        issued++; invoicedTotal += Number(inv.total_amount || 0); headerTotal += header;
        console.log(`   ✓ ${po.po_number} → ${inv.invoice_number} (${inv.status}, ${inv.total_amount})`);
      } else failed.push(`${po.po_number}: createTradeInvoice 가 null 반환`);
    } catch (e) {
      failed.push(`${po.po_number}: ${e.message}`);
      console.error(`   ✗ ${po.po_number} — ${e.message}`);
    }
  }

  // 자기증명: **건수만 세지 않는다.** 발행된 청구서 총액 합이 대상 발주 헤더 합과 같아야 한다.
  const invT = Math.round(invoicedTotal * 100) / 100;
  const hdrT = Math.round(headerTotal * 100) / 100;
  const left = await targets();
  console.log(`\n발행 ${issued}건 · 실패 ${failed.length}건 · 건너뜀 ${skipped.length}건 · 남은 갭 ${left.length}건`);
  console.log(`금액 검산 — 청구서 합 ${invT} vs 발주 헤더 합 ${hdrT} → ${Math.abs(invT - hdrT) < 0.01 ? '일치' : '불일치'}`);
  if (failed.length) failed.forEach(f => console.log('   ! ' + f));
  if (skipped.length) console.log(`   (건너뛴 ${skipped.length}건은 발주 금액을 화면에서 먼저 고쳐야 합니다)`);
  const clean = failed.length === 0 && Math.abs(invT - hdrT) < 0.01 && left.length === skipped.length;
  process.exit(clean ? 0 : 1);
})().catch(e => { console.error('실패:', e.message); process.exit(1); });
