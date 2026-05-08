# Subscription Form Unification (v3.27)

> 2026-05-08 시작 · 4 페이지 구독 form 통일 + Discount 전 역할 적용

## 1. 배경 / 문제 정의

3 페이지(`/pos/admin/subscriptions`, `/pos/admin/managers`, `/pos/admin/staff`)와 Restaurant 추가 form 의 구독 설정 UI 가 산재되어 있고 일관성/완성도 차이 큼:

- `SubscriptionsPage` — Supplier 옵션 누락, Currency 하드코딩(MYR), Discount 0건, 7일 trial 하드코딩
- `ManagersPage` — Currency/Plan/BillingCycle 만, Discount/PaymentModel/Trial 모두 없음
- `RestaurantsPage` — 가장 완전 (9 필드) 이지만 Add 와 Edit 가 다름 (Discount 는 Edit 만)
- `User` 모델: discount_type/value/reason 컬럼 자체 없음 (Brand/FG/Owner/Supplier)

Irene 발견 결함:
1. Plan 추가해도 하단 비용 미적용 (BillingCycle 재계산 누락)
2. Trial 체크 시 RM 29 이상한 값 (7일 trial 로직 충돌)
3. BillingCycle default 가 'monthly' 로 미리 표시됨 (선택 후 표시되어야)
4. Discount 등록 시 안 보임 (Add 모드 누락)
5. User Type 이름 비일관 + Supplier 누락

## 2. 목표

1. **공통 컴포넌트** `<SubscriptionFormFields>` 1개로 4 페이지 모두 동일한 UX
2. 5 역할(restaurant/brand/foodcourt/owner/supplier) 모두 Discount 입력 가능
3. BillingCycle default 제거 — 사용자가 선택 후 금액/Summary 표시
4. Plan/Currency/BillingCycle 변경 시 금액 자동 재계산 일관
5. Discount 4 type (none/percentage/fixed) + Summary 에 할인액 표시

비목표: `/pos/admin/staff` 는 staff(점원) 관리 페이지로 구독 대상 아님 — 변경 없음

## 3. UX 설계 — 통일된 9-필드 구조

### 필드 순서 (모든 caller 동일)

| # | 필드 | 타입 | 옵션 |
|---|------|------|------|
| 1 | Currency * | Select | 6 통화 |
| 2 | Plan Type * | Select | userType filter 적용 |
| 3 | Treat as trial until subscription starts | Checkbox | (Activate now 가 false 일 때만) |
| 4 | **Subscription Settings** 섹션 헤더 | — | — |
| 5 | Activate subscription now | Toggle | true/false |
| 6 | Billing Cycle * | Select | **default 없음** (Monthly/Annual 중 선택) |
| 7 | Payment Model * | Select | restaurant / brand_manager / foodcourt_manager |
| 8 | Subscription Period (start + end auto) | DateRangeField | start 선택 시 end 자동 계산 |
| 9 | Auto-renew subscription | Checkbox | true/false |
| 10 | Subscription Discount | Section | none / percentage / fixed + value + reason |
| 11 | Summary (자동 표시) | Box | "Plan - currency amount (cycle) / Paid by: Model / Discount: -X" |

### Caller 별 옵션 매핑

| Caller | userType | hidePaymentModel | hideTrial | hideActivateNow | hideDiscount |
|---|---|---|---|---|---|
| RestaurantsPage Add | restaurant | false | false | false | false (Add 도 Discount) |
| RestaurantsPage Edit | restaurant | false | false | false | false |
| SubscriptionsPage Add/Edit | dynamic (5 종) | false | false | false | false |
| ManagersPage (BG/FG/Owner) | brand/foodcourt/owner | false | false | false | false |

### BillingCycle 빈 상태 동작

- 초기값: `''` (선택 안 됨)
- Plan 만 선택해도 금액 미표시 (BillingCycle 미선택)
- BillingCycle 선택 시:
  - planAmount 계산 (monthly_price 또는 annual_price)
  - subscriptionEnd 계산 (+ 1 month / + 1 year)
  - Summary 박스 표시

## 4. 컴포넌트 설계 — `components/Subscription/SubscriptionFormFields.tsx`

```ts
export interface SubscriptionValues {
  currency: string;
  plan_type: string;
  plan_amount: number;
  billing_cycle: '' | 'monthly' | 'annual';   // 빈 문자열 = 미선택
  payment_model: 'restaurant' | 'brand_manager' | 'foodcourt_manager';
  subscription_start: string;        // YYYY-MM-DD
  subscription_end: string;          // YYYY-MM-DD (auto)
  auto_renew: boolean;
  treat_as_trial: boolean;           // start > today 일 때 trial 처리
  activate_now: boolean;             // invoice 즉시 발행
  discount_type: 'none' | 'percentage' | 'fixed';
  discount_value: number;
  discount_reason: string;
}

export interface SubscriptionFormFieldsProps {
  userType: 'restaurant' | 'brand' | 'foodcourt' | 'owner' | 'supplier';
  mode: 'add' | 'edit';
  values: SubscriptionValues;
  onChange: (patch: Partial<SubscriptionValues>) => void;
  availablePlans: PlanTemplate[];           // 외부 fetch
  planCurrencies: string[];                 // 6 통화 (admin payment-settings 기반)
  options?: {
    hidePaymentModel?: boolean;
    hideTrial?: boolean;
    hideActivateNow?: boolean;
    hideDiscount?: boolean;
    readOnlyEndDate?: boolean;
  };
}
```

내부 로직:
- `useEffect([currency, plan_type, billing_cycle])` → planAmount 자동 재계산
- `useEffect([subscription_start, billing_cycle])` → subscription_end 자동 계산
- discount_type='none' → discount_value/reason 입력란 hidden
- billing_cycle='' → Summary 박스 hidden

## 5. Backend 변경

### 5.1 User 모델 컬럼 추가

```js
// models/User.js
discount_type: {
  type: DataTypes.ENUM('none', 'percentage', 'fixed'),
  defaultValue: 'none',
  allowNull: false
},
discount_value: {
  type: DataTypes.DECIMAL(8, 2),
  defaultValue: 0,
  allowNull: false
},
discount_reason: {
  type: DataTypes.TEXT,
  allowNull: true
}
```

마이그레이션: `sync-database.js` 자동 동기화 (기본값 0/none).

### 5.2 routes/users.js

POST/PUT 핸들러에서 `discount_type, discount_value, discount_reason` 도 받도록 (이미 plan_type/plan_amount 처리하는 곳에 같이).

## 6. 작업 순서

1. 설계 문서 (이 파일) ✓
2. Backend: User 모델 + sync + routes/users.js
3. Frontend: `SubscriptionFormFields` 컴포넌트 신규
4. RestaurantsPage Add/Edit — 컴포넌트로 교체
5. SubscriptionsPage Add/Edit — 컴포넌트로 교체 + UserType 5 옵션 + Currency 추가
6. ManagersPage — 컴포넌트로 교체 (BG/FG/Owner 분기)
7. i18n 4언어 신규 namespace `subscription.json`
8. 검증 (10단계)

## 7. 검증 시나리오

| # | 시나리오 | 기대 |
|---|----------|------|
| 1 | API: User PUT 으로 discount_value=10, type=percentage | DB 저장 + GET 재조회 시 일치 |
| 2 | UI: Plan 선택 후 BillingCycle 선택 안 함 | Summary 박스 hidden, 금액 미표시 |
| 3 | UI: BillingCycle 'annual' 선택 | planAmount × 12, subscription_end +1년 |
| 4 | UI: Trial 체크 + start_date 미래 | status=trial, end_date 자동 계산 |
| 5 | UI: discount_type='percentage', value=20 | Summary 에 "Discount: -20%" 표시, 최종 금액 = base × 0.8 |
| 6 | UI: SubscriptionsPage UserType 옵션 | 5 종 모두 (restaurant/brand/foodcourt/owner/supplier) |
| 7 | UI: 동일 컴포넌트가 4 페이지에서 동일 동작 | 중복 코드 0건 (DRY 검증) |
| 8 | health-check 73/73 | 전건 PASS |

## 8. 영향받는 파일

**Backend (3)**
- `models/User.js` — discount 3 컬럼
- `routes/users.js` — POST/PUT discount 처리
- `sync-database.js` 자동

**Frontend 신규 (1)**
- `components/Subscription/SubscriptionFormFields.tsx`

**Frontend 수정 (3 + 1)**
- `pages/Admin/RestaurantsPage.tsx` — Add/Edit form 교체
- `pages/Admin/SubscriptionsPage.tsx` — Add/Edit form 교체
- `pages/Admin/ManagersPage.tsx` — BG/FG/Owner form 교체

**i18n (4)**
- `public/locales/{en,ko,ms,zh}/subscription.json` (신규)
- `i18n.ts` ns 등록
