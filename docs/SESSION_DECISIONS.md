# Session Decisions — 매장 영업 Critical 변경 히스토리

**목적**: 사용자가 같은 영역 다시 ask 시 이 파일 참조 + 과거 결정 인용 + 충돌 감지 알림 후 진행. *우리가 같은 결정 반복 / revert / 양방향 변경* 방지.

**룰**: 같은 항목 두 번째 ask 받으면 → 이 파일 참조 + "X시점에 Y 결정했고 코드 Z 입니다. 다시 W 로 변경 의도가 맞을까요?" 형식 확인 후 진행.

---

## 2026-05-27 매장 The Fire (id=16) 영업 critical

### 빌 / 오더티켓 디자인
- **결정**: 모든 print path (browser / QZ Tray / RawBT) 가 *generateHTMLBill / generateHTMLKitchenTicket* HTML 통일
- **사유**: 사용자 정정 "디자인이 method 별로 다르면 안 됨"
- **위치**: billPrint.js `sendHTMLViaQZTray` — QZ Tray pixel/html mode (OS driver). LAN IP 매장만 ESC/POS raw 유지
- **revert 금지**: ESC/POS 로 되돌리지 말 것 (디자인 mismatch)

### Floor Plan QR URL — `order_type=dine-in`
- **첫 결정**: 제거 (사용자 ask "QR이 다이닝 메뉴 X, 홈으로")
- **revert**: 다시 `order_type=dine-in` 포함 (사용자 정정 "각 QR 별로 그대로 사용")
- **현재**: `?table=A-7&token=...&order_type=dine-in`
- **위치**: backend `routes/table-qr.js`

### QZ Tray sandbox 우회 (자동 fallback)
- **첫 시도**: QR/bill 인쇄 fail 시 자동 iframe browser fallback
- **revert**: 사용자 정정 "QZ 설정인데 왜 브라우저로? 우회 X". 설정대로 honor.
- **현재**: fail 시 명확한 에러, browser fallback 안 함

### 모바일 takeaway + tableNumber
- **첫 시도**: takeaway 면 backend 에서 table_number null clear
- **revert**: 사용자 정정 "takeaway 도 tableNumber 있으면 추가 오더 탭으로"
- **현재**: tableNumber orderType 무관 보존
- **위치**: backend `mobile-orders.js:actualTableNumber`

### 모바일 결제 전 주문 상태
- **첫 코드**: `awaiting_payment` (LiveOrders/Floor Plan 둘 다 별도 라벨, 액션 버튼 없음)
- **변경**: `outstanding` 통일 (LiveOrders/Floor Plan 의 "Proceed Without Payment" 버튼 자동 작동)
- **위치**: backend `mobile-orders.js:initialStatus`

### 카운터 mirror (kitchen → bill printer)
- **첫 결정**: `printBillViaRawBT` (bill 형식)
- **revert**: 사용자 정정 "통합 오더티켓 (kitchen 형식) 카운터 출력"
- **현재**: `generateHTMLKitchenTicket` + bill printer 로. station split X, label="COUNTER"
- **위치**: billPrint.js `printKitchenTicketViaRawBT` 의 mirror 블록

### Mirror 트리거 위치
- **첫 위치**: station 분기 *후* (station 있으면 mirror 안 fire)
- **변경**: station 분기 *이전* — station 매장 도 mirror 작동

### Station 매장 자동발행 trigger
- **첫 조건**: `kitchenPrinter.enabled && autoPrint` 만 (글로벌)
- **변경**: `_stationAutoPrint = Object.values(kitchenStationPrinters).some(s => s.autoPrint)` OR 글로벌
- **사유**: station-only 매장 (글로벌 kitchenPrinter 없음) — 자동 trigger 차단되던 버그

### 빌 copies 후 cash drawer
- **첫 코드**: 별도 `openCashDrawer()` 호출 (raw ESC/POS pulse)
- **문제**: HTML pixel printer 가 raw 받고 garbage 영수증 1장 추가 (사용자 "빌 3장")
- **변경**: 마지막 receipt print job 안에 drawer pulse inline (`{type:'raw', format:'base64', ...}` 같이 보냄)
- **위치**: `sendHTMLViaQZTray(html, addr, { drawerPulse: true })`

### AutoSaveField 자식 onChange 가로채기
- **버그**: `<label><input/></label>` wrapper 안 input 의 onChange 안 잡힘 → 토글 저장 실패 (현금박스 / autoPrint / copies)
- **fix**: enhancedChildren `enhance` 함수 *recursive* 변경

### 영수증 logo
- **버그**: URL 기반 logo 가 QZ Tray pixel/html render 시 fail (sandbox 외부 fetch 차단 + SVG 의존성)
- **fix**: StoreContext mount 시 logo + customQrImage 를 fetch + canvas → PNG base64 dataURL 변환 + localStorage 저장
- **위치**: StoreContext `fetchAsDataUrl` (이미지 → 480x160 PNG)

### Floor Plan / LiveOrders 결제 자동 빌+주방 trigger
- **상태**: 코드 *원래 없음* (POSTerminal 만 있었음). 매장이 Floor Plan/LiveOrders 결제 → 자동발행 X
- **추가**: 두 곳 모두 `handlePaymentConfirm` 끝에 trigger 추가. POSTerminal 와 동일 패턴.

### KDS station-filter print
- **상태**: 카드의 print 버튼이 전체 order.items 전달
- **fix**: `selectedStation !== 'all'` 면 `order.items.filter(isItemInSelectedStation)` 후 전달

### Table label T-prefix 자동 부착
- **버그**: label "A-7" 에 `T` 자동 prefix → "TA-7"
- **fix 위치**: OrderTrackingPage (mobile) + KDS 5곳. 알파벳 포함 label 은 그대로, 숫자만 T-prefix

### 모바일 헤더 디자인
- **이전**: 좌 백버튼 | 가운데 Title | 우 TableChip — 우측 정렬 시각 어색
- **변경**: 좌 Title (left align) | 우 combined ContextChip ("🍽 A-7 · Dine-in")
- **위치**: MobileLayout.tsx

### 모바일 홈 버튼 navigate
- **이전**: `/mobile/{slug}?table={T}` (OrderTypePage 가 auto-redirect → dine-in MenuPage)
- **변경**: `?table={T}&picker=1` 추가 — picker mode 진입

### 모바일 MenuPage 탭 vertical 흔들림
- **fix**: `touch-action: pan-x`, `overflow-y: hidden`, `overscroll-behavior-y: none`

### Mobile 주문 floor_plan_table_id 매핑
- **상태**: mobile 주문이 floor_plan_table_id null → Floor Plan canvas 매핑 X
- **fix**: backend mobile-orders.js — table label → floor_plan.tables.id auto-lookup

### Mobile 주문의 kitchen_station_id (카테고리 매핑 작동)
- **상태**: mobile order_items 에 menu_item_id 없음 → KDS station 매핑 fail
- **fix**: backend mobile-orders.js — Product → Category 매핑으로 자동 채움

### Station bucket unmapped items
- **이전**: 별도 ticket 으로 send (race fail 가능)
- **변경**: first mapped station ticket 에 합쳐 1 print job

### Service charge takeaway 자동 제외
- **확인됨 (변경 X)**: 매장의 `operation_settings.serviceChargeExcludeTakeaway: true`. takeaway 시 service_charge 자동 0.
- **위치**: mobile/pages/PaymentPage.tsx:scApplies

### Floor Plan multi-order 표시
- **확인됨 (코드 존재)**: TableStatusInfo.orderCount, TableNode `<MultiOrderBadge>`, TableDetailPanel `orders[]`. 매장이 안 보이는 건 fetch / table matching 문제 — 별도 진단.

### 로그인 사용자별 주문 분리
- **결정**: 지금 안 추가 (사용자 정정)

### 운영 보호
- 운영 nginx 의 `immutable` cache-control 제거 = 사용자 SSH 1줄 필요 (passwordless sudo X)
- 운영 cloudflare cache purge = 사용자 dashboard 수동
- 우리 코드 측면 SW v3.43.0 force-navigate + cache wipe deploy 완료

---

## 알려진 미해결 (별도 task)

### Task #13 — Mobile 주문 merge race condition
- **버그**: orders-crud.js POST 의 `findMergeableOrder` transaction lock 없음. mobile 동시 주문 시 race — 같은 table+orderType 안 합쳐짐 + order_number 중복 (예: 019/12006 + 019/12007)
- **fix 방향**: transaction `SELECT ... FOR UPDATE` + order_number 생성 unique 검사

### Invoice 7개 페이지 window.open → iframe
- 별도 task (Task #9 in original session). 매장 critical 외.

---

## Memory 관련 룰 (이 세션 + 다음 세션)

- The Fire 매장 setup: workstations POS 1 (qztray, POS-80C, autoPrint), POS 2 (browser, autoPrint OFF), 3 station printers KQ1/KQ2/BAR (qztray, autoPrint), copies 2, autoOpenDrawer, mirrorToBillPrinter true, floor_plan v2 (label A-1, A-2...)
- 사용자가 같은 영역 다시 ask 시 — 이 파일 참조 + 충돌 감지 + 확인 후 진행
- 항상 *왜 그렇게 결정했는지* 기록 (사유 명시)
