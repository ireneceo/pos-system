# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-19
**버전:** **v3.35** (SNS 정식 로고 + 모바일 메뉴 헤더 정리 운영 배포 완료, 당일 v3.34 + v3.35 두 번 배포)
**작업 상태:** 완료. 새 지시 대기

### 진행 중인 작업
- 없음

### 완료된 작업 (2026-05-19 — v3.35)

**v3.35 운영 배포**
- SNS 썸네일 OG 이미지 정식 로고 적용 (1200×630 표준 + "Solving Real F&B Problems" 슬로건 + URL 푸터, 351KB → 19.6KB)
- `color_logo-slogan.svg` 신규 추가 (17.6KB, 향후 다른 곳에서도 활용 가능)
- 모바일 메뉴 헤더 정리 (상단 우측 "🍽️ Dine-In" 중복 라벨 제거, 매장 카드 한 줄 flex 정렬, 상태 도트화)

### 완료된 작업 (2026-05-19 — v3.34)

**v3.34 운영 배포**
- 모바일 메뉴 "How to order" 3-step 안내 배너 제거 (`FirstVisitHint` 컴포넌트 + 사용처 둘 다 삭제)
- 모바일 메뉴 카테고리 idle prefetch (`requestIdleCallback` 으로 init 완료 후 백그라운드 데이터+썸네일 prefetch, 두 번째 탭부터 즉시 표시). 추가 only · 기존 컴포넌트 무수정 · 실패 시 fallback

### 완료된 작업 (이전 세션 누적, 2026-05-18)

**v3.32 운영 배포 (점심)**
- 테이블 QR 무조건 dine-in 고정
- Reservation 기능 base 격상 (paywall 제거, AddonModule basic, 마이그)
- Mobile Order Settings 탭 전수 보강 (7 카드 + 27 i18n 키 × 4 langs)
- RA support 페이지 타이틀 `t('nav.systemInquiry')` 로 일치

**v3.33 운영 배포 (저녁)**
- Admin Invoices Cancel + Revert to Draft 버튼 (dead modal trigger 연결 + Revert 모달 신규)
- PWA standalone 데스크탑 앱 같은 창 전환 (`utils/runtime.isStandalone()` + `openSecondaryWindow` helper)
- 4 풀화면 페이지 Back 버튼 표준화 (PageHeader backHref prop + Customer/Kitchen/Floor Plan)
- KDS 정확성 보완 4건 (formatPickupTimeRange timezone · Pickup scheduled_pickup_time 정렬 · URL station stationId 우선 · Backend status 콤마 다중 필터)

**v3.33 hotfix 운영 배포 (밤)**
- **RA Recipe Management 5 탭 ReferenceError fix** (운영 매장 4곳 Recipe 페이지 즉시 복구) — v3.32 alert sweep 잔여 결함
- 모바일 OrderTypePage Footer 링크 (Back to Dashboard / Visit Homepage)
- BG/FG/Owner Reports `/api/menu` aggregation fix (Owner 정상화, BG/FG 는 backend 미들웨어 한계로 부분 적용)
- 헤드리스 자동 mount sweep 도구 (Playwright, 95 페이지 검증) — 안정화 사이클 표준 도구로 정착

### 다음 확정 작업
- 없음 — 지시 대기

### 다음 확정 작업 (전수 점검 결과 — 2026-05-19 audit)

> 2026-05-19 보안 + 코드 품질 전수 audit 완료. 결과 priority 순서.

**1. IDOR 결함 전수 재검증 + fix (운영 critical, 반나절)**
- Agent 주장: 43건 IDOR (Type A — `:id` 라우트에 `checkRestaurantAccess` 누락) + 9건 RBAC (Type C — DELETE/status 변경에 `requireRole` 누락)
- 직접 검증 시 일부 false positive 발견 (`restaurants-crud.js:1787 DELETE /:id` 는 이미 `requireRole('System Admin')` 보호됨)
- **실제 결함 확정 sample**: `orders-crud.js:112 GET /:id` (authenticateToken 만), `invoices-crud.js:580 DELETE /:id` (Foodcourt Manager 만 branch scope, 타 역할 무방어)
- 작업 절차: 각 보고된 라우트 직접 검증 → true positive 만 fix → 메모리 `reference_idor_sweep` 패턴 (`authenticateToken + checkRestaurantAccess` 동시) 적용 → health-check 에 영구 케이스 추가
- 핵심 파일: orders-crud.js / invoices-crud.js / contracts.js / users.js

**2. alert() / window.confirm() 18건 sweep (UX, 1시간)**
- v3.32 alert sweep 후에도 잔존
- alert(): BrandFranchiseMapPage(614), FoodcourtTenancyMapPage(736), FoodcourtFloorPlanPage(689), CheckoutDisplayPage(207), FoodcourtInvoicesPage(416), NotificationSettings(256), BrandProductsTab(676), HardwareQuotesPage(962), MainLayout(2794)
- window.confirm(): FoodcourtFloorPlanPage(678), Manager/RestaurantsPage(2436), IncomingOrdersView(513), FoodcourtSubscriptionsPage(488), BrandSubscriptionsPage(529), BrandFranchiseMapPage(603), ImportDataTab(152), Admin/CarriersPage(234), BrandMenuUpdatesPage(132)
- 패턴: ConfirmModal singleButton 또는 setSuccessMessage 적용

**3. API 응답 표준화 (일관성, 중)**
- 비표준 ~144건, 상위 8 파일에 집중: invoices-list.js(16) / brands-core.js(17) / foodcourts-core.js(17) / contents.js(15) / restaurants-crud.js(14) / public.js(8) / plans.js(7) / addon-modules.js(5)
- 표준: `{ success: true, data }` / `{ success: false, message }`. 비표준 `res.json({ error })` 또는 raw object 잔존
- 수정하는 파일 범위 내에서 정리 (CLAUDE.md 점진 적용 룰)

**4. 거대 파일 분리 (유지보수, 대)**
- backend 23개 > 500줄, 최대 `restaurants-crud.js` 2064줄
- frontend 102개 > 800줄, **최대 `SettingsPage.tsx` 6349줄** (압도적)
- 우선순위: SettingsPage > MainLayout(3370) > POSTerminalPage(3013) > MenuManagementPage(2263)
- 신규 작업 시 함께 분리 (대규모 리팩토링 별도 권장 X)

### 자동 검증 도구 (현재 통과 상태)
- health-check 80/80 ✅ · state-hydration 0 warning ✅ · headless mount sweep 95 페이지 0 크래시 ✅
- npm audit: backend moderate 1 (socket.io transitive, 영향 미미) / frontend high 1 (babel transitive, 빌드 only 런타임 무영향)

### 후속 후보 (아이디어 메모, 확정 X)
> 다음 사이클 결정은 Irene 지시 기준. /개발시작 에서 자동 추천 대상 아님.

- Backend `checkRestaurantAccess` 미들웨어에 BG/FG brand_id/foodcourt_id scope 분기 추가 → BG/FG 의 `/api/menu?restaurantId=X` 403 해소 + Reports 차트 카테고리 분석 정상화
- OrderContext `/api/orders?limit=100` 자동 호출 — BM/Supplier 권한 분기 (현재 console error 노출, mount 영향 0)
- BM Dashboard / BG/FG Reports networkidle timeout (페이지 mount 는 정상 — sweep marker 한계)
- 헤드리스 sweep CI 통합 (배포 전 자동 mount 검증)
- 다른 역할의 인터랙션 후 발생 가능한 결함 — 헤드리스 sweep 으로 잡지 못함. 별도 검증 도구 필요 시
- zh/ms i18n 영어 잔존 690건 sweep (운영 critical 아님)
- BG → 산하 매장 operation_settings PUT 200 — design vs 결함 비즈니스 결정 필요
- Reservation 후속 — deposit / 캘린더 monthly view / WaitingList / 환불 cron (스프린트 규모, `/기능설계` 필요)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
