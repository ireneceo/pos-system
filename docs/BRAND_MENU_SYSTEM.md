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

---

## 매장 메뉴를 브랜드로 «역으로 올리기» (adopt) — 2026-09-13 신설

### 왜 생겼나
K-DINE IPC(운영 매장8)의 메뉴 105개가 **브랜드와 연결되지 않은 매장 독립 메뉴**였다(실측: `products.brand_menu_id` 0건 ·
`brand_menu_synced_at` 0건 · `brand_menu_link_status` 전부 빈값). 브랜드(K-DINE with MIN, brand 2)에는 브랜드 메뉴가 0건이라
고쳐도 매장에 내려가지 않고 가맹점에 뿌릴 원본도 없었다. 일간(9/5~9/13)·주간(W33~W37) 백업 전부 브랜드 4·5·10 만 갖고 있어
**과거에 존재했다가 지워진 것이 아니라 처음부터 없었던 것**으로 확인됐다.

### 도구
`dev-backend/scripts/adopt-restaurant-menus-to-brand.js` — push 의 **역방향**. 기본은 미리보기, `--apply` 로 반영.

| 모드 | 하는 일 |
|---|---|
| (기본) | 매장 카테고리→브랜드 카테고리, 매장 상품→브랜드 메뉴 생성 후 **1:1 연결** |
| `--fix-shared` | 같은 이름 상품이 브랜드 메뉴 하나를 공유하게 된 경우 **갈라서 1:1** 로 |
| `--options` | 매장 옵션그룹·옵션을 브랜드 옵션으로 올리고 메뉴마다 연결 |
| `--undo <스냅샷>` | 만든 브랜드 행 삭제 + 매장 연결 칸 원복 |

### 대응 규칙 (push 의 `syncBrandMenuToRestaurant` 와 대칭)
`name→name` · `price→recommended_price` · `category(번호)→카테고리 이름→brand_menu_categories` · `image→image_url` ·
`emoji→emoji` · `display_order→sort_order` · `after_meal`·`set_only`·`is_set_menu`·`set_items`·`recipe_id`·`product_recipe_id` 동일 ·
옵션은 `required→is_required` · `multiple→max_select>1` · `price→extra_price` · `displayOrder→sort_order`.

### 지켜야 할 것
- **매장 데이터는 바꾸지 않는다** — 이름·가격·옵션·활성 그대로. 연결 칸(`brand_menu_id`·`synced_*`·`link_status`)만 채운다.
- **잠금은 전부 false** — 매장이 하던 대로 계속 고칠 수 있어야 한다.
- 같은 매장에 **이름이 같은 상품**이 있으면 브랜드 메뉴를 공유하게 된다(→ 브랜드 수정이 두 상품에 동시 반영). 반드시 `--fix-shared` 로 1:1 을 만든다.
- 2026-09-13 운영 실행 결과: 브랜드 메뉴 105 · 카테고리 14 · 옵션그룹 7(옵션 12) · 메뉴↔옵션 38 · 매장 상품 105 전부 1:1(공유 0 · 끊김 0).

### 접근 권한 함정 (화면이 비어 보이는 진짜 이유)
브랜드 메뉴·카테고리·옵션 화면은 `middleware/brandScope.js` 가 `req.bgOwnerId = user.id` 로 두고
**`brands.owner_id === 로그인 사용자 id`** 일 때만 연다(`Brand not owned` 403). 운영 브랜드 1·2 의 소유자는
`help@gitconsulting.group`(user 23)이며, 같은 회사의 다른 계정(`irene@gitconsulting.group`, user 11)으로는 **데이터가 있어도 403**이다.
한 브랜드를 여러 계정이 관리하려면 별도 작업(브랜드 다중 소유)이 필요하다.

---

## 다음 섹션 접수: 브랜드 메뉴 ↔ 브랜드 레시피 연결 표시 + 매장 전파 (2026-09-13 Irene 지시 · 착수 안 함)

> Irene 원문: **「브랜드메뉴에 브랜드레시피 연결하면 어떤 레시피가 연결되었는지 표시되게 해줘.
> 그리고 이건 그대로 브랜드 레스토랑에 반영되어야 하는 거야. 레시피에 들어가는 재료 가격은 따로
> 레스토랑이 관리할 수 있지만 재료 자체는 그대로 두는 거고, 공급업체 연결은 자유롭게.」**

요구 4가지 (그대로 옮김 — 해석해서 줄이지 말 것):
1. **브랜드 메뉴 화면에 «연결된 레시피 이름» 이 보여야 한다.** 지금은 연결해도 무엇이 붙었는지 화면에 안 나온다.
2. **그 연결은 브랜드 산하 매장에 그대로 내려가야 한다** — 매장 상품도 같은 레시피에 연결된 상태가 된다.
3. **재료 자체는 브랜드 것을 그대로 쓴다** — 매장이 재료를 바꾸거나 갈아 끼우지 않는다.
4. **재료의 «가격» 은 매장이 따로 관리한다.** 그리고 **공급업체 연결은 매장이 자유롭게** 붙인다.

착수 전 확인해야 할 실측 (아직 재지 않았다):
- `brand_menus.recipe_id` 는 이미 있고 push 시 매장 `products.recipe_id` 로 상속된다(`services/brandMenuSyncService.js`).
  **화면 표시만 없는 것인지**, 아니면 브랜드 레시피(`recipes` owner_type='brand')와 매장 레시피가 갈라지는지부터 확인.
- 레시피는 2계통이다 — [[reference_two_recipe_systems]]. 어느 계통을 브랜드 메뉴에 붙이는지 못 박아야 한다.
- 원가는 2경로다 — [[reference_cost_two_paths]]. «재료는 공유, 가격은 매장별» 이 지금 구조에서 어디에 저장되는지(매장 재고아이템 단가 vs 브랜드 재료 단가) 확인 필요.
- 공급업체 연결(`ingredient_seller_products`)이 매장별로 따로 설 수 있는지.

**정정 (2026-09-14 실측 — 앞 문단의 «착수 전 확인» 중 3·4번은 이미 답이 있었다):**
팀원이 2026-09-13 에 «가격은 매장 · 재료는 브랜드는 지금 구조에 담을 칸이 없다» 고 적었던 것은 **틀렸다**.
`ingredients.unit_cost` 한 층만 보고 단정한 것이며, 아래는 운영 DB·코드에서 다시 읽은 값이다.

| 요구 | 실제 자리 | 운영 행수(2026-09-14) |
|---|---|---|
| 재료는 브랜드 것을 공유 | `ingredients.source_product_ingredient_id` / `source_brand_product_id` 거울 (거울 수정은 403) | 158 |
| 가격은 매장이 따로 | **매장 원가층 `restaurant_ingredient_costs`** — 코드 `routes/recipes.js` `withOverrideCost`(98행)·`effective_ingredient_cost`(551행), 매장 층이 비면 브랜드 층 폴백 | 77 |
| 공급업체 연결은 자유롭게 | `ingredient_seller_products` — 매장은 `ingredient_id`, 브랜드는 `product_ingredient_id`. 붙이는 경로 `routes/ingredient-seller-products.js:185` | 831 |
| 공유 재료의 매장 재고 | `restaurant_ingredient_stocks` (매장별 오버레이) | 159 |

→ ③④는 **새로 설계할 것이 아니라**, 브랜드 레시피가 매장에 내려간 뒤 그 두 층이 실제로 쓰이는지 **실호출로 확인할 일**이다.
아직 확인 못 한 것(= 확인 불가로 표시): 매장 화면에서 «브랜드 레시피의 재료 가격»을 직접 넣는 흐름이 있는지, 그 값이 매장 층에 저장되는지.
단일 진실 지도: 사내 구조 지도 아티팩트(2026-09-04 → 09-11) · `docs/TRADE_STRUCTURE.md`

---

## 매장↔브랜드 양방향 공유 · 공유 모드 설정 — 2026-09-16 Irene 지시 (Fable 판정 대기 · 착수 안 함)

> 이 절은 **사실만** 적는다. 설계 판단·우선순위·권고는 Fable 몫.
> 측정일 2026-09-16, 운영 DB(purple_production_db) 읽기 전용 조회 + 개발 코드 실측.

### A. Irene 원문 (2026-09-16)

> 「브랜드메뉴를 변경해도 된다고 설정을 하면 서로 동기화되어서 다 들어오게 해줄래? 독립적으로 레스토랑에서 추가하면 그것도 들어와서 해당 레스토랑에서 추가한 걸 표시해줘. 관리가 되어야 하는데 서로 동기화해서 똑같이 사용하는게 운영이 원활할 것 같아. 모든 옵션과 메뉴를 공유하고 공유한 곳에서만 수정하고 추가는 못하게 하는 거로 하거나 추가도 하게 해서 공유하게 하거나 이런 설정을 두면 좋겠는데.」

앞선 지시(2026-09-13, 같은 문서 「adopt」 절): 「K-DINE IPC 메뉴가 모두 그대로 K-DINE with MIN 브랜드로 연결되고 BG 가 관리하는 형태가 되게 해.」

### B. 지금 코드에 있는 것 / 없는 것 (실측)

**방향**
- 브랜드 → 매장 push 는 `services/brandMenuSyncService.js`(586줄) 하나로 단일화돼 있다. 매장마다 별도 트랜잭션.
- **매장 → 브랜드 역방향은 라우트·서비스에 0건.** 일회성 스크립트 `scripts/adopt-restaurant-menus-to-brand.js`(2026-09-13, 멱등·되돌리기 지원)만 있고 어떤 라우트도 이를 호출하지 않는다.

**이미 있는 설정 3종 (전부 «메뉴 1개» 단위)**
| 칸 | 값 | 의미 |
|---|---|---|
| `BrandMenu.distribution_mode` | `auto` / `manual` | auto = 생성·수정 시 산하 매장에 즉시 push |
| `BrandMenu.scope_mode` | `all` / `selected` | selected = `brand_menu_restaurants` allowlist 매장만 |
| 잠금 7칸 | `lock_name` `lock_price` `lock_category` `lock_image` `lock_options` `lock_sort_order` `lock_set_items` | 잠긴 칸은 브랜드 값 강제 |

- 브랜드 단위 기본값을 담을 자리는 `Brand.menu_settings`(JSON, `models/Brand.js:303`)가 이미 있다.
- 잠금의 강제 지점은 `routes/menu.js:597~640` — 매장이 잠긴 칸을 바꾸면 400 `locked_fields`.

**동기화에서 누가 주인인가 (현행)**
- 항상 **매장 소유**(브랜드가 못 건드림): `soldOut` · `is_active` · 재고. 푸시된 메뉴는 **비활성 상태로 도착**한다.
- 항상 **브랜드가 덮어씀**(잠금과 무관): `is_set_menu` · `set_items` · `set_groups` · `set_only` · `emoji` · `description`.
- **매장이 비었을 때만 상속**: `recipe_id`(재고차감이 읽는 칸).
- **옵션은 잠금과 무관하게 항상 merge**(2026-06-28 Irene 지시): 매장 자체 옵션그룹(`brand_menu_option_group_id IS NULL`)은 보존, 브랜드 미러는 항상 포함. 잠금은 «브랜드 미러를 매장이 빼는 것»만 막는다.
- 요금제 메뉴 개수 제한은 `brand_menu_id IS NULL`(매장 자체분)만 센다(2026-06-17).

**표시**
- 매장 화면은 `brand_menu_id` · `brand_menu_locks_snapshot` · `brand_menu_synced_version` · `brand_menu_link_status` 를 받는다(`routes/menu.js:324~327`).
- **브랜드 쪽에서 «이 매장이 추가한 것» 을 볼 경로는 없다** — 브랜드 화면은 `brand_menus` 만 읽고, 매장 자체 상품(`brand_menu_id IS NULL`)은 조회 대상이 아니다.

> **⚠ 2026-09-17 Fable 판정 §1 — 위 B 절 정정 2건**
> 1. 「`Brand.menu_settings` 자리는 비어 있다」는 **반쯤 틀림**. 기제는 이미 있다 — `routes/brand-menus.js:57 mergeMenuSettings` 가 브랜드 기본값 5칸(`default_distribution_mode` · `default_locks` 5개 · `default_push_target` · `default_scope` · `enforce_menu_order`)을 읽고 쓰며 메뉴 생성(`:318`)에 시드한다. `enforce_menu_order` 는 저장 시 산하 전 메뉴의 `lock_sort_order` 를 일괄 갱신하는 **「브랜드 설정이 기존 메뉴 전체에 적용되는」 선례**다. 운영 DB 에 값이 실제로 null 인지는 **확인 불가**. → 새 설정은 이 JSON 에 칸 하나를 더하는 것이지 새 자리를 만드는 게 아니다.
> 2. **잠복 버그 — 문자열 `optionGroups` + 미러 = push 시 중복.** `Product.optionGroups` 는 getter 정규화 없음(`models/Product.js:36`). `syncBrandMenuToRestaurant` 갱신 경로는 `mirrorIds.has(id)`(숫자 Set)와 `merged.includes(id)` 로 비교하는데, 매장 8 처럼 `["73"]` 문자열이면 미러가 「매장 자체」로 오분류돼 보존되고 숫자 73 이 다시 추가돼 `["73",73]` 이 된다. 지금은 매장 8 의 옵션그룹이 전부 미러가 아니라 안 터졌고, **F-1 짝 맞추기를 하는 순간부터 매장 8 로의 모든 push 에서 터진다.** 짝 맞추기 전 필수 수정(String 기준 비교로 정규화).

### C. 운영 실측 수치 (2026-09-16)

**브랜드별 규모**

| 브랜드 | 매장 수 | 브랜드 메뉴 | 브랜드 옵션그룹/옵션 |
|---|---|---|---|
| 1 with MIN | 1 | **0** | 0 |
| 2 K-DINE with MIN | 1 | 104 | 6 / 11 |
| 4 K-Taste Group | 3 | 2 | 2 / 5 |
| 5 The Fire | 3 | 128 | 19 / 74 |
| 10 Seoul Kitchen Collective | 3 | 1 | 0 |
| 12 New brand | 0 | 0 | 0 |

**매장별 구성 (브랜드 소속 매장 전체)**

| 매장 | 브랜드 | 브랜드에서 내려온 메뉴 | 매장 자체 메뉴 | 옵션그룹 미러 | 옵션그룹 자체 |
|---|---|---|---|---|---|
| 10 with MIN Cafe | 1 | 0 | **227** | 0 | 44 |
| 8 K-DINE IPC Branch | 2 | 104 | 1 | **0** | 7 |
| 13 Seoul Garden BBQ | 4 | 2 | **30** | 2 | 6 |
| 14 Gangnam Noodle House | 4 | 1 | 10 | 1 | 0 |
| 19 Korean noodle | 4 | 1 | 2 | 1 | 0 |
| 16 / 24 / 25 The Fire | 5 | 128 각각 | 0 | 17 / 15 / 15 | 12 / 0 / 1 |

**배포방식·잠금 분포 (브랜드 메뉴 235건 전체)**

| distribution | scope | 건수 | 잠금 6칸 켜진 수 | 비고 |
|---|---|---|---|---|
| auto | all | 108 | 108 전부 | The Fire 계열 |
| manual | all | 21 | 18 | |
| auto | selected | 2 | 2 | |
| manual | selected | **104** | **0** | 브랜드 2 — adopt 스크립트 산출물(잠금 전부 false) |

- `brand_menu_restaurants` allowlist: 브랜드 2 가 104행(매장 1곳), 브랜드 5 가 2행(매장 1곳).
- `link_status='pending_update'`: 매장 8·16·24·25 각 1건.

**옵션이 실제로 공유되고 있지 않다는 수치**
- 브랜드 2 에 브랜드 옵션그룹 6개·옵션 11개가 있으나 **매장 8 의 옵션그룹 7개는 전부 매장 자체**(미러 0).
- 매장 8 의 브랜드 연결 상품 **30개가 매장 자체 옵션그룹을 쓰고 있다**.

### D. 기계적 제약 (코드·운영 사실)

- `products` 는 주문·재고차감·인쇄가 읽는 표다. 매장 상품이 공유 원본이 되면 **한 매장의 수정이 다른 매장 주문에 닿는다**(브랜드 5 는 매장 3곳이 같은 128개를 쓴다).
- 역방향이 생기면 **매장의 삭제·이름 변경도 올라갈 수 있다** — 현행 adopt 스크립트는 «매장 상품의 이름·가격·옵션·활성여부는 바꾸지 않는다»를 명시적으로 지키고 잠금을 전부 false 로 만든다.
- 브랜드 2 의 104건은 잠금이 전부 꺼져 있어, 지금 «원본에서만 수정» 모드로 바꾸면 매장이 지금 하던 편집이 막힌다.
- 매장 10(브랜드 1)은 브랜드 원본이 0건이라 «공유» 를 켜려면 227건을 먼저 브랜드로 올려야 한다.
- 2026-09-16 조사에서 나온 별건(같은 브랜드 2): 재료 든 브랜드 레시피 21건이 어떤 메뉴에도 안 붙음 · 메뉴에 붙었으나 재료 0인 레시피 8건 · 브랜드 메뉴 이름 중복 8쌍(VEGE JAMPONG RAMEN 5개 등) · 매장 8 옵션 12개 전부 재료 연결 0.
- 이 세션의 코드 변경 0건. 운영 DB 는 SELECT 만 했다.

### E. Irene 이 말한 두 모드 (원문 그대로 옮김 · 해석 없음)

- ⓐ 「모든 옵션과 메뉴를 공유하고 **공유한 곳에서만 수정하고 추가는 못하게** 하는 거」
- ⓑ 「**추가도 하게 해서 공유하게** 하거나」
- 공통 요구: 「독립적으로 레스토랑에서 추가하면 그것도 들어와서 **해당 레스토랑에서 추가한 걸 표시**」

### F. 검토표 — 판정 없이 뽑은 미리보기 (2026-09-16, 데이터 무변경)

> Fable 판정이 한도(429)로 계속 미수령이라, **판단이 필요 없는 부분만** 먼저 측정했다.
> 방법: 운영서버에서 `scripts/adopt-restaurant-menus-to-brand.js` 를 **`--apply` 없이**(쓰기 코드는 전부 종료 지점 뒤) + 운영 DB SELECT.
> ⛔ 아무것도 반영하지 않았다. 아래는 «지금 돌리면 무엇이 생기는가» 의 미리보기다.

#### F-1. K-DINE(브랜드 2 ← 매장 8) 옵션 짝

매장 옵션그룹 7개 중 **6개는 브랜드에 같은 이름이 이미 있다**(연결 칸만 비어 있음). 새로 만들 것은 1개.

| 매장 옵션그룹 | 옵션 수 | 이 옵션을 쓰는 매장 메뉴 | 브랜드 쪽 같은 이름 |
|---|---|---|---|
| 111111 | 1 | **0개** | 없음 (새로 생김) |
| Fried Chicken Flavor | 3 | 4 | 있음(47) |
| Additional for Tteokbokki | 1 | 8 | 있음(48) |
| Vegan option | 3 | 11 | 있음(49) |
| Tea option | 2 | 2 | 있음(50) |
| No Egg | 1 | 11 | 있음(51) |
| Change Meat | 1 | 2 | 있음(52) |

- 브랜드 옵션그룹 6개(47~52)의 옵션 수는 매장 쪽과 **전부 일치**한다. 즉 내용은 같고 **연결만 끊겨 있다**(`option_groups.brand_menu_option_group_id` 전부 NULL).
- 브랜드 메뉴↔옵션그룹 연결은 이미 38건 있다. 미리보기도 38건으로 같다(멱등).
- 매장 상품의 `optionGroups` JSON 은 숫자가 아니라 **문자열**로 저장돼 있다(`["73"]`). 가리키는 곳이 없는 번호는 0건.
- 미연결 매장 메뉴 1건: **id 362 「Kimchi Jjigae (S)」 가격 0.00 · 활성**.

#### F-2. with MIN Cafe(브랜드 1 ← 매장 10) 227건 올리기 미리보기

브랜드에 원본이 **0건**이라 전부 새로 생긴다.

| 항목 | 수 |
|---|---|
| 만들 브랜드 메뉴 | **227** (기존 이름 재사용 0) |
| 만들 브랜드 카테고리 | **23** (이름 기준으로 합쳐짐 — 두 벌 안 생김) |
| 만들 브랜드 옵션그룹 | **44** · 옵션 90 |
| 메뉴↔옵션그룹 연결 | **0** ← 브랜드 메뉴가 아직 0건이라 |

**순서 제약(측정됨):** 옵션 단계를 먼저 돌리면 연결이 0건으로 끝난다. **메뉴 → 옵션 순서**라야 붙는다.

**사람이 정해야 하는 것 4가지 (그대로 올리면 브랜드에 따라 들어감):**
1. 이름 중복 1쌍 — 「Bulgogi」 id 122(활성) · id 139(비활성)
2. 가격 0원 1건 — id 214 「Red Bean Bingsu with RM1 for orders over RM100」
3. 비활성 4건 — 그대로 올릴지
4. 옵션그룹 이름이 44개 중 겹치는 것 5쌍 — 「Meal - Spicy Level」×2 · 「Additional Option - Egg」×2 · 「Extras Optional」×2 · 「Lunch : Drink」×2 · 「Pancake - Spicy Level」/「Pancake - Spicy Level 2」. **카테고리와 달리 옵션그룹은 이름으로 합치지 않는다**(44개를 그대로 만든다).

**분류별 내역 (27줄 중 4줄은 분류를 이름으로 저장 — 합쳐짐):** Vegetarian 23 · Coffee & Latte 16 · Special Drink & Ade & Juice 16 · Tea 15 · SET 13 · Meal 12 · Shop 11 · Side 11+1 · Alcoholic Beverages 10+2 · Special Korean Tea 9 · Main Dish 8+5 · Lunch(~2pm) 8 · Tteokbokki 8 · Dessert 8+1 · Noodle 7 · Bingsu 7 · Sandwich & Salad 7 · À La Carte 7 · Extra Charges 5 · Soup 5 · Fried rice 5 · Other 4 · Pancake 3. 총 227건 중 옵션이 붙은 것 146건.

---

> 🔴 **2026-09-17 Irene 방향 전환으로 아래 판정의 §3-1·3-2·3-3 과 Phase 2 는 폐기됐다.**
> Irene 원문: 「레스토랑 정보를 기준으로 제대로 맞춰서 수정해. 브랜드제너럴에서는 브랜드메뉴 달라져도 돼.
> 지금은 레스토랑 기준이 맞아. 그리고 브랜드레시피만 브랜드제너럴 기준으로 절대 건드리지 마.」
> **살아 있는 것**: §1 정정 2건(menu_settings 기제·문자열 optionGroups 잠복버그) · §3-4 의 `origin_restaurant_id` 와
> «매장 자체 메뉴» 읽기 경로. 대체 판정은 이 절 **바로 뒤**의 「[Fable 판정] 방향 전환」 절이다.
> 본문은 «왜 그렇게 정했다가 바뀌었는가»를 남기려고 지우지 않고 그대로 둔다.

## [Fable 판정] 매장↔브랜드 양방향 공유 · 공유 모드 설정 (2026-09-17)

> Fable 보고 **원문 그대로**. 팀원(Opus)이 가공하지 않았다.

### 0. 호출 조건 판정
성립. A(파급) 큼 — `products` 는 주문·재고차감·인쇄가 읽는 표이고 The Fire 는 매장 3곳이 같은 128건을 씀. C(분기) 갈림 — «원본이 어디인가(브랜드 표 vs 매장 표)», «매장 수정이 형제 매장에 닿는가», «매장 삭제가 브랜드에 닿는가» 는 데이터로 정해지지 않는 설계 선택. 이번이 설계 판정 1회. 구현 후 게이트 판정 1회 남음. 구현 중 세부는 팀원이 정하고 결과에 붙여 보고.

### 1. 검토자료 정정 2건 (문서 B 절, 코드 실측)
1. **«Brand.menu_settings 자리는 비어 있다» 는 반쯤 틀림.** 기제는 이미 있다 — `routes/brand-menus.js:57 mergeMenuSettings` 가 브랜드 기본값 5칸(`default_distribution_mode` · `default_locks` 5개 · `default_push_target` · `default_scope` · `enforce_menu_order`)을 읽고 쓰며, 메뉴 생성(`:318`)에 시드한다. `enforce_menu_order` 는 저장 시 산하 전 메뉴의 `lock_sort_order` 를 일괄 갱신하는 **«브랜드 설정이 기존 메뉴 전체에 적용되는» 선례**다. 운영 DB 에 값이 실제로 null 인지는 확인 안 됨(확인 불가 표기). → 새 설정은 이 JSON 에 칸 하나를 더하는 것이지 새 자리를 만드는 게 아니다.
2. **잠복 버그 — 문자열 optionGroups + 미러 = push 시 중복.** `Product.optionGroups` 는 getter 정규화 없음(`models/Product.js:36`). `syncBrandMenuToRestaurant` 갱신 경로는 `mirrorIds.has(id)`(숫자 Set) 와 `merged.includes(id)` 로 비교하는데, 매장 8 처럼 `["73"]` 문자열이면 미러가 «매장 자체» 로 오분류돼 보존되고 숫자 73 이 다시 추가돼 `["73",73]` 이 된다. 지금은 매장 8 의 옵션그룹이 전부 미러가 아니라 안 터졌고, **F-1 짝 맞추기를 하는 순간부터 매장 8 로의 모든 push 에서 터진다.** 짝 맞추기 전 필수 수정(String 기준 비교로 정규화, 단일 경로·소규모).

### 2. Irene 원문 → 요구 (해석 최소)
- R1. 브랜드 단위 «공유 모드» 설정.
- R2. 모드 ⓐ: 모든 메뉴·옵션 공유, 수정은 브랜드에서만, 매장 추가 불가.
- R3. 모드 ⓑ: 매장 추가 허용, 추가한 것은 공유(브랜드·형제 매장에 들어감).
- R4. 매장이 추가한 것은 브랜드에서 «어느 매장이 추가했는지» 표시.
- R5. 「서로 동기화되어서 다 들어오게」 — 공유 메뉴를 매장에서 고칠 수 있게 설정하면 그 수정이 전체에 반영.

### 3. 설계 판정

**3-1. 원본은 항상 `brand_menus` 하나. 전파 경로는 기존 push 하나. 매장↔매장 직접 동기화(멀티마스터)는 만들지 않는다.**
매장에서의 «추가·수정» 은 브랜드 표에 쓰는 **입구**일 뿐이고, 퍼지는 것은 기존 `brandMenuSyncService` 가 한다(위→아래). 이유: `products` 는 주문·재고·인쇄가 읽는 표라 두 매장이 서로 덮어쓰는 구조는 인쇄 단일경로 결정과 같은 이유로 금지. 이 원칙이 서면 R5 「서로 동기화」 도 «매장 수정 → 브랜드 반영 → 전 매장 push» 로 충족된다.

**3-2. 설정: `Brand.menu_settings.sharing_mode` 3값 (기존 JSON 에 칸 추가, 마이그 없음)**

| 값 | 뜻 | 누구에게 |
|---|---|---|
| `off` (기본) | 지금 그대로. 역방향 없음, 매장 자체 메뉴 자유 | 기존 전 브랜드(with MIN 227건·K-Taste 30건이 그대로 살아야 함) |
| `brand_only` (ⓐ) | 브랜드가 유일 편집처. 매장은 판매 여부만 | 균일 브랜드 |
| `store_can_add` (ⓑ) | 매장 추가·수정이 브랜드로 올라가 전 매장에 퍼짐 | 직영 위주 브랜드 |

모드를 켜면 **기존 메뉴 전체에 일괄 적용**(`enforce_menu_order` 선례): `distribution_mode=auto` · `scope_mode=all` · 잠금 5칸 true(ⓐ) 를 산하 `brand_menus` 에 일괄 갱신. ⓑ 도 배포는 auto·all 로 고정하되 잠금은 브랜드 기본값을 따른다(매장 입구가 브랜드 표를 고치므로 잠금은 «매장 로컬 갈라짐 방지» 용으로 켜는 것을 권고).

**3-3. 모드별 규칙표 (매장 쪽 동작)**

| 매장 동작 | off | brand_only ⓐ | store_can_add ⓑ |
|---|---|---|---|
| 자체 상품 추가 (`POST /menu/product`) | 허용(자체) | **403 `STORE_ADD_BLOCKED_BY_BRAND`** | 허용 → 즉시 브랜드 메뉴 생성(`origin_restaurant_id`=이 매장) + 자기 상품 연결 + 형제 매장 push(비활성 도착, 기존 정책) |
| 자체 옵션그룹 추가 | 허용 | **403** | 허용 → 브랜드 옵션그룹 생성 + 미러 연결 |
| 연결 상품의 브랜드 소유 칸 수정(name·price·category·image·options·set) | 잠금 따라 | 400(잠금) | **브랜드 표에 쓰기(version++) → auto push** — 매장 표를 직접 안 고침 |
| 매장 소유 칸(soldOut·is_active·stock·kitchen_station·is_featured·thumbnail) | 매장 | 매장 | 매장 (**절대 안 올라감**) |
| 연결 상품 삭제 | soft unlink(현행) | 403 | **그 매장에서만 unlink/숨김. 브랜드 행은 BG 만 삭제** — 한 매장이 형제 매장 메뉴를 지우는 경로 차단 |
| 요금제 개수 제한 | `brand_menu_id IS NULL` 만 | 자체 0 이라 무관 | 올라간 순간 연결되므로 세지 않음 — **브랜드 요금제로 세야 함(구현 시 확인·보고)** |

**3-4. R4 표시**: `brand_menus.origin_restaurant_id INT NULL` 1칸(멱등 마이그 + 레지스트리). 브랜드 화면 목록에 «매장 X 추가» 배지. 추가로 `off` 모드 브랜드를 위해 브랜드 화면에 읽기 전용 «매장 자체 메뉴» 탭(`products.brand_menu_id IS NULL` 을 매장별로 조회) — 지금 없는 경로이며 Irene 의 「그것도 들어와서 표시」 의 읽기 부분을 모드와 무관하게 충족.

### 4. 절단면 (단계) — 되돌리기 쉬운 순서
- **Phase 0 (운영 데이터 준비, 코드 최소)**: ① §1-2 문자열 정규화 수정 ② K-DINE 옵션 짝 맞추기(F-1, `--options --apply`, 6개는 연결만·「111111」은 소비 0건이라 제외) ③ with MIN Cafe 227건 adopt(F-2, 메뉴→옵션 순서) — ③ 은 Irene 결정 4건 뒤. 둘 다 `--apply` 전 스냅샷·`--undo` 경로 확인 필수. **이 단계는 sharing_mode 와 독립이며 `off` 인 채로도 가치 있음**(브랜드 원본이 생김).
- **Phase 1 (설정 + ⓐ + 표시)**: `sharing_mode` 칸 · 설정 화면 · 일괄 적용 · 매장 POST 2곳 가드 · `origin_restaurant_id` · 브랜드 «매장 추가분» 표시. 역방향 쓰기 없음 → 위험 낮음, dev 검증 후 배포 가능.
- **Phase 2 (ⓑ 역방향)**: 매장 POST → 브랜드 생성·연결·push / 매장 PUT → 브랜드 프록시 / 삭제 규칙. 돈·주문 무결성 접촉 → 구현 후 게이트 판정 1회(여기가 두 번째 호출).
- 한 세션에 Phase 0+1 까지. Phase 2 는 1 이 운영에서 굴러간 뒤.

### 5. Irene 컨펌 요청 (각각 Fable 권고 첨부)
1. **기존 브랜드 기본값 = `off`(지금 동작 유지)** — 권고: 예. with MIN Cafe 227건·K-Taste 30건 매장 자체 메뉴가 갑자기 막히면 안 됨.
2. **ⓑ 에서 매장 수정의 의미 = 브랜드 표에 쓰고 전 매장에 퍼짐(up-then-down)** — 권고: 예(원문 「서로 동기화」 「똑같이 사용」 과 일치). 대안 «추가만 올라가고 수정은 브랜드에서만» 은 원문의 첫 문장을 못 채움. 단 판매 여부·품절·재고·주방스테이션은 어느 모드든 매장 것.
3. **ⓑ 에서 매장 삭제 = 그 매장에서만 숨김, 브랜드 삭제는 BG 만** — 권고: 예. 한 매장이 형제 매장 메뉴를 지우는 사고 방지.
4. **Phase 0 데이터 결정 5건** — 권고: 「111111」 옵션그룹 제외 / Bulgogi 122·139 둘 다 올림(활성·비활성 그대로) / 0원 「Red Bean Bingsu…」 그대로 / 비활성 4건 그대로(브랜드 is_active=false) / 옵션그룹 이름 겹침 5쌍은 44개 그대로 1:1(내용이 다를 수 있어 합치지 않음, 정리는 나중에 브랜드 화면에서). 모두 «있는 그대로, 사람 손대기는 뒤에» 원칙.
5. **절단면 순서 Phase 0 → 1 → 2** — 권고: 예. 2 는 1 배포 후.

### 6. 팀원 지시
- 지금 코드 변경 없음. Irene 컨펌(§5) 오면 Phase 0 ① 부터. `--apply` 는 Irene 「배포」 와 같은 급으로 명시 지시 뒤에만.
- 문서 `docs/BRAND_MENU_SYSTEM.md` 2026-09-16 절 뒤에 이 판정을 **원문 그대로** 붙이고 §1 정정 2건을 B 절에 각주로 표시. 새 파일 만들지 않는다.
- 구현 중 생기는 세부(에러 코드 이름, 배지 문구, 탭 위치)는 팀원이 정해 결과에 붙인다. 되돌리기 어려운 것(마이그 칸 이름 `origin_restaurant_id`, 모드 값 3개 이름)은 위 그대로.
- 게이트 마커는 지금 찍지 않는다(코드 변경 0). Phase 2 구현 후 게이트 판정 때 찍는다.

---

## [Fable 판정] 방향 전환 — 「메뉴는 레스토랑 기준 · 브랜드 메뉴는 달라도 됨 · 브랜드 레시피는 브랜드 것」 (2026-09-17)

> Fable 보고 **원문 그대로**. 팀원(Opus)이 가공하지 않았다. 위 절의 §3-1·3-2·3-3·Phase 2 를 **대체**한다.

### 0. 호출 조건
성립. 사안이 실제로 바뀌었다 — 오늘 §3-1 「원본은 brand_menus 하나」 가 Irene 원문 「지금은 레스토랑 기준이 맞아」 로 뒤집혔다. 파급(A) 큼(`products` 는 주문·재고·인쇄가 읽는 표, The Fire 매장 3곳 128건 공유) · 길(C) 갈림(어느 조각을 남기고 어느 조각을 걷어내는가). 이것이 바뀐 사안의 **설계 판정 1회**. 게이트 판정 1회는 그대로 남는다.

### 1. Irene 원문을 내가 읽은 뜻 (해석 최소 · §5 에서 확인 요청)
- 「레스토랑 정보를 기준으로 제대로 맞춰서 수정해」 → **매장의 `products` 가 실제 판매의 주인.** 매장은 자기 메뉴를 자유롭게 추가·수정한다. 매장을 브랜드에 강제로 맞추는 장치를 만들지 않는다.
- 「브랜드제너럴에서는 브랜드메뉴 달라져도 돼」 → 브랜드 메뉴는 **브랜드의 원본 목록**이고, 매장 메뉴와 **달라도 된다**. 둘을 억지로 같게 맞추는 동기화(매장→브랜드 자동 반영, 형제 매장 전파)는 만들지 않는다.
- 「지금은 레스토랑 기준이 맞아」 → **현행 동작(`off` 상태) 유지.** 브랜드→매장 내려보내기(push)는 지금처럼 브랜드가 메뉴별로 골라서 하는 것.
- 「브랜드레시피만 브랜드제너럴 기준으로 절대 건드리지 마」 → 브랜드 레시피의 **소유·편집은 BG 만**, 매장은 읽어서 쓰기만. 레스토랑 기준으로 고치는 작업이 레시피에 번지면 안 된다. **실측: 이미 코드가 그렇다** — 매장 레시피 PUT/DELETE(`routes/recipes.js:737, 841`)는 `owner_type='restaurant'` 아니면 403. 변경 0.
- 「모두 UI/UX 에서 철저히 알기 쉽게 · 사용하기 바로 보면 알게」 → 화면마다 **「이건 누가 주인인가」** 가 한눈에 보여야 한다. 새 설정을 늘리는 것이 아니라 설명·배지를 넣는 것.

### 2. 판정 — 오늘 §3 중 무엇이 죽고 무엇이 사는가

**대체 원칙 (§3-1 폐기):** 「메뉴는 매장이 주인. 브랜드 메뉴는 브랜드의 목록이며 매장과 달라도 된다. 브랜드→매장은 지금처럼 브랜드가 골라 내려보낸다(push 단일 구현 유지). 매장→브랜드 자동 역방향은 없다. 브랜드는 매장 자체 메뉴를 **읽기만** 한다.」

| 오늘 만든 조각 | 판정 | 이유 |
|---|---|---|
| `sharing_mode` 3값 · `SHARING_MODES` · `applySharingModeToMenus`(잠금·배포 일괄 켜기) · 설정 탭 라디오 3택 | **제거** | ⓐ/ⓑ 모두 브랜드를 주인으로 세우는 장치. 죽은 설정을 화면에 남기면 「보면 알게」 에 정면으로 반함 |
| 매장 추가 가드 2곳(`routes/menu.js:483`, `routes/optionGroups.js:117`) + `utils/brandSharingMode.js` | **제거** | 「레스토랑 기준」 과 정면 충돌 |
| `brand_menus.origin_restaurant_id` 컬럼 · 마이그(deploy) · 브랜드 목록 「매장 X 가 만든 것」 표시 | **유지** | 레스토랑 기준 세계에서 브랜드 목록이 어느 매장에서 왔는지 보여 주는 유일한 표시. adopt 스크립트가 이 칸을 채우는지 팀원이 확인·보고 |
| `GET /api/brand-menus/store-own` (매장 자체 메뉴 읽기 전용) | **유지** | 「브랜드메뉴 달라져도 돼」 의 화면 근거 — BG 가 매장 실제 메뉴를 봐야 차이가 보인다. 쓰기 0 이라 원칙과 충돌 없음 |
| push 옵션 id String 비교 수정 | **유지** | 잠복 버그 수정, 방향과 무관 |
| 배송비 · 재료 카테고리 · 준비된 재고 | **유지** | 방향 전환과 무관. 준비 재료 스위치가 브랜드 레시피 POST/PUT 에 붙은 것은 **BG 가 자기 레시피에 켜는 것**이라 「브랜드제너럴 기준」 과 일치. body 에 칸 없으면 무동작(기존 72건 변화 0) 확인됨 |
| Phase 0 매장→브랜드 일회성 올리기 (K-DINE 옵션 짝 F-1 · with MIN 227건 F-2) | **보류 → §5-4** | 방향 자체는 「매장 데이터가 원본」 이라 맞지만, 올린 뒤 push 로 브랜드가 매장을 덮는 길이 생기므로 **잠금 전부 false · distribution manual** 로만 |
| Phase 2 (매장 수정 → 브랜드 → 전 매장 전파) | **폐기** | 「달라져도 돼」 와 정반대 |

**현행 The Fire push·잠금 6칸은 손대지 않는다.** 잠금은 브랜드가 메뉴별로 선택하는 것이라 레스토랑 기준과 양립한다(브랜드가 내려보낸 것 중 잠근 칸만 브랜드 것, 나머지는 매장 것). 「지금은 맞아」 = 현재 운영 동작이 정답. → §5-2 에서 확인.

### 3. 「브랜드 레시피 절대 건드리지 마」 의 증명 항목
코드는 이미 막혀 있으나 **게이트 자료로 실호출 증명 1회**를 붙인다: 매장 토큰으로 브랜드 레시피 PUT/DELETE → 403, 그리고 `routes/recipes.js:737` 조건을 잠깐 빼면 그 테스트가 실제로 실패하는지(고장주입 → 원복). 이 항목이 없으면 「안 건드렸다」 를 말로만 하는 것이 된다.

### 4. UI/UX 지시 — 원칙만. 문구·배치·컴포넌트는 팀원이 정하고 결과에 붙인다(되묻지 않는다)
원칙 하나: **화면마다 「누가 주인인가」 한 줄 + 행마다 배지. 새 설정 0. 이모지 0(디자인 기준 4, 기하 글리프·텍스트).**

**브랜드 메뉴 화면 (BG)**
- 화면 머리에 한 문장: 「이 목록은 브랜드의 메뉴 원본입니다. 매장에 내려보내야 매장에 생기고, 매장은 자기 메뉴를 따로 가질 수 있습니다.」
- 행마다 상태 한 칸: 「매장 N곳에 내려감」 / 「내려보내지 않음」 / 「매장 X 가 만든 것」(`origin_restaurant_id`). 잠긴 칸이 있으면 어느 칸인지 보이게.
- 탭 2개: 「브랜드 메뉴」 · 「매장 자체 메뉴 (읽기 전용)」 — 후자는 `store-own` 경로, 매장 고르기, 편집 버튼 없음, 대신 「매장 자체 메뉴는 매장에서 관리합니다」 한 줄.
- 메뉴 설정 탭: 공유 모드 라디오 **제거**. 남는 브랜드 기본값 5칸에는 각 칸 옆 결과 문장(「새 메뉴를 만들 때 이 값으로 시작합니다」 류) 유지.

**매장 메뉴 화면 (RA)**
- 브랜드 연결 상품 행: 배지 「브랜드 메뉴」 + 잠긴 칸 자물쇠 글리프 + 툴팁 「이 칸은 브랜드에서 정합니다」. 자체 상품: 배지 없음(또는 「우리 매장」). 현행에 이미 있으면 문구만 점검.
- 상품 편집 폼 머리 한 줄: 브랜드 연결이면 「브랜드가 내려보낸 메뉴 — 잠긴 칸 외에는 우리 매장에서 바꿀 수 있습니다」.

**레시피 화면 (RA)**
- 브랜드 레시피 구역: 「브랜드 레시피 — 읽기 전용, 브랜드에서만 수정합니다」 배지 + 편집·삭제 아이콘 없음(현행 확인). 준비 재료 배지 그대로.

### 5. Irene 컨펌 요청 (각각 Fable 권고 첨부)
1. **§1 의 읽기가 맞는가** — 매장 메뉴가 주인 · 브랜드 메뉴는 따로 살아도 됨 · 매장→브랜드 자동 반영 없음 · 브랜드→매장은 지금처럼 브랜드가 골라 내려보냄. 권고: **예** — 원문 세 문장을 그대로 옮긴 것.
2. **The Fire 의 자동 push·잠금 6칸 현행 유지.** 권고: **예** — 「지금은 맞아」. 바꾸면 매장 3곳 128건이 갈라진다.
3. **오늘 만든 공유 모드(3택·매장 추가 차단)를 화면과 코드에서 없앤다.** 권고: **예** — 레스토랑 기준과 충돌, 남기면 헷갈린다. dev 전용이라 제거 비용 낮음.
4. **Phase 0 매장→브랜드 올리기** — 권고: K-DINE 옵션 연결(F-1)은 **함**(내용이 같고 연결만 끊긴 것, 잠금 안 켬, §1-2 버그 수정 뒤) · with MIN 227건(F-2)은 **Irene 이 브랜드 1 에 원본 목록을 두고 싶을 때만** — 지금 결정 안 해도 된다. 둘 다 `--apply` 는 「배포」 급 명시 지시 뒤.

### 6. 준비 재료 — Irene 「이건 나한테 이해시켜주고 해」 에 대한 답 (일상어)
한 줄: **「준비 레시피를 하나 만들면 재료가 저절로 생기고, 재고 화면에서 「만들기」 를 누르면 원재료가 빠지고 준비 재료가 들어오고, 메뉴 레시피에서 그 준비 재료를 고르면 팔릴 때 준비 재료만 빠진다.」**
- 걸음 1 (레시피 화면): 「불고기 양념육」 레시피에 스위치 「이 레시피의 결과물을 재료로 씁니다」 를 켠다. 재료 = 소고기 3 kg · 간장 200 ml · 마늘 100 g, **실제 나오는 양(수율) = 2.5 kg** 을 적는다. 저장하면 재료 목록에 「불고기 양념육」 이 자동으로 생긴다. 이름·단위는 레시피가 정하고 재료 쪽에선 못 바꾼다(한 방향이라 두 군데 맞춰 적을 일 없음).
- 걸음 2 (재고 화면): 그 재료 행의 버튼이 「입고」 가 아니라 **「만들기」**. 몇 판 만드는지 넣으면 빠질 원재료와 부족분이 미리 보이고, 실제 나온 양(예: 이번엔 2.4 kg)을 넣고 확인하면 **한 번에** 원재료 빠짐 · 양념육 +2.4 kg · 장부 한 줄 · kg 당 원가 반영. 실사·저재고 경보는 다른 재료와 똑같이 잡힌다(경보 = 「만들 때」). 발주 화면에는 안 나온다(사는 물건이 아니다).
- 걸음 3 (메뉴 레시피): 「불고기 덮밥」 레시피 재료 선택기에 「불고기 양념육 · 준비 재료」 가 보통 재료처럼 나온다. 0.2 kg 을 적으면 팔릴 때 **양념육만 0.2 kg 빠진다.** 소고기·간장·마늘은 걸음 2 에서 이미 빠졌으니 두 번 빠지는 일은 없다(준비 레시피는 메뉴에 못 붙게 막아 둠).
- **브랜드와의 관계 (오늘 원문과 맞물리는 부분):** 브랜드가 준비 레시피를 만들면 매장은 그것을 **읽어서 「만들기」 만** 한다(재고 수량·원가는 매장 층에 따로 산다). 매장이 배합을 바꾸고 싶으면 **복사해서 매장 것**으로 — 브랜드 레시피는 안 건드린다. 이것이 「브랜드레시피는 브랜드제너럴 기준」 과 정확히 같은 규칙이다.

### 7. 팀원 지시
1. **제거**: `utils/brandSharingMode.js` · `routes/brand-menus.js` 의 `SHARING_MODES`/`applySharingModeToMenus`/`sharing_mode` 읽기·쓰기 · `routes/menu.js:483` 가드 · `routes/optionGroups.js:117` 가드 · `BrandMenusPage.tsx` 라디오 · 관련 i18n 키 4개 언어. `models/BrandMenu.js` 는 `origin_restaurant_id` 만 남긴다.
2. **유지 확인**: `origin_restaurant_id` 를 adopt 스크립트가 채우는지(안 채우면 채우게, 소규모) · `store-own` 이 BG 화면 탭으로 보이는지.
3. **UI 문장·배지 (§4)** — 프론트 변경을 전부 확정한 뒤 **빌드 1회**.
4. **증명 (§3)**: 매장 토큰 → 브랜드 레시피 PUT/DELETE 403 실호출 + 고장주입 1회(원복). 결과를 게이트 자료에 붙인다.
5. **문서**: `docs/BRAND_MENU_SYSTEM.md` 의 2026-09-17 판정 절 **머리에** 「2026-09-17 Irene 방향 전환으로 §3-1·3-2·3-3·Phase 2 폐기, §3-4·§1 정정 2건은 유지」 배너를 붙이고(본문 삭제 말고 표시), 이 판정을 그 뒤에 **원문 그대로** 추가. 새 파일 만들지 않는다. `docs/RECIPE_MANAGEMENT_SYSTEM.md` 는 변경 없음.
6. **게이트**: `verify-all --full` 1회 → `check-sensitive-diff` 결과와 diff 요약을 붙여 **게이트 판정 요청(이 사안 2회째)**. 마커는 그때 찍는다.
7. 운영 쓰기 0 · `--apply` 0 · 배포 0 그대로. §5 컨펌은 Irene 에게 위 문장 그대로 올리고, 1~3 이 「예」 면 지시 1~6 을 진행한다. 4 는 답이 없어도 나머지 진행에 영향 없다.
