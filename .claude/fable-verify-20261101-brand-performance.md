# 검증 기록 — 브랜드 Performance (Opus 실행 · 2026-11-01~02)
설계: .claude/fable-design-20261101-brand-performance.md

## 바뀐 파일(이 일)
dev-backend/utils/managerBrandScope.js(restaurantIdsForBrandUser) · dev-backend/routes/restaurants-crud.js(GET / BG·BM 분기 · GET /manager/:id BG·BM 분기 · GET / 응답 timeZone) · dev-backend/middleware/auth.js(brandScopeIncludes + checkRestaurantAccess·userCanAccessRestaurant 브랜드 폴백) · dev-backend/scripts/health-check.js(security 1건) · dev-frontend/src/utils/orderLocalTime.ts(새) · utils/brandPerformanceMath.ts(새) · utils/__tests__/brandPerformanceMath.test.ts(새) · pages/BrandGeneral/BrandPerformance.tsx · BrandReportsPage.tsx · public/locales/*/brand.json(키 9개 추가) · public/sw.js(6.05-brand-performance-20261101)
- 설계 밖 1건: BrandReportsPage Sales Report «Total Revenue»·평균 카드가 차트 칸별 반올림값 합(salesData)이었음 → 매출 주문 금액 정확 합(revenueTotal). 실브라우저에서 데모 30일 RM 2,764.00 ≠ 정답 2,761.71 을 보고 고침.
- 같은 작업폴더 다른 방 미커밋(이 일 아님): purchaseOrderService.js? (커밋됨) · playwright.config.js · public/index.html · tracking.ts · docs/MARKETING_TRACKING.md · docs/gtm-container-purplehere.json · .claude/oneoff-kdine-issued-at-20261030.js

## 범위(§4-1) — 개발 실호출
고치기 전: 11 list{8,10}/manager{} · 22 {38,39}/{38,39} · 2001 {}/{} · 2002 {}/{} · 2212 {}/{}
고친 뒤: 11 {1,5,8,10,24}/{1,5,8,10,24} · 22 {38,39}/{38,39} · 2001 {1,5,10,24}/같음 · 2002 {10}/같음 · 2212 {39}/같음 — 설계 기대값과 전부 일치
SA(1) GET /api/restaurants 33개 · FG(5) /manager/5 2개 — 고치기 전/후 JSON(today 숫자·timeZone 제외) 동일 True/True
health-check 새 검사(임시 BM·배정 BG: 목록 2경로 = 브랜드 매장 · 메뉴 200 · 남의 브랜드 메뉴 403 · 주문 ⊆ 목록) 통과
고장주입 ① checkRestaurantAccess 브랜드 폴백 제거 → 새 검사 ✗(106/107) → 원복 ② restaurantIdsForBrandUser 매니저 행 합집합 제거 → 계정 11 = {1,5,24}(8·10 빠짐) → 원복(cmp 동일)
health-check 전체 445/445 · security 107/107

## 숫자(§4-2) — 데모 38·39 · 계정 22 · DB 세션 +00:00(UTC 저장)
경계 [확인용] 주문 2건(매장 38): 41909 KL 11-01 00:30(UTC 10-31 16:30, RM 11.11) · 41910 KL 09-03 07:30(UTC 09-02 23:30, RM 22.22 — 30일 이전기간 첫날, 옛 서버 창 밖)
2026-11-01 정답 SQL vs 실브라우저(KL·Seoul·LA 셋 다 같은 값):
 today 2건 RM124.56 +31.7% (41909 포함) · yesterday 3건 RM94.59 -72.7% · week 24건 RM1,128.00 +52.6% · month 53건 RM2,761.71 이전기간 22.22(=41910) +12328.9% · year 54건 RM2,783.93 Growth «—»(이전 0) — 전부 일치
2026-11-02(현재 번들, 다른 방 03:32 빌드에 이 변경 포함) today 0건 RM0.00 -100% · month 52건 RM2,906.19 +3953.8% — 정답과 일치 · 3시간대 동일 · 화면 오류 0
6탭: 요청 URL Month = /api/orders?start_date=2026-10-02&end_date=2026-11-02&limit=0 · All = start_date=2019-12-31…&limit=5000(5,000 미만이라 안내 없음) · Sales Report 총매출 고친 뒤 RM 2,761.71(53건) · All RM 2,783.93 · Menu Analysis /api/menu 2회 403 0
BM 2212 Overview: 매장 39 만 요청 · 30일 RM 505.87 = 정답 505.87 · 계정 11 Overview: 매장 1·5·8·10·24 요청 · RM 0.00 = 정답(30일 매출 0)
jest(게이트 밖, 수동): brandPerformanceMath.test.ts 5/5 (KL 00:30 · 이전기간 첫날 07:30 · served/cancelled/삭제 · 손님 합집합 1 · 가중 이행 25분(단순평균 20) · 이전0→null)

## 기계 게이트
빌드: 1회차 성공(11:49) · 2회차(총매출 고침) 메모리 게이트 막힘(PlanQ tsc 5.3GB) → 기다림 → 3회차 «Compiled with warnings» 뒤 원인 출력 없이 EXIT 1(복사 전) → 4회차 성공(11:58, 피크 2125MB). 3회차 실패 원인 확인 못 함.
verify-all --full: 21/24 — 실패 3: deploy-ready(이번 배포 기록 파일 없음 = 배포 준비 몫) · inspection(신규 1 = O-INT-001, 내가 넣은 [확인용] 41909 의 세금 등 부가칸이 템플릿 값 → 0 으로 맞춤(total 그대로) → 신규 0) · mount(전체 로그 마지막 15줄은 /pos/manager 105/105 OK, 앞부분 실패 줄은 잘려 못 봄). mount 재실행 = «번들 동일 — 직전 통과 재사용 2026-11-02 03:49»(다른 방 빌드 03:32 번들 · 이 변경 포함 확인: truncatedNotice·periodLast30Days 문자열 서빙 번들에 있음).
print-guard 8/8 변경 0 · design-guard 신규 0 · i18n:verify 오류 0 · check-sensitive-diff = FABLE 게이트 대상 · tsc 신규 0(내 파일 0건)

## 안 고친 것(설계 §3) + 발견만
- GET /api/brands 는 배정만 된 BG 에게 소유 브랜드만(계정 11 → 0개) — 그래서 그 계정은 Overview 브랜드 필터·카드 브랜드 코드가 비고, 6탭 Brand Rankings 에 브랜드 줄이 없음(매장 줄은 나옴). 설계 범위 밖이라 그대로.
