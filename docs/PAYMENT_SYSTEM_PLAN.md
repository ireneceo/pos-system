# 결제 시스템 설계 문서

## 1. 결제 흐름 개요

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              결제 흐름 구조                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  System Admin                                                               │
│       │                                                                     │
│       ▼                                                                     │
│  ┌─────────────┐    구독/서비스 비용 청구    ┌─────────────────────┐        │
│  │ 인보이스    │ ─────────────────────────▶ │ Brand Manager       │        │
│  │ 발행       │                            │ Foodcourt Manager   │        │
│  │            │                            │ Restaurant Manager  │        │
│  └─────────────┘                            └─────────────────────┘        │
│                                                      │                     │
│                                                      ▼                     │
│                         ┌────────────────────────────────────────┐         │
│                         │  Brand/Foodcourt Manager               │         │
│                         │       │                                │         │
│                         │       ▼                                │         │
│                         │  ┌─────────────┐   소속 레스토랑 비용   │         │
│                         │  │ 인보이스    │ ──────────────────────│─▶ Restaurant │
│                         │  │ 발행       │                        │         │
│                         │  └─────────────┘                       │         │
│                         └────────────────────────────────────────┘         │
│                                                      │                     │
│                                                      ▼                     │
│                         ┌────────────────────────────────────────┐         │
│                         │  Restaurant                            │         │
│                         │       │                                │         │
│                         │       ▼                                │         │
│                         │  ┌─────────────┐   주문 결제           │         │
│                         │  │ Mobile      │ ──────────────────────│─▶ Customer │
│                         │  │ Order       │                        │         │
│                         │  └─────────────┘                       │         │
│                         └────────────────────────────────────────┘         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 2. 역할별 결제 설정 위치

| 역할 | 결제 설정 위치 | 결제 대상 | 인보이스 메뉴 |
|------|---------------|----------|-------------|
| System Admin | Admin Settings > Payment | Brand/Foodcourt/Restaurant Managers | Invoices (발행 + 수금) |
| Brand General | Brand Settings > Payment | 소속 Restaurants | Invoices (발행 + 수금) |
| Foodcourt General | Foodcourt Settings > Payment | 소속 Restaurants | Invoices (발행 + 수금) |
| Restaurant Admin | Settings > Payment Methods | Customers (Mobile Order) | - (주문 내역에서 확인) |

## 3. 결제 수단 종류

### 3.1 온라인 결제 (자동)
- **Stripe** - 카드, 정기결제
- **PayPal** - 카드, PayPal 계정

### 3.2 수동 결제
- **Bank Transfer** - 은행 송금 (계좌 정보 표시)
- **QR Payment** - QR 코드 스캔 결제 (DuitNow, Touch'n Go 등)

### 3.3 오프라인 결제 (POS용)
- Cash
- Card (단말기)

## 4. UI 설계

### 4.1 System Admin - Payment Settings (신규)

**위치:** Admin Settings > Payment 탭 추가

```
┌─────────────────────────────────────────────────────────────────┐
│ Admin Settings                                                   │
├──────────┬──────────┬──────────┬──────────┐                     │
│ Company  │ Payment  │ ...      │          │                     │
├──────────┴──────────┴──────────┴──────────┴─────────────────────┤
│                                                                  │
│  Payment Settings                                                │
│  Configure payment methods for subscription billing              │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ▲▼  Stripe                                    [Toggle ON]  │ │
│  │     ─────────────────────────────────────────────────────  │ │
│  │     Publishable Key: [pk_live_...]                         │ │
│  │     Secret Key:      [sk_live_...]                         │ │
│  │     Webhook Secret:  [whsec_...]                           │ │
│  │     □ Enable auto-charge for subscriptions                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ▲▼  PayPal                                    [Toggle ON]  │ │
│  │     ─────────────────────────────────────────────────────  │ │
│  │     Client ID:       [...]                                 │ │
│  │     Client Secret:   [...]                                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ▲▼  Bank Transfer                             [Toggle ON]  │ │
│  │     ─────────────────────────────────────────────────────  │ │
│  │     Bank Name:       [Maybank]                             │ │
│  │     Account Number:  [1234567890]                          │ │
│  │     Account Name:    [Purple Here Sdn Bhd]                 │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ▲▼  QR Payment                                [Toggle ON]  │ │
│  │     ─────────────────────────────────────────────────────  │ │
│  │     QR Code Image:   [Upload QR Code]                      │ │
│  │     Description:     [Scan to pay via DuitNow]             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│                                            [Save Settings]       │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Invoice 결제 화면 (Manager가 결제할 때)

**접근 경로:**
- 이메일 링크 클릭
- Manager > Invoices > Pay 버튼

```
┌─────────────────────────────────────────────────────────────────┐
│ Invoice Payment                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Invoice: INV-2026010001                                        │
│  Amount:  MYR 99.00                                             │
│  Due:     2026-01-31                                            │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  Select Payment Method:                                          │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ○ Credit/Debit Card (Stripe)                               │ │
│  │   Secure payment via Stripe                                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ○ PayPal                                                   │ │
│  │   Pay with PayPal account or card                          │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ○ Bank Transfer                                            │ │
│  │   Manual transfer - upload receipt after payment           │ │
│  │   ─────────────────────────────────────────────────────    │ │
│  │   Bank: Maybank                                            │ │
│  │   Account: 1234567890                                      │ │
│  │   Name: Purple Here Sdn Bhd                                │ │
│  │   Reference: INV-2026010001                                │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ○ QR Payment                                               │ │
│  │   Scan QR code to pay                                      │ │
│  │   ─────────────────────────────────────────────────────    │ │
│  │         ┌─────────────┐                                    │ │
│  │         │   QR CODE   │                                    │ │
│  │         │    IMAGE    │                                    │ │
│  │         └─────────────┘                                    │ │
│  │   Scan to pay via DuitNow                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│                                   [Continue to Payment]          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Bank Transfer / QR Payment 후 영수증 업로드

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
│  │                                                            │ │
│  │              [Drop receipt image here]                     │ │
│  │                  or click to browse                        │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│  Transaction Reference (optional):                               │
│  [_________________________________________________]            │
│                                                                  │
│  Notes (optional):                                               │
│  [_________________________________________________]            │
│                                                                  │
│                                   [Submit for Review]            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 5. 구독 자동결제 흐름

### 5.1 첫 구독 시작
```
1. Manager가 플랜 선택 → Subscribe 클릭
2. 결제 수단 선택 화면 (Stripe/PayPal/Bank Transfer)
3-A. Stripe/PayPal 선택 → 온라인 결제 → 카드 정보 저장
3-B. Bank Transfer 선택 → 계좌 정보 표시 → 송금 후 영수증 업로드
4. 결제 확인 → 구독 활성화
```

### 5.2 자동 갱신 (Stripe만 해당)
```
1. 갱신일 도래
2. Stripe가 저장된 카드로 자동 결제 시도
3-A. 성공 → Invoice 자동 생성 (paid 상태)
3-B. 실패 → Invoice 생성 (pending) + 이메일 알림
4. 실패 시 수동 결제 유도
```

### 5.3 수동 결제 (Bank Transfer, 카드 결제 실패 시)
```
1. Invoice 발행 (pending_payment)
2. Manager에게 이메일 발송 (결제 링크 포함)
3. Manager가 결제 또는 영수증 업로드
4. Admin 확인 후 paid 처리
```

## 6. DB 스키마 변경

### 6.1 system_settings 테이블 (기존)
```sql
-- payment_settings JSON 필드에 저장
{
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
    "enabled": true,
    "bankName": "Maybank",
    "accountNumber": "1234567890",
    "accountName": "Purple Here Sdn Bhd"
  },
  "qrPayment": {
    "enabled": true,
    "qrImage": "base64...",
    "description": "Scan to pay via DuitNow"
  }
}
```

### 6.2 subscriptions 테이블 확장
```sql
ALTER TABLE subscriptions
ADD COLUMN stripe_customer_id VARCHAR(255) NULL,
ADD COLUMN stripe_subscription_id VARCHAR(255) NULL,
ADD COLUMN stripe_payment_method_id VARCHAR(255) NULL,
ADD COLUMN paypal_subscription_id VARCHAR(255) NULL;
```

### 6.3 invoices 테이블 (기존 - 추가 필드 확인)
```sql
-- 기존 필드들 활용
-- payment_method: 'stripe', 'paypal', 'bank_transfer', 'qr_payment'
-- transaction_id: 결제 트랜잭션 ID
-- receipt_url: 영수증 URL 또는 업로드된 이미지
-- payment_notes: 결제 관련 메모
```

## 7. 역할별 인보이스 메뉴 분석

| 역할 | 인보이스 발행 | 인보이스 수신 | 결제 | 결제 확인 |
|------|-------------|-------------|------|----------|
| System Admin | O (구독/서비스) | X | X | O (모든 결제) |
| Brand General | O (소속 레스토랑) | O (Admin에서) | O | O (소속 결제) |
| Foodcourt General | O (소속 레스토랑) | O (Admin에서) | O | O (소속 결제) |
| Restaurant Admin | X | O (Admin/Brand/FC) | O | X |

### 결론:
- **System Admin**: 결제 설정 + 인보이스 발행/관리 (별도 결제내역 메뉴 불필요 - Invoices에서 모두 처리)
- **Brand/Foodcourt General**: 인보이스 발행/관리 + 결제 (별도 결제내역 메뉴 불필요 - Invoices에서 처리)
- **Restaurant Admin**: 인보이스 수신 + 결제 (별도 결제내역 메뉴 불필요 - Invoices에서 처리)

## 8. 구현 우선순위

### Phase 1: System Admin Payment Settings UI
1. AdminSettingsPage에 Payment 탭 추가
2. 결제 수단 설정 UI (Stripe, PayPal, Bank Transfer, QR)
3. 설정 저장/로드 API

### Phase 2: Invoice Payment UI
1. Manager용 Invoice 결제 페이지
2. 결제 수단 선택 UI
3. Bank Transfer/QR 영수증 업로드 기능
4. Invoice 상태 업데이트

### Phase 3: Stripe 연동
1. Stripe Checkout 연동
2. Webhook 처리
3. 구독 자동결제 연동

### Phase 4: 다른 역할 확장
1. Brand General Payment Settings
2. Foodcourt General Payment Settings
3. 각 역할의 Invoice 결제 기능
