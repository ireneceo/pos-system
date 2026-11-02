# 사실 정리 — 브랜드 Performance 통계 점검 (2026-11-01 · Opus 실측 · 코드 변경 0)

## Irene 원문
«https://purplehere.com/pos/brand/general/performance 모든 퍼포먼스 통계들 맞는지 확인해주고 브랜드나 레스토랑 추가되는거 제대로 적용되는지도 확인해줘.»

## 화면
- Overview = dev-frontend/src/pages/BrandGeneral/BrandPerformance.tsx (/pos/brand/general/performance)
- 6탭(Sales Ranking·Sales Report·Sales Details·Menu Analysis·Customer Insights·Operations) = BrandReportsPage.tsx (/pos/brand/general/performance/stores?tab=…) — 사이드바 Performance 메뉴 밑(MainLayout.tsx:1689-1700). 역할 BG·BM 둘 다(App.tsx:992-1003).

## 화면마다 «내 매장» 을 고르는 방법이 다르다 (코드)
| 어디 | 브랜드 목록 | 매장 목록 |
|---|---|---|
| Overview | GET /api/brands (brands-core.js:196 — BG=owner_id, BM=bmBrandIds) | GET /api/restaurants (restaurants-crud.js:85 — BG·BM 모두 restaurant_managers 행(manager_id=나) 만) |
| 6탭 | GET /api/brands (같음) | GET /api/restaurants/manager/:id (restaurants-crud.js:399 — BG·BM 모두 brands.owner_id=나 인 브랜드의 매장. BM 은 소유자가 아니라 늘 0. 응답은 Restaurant 행 전 컬럼) |
| 주문 GET /api/orders (orders-crud.js:67) | — | restaurant_managers 행 ∪ utils/managerBrandScope.brandRestaurantIdsForUser(소유∪배정, BM=managerBrandIds) |
- 단일 기준(메모리 reference_brand_scope_owner_or_assigned): 브랜드 범위 = utils/managerBrandScope.js brandIdsForUser/brandRestaurantIdsForUser. 수익성 분석(services/profitability)도 이것을 씀.
- 매장 만들 때 restaurant_managers 행은 요청에 managerIds 를 실을 때만 생김(restaurants-crud.js:1300-1310). 매장 brand_id 만 넣으면 Overview 에 안 나옴.
- orders GET: restaurant_id 가 허용 목록에 없으면 거부하지 않고 허용 전체로 넓혀 돌려줌(orders-crud.js:121-125).

## 운영 실측 (읽기만, 2026-11-01)
브랜드: 1 with MIN(owner 23) · 2 K-DINE with MIN(23) · 4 K-Taste Group(24 demo) · 5 The Fire(29) · 10 Seoul Kitchen Collective(24) · 12 New brand(24) · 13 K-DINE Noodles(23, 10-27 생성, 매장 0)
사람별(C=단일 기준 매장 수, A=Overview 매장 수, B=6탭 매장 수):
- 23 help@gitconsulting.group BG 소유자: C=2 A=2 B=2 정상
- 24 demo-brand BG: 6/6/6 정상 · 29 The Fire BG: 3/3/3 정상
- 65 minky3018(aidan) Brand Manager, 범위 브랜드 1·2·13: C=2(매장 8·10) **A=0 B=0** → Overview·6탭 매장 0개
- 49 siny@purplehere.com Brand Manager, 브랜드 4: C=3 **A=0 B=0**
- 11 kdine-brand@gitconsulting.group BG(배정만, 브랜드 1): C=1(매장 10) A=1(매장 9 — 브랜드 아닌 매장, 매니저 행만) B=0 · 브랜드 목록 0개
- 3 jane@manager.com BM · 6 brand_general@orderhere.center BG: 범위 0, 매니저 행으로 매장 9·5 가 Overview 에 보임(옛 계정)

### Overview 숫자 대조 (화면 계산을 그대로 흉내 · 운영 서버 UTC · 브라우저 MY/KR 둘 다)
정답 = 매장 시간대(Asia/Kuala_Lumpur) 하루 경계 · createdAt · status completed/served · 삭제 아님 (utils/orderRevenue.ts = 서버 utils/revenueOrders)
- 실매장 8·10: today/week/month(30일)/year 매출·건수·이전기간 **전부 일치** (브라우저 KR 이어도 일치)
- 데모 매장 13·14: 어긋남 — 화면은 order_date||createdAt 로 기간을 가르고 서버는 createdAt 으로 가져옴. 13 month 정답 27건 2002.14 / 화면 28건 2132.64, 이전기간 정답 130.50 / 화면 0. 14 today 정답 1건 15.66 / 화면 2건 54.05. order_date≠createdAt 인 주문: 실매장 8 에도 1년 중 4건, 10 에 13건.
- 서버 날짜 경계 = new Date('YYYY-MM-DD') UTC 자정 · setHours 서버 로컬(orders-crud.js:137-143) → 이전기간 첫날 MY 00:00-08:00 이 빠질 수 있음(이번 실측에선 차이 0).
- 화면 기간 경계 = 브라우저 시간대(BrandPerformance.tsx:612-620 setHours) — 타임존 규칙 위반, 이번 실측 KR/MY 차이 0.
- 기간 라벨: 'month' = 최근 30일인데 «This Month», 'week' = 최근 7일인데 «This Week» (DatePeriodFilter.tsx:54-81 · BrandPerformance.tsx:775-777).
- Customers 카드 = 매장별 고유 customer_id 수의 합(같은 손님 여러 매장이면 중복) · 취소 주문 손님도 셈 · POS 주문은 customer_id 없음.
- Avg Fulfillment 전체 = 매장 평균들의 단순 평균(주문 수 가중 아님).
- Growth: 이전기간 0 이고 이번 >0 이면 +100%.
- 매장 카드 branch_name 은 데이터에 안 들어가 항상 안 보임(RestaurantPerformanceData 에 필드 없음).

### 6탭 (BrandReportsPage) 잘림
- GET /api/orders?limit=5000 (날짜 없음, 최신순) 후 화면에서 기간 거름(BrandReportsPage.tsx:495, 628-646).
- 운영 owner 23 범위(매장 8·10) 주문 19,130건 · 최신 5000번째 = 2026-07-25 → «Year» 정답 매출 17,419건 RM 447,144.89 인데 5000건 안에 남는 건 4,742건 RM 124,718.46 (28%). 7-25 이전이 들어가는 기간은 모두 모자람.
- 시간대별(peak hour) = 브라우저 getHours (BrandReportsPage.tsx:765) · 초기 dateRange 시간대 없음(:368).

## 기계적 제약
- 운영 쓰기·배포 금지(개발서버에서만). 🔒 인쇄 보호 8파일 무접촉(orders-crud.js 는 보호 파일 — pending-print/printed/kitchen_items 부분이 보호 대상, GET / 도 같은 파일이라 print-guard 지문이 바뀜).
- 매장 목록·브랜드 목록 범위 = 보안 경계(CLAUDE.md «되돌리기 어려운 변경» ⑤).
- BM 에게 Brand 행은 안전 투영(BM_BRAND_FIELDS)만 줌 — 매장 목록(/manager/:id)은 전 컬럼.
