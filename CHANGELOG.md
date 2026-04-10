# Changelog

> 배포 전 개발 내역을 추적합니다. `/개발완료` 시 자동 추가, `/배포` 시 버전으로 이동.

---

## [Unreleased] — 미배포 (개발서버만)

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
