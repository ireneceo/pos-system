# Fable 설계 — 출고·배송 뒤 판매자가 «실제 보낸 양» 으로 주문·청구서를 정정한다 (2026-11-07)

> 요청: `.claude/fable-request-20261107-post-delivery-amend.md` (작업방 51367c8d)
> Irene 원문: **«고객이 받은 거 완료하거나 인보이스 결제 전에는 그대로 브랜드제너럴에서 주문내역 수정할 수 있어야 하는데 배송하고 나면 안되네. 그럼 미스했을 때 해결을 못하잖아. … 육개장 소스 2kg인데 모르고 1kg 보냈고 그대로 끝났어. 어떻게 반영해? 방법 찾아줘. 너가 바꾸지 말고 해결할 수 있게 개발 보완.»**
> Fable 읽기(코드 변경 0): `utils/poAmend.js` · `routes/seller-orders.js`(amend·ship·deliver·목록·상세) · `routes/po-returns.js`(생성·승인) · `routes/purchase-orders-workflow.js`(receive·discrepancy) · `services/purchaseOrderService.js`(createTradeInvoice) · `services/purchaseOrderReceive.js`(markAllReceived) · `services/poAutoReceiveService.js` · `services/reconcileInvoiceSync.js` · `services/externalSoa.js`(followChildToSoa) · `services/soaChildSync.js` · `services/stockLedger.js` · `utils/invoiceCalculation.js` · `utils/purchaseOrderTotals.js` · `routes/invoices-crud.js`(PUT /:id) · 모델 `PurchaseOrder`·`PurchaseOrderItem`·`PurchaseOrderReturn`·`Invoice`·`InventoryTransaction` · 화면 `IncomingOrdersView.tsx`·`PurchaseOrderDetailPage.tsx` · `.claude/fable-design-20261030-po-auto-complete.md` · `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` «판매자 주문 수정».

## 0. 결론 한 줄

**«품목 수정(amend)» 을 출고 뒤로 늘리지 않는다. 대신 출고 뒤 전용의 «실제 보낸 양으로 정정(correct-delivery)» 을 하나 만든다 — 판매자가 줄마다 «실제 보낸 양» 을 적으면(줄이기만), 서버가 ①주문 줄·총액 ②판매자 재고(출고 때 빠진 차액을 되돌림) ③구매자 재고(이미 받았으면 차액을 뺌) ④이미 난 청구서(줄 다시 쓰고 총액 재계산·수정 이력) ⑤정산서(묶여 있으면 합계 따라감) 를 **한 트랜잭션**으로 맞추고 구매자에게 알린다. 허용 = 출고 뒤 ~ **결제 전**(Irene 기준 그대로: 수령 전·후 모두, 청구서·발주가 결제되지 않았을 때).**

**Irene 결정 필요 없음** — 기본값은 전부 되돌릴 수 있는 규칙이라 Fable 이 정했다(§9 에 «바꾸고 싶으면» 둘). 그대로 구현 시작해도 된다. 돈·재고·청구서를 같이 움직이므로 **끝나면 Fable 검증(gate) 1회.**

## 1. 왜 지금 안 되나 (사실 — 요청서 실측 + Fable 재확인)

- `POST /api/seller-orders/:id/amend` 는 `AMENDABLE_STATUSES = ['submitted','confirmed']` 만 받고, `trade_invoice_id` 있음 · `quantity_received>0` · `shipped_at` 있음 이면 거부한다(`routes/seller-orders.js:1512~1535`). 10-30 설계로 **«배송 완료» 때 청구서가 즉시 나므로**(`/deliver` → `issueTradeInvoiceAfterCommit(po,{when:'delivered'})`) 배송 완료 뒤에는 세 가드가 다 걸린다.
- amend 의 본체는 **줄 전부 지우고 다시 만들기**(`destroy` + `bulkCreate`)다. 출고 뒤 줄에는 `shipped_at`·`prepared_at`·`quantity_received`·불량 보고·반품 참조(`purchase_order_returns.purchase_order_item_id`)가 붙어 있어 이 방식을 그대로 늘리면 그 사실들이 사라진다. **그래서 amend 를 늘리지 않고 «제자리 UPDATE» 하는 별도 길을 만든다.**
- 출고(`/ship`)는 판매자 재고를 **주문 수량** 기준으로 깎았다(브랜드 = BrandProduct 레시피/다이렉트/자체재고 → `stockLedger.record` `order_deduct`). 2 kg 주문에 1 kg 보냈으면 판매자 장부는 2 kg 빠진 채다.
- 반품(`po-returns.js`)은 구매자가 시작하고 한도가 `quantity_received`(배송 완료·미수령이면 0) 라 지금 건에는 쓸 수 없고, 승인 결과가 **크레딧 노트**인데 크레딧 노트는 정산서에 상계되지 않는다(메모리 미해결 백로그). 청구서 자체가 1 kg 으로 고쳐지는 것이 Irene 가 바라는 «반영» 이다.
- 불량 보고(`discrepancy`)의 `short` 는 기록만이고 돈 정정이 없다.
- 청구서 줄을 발주 기준으로 다시 쓰고 `finalizeInvoice` 로 총액을 재계산하는 선례가 이미 있다(`reconcileInvoiceSync.syncTradeInvoiceFromReconcile` — 외부 공급업체 대조). 정산서 합계 따라가기도 있다(`externalSoa.followChildToSoa` — 정산서 일반, 외부 전용 아님). **새 계산식을 만들지 않고 이 둘을 그대로 쓴다.**

## 2. 판정 규칙 (단일 소스)

### 2-1. 두 기능의 경계

| | 품목 수정 `amend` (기존) | **실제 보낸 양 정정 `correct-delivery` (신규)** |
|---|---|---|
| 때 | 출고 전 `submitted`·`confirmed` | 출고 뒤 `shipped`·`in_transit`·`delivered`·`partial_received`·`received` |
| 할 수 있는 것 | 수량↑↓ · 상품 교체 · 줄 추가/삭제 · 인상(확인+오너 승인) | **수량 줄이기만**(0 까지 · 0 = 줄 제거). 상품 교체·추가·인상 없음 |
| 줄 처리 | 지우고 다시 만듦 | **제자리 UPDATE**(`shipped_at`·`prepared_at`·불량 보고·반품 참조 보존) |
| 재고 | 없음(아직 안 움직였다) | 판매자 재고 되돌림(출고된 줄만) · 구매자 재고 차감(이미 받은 양 > 새 양일 때만) |
| 청구서 | 있으면 거부 | **있으면 같은 트랜잭션에서 다시 쓴다**(결제 전만) |
| 배송비 | 판매자 규칙으로 재계산 | **그대로 둔다**(이미 배송됐고 판매자 실수가 구매자 배송비를 바꾸면 안 된다) |
| 상태 | 불변(인상 시 pending_approval) | **불변**(이벤트 `corrected` 만) |

더 보낸 경우(3 kg 보냈는데 2 kg 주문)는 이 기능이 아니다 — 판매자가 기존 **«주문 추가»(`POST /api/seller-orders`, 구매자 대리 주문)** 로 1 kg 을 새 발주로 올리거나, 구매자가 반품한다. 그 길이 이미 오너 승인·구매자 안내를 지킨다. 새 인상 경로를 만들지 않는다.

### 2-2. `sellerCorrectionBlock(po, lines, invoice)` — `utils/poAmend.js` 에 추가 (buyerAmendBlock 과 같은 모양)

첫 번째 걸리는 것 하나를 돌려준다. **목록·상세의 `can_correct`/`correct_blocked` 와 POST 거부가 이 함수 하나를 부른다**(«화면엔 떴는데 저장하면 400» 금지 — `feedback_check_and_fix_same_sql`).

```
const CORRECTABLE_STATUSES = ['shipped', 'in_transit', 'delivered', 'partial_received', 'received'];
function sellerCorrectionBlock(po, lines, invoice) {
  if (!CORRECTABLE_STATUSES.includes(po.status))
    return { code: 'BAD_STATUS', http: 400, message: `Quantities can be corrected only after dispatch (current status '${po.status}')` };
  if (po.payment_status !== 'unpaid')
    return { code: 'ALREADY_PAID', http: 400, message: 'This order has been paid — reverse the payment before correcting quantities' };
  if (po.invoice_reconciled_at)
    return { code: 'ALREADY_RECONCILED', http: 400, message: 'The supplier invoice for this order is already reconciled' };
  if (invoice && ['paid', 'payment_submitted', 'cancelled'].includes(invoice.status))
    return { code: 'INVOICE_LOCKED', http: 409, message: invoice.status === 'payment_submitted'
      ? 'The buyer has submitted payment for this invoice — reject the payment submission first'
      : `The invoice is ${invoice.status} and cannot be rewritten` };
  return null;
}
```
- `invoice` = `po.trade_invoice_id` 의 Invoice(없으면 null → 청구서 없는 옛 건도 정정 가능, 청구서 단계는 건너뜀).
- `lines` 는 지금은 쓰지 않지만 buyerAmendBlock 과 서명을 맞춘다(뒤에 줄 단위 조건이 생기면 여기).
- `refunded` 도 막는다(«unpaid» 만 통과) — 돈이 오간 뒤의 정정은 원장을 사람이 봐야 한다.

### 2-3. 줄 단위 규칙 (POST 본문 검증 — 라우트 안)

요청 `items: [{ item_id, quantity }]` 의 `quantity` = **실제 보낸 양(주문 단위)**. 본문에 없는 줄은 그대로.
- `item_id` 가 이 발주 줄이 아니면 400 `BAD_ITEM`. `quantity` 가 유한수 ≥ 0 아니면 `BAD_ITEM`.
- `quantity > quantity_ordered + 0.005` → 400 `QTY_INCREASE` («Post-dispatch corrections can only lower quantities — add a new order for extra items»).
- `|quantity − quantity_ordered| ≤ 0.005` 인 줄은 «변경 없음» 으로 건너뜀. 바뀐 줄이 0 개면 400 `NO_CHANGE`.
- 그 줄의 반품(`PurchaseOrderReturn`, status ∈ requested·approved) 수량 합 > `quantity` → 400 `LINE_HAS_RETURNS` («Returns on this line total X — the quantity cannot go below that»). 반품 행이 **하나라도**(rejected 포함) 있으면 `quantity` 는 0 이 될 수 없다(줄을 지우면 반품 행이 고아가 된다) → 같은 코드.
- 정정 뒤 남는 줄이 0 개 → 400 `NO_LINES` («An order must keep at least one item»). 통째로 안 보낸 주문은 이 기능 범위 밖(§10).
- `reason` **필수**(trim 뒤 3자 이상, 1000자 이하) → 아니면 400 `REASON_REQUIRED`. amend 는 선택이었지만 이건 **낸 청구서를 사후에 고치는 일**이라 사유가 장부에 남아야 한다. 변경 내역(diff)은 amend 처럼 서버가 항상 만든다.

## 3. 서버 설계

### 3-1. 라우트 `POST /api/seller-orders/:id/correct-delivery` (`routes/seller-orders.js`, amend 바로 아래)

```
body: { items: [{ item_id: number, quantity: number }], reason: string }
```
한 트랜잭션(`sequelize.transaction`), 순서 고정:

1. `PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE })` · `checkSellerOwnership` 아니면 404(남의 주문은 존재하지 않는다 — amend 와 같다).
2. `invoice = po.trade_invoice_id ? Invoice.findByPk(..., { lock })` · `lines = PurchaseOrderItem.findAll({ where: { purchase_order_id } })` · `block = sellerCorrectionBlock(po, lines, invoice)` → 있으면 그 http·code 로 거부.
3. §2-3 검증(반품 합은 `PurchaseOrderReturn.findAll({ where: { purchase_order_item_id: in(...) } })` 한 번).
4. `shippedLine(item) = !!item.shipped_at || (!!po.shipped_at && !lines.some(l => l.shipped_at))` — 2026-10-08 품목별 발송 전의 옛 주문(헤더에만 `shipped_at`)도 «보냈다» 로 본다(`attachShipmentState`·`/ship` 의 `legacyAllShipped` 와 같은 판정). 서비스 줄(`serviceLineIdsOf`)은 재고가 없다 — 수량·금액만 바뀐다.
5. 바뀐 줄마다(`before` 스냅샷은 amend 의 `diffLines` 가 읽는 모양으로 모아 둔다):
   - `deltaOrdered = old − new`.
   - **판매자 재고 되돌림**: `shippedLine && !service && deltaOrdered > 0` → `restoreSellerStock({ po, item, qty: deltaOrdered, t, userId, note: 'Correction on PO … — shipped less than ordered', ledgerType: 'adjustment', reasonCode: 'seller_correction', supplierReason: 'po_correction' })` (§3-2).
   - **구매자 재고 차감**: `recv = quantity_received; if (recv > new + 0.005)` → `reverseBuyerStock({ po, item, qty: recv − new, unitPrice: item.unit_price, t, userId, note, ledgerType: 'adjustment', reasonCode: 'seller_correction' })` (§3-2) 그리고 `quantity_received = new`. 받은 양 ≤ 새 양이면 무접촉(남은 양은 뒤에 구매자가 받는다 — `markAllReceived` 가 «주문−수령» 만 넣으므로 자동 완료도 새 양만큼만 들어간다).
   - `new === 0` → `item.destroy()`(반품 가드는 3 에서 끝났다). 아니면 `item.update({ quantity_ordered: new, line_total: lineTotalOf(new, unit_price), quantity_received })`. `unit_price`·`options`·`shipped_at`·`prepared_at`·불량 칸은 **건드리지 않는다.**
6. 총액: `computePurchaseOrderTotals(remainingLines, { delivery_fee: po.delivery_fee, tax_amount: po.tax_amount })` — **`computeTotalsWithDelivery` 를 쓰지 않는다**(배송비 재계산 금지, §2-1). `delivery_fee_basis` 불변.
7. 이벤트: `appendTrackingEvent(po, 'corrected', \`Delivered quantities corrected by seller: ${reason.slice(0,200)}\`, null, { changes, reason, by_user_id, total_before, total_after, source: 'seller_correction', seller_stock_restored: [{item_id, qty}], buyer_stock_reversed: [{item_id, qty}], invoice_id, invoice_total_before, invoice_total_after, delivery_fee_kept: true })`. `po.update({ subtotal, total_amount, tracking_info })`. **status 불변**(`corrected` 는 이벤트 이름일 뿐 — amend 의 `amended` 와 같다. ENUM 없음).
8. **청구서 다시 쓰기**(`invoice` 있을 때, 같은 t): `InvoiceItem.destroy({ where: { invoice_id } })` → 남은 발주 줄마다 `InvoiceItem.create(tradeInvoiceLineAttrs(invoice.id, item, po.status))` (§3-3 · 이름은 `attachSellerProductIdentity` 로 해석, createTradeInvoice 와 같은 폴백) → `additional_charges`(배송·세금 줄) **그대로** → `finalizeInvoice(invoice.id, t)` → `invoice.update({ modification_history: [...history, { modified_at, modified_by: userId, modified_by_name, changes: { total_amount: { from, to } }, reason: \`Delivered quantities corrected by seller — PO ${po.po_number}: ${reason}\`, source: 'seller_correction' }], is_modified: true })`. 총액이 같으면(없을 일) 이력 줄만 생략.
   - `createTradeInvoice` 의 `billReceived` 규칙(status received 이고 0<받음<주문이면 받은 양으로 청구)은 `tradeInvoiceLineAttrs` 안에 그대로 있으므로 재작성도 같은 답을 낸다. 정정 뒤 `quantity_received ≤ quantity_ordered` 가 늘 성립한다.
9. commit.
10. commit 뒤: `invoice.parent_soa_invoice_id` 이고 총액이 바뀌었으면 `followChildToSoa(invoice, { prevChildTotal, actorId, actorName })` (자기 트랜잭션을 연다 — 안에서 부르지 않는다). `soa_locked` 면 응답에 실어 화면이 안내(정상 경로에선 정산서가 잠겼으면 자식도 paid/submitted 라 2 에서 이미 막힌다).
11. `emitPoEvent(req, po, 'seller-order-updated')` · 구매자 메일(§3-4) · 응답:
```
{ success: true, data: <GET /:id 와 같은 장식(items·can_correct…)>,
  correction: { changes, total_before, total_after, reason,
    invoice: { id, invoice_number, total_before, total_after } | null,
    seller_stock_restored: n, buyer_stock_reversed: n, soa: { soa_id, total } | { soa_locked: true } | null } }
```
오류 코드 → http: `NOT_FOUND` 404 · `INVOICE_LOCKED` 409 · 그 외(`BAD_STATUS` `ALREADY_PAID` `ALREADY_RECONCILED` `BAD_ITEM` `QTY_INCREASE` `NO_CHANGE` `LINE_HAS_RETURNS` `NO_LINES` `REASON_REQUIRED`) 400 — `{ success:false, code, message }`.

### 3-2. 재고 되돌림 공용 함수 — 신규 `services/poStockReversal.js` (반품 승인에서 **추출**)

`routes/po-returns.js` `approveReturnHandler` 의 두 블록을 함수로 뽑고, 반품 승인은 그 함수를 부른다(동작 동일 · 복제 금지 — 메모리 `reference_po_return_stock_symmetry` «반품 = 출고 역방향» 의 단일 소스가 된다).

```
// 구매자 재고 −qty×conv — 반품 승인 1단계 (a) product_ingredient (b) restaurant+ingredient (c) 그 외 ingredient 그대로.
//   + (d) product / brand_product 줄(= 수령이 receiveIntoProduct 로 올린 것) — 반품에는 없던 분기. 수령의 역방향으로 stockLedger.record({kind:'product'|'brand_product'}, delta:-qty×conv, clampAtZero:true}).
async function reverseBuyerStock({ po, item, qty, unitPrice, t, userId, note, ledgerType = 'return_out', reasonCode = null, refs })
// 판매자 재고 +qty — 반품 승인 2단계 supplier(SupplierProduct + SupplierInventoryTransaction manual_adjust) · brand(다이렉트/레시피/…)
//   · foodcourt(FoodcourtProduct) 그대로. ⚠ 브랜드 «자체 재고(레시피·다이렉트 없음)» 분기는 반품에도 없다(주석 «레시피 없으면 환원 없음 — 출고도 차감하지 않았다» 는
//   2026-09-01 이후 틀렸다: /ship 은 product_kind==='stock' 이면 brand_product 자체 재고를 깎는다). 이번에 **그 분기를 더한다**(출고와 대칭 —
//   `!bp.product_recipe_id && !bp.product_ingredient_id && (!bp.product_kind || bp.product_kind==='stock')` 일 때 stockLedger.record({kind:'brand_product'}, +qty,
//   unit: selfStockUnit(bp,'ea')) · 출고가 건너뛴 종류(주문제작·서비스)는 여기도 건너뜀) — 반품 승인도 같이 바르게 된다(§7-10 에서 그 변화를 숫자로 적는다).
async function restoreSellerStock({ po, item, qty, t, userId, note, ledgerType = 'return_in', reasonCode = null, supplierReason = 'return_approved' })
```
- 반품 승인 호출은 기본값(`return_out`/`return_in`/`return_approved`)으로 → 장부 모양 불변(health-check 반품 검사가 회귀 가드).
- 정정 호출은 `ledgerType: 'adjustment'`(이미 ENUM 에 있음 — 확장 없음) · `reasonCode: 'seller_correction'`(`reason_code` STRING(32)) · 공급업체 `supplierReason: 'po_correction'`(STRING(40)). 물건이 오간 적이 없으니 «반품» 으로 적지 않는다.
- 금액 근거(`cost`)·`clampAtZero`·`[unit_mismatch]` 표기·`directDeductConversion` 사용은 반품 승인 코드 **그대로** 옮긴다. 새 환산 규칙 금지.
- 추출 범위 = 재고 블록만. 승인 합산 검사·크레딧 노트 발행·반품 행 갱신은 `po-returns.js` 에 남는다.

### 3-3. 청구서 줄 한 줄의 모양 — `tradeInvoiceLineAttrs(invoiceId, item, poStatus)` (`services/purchaseOrderService.js` 에 추출·export)

`createTradeInvoice` 의 `for (const item of poItems) { … InvoiceItem.create({...}) }` 안의 객체(설명 폴백 · `billReceived` 규칙 · 금액 반올림)를 함수로 뽑아 **createTradeInvoice 와 정정이 같은 함수**를 쓴다. createTradeInvoice 의 다른 줄은 손대지 않는다(발행일·마감일·결제조건 로직 무접촉). `reconcileInvoiceSync` 는 뜻이 다르다(청구가 우선) — 그대로 둔다.
> 10-30 설계는 «createTradeInvoice 본문은 손대지 않는다» 였다. 이번은 **같은 줄 모양을 두 곳에 복제하지 않기 위한 기계적 추출**이고 health-check `trade` 카테고리(청구서 모양·총액 = 발주 총액 · 발행일 규칙)가 회귀를 잡는다. 복제(세 번째 사본)는 허용하지 않는다.

### 3-4. 기록·알림

- 구매자 메일: amend 의 변경 표(Item · Change · Before · After)를 만드는 부분을 `routes/seller-orders.js` 안 지역 함수 `changesTableHtml(changes, money)` 로 묶어 amend·정정이 같이 쓴다. 제목 **«Order Corrected: {po_number} · by {seller}»**, 본문 «The seller corrected the delivered quantities of your purchase order **{po}**.» + 변경 표 + «Order total: a → **b**» + 청구서가 고쳐졌으면 «Invoice **{invoice_number}** has been updated to **{total}**.» + 구매자 재고를 뺐으면 «Your stock has been adjusted by the difference.» + 이유 블록(amend 와 같은 보라 블록) + «View Order». 카테고리 `seller_order_received`(구매자 발주 알림 — amend·배송 완료와 같은 칸) · 작업 키 `review_changes`. 커밋 뒤 `setImmediate`, 실패해도 정정은 이미 커밋.
- 판매자 쪽 알림 없음(자기 행동). 오너 알림 없음(인상이 아니다).
- 청구서 수정 이력은 기존 `modification_history` 칸 → 화면 `InvoiceModificationHistory` 가 그대로 그린다(변경 없음).
- 소켓 `seller-order-updated` 하나(기존).

### 3-5. 목록·상세 응답 장식 — `attachCorrectionState(rows)` (`routes/seller-orders.js`, `attachAutoReceiveAt` 옆)

- 목록(`GET /`)·상세(`GET /:id`) 둘 다. 목록은 **한 쿼리**: `Invoice.findAll({ where: { id: in(trade_invoice_ids) }, attributes: ['id','status','invoice_number','total_amount','parent_soa_invoice_id'] })` 로 모아 행마다 `sellerCorrectionBlock(obj, obj.items, inv)`.
- 붙이는 칸: `can_correct: boolean` · `correct_blocked: { code, message } | null` · `trade_invoice: { id, invoice_number, status, total_amount } | null`(정정 모달이 «청구서 X 도 고쳐진다» 를 쓰는 데 필요).
- `amendable-products` 의 `amendable` 은 그대로(출고 전 amend 용).

## 4. 화면 (판매자 `IncomingOrdersView.tsx` · 구매자 `PurchaseOrderDetailPage.tsx`)

### 4-1. 판매자 — 버튼

- 목록 행 액션(1564 줄 «Edit items» 옆)과 상세 모달 푸터: `CORRECTABLE_STATUSES` 상태 행이면 **«Correct quantities»** 단추(ThemedButton small outline). `row.can_correct` 가 false 면 **disabled + title = correct_blocked.message**(결제된 주문은 왜 안 되는지 보인다 — 숨기지 않는다). amend 단추(submitted·confirmed)와 동시에 뜨는 상태는 없다.
- 상태 상수는 화면에 복사하지 않는다 — **버튼 노출 = `row.correct_blocked?.code !== 'BAD_STATUS'`** (서버 판정만 읽음. `utils/poStatuses` 와 같은 이유).

### 4-2. 판매자 — 정정 모달 (amend 모달과 같은 `Modal` size large · 새 styled 없음 · RA 기준)

- 제목 «Correct delivered quantities». 힌트: «Enter what was actually delivered. Quantities can only go down. The order total and the invoice are updated and the buyer is told.»
- 상태가 `received`·`partial_received` 이고 받은 양 > 적은 양인 줄이 생기면 호박색 안내: «The buyer has already received this order — their stock will be reduced by the difference.» (서버 `quantity_received` 로 화면이 계산해 **미리** 보여 준다; 실제 적용은 서버 규칙 §3-1 ⑤).
- 줄 표(기존 상세 품목 표 격자 재사용): 품목(seller_product_name → description) · Ordered(수량+unit · «10 kg/BOX» 스냅샷 있으면 같이) · **Delivered**(숫자 입력 · 기본값 = ordered · `min=0 max=ordered step=any`) · Line total(before → after). 상품 선택·줄 추가 없음. 입력이 ordered 보다 크면 그 줄 빨간 테두리 + 저장 막힘(«cannot exceed ordered»).
- 합계 띠: «Items total a → b» + 작은 글씨 «Delivery fee {fee} unchanged»(fee>0 일 때) + «Invoice {number} will be updated» (`trade_invoice` 있을 때).
- Reason **필수** 텍스트영역(placeholder «e.g. Shipped 1 kg instead of 2 kg»). 3자 미만이면 저장 막힘.
- 저장 → `ConfirmModal` «Lower the order to {total}?» 본문 «{n} item(s) changed. {Invoice X will be updated.} The buyer is notified.» → 확인이 POST. 성공 → 모달 닫고 `refreshAll()` + 기존 `savedTitle` 류 안내 «Quantities corrected». 실패 → 서버 `message` 그대로(amend 와 같은 자리).
- 바뀐 줄 0 개면 저장 비활성(서버 `NO_CHANGE` 와 같은 판정).

### 4-3. 구매자 — 상세 배너 (`PurchaseOrderDetailPage.tsx` 1387 줄 블록)

- `find(e => e.status === 'amended' || e.status === 'corrected' || e.store_edit_reverted)` 로 넓히고, `corrected` 면 제목 `t('detail.correctedBySeller', 'The seller corrected the delivered quantities')`. 이유·변경 줄·전후 총액은 amended 와 같은 렌더(이벤트 모양을 같게 맞췄다). `buyer_stock_reversed` 가 비어 있지 않으면 한 줄 «Your stock was adjusted by the difference.» (`detail.correctedStockAdjusted`).
- 타임라인(`DeliveryTimeline`)은 고정 단계만 그린다 — 변경 없음.

## 5. i18n (4개 언어 en→ko→zh→ms · `npm run i18n:verify`)

- `public/locales/*/supplier.json` `orders.actions.correct` «Correct quantities» · `orders.correct.{title, hint, receivedNotice, item, ordered, delivered, lineTotal, itemsTotal, deliveryUnchanged, invoiceWillUpdate, reason, reasonPlaceholder, reasonRequired, exceedsOrdered, submit, cancel, confirmTitle, confirmBody, confirmOk, savedTitle, saved, ok}`.
- `public/locales/*/purchaseOrders.json` `detail.correctedBySeller` · `detail.correctedStockAdjusted`.
- 메일은 기존 amend 와 같이 영어 인라인(백엔드 `locales/` 추가 없음 — 기존 패턴).

## 6. 바꾸는 파일 · 무접촉

**백엔드 (DB 변경 없음 · 마이그 없음 · ENUM 없음 · 새 상태값 없음)**
- `utils/poAmend.js` — `CORRECTABLE_STATUSES` · `sellerCorrectionBlock` export.
- 신규 `services/poStockReversal.js` — `reverseBuyerStock` · `restoreSellerStock`(§3-2).
- `routes/po-returns.js` — approve 의 재고 두 블록을 위 함수 호출로 교체(동작 동일).
- `services/purchaseOrderService.js` — `tradeInvoiceLineAttrs` 추출·export(§3-3).
- `routes/seller-orders.js` — `POST /:id/correct-delivery` · `attachCorrectionState`(목록·상세) · `changesTableHtml` 공용화.
- `scripts/health-check.js` — §7 검사(`inventory` 카테고리, `makeQ6Fixture` 재사용).
- `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` — «판매자 주문 수정 (amend)» 절 뒤에 «출고 뒤 수량 정정 (correct-delivery) — 2026-11-07» 절(계약 표·규칙·관련 파일). 새 문서 만들지 않는다.

**프론트**
- `IncomingOrdersView.tsx` — 단추 2곳 · 정정 모달 · `IncomingOrderRow` 에 `can_correct`·`correct_blocked`·`trade_invoice` · 줄에 `quantity_received`.
- `PurchaseOrderDetailPage.tsx` — 배너 조건·문구.
- i18n 2 네임스페이스 × 4 언어. 빌드 1회 · sweep 1회(CLAUDE.md «빌드 1회»). SW 버전은 프론트 변경 다 끝난 뒤 마지막.

**무접촉:** 🔒 인쇄·KDS 보호파일 8개 · `markAllReceived`/`purchaseOrderReceive.js` · `poAutoReceiveService.js` · `reconcileInvoiceSync.js` · `invoiceCalculation.js` · amend 라우트 판정(`AMENDABLE_STATUSES` 그대로) · `createTradeInvoice` 의 추출 외 줄.

## 7. 검증 기준 (구현자가 실제로 돌려 숫자로 · health-check `inventory` · 데모 매장 38 + 데모 브랜드 10 · `makeQ6Fixture` = 브랜드 자체재고 상품 current_stock 20, 1줄 3 pack × RM 2)

1. **수령 전 정정(C1)**: confirmed→`/ship`(bp 재고 20→17)→`/deliver`→청구서 대기(`acWaitInvoice`) → `POST correct-delivery {items:[{item_id, quantity:2}], reason:'hc'}` 200 → 발주 `total_amount` 6→4 · 줄 `quantity_ordered` 2 · `line_total` 4 · `quantity_received` 0 · **bp `current_stock` 18**(장부 마지막 줄 `adjustment` +1 `reason_code='seller_correction'`) · 청구서 `total_amount` 4 · `InvoiceItem` 1줄 qty 2 · `modification_history` 마지막 `source='seller_correction'` · `is_modified` true · 추적 마지막 이벤트 `status='corrected'`·`changes` 1건·`total_before 6 total_after 4` · 구매자 상품 재고 0(무접촉) · 상태 `delivered` 그대로. 이어서 구매자 `/mark-received` → 구매자 재고 **+2**(3 아님) · `quantity_received` 2 · 청구서 **여전히 같은 1장·총액 4**(멱등).
2. **수령 뒤 정정(C2)**: ship→deliver→`runAutoReceive({ now: +73h, onlyIds })` → received·구매자 재고 3 → 정정 3→1 → 구매자 재고 **1**(장부 `adjustment` −2 `seller_correction`) · `quantity_received` 1 · bp 재고 17→**19** · 청구서 총액 2 · 상태 `received` 그대로.
3. **가드(C3)** 각각 코드 확인: 3→4 `QTY_INCREASE` 400 · 상태 confirmed `BAD_STATUS` 400 · `payment_status='paid'` 로 바꾼 뒤 `ALREADY_PAID` 400 · 청구서 `status='payment_submitted'` 로 바꾼 뒤 `INVOICE_LOCKED` 409 · 같은 수량 `NO_CHANGE` 400 · reason 없음 `REASON_REQUIRED` 400 · 다른 판매자 토큰 404 · 구매자(RA) 토큰 403(`requireSellerRole`).
4. **반품과의 정합(C4)**: C2 상태에서 구매자가 반품 1 요청(`POST /purchase-orders/:id/returns`) → 정정 3→0.5 `LINE_HAS_RETURNS` 400 · 3→1 200. 그 뒤 반품 승인 → 승인 합산 검사가 새 `quantity_received`(1) 기준으로 통과하고 장부는 `return_out`/`return_in`(**추출 뒤에도 모양 불변**).
5. **줄 제거·전부 0(C5)**: 2줄 발주에서 둘째 줄 0 → 줄 삭제·총액 재계산·청구서 1줄 / 두 줄 다 0 → `NO_LINES` 400, 아무것도 안 바뀜(롤백 — 재고·총액 그대로).
6. **배송비 유지(C8)**: `delivery_fee 5` 를 둔 발주 정정 → `delivery_fee` 5 그대로 · `total_amount = subtotal + 5` · 청구서 `additional_charges` Delivery 5 유지·총액 일치.
7. **응답 칸(C6)**: 목록·상세 delivered 행 `can_correct true` · confirmed 행 `false code BAD_STATUS` · paid 행 `false code ALREADY_PAID` · `trade_invoice.invoice_number` 있음.
8. **정산서 따라가기(C9)**: 청구서를 임시 정산서(`invoice_category='soa'`, pending_payment)에 `parent_soa_invoice_id` 로 묶은 뒤 정정 → 정산서 `total_amount` 가 자식 합으로 바뀌고 `modification_history` `source='soa_child_sync'`. 정산서 `paid` 면 자식도 paid → `INVOICE_LOCKED`(2 에서 막힘) 확인.
9. **알림**: 개발 메일 가드 로그에 구매자 `seller_order_received` 1통(제목 «Order Corrected: …»).
10. **반품 승인 회귀**: 기존 health-check 반품 검사(Sprint 6·7 · 2026-07-13 대칭 검사) 전부 통과 — 추출이 동작을 바꾸지 않았다는 증거.
11. **고장주입 4건(반증 — 안 깨지면 검사가 고장)**: ⓐ `restoreSellerStock` 호출을 빼면 C1 의 bp 재고 18 검사 실패 ⓑ 청구서 재작성(§3-1 ⑧)을 빼면 C1 청구서 총액 4 실패 ⓒ `quantity_received` 낮추기를 빼면 C2 구매자 재고 1 실패 ⓓ `sellerCorrectionBlock` 의 `ALREADY_PAID` 줄을 빼면 C3 실패. 넷 다 원복 후 통과 숫자 기록.
12. 기계 게이트: `node scripts/verify-all.js --full`(프론트 빌드 뒤) · `check-print-guard` 변경 0 · `check-design-guard` 신규 위반 0 · `npm run i18n:verify` · `check-sensitive-diff` → **돈·주문 무결성 + 재고 쓰기 + 청구서 재작성 + 외부 발송** 이므로 **Fable 검증(gate) 1회 대상.** 구현 끝나면 diff·검사 숫자·고장주입 결과를 넘길 것.

## 8. 운영 건 `PO-R28-20261104-001` 처리 순서 (Irene/판매자가 새 기능으로 · 운영 DB 직접 수정 없음)

전제: 화면상 Delivered · Unpaid · 자동 완료 11/10 23:15 → 지금은 **수령 전**. 배포가 그 전인지 뒤인지에 따라 A/B 가 갈리지만 **누르는 단추와 입력은 같다.** 배포는 수동 배포(상황판 배포 버튼) 몫 — 이 설계는 묻지 않는다.

1. 판매자(GIT Consulting 브랜드 제너럴) 로그인 → **받은 주문** → `PO-R28-20261104-001` 행(또는 상세) → **«Correct quantities»**.
2. `K-Yukgaejang Sauce` 줄 Delivered 칸에 **1** (Ordered 2 그대로 보임). 다른 11줄은 손대지 않는다. Reason: «Shipped 1 kg instead of 2 kg».
3. 저장 → 확인 창 «Lower the order to RM {453.50 − 육개장 단가}?» → 확인.
4. 결과(둘 다 공통): 발주 총액 ↓ · 청구서(배송 완료 때 난 그 1장) 줄이 1 kg 으로 바뀌고 총액 ↓ · 청구서 수정 이력에 사유 · 브랜드 재고에 육개장 소스 1 kg 분(레시피/다이렉트 환산)이 `adjustment · seller_correction` 으로 **되돌아옴** · 매장(K-DINE Noodles Pavilion)에 «Order Corrected» 메일 · 매장 발주 상세 상단에 정정 배너.
   - **A. 자동 완료(11/10 23:15) 전에 배포·정정** → 매장 재고는 무접촉. 매장이 «받았어요» 를 누르거나 자동 완료되면 **1 kg 만** 들어간다.
   - **B. 자동 완료 뒤에 배포·정정**(상태 received·받은 양 2) → 위에 더해 매장 재고에서 1 kg 분이 `adjustment · seller_correction` 으로 **빠진다**(자동 완료가 2 kg 을 넣었으므로). 메일에 «Your stock has been adjusted» 한 줄.
5. 확인할 곳(판매자): 받은 주문 상세 총액 · Trade Invoices 에서 그 청구서 총액·수정 이력 · 브랜드 재고 이력(`seller_correction`). (매장): 발주 상세 배너 · 재고 이력(B 일 때).
6. **막히는 경우**: 매장이 그 사이 청구서를 **결제**(또는 결제 제출)했으면 단추가 비활성(«reverse the payment first» / «reject the payment submission first»). 결제 제출이면 판매자가 그 제출을 반려한 뒤 정정 → 매장이 다시 낸다. 이미 결제 확인까지 됐으면 **결제를 되돌린 뒤**(발주 «Reverse payment» · 월 정산이면 정산서 상태 되돌림) 정정 — 돈이 오간 뒤의 정정은 사람이 원장을 보고 해야 하므로 이 기능이 막는 것이 맞다.
7. 운영 반영: 다음 배포 때. 배포 뒤 이 건은 **Irene/판매자가 위 1~3 을 직접** 한다(«너가 바꾸지 말고»).

## 9. Irene 에게 — 결정 필요 없음 · 바꾸고 싶으면 둘

기본값(Fable 결정)으로 바로 구현한다. 아래 둘만 Irene 가 다르게 원하면 상수·조건 한 줄이다.

**① 수령(완료) 뒤에도 판매자가 줄일 수 있게 둔다 — 기본값: 허용(결제 전까지).**
- A. 허용(기본) — 구매자 재고도 차액만큼 같이 줄고 메일로 안내. 이 운영 건이 11/10 자동 완료 뒤에 배포될 수 있어 **이게 없으면 바로 이 건을 못 푼다.** 자동 완료는 아무도 «2 kg 받았다» 고 주장한 것이 아니다. Irene 기준(«고객이 받은 거 완료하거나 인보이스 결제 전») 중 «결제 전» 을 상한으로 삼는다.
- B. 수령 전까지만(`CORRECTABLE_STATUSES` 에서 received·partial_received 제거) — 완료 뒤는 반품·크레딧 노트로. 크레딧 노트가 정산서에 상계되지 않는 미해결 백로그가 있어 **지금은 B 를 권하지 않는다.**
- **Fable 권고: A.**

**② 출고 뒤 정정은 «줄이기만» — 기본값: 줄이기만.**
- A. 줄이기만(기본) — 더 보낸 것은 기존 «주문 추가»(대리 주문·오너 승인 통과)로 새 발주. 구매자 돈 약속을 판매자가 사후에 늘리는 길을 만들지 않는다.
- B. 늘리기도(confirm_increase + 오너 승인 게이트) — 배송 끝난 주문이 `pending_approval` 로 되돌아가는 모순이 생겨 승인 게이트를 새로 설계해야 한다.
- **Fable 권고: A.**

## 10. 경계 · 범위 밖 (의도적)

- 주문 **전체**를 안 보낸 경우(모든 줄 0) → `NO_LINES`. 그건 «출고 취소» 라는 다른 사안(출고 뒤 취소 경로는 지금 없다 — 필요하면 따로 올린다).
- 단가 정정 · 상품 교체 · 배송비 정정 → 범위 밖(청구서 직접 수정 `PUT /api/invoices/:id` 는 발행자가 지금도 할 수 있으나 발주·재고와 어긋나므로 권하지 않음 — 문서에 한 줄).
- 외부(미가입) 공급업체 발주 → 판매자 로그인이 없어 이 라우트에 닿지 않는다. 그쪽은 기존 인보이스 대조(`reconcile`)가 청구서를 고친다. 변경 없음.
- 구매자 쪽 «정정 승인/거부» 왕복 상태 → 만들지 않는다(amend 와 같은 원칙 — 안내 + 배너 + 이력).
- 크레딧 노트 ↔ 정산서 상계 백로그 → 이 사안으로 풀지 않는다(별건).
- 매장 원가(`writeStoreCost` 마지막 매입가)·입고 배치(`InventoryBatch.remaining_quantity`)는 반품 승인과 같이 건드리지 않는다(대칭 유지). 배치 잔량이 재고보다 커지는 일은 반품에도 있는 기존 한계 — 문서에 한 줄.

Fable 안 씀 — 해당 없음(이 문서가 Fable 설계). 구현 뒤 Fable 검증(gate) 1회.
