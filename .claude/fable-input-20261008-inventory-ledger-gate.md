# Fable 게이트 입력 — 재고→원가 묶음 0 + 묶음 1 (2026-10-08 · 작업방 98b2ea7c · 팀원 실측)

설계 = `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ-1 · Ⅱ-2 (Fable 1회차). Irene 컨펌 «권고대로» = ①a ②a ③b ④b ⑤a.
코드 변경은 개발서버만 · 운영 접근 0. 작업트리에는 다른 방(359d0949 외부 SOA·직원식, 0ec1e1c3 배송 지역, 5cdb5680 청구서 권한) 미커밋 변경이 섞여 있음 — 이 방 몫은 아래 목록.

## 이 방이 바꾼 파일
- 신규: `dev-backend/services/stockLedger.js` · `utils/wasteReasons.js` · `utils/generalStockLedger.js` · `utils/ledgerDrift.js` · `scripts/migrate-ledger-cost-columns.js`(deploy 등록) · `scripts/reconcile-ledger-drift.js`(manual 등록) · `scripts/inspection/suites/stock-ledger.js`
- 수정(백엔드): routes inventory-core · inventory-extra · inventory-produce · general-stock · product-ingredients · foodcourt-inventory · foodcourt-products · brand-products · menu · seller-orders · po-returns · recipes(브랜드 레시피 조회 3줄) · product-recipe · ingredients(writeStoreCost log 2줄) / services purchaseOrderReceive · inventoryDeductionService · storeCost · prepIngredientSync / utils recipeCost / models InventoryTransaction · CostChangeLog / scripts health-check.js(새 테스트 3건 + pos 소스검사 1건 갱신) · migrations.registry.json(2줄)
- 수정(화면): pages/Inventory/StockTakePage · components/Inventory/{InventoryManager, modals/WasteModal, hooks/useIngredientAdjustModal, hooks/useInlineStockEdit, hooks/useGeneralStockForm} · pages/BrandProductRecipe/ProductIngredientsTab · locales inventory.json ×4 (wasteReason.* 9키) · glossary «Waste Reason»
- 🔒 보호 파일 무접촉: check-print-guard 8/8 (orders-crud.js 안 건드림 — 판매 차감 order_id 는 inventoryDeductionService 안 resolveOrderRef 로)

## 묶음 0 (설계 Ⅱ-1)
- 0-① 실사 손실 ÷기준양 — 항목 저장·완료 계산(`perBaseCost` 공용) + 화면 계산 + 응답 ingredient.base_quantity. 실호출: 1000 g 재료 500 g 손실 @27.9 → 13.95 (고장주입 시 13950)
- 0-② 레시피 원가 조회 단위 환산 — product-recipe.js `lineCost`(convertQuantity, 불가 → null) 6곳(조회 4 + 저장 2: create/ingredients PUT 도 같은 결함이라 같이) · recipes.js 브랜드 레시피 조회 · prepIngredientSync. 실호출: kg 0.02 ↔ g 재료 → 0.558 (고장주입 시 0.000558)
- 0-③ **안 함** — purchase-cost-report.js 는 359d0949 미커밋 변경 중(설계대로 그 방 커밋 뒤)
- 0-④ 폐기 장부 = 실제 깎인 양 + 응답 clamped/wasted
- 0-⑤ 판매 차감 장부 order_id(주문번호 → 주문 id 조회) · 주문번호 없음 → «Order #unknown», «undefined» 없음

## 묶음 1 (설계 Ⅱ-2)
- A 마이그: inventory_transactions unit_cost · cost_value · reason_code + **base_quantity(설계 외 1칸 — 금액을 낸 기준양을 줄에 남겨 나중에 재료 기준양이 바뀌어도 금액을 다시 설명 가능)** · cost_change_logs.source ENUM expandEnum receive·production. 백필 0. 2회차 0칸. 일반재고 장부는 이미 unit_cost·total_cost 칸이 있어 **칸 추가 안 함**(설계는 2칸 추가였음 — 같은 개념 두 벌 금지로 판단)
- A record(): 재고 갱신+장부 한 트랜잭션, 장부 수량 = after−before(setTo/delta/clampAtZero), 변화 0 이면 줄 없음, 금액 근거(입고가·반품가·실사 원가·만들기 배치값)가 0/빈 값이면 그 순간 원가로 폴백. `InventoryTransaction.create` 가 코드 전체에서 stockLedger.js 1곳만 남음(grep). 수동 입고(inventory/receive)의 장부 금액은 본문 unit_cost 가 아니라 그 순간 매장 원가(본문 값은 배치 기록용 — 뜻이 불분명)
- 실사 완료 장부 = **실측 − 지금 재고**(예전: −variance = 실측 − 시작 때 스냅샷) → 실사 중 판매가 있어도 장부 합 = 현재고. 실호출로 확인(시작 3440 → 실사 중 판매 −20 → 실측 3415 → 장부 −5)
- 초기재고 장부 = 실제 바뀐 양(예전: 새 값 자체를 변화량으로 적음)
- B 문 봉인: product-ingredients PUT 허용필드에서 current_stock 제거 · POST 는 0 으로 만들고 장부 initial · adjust-stock 은 record + new_quantity 지원 / 일반재고(매장·브랜드 두 라우트) receive·adjust·create → generalStockLedger(트랜잭션, 장부 실패=롤백) · PUT current_stock 무시 / 푸드코트 adjust·receive → record(entity foodcourt, product_id=foodcourt_products.id) + transactions 스텁 → 장부 조회 / **menu.js · brand-products · foodcourt-products 의 수정 창 수량: 설계는 «400 USE_ADJUST» 였으나 화면 수정 창이 수량을 보내고 있어(메뉴·브랜드 상품·푸드코트 상품) 400 이면 화면이 깨짐 → 서버가 수량을 직접 쓰지 않고 바뀌었으면 장부 adjustment 로 반영**(생성은 0 으로 만들고 initial). 화면 쪽: 브랜드 재고 인라인 수정 → adjust-stock(new_quantity), 재고아이템·일반재고 수정 창은 수량이 바뀌었으면 adjust 호출 추가
- FG 판매자 출고·반품 장부 대상: 예전 `ingredient_id = 구매자 재료 id`(구매자 재료 장부에 판매자 출고가 섞임) → foodcourt_product(product_id) 로 바꿈
- C 폐기 사유: reason_code 필수(400 WASTE_REASON_REQUIRED) · 폐기도 deductStockFIFO · 배치 폐기 기본 expired · 수동 deduct 유형은 정해진 4개만(예전 클라이언트 값 그대로 ENUM 에 넣음) · 화면 WasteModal 사유 선택(사유 전 확인 버튼 비활성) · BG 폐기도 reason_code 전달
- D 마지막 매입가: 가중평균 삭제 → writeStoreCost(들어온 기준양 가격) · 들어온 값 0 이면 안 씀(예전: 0 으로 평균을 끌어내림) · writeStoreCost 에 log 옵션 → cost_change_logs(receive·manual·production; 대조는 자기가 적으므로 안 줌)
- E 권한: `requireStockManager` = SA·RA·Owner·BG·BM·FG·FM (매장엔 «Restaurant Manager» 역할이 없음 → Staff 만 빠짐) — initial·adjust·실사 complete·cancel. 화면: Staff 는 재료 인라인 조정 시작 안 됨 · 실사 Cancel/Complete 버튼 숨김. BG adjust-stock 은 BG 전용 라우트라 그대로
- F 인스펙션 stock-ledger: LEDGER-001 전수 «장부 합=현재고» **warn**(dev 47건: 매장 재료 32 · 오버레이 4 · 재고아이템 8 · 브랜드 상품 2 · 푸드코트 1) · LEDGER-002·003 차단(CUTOFF 2026-10-08) · **LEDGER-004 설계 외 추가: CUTOFF 이후 장부 줄 사슬(앞 줄 stock_after + 변화 = stock_after) 차단** — 001 이 warn 인 동안 새 누수를 잡는 살아 있는 게이트(보정 줄 ledger_reconcile 은 제외) · 검사·보정 같은 SQL(utils/ledgerDrift) · reconcile-ledger-drift: dev 에서 --apply → 47줄 추가·LEDGER-001 0건 → --undo → 47건 원복 확인

## 실측 결과
- 실호출(데모 38, 끝에 원복): 묶음 0 9/9 · 묶음 1 13/14 — 초기 +500 금액 10 · 수령 2팩@25 → +2000 금액 50 · 원가 25(가중평균이면 24) · 2번째 @30 → 원가 30 · cost_change_logs receive 2줄 · 판매 −40 금액 −1.2 order_id · 폐기 사유 없음 400 · spoiled −10 금액 −0.3 · 조정 절대값 · 실사 −5 · Σ장부 = 현재고 · BG 생성 initial+7 금액 14 · PUT 99 무시 · adjust −4 · 메뉴 수정 창 12 → adjustment +12 · 사슬 끊김 0. ✗1 = 시험 Staff 계정(test_staff)이 매장 없음(404) → 아래 health-check ②·직접 서명 토큰으로 확인(adjust·initial·complete 403, summary·waste 200)
- 고장주입(pm2 재시작 뒤): ①record 장부 insert 제거 → health ① ✗ · 실호출 0/2 ②PUT current_stock 재허용 → health ③ ✗ ③마지막 매입가 블록 제거 → 실호출 2·3·4·5 ✗(원가 20 고정) ④권한 미들웨어 통과로 → health ② ✗ — 전부 원복 후 통과. 묶음 0: 기준양 나눔·단위 환산·폐기 장부 3곳 제거 → 4건 ✗
- health-check 전체 331/331(새 3건: 장부 ① 폐기 사유·장부=실제·금액·합=현재고 / ② Staff 403 / ③ BG PUT 수량 무시·adjust 장부) — pos 소스검사 1건은 «차감이 applyStock 직접 호출» 문자열을 찾던 것이라 stockLedger 경유도 인정하도록 갱신
- verify-all --full: 22/24 + type-baseline 단독 재실행 통과 → 23/24. ✗ = 배포 준비(배포 기록 파일 — 배포 때 작성). mount sweep 8역할 크래시 0 (741s)
- 실브라우저 클릭(RA 데모 38): 폐기 창 사유 6개 · 고르기 전 확인 비활성 · 고른 뒤 활성 · 클릭 → 장부 −5 spoiled 금액 −0.1 · 실사 화면 진입 오류 0 (6/6). **확인 못 함: Staff 로 화면 버튼 숨김(서버 403 은 확인)**
- print-guard 8/8 · design-guard 신규 0 · i18n:verify 오류 0 · migration registry 통과 · build:dev 1회(이 방 파일 경고 0)

## 운영 배포 때 생기는 일(사실)
- 마이그 1개(칸 4 + ENUM 값 2, expand-only) — check-enum-parity 는 dev ENUM 값이 운영에 없으면 막으므로 같은 배포에 마이그가 먼저 돌아야 함
- 마지막 매입가: 배포 뒤 첫 수령부터 매장 원가가 그 가격으로 바뀜(데이터 되돌리기 없음, cost_change_logs 로 추적)
- 폐기 사유 필수: 옛 화면(SW 캐시)이 사유 없이 보내면 400 — SW 버전은 아직 안 올림(묶음 프론트 다 끝난 뒤)
- Staff 가 쓰던 인라인 조정·초기재고·실사 확정이 403 으로 바뀜(운영 Staff 사용 여부 미측정)
- LEDGER-001 은 warn — 배포 뒤 reconcile 드라이런 표를 Irene 에게(운영 쓰기)
- 반품 시 배치·원가 되돌림은 이번 범위 밖(설계에 없음)
