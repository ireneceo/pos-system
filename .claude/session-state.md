# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-27 (Supplier Portal Polish — Sidebar/Dashboard/Inventory Transaction/Demo Data 통일)
**버전:** **v3.18** (2026-04-25 운영 배포) · 미배포 누적 → 다음 v3.19
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-27)

**Supplier Portal Polish — Brand/Foodcourt 와 동일 패턴으로 통일성 + 모든 메뉴 데이터 노출**

#### 1) Sidebar 재구성
- "Settings" NavTitle 본문 + 공통 영역 두 번 렌더 fix
- Operations / Plans & Payments / Communication 3 섹션 + 공통 Settings
- Profile disabled 제거 → `/pos/profile` 정상 사용

#### 2) Dashboard 재작성 (313 → 540줄)
- 8 KPI: pending/confirmed/shipped/received_this_month + monthly_revenue/outstanding/active_customers/low_stock
- 6개월 매출 추이 LineChart (recharts)
- Alerts panel (clickable deep-link)
- Recent Orders + Recent Trade Invoices 2-col 테이블 (customer name resolve)
- Backend `/api/supplier/dashboard` 응답 18 필드 확장

#### 3) Inventory Transaction (Sprint 1 의 TODO 마무리)
- 신규 모델 `SupplierInventoryTransaction` + 테이블 (transaction_type/quantity_change/stock_after/reason/reference/batch_no)
- adjust/receive 자동 기록
- `/api/supplier-inventory/transactions` endpoint 정상 구현
- Frontend Tab 구조 (Stock List + Transaction History) + 색상 (양수 녹색/음수 빨강)
- 시드 8건 (Initial 6 + Receive 1 + Adjust 1)

#### 4) Demo Data 종합 시드 (`scripts/seed-demo-supplier-data.js`)
- demo-supplier@purplehere.com (User#227, SupplierCompany#20 `is_demo=true`)
- 6 Products + 3 Categories (Vegetables/Meat/Pantry)
- 1 Active Contract w/ Restaurant#38 (monthly_soa)
- 3 IngredientSellerProduct mapping
- 4 PurchaseOrders (submitted/confirmed/shipped/received)
- 1 Trade Invoice (TRD-SUP20-20260415-001 RM405 pending_payment)
- 2 Subscription Invoices (3월 paid + 4월 pending)
- 2 Notices + 2 SupportTickets

#### 5) Notices/System Inquiry/Subscription Invoices wiring
- `/pos/supplier/notices` 라우트 추가 (BrandNoticesPage 재사용)
- NoticeRecipient user_id 매칭 → supplier 자동 처리
- SupportTicket customerId 매칭 (변경 없이 시드만)
- System Admin 발행 supplier 구독 invoice 2건 시드

#### 6) Pricing Supplier 탭
- VALID_TABS / TAB_ORDER / TAB_LABELS / plan_target type 4곳 'supplier' 추가
- PlanPrice 시드: Basic MYR 99/990, Advanced MYR 299/2990 (KRW × 300)

#### 7) LoginPage Demo 카드
- DEMO_ACCOUNTS에 Supplier Admin 카드 추가 (보라 #9333EA)

#### 8) Signup 에러 안내
- `result.error?.message` 우선 노출
- MX 검증 dev/prod 모두 유지 + 백엔드 메시지 그대로 사용자에게

#### 9) Path-level middleware fix (6개 라우터 silent 버그)
- supplier-directory.js, purchase-orders.js, purchase-invoices.js, ingredient-seller-products.js, foodcourt-products.js, foodcourt-inventory.js
- `app.use('/api', router)` 광범위 prefix + router-level `requireBuyerRole`/`requireFoodcourtScope` 가 다른 역할 요청까지 차단하던 cross-role silent 버그
- path-level use로 좁힘
- 메모리에 패턴 저장 (`reference_path_level_middleware.md`)

#### 10) addon-modules public 처리
- `/api/addon-modules?active_only=true` 만 공개 (Pricing 카탈로그용)
- 그 외 인증 유지

#### 11) i18n 4언어 36+ 신규 키
- `supplier.json` dashboard.* + inventory.history.* + inventory.tabs.*

### 검증 결과
- 빌드 `main.2c0a88a3.js` exit 0
- Supplier 모든 endpoint 15/15 200 OK + 데이터 노출
- 회귀 health-check 43/43 PASS
- Buyer (demo-restaurant) / Brand (demo-brand) 측 endpoint 영향 없음

### 핵심 파일 (이번 세션)
**Backend (신규)**
- `models/SupplierInventoryTransaction.js`
- `scripts/seed-demo-supplier-data.js`

**Backend (수정)**
- `routes/supplier.js` — dashboard 응답 확장
- `routes/supplier-inventory.js` — transaction 자동 기록 + /transactions
- `routes/supplier-directory.js`, `purchase-orders.js`, `purchase-invoices.js`, `ingredient-seller-products.js`, `foodcourt-products.js`, `foodcourt-inventory.js` — path-level middleware
- `routes/addon-modules.js` — active_only=true public
- `utils/emailValidator.js` — MX 메시지 노출 fix
- `models/index.js`

**Frontend (수정)**
- `components/Layout/MainLayout.tsx` — 사이드바 재구성 + Profile 활성
- `pages/Supplier/SupplierDashboard.tsx` — 재작성
- `pages/Supplier/SupplierInventoryPage.tsx` — Tab + Transaction History
- `pages/Login/LoginPage.tsx` — Supplier 데모 카드
- `pages/Landing/SignupPage.tsx` — 에러 메시지
- `pages/Landing/PricingPage.tsx` — Supplier 탭
- `App.tsx` — `/pos/supplier/notices` 라우트
- `public/locales/{en,ko,zh,ms}/supplier.json`

### 미배포 [Unreleased] 누적 (다음 `/배포` 시 v3.19)
- Onboarding wizard 강화
- 알림 센터 (Inbox) v1
- 보안 fix (POST /api/restaurants)
- Trial 만료 자동 알림
- Scheduler 모니터링 대시보드
- 구독 변경 히스토리 페이지
- Sprint 1 — Supply Chain Design 1 (Seller Product & Inventory)
- Sprint 2 — Supply Chain Design 2 (Supplier Contract System)
- Sprint 3 — Supply Chain Design 3 (Purchase Order & Receiving)
- Sprint 4 — Supply Chain Design 4 (Seller Order Mgmt + Trade Invoice + Monthly SOA)
- **Supplier Portal Polish** ← 이번 세션

### 다음 할 일

**다음 섹션 작업 — Supplier Portal Polish Phase 2** (DEVELOPMENT_PLAN.md "다음 섹션 작업" 참조):

1. **SupplierDashboard 추가 보강** (BG/FG 1136~1160줄 패턴 도달)
   - Quick Actions Grid (Add Product / View Pending Orders / Issue Trade Invoice / View Customers)
   - Setup Status Panel (신규 supplier 온보딩 진행률)
   - Top Customers PieChart (이번 달 매출 buyer별 분포)
   - Receivables Aging table (0-30일/31-60일/60일+ 미수금)

2. **SupplierContractsPage 보강**
   - 계약 종료 알림 (end_date 임박)
   - 계약별 누적 매출/발주 건수 표시

3. **Sales Order/Trade Invoice 흐름 보강**
   - PO ship 시 SupplierProduct.current_stock 자동 차감 + SupplierInventoryTransaction (transaction_type='po_shipped') 자동 기록
   - Trade Invoice 결제 시 SupplierCompany 매출 누적

4. **Post-MVP Supply Chain**
   - 외부 carrier API 연동 (배송 추적)
   - Returns / Credit Notes
   - Auto-pay (carded billing)
   - Real-time Socket.IO 알림
   - Brand seller 산하 매장 일괄 인보이스

**그 외 옵션:**
- (a) `/배포` v3.19 — 운영 배포 (밤에 — Irene 결정)
- (b) DEVELOPMENT_PLAN.md 의 다른 미완료 항목

### 운영 배포 시 마이그레이션 순서 (v3.19)
1. `node scripts/sprint1-supply-chain-migration.js`
2. Sequelize sync (16 신규 테이블 + supplier_inventory_transactions)
3. `node scripts/seed-supplier-modules-and-plans.js`
4. `node scripts/seed-buyer-supplier-modules.js`
5. `node scripts/seed-purchase-orders-module.js`
6. `node scripts/sprint4-migration.js`
7. (선택, dev에만) `node scripts/seed-demo-supplier-data.js`
8. PM2 restart + frontend rebuild

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
