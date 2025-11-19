# 🔄 Select 컴포넌트 마이그레이션 체크리스트

## 📋 진행 상황 추적

### ✅ 완료된 페이지/컴포넌트
- [x] **RestaurantsPage.tsx** - 레스토랑 등록/수정 모달의 매니저 선택 (2024-09-21)
- [x] **Reports 페이지** - FilterSelect (기준 페이지, 이미 완료)

### 🔍 확인 필요한 페이지
> 향후 개발 중 발견되면 즉시 교체

#### 관리자 페이지
- [ ] **UsersPage.tsx** - 사용자 관리 필터링
- [ ] **DashboardContent.tsx** - 대시보드 필터
- [ ] **PlansPage.tsx** - 요금제 관리
- [ ] **SystemSettings.tsx** - 시스템 설정

#### POS 터미널
- [ ] **POSTerminal.tsx** - 상품 카테고리 선택
- [ ] **OrderManagement.tsx** - 주문 상태 필터
- [ ] **PaymentMethods.tsx** - 결제 방법 선택

#### 주방 시스템
- [ ] **KitchenDisplay.tsx** - 주문 상태 필터
- [ ] **MenuManagement.tsx** - 메뉴 카테고리

#### 모바일 앱
- [ ] **MobileApp.tsx** - 메뉴 필터링
- [ ] **CustomerOrder.tsx** - 옵션 선택

#### 공통 컴포넌트
- [ ] **FilterComponents.tsx** - 범용 필터
- [ ] **FormComponents.tsx** - 폼 요소들

## 🎯 마이그레이션 우선순위

### 1순위 (즉시 교체 필요)
새로운 기능 개발 시 발견되는 모든 select 요소

### 2순위 (수정 중 발견 시 교체)
기존 페이지 수정 작업 중 발견되는 select 요소

### 3순위 (점진적 교체)
안정된 페이지의 기존 select 요소들

## 🔧 교체 방법 템플릿

### 1. Import 변경
```tsx
// 기존
import styled from 'styled-components';

// 새로운 방식
import { Select, SmallSelect, LargeSelect } from '../../components/UI';
```

### 2. 컴포넌트 교체
```tsx
// 기존 방식들 (모두 교체 대상)
<FormSelect value={value} onChange={onChange}>
<select className="form-control">
<StyledSelect>
const CustomSelect = styled.select`

// 새로운 방식
<Select value={value} onChange={onChange}>
<SmallSelect>  // 작은 크기가 필요한 경우
<LargeSelect>  // 큰 크기가 필요한 경우
```

### 3. 사이즈별 사용 가이드
```tsx
// 필터, 사이드바 등 - 작은 공간
<SmallSelect>

// 대부분의 폼 - 기본 크기
<Select> 또는 <StandardSelect>

// 중요한 선택, 메인 폼 - 큰 크기
<LargeSelect>

// 모바일 환경 고려
<MobileSelect>

// 특별한 색상이 필요한 경우
<ThemeSelect variant="success|warning|danger">
```

## 📱 환경별 고려사항

### 데스크톱
- StandardSelect 또는 LargeSelect 주로 사용
- 충분한 패딩과 클릭 영역

### 태블릿
- StandardSelect 권장
- 터치 친화적 크기

### 모바일
- MobileSelect 필수 사용
- iOS 확대 방지 (font-size: 16px)
- 작은 화면 최적화

## 🧪 테스트 체크리스트

### 기능 테스트
- [ ] 값 선택/변경 정상 작동
- [ ] onChange 이벤트 정상 호출
- [ ] 초기값 설정 확인
- [ ] 옵션 목록 정상 표시

### 스타일 테스트
- [ ] 포커스 시 보라색 테두리 + 그림자
- [ ] 호버 시 회색 테두리
- [ ] 비활성화 상태 스타일
- [ ] 모바일 반응형 확인

### 접근성 테스트
- [ ] 키보드 내비게이션 (Tab, Arrow keys)
- [ ] 스크린 리더 호환성
- [ ] 충분한 클릭 영역 (최소 44px)
- [ ] 고대비 모드 지원

## 📊 진행률 추적

```
전체 페이지: 약 20개 예상
완료된 페이지: 2개
진행률: 10%

다음 업데이트: 새로운 select 발견 시 즉시 기록
```

## 🚨 주의사항

### 절대 하지 말 것
- ❌ 새로운 styled.select 컴포넌트 생성
- ❌ FormSelect 계속 사용
- ❌ 기본 HTML select 요소 사용
- ❌ 인라인 스타일 적용

### 반드시 할 것
- ✅ Select 계열 컴포넌트만 사용
- ✅ 적절한 사이즈 선택
- ✅ 모바일 환경 고려
- ✅ 마이그레이션 후 테스트 실행

---

**📌 이 체크리스트는 개발 진행에 따라 지속적으로 업데이트됩니다.**