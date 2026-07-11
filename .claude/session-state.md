# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-07-11 (리포트·구독 정확성 대청소 — **v3.68 운영 배포 완료**)
**버전:** **v3.68 운영 배포됨** (Backup 20260711_170702 · Smoke 9/9 · 안전게이트 9/9 · deploy-manifest 1755파일).
**작업 상태:** 완료 — 배포까지 끝, 지시 대기.
> ⚠ 배포 전 검증: 주문 생애주기 14/14(주문·인쇄 파이프라인·claim 1/5·+Round·단계이동·결제·매출반영·삭제제외) · verify-all 13/13 · 인쇄 계약 8/8 · 인쇄 라우트 34/34.
> ⚠ 이 배포분은 check-sensitive-diff 기준 **Fable 게이트 대상**(돈·인쇄 보호파일 접촉)이었으나 **Irene 지시로 배포 진행**. 사후 Fable 점검 권장(아래 블록 유지).

### 진행 중인 작업
- 없음. (v3.68 배포 완료 — 새 지시 대기)

---

## ★ Fable 검증 대상 (배포 전 필수 — 2026-07-11분)

**판정: 기계 판정으로 확정.** `cd /var/www/dev-backend && node scripts/check-sensitive-diff.js`
→ **② 💰 돈·주문 무결성 접촉 1건** (`dev-backend/routes/subscriptions.js`) + ⚠ 안전망 자체 1건 (`scripts/health-check.js`) + 일반 15건.
CLAUDE.md "Fable 검증 게이트" 기준 ②(돈·주문 무결성) 해당 → **Opus 단독 배포 금지, Fable 점검 후 Irene `/배포`.**

**⚠ 추가: 인쇄 보호파일 `dev-backend/routes/orders-crud.js` 변경 + `--bless` 완료(Irene 승인, 2026-07-11).**
사유 = 주문 목록 **조회 권한 스코프**만 수정(푸드코트 총괄이 주문 0건이던 버그). 인쇄 로직 무접촉 — diff 에 print/kitchen/pending/station 라인 **0줄**, 인쇄 계약 **8/8 통과**. Fable 은 이 diff 가 인쇄 경로에 닿지 않음을 재확인할 것.

### 왜 돈 경로인가 (핵심 변경 4개)
1. `buildRestaurantSubscription(restaurant, currency, **viewer**)` — "결제자에게 문의" 차단을 **보는 사람이 결제 주체(BG/FG 오너·SysAdmin)면 해제**. 연체·정지 차단은 유지. 셀프서비스(RA) 경로는 viewer 미전달 = 무변경. → **누가 플랜을 바꿀 수 있는가**의 권한 경계.
2. `getNextBillingDate()` — lapsed/누락 `subscription_end` 를 그대로 쓰던 것 → **항상 미래 날짜**. → 예약 적용일 + **업그레이드 인보이스 due_date**(과거면 발행 즉시 연체). 운영 8매장(null 7 + past 1) 영향.
3. `DELETE /change-plan` 매니저 모드 신설(쿼리 파라미터, `managerCanManageRestaurant` IDOR 가드 재사용).
4. `manager-sales.js` 매출 쿼리 `is_deleted` 제외 — 소프트삭제 주문이 매출로 잡히던 것.
   (+ `restaurants-subscription.js` 가격을 PlanTemplate/PlanPrice 로, `restaurants-crud.js` PUT status=suspended/cancelled 시 pending 정리)

### Fable 이 대조할 것
- **①diff 범위**: 설계 외 변경 0 인지. 수정 파일 = 백엔드 `routes/{subscriptions,manager-sales,restaurants-subscription,restaurants-crud}.js` · `scripts/health-check.js` / 프론트 `pages/Manager/{ManagerDashboard,ManagerSubscriptionsPage}.tsx` · `pages/Admin/RestaurantSubscriptionsPage.tsx` · `contexts/AuthContext.tsx` · `App.tsx`(import 1줄) · `e2e/auth-roles.spec.js` · locales/admin.json ×4 / **삭제**: `pages/Manager/SubscriptionsPage.tsx`(목업).
- **②가드**: verify-all `--full` **13/13 통과**(print-guard 8/8 무접촉·디자인·타임존·IDOR·마이그·인스펙션·i18n·인쇄 라우트 가드·mount sweep 5역할 크래시0) 재확인.
- **③실호출·회귀**: health-check `pos` **16/16**(신규 계약 3: 매출=삭제주문 제외 / 다운그레이드=미래 예약+취소 / 플랜가격=서버 PlanTemplate) · Admin 흐름 10/10 · 매니저 흐름 10/10 · 셀프서비스 무회귀 5/5 · e2e auth-roles 7/7 flaky-0.
- **④배포 안전성**: **마이그레이션 0건**(스키마 변경 없음) · 롤백 = 코드 되돌리기만 · SW bump 불필요(런타임 UI 변경 있으나 버전 미상승 판단은 Fable 확인).
- **⑤적대적 관점 제안**: (a) viewer 완화가 **RA 셀프서비스에 새 구멍을 안 만드는지**(대납 매장 RA 는 여전히 차단됨을 실호출로 확인함) (b) `getNextBillingDate` 변경이 **정상 매장(미래 subscription_end)에 무변경**인지(루프 미실행) (c) 프로레이션 인보이스가 이중 발행되지 않는지 (d) `payment_model` 전환 시 미결제 인보이스 payer 재지정 실패 경로.

### 배경 사실 (Fable 판단 재료)
- 운영 `subscriptions` 테이블 **0행** = Stripe/PayPal **정기구독 쓰는 테넌트 없음** → 플랜 변경이 게이트웨이를 안 부르는 건 정상(청구=인보이스 기반). 메모리 [[reference_billing_invoice_not_gateway_subscription]].
- 하드코딩 가격표(29/99/199)는 **실제 값(49/99/179)과 전부 달랐음** — 가짜 가격으로 청구되던 경로 제거. 메모리 [[reference_subscription_plan_change_paths]].

---

### 완료 (#24 잔여 3건 — 2026-07-11 후속)
- **Admin 구독페이지 실배선** (`Admin/RestaurantSubscriptionsPage.tsx`) — 목록 `setSubscriptions([])` 목업 → `GET /api/restaurants` 실데이터(33매장). 플랜변경=하드코딩 가격표 삭제 → `plan-options`(PlanTemplate/PlanPrice) + `POST /change-plan`(프로레이션·한도·인보이스 서버 처리). 정지/재활성/**해지**=`PUT /restaurants/:id {status}` 실반영. 청구주체 전환=+`invoices/update-payer`. **가짜 성공 토스트 제거**(모달 닫기+리프레시). **가짜 "Add Restaurant" 흐름 삭제**(로컬 배열에만 추가하고 DB 저장 0 — 매장 생성은 Admin 매장 페이지 담당, 버튼은 그쪽으로 이동).
- **구독추가 API 가격 실연동** (`POST /restaurants/subscriptions`) — 하드코딩 29/99/199 → PlanTemplate+PlanPrice(통화별). billingCycle 반영(기간 +1y/+1mo), paymentModel 저장, 플랜 한도(order/menu/staff) 적용. **실제 가격은 49/99/179 였음** — 하드코딩 표가 전부 틀렸다는 실증.
- **레거시 목록 라우트 가격표 제거** (`GET /restaurants/subscriptions/manager/:id`) — 정가 하드코딩 → `plan_amount`(실청구액·할인반영)+`order_limit` 컬럼.
- **해지 = 상태 전이로 완결** — 엔드포인트 부재가 아니라 UI 부재였음(`cancelled` 는 이미 유효 상태, 인보이스 생성은 `status='active'` 만 대상 → 해지 시 청구 중단). 정지/해지 시 **예약된 플랜변경 자동 정리**(restaurants-crud PUT, 스케줄러와 동일 규칙 — 안 하면 정지 후 복귀 시 다운그레이드가 되살아남).
- 검증: Admin 흐름 실호출 **10/10**(목록·플랜변경 금액=서버가격·정지·예약정리·재활성·해지·청구주체·익명401) · health-check pos **16/16** · 실브라우저 mount(크래시0·실매장 렌더·해지 액션·가짜모달 제거).

### 완료 (매니저 플랜 페이지 = 틀린 가격 표시 — 2026-07-11 후속)
- **🔴 `/pos/manager/plans`(라이브)가 하드코딩 가격표를 보여주고 있었다** — basic 29 / professional 99 / enterprise 199. **실제 청구가는 MYR 49 / 99 / 179** → 매니저가 **틀린 가격을 보고 업그레이드를 결정**. 비교표 한도(1,000/10,000)도 DB(1000/5000)와 달랐고, 플랜 선택 버튼은 'Coming Soon' 스텁.
- 수정: `/api/plans`(PlanTemplate + 통화별 PlanPrice) 단일 소스 · 비교표 = 서버 한도(주문/직원/메뉴) · 선택 버튼 → 매장별 구독 화면(`/pos/manager/subscriptions`, 서버가 프로레이션·한도·인보이스 처리).
- **통화 코드 불일치도 근본**: 앱 통화는 기호(`RM`), 서버 `currency_prices` 키는 ISO(`MYR`) → 조회 실패 후 기본가(29/59/99)로 폴백. 공용 유틸 `normalizeCurrencyCode`/`getPlanPrice` 사용으로 통일.
- **새 mount 커버리지가 내 실수를 즉시 검출**: 하드코딩 제거 중 헬퍼 3개(comparisonFeatures/handleSelectPlan/renderFeatureFlag)를 같이 지워 ErrorBoundary → `/pos/manager/*` sweep(오늘 추가)이 잡음. 커버리지 확장의 값 실증.
- **회귀 박제 = E2E** (`e2e/plans-pricing.spec.js`): 백엔드끼리 대조로는 못 잡는다(두 API 가 같은 DB 를 읽어 항상 일치) → **브라우저에 렌더된 숫자 = 서버 가격**을 직접 검증. 하드코딩 주입 시 실패·복원 시 통과 실증. + health-check `pos` 17/17(플랜목록↔구독변경 가격 일치 대조 추가).

### 완료 (죽은 관리자 페이지 6개 제거 + 끊긴 링크 4개 교정 — 2026-07-11 후속)
> Irene 선택: "미배선 관리자 페이지 5개". 실측 결과 **전부 백엔드 호출 0건 + `setState([])` 껍데기**였고, 기능은 이미 다른 페이지에 존재 → 실배선이 아니라 **정직한 제거**가 정답.
- 삭제: `Admin/SystemConfigPage`(사이드바 노출·항상 빈 목록. **범용 key/value 편집기라 `payment_settings` JSON 통째 덮어쓸 위험** — 설정 wipe 사고 이력 영역. 실기능=Site Settings+Payment Settings) · `Admin/SecurityPage`(=Logs+History) · `Admin/BackupRestorePage`(백업은 서버 cron 4am, API 없음) · `FoodcourtGeneral/FoodcourtManagement`(fetch 0건. 실기능=Tenancy 계약+Branches) · `Foodcourt/TenantSupport`(=System/Operation Inquiry) · `InvoiceSettings/InvoiceSettingsPage`(라우트 없음=완전 사장).
- **끊긴 링크 4개 교정**(죽은 페이지로 보내던 것 → 실제 입점(계약) 관리 `/pos/foodcourt/tenancy`): ①FC 온보딩 "Add Tenant Restaurants"(useSetupStatus) ②RentManagement 빈상태 "Manage Tenants" ③FC 대시보드 알림 링크 ④FC 대시보드 빠른실행 카드. **안내를 따라가면 빈 화면에 도착하던 흐름**이었다.
- 배선 정리: App.tsx 라우트·lazy import 6개, MainLayout 사이드바(System Config), ProtectedRoute 허용목록(tenant-support), roles-sweep 라우트, 죽은 i18n 키 **492개(4언어×3ns)**. 잔존 참조 0.

### 완료 (리포트 가짜지표 3종 + 그 밑의 진짜 원인 — 2026-07-11 후속)
> 가짜 지표를 걷어내니 **왜 가짜였는지**가 나왔다: 데이터가 실제로 0건이라 난수로 채워놨던 것.
- **Owner·Foodcourt 리포트 운영지표 `Math.random()` 제거** — 이행률/대기시간/직원효율이 렌더마다 다시 굴렀고 피크시간은 `12-1 PM` 하드코딩. BrandReportsPage 의 `operationsStats`(실주문 기반)로 3역할 통일. 실소스 없는 "직원 효율"은 **총 주문수**로 교체(가짜→가짜 금지).
- **🔴 근본: 푸드코트 총괄은 `/api/orders` 주문이 0건이었다** (`orders-crud.js` GET `/`) — 매장 소유를 `RestaurantManager` 링크로만 판정. 푸드코트 총괄은 `foodcourt_id`, 브랜드 총괄은 `brand_id` 로 매장을 갖는데 그 경로가 없었다 → **푸드코트 리포트 전체가 항상 빈 데이터**(그래서 난수). manager-sales.js `resolveManagerRestaurants` 와 동일 규칙(링크 ∪ 브랜드소유 ∪ 푸드코트소속)으로 통일. FC 0→446건, BG 791→869(자기 브랜드 매장), **IDOR: 타 푸드코트 매장 노출 0건**.
- **🔴 리포트 필터가 `served` 를 제외하고 있었다** (Owner·Foodcourt·Brand 3곳) — `served` 는 완료 상태인데 데이터셋에서 빼놓고 이행률은 `completed||served` 로 계산 → 항상 0%. 백엔드 매출 정의(completed+served)에 맞추고 **삭제(is_deleted) 주문도 제외**(오늘 백엔드에서 고친 것과 동형).
- **⚠ 인쇄 보호파일 `orders-crud.js` 접촉 — Irene 승인 후 `--bless`**(2026-07-11). 인쇄 로직 무접촉(diff 에 print/kitchen/pending/station 0줄), **인쇄 계약 8/8 통과**(티켓1번·+Round·claim경쟁·금액공식·무결성).
- 회귀 박제: health-check `pos` **17/17** — "주문 스코프: 푸드코트 총괄이 자기 주문을 본다 + 남의 것은 못 본다"(누락0·유출0 양방향). 푸드코트 경로를 지우면 **정확히 이 1건만 실패** 실증.
- 결과: 푸드코트 운영탭 실값(이행률 7% · 피크 1-2PM · 총주문 15) · 재로드 동일(난수 아님) · 크래시 0.

### 완료 (mount 커버리지 갭 해소 — 가짜매출이 오래 산 구조적 이유)
> **왜 아무 게이트도 `Math.random()` 매출을 못 잡았나 = `/pos/manager/*` 가 어떤 sweep 에도 없었다.** roles-sweep 에 admin/bm/fcm 항목은 있었지만 demo-login 화이트리스트에 그 역할이 없어 **토큰 미공급 → graceful skip**(=사실상 미검사). 결함 수정에 그치지 않고 **결함이 숨을 수 있었던 구멍**을 닫음.
- `verify-all.js` — `signRoleToken(role)` 추가: demo 계정 없는 역할(System Admin / Brand Manager / Foodcourt Manager)은 **DB 실계정으로 JWT 직접 서명**(비밀번호 불필요·계정 무변경, 없으면 null→해당 역할만 skip). mount 게이트에 ADMIN/BM/FCM/BG 토큰 공급.
- `headless-roles-sweep.js` — **`manager` 항목 신설**(`/pos/manager/*` 실존 12루트, BG 토큰). App.tsx 라우트와 대조해 유령 경로 배제(없는 경로는 빈 렌더를 OK 로 오판).
- 결과: mount 커버 **5역할 → 8역할**(RA·BG + FG·Owner·Supplier + **System Admin·Brand Manager·Foodcourt Manager** + `/pos/manager/*`). 확장분 단독 실행 **52/52 크래시 0**.
- 문서 정정: `docs/AGENT_ONBOARDING.md` mount 행 + session-state 후속후보에서 "admin/manager 커버 갭" 제거.

### 완료 (세션 복원력 — Irene "그것도 고쳐줘")
- **AuthContext 가 `/api/auth/me` fetch 1회 실패에 토큰을 즉시 폐기 → 로그아웃하던 것 수정.** 콜드 부팅(서비스워커 첫 설치·매장 wifi 순단)에서 fetch 가 `TypeError` 로 throw 되면 catch 가 `clearAuthToken()` → 멀쩡한 사용자가 로그인 화면으로 튕겼다(2026-07-10 mount sweep "전이적 flake" 와 동일 뿌리).
- 수정: 네트워크 오류는 **3회 재시도(400/800ms 백오프)**, 그래도 실패하면 **토큰 유지**(다음 로드에서 복구)하고 이번 부팅만 미인증. 토큰 폐기는 **서버가 401/403 으로 거부했을 때만**. 5xx 도 유지. `refreshUser` 는 이미 안전(무변경).
- 회귀 박제: `e2e/auth-roles.spec.js` a-2 (네트워크 오류 1회→토큰 유지+재시도 진입 / 401→폐기). **3회 연속 7/7 flaky-0.**

### 완료된 작업 (이번 세션 2026-07-11)

#### #8 매니저 리포트 가짜매출 — 완료
> 실측 결과 문서가 stale: Manager **Reports** 는 이미 실집계(2026-07-08 `reports-summary` 배포됨). 진짜 잔여는 **ManagerDashboard**.
- `ManagerDashboard.tsx` — `Math.random()` 4줄(매출/주문/직원/평점) 제거 → `/api/manager/sales-summary` 실데이터. 무인증 `/api/restaurants` 호출 + `admin_id===2` 하드코딩 필터 제거(서버가 역할별 스코프 결정). 평점(★)은 실소스 없어 **UI 제거**(가짜→가짜 금지).
- `manager-sales.js` — sales-summary 에 `status`/`branchName`/`staffCount`(= /api/staff 목록과 동일 정의) 추가.
- **🔴 신규 발견·수정: 매출 부풀림** — manager-sales.js 매출쿼리에 `is_deleted` 필터가 **0건**이었음. 주문삭제=소프트삭제(status=completed 유지)라 **삭제한 주문이 계속 매출로 집계**됐다(RA dashboard.js·주문목록은 전부 필터함 — 매니저 리포트만 기준 이탈). sales-summary + reports-summary 양쪽 수정.
- 검증: 실호출(주문 RM42.50 생성→매출 0→42.5→삭제→0 원복, 수정 전엔 42.5 잔존) · reports-summary 동일 PASS · 직원수 /api/staff 와 일치 · 익명 401.

#### #24 구독변경 배선 — 핵심 완료 (Fable 게이트 대상)
> 운영 DB 실측: **`subscriptions` 테이블 0행 = 게이트웨이(Stripe/PayPal) 정기구독 쓰는 테넌트 없음** → 감사가 우려한 "앱에서 플랜 바꿔도 게이트웨이는 옛 금액 청구" 이중청구 리스크는 **현재 부존재**(청구는 인보이스 기반).
- **🔴 App.tsx 가 목업 파일을 가리키고 있었음** — `pages/Manager/SubscriptionsPage.tsx`(5/26, fetch 0건·로컬 state·다음청구일 `Date.now()+30일` 날조)가 라우팅되고, 실제 배선된 `ManagerSubscriptionsPage.tsx`(7/8)는 **import 0건 = 죽은 코드**. → import 교체 + 목업 파일 삭제. 이제 매니저 플랜변경이 실제 저장됨.
- **🔴 결제주체가 자기 플랜을 못 바꾸던 논리구멍** — `buildRestaurantSubscription` 의 "결제자에게 문의하세요" 차단(payment_model≠restaurant)이 **결제자 본인(BG/FG/Owner)에게도** 적용됨 → 매니저 구독페이지의 존재 이유인 대납 매장에서 변경 불가. viewer 인자 추가해 **viewer==결제주체(또는 System Admin)면 차단 해제**(연체·정지 차단은 유지). 셀프서비스(RA) 경로는 viewer 미전달 = 무변경.
- **🔴 예약일이 과거로 잡히던 버그** — `getNextBillingDate` 가 lapsed `subscription_end` 를 그대로 반환 → 예약이 과거 날짜, 업그레이드 인보이스는 **발행 즉시 연체**. 항상 미래가 되도록 수정. (운영: subscription_end null인 active 매장 7 + past 1 = 8곳 해당)
- **DELETE /change-plan 매니저 모드 추가**(POST와 대칭, IDOR 가드 재사용) — 매니저가 다운그레이드 예약을 취소할 수 있게. **쿼리 파라미터 방식**(chunked DELETE body 는 핸들러 도달 전 400 — 실측).
- 신 페이지 보강: 잔존 `Math.random()` 사용량 → 서버 실카운터(메뉴/주문/직원 = 다운그레이드 검사와 동일 소스), 스토리지는 계측 소스 없어 **표시 제거**. 예약변경 배너+취소 버튼. 구 페이지에만 있던 **청구주체 전환(payment model)** 이식(안 옮기면 회귀).
- 검증: 실호출 10/10(예약 저장·즉시반영 금지·미래날짜·재조회 영속·취소·IDOR 403·익명 401·결제주체 변경가능) · 실브라우저 mount OK.

#### 회귀 박제 (health-check pos, 15/15)
- "매니저 매출 = 실주문 반영 + 삭제주문 제외(is_deleted)" — 수정 되돌리면 **정확히 이 1건만 실패** 실증
- "매니저 다운그레이드 = 미래 예약 저장 + 취소 가능(목업/과거날짜 회귀)"
- "익명 /manager/sales-summary → 401"

### 완료된 작업 (이번 세션 2026-07-10)
> Irene "Fable에게 — 너(Opus) 없어도 개발 문제없게 잘 확장하도록 안정적 구조·아키텍처·스킬 탁월하게 보완해 달라." → Fable 진단→설계→구현, Opus 실측검증·조율. 목표=model-agnostic 안전 개발 확장. 단일진실 메모리 [[reference_model_independent_safety_scaffolding]], 온보딩 입구 `docs/AGENT_ONBOARDING.md`. 전부 **dev 전용·운영 무접촉·미배포**.

- **verify-all 단일 러너** (`dev-backend/scripts/verify-all.js`) — 기계 게이트 12종 1명령(표준/`--full` mount/`--quick`/`--only`, fail-closed). 개별 스크립트 암기 불필요.
- **check-sensitive-diff** — CLAUDE.md Fable 5기준(🔒인쇄8/💰돈/🗄️마이그/🔐보안+⚠안전망) 경로패턴 자동분류→"Fable 대상" 기계판정(`--gate` fail-closed). 앵커=deploy-manifest 배포 스냅샷+git 합집합.
- **deploy-manifest** — 배포 성공 시 소스 sha256 스냅샷(`.claude/deploy-manifest.json`), "운영 대비 뭐 바뀌었나" 단일진실.
- **safety-guard 훅 규칙확장** — 인쇄8/KDS 보호파일·가드 baseline·bless·skip-safety 편집 **시점** ask(기존 활성 훅 확장, 신규 배선 아님).
- **배포 게이트 7→9 + post-build mount sweep** (deploy-to-production.sh) — 타임존·hydration 추가 + 빌드 직후 실브라우저 크래시 검사 fail-closed.
- **마이그레이션 레지스트리화** — 하드코딩 41목록→`migrations.registry.json` 단일소스(deploy 41+manual 23 이유명시) + `check-migration-registry.js`(미분류=스키마드리프트 fail-closed). 배포 스크립트가 레지스트리 소비.
- **roles-sweep verify-all 편입** — mount 커버 2역할(RA·BG)→5역할(+FG·Owner·Supplier). admin/manager는 demo계정 부재 graceful skip(문서화 갭).
- **E2E 뼈대** — `dev-frontend/e2e/`(playwright.config + demo-guard rid=38·운영도메인 throw 안전레일 + auth-roles 시나리오 a flaky0 + mobile-order b 스텁). opt-in(배포 게이트 아님).
- **AGENT_ONBOARDING.md** + CLAUDE.md/스킬 4개/session-state 배선 + 메모리 신규.

**검증(전부 실행):** verify-all 12/12·print-guard 8/8 무접촉·마이그 집합 41==41 독립대조(누락0·차이7=비마이그 게이트/싱크 스크립트 여전히 호출)·fail-closed 실증(sensitive-diff 돈경로→exit1·훅 보호파일→ask·미분류마이그→exit1, 전부 복원clean)·5역할 mount 466s exit0. 인쇄/KDS/돈 런타임 무접촉.

### 완료된 작업 (이번 세션 2026-07-10 #2 — E2E b~f + 주문 생애주기 실증)
> Irene "주문관리 확인은 너한테. /검증하고 /배포하고 주문 다 넣어보고 결제·단계이동·프린트 다 테스트." → demo rid=38에 실제 주문 넣어 전 생애주기 실증 + E2E b~f 구현 + /검증. **인쇄/KDS/돈 런타임 무접촉**(e2e 테스트 파일 + health-check sweep 보강만).
- **E2E 시나리오 b~f 전부 구현·flaky-0** (3회 연속 13/13): b 모바일주문(메뉴 mount + 주문 생애주기 API), c POS터미널(mount + 주문·결제·영수증), d 플로어플랜(mount + 테이블 렌더·클릭 패널), e 설정(mount + 테이블 QR CRUD), f KDS(주문→자동노출·단계·스테이션). mutation은 결정적 `request` API(demo-guard rid=38), UI는 mount·무크래시.
- **주문 생애주기 실증(HTTP 실호출)**: 생성→pending-print(claim 경쟁 1/5)→printed(재인쇄0)→+Round(새것만)→단계이동(pending→preparing→ready→served)→결제(cash completed)→정식삭제. 15/15 통과.
- **신규**: `e2e/{mobile-order,pos-terminal,floor-plan,settings-zones,kds}.spec.js` + `e2e/fixtures/demo-orders.js`(주문 생애주기 API 헬퍼) + demo-guard 헬퍼 추가(injectAuth/authHeaders/bodyLooksCrashed).
- **health-check orphan-sweep cascade 보강**: 생애주기 주문의 자식행(order_actions/order_payments/point_transactions) FK로 force-destroy 실패 → 자식 먼저 cascade. 데모 마커 한정·멱등. (민감영역 분류기가 "안전망 자체"로 플래그 — 계약 로직 무변경, 근거 명시.)
- **검증**: verify-all 12/12 · health-check print 8/8(보호파일 무결성 변경0) · e2e 3회 flaky-0 · demo 청정(잔여0).
- **인쇄 물리 경계 명시**: 파이프라인 계약까지 헤드리스 증명, 실제 종이는 with MIN 매장 1회 확인(별도·미해소).

### ✅ 셰이크다운 배포 완료 (2026-07-10 20:09, Backup 20260710_195933)
- 런타임 무변경분(안전기반+e2e+health-check) 운영 배포. **새 9게이트 첫 실전 end-to-end 통과** + **`.claude/deploy-manifest.json`(1762파일) 앵커 생성** → check-sensitive-diff 델타 앵커 활성화(반쪽→완성).
- 배포 중 발견·수리: **mount sweep flake** — 첫 시도 mount 게이트가 exit1(sweep 자체는 55/55·72/72 OK). 근본=rebuild 직후 전이적 pageerror(진짜 크래시 아님, 두 sweep 다 standalone 통과 확인). CLAUDE.md 규칙대로 `--skip-safety` 금지→**flake 자체 수리**: `headless-page-sweep.js`·`headless-roles-sweep.js`에 실패 route 1회 재검(진짜 크래시는 재검도 실패→여전히 차단). 재배포 mount 465s 크래시0 통과.
- 신규 2테이블(menu_reference_photos·recognition_logs, 이전 AI인식 dev분) 운영 sync — 추가형·빈 테이블, 컬럼/타입 변경 0. Smoke 9/9 · 운영 health OK · nginx reload.
- 버전 미상승(인프라/안전/테스트 전용, 매장 무접촉) — 릴리즈노트/블로그/공지 생략(Irene 확인).

### 다음 확정 작업
- **① Fable 검증 게이트 수행** (위 "★ Fable 검증 대상" 블록 그대로) → 통과 시 **② Irene `/배포`**. 그 전까지 배포 금지.
- (#8·#24 개발분은 전부 완료·dev 반영됨 — 추가 개발 대기 항목 없음.)
- 물리 대기(별개): with MIN 데스크탑앱 0.1.7 매장 1회 인쇄 확인 — 아래 절차, Irene 매장 방문 시.

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 자동 추천 대상 아님.
- timezone(242)·design(310) baseline 부채 점진 소거 · E2E 시나리오 추가 확장(현 b~f 위)  ← admin/manager mount 갭은 2026-07-11 해소
- (안전기반) inspection suites·verify-all GATES·sensitive-diff CLASSES 지속 확장("피드백 1건=불변식 1개")
- prod `node sync-database.js`로 processed_ops 확인(오프라인 멱등, 없어도 무해)
- i18n `settings:printer.stations.noPrinterWarning` 4언어 파일 추가(현재 defaultValue 폴백)
- (이전 큐, 미착수) #8 매니저리포트 가짜매출·#24 구독변경배선(돈,Fable)·비전AI B2(Irene 키)·오프라인 편집배선 — 상세 아카이브 `DEVELOPMENT_PLAN.md`

---

## ⏳ 여전히 대기(물리) — with MIN(#10) 인쇄 데스크탑앱 0.1.7 매장 1회 테스트
> 앱 0.1.7 운영배포 완료(2026-07-09, Fable GO). 코드로 불가한 물리 확인만 남음. Irene 매장 방문 시 아래 순서. 백지 나와도 `printFormat=auto` 원격복구(재방문 불필요). 결과(Render check/백지)는 **Fable가 판단**해 다음 실행 지시(printToPDF 플랜B 등). Opus 단독 판단 실행 금지(2026-07-09 확정 방식).

> #### 🏪 매장 1회 테스트 절차 (with MIN #10 — 이 순서대로)
> 1. **앱 업데이트**: 0.1.5 앱 켜두고 수분~30분 → "지금 재시작" 뜨면 재시작. 안 뜨면 `purplehere.com/desktop/PurplePOS-Setup-0.1.7.exe` 수동설치 → **좌상단 배지 0.1.7 확인**.
> 2. **스테이션 프린터 지정**: Settings→Printer→Kitchen Stations→각 스테이션(**BAR 포함**) 드롭다운 **POS-80 선택**(미지정 스테이션엔 노란 경고) → 저장 → 주문→주방 티켓 나오는지.
> 3. **빌 인쇄**: 영수증이 **디자인(백지 아님)**으로 나오는지.
> 4. **오더티켓 디자인**: Settings→Printer→**printFormat='graphic'** → 오더티켓이 raw텍스트 대신 디자인으로.
> 5. **백지 나오면**: 재빌드 말고 **Ctrl+Shift+D → "Render check (PDF, no paper)"** → 화면 PDF에 내용있으면 드라이버문제(플랜B)/백지면 렌더문제. **결과를 Fable에 전달.**
> #### 🔙 백지 시 원격 즉시복구: Settings→`printFormat='auto'` 되돌리면 raw ESC/POS 복귀(인쇄 중단 없음). 앱 롤백: 0.1.6/0.1.5 설치본 재설치 가능.
> 상세 히스토리 = `docs/WITHMIN_PRINT_SAGA_2026-07-09.md`.

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```

> 전체 완료 아카이브(과거 세션 상세)는 `DEVELOPMENT_PLAN.md`. 이 파일은 진행/다음/후속의 단일 소스.
