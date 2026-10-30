# Fable 설계 — 배송 완료 뒤 구매자가 «받았어요» 를 안 누르면 (2026-10-30)

> 요청: `.claude/fable-request-20261030-po-auto-complete.md` (작업방 d5ebceff)
> Irene 원문: **"고객이 안받았다고 주문완료가 안되면 어떻게 해? 일정기간이 지나면 그냥 완료처리 되어야 해. 인보이스가 안나오잖아. 배송완료되면 인보이스 나와야 하는 거 아니야?"**
> Fable 읽기(코드 변경 0): `routes/seller-orders.js` /deliver · `services/purchaseOrderService.js` createTradeInvoice/issueTradeInvoiceAfterCommit · `services/purchaseOrderReceive.js` markAllReceived · `services/soaScheduler.js` issueMissingTradeInvoices · `services/poScheduleService.js` runDueSchedules(스케줄러 틀) · `routes/po-returns.js`(반품 허용 상태) · `routes/purchase-orders-workflow.js`(수령 3길·불량 보고) · `routes/carrier-webhooks.js` · 화면 `IncomingOrdersView.tsx`·`PurchaseOrderDetailPage.tsx`·`BillingTermsModal.tsx`·`DeliveryTimeline.tsx`.

## 0. 결론 한 줄

**① 판매자가 «배송 완료» 를 누르는 순간 청구서를 낸다. ② 배송 완료 뒤 3일 안에 구매자가 «받았어요» 를 안 누르면 서버가 대신 «받음(완료)» 처리한다(재고 반영 포함).** 둘 다 지금 있는 함수 하나씩(`createTradeInvoice` · `markAllReceived`)을 그대로 부른다 — 새 길을 만들지 않는다.

**Irene 결정 필요 없음.** 아래 기본값은 전부 되돌릴 수 있는 값이라(상수 하나·멱등 함수) Fable 이 정했다. 그대로 구현 시작해도 된다. 다만 «3일» 이 마음에 안 들면 숫자만 말해 주면 된다(상수 한 줄).

## 1. 지금 왜 안 되나 (사실)

- 청구서는 **구매자가 «받았어요» 를 누를 때**만 나온다(수령 3길 + 브랜드 «주문 확정 시» 옵션). 판매자가 «배송 완료» 를 눌러도 청구서는 0장, 구매자에게 «Confirm Receipt» 메일만 간다.
- 구매자가 안 누르면 발주는 `delivered` 에 영원히 머문다. 월 정산(monthly_soa) 거래는 정산서 만들 때 뒤늦게 청구서가 채워지지만(`issueMissingTradeInvoices`), **즉시 청구(immediate) 거래와 공급업체 판매자는 청구서가 아예 없다.**
- 판매자 화면(받은 주문)은 `received` 만 «완료» 로 보여서, 구매자가 안 누르면 판매자 눈엔 «배송됨» 으로 끝없이 남는다.

## 2. 설계

### 2-1. 청구서 = 배송 완료 때 (판매자 행동)

- `POST /api/seller-orders/:id/deliver` 가 커밋한 뒤 `issueTradeInvoiceAfterCommit(po, { when: 'delivered' })` 를 부른다. 함수는 이미 `when` 인자를 받게 일반화돼 있다(2026-09-29). **복제 금지 — 같은 헬퍼.**
- 택배 웹훅이 상태를 `delivered` 로 바꾸는 길(`routes/carrier-webhooks.js` applyWebhookEvent, `mapped === 'delivered'`)에도 같은 한 줄. 어느 길로 «배송 완료» 가 되든 청구서가 같이 난다.
- 멱등: `trade_invoice_id` 가 있으면 기존 것을 돌려준다 → 브랜드 «주문 확정 시» 옵션으로 이미 낸 발주는 두 번 안 난다 · 뒤에 구매자가 «받았어요» 를 눌러도 두 번 안 난다 · 자동 완료 때도 두 번 안 난다.
- 청구서 내용은 지금 그대로(발행일 = 만든 날 · 기간 = 발주일→발행일 · 비고 «Purchase Order: PO번호» — `received_at` 이 없으니 «received 날짜» 는 안 붙는다. `createTradeInvoice` 본문은 손대지 않는다).
- 결제 조건 칸 `invoice_trigger` 는 **값 그대로**(`on_received` 기본 / `on_confirmed`). 화면 문구만 바꾼다: `billing:trigger.on_received` → «Order is delivered or received (default)» 4개 언어. 값을 새로 만들지 않는다(설정 없이 모두에게 적용되는 기본 동작이므로).
- 외부(계정 없는) 공급업체 발주는 «배송 완료» 상태에 들어올 길이 없다(판매자 버튼도 웹훅도 없음 — 구매자가 바로 «받았어요»). 지금처럼 수령 때 청구서. **변경 없음.**
- 부족·불량·반품은 지금 «주문 확정 시» 옵션과 같은 방식으로 처리된다: 청구서는 전액, 반품 승인 때 **크레딧 노트**(`po-returns.js` approve)가 상쇄. 불량 보고(discrepancy)는 기록 + 반품 요청 자동 생성. 새로 만드는 것 없음.

### 2-2. 자동 완료 = 배송 완료 + 3일 (서버 행동)

**규칙:** 상태가 `delivered` 이고, «배송 완료» 시각 + **72시간** 이 지났는데 아직 `delivered` 면 → 서버가 구매자 대신 **전량 수령 처리**한다.

- «배송 완료» 시각 = `tracking_info.events` 에서 `status === 'delivered'` 인 **마지막** 이벤트의 `at`. 없으면 `actual_delivery_date`(웹훅이 적음), 그것도 없으면 `updated_at`. 달력이 아니라 시간(72h)이라 시간대 계산이 없다.
- 상수 `AUTO_RECEIVE_HOURS = 72` 는 **서버 한 곳**(`services/poAutoReceiveService.js`)에만 둔다. 화면은 서버가 계산해 준 `auto_receive_at` 만 보여 준다(프론트에 «3일» 을 복사하지 않는다 — `utils/poStatuses.js` 와 같은 이유).
- 처리 본체 = `markAllReceived(po, { userId: null, note: 'Auto-completed — buyer did not confirm receipt within 3 days of delivery', trackingSource: 'auto_receive' }, t)` **그대로**. 그러면:
  - 남은 수량(주문−수령)만 구매자 재고(재료 배치·원장·가중평균원가·브랜드 재고)에 들어간다 — 구매자가 손으로 받을 때와 **같은 숫자**.
  - 서비스 줄은 재고 안 올림(기존 규칙), `quantity_received` 채움, `status='received'`, `received_at`·`actual_delivery_date`=지금, 추적 이벤트 `received` 에 `source:'auto_receive'`.
  - `userId` 가 null 이면 원장 `created_by` 류 칸이 어떻게 되는지 구현자가 `receiveIntoIngredient` 를 읽어 확인한다. NOT NULL 이면 **발주의 `created_by_user_id`** 를 넣는다(«누가 받았나» 는 추적 이벤트 `source:'auto_receive'` 가 진실).
- 발주 하나 = 트랜잭션 하나 + `SELECT … FOR UPDATE` + **잠근 뒤 상태 재확인**(`status === 'delivered'` 아니면 건너뜀). 구매자가 같은 순간 «받았어요» 를 눌러도 둘 중 하나만 들어간다(이중 재고 방지).
- 커밋 뒤(비차단, setImmediate):
  1. `issueTradeInvoiceAfterCommit(po)` (when='received') — 평소엔 2-1 에서 이미 나서 no-op. **배포 전에 배송 완료된 옛 발주**의 안전망.
  2. 알림(§2-4).
- 틀: `services/poAutoReceiveScheduler.js` — node-cron **매 정각**, `services/poAutoReceiveService.js` `runAutoReceive({ now = new Date(), onlyIds = null, io = null })` 를 부른다. `SchedulerRun` `job_name: 'po_auto_receive_hourly'`, results `{ candidates, completed, skipped, failed, sample }`. `server.js` 에서 `recurringPoScheduler.start(io)` 옆에 `start(io)`. health-check 가 `now`·`onlyIds` 를 넣어 직접 부른다(정기 발주와 같은 틀).
- 후보 조회: `status='delivered' AND deleted_at IS NULL` 전부 읽어 JS 에서 기한 판정(배송 완료 상태는 몇 건 안 된다 — 개발 DB 0건). `onlyIds` 가 있으면 그 id 만.
- 소켓: 완료 뒤 `emitPoEvent` 와 같은 이벤트(`seller-order-updated`) 를 io 로 쏜다(스케줄러에 io 를 넘기는 이유). 없으면 생략해도 기능엔 지장 없음(다음 새로고침에 보임).

### 2-3. 대상·비대상 (경계)

| 경우 | 동작 |
|---|---|
| `delivered` + 72h 경과 | **자동 완료** |
| `delivered` 인데 72h 전 | 대기(화면에 «자동 완료 예정 시각» 표시) |
| `shipped` / `in_transit` (판매자가 «배송 완료» 를 안 누름) | **대상 아님.** 판매자 자신의 몫이고 자기 화면에 보인다. 이번 범위 밖(필요하면 다음에 «발송 + N일» 을 따로). |
| `partial_received` (구매자가 일부만 받음) | **대상 아님.** 구매자가 이미 손을 댔고 남은 수량은 정말 안 온 것일 수 있다. 남은 건 구매자가 마무리. |
| 일부 품목만 발송된 주문 | `/deliver` 가 `NOT_FULLY_SHIPPED` 로 막으므로 `delivered` 자체가 안 됨. 변경 없음. |
| 외부(계정 없는) 공급업체 | `delivered` 에 못 들어오므로 자동 대상 없음 · 청구서는 지금처럼 수령 때. |
| 오너 승인 | 승인은 제출 전 단계(`pending_approval`). 자동 완료는 `delivered` 만 보므로 승인 우회 불가. 외부 발주의 승인 취소(`REVOKABLE_EXTERNAL` 에 delivered 포함)는 외부가 delivered 에 안 들어오니 충돌 없음. |
| 자동 완료 뒤 불량·반품 | **그대로 가능.** 반품은 `received` 에서 허용(`po-returns.js:57`), 불량 보고 라우트는 상태 제한 없음. 승인되면 크레딧 노트. 구매자가 잃는 것 없음. |
| 자동 완료 뒤 결제 | `received` + `payment_status='unpaid'` → 지금 «받고 나서 결제» 와 같음(`/pay`). 청구서 `pending_payment`. |
| 월 정산(monthly_soa) 거래 | 청구서가 **배송 완료 달**에 난다(지금은 구매자가 누른 달 또는 정산 직전 백필). 정산서는 그 청구서를 묶는다 — 더 정확해짐. `BILLABLE_PO_STATUSES` 는 이미 delivered 포함, 변경 없음. |
| 브랜드 «주문 확정 시» 옵션 | 확정 때 난 청구서가 있으므로 배송 완료·자동 완료 때 no-op(멱등). |
| 취소·배송 실패(`cancelled`/`delivery_failed`) | 대상 아님. |
| **옛 데이터(배포 전부터 `delivered`)** | **똑같이 적용** — 이미 72h 가 지났으니 배포 뒤 첫 정각에 완료된다(청구서 + 재고). 따로 컷오프를 두지 않는다: Irene 의 요구가 바로 «지금 걸려 있는 것들이 완료되어야» 이고, 재고는 이후 조정으로 되돌릴 수 있으며, 추적 이벤트 `source:'auto_receive'` 로 어느 건이 자동이었는지 남는다. 운영 건수는 이 방에서 못 읽으므로 **배포 보고에 «첫 실행 결과(SchedulerRun results)» 를 적는다.** |
| 이미 `received` 인데 청구서 없는 옛 건(개발 128건) | 이번 범위 밖(다른 문제 — «받았는데 청구서 없음» 은 2026-09-07 이전 데이터). 월 정산 거래는 정산 때 채워진다. 즉시 청구 거래의 옛 건이 운영에 있으면 별도 백필 스크립트 건으로 따로. |

### 2-4. 알림

- **배송 완료 메일(구매자, 기존)** `/deliver` 의 «Please confirm receipt in your system.» 뒤에 한 문장: «If not confirmed by {auto_receive_at}, the order will be completed automatically and stock added.» — 시각은 **구매자 매장 시간대**로(`formatDateTime` 류·타임존 규칙). 작업 키 그대로(`confirm_receipt_now`).
- **자동 완료 뒤 → 판매자**: 기존 `buyerReceivedEmail` 에 `auto: true` 를 더해 상태 줄을 «Auto-completed (buyer did not confirm within 3 days)» 로. 카테고리 `buyer_received` 그대로(받는 사람·버튼 같음). 판매자 재고는 출고에서 이미 빠졌으므로 «할 일 없음»(fyi).
- **자동 완료 뒤 → 구매자**: 새 짧은 템플릿 `poAutoCompletedEmail` — «PO번호 was completed automatically on {date}. Stock has been added to your inventory. If anything was missing or damaged, request a return from the order.» 버튼 = 그 발주 상세. 카테고리 `seller_order_received`(구매자 쪽 발주 알림 카테고리, 기존 것). 백엔드 `locales/` 4개 언어.
- 둘 다 `services/poNotifications.js` 에 `fireAutoReceivedNotifications(po)` 하나로 묶는다. 외부 공급업체(수신자 0)는 기존처럼 조용히 건너뜀.
- 메일 발송은 비차단·실패해도 상태는 이미 커밋.

### 2-5. 화면

- **판매자 받은 주문**(`IncomingOrdersView.tsx`): `delivered` 행 상태 배지 아래 작은 글씨 «Auto-completes {auto_receive_at}». 자동 완료된 뒤엔 지금처럼 «Completed»(sellerStatusKey). 상세의 `DeliveryTimeline` 은 추적 이벤트 note 를 그대로 보여 주므로 «Auto-completed — …» 가 자동으로 보인다(컴포넌트 변경 없음).
- **구매자 발주 목록·상세**(`PurchaseOrdersPage.tsx`·`PurchaseOrderDetailPage.tsx`): `delivered` 일 때 «Confirm receipt by {auto_receive_at} — completes automatically after». 버튼은 그대로.
- `auto_receive_at` 은 **서버가 응답에 붙인다**: 판매자 목록·상세(`seller-orders.js` 의 행 장식 지점 — `attachShipmentState` 가 붙는 곳) + 구매자 목록·상세. `delivered` 가 아니면 null. 계산 함수는 `poAutoReceiveService.autoReceiveDeadlineOf(po)` 하나.
- i18n: 새 키는 `orders`/`purchaseOrders` 네임스페이스에 en→ko→zh→ms 4개. `npm run i18n:verify`.
- 설정 화면 없음(상수). 디자인 기준(RA) 그대로 — 새 styled 없이 기존 작은 글씨 스타일 재사용.

### 2-6. 바꾸는 파일

**백엔드 (DB 변경 없음 · 마이그 없음 · ENUM 없음)**
- 신규 `services/poAutoReceiveService.js` — `AUTO_RECEIVE_HOURS`, `deliveredAtOf(po)`, `autoReceiveDeadlineOf(po)`, `runAutoReceive({now, onlyIds, io})`, `autoReceiveOne(id, {now, io})`.
- 신규 `services/poAutoReceiveScheduler.js` — `start(io)`/`stop()` (recurringPoScheduler 복사 수준).
- `server.js` — 스케줄러 시작 1줄.
- `routes/seller-orders.js` — `/deliver` 커밋 뒤 `issueTradeInvoiceAfterCommit(po, { when: 'delivered' })` + 메일 문장 + 목록·상세 응답 `auto_receive_at`.
- `routes/carrier-webhooks.js` — delivered 적용 뒤 같은 헬퍼 1줄.
- `routes/purchase-orders*.js` 구매자 목록·상세 — `auto_receive_at`.
- `services/poNotifications.js` — `fireAutoReceivedNotifications`.
- `utils/notificationTemplates.js` — `buyerReceivedEmail` `auto` 플래그 · 신규 `poAutoCompletedEmail`. `locales/{en,ko,zh,ms}` 키.
- `scripts/health-check.js` — §3 검사.
- 문서: 발주 흐름을 적어 둔 기존 문서(구현자가 `grep -l "mark-received" docs/` 로 찾음)에 «배송 완료 → 청구서 · +72h 자동 완료» 절 추가. 새 문서 만들지 않는다.

**프론트**
- `IncomingOrdersView.tsx` · `PurchaseOrdersPage.tsx` · `PurchaseOrderDetailPage.tsx` — delivered 보조 문구.
- `BillingTermsModal.tsx` 문구 키는 그대로, `public/locales/*/billing.json` `trigger.on_received` 4개 언어 문구만.
- 새 i18n 키 4개 언어.
- 빌드 1회 · sweep 1회 순서(CLAUDE.md «빌드 1회»).

**무접촉:** 🔒 인쇄·KDS 보호파일 8개 · `createTradeInvoice` 본문 · `markAllReceived` 본문 · `purchaseOrderReceive.js` · `soaScheduler.js`.

## 3. 검증 기준 (구현자가 실제로 돌려 숫자로)

데모 매장(38) + 데모 브랜드(10) 거래로, health-check `inventory`(또는 `trade`) 카테고리에 추가. 끝나면 만든 발주는 `[확인용]` 메모 또는 정리.

1. **배송 완료 → 청구서 즉시**: 브랜드 판매 발주 submitted→confirmed→ship(전 품목)→`/deliver` 응답 200 → 300ms 뒤 `trade_invoice_id` 있음, 청구서 `invoice_category='trade'`·`status='pending_payment'`·`total_amount == po.total_amount`. 이어서 구매자 `/mark-received` → 청구서 **여전히 1장**(같은 id).
2. **기한 전엔 안 건드림**: 새 delivered 발주, `runAutoReceive({ now: deliveredAt + 71h, onlyIds:[id] })` → `completed 0`, 상태 delivered 그대로, 재고 변화 0.
3. **기한 뒤 자동 완료**: `now: deliveredAt + 73h` → `completed 1`, `status='received'`, `received_at` 있음, 품목 `quantity_received == quantity_ordered`, 재료 재고 = 전 + (수량×환산), 추적 마지막 이벤트 `status='received'`·`source='auto_receive'`, 청구서 여전히 1장. **두 번 더 돌려도** `completed 0`·재고 그대로(멱등).
4. **구매자가 먼저 받음**: delivered → `/mark-received` → `runAutoReceive(+73h)` → `completed 0`, 재고 한 번만.
5. **비대상**: `partial_received` 발주 · `shipped` 발주 · `cancelled` 발주 → `+73h` 돌려도 0건.
6. **일부 발송 주문**: 품목 하나만 발송 후 `/deliver` → 400 `NOT_FULLY_SHIPPED`(기존 규칙 유지 확인).
7. **웹훅 delivered**: 택배 웹훅 테스트 틀이 있으면 delivered 적용 뒤 청구서 1장. 없으면 «확인 불가» 로 적는다.
8. **알림**: 개발 메일 가드 로그에 판매자 `buyer_received`(auto) 1통 + 구매자 자동 완료 1통. 외부 공급업체 발주는 수신자 0 로그.
9. **응답 칸**: 판매자 목록·구매자 목록 모두 delivered 행에 `auto_receive_at == deliveredAt + 72h`, received 행은 null.
10. **고장주입 3건(반증 — 안 깨지면 검사가 고장)**: ⓐ `/deliver` 의 `issueTradeInvoiceAfterCommit` 호출을 빼면 검사 1 실패 ⓑ 잠근 뒤 «상태 재확인» 을 빼고 같은 id 로 두 번 돌리면 검사 3 의 멱등(재고 두 번) 실패 ⓒ `AUTO_RECEIVE_HOURS` 를 0 으로 하면 검사 2 실패. 셋 다 원복 후 통과 숫자 기록.
11. 기계 게이트: `node scripts/verify-all.js --full`(프론트 빌드 뒤) · `check-print-guard` 변경 0 · `check-sensitive-diff` — **돈·주문 무결성 + 재고 자동 쓰기 + 외부 발송** 이므로 **Fable 검증(gate) 1회 대상.** 구현 끝나면 diff·검사 숫자·고장주입 결과를 넘길 것.
12. 운영 배포 뒤: 첫 정각 `SchedulerRun po_auto_receive_hourly` results(candidates/completed/failed)와 그때 난 청구서 수를 배포 보고에 적는다. 배포는 수동 배포 때(«배포할까요» 묻지 않음).

## 4. Irene 에게

**결정 필요 없음.** 기본값(Fable 결정): 청구서는 «배송 완료» 때 · 자동 완료는 배송 완료 + **3일(72시간)** · 옛 데이터도 똑같이 · 설정 화면 없이 상수. 3일이 길거나 짧으면 숫자 하나만 바꾸면 된다. 구현 뒤 Fable 검증 1회.

Fable 안 씀 — 해당 없음(이 문서가 Fable 설계).
