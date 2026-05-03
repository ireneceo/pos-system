# 실서비스 운영 준비 점검 (Operational Readiness Audit)

> **최초 작성:** 2026-05-03
> **기준:** 실고객 SaaS 운영 (MVP/데모용 X)
> **현재 규모:** 식당 25개 / 이미지 32MB / 결제 일 100건 이내 / 단일 backend instance

---

## 1. 현재 잘 되어 있는 부분 (Baseline)

| 영역 | 현황 | 위치 |
|------|------|------|
| 관측 | Sentry BE+FE 이중, environment/component 분리 | `server.js:50,96`, `index.tsx:26` |
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

---

## 4. 처리 이력

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
