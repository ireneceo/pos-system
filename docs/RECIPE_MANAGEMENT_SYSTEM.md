# Recipe Management System - 레시피 관리 시스템 설계

**작성일:** 2025-11-20
**프로젝트:** Purple POS System
**Phase:** Phase 2 - Recipe Management

---

## 📋 목차

1. [개요](#개요)
2. [권한 구조](#권한-구조)
3. [데이터베이스 설계](#데이터베이스-설계)
4. [API 설계](#api-설계)
5. [UI/UX 설계](#uiux-설계)
6. [사용 시나리오](#사용-시나리오)

---

## 개요

### 목적
- Brand General이 표준 레시피를 생성하여 모든 가맹점에 배포
- Restaurant Admin이 독립 레스토랑의 레시피를 자유롭게 관리
- 레시피를 메뉴(Product)로 쉽게 전환
- 재료 원가 기반 자동 원가 계산

### 핵심 원칙
```javascript
if (restaurant.brand_id !== null) {
  // 브랜드 가맹점
  레시피 관리: Brand General/Manager
  Restaurant Admin: 읽기만 (수정 불가)
} else {
  // 독립 레스토랑
  레시피 관리: Restaurant Admin
}
```

**Foodcourt는 레시피와 무관** - 임대/공지만 관리

---

## 권한 구조

### 케이스 1: 독립 레스토랑
```
restaurants {
  id: 1
  brand_id: NULL
  foodcourt_id: NULL
}
```

**레시피 관리:**
- ✅ Restaurant Admin: 생성/수정/삭제 **모두 가능**
- ❌ Brand General: 해당 없음
- ❌ Foodcourt General: 레시피 관여 안 함

---

### 케이스 2: 브랜드 가맹점
```
restaurants {
  id: 2
  brand_id: 1
  foodcourt_id: NULL
}
```

**레시피 관리:**
- ✅ Brand General/Manager: 생성/수정/삭제 **모두 가능**
- 🔍 Restaurant Admin: **읽기만 가능** (수정 불가)
  - ✅ 브랜드 레시피 조회
  - ✅ 메뉴로 등록 (가격만 설정)
  - ❌ 레시피 재료/구성 수정 불가

**이유:** 브랜드 표준화 유지

---

### 케이스 3: 푸드코트 입점 (독립)
```
restaurants {
  id: 3
  brand_id: NULL
  foodcourt_id: 1
}
```

**레시피 관리:**
- ✅ Restaurant Admin: 생성/수정/삭제 **모두 가능**
- ❌ Foodcourt General: 레시피 관여 안 함
  - ✅ 임대료 청구
  - ✅ 공지사항 발송
  - ✅ 매출 통계 조회 (읽기만)

**이유:** 푸드코트는 임대 관리자, 각 입점 업체는 독립 운영

---

### 케이스 4: 브랜드 + 푸드코트
```
restaurants {
  id: 4
  brand_id: 1
  foodcourt_id: 1
}
```

**레시피 관리:**
- ✅ Brand General/Manager: 생성/수정/삭제
- 🔍 Restaurant Admin: 읽기만
- ❌ Foodcourt General: 레시피 관여 안 함

---

## 권한 매트릭스

| Restaurant 타입 | 레시피 관리자 | Restaurant Admin 권한 | Foodcourt 역할 |
|----------------|--------------|---------------------|----------------|
| 독립 레스토랑 | Restaurant Admin | 생성/수정/삭제 가능 | - |
| 브랜드 가맹점 | Brand General/Manager | 읽기만 (가격만 설정) | - |
| 푸드코트 입점 (독립) | Restaurant Admin | 생성/수정/삭제 가능 | 임대 관리 |
| 브랜드 + 푸드코트 | Brand General/Manager | 읽기만 (가격만 설정) | 임대 관리 |

---

## 데이터베이스 설계

### 1. `recipes` 테이블

```sql
CREATE TABLE recipes (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 소유권 (브랜드 OR 레스토랑, 둘 중 하나만)
  brand_id INT NULL COMMENT 'Brand General이 생성한 레시피',
  restaurant_id INT NULL COMMENT 'Restaurant Admin이 생성한 레시피',

  -- 레시피 정보 (Products와 동일한 구조)
  code VARCHAR(20) COMMENT '레시피 코드',
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,

  -- 이미지/이모지
  image TEXT,
  emoji VARCHAR(10),

  -- 옵션 (Products와 동일한 optionGroups 구조)
  option_groups JSON COMMENT '동일한 옵션 시스템',

  -- 세트 메뉴
  is_set_menu BOOLEAN DEFAULT FALSE,
  set_items JSON COMMENT '세트 구성 아이템',

  -- 원가 정보
  total_ingredient_cost DECIMAL(10, 2) COMMENT '재료 원가 합계 (자동 계산)',
  suggested_price DECIMAL(10, 2) COMMENT '권장 판매가',

  -- 조리 정보
  prep_time INT COMMENT '준비 시간 (분)',
  cook_time INT COMMENT '조리 시간 (분)',
  instructions TEXT COMMENT '조리 방법',

  -- 상태
  is_active BOOLEAN DEFAULT TRUE,
  version INT DEFAULT 1 COMMENT '레시피 버전',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,

  -- 브랜드 레시피 OR 레스토랑 레시피 (하나만)
  CONSTRAINT check_recipe_owner
    CHECK ((brand_id IS NOT NULL AND restaurant_id IS NULL) OR
           (brand_id IS NULL AND restaurant_id IS NOT NULL))
);

CREATE INDEX idx_brand_recipes ON recipes(brand_id);
CREATE INDEX idx_restaurant_recipes ON recipes(restaurant_id);
CREATE INDEX idx_recipe_category ON recipes(category);
```

### 2. `ingredients` 테이블 (재료 마스터)

```sql
CREATE TABLE ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 소유권 (브랜드 OR 레스토랑)
  brand_id INT NULL,
  restaurant_id INT NULL,

  -- 재료 정보
  code VARCHAR(50) UNIQUE COMMENT '재료 코드',
  name VARCHAR(100) NOT NULL,
  category ENUM('produce', 'meat', 'seafood', 'dairy', 'dry_goods', 'spices', 'beverages', 'other') DEFAULT 'other',

  -- 재고 단위
  unit ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle') NOT NULL,

  -- 가격
  unit_cost DECIMAL(10, 4) NOT NULL COMMENT '단위당 원가',
  supplier_name VARCHAR(100) COMMENT '공급업체명',

  -- 재고 관련 (Phase 3: Advanced Inventory에서 사용)
  min_stock DECIMAL(10, 2) DEFAULT 0 COMMENT '최소 재고량',
  current_stock DECIMAL(10, 2) DEFAULT 0 COMMENT '현재 재고량',

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,

  CONSTRAINT check_ingredient_owner
    CHECK ((brand_id IS NOT NULL AND restaurant_id IS NULL) OR
           (brand_id IS NULL AND restaurant_id IS NOT NULL))
);

CREATE INDEX idx_brand_ingredients ON ingredients(brand_id);
CREATE INDEX idx_restaurant_ingredients ON ingredients(restaurant_id);
CREATE INDEX idx_ingredient_category ON ingredients(category);
```

### 3. `recipe_ingredients` (레시피-재료 매핑)

```sql
CREATE TABLE recipe_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  -- 사용량
  quantity DECIMAL(10, 4) NOT NULL,
  unit ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle') NOT NULL,

  -- 원가 (자동 계산: quantity * ingredient.unit_cost)
  cost DECIMAL(10, 4) COMMENT '해당 재료의 원가',

  -- 메모
  notes TEXT COMMENT '준비 방법이나 팁',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE RESTRICT,

  UNIQUE KEY unique_recipe_ingredient (recipe_id, ingredient_id)
);

CREATE INDEX idx_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_ingredient ON recipe_ingredients(ingredient_id);
```

### 4. `products` 테이블 수정 (메뉴-레시피 연결)

```sql
ALTER TABLE products
ADD COLUMN recipe_id INT NULL COMMENT '연결된 레시피',
ADD FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE SET NULL;

CREATE INDEX idx_product_recipe ON products(recipe_id);
```

**레시피 → 메뉴 등록 시:**
- recipe의 모든 정보를 products에 복사
- recipe_id를 products.recipe_id에 저장 (연결 유지)
- Restaurant Admin이 price만 설정

---

## API 설계

### Brand General APIs

#### 브랜드 레시피 CRUD

```javascript
// 브랜드 레시피 목록
GET /api/brands/:brand_id/recipes
Response: {
  "success": true,
  "data": [
    {
      "id": 1,
      "brand_id": 1,
      "name": "시그니처 버거",
      "category": "버거",
      "total_ingredient_cost": 3500,
      "suggested_price": 8900,
      "is_active": true,
      "usage_count": 15  // 몇 개 가맹점에서 사용 중
    }
  ]
}

// 레시피 생성
POST /api/brands/:brand_id/recipes
Request: {
  "brand_id": 1,
  "name": "시그니처 버거",
  "description": "브랜드 대표 버거",
  "category": "버거",
  "emoji": "🍔",
  "option_groups": [...],  // Products와 동일한 구조
  "ingredients": [
    {
      "ingredient_id": 5,
      "quantity": 150,
      "unit": "g",
      "notes": "패티"
    },
    {
      "ingredient_id": 10,
      "quantity": 2,
      "unit": "piece",
      "notes": "번"
    }
  ],
  "prep_time": 5,
  "cook_time": 10,
  "instructions": "1. 패티 굽기\n2. 번에 올리기\n3. 완성"
}

// 레시피 수정
PUT /api/brands/:brand_id/recipes/:id
Request: { ...동일... }

// 레시피 삭제
DELETE /api/brands/:brand_id/recipes/:id
```

#### 브랜드 재료 CRUD

```javascript
// 재료 목록
GET /api/brands/:brand_id/ingredients

// 재료 생성
POST /api/brands/:brand_id/ingredients
Request: {
  "brand_id": 1,
  "name": "앵거스 패티",
  "code": "ING_PATTY_001",
  "category": "meat",
  "unit": "kg",
  "unit_cost": 15000,
  "supplier_name": "한우식품"
}

// 재료 수정
PUT /api/brands/:brand_id/ingredients/:id

// 재료 삭제
DELETE /api/brands/:brand_id/ingredients/:id
```

---

### Restaurant Admin APIs

#### 레시피 조회

```javascript
// 레스토랑에서 사용 가능한 모든 레시피
GET /api/restaurants/:restaurant_id/recipes

Response: {
  "success": true,
  "data": {
    "brand_recipes": [  // brand_id가 있는 경우만
      {
        "id": 1,
        "name": "시그니처 버거",
        "from_brand": true,
        "editable": false,  // 수정 불가
        "total_ingredient_cost": 3500
      }
    ],
    "own_recipes": [  // 독립 레스토랑만
      {
        "id": 10,
        "name": "특제 파스타",
        "from_brand": false,
        "editable": true,  // 수정 가능
        "total_ingredient_cost": 4200
      }
    ]
  }
}
```

#### 독립 레스토랑: 레시피 CRUD (brand_id = NULL)

```javascript
// 레시피 생성
POST /api/restaurants/:restaurant_id/recipes
Request: {
  "restaurant_id": 20,
  "brand_id": null,
  "name": "특제 파스타",
  ...
}

// 레시피 수정
PUT /api/restaurants/:restaurant_id/recipes/:id

// 레시피 삭제
DELETE /api/restaurants/:restaurant_id/recipes/:id
```

#### 레시피 → 메뉴 등록

```javascript
// 레시피를 메뉴(Product)로 등록
POST /api/restaurants/:restaurant_id/products/create-from-recipe
Request: {
  "recipe_id": 1,
  "price": 8900  // Restaurant Admin이 가격만 설정
}

Response: {
  "success": true,
  "data": {
    "product_id": 123,
    "message": "레시피가 메뉴로 등록되었습니다"
  }
}

// 내부 동작:
// 1. recipes 테이블에서 recipe_id 조회
// 2. recipe의 모든 정보를 products에 복사
//    - name, description, category, emoji, image
//    - option_groups, is_set_menu, set_items
// 3. price만 Request의 값으로 설정
// 4. recipe_id를 products.recipe_id에 저장
```

---

### 권한 체크 미들웨어

```javascript
// 레시피 수정 권한 체크
async function canEditRecipe(req, res, next) {
  const { recipe_id } = req.params;
  const user = req.user;

  const recipe = await Recipe.findByPk(recipe_id);
  if (!recipe) {
    return res.status(404).json({ error: '레시피를 찾을 수 없습니다' });
  }

  // System Admin은 모든 것 가능
  if (user.role === 'System Admin') return next();

  // 브랜드 레시피인 경우
  if (recipe.brand_id) {
    // Brand General/Manager만 수정 가능
    if ((user.role === 'Brand General' || user.role === 'Brand Manager')
        && user.brand_id === recipe.brand_id) {
      return next();
    }
    return res.status(403).json({
      error: '브랜드 레시피는 브랜드 관리자만 수정할 수 있습니다'
    });
  }

  // 레스토랑 레시피인 경우
  if (recipe.restaurant_id) {
    // Restaurant Admin만 수정 가능
    if (user.role === 'Restaurant Admin'
        && user.restaurant_id === recipe.restaurant_id) {
      return next();
    }
    return res.status(403).json({
      error: '해당 레스토랑 관리자만 수정할 수 있습니다'
    });
  }

  return res.status(403).json({ error: '권한 없음' });
}

// 레시피 조회 권한 체크
async function canViewRecipe(req, res, next) {
  const { recipe_id } = req.params;
  const user = req.user;

  const recipe = await Recipe.findByPk(recipe_id);
  if (!recipe) {
    return res.status(404).json({ error: '레시피를 찾을 수 없습니다' });
  }

  // System Admin은 모든 것 조회 가능
  if (user.role === 'System Admin') return next();

  // 브랜드 레시피
  if (recipe.brand_id) {
    // Brand General/Manager
    if ((user.role === 'Brand General' || user.role === 'Brand Manager')
        && user.brand_id === recipe.brand_id) {
      return next();
    }

    // 해당 브랜드의 가맹점 Restaurant Admin
    if (user.role === 'Restaurant Admin') {
      const restaurant = await Restaurant.findByPk(user.restaurant_id);
      if (restaurant.brand_id === recipe.brand_id) {
        return next();
      }
    }

    return res.status(403).json({ error: '권한 없음' });
  }

  // 레스토랑 레시피
  if (recipe.restaurant_id) {
    if (user.role === 'Restaurant Admin'
        && user.restaurant_id === recipe.restaurant_id) {
      return next();
    }
    return res.status(403).json({ error: '권한 없음' });
  }

  return res.status(403).json({ error: '권한 없음' });
}
```

---

## UI/UX 설계

### Brand General 페이지

#### `/brand-general/recipes` - 레시피 목록

```
┌─────────────────────────────────────────────────────┐
│  🍳 브랜드 레시피 관리                              │
├─────────────────────────────────────────────────────┤
│  [+ 새 레시피 추가]  [재료 관리]                     │
├─────────────────────────────────────────────────────┤
│  검색: [_________]  카테고리: [전체▾]               │
├─────────────────────────────────────────────────────┤
│                                                      │
│  🍔 시그니처 버거                                     │
│  버거 | 원가: RM 3.50 | 권장가: RM 8.90              │
│  📊 15개 가맹점에서 사용 중                          │
│  [보기] [수정] [삭제]                                │
│                                                      │
│  🍕 페퍼로니 피자                                     │
│  피자 | 원가: RM 5.20 | 권장가: RM 15.00             │
│  📊 8개 가맹점에서 사용 중                           │
│  [보기] [수정] [삭제]                                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### `/brand-general/recipes/create` - 레시피 생성

```
┌─────────────────────────────────────────────────────┐
│  🍳 새 레시피 추가                                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  기본 정보                                           │
│  레시피명: [___________________________]             │
│  카테고리: [버거▾]  이모지: [🍔]                     │
│  설명: [_________________________________]           │
│                                                      │
│  재료 구성                                           │
│  ┌────────────────────────────────────────┐         │
│  │ 재료명      수량    단위   단가   금액  │         │
│  │ 앵거스 패티  150g   g     15.00  2.25  │ [삭제] │
│  │ 버거 번      2개    piece  0.50  1.00  │ [삭제] │
│  │ 치즈         1장    piece  0.25  0.25  │ [삭제] │
│  └────────────────────────────────────────┘         │
│  [+ 재료 추가]                                       │
│  총 원가: RM 3.50                                    │
│                                                      │
│  옵션 그룹 (Products와 동일)                         │
│  [+ 옵션 그룹 추가]                                  │
│                                                      │
│  조리 정보                                           │
│  준비 시간: [5] 분  조리 시간: [10] 분               │
│  조리 방법:                                          │
│  [_________________________________________]         │
│                                                      │
│  권장 판매가                                         │
│  원가: RM 3.50                                       │
│  권장가: [8.90] (마진율: 154%)                       │
│                                                      │
│  [취소] [저장]                                       │
└─────────────────────────────────────────────────────┘
```

---

### Restaurant Admin 페이지

#### 브랜드 가맹점: `/restaurant/:id/recipes`

```
┌─────────────────────────────────────────────────────┐
│  🍳 레시피 관리                                      │
├─────────────────────────────────────────────────────┤
│  [브랜드 레시피] [내 레시피]  ← 탭                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  📌 브랜드 레시피 (본사 관리)                         │
│  ⚠️  브랜드 레시피는 수정할 수 없습니다              │
│                                                      │
│  🍔 시그니처 버거                                     │
│  버거 | 원가: RM 3.50 | 권장가: RM 8.90              │
│  🏢 본사 레시피                                       │
│  [보기] [메뉴로 등록]  ← 메뉴로 등록만 가능          │
│                                                      │
│  🍕 페퍼로니 피자                                     │
│  피자 | 원가: RM 5.20 | 권장가: RM 15.00             │
│  🏢 본사 레시피                                       │
│  [보기] [메뉴로 등록]                                │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### 독립 레스토랑: `/restaurant/:id/recipes`

```
┌─────────────────────────────────────────────────────┐
│  🍳 레시피 관리                                      │
├─────────────────────────────────────────────────────┤
│  [+ 새 레시피 추가]  [재료 관리]                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│  🍝 특제 파스타                                       │
│  파스타 | 원가: RM 4.20 | 판매가: RM 12.00           │
│  [보기] [수정] [삭제] [메뉴로 등록]                  │
│                                                      │
│  🥗 시저 샐러드                                       │
│  샐러드 | 원가: RM 2.80 | 판매가: RM 8.00            │
│  [보기] [수정] [삭제] [메뉴로 등록]                  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

#### 메뉴로 등록 모달

```
┌─────────────────────────────────────────────────────┐
│  🍔 메뉴로 등록                                       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  레시피: 시그니저 버거                                │
│  원가: RM 3.50                                       │
│                                                      │
│  판매가 설정                                         │
│  가격: [8.90]                                        │
│  마진율: 154%                                        │
│                                                      │
│  ✅ 레시피의 모든 정보가 메뉴에 복사됩니다            │
│  ✅ 옵션 그룹도 함께 복사됩니다                       │
│                                                      │
│  [취소] [등록]                                       │
└─────────────────────────────────────────────────────┘
```

---

## 사용 시나리오

### 시나리오 1: 브랜드 레시피 → 가맹점 메뉴

#### Step 1: Brand General이 레시피 생성
```javascript
POST /api/brands/1/recipes
{
  "name": "시그니처 버거",
  "category": "버거",
  "emoji": "🍔",
  "ingredients": [
    { "ingredient_id": 5, "quantity": 150, "unit": "g" },
    { "ingredient_id": 10, "quantity": 2, "unit": "piece" }
  ]
}
→ 모든 가맹점에서 즉시 조회 가능
```

#### Step 2: Restaurant Admin이 조회
```javascript
GET /api/restaurants/10/recipes
→ brand_recipes에 "시그니처 버거" 포함
```

#### Step 3: Restaurant Admin이 메뉴로 등록
```javascript
POST /api/restaurants/10/products/create-from-recipe
{
  "recipe_id": 1,
  "price": 8900
}
→ products 테이블에 새 레코드 생성
→ recipe_id=1 연결 유지
```

#### Step 4: Brand General이 레시피 수정
```javascript
PUT /api/brands/1/recipes/1
{
  "name": "시그니처 버거 V2",
  "ingredients": [...]
}

// 옵션 A: 실시간 동기화
// → 모든 가맹점의 products 자동 업데이트

// 옵션 B: 버전 관리 (추천)
// → Restaurant Admin에게 알림
// → "레시피가 업데이트되었습니다. 적용하시겠습니까?"
// → [적용] 버튼 클릭 시 products 업데이트
```

---

### 시나리오 2: 독립 레스토랑 레시피

#### Step 1: Restaurant Admin이 레시피 생성
```javascript
POST /api/restaurants/20/recipes
{
  "restaurant_id": 20,
  "name": "특제 파스타",
  "ingredients": [...]
}
```

#### Step 2: 메뉴로 등록
```javascript
POST /api/restaurants/20/products/create-from-recipe
{
  "recipe_id": 10,
  "price": 12000
}
```

#### Step 3: 레시피 수정 (자유롭게)
```javascript
PUT /api/restaurants/20/recipes/10
{
  "name": "특제 파스타 V2",
  "ingredients": [...]
}
→ ✅ 수정 가능 (독립 레스토랑)
```

---

## 원가 계산 로직

### 자동 계산 흐름

```javascript
// recipe_ingredients 저장 시
1. ingredient.unit_cost 조회
2. cost = quantity * unit_cost (단위 변환 고려)
3. recipe_ingredients.cost 저장

// recipe 저장 시
4. recipe의 모든 recipe_ingredients.cost 합산
5. recipes.total_ingredient_cost = SUM(cost)
```

### 예시

```javascript
Recipe: 시그니처 버거
├─ 앵거스 패티: 150g × RM 0.10/g = RM 15.00
├─ 번: 2개 × RM 0.50/개 = RM 1.00
└─ 치즈: 1장 × RM 0.25/장 = RM 0.25
────────────────────────────────────────
총 원가: RM 16.25
```

---

## 구현 우선순위

### Phase 2.1: 기본 레시피 시스템 (1주)
- [ ] DB 스키마 생성
- [ ] Backend Models (Recipe, Ingredient, RecipeIngredient)
- [ ] Backend APIs (CRUD)
- [ ] 권한 체크 미들웨어

### Phase 2.2: Brand General UI (3일)
- [ ] 레시피 목록 페이지
- [ ] 레시피 생성/수정 페이지
- [ ] 재료 관리 페이지

### Phase 2.3: Restaurant Admin UI (3일)
- [ ] 레시피 조회 페이지
- [ ] 메뉴로 등록 기능
- [ ] 독립 레스토랑 레시피 CRUD

### Phase 2.4: Integration (2일)
- [ ] 원가 자동 계산
- [ ] 레시피 버전 관리
- [ ] 동기화 알림 시스템

---

## 향후 확장

### Phase 3: Advanced Inventory 연동
- 주문 생성 → recipe_ingredients 조회 → 재고 자동 차감
- 재고 부족 시 메뉴 자동 soldOut

### Phase 4: Purchase Order 연동
- 재료 재고 부족 시 자동 발주 제안

### Phase 5: AI Prediction 연동
- 레시피 기반 재료 소비 예측

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 2025-11-20 | 1.0 | 초안 작성 | Claude |

---

**문서 끝**
