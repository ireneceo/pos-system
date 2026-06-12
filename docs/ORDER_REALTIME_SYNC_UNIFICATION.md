# 주문 단계 실시간 동기화 통일 설계 (Order Realtime Stage Sync Unification)

> 작성: 2026-06-11 · 계기: Irene 매장 보고 — "아이템리스트 5 / KDS 3 안 맞고, 리프레시해야 나오고, 어디서 조치해도 실시간 동기화 안 됨. 모두 같은 곳에서 정보를 가져오게. 정석대로, 제대로 작동 안 하면 못 쓴다."
> 상태: **✅ 구현 완료 + v3.55 운영 배포 (2026-06-12)**. 구현 결과:
> - 백엔드 단일 단계 모델(orders-crud.js `COOK_LVL`/`cascadeItemsToOrderStatus`/`deriveOrderStatusFromItems`) — 주문단위 이동=아이템 양방향 동행(P1 해결), 아이템 이동=주문 min roll-up(/items·void), 프론트 3곳 중복 roll-up 호출 제거.
> - 공용 `contexts/OrdersRealtimeContext.tsx` + `utils/orderStage.ts`(table-status 1:1 클라 파생) — LiveOrders·FloorPlan(캔버스/아이템뷰/Takeout) 전환, table-status 의존 제거(P2 해결).
> - KDS 는 §3 Phase 4 전환 대신 **무접촉 정합**: 이미 6종 구독+upsert+버전가드 보유. 단, 실측이 잡은 2버그 수정 — ①`restaurant_id !== user.restaurantId` 문자열/숫자 엄격비교로 **모든 소켓 이벤트 무시**(만성 "리프레시해야 보임"의 정체) ②버전가드 ms 비교(생성=메모리 ms vs 갱신=DB 초절삭 → 같은 초 전환 drop). **교훈: 소켓 restaurant 비교는 Number()==Number(), 버전 비교는 초 단위.**
> - 검증: 실API 23케이스×3회 + 크로스화면 e2e(≤2s·리프레시0, 실반영 ~10ms)×3회 + KDS e2e×3회 + 운영 demo 13/13.

## 0. 문제 한 줄 요약
5개 화면(Live Orders / Floor Plan 캔버스 / Floor Plan 아이템리스트 / Takeout / KDS)이 **① 데이터 소스 ② 소켓 갱신 ③ 단계 도출**을 제각각으로 해서, 같은 주문이 화면마다 다르게/늦게 보이고 리프레시가 필요하다.

## 1. 현행 구조 감사 (2026-06-11, 코드 실측)

### 1-A. 데이터 소스가 둘로 갈라짐 (← "5 vs 3" 근본)
| 화면 | 엔드포인트 | 필터 |
|------|-----------|------|
| KDS | `/orders/restaurant?status=pending,preparing,ready` | served/completed 제외 + (ready인데 전 아이템 served면 `isKitchenVisible`로 숨김) |
| Live Orders | `/orders/restaurant?includeCompleted=true&limit=1000` | 전 단계 (탭별 status 필터) |
| Takeout | `/orders/restaurant?includeCompleted=true&limit=200` | off-table(takeaway/pickup/delivery)만 |
| Floor Plan 캔버스 + 아이템리스트 | **`/restaurants/:id/table-status`** (별도 엔드포인트, 파생 집계) | cancelled 제외, served/completed 테이블에 잔류 |

→ 아이템리스트(table-status)는 served까지 표시, KDS는 cooking 단계만 → 5 vs 3. 소스 자체가 달라 구조적으로 어긋남.

### 1-B. 소켓 이벤트 구독 불일치 (← "리프레시해야 나옴")
백엔드 발행 6종: `order-created / order-updated / order-items-added / order-deleted / item-voided / table-moved` (전부 `/orders` 네임스페이스, room=`restaurant_<id>`). table-status 엔드포인트 자체는 소켓 미발행.

| 화면 | 구독 | 갱신 방식 | 누락(→리프레시 필요) |
|------|------|-----------|------|
| Floor Plan | created/updated/items-added/new-order | 2s debounce 후 **전체 refetch(table-status)** | **order-deleted, item-voided, table-moved 미구독** |
| Live Orders | created/updated/deleted/items-added | **in-place** (upsert/remove) | items-added 때 **주문 상태 미갱신**(알림 배너만) → 추가 품목 안 보임 |
| KDS | created/updated/items-added | in-place + 일부 refetch | (세트 구성품 이중구조 버그는 2026-06-11 별도 수정) |
| MainLayout(전역) | created/updated/items-added | 배지/사운드/인쇄폴러 | — |

→ 갱신 전략이 in-place(LiveOrders) vs 전체 refetch(FloorPlan)로 섞여 레이스/누락.

### 1-C′. 🔴 확정 근본원인 — 주문 단계(order.status) ↔ 아이템 단계(item.status) 드리프트
코드+운영 데이터(r24, 2026-06-11)로 확정. 두 단계가 **별도 저장**되는데 전파가 비대칭:
- 전진 served/completed → 모든 아이템 `completed` 강제 전파 (orders-crud.js:1383-1391).
- **역방향 revert → 아이템 미전파** (orders-crud.js:1397-1399 "리셋 안 함" 명시).
- 아이템 단위 진행은 주문으로 roll-up 되나, 주문 단위 이동은 아이템으로 일관 cascade 안 됨.

운영 r24 실데이터 증거:
- #006 order=**pending** / items=[served:1,ready:2] (아이템이 주문보다 앞섬 — KDS서 진행 후 주문 되돌림)
- #003 order=**served** / items=[ready:2] (아이템이 주문보다 뒤)
- #004/#005 order=completed / items=completed (일치)

영향: 완료→되돌린 주문이 KDS 아이템뷰에 안 뜸(아이템이 completed/served라 pending/preparing/ready 컬럼에 안 들어감). "5 vs 3"의 진짜 원인. Irene 지적 "주문단위 이동은 아이템이 같이 다녀야" 가 안 지켜지는 핵심 지점. → 단순 필터 문제 아님, **단일 단계 모델 부재**. 목표구조(§2)는 order↔item 양방향 일관 cascade(또는 단일 파생) 포함 필수.

### 1-C. 단계 도출이 화면마다 다름 (← "단계표시 달라?")
- `order.status`는 공통 소스지만, KDS는 아이템·스테이션 단위 재계산(`stationCardStatus`), Floor Plan은 table-status 집계 등 **표시 단계를 각자 계산**.
- `order.status`(주문)와 `item.status`/세트 구성품 status가 **어긋남**(예: 주문=ready인데 구성품=served/ready 혼재). `/status` 핸들러는 served/completed일 때만 아이템에 전파(preparing/ready는 미전파).
- 인쇄(오더티켓) 콘텐츠와는 별개 관심사. 단계 불일치는 인쇄 콘텐츠 때문이 아니라 1-B/1-C 때문.

### 1-D. Served = 회색
`table-status`는 `orderStatus: order.status` 반환 → TableNode가 served→`#6B7280`(회색) 매핑(의도된 값). 단 (a) served를 회색으로 둘지는 디자인 결정, (b) order.status가 실제와 어긋나면(1-C) 색도 어긋남.

## 2. 목표 구조 (정석)

**단일 소스 + 단일 실시간 reducer + 단일 단계 도출.** 화면은 표시 목적별 **필터링만**.

### 2-A. 공용 `OrdersRealtimeProvider` (또는 `useOrdersRealtime` 훅)
- 단일 fetch: `/orders/restaurant/:id` (오늘 범위, 전 단계) — table-status 의존 제거(테이블 매핑은 orders에서 파생).
- 단일 소켓 구독: 6종 이벤트 전부 → **하나의 reducer**로 in-place upsert/remove. refetch는 connect/stall 복구용 fallback만.
  - `order-created` → upsert(prepend)
  - `order-updated` → upsert(replace, 단조 가드: 더 오래된 echo로 후퇴 금지)
  - `order-items-added` → 해당 주문 upsert(+사운드/배너는 화면별 구독)
  - `order-deleted` → remove
  - `item-voided` → 해당 주문 upsert(+void 표시)
  - `table-moved` → 양쪽 테이블 매핑 갱신
- 단조(monotonic) 가드 + serve-override(낙관 갱신) 공용화.

### 2-B. 단계 도출 단일 유틸 `deriveOrderStage` / `deriveItemStage` / `deriveSetComponentStage`
- 주문 카드 단계, 아이템/구성품 단계, 테이블 색을 **한 곳**에서 계산. 세트 구성품 status는 set_components/set_items 단일화(2026-06-11 폴백 수정과 정합).
- 화면별 표시는 이 유틸 결과를 필터링만(KDS=cooking 범위, FloorPlan=테이블 매핑, etc.).

### 2-C. 화면별 역할
| 화면 | 공용 store에서 필터 |
|------|------|
| Live Orders | 전 단계 (탭) |
| KDS | cooking(pending/preparing/ready) + 스테이션 필터 |
| Floor Plan 캔버스 | dine-in 테이블 매핑 |
| 아이템리스트 | dine-in + off-table 아이템 평탄화 |
| Takeout | off-table |

→ 같은 store·같은 단계 유틸 → 5 vs 3 같은 불일치 소멸, 어디서 조치해도 즉시 반영.

## 3. 안전 롤아웃 (매장 영업 중 + KDS 보호파일)
1. **Phase 0 (즉시 안정화, 저위험)**: Floor Plan에 누락 소켓(deleted/voided/moved) 구독 추가 + Live Orders items-added 시 주문 상태 갱신. → 리프레시 필요 대폭 감소. (공용화 전 단기 완충)
2. **Phase 1**: 공용 `OrdersRealtimeProvider` + reducer + 단계 유틸 신설(기존 화면 미연결, 병행).
3. **Phase 2**: Live Orders → 공용으로 전환·검증.
4. **Phase 3**: Floor Plan(캔버스+아이템리스트+Takeout) → 공용 전환, table-status 의존 제거·검증.
5. **Phase 4**: KDS(🔒 보호파일) → 공용 전환. 인쇄 핸들러 무접촉, print-guard·실프린터 확인.
6. 각 Phase: build/hydration/mount/health-check + **실 API 동기화 회귀**(한 화면 조치 → 다른 화면 즉시 반영) 3회 연속 통과.

## 4. 검증 기준 (제대로 작동의 정의)
- 한 화면(라이브/플로어/아이템리스트/테이크아웃/KDS)에서 단계 변경 → **나머지 전 화면이 리프레시 없이 ≤2s 내 동일 단계**로.
- 주문취소/아이템void/테이블이동도 전 화면 즉시 반영(리프레시 0).
- 같은 주문의 카드 단계·테이블 색·아이템 단계가 전 화면 **동일**(단일 유틸).
- 세트 구성품 단계 전 화면 일치(2026-06-11 폴백과 정합).
- KDS 인쇄 계약 7/7 + 보호파일 무결성(의도 변경만) 유지.

## 4-B. 🗂️ 미해결 문제 레지스트리 (2026-06-11 세션 — 나중에 하나씩 정석 원인파악)
각 항목 = 증상 / 의심영역 / 상태. **추측 수정 금지, 각각 코드+데이터로 검증 후 처리.**

| # | 증상 (Irene 보고) | 의심 영역 / 메모 | 상태 |
|---|------|------|------|
| P1 | 완료→되돌린 주문이 KDS에 안 뜸 / 5(아이템리스트) vs 3(KDS) | §1-C′ 단계 드리프트 (orders-crud.js:1397 역방향 미전파). 단일 단계 모델로 해결 | ✅ 해결·배포 (v3.55) |
| P2 | 어느 화면(라이브/플로어/아이템리스트/테이크아웃/KDS)에서 조치해도 실시간 동기화 안 됨, 리프레시해야 보임 | §1-A 소스 둘로 분리(table-status vs orders) + §1-B 소켓 구독 불일치 + **추가 실측: KDS restaurant_id 타입 엄격비교로 전 이벤트 무시 + 버전가드 ms 역전** | ✅ 해결·배포 (v3.55) |
| P3 | Floor Plan Table B-4 served인데 테이블 회색 — 맞나? | §1-D served→#6B7280 의도된 매핑이나 (a)디자인 적절성 (b)order.status가 실제와 어긋나면(P1) 색도 어긋남. 데이터로 B-4 실단계 재확인 필요 | 미확인 |
| P4 | KDS 세트 구성품 단계가 재조회마다 리셋 / 아이템뷰가 구성품 status대로 안 보임 | processRawOrderItems 폴백 + 소켓 order-created 경로도 rawToKitchenOrder 로 통일(레거시 인라인 세트 전개 제거) | ✅ 해결·배포 (v3.55) |
| P5 | (구) 통합 오더티켓 POS별 토글 4건 | 배포됨(3.56) + v3.55 에서 워크스테이션별 스테이션 범위(consolidatedStations) 추가. print-guard bless 완료 | ✅ 배포 — **실프린터 눈확인만 대기(Irene)** |
| P6 | (구) 테이블 takeaway가 dine_in으로 / Takeout 미표시 + 테이블칩 | POSTerminalPage:1576 + 백엔드 off-table auto-merge 제외 + Takeout 칩 | ✅ 배포 (v3.55) |
| P7 | (구) POS 직접결제 빌 복사 매수 미반영 | POSTerminalPage 직접인쇄 1장고정. 🔒 인쇄 보호 | 미착수 |

> 미배포 dev 묶음(SW 3.58): P4 + P6. /배포 시 함께. P5(3.56)는 운영에 이미 있음.

## 5. 영향 파일(예상)
- 신규: `contexts/OrdersRealtimeContext.tsx`(or hook), `utils/orderStage.ts`.
- 전환: `pages/LiveOrders/LiveOrdersPage.tsx`, `pages/FloorPlan/{FloorPlanPage,ItemListView,TableDetailPanel,TableNode}.tsx`, 🔒`pages/KitchenDisplay/KitchenDisplayPage.tsx`.
- 백엔드: table-status 의존 제거 시 `/orders/restaurant` 응답에 테이블 매핑 필요 필드 확인(가능하면 무변경).
