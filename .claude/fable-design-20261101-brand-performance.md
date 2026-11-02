# Fable 설계 — 브랜드 Performance 통계 점검 (2026-11-01)

사실 근거: `.claude/fable-facts-20261101-brand-performance.md` (Opus 운영 읽기 실측) + 이 세션에서 직접 읽은 코드(아래 파일:줄).
Irene 원문: «https://purplehere.com/pos/brand/general/performance 모든 퍼포먼스 통계들 맞는지 확인해주고 브랜드나 레스토랑 추가되는거 제대로 적용되는지도 확인해줘.»

## 0. 판정 요약

1. **소유자 BG 가 자기 매장 2곳을 볼 때 숫자는 맞다**(실매장 8·10 today/week/month/year·이전기간 전부 일치). 틀린 것은 «누가 어떤 매장을 보는가» 와 «경계 조건» 이다.
2. **가장 큰 결함 = 매장 범위가 화면마다 다르고, 브랜드 매니저·배정만 된 BG 는 매장 0개.** 주문(`/api/orders`)은 2026-09-08 부터 «소유 ∪ 배정 ∪ 매니저 행» 인데 매장 목록 두 경로는 그 전 규칙(매니저 행만 / 소유만)에 남아 있다. 그래서 «매장이 brand_id 로 추가돼도 Overview 에 안 나오고, 매니저는 아무것도 못 본다» — Irene 의 두 번째 질문(추가 반영)에 대한 답은 **«지금은 제대로 적용 안 됨»** 이다.
3. 6탭은 **최근 5,000건 잘림** — 운영 소유자 23 의 «Year» 는 정답의 28% 만 보인다. 올해 숫자를 믿고 보면 안 되는 상태.
4. 날짜 경계가 **세 겹으로 어긋난다**(서버 UTC 자정 · 화면 브라우저 시간대 · `order_date||createdAt`). 이번 실측에선 실매장 차이 0 이었지만 데모 매장에서 이미 어긋났고(13: 27건 vs 28건), KR 브라우저·자정 근처 주문에서 언제든 터진다. 타임존 규칙(CLAUDE.md) 위반.
5. 작은 계산 결함 4개(Customers 합산 중복 · 이행시간 단순평균 · 이전 0 이면 +100% · 6탭 Ranking 이 `completed` 만 셈) + 라벨 2개(«This Month» 가 실제론 최근 30일).

→ 고친다. 끝난 뒤 **Fable 게이트 필요**(보안 경계 ⑤ + 통계 계산). Irene 에게 **물을 것 없음**(아래 §6).

## 1. 결함 목록 (심각도순 · 근거)

| # | 결함 | 근거 | 겉모습 |
|---|---|---|---|
| D1 | **매장 범위 3갈래** — Overview `GET /api/restaurants` = `restaurant_managers` 행만(`restaurants-crud.js:128-131`) · 6탭 `GET /api/restaurants/manager/:id` = `brands.owner_id` 만(`:424-430`) · 주문 = 매니저 행 ∪ `brandRestaurantIdsForUser`(`orders-crud.js:93-109`). 단일 기준은 `utils/managerBrandScope.js`(메모리 reference_brand_scope_owner_or_assigned · 2026-10-11 C안) | 운영: BM 65(aidan) C=2 → A=0 B=0 · BM 49 C=3 → 0/0 · 배정 BG 11 A=매장 9(브랜드 아님) B=0 · 새 매장은 `managerIds` 를 실어야만 Overview 에 나옴(`:1300-1310`) |
| D2 | **상세 게이트도 옛 규칙** — `userCanAccessRestaurant`(auth.js:504-520) BG 는 소유 브랜드만·BM 은 매니저 행만 · `checkRestaurantAccess`(auth.js:305-325, 103개 라우트, `/api/menu` 포함) 는 브랜드 폴백이 아예 없음 | 목록을 넓히면 «목록엔 보이는데 상세 403» 재발(2026-07-25 교훈) · 6탭 Menu Analysis 가 `/api/menu?restaurantId=` 403 을 조용히 삼킴(`BrandReportsPage.tsx:540 if(!ok) continue`) → 카테고리 전부 «Other» |
| D3 | **6탭 5,000건 잘림** — `/api/orders?limit=5000` 날짜 없이 최신순, 화면에서 기간 거름(`:495, 628-646`) | 운영 23: Year 정답 17,419건 RM 447,144.89 → 화면 4,742건 RM 124,718.46 |
| D4 | **날짜 경계 3겹** — ①서버 `new Date('YYYY-MM-DD')`=UTC 자정(`orders-crud.js:137-143`, 🔒) → 이전기간 첫날 MY 00:00-08:00 이 fetch 밖 ②화면 `setHours` = 브라우저 시간대(`BrandPerformance.tsx:603-611`, `BrandReportsPage.tsx:631-634, 923-926`) ③`order_date \|\| createdAt`(서버는 createdAt 으로 가져옴) ④6탭 시간대별 `getHours()` 브라우저(`:664, 765, 835, 899`) ⑤drilldown 일 키 `toISOString()`=UTC 날짜인데 월 키는 로컬(`:866`) ⑥6탭 초기 기간 `calculatePeriodDateRange('month')` 시간대 없음(`:368, 1057`) | 데모 13 month 27건 2002.14 vs 화면 28건 2132.64 · 이전기간 130.50 vs 0 · 14 today 1건 vs 2건 |
| D5 | **6탭 Sales Ranking 이 `status === 'completed'` 만**(`:931`) — served 빠지고 삭제 포함 | 같은 화면의 다른 탭(isRevenueOrder)과 숫자 불일치 |
| D6 | Overview **Customers 총계 = 매장별 고유 수의 합**(`:743`) · 취소 주문 손님도 셈(`:676-680`) | 두 매장 다닌 손님 2명으로 |
| D7 | Overview **Avg Fulfillment 총계 = 매장 평균의 단순 평균**(`:751-754`) | 주문 3건 매장과 300건 매장이 같은 무게 |
| D8 | **이전기간 0 → Growth +100%**(`:660-662, 757-759`) | 정의되지 않은 값을 숫자로 표시 |
| D9 | 라벨 — 'month'=최근 30일인데 «This Month», 'week'=최근 7일인데 «This Week»(`:777`) · 매장 카드 `branch_name` 이 데이터에 없어 항상 안 보임(`:962, 1012` vs `RestaurantPerformanceData`) | |

확인했으나 **결함 아님**: 매출 정의(`isRevenueOrder` = completed/served·삭제 제외)는 Overview·6탭 revenue 패널·서버가 같다 · 금액은 `total_amount` 하나(Order 모델에 `final_price`/`total_price` 없음 → 6탭의 `final_price||total_amount||total_price` 는 사실상 total_amount).

## 2. 고칠 것 — 파일·범위

### 2-1 서버: 매장 범위를 단일 소스 하나로 (D1·D2)

**규칙(한 줄):** BG/BM 의 «내 매장» = `brandRestaurantIdsForUser(user)`(소유 ∪ 배정 · BM 은 `managerBrandIds`) **∪ `restaurant_managers` 행(manager_id = 나)**. 이것이 이미 `/api/orders` 가 쓰는 답이다(🔒 파일이라 그쪽은 못 고치므로, **새 함수가 그쪽과 같다**를 검증으로 증명한다).

1. `dev-backend/utils/managerBrandScope.js` — 함수 1개 추가
   ```js
   /** BG/BM 이 보는 매장 id — 브랜드 매장 ∪ restaurant_managers 행. 🔒 orders-crud.js GET / 와 같은 답이어야 한다. */
   async function restaurantIdsForBrandUser(user) { … brandRestaurantIdsForUser(user) ∪ RestaurantManager(manager_id=user.id) … }
   ```
   export 에 추가. 형제 브랜드는 여전히 넣지 않는다(기존 ⛔ 그대로).
2. `dev-backend/routes/restaurants-crud.js`
   - `GET /` BG/BM 분기(`:128-131`): `managersInclude.where/required` 제거 → `whereClause.id = { [Op.in]: ids.length ? ids : [0] }`. (`search` 가 `whereClause[Op.or]` 를 쓰므로 Op.or 에 넣지 말 것 — `id` 키로.) FG·RA·Owner·SA 분기 무접촉.
   - `GET /manager/:managerId` BG/BM 분기(`:422-430`): `Brand.findAll(owner_id)` 대신 `restaurantIdsForBrandUser(targetUser)` → `Restaurant.findAll({ where: { id: ids } })`. FG 분기·Owner 분기 무접촉. (`FoodcourtReportsPage`·`ManagerSubscriptionsPage`·SA `AdminManagementPage` 가 같이 쓰는 라우트 — FG/SA 응답은 바이트 단위로 같아야 함.)
   - `GET /` 변환 응답에 `timeZone: restaurantData.operation_settings?.timeZone || null` 1필드 추가(화면 날짜 경계용 · 비밀 아님).
3. `dev-backend/middleware/auth.js` — 브랜드 폴백을 두 게이트에 **같은 식**으로
   - `userCanAccessRestaurant`(`:516-519`): `user.role === 'Brand General' && owner_id` 판정 → **BG/BM 공통** `brandIds.includes(Number(restaurant.brand_id))`, `brandIds = Array.isArray(user.managed_brand_ids) ? user.managed_brand_ids : await brandIdsForUser(user)`(authenticateToken 이 이미 채움 `auth.js:123` · 같은 패턴 `badgeCounts.js:342`).
   - `checkRestaurantAccess`(`:320-323`): 매니저 행·admin_id 가 아니면 403 하기 전에 위와 **같은 브랜드 폴백** 추가. 푸드코트 폴백은 건드리지 않는다(지목된 것만).
   - 소유자 BG 는 결과 불변(소유 ⊂ brandIdsForUser). **넓어지는 것 = 배정 BG · BM 이 자기 브랜드 매장의 상세 라우트에 닿음** — 2026-10-11 Fable 판정(매니저=회사 직원 · 돈 경계만 소유자)의 연장이고, 주문은 이미 같은 범위다. 돈 경계(결제설정·은행·구독·브랜드 수정·매니저 관리)는 이 두 게이트를 쓰지 않으므로 그대로.

### 2-2 화면 공통: 날짜·시각은 «그 주문 매장의 시간대» 로, 근거는 `createdAt` 하나 (D4)

4. 새 파일 `dev-frontend/src/utils/orderLocalTime.ts` (순수 함수, 의존 0)
   - `localDateKey(iso, tz) → 'YYYY-MM-DD'` · `localHour(iso, tz) → 0..23` (`Intl.DateTimeFormat(…, { timeZone })` parts · `hour12:false` 의 «24» 는 0 으로 정규화)
   - `shiftDateKey('YYYY-MM-DD', ±n)` (UTC 산술로 달력일만 이동)
   - `restaurantTimeZone(r) = r.timeZone || r.operation_settings?.timeZone || 'Asia/Kuala_Lumpur'` (StoreContext 기본값·Brand 모델 기본값과 같은 폴백)
   - **기간 판정 = 문자열 비교** `start <= localDateKey(o.createdAt, tz) <= end`. `setHours`·`new Date(dateRange.start)` 경계 산술을 전부 없앤다. `order_date` 는 쓰지 않는다(서버 fetch·서버 매출 집계가 전부 createdAt).
   - «오늘» 의 기준 시간대(`calculatePeriodDateRange(period, tz)`) = 목록 첫 매장의 시간대(없으면 KL). 매장이 여러 시간대면 주문별 경계는 각자 매장, «오늘» 의 날짜만 첫 매장 — 문서에 한 줄 남긴다.
5. **서버 fetch 창은 넉넉하게, 자르기는 화면에서** — `start_date = shiftDateKey(이전기간 시작, -1)`, `end_date = shiftDateKey(끝, +1)`. 서버가 UTC 자정으로 잘라도 어떤 시간대(±14h)든 초과집합이 된다. 🔒 `orders-crud.js` 무접촉으로 D4-① 을 막는 유일한 길.

### 2-3 Overview `BrandPerformance.tsx` (D4·D6·D7·D8·D9)

6. 매장 매핑에 `branch_name`·`timeZone` 추가(`:433-445`), `RestaurantPerformanceData` 에 `branch_name` 추가 → 카드·랭킹 표시가 살아남.
7. 주문 fetch(`:471-476`): §2-2-5 창. 응답 처리 그대로.
8. 계산 분리: 순수 함수 파일 `dev-frontend/src/utils/brandPerformanceMath.ts` 로 «매장별 지표 → 총계» 를 옮긴다(입력: 매장 목록·주문·기간·이전기간 / 출력: 지금 `RestaurantPerformanceData[]` + `stats`). 화면은 호출만. 바뀌는 수식:
   - 기간 판정: §2-2-4 (`createdAt` + 매장 tz).
   - **Customers**: 매장별 = 그 매장 **매출 주문**(`isRevenueOrder`) 의 고유 `customer_id` 수 · **총계 = 선택된 매장들 매출 주문의 고유 `customer_id` 합집합**(합산 금지). Orders 카드가 «완료 주문 수» 이므로 Customers 도 같은 집합 — 취소만 한 손님은 손님이 아니다.
   - **Avg Fulfillment 총계** = Σ(매장별 served 분 합) ÷ Σ(served 건수). 매장별 데이터에 `servedCount`·`servedMinutesSum` 을 실어 둔다.
   - **Growth**: 이전기간 매출 0 → `growth = null` → 배지 숨김·랭킹 «—»·CSV 빈칸·정렬은 최하위. 이전 >0 일 때만 %.
   - 나머지(매출·주문수·평균·최대)는 식 불변 — 검산으로 «바뀐 것 없음» 을 증명.
9. 라벨(`:775-777`): today «Today» · yesterday «Yesterday» · week «Last 7 days» · month «Last 30 days» · year «Last 365 days» · all «All time». i18n 키(`brand.json` 4개 언어) — 기간 의미(DatePeriodFilter 공용)는 바꾸지 않는다, 이름만 사실대로.

### 2-4 6탭 `BrandReportsPage.tsx` (D1·D3·D4·D5)

10. 매장 목록: BG/BM 도 `GET /api/restaurants` 로(Overview 와 **같은 목록·같은 응답**, `timeZone`·`brand`·`branch_name` 포함). `/manager/:id` 분기 삭제(`:432-435`). (서버 `/manager/:id` 는 §2-1-2 대로 같이 고쳐 다른 화면도 맞춘다.)
11. 주문 fetch(`:495-500`): `dateRange` 에 종속되게(effect deps 에 `dateRange.start/end` 추가) · URL = `/api/orders?start_date=…&end_date=…`(§2-2-5 창) · **limit 정책**: 기간 ≤ 366일 → `limit=0`(Overview 가 이미 Year 에서 730일을 limit=0 으로 받는 것이 운영에서 도는 중) / 그보다 길면(All·긴 사용자 기간) `limit=5000` 유지 + 응답이 5,000건이면 **화면에 잘림 안내** «Showing the most recent 5,000 orders (from YYYY-MM-DD). Narrow the period for complete figures.» — 숨기지 않는다. (서버 집계 라우트로 바꾸는 것은 이 일의 범위 밖 — §3.)
12. 초기 기간·기간 변경(`:368, 1057`): `calculatePeriodDateRange(period, reportTz)`.
13. 기간 거르기(`filteredOrders :628-646`, `rankingData :923-933`) → §2-2-4. `rankingData` 의 `status === 'completed'` → `isRevenueOrder`(D5).
14. 시간대별 버킷 4곳(`:664, 765, 835, 899`) → `localHour(o.createdAt, tz)` · drilldown 일/월/연 키(`:862-866`) → `localDateKey` 에서 잘라 쓴다(UTC `toISOString` 제거).
15. `getOrderAmount` 는 `total_amount` 로 단순화(모델에 다른 필드 없음) — 선택, 식은 동일.

### 2-5 검사 장치

16. `dev-backend/scripts/health-check.js` `security` 에 테스트 1건 추가(기존 668행 «브랜드 매니저 범위» 옆, 같은 계정 패턴):
    «브랜드 매장 범위 — 목록 2경로 = 브랜드 매장 ∪ 매니저 행 · 목록 ⊆ 상세 · 남의 브랜드 매장 403» (§4-1 의 기대값을 코드로).
17. `dev-frontend/src/utils/__tests__/brandPerformanceMath.test.ts` + `orderLocalTime.test.ts` — 화면 jest 는 게이트 밖(메모리)이므로 **수동 실행 숫자를 보고에 적는다**. 사례 ≤ 10: KL 00:30 주문이 그날에 들어감(UTC 로는 전날) · 이전기간 첫날 07:30 KL 이 이전기간에 들어감 · served 포함·cancelled 제외·is_deleted 제외 · 취소만 한 손님 제외 · 두 매장 같은 손님 총계 1 · 가중 이행시간 · 이전 0 → null · «24» 시 정규화.

## 3. 안 고칠 것 (이유)

- 🔒 `routes/orders-crud.js` 전부 — UTC 자정 경계(`:137-143`)·허용 밖 `restaurant_id` 를 거부 대신 전체로 넓히는 동작(`:121-125`). 인쇄 보호 파일(print-guard 지문). 경계는 §2-2-5 초과집합 fetch 로 우회 없이 덮인다. 넓힘 동작은 6탭이 목록에서 고른 id 만 보내므로 이 화면에선 안 밟는다. 기록만.
- `routes/manager-sales.js resolveManagerRestaurants` — 브랜드 매장만(매니저 행 없음). 다른 화면(브랜드 자신의 `/reports`)의 범위라 이 일에서 건드리지 않는다. 차이 1건으로 기록.
- `restaurants-crud.js` 두 라우트의 `todaySales` 서버 로컬 자정 계산 — Performance 두 화면은 이 값을 안 쓴다. 타임존 규칙 위반이긴 하나 지목된 것만.
- `DatePeriodFilter` 의 기간 의미(week=7일·month=30일·year=365일) — 공용 컴포넌트, 다른 화면이 같이 쓴다. 라벨만 사실대로.
- `BM_BRAND_FIELDS` 안전 투영 — 손대지 않는다(매장 tz 는 매장 응답에서 받으므로 브랜드 tz 불필요).
- 푸드코트 역할 게이트 폴백·FG 화면 — 범위 밖.
- 6탭을 서버 집계 라우트로 옮기는 재설계 — 5,000건 정책 + 잘림 안내로 정직하게 두고, 필요해지면 별도 설계.

## 4. 검증으로 증명할 것 (Opus 실행 → Fable 판정)

### 4-1 범위 (개발 DB 실데이터 기준 — 이 세션에서 읽음)
개발 계정·기대 목록(브랜드 매장 ∪ 매니저 행):
| 계정 | 역할 | 범위 | 기대 매장 id | 지금 |
|---|---|---|---|---|
| 2212 test-brand-manager@example.com | BM 홈 10 | 브랜드 10 → 39 | **{39}** | GET / = {} · manager = {} |
| 22 demo-brand@purplehere.com | BG 소유 10·17 | 38·39 (+매니저 행 38·39) | {38,39} | {38,39} 불변 |
| 11 irene@gitconsulting.group | BG 배정 1(소유 0) | 브랜드 1 → 1·5·24 ∪ 행 8·10 | **{1,5,8,10,24}** | GET / = {8,10} · manager = {} |
| 2001 check_bm_all | BM 홈 1 · 전체 | 회사(owner 6)=1·2·4 → 1·5·24·10 | {1,5,10,24} | {} |
| 2002 check_bm_part | BM 홈 2 · 고른 2,4 | 4 → 10 | {10} | {} |
- 두 경로(`GET /api/restaurants` · `GET /api/restaurants/manager/:id`) 결과 id 집합이 위와 같고 서로 같다.
- **목록 ⊆ 상세**: 목록의 매장마다 `GET /api/restaurants/:id` 200 · `GET /api/menu?restaurantId=` 200 · 그 매장 주문 1건 `GET /api/orders/:id` 200 (2212→39 · 11→24 · 2001→24).
- **남의 브랜드는 닫힘**: 2212 → 매장 38 상세·메뉴·주문 403 · 2002 → 매장 24(브랜드 1, 안 고름) 403 · 기존 Supplier/RA 음성 테스트 그대로 통과.
- 주문 범위와 같음: 각 계정의 `GET /api/orders?limit=0` 에 나오는 `restaurant_id` 집합 ⊆ 목록 집합(목록이 주문 범위를 덮는다).
- SA·FG 응답 불변: FG 계정의 `/manager/:id` 와 SA 의 `GET /api/restaurants` 를 고치기 전/후 JSON 으로 비교(diff 0).
- 고장주입 2회(각 1회·원복): ①`checkRestaurantAccess` 브랜드 폴백 제거 → 메뉴 200 기대가 실패 ②`restaurantIdsForBrandUser` 의 매니저 행 합집합 제거 → 계정 11 기대 {1,5,8,10,24} 가 실패.

### 4-2 숫자 (데모 매장 38·39 · 개발 DB)
- 정답 SQL: `status IN ('completed','served') AND (is_deleted=0 OR is_deleted IS NULL)`, `createdAt` 을 KL 로 바꾼 날짜가 기간 안 — **DB 세션 시간대와 Sequelize `timezone` 설정을 먼저 확인해 적는다**(createdAt 이 UTC 로 저장되는지).
- 비교: 계정 22 로 Overview today/yesterday/week/month/year 와 6탭 같은 기간의 Total Revenue·Orders·Customers·Avg Fulfillment 가 SQL 과 일치(화면 값은 Playwright 로 DOM 에서 읽거나 API 응답에 §2-3-8 순수 함수를 적용 — 둘 중 하나는 실브라우저).
- **경계 주문 2건**(데모 38, 손님 이름에 `[확인용]`, 생성 뒤 SQL 로 `createdAt` 조정 — 개발 DB·데모만): ① KL 오늘 00:30(=UTC 어제 16:30) → Today 에 들어가고 Yesterday 엔 없음 ② KL 이전 30일 창 첫날 07:30(=UTC 전날 23:30) → Growth 의 이전기간에 들어감(고치기 전엔 서버 창 밖이라 빠지던 건). 지우지 않는다(7일 뒤 자동 정리).
- **브라우저 시간대 무관**: Playwright `timezoneId` = `Asia/Kuala_Lumpur` · `Asia/Seoul` · `America/Los_Angeles` 세 번 — Overview·6탭 Month 의 Total Revenue/Orders 텍스트가 셋 다 같다.
- D5: 6탭 Sales Ranking 매장 합계 = 같은 기간 Sales Report 총매출(served 포함 뒤 일치).
- D6·D7·D8: jest 사례(§2-5-17) 숫자 + 화면에서 이전기간 0 인 매장(39 는 10-18 시작 → «year» 아닌 적당한 사용자 기간) 배지 «—».
- D3: 네트워크 캡처로 6탭 요청 URL 에 `start_date/end_date` 와 `limit=0`(Month) · `limit=5000`(All) 확인 · All 에서 5,000 미만이면 안내 없음(개발 DB 는 5,000 미만 — 잘림 안내는 jest 로 조건만).

### 4-3 기계 게이트
- `check-print-guard.js` 변경 0(orders-crud 무접촉) · `check-sensitive-diff.js` → auth.js 로 **FABLE 대상 ⑤** 가 뜨는 것이 정상 · `check-design-guard` · `npm run i18n:verify`(라벨 키 4언어).
- 프론트 변경 전부 확정 → **빌드 1회** → `verify-all --full` 1회(mount: `/pos/brand/general/performance`, `/performance/stores?tab=…` 6탭, `/pos/manager/restaurants`, BG 대시보드·인보이스 — `GET /api/restaurants` 를 같이 쓰는 BG 화면이 매장이 늘어난 채 크래시 0). SW 버전은 마지막에.
- 연관 화면 영향(눈으로 1회): BG 22 의 `/pos/manager/restaurants`·`BrandInvoicesPage`·`BrandManagerDashboard` — 목록이 «브랜드 매장 ∪ 매니저 행» 으로 보이는지(22 는 불변이어야 함 · 11 은 5개로 늘어나야 함).

## 5. Fable 게이트
**필요.** ⑤ 보안 경계(`middleware/auth.js` 두 게이트 + 목록 범위 2라우트) + 통계 계산 변경(§2-3-8). 게이트 때 볼 것: diff 가 §2 범위 안인지(FG·RA·Owner·SA 분기 바이트 불변) · §4-1 반증 2회 결과 · §4-2 숫자 · 빌드/sweep/SW.

## 6. Irene 에게 물을 것
**없음(차단 질문 0).** 보고에 사실로 한 줄만: «브랜드 매니저·배정만 된 브랜드 총괄이 자기 브랜드 매장 전체를 보게 됨(2026-10-11 «매니저 = 회사 직원» 설계의 연장 · 주문은 이미 그 범위 · 돈 경계는 그대로)». Irene 가 매니저를 더 좁게 두고 싶으면 그때 별도 결정.

## 7. 구현 순서 (빌드 1회)
① 서버 §2-1(헬퍼 → 라우트 2 → 게이트 2) → `pm2 restart dev-backend` → health-check 새 테스트 + 고장주입 2회 ② 화면 유틸 2개 + jest ③ Overview ④ 6탭 ⑤ i18n 4언어 ⑥ 빌드 1회 → 경계 주문 2건 → Playwright 3시간대 → verify-all --full ⑦ SW bump ⑧ Fable 게이트 요청(이 문서 + 숫자).
