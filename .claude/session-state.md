# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-04 (BG/FG → Restaurant Trade Billing 운영 배포 — 버전 미상승)
**버전:** **v3.24** (운영, 버전 미상승 유지)
**작업 상태:** 완료

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

## 📦 오늘 완료한 작업 (2026-05-04)

### BG/FG → Restaurant Trade Billing 시스템 (운영 배포 — 버전 미상승)

**배경**: PurchaseOrder.seller_type ENUM은 4종(system_admin/brand/foodcourt/supplier) 동등 지원했지만, monthly SOA 결제조건은 Supplier 전용. notification-settings에 BG/FG는 등록되어 있었으나 SOA 흐름 미구현 (gap). 동급 처리.

#### Backend
- `models/Restaurant.js` — `brand_billing_terms` / `foodcourt_billing_terms` JSON 컬럼 추가 (운영 DB 자동 sync)
- `utils/paymentTerms.js` (신규) — `validatePaymentTerms` / `buildPaymentTerms` / `VALID_INVOICE_CYCLES` 공통 헬퍼 (supplier.js + entity-billing.js 공유)
- `routes/entity-billing.js` (신규) — PUT/GET `/api/{brand|foodcourt}/restaurants/:id/billing-terms`
- `routes/brand-soa.js` (신규) — `GET /api/brand/soa/current` + `POST /remind` + `GET /api/brand/trade-invoices`
- `routes/foodcourt-soa.js` (신규) — 동일 패턴
- `routes/restaurants-crud.js` — list response에 brand_billing_terms / foodcourt_billing_terms 노출
- `routes/purchase-invoices.js` `/soa/current` — issuer_type ['supplier','brand','foodcourt'] 통합 처리, seller_type 필드 추가
- `routes/purchase-orders-crud.js` — `resolveCreditTermsForPair()` + `checkCreditLimit()` 추가. PO 생성 시 미수금 누적 + 신규 합계가 한도 초과면 400 차단 + `code:'CREDIT_LIMIT_EXCEEDED'` + hint
- `services/purchaseOrderService.js` — `resolvePaymentTerms()` 에 brand/foodcourt 분기 추가
- `services/soaScheduler.js` — `issueSoaForPair()` 헬퍼 추출 + supplier/brand/foodcourt 3 평행 루프

#### Frontend
- `components/Billing/BillingTermsModal.tsx` (신규) — 공용 모달 (BG/FG 양쪽 사용)
- `pages/BrandGeneral/BrandTradeInvoicesPage.tsx` (신규) — Supplier 패턴 복제 (entityType prop으로 FG도 사용)
- `pages/FoodcourtGeneral/FoodcourtTradeInvoicesPage.tsx` (신규) — Brand 페이지 wrapper
- `pages/Manager/RestaurantsPage.tsx` — 매장 카드에 Billing 항목 + Edit 버튼 + 모달 트리거
- `MainLayout.tsx` — BG/FG `Plans & Payments` 섹션에 Trade Invoices NavItem
- `App.tsx` + `ProtectedRoute.tsx` — 라우트 등록 + 화이트리스트

#### i18n (4 언어)
- `public/locales/{en,ko,zh,ms}/billing.json` (신규, 27 키 균등)
- `public/locales/{en,ko,zh,ms}/brand.json` `tradeInvoices.*` 21 키 추가
- `public/locales/{en,ko,zh,ms}/common.json` `nav.tradeInvoices` 추가

#### 검증 (10단계 통과)
- 통합 API: 25/25 PASS
- credit_limit 단위: 9/9 PASS
- health-check: 73/73 PASS
- 빌드: exit 0
- state hydration: 0 warnings

#### 운영 배포 검증 (2026-05-04 07:46 UTC)
- 운영 DB 컬럼 자동 추가: `brand_billing_terms`, `foodcourt_billing_terms` (JSON, nullable)
- 신규 endpoint anon 차단: 3건 401 정상
- i18n 4언어 200 OK
- Backup: `/var/www/backups/20260504_074323`

#### 설계 문서
- `/var/www/docs/BG_FG_TRADE_BILLING.md`

---

## 🔖 다음 할 일

1. **Multi-Restaurant Owner 표시 sweep** — 157곳의 'Restaurant Owner' 텍스트를 `getRoleDisplayName()` 헬퍼로 점진 적용
2. **데모 sample data 확장** — Multi-Owner의 multi-restaurant 매핑, FG sample tenants, Supplier product/contract sample
3. **i18n 4언어 보강** — Multi-Restaurant Owner / B2B Procurement 등 신규 모듈 description ko/zh/ms
4. **결제 Test mode 검증** — Stripe Test 키 등록 후 자동 검증
5. **Ingredient 모델 vs DB 스키마 불일치** — `supplier_product_id`/`foodcourt_product_id` 컬럼 모델에 있는데 DB에 없음 (User 64-key sync fail 영향). PO 생성 endpoint 500 에러 원인. 별도 sweep 필요.

---

## 📂 주요 문서 위치

- 신규 설계서: `/var/www/docs/BG_FG_TRADE_BILLING.md`
- 개발 로드맵: `/var/www/DEVELOPMENT_PLAN.md`
- CHANGELOG: `/var/www/CHANGELOG.md` (Unreleased 유지 — 버전 미상승)
- 결제 아키텍처: `/var/www/docs/PAYMENT_ARCHITECTURE.md`
- Supplier Contract: `/var/www/docs/SUPPLIER_CONTRACT_SYSTEM.md`
- UI 가이드: `/var/www/dev-frontend/UI_DESIGN_GUIDE.md`
- 프로젝트 규칙: `/var/www/CLAUDE.md`

---

## 서버 재시작 후 복구 가이드

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
