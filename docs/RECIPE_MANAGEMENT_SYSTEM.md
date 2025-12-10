# Recipe Management System - 레시피 관리 시스템

**작성일:** 2025-11-20
**수정일:** 2025-12-10
**프로젝트:** Purple POS System
**Phase:** Phase 2 - Recipe Management
**상태:** 구현 완료

---

## 목차

1. [개요](#개요)
2. [권한 구조](#권한-구조)
3. [데이터베이스 설계](#데이터베이스-설계)
4. [API 설계](#api-설계)
5. [Frontend 구조](#frontend-구조)
6. [사용 시나리오](#사용-시나리오)

---

## 개요

### 목적
- Brand General/Manager가 브랜드 레시피를 생성하여 모든 가맹점에 배포
- Restaurant Admin이 독립 레스토랑 또는 자체 레시피를 자유롭게 관리
- 레시피를 메뉴(Product)로 쉽게 전환
- 재료 원가 기반 자동 원가 계산

### 핵심 원칙: owner_type 기반 소유권

```javascript
// 레시피/재료의 소유권은 owner_type으로 구분
if (recipe.owner_type === 'brand') {
  // Brand General/Manager가 생성한 레시피
  // Restaurant Admin: 조회만 가능 (수정 불가)
} else {
  // Restaurant Admin이 생성한 레시피
  // Brand General/Manager: 접근 불가 (표시 안됨)
}
```

---

## 권한 구조

### 브랜드 레시피 (owner_type = 'brand')

| 역할 | 권한 |
|------|------|
| Brand General/Manager | 생성, 수정, 삭제 가능 |
| Restaurant Admin | **조회만 가능** (수정 불가) |

### 레스토랑 레시피 (owner_type = 'restaurant')

| 역할 | 권한 |
|------|------|
| Restaurant Admin | 생성, 수정, 삭제 가능 |
| Brand General/Manager | **접근 불가** (표시 안됨) |

### 권한 매트릭스

| 사용자 | 브랜드 레시피 | 레스토랑 레시피 |
|--------|-------------|---------------|
| Brand General | CRUD | 접근 불가 |
| Brand Manager | CRUD | 접근 불가 |
| Restaurant Admin (브랜드 소속) | 조회만 | CRUD |
| Restaurant Admin (독립) | 해당 없음 | CRUD |

---

## 데이터베이스 설계

### recipes 테이블

```sql
CREATE TABLE recipes (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 소유권 타입
  owner_type ENUM('brand', 'restaurant') NOT NULL DEFAULT 'restaurant',
  brand_id INT NULL COMMENT 'Brand 레시피일 때',
  restaurant_id INT NULL COMMENT 'Restaurant 레시피일 때',

  -- 기본 정보
  code VARCHAR(20),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50) COMMENT '레거시 카테고리명',
  recipe_category_id INT COMMENT '레시피 카테고리 FK',

  -- 이미지/이모지
  image TEXT,
  emoji VARCHAR(10),

  -- 옵션 (Products와 동일)
  option_groups JSON,

  -- 세트 메뉴
  is_set_menu BOOLEAN DEFAULT FALSE,
  set_items JSON,

  -- 원가 정보
  total_ingredient_cost DECIMAL(10, 2) DEFAULT 0.00 COMMENT '재료 원가 합계',
  suggested_price DECIMAL(10, 2) COMMENT '권장 판매가',

  -- 조리 정보
  prep_time INT COMMENT '준비 시간 (분)',
  cook_time INT COMMENT '조리 시간 (분)',
  instructions TEXT COMMENT '조리 방법',

  -- 상태
  is_active BOOLEAN DEFAULT TRUE,
  version INT DEFAULT 1,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  FOREIGN KEY (recipe_category_id) REFERENCES recipe_categories(id) ON DELETE SET NULL
);
```

### ingredients 테이블

```sql
CREATE TABLE ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,

  -- 소유권 타입
  owner_type ENUM('brand', 'restaurant') NOT NULL DEFAULT 'restaurant',
  brand_id INT NULL,
  restaurant_id INT NULL,
  ingredient_category_id INT COMMENT '재료 카테고리 FK',

  -- 재료 정보
  code VARCHAR(50),
  name VARCHAR(100) NOT NULL,
  category ENUM('produce', 'meat', 'seafood', 'dairy', 'dry_goods', 'spices', 'beverages', 'other') DEFAULT 'other',
  unit ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle') NOT NULL,

  -- 가격
  unit_cost DECIMAL(10, 4) NOT NULL DEFAULT 0,
  supplier_name VARCHAR(100),

  -- 재고
  min_stock DECIMAL(10, 2) DEFAULT 0,
  current_stock DECIMAL(10, 2) DEFAULT 0,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### recipe_ingredients 테이블

```sql
CREATE TABLE recipe_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  recipe_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  quantity DECIMAL(10, 4) NOT NULL,
  unit ENUM('kg', 'g', 'L', 'ml', 'piece', 'pack', 'can', 'bottle') NOT NULL,
  cost DECIMAL(10, 4) COMMENT '자동 계산: quantity * unit_cost',
  notes TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE RESTRICT,

  UNIQUE KEY unique_recipe_ingredient (recipe_id, ingredient_id)
);
```

### recipe_categories / ingredient_categories 테이블

```sql
CREATE TABLE recipe_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NULL,
  restaurant_id INT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ingredient_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand_id INT NULL,
  restaurant_id INT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  emoji VARCHAR(10),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## API 설계

### Brand API (Brand General/Manager)

#### 레시피
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/brands/:brandId/recipes` | 브랜드 레시피 목록 |
| POST | `/api/brands/:brandId/recipes` | 레시피 생성 |
| PUT | `/api/brands/:brandId/recipes/:recipeId` | 레시피 수정 |
| DELETE | `/api/brands/:brandId/recipes/:recipeId` | 레시피 삭제 |

#### 재료
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/brands/:brandId/ingredients` | 브랜드 재료 목록 |
| POST | `/api/brands/:brandId/ingredients` | 재료 생성 |
| PUT | `/api/brands/:brandId/ingredients/:ingredientId` | 재료 수정 |
| DELETE | `/api/brands/:brandId/ingredients/:ingredientId` | 재료 삭제 |

#### 카테고리
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET/POST/PUT/DELETE | `/api/brands/:brandId/recipe-categories` | 레시피 카테고리 관리 |
| GET/POST/PUT/DELETE | `/api/brands/:brandId/ingredient-categories` | 재료 카테고리 관리 |
| PUT | `/api/brands/:brandId/recipe-categories/reorder` | 카테고리 순서 변경 |

### Restaurant API (Restaurant Admin)

#### 레시피
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/restaurants/:restaurantId/recipes` | 자체 레시피 목록 |
| GET | `/api/restaurants/:restaurantId/brand-recipes` | 브랜드 레시피 조회 (읽기전용) |
| POST | `/api/restaurants/:restaurantId/recipes` | 레시피 생성 |
| PUT | `/api/restaurants/:restaurantId/recipes/:recipeId` | 레시피 수정 |
| DELETE | `/api/restaurants/:restaurantId/recipes/:recipeId` | 레시피 삭제 |

#### 재료
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/restaurants/:restaurantId/ingredients` | 자체 재료 목록 |
| GET | `/api/restaurants/:restaurantId/brand-ingredients` | 브랜드 재료 조회 |
| POST | `/api/restaurants/:restaurantId/ingredients` | 재료 생성 |
| PUT | `/api/restaurants/:restaurantId/ingredients/:ingredientId` | 재료 수정 |
| DELETE | `/api/restaurants/:restaurantId/ingredients/:ingredientId` | 재료 삭제 |

#### 메뉴 등록
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| POST | `/api/restaurants/:restaurantId/products/create-from-recipe` | 레시피를 메뉴로 등록 |

---

## Frontend 구조

### 페이지 구성

| 경로 | 컴포넌트 | 대상 사용자 | 기능 |
|------|---------|------------|------|
| `/recipe-management` | RecipeManagementPage | Brand General | 4개 탭 (레시피, 재료, 카테고리) |
| `/recipes` | RecipesPage | Restaurant Admin | 레시피 관리 + 메뉴 등록 |
| `/ingredients` | IngredientsPage | Restaurant Admin | 재료 관리 |

### RecipesTab (Brand General용) 기능

#### 리스트 카드 표시 정보
- 레시피명, 카테고리 (Badge)
- 이미지/이모지
- 원가, 권장가
- **준비시간, 조리시간** (RecipeMetaInfo)
- **조리방법 미리보기** (InstructionsPreview)
- **재료명 태그** (IngredientTags - 최대 5개 + more)
- View/Edit/Delete 버튼

#### 카드 클릭 동작
- 카드 클릭 시 **Recipe Details 팝업** (View 모드)
- View 모드에서 **Edit 버튼**으로 수정 모드 전환 가능
- 브랜드 레시피는 Restaurant Admin에게 **읽기 전용**

### RecipesPage (Restaurant Admin용) 기능

#### 리스트 표시
- 브랜드 레시피: "Brand" 뱃지, 수정 불가
- 자체 레시피: 전체 CRUD 가능
- **+ Menu 버튼**: 레시피를 메뉴로 등록

#### View 모드
- 모든 필드 disabled
- Close 버튼만 표시
- 자체 레시피인 경우 Edit 버튼 표시

---

## 사용 시나리오

### 시나리오 1: Brand General이 브랜드 레시피 생성

1. `/recipe-management` 페이지 접속
2. Recipes 탭에서 "+ New Recipe" 클릭
3. 레시피 정보 입력 (이름, 카테고리, 재료, 조리방법 등)
4. "Create Recipe" 클릭
5. 모든 브랜드 소속 레스토랑에서 조회 가능

### 시나리오 2: Restaurant Admin이 브랜드 레시피를 메뉴로 등록

1. `/recipes` 페이지 접속
2. 브랜드 레시피 카드 클릭 → Recipe Details 팝업
3. "+ Register as Menu" 버튼 클릭
4. 가격 설정 후 등록
5. 메뉴 관리에서 확인

### 시나리오 3: 독립 레스토랑이 자체 레시피 관리

1. `/recipes` 페이지 접속
2. "+ New Recipe" 클릭
3. 레시피 정보 입력
4. 필요시 메뉴로 등록
5. 언제든 수정/삭제 가능

---

## 원가 계산 로직

```javascript
// recipe_ingredients 저장 시
1. ingredient.unit_cost 조회
2. cost = quantity * unit_cost
3. recipe_ingredients.cost 저장

// recipe 저장 시
4. SUM(recipe_ingredients.cost)
5. recipes.total_ingredient_cost 업데이트
```

### 예시

```
Recipe: 토마토 수프
├─ 토마토: 0.5kg × RM 5.00/kg = RM 2.50
├─ 양파: 0.2kg × RM 3.00/kg = RM 0.60
└─ 소금: 0.01kg × RM 10.00/kg = RM 0.10
────────────────────────────────────────
총 원가: RM 3.20
권장가 (300% 마진): RM 9.60
```

---

## 파일 위치

### Backend
- 모델: `/var/www/dev-backend/models/Recipe.js`, `Ingredient.js`, `RecipeIngredient.js`
- 라우트: `/var/www/dev-backend/routes/recipes.js`, `ingredients.js`
- 카테고리: `/var/www/dev-backend/routes/recipe-categories.js`, `ingredient-categories.js`

### Frontend
- Brand General: `/var/www/dev-frontend/src/pages/RecipeManagement/`
  - `RecipeManagementPage.tsx` - 메인 페이지 (탭 네비게이션)
  - `RecipesTab.tsx` - 레시피 관리
  - `IngredientsTab.tsx` - 재료 관리
  - `RecipeCategoriesTab.tsx` - 레시피 카테고리
  - `IngredientCategoriesTab.tsx` - 재료 카테고리
- Restaurant Admin: `/var/www/dev-frontend/src/pages/Recipes/RecipesPage.tsx`
- Restaurant Admin: `/var/www/dev-frontend/src/pages/Ingredients/IngredientsPage.tsx`

---

## 변경 이력

| 날짜 | 버전 | 변경 내용 | 작성자 |
|------|------|-----------|--------|
| 2025-11-20 | 1.0 | 초안 작성 | Claude |
| 2025-11-30 | 2.0 | 권한 구조 설계 (recipe_manager_type 방식) | Claude |
| 2025-12-10 | 3.0 | 구현 완료 반영 - owner_type 기반 권한, UI 기능 추가 | Claude |

---

**문서 끝**
