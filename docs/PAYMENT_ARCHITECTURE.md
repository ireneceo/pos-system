# Payment Architecture (v3.24+)

## 1. 도메인

```
issuer (결제 받는 자)        자격증명 위치              발행 invoice
─────────────────────────────────────────────────────────────
System Admin (SA)            SystemSettings(payment_settings)   POS 구독료
Brand General (BG)           Brand.payment_settings             가맹료, 식자재
Foodcourt General (FG)       Foodcourt.payment_settings         임대료, 공용비, 자체 프로덕트
Supplier (SUP)               SupplierCompany.payment_settings   식자재 거래

payer (지불자)
─────────────────────────────────────────────
Restaurant Admin / Brand / Foodcourt — invoice 받는 측
```

## 2. 게이트웨이 — 표준

| 영역 | Stripe | PayPal |
|------|--------|--------|
| 구독 결제 | **Subscriptions API** + Checkout `mode=subscription` | **Subscriptions API** (Plans + Subscriptions) |
| 일반 결제 | **Checkout** `mode=payment` | **Orders API** + Smart Buttons |
| 사용자 셀프서비스 | **Customer Portal** (무료) | 구독 상세 link |
| 카드 자동 갱신 | **Card Account Updater** (자동) | Vault 자동 |
| 실패 retry | **Smart Retries** (자동) | (PurpleHere 보조 처리) |
| 실패 dunning | **Dunning email** (자동) | (PurpleHere 이메일) |
| 3DS / SCA | 자동 | 자동 |

PurpleHere 가 짜는 것: webhook 핸들러 + invoice/subscription 상태 mirror.

## 3. 신규 모델

### PaymentCustomer (issuer × payer × gateway 매핑)
```
id PK
gateway ENUM('stripe','paypal') NOT NULL
issuer_type ENUM('system','brand','foodcourt','supplier') NOT NULL
issuer_id INT NULL (system 은 NULL)
payer_type ENUM('restaurant','brand','foodcourt') NOT NULL
payer_id INT NOT NULL
gateway_customer_id VARCHAR(60) NOT NULL  -- Stripe cus_xxx / PayPal payer_id
created_at, updated_at
UNIQUE(gateway, issuer_type, issuer_id, payer_type, payer_id)
INDEX(gateway_customer_id)
```

### Subscription (구독 1개 = 1 row, gateway 가 진실의 원천)
```
id PK
gateway ENUM('stripe','paypal') NOT NULL
issuer_type, issuer_id (위와 동일)
payer_type, payer_id
plan_id INT NULL (Plan FK, optional)
gateway_subscription_id VARCHAR(60) NOT NULL
gateway_customer_id VARCHAR(60) NOT NULL
status ENUM('incomplete','active','past_due','canceled','paused','trialing') NOT NULL
current_period_start, current_period_end DATETIME
cancel_at_period_end BOOLEAN DEFAULT false
canceled_at DATETIME NULL
metadata JSON
created_at, updated_at
UNIQUE(gateway, gateway_subscription_id)
INDEX(payer_type, payer_id, status)
```

### WebhookEvent (idempotency + audit)
```
id PK
gateway ENUM('stripe','paypal') NOT NULL
event_id VARCHAR(80) NOT NULL  -- Stripe evt_xxx / PayPal id
event_type VARCHAR(80) NOT NULL
payload_hash VARCHAR(64) NOT NULL
payload JSON NOT NULL
status ENUM('received','processed','failed') NOT NULL
error TEXT NULL
processed_at DATETIME NULL
received_at DATETIME NOT NULL
UNIQUE(gateway, event_id)
INDEX(event_type, status)
```

### Invoice 확장 (기존 모델에 컬럼 추가)
```
gateway ENUM('stripe','paypal') NULL
gateway_session_id VARCHAR(60) NULL  -- Checkout session / PayPal order id
gateway_payment_id VARCHAR(60) NULL  -- pi_xxx / capture id
subscription_id INT NULL  -- Subscription FK (구독 invoice 일 경우)
INDEX(gateway, gateway_session_id)
```

### 폐기 (Phase 1-3 의 잔재)
다음 컬럼은 사용하지 않음 (이전에 추가됐음, 정리):
- Restaurant/Brand/Foodcourt: `stripe_customer_id`, `stripe_default_payment_method`, `auto_charge_enabled`, `auto_charge_consent_at`

→ PaymentCustomer 모델로 일반화. 마이그레이션 시 데이터 이전.

## 4. API

```
POST /api/payments/checkout/start
  body: {
    gateway: 'stripe' | 'paypal',
    mode: 'subscription' | 'payment',
    issuer_type, issuer_id,           // 누가 받는가
    payer_type, payer_id,              // 누가 내는가
    invoice_id?: number,               // mode=payment
    plan_id?: number,                  // mode=subscription
    success_url, cancel_url
  }
  response: { url: string }            // 사용자가 redirect 할 URL

POST /api/payments/portal/start        // Stripe Customer Portal
  body: { issuer_type, issuer_id, payer_type, payer_id, return_url }
  response: { url: string }

GET /api/payments/subscriptions
  query: { payer_type, payer_id }
  response: { subscriptions: [...] }

POST /api/payments/subscriptions/:id/cancel
  body: { at_period_end: true }
  response: { subscription: {...} }

POST /api/webhooks/stripe              // signature 검증
POST /api/webhooks/paypal              // signature 검증
```

## 5. Webhook 8 + 핵심 처리

### Stripe (4)
- `checkout.session.completed` → Invoice / Subscription 매핑 갱신
- `customer.subscription.created/updated/deleted` → Subscription.status mirror
- `invoice.paid` → Invoice.status='paid' + gateway_payment_id
- `invoice.payment_failed` → Invoice.status='payment_failed' + 사용자 이메일 (Stripe 가 자체 dunning 도 보내지만 우리도 in-app 알림)

### PayPal (4)
- `BILLING.SUBSCRIPTION.ACTIVATED` → Subscription.status='active'
- `BILLING.SUBSCRIPTION.UPDATED` → mirror
- `PAYMENT.SALE.COMPLETED` (구독) / `CHECKOUT.ORDER.APPROVED` (일회성) → Invoice paid
- `BILLING.SUBSCRIPTION.PAYMENT.FAILED` → 알림

모든 webhook: signature 검증 → WebhookEvent.create (UNIQUE event_id 로 dedupe) → 처리 → status='processed'.

## 6. UI

### PayInvoiceModal (재사용)
- Invoice 페이지 "Pay now" → 모달
- 활성화된 게이트웨이만 노출 (issuer 의 payment_settings 기반)
- "Pay with Stripe" / "Pay with PayPal" → POST /checkout/start → redirect

### SubscriptionPanel (재사용, 4 결제자 역할 mount)
- 현재 plan name + status badge + 다음 결제일 + 결제수단 표시 (브랜드/마지막4자리)
- "Manage" → POST /portal/start → Stripe Customer Portal redirect
- "Cancel" → POST /subscriptions/:id/cancel { at_period_end: true }
- 결제 실패 표시 + 재시도 버튼 (Stripe Smart Retries 가 자동 진행 중임을 안내)

## 7. 4 issuer PaymentSettings 정합화

각 PaymentSettings 페이지 (SA / Brand / Foodcourt / Supplier) 에 동일 구조:
```
payment_settings = {
  stripe: { enabled, mode, publishableKey, secretKey, webhookSecret, webhookId? },
  paypal: { enabled, mode, clientId, clientSecret, webhookId },
  bankTransfer: {...},
  qrPayment: {...}
}
```

자격증명 검증 핸들러:
- Stripe: `stripe.customers.list({ limit: 1 })` ping
- PayPal: OAuth token 발급 ping

## 8. 마이그레이션 순서

1. PaymentCustomer / Subscription / WebhookEvent 모델 + 테이블
2. Invoice 컬럼 추가 (gateway, gateway_session_id, gateway_payment_id, subscription_id)
3. 폐기 컬럼 제거 — Restaurant/Brand/Foodcourt 의 stripe_customer_id 등 4건
4. 기존 invoice 의 payment_intent_id → gateway_payment_id 로 백필 (있다면)
