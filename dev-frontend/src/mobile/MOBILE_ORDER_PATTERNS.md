# 모바일 오더 개발 패턴 가이드

## 1. 테이블/픽업 번호 표시 패턴

모바일 오더에서 테이블 번호와 픽업 번호를 안전하게 표시하는 패턴입니다.

### 표준 코드 (OrderTrackingPage.tsx)

```tsx
// Safe getter functions to prevent render crashes
const getTableNumber = () => {
  try {
    return order.table_number || order.tableNumber || null;
  } catch (error) {
    return null;
  }
};

const getPickupNumber = () => {
  try {
    // If table number exists, show table number instead of pickup number
    const tableNumber = getTableNumber();
    if (tableNumber) return null; // Will be handled separately

    if (order.pickup_number) return order.pickup_number;
    if (order.pickupNumber) return order.pickupNumber;

    // Try extracting from order number
    const orderNum = order.order_number || order.orderNumber;
    if (orderNum && typeof orderNum === 'string' && orderNum.includes('-')) {
      const parts = orderNum.split('-');
      if (parts.length > 1) return parts[parts.length - 1];
    }

    return '000';
  } catch (error) {
    console.error('Error getting pickup number:', error);
    return '000';
  }
};

// Get display number (table or pickup)
const getDisplayNumber = () => {
  const tableNumber = getTableNumber();
  if (tableNumber) {
    // Format table number (remove leading T if present, then add T prefix)
    const cleanNumber = String(tableNumber).replace(/^T/i, '');
    return `T${cleanNumber}`;
  }
  return getPickupNumber();
};

const getDisplayLabel = () => {
  const tableNumber = getTableNumber();
  return tableNumber ? 'Your Table Number' : 'Your Pickup Number';
};
```

### 사용 예시
```tsx
<PickupNumberCard>
  <PickupLabel>{getDisplayLabel()}</PickupLabel>
  <PickupNumber>
    {getDisplayNumber()}
  </PickupNumber>
</PickupNumberCard>
```

### 핵심 원칙
1. **snake_case와 camelCase 모두 지원**: `order.table_number || order.tableNumber`
2. **null 안전성**: try-catch로 감싸서 렌더링 크래시 방지
3. **테이블 우선**: 테이블 번호가 있으면 픽업 번호 대신 테이블 번호 표시
4. **T 접두사**: 테이블 번호는 항상 `T` 접두사로 표시 (예: T1, T2)

---

## 2. 픽업 시간 범위 표시 패턴

픽업 시간을 30분 범위로 표시하는 패턴입니다.

### 표준 코드
```tsx
const formatPickupTimeRange = (dateString: string): string => {
  const date = new Date(dateString);
  const endDate = new Date(date.getTime() + 30 * 60 * 1000); // Add 30 minutes

  const formatTimeSlot = (d: Date) => {
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours % 12 || 12;
    const displayMin = minutes.toString().padStart(2, '0');
    return { time: `${displayHour}:${displayMin}`, period };
  };

  const start = formatTimeSlot(date);
  const end = formatTimeSlot(endDate);

  // If periods are the same, show period only at the end
  if (start.period === end.period) {
    return `${start.time} - ${end.time} ${end.period}`;
  }
  return `${start.time} ${start.period} - ${end.time} ${end.period}`;
};
```

### 출력 예시
- `9:00 - 9:30 AM`
- `11:30 AM - 12:00 PM`

---

## 3. 고객 인증 패턴

모바일 오더에서 고객 인증(로그인/회원가입/게스트)을 처리하는 패턴입니다.

### API 엔드포인트

| 엔드포인트 | 용도 | Body |
|-----------|------|------|
| `POST /api/customers/auth` | 로그인 | `{ phone, password?, restaurantId }` |
| `POST /api/customers/register` | 회원가입 | `{ phone, password, name, email?, restaurantId }` |

### 고객 타입
- `guest`: 비회원 (전화번호만으로 로그인)
- `member`: 회원 (전화번호 + 비밀번호)

### CustomerContext 사용 예시
```tsx
import { useCustomer } from '../../contexts/CustomerContext';

const { loginCustomer, registerCustomer, setGuestInfo } = useCustomer();

// 회원 로그인
const handleMemberLogin = async (phone: string, password: string) => {
  const customer = await loginCustomer(phone, password);
  if (customer) {
    // 로그인 성공
  }
};

// 게스트 로그인
const handleGuestLogin = (name: string, phone: string) => {
  setGuestInfo({ name, phone });
};

// 회원가입
const handleRegister = async (data: { phone, password, name, email? }) => {
  const customer = await registerCustomer(data);
};
```

### 핵심 원칙
1. **레스토랑별 포인트**: `restaurant_customers` 테이블에서 레스토랑별 포인트/등급 관리
2. **고객 공유**: `customers` 테이블은 전체 시스템 공유 (브랜드 간 회원 공유 가능)
3. **비밀번호 해시**: bcrypt로 비밀번호 해시 저장

---

## 4. 주문 소스 추적 패턴

주문이 어디서 왔는지 추적하는 패턴입니다.

### order_source 값
- `pos`: POS 터미널에서 직접 주문
- `mobile_qr`: QR 코드 스캔을 통한 모바일 오더
- `mobile_web`: 웹 링크를 통한 모바일 오더

### 설정 방법 (MobileOrderContext)
```tsx
// QR 코드 스캔 시
if (qrCode) {
  setOrderSource('mobile_qr');
}

// 직접 웹 접속 시
if (!qrCode && restaurantId) {
  setOrderSource('mobile_web');
}
```

---

## 5. 모바일 레이아웃 패턴

### MobileLayout 사용
```tsx
import MobileLayout from '../components/common/MobileLayout';

<MobileLayout
  title="Order Status"
  currentPage="orders"
  showBackButton={true}
>
  {/* 페이지 컨텐츠 */}
</MobileLayout>
```

### Props
- `title`: 헤더 타이틀
- `currentPage`: 하단 네비게이션 활성 탭 ('home' | 'orders' | 'account')
- `showBackButton`: 뒤로가기 버튼 표시 여부

---

**마지막 업데이트:** 2025-12-01
