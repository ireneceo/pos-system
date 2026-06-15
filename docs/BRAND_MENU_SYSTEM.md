# Brand Menu System

> BG (Brand General) 가 만든 메뉴 템플릿을 산하 프랜차이즈 레스토랑에 push + 잠금/sync 제어.
> Cross-refs: [CONTRACT_MANAGEMENT_SYSTEM.md](./CONTRACT_MANAGEMENT_SYSTEM.md), [BG_FG_TRADE_BILLING.md](./BG_FG_TRADE_BILLING.md)

## 1. 기능 정의

| 항목 | 내용 |
|---|---|
| 목적 | 본부가 메뉴/가격/옵션 통제. 본부가 메뉴 만들면 산하 지점 push (자동/수동). 지점은 잠긴 필드 못 바꾸지만 품절은 자유. BG가 여러 brand 소유 시 brand 별 독립 메뉴. |
| 핵심 사용자 | Brand General (본부), Restaurant Admin (지점). System Admin 은 디버그 read-only. |
| 도메인 분리 | "Product" 단어는 BG 의 공급 카탈로그 전용. 새 도메인은 모두 **"Brand Menu"** 로 명명. |

## 2. 명명 규칙

| 자산 | 이름 |
|---|---|
| DB 테이블 | `brand_menus` / `brand_menu_categories` / `brand_menu_option_groups` / `brand_menu_options` / `brand_menu_option_group_links` |
| Sequelize 모델 | `BrandMenu` / `BrandMenuCategory` / `BrandMenuOptionGroup` / `BrandMenuOption` / `BrandMenuOptionGroupLink` |
| API URL | `/api/brand-menus` / `/api/brand-menu-categories` / `/api/brand-menu-option-groups` / `/api/restaurant/:rid/brand-menus` |
| UI 라벨 | Brand Menus / Menu Categories / Menu Options / Brand Recipes |
| **금지** | `brand_menu_products`, `BrandMenuProduct`, `/api/brand-menu-products` (Product 단어 신규 도메인에 금지) |

## 3. 결정 사안 (확정)

| # | 결정 | 값 |
|---|---|---|
| 1 | distribution_mode 기본값 | `manual` |
| 2 | RA "Skip This Version" | Yes |
| 3 | 옵션 그룹 수정 → 사용 메뉴 자동 pending | Yes |
| 4 | RA가 brand-linked Product 직접 삭제 | Yes + 모달 경고 |
| 5 | 재료 가격 → recommended_price 자동 재계산 | No |
| 6 | 기존 Management 카테고리 | Franchise 리네임 |
| 7 | Brand Management 아이콘 | `Building2` (lucide) |

## 4. 사이드바 정보 구조 (BG)

```
Brand Management (Building2)           — 신규 카테고리
├── Brands                              — 기존 (Management → 이동)
├── Brand Menus                         — 신규
├── Menu Categories                     — 신규
├── Menu Options                        — 신규
└── Brand Recipes                       — 기존 (Products & Inventory → 이동)

Franchise (Users — 리네임)              — Management → Franchise
├── Restaurants
├── Restaurant Admins
└── Managers

Products & Inventory (Package — 슬림)
├── Products (BG sells)
├── Product Recipes
├── Ingredients
├── Suppliers
└── Inventory
```

## 5. 데이터 모델

### 신규 5 테이블

```sql
brand_menu_categories
├── id, brand_id (FK brands), name, emoji, image_url, color, sort_order, is_active, timestamps
└── KEY (brand_id)

brand_menu_option_groups
├── id, brand_id (FK), name, description, min_select, max_select, is_required, is_active,
│   version (수정시 ++ — 사용 메뉴 모두 pending 마킹), timestamps
└── KEY (brand_id)

brand_menu_options
├── id, group_id (FK brand_menu_option_groups), name, extra_price, sort_order, is_active, timestamps
└── KEY (group_id)

brand_menus
├── id, brand_id (FK), category_id (FK brand_menu_categories, nullable),
│   product_recipe_id (FK product_recipes, nullable — 메뉴 레시피 연결),
│   name, description, image_url, emoji, recommended_price, currency,
│   is_active, sort_order, version (수정시 ++),
│   distribution_mode ENUM('auto','manual') DEFAULT 'manual',
│   lock_name, lock_price, lock_category, lock_image, lock_options (BOOLEAN × 5),
│   timestamps
└── KEY (brand_id), (brand_id, category_id)

brand_menu_option_group_links            -- N:M brand_menu ↔ option_group
├── id, brand_menu_id, option_group_id, sort_order, timestamps
└── UNIQUE (brand_menu_id, option_group_id), KEY (brand_menu_id), KEY (option_group_id)
```

### 기존 테이블 ALTER

```sql
ALTER TABLE products
  ADD COLUMN brand_menu_id INT NULL,
  ADD COLUMN brand_menu_synced_version INT NULL,
  ADD COLUMN brand_menu_synced_at DATETIME NULL,
  ADD COLUMN brand_menu_locks_snapshot JSON NULL,
  ADD COLUMN brand_menu_link_status ENUM('in_sync','pending_update','unlinked') NULL,
  ADD INDEX idx_brand_menu (brand_menu_id),
  ADD INDEX idx_link_status (restaurant_id, brand_menu_link_status),
  ADD CONSTRAINT FK products → brand_menus ON DELETE SET NULL;

ALTER TABLE option_groups
  ADD COLUMN brand_menu_option_group_id INT NULL,
  ADD COLUMN brand_menu_synced_version INT NULL,
  ADD INDEX idx_brand_menu_option_group (brand_menu_option_group_id);
```

### Sequelize associations

```javascript
Brand.hasMany(BrandMenu)
BrandMenu.belongsTo(Brand)
BrandMenu.belongsTo(BrandMenuCategory)
BrandMenu.belongsTo(ProductRecipe, as: 'recipe')
BrandMenu.belongsToMany(BrandMenuOptionGroup, { through: BrandMenuOptionGroupLink, as: 'optionGroups' })
BrandMenuOptionGroup.hasMany(BrandMenuOption, as: 'options')
BrandMenu.hasMany(Product, { foreignKey: 'brand_menu_id', as: 'linkedProducts' })
Product.belongsTo(BrandMenu, as: 'brandMenu')
OptionGroup.belongsTo(BrandMenuOptionGroup, as: 'sourceGroup')
```

### 마이그레이션 전략

수동 idempotent 스크립트: `scripts/migrate-brand-menu-system.js`
- 신규 5 테이블 `CREATE TABLE IF NOT EXISTS`
- ALTER 는 컬럼/인덱스 존재 검사 후 추가 (백워드 컴팻 — 기존 데이터 NULL 처리, back-compat 100%)

## 6. 동기화 흐름

```
[BG]
BrandMenu 생성/수정 → version++
  ↓
distribution_mode='auto' → 산하 모든 Restaurant.Product 자동 upsert (재료 부족시 ingredient 자동 sync)
distribution_mode='manual' → BG가 "Push to Restaurants" 버튼 클릭

[Restaurant]
사이드바 Menu 항목 우측에 pending count 배지
  ↓
/restaurant/:rid/brand-menu-updates 페이지 진입
  ↓
diff 카드 list: "Price: RM 35 → RM 38 🔒 (will be locked)"
[Sync All] / [Sync This Menu] / [Skip This Version]
  ↓
Sync 클릭 → 트랜잭션 (잠긴 필드 BG 값 강제, 비잠긴은 BG 값으로 받되 RA 가 이후 수정 가능)
synced_version = BG.version, locks_snapshot = 현재 잠금, status='in_sync'

[잠금 enforcement]
PUT /api/menu/product/:id — 잠긴 필드 변경 시 400 PRODUCT_FIELD_LOCKED_BY_BRAND
soldOut, is_active, stock — 잠금 무관 자유

[삭제 처리]
BG → DELETE brand_menu → Restaurant.Product soft unlink (brand_menu_id=NULL, locks 해제, status='unlinked')
RA → DELETE product (brand_menu_id 있어도 허용) — 프론트가 "Unlink first?" 모달 안내
```

## 7. API Endpoints

### BG 측 (Brand Menus)

| METHOD | PATH | 미들웨어 |
|---|---|---|
| GET | `/api/brand-menus?brand_id=X` | `authenticateToken` + `requireBGScope` |
| POST | `/api/brand-menus` | 동일 |
| GET | `/api/brand-menus/:id` | 동일 |
| PUT | `/api/brand-menus/:id` | 동일 — `version++` |
| DELETE | `/api/brand-menus/:id` | 동일 — soft unlink |
| POST | `/api/brand-menus/:id/copy` | 동일 — target_brand_id 검증 |
| POST | `/api/brand-menus/:id/push` | 동일 — restaurant_ids 검증 |
| GET | `/api/brand-menus/:id/distribution` | 동일 |

### BG 측 (Categories)

| METHOD | PATH | 미들웨어 |
|---|---|---|
| GET | `/api/brand-menu-categories?brand_id=X` | `requireBGScope` |
| POST | `/api/brand-menu-categories` | 동일 |
| PUT | `/api/brand-menu-categories/:id` | 동일 |
| DELETE | `/api/brand-menu-categories/:id` | 동일 — 사용 메뉴 있으면 400 IN_USE |
| PUT | `/api/brand-menu-categories/reorder` | 동일 |

### BG 측 (Option Groups)

| METHOD | PATH | 미들웨어 |
|---|---|---|
| GET | `/api/brand-menu-option-groups?brand_id=X` | `requireBGScope` |
| POST | `/api/brand-menu-option-groups` | 동일 |
| GET | `/api/brand-menu-option-groups/:id` | 동일 |
| PUT | `/api/brand-menu-option-groups/:id` | 동일 — `version++` + 사용 메뉴 pending 마킹 |
| DELETE | `/api/brand-menu-option-groups/:id` | 동일 — 사용 메뉴 있으면 400 IN_USE |

### Restaurant 측 (sync 수신)

| METHOD | PATH | 미들웨어 |
|---|---|---|
| GET | `/api/restaurant/:rid/brand-menu-updates` | `authenticateToken` + `checkRestaurantAccess` |
| POST | `/api/restaurant/:rid/brand-menus/:bmid/sync` | 동일 |
| POST | `/api/restaurant/:rid/brand-menus/sync-all` | 동일 |
| POST | `/api/restaurant/:rid/brand-menus/:bmid/skip-version` | 동일 |
| DELETE | `/api/restaurant/:rid/brand-menus/:bmid/unlink` | 동일 |

### 기존 라우트 보강

| METHOD | PATH | 추가 |
|---|---|---|
| PUT | `/api/menu/product/:id` | 잠금 가드 — locks_snapshot 검증, 400 `PRODUCT_FIELD_LOCKED_BY_BRAND` |
| GET | `/api/badge-counts` | `brand_menu_pending` count 추가 |

## 8. 보안 + 영향 매트릭스

| Surface | 영향 | 처리 |
|---|---|---|
| POS Terminal | 무영향 | Restaurant.Product 그대로 read |
| Mobile menu API | 무영향 | 동일 |
| Order.order_items snapshot | 무영향 | 이미 historical snapshot |
| Dashboard Reports / Menu Analysis | 무영향 | Restaurant.Product 기준 |
| MenuManagement UI | Edit 모달 보강 | 잠금 표시 + Unlink 버튼 |
| Menu PUT/DELETE 라우트 | 가드 추가 | 잠금 검증 + soft unlink |
| 사이드바 | 카테고리 재구성 | Brand Management 신규 + Management → Franchise |
| 재료/레시피 | 자동 선행 sync | sync 시 부족 재료 자동 ingredient sync |
| i18n 4 lang | ~45 키 추가 | common + brand + orders namespace |

## 9. 테스트 시나리오 (10건)

1. BG가 brand A 메뉴 생성 + distribution=auto → 산하 3 레스토랑 Product 자동 생성
2. BG가 가격 수정 (lock_price=true) → 3 레스토랑 pending 마킹 + diff 화면 → Sync → DB 업데이트
3. BG → Copy to brand B → brand B 에 독립 row (brand A 와 무관)
4. RA 잠긴 가격 수정 시도 → 400 PRODUCT_FIELD_LOCKED_BY_BRAND
5. RA 품절 토글 → 잠금 무관 정상
6. BG 메뉴 삭제 → Restaurant.Product 보존 + brand_menu_id=NULL + status='unlinked'
7. BG 옵션 그룹 수정 → 사용 메뉴 N개 version++ → 레스토랑 각각 sync
8. RA Unlink → 이후 BG 영향 X
9. 레시피 재료 부족 sync → 자동 ingredient sync 선행 → 성공
10. 기존 주문 order_items snapshot → 메뉴 가격 변경 후 historical 가격 유지

## 10. 파일 touch list

### Backend
- 신규 모델 5: `models/BrandMenu.js` + `BrandMenuCategory.js` + `BrandMenuOption.js` + `BrandMenuOptionGroup.js` + `BrandMenuOptionGroupLink.js`
- 수정 모델 2: `models/Product.js` (컬럼 추가) + `models/OptionGroup.js`
- `models/index.js` association 추가
- 신규 라우트 4: `routes/brand-menus.js` + `brand-menu-categories.js` + `brand-menu-option-groups.js` + `restaurant-brand-menus.js`
- 수정 라우트 2: `routes/menu.js` (잠금 가드) + `routes/badgeCounts.js` (pending count)
- `server.js` — 라우트 등록
- 신규 마이그: `scripts/migrate-brand-menu-system.js`
- 신규 health-check 케이스 추가

### Frontend
- 신규 페이지 4: `pages/BrandGeneral/BrandMenusPage.tsx` + `BrandMenuCategoriesPage.tsx` + `BrandMenuOptionGroupsPage.tsx` + `pages/Restaurant/BrandMenuUpdatesPage.tsx`
- 수정: `pages/MenuManagement/MenuManagementPage.tsx` (잠금 표시 + Unlink)
- 수정: `components/Layout/MainLayout.tsx` (사이드바 재구성)
- 수정: `App.tsx` (신규 4 라우트 + lazy import)
- i18n: `public/locales/{en,ko,zh,ms}/{common,brand,orders}.json` (~45 키 × 4 lang)

## 11. UI/UX 가이드

- 디자인 시스템: `#635BFF` primary, `#F0EFFF` accent bg, `#9CA3AF` lock color, `#F59E0B` pending warning, `#10B981` synced
- 잠금 표시: `disabled` input + bg `#F9FAFB` + lucide `Lock` icon 14px + tooltip
- 모달: `CommonModal` (full size for Edit, small for confirmation)
- 카드 그리드: `auto-fill, minmax(180px, 1fr)` (모바일 자연 1열)
- 사이드바 배지: 기존 `hasPending` 패턴 재사용 (`#F59E0B` dot)
- 알림 이모지 금지 (memory `feedback_no_emoji_icons`)

## 12. 작업 분해 (예상 일수)

| 단계 | 작업 | 일수 |
|---|---|---|
| 5-1 | 모델 5 + association | 0.5 |
| 5-2 | 마이그 스크립트 + 실행 | 0.5 |
| 5-3 | BG 라우트 3 파일 | 2 |
| 5-4 | Restaurant sync 라우트 + 기존 보강 | 1 |
| 5-5 | 사이드바 재구성 | 0.5 |
| 5-6 | BG Brand Menus + Edit 모달 | 2 |
| 5-7 | BG Categories + Option Groups | 1.5 |
| 5-8 | RA Brand Menu Updates 페이지 | 1 |
| 5-9 | RA MenuManagement 잠금 표시 + 배지 | 1 |
| 5-10 | i18n 4 lang | 0.3 |
| 6 | 테스트 + 검증 | 1 |

**총 ~11일** (1명 기준)

## 13. 구현 결과 (2026-05-14, v3.32-dev 완료)

설계대로 구현 완료. 단일 세션 (1일) 마무리. E2E 21/21 + health-check 80/80 PASS.

### 설계 대비 변경사항

| 항목 | 설계 | 구현 | 비고 |
|---|---|---|---|
| `brand_menu_link_status` ENUM | `('in_sync','pending_update','unlinked')` | 동일 (3 값) | `never_synced` 는 product row 없는 경우의 UI 가상 상태 — DB 컬럼은 NULL |
| BG 라우트 POST locks 파라미터 | flat `lock_name`/`lock_price` 등 | flat + nested `locks: {}` 둘 다 수용 | 프론트는 nested 형식 사용 |
| OptionGroup 컬럼 매핑 | `is_required`/`min_select`/`max_select` | restaurant 측은 `required`/`multiple` (booleans) | sync service 가 매핑 처리 |
| API 응답 shape | `data: {...}` | `data: { menu, push }` (POST), `data: { categories, items }` (GET menu), `data: { brand, pending_count, items }` (GET updates) | 일관성 위해 일부 wrapping 추가 |
| PUT /brand-menus/:id | parseInt | + `Number.isFinite(id)` 가드 | NaN 시 400 (verification 단계에서 발견) |

### 라이브 검증 결과

- **E2E 21 케이스**: Anonymous 401, RA blocked 403, BG IDOR 403, invalid id 400, push + product row 생성, lock snapshot 저장, locked field 수정 차단 (PRODUCT_FIELD_LOCKED_BY_BRAND), unlocked field 수정 허용, soldOut 항상 허용, RA cross-restaurant 403, version bump propagation, pending_update 표시, sync 후 in_sync 복귀 — 모두 PASS.
- **health-check**: 80/80 PASS.
- **빌드**: main.c679b6ef.js, lazy chunk 4개 (3398, 9121, 8858, 9161) 모두 nginx 200.
- **State hydration**: 0 warning.

---

## 14. 레스토랑 적용 범위 (Scope) — ✅ 구현 완료 (2026-06-15, DEV 미배포)

> **구현 요약(2026-06-15)**: 마이그 `scripts/migrations/add_brand_menu_scope.sql`(products.brand_scope_active + brand_menus.scope_mode + brand_menu_restaurants 테이블, 멱등) · 모델 `BrandMenuRestaurant` + BrandMenu.scope_mode + Product.brand_scope_active + index.js association · 서비스 `brandMenuSyncService`(resolveScopeTargetIds / applyScopeToBrandMenu(refreshMode) / setBrandMenuScope / syncAllScopedMenusToNewRestaurant, sync 시 brand_scope_active 복원) · 라우트 `brand-menus.js`(create scope 시드+reconcile, PUT scope-aware, GET·PUT /:id/scope, push 범위제약 OUT_OF_SCOPE, distribution+settings default_scope) · 노출게이트 menu.js(POS/관리) + mobile-public.js 4곳(`brand_scope_active:true`) · 신규매장 훅 restaurants-crud.js · 프론트 BrandMenusPage(ScopePickerModal + 카드 Scope 버튼/배지 + 설정탭 default_scope).
> **검증**: 실API 21/21(§14.7 전 시나리오 + 모바일게이트 + distribution/scope + 보안 cross-brand 403/anonymous 401) · build 0 TS err · health 101/101 · print-guard 8/8 무접촉 · state-hydration 0 · 타임존 신규 0 · i18n 0 err · 게이트 부작용 0(128상품 전부 노출) · **실브라우저 클릭-스루 PASS**(Scope 버튼→모달→All/Selected→매장 체크박스 5→Save→PUT /scope 200→영속 확인, `/pos/brand-menus`) · BG mount 21/21. 배포 시 `add_brand_menu_scope.sql` 선적용 필수.
> **검증 도구 수정(2026-06-15)**: headless-page-sweep 가 빈 렌더(React #root 자식 0 = 잘못된 라우트/무음 mount 실패)를 EMPTY_RENDER 로 잡도록 하드닝(기존엔 빈 바디를 "OK" 오판). BG_ROUTES 의 stale 경로 13개를 실제 App.tsx 라우트로 교정(brand-menus = `/pos/brand-menus`). 이전 "BG 23/23 OK"는 다수가 빈 렌더 false positive 였음.

### 14.0 (원 설계 — 2026-06-13)

> Irene 요청: BG 브랜드메뉴가 레스토랑마다 적용/미적용될 수 있어야 함. 예) 레스토랑1=본사 직영점 → 신메뉴 먼저 시도, 다른 가맹점엔 그 메뉴 없음. "제외 기능 vs 연결 기능" 중 판단 요청.

### 14.1 판단: **연결(opt-in allowlist) 방식** (제외 아님)

실측 결과 현재 시스템은 **이미 연결 방식**이다 — 브랜드메뉴는 **push한 레스토랑에만** Product(`brand_menu_id` FK)로 생성되고, 안 한 매장엔 아예 없다. push 대상 = `restaurant_ids: "all" | [ids]`. 즉 "직영점만 먼저"는 이미 가능(직영점에만 push). 이 위에 **선언적 범위 관리**를 정식화한다.

| | 연결(opt-in) — 브랜드 채택 | 제외(default-all) — 푸드코트 방식 |
|---|---|---|
| 기본 | 아무 매장에도 없음, BG가 넣을 곳 선택 | 전 매장에 깔림, 뺄 곳 선택 |
| 신메뉴 위험 | 선택한 곳에만 → 실험 격리(안전) | 전 가맹점 자동 노출(위험) |
| 적합 | **브랜드**(매장마다 메뉴 다름 = 정상) | 푸드코트(공통 메뉴 풀) — `FoodcourtProductRestaurant` |

→ 브랜드는 연결 방식이 자연스럽고 안전. 푸드코트의 제외 방식은 그 도메인에 맞는 별개 설계.

### 14.2 활성/비활성(RA) vs 적용범위(BG) — 명확 분리

| 층위 | 주체 | 의미 | 필드 |
|------|------|------|------|
| **적용 범위** | **BG(본사)** | 이 메뉴를 이 매장에 **줄지/뺄지** | `BrandMenu.scope_mode` + `brand_menu_restaurants` allowlist → `Product.brand_scope_active` |
| **활성화** | **RA(매장)** | 받은 메뉴를 **팔지/품절** | `Product.is_active` |

POS/모바일 노출 = `brand_scope_active(BG) AND is_active(RA)`. 두 권한이 안 겹친다. BG가 범위에서 빼면 RA가 못 켠다(숨김 유지).

### 14.3 스키마 (제안)

```sql
-- BrandMenu: 범위 모드
ALTER TABLE brand_menus
  ADD COLUMN scope_mode ENUM('all','selected') NOT NULL DEFAULT 'all';
  -- 'all'     = 산하 전 레스토랑 자동 대상
  -- 'selected'= 아래 allowlist 에 든 레스토랑만

-- selected 일 때 대상 allowlist (FoodcourtProductRestaurant 선례 동일 패턴)
CREATE TABLE brand_menu_restaurants (
  id INT PK AI,
  brand_menu_id INT NOT NULL,   -- FK brand_menus
  restaurant_id INT NOT NULL,   -- FK restaurants
  UNIQUE (brand_menu_id, restaurant_id),
  KEY (restaurant_id)
);

-- Product: BG 범위 가시성(활성화와 분리)
ALTER TABLE products
  ADD COLUMN brand_scope_active BOOLEAN NOT NULL DEFAULT true;
  -- true=범위 안 / false=BG가 범위에서 뺌(숨김+보존, RA is_active 무관하게 비노출)

-- Brand: 새 메뉴 기본 범위 모드 (Irene 확정: 브랜드별 기본모드 설정)
-- Brand.menu_settings(JSON) 에 default_scope: 'all'|'selected' 추가
```

### 14.4 동작 (Irene 2026-06-13 확정)

- **새 메뉴 기본 범위** = `Brand.menu_settings.default_scope` (BG가 자기 브랜드 철학 선택: 균일 브랜드='all', 직영점-실험형='selected'). 메뉴 생성 시 그 값을 `scope_mode`에 시드.
- **범위에 매장 추가** → `brandMenuSyncService.syncBrandMenuToRestaurant` 호출(Product 생성/`brand_scope_active=true`). 이미 retract됐던 매장이면 `brand_scope_active=true`로 복원.
- **범위에서 매장 제거 = 숨김+보존**(확정): Product 삭제하지 않고 `brand_scope_active=false`로 숨김. 과거 주문 이력/RA 로컬 편집(가격 등) 보존. 나중에 다시 넣으면 복원.
- **scope_mode='all'**: 산하 신규 매장이 생기면 자동 대상(기존 push-all 흐름). `'selected'`면 allowlist 변화로만 대상 변동.
- **버전 동기화(version bump)**: 현재 linked Product 전체 대상 그대로 — `brand_scope_active=false`(retracted) 매장은 보존만 하고 노출/재동기 제외(또는 복원 시 최신 동기).

### 14.5 UI (BG)

- 브랜드메뉴 편집/distribution 화면에 **"적용 매장(Scope)"** 컨트롤: `전체` / `지정` 토글 + 지정 시 산하 매장 체크리스트(현 `/push` 대상 선택 UI를 선언적 범위로 승격).
- 브랜드 설정에 **"새 메뉴 기본 범위"** (전체/지정) — `menu_settings.default_scope`.
- distribution 표에 매장별 상태: 범위밖 / 범위안·미동기 / in_sync / pending_update / RA 비활성.

### 14.6 영향/파일 touch list (구현 시)

| 영역 | 파일 | 변경 |
|------|------|------|
| 모델 | `models/BrandMenu.js`(scope_mode), 신규 `models/BrandMenuRestaurant.js`, `models/Product.js`(brand_scope_active), `models/Brand.js`(menu_settings.default_scope) | + 멱등 마이그 |
| 전파 | `services/brandMenuSyncService.js` | scope 추가=sync / 제거=retract(scope_active=false) |
| 라우트 | `routes/brand-menus.js` | scope CRUD(전체/지정+allowlist), distribution 응답에 scope 상태 |
| 노출 게이트 | 메뉴 조회(POS/모바일/menu.js) | `brand_scope_active AND is_active` 필터 |
| UI | BG 브랜드메뉴 화면 + 브랜드 설정 | 적용매장 선택 + 기본범위 |

### 14.7 검증 시나리오 (구현 후)

1. default_scope='selected' 브랜드: 새 메뉴 → 아무 매장에도 안 깔림.
2. 직영점1만 범위 추가 → 1에만 Product(scope_active=true), 2·3엔 없음.
3. 직영점1 RA 활성(is_active=true) → 1 메뉴판 노출 / 2·3 미노출.
4. 가맹점2 범위 추가 → 2에 생성(is_active=false 대기), RA 활성해야 노출.
5. BG가 2를 범위 제거 → 2에서 숨김(Product 보존, 주문이력 유지), 재추가 시 복원.
6. scope='all' + 신규 매장 생성 → 자동 대상.
7. 노출 = scope_active AND is_active 교집합 확인(둘 중 하나라도 false면 비노출).
