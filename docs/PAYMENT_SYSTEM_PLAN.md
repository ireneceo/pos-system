# 결제 시스템 설계 문서

> 최종 업데이트: 2026-01-16

## 1. 결제 흐름 개요

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              결제 흐름 구조                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  청구자 (Invoice 발행)                 결제자 (Invoice 결제)                 │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  System Admin          ──────────────▶  Brand Manager                      │
│  (구독/서비스 청구)                      Foodcourt Manager                   │
│                                         Restaurant Admin                    │
│                                                                             │
│  Brand General/Manager ──────────────▶  Restaurant Admin                   │
│  (소속 레스토랑 비용)                    (브랜드 소속)                        │
│                                                                             │
│  Foodcourt General/Manager ──────────▶  Restaurant Admin                   │
│  (소속 레스토랑 비용)                    (푸드코트 소속)                      │
│                                                                             │
│  Restaurant Admin      ──────────────▶  Customer                           │
│  (Mobile Order)                         (모바일 주문 결제)                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. 역할별 결제 기능 상세

### 2.1 역할별 기능 요약

| 역할 | 청구(Invoice 발행) | 결제(Invoice 지불) | Payment Settings | Currency 설정 |
|------|-------------------|-------------------|------------------|---------------|
| System Admin | O | X | O (전역) | 다중통화 |
| Brand General/Manager | O (소속 Restaurant) | O (System Admin에게) | O (브랜드용) | 다중통화 |
| Foodcourt General/Manager | O (소속 Restaurant) | O (System Admin에게) | O (푸드코트용) | 다중통화 |
| Restaurant Admin | O (Customer - Mobile) | O (상위에게) | O (Mobile Order용) | 단일통화 |
| Customer | X | O (Mobile Order) | X | X |

### 2.2 역할별 상세 설명

#### System Admin (시스템 관리자)
**청구 기능:**
- 구독 플랜에 따른 자동 인보이스 발행
- 서비스/컨설팅 등 수동 인보이스 발행
- 청구 대상: Brand Manager, Foodcourt Manager, Restaurant Admin

**Payment Settings:**
- 다중 통화 지원 (MYR, KRW, USD 등)
- Stripe/PayPal: 글로벌 설정 (한 번만)
- Bank Transfer/QR: 통화별 설정 (통화마다 다른 계좌/QR)

**인보이스 발행 시 통화:**
- 결제자(수신자)의 Default Currency 기준으로 발행
- 예: Brand Manager의 Default Currency가 KRW면 KRW로 인보이스 발행

---

#### Brand General/Manager (브랜드 총괄/매니저)
**청구 기능 (System Admin과 동일 구조):**
- 소속 Restaurant에게 인보이스 발행
- 다중 통화 지원
- Payment Settings에서 결제 수단 설정

**결제 기능:**
- System Admin에게 받은 인보이스 결제
- **System Admin의 Default Currency 기준**으로 결제
- System Admin이 설정한 결제 수단 사용 (Stripe, PayPal, Bank Transfer, QR)

**Payment Settings:**
- System Admin과 동일한 UI/구조
- 다중 통화 지원 + 통화별 Bank Transfer/QR 설정

---

#### Foodcourt General/Manager (푸드코트 총괄/매니저)
**청구 기능 (System Admin과 동일 구조):**
- 소속 Restaurant에게 인보이스 발행
- 다중 통화 지원
- Payment Settings에서 결제 수단 설정

**결제 기능:**
- System Admin에게 받은 인보이스 결제
- **System Admin의 Default Currency 기준**으로 결제
- System Admin이 설정한 결제 수단 사용

**Payment Settings:**
- System Admin과 동일한 UI/구조
- 다중 통화 지원 + 통화별 Bank Transfer/QR 설정

---

#### Restaurant Admin (레스토랑 관리자)
**청구 기능:**
- Customer에게 Mobile Order를 통한 결제 청구
- **단일 통화** (레스토랑에 설정된 통화)

**결제 기능:**
- System Admin에게 받은 인보이스 결제 (구독)
- Brand/Foodcourt에게 받은 인보이스 결제 (소속비용)
- **청구자의 설정에 따라** 결제 통화 결정

**Payment Settings:**
- Mobile Order용 결제 설정 (기존 구조)
- 단일 통화만 지원
- Cash, Card, Bank Transfer, QR, Pay at Counter 등

---

### 2.3 통화 설정 규칙

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           통화 설정 규칙                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  청구자                  인보이스 통화          결제 통화                    │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  System Admin      →   결제자의 Default Currency   →   동일                 │
│  Brand/Foodcourt   →   결제자(Restaurant)의 통화   →   동일                 │
│  Restaurant        →   레스토랑 통화 (단일)         →   동일                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

예시:
- System Admin → Brand Manager (Default: KRW) = KRW 인보이스
- System Admin → Restaurant Admin (통화: MYR) = MYR 인보이스
- Brand Manager → Restaurant Admin (통화: MYR) = MYR 인보이스
- Restaurant Admin → Customer = Restaurant 통화 (예: MYR)
```

## 3. 결제 수단 종류

### 3.1 온라인 결제 (자동)
- **Stripe** - 카드, 정기결제 (다중 통화 지원)
- **PayPal** - 카드, PayPal 계정 (다중 통화 지원)

### 3.2 수동 결제
- **Bank Transfer** - 은행 송금 (통화별 다른 계좌)
- **QR Payment** - QR 코드 스캔 결제 (통화별 다른 QR - DuitNow, KakaoPay 등)

### 3.3 오프라인 결제 (POS용 - Restaurant만)
- Cash
- Card (단말기)
- Pay at Counter

## 4. Payment Settings 설계

### 4.1 설정 구조 비교

| 항목 | System Admin | Brand/Foodcourt | Restaurant |
|------|-------------|-----------------|------------|
| Currency 설정 | 다중 (Default + Supported) | 다중 (Default + Supported) | 단일 |
| Stripe | 글로벌 (1회) | 글로벌 (1회) | 글로벌 (1회) |
| PayPal | 글로벌 (1회) | 글로벌 (1회) | 글로벌 (1회) |
| Bank Transfer | 통화별 | 통화별 | 단일 |
| QR Payment | 통화별 | 통화별 | 단일 |
| Cash | X | X | O |
| Pay at Counter | X | X | O |

### 4.2 System Admin / Brand / Foodcourt Payment Settings
**위치:** Settings > Payment
**UI 구조:** 동일 (PaymentSettingsPage.tsx 재사용)

```json
{
  "currencies": ["MYR", "KRW", "USD"],
  "defaultCurrency": "MYR",
  "stripe": {
    "enabled": true,
    "publishableKey": "pk_...",
    "secretKey": "sk_...",
    "webhookSecret": "whsec_...",
    "autoCharge": true
  },
  "paypal": {
    "enabled": true,
    "clientId": "...",
    "clientSecret": "..."
  },
  "bankTransfer": {
    "MYR": { "enabled": true, "bankName": "Maybank", "accountNumber": "123...", "accountName": "Purple Here" },
    "KRW": { "enabled": true, "bankName": "신한은행", "accountNumber": "110...", "accountName": "퍼플히어" }
  },
  "qrPayment": {
    "MYR": { "enabled": true, "qrImage": "base64...", "qrDescription": "DuitNow" },
    "KRW": { "enabled": true, "qrImage": "base64...", "qrDescription": "카카오페이" }
  }
}
```

### 4.3 Restaurant Payment Settings (기존)
**위치:** Settings > Payment
**특징:** 단일 통화, Mobile Order + POS용

```json
{
  "currency": "MYR",
  "cash": { "enabled": true, "availableIn": ["pos"] },
  "card": { "enabled": true, "availableIn": ["pos", "mobile"], "config": { "stripePublicKey": "..." } },
  "bankTransfer": { "enabled": true, "bankName": "Maybank", "accountNumber": "123...", "accountName": "Seoul BBQ" },
  "qrPayment": { "enabled": true, "qrImage": "base64..." },
  "payAtCounter": { "enabled": true, "availableIn": ["mobile"] }
}
```

## 5. UI 설계

### 5.1 System Admin / Brand / Foodcourt Payment Settings

```
┌─────────────────────────────────────────────────────────────────┐
│ Payment Settings                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  Currency Settings                                               │
│  ─────────────────────────────────────────────────────────────  │
│  Default Currency: [MYR ▼]                                       │
│  Supported Currencies: [MYR] [KRW] [USD] [Click to edit]        │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  Online Payment (Global - All Currencies)                        │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Stripe                                       [Toggle ON]   │ │
│  │ Publishable Key: [pk_live_...]                             │ │
│  │ Secret Key:      [sk_live_...]                             │ │
│  │ Webhook Secret:  [whsec_...]                               │ │
│  │ □ Enable auto-charge for subscriptions                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ PayPal                                       [Toggle ON]   │ │
│  │ Client ID:       [...]                                     │ │
│  │ Client Secret:   [...]                                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│  Manual Payment (Per Currency)                                   │
│  ─────────────────────────────────────────────────────────────  │
│  [$ USD] [RM MYR] [₩ KRW]  ← 통화 탭                            │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Bank Transfer (MYR)                          [Toggle ON]   │ │
│  │ Bank Name:       [Maybank]                                 │ │
│  │ Account Number:  [1234567890]                              │ │
│  │ Account Name:    [Purple Here Sdn Bhd]                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ QR Payment (MYR)                             [Toggle ON]   │ │
│  │ QR Code Image:   [Upload QR Code]                          │ │
│  │ Description:     [Scan to pay via DuitNow]                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│                                            [Save Settings]       │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Invoice 결제 화면 (결제자용)

**접근 경로:**
- 이메일 링크: `/invoice-payment/:invoiceId/:token`
- 대시보드: Invoices > Pay 버튼

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
│  (청구자가 설정한 MYR 결제 수단만 표시)                          │
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
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ QR Payment                                              │   │
│  │   ┌─────────┐ Scan to pay via DuitNow                    │   │
│  │   │ QR CODE │                                            │   │
│  │   └─────────┘                                            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│                                    [Continue to Payment]         │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 영수증 업로드 화면 (Bank Transfer / QR Payment)

```
┌─────────────────────────────────────────────────────────────────┐
│ Submit Payment Receipt                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Invoice: INV-2026010001                                        │
│  Amount:  MYR 99.00                                             │
│  Method:  Bank Transfer                                         │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Upload Payment Receipt:                                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              [Drop receipt image here]                     │ │
│  │                  or click to browse                        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Transaction Reference (optional): [_________________________]  │
│  Notes (optional): [_________________________________________]  │
│                                                                  │
│                                   [Submit for Review]            │
└─────────────────────────────────────────────────────────────────┘
```

## 6. 결제 프로세스

### 6.1 온라인 자동 결제 (Stripe)
```
1. Invoice 발행 → 이메일로 결제 링크 발송
2. 결제자가 링크 클릭 → 결제 페이지
3. Stripe Checkout으로 카드 결제
4. 성공 시 → Invoice 상태 'paid' 업데이트
5. 구독인 경우 → 카드 정보 저장 (다음 결제 자동)
```

### 6.2 온라인 자동 결제 (PayPal)
```
1. Invoice 발행 → 이메일로 결제 링크 발송
2. 결제자가 링크 클릭 → PayPal 결제 페이지
3. PayPal 계정 또는 카드로 결제
4. 성공 시 → Invoice 상태 'paid' 업데이트
```

### 6.3 수동 결제 (Bank Transfer / QR)
```
1. Invoice 발행 → 은행/QR 정보 포함 이메일 발송
2. 결제자가 송금 진행
3. 송금 후 → Invoice 페이지에서 영수증 업로드
4. Invoice 상태 'payment_submitted' 업데이트
5. 청구자가 확인 → 'paid' 업데이트
```

### 6.4 구독 자동갱신 (Stripe)
```
1. 갱신일 도래
2. Stripe가 저장된 카드로 자동 결제 시도
3-A. 성공 → Invoice 자동 생성 (paid 상태)
3-B. 실패 → Invoice 생성 (pending) + 이메일 알림
4. 실패 시 수동 결제 유도
```

## 7. DB 스키마

### 7.1 현재 구조 (변경 불필요)

**invoices 테이블:**
```sql
- currency: VARCHAR(10)        -- 통화
- payment_method: VARCHAR(50)  -- 결제 수단
- transaction_id: VARCHAR(255) -- 트랜잭션 ID
- receipt_url: VARCHAR(500)    -- 영수증 URL
- payment_notes: TEXT          -- 결제 메모
- status: ENUM('draft','pending_payment','payment_submitted','paid','overdue','cancelled')
```

**plan_prices 테이블:**
```sql
- currency: VARCHAR(3)         -- 통화
- monthly_price: DECIMAL(10,2)
- annual_price: DECIMAL(10,2)
```

### 7.2 subscriptions 테이블 확장 필요
```sql
ALTER TABLE subscriptions
ADD COLUMN currency VARCHAR(10) DEFAULT 'MYR',
ADD COLUMN payment_provider VARCHAR(50) NULL
  COMMENT 'stripe, paypal, bank_transfer, qr_payment',
ADD COLUMN payment_provider_subscription_id VARCHAR(255) NULL
  COMMENT '결제 게이트웨이 구독 ID',
ADD COLUMN payment_provider_customer_id VARCHAR(255) NULL
  COMMENT '결제 게이트웨이 고객 ID',
ADD COLUMN payment_method_id VARCHAR(255) NULL
  COMMENT '저장된 결제 수단 ID';
```

### 7.3 Payment Settings 저장 위치

| 역할 | 저장 테이블 | 필드/키 |
|------|-----------|---------|
| System Admin | system_settings | setting_key = 'payment_settings' |
| Brand | brands | payment_settings (JSON) |
| Foodcourt | foodcourts | payment_settings (JSON) |
| Restaurant | restaurants | payment_settings (JSON) - 기존 |

## 8. API 설계

### 8.1 Payment Settings API
```
# System Admin
GET  /api/admin/payment-settings
POST /api/admin/payment-settings

# Brand
GET  /api/brands/:id/payment-settings
POST /api/brands/:id/payment-settings

# Foodcourt
GET  /api/foodcourts/:id/payment-settings
POST /api/foodcourts/:id/payment-settings

# Restaurant (기존)
GET  /api/restaurants/:id/payment-settings
POST /api/restaurants/:id/payment-settings
```

### 8.2 Invoice Payment API
```
GET  /api/invoices/:id/payment-options   # 사용 가능한 결제 수단 조회 (통화 기반)
POST /api/invoices/:id/pay/stripe        # Stripe 결제 세션 생성
POST /api/invoices/:id/pay/paypal        # PayPal 결제 시작
POST /api/invoices/:id/submit-receipt    # 영수증 제출 (Bank/QR)
POST /api/invoices/:id/confirm-payment   # 결제 확인 (청구자)

POST /api/webhooks/stripe                # Stripe webhook
POST /api/webhooks/paypal                # PayPal webhook
```

### 8.3 Subscription Payment API
```
POST /api/subscriptions/:id/setup-auto-payment    # 자동결제 설정
POST /api/subscriptions/:id/cancel-auto-payment   # 자동결제 취소
POST /api/subscriptions/:id/update-payment-method # 결제수단 변경
```

## 9. 구현 우선순위

### Phase 1: Payment Settings UI ✓ (2026-01-16 완료)
- [x] System Admin 사이드바에 Settings > Payment 메뉴 추가
- [x] PaymentSettingsPage.tsx 생성
- [x] 백엔드 API 생성 (/api/admin/payment-settings)
- [x] Currency Settings를 Payment Settings로 통합
- [x] Stripe/PayPal 글로벌 + Bank/QR 통화별 UI 구조

### Phase 2: Invoice 결제 기능 ✓ (2026-02-24 완료)
- [x] Invoice 결제 모달 (각 인보이스 페이지 내장)
- [x] Bank Transfer/QR 결제 프로세스 (영수증 업로드 → 확인/거절)
- [x] Invoice 상태 업데이트 로직 (submit → confirm/reject)
- [x] 발행자별 결제방법 분기 조회 (issuerType/issuerId 기반)
- [x] 발행 시 결제방법 존재 검증 (통화별)
- [x] 통화 범위 검증 (Brand/Foodcourt ⊆ System Admin)
- [ ] 이메일 결제 링크 발송 (미구현)

### Phase 3: Stripe 연동 (미구현)
- [ ] Stripe Checkout 연동 (일회성 결제)
- [ ] Stripe Customer/PaymentMethod 저장 (구독 자동결제용)
- [ ] Stripe Webhook 처리

### Phase 4: PayPal 연동 (미구현)
- [ ] PayPal Checkout 연동
- [ ] PayPal Webhook 처리

### Phase 5: 자동 결제 (구독) (미구현)
- [ ] Subscription에 결제 정보 저장
- [ ] 갱신일 자동 결제 처리
- [ ] 실패 시 이메일 알림 및 수동 결제 유도

### Phase 6: Brand/Foodcourt 확장 ✓ (2026-02-24 완료)
- [x] Brand Payment Settings (System Admin과 동일 UI 재사용)
- [x] Foodcourt Payment Settings (System Admin과 동일 UI 재사용)
- [x] brands/foodcourts 테이블에 payment_settings JSON 필드 추가
- [x] Restaurant → Brand/Foodcourt 결제 흐름 (발행자별 결제방법 분기)
- [x] Brand/Foodcourt 구독 플랜 시스템 (entity_plans 테이블)
- [x] 자동 인보이스 생성 (cron + 수동 트리거)

> **참고**: 인보이스 시스템 전체 기술 문서는 `/var/www/docs/INVOICE_SYSTEM.md` 참조

## 10. 보안 고려사항

1. **API 키 암호화**: Secret Key는 DB에 암호화하여 저장
2. **마스킹 처리**: API 응답에서 Secret Key는 마스킹 (••••last4)
3. **Webhook 검증**: Stripe/PayPal webhook signature 검증 필수
4. **결제 링크 토큰**: 시간제한 + 일회용 토큰 사용
5. **PCI DSS**: 카드 정보는 Stripe/PayPal에서만 처리 (서버에 저장 안 함)
