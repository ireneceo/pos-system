# 인보이스 시스템 기술 문서

> **최종 업데이트:** 2026-05-04 (BG/FG → Restaurant Trade Billing 동급 확장)
> **상태:** 구현 완료 (수동 결제 확인 방식, 결제 게이트웨이 미연동)
>
> **2026-05-04 추가**: BG/FG → Restaurant Trade Billing 시스템 — [BG_FG_TRADE_BILLING.md](./BG_FG_TRADE_BILLING.md)
> - SOA scheduler가 `Restaurant.{brand,foodcourt}_billing_terms` 도 처리 (3 평행 루프, supplier와 동일 SOA invoice 발행 + parent_soa_invoice_id cascade)
> - `/api/purchase-invoices/soa/current` (RA buyer-side) 가 `issuer_type ['supplier','brand','foodcourt']` 통합 처리
> - PO 생성 시 `checkCreditLimit()` 강제 차단 (`code:'CREDIT_LIMIT_EXCEEDED'`)
>
> **Sprint 4 (2026-04-26) 추가**: Supply Chain Trade Invoice 자동 발행 시스템.
> - `invoice_category='trade'` + `issuer_type IN ('supplier','brand','foodcourt','system_admin')` 활용
> - PO Received 시 `services/purchaseOrderService.createTradeInvoice()` 자동 호출 (idempotent)
> - Monthly SOA cron (`services/soaScheduler.js`, 매월 1일 00:30)
> - 결제 흐름은 기존 invoice payment API (`POST /api/invoices/:id/submit-payment`) 그대로 재사용
> - **상세 설계**: `docs/SELLER_ORDER_MANAGEMENT_SYSTEM.md` "Sprint 4 Implementation Spec" 섹션

---

## 1. 시스템 개요

### 1.1 아키텍처

인보이스는 **3개의 독립적인 발행 주체**가 각각 레스토랑(또는 매니저)에게 발행하는 구조이다.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        인보이스 발행 구조                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  발행자 (Issuer)                    수신자/결제자 (Payer)               │
│  ────────────────────────────────────────────────────────────────────   │
│                                                                         │
│  System Admin ────────────────────▶ Restaurant Admin (모든 레스토랑)    │
│  (POS 구독료, 서비스/컨설팅)        Brand Manager (payment_model 시)    │
│                                     Foodcourt Manager (payment_model 시)│
│                                     Restaurant Owner                    │
│                                                                         │
│  Brand General ───────────────────▶ Restaurant Admin (소속 레스토랑)    │
│  (로얄티, 브랜드비, 매출%, 임대료)  Brand Manager (payment_model 시)    │
│                                                                         │
│  Foodcourt General ───────────────▶ Restaurant Admin (입점 레스토랑)    │
│  (임대료, 관리비, 매출%, 고정비)    Foodcourt Manager (payment_model 시)│
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 핵심 원칙

1. **발행자별 독립 결제설정**: 각 발행자가 자기 결제계좌/QR을 등록하고, 자기가 발행한 인보이스에 대해 자기 결제정보가 표시됨
2. **수신자 통화 기준 발행**: 인보이스 금액은 수신자(레스토랑)의 기본통화로 산정
3. **발행 전 결제방법 검증**: 발행자가 해당 통화의 결제방법을 등록하지 않으면 인보이스 발행 차단
4. **통화 범위 제한**: 지원 가능한 통화는 System Admin이 설정한 범위 내에서만 선택 가능
5. **이메일 독립**: 각 발행자가 자기 SMTP 설정으로 자기 인보이스를 발송
6. **Single source of truth (v3.18)**: 인보이스 헤더의 `subtotal`/`discount_amount`/`total_amount` 는 항상 `items` + `additional_charges` + `discount_value` 로부터 자동 재계산됨 (`utils/invoiceCalculation.js`의 `recomputeInvoiceTotals` / `finalizeInvoice`). Frontend가 보낸 헤더 합계 값은 무시되며 모든 invoice 생성/수정 path (POST/PUT, scheduler, brands, foodcourts, hardware-quotes, subscriptions, restaurants-subscription, subscriptionInvoiceService) 에서 동일 helper를 호출함.
7. **Tax는 `additional_charges`에만 (Path B, v3.18)**: 과거에는 `items.tax_amount` 와 `header.additional_charges` 양쪽에 같은 tax 금액을 저장하는 패턴이 일부 존재해 double-count risk가 있었음. v3.18 마이그레이션 (`scripts/recompute-invoice-totals.js`) 로 `items.tax_amount = 0` 강제 + tax는 `additional_charges`에만. 이메일 템플릿/GET 응답의 `tax` 필드는 `additional_charges` 합으로 도출.

### 1.3 통화 매칭 체인

```
System Admin: supported_currencies 설정 (예: MYR, KRW, USD)
     ↓
Brand/Foodcourt: supported_currencies ⊆ System Admin currencies
     ↓
Restaurant: currency 설정 (System Admin 지원 범위 내)
     ↓
인보이스 발행: 수신자 통화 기준으로 금액 산정
     ↓
결제 시: 발행자의 해당 통화 결제방법 표시
```

---

## 2. 인보이스 발행 루트 (5가지)

### 2.1 수동 발행 (Manual Invoice)

| 항목 | 내용 |
|------|------|
| **API** | `POST /api/invoices` |
| **발행자** | System Admin, Brand General, Foodcourt General |
| **대상** | 레스토랑, 매니저 |
| **파일** | `routes/invoices.js` (line ~1355) |
| **유형** | `type: 'manual'` |

**발행 흐름:**
1. 발행자가 인보이스 생성 모달에서 대상, 카테고리, 금액, 마감일 입력
2. **검증**: 발행자 결제설정에서 인보이스 통화의 결제방법 존재 확인 (`hasPaymentMethodForCurrency`)
3. 실패 시: `400 - No payment methods configured for currency {currency}`
4. 성공 시: Invoice + InvoiceItem 생성 → 이메일 발송 (발행자 SMTP)

**인보이스 번호 규칙:**
- System Admin: `INV-YYMMDDNNN` (예: `INV-260224001`)
- Brand: `INV-BR{brandId}YYMMDDNNN` (예: `INV-BR6260224001`)
- Foodcourt: `INV-FC{foodcourtId}YYMMDDNNN` (예: `INV-FC7260224001`)

**카테고리:**
| 코드 | 표시 이름 | 설명 |
|------|----------|------|
| subscription | Subscription | POS 구독 |
| service | Service | 서비스 비용 |
| consulting | Consulting | 컨설팅 비용 |
| hardware | Hardware | 하드웨어/장비 |
| training | Training | 교육/트레이닝 |
| others | Others | 기타 (custom_description 필수) |

---

### 2.2 Brand 자동/수동 일괄 발행 (Brand Generate Invoices)

| 항목 | 내용 |
|------|------|
| **API** | `POST /api/brands/:id/generate-invoices` |
| **발행자** | Brand General |
| **대상** | 플랜에 배정된 소속 레스토랑 |
| **파일** | `routes/brands.js` (line ~1165) |
| **유형** | `type: 'automatic'` |

**발행 흐름:**
1. Brand General이 "Generate Invoices" 실행
2. 활성 플랜 + 활성 레스토랑 배정 조회
3. **검증**: 플랜 통화별 결제방법 존재 확인
4. 실패한 플랜: skip + reason `"No payment methods configured for {currency}"`
5. 각 레스토랑별:
   - 기존 인보이스 중복 체크 (동일 기간 + 동일 발행자)
   - 해당 기간 매출 조회 (orders 테이블)
   - `calculatePlanCharges()` 로 금액 계산
   - totalAmount > 0 이면 Invoice + InvoiceItem 생성
6. 결과 반환: `{ generated, skipped, total, results }`

**청구 계산 (calculatePlanCharges):**
| 항목 | 계산 방식 | InvoiceItem.item_type |
|------|----------|----------------------|
| 구독비 (고정) | `subscription_fee` 그대로 | `subscription_fee` |
| 매출% (로얄티) | `revenue × revenue_percentage / 100` | `revenue_percentage` |
| 임대료 (고정) | `rent_fixed` 그대로 | `rent` |
| 임대료 (매출%) | `revenue × rent_percentage / 100` | `rent` |
| 임대료 (복합) | `MAX(rent_fixed, revenue × rent_percentage / 100)` | `rent` |

각 항목에 `tax_rate` 적용 → `tax_amount` 산출 → `total_amount = calculated_amount + tax_amount`

---

### 2.3 Foodcourt 자동/수동 일괄 발행 (Foodcourt Generate Invoices)

| 항목 | 내용 |
|------|------|
| **API** | `POST /api/foodcourts/:id/generate-invoices` |
| **발행자** | Foodcourt General |
| **대상** | 플랜에 배정된 입점 레스토랑 |
| **파일** | `routes/foodcourts.js` (line ~973) |
| **유형** | `type: 'automatic'` |

Brand와 동일 구조. `issuer_type: 'foodcourt'`, 인보이스 번호 `INV-FC{id}YYMMDDNNN`.

---

### 2.4 System Admin POS 구독 인보이스 (수동 트리거)

| 항목 | 내용 |
|------|------|
| **API** | `POST /api/invoices/generate-for-subscriptions` |
| **발행자** | System Admin |
| **대상** | 활성 구독이 있는 모든 레스토랑 |
| **파일** | `routes/invoices.js` (line ~1689) |
| **유형** | `type: 'automatic'`, `invoice_category: 'subscription'` |

**발행 흐름:**
1. System Admin이 구독 인보이스 생성 실행
2. 활성 구독 레스토랑 전체 조회
3. Anniversary 빌링: `subscription_start` 날짜 기준 billing day 계산
4. **검증**: SystemSettings에서 레스토랑 통화의 결제방법 확인
5. 실패 시: skip + errors 배열에 추가
6. 가격 소스:
   - 우선: `restaurant.subscription_snapshot` (캐시된 플랜 가격)
   - 폴백: `PlanTemplate → PlanPrice` 테이블 조회
7. 결제자 결정:
   - `payment_model: 'brand_manager'` → Brand owner가 결제
   - `payment_model: 'foodcourt_manager'` → Foodcourt owner가 결제
   - `payment_model: 'restaurant_owner'` → Restaurant Owner가 결제
   - 기본값: Restaurant Admin이 결제

---

### 2.5 Cron 자동 발행 (스케줄러)

| 항목 | 내용 |
|------|------|
| **실행 시간** | 매일 02:00 AM |
| **파일** | `services/invoiceScheduler.js` |
| **3가지 작업** | 구독 인보이스 + Entity Plan 인보이스 + Entity 구독 인보이스 |

#### 2.5.1 구독 인보이스 자동 생성 (`generateSubscriptionInvoices`)

- 모든 활성 레스토랑의 `subscription_start` 기준 billing day 확인
- 오늘이 billing day이면 해당 레스토랑의 구독 인보이스 생성
- Monthly: 매월 해당일 / Annual: 해당월 해당일
- 월말 처리: 31일 시작인데 2월인 경우 → 2월 마지막 날로 조정

#### 2.5.2 Entity Plan 인보이스 자동 생성 (`generateEntityPlanInvoices`)

- **매월 1일**에 전월분 인보이스 생성
- `entity_plans.auto_generate = true`인 플랜만 대상
- 전월 1일~말일 기간의 매출 조회 → `calculatePlanCharges()` → 인보이스 생성
- Brand/Foodcourt 구분: `entity_type` 필드로 자동 분기

#### 2.5.3 Entity 구독 인보이스 자동 생성 (`generateEntitySubscriptionInvoices`)

- Brand, Foodcourt, Restaurant Owner의 **POS 구독료** 인보이스 자동 생성
- 대상: `subscription_status = 'active'`, `is_demo != true`, `subscription_start IS NOT NULL`, `plan_type IS NOT NULL`
- Brand/Foodcourt: 각 테이블의 구독 필드 사용, Owner: users 테이블의 구독 필드 사용
- `isTodayAdvanceOf` (14일 전 생성), `getTargetBillingMonth` 로직 동일
- annual billing: 구독 시작 월에만 생성
- 중복 체크: `payer_type + payer_id + billing_period_start + type='automatic' + invoice_category='subscription' + issuer_type='system_admin'`
- Invoice 번호: `INV-{BRD|FC|OWN}-{dateStr}-{entity.id}`
- `plan_amount <= 0`이면 skip

#### 2.5.5 Trial 시작 시 첫 인보이스 생성

- **파일**: `services/subscriptionScheduler.js` → `invoiceScheduler.createSubscriptionInvoice()`
- 레스토랑 생성(Trial 시작) 시 첫 구독 인보이스를 **즉시 생성**
- `dueDate = trial_end_date` (Trial 종료일까지 결제)
- Trial 7일 → Invoice 마감일 = Trial 종료일, 이후 Grace Period 7일
- **목적**: Trial 종료 후 결제 없는 공백 기간(gap) 방지

#### 2.5.6 할인(Discount) 처리

- 인보이스 생성 시 레스토랑의 `discount_type`, `discount_value` 적용
- `percentage`: subtotal × (discount_value / 100)
- `fixed`: min(discount_value, subtotal)
- **additional_charges**: 할인 후 금액(discountedAmount)에 대해 계산
- charges 소스: 발행자의 Payment Settings → `additionalCharges[currency]`
- `total_amount = discountedAmount + chargesTotal`
- **주의**: `0 || fallback` 패턴 사용 금지 (JS falsy 버그). 반드시 `!== undefined && !== null` 체크

---

## 3. 결제 흐름 (Payment Flow)

### 3.1 상태 머신 (Status Flow)

```
                    ┌──────────────────────────────────────────┐
                    │                                          │
 draft ──▶ pending_payment ──▶ payment_submitted ──▶ paid     │
              │    ▲                    │                       │
              │    │                    ▼                       │
              │    └──────── rejected (→ pending_payment)       │
              │                                                │
              ▼                                                │
           overdue ────────────────────────────────────────────┘
              │
              ▼
           cancelled
```

| 상태 | 설명 | 전이 가능 |
|------|------|----------|
| `draft` | 생성됨, 미발송 | → pending_payment |
| `pending_payment` | 발송됨, 결제 대기 | → payment_submitted, overdue, cancelled |
| `payment_submitted` | 결제 증빙 제출됨 | → paid, rejected |
| `paid` | 결제 확인 완료 | (최종 상태) |
| `overdue` | 마감일 초과 | → payment_submitted, cancelled |
| `cancelled` | 취소됨 | (최종 상태) |

### 3.1.1 Free 인보이스 (100% 할인, total_amount=0)

**자동발행 시**: 스케줄러가 total_amount=0 감지 → 자동으로 `status='paid'`, `payment_notes='100% discount - auto-completed'`

**수동발행 시**: `pending_payment` 상태로 생성 → 수신자가 "Confirm" 버튼 클릭 → `PATCH /api/invoices/:id/status` → `status='paid'`, `paid_amount=0`, `payment_notes='Free invoice - confirmed by recipient'`

- Pay 버튼: `total > 0`일 때만 표시
- Confirm 버튼: `total === 0`이고 `status === 'pending_payment' || 'overdue'`일 때 표시
- Admin(발행자)은 "Mark Paid" 버튼으로 동일 처리

### 3.2 수동 결제 프로세스 (Bank Transfer / QR)

```
1. 수신자가 인보이스 목록에서 "Pay" 클릭
2. fetchPaymentMethods(currency, issuerType, issuerId) → 발행자 결제정보 조회
3. 결제 모달 표시 (발행자의 계좌/QR 정보, POS 스타일 카드 UI)
4. 수신자가 결제 수단 선택 + 송금 후 영수증 업로드 + Transaction ID 입력
5. POST /api/invoices/:id/submit-payment
   → **백엔드 검증**: 발행자(issuer)의 결제설정에서 해당 통화의 결제방법 조회
   → 제출된 payment_method가 유효한 결제방법 목록에 없으면 400 에러 반환
   → 유효하면 status: 'payment_submitted'
6. 발행자가 "Confirm" 클릭 → POST /api/invoices/:id/confirm-payment → status: 'paid'
   또는 "Reject" 클릭 → POST /api/invoices/:id/reject-payment → status: 'pending_payment'
```

### 3.3 결제방법 조회 API (Issuer별 분기)

| 발행자 | API 엔드포인트 | 데이터 소스 |
|--------|---------------|------------|
| System Admin | `GET /api/admin/payment-settings/available/:currency` | `SystemSettings.payment_settings` |
| Brand | `GET /api/brands/:id/payment-settings/available/:currency` | `brands.payment_settings` |
| Foodcourt | `GET /api/foodcourts/:id/payment-settings/available/:currency` | `foodcourts.payment_settings` |

**프론트엔드 분기 로직** (모든 인보이스 페이지 공통):
```typescript
const fetchPaymentMethods = async (currency, issuerType, issuerId) => {
  let url = `/api/admin/payment-settings/available/${currency}`;  // 기본: System Admin
  if (issuerType === 'brand' && issuerId) {
    url = `/api/brands/${issuerId}/payment-settings/available/${currency}`;
  } else if (issuerType === 'foodcourt' && issuerId) {
    url = `/api/foodcourts/${issuerId}/payment-settings/available/${currency}`;
  }
  // → { methods: [{ id, name, description, bankName?, accountNumber?, qrImage?, ... }] }
};
```

### 3.4 결제 권한 검증

**결제 제출 (submit-payment)** — `checkPaymentPermission()`:
- System Admin: 모든 인보이스 결제 가능
- Restaurant Admin: 자기 레스토랑 인보이스만
- Brand General/Manager: `payer_type`가 brand_manager이고 자기 brand인 경우
- Foodcourt General/Manager: `payer_type`가 foodcourt_manager이고 자기 foodcourt인 경우

**결제 확인 (confirm-payment)** — `checkConfirmPermission()`:
- System Admin: 모든 인보이스 확인 가능
- Brand General: `issuer_type: 'brand'`이고 자기 brand가 발행한 것만
- Foodcourt General: `issuer_type: 'foodcourt'`이고 자기 foodcourt가 발행한 것만

---

## 4. 결제 설정 (Payment Settings)

### 4.1 저장 위치

| 역할 | 테이블 | 필드/키 |
|------|--------|---------|
| System Admin | `system_settings` | `setting_key = 'payment_settings'` (JSON) |
| Brand | `brands` | `payment_settings` (JSON 컬럼) |
| Foodcourt | `foodcourts` | `payment_settings` (JSON 컬럼) |

### 4.2 JSON 구조

```json
{
  "stripe": {
    "enabled": false,
    "publishableKey": "",
    "secretKey": "",
    "webhookSecret": "",
    "autoCharge": false
  },
  "paypal": {
    "enabled": false,
    "clientId": "",
    "clientSecret": ""
  },
  "bankTransfer": {
    "MYR": { "enabled": true, "bankName": "Maybank", "accountNumber": "1234567890", "accountName": "Company Name", "swiftCode": "" },
    "KRW": { "enabled": true, "bankName": "신한은행", "accountNumber": "110-xxx-xxxx", "accountName": "회사명" }
  },
  "qrPayment": {
    "MYR": { "enabled": true, "qrImage": "base64...", "qrDescription": "DuitNow QR" },
    "KRW": { "enabled": true, "qrImage": "base64...", "qrDescription": "카카오페이 QR" }
  },
  "additionalCharges": [
    { "enabled": true, "name": "SST", "rate": 6 },
    { "enabled": false, "name": "", "rate": 0 },
    { "enabled": false, "name": "", "rate": 0 }
  ]
}
```

### 4.3 결제방법 종류

| 결제방법 | 범위 | 설명 |
|----------|------|------|
| Stripe | 글로벌 (통화 무관) | 카드 결제 (미연동) |
| PayPal | 글로벌 (통화 무관) | PayPal 결제 (미연동) |
| Bank Transfer | **통화별** 설정 | 수동 송금 → 영수증 업로드 |
| QR Payment | **통화별** 설정 | QR 스캔 결제 → 영수증 업로드 |

### 4.4 결제방법 존재 검증

**공통 유틸리티**: `utils/paymentSettingsHelper.js`

```javascript
// 해당 통화에 사용 가능한 결제방법 목록 반환
getAvailablePaymentMethods(paymentSettings, currency)
// → { methods: [{ id, name, description, ...config }] }

// 해당 통화에 결제방법이 1개 이상 있는지 확인
hasPaymentMethodForCurrency(paymentSettings, currency)
// → boolean
```

**검증 적용 위치:**
| 시점 | 검증 내용 | 실패 시 |
|------|----------|---------|
| 수동 인보이스 발행 | 발행자 결제설정에 인보이스 통화 결제방법 존재 | 400 에러 + 안내 메시지 |
| Brand generate-invoices | 플랜 통화별 Brand 결제설정 확인 | 해당 플랜 skip + reason |
| Foodcourt generate-invoices | 플랜 통화별 Foodcourt 결제설정 확인 | 해당 플랜 skip + reason |
| System Admin 구독 인보이스 | 레스토랑 통화별 SystemSettings 확인 | skip + errors 배열 |

### 4.5 통화 범위 검증

- **Brand/Foodcourt 결제설정 저장 시**: `supported_currencies`가 System Admin의 `supported_currencies` 범위 내인지 확인
- **Brand/Foodcourt 플랜 생성 시**: `plan.currency`가 System Admin 지원 통화인지 확인
- 범위 밖이면 `400 - Currencies not supported by system: {currencies}`

---

## 5. DB 스키마

### 5.1 invoices 테이블

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INT PK AI | |
| restaurant_id | INT NULL | 대상 레스토랑 (매니저 직접 청구 시 NULL) |
| invoice_number | VARCHAR UNIQUE | 인보이스 번호 |
| type | ENUM('automatic','manual') | 생성 유형 |
| billing_period_start | DATE NULL | 청구 기간 시작 |
| billing_period_end | DATE NULL | 청구 기간 종료 |
| due_date | DATE NOT NULL | 결제 마감일 |
| total_amount | DECIMAL(10,2) | 총 금액 |
| currency | VARCHAR(10) DEFAULT 'MYR' | 통화 |
| paid_amount | DECIMAL(10,2) DEFAULT 0 | 결제된 금액 |
| status | ENUM | 상태 (3.1 참조) |
| notes | TEXT NULL | 메모 |
| issued_by | INT NOT NULL | 발행한 사용자 ID |
| issued_at | DATETIME | 발행 시각 |
| **issuer_type** | ENUM('system_admin','brand','foodcourt') | **발행 주체 유형** |
| **issuer_id** | INT NULL | **Brand ID 또는 Foodcourt ID (system_admin은 NULL)** |
| payer_type | ENUM('restaurant','foodcourt_manager','brand_manager','restaurant_owner') | 결제 책임자 유형 |
| payer_id | INT NULL | 결제 책임자 ID |
| invoice_category | VARCHAR(50) DEFAULT 'service' | 카테고리 코드 |
| category_display_name | VARCHAR(255) NULL | 카테고리 표시 이름 |
| custom_description | VARCHAR(255) NULL | 기타 카테고리 설명 |
| service_description | TEXT NULL | 서비스/컨설팅 상세 |
| payment_method | VARCHAR(50) NULL | 결제 수단 |
| transaction_id | VARCHAR(255) NULL | 거래 ID |
| payment_notes | TEXT NULL | 결제 메모 |
| receipt_url | LONGTEXT NULL | 영수증 이미지 (base64) |
| payment_provider | VARCHAR(50) NULL | 결제 제공자 (stripe, paypal 등) |
| payment_intent_id | VARCHAR(255) NULL | 결제 게이트웨이 ID |
| confirmed_by | INT NULL | 결제 확인한 사용자 ID |
| confirmed_at | DATETIME NULL | 결제 확인 시각 |
| rejection_reason | TEXT NULL | 거절 사유 |
| payment_submitted_at | DATETIME NULL | 결제 증빙 제출 시각 |
| additional_charges | JSON DEFAULT [] | 추가 청구 항목 `[{name, rate, amount}]` - Payment Settings에서 스냅샷 |
| subtotal | DECIMAL(10,2) NULL | 할인 전 소계 (할인 적용 시 원래 금액) |
| discount_type | ENUM('none','percentage','fixed') | 할인 유형 |
| discount_value | DECIMAL(10,2) NULL | 할인 값 (percentage: %, fixed: 금액) |
| discount_amount | DECIMAL(10,2) NULL | 실제 할인 금액 |
| discount_reason | VARCHAR(255) NULL | 할인 사유 |
| is_modified | TINYINT(1) DEFAULT 0 | 수정 여부 |
| modification_history | JSON NULL | 수정 이력 |
| paid_at | DATETIME NULL | 결제 완료 시각 |

### 5.2 invoice_items 테이블

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INT PK AI | |
| invoice_id | INT NOT NULL | FK → invoices |
| item_type | VARCHAR(50) NOT NULL | 항목 유형 코드 |
| description | VARCHAR NOT NULL | 항목 설명 |
| calculation_method | ENUM('fixed','percentage','combined') | 계산 방식 |
| fixed_amount | DECIMAL(10,2) NULL | 고정 금액 |
| percentage_rate | DECIMAL(5,2) NULL | 비율 |
| base_amount | DECIMAL(10,2) NULL | 비율 계산 기준액 (매출 등) |
| minimum_amount | DECIMAL(10,2) NULL | 복합 방식 최소 금액 |
| calculated_amount | DECIMAL(10,2) NOT NULL | 계산된 금액 |
| tax_rate | DECIMAL(5,2) DEFAULT 0 | 세율 |
| tax_amount | DECIMAL(10,2) DEFAULT 0 | 세액 |
| total_amount | DECIMAL(10,2) NOT NULL | 총액 (calculated + tax) |

### 5.3 entity_plans 테이블

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INT PK AI | |
| entity_type | ENUM('brand','foodcourt') | 플랜 소유 유형 |
| entity_id | INT NOT NULL | Brand ID 또는 Foodcourt ID |
| name | VARCHAR(100) NOT NULL | 플랜 이름 |
| description | TEXT NULL | 설명 |
| subscription_fee | DECIMAL(10,2) DEFAULT 0 | 월 고정비 |
| revenue_percentage | DECIMAL(5,2) DEFAULT 0 | 매출 비율 (%) |
| rent_type | ENUM('none','fixed','percentage','combined') | 임대료 유형 |
| rent_fixed | DECIMAL(10,2) DEFAULT 0 | 임대료 고정액 |
| rent_percentage | DECIMAL(5,2) DEFAULT 0 | 임대료 매출비율 (%) |
| billing_cycle | ENUM('monthly','annual') | 빌링 주기 |
| auto_generate | BOOLEAN DEFAULT true | 자동 인보이스 생성 여부 |
| tax_rate | DECIMAL(5,2) DEFAULT 0 | 세율 |
| currency | VARCHAR(10) DEFAULT 'MYR' | 통화 |
| is_active | BOOLEAN DEFAULT true | 활성 여부 |
| created_by | INT NULL | 생성자 |

### 5.4 entity_plan_restaurants 테이블

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | INT PK AI | |
| entity_plan_id | INT NOT NULL | FK → entity_plans (현재 적용 플랜) |
| restaurant_id | INT NOT NULL | FK → restaurants |
| activation_date | DATE | 현재 플랜 적용 시작일 |
| is_active | BOOLEAN DEFAULT true | 활성 여부 |
| discount_type | ENUM('none','percentage','fixed') | 레스토랑별 할인 타입 |
| discount_value | DECIMAL(10,2) | 할인 값 |
| discount_reason | VARCHAR(255) NULL | 할인 사유 |
| pending_plan_id | INT NULL | 다음 청구 주기에 전환될 플랜 ID |
| pending_activation_date | DATE NULL | pending 플랜 적용 예정일 |

- **UNIQUE**: (entity_plan_id, restaurant_id)
- **Pending 전환 플로우**: Brand/Foodcourt General이 이미 플랜 배정된 레스토랑에 다른 플랜을 배정하면 즉시 교체가 아니라 `pending_plan_id` + `pending_activation_date`(= 다음 billing_day)에 저장. 일일 스케줄러가 `pending_activation_date ≤ 오늘`일 때 `entity_plan_id`를 교체하고 pending 필드 초기화 + ActivityLog 기록.

### 5.5 관련 테이블

**plan_templates** (System Admin POS 구독 플랜):
- `name`, `display_name`, `base_price_monthly`, `base_price_annual`
- `order_limit`, `menu_item_limit`, `staff_limit` (-1 = unlimited)
- `plan_target`: 'restaurant' | 'brand' | 'foodcourt' | 'owner'
- `features` (JSON), `included_modules` (JSON)

**plan_prices** (POS 구독 통화별 가격):
- `plan_id` → plan_templates.id
- `currency`, `monthly_price`, `annual_price`

**invoice_categories** (인보이스 카테고리):
- `code` (UNIQUE), `name`, `description`, `is_system`, `is_active`

---

## 6. API 엔드포인트 레퍼런스

### 6.1 인보이스 CRUD

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /api/invoices | 역할별 인보이스 목록 | O |
| GET | /api/invoices/to-pay | 결제해야 할 인보이스 | O |
| GET | /api/invoices/:id | 인보이스 상세 | O |
| POST | /api/invoices | 수동 인보이스 생성 | O |
| PUT | /api/invoices/:id | 인보이스 수정 | O |
| DELETE | /api/invoices/:id | 인보이스 삭제 | O |
| PATCH | /api/invoices/:id/status | 상태 변경 | O |

### 6.2 인보이스 조회 (특화)

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /api/invoices/restaurant/:restaurantId | 특정 레스토랑 인보이스 | O |
| GET | /api/invoices/manager/:managerId | 매니저 인보이스 | O |
| GET | /api/invoices/issued-by/:issuerType/:issuerId | 발행 주체별 조회 | O |
| GET | /api/owner/invoices | Owner 인보이스 | O |

### 6.3 결제 관련

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| POST | /api/invoices/:id/submit-payment | 결제 증빙 제출 (수신자) | O |
| POST | /api/invoices/:id/confirm-payment | 결제 확인 (발행자) | O |
| POST | /api/invoices/:id/reject-payment | 결제 거절 (발행자) | O |

### 6.4 인보이스 생성 (자동/일괄)

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| POST | /api/invoices/generate-for-subscriptions | POS 구독 인보이스 생성 | O |
| POST | /api/brands/:id/generate-invoices | Brand 플랜 인보이스 생성 | O |
| POST | /api/foodcourts/:id/generate-invoices | Foodcourt 플랜 인보이스 생성 | O |

### 6.5 결제 설정

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /api/admin/payment-settings | System Admin 결제설정 조회 | O |
| POST | /api/admin/payment-settings | System Admin 결제설정 저장 | O |
| GET | /api/admin/payment-settings/available/:currency | 통화별 결제방법 | O |
| GET | /api/brands/:id/payment-settings | Brand 결제설정 | O |
| PUT | /api/brands/:id/payment-settings | Brand 결제설정 저장 | O |
| GET | /api/brands/:id/payment-settings/available/:currency | Brand 통화별 결제방법 | O |
| GET | /api/foodcourts/:id/payment-settings | Foodcourt 결제설정 | O |
| PUT | /api/foodcourts/:id/payment-settings | Foodcourt 결제설정 저장 | O |
| GET | /api/foodcourts/:id/payment-settings/available/:currency | Foodcourt 통화별 결제방법 | O |

### 6.6 카테고리 관리

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /api/invoices/categories | 활성 카테고리 목록 | X |
| GET | /api/invoices/categories/all | 전체 카테고리 | O |
| POST | /api/invoices/categories | 카테고리 생성 | O |
| PUT | /api/invoices/categories/:id | 카테고리 수정 | O |
| DELETE | /api/invoices/categories/:id | 카테고리 삭제 | O |
| POST | /api/invoices/categories/init | 기본 카테고리 초기화 | O |

### 6.7 Brand/Foodcourt 플랜 관리

| Method | Path | 설명 | 인증 |
|--------|------|------|------|
| GET | /api/brands/:id/plans | Brand 플랜 목록 | O |
| POST | /api/brands/:id/plans | Brand 플랜 생성 | O |
| PUT | /api/brands/:id/plans/:planId | Brand 플랜 수정 | O |
| DELETE | /api/brands/:id/plans/:planId | Brand 플랜 삭제 | O |
| POST | /api/brands/:id/plans/:planId/restaurants | 레스토랑 배정 (이미 다른 플랜 배정 시 pending으로 스케줄) | O |
| DELETE | /api/brands/:id/plans/:planId/restaurants/:rid | 레스토랑 해제 | O |
| POST | /api/brands/:id/plans/:planId/restaurants/:rid/cancel-pending | 예정된 플랜 변경 취소 | O |
| GET | /api/brands/:id/revenue | Brand 매출 조회 | O |
| GET | /api/brands/:id/invoice-preview | 인보이스 미리보기 | O |
| GET | /api/brands/:id/subscriptions | 구독 현황 (`pending_plan` 필드 포함) | O |

> Foodcourt도 동일 구조: `/api/foodcourts/:id/plans`, `/api/foodcourts/:id/revenue`, `/api/foodcourts/:id/plans/:planId/restaurants/:rid/cancel-pending`

**POST .../plans/:planId/restaurants 동작 분기**:
- 레스토랑에 같은 브랜드/푸드코트의 active 플랜 없음 → 즉시 배정 (`status: assigned` | `reactivated`)
- 같은 플랜 이미 active → no-op (`status: already_assigned`, pending 필드 초기화)
- 다른 플랜 active → pending 스케줄 (`status: scheduled`, `pending_activation_date = 다음 billing_day`)

**GET .../subscriptions 응답에 포함되는 `pending_plan`**:
```json
{ "pending_plan": { "id": 38, "name": "K-DINE Franchise", "charge_type": "combined",
  "percentage_value": "5.00", "billing_day": 27, "activation_date": "2026-05-27" } }
```
pending 없으면 `null`.

---

## 7. 프론트엔드 페이지

### 7.1 역할별 인보이스 페이지

| 역할 | 페이지 | 기능 | API |
|------|--------|------|-----|
| System Admin | Admin/InvoicesPage.tsx | 발행 + 결제확인 + 카테고리관리 | /api/invoices |
| Brand General | BrandGeneral/BrandInvoicesPage.tsx | 발행 + 결제(SA→Brand) + 결제확인 | /api/invoices, /api/invoices/to-pay |
| Foodcourt General | FoodcourtGeneral/FoodcourtInvoicesPage.tsx | 발행 + 결제(SA→FC) + 결제확인 | /api/invoices, /api/invoices/to-pay |
| Brand/Foodcourt Manager | Manager/InvoicesPage.tsx | 결제 전용 (발행자별 결제방법 동적 로드) | /api/invoices/to-pay |
| Restaurant Admin | Restaurant/InvoicesPage.tsx | 결제 전용 (모든 발행자) | /api/invoices/restaurant/:id |
| Restaurant Owner | Owner/OwnerInvoicesPage.tsx | 결제 전용 (여러 레스토랑) | /api/owner/invoices |

### 7.2 결제 모달 동작

1. 사용자가 "Pay" 클릭
2. `fetchPaymentMethods(currency, issuerType, issuerId)` → 발행자 결제정보 로드
3. 결제 모달 표시:
   - 결제방법 없음: 안내 메시지 + 적절한 가이드 (발행자에게 문의 또는 설정 페이지 이동)
   - 결제방법 있음: 선택 카드 표시 (Bank Transfer → 계좌정보, QR → QR코드 표시)
4. 결제 수단 선택 + Transaction ID + 영수증 이미지 업로드
5. "Submit Payment" → `POST /api/invoices/:id/submit-payment`

### 7.3 인보이스 발행 전 결제방법 경고 (프론트엔드)

발행자 페이지(Admin, Brand General, Foodcourt General)에서 인보이스 생성 시, 수신자를 선택하면 수신자의 통화로 발행자의 결제설정을 조회한다. 해당 통화에 결제방법이 없으면 모달 하단에 노란색 경고 배너를 표시한다.

```
┌─────────────────────────────────────────────────────────────────┐
│ ⚠ Warning: You have no payment methods configured for {CURRENCY}.│
│ The recipient won't be able to pay this invoice online.          │
│ Please configure payment methods in Payment Settings first.      │
└─────────────────────────────────────────────────────────────────┘
```

**검증 API 호출:**
| 발행자 | API | 타이밍 |
|--------|-----|--------|
| System Admin | `GET /api/admin/payment-settings/available/${currency}` | selectTarget 시 |
| Brand General | `GET /api/brands/${brandId}/payment-settings/available/${currency}` | selectTarget 시 |
| Foodcourt General | `GET /api/foodcourts/${fcId}/payment-settings/available/${currency}` | selectTarget 시 |

경고는 발행을 차단하지 않음 (발행은 가능하나 결제 불가 경고). 백엔드에서 `hasPaymentMethodForCurrency`로 최종 차단.

### 7.4 결제방법 없을 때 안내 메시지

| 역할 | 시나리오 | 메시지 |
|------|----------|--------|
| Restaurant Admin | SA 인보이스 | "{발행자명} has not configured payment methods for {currency}. Please contact the invoice issuer." |
| Restaurant Admin | Brand/FC 인보이스 | "{발행자명} has not configured payment methods for {currency}. Please contact the invoice issuer." |
| Brand General | SA 인보이스 | "System administrator has not configured payment methods for {currency}. Please contact the system administrator." |
| Brand General | 자기 인보이스 | "You haven't configured payment methods for {currency}." + **Go to Payment Settings** 버튼 |
| Foodcourt General | SA 인보이스 | 위와 동일 패턴 |
| Foodcourt General | 자기 인보이스 | 위와 동일 + **Go to Payment Settings** 버튼 |

---

## 8. 이메일 시스템

### 8.1 발송 원칙

- 각 발행자가 **자기 SMTP 설정**으로 자기가 발행한 인보이스를 발송
- `sendIssuerEmail(issuerType, issuerId, mailOptions)` 함수 사용
- System Admin SMTP를 다른 역할이 대신 사용하지 않음

### 8.2 이메일 트리거

| 시점 | 발송 내용 |
|------|----------|
| 인보이스 생성 (자동) | 인보이스 발행 알림 + 결제 정보 |
| 인보이스 생성 (수동) | 인보이스 발행 알림 |
| POST /api/invoices/:id/send-email | 수동 이메일 재발송 |
| 결제 확인 시 | 결제 완료 알림 |

### 8.3 SMTP 설정 위치

| 역할 | notification_settings entity_type |
|------|-----------------------------------|
| System Admin | `admin` |
| Brand | `brand` |
| Foodcourt | `foodcourt` |

---

## 9. 인보이스 번호 체계

### 9.1 형식

```
INV-{PREFIX}{YYMMDD}{NNN}
```

| 발행자 | PREFIX | 예시 |
|--------|--------|------|
| System Admin | (없음) | `INV-260224001` |
| Brand (ID=6) | BR6 | `INV-BR6260224001` |
| Foodcourt (ID=7) | FC7 | `INV-FC7260224001` |

### 9.2 생성 로직

1. 같은 prefix의 마지막 인보이스 번호 조회
2. 마지막 3자리 + 1 (시작: 001)
3. 같은 날 999개 초과 시 4자리로 확장

---

## 10. 구독 빌링 주기 계산

### 10.1 Anniversary Billing (System Admin 구독)

```
subscription_start = 2026-01-15 (billing day = 15일)

Monthly:
  - 2026-01-15 ~ 2026-02-14 (1월 인보이스)
  - 2026-02-15 ~ 2026-03-14 (2월 인보이스)

Annual:
  - 2026-01-15 ~ 2027-01-14 (1년 인보이스)
```

**월말 처리:**
- `subscription_start` = 1월 31일인 경우
- 2월 billing day = 28일 (또는 29일)로 자동 조정
- `Math.min(originalDay, daysInMonth)`

### 10.2 Entity Plan Billing (Brand/Foodcourt)

- **항상 월초~월말**: 1일 ~ 말일 (Calendar Month)
- **생성 시점**: 매월 1일 전월분
- 예: 2026-03-01에 2026-02-01 ~ 2026-02-28분 인보이스 생성

---

## 11. 결제 모델 (Payment Model)

레스토랑의 `payment_model` 필드가 인보이스 결제 책임자를 결정한다.

| payment_model | 결제 책임자 | 설명 |
|---------------|------------|------|
| `restaurant` (기본) | Restaurant Admin | 레스토랑 자체 결제 |
| `brand_manager` | Brand Owner/Manager | Brand가 소속 레스토랑 대신 결제 |
| `foodcourt_manager` | Foodcourt Owner/Manager | Foodcourt가 입점 레스토랑 대신 결제 |
| `restaurant_owner` | Restaurant Owner | Owner가 소유 레스토랑 대신 결제 |

이 설정은 **System Admin 구독 인보이스**의 결제자를 결정하는 데 사용된다.
Brand/Foodcourt 플랜 인보이스는 항상 해당 레스토랑이 결제한다.

---

## 12. 미구현 사항 (향후 확장)

| 항목 | 상태 | 설명 |
|------|------|------|
| Stripe 결제 연동 | 미구현 | 카드 자동결제, 정기결제 |
| PayPal 결제 연동 | 미구현 | PayPal 자동결제 |
| Stripe Webhook | 미구현 | 결제 상태 자동 업데이트 |
| 자동 결제 갱신 | 미구현 | 저장된 카드로 자동 결제 |
| Overdue 자동 전환 | 프론트엔드만 | 서버 cron 미구현 (프론트에서 시각적으로만 표시) |
| 이메일 결제 링크 | 미구현 | 외부에서 직접 결제 페이지 접근 |

---

## 부록 A: 파일 위치 참조

| 파일 | 역할 |
|------|------|
| `routes/invoices.js` | 인보이스 CRUD + 결제 흐름 + 구독 인보이스 생성 |
| `routes/brands.js` | Brand 결제설정 + 플랜 CRUD + 인보이스 생성 |
| `routes/foodcourts.js` | Foodcourt 결제설정 + 플랜 CRUD + 인보이스 생성 |
| `routes/admin-payment-settings.js` | System Admin 결제설정 |
| `routes/owner.js` | Owner 인보이스 조회 |
| `services/invoiceScheduler.js` | Cron 스케줄러 (매일 2AM) |
| `utils/paymentSettingsHelper.js` | 결제방법 조회 공통 헬퍼 |
| `models/Invoice.js` | 인보이스 모델 |
| `models/InvoiceItem.js` | 인보이스 항목 모델 |
| `models/EntityPlan.js` | Brand/Foodcourt 플랜 모델 |
| `models/EntityPlanRestaurant.js` | 플랜-레스토랑 배정 모델 |
| `models/PlanTemplate.js` | POS 구독 플랜 템플릿 |
| `models/PlanPrice.js` | 구독 플랜 통화별 가격 |
| `pages/Admin/InvoicesPage.tsx` | System Admin 인보이스 페이지 |
| `pages/BrandGeneral/BrandInvoicesPage.tsx` | Brand 인보이스 페이지 |
| `pages/FoodcourtGeneral/FoodcourtInvoicesPage.tsx` | Foodcourt 인보이스 페이지 |
| `pages/Manager/InvoicesPage.tsx` | Brand/Foodcourt Manager 인보이스 결제 페이지 |
| `pages/Restaurant/InvoicesPage.tsx` | Restaurant 인보이스 페이지 |
| `pages/Owner/OwnerInvoicesPage.tsx` | Owner 인보이스 페이지 |

---

## 부록 B: 검증 체크리스트

### 발행 시 검증
- [x] 발행자 결제설정에 인보이스 통화의 결제방법 존재 확인 (백엔드: `hasPaymentMethodForCurrency`)
- [x] **프론트엔드 사전 경고**: 수신자 선택 시 발행자 결제설정 조회 → 결제방법 없으면 경고 배너 표시
- [x] Brand/Foodcourt 통화가 System Admin 지원 범위 내인지
- [x] 동일 기간 중복 인보이스 방지 (자동 발행 시)
- [x] totalAmount > 0 확인 (자동 발행 시)

### 결제 시 검증
- [x] 결제 제출은 pending_payment 또는 overdue 상태에서만
- [x] **결제 수단 유효성 검증**: submit-payment 시 발행자 결제설정에서 해당 통화의 결제방법 목록 조회 → 미허용 방법이면 400 에러
- [x] 결제 확인은 payment_submitted 상태에서만
- [x] 결제 거절 시 rejection_reason 필수
- [x] 역할별 결제/확인 권한 검증

### 데이터 정합성
- [ ] 인보이스 번호 유니크
- [ ] issuer_type + issuer_id 정합성 (system_admin이면 issuer_id NULL)
- [ ] payer_type + payer_id 정합성
- [ ] additional_charges JSON 배열 형식 유효성

---

## Contract 연결 (2026-04-19 v3.15)

### `invoices.contract_id INT NULL` 컬럼
- **용도**: 특정 Contract 에서 파생된 일회성 인보이스를 계약과 연결하여 추적 (가맹비, 보증금, 설치비 등)
- **자동화 없음**: 플랜 자동 발행과 독립. 사용자가 Contract Detail "Billing" 섹션에서 명시적으로 "+ Issue One-time Invoice" 눌러야 생성됨
- **ON DELETE SET NULL 시멘틱**: 계약 삭제 시 인보이스는 보존, 참조만 해제 (logical FK, app 레이어)

### UI
- Contract Detail "Billing" 아코디언 섹션:
  - **Recurring Subscriptions**: 연결된 ContractPlan 목록 (실제 청구 기반 EntityPlan)
  - **One-time Invoices**: `contract_id` 로 연결된 인보이스 테이블
  - **Negotiated Financial Terms**: `financial_terms` JSON 의 협상 금액 참조 (실제 청구 아님)
- "+ Issue One-time Invoice" → `/pos/{brand|foodcourt}/invoices?contract_id=X&action=create` → Invoice Create Modal 자동 열림 + payer 자동 prefill

### API
- `GET /api/contracts/:id` 응답에 `invoices` include
- `GET /api/invoices/:id` 응답에 `contractId` 포함
- POST/PUT `/api/invoices` body 에 `contract_id` (POST는 pass-through, PUT는 `contractId` whitelist)

### 편집 권한 (v3.15 보안 수정)
- PUT `/api/invoices/:id` 는 **System Admin / issuer entity (brand/foodcourt) / 수신 restaurant** 만 편집 가능
- null-safe 비교로 cross-entity 편집 차단

---

## 11. SOA 재설계 (2026-04-30) — SOA as Invoice Record

### 11.1 변경 배경

기존 SOA는 derived view (이메일 + 페이지에서 동적 그룹핑)로 구현되어 있었으나, 다음 문제가 있었다:
- 회계상 "한 장의 청구서"가 실재하지 않음 → 외부 회계 시스템 export 시 어색함
- 결제 흐름 모호 (개별 인보이스 vs SOA 묶음 결제 충돌)
- 인보이스 페이지에서 SOA child invoices 를 hide 해야 했음 → 사용자가 "전체 청구서"를 못 봄

신규 설계: **SOA = 별도 Invoice record (`invoice_category='soa'`)**. 월말 자동 발행. 개별 trade invoices 는 그대로 발행되고, SOA 가 그 위에 묶음 청구서로 추가됨.

### 11.2 데이터 모델

```sql
-- invoices 테이블 신규 컬럼
ALTER TABLE invoices ADD COLUMN parent_soa_invoice_id INT NULL;
-- FK → invoices(id) ON DELETE SET NULL (인덱스는 64-key 제한으로 생략)
```

**invoice_category 값**:
- `service` — 일반 서비스 인보이스
- `trade` — PO 거래 인보이스 (PO 1건당 1개 자동 발행)
- `soa` — Statement of Account (월말 자동 발행, child trade invoices 묶음)
- 기타 (subscription 등)

**관계**:
- 1 SOA invoice : N child trade invoices (parent_soa_invoice_id 로 연결)
- SOA invoice 자체는 InvoiceItem 없음 (또는 한 줄로 "{count} invoices for {month}")
- SOA invoice total = SUM(child invoices total) (생성 시점 lock)

### 11.3 SOA 발행 규칙

**언제**: 매월 1일 00:30 (`soaScheduler.js`)
**대상**: `payment_terms.invoice_cycle === 'monthly_soa'` 인 활성 contract
**기간**: 직전 달 1일 ~ 말일에 발행된 trade invoices (issuer_type='supplier', 해당 buyer)

**프로세스**:
1. 직전 달 trade invoices 조회 (해당 supplier × buyer)
2. parent_soa_invoice_id 가 이미 있는 invoices 는 skip (idempotent — 두 번 발행 방지)
3. 해당 invoices 의 합계 계산 → SOA Invoice 생성 (`invoice_category='soa'`, status='pending_payment')
4. child invoices update: `parent_soa_invoice_id = SOA.id`, `status='pending'` (결제 잠금)
5. 이메일 알림 (변경 없음)

### 11.4 결제 흐름

| Contract `invoice_cycle` | 개별 trade invoice 결제 버튼 | SOA invoice 결제 버튼 |
|---|---|---|
| `immediate` | ✓ 표시 (각 invoice 결제 가능) | (SOA 자체가 발행 안 됨) |
| `monthly_soa` | ✗ hide (parent_soa_invoice_id 있는 경우) | ✓ 표시 |

**SOA 결제 시**:
1. SOA invoice status → `paid`
2. 모든 child invoices status → `paid` (cascading update)
3. payment_record 1건 (SOA 인보이스 기준), child 별도 record X
4. 회계상 reconciliation: SOA paid_amount = SUM(children.total)

### 11.5 SOA 페이지/뷰/다운로드

**모든 역할 동일 (Restaurant Admin / Supplier / Brand General / Foodcourt General)**

- 인보이스 list 페이지: 모든 invoices 표시 (개별 + SOA 모두). SOA 는 보라 배지 + 별도 색상으로 구분.
- 결제 버튼 조건부 표시: 위 11.4 표대로
- SOA 클릭/View → SOA 상세 모달 (표지 + 묶인 child invoices 인보이스 목록 + 합계)
- SOA Download → PDF 합본 (표지 1장 + child invoices N장 = 1 PDF)
- SOA Print → 합본 인쇄 가능

### 11.6 마이그레이션 영향

- 기존 SOA derived view (`/api/purchase-invoices/soa/current`) 는 새 모델로 교체 → SOA invoices 만 조회
- 기존 code 가 invoice 결제 시 status 만 보고 결제 가능 여부 판단했다면, 이제 `parent_soa_invoice_id` 도 체크 필요
- soaScheduler 테스트 필요 (idempotency, 동시성)

### 11.7 회계 연속성

- 기존 trade invoices 는 그대로 유지 (역사적 레코드)
- 새로 발행되는 SOA 부터 새 모델 적용
- 백필 스크립트는 만들지 않음 (회계상 과거 SOA 를 거꾸로 발행하면 audit 문제 발생 가능)
