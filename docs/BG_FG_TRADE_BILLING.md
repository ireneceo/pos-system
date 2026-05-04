# BG/FG → Restaurant Trade Billing System

> 2026-05-04 — Sprint 4 후속. Supplier SOA 패턴(SupplierContract.payment_terms)을 BG/FG seller에 동급 확장하여 Brand General이 자기 가맹점에, Foodcourt General이 자기 입점매장에 monthly SOA로 청구할 수 있게 한다.

**관련 문서**: [SUPPLIER_CONTRACT_SYSTEM.md](./SUPPLIER_CONTRACT_SYSTEM.md) · [INVOICE_SYSTEM.md](./INVOICE_SYSTEM.md) · [BILLING_SYSTEM_INTEGRATION_PLAN.md](./BILLING_SYSTEM_INTEGRATION_PLAN.md)

---

## 1. 기능 정의

### 배경
- `PurchaseOrder.seller_type` ENUM은 이미 `system_admin / brand / foodcourt / supplier` 4종 동등 지원
- `services/purchaseOrderService.js` 가 PO receive 시 trade invoice를 자동 발행하지만, 결제조건 lookup은 `seller_type === 'supplier'` 분기에서 `SupplierContract.payment_terms` 만 본다 — brand/foodcourt seller는 항상 default `NET_15 immediate`
- `services/soaScheduler.js` 의 monthly SOA cron 역시 `SupplierContract` 만 처리
- `routes/notification-settings.js` 의 `monthly_soa` 카테고리는 BG/FG 역할이 등록되어 있어 동급 처리 의도가 있었으나 미구현

### 목표
1. BG가 자기 산하 RA(가맹점) 별, FG가 자기 산하 RA(입점매장) 별로 결제조건(`immediate` vs `monthly_soa` + `payment_due_day`) 설정
2. PO → trade invoice 발행 시 BG/FG seller도 결제조건 적용 (due_date 계산)
3. SOA cron이 BG/FG terms도 처리하여 SOA invoice 자동 발행 + 알림
4. RA Trade Invoices 페이지에 supplier/brand/foodcourt SOA bundle 모두 표시
5. BG/FG 자체 Trade Invoices 페이지 (Supplier 패턴 100% 복제)

### 핵심 사용자 / 역할

| 역할 | 행위 |
|------|------|
| Brand General / Brand Manager | 자기 brand 산하 RA별 결제조건 설정, SOA bundle 조회, SOA reminder 발송 |
| Foodcourt General / Foodcourt Manager | 자기 foodcourt 입점 RA별 결제조건 설정, SOA bundle, reminder |
| Restaurant Admin / Owner | BG/FG가 설정한 결제조건 read-only 확인, SOA bundle 결제 |
| System Admin | 전체 모니터링 (감사) |

### 비범위 (Non-goals)
| 항목 | 이유 |
|------|------|
| BG/FG ↔ RA 간 contract 승인/거절 머신 | RA의 `brand_id`/`foodcourt_id`가 자동 관계. SupplierContract 같은 status 머신 없음. |
| Credit limit 강제 차단 (PO 거절) | v1은 표시만. 강제 차단은 별도 Phase. |
| Restaurant ↔ Restaurant 간 SOA | seller_type ENUM에 restaurant 없음. |
| 결제조건 변경 history (audit log) | v1은 단일 row update + ActivityLog 표준 호출만. |
| 다중 통화 환산 | 단일 currency per terms. |

### Edge cases
| 케이스 | 처리 |
|--------|------|
| BG가 RA 결제조건 미설정 | `null` → default `immediate` (기존 동작 유지) |
| 결제조건 monthly → immediate 변경 | 진행 중 cycle 기존 invoice 그대로. 신규 PO부터 새 조건. |
| RA가 brand_id + foodcourt_id 동시 보유 | 두 개의 평행 SOA bundle 별개 표시. |
| BG owner가 여러 brand 소유 | brand 별 독립 (Restaurant.brand_id 가 결정자) |
| RA suspended 상태 | 기존 suspended invoice-pin 패턴 적용. 미결 SOA만 결제하면 자동 복귀. |
| BG가 RA의 brand_id를 변경 | 새 brand의 결제조건 적용. 이전 brand가 발행한 미결 invoice는 RA가 계속 결제 책임 (issuer_id 변경 X). |

---

## 2. API 설계

### 2.1 결제조건 CRUD

#### `PUT /api/brand/restaurants/:restaurantId/billing-terms`
- **인증**: `authenticateToken` + `requireBrandScope` (자기 brand 산하 매장만)
- **Body**:
  ```json
  {
    "payment_terms": {
      "terms": "NET_30",
      "invoice_cycle": "monthly_soa",
      "payment_due_day": 15,
      "credit_limit": 5000.00,
      "currency": "MYR",
      "notes": "..."
    }
  }
  ```
  `null` 전달 시 컬럼 NULL로 설정 (default immediate)
- **응답**: `{ success: true, data: { restaurant_id, brand_billing_terms } }`
- **에러**: 403 (남의 brand 매장), 404 (매장 없음), 400 (validation)

#### `PUT /api/foodcourt/restaurants/:restaurantId/billing-terms`
- 동일 구조. `requireFoodcourtScope` (foodcourt_id 검증)
- 컬럼: `foodcourt_billing_terms`

#### 라우트 파일 신규: `routes/entity-billing.js`
- BG/FG 양쪽 endpoint를 한 파일에 모아 공통 검증 헬퍼 공유
- mount: `app.use('/api', entityBillingRouter)`

### 2.2 SOA Bundle 조회 (seller 측)

#### `GET /api/brand/soa/current`
- **인증**: `authenticateToken` + `requireBrandScope`
- **로직**: 자기 brand가 발행한 unpaid trade invoice를 RA별로 grouping. `Restaurant.brand_billing_terms.invoice_cycle === 'monthly_soa'` 인 RA만.
- **응답**: `{ success: true, data: { groups: [{ buyer, payment_terms, invoices, subtotal, total, count, currency }] } }`

#### `POST /api/brand/soa/:restaurantId/remind`
- **인증**: `authenticateToken` + `requireBrandScope`
- **로직**: 해당 RA의 unpaid trade invoice 합계 reminder 메일 발송. `monthly_soa` 카테고리 사용.

#### `GET /api/foodcourt/soa/current`, `POST /api/foodcourt/soa/:restaurantId/remind`
- 동일 패턴, foodcourt_id 검증.

### 2.3 RA 측 SOA Bundle 조회 — 기존 endpoint 확장

#### `GET /api/purchase-invoices/soa/current` (수정)
- 기존: `issuer_type: 'supplier'` 만 조회 → SupplierContract.payment_terms 로 monthly_soa 필터
- 변경: `issuer_type: ['supplier', 'brand', 'foodcourt']` 모두 조회
  - supplier 그룹: 기존 SupplierContract 로직
  - brand 그룹: `Restaurant.brand_billing_terms` (해당 RA의) 로 monthly_soa 확인
  - foodcourt 그룹: `Restaurant.foodcourt_billing_terms` 로 동일
- 응답 그룹에 `seller_type: 'supplier'|'brand'|'foodcourt'` 추가

### 2.4 보안 체크리스트
- [x] 모든 PUT/POST: `authenticateToken` + scope 미들웨어
- [x] 매장 소유권: `Restaurant.findOne({ where: { id, brand_id IN ownedBrandIds } })` 패턴 (cross-brand 차단)
- [x] payment_terms validation: `validatePaymentTerms()` 공통 헬퍼 (supplier.js의 `VALID_INVOICE_CYCLES`/`validatePaymentTermsBody` 추출 → `utils/paymentTerms.js`)
- [x] `restaurant_id` 신뢰 금지 → 항상 brand_id/foodcourt_id 매칭 검증
- [x] IDOR: cross-brand RA 접근 시 404 (정보 누출 차단)

---

## 3. DB 설계

### 3.1 Restaurant 모델 — 컬럼 2개 추가
```javascript
// models/Restaurant.js
brand_billing_terms: {
  type: DataTypes.JSON,
  allowNull: true,
  defaultValue: null,
  comment: 'Brand → Restaurant trade billing terms. NULL = immediate (default).'
  // Schema: { terms, invoice_cycle, payment_due_day, credit_limit, currency, notes }
},
foodcourt_billing_terms: {
  type: DataTypes.JSON,
  allowNull: true,
  defaultValue: null,
  comment: 'Foodcourt → Restaurant trade billing terms. NULL = immediate.'
}
```

### 3.2 신규 모델 — 없음
- 1:1 관계 (Restaurant 1개 ↔ Brand 1개 / Foodcourt 1개)이므로 별도 테이블 불필요
- payment_terms JSON schema는 SupplierContract.payment_terms와 100% 동일

### 3.3 마이그레이션
- `sync-database.js` 실행 → ALTER TABLE 자동 (Sequelize alter mode)
- 기존 row는 NULL로 시작 → 기존 동작(immediate) 유지

### 3.4 인덱스
- 필요 없음. 쿼리 패턴: `Restaurant.findByPk(id)` 직접 조회 또는 `Restaurant.findAll({ where: { brand_id IN ownedIds } })`. `brand_id` 인덱스 이미 존재.

---

## 4. UI 흐름

### 4.1 BG/FG 사이드바 신규 메뉴

#### Brand General
```
── Plans & Payments ──
└── Trade Invoices  (/pos/brand/trade-invoices)   ← 신규
```

#### Foodcourt General
```
── Plans & Payments ──
└── Trade Invoices  (/pos/foodcourt/trade-invoices)   ← 신규
```

### 4.2 결제조건 설정 위치 — `Restaurants` 메뉴 안

기존 `/pos/manager/restaurants` 페이지(`pages/Manager/RestaurantsPage.tsx`)가 BG/FG 모두 사용 중.
이 페이지의 매장 list에 **"Billing"** 컬럼 + Action 버튼 추가:

| Restaurant | Status | Subscription | **Billing** | Actions |
|---|---|---|---|---|
| 매장 A | Active | Premium | SOA · day 15 | [Edit] |
| 매장 B | Active | Basic | Immediate | [Edit] |

[Edit] 클릭 → `<BillingTermsModal>` 공용 컴포넌트 → 저장 → list refresh

### 4.3 BG/FG TradeInvoicesPage (신규 2 페이지)

| 페이지 | 경로 | 패턴 |
|---|---|---|
| `pages/BrandGeneral/BrandTradeInvoicesPage.tsx` | `/pos/brand/trade-invoices` | `SupplierTradeInvoicesPage` 100% 복제 |
| `pages/FoodcourtGeneral/FoodcourtTradeInvoicesPage.tsx` | `/pos/foodcourt/trade-invoices` | 동일 |

차이: API 호출 시 `issuer_type=brand` 또는 `issuer_type=foodcourt`. fetch URL `/api/invoices?invoice_category=trade&issuer_type=brand&issuer_id=mybrand`.

`mybrand`/`myfoodcourt` 토큰은 백엔드에서 user.brand_id / user.foodcourt_id로 자동 resolve (기존 `mycompany` 패턴 동일).

### 4.4 RA TradeInvoices 확장

기존 `/restaurant/:id/trade-invoices` 페이지 — fetch 변경 없음 (API가 issuer_type filter 다중 처리). 응답에서 `issuer.type === 'brand'/'foodcourt'` 인 row 가 자연스럽게 함께 노출.

SOA bundle: `/api/purchase-invoices/soa/current` 가 supplier/brand/foodcourt 3 그룹 반환. 페이지의 SoaBundleRow는 `seller_type` 에 따라 라벨/색상만 다르게 표시.

### 4.5 BillingTermsModal 공용 컴포넌트

```
components/Billing/BillingTermsModal.tsx
```
- Props: `{ open, onClose, restaurant, entityType: 'brand'|'foodcourt', currentTerms, onSaved }`
- 입력: terms (NET_15/30/60/COD), invoice_cycle (immediate/monthly_soa), payment_due_day (1-31, monthly_soa일 때만), credit_limit, currency, notes
- 저장: `PUT /api/{brand|foodcourt}/restaurants/:id/billing-terms`
- 삭제 (= NULL 설정): "Reset to default (Immediate)" 버튼

SupplierCustomersPage의 edit modal 패턴 그대로.

### 4.6 i18n
- namespace: `billing` (신규)
- 4개 언어 (en/ko/zh/ms): `billing.modal.*`, `billing.cycle.immediate`, `billing.cycle.monthly_soa`, `billing.column.title`, `billing.empty`
- nav 키: `nav.brandTradeInvoices`, `nav.foodcourtTradeInvoices`

### 4.7 영향 페이지
- `pages/Manager/RestaurantsPage.tsx` — Billing 컬럼/액션 추가 (BG/FG 둘 다 보는 페이지, role check 추가)
- `pages/Restaurant/PurchaseInvoicesPage.tsx` — SOA bundle UI에 brand/foodcourt 그룹 라벨 추가
- `MainLayout.tsx` — BG/FG `Plans & Payments` 섹션에 Trade Invoices NavItem
- `App.tsx` — lazy import + Route
- `ProtectedRoute.tsx` — 역할 가드 (Brand General/Manager / Foodcourt General/Manager)

---

## 5. 코드 구현 순서

| 순서 | 파일 | 작업 |
|------|------|------|
| 5-1 | `models/Restaurant.js` | brand_billing_terms / foodcourt_billing_terms 컬럼 추가 |
| 5-2 | `node sync-database.js` | ALTER TABLE 실행 |
| 5-3 | `utils/paymentTerms.js` (신규) | validatePaymentTerms / VALID_INVOICE_CYCLES 공통화 |
| 5-4 | `routes/entity-billing.js` (신규) | PUT /api/brand|foodcourt/restaurants/:id/billing-terms |
| 5-5 | `routes/brand-soa.js` (신규) | GET /api/brand/soa/current + POST .../remind |
| 5-6 | `routes/foodcourt-soa.js` (신규) | GET /api/foodcourt/soa/current + POST .../remind |
| 5-7 | `services/purchaseOrderService.js` | resolvePaymentTerms — brand/foodcourt 분기 추가 |
| 5-8 | `services/soaScheduler.js` | brand/foodcourt 평행 루프 추가 |
| 5-9 | `routes/purchase-invoices.js` | /soa/current — issuer_type 다중 처리 |
| 5-10 | `routes/supplier.js` | (변경 없음, 단 supplier.js의 validatePaymentTermsBody → utils 추출 후 import) |
| 5-11 | `server.js` | 신규 라우트 mount |
| 5-12 | `components/Billing/BillingTermsModal.tsx` (신규) | 공용 모달 |
| 5-13 | `pages/Manager/RestaurantsPage.tsx` | Billing 컬럼 + Edit 트리거 |
| 5-14 | `pages/BrandGeneral/BrandTradeInvoicesPage.tsx` (신규) | Supplier 패턴 복제 |
| 5-15 | `pages/FoodcourtGeneral/FoodcourtTradeInvoicesPage.tsx` (신규) | 동일 |
| 5-16 | `MainLayout.tsx` | NavItem 추가 |
| 5-17 | `App.tsx` | Route 등록 |
| 5-18 | `ProtectedRoute.tsx` | 역할 가드 |
| 5-19 | `public/locales/{en,ko,zh,ms}/billing.json` (신규) | 4개 언어 |
| 5-20 | `public/locales/{en,ko,zh,ms}/translation.json` | nav 키 추가 |
| 5-21 | `routes/notification-settings.js` | (변경 없음 — `monthly_soa` 카테고리 이미 BG/FG 포함) |

---

## 6. 테스트 시나리오

`dev-backend/test-bg-fg-billing.js` (임시 스크립트):

1. BG 로그인 → 자기 brand 산하 매장 X에 PUT billing-terms (monthly_soa, day=15)
2. GET 매장 X → brand_billing_terms 검증
3. cross-brand 매장 Y에 PUT 시도 → 404
4. RA 로그인(매장 X) → BG가 PO에 trade invoice 발행 시뮬레이션 → due_date = 다음달 15일 검증
5. RA `/api/purchase-invoices/soa/current` → brand 그룹에 매장 X invoice 포함 확인
6. BG `/api/brand/soa/current` → 매장 X 그룹 + invoices 합계 확인
7. POST `/api/brand/soa/:restaurantId/remind` → `monthly_soa` 카테고리 알림 발송 확인
8. SOA scheduler 강제 실행 (`processMonthlySoa(referenceDate)`) → SOA invoice (issuer_type=brand) 생성 + child invoices의 parent_soa_invoice_id 세팅 확인
9. RA가 SOA invoice 결제 → child invoices cascade paid 확인
10. FG 동일 흐름 반복

`scripts/health-check.js` 영구 케이스 추가:
- BG billing-terms PUT (자기 brand 매장 200, 남의 brand 매장 404)
- BG `/soa/current` 200 (admin role 외 다른 역할 401/403)
- RA `/purchase-invoices/soa/current` 응답에 `seller_type` 필드 포함

---

## 7. Rollout 체크리스트

- [ ] DB ALTER TABLE 적용 (`sync-database.js`)
- [ ] 백엔드 신규 endpoint health-check 통과
- [ ] 프론트 빌드 성공 (경고 0건)
- [ ] BG 데모 계정 + FG 데모 계정으로 UX 검증
- [ ] RA 데모 계정에서 통합 SOA bundle 표시 확인
- [ ] i18n 4개 언어 verify 통과
- [ ] CHANGELOG [Unreleased] 추가 (backstage cleanup이 아닌 기능 추가 → 다음 minor 버전 후보)

---

**End of design.**
