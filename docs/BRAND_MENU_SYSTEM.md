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
