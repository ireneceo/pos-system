# 외부공급업체 상품 등록 (External Supplier Products)

작성: 2026-06-22 · 1차 대상: **Restaurant Admin** (BG/FG는 동일 패턴 후속)

## 1. 배경 / 문제
"외부공급업체" = **Purple POS 솔루션을 안 쓰는 업체**(동네 정육점 등). 로그인해서 자기 상품을 올릴 일이 없음.
- 현재 `SupplierProduct`(공급업체 카탈로그) 생성은 **Supplier Admin 역할만**(`routes/supplier-products.js`, requireSupplierScope). buyer 불가.
- buyer는 `POST /api/external-suppliers` 로 회사+자동 active 계약만 생성, **상품 생성 경로 없음**.
- 연결(`seller-sources`/`from-catalog`)은 기존 `seller_product_id`(SupplierProduct) 필수.
→ 외부공급업체로는 **발주 자체가 불가능**. buyer가 그 업체의 상품을 직접 등록할 수 있어야 함(Irene 확정).

## 2. 두 경로 (둘 다 제공)
- **① 업로드**: 등록한 외부공급업체에 상품(이름·단위·단가·최소수량)을 직접 추가 → `SupplierProduct` 생성.
- **② 우리 스톡을 상품으로**: 재고(Ingredient)에서 "외부공급업체로 등록" → 재고명·단위로 `SupplierProduct` 생성 + 매핑(`IngredientSellerProduct`) 한 번에.

두 경로 모두 결과는 **그 외부업체의 SupplierProduct** → 기존 카탈로그/발주 흐름에 자동 합류(계약이 이미 active).

## 3. 안전장치 (핵심)
모든 신규 엔드포인트는 대상 SupplierCompany가 **(a) is_system_registered=false (b) registered_by_entity = 내 buyerEntity** 인지 검증.
→ 플랫폼 가입 공급업체의 카탈로그는 buyer가 **절대 못 건드림**. (PUT /external-suppliers/:id 가드 패턴 재사용.)

## 4. 백엔드 (routes/supplier-directory.js — buyer gate 상속: authenticateToken + requireBuyerRole, req.buyerEntity)
- `GET /api/external-suppliers` — 내가 등록한 외부공급업체 목록(+product_count).
- `GET /api/external-suppliers/:id/products` — 소유 검증 후 그 업체 SupplierProduct 목록.
- `POST /api/external-suppliers/:id/products` — 소유 검증 + 검증(name*, unit_price*≥0, base_quantity, min_order_quantity, unit, lead_time_days). sku 자동 `SP-{id}-NNNN`. option group 미사용.
- `PUT /api/external-suppliers/:id/products/:productId` — 소유 + product.supplier_company_id===id 검증 후 필드 수정.
- `DELETE /api/external-suppliers/:id/products/:productId` — 소유 검증 후 soft delete.
- 경로② 원샷(선택): 프론트가 POST products(생성) → from-catalog(매핑) 2콜로 오케스트레이션(원자성 불필요, 기존 검증된 엔드포인트 재사용).

검증 미러: `supplier-products.js` create(line 542~620) 필드/검증. 응답 표준 `{success,data}` / 에러 `{success:false,message,code?}`.

## 5. 프론트 (RA)
- **경로① — SupplierProfilePage.tsx**(`/pos/suppliers/directory/:id`): 소유 외부공급업체일 때 카탈로그 섹션에 "Add Product" + 상품 카드 Edit/Delete. 표준 Modal + Form* + ImageUploadDropzone, 단위 FormSelect(kg/g/L/ml/piece/pack/can/bottle), 단가 number.
- **경로② — IngredientsTab.tsx** Sellers 영역: "외부공급업체로 등록" → 소유 외부업체 SearchableSelect + 재고명/단위 prefill + 단가 → POST products → from-catalog 매핑.
- 공용: Modal/ModalButton/Form*(components/UI/Modal), SearchableSelect, ConfirmModal(alert 금지), formatCurrency. 팔레트 #635BFF/#0A2540/#4B5563/#C7CED6(이웃 파일 일관). i18n=supplierDirectory ns(en/ko/zh/ms).

## 6. 검증 계획
- 실API: 상품 CRUD write→read, 소유권 가드(플랫폼 공급업체 상품 생성 시도→403, 남의 외부업체→403), 생성한 상품이 supplier-catalog/seller-sources 로 연결되어 발주 가능, 경로② 원샷.
- mount(RA SupplierProfile·IngredientsTab) 크래시 0, build, health, print-guard, design-guard, i18n.

## 7. 후속 (BG/FG)
동일 백엔드 재사용. 프론트만 BG(ProductIngredient)·FG 대응 추가.

---

## 8. 경로② 정정 (2026-06-22, Irene 확정) — "재료를 외부공급업체 상품으로 등록"

> 기존 경로② 구현이 **자유입력 "+ New supplier — will be created"** 로 흘러 (a) 엉뚱한 소스(빈 목록)를 검색하고 (b) "아까"식 인라인 생성과 혼동됨. 아래로 **정정**한다.

**핵심 모델 (Irene 확정):** 외부공급업체 = 솔루션 사용 공급업체와 **똑같이 취급**(supplier_companies + supplier_products + 계약). 재료에서의 공급업체 연결 방법은 헷갈리지 않게 **단일**.

**이 기능 = "상품 등록"이며, 시작점을 재료로 잡아 편하게 하는 것:**
1. **업체 선택** — 이미 등록된 **외부공급업체 중에서 선택**(SearchableSelect). 자유입력 즉석 생성이 기본 아님(없으면 "외부공급업체 먼저 등록" 안내/링크).
2. **상품 등록** — 이 재료를 그대로 그 업체 상품으로 등록(이름·단위 prefill + 단가·MOQ). → `SupplierProduct` 생성 + `IngredientSellerProduct` 매핑 → supplier-catalog/발주 자동 합류(솔루션 공급업체와 동일 경로).

**범위:**
- **지금**: 레스토랑 관리자(RA)만.
- **후속(보류, 명시)**: 브랜드제너럴이 보낸(brand-shared) 외부공급업체는 **상품도 같이 내려오게** — 이번 미포함.
- 레거시 `suppliers` 테이블 OWN(Demo Premium Meats 등)은 발주되려면 외부공급업체(supplier_companies)로 등록/정리 필요 — 별도 정리 대상(이번 미포함).

**왜 "demo/fre" 안 떴나(확정):** 재료 모달이 `supplier_companies`(외부) 를 검색하는데 r5의 OWN 공급업체는 **레거시 `suppliers` 테이블**에 있어 서로 다른 테이블. + r5의 supplier_companies 외부등록은 0개였음.

---

## 9. 외부공급업체 프라이버시 + 브랜드공유 활성/비활성 (2026-06-22, Irene 확정)

**9-1. 외부공급업체는 등록한 본인 매장에만 (구현 완료·DEV)**
- 문제(실호출 확인): `GET /api/supplier-directory` 가 `status:'active'` 만 걸어 **남의 매장이 등록한 외부공급업체까지 노출**(r5가 r38 비공개 외부공급업체 검색됨).
- 수정: 디렉토리/검색 = **(a) 시스템 가입 공급업체(공개 마켓) + (b) 내 buyerEntity 가 등록한 외부공급업체**만. 남의 외부(is_system_registered=false + registered_by≠나)는 제외. (`routes/supplier-directory.js` GET /supplier-directory, Op.and 결합)
- 검증 4/4: 남의 외부 차단 · 내 외부 보임 · 시스템 공급업체 보임 · 본인은 자기 것 보임.
- 상품 등록 권한은 이미 소유 가드(registered_by + is_system_registered=false)로 막혀 있었음 — 이번엔 **목록 노출**까지 좁힘.

**9-2. 브랜드가 보낸(brand-shared) 공급업체 = 참고용 + 매장이 활성/비활성 선택 (설계·미구현)**
- 브랜드가 내려준 공급업체(BRAND SHARED, `suppliers` owner_type=brand)는 **참고만**. 매장이 **쓸지 말지 active/inactive 토글**.
- 필요: 매장별 override 플래그(per-restaurant). 후보 = 신규 경량 테이블 `restaurant_supplier_prefs(restaurant_id, supplier_id, is_active)` 또는 restaurant JSON. 토글 UI(Suppliers BRAND SHARED 행).
- DB 변경이라 설계 확정 후 구현(이번 미구현, 다음 작업).

---

## 10. 공급업체 체계 통일 마이그레이션 (2026-06-22, Irene 확정 — 구현 예정)

**결정:** 레거시 `suppliers` 테이블(OWN/brand)을 `supplier_companies`(외부공급업체 체계)로 통일. 한 체계 → 재료 picker/카탈로그/발주/디렉토리 일관.

**규모(dev 실측):** 레거시 `suppliers` 10개(restaurant 6 + brand 4) · `supplier_companies` 외부 0 · `ingredients.supplier_id` 링크 16건.

**구현 단계 (각 단계 검증, dev 우선, 운영은 별도 백업+마이그):**
1. **마이그레이션 스크립트(멱등)**: 각 레거시 supplier → `supplier_companies`(is_system_registered=false, registered_by_entity = owner_type/owner_id, 연락처·주소 복사, status active) + active `SupplierContract`. old supplier.id → new sc.id 매핑 보존(legacy_supplier_id 컬럼 또는 매핑표). **실행 전 suppliers+supplier_companies 백업.**
2. **재료 링크 이전**: `ingredients.supplier_id`(16) → 각 재료를 new sc 의 `SupplierProduct`(재료명·단위·원가)로 생성 + `IngredientSellerProduct` 매핑. (발주 연결 유지)
3. **읽기 소스 전환(이중표시 방지)**: Suppliers 메뉴 OWN/BRAND SHARED 를 `suppliers` 테이블 → `supplier_companies`(registered_by)로 전환. all-suppliers 엔드포인트/AllSuppliersView 수정. (안 하면 같은 업체가 OWN+CONTRACTED 두 번 뜸)
4. **Add 흐름 전환**: Suppliers "Add Supplier"(현 POST /restaurants/:id/suppliers → suppliers 테이블)를 외부공급업체 생성(POST /external-suppliers)으로. 앞으로 OWN 신규도 supplier_companies.
5. **브랜드공유 활성/비활성(§9-2)**: 통일 후 brand registered_by 공급업체를 매장이 toggle. restaurant_supplier_prefs 또는 contract status로.

**검증:** 마이그 전후 카운트 일치 · 재료 발주 가능 · Suppliers 메뉴 중복 표시 0 · OWN 이 재료 picker 에 노출 · 누출 가드(§9-1) 유지 · health/print-guard/mount.

> 주: 이번 세션에서 ①디렉토리 프라이버시(§9-1) ②재료 picker 선택방식(§8) ③ConnectSellerModal 검색창 정렬은 완료(DEV). 이 §10 통일 마이그레이션은 **다음 집중 작업**(데이터 이전이라 백업+단계검증 필요).

---

## 11. 외부 공급업체 상품 목록 정렬 — Irene 목록 기준 이름·규격·가격 (2026-09-11 Fable 설계 · Irene 「fable 권고대로」 확정)

> Irene 원문: 「이 내용이 우리 공급업체들 이름이야. 영문(한글) 이렇게 이름 좀 다 맞춰줘. … 브랜드제너럴에 있는 것도, 위드민카페에 있는 것도 맞춰줄 수 있어? … 제대로 개발정리한 후 DB내용 제대로 맞춰줘. 이거기준. 그리고 내가 준 것중에서 동일한 아이템이 없으면 추가도 해줘. 기존에 있는 건 수정해주고.」
> 규칙(이름·포장단위 어휘·표기 해석) 단일 기준 = `docs/TRADE_STRUCTURE.md` §2-2 «판매 상품 규격 표기·어휘». 이 절은 **반영 절차**만.

### 11-1. 대상 (운영 실측 2026-09-11, SELECT 만)
- 외부 공급업체(`supplier_companies.is_system_registered=0`) 38곳: 브랜드 1 «with MIN» 등록 27 · 매장 10 «with MIN Cafe» 등록 8 · 매장 13 «Seoul Garden BBQ»(데모, 브랜드 K-Taste Group) 3 — 매장 13 의 3곳(Test · Fresh Farms KL · Prime Ingredients)은 목록에 없음.
- 판매 상품 352개 · 재료↔판매 상품 연결 672행(환산값 1 인 연결 630).
- Irene 목록 359행(원본 = 세션 붙여넣기, 탭이 공백 4칸으로 옴). 칸 = [한글, 영문, 코드, 공급업체, (예전 규격, 예전 가격), 규격, 가격] — 5·6칸 뜻은 Irene 확인 대기.

### 11-2. 절차 — 한 번에 덮어쓰지 않는다
1. **개발 정리 먼저**: 규격 한 줄 표시(`1 kg/pack` · `× 2 pack`) · 취급단위/포장단위 선택지 분리 · 포장단위 어휘 추가 · 공급업체용 문서 영문 이름. dev 빌드 1회 · verify-all --full 1회.
2. **검토표**(스크립트, 쓰기 없음): 목록 행 → 짝 지은 기존 상품(영문명+공급업체) → 새 이름·규격·가격 → `update`/`add`/`exclude`/`check`. 짝 후보 2개 이상은 **자동 수정 금지**(`check`).
3. **Irene 은 `check` 행만 답한다.**
4. **적용**: 대상 행 전체 백업 JSON → 트랜잭션 1개 → 재조회 대조. 운영 쓰기는 ssh·운영 백엔드 계정 경로.
5. **연결 환산값 2차**: 규격이 채워진 상품 중 «환산값 1 인데 공식값이 다르고 단위 차원이 맞는» 연결만 갱신(검토표에 함께 표시). 이미 담긴/받은 발주 줄은 담을 때 복사한 값이라 영향 없음.
6. **뒤처리**: 대기 발주 2건(PO-R10-20260909-001 · PO-R10-20260911-001)은 제출하지 않고, 연결이 고쳐진 뒤 줄 지우고 다시 담기. 입고 끝난 발주 33 은 별도 소규모 정리(줄 단위 9 · 순두부 재고 6 g→1,800 g·원가 · 재료 단위).
7. **되돌리기**: 백업 JSON 의 원래 값으로 같은 행만 되돌리는 스크립트를 적용 스크립트와 함께 만든다.
8. **게이트**: 운영 대량 쓰기 + 발주 단가 변경 → Fable 게이트 1회. 고장주입 — 해석기에 이상 표기를 넣으면 `check` 로 떨어지는지 · 짝 2개인 행이 자동 수정되지 않는지.

### 11-3a. 검토표 (2026-09-11 · `utils/catalogSpecParser.js` + `scripts/catalog-alignment.js review` · 운영 SELECT 스냅샷 · 범위 brand:1,restaurant:10 · 쓰기 없음)
- 359행 → `update` 291 · `same` 1 · `add` 26 · `check` 38 · `exclude` 3 · 용량 미상 92 · 연결 환산 제안 146 · 새 공급업체 Hero Market · Mr. DIY · 목록에 없는 기존 상품 30.
- 초안(아래 11-3)보다 `check` 가 늘어난 이유: **목록 두 줄이 같은 기존 상품에 짝**(Egg/Egg D · Glass Noodle 14kg/1kg · Hotteok/Hotteok HOIHOI · 김밥용 김 2줄)을 잡아 자동 수정에서 뺌 · 영문명 빈 행 1.
- 용량 미상 규칙은 Fable 보정(piece/1/포장 이름) 반영.

### 11-3. 해석기 초안 결과 (2026-09-11, 운영 SELECT 데이터 기준 · 쓰기 없음)
- 359행 → `update` 299 · `add` 27 · `check` 30 · `exclude` 3(공급업체 칸 빈 행: 배송비·계량스푼·Yuki 김치 메모).
- 규격 해석: `a`(용량/포장) 95 · `b`(1포장/용량) 12 · `c`(1포장(용량)) 7 · `d`(1포장 단독) 110 · `e` 단독 용량 94(무게 주문 43 · 포장 51) · 빈 칸 21 · 해석 불가 17.
- `check` 사유: 해석 불가 표기 17(`1/kg` · `1pkt/24can` · `12can/CT` · `12pkts(450g)/1bundle` · `24can/ctn` · `6btl/ctn` · `60*200g` · `12ea/238ml` · `100매` · `3kg/CN` · `1CT(24ea)238ml` · `300~330g` · `6rolls/1pkt` · `Kraft /300 pcs` · `RM9/pkt` · `10rolls/pkt`) · 한글·영문 다른 물건 11 · 새 상품인데 규격 빈 칸 2.
- 목록에 짝이 없는 기존 상품 31(이름만 다른 경우 섞임 — 예 `Beef_Aust Midfield Brisket PEDO` vs `Aust Midfield Brisket PEDO`). 처리 방침은 Irene 확인 대상.

### 11-5. 지난 발주 표시 — Irene 요청 · 판단 대기
> Irene 원문: 「기존 발주한 내용들이나 POs에 있는 것도 정보 맞춰서 나오게 해줘」
- 운영 실측(SELECT, 범위 brand 1·restaurant 10 외부 공급업체 발주): 21건(2026-08-25~09-11) · received 15(90줄) · cancelled 3(8) · draft 2(11) · submitted 1(1).
- **줄 규격 스냅샷(`base_quantity`·`base_unit`) 있는 줄 0/110** — 전부 SW 5.09 이전에 담긴 줄. 이름(`seller_product_name`)은 read-time 조인이라 상품 이름을 고치면 지난 발주에도 따라 나온다.
- 줄 `unit`: kg 53 · pack 24 · piece 21 · pkt 4 · g 4 · ea 2 · bottle 1 · can 1 · 현재 판매 상품 단위와 다른 줄 32 · 대조 끝난 발주 1(발주 33) · 결제 1.
- 부딪치는 결정: §2-2 «발주 줄은 주문 시점 용량 스냅샷 — 판매자가 나중에 규격을 바꿔도 지난 발주서·대조가 흔들리지 않는다».
- **Fable 게이트 판정(보정 2): 한다 — «있는 스냅샷을 덮지 말라» 이지 «빈 칸을 채우지 말라» 가 아니다.** 적용 CLI ⑥단계(상품 반영 **뒤**, 고쳐진 상품에서 계산):
  - 입고가 시작된 줄(received 등, 받은 수량 > 0 포함): 줄 `unit` 라벨 + `base_quantity`·`base_unit` 만. **`unit_conversion`·수량·단가 무접촉** — 재고는 이미 «수량 × 환산값»으로 들어갔고 반품(`routes/po-returns.js`)이 같은 환산값으로 되돌린다. 금액(수량×단가) 불변이라 대조·결제 끝난 발주도 안전.
  - 아직 받지 않은 줄(draft·pending_approval·submitted · 받은 수량 0): 위 + `unit_conversion` 을 연결의 현재 환산값으로 → 앞서의 4번 «지우고 다시 담기» 불필요.
  - cancelled: 무접촉.
  - 쓰기 직전 `assertPoLineWrite(status, quantity_received, fields)` 가 막는다(단일 소스 `utils/catalogSpecParser.js`).
- 운영 검토표(오프라인): 11건 49줄 — received 37(라벨·규격만, 환산 변경 0) · draft 11 · submitted 1(환산 변경 11).
- 발주 33 순두부 재고(6 g→1,800 g)·원가·재료 단위 5개는 이 단계가 아니라 **별도 소규모 정리**(환산값·배치를 만지는 일).
- 가격 배수 안전장치(보정 1): 가격이 2배 이상/절반 이하로 바뀌는 행은 check(운영 검토표에서 냅킨 7.8→78 이 새로 걸림).

### 11-4. 화면·문서 실측 (2026-09-11 dev 코드 조사, 읽기만)
**공급업체에게 나가는 문서의 상품 이름** — `seller_product_name` = `supplier_products.name`(판매자가 supplier 일 때만, `utils/sellerProductIdentity.js:44-58`). `purchase_order_items.description` = 담을 때의 **우리 내부명 스냅샷**. `invoice_name` 은 문서에 안 쓰이고 대조 매칭에만.
| 문서 | 이름 순서 | 틈 |
|---|---|---|
| WhatsApp/mailto `utils/poShare.ts:87-88` | seller_product_name → product_name → ingredient_name | 없음(SP- SKU 숨김) |
| 백엔드 PDF `routes/purchase-orders-workflow.js:295-309,365-367` | supplier_products.name → 재료명 → description | **`Buyer ref: 내부명` 찍힘 · SP- SKU 안 거름** · Unit 칸 따로 |
| 인쇄 `PurchaseOrderPrintPage.tsx:335-346` | seller_product_name → 재료명 → description | Unit 칸 따로 |
| 외부 발주 메일 `utils/poEmailItems.js:40` · `notificationTemplates.js:538` | seller_product_name → 재료명 → description | 없음 |
| 수신 화면 `IncomingOrdersView.tsx:1430-1443` | seller_product_name → 재료명 → description | **`Buyer ref: 내부명` 표시 · SKU 안 거름** |
- 브랜드·푸드코트가 판매자인 발주는 판매자 상품명이 없어 모든 문서에 우리 내부명이 나감.

**규격을 따로 떼어 보여주는 자리** (발주 흐름 화면 — 카트·Staging·상세·대조·수신 — 은 이미 `sellerSpecText`/`lineSpecText` 한 줄)
- 상품 카드: 공급업체 상품 `SupplierProductsTab.tsx:919-926`(`10 kg` 만, 포장 없음) · 외부 공급업체 프로필 `SupplierProfilePage.tsx:724-725`(가격 뒤 `/kg` 만) · 브랜드 상품 `BrandProductsTab.tsx:1062-1066`(`kg` 만) · 푸드코트 `FoodcourtProductsTab.tsx:571-575`(`kg` 만).
- 상품 폼: 공급업체 4칸+주문방식(`SupplierProductsTab.tsx:1082-1189`, 문구 직접 조립 `10kg/BOX` 띄어쓰기 없음 · `(10kg per unit)` 포장 무시) · 브랜드 3칸+주문방식(`BrandProductsTab.tsx:1215-1286`, 직접 조립) · 외부 공급업체 프로필 3칸(공용 함수 미리보기) · 푸드코트 2칸(포장단위·주문방식 없음).
- 재고 재료 카드의 발주처 칩: `IngredientsTab.tsx:1253-1268,1547-1560` · `ProductIngredientsTab.tsx:841-853,1111-1114` — 규격 없음(sellers 타입에 단위 필드 없음).
- 인쇄·PDF 는 Qty 와 Unit 이 다른 칸.

### 11-6. K-DINE IPC 공급업체 상품 93건 (2026-09-17 · 운영 반영 완료)

Irene 이 3칸 목록(업체 · 품목 · Standard Unit) 93줄을 주며 「K-dine ipc 공급업체 정보로 들어가면 되는거야」라고 지시.

**왜 매장 소유로 넣었나 — 외부 공급업체는 «계약» 이 아니라 «등록 주체» 로 보인다**
구매자가 보는 외부 업체 = 자기가 등록한 것 ∪ **부모 브랜드가 등록한 것**(`routes/supplier-directory.js:1248~1258` · `loadVisibleExternalSupplier`).
매장 8(K-DINE IPC)의 브랜드는 **2(K-DINE with MIN)** 인데, 기존 TaiYangFresh·LSH·New Seoul Mart 등은 **브랜드 1(with MIN)이 등록**한 것이라 매장 8 에는 **원래 안 보인다.**
→ 그 업체들에 상품을 더하는 길은 목적을 못 이루고 브랜드 1 카탈로그만 오염시킨다. **매장 8 소유로 새로 등록**하는 것이 정답.
같은 회사 이름이 구매자마다 따로 있는 것은 이 구조의 정상이다(Direct·Shopee 선례 · `catalog-alignment.js:95` «다른 구매자의 같은 이름 공급업체에 짝을 짓지 않는다»).
⛔ 그래서 **«비슷한 이름 47건» 은 짝지을 대상이 아니다** — 다른 구매자의 카탈로그다. 검토표를 만들지 않고 목록 그대로 넣었다.

**적용 전 실측 (운영 SELECT)**
`restaurants.id=8 → brand_id=2` · 매장 8 등록 공급업체 **0건** · 브랜드 2 등록 공급업체 **0건**.

**도구·데이터**
- 09-11 도구 재사용: `scripts/catalog-alignment.js review|apply`(연습 기본 · `--commit` 에서만 쓴다)
- 데이터 `scripts/data/irene-kdine-ipc-supplier-catalog-2026-09-17.txt` — 8칸 중 영문·업체·규격만. Irene 원문 순서·철자 보존, `Shoppee → Shopee`(플랫폼 실명)만 반영.
- 코드 변경 **2줄**: `utils/catalogSpecParser.js` 의 `CONTENT_WORDS` 에 `lt`·`litre`·`liter` → `L`. **어휘만 늘렸고 규칙은 그대로.** jest 2케이스 추가(`tests/catalog-spec-parser.test.js`) — Litre 가 규칙 a 로 읽히는지 · 모르는 단위는 여전히 `unparsed`(check). 반증: 어휘를 빼면 첫 케이스가 실패 → 원복.

**해석기가 못 읽은 3건 — 원문 표기 → 저장값** (Irene 제안 승인)

| 원문 표기 | 품목 | 저장값 |
|---|---|---|
| `450mm/pkt` | Cling Film 18inch | `piece` · 1 · `pack` (450mm 는 폭) |
| `40pair/pkt` | Bamboo Chopstick | `piece` · 40 · `pack` |
| `840g/6pkt/1CT` | Vit's Instant Noodle_VIT | `g` · **5040**(=6×840) · `carton` |

**검토표·연습 (개발·운영 동일)**
`rows 93 · update 0 · same 0 · add 90 · check 3 · exclude 0 · capacity_unknown 6 · link_conversion_changes 0 · existing_not_in_list 0 · new_companies 8 · po_lines 0`
연습 실행: `updates 0 · adds 93 · companies 8 · links 0 · skipped 0`

**운영 적용 결과 (2026-09-17)**
`적용 완료 {updates:0, adds:93, companies:8, links:0, skipped:0, created_products:93, cost_sync_errors:0}`
- 매장 8 소유 공급업체 **8곳** · 계약 **8건 전부 active** · 상품 **93건 · unit_price 전부 0**
- **브랜드 1 업체 상품 313건 무변경** — 행별 해시 `8dcedaa9a8016b0d8a630cdee509c352` 적용 전후 동일(GROUP_CONCAT 은 1024 에서 잘려 쓰지 않았다)
- 매장 8 계정 실호출: `GET /external-suppliers` **8곳** · 발주 카탈로그 총 202건 중 **새 상품 93건 노출**
- 되돌리기: 운영 `~/backups-kdine-catalog-2026-09-17.json` (레포 밖 — 게이트 지문이 흔들리지 않게)

**가격**
목록에 가격이 없어 `unit_price = 0` 으로 넣었다. 0 은 「결정 없음」이라 `costSync` 가 전파하지 않는다(`services/costSync.js:152`). 화면엔 `RM 0.00`. 채우는 길: 인보이스 대조 «Use this price»(등록 주체 본인의 외부 업체만 허용 — 매장 8 소유라 열린다) 또는 상품 편집.

**⚠ 운영 반입 경로**
수정한 `utils/catalogSpecParser.js` 와 데이터 파일을 **scp 로 `production-backend` 에 직접 반입**해 실행했다(배포 밖 경로). 어휘 2줄이라 런타임 위험은 없지만 «운영에 배포 스냅샷과 다른 파일이 있는 상태」이고, **이 커밋이 다음 배포에 포함되면 정합이 맞는다**(추가만이라 순서 무관). 09-11 도 같은 경로였는지는 **확인 불가**.

**되돌릴 수 있는가 — 연습으로 증명 (2026-09-17, 쓰기 없음)**
`rollback --backup /home/irene/backups-kdine-catalog-2026-09-17.json` (commit 없이)
→ `{removed_products: 93, removed_contracts: 8, removed_companies: 8, conflicts: 0}`. 넣은 것을 정확히 되돌리는 계획이고 충돌 0.

**돌리지 않은 검사와 그 이유**
- `ingredient-unification` 인스펙션 — **불필요**. 그 3건은 `supplier_products` 를 읽지 않는다(grep 0건). 다음 배포 게이트에서 어차피 돈다.
- 화면 mount sweep — **불필요**. 프론트 변경 0 · 빌드 0. 카탈로그 응답은 매장 계정 실호출로 이미 증명했다.
