# Type Definitions Guide

This directory contains centralized type definitions for the entire application. Following these guidelines will prevent common errors related to variable naming inconsistencies and duplicate type definitions.

## 📋 Table of Contents

- [Why Centralized Types?](#why-centralized-types)
- [Usage Rules](#usage-rules)
- [Common Patterns](#common-patterns)
- [Adding New Types](#adding-new-types)
- [Deprecating Types](#deprecating-types)
- [Common Mistakes to Avoid](#common-mistakes-to-avoid)

## 🎯 Why Centralized Types?

**Problem Example:**
```typescript
// ❌ BAD: This caused a production bug
const restaurantId = useRestaurantId();  // Returns number
const result = await addOrder(newOrder, user?.restaurantId);  // user.restaurantId doesn't exist!
```

**Solution with Centralized Types:**
```typescript
// ✅ GOOD: TypeScript will catch the error
import { User } from '@/types';

const user: User = useAuth().user;  // User interface doesn't have restaurantId property
const restaurantId = useRestaurantId();  // TypeScript enforces correct variable usage
```

## 📜 Usage Rules

### Rule 1: Always Import from Centralized Types

```typescript
// ✅ GOOD
import { User, Restaurant, Order, OrderType } from '@/types';

// ❌ BAD - Don't define types inline
interface User {
  id: number;
  email: string;
  // ...
}
```

### Rule 2: Check Existing Types Before Creating New Ones

Before defining a new type:
1. Search `/var/www/dev-frontend/src/types/index.ts`
2. Check if a similar type exists
3. If similar type exists, use it or extend it
4. Only create new types when necessary

```typescript
// ✅ GOOD - Extend existing type
import { Order } from '@/types';

interface OrderWithDetails extends Order {
  customerAddress: string;
}

// ❌ BAD - Creating duplicate
interface MyOrder {
  id: number;
  order_number: string;
  // ... duplicating Order type
}
```

### Rule 3: Use Property Name Constants

```typescript
// ✅ GOOD - Use constants to avoid typos
import { ORDER_KEYS, RESTAURANT_KEYS } from '@/types';

const orderId = order[ORDER_KEYS.ID];
const restaurantId = order[ORDER_KEYS.RESTAURANT_ID];

// ❌ BAD - Prone to typos
const orderId = order['id'];
const restaurantId = order['restaurantId'];  // TYPO! Should be 'restaurant_id'
```

### Rule 4: Update Backend Types When API Changes

When backend API response structure changes:
1. Update the corresponding type in `index.ts`
2. Search codebase for usages
3. Update all usages to match new structure
4. Test thoroughly

## 🔧 Common Patterns

### Pattern 1: Using User Type (Important!)

```typescript
import { User } from '@/types';

// ✅ GOOD
const user: User = useAuth().user;
const restaurantId = useRestaurantId();  // Get from hook, NOT from user object

// ❌ BAD - User doesn't have restaurantId!
const restaurantId = user?.restaurantId;  // This property doesn't exist
```

### Pattern 2: Order Type Conversion

Backend uses both `dine-in` and `dine_in`. Use the type safely:

```typescript
import { OrderType } from '@/types';

// ✅ GOOD - Handle both formats
const orderType: OrderType = 'dine-in';
const backendOrderType = orderType === 'dine-in' ? 'dine_in' : orderType;

// Use helper if needed
function normalizeOrderType(type: OrderType): 'dine_in' | 'takeaway' {
  return type === 'dine-in' ? 'dine_in' : 'takeaway';
}
```

### Pattern 3: API Response Handling

```typescript
import { ApiResponse, isApiSuccess, isApiError } from '@/types';

async function fetchData() {
  const response: ApiResponse<Order> = await api.get('/orders/1');

  // ✅ GOOD - Use type guards
  if (isApiSuccess(response)) {
    const order = response.data;  // TypeScript knows this is Order
    console.log(order.order_number);
  } else if (isApiError(response)) {
    console.error(response.message);  // TypeScript knows this is error
  }
}
```

### Pattern 4: Working with Restaurant ID

```typescript
import { useRestaurantId } from '@/contexts/RestaurantContext';

function MyComponent() {
  // ✅ GOOD - Get from hook
  const restaurantId = useRestaurantId();

  // ✅ GOOD - Get from URL params
  const { slug } = useParams();

  // ✅ GOOD - Get from context
  const { currentStore } = useMobileOrder();
  const restaurantId = currentStore?.id;

  // ❌ NEVER do this
  const user = useAuth().user;
  const restaurantId = user?.restaurantId;  // DOESN'T EXIST!
}
```

## ➕ Adding New Types

### Step 1: Check if Type Already Exists

Search in `index.ts` for similar types:
```bash
# Search for existing types
grep -i "interface.*Order" src/types/index.ts
grep -i "interface.*Product" src/types/index.ts
```

### Step 2: Add to Appropriate Section

Add new types in the correct section:
- User/Auth types → `USER & AUTHENTICATION TYPES` section
- Restaurant types → `RESTAURANT TYPES` section
- Order types → `ORDER TYPES` section
- Product types → `PRODUCT/MENU TYPES` section
- API types → `API RESPONSE TYPES` section

### Step 3: Add JSDoc Comments

```typescript
/**
 * Description of what this type represents
 *
 * IMPORTANT: Any critical usage notes
 *
 * @example
 * const example: MyType = {
 *   field: 'value'
 * };
 */
export interface MyType {
  field: string;
}
```

### Step 4: Add Property Constants if Needed

```typescript
export const MY_TYPE_KEYS = {
  FIELD: 'field',
  OTHER_FIELD: 'other_field'
} as const;
```

## 🗑️ Deprecating Types

When a type is no longer needed:

### Step 1: Mark as Deprecated

```typescript
/**
 * @deprecated Use NewType instead. Will be removed in v2.0.0 (December 2025)
 */
export interface OldType {
  // ...
}
```

### Step 2: Search and Replace Usages

```bash
# Find all usages
grep -r "OldType" src/

# Replace with new type
# Update all files found
```

### Step 3: Remove After Grace Period

After the removal date and ensuring no usages remain:
1. Remove the deprecated type from `index.ts`
2. Remove related constants
3. Update this README

## ⚠️ Common Mistakes to Avoid

### Mistake 1: Assuming User Has restaurantId

```typescript
// ❌ WRONG
const user = useAuth().user;
const restaurantId = user?.restaurantId;  // undefined!

// ✅ CORRECT
const restaurantId = useRestaurantId();  // Use the hook
```

### Mistake 2: Using Wrong Property Names

```typescript
// ❌ WRONG - Snake case vs camel case confusion
const orderNumber = order.orderNumber;  // undefined! Backend uses snake_case

// ✅ CORRECT
const orderNumber = order.order_number;  // Backend property name

// ✅ EVEN BETTER - Use constants
import { ORDER_KEYS } from '@/types';
const orderNumber = order[ORDER_KEYS.ORDER_NUMBER];
```

### Mistake 3: Mixing Order Type Formats

```typescript
// ❌ WRONG - Inconsistent format
if (order.order_type === 'dine-in') {  // Frontend format
  await api.post('/orders', { order_type: 'dine-in' });  // Backend expects 'dine_in'
}

// ✅ CORRECT
const frontendOrderType: OrderType = 'dine-in';
const backendOrderType = frontendOrderType === 'dine-in' ? 'dine_in' : frontendOrderType;
await api.post('/orders', { order_type: backendOrderType });
```

### Mistake 4: Creating Duplicate Types

```typescript
// ❌ WRONG - Duplicate type
interface MyOrder {
  id: number;
  order_number: string;
  status: string;
}

// ✅ CORRECT - Use existing type
import { Order } from '@/types';

function processOrder(order: Order) {
  // ...
}
```

### Mistake 5: Not Using Type Guards

```typescript
// ❌ WRONG - No type safety
const response = await api.get('/orders/1');
if (response.success) {  // TypeScript doesn't know the shape
  console.log(response.data.order_number);  // Could be undefined
}

// ✅ CORRECT - Use type guards
import { ApiResponse, isApiSuccess } from '@/types';

const response: ApiResponse<Order> = await api.get('/orders/1');
if (isApiSuccess(response)) {
  console.log(response.data.order_number);  // TypeScript knows this exists
}
```

## 🔍 Quick Reference

### Where to Get Restaurant ID

| ❌ WRONG | ✅ CORRECT |
|---------|-----------|
| `user?.restaurantId` | `useRestaurantId()` |
| `user?.restaurant_id` | `useParams().slug` then fetch |
| | `currentStore?.id` from context |

### Backend Property Names (Snake Case)

| Frontend | Backend |
|----------|---------|
| orderId | order_id |
| orderNumber | order_number |
| orderType: 'dine-in' | order_type: 'dine_in' |
| restaurantId | restaurant_id |
| customerId | customer_id |
| paymentMethod | payment_method |

### Import Shortcuts

Add to `tsconfig.json` for easier imports:
```json
{
  "compilerOptions": {
    "paths": {
      "@/types": ["src/types"]
    }
  }
}
```

Then use:
```typescript
import { User, Order, Restaurant } from '@/types';
```

## 📞 Questions?

If you're unsure about:
- Whether to create a new type or use existing
- How to name a property
- Backend vs frontend format differences

Check this README first, then review existing code in the same domain.
