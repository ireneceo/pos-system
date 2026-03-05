# Date Period Filter - Unified Specification

> **Created:** 2026-03-05
> **Reference:** Admin InvoicesPage (`/pos/admin/invoices`)
> **Status:** Approved - Ready for implementation

---

## 1. Overview

All pages with date/period filtering will use a single unified component extracted from Admin InvoicesPage.
The old `DateRangeFilter.tsx` (using `<input type="date">`) will be replaced and deleted.

### Golden Reference
- **Page:** Admin InvoicesPage (`dev-frontend/src/pages/Admin/InvoicesPage.tsx`)
- **Components:** DateButton group + DateRangePickerWrapper + CalendarPicker + SearchInput (with X clear button)
- **CalendarPicker:** No changes. Use as-is from `components/Common/CalendarPicker.tsx`

---

## 2. Button Configurations

### Type A: No Today (13 pages)
```
[ Week ] [ Month ] [ Year ] [ All ] [ Calendar Custom ]
```
- Default: **Month**
- Used by: Invoices, Reports, Analytics, Performance pages

### Type B: With Today (2 pages)
```
[ Today ] [ Week ] [ Month ] [ Year ] [ All ] [ Calendar Custom ]
```
- Default: **Today**
- Used by: Sales, LiveOrders pages

### Button Labels (exact, no aliases)
| Value   | Label   |
|---------|---------|
| today   | Today   |
| week    | Week    |
| month   | Month   |
| year    | Year    |
| all     | All     |
| custom  | Calendar icon + selected date range displayed |

### Period Calculations
| Period | Start Date              | End Date |
|--------|-------------------------|----------|
| today  | Today                   | Today    |
| week   | Today - 6 days          | Today    |
| month  | Today - 29 days         | Today    |
| year   | Today - 364 days        | Today    |
| all    | Earliest data or 2020-01-01 | Today |
| custom | User-selected start     | User-selected end |

---

## 3. Component Design: `DatePeriodFilter`

### Props Interface
```typescript
interface DatePeriodFilterProps {
  // Required
  activePeriod: PeriodType;
  dateRange: { start: string; end: string };
  isCustomDateRange: boolean;
  onPeriodChange: (period: PeriodType) => void;
  onCalendarRangeSelect: (start: string, end: string) => void;

  // Optional
  includeToday?: boolean;        // default: false (Type A)
  defaultPeriod?: PeriodType;    // default: 'month'
  className?: string;
}
```

### Styled Components (extracted from InvoicesPage)
- `FilterControls` - wrapper
- `FilterRow` - flex row with gap
- `DateButton` - period toggle button (active state: #635BFF)
- `DateRangePickerWrapper` - relative wrapper for CalendarPicker
- `DateRangeTrigger` - calendar icon button with date display

### SearchInput
- Uses existing `SearchInput` from `components/Common/FilterComponents.tsx`
- X clear button included
- NOT part of DatePeriodFilter component (placed alongside in FilterRow)

---

## 4. Page-by-Page Application

### System Admin

| # | Page | File | Type | Default | Current State | Change |
|---|------|------|------|---------|---------------|--------|
| 1 | Invoices | Admin/InvoicesPage.tsx | A | Month | CalendarPicker (reference) | Extract to shared component |
| 2 | Reports | Admin/ReportsPage.tsx | A | Month | DateRangeFilter (input type=date) | Replace |
| 3 | Analytics | Admin/AnalyticsPage.tsx | A | Month | DateRangeFilter (input type=date) | Replace |

### Brand General + Brand Manager

| # | Page | File | Type | Default | Current State | Change |
|---|------|------|------|---------|---------------|--------|
| 4 | Invoices | BrandGeneral/BrandInvoicesPage.tsx | A | Month | CalendarPicker (inline) | Switch to shared component |
| 5 | Reports | BrandGeneral/BrandReportsPage.tsx | A | Month | DateRangeFilter (input type=date) | Replace |
| 6 | Performance | BrandGeneral/BrandPerformance.tsx | A | Month | DateRangeFilter (input type=date) | Replace |

### Foodcourt General + Foodcourt Manager

| # | Page | File | Type | Default | Current State | Change |
|---|------|------|------|---------|---------------|--------|
| 7 | Invoices | FoodcourtGeneral/FoodcourtInvoicesPage.tsx | A | Month | CalendarPicker (inline) | Switch to shared component |

### Restaurant Owner

| # | Page | File | Type | Default | Current State | Change |
|---|------|------|------|---------|---------------|--------|
| 8 | Invoices | Owner/OwnerInvoicesPage.tsx | A | Month | CalendarPicker (inline) | Switch to shared component |
| 9 | Reports | Owner/OwnerReportsPage.tsx | A | Month | DateRangeFilter (input type=date) | Replace |
| 10 | Performance | Owner/OwnerPerformance.tsx | A | Month | DateRangeFilter (input type=date) | Replace |

### Brand General + Foodcourt General + Brand/Foodcourt Manager (shared /pos/manager/ routes)

| # | Page | File | Type | Default | Current State | Change |
|---|------|------|------|---------|---------------|--------|
| 11 | Reports | Manager/ManagerReportsPage.tsx | A | Month | DateRangeFilter (input type=date) | Replace |
| 12 | Sales | Manager/SalesPage.tsx | B | Today | DateRangeFilter (input type=date) | Replace |

### Restaurant Admin

| # | Page | File | Type | Default | Current State | Change |
|---|------|------|------|---------|---------------|--------|
| 13 | Invoices | Restaurant/InvoicesPage.tsx | A | Month | CalendarPicker (inline) | Switch to shared component |
| 14 | Reports | Reports/ReportsPage.tsx | A | Month | DateRangeFilter (input type=date) | Replace |

### LiveOrders (all POS roles)

| # | Page | File | Type | Default | Current State | Change |
|---|------|------|------|---------|---------------|--------|
| 15 | Live Orders | LiveOrders/LiveOrdersPage.tsx | B | Today | DateRangeFilter (input type=date) | Replace |

---

## 5. Role-to-Page Mapping

| Role | Accessible Pages with Date Filter |
|------|-----------------------------------|
| System Admin | #1 Invoices, #2 Reports, #3 Analytics, #15 LiveOrders |
| Brand General | #4 Invoices, #5 Reports, #6 Performance, #11 Reports(shared), #12 Sales(shared), #15 LiveOrders |
| Brand Manager | #4 Invoices, #5 Reports, #6 Performance, #11 Reports(shared), #12 Sales(shared), #15 LiveOrders |
| Foodcourt General | #7 Invoices, #11 Reports(shared), #12 Sales(shared), #15 LiveOrders |
| Foodcourt Manager | #7 Invoices, #11 Reports(shared), #12 Sales(shared), #15 LiveOrders |
| Restaurant Owner | #8 Invoices, #9 Reports, #10 Performance |
| Restaurant Admin | #13 Invoices, #14 Reports, #15 LiveOrders |

---

## 6. Existing Filters (Preserved)

Each page may have additional filters alongside DatePeriodFilter. These are NOT changed - only style-unified into the same FilterRow.

| Page | Additional Filters |
|------|--------------------|
| Admin/InvoicesPage | SearchInput, Status tab, Create button |
| Admin/ReportsPage | Currency select, Export button, Tabs |
| Admin/AnalyticsPage | Tabs |
| BrandGeneral/BrandReportsPage | (none) |
| BrandGeneral/BrandPerformance | Restaurant FilterSelect |
| BrandGeneral/BrandInvoicesPage | SearchInput, Status |
| FoodcourtGeneral/FoodcourtInvoicesPage | SearchInput, Status |
| Owner/OwnerInvoicesPage | SearchInput, Status |
| Owner/OwnerReportsPage | (none) |
| Owner/OwnerPerformance | Restaurant FilterSelect |
| Manager/ManagerReportsPage | Restaurant FilterSelect |
| Manager/SalesPage | Restaurant FilterSelect |
| Restaurant/InvoicesPage | SearchInput, Status |
| Reports/ReportsPage | Currency select, Export button |
| LiveOrders/LiveOrdersPage | SearchInput, Download button |

---

## 7. Files to Create / Modify / Delete

### Create
- `components/Common/DatePeriodFilter.tsx` - New shared component

### Modify (10 pages - replace DateRangeFilter)
- Admin/ReportsPage.tsx
- Admin/AnalyticsPage.tsx
- BrandGeneral/BrandReportsPage.tsx
- BrandGeneral/BrandPerformance.tsx
- Owner/OwnerReportsPage.tsx
- Owner/OwnerPerformance.tsx
- Manager/ManagerReportsPage.tsx
- Manager/SalesPage.tsx
- Reports/ReportsPage.tsx
- LiveOrders/LiveOrdersPage.tsx

### Modify (4 pages - switch to shared component)
- BrandGeneral/BrandInvoicesPage.tsx
- FoodcourtGeneral/FoodcourtInvoicesPage.tsx
- Owner/OwnerInvoicesPage.tsx
- Restaurant/InvoicesPage.tsx

### Refactor (1 page - extract to shared)
- Admin/InvoicesPage.tsx

### Delete
- `components/Common/DateRangeFilter.tsx` (after all migrations complete)

---

## 8. Implementation Order

1. Create `DatePeriodFilter.tsx` shared component (extract from InvoicesPage)
2. Refactor Admin/InvoicesPage to use shared component (verify no regression)
3. Replace DateRangeFilter pages (10 pages, batch by role)
4. Switch Invoice pages to shared component (4 pages)
5. Delete `DateRangeFilter.tsx`
6. Build + full verification
