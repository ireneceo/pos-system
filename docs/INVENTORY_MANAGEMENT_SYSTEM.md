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

      suggestions.push({
        ingredient: ing,
        current_stock: ing.current_stock,
        reorder_point: reorderPoint,
        suggested_qty: Math.ceil(suggestedQty),
        estimated_cost: suggestedQty * parseFloat(ing.unit_cost)
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

---

**문서 끝**
