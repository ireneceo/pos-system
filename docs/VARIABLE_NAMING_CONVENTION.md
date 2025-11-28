# 변수 네이밍 컨벤션 가이드

> **⚠️ 중요**: 이 문서는 프로젝트 전체의 변수명 표준입니다. 새 기능 개발 시 반드시 참조하세요.

---

## 📋 기본 원칙

| 위치 | 컨벤션 | 예시 |
|------|--------|------|
| **DB 컬럼** | snake_case | `restaurant_id`, `order_type` |
| **JavaScript 변수** | camelCase | `restaurantId`, `orderType` |
| **API Route Params** | camelCase | `/restaurants/:restaurantId` |
| **API Query Params** | 둘 다 지원 | `?restaurantId=1` 또는 `?restaurant_id=1` |
| **API Request Body** | 둘 다 지원 | `{ restaurantId: 1 }` 또는 `{ restaurant_id: 1 }` |

---

## 🔑 ID 변수 매핑 테이블

### 핵심 엔티티

| DB Column | JavaScript | Route Param | 설명 |
|-----------|------------|-------------|------|
| `id` | `id` | `:id` | 기본 PK |
| `restaurant_id` | `restaurantId` | `:restaurantId` | 레스토랑 ID |
| `user_id` | `userId` | `:userId` | 사용자 ID |
| `order_id` | `orderId` | `:orderId` | 주문 ID |
| `manager_id` | `managerId` | `:managerId` | 매니저 ID |
| `product_id` | `productId` | `:productId` | 상품 ID |
| `category_id` | `categoryId` | `:categoryId` | 카테고리 ID |
| `invoice_id` | `invoiceId` | `:invoiceId` | 인보이스 ID |

### 레시피/재고 관련

| DB Column | JavaScript | Route Param | 설명 |
|-----------|------------|-------------|------|
| `recipe_id` | `recipeId` | `:recipeId` | 레시피 ID |
| `ingredient_id` | `ingredientId` | `:ingredientId` | 재료 ID |
| `option_group_id` | `optionGroupId` | `:optionGroupId` | 옵션그룹 ID |
| `option_id` | `optionId` | `:optionId` | 옵션 ID |

### 결제/구독 관련

| DB Column | JavaScript | Route Param | 설명 |
|-----------|------------|-------------|------|
| `payment_id` | `paymentId` | `:paymentId` | 결제 ID |
| `subscription_id` | `subscriptionId` | `:subscriptionId` | 구독 ID |
| `plan_id` | `planId` | `:planId` | 플랜 ID |
| `transaction_id` | `transactionId` | `:transactionId` | 트랜잭션 ID |

---

## 📊 주요 필드 매핑

### 레스토랑 (restaurants)

| DB Column | JavaScript | 타입 | 설명 |
|-----------|------------|------|------|
| `name` | `name` | STRING | 레스토랑명 |
| `business_number` | `businessNumber` | STRING | 사업자번호 |
| `business_name` | `businessName` | STRING | 상호명 |
| `plan_type` | `planType` | STRING | 구독 플랜 타입 |
| `plan_amount` | `planAmount` | DECIMAL | 구독 금액 |
| `trial_ends_at` | `trialEndsAt` | DATE | 체험 종료일 |
| `subscription_ends_at` | `subscriptionEndsAt` | DATE | 구독 종료일 |
| `selected_modules` | `selectedModules` | JSON | 선택된 모듈 |
| `max_tables` | `maxTables` | INTEGER | 최대 테이블 수 |
| `max_users` | `maxUsers` | INTEGER | 최대 사용자 수 |

### 주문 (orders)

| DB Column | JavaScript | 타입 | 설명 |
|-----------|------------|------|------|
| `order_number` | `orderNumber` | STRING | 주문번호 |
| `order_type` | `orderType` | ENUM | dine_in, takeaway, delivery, pickup |
| `order_status` | `orderStatus` | ENUM | pending, preparing, ready, completed, cancelled |
| `table_number` | `tableNumber` | STRING | 테이블번호 |
| `total_amount` | `totalAmount` | DECIMAL | 총액 |
| `payment_method` | `paymentMethod` | STRING | 결제방법 |
| `payment_status` | `paymentStatus` | ENUM | pending, paid, refunded |
| `scheduled_pickup_time` | `scheduledPickupTime` | DATETIME | 예약 픽업 시간 |
| `customer_name` | `customerName` | STRING | 고객명 |
| `customer_phone` | `customerPhone` | STRING | 고객 전화번호 |

### 사용자 (users)

| DB Column | JavaScript | 타입 | 설명 |
|-----------|------------|------|------|
| `username` | `username` | STRING | 사용자명 |
| `full_name` | `fullName` | STRING | 전체 이름 |
| `first_name` | `firstName` | STRING | 이름 |
| `last_name` | `lastName` | STRING | 성 |
| `company_name` | `companyName` | STRING | 회사명 |
| `monthly_salary` | `monthlySalary` | DECIMAL | 월급 |

### 상품 (products)

| DB Column | JavaScript | 타입 | 설명 |
|-----------|------------|------|------|
| `product_name` | `productName` | STRING | 상품명 |
| `product_name_ko` | `productNameKo` | STRING | 상품명 (한국어) |
| `base_price` | `basePrice` | DECIMAL | 기본가격 |
| `display_order` | `displayOrder` | INTEGER | 표시 순서 |
| `is_available` | `isAvailable` | BOOLEAN | 판매 가능 여부 |
| `image_url` | `imageUrl` | STRING | 이미지 URL |

---

## 🔧 백엔드 호환성 패턴

### API에서 둘 다 받기 (권장)

```javascript
// routes/orders.js - GET 예시
router.get('/orders', async (req, res) => {
  const { restaurantId, restaurant_id } = req.query;
  const finalRestaurantId = restaurantId || restaurant_id;

  // finalRestaurantId 사용
});

// routes/orders.js - POST 예시
router.post('/orders', async (req, res) => {
  const { restaurantId, restaurant_id, ...otherData } = req.body;
  const finalRestaurantId = restaurantId || restaurant_id;

  // DB에 저장할 때는 snake_case 사용
  await Order.create({
    restaurant_id: finalRestaurantId,
    ...otherData
  });
});
```

### Route Params는 camelCase로 통일

```javascript
// ✅ 올바른 방식
router.get('/restaurants/:restaurantId/orders', ...)
router.put('/restaurants/:restaurantId/orders/:orderId', ...)

// ❌ 사용하지 않음
router.get('/restaurants/:restaurant_id/orders', ...)
```

---

## 🖥️ 프론트엔드 사용 가이드

### API 호출 시

```typescript
// ✅ 권장: camelCase 사용
const response = await api.get('/orders', {
  params: { restaurantId: 123 }
});

// ✅ 허용: snake_case도 동작 (레거시 호환)
const response = await api.get('/orders', {
  params: { restaurant_id: 123 }
});
```

### 응답 데이터 처리

```typescript
// DB에서 온 데이터는 snake_case
const order = response.data;
console.log(order.restaurant_id);  // snake_case
console.log(order.order_type);     // snake_case

// 컴포넌트 내부에서는 camelCase 변환 권장
const orderData = {
  restaurantId: order.restaurant_id,
  orderType: order.order_type,
  scheduledPickupTime: order.scheduled_pickup_time
};
```

---

## 📁 적용된 라우트 파일 목록

| 파일 | 상태 | 비고 |
|------|------|------|
| `routes/orders.js` | ✅ 둘 다 지원 | GET/POST 모두 호환 |
| `routes/users.js` | ✅ 둘 다 지원 | POST 호환 |
| `routes/menu.js` | ✅ 둘 다 지원 | POST 호환 |
| `routes/optionGroups.js` | ✅ 둘 다 지원 | POST 호환 |
| `routes/invoices.js` | ✅ 둘 다 지원 | POST 호환 |
| `routes/admin-analytics.js` | ✅ 둘 다 지원 | GET 호환 |
| `routes/ingredients.js` | ✅ camelCase | Route params |
| `routes/recipes.js` | ✅ camelCase | Route params |
| `routes/restaurants.js` | ✅ 수정됨 | 설정 덮어쓰기 버그 수정 |

---

## ⚠️ 주의사항

### 절대 하지 말 것

1. **DB 컬럼명을 camelCase로 만들지 않기**
   ```sql
   -- ❌ 금지
   ALTER TABLE orders ADD COLUMN restaurantId INT;

   -- ✅ 올바름
   ALTER TABLE orders ADD COLUMN restaurant_id INT;
   ```

2. **Sequelize 모델에서 field 매핑 변경하지 않기**
   ```javascript
   // 기존 매핑 유지
   restaurant_id: {
     type: DataTypes.INTEGER,
     field: 'restaurant_id'  // 변경 금지
   }
   ```

3. **기존 API 응답 형태 변경하지 않기**
   - 응답은 항상 DB 컬럼명(snake_case) 그대로 반환
   - 프론트엔드에서 필요시 변환

---

## 🔄 새 기능 개발 체크리스트

- [ ] DB 컬럼: snake_case 사용
- [ ] Route params: camelCase 사용
- [ ] Query/Body params: 둘 다 받도록 구현
- [ ] 응답: DB 형식(snake_case) 그대로 반환
- [ ] 이 문서의 매핑 테이블에 새 변수 추가

---

## 📅 업데이트 이력

| 날짜 | 내용 |
|------|------|
| 2025-11-28 | 최초 작성 - 전체 API 호환성 리팩토링 완료 |

