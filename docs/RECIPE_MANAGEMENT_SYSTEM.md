> 구조는 `docs/TRADE_STRUCTURE.md` 가 단일 기준입니다. 재료·상품·가격 판단은 그 문서부터 읽으세요.

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

> **삭제 게이트 (2026-09-11)**: 레시피가 쓰는 재료(브랜드 재료 DELETE)·상품(`brand-products.js` DELETE)은 **409 `IN_USE_BY_RECIPES`** + 쓰는 레시피 목록을 돌려준다(`utils/ingredientRecipeUsage.js`).
> `recipe_ingredients.ingredient_id` 가 ON DELETE CASCADE 라, 전에는 삭제하면 레시피의 재료 줄이 조용히 사라졌다.

#### 코스트 오버라이드 (Brand 재료에 대한 레스토랑별 My Cost)
| Method | 엔드포인트 | 설명 |
|--------|-----------|------|
| GET | `/api/restaurants/:restaurantId/ingredient-costs` | 레스토랑 코스트 오버라이드 목록 |
| PUT | `/api/restaurants/:restaurantId/ingredient-costs/bulk` | 일괄 코스트 오버라이드 설정 |
| PUT | `/api/restaurants/:restaurantId/ingredient-costs/:ingredientId` | 개별 코스트 오버라이드 설정 (upsert) |
| DELETE | `/api/restaurants/:restaurantId/ingredient-costs/:ingredientId` | 코스트 오버라이드 삭제 (Brand Cost로 복원) |

> **원가 칸은 재료 소유자가 정한다 (2026-09-11 · `docs/TRADE_STRUCTURE.md` §2-3 · `PURCHASE_ORDER_SYSTEM.md` §8-4 D-5)**
> - 브랜드 공유 재료 → 매장 원가는 오버레이(`restaurant_ingredient_costs`). 브랜드 원가(`ingredients.unit_cost`)는 브랜드 레시피용이며 매장이 바꾸지 않는다.
> - 매장 소유 재료 → 재료 행 자체가 매장 원가 칸(오버레이 행을 만들지 않는다). 일괄 PUT 도 소유 확인 후 같은 규칙.
> - 쓰기·읽기 단일소스 `services/storeCost.js`(`writeStoreCost` · `effectiveStoreCost` · `loadOverlayMap`). 수령(`invoiced_unit_price ?? unit_price`)·인보이스 대조·수동 입력이 전부 이 함수.

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

### RecipesTab — **BG·RA 공용** (2026-09-01 정정)

> 실측: `RecipeManagementPage`(→`RecipesTab`)가 **두 경로에 그대로 재사용**된다.
> BG `/pos/recipes` · RA `/restaurant/:restaurantId/recipe-management`.
> RA 화면은 자기 레시피 + 브랜드 레시피를 함께 조회한다(`/recipes` + `/brand-recipes` 병렬).
> 따라서 **이 탭을 고치면 두 역할에 동시에 반영된다.**

#### 목록 CSV 다운로드 (2026-09-01 추가)
툴바 `New Recipe` 옆 **`Download CSV`** 버튼. 공용 유틸 `utils/csvDownload.ts` 사용(BOM 포함 — 엑셀 한글 안 깨짐).

- **화면에 보이는 것만** 내보낸다 — 검색·분류 필터·정렬이 그대로 반영된다
- **레시피 1건 = 1줄** (2026-09-02 재구성)
- **재료가 없는 레시피도 한 줄은 남긴다** — 목록에서 조용히 빠지지 않게
- 숫자는 통화기호 없이 — 엑셀에서 바로 계산됨
- 원가는 `effective_cost`(매장 오버라이드 우선, 없으면 브랜드 원가)
- 파일명 `recipes_{brand|restaurant}_YYYY-MM-DD.csv`

13열(**2026-09-11 순서 변경** — 레시피 읽는 순서): `Recipe Name · Category · Source · Yield · Ingredients · Recipe Summary · Instructions · Prep Time (min) · Cook Time (min) · Recipe Cost · Suggested Price · Recipe Code · Active`
- `Ingredients` = `이름 0.05 kg (메모); …` — 수량은 `formatQuantity`(원값 `0.0500kg` 아님), 줄 순서는 서버가 `recipeIngredients` id ASC 로 고정. 이름을 못 찾은 줄은 빠지지 않고 `Ingredient #id` 로 남는다.
- (이전 13열: `Recipe Code · Recipe Name · Category · Active · Yield Amount · Yield Unit · Prep Time · Cook Time · Recipe Cost · Suggested Price · Recipe Summary · Instructions · Ingredients`)

> 목록 API가 이미 `recipeIngredients`(+`ingredient`)를 include 하므로 **백엔드 변경은 없다.**

##### 🔴 2026-09-02 재구성 — 조리법이 아예 빠져 있었다
처음 형태는 **"재료 1건 = 1줄"**(19열)이라 레시피 열이 재료 수만큼 반복됐고, **그 구조에는
조리법이 들어갈 자리가 없어 `instructions_summary`·`instructions_detail` 이 한 열도 없었다.**
받아 보면 레시피 내용이 통째로 빠져 있었다(Irene 지적).

바뀐 규칙:
- **레시피 1건 = 1줄.** 재료는 마지막 한 칸에 `이름 수량단위; 이름 수량단위; …` 로 모은다
- `Recipe Summary`=`instructions_summary`, `Instructions`=`instructions_detail`
  (비면 옛 `instructions` 로 폴백 — 화면과 같은 규칙)
- **셀 안 줄바꿈은 ` | ` 로 치환** — 조리법은 여러 줄이라 그대로 넣으면 엑셀에서 칸이 밀린다
- 재료 코드·기준수량·줄단가·Notes·Owner 열은 **뺐다**(Irene "필요한 것만")

> **RA 도 같은 버튼으로 받는다.** RecipesTab 은 RA 일 때 `/restaurants/:id/brand-recipes` 를
> 함께 조회해 브랜드 레시피를 목록 앞에 합치고, 그 응답은 `recipe.toJSON()` 이라 조리법 컬럼이
> 그대로 실려 온다(실호출 확인 2026-09-02). 즉 **브랜드가 만든 레시피를 매장에서 그대로 내려받는다.**

#### 기타 기능

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

## 준비된 재고 (1차 가공 재고) — ✅ Fable 판정 완료 (2026-09-12 접수 · 2026-09-17 판정)

> **상태: 판정 완료(§6). Irene 컨펌 뒤 구현 착수.** §1~§5 는 접수 당시 원문·실측 기록이고, 결정은 **§6** 이다.
> 판정 대상 근거(3축): 파급 크다(재고 수량·원가 계산 전체) · 비가역(표 구조·ENUM·마이그) · 길이 갈린다.

### 1. Irene 원문 (그대로)

**(1) 최초 제안**
> "재고가 준비된 재고도 있거든. 재고아이템으로 준비된 재고를 만드는 거야. 예를 들면 불고기를 재어 두는데 소고기를 이용해서 재 놓는 거지. 간장이랑 마늘 등을 넣어서. 그럼 준비된 재료인 불고기도 재고관리가 되어야 해. 3kg을 재면 실제 2.5kg이 되는 거고. 이 기준으로 재고아이템 - 준비된 재고 - 준비된 재고의 레시피 - 실제 레시피(메뉴, 브랜드만/프로덕트는 준비된재고 필요없음). 이거 그냥 레시피에서 재로로도 사용하기 기능을 추가해서 레시피 만들 때 선택할 수 있게 할까? 실제 최종용량 기준을 넣어서 모든 재료기준양보다 적은 기준을 비율로 재고차감이 되는 거야. 준비된 재고 레시피에 있는 재료들을 최종 기준양이 되어버리는 무게 기준으로 다시 비율을 나눠서 재고관리를 하는 거야. 어때? 이상해? 아니면 어떤 방법이 따로 있을까? 준비된 재고는 1차 작업을 한 재고라고 생각하면 되는데."

**(2) 범위 정정 — 팀원이 프로덕트 레시피를 끌어들인 것을 바로잡음**
> "프로덕트 레시피를 말한 적 없어, 프로덕트 레시피는 빼라고 했고, 브랜드레시피 하고 레스토랑이 쓰는 메뉴 레시피에 재고아이템 말고 준비된 재고도 있다고 말한거야."

### 2. 범위 (확정 — Irene)

| | 대상 |
|---|---|
| **포함** | 브랜드 레시피 · 매장(레스토랑)이 쓰는 메뉴 레시피 = **`recipes` 표 한 곳**(owner_type brand / restaurant) |
| **제외** | **프로덕트 레시피(`product_recipes`) — 준비된 재고 필요 없음** |

곧 «레시피 재료로 쓸 수 있는 것» 이 오늘은 재고아이템뿐인데, 여기에 **준비된 재고**가 하나 더 생긴다는 이야기다.

### 3. 팀원 실측 (2026-09-12, 코드·dev DB)

1. **`recipes` 한 표가 브랜드·매장 레시피를 모두 담는다** — `owner_type` ENUM('brand','restaurant'). dev 활성: brand 7 · restaurant 10.
2. **레시피 줄은 재료만 가리킨다** — `recipe_ingredients.ingredient_id` → `ingredients`. **레시피를 가리키는 칸이 없다.** 오늘 구조로는 레시피 안에 레시피가 들어갈 수 없다.
3. 🔴 **`recipes.yield_amount` / `yield_unit` 칸이 이미 있다**(기본 1 / 'portion'). 그런데 **저장·복사만 되고 원가 계산에도, 재고 차감에도 쓰이지 않는다** — 현재는 죽은 칸. Irene 이 말한 «3kg 재면 2.5kg» 이 앉을 자리가 비어 있는 상태.
4. **차감은 1단계뿐** — `services/inventoryDeductionService.js deductInventoryForOrder`: 주문줄 → 상품 → 레시피 → 재료를 `사용량 × 주문수량` 그대로 뺀다. 수율·비율 개념이 들어간 곳이 **한 군데도 없다**. 우선순위 = 레시피 > 상품 직결 재료(1:1) > 상품 자체 재고.
5. **재고 수량이 사는 곳** — `ingredients.current_stock` + `inventory_batches`(FIFO, 매장 스코프) + 브랜드 공유분은 매장 오버레이(`utils/brandStockAccess`). 준비된 재고도 «재고관리가 되어야» 하므로 수량이 살 자리가 필요하다.
6. **재료의 출처 규칙**(`docs/INGREDIENT_UNIFICATION_DESIGN.md`) — 브랜드 `ingredients` 행은 재고아이템(`product_ingredients`)의 **거울**이고, 출처는 «재고아이템» 또는 «브랜드 프로덕트» **둘 중 정확히 하나**. 둘 다 채워지면 인스펙션 ING-UNI-003 이 결함으로 잡는다. → **준비된 재고는 이 둘 중 어느 출처도 아니다.** 세 번째 출처가 되는지, 아니면 다른 자리에 사는지가 판정의 핵심.
   - dev 실측: 활성 `ingredients` restaurant 56(거울 0) · brand 27(거울 2).
7. **인접 선례** — 「재료를 그대로 상품으로 판다」 경로(`routes/restaurants-ingredients.js:372`, `routes/product-ingredients.js:941`)가 재료 1개로 **레시피(yield 1) + 상품**을 자동 생성한다. «재료 ↔ 레시피 ↔ 상품» 을 오가는 승급 패턴의 전례가 코드에 이미 있다.
8. **단위** — 재료·레시피·재고가 같은 ENUM 8종(kg, g, L, ml, piece, pack, can, bottle) 을 쓴다.
9. ⛔ **`docs/TRADE_STRUCTURE.md` 의 «같은 개념에 새 목록을 만들지 않는다»** 가 이 안건에 정면으로 걸린다(CLAUDE.md — 재료를 네 번 새로 지은 사고). 준비된 재고를 **새 표·새 목록**으로 만들지, **기존 재료 목록 안의 한 종류**로 둘지가 갈린다.

### 4. 갈리는 길 (판정 대상 — 팀원은 고르지 않는다)

- **가.** Irene 제안대로 «레시피에 재료로도 사용하기» 스위치 — 레시피가 자기 자신을 재료로 노출. `recipe_ingredients` 에 레시피를 가리키는 길이 필요(중첩 차감).
- **나.** 준비된 재고를 **재료 한 종류**로 둠(`ingredients` 에 종류 칸 하나) — 목록이 안 갈라지고 재고·원가·발주 경로를 그대로 탄다. 그 재료에 «만드는 레시피»가 붙는 형태.
- **다.** 별도 표 신설 — ⛔ 위 9번 규칙과 충돌하므로 근거가 필요.
- **공통 쟁점**: ① 수율(3kg→2.5kg)을 **어디에 저장**하고 원가를 어떻게 나눌 것인가(`yield_amount` 재사용 여부) ② 차감 시점 — **팔릴 때 원재료까지 소급**해서 뺄지, **만들 때 한 번**(생산 기록) 빼고 팔릴 때는 준비된 재고만 뺄지 ③ 브랜드가 만든 준비된 재고를 매장이 쓸 때 오버레이·원가 2층 규칙(`TRADE_STRUCTURE.md §2-3`)과 어떻게 맞물리는가 ④ 원가 전파(`services/costSync.js`)가 중간 단계를 만나면 어디까지 번지는가.

### 5. 판정 전 추가 실측 (2026-09-17 팀원 · Fable)

- **`services/costSync.js`**: `recomputeUnitCost` 는 재료행 `unit_cost` 한 칸만 고친다(출처 = 판매자 매핑 → 브랜드 프로덕트 → 없으면 사람). **레시피로 전파하지 않는다** — 레시피는 `routes/recipes.js:471` 이 재료 `unit_cost` 를 **읽어서** 계산한다(당김). 구매자 주도 변경은 `ctx.actor` 로 브랜드 행 쓰기를 막는다.
- **우회 등록된 1차 가공품**: 운영 DB 는 확인 불가(`claude_ro` 미설정) — 추측하지 않는다. dev 는 0건(양념/소스류 7건 전부 원재료 조미료).
- **수율 칸은 화면에 이미 있다**: RA·BG 레시피 폼 「Yield (Production Amount)」 + 「Cost per {단위}」(`RecipesTab.tsx:2146~2257`). 저장도 된다. **차감·재고 어디에도 안 쓰인다** — dev 17건 전부 `1 portion`.
- **판매 차감은 재료행 하나만 본다**: `stockFor/applyStock`(매장 소유 = 자기 행 · 브랜드 공유 = `restaurant_ingredient_stocks` 오버레이) + FIFO 배치 + 장부 + 저재고 경보 — **재료행이기만 하면 전부 자동**.
- **선택기 출처**: 브랜드 레시피 선택기는 Stock Items + GIT 프로덕트 두 묶음(`RecipesTab.tsx:944~948`, 저장 시 `product_ingredient_id` → 서버가 거울로 해석) · 매장 선택기는 매장 재료 + 브랜드 재료.
- 원가 매장층 쓰는 손은 `services/storeCost.writeStoreCost` 하나로 모여 있다(수령·수동·대조). 장부 ENUM 8종에 생산 유형은 없다.
- (별건·확인 대상) 코드가 쓰는 `transaction_type` 값 중 `manual_adjust`·`manual_receive`·`receive`·`po_shipped` 가 `inventory_transactions` ENUM 에 없다 — 다른 표에 쓰는 값인지 팀원이 확인. 이 안건 밖.

### 6. Fable 판정 (2026-09-17) — 길 **나**. 준비 재료 = 재료 목록 안의 한 종류, 출처는 「레시피」

**한 줄:** 준비된 재고는 **새 표가 아니라 `ingredients` 의 한 행**이고, 그 행의 **출처가 레시피**다(`source_recipe_id`). 재고 수량·FIFO·실사·경보·원가 2층·발주 제외·「재료를 상품으로 판다」 — 전부 기존 재료 기제를 **그대로** 탄다. 새로 생기는 행위는 **「만들기(생산 기록)」 하나**뿐이고, **판매 시 차감 코드는 0줄 변경**이다.

#### 6-1. 왜 가·다가 아닌가
- **가(레시피를 레시피 줄에 넣기)**: 레시피에는 **수량이 살 자리가 없다.** 「준비된 재료인 불고기도 재고관리가 되어야 해」를 못 채운다 → 결국 재료행이 필요해져 **나로 수렴**한다. 게다가 `recipe_ingredients` 에 재료 줄·레시피 줄 두 종류가 생겨 판매 차감 서비스(돈·재고 무결성)에 재귀가 들어간다. 기각.
- **다(별도 표)**: `TRADE_STRUCTURE.md` 「같은 개념에 새 목록 금지」 정면 위반. 수량·배치·실사·경보·오버레이·원가층을 **두 번째 벌**로 지어야 한다. 근거 없음. 기각.
- **나**: 출처 규칙(「사는 것 = Stock Item · 파는 것 = 프로덕트」)에 **「만드는 것 = 레시피」** 가 더해지는 것이라 개념이 겹치지 않는다(세 번째 *목록*이 아니라 세 번째 *출처*). ING-UNI 검사는 확장으로 흡수된다.

#### 6-2. 공통 쟁점 4개 — 답
| 쟁점 | 결정 |
|---|---|
| ① 수율 저장 | **`recipes.yield_amount / yield_unit` 재사용**(죽은 칸을 살린다). 준비 레시피면 `yield_unit` 은 재료 ENUM 8종 중 하나 **필수**(`portion` 금지). 원가(취급단위당) = 재료비 합 ÷ `yield_amount`. 준비 재료행의 다섯 칸: `unit = yield_unit` · `base_quantity = 1` · `package_unit = unit` · `package_quantity = 1` · `unit_cost = 1 취급단위 원가`(§2-2 항등식 `1 kg = 1 kg = RM x`). |
| ② 차감 시점 | **만들 때 한 번(생산 기록).** 원재료는 재울 때 없어지는 것이 물리적 사실이고, 실사와 맞고, 준비 재료 수량이 실제로 관리된다(Irene 첫 문장). 「팔릴 때 원재료까지 비율 소급」은 준비 재료 수량을 가질 수 없어 그 문장과 모순 → 기각. Irene 의 비율 아이디어는 **수율에 흡수**된다 — 원재료 소비량·원가가 `yield` 기준 비율로 계산된다. 판매 시엔 **준비 재료만** 빠진다(기존 코드). |
| ③ 브랜드 준비 재료 | 재료행 `owner_type='brand'` + `source_recipe_id` = 브랜드 준비 레시피. **수량은 매장 오버레이**(`restaurant_ingredient_stocks`) · **원가 매장층은 `restaurant_ingredient_costs`** — 존재하는 기제 그대로. **「만들기」는 매장만** 한다(브랜드에는 매장 주방 재고가 없다). 매장이 배합을 바꾸고 싶으면 기존 **복사** → 매장 소유 준비 재료. |
| ④ 원가 전파 | **브랜드 층** `unit_cost` = 저장값. 갱신 2곳: 준비 레시피 저장 시 · `costSync.recomputeUnitCost` 가 원재료를 고친 뒤 **1홉**(그 원재료를 쓰는 준비 레시피의 재료행 재계산, `ctx.actor` 규칙 그대로). **매장 층** = 생산 기록이 실제 소비원가÷실제 양을 `writeStoreCost` 로 가중평균 — **4번째 손**(TRADE §2-3 「셋 말고 없다」를 「넷」으로 고친다). 준비 레시피는 **원재료만** 쓴다(1단계, 중첩 금지) → 순환 없음, 전파는 항상 1홉. |

#### 6-3. 불변식 (인스펙션으로 잠근다)
1. 재료 출처는 **셋 중 정확히 하나** — Stock Item / 브랜드 프로덕트 / **레시피**(`ingredients.source_recipe_id` INT NULL, FK recipes, **UNIQUE**). ING-UNI-002(출처 있음)·004(하나만) 를 셋으로 확장.
2. 준비 재료의 **이름·단위는 레시피를 따른다**(레시피 → 재료 한 방향). 재료 쪽에서 이름·단위 수정은 403 — 거울 규칙과 동일. 신규 ING-UNI-017: `ingredients.unit = recipes.yield_unit`.
3. **준비 레시피는 메뉴에 붙지 않는다**(`products.recipe_id` 금지). 붙으면 판매 시 원재료 직접차감 + 생산차감 = **이중차감**. 팔고 싶으면 준비 재료를 기존 `register-as-product`(재료 1개 → 1줄 레시피 + 상품) 로. 신규 ING-UNI-018.
4. 준비 레시피 줄에는 **준비 재료를 넣지 않는다**(1단계). 신규 ING-UNI-019.
5. 준비 재료는 **발주 담기·판매자 매핑·카탈로그에 안 나온다**(사는 물건이 아니다). 저재고 경보는 그대로 = 「만들어야 함」 신호.
6. 준비 레시피 비활성 / 스위치 OFF: 메뉴 레시피가 쓰는 중이거나 재고 > 0 이면 **409 거부**(어느 메뉴·얼마인지 목록). 아니면 재료행 비활성(장부 보존), 다시 켜면 **같은 행** 복구(UNIQUE 가 이걸 강제).
7. **생산 기록 = 트랜잭션 1개**: 원재료 −(`deductStockFIFO` + `applyStock`, 부족하면 경고+부분 — 판매 차감과 같은 규칙, 모달에서 미리 보여준다) · 준비 재료 +(`applyStock` + `inventory_batches` 1건: `initial=실제 양`, `unit_cost=소비원가÷실제 양`, `manufacture_date=오늘`, `expiry` 선택) · 장부 `transaction_type='production'`(양쪽 모두, 부호로 구분 · **expand-only**) · 매장층 원가 `writeStoreCost`.
8. 프로덕트 레시피 제외 — **구조상 자동**(그 선택기는 `product_ingredients` 를 읽는다). 코드 0.

#### 6-4. Irene 이 화면에서 보는 것 · 하는 것 (세 걸음 — 이 순서 그대로 안내한다)

**한 줄:** 「준비 레시피를 하나 만들면 재료가 저절로 생기고, 재고 화면에서 「만들기」를 누르면 원재료가 빠지고 준비 재료가 들어오고, 메뉴 레시피에서 그 준비 재료를 고르면 팔릴 때 준비 재료만 빠진다.」

**걸음 1 — 레시피 화면(Recipes): 준비 레시피 만들기**
- 레시피 폼 맨 위에 스위치 하나: **「이 레시피의 결과물을 재료로 씁니다 (준비 재료)」**.
- 켜면 그 아래 안내 한 줄: 「저장하면 재료 목록에 **「불고기 양념육」**이 자동으로 생깁니다. 재고는 재고 화면의 「만들기」로 늘립니다.」
- 켜면 **수율 칸이 필수**가 되고 단위는 kg·g·L·ml·piece·pack·can·bottle 중 하나만(「portion」 은 안 됨). 예: 재료 = 소고기 3 kg · 간장 200 ml · 마늘 100 g, **수율 = 2.5 kg** → 화면이 「kg 당 원가 RM xx」를 보여준다(지금 있는 Cost per 계산 그대로).
- 켜진 레시피는 메뉴에 못 붙인다(메뉴 레시피 선택기에서 빠짐). 이미 메뉴에 붙어 있는 레시피에서 켜려 하면 「이 레시피는 메뉴 N개에 연결돼 있어 준비 재료로 바꿀 수 없습니다」 + 목록.
- 목록에는 배지 **「준비 재료」**. 브랜드가 만들면 매장 화면에도 브랜드 레시피로 보인다(지금과 같다, 읽기 전용).

**걸음 2 — 재고 화면(Inventory): 만들기**
- 재료 목록에서 준비 재료 행은 출처가 **「레시피: 불고기 양념육」**(누르면 그 레시피). 이름·단위는 회색(레시피에서만 바뀜). 발주 화면에는 안 나온다.
- 행 액션이 「입고」 대신 **「만들기」**. 모달:
  - **몇 판 만드나요?** (기본 1, 소수 가능) → 아래에 「빠지는 원재료」 표: 소고기 3 kg (현재 12 kg) · 간장 200 ml (현재 1,500 ml) · 마늘 100 g (현재 **80 g — 20 g 부족**). 부족은 빨간 글씨로 미리 보인다.
  - **실제로 나온 양** (기본 = 수율 × 판수, 고칠 수 있음: 이번엔 2.4 kg) · **유통기한**(선택).
  - 「만들기」 확인 → 한 번에: 원재료 빠짐 · 준비 재료 +2.4 kg · 장부에 「만들기 — 불고기 양념육 1판」 한 줄(원재료 줄들도 같은 표시) · kg 당 원가는 이번 소비원가 ÷ 2.4 로 매장 원가에 반영.
- 실사(Stock Take)·저재고 경보는 다른 재료와 똑같이 잡힌다. 경보가 뜨면 = 「만들 때」.

**걸음 3 — 메뉴 레시피에서 준비 재료 쓰기**
- 「불고기 덮밥」 레시피의 재료 선택기에 **「불고기 양념육 · 준비 재료」**가 보통 재료처럼 나온다(브랜드 선택기에는 Stock Items · 프로덕트 옆에 세 번째 묶음 「준비 재료」). 줄: 불고기 양념육 **0.2 kg**.
- 팔리면 **불고기 양념육만 0.2 kg 빠진다.** 소고기·간장·마늘은 걸음 2 에서 이미 빠졌다. 두 번 빠지는 일은 없다(불변식 3).
- 준비 재료 자체를 팔고 싶으면(「양념육 500 g 포장 판매」) 재료 행의 기존 **「상품으로 등록」** 버튼 — 지금 있는 기능 그대로.

**한 번에 되고 동기화되는 것(Irene 요구 대조):** 스위치 1개 → 재료행 자동 생성·이름·단위·원가 동기 / 「만들기」 1번 → 원재료·준비 재료·배치·장부·원가 전부 한 트랜잭션 / 메뉴 판매 → 준비 재료만. 사람이 두 군데를 맞춰 적는 자리는 없다.

#### 6-5. 구현 지시 (팀원 · Opus)
**A. 백엔드(먼저)**
1. 마이그 `scripts/migrate-prep-ingredient-*.js`(멱등 · 레지스트리 `deploy`): `ingredients.source_recipe_id` INT NULL + FK + UNIQUE · `expandEnum(inventory_transactions.transaction_type, ['production'])`. 모델·association(`Ingredient.belongsTo(Recipe, as 'sourceRecipe')` / `Recipe.hasOne(Ingredient, as 'prepIngredient')`).
2. 서비스 `services/prepIngredientSync.js` — 준비 레시피 저장(POST/PUT, 브랜드·매장 4 라우트 `recipes.js:186·290·569·676`) 뒤 호출: 스위치 ON → 재료행 생성/복구(이름·단위·다섯 칸·브랜드층 `unit_cost` = 재료비÷yield) · OFF → 불변식 6 검사 후 비활성 · 검증(yield_unit ∈ 8종, 줄에 준비 재료 없음, 메뉴 연결 없음 → 409/400 표준 응답).
3. 라우트 `POST /api/restaurants/:rid/inventory/produce`(`inventory-core.js` 의 receive/adjust 옆) — body `{ ingredient_id, batches, actual_amount, expiry_date?, notes? }` · 불변식 7 그대로 · 응답에 원재료별 차감·부족·배치 id. 미리보기 `GET …/inventory/produce-preview?ingredient_id&batches` (원재료·현재고·부족).
4. `costSync.recomputeUnitCost` 끝에 1홉 추가(불변식 ④). `storeCost.writeStoreCost` 는 그대로 쓴다(코드 변경 없음, 호출만).
5. 발주 담기 목록·판매자 매핑 후보·`from-catalog`·reorder-suggestions 에서 `source_recipe_id IS NULL` 제외(불변식 5). `products.recipe_id` 연결 라우트(상품 저장·브랜드 동기 `brandMenuSyncService.js:225`)에서 준비 레시피 거부(불변식 3).
6. 재료 PUT: `source_recipe_id` 행의 이름·단위·다섯 칸 수정 403(거울과 같은 분기).
7. 인스펙션 `ingredient-unification.js`: 002·004 확장 + 017·018·019 신설(전부 차단). health-check `--category=inventory` 에 produce 왕복 1건. **고장주입 3건**(017: 단위 어긋난 행 · 018: 준비 레시피를 메뉴에 붙임 · 019: 준비 레시피 줄에 준비 재료) 반증 필수.
**B. 프론트(코드 확정 후 빌드 1회 · sweep 1회)**
8. `RecipesTab.tsx`(RA·BG 공용) 스위치 + 수율 필수/단위 제한 + 안내 문구 + 목록 배지 + 메뉴 선택기에서 준비 레시피 제외 + 브랜드 선택기 세 번째 묶음(`__source='prep'`, `ingredient_id` 로 전송) + Source 라벨 `srcRecipe`.
9. `IngredientsTab.tsx`·`BrandIngredientsPage.tsx`: 출처 「레시피: …」 링크, 이름·단위 읽기전용.
10. `InventoryPage.tsx`: 준비 재료 행 「만들기」 모달(미리보기 → 확인) · `StockLedger`: `production` 라벨. 공용 Modal/Button/DataTable 만.
11. i18n 4언어(recipes·ingredients·inventory ns) · `npm run i18n:verify`.
**C. 검증·게이트**
12. 실호출 시나리오(demo 매장 38): 준비 레시피 저장 → 재료행 자동 생성 확인 → produce(부족 1건 포함) → 원재료·준비 수량·배치·장부·매장원가 확인 → 메뉴 레시피에 준비 재료 0.2 → 주문 → **준비 재료만** 차감 확인 → OFF 시도 409 → 원복.
13. `verify-all --full` · `check-sensitive-diff`(돈·재고 → 게이트 대상) · **Fable 게이트 판정 1회**(이 안건 2회차, 마지막).
14. 문서: 이 절 §6 이 설계다. `TRADE_STRUCTURE.md §2-3` 「쓰는 손 넷」·「출처 셋」 한 줄씩, `INGREDIENT_UNIFICATION_DESIGN.md` 출처 규칙 한 줄. 새 문서 만들지 않는다.
**D. 운영 이행**: 운영 DB 확인 불가 → 배포 후 `운영검증` 에서 이름에 양념/소스/육수/Marinat/Broth/Paste/Dough 든 재료 목록만 뽑아 보고. **자동 변환 없음** — 어느 행을 준비 재료로 바꿀지는 Irene 이 정한다(기존 행은 그대로 두고, 준비 레시피를 새로 만들어 연결하는 것이 아니라 **기존 행에 `source_recipe_id` 를 거는** 이행 스크립트를 그때 따로 판정).
**마이그 파급**: nullable 컬럼 1 + UNIQUE + ENUM 값 1 추가뿐. 기존 행·기존 차감 경로 무영향. 롤백 = 새 라우트·스위치 미사용(컬럼은 남아도 무해).

⛔ 설계와 다른 판단이 필요해지면(예: 준비 재료 중첩이 실제로 필요하다, 브랜드도 「만들기」가 필요하다) 즉시 중단하고 Fable 에 사실만 가져온다.

---

---

## 운영 실태 측정 — 브랜드 레시피가 «도달» 해도 «차감» 되지는 않는다 (2026-09-16)

> 설계는 위 문서대로 정상이다. 아래는 **운영 데이터가 그 설계를 실제로 쓰고 있는지**의 측정이다(K-DINE, 브랜드 2 ↔ 매장 8).

- **도달(읽기)은 구조상 자동이다.** 브랜드 레시피는 매장으로 복사되지 않고 매장이 `restaurant.brand_id` 로 읽어간다(`routes/recipes.js:479~501`). 요금제 문은 이 경로만 예외(가맹점은 등급과 무관하게 브랜드 레시피를 본다).
- **차감은 별개 조건이다.** 레시피가 재고를 깎으려면 **상품(`products.recipe_id`)에 연결**돼 있어야 하고, 그 레시피에 **재료 줄이 있어야** 한다. 두 조건은 서로 독립이라 «있는데 안 깎이는» 상태가 네 가지로 갈린다.

| 재료 줄 | 메뉴 연결 | 운영 실측(브랜드 2) | 결과 |
|---|---|---|---|
| 있음 | 있음 | 34건 | 정상 차감 |
| 있음 | **없음** | **21건** | 화면엔 보이나 차감 0 |
| **없음** | 있음 | **8건** | 화면엔 «연결됨» 인데 차감 0 (가장 헷갈림) |
| 없음 | 없음 | 9건 | 미완성 |

- **옵션은 레시피 경로가 아니다.** 「Add-on: 치즈/계란/…」를 레시피로 만들어도 쓰이지 않는다 — 옵션 차감은 `option_ingredients`(`services/inventoryDeductionService.js:375~424`)를 본다. 운영 측정: 매장 8 의 옵션 12개 **전부 재료 연결 0**, 그런데 같은 이름의 브랜드 레시피는 10건 존재.
- 브랜드 메뉴 104개 중 **39개가 레시피 없음**이고, 이름이 같은 레시피도 0건이라 자동 매칭 근거가 없다.
- 상속 규칙 확인: `brandMenuSyncService.js:225` 는 **매장 `recipe_id` 가 비어 있을 때만** 브랜드 값을 넣는다. 운영에서 비어 있는 채 안 채워진 건 1건(매장 상품 373).

**문서 끝**
