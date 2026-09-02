# Inventory Management System - 재고 관리 시스템

**작성일:** 2025-12-19
**프로젝트:** Purple POS System
**Phase:** Phase 3 - Advanced Inventory
**상태:** 개발 예정

---

## 목차

1. [개요](#개요)
2. [핵심 개념](#핵심-개념)
3. [사용자 워크플로우](#사용자-워크플로우)
4. [데이터베이스 설계](#데이터베이스-설계)
5. [API 설계](#api-설계)
6. [Frontend 설계](#frontend-설계)
7. [계산 로직](#계산-로직)
8. [UI/UX 가이드](#uiux-가이드)

---

## 개요

### 목적
- 레스토랑의 재료 재고를 체계적으로 관리
- 판매 시 자동 재고 차감으로 실시간 재고 파악
- 정기 재고 실사를 통한 Loss(로스) 분석
- 발주 필요 시점 및 수량 자동 제안

### 핵심 원칙
1. **단순함**: 복잡한 설정 없이 바로 사용 가능
2. **자동화**: 판매 시 자동 차감, 알림 자동 생성
3. **투명성**: 모든 재고 변동 내역 기록
4. **실용성**: 실제 레스토랑 운영에 맞는 기능

---

## 핵심 개념

### 1. 두 가지 재고

| 구분 | 설명 | 관리 방식 |
|------|------|----------|
| **이론 재고** | 시스템이 계산한 재고 | 자동 (입고 - 판매) |
| **실사 재고** | 실제로 센 재고 | 수동 (재고 실사) |

```
이론 재고 = 초기 재고 + 입고량 - 판매 차감량 - 폐기량
```

### 2. Loss (로스)

```
Loss = 이론 재고 - 실사 재고
```

**Loss가 발생하는 원인:**
- 폐기 (유통기한 만료, 품질 불량)
- 파손 (취급 중 파손)
- 레시피 오차 (실제 사용량 > 레시피 기준)
- 미등록 사용 (시식, 직원 식사 등)
- 도난

### 3. 안전 재고 (Min Stock)

```
안전 재고 = 발주 후 입고까지 필요한 최소 재고량
```

재고가 안전 재고 이하로 떨어지면 알림 발생

### 4. 발주점 (Reorder Point)

```
발주점 = (일평균 사용량 × 발주 리드타임) + 안전 재고
```

재고가 발주점 이하면 발주 필요

---

## 사용자 워크플로우

### Step 1: 초기 재고 설정 (최초 1회)

```
재고 관리 시작:
1. Inventory 메뉴 진입
2. "재고 초기화" 버튼 클릭
3. 각 재료별 현재 보유 수량 입력
4. 저장 → 이것이 시작점
```

**안내 메시지:**
> "현재 보유한 재료의 실제 수량을 입력해주세요.
> 이 수량이 재고 관리의 시작점이 됩니다."

### Step 2: 일상 운영 (자동)

```
[주문 발생]
    │
    ├─→ 주문 완료 시
    │      └─→ 레시피에 따라 재료 자동 차감
    │
[입고 처리]
    │
    ├─→ 물건 도착 시
    │      └─→ 입고 등록 → 재고 증가
    │
[폐기 처리]
    │
    └─→ 폐기 발생 시
           └─→ 폐기 등록 → 재고 감소
```

**자동 차감 예시:**
> 토마토 수프 2개 판매
> → 토마토 1kg, 양파 0.4kg, 소금 0.02kg 자동 차감

### Step 3: 정기 재고 실사 (주기적)

```
실사 권장 주기:
- 소규모 매장: 주 1회
- 중규모 매장: 주 2회
- 대규모 매장: 매일

실사 프로세스:
1. "새 재고 실사" 시작
2. 각 재료 실제 수량 측정 후 입력
3. 시스템이 이론 재고와 비교
4. 차이(Loss) 확인 및 원인 선택
5. 실사 완료 → 재고 리셋
```

**안내 메시지:**
> "재고 실사를 완료하면 이론 재고가 실사 재고로 업데이트됩니다.
> 차이가 있는 재료는 Loss로 기록됩니다."

### Step 4: 발주 (필요 시)

```
발주 제안 확인:
1. "발주 제안" 섹션에서 부족한 재료 확인
2. 제안 수량 참고하여 발주
3. 입고 시 "입고 처리"로 재고 반영
```

---

## 데이터베이스 설계

### ingredients 테이블 (기존 + 추가 필드)

```sql
-- 추가 필드
ALTER TABLE ingredients ADD COLUMN (
  -- 마지막 실사 정보
  last_actual_stock DECIMAL(10, 2) DEFAULT 0
    COMMENT '마지막 실사 시 측정값',
  last_stock_take_at TIMESTAMP NULL
    COMMENT '마지막 실사 일시',

  -- 사용량 분석
  avg_daily_usage DECIMAL(10, 4) DEFAULT 0
    COMMENT '최근 30일 평균 일일 사용량',

  -- 발주 설정
  lead_time_days INT DEFAULT 2
    COMMENT '발주 후 입고까지 소요일'
);

-- current_stock: 현재 이론 재고
-- min_stock: 안전 재고 (기존)
```

### inventory_transactions 테이블

```sql
CREATE TABLE inventory_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  -- 거래 유형
  transaction_type ENUM(
    'initial',        -- 초기 재고 설정
    'purchase',       -- 구매 입고
    'order_deduct',   -- 주문 차감 (자동)
    'stock_take',     -- 재고 실사 조정
    'waste',          -- 폐기
    'adjustment'      -- 기타 조정
  ) NOT NULL,

  -- 수량
  quantity_change DECIMAL(10, 4) NOT NULL
    COMMENT '양수: 증가, 음수: 감소',
  unit VARCHAR(20) NOT NULL,
  stock_after DECIMAL(10, 2) NOT NULL
    COMMENT '거래 후 재고',

  -- 참조
  order_id INT NULL,
  stock_take_id INT NULL,

  -- 메타
  notes TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),

  INDEX idx_restaurant_date (restaurant_id, created_at),
  INDEX idx_ingredient (ingredient_id)
);
```

### stock_takes 테이블

```sql
CREATE TABLE stock_takes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,

  stock_take_date DATE NOT NULL,
  status ENUM('in_progress', 'completed', 'cancelled') DEFAULT 'in_progress',

  -- 요약 (완료 시)
  total_items INT DEFAULT 0,
  items_with_variance INT DEFAULT 0,
  total_variance_value DECIMAL(12, 2) NULL
    COMMENT 'Loss 총 금액',
  variance_percentage DECIMAL(5, 2) NULL
    COMMENT 'Loss 비율(%)',

  completed_at TIMESTAMP NULL,
  notes TEXT,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  INDEX idx_restaurant_date (restaurant_id, stock_take_date)
);
```

### stock_take_items 테이블

```sql
CREATE TABLE stock_take_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stock_take_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  -- 재고 비교
  theoretical_stock DECIMAL(10, 2) NOT NULL,
  actual_stock DECIMAL(10, 2) NULL,
  variance DECIMAL(10, 2) NULL
    COMMENT '이론 - 실사',

  -- 금액
  unit_cost DECIMAL(10, 4) NOT NULL,
  variance_value DECIMAL(10, 2) NULL,

  -- 차이 원인
  variance_reason ENUM(
    'waste',           -- 폐기
    'breakage',        -- 파손
    'recipe_variance', -- 레시피 오차
    'unrecorded',      -- 미등록 사용
    'measurement',     -- 측정 오차
    'other'            -- 기타
  ) NULL,

  notes TEXT,
  counted_at TIMESTAMP NULL,

  FOREIGN KEY (stock_take_id) REFERENCES stock_takes(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
```

### stock_alerts 테이블

```sql
CREATE TABLE stock_alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  alert_type ENUM('low_stock', 'out_of_stock') NOT NULL,

  current_stock DECIMAL(10, 2),
  min_stock DECIMAL(10, 2),
  suggested_order_qty DECIMAL(10, 2),

  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),

  INDEX idx_unresolved (restaurant_id, is_resolved, created_at)
);
```

---

## API 설계

### 재고 현황

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/inventory` | 재고 현황 (전체) |
| GET | `/api/restaurants/:id/inventory/summary` | 요약 (Low Stock 개수 등) |
| GET | `/api/restaurants/:id/inventory/alerts` | 알림 목록 |
| PUT | `/api/restaurants/:id/inventory/alerts/:id/resolve` | 알림 해결 |

### 재고 변동

| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/restaurants/:id/inventory/initial` | 초기 재고 설정 |
| POST | `/api/restaurants/:id/inventory/receive` | 입고 처리 |
| POST | `/api/restaurants/:id/inventory/waste` | 폐기 처리 |
| POST | `/api/restaurants/:id/inventory/adjust` | 수동 조정 |
| GET | `/api/restaurants/:id/inventory/transactions` | 거래 내역 |

### 재고 실사

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/stock-takes` | 실사 목록 |
| POST | `/api/restaurants/:id/stock-takes` | 새 실사 시작 |
| GET | `/api/restaurants/:id/stock-takes/:id` | 실사 상세 |
| PUT | `/api/restaurants/:id/stock-takes/:id/items` | 실사 항목 업데이트 |
| POST | `/api/restaurants/:id/stock-takes/:id/complete` | 실사 완료 |

### 발주 제안

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/restaurants/:id/inventory/reorder-suggestions` | 발주 제안 목록 |

### ⚠️ 연결 여부와 부족 여부는 다른 질문이다 (2026-08-25)

**발주 제안(suggestions)은 "재고가 부족한가"만 답한다.** `min_stock > 0 && 현재고 < min_stock`
인 것만 담기 때문에, **최소치를 정하지 않은 품목은 공급처가 멀쩡히 연결돼 있어도 여기에 안 나온다.**

재고 화면이 이걸 "공급처가 연결됐는가"의 근거로 쓴 적이 있었고(2026-08-24~25),
그 결과 **운영 브랜드 285건·매장 77건이 "No supplier linked" 로 표시되며 주문 버튼이 사라졌다.**
게다가 이 라우트는 `ingredients`/`ingredient_id` 만 보므로 BG 재고아이템
(`product_ingredients`/`product_ingredient_id`)은 애초에 잡히지 않는다.

**연결 여부는 별도 필드로 답한다:**

| 대상 | 연결 여부 판정 |
|------|----------------|
| 매장(RA) | `GET /api/restaurants/:id/inventory` 응답의 **`has_seller_source`** (`routes/inventory-core.js`) |
| 브랜드(BG) | `GET /api/product-ingredients?include=sellers` 의 **`sellers` 배열 길이** |

화면(`components/Inventory/sections/StockListSection.tsx`)에서
- **주문 가능 여부** = `has_seller_source`
- **일괄발주 체크박스**(부족분 담기) = 발주 제안 유무 (`canBulkSelect`)
로 분리돼 있다. 이 둘을 다시 한 값으로 합치지 말 것.
회귀 스펙: `dev-frontend/e2e/inventory-seller-link.spec.js`

---

## Frontend 설계

### 페이지 구조

```
/restaurant/:id/inventory
├── Dashboard (기본) - 재고 현황 요약
├── /list - 재료별 재고 목록
├── /stock-take - 재고 실사
└── /history - 거래 내역
```

### Dashboard (재고 현황)

**레이아웃:**
```
┌─────────────────────────────────────────────────────────────┐
│  Inventory                                    [재고 실사]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ 총 재료    │ │ 재고 부족  │ │ 이번달 Loss │              │
│  │   24개    │ │    3개    │ │  RM 156    │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│                                                             │
│  Low Stock Alerts                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 토마토   1.2kg / 3kg (안전재고)     [입고] [무시]   │   │
│  │ 양파     0.5kg / 2kg (안전재고)     [입고] [무시]   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  발주 제안                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 재료   │ 현재고 │ 일평균 │ 제안수량 │ 예상금액      │   │
│  │ 토마토 │ 1.2kg │ 2kg  │ 10kg   │ RM 50       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Quick Actions                                              │
│  [+ 입고 등록]  [+ 폐기 등록]  [거래 내역 보기]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 재료별 재고 목록 (/list)

**레이아웃:**
```
┌─────────────────────────────────────────────────────────────┐
│  Stock List                              [Search...] [필터] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 토마토                                    LOW STOCK │   │
│  │ 현재고: 1.2kg  |  안전재고: 3kg  |  단가: RM 5/kg  │   │
│  │ 일평균: 2kg    |  마지막 실사: 2일 전              │   │
│  │                               [입고] [폐기] [내역] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 양파                                       NORMAL   │   │
│  │ 현재고: 5.0kg  |  안전재고: 2kg  |  단가: RM 3/kg  │   │
│  │ 일평균: 1kg    |  마지막 실사: 2일 전              │   │
│  │                               [입고] [폐기] [내역] │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 재고 실사 (/stock-take)

**레이아웃:**
```
┌─────────────────────────────────────────────────────────────┐
│  Stock Take - 2025-12-19                   [완료] [취소]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  안내: 각 재료의 실제 수량을 측정하여 입력해주세요.          │
│       완료 시 이론 재고가 실사 재고로 업데이트됩니다.        │
│                                                             │
│  진행률: ████████░░ 16/20 완료                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 재료     │ 이론재고 │ 실사재고  │ 차이    │ 원인    │   │
│  ├──────────┼──────────┼───────────┼─────────┼─────────┤   │
│  │ 토마토   │ 8.5kg   │ [7.2    ] │ -1.3kg  │ [폐기▼] │   │
│  │ 양파     │ 3.2kg   │ [3.0    ] │ -0.2kg  │ [선택▼] │   │
│  │ 소금     │ 0.5kg   │ [       ] │ -       │         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Loss 예상: RM 7.10 (0.8%)                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 입고/폐기 모달

**입고 모달:**
```
┌─────────────────────────────────────────┐
│  입고 등록                         [X]  │
├─────────────────────────────────────────┤
│                                         │
│  재료 선택                              │
│  [토마토                           ▼]   │
│                                         │
│  수량                                   │
│  [10        ] kg                        │
│                                         │
│  메모 (선택)                            │
│  [                                  ]   │
│                                         │
│           [취소]  [입고 등록]           │
│                                         │
└─────────────────────────────────────────┘
```

---

## 계산 로직

### 1. 주문 시 재고 차감

```javascript
// Order 완료 시 호출
async function deductInventoryForOrder(order) {
  for (const item of order.items) {
    const product = await Product.findByPk(item.product_id);
    if (!product.recipe_id) continue;

    const recipeIngredients = await RecipeIngredient.findAll({
      where: { recipe_id: product.recipe_id }
    });

    for (const ri of recipeIngredients) {
      // 차감량 = 레시피 수량 × 주문 수량
      const deductQty = ri.quantity * item.quantity;

      // 재고 차감
      await Ingredient.decrement('current_stock', {
        by: deductQty,
        where: { id: ri.ingredient_id }
      });

      // 거래 기록
      await InventoryTransaction.create({
        restaurant_id: order.restaurant_id,
        ingredient_id: ri.ingredient_id,
        transaction_type: 'order_deduct',
        quantity_change: -deductQty,
        // ...
      });

      // 알림 체크
      await checkAndCreateAlert(ingredient);
    }
  }
}
```

### 2. 발주 제안 계산

```javascript
async function getReorderSuggestions(restaurantId) {
  const ingredients = await Ingredient.findAll({
    where: { restaurant_id: restaurantId }
  });

  const suggestions = [];

  for (const ing of ingredients) {
    // 발주점 = (일평균 × 리드타임) + 안전재고
    const reorderPoint = (ing.avg_daily_usage * ing.lead_time_days)
                        + parseFloat(ing.min_stock);

    // 현재고 ≤ 발주점이면 발주 필요
    if (parseFloat(ing.current_stock) <= reorderPoint) {
      // 제안 수량 = 발주점 - 현재고 + (일평균 × 7일)
      const suggestedQty = reorderPoint
                          - parseFloat(ing.current_stock)
                          + (ing.avg_daily_usage * 7);

      // effective_cost: restaurant override가 있으면 My Cost, 없으면 Brand Cost
      const effectiveCost = getEffectiveCost(ing, costMap);
      suggestions.push({
        ingredient: ing,
        current_stock: ing.current_stock,
        reorder_point: reorderPoint,
        suggested_qty: Math.ceil(suggestedQty),
        estimated_cost: suggestedQty * effectiveCost
      });
    }
  }

  return suggestions;
}
```

### 3. 일평균 사용량 계산

```javascript
// 매일 자정 또는 실시간 계산
async function updateAvgDailyUsage(ingredientId) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const result = await InventoryTransaction.findOne({
    where: {
      ingredient_id: ingredientId,
      transaction_type: 'order_deduct',
      created_at: { [Op.gte]: thirtyDaysAgo }
    },
    attributes: [
      [sequelize.fn('SUM', sequelize.fn('ABS', sequelize.col('quantity_change'))), 'total']
    ],
    raw: true
  });

  const avgDailyUsage = (parseFloat(result?.total) || 0) / 30;

  await Ingredient.update(
    { avg_daily_usage: avgDailyUsage },
    { where: { id: ingredientId } }
  );
}
```

---

## UI/UX 가이드

### 디자인 원칙

1. **기존 디자인 시스템 준수**
   - 색상: Primary #635BFF, Success #00D924, Warning #FFB800, Danger #DC2626
   - 카드: 흰색 배경, border-radius 12px, border #E6EBF1
   - 버튼: ThemedButton 컴포넌트 사용

2. **상태 표시 색상**
   - NORMAL: 초록색 (#00D924)
   - LOW STOCK: 노란색 (#FFB800)
   - OUT OF STOCK: 빨간색 (#DC2626)

3. **안내 메시지 스타일**
   ```css
   .info-box {
     background: #F0F9FF;
     border: 1px solid #BAE6FD;
     border-radius: 8px;
     padding: 12px 16px;
     color: #0369A1;
     font-size: 14px;
   }
   ```

### 필수 안내 메시지

| 위치 | 안내 내용 |
|------|----------|
| 초기 재고 설정 | "현재 보유한 재료의 실제 수량을 입력해주세요. 이 수량이 재고 관리의 시작점이 됩니다." |
| 재고 실사 | "각 재료의 실제 수량을 측정하여 입력해주세요. 완료 시 이론 재고가 실사 재고로 업데이트됩니다." |
| 발주 제안 | "최근 30일 사용량과 발주 리드타임을 기준으로 계산된 제안입니다." |
| Loss 리포트 | "Loss = 이론 재고 - 실사 재고. 폐기, 파손, 레시피 오차 등이 원인일 수 있습니다." |

### 숫자 포맷

| 항목 | 포맷 | 예시 |
|------|------|------|
| 재고 수량 | 소수점 2자리 | 1.25kg, 3.00L |
| 금액 | RM + 소수점 2자리 | RM 12.50 |
| 비율 | 소수점 1자리 + % | 2.5% |

---

## 권한

| 역할 | 재고 조회 | 입고/폐기 | 재고 실사 | 설정 변경 |
|------|---------|---------|---------|---------|
| System Admin | 전체 | 전체 | 전체 | 전체 |
| Restaurant Admin | 본인 매장 | O | O | O |
| Staff | 본인 매장 | X | X | X |

---

## 파일 위치

### Backend
- Models: `/var/www/dev-backend/models/InventoryTransaction.js`, `StockTake.js`, `StockAlert.js`
- Routes: `/var/www/dev-backend/routes/inventory.js`

### Frontend
- Pages: `/var/www/dev-frontend/src/pages/Inventory/`
  - `InventoryPage.tsx` - 메인 대시보드
  - `InventoryListPage.tsx` - 재료별 재고 목록
  - `StockTakePage.tsx` - 재고 실사
  - `InventoryHistoryPage.tsx` - 거래 내역

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 2025-12-19 | 1.0 | 초안 작성 | Claude |
| 2026-02-24 | 1.1 | 레스토랑 코스트 오버라이드(effective_cost) 반영 - 입고/실사/발주제안에 적용 | Claude |
| 2026-04-05 | 2.0 | 구조 재정리 — 레시피 없는 상품 재고 차감, 역할별 확장 (RECIPE_MANAGEMENT_SYSTEM.md v5.0 참조) | Claude |

---

## 구조 재정리 (v2.0, 2026-04-05)

상세 설계는 `RECIPE_MANAGEMENT_SYSTEM.md` v5.0 "구조 재정리" 섹션 참조.

### 재고 차감 확장 요약

기존: Product → Recipe → Ingredient 경로에서만 차감
추가: Product → Ingredient 직접 연결 시에도 동일 FIFO 차감

```
주문 완료 → recipe_id 있으면 → 기존 레시피 경로 (변경 없음)
         → ingredient_id 있으면 → Ingredient 직접 FIFO 차감 (신규)
         → 둘 다 없으면 → skip (변경 없음)
```

### 역할별 재고 관리 확장

| 역할 | 재고 방식 | 비고 |
|------|----------|------|
| Restaurant Admin | Ingredient FIFO (기존 + 직접 연결 추가) | 기존 데이터 영향 없음 |
| Brand General | ProductIngredient 기반 | 기존 구조 활용 |
| System Admin | SystemProduct.track_stock + current_stock | 신규 필드 추가 |
| Foodcourt General | FoodcourtProduct.track_stock + current_stock | 신규 테이블 |

> ⚠ **2026-09-01(Q5) 갱신 — `track_stock` 스위치는 폐기됐다.**
> `products`·`brand_products`·`ingredients`·`product_ingredients` 의 재고추적 스위치는
> **꺼져 있으면 판매 차감·입고·반품을 건너뛰었고**, 그게 GIT 포장재가 팔려도 재고가 안 빠진
> 직접 원인이었다(포장재 6개 전부 꺼짐). 이제 **항상 추적**하고, 안 쓰는 품목은 `is_active=false`
> 로 끈다. 컬럼은 호환용으로만 남았고 **게이트로 재사용 금지** — 인스펙션 `R-SC-011` 이 4개
> 테이블에 꺼진 행이 하나라도 생기면 배포를 막는다. 위 표의 SystemProduct/FoodcourtProduct 항목은
> 그 시절 설계 기록이다.

## 레시피 없는 프로덕트 = 그 자체가 재고아이템 (2026-09-01 P1)

레시피가 있으면 재고는 **재료**에서 빠지고, 없으면 **프로덕트 자체**에서 빠진다 — 이 두 루트는
원래부터 맞았다. 문제는 **입고가 프로덕트로 들어올 길이 없었다**는 것이다(발주 라인·공급처
연결이 재료만 가리킬 수 있었다). 그래서 같은 물건이 "프로덕트"와 "따로 만든 재고아이템"으로 갈라졌다.

- `purchase_order_items` · `ingredient_seller_products` 에 `product_id` / `brand_product_id` 추가.
  네 컬럼(ingredient / product_ingredient / product / brand_product) 중 **정확히 하나만** 채운다 —
  강제는 `utils/stockTarget.js`, 재검사는 인스펙션 `R-SC-008`.
- 수령하면 `receiveIntoProduct()` 가 프로덕트 수량을 올린다(소유권 재검사 포함).
- 레시피 있는 프로덕트를 발주 대상으로 고르면 400 — 이중 계상 방지(`R-SC-010`).
- 레시피 없는 프로덕트는 **판매 단위 = 재고 단위**여야 한다(환산 필드가 없어 차감이 그대로 빠진다).
  `R-SC-012` 가 감시.

---

**문서 끝**


---

## 🔒 재고 소유 주체 — 매장과 브랜드는 **각자 자기 재고** (2026-08-24 Irene 확정)

> Irene 원문: **"매장 재고가 브랜드제너럴이랑 무슨 상관이냐고. 각자 자기 재고를 관리하는 건데."**
> / **"브랜드 재고를 브랜드제너럴은 관리하지 않아. 판매하는 거지."**

| 주체 | 재고가 사는 곳 | 화면 |
|---|---|---|
| 매장(RA) 자기 재료 | `ingredients.current_stock` | `/restaurant/:id/inventory` |
| 매장이 쓰는 **브랜드 공유 재료** | `restaurant_ingredient_stocks` (매장별 오버레이) | 〃 (`inventory-core.js:141-146`) |
| 브랜드(BG) **매입재고** | `product_ingredients.current_stock` (owner_user_id 단위) | `/pos/brand-inventory` · Stock Items · Purchase Order |

**규칙**
1. **BG 화면에 매장 수량을 끌어와 보여주지 않는다.** 섞으면 BG 가 자기 창고에 뭐가 있는지 알 수 없고,
   그 숫자를 믿고 발주하면 실제로는 재고가 없다.
2. `product_ingredients.linked_ingredient_id` 는 **읽기 경로만** 따르고 쓰기 경로는 전부 무시한다
   (`product-ingredients.js:548` · `purchase-orders-workflow.js:464/790` · `seller-orders.js:492`).
   **채우면 안 된다** — 화면은 연결값을 보여주는데 입고·차감은 다른 칸에 쌓여 숫자가 안 움직인다.
3. 브랜드 행(`ingredients`, brand_id 있고 restaurant_id NULL)에 매장 수량을 **복사해 넣지 말 것.**
   2026-08-20 에 화면을 맞추려고 18건을 복사해 둔 적이 있고, 그게 "누구 재고인지" 판단을 망가뜨렸다.
4. 코드 주석을 도메인 사실의 근거로 쓰지 말 것 — 주석은 이전 세션의 해석일 수 있다(실제로 그랬다).

**미해결(Fable 설계 대기)**: `ingredients`(브랜드 88) vs `product_ingredients`(286) 목록 이원화,
`linked_ingredient_id` 반쪽 구현, FG 도 같은 어긋남(입고는 `ingredients`, 화면은 `foodcourt_products`).
