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

| 사용자 | 브랜드 레시피 | 브랜드 재료 코스트 오버라이드 | 레스토랑 레시피 |
|--------|-------------|--------------------------|---------------|
| Brand General | CRUD | 해당 없음 (본인이 설정) | 접근 불가 |
| Brand Manager | CRUD | 해당 없음 (본인이 설정) | 접근 불가 |
| Restaurant Admin (브랜드 소속) | 조회만 | **My Cost 설정/수정/삭제** | CRUD |
| Restaurant Admin (독립) | 해당 없음 | 해당 없음 | CRUD |

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
  supplier_name VARCHAR(100),  -- ⚠️ DEPRECATED (2026-07-04): 쓰기 중단, read-only. 공급처=ingredient_seller_products 매핑(+SupplierProduct name/sku). 상세 docs/STOCK_ITEM_VS_SUPPLIER_PRODUCT_DESIGN.md §④
  -- supplier_id 도 동일하게 deprecated (레거시 단일공급, 매핑으로 대체)

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

### restaurant_ingredient_costs 테이블 (레스토랑별 코스트 오버라이드)

```sql
CREATE TABLE restaurant_ingredient_costs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  restaurant_id INT NOT NULL,
  ingredient_id INT NOT NULL,

  unit_cost DECIMAL(10, 4) NOT NULL COMMENT '레스토랑이 설정한 My Cost',
  notes VARCHAR(500) COMMENT '메모',
  updated_by INT COMMENT '마지막 수정자',

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE,
  FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,

  UNIQUE KEY uq_restaurant_ingredient_cost (restaurant_id, ingredient_id)
);
```

**설계 원칙:** Brand가 등록한 재료의 unit_cost(Brand Cost)를 직접 수정하지 않고, 레스토랑별로 별도 테이블에 오버라이드 값(My Cost)을 저장한다. 조회 시 `effective_cost = restaurant_cost ?? brand_cost` 로직으로 재료별 독립 폴백 적용.

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

#### 코스트 오버라이드 (Brand 재료에 대한 레스토랑별 My Cost)
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/restaurants/:restaurantId/ingredient-costs` | 레스토랑 코스트 오버라이드 목록 |
| PUT | `/api/restaurants/:restaurantId/ingredient-costs/bulk` | 일괄 코스트 오버라이드 설정 |
| PUT | `/api/restaurants/:restaurantId/ingredient-costs/:ingredientId` | 개별 코스트 오버라이드 설정 (upsert) |
| DELETE | `/api/restaurants/:restaurantId/ingredient-costs/:ingredientId` | 코스트 오버라이드 삭제 (Brand Cost로 복원) |

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

### 시나리오 3: Restaurant Admin이 Brand 재료에 My Cost 설정

1. `/recipe-management` 페이지 접속 (RecipeManagementPage)
2. Ingredients 탭에서 Brand 재료 목록 확인
3. 재료 카드의 "Set Cost" 클릭 → My Cost 입력
4. 저장 → 해당 재료가 포함된 모든 레시피 원가 자동 재계산
5. Recipes 탭에서 Brand Cost / My Cost 비교 확인
6. My Cost 삭제 시 Brand Cost로 자동 복원

### 시나리오 4: 독립 레스토랑이 자체 레시피 관리

1. `/recipes` 페이지 접속
2. "+ New Recipe" 클릭
3. 레시피 정보 입력
4. 필요시 메뉴로 등록
5. 언제든 수정/삭제 가능

---

## 원가 계산 로직

### 기본 원가 계산

```javascript
// recipe_ingredients 저장 시
1. ingredient.unit_cost 조회
2. cost = quantity * unit_cost
3. recipe_ingredients.cost 저장

// recipe 저장 시
4. SUM(recipe_ingredients.cost)
5. recipes.total_ingredient_cost 업데이트
```

### 레스토랑 코스트 오버라이드 (My Cost)

```javascript
// Restaurant Admin이 Brand 레시피를 조회할 때
1. restaurant_ingredient_costs 테이블에서 해당 레스토랑의 오버라이드 맵 조회
2. 각 재료별로:
   effective_cost = restaurant_cost ?? brand_cost  // 재료별 독립 폴백
3. 레시피 원가 재계산:
   effective_ingredient_cost = SUM(effective_cost * quantity)
```

**적용 범위:** brand-ingredients, brand-recipes, product-recipe, inventory(입고/실사/발주제안) 모든 API에 일괄 적용

### 예시

```
Recipe: 토마토 수프 (Brand Cost 기준)
├─ 토마토: 0.5kg × RM 5.00/kg = RM 2.50
├─ 양파: 0.2kg × RM 3.00/kg = RM 0.60
└─ 소금: 0.01kg × RM 10.00/kg = RM 0.10
────────────────────────────────────────
총 Brand Cost: RM 3.20

Recipe: 토마토 수프 (Restaurant My Cost 적용)
├─ 토마토: 0.5kg × RM 6.50/kg = RM 3.25  ← My Cost 설정됨
├─ 양파: 0.2kg × RM 3.00/kg = RM 0.60    ← Brand Cost 유지
└─ 소금: 0.01kg × RM 10.00/kg = RM 0.10  ← Brand Cost 유지
────────────────────────────────────────
총 My Cost: RM 3.95  (effective_ingredient_cost)
```

---

## 파일 위치

### Backend
- 모델: `/var/www/dev-backend/models/Recipe.js`, `Ingredient.js`, `RecipeIngredient.js`, `RestaurantIngredientCost.js`
- 라우트: `/var/www/dev-backend/routes/recipes.js`, `ingredients.js`, `product-recipe.js`, `inventory-routes.js`
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
| 2026-02-24 | 4.0 | 레스토랑별 코스트 오버라이드 시스템 추가 - restaurant_ingredient_costs 테이블, effective_cost 로직, My Cost UI | Claude |
| 2026-04-05 | 5.0 | 상품-재료 직접 연결 + 사이드바 재구성 + 역할별 확장 설계 | Claude |
| 2026-04-05 | 5.1 | Phase 1~2 구현 완료 반영 — auto recipe 패턴, UI 통일, Brand General 적용 | Claude |

---

## 구현 완료 (v5.1, 2026-04-05) — Phase 1: Restaurant Admin + Phase 2: Brand General

### 실제 구현 방식: Auto Recipe 패턴

설계 시 `ingredient_id` FK를 직접 추가하는 방식을 검토했으나, **기존 재고 차감 로직(inventoryDeductionService)을 변경 없이 활용**하기 위해 **auto recipe 패턴** 채택:

```
프론트엔드: directIngredients[] 전송
  → 백엔드: Recipe/ProductRecipe 자동 생성 (이름 = "{상품명} (auto)")
  → RecipeIngredient/ProductRecipeIngredient 연결
  → 상품.recipe_id / product_recipe_id 설정
  → 기존 inventoryDeductionService가 recipe 경로로 자동 차감
```

장점:
- `inventoryDeductionService.js` 변경 불필요 (기존 recipe 경로 그대로 사용)
- DB 스키마 변경 최소화 (새 FK 컬럼 불필요)
- 프론트엔드에서 recipe 선택과 재료 직접 연결이 상호 배타적으로 동작

### 🔒 저장 규약 (2026-08-30, 실제 데이터 파괴를 겪고 세운 것)

**이 블록은 4곳(`routes/menu.js` POST·PUT, `routes/brand-products.js` POST·PUT)이 같은 형태를 지킨다.**

1. **단일 트랜잭션.** 레시피 생성 → 재료 삽입 → 상품 연결은 한 덩어리다. 특히 **수정(PUT)은 기존
   재료를 `destroy` 로 전부 지운 뒤 다시 넣는다** — 트랜잭션이 없으면 중간 실패 시 **"지운 것만
   남아"** 사용자가 쌓아둔 재료가 통째로 사라진다.
2. **fail-loud.** 실패는 `400` 으로 나간다. `catch` 로 삼키면 화면에는 "저장됨"으로 보이고
   사용자는 재료가 사라진 것을 나중에야 안다. *(실측 반증: 방어 제거 시 재료 2건 → 0건 + status 200)*
3. **한 레시피에 같은 재료는 1행.** `recipe_ingredients` · `product_recipe_ingredients` 둘 다
   `UNIQUE(recipe_id, ingredient_id)`. 2행이 들어가면 BOM 이 이중이 되어 **입고 재고와 원가가
   그만큼 이중 계산**된다. brand 축은 이 제약이 없어 2026-08-30 에 신설했다
   (`scripts/migrate-product-recipe-ingredient-unique.js`).

**회귀 안전망**: `node scripts/health-check.js --category=inventory` 의 파괴방어 4케이스가
이 규약을 계약으로 검사한다(실패 주입 = 같은 재료 2번 → 유니크 위반, SQL 모드 무관).
방어를 걷어내면 그 4건이 실제로 실패하는 것까지 증명돼 있다.

### 실제 DB 변경 (Phase 1~2)

```sql
-- 옵션-재료 연결 (Restaurant)
CREATE TABLE option_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  option_id INT NOT NULL REFERENCES options(id) ON DELETE CASCADE,
  ingredient_id INT NOT NULL REFERENCES ingredients(id),
  quantity DECIMAL(10,4) DEFAULT 1,
  created_at DATETIME,
  updated_at DATETIME
);

-- 옵션-재료 연결 (Brand)
CREATE TABLE brand_product_option_ingredients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  option_id INT NOT NULL REFERENCES brand_product_options(id) ON DELETE CASCADE,
  ingredient_id INT NOT NULL REFERENCES product_ingredients(id),
  quantity DECIMAL(10,4) DEFAULT 1,
  created_at DATETIME,
  updated_at DATETIME
);
```

### UI 통일 패턴 (Phase 2에서 확립)

| 항목 | 규격 |
|------|------|
| 카드 이미지 비율 | `aspect-ratio: 16/9` |
| 카드 이미지 border-radius | `8px 8px 0 0` (상단만) |
| 뷰모드 | Compact / Image 토글, localStorage 저장 |
| 상세 팝업 | ViewContainer (이미지+헤더, Cost&Time 그리드, Ingredient 테이블, Instructions, Connected Items) |
| 레시피 카드 배지 | 연결된 메뉴/프로덕트를 녹색 배지로 표시 |
| Brand 이모지 | 사용 안 함 (이미지만, 없으면 타이틀만 좌측 정렬) |

### 구현 순서 현황

| Phase | 역할 | 상태 |
|-------|------|:----:|
| Phase 1 | Restaurant Admin | ✅ 완료 |
| Phase 2 | Brand General | ✅ 완료 |
| Phase 3 | System Admin | ⬜ 예정 |
| Phase 4 | Foodcourt General | ⬜ 예정 |

---

## 초기 설계 (v5.0, 2026-04-05)

### 배경

레시피 없는 상품(생수, 캔음료, 기성품)의 원가/재고 관리가 안 되는 문제. 모든 역할에서 상품→재료 직접 연결이 필요.

### 역할별 상품/레시피/재료 체계

| 역할 | 상품 모델 | 레시피 | 재료 직접 연결 | 재고 |
|------|----------|--------|:---:|:---:|
| Restaurant Admin | Product (메뉴) | Recipe → Ingredient | ✅ (신규) | Ingredient FIFO |
| Brand General | BrandProduct | ProductRecipe → ProductIngredient | ✅ (신규) | ProductIngredient |
| Foodcourt General | FoodcourtProduct (신규) | 없음 | ✅ (신규) | 재고 추적 |
| System Admin | SystemProduct | 없음 | ✅ (신규) | 재고 추적 |

### 메뉴(Product) 원가 연결 방식 (3가지 선택)

```
메뉴 수정 화면:
  [라디오] 레시피 연결       → recipe_id (기존, 변경 없음)
  [라디오] 재료 직접 연결    → ingredient_id + ingredient_quantity (신규)
  [라디오] 원가 직접 입력    → unit_cost (기존 필드 활용)
```

규칙: recipe_id와 ingredient_id는 상호 배타 (하나만 설정)

원가 우선순위:
1. Recipe.total_ingredient_cost (레시피 연결 시)
2. Ingredient.unit_cost × ingredient_quantity (재료 직접 연결 시)
3. Product.unit_cost (직접 입력)

### DB 변경

```sql
-- Product: 재료 직접 연결
ALTER TABLE products ADD COLUMN ingredient_id INT NULL REFERENCES ingredients(id);
ALTER TABLE products ADD COLUMN ingredient_quantity DECIMAL(10,2) DEFAULT 1;

-- BrandProduct: 재료 직접 연결
ALTER TABLE brand_products ADD COLUMN product_ingredient_id INT NULL REFERENCES product_ingredients(id);
ALTER TABLE brand_products ADD COLUMN ingredient_quantity DECIMAL(10,2) DEFAULT 1;

-- SystemProduct: 재고 관련
ALTER TABLE system_products ADD COLUMN track_stock BOOLEAN DEFAULT FALSE;
ALTER TABLE system_products ADD COLUMN current_stock DECIMAL(10,2) DEFAULT 0;
ALTER TABLE system_products ADD COLUMN min_stock DECIMAL(10,2) DEFAULT 0;
ALTER TABLE system_products ADD COLUMN unit_cost DECIMAL(10,4) DEFAULT 0;
ALTER TABLE system_products ADD COLUMN stock_unit VARCHAR(20) DEFAULT 'piece';

-- FoodcourtProduct: 신규 테이블
CREATE TABLE foodcourt_products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  foodcourt_id INT NOT NULL REFERENCES foodcourts(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  sku VARCHAR(100),
  category_id INT NULL,
  image_url TEXT,
  emoji VARCHAR(10),
  unit_price DECIMAL(10,2) DEFAULT 0,
  unit_cost DECIMAL(10,4) DEFAULT 0,
  track_stock BOOLEAN DEFAULT FALSE,
  current_stock DECIMAL(10,2) DEFAULT 0,
  min_stock DECIMAL(10,2) DEFAULT 0,
  stock_unit VARCHAR(20) DEFAULT 'piece',
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE foodcourt_product_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  foodcourt_id INT NOT NULL REFERENCES foodcourts(id),
  name VARCHAR(100) NOT NULL,
  emoji VARCHAR(10),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME,
  updated_at DATETIME
);
```

### 사이드바 메뉴 재구성

```
Restaurant Admin:
  Products
  ├── Menu                              ← 그대로
  ├── Categories                        ← 그대로
  ├── Options                           ← 그대로
  ├── Recipes (2탭: Recipes, Recipe Categories)     ← 기존 4탭에서 분리
  └── Ingredients (2탭: Ingredients, Ingredient Categories) ← 별도 메뉴로 분리

Brand General:
  Products
  ├── Products                          ← 그대로
  ├── Categories                        ← 그대로
  ├── Product Recipes (2탭)             ← 기존 4탭에서 분리
  └── Ingredients (2탭)                 ← 별도 메뉴로 분리

Foodcourt General:
  Products (신규 섹션)
  ├── Products                          ← FoodcourtProduct CRUD
  └── Categories                        ← FoodcourtProductCategory

System Admin:
  System Products                       ← 기존 + 재고 필드 추가
```

### 재고 차감 로직 확장

```javascript
// inventoryDeductionService.js
async function deductInventoryForOrder(order) {
  for (const item of order.items) {
    const product = await Product.findByPk(item.product_id);
    
    if (product.recipe_id) {
      // 경로 A: 기존 — Recipe → Ingredient별 FIFO 차감
      await deductByRecipe(product.recipe_id, item.quantity);
    } else if (product.ingredient_id) {
      // 경로 B: 신규 — Ingredient 직접 FIFO 차감
      await deductIngredient(product.ingredient_id, product.ingredient_quantity * item.quantity);
    }
    // 경로 C: 둘 다 없으면 skip
  }
}
```

### 기존 데이터 안전성

| 변경 | 기존 데이터 영향 |
|------|:---:|
| Product.ingredient_id 추가 | ❌ nullable, 기존 51개 영향 없음 |
| BrandProduct.product_ingredient_id 추가 | ❌ nullable, 기존 3개 영향 없음 |
| SystemProduct 재고 필드 추가 | ❌ default false/0, 기존 28개 영향 없음 |
| FoodcourtProduct 신규 테이블 | ❌ 새 테이블 |
| RecipeManagementPage 탭 분리 | ⚠️ URL 리다이렉트 필요 |
| inventoryDeductionService 확장 | ❌ 기존 recipe 경로 변경 없음 |

### 구현 순서

Phase 1: Restaurant Admin → Phase 2: Brand General → Phase 3: System Admin → Phase 4: Foodcourt General

---

**문서 끝**
