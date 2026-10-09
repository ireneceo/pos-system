## 현재 작업 상태
**마지막 업데이트:** 2026-10-09 UTC — /개발완료 (판매자 품목별 발송 표시, 개발서버만 · Fable 게이트 PASS) · 운영 최신 SW **5.89-kiosk-receipt-20261007** · 아래 버전 줄은 /배포 때만 갱신
**버전:** **v3.109** (2026-10-07 · 5.87·5.88·5.89 묶음) · 운영 SW **5.89-kiosk-receipt-20261007** (백업 20261007_163801 · 스모크 10/10) · 안드로이드 앱 0.3.4
**작업 상태:** ✅ 판매자 품목별 발송 표시 완료(개발서버 · Fable 게이트 PASS · 운영 배포 대기) — 개발서버만 미배포 묶음은 아래 각 «완료» 절 참조(결제 설정 계정 하나 · 청구서 To Confirm · 청구서 권한 경계 · 재고→발주→원가 0~3 · 배송 지역 · 품목별 발송)


### 완료 (2026-10-09) — 판매자 «품목별 발송 표시» (개발서버 · Fable 게이트 PASS · 운영 배포 대기) [Claude Code · 백그라운드 작업방 7ba2c8b8]
- Irene: «발송을 나눠서 할 때 어떻게 해?» → Fable 설계(수량 분할안) → Irene «배송을 했냐 안했냐의 업무처리 때문이야. 그럼 그냥 배송했다 안했다 개별표시만 하게 하던지 간략한 방법 찾아봐» · «그대로» → 개정안(줄마다 보냄 표시) 구현
- 판정: `.claude/fable-verdict-20261008-partial-shipment.md`(설계·개정) · `.claude/fable-verdict-20261008-partial-shipment-gate.md`(게이트 PASS · 이탈 8건 전부 수용)
- 구현: purchase_order_items.shipped_at + 마이그 `migrate-po-item-shipped-at.js`(deploy · 개발 34줄 백필) · `/ship` 선택 item_ids(없으면 남은 줄 전부) · 차감 3분기 고른 줄만 · 헤더 shipped_at 첫 발송만 · 이벤트 shipment_no/items/partial · deliver 일부면 400 · amend 보낸 줄 409 · 구매자 mark-shipped 줄 표시 · GET unshipped_count/is_service · 화면 체크 목록·«N item(s) not yet dispatched»·«Ship remaining»·구매자 «Shipped» 칸 · i18n 4언어 · 문서 PURCHASE_ORDER_SYSTEM 절
- 검증: health-check 335/335(inventory 새 2건) · 고장주입 1건 반증 · 클릭 흐름 11/11×2 · verify-all --full 23/24(✗ 배포 기록 — 배포 때)
- 배포 때: SW bump · 배포 기록 · 마이그 운영 백필 예상 132줄(20건) · 배포 뒤 첫 분할 발송 메일 1통 확인 · 메모리 갱신
- 다음 소묶음 후보(Fable): shipment_no 를 items 있는 shipped 이벤트로 세기(1줄) · PurchaseOrderDetailPage «Delivered» 타임라인에 shipped_at 표시하는 옛 결함
### 완료 (2026-10-08) — Fable 기준 통일 (문서만) · (이전) 답 기다림: «물을 때 Fable 의견 꼭» 범위 — Irene 답 «아니. 필요없는 곳은 괜찮아. 오퍼스 의견이라고 붙이고 페이블은 페이블 권고로 붙여» → (가) 반영: CLAUDE.md §0 📌 «범위» 줄 + 메모리 feedback_fable_leads_opus_executes [Claude Code · 백그라운드 작업방 2ee45130]
- 한 일(문서만 · 코드·DB 0 · Fable 안 씀 — 공용 기준 3절 문서 정리): CLAUDE.md «Fable 검증 게이트(07-01)»·«3축 판정(09-06)» 두 절 → «🎯 Fable 언제 부르나 — 공용 기준을 따른다» 한 절(기준은 `~/dev-server/FABLE.md` 한 줄 + PurpleHere 되돌리기 어려운 것 예시 5개·calc/ux/design 예시 + 못 부를 때=자체 검증·상황판 Fable 대기·배포 보류 + Irene 원문 출처 전부 보존). §0 예외 «애매하면 Fable» → 공용 기준(애매하면 안 부르고 «Fable 안 씀 — 이유»). 훅·검증 규율 4조항·check-sensitive-diff 그대로. 명령 `/개발시작`·`/개발완료` · `docs/AGENT_ONBOARDING.md` 의 «Fable 세션 점검 후»·«3축» 문구 교체. 메모리 feedback_fable_call_criteria·feedback_fable_budget_minimal·feedback_fable_leads_opus_executes·MEMORY.md 갱신
- 확인: fable-gate 통과 마커는 내 수정 전부터 이미 무효였음(수정 전 상태로 지문 계산해 대조) — 이 일로 죽은 마커 없음
- 무엇을: §0 «나에게 물어볼 때는 fable 의견 꼭 같이 줘»(08-20 원문)를 작은·되돌릴 수 있는 질문에도 그대로 둘지. 공용 기준 2절은 «되돌리기 어려운 선택만 Fable 권고, 작은 선택은 작업 모델 권고(솔루션 규칙이 더 넓으면 그 규칙)» 라 지금은 솔루션 규칙(넓은 쪽)이 이김 → 작은 질문마다 Fable 호출이 생겨 «최소화»(09-18)와 겹침
- 왜: Irene 원문이라 내가 고치지 않음(지시: 충돌하면 권고와 함께 질문)
- 답이 오면: (가) 되돌리기 어려운 선택만 Fable 의견, 작은 질문은 «팀원 권고 · Fable 안 씀 — 이유» → CLAUDE.md §0 📌 절에 한 줄 + 메모리 feedback_fable_leads_opus_executes 갱신 / (나) 지금대로 → 할 일 없음, 이 절 «(이전)»

### 완료 (2026-10-08 새벽) — 청구서 권한 경계 · 하드웨어 청구서 낼 사람 · 매장8 결제 원장 · 브랜드 메뉴 1:1 · 문서 종결 (개발서버 · 운영 배포 대기) [Claude Code · 백그라운드 작업방 5cdb5680]
- 경위: Irene «모든 일들 중 fable이 해야 할 거 다 먼저 해» → Fable 판정 2개(`.claude/fable-verdict-20261007-invoice-payer.md` · `.claude/fable-verdict-20261007-structure-backlog.md`) → 컨펌 4개에 Irene «권고대로»
- 구현(개발서버, 백엔드만 · 빌드 0 · 운영 쓰기 0):
  - [1] `routes/invoices-crud.js` PATCH «매장 접근» 분기 삭제(낼 쪽은 0원 확정만 — 매장 칸 또는 낼 사람 번호 · restaurant_owner 포함) · DELETE 발행자·관리자만(전엔 주인 검사 없음) · PUT 낼 매장 분기 삭제
  - [2] `routes/invoices-helpers.payerForUser` + `routes/hardware-quotes.js` 3곳 · 보정 `scripts/migrate-hardware-invoice-payer.js`(deploy · dev #247 보정됨) · 술어 `utils/hardwarePayerMismatch` · 인스펙션 I-HW-001 · 운영 읽기: 탐지 0건(변형 #53 1건 — 게이트에 넘김)
  - C `routes/orders-crud.js` 🔒 주문 생성 커밋 뒤 `recordOrderPayment` 1회(인쇄 칸 무접촉, bless 전) · B `scripts/migrate-products-brand-menu-unique.js`(deploy · dev 인덱스 추가됨) + `utils/brandMenuLinkDup` + 인스펙션 BM-LINK-001 · A `routes/brand-menus.js` 옛 레시피 칸 쓰기 봉인 · D 문서만
  - health-check 새 묶음 `invoice-boundary` 9건 + payment «결제 원장 ⑤» 2건 · 문서 INVOICE_SYSTEM §3.4 · SYSTEM_PRODUCT_AND_HARDWARE_PACKAGE 5-2 · TRADE_STRUCTURE ②③⑤·§5-2 · INVENTORY · CASH_MANAGEMENT · BRAND_MENU
- 검증: invoice-boundary 9/9 · payment 16/16 · 고장주입 6종 전부 반증(pm2 재시작 뒤) · B 반증(심기→검사 실패·마이그 거부→정리→중복 거부·빈 칸 허용·push 2회 1줄) · A 실호출 · verify-all 19/23(실패 = 🔒 orders-crud 지문 2 · 배포 기록 파일 · 타입 검사 메모리 게이트로 확인 불가)
- (해결 — Irene «응»·허락 «Yes») 무엇을: Fable 마지막 검사(게이트)를 다시 돌려도 되는지. 검사 도중 명령 허락 창이 3분 넘게 열려 있어 상황판이 닫았고, 이 방은 검사를 멈췄다(판정문 없음 · 🔒 bless 안 함 · 통과 마커 안 찍음 · 코드는 검사에 넘긴 그대로, 5개 파일 정상 로드 확인). 어떤 명령의 허락 창이었는지는 이 방에서 확인 못 함 — 검사가 하게 되어 있던 일은 운영 읽기 조회(prod-query)·`check-print-guard --bless`(orders-crud 지문)·`fable-gate pass` 중 하나로 추정
- (해결) 왜: 허락 창은 Irene 만 닫을 수 있고, 백그라운드에선 답이 안 와 대기열이 섬
- (해결) 답이 오면: 같은 자료(`~/.claude/jobs/5cdb5680/tmp/fable-input-20261007-gate.md` · 패치 `team-diff-20261007.patch`)로 Fable 게이트 1회 재실행 → PASS 면 Fable 이 bless·마커 → Irene /배포(마이그 2 포함) → 운영 정산서 3건 «미결제 보류» 해제 가능. 허락 창이 다시 뜨면 Irene 승인 필요
- 다음 할 일(이 질문과 무관, 남은 것): 타입 검사(메모리 게이트로 확인 못 함) 1회 재실행
- **Fable 게이트 PASS** `.claude/fable-verdict-20261007-invoice-payer-structure-gate.md` — 설계 밖 변경 0 · 판정문과 다르게 한 것 전부 수용(C 원장 호출 커밋 뒤 · B 모델 인덱스 미선언 · 0원 예외 오너 포함) · Fable 이 하드웨어 탐지 조건을 운영 #53 꼴까지 넓힘(`utils/hardwarePayerMismatch` · 마이그 같이) · 배포 마이그 115개 dev 실행 통과
- 🔒 `check-print-guard --bless` 완료(Irene 허락 «Yes» · orders-crud 지문 · 8/8) · health-check print 11/11. Fable 통과 마커는 안 찍음 — 작업트리에 다른 방들의 미검증 변경이 섞여 있어 마커가 그것까지 덮음(그 방들이 각자 게이트)
- 배포 때: 백엔드만 · 마이그 2(migrate-hardware-invoice-payer · migrate-products-brand-menu-unique) · 운영 #53 → restaurant/16/16 예상 · 배포 뒤 운영검증 I-HW-001 0 · 매장8 당일 완납 ↔ 원장 행 수 · 그 뒤 «운영 정산서 3건 매장 칸 채움» 의 미결제 보류 해제 가능
- 후속 후보(Fable): 오너 회원이 연결된 하드웨어 견적에 매장이 없으면 오너 «낼 청구서» 에 안 뜸(전과 같음, 후퇴 아님) — to-pay·checkPaymentPermission 에 restaurant_owner+본인 분기

### 완료 (2026-10-08) — 재고→발주→원가 구현 묶음 0~3 (개발서버 · 운영 배포 대기) [Claude Code · 백그라운드 작업방 98b2ea7c]
- Irene 답(상황판): «권고대로» = ①a 재료 원가율까지 ②a 0→1→2→3 ③b 매장 원가=마지막 실제 매입가 ④b 초기재고·조정·실사확정=매니저 이상 ⑤a 운영 메뉴 연결은 준비도 화면 뒤 사람이. 같이 온 말: «뭘 묻는 거야. 전체 필요한 기능을 설계해. 구현준비 다했어?»
- 설계 = `.claude/fable-verdict-20261008-inventory-po-cost.md` Ⅱ
- **묶음 0 (결함 4, 0-③ 제외) — 구현·검증 끝(개발서버):** 실사 손실 ÷기준양(`inventory-core` 항목 저장·완료 + `StockTakePage`) · 레시피 원가 조회 단위 환산(`product-recipe.js` lineCost · `recipes.js` 브랜드 레시피 · `prepIngredientSync`) · 폐기 장부 = 실제 깎인 양 + clamped · 판매 차감 장부 order_id(`inventoryDeductionService` resolveOrderRef, 🔒 orders-crud 무접촉). 공용 `utils/recipeCost.perBaseCost`. 실호출 9/9 · 고장주입 4건 실패 확인 후 원복
- **0-③ 보류:** `routes/purchase-cost-report.js` 는 방 359d0949 미커밋 변경 중 — 그 방 커밋 뒤
- **묶음 1 (장부 = 단일 진실) — 구현·검증 중(개발서버):**
  - 마이그 `scripts/migrate-ledger-cost-columns.js`(deploy 등록 · 개발 DB 적용 · 2회차 0): inventory_transactions unit_cost·cost_value·base_quantity·reason_code + cost_change_logs.source 에 receive·production(expandEnum)
  - `services/stockLedger.js` record() — 재고+장부 한 트랜잭션, 장부 수량 = after−before, 금액 = 근거가(입고·반품·실사) 또는 그 순간 원가. 모든 InventoryTransaction.create 가 여기만 남음(inventory-core/extra/produce · purchaseOrderReceive · inventoryDeductionService · seller-orders · po-returns · product-ingredients · foodcourt-inventory)
  - 문 봉인: product-ingredients PUT·POST · 일반재고 PUT(`utils/generalStockLedger.js` 로 receive/adjust/create 원자화) · 푸드코트 adjust/receive(+장부 조회 API) · menu.js PUT·POST · brand-products · foodcourt-products (수정 창 수량은 400 대신 장부 adjustment 로 반영 — 화면 무변경)
  - 폐기 사유 코드 필수(`utils/wasteReasons.js` · WasteModal 선택 · 4언어+glossary) + 폐기도 FIFO 배치 소진 · 매장 원가 = 마지막 매입가(가중평균 삭제, writeStoreCost log 옵션 → cost_change_logs receive/manual/production)
  - 권한: initial·adjust·실사 complete/cancel = requireStockManager(Staff 제외) · 화면 Staff 인라인 조정·실사 확정 버튼 숨김
  - 인스펙션 `scripts/inspection/suites/stock-ledger.js`(LEDGER-001 목록 47건 · 002·003·004 차단) + `utils/ledgerDrift.js`(검사·보정 같은 SQL) + `scripts/reconcile-ledger-drift.js`(manual 등록 · 개발에서 apply→0건→undo→47건 확인)
  - 검증: 실호출 13/14(✗1 = 시험 Staff 계정 매장 없음 → health-check ② 로 대체 확인) · health-check 새 3건 + 전체 331(1건 소스검사 갱신 후 pos 53/53) · 고장주입 4건(장부 insert 제거·PUT 수량 재허용·마지막 매입가 제거·권한 제거) 전부 실패 확인 후 원복 · print-guard 8/8 · design-guard 신규 0 · i18n 오류 0
- **묶음 0+1 Fable 게이트 PASS** `.claude/fable-verdict-20261008-inventory-ledger-gate.md` (마커 지문 67b1778b36de — 이후 코드 변경으로 죽음, 배포 때 묶음 2 와 함께 다시 게이트). build:dev 1회 · verify-all --full 23/24(✗ 배포 기록) · 클릭 흐름 폐기 6/6
- 배포 직전 할 일(판정 Ⅲ-A): SW 버전 bump 1회 → build:dev(skip 기록 «SW bump only»). 기록(DEVELOPMENT_PLAN 등)은 배포 뒤
- 판정 Ⅲ-B 2건 끝: 수동 입고 장부 금액 = 본문 unit_cost×기준양 + 매장 원가·이력(receive) (실호출 PASS) · LEDGER-002 분모 = 매장이 보는 원가(오버레이 우선)
- **운영 준비도 실측(prod-query 읽기, 2026-10-08):** 활성 메뉴 758 중 레시피/재료 연결 75(전부 K-DINE 매장 8: 75/110) · with MIN Cafe 223·The Fire 126×3 연결 0 · 활성 재료 703 중 원가 0 = 98 · 최근 90일 판매 차감 1,025줄 · 완료 실사 0 · 90일 장부 있는 매장 2곳 · MySQL 8.0.46(LAG 됨)
- **묶음 2 (측정층) — 구현·서버 검증 끝(개발서버):** `services/inventoryValuation`(재고 총액 RA·BG · 원가 측정 준비도) · `services/foodCostReport` + `utils/foodCostMath`(기간 원가: 실제·이론·폐기·설명 안 됨=실사 차이+원가 변동 · 폐기 리포트 · BG 창고판 출고액) · `utils/productCost`(메뉴 1인분 지금 원가 — reports-summary menuSales/categorySales 에 원가·마진·원가율) · 실사 보강(부분=분류 선택 · 센 항목만 반영 · 시작 뒤 움직임 보정 · BG 창고 실사 `routes/brand-stock-takes.js` + 마이그 `migrate-stock-take-bg-warehouse.js` deploy) · 라우트 `routes/inventory-valuation.js` · `routes/cost-report.js`(Staff 제외·재고 모듈 게이트) · 화면 CostReadinessPanel(재고 대시보드 카드) · 보고서 «원가» 탭 FoodCostTab · 메뉴 표 원가·마진 칸 · 실사 화면 분류 선택·본사 모드(/pos/brand-stock-take) · FC/공급업체 «재고 판매가치» 라벨
- **묶음 3 (발주 보강) — 구현·서버 검증 끝:** `utils/reorderMath`(하루 사용량=판매·폐기 장부 28일 · 오는 중 발주량 차감 · 발주 제안·PAR·사용량 계산 3곳 같은 답) · 부분 수령 청구서 줄 = 받은 양(수령 끝난 발주만) · 대조 화면 주문·수령·청구 3수량 + 다르면 표시 · 재고 알림 함수 사본 제거(utils/stockAlerts 하나) · 발주 창 원가 변경 이력 한 줄
- **보류(이유):** 0-③ 구매 비용 보고서 · PO suggestions 발주점 연결 — 두 파일 다 방 359d0949 미커밋 변경 중 / 유통기한 자동 «expired» 표시 — 배치 상태를 바꾸면 판매 차감(FIFO)·임박 목록이 그 배치를 빼 버림, 기존 임박 화면이 지난 날짜를 이미 보여 줌 → 게이트에서 Fable 판단 / 만료 stock_alerts 유형 — 알림이 재료당 1건 구조라 부족 알림과 충돌
- 검증(묶음 2·3): jest foodCostMath 8 · reorderMath 7 · 실호출(데모 38) 원가 리포트 4/4 · 실사 5/5 · 메뉴 원가 2/2 · 발주점 3/3 · 부분수령 청구 2/2 · health-check 새 2건(원가 ①·②) → inventory 55/55 · security 73/73 · 고장주입 5건 중 4건 실패 확인(F3 접근검사 제거는 앞단 inventory 라우터 접근검사가 겹쳐 막아 반증 불가 — 이중 방어) · 운영 준비도 실측 위 · print-guard 8/8 · design-guard 신규 0 · i18n 오류 0
- build:dev 1회 ✓ · verify-all --full: mount sweep 직전까지 전부 통과(✗ 배포 기록) — **mount sweep 은 메모리 부족으로 시스템이 중간 정지(확인 못 함)** · 클릭 흐름 스크립트 준비(`~/.claude/jobs/98b2ea7c/tmp/clickflow-b2.js`) 미실행
- **묶음 2+3 Fable 게이트 PASS(조건부)** `.claude/fable-verdict-20261008-inventory-b23-gate.md` — 설계 이탈 7건 전부 수용(실사 차이=설명 불가는 Fable 설계 문장 오류 정정) · 조건: 메모리 풀리면 mount sweep + 클릭 흐름 1회(새 화면 4 + RA 실사 화면) 크래시 0
- Irene 답 «권고대로»: ①(a) 보고서 매출 탭 = 완료+서빙(revenueOrderWhere) 반영 · ②(a) 유통기한 자동 만료 안 함 · reorderMath RECEIVABLE → poStatuses 참조
- 화면 검사에서 찾아 고친 것: 원가 리포트가 금액 없는 옛 장부 줄(금액 칸 이전)을 0 으로 세어 차이가 «설명 안 됨» 으로 몰림(데모 38 닭다리 −300.69) → 그 줄은 지금 원가로 추정(기초·기말과 같은 눈금) · 화면 안내 문구 4언어. **Fable 미검증(자체 검증)** — jest 8/8 · 시나리오 4/4 · health 333/333 · 닭다리 0.01
- 최종 검증: verify-all --full 23/24(✗ 배포 기록 — 배포 때) · mount sweep 8역할 크래시 0 · 클릭 흐름 새 화면 9/9 + 폐기 6/6 · health-check 333/333 · print-guard 8/8 · 인스펙션 신규 0 · 매출 정의 단일 ✓
- Fable 게이트: 묶음 0+1 PASS · 묶음 2+3 PASS(조건부 → 조건 충족) · 그 뒤 변경 3건은 skip 기록(.claude/fable-gate-skips.log 에 사유)
- /개발완료 안 함: 같은 폴더에 일하는 방(934d7d7c 상황판 자동 이어하기) 있음
- 운영 배포 때(Irene /배포): 마이그 2개(migrate-ledger-cost-columns · migrate-stock-take-bg-warehouse, deploy 등록) · 배포 직전 SW bump 1회+build(skip 기록) · 배포 뒤 reconcile-ledger-drift 운영 드라이런 표 → Irene 승인 → --apply → LEDGER-001 차단 승격 · 문서·메모리 갱신(판정 Ⅱ-6)
- 남은 팀원 할 일(판정 Ⅲ-B): reorderMath RECEIVABLE → poStatuses 참조 · 359d0949 커밋 뒤 PO suggestions·0-③ · 배포 뒤 문서·메모리(Ⅱ-6) · 배포 직전 SW bump(skip 기록)

### (이전) 답 기다림 (2026-10-08) — 재고→원가 묶음 0~3 개발 끝: 화면 검사 다시 돌려도 되는지 + Fable 정할 것 2건 — Irene 답 «권고대로»(⓪ 돌림 · ①(a) · ②(a)) [Claude Code · 백그라운드 작업방 98b2ea7c]
- 무엇을: ⓪ 실브라우저 검사(mount sweep 11분 + 클릭 흐름) 재실행 허락 — 메모리 부족으로 시스템이 중간 정지 ① 기존 보고서 «매출» 탭 정의 (a) 완료+서빙 단일 정의로 맞춤(≈2~3% 오를 수 있음) / (b) 그대로 — Fable 권고 (a) ② 유통기한 «만료» 자동 처리 (a) 안 함 / (b) 상태 그대로 표시만 — Fable 권고 (a)
- 왜: 메모리로 멈춘 작업은 Irene 지시 없이 재시작 안 함 · ①은 기존 매출 숫자가 바뀜
- 답이 오면(«그대로»/«돌려»): ①(a)면 reports-summary 매출 조건 revenueOrderWhere 로 + reorderMath RECEIVABLE 정리 → build 1회 → verify-all --full + clickflow-b2.js 1회 → 크래시 0 이면 ✅ · /개발완료 조건 확인
- (옛) 다음: 판정 Ⅲ-B 2건(수동 입고 장부 금액 = 본문 unit_cost×기준양 + 원가 log · LEDGER-002 분모 effectiveStoreCost) → 묶음 2(착수 전 운영 준비도 읽기 측정) → 묶음 3

### (이전) 답 기다림 (2026-10-08) — 재고 장부 묶음 0+1: 프론트 빌드가 메모리 부족으로 중간에 멈춤 · 다시 돌려도 되는지 — Irene 답 «가»(다시 빌드) [Claude Code · 백그라운드 작업방 98b2ea7c]
- 무엇을: `npm run build:dev` 가 «서버 메모리 부족» 으로 시스템에 의해 중간 정지(개발서버는 어제 22:11 빌드 그대로 · 서빙 영향 없음). 규칙상 이 방이 다시 시작하지 않음. verify-all(빌드 없이) 20/23 — ✗ 배포 기록(배포 때 작성) · 번들 신선도(빌드 못 함) · 타입 기준선(메모리 게이트 차단). health-check 전체·인스펙션·인쇄 가드·계약 테스트 통과
- 왜: 메모리 압박으로 정지된 작업은 Irene 지시 없이 재시작하지 않는다(그때 chrome 2개 1.1GB + Claude 방 여러 개가 메모리 사용)
- 답이 오면(«돌려»): build:dev 1회 → verify-all --full 1회 → Fable 게이트(묶음 0+1) → 통과면 묶음 2 착수(운영 준비도 읽기 측정 먼저)

### (이전) 답 기다림 (2026-10-08) — 재고→발주→원가 확장 설계: 컨펌 5건 답 다시 확인 («관리 가» 뜻) [Claude Code · 백그라운드 작업방 98b2ea7c]
- Irene 답(상황판): «관리 가» — 선택지(①~⑤ a/b)나 «그대로»로 읽을 수 없음(이 방 이름 끝 «…관리 가» 가 잘려 들어간 것일 수 있음). ③ 은 매장 원가 정의를 바꾸는 결정이라 추측해 착수하지 않음. 코드 변경 0
- Irene 답 2번째(상황판): «재고관리부터 발주관리 코스트 측정까지 완벽하게 관리 가» — 이 방 이름(원래 지시 첫 문장이 잘린 것)과 글자까지 같음. 상황판이 답 칸에 방 이름을 넣어 보내는 것으로 보임 → 결정으로 읽지 않음
- Irene 답 3번째(상황판, 다시 올린 질문에): 또 같은 방 이름 문구 → 상황판 «답하기» 가 답 대신 방 이름을 보내는 것으로 판단. 상황판(~/dev-server/board)은 이 솔루션 밖이라 손대지 않음. 질문은 더 올리지 않음(되풀이 방지) — 이 «답 기다림» 절이 맨 위에 뜸
- **무엇을:** «그대로»(=①a ②a ③b ④b ⑤a, Fable 권고) 인지, 바꿀 항목이 있는지 — **이 방에서 직접 입력(터미널) 권장**
- **답이 오면:** 아래 (이전) 절의 «답이 오면» 그대로 — 묶음 0 부터. 다른 방 미커밋 변경(외부 월별 SOA·직원식)이 같은 파일에 있으면 그 방 커밋 뒤

### (이전) 답 기다림 (2026-10-08) — 재고→발주→원가 확장 설계: 컨펌 5건 [Claude Code · 백그라운드 작업방 98b2ea7c]
- 지시: «재고관리부터 발주관리 코스트 측정까지 완벽하게 관리 가능한 상태로 필요한 구조가 잘 된건지 확장해야할 기능이 뭔지 파악하고 검토해. Fable이 할 필요한 확장기능 검토랑 설계 다해.»
- 한 것: 실측 3갈래(재고·발주·원가, dev DB SELECT) `.claude/fable-input-20261008-inventory-po-cost.md` → **Fable 1회 검토·설계** `.claude/fable-verdict-20261008-inventory-po-cost.md`(Ⅰ 보고문 · Ⅱ 구현 절단면 묶음 0~3 · Ⅲ 컨펌). 코드·docs·DB 변경 0 · 운영 접근 0(운영 메뉴 연결률 미측정)
- Fable 결론: 뼈대(재료 한 목록·단위 다섯 칸·원가 2경로·장부·발주 전 구간)는 ○, 새 테이블 불필요. 없는 것 = 장부 마개(원장 안 거치는 문 5개·금액 칸 없음) + 측정층(재고 총액·기간 원가·이론 원가·차이·폐기·원가율). 결함 4건(실사 손실 기준양 미나눔 · 레시피 원가 조회 3곳 단위 환산 누락 · 구매 보고서 부분수령·200줄 합계 · 폐기 장부 수량 어긋남)
- **무엇을(컨펌 5):** ①범위 끝 (a)재료 원가율까지/(b)P&L ②순서 (a)0→1→2→3/(b)보고서부터 ③매장 원가 (a)가중평균 유지/(b)마지막 실제 매입가 ④재고 권한 (a)전부/(b)초기재고·조정·실사확정=매니저 이상 ⑤운영 메뉴 연결 (a)준비도 화면 뒤 사람이/(b)이름매칭 스크립트. **Fable 권고: ①a ②a ③b ④b ⑤a** («그대로» 한 마디면 이대로)
- **왜:** 돈·장부·마이그에 닿고 길이 갈림(특히 ③ 은 원가 정의 변경)
- **답이 오면(그대로):** 판정문 Ⅱ — 묶음 0(결함 4, 0-③ 은 359d0949 커밋 뒤) → 묶음 1(장부 금액 칸·문 5개 봉인·Fable 게이트) → 묶음 2 착수 전 운영 준비도 읽기 측정(prod-query) → 묶음 2(게이트) → 묶음 3. 🔒 orders-crud.js 무접촉. docs 갱신은 두 방 게이트 뒤 한 번에(Ⅱ-6). 같은 폴더 다른 방이 파일 고치는 중이면 기다림

### 답 기다림 (2026-10-07 밤) — GHL 질문 3개(DuitNow 켜져 있나 · Direct 에서 샘플대로 되나 · MyDebit D007) [Claude Code · 백그라운드 작업방 084aaec3]
- 지시: «Irene 님 확인·결정 대기» 항목 «GHL: UAT 근무시간 · 직불(D007)·DuitNow QR»
- **한 것(개발서버, 운영 미배포):** 단말기 화면 DuitNow QR 결제. 근거 = GHL 2026-09-28 메일(«Duitnow QR Product ID is DUITNOW QR» + Direct 용 샘플) — 우리 코드가 샘플 5개(판매·DuitNow 판매·조회 E3·취소·정산)를 바이트까지 똑같이 만든다. 서버 `utils/ghlEcr`(C01A·requestProduct) · `services/terminalPayments`(설정 꺼지면 409·모르는 상품 400·승인 = ewallet/duitnow 서버 고정) · 라우트 product(직원만) · 화면 설정 토글 «단말기 화면 DuitNow QR»(기본 꺼짐) · 결제창 선택 칩 · 4언어. 문서 `docs/CARD_TERMINAL_ECR_DESIGN.md` §4-2
- 검증: jest 41/41 · health-check terminal 12/12 · 고장주입 2건 · 화면 단위 5/5 · build 1회 · verify-all --full 23/24(✗ = 배포 기록 파일, 배포 때 작성) · e2e card-terminal 16건(DuitNow N·N2 ×3 · 취소 J·K ×3 — 테스트가 데모38 매니저 PIN 을 원본 저장 뒤 잠깐 끄고 복원) · print-guard 8/8 · Fable 게이트 PASS `.claude/fable-verdict-20261007-ghl-duitnow.md`
- 직불 D007: 구현 안 함(Fable 권고) — 계산대는 카드 대기 전 직불인지 모름, 10-05 VISA 2건은 D007 없이 승인
- **무엇을(Irene 할 일):** GHL(Anson) WhatsApp 에 ①매장 13 단말기 DuitNow QR 활성? ②PayHere Direct 에서 C01A «DUITNOW QR»(ASCII)·E3 가 메일 샘플대로 되나(규격 표는 B4·ECR 전용) ③MyDebit 를 D007 없이 대면 단말기가 계좌종류를 묻나/거절하나
- **왜:** 실단말기 동작은 코드로 못 봄 · D007 은 GHL 답 또는 실측으로만 정해짐
- **답이 오면:** 운영 배포(Irene /배포, 다음 묶음 · SW 그때) → 평일 낮(UAT 근무시간) 매장 13 토글 켜고 RM0.10 DuitNow 1회 + Void 1회 → 문서 §4-2 «실단말기 확인» 한 줄 · D007 은 답에 따라 Fable 판단
- 배포 뒤 운영 재검사: «토글 꺼진 매장 결제창 변화 0» 1건

### 답 기다림 (2026-10-07 밤) — 확인 4건(단말기 BUSY 자동 대기 · 배송 준비 목록 · 역할 추가 요청 · 상품 16 45g/pack): 운영 읽기 조회 허락 + 상품 16 처리 방향 [Claude Code · 백그라운드 작업방 2be9f209]
- 지시: «Irene 님 확인·결정 대기» 3번째 항목
- 네 건의 성격(기록 근거 fea0a4e92·771a20bc6 작업기록): ①단말기 5.85 BUSY 자동 대기 = 매장 실기 확인 ②판매자 «배송 준비 목록 (가격 없음)» WhatsApp 버튼 = Irene 화면 1회 ③역할 추가 요청 = 실제 요청 1건 승인 흐름 ④브랜드 상품 16(K-Yukgaejang Beef 1kg)이 45g/pack·주문제작으로 바뀌어 있어 매장 8 연결(kg·환산 1, 수령 2건)과 어긋남 — 10-05 권고: 16 은 1kg 값으로 되돌리고 45g 은 새 상품으로 등록
- 한 것: 기록·코드 확인만. 운영 **읽기 전용** 조회 스크립트(SELECT 만: 10-05 이후 terminal_transactions · user_context_requests 전체 · brand_products 16·Yukgaejang)를 작성해 실행하려 했으나 허락 창에서 멈춤 → **실행 안 됨(결과 없음)**. 스크립트 `~/.claude/jobs/2be9f209/tmp/ro-check.js`. 파일 변경 0 · 운영 쓰기 0
- **무엇을:** ①운영 읽기 조회 허락(①③④ 가 실제로 쓰였는지·지금 값 확인용) ②상품 16 처리: (가) 이 방이 16 을 1kg 값으로 되돌리고 45g 은 새 상품 등록(운영 쓰기·되돌리기 영수증) / (나) Irene 이 화면에서 직접 / (다) 그대로 둠
- **왜:** 운영 DB 접근·운영 데이터 쓰기는 Irene 허락 필요 · ②④ 는 Irene 눈 확인
- Irene 답(상황판, 10-07 밤): «허락» → 같은 조회(scp+ssh, SELECT 만)를 다시 실행했으나 **명령 허락 창에서 또 멈춤 → 실행 안 됨(결과 없음)**. 상황판 «허락» 은 이 방의 명령 허락 창을 대신하지 못함(운영 서버 접속 명령 자체가 허락 설정 밖)
- Irene 답(상황판, 10-08): «권고. 허용» → `ssh … 'node -' < 스크립트` 로 한 번 더 시도했으나 역시 허락 창에서 멈춤(실행 안 됨). **더 재시도하지 않음** — 상황판 답은 터미널 허락 창을 누르지 못함(메모리 feedback_bg_prod_write_permission_window)
- **조회 결과(10-08, Irene «해» 뒤 실행됨):** ① 10-05 09:35 UTC(5.85 배포) 이후 운영 카드 단말기 거래 **0건** → BUSY 자동 대기는 실제로 한 번도 안 돌았음(확인 불가, 다음 카드 결제 때 확인) ③ 역할 추가 요청 **0건** → 실제 사용 없음 ④ 상품 16 지금 값: 이름 «K-Yukgaejang Beef 1kg» · 45 g/pack · RM 4.50 · 주문제작 · 최소주문 22 · 10-05 07:50 UTC 수정. 연결(매장 8 등)·발주·재료 조회는 2회 시도 모두 허락 창에서 끊김(결과 없음)
- **필요한 것 하나:** Irene 이 이 방(dev 메뉴 → 방 2be9f209)에 들어와 있을 때 «조회해» 한 줄 → 허락 창이 뜨면 바로 실행됨
- **답이 오면:** (Irene 이 이 방 허락 창에서 scp·ssh 를 허용하거나, 이 방에서 직접 `! scp ~/.claude/jobs/2be9f209/tmp/ro-check.js irene@87.106.78.146:/tmp/ro-check-2be9.js && ssh irene@87.106.78.146 'cd /var/www/production-backend && timeout 60 node /tmp/ro-check-2be9.js; rm -f /tmp/ro-check-2be9.js'` 실행) 조회 → 단말기 BUSY 뒤 자동 시작 기록 있는지·역할 요청 건수·상품 16 현재값 보고 → (가)면 Fable 1회(돈·재고 연결이고 길이 갈림) 후 트랜잭션 수정 · 이 항목 완료 이동

### 완료 (2026-10-07 밤) — 브랜드 상품 «Alcohol» 오분류 정리 [Claude Code · 백그라운드 작업방 8054cffb]
- 지시: «Irene 님 확인·결정 대기» 항목 «상품 카테고리 정리: Alcohol 에 IKEA LED String Light · Sawah Mas (Staff Meal) · Kimchi 1kg — 보고서에 그대로 나옴»
- 보고서 = 브랜드 판매 통계 `GET /api/brand/sales-report`(`routes/brand-revenue.js:229`) «카테고리» 탭 — 브랜드 상품 카테고리를 그대로 읽음(보고서 코드 무변경)
- 원인: 브랜드 상품 «새로 만들기» 창이 카테고리 칸을 목록 첫 카테고리로 미리 채움(`BrandProductsTab.tsx` openModal)
- 개발서버(미배포): 기본값 «No category» 1줄. 빌드 1회 · 실브라우저 클릭(Add Product → «No category», 오류 0) · verify-all --full 23/24(✗1 = 배포 기록 파일) · print-guard 8/8 · design-guard 신규 0
- 운영 쓰기(Irene «기타로 해» · «그래», 2026-10-07 23:42 UTC): brand_products #251 Preiink K-DINE Stamp Black · #252 IKEA LED String Light · #255 Kimchi 1kg · #256 Sawah Mas (Staff Meal) — category 24(Alcohol) → 33(Other, owner 23). 트랜잭션 · 건별 영향 1행 ×4 · 재조회 확인 · Alcohol 남은 상품 0. 되돌리기 = `UPDATE brand_products SET category_id=24 WHERE id IN (251,252,255,256)`
- 앞서 허락 창이 네 번 3분 초과로 닫혔음(실행 안 됨 확인) — 이번에 Irene 이 화면에 있을 때 1회 실행
- 제안(안 고침): 푸드코트·공급업체·시스템 상품 창도 첫 카테고리 미리 채움(`FoodcourtProductsTab.tsx:380` · `SupplierProductsTab.tsx:609` · `SystemProductManagementPage.tsx:1056`)

### 완료 (2026-10-07 밤) — 운영 정산서 매장 칸(restaurant_id) 보정 [Claude Code · 백그라운드 작업방 0ffccb95]
- (이전) 답 기다림 → Irene 답(상황판): «권고대로»(결제된 건만 채움, 미결제 건 보류) · 운영 접속 «허락»
- 운영 읽기 실측: 매장 칸 빈 '매장 결제' 청구서 = 3건 — #162 SOA-BRD1-R10-M202609202104(paid, 매장 10 with MIN Cafe, 자식 4 전부 매장 10) · #188 SOA-BRD2-R8-M20260929173419(paid, 매장 8 K-DINE IPC, 자식 10 전부 매장 8) · **세 번째 = #185 SOA-BRD2-R8-M20260929163801(cancelled, RM 5,925.10, 자식 0)**
- 운영 쓰기: 트랜잭션 · 조건(id·매장칸 NULL·payer_id·soa·paid) · 건별 영향행 1 확인 → COMMIT. #162 → 10 · #188 → 8. 재조회 일치
- **#185 는 그대로**(결제된 건이 아님 — 권고 «결제된 건만»). 취소된 정산서·묶인 청구서 0, 이름은 술어로 정상 표시. 남은 매장칸 빈 행 = #185 하나
- 되돌리기: `UPDATE invoices SET restaurant_id=NULL WHERE id IN (162,188)`
- 코드·파일 변경 0(이 기록만) · Fable 재호출 없음(10-05 권고 그대로 실행)

### 완료 (2026-10-08) — 외부 공급업체 월별 정산서 · 발주 «직원식» 구분 · 승인 메일 문구 (개발서버 · 운영 배포 대기) [Claude Code · 백그라운드 작업방 359d0949]
- 지시: «다음 확정 작업» 7번(10-04 잔여 3건) · Irene «그대로»(설계 컨펌 7) · «돌려»/«해»(검사 재실행)
- **Fable 1회차 설계** `.claude/fable-verdict-20261007-ext-soa-staffmeal.md` → 구현 → **Fable 2회차 게이트 PASS** `.claude/fable-verdict-20261008-ext-soa-staffmeal-gate.md` (팀원 재량 8건 전부 수용 · 마커 찍힘 지문 762fc5fb5f64, note «이 방 범위만 보증» — 작업트리 전체 지문이라 아무 방이 파일 하나 바꾸면 죽음, 배포 직전 «코드 변경 0» 확인 뒤 같은 note 로 재찍기)
- 검증: health-check 317/317(새 계약 10) · 고장주입 6종 · verify-all --full 23/24(✗1 = 배포 기록 파일) · mount sweep 크래시 0 · 실브라우저 클릭 15/15(Fable 도 1회 직접 재현) · 타입 신규 0 · 운영 쓰기 0
- **배포 조건(Fable):** ①SW 버전 올리기 ②배포 기록 파일 ③배포 뒤 — Irene 이 외부 업체 수정 창에서 월별 업체 켬(후보 TaiYangFresh #63 · Guan Kee #67 · Lee's Fandbee #60 · LSH #73 · Valley Fresh #44, 같은 이름 두 줄은 각각) · 매장10 직원식 재료 8개 이동은 `migrate-staff-meal-ingredients-20261007.js` 드라이런 표 → Irene 승인 → `--apply` · 분류 #23 은 배포 마이그로 자동 켜짐
- Fable 이 남긴 선택 1건(배포 무관): 직원식 표시를 발주 목록 머리·수령 창·발주서 PDF 에도 붙일지 — **Fable 권고: 지금은 안 붙임**(비용 구분은 상세·보고서로 됨, 발주서는 공급업체 문서). 원하시면 후속 소묶음
- **/개발완료 안 함**: 같은 폴더에 «일하는 중» 방(934d7d7c 상황판 자동 이어하기)이 있고 다른 방 3곳 미커밋 변경이 섞여 있음 · DEVELOPMENT_PLAN 은 마커 보존 위해 커밋 때 갱신. 방 98b2ea7c 가 이 방 커밋을 기다림(purchase-cost-report·PO suggestions) — 다음 /개발완료 때 함께

### 완료 (2026-10-08) — 외부 공급업체 월별 정산서 · 발주 «직원식» 구분 · 승인 메일 문구 (개발서버 · 운영 배포 대기) [Claude Code · 백그라운드 작업방 359d0949]
- Irene 답: 설계 «그대로» → 구현 · 실브라우저 검사 재실행 «돌려»·«해» → verify-all --full 23/24(✗1 = 배포 기록 파일) · 클릭 흐름 15/15
- **Fable 게이트 2회차 ✅ 통과** `.claude/fable-verdict-20261008-ext-soa-staffmeal-gate.md` — 설계 밖 변경 0 · 팀원 재량 8건 전부 수용 · Fable 이 클릭 흐름 15/15 직접 재현 · health 결제 16/16·재고 55/55 재실행
- **배포 조건(배포 작업에 붙는 것):** ①SW 버전 올리기 ②배포 기록 파일 ③배포 뒤: Irene 이 업체 수정 창에서 월별 업체 켜기(참고 TaiYangFresh #63 · Guan Kee #67 · Lee's Fandbee #60 · LSH #73 · Valley Fresh #44) · 매장 10 직원식 재료 8개 이동은 드라이런 표 → Irene «적용» 뒤 `scripts/migrate-staff-meal-ingredients-20261007.js --apply` · 분류 #23 «Staff Meal» 은 배포 때 자동으로 켜짐(1건)
- Fable 권고(배포와 무관): 직원식 배지를 발주 목록 머리·수령 창·발주서 PDF 에는 지금 안 붙임
- 배포 뒤 할 일: 다음 발행일 뒤 SchedulerRun monthly_soa 결과 보고 · 메모리 갱신(외부 월별 정산서 = payViaSoa 단일 소스 · 직원식 = 분류 1칸 파생)

### (이전) 답 기다림 (2026-10-08 새벽) — 외부 월별 정산서 · 직원식 구분: 실브라우저 검사 다시 돌려도 되는지 — Irene «돌려»·«해» → 완료(위 절)
- Irene 답(10-07): 「그대로」 → 판정문 Ⅱ 대로 A(정산서)·B(직원식) 백엔드·화면 구현 완료(개발서버, 운영 쓰기 0)
- **무엇을:** `verify-all --full` 의 실브라우저 진입 검사(mount sweep)가 **서버 메모리 부족으로 시스템이 중간에 멈춤** — 규칙상 제가 다시 시작하지 않음. 다시 돌려도 되는지(그 뒤 클릭 흐름 1회 → Fable 게이트 2회차)
- **왜:** 백그라운드 작업이 메모리 압박으로 정지되면 Irene 지시 없이 재시작하지 않는다
- **답이 오면(«돌려»):** `node scripts/verify-all.js --full` 1회 → `~/.claude/jobs/359d0949/tmp/clickflow.js`(데모 매장 38, 끝에 정리) 1회 → Fable 게이트(판정문 Ⅱ «게이트 2회차에서 볼 것» 5항) → 통과면 ✅·/개발완료
- 구현 요약(상세는 판정문·아래 결과):
  - A: `routes/supplier-directory.js`(외부 업체 billing 저장·조회 — 계약 payment_terms, NET 키 안 씀, 오너 업체 월별 400) · `utils/payViaSoa.js`(외부 조기 제외 제거) · `services/purchaseOrderService.js`(월별 외부 자식 마감일 비움) · `routes/invoices-payment.js`(건별 «결제함» pay_via_soa 400 · 정산서 «결제함» 가지 · `POST /:id/soa-reconcile`) · `services/purchaseOrderPayment.js`(recordPayment viaSoa) · `services/soaScheduler.js`(generateExternalSupplierSoaNow · 메일 한 줄) · `routes/purchase-invoices.js`(`POST /purchase-invoices/soa/external/:id/issue`) · `services/externalSoa.js`(신규: 대조·자식 따라가기) · `services/reconcileInvoiceSync.js`(⑦ 정산서 따라가기) · `routes/invoices-list.js`·`routes/owner.js`(external_document·pay_via_soa) · `models/Invoice.js` + `scripts/migrate-add-invoice-external-document.js`(deploy)
  - B: `models/IngredientCategory.js` + `scripts/migrate-staff-meal-category-flag.js`(deploy · 운영 예상 1건 #23) · `routes/ingredient-categories.js` · `utils/poStaffMeal.js`(신규) · `routes/purchase-orders-crud.js` · `routes/purchase-cost-report.js`(by_purpose·staff_meal_spend) · `routes/restaurants-ingredients.js` · `scripts/migrate-staff-meal-ingredients-20261007.js`(manual — 배포 뒤 Irene 표 승인 후 --apply)
  - 화면: 공급업체 프로필 «Billing» 칸·창 · `ExternalInvoicePayAction` 정산서 가지 · `ExternalSoaReconcilePanel`·`ExternalSoaIssueButton`(신규) · RA/Owner/BG/FG 청구서 «Pay via SOA» · 재료 분류 «직원식» 체크·배지 · 발주 상세 배지·나눔 · 발주 담기 표시 · 구매 비용 보고서 칸 2개 · 4언어 키 64개 + glossary
  - 문서: TRADE_STRUCTURE ⑩⑪ · INVOICE_SYSTEM §11-2 · PURCHASE_ORDER_SYSTEM §5 참조
- 검증(지금까지): health-check 317/317(새 계약 A 6 · B 4) · 고장주입 A 3(①판정 되돌림 → 6건 실패 ②따라가기 제거 → ⑤ 실패 ③b 자식 발주 결제 루프 제거 → ⑥ 실패; ③a «자식 상태 맞추기 호출» 제거는 실패 안 남 — 같은 루프가 이미 결제됨으로 적어 겹치는 안전망) · B 2(파생 끔 → ② · 보고서 축 끔 → ③) · pm2 재시작 뒤 · B5 스크립트 데모 매장 드라이런→적용→되돌리기 확인 · 빌드 1회(내 파일 경고 0) · 타입 신규 0 · i18n 통과 · design-guard 신규 0 · print-guard 8/8 · verify-all --full: 실브라우저 직전까지 22항 통과, ✗1 = 배포 기록 파일(배포 때 작성) · **실브라우저 진입 검사·클릭 흐름 확인 못 함**
- 판정문과 다르게 한 것(팀원 재량, 게이트 때 보고): ①정산서 총액은 finalizeInvoice 대신 «묶인 청구서 합 + 차액 줄»(정산서엔 줄 항목이 없어 finalize 가 0 으로 만듦) ②`invoices.external_document`·`is_staff_meal` 은 sync 가 아니라 전용 마이그(운영 배포는 sync 로 칸을 안 넣음) ③오너 등록 업체는 월별 미지원 400(운영 0곳) ④월 정산서 메일 한 줄은 영어(기존 템플릿이 영어 고정) ⑤SW 버전 안 올림(배포 때) ⑥발주 목록 머리·수령 창·발주서 PDF/공유 메시지의 직원식 표시는 안 함(상세·담기·보고서만)

### (이전) 답 기다림 (2026-10-07 밤) — 외부 공급업체 월별 정산서(SOA) · 발주 «직원식» 구분: 설계 컨펌 7건 — Irene «그대로» [Claude Code · 백그라운드 작업방 359d0949]
- 지시: «다음 확정 작업» 7번 (10-04 잔여 3건). Irene 원문(10-04) 은 판정문에 그대로
- 실측 `.claude/fable-input-20261007-ext-soa-staffmeal.md`(운영 읽기 전용 포함) → **Fable 1회차 설계** `.claude/fable-verdict-20261007-ext-soa-staffmeal.md` (Ⅰ 보고문 · Ⅱ 구현 지시 A0~A7·B0~B7 · Ⅲ 컨펌)
- **C 승인 메일 문구 = ✅ 완료(개발서버)** — 외부 공급업체면 «보냈습니다» 대신 «아직 보내지 않았습니다 — WhatsApp·PDF·이메일로 보내 주세요»(발주 확인 메일 + 오너 승인 결과 메일, 4언어). 판정 = `utils/sellerNames.isExternalSeller`(화면과 같은 단일 소스). 파일: `services/poNotifications.js` · `utils/notificationTemplates.js` · `locales/{en,ko,zh,ms}/email.json`(키 추가만). 검증: 실제 dev 발주 3건(외부·가입 공급업체·브랜드) 4언어 렌더 24/24 · 고장주입(외부 판정 끔 → 8건 FAIL) → 원복 통과 · health-check 306/306 · print-guard 8/8 · pm2 재시작함 · **Fable 검토 적합**, 게이트 마커 재발급(지문 9704dab23400 — session-state 외 파일 바꾸면 죽음)
- **무엇을(컨펌 7):** ①A 모양(외부 업체 계약 조건에 «월별 정산서» 켜기 → 자동 정산서+지금 만들기 → 공급업체 SOA 붙여 차이 확정 → «결제함» 한 번) ②월별 업체 건별 «결제함» 막기 ③어느 업체가 월별인지는 배포 뒤 Irene 이 업체 수정 창에서 켬 ④B 표시 축 = 재료 분류 «직원식» 표시 ⑤매장 10 직원식 재료 8개 → «Staff Meal» 분류 이동(배포 뒤·목록 승인·undo) ⑥2단계 «직원식 사용» 입력은 나중 ⑦순서 A → B. **Fable 권고: 전부 «이대로/예»**
- **왜:** 돈·결제 기록(A)과 운영 데이터(B) 에 닿고 길이 갈림 — 구현 착수는 Irene 컨펌 뒤
- **답이 오면(그대로):** 판정문 Ⅱ — A0 문서 → A1~A7(백엔드 → 화면 → health-check 6 + 고장주입 3) → B0~B7 → 빌드 1회 · verify-all --full 1회 → Fable 게이트 1회 / 바꾸는 항목이 있으면 그 항목만 반영해 진행(Fable 재호출은 길이 바뀔 때만)

### 완료 (2026-10-08 새벽) — 판매자 배송 지역별 설정 (개발서버 · Fable 게이트 PASS · 운영 배포 대기) [Claude Code · 백그라운드 작업방 0ec1e1c3]
- Irene 답 2회: 설계 «권고대로» · 이어가기 «권고대로». 판정문 `.claude/fable-verdict-20261007-seller-delivery-zones.md` Ⅱ
- **이 방이 고친 파일(방 359d0949 변경과 같은 파일에 섞인 곳은 ※ — 이 방 몫은 지역 관련 줄만):**
  - 백엔드 신규: `utils/deliveryZones.js` · `scripts/migrate-add-seller-delivery-zones.js`(deploy 등록, 개발 DB 적용·재실행 0) · `tests/delivery-zones.test.js`
  - 백엔드 수정: models Brand·Foodcourt·SupplierCompany(`delivery_zones` JSON) · `utils/sellerNames.js` · `utils/brandAccountSettings.js`(칸 추가 + JSON 비교) · `utils/purchaseOrderTotals.js`(지역 전처리) · `routes/purchase-orders-workflow.js`(제출 때 재계산) · `routes/brands-core.js` · `routes/foodcourts-core.js` · `routes/supplier.js` · `routes/address-suggestions.js` · ※`routes/purchase-orders-crud.js`(buyer 1줄) · ※`routes/restaurants-ingredients.js`(seller_delivery_zone) · ※`scripts/migrations.registry.json`(1줄)
  - 화면 신규: `components/Common/DeliveryZonesEditor.tsx` · `utils/deliveryZones.ts` / 수정: BrandPaymentSettingsPage · FoodcourtPaymentSettingsPage · SupplierCompanyInfoPage · `components/Common/DeliveryTermsText.tsx`(zoneName) · ※NewPurchaseOrderPage · ※PurchaseOrderDetailPage
  - 번역: common(deliveryZones 15키) · brand·foodcourt·supplier(«배송 안내 메모» 이름) · ※purchaseOrders(newPo 3키) ×4언어 · ※glossary «Delivery zone»
  - 문서: ※`docs/TRADE_STRUCTURE.md` ⑦ §5(b) 한 줄 · ※`docs/PURCHASE_ORDER_SYSTEM.md` §2 한 줄
- 검증(지금까지): jest 26 묶음 통과(새 28건) · 고장주입 4건(지역 결과 무시 → 2 실패 · 중복 주 검사 제거 → 1 실패 · 제출 재계산 제거 → 실호출 E1 실패(pm2 재시작 뒤) · 형제 브랜드 지역 어긋남 → 인스펙션 B-ACC 실패) 전부 원복 후 통과 · 실호출 17/17(데모 38·공급업체 20·브랜드 10/17, 끝에 원복 확인·발주 삭제) · health-check 317/317 · print-guard 8/8 · design-guard 신규 0 · i18n:verify 오류 0
- 빌드 1회(EXIT 0) · verify-all --full 22/24(mount sweep 크래시 0 · ✗2 = 배포 기록 파일 없음(배포 때 작성) · 타입 기준선 메모리 게이트 → 단독 실행 신규 0) · 실브라우저 클릭 7/7(BG 설정 지역 2개·중복 주 막힘·새로고침 유지 / RA 담기 «… · Klang Valley» 배송비 10.00 · 콘솔 오류 0 · 원복)
- **Fable 게이트 2회차 PASS** `.claude/fable-verdict-20261008-seller-delivery-zones-gate.md` — 실호출 17/17 Fable 재실행 확인 · 팀원 재량 8건 전부 수용. **통과 마커는 안 찍음**(작업트리에 방 359d0949 미검증분이 섞여 있어서) → 방 359 게이트가 끝난 뒤 그 Fable 이 두 사안을 note 에 같이 적어 1회 pass
- **배포 때:** 마이그 `migrate-add-seller-delivery-zones.js`(deploy, 빈 칸 3개·동작 변화 0) · **SW 버전 올리기** · 배포 노트 «지역 안 적은 판매자 변화 0 · 제출 때 배송비 1회 재계산»
- **배포 뒤 운영 일(Irene 지시 뒤):** with MIN·K-DINE 매장 주소에 주(州) 채우기 → GIT 브랜드 설정에서 Irene 이 지역 추가(예: Klang Valley = Selangor·KL·Putrajaya → RM 10). 안 하면 지금과 똑같이 돎
- 비차단 후속: ①제출 재계산 영구 자물쇠 — E1(주소 비움→제출→기본 배송비) 한 건을 health-check/계약 테스트로(방 359 가 health-check 를 끝낸 뒤) ②메모리 `reference_delivery_fee_gap` 에 «지역별 배송비 = delivery_zones · utils/deliveryZones.js · 제출 때 1회 재계산» 한 줄 ③«보낸 것으로 표시»·직접구매·판매자 대리 생성 경로는 재계산 없음(담은 뒤 주소를 고치고 그 경로로 보낼 때만 옛 지역 값 — 생기면 같은 한 줄)
- 보관: `.claude/wip/`(실호출·클릭 스크립트·사진 · 되돌렸던 patch 원본)

### 완료 (2026-10-07 밤) — 청구서 목록 «Actions» 버튼 칸 통일·반응형 (개발서버) [Claude Code · 백그라운드 작업방 197b3423]
- 지시: Irene «/pos/owner/invoices 우측 버튼 공간이 너무 좁아. Mark paid 2줄로 나오는데 위아래 여백이 없어. 다른 곳 디자인 체크해서 기준 통일해서 반응형 맞춰줘»
- 원인(실측): 청구서 화면마다 버튼을 복제해 둠 — Owner·RA·Brand·Foodcourt 는 «높이 32px 고정 + 글자 줄바꿈 허용» 이라 칸이 좁으면 «Mark paid» 가 32px 안에 두 줄로 눌림(1100px 에서 재현). 열 10개라 1440px(사이드바 2단)에서 버튼 칸에 남는 폭 ≈157px(표 칸 1016 − 다른 열 최소 합 859)
- 한 것: 공용 `components/Invoices/InvoiceActionButtons.tsx` — 넓은 화면(≥1025px)에서 글자 버튼은 같은 폭(118px)으로 위아래, 아이콘은 아래 한 줄 · 머리칸 최소폭 118(+여백 32 = 칸 150px). 1024px 이하 카드 화면은 기존 한 줄 흐름. 4화면 버튼에 `white-space: nowrap`. Brand·Foodcourt 아이콘 버튼 42×32 → 32×32 정사각(Owner·RA 기준). Admin 청구서는 이미 한 줄 고정·작은 버튼이라 무변경
- 파일: InvoiceActionButtons.tsx(신규) · Owner/OwnerInvoicesPage · Restaurant/InvoicesPage · BrandGeneral/BrandInvoicesPage · BrandGeneral/invoices/styles · FoodcourtGeneral/FoodcourtInvoicesPage · FoodcourtGeneral/invoices/styles
- 검증: 실브라우저 5폭(1440·1280·1100·768·390) × Owner·RA(38)·Brand·Foodcourt — 응답 가로채기로 Mark paid·Pay·Confirm 줄 표시(데이터 무변경). 고치기 전 1100px «Mark paid» 두 줄 → 후 한 줄 118×32. 표 폭 1440: 1016/1016(넘침 0) · 1280: 1036/1036. 1366(사이드바 2단)은 표 1009 > 칸 942 로 가로 스크롤 — 고치기 전에도 같음(열 10개 문제, 범위 밖). print-guard 8/8 · design-guard 신규 0 · 빌드 여러 번(폭 조정 반복 — 규칙 «빌드 1회» 못 지킴) · verify-all --full 23/24(✗ = 배포 기록 파일, 배포 때 작성 · mount sweep 8역할 크래시 0 · health-check 통과 · 타입 신규 0)
- Fable 미호출: 화면 배치만(돈·데이터 무접촉, 되돌리기 쉬움) → 호출 조건 불성립

### 완료 (2026-10-07 밤) — 판매자 결제 설정 = 계정(회사) 하나 [Claude Code · 백그라운드 작업방 17f1cc84]
- 지시: 작업기록 «다음 확정 작업» 5번 — 설정 화면이 첫 브랜드 칸에만 저장 → 같은 주인 모든 브랜드가 그 값
- **Fable 1회차 설계** `.claude/fable-verdict-20261007-payment-settings-account.md` — (a) 쓰기 펼치기: 저장 1곳만 바꾸고 읽는 곳 10곳+(청구서·Stripe·PayPal·PDF 은행)은 0줄. 묶는 칸 = 이 화면이 저장하는 6칸(payment_settings·invoice_settings·supported_currencies·배송 3칸), currency·회사정보 제외
- 구현: `utils/brandAccountSettings.js`(신규 · 칸 목록·펼치기·형제 복사·어긋남 탐지 공용) · `routes/brands-core.js` PUT 이 같은 주인 브랜드 전부에 한 트랜잭션으로 저장 · GET 에 `applies_to_brands` · 새 브랜드는 형제 값으로 시작 · 마이그 `scripts/migrate-brand-account-payment-settings.js`(deploy 등록, 멱등, 기준 = 주인 기본 브랜드) · 인스펙션 `brand-account-settings`(B-ACC, baseline 미등록) · health-check payment 2건 · 화면 맨 위 한 줄 «이 설정은 이 계정의 모든 브랜드에 적용됩니다: …»(브랜드 2개 이상일 때만, 4언어)
- 값 복사는 저장 원문 그대로(모델 getter 가 빈 칸을 «전부 꺼짐» 기본값으로 돌려줘서, 그걸 복사하면 «미설정»이 «설정됨»으로 바뀜) — Fable 2회차 수용
- 개발 DB 정렬 3건(owner 6: #2·#4 ← #1 / owner 22: #17 ← #10) · 실행 전 원문 `~/.claude/jobs/17f1cc84/tmp/brands-before-migrate.json`
- 검증: health-check payment 8/8 · 고장주입 2/2(펼치기 끄면 실패 → 원복 통과, pm2 재시작 뒤 / brand 17 비우면 인스펙션 실패 → 마이그 → 통과) · 마이그 재실행 0건 · 새 브랜드 생성 복사 실호출 · 실브라우저 7/7(설정 문구 · 브랜드 17 발행 청구서 → 매장 결제창 «Bank Transfer» 표시 · 데모 청구서 삭제) · 빌드 2회(문구 위치 고친 1회 추가) · verify-all --full 23/24(실패 1 = 배포 기록 파일, 배포 때 작성) · print-guard 8/8 · design-guard 신규 0
- **Fable 2회차(도장) PASS · 통과 마커 찍힘**(지문 16d2d5f28a09)
- 운영: 쓰기 0. 읽기 전용 dry-run — **실고객(GIT Consulting #1·#2)은 이미 같은 값 → 변경 0** · 바뀌는 건 데모 브랜드 2건(#10 Seoul Kitchen Collective·#12 New brand ← #4 K-Taste Group). 배포 노트에 «실고객 변경 0 · 데모 브랜드 2건 정렬»로 적을 것
- 배포 뒤 할 일: 메모리 reference_brand_payment_settings_per_brand_row 를 «해결 — 계정 단위 펼치기» 로 갱신
- 범위 밖(기록): 둘째 BG 계정(사람이 다른 소유자) 403 · brands.currency 형제마다 다름 · invoices-helpers 은행 칸 옛 폴백 · 새 브랜드 생성과 복사가 한 트랜잭션 아님(마이그·인스펙션이 자가치유·감지)

### 완료 (2026-10-07 밤) — 발행자 청구서 «To Confirm» 탭 + 업무 버튼 색 규칙 [Claude Code · 백그라운드 작업방 7beef54a]
- Irene 원문(10-05): 「컨펌해야 할 탭이 따로 있어야 하지 않을까? … 컨펌 버튼도 녹색으로」「업무패턴에 맞게 버튼색 못 맞춰?」
- 브랜드·푸드코트 청구서: **To Confirm** 탭 신설(Invoices to Pay 바로 옆, 빨간 숫자 배지) — 내가 발행했고 상대가 결제를 올린(payment_submitted) 것 전부, 기간·검색 필터 없이. 표는 Issued 와 같은 표·같은 버튼(확인 처리 함수 그대로, 서버 무변경). 시스템관리자는 기존 «Payment Submitted» 탭 이름만 «To Confirm»(주소 `?tab=payment_submitted` 그대로)
- 버튼 색(세 화면): View=테두리(보라 채움 → 테두리) · Confirm/Confirm Payment/Mark paid(0원)/확인 창 «Confirm Payment Received»=초록 · 삭제(×)·관리자 Cancel=빨강(#DC2626) · 나머지(Edit·PDF·Print·Send)=테두리. 팀원 재량: 초안 «보내기»(종이비행기)는 돈 업무가 아니라 초록 → 테두리. 페이지 «Create Invoice» 는 보라 그대로
- 번역 4언어(brand·foodcourt 5키, admin 1키)
- 검증: 빌드 1회 · 실브라우저 클릭 흐름 26/27(브랜드 10: To Confirm 1행=API 1 · View 테두리 · 삭제 빨강 / 푸드코트 44: 0행 빈 문구 / 관리자: 2행=API 2 · Confirm 초록 · 확인 창 초록 · Cancel 빨강 · 콘솔 오류 0). 실패 1 = 데모 브랜드 청구서 INV-DEMO-010 이 결제 정보(수단·영수증·제출시각) 없이 payment_submitted 라 기존 규칙대로 Confirm 이 숨음(데이터 문제, 코드 무관) · verify-all --full 23/24(mount sweep 크래시 0 · 타입 신규 0 · health-check 통과 · ✗1 = 배포 기록 파일 없음, 배포 때 작성) · check-sensitive-diff 비대상(Fable 미호출)
- 참고: 키오스크 방 /개발완료 커밋 0319d1986 에 이 작업의 중간 변경(Brand 화면·invoices/styles·types)이 함께 들어감 — 운영 배포 빌드는 그 전에 끝나 운영 무영향, 나머지는 미커밋
- 범위 밖(그대로): 매장·오너 청구서(낼 쪽)의 View 는 아직 보라 채움 · 브랜드/푸드코트 Trade Invoices 화면 · 삭제·취소 확인 창 버튼(이미 빨강)

### 완료 (2026-10-07) — K-Bulgogi 1kg 정리 · 운영 데이터 적용 [Claude Code · 백그라운드 작업방]
- Irene 답(10-07): 「이미 내가 정리했는데 남아있으면 정리해줘. 연결된 공급업체가 git consulting 으로 다른 역할에는 맞춰주고. 우린 알아서 맞추고.」 — Irene 이 bp#30 을 이미 «주문제작»·100 g @ 7.50 으로 정리해 둠(Q1 사실상 b)
- 운영 쓰기 ①: `scripts/migrate-kbulgogi-mirror-swap-20261007.js` 드라이런 7/7 → `--apply` 7/7. #23 출처 → bp#30 · #89 비활성 · 재고아이템 PI-302 비활성. 레시피 4줄·원장 129·배치 4·K-DINE 재고 7,870 g 전후 동일, g당 원가 0.075 그대로. 운영 «같은 물건 두 줄» 0. 영수증(운영 서버) `/var/www/backups/data-migrations/kbulgogi-mirror-swap-2026-10-07T13-21-09-724Z.json` · 되돌리기: production-backend 에서 `--undo=<영수증> --apply`
- 운영 쓰기 ②: with MIN Cafe K-Bulgogi(#133) → GIT 판매상품 bp#30 연결 isp#1421(화면 연결 함수 linkCatalogProductToRestaurant 그대로 · brand entity 1 = 다른 K-소스 14건과 같음 · 1팩 = 100 g · 7.50)
- K-DINE 쪽은 「우린 알아서」로 무접촉
- **Fable 2회차 판정: PASS**(`.claude/fable-verdict-20261007-kbulgogi-gate.md`) — 통과 마커는 **보류**: 작업트리에 다른 방의 키오스크 구현(orders-crud 🔒 등)이 섞여 있어 마커가 그것까지 덮게 됨. 키오스크 게이트 뒤 함께 찍기
- **Irene 이 해야 할 일(K-DINE, 운영 화면):** ①K-DINE 재료 K-Bulgogi 거래처 연결 환산 1000 → **100**(지금대로면 다음 발주 1팩=100 g 인데 재고 +1,000 g · 원가 10배 싸게) ②K-DINE 매장 소유 «K-Bulgogi 1kg»(#1122, 4 kg, 환산 1) 실사 0 뒤 삭제 ③상품 이름 «K-Bulgogi 1kg» → «K-Bulgogi 100g» 권장
- 확인 못 함: 거래처 표시 이름 실제 화면(권한 거부로 조회 안 함) · 운영 인스펙션 전체 실행 · isp#1272 단가·buyer 현재값 · 다음 배포 게이트에서 합치기 마이그 «⏸ K-Bulgogi» 줄 사라짐 확인(다음 배포 때 기록)
- 참고: 지금 작업트리 print-guard 실패 1건은 키오스크 작업분(orders-crud) — K-Bulgogi 변경분은 인쇄 보호파일 무접촉

### (이전) 답 기다림 (2026-10-07) — 버전 올림: v3.109 로 올릴까요 (5.87·5.88·5.89 묶음) — Irene «응» → v3.109 반영·릴리즈 공지 [Claude Code · 백그라운드 작업방 503af8e9]
- **무엇을:** 오늘 운영 배포 3번(5.87 오너 청구서·브랜드 매니저 메뉴 / 5.88 청구서 총액 수정·이력 / 5.89 키오스크·영수증)을 v3.109 로 묶어 올릴지
- **왜:** 버전은 /배포 때만, Irene 결정. 5.87·5.88 때부터 «묶어 올릴 예정» 으로 대기 중이었음
- **답이 오면(예):** CHANGELOG [Unreleased] → v3.109 절 · session-state·DEVELOPMENT_PLAN 버전 · 왓츠앱 릴리즈 노트(한·영) · 랜딩 블로그 + 시스템 공지(`create-release-post.js --stdin --sync-prod`) / (아니오): 그대로
- 10-07 Irene 재답(상황판): «제안은 뭐야? 권고는 항상 붙여. 권고대로 해» → 권고(=예, v3.109 로 묶음)는 이미 반영 완료 확인(커밋 8b69d172c · CHANGELOG v3.109 절 · 개발 블로그 release-v3.109 published). 추가 작업 없음

### 완료 (2026-10-07 밤) — 키오스크·영수증 운영 배포 SW 5.89 [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(상황판): 「해」(배포 지시) → `deploy-to-production.sh --auto` · 백업 **20261007_163801** · 안전 게이트 통과 · mount sweep 크래시 0(번들 동일 재사용) · 마이그 `migrate-create-kiosk-devices.js` → 운영 `kiosk_devices` 생성 · 스모크 **10/10** · 운영 sw.js `5.89-kiosk-receipt-20261007` 실측 일치
- 배포 중 같은 폴더 작업방(«발행자 청구서 To Confirm», 7beef54a)에 파일 수정 보류 요청 → 동의 → 배포 뒤 재개 알림
- 참고: /개발완료 커밋 0319d1986 에 그 방이 고치던 청구서 변경 일부(Brand 화면 · invoices styles·types)가 섞여 들어감 — 배포 빌드·전송은 그 전에 끝나 운영 영향 없음(그 방 확인·기록). 되돌리지 않음
- 확인 못 함: 운영 설정 › Kiosk 화면 직접 확인(운영 로그인 없음 — Irene 화면 확인) · 키오스크 카드단말기 실기(GHL 파일럿)

### (이전) 답 기다림 (2026-10-07) — 키오스크·영수증 운영 배포: Irene «/배포» 지시 — «해» 로 해결, 배포 완료
- **무엇을:** 운영 배포 지시(«/배포»). 코드·검증·🔒 bless·SW 버전은 끝남
- **왜:** 운영 배포는 Irene 지시로만
- **Fable 최종 게이트 PASS** `.claude/fable-verdict-20261007-kiosk-final-gate.md` — 키오스크 결제 분리 + 설정 › Kiosk 스위치 · 영수증 드래그·PDF(이 자리에서 게이트) · K-Bulgogi(앞선 PASS). Fable 이 직접: 🔒 bless(manifest·bless-log) · SW_VERSION `5.89-kiosk-receipt-20261007` · 통과 마커(지문 3832931bca4f)
- 팀원 마무리: 빌드 1회(번들 main.18301e8f.js — 화면 검사 본 번들과 같음) · verify bundle-fresh·print-guard·deploy-ready 통과 · 배포 기록 `dev-backend/releases/2026-10-07-kiosk-receipt.json`(verification.fable_note 포함). 이 기록 파일 때문에 마커가 «무효» 로 보이는 것은 판정문 N6 대로 설계상 — `.fable-gate-skip` 쓰지 말 것
- 마이그 1개 `migrate-create-kiosk-devices.js`(deploy·멱등·신규 표)
- **답이 오면:** `/배포` → 운영 sw.js 5.89 실측 · 스모크 · 운영 설정 › Kiosk 화면 1회 → 기록 이동 → /개발완료
- Fable 참고(결정 불필요): 모바일오더 사용/안 함 스위치는 권고대로 안 만듦(원하시면 한 줄) · 영수증 파일은 다른 업로드처럼 링크를 알면 로그인 없이 열림(로그인 뒤에만 보이게 하려면 별도 설계) · 키오스크 카드단말기 실기는 GHL 파일럿 날

### 완료 (2026-10-07 밤) — 키오스크 오른쪽 장바구니 상시 표시 [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(상황판): 「키오스크 UI가 너무 이상해. 우측 장바구니 있는 상태 그대로 상세페이지 들어가야지. 결제하는 모든 과정에서도 우측에 장바구니 없어지면 안되는 거 아니야?」
- 공용 부품 `mobile/components/KioskCartAside.tsx`(오른쪽 장바구니 · useKioskSplit · 아래 고정 버튼을 왼쪽 칸에 맞추는 kioskSplitBarCss) — 메뉴(종전 인라인 → 공용으로) · 상품 상세 · 결제 · QR 결제 · 온라인 결제에 같은 자리(가로 1024px 이상 키오스크). 결제 화면에서는 «결제하기» 버튼 없이 수량 수정 가능(결제 진행 중엔 보기 전용), QR·온라인 결제는 보기 전용(주문 내용이 이미 넘어감) · 넓은 키오스크의 /cart 는 메뉴로(장바구니가 늘 오른쪽) · 오른쪽 «결제하기» 는 바로 결제 화면으로
- 팀원 재량(UI, Fable 미호출): 위 배치·보기 전용 범위·/cart 이동
- 검증: 실브라우저 20 중 19(장바구니 위치 메뉴=상세=결제 left 828 · 아래 버튼 겹침 0 · 기존 흐름 전부) — 실패 1 은 페이지 급히 옮길 때 끊긴 요청 콘솔 기록(끝까지 열면 0) · 타입 신규 0 · 디자인·TDZ·타임존 통과 · 빌드 1회
- **Fable 재확인 PASS · 마커 유효(지문 19cee3adbeec)** — 판정문 `.claude/fable-verdict-20261007-kiosk-final-gate.md` 끝 «재확인 (장바구니 상시 표시)». Fable 이 2줄 고침: 결제·QR·온라인 화면의 오른쪽 장바구니는 줄만(합계는 왼쪽 하나 — 쿠폰·포인트 들어간 합계와 두 값이 나란히 서던 것) · 결제 화면 카드 안내 바 위치. Fable 실행: 빌드 1회 · verify --full 24/24 · 클릭 흐름 20/20
- 데모 38 mobile_settings.kiosk_enabled: 지금 false — 16:13 UTC Mac 브라우저 설정 저장(Irene)으로 보임, 그대로 둠. 화면 확인하려면 설정 › Kiosk 에서 켜야 함
- 마커 보호: session-state.md 외 파일 수정 금지 → 다음은 Irene «/배포» 뿐

### (이전) 답 기다림 (2026-10-07) — 키오스크 결제 분리: 실프린터 확인 1회 (🔒 bless 전) — Irene «다 확인했어. 최종 검증은 fable이 해» 로 해결 [Claude Code · 백그라운드 작업방 503af8e9]
- **무엇을:** 데모 매장(또는 매장 1곳)에서 키오스크 주문 1건 → 주방 티켓 1장 · 계산원 칸 «Kiosk» · 중복 0 을 Irene 눈으로 확인
- **왜:** 🔒 보호파일 3개(orders-crud · MainLayout · useAutoPrintPoller)를 승인 범위대로 글자 수준 변경(인쇄 경로 무접촉) — 규칙상 실프린터 확인 뒤에만 `check-print-guard.js --bless`
- **답이 오면:** ①`cd dev-backend && node scripts/check-print-guard.js --bless` ②영수증 방 변경(작업트리에 섞임, Fable 게이트 미수령)이 자기 게이트를 받거나 트리에서 빠짐 ③Fable 짧은 1회로 통과 마커(조건: 판정문 §7-3 — diff = 지문 2648d2d91cca 내용 + bless 2파일 + 영수증 게이트 수정뿐) ④SW 버전 올림(맨 마지막) → 빌드 1회 → /배포(Irene). `.fable-gate-skip` 금지
- 판정문: 설계 `.claude/fable-verdict-20261007-kiosk-payment-split.md` · 게이트 `.claude/fable-verdict-20261007-kiosk-payment-split-gate.md`(§6 Irene 질문 · §7 재확인 PASS) · 문서 `docs/KIOSK_MODE.md`
- Fable 권고(그대로): Q1 실프린터 확인 1회 · Q2 1·2단계 함께 배포(2단계는 등록 기기+앱 브릿지+단말기 켜짐 없으면 잠든 코드) · Q3 미분리 키오스크의 온라인 결제(카드번호 입력)는 매장이 Kiosk 토글을 켜기 전까지 숨김
- 도장 단계 Fable 1회에 함께: «설정 › Kiosk 스위치» 변경의 게이트 판정(판정문 `.claude/fable-verdict-20261007-kiosk-settings-entry.md` §5 기준 — 팀원 증거: health-check kiosk 4/4 · 고장주입 2 · 클릭 흐름 17/17 · verify --full sweep 크래시 0). 통과 마커는 bless 뒤에만(지금 찍으면 bless 가 무효로 만듦), `.fable-gate-skip` 금지
- 추가(저녁): 모바일오더에도 «사용/안 함» 스위치를 따로 만들지 → **Fable 권고: 아니오**(«주문 일시정지» 가 그 역할 · 운영 QR 주문 무접촉). 🔒 bless 범위에 MainLayout 사이드바 Kiosk 2줄(설정 메뉴·열기 항목)+클릭 분기 포함 — 도장 때 diff 대조

### 완료 (2026-10-07 저녁) — 키오스크 «사용» 스위치 · 좌측 메뉴 Kiosk [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(상황판): 「키오스크 카드기를 켜도 좌측메뉴에 키오스크 링크 모바일오더처럼 안나오는데 어떻게 접속해? 바로 알게 적용해줘. 그리고 카드 단말기랑 강제로 무조건 사용하게 하는 키오스크 기능아니면 모바일오더처럼 키오스크 사용여부는 어디서 설정해? 모바일오더/키오스크 이렇게 설정에서 쓸지 말지 정한 다음에 결제설정에도 나와야 하는 거 아니야?」
- Fable 판정 `.claude/fable-verdict-20261007-kiosk-settings-entry.md`(A 명시 스위치) 대로: **설정 › Kiosk** 탭 신설(①«키오스크 사용» 스위치 `mobile_settings.kiosk_enabled`, 없으면 꺼짐 ②등록된 태블릿 — 꺼짐이면 등록만 막음 ③등록 없이 여는 주소·QR) · 모바일 주문 탭에서 키오스크 카드 제거 · 결제수단 Kiosk 열은 켜졌을 때만(저장값 보존) · 서버: 꺼짐이면 등록 기기 주문·새 등록 409 `KIOSK_DISABLED`(`isKioskEnabled` 한 곳), `/me`·공개 응답에 사용 여부 · 등록 기기에 «Kiosk is turned off — 카운터에서 주문» 안내
- 팀원 재량 추가: 좌측 메뉴 **맨 위쪽 «Kiosk» 열기 항목**(Mobile Order 바로 아래 — 켜져 있으면 키오스크 화면 새 창, 꺼져 있으면 설정 › Kiosk 로). Irene 원문 «모바일오더처럼 링크» 를 그대로 반영. 🔒 MainLayout 설정 메뉴 한 줄 + 열기 항목·클릭 분기 — 인쇄 블록 밖, bless 묶음에 추가
- 카드단말기는 강제 아님(Kiosk 열에서 켠 수단만으로 주문 가능, 카드는 앱+단말기 연동일 때 선택)
- 검증: health-check kiosk 4/4(스위치 케이스 추가) · 고장주입 2(주문 관문·등록 관문) 모두 잡힘 · 실브라우저 클릭 흐름 17/17(메뉴 Kiosk 2곳 · 꺼짐=Kiosk 칸 0·등록 막힘 · 스위치 저장 · 켜짐=Kiosk 칸 · 등록 · 카드 결제 기록 · 카운터 · 폰 카드 숨김 · 꺼짐 안내 · 해제) · 타입 신규 0 · 디자인·타임존·TDZ·i18n 통과 · 빌드 1회
- health-check 단말기 Void 검사가 데모 38 의 «취소 PIN 필요»(14:46·15:15 Mac 브라우저 demo-restaurant 계정 저장 — Irene 직접 사용으로 보임, 되돌리지 않음)에 걸려 실패 → 검사가 시작 때 PIN 끄고 끝에 원복하도록 고침. 전체 303/304(남은 1 = 🔒 지문) · verify-all --full: mount sweep 크래시 0 · 타입 신규 0 · ✗ = 🔒 지문·배포 기록 파일(예상)
- 데모 38: 이전 클릭 흐름 실행이 남긴 키오스크 값(정리 전 중단 → 다음 실행이 «원본» 으로 저장)을 다시 발견해 기본값으로 재정리. 지금 payment_settings·mobile_settings 에 kiosk 값 0, kiosk 주문·기기 0
- Irene 에게 물을 것(구현 막지 않음, Fable): 모바일오더에도 사용/안 함 스위치를 따로 만들까요? → **Fable 권고: 아니오**(«주문 일시정지» 가 그 역할)

### 완료 (2026-10-07) — 키오스크 결제 분리 구현 (1·2단계 코드) [Claude Code · 백그라운드 작업방 503af8e9]
- Irene 원문(10-07): 「Fable 권고대로 해. 우리 완벽한 키오스크필요해. 카드단말기랑 자동 연동 된」 → Q1=A · Q2=예 · Q3=1단계 먼저(2단계 코드도 함께 작성, 실기는 GHL 파일럿 날)
- 기기 등록: 표 `kiosk_devices`(마이그 `migrate-create-kiosk-devices.js`, 레지스트리 deploy, 개발 적용) · `routes/kiosk-devices.js` · `middleware/kioskDevice.js` · 설정 «매장 태블릿(키오스크)» 카드 안 등록·목록·해제·기기별 단말기 주소 · `/pos` 진입 관문(등록 기기 → 키오스크)
- 결제 채널 pos·mobile·**kiosk**: 설정 결제수단 줄에 Kiosk 토글 · `_kioskSplit` 없으면 키오스크=모바일(온라인 결제만 OFF) · 키오스크 숨김 현금·직원식·계좌이체 · 서버 강제 `paymentMethodGuard.methodOpenIn`(폰이 키오스크 전용 수단 → 400)
- 주문 꼬리표 `source='kiosk'`(서버가 기기 토큰 보고 붙임, 토큰 없이 kiosk → 400) · 🔒 3파일 승인 범위만 · 키오스크 카드 주문은 승인 전 outstanding
- 단말기: 키오스크 «카드로 결제» → 주문 → runTerminalSale(계산대와 같은 흐름) → 서버가 승인 거래에서 금액·수단 읽어 기록 → 완납 시 pending · 손님 창 `KioskCardPanel`(거절=다시 시도/카운터, 무응답=직원 안내, 승인 뒤 기록 실패=주문번호 직원에게) · 키오스크는 수동기록·Void·찾기 403
- Fable 게이트 지적 F1(wipe 자물쇠: 메타 키 제외 + 일반 저장도 보존) · F2(미분리 키오스크 online OFF) 반영
- 검증: health-check kiosk 3/3 · 고장주입 4/4 잡힘 · 전체 302/303(실패 1 = 🔒 지문, bless 전) · 계약 테스트 settings-guard 8/8 · 화면 jest 6/6 · 빌드 2회(F1·F2 뒤 재빌드) · verify-all --full 21/24(✗3 = 🔒 지문 2 · 배포 기록 파일 1, 전부 예상) · **mount sweep 크래시 0** · 타입 신규 0 · 실브라우저 클릭 흐름 11/11(등록→키오스크→카드 승인 기록→카운터→폰 카드 숨김→해제 401)
- ⚠ 사고(개발 DB): 첫 클릭 흐름 실행이 중간에 죽어 데모 매장 38 payment_settings 원래 값을 못 되돌림 — 원본 백업 없음(복구 불가). 오늘 생긴 값은 지우고 counter.allowed_order_types=dine-in·takeaway·pickup · card.availableIn=pos · card.terminal 삭제로 복원(직전 값 `~/.claude/jobs/503af8e9/tmp/ps38-before-fix.json`). 운영 무관. 데모 38 에서 카드단말기 테스트를 하던 설정이 있었다면 다시 켜야 함
- 확인 못 함: 2단계 실기(앱 기기+실단말기) · 실프린터 티켓

### 완료 (2026-10-07) — Fable 소급 판정 v3.108(#4)·#5 [Claude Code · 백그라운드 작업방]
- **Fable 판정: PASS (소급 — 되돌릴 것 없음)** · 원문 `.claude/fable-verdict-20261007-retro-v3108-n5-gate.md` · 범위 git 771a20bc6..99f428167(21파일, 기록 밖 변경 0, 🔒 보호파일 무접촉)
- 근거 요지: 정산서 상태 바꾸는 4길 전부 soaChildSync 한 함수·트랜잭션 · dev 트랜잭션 증명 후 롤백(반증 5/5 잡음 → 맞춤 후 0) · 운영 마이그 로그 #4 자식 4건 맞춤·불일치 0, #5 0건(멱등) · 이어서 내기는 미묶음만 수집해 이중 청구 불가
- 팀원 기계 게이트(오늘 dev): print-guard 8/8 · health-check 299/299 · 인스펙션 신규 실패 0 · I-SOA-001 통과
- `.claude/.fable-gate-skip` 은 10-07 5.88 때 이미 삭제(정지 훅 복구) — 추가 조치 없음. 통과 마커는 안 찍음(지금 작업트리 지문이 이 배포와 무관)
- Fable 이 남긴 위험(되돌릴 사유 아님): A 아래 «후속 후보» · B health-check 에 정산서 연동 4길·판매 통계 라우트 케이스 0건 → 팀원이 추가(다음 확정) · C childRuleFor 죽은 값 · D 운영 정산서 3건 restaurant_id 보정(기존 대기) · E 같은 달 정산서 두 장(승인된 동작) · F 자동 발행 시나리오·mount sweep·운영 DB 현재 상태는 Fable 재현 안 함(기록·로그 수용)

### 완료 (2026-10-07 오후) [Claude Code]
- **운영 배포 SW 5.88** 인보이스 총액 수정+수정 이력 (백업 20261007_112732 · 스모크 10/10 · mount 크래시 0 · Fable 게이트 PASS 마커 유효 상태로 배포). 버전 v3.109 는 아직 안 올림(5.87·5.88 묶어 올릴 예정 — Irene 결정 대기)
- `/개발시작` 0-B단계 추가: 운영 들어온 업무 읽기 `dev-backend/scripts/prod-inbox.js`(읽기 전용 · → `dev-backend/scripts/prod-query.js` 로 바뀜(2026-10-07): 읽기 전용 계정 claude_ro 로 SELECT 4개, prod-inbox.js 삭제) → 건마다 «이미 해결/조치 필요/결정 필요», 답장·운영 쓰기는 Irene 지시 때만. 2026-10-07 11:34Z 실측: 열린 시스템 문의 3건 — SUPP-2026-6842-103·SUPP-2026-1886-062(/pos/purchase-orders «Cannot access 'mn' before initialization», 9/17) · SUPP-2026-2401-270(/pos/recipes React #31, 9/10). 후속 글 0 · 랜딩 문의 0
- ⏸ 운영 읽기 전용 계정(claude_ro) 미설정 — `/개발시작` 운영 문의 확인이 이 계정에 의존(ssh 직접 명령은 안전장치 확인에 걸려 아침 점검이 멈춤, 2026-10-07 실측). Irene 1회: 맥에서 `scp irene@87.106.11.184:dev-server/prod-ro-setup.sh irene@87.106.78.146:` → `ssh -t irene@87.106.78.146 bash prod-ro-setup.sh` (docs/PROD_READONLY_DB_SETUP.md 와 같은 내용)
- 아침 점검 cron 00:00 UTC(08:00 MYT) `~/dev-server/morning-check.sh` — PurpleHere·PlanQ 에 «/개발시작» 방. 첫 실행 2026-10-07 11:38Z(방 e6a3d881)
- 개발서버 상황판(~/dev-server/board, PM2 dev-board, 127.0.0.1:8800): 대화창·확인 완료→완료 목록(state.json)·개발완료 버튼(+git 기록)·대기열·방 줄 실행/중지/삭제 — 설명서 ~/dev-server/README.md

### /개발시작 들어온 업무 확인 (2026-10-09 00:0xZ · prod-query 읽기 전용 · 방 0f1e2387) [Claude Code]
- 새로 들어온 것 0건: 시스템 문의 마지막 글 09-17 · 후속 글(14일) 0 · 랜딩 문의 0 · 운영 문의 closed 4 / in-progress 1(개발 업무 아님)
- 열린 3건(SUPP-2026-6842-103 · 1886-062 · 2401-270)은 10-07 판단 그대로 «이미 해결» — 닫기는 운영 쓰기라 Irene 지시 때만
- 분할 발송(방 7ba2c8b8)은 그 방이 살아 있고 «Fable 최종 게이트 판정 대기»(10-08 16:41Z~) — 이 방은 손대지 않음

### /개발시작 들어온 업무 확인 (2026-10-08 00:00Z · prod-query 읽기 전용 · 방 6b0ff12b) [Claude Code]
- 새로 들어온 것 0건: 시스템 문의 마지막 글 09-17 · 후속 글(14일) 0 · 랜딩 문의 0 · 운영 문의 열림 1(진행 중, 개발 업무 아님)
- 열린 3건(SUPP-2026-6842-103 · 1886-062 · 2401-270)은 아래 10-07 판단 그대로 «이미 해결» — 오늘 재확인: check-hook-tdz 637파일 0건 · RecipesTab getErrorMessage(1321·1524줄) 유지 · 배포 기록 releases/archive/2026-09-10-error-message-crash.json. 닫기는 운영 쓰기라 Irene 지시 때만

### /개발시작 들어온 업무 판단 (2026-10-07, 11:34Z 조회 결과 기준 · 운영 재조회 안 함 — Irene 지시: 운영 서버 직접 명령 금지) [Claude Code]
- SUPP-2026-6842-103 · SUPP-2026-1886-062 (/pos/purchase-orders TDZ 'mn', 9/17) → 이미 해결: 커밋 1e43a29fd 9/17 긴급 수정·운영 배포 SW 5.35, 재발 게이트 check-hook-tdz(오늘 624파일 0건)
- SUPP-2026-2401-270 (/pos/recipes React #31, 9/10) → 이미 해결: RecipesTab 저장 실패 getErrorMessage 교체(그 신고를 주석에 명시) · releases/2026-09-10-error-message-crash.json 로 9/10 배포
- 남은 일: 3건 모두 «열림» 상태 그대로 — 닫기·답장은 운영 쓰기라 Irene 지시 때만

### 진행 중인 작업
- 없음

### 완료 (2026-10-07) — 영수증 드래그·PDF (다음 확정 3번) [Claude Code · 백그라운드 작업방 20dc6966]
- 저장소 밖 패치(`/home/irene/wip-receipt-upload-20261005/`) 되살림 — Restaurant/InvoicesPage 1곳은 그사이 코드가 바뀌어 3-way 병합, 나머지 그대로 적용 + 새 파일 4개
- 내용: 청구서 결제 제출 영수증 칸 6개 화면 공용 `ReceiptUploadField`(클릭·끌어다 놓기 · JPG/PNG/WEBP/PDF · 5MB) · 발행자 쪽 보기 `ReceiptPreview`(이미지/PDF) · 서버 `utils/receiptFile.js` 가 data URL 을 `/uploads/receipts/` 파일로 저장(DB 에 base64 안 넣음, SVG·html 거절)
- 이 방 검증: health-check payment 6/6(영수증 케이스 포함) · 화면 jest 3/3 · 고장주입 2건(서버 정규화 제거 → 실패, 끌어다 놓기 제거 → 2건 실패) 잡힘 후 원복 · print-guard 8/8 · design-guard 신규 0 · i18n 통과. 빌드는 PlanQ 에뮬레이터 메모리 게이트로 대기
- 빌드·검증·게이트는 키오스크 방(503af8e9)이 묶어서 처리: 빌드 1회 · mount sweep 크래시 0 · **Fable 최종 게이트 PASS** `.claude/fable-verdict-20261007-kiosk-final-gate.md` §2 · SW 5.89-kiosk-receipt-20261007 · 배포 기록 `dev-backend/releases/2026-10-07-kiosk-receipt.json`
- 마커 «무효» 표시 = 마커(15:46Z) 뒤 바뀐 파일이 배포 기록 JSON·session-state 뿐임을 실측(판정문 N6 대로). skip 파일 안 씀
- Fable 참고(결정 불필요): 영수증 파일은 다른 업로드처럼 링크를 알면 로그인 없이 열림(이름 추측 불가) — 로그인 뒤에만 보이게 하려면 별도 설계
- 운영 배포는 키오스크와 한 묶음으로 Irene «/배포» 대기(위 «답 기다림» 절). /개발완료 커밋은 안 함 — 지금 커밋하면 통과 마커 지문이 바뀌어 배포 직전 게이트를 다시 받아야 함

### 완료된 작업 (2026-10-07) [Claude Code] — 운영 배포 SW 5.87-owner-invoices-brand-staff-20261007 (백업 20261007_075641 · 스모크 10/10 · mount sweep 크래시 0 · 1차 시도는 메모리 게이트로 빌드 전 중단, 운영 무변경)
- 오너 청구서 «Invoices to Pay» 탭이 매장 선택을 무시하던 결함: `routes/owner.js` GET /invoices/to-pay 가 restaurant_id(내 소유 매장일 때만) 로 좁힘. 실호출: 오너 289(매장 2·3) 매장3 선택 → 수정 전 1건(매장2 것) / 수정 후 0건, 익명 401
- 오너 청구서 화면에 매장이 올린 공급업체 인보이스 «올린 인보이스 보기»(목록 줄 + 상세 창 버튼) — 서버는 이미 보내고 있었고 화면만 안 그렸음. 운영 with MIN Cafe 48건 중 22건 해당
- 브랜드 사이드바 «매니저»(본사 직원) 프랜차이즈 → 설정(회사 정보 아래). MainLayout 메뉴 목록만, 인쇄 블록 무접촉 → Irene «배포해» 로 print-guard --bless. check-sensitive-diff ① 표시(보호파일) — 판단 갈림 없어 Fable 미호출
- 검증: build:dev · verify-all --full 23/24 통과(실패 1 = deploy-ready 배포 기록 파일 없음, 배포 시 작성) · print-guard 8/8 · 민감 diff 비대상

### 완료 · 운영 배포 SW 5.88 (2026-10-07) — 인보이스 총액 수정 + 수정 이력 [Claude Code · 백그라운드 작업방]
- 설계 §3 1~11 전부 구현: 백엔드 6파일(이전 세션) + 프론트 공용 `SupplierInvoiceTotalFix`·`InvoiceModificationHistory` · RA/오너 청구서 상세 버튼·이력 · i18n 4언어 · docs PURCHASE_ORDER_SYSTEM §8-7 + OWNER_PLAN·SUPPLIER_CONTRACT 1줄
- 검증: health-check `invoice-total-fix` T1~T4 4/4 · 고장주입 3/3(pm2 재시작) · print-guard 8/8 · design-guard 신규 0 · i18n 0 · 타입(반증 프로브) 새 파일 0 · build:dev 1회 · verify-all --full 24/24(deploy-ready 기록 수정 후) · 실브라우저 클릭 8/8
- SW 5.88-invoice-total-fix-20261007 · 배포 기록 `dev-backend/releases/2026-10-07-invoice-total-fix.json` · CHANGELOG [Unreleased] · DEVELOPMENT_PLAN
- 실측 메모: 청구서 목록의 «외부 공급업체» 판정은 서버가 60초 기억(invoices-list.js EXTERNAL_ISSUER_TTL_MS) — 테스트에서 가입 전환 직후 버튼이 남았던 원인, 실사용 영향 없음
- **Fable 게이트 PASS**(지문 5504b0d5bdc6 · 마커 유효 · 판정 `.claude/fable-verdict-20261007-invoice-total-fix-gate.md`). 남는 위험(배포 무관): 동시 수정 시 이력 한 줄 덮임 가능 · 오너 화면 이력 시각=기본 타임존 · T2 남의 매장 검사는 데모 매장 2개 이상일 때만
- Fable 후속 처리: 10-05 부터 남아 있던 `.claude/.fable-gate-skip` 삭제 → 정지 훅 복구(다음 확정 1번의 «skip 정리» 해당)
- 배포 뒤 바뀐 것: `scripts/prod-inbox.js`(읽기 전용 도구 · 이후 prod-query.js 로 바뀌어 삭제됨, 2026-10-07) 하나뿐(deploy-manifest 실측) → 통과 마커는 이 파일·기록 때문에 지금 «무효» 표시, 배포된 코드는 판정받은 그대로
- 남은 일: **v3.109 버전 올림·릴리즈 공지** — 5.87·5.88 묶음, Irene 결정 대기

### (이전) 답 기다림 (2026-10-07) — 인보이스 총액 수정 + 수정 이력
- Fable 판정 수령(2026-10-07, 설계 D1~D7 · 구현 §3 11항목 · 검증 T1~T4+고장주입 3종) — 원문은 이 대화에서 Irene 에게 그대로 전달함
- **Irene 확인 대기 4항목**(Fable 권고): ①고칠 수 있는 청구서=외부 공급업체 건만(권고 이대로) ②오너는 총액만·줄 단가 대조는 RA 만(이대로) ③결제 완료 건도 허용(유지) ④사유 메모 선택(선택)
- 답이 오면: Fable §3 순서대로 구현(buyerScope OWNER_ACTING_ROUTES reconcile 추가·cost-reconciliation OWNER_TOTAL_ONLY·reconcileInvoiceSync 이력 push·attach reconcile_invoiced_lines·SupplierInvoiceTotalFix/InvoiceModificationHistory 공용 컴포넌트·RA/오너 화면·i18n·docs §8-7) → health-check T1~T4 + 고장주입 → 빌드 1회 → verify-all --full → Fable 게이트 판정(2회차) → Irene /배포
- 버전: v3.109 는 이 기능 배포 때 오늘 SW 5.87 배포분과 묶어 올림(CHANGELOG Unreleased 에 기록됨)

### 이전 기록: Fable 판정 대기 (2026-10-07 Irene 원문, 10-07 Fable 한도 429 → 이후 판정 수령)
- 「토탈금액 안맞으면 수정하는 것도 인보이스에서 가능해야지. 레스토랑관리자도, 오너도.」「그리고 수정한 사람 이름이랑 시간 남겨서 히스토리 볼 수 있어야 하고」
- 실측: RA 는 청구서 상세 «인보이스와 대조하기»(cost-reconciliation POST, 총액만 대조 → 'Supplier invoice difference' 줄) 로 가능 · 오너는 buyerScope 10-04 Fable 판정으로 원가대조·결제 403 · PUT /api/invoices/:id 오너 불가 · 수정 이력 범위 미확인

### 완료된 작업 (2026-10-06) [Claude Code]
- 키오스크 결제 질문 조사(코드 변경 0): 키오스크=모바일 표시 모드라 결제수단 동일, 단말기는 POS 결제창에만, FloorPlan·LiveOrders·POSTerminal 같은 PaymentModal. Fable 판단 요청 → 한도 429 실패 → Irene 요청으로 Opus 의견 제시(Fable 판단 아님 명시) → 다음 확정 2번으로 등록

### 완료된 작업 (2026-10-05 저녁 · #4·#5) [Claude Code]
- **#4 v3.108 · SW 5.86** (백업 20261005_153730 · 스모크 10/10 · Fable 게이트: 1차 FAIL(하드웨어 청구서 이름) → 수정·재통과 기준 실측 → 도장은 Fable 한도 초과로 미수령, **Irene 이 skip 파일 직접 생성**)
  - 정산서↔묶인 청구서 상태 단일 규칙 `services/soaChildSync`(submit·confirm·reject·PATCH status) + 복구 `scripts/migrate-soa-child-status-sync.js`(deploy) + 인스펙션 `invoice-soa` I-SOA-001 — 운영 배포 때 #162 자식 4건 맞춤, 불일치 0
  - 정산서 손님 이름: SOA 생성 시 restaurant_id 채움 + `payerIdIsStore`(invoices-helpers, hardware 제외) 술어로 이름 계산 — 운영 확인 with MIN Cafe / K-DINE IPC Branch
  - 브랜드 정산서 상세·PDF 묶인 청구서 표 · 레스토랑 청구서(Mark paid 즉시 갱신·To pay 탭 먼저·올린 인보이스 보기) · 매출 Year 그래프 연-월 순서
  - 브랜드 매출 보고서 재구성: 브랜드·매장 체크 칩(직영 빼기, localStorage 기억) · 탭 요약/카테고리/상품/매장/청구·수금 · `GET /api/brand/sales-report`(주문 시점, 범위 밖 브랜드 403) — 운영 R8 9월 Sauce 4,492.80 · Meat 1,789.70
  - 릴리즈: CHANGELOG v3.108(10-02~10-05 배포 15회 묶음) · 블로그 release-v3.108 · 공지 v3.108
- **운영 데이터(Irene 지시):** with MIN Cafe 9월 미묶음 4건 → SOA-BRD1-R10-M20261005155254(#199, RM 345.60) 발행 → paid(브랜드 PATCH 경로, 자식·발주 paid, 불일치 0, 메일 help@k-dine.com 1통). #162 는 Irene 이 22:46 Confirm → paid
- **#5** (백업 20261005_184839 · 스모크 10/10 · skip 파일 그대로) — 정산서 자동 발행 «이어서 내기»(수동 정산서 있는 주기도 남은 미묶음만 발행, soaScheduler planAutoCycle `afterManual`) · health-check 임시 계정 `@example.com`(반송 메일 원인 — dev 가 zzhcobhmuv…@outlook.com 으로 실제 발송) · `migrate-merge-product-mirrors` 재고 남은 쌍은 건너뛰고 목록(첫 시도 18:33 이 K-Bulgogi 로 중단·자동 원복)

### 다음 확정 작업 (Irene 지시)
1. ~~**키오스크 결제 분리**~~ — ✅ 완료·운영 배포 SW 5.89(10-07, 위 «완료» 절) · 남은 것: 카드단말기 실기 GHL 파일럿 날 (Irene 2026-10-06 「지금 모바일오더랑 키오스크를 분리해야 맞지」「fable 에게 다음 작업으로 남겨두자」. 10-06 Fable 한도로 미수령) [Claude Code]
   - 실측: 키오스크 = 모바일오더 표시 모드(`mobile/utils/kioskMode.ts`, `?kiosk=1` sessionStorage) → 결제수단 목록 동일(`mobile/pages/PaymentPage.tsx:861` `availableIn.includes('mobile')`). 설정 채널은 pos·mobile 2개뿐. 카드단말기는 POS `PaymentModal`+`utils/nativeEcr.ts`(앱 브릿지 `__NATIVE_ECR`)에만, mobile/ 호출 0건. 기기 등록(페어링) 모델 없음
   - Irene 추가 원문(10-06): 「포스터미널처럼 고객이 키오스크로 주문해야 해. 그리고 플로우플랜에서도 결제 문제없는 거지? 어차피 포스로 가는 거니까.」 → 실측: FloorPlan·LiveOrders·POSTerminal 모두 같은 `components/POSTerminal/PaymentModal.tsx`(단말기 조건 = card + 설정 card.terminal + 앱 브릿지 + 온라인) → 키오스크 «카운터 결제» 주문은 FloorPlan 에서 단말기 결제 가능(현재도)
   - Irene 질문 3개: ①키오스크에서 카드단말기 결제 ②키오스크·모바일 결제수단 따로 설정 ③손님 폰에는 키오스크를 안 열어주고 모바일 결제만 — 어떻게 구분하나
   - Opus 의견(Fable 판단 아님, 참고): 주문 흐름은 하나로 두고 결제만 분리 · 설정에 «키오스크» 채널 추가(기존 매장은 모바일 값 복사로 무변화) · 판정은 URL 아닌 **등록된 기기 토큰**(키오스크 태블릿=앱+매장 등록, 서버가 토큰 없으면 모바일 수단만·단말기 결제 거절) · 단말기 처리는 기존 `services/terminalPayments.js` 공유
2. ~~K-Bulgogi 1kg 정리~~ — ✅ 완료(10-07, 위 «완료» 절) · K-DINE 쪽 3건은 Irene 몫
3. ~~영수증 드래그·PDF~~ — ✅ 완료·운영 배포 SW 5.89(10-07)
4. ~~발행자 청구서 «To Confirm» 탭 + 업무 버튼 색 규칙~~ — ✅ 완료(10-07, 위 «완료» 절) · 개발서버만, 운영 배포 대기
5. ~~**결제 설정 = 계정(회사) 하나**~~ — ✅ 완료(10-07, 위 «완료» 절) · 개발서버만, 운영 배포 대기(배포 시 데모 브랜드 2건만 정렬)
6. ~~**판매자 배송 지역별 설정** — 설계부터~~ — ✅ 완료(10-08, 개발서버 · Fable 게이트 PASS · 위 «완료» 절) · 운영 배포 대기
7. ~~(10-04 잔여) 외부 공급업체 월별 SOA 대조 · 발주 스탭밀 구분 · 승인 메일 문구~~ — ✅ 완료(10-08, 개발서버 · Fable 게이트 PASS · 위 «완료» 절) · 운영 배포 대기

### 👉 Irene 님 확인·결정 대기
- 단말기(5.85) BUSY 자동 대기 실기 확인(운영 카드 거래가 생기면) · 판매자 «배송 준비 목록» Irene 화면 1회 — 상품 16 은 10-08 완료(위 «완료» 절, 방 2be9f209) · 역할 추가 요청은 운영 사용 0건
- ~~GHL: UAT 근무시간 · 직불(D007)·DuitNow QR~~ — ✅ 개발서버 완료(10-07, 방 084aaec3 · Fable 게이트 PASS) · 남은 것 = GHL 질문 3개 답 대기(아래 «답 기다림» 절)

### 후속 후보 (아이디어 메모, 확정 X)
> /개발시작 자동 추천 대상 아님. 다음 사이클 결정은 Irene 지시 기준.
- (품목별 발송 · Fable 다음 소묶음) 발송 순번을 «items 있는 shipped 이벤트» 로 세기(1줄) · 매장 발주 상세 타임라인 «Delivered» 줄이 shipped_at 을 보여 주는 옛 결함(PurchaseOrderDetailPage.tsx ~976) · «나머지 못 보냄(품절)» 처리(돈 — 별도 설계)
- **(Fable 소급 판정 위험 A · 보안 경계 — 별도 사안 설계 필요)** PATCH `/invoices/:id/status` 로 낼 매장이 금액 있는 자기 정산서를 API 직접 호출로 paid 처리 가능(정산서에 restaurant_id 가 채워지면서 넓어짐, 묶인 청구서도 따라감). 화면은 0원 확정에만 사용. 2026-09-14 «낼 쪽 PATCH paid 는 0원만» 예외와 같은 선으로 좁힐지 Fable 설계
- (Fable 위험 B · 기계 작업) health-check 에 정산서 연동 4길(submit·confirm·reject·PATCH)·`/brand/sales-report` 범위 403 케이스 추가
- 하드웨어 청구서가 payer_type 'restaurant' 에 사람 번호를 넣는 생성 쪽 불일치(routes/hardware-quotes.js:234) — 데이터 보정 동반, 별도 판정
- 푸드코트·시스템관리자 정산서 상세에도 묶인 청구서 표(이번엔 브랜드만)
- 브랜드 보고서 범위 검사 고장주입 반증 미실시(403 실측만) · Mark paid 수정 전 코드 실패 반증 미실시
- invoice soaChildSync childRuleFor 의 'pending'·'sent'·'rejected' 는 ENUM 에 없는 죽은 값(Fable 지적 — 해 없음)
- K-Jjajang Sauce 1kg(ing#95) 비활성 재료를 레시피 3줄이 가리킴(운영, 합치기 마이그 목록)
- Fable 조건(5.84): jest context-requests ⑨ 와 user-contexts-switch rid 18 공유 · BUSY 외 4xx 대기 · declined H400 행 · base64 영수증 소급 · po-qty-step TOKEN_FILE · Windows 설치본 재빌드 · /docs SEO nginx

### 주요 변경사항
- Git: 2026-10-07 /개발완료 커밋(5.87·5.88 코드 + 기록). 영수증 작업은 저장소 밖 보관
- 운영 데이터 처리(10-05): brands#2 payment_settings · SOA#188 자식 10건 paid(오전) · SOA#199 발행·paid(저녁)

### 완료된 작업 (2026-10-05 오전 · #1~#3) [Claude Code]
- **#1 SW 5.83 오너 대리 발주** (백업 20261005_052507 · Fable PASS · 커밋 760c8c886) — 오너가 소유 매장을 골라 그 매장 자격으로 발주·제출·취소, 오너 제출=승인 생략. buyerScope OWNER_ACTING_ROUTES · applySubmitGate actor · 화면 매장 선택 먼저
- **#2 SW 5.84** (백업 20261005_072313 · 마이그 2 · Fable PASS 조건 4 · 커밋 fea0a4e92) — 역할 추가 요청(Staff 포함, user_context_requests·user_contexts.permissions) · 발주 최소주문 강제(MOQ 1=미설정) · 판매 상품 연결 환산에 팩 용량 · 판매 상품 등록 화면 설명·미리보기·재고단위 칸 제거 · 단말기 거절 뒤 Confirm 잠김·BUSY 제목
- **#3 SW 5.85** (백업 20261005_093553 · 스모크 10/10 · Fable PASS 재도장 2회 `.claude/fable-verdict-20261005-terminal-busy-gate.md`) — 단말기 BUSY 자동 대기(3초 간격 최대 60초, «단말기에서 DONE 을 눌러 대기 화면으로 → 자동 시작», Stop waiting) · 판매자 받은 주문 «배송 준비 목록 (가격 없음)» WhatsApp 버튼. 운영 확인: sw 5.85 · ko 문구 2종 서빙 · online
- 카드 단말기 GHL UAT: 10-05 운영 첫 승인(VISA 346631·254719, GrabPay QR 1건 → 이월렛 grabpay 기록). 10-04 B0 = 일요일(UAT 근무시간 외). 승인 직후 다음 결제 BUSY = 단말기 DONE 대기 화면 → 5.85 로 대응
- 운영 데이터 직접 수정 2건(Irene 긴급 지시): ① brands#2(K-DINE).payment_settings ← brands#1 값(비어 있을 때만, 되돌리기 = #2 칸 NULL) ② SOA-BRD2-R8-M20260929173419(#188) 하위 청구서 10건 payment_submitted→paid(paid_at·confirmed_at = SOA paid_at, confirmed_by 23). 연결 발주 10건은 이미 paid


---

## 서버 재시작 후 복구 가이드

새 Claude 세션 시작 시 아래 내용을 붙여넣으세요:

```
이전 세션에서 진행하던 작업을 이어서 하고 싶어.
/var/www/.claude/session-state.md 파일 읽어줘.
```
