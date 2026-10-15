# [Fable 설계] 카탈로그 카드 «Add to My Stock» · «Add as menu / Add as product» — 사는 것과 파는 것의 구분 (2026-10-15)

> Fable 판정 문서. 팀원이 전달한 사실(Irene 원문 · 코드 위치 · 개발 DB 실측 5건)을 읽고 코드를 직접 대조해 썼다. 코드 변경 0.
> 호출 조건: `design`(여러 화면이 같은 규칙을 나눔 · 재료·상품 구조 — `docs/TRADE_STRUCTURE.md` §2-1 에 닿음). 끝난 뒤 `gate` 1회(재고·판매 구조 접촉 + 같은 폴더의 다른 방 미커밋 위에 얹음). 한 사안 2회로 끝낸다.
> 단일 기준: `docs/TRADE_STRUCTURE.md` §2-1 «프로덕트는 둘 중 하나» · §5-2 «사는 것 = Stock Item» · §2-2 다섯 칸(오늘 D4). 이 설계는 기준을 **바꾸지 않는다** — 기준이 안 닿아 있던 문 하나를 기준에 맞춘다.

## 0. 한 줄 결론

Irene 의 세 물음은 **한 결함**에서 나온다: 카탈로그 카드의 두 버튼이 **같은 물건을 서로 다른 구조로 만들고**, «이미 담았나(Linked)» 판정은 그중 **한 구조(재료 연결)만 본다.**

- «Add to My Stock» → 재고아이템 + 판매자 연결(`ingredient_id`). 판정이 이걸 본다 → Linked → 두 버튼 모두 사라진다. (Q1 «없어져?» = **지금 그렇다.** 결과는 맞는데 이유가 우연이다.)
- «Add as menu / Add as product» → **재고아이템을 만들지 않고** 자기 수량을 가진 메뉴/프로덕트(`products.current_stock` · `brand_products.current_stock`)에 판매자를 붙인다(`product_id` / `brand_product_id`). 판정이 이걸 **안 본다** → 카드가 계속 «안 담은 것»처럼 보이고, 이어서 «Add to My Stock» 을 누르면 **같은 물건 두 줄**, «Add as menu» 를 또 누르면 **메뉴 두 개**(실측 2·4). (Q2 «재고아이템에도 추가하고 메뉴에도 추가하는 거 맞아?» = **아니다, 지금은 메뉴만 만든다.** Irene 이 말한 모델이 맞고, 코드가 거기 못 미친다.)
- 브랜드 구매자는 판정 자체가 **잘못된 표**를 본다(`ingredients.brand_id` 를 보는데 브랜드 재고는 `product_ingredients` 에 산다) → 브랜드 카드는 **무엇을 해도 Linked 가 안 뜬다**(실측 4). (Q3 «제대로 구분이 되는 건지» = **라벨은 구분되는데(매장 menu · 브랜드 product) 구조와 판정이 구분을 못 따라간다.**)

**고치는 법 = 문을 하나로 모은다.** 「판매자에게서 사는 물건은 우리 쪽에서 **항상 재고아이템**이고, 메뉴/프로덕트는 그 재고아이템을 **그대로 가리킨다**(§2-1 첫째 꼴 · `products.ingredient_id` / `brand_products.product_ingredient_id`).」 따라서 **«Add as menu/product» = «Add to My Stock» + «Also sell as menu/product»** 한 트랜잭션이고, 「이미 담았나」는 **네 연결 칸을 모두 보는 판정 하나**가 된다. 새 표·새 목록·새 길 0.

## 1. 코드 대조로 확인한 사실

| # | 사실 | 위치 |
|---|---|---|
| F1 | 카드의 두 버튼은 모두 `!p.already_mapped` 일 때만 보인다. 판정은 서버 `already_mapped` 하나 | `NewPurchaseOrderPage.tsx:2556·2567` |
| F2 | `already_mapped` 는 `ingredient_seller_products.ingredient_id ∈ 내 ingredients` 만 본다. `product_id`·`brand_product_id`·`product_ingredient_id` 연결은 **읽지 않는다** | `supplier-directory.js:742~793` |
| F3 | 브랜드 구매자(`buyerEntity.type==='brand'`)의 «내 재고» = `Ingredient.where({brand_id})` = **브랜드 거울**. BG 가 from-catalog 로 만드는 것은 `ProductIngredient` → 교집합 0 → 브랜드는 영원히 `already_mapped=false` | `supplier-directory.js:744·749` vs `product-ingredients.js:459~476` |
| F4 | 매장 `new_product` → `Product.create({current_stock:0, …})` + 연결 `product_id`. 재료 행 0. 카테고리 `'Uncategorized'` 고정 | `restaurantCatalogLink.js:127~158` |
| F5 | 브랜드 `new_product` → `BrandProduct.create(…)` + 연결 `brand_product_id`. 재고아이템 0. **`BrandProductBrand` 0행**(어느 브랜드도 이 프로덕트를 팔지 않는 상태 — 매장 카탈로그에 안 보인다). 같은 일을 하는 `register-as-product` 는 `BrandProductBrand.findOrCreate` 를 한다 | `product-ingredients.js:396~427` vs `1222~1232` |
| F6 | 「재고아이템 → 그대로 팔기」 문은 이미 둘 있다: 매장 `register-as-product`(×1 **레시피** 생성 · 중복 검사 = 레시피 경로만) · 브랜드 `register-as-product`(×1 레시피 · 중복 검사 = **직접 연결 ① + 레시피 ②**) · 브랜드 프로덕트 창 `POST /brand-products/:id/stock-item`(**직접 FK** `product_ingredient_id` + 재고아이템 생성 + 판매자 연결 — 이미 «프로덕트 + 재고아이템 한 번에» 를 하는 선례) | `restaurants-ingredients.js:376~477` · `product-ingredients.js:1109~1246` · `brand-products.js:1487~1625` |
| F7 | 직접 FK 의 차감 경로는 둘 다 살아 있다: 매장 판매 → `inventoryDeductionService.js:204 prodForDirect.ingredient_id` · 브랜드 출고 → `seller-orders.js:802 bp.product_ingredient_id` | — |
| F8 | 매장 메뉴 직접 FK 의 소유 판정 단일 소스 `isIngredientInScope` = 매장 소유 **또는 부모 브랜드 공유 재료**. 매장 `register-as-product` 는 매장 소유만 허용(더 좁다) | `menu.js:108~119` vs `restaurants-ingredients.js:396` |
| F9 | 재고아이템 목록의 «이미 판다» 표시(`sold_as_product`)는 **브랜드만** 있다(직접 FK 기준). 매장 재료 목록엔 없다 | `product-ingredients.js:172~185` |
| F10 | 매장 `register-as-product` 의 중복 검사는 레시피 경로만 → 직접 FK 로 팔고 있는 재료에 «Also sell as menu» 를 또 누르면 **메뉴 두 개**(브랜드 쪽은 09-15 에 같은 사고를 겪고 ① 을 넣었다) | `restaurants-ingredients.js:401~428` |
| F11 | `stock-products` 목록(발주 화면 «내 재고» 탭의 자체재고 프로덕트 줄)은 **직접 FK 가 걸린 프로덕트를 이미 제외**한다 — «그 재고아이템 줄이 곧 이 물건» | `restaurants-ingredients.js:495` · `product-ingredients.js:265` |
| F12 | 개발 DB 활성 연결: ingredient 51 · product **0** · product_ingredient 10 · brand_product **0**. 자체재고 프로덕트 연결은 개발에 하나도 없다. 운영은 못 셈 | 팀원 실측 5 |

**§2-1 대조.** Irene 09-04 원문 「프로덕트=재고아이템 or 프로덕트=레시피=재고아이템」 · 「그냥 재고아이템 바로 연결하는 건데. 그대로 메뉴이고 그대로가 프로덕트인데」. 자체 수량을 가진 메뉴/프로덕트에 **판매자를 직접 붙이는 것**(F4·F5, 2026-09-02 P3-②)은 §2-1(09-04) **이전** 설계다. §2-1 뒤로는 직접 FK 가 그 자리를 맡았고(F6 브랜드 프로덕트 창 · F11), 오늘 Irene 의 세 물음은 그 둘이 한 화면에 함께 있어서 생겼다. 「사는 것 = Stock Item」(§5-2) 과 「메뉴/프로덕트 = 재고아이템 그대로」(§2-1) 를 그대로 적용하면 P3-② 자체재고 문은 **새로 만들 이유가 없다.**

## 2. 갈래 — 결정

**D1. 판매자 상품을 메뉴/프로덕트로 등록하는 것 = 재고아이템 + 직접 FK. 한 함수, 두 문.**
- 서버 공용 함수 `sellStockItemDirect`(이름은 팀원 재량, 위치 `services/`): 입력 = 재고아이템 행 · 판매가 · 이름 · (매장) 카테고리 / (브랜드) brand_id. 하는 일 = **중복 검사 두 단계**(① 직접 FK 로 이미 파는 프로덕트 → 409 `ALREADY_A_PRODUCT` + 그 이름 · ② 그 재고 하나만 쓰는 ×1 레시피 프로덕트 → 409 같은 코드) → `Product.create({ingredient_id})` / `BrandProduct.create({product_ingredient_id}) + BrandProductBrand.findOrCreate`. 판매가 필수(`PRICE_REQUIRED`, 공급가 복사 금지 그대로). 레시피는 **만들지 않는다**(§2-1 첫째 꼴 «그대로»).
- 소유 판정은 **기존 단일 소스를 쓴다**: 매장 = `menu.js isIngredientInScope`(export) · 브랜드 = `owner_user_id === bgOwnerId`. 매장 `register-as-product` 의 «매장 소유만» 은 이 규칙으로 넓어진다(부모 브랜드 공유 재료도 메뉴로 그대로 팔 수 있다 — `menu.js` 가 이미 허용하는 범위). 화면의 브랜드 거울 숨김(`isItemReadOnly`)은 **그대로 둔다**(UI 는 이번 범위 밖 · 되돌리기 쉬움).
- **문 ①** 카탈로그 «Add as menu / Add as product» = from-catalog 의 `new_product` 가지 → ⒜ 기존 재고아이템 생성 흐름 그대로(이미 연결돼 있으면 그 재고아이템을 **재사용** — `findAlreadyLinked` · 브랜드 상품이면 거울 `shareProductToBrand` · 오늘 D4 다섯 칸 복사) ⒝ 그 재고아이템으로 공용 함수. **한 트랜잭션.** 응답 `201 {ingredient, mapping, product, created:{ingredient:bool, product:true}}`. ⒝ 가 409 면 전체 롤백하고 409(이미 재고도 있고 이미 팔고 있다 — 사람에게 이름을 보여 준다).
- **문 ②** 재고 목록 «Also sell as menu / Also sell as product»(`register-as-product` 2벌) → 공용 함수 호출로 바꾼다(×1 레시피 생성 → 직접 FK). 요청·응답 모양은 그대로(`{price, name, brand_id}` → `201 {product}`; `recipe` 칸은 이제 없음 — 화면은 안 읽는다, 팀원이 `RegisterAsProductModal` 에서 확인).
- 이미 ×1 레시피로 걸린 기존 프로덕트는 **그대로 둔다**(§2-1 둘째 꼴, 적법). 백필·전환 없음.
- ⛔ 자체재고 메뉴/프로덕트를 **새로 만드는 길은 닫힌다**(F4·F5 가지 삭제). `existing_product_id` · `existing_brand_product_id` 연결 모드와 `stock-products` 목록은 **남긴다** — 운영에 있을지 모르는 기존 자체재고 프로덕트가 발주를 계속 할 수 있어야 한다(D5).

**D2. 「이미 담았나」 = 네 연결 칸을 모두 보는 판정 하나.**
- `utils/catalogLink.js` 에 `linkedSellerProductMap(buyerEntity)`(이름 재량): 구매자의 재고·판매 행 네 집합(매장: `ingredients(restaurant_id)` + 부모 브랜드 거울(지금 규칙 그대로) + `products(restaurant_id)` / 브랜드: `product_ingredients(owner_user_id = 소유자)` + `brand_products(owner_user_id)` + 지금 보는 `ingredients(brand_id)` 거울 / 푸드코트: 지금 그대로) → `ingredient_seller_products` 활성 행 중 네 칸 어느 하나가 그 집합에 드는 것 → `{seller_type}{seller_product_id} → {kind, id}`.
- `GET /api/supplier-catalog` 는 이 함수로 `already_mapped` 를 채운다. `mapped_ingredient_id` 는 **그대로**(kind 가 ingredient 일 때만 값, 아니면 null — 카드 더블클릭 `incCartQty` 가 재료 id 를 쓴다) + `mapped_target: {kind, id}` 추가.
- 브랜드 구매자의 소유자 id: 라우트가 `req.buyerEntity`(brand id) 만 가진다 → 브랜드 → `brands.owner_id`(다중 소유면 `brandOwnerUserIds`) 로 PI·BP 를 찾는다. `product-ingredients.js` 가 쓰는 `req.bgOwnerId` 와 **같은 사람**이어야 한다(팀원이 `requireBGScope` 의 소유자 결정식과 대조해 같은 유틸을 쓸 것).
- 효과: 매장·브랜드 모두 어느 버튼을 눌러도 카드가 Linked 가 되고 두 버튼이 사라진다. 기존 자체재고 프로덕트(운영에 있다면)도 Linked 로 보인다 → 두 줄 재발 차단.

**D3. Linked 뒤 카드의 «Add as menu» 는 숨긴 채 둔다(지금 동작 유지). 파는 일은 재고아이템 쪽 문(②)에서.**
- 카탈로그 카드 = **사는 쪽** 입구. 담았으면 그 카드의 일은 끝(배지 Linked · 클릭 = 장바구니). 「그대로 팔기」는 재고가 사는 자리(재고 목록 «Also sell as …»)에서 한다 — 한 일에 한 자리. 카드에 두 번째 «팔기» 문을 남기면 카탈로그가 매번 «이미 파나» 까지 조회해야 하고, 같은 버튼이 두 화면에서 다른 뜻이 된다.
- Linked 배지 title 에 어디에 붙었는지 한 줄(«Linked to stock item ‹이름›» / «Sold as ‹이름›»)은 **선택** — `mapped_target` 으로 가능하다. 되돌리기 쉬운 UI 라 팀원 재량.

**D4. 매장 재료 목록에도 «이미 판다» 표시 — 브랜드와 같은 규칙.**
- `GET /restaurants/:rid/ingredients` 에 `sold_as_menu: {id, name} | null` = `products.ingredient_id = 재료 id AND is_active`(브랜드 `sold_as_product` 와 같은 모양). `IngredientsTab` 은 값이 있으면 버튼 대신 «Sold as: ‹이름›»(브랜드 `ProductIngredientsTab:1112` 와 같은 모양). F10 의 메뉴 두 개 사고가 화면에서도 막힌다(서버는 D1 ① 이 막는다).

**D5. 기존 자체재고 프로덕트 연결(`product_id` · `brand_product_id`) — 손대지 않는다. 운영 건수만 센다.**
- 개발은 0·0. 운영은 읽기 허락이 없어 못 셌다 → 읽기 전용 스크립트 `scripts/report-self-stock-product-links.js`(활성 `ingredient_seller_products` 중 `product_id`/`brand_product_id` 가 있는 행 수 · 그 프로덕트 이름)를 `운영검증` 때 돈다. **0 이면** 다음 정리 때 연결 모드·`stock-products` 목록도 지울 수 있다(별건). 0 이 아니면 그대로 둔다 — 데이터로 재고아이템을 만들어 옮기는 것은 사람이 화면에서 할 일(같은 물건 두 줄 금지의 반대편 사고를 기계가 만들지 않는다).

**D6. 문구 — 라벨은 지금대로(매장 menu · 브랜드 product), 설명만 사실로.**
- `newProduct.desc` · `newMenu.desc`(«stock lives on the item itself …») 는 D1 뒤 **거짓**이 된다 → «A stock item is created (or reused) and this menu/product sells it as-is — purchases add to the stock item, one sale takes 1 ‹unit› from it.» 뜻으로 4개 언어. `addAsMenuHint` · `addAsProductHint` 도 같은 뜻 한 줄. 키는 바꾸지 않는다(`RegisterAsProductModal` 이 같은 키를 쓴다 — 번역 두 벌 금지).
- 푸드코트는 판매 타깃이 없다 → «Add to My Stock» 만(지금 그대로).

**D7. 서비스 상품(`product_kind='service'`).** 재고아이템 생성 흐름이 종전대로 매장 줄을 만들므로 메뉴도 그 줄을 가리킨다. 차감은 재고 무접촉 규칙이 그 줄에 걸려 있다. 특별 분기 없음.

## 3. 절단면 — 순서 (프론트 빌드 1회)
1. 서버 — 공용 함수(D1) + `menu.js isIngredientInScope` export · `register-as-product` 2벌을 공용 함수로(문 ②) · health-check: 매장·브랜드 각 «재고 → 그대로 팔기 → 직접 FK · 다시 누르면 409».
2. 서버 — from-catalog 2벌의 `new_product` 가지를 ⒜+⒝ 로(문 ①) · 자체재고 생성 코드 삭제 · health-check: 매장·브랜드 각 «Add as menu/product → 재료 +1 · 프로덕트 +1(직접 FK) · 연결은 재료 칸 · 브랜드는 `BrandProductBrand` 1행» · «Add to My Stock 뒤 Add as menu → 재료 +0 · 프로덕트 +1».
3. 서버 — `linkedSellerProductMap`(D2) · 카탈로그 라우트 교체 · `mapped_target` · health-check: 브랜드 구매자 Add to My Stock → `already_mapped=true`(**고장주입**: PI 집합을 빼면 false 로 떨어져야 함) · 매장 Add as menu → true.
4. 서버 — 매장 재료 목록 `sold_as_menu`(D4) · 보고 스크립트(D5, 쓰기 0).
5. 프론트 — `NewPurchaseOrderPage` 응답 모양(`product` 포함) · `IngredientsTab` «Sold as» · `RegisterAsProductModal` `recipe` 미참조 확인 · i18n 4언어(D6).
6. build:dev 1회 → verify-all --full 1회 → 클릭 흐름 1회(데모 38 카탈로그: Add as menu → Linked · 재고 목록에 «Sold as» · 메뉴 목록 «Stock Item (direct)») → check-sensitive-diff → **Fable gate 1회**.
- 🔒 인쇄 8파일 · KDS 무접촉. 같은 폴더 다른 방의 미커밋 변경(`NewPurchaseOrderPage` · `restaurantCatalogLink` · `product-ingredients` · `supplier-directory`) **위에 얹는다** — 그 방이 끝나기 전에 같은 파일을 고치지 않는다(공용 규칙 «한 솔루션 한 방»). 운영 쓰기 0.
- 인스펙션 `ingredient-unification` 008(레시피 FK + 재고 FK 동시 0) 은 직접 FK 만 세우므로 그대로 통과해야 한다 — gate 때 숫자 확인.

## 4. 증명 기준 (gate)
① 매장(데모 38 · supplier 20 상품 하나): Add as menu → `201` · `ingredients +1` · `products +1 (ingredient_id = 그 재료, recipe_id null)` · `ingredient_seller_products +1 (ingredient_id)` · 카탈로그 `already_mapped=true` · 같은 요청 다시 → `409 ALREADY_A_PRODUCT` · 그 재료에 «Also sell as menu» → `409` · 재료 목록 `sold_as_menu` 값 · 메뉴 1개 판매 주문 → 그 재료 `current_stock −1`(F7 경로 실호출).
② 브랜드(데모 브랜드 10): Add as product → `product_ingredients +1` · `brand_products +1 (product_ingredient_id)` · `BrandProductBrand 1행` · 카탈로그 `already_mapped=true`; Add to My Stock 먼저 → 카드 Linked(두 버튼 숨김) → API 로 new_product → 재고 +0 · 프로덕트 +1.
③ 고장주입: D2 에서 PI 집합 제거 → 브랜드 `already_mapped=false` 로 떨어져 health-check 실패 · D1 ① 제거 → 두 번째 등록이 201 로 통과해 실패.
④ 회귀: 자체재고 프로덕트 `existing_product_id` 연결 모드 200 그대로 · `stock-products` 목록 모양 그대로 · health-check 전체 · 인스펙션 008/009 0건 · 만든 행 전부 삭제.

## 5. Irene 에게 — 결정 요청

이 설계 안에 되돌리기 어려운 선택은 하나다. 나머지는 Fable 이 정했다(§2-1 적용).

- **질문:** 카탈로그 «Add as menu / Add as product» 가 지금은 재고아이템 없이 자기 수량을 가진 메뉴/프로덕트를 만든다(2026-09-02 설계). 이것을 **«재고아이템 + 그 재고아이템을 그대로 파는 메뉴/프로덕트»**(Irene 10-15 원문 · §2-1 «메뉴 = 재고아이템» · §5-2 «사는 것 = Stock Item») 로 바꾸고, 자체재고 메뉴/프로덕트를 **새로** 만드는 길은 닫는다(기존 것은 그대로 둔다).
  - (가) 바꾼다 — 매장·브랜드 어느 버튼을 눌러도 재고는 재고아이템 한 곳, 카드는 Linked, 두 줄·메뉴 두 개 재발 0. 재고 목록 «Also sell as» 도 같은 꼴(직접 FK)이 된다.
  - (나) 지금 구조를 두고 판정(D2)만 고친다 — 두 줄은 막히지만 「메뉴 추가」 가 재고아이템을 안 만드는 채로 남고, 그 메뉴는 레시피 재료로 못 쓰고, 「같은 물건이 두 구조」 가 계속 네 칸 판정을 요구한다.
  - **Fable 권고: (가).** Irene 이 오늘 말한 모델이 §2-1 그대로이고, 그 구조로 가는 코드(직접 FK · 차감 경로 · 브랜드 프로덕트 창 선례)가 이미 다 있다. (나)는 판정만 늘리고 구조는 둘로 남긴다.
  - **카탈로그의 «메뉴/프로덕트 추가» 를 «재고아이템 + 그대로 파는 메뉴/프로덕트» 로 바꿀까요?**

## 6. 자기 점검
- 자체재고 프로덕트 연결은 개발 0·0 이라 전환 비용은 없다. 운영은 못 셌다 → D5 보고 스크립트.
- `register-as-product` 가 레시피 → 직접 FK 로 바뀌는 것은 §2-1 둘째 꼴에서 첫째 꼴로 가는 것 — 둘 다 적법하고, 09-15 브랜드 중복 사고(F6 ①)가 보여 주듯 직접 FK 가 이미 «그대로 파는» 자리를 맡고 있다. 기존 ×1 레시피 프로덕트는 건드리지 않는다.
- Fable 안 씀 범위 밖: D3·D6 는 UI·문구라 팀원 재량. gate 는 재고·판매 구조와 다른 방 미커밋 위 얹기 때문에 1회 필요.
