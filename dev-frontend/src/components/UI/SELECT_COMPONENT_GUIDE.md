# 🎨 표준 Select 컴포넌트 사용 가이드

## 📋 기본 원칙
**모든 새로운 셀렉트박스는 표준 컴포넌트 사용 필수**

## 🚀 사용법

### 1. 기본 Select (가장 많이 사용)
```tsx
import { Select } from '../../components/UI';

<Select value={value} onChange={handleChange}>
  <option value="">선택하세요</option>
  <option value="1">옵션 1</option>
</Select>
```

### 2. 사이즈별 Select
```tsx
import { SmallSelect, StandardSelect, LargeSelect } from '../../components/UI';

// 작은 사이즈 (필터, 사이드바용)
<SmallSelect>...</SmallSelect>

// 기본 사이즈 (대부분의 폼)
<StandardSelect>...</StandardSelect>

// 큰 사이즈 (중요한 선택)
<LargeSelect>...</LargeSelect>
```

### 3. 테마별 Select
```tsx
import { ThemeSelect } from '../../components/UI';

// 성공 (녹색)
<ThemeSelect variant="success">...</ThemeSelect>

// 경고 (주황색)
<ThemeSelect variant="warning">...</ThemeSelect>

// 위험 (빨간색)
<ThemeSelect variant="danger">...</ThemeSelect>
```

### 4. 모바일 최적화 Select
```tsx
import { MobileSelect } from '../../components/UI';

<MobileSelect>...</MobileSelect>
```

## 🔧 기존 코드 수정 시

### ❌ 기존 방식 (변경 필요)
```tsx
const OldSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
`;

<FormSelect>...</FormSelect>
<select>...</select>
```

### ✅ 새로운 방식 (권장)
```tsx
import { Select } from '../../components/UI';

<Select>...</Select>
```

## 📱 반응형 고려사항

- **모바일**: `MobileSelect` 사용 (iOS 확대 방지)
- **태블릿**: `StandardSelect` 사용
- **데스크톱**: `StandardSelect` 또는 `LargeSelect` 사용

## 🎨 스타일 특징

### 표준 스타일
- ✅ 12px 16px 패딩 (넉넉한 클릭 영역)
- ✅ 포커스 시 보라색 테두리 + 그림자
- ✅ 호버 시 회색 테두리
- ✅ 8px 둥근 모서리
- ✅ 최소 너비 180px

### 접근성
- ✅ 키보드 내비게이션 지원
- ✅ 포커스 표시 명확
- ✅ 충분한 클릭 영역
- ✅ 높은 대비율

## 🔄 마이그레이션 가이드

### 1. 우선순위
1. **새로운 기능**: 무조건 표준 컴포넌트 사용
2. **수정 중인 코드**: 발견 시 즉시 교체
3. **기존 코드**: 점진적 교체

### 2. 교체 방법
```tsx
// 1단계: import 변경
- import styled from 'styled-components';
+ import { Select } from '../../components/UI';

// 2단계: 컴포넌트 교체
- <FormSelect value={value} onChange={onChange}>
+ <Select value={value} onChange={onChange}>

// 3단계: 로컬 스타일 제거
- const FormSelect = styled.select`...`;
```

## 📝 체크리스트

### 새 기능 개발 시
- [ ] `import { Select } from '../../components/UI';` 사용
- [ ] 사이즈 적절한지 확인 (Small/Standard/Large)
- [ ] 모바일 환경 고려
- [ ] 테마 컬러 필요한지 확인

### 기존 코드 수정 시
- [ ] 기존 select 발견하면 교체
- [ ] 로컬 styled select 제거
- [ ] import 정리
- [ ] 테스트 확인

## 🎯 예시 적용

### Reports 페이지 (이미 적용 완료)
```tsx
<Select value={selectedManager} onChange={handleManagerChange}>
  <option value="all">All Managers</option>
  {managers.map(manager => (
    <option key={manager.id} value={manager.id}>
      {manager.name}
    </option>
  ))}
</Select>
```

### 레스토랑 모달 (이미 적용 완료)
```tsx
<Select value={newRestaurant.managerId} onChange={handleManagerSelect}>
  <option value="">Select Manager</option>
  {availableManagers.map(manager => (
    <option key={manager.id} value={manager.id}>
      {manager.full_name || manager.username}
    </option>
  ))}
</Select>
```

---
**📌 기억하세요: 앞으로 모든 셀렉트박스는 이 표준을 따릅니다!**