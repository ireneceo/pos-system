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
