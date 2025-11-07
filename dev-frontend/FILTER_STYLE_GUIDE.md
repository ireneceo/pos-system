# Filter Style Guide for Admin Pages

## ⚠️ CRITICAL RULES - MUST FOLLOW

### 1. Required Import Statement
**ALL Admin pages with filters MUST include this import:**
```typescript
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
```

### 2. Standard JSX Structure
**ALWAYS use this exact structure order:**
```jsx
<StatsGrid>
  {/* Stats cards go here */}
</StatsGrid>

<FilterBar>
  <SearchInput placeholder="Search..." value={searchValue} onChange={handleSearchChange} />
  <FilterSelect value={filterValue} onChange={handleFilterChange}>
    <option value="">All Items</option>
    <option value="option1">Option 1</option>
  </FilterSelect>
  {/* Additional filters as needed */}
</FilterBar>

<TableContainer>
  <Table>
    {/* Table content */}
  </Table>
</TableContainer>
```

### 3. What is FORBIDDEN ❌

#### NEVER use these styled components in Admin pages:
```typescript
// ❌ FORBIDDEN - DO NOT USE
const SearchInput = styled.input`...`;
const FilterSelect = styled.select`...`;
const Select = styled.select`...`;
const FiltersContainer = styled.div`...`;
const FilterGroup = styled.div`...`;
const FilterLabel = styled.label`...`;
```

#### NEVER put filters inside these components:
```jsx
{/* ❌ WRONG - Filters inside table containers */}
<TableContainer>
  <SearchInput />
  <FilterSelect />
</TableContainer>

{/* ❌ WRONG - Filters inside table headers */}
<TableHeader>
  <SearchInput />
</TableHeader>
```

### 4. Correct Component Usage ✅

#### Standard Filter Components:
```typescript
// ✅ CORRECT - Use imported components
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

// ✅ CORRECT - Basic usage
<FilterBar>
  <SearchInput
    placeholder="Search restaurants..."
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

#### For Complex Filters:
```typescript
// ✅ CORRECT - Complex filters with custom components mixed in
<FilterBar>
  <SearchInput placeholder="Search..." value={search} onChange={handleSearch} />
  <FilterSelect value={status} onChange={handleStatus}>
    <option value="">All Status</option>
  </FilterSelect>

  {/* Custom components for specific needs */}
  <DateInput type="date" value={date} onChange={handleDate} />
  <CustomDropdown>...</CustomDropdown>
</FilterBar>
```

### 5. Common Filter Patterns

#### Basic Search + Status Filter:
```jsx
<FilterBar>
  <SearchInput
    placeholder="Search items..."
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

#### Multiple Filter Selects:
```jsx
<FilterBar>
  <SearchInput placeholder="Search..." value={search} onChange={handleSearch} />
  <FilterSelect value={type} onChange={handleType}>
    <option value="">All Types</option>
    <option value="type1">Type 1</option>
  </FilterSelect>
  <FilterSelect value={category} onChange={handleCategory}>
    <option value="">All Categories</option>
    <option value="cat1">Category 1</option>
  </FilterSelect>
</FilterBar>
```

### 6. Layout Requirements

#### FilterBar Position:
- **ALWAYS** place FilterBar OUTSIDE any table container
- **ALWAYS** place FilterBar AFTER StatsGrid (if present)
- **ALWAYS** place FilterBar BEFORE TableContainer

#### Responsive Design:
- FilterComponents automatically handle mobile responsiveness
- SearchInput will stack on mobile devices
- FilterSelect components adjust width automatically

### 7. Form Components vs Filter Components

#### Use FilterComponents for:
- ✅ Page-level filtering (searching, status filtering, category filtering)
- ✅ Real-time data filtering
- ✅ User preference filtering

#### Use FormComponents for:
- ✅ Modal forms
- ✅ Data entry forms
- ✅ Edit dialogs
- ✅ Settings forms

```typescript
// ✅ CORRECT - Form components for modals
import { FormInput, FormSelect } from '../UI';

// ✅ CORRECT - Filter components for page filters
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';
```

### 8. Migration Checklist

When updating an Admin page:

- [ ] Add the correct import statement
- [ ] Remove all duplicate styled components (SearchInput, FilterSelect, Select, FiltersContainer, FilterGroup, FilterLabel)
- [ ] Replace FiltersContainer with FilterBar
- [ ] Replace custom SearchInput with imported SearchInput
- [ ] Replace custom Select/FilterSelect with imported FilterSelect
- [ ] Remove FilterGroup and FilterLabel wrappers
- [ ] Ensure FilterBar is outside TableContainer
- [ ] Test responsiveness on mobile

### 9. Examples of Correct vs Incorrect

#### ❌ INCORRECT Implementation:
```jsx
const SearchInput = styled.input`...`; // Duplicate component
const FilterSelect = styled.select`...`; // Duplicate component

<FiltersContainer>
  <FilterGroup>
    <FilterLabel>Search</FilterLabel>
    <SearchInput placeholder="Search..." />
  </FilterGroup>
</FiltersContainer>
```

#### ✅ CORRECT Implementation:
```jsx
import { FilterBar, SearchInput, FilterSelect } from '../../components/Common/FilterComponents';

<FilterBar>
  <SearchInput placeholder="Search..." />
  <FilterSelect>
    <option value="">All</option>
  </FilterSelect>
</FilterBar>
```

### 10. Performance Benefits

Using standardized filter components provides:
- **Consistent styling** across all Admin pages
- **Automatic responsive design**
- **Reduced bundle size** (no duplicate styled components)
- **Easier maintenance** (single source of truth)
- **Better accessibility** (built-in focus management)

---

## Summary

**ALWAYS**:
- Use the common FilterComponents import
- Place FilterBar outside table containers
- Follow the StatsGrid → FilterBar → TableContainer structure

**NEVER**:
- Create duplicate styled filter components
- Put filters inside TableContainer or TableHeader
- Use old FilterGroup/FilterLabel patterns

**Remember**: This standardization prevents the need for manual filter fixes in the future and ensures 100% consistency across all Admin pages.