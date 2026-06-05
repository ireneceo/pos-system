# Floor Plan — Off-table 통합 주문 뷰 + 배너 라우팅

> 작성 2026-06-05 · Irene 승인 · 30년차 설계 기준. 홀 직원이 Floor Plan만 보고 있어도
> 테이블에 안 매인 주문(테이크아웃·픽업·배달)을 놓치지 않게 한 리스트로 모으고,
> 새 주문/추가 품목 배너에서 바로 해당 우측 패널을 연다.

## 1. 문제
- Floor Plan = dine-in 테이블 + 테이크아웃만 보임. **픽업·배달은 화면에 없음 → 놓침.**
- 새 주문 배너는 **테이블 주문만** 패널을 열고(`tableNumber` 있을 때만), off-table 은 버튼이 무동작.
- 그래서 직원이 픽업/배달을 보려면 Live Orders 로 이동해야 함.

## 2. 목표 (Irene 요청)
1. 테이크아웃 뷰 → **Off-table 통합 뷰**(테이크아웃 + 픽업 + 배달). 매장이 켠 타입만.
2. 각 주문에 **타입 배지** + 픽업시간/배달존 표시. 타입 **필터 칩**(켠 타입만).
3. 우측 패널에서 결제·단계이동·인쇄 액션 → **Live Orders 안 가도 됨**(기존 패널 재사용).
4. **배너 → 우측 패널 라우팅**: 새 주문/추가 품목 배너 클릭 시
   - 테이블 주문 → 테이블 우측 패널(`setSelectedTableId`)
   - off-table(테이크/픽업/배달) → off-table 뷰로 전환 + 그 주문 우측 패널(`setSelectedTakeawayOrderId`)
5. **off-table 새 주문도 배너**: 테이블은 바닥에서 불 들어와 보이지만 off-table 은 안 보임 →
   order-created 가 off-table 이면 배너를 띄워야 놓치지 않음.

## 3. 현재 구조 (조사 결과, FloorPlanPage.tsx)
- 뷰: `activeView` = URL `?view=` (floor|takeaway|items). 칩 1798-1809. 테이크아웃 카드그리드 1862-1952.
- fetch: `fetchTakeawayOrders` 518-551 → `GET /api/orders/restaurant/:id`(백엔드 orders-views.js 는 **order_type 필터 안 함 = 전 타입 반환**). **클라 필터 538-543 가 takeaway 만 남김.** ← 여기만 바꾸면 됨.
- 패널: 테이블=`TableDetailPanel`(1955), 테이크아웃=같은 `TableDetailPanel` 재사용(1987-2060, adapter 1997-2032 가 `orderType:'takeaway'` 하드코딩 2030).
- 배너: `itemsAddedAlert` 466-473, 소켓 `order-items-added` 649-666(payload=orderId,tableNumber), JSX 1545-1585, 클릭 1571-1578(테이블만). `order-created` 648 = refetch 만.
- 주문타입 설정: `operation_settings.orderTypes {dineIn,takeaway,pickup,delivery}`. **StoreContext 인터페이스엔 없음** → FloorPlanPage 가 이미 fetch 하는 `restaurant` 객체에서 직접 읽는다(저위험).
- 주문 필드: `order_type`('dine_in'|'takeaway'|'pickup'|'delivery'), `scheduled_pickup_time`, `delivery_info`(JSON), `table_number`, `floor_plan_table_id`, `customer_name`, `pickup_number`.

## 4. 설계

### 4.1 데이터
- **fetch 필터 확장**(538-543): `['takeaway','pickup','delivery'].includes(ot)` 로. 백엔드 변경 없음. dead 파라미터 `order_type=takeaway`(525) 제거.
- 상태명은 `takeawayOrders` 유지(소비처 다수 — 의미만 off-table 로 확장, 주석).
- `restaurantOrderTypes` 상태 추가: restaurant fetch 시 `operation_settings.orderTypes` 저장(없으면 기본 dineIn/takeaway true).

### 4.2 표시
- 카드(1932): **타입 배지**(Takeaway=회색 / Pickup=파랑 / Delivery=보라). 픽업=예약시간, 배달=존/주소 한 줄.
- **타입 필터 칩**(All/Takeaway/Pickup/Delivery) — 뷰 헤더에, **켠 타입만**. 로컬 `offTableFilter` 상태. 1개 타입만 켜져 있으면 칩 생략.
- 정렬: 픽업은 `scheduled_pickup_time` 우선, 그 외 주문시간.
- 메인 칩 라벨: 켠 off-table 타입이 1개면 그 이름, 여러개면 "To-Go". `?view=takeaway` URL 값은 하위호환 유지.

### 4.3 패널
- adapter(2030) `orderType` 하드코딩 → **실제 `order_type`** 전달. 픽업/배달도 같은 패널(결제·단계·인쇄). 배달=주소, 픽업=시간 표시.

### 4.4 배너 라우팅 (핵심)
- 배너 alert 에 `kind`('items'|'order') + `orderId` + `orderType` + `tableNumber` 보강.
- 클릭(1571-1578):
  ```
  if (tableNumber && 테이블찾음) setSelectedTableId(...)        // 테이블 패널
  else if (orderId) { setActiveView('takeaway'); setSelectedTakeawayOrderId(orderId) }  // off-table 패널
  닫기
  ```
- `order-created`(648): 새 주문이 **off-table** 이면 `itemsAddedAlert`(kind:'order') 띄움(테이블 주문은 기존대로 바닥 표시 — 배너 선택). payload=plainOrder(order_type,id,order_number,table_number).
- 🔒 인쇄 무관: FloorPlanPage 의 order-created 는 refetch 만(프린트는 MainLayout poller). 배너 추가는 표시 전용.

## 5. 구현 순서
1. restaurantOrderTypes 읽기 + fetch 필터 확장(픽업·배달 포함)
2. 카드 타입배지 + 픽업시간/배달존 + 정렬
3. 타입 필터 칩(켠 타입만) + 메인 칩 라벨
4. 패널 adapter 실 order_type
5. 배너 라우팅(off-table 분기) + order-created off-table 배너 + alert kind 보강
6. i18n 4언어 + 빌드 + mount(?view=takeaway) + print-guard(무변경 확인)

## 6. 비목표 / 가드
- 새 액션 타입 없음(결제·단계·인쇄만). 운영 데이터 e2e 금지(demo/dev only).
- 인쇄 방식/타이밍/라우팅 무변경. order-created 배너는 표시 전용.
</content>
