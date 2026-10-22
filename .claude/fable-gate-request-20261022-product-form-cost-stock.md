# Fable 검증(gate) 요청 — 상품 창 원가·재고 (2026-10-22 · 작업방 669bfa10)
설계: .claude/fable-design-20261021-product-form-cost-stock.md (Irene «권고대로 진행해 줘» — ①~⑤)
결과 파일: .claude/fable-gate-20261022-product-form-cost-stock.md (Fable 이 씀)

## 바뀐 파일 (이 방 몫만 — 같은 폴더 다른 방 미커밋: 출퇴근·모바일 테이블·오너 발주 승인, 무접촉)
- dev-backend/routes/brand-products.js — STOCK_ITEM_ATTRS 상수(include 5곳) · POST /:id/stock-item: 새로 만들 때 unit_cost·current_stock(장부 initial) · 연결 뒤 자체 재고>0 이면 장부 adjustment 0(PUT 과 같은 문구) · seller_source 가지 recomputeUnitCost onlyIfZero
- dev-backend/routes/product-ingredients.js — from-catalog existing_product_ingredient_id 가지: connectExisting 성공(<300) 뒤 recomputeUnitCost onlyIfZero
- dev-backend/routes/supplier-products.js — PUT current_stock → 400 USE_INVENTORY_ADJUST
- dev-frontend/src/pages/BrandProductManagement/BrandProductsTab.tsx — 상품 종류 아래 재고 칸 삭제 · Stock Item 블록 안 A/B/C 상태 · submitProduct(current_stock 은 A 일 때만 · B 는 /stock-item 에 원가·개시 재고 · C 는 바뀐 칸만 PUT /product-ingredients/:id · adjust-stock) · fetchStockItems(저장 뒤 다시 읽기) · 마진 폴백 = 원가 칸 값 · 중복 확인창 한 줄 · 원가 라벨 포장명 비면 pack
- dev-frontend/src/pages/Supplier/SupplierProductsTab.tsx — 등록 «개시 재고» → /supplier-inventory/adjust(reason Opening stock) · 수정 창 읽기 줄+Inventory 링크 · **설계 밖 1건: `unit_price: unitPrice` 되살림** (커밋 40fd0123b 2026-08-30 이 요청 본문에서 실수로 지움 → 그 뒤 공급업체 «Add Product» 는 400 «unit_price is required», 수정한 단가는 저장 안 됨. 화면 클릭으로 재현·수정 확인)
- i18n brand.json·supplier.json 4언어 · scripts/health-check.js 끝에 defineProductFormCostStockTests(P1·P3·P6) + 호출 한 줄

## 자체 검증 숫자 (개발 · 실호출 · 실브라우저)
- P1 API: 원가 3.5·개시 7 → 상품 0 · 재고아이템 7 · 3.5 · 장부 initial 1줄(7) · 상품 장부 0
- P3 API: 자체 재고 7 상품 → /stock-item 연결 → 상품 0 · 장부 adjustment −7 «Linked to recipe/stock item — self stock cleared»
- P4 API(from-catalog, 판매자=브랜드상품 #4 RM 2500/kg, 재고아이템 g·기준 1000): 원가 0→2500 · 9.99 그대로 · piece(비호환) 0 그대로
- P5 LINK_EXCLUSIVE 400 그대로
- P6 API: 개시 재고 10 + manual_adjust «Opening stock» 1줄 · PUT {current_stock} 400 USE_INVENTORY_ADJUST(수량 그대로) · 단가 PUT 200
- 고장주입 2/2: 자체 재고 비우기 끔 → P3 상품 7 남음(실패) · from-catalog 재계산 끔 → P4 원가 0 남음(실패) → 원복 · pm2 재시작 뒤 다시 통과
- 화면(1440, 데모 브랜드): A 칸이 Stock Item 블록 안 · B 체크 → 원가·개시 재고 칸 · 화면 등록 B → 상품 0 · 재고아이템 9 · 6.5 · C 수정 창 값 3.5/7 표시 → 4/5 저장 → 원가 4 · 재고 5 · 장부 adjustment −2 «Edited in product form» · 호출 2회 · 안 바꾸고 저장 호출 0 · 13810(옛 결함 상태) 경고 표시 → 저장 → 상품 0 + 장부 기록(dev «다이렉트+자체재고>0» 1→0) · 원가 라벨 «Cost of 500 g/pack (RM)» · 콘솔 오류 0
- 공급업체 화면: 등록(단가 15.5·개시 10) → 15.5·10·기록 1줄 · 수정 창 읽기 줄 · 단가 16 저장 · 재고 10 그대로
- health-check pos 58/58 · security 95/95(새 3건 포함, 뒷정리 잔재 0) · print-guard 8/8 · design-guard 신규 0 · i18n 통과
- verify-all --full 1차: 22/24 — ✗ 배포 준비(배포 방 몫) · ✗ 인스펙션 신규 4 = 제 P4 시험 행(사람 값 9.99 · piece↔kg 연결) → 시험 행 9개·매핑 9개 삭제 → 인스펙션 신규 0 · mount sweep 크래시 0 · 타입 기준선 신규 0
- verify-all --full 2차: 23/24 — ✗ 배포 준비만(배포 기록·SW 버전 = 배포 방 몫) · 인스펙션 통과 · mount sweep 같은 번들 통과 재사용
- check-sensitive-diff: 기계 기준 비대상(health-check 안전망 1건) → 설계 §0 대로 ④ 자기평가 gate
- 남긴 시험 데이터: 데모 브랜드 상품 13931(재고아이템 6376 · 원가 4 · 재고 5) · 13939(6393) · 13810(6267) · P3 상품들 · 공급업체 상품 6230 «[확인용]…»

## 확인 못 함
- 운영 수치(§5-7 «다이렉트+자체재고>0» 등) — 운영검증 몫
- 390폭 화면 클릭 흐름은 안 돌림(mount sweep 크래시 0 만)
