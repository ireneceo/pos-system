## 현재 작업 상태
**마지막 업데이트:** 2026-03-06
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)
1. Activity History: DatePeriodFilter 통합 컴포넌트 적용
2. Features 페이지: 역할별 heading + description 분리, 경쟁력 있는 문구로 변경
3. Manager StaffManagement → AdminManagement: Brand/Foodcourt General에서 Staff 관리 완전 제거
4. 사이드바/라우트: `/pos/manager/staff` → `/pos/manager/admins`, "Admin & Staff" → "Restaurant Admins" (9개 파일)
5. Brand/Owner Performance: Avg Service Time → Avg Fulfillment (served_at 기반 계산)
6. Orders API: start_date/end_date 쿼리 파라미터 지원 추가
7. Features 이미지: PNG→webp 변환 113개, Restaurant+Brand 역할 이미지 count 업데이트
8. Inquiry 모듈 카테고리: System Inquiry/Operation Inquiry/Inquiry Management를 모든 역할에서 basic → advanced (DB + FeaturesPage + 설계문서)
9. 관련 문서 전체 업데이트 (DEVELOPMENT_PLAN, FEATURE_BASED_SUBSCRIPTION_PLAN, MEMORY)

### 다음 할 일 (우선순위 순)
1. **모달 푸터 고정 통일** — 자체 모달을 공통 Modal 컴포넌트로 마이그레이션 (22개 파일)
   - 1차: Restaurant Admin 5개 페이지
   - 2차: Brand General 5개 페이지
   - 3차: Manager 7개 페이지
   - 4차: Foodcourt + 기타 5개 페이지
   - 상세: DEVELOPMENT_PLAN.md "모달 푸터 고정 통일" 섹션 참조

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
