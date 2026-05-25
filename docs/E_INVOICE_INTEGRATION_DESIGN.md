# E-Invoice Integration Design — Malaysia LHDN MyInvois

> **Status**: 설계 완료 (2026-05-25). 구현은 별도 사이클.
> **Author**: 설계 — `/기능설계` 6단계.
> **Scope**: 6 단계 중 1~4 (기능/API/DB/UI) + 6 (테스트 시나리오). 5단계 (코드 구현) = 다음 세션.

---

## 0. 정책 배경 (2026-05-25 기준)

### Phase 일정
| Phase | 매출 임계값 (annual turnover) | 시행일 | 현황 |
|-------|----------------------------|--------|------|
| Phase 1 | > RM100M | 2024-08-01 | 시행 중 |
| Phase 2 | RM25M-100M | 2025-01-01 | 시행 중 |
| Phase 3 | RM5M-25M | 2025-07-01 | 시행 중 |
| Phase 4 | **RM1M-5M** | **2026-01-01** | **시행 중** |
| 면제 | < RM1M | 무기한 | (RM500K→RM1M 상향, 2025-12-07) |

**Penalty-free 기간**: Phase 4 매장은 **2027-12-31** 까지 consolidated 만 제출해도 처벌 면제.

### 핵심 규칙
- **B2C 일반**: 월말 후 7일 이내 consolidated 1건으로 LHDN 제출 (cron). buyer TIN = 공용 `EI00000000010`.
- **B2C RM10K+ 또는 손님 요청**: 즉시 개별 e-invoice 발행 + 손님 TIN/이름/주소 캡처. 72시간 내 검증.
- **B2B (공급업체 → 매장)**: 공급업체가 e-invoice 발행. 미발행 시 매장이 self-billed 발행 의무.
- **RM10,000 임계값 (2026-01-01 발효)**: 단일 거래가 RM10K 이상이면 consolidated 묶기 금지 — 무조건 개별.

### 처벌
**Section 120(1)(d) ITA 1967**: per invoice RM200~RM20,000 + 최대 6개월 징역. 100건 누락 시 이론상 최대 RM2M.

### 1차 출처
- LHDN e-Invoice Timeline: https://www.hasil.gov.my/en/e-invoice/implementation-of-e-invoicing-in-malaysia/e-invoice-implementation-timeline/
- LHDN FAQs PDF: https://www.hasil.gov.my/media/0xqitc2t/lhdnm-e-invoice-general-faqs.pdf
- MyInvois SDK: https://sdk.myinvois.hasil.gov.my/
- MyInvois API: https://sdk.myinvois.hasil.gov.my/einvoicingapi/

---

## 1단계: 기능 정의

### 기능명
**PurpleHere E-Invoice Integration** — LHDN MyInvois 통합으로 매장의 모든 거래에 대한 e-invoice 자동 발행/제출

### 목적
1. Phase 4 (RM1M+) 의무 매장의 법적 컴플라이언스 보장 (처벌 RM200~20K/invoice 회피)
2. 매장이 별도 도구 (MyInvois Portal 수동 입력, jomeinvoice 등) 안 쓰고 PurpleHere 안에서 끝
3. POS / Mobile order / Supplier invoice 의 모든 거래 자동 추적 → consolidated 또는 individual 적절 제출
4. 시장 경쟁력 — Storehub/FoodMarketHub/Bistrohub 와 동등 수준 (e-Invoice ready)

### 핵심 사용자
| 역할 | 역할 |
|---|---|
| **Restaurant Admin** | 매장 LHDN 정보 설정, e-invoice 이력 조회, 거부 대응 |
| **Staff** | POS 결제 시 RM10K+ 자동 트리거 + 손님 요청 시 TIN 입력 |
| **Brand General** | 가맹점들의 e-invoice 발행 현황 모니터링 (read-only) |
| **System Admin** | MyInvois sandbox/production 토글, 전체 매장 발행 상태 모니터링 |
| **Mobile Customer** | (옵션) 모바일 주문 시 e-invoice 요청 토글 + TIN 입력 |

### 핵심 유스케이스 (구체 시나리오 5개)

**UC1: B2C 일반 결제 (월 80% 거래)**
> 12:30 PM. 손님 A가 POS Terminal 에서 RM 38 결제. 영수증 발행. POS 가 거래를 `e_invoice_pending` queue 에 추가. 월말 후 cron 이 모든 pending 거래를 consolidated 1건으로 묶어 LHDN MyInvois 제출. UUID/QR 받음 → 매장 이력 페이지에서 확인 가능.

**UC2: B2C RM10K+ 자동 개별 (월 1-2건)**
> 14:00. 회사 단체 손님이 RM 12,500 결제 시도. POS 가 결제 단계에서 자동 감지 → 손님 TIN/이름/주소 입력 모달 표시 (skip 불가). 직원이 손님에게 카드 받아 입력 → POS → LHDN API 즉시 호출 (1-3초) → UUID + QR 받음 → 영수증에 QR 인쇄 → 손님 전달.

**UC3: B2C 손님 요청 (RM10K 미만, 일반)**
> 19:15. 손님 B가 RM 480 결제 후 "회사 보고용으로 e-invoice 필요" 라고 요청. 직원이 결제 완료 화면의 "Request e-Invoice" 버튼 클릭 → TIN 입력 모달 → LHDN API 호출 → QR 인쇄/이메일 송부. (72시간 내 발행 의무).

**UC4: B2B Self-billed (공급업체 미발행)**
> 매장이 식자재 RM 3,200 매입. 공급업체가 e-invoice 발행 안 함 (소규모 공급업체 = 면제 가능). 매장이 PurchaseInvoice 페이지에서 "Issue self-billed e-invoice" 클릭 → 공급업체 TIN 입력 → LHDN 제출.

**UC5: 거부/취소/재시도**
> Consolidated 제출 후 LHDN 측에서 거부 (TIN 오류). 매장 알림 + 이력 페이지에 빨간 배지. RA 가 거부 사유 확인 → 데이터 정정 → 재제출. 또는 발행된 invoice 의 취소 요청 (72시간 내).

### 기존 시스템과의 관계
| 기존 시스템 | 관계 |
|---|---|
| **Invoice (PurpleHere 자체 invoice)** | 별개 (자체 청구서). 단, 매입은 PurchaseInvoice 와 self-billed 연동 |
| **Order (POS 주문)** | 모든 결제 완료 order 가 e-invoice 대상. order.id ↔ e_invoice.source_id |
| **PurchaseInvoice (공급업체 매입)** | self-billed e-invoice 의 source |
| **Restaurant.payment_settings / operation_settings** | 별도 `e_invoice_settings` JSON 컬럼 신규 (matrix 코드 + TIN + BRN + MSIC + SST + sandbox/prod 토글) |
| **Receipt (영수증)** | RM10K+ / 손님 요청 시 QR 영역 추가 |
| **AddonModule** | `e_invoice` 모듈 등록 (기본 plan 부터 포함) |
| **SchedulerRun** | 월말 consolidated cron 의 audit log |

### 성공 기준
1. 운영 매장 (RM1M+) 모두 LHDN 의무 자동 충족 (사장이 별도 도구 안 씀)
2. RM10K+ 거래 100% 즉시 개별 발행 (consolidated 누락 0)
3. consolidated 월말 cron 7일 이내 완료 (LHDN 데드라인)
4. 거부율 < 1% (TIN 검증 사전 통과)
5. 매장 LHDN 컴플라이언스 인터뷰: "PurpleHere 안에서 다 됐다" (외부 도구 의존 0)

### 비범위 (이 사이클 X)
- ❌ Xero / QuickBooks 연동 (다음 사이클, paid add-on)
- ❌ 다국어 e-invoice PDF 자동 발송 (다음 사이클)
- ❌ B2B 직접 (공급업체 측 e-invoice 발행 — 우리는 매입 receive 만)
- ❌ Submit document with batch (10+ at once) — V1 은 single + cron loop
- ❌ Pre-validation (현재는 submit 시점에 LHDN 검증)
- ❌ Mobile customer e-invoice 요청 UI (V2 — 모바일 메뉴에 옵션 추가)
- ❌ E-invoice retry queue UI for re-submission (V2 — V1 은 cron 자동 재시도)

---

## 2단계: API 설계

### MyInvois 외부 API (LHDN 호출)

| 용도 | LHDN Endpoint | 우리 사용 시점 |
|---|---|---|
| OAuth Token | `POST /connect/token` | 매 batch 시작 / token expire 시 |
| Submit Document | `POST /api/v1.0/documentsubmissions` | 개별/consolidated 제출 |
| Get Document | `GET /api/v1.0/documents/{uuid}` | 검증 상태 polling |
| Search Documents | `GET /api/v1.0/documents/search` | 매장 발행 이력 조회 |
| Cancel Document | `PUT /api/v1.0/documents/state/{uuid}/state` | 72시간 내 취소 |
| Validate Taxpayer TIN | `GET /api/v1.0/taxpayer/validate/{tin}?idType=...&idValue=...` | TIN 입력 모달에서 실시간 |

### Internal API (PurpleHere 신규 endpoints)

| METHOD | Path | Role | Auth | Body / Response |
|---|---|---|---|---|
| GET | `/api/restaurants/:id/e-invoice-settings` | RA / SA / BG (read-only) | `authenticateToken` + `checkRestaurantAccess` | Response: `{ success, data: { tin, brn, msic_code, sst_no, address, contact, mode (sandbox/production), enabled, last_consolidated_at } }` |
| PUT | `/api/restaurants/:id/e-invoice-settings` | RA / SA | `authenticateToken` + `requireRole('Restaurant Admin','System Admin','Restaurant Owner')` + `checkRestaurantAccess` | Body: `{ tin, brn, msic_code, sst_no, address, contact, mode, enabled }` — whitelist validation (LHDN 형식: TIN 12자, BRN 12자, MSIC 5자) |
| POST | `/api/e-invoice/validate-tin` | RA / Staff | `authenticateToken` + `checkRestaurantAccess` | Body: `{ tin, idType: 'BRN'\|'NRIC'\|'PASSPORT'\|'ARMY', idValue }`. Response: `{ valid: bool, name?, message? }` (LHDN proxy) |
| POST | `/api/e-invoice/issue-individual` | RA / Staff | `authenticateToken` + `checkRestaurantAccess` | Body: `{ order_id, buyer: { tin, name, address, contact, idType, idValue }, reason?: 'rm10k'\|'customer_request' }`. Response: `{ success, data: { e_invoice_id, uuid, status, qr_url, validation_result } }` |
| POST | `/api/e-invoice/issue-self-billed` | RA | `authenticateToken` + `checkRestaurantAccess` | Body: `{ purchase_invoice_id, supplier: { tin, name, address }, items[] }`. Response: `{ success, data: { e_invoice_id, uuid, status } }` |
| PUT | `/api/e-invoice/:uuid/cancel` | RA | `authenticateToken` + `checkRestaurantAccess` | Body: `{ reason }`. 72시간 내만 허용. Response: `{ success, data: { uuid, status: 'cancelled' } }` |
| GET | `/api/e-invoice/list` | RA / SA / BG / Owner | `authenticateToken` + `checkRestaurantAccess` (or scope filter) | Query: `?restaurantId=&status=&from=&to=&page=&limit=`. Response: `{ success, data: { rows[], total, page, limit } }` |
| GET | `/api/e-invoice/:uuid` | RA / SA | `authenticateToken` + tenant guard | Response: `{ success, data: { ...e_invoice + LHDN 검증 결과 } }` |
| POST | `/api/e-invoice/consolidate/preview` | RA / SA | `authenticateToken` + `checkRestaurantAccess` | Body: `{ month: 'YYYY-MM' }`. Response: pending order 수 + 총액 (제출 전 미리 보기) |
| POST | `/api/e-invoice/consolidate/run` | RA / SA (수동 트리거) | `authenticateToken` + `requireRole('Restaurant Admin','System Admin','Restaurant Owner')` | Body: `{ month }`. cron 외 수동 실행. idempotent (중복 제출 차단) |
| GET | `/api/e-invoice/consolidate/batches` | RA / SA | `authenticateToken` + tenant guard | 매장의 월별 consolidated batch 이력 |
| POST | `/api/e-invoice/webhook/lhdn` | LHDN 측 callback | HMAC verify | (옵션) LHDN async 검증 결과 webhook 받는 endpoint. signature/timestamp/payload_hash UNIQUE (memory: `Webhook HMAC + 2-stage`) |

### 라우트 파일 분리
- `dev-backend/routes/e-invoice-settings.js` — 매장 settings CRUD (GET/PUT)
- `dev-backend/routes/e-invoice.js` — issuance / cancel / list / validate-tin
- `dev-backend/routes/e-invoice-consolidate.js` — consolidated preview / run / batches
- `dev-backend/routes/e-invoice-webhook.js` — LHDN async callback (옵션)

### 서비스 레이어
- `dev-backend/services/myinvois.js` — LHDN API client (OAuth + Submit + Search + Cancel + Validate). 모든 라우트에서 재사용.
- `dev-backend/services/eInvoiceMapper.js` — Order → MyInvois JSON 변환 (55 필드 매핑)
- `dev-backend/services/eInvoiceConsolidated.js` — 월말 cron 로직

### 응답 형식 / 에러 표준
- 성공: `{ success: true, data: {...} }`
- 실패: `{ success: false, error: { message, code, fieldErrors? } }` (글로벌 errorHandler 사용)
- LHDN 에러는 `error.lhdnDetails` 에 부가 정보 (정정 가이드)
- Rate limit: `/api/e-invoice/validate-tin` — IP당 15분 100회 (TIN 검증 남용 방지)

---

## 3단계: DB 설계

### 신규 테이블 4개

#### Table 1: `e_invoice_settings` (매장별 LHDN 설정)
| 컬럼 | 타입 | NULL | Default | 설명 |
|---|---|---|---|---|
| `id` | INT PK AI | NO | | |
| `restaurant_id` | INT FK | NO | | `restaurants(id)` ON DELETE CASCADE |
| `tin` | VARCHAR(20) | YES | NULL | LHDN TIN (12 자리 + prefix) |
| `brn` | VARCHAR(20) | YES | NULL | 사업자등록번호 (SSM) |
| `msic_code` | VARCHAR(10) | YES | NULL | MSIC industry code (5자리, 예: 56101) |
| `sst_no` | VARCHAR(30) | YES | NULL | Service Tax 등록번호 |
| `address_line1` | VARCHAR(150) | YES | NULL | LHDN 등록 주소 (영수증 주소와 다를 수 있음) |
| `address_line2` | VARCHAR(150) | YES | NULL | |
| `city` | VARCHAR(50) | YES | NULL | |
| `state` | VARCHAR(50) | YES | NULL | Malaysia 13 주 |
| `postcode` | VARCHAR(10) | YES | NULL | |
| `country_code` | CHAR(3) | NO | 'MYS' | ISO 3166-1 alpha-3 |
| `contact_number` | VARCHAR(20) | YES | NULL | LHDN 등록 연락처 |
| `contact_email` | VARCHAR(120) | YES | NULL | |
| `mode` | ENUM('sandbox','production') | NO | 'sandbox' | LHDN 환경 토글 |
| `enabled` | TINYINT(1) | NO | 0 | e-invoice 활성화 (기본 OFF, 매장 명시적 ON) |
| `lhdn_client_id` | VARCHAR(200) | YES | NULL | (옵션) 매장별 LHDN OAuth client (없으면 SA 글로벌) |
| `lhdn_client_secret_encrypted` | TEXT | YES | NULL | AES-256 암호화 |
| `last_consolidated_at` | DATETIME | YES | NULL | 마지막 consolidated 제출 시점 |
| `created_at` | DATETIME | NO | CURRENT_TIMESTAMP | |
| `updated_at` | DATETIME | NO | CURRENT_TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP |

**Index**: UNIQUE `(restaurant_id)`, INDEX `(mode, enabled)`

**Sequelize 모델**: `models/EInvoiceSettings.js`

#### Table 2: `e_invoices` (발행 이력 메인)
| 컬럼 | 타입 | NULL | Default | 설명 |
|---|---|---|---|---|
| `id` | INT PK AI | NO | | |
| `restaurant_id` | INT FK | NO | | tenant 격리 |
| `source_type` | ENUM('order','purchase_invoice','consolidated','self_billed') | NO | | 발행 source |
| `source_id` | INT | YES | NULL | order.id / purchase_invoice.id / consolidated_batch.id |
| `direction` | ENUM('issued','received') | NO | 'issued' | issued = 매장이 발행 / received = 매장이 수신 (B2B) |
| `invoice_type` | ENUM('B2C_individual','B2C_consolidated','B2B','self_billed') | NO | | LHDN 분류 |
| `buyer_tin` | VARCHAR(20) | YES | NULL | B2C consolidated 면 `EI00000000010`, B2B/individual 면 실 buyer TIN |
| `buyer_name` | VARCHAR(150) | YES | NULL | |
| `buyer_id_type` | ENUM('BRN','NRIC','PASSPORT','ARMY') | YES | NULL | |
| `buyer_id_value` | VARCHAR(30) | YES | NULL | |
| `buyer_address` | TEXT | YES | NULL | JSON: { line1, line2, city, state, postcode, country } |
| `buyer_contact` | VARCHAR(30) | YES | NULL | |
| `buyer_email` | VARCHAR(120) | YES | NULL | |
| `currency` | CHAR(3) | NO | 'MYR' | |
| `subtotal` | DECIMAL(12,2) | NO | 0 | |
| `tax_amount` | DECIMAL(12,2) | NO | 0 | SST 합계 |
| `total_amount` | DECIMAL(12,2) | NO | 0 | |
| `items_json` | LONGTEXT | NO | | LHDN 55-field line items JSON (gzip 압축 가능) |
| `status` | ENUM('draft','submitted','validated','cancelled','rejected','failed') | NO | 'draft' | |
| `uuid` | VARCHAR(50) | YES | NULL | LHDN 발급 UUID (validated 후) |
| `submission_uid` | VARCHAR(50) | YES | NULL | LHDN submission UID (검증 polling) |
| `long_id` | VARCHAR(100) | YES | NULL | LHDN long ID (URL 생성용) |
| `qr_url` | VARCHAR(300) | YES | NULL | MyInvois 검증 페이지 URL (QR 인쇄) |
| `validation_result` | JSON | YES | NULL | LHDN response (errors, validation steps) |
| `rejection_reason` | TEXT | YES | NULL | rejected/failed 시 |
| `retry_count` | INT | NO | 0 | |
| `next_retry_at` | DATETIME | YES | NULL | exponential backoff |
| `submitted_at` | DATETIME | YES | NULL | |
| `validated_at` | DATETIME | YES | NULL | |
| `cancelled_at` | DATETIME | YES | NULL | |
| `created_at` | DATETIME | NO | CURRENT_TIMESTAMP | |
| `updated_at` | DATETIME | NO | CURRENT_TIMESTAMP | ON UPDATE |

**Index**:
- UNIQUE `(uuid)` (NULL 허용)
- INDEX `(restaurant_id, status, created_at)`
- INDEX `(restaurant_id, invoice_type, submitted_at)`
- INDEX `(status, next_retry_at)` — 재시도 큐
- INDEX `(source_type, source_id)` — order ↔ e-invoice 조회

**Sequelize 모델**: `models/EInvoice.js`

#### Table 3: `e_invoice_consolidated_batches` (월말 batch 메타)
| 컬럼 | 타입 | NULL | Default | 설명 |
|---|---|---|---|---|
| `id` | INT PK AI | NO | | |
| `restaurant_id` | INT FK | NO | | |
| `period_year` | SMALLINT | NO | | 예: 2026 |
| `period_month` | TINYINT | NO | | 1-12 |
| `total_orders` | INT | NO | 0 | 묶인 order 수 |
| `total_amount` | DECIMAL(14,2) | NO | 0 | |
| `e_invoice_id` | INT FK | YES | NULL | `e_invoices(id)` — batch 의 e_invoice row |
| `status` | ENUM('preview','running','completed','failed') | NO | 'preview' | |
| `triggered_by` | ENUM('cron','manual','admin') | NO | 'cron' | |
| `triggered_by_user_id` | INT FK | YES | NULL | manual/admin 시 |
| `started_at` | DATETIME | YES | NULL | |
| `completed_at` | DATETIME | YES | NULL | |
| `error` | TEXT | YES | NULL | |
| `created_at` | DATETIME | NO | CURRENT_TIMESTAMP | |
| `updated_at` | DATETIME | NO | CURRENT_TIMESTAMP | ON UPDATE |

**Index**: UNIQUE `(restaurant_id, period_year, period_month)`, INDEX `(status, started_at)`

**Sequelize 모델**: `models/EInvoiceConsolidatedBatch.js`

#### Table 4: `e_invoice_audit_logs` (감사 로그)
| 컬럼 | 타입 | NULL | Default | 설명 |
|---|---|---|---|---|
| `id` | INT PK AI | NO | | |
| `restaurant_id` | INT FK | NO | | |
| `e_invoice_id` | INT FK | YES | NULL | NULL = settings 변경 |
| `action` | ENUM('settings_changed','submitted','validated','rejected','cancelled','retry','manual_consolidate') | NO | | |
| `performed_by_user_id` | INT FK | YES | NULL | NULL = system/cron |
| `performed_by_name` | VARCHAR(150) | NO | 'System' | snapshot |
| `details` | JSON | YES | NULL | before/after, error message 등 |
| `created_at` | DATETIME | NO | CURRENT_TIMESTAMP | |

**Index**: `(restaurant_id, created_at)`, `(e_invoice_id, created_at)`

**Sequelize 모델**: `models/EInvoiceAuditLog.js`

### 기존 테이블 ALTER
| 테이블 | ALTER | 이유 |
|---|---|---|
| `orders` | `+ e_invoice_status ENUM('pending','consolidated','individual','exempt') DEFAULT 'pending'` | order 별 e-invoice 처리 상태 추적 |
| `orders` | `+ e_invoice_id INT NULL FK e_invoices(id)` | individual 발행 시 즉시 link |
| `purchase_invoices` | `+ e_invoice_received_uuid VARCHAR(50) NULL` | 공급업체 발행한 e-invoice 의 UUID 수신 |
| `purchase_invoices` | `+ self_billed_e_invoice_id INT NULL FK e_invoices(id)` | self-billed 발행 시 link |

### `models/index.js` Association
- `Restaurant.hasOne(EInvoiceSettings, { foreignKey: 'restaurant_id' })`
- `Restaurant.hasMany(EInvoice, { foreignKey: 'restaurant_id' })`
- `EInvoice.belongsTo(Restaurant)`
- `EInvoice.belongsTo(Order, { as: 'sourceOrder', foreignKey: 'source_id', constraints: false })`
- `EInvoice.hasOne(EInvoiceConsolidatedBatch, { foreignKey: 'e_invoice_id' })`
- `EInvoiceConsolidatedBatch.belongsTo(Restaurant)`
- `EInvoiceAuditLog.belongsTo(Restaurant)`
- `EInvoiceAuditLog.belongsTo(EInvoice)`

### 마이그레이션 전략
- `sync-database.js` 가 처리할 수 있는 부분: 신규 테이블 4개 + 신규 컬럼 (NULL 허용)
- 수동 ALTER 필요: ENUM 추가/변경 (orders.e_invoice_status, purchase_invoices.*)
- 신규 idempotent 마이그 스크립트: `scripts/migrate-e-invoice-init.js`
  - CREATE TABLE IF NOT EXISTS 4개
  - ALTER orders / purchase_invoices (IF NOT EXISTS column)
  - Restaurant 16번 (운영 매장) e_invoice_settings row 자동 생성 (enabled=0, sandbox)
- `deploy-to-production.sh` sprint migration 리스트에 등록

### 보안 / 격리
- 모든 테이블의 `restaurant_id` 컬럼 — tenant 격리 필수
- `EInvoiceSettings.lhdn_client_secret_encrypted` — AES-256 (key from .env / KMS)
- audit log immutable (updatedAt=false)
- ContentChannel, audit trail 별도 (memory: `Webhook HMAC + 2-stage` 패턴)

### MySQL 64-key 한도
신규 4 테이블이라 영향 0. orders 의 신규 컬럼 2개 추가만 점검 (현재 orders 인덱스 ~20개 추정, 여유).

---

## 4단계: UI 설계

### 페이지 / 화면 목록

| 위치 | 역할 | 신규/기존 |
|---|---|---|
| Settings → **E-Invoice 탭 신규** | RA / SA | 신규 (settings/printer 옆) |
| POS Terminal Payment 화면 | Staff / RA | 기존 페이지 + 모달 신규 (RM10K+ 자동 / 손님 요청) |
| Live Orders Detail Modal | RA / Staff | 기존 + "Issue e-Invoice" 액션 (없을 때) |
| **E-Invoices** 메뉴 (사이드바 신규) | RA / SA / BG / Owner | 신규 list 페이지 |
| E-Invoice Detail Modal | RA / SA | 신규 (list 에서 열림) |
| Purchase Invoices 페이지 | RA | 기존 + "Self-bill e-Invoice" 액션 |
| Admin → E-Invoice Monitor | SA | 신규 (전체 매장 발행 상태 대시보드) |

### 사이드바 메뉴 추가 (`MainLayout.tsx`)

Restaurant Admin 사이드바의 "Invoices" 그룹 아래:
```
Invoices
  ├ Customer Invoices (기존)
  ├ Purchase Invoices (기존)
  └ E-Invoices (신규) ← 여기
```

Brand General / Foodcourt General / Owner 도 동일 위치. System Admin 은 별도 "E-Invoice Monitor" (admin 영역).

### 페이지 1: Settings → E-Invoice 탭

**역할**: RA / SA / Restaurant Owner (RA scope 기준).

**섹션**:
1. **LHDN Registration Info** 카드:
   - TIN (12자, 입력 시 LHDN validate-tin API 호출 → 매장명 자동 채움)
   - BRN (SSM 사업자등록번호)
   - MSIC code (드롭다운: 561011 Restaurant / 561023 Cafe / 561029 Other F&B 등 미리 등록)
   - SST number (있는 경우만)
   - Address (line1 / line2 / city / state / postcode) — `<AddressFields>` 컴포넌트 재사용
   - Contact (phone + email)

2. **Mode Toggle** 카드:
   - Sandbox vs Production (radio 또는 toggle)
   - LHDN Client ID / Client Secret (선택 — 매장별 별도 자격증명, 없으면 SA 글로벌)
   - "Test connection" 버튼 (Sandbox 에서 OAuth + Submit dummy 시도)

3. **Enable Switch** (모든 입력 후에만 활성화 가능):
   - "Enable E-Invoice for this restaurant" toggle
   - OFF 일 때 모든 거래는 e-invoice 처리 안 됨 (기존 동작)
   - ON 일 때 cron + RM10K 트리거 + 손님 요청 활성

4. **Status** 카드 (read-only):
   - Last consolidated submission: `2026-04-30 23:59` ✓ Validated
   - Pending consolidated this month: 142 orders / RM 8,234.50
   - Failed in last 24h: 0
   - Test sandbox 결과 (마지막 test connection 시점)

**UX**:
- AutoSaveField 패턴 (모든 입력 변경 시 자동 저장)
- TIN 입력 시 600ms debounce 후 LHDN validate-tin 호출 → 일치 시 "✓ ABC Sdn Bhd" 표시
- Mode 변경 시 confirm 모달 ("운영 모드로 전환하면 실제 LHDN 에 제출됩니다")
- Enable toggle ON 시 confirm 모달 (Tax compliance 책임)

**i18n**: namespace `settings` (기존) + 신규 키 ~30개

### 페이지 2: POS Terminal Payment 화면 (기존 + 트리거 추가)

**기존 흐름**: 결제 버튼 → 결제 수단 선택 → 완료 → 영수증.

**신규 분기**:
- 결제 금액 ≥ RM10,000 → **자동 트리거**: "이 거래는 RM10,000 이상이라 e-invoice 가 필요합니다" 모달 → buyer TIN 입력 (skip 불가) → LHDN API 호출 → QR 인쇄.
- 손님 요청 시: 결제 완료 화면에 "Issue e-Invoice" 버튼 → 동일 TIN 입력 모달 → 발행.
- 매장 e-invoice **disabled** 면 트리거 안 함 (영수증만, consolidated 안 묶임).

**TIN 입력 모달**:
- ID Type 라디오: BRN (사업자) / NRIC (개인) / Passport / Army
- ID Value 입력 (자동 형식 검증)
- TIN (자동 LHDN validate, 매장명 자동 채움 — 변경 가능)
- Address (간략: city/state/postcode)
- Contact (phone or email — 최소 1개)
- "Issue Now" 버튼 → API 호출 → 결과 모달 (✓ UUID + QR 또는 ✗ 거부 사유)

**영수증 변경**:
- Footer 에 LHDN QR 영역 (e-invoice 발행 성공 시만)
- QR 클릭 → MyInvois 검증 페이지로 이동
- Validation UUID 도 텍스트로 함께 인쇄

### 페이지 3: E-Invoices 사이드바 페이지 (신규)

**역할**: RA / SA / BG / Owner.

**구성**:
- Top filter bar: 기간 (DateRangeField) / status (multi-select chip) / invoice_type / search
- Stats 카드 4개: 이번 달 발행 / 검증 / 거부 / 취소
- DataTable:
  - 컬럼: 발행일 / Invoice Type / Buyer Name / Total / Status badge / UUID / Action (Detail / Cancel)
- 빈 상태: "아직 e-invoice 발행 이력 없음. 결제 시 자동 또는 손님 요청 시 발행됩니다."

**Detail Modal**:
- LHDN 검증 결과 (성공 / 실패 step-by-step)
- buyer / items / 합계
- QR code preview (재인쇄 가능)
- Cancel button (72시간 내만, 사유 입력)
- 발행 이력 (audit log)

### 페이지 4: Admin E-Invoice Monitor (신규, SA 전용)

- 전체 매장의 e-invoice 활성화 / 발행량 / 거부율 dashboard
- 매장별 sandbox/production 모드 일괄 조회
- 거부 발생한 매장 알림 list
- 매월 consolidated batch 완료 매장 / 미완료 매장
- 위치: 사이드바 Admin 영역의 "Monitoring" 아래

### 모달 (전체)
| 모달 | 사용 위치 | 표준 컴포넌트 |
|---|---|---|
| TIN Input (buyer 입력) | POS Payment / Live Orders Detail | `<CommonModal>` |
| Mode Change Confirm | Settings | `<ConfirmModal>` |
| Enable Confirm (compliance) | Settings | `<ConfirmModal>` |
| Test Connection Result | Settings | `<ConfirmModal singleButton>` |
| E-Invoice Detail | E-Invoices list | `<CommonModal>` |
| Cancel Confirm (72h 내) | E-Invoice Detail | `<ConfirmModal>` |
| Self-billed Form | Purchase Invoices | `<CommonModal>` |

모든 모달 `components/UI/Modal` 표준. `alert()` / `toast.success` 금지.

### 빈 상태 / 로딩 / 에러
- 빈 상태: 아이콘 (lucide `<FileText>`) + 한 줄 설명 + CTA ("Configure in Settings")
- 로딩: 스켈레톤 (기존 DataTable 패턴 재사용)
- 에러: 빨간 배지가 아닌 inline alert + "Resolve" 액션 (예: TIN 정정 → 재제출)
- 거부 (rejected): 빨간 배지 + 거부 사유 + "Retry" 또는 "Edit & Resubmit" 버튼

### 반응형
- Settings 탭 / E-Invoices list: 768px 이하 → grid 1fr, 카드 stack
- POS Terminal 의 TIN 모달: 모바일에서도 사용 가능 (반응형 패턴)

### i18n 4언어 신규 키 추정
- `settings:eInvoice.*` ~40 키
- `eInvoice:*` (신규 namespace) ~80 키 (페이지 + status + error messages)
- 4언어 (en/ms/zh/ko) × 120 키 = 480 entries
- 운영 매장 톤: 말레이시아 시장이라 **ms / en 우선**, zh / ko 보조

### 디자인 토큰
- Status badge 색상:
  - draft: `#9CA3AF` 회색
  - submitted: `#F59E0B` 노랑
  - validated: `#10B981` 초록
  - cancelled: `#6B7280` 진회색
  - rejected/failed: `#EF4444` 빨강
- LHDN QR 영역: PurpleHere violet `#635BFF` 테두리 + QR 흰 배경 + UUID 회색 텍스트
- Enable toggle: 기존 `<ToggleSwitch>` 그대로

### AutoSaveField 적용
- Settings → E-Invoice 탭의 모든 input/select 는 AutoSaveField 표준 (memory: `AutoSaveField guide`)

### 접근성
- 모든 button `type="button"`
- TIN 입력은 `inputMode="numeric"`
- LHDN QR 이미지 `alt="MyInvois validation QR code"`
- 라벨 + 힌트 항상 짝 (LHDN 형식 안내)

---

## 5단계: 코드 구조 (다음 세션 — 본 사이클 X)

요약만 (구체 구현은 별도):

| 영역 | 파일 |
|---|---|
| Backend models | `EInvoiceSettings.js`, `EInvoice.js`, `EInvoiceConsolidatedBatch.js`, `EInvoiceAuditLog.js` + `models/index.js` association |
| Backend services | `services/myinvois.js` (LHDN client), `services/eInvoiceMapper.js` (Order → MyInvois JSON), `services/eInvoiceConsolidated.js` (월 cron 로직), `services/eInvoiceAuditLog.js` |
| Backend routes | `routes/e-invoice-settings.js`, `routes/e-invoice.js`, `routes/e-invoice-consolidate.js`, `routes/e-invoice-webhook.js` |
| Backend cron | `server.js` 또는 scheduler 에 월 1회 (1일 00:30 매장 timezone) consolidated batch trigger |
| Backend migration | `scripts/migrate-e-invoice-init.js` (idempotent) + `deploy-to-production.sh` 등록 |
| Frontend components | `pages/Settings/components/EInvoiceTab.tsx`, `pages/EInvoices/EInvoicesPage.tsx`, `pages/EInvoices/EInvoiceDetailModal.tsx`, `pages/Admin/EInvoiceMonitorPage.tsx` |
| Frontend modal | `components/EInvoice/TinInputModal.tsx`, `components/EInvoice/SelfBillForm.tsx` |
| Frontend hooks | `hooks/useEInvoiceSettings.ts`, `hooks/useEInvoices.ts` |
| Frontend integration | `pages/POSTerminal/POSTerminalPage.tsx` 결제 화면 RM10K 트리거 + "Issue e-Invoice" 버튼 |
| Frontend integration | `pages/LiveOrders/OrderDetailModal.tsx` "Issue e-Invoice" 액션 |
| Frontend integration | `pages/Settings/SettingsPage.tsx` 신규 탭 추가 |
| Frontend i18n | 4언어 × ~120 키 |
| Frontend sidebar | `components/Layout/MainLayout.tsx` 신규 메뉴 항목 |
| Frontend routes | `App.tsx` 신규 lazy route + ProtectedRoute |
| Frontend interfaces | `interfaces/eInvoice.ts` |
| Frontend addonModule | AddonModule 등록 (`e_invoice` 기본 plan 포함) |

---

## 6단계: 테스트 시나리오

### Sandbox 환경 우선
운영 매장 직접 실험 X. 매장 16번 (The Fire Korean) 의 e_invoice_settings 를 **sandbox mode** 로만 두고 운영 LHDN 에 영향 0. Production 토글은 마지막 단계.

### A. 정상 흐름 (역할별 Write → Read → Update → Delete)

| # | 시나리오 | 기대 결과 |
|---|---|---|
| A1 | RA 가 Settings → E-Invoice 탭 진입 → TIN/BRN/MSIC/SST/Address 입력 (sandbox) → Save | 200 + DB 저장 + audit log 'settings_changed' |
| A2 | RA 가 enabled toggle ON → Test connection 클릭 | sandbox OAuth + dummy submit → 성공 응답 + audit log |
| A3 | Staff 가 POS 에서 RM 5,000 결제 (RM10K 미만) | 영수증 발행 + `orders.e_invoice_status='pending'` (consolidated 대기) |
| A4 | Staff 가 POS 에서 RM 12,500 결제 → TIN 입력 모달 자동 표시 → BRN/이름/주소 입력 → Issue | 200 + e_invoice row created (status=submitted) + UUID 받음 + QR 영수증 인쇄 + audit log |
| A5 | 손님이 RM 480 결제 후 "e-invoice 필요" 요청 → Staff "Issue e-Invoice" 클릭 → TIN 모달 → Issue | A4 와 동일 흐름 |
| A6 | 월말 cron 자동 실행 (또는 manual run) → 그 달 pending order 전체 consolidated 1건으로 submit | 200 + consolidated_batch row + e_invoice (invoice_type=B2C_consolidated, buyer_tin=EI0...010) + 모든 orders.e_invoice_status='consolidated' |
| A7 | RA 가 E-Invoices 페이지에서 list 조회 → Detail 클릭 → QR 확인 → 재인쇄 | 200 + LHDN 검증 페이지 링크 작동 |
| A8 | RA 가 72시간 내 Cancel → 사유 입력 → 제출 | 200 + e_invoice.status='cancelled' + LHDN 측 취소 확인 |
| A9 | RA 가 Purchase Invoice 페이지에서 self-billed e-invoice 발행 (공급업체 미발행 시) | 200 + e_invoice (direction=issued, invoice_type=self_billed) + audit log |

### B. 권한 / Cross-tenant 격리

| # | 시나리오 | 기대 결과 |
|---|---|---|
| B1 | Staff 가 PUT `/restaurants/16/e-invoice-settings` 시도 | **403** (requireRole RA/SA/Owner) |
| B2 | Restaurant 5 의 RA 가 Restaurant 16 의 e-invoice list 조회 | **403** (checkRestaurantAccess) |
| B3 | 익명 GET `/api/e-invoice/list?restaurantId=16` | **401** |
| B4 | RA 가 다른 매장의 e_invoice UUID 로 Cancel | **403** (tenant guard) |
| B5 | BG 가 자기 brand 소속이 아닌 RA 매장의 e-invoice list 조회 | **403** (brandScope 미들웨어) |

### C. 경계 / 에러

| # | 시나리오 | 기대 결과 |
|---|---|---|
| C1 | TIN 입력 형식 잘못 (10자) | LHDN validate-tin → 400 "Invalid TIN format" |
| C2 | 존재하지 않는 TIN | LHDN validate-tin → 404 "TIN not found" |
| C3 | RM 10,000 정확히 (경계) | RM10K 트리거 발동 (≥ 적용) |
| C4 | RM 9,999.99 (경계) | 트리거 미발동 (< 임계값) |
| C5 | LHDN API timeout (5초) | 재시도 큐에 추가 + audit log + retry_count++ |
| C6 | LHDN 검증 실패 (필수 필드 누락) | status='rejected' + rejection_reason 저장 + UI 빨간 배지 |
| C7 | Consolidated 시점에 매장이 e-invoice disabled | cron skip (해당 매장만), 다른 매장은 정상 |
| C8 | Consolidated 중복 호출 (manual run 두 번) | idempotent (이미 completed 면 skip), 두 번째 호출 200 + "already done" |
| C9 | 72시간 초과한 e_invoice cancel 시도 | **400** "Cancel window expired (72h)" |
| C10 | Self-billed 발행 시 supplier TIN 없음 | 400 "Supplier TIN required" |

### D. 회귀 (기존 기능 영향 0)

| # | 시나리오 | 기대 결과 |
|---|---|---|
| D1 | 매장 e-invoice **disabled** 매장 (기존 RA-1 ~ RA-5) | 모든 기능 그대로 (영수증/결제/주문 영향 0) |
| D2 | health-check 80/80 → 전체 통과 | + e-invoice 신규 테스트 케이스 추가 시 80+N |
| D3 | Existing orders.e_invoice_status NULL → consolidated batch 영향 | 매장 disabled 면 batch 미실행 |
| D4 | POS Terminal RM 9,500 결제 (트리거 미발동) → 영수증 정상 | 기존 흐름 그대로 |

### E. 이메일 알림 (NOTIFICATION_CATEGORIES 신규 추가 필요)

| # | 트리거 | 수신자 |
|---|---|---|
| E1 | e-invoice 거부 (rejected) | RA / Restaurant Owner |
| E2 | 월말 consolidated 완료 | RA |
| E3 | 월말 consolidated 실패 (3회 재시도 후) | RA + SA (escalation) |
| E4 | Settings 변경 (TIN/BRN 등 LHDN 정보) | RA (자체 확인) — 옵션 |

### F. i18n

- 4언어 신규 키 추가 → `npm run i18n:verify` Errors 0
- ms 우선 (말레이시아 시장) + en 보조 + zh / ko 추가
- 모든 fallback 자연 (placeholder, error message 포함)

### G. 반응형

- Settings → E-Invoice 탭: 768px / 1024px / 1280px / 1440px 4 viewport overflow 0
- E-Invoices list: DataTable → 모바일 카드 변환 (기존 패턴 재사용)
- TIN Input 모달: 모바일 키보드 (inputMode 적절)

### H. 연관 영향

- Order 테이블 ALTER → Live Orders / POS Terminal / Floor Plan 의 order 표시 회귀 0
- PurchaseInvoice ALTER → 기존 매입 흐름 회귀 0
- 사이드바 menu 추가 → 다른 메뉴 위치 영향 0 (E-Invoices 만 신규)
- AddonModule `e_invoice` 등록 → 기존 plan 자동 포함 → 다른 모듈 검증 영향 0

### I. health-check 확장
새 case 추가:
- 익명 `/api/e-invoice/list?restaurantId=16` → 401
- Staff PUT settings → 403
- RA 가 Restaurant 5 → 16 의 list → 403 (cross-tenant)
- enabled=false 매장 → consolidated cron skip

### J. 운영 매장 영향 가드
- 매장 16번 sandbox mode 만, production 토글은 사용자가 명시적으로 변경할 때만
- 매장 5번 (k-dine, dev 테스트용) 사용
- 운영 LHDN 호출은 production mode 명시 + RA enabled=true 일 때만
- E2E 테스트는 모두 sandbox

### K. 검증 명령 실행

구현 후 `/검증` 10단계 자동 실행:
- 0. State hydration (신규 state 다수)
- 1. Build (타입 에러 0)
- 2. Backend pm2 restart
- 3. API 실호출 (위 A-C 모두)
- 4. 프론트 서빙 (신규 페이지 HTTP 200)
- 5. 유저 흐름 (역할별)
- 6. 요구사항 대조 (1단계 유스케이스 5개)
- 7. 연관 영향 (D)
- 8. UI/UX (디자인 토큰 + i18n + 반응형 + 접근성)
- 9. SPA 라우팅
- 10. Playwright mount sweep (Settings + POS Terminal + Live Orders + E-Invoices + Admin Monitor × 4 viewport)

---

## 일정 추정 (구현 — 다음 세션)

| Phase | 분량 | 기간 |
|---|---|---|
| 5-1: Backend models + migration | 4 모델 + 마이그 스크립트 + ALTER | 2일 |
| 5-2: Backend services + LHDN client | myinvois.js + mapper + consolidated cron | 4일 |
| 5-3: Backend routes | 4 라우트 파일 + server.js 등록 | 2일 |
| 5-4: Frontend Settings 탭 | EInvoiceTab.tsx + autosave | 2일 |
| 5-5: Frontend POS 통합 | RM10K 트리거 + TIN 모달 + QR | 3일 |
| 5-6: Frontend E-Invoices 페이지 | List + Detail + Cancel | 2일 |
| 5-7: Frontend Self-billed | Purchase Invoices 통합 | 1일 |
| 5-8: Admin Monitor | 1일 |
| 5-9: i18n 4언어 ~120 키 | 1일 |
| 5-10: AddonModule + sidebar + route | 0.5일 |
| 6: 검증 (Playwright + health-check + API 실호출) | 2일 |
| **합계** | | **약 4-5주** |

---

## 다음 세션 시작 시 빠른 진입 가이드

```
Irene: /기능설계 e-invoice 구현 시작 — docs/E_INVOICE_INTEGRATION_DESIGN.md 5단계
       또는 단계별로 (예: "5-1 backend models 먼저")
```

Claude 동작:
1. 이 문서 (`E_INVOICE_INTEGRATION_DESIGN.md`) Read
2. 5단계 첫 작업 (models + migration) 시작
3. 각 5-N 완료 시 보고 + 다음 단계 진행

설계 충돌 발견 시 — 이 문서를 먼저 update + Irene 승인 후 코드 변경.

---

## 의존성 / 사전 준비

### LHDN MyInvois 계정 (Irene 측 준비)
- Production: 매장 16번 (The Fire Korean) 사업자등록증 + LHDN MyInvois 계정 생성 (https://mytax.hasil.gov.my)
- Sandbox: SDK Portal 별도 가입 (https://sdk.myinvois.hasil.gov.my)
- Client ID / Client Secret 발급 (OAuth)
- 매장의 TIN / BRN / MSIC / SST 확인

### 매장 데이터 검증
- 매장 16번의 운영 거래 1건 (RM 12,500 시뮬레이션) sandbox 에서 발행 → QR 인쇄 → MyInvois 검증 페이지 접속 확인

### 법무 검토 (Irene 측)
- e-invoice compliance 약관 추가 (이용 약관 / 개인정보 처리방침)
- 매장의 buyer TIN 수집 / 저장 / LHDN 전송 동의 명시
- 손님이 TIN 제공 시 동의 (POS 화면에 한 줄 안내)
