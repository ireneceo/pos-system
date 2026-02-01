# 통계 개발 가이드

> **최종 업데이트:** 2026-02-01
> **적용 범위:** 모든 통계, 리포트, 대시보드 페이지

---

## 적용 역할

| 역할 | 적용 여부 | 비고 |
|------|:--------:|------|
| **Restaurant Admin** | ✅ 적용 | 현재 가이드 기준 |
| Brand General | 🔜 예정 | 다중 레스토랑 집계 필요 |
| Foodcourt General | 🔜 예정 | 다중 레스토랑 집계 필요 |
| System Admin | 🔜 예정 | 전체 시스템 통계 |

**참고:** 현재 이 가이드의 모든 내용은 Restaurant Admin 페이지 기준입니다. 다른 역할 추가 시 집계 범위(단일 레스토랑 vs 다중 레스토랑)가 달라질 수 있습니다.

---

## 1. 기본 원칙

### 1.1 통계 유형별 기준

| 페이지/용도 | 주문 기준 | 이유 |
|-------------|----------|------|
| **Reports** | `status === 'completed'` | 실제 매출만 반영 (회계 목적) |
| **Live Orders** | `status !== 'cancelled'` | 운영 현황 파악 (진행중 포함) |
| **Dashboard** | `status === 'completed'` | 실제 매출 요약 |

### 1.2 금액 필드 우선순위

```javascript
// 주문 금액 가져올 때 항상 이 순서로
const amount = parseFloat(
  order.final_price ||      // 최종 금액 (할인 적용 후)
  order.total_amount ||     // 총 금액
  order.total_price ||      // 레거시 필드
  0
);
```

---

## 2. 타임존 처리 (필수)

### 2.1 레스토랑 타임존 가져오기

```javascript
// Frontend - operationSettings에서 가져오기
const getRestaurantTimezone = (settings) => {
  return settings?.timezone || 'Asia/Kuala_Lumpur';
};

// 사용 예시
const timezone = getRestaurantTimezone(operationSettings);
```

### 2.2 날짜 변환 함수

```javascript
// UTC → 레스토랑 타임존 날짜 문자열 (YYYY-MM-DD)
const getDateStringInTimezone = (utcDate, timezone) => {
  const date = new Date(utcDate);
  return date.toLocaleDateString('en-CA', { timeZone: timezone });
};

// UTC → 레스토랑 타임존 시간 (hour)
const getHourInTimezone = (utcDate, timezone) => {
  const date = new Date(utcDate);
  return parseInt(date.toLocaleString('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    hour12: false
  }));
};

// 레스토랑 타임존 기준 오늘 날짜
const getTodayInTimezone = (timezone) => {
  const now = new Date();
  return now.toLocaleDateString('en-CA', { timeZone: timezone });
};
```

### 2.3 Backend에서 타임존 처리

```javascript
// 요청에서 타임존 받기 (기본값: Asia/Kuala_Lumpur)
const timeZone = req.query.timeZone || 'Asia/Kuala_Lumpur';

// 로컬 날짜 → UTC 변환
const getUTCFromLocal = (localDateStr, timezone) => {
  // localDateStr: "2026-02-01" (YYYY-MM-DD)
  const [year, month, day] = localDateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);

  // 타임존 오프셋 계산 후 UTC로 변환
  const tzOffset = getTZOffset(timezone);
  return new Date(localDate.getTime() - tzOffset);
};
```

---

## 3. 기간 필터 기준

### 3.1 항상 "오늘" 기준으로 시작

```javascript
// 기간 계산 시 항상 레스토랑 타임존의 "오늘"부터 역산
const calculateDateRange = (period, timezone) => {
  const today = getTodayInTimezone(timezone);  // "2026-02-01"
  const todayDate = new Date(today + 'T00:00:00');

  switch (period) {
    case 'today':
      return { start: today, end: today };

    case 'week':
      const weekAgo = new Date(todayDate);
      weekAgo.setDate(weekAgo.getDate() - 6);  // 오늘 포함 7일
      return {
        start: weekAgo.toISOString().split('T')[0],
        end: today
      };

    case 'month':
      const monthAgo = new Date(todayDate);
      monthAgo.setDate(monthAgo.getDate() - 29);  // 오늘 포함 30일
      return {
        start: monthAgo.toISOString().split('T')[0],
        end: today
      };

    case 'year':
      // 오늘 포함 365일 (364일 전 ~ 오늘)
      const yearAgo = new Date(todayDate);
      yearAgo.setDate(yearAgo.getDate() - 364);
      return {
        start: yearAgo.toISOString().split('T')[0],
        end: today
      };

    default:
      return { start: today, end: today };
  }
};
```

### 3.2 기간별 의미

| 필터 | 범위 | 설명 |
|------|------|------|
| Today | 오늘 00:00 ~ 23:59 | 레스토랑 타임존 기준 |
| Week | 6일 전 ~ 오늘 | 오늘 포함 7일 |
| Month | 29일 전 ~ 오늘 | 오늘 포함 30일 |
| Year | 364일 전 ~ 오늘 | 오늘 포함 365일 |
| All Time | 전체 기간 | 제한 없음 |

---

## 4. 주문 필터링 패턴

### 4.1 Reports용 (completed만)

```javascript
const filteredOrders = useMemo(() => {
  const timezone = getRestaurantTimezone(operationSettings);

  return orders.filter(order => {
    const orderDateStr = getDateStringInTimezone(order.order_date, timezone);
    const isInRange = orderDateStr >= dateRange.start && orderDateStr <= dateRange.end;
    const isCompleted = order.status === 'completed';

    return isInRange && isCompleted;
  });
}, [orders, dateRange, operationSettings]);
```

### 4.2 Live Orders용 (취소 제외)

```javascript
const filteredOrders = useMemo(() => {
  const timezone = getRestaurantTimezone(operationSettings);

  return orders.filter(order => {
    const orderDateStr = getDateStringInTimezone(order.order_date, timezone);
    const isInRange = orderDateStr >= dateRange.start && orderDateStr <= dateRange.end;
    const isNotCancelled = order.status !== 'cancelled';

    return isInRange && isNotCancelled;
  });
}, [orders, dateRange, operationSettings]);
```

---

## 5. 통계 계산 공식

### 5.1 기본 통계

```javascript
// 총 매출
const totalRevenue = filteredOrders.reduce((sum, order) => {
  return sum + parseFloat(order.total_amount || 0);
}, 0);

// 총 주문 수
const totalOrders = filteredOrders.length;

// 평균 주문 금액
const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

// 최대 주문 금액
const maxOrderValue = Math.max(...filteredOrders.map(o => parseFloat(o.total_amount || 0)), 0);
```

### 5.2 완료율 (Reports에서만)

```javascript
// 전체 주문 중 완료된 비율 (Reports는 이미 completed만이므로 의미 없음)
// Live Orders에서 사용 시:
const completionRate = allOrders.length > 0
  ? (completedOrders.length / allOrders.length) * 100
  : 0;
```

---

## 6. Reports 탭별 가이드

### 6.1 Sales Report 탭 (`?tab=sales`)

**용도:** 매출 요약 및 트렌드 분석

| 카드 | 계산 | 설명 |
|------|------|------|
| Total Revenue | `sum(filteredOrders.total_amount)` | 선택 기간 completed 주문 매출 합계 |
| Total Orders | `filteredOrders.length` | 선택 기간 completed 주문 수 |
| Average Order Value | `Total Revenue / Total Orders` | 주문당 평균 금액 |
| Completed Orders | `filteredOrders.length` | (Total Orders와 동일) |

**차트:**
- Revenue Trend: 기간별 매출 추이 (Today=시간별, Week=일별, Month=일별, Year=월별)
- Sales by Category: 카테고리별 매출 비율
- Hourly Orders: 시간대별 주문 분포

---

### 6.2 Sales Details 탭 (`?tab=details`)

**용도:** 연/월/일 드릴다운 매출 분석

| 카드 | 계산 | 설명 |
|------|------|------|
| Total Revenue | `sum(filteredOrders.total_amount)` | 선택 기간 completed 주문 매출 합계 |
| Total Orders | `filteredOrders.length` | 선택 기간 completed 주문 수 |
| Average Order Value | `Total Revenue / Total Orders` | 주문당 평균 금액 |
| Period | `dateRange.end - dateRange.start` | 선택 기간 일수 |

**드릴다운 테이블 구조:**
```
Year (2026)           Revenue    Orders    Avg
  └─ Month (January)  Revenue    Orders    Avg
       └─ Day (Jan 15) Revenue   Orders    Avg
```

**드릴다운 계산 코드:**
```javascript
const drilldownData = useMemo(() => {
  const timezone = getRestaurantTimezone(operationSettings);
  const yearData = {};

  filteredOrders.forEach(order => {
    const parts = getDatePartsInTimezone(order.order_date, timezone);
    const year = parts.year;
    const month = `${parts.year}-${parts.month}`;
    const day = parts.dateStr;

    // Initialize and aggregate
    if (!yearData[year]) yearData[year] = { revenue: 0, orders: 0, months: {} };
    if (!yearData[year].months[month]) yearData[year].months[month] = { revenue: 0, orders: 0, days: {} };
    if (!yearData[year].months[month].days[day]) yearData[year].months[month].days[day] = { revenue: 0, orders: 0 };

    const amount = parseFloat(order.total_amount || 0);
    yearData[year].revenue += amount;
    yearData[year].orders += 1;
    yearData[year].months[month].revenue += amount;
    yearData[year].months[month].orders += 1;
    yearData[year].months[month].days[day].revenue += amount;
    yearData[year].months[month].days[day].orders += 1;
  });

  return yearData;
}, [filteredOrders, operationSettings]);
```

---

### 6.3 Menu Analysis 탭 (`?tab=menu`)

**용도:** 메뉴별 판매 성과 분석

| 카드 | 계산 | 설명 |
|------|------|------|
| Best Seller | `allMenuData[0].name` | 가장 많이 팔린 메뉴 |
| Total Items Analyzed | `allMenuData.length` | 분석된 메뉴 항목 수 |
| Total Orders | `sum(allMenuData.orders)` | 총 판매 수량 |
| Total Revenue | `sum(allMenuData.revenue)` | 총 메뉴 매출 |

**메뉴 성과 계산:**
```javascript
const allMenuData = useMemo(() => {
  const menuStats = {};

  filteredOrders.forEach(order => {
    order.order_items?.forEach(item => {
      const menuName = item.name || 'Unknown';
      if (!menuStats[menuName]) {
        menuStats[menuName] = { category: item.category, price: item.price, orders: 0, revenue: 0 };
      }
      menuStats[menuName].orders += item.quantity;
      menuStats[menuName].revenue += item.price * item.quantity;
    });
  });

  return Object.entries(menuStats)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.orders - a.orders);
}, [filteredOrders]);
```

---

### 6.4 Customers 탭 (`?tab=customers`)

**용도:** 고객 분석 (멤버십 기반)

| 카드 | 계산 | 설명 |
|------|------|------|
| Total Customers | `customers.length` | 등록된 전체 고객 수 |
| Members | 멤버십 가입 고객 수 | tier가 있는 고객 |
| Average Spent | `sum(total_spent) / customers.length` | 고객당 평균 지출 |
| Total Points | `sum(customers.points)` | 전체 적립 포인트 |

---

### 6.5 Operations 탭 (`?tab=operations`)

**용도:** 운영 효율성 분석

| 통계 | 계산 | 설명 |
|------|------|------|
| Peak Times | 시간대별 주문 집계 | 가장 바쁜 시간대 Top 5 |
| Hourly Distribution | 시간대별 주문 수 | 24시간 주문 분포 |

---

## 7. Live Orders 통계 가이드

### 7.1 하단 통계바

| 통계 | 계산 | 설명 |
|------|------|------|
| Total Sales | `sum(orders.total_amount)` (취소 제외) | 선택 기간 매출 합계 |
| Avg | `Total Sales / orderCount` | 주문당 평균 금액 |
| Max | `max(orders.total_amount)` | 최대 주문 금액 |
| ≥RM20 | 클라이언트 계산 | RM20 이상 주문 비율 |
| Avg/Max/Min Serve | 클라이언트 계산 | 서빙 시간 통계 |

**Backend API (`/api/orders/restaurant/:id/counts`):**
```javascript
// 취소 제외 통계
const salesExcludingCancelled = results
  .filter(row => row.status !== 'cancelled')
  .reduce((sum, row) => sum + parseFloat(row.total_sales || 0), 0);

const avgAmount = totalOrderCount > 0 ? salesExcludingCancelled / totalOrderCount : 0;
```

---

## 8. Dashboard 통계 라벨 규칙

| 기간 | 라벨 | 예시 |
|------|------|------|
| 오늘 | Today's | Today's Sales, Today's Orders |
| 이번 달 | Monthly | Monthly Revenue, Monthly Orders |
| 올해 | This Year | This Year Revenue, This Year Orders |
| 전체 | Total | Total Revenue, Total Orders |

**주의:** "Annual"은 사용하지 않음 (연도가 바뀌면 의미가 모호해짐)

---

## 9. 체크리스트

새로운 통계 기능 개발 시 확인:

- [ ] 타임존을 `operationSettings.timezone`에서 가져오는가?
- [ ] 날짜 필터가 레스토랑 타임존 기준인가?
- [ ] 기간 계산이 "오늘" 기준으로 시작하는가?
- [ ] 주문 상태 필터가 용도에 맞는가? (Reports: completed / Live: 취소제외)
- [ ] 금액 필드 우선순위를 따르는가?
- [ ] 라벨이 기간을 명확히 표시하는가?

---

## 10. 공통 컴포넌트

### DateRangeFilter

**경로:** `src/components/Common/DateRangeFilter.tsx`

**Props:**
```typescript
interface DateRangeFilterProps {
  activePeriod: PeriodType;           // 'today' | 'week' | 'month' | 'year' | 'all'
  dateRange: { start: string; end: string };
  isCustomDateRange: boolean;
  onPeriodChange: (period: PeriodType) => void;
  onDateRangeChange: (field: 'start' | 'end', value: string) => void;
  onDownload?: () => void;            // 다운로드 버튼 클릭 핸들러
  showDownload?: boolean;             // 다운로드 버튼 표시 여부
  timezone?: string;                  // 레스토랑 타임존
}
```

**사용 예시:**
```tsx
import DateRangeFilter, { PeriodType, calculateDateRange } from '../../components/Common/DateRangeFilter';

<DateRangeFilter
  activePeriod={activePeriod}
  dateRange={dateRange}
  isCustomDateRange={isCustomDateRange}
  onPeriodChange={handlePeriodChange}
  onDateRangeChange={handleDateRangeFieldChange}
  onDownload={handleDownloadReport}
  showDownload={true}
  timezone={operationSettings?.timeZone}
/>
```

**헬퍼 함수:**
- `calculateDateRange(period, timezone)`: 기간별 날짜 범위 계산
- `getPeriodLabel(period, isCustom, start, end)`: 기간 라벨 문자열 반환

---

## 11. 관련 파일

| 파일 | 역할 |
|------|------|
| `components/Common/DateRangeFilter.tsx` | **공통 날짜 필터 컴포넌트** |
| `pages/Reports/ReportsPage.tsx` | Reports 통계 (참조 구현) |
| `pages/LiveOrders/LiveOrdersPage.tsx` | Live Orders 통계 (참조 구현) |
| `pages/Restaurant/RestaurantDashboard.tsx` | 대시보드 통계 |
| `routes/dashboard.js` | Backend 대시보드 API |
| `routes/orders.js` | Backend 주문 통계 API |
