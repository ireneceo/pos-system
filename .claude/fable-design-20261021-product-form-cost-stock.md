# [Fable 설계] 상품 등록 창의 원가·재고 자리 — 브랜드 제너럴 · 공급업체 (2026-10-22)

> 요청서 `.claude/fable-request-20261021-product-form-cost-stock.md` · 작업방 669bfa10
> 판정자 Fable · 읽기·개발 DB 읽기만 했다(코드 수정 0 · 운영 쓰기 0).
> 기준 문서: `docs/TRADE_STRUCTURE.md` §2 · §2-1 · §2-2 · §5-7 · §5-12 · `services/costSync.js` 머리 주석 · `.claude/fable-design-20261005-moq-product-form.md` §4-C·§4-D · `.claude/fable-design-20261015-catalog-add-menu.md` D1.

## 0. 호출 조건 판정

- **design** — 한 값(원가·재고 수량)을 두 화면(상품 창 ↔ 재고아이템 창)이 같은 규칙으로 나눠 쓰는 구조 결정. 자리를 잘못 두면 «같은 물건 두 줄»(2026-06-08·07-05 사고)의 재고 판이 된다.
- 구현 뒤 **gate 1회** — 재고 수량·원가를 쓰는 변경(장부 `stockLedger` 호출 추가 · 원가 재계산 호출 추가). `check-sensitive-diff.js` 의 money 패턴은 라우트 파일(`brand-products.js`·`product-ingredients.js`)을 안 잡으므로 **④ 자기평가로 gate 대상**이라고 팀원이 보고에 적는다.
- 한 사안 2회(설계 1 + 검증 1) 안.

## 1. 한 줄 결론

**원가도 재고도 «재고아이템 한 곳»에 산다. 상품 창은 그 칸을 보여 주고 고치는 창이지 두 번째 저장소가 아니다.** 브랜드 상품 창의 재고 칸은 «Stock Item (direct)» 블록 안으로 옮기고, 거기에 원가 칸을 붙인다. 재고아이템을 같이 만들 때 넣은 수량·원가는 **그 재고아이템**에 들어가고(지금은 상품 자체 재고에 남는다 — 결함), 연결하는 순간 상품 자체 재고는 장부로 0 이 된다. 공급업체 창에는 원가 칸을 만들지 않는다(칸도, 읽는 곳도 없다) — 재고는 등록 때 «개시 재고» 한 칸만.

## 2. 코드·DB 실측으로 보탠 사실 (팀원 실측 1~4 에 추가·정정)

- **F1. 수량이 상품에 남는 원인은 두 군데.** ① 화면 `submitProduct`(`BrandProductsTab.tsx:781`)가 `createStockItem` 체크와 무관하게 `current_stock` 을 `POST /brand-products` 에 보낸다 → 서버가 상품 자체 재고 장부 `initial` 로 적는다(`brand-products.js:1047~`). ② `POST /brand-products/:id/stock-item`(`:1487~`)은 수량을 **받지 않고**(`current_stock: 0` 고정) 연결 뒤 상품 자체 재고를 **비우지도 않는다.** PUT 길(`:1292~`)만 `nextSelfStock = 0` + 장부 `adjustment` 로 비운다 — 옮기는 게 아니라 0 으로 만든다. dev 실측: 다이렉트 연결 3건 중 자체 재고>0 **1건**(= 시험 13810, 장부 `initial` 1줄만 있음).
- **F2. 요청서의 «원가는 Where do we buy this? 에서 costSync 로 채워짐» 은 틀렸다.** 그 버튼은 `ConnectSellerModal` → `POST /product-ingredients/from-catalog` + `existing_product_ingredient_id` → `catalogLink.connectExisting`(`catalogLink.js:164~`)인데 **매핑만 만들고 `recomputeUnitCost` 를 부르지 않는다.** costSync 를 부르는 연결 문은 `POST /product-ingredients/:id/seller-sources`(`:1412`, `onlyIfZero`) 하나뿐이고 이건 재고아이템 화면의 문이다. `/stock-item` 의 `seller_source` 가지도 같은 누락. 그래서 상품 창 안에서 공급업체를 붙이면 «We buy» 줄(매핑 사본 `unit_price`)은 보이지만 **재고아이템 `unit_cost`(레시피·장부 금액·마진 카드 폴백이 읽는 값)는 0 그대로**다. dev 에서 «원가 0 + 출처 있음» 2건은 다른 사유(판매가 0 · piece↔l 비호환)라 이 문으로 생긴 행의 증거는 dev 에 없다 — 코드로 확정.
- **F3. 원가 손입력 규칙은 이미 있다.** 재고아이템 창(`ProductIngredientsTab.tsx:749~766`)이 ① `unit_cost` 는 **바뀐 때만** `PUT /product-ingredients/:id` 에 싣고 ② 수량은 `POST /:id/adjust-stock {new_quantity, transaction_type:'adjustment', reason:'Edited in stock item form'}` 로 따로 보낸다. PUT 은 `syncMirrors`(`:793`)로 거울까지 옮긴다(0 은 안 옮김). 상품 창은 **이 두 호출을 그대로 쓴다** — 새 규칙 0.
- **F4. 두 재고의 단위가 다르다.** 재고아이템 재고 = **취급단위**(`unit`, §2-2 «재고는 어디서나 취급단위로 센다») · 상품 자체 재고 = **주문 단위(pack 수)**(§5-12 A). 7 pack ≠ 7 g. 그래서 «자체 재고 → 재고아이템 자동 이전» 은 환산을 지어내야 한다 → 하지 않는다(§5-7 «자동으로 붙이지 않는다» 와 같은 결).
- **F5. 수정 창에 연결된 재고아이템의 재고가 안 보이는 직접 원인** = `GET /brand-products*` 의 `stockItem` include 가 5곳 모두 `['id','name','unit','base_quantity','unit_cost']` 뿐(`brand-products.js:768·863·1099·1300·1429`). `current_stock`·`package_unit` 이 없다. 화면 `productIngredientsList`(`:560`)도 `{id,name,unit,unit_cost}` 만 남긴다.
- **F6. 공급업체.** `supplier_products` 에 원가 칸 없음(`SHOW COLUMNS LIKE '%cost%'` = 0) · 공급업체 화면에서 원가를 읽는 곳 0(마진·레시피 없음) · 건별 원가는 입고 기록 `supplier_inventory_transactions.unit_cost` 에만. 재고는 상품 행 자체(`current_stock`), 조정은 `POST /supplier-inventory/adjust`(`manual_adjust` 기록) · 입고는 `/receive`. **`PUT /supplier-products/:id` 는 `current_stock` 을 거래 기록 없이 직접 쓴다**(`supplier-products.js:766`) — 화면은 안 보내므로 API 문만 열려 있다. ENUM 에 `'initial'` 있음. dev: 공급업체 상품 43 중 재고>0 11.
- **F7. dev 수치(2026-10-22 SELECT):** 브랜드 상품 46 · 다이렉트 3 · 미연결+자체재고>0 2 · 재고아이템 30 중 원가 0 12(출처 없음 10) · 다이렉트 연결 재고아이템 중 원가 0 1(시험 6267). 운영은 미측정(§5-7 그대로).
- **F8. 범위 밖이지만 적어 둔다.** 사람이 PUT 으로 고친 원가는 `cost_change_logs` 에 남지 않는다(이력은 `costSync.logCostChange` 한 곳만). 기존 사실이고 이번에 건드리지 않는다.

## 3. Irene 원문 → 답

> «브랜드제너럴이랑 공급업체가 상품추가할 때 원가도 여기서 넣게하고 동기화하면 되지 않아?»

- **브랜드: 예.** 다만 «여기서 넣는다» 의 저장 자리는 상품이 아니라 **연결된(또는 같이 만드는) 재고아이템의 `unit_cost`** 다(§2 «원가는 2경로» · §2-3 브랜드 층 = `product_ingredients.unit_cost`). 상품 창에 원가 칸을 두되 그 칸이 재고아이템 칸을 **그대로 읽고 쓴다** — 동기화할 두 번째 값이 생기지 않는다. 공급업체를 붙이면 그 가격이 들어오고(F2 수정 뒤), 공급업체가 가격을 바꾸면 따라간다(이미 있음).
- **공급업체: 아니오(권고).** 원가 칸이 없고, 만들어도 읽는 화면이 없다. 읽는 곳 없는 칸은 «같은 개념의 새 목록» 과 같은 종류다(CLAUDE.md «기존 개념에 새 목록·경로를 만들지 않는다»). 공급업체 마진이 필요해지면 `TRADE_STRUCTURE.md` §2 에 «공급업체 원가 층» 을 먼저 적고 별도 설계 1회.

> «스톡수량 넣으면 동기화되는지 확인해줘»

- **지금은 안 된다**(F1). 넣은 7 이 상품 자체 재고에 앉고 재고아이템은 0 이다. §4-D2 로 고친다.

> «이 스톡수량은 스톡상품의 경우에 적용되니 아래 스톡연결하는 곳에 있어야 하는 거 아니야?»

- **맞다.** 재고 칸을 «Stock Item (direct)» 블록 안으로 옮기고, 연결 상태에 따라 «누구의 재고인가» 를 라벨이 말하게 한다(§4-D1). 상품 종류 바로 아래의 지금 자리는 없앤다.

> «Edit Product 체크해»

- 연결된 상품을 열면 재고 칸이 사라지고 재고아이템 재고가 어디에도 안 보인다(F5). §4-D3 로 서버가 내려주고, D1 의 C 상태 칸이 보여 주고 고친다.

## 4. 설계 — 결정 D1~D7

### D1. 브랜드 상품 창 — «재고» 는 Stock Item (direct) 블록 하나에 모은다

`Linked Product Recipe` → `Stock Item (direct)` 순서·위치는 그대로. Stock Item 블록 안을 아래 **상태표** 대로 그린다. 상품 종류 아래의 «현재 재고» 칸(`BrandProductsTab.tsx:1475~1488`)은 **지운다**(블록 안 A 상태로 이사).

| 상태 | 조건 | 원가 칸 | 재고 칸 | 저장 대상 |
|---|---|---|---|---|
| **A 자체 재고** | 재고아이템 미연결 · «Also create…» 체크 안 함 · kind=stock | 없음 | «현재 재고 ({주문단위} 수)» — 지금 라벨·힌트 그대로(`sellerProduct.stock.*`) + 한 줄 추가 «이 상품 자체에 셉니다. 재고아이템을 연결하거나 만들면 그쪽에서 셉니다.» | 상품 `current_stock`(기존 장부 경로) |
| **B 새 재고아이템** | 미연결 · 체크 함 | «원가 (1 {포장단위} 값, RM)» 기본 0 | «개시 재고 ({취급단위})» 기본 0 · base_quantity>1 이면 괄호 «= N {포장단위}» | `/stock-item` body `unit_cost`·`current_stock` → 새 재고아이템 |
| **C 기존 재고아이템** | `product_ingredient_id` 있음 | 같은 칸, 값 = 그 재고아이템 `unit_cost` | «현재 재고 ({취급단위})», 값 = 그 재고아이템 `current_stock` · 힌트 «재고아이템 ‹이름› 에서 셉니다. 바꾸면 장부에 조정 한 줄이 남습니다.» | `PUT /product-ingredients/:id {unit_cost}`(바뀐 때만) · `POST /:id/adjust-stock`(바뀐 때만) |
| **D 레시피** | `product_recipe_id` 있음 | 없음 | 없음 | — (재료가 센다) |
| **E 재고 안 세는 종류** | kind ≠ stock | C 면 원가 칸은 보임(마진에 쓴다) | 없음 | — |

- 원가 칸 **단위 규칙**: `unit_cost` 는 기준양 전체 값(§2-2) → 라벨에 포장단위를 박는다(«Cost per {pkg}»). 포장 라벨은 재고아이템의 `package_unit ?? (base_quantity≠1 ? 'pack' : unit)` — 화면 유틸 `unitConversion.ts` 의 기존 규격 함수를 쓴다(B 상태는 폼의 `package_unit`·`unit`·`base_quantity`). 칸 아래 한 줄 «RM x / {base} {unit}» 은 지금 `:1717` 줄 그대로.
- 원가 칸 **힌트** (D4 규칙을 사람 말로): 공급처 없음 → «1 {pkg} 사는 값. 0 으로 두면 아래에서 공급업체를 연결할 때 그 가격이 들어옵니다.» / 공급처 있음(`buySpec`) → «공급업체 가격을 따릅니다(We buy 줄). 여기서 고친 값은 공급업체가 가격을 바꿀 때 다시 덮입니다.»
- **자체 재고 경고**: 수정 창에서 상품 자체 재고 > 0 인데 B 나 C 로 가면 재고 칸 위에 «이 상품에 자체 재고 N {주문단위} 가 있습니다. 저장하면 0 이 되고(장부 기록) 재고는 재고아이템에서 셉니다 — 위 칸에 재고아이템 수량을 적어 주세요.» 자동 이전은 없다(D5).
- 마진 카드(`:1726~`)는 그대로. 공급처 없을 때 폴백 원가를 **원가 칸의 현재 입력값**으로 읽게만 바꾼다(저장 전에도 마진이 맞게 보이도록). 계산기는 `productMargin.ts` 한 곳 그대로.
- «Where do we buy this?» · «Create supplier product» 버튼 자리·동작 그대로.

### D2. 저장 경로 (브랜드) — 호출 순서와 서버 보강

**화면 규칙 하나:** `current_stock` 은 **A 상태일 때만** `POST/PUT /brand-products` 본문에 싣는다. B·C 는 싣지 않는다(undefined). 그래야 PUT 이 `prevSelfStock` 을 유지했다가 연결 시점에 «Linked … — self stock cleared» 로 비운다(장부 사유가 맞아진다).

| 흐름 | 호출 |
|---|---|
| 등록 A | 지금 그대로 |
| 등록 B | `POST /brand-products`(current_stock 없음) → `POST /:id/stock-item {name, unit, base_quantity, unit_cost, current_stock}` |
| 등록 C | `POST /brand-products {product_ingredient_id}` → 원가 바뀌었으면 `PUT /product-ingredients/:id {unit_cost}` → 재고 바뀌었으면 `POST /:id/adjust-stock {new_quantity, transaction_type:'adjustment', reason:'Edited in product form'}` |
| 수정 C | `PUT /brand-products`(서버가 자체 재고 0 — 기존) → 위 두 호출(바뀐 때만) |
| 수정 B | `PUT /brand-products`(current_stock 없음) → `/stock-item {…}` |

- 세 호출을 한 트랜잭션으로 묶지 않는다(재고아이템 창도 2호출 · 실패 시 «상품은 저장됐고 재고/원가는 반영 안 됨» 메시지 — 지금 `linkStockItem` 의 실패 문구 패턴 그대로).
- **중복 이름 409 → «기존 것 쓰기»** 를 고르면 `/stock-item {existing_stock_item_id}` 로 가고 **입력한 수량·원가는 적용하지 않는다**(남의 수량을 조용히 덮지 않는다). 확인창 문구에 한 줄 추가: «그 재고아이템의 재고·원가는 그대로입니다. Edit Product 에서 고칠 수 있습니다.»

**서버 보강 (`routes/brand-products.js` `POST /:productId/stock-item`):**
1. **새로 만들 때만** `body.unit_cost`(≥0, 기본 0) · `body.current_stock`(≥0) 을 받는다. 수량은 `stockLedger.record({ target:{kind:'product_ingredient'}, type:'initial', setTo, notes:'Initial stock' })` — `product-ingredients.js:637~` POST 와 **같은 호출**, 같은 트랜잭션 `t`. 주석 «원가는 사 오는 쪽이 정한다 — 판매가를 베끼지 않는다» 는 그대로 참이다(판매가를 베끼는 게 아니라 사람이 적은 원가를 받는 것 · 재고아이템 POST 도 받는다).
2. 연결(새·기존 둘 다) 뒤 `product.current_stock > 0` 이면 같은 `t` 안에서 `stockLedger.record({ target:{kind:'brand_product'}, type:'adjustment', setTo:0, notes:'Linked to recipe/stock item — self stock cleared' })` — PUT(`:1292~`)과 **같은 문구·같은 함수**. 이것이 F1 ② 의 수정.
3. `seller_source` 가지: 매핑 생성 뒤 `recomputeUnitCost('product_ingredient', stockItem.id, { onlyIfZero:true, sequelize, transaction:t })`.

**서버 보강 (`routes/product-ingredients.js` `POST /from-catalog`, F2 수정):** `existing_product_ingredient_id` 가지에서 `connectExisting` 뒤 commit 전에 `recomputeUnitCost('product_ingredient', targetPi.id, { onlyIfZero:true, sequelize, transaction:t })`. `/:id/seller-sources` POST(`:1412`)와 같은 호출·같은 모드. 새로 만드는 가지는 `stockFieldsFromSellerProduct` 가 이미 가격을 넣으므로 무접촉. (`existing_brand_product_id` 가지는 대상이 다르다 — 무접촉.)

### D3. 서버가 재고아이템 재고를 내려준다

`brand-products.js` 의 `stockItem` include 5곳 attributes 를 **상수 하나**로 뽑고 `['id','name','unit','base_quantity','package_unit','package_quantity','unit_cost','current_stock']` 로 넓힌다. 화면 `productIngredientsList` 매핑(`:560`)도 같은 칸을 남긴다(`GET /product-ingredients` 는 전체 행을 주므로 서버 변경 없음). `Product.stockItem` 타입에 두 칸 추가.

### D4. 원가 동기화 규칙 — 새로 만들지 않는다 (costSync 두 번째 규칙 그대로)

- 빈 칸(0)이면 공급처 연결 때 채운다(`onlyIfZero`) · 사람 값이 있으면 보존 · **공급업체가 가격을 바꾸는 순간**만 덮는다(`supplier-products.js:816` 전파). 상품 창도 재고아이템 창도 같은 규칙 — D1 힌트가 이것을 말할 뿐이다.
- ⛔ «연결하면 사람 값도 덮기» 로 바꾸지 않는다 — costSync 파일의 두 번째 규칙이고, 재고아이템 창과 갈라진다.
- ⛔ `brand_products` 에 원가 칸을 두지 않는다 — 두 번째 자리.

### D5. 자체 재고 → 재고아이템 — 자동 이전 없음

단위가 다르다(F4). 연결 시 자체 재고는 장부로 0(기존 규칙 · D2-2 로 POST 길도 같게), 재고아이템 수량은 **사람이 C/B 칸에 적는다**. 경고 문구는 D1. 운영 건수는 `운영검증` 때 읽기 스크립트로 센다(«다이렉트 연결 + 자체 재고>0» · «미연결 + 자체 재고>0» 두 수 — 보고만, 백필 없음).

### D6. 공급업체 상품 창

- **원가 칸: 만들지 않는다**(§3 답 · Irene 컨펌 ③).
- **재고 칸(권고 · 컨펌 ③-b):** 브랜드 A 상태와 **같은 자리·같은 문구 키**(`sellerProduct.stock.*`, 주문단위 수).
  - 등록: «개시 재고 ({주문단위} 수)» 선택 입력 → `POST /supplier-products` 성공 뒤 값>0 이면 `POST /supplier-inventory/adjust { product_id, quantity_delta, reason:'Opening stock' }`(기존 라우트 · `manual_adjust` 기록). 새 라우트·새 타입 없음.
  - 수정: 숫자 칸 대신 읽기 전용 한 줄 «현재 재고 N {주문단위} — 조정은 Inventory 에서» + 링크. 입고(배치·유통기한·건별 원가)는 Inventory 화면이 정식 문이라 상품 창에서 수량을 덮지 않는다.
  - 서버: `PUT /supplier-products/:id` 의 `current_stock` 직접 쓰기(`:766`) **쓰기 중단** → 400 `{ code:'USE_INVENTORY_ADJUST' }`. 화면은 안 보내므로 영향 0, API 문만 닫힌다(2026-10-08 «장부 없이 수량이 생기지 않게» 와 같은 결).

### D7. 어휘·i18n·가드

- 새 키는 `products.*` / `common:sellerProduct.*` 기존 네임스페이스에 4개 언어(en·ko·zh·ms) · `npm run i18n:verify`.
- 공용 컴포넌트만(`UIFormGroup`·`FormInput`·`OrderModeHint`·`ConfirmModal`) · 새 styled 0 · 장식 이모지 0 · `check-design-guard` 통과.
- 🔒 인쇄·KDS 파일 무접촉 · 이 방의 다른 미커밋(출퇴근·모바일 테이블·오너 발주 승인) 무접촉. `scripts/health-check.js` 는 이미 다른 작업으로 수정돼 있다 — **끝에 덧붙이기만** 하고 기존 diff 를 건드리지 않는다.

## 5. 기각한 길 (다시 열지 않는다)

1. `brand_products.unit_cost` 신설 — 같은 개념 두 번째 자리.
2. 자체 재고 → 재고아이템 자동 이전 — 단위 환산을 지어내야 한다(F4).
3. 공급업체 원가 컬럼 — 읽는 곳 0.
4. 연결 때 사람 원가 덮어쓰기 — costSync 규칙 위반, 재고아이템 창과 갈라짐.
5. 상품 저장 + 재고아이템 생성·조정을 한 라우트로 합치기 — 세 라우트를 새 라우트로 겹치는 것(새 경로). 기존 창도 2호출이다.
6. 재고 칸을 상품 종류 옆에 두고 «연결하면 그쪽» 이라고 설명만 — Irene 가 가리킨 자리가 아니고, 누구 재고인지 라벨로 못 말한다.

## 6. 절단면 (팀원 실행 · 순서 고정 · 프론트 빌드 1회 · 운영 쓰기 0)

1. **서버** `routes/brand-products.js` — `stockItem` attributes 상수화+확장(D3) · `/stock-item` ①②③(D2).
2. **서버** `routes/product-ingredients.js` — `from-catalog` 기존 연결 가지에 `recomputeUnitCost onlyIfZero`(D2).
3. **서버** `routes/supplier-products.js` — PUT `current_stock` 400(D6).
4. **화면** `BrandProductsTab.tsx` — 재고 칸 이사 + 상태표(D1) · `submitProduct` 호출 순서(D2) · `productIngredientsList`·`Product.stockItem` 타입(D3) · 중복 확인창 문구.
5. **화면** `SupplierProductsTab.tsx` — 개시 재고 칸·수정 시 읽기 줄(D6).
6. **i18n** 4언어.
7. `health-check.js` **끝에** 영구 케이스 추가(§7 P1·P3·P6 — 데모 브랜드 소유자 계정·`[확인용]` 이름·뒷정리 포함, 임시 계정은 `@example.com`).
8. `npm run build:dev` 1회 → `verify-all --full` 1회.

## 7. 증명 기준 (게이트에서 볼 것 — 전부 숫자로 · 못 한 것은 «확인 불가»)

- **P1 등록 B**: 수량 7 · 원가 3.5 → `brand_products.current_stock = 0` · 재고아이템 `current_stock = 7` · `unit_cost = 3.5` · `inventory_transactions` 재고아이템 `initial` 1줄(quantity 7) · 상품 쪽 장부 0줄.
- **P2 수정 C**: 재고 7→5 · 원가 3.5→4 → 장부 `adjustment` 1줄(−2) · `unit_cost = 4` · 거울이 있으면 거울도 4. 안 바꾸고 저장 → 두 호출 0회(네트워크 로그로).
- **P3 자체 재고 있는 상품에 재고아이템 연결(13810 꼴)**: `/stock-item` 뒤 상품 `current_stock = 0` + 장부 `adjustment` 1줄(notes «Linked to recipe/stock item — self stock cleared») · 재고아이템 수량 무접촉.
- **P4 «Where do we buy this?»**: 원가 0 + 단위 호환 → `unit_cost` = 환산된 공급업체 가격(`convertPrice` 값과 일치) · 원가>0 → 그대로(skip «이미 값 있음») · 비호환 단위 → 그대로.
- **P5 회귀**: 공급업체 가격 PUT → 재고아이템 원가 따라감(기존) · `LINK_EXCLUSIVE` 400 · 레시피 상태(D) 재고·원가 칸 없음 · kind≠stock 재고 칸 없음.
- **P6 공급업체**: 개시 재고 10 → `current_stock = 10` + `supplier_inventory_transactions` 1줄(`manual_adjust`, reason «Opening stock») · `PUT {current_stock}` → 400 · `/supplier-inventory/adjust` 정상.
- **고장주입 2건(의무)**: D2-2 자체 재고 비우기를 빼면 P3 이 실패하는가 · from-catalog 재계산을 빼면 P4 가 실패하는가.
- **기계**: `verify-all --full`(mount sweep: 브랜드 상품 탭·공급업체 상품 탭) · `check-print-guard` 변경 0 · `check-design-guard` · `i18n:verify` · `check-sensitive-diff`(④ 자기평가 gate).
- **수량 보고**: dev «다이렉트+자체재고>0» 은 P3 뒤 0 이어야 한다(지금 1 = 13810).

## 8. Irene 컨펌 요청 (각각 Fable 권고)

① **재고 칸 자리** — 상품 종류 아래 칸을 없애고 Stock Item (direct) 블록 안 상태표(A 자체 / B 새 재고아이템 / C 기존 재고아이템)로. **권고: 그대로.** Irene 원문대로이고 «누구 재고인가» 를 라벨이 말한다.
② **원가 칸 = 연결된 재고아이템 원가 하나** — 상품에 새 칸 없음 · 공급처 연결 시 0 이면 채움 · 사람 값 보존 · 공급업체 가격 변경 때 덮음(기존 규칙). **권고: 그대로.**
③ **공급업체 창** — ③-a 원가 칸 **안 만듦(권고)**: 칸도 읽는 곳도 없다, 마진이 필요하면 구조 문서부터 별건. ③-b 재고는 등록 때 «개시 재고» 한 칸 + 수정 때 읽기 줄 + API 직접 쓰기 400 **(권고: 추가)**. 안 하면 공급업체는 지금처럼 Inventory 에서만.
④ **자체 재고 → 재고아이템 자동 이전 없음** — 연결 시 0(장부) + 경고 + 사람이 적음. **권고: 그대로.** 단위가 달라 기계가 숫자를 지어내면 안 된다.
⑤ **시험 데이터 13810·6267** — P3 검증에 그대로 쓰고 지우지 않는다(«[확인용]» 상품은 자정 정리 대상이 아니다 — 수동 정리 때). **권고: 그대로 둠.**

**⑤까지 «권고대로» 면 팀원이 §6 순서로 바로 구현한다. 운영 반영: 다음 배포 때(§7 통과 + Fable gate 1회 뒤).**

## 9. 자기 점검

- 새 테이블·새 컬럼·새 라우트 0. 새 규칙 0(costSync·stockLedger·재고아이템 창 패턴 재사용). 마이그 0.
- 되돌리기: 전부 코드 변경이라 되돌리기 쉽다. 데이터 변화는 장부를 거친다(장부 줄이 남는다).
- 범위 밖(기록만): F8 손입력 원가 이력 없음 · 운영 §5-7 수치 미측정 · 공급업체 자체 재고 라벨이 내용물 단위인 비대칭(§5-12 사실 5).
