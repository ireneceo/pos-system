## 현재 작업 상태
**마지막 업데이트:** 2026-04-13 (Brand cross-tenant fix — 운영 배포 4 완료)
**현재 버전:** v3.13 (Irene 결정으로 버전 미상승)
**작업 상태:** 운영 배포 완료 (배포 4: 14:53 UTC, smoke 10/10)

### 진행 중인 작업
- 없음

### 완료된 작업 (Brand cross-tenant 누수 fix — 치명 보안 — 2026-04-13 저녁)

**배경**: 운영에서 발견된 치명적 누수 — 한 Brand General(BG)이 다른 BG 소유 데이터(재료/공급업체/상품)를 조회/수정 가능.

**모델 재정의 (Irene 확정)**:
- Brand General = 회사/사업자 1명. 한 BG가 여러 brand를 소유 (`brands.owner_id`)
- **BG 레벨 공유 자원** (한 BG가 등록 → 본인 소유 모든 브랜드에서 공유):
  - product_ingredients, product_ingredient_categories
  - suppliers (owner_type='brand'만)
  - brand_products (BG의 자체 상품 카탈로그 — 아직 완성 안 된 기능)
  - brand_product_categories, brand_product_option_groups, brand_product_options
- **Brand 레벨 자원** (각 브랜드 전용):
  - product_recipes, product_recipe_categories

**지난 세션에 잘못 추가된 컬럼 정정**: 이전 세션은 6개 테이블에 `brand_id`를 추가했는데 Irene의 "재료 공유" 요구사항과 모순. 정정:
- ✓ product_ingredients, product_ingredient_categories, brand_products, brand_product_categories: `brand_id` 제거
- ✓ product_recipes, product_recipe_categories: `brand_id` 유지 (올바른 방향)

#### DB 변경 (dev 완료, 운영 미반영)
- 7개 테이블에 `owner_user_id INT NULL + FK users(id)` 추가: product_ingredients, product_ingredient_categories, suppliers, brand_products, brand_product_categories, brand_product_option_groups, brand_product_options
- 백필: 기존 brand_id 경로 / supplier_brands / brand_product_brands 등 추적하여 `owner_user_id = brands.owner_id` 설정
- 고아 테스트 데이터 삭제 (pi#2, pr#3/#7, prc#2, bp#13, bpc#5, 옵션그룹 1, 옵션 0)
- 4개 테이블에서 `brand_id` 컬럼 DROP (FK/인덱스 함께)

#### 신규 미들웨어 `middleware/brandScope.js`
- `requireBGScope` / `applyBGFilter` / `assertBGOwnsRow` — BG 레벨 자원 스코프
- `requireBrandScope` / `applyBrandFilter` / `assertBrandOwnsRow` — 브랜드 레벨 자원 스코프 (`brands.owner_id === user.id` 검증 후 `brand_id IN (owned brands)` 필터)
- System Admin은 양쪽 모두 우회 가능

#### 모델 업데이트 (9개)
- ProductIngredient, ProductIngredientCategory, Supplier, BrandProduct, BrandProductCategory, BrandProductOptionGroup, BrandProductOption: `owner_user_id` 필드 추가
- ProductRecipe, ProductRecipeCategory: `brand_id` 필드 추가

#### 라우트 수정 (6개)
- **product-ingredients.js** (301줄): BG 스코프 적용 — GET/POST/PUT/DELETE + `/:id/usage` + `/:id/adjust-stock` 전부 `owner_user_id` 기반
- **product-ingredient-categories.js** (219→195줄): BG 스코프. reorder 라우트 순서 수정 (`/:id` 앞)
- **product-recipes.js** (342→346줄): 브랜드 스코프. POST 시 `brand_id` 필수 (소유 브랜드 1개면 자동, 아니면 body 요구)
- **product-recipe-categories.js**: 동일 패턴 (full rewrite)
- **suppliers.js** (974→955줄): `|| supplier.connectedBrands.length === 0` 폴백 제거. N:M `supplier_brands` 읽기 중단 (쓰기도 legacy는 best-effort 클린업). `/api/suppliers` GET/POST/PUT/DELETE + `/brands/:brandId/suppliers` 전부 `owner_type='brand' AND owner_user_id` 스코프
- **brand-products.js** (1344줄): `isBrandManager` → `requireBGScope` 전체 치환. 카테고리/옵션그룹/상품 CRUD 모두 BG 필터 + owner_user_id 자동 세트. `/api/brands/:brandId/products`도 brand.owner_id 검증 + BG 스코프 추가

#### middleware/recipeAuth.js `isBrandManager` 수정
- **Free pass 제거**: URL에 brand_id가 없어도 `Brand.count({where: {owner_id: user.id}}) > 0` 체크 (dangling BG 차단)
- 실패 응답을 `{success:false, message}` 표준 포맷으로 통일

#### 검증 (dev)
- ✓ 빌드 성공 (경고 0건)
- ✓ health-check 39/39 통과
- ✓ BG 격리 테스트 11/11 통과:
  - 재료 ID 중첩 없음, owner_user_id 전부 일치
  - Supplier 격리, BG-Products 격리
  - Cross-tenant PUT (BG2→BG1 ingredient) → 404
  - Cross-tenant DELETE (BG2→BG1 supplier) → 404
  - 레시피 브랜드 격리 (BG1: brands [1,2,4], BG2: brands [10,17])

### 운영 배포 4 (2026-04-13 14:53 UTC)
- DB 마이그레이션: `scripts/migrate-bg-scope-prod.js` 실행 → 7 BG 컬럼 + 2 brand_id 컬럼 추가, 자동 백필 (suppliers 8건, brand_products 5건, brand_product_categories 1건, product_ingredients 11건, product_ingredient_categories 2건, product_recipes 1건)
- K-DINE 시리즈 고아 수동 할당 → user 23 (재료 7건, 카테고리 2건, 레시피 2건, 카테고리 3건, 공급업체 1건)
- 코드 배포: 28 백엔드 파일 + 508 프론트 파일, smoke 10/10
- 운영 검증: user 23 (재료 18 / 공급업체 8 / BG프로덕트 1), user 24 (0/0/4), user 29 (0/0/0). 교차 GET 404 차단

### 참고: 운영 DB 마이그레이션 패턴 (다른 환경 적용 시)

1. **owner_user_id 컬럼 추가** (7개 테이블):
   ```sql
   ALTER TABLE product_ingredients ADD COLUMN owner_user_id INT NULL,
     ADD INDEX idx_pi_owner_user (owner_user_id),
     ADD CONSTRAINT fk_pi_owner_user FOREIGN KEY (owner_user_id) REFERENCES users(id) ON DELETE SET NULL;
   -- 동일 패턴: product_ingredient_categories, suppliers, brand_products,
   --             brand_product_categories, brand_product_option_groups, brand_product_options
   ```
2. **백필** — 여러 경로:
   - suppliers: `UPDATE suppliers s JOIN brands b ON b.id=s.brand_id SET s.owner_user_id=b.owner_id WHERE s.owner_type='brand' AND b.owner_id IS NOT NULL`
   - brand_products: `UPDATE brand_products p JOIN brand_product_brands bpb ON bpb.product_id=p.id JOIN brands b ON b.id=bpb.brand_id SET p.owner_user_id=b.owner_id WHERE p.owner_user_id IS NULL` (첫 매칭)
   - brand_product_categories: category 이름 기반 추정 또는 관련 brand_products 역추적
   - product_ingredients / product_ingredient_categories: 운영에 관련 데이터 거의 없을 것이지만 `restaurant.brand_id` 추적으로 채움
   - brand_product_option_groups/options: `brand_product_option_group_products` 조인 후 brand_products.owner_user_id 전파
3. **NULL 남은 행 처리**: 운영에서 실제 유효 데이터인지 Irene 확인 후 삭제 or 특정 BG 직접 지정
4. **코드 배포**: 모델/미들웨어/라우트 파일 (dev와 동일)
5. **주의**: 운영 DB는 `brand_id` 컬럼이 애초에 없으므로 DROP 불필요

### 중요: 운영 영향 (기존 세션 이월)

신규 모듈 8개는 기존 플랜에 **자동 포함되지 않음** (opt-in 정책). 기존 고객의 접근권 복구하려면 System Admin이 수동으로 플랜 편집 필요:
- **Restaurant plans (Basic/Pro/Enterprise)**: Work Manuals, Ingredients, Suppliers 체크 — 14개 레스토랑 영향
- **Brand plans (Basic/Pro/Enterprise)**: Work Manuals, Ingredients, Suppliers 체크
- **Foodcourt plans**: Work Manuals 체크
- **Owner plans**: Work Manuals 체크
위치: `https://purplehere.com/pos/admin/plans`

### 다음 할 일
- Irene /배포 명령 → 운영 DB 마이그레이션 + 코드 배포
- 그 외 후속 과제:
  - 모든 역할 모든 페이지 레스토랑 이름 옆 `branch_name` 표시
  - `POST /api/restaurants` requireRole 누락 (HIGH 보안 갭) 수정
  - "No Active Subscription" 배너 정책 결정

---

### 완료된 작업 (이전 세션 — 2026-04-13 오전)

#### 1. Dangling Restaurant Admin 가드 (치명 — 배포 3에 포함, 운영 반영 완료)
- 증상: `hsoooj@naver.com` (prod user 30) - Restaurant Admin인데 `restaurant_id=NULL`. 로그인 시 프론트가 `/restaurant/1/dashboard` 폴백 → 모든 API 403/404
- 백엔드 `POST /api/users`: role=Restaurant Admin/Staff인데 restaurant_id 없으면 400 차단
- 백엔드 `PUT /api/users/:id`: 업데이트로 dangling 상태 만드는 시도 차단 (restaurant_id null 또는 role 승격 시)
- 백엔드 `POST /api/users`: `skipVerification is not defined` ReferenceError 부수 fix (req.body destructure)
- 프론트 `App.tsx`: `user.restaurantId || '1'` 하드코딩 폴백 제거 → `NoRestaurantAssigned` 에러 화면 렌더
- 프론트 `ProtectedRoute.tsx`: restaurant-scoped 역할이 restaurant_id 없이 `/restaurant/:id/*` 접근 시 `/pos`로 바운스 (cross-tenant 누수 차단). `|| '1'` 폴백 4건 모두 제거
- 프론트 `LoginPage.tsx` / `OperationInquiryPage.tsx`: 하드코딩 폴백 제거
- dev/prod DB 양쪽에서 hsoooj@naver.com 테스트 계정 삭제

#### 2. AddonModule 전체 역할 1:1 분리 (DB만, 배포 불필요)
- 사이드바 메뉴와 1:1 모듈 매핑을 위해 번들 모듈 8개 해제
- 신규 advanced 모듈 8개 생성 (dev + prod 동시):
  - restaurant: `work_manuals`, `ingredients`, `suppliers`
  - brand: `brand_work_manuals`, `brand_ingredients`, `brand_suppliers`
  - foodcourt: `fc_work_manuals`
  - owner: `owner_work_manuals`
- 기존 모듈 ui_routes 축소: `notices`, `recipe_management`, `inventory_management`, `brand_notices`, `brand_product_recipes`, `brand_inventory`, `fc_notices`, `owner_notices`
- 이름 정리: `inventory_management` + `brand_inventory` "Inventory & Supplier Management" → **"Inventory"**
- `menu_management`는 그대로 유지 (menu/categories/options 번들 유지 — Irene 지시)

### 운영 배포 (이번 세션)
- 배포 1 (23:14 MYT 2026-04-12): 인보이스 i18n + nowrap + PDF 분할 — `main.7c8f69a7.js`
- 배포 2 (23:52 MYT 2026-04-12): hardware quantity/unit_price + DELETE FK fix + payment_settings recalc — 백엔드 only
- 배포 3 (06:33 UTC 2026-04-13): modification_history 양형식 + Brand-Restaurant 연결 + Dangling Admin 가드 — `main.f5a7070a.js`, smoke 10/10, 버전 v3.13 유지
- 배포 4 (08:10 UTC 2026-04-13): no-op 재배포 (모듈 이름 이슈 진단 중 Irene 요청) — `main.f5a7070a.js` 동일 해시

### 중요: 운영 영향 (수동 조치 필요)

신규 모듈 8개는 기존 플랜에 **자동 포함되지 않음** (opt-in 정책). 기존 고객의 접근권 복구하려면 System Admin이 수동으로 플랜 편집 필요:
- **Restaurant plans (Basic/Pro/Enterprise)**: Work Manuals, Ingredients, Suppliers 체크 — 14개 레스토랑 영향
- **Brand plans (Basic/Pro/Enterprise)**: Work Manuals, Ingredients, Suppliers 체크
- **Foodcourt plans**: Work Manuals 체크
- **Owner plans**: Work Manuals 체크

위치: `https://purplehere.com/pos/admin/plans` → 각 플랜 Edit 모달 → Advanced Modules 섹션

### 다음 할 일

#### ★★★ 최우선 — Brand 데이터 cross-tenant 누수 fix (치명, 중단된 작업)

**증상 (Irene이 운영에서 발견)**:
- `https://purplehere.com/pos/brand-ingredients?brandId=5` → 신규 브랜드인데 다른 브랜드의 재료가 보임
- `https://purplehere.com/pos/suppliers` → 다른 브랜드 공급업체가 보임

**원인 (이번 세션에서 조사 완료)**:
1. `product_ingredients`, `product_ingredient_categories`, `product_recipes`, `product_recipe_categories`, `brand_products`, `brand_product_categories` 6개 테이블에 **`brand_id` 컬럼 자체가 없음**. 모든 브랜드가 공유 풀로 보임
2. `brand_product_brands` (N:M 조인)으로만 일부 연결 — 이미 deprecated된 구조
3. `routes/suppliers.js:91`: `|| supplier.connectedBrands.length === 0` 폴백 때문에 브랜드 연결 없는 공급업체가 모든 Brand General에게 노출
4. `middleware/recipeAuth.js` `isBrandManager`: URL에 brand_id 파라미터 없으면 free pass (line 124-127)

**Irene 결정 사항** (이전 세션에서 확정):
- 직접 `brand_id` 컬럼으로 1:1 소유. N:M 조인은 폐기
- 브랜드 연결 없는 데이터는 다른 브랜드/레스토랑에 절대 노출 안 됨
- 기존 데이터는 직접 지정해도 OK

**진행했다가 중단한 작업** (Irene 지시로 멈춤, 모든 코드 변경 revert됨):
- ✅ 마이그레이션 스크립트 작성 + dev DB에 brand_id 컬럼 추가 + 백필 완료
  - dev DB의 6개 테이블에 `brand_id INT NULL` 컬럼이 이미 추가되어 있음 (NULL 안전)
  - 백필도 일부 완료 (brand_products, recipes, ingredients via 관계 추적)
- ❌ 운영 DB는 미반영 — 컬럼 추가 + 백필 다시 해야 함
- ❌ 6 라우트 파일 수정 + 6 모델 파일 수정 + brandScope 미들웨어 작성 → **전부 revert됨, 다시 해야 함**

**다음 세션 작업 계획**:
1. dev DB 현재 상태 재확인 (`brand_id` 컬럼 + 백필 상태)
2. `middleware/brandScope.js` 신규 작성 — `requireBrandScope`, `ownsRow`, `applyBrandFilter` 헬퍼
3. 6개 모델에 `brand_id` 필드 추가 (ProductIngredient, ProductIngredientCategory, ProductRecipe, ProductRecipeCategory, BrandProduct, BrandProductCategory)
4. 6개 라우트 파일에 GET filter + POST auto-set + PUT/DELETE 소유권 검증 적용:
   - `routes/product-ingredients.js`
   - `routes/product-ingredient-categories.js`
   - `routes/product-recipes.js`
   - `routes/product-recipe-categories.js`
   - `routes/brand-products.js` (대형 — 21 endpoint, brand_product_categories + brand_product_option_groups + brand_products 모두)
   - `routes/suppliers.js` (`|| length === 0` 폴백 제거 + brand_id 직접 필터로 변경, supplier_brands 조인 폐기)
5. `middleware/recipeAuth.js` `isBrandManager` 수정 — `req.brandScope` 설정 + URL 없을 때 free pass 제거
6. `BrandProductOptionGroup`, `BrandProductOption` 모델 — brand_id 추가 필요 여부 확인 (이번에 누락)
7. dev에서 실제 브라우저 테스트: 브랜드 1 로그인 → 브랜드 1 데이터만 보이는지 / 브랜드 2 로그인 → 브랜드 2만 보이는지
8. 운영 DB 마이그레이션 + 코드 배포

**참고 데이터 (운영 기준)**:
- 영향 받는 행: product_ingredients 18, product_recipes 3, brand_products 5, suppliers 12 (brand-type)
- Brand 사용자 with brand_id: user 11→brand 1, 23→1, 24→4, 29→5
- 백필 매핑 가능: brand_products → brand_product_brands 조인으로 정확
- product_recipes: K-* 이름 → 추정 (recipe 3은 bp 11→brand 2 확정)

#### 그 외 후속 과제
- Irene 수동 플랜 편집 (4개 역할 플랜별로 신규 advanced 모듈 체크 — Work Manuals, Ingredients, Suppliers)
- 모든 역할 모든 페이지 레스토랑 이름 옆에 `branch_name` 표시 (같은 브랜드 내 이름 중복 구분)
- `POST /api/restaurants` requireRole 누락 (HIGH 보안 갭) 수정
- "No Active Subscription" 배너 정책 결정

### DB 변경 (이번 세션)
- `invoice_items` 테이블에 `quantity INT NOT NULL DEFAULT 1`, `unit_price DECIMAL(10,2)` 컬럼 추가 (배포 2 때)
- modification_history JSON 컬럼 데이터 정합성 복구 (배포 2 때)
- `addon_modules` 테이블: 8행 신규 INSERT + 8행 UPDATE (ui_routes 축소 + 이름 정리). dev+prod 양쪽 반영

---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
