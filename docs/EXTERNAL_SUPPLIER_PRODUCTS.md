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
