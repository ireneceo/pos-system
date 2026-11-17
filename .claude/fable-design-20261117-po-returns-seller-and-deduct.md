# Fable 설계 — 판매자도 반품을 시작하고, 반품 금액이 실제로 청구에서 빠진다 (2026-11-17)

> Irene 원문: **«https://purplehere.com/pos/brand/general/incoming-orders 여기에서 아이템 한개씩 또는 주문 전체 반품 처리할 수 있어야 해. 그리고 고객도 신청해야 하고, 그럼 비용이 차감되고 결제가 된 경우 말고는 되어야 해. 확인해줘.»**
> Fable 읽기(코드·DB 변경 0): `routes/po-returns.js` 전체 · `models/PurchaseOrderReturn.js` · `services/poStockReversal.js` · `utils/poAmend.js`(sellerCorrectionBlock) · `routes/seller-orders.js` correct-delivery(1711~1975) · `services/purchaseOrderService.js`(tradeInvoiceLineAttrs·createTradeInvoice 요금부) · `utils/invoiceCalculation.js` · `services/reconcileInvoiceSync.js` · `services/externalSoa.js`(followChildToSoa·recomputeSoaTotal) · `services/purchaseOrderPayment.js`(payableFrom·recordPayment) · `routes/invoices-crud.js`(요금 재계산부) · 두 화면의 반품 부분 · 11-07 설계 문서 · 메모리 4건.
> 실행해 본 것은 없다(읽기만). 아래 «사실» 은 코드에서 읽은 것이고, 숫자 증명은 §8 이 구현자 몫이다.

## 0. 결론

Irene 문장을 네 가지로 나눠 판정했다.

| Irene 요구 | 지금 | 이번 설계 |
|---|---|---|
| 판매자 화면에서 품목 하나씩 반품 | 없음(구매자 신청을 승인·거절만) | **판매자가 직접 반품을 넣는다** — 넣는 즉시 승인된 것으로 처리(§3-2) |
| 판매자 화면에서 주문 전체 반품 | 없음 | 같은 창의 **«Return entire order»** 가 모든 줄을 반품 가능 수량으로 채운다 |
| 고객(구매자)도 신청 | 있음(줄별) | 유지 + **«Return all»** 한 번에 채우기 + 결제된 주문은 왜 안 되는지 표시 |
| 반품하면 비용 차감 | 🔴 **안 됨** — 크레딧노트만 생기고 아무도 안 읽는다. 청구서·정산서·발주 낼 금액 그대로 | **승인 순간 거래 청구서에 음수 줄을 넣어 총액을 내리고, 정산서 합계와 발주 «낼 금액» 이 따라간다**(§4). 크레딧노트는 더 만들지 않는다 |
| 결제된 경우 말고는 | 결제 여부를 전혀 안 봄 | **결제된 주문은 반품 신청·승인 모두 막는다**(판정 함수 하나, §2). 직영 정산(INTERNAL)은 실제 결제가 아니므로 통과 |

- **DB 변경 있음(칸 4개 추가 · ENUM 없음)** → 마이그 1개 등록.
- 돈·재고·청구서·정산서를 같이 움직인다 → **구현 끝나면 Fable 검증(gate) 1회 필수.**
- **Irene 에게 물을 것 1개**(§9 — 운영에 이미 쌓인 «승인됐는데 안 빠진» 반품을 소급해 뺄지). 구현은 답 없이 시작할 수 있다(답은 배포 때 필요).

## 1. 왜 지금 «차감» 이 안 되나 (사실)

1. 승인(`approveReturnHandler`)은 재고를 되돌리고 `Invoice(status 'credit', invoice_category 'credit_note')` 한 장을 만든다. 이 크레딧노트는 `parent_soa_invoice_id` 가 없어 정산서 합계(`soaChildSum` = 묶인 자식 총액 합)에 안 들어가고, 거래 청구서 총액도 안 건드린다. 화면에도 `credit_note` 를 읽는 곳이 없다.
2. 발주 «Pay» 가 드로어에서 꺼내는 금액은 `purchaseOrderPayment.payableFrom` = `po.total_amount`(가입 판매자) 또는 `po.invoice_total`(대조 끝난 외부 업체). **반품을 모른다.** 청구서만 고치면 발주 Pay 는 여전히 전액을 낸다 — 그래서 두 곳을 같이 고쳐야 한다.
3. 반품 신청·승인 어디에도 `payment_status`·청구서 상태 검사가 없다.
4. 청구서 총액은 `finalizeInvoice` 가 «품목 합 − 할인 + Σ additional_charges» 로 다시 계산하고 **음수 요금 줄을 허용**한다(대조의 «Rounding adjustment»·«Supplier invoice difference» 가 이미 음수로 운영 중). 출고 뒤 정정(correct-delivery)은 품목 줄만 다시 쓰고 `additional_charges` 는 그대로 둔다.
5. 정산서는 `externalSoa.followChildToSoa` 가 자식 총액 변화를 따라간다(커밋 뒤 자기 트랜잭션).

## 2. 판정 — `returnMoneyBlock(po, invoice, soa)` 하나 (`utils/poAmend.js` 에 추가, sellerCorrectionBlock 옆)

**구매자 신청 POST · 판매자 직접 반품 POST · 승인 · 목록/상세의 `can_return` 이 전부 이 함수를 부른다.** 화면에 상태 목록을 복사하지 않는다(«버튼은 떴는데 누르면 400» 금지).

```
const RETURNABLE_STATUSES = ['received', 'partial_received', 'delivered'];   // 지금 po-returns.js 에 박힌 목록을 여기로 옮김
const isInternal = (po, invoice) => po.payment_method === 'internal' && (!invoice || invoice.payment_method === 'internal');

function returnMoneyBlock(po, invoice, soa) {
  if (!RETURNABLE_STATUSES.includes(po.status))
    return { code: 'BAD_STATUS', http: 400, message: `Returns are only possible after delivery (current status '${po.status}')` };
  if (isInternal(po, invoice)) return null;                       // 직영 정산 — 돈이 오간 적 없다
  if (po.payment_status === 'paid')
    return { code: 'ALREADY_PAID', http: 400, message: 'This order is already paid — a return cannot reduce the bill. Reverse the payment first.' };
  if (invoice && (['paid', 'payment_submitted', 'cancelled'].includes(invoice.status) || Number(invoice.paid_amount) > 0))
    return { code: 'INVOICE_LOCKED', http: 409, message: invoice.status === 'payment_submitted'
      ? 'Payment for this invoice has been submitted — reject the payment submission first'
      : `The invoice is ${invoice.status} and cannot be reduced` };
  if (soa && ['paid', 'payment_submitted'].includes(soa.status))
    return { code: 'SOA_LOCKED', http: 409, message: 'The statement that contains this invoice is already paid or submitted' };
  return null;
}
```

정한 것과 이유:
- **`refunded` 는 통과**(정정은 막지만 반품은 통과). 결제를 되돌린 발주는 다시 낼 수 있는 상태(`recordPayment` 가 paid 만 거부)라 «결제 안 된 것» 이다. 안 그러면 «결제를 되돌린 뒤 반품» 길이 영영 막힌다.
- **대조 끝난 외부 업체 발주(`invoice_reconciled_at`)는 막지 않는다**(정정은 막는다). 반품은 받은 뒤의 별개 사건이고, 지금도 되던 재고 되돌림을 없애면 안 된다. 금액 처리 규칙은 §4-4.
- **직영 정산은 통과.** 청구서가 처음부터 paid/internal 이지만 실제 결제가 아니다. 청구서 총액과 `paid_amount` 를 같이 내린다(§4-2) — 브랜드 매출 숫자가 맞게 남는다.
- 수량 한도는 지금 그대로 **받은 양(`quantity_received`) − 이미 신청·승인된 반품 합**. 배송 완료인데 아직 수령 전(받은 양 0)이면 반품할 것이 없다 → 줄 단위 코드 `NOTHING_RECEIVED`, 판매자 화면은 «아직 받지 않은 주문 — Correct quantities 를 쓰세요» 로 안내(§5-1). 이유: 받지 않은 것을 «반품» 으로 적으면 뒤에 오는 수령(자동 완료 포함)이 그 양을 다시 넣는다. 새 예외를 만들지 않는다.

## 3. 서버

### 3-1. 승인 본체를 함수로 — `approveReturnCore({ po, ret, t, actor })` (`routes/po-returns.js` 안)

지금 `approveReturnHandler` 의 «합산 검사 → 재고 되돌림 → 크레딧노트 → 반품 행 갱신» 을 한 함수로 묶고, 크레딧노트 블록을 **차감(§4)** 으로 바꾼다. 승인 라우트 두 입구(판매자·외부 업체일 때 구매자)와 새 판매자 직접 반품(§3-2)이 이 함수를 부른다. 순서:

1. `invoice = po.trade_invoice_id ? Invoice.findByPk(lock)` · `soa = invoice?.parent_soa_invoice_id ? Invoice.findByPk` → `returnMoneyBlock` 걸리면 그 코드로 거부(롤백).
2. 승인 합산 검사(지금 그대로).
3. `reverseBuyerStock` · `restoreSellerStock` (지금 그대로 — 인자·장부 모양 불변).
4. `applyReturnDeduction` (§4).
5. `ret.update({ status:'approved', approved_by_user_id, resolved_at, deducted_invoice_id, deducted_amount })`. `credit_invoice_id` 는 더 쓰지 않는다(옛 행은 그대로).
6. 반환값에 `invoice`·`prevInvoiceTotal`·`deducted` 를 실어, **커밋 뒤** 호출자가 `followChildToSoa` 와 구매자 알림을 한다(트랜잭션 안에서 부르지 않는다 — correct-delivery 와 같은 이유).

응답: `{ success, data: { return, deduction: { amount, invoice: { id, invoice_number, total_before, total_after } | null, payable_after, soa } }, message }`. 옛 `credit_invoice` 키는 없앤다(읽는 화면 없음 — 구현자가 grep 으로 0건 재확인).

### 3-2. 판매자 직접 반품 — `POST /api/seller-orders/:id/returns` (같은 파일 · 기존 `router.use('/seller-orders/:id/returns', authenticateToken, requireSellerRole)` 아래)

```
body: { items: [{ purchase_order_item_id, quantity, reason? }], reason: string }   // reason 필수(3자 이상)
```
한 트랜잭션: PO 잠금 → `ownsPurchaseOrder` 아니면 404 → `returnMoneyBlock` → 줄마다 지금 구매자 POST 와 **같은 검증 함수**(줄 소속 · 수량 > 0 · `수량 + 신청·승인 합 ≤ 받은 양`)를 거쳐 반품 행 생성(`status 'requested'`, `initiated_by 'seller'`, `requested_by_user_id = 판매자 사용자`) → 곧바로 `approveReturnCore` → 커밋. 한 줄이라도 실패하면 전부 롤백(반쯤 된 반품 없음).
- 검증은 구매자 POST 의 for 문 안쪽을 `validateReturnLine(poItem, qty, t)` 로 뽑아 둘이 같이 쓴다(복제 금지).
- «주문 전체» 는 서버에 따로 없다 — 화면이 모든 줄을 반품 가능 수량으로 채워 같은 POST 를 보낸다(전체 전용 길을 만들면 판정이 둘이 된다).
- 외부(미가입) 공급업체 주문에는 판매자 로그인이 없으니 이 길이 닿지 않는다. 그쪽은 지금처럼 구매자가 신청하고 스스로 닫는다.

### 3-3. 구매자 신청 `POST /api/purchase-orders/:id/returns`

- 상태 검사를 `returnMoneyBlock` 으로 교체(청구서·정산서 읽기 추가). 결제된 주문이면 400/409 + code.
- 줄 가격: 대조된 줄은 실제 청구가로 — `unit_price: poItem.invoiced_unit_price ?? poItem.unit_price`(외부 업체가 실제 청구한 값으로 빼야 금액이 맞는다. 대조 안 한 주문은 지금과 같다).
- 나머지(합산 검사·외부 발송·닫기) 무접촉.

### 3-4. 목록·상세 장식 — `attachReturnState(rows)` (판매자 `GET /seller-orders`·`/:id`, 구매자 `GET /purchase-orders/:id`)

`attachCorrectionState` 와 같은 모양, 청구서·정산서·반품 합을 각각 **한 쿼리**로 모은다.
- 발주: `can_return` · `return_blocked: { code, message } | null` · `returned_amount`(칸 그대로) · `payable_amount`(= payableFrom 결과).
- 줄: `returned_qty`(승인 합) · `return_pending_qty`(신청 합) · `returnable_qty`(= 받은 양 − 둘의 합, 0 미만이면 0).
- 반품 목록 GET 두 개: 행에 `initiated_by`·`deducted_amount`·`deducted_invoice_number` 를 싣는다.

### 3-5. 알림

- 승인·판매자 직접 반품 뒤 구매자 메일 1통(커밋 뒤 `setImmediate` · 실패해도 반품은 유효): 제목 «Return processed: {po_number} · by {seller}», 본문 = 품목·수량 표 + «Invoice {number}: a → **b**»(청구서 있을 때) + 이유. 카테고리 `seller_order_received`(정정·배송 알림과 같은 칸). `seller-orders.js` 의 `buyerMail`·`fireBuyerNotification` 을 그대로 쓴다(필요하면 그 둘만 export — 새 메일 틀 금지).
- 소켓 `seller-order-updated`(기존). 판매자 쪽 새 알림 없음.

## 4. 금액 차감 — `services/poReturnDeduction.js` (신규, 단일 소스)

### 4-1. 무엇을 얼마

- 차감액 = `round2(반품 수량 × 반품 행 unit_price)` = 지금 크레딧노트 금액과 같은 식. **품목 값만** 뺀다. 배송비·세금 줄은 그대로(주문 전체를 반품해도 배송비는 남는다 — 정정과 같은 규칙. 바꾸려면 §10).

### 4-2. `applyReturnDeduction({ po, ret, item, invoice, t, actor })`

1. **청구서**(있을 때): `additional_charges` 끝에 한 줄 추가 →
   `{ name: 'Return R{ret.id} — {판매자 상품명|description} × {qty} {unit}', amount: -차감액, kind: 'po_return', return_id: ret.id }`
   → `finalizeInvoice(invoice.id, t)` → `modification_history` 에 `{ changes: { total_amount: { from, to } }, reason: 'Return R{id} approved — PO {po_number}', source: 'po_return' }` · `is_modified true`.
   - 직영 정산 청구서(paid/internal)면 `paid_amount` 도 새 총액으로(대조 `allowPaid` 와 같은 처리). 상태는 paid 그대로.
   - 품목 줄(InvoiceItem)은 건드리지 않는다. 음수 **요금 줄**은 운영 선례가 있고, 음수 **품목 줄**은 선례가 없다(검증기·PDF·메일 미확인) → 요금 줄을 택했다. 정정이 품목 줄을 다시 써도 이 줄은 살아남는다.
2. **발주**: `po.returned_amount += 차감액` · 추적 이벤트 `returned`(`appendTrackingEvent` — status 불변, 이벤트 이름일 뿐) `{ return_id, item_id, qty, amount, by_user_id, initiated_by, invoice_id, invoice_total_before, invoice_total_after }`. `total_amount`·`quantity_ordered`·`quantity_received` 는 **그대로**(주문·수령은 사실 기록이고, 정정·대조가 이 값들을 다시 계산한다).
3. 반환 `{ amount, invoiceTotalBefore, invoiceTotalAfter }`.

### 4-3. 발주 «낼 금액» — `purchaseOrderPayment.payableFrom`

`amount = max(0, round2(기존 금액 − po.returned_amount))` 을 두 갈래(발주 금액·공급업체 청구액) 모두에 적용하고 결과에 `returned` 를 싣는다. 이게 없으면 청구서는 380 인데 발주 Pay 가 드로어에서 475 를 꺼낸다. 발주 결제 뒤 청구서에 적히는 `paid_amount` 는 청구서 자기 총액을 따르므로(기존 규칙) 두 숫자가 같다.

### 4-4. 대조(외부 업체)와의 순서

`reconcileInvoiceSync.syncTradeInvoiceFromReconcile` 은 요금 줄을 처음부터 다시 만든다 → **만든 뒤 `returnChargesFor(po.id, invoice.id)`(이 청구서에서 뺀 승인 반품들의 줄 — 반품 행에서 다시 만든다. 요금 줄의 `kind` 키에 기대지 않는다)를 덧붙인다.** 규칙 한 줄: **«청구서 총액 = 대조로 적은 총액 − 승인된 반품»**, 발주 낼 금액도 같은 식(§4-3)이라 한 숫자다.
- 알려진 한계(정직하게): 공급업체가 **반품을 이미 뺀** 새 청구서를 보내 그 금액으로 다시 대조하면 두 번 빠진다. 그때는 반품 줄이 청구서에 눈에 보이므로 사람이 알아챌 수 있다(조용히 사라지는 반대쪽보다 낫다고 판단). 대조 화면 안내는 이번 범위 밖(§10).

### 4-5. 정산서

커밋 뒤 `invoice.parent_soa_invoice_id` 가 있고 총액이 바뀌었으면 `followChildToSoa(invoice, { prevChildTotal, actorId, actorName })`. 결제·제출된 정산서는 §2 에서 이미 막혔다.

### 4-6. 크레딧노트

**더 만들지 않는다.** 청구서에서 직접 빠지는데 같은 돈의 문서를 한 장 더 두면, 나중에 누가 «크레딧노트 상계» 를 만들 때 두 번 빠진다. 옛 크레딧노트 행은 그대로 둔다(§9 소급 때만 취소 처리).

## 5. 화면

### 5-1. 판매자 `IncomingOrdersView.tsx` (+ 신규 `pages/IncomingOrders/SellerReturnModal.tsx` — 본체가 2690줄이라 창은 따로 둔다)

- **단추 «Return items»**: 상세 창 푸터와 목록 행 액션(«Correct quantities» 옆). 보이는 조건 = `row.return_blocked?.code !== 'BAD_STATUS'`. `can_return` 이 false 면 disabled + title = `return_blocked.message`(결제된 주문은 왜 안 되는지 보인다).
- **반품 창**(공용 `Modal` large · 새 styled.button/table 금지 · RA 기준):
  - 힌트 «Enter what the buyer sent back. The buyer's stock goes down, your stock comes back, and the amount is taken off the invoice.»
  - 줄 표: 품목 · Received · Already returned(승인+신청) · **Return**(숫자 입력, `min 0 · max returnable_qty · step any`) · Amount(수량×단가). `returnable_qty` 0 인 줄은 입력 잠금.
  - 표 위 **«Return entire order»**(outline) = 모든 줄을 `returnable_qty` 로 채움 · «Clear».
  - 모든 줄 `returnable_qty` 가 0 이고 받은 양이 0 이면 호박색 안내 «The buyer has not received this order yet — use Correct quantities instead.»
  - 합계 띠 «Return total −X» · «Invoice {number}: a → b»(`trade_invoice` 있을 때) · 배송비 있으면 «Delivery fee unchanged».
  - Reason 필수(3자 이상). 저장 → `ConfirmModal` «Return {n} item(s), −{amount}?» → POST → 닫고 `reloadReturns()`+`refreshAll()`.
- **기존 «Return Requests» 목록**: 제목 «Returns» · 행에 «by seller/by buyer» · 승인된 행에 «−{deducted_amount} · Invoice {number}». 승인 확인 문구의 «Credit Note will be issued automatically» → «The amount will be taken off the invoice.» `window.confirm`·`window.prompt` 는 `ConfirmModal`·사유 입력 모달로 바꾼다(문구를 어차피 고치는 자리). 승인 거부 응답(code `ALREADY_PAID` 등)은 서버 message 그대로 보여 준다.
- 상세 합계에 `returned_amount > 0` 이면 «Returned −X» · «Net Y» 두 줄.

### 5-2. 구매자 `PurchaseOrderDetailPage.tsx`

- «Request Return» 단추: 화면의 상태 목록(줄 1217) 대신 서버 칸 — 보이기 `return_blocked?.code !== 'BAD_STATUS'`, 비활성 + 이유 `!can_return`.
- 창에 **«Return all»**(모든 줄을 `returnable_qty` 로) · 줄마다 최대값 = `returnable_qty` · 합계 «Return total».
- 힌트: 가입 판매자 «Returns need the seller's approval. Once approved the amount is taken off the invoice.» / 외부 업체는 기존 문구 유지 + 닫을 때 같은 차감 안내.
- 반품 목록 행·합계 줄(«Returned −X · To pay Y»)·`returned` 이벤트 배너(«The seller processed a return» — 판매자가 직접 넣은 경우)는 5-1 과 같은 칸을 읽는다.

### 5-3. i18n

`supplier.json` `orders.returns.*` · `purchaseOrders.json` `detail.returns.*` 4개 언어(en→ko→zh→ms) · `npm run i18n:verify` + **한국어 실브라우저로 영어 남은 곳 0** 확인(메모리 «번역 키 4언어 모두 없음»).

## 6. DB — 마이그 1개 (`scripts/migrate-po-return-deduction.js` · 멱등 · `migrations.registry.json` `deploy`)

| 테이블 | 칸 | 뜻 |
|---|---|---|
| `purchase_order_returns` | `initiated_by` VARCHAR(10) NOT NULL DEFAULT 'buyer' | 'buyer' / 'seller' (ENUM 아님) |
| `purchase_order_returns` | `deducted_invoice_id` INT NULL | 금액을 뺀 거래 청구서. null = 안 뺌(옛 행·청구서 없는 주문) |
| `purchase_order_returns` | `deducted_amount` DECIMAL(12,2) NULL | 뺀 금액 |
| `purchase_orders` | `returned_amount` DECIMAL(12,2) NOT NULL DEFAULT 0 | 승인돼 차감된 반품 합(목록이 줄마다 합산 쿼리를 안 하게) |

모델 3곳(PurchaseOrderReturn·PurchaseOrder) 같이. 칸 추가뿐이라 되돌림 = 칸을 안 읽으면 된다.

## 7. 바꾸는 파일 · 무접촉 · 범위 밖

**백엔드:** `utils/poAmend.js`(returnMoneyBlock·RETURNABLE_STATUSES) · `routes/po-returns.js`(approveReturnCore · validateReturnLine · 판매자 POST · 판정 교체 · 크레딧노트 제거) · 신규 `services/poReturnDeduction.js`(applyReturnDeduction · returnChargesFor) · `services/purchaseOrderPayment.js`(payableFrom) · `services/reconcileInvoiceSync.js`(반품 줄 덧붙이기 한 곳) · `routes/seller-orders.js`·`routes/purchase-orders-crud.js`(attachReturnState) · 모델 2 · 마이그 1 + 레지스트리 · `scripts/health-check.js`(§8) · 문서 `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` 에 «반품 — 판매자 직접·금액 차감 (2026-11-17)» 절(새 문서 금지) · 메모리 `reference_po_return_stock_symmetry` 의 «CN 이 SOA 에 미상계» 백로그 줄 갱신.
**프론트:** `IncomingOrdersView.tsx` · 신규 `SellerReturnModal.tsx` · `PurchaseOrderDetailPage.tsx` · i18n 2 네임스페이스 × 4. 빌드 1회 · sweep 1회 · SW 버전은 맨 끝.
**무접촉:** 🔒 인쇄·KDS 보호파일 8개 · `poStockReversal.js`(호출만) · correct-delivery 라우트 · `createTradeInvoice` · `invoiceCalculation.js` · `externalSoa.js`(호출만) · 수령 경로 3개 · 수령 때 자동 반품 생성부.

**범위 밖(하지 않는다 — 보고에 그대로 적을 것):**
1. **결제된 주문의 반품·환불.** Irene 문장대로 막는다. 돈을 돌려주는 흐름은 별도 설계다.
2. 받기 전(배송 완료·미수령) 물건을 되가져온 경우 — «Correct quantities» 로 처리. 그 기능이 «전 줄 0» 을 안 받는 것(주문 통째 미배송)은 11-07 설계의 범위 밖 그대로.
3. 구매 통계 중 `po.total_amount` 를 직접 더하는 화면이 반품을 빼는지 — 구현자는 grep 으로 목록만 뽑아 보고에 붙인다(수식 변경은 별건·Fable calc).
4. 대조 화면의 «반품 줄이 붙어 있음» 안내(§4-4 한계).
5. 메모리에 있는 옛 백로그(푸드코트 출고 차감 누락 · FIFO 배치 미역전).

## 8. 구현 순서 · 검증에서 증명할 것

**순서:** ① 마이그·모델 → ② returnMoneyBlock + approveReturnCore 추출(동작 동일 상태에서 기존 반품 health-check 통과 확인) → ③ poReturnDeduction + payableFrom + 대조 덧붙이기 → ④ 판매자 POST + attachReturnState + 알림 → ⑤ health-check 추가·고장주입 → ⑥ 프론트 전부 → 빌드 1회 → `verify-all --full` 1회 → ⑦ Fable gate.
⑤까지는 빌드 없이 초 단위 검사만 쓴다.

**증명(health-check `inventory`/`trade` · 데모 매장 38 + 데모 브랜드 10 · 11-07 의 `makeQ6Fixture` 재사용 — 브랜드 자체재고 20, 1줄 3 × RM 2, 실제 호출로):**
1. **판매자 직접 반품(부분)**: ship→deliver→수령(구매자 재고 3·청구서 6) → 판매자 `POST /seller-orders/:id/returns {items:[{…, quantity:1}], reason}` 201 → 반품 행 `approved`·`initiated_by 'seller'`·`deducted_amount 2` · 구매자 재고 2 · 브랜드 재고 +1 · 청구서 총액 **4**(요금 줄 −2 · `modification_history` 마지막 `source 'po_return'`) · `po.returned_amount 2` · 상세 `payable_amount 4` · `total_amount` 6 그대로 · 상태 그대로 · 크레딧노트 **0장**.
2. **주문 전체**: 2줄 발주에서 모든 줄 `returnable_qty` 로 POST → 청구서 품목분 0(배송비 5 를 둔 경우 총액 5) · 구매자 재고 0 · 이후 같은 POST 는 400(초과).
3. **구매자 신청 → 판매자 승인**: 신청 시점엔 청구서·재고 불변 → 승인 뒤 1 과 같은 숫자.
4. **결제 막기**(각 code): `payment_status='paid'` → 구매자 신청 `ALREADY_PAID` · 판매자 직접 `ALREADY_PAID` · 기존 requested 행 승인 `ALREADY_PAID` · 청구서 `payment_submitted` → `INVOICE_LOCKED` 409 · 정산서 `paid` → `SOA_LOCKED` 409. 거부된 뒤 재고·청구서·반품 행 **변화 0**. `refunded` 는 통과.
5. **직영 정산**: 청구서 paid/internal 주문에서 반품 → 통과 · 청구서 총액과 `paid_amount` 가 같이 내려가고 status paid 유지.
6. **정산서**: 청구서를 임시 정산서(pending_payment)에 묶고 반품 → 정산서 `total_amount` 가 자식 합으로 내려감(`source 'soa_child_sync'`).
7. **발주 Pay 금액**: 1 뒤 매장 현금 Pay → 드로어 출금 `amount` **4**(6 아님) · 청구서 paid `paid_amount 4`.
8. **정정과의 공존**: 반품 1 승인 뒤 correct-delivery 3→2 → 청구서 = 품목 4 + 반품 줄 −2 = **2**(반품 줄이 살아 있음) · 3→0.5 는 `LINE_HAS_RETURNS`.
9. **대조와의 공존**(외부 업체 fixture): 반품 차감 뒤 대조 저장 → 청구서 총액 = 적은 총액 − 반품 · `payable_amount` 같은 숫자.
10. **권한**: 다른 판매자 토큰 404 · 구매자 토큰으로 판매자 POST 403 · 가입 판매자 주문에서 구매자 승인 404(기존 유지) · 동시 2발(같은 판매자 POST 병렬) → 합이 받은 양을 넘지 않음.
11. **기존 반품 검사**(Sprint 6·7 · 2026-07-13 대칭 · 11-07) 통과 — 크레딧노트를 기대하던 단언만 `deduction` 으로 바꾸고 그 사실을 보고에 적는다.
12. **고장주입(반증 2건 · pm2 restart 뒤)**: ⓐ `applyReturnDeduction` 호출을 빼면 1·6·7 이 실패 ⓑ `returnMoneyBlock` 의 paid 줄을 빼면 4 가 실패. 둘 다 실패를 확인한 뒤 원복.
13. **화면(실브라우저 · 데모 계정)**: 판매자 창에서 한 줄 반품·전체 반품 · 결제된 주문에서 단추 비활성+이유 · 구매자 «Return all» · 한국어 화면 영어 0 · 콘솔 오류 0.
14. `check-sensitive-diff.js` 결과(돈·마이그 → 게이트 대상일 것) · `check-print-guard.js` 변경 0.

확인 못 한 항목은 «확인 못 함» 으로 적는다. 통과 선언은 Fable gate 가 한다.

## 9. Irene 에게 물을 것 (1개 · 배포 때 필요 · 구현은 먼저 진행)

**이미 승인됐는데 금액이 안 빠진 옛 반품을 소급해서 뺄까요?**
지금까지 승인된 반품은 크레딧노트만 생기고 청구서는 그대로였다(개발 DB 실례: PO-R5-20260605-001 반품 RM 95, 청구서 RM 475 그대로). 운영에 몇 건인지는 아직 안 봤다.

| 선택 | 결과 |
|---|---|
| **A. 목록을 먼저 보고, 결제 안 된 것만 소급 차감** | `scripts/backfill-po-return-deductions.js`(일회성 · 기본 dry-run)로 운영 건수·금액 목록을 읽기만으로 뽑아 Irene 에게 보여 주고, «예» 면 `--apply`: 결제 안 된 청구서에서 그 금액을 빼고(정산서 따라감) 옛 크레딧노트는 취소 표시. 결제된 건은 손대지 않고 목록만 남김. 매장이 덜 낸다 = 판매자 미수금이 그만큼 준다. |
| B. 소급 안 함 | 새 반품부터만 빠진다. 옛 건은 청구서가 반품 전 금액 그대로 → 매장이 반품한 물건 값까지 내게 된다. |

**Fable 권고: A.** 반품을 승인해 놓고 그 금액을 청구하는 것은 잘못 청구다. 다만 운영 돈 데이터를 한꺼번에 바꾸는 일이라 목록(건수·금액·매장)을 먼저 보고 정하는 순서를 권한다. 스크립트는 `manual` 로 등록하고 배포가 자동 실행하지 않는다.

## 10. Fable 이 정한 기본값 — 바꾸고 싶으면

- **배송비·세금은 반품해도 그대로**(품목 값만 뺀다). 전체 반품 때 배송비도 빼려면 차감 줄을 하나 더 넣는 작은 변경.
- **판매자가 넣은 반품은 구매자 동의 없이 바로 확정**(메일로 알림). 출고 뒤 정정과 같은 방식이다. 구매자 확인 단계를 두려면 상태가 하나 더 필요하다.
- **결제된 주문은 반품 자체를 막는다**(Irene 문장 그대로). «재고만 되돌리고 돈은 그대로» 로 열 수도 있지만 그러면 낸 돈과 받은 물건이 어긋난 채 기록이 남아 권하지 않는다.
- 설계와 다른 판단이 필요해지면(음수 요금 줄이 어떤 화면·PDF 에서 깨진다 등) **구현을 멈추고 Fable 에게 그 사실만 전달**한다.
