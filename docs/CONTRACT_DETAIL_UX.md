# Contract Detail UX — Tab → Accordion 전환

**작성일:** 2026-04-19
**대상:** `components/Contract/ContractDetail.tsx`
**범위:** Brand Franchise Management / Foodcourt Tenancy Management 상세 페이지

---

## 1. 문제 정의

현재 탭 구조(`Parties | Contract | Setup | Documents`)에서 발견된 UX 결함:

1. **필수 필드가 다른 탭에 숨어있음** — 버튼 disabled 사유가 현재 화면에 없음 (Nielsen #1 Visibility 위반)
2. **계약서라는 단일 문서를 4개 독립 영역으로 분절** — 사용자 멘탈 모델 불일치 (Nielsen #2)
3. **진행도/완료도 스캔 불가능** — 어느 섹션이 완료됐는지 탭마다 클릭해봐야 앎
4. **"침묵의 disabled"** — 버튼을 눌러도 반응 없음. 접근성 문제.

---

## 2. 해결 패턴 — Smart Accordion

### 2.1 레이아웃

```
┌─ Stage Strip ───────────────────────────────────┐
│ Proposal → Contracting → Setup → Active         │  (현 HeaderActions 유지)
├─────────────────────────────────────────────────┤
│ ⚠ 4 required fields missing — [Contract (3)] [Documents (1)] │  (RequiredBanner)
├─────────────────────────────────────────────────┤
│ ▼ Parties                       [✓ Complete]     │  (AccordionSection)
│   Applicant Information                          │
│   Issuer Information                             │
│   Link Restaurant                                │
├─────────────────────────────────────────────────┤
│ ▼ Contract                      [⚠ 3 required]   │  ← 자동 펼침
│   Contract Info                                  │
│   Financial Terms                                │
│   Special Conditions                             │
│   Renewal / Exclusivity / Legal                  │
├─────────────────────────────────────────────────┤
│ ▶ Setup                         [— Not yet]      │  (스테이지 따라 접근)
│   Support Services                               │
│   Setup Checklist                                │
├─────────────────────────────────────────────────┤
│ ▶ Documents                     [⚠ 1 required]   │
├─────────────────────────────────────────────────┤
│ Comments (always open, full width)               │
│ History Timeline (always open, full width)       │
└─────────────────────────────────────────────────┘
```

### 2.2 섹션 상태 뱃지

| 상태 | 표시 | 조건 |
|------|------|------|
| `complete` | `✓ Complete` (초록) | 해당 섹션에 필수 필드 없거나 모두 채움 |
| `required` | `⚠ N required` (노랑) | 이 섹션에 다음-스테이지 전환 필수 부족 N개 |
| `optional` | `— Optional` (회색) | 필수 없지만 정보 있음 |
| `empty` | `— Not started` (회색) | 필수 없고 정보도 없음 |

### 2.3 동작 규칙 (실제 구현 반영, 2026-04-19)

1. **초기 상태**: **모든 섹션 접힌 채 진입** (auto-expand 제거 — Irene 피드백: 전체 리스트를 보고 직접 펼침). URL `?section=...` 파라미터가 있으면 해당 섹션만 펼침
2. **계약 변경 시 URL section 초기화**: 카드 클릭으로 새 계약 진입 시 `?section=` 자동 제거 — 이전 상태 섞이지 않음
3. **동시 펼침 허용**: exclusive 아님. 여러 섹션 동시 열기 가능
4. **배너 클릭 네비게이션**: `[Contract (3)]` 칩 클릭 → 해당 섹션 펼침 + 스크롤 + 첫 missing 필드 하이라이트 (시각 하이라이트는 P1 과제)
5. **Save 버튼 정책 변경**: 버튼 disabled 제거, 클릭시 missing 있으면 해당 섹션 자동 펼침 + 스크롤
6. **AutoSaveField**: 기존 동작 유지 (blur 시 필드 단위 저장)
7. **시각 스타일 (실제 구현)**: 외곽 박스 없음, 섹션 사이 `border-bottom 1px` 만. Panel 배경 투명 — 안쪽 `<Section>` 카드들이 자기 영역 제공
8. **Accordion 하단 여백**: `margin-bottom: 20px` (Notes & Comments 카드와 분리)

### 2.4 Comments 섹션 통합

- 기존: `<SectionTitle>Notes & Comments</SectionTitle>` + `<SectionTitle>Comments (N)</SectionTitle>` 중복 제목, 경계선 2개
- 변경: CommentSection에 `titleText` prop 도입 → `Notes & Comments (N)` 단일 표시
- `$embedded` 스타일 전환 — titleText 있을 때 border-top/margin-top 제거 (기존 standalone 사용처는 영향 없음)

---

## 3. 섹션 매핑

| Accordion 섹션 | 포함 하위 섹션 | 다음-스테이지 필수 필드 (실제 반영) |
|---------------|---------------|----------------------|
| **Parties** | Applicant Info, Issuer Info, Link Restaurant, (Foodcourt만) Link Unit | `applicant_company_name` OR `applicant_contact_person` (→contracting), `restaurant_id` (→active), Foodcourt: `unit_id` (→setup) |
| **Contract** | Contract Info, Financial Terms, Special Conditions, Renewal/Exclusivity/Legal | `contract_number`, `start_date`, `end_date` (→setup) |
| **Setup** | Support Services, Setup Checklist | `is_required=true` 인 task 전부 완료 (→active). is_required=false 는 자유 |
| **Documents** | Documents | **없음** (Irene 피드백: 외부 DMS 사용 가능하므로 문서 업로드는 권장이지 필수 아님) |

**필수 계산 함수** (기존 `getMissingForNextStage` 확장):
```ts
type SectionKey = 'parties' | 'contract' | 'setup' | 'documents';

interface SectionRequirement {
  section: SectionKey;
  fieldKey: string;       // 필드 식별자 (스크롤 타겟용)
  label: string;          // 사용자 표시명
}

function getSectionRequirements(
  form: Contract,
  contract: Contract,
  nextStage: string | null
): SectionRequirement[]
```

---

## 4. 신규/수정 컴포넌트

### 4.1 신규: `<FormAccordion>` / `<FormAccordionSection>`

**위치**: `components/UI/FormAccordion.tsx`

```tsx
<FormAccordion>
  <FormAccordionSection
    id="parties"
    title="Parties"
    status="complete | required | optional | empty"
    statusLabel="✓ Complete" | "⚠ 3 required"
    defaultExpanded={boolean}
    onToggle={(expanded) => ...}
  >
    {children}
  </FormAccordionSection>
</FormAccordion>
```

- 섹션 헤더 클릭 토글
- Status 배지 color token: green/amber/gray
- Sticky 헤더 (`position: sticky; top: 0; z-index: 10;`)
- Chevron ▶/▼ 애니메이션
- 반응형: 모바일에서도 동일 동작, 헤더 sticky 유지

### 4.2 신규: `<RequiredBanner>`

**위치**: ContractDetail 내부 styled 컴포넌트 (단일 사용)

- 상단 고정 배너, nextStage 전환에 필요한 missing 요약
- 섹션별 집계 칩: `[Contract (3)]` 클릭 → scroll-and-expand
- 모든 필수 충족 시: `✓ Ready to move to Setup` (초록 배너)
- Active 스테이지엔 표시 안 함

### 4.3 수정: 기존 `<Section>` / `<SectionTitle>`

- Accordion 내부 서브섹션에서 그대로 재사용 (제거하지 않음)
- 하위 그룹 헤더는 기존 `<SubsectionTitle>` 유지

### 4.4 수정: `ContractDetail.tsx`

**제거**: `<TabNav>` / `<Tab>` / `activeTab` state / `changeTab()` / URL `?tab=` 읽기/쓰기
**유지**: `HeaderActions`, `form` state, `handleAutoSave`, `missingRequired` 계산, 모든 섹션 마크업
**추가**:
- `getSectionRequirements()` 함수 (섹션-필드 매핑 반환)
- `expandedSections: Set<SectionKey>` state
- `handleBannerClick(section)` — scroll + expand
- `handleSaveAttempt()` — missing 있으면 섹션 펼침/스크롤/하이라이트, 없으면 실제 저장

### 4.5 URL 상태 이관

기존 `?tab=parties` → `?section=parties` (열린 섹션 기록, 뒤로가기 복원)

---

## 5. 스테이지별 시나리오

### 5.1 Proposal → Contracting
- **필수**: `applicant_company_name`
- **Accordion**: Parties 자동 펼침, Contract/Setup/Documents 접힘
- **배너**: `⚠ 1 required — [Parties (1)]`

### 5.2 Contracting → Setup (Brand)
- **필수**: `contract_number`, `start_date`, `end_date`
- **배너**: `⚠ 3 required — [Contract (3)]`
- Documents는 선택 (외부 DMS 사용 가능 — Irene 피드백)

### 5.2-fc Contracting → Setup (Foodcourt)
- **필수**: `contract_number`, `start_date`, `end_date`, **`unit_id` (P0 반영)**
- **배너**: `⚠ 4 required — [Contract (3)] [Parties (1: Link Unit)]`

### 5.3 Setup → Active
- **필수**: `restaurant_id`, `is_required=true` task 전부 완료 (P0 반영 — 기존엔 모든 task 요구했으나 Marketing 등 진행형 task 때문에 완화)
- **배너**: `⚠ N required — [Parties (1)] [Setup (N-1)]`

### 5.4 Active 이후
- **배너 숨김** (이행 중)
- 섹션 **모두 접힘** 기본, 클릭해서 확인/편집

---

## 6. 구현 단계

1. **`FormAccordion` 컴포넌트** 신규 작성 + UI_DESIGN_GUIDE에 패턴 등록
2. **`getSectionRequirements` 헬퍼** — 기존 getMissingForNextStage 확장
3. **RequiredBanner** 컴포넌트
4. **ContractDetail 리팩토링** — Tab → Accordion
5. **i18n 키 추가** — 상태 배지, 배너 문구 (ko/en/zh/ms 4개)
6. **검증**:
   - 각 스테이지별 필수 표시 정확성 (시드 데이터 6건 — Brand 3 + Foodcourt 3, 각 스테이지)
   - 버튼 클릭 → missing 있으면 자동 펼침/스크롤
   - 모든 필수 충족 시 초록 배너 + 버튼 활성
   - 동시 펼침/접힘 토글
   - URL ?section= 왕복
   - 반응형 (desktop/tablet/mobile)
   - 기존 AutoSaveField, HeaderActions, Comments, History 정상 동작

---

## 7. 검증 체크리스트

| # | 시나리오 | 기대 결과 |
|---|---------|----------|
| 1 | Proposal 신규 계약 접근 | Parties 자동 펼침, 배너 필수 1건 |
| 2 | applicant_company_name 입력 후 blur | Parties 뱃지 ✓ Complete, 배너 초록 "Ready" |
| 3 | Contracting 진입 후 접근 | Contract 자동 펼침, 배너 필수 4건 |
| 4 | contract_number만 채움 | Contract 뱃지 ⚠ 2 required |
| 5 | 배너 `[Contract (2)]` 클릭 | Contract 섹션 펼침 + 첫 missing 필드 스크롤+하이라이트 |
| 6 | 모든 필수 충족 후 Proceed 버튼 클릭 | 스테이지 전환 |
| 7 | Setup에서 active 시도, restaurant 미연결 | Parties 자동 펼침, Link Restaurant 하이라이트 |
| 8 | Setup 미완료 task 있음 | Setup 섹션 뱃지 ⚠ N required, 해당 task 하이라이트 |
| 9 | Active 계약 접근 | 배너 숨김, 모든 섹션 접힘 |
| 10 | Terminated 계약 접근 | 읽기 전용 + 섹션 접힘 |
| 11 | URL `?section=contract` 직접 | Contract 섹션 펼친 상태로 로드 |
| 12 | 모바일 (375px) | 섹션 헤더 sticky 유지, 터치 토글 정상 |

---

## 8. 릴리즈 계획

- **Phase A (이번 세션)**: FormAccordion + RequiredBanner + ContractDetail 리팩토링 + i18n + 시드 데이터 검증
- **Phase B (후속)**: 같은 패턴을 Restaurant Settings 등 다른 대형 Form에 재적용 — 별도 스프린트

---

## 9. 비범위 (out of scope)

- 필수 필드 정의 자체 변경 (기존 getMissingForNextStage 그대로)
- Comments / History 섹션 자체 변경 (항상 노출)
- Terminate / Renew 플로우 (기존 유지)
- List / Pipeline 뷰 (최근에 이미 작업)
