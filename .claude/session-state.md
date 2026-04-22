# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-04-22
**버전:** v3.16 (미배포 Unreleased 누적 중)
**작업 상태:** 완료 (Subscriptions Pending Plan Change + FG Parity)

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

#### Contract Detail LinkedPlansSection 정리
- "View all plans" 버튼 추가 (ghost, 새 탭) + "Link existing plan" primary
- "↗" 화살표 제거, "+ Issue One-time Invoice"의 "+" 제거
- Create plan from contract 마법사 버튼 및 관련 로직 완전 제거
- contract.json 4개 언어에 누락된 `detail.viewAllPlans`, `viewAllPlansHint`, `linkExistingPlan`, `noLinkedPlansHint` 추가

#### Manager/RestaurantsPage Edit 모달 — Foodcourt General 전용 "Foodcourt Subscription" 섹션
- Tenancy Contract + Foodcourt Plan 2카드 (BG용 Brand Subscription 섹션 대칭)
- 인라인 피커 2개 (Tenancy Contract 검색+Link, Foodcourt Plan 검색+Link)
- `getCurrentFoodcourtId()` (JWT `user.foodcourt_id` 기준)
- 4언어 i18n 키 추가

#### Subscriptions 페이지 Pending Plan Change 플로우 (Brand + Foodcourt 동시)
- **DB**: `entity_plan_restaurants`에 `pending_plan_id`, `pending_activation_date` 컬럼 추가
- **Backend POST /plans/:planId/restaurants (brands+foodcourts)**:
  - 기존 active 없음 → 즉시 배정 (`assigned`)
  - 같은 플랜 재지정 → no-op (`already_assigned`, pending 초기화)
  - 다른 플랜 있음 → pending 스케줄 (`scheduled`, pending_activation_date = 다음 billing_day)
- **Backend GET /subscriptions**: `pending_plan` 필드 포함
- **신규 POST /plans/:planId/restaurants/:rid/cancel-pending** — 예정 변경 취소
- **Scheduler cron (2AM)**: pending_activation_date ≤ 오늘이면 entity_plan_id 스왑 + ActivityLog

#### 프론트 — BrandSubscriptionsPage + FoodcourtSubscriptionsPage (완전 미러)
- Add Subscription 모달 필터: 플랜 있는 레스토랑 드롭다운 제외 (전부 배정 시 안내 문구)
- FoodcourtSubscriptionsPage에 + Add Subscription 버튼 신규 추가 (이전엔 Export만)
- 버튼 silent 실패 수정: `actionError` 상단 토스트 + `assignError` 모달 inline
- Change Plan 모달에 "다음 청구 주기부터 적용" amber 경고
- Row "Scheduled change: X on YYYY-MM-DD" 배너 + Cancel 버튼
- 4언어 i18n 키 전체 추가

### 다음 할 일

#### 🧪 테스트 필요 — 이번 구현한 Pending Plan Change 플로우 (다음 세션 최우선)

**테스트 대상 페이지 3개**:
- `/pos/brand/general/subscriptions`
- `/pos/foodcourt/general/subscriptions`
- `/pos/manager/restaurants` (Edit 모달)

**브랜드 측 (Brand General 로그인):**
1. `/pos/brand/general/subscriptions` 이동
2. **Add Subscription** 클릭 → 드롭다운에 **플랜 없는 레스토랑만** 나오는지 확인
3. 기존 플랜 배정된 행 **Change** → 다른 플랜 → "다음 청구 주기부터 적용" amber 경고 뜨는지 → 저장
4. 저장 후 행에 **"Scheduled change: {플랜명} on {날짜}"** amber 배너 표시 확인
5. 배너 **Cancel** 버튼 → 확인 창 → 예정 변경 제거
6. Unassign(❌) → 제거 (에러 발생 시 상단 빨간 토스트 떠야 함)
7. **View** / **Set Discount** 동작 + 에러 시 토스트

**푸드코트 측 (Foodcourt General 로그인):**
1. `/pos/foodcourt/general/subscriptions` → **+ Add Subscription** 헤더 우측 버튼 확인
2. 클릭 → 모달 → 입점 레스토랑 + 플랜 선택 → 저장 → 행 추가 확인
3. 브랜드와 동일: Change → pending → Cancel → Unassign 플로우

**Manager 측 (Foodcourt General 로그인):**
1. `/pos/manager/restaurants` → Edit 클릭
2. 모달 하단에 **"Foodcourt Subscription"** 섹션 (FG 역할일 때만)
3. Tenancy Contract / Foodcourt Plan 카드 (없으면 amber "not linked" + Link existing 버튼)
4. **Link existing contract** → 피커 → 검색 → Link → 자동 리프레시 → 카드에 정보 표시
5. Link existing plan 동일
6. 피커 열려있을 때 Edit 모달이 유지되는지 (뒷배경 안 사라짐), 닫으면 Edit 모달 그대로

**엣지 체크:**
- 모든 레스토랑 배정된 상태에서 Add 눌렀을 때 안내 문구
- 권한 다른 ID 요청 시 403 반환 (DevTools Network)
- i18n: ko/en/zh/ms 언어 전환 시 모든 텍스트 번역 확인

**확인 후**: 문제 없으면 `/배포`, 문제 있으면 해당 부분 수정 후 재검증

#### 기타 대기
- 서비스 오픈 준비 로드맵 잔여 항목 (DEVELOPMENT_PLAN.md 하단)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
