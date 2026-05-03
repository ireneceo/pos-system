# Changelog

> 배포 전 개발 내역을 추적합니다. `/개발완료` 시 자동 추가, `/배포` 시 버전으로 이동.

---

## [Unreleased] — 미배포 (개발서버만)

## [v3.23] — 2026-05-03 배포

**비대 라우트 분리 + Sentry cleanup + B9 dashboard 사전 집계 + B10 Jest 27 tests + Overdue cron + UI/UX 친절도 보강 (Stripe/PayPal/SMTP 가이드 + Empty states + Mobile hints) + 백엔드 에러 응답 표준화 (fieldErrors + hint)**

### 비대 라우트 분리 (CLAUDE.md 500줄 가이드 시정 완료)
- `inventory-routes.js` 1820줄 → inventory-core (1108) + inventory-extra (732). barrel 마운트
- `purchase-orders.js` 1624줄 → purchase-orders-crud (889) + purchase-orders-workflow (971). barrel 마운트
- 모든 sub-router 1500줄 미만 달성

### Sentry 코드 정리 (사용자 미사용 결정 후속)
- server.js Sentry init + setupExpressErrorHandler 제거
- middleware/auth + customerAuth Sentry.setUser + import 제거
- frontend index.tsx Sentry.init + Sentry.ErrorBoundary → React 표준 inline class
- frontend AuthContext Sentry.setUser 4곳 + import 제거
- 효과: frontend 번들 1726KB → 1447KB (−280KB)

### Dashboard 통계 사전 집계 인프라 (B9)
- DB 모델 `RestaurantDailyStats` (restaurant_id × date UNIQUE, revenue/order_count/AOV/currency/timezone)
- `services/dailyStatsScheduler.js` 매일 00:30 SGT cron + SchedulerRun 기록 + upsert 멱등
- `scripts/backfill-daily-stats.js` (1회 실행: 25 식당 × 30일 = 750 row)
- 신규 endpoint `GET /api/dashboard/restaurant/:rid/daily-stats?from&to` (어제까지 사전집계 + 오늘 실시간 fallback + 누락 zero row)
- 기존 sales-chart endpoint도 사전 집계 lookup + today live 로 통합 (B9 v2 — week=daily / month=weekly / year=monthly bucket)
- `docs/DASHBOARD_AGGREGATION.md` 설계 문서

### Jest 도입 + 27 contract tests + CI workflow template (B10)
- jest ^30.3.0 + supertest ^7.2.2 (devDependency)
- `tests/_helpers.js` — uniqueIP + http + login (X-Forwarded-For 로 authLimiter 우회, trust proxy=1 활용)
- tests/auth.test.js (8) — login valid/invalid + anonymous + garbage token
- tests/idor.test.js (5) — RA cross-tenant + RP scope
- tests/payment-flow.test.js (6) — payment endpoint surface + invoice schema invariants
- tests/suspended-ux.test.js (3) — login response + /auth/me restaurantStatus 필드 surface
- tests/referral-commission.test.js (4) — UNIQUE(invoice_id, referrer_id) 제약 + wallet 잔액≥0 + (user, currency) UNIQUE
- npm test → "jest --forceExit"
- `dev-backend/ci-workflow.yml.template` — MySQL 8.0 service container + 3 jobs (backend-tests / i18n-verify / state-hydration)
- 검증: 27/27 PASS

### 비-subscription 인보이스 overdue 자동 전환 cron
- `services/invoiceOverdueScheduler.js` 신규 — service/hardware/po/soa 등 (subscription 외) due_date 지난 invoice 자동 status='overdue' + invoiceOverdueEmail
- SOA child (parent_soa_invoice_id) 제외 — finalizeInvoice cascade 가 처리
- 매일 02:30 UTC, SchedulerRun 기록
- subscription overdue 는 기존 subscriptionScheduler.processOverduePayments 가 그대로 처리

### 결제 게이트웨이 + 알림 연동 안내 보강 (UI/UX 친절도)
- `components/Payment/PaymentGatewayGuide.tsx` 신규 — Stripe/PayPal/Bank 단계별 가이드 (가입 → API key → webhook 등록 → test 카드/Sandbox)
- 4 PaymentSettings 페이지 (Admin/Brand/Foodcourt/Supplier) 에 Stripe/PayPal 섹션 위 가이드 마운트
- `components/Common/SmtpGuide.tsx` 신규 — Gmail/Outlook/Other (SES/SendGrid/Mailgun) 3-tab 단계별 가이드 (App Password 생성 + SMTP AUTH + STARTTLS 등)
- NotificationSettings Email tab 에 마운트

### Empty states + 빈 상태 가이드
- `components/Common/EmptyState.tsx` 표준 컴포넌트 (아이콘 + 제목 + 설명 + 1/2차 CTA + 단계 list)
- Customers 빈상태 — "QR 메뉴 자동 등록 / 수동 추가" 안내 + CTA
- NewPurchaseOrder 빈 카탈로그 — "Suppliers → 계약 → 발주" 3-step 가이드 + Browse suppliers CTA
- Ingredients 빈상태 — "Stock items 추가 → Recipe 연결 → min/par level → 자동 알림" 3-step + 도메인 설명

### Mobile / Settings 친절도
- Mobile MenuPage — 첫 사용자 dismissable 3-step banner (Browse → Cart → Checkout) + localStorage 기억
- Mobile PaymentPage — 결제방법별 hint (card 즉시 / paypal 리디렉션 / bank 몇 시간 / qr 앱 / counter 매장 cash)
- Admin SiteSettings — 페이지 상단 "어디 표시되나" 영향 범위 박스 (site name → 랜딩/탭/이메일 / brand logo → 헤더/이메일/PDF / default currency → 신규 식당만)
- Brand/Foodcourt PaymentSettings — Stripe 토글 비활성화 시 "고객 화면에서 옵션 사라짐" 작은 안내
- Restaurant Invoices Submit Payment 모달 — "How payment works" 보라 박스 (카드/PayPal 즉시 vs 은행 이체 + transaction reference + admin 확인 ~몇 시간)
- InvoiceSettings Late Fee — 입력 시 실시간 example ("RM 1,000 overdue → adds RM 20.00")

### 백엔드 에러 응답 표준화 (fieldErrors + hint)
- `middleware/errorHandler.js` 강화 — Sequelize ValidationError → fieldErrors 자동 / UniqueConstraintError → 409 DUPLICATE / FK / JWT errors 모두 명확한 code + hint
- `requireFields(res, fields)` 신규 헬퍼 — 인라인 검증 단축
- `middleware/validation.js` handleValidationErrors → fieldErrors map 변환 (하위호환 details 유지)
- `utils/parseApiError.ts` 프론트엔드 헬퍼 — modern + legacy 응답 통합 파싱
- 표준 형식:
  ```json
  { "success": false, "error": { "message": "...", "code": "VALIDATION_ERROR", "fieldErrors": {"name": "Required"}, "hint": "Both Name and Code are required." }}
  ```
- 44 라우트 파일 일괄 sweep (Python regex) — legacy `error: 'string'` → `error: { message, code }`. status → code 자동 매핑 (400→VALIDATION_ERROR / 401→UNAUTHORIZED / 403→FORBIDDEN / 404→NOT_FOUND / 409→DUPLICATE / 500→INTERNAL_ERROR 등)
- middleware/auth + recipeAuth 도 동일 sweep
- Sample 라우트 (POST /api/invoices/categories) 에 fieldErrors + hint 수동 보강 (패턴 예시)
- 회귀 0 — parseApiError 가 modern + legacy 모두 호환

### 운영 점검 보고서 갱신
- `docs/OPERATIONAL_READINESS_AUDIT.md` PM2 logrotate + Sentry 미사용 후속 + uploads 백업 + financial audit log 처리 이력
- `docs/DASHBOARD_AGGREGATION.md` (신규) — B9 설계
- `docs/V3_18_BASIC_TIER_GAPS.md` 갱신 — UNGUARDED 이미 fix 표기 (historical)
- `docs/BILLING_SYSTEM_INTEGRATION_PLAN.md` 갱신 — Overdue Cron 완료 표기

## [v3.22] — 2026-05-03 배포

**리퍼럴 UX 보강 + `/api/restaurants` 익명 노출 fix + 인보이스 사유 표시 + 운영 준비 점검 P0+P1 + 비대 라우트 분리**

### 리퍼럴 UX 보강
- `/referral/dashboard` 헤더 아래 "How it works" 보라 카드 (15% recurring / 20% off first month / Forever) — 3컬럼 desktop, 1컬럼 mobile
- `/signup` Referral Code 필드 옆 항상 보이는 hint *"Have a referral code? Get 20% off your first month."* (코드 입력 전에도 노출 → 신규 가입자 유도)
- ReferralLogin/Signup Input/Submit `box-sizing: border-box` 추가 (Input padding 28px 가 카드 밖으로 튀어나오던 레이아웃 깨짐 fix)
- 리퍼럴 페이지 모바일 반응형 (StatCard DashboardStats, ReferralLayout, ReferralAuthLayout) + 신규 `purple-referral-logo.svg`
- i18n 4언어 (en/ko/zh/ms): referrals.json + landing.json 32 신규 키

### 보안 fix
- `/api/restaurants` GET 익명 노출 차단 — `optionalAuth` → `authenticateToken` (admin email/businessReg/taxId/subscription 미인증 GET 차단)
- `Manager/SalesPage`, `Manager/SystemInquiryPage`, `Recipes/RecipesPage` 인증 헤더 누락 fetch fix
- health-check 익명 `/restaurants` → 401 영구 케이스 (security 21 → 22)

### 인보이스 사유 표시
- Restaurant/Owner/Admin 인보이스 페이지 우측 패널 + print HTML 에 `discount_reason` 라인 노출
- 효과: 자동 세팅된 'Referral: 20% off first month (PURPLE-XXXX)' 가 사용자에게 보임 (이전엔 'Discount (20%)' 만)

### 운영 준비 점검 (P0+P1 라운드)
- **uploads 백업** (C1): `backup-database.sh` dev/prod 양쪽 패치 — tar.gz + cross-backup, dev 14일/prod 7일 retention. 디스크 사고 시 32MB 이미지 영구 손실 위험 차단
- **financial path audit log** (C2): `utils/activityLogger.js` logActivity restaurant_id 가드 완화 + logSystemActivity 신규. referralService.processCommission/applyCredit, subscriptionScheduler.restoreSubscription, routes/referrals.js POST /payouts + PUT /admin/payouts/:id 모두 audit
- **결제/인보이스 console.log 정리** (C5+D1): invoices-payment 10건 + invoices-main 26건 제거 (User email + payment_method + transaction_id 평문 노출 차단). console.error 보존
- **PM2 log rotation** (A): pm2-logrotate dev/prod 양쪽 도입. dev 14일/prod 30일 retain, 10MB max, gzip, 매일 자정. Sentry 미사용 결정 후속
- **per-route rate limit** (D): auth signup 10/h, forgot 5/15min, admin-analytics/admin-reports 30/min
- **utils/logger.js thin wrapper** (E): info/warn/error/debug + 환경별 필터, 향후 winston/pino swap 가능
- **운영 sysops cron 이전**: root crontab → irene crontab, `/var/backups/orderhere/` chown irene

### 비대 라우트 분리 (CLAUDE.md 500줄 가이드 시정)
- `invoices-main.js` 2622줄 → invoices-list (1203) + invoices-crud (926) + invoices-generation (513). `invoiceInBranch` shared helper 를 invoices-helpers.js 로 이동
- `brands.js` 2596줄 → brands-core (1247) + brands-plans (1368). `brands.js` 는 barrel
- `foodcourts.js` 2333줄 → foodcourts-core (1243) + foodcourts-plans (1109). `foodcourts.js` 는 barrel
- 모든 sub-router barrel mount, server.js mount path 변경 없음

### 운영 준비 점검 보고서 (신규)
- `docs/OPERATIONAL_READINESS_AUDIT.md` — 실서비스 SaaS 기준 점검 (Baseline + 부족 + 위험 C1~C5 + 트래픽 트리거 + 실행 계획)

### 검증
- health-check 73/73 PASS (security 22, auth, pos, mobile, payment, referral)
- /api/restaurants 익명 401, RA 인증 200
- IDOR cross-tenant 라이브 401/403

## [v3.21] — 2026-05-01 배포

**Refer & Earn (리퍼럴 시스템) Phase 1+2+3 + IDOR 7 endpoint fix + Suspended account UX 재설계 + DB 인덱스 정리**

### 리퍼럴 시스템 (신규)
- **Phase 1 — Refer & Earn 핵심**: DB 모델 6 (`ReferralWallet`, `ReferralCommission`, `ReferralWalletTransaction`, `ReferralPayout`, `ReferralClick`, `ReferralSettings`) + User에 `referral_code/referred_by/bank_*/pos_account` 6 컬럼. `referralService` (code 발급 — 4자 retry, wallet upsert FOR UPDATE, processCommission 멱등 + SOA child guard, applyCredit, requestPayout/rejectPayout). 공개 2 + 본인 11 endpoint. `auth.js` referral-signup endpoint + signup의 5 role에 referral_code 처리 + 자기추천 차단. `invoiceLifecycle.js` `handleInvoicePaid` 공통 hook (paid 4경로 통합 + commission 적립). 첫 달 20% 할인 자동 적용 (음수 InvoiceItem + finalizeInvoice). 프론트 7개: ReferralLayout/AuthLayout + Login/Signup/Dashboard/Wallet/Profile + AutoSaveField (스위치 위 오버레이). SignupPage `?ref=PURPLE-XXXX` 자동입력 + 500ms validate-code debounce + 상단 그라데이션 배너 + Step 2 Referral Code 필드. `/referral` 라우트 + PosRootRedirect RP 분기 + ProtectedRoute switch + AuthContext UserRole/ROLE_PERMISSIONS/ROLE_ROUTES에 RP+Supplier Staff 추가. **38/38 PASS**.
- **Phase 2 — 관리 + 크레딧**: `POST /api/referrals/wallet/apply-credit` (invoice ownership 체크 + 전액 시 handleInvoicePaid 자동 호출). admin endpoints — overview / partners(검색) / partners/:id (referred users + wallets + commissions + payouts 5섹션) / payouts(filter) / payouts/:id PUT(approve|mark_paid|reject) / settings GET-PUT. `ApplyCreditModal` 공통 컴포넌트 — 통화 매칭, 잔액 자동 픽업, 실시간 preview, KRW/JPY/VND zero-decimal. Restaurant `InvoicesPage` "Apply Referral Credit" 버튼 통합. `ReferralManagementPage` SA 4 탭 (Overview/Partners/Payouts/Settings) — 검색/필터/액션 모달/AutoSave 토글. **23/23 PASS**.
- **Phase 3 — 마케팅 + 알림**: 이메일 알림 7종 (`referralPartnerWelcomeEmail`, `referredSignupEmail`, `commissionCreditedEmail`, `payoutRequestedAdminEmail`, `payoutApprovedEmail`, `payoutPaidEmail`, `payoutRejectedEmail`) + `NOTIFICATION_CATEGORIES`에 `referral_commission`/`referral_payout` 추가. `ReferralLandingPage` `/referral-program` 공개 — Hero(그라데이션) + 4-step + 4 Why Join + Earnings Calculator. `LandingHeader` GNB + Mobile menu Referral 메뉴. `MainLayout` 모든 역할 SidebarFooter ↗ Refer & Earn 그라데이션 링크 (60s polling 잔액 표시).
- **5 치명결함 fix (v3.21 안정화)**:
  1. `cancelCommissionsForInvoice` helper + `handleInvoiceCancelled` lifecycle hook + invoice PATCH `paid → other` / DELETE 시 자동 호출 (멱등 + transaction 내부)
  2. Admin Overview 차트 + 전환 퍼널 (시계열 monthly_signups/commissions + recharts LineChart 2 + 그라데이션 progress bar 3-step funnel)
  3. 사이드바 잔액 표시 — MainLayout 60s polling, 통화 표시 (RM/$/₩/S$/¥/₫). 잔액 0이면 "Start earning!"
  4. 추천인 계정 삭제 가드 — `routes/users.js` DELETE에 wallet.balance > 0 OR pending payout 체크. SELECT FOR UPDATE 잠금. **409 + `REFERRAL_BALANCE_NOT_SETTLED` code**
  5. Per-route rate limit — validate-code 30/min/IP, track-click 10/min/IP
- **i18n 4언어 분리**: `referrals.json` 288 키 × en/ko/zh/ms. 한국어 "수수료" → "커미션" 26 키 + 조사 보정 10건 (받침 통일).

### Suspended account UX 재설계
- **로그인 차단 제거**: `authService.js`에서 `subscription_status='suspended'` / `restaurant.status='suspended'` 분기 완전 제거 (이전엔 "contact your administrator" 데드엔드).
- **로그인 응답 + `/me`에 status 필드 포함**: `restaurantStatus`, `restaurantName`, `restaurantIsDemo`, `restaurantIsTest`, `is_demo`, `is_test`, `subscription_status`. login 직후 별도 fetch 없이도 frontend가 즉시 인식.
- **ProtectedRoute pinning**: suspended 감지 시 역할별 invoice 페이지로 강제 redirect (RA/Staff `/restaurant/{rid}/invoices`, BG `/pos/brand/invoices`, FG `/pos/foodcourt/invoices`, Owner `/pos/owner/invoices`). System Admin / demo / test 예외.
- **`SuspendedBanner` 공통 컴포넌트** + 4 invoice 페이지 마운트 (주황색 그라데이션, "Account on hold — overdue invoice. Pay any overdue invoice below to restore full access. The account reactivates automatically once payment is confirmed.").
- **`AuthContext.refreshUser()` hook 노출** + 4 invoice 페이지 `fetchInvoicesToPay()` 끝에 호출 → 결제 후 즉시 배너/redirect 풀림 (새로고침 불필요).
- 결제 후 자동 복구: 백엔드 `handleInvoicePaid` → `restoreSubscription` (기존 hook 활용).

### IDOR 보안 fix (cross-tenant 7 endpoint)
v3.21 검증 중 발견한 사전 부채. `authenticateToken`만 있고 `checkRestaurantAccess` 누락 — 다른 RA가 타 매장 데이터 조회 가능.
- `orders-views.js:19/172/416` — orders list / counts / next-order-number
- `activityLogs.js:12/124` — activity logs / stats
- `invoices-main.js` — `settings/:rid GET+PUT`, `update-payer/:rid`, `generate-missing/:rid` (4곳)
- `membership.js` — `settings/:rid PUT`, `tier/update/:rid/:cid` (2곳)
- 모두 `checkRestaurantAccess` 추가. RA cross-tenant 11 endpoint 모두 → 403 라이브 검증.

### Invoice 카운트 정합성 fix (legacy ENUM)
- `dashboard.js:457`, `restaurants-subscription.js:209`에서 `inv.status === 'sent'` 사용 — Invoice ENUM에 `'sent'` 없음 (legacy schema 흔적). `pending_payment` 인보이스 모두 누락되고 `overdue` 만 카운트되는 결함. 9개 vs 1개 불일치 fix.
- `BrandManagerDashboard.tsx:442`, `FoodcourtGeneralDashboard.tsx:687` — frontend 카운터도 동일 패턴. fix.
- 정상 ENUM (`pending_payment` / `payment_submitted` / `overdue`)으로 통일.

### SignupPage 가입 흐름 정돈
- 로그인된 상태에서 `/signup` 진입 시 가입 폼 대신 안내 카드 ("You're already signed in" + Go to my dashboard / Sign out and create new account 두 액션). 기존엔 가입 완료 시 새 토큰이 기존 세션을 silent override하던 결함.
- `?ref=PURPLE-XXXX` 진입 시 referral 입력 필드 숨김 — 상단 보라 배너만 표시 ("You've been referred! Get 20% off your first month of Purple POS. Referred by X.").

### SA Partners detail Modal
- `/pos/admin/referrals` Partners 탭에서 행 클릭 → Detail Modal (5 섹션):
  - Partner 기본 정보 (이름/코드/email/phone/role/가입일/은행)
  - **Referred users** 테이블 (이름/role/가입일/구독상태) — 누가 누구를 추천했는지
  - Wallets (통화별 잔액/누적 적립/누적 출금)
  - Recent commissions 최대 20건
  - Recent payouts 최대 20건
- i18n 4언어 17 신규 키.

### Wallet UX 단순화
- `/referral/wallet` 필터 5개 → 3개 (`All` / `Commissions` / `Payouts`) — RP에 무의미한 `Credit used` / `Adjustments` 제거.
- Stats 3개 → 2개 (`Total earned` / `Total withdrawn`) — Credit used 제거.
- POS 사용 안내문구 (`applyHint`) 제거 (RP는 POS 안 씀).
- i18n 4언어 4 키 제거 (288 → 284 통일).

### 운영 Staff fix (Restaurant Admin staff 관리)
- `routes/users.js` GET/POST/PUT/DELETE/reset-password 5개 endpoint 권한 확장 — Restaurant Admin이 자기 매장 staff 관리 가능. tenant isolation (cross-tenant 차단), role escalation 차단 (RA는 'Staff'만 만들 수 있음). `middleware/auth.js` `requireRole` 에러 메시지 개선 (required_roles + current_role + code 추가). `StaffPage.tsx` fetchStaff silent catch 제거 → 빨간 에러 박스 표시.

### DB 마이그레이션 (자동 실행)
- **`scripts/cleanup-users-duplicate-indexes.js`** — `email_N`/`username_N` 60개 중복 unique 인덱스 정리.
- **`scripts/cleanup-restaurants-duplicate-indexes.js`** — `slug_N` 59개.
- **`scripts/cleanup-sequelize-duplicate-indexes.js`** — 통합 sweep 17개 테이블 769 중복 정리 (canonical UNIQUE만 keep). MySQL 64-key 한계 도달 → 신규 ALTER TABLE 차단되던 상태 해소.
- `scripts/migrate-referral.js` — referral 6 테이블 + User 6 컬럼.

### health-check 안전망 강화
- security 카테고리 16 → 21 (cross-tenant IDOR 5건 영구 추가). `defineSecurityTests`에 `restId` 인자 추가하여 다른 RA가 타 매장 access 시 403 검증.
- 6번째 카테고리 'referral' 추가 — 24개 테스트 (public 3 + 401 차단 9 + auth 200 4 + cross-token 격리 1 + admin endpoint 5 + RA 403 RBAC 2).
- **총 67/67 → 72/72 PASS**.

### 검증
- 리퍼럴 비즈니스 로직 E2E: commission 적립 (8/8) + 멱등성 + cancel 환원 (5/5) + Skip 규칙 (4/4) + applyCredit + currency mismatch (4/4) + Payout 라이프사이클 (5/5) + CRIT-3 delete guard (5/5) + CRIT-4 rate limit + Self-referral 방어 = 49 PASS / 0 FAIL.
- IDOR 라이브 16 endpoint sample: cross-tenant 11/11 protected, own-tenant 6/6 OK.
- Invoice 카운트 정합성: DB=9, /to-pay=9, /dashboard.billing.unpaidInvoices=9 (이전 1).
- 주문 라이프사이클 5/5 (POST → PATCH preparing/ready/completed → 최종 status 검증).

### Sysops — 양방향 DB cross-backup 정돈
- POS는 dev → 운영 cross-backup 단방향만 적용되어 운영 손실 시 dev에 복구 소스 부재 (PlanQ는 양방향 적용 완료). 디렉토리/스크립트 일관 정리.
- POS 운영 `backup-database.sh` cross-backup 디렉토리 `production` → `production-pos` (PlanQ가 사용 중인 `dev-planq/` `prod-planq/`와 충돌 회피).
- POS dev `backup-database.sh` cleanup 라인도 `production-pos`로 통일.
- dev 측 빈 디렉토리 정리 (`production/` legacy 1건 → `production-pos/`로 이동 후 production 디렉토리 제거).
- 1회 수동 실행 검증: 5/1 운영 백업 (1.9 MB)이 dev `production-pos/`로 도착 확인.
- 후속 권고 (별도 작업): 운영 cron이 root user로 실행되는데 root SSH key가 dev 미등록 상태라 cron 자동 scp는 4-23 이후 실패 중. 운영 cron을 `irene` user로 이전하거나 root 공개키 dev 등록 필요.

## [v3.20] — 2026-04-30 배포

**Supply Chain Sprint 7 + Supplier Staff + SOA Invoice 재설계 + 운영 쿠폰 버그 fix**

### 2026-04-30 (이번 배포 — 30년차 시니어 감사 → Phase A + B 일괄)

**🔥 운영 사고 fix (즉시 운영 정정 포함)**
- **POS 100% 쿠폰 할인 → total_amount=0 보존 fix**: `routes/orders-crud.js:414, 487` falsy 체크(`!total_amount`)가 0을 "값 없음"으로 오인 → items 합계로 덮어쓰던 버그. `== null` 로 변경. **운영 DB 8건 정정** (Restaurant 8 IPC 쿠폰: 6건 cancelled + 2건 completed). 회귀 테스트 PASS (subtotal=7, coupon=7, total=0 보존).
- **Restaurant ingredient POST `image_url` 무시 fix**: `routes/restaurants-ingredients.js:185` POST 핸들러가 `image_url, ingredient_category_id, supplier_id, base_quantity, track_stock` 5개 필드 drop. 누락 필드 추가. RA/SA × POST/PUT × image set/null 4/4 PASS.

**📦 Supply Chain Sprint 7 — Operational Hardening (운영 사고 위험 4영역 + 12빈틈)**
- inventory_transactions / batches polymorphic (entity_type/entity_id + Sequelize hook + 백필 86 rows)
- Returns 양방향 환원 (Brand/Foodcourt seller도 stock 환원) + Currency invariant 검증
- 수령 차이 분류 (line별 splits: 정상/short/damaged/wrong_item/pending) + auto-returns 자동 생성
- PO.status ENUM 확장 (in_transit / delivery_failed)
- Carrier webhook 인프라 (HMAC SHA-256 + 2단계 처리 + idempotency + payload_hash UNIQUE)
- Admin Carrier 모달에 webhook 섹션 (regenerate-secret 한 번 노출 + status_map editor)
- 신규 페이지: `/pos/admin/carrier-webhooks` (System Admin 전용)
- path-level middleware fix: brand-inventory.js carrier-webhooks public endpoint 401 사고 해결.

**🛡️ Supplier 시니어 감사 → Phase A (운영 위험 5건)**
- **A1 신규 PO 알림**: `purchase-orders.js submit` + bulk autoSubmit → Supplier에게 이메일+socket 알림. `getSupplierAdminIds` 헬퍼 신규 (`utils/notificationService.js`). 24시간 SLA 가능하게.
- **A2 Buyer mark-shipped 외부 supplier 한정**: `purchase-orders.js:1100`. 시스템 supplier 차단 (403) — supplier stock 차감 우회 사고 방지.
- **A3 seller-orders 트랜잭션·락**: confirm/ship/reject/deliver 4 endpoint sequelize.transaction() 래핑 + supplier stock 차감을 같은 트랜잭션 내. ship 실패 시 롤백 → 데이터 불일치 차단.
- **A5 PO 상태전이 row-level lock**: submit/cancel/confirm/ship/reject/deliver 모두 `LOCK.UPDATE`. confirm + cancel 동시 클릭 race condition 방지. 라이브 검증 PASS.

**📑 Phase B — UX 통일 + 신규 기능**
- **B1 SOA 재설계 — Invoice record로 발행 (Irene 명세 반영)**:
  - `invoices.parent_soa_invoice_id` 컬럼 신규
  - `soaScheduler` 가 월말 SOA Invoice (`invoice_category='soa'`) 발행 + child trade invoices 묶음
  - 결제 cascade: SOA paid → child들 자동 paid (3 endpoint: submit-payment / record-payment / confirm-payment)
  - Frontend: SOA invoice 인라인 표시 (보라 SOA 배지) + Pay 버튼 조건부 (parent_soa 있으면 'Pay via SOA' 표시)
  - 모든 역할 동일 패턴 (Restaurant Admin, Supplier 등)
  - 설계 문서: `docs/INVOICE_SYSTEM.md` 11절 추가
- **B2 Supplier Staff (Advanced 모듈 `supplier_admin_staff`)**:
  - `users.supplier_company_id` 컬럼 + `Supplier Staff` 역할 ENUM 확장
  - `supplierScope` 미들웨어가 Supplier Staff 인식 (supplier_company_id 기반)
  - `routes/supplier.js` staff CRUD 4 endpoint + module 게이팅 + PIN 중복 방지
  - 신규 페이지 `SupplierStaffPage` + 사이드바 module 게이팅 (Basic plan 미노출, Advanced unlock 시 노출)
  - `authService` + `/auth/me` 에 `supplier_company_id` 포함
  - 신규 endpoint `/api/supplier-companies/:id/allowed-routes` (Supplier 본인+Staff+SA 권한)
- **B3 SupplierDashboard 리팩토링**: 인라인 styled 제거 → `Container/Header/Title/Content` 공통 컴포넌트 (UI_DESIGN_GUIDE 2.1 준수). StatusBadge 자체 색매핑 → `CommonStatusBadge` variant 매핑. Skeleton 4 → 8 cards.
- **B4 Empty state + CTA 통일**: `SupplierContractsPage` 탭별 hint, `SupplierCustomersPage` "View Pending Contracts" CTA.

**📱 모바일 + UX 통일**
- 모달 padding 모바일 통일: `UI/Modal.tsx` (76 페이지 사용) + 4 인라인 모달에 `@media (max-width: 640px)` — 가로 gutter 8px / inner padding 16px / overlay 12px.
- Restaurant 관리자 구매자 흐름 정돈: `alert()` / `window.confirm()` 12건 → `AlertDialog`/`ConfirmDialog`. 13개 항목 (PO history 6 / PO Detail 2 / PO Staging 2 / Cart 1 / Invoices 2). `🔍` SVG 대체. `📦` 텍스트 대체. AddressFields 적용. i18n 4언어 stockItems. Restaurant InvoicesPage 모바일 반응형 (768/480px).

**🔒 보안 + 데이터 무결성 (검증 중 발견)**
- `checkPaymentPermission` Restaurant Admin payer_type 새 모델 인식 fix (`invoices-helpers.js:379`) — 기존 invoice.restaurant_id 만 체크 → SOA/trade invoice의 payer_type='restaurant'/payer_id 도 인식.
- `/api/supplier-companies/:id/allowed-routes` SA-only 라우터 위로 이동 + owner/staff/SA 권한 분기.
- `users.role` ENUM 'Supplier Staff' 추가 (마이그레이션).
- `users.last_login_at` 미존재 컬럼 SELECT 제거 (supplier staff 500 에러 fix).
- 자동 테스트 패턴 이메일 가드: `s4*-{ts}@purplehere.com` / `test-*@`, `verify-*@`, `flow-*@`, `final-*@`, `dup_*@`, `smoke-*@`, `qa-*@` / `*@test.local` 패턴 → admin 알림 + verification email 차단. dev block 외 한 겹 더.

**🗂️ 기존 미배포 분 (이번 배포에 포함)**

### 2026-04-29 (PO/Supplier/Invoice 통합 UX)
- Cart 페이지 viewport 고정 + 검색 확장 (이름/카테고리/공급업체/단위/상세 OR-검색) + 타이틀 "Purchase Order"
- PO history: LiveOrders 동일 필터, SearchableSelect 공급업체, 우측 패널 (DetailPage embedded)
- PO Detail: Edit 제거, "+ Order More", embedded mode
- 통화 정책: 구매자 통화 기준 강제, 공급업체 통화 불일치 차단
- 사이드바 Order 섹션 + Suppliers 1메뉴 통합 + Stock Items 명칭 변경
- 데이터 무결성 fix: `tracking_info.events.note` 인자 순서 버그 (React crash 해결)

### 2026-04-28 (Sprint 7 + 타임존 일괄)
- 타임존 일괄 적용: Frontend 2 + Backend 11 파일
- 모바일 헤더 fix (480~768px StaffInfo overflow)
- 로그인 LanguageSelector globe variant
- Restaurants 페이지 계약 뱃지/만료일

**🗄️ DB 마이그레이션 (자동 실행)**
- `scripts/sprint7-migration.js` (Sprint 7 ENUM 확장 + 신규 컬럼)
- `scripts/migrate-supplier-staff.js` (users.supplier_company_id + role ENUM 확장)
- `scripts/migrate-soa-invoice.js` (invoices.parent_soa_invoice_id)

**📊 검증 (실 데이터 라운드트립)**
- POS 쿠폰 100% 할인 + 부분 할인 — total/coupon/subtotal DB 보존 검증
- PO 라이프사이클 — submit → confirm/cancel race lock → mark-shipped 차단 (6/6)
- Supplier Staff CRUD — POST/GET/PUT/DELETE + PIN 중복 거부 (7/7)
- SOA cascade — submit-payment/confirm-payment 양쪽 child 자동 (8/8)
- Restaurant Ingredient image — 5개 필드 round-trip (6/6)
- health-check 43/43 / state hydration 0 warning

**📂 신규 파일 (대표)**
- Backend: `models/CarrierWebhookEvent.js`, `routes/carrier-webhooks.js`, `routes/upload.js` 보강
- Frontend: `pages/Admin/CarrierWebhookEventsPage.tsx`, `pages/Supplier/SupplierStaffPage.tsx`
- Migrations: `scripts/sprint7-migration.js`, `scripts/migrate-supplier-staff.js`, `scripts/migrate-soa-invoice.js`
- Docs: `docs/SUPPLY_CHAIN_SPRINT_7.md`, `docs/INVOICE_SYSTEM.md` 11절

## [v3.19] — 2026-04-28 배포

**Supply Chain System 운영 도입 — Sprint 1~6 + 보안 일괄**

### 2026-04-28 (보안 IDOR 일괄 + UX 정리 + dev 이메일 차단 + 검증 10단계)
**🔒 보안: 운영 배포 직전 IDOR 3건 차단 + 운영 사고 4건 방지**
- **menu.js IDOR**: 8개 endpoint에 `checkRestaurantAccess` 적용. `/product/:id`는 `:id`가 product id이므로 `checkProductTenant` 별도 미들웨어로 분리. middleware/auth.js의 `checkRestaurantAccess`가 query/body restaurantId까지 해결하도록 확장.
- **brand-inventory.js IDOR**: 4개 `:brandId` endpoint에 `requireBrandScope` 적용.
- **PO 비-Restaurant audit**: Brand/Foodcourt buyer 수령 시 `ActivityLog` 기록 (entity_type='po_receipt') — 감사 추적 회복.
- **Socket.IO seller room 격리**: system_admin seller emit skip (`seller_${type}_${id}` fallback 폐기).
- **글로벌 seller socket**: MainLayout에 BG/FG/Supplier 페이지 무관 socket listener — Dashboard 등 다른 페이지에 있어도 새 PO 즉시 반응.
- **BG multi-brand 지원**: BrandProductRecipePage가 `/api/brands` fetch + selector 드롭다운 + brand_id 쿼리 필터.

**🚨 운영 사고 방지**
- **dev 이메일 SMTP 차단**: emailService 3종(Platform/Entity/Issuer) 모두 dev에서 SMTP skip. Test signup이 운영 admin 메일함 폭격하던 사고 차단.
- **nginx HTML no-cache**: index.html `cache-control: no-cache, no-store, must-revalidate` — 브라우저 stale main.js → chunk 404 → TDZ 표시 문제 해결.
- **IncomingOrdersView TDZ**: `dateRange` useState를 `fetchList` useCallback 위로 이동.
- **FoodcourtTenancyMap i18n ref**: PinsLayer 컴포넌트에 `useTranslation` 추가.
- **OrderTypePage 빈 상태**: 모든 모바일 주문 유형 비활성 시 안내 카드 + 관리자 Settings 경고.

**🟡 i18n + UX 정리**
- PO Detail i18n 키 4언어 (`detail.actions.{returns,print}` + `detail.returns.*` + `print.*`).
- BrandProductsTab i18n 28키 × 4언어 적용.
- IncomingOrdersView 이모지 제거 (📭/📦/📍 → 텍스트, Restaurant LiveOrdersPage 패턴 통일).

**기타**
- `deploy-to-production.sh` 콘텐츠 sync 기본 ON + sync-contents-to-prod.js 위임.
- `/글쓰기` 스킬에 4.5단계 팩트 검증 (.gov.my 1차 출처 우선) 추가.
- 블로그 발행: e-Invoice RM10K Malaysian Restaurants 2026 (3언어).
- 검증 10단계 모두 PASS (health-check 43/43 + IDOR 14/14 + SPA 17/17).

### 2026-04-27 (Sprint 5+6 — Smart Reorder, Live Sales Order, Delivery Tracking, Lifecycle Completion)
**📦 발주/주문 라이프사이클 완성 — 운영 배포 가능 상태**
- **PO Phase 2**: Restaurant 발주 ↔ 계약 검증 통합 (Supplier=SupplierContract / BG=brand_id / FG=foodcourt_id) + RestaurantIngredientCost 가중평균 자동 갱신 + Mapping 강제. 신규 `/api/buyer-sellers` 통합 picker.
- **Sprint 5 — Smart Reorder + Live Sales Order**: Carrier 카탈로그 (Lalamove/Grab/JNT/Ninja Van/Pos Laju 시드) + 신규 `/api/purchase-orders/bulk` (다중 seller 그룹 일괄) + Socket.IO `/orders` namespace `seller-order-created/updated` 실시간 + tracking_info JSON 표준화 (events 자동 push) + ship 시 carrier_code → tracking_url 자동 생성 + 5단계 DeliveryTimeline 공유 컴포넌트.
- **Sprint 5 Detail**: BulkOrderModal (multi-select cart) + StockListSection 추천 컬럼 (preferred seller + suggested_qty) + CarrierAdminPage (System Admin CRUD) + IncomingOrders Detail Drawer (DeliveryTimeline + Returns 액션).
- **Sprint 6 — Lifecycle Completion**: PO status enum +`'delivered'` (shipped→delivered→received) + Buyer cancel 'submitted' 허용 + Buyer edit 'submitted' 허용 + PUT `/seller-orders/:id/tracking` 사후 수정 + Supplier stock 자동 차감 (ship 시) + SupplierInventoryTransaction `po_shipped` 자동 기록 + **Returns / Credit Notes** 신규 (PurchaseOrderReturn 모델 + Approve→Credit Note Invoice 자동 발행 + 양쪽 stock reversal) + **PO Print 페이지** (window.print A4 layout, 라이브러리 X).
- **Sprint 6 마무리 — Live Orders Restaurant 패턴 100% 일치**: 사이드바 Live Orders 메뉴를 Dashboard 직후로 이동 (BG/FG/Supplier) + NavIcon `hasPending` pulse 만 (NavCount/NavDot 폐기) + AudioToggleButton + speaker SVG + DataTable 레이아웃 (카드 그리드 폐기) + DatePeriodFilter (today/yesterday/week/month/year/all/custom) + StatusTabs/TabBadge + StatisticsBar (작은 inline). 새 PO 행 highlight (배경 + NEW 배지). Backend `/api/seller-orders` date filter (`from`/`to`).
- **Backend `livePoCount` badge**: `/api/badge-counts` 응답에 supplier/brand/foodcourt/SA role 별 submitted PO 카운트.
- **신규 모델 2 + 신규 라우트 4**: Carrier, PurchaseOrderReturn / carriers, buyer-sellers, po-returns, + bulk endpoint.
- **DB 마이그레이션 2**: sprint5-migration (carriers 테이블 + 5 시드), sprint6-migration (PO status +'delivered', Invoice status +'credit', purchase_order_returns 테이블).
- **i18n 4언어**: nav.liveOrders / inventory.bulkOrder / common.delivery.steps / admin.carriers / status.delivered.
- **버그 fix**: po_number race condition (cleanup 후 duplicate) → MAX-based 생성, trackingInfo undefined (rename 누락), TDZ runtime crash (cross-chunk styled import → 인라인 복제), invoice.status='credit' enum 누락.
- 데이터 cleanup: test garbage 9 PO + 4 returns + 2 orphan Credit Note 삭제. 데모 lifecycle 데이터 보존 (draft 1 / submitted 12 / confirmed 4 / shipped 7 / received 16 / Returns 2 / Credit Note 1).
- **테스트 가이드** `docs/SPRINT_5_6_TEST_GUIDE.md` (8 시나리오 운영 테스트). 다음 세션에서 Irene 직접 운영 → `/배포` 결정.
- 검증: Sprint 5 38/38 / Sprint 6 29/29 / Phase 2 21/21 / Live Orders 마무리 9/9 / health-check 43/43 / Stage 0 hydration 0 warning.

### 2026-04-27 (Supplier Portal Polish — UX 통일성 + 데이터 + Inventory Transaction)
**Supplier 포털 사용성 — Brand/Foodcourt 와 동일 패턴으로 통일**
- Sidebar 재구성: "Settings" NavTitle 두 번 렌더 fix. Operations / Plans & Payments / Communication 3 섹션. Profile disabled 제거.
- Dashboard 재작성 (313 → 540줄): 4 stat → **8 KPI** (pending/confirmed/shipped orders + monthly_revenue + outstanding + active_customers + low_stock + received_this_month) + **6개월 매출 추이 LineChart** + **Alerts panel** (clickable deep-link) + **Recent Orders/Trade Invoices 2-col 테이블** + Subscription card. Backend `/api/supplier/dashboard` 응답 18 필드.
- **Inventory Transaction 신규** (Sprint 1 의 Sprint 3 TODO 마무리): SupplierInventoryTransaction 모델 + 테이블, adjust/receive 자동 기록, `/transactions` endpoint. Frontend Tab 구조 (Stock List / Transaction History) + 8 transaction 시드.
- Demo data 종합: demo-supplier@purplehere.com (is_demo=true → supplier_advanced 모듈 자동). 6 Products / 1 Active Contract / 4 PurchaseOrders (다양 상태) / 1 Trade Invoice / 2 Subscription Invoices / 2 Notices / 2 SupportTickets.
- Notices 라우트 추가 (`/pos/supplier/notices`, BrandNoticesPage 재사용) + System Inquiry/Subscription Invoices 시드.
- Pricing Supplier 탭 추가 + 가격 시드 (Basic MYR 99 / Advanced MYR 299).
- LoginPage Demo 카드에 Supplier Admin 추가.
- 회원가입 에러 메시지 정확 노출 (MX 검증 메시지 그대로 사용자에게).
- **Path-level middleware fix** (6개 라우터): supplier-directory / purchase-orders / purchase-invoices / ingredient-seller-products / foodcourt-products / foodcourt-inventory — `/api` 광범위 prefix 시 router-level use가 다른 역할 요청까지 차단하던 silent 버그 fix.
- addon-modules `?active_only=true` public 처리.
- i18n 4언어 36+ 신규 키.
- 회귀 health-check 43/43, Buyer/Brand 측 endpoint 영향 없음.

### 2026-04-26 (Supply Chain System 4-Design 시리즈 완료)
**🎉 Supply Chain System — Supplier 사업체 도입 + Buyer-Seller 거래 흐름 완성**
- Sprint 1: Seller Product & Inventory — Supplier 사업체 신규 도입 (Brand/Foodcourt 패턴 미러). 12 모델 + 66 endpoints + 16 페이지. Supplier signup A+B (SA invitation + Landing 일반 가입). Foodcourt 자체 상품/재고 추가.
- Sprint 2: Supplier Contract — 구매자(Restaurant/Brand/Foodcourt) ↔ 공급업체 계약 시스템. 디렉터리 검색 + 계약 신청/승인/거절/종료. 활성 계약 1건 원칙. 13 endpoints + 5 페이지.
- Sprint 3: Purchase Order & Receiving — 발주관리 본체. Ingredient ↔ Seller Product 다중 연결. PO 작성 + 입고 (재고 자동 update + lock). PAR Level 자동 추천. 14 endpoints + 3 페이지 (3-step wizard).
- Sprint 4: Seller Order Mgmt + Trade Invoice + Monthly SOA — Seller-side PO 처리 (confirm/ship/reject). PO Received 시 Trade Invoice 자동 발행. Monthly SOA cron (매월 1일). 9 endpoints + 6 페이지 (BG/FG incoming-orders + Buyer purchase-invoices).
- 신규 16 DB 모델, 102 endpoints, 30 UI 페이지, 5 i18n namespace (4 언어)
- 신규 미들웨어 4종 (requireSupplierScope / requireBuyerRole / requireSellerRole / requirePlanLimit / requireSupplierModule)
- 신규 service 2종 (purchaseOrderService.createTradeInvoice / soaScheduler)
- 보안: IDOR 12건 + Anon 16건 + Cross-role 8건 + Validation 8건 = **44 시나리오 PASS**
- API E2E **86/86 PASS** (Sprint 30+18+18+20)
- health-check 43/43, hydration 0, i18n 0 errors (5292 키)
- 빌드 `main.6f22a419.js`
- 설계 문서: SUPPLY_CHAIN_SYSTEM_OVERVIEW.md + 4 Design 문서 (각 850~1400줄)

### 2026-04-26 (DEVELOPMENT_PLAN.md 예정 작업 일괄 완료)
**보안 fix — POST /api/restaurants 역할 제한**
- Brand Manager / Foodcourt Manager 제거. `requireRole('System Admin', 'Brand General', 'Foodcourt General', 'Restaurant Owner')`만 허용
- DEVELOPMENT_PLAN.md "선행 보안 이슈 (HIGH)" 해소
- health-check 회귀 케이스 3개 추가 (BM/FM/Staff POST → 403 검증) — 40 → **43/43 PASS**

**Trial 만료 자동 알림 이메일** (DEVELOPMENT_PLAN.md 예정 #3)
- 신규 4 컬럼 `last_trial_reminder_day INT NULL` (restaurants/brands/foodcourts/users) — 마지막 발송 임계점 (3/0/-1) 저장, 멱등성 보장
- `subscriptionScheduler.processTrialReminders` — D-3, D-0, D+1 세 임계점에 발송 (Restaurant + Brand + Foodcourt + Restaurant Owner 4 entity 통합)
- 이메일 템플릿 `trialExpiringSoonEmail` — 임계점별 톤 변화 (heads-up amber → urgent orange → grace red), CTA 버튼, 발신자 브랜딩
- 신규 알림 카테고리 `trial_expiry_reminder` (Subscription 섹션, 사용자 opt-out 가능)
- `EMAIL_NOTIFICATION_MATRIX.md` 갱신
- 검증: 6 시나리오 (D-3, idempotent, D-0, D+1, D-2 no-op, D-3→D-0 transition) 핵심 로직 100% PASS

**Daily scheduler 모니터링 대시보드** (DEVELOPMENT_PLAN.md 예정 #4)
- 신규 모델 + 테이블 `scheduler_runs` (job_name, started_at, finished_at, duration_ms, status, results JSON, error_message)
- subscriptionScheduler.processAllSubscriptions + invoiceScheduler daily cron에 SchedulerRun 기록 통합 (start='running' → end='success/partial/error' + results)
- 신규 endpoint `GET /api/admin/scheduler-runs?job_name=&status=&limit=&since=` + `GET /api/admin/scheduler-runs/jobs` (per-job summary + 24h error count)
- 신규 페이지 `pages/Admin/SchedulerMonitorPage.tsx` — Job summary cards (status pill, errors_24h badge, latest run time/duration/results) + Recent runs table (job/status filter)
- App.tsx 라우트 + MainLayout Admin 사이드바 메뉴
- 검증: list 200 + jobs 200 + summary count + auth 401

**구독 변경 히스토리 페이지** (DEVELOPMENT_PLAN.md 예정 #2)
- 신규 컴포넌트 `<InvoiceHistoryModal>` — 타임라인 UI (각 modification 카드: 수정자, 시각, reason quote, field별 from→to diff)
- 빈 상태 / from line-through / to bold green / arrow / monospace field name pill
- Admin/Brand/Foodcourt InvoicesPage 통합 — 기존 "Modified" 뱃지를 클릭 가능 button으로 변환 + tooltip
- (Restaurant Admin은 자기 invoice 수정 권한 없어서 skip)

**인보이스 수동/자동 UI 구분** (DEVELOPMENT_PLAN.md 예정 #6)
- 확인 결과: 4개 InvoicesPage 모두 이미 `<AutoBadge>` (#10B981) 구현됨. DEVELOPMENT_PLAN.md 항목 stale → 추가 작업 불필요로 마감

**검증**:
- 빌드 `main.3fc1c132.js` exit 0
- State hydration 0 warning
- health-check 43/43 PASS (신규 보안 케이스 3건 포함)
- scheduler-runs API: list 200 + jobs summary 200 + auth 401
- Trial reminder 6 시나리오 핵심 로직 통과

### 2026-04-25 (밤)
**알림 센터 (Inbox) v1**
- 신규 통합 endpoint `routes/inbox.js`:
  - `GET /api/inbox?type=...&unread_only=...&limit=...&before=...` — Notice + SupportTicket + OperationTicket UNION 시간순 정렬
  - `GET /api/inbox/unread-count` — 헤더 배지용 (notice + by-type 카운트)
  - `POST /api/inbox/notice/:id/read`, `POST /api/inbox/mark-all-read?type=notice`
  - 읽음 추적: Notice는 `notice_recipients.read_at`, Ticket은 status 휴리스틱 (open/in_progress/pending = unread)
  - 권한별 가시성: NoticeRecipient (user_id 또는 본인 restaurant) + Ticket (customerId/managerId/requesterId)
- 신규 컴포넌트 (`components/Inbox/`):
  - `inboxApi.ts` — fetch 래퍼 + relativeTime + TYPE_COLORS/SEVERITY_COLORS 디자인 토큰
  - `InboxItemCard` — type별 아이콘 색상 (notice indigo / support amber / ops teal), unread 좌측 색 stripe + bold + bg, severity dot, relative time + absolute tooltip
  - `InboxBell` — 헤더 종 + 미읽음 빨간 배지 (99+ 캡), 30s polling, 새 알림 도착 시 subtle shake + badge pop, focus ring
  - `InboxDrawer` — 우측 슬라이드 패널 420px (모바일 fullscreen), filter pills + unreadOnly 토글, skeleton loading, 빈 상태 (📬 + "You're all caught up!"), Mark all read, ESC + focus 관리, body scroll lock
- 신규 페이지 `pages/Inbox/InboxPage.tsx` — 전체 보기. tab + status segment + search input + result count + 같은 InboxItemCard 재사용
- App.tsx 라우트 2개: `/pos/inbox`, `/restaurant/:id/inbox` (모든 로그인 사용자)
- MainLayout 헤더에 InboxBell 마운트 (LanguageSelector 옆)
- i18n 30+ 키 신규 (`inbox.*`) — en/ko/zh/ms 4언어
- 접근성: `role="dialog" aria-modal="true"`, bell `aria-live="polite"`, severity dot `title=`, keyboard nav (Enter/Space)
- 검증: API 12/12 PASS, 빌드 `main.1ec04872.js` exit 0, hydration 0 warning, health-check 40/40

### 2026-04-25 (저녁)
**Onboarding wizard 강화 (옵션 A)**
- `<WelcomeModal>` 신설 — 첫 로그인 시 1회 표시되는 환영 modal. setup checklist 미리보기 + "Start Setup" CTA. localStorage `welcome_modal_seen_${userId}` 키로 1회 제어. 진행 중인 사용자(아무 항목 미완료)만 노출, completed > 0 이면 자동 skip
- `useSetupStatus` 확장:
  - **Restaurant Owner** 신규 분기 — first_restaurant / assign_admin / activate_plan (3 items)
  - **System Admin** 신규 분기 — admin_company / admin_smtp / admin_plan_templates / admin_payment (4 items)
  - **Brand General** 확장 — linked_restaurants 추가 (5 items, 전 4)
  - **Foodcourt General** 확장 — first_branch + fc_floor_plan 추가 (4 items, 전 2)
  - 기존 Restaurant Admin 11 items 그대로 유지
- `SetupItem.dependsOn` 메타 추가 — 의존 미완료 항목은 회색 + lock icon (🔒) + tooltip ("Complete first: ..."), 클릭은 가능하나 시각적 deemphasize (절대 차단 X — feedback_action_button_placement 가이드 따름)
- Admin/Owner Dashboard에 SetupGuide + WelcomeModal 통합 (이전엔 Brand/Foodcourt/Restaurant 3곳만)
- Restaurant/Brand/Foodcourt Dashboard에 WelcomeModal 추가
- i18n 신규 키 `welcomeModal.*` 5개 (greeting/subtitle/moreSteps/skip/start) — en/ko/zh/ms 4언어
- 빌드 `main.162bf2a4.js`, state hydration 0 warning, health-check 40/40 PASS


## [v3.18] — 2026-04-25 배포

**Invoice 정합성 — Single Source of Truth**
- Invoice 헤더 자동 재계산 — 11개 생성/수정 path에 `finalizeInvoice` 적용. `subtotal/discount/total`은 항상 items + additional_charges + discount 로부터 도출
- Invoice tax 저장 표준화 (Path B) — `items.tax_amount` 폐기, 모든 tax는 `header.additional_charges`에만. dev 79건 마이그
- Invoice 이메일 템플릿 보강 — `additional_charges` + `discount` 행 표시, phantom "Tax 0.00" 라인 제거 (산술 모순 해소)
- Invoice GET 응답 `tax` 필드 보강 — frontend 모달 Tax 0 표시 버그 fix (4 endpoint)
- Invoice 수정 시 이메일 재발송 옵션 — `PUT /api/invoices/:id` 에 `resend_email: true` 추가

**주소 시스템 통일 — Phase 1 + Phase 2 (Display & AutoSave)**
- 신규 컴포넌트 `<AutoSaveAddressFields>` — `<AddressFields>` + 600 ms debounce + 코너 저장 배지
- 신규 유틸 3개 — `formatAddressHtml` (HTML `<br>`), `formatAddressLines` (JSX 배열), `formatEntityAddress` (camelCase 변환 + 레거시 fallback)
- 입력 폼 6 곳 마이그 — Admin/Brand/Foodcourt/Manager Settings + Restaurant Settings + Owner/Restaurants Modal × 2 (모두 `address_line_2` 추가, country ISO 정규화). CompanyInformationPage MY-only state dropdown 제거
- 백엔드 4 라우트 보강 — brands/foodcourts/restaurants-crud company-info + store 에 `address_line_2` allowedFields + ISO 정규화
- 표시 사이트 33+ 파일 통일 — 청구서 HTML/PDF (9), 지점/관리/리스트 (24+), 모두 `formatAddress*` 유틸로 마이그
- 설계 문서 `docs/ADDRESS_STANDARDIZATION.md` 12장 추가

**주소 보완 — datalist 자동완성 + 정규화 + 검증**
- 신규 endpoint `GET /api/address/suggestions?field=city|state&country=XX` — 8개 주소 테이블 UNION DISTINCT (utf8mb4 collation 통일), 5분 서버 캐시
- 유틸 `normalizePlaceName` (Latin Title Case, CJK trim만), `validatePostalCode` (17국 정규식)
- `<AddressFields>` city/state HTML5 `<datalist>` 통합 + blur 정규화 + postal 형식 amber 경고 (입력 차단 X)
- i18n 신규 키 `address.postalCodeInvalid` (en/ko/zh/ms 4언어)
- 외부 API 의존성 0 (Google Places 미사용 — 자체 데이터로 점진적 통일)

**Subscription Plan 게이팅 정합성 fix**
- `ProtectedRoute.MODULE_GATED_ROUTES` prefix 정합성 — `/pos/brand/subscriptions` → `/pos/brand/general/subscriptions`, `/pos/foodcourt/subscriptions` → `/pos/foodcourt/general/subscriptions`
- Backend 가드 추가 — `GET /api/brands/:id/subscription` + `GET /api/foodcourts/:id/subscription` 에 `requireBrandModule('brand_subscriptions')` / `requireFoodcourtModule('fc_subscriptions')` 미들웨어 (`docs/V3_18_BASIC_TIER_GAPS.md` audit)

**Invoice 수동 발행 prefill (financial_terms 연동)**
- `routes/contracts.js` GET 라우트에 `restaurant_id` 필터 추가
- Brand/Foodcourt InvoicesPage `selectTarget`: restaurant 선택 시 active contract fetch → financial_terms로 amount/description 자동 채움 (Brand: `system_monthly_fee`, Foodcourt: `base_rent + maintenance_fee`). Best-effort

**Email Integrity Audit (F3)**
- 17개 site / 23개 발송 지점 전수 점검 → `docs/EMAIL_INTEGRITY_AUDIT.md`
- 결과: 모든 site fresh fetch 확보, 즉시 fix 0건

**운영 데이터 동기화 (사전 작업)**
- 운영 콘텐츠 sync — release-v3.16 + 다국어 마케팅 12건 + FAQ 11건 (53건) 운영 DB 반영
- 운영 enum ALTER — `users.subscription_status += 'overdue'`, `notification_settings.entity_type += 'brand'/'foodcourt'`

**검증**:
- health-check 40/40 PASS
- API 라운드트립 18/18 (admin/brand/foodcourt/restaurants company-info — address_line_2 + ISO 정규화)
- Address suggestions 23/23 (city/state for MY/KR + cache + 역할별 + edge)
- 운영 smoke tests 10/10 (health/login/menu/order/bill/invoices/restaurants/payment/frontend/JS bundle)
- 빌드 `main.e5103dd0.js` (1.6M)


## [v3.17] — 2026-04-24 배포

### FC Tenancy Map — 계층 사이드리스트 + 유닛 상세 패널
- **사이드 리스트 계층화**: branch 카드 선택 시 그 아래 tenant 레스토랑/유닛을 nested로 자동 전개. 정렬 규칙은 stage priority (active → setup → contracting → proposal → expired → vacant) 후 unit_number 자연순. Tenant 이름 없으면 "Vacant" italic 표시.
- **유닛 클릭 시 우측 상세 패널 (Brand Map / Floor Plan 패턴)**: unit code + stage badge header, Billing Gap banner (`fc_plans` 모듈 보유 시만), Unit info, Vacant empty state CTA, Current Contract, Tenant, Financial Terms (base_rent / revenue share / min guarantee / deposit / CAM), Actions (stage advance / renew / new tenancy / open contract).
- **지도 핀 클릭 연동**: branch 선택 상태에서 tenant restaurant 핀 클릭 → 해당 unit의 상세 패널로 전환. 사이드리스트와 핀 양쪽으로 진입 가능.
- **타이머/통화**: `data.foodcourt.currency`/`time_zone` 재사용, 하드코딩 없음
- **표준 Button 컴포넌트 일관 사용**, 화살표/아이콘 없음

**검증 결과 (30/30)**:
- 주문 라이프사이클 create → read → preparing → ready → served → delete: 8/8 ✓
- 세션 변경 회귀 (R1 제거, 모듈 게이팅 Basic/Enterprise, 지도 신규 필드, branch.units 구조, stage transition): 10/10 ✓
- 역할별 접근 (SA/BG/FG + cross-tenant): 4/4 ✓
- DB 정합성 (orphan 없음): 3/3 ✓
- 보안 (anon 401 전 영역): 5/5 ✓
- **health-check 40/40 ✓**

**빌드**: `main.30c49482.js` + `8535.ccdbd53d.chunk.js` 배포

### Brand Franchise Map + Foodcourt Tenancy Map 감사 + 개선
- **Brand Franchise Map detail panel 개선** — 오늘 Floor Plan에 만든 패턴 대칭 적용
  - `OpenContractLink` anchor 제거 → opener-aware navigate + 표준 Button (variant=secondary)
  - 파이프라인 stage advance primary 버튼 (proposal→contracting→setup→active) 추가
  - Expiring/Expired 상태 각각 Renew / Create new tenancy CTA
  - `brand_plans` 모듈 게이팅 — 미보유 시 Current Plans 섹션 숨김
  - 통화/타임존 하드코딩 제거 (`'RM'`, `'Asia/Kuala_Lumpur'`, `'en-MY'` locale) → `data.brand.currency`, `data.brand.time_zone`, `contract.currency` 사용
  - 화살표/아이콘 완전 제거 (→, +, ↻ 전부)
- **Foodcourt Tenancy Map 개선**
  - **`unit_stats.occupied` runtime 버그 수정** — 백엔드는 `occupied` 필드를 반환하지 않는데 프론트가 참조해서 NaN% 표시되던 문제. Retail property 표준에 맞춰 `occupiedCount(stats) = active + setup` 헬퍼로 정의하고 아이콘/사이드리스트/팝업 모두 일관 적용
  - Leaflet 팝업의 하드코딩 영문 "PRIMARY", "Occupied", "Vacant", "Type", "Sales 30d" → `t('map.popup.*')` 4개 언어 i18n 키로 치환
  - 팝업 HTML에 branch name/code/address XSS escape 추가 (Leaflet이 raw HTML 렌더링하므로)
  - `"View floor plan →"` 화살표 제거
  - 통화 `toLocaleString()` locale-neutral + 매장 통화 심볼 prefix
- **백엔드 API 응답 확장**
  - `GET /api/brands/:id/franchise-map` 응답에 `data.brand.currency`, `data.brand.time_zone` 추가 + contract 쿼리에 `currency` 필드 포함
  - `GET /api/foodcourts/:id/tenancy-map` 응답에 `data.foodcourt.currency`, `data.foodcourt.time_zone` 추가
- **i18n 4개 언어 추가 키**: `map.primary`, `map.popup.{total,occupied,vacant,type,sales30d}`

**검증**: 빌드 exit 0, `main.41b0e710.js` + chunk 4867/5295/8535 배포, 새 i18n 키 4개 언어 live. API E2E 12/12 (brand franchise-map currency/tz + contract.currency, FC tenancy-map currency/tz, unit_stats 구조 확인, stage transition, module gating). health-check 40/40

### Foodcourt Floor Plan 감사 + 개선
- **SPA 버그 수정** — `FoodcourtFloorPlanPage.tsx` 의 "Open contract" 가 `<a href>` 였어서 full page reload 유발. opener-aware 패턴(`openInOpener`)으로 교체 — 팝업으로 떠 있으면 opener 창에서 이동 + popup close, 단독 탭이면 in-page navigate
- **Dead code 제거** — 정의되기만 하고 렌더링 안 되던 `Tabs`, `TabBtn`, `SubHeader`, `OpenLink`, `UNIT_STATUS_COLOR` 제거
- **i18n 경로 통일** — 코드의 `floorPlan.financial.redacted` → `floorPlan.fin.redacted` (locale 실존 경로에 맞춤). 4개 언어에 `editLayout`, `sec.actions`, `action.advanceToContracting/advanceToSetup/advanceToActive/advanceConfirm/newTenancy/linkPlan` 키 추가
- **Pipeline 단계 전진 버튼** — proposal→contracting→setup→active 각 단계에 primary CTA 추가. confirm modal → `PUT /api/contracts/:id/stage` 호출 → 성공 시 플로어플랜 자동 리프레시. 기존엔 계약편집 페이지 진입해야만 가능했던 흐름을 원클릭으로 축소 (ops manager 반복 동작 단축)
- **billing_gap CTA + 모듈 게이팅** — active 계약에 ContractPlan 미연결 시 띄우는 배너에 "Link a plan →" 버튼 추가. `fc_plans` 모듈 없는 basic 고객에겐 배너 자체 숨김 (오늘 구현한 `hasModule` 헬퍼 재사용 — 그들은 수동 청구만 사용하므로 혼란 제거)
- **Currency/Timezone 하드코딩 제거** — `'RM'`/`'Asia/Kuala_Lumpur'` 하드코딩 6곳 제거. 마운트 시 `/api/foodcourts/:id` fetch → `currency`(통화 심볼 변환) + `operation_settings.timeZone`을 state로 보관 → Clock + 3개 date rendering + financial tile 에 실제 적용
- **새 tenancy CTA** — expired 상태 유닛에 "Create new tenancy" 버튼 추가 (vacant와 동일한 new=1&unit_id 쿼리)
- **백엔드 권한 완화 (foodcourts GET /:id)** — Foodcourt Manager 가 자신의 foodcourt_id 매칭 시 접근 허용 (이전엔 owner만 가능해서 Manager 가 floor plan 헤더에서 currency/timezone 조회 실패)

**검증**: 빌드 exit 0, chunk `5295.9c7289aa.chunk.js` 배포, 새 i18n 키 8개 4개 언어 전체 라이브 서빙, API E2E 10/10 (currency+timezone fetch, stage transition advance+restore, fc_plans 모듈 gating, billing_gap 필드 유지), health-check 40/40

### Subscription Plan 모듈 — 실질 티어 차단 (API + URL + UI 3중 가드)
- **`middleware/requireModule.js` 신설** — 타겟 엔티티(brand/foodcourt)의 활성 `PlanTemplate.included_modules` 를 확인해서 해당 모듈 코드가 없으면 `403 MODULE_NOT_INCLUDED` 반환. SA + demo 계정 bypass. Helpers: `requireBrandModule(code)`, `requireFoodcourtModule(code)`, `requireContractEntityModule({brand: 'brand_plans', foodcourt: 'fc_plans'})`
- **백엔드 엔드포인트 29개 게이팅**: `routes/brands.js` 의 plan/subscription 엔드포인트 13개 (`brand_plans` / `brand_subscriptions`), `routes/foodcourts.js` 의 대응 13개 (`fc_plans` / `fc_subscriptions`), `routes/contracts.js` 의 plan linkage 3개 (POST/DELETE `/:id/plans`, POST `/:id/create-plan-from-contract`)
- **프론트 `ProtectedRoute.tsx` URL 가드** — `/pos/brand/plans`, `/pos/brand/subscriptions`, `/pos/manager/plans`, `/pos/manager/subscriptions`, `/pos/foodcourt/plans`, `/pos/foodcourt/subscriptions` 6개 URL 에 대해 모듈 미보유 시 역할 대시보드로 자동 redirect. 이전엔 사이드바만 숨겨져 있어 URL 직접 입력으로 우회 가능했음
- **검증 (동일 유저의 plan_type 스왑으로 전수)**: Basic tier BG → `GET/POST /brands/:id/plans`, `GET /brands/:id/subscriptions`, `POST /contracts/23/plans` 전부 403 MODULE_NOT_INCLUDED. SA → 200 bypass. Enterprise tier BG → 200. plan_type 원복 검증 포함 10/10 pass. health-check 40/40

### R1/R2 방어선 철회 + Contract Billing Plan 연결 모듈 게이팅
- **R1/R2 정합성 방어선 전면 제거** — 직전 세션에 도입한 restaurant-contract cross-brand 차단이 잘못된 도메인 모델이었음. Contract UI 에 브랜드 선택 필드가 없어(`entity_id` 는 BG 유저의 `brand_id` 자동 반영) 사용자가 의식적으로 지정하지도 않은 필드로 정당한 브랜드 변경을 400으로 막고 있었음. Restaurant 은 live entity (컨셉/방향/세무 유연 변경), Contract 는 시점 합의 스냅샷이라는 원칙으로 재정립.
- **수정 대상 5곳**: `routes/restaurants-crud.js` PUT / `routes/brands.js` plan 배정 / `routes/foodcourts.js` plan 배정 / `routes/contracts.js` POST restaurant 연결 / `scripts/cleanup-addresses.js` (brand_id/foodcourt_id 자동 교정 로직 제거, 주소 sanitize + EPR cross-brand informational 경고만 유지)
- **Subscription Plan UI 게이팅** — `ContractDetail` 의 `LinkedPlansSection` 을 `brand_plans`/`fc_plans` 모듈 보유자에게만 조건부 렌더. Basic 고객은 `financial_terms` + One-time Invoice 만으로 운영. `hooks/useAllowedRoutes` 에 `hasModule(code)` 헬퍼 + `includedModules` 노출
- **검증**: Restaurant #10 brand_id 1→4 PUT 200 OK, Contract #23 / EPR 2건 snapshot 보존, cross-brand plan assignment 차단 해제, health-check 40/40
- **설계 문서 회고 추가**: `docs/ADDRESS_STANDARDIZATION.md` §2 에 R1/R2 철회 사유/범위 기록

### Address Standardization — Global Unification
- **주소 입력 표준화** — 9개 엔티티 주소 관련 DB 스키마 통일: `country CHAR(2) ISO 3166-1 alpha-2`, `latitude/longitude DECIMAL(10,7)`, 전 엔티티에 `address_line_2 VARCHAR(255)` 추가. users/suppliers/hardware_quotes 에 6필드(city/state/postal/country) 확장
- **공용 `<AddressFields>` 컴포넌트** — 6필드 + lat/lng, 250국가 locale별 이름 select, 줄바꿈 자동차단, autoComplete 지원. Admin/Manager Restaurants, FoodcourtBranches, Suppliers, BrandManagement 5곳에 일괄 적용
- **AutoSave 패턴 페이지**에도 address_line_2 추가 — CompanyInformation, AdminSettings, BrandCompanyInfo
- **Cross-brand 정합성 3중 방어선** — (1) plan→restaurant 배정 API, (2) contract 생성 API, (3) restaurant brand_id PUT 에 R1/R2 규칙 강제 (BRAND_MISMATCH / FOODCOURT_MISMATCH 400 차단). 이전 with MIN Cafe 같은 증상 재발 방지
- **Picker UX 개선** — Manager/RestaurantsPage Link contract/plan 피커 상단에 "Linking restaurant X to Y under brand Z" amber 배너 사전 안내
- **주소 표시 유틸 `formatAddress()`** — 국가별 포맷 (MY/KR/JP/default), format: `'full' / 'short' / 'oneline' / 'location'`. BrandFranchiseMapPage 상세/리스트/팝업(+XSS escape 보너스), Brand/Foodcourt InvoiceViewModal 에 적용
- **운영 DB 사전 점검 스크립트** `scripts/audit-addresses.js` (read-only) — schema + country ISO + 줄바꿈/탭 + R1/R2/EPR 정합성 전수 점검
- **데이터 정제** — `scripts/cleanup-addresses.js` — newline sanitize, "Malaysia" → "MY" 등 country 정규화, R1 정합성 자동 교정 (dev DB 에서 Restaurant #10 brand_id 4→1 수정됨)
- **franchise-map API 500 에러 수정** — 존재하지 않는 `entity_plans.fixed_amount`/`billing_cycle` 컬럼 참조 제거, `entity_plan_prices.monthly_price` 별도 조회, `currentPlans` 배열로 변경 (한 레스토랑 다중 플랜 지원)
- **설계 문서**: `docs/ADDRESS_STANDARDIZATION.md` (11장, 30년차 리뷰 반영)
- **의존성**: `i18n-iso-countries@^7.14.0` (frontend + backend)

### Subscriptions Pending Plan Change + Foodcourt General Parity
- **Subscriptions 예정 변경 (pending) 플로우** — `/pos/brand/general/subscriptions`, `/pos/foodcourt/general/subscriptions` 에서 이미 플랜이 배정된 레스토랑에 다른 플랜을 배정하면 즉시 교체가 아니라 다음 청구 주기 날짜로 스케줄. 행에 "Scheduled change: X on YYYY-MM-DD" 배너 + Cancel 버튼 표시. 스케줄러(2AM cron)가 활성일 도래 시 자동 전환
- **Add Subscription 모달 필터** — 이미 플랜 있는 레스토랑은 드롭다운에서 제외 (기존 플랜은 Change Plan 행 버튼으로만 변경). 전부 배정되어 있으면 안내 문구
- **버튼 silent 실패 수정** — Assign / Unassign / Discount / Cancel-pending 모든 액션의 에러를 페이지 상단 토스트 + 모달 inline 으로 surface (이전엔 `console.error`만)
- **Change Plan 경고 힌트** — 다른 플랜 선택 시 "다음 청구 주기부터 적용" amber 배너 명시
- **Foodcourt Subscription 섹션** — Manager/RestaurantsPage.tsx Edit 모달에 Foodcourt General 전용 섹션 신설 (Tenancy Contract + Foodcourt Plan 2카드, 인라인 피커)
- **Foodcourt Subscriptions 페이지 + Add Subscription 버튼** — 이전엔 Export만 있었고 추가 버튼 자체 부재. 브랜드와 동일한 모달 UX
- **Contract Detail "View all plans" 버튼 심벌 제거** — "↗" 제거, "+ Issue One-time Invoice" 의 "+" 제거
- **contract.json i18n 보정** — `detail.viewAllPlans / viewAllPlansHint / linkExistingPlan / noLinkedPlansHint` 4개 언어 누락 키 추가
- **DB**: `entity_plan_restaurants` 에 `pending_plan_id`, `pending_activation_date` 컬럼 추가 (backward-compatible)

### Billing 섹션 액션 버튼 정리
- "All Plans ↗" 버튼 제거 — 인라인 2개 액션(Link / Create)이 95% 케이스를 커버하므로 중복 제거. 플랜 관리는 사이드바 네비게이션 Plans 페이지에서
- 피커 모달 "No available plans" 빈 상태에 Plans 페이지 링크 추가 — 엣지 케이스만 대비

### Contract Detail 섹션 상태 배지 + 배너 오판 수정
- "Billing plan linked" 초록 배너가 **닫힌(end_at SET)** ContractPlan도 카운트해서 잘못 표시되던 버그 — `form.plans.length > 0` → `form.plans.some(p => !p.end_at)` 로 open 링크만 체크
- 5개 아코디언 섹션(Parties/Contract/Billing/Setup/Documents) 상태 배지 로직 **완전 통일** — 이전엔 섹션마다 다른 라벨("Complete" / "N/4 filled" / "Pending" / "No plan linked" 등)로 비일관적. 수정 후 3-상태 일관:
  - **Required N** (빨강) — 다음 stage 필수 필드 부족
  - **✓ Complete** (초록) — 섹션 핵심 필드 전부 채워짐
  - **Incomplete** (회색) — 일부 입력 또는 미입력 (지금 안 해도 됨)
- 섹션별 `isSectionComplete()` 기준 정의:
  - Parties: 신청자 식별(회사/담당자) + 연락처(이메일/전화) + 발행자 회사명
  - Contract: 계약번호 + 시작일 + 종료일 + financial_terms 값 1건 이상 + (foodcourt) unit
  - Billing: open(end_at=null) ContractPlan 1건 이상
  - Setup: 필수 task 존재 + is_required=true 전부 완료
  - Documents: 문서 1건 이상


## [v3.16] — 2026-04-22 배포

### 2026-04-23 (POS 로그인 UX)
- POS 로그인 페이지 원클릭 로그인 — 데모/테스트 계정 카드 클릭 시 자동 로그인 + 역할 기반 리다이렉트. 이전엔 필드만 채워지고 별도로 "Login" 버튼을 눌러야 했음. 문구도 "sign in instantly"로 변경

### 2026-04-23 (Contract Detail Billing 섹션 UX 정비)
- Billing 섹션 상태 배지 로직 재작성 — 이전: nextStage 요구사항이 billing에 없어서 항상 "✓ Complete"로 잘못 표시됨. 수정: open plan 링크 있으면 `✓ Plan linked`, setup/active 단계이면서 billable terms 있는데 plan 미연결이면 `No plan linked`(required), plan 없고 billable terms도 없으면 `Not set up`(required), 그 외엔 `Pending`(optional)
- "Create plan from contract" 버튼 이모지(⚡) 제거 — 비인라인 아이콘이 어지러워 텍스트로 단순화
- "Link existing plan" 피커 모달 신규 — 기존 EntityPlan 목록에서 검색/선택해서 이 contract에 link. Phase 2-C 패턴 재사용(transaction 내 이전 ContractPlan close + EPR 자동 전환). 권한: 같은 entity 소속 Plan만 link 허용(403)
- "All Plans ↗" 버튼 — 이전 `window.location.href`로 전체 페이지 이동 → `window.open(_blank)` 새창
- "Issue One-time Invoice ↗" 버튼 — 새창으로 열리도록 변경(현재 Contract 페이지 유지)
- "View all invoices for this contract ↗" 버튼 신규 — 계약에 연결된 전체 invoice를 새창으로 조회
- 백엔드 `POST /api/contracts/:id/plans` 강화 — 이전: ContractPlan만 만들고 EPR 안 만듦(스케줄러가 빌링 못 함). 수정: entity ownership 검증 + transaction 내 prior ContractPlan.end_at + prior EPR deactivate + 새 ContractPlan + 새 EPR 자동 생성/재활성화. create-plan-from-contract 마법사와 동일 EPR 배선

### 2026-04-23 (Contract-Plan-Invoice 파이프라인 완결)
- Phase 2-C: Contract → Plan → Invoice 자동화 완결 — `create-plan-from-contract` 마법사가 EntityPlanRestaurant를 트랜잭션 내 동시 생성, 스케줄러가 실제로 invoice를 발행. 이전까지 0건이던 Contract 기반 invoice 자동 생성이 실동작 확인
- Phase 2-C: Contract stage 전환 시 Plan/EPR 동기화 — stage=terminated/expired/renewed 전환, /terminate 호출, subscriptionScheduler auto-expire 3경로 모두 ContractPlan.end_at + EntityPlanRestaurant.is_active=false 동시 처리
- Phase 2-C: invoiceScheduler 방어선 — 생성 invoice에 contract_id 기입 (traceability), Contract-originated Plan의 모든 ContractPlan.end_at이 닫혔으면 skip (ghost billing 차단)
- Phase 2-C: 마법사 Plan 교체 시 이전 EPR 정리 — create-plan-from-contract 재호출로 Plan 교체될 때 이전 EPR도 is_active=false 처리
- Phase 2-C: Backfill 스크립트 `scripts/backfill-contract-plan-restaurants.js` (idempotent) — 기존 orphan plan 복구
- Phase 2-D: Contract renewal Plan carry-over — `POST /contracts/:id/renew` 트랜잭션화. terms_changed=false면 이전 ContractPlan close + 새 ContractPlan create (same EntityPlan, EPR 유지). terms_changed=true면 EPR deactivate + ContractPlan close, 새 계약은 proposal
- Phase 2-E: Proration (일할 계산) — invoiceScheduler.computeProrationFactor 신규. 고정분만 factor 곱 (percentage는 활동 기반이라 자연 비례). 계약이 기간과 겹치지 않으면 invoice 스킵
- Phase 2-E: billing-preview API proration 반영 — proration_factor, period 필드 응답 추가. 검증 5 시나리오 통과: full(3000), mid-start(15/31 일할), mid-end(11/31 일할), no overlap(skip)
- Phase 2-F: Plans 역참조 — EntityPlan.hasMany(ContractPlan, as: contractLinks) 추가. /foodcourts/:id/plans + /brands/:id/plans 응답에 contractLinks include (contract_number/stage/period/applicant)
- Phase 2-F: Plan DELETE 가드 — open ContractPlan 있으면 400 차단. Foodcourt/Brand 양쪽 동일
- Phase 2-F: FE — Plan 카드 "From contract" 배지 + 상세 모달 "Linked Contracts (N)" 섹션 (계약번호/기간/stage/Open·Closed 상태)
- 설계 문서 `docs/CONTRACT_PLAN_CURRENCY.md`에 Phase 2-C/D/E/F 섹션 추가

### 2026-04-20 (저녁)
- Brand Franchise Map / Foodcourt Branch Map 독립 창 분리 — 사이드바 메뉴 클릭 시 `window.open(_blank)` 로 새 창, 사이드바 없는 standalone 레이아웃. `← Back` 으로 창 닫기
- Map 사이드 리스트 패널 — 레스토랑/지점 리스트 클릭 시 해당 위치로 지도 확대 + 상세 정보. Foodcourt Branch 클릭 시 입점 매장 서브 리스트 펼침
- 핀 스타일 정제 — 외부 보라 그림자 제거(잘림 해결), 선택 표시는 핀 내부 링. `franchise=★` / `direct=●`, 계약 없는 경우 마크 표시 안함
- Brand Map 다중 브랜드 개선 — 레스토랑 많은 순 정렬 + 드롭다운 항상 표시 + 각 브랜드 레스토랑 개수 표기
- Foodcourt Floor Plan 뷰/에디터 신규 — `/pos/foodcourt/floor-plan` (뷰, 매장 클릭 → 계약 정보 사이드 패널: Store / Tenancy Contract / Financial Terms / Restaurant 4섹션) / `/pos/foodcourt/floor-plan-editor` (에디터, 레스토랑 FloorPlanEditor 패턴 복제, FloorPlanCanvas 재사용, Add Store shape 4종 / Unplaced / Properties / Canvas 설정 Sidebar 카드, drag/resize/undo/save)
- Floor Plan 1 지점 = 1 평면도 단순화 — 에디터 진입 시 평면도 없으면 자동 생성, 다층 UI 제거
- Branch Unit Numbering 설정 — 지점 편집 모달 신규 섹션. Toggle switch + Zone cards. Prefix 토글(선택적) + Free-form textarea (콤마/줄바꿈, 범위 `01-20` `A01-A10` `05A-08A` `P-2-01A-05A` 자동 확장). Preview + 변경 Diff (Create/Delete/Blocked-by-contract) + contract 연결 유닛 삭제 시 거부
- Branch Unit Numbering 저장 시 Contract / Floor Plan / Restaurant 자동 반영 — 동기화된 Units 가 계약 생성 시 드롭다운 및 Floor Plan Unplaced Stores 에 자동 표시
- Branch 편집 모달 공용 컴포넌트화 — `CommonModal size="large"` + `FormRow/FormGroup/FormLabel/FormInput/FormSelect` 로 교체, 필드 겹침 해소, `Add Branch` (+기호 제거)
- 사이드바 Foodcourt General — Tenancy / Branch Map / Floor Plan 3개 메뉴 분리. Branches / Floor Plan / Map 은 새 창
- AddonModule `fc_floor_plan` 등록 + 모든 Foodcourt 플랜(Basic/Pro/Enterprise)에 자동 편입
- DB: `foodcourt_floor_plans` 테이블 신규 / `foodcourt_units.floor_plan_id/plan_x/plan_y/plan_width/plan_height/plan_shape` 추가 / `foodcourt_branches.unit_config JSON` 추가
- Backend API — `GET/POST/PUT/DELETE /api/foodcourt-branches/:id/floor-plans`, `PUT /api/foodcourt-floor-plans/:id/layout` (batch 배치), `GET /api/foodcourt-units/:id/detail` (계약 join), `POST /api/foodcourt-branches/:id/sync-units` (preview/confirm, contract 보호)
- ProtectedRoute brandLevelRoutes 에 `/pos/brand/franchise-map`, `/pos/foodcourt/tenancy-map`, `/pos/foodcourt/floor-plan(-editor)` 추가
- i18n 4개 언어 — Floor Plan / Unit Numbering / Map 관련 40+ 키

### 2026-04-20
- Manager 지점/브랜드 접근 enforcement — `users.branch_id/brand_id` 기반으로 contracts / invoices / units / branches / restaurants 5개 라우트에 실제 필터 적용. `getManagerScope()` 헬퍼 + `req.user.branch_id` 노출. 통합 테스트 8/8 pass
- Contract 리스트 Active Pipeline / Archive 탭 — expired 드롭다운 누락 버그 수정. Pipeline은 4단계(proposal~active) 유지, Archive는 List 뷰 강제 + stats 3종(terminated/expired/renewed)
- Restaurant 리스트 Operational / Archive 탭 — Suspended는 Operational에 유지 (결제 주의 놓치지 않게). 백엔드 `/api/restaurants?status=` 다중값 필터 추가
- Brand Franchise Map 신규 — Leaflet + OpenStreetMap, 클러스터링, 상태별 핀 색상 5종, Franchise=★ / Direct=● 구분, 핀 크기 = 최근 30일 매출, 점선 원 = territory radius (`exclusivity_terms.radius_km`), Un-mapped 매장 리스트
- Foodcourt Tenancy Map 신규 — Branch 큰 핀(점유율 % 표시) + 입점 Restaurant 작은 핀(계약/매출), territory radius 동일 적용, 유닛 통계 (total/occupied/vacant/reserved)
- 수동 좌표 편집 UI — Restaurant(Admin 신규+편집 모달), FoodcourtBranch 폼에 latitude/longitude 입력 필드
- Auto-Geocoding (Nominatim) — POST/PUT 주소 변경 시 비동기 훅 (응답 차단 없음). 수동 좌표가 있으면 우선. `utils/geocoding.js` (1 req/s 스로틀)
- DB `restaurants.latitude/longitude DOUBLE NULL` 컬럼 추가 + backfill 스크립트 (`scripts/backfill-restaurant-geocode.js` dry-run 지원)
- AddonModule 등록 — `brand_franchise`, `fc_tenancy`, `fc_branches` 신규 모듈. 모든 Brand/Foodcourt 플랜(Basic/Pro/Enterprise)에 자동 포함 (`scripts/register-map-modules.js` idempotent)
- i18n 4개 언어 확장 — tabs + franchiseTabs + map legend + latitude/longitude 키 (en/ko/zh/ms)


## [v3.15] — 2026-04-19 배포

### 2026-04-19
- Sidebar 실시간 뱃지 갱신 — 전역 소켓 이벤트 `order-created/items-added/updated`에 뱃지 재조회 호출 추가 (기존 15초 polling 대기 → 즉시 반영)
- Contract 리스트 카드 UX — 금액 요약 블록 (플랜 연결시 플랜 값, 미연결시 financial_terms + "pending plan" 힌트), 잔여기간 태그 (expired/warning/normal), Foodcourt 카드 유닛/location_description 표시. 공용 헬퍼 `utils/contractBillable.ts` 신규 (getBillableSummary, getRemainingInfo)
- Contract 리스트 파이프라인 레이아웃 정렬 — Column 회색 배경 제거, gap 8px, width 100% — 상단 StatsGrid 와 좌우 full 정렬
- Contract Detail Tab → Smart Accordion 전환 — Parties/Contract/Setup/Documents 4개 섹션 아코디언화. `FormAccordion`+`FormAccordionSection` 신규 컴포넌트, 섹션별 상태 배지 (✓ Complete / ⚠ N required), RequiredBanner 집계 + chip click→scroll, ReadyBanner 초록 안내, 외곽 박스 제거 (선 구분만)
- Contract Detail 필드 하이라이트 — 필수 부족 필드 빨간 테두리 + 인라인 에러 메시지, chip 클릭시 보라 pulse 애니메이션 (1.2s × 2회) 및 smooth scroll
- 버튼 정책 전환 — "필수 부족 시 disabled" → "클릭 허용 + 자동 섹션 펼침/스크롤". UI_DESIGN_GUIDE 4.4 개정
- Notes & Comments 제목/구분선 중복 제거 — CommentSection `titleText` prop + `$embedded` 스타일 (외부 제목 없애고 "Notes & Comments (N)" 단일로 통합)
- Documents 필수 제거 — 외부 DMS 사용 가능 반영. Contracting→Setup 전환 시 Documents 업로드 강제 요건 삭제
- P0 #1 Foodcourt `unit_id` 필수 — Contracting→Setup 시 entity_type='foodcourt' && !unit_id 검증 추가 (기존 허점 보완)
- P0 #2 Applicant 식별 OR 조건 — `applicant_company_name` 또는 `applicant_contact_person` 중 하나만 있으면 통과 (개인 자영업자 대응)
- P0 #3 `contract_tasks.is_required` 필드 신규 — Setup→Active 전환 시 `is_required=true` task만 완료 요구. Marketing 지원 등 진행형 task 유연성 확보. SetupChecklist UI 에 Required/Optional 토글
- i18n 4개국어 13키 추가 (en/ko/zh/ms) — banner/section/applicant/unit/task 관련
- Accordion 패턴 UI_DESIGN_GUIDE 14장 신설
- 설계 문서 `docs/CONTRACT_DETAIL_UX.md` 실제 구현 기준으로 최신화
- Contract 만료 임박 알림 — renewal_alert_months + D-7 2단계 이메일 자동 발송, 만료 하루 경과 시 자동 stage='expired' 전환, Brand/Foodcourt General 팀 + applicant 별도 이메일. 상세 페이지 상단 ExpiryBanner + URL `?action=renew` 자동 Renew 트리거
- Contract → Invoice 추적 연결 — `invoices.contract_id` 컬럼 신규, Contract 상세 Accordion "Billing" 섹션 (Recurring Subscriptions + One-time Invoices + Negotiated Financial Terms 참조), "+ Issue One-time Invoice" 버튼 → Invoice Create Modal 자동 prefill (payer/brand/foodcourt/contract 정보 자동 채움)
- Foodcourt Branch 시스템 신규 — `foodcourt_branches` 테이블 신설, 1 Foodcourt = N Branch 지원. 지점 코드 기반 유닛 식별 (`SUNWAY-A01`, `PAVILION-A01` 형식). 지점별 주소/연락처/운영시간/위경도/inactive 전환 지원. Foodcourt General 전용 사이드바 "Branches" 메뉴 + 전용 관리 페이지. 기존 Foodcourt 자동 마이그레이션 (primary branch 생성)
- Foodcourt Unit 지점별 유일성 — `(branch_id, unit_number)` unique 제약. 서로 다른 지점에 같은 유닛 번호 허용. 지점 간 유닛 이동 지원. inactive 지점에는 신규 유닛 차단
- Contract Pipeline 카드 / Contract Detail Unit 섹션 — 유닛을 `CODE-UNIT (Branch Name)` 형식으로 표시 (예: `SUNWAY-A01 (Sunway Pyramid)`)
- Foodcourt Manager 지점 할당 — `users.branch_id` 컬럼 신규, FoodcourtStaffPage Add/Edit 모달에 "Branch Assignment" Select (All branches / 특정 지점). JWT payload에 branch_id 포함
- Brand Manager 브랜드 할당 — 여러 Brand 소유 Brand General이 Manager 추가 시 "어느 Brand에 소속시킬지" Select 필수. Manager 목록은 소유한 모든 Brand에서 통합 조회
- Brand 권한 로직 owner_id 기반으로 개편 — `req.user.brand_id` 단일 비교에서 `brand.owner_id === req.user.id` 로 전환 (6개 라우트). 다중 브랜드 소유자가 primary 외 브랜드에도 Manager 생성/수정/삭제 가능
- Invoice PUT IDOR 취약점 수정 (보안) — `Number(null) === Number(null)` = `true` 버그로 인해 타 엔티티가 인보이스 수정 가능했던 점 차단. issuer_type/id + restaurant_id null-safe 비교로 System Admin / 발행자 / 수신 restaurant 만 편집 허용
- Restaurant ↔ Branch 연결 — `restaurants.branch_id` 컬럼 신규. Foodcourt General이 레스토랑 생성/편집 시 Branch Select로 입점 지점 지정 가능 (branch ↔ foodcourt 일관성 검증 + inactive 차단). 레스토랑 리스트 응답에 branch 정보 포함
- Foodcourt General 레스토랑 스코프 버그 수정 — `/api/restaurants` 에서 Foodcourt General이 전체 레스토랑을 보던 문제 수정. `optionalAuth`가 foodcourt_id를 req.user에 누락시킨 버그 동시 수정. 이제 본인 foodcourt 내 레스토랑만 조회
- Foodcourt General Admin 관리 페이지 레스토랑 드롭다운 수정 — `/api/restaurants/manager/:managerId` 가 RestaurantManager 조인만 사용해서 Foodcourt General에는 빈 목록 나오던 버그. Role 분기 추가로 Foodcourt General/Manager 는 `foodcourt_id` 기반 조회
- Foodcourt 사이드바 정리 — obsolete "Foodcourts" Coming Soon 플레이스홀더 제거, "Branches" 메뉴를 Management 섹션 첫번째로 이동
- FoodcourtStaffPage 버튼 스타일 표준화 — 얇던 버튼 (8px 16px) → 표준 사이즈 (12px 20px, border-radius 8px, font-weight 600)
- Documents 필수 차단 제거 — Contracting→Setup 전환 시 Documents 업로드 강제 요건 삭제 (외부 DMS 사용 가능)
- ContractDetail Financial Terms 섹션 상태 배너 — 플랜 연결됨/미연결 상태에 따라 상단에 "Billing plan linked" 초록 배너 또는 "No billing plan linked" 노란 배너 표시 (카드/상세 일관성)

### 2026-04-18
- Contract Management Enhancement Phase 1 구현 — 당사자/발행자 정보 확장 + 4탭 UI (Parties/Contract/Setup/Documents), 신규 컴포넌트 3개 (BankInfoField, RepresentativeField, SyncMasterToggle)
- Contract Phase 1.5 — Brand/Foodcourt 마스터 정보 수정 시 issuer_sync_with_master=true 계약(proposal/contracting/setup 단계만) 자동 전파 훅
- Contract Phase 2 — Tenancy/Franchise 재무 조건 확장, RentScheduleEditor(연도별, 모바일 카드 뷰) + PercentageRentField 컴포넌트, financial_terms JSON 스키마 validate 훅
- Contract Phase 3 — 계약 조항 5종 JSON 컬럼 추가 (special_conditions/renewal_policy/exclusivity_terms/support_services/legal_terms), Support Services 카탈로그 (Brand/Foodcourt 각 12개), Setup 단계 진입 시 체크된 지원업무 항목 자동 태스크 생성, 신규 컴포넌트 3개 (ConditionListEditor, SupportServicesChecklist, LegalTermsEditor)
- Contract 필수 필드 UX — 라벨에 빨간 `*` 표시 + 필수 미입력 시 상단/하단 "Proceed" 버튼 disabled + tooltip + 단계 전환 에러에 누락 필드명 구체화
- Contract Detail 상단 HeaderActions — 긴 스크롤 없이 상단에서도 "Proceed to X" / "Renew" / "Terminate" 액션 가능 (하단 버튼과 동기화)
- Inquiry Close 버튼 버그 수정 — Brand/Foodcourt Operation Inquiry 카드의 Close 버튼 PATCH → PUT 메서드 변경 (silent fail 해소)
- Inquiry 모달 Close 버튼 UX 변경 — 우측 상단 X = 모달 닫기, 하단 Close Ticket 버튼 = 티켓 상태 closed로 변경 (이미 closed/resolved면 버튼 숨김). 11개 Inquiry 페이지 전체 적용 (Operation × 5 + System × 6)
- UI_DESIGN_GUIDE 4.3/4.4 신규 섹션 — 주요 액션 버튼 상단/하단 양쪽 배치 규칙 + 필수 미입력 시 버튼 비활성화 규칙 명문화
- `/검증` 스킬 8단계 UI/UX 품질 확장 — 7개 서브카테고리 (디자인 시스템/트렌드 디테일/기능 적합성/반응형/i18n/접근성/실제 확인 방법)

### 2026-04-17
- Contract Management Enhancement 설계 완료 (4단계 + 30년차 3개 관점 검증 반영) — 구현은 다음 세션. 주요 보완: issuer 마스터 동기화 토글, financial_terms JSON 검증, Support Services↔Tasks 연동, legal_terms 컬럼, 4탭 인터페이스 도입
- Contract Information 레이아웃 재구성 — 2열×3행 6필드 (Number/Type/Period/SigningDate/Duration/Remarks)
- Contract Franchise/Tenancy Terms 통화 심볼 표시 (`RM 5,000.00` 형식) + Security Deposit 필드 재확인
- Contract Applicant Information 분리 — "Name" 하나 → "Company Name" + "Contact Person" 2개
- ContractDetail 자동저장 실패(빨간 !) fix — whitelist 필드만 PUT
- Link Restaurant 검색 수정 — 백엔드 search/limit 쿼리 지원
- Brand General Dashboard — Active Contracts 위젯 신규 (총 개수 + 최근 5개 목록 + View all)
- Date Input 전면 통일 — `<input type="date">` 42곳 제거, DateField/DateRangeField 컴포넌트 신규 (25개 파일 적용)
- C-6 거대 컴포넌트 분할 — LiveOrders/Admin·Brand·Foodcourt Invoices 4개 파일 17,452→7,015줄 (60% 감소)

### 2026-04-16
- 모바일 주문 영수증 다운로드 (PNG) + 공유 (WhatsApp/Telegram/Web Share) 기능 추가
- 모바일 주문 API 응답에 재무 데이터 + 레스토랑 정보(사업자번호/세금번호) 포함
- branch_name 표시 전수 점검 — 25개 파일 일괄 `getRestaurantDisplayName()` 유틸 적용
- Recipe 이미지 base64 → 파일 전환 (3건 마이그레이션)
- N:M 조인 테이블 DROP — `brand_product_brands`, `supplier_brands` 삭제 + 죽은 코드 제거
- 구독 전환 이메일 보강 — Active→Overdue, Entity(Brand/Foodcourt/Owner) 전환 알림 추가
- 인보이스 연체 리마인더 — D+3/D+7/D+14 발행자 SMTP로 자동 발송
- 타임존 전체 적용 — `toLocaleString` 계열 ~200곳 유틸로 교체 (~74파일)
- nginx 권한 수정 — 500 에러 해결
- `/기능설계` 스킬 신규 추가 (대규모 기능 개발용 6단계 체계)

### 2026-04-15
- 모바일 주문 카테고리 전환 시 전체 페이지 리로딩 현상 제거 (inline fetch, isLoading 상태 토글 생략)
- 모바일 이미지 파이프라인 전면 재작성 — base64 저장 구조를 파일 URL 로 전환, 운영 DB `products.image` 35.4MB → 0.01MB (289건 sharp 변환)
- 모바일 상품 상세 API 500 에러 복구 (`getPreparationTime is not defined` ReferenceError)
- 모바일 메뉴 카테고리별 초기 로드 + 메모리 캐시 (`categoryCacheRef`) — 재방문 시 네트워크 0
- 이메일 엔티티 브랜딩 시스템 구축 — Restaurant/Brand/Foodcourt 자체 로고·이름·색상을 이메일 헤더/푸터에 반영
- 고객 비밀번호 리셋 메일: 레스토랑 SMTP 우선 → 없으면 플랫폼 fallback, 항상 레스토랑 브랜딩 유지
- Notification 이메일 (공지/댓글/인보이스/티켓): 수신자 entity 브랜딩으로 자동 재렌더 (notificationTemplates metadata + notificationService 재렌더 파이프라인)
- 엔티티 브랜딩 이메일에서 PurpleHere 로고/링크 완전 제거 (헤더 `<a>` 래퍼 + 푸터 링크 + unreferenced CID 첨부 모두 조건부 제거)
- `emailLayout` 로고 텍스트 fallback — 로고 없는 엔티티는 브랜드 이름 텍스트 표시 (PurpleHere 기본 로고로 오해되던 문제 해결)
- 이메일 로고 바이너리 pre-resize (sharp, height 40px / max-width 280px) — CSS 스케일링 의존 제거로 와이드 배너 overflow 방지
- System Admin 발송 메일(POS 비밀번호 리셋/회원가입 환영/랜딩 문의 등)은 기존과 완전 동일 (PurpleHere 브랜딩 유지)

## [v3.14] — 2026-04-14 배포

### 공지 가시성 + Updates 카테고리 배지 (배포 2 — hotfix)
- **증상 1**: 릴리즈 공지가 `/pos/admin/notices` 에 안 보임. 이전 v3.13 공지까지 전부 누락
- **원인**: `/api/notices/sent` 가 `where: { author_id: req.user.id }` 로 본인 작성만 반환. release-post 스크립트가 author=1 로 고정 생성 → Irene(id=4) 로그인 시 0건
- **수정**: System Admin 로그인 시 `author_id IN (모든 System Admin ids)` 로 확장. 다른 역할은 기존대로 본인 작성만
- **증상 2**: 리스트가 "NORMAL" 만 보이고 Updates 카테고리 표시 없음
- **원인**: `NoticesPage.tsx` 5개 역할 모두 `notice.category === 'guide'` 만 배지 렌더, `updates` 누락
- **수정**: 5개 역할 페이지 전부 `updates` 카테고리에 보라색 "Updates" 배지 추가 (기존 `guide` 패턴 재사용)
- **검증**: 운영 Irene (id=4) `/sent` 응답 0 → 14건 (v3.14 포함). 배포 2 smoke 10/10 (07:14 UTC, `main.3fe57608.js`)

### 인보이스 발행자 은행계좌 정보 복구 + PDF 안전 분할
- **증상**: Brand/Foodcourt 가 Payment Settings 모달에 입력한 은행계좌가 인보이스 뷰/프린트/다운로드 어디에도 표시 안 됨. 2장 넘는 긴 인보이스는 PDF 다운로드 시 글자 중간에서 잘림
- **원인 1**: `invoices-helpers.js getIssuerCompanyInfo` 가 brand/foodcourt 분기에서 legacy `brand.bank_name` 직접 컬럼만 읽고 `payment_settings.bankTransfer[currency]` JSON 을 무시
- **원인 2**: 메인 `/api/invoices` GET transform 이 `issuerInfo` 필드를 응답에 포함 안 함. Admin 프론트는 `companySettings.bankName` (별개 엔드포인트) 을 사용하는데 여긴 은행정보 없음
- **원인 3**: 5개 역할 페이지 모두 `html2canvas` → 단일 PNG → 297mm 고정 height slice 로 기계적 분할. 행 중간 절단 방지 장치 없음
- **수정 (백엔드)**: `extractBankFromPaymentSettings(payment_settings, currency)` 헬퍼 추가. brand/foodcourt 분기에서 payment_settings 우선, legacy 컬럼 폴백. 메인 GET 에 `issuerInfo` 추가 (캐시로 N+1 방지)
- **수정 (프론트)**: `dev-frontend/src/utils/invoicePdf.ts` 신규 — `renderIframeToPdf()` 로 캔버스 픽셀 행 스캔 (흰색 행) 후 안전 분할. `INVOICE_PRINT_CSS` 상수 — `.summary-section`, `.items-table tr`, `.bank-section` 등에 `page-break-inside: avoid`. 5개 invoice 페이지 (Admin/Restaurant/Brand/Foodcourt/Owner) 모두 공통 util 호출로 중복 로직 제거
- **수정 (Admin/Brand/Foodcourt view)**: HTML 템플릿 + React 뷰 모달 모두 `invoice.issuerInfo?.bankName` 우선, `companySettings` 폴백
- **검증**: API 실호출 — System Admin 34건 중 33건 issuerInfo.bankName 채움 (1건 EUR 미설정), Brand General 8건 전부 `payment_settings.bankTransfer.MYR` 기반 bank info 매칭. health-check 39/39. 뷰/프린트/다운로드 3경로 모두 표시 확인

### Kitchen Stations 3개 이슈
- **증상 1**: 신규 레스토랑이 메뉴 아이템에 카테고리 다 배정했는데도 "2 uncategorized menu items" 오경고 표시
- **원인**: `SettingsPage.tsx:4697` 필터가 `p.category` 를 검사하는데 백엔드 `/api/menu` 응답은 `categoryId` (camelCase) 로 반환 → 항상 undefined → 전부 오탐
- **수정**: `p.categoryId ?? p.category_id` 둘 다 허용
- **증상 2**: 주방이 1개뿐인데도 복잡한 Assignment Mode 카드 + 경고 배너 표시. 사용자가 "세팅 안 해도 되는데 헷갈린다" 호소
- **수정 (백엔드)**: `kitchen-stations.js GET /` 에서 stations 0개이면 "Kitchen" default station 자동 INSERT (lazy create)
- **수정 (프론트)**: stations ≤ 1 일 때 초록색 안내 배너 ("You have 1 kitchen station. All orders will be routed here. No setup needed.") 표시 + Assignment Mode 카드 + Unassigned 경고 블록 숨김
- **증상 3**: 대시보드 "Complete Your Setup" 체크리스트에서 "Set up Kitchen Stations" 가 설정 후에도 체크 안 됨
- **원인**: `useSetupStatus.ts:103` 가 `result.data` 를 array 로 취급하는데 실제 응답은 `{ data: { assignment_mode, stations: [...] } }` 구조 → 항상 length=0
- **수정**: `result.data?.stations || []` 로 올바르게 파싱
- **검증**: lazy create idempotent (Settings/KitchenDisplay/Dashboard 3경로 동일 ID 반환, DB 중복 없음)

### Legacy email 템플릿 2개 → emailLayout() 교체
- **증상**: 운영에서 신규 회원가입 admin 알림 이메일이 옛날 템플릿으로 발송 — 로고 없음, 텍스트 `<h1>PurpleHere</h1>` 헤더, "No-reply email" 레거시 footer
- **원인**: 2개 사이트가 `emailLayout()` 미사용 raw HTML
  - `services/authService.js:437 notifyAdminNewSignup` (이번 운영 사건의 템플릿)
  - `routes/public.js:356` 문의 답변
- **수정**: 둘 다 `bodyContent` 만 구성 → `emailLayout(bodyContent)` 로 래핑. `sendPlatformEmail` 이 `cid:purplehere-logo` 자동 감지 → `getLogoAttachment()` 로 로고 CID 첨부
- **검증**: 테스트 이메일 실발송 → 신규 템플릿 렌더링 확인 (액센트 바 + 로고 + preferences footer). 다른 모든 email 발송 사이트 감사 — 모두 `emailLayout()` 기반 정상

### POST /api/restaurants 역할 가드 보강 (HIGH 보안 갭)
- **증상**: `POST /api/restaurants` 에 `requireRole` 미들웨어 없음. `validateBrandPermission` 은 brand_id 파라미터가 있을 때만 작동하므로 Restaurant Admin/Staff/Customer 가 brand_id 생략하고 호출하면 restaurant 생성 가능
- **수정**: `restaurants-crud.js:638` 에 `requireRole('System Admin', 'Brand General', 'Brand Manager', 'Foodcourt General', 'Foodcourt Manager', 'Restaurant Owner')` 명시 추가. 회원가입 흐름은 `authService.js:193 Restaurant.create` 직접 호출이므로 이 endpoint 미경유 — 영향 없음
- **영구 안전망**: `scripts/health-check.js` 에 "Restaurant Admin POST /restaurants → 403 (역할 가드)" regression test 추가 (39 → 40)
- **검증**: 8개 역할 매트릭스 — 6 allow + 2 BLOCK. Attack 시나리오 — Restaurant Admin 가 POST 시도 → 403, DB 에 생성 안 됨. Write→Read 왕복 (System Admin) 201 → GET 200 확인

## 2026-04-13 배포 4 — Brand Cross-Tenant 누수 fix (치명 보안, 버전 미상승)

### Brand General 격리 (운영 발견 누수)
- **증상**: BG 사용자가 다른 BG 소유 재료/공급업체/상품을 조회/수정 가능 (`/pos/brand-ingredients`, `/pos/suppliers`)
- **모델 정립**: 한 BG가 여러 brand를 소유 (`brands.owner_id`). 재료/공급업체/BG 프로덕트는 BG 소유자 단위 공유. 레시피는 브랜드별 사용
- **DB 변경**: 7개 BG-level 테이블에 `owner_user_id` 컬럼 추가 (`product_ingredients`, `product_ingredient_categories`, `suppliers`, `brand_products`, `brand_product_categories`, `brand_product_option_groups`, `brand_product_options`). 2개 brand-level 테이블에 `brand_id` 컬럼 추가 (`product_recipes`, `product_recipe_categories`)
- **운영 백필**: 기존 N:M 조인(`brand_product_brands`, `supplier_brands`) + 레시피→재료 추적으로 자동 백필. 한국 음식 K-DINE 시리즈 고아 데이터(재료 7건, 카테고리 4건, 레시피 2건, 공급업체 1건)는 K-DINE owner(user 23)에 수동 할당
- **신규 미들웨어** `middleware/brandScope.js`: `requireBGScope`/`applyBGFilter`/`assertBGOwnsRow` (BG 단위) + `requireBrandScope`/`applyBrandFilter`/`assertBrandOwnsRow` (브랜드 단위, `brands.owner_id` 검증)
- **라우트 패치 (6개)**: product-ingredients.js / product-ingredient-categories.js / product-recipes.js / product-recipe-categories.js / suppliers.js / brand-products.js — GET 필터 + POST owner 자동 세트 + PUT/DELETE 소유권 검증 (404 존재 은닉)
- **suppliers.js**: `|| supplier.connectedBrands.length === 0` 폴백 제거 (누수의 직접 원인). N:M `supplier_brands` 읽기 중단
- **`isBrandManager` free pass 제거**: URL에 brand_id가 없을 때 `Brand.count({where:{owner_id:user.id}})` 검증 (dangling BG 차단)
- **9개 모델** 업데이트 — owner_user_id 또는 brand_id 필드 추가
- **검증**: dev 21/21 격리 테스트 통과, health-check 39/39, 운영 smoke 10/10
- **운영 영향**: 배포 후 user 23(K-DINE)/user 24(K-Taste)/user 29(The Fire) 각각 본인 데이터만 표시. 교차 GET/PUT/DELETE 모두 404

### 이월 항목 (이전 [Unreleased])
- AddonModule 전체 역할 1:1 분리 (restaurant/brand/foodcourt/owner). 신규 8개 advanced 모듈: `work_manuals`, `ingredients`, `suppliers`, `brand_work_manuals`, `brand_ingredients`, `brand_suppliers`, `fc_work_manuals`, `owner_work_manuals`. dev + 운영 DB 직접 반영 (코드 변경 없음)
- `inventory_management` + `brand_inventory` 모듈 이름을 "Inventory & Supplier Management" → "Inventory"로 정리 (suppliers가 독립 모듈로 승격)
- 기존 플랜 자동 마이그레이션 없음 — System Admin이 `/pos/admin/plans`에서 수동 체크 필요

## 2026-04-13 배포 3 — 인보이스 안정화 + Dangling Admin 가드

### 인보이스 인쇄/PDF/View i18n + 레이아웃
- 인보이스 인쇄/PDF/View 모달의 i18n 키가 그대로 출력되던 버그 수정 (5개 역할)
- 인보이스 PDF가 1장에 잘리던 문제 해결 (다중 페이지 분할 + iframe 동적 높이)
- 인보이스 금액 RM이 줄바꿈되던 UI 깨짐 fix (`white-space: nowrap`)
- Pricing 페이지 탭별 URL 딥링크 (`/pricing?tab=brand` 등)

### 인보이스 정합성
- Payment Settings 변경 시 미결제 인보이스 자동 재계산 + "수정됨" 배지 자동 표시
- 시스템 자동 수정도 modification_history 기록 (수동 수정과 동일 UX)
- 인보이스 view 모달 크래시 fix (modification_history 이중 인코딩 + 양형식 호환 렌더러)
- Hardware 인보이스 QTY/단가 표시 정상화 (description "x4" → 별도 quantity 컬럼)
- Hardware Quote 모달 payment_settings 자동 로드
- 인보이스 삭제 시 hardware_quotes FK 해제 (500 에러 제거)

### Brand ↔ Restaurant 연결
- Brand General 레스토랑 생성/편집에 "Link to Brand" 드롭다운 신규 (브랜드-레스토랑 연결 UI)

### Dangling Restaurant Admin 가드 (치명)
- 백엔드 `POST /api/users`: role이 Restaurant Admin/Staff인데 restaurant_id 없이 생성 요청 시 400 차단
- 백엔드 `PUT /api/users/:id`: restaurant_id 클리어 또는 role 변경으로 dangling 상태 만드는 시도 차단
- 백엔드 `POST /api/users`: `skipVerification is not defined` ReferenceError 수정 (req.body destructure 누락)
- 프론트 `App.tsx`: `user.restaurantId || '1'` 하드코딩 폴백 제거 — dangling 사용자에게 `NoRestaurantAssigned` 에러 화면 렌더 (다른 테넌트 누수 차단)
- 프론트 `ProtectedRoute.tsx`: restaurant-scoped 역할이 restaurant_id 없이 `/restaurant/:id/*` 접근 시 `/pos`로 바운스. `|| '1'` 폴백 4건 모두 제거
- 프론트 `LoginPage.tsx` / `OperationInquiryPage.tsx`: 하드코딩 폴백 정리

## 2026-04-13 배포 2 (v3.13 유지 — 회계/인보이스 정합성 복구)

### Payment settings → Invoice additional_charges 자동 적용 (치명)
- fix(services/subscriptionInvoiceService.js): 기존엔 tax 6% 하드코딩이었는데, 이제 `SystemSettings.payment_settings.additionalCharges[currency]`에서 조회해 적용. enabled=true + rate>0 인 charge만 필터. 각 charge를 `{name, rate, amount}` JSON으로 `invoices.additional_charges` 컬럼에 저장
- fix: `invoices` 테이블의 `total_amount`가 base + 모든 charge 합으로 정확히 계산됨 (이전엔 6% 고정이라 SST 이외의 service charge 등이 누락)
- fix(syncPendingInvoice): 비교 로직에 `additional_charges` 포함. total_amount는 같아도 charges JSON이 다르면 업데이트 수행

### A 방안: Activate Subscription 토글 (하드웨어 전용 고객 대응)
- feat(restaurants-crud.js POST): `activate_subscription` 플래그 수용. false면 `createInitialInvoice` 호출 skip
- feat(Admin/RestaurantsPage 생성 모달): "Activate subscription now" 체크박스 추가. 기본 ON (backward compat). OFF 시 주황 배경 + 경고 텍스트 "No subscription invoice will be generated"
- 유스케이스: 하드웨어만 주문한 고객 / 플레이스홀더 계정 / 파트너 셋업 등 — 구독 결정 전까지 인보이스 미발행. 나중에 PUT으로 플랜 변경 시 자동 동기화 (no_pending → createInitialInvoice 전환)

### Unknown Restaurant 표시 제거
- fix(routes/invoices-main.js): customerName/customerCompany/payerName/restaurantName 전부 폴백 체인 변경. `restaurant?.name → external_payer_company → external_payer_name → '—'`. "Unknown Restaurant" 텍스트 완전 제거

### 운영 DB 인보이스 정비
- chore: INV-2025110001 (Sunway Pyramid Basic Annual) — additional_charges=[{SST, 6, 29.40}] 수동 추가
- chore: INV-2025110002 (KFC Professional Monthly) — additional_charges=[{SST, 6, 5.94}] 수동 추가
- INV-2026040001 (Enterprise)는 이미 정상 (189.74 + SST 10.74)

### 선행 이슈 기록 (다음 세션)
- `POST /api/restaurants`에 `requireRole` 없음. Staff/Brand Manager도 restaurant 생성 가능한 보안 갭. DEVELOPMENT_PLAN.md에 HIGH로 기록

## 2026-04-13 배포 (v3.13 유지 — 시스템관리자 버그 수정 위주)

### 구독 플랜 한도 시스템 정합성
- fix(users.js POST): Staff / Restaurant Admin 생성 시 `staff_limit` 체크 로직 추가. 초과 시 403 + `{limit, current, upgradeRequired}` 반환. 이전엔 플랜 한도 무시하고 무제한 생성 가능했음 (치명)
- fix(subscriptions.js): Downgrade 검증에 `order_limit` 체크 추가. 기존엔 staff/menu만 체크 → Professional→Basic 같은 다운그레이드 시 월 주문 한도 위반해도 통과하던 버그
- feat(Profile/SubscriptionTab): 플랜 사용량 섹션 신규. Staff / Menu Items / Orders (this month) 3개 카드 + 진행바. 80% 접근 시 주황 경고 배너, 100% 도달 시 빨강 차단 배너 자동. 이전엔 백엔드가 `current_usage` 반환하는데 프론트가 렌더 안 함
- fix(Profile/SubscriptionTab): Unlimited 플랜(`-1`) 처리 추가 — "Unlimited" 텍스트 표시, 진행바 숨김

### 사용자/매니저 검색 수정
- fix(users.js GET): `?search=` 파라미터 지원 추가. `%term%` LIKE substring 매칭으로 중간글자 검색 가능. 이전엔 param이 무시되어 프론트가 전체 목록을 받고 `slice(0,20)`으로 잘라서 알파벳 순 상위 20명만 보이던 버그 — Hardware Quote 등에서 Restaurant Admin 검색이 작동 안 하던 근본 원인
- fix(users.js GET): `?q=` 파라미터도 backward compat로 수용

### Hardware Quote → Link Restaurant Admin 전용
- feat(Admin/HardwareQuotesPage): "Link User" → "Link Restaurant Admin" 이름 변경. 하드웨어 인보이스가 레스토랑 관리자에게 청구되므로 역할 명확화
- feat(Admin/HardwareQuotesPage): 검색 쿼리에 `role=Restaurant Admin` 필터 추가 + client-side 이중 필터 방어. 다른 역할(Manager, Staff 등) 노출 차단
- feat(Admin/HardwareQuotesPage): 모달 내부에 설명 텍스트 추가 ("Only Restaurant Admins are shown — hardware invoices are billed to the restaurant admin")
- feat(Admin/HardwareQuotesPage): 검색 결과 없음 메시지 명확화 ("No Restaurant Admin found matching your search")

### 공지 Updates 카테고리 UI
- feat(NoticesPage x5 — Admin/Brand/Foodcourt/Owner/Restaurant): 카테고리 필터 탭에 `Updates` 추가. 이전엔 백엔드 Notice.category ENUM에 'updates' 있는데 프론트 타입/필터/라벨이 'general'/'guide' 만 하드코딩되어 Updates 카테고리 공지(v3.0.1~v3.13 릴리즈 노트 12건 포함)가 탭에서 필터링되지 않던 문제

## [v3.13] — 2026-04-12 배포 (구독/인보이스 시스템 정합성 복구 + 업무매뉴얼/News 신규)

### 구독/인보이스 정합성 복구 (치명 버그 수정)
- fix(users.js POST): Brand General / Foodcourt General 유저 생성 시 구독 필드(plan_type, plan_amount, billing_cycle, subscription_start/end, trial_end_date 등)가 저장 안 되던 버그. role 체크가 'Restaurant Owner' 만 되어 있어 Brand General/Foodcourt General은 프론트에서 보낸 구독 정보가 무시됨. 이게 프로덕션에 Brand/Foodcourt 인보이스 0건인 근본 원인
- fix(users.js POST): Restaurant Owner 구독의 `calcSubscriptionEnd` 변수가 정의 안 되어 `subscription_end`가 `undefined` 저장되던 버그
- fix(users.js POST): `subscription_status` 논리 오류 — `subscription_start ? 'active' : 'trial'` 이 아니라 "start가 미래면 trial, 오늘/과거면 active"로 수정
- feat(users.js POST): Brand General / Foodcourt General / Restaurant Owner 생성 시 첫 구독 인보이스 자동 발행 (레스토랑 생성과 동일 패턴)
- feat(users.js PUT): 구독 필드 변경 시 미결제 인보이스 자동 동기화. 미결제 인보이스 없으면 신규 생성
- feat(restaurants-crud.js PUT): 구독 필드 변경 시 미결제 인보이스 자동 동기화. 결제된 인보이스는 절대 건드리지 않음 (`status IN ('draft','pending_payment','overdue')` 필터)
- fix(invoiceScheduler.js `isTodayAdvanceOf`): 정확히 14일 전인 날에만 true 반환하던 1일 창문 브리틀니스. Catch-up 모드(`today >= generationDate`)로 전환. cron 하루 실패해도 다음날 발행됨. 중복 방지는 기존 `billing_period_start` 체크로 보장

### 리팩토링 — 공용 인보이스 헬퍼
- refactor(services/subscriptionInvoiceService.js 신규): Restaurant/User 공용 `createInitialInvoice(subject)` + `syncPendingInvoice(subject)`. 기존 `routes/restaurants-crud.js` 의 인보이스 생성 로직을 헬퍼로 교체. `invoice.modification_history` JSON에 before/after/reason 감사 추적 기록
- refactor(utils/subscriptionDates.ts 신규): `calcEndDate`, `deriveStatus`, `calcTrialEnd`, `formatDateISO`, `parseDateLocal` 공용 날짜 함수

### 레스토랑/매니저 등록 UI
- feat(Admin/RestaurantsPage): End Date 필드 readonly 전환 (자동 계산, 회색 배경). Start Date 변경 시 `+1개월-1일`(Monthly) 또는 `+1년-1일`(Annual) 자동 재계산
- feat(Admin/RestaurantsPage): Billing Cycle 변경 시 End Date 즉시 재계산
- feat(Admin/RestaurantsPage): "Apply 7-Day Free Trial" 체크박스 → "Treat as trial until subscription starts"로 일반화. 7일 하드코드 제거. Start Date가 미래면 그 기간이 자동으로 트라이얼 (20일/30일/자유)
- feat(Admin/ManagersPage): `calcSubscriptionEnd` 함수에 `-1일` 규칙 적용 (기존: +1개월, 수정: +1개월-1일)
- fix(Admin/RestaurantsPage 편집 모달): 트라이얼 체크박스 신규 추가 (기존에는 편집 시 변경 불가였음)

### 업무매뉴얼 (신규 기능)
- feat: 5개 역할(Admin/Brand/Foodcourt/Owner/Restaurant) 전용 업무매뉴얼 메뉴 추가. 블로그 형식 카드 그리드 + 상세 모달 + 댓글
- feat: 스코프별 격리 (System=company-wide, Brand=brand_id, Foodcourt=foodcourt_id, Restaurant Admin/Staff=restaurant_id, Owner=per-restaurant 선택)
- feat: 사용자 자체 카테고리 CRUD (100% 자율 관리)
- feat: 공지 guide 카테고리 상세 모달에 "업무매뉴얼로 보내기" 버튼 — 타역할 가이드를 복사해 자기 스코프로 가져오기
- feat: 매뉴얼 간 복사 기능 (Owner는 대상 레스토랑 선택 가능)
- model: `WorkManual`, `WorkManualCategory` 신규. `Comment.entity_type` ENUM에 `work_manual` 추가

### 랜딩 페이지 News 메뉴 (신규)
- feat: 상단 GNB에 `Setup Quote` 제거 → `News` 추가 (4개 언어 번역 포함)
- feat: `/news` 페이지 신규 — 블로그와 동일 구조, 카테고리 탭 `All / Product News / Updates`
- feat: `GET /api/contents/public/news` 엔드포인트 — Product News + Updates 카테고리만 반환
- refactor: `GET /api/contents/public/blog` — Product News/Updates 카테고리 제외
- fix: 두 엔드포인트 모두 **포스트가 있는 카테고리만** 반환 (빈 카테고리 숨김)
- feat: `BlogPostPage`가 `/news/:slug` 도 처리 — 경로로 back 버튼 목적지 분기 (/blog vs /news)

### 릴리즈 콘텐츠 자동 등록 인프라
- feat: `scripts/create-release-post.js` 신규 — 배포 시 JSON을 입력받아 (1) 랜딩 블로그 포스트(영어, ContentCategory=updates) + (2) System Admin 공지(영어+한글 이중언어, Notice.category=updates, target_type=all) 동시 생성. `--sync-prod` 플래그로 SSH 운영 DB 자동 동기화
- model: `Notice.category` ENUM에 `updates` 추가 (dev + prod 둘 다 동기화)
- chore: 운영 DB 기존 릴리즈 공지 12개(v3.0.1~v3.12)를 `general` → `updates` 카테고리로 마이그레이션
- chore: 운영 DB 기존 릴리즈 공지 12개의 영어 섹션만 추출하여 `contents` 테이블에 `release-v{version}` slug로 블로그 포스트 생성
- docs: `/배포` 스킬 문서에 "릴리즈 콘텐츠 자동 등록" 섹션 추가

### 자동저장 정리 (SettingsPage)
- fix: `brands` / `billing` 탭에서 의미 없는 "Save Changes" 버튼 4곳 제거. 두 탭 모두 편집 가능 필드가 없는 표시 전용이라 Save 버튼이 혼란만 줬음. 실제 편집 가능한 모든 설정은 `AutoSaveField`로 자동저장 동작 확인 완료

### UI 수정
- fix: `Admin/ContactInquiriesPage` 헤더 높이가 공통 `PageComponents.Header` (56px)와 달라서 다른 페이지와 정렬 안 맞던 문제 수정

### i18n
- fix: `i18next-http-backend` 캐시버스트 추가 — 페이지 로드 시 `/locales/{lng}/{ns}.json?v={timestamp}` 쿼리 파라미터. 번역 키 추가 시 사용자가 수동 캐시 클리어 없이 반영됨 (ETag 유지로 내용 미변경 시 304)
- feat: `common.json`에 `nav.workManuals` 4개 언어 추가 (en/ko/zh/ms)
- feat: `landing.json`에 `nav.news` 4개 언어 추가

## 2026-04-11 배포 (v3.12 유지 — 버그 수정 및 UI 조정 위주)

### notices 데모/테스트 제외 + admin 하드웨어 max_quantity 무제한 + /packages Quote 모달 수정 + External QR + inventory adjust fix

- fix(notices): 관리자 공지 이메일 발송 시 `is_demo=true`/`is_test=true` 계정 제외. broadcast 4개 target(all/role/brand/foodcourt)의 recipient 생성 로직에서 User/Restaurant 양쪽 필터. `select_restaurants`(명시 선택)는 관리자 의도 존중 — `routes/notices.js`
- fix(admin/system-products): Hardware Package 편집 모달의 addon Max 입력 필드에서 `0`(무제한) 설정 불가하던 버그. (1) loader `|| 1`이 기존 `max_quantity=0` 값을 로드 시 1로 변조하던 핵심 버그를 `?? 0`으로 수정, (2) 신규 addon 기본값 `1 → 0`, (3) input `min="1" → "0"`, `|| 1 → || 0`, (4) `(0 = unlimited)` 힌트 문구 추가 — `SystemProductManagementPage.tsx`
- chore(db): 운영 DB `system_product_addons.max_quantity=1`인 108건을 `0`(무제한)으로 일괄 UPDATE. 12건(max_quantity=5)은 유지. 백업 `/var/www/backups/system_product_addons_20260411_175650.sql`. 운영 /packages 에서 Additional Equipment 1개만 추가되던 증상 해소
- feat(packages): Request a Quote 모달 Quote Summary에 소프트웨어 구독 라인 신규. 플랜명 + 청구주기 (monthly/annual) + 가격 + "Billed separately from hardware (recurring invoice)" 안내. 하드웨어 총액은 one-time 그대로, 구독은 dashed divider 아래 별도 섹션. 체크박스 해제/플랜/가격 없을 때 숨김 가드 — `PackagesPage.tsx` + `locales/{en,ko,zh,ms}/landing.json` (2 keys × 4 lang)
- fix(packages): Request a Quote 모달 레이아웃/z-index 수정. (1) z-index `200 → 10000` — Landing 헤더(1000) 뒤로 숨던 문제, (2) ModalContent `max-height: calc(100vh - 40px)` + flex column, (3) ModalTitle `flex-shrink:0` 상단 고정, (4) ModalForm `overflow-y: auto` 중앙만 스크롤, (5) ModalButtonRow `position: sticky; bottom:0` 하단 고정, (6) 모바일(≤640px) 풀스크린. 타이틀/버튼이 스크롤로 사라지던 문제 해소
- fix(admin/payment-settings): `GET/POST /api/admin/payment-settings` 응답을 `{success, data}` 표준으로 래핑. 에러 응답도 `{success:false, message}`로 정규화. 프론트에 legacy flat/새 래핑 둘 다 수용하는 defensive 언랩 — `admin-payment-settings.js`, `Admin/PaymentSettingsPage.tsx`

### 2026-04-11 (External QR + inventory adjust fix + hydration 검증 자동화)
- feat(settings): External QR 카드 신규 — Operations 탭에 커스텀 이름 QR 생성 섹션 추가. 파트너 가게, 호텔 로비, 사무실 등 외부 지점에 주는 QR. 이름(최대 20자) 입력 → SVG/PNG/Print/삭제. 손님이 스캔 시 모바일 메뉴 진입, 주문의 `table_number` 컬럼에 이름 그대로 저장(내부 테이블 QR과 동일 경로). 저장 위치: `table_settings.externalQRs: string[]` — DB 마이그레이션/백엔드 변경 0건
- fix(settings): External QR 카드 좌우 풀폭 — `gridColumn: 1 / -1`로 2열 SettingsGrid에서 한 행 통째 사용. 생성된 QR들은 `TablesGrid auto-fill minmax(180px, 1fr)`로 가로 wrap
- fix(mobile): OrderTypePage의 `Table {tableFromQR}` 하드코딩 제거 — 내부(`T001`)에선 prefix 중복이었고 외부(`Cafe Maru`)에선 어색했음. 이제 값 그대로 표시
- fix(settings): External QR runtime crash 수정 — legacy `localStorage.tableSettings` 캐시에 `externalQRs` 필드가 없어서 `setTableSettings(parsedSettings)` 로 통째 덮어쓰면서 `undefined.length` 접근. 함수형 업데이트 + 기본값 머지로 전환, JSX 5개 접근 모두 `(... || [])` 가드
- fix(inventory): `POST /api/restaurants/:id/inventory/adjust` 라우트가 `quantity`(incremental delta)만 받아서 프론트 인라인 편집(`new_quantity` absolute 전달)이 작동 안 함. 두 파라미터 모두 수용하도록 수정 (new_quantity 우선, 없으면 quantity 폴백, new_quantity=0 정상 처리). General Stock은 별도 라우트라 이미 정상이었음. long-standing 버그
- chore(검증): `/검증` 스킬 0단계 신규 — `dev-frontend/scripts/state-hydration-check.js` 정적 분석 스크립트. 새 state field 추가 시 legacy hydration source(localStorage/JSON.parse/fetch)에서 defensive merge 안 하면 warning, JSX에서 `.length`/`.map`/`.filter` 접근 시 `(... || [])` / `?.` 가드 없으면 warning. 위 External QR 버그를 자동 차단 가능. npm run check:hydration으로 실행

### 2026-04-11 (Phase C-6 + UX 정리 + repo hygiene)
- refactor(C-6): `components/Inventory/InventoryManager.tsx` 3141줄 → 26개 파일로 분할 (types/styles/utils + 11 hooks + 3 sections + 9 modals + 슬림 main 340줄). 공개 API 불변(`<InventoryManager mode restaurantId />`) — 2개 consumer 무수정. 패턴: hook = state+API capsule, mode 분기는 hook 내부에만, Add+Edit는 mode prop으로 통합
- fix(Inventory): 대시보드 카드 5 → 4 (Expiring Soon 제거 — 아래 Expiring Items 섹션과 중복)
- fix(Inventory): 9개 모달 모두 표준 `Modal footer={...}` prop 사용 → ButtonGroup이 body 안에 있어 본문 길어지면 사라지던 문제 해결, sticky footer + border-top
- fix(Inventory): 테이블 반응형 정렬 깨짐 — `& > div:nth-child(N)`은 MobileGrid의 `display: contents` 때문에 grandchildren에 도달 못 함. 클래스 기반(`.col-min`, `.col-cost`, `.col-supplier`, `.col-last`) 셀렉터로 교체. 1280px 미만에서 5컬럼으로 줄이고 Actions 컬럼 폭 160px → 260px로 4개 액션 버튼이 한 줄에 나란히
- fix(Inventory): 버튼에서 `+` prefix 제거 (Receive Stock / Record Waste / Add General Stock)
- fix(StatsGrid): 15개 페이지의 로컬 StatsGrid styled-component 표준화. 모두 `repeat(4,1fr) → ≤1024px repeat(2,1fr) → ≤768px repeat(2,1fr)` 패턴. 이전엔 12개가 `auto-fit minmax(200px,1fr)`로 모바일에서 1열로 무너지거나, AddonModulesPage는 ≤640px에서 명시적 1열이었음. 영향 페이지: Admin/{AddonModules,ContactInquiries,HardwareQuotes,RestaurantSubscriptions}, Brand/Foodcourt/Owner/Manager/Restaurant 5종 OperationInquiry, Manager/{Invoices,ManagerPromotions,ManagerSubscriptions,Sales,Subscriptions}, Owner/Notices
- chore(repo): `dev-frontend/public/static/`(4 파일) + `dev-frontend/nginx-build/`(138 파일) git untrack — Auto-commit이 잡아간 옛 빌드 산출물. CRA가 `public/`을 빌드에 그대로 복사하기 때문에 매 빌드마다 옛 main.js 해시가 함께 들어와 brower cache miss 시 ChunkLoadError 유발했음. 이제 단일 main.js만 출력
- chore(repo): `dev-frontend-build/` (495 파일) git untrack — 로컬 nginx 서빙 디렉토리. 매 빌드마다 거대 diff를 생성하던 hygiene 이슈. 디렉토리는 디스크에 남아 nginx 서빙 정상

### 2026-04-10 (저녁 — Phase C 구조 개선)
- refactor(C-3): Fetch 인터셉터 단일화 — `utils/httpClient.ts` 추출, `index.tsx` 시작 시 1회만 설치. `AuthContext`의 이중 fetch 패치 제거 → StrictMode/HMR 인터셉터 누락/중복 위험 해소
- refactor(C-4): `CustomerContext` 내부 분할 — `useMobileCustomerState` + `usePosCustomersState` + composite provider. 공개 API 불변으로 10개 consumer 수정 없음
- fix(C-4): 모바일 로그인 세션이 레스토랑 간 공유되던 버그 — localStorage 키를 slug별로 분리 (`mobile_customer:<slug>`, `mobile_token:<slug>`). SPA 네비게이션 시 `history.pushState` 패치로 `locationchange` 이벤트 발생 → 즉시 상태 재로드. 레거시(스코프 없는) 세션은 첫 로드 시 자동 정리
- refactor(C-5): 백엔드 5개 거대 라우트 파일 → 16개로 기능별 분할
  - `routes/customers.js` 1263 → barrel + self/admin/auth 3개
  - `routes/mobile.js` 1304 → barrel + helpers + public/orders 2개
  - `routes/orders.js` 2140 → barrel + crud/views/payment 3개
  - `routes/restaurants.js` 2204 → barrel + subscription/crud/ingredients 3개
  - `routes/invoices.js` 3170 → barrel + helpers + main/payment 2개 (routes/owner.js 호환 위해 getIssuerCompanyInfo/getPayerCompanyInfo 배럴 re-export)
- fix: `mobile-public.js`에서 `Order` import 누락 → `GET /popular/:slug` 500 에러 수정 (분할 회귀)
- chore: 63개 백엔드/셸 스크립트의 상태 이모지 ✅/❌ → 텍스트 문자 ✓/✗ 일괄 치환 (터미널 가독성)

### 🐛 추가 버그 수정 (2026-04-10 오후)
- fix: 모바일 메뉴 로딩 속도 개선 — `MenuPage.tsx` init 흐름 개편. 백그라운드 `limit=500` 전체 메뉴 호출 제거, 검색용 전체 메뉴는 검색창 포커스/입력 시 lazy load. 첫 호출 `limit=1`로 카테고리만 빠르게 받기
- fix: 모바일 AccountPage My Coupons에 본인 것이 아닌 매장 전체 공개 쿠폰까지 모두 표시되던 버그 — `routes/coupons.js` 응답을 `myCoupons`(명시적 타겟)/`promotions`(전체공개)/`available`(호환) 3개로 분리. AccountPage는 `myCoupons`만 표시
- fix: 모바일 멤버십 비활성 매장에서 points UI 숨김 — `AccountPage` `pointsEnabled` 기본값 `false`로 변경 (깜빡임 방지), `PaymentPage` 비회원 결제 폼의 "Register as a Member" 체크박스를 `membershipSettings?.is_active` 조건부로 변경
- fix: `routes/coupons.js GET /customer/:customerId` dual auth 적용 — POS Admin 또는 모바일 customer 본인 (IDOR 방어 포함)

### 🛡 보안 정석화 (Phase A)
- 익명 고객 DB 덤프/삭제/비밀번호 변경 차단 (`routes/customers.js` 라우트별 인증 정책)
- 모바일 주문 IDOR 차단 (`routes/mobile.js` GET /orders restaurant_id 필수)
- 결제 라우트 위변조 방어 — 30분 시간 윈도우 + 중복결제 방지 + PayPal orderId 검증 (`routes/orders.js`)
- inventory IDOR 차단 (`routes/inventory-routes.js` checkRestaurantAccess 적용)
- 사업자등록번호/은행계좌 무인증 노출 차단 (`routes/restaurants.js`)
- addon-modules GET 인증 추가
- 모바일 고객 JWT 시스템 신규 — `utils/customerJwt.js`, `middleware/customerAuth.js`
- POST /customers/auth, /register이 customer 토큰 발급
- 모바일 자가서비스 라우트 IDOR 방어 (`requireCustomerSelf`)
- 모바일 페이지에 `mobileFetch` 헬퍼 + `mobile_token` 분리 저장
- POS 관리자와 모바일 고객 세션 완전 분리

### 🔧 안정화 인프라 (Phase D)
- Sentry 에러 추적 도입 (프론트엔드 + 백엔드)
- 환경 자동 감지 (production/development), component 태그로 프론트/백 구분
- AuthContext 4곳에 user context 동기화 (login/checkSession/logout/switchUser)
- 백엔드 admin/customer 미들웨어 user context 자동 첨부
- 민감정보 자동 마스킹 (password, token, Authorization, cookie)
- ErrorBoundary 폴백 UI ("Try again" 버튼)
- Health-check 스크립트 신규 (`dev-backend/scripts/health-check.js`)
- 5개 카테고리 / 39개 자동 테스트 (auth/security/pos/mobile/payment)
- CLI 옵션 (--category, --quiet, --host, --verbose)
- CLAUDE.md에 검증 단계 마지막에 health-check 필수 실행 규칙 추가

### 🐛 깨진 기능 복구 (Phase B)
- fix: Activity Log Stats 500 에러 — `routes/activityLogs.js` sequelize 구조분해 import 누락 수정
- fix: NotificationSettings 잘못된 token 키 (`'token'` → `'auth_token'`) 3곳
- fix: POS 결제 모달 포인트 사용 UI 미노출 — PaymentModal에 `selectedCustomerId` prop 추가, 회원 선택 시 0 pts여도 적립 안내 표시
- fix: **인쇄 다이얼로그 이중 트리거** — `printHTMLContent`의 `iframe.onload`가 두 번 트리거되어 print 다이얼로그가 2번 큐잉되던 문제. 취소 시 두 번째가 즉시 표시되어 "취소해도 또 뜬다" 증상. doc.close() 직후 setTimeout 단일 호출 + hasPrinted flag로 해결. POS 결제/Bill/Kitchen/Settlement/Table QR 등 8개 인쇄 흐름 전체 영향.

---

## [v3.12] — 2026-04-09 배포
- Franchise & Tenancy Management Phase 1 구현 (DB 모델 7개, API 20개, 프론트 Pipeline/List/Detail)
- ContractManagementPage UI 개선: StatCard 색상 분리, ViewToggle 연회색, DatePeriodFilter 통합
- ContractPipeline 카드 정보 보강 (이름/전화/위치/타입/기간/진행률)
- ContractDetail 레이아웃 전체폭, 입력란 width:100%
- 레스토랑 연결 섹션 추가 (검색→선택→연결/해제)
- Notes → CommentSection 교체 (파일첨부, 읽음표시 통합)
- Document 업로드/다운로드/삭제 기능 (upload/files API 활용)
- 통합검색 서버사이드 전환 (코멘트 내용 포함 검색)
- URL 기반 상태 유지 (view/id → 새로고침 시 화면 유지)
- Settings 3개 페이지 AutoSaveField 적용 (InvoiceSettings, CompanySettings, CompanyProfile)
- AutoSaveField 아이콘 위치 점프 수정 + 즉시 spinner 반응
- Owner Plan 매니저 설정 필터 버그 수정
- Comment/CommentRead ENUM에 'contract' 추가
- CHANGELOG 시스템 도입
- fix: 프린터 설정 저장 안 되는 버그 수정 (store.js allowedFields에 printer_settings 누락)
- fix: ImageUploadDropzone 자동저장 안정화 (수동 triggerSave 추가)
- fix: 브라우저 간 설정 불일치 수정 (StoreContext auth-ready 이벤트 재로드)
- fix: LiveOrders 빌프린트 미리보기/출력 로고 누락 수정
- fix: StoreContext 기본값 'FOODCOURT CENTRAL' 제거
- fix: AuthProvider > StoreProvider 구조 변경 (모든 기기에서 설정 로드 안정화)
- fix: 영수증 인쇄 시 로고/멤버십QR/커스텀QR/푸터 누락 수정 (React state 직접 전달)
- fix: 멤버십 QR URL `/m/{id}` → `/mobile/{slug}/account` (올바른 프로필 페이지로 연결)
- fix: 영수증 QR 아래 불필요한 URL 텍스트 삭제
- fix: 멤버십 QR 외부 API 의존 제거 → 로컬 생성 (QRCode.toDataURL)
- fix: getStoreInfo()에 receiptSettings/slug/membershipQR 통합 (모든 인쇄 경로 통일)
- fix: QR Code Mode (Static/Session) 자동저장 안 되는 버그 수정
- fix: FloorPlan Print QR이 브라우저 인쇄 모드를 무시하던 버그 수정
- fix: Table QR 프린트 레이아웃 개선 + @page margin:0 + 시간/만료 표시 + 타임존 적용
- fix: QR Code Mode AutoSaveField 개별 라디오 감싸기 (클릭한 항목에 아이콘)
- fix: StoreContext URL 레스토랑 ID 변경 감지 (다른 레스토랑 데이터 혼재 방지)
- CLAUDE.md 타임존 규칙 추가, UI_DESIGN_GUIDE.md AutoSaveField 필수 규칙 추가

---

## [v3.10] — 2026-04-07 배포
- v3.10 다국어 시스템 (i18n) — 4개 언어 지원 (EN/KO/ZH/MS)
- react-i18next 인프라 + 용어집 + 검증 스크립트
- User.preferred_language + 언어 변경 API
- 160개 페이지 t() 래핑, 4,698키 x 4개 언어
- 언어 선택 UI (Landing globe, POS sidebar, Mobile, Login)
- 이메일 템플릿 다국어
