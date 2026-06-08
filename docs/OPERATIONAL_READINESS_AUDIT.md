# 실서비스 운영 준비 점검 (Operational Readiness Audit)

> **최초 작성:** 2026-05-03
> **기준:** 실고객 SaaS 운영 (MVP/데모용 X)
> **현재 규모:** 식당 25개 / 이미지 32MB / 결제 일 100건 이내 / 단일 backend instance

---

## 1. 현재 잘 되어 있는 부분 (Baseline)

| 영역 | 현황 | 위치 |
|------|------|------|
| 관측 | **PM2 logrotate 양쪽 활성화** (dev 14일 / prod 30일 / 10MB / gzip). Sentry SDK 코드 잔존하나 사용자 결정으로 미사용 (DSN env 비우면 no-op) | `pm2 conf pm2-logrotate` |
| 보안 미들웨어 | Helmet + apiLimiter (1000/15min) + authLimiter (20/15min) + 익명 IDOR sweep 22 영구 | `server.js:170-197`, `scripts/health-check.js` |
| 권한 분리 | 14개 전문 미들웨어 (auth, brandScope, buyerScope, sellerScope, supplierScope, customerAuth, recipeAuth, requireModule, requirePlanLimit, security, validation, dbHealthCheck, errorHandler, addressValidation) | `middleware/` |
| 실시간 | Socket.IO `/orders` namespace + `poRealtimeService` 분리, 9곳 emit (created/updated/deleted/items-added) | `services/socketService.js`, `routes/orders-crud.js` |
| 트랜잭션 | 27곳 적용 (Invoice finalize, SOA cascade, 리퍼럴 wallet 일부) | `grep -rln "sequelize.transaction" routes services` |
| 인프라 | `trust proxy:1` (Cloudflare/Nginx 호환), JWT + cookie SameSite=strict, ENUM 검증, ssrfProtection, sqlInjectionProtection | `server.js:103`, `middleware/security.js` |
| 안전망 | health-check 6 카테고리 22/22, SchedulerRun 패턴, idempotent 마이그레이션, 양방향 cross-backup (DB + uploads) | `scripts/health-check.js`, `scripts/backup-database.sh` |
| i18n | 4언어 (en/ko/zh/ms), glossary, `npm run i18n:verify` | `public/locales/` |
| Tier gating | 3-layer paywall (requireModule + URL + UI hasModule) | `middleware/requireModule.js` |
| 인보이스 정합성 | `finalizeInvoice` single source of truth (11곳, v3.18) | `services/invoiceFinalize.js` |

---

## 2. 부족 / 위험 (실서비스 기준)

### B1. 라우트 파일 비대 (가이드 위배)
CLAUDE.md 500줄 가이드 위반:
- `invoices-main.js` 2622줄
- `brands.js` 2596
- `foodcourts.js` 2333
- `restaurants-crud.js` 2010
- `inventory-routes.js` 1820
- `purchase-orders.js` 1624
- `orders-crud.js` 1503

→ 머지 충돌 + 변경 영향 추적 비용↑.

### B2. Activity log 미커버
현재 적용: `orders-crud / restaurants-crud / subscriptions / activityLogs` 4곳.
**미적용**: `invoices-payment` (결제 confirm/submit), `services/referralService` (commission/wallet 변동), `services/membership` (restoreSubscription), `users.js` (role/restaurant_id 변경).
→ 결제/커미션 분쟁 시 누가/언제/얼마 추적 불가.

### B3. 이미지 = 단일 서버 disk
`/var/www/uploads/` 32MB (prod). multi-instance 불가, S3/CDN 미적용. **백업은 2026-05-03 패치로 추가됨** (이 문서 §4).

### B4. 비동기 큐 없음
이메일/알림/PDF 생성/통계 집계 모두 in-process. SMTP 지연 시 결제 응답까지 지연.

### B5. console.log 누적
- `invoices-main.js` 26개
- `brands.js` 24
- `foodcourts.js` 22
- `orders-crud.js` 21
- `mobile-orders.js` 21
→ Sentry breadcrumb과 중복 + 토큰/금액 평문 노출 위험.

### B6. per-route rate limit 미세조정
apiLimiter 글로벌 + auth 1종만 차등. 부하 큰 endpoint(dashboard 통계, 검색)는 동일 버킷.

### B7. JWT 단일 토큰
refresh token 없음, 7일 expiry. 토큰 탈취 시 7일 유효.

### B8. CDN 부재
이미지가 `dev.purplehere.com/uploads/` 직접 서빙 → 전송 비용 + latency.

### B9. Dashboard/통계 사전 집계 부재
실시간 GROUP BY/COUNT. 식당/주문 비례 비대.

### B10. 자동 테스트 부재
health-check 통합 외 unit test 없음, CI 연동 없음 (deploy-to-production.sh 수동).

---

## 3. 즉시 처리 위험 (C-grade)

| # | 위험 | 처리 상태 |
|---|------|----------|
| **C1** | uploads 백업 부재 (디스크 사고 시 전체 손실) | **2026-05-03 적용 완료** (§4) |
| **C2** | 결제/구독/리퍼럴 commission Activity log 누락 | 진행 예정 |
| **C3** | referralService.processCommission 트랜잭션 감사 | 진행 예정 |
| **C4** | fetch 호출 헤더 누락 sweep (`Manager/SalesPage` 외 가능성) | 진행 예정 |
| **C5** | 결제/인보이스 console.log prod 노출 | 진행 예정 |
| **A** | PM2 log rotation 미설정 (Sentry 미사용 결정 후속 — prod 추적 유일 수단) | **2026-05-03 적용 완료** (§4) |

---

## 4. 처리 이력

### 2026-05-03 — PM2 log rotation 활성화 (A — Sentry 미사용 후속)

**배경**: 사용자가 Sentry 효용성 낮다고 판단, 미사용 결정 → prod 운영 추적은 PM2 stdout/stderr 만 남음. logrotate 없이는 무한 누적 → 디스크 차오름 위험.

**적용**:
- `pm2 install pm2-logrotate` (양쪽)
- dev: `max_size=10M`, `retain=14`, `compress=true`, `rotateInterval='0 0 * * *'`
- prod: `max_size=10M`, `retain=30`, `compress=true`, `rotateInterval='0 0 * * *'` (운영 더 긴 retain)
- 매일 자정 rotate, 10MB 도달 시 즉시 rotate, gzip 압축, dev 14일/prod 30일 후 삭제

**Sentry 코드 처리**:
- 명시적 호출 5곳 (BE: middleware/auth, customerAuth / FE: AuthContext) 잔존
- 코드 그대로 두고 SENTRY_DSN env 비우면 SDK no-op (안전 비활성화)
- 추후 정리는 별도 작업 (코드 삭제는 import 의존성 검토 필요)

### 2026-05-03 — uploads 백업 추가 (C1)

**문제**: `backup-database.sh` 가 DB만 백업, `/var/www/uploads/` (prod 32MB, dev 5.1MB) 무방비.

**적용**:
- `scripts/backup-database.sh` (dev) — `tar czf dev_uploads_${DATE}.tar.gz` + cross-backup scp 라인 추가, 14일 retention
- `/var/www/scripts/backup-database.sh` (prod, SSH 패치) — 동일 패턴, 7일 retention. `.bak` 백업 보존
- 양쪽 1회 수동 실행 검증:
  - dev: DB 3.6M + uploads 4.7M → prod cross-backup 도착 ✓
  - prod: DB 1.9M + uploads 30M → dev cross-backup 도착 ✓

**검증 흔적**:
- dev `~/backups/cross-backup/production-pos/uploads_2026-05-03.tar.gz` 31MB
- prod `/var/backups/orderhere/daily/uploads_2026-05-03.tar.gz` 30MB

---

## 5. 트래픽 신호별 분리 트리거

| 신호 | 분리 작업 |
|------|----------|
| 식당 100+ / 주문 분당 50+ | 이미지 → S3/R2 + signed upload URL |
| 이메일 발송 분당 30+ | BullMQ + Redis (sendNotification 비동기화) |
| Backend multi-instance 결정 | Socket.IO Redis adapter + JWT refresh token + revocation list |
| Dashboard query > 1초 | Daily aggregation worker + 사전 집계 테이블 |
| 운영 사고 1건 발생 | unit test + CI 즉시 도입 |
| 식당 1000+ | EXPLAIN 정기 점검 + slow query log + materialized view |

→ **현재 규모에서는 P2/P3 도입은 over-engineering**. 트리거 도달 시 진행.

---

## 6. 우선순위 실행 계획

### Week 1 — 위험 차단 (코드 변경, Claude Code 단독 진행 가능)
- [x] **C1 uploads 백업** (2026-05-03)
- [ ] **C2 Activity log** — invoices-payment, referralService, membership, users
- [ ] **C3 commission 트랜잭션 감사** — `services/referralService.js`
- [ ] **C4 fetch 헤더 sweep** — 누락 페이지 일괄 fix
- [ ] **C5 console.log 1차 정리** — invoices-main, invoices-payment

### Week 2-3 — 구조 정리 (코드 변경)
- [ ] **B5 winston 로거 도입** — `utils/logger.js` (info/warn/error + Sentry pipe)
- [ ] **B6 per-route rate limit** — dashboard, search, validate-code 패턴 확장
- [ ] **B1 invoices-main 분리** — list/get/finalize/payment/SOA (별도 PR, 영향 광범위)
- [ ] **B9 통계 사전 집계** (별도 PR, DB 모델 신규)

### Month 2+ — 인프라 도입 (사용자 결정 필요)
- [ ] 이미지 S3 마이그레이션 (referral logo / product image 부터)
- [ ] BullMQ + Redis (이메일 비동기)
- [ ] Socket.IO Redis adapter (multi-instance 준비)
- [ ] JWT refresh token + Redis revocation

### 지속
- [ ] health-check financial path 카테고리 확장
- [ ] EXPLAIN 정기 점검 자동화
- [ ] unit test + CI

---

## 7. 참고 패턴 (메모리 인덱스)

이 점검은 다음 메모리/문서들을 기반으로 함:
- IDOR sweep — `reference_idor_sweep`, `routes/restaurants-crud.js` v3.21
- path-level middleware — `reference_path_level_middleware`
- Live Orders 패턴 — `reference_live_orders_pattern`
- SchedulerRun — `reference_scheduler_run`
- Webhook HMAC + 2-stage — `reference_webhook_hmac`
- Tier gating 3-layer — `reference_tier_gating`
- Entity Polymorphic — `reference_entity_polymorphic`
- Invoice consistency — `reference_invoice_consistency`
- Suspended pin — `reference_suspended_pin`

---

## 8. 첫 유료 멀티지점 브랜드 출시 전수감사 (2026-06-08)

> **계기:** 여러 지점을 가진 브랜드 회사가 **처음으로 유료 구독 고객**이 됨. 출시 전 5개 영역(멀티테넌시 격리 / 구독·결제 정확성 / 요금제 게이팅 / 브랜드→지점 전파 / 구조 정리) 라인 단위 전수조사.
> **방법:** 5개 병렬 코드 감사(읽기 전용, 인쇄 보호파일 무접촉). 모든 항목 `파일:라인` 근거.
> **확정된 비즈니스 결정 (Irene, 2026-06-08):**
> 1. **멀티지점 청구 모델 = 지점별 인보이스 경로로 통일.** 브랜드 플랜 = 활성 지점 수 × 단가를 `EntityPlanRestaurant` 기반 인보이스로 청구. Stripe/PayPal 은 **인보이스 Checkout 결제(mode=payment)만** 사용하고 Stripe Subscriptions(자동 recurring) 경로는 멀티지점 브랜드에 쓰지 않는다. (이유: 현 `line_items quantity=1` 고정이 지점 수를 반영 못 해 과소청구. 인보이스 경로는 이미 지점별 청구 모델을 가짐.)
> 2. **착수 순서 = 전체 설계 문서 먼저** → 단계별 구현 (이 §8 이 그 설계 문서).

### 8.1 핵심 구조 진단 — 청구 체계 이원화 (모든 P0 결제 결함의 뿌리)

현재 **두 개의 평행 구독 청구 체계가 서로 동기화되지 않는다**:

| | A. Stripe/PayPal Subscriptions API | B. 로컬 인보이스 스케줄러 |
|---|---|---|
| 위치 | `routes/payments.js` → `services/stripeCheckoutService.js` | `services/invoiceScheduler.js` + `subscriptionScheduler.js` |
| 동작 | 게이트웨이가 매월 자동 charge → `Subscription` 테이블에만 mirror | cron 이 `Invoice` 행 생성, 결제는 Checkout/수동 |
| 접근차단(suspended) 판정 | **건드리지 않음** | `Restaurant.status` / `User.subscription_status` 가 결정 |

→ 접근 차단을 결정하는 건 B 의 상태 필드인데, A 의 결제 성공 webhook 이 B 를 갱신하지 않는다. **"멀티지점 브랜드 Stripe 구독" 이 정확히 두 체계의 틈에 빠진다.** 결정 1(B 경로 통일)이 이 뿌리를 제거한다.

### 8.2 P0 — 출시 전 차단 (돈 / 접근 / 격리 직결)

| ID | 결함 | 근거 (`파일:라인`) | 증상 | 수정 설계 |
|----|------|--------------------|------|-----------|
| **P0-1** | 엔티티 구독 결제 → suspended 복구 부재 | `webhooks-payments.js:173` (`invoice.paid` 로그만), `invoiceLifecycle.js:39` + `subscriptionScheduler.js:421` (restaurant_id 있는 인보이스만 복구, brand/foodcourt/owner 는 'elsewhere' 주석뿐 — 실제 부재). `subscriptionScheduler.js:389` 는 suspended 를 로드 대상에서 제외 | 브랜드가 매월 정상 결제해도 접근 차단 영구 지속 | `handleInvoicePaid` 에 `payer_type ∈ {brand_manager, foodcourt_manager, restaurant_owner}` → 해당 User `subscription_status='active'` 복구 분기 추가. 결정1 통일 후 인보이스 결제가 유일 복구 트리거 |
| **P0-2** | 멀티지점 entitlement 소스 분리 | `requireModule.js:202` + `restaurants-crud.js:2166` 는 `restaurant.plan_type` 만 읽음. 브랜드 플랜 배정 `brands-plans.js:429` 는 `EntityPlanRestaurant` 에만 쓰고 `plan_type` 미설정 | 게이트 추가해도 브랜드 지점은 entitlement 안 보여 fail-open/오작동 | **단일 resolver** 도입 — `resolveBranchModules(restaurant)` 가 `restaurant.plan_type` 없으면 `EntityPlanRestaurant→EntityPlan.included_modules` 로 폴백. `requireRestaurantModule`/`allowed-routes` 양쪽이 이 resolver 사용 |
| **P0-3** | Advanced 기능 백엔드 게이팅 부재 (UI만 차단) | `requireModule.js:8` 주석 스스로 "curl 통과" 경고. 게이트 0: `inventory-core.js`(auth+access만), `ingredients.js`/`recipes.js`, `purchase-orders-crud.js:91`(role만), `purchase-invoices.js`, `supplier-directory.js`, `brand-inventory.js`, `brand-products.js` | 베이직 지점이 API 직접 호출로 Advanced 전부 사용 | 모범 패턴(`supplier-products.js:77` `baseGates` router-level) 복제 — 각 라우터 `router.use(requireRestaurantModule(...))` / `requireBrandModule(...)`. P0-2 resolver 위에 얹음 |
| **P0-4** | PayPal webhook fail-open | `webhooks-payments.js:238` webhookId 미설정 시 서명검증 통째 skip, `:347` `custom_id`(invoice_id)만으로 paid 처리 | webhookId 누락 시 인증 없는 외부 POST 로 임의 청구서 무료 결제완료 | webhookId 없으면 **fail-closed (400)**. graceful degrade 제거. Stripe 는 이미 `constructEvent` 강제(양호) |
| **P0-5** | 대시보드 미인증 + 미스코프 | `dashboard.js:20/118/174/190/212` (`authenticateToken` 없음, "legacy" 주석, restaurant 필터 없음) | 토큰 없이 전 매장 매출·최근주문(고객명/금액) 노출 | 라우터 `router.use(authenticateToken)` + `req.user.restaurant_id` WHERE 강제. `/admin/stats` 는 `requireRole('System Admin')`. 미사용이면 라우트 폐기 |
| **P0-6** | cross-tenant IDOR (소유권 검사 누락) | `coupons.js`(라우터 전체 `checkRestaurantAccess` 0), `optionGroups.js:67/168/275`(`:id` row 검사 없음), `store.js:16`(GET /settings 검사 없음 — PUT만 있음), `orders-crud.js:882/1275/1321/1505/2083`(PATCH status/discount/items/item-delete 소유권 누락) | 지점A 가 `?restaurant_id=B` / id 순회로 지점B 데이터 열람·수정·삭제 | 모범 `inventory-core.js:29`(`router.use('/:restaurantId', checkRestaurantAccess)`) + `menu.js`(`checkProductTenant` row-level) 패턴 복제. `:id` 핸들러에 `row.restaurant_id !== req.user.restaurant_id && role!=='System Admin'` → 403 |

### 8.3 P1 — 정확성 / 무결성 (출시 직후 우선)

| ID | 결함 | 근거 | 수정 |
|----|------|------|------|
| **P1-1** | fixed 할인 음수 인보이스 | 스케줄러 `invoiceScheduler.js:240` 는 `Math.min` 캡, 권위 함수 `recomputeInvoiceTotals` 는 캡 없이 사용 → total 음수 → `stripeCheckoutService.js:180` `amount<=0` throw 로 결제 불능 | `recomputeInvoiceTotals` 에 `discountAmount = Math.min(round2(dv), subtotal)` + `total = Math.max(0, ...)` |
| **P1-2** | webhook 금액 cross-check 부재 | `webhooks-payments.js:138/267/355` 게이트웨이 실결제액과 `invoice.total_amount` 대조 없이 무조건 paid | 게이트웨이 보고액 ≠ DB 금액이면 flag/보류 |
| **P1-3** | 중복 결제 세션 가드 부재 | `payments.js:114` `gateway_session_id` 이미 있어도 새 세션 생성 차단 안 함 | 진행 중 세션 재사용 또는 차단 |
| **P1-4** | 브랜드 대납 결제 차단 가능 | `payments.js:32` `ensurePayerAccess` 가 brand owner 의 소속 지점(`restaurant.brand_id ∈ 내 브랜드`) 결제 케이스 누락 → 403 | brand 소유 지점 대납 허용 분기 (결정1 핵심 흐름) |
| **P1-5** | health-check 취약점 은폐 + 커버 0 | `health-check.js:327` 미인증 레거시 200 을 "정상 통과"로 검증(취약점 은폐). payment 카테고리는 "없는 주문 404" 3건뿐 — 게이팅/IDOR/복구 커버 0 | P0 수정 후 **익명차단·cross-tenant 403·게이팅·suspended복구·인보이스 금액무결성** 케이스 영구 추가 |
| **P1-6** | 신규 지점 브랜드 메뉴 backfill 부재 | `restaurants-crud.js:1125/1656` brand_id 세팅 시 `pushBrandMenuToRestaurants` 호출 0, afterCreate 훅 없음 | brand_id 최초 세팅 시 해당 브랜드 `is_active` BrandMenu 전체 best-effort backfill |
| **P1-7** | lock 미강제 (전파 우회) | `menu.js:549` lockKey 맵 5필드뿐 — `set_items`/`sort_order`/`display_order` 누락. DELETE `:897` 는 lock 검사 자체 없음 | lockKey 맵에 set_items/sort_order 추가, DELETE 에 brand_menu_id+lock 가드 |

### 8.4 P2 — 구조 / 아키텍처 정리 (출시와 병행 가능)

- **models/index.js 6개 미등록** — `ActivityLog/CompanySettings/Coupon/ContactInquiry/Content/ContentCategory` 가 중앙 레지스트리 우회(직접 require). index.js require+exports 등록 + 라우트 `db.X` 통일.
- **비대 파일** — `SettingsPage.tsx` **8055줄**(최우선 탭별 분리), `restaurants-crud.js` 2235, `contracts.js` 1452, Admin/Manager `RestaurantsPage` 2867/2981(역할별 중복 의심). (인쇄 보호파일 `POSTerminalPage`/`MainLayout`/`KitchenDisplayPage`/`orders-crud` 는 분리 보류.)
- **응답 형식 비표준 27건** (`res.json({error})`) — `restaurants-crud.js` 9건 등. 수정 범위 내에서 `{success:false, message}` 통일. (webhook 8건은 외부 수신용, 제외.)
- **스캐폴드 페이지 9개** (UI만, API 미연동 — FoodcourtManagement/TenantSupport/SecurityPage/BackupRestorePage/SystemConfigPage 등) — **유료 고객 노출 전 숨김 또는 완성**. "클릭하면 빈 화면" 신뢰 손상 방지.
- **CLAUDE.md 문서 드리프트** — 보안표가 존재하지 않는 `app.js` 지칭(실제 server.js). 문서만 교정.

### 8.5 P3 — 추가 전수검사 권장 (코드 수정 아님, 검증 활동)

1. **실데이터 entitlement 정합성 실측** — 실제 들어올 브랜드 매장의 `plan_type` vs `EntityPlanRestaurant` 불일치를 운영 DB 로 확인(P0-2 가 실제로 어떻게 터지는지).
2. **결제 webhook sandbox e2e** — Stripe/PayPal 테스트 구독 1건 결제 → suspended 해제까지 실제로 흐르는지(P0-1 검증). 운영 webhook URL 절대 금지, sandbox 만.
3. **BG 멀티지점 headless sweep** — `scripts/headless-page-sweep.js` 를 멀티지점 BG 계정으로 1바퀴(빈 메뉴/스캐폴드 페이지 mount 확인).

### 8.6 실행 순서 (단계별, 각 단계 후 검증 + Irene 확인)

```
Phase 0 (설계)        ← 이 §8 (완료, 2026-06-08)
Phase 1 (격리)        P0-5, P0-6  — 모범 패턴 복제, 부작용 적고 즉효. health-check 익명/IDOR 케이스 동반 추가
Phase 2 (게이팅 기반)  P0-2 단일 resolver → P0-3 라우터 게이트. resolver 먼저(게이트의 토대)
Phase 3 (결제 정확성)  P0-1, P0-4, P1-1~P1-4 — 결정1(지점별 인보이스 통일) 반영. ★sandbox e2e 필수, 인쇄급 신중
Phase 4 (전파)        P1-6, P1-7
Phase 5 (안전망)       P1-5 health-check 영구 확장 (Phase1~3 각 케이스 누적)
Phase 6 (구조)         P2 — 병행 가능, 우선순위 낮음
```

> **검증 게이트(각 Phase 공통):** build:dev 성공 → 실 API 호출 검증(저장/조회 라운드트립) → health-check 전체 통과 → 멀티지점 BG 계정 실흐름 → check-print-guard 0(인쇄 무관 확인). Phase 3 은 sandbox 결제 e2e 추가 의무. **운영 배포는 Phase 별 Irene `/배포` 명시 지시만.**

### 8.8 구현 진행 상태 (2026-06-08, DEV 미배포)

- **Phase 1 (격리) — 완료·검증.** P0-5 dashboard 미인증 5라우트 폐기. P0-6 IDOR 가드(coupons/optionGroups/store/orders PATCH 5 + merge). auth.js `userCanAccessRestaurant` 헬퍼. health-check IDOR 11케이스 추가. 실호출 7/7 차단·본인지점 정상. print-guard 재bless. **98→100/100.**
- **Phase 2 (게이팅) — 완료.** (Wave A 레스토랑 Advanced + Wave B-1 브랜드 Advanced 적용·검증. Wave B-2 buyer 버티컬은 실익 0+지점 과차단 리스크로 보류.)
  - P0-2 **완료**: `resolveRestaurantModules`(plan_type ∪ 활성 EntityPlanRestaurant→EntityPlan, 합집합) 단일 resolver. `requireRestaurantModule` 이를 사용 + 배열 any-of. `allowed-routes`도 동일 resolver(UI=백엔드 일치).
  - P0-3 **Wave A 완료**(레스토랑 Advanced): inventory(inventory-routes barrel) / recipes(recipes.js) / ingredients(restaurants-ingredients.js + ingredients.js). path-prefix로 좁혀 fall-through 안전. brand-* 읽기 비차단. **실측 과차단 0건.** health-check tier gate 2케이스. **100/100.**
  - P0-3 **Wave B-1 (브랜드 Advanced) 완료**(2026-06-08): `brand-products`(BG 유저 스코프 — `requireBrandUserModule('brand_products')`, `/brand-products`·카테고리·옵션그룹·상품레시피. 레스토랑 카탈로그 읽기 `/brands/:brandId/products`는 비차단) + `brand-inventory`(`requireBrandModule('brand_inventory','brandId')`, `/brands/:brandId/inventory*`만). `requireBrandModule` param화 + `requireBrandUserModule` 신규(BG 유저 owner plan_type). **영향측정: 차단=plan없는 테스트브랜드 2건뿐, 실 Enterprise·데모 전부 통과(과차단 0).** 유닛 3경로(차단/데모/Enterprise) + 실API 검증. health-check 100/100, print-guard 8/8.
  - P0-3 **Wave B-2 (buyer 버티컬) — 보류/생략 (Irene 결정, 2026-06-08)**: PO/구매인보이스/공급사디렉토리. 영향측정 결과 buyer_* 모듈이 **모든 플랜에 이미 포함 → 페이월 실익 0**(아무도 안 막힘) + **EntityPlan(지점 프랜차이즈 플랜)엔 buyer_* 없어 brand/fc 지점 발주 과차단 리스크**. 실익 0 + 출시 리스크 → 게이트 미적용. (필요 시 향후 owner plan_template resolve 로 방어적 적용 가능 — `requireBuyerModule` 미구현.) **→ Phase 2 (게이팅) 완료.**
  - ⚠ **운영 배포 전 필수**: 운영 DB로 §8.5-1 영향측정 재실행 + 실 Enterprise 지점 200 허용 확인(dev엔 비데모 Enterprise 0개). 그 후 /배포.
- **Phase 3~6 미착수** (결제 통일 / 전파 / 안전망 / 구조).

### 8.7 영향 받는 파일 (수정 예정 — 인쇄 보호파일 제외)

- 백엔드: `routes/dashboard.js`, `coupons.js`, `optionGroups.js`, `store.js`, `orders-crud.js`(※ print 블록 무접촉, PATCH 소유권 가드만), `payments.js`, `webhooks-payments.js`, `menu.js`, `restaurants-crud.js`, `inventory-core.js`/`ingredients.js`/`recipes.js`/`purchase-orders-crud.js`/`brand-products.js`/`brand-inventory.js`(게이트 추가), `middleware/requireModule.js`(resolver), `services/invoiceLifecycle.js`/`subscriptionScheduler.js`/`invoiceScheduler.js`, `utils/invoiceCalculation.js`, `models/index.js`, `scripts/health-check.js`
- 문서: 이 문서(§8), `CLAUDE.md`(app.js 교정), 결제 상세는 `PAYMENT_ARCHITECTURE.md` 교차참조
