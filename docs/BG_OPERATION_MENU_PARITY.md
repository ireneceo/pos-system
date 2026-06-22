# 브랜드제너럴(BG) 오퍼레이션 메뉴 동일 적용 계획 (2026-06-22, Irene 지시)

> 목표: RA(레스토랑 관리자)에 적용한 공급업체·발주(PO) 오퍼레이션 흐름을 **브랜드제너럴(BG)에도 동일하게**, BG 체계에 맞게 적용. 본 문서는 **미리 정리(설계)** — 다음 섹션에서 구현. RA 디자인/공용컴포넌트 기준 유지.

## 0. 전제 — 두 체인은 분리, 발주는 공유 ([[reference_bg_ra_product_chains]])
- RA: 메뉴 → 레시피(Recipe) → 재고(**Ingredient**, restaurant 소유) → 발주
- BG: Product(BrandProduct) → ProductRecipe → 재고(**ProductIngredient**, owner 공유) → 발주
- 발주/공급업체는 **buyerEntity(restaurant|brand|foodcourt)** 로 이미 공용. 카트키·merge·consolidate·external-suppliers·supplier-catalog 모두 buyerEntity 기반 → **BG 는 이미 상당 부분 동작**.

## 1. 이미 BG 동작(buyer-agnostic, 검증만 필요)
- 카트 영속화 키 `po-cart:brands:{brandId}` (buyerEntity.type='brands')
- bulk 제출 mergeDraft / consolidate-drafts / DELETE PO / DELETE item — 전부 buyerEntity 스코프
- 외부공급업체 등록·디렉토리 프라이버시(registered_by=brand) / supplier-catalog(brand 계약)
- staging(Pending POs) = brand draft / Submit All

## 2. BG 에 맞게 손볼 곳 (RA 전용 UI → BG 대응)
- **재료→외부공급업체 상품 "Products" 브리지**: RA 는 레거시 `suppliers`(owner_type=restaurant) → `from-legacy`. BG 는 `suppliers`(owner_type=brand) 또는 ProductIngredient 기반 → from-legacy 의 brand 분기 확인(이미 owns 체크에 brand 포함). BG 재고 화면(ProductIngredient)에서 동일 "Products"/연결 진입 필요.
- **NewPurchaseOrderPage "mine" 탭**: BG 는 `product-ingredients?include=sellers`(ProductIngredient) 사용 — 이미 buyerEntity 분기 있음(getMyEntity brands). 카트/Planned Order 개명·Pending POs 링크 그대로 적용됨(공용 페이지).
- **Suppliers 메뉴(Direct/Find/Contracts)**: AllSuppliersView 가 BG(brandId) 분기 보유 — OWN Products 브리지 버튼이 BG own(brand suppliers)에도 뜨는지 확인.
- **ConnectSellerModal**: buyerApiBase 가 brand 일 때 `/api/brands/{id}` — 이미 분기.

## 3. 후속(브랜드 특화)
- 브랜드가 보낸(brand-shared) 공급업체 = 매장 참고용 + 활성/비활성 토글(docs/EXTERNAL_SUPPLIER_PRODUCTS.md §9-2) — BG→가맹점 전파와 연계.
- BG 다매장: 발주 buyerEntity=brand 단일. 가맹점(restaurant)별 발주와 혼동 금지.

## 4. 다음 섹션 작업 순서(제안)
1. BG 계정으로 §1 항목 실API 검증(카트/merge/consolidate/external/발주) — 동작분 확정.
2. §2 UI 진입점 BG 대응(재고 ProductIngredient 화면에서 Products/연결).
3. /검증(역할별: RA·BG) + 실프린터 무관(발주는 인쇄 무관).
4. 배포는 Irene /배포.

## 5. 참고
- 공용 컴포넌트 의무(DataTable/Modal/ConfirmModal/SearchableSelect/ThemedButton), RA 디자인 기준.
- buyerEntity snake_case 함정 주의([[reference_user_object_snake_case]]) — brand_id(snake) 읽기.
- 발주 흐름 전체: `docs/PURCHASE_ORDER_SYSTEM.md` §H.
