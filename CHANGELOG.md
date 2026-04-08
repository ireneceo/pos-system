# Changelog

> 배포 전 개발 내역을 추적합니다. `/개발완료` 시 자동 추가, `/배포` 시 버전으로 이동.

---

## [Unreleased] — 미배포 (개발서버만)

### 2026-04-08
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
- 버튼 "+" 텍스트 제거
- Pipeline Setup 컬럼 색상 분리 (보라색)
- CHANGELOG 시스템 도입
- 입력란 width:100% + box-sizing 수정 (ContractDetail)
- view/selectedId URL 파라미터 유지 (새로고침 시 화면 복원)

---

## [v3.10] — 2026-04-07 배포
- v3.10 다국어 시스템 (i18n) — 4개 언어 지원 (EN/KO/ZH/MS)
- react-i18next 인프라 + 용어집 + 검증 스크립트
- User.preferred_language + 언어 변경 API
- 160개 페이지 t() 래핑, 4,698키 x 4개 언어
- 언어 선택 UI (Landing globe, POS sidebar, Mobile, Login)
- 이메일 템플릿 다국어
