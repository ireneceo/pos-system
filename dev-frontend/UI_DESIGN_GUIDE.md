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

**마지막 업데이트:** 2025-12-30
**기준 파일:** Admin Pages (RestaurantsPage.tsx, PlansPage.tsx, ManagersPage.tsx)
