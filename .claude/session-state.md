## 현재 작업 상태
**마지막 업데이트:** 2026-02-08
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- Restaurant-Admin 1:1 매칭 전체 구현 (Backend 5단계 + Frontend 5단계 + 마이그레이션)
  - Backend: POST/GET/PUT에 adminAction 지원, available-admins API, validation 미들웨어
  - Frontend: Admin/Manager RestaurantsPage Add/Edit/View 모달 재설계
  - Frontend: SubscriptionsPage Admin 정보 표시, StaffManagementPage 경고
  - Data: Brand/Foodcourt Manager → restaurant_managers 테이블 이동 마이그레이션
- 이전 세션 버그 수정 (RestaurantsPage 모달 오버플로우, SubscriptionsPage 검색/레이아웃)

### 다음 할 일
- 기존 11개 레스토랑에 Restaurant Admin 배정 (Edit 모달에서 수동)
- 데모 콘텐츠 보강
- 이메일 템플릿 (Welcome, Invoice)
- Blog 콘텐츠 추가

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
