# FG Onboarding & Walkthrough System (v3.26)

> 2026-05-08 시작 · backstage cleanup · 버전 미상승 후보

## 1. 배경 / 문제 정의

Foodcourt General(FG) 역할이 처음 가입 후 대시보드에 도착하면:

- **링크 불일치** — `useSetupStatus.ts` 의 setup checklist 가 가리키는 path 들이 `App.tsx` 라우트와 어긋남:
  - `/pos/foodcourt/general/branches` → 실제 라우트 `/pos/foodcourt/branches`
  - `/pos/foodcourt/general/floor-plan` → 실제 라우트 `/pos/foodcourt/floor-plan`
  - 결과: Setup Guide 카드 클릭 시 ProtectedRoute 가 못 잡고 fallback 또는 빈 상태로 빠짐
- **Floor Plan 진입 시 prerequisite 안내 부재** — branch 0건이면 select 가 비어 보이고 "Edit Layout" 버튼이 숨겨져, 사용자는 어디로 가야 하는지 알 수 없음
- **잠긴 항목 잠금이 시각만(opacity)** — 의존성 위반해서 클릭하면 그대로 navigate 되어 헤맴 ("never block the user, just guide them" 의도였으나 안내가 실패)
- **튜토리얼/투어 시스템 부재** — 첫 사용자가 사이드바·핵심 페이지를 한눈에 둘러보는 step-by-step coachmark 없음. WelcomeModal 1회성만 존재

## 2. 목표

1. FG 첫 사용자가 **3분 안에** 회사정보 → 지점 → Floor Plan → 테넌트 등록 흐름을 자기주도로 완료
2. 데이터 0건 페이지에 도달했을 때 **항상** "다음으로 무엇을 하면 되는지" 가 화면에 보임
3. **Walkthrough(coachmark) 시스템** 신규 — 헤더 "Show me around" 버튼으로 언제든 재시청
4. FG 에서 검증한 패턴을 **다른 역할(RA/BG/Owner/Supplier)** 로 동일하게 확장 가능한 구조

비목표(이번 sprint 제외):
- 다른 역할(RA/BG/Owner/Supplier) walkthrough 적용 — 후속 sprint
- 데모 데이터 audit/보강 — 별도 문서 `docs/DEMO_DATA_AUDIT_v3.26.md`

## 3. 화면/UX 설계

### 3.1 첫 진입 흐름 (FG 신규 가입)

```
가입 → 첫 로그인 → /pos/foodcourt/general/dashboard 진입
  │
  ├─ WelcomeModal (기존 유지) ─ 모든 setup item 0/N 일 때만
  │   ├─ "Start Setup" → 첫 미완료 항목 path 로 navigate
  │   └─ "Take a tour" (신규) → Walkthrough 즉시 시작
  │   └─ "I'll explore on my own" → modal 닫기 + Walkthrough 자동 시작 안 함
  │
  ├─ SetupGuide (기존 + 정합화) ─ 미완료 1건 이상이면 표시
  │   ├─ 각 카드 클릭 → 정확한 라우트로 이동
  │   └─ 잠긴 카드 클릭 → toast "X 를 먼저 완료해 주세요" + 차단
  │
  └─ Walkthrough (신규) ─ tutorial_progress.fg_dashboard 가 미완료일 때 자동 시작
      ├─ 5 step 사이드바/대시보드 영역 spotlight + tooltip
      └─ 완료 / Skip → progress 저장 → 다음 로그인부턴 자동 시작 안 됨
```

### 3.2 Walkthrough 5 step (FG 대시보드)

| # | 타겟 (selector) | 제목 | 설명 |
|---|-----------------|------|------|
| 1 | `[data-tour="sidebar-company-info"]` | "회사 정보부터" | "사업자번호·세금ID·연락처를 등록하면 인보이스를 발행할 수 있어요" |
| 2 | `[data-tour="sidebar-branches"]` | "지점을 등록하세요" | "푸드코트 지점(location)이 있어야 Floor Plan과 테넌트를 배치할 수 있어요" |
| 3 | `[data-tour="sidebar-floor-plan"]` | "Floor Plan 설정" | "지점의 유닛(자리) 배치를 그리면 테넌트를 시각적으로 관리할 수 있어요" |
| 4 | `[data-tour="sidebar-tenancy"]` | "테넌트(입점 매장) 추가" | "기존 매장을 연결하거나 새로 만들어 푸드코트에 입점시켜요" |
| 5 | `[data-tour="header-tour-trigger"]` | "언제든 다시 보기" | "헤더의 'Show me around' 버튼으로 이 투어를 다시 볼 수 있어요" |

### 3.3 Walkthrough 컴포넌트 비주얼

- **Backdrop**: `rgba(10,37,64,0.55)` 반투명, 전체 화면
- **Spotlight**: 타겟 element 의 `getBoundingClientRect()` 위치에 4-rect overlay (clip-path 보다 호환성 ↑)
- **Tooltip**: 흰색 카드, 320~400px, 화살표 8px, 그림자 `0 8px 24px rgba(0,0,0,0.15)`
- **컨텐츠**: 진행도 (1/5) · 제목 · 설명 · `Back / Skip / Next` 버튼
- **마지막 step**: `Got it!` 단일 버튼 + "Don't show again" 자동 처리(완료 = 자동 don't show)
- **포지션 자동 결정**: 타겟 위/아래/좌/우 viewport 여백 비교해서 가장 큰 곳

### 3.4 EmptyState 통일 (FG 5 페이지)

| 페이지 | 0건 조건 | EmptyState 표시 |
|--------|---------|----------------|
| FoodcourtBranchesPage | branches.length === 0 | title="첫 지점을 등록하세요" / description="푸드코트의 위치(지점)를 먼저 등록해야 Floor Plan과 테넌트를 추가할 수 있어요" / primary="Add Branch" → openNew |
| FoodcourtFloorPlanPage | branches.length === 0 | title="지점이 없습니다" / primary="Create Branch" → /pos/foodcourt/branches |
| FoodcourtFloorPlanPage | branches > 0 && floorPlans.length === 0 (canEdit) | title="Floor Plan 이 비어있어요" / primary="Edit Layout" → editor |
| FoodcourtTenancyMapPage | branches 또는 units 0건 | title="유닛이 없습니다" / steps=[1.지점 등록 2.Floor Plan 작성 3.테넌트 배치] |
| TenancyManagementPage / RentManagement | restaurants 0건 | title="아직 입점 매장이 없습니다" / primary="Add Tenant" / secondary="View Floor Plan" |

### 3.5 헤더 TourTrigger

- 위치: MainLayout 헤더 우측 (사용자 메뉴 옆)
- 라벨: 작은 아이콘(`?` 또는 `★`) + "Show me around" 텍스트 (sm: 텍스트 숨김)
- 동작: 현재 페이지에 등록된 tour 가 있으면 강제 시작 (`forceShow=true` + progress 무시), 없으면 비활성

## 4. 기술 설계

### 4.1 DB 스키마

```js
// models/User.js — 추가 컬럼
tutorial_progress: {
  type: DataTypes.JSON,
  allowNull: true,
  defaultValue: null,
  comment: 'Per-tour completion state. { [tourKey]: { completed, skipped, last_seen, version } }'
}
```

`tour_key` 네이밍: `<role_short>_<context>` — `fg_dashboard`, `fg_floor_plan`, `ra_dashboard` 등.
`version` 필드는 step 구성이 크게 바뀌었을 때 재시청 강제용 (이번 sprint 는 v1).

마이그레이션: `sync-database.js` (개발) + `ALTER TABLE users ADD COLUMN tutorial_progress JSON NULL` (운영, 배포 시).

### 4.2 Backend API

```
GET  /api/users/me/tutorial-progress
  → { success: true, data: { fg_dashboard: { completed: true, ... } } }
PUT  /api/users/me/tutorial-progress
  body: { tour_key: 'fg_dashboard', completed?: bool, skipped?: bool, version?: number }
  → 해당 tour_key 만 patch (다른 키 보존)
```

위치: `routes/users.js` — 기존 `/language` 엔드포인트 바로 아래 (`/:id` 라우트 *위*에 둬야 함, Express 라우팅 순서 함정 회피).
인증: `authenticateToken` 만 — 자기 자신만 read/write.

### 4.3 Frontend 컴포넌트 신규

```
components/Walkthrough/
  Walkthrough.tsx       — overlay/spotlight/tooltip rendering
  TourTrigger.tsx       — 헤더 "Show me around" 버튼
  index.ts              — re-export
hooks/
  useTourProgress.ts    — GET/PUT progress + 강제 시작 신호 (CustomEvent)
locales/{en,ko,ms,zh}/walkthrough.json — 신규 namespace
```

#### 4.3.1 Walkthrough props

```ts
interface TourStep {
  selector: string;          // querySelector 대상
  title: string;
  description: string;
  position?: 'auto' | 'top' | 'bottom' | 'left' | 'right';
  scrollIntoView?: boolean;  // 기본 true
}

interface WalkthroughProps {
  tourKey: string;           // ex 'fg_dashboard'
  steps: TourStep[];
  version?: number;          // default 1
  /** false 면 자동 시작 안 함 (헤더 트리거 전용) */
  autoStart?: boolean;
}
```

자동 시작 조건: `autoStart=true` && `progress[tourKey].completed!==true && skipped!==true && version 일치`.
강제 시작: `window.dispatchEvent(new CustomEvent('walkthrough:start', { detail: { tourKey } }))` — Walkthrough 가 listen.

#### 4.3.2 useTourProgress

```ts
function useTourProgress() {
  const [progress, setProgress] = useState<Record<string, ...>>({});
  // GET /api/users/me/tutorial-progress 1회 fetch (mount)
  // setStep(tourKey, patch) → optimistic + PUT
  // startTour(tourKey) → CustomEvent dispatch
  return { progress, loading, setStep, startTour };
}
```

### 4.4 useSetupStatus 라우트 정합화

| key | 현재 path | 수정 path |
|-----|-----------|-----------|
| company_info | `/pos/foodcourt/company-info` | (그대로) |
| first_branch | `/pos/foodcourt/general/branches` | `/pos/foodcourt/branches` |
| fc_floor_plan | `/pos/foodcourt/general/floor-plan` | `/pos/foodcourt/floor-plan` |
| tenant_restaurants | `/pos/foodcourt/general/management` | (그대로) |

### 4.5 SetupGuide 잠금 강제

`SetupGuide.tsx` line 80 `onClick={() => navigate(item.path)}` 변경:

```tsx
onClick={() => {
  if (locked) {
    showToast(`Complete ${blockingDeps[0].label} first`);
    return;
  }
  navigate(item.path);
}}
```

토스트 인프라는 기존 `useToast` (있는지 확인) 또는 가벼운 자체 alert 한 줄. 이번 sprint 는 보수적으로 alert/transient inline message 로.

### 4.6 data-tour 속성 부착 위치

- `MainLayout.tsx` FG 사이드바 NavItem 들에 `data-tour="sidebar-company-info"` 등
- 헤더 TourTrigger 자체에 `data-tour="header-tour-trigger"`

CSS 선택자가 안정적이도록 element 직접 ID 가 아닌 data-attribute 채택.

## 5. 작업 순서 (의존성 그래프)

```
[1] User.tutorial_progress 컬럼 + sync-database
        ↓
[2] routes/users.js GET/PUT tutorial-progress
        ↓
[3] hooks/useTourProgress
        ↓
[4] components/Walkthrough + TourTrigger + i18n
        ↓
[5] useSetupStatus 라우트 정합 + SetupGuide 잠금 강제
[6] FG 5 페이지 EmptyState 통일 (병렬 가능)
[7] MainLayout 사이드바 data-tour + 헤더 TourTrigger 통합
[8] FoodcourtGeneralDashboard 에 Walkthrough mount + steps 정의
        ↓
[9] 검증: API 실호출 + 빌드 + health-check + UI 흐름 시뮬
```

## 6. 검증 시나리오

| # | 시나리오 | 기대 |
|---|---------|------|
| 1 | API: PUT 으로 `fg_dashboard` completed=true 저장 → GET 재조회 | data.fg_dashboard.completed === true |
| 2 | API: 다른 tour_key 추가 PUT | 기존 키 보존 (merge) |
| 3 | API: 익명 PUT | 401 |
| 4 | API: 다른 user 의 progress 조회 시도 | 자기 자신 외엔 endpoint 자체가 me 전용이라 N/A |
| 5 | UI: Setup Guide 4 카드 모두 정확한 라우트 200 | App.tsx 와 일치 |
| 6 | UI: 잠긴 카드 클릭 | toast/alert 표시 + navigate 차단 |
| 7 | UI: branch 0건 FG → /pos/foodcourt/floor-plan | EmptyState + "Create Branch" CTA → 클릭 → /pos/foodcourt/branches |
| 8 | UI: FG 신규 가입 → 대시보드 → Walkthrough 자동 시작 | 5 step 진행 가능, Got it 클릭 시 progress.completed=true |
| 9 | UI: 재로그인 → Walkthrough 자동 시작 안 됨 / TourTrigger 클릭 시 강제 표시 | 정상 |
| 10 | health-check 73건 | 전건 PASS |
| 11 | 빌드 | exit 0, 경고 누적 잔여 허용 (이번 sprint 신규 origin 0) |

## 7. 후속 sprint

- B5(다른 역할 walkthrough 확장) — RA/BG/Owner/Supplier 각 dashboard step 정의 + 동일 인프라 재사용
- 트랙 C — 데모 데이터 audit + 운영DB 동기화 (`docs/DEMO_DATA_AUDIT_v3.26.md`)
- 분석: tutorial_progress 집계 — 첫 user 이탈 step 모니터링 (옵션, 별도 sprint)

## 8. 영향받는 파일

**Backend (3)**
- `models/User.js` — tutorial_progress 컬럼
- `routes/users.js` — GET/PUT tutorial-progress
- `sync-database.js` 자동 동기화

**Frontend (10)**
- `hooks/useTourProgress.ts` (신규)
- `hooks/useSetupStatus.ts` — 라우트 정합
- `components/Walkthrough/Walkthrough.tsx` (신규)
- `components/Walkthrough/TourTrigger.tsx` (신규)
- `components/Walkthrough/index.ts` (신규)
- `components/Common/SetupGuide.tsx` — 잠금 강제
- `components/Layout/MainLayout.tsx` — data-tour + TourTrigger 통합
- `pages/FoodcourtGeneral/FoodcourtGeneralDashboard.tsx` — Walkthrough mount
- `pages/FoodcourtGeneral/FoodcourtBranchesPage.tsx` — EmptyState
- `pages/FoodcourtGeneral/FoodcourtFloorPlanPage.tsx` — EmptyState
- `pages/FoodcourtGeneral/FoodcourtTenancyMapPage.tsx` — EmptyState
- `pages/FoodcourtGeneral/TenancyManagementPage.tsx` — EmptyState

**i18n (4)**
- `public/locales/{en,ko,ms,zh}/walkthrough.json` (신규)
- `public/locales/{en,ko,ms,zh}/foodcourt.json` — emptyState 키 보강
