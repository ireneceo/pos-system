# Subscription Auto-Charge System

> **작성일:** 2026-05-03
> **상태:** 설계 + Phase 1 구현 진행 중
> **규모:** 대 (DB 변경 + Stripe Customer/PaymentMethod 통합 + cron + consent UI + 실패 처리)

---

## 1. 배경

PurpleHere 의 PaymentSettings 에 "Enable auto-charge for subscription renewals" 토글이 있었으나 **placeholder 상태** — backend 에 자동 결제 코드 없음. 사용자(식당)가 매월 인보이스 받을 때마다 수동 결제 (이메일 link → 카드 입력 → 결제) 해야 했음.

목표: **카드 한 번 등록 → 매월 자동 결제 → 영수증 이메일**. Stripe Subscriptions 또는 off_session PaymentIntent 사용.

---

## 2. 사용자 흐름

```
[식당 Admin]
  1. 운영 → /restaurant/{id}/billing
  2. "Save a card for auto-charge" 클릭
  3. Stripe Elements 카드 입력 (Stripe SetupIntent)
  4. "I authorize PurpleHere to charge this card monthly for my subscription" 동의 체크
  5. Save → 카드 정보 Stripe 에 저장 (PCI 안전)
  6. 이후 매월 1일 (billing day) → invoice 발행 + 자동 결제 → 카드 청구
  7. 결제 성공 시 영수증 이메일
  8. 결제 실패 시 → invoice → overdue + 알림 + 카드 갱신 요청
```

식당이 카드 변경 / auto-charge 해제 / 카드 삭제 가능.

---

## 3. DB 변경

### Restaurant 테이블 추가 컬럼

```sql
ALTER TABLE restaurants ADD COLUMN stripe_customer_id VARCHAR(60) DEFAULT NULL;
ALTER TABLE restaurants ADD COLUMN stripe_default_payment_method VARCHAR(60) DEFAULT NULL;
ALTER TABLE restaurants ADD COLUMN auto_charge_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE restaurants ADD COLUMN auto_charge_consent_at DATETIME DEFAULT NULL COMMENT 'When the user agreed to auto-charge';
CREATE INDEX idx_restaurants_stripe_customer ON restaurants(stripe_customer_id);
```

**동일 패턴 — Brand / Foodcourt** (자체 구독 청구 받는 경우):
- brands.stripe_customer_id, stripe_default_payment_method, auto_charge_enabled, auto_charge_consent_at
- foodcourts.stripe_customer_id, ...

### 신규 모델: StripePaymentMethod (선택, MVP 미포함)

지금은 default payment method 1개만 추적 (restaurants.stripe_default_payment_method 컬럼). 카드 여러 개 관리하는 경우 별도 테이블 추가.

---

## 4. API 엔드포인트

### 카드 등록 (SetupIntent)

```
POST /api/payments/setup-intent
Body: { entity_type: 'restaurant'|'brand'|'foodcourt', entity_id: number }
Response: {
  client_secret: 'seti_xxx_secret_yyy',  // Stripe Elements 가 사용
  customer_id: 'cus_xxx'                 // 신규 생성된 Stripe Customer
}
```

### 카드 저장 완료 후

```
POST /api/payments/save-payment-method
Body: { entity_type, entity_id, payment_method_id: 'pm_xxx', set_default: true, consent: true }
Response: { success: true, last4: '4242', brand: 'visa' }
```

### 저장된 카드 목록

```
GET /api/payments/saved-cards?entity_type=restaurant&entity_id=5
Response: {
  cards: [{ id: 'pm_xxx', brand: 'visa', last4: '4242', exp_month: 12, exp_year: 2030, is_default: true }],
  customer_id: 'cus_xxx',
  auto_charge_enabled: true
}
```

### 카드 삭제 / auto-charge 해제

```
DELETE /api/payments/saved-cards/:pm_id
PATCH /api/payments/auto-charge { entity_type, entity_id, enabled: false }
```

---

## 5. Auto-Charge Cron 통합

### 기존 invoiceScheduler 흐름

```
매일 02:00 UTC: createSubscriptionInvoices()
  → 활성 식당 list
  → 청구일 도달한 식당 → invoice 발행 (status: pending_payment)
  → 이메일 인보이스 발송
```

### 새 흐름 — 인보이스 발행 직후 auto-charge 시도

```
createSubscriptionInvoices() 후:
  for each invoice {
    if (restaurant.auto_charge_enabled && restaurant.stripe_default_payment_method) {
      try {
        const pi = await stripe.paymentIntents.create({
          amount: invoice.total_amount * 100,
          currency: invoice.currency,
          customer: restaurant.stripe_customer_id,
          payment_method: restaurant.stripe_default_payment_method,
          off_session: true,
          confirm: true,
          metadata: { invoice_id, invoice_number, restaurant_id }
        });
        // 성공: webhook 이 invoice 자동 paid 처리
        // 결제 영수증 이메일 발송
      } catch (err) {
        if (err.code === 'authentication_required') {
          // SCA 필요 — 사용자에게 수동 결제 요청 이메일
        } else if (err.code === 'card_declined') {
          // 거절 — 카드 갱신 요청 이메일 + invoice → overdue
        }
      }
    } else {
      // 기존 흐름 — 수동 결제 요청 이메일
    }
  }
```

**Stripe SCA (3D Secure)**:
- `off_session: true` 시 일부 카드는 SCA 인증 필요 (regulatory)
- 그 경우 `authentication_required` 에러 → 사용자에게 manual 결제 link 이메일

---

## 6. Consent UI

카드 등록 모달:
```
┌─ Save a card for auto-charge ────────────────┐
│                                                │
│  Card number  [____________________]           │
│  Expiry       [MM/YY]    CVC [___]             │
│                                                │
│  ☑ I authorize PurpleHere to charge this       │
│    card monthly for my subscription. I can    │
│    cancel auto-charge anytime in Billing      │
│    settings.                                   │
│                                                │
│  Powered by Stripe (PCI compliant)             │
│                                                │
│         [Cancel]   [Save card]                 │
└────────────────────────────────────────────────┘
```

체크박스 미체크 시 Save 버튼 disabled. consent_at = 체크 시점 timestamp 기록.

---

## 7. 실패 처리

| 결제 실패 코드 | 처리 |
|---------------|------|
| `card_declined` | invoice → overdue, 카드 갱신 요청 이메일, auto_charge_enabled 유지 |
| `expired_card` | 카드 갱신 이메일, auto_charge_enabled 유지 |
| `insufficient_funds` | invoice → overdue, 잔고 부족 알림 이메일 |
| `authentication_required` | SCA 필요 메시지 + 수동 결제 link 이메일 |
| `processing_error` | 24시간 후 retry (cron) |

3회 연속 실패 → auto_charge_enabled = false 자동 OFF + 이메일 ("Auto-charge disabled until card is updated").

---

## 8. 보안 / 컴플라이언스

- 카드 번호 / CVC 는 PurpleHere 서버에 절대 저장 안 함. Stripe Elements 가 직접 Stripe 로 전송.
- PurpleHere DB 에는 `stripe_customer_id`, `stripe_payment_method_id` 만 저장 (참조 토큰).
- 명시적 consent 필수 (PCI DSS + GDPR + 소비자보호법).
- Stripe SCA 자동 처리 (off_session 시 fallback).

---

## 9. 구현 단계

### Phase 1 (현재) — Backend 인프라
- [x] 설계 문서
- [ ] DB 마이그레이션 (restaurants 4 컬럼)
- [ ] services/stripeCustomerService.js (Customer 생성/조회/매핑)
- [ ] routes/payments.js (setup-intent / save-payment-method / saved-cards / delete)
- [ ] webhook handler 확장 (`payment_method.attached`, `customer.updated`)

### Phase 2 — Frontend Card Registration UI
- [ ] components/Payment/SaveCardModal.tsx (Stripe Elements + consent)
- [ ] pages/Restaurant/BillingPage.tsx — saved cards + auto-charge toggle
- [ ] BG/FG/Owner billing 페이지 동일 패턴

### Phase 3 — Auto-Charge Cron
- [ ] invoiceScheduler 에 auto-charge 로직 통합
- [ ] 결제 영수증 이메일 (autoChargeReceiptEmail)
- [ ] 실패 처리 (card_declined → overdue + 갱신 이메일)
- [ ] 3회 연속 실패 시 자동 OFF

### Phase 4 — UI 보강 + 테스트
- [ ] PaymentSettings 의 autoCharge toggle 의미 명확화 (issuer 측 정책)
- [ ] Stripe Test mode 자동 검증 스크립트
- [ ] Jest contract test 추가 (setup-intent / save / charge / failure)

---

## 10. 향후 (이번 영역 X)

- Stripe Subscriptions API 마이그레이션 (recurring 자동, prorate 등)
- 다중 카드 + 청구 우선순위
- 한국 정기결제 (KSPay / NICE 등)
