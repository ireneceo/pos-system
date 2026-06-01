# 주문 플로우 전체 매트릭스 (Order Flow Matrix)

> 작성 2026-06-01. **단일 진실** — 주문이 생성되고(루트), 변형되고(연산), 결제되고(방식),
> 설정에 따라 달라지는(설정별) 전 과정의 통합 매트릭스. 검증: 2026-06-01 백엔드 실API
> 53케이스 + KDS 소켓 6 + 실브라우저 mount 7 = 전부 통과.
> 관련: [[reference_kitchen_print_pipeline]] · `PRINT_RULES_MATRIX.md` · `ORDER_MERGE_RULES.md`
> · `TABLE_MOVE_AND_VOID_TICKET.md` · `ORDER_TYPE_PINNING.md` · `TABLE_QR_SESSION_SYSTEM.md`

## 1. 주문 생성 루트 (어디서 시작하나)

| 루트 | 엔드포인트 | source(DB) | 인증 | order_type 결정 |
|------|-----------|-----------|------|----------------|
| **POS Terminal** | `POST /api/orders` | `pos` (client `pos-terminal`→정규화) | optionalAuth | 요청 body, 검증 없음(직원 판단) |
| **모바일 PaymentPage** | `POST /api/orders` | `mobile`(DB 저장) | optionalAuth | `dine-in`→`dine_in` 정규화 |
| **모바일 레거시** | `POST /api/mobile/order` | ⚠️ DB 미저장(기본 `pos`), 소켓만 `mobile` | 익명(storeId 필수) | `dine-in`→`dine_in` |
| **Floor Plan 오버레이** | `POST /api/orders` (`?from=floor-plan-overlay`) | `pos` | optionalAuth | POS 와 동일 + `tableId` 명시 |

- **order_type ENUM**: `dine_in`(기본) / `takeaway` / `delivery` / `pickup` / `reservation_deposit`.
- **dine-in 테이블 필수**: `table_settings.tableNumberRequired` ON 이면 모바일 dine-in 은 table_number 필수(없으면 400 `TABLE_REQUIRED`). takeaway/pickup/delivery 면제. POS 면제.
- **알려진 빈틈(주의)**: 레거시 `/mobile/order` 는 `source` 를 DB 에 안 박음 → `orders.source='mobile'` 필터 리포트에서 누락. PaymentPage 경로는 박음. ([[reference_mobile_order_session_storage]] 와 별개)

## 2. 상태 lifecycle

- **status ENUM**: `awaiting_payment`(기본) / `pending` / `preparing` / `ready` / `served` / `completed` / `cancelled` / `outstanding`.
- **payment_status ENUM**: `pending`(기본) / `partial` / `completed` / `failed` / `payment_verification_pending` / `rejected`.
- **forward 순서**: outstanding(0) < pending(1) < preparing(2) < ready(3) < served(4) < completed(5). cancelled=-1.
- **상태 머신 없음**: `PATCH /:id/status` 는 임의 전이 허용(되돌리기 포함). served+결제완료+forward → completed 자동 점프. completed(forward) → 재고차감+포인트적립. cancelled → 포인트 환불.
- **생성 시 초기 status**: POS=요청값(보통 pending). 모바일=`requirePaymentBeforeKitchen` ON→`outstanding`(결제 전 hold) / OFF→`pending`(바로 주방).

## 3. 연산 매트릭스 (주문에 가하는 동작)

| 연산 | 엔드포인트 | 효과 | 가드 |
|------|-----------|------|------|
| **+Round/추가** | `POST /:id/add-items`, `/merge-items` | 새 order_group 으로 append, 금액 재계산, needs_print=true | 결제완료/served/completed/cancelled 차단 |
| **자동머지(생성시)** | `POST /orders` (skipAutoMerge=false) | 같은 테이블 결제전 주문에 머지 | POS 기본 skip / 모바일 기본 머지 |
| **아이템 취소** | `DELETE /:id/items/:idx` | splice, 금액 재계산, `item-voided` emit(station_id+was_printed) | 결제후 차단 / **마지막 1개 차단**(주문취소로) |
| **테이블 이동(빈)** | `POST /:id/move-table` (block) | table_number+floor_plan_table_id **둘 다** 갱신, `table-moved` emit + printedItems | 완료/취소/결제완료 차단, same-table 차단 |
| **이동→점유(합치기)** | `POST /:id/move-table` (merge) | source items→dest 머지, source soft-cancel, `order-deleted` emit | **부분결제/포인트사용 source 차단**(SOURCE_HAS_PAYMENT/POINTS) |
| **주문 전체 취소** | `PATCH /:id/status {cancelled}` | cancelled, 포인트 환불 | 모바일고객은 pending 만 |
| **할인** | `PATCH /:id/apply-discount` | computeOrderTotals 전체 재계산 | subtotal+takeaway 상한 |
| **테이블 비우기** | `PATCH /:id {table_cleared:true}` | floor 에서 빼되 table_number 보존 | (비파괴) |
| **서빙** | `PATCH /:id/status {served}` | served_at + 전 아이템 completed | 결제완료면 자동 completed |

## 4. 결제 방식

| 방식 | 게이트웨이 | 엔드포인트 | 효과 |
|------|:---:|-----------|------|
| counter/cash/card/ewallet/staffMeal | X(내부) | `POST /:id/payments` | OrderPayment row, amount_paid 누적, full→completed |
| **부분/split** | X | `POST /:id/payments` 반복 | N rows, amount_paid=min(누적,total), partial→completed |
| Stripe online | O(실) | create-payment-intent→confirm-stripe-payment | succeeded→completed, awaiting→pending |
| PayPal online | O(실) | create-paypal-order→capture-paypal-order | COMPLETED→completed |

- 온라인 방어: 완료시 거부 / **30분 윈도우** / PayPal capture 는 intent_id==orderId.
- **금액 정합**: amount_paid 는 total 로 cap. payment_status 는 amount_paid>=total 일 때 completed.

## 5. 인쇄 트리거 (lifecycle 지점)

| 이벤트 | 동작 |
|------|------|
| 주문 생성(전 루트) | needs_print=true → poller/직접경로가 매장 설정 방식으로 주방 발행 |
| +Round/머지 | needs_print=true (새 그룹만 kitchen_items) |
| **아이템 취소** | `item-voided` 소켓 → 프론트가 **해당 station 취소표(오더티켓) 인쇄** + KDS 팝업 (was_printed인 것만, 설정/게이트 존중) |
| **테이블 이동** | `table-moved` 소켓 → **자동발행 ON 매장이면 새 테이블로 오더티켓 재발행**(매장 방식 USB/QZ/RawBT) + KDS 팝업 / OFF 면 KDS 팝업만 |
| 결제완료 | needs_bill (POS 직접경로) → 빌 자동인쇄(copiesAfterPayment, autoOpenDrawer) |
| 주문 전체취소 | printCancellationTicket (wasInKitchen 가드) |

- 🔒 인쇄 방식/라우팅은 [[reference_kitchen_print_pipeline]] + PRINT_RULES_MATRIX 가 단일 진실. 함수명 `...ViaRawBT` 무관하게 내부에서 printerMode(USB/browser/qztray) 분기.
- ⚠️ **printerMode/printerSettings 는 DB 가 아니라 브라우저 localStorage** 에서 읽음(getPrinterMode/getPrinterSettings). 기기별. 설정화면도 localStorage 만 읽고 씀 → DB printer_settings 와 불일치 가능(별도 이슈).

## 6. 설정별 동작 차이

| 설정 | 값 | 동작 |
|------|----|------|
| `table_settings.tableNumberRequired` | ON | 모바일 dine-in 무테이블 → 400 차단 |
| 〃 | OFF | 무테이블 통과 |
| `table_settings.qrMode` | `static` | 테이블 QR 고정(테이블 박힌 QR) |
| 〃 | `session` | 유연 — 세션 QR, qrExpirationMinutes 만료. 손님이 floorTables 에서 선택 |
| `table_settings.clearTableOnPayment` | ON | 결제완료 주문이 floor 에서 빠짐(이동 점유판정도 제외) |
| `printer_settings.kitchenPrinter.autoPrint` | ON/OFF | 주방 자동발행 여부(이동 재발행/주문발행 게이트) |
| `printer_settings.printerMode` | rawbt/browser/qztray | 인쇄 방식 분기 |
| `operation_settings.mobileOrderProcessing.requirePaymentBeforeKitchen` | ON | 모바일 주문 outstanding(결제전 hold) |
| 〃 | OFF | pending(바로 주방) |
| `operation_settings.taxEnabled` / serviceChargeEnabled | ON/OFF | 금액 계산 분기 |
| `operation_settings.orderTypes` | dineIn/takeaway/pickup/delivery | 모바일 허용 주문타입 |

- 모바일이 읽는 설정 노출: `GET /api/mobile/store/:slug` → tableNumberRequired + floorTables(유연 테이블선택용) + qrMode.

## 7. 검증 (2026-06-01, 영구 회귀는 health-check `--category=matrix`)

- **루트별 풀플로우 24/24**: 4루트 × (생성/FPTI바인딩/주방발행/+Round/결제완료/금액정합).
- **연산+결제+설정 18/18**: 결제 5방식+부분+split / 이동·합치기·취소·전체취소 / 설정 ON·OFF·면제.
- **인쇄/QR 11/11**: table-moved payload / autoPrint·printerMode·qrMode 노출 / store 응답.
- **KDS 소켓 6/6** + **실브라우저 mount 7/7**.
- 재현: `node dev-backend/scripts/health-check.js --category=matrix` (주요 케이스 영구 등록).

## 8. 알려진 빈틈 / 후속 (audit 발견)

1. 레거시 `/mobile/order` source 미저장 → 리포트 누락.
2. `needs_bill` 은 어디서도 true 로 안 써짐 → poll 빌자동인쇄 분기 사실상 dead(POS 직접경로만 동작).
3. 모바일 고객 취소는 pending 만 → outstanding(결제전) 주문 취소 불가.
4. printer_settings 가 localStorage 기반(기기별, DB 불일치) — 구조 이슈, 별도 다룰 것.
5. status 상태머신 없음 — 임의 전이 허용(completed→pending 등). 의도면 유지, 아니면 가드 필요.
6. reservation_deposit/kiosk enum 은 이 라우트들엔 생성경로 없음(예약은 별도 라우트).
