## 현재 작업 상태
**마지막 업데이트:** 2026-03-04
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
- /login → /pos URL 통합 (라우트 제거, 모든 참조 변경)
- System Inquiry 필터 추가 (Brand/Foodcourt) — 검색+우선순위+카테고리 필터 SupportPage 기준 통일
- 빈 상태 메시지 추가 (Manager/Restaurant/Admin SystemInquiry, Restaurant SupportTickets, Manager OperationInquiry)
- 로그아웃 후 403 반복 에러 수정 (BrandGeneral/FoodcourtGeneral 대시보드 토큰 체크)
- 데모 데이터 시스템 구축 계획 DEVELOPMENT_PLAN.md에 기록

### 다음 할 일
- 데모 데이터 시스템 구축 (Foodcourt General, Restaurant Owner 데모 계정 + 시딩 + 크론잡)
- DEVELOPMENT_PLAN.md Phase A/B/C 로드맵 잔여 작업
- entity_plan_charges 테이블 운영서버 마이그레이션 (스키마 차이 존재)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
