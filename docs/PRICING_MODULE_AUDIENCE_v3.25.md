# PRICING_MODULE_AUDIENCE_v3.25

**작성일:** 2026-05-05
**상태:** 설계 단계 (Irene 승인 대기)
**범위:** Pricing 페이지 모듈 정합성 + 역할별 매입/판매 매트릭스 + Features 캡처 누락 보강
**규모:** 대 (DB seed + 다수 파일 + 50+ 캡처)

---

## 1. 문제 진단

### 1.1 PricingPage 모듈 순서 깨짐
`addon_modules.sort_order = 0` 인 모듈이 19개 — Supply Chain 시리즈와 함께 추가됐지만 sort_order 안 매김 → 정렬상 모든 그룹 맨 앞으로 몰림 (Basic 그룹 상단에 buyer_*/supplier_* 가 잡힘).

### 1.2 buyer_* 4개 카테고리 잘못
`buyer_supplier_directory / buyer_supplier_contracts / buyer_purchase_orders / buyer_purchase_invoices` 모두 `category='basic'` — Irene 지적: 매입 워크플로우는 인벤토리/SOA 같은 **Advanced** 그룹.

### 1.3 역할별 매입/판매 매핑 잘못

| 역할 | 매입 (buyer side) | 공급/판매 (seller side) | 현재 상태 |
|---|---|---|---|
| Restaurant | ✓ buyer_* 4 | ✗ | buyer_*.target='all' 로 노출됨 (OK) |
| Brand General | ✓ buyer_* 4 | ✓ brand 측 trade | buyer_*='all' 노출됨 (OK) |
| Foodcourt General | ✓ buyer_* 4 | ✓ fc 측 trade | buyer_*='all' 노출됨 (OK) |
| Supplier Admin | ✓ buyer_* 4 (현재 누락) | ✓ supplier_* 13 | **buyer_* 미노출 — 결함** |
| Restaurant Owner | ✗ (매입 안 함) | ✗ | buyer_*='all' 잘못 노출됨 — **결함** |

→ `target_user_type='all'` 이 너무 광범 (Owner 까지 포함) + Supplier 누락 동시.

### 1.4 Features 페이지 빈 캡처 슬롯 (~50)
- `brand_admin_staff` / `fc_admin_staff` — admin 0건이라 빈 페이지
- `owner_*` 10 슬롯 — Owner 계정에 restaurant 0건
- `supplier_*` 35+ 슬롯 — supplier_admin 에 product 0건
- 이 슬롯들이 placeholder 상태 → Irene 지적 "기능에 다 있어야 해" → 데이터 시드 후 캡처 필수.

---

## 2. 사이드바 메뉴 순서 (sort_order 부여 기준)

### 2.1 Restaurant Sidebar (line 1789~)
```
dashboard → live-orders → operations(pos/floor/kitchen/display)
→ menu → ingredients → invoices → reports
→ inventory → suppliers (매입)
→ customers/membership/coupons
→ notices/work-manuals/support/operation-inquiry
→ plans/subscriptions/payment-settings
```

### 2.2 Brand General Sidebar (line 1157~)
```
dashboard → incoming-orders(live PO) → franchise/franchise-map
→ management → manager → brand-products/recipes/product-recipes/ingredients
→ /pos/suppliers (매입 디렉토리) → /pos/suppliers/contracts (매입 계약)
→ brand-inventory
→ invoices → trade-invoices
→ reports → performance
→ notices/work-manuals/system-inquiry/operation-inquiry
→ plans/subscriptions/payment-settings
```

### 2.3 Foodcourt General Sidebar (line 1406~)
```
dashboard → incoming-orders → tenancy/tenancy-map/floor-plan
→ branches → manager → products → inventory
→ /pos/suppliers/contracts (매입)
→ invoices → trade-invoices
→ reports
→ notices/work-manuals/system-inquiry/operation-inquiry
→ plans/subscriptions/payment-settings
```

### 2.4 Supplier Sidebar (line 1725~)
```
dashboard → orders → products → inventory → customers → staff
→ contracts → trade-invoices → invoices
→ /pos/suppliers/contracts (매입 — 다른 supplier에서 사들임, line 1987)
→ notices → system-inquiry
→ company-info → payment-settings → invoice-settings
```

---

## 3. AddonModule sort_order 재부여 매트릭스

**원칙:** 사이드바 메뉴 순서 = AddonModule sort_order. 베이직과 고급 그룹 분리는 `category` 컬럼으로 처리 (PricingPage 가 그룹별로 묶음).

### 3.1 Restaurant 모듈 (target='all' / 'restaurant')
| sort | module_code | category | 사이드바 위치 |
|---|---|---|---|
| 10 | dashboard | basic | dashboard |
| 20 | live_orders | basic | live-orders |
| 30 | pos_terminal | basic | pos-terminal |
| 40 | kitchen_display | basic | kitchen |
| 50 | customer_display | basic | display |
| 60 | invoice_billing | basic | invoices |
| 70 | reports | basic | reports |
| 80 | menu_management | basic | menu |
| 90 | recipe_management | advanced | menu(recipe) |
| 100 | ingredients | advanced | ingredients |
| 110 | inventory_management | advanced | inventory |
| 120 | advanced_inventory | advanced | inventory(고급) |
| 130 | suppliers | advanced | suppliers (Restaurant 내장) |
| **140** | **buyer_supplier_directory** | **advanced** | **/pos/suppliers (공통)** |
| **150** | **buyer_supplier_contracts** | **advanced** | **/pos/suppliers/contracts** |
| **160** | **buyer_purchase_orders** | **advanced** | **(매입 PO)** |
| **170** | **buyer_purchase_invoices** | **advanced** | **(매입 invoice)** |
| 180 | staff_management | basic | staff |
| 190 | customer_crm | basic | customers |
| 200 | coupons | basic | coupons |
| 210 | membership | basic | membership |
| 220 | notices | basic | notices |
| 230 | work_manuals | advanced | work-manuals |
| 240 | system_inquiry | advanced | system-inquiry |
| 250 | operation_inquiry | advanced | operation-inquiry |

### 3.2 Brand General 모듈 (target='brand')
| sort | module_code | category |
|---|---|---|
| 10 | brand_dashboard | basic |
| 20 | brand_franchise | basic |
| 30 | brand_management | basic |
| 40 | brand_restaurant_mgmt | basic |
| 50 | brand_admin_staff | basic |
| 60 | brand_manager_mgmt | basic |
| 70 | brand_products | advanced |
| 80 | brand_recipes | advanced |
| 90 | brand_product_recipes | advanced |
| 100 | brand_ingredients | advanced |
| 110 | brand_suppliers | advanced |
| 120 | brand_inventory | advanced |
| 130 | brand_invoices | basic |
| 140 | brand_reports | basic |
| 150 | brand_performance | advanced |
| 160 | brand_notices | basic |
| 170 | brand_work_manuals | advanced |
| 180 | brand_system_inquiry | advanced |
| 190 | brand_operation_inquiry | advanced |
| 200 | brand_plans | advanced |
| 210 | brand_subscriptions | advanced |
| 220 | brand_payment_settings | basic |
| **(공통 buyer_* 4 × 위 매트릭스 활용)** | | |

### 3.3 Foodcourt General 모듈 (target='foodcourt')
| sort | module_code | category |
|---|---|---|
| 10 | fc_dashboard | basic |
| 20 | fc_tenancy | basic |
| 30 | fc_management | basic |
| 40 | fc_branches | basic |
| 50 | fc_floor_plan | advanced |
| 60 | fc_restaurant_mgmt | basic |
| 70 | fc_admin_staff | basic |
| 80 | fc_manager_mgmt | basic |
| **90** | **fc_products** | **advanced** |
| **100** | **fc_inventory** | **advanced** |
| 110 | fc_customers | advanced |
| 120 | fc_coupons | advanced |
| 130 | fc_invoices | basic |
| 140 | fc_work_manuals | advanced |
| 150 | fc_system_inquiry | advanced |
| 160 | fc_operation_inquiry | advanced |
| 170 | fc_plans | advanced |
| 180 | fc_subscriptions | advanced |
| 190 | fc_payment_settings | basic |
| 200 | fc_activity_logs | advanced |
| 210 | fc_stats | advanced |
| 220 | fc_notices | basic |

### 3.4 Supplier 모듈 (target='supplier')
| sort | module_code | category |
|---|---|---|
| 10 | supplier_directory | basic |
| 20 | supplier_orders | basic |
| 30 | supplier_products | basic |
| 40 | supplier_inventory | basic |
| 50 | supplier_customers | basic |
| 60 | supplier_admin_staff | advanced |
| 70 | supplier_contracts | basic |
| 80 | supplier_trade_invoices | basic |
| 90 | supplier_soa | basic |
| 100 | supplier_shipping | basic |
| 110 | supplier_multi_warehouse | advanced |
| 120 | supplier_performance | advanced |
| 130 | supplier_activity_logs | advanced |
| **(공통 buyer_* 4 추가 매핑 필요 — Step 2 참조)** | | |

### 3.5 Owner 모듈 (target='owner') — 변경 없음, buyer_* 노출만 차단
| sort | module_code | category |
|---|---|---|
| 10 | owner_dashboard | basic |
| 20 | owner_restaurants | basic |
| 30 | owner_invoices | basic |
| 40 | owner_performance | advanced |
| 50 | owner_reports | advanced |
| 60 | owner_notices | basic |
| 70 | owner_work_manuals | advanced |
| 80 | owner_system_inquiry | advanced |
| 90 | owner_operation_inquiry | advanced |
| 100 | owner_activity_logs | advanced |

---

## 4. buyer_* target_user_type 변경

**현재:** `target_user_type='all'` → 모든 plan_target 노출 (Owner 잘못 포함)

**변경 후:** `target_user_type='all'` → `target_user_type='restaurant_brand_foodcourt_supplier'` (4-role 합성값)

PricingPage line 896 변경:
```typescript
// 기존
m.target_user_type === plan.plan_target || m.target_user_type === 'all'

// 변경 후
m.target_user_type === plan.plan_target
  || m.target_user_type === 'all'
  || m.target_user_type.split('_').includes(plan.plan_target)  // 합성값 처리
```

→ Owner plan에서는 buyer_* 노출 안 됨. Supplier plan 에서는 buyer_* 정상 노출.

(대안: 새 join 테이블 만들기는 과도. 합성값 컬럼 변경이 1줄 수정.)

---

## 5. 작업 단계 (정석 순서)

### Step 1 — DB 마이그레이션: AddonModule sort_order + category 정합화
- 스크립트: `dev-backend/scripts/update-module-sort-and-category-v3.25.js`
- 24+24+22+13+10 = 93 모듈에 sort_order 부여 (또는 기존 수정)
- buyer_* 4개: category 'basic'→'advanced' + target 'all'→'restaurant_brand_foodcourt_supplier'
- **Idempotent:** `UPDATE addon_modules SET sort_order=?, category=? WHERE module_code=?`

### Step 2 — PricingPage filter 합성 target 처리
- `dev-frontend/src/pages/Landing/PricingPage.tsx` line 896 분기 1줄 추가
- 빌드 확인

### Step 3 — FeaturesPage Supplier 탭에 buyer_* 4 카드 추가
- 현재 Supplier 탭에 buyer_* 4 모듈 미노출 → 4 카드 추가 (사이드바 메뉴와 1:1)
- (Restaurant/BG/FG 탭에는 이미 있음 — 확인)

### Step 4 — 데이터 시드 (test 계정 풍부화)
- 스크립트: `dev-backend/scripts/seed-test-accounts-rich-v3.25.js`
- 시드 대상:
  - `test_brand_general` → restaurant 2개 admin × 3, staff × 5
  - `test_foodcourt_general` → restaurant admin × 3, staff × 5
  - `test_supplier_admin` → product × 20, customer × 5, contract × 3, PO × 5
  - `test_owner` → restaurant × 2, performance 데이터
- 비밀번호 변경 금지, 데이터만 추가
- Idempotent: 기존 시드 데이터 있으면 SKIP

### Step 5 — 빈 슬롯 캡처 + Features 슬롯 복원
- `dev-frontend/scripts/capture-features.js` TARGETS 갱신
- 50+ 슬롯 (admin/staff, owner_*, supplier_*) 캡처
- FeaturesPage 에서 `getImages(code, 0)` → `getImages(code, N)` 복원

### Step 6 — 빌드 + nginx 배포
- `npm run build:dev` (run_in_background)
- `/features`, `/pricing` HTTP 200 확인
- 새 캡처 webp HTTP 200 확인

### Step 7 — 검증 (CLAUDE.md 10단계 체크리스트)
- 0~9단계 모두 (state-hydration, 빌드, API 실호출, 유저 흐름, UI/UX, 연관 영향)
- Owner plan 페이지 → buyer_* 안 보이는지 확인
- Supplier plan 페이지 → buyer_* 정상 노출 확인
- Pricing 페이지 → Basic 그룹 맨 앞이 dashboard 종류, Advanced 그룹 맨 앞이 recipe/inventory 종류 확인
- Features 페이지 → 50+ 슬롯 모두 실제 화면 (placeholder 0건)
- health-check.js 통과

---

## 6. 위험 요소 + 완화

| 위험 | 완화 |
|---|---|
| target_user_type='all' 사용처 다른 곳에 있을 수 있음 | grep 으로 'all' 사용처 전수 확인 후 변경 |
| 시드 스크립트가 운영 데이터 침범 | NODE_ENV='development' 가드 + test_* 계정만 대상 |
| 캡처 50+ 한 번에 실행 시간 | 역할별 배치 (4 × 15분 = 1시간) — `run_in_background` 활용 |
| 사이드바 sort_order 와 PricingPage 정렬 불일치 | Step 7에서 두 페이지 동시 시각 검증 |
| Supplier가 buyer_*.ui_routes='/pos/suppliers/directory' 로 가도 권한 미부여로 401 | Step 4에서 Supplier plan 에 buyer_* PlanTemplate 매핑 확인 |

---

## 7. 산출물 체크리스트

- [ ] DB: addon_modules sort_order + category 갱신 (93 모듈)
- [ ] DB: buyer_* 4개 target_user_type 변경
- [ ] FE: PricingPage filter 합성값 처리
- [ ] FE: FeaturesPage Supplier 탭 buyer_* 4 카드 추가
- [ ] FE: FeaturesPage 빈 슬롯 복원 (admin_staff 등)
- [ ] BE: test 계정 시드 스크립트 + 실행
- [ ] FE: 50+ 슬롯 신규 캡처
- [ ] 빌드 + 배포
- [ ] 10단계 검증 통과
- [ ] health-check.js 통과
- [ ] session-state.md 업데이트

---

## 8. 결정 분기 (Irene 승인 필요)

(A) 본 설계대로 Step 1→7 순서대로 진행. ← 권장.
(B) 일부 변경 (특정 sort_order 값 / 매트릭스 수정).
(C) Step 분리 — Step 1~3 (정합성) 먼저 → 보고 → Step 4~7 (캡처) 재개.
