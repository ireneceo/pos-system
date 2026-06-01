# 테이블 이동 + 아이템 취소표 발행 (설계)

> 작성 2026-06-01. 상태: **설계 확정, 구현 대기 (다음 세션).** Irene 결정 = 둘 다 풀버전.
> 인쇄 변경 포함 → 🔒 PRINT 보호 규칙 적용. 실프린터 확인 의무.

## 배경 / 문제

1. **테이블 이동 기능 부재** — Floor Plan 에 주문을 다른 테이블로 옮기는 UI/백엔드가 전혀 없음. 과거 T-7→T-13 이동을 **DB 직접 수정**으로 처리(기능 부재 증거). generic `PATCH /orders/:id` 로 `table_number` 만 바꿀 수 있으나 `floor_plan_table_id` 를 안 바꿔서 **주문이 옛 테이블에 그대로 표시됨**(Floor Plan 은 FPTI 우선 매칭).
2. **아이템 1개 취소 시 주방 취소표 미발행** — 주문 전체 취소는 `printCancellationTicket` 로 "STOP PREPARATION" 주방 발행됨. 그러나 **아이템 1개만 취소하면 주방에 종이로 아무것도 안 나감** → 이미 자동발행된 티켓의 아이템을 주방이 그대로 만드는 미스 위험. 백엔드가 `item-voided` 소켓 emit 하나 **리스너 없는 죽은 이벤트**.

## 현재 코드 사실 (조사 결과)

- 테이블 이동: UI 없음(`TableDetailPanel.tsx:1756~` Move 버튼 없음), 전용 엔드포인트 없음. FPTI 는 **주문 CREATE 시점에만** 설정(`orders-crud.js` POST), PATCH 는 FPTI 안 건드림.
- 취소표 함수 **이미 존재**: `printCancellationTicket()` (billPrint.js:3628, 🔒). ESC/POS + HTML/QZ + RawBT + bill mirror + emergency 변형 다 있음. `items` 배열 + `reason` 받음 → **아이템 배열만 바꿔 호출하면 단일 아이템 취소표 가능**(템플릿 신규 불필요).
- 취소표 설정 토글: `kitchenPrinter.printCancellationTicket`(기본 true, SettingsPage.tsx:6773).
- 전체취소 호출처: `LiveOrdersPage.tsx:1335` `confirmCancelOrder`, `wasInKitchen` 가드(주방 진입분만 발행).
- 아이템 삭제: 백엔드 `DELETE /orders/:id/items/:itemIndex`(orders-crud.js:1765, `item-voided` emit :1943), 프론트 `LiveOrdersPage.tsx:1099 confirmDeleteItem`(인쇄 호출 없음), POS `handleDeleteItem`(카트 전용=발행 무관).
- 정규 kitchen 티켓엔 cancelled-item 렌더(취소선/VOID) 개념 없음.

---

## 설계 A — 테이블 이동 (풀버전)

### A-1. UI (Floor Plan)
- `TableDetailPanel` 에 **[Move] 버튼** 추가. 클릭 → **목적지 테이블 선택**(Floor Plan 목록/캔버스 탭 선택, 자유타이핑 금지 — 기존 테이블선택 패턴).
- 확인 모달: "T-7 → T-13 으로 이동. 아이템/금액/고객/결제 전부 이동." + 주방 재발행 여부 안내.
- 터치 전제(키보드 없음) — 칩 선택.

### A-2. 백엔드 — 신규 엔드포인트 `POST /orders/:id/move-table`
Body: `{ destinationTableNumber, destinationFloorPlanTableId, onOccupied?: 'merge'|'block' }`
- 인증: `authenticateToken` + 소유권 확인(주문 restaurant === user restaurant; IDOR 패턴).
- 트랜잭션으로:
  1. **table_number + floor_plan_table_id 둘 다** 목적지로 갱신(원자적). ← 핵심 결함 수정.
  2. 옛 테이블 자동 비움(FPTI 갱신으로 자연 해결).
  3. 아이템/금액/고객/결제/order_group 은 같은 row → 자동 보존.
  4. audit log: 신규 actionType `table_moved` (from/to 기록).
  5. socket `order-updated` emit (LiveOrders/FloorPlan/KDS 갱신).
- **목적지 점유 처리**: 목적지에 열린 주문 있으면 `onOccupied`:
  - `merge`: 기존 머지 로직(`mergeItemsIntoOrder`) 재사용 → 한 빌.
  - `block`(기본): 400 + "목적지 테이블에 진행 중 주문 있음. 합칠지 선택." → UI 가 재호출.

### A-3. 주방 재발행 (station 변경 시) 🔒
- 옛 테이블 아이템들의 station 과 새 테이블 station 이 **다를 수 있음**(zone 별 주방 분리 매장).
- 이동 후, **자동발행 대상이었던(이미 printed_at 있는) 아이템**에 한해:
  - **옛 station: VOID 취소표**(`printCancellationTicket`, reason="Moved to T-13").
  - **새 station: 재발행 티켓**(정규 kitchen 티켓, 해당 station).
- station 동일하면 재발행 불필요(같은 주방이 이미 만들고 있음) → skip.
- 게이트: `kitchenPrinter.autoPrint` master + `printCancellationTicket` 토글 존중. 인쇄 방식/라우팅 무변경 — **호출만 추가**.
- ⚠️ 실프린터 확인 의무.

---

## 설계 B — 아이템 취소표 발행 (풀버전)

### B-1. 트리거
- `LiveOrdersPage.tsx:1099 confirmDeleteItem` + `TableDetailPanel` 아이템 삭제: DELETE 성공 후 `printCancellationTicket` 호출.
- **취소된 그 아이템만** `printData.items` 로 전달(전체 주문 아님). reason="Item removed".
- 가드: 전체취소와 동일한 **`wasInKitchen`(주방 진입분만)** + `printCancellationTicket` 설정 + `kitchenPrinter.autoPrint` master.
  - 즉 아직 주방에 안 간(pending, 자동발행 전) 아이템 취소는 취소표 불필요(주방이 모름).

### B-2. station 라우팅 🔒
- 취소된 아이템을 `stationEnrichment`(resolveProductId)로 station 해석 → **그 station 프린터로만** 취소표(전체 주방 아님).
- 미해석 시 기본 주방 프린터 fallback(기존 동작).

### B-3. 템플릿
- 신규 불필요. `generateCancellationTicketContent`/`generateHTMLCancellationTicket` 가 이미 `items`+`reason` 받음 → 아이템 1개 배열로 호출.

---

## 공통 — 🔒 PRINT 보호 규칙

- billPrint.js 의 인쇄 **방식/라우팅 변경 금지**. 본 작업은 **기존 함수 호출 추가 + station 라우팅 재사용**만.
- 변경 후 `check-print-guard.js` 재확인 + Irene 승인 + **실프린터 출력 확인**(취소표 1장, 재발행 1장 눈 확인).
- health-check print 카테고리 통과 유지.
- 한 번에 하나: A(이동) 먼저 실프린터 확인 → B(취소표) 별도 확인. 동시 인쇄변경 금지.

## 검증 시나리오 (구현 후)

- The Fire 동일설정 테스트매장(is_test, fire-clone) 으로:
  1. 이동: T-7(아이템2) → T-13, FPTI 갱신 확인, 옛 테이블 비움, 금액/고객/결제 보존.
  2. 이동 station 변경: 옛 주방 VOID + 새 주방 재발행(실프린터).
  3. 목적지 점유: merge/block 분기.
  4. 아이템 취소표: 자동발행된 아이템 취소 → 해당 station 에 취소표(실프린터). 주방 미진입 아이템 취소 → 취소표 안 나감.
  5. 회귀: 전체취소 취소표 기존대로, +Round 정상, 금액 공식.
