# 청구/결제 시스템 통합 개발 기획서

> **작성일:** 2026-01-19
> **목표:** 역할별 청구/결제 시스템 완성 및 유기적 연동

---

## 1. 역할별 기능 정의

### 1.1 역할별 청구/결제 매트릭스

| 역할 | 청구 (Invoice 발행) | 결제 (Invoice 지불) | Payment Settings |
|------|:----:|:----:|:----:|
| **System Admin** | ✅ → Brand/Foodcourt/Restaurant | - | ✅ 전역 설정 |
| **Brand General** | ✅ → 소속 Restaurant | ✅ → System Admin | ✅ 브랜드용 |
| **Brand Manager** | ⚠️ 제한적 (설정에 따라) | ✅ → System Admin | ❌ |
| **Foodcourt General** | ✅ → 소속 Restaurant | ✅ → System Admin | ✅ 푸드코트용 |
| **Foodcourt Manager** | ⚠️ 제한적 (설정에 따라) | ✅ → System Admin | ❌ |
| **Restaurant Admin** | - | ✅ → 상위 (System/Brand/Foodcourt) | ✅ Mobile Order용 |

### 1.2 Invoice 발행 흐름

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Invoice 발행 흐름                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  System Admin                                                           │
│  ├── → Brand General/Manager (구독료, 서비스비)                          │
│  ├── → Foodcourt General/Manager (구독료, 서비스비)                      │
│  └── → Restaurant Admin (구독료, 서비스비) - 독립 레스토랑               │
│                                                                         │
│  Brand General/Manager                                                  │
│  └── → Restaurant Admin (로열티, 마케팅비, 관리비 등) - 브랜드 소속      │
│                                                                         │
│  Foodcourt General/Manager                                              │
│  └── → Restaurant Admin (임대료, 관리비, 공과금 등) - 푸드코트 입점      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Invoice 상태 흐름

```
[draft] ──발행──→ [pending_payment] ──결제제출──→ [payment_submitted] ──확인──→ [paid]
                        │                                │
                        │                                └── 반려 ──→ [pending_payment]
                        │
                        └── 기한초과 ──→ [overdue]
                        │
                        └── 취소 ──→ [cancelled]
```

---

## 2. 현재 구현 상태

### 2.1 구현 완료 ✅

| 항목 | 파일 | 비고 |
|------|------|------|
| Invoice 모델 | `models/Invoice.js` | payer_type, invoice_category 포함 |
| InvoiceItem 모델 | `models/InvoiceItem.js` | 8가지 item_type |
| InvoiceSettings 모델 | `models/InvoiceSettings.js` | rent, fee 설정 |
| Admin InvoicesPage | `pages/Admin/InvoicesPage.tsx` | 전체 관리 |
| Admin SubscriptionsPage | `pages/Admin/SubscriptionsPage.tsx` | 구독 관리 |
| Restaurant InvoicesPage | `pages/Restaurant/InvoicesPage.tsx` | 결제 + 영수증 업로드 |
| Manager InvoicesPage | `pages/Manager/InvoicesPage.tsx` | 인보이스 관리 |
| Payment Settings (Admin) | `pages/Admin/PaymentSettingsPage.tsx` | 전역 결제 설정 |

### 2.2 미구현 ❌

| 항목 | 필요 이유 |
|------|----------|
| Brand General InvoicesPage | 브랜드→레스토랑 청구 + System Admin 인보이스 결제 |
| Foodcourt General InvoicesPage | 푸드코트→레스토랑 청구 + System Admin 인보이스 결제 |
| Brand/Foodcourt payment_settings | DB 필드 없음 |
| Invoice Payment Page (공용) | 이메일 링크로 접근하는 결제 페이지 |
| 결제 확인 기능 (Admin) | payment_submitted → paid 처리 |

---

## 3. DB 스키마 변경

### 3.1 brands 테이블 확장

```sql
ALTER TABLE brands ADD COLUMN payment_settings TEXT
  COMMENT 'JSON settings for payment methods (same structure as system admin)';

ALTER TABLE brands ADD COLUMN supported_currencies JSON
  COMMENT 'Array of supported currency codes ["MYR", "KRW", "USD"]';

ALTER TABLE brands ADD COLUMN default_currency VARCHAR(10) DEFAULT 'MYR'
  COMMENT 'Default currency for invoices';

ALTER TABLE brands ADD COLUMN invoice_settings TEXT
  COMMENT 'JSON settings for invoice generation (prefix, terms, tax)';
```

### 3.2 foodcourts 테이블 확장

```sql
ALTER TABLE foodcourts ADD COLUMN payment_settings TEXT
  COMMENT 'JSON settings for payment methods (same structure as system admin)';

ALTER TABLE foodcourts ADD COLUMN supported_currencies JSON
  COMMENT 'Array of supported currency codes ["MYR", "KRW", "USD"]';

ALTER TABLE foodcourts ADD COLUMN default_currency VARCHAR(10) DEFAULT 'MYR'
  COMMENT 'Default currency for invoices';

ALTER TABLE foodcourts ADD COLUMN invoice_settings TEXT
  COMMENT 'JSON settings for invoice generation (prefix, terms, tax)';
```

### 3.3 invoices 테이블 확장

```sql
-- 발행자 정보 추가
ALTER TABLE invoices ADD COLUMN issuer_type
  ENUM('system_admin', 'brand', 'foodcourt') DEFAULT 'system_admin'
  COMMENT 'Who issued this invoice';

ALTER TABLE invoices ADD COLUMN issuer_id INT
  COMMENT 'Brand ID or Foodcourt ID (null for system admin)';

-- 결제 게이트웨이 정보
ALTER TABLE invoices ADD COLUMN payment_intent_id VARCHAR(255)
  COMMENT 'Stripe PaymentIntent ID';

ALTER TABLE invoices ADD COLUMN payment_provider VARCHAR(50)
  COMMENT 'stripe, paypal, bank_transfer, qr_payment';

-- 결제 확인 정보
ALTER TABLE invoices ADD COLUMN confirmed_by INT
  COMMENT 'User ID who confirmed payment';

ALTER TABLE invoices ADD COLUMN confirmed_at DATETIME
  COMMENT 'When payment was confirmed';

ALTER TABLE invoices ADD COLUMN rejection_reason TEXT
  COMMENT 'Reason for payment rejection';
```

### 3.4 payment_settings JSON 구조

```javascript
// System Admin / Brand / Foodcourt 동일 구조
{
  "currencies": ["MYR", "KRW", "USD"],
  "defaultCurrency": "MYR",

  // Online Payment (글로벌 - 모든 통화 공용)
  "stripe": {
    "enabled": true,
    "publishableKey": "pk_...",
    "secretKey": "sk_...",        // 암호화 저장
    "webhookSecret": "whsec_...", // 암호화 저장
    "autoCharge": false           // 자동 결제 활성화
  },
  "paypal": {
    "enabled": false,
    "clientId": "...",
    "clientSecret": "..."         // 암호화 저장
  },

  // Manual Payment (통화별)
  "bankTransfer": {
    "MYR": {
      "enabled": true,
      "bankName": "Maybank",
      "accountNumber": "123456789",
      "accountName": "Purple Here Sdn Bhd"
    },
    "KRW": {
      "enabled": true,
      "bankName": "신한은행",
      "accountNumber": "110-123-456789",
      "accountName": "퍼플히어"
    }
  },
  "qrPayment": {
    "MYR": {
      "enabled": true,
      "qrImage": "base64...",
      "description": "DuitNow QR"
    },
    "KRW": {
      "enabled": true,
      "qrImage": "base64...",
      "description": "카카오페이 QR"
    }
  }
}
```

---

## 4. 통합 컴포넌트 설계

### 4.1 컴포넌트 구조

```
src/components/Invoice/
├── InvoiceManager.tsx          # 통합 인보이스 관리 (mode prop으로 역할 구분)
├── InvoiceList.tsx             # 인보이스 목록 테이블/카드
├── InvoiceCard.tsx             # 개별 인보이스 카드
├── InvoiceDetailModal.tsx      # 인보이스 상세 보기
├── InvoiceCreateModal.tsx      # 인보이스 생성
├── InvoicePaymentModal.tsx     # 결제 처리 (영수증 업로드)
├── InvoiceConfirmModal.tsx     # 결제 확인 (청구자용)
├── PaymentMethodSelector.tsx   # 결제 수단 선택
└── ReceiptUploader.tsx         # 영수증 업로드
```

### 4.2 InvoiceManager Props

```typescript
interface InvoiceManagerProps {
  mode: 'issuer' | 'payer' | 'both';  // 청구자 | 결제자 | 둘 다

  // 청구자 모드
  issuerType?: 'system_admin' | 'brand' | 'foodcourt';
  issuerId?: number;  // brand_id 또는 foodcourt_id

  // 결제자 모드
  payerType?: 'brand_manager' | 'foodcourt_manager' | 'restaurant';
  payerId?: number;

  // 청구 대상 (issuer 모드)
  targetType?: 'brand' | 'foodcourt' | 'restaurant';
  targetIds?: number[];  // 특정 대상만 표시

  // UI 옵션
  showStats?: boolean;
  showCreateButton?: boolean;
  showPaymentConfirm?: boolean;  // 결제 확인 버튼 (청구자용)
}
```

### 4.3 역할별 InvoiceManager 사용

```typescript
// System Admin - 청구만
<InvoiceManager
  mode="issuer"
  issuerType="system_admin"
  targetType="all"  // brand, foodcourt, restaurant 모두
  showStats={true}
  showCreateButton={true}
  showPaymentConfirm={true}  // 결제 확인 기능
/>

// Brand General - 청구 + 결제
<InvoiceManager
  mode="both"
  issuerType="brand"
  issuerId={brandId}
  payerType="brand_manager"
  payerId={userId}
  targetType="restaurant"
  targetIds={brandRestaurantIds}
  showStats={true}
  showCreateButton={true}
  showPaymentConfirm={true}
/>

// Foodcourt General - 청구 + 결제
<InvoiceManager
  mode="both"
  issuerType="foodcourt"
  issuerId={foodcourtId}
  payerType="foodcourt_manager"
  payerId={userId}
  targetType="restaurant"
  targetIds={foodcourtRestaurantIds}
  showStats={true}
  showCreateButton={true}
  showPaymentConfirm={true}
/>

// Restaurant Admin - 결제만
<InvoiceManager
  mode="payer"
  payerType="restaurant"
  payerId={restaurantId}
  showStats={true}
  showCreateButton={false}
  showPaymentConfirm={false}
/>
```

---

## 5. API 설계

### 5.1 Invoice API 확장

```javascript
// 인보이스 조회 (역할별 필터)
GET /api/invoices
  ?issuer_type=system_admin|brand|foodcourt
  &issuer_id=123
  &payer_type=brand_manager|foodcourt_manager|restaurant
  &payer_id=456
  &status=pending_payment,payment_submitted
  &date_from=2026-01-01
  &date_to=2026-01-31

// 인보이스 생성
POST /api/invoices
{
  "issuer_type": "brand",
  "issuer_id": 1,
  "restaurant_id": 5,
  "payer_type": "restaurant",
  "payer_id": 5,
  "invoice_category": "service",
  "currency": "MYR",
  "items": [
    {
      "item_type": "management_fee",
      "description": "Monthly Management Fee - January 2026",
      "calculated_amount": 500,
      "tax_rate": 6,
      "tax_amount": 30,
      "total_amount": 530
    }
  ],
  "due_date": "2026-02-15",
  "notes": "..."
}

// 결제 제출 (영수증 업로드)
POST /api/invoices/:id/submit-payment
{
  "payment_method": "bank_transfer",
  "transaction_id": "TRX123456",
  "receipt_url": "https://...",  // 업로드된 영수증 URL
  "payment_date": "2026-01-19",
  "notes": "Transferred via Maybank"
}

// 결제 확인 (청구자)
POST /api/invoices/:id/confirm-payment
{
  "confirmed": true,
  "notes": "Payment verified"
}

// 결제 반려 (청구자)
POST /api/invoices/:id/reject-payment
{
  "reason": "Receipt image is unclear"
}

// Stripe 결제 세션 생성
POST /api/invoices/:id/create-payment-intent
{
  "payment_method": "stripe"
}
// Response: { clientSecret: "pi_xxx_secret_xxx" }

// PayPal 결제 생성
POST /api/invoices/:id/create-paypal-order
// Response: { orderId: "xxx" }
```

### 5.2 Payment Settings API

```javascript
// System Admin
GET  /api/admin/payment-settings
POST /api/admin/payment-settings

// Brand
GET  /api/brands/:id/payment-settings
POST /api/brands/:id/payment-settings

// Foodcourt
GET  /api/foodcourts/:id/payment-settings
POST /api/foodcourts/:id/payment-settings

// 결제 가능 수단 조회 (Invoice 통화 기준)
GET /api/invoices/:id/available-payment-methods
// Response: {
//   currency: "MYR",
//   methods: [
//     { type: "stripe", enabled: true, label: "Credit/Debit Card" },
//     { type: "bank_transfer", enabled: true, bankName: "Maybank", ... },
//     { type: "qr_payment", enabled: true, qrImage: "...", ... }
//   ]
// }
```

---

## 6. 개발 순서

### Phase 1: DB 스키마 및 모델 (1일)

| 순서 | 작업 | 파일 | 테스트 |
|:----:|------|------|--------|
| 1.1 | brands 테이블 필드 추가 | `models/Brand.js` | DB 확인 |
| 1.2 | foodcourts 테이블 필드 추가 | `models/Foodcourts.js` | DB 확인 |
| 1.3 | invoices 테이블 필드 추가 | `models/Invoice.js` | DB 확인 |
| 1.4 | sync-database.js 실행 | - | 스키마 동기화 |

**테스트:**
```bash
# 개발 DB 동기화
cd /var/www/dev-backend && node sync-database.js

# 테이블 구조 확인
mysql -u dev_admin -p purple_dev_db -e "DESCRIBE brands;"
mysql -u dev_admin -p purple_dev_db -e "DESCRIBE foodcourts;"
mysql -u dev_admin -p purple_dev_db -e "DESCRIBE invoices;"
```

---

### Phase 2: 백엔드 API (2일)

| 순서 | 작업 | 파일 | 테스트 |
|:----:|------|------|--------|
| 2.1 | Brand payment_settings API | `routes/brands.js` | Postman |
| 2.2 | Foodcourt payment_settings API | `routes/foodcourts.js` | Postman |
| 2.3 | Invoice 역할별 필터 API | `routes/invoices.js` | Postman |
| 2.4 | 결제 제출 API | `routes/invoices.js` | Postman |
| 2.5 | 결제 확인/반려 API | `routes/invoices.js` | Postman |
| 2.6 | 결제 수단 조회 API | `routes/invoices.js` | Postman |
| 2.7 | Stripe PaymentIntent API (stub) | `routes/payment.js` | Mock 테스트 |
| 2.8 | PayPal Order API (stub) | `routes/payment.js` | Mock 테스트 |

**테스트 시나리오:**
```bash
# 1. Brand payment_settings 저장
POST /api/brands/1/payment-settings
{ "currencies": ["MYR"], "bankTransfer": { "MYR": { ... } } }

# 2. Invoice 생성 (Brand → Restaurant)
POST /api/invoices
{ "issuer_type": "brand", "issuer_id": 1, "restaurant_id": 5, ... }

# 3. 결제 제출 (Restaurant)
POST /api/invoices/123/submit-payment
{ "payment_method": "bank_transfer", "receipt_url": "..." }

# 4. 결제 확인 (Brand)
POST /api/invoices/123/confirm-payment
{ "confirmed": true }

# 5. Invoice 상태 확인
GET /api/invoices/123
# status: "paid", confirmed_by: X, confirmed_at: "..."
```

---

### Phase 3: 통합 컴포넌트 (3일)

| 순서 | 작업 | 파일 | 테스트 |
|:----:|------|------|--------|
| 3.1 | InvoiceList 컴포넌트 | `components/Invoice/InvoiceList.tsx` | Storybook |
| 3.2 | InvoiceCard 컴포넌트 | `components/Invoice/InvoiceCard.tsx` | Storybook |
| 3.3 | InvoiceDetailModal | `components/Invoice/InvoiceDetailModal.tsx` | UI 확인 |
| 3.4 | InvoiceCreateModal | `components/Invoice/InvoiceCreateModal.tsx` | UI 확인 |
| 3.5 | PaymentMethodSelector | `components/Invoice/PaymentMethodSelector.tsx` | UI 확인 |
| 3.6 | ReceiptUploader | `components/Invoice/ReceiptUploader.tsx` | 업로드 테스트 |
| 3.7 | InvoicePaymentModal | `components/Invoice/InvoicePaymentModal.tsx` | 결제 흐름 |
| 3.8 | InvoiceConfirmModal | `components/Invoice/InvoiceConfirmModal.tsx` | 확인/반려 |
| 3.9 | InvoiceManager 통합 | `components/Invoice/InvoiceManager.tsx` | 전체 통합 |

**UI/UX 체크리스트:**
- [ ] 반응형 (모바일/태블릿/데스크톱)
- [ ] 로딩 상태 표시
- [ ] 에러 처리 (인라인 메시지)
- [ ] 빈 상태 UI
- [ ] ActionButton 스타일 통일 (border-radius: 6px, font-weight: 500)
- [ ] StatusBadge 색상 통일

---

### Phase 4: 페이지 통합 (2일)

| 순서 | 작업 | 파일 | 테스트 |
|:----:|------|------|--------|
| 4.1 | Admin InvoicesPage 리팩토링 | `pages/Admin/InvoicesPage.tsx` | 기존 기능 유지 |
| 4.2 | Admin 결제 확인 기능 추가 | `pages/Admin/InvoicesPage.tsx` | 확인/반려 테스트 |
| 4.3 | Brand General InvoicesPage 생성 | `pages/BrandGeneral/InvoicesPage.tsx` | 청구+결제 |
| 4.4 | Foodcourt General InvoicesPage 생성 | `pages/FoodcourtGeneral/InvoicesPage.tsx` | 청구+결제 |
| 4.5 | Restaurant InvoicesPage 리팩토링 | `pages/Restaurant/InvoicesPage.tsx` | 컴포넌트 재사용 |
| 4.6 | App.tsx 라우트 추가 | `App.tsx` | 접근 확인 |
| 4.7 | Sidebar 메뉴 추가 | `components/Layout/MainLayout.tsx` | 메뉴 표시 |

**라우트 추가:**
```typescript
// Brand General
/pos/brand-general/invoices         // 청구 + 결제
/pos/brand-general/payment-settings // Payment Settings

// Foodcourt General
/pos/foodcourt-general/invoices         // 청구 + 결제
/pos/foodcourt-general/payment-settings // Payment Settings
```

---

### Phase 5: Payment Settings 페이지 (1일)

| 순서 | 작업 | 파일 | 테스트 |
|:----:|------|------|--------|
| 5.1 | PaymentSettingsPage 컴포넌트화 | `components/Settings/PaymentSettings.tsx` | - |
| 5.2 | Brand Payment Settings 페이지 | `pages/BrandGeneral/PaymentSettingsPage.tsx` | 저장/불러오기 |
| 5.3 | Foodcourt Payment Settings 페이지 | `pages/FoodcourtGeneral/PaymentSettingsPage.tsx` | 저장/불러오기 |

---

### Phase 6: Invoice Payment Page (공용) (1일)

| 순서 | 작업 | 파일 | 테스트 |
|:----:|------|------|--------|
| 6.1 | InvoicePaymentPage 생성 | `pages/Public/InvoicePaymentPage.tsx` | - |
| 6.2 | 토큰 기반 접근 API | `routes/invoices.js` | 보안 테스트 |
| 6.3 | 이메일 링크 생성 | `services/emailService.js` | 링크 테스트 |

**접근 URL:**
```
/invoice-payment/:invoiceId/:token
```

---

### Phase 7: Stripe/PayPal Stub (1일)

| 순서 | 작업 | 파일 | 테스트 |
|:----:|------|------|--------|
| 7.1 | Stripe 결제 UI (Stub) | `components/Invoice/StripePayment.tsx` | Mock |
| 7.2 | PayPal 결제 UI (Stub) | `components/Invoice/PayPalPayment.tsx` | Mock |
| 7.3 | 결제 완료 핸들링 | - | Mock 콜백 |

**Stub 동작:**
- Stripe: 버튼 클릭 → 3초 대기 → 성공/실패 시뮬레이션
- PayPal: 버튼 클릭 → 3초 대기 → 성공/실패 시뮬레이션
- 실제 연동은 Phase 8 (향후)

---

### Phase 8: 통합 테스트 (1일)

**역할별 시나리오 테스트:**

#### 시나리오 1: System Admin → Brand General → Restaurant

```
1. System Admin: Brand General에게 구독료 인보이스 발행
2. Brand General: 인보이스 목록에서 확인
3. Brand General: Bank Transfer로 결제 제출 (영수증 업로드)
4. System Admin: 결제 확인 → paid 상태
5. Brand General: 소속 Restaurant에게 관리비 인보이스 발행
6. Restaurant: 인보이스 목록에서 확인
7. Restaurant: QR로 결제 제출 (영수증 업로드)
8. Brand General: 결제 확인 → paid 상태
```

#### 시나리오 2: System Admin → Foodcourt General → Restaurant

```
1. System Admin: Foodcourt General에게 구독료 인보이스 발행
2. Foodcourt General: 인보이스 목록에서 확인
3. Foodcourt General: Stripe로 결제 (Stub)
4. System Admin: 자동 확인 → paid 상태 (Stripe webhook)
5. Foodcourt General: 소속 Restaurant에게 임대료 인보이스 발행
6. Restaurant: 인보이스 목록에서 확인
7. Restaurant: Bank Transfer로 결제 제출
8. Foodcourt General: 결제 확인 → paid 상태
```

#### 시나리오 3: 결제 반려

```
1. Restaurant: 결제 제출 (영수증 불명확)
2. Brand/Foodcourt General: 결제 반려 (사유 입력)
3. Restaurant: pending_payment 상태로 복귀, 반려 사유 표시
4. Restaurant: 재결제 제출
5. Brand/Foodcourt General: 결제 확인
```

---

## 7. 파일 목록

### 7.1 신규 생성

```
# Backend
dev-backend/routes/payment.js                    # Stripe/PayPal API

# Frontend - Components
dev-frontend/src/components/Invoice/
├── index.ts
├── InvoiceManager.tsx
├── InvoiceList.tsx
├── InvoiceCard.tsx
├── InvoiceDetailModal.tsx
├── InvoiceCreateModal.tsx
├── InvoicePaymentModal.tsx
├── InvoiceConfirmModal.tsx
├── PaymentMethodSelector.tsx
├── ReceiptUploader.tsx
├── StripePayment.tsx
└── PayPalPayment.tsx

dev-frontend/src/components/Settings/
└── PaymentSettings.tsx                          # 공용 컴포넌트

# Frontend - Pages
dev-frontend/src/pages/BrandGeneral/
├── InvoicesPage.tsx
└── PaymentSettingsPage.tsx

dev-frontend/src/pages/FoodcourtGeneral/
├── InvoicesPage.tsx
└── PaymentSettingsPage.tsx

dev-frontend/src/pages/Public/
└── InvoicePaymentPage.tsx
```

### 7.2 수정

```
# Backend
dev-backend/models/Brand.js                      # payment_settings 등 추가
dev-backend/models/Foodcourt.js                  # payment_settings 등 추가
dev-backend/models/Invoice.js                    # issuer_type 등 추가
dev-backend/routes/brands.js                     # payment-settings API
dev-backend/routes/foodcourts.js                 # payment-settings API
dev-backend/routes/invoices.js                   # 역할별 필터, 결제 확인 등

# Frontend
dev-frontend/src/pages/Admin/InvoicesPage.tsx    # 결제 확인 기능 추가
dev-frontend/src/pages/Restaurant/InvoicesPage.tsx  # 컴포넌트 재사용
dev-frontend/src/App.tsx                         # 라우트 추가
dev-frontend/src/components/Layout/MainLayout.tsx   # 사이드바 메뉴
```

---

## 8. 체크리스트

### 8.1 개발 전 확인
- [ ] 개발 DB 백업
- [ ] 기존 Invoice 데이터 마이그레이션 계획

### 8.2 개발 중 확인
- [ ] 각 Phase 완료 후 dev 서버 테스트
- [ ] API 응답 형식 일관성
- [ ] 에러 처리 통일

### 8.3 배포 전 확인
- [ ] 전체 시나리오 테스트 완료
- [ ] 운영 DB 스키마 변경 준비
- [ ] 롤백 계획 수립

---

## 9. 향후 계획

### Phase 9: Stripe 실제 연동
- Stripe Checkout 연동
- Webhook 처리
- 자동 결제 (구독)

### Phase 10: PayPal 실제 연동
- PayPal Checkout 연동
- Webhook 처리

### Phase 11: 자동 인보이스 발행 확장
- Brand/Foodcourt → Restaurant 자동 인보이스
- 계약 기반 정기 청구

### Phase 12: 이메일 알림
- 인보이스 발행 알림
- 결제 기한 리마인더
- 결제 확인/반려 알림

---

**문서 끝**
