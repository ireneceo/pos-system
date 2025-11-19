# Currency Replacement Summary

## Completed Files (22 instances replaced)

### ✅ Group 1 - Admin Pages (PARTIAL)
1. **AdminDashboard.tsx** - 9 instances ✅
   - Added imports: `formatCurrency` and `useStore`
   - Added `const { operationSettings } = useStore();`
   - Replaced all `RM {value}` with `{formatCurrency(value, operationSettings.currency)}`

2. **StaffManagementPage.tsx** - 3 instances ✅
   - Added imports and operationSettings
   - Replaced salary displays

3. **ManagersPage.tsx** - 2 instances ✅
   - Added imports and operationSettings
   - Replaced revenue displays

### ✅ Group 5 - Utils (COMPLETE)
4. **thermalPrinter.ts** - 7 instances ✅
   - Added `import { formatCurrency } from './currency';`
   - Added `currency: string = 'MYR'` parameter to functions
   - Replaced all RM instances with `formatCurrency(value, currency)`

5. **paymentStatus.ts** - 1 instance ✅
   - Replaced local formatCurrency with re-export from currency.ts

## TOTAL COMPLETED: 22 instances across 5 files

---

## Remaining Files - Implementation Pattern

### Pattern for ALL remaining files:

#### Step 1: Add Imports (at top of file)
```typescript
import { formatCurrency } from '../../utils/currency';  // Adjust path as needed
import { useStore } from '../../contexts/StoreContext';
```

#### Step 2: Add Hook (in component function)
```typescript
const YourComponent: React.FC = () => {
  const { operationSettings } = useStore();
  // ... rest of component
```

#### Step 3: Replace Patterns
```typescript
// Pattern 1: Simple display
RM {amount.toFixed(2)}  →  {formatCurrency(amount, operationSettings.currency)}

// Pattern 2: In template strings
`RM ${amount}`  →  `${formatCurrency(amount, operationSettings.currency)}`

// Pattern 3: With toLocaleString
RM {amount.toLocaleString()}  →  {formatCurrency(amount, operationSettings.currency)}

// Pattern 4: Negative amounts
-RM {amount}  →  {formatCurrency(-amount, operationSettings.currency)}

// Pattern 5: In CSV/exports
'RM ' + amount  →  formatCurrency(amount, operationSettings.currency)

// Pattern 6: Plan prices (keep as labels)
"Basic Plan (RM 29/month)"  →  NO CHANGE (these are plan descriptions, not dynamic values)
```

---

## Remaining Files by Priority

### 🔴 HIGH PRIORITY - Admin Pages (66 instances)

#### AnalyticsPage.tsx (30 instances)
Lines to replace: 826, 828, 867, 869, 978, 979, 1033, 1094, 1307, 1364, 1382, 1389, 1545, 1546, 1598, 1600, 1671, 1722, 1737, 1744, 1935, 1937, 1981, 1983, 2127, 2264, 2349, 2554, 2620, 2658

#### InvoicesPage.tsx (11 instances)
Lines: 1170 (local formatCurrency function - replace with import), 2085, 2089, 2093, 2171, 2178, 2182, 2186, 2487, 2491, 2495

#### RestaurantsPage.tsx (9 instances)
Lines: 743, 1206, 1321, 1477-1479 (keep as labels), 1711-1713 (keep as labels)
**Only 3 actual instances to replace** (743, 1206, 1321)

#### RestaurantSubscriptionsPage.tsx (8 instances)
Lines: 657 (local formatCurrency - replace with import), 764, 1097-1099 (keep as labels), 1214-1216 (keep as labels)
**Only 2 actual instances to replace** (764)

#### SubscriptionsPage.tsx (7 instances)
Lines: 884, 931, 1003, 1260, 1366, 1454, 1617

#### PlansPage.tsx (1 instance)
Line: 785 (local formatCurrency function - replace with import)

---

### 🟠 MEDIUM PRIORITY - Manager Pages (80 instances)

#### ManagerPromotionsPage.tsx (12 instances)
Lines: 659, 667, 679, 719, 739 (keep as conditions text), 862, 1070, 1133, 1171, 1212, 1213, 1220

#### Manager InvoicesPage.tsx (12 instances)
Lines: 557 (local formatCurrency - replace), 1018, 1022, 1026, 1092, 1099, 1103, 1107, 1173, 1406, 1410, 1414

#### ManagerReportsPage.tsx (9 instances)
Lines: 318, 320, 335, 347, 409, 419, 544, 585, 586

#### Manager RestaurantsPage.tsx (8 instances)
Lines: 809, 854, 963-965 (keep as labels), 1163-1165 (keep as labels)
**Only 2 actual instances** (809, 854)

#### Manager SubscriptionsPage.tsx (7 instances)
Lines: 555 (local formatCurrency - replace), 934, 947, 960, 1047, 1060, 1073

#### SalesPage.tsx (6 instances)
Lines: 387, 401, 482, 488, 489, 490

#### ManagerCustomersPage.tsx (3 instances)
Lines: 252, 256, 324

#### SignupPage.tsx (4 instances)
Lines: 358, 491, 510, 514

#### ManagerDashboard.tsx (2 instances)
Lines: 317, 402

#### Manager StaffManagementPage.tsx (1 instance)
Line: 784

#### ManagerSubscriptionsPage.tsx (2 instances)
Lines: 510, 522

---

### 🟡 LOWER PRIORITY - Restaurant/Brand Pages (30 instances)

#### RestaurantDashboard.tsx (10 instances)
Lines: 555, 573, 591, 609, 697, 710, 739, 770, 783, 922

#### Restaurant InvoicesPage.tsx (6 instances)
Lines: 713, 714, 722, 726, 730, 757 (local formatCurrency - replace)

#### BrandPerformance.tsx (8 instances)
Lines: 583 (and others - run grep to find all)

#### BrandGeneralDashboard.tsx (3 instances)
Lines: 587, 628, 663

#### BrandReports.tsx (5 instances)
Lines: 476, 511, 519, 622, 630

#### BrandManagerDashboard.tsx (3 instances)
Lines: 408, 449, 482

#### FranchiseSupport.tsx (1 instance)
Line: 583

---

### 🟢 OTHER Pages (25 instances)

#### POSTerminalPage.tsx (6 instances)
Lines: 1489, 1492, 2318, 2324, 2330 (discount labels - keep as is)

#### Promotions PromotionsPage.tsx (3 instances)
Lines: 411, 472, 530

#### CustomersPage.tsx (4 instances)
Lines: 698, 758, 832, 841

#### InvoiceSettingsPage.tsx (4 instances)
Lines: 613, 661, 663, 665

#### FoodcourtStats.tsx (3 instances)
Lines: 213, 215, 364

#### FoodcourtGeneralDashboard.tsx (3 instances)
Lines: 581, 622, 657

#### FoodcourtManagerDashboard.tsx (3 instances)
Lines: 400, 408, 474

#### FoodcourtManagement.tsx (2 instances)
Lines: 399, 437

---

## Quick Reference Commands

### Find all remaining RM instances in a file:
```bash
grep -n "RM \{\\|RM \$\\|RM [0-9]" /path/to/file.tsx
```

### Verify imports exist:
```bash
grep "formatCurrency\\|useStore" /path/to/file.tsx
```

---

## Notes

1. **Plan prices in option labels**: Leave as-is (e.g., "Basic Plan (RM 29/month)")
2. **Discount condition text**: Leave as-is (e.g., "Valid for orders above RM 50")
3. **Local formatCurrency functions**: Replace with import from currency.ts
4. **CSV exports**: Use formatCurrency without JSX braces
5. **Template literals**: Wrap formatCurrency in `${}`

---

## Implementation Checklist

- [x] AdminDashboard.tsx
- [x] StaffManagementPage (Admin)
- [x] ManagersPage
- [x] thermalPrinter.ts
- [x] paymentStatus.ts
- [ ] AnalyticsPage.tsx (30 instances) - HIGH PRIORITY
- [ ] InvoicesPage (Admin) (11 instances)
- [ ] RestaurantsPage (Admin) (3 instances)
- [ ] RestaurantSubscriptionsPage (2 instances)
- [ ] SubscriptionsPage (Admin) (7 instances)
- [ ] PlansPage (1 instance)
- [ ] All Manager Pages (12 files)
- [ ] All Restaurant/Brand Pages (7 files)
- [ ] All Other Pages (8 files)

**TOTAL PROGRESS: 22/200+ instances completed (11%)**

---

## Automation Script Template

For bulk processing, you can use this pattern:

```typescript
// Example for a single file
// 1. Add imports at top
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../contexts/StoreContext';

// 2. Add hook in component
const { operationSettings } = useStore();

// 3. Replace all patterns using Find & Replace (regex)
// Find: RM \{([^}]+)\}
// Replace: {formatCurrency($1, operationSettings.currency)}

// Find: RM \$\{([^}]+)\}
// Replace: ${formatCurrency($1, operationSettings.currency)}
```

---

## Testing Checklist

After replacements:
- [ ] No TypeScript errors
- [ ] All imports resolve correctly
- [ ] Currency displays properly in UI
- [ ] Different currencies work (MYR, USD, SGD, etc.)
- [ ] CSV exports format correctly
- [ ] Print receipts show correct currency
- [ ] Invoice PDFs display correctly

