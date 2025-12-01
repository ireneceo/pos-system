# 주문 상태 Badge 스타일 가이드

## 목적
주문 상태 표시의 일관성을 위해 모든 페이지에서 동일한 색상과 텍스트를 사용합니다.

## 표준 주문 상태 (Order Status)

| Status | Display Text | Background | Text Color |
|--------|-------------|------------|------------|
| `awaiting_payment` | Outstanding | `#FEF3C7` | `#F59E0B` |
| `pending` | Pending | `#FEF3C7` | `#92400E` |
| `preparing` | Preparing | `#DBEAFE` | `#1E40AF` |
| `ready` | Ready | `#D1FAE5` | `#065F46` |
| `served` | Served | `#D1FAE5` | `#065F46` |
| `completed` | Completed | `#E5E7EB` | `#374151` |
| `cancelled` | Cancelled | `#FEE2E2` | `#991B1B` |
| default | (capitalize) | `#F3F4F6` | `#6B7280` |

## 표준 StatusBadge 컴포넌트

### 기준 코드 (LiveOrdersPage.tsx)
```tsx
const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch(props.status) {
      case 'awaiting_payment': return '#FEF3C7';
      case 'pending': return '#FEF3C7';
      case 'preparing': return '#DBEAFE';
      case 'ready': return '#D1FAE5';
      case 'served': return '#D1FAE5';
      case 'completed': return '#E5E7EB';
      case 'cancelled': return '#FEE2E2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch(props.status) {
      case 'awaiting_payment': return '#F59E0B';
      case 'pending': return '#92400E';
      case 'preparing': return '#1E40AF';
      case 'ready': return '#065F46';
      case 'served': return '#065F46';
      case 'completed': return '#374151';
      case 'cancelled': return '#991B1B';
      default: return '#6B7280';
    }
  }};
`;
```

### 상태 텍스트 표시 함수
```tsx
const getStatusText = (status: string): string => {
  switch(status) {
    case 'awaiting_payment': return 'Outstanding';
    case 'pending': return 'Pending';
    case 'preparing': return 'Preparing';
    case 'ready': return 'Ready';
    case 'served': return 'Served';
    case 'completed': return 'Completed';
    case 'cancelled': return 'Cancelled';
    default: return status.charAt(0).toUpperCase() + status.slice(1);
  }
};
```

## 색상 의미

| 색상 계열 | 의미 | 적용 상태 |
|----------|------|----------|
| 노란색/주황색 | 주의/대기 | awaiting_payment, pending |
| 파란색 | 진행 중 | preparing |
| 초록색 | 완료/준비됨 | ready, served |
| 회색 | 종료 | completed |
| 빨간색 | 취소/오류 | cancelled |

## 적용 페이지

다음 페이지에서 이 스타일을 사용합니다:
- `LiveOrdersPage.tsx` - 기준 페이지
- `RestaurantDashboard.tsx` - 최근 주문 목록
- `POSTerminal.tsx` - POS 주문 목록
- 모바일 주문 관련 페이지

## 주의사항

### ❌ 잘못된 예시
```tsx
// 다른 색상 사용
case 'awaiting_payment': return 'background: #FED7AA; color: #EA580C;';

// 다른 텍스트 사용
case 'awaiting_payment': return 'Awaiting Payment'; // ❌ 'Outstanding' 사용해야 함
```

### ✅ 올바른 예시
```tsx
// 표준 색상 사용
case 'awaiting_payment': return 'background: #FEF3C7; color: #F59E0B;';

// 표준 텍스트 사용
case 'awaiting_payment': return 'Outstanding'; // ✅
```

## 새 페이지 추가 시 체크리스트

- [ ] StatusBadge 스타일이 위 표준과 일치하는가?
- [ ] 상태 텍스트가 표준 텍스트와 일치하는가?
- [ ] `awaiting_payment`이 'Outstanding'으로 표시되는가?
- [ ] 색상 코드가 정확한가?

---

**마지막 업데이트:** 2025-12-01
**기준 파일:** `src/pages/LiveOrders/LiveOrdersPage.tsx`
