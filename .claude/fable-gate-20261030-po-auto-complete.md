# Fable 게이트 판정 — 배송 완료 → 청구서 · 72시간 자동 완료 (2026-10-30 · 작업방 d5ebceff)

요청서: `.claude/fable-request-20261030-po-auto-complete-gate.md` · 설계: `.claude/fable-design-20261030-po-auto-complete.md`
판정 주체: Fable (개발서버 코드 실측 · 실호출 · health-check inventory 직접 실행 · 운영 쓰기 0 · 실브라우저 sweep 은 돌리지 않음 — 다른 실행과 겹치지 않게)

## 판정: **고침 1건 필요 — 아직 PASS 아님 (마커 안 찍음)**

구현은 설계대로다 — 청구서는 «배송 완료» 때 한 번, 자동 완료는 `markAllReceived` 그대로, 재고·이벤트·응답 칸·알림 전부 실호출로 맞았다. 그러나 설계가 약속한 **«구매자가 같은 순간 «받았어요» 를 눌러도 둘 중 하나만 들어간다(이중 재고 방지)»** 가 **자동 완료 쪽에서만** 성립한다. 반대편인 구매자 수령 길 두 개(`/mark-received` · `/receive`)가 발주 행을 **잠그지 않고** 읽기 때문이다. 이건 설계가 «이미 잠근다» 고 잘못 전제한 것(Fable 설계 쪽 빈틈)이라 설계를 여기서 보정한다. 고침은 두 줄 + 검사 하나.

### 고칠 것 (정확히)

**1. `dev-backend/routes/purchase-orders-workflow.js` — 구매자 수령 두 길에 행 잠금**
- `POST /purchase-orders/:id/mark-received`(905행 근처): `PurchaseOrder.findByPk(id, { transaction: t })` → `PurchaseOrder.findByPk(id, { lock: t.LOCK.UPDATE, transaction: t })`.
- `POST /purchase-orders/:id/receive`(1037행 근처): `findByPk(id, { include: [items], transaction: t })` → 같은 잠금을 더한다. include 가 있으니 `lock: { level: t.LOCK.UPDATE, of: PurchaseOrder }` 로 발주 행만 잠그고, 실제 나가는 SQL 에 `FOR UPDATE` 가 붙는지 로그로 한 번 확인한다.
- `receive-and-pay`(774행)는 이미 `lock: t.LOCK.UPDATE` — 손대지 않는다. 잠금 순서는 세 길 모두 «발주 행 먼저 → 재고 행» 이고 자동 완료(`autoReceiveOne`)도 같은 순서라 교착 없음.
- 왜 지금인가: 자동 완료는 매시 05분에 서버가 **구매자 모르게** 돌린다. 그 트랜잭션(수십~수백 ms) 동안 구매자가 같은 발주의 «받았어요» 를 누르면, 지금 코드는 구매자 쪽이 잠금 없이 `delivered` 스냅샷을 읽고 재고를 **또** 넣는다(발주 행 갱신만 잠금에 걸려 기다렸다가 덮어씀 → 상태는 received 하나, 재고는 두 번). 확률은 낮지만 재고 이중 가산은 «되돌리기 어려운» 칸이고, 고침이 한 줄이라 미루지 않는다. (덤으로 지금도 가능한 «구매자 둘이 동시에 누름» 도 같이 막힌다.)

**2. health-check inventory 에 검사 1건(결정적으로 — 운에 안 맡김)**
- 픽스처(Q6) 발주를 delivered 로 만든 뒤: ① 검사 프로세스에서 트랜잭션 T1 을 열고 `findByPk(lock)` 으로 발주 행을 잠근다 ② HTTP `POST /mark-received` 를 **기다리지 않고** 쏜다 ③ 400ms 뒤 T1 안에서 `markAllReceived(po, { trackingSource:'auto_receive' }, T1)` → commit ④ HTTP 응답을 받는다.
- 기대: 구매자 재고 **+3 한 번**, 발주 `received`, mark-received 응답 **400**(«Cannot receive a received …»). 잠금이 없으면(고장주입) 응답 200 + 재고 +6 으로 깨진다 — 이게 반증.
- `/receive` 도 같은 틀로 1건(또는 같은 검사 안에서 두 번째 픽스처).

**3. 그 뒤**
- 고장주입: 1번 잠금 한 줄을 빼면 2번 검사가 실제로 실패하는지 1회 → 원복 → 통과 숫자.
- `health-check --category=inventory` 재실행 숫자 · `check-sensitive-diff`(돈 칸 접촉이니 당연히 대상) · 백엔드만 바뀌므로 **빌드 불필요** — 지금 도는 mount sweep 이 끝난 뒤 `pm2 restart dev-backend`(도중에 재시작하면 sweep 이 또 시간 초과).
- 다시 넘기면 diff 2줄 + 검사 결과만 보고 마커를 찍는다(전체 재판정 아님).

### 보류(지금 안 고침) — `createTradeInvoice` 동시 호출 이중 발행 → **후속 건**
- 사실: 멱등 확인이 잠금 없는 읽기라, 같은 발주에 두 발행 호출이 **수백 ms 안에** 겹치면 청구서 2장(한 장은 고아). 검사가 `/deliver` 직후 같은 ms 대에 `mark-received` 를 쏴서 드러났다.
- 판단: **이번 건에서는 그대로 둔다.** ① 실제 사람 길은 겹칠 수 없다 — 배송 완료(판매자)와 수령(구매자)은 다른 사람이 분 단위 이상 떨어져 누르고, 자동 완료는 72h 뒤, «주문 확정 시» 는 그보다 앞이다. 유일한 기계 쌍(택배 웹훅 delivered ↔ 판매자 «배송 완료» 클릭)도 같은 ms 안에 들어와야 한다. ② 새면 health-check 지문(`고아청구서`)과 검사 전후 대조가 잡는다(이번에 바로 잡힌 것이 그 증거). ③ `createTradeInvoice` 본문은 설계상 무접촉이고, 고치려면 자기 트랜잭션 + 발주 행 잠금 + 잠근 뒤 `trade_invoice_id` 재확인으로 본문을 감싸야 한다 — 돈 칸이라 따로 작은 건으로 Fable 게이트 1회가 맞다.
- 후속 건으로 등록할 내용(작업기록에 «나중에» 로): `createTradeInvoice` 를 한 트랜잭션(`findByPk(po.id, { lock })` → `trade_invoice_id` 재확인 → 발행 → `po.update` → commit)으로 감싸고, 검사는 `Promise.all([createTradeInvoice(po), createTradeInvoice(po)])` → 그 발주 청구서 1장(결정적). 호출자 7곳(`seller-orders.js` 확정·배송 완료 · 웹훅 · `purchase-orders-workflow.js` 4길 · `poAutoReceiveService` · `soaScheduler.issueMissingTradeInvoices`)은 손대지 않아도 된다.

## 근거

### ① diff 범위 대조 — 설계 밖 변경 0 (이 기능 몫만)
- 신규 `services/poAutoReceiveService.js`(상수 72h 한 곳 · `deliveredAtOf` 마지막 delivered 이벤트 → `actual_delivery_date` → `updated_at` · `autoReceiveOne` 행 잠금 + 잠근 뒤 상태·기한 재확인 · `markAllReceived` 그대로 호출 · 커밋 뒤 청구서 안전망·알림·소켓) · `services/poAutoReceiveScheduler.js`(node-cron, SchedulerRun `po_auto_receive_hourly`). 설계 §2-2 와 일치.
- `seller-orders.js` `/deliver` 커밋 뒤 `issueTradeInvoiceAfterCommit(po, { when:'delivered' })` + 메일 한 문장(구매자 매장 시간대, `toLocaleString` 에 timeZone 있음) + 목록·상세 `attachAutoReceiveAt` · `carrier-webhooks.js` delivered 뒤 같은 헬퍼 한 줄 · `purchase-orders-crud.js` 구매자 목록·상세 같은 함수 · `poNotifications.fireAutoReceivedNotifications`(판매자 `buyer_received` auto · 구매자 `seller_order_received` 새 템플릿) · `notificationTemplates.js` auto 플래그·`poAutoCompletedEmail` · 백엔드 locales 4개 언어 키 5개씩 · 화면 3곳 delivered 보조 문구(서버 값만 표시, 새 styled 없음) · 프론트 locales 4개 언어(`supplier.orders.badge.autoCompletes` · `purchaseOrders.list.badge.autoCompletes` · `billing.trigger.on_received` 문구) · `PurchaseOrdersPage` `POStatus`/`StatusVariantMap` 에 `delivered`(타입 기준선 — 실제 상태값이라 맞음) · 문서 `docs/PURCHASE_ORDER_SYSTEM.md` 끝 절.
- 구현자 판단 4건: 매시 05분(정기 발주 정각과 분리 — 됨) · received 이벤트 note/source 를 같은 트랜잭션에서 덧씀(`markAllReceived` 본문 무접촉 유지 — 됨, 예비 분기의 `appendTrackingEvent(po,'received',note,null,{source})` 5인자 서명도 맞음) · `userId = created_by_user_id`(설계는 «NULL 허용이면 null» — 벗어남이지만 재고 원장에 발주 만든 사람이 찍히는 정도, 추적 이벤트 `source:'auto_receive'` 가 진실. **비차단**, 다음 손볼 때 null 로) · 웹훅 메일 TODO 무접촉(됨).
- 무접촉 확인: 🔒 인쇄 보호파일 **8/8 변경 없음**(`check-print-guard`) · `createTradeInvoice`·`markAllReceived`·`purchaseOrderReceive.js`·`soaScheduler.js`(이 기능 몫 0 — `soaScheduler` 의 diff 는 다른 방 72ac6d2a «이번 달» 건).
- 같은 작업 폴더의 다른 방 변경(`server.js` LISTEN_HOST · `restaurants-ingredients.js` · `costSync.js` · `restaurantCatalogLink.js` · `brand-soa.js`/`foodcourt-soa.js`/`soaScheduler.js`/`BillingTermsModal.tsx` · playwright/GTM)은 이 판정 밖. `server.js` 는 이 기능 2줄과 LISTEN_HOST 가 한 파일에 있다 — 배포 때 각자 게이트로.

### ② 가드 스크립트 (내가 돌림)
- `check-print-guard.js` 8/8 변경 없음 · `check-sensitive-diff.js` → FABLE 게이트 대상(이 판정) · `health-check --category=inventory --quiet` **94/94 통과**(exit 0 · 알림 로그 판매자 `recipients=22,2212` · 구매자 `recipients=163,164` 실제 출력 확인).
- 고장주입 3건은 요청서 숫자(ⓐ 청구서 호출 제거 → AC1 실패 · ⓑ 잠근 뒤 재확인 제거 → AC2 동시 2실행 completed 합 ≠ 1 실패 · ⓒ 상수 0 → AC2 실패)를 검사 코드와 대조해 각 단정문이 실제로 그 결함에 걸리는 구조임을 확인했다. 재실행은 pm2 재시작이 필요해(sweep 겹침) 하지 않았다 — 요청서 숫자 채택.

### ③ 실호출 (개발서버 127.0.0.1:3001 · 데모 발주 53054 `PO-R38-CHK-AUTO-mvv62jgw` 매장 38 ← 브랜드 17)
- DB: 발주 `delivered` · `trade_invoice_id=33277` · 청구서 `TRD-BRD17-20261030-001` `trade`·`pending_payment`·`28.00`(= 발주 금액) · `issued_at 16:08:30` = 배송 완료 시각(같은 초).
- 구매자 상세·구매자 목록·판매자 상세·판매자 목록 **4곳 모두** `auto_receive_at = 2026-11-02T16:08:30.311Z` = 배송 완료 + 72h(목록도 `tracking_info` 를 품고 있어 상세와 같은 값 — 설계 §3-9 충족). 익명 401.
- 스케줄러 실가동: pm2 로그 `[PoAutoReceiveScheduler] started` · fork 1인스턴스(중복 틱 없음) · 개발 DB `delivered` 1건(위 확인용) → 11/2 16:08 뒤 첫 05분 틱에 자동 완료될 것. `scheduler_runs` 에 `po_auto_receive_hourly` 행 기록됨(검사 호출분).

### ④ 배포 안전성
- DB 변경·마이그·ENUM 0 · `node-cron` 기존 의존 · 롤백 = 코드 되돌리기만.
- **운영 첫 05분 틱**: 배포 전부터 `delivered` 이던 발주가 전부 한 번에 완료된다(재고 + 청구서 + 메일 2통/건). 설계 §2-3 «옛 데이터도 같은 규칙» 대로이며, 운영 건수는 여기서 못 읽는다 → **배포 보고에 `SchedulerRun po_auto_receive_hourly` 첫 결과(candidates/completed/failed)와 그때 난 청구서 수를 적는다**(설계 §3-12). 많으면 메일이 그만큼 나간다는 뜻 — 그래도 맞는 메일이다.
- SW 버전·배포 기록 = 배포 방 몫(verify-all 의 «배포 준비» 실패는 그것).
- mount sweep: 요청서 2차 실행은 시간 초과(1184.7s), 실패 줄 없음. `--only mount` 재실행 결과는 **이 판정에서 확인 못 함** — 팀원이 숫자로 전달하면 위 고침과 함께 본다. 위 고침은 백엔드만이라 번들은 그대로다.

## 2차 판정 (같은 날 · 고침 뒤): **조건부 PASS — 마커 찍음**

팀원이 «고칠 것» 1·2·3 을 그대로 했고, 내가 다시 확인했다.
- diff(내가 읽음): `purchase-orders-workflow.js` 2곳 — `/mark-received` `findByPk(id, { lock: t.LOCK.UPDATE, transaction: t })` · `/receive` `lock: { level: t.LOCK.UPDATE, of: PurchaseOrder }`(+주석). MySQL 은 `OF` 를 안 붙여 join 된 품목 행도 같이 잠긴다 — `submitDraftInTx` 가 이미 같은 모양(lock + include items)이라 선례 있고, 품목 행을 먼저 잠그는 다른 길이 없어 교착 없음. 그 밖의 변경 0.
- 검사 AC6 2건(내가 읽음): T1 발주 행 잠금 → HTTP `mark-received`/`receive` 를 안 기다리고 쏨 → 400ms → T1 에서 `markAllReceived`(auto) commit → **재고 +3 한 번 · 구매자 응답 400**. 요구한 틀 그대로.
- 고장주입(팀원 숫자): 두 잠금 제거 + 재시작 → AC6 둘 다 실패(«Deadlock found» — 구매자 쪽이 잠금 없이 재고 행을 먼저 잡아 T1 과 맞물림, 이중 재고 대신 교착으로 깨짐 — 어느 쪽이든 «잠금 없으면 검사가 떨어진다» 는 반증은 성립) → 원복 → 96/96.
- 내가 다시 돌림: `health-check --category=inventory --quiet` **96/96 통과**(exit 0) · 잠금 diff 외 다른 파일 변동 없음.
- 남은 조건 **하나**: page-sweep(RA·BG 등) 재실행 결과 — 1차 `--only mount` 854.6s ✗ 의 실패 줄이 남은 출력에 없어 원인 미상, 재실행은 지금 RA 구간 20/58 OK 로 진행 중(실패 줄 0). 이 기능이 바꾼 화면(발주 목록·상세 · 받은 주문)이 거기 들어 있으니 **크래시 0·console.error 0 을 숫자로 보고에 적을 것.** 거기서 고칠 게 나오면 파일이 바뀌어 이 마커는 지문으로 저절로 죽는다 — 그때 다시 넘긴다.
- 후속 건(createTradeInvoice 잠금)은 위 «보류» 그대로 — 작업기록 «나중에» 에 올리고 이번 배포에 묶지 않는다.
