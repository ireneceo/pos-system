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
POST /api/webhooks/stripe/:issuer_type/:issuer_id   // 2026-10-11 — 브랜드·푸드코트·공급업체 자기 Stripe 계정 웹훅(그 발행자 비밀로 검증)
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

## 9. 2026-10-11 청구서 결제 가드 단일화

> Irene «스트라이프 구독결제도 이상없는 거지?» → 실측(`backups/fable-pending/stripe-subscription-audit-20261011.md`) → Fable 설계(`backups/fable-pending/fable-verdict-20261011-stripe-invoice-payment-design.md`).

고친 결함 (운영 SW 5.90 기준 그대로 있던 것):
- **연체(overdue) 청구서는 카드로도 이체 제출로도 낼 수 없었다** — 결제 라우트마다 `pending_payment|rejected` 를 따로 적었고(`rejected` 는 ENUM 에 없는 죽은 값) `overdue` 가 빠져 있었다. 정지 매장이 스스로 복구할 길이 없었다.
- **매장 관리자 화면 «Stripe 결제» 는 2026-05-03 생긴 날부터 늘 400** — 화면이 청구서 목록에 없는 칸(`restaurant_id`·`brand_id`)으로 당사자를 추정했다.
- **브랜드·푸드코트·공급업체 Stripe 웹훅은 서명 실패** — 서버가 system 비밀로만 검증했다(돈은 그 계정에서 빠지고 청구서는 미결제).
- 웹훅이 `checkout.session.completed` 의 `payment_status` 를 안 봤고, 취소·초안 청구서도 paid 로 바꿀 수 있었다.

규칙은 두 곳에만 산다:
| 규칙 | 위치 | 쓰는 곳 |
|---|---|---|
| 결제 시작 가능 판정 `PAYABLE_STATUSES = ['pending_payment','overdue']` · `gatewayPayableError`(404→403→409 paid→400 BAD_STATUS→400 외부 공급업체→400 pay_via_soa→400 0원) · `resolvePayerParty` | `dev-backend/utils/invoicePayable.js` | create-payment-intent · create-paypal-order · `POST /payments/checkout/start`(payment) · submit-payment(상태 목록만) |
| 게이트웨이 입금 → paid `markInvoicePaidFromGateway` · `GATEWAY_PAID_FROM = pending_payment·overdue·payment_submitted` · 발행자 일치(`utils/issuerAccount.js#sameIssuerAccount`, 브랜드·푸드코트는 같은 owner = 같은 계정) · 금액 대조 | `dev-backend/services/invoiceLifecycle.js` | Stripe `checkout.session.completed`(payment_status 'paid' 일 때만) · `checkout.session.async_payment_succeeded` · `payment_intent.succeeded` · PayPal capture |

- `POST /payments/checkout/start` payment 모드는 화면이 보낸 issuer/payer 를 **무시**하고 청구서에서 꺼낸다. `invoice_id` 는 글자여도 양의 정수면 받는다.
- 웹훅 주소: `/api/webhooks/stripe`(우리 회사) · `/api/webhooks/stripe/<brand|foodcourt|supplier>/<id>`(그 발행자). 결제 설정 화면 안내문이 발행자별 주소를 보여 준다. 서명이 맞아도 발행자가 다르면 `Held: webhook issuer … ≠ invoice issuer …` 로 남기고 상태 무변경.
- 안 고친 것: 결제창을 열 때마다 새 PaymentIntent(시험 키 없이 증명 불가) · PayPal 웹훅 발행자별 검증(운영 미사용) · 정기구독(Subscriptions API) 경로(운영 0행).
- 검사: `health-check --category=payment` «청구서 결제 ①~⑤» · jest `tests/payment-flow.test.js` · 고장주입 5건(2026-10-11, 각각 해당 검사 실패 확인 후 원복).
- 개발서버엔 진짜 Stripe 시험 키가 없어 «Stripe 로 넘어가 카드 치고 웹훅이 돌아와 paid» 끝까지는 아직 실측 못 했다.

