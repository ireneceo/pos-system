# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-10
**버전:** **v3.27** (2026-05-08 운영 배포 — backstage cleanup 누적 미배포)
**작업 상태:** 완료 (Self-managed Restaurant 모드 — 미배포)

### 진행 중인 작업
- 없음

### 완료된 작업 (2026-05-10 세션)

**Self-managed Restaurant 모드 (backstage cleanup, 버전 미상승)**
- POST `/api/restaurants` 에서 `activate_subscription:false` 시 plan_type/plan_amount/billing_cycle/subscription_start/subscription_end/subscription_snapshot/limits 모두 NULL 명시 저장 (Restaurant 모델 default 자동 할당 회피)
- PUT 핸들러에 `wipeSubscription` 분기 추가 — 활성 → self-managed 전환 시 plan/billing/period + pending_* + plan_change_* 모두 NULL wipe + divertToPending 우회
- Frontend RestaurantsPage Add/Edit 모달의 plan/billing/period/auto-renew/trial 토글 섹션을 `activateSubscription` conditional 로 hide. Self-managed banner (회색 info box) 추가. 토글 텍스트에서 ⚠️ 이모지 제거
- Edit 모달에 `activateSubscription` 토글 추가 + plan_type 없는 매장 진입 시 OFF 자동 표시
- 목록 매장 row 에 `Self-managed` 배지 (plan_type IS NULL 일 때 회색 배지)
- i18n 4언어 6개 키 추가 (`restaurantsPage.activateSubscription.*`, `restaurantsPage.selfManaged.*`)
- 검증: API 실호출 18/18 통과 (POST/GET/PUT 활성↔self-managed 양방향 + invoice 자동 생성↔skip + DB raw NULL 확인). health-check 73/73 통과
- 의도: BG/FG/Owner 가 본인 산하 매장을 시스템에 등록할 때 POS 구독 강제 없이 데이터 관리 전용으로 등록 가능. 추후 Edit 으로 구독 활성화

### 이전 세션 완료 작업 (v3.27, 2026-05-08)

**Sprint 1 — FG 온보딩 + Walkthrough 시스템 신규**
- User.tutorial_progress JSON 컬럼 + GET/PUT API
- `<Walkthrough>` overlay/spotlight/tooltip 자체 구현 + `<TourTrigger>` 헤더 버튼
- useSetupStatus FG path 정합 + SetupGuide locked 클릭 차단
- FG 5 페이지 EmptyState 통일 + steps 가이드
- i18n 4언어 walkthrough.json
- 설계 문서 `docs/FG_ONBOARDING_v3.26.md`

**Sprint 2 — 트랙 C 데모 데이터 시드**
- FC44 12 units + 2 tenants + 6 contracts
- Owner 4 매장 cats/prods/orders
- BG B10/B1 brandProducts 시드
- R38 30일 시계열 주문 + 모든 회사정보 정합
- 5 idempotent seed scripts

**Sprint 3 — 5 역할 Walkthrough 확장**
- MainLayout 17개 NavItem data-tour 부착
- 5 dashboard (RA/BG/Owner/Admin/Supplier) Walkthrough mount + step 정의
- i18n 4언어 27 step entries

**Sprint 4 — Subscription Form 통일 (v3.27)**
- User 모델에 discount_type/value/reason 컬럼 추가
- routes/users.js POST/PUT discount 처리 + SUBSCRIBING_ROLES 에 Supplier Admin
- `<SubscriptionFormFields>` 9-필드 통합 컴포넌트
- SubscriptionsPage / ManagersPage Add modal 통일
- i18n 4언어 subscription.json
- 설계 문서 `docs/SUBSCRIPTION_FORM_UNIFY_v3.27.md`

**v3.27 운영 배포**
- 운영 sites 7/7 200 + DB 자동 sync (tutorial_progress / discount_*)
- CHANGELOG `[Unreleased]` → `[v3.27] — 2026-05-08 배포` 이동
- 버전 v3.24 → v3.27 일괄 점프
- 랜딩 블로그 `/blog/release-v3.27` + System Admin 공지 자동 등록

### 다음 할 일

1. **운영 demo 시드 ID 파라미터화** (트랙 C 운영 적용)
   - 운영 demo 계정 ID 가 dev 와 다름 (FC44→FC1, B10→B4, R38→R13, SC20→SC1)
   - 시드 스크립트를 환경변수/인자로 ID 받게 리팩터 후 운영 적용
2. **RestaurantsPage Add/Edit 의 SubscriptionFormFields 통합** (현재 잘 동작하는 분리 form 을 통일된 컴포넌트로 교체)
3. **SubscriptionsPage / ManagersPage 의 Edit modal** 도 SubscriptionFormFields 사용으로 교체 (이번 sprint 는 Add 만)
4. **Walkthrough 적용 페이지 확장** — 메뉴 / 설정 등 dashboard 외 페이지에도 step-by-step 안내 (사용자 요청 시)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
