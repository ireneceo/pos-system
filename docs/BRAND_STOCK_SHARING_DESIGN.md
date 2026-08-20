# 브랜드 재고 공유 — 프랜차이즈 표준 재료 마스터 → 매장

작성: 2026-07-12 · 설계: Opus(구현) + **Fable 구조판정(C안 채택)** · 상태: 설계 확정 · 구현 착수
요청자: Irene — "공급업체·스톡아이템도 브랜드에 연결하면 레시피처럼 공유돼서 매장으로 내려가야 한다. 매장이 자기 레시피 만들 때도 브랜드 재고에서 가져다 써야 한다. K-DINE with MIN 기준으로 제대로 연결되게."

> **한 줄 결론**: 브랜드 재료(`ingredients.owner_type='brand'`)가 **프랜차이즈 표준 재료 마스터**다. 이미 레시피·재고 화면엔 내려가고 있고, **끊긴 곳은 발주와 소유권 검사 3곳 + 매장별 실재고 분리 1개**뿐이다. `product_ingredients`(본사 자체 구매 재고)와의 **통합은 하지 않는다**(Fable 기각 — 성격이 다른 개념, 이관 이득 0).

---

## ① 기능 정의 (1단계)

| 항목 | 내용 |
|------|------|
| 기능명 | 브랜드 재고 공유 — 브랜드가 정의한 재료·공급처를 소속 매장이 읽기전용으로 쓰고 발주까지 |
| 목적 | 브랜드 레시피가 매장에서 **재료·원가·발주까지 온전히** 동작하게. 같은 재료를 브랜드/매장이 각자 등록하는 중복 제거 |
| 핵심 사용자 | **Brand General**(재료·공급처 정의) · **Restaurant Admin/Owner**(사용·발주) |
| 성공 기준 | K-DINE with MIN(brand 2) ↔ K-DINE IPC Branch(rid 8)에서 **브랜드 레시피 → 브랜드 재료 → 공급처 → 매장 발주 → 입고 → 매장별 재고/원가**가 한 줄로 이어짐 (§⑥ 합격조건 6개 전부 실측 통과) |

### 핵심 유스케이스
1. BG가 브랜드 재료 "K-Gochujang"에 공급업체 상품을 연결한다 → 소속 매장 전부가 그 공급처로 발주 가능해진다.
2. 매장이 발주 화면 "My Stock Items"에서 **자기 재료 + 브랜드 재료**를 함께 보고 담는다.
3. 매장이 자기 레시피를 만들 때 브랜드 재료를 가져다 쓴다(이미 동작 — 유지·검증).
4. 매장이 브랜드 재료를 입고하면 **그 매장의 재고만** 늘고, 형제 매장 재고는 그대로다.
5. 매장은 브랜드 재료를 **수정·삭제·공급처 연결/해제 할 수 없다**(브랜드 전용). 단가만 매장별 오버레이로 갈린다.

### 기존 시스템과의 관계 — 이미 되어 있는 것 (건드리지 않음)
| 이미 되는 것 | 근거 |
|---|---|
| 브랜드 재료 마스터 존재 | `ingredients.owner_type='brand'` + `brand_id` (운영: brand2 163건, brand1 107건) |
| 브랜드 재료 읽기 API (자기 브랜드 한정 + 매장 단가 오버레이) | `routes/ingredients.js:588` `GET /restaurants/:id/brand-ingredients` |
| 레시피 화면에서 브랜드 재료 사용 | `RecipeManagement/RecipesTab.tsx:924`, `IngredientsTab.tsx:590/763/869/1812` |
| 재고관리 화면에 브랜드 재료 포함 | `routes/inventory-core.js:47-50` (`Op.or` restaurant_id ∪ brand_id) |
| BG가 브랜드 재료에 공급처 연결 | `IngredientsTab.tsx:571` (`/api/brands/:id/ingredients?include=sellers`) + `routes/ingredient-seller-products.js:42` |
| 외부공급업체 브랜드→매장 공유 + 계약 상속 | `supplier-directory.js:1103`, `utils/supplierAccess.js:29` |

### 끊겨 있는 것 = 이번 범위
| # | 결함 | 위치 |
|---|---|---|
| G1 | 발주 "My Stock Items"가 **자기 재료만** 조회 → 브랜드 재료 발주 불가 | `routes/restaurants-ingredients.js:61` + `NewPurchaseOrderPage.tsx:777` |
| G2 | 발주 소유권 검사가 브랜드 재료를 **거부** | `routes/purchase-orders-crud.js:125-138` |
| G3 | 매장이 브랜드 재료의 **공급처 목록을 못 읽음**(404) | `routes/ingredient-seller-products.js:36-47` |
| G4 | 입고가 **브랜드 공유 행의 `current_stock`을 직접 갱신** → 형제 매장 재고 오염 | `inventory-core.js:317`(receive) · `purchase-orders-workflow.js:485,887` |
| G5 | `POST /inventory/receive`에 **소유권 검사가 아예 없음** (IDOR — 남의 재료 id로 입고 가능) | `routes/inventory-core.js:335` |
| G6 | 레시피 재료 연결에 소유권 검증 없음 → **운영에 타 브랜드 재료 참조 1건 실재** | `routes/recipes.js:454` |

### 비범위 (절대 안 건드림)
- **`product_ingredients` / `product_recipes` / BG 본사 발주 체인 — 무접촉·무이관·무병합.** 이건 "본사가 스스로 사들이는 재고"이고 브랜드 표준 재료와 성격이 다르다(Fable 판정). 2026-06-22 평행 체인 결정 유지 → [[reference_bg_ra_product_chains]]
- `BrandProduct`(브랜드가 매장에 파는 B2B 카탈로그) 경로 — 무접촉
- 푸드코트 재료 공유 — 이번 범위 아님(같은 패턴으로 후속 가능)
- 🔒 인쇄 보호파일 8개 / KDS 단계 로직 — 완전 무관

---

## ② API 설계 (2단계)

### A. 신규 — 브랜드 재료 + 공급처 (매장 읽기전용)
```
GET /api/restaurants/:restaurantId/brand-ingredients?include=sellers
```
| 항목 | 내용 |
|---|---|
| 역할 | Restaurant Admin / Owner / Staff |
| 미들웨어 | `authenticateToken` + `checkRestaurantAccess` (기존 라우트에 이미 적용) |
| 변경 | `include=sellers` 쿼리 지원 추가 — 각 브랜드 재료에 `sellerSources[]`(=`ingredient_seller_products`) 첨부. 기존 무옵션 호출은 **응답 불변**(하위호환) |
| 응답 | `{ success:true, data:[{ id, name, code, unit, unit_cost, effective_cost, current_stock(=매장 오버레이), owner_type:'brand', brand_id, is_brand_shared:true, read_only:true, sellerSources:[...] }] }` |
| 보안 | `brand_id`는 **서버가 `Restaurant.findByPk`로 조회** — 클라이언트 파라미터 불신. 형제 브랜드 재료 누출 금지 |

### B. 확장 — 발주 소유권 검사 (서버)
`routes/purchase-orders-crud.js` `ingredientBelongsToBuyer()`
```
restaurant buyer → ing.restaurant_id === buyer.id
               OR (ing.owner_type==='brand' && ing.brand_id === (서버조회 restaurant.brand_id))   ← 추가
brand buyer     → ing.brand_id === buyer.id            (불변)
foodcourt buyer → ing.foodcourt_id === buyer.id        (불변)
```
- 판매자 검증(`canBuyFromSeller`)·계약(`findEffectiveContract`)은 **기존 로직 그대로** — 외부공급업체 계약 상속이 이미 처리한다.
- 에러: 다른 브랜드 재료 id → `400 Ingredient not found for this buyer`

### C. 확장 — 공급처 목록 읽기 (쓰기는 금지 유지)
`routes/ingredient-seller-products.js` `ingredientBelongsToBuyer()` → **읽기 전용 헬퍼 분리**
| 메서드 | 매장이 자기 재료 | 매장이 **부모 브랜드 재료** |
|---|---|---|
| `GET /ingredients/:id/seller-sources` | 허용 | **허용(신규)** |
| `POST /ingredients/:id/seller-sources`, `PUT/DELETE /ingredient-seller-products/:id` | 허용 | **403 Brand-owned stock item is read-only** |

### D. 수정 — 입고 (IDOR + 공유행 오염)
`POST /api/restaurants/:restaurantId/inventory/receive` (+ `waste`/`adjust`/`initial` 동일 패턴)
- **소유권 검사 추가**: 재료가 이 매장 것이거나 부모 브랜드 것이 아니면 `404`.
- **분기**: 매장 소유 재료 → 기존대로 `ingredients.current_stock` 갱신. **브랜드 소유 재료 → `restaurant_ingredient_stocks` 오버레이 갱신**(브랜드 행 불변).
- PO 입고(`purchase-orders-workflow.js` `/receive`·`mark-received`)도 **같은 분기**. 가중평균 원가(`RestaurantIngredientCost`)는 기존 로직 유지.

### E. 하드닝 — 레시피 재료 소유권
`routes/recipes.js` RecipeIngredient 생성/수정 시 `ingredient_id`가 **(자기 매장 ∪ 자기 브랜드)** 재료인지 검증 → 아니면 `400`.

---

## ③ DB 설계 (3단계)

### 신규 테이블 1개 — `restaurant_ingredient_stocks`
브랜드 소유 재료에 대한 **매장별 실재고**. (단가는 이미 같은 패턴의 `restaurant_ingredient_costs`가 있다 — 재고도 대칭으로 둔다.)

| 컬럼 | 타입 | Null | 설명 |
|---|---|---|---|
| `id` | INT PK AI | NO | |
| `restaurant_id` | INT | NO | FK restaurants |
| `ingredient_id` | INT | NO | FK ingredients (**owner_type='brand' 행만 사용**) |
| `current_stock` | DECIMAL(10,2) | NO (0) | 이 매장의 실재고 |
| `last_stock_take_at` | DATETIME | YES | |
| `created_at`/`updated_at` | DATETIME | NO | |

- **UNIQUE(restaurant_id, ingredient_id)** — 매장×재료 1행 (멱등 upsert 키)
- 인덱스: 위 unique 1개면 충분(조회는 restaurant_id 선행) — MySQL 64-key 한도 고려해 추가 인덱스 없음
- **매장 소유 재료는 이 테이블을 쓰지 않는다** (기존 `ingredients.current_stock` 유지) — 이관 0건
- Soft delete 없음(하드 삭제, 재료 삭제 시 CASCADE 불필요 — 브랜드 재료 삭제는 BG만)

### 마이그레이션
- `scripts/migrate-restaurant-ingredient-stocks.js` — 멱등(`CREATE TABLE IF NOT EXISTS`), **데이터 이관 0**
- `scripts/migrations.registry.json` 에 `deploy` 로 등록 (fail-closed 게이트 통과 필수)
- 롤백: 신규 테이블이라 미사용 방치로 충분(기존 행 UPDATE 없음)

### 모델
- `models/RestaurantIngredientStock.js` 신규 + `models/index.js` association(`Restaurant.hasMany`, `Ingredient.hasMany`) + export

---

## ④ UI 흐름 (4단계)

신규 페이지·사이드바 메뉴 **없음**. 기존 3화면에 브랜드 재료가 자연스럽게 섞여 보이게 하는 것이 전부.

### 발주 — `PurchaseOrders/NewPurchaseOrderPage.tsx` (My Stock Items 탭)
- 매장 buyer면 `${buyerApiBase}/ingredients?include=sellers` **와 함께** `/api/restaurants/:id/brand-ingredients?include=sellers`를 호출해 **병합**(레시피 탭이 이미 쓰는 패턴 그대로).
- 브랜드 재료 카드/행: 이름 옆 **`Brand` 배지**(회색 outline, 장식 이모지 금지). 공급처 있으면 그대로 담기 가능.
- 공급처 미연결 브랜드 재료: "브랜드에 공급처가 연결되지 않았습니다" 안내 — **매장에는 연결 버튼을 주지 않는다**(읽기전용 원칙).
- 카드/리스트 두 보기 모두 동일(오늘 배포한 보기 전환과 호환).

### 재고관리 — `components/Inventory/*`
- 목록엔 이미 브랜드 재료가 나온다 → **`Brand` 배지 추가** + 표시 재고는 **매장 오버레이 값**.
- 입고/폐기/조정 모달은 브랜드 재료에도 **허용**(매장 실재고를 다루는 것이므로). 단 재료 자체 수정(이름/단위/삭제)은 **비활성**.

### 재료 탭 — `RecipeManagement/IngredientsTab.tsx`
- 이미 브랜드 재료가 병합돼 보인다 → 브랜드 항목의 **수정·삭제·공급처 연결/해제(오늘 추가한 ✕ 포함) 버튼을 숨김**(읽기전용). 매장 소유 항목만 편집 가능.

### i18n
`purchaseOrders` / `inventory` / `recipes` 네임스페이스에 4언어(en·ko·zh·ms): `brandShared`(Brand), `brandReadOnly`, `noBrandSeller`.

---

## ⑤ 구현 순서 (5단계)

| # | 파일 | 작업 |
|---|---|---|
| 5-1 | `models/RestaurantIngredientStock.js` + `models/index.js` | 모델·association·export |
| 5-2 | `scripts/migrate-restaurant-ingredient-stocks.js` + `migrations.registry.json` | 멱등 마이그 + 등록 |
| 5-3 | `routes/ingredients.js:588` | `include=sellers` + `current_stock`=매장 오버레이 |
| 5-4 | `routes/purchase-orders-crud.js` | `ingredientBelongsToBuyer` 브랜드 재료 허용(서버조회 brand_id) |
| 5-5 | `routes/ingredient-seller-products.js` | 읽기 허용 / 쓰기 403 |
| 5-6 | `routes/inventory-core.js` | receive·waste·adjust·initial: 소유권 검사(IDOR 수정) + 브랜드 재료 오버레이 분기 |
| 5-7 | `routes/purchase-orders-workflow.js` | PO 입고 2경로 동일 분기 |
| 5-8 | `routes/recipes.js` | 레시피 재료 소유권 검증 |
| 5-9 | 프론트 3화면 | 병합·배지·읽기전용 버튼 차단 |
| 5-10 | i18n 4언어 | 키 추가 |
| 5-11 | `scripts/health-check.js` | 회귀 6건 박제(§⑥) |

**Fable 게이트 대상**(CLAUDE.md 기준 ②돈·주문 ③마이그레이션 ⑤보안경계) → 구현 diff는 배포 전 Fable 점검.

---

## ⑥ 합격 조건 = 회귀 테스트 (6단계)

K-DINE with MIN(brand 2) / K-DINE IPC Branch(rid 8) 기준. **실호출로 증명**하고 health-check `pos`에 박제한다.

| # | 조건 |
|---|---|
| T1 | 매장 8의 재고·발주 API 응답에 브랜드 재료(is_active)가 **읽기전용**으로 포함. 그 행에 매장 토큰으로 PUT/DELETE → **4xx** |
| T2 | BG가 브랜드 재료에 공급처를 붙이면 매장 8의 `GET /ingredients/:id/seller-sources`에 **조회됨**. 매장이 `POST` → **403** |
| T3 | 매장 8이 브랜드 재료로 **PO 생성 성공**(계약 상속). **brand 1 재료 id → 400/404**, 매장 10 토큰으로 brand 2 재료 → **400/404** (형제 브랜드/타 매장 누출 0) |
| T4 | 입고 후: 매장 8 표시 재고만 증가, `ingredients` **브랜드 행 `current_stock` 불변**, `restaurant_ingredient_costs(8,:id)` 가중평균 갱신 |
| T5 | 매장 8 레시피에 브랜드 재료 참조 성공 + 타 브랜드 재료 id는 **거부**. 원가는 오버레이 우선 |
| T6 | 브랜드 레시피 45개의 재료 참조 267건이 **변경 전후 동일**(무접촉 증명) · `product_ingredients` 284건·매핑 302건 **불변** |

추가 게이트: `verify-all.js` 13/13 · `check-migration-registry` · `check-sensitive-diff`(Fable 판정) · 익명 401.

---

## 부록 — 함께 처리하는 별건 (같은 화면·같은 혼동의 원인)

Irene 지적 "Direct가 왜 Find Suppliers에 뜨고, 외부업체인데 왜 계약 안내가 뜨나":
1. **Direct → External(외부업체)** 명칭 변경 (4언어)
2. **Find Suppliers에서 외부업체 제외** — `supplier-directory.js:137-138`의 "내 외부업체 포함" 조건 제거. Find는 **솔루션 가입 공급업체를 찾아 계약 신청하는 곳**이라는 정의를 지킨다
3. **외부업체 프로필/상품 화면에서 계약 UI 숨김** — 자동 active 계약(`supplier-directory.js:920`)은 발주를 열어주기 위한 내부 장치일 뿐, 사용자에게 "Contract Active"로 보이면 안 됨
4. 운영 잔재 정리: 테스트 행 `__EDIT_DELETE_TEST__`(supplier_companies) 제거

> 확인된 사실: **외부업체는 유저 계정이 생기지 않는다.** 운영 외부업체 39곳 전부 `owner_id` NULL, 공급업체 역할 유저는 데모 1개뿐. (Irene 우려 → 실측으로 해소)

---

# 후속 ① — 브랜드 재료 실사 · 발주 제안 · 매장별 PAR (2026-07-13)

설계·판정: **Fable** · 구현: Opus · 상태: dev 검증 완료

> **한 줄**: 브랜드가 재료를 **표준화**하고, **PAR(발주점·리드타임·사용량)은 지점이 정한다.** 실사·발주 제안이 브랜드 재료를 포함하되 결과는 **그 매장에만** 반영된다.

## 왜 매장별 PAR 인가 (Fable 판정 B)

- **업계 표준**: 프랜차이즈 재고 시스템(Restaurant365·MarketMan·Toast 재고)은 예외 없이 "본사가 품목 카탈로그(정의·규격·공급처)를 표준화하고 **PAR/발주점은 지점별**"이다. 지점마다 좌석·회전율·배송 주기가 달라 소진 속도가 다르다. 본사 값은 **권장 초기값**의 의미만 갖는다.
- 브랜드 PAR 을 그대로 쓰면(안 A) 10석 매장과 100석 매장이 같은 발주점으로 알림·제안을 받는다 → 한쪽은 소음, 한쪽은 결품.
- 결정적으로 **`calculate-usage` 가 이미 브랜드 공유 행을 오염시키고 있었다** — 사용량 계산이 형제 매장 입고까지 합산하고 결과를 공유 행에 써서 **전 매장의 avg_daily_usage 를 덮었다.** 이걸 고치려면 어차피 매장별 저장소가 필요하다 → (B) 가 정답.

## 스키마 — 기존 오버레이 확장 (새 테이블 없음)

`restaurant_ingredient_stocks` 에 **nullable 오버라이드 컬럼 8개** 추가 (`NULL` = 브랜드 기본값 상속):
`last_actual_stock` · `min_stock` · `min_order` · `lead_time_days` · `safety_stock_percent` · `manual_daily_usage` · `avg_daily_usage` · `prediction_confidence`

- 오버레이 행 = "이 매장의, 이 브랜드 재료에 대한 로컬 상태"다. 재고량과 PAR 은 같은 `(restaurant_id, ingredient_id)` 단위 → 세 번째 테이블을 만들면 조인·findOrCreate 경로만 늘어난다. 기존 조회가 이미 이 테이블을 읽으므로 **추가 쿼리 0**.
- **⚠ `0` 은 유효한 오버라이드다** — 상속 판정은 반드시 `!= null` 로. falsy 판정하면 `min_stock: 0` 이 상속으로 오인된다.
- 마이그레이션은 기존 `migrate-restaurant-ingredient-stocks.js` 확장(멱등 ADD COLUMN). registry 재등록 불요.

## 규칙 (단일 소스 = `utils/brandStockAccess.js`)

| 헬퍼 | 역할 |
|---|---|
| `overlayMapFor` | 매장 오버레이 행 일괄 조회(재고 + PAR) |
| `effectiveSettings(ing, overlay)` | 브랜드 기본값 + 매장 오버라이드 병합 |
| `effectiveMinStock(ing, rid)` | 알림·발주점이 쓰는 이 매장 임계치 |
| `applySettings(ing, rid, patch)` | 브랜드 재료 → 오버레이 / 매장 재료 → 재료 행 |
| `applyStock(..., { recordActual })` | 실사 확정값(last_actual_stock)까지 기록 — 입고 경로는 기존대로 stockTake 만 |

**재료 정의(이름·단위·단가·공급처·삭제)는 여전히 브랜드 전용(403).** 매장이 바꾸는 것은 **재고와 PAR 뿐**이다.

## 바뀐 것

| 영역 | 변경 |
|---|---|
| 실사 생성 | 대상 = 내 재료 ∪ 부모 브랜드 재료(track_stock). 기대재고 = **매장 오버레이** |
| 실사 완료 | 브랜드 재료 → 오버레이에 반영(+`last_actual_stock`), 브랜드 행 불변 |
| 실사 IDOR | detail·items·complete·cancel 4곳 + 교차 항목 조작 차단 (**기존 결함**) |
| 발주 제안 | 브랜드 재료 포함 · 재고/PAR 은 매장 기준 · `is_brand_shared` 표식 |
| 발주 제안 공식 | 수동 사용량이 있으면 우선(par-level 과 통일 — 기존엔 발주 제안만 avg 만 봐서 Settings 수동값이 무시됐다) |
| 재고 목록·요약 | 부족/품절 판정이 **매장 임계치** 기준 |
| PAR 설정 저장 | 브랜드 재료도 저장 가능(403 해제) → **오버레이에** 저장. 재료 정의는 여전히 403 |
| `calculate-usage` | 트랜잭션 조회에 매장 스코프 추가 + 결과를 오버레이에 기록 (**형제 매장 오염 수정**) |
| 알림 임계치 | `stockAlerts` + 주문 자동차감 2곳이 매장 임계치 사용 |
| 프론트 | 브랜드 재료도 Settings 열림(안내 문구: 정의는 브랜드, PAR 은 이 매장) · 실사·발주제안에 `Brand` 표식 |

## 검증 (dev 실호출 29/29)

매장별 PAR 저장(브랜드 행 불변·형제 매장 무영향) · 목록/par-level/발주제안이 매장 PAR 사용 · 실사에 브랜드 재료 포함(기대재고=오버레이) · 완료 시 오버레이만 갱신 · 알림이 매장 임계치 기준 · 실사 IDOR 4종 404 · `calculate-usage` 가 브랜드 행 무변경 · 브랜드 재료 원본 완전 무변경.

회귀 박제: health-check `pos` — 기존 1건 갱신(PAR 은 이제 200 + 브랜드 행 불변) + **신규 3건**(실사 포함·오버레이 반영 / 발주 제안 매장 PAR / 실사 IDOR) → **30/30**.

## 발주 제안은 **두 곳**이다 (놓치기 쉬움)

| 라우트 | 화면 |
|---|---|
| `GET /inventory/reorder-suggestions` | 재고관리 대시보드 제안 목록 |
| `GET /purchase-orders/suggestions` | 재고관리 **Bulk Order 체크박스** + 발주 페이지 제안 패널 |

**둘 다 브랜드 재료를 포함해야 한다.** 한쪽만 고치면 "부족하다고 뜨는데 담을 수가 없는" 반쪽이 된다(Fable 적발).
⚠ `/purchase-orders/suggestions` 의 브랜드 분기에 **`min_stock > 0` SQL 필터를 걸면 안 된다** — 브랜드 행의 min_stock 은 0이고 실제 임계치는 매장 오버레이에 있다. 브랜드 쪽은 전부 뽑아 effective 값으로 거른다.

## 오너 승인과의 관계

브랜드 재료로 만든 발주도 **오너 승인 게이트를 그대로 탄다**(`docs/PURCHASE_ORDER_SYSTEM.md §G-5`). 재고 오버레이(입고·차감·실사)는 승인 상태와 무관하게 동작한다 — 단 **승인 대기 발주는 수령 불가**이므로 오버레이에 재고가 들어오지 않는다(정상).

## 알아둘 것 (경미)

- `calculate-usage` 는 브랜드 재료마다 오버레이 행을 `findOrCreate` 한다(current_stock 0으로 생성 — 무해).
- SettingsModal 에서 수동 사용량을 **비우면 `null` = 상속**이다. 브랜드가 값을 넣어둔 경우 매장이 "사용 안 함"을 표현하려면 **0을 입력**해야 한다(0은 유효한 오버라이드).
- health-check 의 실사 회귀는 대상 매장의 자기 소유 재료에도 `last_stock_take_at`/`last_actual_stock` 스탬프를 남긴다(수량은 불변, 원복하지 않음).


---

# 2026-08-20 — 브랜드 패키지 재고·판매 6건 설계 (운영 인수인계 DEV-HANDOFF-20260820 대응)

**작성:** Fable · **상태:** 설계 확정(실측 기반) — 구현은 `/배포`(멀티컨텍스트 배포) 후 P4→P2→P1→P3→P6 순.
**근거 실측:** 운영 DB 읽기 전용(2026-08-20). 원 인수인계: 운영 `docs/DEV-HANDOFF-20260820.md`.

## 결정적 실측 (문서 범위를 바꾼 것)

| 실측 | 값 | 귀결 |
|---|---|---|
| 주문 연동 차감 트랜잭션 | **전체 기간 0건** (30일 주문 1,557건인데) | "포장재 19종" 문제가 아니라 **자동 차감 전무** |
| 완료 전이 | 30일 1,440건 / 역대 14,318건 | 트리거(status='completed')는 정상 발화 중 |
| `products.recipe_id` 연결 | **전 운영 1건** | 근본 = 데이터 갭: 차감할 목록이 매번 빈다 |
| 레시피 실존 | 173개 (매장10=126 · 브랜드공용 45 · 매장13=2) | 레시피는 있고 **연결만 안 됨** |
| 이름 정확일치 자동연결 후보 | **91건** (활성 상품 754 중) | 일괄 연결 보조 도구 타당 |
| 레시피 재료 63개 중 배치 보유 | 8개 (55개 배치 0) | 연결해도 batch no-op 로 또 조용히 실패했을 것 |
| FIFO 구현 | **두 벌** (service + `inventory-extra.js:582` 복붙 쌍둥이) | 수동 차감 라우트도 같은 no-op 결함 공유 |
| P6 브랜드2 "43행 사용 중" | **전부 잔량 0** (매장8 오버레이 158행 중 재고>0 = 0) | 이관 불요 — 데이터 손실 위험 소멸 |

## P1. brand_products 중복 가드 — 계약 v2 (v1 기각 근거 포함)

v1(정규화 이름+SKU 409)은 운영 113행 실측에서 **검출력 0** — 실제 중복은 괄호 안이 통째로 다르고
(영문 규격 vs 한글 설명), 크기·규격 정보가 괄호 안에만 존재해 어떤 단일 문자열 규칙도 중복과 변형을
동시에 못 가른다. → **2단 가드**: 기계가 확신하는 것만 막고, 애매한 것은 사람에게.

1. **정확 일치(하드)**: `normalize(name)`=소문자·구두점 제거·공백 축약·**괄호 포함**. owner 스코프
   정확 일치 → 409 DUPLICATE + 기존 상품 반환, `force:true` 재등록 허용. **SKU 정확 일치는 force 불허.**
2. **변형 후보(소프트)**: `variantKey(name)`=normalize 후 괄호 구간 제거. 일치 → 409 SIMILAR_EXISTS +
   후보 목록, `force:true` 통과(로그). 실측: 실제 중복 20쌍 전부 검출, 진짜 변형(#45↔46 등)은 클릭 1회 비용.
3. 유사도 점수·퍼지 매칭 도입 금지(비결정·설명 불가). 정규화 단일 소스 = 서버
   (`GET /brand-products/similar?name=` — 프론트 실시간 제안도 이 API).
4. 신규 등록 `unit` 필수(400) — 조용한 'piece' 기본값 제거(운영 NULL 51건이 그 결과). 기존 데이터 무접촉.
5. **기존 20쌍 정리는 가드 소관 아님** → P6 판정표(쌍별 병합/변형 권고 + unit NULL 51건 단위 확정)로
   Irene/브랜드 확인 1회.

## P2. 브랜드 재고 뷰 — 합산 금지, 구분 표시

`GET /brands/:id/inventory`·`/summary` 응답을 `{ central, stores: [{restaurant_id, name, qty}] }` 구조로.
오버레이=정본 원칙 유지(본 문서 상단 설계 그대로). 합산 열은 UI 표시용으로만(이중계상 오해 방지 라벨).

## P3. 자동 차감 — 3층 수리 (범위 재구성)

**①층 데이터 갭(최대)**: 메뉴→레시피 연결 1건. 수리는 코드가 아니라 연결 작업.
- **일괄 연결 보조 도구**: `scripts/link-recipes-by-name.js --restaurant N --dry-run|--apply` —
  매장 스코프 정규화 이름 **정확일치만**(91건 실측), dry-run 이 사람이 검토할 표를 내고 확인 후 apply.
  **자동 적용 금지**(연결=차감 개시=돈·재고 무결성 — 사람 확인 필수).
- 브랜드 공용 레시피 45건은 **2차**(brand-menu sync 체계와 얽혀 별도 실측 후 — 이번 절단면 제외).
- 포장재(레시피 없는 소모품)는 기존 레시피 연결 메커니즘으로 v1 대응. 메뉴-포장재 자동 매핑은 백로그.

**②층 batch no-op(코드)**: 재고 원장은 **의도 수량만큼 항상 차감** — `newStock = currentStock -
actualDeductQty`(배치 커버리지와 무관), 배치는 있는 만큼만 소진, 트랜잭션 메타에 `batch_shortfall` 마커.
가짜 배치 자동생성 기각(원가·유통기한 회계 의미 오염). `applyStock` 이 중앙/오버레이 분기를 이미 처리.

**③층 무증상성(관측)**: 완료 주문에서 차감 대상이 0 이면 로그+카운터(`[INVENTORY] no-recipe-links`) —
몇 달 무증상의 재발 방지. health-check 에 "완료→차감 트랜잭션 생성" 계약 케이스 영구 등록.

**FIFO 단일화(②의 완결 조건)**: `inventory-extra.js:582` 사본 삭제 → 서비스 import 로 교체(diff 실측:
주석 외 동일). 사본을 남기면 수동 차감 라우트에 no-op 이 잔존한다.

## P4. 거래내역 스코프
`entity_type='brand'` OR (`entity_type='restaurant'` AND 소속 매장 id IN) + 매장명 표시.

## P5. 판매가 0원 59건
코드 작업 아님 — Irene 가격표 수신 후 검증 스크립트로 일괄 UPDATE(멱등, 사후 0원 잔존 0 확인).

## P6. 데이터 정리 (축소 확정)
- 실측으로 이관 절차 소멸(잔량 전부 0). **이력 행(stock_take 등)은 보존**(감사 데이터 — 삭제 금지).
- 절차: ①매장10 잔량>0 18행이 6/8 구배치 재료를 참조하지 않는지 확인(참조 시 그 재료는 비활성 보류)
  ②구 ingredient `is_active=0` + **상류 brand_products 동시 정리**(sync 부활 방지 — 순서 필수)
  ③P1 판정표(20쌍+unit 51건) Irene/브랜드 확인 후 반영. 운영 반영은 멱등 스크립트+백업+별도 승인.

## 재론 금지 가드
- `product_ingredients` ↔ `brand_products` **통합 금지** — 기존 Fable 기각 결정 유지(본 문서 상단).
  마진 계산용 소프트 참조 1필드는 백로그.
- 매장 재고 정본 = 오버레이(`restaurant_ingredient_stocks`) — P2/P3 전부 이 원칙 위에서.


## P2-구조 확정 — 브랜드 재고 화면의 소스 재정의 (2026-08-20 실측 후속)

**실측 확정 사실** (운영 전수): 재고 이동 59건 전부 판매미러(`ingredients`+오버레이) 경유, 매입마스터
(`product_ingredients.current_stock`) 경유 0건(>0 인 3건은 테스트 잔재). 브랜드 주체 발주 역대 0건.
입고 write 는 발주 라인 종류에 따라 3갈래(464/790: 매입마스터 · 507/895: 매장 오버레이 · 509/898: 판매미러).
**⇒ 사실상의 브랜드 중앙 원장 = 판매미러 + 오버레이. 브랜드 화면(useInventoryData brand 분기)만
빈 칸(매입마스터 재고)을 읽고 있었다** — 가짜 품절 알림 286건·"SC-450 이 0"·"min 0 알림"의 공통 뿌리.

**확정 구조 (순서 = 곧 구현 순서):**
1. **알림 소음 제거(전술)**: min_stock > 0 품목만 부족/품절 판정(임계 미설정 = 알림 없음). 프론트 소diff.
2. **화면 정직화(2섹션 분리)**: 브랜드 재고 화면을 ①"매입 자재"(product_ingredients 목록 유지 —
   BG Stock Items 단일소스 원칙 보존, 사용 이력 없는 재고 칸은 표시 제거) ②"매장 공급 상품"(판매미러
   기준 — **중앙/매장별 구분, 합산 금지**)으로 나눈다. 층을 섞지 않고 각 층을 그 층의 진실로 보여준다.
3. **소프트 링크(통합 아님 — 기각된 병합과 구분)**: `product_ingredients.linked_ingredient_id` 1필드.
   Irene 핵심 요구 "알림에서 발주 담기"의 **필수 전제**다 — 알림의 근거(실재고=판매층)와 발주 대상
   (매입층)이 다른 층에 있기 때문. 링크 생성은 자동 적용 금지: 레시피 연결과 동일하게 정규화 이름/SKU
   매칭 dry-run 표 → 사람 확인 → apply(멱등 스크립트).
4. **알림→발주 담기**: 링크 있는 품목은 실재고 기반 알림에서 매입층 발주 장바구니(cart_key·staging)로.
   링크 없는 품목은 담기 버튼 대신 "연결 필요" 표시(조용한 오동작 금지).

**하지 않는 것**: 입고 3갈래 write 구조 리팩토링(각 갈래는 자기 층에는 정합. 브랜드 주체 발주가 실사용
0건인 지금 돈 경로를 손대는 이득 없음 — 브랜드 발주가 실제로 쓰이기 시작할 때 재검토) · 층 병합(기각
유지) · 매입마스터 재고 칸의 데이터 정리(테스트 잔재 3건 — 운영 데이터 정책은 운영 몫).

**18건 0화 마이그 주석**: 브랜드 발주 0건 실측으로 긴급도는 낮아졌으나 판정 불변 — 사본 0화는 여전히
옳고(가짜 중앙값 제거), 멱등·화면 무영향이 실측돼 v3.75 에 실려 나간다.
