# Migration Guide: Using Centralized Types

This guide shows how to migrate existing code to use the centralized type definitions.

## 📋 Quick Start

Replace inline type definitions with centralized imports:

```typescript
// Before
interface User {
  id: number;
  email: string;
  role: string;
}

// After
import { User } from '@/types';
```

## 🔧 Common Migration Patterns

### 1. Fix Restaurant ID Access (Critical!)

**Problem:** This was causing production bugs

```typescript
// ❌ BEFORE (WRONG - causes undefined errors)
const user = useAuth().user;
const restaurantId = user?.restaurantId;  // undefined!
await addOrder(newOrder, user?.restaurantId);

// ✅ AFTER (CORRECT)
import { User } from '@/types';

const user: User = useAuth().user;  // TypeScript enforces correct shape
const restaurantId = useRestaurantId();  // Use the hook
await addOrder(newOrder, restaurantId);
```

**Real Example from POSTerminalPage.tsx (Line 1509):**

```typescript
// ❌ BEFORE (Line 1509 - WRONG)
const savedOrder: any = await addOrder(
  newOrder,
  user?.restaurantId ? Number(user.restaurantId) : undefined
);

// ✅ AFTER (Line 1509 - CORRECT)
import { User } from '@/types';

// Line 1063 already has this:
const restaurantId = useRestaurantId();

// Line 1509 should use:
const savedOrder: any = await addOrder(
  newOrder,
  restaurantId ? Number(restaurantId) : undefined
);
```

### 2. Order Type Handling

```typescript
// ❌ BEFORE (Inconsistent types)
const [orderType, setOrderType] = useState('dine-in');

const backendOrder = {
  order_type: orderType  // Bug: backend expects 'dine_in' not 'dine-in'
};

// ✅ AFTER (Type-safe)
import { OrderType } from '@/types';

const [orderType, setOrderType] = useState<OrderType>('dine-in');

const backendOrder = {
  order_type: orderType === 'dine-in' ? 'dine_in' : orderType
};
```

### 3. API Response Handling

```typescript
// ❌ BEFORE (No type safety)
const response = await fetch('/api/orders/1');
const data = await response.json();
console.log(data.order_number);  // Could be undefined

// ✅ AFTER (Type-safe)
import { ApiResponse, Order, isApiSuccess } from '@/types';

const response = await fetch('/api/orders/1');
const data: ApiResponse<Order> = await response.json();

if (isApiSuccess(data)) {
  console.log(data.data.order_number);  // TypeScript knows this exists
}
```

### 4. Order Status and Payment Method

```typescript
// ❌ BEFORE (String literals prone to typos)
const [status, setStatus] = useState('pending');
const [paymentMethod, setPaymentMethod] = useState('cash');

if (status === 'complted') {  // TYPO! Should be 'completed'
  // ...
}

// ✅ AFTER (Type-safe)
import { OrderStatus, PaymentMethodType } from '@/types';

const [status, setStatus] = useState<OrderStatus>('pending');
const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('cash');

if (status === 'completed') {  // TypeScript catches typos!
  // ...
}
```

### 5. Product/Menu Items

```typescript
// ❌ BEFORE (Incomplete type)
interface MenuItem {
  id: number;
  name: string;
  price: number;
}

// ✅ AFTER (Complete type)
import { Product, OptionGroup } from '@/types';

const menuItem: Product = {
  id: 1,
  restaurant_id: 1,
  name: 'Burger',
  price: 12.99,
  category: 'Main',
  soldOut: false,
  optionGroups: []  // Properly typed
};
```

### 6. Using Property Constants

```typescript
// ❌ BEFORE (Prone to typos)
const orderId = order['id'];
const restaurantId = order['restaurant_id'];
const orderNum = order['order_number'];
const pickupNum = order['pickupNumber'];  // TYPO! Should be 'pickup_number'

// ✅ AFTER (Safe from typos)
import { ORDER_KEYS } from '@/types';

const orderId = order[ORDER_KEYS.ID];
const restaurantId = order[ORDER_KEYS.RESTAURANT_ID];
const orderNum = order[ORDER_KEYS.ORDER_NUMBER];
const pickupNum = order[ORDER_KEYS.PICKUP_NUMBER];  // TypeScript enforces correct name
```

## 📁 Files to Update

### Priority 1: Critical Files (Fix First)

These files have the most critical bugs to fix:

1. **POSTerminalPage.tsx** - restaurantId bug (ALREADY FIXED)
2. **OrderContext.tsx** - Ensure order creation uses correct types
3. **MobileOrderContext.tsx** - Same restaurant ID issue may exist

### Priority 2: Order-Related Components

Files that handle orders and need type safety:

1. **LiveOrdersPage.tsx** - Order display and status updates
2. **KitchenDisplayPage.tsx** - Order status updates
3. **OrderTrackingPage.tsx** - Customer order tracking
4. **OrderTypePage.tsx** - Order type selection

### Priority 3: Context Providers

Context files that should use centralized types:

1. **AuthContext.tsx** - User type
2. **OrderContext.tsx** - Order types
3. **MobileOrderContext.tsx** - Order types
4. **RestaurantContext.tsx** - Restaurant type

## 🔄 Step-by-Step Migration Process

### Step 1: Add Import

```typescript
import { User, Order, Restaurant, OrderType, PaymentMethodType } from '@/types';
```

### Step 2: Replace Inline Types

Find and replace local interface definitions:

```typescript
// Remove this:
interface User {
  id: number;
  email: string;
}

// Already imported from @/types
```

### Step 3: Add Type Annotations

```typescript
// Before
const [orderType, setOrderType] = useState('dine-in');
const user = useAuth().user;

// After
const [orderType, setOrderType] = useState<OrderType>('dine-in');
const user: User | null = useAuth().user;
```

### Step 4: Fix Property Access

```typescript
// Before
const restaurantId = user?.restaurantId;  // undefined!

// After
const restaurantId = useRestaurantId();  // Correct hook
```

### Step 5: Test

1. Check TypeScript compilation: `npm run build`
2. Test affected features manually
3. Verify no runtime errors

## 🎯 Specific File Examples

### Example 1: POSTerminalPage.tsx

**Location:** Line 1509

```typescript
// ❌ WRONG (causes DB error)
const savedOrder: any = await addOrder(newOrder, user?.restaurantId ? Number(user.restaurantId) : undefined);

// ✅ CORRECT (fixed)
const restaurantId = useRestaurantId();  // Already exists at line 1063
const savedOrder: any = await addOrder(newOrder, restaurantId ? Number(restaurantId) : undefined);
```

### Example 2: OrderTrackingPage.tsx

**Location:** Line 545

```typescript
// Before - Shows for all payment methods
{order?.status === 'awaiting_payment' && (
  <div>Awaiting Payment at Counter</div>
)}

// After - Only shows for counter payment
import { PaymentMethodType } from '@/types';

{order?.status === 'awaiting_payment' && order?.payment_method === 'counter' && (
  <div>Awaiting Payment at Counter</div>
)}
```

### Example 3: LiveOrdersPage.tsx

**Add type safety to order filtering:**

```typescript
// Before
const filteredOrders = orders.filter(order => {
  if (filter === 'pending') return order.status === 'pending';
  // ...
});

// After
import { Order, OrderStatus } from '@/types';

const filteredOrders: Order[] = orders.filter((order: Order) => {
  const statusFilter: OrderStatus = filter as OrderStatus;
  if (statusFilter === 'pending') return order.status === 'pending';
  // ...
});
```

### Example 4: AuthContext.tsx

```typescript
// Before
interface User {
  id: number;
  email: string;
  role: string;
  full_name: string;
}

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {}
});

// After
import { User, AuthContextValue } from '@/types';

export const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false
});
```

## ⚠️ Common Pitfalls During Migration

### Pitfall 1: Forgetting to Update Import Paths

If you're not using the `@/types` alias:

```typescript
// Works if paths are configured in tsconfig.json
import { User } from '@/types';

// Fallback if paths don't work
import { User } from '../types';
import { User } from '../../types';
```

### Pitfall 2: Not Testing After Migration

Always test these scenarios after migration:
- [ ] User login and authentication
- [ ] Creating orders from POS Terminal
- [ ] Creating orders from Mobile Order
- [ ] Order status updates
- [ ] Payment processing
- [ ] Restaurant selection

### Pitfall 3: Mixing Old and New Types

```typescript
// ❌ BAD - Mixing types
import { User } from '@/types';

interface User {  // Duplicate! Will cause conflicts
  id: number;
  email: string;
}

// ✅ GOOD - Use only centralized type
import { User } from '@/types';

// If you need to extend:
interface ExtendedUser extends User {
  additionalField: string;
}
```

## 📊 Migration Checklist

Use this checklist when migrating a file:

- [ ] Import types from `@/types`
- [ ] Remove inline type definitions
- [ ] Add type annotations to state variables
- [ ] Fix property access (especially restaurantId)
- [ ] Handle order type conversions (dine-in → dine_in)
- [ ] Use property name constants where applicable
- [ ] Test TypeScript compilation
- [ ] Test runtime behavior
- [ ] Check for console errors
- [ ] Verify API calls work correctly

## 🚀 Benefits After Migration

After migrating to centralized types, you'll have:

1. ✅ **TypeScript catches bugs** - Typos in property names caught at compile time
2. ✅ **Consistent naming** - No confusion between `restaurantId` vs `restaurant_id`
3. ✅ **IDE autocomplete** - Better IntelliSense suggestions
4. ✅ **Easier refactoring** - Change type once, updates everywhere
5. ✅ **Documentation** - Types serve as inline documentation
6. ✅ **Fewer runtime errors** - Type mismatches caught before deployment

## 📞 Need Help?

If you encounter issues during migration:

1. Check the [README.md](./README.md) for type usage guidelines
2. Look at the type definitions in [index.ts](./index.ts)
3. Search for examples in recently updated files
4. Verify `tsconfig.json` has the correct path aliases configured
