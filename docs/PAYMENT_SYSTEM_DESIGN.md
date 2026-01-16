# 결제 시스템 개발 기획서

## 1. 결제 흐름 구조

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           결제 흐름 방향                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  청구자 (Invoice 발행)              결제자 (Invoice 결제)                 │
│  ──────────────────────────────────────────────────────────────────────  │
│                                                                          │
│  System Admin          ────────────▶  Brand Manager                     │
│  (구독/서비스 청구)                    Foodcourt Manager                  │
│                                       Restaurant Admin                   │
│                                                                          │
│  Brand General/Manager ────────────▶  Restaurant Admin                  │
│  (소속 레스토랑 비용)                  (브랜드 소속)                       │
│                                                                          │
│  Foodcourt General/Manager ────────▶  Restaurant Admin                  │
│  (소속 레스토랑 비용)                  (푸드코트 소속)                     │
│                                                                          │
│  Restaurant Admin      ────────────▶  Customer                          │
│  (Mobile Order)                       (모바일 주문 결제)                  │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## 2. 역할별 결제 기능

| 역할 | 청구(Invoice 발행) | 결제(Invoice 지불) | Payment Settings |
|------|-------------------|-------------------|------------------|
| System Admin | O | X | O (전역 설정) |
| Brand General/Manager | O (소속 Restaurant) | O (System Admin에게) | O (브랜드용) |
| Foodcourt General/Manager | O (소속 Restaurant) | O (System Admin에게) | O (푸드코트용) |
| Restaurant Admin | O (Customer - Mobile) | O (상위에게) | O (Mobile Order용) |
| Customer | X | O (Mobile Order) | X |

## 3. 현재 DB 구조 분석

### 3.1 invoices 테이블 (기존 - 충분함)
```sql
- currency: VARCHAR(10) ✓ 통화
- payment_method: VARCHAR(50) ✓ 결제 수단
- transaction_id: VARCHAR(255) ✓ 트랜잭션 ID
- receipt_url: VARCHAR(500) ✓ 영수증 URL
- payment_notes: TEXT ✓ 결제 메모
- status: ENUM('draft','pending_payment','payment_submitted','paid','overdue','cancelled') ✓
```

### 3.2 subscriptions 테이블 (확장 필요)
```sql
-- 현재 없는 필드들 (추가 필요)
ALTER TABLE subscriptions ADD COLUMN currency VARCHAR(10) DEFAULT 'MYR';
ALTER TABLE subscriptions ADD COLUMN payment_provider VARCHAR(50) NULL COMMENT 'stripe, paypal, bank_transfer, qr_payment';
ALTER TABLE subscriptions ADD COLUMN payment_provider_subscription_id VARCHAR(255) NULL COMMENT '결제 게이트웨이 구독 ID';
ALTER TABLE subscriptions ADD COLUMN payment_provider_customer_id VARCHAR(255) NULL COMMENT '결제 게이트웨이 고객 ID';
ALTER TABLE subscriptions ADD COLUMN payment_method_id VARCHAR(255) NULL COMMENT '저장된 결제 수단 ID';
```

### 3.3 plan_prices 테이블 (기존 - 충분함)
```sql
- currency: VARCHAR(3) ✓ 통화
- monthly_price: DECIMAL(10,2) ✓
- annual_price: DECIMAL(10,2) ✓
```

### 3.4 restaurants.payment_settings (기존 - Mobile Order용)
```json
{
  "cash": { "enabled": true, "availableIn": ["pos"] },
  "card": { "enabled": true, "availableIn": ["pos", "mobile"], "config": { "stripePublicKey": "", ... } },
  "bankTransfer": { "enabled": true, "bankName": "", "accountNumber": "", "accountName": "" },
  "qrPayment": { "enabled": true, "qrImage": "" },
  "payAtCounter": { "enabled": true },
  ...
}
```

## 4. Payment Settings 설계

### 4.1 System Admin Payment Settings
**위치:** Settings > Payment
**용도:** 구독/서비스 인보이스 결제 수신

```
system_settings.payment_settings = {
  "stripe": {
    "enabled": true,
    "publishableKey": "pk_...",
    "secretKey": "sk_...",
    "webhookSecret": "whsec_...",
    "autoCharge": true  // 구독 자동결제 여부
  },
  "paypal": {
    "enabled": true,
    "clientId": "...",
    "clientSecret": "..."
  },
  "bankTransfer": {
    "MYR": { "bankName": "Maybank", "accountNumber": "123...", "accountName": "Purple Here Sdn Bhd" },
    "KRW": { "bankName": "신한은행", "accountNumber": "110...", "accountName": "퍼플히어" }
  },
  "qrPayment": {
    "MYR": { "qrImage": "base64...", "description": "DuitNow" },
    "KRW": { "qrImage": "base64...", "description": "카카오페이 QR" }
  },
  "currencies": ["MYR", "KRW", "USD"],  // 지원 통화 (Site Settings에서 이동)
  "defaultCurrency": "MYR"
}
```

### 4.2 Brand/Foodcourt Payment Settings
**위치:** Brand Settings > Payment / Foodcourt Settings > Payment
**용도:** 소속 레스토랑에게 인보이스 발행 시 결제 수신

```
brands.payment_settings = {
  // System Admin과 동일한 구조
  "stripe": { ... },
  "paypal": { ... },
  "bankTransfer": { "MYR": { ... } },
  "qrPayment": { "MYR": { ... } }
}
```

### 4.3 Restaurant Payment Settings
**위치:** Settings > Payment
**용도:**
1. Mobile Order 고객 결제 수신 (기존)
2. 상위(System Admin/Brand/Foodcourt)에게 결제하는 것은 별도 설정 불필요 (Invoice 결제 시 선택)

```
restaurants.payment_settings = {
  // 기존 구조 유지 (Mobile Order용)
  "cash": { ... },
  "card": { ... },
  "bankTransfer": { ... },
  "qrPayment": { ... },
  ...
}
```

## 5. 결제 방식별 프로세스

### 5.1 온라인 자동 결제 (Stripe)
```
1. Invoice 발행 → 이메일로 결제 링크 발송
2. 결제자가 링크 클릭 → 결제 페이지
3. Stripe Checkout 또는 Elements로 카드 결제
4. 성공 시 → Invoice 상태 'paid' 업데이트
5. 구독인 경우 → 카드 정보 저장 (다음 결제 자동)
```

### 5.2 온라인 자동 결제 (PayPal)
```
1. Invoice 발행 → 이메일로 결제 링크 발송
2. 결제자가 링크 클릭 → PayPal 결제 페이지
3. PayPal 계정 또는 카드로 결제
4. 성공 시 → Invoice 상태 'paid' 업데이트
```

### 5.3 수동 결제 (Bank Transfer)
```
1. Invoice 발행 → 은행 정보 포함 이메일 발송
2. 결제자가 은행 송금 진행
3. 송금 후 → Invoice 페이지에서 영수증 업로드
4. Invoice 상태 'payment_submitted' 업데이트
5. 청구자가 확인 → 'paid' 업데이트
```

### 5.4 수동 결제 (QR Payment)
```
1. Invoice 발행 → QR 코드 포함 이메일 발송
2. 결제자가 QR 스캔 → 결제 앱으로 송금
3. 송금 후 → Invoice 페이지에서 영수증 업로드
4. Invoice 상태 'payment_submitted' 업데이트
5. 청구자가 확인 → 'paid' 업데이트
```

## 6. Invoice 결제 페이지

### 6.1 접근 방식
- **이메일 링크**: `/invoice-payment/:invoiceId/:token` (토큰 기반 접근)
- **대시보드**: Manager > Invoices > Pay 버튼

### 6.2 UI 구성
```
┌─────────────────────────────────────────────────────────────────┐
│ Invoice Payment                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Invoice: INV-2026010001                                        │
│  From: Purple Here (System Admin)                               │
│  Amount: MYR 99.00                                              │
│  Due: 2026-01-31                                                │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Select Payment Method:                                          │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ Credit/Debit Card                                      │   │
│  │   Secure payment via Stripe                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ Bank Transfer                                          │   │
│  │   Bank: Maybank | Acc: 1234567890                        │   │
│  │   Name: Purple Here Sdn Bhd | Ref: INV-2026010001        │   │
│  │   [Upload Receipt] after transfer                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ QR Payment                                              │   │
│  │   ┌─────────┐ Scan to pay via DuitNow                    │   │
│  │   │ QR CODE │ [Upload Receipt] after payment             │   │
│  │   └─────────┘                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│                                    [Continue to Payment]         │
└─────────────────────────────────────────────────────────────────┘
```

## 7. 구현 우선순위

### Phase 1: Payment Settings UI 정리
1. ~~System Admin Payment Settings 페이지 생성~~ ✓
2. Currency Settings를 Payment Settings로 이동
3. Stripe/PayPal은 글로벌, Bank Transfer/QR은 통화별 설정으로 UI 수정

### Phase 2: Invoice 결제 기능
1. Invoice 결제 페이지 생성
2. Bank Transfer/QR 결제 프로세스 (영수증 업로드 → 확인)
3. Invoice 상태 업데이트 로직

### Phase 3: Stripe 연동
1. Stripe Checkout 연동 (일회성 결제)
2. Stripe Customer/PaymentMethod 저장 (구독 자동결제용)
3. Stripe Webhook 처리

### Phase 4: PayPal 연동
1. PayPal Checkout 연동
2. PayPal Webhook 처리

### Phase 5: 자동 결제 (구독)
1. Subscription에 결제 정보 저장
2. 갱신일 자동 결제 처리
3. 실패 시 이메일 알림 및 수동 결제 유도

### Phase 6: Brand/Foodcourt 확장
1. Brand Payment Settings
2. Foodcourt Payment Settings
3. Restaurant → Brand/Foodcourt 결제 흐름

## 8. API 설계

### 8.1 Payment Settings API
```
GET  /api/admin/payment-settings         # System Admin 결제 설정 조회
POST /api/admin/payment-settings         # System Admin 결제 설정 저장

GET  /api/brands/:id/payment-settings    # Brand 결제 설정 조회
POST /api/brands/:id/payment-settings    # Brand 결제 설정 저장

GET  /api/restaurants/:id/payment-settings   # Restaurant 결제 설정 조회
POST /api/restaurants/:id/payment-settings   # Restaurant 결제 설정 저장
```

### 8.2 Invoice Payment API
```
GET  /api/invoices/:id/payment-options   # 사용 가능한 결제 수단 조회
POST /api/invoices/:id/pay/stripe        # Stripe 결제 세션 생성
POST /api/invoices/:id/pay/paypal        # PayPal 결제 시작
POST /api/invoices/:id/submit-receipt    # 영수증 제출 (Bank/QR)
POST /api/invoices/:id/confirm-payment   # 결제 확인 (청구자)

POST /api/webhooks/stripe                # Stripe webhook
POST /api/webhooks/paypal                # PayPal webhook
```

### 8.3 Subscription Payment API
```
POST /api/subscriptions/:id/setup-auto-payment  # 자동결제 설정
POST /api/subscriptions/:id/cancel-auto-payment # 자동결제 취소
POST /api/subscriptions/:id/update-payment-method # 결제수단 변경
```

## 9. 보안 고려사항

1. **API 키 암호화**: Secret Key는 DB에 암호화하여 저장
2. **마스킹 처리**: API 응답에서 Secret Key는 마스킹 (••••last4)
3. **Webhook 검증**: Stripe/PayPal webhook signature 검증 필수
4. **결제 링크 토큰**: 시간제한 + 일회용 토큰 사용
5. **PCI DSS**: 카드 정보는 Stripe/PayPal에서만 처리 (서버에 저장 안 함)
