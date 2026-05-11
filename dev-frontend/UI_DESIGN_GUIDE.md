# UI/UX 통합 디자인 가이드

> **이 문서는 모든 새 기능 개발 시 반드시 참조해야 합니다.**
> 기준 페이지: Admin Pages (RestaurantsPage, PlansPage, ManagersPage)
> **색상 사용:** `COLOR_GUIDE.md` 참조 — 허용된 색상만 사용. 이모지 아이콘 사용 금지.

---

## 1. 필수 규칙

### 1.1 브라우저 alert() 절대 금지

```javascript
// ❌ 절대 금지
alert('Success!');
alert('Error occurred');
window.alert('Something');

// ❌ 성공 메시지도 표시하지 않음
if (response.success) {
  alert('Saved successfully'); // 금지
}
```

### 1.2 성공 메시지 처리

```javascript
// ✅ 올바른 방법: 성공 시 알림 없이 처리
if (response.success) {
  setShowModal(false);  // 모달 닫기
  fetchData();          // 데이터 리프레시
  // 끝. 성공 메시지 표시 안함
}
```

### 1.3 에러 메시지 처리

```javascript
// ✅ 에러 상태 선언
const [formError, setFormError] = useState<string | null>(null);

// ✅ 에러 설정
if (!response.success) {
  setFormError(response.message || 'Failed to save');
  return;
}

// ✅ 성공 시 에러 초기화
setFormError(null);
```

```jsx
// ✅ JSX: 버튼 바로 위에 에러 표시
{formError && <ErrorMessage>{formError}</ErrorMessage>}
<Button variant="primary" onClick={handleSubmit}>Save</Button>
```

### 1.4 삭제 확인

```javascript
// ✅ 삭제 등 되돌릴 수 없는 작업만 confirm 사용
if (!window.confirm('Delete this item? This action cannot be undone.')) {
  return;
}
```

### 1.5 이모지/아이콘 금지

- 페이지 내 안내 메시지에 이모지 사용 금지
- 경고 아이콘, 장식용 이모지 등 UI에 넣지 않음
- 텍스트만으로 명확하게 전달

---

## 2. 공통 컴포넌트 사용

### 2.1 필수 Import

```typescript
// 페이지 레이아웃
import {
  Container,
  Header,
  Title,
  ActionSection,
  Content,
  Button
} from '../../components/UI';

// 통계 카드
import {
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  StatDescription
} from '../../components/UI';

// 필터 (Admin 페이지)
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

// 모달 & 폼
import {
  Modal,
  ModalWarning,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextArea,
  ModalButton
} from '../../components/UI';

// 테이블
import {
  Table,
  TableHeader,
  TableRow,
  EmptyState
} from '../../components/UI';
```

### 2.2 페이지 구조

```jsx
<MainLayout>
  <Container>
    <Header>
      <Title>Page Title</Title>
      <ActionSection>
        <Button variant="primary" onClick={handleAdd}>Add New</Button>
      </ActionSection>
    </Header>

    <Content>
      {/* 1. 통계 카드 (선택) */}
      <StatsGrid>
        <StatCard>...</StatCard>
      </StatsGrid>

      {/* 2. 필터 바 */}
      <FilterBar>
        <SearchInput placeholder="Search..." />
        <FilterSelect>...</FilterSelect>
      </FilterBar>

      {/* 3. 테이블 또는 그리드 */}
      <Table>...</Table>
    </Content>
  </Container>
</MainLayout>
```

### 2.3 페이지 헤더 ⚙️ Settings 단축 (산업 표준 — 2026-05-11 도입)

Stripe/Toast/Square 패턴: 페이지 우상단 ⚙️ 아이콘 → 관련 Settings 페이지/탭으로 deep link. 모든 페이지에서 일관된 UX.

```jsx
// PageHeader 에 settingsHref + settingsLabel 전달
<PageHeader
  title="Reservations"
  settingsHref={`/restaurant/${restaurantId}/settings?tab=reservation`}
  settingsLabel="Reservation settings"
>
  <Button onClick={handleNew}>+ New</Button>
</PageHeader>
```

**또는 어디서든 단독 사용:**
```jsx
import { PageSettingsLink } from '../components/Common/PageHeader';
<PageSettingsLink to="/restaurant/1/settings?tab=membership" label="Membership settings" />
```

**원칙:**
- 관련 Settings 탭이 **실제 존재**하고 **의미적으로 적합**할 때만 추가. 부적합한 deep link 보다 ⚙️ 없는 게 정직.
- 신규 사용자 안내는 별도 — v3.27 Walkthrough 시스템이 담당. 가이드 패널 중복 금지.
- 동작: 36×36 button, `#6B7280` → `#635BFF` hover, `transition: all 0.15s`, focus-visible 2px outline.

**현재 적용 (4 페이지):**
- Reservations → `?tab=reservation`
- LiveOrders → `?tab=operations`
- KitchenDisplay → `?tab=kitchenStations`
- Customers → `?tab=membership`

---

### 2.4 사이드바 2단 구조 (2026-05-11 도입)

모든 역할(System Admin / Brand / Foodcourt / Owner / Supplier / Restaurant Admin)이 동일한 2단 사이드바 사용 (Sentry / Stripe / Linear 패턴).

**구조**:
- **1뎁스 (좌측 카테고리 rail)**: 220px (collapsed 64px), 배경 `#EEF0F4`, lucide-react 라인 아이콘 + 라벨
- **2뎁스 (sub-menu panel)**: 220px white, 텍스트만 (아이콘 없음). collapse 가능 (`ChevronsLeft`) → localStorage 저장. collapsed 상태에서 1뎁스 hover → floating popover
- **헤더 통일**: SidebarHeader / SecondaryHeader / PageHeader 모두 `height: 80px / box-sizing: border-box / padding: 16px` strict (회색 라인 한 줄 정렬)

**Active / Hover**:
- 1뎁스 active: 흰 배경 (`#FFFFFF`) + 좌측 3px 보라 라인 + 글자 보라 (`#635BFF`, font-weight 600)
- 2뎁스 active: `#F0F4FF` 배경 + 좌측 3px 보라 라인 + 글자 보라
- Hover: 글자만 보라 (배경 없음) — active 일 때 hover 시에도 active 배경 유지

**카테고리 데이터 구조** (`MainLayout.tsx` 의 `AdminCategory`):
```ts
type AdminCategory = {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;                 // 단독 메뉴 (sub-menu 없음)
  items?: AdminSubItem[];        // 2뎁스 sub-menu
  hasPending?: boolean;          // 알림 dot
  visible?: boolean;             // 권한 가시성
  openInNewTab?: boolean;        // 풀화면 메뉴 (POS Terminal, Floor Plan 등)
  mobileOrder?: boolean;         // Mobile Order 전용 (slug fetch 후 새 창)
};
```

**규칙**:
- 풀화면 메뉴 (POS Terminal / Floor Plan / Kitchen Display / Customer Display / Mobile Order) 는 1뎁스 단독 + `openInNewTab: true`
- Reports 같이 페이지 안 탭이 명확한 메뉴는 1뎁스 카테고리 + 탭을 2뎁스 sub-menu 로 (`/path?tab=xxx` URL)
- Settings 카테고리는 실제 설정 페이지만 (Company Info / Site Settings / Notifications / System Config 등). 다른 의미의 페이지는 별도 카테고리

---

## 3. 컬러 팔레트

### 3.1 기본 색상

| 용도 | 색상 코드 | 사용처 |
|------|-----------|--------|
| Primary | `#635BFF` | 주요 버튼, 포커스 |
| Primary Hover | `#5A51E6` | 버튼 호버 |
| Text Dark | `#0A2540` | 제목, 주요 텍스트 |
| Text Gray | `#6B7280` | 부제목, 설명 |
| Text Light | `#6B7C93` | 라벨, 힌트 |
| Border | `#E6EBF1` | 테두리, 구분선 |
| Background | `#FAFBFC` | 페이지 배경 |
| Card Background | `#FFFFFF` | 카드 배경 |

### 3.2 상태 색상

| 상태 | Background | Text Color |
|------|------------|------------|
| Success/Active | `#ECFDF5` | `#059669` |
| Error/Danger | `#FEE2E2` | `#DC2626` |
| Warning | `#FEF3C7` | `#D97706` |
| Info | `#DBEAFE` | `#2563EB` |
| Inactive | `#F3F4F6` | `#6B7280` |

---

## 4. 버튼 스타일

### 4.1 버튼 Variants

```jsx
// Primary - 주요 액션
<Button variant="primary">Save</Button>

// Secondary - 보조 액션
<Button variant="secondary">Cancel</Button>

// Danger - 삭제, 위험한 액션
<Button variant="danger">Delete</Button>
```

### 4.2 버튼 크기

```jsx
<Button size="small">Small</Button>   // padding: 8px 14px
<Button size="medium">Medium</Button> // padding: 12px 20px (기본)
<Button size="large">Large</Button>   // padding: 16px 28px
```

### 4.3 주요 액션 버튼 배치 (필수)

**규칙:** 상세 페이지의 주요 진행 액션 (예: Proceed, Submit, Save & Continue) 버튼은 **반드시 상단과 하단 양쪽에 배치**한다.

**이유:**
- 긴 폼 스크롤 시 사용자가 하단 버튼에 도달하기 번거로움
- 상단 헤더의 액션 버튼은 즉시 발견 가능
- 전형적인 모바일 UX 패턴

**패턴:**
```jsx
// 헤더 내 우측에 ActionRow 배치
<DetailHeader>
  <DetailTitle>...</DetailTitle>
  <HeaderActions>
    {primaryAction && <Button variant="primary" onClick={...}>Proceed to Setup →</Button>}
  </HeaderActions>
</DetailHeader>

// 페이지 하단에도 동일 버튼
<ButtonRow>
  {primaryAction && <Button variant="primary" onClick={...}>Proceed to Setup →</Button>}
</ButtonRow>
```

### 4.4 필수 항목 미입력 — "클릭 허용 + 자동 안내" 패턴 (2026-04-19 개정)

**규칙:** 필수 필드 미입력 상태에서도 진행/저장 버튼은 **활성 상태 유지**. 클릭 시 자동으로 해당 섹션을 펼치고 누락 필드로 스크롤 + 시각 하이라이트를 띄운다.

**이전 정책 (disabled + tooltip) 폐기 이유:**
- 여러 섹션/탭이 있는 폼에서 사용자가 "왜 disabled인지" 파악 불가 (누락 필드가 다른 영역에 숨어 있음)
- Tooltip은 hover/long-press 로만 노출되어 모바일 환경에서 발견 어려움
- 클릭 후 안내 패턴이 visibility of system status (Nielsen #1) 측면에서 우수

**패턴:**
```jsx
const sectionReqs = getSectionRequirements(form, contract, nextStage);
// 배너에 부족 필드 집계 표시 (상시 노출)
{sectionReqs.length > 0 && (
  <RequiredBanner>
    ⚠ {sectionReqs.length} required
    {groupBySection(sectionReqs).map(g => (
      <Chip onClick={() => openSectionAndScroll(g.section, g.firstField)}>
        {g.label} ({g.count})
      </Chip>
    ))}
  </RequiredBanner>
)}

<Button onClick={() => {
  if (sectionReqs.length > 0) {
    setAttemptedSave(true);
    openSectionAndScroll(sectionReqs[0].section, sectionReqs[0].fieldKey);
    return;
  }
  handleProceed();
}}>
  Proceed to Setup →
</Button>
```

**필수 시각 요소:**
- Label 옆 빨간 `*` 표시 (시각적 마킹)
- **RequiredBanner 상단 노출** — 부족 필드 전체 집계 + 섹션별 chip 네비게이션
- **attemptedSave 상태**: true 시 미입력 필드 `field-error` 클래스 → 빨간 테두리 + `field-error-msg` 인라인 메시지
- **field-highlight 클래스**: chip 클릭 대상 필드에 1.2s × 2회 보라 pulse 애니메이션
- `data-field-key="xxx"` 속성으로 scroll target 지정

**실제 구현 참조:** `components/Contract/ContractDetail.tsx` — FormAccordion + RequiredBanner + fieldShellClass 조합 패턴

---

## 5. 모달 사용

### 5.1 기본 모달

```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Modal Title"
  size="medium"  // 'small' | 'medium' | 'large'
  footer={
    <>
      <ModalButton variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </ModalButton>
      <ModalButton variant="primary" onClick={handleSubmit} disabled={saving}>
        {saving ? 'Saving...' : 'Save'}
      </ModalButton>
    </>
  }
>
  {/* 모달 내용 */}
  <FormGroup>
    <FormLabel>Field Name</FormLabel>
    <FormInput value={value} onChange={handleChange} />
  </FormGroup>

  {/* 에러 메시지 (푸터 바로 위에) */}
  {formError && <ModalWarning>{formError}</ModalWarning>}
</Modal>
```

### 5.2 모달 사이즈

| Size | Max Width |
|------|-----------|
| small | 400px |
| medium | 600px |
| large | 800px |

---

## 6. 폼 컴포넌트

### 6.1 기본 폼 구조

```jsx
<FormGroup>
  <FormLabel>Field Label</FormLabel>
  <FormInput
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Enter value"
  />
</FormGroup>
```

### 6.2 2열 레이아웃

```jsx
<FormRow>
  <FormGroup>
    <FormLabel>First Name</FormLabel>
    <FormInput value={firstName} onChange={...} />
  </FormGroup>
  <FormGroup>
    <FormLabel>Last Name</FormLabel>
    <FormInput value={lastName} onChange={...} />
  </FormGroup>
</FormRow>
```

### 6.3 날짜 입력 컴포넌트 (필수)

**`<input type="date">` 사용 금지** — 브라우저별로 스타일 다름. 반드시 아래 컴포넌트 사용:

```jsx
import DateField from '../../components/Common/DateField';
import DateRangeField from '../../components/Common/DateRangeField';

// 단일 날짜 (due_date, signing_date, received_date 등)
<DateField
  value={form.due_date}
  onChange={(v) => setForm({ ...form, due_date: v })}
  disabled={!isEditable}
/>

// 범위 날짜 (start + end 한 세트)
<DateRangeField
  startDate={form.start_date}
  endDate={form.end_date}
  onChange={(s, e) => setForm({ ...form, start_date: s, end_date: e })}
  disabled={!isEditable}
/>
```

- CalendarPicker와 동일한 보라색(#635BFF) 팔레트 사용
- 날짜 표시 포맷 자동 적용 (`Apr 17, 2026` 형식)
- Clear(×) 버튼 자동 제공
- Today 단축 버튼 포함 (DateField)

### 6.4 금액/퍼센트 입력 (Contract 등)

```jsx
// ContractDetail.tsx 내부 CurrencyInput/PercentInput 패턴 참고
<CurrencyInput currency="MYR" value={value} onChange={setValue} />
// 결과: [ RM | 5000.00 ]

<PercentInput value={value} onChange={setValue} />
// 결과: [ 5 | % ]
```

---

## 7. 에러 메시지 컴포넌트

### 7.1 모달 내 에러 (ModalWarning 사용)

```jsx
// components/UI/Modal.tsx에서 import
import { ModalWarning } from '../../components/UI';

// 모달 내 버튼 위에 배치
{formError && <ModalWarning>{formError}</ModalWarning>}
```

### 7.2 페이지 내 에러 (직접 정의)

```typescript
const ErrorMessage = styled.div`
  color: #DC2626;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 12px 16px;
  background: #FEE2E2;
  border: 1px solid #FECACA;
  border-radius: 8px;
`;
```

---

## 8. 필터 컴포넌트 (Admin 페이지)

### 8.1 기본 사용법

```jsx
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

<FilterBar>
  <SearchInput
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
    <option value="">All Status</option>
    <option value="active">Active</option>
    <option value="inactive">Inactive</option>
  </FilterSelect>
</FilterBar>
```

### 8.2 상세 가이드

> `/var/www/dev-frontend/FILTER_STYLE_GUIDE.md` 참조

---

## 9. 상태 Badge

### 9.1 공통 StatusBadge (CommonStyles에서 import)

```jsx
import { StatusBadge } from '../../components/UI';

<StatusBadge status="active">Active</StatusBadge>
<StatusBadge status="inactive">Inactive</StatusBadge>
<StatusBadge status="error">Error</StatusBadge>
```

### 9.2 주문 상태 Badge

> `/var/www/dev-frontend/ORDER_STATUS_STYLE_GUIDE.md` 참조

---

## 10. Select 컴포넌트

### 10.1 기본 사용법

```jsx
import { Select } from '../../components/UI';

<Select value={value} onChange={handleChange}>
  <option value="">Select...</option>
  <option value="1">Option 1</option>
</Select>
```

### 10.2 상세 가이드

> `/var/www/dev-frontend/src/components/UI/SELECT_COMPONENT_GUIDE.md` 참조

---

## 11. 금지 사항 체크리스트

### ❌ 절대 하지 말 것

- [ ] `alert()` 사용
- [ ] `window.alert()` 사용
- [ ] 성공 메시지 팝업/토스트 표시
- [ ] 이모지를 UI 텍스트에 사용
- [ ] 페이지 내에서 새로운 styled-component로 동일한 컴포넌트 재정의
- [ ] 공통 컴포넌트 무시하고 직접 스타일 작성

### ✅ 반드시 할 것

- [ ] 에러 메시지는 버튼 근처에 인라인으로 표시
- [ ] 성공 시 모달 닫기 + 데이터 리프레시만
- [ ] 공통 UI 컴포넌트 import해서 사용
- [ ] 삭제 확인은 ConfirmModal 사용 (window.confirm 금지)

---

## 12. 자동저장 (AutoSaveField)

설정 페이지에서는 Save 버튼 대신 AutoSaveField 컴포넌트를 사용합니다.

### 12.1 사용법
```tsx
import AutoSaveField from '../../components/Common/AutoSaveField';

// Input — 자동 onChange 감지, ref 불필요
<AutoSaveField onSave={handleSave}>
  <Input value={...} onChange={(e) => setState(e.target.value)} />
</AutoSaveField>

// Select
<AutoSaveField onSave={handleSave} type="select">
  <Select value={...} onChange={(e) => setState(e.target.value)}>...</Select>
</AutoSaveField>

// Toggle — ToggleSwitch만 감싸기 (Toggle 전체 X)
<Toggle>
  <ToggleLabel>Label</ToggleLabel>
  <AutoSaveField ref={toggleRef} onSave={handleSave} type="toggle">
    <ToggleSwitch>
      <ToggleInput onChange={(e) => { setState(...); toggleRef.current?.triggerSave(); }} />
      <ToggleSlider />
    </ToggleSwitch>
  </AutoSaveField>
</Toggle>

// Image — ref + 수동 triggerSave 필수
<AutoSaveField ref={imageRef} onSave={handleSave} type="image">
  <ImageUploadDropzone value={...} onChange={(v) => { setState(v); imageRef.current?.triggerSave(); }} />
</AutoSaveField>

// Radio 버튼 — 각 옵션을 개별 AutoSaveField로 감싸기
<div style={{ display: 'flex', gap: '12px' }}>
  <AutoSaveField ref={optionARef} onSave={handleSave} type="toggle" style={{ flex: 1 }}>
    <label>
      <input type="radio" checked={value === 'a'} onChange={() => { setState('a'); optionARef.current?.triggerSave(); }} />
      Option A
    </label>
  </AutoSaveField>
  <AutoSaveField ref={optionBRef} onSave={handleSave} type="toggle" style={{ flex: 1 }}>
    <label>
      <input type="radio" checked={value === 'b'} onChange={() => { setState('b'); optionBRef.current?.triggerSave(); }} />
      Option B
    </label>
  </AutoSaveField>
</div>
```

### 12.4 필수 규칙
- **모든 설정 입력은 반드시 AutoSaveField로 감싸야 한다** (예외 없음)
- **커스텀 컴포넌트** (ImageUploadDropzone, 라디오, 커스텀 셀렉트)는 ref + 수동 triggerSave 필수
- **네이티브 input/select**는 AutoSaveField가 onChange를 자동 감지하므로 ref 불필요
- **라디오/체크박스**: 클릭한 항목에 저장 아이콘이 나오도록 각각 개별 AutoSaveField
- **handleSave() 직접 호출 금지** — 항상 AutoSaveField의 triggerSave()를 통해야 함 (stale state 방지)

### 12.2 타입별 배지 위치
| type | 위치 | debounce |
|------|------|----------|
| input (기본) | 입력란 우측 안 | 2초 |
| select | 우측 상단 코너 | 300ms |
| toggle | ToggleSwitch 위 오버레이 | 300ms |
| image | 드롭존 우측 하단 | 300ms |
| list | 그룹 우측 상단 | 300ms |

### 12.3 배지 스타일
- Saved: 파스텔 녹색 (#D1FAE5) + 진한 녹색 체크 (#065F46) — LiveOrders Served 스타일
- Saving: 스피너 (#E6EBF1 + #8898AA)
- Error: 빨간색 (#EF4444)

---

## 13. 관련 문서

| 문서 | 경로 | 내용 |
|------|------|------|
| Filter Guide | `/var/www/dev-frontend/FILTER_STYLE_GUIDE.md` | 필터 컴포넌트 |
| Order Status Guide | `/var/www/dev-frontend/ORDER_STATUS_STYLE_GUIDE.md` | 주문 상태 Badge |
| Select Guide | `/var/www/dev-frontend/src/components/UI/SELECT_COMPONENT_GUIDE.md` | Select 컴포넌트 |
| UI Components | `/var/www/dev-frontend/src/components/UI/README.md` | Modal, Form 컴포넌트 |

---

## 13. 새 기능 개발 시 체크리스트

### 개발 전

- [ ] 이 가이드 문서 읽기
- [ ] 유사한 기존 페이지 참조 (RestaurantsPage, PlansPage 등)
- [ ] 필요한 공통 컴포넌트 확인

### 개발 중

- [ ] `alert()` 사용하지 않음
- [ ] 에러는 인라인으로 표시
- [ ] 성공 메시지 표시 안함
- [ ] 공통 컴포넌트 사용

### 개발 후

- [ ] 디자인 일관성 확인
- [ ] 모바일 반응형 확인

---

**마지막 업데이트:** 2026-04-19 (4.4 개정 — "클릭 허용 + 자동 안내" 패턴 / Accordion 패턴 규정 추가)
**기준 파일:** Admin Pages (RestaurantsPage.tsx, PlansPage.tsx, ManagersPage.tsx), Contract Detail (ContractDetail.tsx + FormAccordion)

---

## 14. 다중 섹션 폼 — Accordion 패턴 (2026-04-19)

**규칙:** 계약서·상세 프로파일·설정 같이 "하나의 대상을 여러 섹션으로 편집"하는 페이지는 **Tab 대신 Accordion** 사용.

**Tab vs Accordion 선택 기준:**
- **Tab**: 서로 독립적인 맥락 (예: Admin 메뉴 카테고리, Settings 대분류)
- **Accordion**: 하나의 문서/대상을 분할 편집 (예: 계약서, 프로파일, 상세 폼)

**이유:**
- Tab은 다른 섹션의 필수 필드 상태를 숨김 → "버튼 왜 disabled" 혼란
- 계약서는 사용자 멘탈 모델상 단일 문서 → 전체 진행도를 한눈에 봐야 함

**사용:**
```jsx
import { FormAccordion, FormAccordionSection } from 'components/UI';

<FormAccordion expanded={expandedSet} onChange={setExpandedSet}>
  <FormAccordionSection
    id="parties"
    title="Parties"
    status="required"        // complete | required | optional | empty
    statusLabel="⚠ 2 required"
  >
    ...sections inside...
  </FormAccordionSection>
</FormAccordion>
```

**동작 규칙:**
- 진입 시 모든 섹션 접힘 (auto-expand 금지 — 사용자가 직접 선택)
- 동시 펼침 허용 (exclusive 아님)
- URL `?section=foo,bar` 로 상태 기록
- 외곽 박스 없음, 섹션 사이 `border-bottom 1px` 만
- 안쪽 `<Section>` 카드가 자기 영역 제공 (중첩 박스 금지)
- 섹션 상태 배지 색: complete=#D1FAE5/#065F46, required=#FEF3C7/#92400E, optional/empty=투명

**참조 구현:** `components/Contract/ContractDetail.tsx`
