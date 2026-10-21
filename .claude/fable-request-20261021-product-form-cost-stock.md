# Fable 설계 요청 — 상품 추가 창에서 원가 입력 · 재고 수량 자리 (2026-10-21 · 작업방 669bfa10)
결과 파일: .claude/fable-design-20261021-product-form-cost-stock.md (Fable 이 씀)

## Irene 원문
«브랜드제너럴이랑 공급업체가 상품추가할 때 원가도 여기서 넣게하고 동기화하면 되지 않아? 스톡수량 넣으면 동기화되는지 확인해줘, 이 스톡수량은 스톡상품의 경우에 적용되니 아래 스톡연결하는 곳에 있어야 하는 거 아니야? Edit Product 체크해»

## 읽을 것
docs/TRADE_STRUCTURE.md §2·§2-1·§5-7·§5-12 · dev-backend/services/costSync.js(머리 주석 «원가는 공급업체 가격에서 나온다. 사람이 따로 넣는 값이 아니다» · onlyIfZero)
· 브랜드 창 dev-frontend/src/pages/BrandProductManagement/BrandProductsTab.tsx (submitProduct 743~ · 폼 1400~1860: 가격 → 상품 종류 → «현재 재고» 칸(1475, 레시피·재고아이템 없고 kind=stock 일 때만) → … → Linked Product Recipe → Stock Item (direct) 칸(1690~, 연결 시 «We sell / We buy / Margin» 줄 + «Where do we buy this?» · «Create supplier product», 미연결 시 «Also create a stock item…» 체크))
· 브랜드 서버 dev-backend/routes/brand-products.js (POST 1031~ startQty 장부 initial · PUT 1194~ · POST /brand-products/:id/stock-item 1487~ 새 재고아이템 unit_cost:0 «원가는 사 오는 쪽이 정한다 — 판매가를 베끼지 않는다» · current_stock:0)
· 공급업체 창 dev-frontend/src/pages/Supplier/SupplierProductsTab.tsx(폼 990~) · 서버 routes/supplier-products.js(POST 617 current_stock:0 · PUT 766 current_stock 직접 씀) · 재고 화면 SupplierInventoryPage / routes/supplier-inventory.js(current_stock 직접 변경)
· dev-backend/routes/product-ingredients.js(재고아이템 생성 596~630 unit_cost 손입력 받음 · 수정 684 unit_cost 허용)

## 팀원 실측 (개발 · 데모 브랜드 계정 API 실호출 · 2026-10-21)
1. 브랜드 «Add Product» 에 현재 재고 7 + «Also create a stock item» 체크와 같은 호출(POST /brand-products current_stock 7 → POST /:id/stock-item)
   → 상품 13810 current_stock **7.00** 그대로 · 새 재고아이템 6267 current_stock **0.00** · unit_cost **0**. 즉 넣은 수량이 재고아이템으로 안 가고 상품 자체 재고(§5-7 숨은 재고)에 남는다. 서버 주석 규칙은 «다이렉트면 재고는 그 재고아이템에 — 프로덕트 자체 재고와 두 곳에 두지 않는다»인데 /stock-item 연결 길은 상품 current_stock 을 안 비운다.
   (PUT 으로 재고아이템을 연결하면 자체 재고를 장부 adjustment 로 0 으로 만든다 — 수량이 재고아이템으로 옮겨지지 않고 사라진다.)
2. 이미 재고아이템을 연결한 상품을 Edit Product 로 열면 재고 칸이 사라지고, 연결된 재고아이템의 현재 재고는 창 어디에도 안 보인다(원가는 «We buy» 줄·RM 표시만).
3. 브랜드 창에 원가 입력 칸 없음. 원가 = 재고아이템 unit_cost(공급업체 연결 «Where do we buy this?» 에서 costSync 로 채워짐). 재고아이템 화면에서는 unit_cost 손입력 가능(생성·수정 둘 다).
4. 공급업체 창: 재고 칸 없음(생성 시 0, 재고는 Inventory 화면) · 재고아이템 연결 개념 없음(공급업체 상품 행 자체가 재고) · 원가 칸 없음 · supplier_products 에 원가 컬럼 없음.
- 시험 상품 13810 «[확인용] 재고시험…» · 재고아이템 6267 은 데모 브랜드에 남겨 둠.

## 제약
운영 쓰기·배포 없음 · 새 목록·새 테이블·자동 복제 경로 금지(구조 문서 먼저) · 🔒 인쇄/KDS 무접촉 · 이 방 다른 미커밋(출퇴근·모바일 테이블) 무접촉

## 바라는 결과
설계(무엇을 어디에 두고 무엇과 동기화하는가) + Irene 컨펌이 필요한 항목(선택지·결과·Fable 권고) + 팀원이 바로 구현할 수 있는 범위
