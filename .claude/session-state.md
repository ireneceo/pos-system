# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-08
**버전:** **v3.27** (2026-05-08 운영 배포 — Subscription Form 통일 + 5 역할 walkthrough + FG 온보딩 + 데모 데이터 정합)
**작업 상태:** 완료

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션)

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
