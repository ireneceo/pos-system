# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-03 (리퍼럴 UX 보강 + 보안 fix + 운영 cron 이전)
**버전:** **v3.22** (운영, 2026-05-03 배포)
**작업 상태:** 검증 완료, 커밋 진행 중

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-05-03)

**🔐 보안 fix — `/api/restaurants` 익명 노출 차단**
- `routes/restaurants-crud.js`: `optionalAuth` 미들웨어 제거 → `authenticateToken` 강제 (admin email/businessReg/taxId/subscription 미인증 GET 차단)
- 미사용 jwt import 정리
- `pages/Manager/SalesPage.tsx`: 헤더 누락된 fetch에 `getAuthHeaders()` 적용
- `scripts/health-check.js`: 익명 `/restaurants` → 401 영구 케이스 추가 (security 21 → **22 PASS**)
- 라이브 검증: 익명 401 ✓, RA 인증 200 ✓

**🎨 리퍼럴 UX 보강**
- `pages/Referral/ReferralDashboardPage.tsx`: 헤더 아래 "How it works" 보라 카드 (15% recurring / 20% off first month / Forever) — 3컬럼 desktop, 1컬럼 mobile
- `pages/Landing/SignupPage.tsx`: Referral Code 필드 옆 항상 보이는 hint *"Have a referral code? Get 20% off your first month."* (코드 입력 전에도 노출 → 신규 가입자 유도)
- `pages/Referral/ReferralLoginPage.tsx`, `ReferralSignupPage.tsx`: Input/Submit 에 `box-sizing: border-box` 추가 (Input padding 28px 가 카드 밖으로 튀어나오던 레이아웃 깨짐 fix)
- 리퍼럴 모바일 반응형 (StatCard DashboardStats, ReferralLayout, ReferralAuthLayout, ReferralDashboardPage) + 신규 `purple-referral-logo.svg`

**💰 인보이스 discount_reason 노출 (5곳)**
- `Restaurant/InvoicesPage.tsx` 우측 패널 + print HTML
- `Owner/OwnerInvoicesPage.tsx` 우측 패널 + print HTML
- `Admin/InvoicesPage.tsx` print HTML
- 효과: 리퍼럴 할인이 자동 세팅한 `discount_reason: 'Referral: 20% off first month (PURPLE-XXXX)'` 가 사용자에게 표시됨 (이전엔 `Discount (20%)` 만 보여서 출처 불명)

**🌐 i18n 4언어 추가**
- `locales/{en,ko,zh,ms}/referrals.json`: dashboard.rules.* 6키 × 4 = 24
- `locales/{en,ko,zh,ms}/landing.json`: signupPage.referralCodeHint + referralCodeValidNote × 4 = 8
- 라이브 4언어 fetch 검증 ✓

**🛡️ 운영 cron user 이전 완료** (Irene 직접 실행)
- root crontab 에서 backup-database 라인 제거
- irene crontab 으로 이전 (`0 3 * * * /var/www/scripts/backup-database.sh`)
- `/var/backups/orderhere/` chown irene:irene
- 수동 실행 검증: dev `~/backups/cross-backup/production-pos/db_2026-05-03.sql.gz` 1.95M 도착 (08:07)
- 다음 03:00 자동 도착 확인만 남음

### 추가 완료 (2026-05-03 운영 준비 점검 라운드)

**📋 운영 준비 점검 보고서** — `docs/OPERATIONAL_READINESS_AUDIT.md`
- 실서비스 SaaS 기준 7항목 점검 (Baseline + 부족 + 위험 C1~C5 + 트래픽 트리거 + 실행 계획)
- 메모리/문서 인덱스 통합

**🛡️ uploads 백업 추가 (C1)** — 디스크 사고 시 32MB 이미지 영구 손실 위험 차단
- dev/prod backup-database.sh 양쪽 패치 — tar.gz + cross-backup
- 검증: dev 4.7MB + prod 30MB cross-backup 도착

**🔐 financial path audit log 보강 (C2)**
- utils/activityLogger.js: logSystemActivity 추가, restaurant_id 가드 완화
- referralService.processCommission/applyCredit audit
- subscriptionScheduler.restoreSubscription audit
- routes/referrals.js POST /payouts + PUT /admin/payouts/:id audit

**✓ commission 트랜잭션 감사 (C3)** — 보강 불필요 확인
- handleInvoicePaid → sequelize.transaction 으로 processCommission 호출 (이미 보장)

**🔧 fetch 헤더 누락 fix (C4)** — 401 발생 페이지 2건
- Manager/SystemInquiryPage `/api/support-tickets`
- Recipes/RecipesPage `/api/brands`

**🧹 결제/인보이스 console.log 정리 (C5+D1)**
- invoices-payment.js: 10건 제거 (User email + payment_method + transaction_id 평문 노출 차단)
- invoices-main.js: 26건 일괄 제거 (디버그/카운트/이모지)
- console.error 모두 보존 (Sentry breadcrumb)

**커밋 4건**: 4d9ecafd / ec1eab11 / fd877d48 / b7cb1947

### 추가 완료 (2026-05-03 운영 SaaS 정합성 P1 라운드)

**Sentry 미사용 결정 + PM2 logrotate 도입 (A)** — 사용자가 Sentry 효용성 낮다고 판단
- pm2 install pm2-logrotate (양쪽). dev 14일/prod 30일 retain, 10MB max, gzip, 매일 자정
- Sentry 코드는 잔존 (DSN env 비우면 SDK no-op, 무해)

**점검 보고서 갱신 (C)** — `docs/OPERATIONAL_READINESS_AUDIT.md`
- Baseline 의 관측 항목: Sentry → PM2 logrotate 로 표기 변경
- 처리 이력에 PM2 log rotation + Sentry 미사용 결정 기록

**per-route rate limit 미세조정 (D)** — apiLimiter 1000/15min 보다 tight 한 endpoint:
- routes/auth.js: signupLimiter 10/h, forgotPasswordLimiter 5/15min
- routes/admin-analytics.js: heavyAnalyticsLimiter 30/min (sales-trend, regional-stats DB 부하)
- routes/admin-reports.js: heavyReportsLimiter 30/min (revenue-trend, customer-analysis)

**utils/logger.js thin wrapper (E)** — Sentry 미사용 후 prod 추적 단일 진입점
- info (dev only) / warn / error / debug (DEBUG=true)
- 향후 winston/pino 로 swap 시 호출 지점 그대로

**비대 라우트 3개 분리 (F+G)** — CLAUDE.md 500줄 가이드 위배 시정:
- invoices-main.js 2622줄 → invoices-list (1203) + invoices-crud (926) + invoices-generation (513)
- brands.js 2596줄 → brands-core (1247) + brands-plans (1368)
- foodcourts.js 2333줄 → foodcourts-core (1243) + foodcourts-plans (1109)
- 각 파일 자체 helpers 통합 이동 (verifyBrandAccess/computeNextBillingDate/calculatePlanCharges/generateBrandInvoiceNumber 등)
- barrel 파일 (invoices.js / brands.js / foodcourts.js) 가 sub-router 마운트
- server.js mount 변경 없음 (`/api/invoices`, `/api/brands`, `/api/foodcourts` 그대로)
- invoiceInBranch shared helper 를 invoices-helpers.js 로 이동 (list/crud 공유)

**커밋 4건**: 842780e3 (A+C+D) / feb332fd (E) / 46be2604 (F+G) — 검증 73/73 PASS

### 다음 할 일

1. **운영 배포 결정** — 누적 변경 8 커밋 (보안 fix + 리퍼럴 UX + 인보이스 사유 + 운영 점검 P0+P1) 운영 배포 시점 — 사용자가 직접 `/배포`
2. **내일 03:00 자동 백업 도착 확인** — dev `~/backups/cross-backup/production-pos/{db,uploads}_2026-05-04.{sql,tar}.gz`
3. **B9 dashboard 통계 사전 집계** — 별도 라운드, DB 모델 신규 + cron worker (설계 문서 필요)
4. **B10 unit test + CI** — 별도 라운드, Jest/Vitest 인프라 + CI 파이프라인 (현재는 health-check 통합 테스트만)
5. **P2 인프라 도입 결정 사안 (사용자 영역)** — S3/R2, BullMQ+Redis, Socket.IO Redis adapter, JWT refresh token (트래픽 트리거 도달 전엔 over-engineering)
6. **Sentry 코드 명시적 호출 5곳 (BE auth/customerAuth setUser, FE AuthContext) 정리** — DSN 비우면 no-op 이라 미루어도 OK, 향후 정리 시 함께
4. **브라우저 E2E 검증** (Irene 수동, 25분):
   - RP 가입 → POS 가입 with code → 첫 인보이스 20% 할인 → 결제 → 커미션 → wallet → payout 요청 → Admin 승인 → 7종 이메일 수신
5. **운영 SMTP 7종 메일 수신 확인** (배포 직후)

---

## 환경 / 인증 현황

- 백엔드: dev-backend (PM2, port 3001), production-backend (PM2, port 3002)
- 프론트: nginx → /var/www/dev-frontend-build (현재 `main.6348577f.js` 2026-05-03 07:48); 운영 production-frontend
- DB: purple_dev_db / purple_production_db (MySQL)
- 테스트 계정 (리퍼럴 검증용):
  - RP: `irene-rp@purplehere.com` / Test1234! → /referral/login
  - 피추천인: `irene-ref1` (4개월 활성), `irene-ref2` (1개월 첫달20%), `irene-ref3` (이번 달 미결제) — 모두 Test1234!
  - kdine_admin (Restaurant Admin, restaurant_id=5, status='suspended')

---

## 주요 문서 위치

- `/var/www/CLAUDE.md` — 프로젝트 워크플로우 + 검증 절차
- `/var/www/DEVELOPMENT_PLAN.md` — Phase 로드맵 + 작업 히스토리
- `/var/www/CHANGELOG.md` — v3.21 배포 내역
- `/var/www/dev-frontend/UI_DESIGN_GUIDE.md` — Modal 패턴, 디자인 토큰
- `/var/www/docs/REFERRAL_SYSTEM.md` — Phase 1~3 설계 (1-2절 핵심 규칙)
- `/var/www/docs/INVOICE_SYSTEM.md` — 11절 SOA 재설계 (B1)
- `/var/www/docs/SUPPLY_CHAIN_SPRINT_*.md` — Sprint 1~7 설계 문서

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
