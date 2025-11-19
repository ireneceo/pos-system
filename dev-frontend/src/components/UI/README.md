# UI Components Library

프로젝트 전체에서 일관성 있는 팝업 및 폼 스타일을 위한 공통 컴포넌트 라이브러리입니다.

## 사용법

```typescript
import {
  Modal,
  FormRow,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextArea,
  FormError,
  FormHelperText,
  Button
} from '../../components/UI';
```

## 컴포넌트

### Modal

통일된 스타일의 모달 컴포넌트입니다.

```typescript
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="모달 제목"
  size="medium" // 'small' | 'medium' | 'large'
  footer={
    <>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        취소
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        확인
      </Button>
    </>
  }
>
  {/* 모달 내용 */}
  <FormGroup>
    <FormLabel>이름</FormLabel>
    <FormInput
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="이름을 입력하세요"
    />
  </FormGroup>
</Modal>
```

### Form Components

#### FormGroup
폼 필드를 감싸는 컨테이너입니다.

#### FormRow
두 개의 폼 필드를 가로로 배치할 때 사용합니다.

```typescript
<FormRow>
  <FormGroup>
    <FormLabel>이름</FormLabel>
    <FormInput type="text" />
  </FormGroup>
  <FormGroup>
    <FormLabel>이메일</FormLabel>
    <FormInput type="email" />
  </FormGroup>
</FormRow>
```

#### FormLabel
폼 필드의 라벨입니다.

#### FormInput
텍스트 입력 필드입니다.

```typescript
<FormInput
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="입력하세요"
  disabled={false}
/>
```

#### FormSelect
선택 필드입니다.

```typescript
<FormSelect
  value={selectedValue}
  onChange={(e) => setSelectedValue(e.target.value)}
>
  <option value="">선택하세요</option>
  <option value="option1">옵션 1</option>
  <option value="option2">옵션 2</option>
</FormSelect>
```

#### FormTextArea
여러 줄 텍스트 입력 필드입니다.

```typescript
<FormTextArea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="설명을 입력하세요"
  style={{ minHeight: '120px' }}
/>
```

#### FormError
오류 메시지를 표시합니다.

```typescript
{error && <FormError>{error}</FormError>}
```

#### FormHelperText
도움말 텍스트를 표시합니다.

```typescript
<FormHelperText>8자 이상 입력하세요</FormHelperText>
```

### Button

통일된 스타일의 버튼 컴포넌트입니다.

```typescript
<Button
  variant="primary" // 'primary' | 'secondary' | 'danger'
  size="medium" // 'small' | 'medium' | 'large'
  disabled={false}
  loading={isLoading}
  fullWidth={false}
  onClick={handleClick}
>
  버튼 텍스트
</Button>
```

## 예시: 전체 모달

```typescript
const [showModal, setShowModal] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  category: '',
  description: ''
});

return (
  <Modal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    title="사용자 정보 입력"
    size="medium"
    footer={
      <>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          취소
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          저장
        </Button>
      </>
    }
  >
    <FormRow>
      <FormGroup>
        <FormLabel>이름 *</FormLabel>
        <FormInput
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="이름을 입력하세요"
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>이메일 *</FormLabel>
        <FormInput
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="이메일을 입력하세요"
        />
      </FormGroup>
    </FormRow>

    <FormGroup>
      <FormLabel>카테고리</FormLabel>
      <FormSelect
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      >
        <option value="">카테고리 선택</option>
        <option value="general">일반</option>
        <option value="technical">기술</option>
      </FormSelect>
    </FormGroup>

    <FormGroup>
      <FormLabel>설명</FormLabel>
      <FormTextArea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="설명을 입력하세요"
        style={{ minHeight: '100px' }}
      />
      <FormHelperText>자세한 설명을 입력하면 더 도움이 됩니다.</FormHelperText>
    </FormGroup>
  </Modal>
);
```

## 스타일 특징

- **일관성**: 모든 컴포넌트가 동일한 색상, 간격, 폰트 사용
- **포커스 효과**: #635BFF 보더와 박스 섀도우
- **전환 효과**: 0.15s 부드러운 애니메이션
- **반응형**: 모바일 환경에서도 잘 작동
- **접근성**: disabled 상태와 적절한 색상 대비

## 기존 코드 마이그레이션

기존 페이지에서 새로운 컴포넌트로 마이그레이션할 때:

1. import 문 추가
2. 기존 styled-components 제거
3. 새로운 컴포넌트로 교체
4. 스타일 속성 조정

이를 통해 전체 프로젝트의 팝업과 폼이 일관성 있는 디자인을 갖게 됩니다.