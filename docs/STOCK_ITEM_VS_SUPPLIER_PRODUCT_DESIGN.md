# 재고아이템 vs 공급업체 판매품목 — 이름/코드 분리 설계 판단 (Fable)

작성: 2026-07-04 · 판단자: Fable (상위 설계 게이트) · 상태: **P0-3 일부 구현 완료 (2026-08-27 운영 배포)**

> **후속 설계 → `STOCK_LEDGER_UNIFICATION_DESIGN.md`** (2026-08-28). 이 문서는 *현재 이원 구조가 무엇인가*를 기술한다.
> 그 둘을 **어떻게 합치고 무슨 도구를 만드나**는 별개 프로젝트라 문서를 나눴다.

> **[구현 이력 2026-08-27]** ⑥ P0 중 **3번의 잔여분**(공급업체에게 실제로 나가는 문서) 구현·운영 배포.
> ③-4 권고대로 **인쇄본·WhatsApp·이메일에 판매품목명+SKU 를 주(主), 내부명을 부(副)**(`Buyer ref:`)로.
> 인쇄본에 SKU 열 신설. 매핑 없는 라인·브랜드/푸드코트 판매자는 **내부명 폴백**.
> **기존 발주에도 적용됨** — `ingredient_seller_product_id` FK read-time 조인이라 ⑥-7 의 스냅샷 컬럼은
> 여전히 불필요(SupplierProduct paranoid 로 이력 보존).
> 조인은 신규 **단일 소스** `dev-backend/utils/sellerProductIdentity.js` — 이전엔 같은 조인이
> `purchase-orders-crud`(sellerSource 연관 경유)와 `seller-orders`(FK 경유) **두 곳에 서로 다른 방식**으로
> 복사돼 있었다. 구매자 상세·발주 목록(staging)·공급업체 수신함·인쇄본 4경로가 이 함수 하나를 쓴다.
>
> **함께 고친 별건**: 공급업체 수신함 Print 버튼이 구매자 경로를 열어 눌러도 안 되던 결함 →
> 공급업체 전용 경로 `/pos/supplier/orders/:id/print` 신설(ROLE_ROUTES 무접촉, 권한 폭 유지).
> 단일 진실 = 메모리 [[reference_frontend_route_guard_two_layers]].
>
> **미구현으로 남은 P0**: 1(`?include=sellers` 응답 확장) · 2(재고아이템 seller-source UI) ·
> 3의 **장바구니 부라인** · 4(외부상품 등록 폼 SKU 입력) · 5(레거시 supplier 폼 읽기 강등 — ④에서 별도 완료).
> **내부 화면 주/부 뒤집기(2안)는 Irene 이 아직 고르지 않았다 — 무접촉 유지.**
질문자: Irene · 대상: `Ingredient`(레스토랑 재고) + `ProductIngredient`(BG 프로덕트 재고) 양쪽

> **한 줄 결론**: 현재 데이터 모델은 세 정체성(내부 재고 name/code · 공급업체 판매품목 name/sku · 둘을 잇는 매핑)을 **이미 올바르게 분리**하고 있다. 별도 테이블을 새로 만들 필요 없음. 진짜 문제는 (1) 재고아이템에 직접 붙은 **레거시 `supplier_name`/`supplier_id`** 단일공급 컬럼이 정식 다대다 매핑과 개념적으로 겹치는 점, (2) **화면에서 공급업체 SKU/판매품목명이 거의 안 보이는 점**, (3) 외부공급업체 상품 등록 시 **내부 재고명을 그대로 복사하고 SKU를 안 받는 점**이다. 스키마 변경은 최소(P0는 표시/UI, 스키마는 후속·선택).

---

## ① 현재 모델 실측 요약

### 세 개의 정체성 + 매핑 (핵심)

| 층 | 테이블 | 이름 필드 | 코드 필드 | 소유자 | 의미 |
|---|---|---|---|---|---|
| 내부 재고 (RA) | `ingredients` | `name` (NOT NULL) | `code` (`ING-001`, 자동생성 `codeGenerator.js`) | 매장/브랜드/푸드코트 (`owner_type`) | "우리 주방이 부르는 이름" |
| 내부 재고 (BG) | `product_ingredients` | `name` (NOT NULL) | `code` (`PI-001`) | BG 유저 (`owner_user_id`) | "브랜드가 부르는 이름" |
| 공급업체 판매품목 | `supplier_products` | `name` (NOT NULL) | `sku` (`SP-{id}-NNNN` 자동 / 공급업체 자유입력) | 공급업체 (`supplier_company_id`) | "공급업체가 파는 물건 이름·코드" |
| **매핑(연결)** | `ingredient_seller_products` | — | — | — | "이 재고아이템 = 저 판매품목" + `unit_price` + `unit_conversion` + `is_preferred` |

- **매핑 테이블 `ingredient_seller_products`**: `ingredient_id` XOR `product_ingredient_id`(둘 중 하나만) ↔ `seller_product_id`(+`seller_type`/`seller_entity_id`). 즉 **한 재고아이템에 여러 공급처(공급업체/브랜드/푸드코트)의 판매품목을 다대다로 연결**하고 각각 단가·환산·선호(preferred)를 가진다. 이미 "내부 정체성 ≠ 공급 정체성"을 구조적으로 인정하는 설계.
- **연관관계(models/index.js)**: `Ingredient.hasMany(IngredientSellerProduct as sellerSources)`, `ProductIngredient.hasMany(... as sellerProducts)`, `PurchaseOrderItem.belongsTo(IngredientSellerProduct as sellerSource)`. 발주 라인은 어떤 판매품목 매핑을 썼는지 **스냅샷 FK**(`ingredient_seller_product_id`)로 보존.

### 발주(PO) 라인에 찍히는 이름 (실측)
- `PurchaseOrderItem`: 이름 컬럼은 `description` 하나뿐. 생성 시 **내부 재고명**을 넣는다 — RA: `description = ing.name`(purchase-orders-crud.js:802), BG: `description = pIng.name`(:748). 판매품목명/SKU는 **라인에 저장 안 함**, 대신 `ingredient_seller_product_id` FK로 매핑을 가리킴.
- **PO 목록**(구매자 staging): `product_name = description || ingredient.name` — 내부명(crud.js:323).
- **PO 상세**(구매자): 내부명 굵게 + `seller_product_name` 회색 서브라인(프론트 PurchaseOrderDetailPage:1082-1085) — **유일하게 내부명+판매품목명 동시 노출**. SKU는 없음.
- **PO PDF**(공급업체 발송 문서): `name = ing.name`(purchase-orders-workflow.js:239) — **내부 재고명**. 공급업체가 받는 발주서에 정작 공급업체 자기 SKU/품목명이 안 찍힘.
- **공급업체 수신함**(seller-orders.js:156,250): PO 아이템에 `Ingredient(name)`만 include. 공급업체는 **구매자가 붙인 내부 이름**으로 주문을 받는다.

### 레거시 단일공급 컬럼 (혼동의 근원)
- `ingredients.supplier_name`(주석에 "deprecated - use supplier_id") + `ingredients.supplier_id`, 그리고 `product_ingredients.supplier_name`("레거시") + `supplier_id`. 이 컬럼들은 `suppliers` 테이블(구형)을 가리키는 **단일 공급처 1개** 개념.
- 이게 정식 다대다 매핑(`ingredient_seller_products`+`supplier_products`)과 **동시에 존재**한다. RA IngredientsTab 폼은 아직 `supplier_name`/`supplier_id`를 직접 쓰는 Supplier 셀렉트를 노출(from-catalog 경로는 null로 둠). 즉 두 개의 공급처 개념이 병존.

### 외부공급업체(솔루션 미가입) 케이스
- buyer가 등록한 `supplier_companies`(is_system_registered=false, registered_by=나) 밑에 `POST /external-suppliers/:id/products`로 SupplierProduct 생성. SKU 자동 `SP-{id}-NNNN`.
- **문제 지점**: RA "Register on external supplier" 흐름(IngredientsTab:798)은 새 SupplierProduct를 `{ name: extTarget.name(=내부 재고명), unit, unit_price, min_order_quantity }`로 만든다 — **내부 재고명을 판매품목명으로 그대로 복사, SKU는 화면에서 안 받음**(자동 SKU만). 이후 SupplierProfilePage에서 수정 가능.

---

## ② 진단 — 분리돼 있나, 혼동하나?

**결론: 데이터 모델 층은 이미 올바르게 분리. 혼동은 (A) 레거시 컬럼 병존, (B) 표시 층에서 판매품목 정체성이 거의 안 드러남, (C) 외부상품 쓰기 시 이름 복사 — 세 곳.**

- **[정상] 3정체성 + 매핑 구조**: `name/code`(내부) vs `name/sku`(공급업체) vs 매핑(단가/환산)이 각각 자기 테이블에 산다. Irene가 걱정한 "이름이 같을 수도 다를 수도" / "코드 따로 SKU 따로"는 **모델상 이미 독립적으로 표현 가능**. 업계 정석(내부 Item Master ↔ Supplier Catalog / Vendor Part Number 분리, 다대다 vendor-item)과 일치.
- **[혼동 A · 스키마] 레거시 `supplier_name`/`supplier_id` 이중구조**: 재고아이템에 "공급처 1개"를 직접 박는 옛 방식과 "공급처 N개 매핑"이 공존. 같은 질문("이 재고 누가 대나?")에 두 개의 답 소스 → 데이터 드리프트 위험(예: 폼에서 supplier_name 바꿔도 매핑 unit_price는 그대로). **이게 Irene가 감지한 "합쳐진 느낌"의 실체.**
- **[혼동 B · 표시] 판매품목 정체성이 화면에 거의 없음**: SKU는 카탈로그 브라우즈 카드·SupplierProfile·공급업체 자기 CRUD 3곳에만. 정작 **재고아이템 상세·seller-source 편집기·장바구니·PO 라인·PO PDF·공급업체 수신함** 어디에도 "이 재고 = 공급업체 SKU 무엇"이 안 보인다. 구매자가 공급업체에 전화로 "그쪽 품번 뭐죠?" 물어야 하는 상태.
- **[혼동 C · 쓰기] 외부상품 이름 복사**: 내부명 == 판매품목명으로 강제되고 SKU 미수집 → 나중에 실제 공급업체 카탈로그와 대조 불가.

---

## ③ 정석 권고 — 필드 배치 + UI

### 필드 배치 (원칙: "이름/코드는 내 것, 판매품목 이름/SKU는 공급업체 것")

이미 있는 구조를 **그대로 유지**하고 표시만 채운다. 새 컬럼 불필요:

```
내부 재고아이템 (Ingredient / ProductIngredient)   ← 매장/브랜드 소유
  name   : 우리가 부르는 이름   (예: "돼지고기 목살")
  code   : 우리 내부 코드 ING-007 / PI-007
        │
        │  ingredient_seller_products  (연결 = 1재고 : N공급처)
        │    unit_price · unit_conversion · is_preferred
        ▼
공급업체 판매품목 (SupplierProduct)                 ← 공급업체 소유
  name   : 공급업체가 파는 이름 (예: "Premium Pork Collar 5kg")
  sku    : 공급업체 품번 SP-12-0034 / 자유입력
```

- **내부 name/code = 재고아이템 소유**(절대 공급업체 값으로 덮지 않는다).
- **판매품목 name/sku = 공급업체 소유**(구매자는 읽기만, 외부상품 등록 시에만 buyer가 초기값 입력).
- **매핑이 둘을 잇고** 단가·단위환산을 가진다. **이미 이렇게 돼 있음** → P0는 "안 보이던 판매품목 name/sku를 화면에 드러내기".

### UI 권고 (둘 다 보여주기)

1. **재고아이템 상세/카드 (RA IngredientsTab, BG ProductIngredientsTab)** — seller-source(공급처) 목록 각 행에 지금 `seller_name + unit_price`만 나오는 것을 →
   `[공급업체명]  판매품목명  ·  SKU  ·  단가/단위 (환산 1:N)  ·  preferred★` 로 확장.
   즉 "누가(회사) · 무엇을(판매품목명+SKU) · 얼마에(단가) · 몇 배 단위(환산)"를 한 줄에.
   → **필요 데이터**: `ingredients.js`/`product-ingredients.js`의 `?include=sellers` 응답이 지금 회사명만 붙인다(:57-64). 여기에 `seller_product_name`, `seller_product_sku`를 **SupplierProduct join으로 추가**(브랜드/푸드코트 판매품목이면 그쪽 name, sku는 supplier만). UI는 이 필드를 렌더.

2. **seller-source 피커(ConnectSellerModal / ProductIngredientsTab 편집기)** — 지금 옵션 라벨 `판매품목명 · 공급업체 · 단위`. 여기에 **SKU 부라벨** 추가(`판매품목명` / `공급업체 · SKU · 단위`). CatalogRow 타입에 `sku` 필드 추가(현재 RecipeManagement/ProductIngredientsTab의 CatalogRow엔 sku가 아예 없음).

3. **장바구니/PO 라인** — 구매자 기준은 내부명이 맞다(우리가 알아보는 이름). 단, **작은 회색 서브라인으로 판매품목명 + SKU** 병기(PO 상세는 이미 seller_product_name 서브라인 있음 → 여기에 SKU만 추가, 장바구니에도 동일 패턴).

4. **PO PDF / 공급업체 수신함 (중요)** — 공급업체가 받는 문서엔 **공급업체 자기 판매품목명 + SKU를 주(主), 구매자 내부명을 부(副)**로. 지금은 내부명만 나가 공급업체가 자기 창고에서 못 찾는다. `ingredient_seller_product_id`로 SupplierProduct를 join해 `sku`/`name`을 PDF·수신함 라인에 표기. (내부명은 "buyer ref"로 괄호 병기.)

5. **외부공급업체 상품 등록 폼** — "Register on external supplier" 모달에 **판매품목명(기본값=내부명, 수정 가능) + SKU(선택 입력)** 필드 추가. 내부명 자동복사는 편의 기본값으로 두되 **잠그지 말 것**.

---

## ④ 레거시 `supplier_name`/`supplier_id` 처리

> **[결정·구현 2026-07-04 #2]** step1(read 강등)+step2(쓰기 중단) **완료**: 3라우트(`ingredients.js`·`restaurants-ingredients.js`·`product-ingredients.js`) create=null 고정·update=미수정, 프론트 폼 supplier 쓰기 제거(P0-5 read-only). **step3 백필=미실행(Irene 결정 "자연 이관")**: 매핑은 `seller_product_id`(NOT NULL)+활성 `SupplierContract` 를 요구하므로 백필하려면 레거시 행마다 SupplierCompany+SupplierProduct+계약을 날조해야 함 → 실재 않는 공급망 데이터 생성=혼동 재생산. 쓰기중단으로 향후 드리프트 차단됐고 레거시값은 read-only 유지되므로, **다음 주문 시 seller-source 1클릭 자연 이관(lazy migration, 업계 표준)** 으로 종료. 아래 원안은 참고용으로 보존.


**권고: 새 표준은 매핑(`ingredient_seller_products`)으로 일원화. 레거시 컬럼은 즉시 drop 금지 — "표시 강등 → 쓰기 중단 → 백필 → deprecate" 단계.**

- **하지 말 것**: 컬럼 즉시 삭제(운영 데이터·발주 이력·기존 RA 폼이 참조 → 회귀). `sync-database --alter`가 모델 미정의 컬럼을 드롭하는 사고 이력 있음([[reference_sync_alter_drops_columns]]) — 반대로 여기선 모델엔 남기고 **쓰기만 끊는** 방향.
- **단계**:
  1. (P0) RA IngredientsTab 폼에서 `supplier_name`/`supplier_id` 직접 입력 UI를 **읽기 표시로 강등**(신규 입력은 seller-source 매핑으로 유도). 기존 값은 계속 표시.
  2. (후속) 신규/수정 API가 `supplier_name`/`supplier_id`를 더는 쓰지 않도록 정리(`ingredients.js:352-353,396-397` 등). from-catalog 경로는 이미 null.
  3. (후속·선택) 백필 스크립트(멱등): `supplier_id`가 있는데 대응 매핑이 없는 재고아이템에 대해 `ingredient_seller_products` 행을 생성(단가=unit_cost, 환산=1, preferred). **실행 전 백업**, `process.exit()` 필수([[reference_deploy_migration_must_exit]]).
  4. (먼 후속) 모델 주석을 "deprecated, do not read"로 명확화, 최종 drop은 전 참조 제거 확인 후.
- **발주/표시 영향**: 발주 로직은 이미 매핑(`ingredient_seller_product_id`) 기반이라 레거시 컬럼 강등에 **영향 없음**. 표시만 seller-source 쪽으로 이동.

---

## ⑤ Restaurant(Ingredient) vs BG(ProductIngredient) 대칭

- 두 체인은 **분리 유지**([[reference_bg_ra_product_chains]]): RA=`ingredients`(owner_type/restaurant), BG=`product_ingredients`(owner_user_id). 매핑 테이블 `ingredient_seller_products`는 `ingredient_id` XOR `product_ingredient_id`로 **양쪽을 공용**하지만 행은 섞이지 않음.
- **동일 원칙을 양쪽에 대칭 적용**: 위 ③의 "판매품목 name/sku 병기", ④의 "레거시 컬럼 강등"을 RA UI(IngredientsTab, ConnectSellerModal)와 BG UI(ProductIngredientsTab) **양쪽에 같은 모양**으로. 백엔드는 `?include=sellers` 두 라우트(`ingredients.js`, `product-ingredients.js`) 모두에 SupplierProduct join(name/sku) 추가.
- 발주 라인도 대칭: RA 라인은 `ingredient_id`+`description(ing.name)`, BG 라인은 `product_ingredient_id`+`description(pIng.name)` — 이미 평행. 판매품목 SKU 병기도 두 경로 동일 적용.

---

## ⑥ 단계 · 리스크

이 영역은 **발주/재고/공급망 = 돈·주문 인접** → 신중. 인쇄 보호파일 8개와 **완전 무관·무접촉**.

### P0 (당장, 스키마 변경 0 — 표시/입력만)
1. `?include=sellers` 응답에 `seller_product_name`+`seller_product_sku` 추가(SupplierProduct join) — RA+BG 두 라우트.
2. 재고아이템 seller-source 목록/피커에 판매품목명+SKU 표기(RA+BG UI).
3. 장바구니·PO 상세·PO PDF·공급업체 수신함 라인에 판매품목명+SKU 병기(구매자쪽 부라인, 공급업체쪽 주라인).
4. 외부상품 등록 폼에 판매품목명(수정가능)+SKU(선택) 필드.
5. RA 폼의 레거시 supplier 직접입력 → 읽기 강등.

### 후속 (선택, 스키마/데이터 손대는 것)
6. 레거시 `supplier_name`/`supplier_id` 쓰기 중단 + 멱등 백필(매핑으로) — 백업·`process.exit()`·`compare-schema` 필수.
7. (검토만) PO 라인에 판매품목명/SKU **스냅샷 컬럼** 추가 여부: 현재는 `ingredient_seller_product_id` FK로 read-time 조인. SupplierProduct는 `paranoid`(soft delete)라 이력이 살아있어 **당장 스냅샷 불필요**. 공급업체가 판매품목을 완전 교체/이름변경하면 과거 PO 표시가 바뀔 수 있으니, 회계 엄밀성 필요 시에만 `po_item.seller_product_name`/`seller_product_sku` 스냅샷 추가.

### 리스크
- **데이터 드리프트(레거시 병존)**: P0에서 신규 쓰기를 매핑으로 유도하면 완화. 백필 전까지 옛 재고는 supplier_name만 있을 수 있음 → 표시 폴백 유지.
- **회귀 표면**: `?include=sellers` 응답 shape 변경 → 프론트 타입/렌더 동기 수정 필수(필드 추가는 하위호환). health-check + 발주 생성→조회 라운드트립 검증.
- **공급업체 문서 변경**: PO PDF에 SKU 넣는 건 공급업체 UX 개선이나, 매핑 없는(system_admin) 라인은 SKU 없음 → 폴백 처리.
- **검증**: 이 변경은 Fable 검증 대상 기준 2(돈·주문 무결성)·후속 6은 기준 3(운영 마이그) 해당 → 구현 후 Fable 게이트 1회 권장.

---

## Irene용 결론 (평이한 말)

1. **지금 구조는 이미 맞게 나눠져 있습니다.** "우리 재고 이름/코드(ING-007)"와 "공급업체가 파는 물건 이름/품번(SKU)"은 각각 다른 표에 따로 저장되고, 그 둘을 잇는 연결표(단가·단위환산 포함)가 이미 있어요. 그러니 표를 새로 만들 필요는 없습니다.
2. **진짜 문제는 세 가지**입니다: (a) 옛날 방식인 "재고에 공급처 딱 하나 적어두던 칸"(supplier_name)이 새 연결표와 겹쳐서 헷갈립니다. (b) 정작 화면에는 공급업체 SKU와 판매품목 이름이 거의 안 보여요. (c) 외부 공급업체 상품을 등록할 때 우리 재고 이름을 그대로 베끼고 SKU를 안 받습니다.
3. **고칠 방향**: 재고 이름/코드는 계속 "내 것", 판매품목 이름/SKU는 "공급업체 것"으로 두되, **화면 곳곳(재고 상세·장바구니·발주서·공급업체 수신함)에 둘 다 나란히** 보이게 합니다. 특히 공급업체에게 나가는 발주서엔 공급업체 자기 SKU가 찍혀야 창고에서 바로 찾습니다.
4. **당장 할 일(P0)은 표에 손 안 대고 화면·입력만** 손보면 됩니다. 옛 칸(supplier_name) 정리와 데이터 이관은 그 다음, 안전하게 단계로 합니다.
5. 이 작업은 발주·돈과 붙어 있으니 만들고 나서 **Fable 검증 1회**를 거치는 걸 권합니다. 인쇄 코드와는 전혀 무관합니다.
