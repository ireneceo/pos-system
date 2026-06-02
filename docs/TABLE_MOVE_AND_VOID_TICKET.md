# 테이블 이동 + 아이템 취소표 발행 (설계 + 구현)

> 작성 2026-06-01. 상태: **DEV 구현 완료, 미배포.** Irene 결정 = 둘 다 풀버전.
> 인쇄 변경 포함 → 🔒 PRINT 보호 규칙 적용. 실프린터 확인 의무. **배포는 Irene 만.**

## 확정된 운영 정책 (Irene 결정 2026-06-01)
- **목적지 점유 시**: 물어보기 — 백엔드 `onOccupied:'block'`(기본) → 409+목적지 주문요약 → UI 모달에서 "한 빌로 합치기 / 취소" 선택. 'merge' 선택 시 합침.
- **이동 권한**: 직원(Staff) 포함 모두 — `authenticateToken` + 소유권(IDOR) 검증만. requireRole 로 막지 않음.
- **아이템 취소 사유**: 빠른 버튼 — 품절/고객변심/주문실수/기타 → 취소표에 인쇄 + 감사로그 저장.

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

---

## 구현 완료 (2026-06-01, DEV / 미배포)

### 백엔드 (`routes/orders-crud.js`, `models/OrderAction.js`)
- **신규** `POST /orders/:id/move-table` — 트랜잭션+row lock, 소유권(IDOR) 검증, table_number+floor_plan_table_id **원자적 갱신**, onOccupied block(409+dest요약)/merge, 완료주문 차단(409 ORDER_CLOSED), same-table no-op 차단, station 변경용 `printedItems` 반환, 감사로그 `table_moved`(from/to), socket order-updated/order-items-added.
- **OrderAction ENUM** 에 `table_moved` 추가 (모델 + DB ALTER 둘 다).
- **DELETE /items/:idx** `item-voided` 페이로드 + 응답 `removedItem` 에 `kitchen_station_id`/`was_printed`/`stationName`/`options` 추가 (프론트 station 라우팅 취소표용). reason 은 기존대로 audit 저장.

### 프론트 (`FloorPlanPage.tsx`, `TableDetailPanel.tsx`, `LiveOrdersPage.tsx`)
- TableDetailPanel: dine-in 진행주문에 **[Move] 버튼** (onMoveTable prop).
- FloorPlanPage: **목적지 picker 모달**(검색+점유표시 칩) + `doMove`(block→409시 merge/cancel 모달) + 🔒 station변경시 옛station VOID + 새station 재발행(printCancellationTicket/printKitchenTicketViaRawBT **호출만**, 방식 무변경).
- LiveOrdersPage: 아이템 삭제를 **사유 빠른버튼 모달**(품절/고객변심/주문실수/기타)로 교체. 삭제 후 was_printed+wasInKitchen+설정 게이트 통과 시 **취소된 아이템만** station 라우팅 취소표.
- i18n 4언어 (floorplan.moveTable.*, orders.voidItem.*).

### 검증 (DEV, 실API + 실브라우저)
- move-table 백엔드 14/14 (이동/FPTI원자갱신/IDOR/점유block+merge/완료차단/감사로그/printedItems).
- move+void 통합 6/7 (1건=audit best-effort 타이밍 = 테스트버그, reason 저장 격리확인 OK).
- 실브라우저 mount 2/2 (Floor Plan, Live Orders 크래시0/err0/boundary0).
- 인쇄 계약 7/7 (보호파일 지문 플래그만 — bless 는 **배포 시 Irene 승인+실프린터 확인 후**).
- build main.d4ba91db.js, autoprint regression 44 PASS, i18n Errors 0.

### ⚠️ 배포 전 (Irene 만)
1. `--bless` (orders-crud.js 지문 — move-table/item-voided 는 인쇄방식 무관, 새 엔드포인트+payload 필드).
2. 배포 후 The Fire 실프린터: (a) station 다른 테이블로 이동 시 옛 주방 취소표 + 새 주방 재발행 1장씩, (b) 자동발행된 아이템 취소 시 해당 station 취소표 1장. 눈 확인.

---

## 설계 2 — 이동/취소 티켓 내용 차별화 (2026-06-01, **설계 확정 — Irene 전체위임**)

> 문제: 이동 재발행 / 취소 티켓이 **일반 오더티켓과 똑같이** 나와서 주방이 또 만든다.
> 안내 문구 + 시각 표시(줄긋기)로 명확히 구분해야 함. 🔒 billPrint.js 변경 — Irene 승인 + 실프린터 확인 필수.

### 4-케이스 (내용이 전부 달라야 함)
| # | 케이스 | 헤더 | 시각/라우팅 | 본 문서 절 |
|---|--------|------|------------|-----------|
| 1 | 테이블 이동 → **빈 테이블** | `** TABLE CHANGED **` "이전 티켓 버리고 이걸로" + 새 테이블 | 옛 station VOID + 새 station 재발행 | A |
| 2 | 테이블 이동 → **점유(머지)** | `** TABLE CHANGED + MERGED **` "이 테이블들 이전 N장 버리고 이걸로" | 동일 + 머지 합본 | A |
| 3 | **아이템만 취소** | `*** ITEM CANCELLED ***` | 취소 아이템 ~~줄긋기~~ + 사유, 그 station 만 | B |
| 4 | **주문 전체 취소** | `*** ORDER CANCELLED ***` | 전 아이템 ~~줄긋기~~, **station별** 각자 아이템만 | C |

### 코드 위치 (audit)
- 일반 주방티켓: `generateKitchenTicketContent`(ESC/POS, line 1846) / `generateHTMLKitchenTicket`(HTML, line 1482). 아이템에 `stationName` 외 status/strike 플래그 없음. 상단에 `orderData.groupLabel`(박스 배너)·`orderData.notes`(SPECIAL NOTES) 훅 있음.
- 취소티켓: `generateCancellationTicketContent`(3533)/`generateHTMLCancellationTicket`(3588). 이미 `*** CANCELLED ***` 헤더 + `>> STOP PREPARATION <<` 푸터. 단 **아이템 줄긋기 없음(plain list)**, **station 라우팅 안 함**(단일 프린터).
- station 버킷팅: `printKitchenTicketsByStation`(3244) — kitchen_station_id 로 분배. 취소경로는 이걸 안 탐(신규 배선 필요).
- 줄긋기: HTML=`text-decoration:line-through` 가능(현재 없음). ESC/POS=네이티브 없음 → `-- CANCELLED --` 접두 또는 reverse-video(헤더가 이미 REVERSE 사용).
- 모든 티켓 문구 하드코딩 영어(t() 못 씀).

### A. 테이블 이동 재발행 티켓 (자동발행 ON 매장)
신규 필드 `orderData.noticeHeader` 추가 → 티켓 최상단 박스. 일반 발행은 미설정이라 영향 0.
```
┌────────────────────────────┐
│   ** TABLE CHANGED **       │   ← noticeHeader (이동 단순)
│ Discard previous ticket.    │
│ Use THIS one.               │
└────────────────────────────┘
Order  260601-003
Time   02:06 pm
Source POS
─────────────
ORDER ITEMS
1 × Bibimbap
TABLE  U-5                     ← 새 테이블
```
합체 이동이면 헤더 문구만 교체:
```
│  ** TABLE CHANGED + MERGED ** │
│ Discard the previous 2 tickets│
│ for these tables. Use THIS.   │
```
→ FloorPlanPage 의 재발행 호출에서 `noticeHeader` 전달(merge 여부로 문구 분기). 인쇄 방식(USB/QZ/RawBT)·게이트는 기존 그대로.

### B. 아이템 취소 티켓 (해당 station)
취소된 그 아이템만, **줄긋기**로:
```
   *** ITEM CANCELLED ***
Order  260601-003   TABLE U-1
─────────────
~~1 × Kimchi Stew~~            ← strikethrough
Reason: Sold out
>> DO NOT PREPARE <<
```
→ `generateCancellationTicket*` 의 item 빌더에 strike 적용(HTML line-through / ESC/POS `-- X -- ~~name~~` 또는 reverse). 이미 station 라우팅됨(LiveOrders 가 stPrinter 지정).

### C. 주문 전체 취소 티켓 (station별)
전 아이템 줄긋기 + **station별로 그 station 아이템만**:
```
   *** ORDER CANCELLED ***
Order  260601-003   TABLE U-1
─────────────
~~1 × Bibimbap~~              ← 이 station 아이템만, 전부 줄긋기
~~2 × Soju~~
>> DO NOT PREPARE — ALL CANCELLED <<
```
→ 전체취소 경로(LiveOrders confirmCancelOrder)가 `printCancellationTicket` 대신 **station 버킷팅 경유**로 각 station 에 그 station 아이템만 줄긋기 발행. (신규 배선 — `printKitchenTicketsByStation` 의 버킷팅 재사용)

### D. 자동/수동 발행 UX (확정 — 30년차 솔루션 표준안)
> "자동발행 설정이 된 경우에만 발행. 수동이면 액션 시 같이 인쇄 보낼지 물어보거나 완료표시에서 프린트." → 아래로 확정.

**자동발행 ON** (`kitchenPrinter.autoPrint` master + 해당 토글):
- 4-케이스 티켓을 액션 직후 **무음 자동 발행**. 액션 모달엔 "주방에 자동 통보됨" 안내만. 결정적·빠름.

**자동발행 OFF (수동)**:
- 액션 confirm 모달(이동=목적지 picker / 취소=사유 빠른버튼) 안에 **발행될 티켓 목록 미리보기** + 주 버튼 `확인 + 티켓 인쇄`, 부 버튼 `인쇄 없이 확인`.
- 상시 별도 버튼 X(화면 정리). 멀티티켓(이동=옛VOID+새재발행 2장 / 전체취소=station N장)도 한 번에.

**공통 안전망** (규칙 #6 재사용):
- 액션 완료 표시(토스트/패널)에 **재인쇄 버튼**. 인쇄 실패 시 `autoprint-failed` 배너 → 재시도. "종이 안 나옴" 0.

**게이트 단일화**: 4-케이스 모두 `kitchenPrinter.autoPrint`(master) + 케이스별 토글(`printCancellationTicket` 등) 존중. 자동발행 OFF 매장은 절대 자동으로 안 쏨(수동 버튼으로만).

### 구현 범위 / 가드
- billPrint.js: `noticeHeader` 렌더(양 포맷) + 취소 item strike(양 포맷) + 전체취소 station 라우팅. **인쇄 방식/주소/분배 로직은 무변경**, 콘텐츠·신규 필드만.
- 호출부 게이트: autoPrint ON → 자동 호출 / OFF → confirm 모달 "확인+인쇄" 버튼에서만 호출 + 완료표시 재인쇄.
- 호출부: FloorPlanPage(이동 noticeHeader), LiveOrders(아이템취소 strike·전체취소 station경유).
- 🔒 변경 후 check-print-guard --bless(Irene 승인) + 실프린터: 이동(버리라 안내) / 아이템취소(줄긋기) / 전체취소(station별 줄긋기) 눈 확인.
- 한 번에 하나씩 실프린터 확인(A→B→C), 동시 인쇄변경 금지.

---

## 🔒 확정 스펙 v2 (2026-06-02, Irene 확정) — 위 "자동발행 OFF=물어보기" 모델 대체

> 위 v1 게이트("자동 OFF → 보낼지 confirm")는 **폐기**. 새 원칙: **취소·이동은 주방이 무조건 알아야 하므로 묻지 않고 항상 발송**, 팝업은 "보낼까요?"가 아니라 **알림(무엇을 어디로 보냈는지)**.

### 1. 발송 게이트 (단일 규칙)
- **취소(아이템/전체)·테이블 이동·이동+머지 → 자동발행 설정과 무관하게 항상 발송.** 안 보내는 선택지 없음.
- **`kitchenPrinter.autoPrint`(마스터)는 "신규 주문 오더티켓"에만** 적용 (ON=자동 / OFF=직원 수동 인쇄).
- **`printCancellationTicket` 별도 설정 삭제** (취소는 무조건 발송이므로 토글 불필요).

### 2. 화면 팝업 (KitchenTicketSendModal 개편)
- "Send order ticket to kitchen? / Don't send·Send" (허락형) → **알림형**으로: 제목 "주방에 발송됨", 푸터 `[재발송] [닫기]`. 항상(자동 ON·OFF 모두) 뜸.
- 본문: 발송 대상 station 별 미리보기(`previewStationBuckets`) 그대로.

### 3. KDS(주방 디스플레이) 화면 팝업 — **탭(curStation) 기준** (인쇄는 프린터 IP 기준)
- 팝업은 **현재 열린 탭** 기준 필터: All=전체 / Station탭=그 station 아이템만. (item-voided/table-moved 는 이미 curStation 필터 동작.)
- 종류: **아이템취소(void, 빨강)** ✓있음 / **테이블이동(move, 앰버)** ✓있음 / **주문취소 전용(ORDER CANCELLED, 빨강) 신설** / **이동+머지 전용 문구("merged into Tx") 신설**.

### 4. 모든 오더티켓 상단 **station 이름 박스** (신규/취소/이동 전부)
- 현재 station 은 아이템 옆 인라인 태그뿐 → **티켓 상단에 station 이름 박스 헤더** 추가(모든 티켓). HTML(QZ) + ESC/POS 양 포맷.

### 5. 라우팅 범위
- **이동**: 그 주문 아이템이 가 있는 **모든 station** (옛 station VOID + 새 station 재발행).
- **취소(아이템/전체)**: **이미 발행됐던(주방 진입) 아이템의 station 에만**. 미발행분 제외.
- station 없는 매장 → POS(카운터) 인쇄(미러 설정 따름).

### 6. 전 화면 동일 — Floor Plan 취소/아이템삭제 연결
- 현재 Live Orders(취소)·Floor Plan(이동)만 연결됨 → **Floor Plan 패널 취소/아이템삭제**도 동일 발송+알림 연결. POS 포함 어디서든 동일.

### 구현 체크리스트 (✗=미구현, 실프린터 확인 시점 진행)
1. ✓ 모든 티켓 상단 station 박스 (billPrint🔒) — 2026-06-02 구현. 7개 티켓 함수 전부(HTML 신규/추가/멀티페이지 + ESC/POS raw/단품 + 취소 ESC/HTML). **실프린터 종이 확인 미완 → 배포 전 의무.**
2. ✓ 무조건 발송 + 알림형 팝업 — 2026-06-02. KitchenTicketSendModal 알림형(제목 "Sent to kitchen", [재발송][닫기]) + LiveOrders 취소/아이템취소 게이트 always-send + FloorPlan 이동 always-send. orders.json ticketSend.* 4개키 4언어.
3. ✓ 주문취소 전용 KDS 팝업 + 이동+머지 문구 — 2026-06-02. KitchenDisplayPage🔒 order-updated(cancelled) 감지→ORDER CANCELLED 팝업(빨강, printed+탭필터), table-moved 핸들러 merged 분기. 백엔드 orders-crud.js🔒 merged 브랜치에 table-moved(merged:true) emit + mergedFromOrderNumber. kitchen.json notice.* 4키 4언어.
4. ✓ Floor Plan 취소/아이템삭제 발송 연결 — 2026-06-02. TableDetailPanel handleCancelOrder(취소전 주문상세 fetch→printed 라우팅)/handleDeleteItem(removedItem) → printCancellationTicket(sByStation) 항상 발송 + onKitchenTicketSent 콜백→FloorPlanPage 알림 모달.
5. ✓ `printCancellationTicket` 설정 삭제 — 2026-06-02. SettingsPage 토글/ref 제거 + billPrint🔒 게이트 2곳 제거(항상 발송). (default/load 잔존 필드는 미사용, 무해.)
- ✓ 이미: 이동/취소 티켓 인쇄, station 라우팅, KDS void/move 팝업 + 탭필터.
- 🔒 billPrint/KitchenDisplay 변경 후 `check-print-guard --bless`(Irene 승인) + **실프린터 눈 확인** 의무. 한 번에 하나씩.
