## 현재 작업 상태
**마지막 업데이트:** 2026-03-28
**작업 상태:** 완료
**버전:** v3.7

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- 비밀번호 자동 생성 통일 (Manager/Restaurant Admin 생성 시 서버 자동 생성)
- 비밀번호 리셋 버그 수정 (프론트가 백엔드 응답의 tempPassword 사용)
- Password Generated 모달 통일 (8개 페이지 Copy 버튼 + monospace 패턴)
- OK 버튼 중복 수정 (ManagersPage)
- 관리자 생성 계정 이메일 인증 skip (email_verified=true)
- Admin 대시보드 데모/테스트 필터링 (실제 통계만 표시)
- Brand/Foodcourt 자동 생성 제거 (유저 생성 시 → 본인이 직접 추가)
- Brand Management Owner→Description 컬럼 변경
- 빌드 스크립트 개선 (sourcemap 제거, 메모리 증설, 시간 표시)
- StaffManagementPage is_demo/is_test 타입 에러 수정

### 다음 할 일
- DEVELOPMENT_PLAN.md 기반 다음 기능
- 데모 데이터 Phase 2 (Foodcourt/Owner 데모 계정) 또는 재료/재고/발주 시스템 Phase 2

---

## 복구 가이드
```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
