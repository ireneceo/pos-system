# Purple POS — 개발 세션 상태

## 현재 작업 상태
**마지막 업데이트:** 2026-05-11
**버전:** **v3.28** (사이드바 마이그레이션 운영 배포 완료, 버전 결정 보류 — Unreleased)
**작업 상태:** 완료 / 운영 배포 완료

---

## ⚡ 빠른 재개

```
session-state.md 읽고 이어서 개발해.
```

---

### 진행 중인 작업
- 없음

### 완료된 작업 (이번 세션 2026-05-11)

**사이드바 2단 구조 전면 리디자인 + 헤더 80px 통일 (운영 배포 완료)**
- 6 역할 (System Admin / Brand / Foodcourt / Owner / Supplier / Restaurant Admin) 모두 통일 2단 사이드바
- 1뎁스 카테고리 rail (`#EEF0F4`, lucide 라인 아이콘, 220/64px) + 2뎁스 sub-menu panel (white, 220px, collapse + hover popover)
- 헤더 80px strict (SidebarHeader / SecondaryHeader / PageHeader 모두 box-sizing border-box). 65개 페이지 자체 styled Header `height: 56px;` → 80px 일괄
- Operations 카테고리에 Purchase Order / Order History / Supplier Contracts 통합 (Order 별도 카테고리 제거)
- Reports 1뎁스 + 6 탭 sub-menu (`?tab=xxx` URL, matchPathBase/Full 매칭) — Brand / Foodcourt / Owner / Restaurant Admin
- 풀화면 메뉴 1뎁스 단독 + 새 창 (Restaurant Admin: POS Terminal / Floor Plan / Kitchen / Customer Display / Mobile Order, Foodcourt: Floor Plan)
- Mobile Order popup blocker fix (`window.open('about:blank') + async slug fetch → location.href`)
- Subtitle 제거 (Live Orders / Foodcourt Management / Reservations Timeline + PageHeader subtitle prop 무력화)
- 버그 fix: `/restaurant/:rid/customers` ReferenceError user is not defined (useParams restaurantId 교체), styled-components #12 keyframe css helper
- 검증: state hydration 0 warnings / 빌드 main.94886590.js 0 new warning / health-check 78/78 / Playwright 측정 (3 역할 헤더 80px + RailItem 정렬 확인)

**이전 누적 작업 (운영 배포 동시 포함)**
- Reservation 모듈화 + Settings UI 통일 (AddonModule reservations / PlanTemplate / requireRestaurantModule / PageSettingsLink)
- Reservation R1 결함 4건 fix (customer_id NULL / 이중 카운트 / PATCH 정책 우회 + backfill 스크립트)
- ManagersPage Edit SubscriptionFormFields 통합 + User.auto_renew 컬럼 추가
- RestaurantsPage SubscriptionFormFields 통합

### 운영 배포 (2026-05-11)
- 배포 스크립트 `/var/www/deploy-to-production.sh --auto` 완료
- production-backend pm2 online, purplehere.com 200, /api/health 200
- 블로그 콘텐츠 sync (43 row)
- **버전**: 결정 보류 — 사용자가 올릴지 결정 (현재 v3.28 그대로). 올리면 v3.29 (UX 큰 변경)

### 다음 할 일

1. **버전 결정** — v3.29 올릴지 (사이드바 UX 큰 변경) vs v3.28 유지 (backstage 처리). 올리면 CHANGELOG Unreleased → v3.29 이동 + 릴리즈 노트 / 블로그 / 공지 등록
2. 후속 후보:
   - Reservation R2 (deposit 결제 UI / 캘린더 monthly view / WaitingList / 보증금 자동 환불 cron)
   - Reservation 동시 booking race window — advisory lock
   - SubscriptionsPage Edit SubscriptionFormFields 통합 검토
   - PageSettingsLink i18n 4언어
   - 운영 demo 시드 ID 파라미터화 (트랙 C 운영 적용)
   - Foodcourt user 의 isRouteAllowed('/pos/foodcourt/general/reports') false 원인 확인 (plan 모듈 매핑 점검)

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
