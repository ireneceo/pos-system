# Changelog

> 배포 전 개발 내역을 추적합니다. `/개발완료` 시 자동 추가, `/배포` 시 버전으로 이동.

---

## [Unreleased] — 미배포 (개발서버만)

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
