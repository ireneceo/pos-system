# [Fable 설계] 공급업체 상품 추가 · 전체 상품 보기 · 재고아이템 다섯 칸 · 가격 소수 자리 (2026-10-15)

> Fable 최종 답변을 팀원(Opus, 작업방 ebe3a0ff)이 그대로 옮겨 저장. 사실 전달 문서: 작업방 tmp/fable-brief.md

호출 조건: `design`(여러 화면이 같은 규칙을 나눔 · DB ENUM 확장 · 원가식에 닿는 복사 규칙). 끝난 뒤 `gate` 1회(운영 DB 마이그 + 원가·금액 칸 접촉). 한 사안 2회로 끝낸다.
단일 기준: `docs/TRADE_STRUCTURE.md` §2-2 다섯 칸 · «판매 상품·발주 줄도 다섯 칸» · «판매 상품 규격 표기·어휘». 이 설계는 그 기준을 **바꾸지 않는다** — 기준이 안 닿아 있던 자리 네 곳에 기준을 대는 것이다.

## 0. 한 줄 결론

Irene 의 여섯 문장은 결함 하나의 네 얼굴이다: **판매 상품(공급업체 상품)의 다섯 칸이 ①구매자 쪽 상품 등록 폼, ②«재고아이템으로 저장» 복사, ③재고아이템 포장단위 선택지, ④단가 표시에 그대로 이어지지 않는다.** 고치는 법은 각 자리에서 **이미 있는 단일 소스를 쓰게 하는 것**이고(새 표·새 목록·새 계산 0), 거기에 «전체 상품 보기» 탭 하나를 **이미 있는 `GET /api/supplier-catalog` 위에** 올린다.

## 1. 실측으로 보탠 사실 (설계에 영향)

- **S1. `migrate-package-unit-2-converge.js` 는 `deploy` 분류(매 배포 재실행)** 로 `is_active=1 AND package_unit IS NULL` 행에 `package_unit := unit · package_quantity := base_quantity` 를 넣는다. 즉 새 재고 행을 포장단위 없이 만들면 다음 배포가 **취급단위를 포장단위 자리에 복사**한다. → B 수정에서 포장단위를 **반드시 채워서** 만들어야 하고, 못 채운 것(어휘 밖)은 NULL 로 두어 그 수렴에 맡긴다(ING-UNI-013 이 목록으로 보여 준다).
- **S2. 판매 상품 포장단위의 어휘 단일 소스는 서버 `utils/catalogSpecParser.js PACKAGE_WORDS`**. 재고 ENUM 으로 옮길 때 이 표를 쓴다 — 새 표를 만들지 않는다.
- **S3. `deriveLinkConversion` 은 재고 행의 `base_quantity` 를 보지 않는다**. 그래서 새 행의 base_quantity 를 판매자 기준숫자로 복사해도 연결 환산은 그대로 맞다(10 kg/BOX ↔ kg 행 → 환산 10 · 행 base 10 · unit_cost 48 → `convertPrice` = 48 — 항등식 성립).
- **S4. 재고 PUT 은 둘 다 «보낸 칸만» 갱신한다**. 매장 재료 PUT 도 같은지 팀원이 확인(다르면 같은 필터로 고친다. 범위 안).
- **S5. 재고 ENUM 두 칸(`unit`·`package_unit`)은 네 모델이 같은 8값을 하드코딩**. 이번에 늘리는 것은 **`package_unit` 두 칸만**(ingredients · product_ingredients). 레시피 줄 `unit` 과 재고 `unit` 은 **무접촉**.
- **S6. `supplier_products.sku` 에 유니크 인덱스 없음** — 폼에서 SKU 를 받으면 같은 업체 안 중복 검사가 필요하다.
- **S7. 「비슷한 이름 묻기」는 from-catalog 생성 4벌에는 없다.** → «전체 상품 보기» 모달에 **«기존 아이템에 연결»** 갈래를 함께 둔다(D5).

## 2. 갈래 — 결정

**D1. 구매자 쪽 외부 공급업체 상품 폼 = 판매자 폼과 같은 다섯 칸 + SKU + 주문방식. 공용 부품 하나.**
- 새 `components/Common/ExternalSupplierProductFields.tsx`(제어 컴포넌트 · 칸만): **SKU**(선택 · 비우면 서버 자동 `SP-{업체}-NNNN`) · **Product name** · **Order mode**(pack/measure) · **Usage Unit**(`withCurrentUnit(CONTENT_UNIT_OPTIONS, 현재값)`) · **Base Qty** · **Package Unit**(자유 입력 + `PACKAGE_UNIT_SUGGESTIONS` datalist) · **Price / Package** · **Min order** · **Lead time** · 미리보기 = 기존 `SellerSpecSummary`/`useSellerSpecCopy`. 라벨은 §2-2 영어 라벨 그대로. 기본값은 `SupplierProductsTab` 폼과 같게.
- 쓰는 곳 셋: `SupplierProfilePage` 상품 모달 · `RegisterExternalSupplierModal` · 새 «전체 상품» 탭의 추가/수정 모달. **판매자 폼 `SupplierProductsTab` 은 무접촉**.
- `SupplierProfilePage` 결함 2개 같이: 수정 열 때 `lead_time_days` 기존 값 · 카드 규격은 `sellerSpecLabel` 한 줄.
- `RegisterExternalSupplierModal`: `target` 에 `base_quantity · package_unit · package_quantity` 를 더 넘겨 **열 때 채움** — `base_quantity = 재고 base_quantity ÷ (package_quantity||1)` · `package_unit = 재고 package_unit` · `content_unit = 재고 unit`. 단위 선택지의 pack/can/bottle 제거(→ `withCurrentUnit(CONTENT_UNIT_OPTIONS)`). 호출처 3곳은 target 에 칸만 더 넘긴다.

**D2. 서버 외부 상품 POST/PUT.**
- `buildProductFields` 에 **`sku`**(빈 값은 undefined → POST 자동 채번 · PUT 미변경) · **`order_mode`**(`'pack'|'measure'` 만, 기본 pack) 추가.
- SKU 가 왔으면 **같은 `supplier_company_id` 안 중복(살아있는 행, 자기 제외) → 409 `{code:'SKU_EXISTS'}`**. 다른 업체는 허용.
- `GET /api/supplier-directory/:id` 상품 `limit: 50` → `CATALOG_LIMIT` + `meta.truncated`. 화면은 truncated 면 한 줄 안내.

**D3. 재고 `package_unit` ENUM = 판매 상품 제안 목록과 같은 어휘. expand-only.**
- 더하는 값 13: `box bag tin tub drum tray carton roll bundle sheet sack jar ea` → ENUM 21개(기존 8 보존).
- **단일 소스 새 파일 `dev-backend/utils/stockUnits.js`**: `STOCK_UNIT_ENUM`(8) · `STOCK_PACKAGE_UNIT_ENUM`(21) · `normalizeStockPackageUnit(v)`. 모델 2개와 `catalogLink.UNIT_ENUM` 이 여기서 읽는다.
- `normalizeStockPackageUnit(v)`: ①trim · ENUM 에 대소문자 무시로 맞으면 정식값 ②아니면 `catalogSpecParser.PACKAGE_WORDS` 약어표 ③그래도 없으면 **null**.
- 마이그 `scripts/migrate-stock-package-unit-enum-expand.js`(멱등 · `expandEnum` 두 칸 · 레지스트리 `deploy` · 선례 `migrate-owner-supplier-enum.js`).
- 화면 재고 폼 2곳의 하드코딩 8개 select → `withCurrentUnit(PACKAGE_UNIT_SUGGESTIONS, formData.package_unit)`. **select 유지**. **health-check 1건**: 두 칸 ENUM 이 `STOCK_PACKAGE_UNIT_ENUM` 을 전부 담는지. 프론트 목록 ⊆ 서버 ENUM 은 주석으로 서로 가리킨다.

**D4. «재고아이템으로 저장»(from-catalog 신규 생성) = 판매 상품 다섯 칸 복사. 규칙 한 곳.**
- `utils/catalogLink.js` 에 **`stockFieldsFromSellerProduct(sellerRow, { unit })`**:
  - `unit` = `resolveUnit(body.unit, seller.unit)`
  - **measure**: `base_quantity 1 · package_unit = normalizeStockPackageUnit(seller.package_unit)`(없으면 null) · `unit_cost = unit_price`
  - **pack**: 판매자 단위와 행 단위가 같으면 `base_quantity = seller.base_quantity`; kg↔g · L↔ml 면 `× costSync.FACTOR`; 환산 불가면 1. `package_unit = normalizeStockPackageUnit(seller.package_unit)` → null 이고 base≠1 이면 **`'pack'`** · null 이고 base=1 이면 null.
  - `package_quantity 1` · `unit_cost = unit_price`.
- 쓰는 곳 5: `services/restaurantCatalogLink.js` · `routes/ingredients.js`(브랜드) · `routes/ingredients.js`(푸드코트) · `routes/product-ingredients.js`(BG) · `services/stockItemMirror.shareProductToBrand`(`package_unit` 도 같은 정규화로). 다른 칸 무접촉.
- 운영 기존 33+1 줄은 **자동 백필하지 않는다**(§5).

**D5. «전체 상품 보기» = `UnifiedSuppliersPage` 새 탭 `products`("All Products"), 데이터는 `GET /api/supplier-catalog` 그대로.**
- 새 `pages/Suppliers/AllSupplierProductsView.tsx`. 서버 검색(디바운스 300ms)·`supplier_id`·`category_id` 그대로; 화면 필터 셋: **공급 종류**(내가 등록한 외부 / 그 외) · **연결 상태**(`already_mapped`) · **포장단위**. `meta.truncated` 면 안내.
- `DataTable` 열: Product(이름+SKU) · Supplier · Spec(`sellerSpecLabel`) · Price(`formatCurrency` + `/ sellerOrderUnitOf`) · Min order · Linked · 행 액션 `IconButton`: **Add to my items** · **Edit**(내가 등록한 외부 업체 상품만) · **Open supplier**.
- 헤더 **Add Product** → 외부 업체 고르기(`GET /api/external-suppliers`, 없으면 안내+링크) → D1 공용 폼 → POST → 재조회.
- **Add to my items 모달** 두 갈래: **새 아이템으로**(D4 미리보기) / **기존 아이템에 연결**(내 아이템 목록 = NewPurchaseOrderPage 와 같은 주소 · 환산 기본값 `defaultLinkConversion`) → from-catalog. 주소·키 분기는 `NewPurchaseOrderPage.ensureIngredientAndAddToCart` 와 같게. 장바구니·발주는 만들지 않는다.
- 소속 매장 없는 오너도 이 탭은 본다(Add to my items 숨김). 오너 화면은 탭 둘.
- 역할: RA · Owner · BG · BM · FG · FM.

**D6. 가격 소수 자리 — 표시만 2자리. 저장값은 건드리지 않는다.**
- 재고 수정 폼 열 때 `Number(v).toFixed(2)` 로 보이고, **`unit_cost_touched` — 손대지 않았으면 저장 때 `unit_cost` 를 보내지 않는다**. 신규 등록은 입력값 그대로.
- **`utils/currency.ts formatUnitPrice(amount, unit, currencyCode)`**: 2자리; **g·ml 이고 0.01 미만이면 kg·L 로 올려 보여 준다**(«RM 0.0045/g» → «RM 4.50 / kg»); 올릴 단위가 없고 0.01 미만이면 «< RM 0.01 / piece». 바꾸는 자리 3: `SellerProductSpecGuide.money()` · `BrandProductsTab.tsx:1718` · `FloorPlanStatsBar.tsx:282-284`.
- **자동 강제**: `check-design-guard.js` 규칙 — `toFixed(3|4)` · `maximumFractionDigits: [34]` · minimumFractionDigits 만 있고 maximum 없는 `toLocaleString`. baseline 0. 반증 1회.

**D7. SKU 1행(Irene 직접 지시).** Irene 할 일(터미널)로 분리.

## 3. 절단면 — 순서 고정 (프론트 빌드 1회)
1. 서버 — stockUnits · 모델 2개 · 마이그+레지스트리 · dev 실행 · health-check ENUM.
2. 서버 — stockFieldsFromSellerProduct + 5 자리 · health-check 2건 · 고장주입.
3. 서버 — 외부 상품 POST/PUT(sku·order_mode·409) · profile limit → health-check.
4. 프론트 — 공용 폼 · SupplierProfilePage · RegisterExternalSupplierModal(+호출처 3곳).
5. 프론트 — 재고 폼 2곳 포장단위 select · unit_cost 2자리+touched.
6. 프론트 — formatUnitPrice + 3 자리 · design-guard 규칙(+반증).
7. 프론트 — All Products 탭 · i18n 4언어.
8. 읽기 전용 운영 보고서 `scripts/report-stock-base-vs-seller.js`(쓰기 0).
9. build:dev 1회 → verify-all --full 1회 → 클릭 흐름 1회 → check-sensitive-diff → Fable gate 1회.
- 🔒 인쇄 8파일 · KDS 무접촉. SupplierProductsTab 무접촉. 레시피 줄 ENUM 무접촉. 운영 쓰기 0.

## 4. 증명 기준 (gate)
① 외부 상품: POST(sku T-1·measure·kg·1·`CTN`) → GET 같은 값(package_unit `CTN` 그대로) / PUT sku T-2 반영 / 같은 업체 중복 409 SKU_EXISTS / 다른 업체 같은 sku 201 / 플랫폼 업체 403.
② from-catalog 신규: `kg · 10 · BOX · 48 · pack` → 재고 `kg · 10 · box · 1 · 48`, 환산 10, convertPrice = 48. 고장주입: base 복사 빼면 실패.
③ 정규화: pkt→pack · CTN→carton · ea→ea · 미지어휘+base 12 → pack · 미지어휘+base 1 → null · measure → base 1·cost=unit_price.
④ ENUM: 두 칸 21값 포함(health-check), 기존 값·NULL·기본값 보존.
⑤ formatUnitPrice jest 3건.
⑥ design-guard 반증 1회.
⑦ 브라우저: /pos/suppliers?tab=products RA·BG·FG·owner mount 0 + 클릭 흐름.
⑧ 재고 폼: 1.8800 행 이름만 고쳐 저장 → unit_cost 1.8800 유지.
⑨ check-sensitive-diff · 배포 안전.

## 5. Irene 에게 (Fable 권고)
- Irene 할 일 ①: Coca-Cola (Can) SKU 805 → 1080-013 (터미널).
- **질문:** 운영 D4 결함 33줄 + BG 1줄. (가) 재료 unit_cost = 판매가 13줄 — base·package_unit 을 판매 상품 규격으로 맞추면 단위원가가 바로 맞아진다. (나) 나머지 20+1 줄은 목록 보고만. **Fable 권고: (가) 13줄은 배포 뒤 Irene 터미널 1회로 적용(백업 JSON + 되돌리기 짝), (나) 목록 보고만.** **운영 재료 13줄의 기준숫자·포장단위를 연결된 공급업체 상품 규격대로 맞출까요?**
- 확인(선택): Coca-Cola (Can) 805 `1 piece/carton · RM 0` ↔ 재료 1269 `can · 24 · pack` · 연결 단가 21 · 환산 1 — 규격 불일치, 이번엔 무접촉.

Fable 작은 결정: ea 포함 / 재고 포장단위 select 유지 / 오너도 All Products / 기존 아이템 연결 포함 / 저장 4자리 유지·표시만 2자리.

## 6. 범위 밖
재고 unit·레시피 줄 ENUM · 취급단위 수렴 · from-catalog 비슷한 이름 묻기 · 판매자 폼 · 발주 카탈로그 재구성 · 저장 자릿수 · PDF·메일 금액.
