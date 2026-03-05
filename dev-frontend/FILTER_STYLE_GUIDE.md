# Filter Style Guide

## CRITICAL RULES - MUST FOLLOW

### 1. Date/Period Filter (ALL pages with date filtering)

**Reference:** Admin InvoicesPage (`/pos/admin/invoices`)
**Spec:** `docs/DATE_PERIOD_FILTER_SPEC.md`

#### Required Import
```typescript
import DatePeriodFilter from '../../components/Common/DatePeriodFilter';
import CalendarPicker from '../../components/Common/CalendarPicker';
import { SearchInput } from '../../components/Common/FilterComponents';
```

#### Two Configurations

**Type A** - No Today (Invoices, Reports, Analytics, Performance):
```
[ Week ] [ Month ] [ Year ] [ All ] [ Calendar Custom ]
```
Default: Month

**Type B** - With Today (Sales, LiveOrders):
```
[ Today ] [ Week ] [ Month ] [ Year ] [ All ] [ Calendar Custom ]
```
Default: Today

#### Standard JSX Structure
```jsx
<FilterControls>
  <FilterRow>
    <DateButton active={activePeriod === 'week'} onClick={() => handlePeriodChange('week')}>
      Week
    </DateButton>
    <DateButton active={activePeriod === 'month'} onClick={() => handlePeriodChange('month')}>
      Month
    </DateButton>
    <DateButton active={activePeriod === 'year'} onClick={() => handlePeriodChange('year')}>
      Year
    </DateButton>
    <DateButton active={activePeriod === 'all'} onClick={() => handlePeriodChange('all')}>
      All
    </DateButton>

    <DateRangePickerWrapper>
      <DateRangeTrigger active={isCustomDateRange} onClick={() => setShowDatePicker(!showDatePicker)}>
        <CalendarIcon />
        {dateRange.start && dateRange.end ? `${dateRange.start} ~ ${dateRange.end}` : 'Custom Range'}
      </DateRangeTrigger>
      <CalendarPicker
        isOpen={showDatePicker}
        startDate={dateRange.start}
        endDate={dateRange.end}
        onRangeSelect={handleCalendarRangeSelect}
        onClose={() => setShowDatePicker(false)}
      />
    </DateRangePickerWrapper>

    <SearchInput
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </FilterRow>
</FilterControls>
```

#### FORBIDDEN
```typescript
// NEVER use these for date filtering
import DateRangeFilter from '...';          // Deleted component
<input type="date" />                       // Browser default date picker
<DateRangeInput type="date" />              // Old pattern
```

---

### 2. Search & Select Filters (ALL pages)

#### Required Import
```typescript
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
```

#### Standard JSX Structure
```jsx
<StatsGrid>
  {/* Stats cards */}
</StatsGrid>

<FilterBar>
  <SearchInput placeholder="Search..." value={searchValue} onChange={handleSearchChange} />
  <FilterSelect value={filterValue} onChange={handleFilterChange}>
    <option value="">All Items</option>
    <option value="option1">Option 1</option>
  </FilterSelect>
</FilterBar>

<TableContainer>
  <Table>{/* Table content */}</Table>
</TableContainer>
```

#### FORBIDDEN
```typescript
// NEVER create these styled components
const SearchInput = styled.input`...`;
const FilterSelect = styled.select`...`;
const Select = styled.select`...`;
const FiltersContainer = styled.div`...`;
const FilterGroup = styled.div`...`;
const FilterLabel = styled.label`...`;
```

#### NEVER put filters inside these:
```jsx
<TableContainer><SearchInput /></TableContainer>   // WRONG
<TableHeader><SearchInput /></TableHeader>          // WRONG
```

---

### 3. Layout Rules

- FilterBar / FilterControls: ALWAYS outside table containers
- FilterBar: AFTER StatsGrid, BEFORE TableContainer
- SearchInput: X clear button included (from FilterComponents)
- Mobile: Components auto-stack responsively

---

### 4. Form vs Filter Components

| Use Case | Component Source |
|----------|-----------------|
| Page-level filtering | `FilterComponents` (FilterBar, SearchInput, FilterSelect) |
| Date period filtering | `DatePeriodFilter` + `CalendarPicker` |
| Modal forms | `FormInput`, `FormSelect` from UI |
| Settings forms | `FormInput`, `FormSelect` from UI |

---

### 5. Migration Checklist

When updating any page with filters:

- [ ] Import from shared components (no local styled duplicates)
- [ ] Date filtering uses DatePeriodFilter + CalendarPicker (NOT input type=date)
- [ ] Search uses SearchInput from FilterComponents (with X clear button)
- [ ] Select filters use FilterSelect from FilterComponents
- [ ] Filters placed outside TableContainer
- [ ] Test responsiveness on mobile
- [ ] Build passes with 0 warnings in modified files
