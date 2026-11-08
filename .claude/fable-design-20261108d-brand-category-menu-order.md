# Fable 설계 판정 2026-11-08d — 브랜드 카테고리·메뉴 순서를 브랜드 관리자가 관리하고 매장에 닿게

작성: Fable(리더). 근거: 팀원 사실 자료 7건 + 내가 다시 읽은 코드 `routes/brand-menu-categories.js`(reorder/bulk :106 · 0부터 저장) · `routes/brand-menus.js`(settings :49-131 · reorder/bulk :349 · 1부터 저장 · 목록 :201) · `services/brandMenuSyncService.js`(ensureLocalCategory :70 · 순서 덮기 :272·:311 · buildLocksSnapshot :54) · `services/brandMenuBulkPush.js` · `routes/menu.js`(/products/reorder :1004 — 잠금 가드 없음 · 목록 정렬 :238·:388) · `routes/categories.js`(/reorder :213 · 매장 전체를 0..M 으로 다시 매김) · `routes/mobile-public.js`(:212 카테고리 displayOrder ASC,name · :294 상품 display_order 0=뒤) · `models/Category.js`(브랜드 연결 칸 없음 · parent_id 2단) · `BrandGeneral/BrandMenuCategoriesPage.tsx`(순서 UI 0) · `BrandGeneral/BrandMenusPage.tsx`(:602 기본 정렬 newest · :678-720 드래그 · :1024-1050) · `MenuManagement/MenuManagementPage.tsx`(:1360-1395 · :1878-1887 RA 위/아래 버튼 표준) · `CategoryManagement/CategoryManagementPage.tsx`(:575-592 RA 카테고리 위/아래) · `components/Common/SortDropdown.tsx`(custom: 0=미설정→뒤) · 지난 설계 `.claude/fable-design-20261108c-brand-menu-push-all.md`(결정 1 «푸시=브랜드 그대로, 잠금=매장 편집 금지» · 1-b push_frozen · 결정 4 Push All 내용 비교). 개발 DB 읽기: 브랜드 메뉴 0건·브랜드 카테고리 브랜드 1·17 각 2건(sort_order 전부 0)·매장 38 카테고리 13(하위 4)·매장 39 카테고리 6. **코드 변경 0 · 운영 쓰기 0.**

Irene 원문: «https://purplehere.com/pos/brand-menus?tab=categories. 여기 카테고리랑 브랜드 메뉴 순서 다 바꿔야 해. 관리자가 관리해야 하는데 기능이 없어. 어떻게 되는 거야?»

---

## 0. 호출 조건
성립(`design`). 두 화면(브랜드 카테고리 탭·브랜드 메뉴 탭)과 매장으로 넘어가는 길(sync·Push All)·매장 쪽 가드가 **같은 «순서» 규칙** 을 나눠야 하고, 어디서 어떻게 매장에 닿게 할지는 되돌리기 어려운 선택이 아니라도 길이 갈린다. 이 사안 설계 1회(이번). 게이트는 §8 조건부.

---

## 1. «어떻게 되는 거야?» — 지금 상태 한 줄씩

| 물음 | 지금 |
|---|---|
| 카테고리 순서를 브랜드에서 바꿀 수 있나 | **못 바꾼다.** 서버엔 `PUT /api/brand-menu-categories/reorder/bulk` 가 있지만 화면 어디서도 부르지 않는다. 목록은 `sort_order` 순(전부 0 → 사실상 이름순). |
| 메뉴 순서를 바꿀 수 있나 | 숨어 있다. 정렬 드롭다운을 «Menu order (manual)» 로 바꿔야 카드 왼쪽 위 손잡이가 나오고, HTML5 드래그라 **태블릿·폰에선 안 된다.** 기본 정렬은 «최근 추가». |
| 브랜드 순서가 매장에 가나 | **메뉴:** 설정 «Lock menu order»(enforce_menu_order) 가 켜진 브랜드만 푸시 때 매장 `display_order` 로 간다(:272·:311). 꺼진 브랜드는 매장 자유. **카테고리:** 매장 카테고리를 **처음 만들 때 한 번만** 브랜드 순서를 베끼고(:77), 그 뒤 브랜드가 순서를 바꿔도 **절대 안 간다.** |
| «Lock menu order» 가 켜지면 매장은 정말 못 바꾸나 | **아니다.** 매장 `/api/menu/products/reorder` 에 잠금 가드가 없다 — 설정 문구 «restaurants cannot reorder them» 은 지금 거짓이고, 매장이 바꾼 순서는 다음 푸시까지 산다. |
| 순서만 바꾼 뒤 Push All 을 누르면 가나 | **안 간다.** 순서 저장은 version 을 올리지 않고, `planBrandBulkPush` 는 순서를 비교하지 않는다(설계 c 결정 4 는 이름·가격·사진·카테고리·가시성만). |
| 매장 카테고리는 브랜드 카테고리와 어떻게 묶이나 | **이름으로만.** 매장 `categories` 에 브랜드 연결 칸이 없다(`ensureLocalCategory` findOrCreate by name). 옵션그룹(`brand_menu_option_group_id`)과 달리 연결이 없다. |

결론: 기능이 «없는» 게 아니라 **반쪽씩 있고 서로 안 이어져** 있다. 서버 저장 길은 다 있으니(카테고리·메뉴 reorder 라우트, enforce 설정) 이번 일은 ①화면 ②매장으로 가는 길 ③가드 셋을 한 규칙으로 잇는 것이다. **새 테이블·새 칸·마이그 없음.**

---

## 2. 결정

### 결정 1 — 순서의 주인 규칙: «Lock menu order» 하나가 **메뉴 순서 + 카테고리 순서** 둘 다 가른다

- 설정 토글 `enforce_menu_order` 의 뜻을 «브랜드가 **메뉴·카테고리 순서** 를 정한다» 로 넓힌다. 새 설정 칸을 만들지 않는다(순서는 하나의 개념 — 메뉴 순서는 브랜드가 정하는데 카테고리 순서는 매장이 정하는 조합은 손님 화면에서 의미가 없다).
- **켜짐(ON):** 푸시/동기화 때 매장 상품 `display_order` ← 브랜드 `sort_order`(지금 규칙 유지) **+ 매장 카테고리 `displayOrder` ← 브랜드 카테고리 `sort_order`(새로)**. 매장은 메뉴 순서를 못 바꾼다(결정 4 가드).
- **꺼짐(OFF):** 지금과 같다 — 매장이 자기 순서를 정하고 푸시는 순서를 건드리지 않는다(설계 c 결정 1 표의 «display_order(순서 강제 아닐 때) = 매장 소유» 그대로 — **c 와 충돌 없음**).
- 설계 c 의 «푸시 = 브랜드 그대로, 잠금 = 매장 편집 금지» 와의 관계: 이름·가격·사진은 매장마다 달라야 할 이유가 없어 항상 보냈다. **순서는 매장마다 달라야 할 이유가 있을 수 있다**(매장 자체 메뉴가 많은 매장 · 매장 레이아웃). 그래서 순서만은 «브랜드가 정한다» 를 **켜는 선택**으로 남긴다 — 이미 그 토글이 있고 이름도 맞다. K-DINE 13 은 켠다(§5).
- 문구(설정 탭 hint) 교체: «When ON: every restaurant shows categories and menus in the order you set under the Categories and Menus tabs, and restaurants cannot reorder brand menus. Store-own categories are placed after the brand's. When OFF: each restaurant arranges its own order.» (4언어)

### 결정 2 — 카테고리 순서 UI: 카테고리 탭 카드에 **위/아래 버튼**(RA 표준) · 드래그 없음

- `BrandMenuCategoriesPage.tsx` 각 카드 액션 칸에 ▲ ▼ 2개 — RA `CategoryManagementPage`(위/아래만) 와 `MenuManagementPage`(:1881 chevron svg) 와 같은 모양. 공용 `components/UI` `IconButton`(32×32) 사용 — 이 파일의 로컬 `IconBtn` 을 새로 늘리지 않는다(design-guard). 첫 줄 ▲·마지막 줄 ▼ 는 disabled.
- 누르면 전체 id 배열을 바꾼 순서로 `PUT /api/brand-menu-categories/reorder/bulk {brand_id, order}` — 낙관적 반영 후 `load()`. 중복 클릭 가드(`inFlight` ref — `MenuManagementPage:1360` 패턴).
- 드래그는 넣지 않는다: RA 카테고리 화면이 버튼만이고, 터치 기기에서 HTML5 드래그가 안 되는 것이 바로 메뉴 탭의 문제였다. 카테고리는 많아야 10여 개라 버튼으로 충분.
- **서버 변경 1곳:** `reorder/bulk` 저장을 `i` → `i + 1`(1부터). 이유: 메뉴 reorder 와 같은 «0 = 아직 순서 안 정함» 약속을 카테고리에도 둬서, 결정 3 이 «브랜드가 순서를 정한 카테고리만» 매장에 보낼 수 있게. 이 라우트는 지금 아무도 안 부르니 바꿔도 깨지는 곳 0. POST 기본 `sort_order||0` 은 그대로(새 카테고리 = 미정렬 → 목록 맨 뒤·브랜드가 한 번 ▲▼ 하면 1..N 으로 정리됨).
- 목록 정렬은 지금 서버 순(`sort_order ASC, name ASC`)을 그대로 쓴다 — 단 화면에서 `sort_order===0` 은 뒤로 보낸다(SortDropdown 'custom' 과 같은 규칙 — 함수 재사용: `sortItems(cats.map(c=>({...c, display_order:c.sort_order})),'custom')`).
- 카드 메타에 «menus N» 옆 작은 안내 1줄(목록 위 hint): «This is the order customers see at stores when "Lock menu order" is on in Settings.»

### 결정 3 — 카테고리 순서가 매장으로 가는 길: `syncBrandMenuToRestaurant` 안, 순서 잠금일 때만, 이름으로 맞춰서

새 함수 `syncBrandCategoryOrderToRestaurant({ brandId, restaurantId, transaction })` (brandMenuSyncService 내부, export):
1. 브랜드 카테고리 전부 읽기(`sort_order ASC`). **`sort_order > 0` 인 것만** 대상(«브랜드가 정한 순서»). 하나도 없으면 아무것도 안 쓰고 `{ skipped: 'brand_unordered' }` — 순서를 한 번도 안 정한 브랜드(지금 운영 전부일 가능성)가 토글만 켜져 있어도 매장 카테고리를 뒤흔들지 않게.
2. 매장 1단 카테고리(`parent_id IS NULL`) 읽기. 브랜드 카테고리와 **이름이 같은** 행 = 브랜드 미러(지금 `ensureLocalCategory` 가 이름으로 만들기 때문에 이 규칙과 일치). 단 그 이름이 매장에서 **묶음 칸**(하위 있음 — `findGroupCategoryByName`)이면 건너뛴다(`resolveSyncCategory` 와 같은 예외 · 결과에 `categorySkipped`).
3. 미러 행 `displayOrder` ← 브랜드 `sort_order`(1..N). 값이 같으면 update 안 함(쓰기 최소).
4. **매장 자체 1단 카테고리**(브랜드 이름과 안 맞는 것 · Uncategorized 포함) ← `N + k`(k = 지금 displayOrder, id 순으로 1..). 즉 **브랜드 카테고리 먼저, 매장 것은 뒤에 상대순서 유지.** 이걸 하는 이유: 매장 RA 카테고리 재정렬(`/categories/reorder`)은 매장 전체를 0..M 으로 다시 매기므로 브랜드 행만 다시 박으면 매장 자체 행이 그 사이에 끼어 «순서가 이상해» 가 된다. ON 은 «브랜드가 순서를 정한다» 니까 매장 것의 자리도 정해 준다(뒤). 하위(2단) 행은 건드리지 않는다(상위 안 순서는 매장 몫).
5. **호출 자리 = `syncBrandMenuToRestaurant` 한 곳**, `assertBrandPushAllowed` **뒤**(→ push_frozen 브랜드 2 는 자동으로 안 닿음) · `resolveSyncCategory` 뒤 · `locks.sort_order` 가 true 일 때만. 5경로(단건 push · push-pending · auto 분배 · scope 적용 · 매장 Apply/sync-all) 전부 이 함수를 지나므로 훅 1개로 끝. 같은 매장에 메뉴 N개를 연달아 푸시하면 N번 돌지만 2·3 단계가 «같으면 안 씀» 이라 쓰기는 1번 — 받아들인다(단순함 우선).
6. 기존 `ensureLocalCategory` 의 «처음 만들 때 displayOrder = sort_order» 는 그대로.

메뉴 순서 쪽 기존 코드 보정 1줄: `:272` `if (locks.sort_order) updates.display_order = brandMenu.sort_order || 0;` → `if (locks.sort_order && brandMenu.sort_order > 0)`. 지금은 순서를 안 정한 브랜드(sort_order 0)가 토글만 켜면 푸시마다 매장 `display_order` 를 0 으로 밀어 **매장이 정한 순서를 지운다** — 사진·설명과 같은 «브랜드가 비우면 안 건드림» 규칙으로 맞춘다. `:311`(생성)은 그대로(0 이면 0).

### 결정 4 — 매장은 ON 일 때 브랜드 메뉴 순서를 못 바꾼다(가드) · 카테고리 재정렬은 막지 않고 다음 푸시가 다시 박는다

- `routes/menu.js` `/products/reorder`: 요청 id 들의 상품 중 `brand_menu_locks_snapshot.sort_order === true` 가 하나라도 있으면 **409** `{ success:false, code:'BRAND_ORDER_LOCKED', message:'Menu order is set by the brand.' }` — 아무것도 안 씀. 스냅샷은 푸시 때 이미 `buildLocksSnapshot` 으로 들어가므로 새 칸 없음.
- RA `MenuManagementPage` 위/아래 버튼: 그 카테고리의 아이템 중 `locks_snapshot.sort_order` 가 하나라도 true 면 버튼 대신 작은 글자 «Order set by brand»(기하 글리프/텍스트만). 버튼 숨김 조건은 기존 조건(`custom`+카테고리+검색 없음)에 AND.
- 매장 `/categories/reorder` 는 **이번에 막지 않는다.** 매장 카테고리에 브랜드 연결 칸이 없어 이름 기반 가드가 되는데, 브랜드가 여럿 닿는 매장·개명·2단 묶음까지 따지면 가드가 길어지고 틀릴 자리가 많다. 결정 3-4 가 다음 푸시 때 다시 박으니 «결국 브랜드 순서» 는 보장된다. 설정 문구에 그대로 적는다(결정 1 문구의 «restaurants cannot reorder **brand menus**»).
- 토글을 켤 때 즉시 효과: `PUT /api/brand-menus/settings` 에서 `enforce_menu_order` 가 **바뀌었을 때** 그 브랜드 메뉴에 연결된 매장 상품의 `brand_menu_locks_snapshot.sort_order` 도 같이 갱신(push_frozen 이면 매장 표 안 씀). 지금 다른 방이 같은 자리에 `applyBrandLocksToMenus`(name/price/category/image/options 잠금 → 메뉴 lock_* + 매장 스냅샷)를 **미커밋으로 넣고 있다** — 그 커밋이 들어온 뒤 **그 함수에 `sort_order` 키를 더하는 식**으로 얹는다. 따로 두 번째 함수를 만들지 않는다. 순서 값 자체는 다음 푸시(Push All)로 간다 — 토글이 매장 표를 바로 바꾸지는 않는다.

### 결정 5 — 메뉴 순서 UI: 기본 보기 = «메뉴 순서», **카테고리를 골라 그 안에서** 위/아래 버튼(+기존 드래그)

- `BrandMenusPage` 기본 `sortKey` `'newest'` → `'custom'`. 순서를 안 정한 브랜드는 전부 0 → 'custom' 이 «최근 추가» 와 같아져 보이는 것이 안 바뀐다. 정한 브랜드는 **관리자가 보는 순서 = 손님이 보는 순서**가 된다.
- 'custom' + «All Categories» 보기: **카테고리 순서(브랜드 sort_order, 0 은 뒤) → 그 안에서 메뉴 sort_order** 로 묶어 보인다(지금은 카테고리 무시하고 숫자만 봄). 카테고리 없는 메뉴는 맨 뒤 «Uncategorized» 묶음. 화면 안 정렬 함수 1개(프론트만).
- **순서 바꾸기는 카테고리 필터를 고른 상태에서만**(RA `MenuManagementPage` 와 같은 조건: `custom` + 특정 카테고리 + 검색 없음). 카드에 ▲ ▼ `IconButton` 2개(첫/마지막 disabled) + 기존 손잡이 드래그도 같은 조건에서만 살린다(두 길 모두 그 카테고리 안에서만 움직임). 저장은 **그 카테고리 메뉴 id 만** 순서대로 `PUT /api/brand-menus/reorder/bulk` → 서버가 1..N 으로 저장(라우트 변경 없음). 카테고리마다 1..N 이 겹치는 것은 문제없다 — 손님 화면·RA 화면 모두 카테고리 안에서만 순서를 보고, RA 자체 재정렬도 카테고리 안 1..N 이다(`menu.js:1004`). All 보기는 위 묶음 정렬이라 겹쳐도 섞이지 않는다.
- 필터 드롭다운에 «Uncategorized» 항목 추가(값 `none` → **클라이언트에서** `category_id==null` 필터. 서버 `category_id` 쿼리는 숫자만 받으므로 쿼리에 안 보냄). 카테고리 없는 메뉴도 순서를 정할 수 있어야 손님 화면 Uncategorized 묶음이 관리된다.
- 힌트 2줄 교체: (custom+All) «Shown in the order customers see. Pick a category to arrange its menus.» / (custom+카테고리) «Use ▲▼ or drag the handle to arrange. Stores follow this order when "Lock menu order" is on in Settings.» / (다른 정렬) «Switch the sort to "Menu order" to arrange menus.»
- 전부 프론트. 백엔드 메뉴 reorder 라우트·목록 라우트 변경 0.

### 결정 6 — «Push All Changes» 가 순서 변경도 잡는다(ON 브랜드만)

`planBrandBulkPush`:
- 브랜드 설정 1회 읽기(`enforce_menu_order`). **OFF 면 순서 비교 없음**(지금과 같음).
- ON: 메뉴별 매장 비교에 `fields.push('order')` — 조건 `m.sort_order > 0 && p.display_order !== m.sort_order`. 쿼리 attributes 에 `sort_order`(메뉴)·`display_order`(상품) 추가.
- ON: 매장별 **카테고리 순서 차이** — 결정 3 의 1~4 단계를 «쓰지 않고 비교만» 하는 형제 함수 `diffBrandCategoryOrder(brandId, restaurantId)` → 다른 매장 id 목록을 응답 `category_order_restaurant_ids: number[]` 로. 대상 매장 = 그 브랜드 메뉴들의 scope 매장 합집합(이미 `resolveScopeTargetIds` 로 돈 것 재사용).
- `runBrandBulkPush`: 메뉴 푸시(기존 — 각 매장 sync 안에서 결정 3 이 같이 돈다) 뒤, **메뉴 푸시가 0건이었던** `category_order_restaurant_ids` 매장은 `syncBrandCategoryOrderToRestaurant` 를 직접 1번(트랜잭션 · `assertBrandPushAllowed` 포함). 결과에 `category_order_updated: n`.
- 확인창(dry_run 목록): 매장 줄의 fields 에 `order` 가 그대로 보이고, 카테고리 순서 매장이 있으면 줄 1개 추가 «Category order → N stores». 메뉴 0·카테고리만 N 이어도 버튼이 살아야 한다(지금 `menu_count===0` 이면 «Nothing to send» 처리인지 팀원이 확인해 조건에 `category_order_restaurant_ids.length` 를 더한다).

### 결정 7 — 마이그 없음 · 새 칸 없음 · 백필 없음
- `categories` 에 브랜드 연결 칸(`brand_menu_category_id`)을 **지금은 만들지 않는다.** 이름 매칭이 오늘 생성 규칙과 일치하고, 이 일(순서)엔 충분하다. 개명 전파가 필요해지는 날 그 설계에서 옵션그룹처럼 연결 칸을 둔다 — 그때 `TRADE_STRUCTURE` 가 아니라 `docs/BRAND_MENU_SYSTEM.md` 에 먼저 적고 Fable.
- 운영 데이터 백필(기존 매장 카테고리 순서)은 없다 — ON 브랜드의 다음 푸시가 한다.

---

## 3. 구현 범위 (팀원 · 이 밖은 하지 않는다)

**먼저:** `git status` 에 `brandMenuSyncService.js`·`BrandMenusPage.tsx` 미커밋 변경(다른 방 · `applyBrandLocksToMenus`)이 있다. **그 방이 커밋할 때까지 이 두 파일은 열지 않는다**(공용 규칙 «한 솔루션 동시 수정 방 1개»). 커밋되면 그 위에 얹는다. 다른 파일(카테고리 탭·라우트·bulkPush·menu.js·RA 화면)은 먼저 해도 된다.

백엔드
1. `routes/brand-menu-categories.js` — reorder/bulk `i+1`.
2. `services/brandMenuSyncService.js` — `syncBrandCategoryOrderToRestaurant` + `diffBrandCategoryOrder`(비교 전용 · 같은 계산을 한 함수에 `dryRun` 인자로 — 검사와 수정은 같은 식) · `syncBrandMenuToRestaurant` 안 호출 1곳(assert 뒤 · `locks.sort_order` 일 때) · `:272` `sort_order > 0` 조건 · export 2개 · 머리 주석에 순서 규칙 추가.
3. `routes/brand-menus.js` — PUT /settings: `enforce_menu_order` 변경 시 매장 스냅샷 `sort_order` 갱신(다른 방 함수에 키 추가 방식) · 응답 그대로.
4. `services/brandMenuBulkPush.js` — 결정 6(`order` 필드 · `category_order_restaurant_ids` · run 에서 카테고리만 매장 처리).
5. `routes/menu.js` `/products/reorder` — 409 `BRAND_ORDER_LOCKED` 가드(쓰기 전에 검사).
6. `scripts/health-check.js` — §6 ①②③④⑤ (데모 브랜드 10 · 매장 38/39 · 이름 `ZZ-HC` · 설계 c 가 넣은 브랜드 메뉴 시드/정리 헬퍼 재사용 · 끝나면 원복).

프론트
7. `BrandGeneral/BrandMenuCategoriesPage.tsx` — ▲▼ `IconButton` · 저장 · 0 뒤로 정렬 · 힌트 1줄.
8. `BrandGeneral/BrandMenusPage.tsx` — 기본 'custom' · All 보기 카테고리 묶음 정렬 · ▲▼ + 드래그 조건 통일 · Uncategorized 필터 · 힌트 3종 · 설정 탭 enforce 문구 · Push All 확인창 «Category order → N stores» + 버튼 활성 조건.
9. `MenuManagement/MenuManagementPage.tsx` — 순서 잠금이면 ▲▼ 대신 «Order set by brand» · 409 메시지 표시.
10. i18n 4언어(`brand`·`menu` namespace) · `npm run i18n:verify`.

**하지 않는 것:** 새 설정 칸 · 새 컬럼 · 마이그 · 백필 · 카테고리 드래그 · 순서 저장 시 version 올리기(Push All 이 비교로 잡는다) · 매장 `/categories/reorder` 가드 · 브랜드 카테고리 개명 전파 · 매장→브랜드 역방향 · 브랜드 2(IPC)·매장 8 어떤 표도 쓰기(push_frozen 가드가 이미 막음 — 새 함수가 assert **뒤** 에 있는지가 핵심) · K-DINE 운영 데이터 스크립트(순서는 배포 뒤 화면에서 Irene/브랜드 담당이 정한다) · 🔒 인쇄/KDS 보호파일 8개 접촉(이번 범위에 없음 — `check-print-guard` 변경 0 이어야 함) · SortDropdown 공용 컴포넌트 변경(묶음 정렬은 페이지 안에서).

---

## 4. 왜 이렇게 (갈림길마다 한 줄)

| 갈림길 | 고른 것 | 버린 것 · 이유 |
|---|---|---|
| 카테고리 순서 UI | 위/아래 버튼 | 드래그 — 터치 안 됨·RA 표준 아님·항목 적음 |
| 메뉴 순서 찾기 쉽게 | 기본 보기 = 메뉴 순서 + 카테고리 골라 ▲▼ | «순서 편집 모드» 새 화면 — 개념 하나 더 · RA 는 이미 «custom+카테고리» 패턴 |
| 메뉴 번호 체계 | 카테고리 안 1..N | 브랜드 전체 1..N — 손님·RA 모두 카테고리 안에서만 보고, 전체 번호는 카테고리 수십 개 메뉴를 한 줄로 끌어야 해 관리가 안 됨 |
| 카테고리 순서 매장 전달 시점 | enforce_menu_order ON 일 때 푸시마다 | 항상 — 설계 c 가 «순서는 OFF 면 매장 소유» 로 둔 것과 충돌 · 매장이 순서를 가질 이유가 있음 / 별도 토글 — 메뉴·카테고리 순서를 따로 정할 이유 없음 |
| 매장 자체 카테고리와 섞임 | ON 이면 브랜드 것 먼저, 매장 것 뒤(상대순서 유지) | 안 건드림 — RA 재정렬이 0..M 으로 다시 매겨 끼어듦 · «이상해» 재발 / 연결 칸 추가 — 이 일엔 과함 |
| 순서 안 정한 브랜드가 ON | sort_order>0 만 보냄(메뉴·카테고리 동일) | 0 도 보냄(지금 코드) — 매장 순서를 0 으로 지움 |
| Push All 이 순서 잡기 | 비교로(ON 브랜드만) | reorder 때 version++ — 드래그마다 전 메뉴 pending · 매장 «업데이트 받기» 목록 소음 |
| 매장 가드 | 메뉴 reorder 409(스냅샷 있음) · 카테고리는 안 막음 | 카테고리 이름 가드 — 연결 칸 없이 길고 틀릴 자리 많음 |

---

## 5. 운영 반영 순서 (Irene 지시 뒤 · 배포 방/정기 점검이 실행)

0. **배포 전 운영 읽기(쓰기 0 · `reference_prod_readonly_script_pattern`):** ① `brands.menu_settings.enforce_menu_order` 가 true 인 브랜드 목록(13 외에 있으면 §8 게이트) ② 그 브랜드들의 `brand_menu_categories.sort_order` 분포(전부 0 이면 결정 3-1 로 카테고리 순서는 안 간다) ③ 매장 28 1단 카테고리 목록(이름·displayOrder·parent_id) 과 브랜드 13 카테고리 이름 대조 — 안 맞는 이름(= 매장 자체로 분류돼 뒤로 갈 것) 을 보고에 적는다 ④ 매장 28 상품 중 `display_order>0` 개수(매장이 정해 둔 순서 — ON+푸시 뒤 브랜드 순서로 바뀜).
1. 배포(마이그 0 · SW 그대로 — 프론트 번들은 바뀌므로 SW bump 는 팀원 규칙대로).
2. **Irene 할 일(화면):** 브랜드 13 → Settings → «Lock menu order» ON → Categories 탭에서 ▲▼ 로 순서 → Menus 탭 카테고리별 ▲▼ → «Push All Changes»(확인창에 «order»·«Category order → 1 store» 가 보여야 함). 끝나면 매장 28 손님 메뉴(모바일)에서 카테고리·메뉴 순서 확인.
3. 브랜드 2/매장 8: 아무것도 안 함(push_frozen).

---

## 6. 검증 기준 (팀원 자체 검증 · 실호출 · 숫자로 — 코드 리뷰만은 불합격)

개발서버 · 데모 브랜드 10(매장 38·39) · 브랜드 메뉴 0건이니 **시드부터**(카테고리 3 · 메뉴 5 · 이름 `ZZ-HC …`) · 끝나면 원복.
① 카테고리 reorder/bulk `[c3,c1,c2]` → sort_order 1,2,3 · GET 목록 순서 일치 · 화면 ▲▼ 2회 → 저장 2회 · 첫/마지막 disabled.
② 메뉴: 카테고리 c1 필터에서 ▲ 1회 → 그 카테고리 id 만 reorder/bulk · 다른 카테고리 메뉴 sort_order 불변 · All 보기가 (카테고리 순 → 메뉴 순) 으로 보임 · Uncategorized 필터에서 ▲▼ 동작 · 기본 진입 정렬 custom.
③ OFF 브랜드 푸시 → 매장 38 `categories.displayOrder`·`products.display_order` 전부 불변(지문 비교). ON 으로 바꾸고 푸시 → 미러 카테고리 displayOrder = 브랜드 sort_order(1..3) · 매장 자체 1단 카테고리는 4.. 로 상대순서 유지 · 하위(parent_id) 행 불변 · 묶음 칸 이름은 건너뜀(결과 categorySkipped) · 상품 display_order = 브랜드 sort_order(>0 만) · 브랜드 sort_order 0 메뉴는 매장 display_order 불변 · `/api/mobile-public/...` 카테고리 순서 일치.
④ ON + 매장 `/products/reorder` 에 잠긴 상품 포함 → 409 `BRAND_ORDER_LOCKED` · 쓰기 0 · 잠기지 않은 매장 자체 상품만 → 200. RA 화면 그 카테고리에 ▲▼ 대신 «Order set by brand». OFF 로 바꾸면(설정 저장 → 스냅샷 갱신) 같은 요청 200.
⑤ Push All dry_run: 버전 같고 in_sync 인데 브랜드 메뉴 순서만 바꿈 → ON 이면 그 매장 fields 에 `order` · 카테고리 순서만 바꿈 → `category_order_restaurant_ids=[38]` · 실행 → 재계획 0 · 다시 실행 → 쓰기 0(updatedAt 불변). OFF 면 둘 다 0.
⑥ push_frozen 브랜드(설계 c ⑤ 케이스 재사용)에 ON + 카테고리 순서 다르게 → 푸시 409/`BRAND_PUSH_FROZEN` · 그 매장 `categories` 지문 불변.
⑦ **고장주입 2건(각 1회, 원복):** (a) 결정 3 호출의 `locks.sort_order` 조건을 빼면 ③ 의 «OFF 불변» 이 실제로 실패하는지 (b) ④ 가드를 빼면 409 케이스가 실패하는지.
⑧ 기계 게이트: 프론트 변경 다 끝낸 뒤 **빌드 1회 · `verify-all --full` 1회** · `check-print-guard` 변경 0 · `check-design-guard` 신규 위반 0(로컬 styled.button 새로 안 만듦) · `check-sensitive-diff` · `i18n:verify` · health-check 전체(신규 케이스 포함).
⑨ 배포 전 운영 읽기 §5-0 네 수치.

보고에는 ①~⑨ 의 실제 숫자와 «확인할 곳»(브랜드 탭 카테고리/메뉴 · 매장 38 모바일 메뉴 · RA 메뉴 화면 잠금 표시 — `[as=brand store=38]` / `[as=restaurant store=38]`).

---

## 7. Irene 컨펌 요청 (각각 Fable 권고)

1. **카테고리 순서는 «Lock menu order» 가 켜진 브랜드만 매장으로 간다 — 새 설정 없이 그 토글이 메뉴·카테고리 순서를 함께 가른다. K-DINE 13 은 배포 뒤 켠다.** 권고: 예. 토글이 이미 있고 이름도 그 뜻이다. 켜지 않은 브랜드(지금 운영 전부일 가능성)는 아무것도 안 바뀐다.
2. **켜진 매장에서 매장 자체 카테고리는 브랜드 카테고리 뒤로 간다(상대순서 유지).** 권고: 예 — 안 건드리면 매장 재정렬이 사이에 끼어 «순서가 이상해» 가 재발한다.
3. **메뉴 순서는 카테고리를 골라 그 안에서 ▲▼(드래그도 됨) · 기본 보기 = 메뉴 순서.** 권고: 예 — 손님이 보는 단위가 카테고리고, RA 매장 화면이 이미 이 방식이다.
4. **마이그·새 칸 없음. 매장 카테고리 재정렬은 막지 않고 다음 푸시가 다시 박는다.** 권고: 예(이 일엔 충분 · 개명 전파가 필요해지면 그때 연결 칸).

## 8. 게이트
- **조건부.** §5-0 ① 에서 `enforce_menu_order=true` 인 운영 브랜드가 **13 외에 있으면** Fable 검증 1회(gate — 그 브랜드 매장들의 카테고리·메뉴 순서가 다음 푸시에 바뀜 · diff 가 §3 안인지 · ①~⑨ 숫자 · 롤백 = 토글 OFF 로 매장 자유 복귀).
- 13 외에 **없으면** 게이트 안 씀 — 보고에 «Fable 설계 1회 · 게이트 안 씀 — 운영 ON 브랜드 13 뿐(배포 뒤 Irene 가 켬) · 자체 검증 ①~⑨ 숫자» 한 줄. 운영 배포는 그 수치가 다 붙은 뒤.
