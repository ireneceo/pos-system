# Changelog

> 배포 전 개발 내역을 추적합니다. `/개발완료` 시 자동 추가, `/배포` 시 버전으로 이동.

---

## [Unreleased] — 미배포 (개발서버만)

## 2026-04-11 배포 (v3.12 유지 — 버그 수정 및 UI 조정 위주)

### notices 데모/테스트 제외 + admin 하드웨어 max_quantity 무제한 + /packages Quote 모달 수정 + External QR + inventory adjust fix

- fix(notices): 관리자 공지 이메일 발송 시 `is_demo=true`/`is_test=true` 계정 제외. broadcast 4개 target(all/role/brand/foodcourt)의 recipient 생성 로직에서 User/Restaurant 양쪽 필터. `select_restaurants`(명시 선택)는 관리자 의도 존중 — `routes/notices.js`
- fix(admin/system-products): Hardware Package 편집 모달의 addon Max 입력 필드에서 `0`(무제한) 설정 불가하던 버그. (1) loader `|| 1`이 기존 `max_quantity=0` 값을 로드 시 1로 변조하던 핵심 버그를 `?? 0`으로 수정, (2) 신규 addon 기본값 `1 → 0`, (3) input `min="1" → "0"`, `|| 1 → || 0`, (4) `(0 = unlimited)` 힌트 문구 추가 — `SystemProductManagementPage.tsx`
- chore(db): 운영 DB `system_product_addons.max_quantity=1`인 108건을 `0`(무제한)으로 일괄 UPDATE. 12건(max_quantity=5)은 유지. 백업 `/var/www/backups/system_product_addons_20260411_175650.sql`. 운영 /packages 에서 Additional Equipment 1개만 추가되던 증상 해소
- feat(packages): Request a Quote 모달 Quote Summary에 소프트웨어 구독 라인 신규. 플랜명 + 청구주기 (monthly/annual) + 가격 + "Billed separately from hardware (recurring invoice)" 안내. 하드웨어 총액은 one-time 그대로, 구독은 dashed divider 아래 별도 섹션. 체크박스 해제/플랜/가격 없을 때 숨김 가드 — `PackagesPage.tsx` + `locales/{en,ko,zh,ms}/landing.json` (2 keys × 4 lang)
- fix(packages): Request a Quote 모달 레이아웃/z-index 수정. (1) z-index `200 → 10000` — Landing 헤더(1000) 뒤로 숨던 문제, (2) ModalContent `max-height: calc(100vh - 40px)` + flex column, (3) ModalTitle `flex-shrink:0` 상단 고정, (4) ModalForm `overflow-y: auto` 중앙만 스크롤, (5) ModalButtonRow `position: sticky; bottom:0` 하단 고정, (6) 모바일(≤640px) 풀스크린. 타이틀/버튼이 스크롤로 사라지던 문제 해소
- fix(admin/payment-settings): `GET/POST /api/admin/payment-settings` 응답을 `{success, data}` 표준으로 래핑. 에러 응답도 `{success:false, message}`로 정규화. 프론트에 legacy flat/새 래핑 둘 다 수용하는 defensive 언랩 — `admin-payment-settings.js`, `Admin/PaymentSettingsPage.tsx`

### 2026-04-11 (External QR + inventory adjust fix + hydration 검증 자동화)
- feat(settings): External QR 카드 신규 — Operations 탭에 커스텀 이름 QR 생성 섹션 추가. 파트너 가게, 호텔 로비, 사무실 등 외부 지점에 주는 QR. 이름(최대 20자) 입력 → SVG/PNG/Print/삭제. 손님이 스캔 시 모바일 메뉴 진입, 주문의 `table_number` 컬럼에 이름 그대로 저장(내부 테이블 QR과 동일 경로). 저장 위치: `table_settings.externalQRs: string[]` — DB 마이그레이션/백엔드 변경 0건
- fix(settings): External QR 카드 좌우 풀폭 — `gridColumn: 1 / -1`로 2열 SettingsGrid에서 한 행 통째 사용. 생성된 QR들은 `TablesGrid auto-fill minmax(180px, 1fr)`로 가로 wrap
- fix(mobile): OrderTypePage의 `Table {tableFromQR}` 하드코딩 제거 — 내부(`T001`)에선 prefix 중복이었고 외부(`Cafe Maru`)에선 어색했음. 이제 값 그대로 표시
- fix(settings): External QR runtime crash 수정 — legacy `localStorage.tableSettings` 캐시에 `externalQRs` 필드가 없어서 `setTableSettings(parsedSettings)` 로 통째 덮어쓰면서 `undefined.length` 접근. 함수형 업데이트 + 기본값 머지로 전환, JSX 5개 접근 모두 `(... || [])` 가드
- fix(inventory): `POST /api/restaurants/:id/inventory/adjust` 라우트가 `quantity`(incremental delta)만 받아서 프론트 인라인 편집(`new_quantity` absolute 전달)이 작동 안 함. 두 파라미터 모두 수용하도록 수정 (new_quantity 우선, 없으면 quantity 폴백, new_quantity=0 정상 처리). General Stock은 별도 라우트라 이미 정상이었음. long-standing 버그
- chore(검증): `/검증` 스킬 0단계 신규 — `dev-frontend/scripts/state-hydration-check.js` 정적 분석 스크립트. 새 state field 추가 시 legacy hydration source(localStorage/JSON.parse/fetch)에서 defensive merge 안 하면 warning, JSX에서 `.length`/`.map`/`.filter` 접근 시 `(... || [])` / `?.` 가드 없으면 warning. 위 External QR 버그를 자동 차단 가능. npm run check:hydration으로 실행

### 2026-04-11 (Phase C-6 + UX 정리 + repo hygiene)
- refactor(C-6): `components/Inventory/InventoryManager.tsx` 3141줄 → 26개 파일로 분할 (types/styles/utils + 11 hooks + 3 sections + 9 modals + 슬림 main 340줄). 공개 API 불변(`<InventoryManager mode restaurantId />`) — 2개 consumer 무수정. 패턴: hook = state+API capsule, mode 분기는 hook 내부에만, Add+Edit는 mode prop으로 통합
- fix(Inventory): 대시보드 카드 5 → 4 (Expiring Soon 제거 — 아래 Expiring Items 섹션과 중복)
- fix(Inventory): 9개 모달 모두 표준 `Modal footer={...}` prop 사용 → ButtonGroup이 body 안에 있어 본문 길어지면 사라지던 문제 해결, sticky footer + border-top
- fix(Inventory): 테이블 반응형 정렬 깨짐 — `& > div:nth-child(N)`은 MobileGrid의 `display: contents` 때문에 grandchildren에 도달 못 함. 클래스 기반(`.col-min`, `.col-cost`, `.col-supplier`, `.col-last`) 셀렉터로 교체. 1280px 미만에서 5컬럼으로 줄이고 Actions 컬럼 폭 160px → 260px로 4개 액션 버튼이 한 줄에 나란히
- fix(Inventory): 버튼에서 `+` prefix 제거 (Receive Stock / Record Waste / Add General Stock)
- fix(StatsGrid): 15개 페이지의 로컬 StatsGrid styled-component 표준화. 모두 `repeat(4,1fr) → ≤1024px repeat(2,1fr) → ≤768px repeat(2,1fr)` 패턴. 이전엔 12개가 `auto-fit minmax(200px,1fr)`로 모바일에서 1열로 무너지거나, AddonModulesPage는 ≤640px에서 명시적 1열이었음. 영향 페이지: Admin/{AddonModules,ContactInquiries,HardwareQuotes,RestaurantSubscriptions}, Brand/Foodcourt/Owner/Manager/Restaurant 5종 OperationInquiry, Manager/{Invoices,ManagerPromotions,ManagerSubscriptions,Sales,Subscriptions}, Owner/Notices
- chore(repo): `dev-frontend/public/static/`(4 파일) + `dev-frontend/nginx-build/`(138 파일) git untrack — Auto-commit이 잡아간 옛 빌드 산출물. CRA가 `public/`을 빌드에 그대로 복사하기 때문에 매 빌드마다 옛 main.js 해시가 함께 들어와 brower cache miss 시 ChunkLoadError 유발했음. 이제 단일 main.js만 출력
- chore(repo): `dev-frontend-build/` (495 파일) git untrack — 로컬 nginx 서빙 디렉토리. 매 빌드마다 거대 diff를 생성하던 hygiene 이슈. 디렉토리는 디스크에 남아 nginx 서빙 정상

### 2026-04-10 (저녁 — Phase C 구조 개선)
- refactor(C-3): Fetch 인터셉터 단일화 — `utils/httpClient.ts` 추출, `index.tsx` 시작 시 1회만 설치. `AuthContext`의 이중 fetch 패치 제거 → StrictMode/HMR 인터셉터 누락/중복 위험 해소
- refactor(C-4): `CustomerContext` 내부 분할 — `useMobileCustomerState` + `usePosCustomersState` + composite provider. 공개 API 불변으로 10개 consumer 수정 없음
- fix(C-4): 모바일 로그인 세션이 레스토랑 간 공유되던 버그 — localStorage 키를 slug별로 분리 (`mobile_customer:<slug>`, `mobile_token:<slug>`). SPA 네비게이션 시 `history.pushState` 패치로 `locationchange` 이벤트 발생 → 즉시 상태 재로드. 레거시(스코프 없는) 세션은 첫 로드 시 자동 정리
- refactor(C-5): 백엔드 5개 거대 라우트 파일 → 16개로 기능별 분할
  - `routes/customers.js` 1263 → barrel + self/admin/auth 3개
  - `routes/mobile.js` 1304 → barrel + helpers + public/orders 2개
  - `routes/orders.js` 2140 → barrel + crud/views/payment 3개
  - `routes/restaurants.js` 2204 → barrel + subscription/crud/ingredients 3개
  - `routes/invoices.js` 3170 → barrel + helpers + main/payment 2개 (routes/owner.js 호환 위해 getIssuerCompanyInfo/getPayerCompanyInfo 배럴 re-export)
- fix: `mobile-public.js`에서 `Order` import 누락 → `GET /popular/:slug` 500 에러 수정 (분할 회귀)
- chore: 63개 백엔드/셸 스크립트의 상태 이모지 ✅/❌ → 텍스트 문자 ✓/✗ 일괄 치환 (터미널 가독성)

### 🐛 추가 버그 수정 (2026-04-10 오후)
- fix: 모바일 메뉴 로딩 속도 개선 — `MenuPage.tsx` init 흐름 개편. 백그라운드 `limit=500` 전체 메뉴 호출 제거, 검색용 전체 메뉴는 검색창 포커스/입력 시 lazy load. 첫 호출 `limit=1`로 카테고리만 빠르게 받기
- fix: 모바일 AccountPage My Coupons에 본인 것이 아닌 매장 전체 공개 쿠폰까지 모두 표시되던 버그 — `routes/coupons.js` 응답을 `myCoupons`(명시적 타겟)/`promotions`(전체공개)/`available`(호환) 3개로 분리. AccountPage는 `myCoupons`만 표시
- fix: 모바일 멤버십 비활성 매장에서 points UI 숨김 — `AccountPage` `pointsEnabled` 기본값 `false`로 변경 (깜빡임 방지), `PaymentPage` 비회원 결제 폼의 "Register as a Member" 체크박스를 `membershipSettings?.is_active` 조건부로 변경
- fix: `routes/coupons.js GET /customer/:customerId` dual auth 적용 — POS Admin 또는 모바일 customer 본인 (IDOR 방어 포함)

### 🛡 보안 정석화 (Phase A)
- 익명 고객 DB 덤프/삭제/비밀번호 변경 차단 (`routes/customers.js` 라우트별 인증 정책)
- 모바일 주문 IDOR 차단 (`routes/mobile.js` GET /orders restaurant_id 필수)
- 결제 라우트 위변조 방어 — 30분 시간 윈도우 + 중복결제 방지 + PayPal orderId 검증 (`routes/orders.js`)
- inventory IDOR 차단 (`routes/inventory-routes.js` checkRestaurantAccess 적용)
- 사업자등록번호/은행계좌 무인증 노출 차단 (`routes/restaurants.js`)
- addon-modules GET 인증 추가
- 모바일 고객 JWT 시스템 신규 — `utils/customerJwt.js`, `middleware/customerAuth.js`
- POST /customers/auth, /register이 customer 토큰 발급
- 모바일 자가서비스 라우트 IDOR 방어 (`requireCustomerSelf`)
- 모바일 페이지에 `mobileFetch` 헬퍼 + `mobile_token` 분리 저장
- POS 관리자와 모바일 고객 세션 완전 분리

### 🔧 안정화 인프라 (Phase D)
- Sentry 에러 추적 도입 (프론트엔드 + 백엔드)
- 환경 자동 감지 (production/development), component 태그로 프론트/백 구분
- AuthContext 4곳에 user context 동기화 (login/checkSession/logout/switchUser)
- 백엔드 admin/customer 미들웨어 user context 자동 첨부
- 민감정보 자동 마스킹 (password, token, Authorization, cookie)
- ErrorBoundary 폴백 UI ("Try again" 버튼)
- Health-check 스크립트 신규 (`dev-backend/scripts/health-check.js`)
- 5개 카테고리 / 39개 자동 테스트 (auth/security/pos/mobile/payment)
- CLI 옵션 (--category, --quiet, --host, --verbose)
- CLAUDE.md에 검증 단계 마지막에 health-check 필수 실행 규칙 추가

### 🐛 깨진 기능 복구 (Phase B)
- fix: Activity Log Stats 500 에러 — `routes/activityLogs.js` sequelize 구조분해 import 누락 수정
- fix: NotificationSettings 잘못된 token 키 (`'token'` → `'auth_token'`) 3곳
- fix: POS 결제 모달 포인트 사용 UI 미노출 — PaymentModal에 `selectedCustomerId` prop 추가, 회원 선택 시 0 pts여도 적립 안내 표시
- fix: **인쇄 다이얼로그 이중 트리거** — `printHTMLContent`의 `iframe.onload`가 두 번 트리거되어 print 다이얼로그가 2번 큐잉되던 문제. 취소 시 두 번째가 즉시 표시되어 "취소해도 또 뜬다" 증상. doc.close() 직후 setTimeout 단일 호출 + hasPrinted flag로 해결. POS 결제/Bill/Kitchen/Settlement/Table QR 등 8개 인쇄 흐름 전체 영향.

---

## [v3.12] — 2026-04-09 배포
- Franchise & Tenancy Management Phase 1 구현 (DB 모델 7개, API 20개, 프론트 Pipeline/List/Detail)
- ContractManagementPage UI 개선: StatCard 색상 분리, ViewToggle 연회색, DatePeriodFilter 통합
- ContractPipeline 카드 정보 보강 (이름/전화/위치/타입/기간/진행률)
- ContractDetail 레이아웃 전체폭, 입력란 width:100%
- 레스토랑 연결 섹션 추가 (검색→선택→연결/해제)
- Notes → CommentSection 교체 (파일첨부, 읽음표시 통합)
- Document 업로드/다운로드/삭제 기능 (upload/files API 활용)
- 통합검색 서버사이드 전환 (코멘트 내용 포함 검색)
- URL 기반 상태 유지 (view/id → 새로고침 시 화면 유지)
- Settings 3개 페이지 AutoSaveField 적용 (InvoiceSettings, CompanySettings, CompanyProfile)
- AutoSaveField 아이콘 위치 점프 수정 + 즉시 spinner 반응
- Owner Plan 매니저 설정 필터 버그 수정
- Comment/CommentRead ENUM에 'contract' 추가
- CHANGELOG 시스템 도입
- fix: 프린터 설정 저장 안 되는 버그 수정 (store.js allowedFields에 printer_settings 누락)
- fix: ImageUploadDropzone 자동저장 안정화 (수동 triggerSave 추가)
- fix: 브라우저 간 설정 불일치 수정 (StoreContext auth-ready 이벤트 재로드)
- fix: LiveOrders 빌프린트 미리보기/출력 로고 누락 수정
- fix: StoreContext 기본값 'FOODCOURT CENTRAL' 제거
- fix: AuthProvider > StoreProvider 구조 변경 (모든 기기에서 설정 로드 안정화)
- fix: 영수증 인쇄 시 로고/멤버십QR/커스텀QR/푸터 누락 수정 (React state 직접 전달)
- fix: 멤버십 QR URL `/m/{id}` → `/mobile/{slug}/account` (올바른 프로필 페이지로 연결)
- fix: 영수증 QR 아래 불필요한 URL 텍스트 삭제
- fix: 멤버십 QR 외부 API 의존 제거 → 로컬 생성 (QRCode.toDataURL)
- fix: getStoreInfo()에 receiptSettings/slug/membershipQR 통합 (모든 인쇄 경로 통일)
- fix: QR Code Mode (Static/Session) 자동저장 안 되는 버그 수정
- fix: FloorPlan Print QR이 브라우저 인쇄 모드를 무시하던 버그 수정
- fix: Table QR 프린트 레이아웃 개선 + @page margin:0 + 시간/만료 표시 + 타임존 적용
- fix: QR Code Mode AutoSaveField 개별 라디오 감싸기 (클릭한 항목에 아이콘)
- fix: StoreContext URL 레스토랑 ID 변경 감지 (다른 레스토랑 데이터 혼재 방지)
- CLAUDE.md 타임존 규칙 추가, UI_DESIGN_GUIDE.md AutoSaveField 필수 규칙 추가

---

## [v3.10] — 2026-04-07 배포
- v3.10 다국어 시스템 (i18n) — 4개 언어 지원 (EN/KO/ZH/MS)
- react-i18next 인프라 + 용어집 + 검증 스크립트
- User.preferred_language + 언어 변경 API
- 160개 페이지 t() 래핑, 4,698키 x 4개 언어
- 언어 선택 UI (Landing globe, POS sidebar, Mobile, Login)
- 이메일 템플릿 다국어
