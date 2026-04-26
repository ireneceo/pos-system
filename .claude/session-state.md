# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-26 (Sprint 1+2+3+4 — **Supply Chain System 4-Design 전체 완료**)
**버전:** **v3.18** (2026-04-25 운영 배포) · 미배포 누적 → 다음 v3.19
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 — 2026-04-26)

**🎉 Supply Chain System 4-Design 시리즈 완료 + /검증 풀 통과**

`/기능설계` 6단계 × 4 Sprint 자율 진행. Supply Chain 거래 흐름 완성: Supplier 등록 → 계약 → 발주 → 입고 → Trade Invoice 자동 발행 → 결제 → Monthly SOA cron.

#### Sprint 1 — Seller Product & Inventory (Design 1)
- DB: 12 신규 모델 (SupplierCompany / SupplierProduct + Category + OptionGroup + Option + junction / FoodcourtProduct + Category + OptionGroup + Option + junction / SupplierInvitation)
- ENUM 6개 확장 + plan_templates 2개 컬럼 + ingredients 2개 FK
- Backend: 8 라우트 파일 / 66 endpoints
- Frontend: 16 페이지 (12 활성 + 4 Coming Soon)
- AddonModule 시드 15개 + PlanTemplate 2개 (`supplier_basic`/`supplier_advanced`)
- Signup A+B (SA invitation + Landing 일반 가입)
- E2E: 30/30 PASS

#### Sprint 2 — Supplier Contract System (Design 2)
- DB: SupplierContract 모델 1개
- Backend: 13 endpoints (`routes/supplier-directory.js` 6 + `routes/supplier.js` 확장 7)
- 신규 미들웨어 `requireBuyerRole` (buyerScope.js)
- Frontend: 3 buyer 페이지 (Directory/Profile/MySuppliers w/ 모달) + 2 supplier 교체 (Contracts/Customers)
- 활성 계약 1건 원칙 (앱 레벨 검증)
- 4 알림 템플릿 (request/approve/reject/terminate)
- E2E: 18/18 PASS

#### Sprint 3 — Purchase Order & Receiving (Design 3)
- DB: 3 모델 (IngredientSellerProduct / PurchaseOrder / PurchaseOrderItem)
- Backend: 14 endpoints (`routes/purchase-orders.js` 9 + `routes/ingredient-seller-products.js` 5)
- 재고 정합성: receive 시 Ingredient lock + InventoryBatch + Transaction + Stock 트랜잭션 단일
- 활성 SupplierContract 게이트 (Supplier seller 만)
- PAR 자동 추천 (`Ingredient.min_stock` 활용)
- Frontend: 3 페이지 (List + 3-step wizard + Detail w/ timeline)
- E2E: 18/18 PASS (Stock 정확성 검증 +125 = 5 × 25 unit_conversion)

#### Sprint 4 — Seller Order Mgmt + Trade Invoice + Monthly SOA (Design 4)
- DB: PurchaseOrder 컬럼 2개 추가 (tracking_info JSON + trade_invoice_id FK). 신규 모델 0개 (Invoice 재사용).
- Backend: 9 endpoints (`routes/seller-orders.js` 6 + `routes/purchase-invoices.js` 3)
- 신규 미들웨어 `requireSellerRole` (sellerScope.js)
- 신규 service: `purchaseOrderService.createTradeInvoice()` (PO Received 자동 발행, idempotent)
- 신규 cron: `services/soaScheduler.js` (매월 1일 00:30, SchedulerRun 기록)
- Frontend: 6 페이지 — Supplier 3 (Orders/TradeInvoices/SOA) + BG/FG 2 (incoming-orders, IncomingOrdersView 공유 컴포넌트로 DRY) + Buyer 1 (Purchase Invoices)
- 4 이메일 템플릿 + 4 알림 카테고리
- E2E: 13/13 + /검증 stage3 20/20 PASS

#### 종합 (4 Sprint 누적)
- 16 신규 모델
- 102 신규 endpoints
- 30 신규 UI 페이지
- API E2E **86/86 PASS**
- 보안 **44건 시나리오 PASS** (IDOR 12 / Anon 16 / Cross-role 8 / Validation 8)

### Trade Invoice 자동 발행 검증 사례
```
TRD-SUP18-20260426-001
  total: 500.00 (5 × 100), status: pending_payment
  due_date: 2026-05-15 (Monthly SOA payment_due_day=15 익월)
  issuer: supplier#18, payer: restaurant#5
  contract_id: SupplierContract.id (Sprint 2 link)
```

### /검증 10단계 (Sprint 4 정식 통과)
- 0단계 hydration: 0 warnings
- 1단계 빌드 exit 0 (`main.6f22a419.js` 배포)
- 2단계 backend 30분+ uptime, 4 신규 라우트 401
- 3단계 API E2E 20/20
- 4단계 6 페이지 HTML 200
- 5단계 5 역할 18/18
- 6단계 요구사항 100% 매핑
- 7단계 기존 모델 0건 변경, Subscription invoice 30건 무영향
- 8단계 alert/toast 0, type=date 0, timezoneless 0, i18n 0 errors
- 9단계 6 라우트 + 4 MODULE_GATED + 17 사이드바 매칭

### 발견 + 수정
- DateField 6 파일 named import → default import 일괄 수정 (Sprint 3+4)
- Invoice.status ENUM = `pending_payment` (not `pending`) 수정
- Invoice.issued_by NOT NULL → seller owner_id 자동 도출
- supplier-inventory 라우트 마운트 path 수정 (`/api/seller-orders` 직접 마운트)
- unit_conversion fallback (POST 시 IngredientSellerProduct에서 자동 채움)

### 핵심 파일 (이번 세션)
- 설계: `docs/SELLER_PRODUCT_INVENTORY_SYSTEM.md` (1391줄), `SUPPLIER_CONTRACT_SYSTEM.md` (867줄), `PURCHASE_ORDER_SYSTEM.md` (858줄), `SELLER_ORDER_MANAGEMENT_SYSTEM.md` (915줄)
- Backend 신규: 16 모델 + 8 라우트 + 5 미들웨어 (Supplier/Buyer/Seller scope + PlanLimit) + 2 service (purchaseOrderService + soaScheduler) + 4 마이그레이션
- Frontend 신규: 30 페이지 + 5 신규 i18n namespace (4 언어) + AuthContext/ProtectedRoute/MainLayout 확장

### 다음 할 일

#### 다음 세션 (Irene 다음 섹션 예고)
- (a) **`/배포` v3.19** — Supply Chain 4-Design 전체 + 미배포 누적 11건 운영 배포
- (b) **post-MVP 후속**:
  - 외부 carrier API 연동 (배송 추적)
  - Returns / Credit Notes
  - Auto-pay (carded billing)
  - Real-time Socket.IO 알림 (Supplier 새 PO 핀)
  - Brand seller 의 산하 매장 일괄 인보이스 (PO 분배)
- (c) 다른 신규 기능 (DEVELOPMENT_PLAN.md 참조)

#### 운영 배포 시 마이그레이션 순서 (v3.19)
1. `node scripts/sprint1-supply-chain-migration.js`
2. Sequelize sync (16 신규 테이블)
3. `node scripts/seed-supplier-modules-and-plans.js`
4. `node scripts/seed-buyer-supplier-modules.js`
5. `node scripts/seed-purchase-orders-module.js`
6. `node scripts/sprint4-migration.js`
7. PM2 restart + frontend rebuild

### 미배포 [Unreleased] 누적 (다음 `/배포` 시 v3.19)
- Onboarding wizard 강화
- 알림 센터 (Inbox) v1
- 보안 fix (POST /api/restaurants)
- Trial 만료 자동 알림
- Scheduler 모니터링 대시보드
- 구독 변경 히스토리 페이지
- **Sprint 1 — Supply Chain Design 1 (Seller Product & Inventory)** ← 이번 세션
- **Sprint 2 — Supply Chain Design 2 (Supplier Contract System)** ← 이번 세션
- **Sprint 3 — Supply Chain Design 3 (Purchase Order & Receiving)** ← 이번 세션
- **Sprint 4 — Supply Chain Design 4 (Seller Order Mgmt + Trade Invoice + Monthly SOA)** ← 이번 세션

**검증 상태:**
- 빌드 `main.6f22a419.js` exit 0
- health-check 43/43 PASS
- API E2E 86/86 PASS (4 Sprint 누적)
- state-hydration 0 warnings
- i18n 4 언어 5292 키 동기화 PASS

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
