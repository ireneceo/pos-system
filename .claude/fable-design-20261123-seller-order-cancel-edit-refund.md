# Fable 설계 — 판매자 주문 취소(삭제) · 배송 뒤 수정 · 결제된 주문의 반품 환불 (2026-11-23)

> Irene 원문: **«https://purplehere.com/pos/brand/general/incoming-orders 이거 주문 삭제하는 게 없어. 배송완료해도 수정이나 삭제가 필요한 경우 해야 해. 인보이스도 같이 바뀌어야 하고 결제 안된 건. 그리고 고객이 돌려보내거나 환불요청 하는 거 기능 정확히 하고 서로 승인하고 대응하게 제대로 검증하고 보완해줘.»**
> Fable 이 직접 읽은 것(코드·DB 변경 0): `utils/poAmend.js`(sellerCorrectionBlock·returnMoneyBlock) · `routes/seller-orders.js`(reject·amend 의 청구서 가드·correct-delivery 전체·stats) · `routes/po-returns.js`(loadAndCheckReturn·approveReturnCore·승인/거절) · `services/poReturnDeduction.js` 전체 · `services/poStockReversal.js`(머리말·서명) · `services/purchaseOrderPayment.js`(recordPayment·reversePayment·adjustPaidAmount·mirror) · `services/externalSoa.js`(soaChildSum·followChildToSoa) · `services/purchaseOrderService.js`(createTradeInvoice 멱등·issueTradeInvoiceAfterCommit·invoiceOnConfirm) · `services/soaScheduler.js`(BILLABLE_PO_STATUSES) · `routes/invoices-crud.js` PATCH status · `routes/invoices-payment.js` confirm/reject · `routes/purchase-orders-workflow.js`(cancel·DELETE·refund-payment) · 모델 PurchaseOrder·PurchaseOrderReturn·Invoice 상태 · 11-07·11-17 설계 문서 · 메모리 6건 · 개발 DB 상태 분포(읽기 1회).
> 실행해 본 것은 개발 DB 건수 읽기 하나뿐이다. 운영 데이터는 **확인 못 함**(§9-2 에 팀원이 읽기로 확인할 2건).

## 0. 결론

| Irene 요구 | 지금 | 이번 설계 |
|---|---|---|
| 주문 삭제 | 판매자는 **확정 전(받은 직후)** 에만 «Reject». 확정·출고·배송완료·수령 뒤에는 없앨 길이 없다 | **«Cancel order»** — 확정 뒤 어느 단계든(배송완료·수령 뒤 포함) 결제 전이면 취소. 재고·청구서·정산서가 한 번에 따라간다(§2) |
| 배송완료 뒤 수정 | «Correct quantities»(11-07) — 줄이기만, 최소 1줄 | 유지. 전부 0 으로 만들려 하면 «Cancel order» 로 안내. 이번에 **다시 실호출로 증명**(§3) |
| 인보이스도 같이, 결제 안 된 건 | 정정은 청구서를 다시 쓴다. 취소는 길이 없음 | 취소 = 청구서 **취소 상태**로(번호는 남김) + 정산서에서 빠지고 합계 재계산. 결제된 주문은 취소·정정을 막고 **반품→환불**로 보낸다 |
| 고객 반품·환불 요청, 서로 승인 | 결제 전: 신청→판매자 승인→청구서 차감(11-17). **결제된 주문은 반품 자체가 막혀 있고, 돈을 돌려주는 기록이 없다** | 결제된 주문도 반품 가능. 승인하면 **«환불할 금액»** 이 생기고 → 판매자 «환불 보냄» → 구매자 «받았음 / 못 받았음» 두 단계로 닫는다(§4). 신청 철회·판매자 알림·목록 표시 보완 |

- «삭제» 는 **기록을 지우지 않고 취소로 남긴다**(기본 목록에서 사라지고 Cancelled 탭에만 보임). 청구서 번호·재고 장부가 달린 주문을 지우면 장부가 끊긴다.
- DB: 표 1개 신설 · 칸 1개 추가 · 반품 상태값 1개 추가(늘리기만) → 마이그 1개.
- 돈·재고·청구서·정산서·새 라우트를 같이 움직인다 → **구현 끝나면 Fable 검증(gate) 1회 필수.**
- **Irene 에게 물을 것 없음 — 답 없이 구현을 시작해도 된다.** 정한 기본값은 전부 나중에 바꿀 수 있는 규칙이다(§10).

## 1. 지금 사실 (왜 안 되나)

1. `POST /seller-orders/:id/reject` 는 `status === 'submitted'` 일 때만 받는다. 그 뒤 상태에서 판매자가 주문을 없애는 라우트는 없다. 구매자 취소도 draft·submitted·pending_approval 까지다.
2. 배송 뒤 수정은 `correct-delivery` 하나다 — 줄이기만, 남는 줄이 0 이면 `NO_LINES` 400(«통째로 안 보낸 주문은 범위 밖» 이 11-07 설계에 남아 있었다). 즉 **잘못 들어간 주문·중복 주문을 배송 뒤에 없애는 길이 없다.**
3. 판매자 품목 수정(`amend`)은 청구서가 붙으면 `ALREADY_INVOICED` 로 막는다. «주문 확정 때 청구서 발행» 이 켜진 매장은 확정~출고 사이에 수정도 정정도 안 된다(개발 DB: 그 설정 매장 0, 확정+청구서 주문 1건). 이번 취소가 이 구간의 출구가 된다.
4. 반품 판정 `returnMoneyBlock` 은 결제된 주문을 `ALREADY_PAID` 로 막는다(11-17 «결제된 주문의 반품·환불은 별도 설계»). 판매자가 받은 돈을 돌려준 사실을 적는 곳이 코드에 없다.
5. 구매자 «Reverse payment»(`refund-payment` → `reversePayment`)는 구매자 혼자 누르면 발주가 refunded, 청구서가 다시 미수로 돌아간다. **판매자가 입금을 확인한 결제(청구서 쪽 confirm-payment·카드)도 구매자 혼자 되돌릴 수 있다** — 발주가 paid 인지만 본다. (코드로 읽은 것 · 실호출 재현은 §8-16 에서 팀원이 한다.)
6. 구매자가 반품을 신청해도 판매자에게 가는 알림이 없다(소켓 갱신뿐). 목록에는 «반품 신청이 와 있음» 표시가 없다. 구매자는 낸 신청을 거둘 수 없다.
7. `recordPayment` 는 발주 상태를 보지 않는다 — 취소된 발주에도 Pay 가 기록될 수 있다(화면 단추만 숨김).
8. 정산서 합계(`soaChildSum`)는 **취소된 묶인 청구서를 이미 빼고** 더한다. 정산서 직전 청구서 채우기(`BILLABLE_PO_STATUSES`)는 cancelled 를 안 고른다. `createTradeInvoice` 는 `trade_invoice_id` 가 있으면 기존 것을 돌려준다(취소된 청구서가 붙어 있으면 새로 안 만든다). → 취소를 얹을 자리가 이미 맞춰져 있다.

## 2. A — 주문 취소 «Cancel order»

### 2-1. 판정 — `sellerCancelBlock(po, invoice, soa, returns)` (`utils/poAmend.js`, sellerCorrectionBlock 옆)

목록·상세의 `can_cancel`/`cancel_blocked` 와 POST 거부가 **이 함수 하나**를 부른다. 첫 번째 걸리는 것 하나를 돌려준다.

| 순서 | 조건 | code · http | 뜻 |
|---|---|---|---|
| 1 | 상태가 `confirmed · shipped · in_transit · delivered · partial_received · received · delivery_failed` 가 아님 | `BAD_STATUS` 400 | submitted 는 기존 «Reject», closed·cancelled 는 끝난 것 |
| 2 | 반품 행 중 `requested` 가 있음 | `RETURN_PENDING` 409 | «Approve or reject the pending return request first» |
| 3 | 반품 행 중 `approved` 가 있음 | `HAS_RETURNS` 400 | «This order already has processed returns — use Return items for the rest» (실제로 오간 주문이다. 남은 것은 반품으로) |
| 4 | 직영 정산(`isInternalSettlement`) | 통과 | 돈이 오간 적 없다 |
| 5 | `po.payment_status === 'paid'` | `ALREADY_PAID` 400 | «This order is paid — use Return items to refund it» |
| 6 | 청구서 `paid`·`payment_submitted` 또는 낸 금액 > 0 | `INVOICE_LOCKED` 409 | 제출됨이면 «reject the payment submission first» |
| 7 | 정산서 `paid`·`payment_submitted` | `SOA_LOCKED` 409 | |
| — | 그 밖(`unpaid`·`refunded`, 청구서 없음·미수·연체·이미 취소) | null | |

### 2-2. 라우트 `POST /api/seller-orders/:id/cancel` (`routes/seller-orders.js`, correct-delivery 아래)

`body: { reason: string }` — 필수(3자 이상·1000자 이하, 아니면 `REASON_REQUIRED`). 한 트랜잭션, 순서 고정:

1. 발주 잠금 → `checkSellerOwnership` 아니면 404 → `sellerBlockError`(숨김·오너 승인 대기) → 청구서 잠금·정산서·줄·반품 행 읽기 → `sellerCancelBlock`.
2. **재고 — 줄마다**(서비스 줄 제외 · `services/poStockReversal` 호출만, 함수 무접촉):
   - 받은 양 > 0 → `reverseBuyerStock({ qty: 받은 양, ledgerType:'adjustment', reasonCode:'seller_cancel' })`, 그 줄 `quantity_received = 0`.
   - 출고된 줄(`shipped_at` 있음 또는 옛 주문 전체 출고) → `restoreSellerStock({ qty: 주문 수량, ledgerType:'adjustment', reasonCode:'seller_cancel', supplierReason:'po_cancel' })`. 자체재고 상한(실제로 뺀 양까지만)은 그 함수 안 규칙 그대로.
   - 줄의 `quantity_ordered`·단가·`total_amount` 는 **그대로 둔다**(취소 탭에서 «무슨 주문이었나» 가 보여야 한다).
3. **청구서**(있고 아직 취소가 아니면): `status 'cancelled'` · `parent_soa_invoice_id null`(풀기 전 번호를 기억) · 직영이면 `paid_amount 0` · `modification_history` 에 `{ changes:{ status:{from,to} }, reason:'Order cancelled by seller — PO {번호}: {사유}', source:'seller_cancel' }` · `is_modified true`. 품목 줄·요금 줄·총액은 건드리지 않는다. `po.trade_invoice_id` 는 그대로 가리킨다(새 청구서가 다시 생기지 않게).
4. **발주**: `status 'cancelled'` · `cancelled_at` · `cancelled_reason` · 추적 이벤트 `cancelled`(«Cancelled by seller: …», meta `{ source:'seller_cancel', from_status, by_user_id, seller_stock_restored[], buyer_stock_reversed[], invoice_id, invoice_total }`). `payment_status` 는 안 바꾼다.
5. **커밋 뒤**: ① 묶여 있던 정산서가 있으면 `followChildToSoa({ parent_soa_invoice_id: 기억한 번호, invoice_number, total_amount: 0 }, { prevChildTotal })` 로 합계 재계산 → 남은 묶인 청구서가 0 장이면 그 정산서도 `cancelled`(0원 미수·0원 연체 메일 방지 — 반품의 `closeIfFullyReturned` 와 같은 이유). 이 «빈 정산서 닫기» 는 `services/externalSoa.js` 에 작은 함수 하나(`closeSoaIfEmpty`)로 둔다. ② `emitPoEvent` ③ 구매자 메일 1통(`buyerMail`·`fireBuyerNotification`, 카테고리 `seller_order_received`): «Order cancelled by seller» + 사유 + (청구서 있으면) «Invoice {번호} was cancelled» + (구매자 재고를 뺐으면) «Your stock has been adjusted».
6. 응답 = 상세와 같은 장식 + `cancellation: { invoice:{id, invoice_number, total}|null, seller_stock_restored, buyer_stock_reversed, soa }`.

같이 고치는 한 줄: `recordPayment` 맨 앞에 `po.status === 'cancelled'` → 400 `BAD_STATUS`(§1-7).

**되살리기는 없다.** 잘못 취소했으면 판매자 «Add order»(기존 대리 주문)로 다시 넣는다.

### 2-3. 장식 — `attachCancelState(objs)`

`attachCorrectionState` 와 같은 모양으로 `can_cancel` · `cancel_blocked{code,message}` 를 붙인다(목록 `GET /seller-orders` · 상세 · 각 POST 응답). 청구서·정산서·반품 읽기는 `attachReturnState` 가 이미 모으는 것과 **같은 쿼리를 공유**한다(목록에 쿼리를 3개 더 얹지 않는다 — 두 장식을 한 함수로 합치거나 읽은 맵을 넘긴다).

## 3. B — 배송 뒤 수정

- **`correct-delivery` 본체는 고치지 않는다.** 줄이기·줄 제거·청구서 다시 쓰기·정산서 따라가기는 11-07 게이트를 통과한 그대로다.
- 바꾸는 것 하나: `NO_LINES` 문구 → «To remove every item, cancel the order instead», 화면은 그 코드를 받으면 «Cancel order» 단추를 같이 보여 준다.
- 이번 검증에서 **기존 정정을 다시 실호출로 증명**한다(§8-9) — Irene 문장의 «수정 … 인보이스도 같이» 가 지금 실제로 되는지 숫자로.
- 정하지 않고 그대로 둔 것(§10): 배송 뒤 **늘리기·단가 변경·상품 교체**는 여전히 «취소하고 다시 넣기» 또는 «Add order» 다.

## 4. C — 반품·환불

### 4-1. 누가 시작하고 누가 닫나 (전체 표)

| 상황 | 시작 | 닫는 사람 | 돈 |
|---|---|---|---|
| 결제 전 · 구매자 신청 | 구매자 | 판매자 승인/거절(사유 필수) | 승인 순간 청구서에서 뺌(11-17 그대로) |
| 결제 전 · 판매자 직접 반품 | 판매자 | 즉시 확정 + 구매자 메일 | 같음 |
| **결제 후 · 구매자 신청** | 구매자 | 판매자 승인/거절 | **승인 순간 «환불할 금액» 생김 → 판매자 «환불 보냄» → 구매자 «받았음»/«못 받았음»** |
| **결제 후 · 판매자 직접 반품** | 판매자 | 즉시 확정 | 같음(환불할 금액부터) |
| 외부(미가입) 공급업체 | 구매자 | 구매자 스스로(기존) | 결제 전 = 차감 / 결제 후 = 구매자가 «환불 받았음» 을 직접 적음 |
| 신청 철회(신규) | 구매자 | 구매자(`requested` 일 때만) | 없음 |
| 결제 제출 중(`payment_submitted`) | — | 막음(기존) | 판매자가 제출을 확인/거절한 뒤에 |

재고(구매자 −, 판매자 +)는 결제 여부와 상관없이 **승인 순간 똑같이** 움직인다.

### 4-2. 판정 — `returnSettlement(po, invoice, soa)` (`utils/poAmend.js`)

`{ block }` 또는 `{ mode: 'deduct' | 'refund' }` 를 돌려준다. `returnMoneyBlock` 은 이것의 `block` 만 돌려주는 껍데기로 남긴다(부르는 곳 그대로).

```
상태가 RETURNABLE 아님                          → block BAD_STATUS
직영 정산                                       → deduct   (기존)
청구서 payment_submitted                        → block INVOICE_LOCKED 409 (기존 문구)
정산서 payment_submitted                        → block SOA_LOCKED 409
청구서 cancelled                                → block INVOICE_LOCKED
po.payment_status 'paid' · 청구서 'paid' · 정산서 'paid'  → refund   ← 바뀌는 곳(전에는 ALREADY_PAID 로 막음)
청구서 미수인데 낸 금액 > 0 (부분 결제)          → block INVOICE_LOCKED (기존 그대로)
그 밖                                           → deduct
```

### 4-3. 환불 기록 — 표 `purchase_order_refunds` · `services/poRefund.js`(신규, 단일 소스)

**결제된 청구서·정산서는 건드리지 않는다**(낸 문서는 그대로). 돌려줄 돈은 따로 한 줄로 적는다.

- `approveReturnCore` 가 mode 를 본다. `refund` 면 `applyReturnDeduction` 대신 `poRefund.addToPending({ po, ret, amount, t, actor })`:
  - 금액 = 반품 수량 × 반품 행 단가(품목 값만 · 배송비 그대로 — 차감과 같은 식).
  - 그 발주의 `pending` 환불 행이 있으면 금액을 더하고, 없으면 새로 만든다(반품을 따로따로 승인해도 판매자는 한 번에 보낸다). 반품 행에 `refund_id` 를 적는다(`deducted_invoice_id`·`deducted_amount` 는 null).
  - 발주 `returned_amount += 금액` · 추적 이벤트 `returned`(meta 에 `settlement:'refund', refund_id`) — 차감 때와 같은 칸이라 «낼 금액(payable)» 표시가 한 식으로 맞는다.
- `poReturnDeduction.attachPendingReturnsToInvoice` 의 조건에 `refund_id: null` 을 더한다(환불로 처리한 반품이 나중에 생기는 청구서에 음수 줄로 또 붙지 않게).
- 상태(글자 칸 · ENUM 아님): `pending`(판매자가 줘야 함) → `sent`(판매자가 보냈다고 적음) → `confirmed`(구매자가 받았다고 적음). 구매자 «못 받았음» = `pending` 으로 되돌리고 사유를 `history` 에 남긴다. 자동으로 닫지 않는다.
- **돈은 시스템 밖에서 오간다**(이체·현금). 시스템은 사실만 적는다. 카드 결제 자동 환불(Stripe·PayPal)은 하지 않는다(§10).

라우트(신규 파일 `routes/po-refunds.js` — po-returns.js 가 이미 637줄 · 마운트·가드는 po-returns 와 **똑같은 모양**으로: 경로별 `router.use(..., authenticateToken, requireSellerRole|requireBuyerRole)`):

| 라우트 | 누가 | 조건 | 하는 일 |
|---|---|---|---|
| `GET /seller-orders/:id/refunds` · `GET /purchase-orders/:id/refunds` | 각자 | 소유 | 목록 |
| `POST /seller-orders/:id/refunds/:rid/sent` `{ method: bank_transfer·cash·other, reference?, note? }` | 판매자 | `pending` | → `sent` · 구매자 메일 «Refund sent: {금액}» |
| `POST /purchase-orders/:id/refunds/:rid/confirm` `{ received_method: bank_transfer·cash·other }` | 구매자 | `sent`(가입 판매자) / `pending`(외부 업체 — 판매자 로그인이 없다) | → `confirmed` · 드로어 규칙(아래) · 판매자 알림 |
| `POST /purchase-orders/:id/refunds/:rid/dispute` `{ note }`(3자 이상) | 구매자 | `sent` | → `pending` · 판매자 알림 |

전부 발주 잠금 + 환불 행 잠금(이중 클릭·동시 2발 방지). 소유권 실패는 404.

**드로어 규칙(구매자 «받았음» + `received_method 'cash'` + 매장 발주)**: 넣는 금액 = `max(0, min(환불액, 이 발주로 드로어에서 나간 순금액(netDrawerOut) − 낼 금액(payable)))`. 열린 시프트가 있으면 `CashMovement in`(source `purchase_order`) 한 줄, 없으면 `drawerSkipped`. 이유: «드로어는 낼 금액을 따라간다» 는 기존 규칙(`adjustPaidAmount`)과 같은 식을 써야 금액 정정과 겹쳐도 두 번 들어가지 않는다. 처음부터 드로어로 안 낸 결제(이체·카드)는 순출금이 0 이라 자연히 0 이다.

### 4-4. 보완 네 가지

1. **신청 철회** `POST /purchase-orders/:id/returns/:returnId/withdraw` — 구매자, `requested` 일 때만 → 상태 `withdrawn`(새 값) · `resolved_at`. 재고·돈 변화 없음(신청만으로는 아무것도 안 움직였다).
2. **판매자 알림** — 구매자 신청·환불 «받았음»·«못 받았음» 때 판매자에게 메일+소켓(`services/poNotifications.js` 에 함수 1개 추가 · 기존 `fireSellerAmendedByBuyerNotification` 과 같은 틀·같은 받는 사람 규칙 · 카테고리 `seller_order_received`). 새 메일 틀·새 카테고리 금지.
3. **목록 표시** — `attachReturnState` 가 발주에 `pending_return_count`(신청 중 건수) · `refund: { pending_amount, sent_amount, status }`(환불 표에서 한 쿼리)를 더 싣는다. 판매자·구매자 목록이 이것으로 «Return requested»·«Refund due»·«Refund sent» 표시를 띄운다.
4. **구매자 «Reverse payment» 가드** — `refund-payment` 라우트에서: 발주에 `paid_by_user_id` 가 없으면(= 구매자가 발주에서 직접 기록한 결제가 아니라 청구서 쪽에서 판매자 확인·카드로 paid 가 된 것) 409 `SELLER_CONFIRMED` «The seller has confirmed this payment — request a return/refund instead». `reversePayment` 함수는 무접촉(구매자 취소 경로가 같이 쓴다). ⚠ 팀원은 먼저 §8-16 으로 «지금 실제로 되돌려지는지» 를 재현하고, 재현되지 않으면 이 가드를 넣지 말고 그 사실만 Fable 에게 전달한다.

## 5. 화면 (공용 `Modal`·`ConfirmModal`·`ThemedButton`·`DataTable` · 새 styled.button/table 금지 · RA 기준 · danger 빨강 `#EF4444`)

### 5-1. 판매자 `IncomingOrdersView.tsx`(2948줄 — 새 창은 파일을 나눈다)

- **«Cancel order»**(danger-outline): 목록 행 액션·상세 창 푸터, «Correct quantities»·«Return items» 옆. 보이는 조건 `row.cancel_blocked?.code !== 'BAD_STATUS'`, `!can_cancel` 이면 disabled + title = 서버 message. submitted 주문은 지금처럼 «Reject» 만.
- 신규 `SellerCancelModal.tsx`: 주문 번호·구매자·총액 요약 → 무엇이 일어나는지 서버 값으로 세 줄(해당하는 것만): «Invoice {번호} will be cancelled» · «{n} dispatched item(s) go back into your stock» · «The buyer already received this order — their stock will be reduced» → Reason 필수 → `ConfirmModal` «Cancel order {번호}? This cannot be undone.» → POST → 닫고 `refreshAll()`.
- 정정 창: `NO_LINES` 응답이면 안내 문구 + «Cancel order instead» 단추(취소 창을 연다).
- 반품 구역: 결제된 주문이면 반품 창 힌트를 «This order is paid — approving creates a refund you then send to the buyer» 로. 신규 `SellerRefundPanel.tsx`: 환불 행마다 금액·상태 — `pending` «Refund due» + «Mark refund sent»(방법·참조·메모 입력 창) / `sent` «Sent · waiting for buyer» / 되돌아온 `pending` 은 호박색 «Buyer reports not received: {note}» / `confirmed` «Refund confirmed».
- 목록 행: «Return requested»(신청 건수 > 0) · «Refund due {금액}» 작은 표시(텍스트 배지 — 장식 이모지 금지).
- Cancelled 탭 상세: 취소 사유·취소된 청구서 번호. 보드(`IncomingOrdersBoard`·`boardColumn.ts`)는 cancelled 가 열에서 빠지는지 확인만(기존 테스트).

### 5-2. 구매자 `PurchaseOrderDetailPage.tsx`

- 결제된 주문에서도 «Request Return» 이 열린다(서버 `can_return`). 힌트: «This order is paid — once the seller approves, they refund the amount to you.»
- 반품 목록: `requested` 행에 «Withdraw»(ConfirmModal) · `withdrawn` 상태 표시.
- 환불 카드: `pending` «Refund {금액} — waiting for the seller» / `sent` «The seller sent {금액} by {method} · ref {reference}» + **«Refund received»**(받은 방법 선택: Bank transfer / Cash into drawer / Other) · **«Not received»**(사유 입력) / `confirmed` 표시. 외부 업체 주문은 `pending` 에서 바로 «Refund received».
- 취소된 주문: «Cancelled by seller» + 사유 + «Invoice {번호} cancelled»(추적 이벤트 meta).
- «Reverse payment» 가 `SELLER_CONFIRMED` 로 거부되면 서버 message 그대로.

### 5-3. i18n

`supplier.json`(`orders.cancel.*`·`orders.refunds.*`) · `purchaseOrders.json`(`detail.refunds.*`·`detail.returns.withdraw*`) 4개 언어(en→ko→zh→ms). `npm run i18n:verify` + **한국어 실브라우저로 영어 남은 곳 0** 확인. 서버 message 를 그대로 보여 주는 곳(막힌 이유)은 기존 정정·반품과 같은 방식.

## 6. DB — 마이그 1개 `scripts/migrate-po-cancel-refund.js` (멱등 · `migrations.registry.json` 에 `deploy`)

| 대상 | 변경 |
|---|---|
| 새 표 `purchase_order_refunds` | `id` · `purchase_order_id` INT NOT NULL · `amount` DECIMAL(12,2) · `currency` VARCHAR(10) · `status` VARCHAR(16) NOT NULL DEFAULT 'pending' · `method` VARCHAR(20) NULL · `reference` VARCHAR(100) NULL · `note` TEXT NULL · `sent_at`·`sent_by_user_id` · `confirmed_at`·`confirmed_by_user_id` · `received_method` VARCHAR(20) NULL · `cash_movement_id` INT NULL · `history` JSON NULL · created/updated · 색인 (`purchase_order_id`,`status`) |
| `purchase_order_returns` | 칸 `refund_id` INT NULL |
| `purchase_order_returns.status` | 값 `withdrawn` 추가 — **반드시 `expandEnum(sequelize, 'purchase_order_returns', 'status', ['withdrawn'])`**(목록 하드코딩 금지) |

모델: 신규 `PurchaseOrderRefund`(+ `models/index.js` 연결·export) · `PurchaseOrderReturn`(ENUM 에 withdrawn · refund_id). 발주 상태·청구서 상태·드로어 source 는 **기존 값만 쓴다**(ENUM 변경 없음). 되돌림 = 새 표·새 칸을 안 읽으면 된다.

## 7. 바꾸는 파일 · 무접촉 · 범위 밖

**백엔드:** `utils/poAmend.js`(sellerCancelBlock · returnSettlement · returnMoneyBlock 껍데기화) · `routes/seller-orders.js`(cancel 라우트 · attachCancelState · NO_LINES 문구) · `routes/po-returns.js`(approveReturnCore 의 mode 분기 · withdraw · 판매자 알림 호출) · 신규 `routes/po-refunds.js` · 신규 `services/poRefund.js` · `services/poReturnDeduction.js`(attachPendingReturnsToInvoice 조건 1줄 · attachReturnState 에 건수·환불 요약) · `services/externalSoa.js`(closeSoaIfEmpty 추가만) · `services/purchaseOrderPayment.js`(recordPayment 취소 가드 1줄) · `routes/purchase-orders-workflow.js`(refund-payment 가드 — §4-4 ④ 조건부) · `services/poNotifications.js`(판매자 알림 1개) · `server.js`(po-refunds 마운트 — po-returns 바로 옆, 같은 방식) · 모델 2 + index · 마이그 1 + 레지스트리 · `scripts/health-check.js`(§8) · 문서: `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` 에 «주문 취소 · 결제 후 반품 환불 (2026-11-23)» 절, `docs/INVOICE_SYSTEM.md` 에 «판매자 주문 취소 = 청구서 취소·정산서에서 빠짐» 한 단락(새 문서 금지).
**프론트:** `IncomingOrdersView.tsx` · 신규 `SellerCancelModal.tsx`·`SellerRefundPanel.tsx` · `PurchaseOrderDetailPage.tsx` · 구매자 발주 목록(표시 배지만) · i18n 2 네임스페이스 × 4. 빌드 1회 · sweep 1회 · SW 버전은 맨 끝.
**무접촉:** 🔒 인쇄·KDS 보호파일 8개 · `poStockReversal.js`(호출만) · `correct-delivery` 본체 · `amend` 본체 · `reversePayment` · `createTradeInvoice` · `invoiceCalculation.js` · `soaChildSync.js` · `invoices-payment.js` · 수령 경로 3개 · 구매자 취소(`/purchase-orders/:id/cancel`).

**범위 밖(보고에 그대로 적을 것):**
1. 결제된 주문의 **취소** — 막고 반품→환불로 보낸다. 결제됐는데 구매자가 아직 «받음» 을 안 누른 주문은 반품할 수량이 0 이라, 자동 수령(10-30)이 지나거나 구매자가 받음 처리한 뒤에야 환불로 갈 수 있다(알려진 한계).
2. 배송 뒤 늘리기·단가 변경·상품 교체, 그리고 «확정 때 청구서 발행» 매장의 확정~출고 사이 수정(§1-3 — 취소 후 다시 넣기로 처리).
3. 카드 결제 자동 환불 · 환불 영수증/크레딧노트 문서 · 환불 증빙 파일 올리기.
4. 구매자가 **확정된 주문의 취소를 요청**하는 흐름(지금처럼 판매자에게 연락 → 판매자가 취소).
5. 매출·구매 통계가 환불·취소를 빼는지 — 팀원은 `returned_amount`·cancelled 를 안 보는 합산 화면을 grep 으로 목록만 뽑아 보고에 붙인다(수식 변경은 별건 · Fable calc).
6. 11-17 §9 의 «옛 승인 반품 소급» 은 그대로 Irene 결정 대기(이번 일과 별개).

## 8. 구현 순서 · 검증에서 증명할 것

**순서:** ① 마이그·모델 → ② `sellerCancelBlock`·`returnSettlement`(이 시점에 기존 반품·정정 health-check 가 그대로 통과하는지 — 단, «결제된 주문 반품 = ALREADY_PAID» 단언은 ④에서 바뀐다) → ③ cancel 라우트 + attachCancelState + closeSoaIfEmpty + recordPayment 가드 → ④ poRefund + po-refunds 라우트 + approveReturnCore 분기 + withdraw + 알림 + 가드(§4-4 ④) → ⑤ health-check 추가·고장주입 → ⑥ 프론트 전부(고장주입 없음) → 빌드 1회 → `verify-all --full` 1회 → ⑦ Fable gate.
⑤까지는 빌드 없이 초 단위 검사만.

**증명(health-check · 데모 매장 38 + 데모 브랜드 10 · 11-07 `makeQ6Fixture` 재사용 — 브랜드 자체재고 20, 1줄 3 × RM 2 · 전부 실호출 · 끝나면 원복):**

취소
1. **확정 뒤 취소(출고 전)**: confirm → `POST cancel {reason}` 200 → 상태 cancelled · 사유 저장 · 재고 변화 0 · 청구서 없음 · 목록 All 에서 빠지고 Cancelled 탭에 있음.
2. **배송완료 뒤 취소(수령 전)**: ship→deliver(청구서 6 발행) → cancel → 브랜드 재고 20 으로 복귀 · 구매자 재고 변화 0 · 청구서 `cancelled`(총액 6 그대로 · 이력 `source 'seller_cancel'`) · 그 뒤 `createTradeInvoice` 를 다시 불러도 새 청구서 **0장**.
3. **수령 뒤 취소**: 수령(구매자 재고 3) → cancel → 구매자 재고 0 · 브랜드 재고 20 · 줄 `quantity_received 0` · `quantity_ordered 3` 그대로.
4. **정산서**: 청구서 2장을 임시 정산서(pending_payment)에 묶고 한 주문 취소 → 정산서 합계 = 남은 한 장 · 취소된 청구서 `parent_soa_invoice_id null`. 남은 한 주문도 취소 → 정산서 `cancelled`.
5. **막기**(각 code · 거부 뒤 재고·청구서·발주 **변화 0**): submitted `BAD_STATUS` · paid `ALREADY_PAID` · 청구서 payment_submitted `INVOICE_LOCKED` 409 · 정산서 paid `SOA_LOCKED` 409 · 신청 중 반품 `RETURN_PENDING` 409 · 승인된 반품 `HAS_RETURNS` · 사유 없음 `REASON_REQUIRED` · 다른 판매자 토큰 404 · 구매자 토큰 403 · 익명 401. 직영 정산 주문은 통과하고 청구서 cancelled·`paid_amount 0`.
6. **취소 뒤 잠김**: 구매자 수령 400 · 발주 Pay 400(recordPayment 가드) · 반품 신청 400 · 정정 400 · 두 번째 cancel 400 · 정산서 직전 청구서 채우기가 이 발주를 안 고름.
7. **동시 2발**(cancel 병렬 2 · cancel ↔ 구매자 수령 병렬): 재고 되돌림 장부 줄이 한 벌만.
8. 목록·상세의 `can_cancel` 이 1·5 의 실제 POST 결과와 **같은 답**(화면 값과 서버 거부 일치).

수정
9. **기존 정정 재증명**: deliver 뒤 3→2 → 청구서 6→4 · 발주 총액 4 · 브랜드 재고 +1 · 정산서 따라감. 3→0(유일한 줄) → `NO_LINES` + 새 문구.

반품·환불
10. **결제 전은 11-17 과 같은 숫자**(차감 mode): 기존 반품 검사 전부 통과.
11. **결제 후 구매자 신청**: 수령 → 청구서 결제(submit-payment → 판매자 confirm-payment) → 구매자 반품 1 신청 201(전에는 ALREADY_PAID) → 판매자 승인 → 재고(구매자 2 · 브랜드 +1) · 청구서 총액 **6 그대로·paid 그대로** · 환불 행 `pending` 2 · 반품 행 `refund_id` 있음·`deducted_invoice_id` null · `po.returned_amount 2`.
12. **환불 두 단계**: 판매자 `sent`(method·reference) → 구매자 `dispute`(→ pending · 사유 기록) → 판매자 다시 `sent` → 구매자 `confirm` → `confirmed`. 순서 어긴 호출(pending 에서 구매자 confirm · confirmed 뒤 sent)은 400/409. 같은 발주에 두 번째 반품 승인 → pending 행이 없으므로 새 행.
13. **드로어**: 매장이 발주 Pay 현금 6(드로어 out 6) → 반품 1 승인 → 환불 confirm `cash` → 드로어 `in` **2** · 순출금 4 = 낼 금액 4. 이체로 낸 주문은 confirm `cash` 여도 드로어 이동 0.
14. **판매자 직접 반품(결제 후)**: 즉시 승인 + 환불 `pending`. **외부 업체 fixture**: 결제 후 반품을 구매자가 닫고 `pending` 에서 바로 confirm.
15. **철회**: 신청 → withdraw → `withdrawn` · 반품 가능 수량 복귀 · 재고·돈 변화 0 · 승인된 행 withdraw 400 · 판매자 토큰 withdraw 404/403.
16. **구매자 결제 되돌리기 가드**: (먼저 가드 없이 재현 여부 기록) 판매자가 confirm-payment 한 주문에서 `refund-payment` → 409 `SELLER_CONFIRMED` · 청구서 paid 유지. 구매자가 발주 Pay 로 직접 기록한 결제는 지금처럼 되돌려짐.
17. **알림**: 구매자 신청·confirm·dispute 때 판매자 알림 함수가 불리고, cancel·sent 때 구매자 메일이 만들어짐(하니스 렌더 · 받는 주소는 @example.com 시험 계정).
18. **고장주입(반증 4건 · pm2 restart 뒤 · 확인하고 원복)**: ⓐ cancel 의 `restoreSellerStock` 호출을 빼면 2·3 실패 ⓑ 청구서 cancelled 갱신을 빼면 2·4 실패 ⓒ `sellerCancelBlock` 의 paid 줄을 빼면 5 실패 ⓓ approveReturnCore 를 항상 deduct 로 두면 11 실패(paid 청구서 총액이 내려감).
19. **마이그**: 두 번 돌려 두 번째가 변화 0 · `withdrawn` 추가 뒤 기존 세 값 그대로 · `check-migration-registry.js`·`check-enum-parity.js` 통과.
20. **화면(실브라우저 · 데모 계정 `[as=brand store=38]`·`[as=restaurant store=38]`)**: 판매자 취소 창(세 줄 안내가 상황별로 맞게) · 막힌 주문에서 단추 비활성+이유 · 환불 보냄 → 구매자 화면 받았음/못 받았음 · 철회 · 한국어 화면 영어 0 · 콘솔 오류 0 · 폰 너비에서 창이 잘리지 않음.
21. `check-sensitive-diff.js`(돈·마이그·새 라우트 → 게이트 대상일 것) · `check-print-guard.js` 변경 0 · IDOR 스캔에 새 라우트 6개 포함.

검사기가 0건·skip 으로 끝나면 통과가 아니라 고장으로 본다. 확인 못 한 항목은 «확인 못 함» 으로 적는다. 통과 선언은 Fable gate 가 한다.

## 9. Irene 질문 · 운영 확인

### 9-1. Irene 에게 물을 것 — **없음**

이번 설계에 되돌리기 어려운 선택은 없다. 기록을 지우지 않고(취소로 남김), 낸 문서를 고치지 않고(환불은 따로 적음), 돈을 자동으로 움직이지 않는다(기록만). **답을 기다리지 않고 구현을 시작한다.** 운영 반영은 다음 배포 때.

### 9-2. 팀원이 운영 읽기로 확인해 gate 때 같이 넘길 것(쓰기 없음 · 구현을 막지 않음)

1. 운영에서 «확정 때 청구서 발행»(`brand_billing_terms.invoice_trigger = 'on_confirmed'`) 매장 수와, 확정 상태 + 청구서 있는 발주 수(§1-3 구간이 실제로 있는지).
2. 운영 발주의 판매자 종류 × 상태 × 결제 여부 × 결제수단 건수(개발 DB 로 본 것과 같은 표) — 결제된 주문이 어떤 길로 paid 가 됐는지(`paid_by_user_id` 있음/없음)를 봐야 §4-4 ④ 가드가 실제 매장 습관을 막지 않는지 판단할 수 있다.
운영 읽기가 허락 창에서 멈추면 재시도하지 말고 «확인 못 함» 으로 넘긴다.

## 10. Fable 이 정한 기본값 — 바꾸고 싶으면

- **삭제 = 취소로 남김.** 완전히 지우는 길은 만들지 않는다(청구서 번호·재고 장부가 끊긴다).
- **판매자 취소·판매자 직접 반품은 구매자 동의 없이 바로 확정**(메일로 알림, 사유 필수). 이미 받은 주문을 취소하면 구매자 재고가 그만큼 빠진다. 구매자 확인 단계를 두려면 «취소 요청» 상태가 하나 더 필요하다.
- **결제된 주문은 취소·정정 불가, 반품→환불만.** 환불 금액은 반품한 품목 값(배송비 제외)으로 고정, 판매자가 금액을 고쳐 적지 못한다.
- **환불은 기록만**(돈은 밖에서). 구매자가 «받았음» 을 안 눌러도 자동으로 닫지 않는다.
- **배송 뒤 수정은 줄이기만.** 더 보냈거나 값이 틀렸으면 취소 후 다시 넣기·«Add order».
- 설계와 다른 판단이 필요해지면(취소된 청구서가 어떤 화면·PDF·연체 일정에서 다시 살아난다 · 환불 mode 가 기존 반품 검사와 충돌한다 · §4-4 ④ 가 재현되지 않는다 등) **구현을 멈추고 Fable 에게 그 사실만 전달**한다.
