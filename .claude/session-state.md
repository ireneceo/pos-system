## 현재 작업 상태
**마지막 업데이트:** 2026-04-11 (Phase C-6 Inventory 분할 완료)
**현재 버전:** v3.12
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (2026-04-11)
- **Phase C-6 파일럿 — InventoryManager 분할 완료 (안정화 조치)**
  - 원본: `components/Inventory/InventoryManager.tsx` 3141줄 단일 파일 (52 useState, 9 모달, 4 탭, 2 모드)
  - 결과: 26개 파일 총 3905줄, 메인 335줄 (약 10%)
    - `types.ts` (191) — 모든 인터페이스
    - `styles.ts` (371) — 25개 styled-components
    - `utils.ts` (82) — calculateStockStatus, formatStock, formatDate, getStatusLabel, getConfidenceLabel, UNIT_OPTIONS, EMPTY_GENERAL_STOCK_FORM
    - `hooks/` 11개 — useAuthFetch, useInventoryData, useIngredientAdjustModal, useSettingsModal, useInitialStockModal, useGeneralStockReceiveModal, useGeneralStockForm, useInlineStockEdit, useOrderModal, useDeleteConfirm, useAlertResolver
    - `sections/` 3개 — DashboardSection (287), StockListSection (513), TransactionHistorySection (146)
    - `modals/` 8개 — Receive/Waste/InitialStock/GeneralStockReceive/Order/Settings/GeneralStockForm (Add+Edit 통합)/DeleteConfirm
  - **패턴 원칙** (향후 C-6 나머지 4개 컴포넌트에 재사용):
    1. Hook = 상태+로직+API 호출의 캡슐. setter는 useInventoryData에서 받아서 훅들이 optimistic update
    2. Data flow 단방향: InventoryManager → useInventoryData → 9개 feature hooks (setter 공유)
    3. Section은 presentational. 모든 핸들러 props로 받음
    4. Modal은 독립 + props-only. 폼 상태는 부모 훅에 위치
    5. Mode 분기는 hook 내부에서만. Section/Modal은 mode 무지
    6. Add+Edit 유사 모달은 mode prop으로 통합 (GeneralStockFormModal)
  - 공개 API 불변: `<InventoryManager mode restaurantId />` — 2개 consumer (InventoryPage, BrandInventoryPage) 무수정

### 완료된 작업 (이전 세션 — 2026-04-10)
- **Phase C-1/C-2 운영 배포** (17:19) — 토큰 키 단일 진입점 + 하드코딩 fallback 제거. 운영 health-check 39/39 통과
- **Phase C-3 개발 완료** — Fetch 인터셉터 단일화. 신규 `utils/httpClient.ts`에 `installFetchInterceptor()` + `setOn401Handler()`. `index.tsx`에서 1회 호출, `AuthContext`는 on401 콜백만 등록. StrictMode/HMR 인터셉터 누락·중복 위험 해소
- **Phase C-4 개발 완료** — `CustomerContext` 내부 분할
  - 신규: `contexts/customer/types.ts`, `useMobileCustomerState.ts`, `usePosCustomersState.ts`
  - `CustomerContext.tsx`는 composite provider로 재작성 (공개 API 불변 → 10개 consumer 무수정)
  - **레스토랑 간 모바일 세션 격리 버그 수정**: per-slug localStorage 키 (`mobile_customer:<slug>`, `mobile_guest:<slug>`, `mobile_token:<slug>`). `history.pushState/replaceState` 패치로 SPA 네비게이션 시 `locationchange` 이벤트 발생 → 즉시 상태 재로드. 첫 로드 시 레거시(스코프 없는) 키 자동 정리
  - `mobile/utils/mobileApi.ts`도 per-slug 토큰 키로 업데이트
- **Phase C-5 개발 완료** — 백엔드 5개 거대 라우트 → 16개 파일로 분할
  - customers.js 1263 → barrel + self(223) + admin(320) + auth(608)
  - mobile.js 1304 → barrel + helpers(163) + public(602) + orders(565)
  - orders.js 2140 → barrel + crud(1501) + views(469) + payment(231)
  - restaurants.js 2204 → barrel + subscription(461) + crud(1648) + ingredients(152)
  - invoices.js 3170 → barrel + helpers(418) + main(2327) + payment(527)
  - 마운트 순서 주의: customers는 self→auth→admin, literal 경로가 `/:id` 와일드카드보다 먼저
  - cross-module: `routes/owner.js` → `./invoices`에서 `getIssuerCompanyInfo/getPayerCompanyInfo` require → invoices.js 배럴에서 re-export로 호환
  - 중간 회귀 3건 즉시 수정: mobile-helpers `TableQRSession` 중복 선언, orders-payment `isPaymentAllowed` helper 누락, mobile-public `Order` import 누락
- **63개 백엔드/셸 스크립트 이모지 치환** — ✅/❌ → ✓/✗ (perl bulk 안전 치환). 운영 배포는 미뤄두고 다음 배포 기회에 합치기

### 검증 (C-6 InventoryManager)
- 빌드: main.695189c5.js, 124초, 신규 warning 0 (기존 pre-existing warnings 유지)
- health-check: 39/39 통과
- Inventory API 실호출 14/14:
  - Restaurant mode (System Admin): summary/inventory/alerts/suggestions/expiring/general-stock/suppliers/gs-categories/transactions 9개
  - Brand mode (Brand General): product-ingredients track_stock/general-stock/gs-categories/suppliers/gs-transactions 5개
- 번들 마커 확인 (청크 3184.28f7762a.chunk.js 82KB): PAR Level calculation, Unlink from Inventory, Receive Stock, Record Waste, Set Initial Stock, Add General Stock, Edit General Stock, Reorder Suggestions, Expiring Items 9/9
- 페이지 HTTP: /restaurant/1/inventory 200, /brand/inventory 200, 청크 URL 200

### 운영 배포 대기분
- Phase C-3 (httpClient 단일화) — 프론트
- Phase C-4 (CustomerContext 분할 + 모바일 세션 slug 격리) — 프론트
- Phase C-5 (백엔드 5개 라우트 분할) — 백엔드
- Phase C-6 파일럿 (InventoryManager 26파일 분할) — 프론트
- 이모지 치환 (63개 스크립트) — 백엔드

→ 다음 `/배포` 명령 시 한 번에 운영 동기화. C-4의 모바일 세션 격리 버그 수정도 운영에 나가야 함.

### 다음 할 일
- **C-6 나머지**: 확립된 패턴으로 4개 컴포넌트 분할 (별도 세션 권장)
  - `pages/LiveOrders/LiveOrdersPage.tsx` 4458줄
  - `pages/BrandGeneral/BrandInvoicesPage.tsx` 4566줄
  - `pages/Admin/InvoicesPage.tsx` 4205줄
  - `mobile/pages/PaymentPage.tsx` 2597줄
  - **참조 패턴**: `components/Inventory/` (types/styles/utils + hooks/sections/modals 구조)
- 브라우저 수동 확인: Inventory 4탭 + 9개 모달 실제 동작 (Ctrl+Shift+R 후 Restaurant/Brand 모드 각각)
- 브라우저 수동 확인: 모바일 세션 per-slug 격리 (C-4 후속)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
