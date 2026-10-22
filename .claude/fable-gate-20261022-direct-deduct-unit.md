# [Fable gate] 다이렉트 상품 출고·반품 차감 = 주문 수량 × 상품 규격 (2026-10-22 · 작업방 669bfa10)

> 요청서 `.claude/fable-gate-request-20261022-direct-deduct-unit.md` · 설계 `.claude/fable-design-20261022-direct-deduct-unit.md`
> 판정자 Fable · 개발서버 읽기·실호출·고장주입 1회(원복 cmp 확인) · 운영 쓰기 0 · 배포 0 · 코드 수정 0.

## 판정: **PASS** (고칠 것 0 — 기록만 2건, §4)

## 1. diff 범위 대조 (설계 §6 절단면 ↔ 실제 변경)

| 절단면 | 파일 | 대조 결과 |
|---|---|---|
| 1 D1 본체 쪼개기 | `services/sellerLinkConversion.js` (+38/−6) | ✅ `linkConversionOf({stock, sellerProduct}) → {conv, compatible}` 하나에 본체 · `deriveLinkConversion` 은 raw 우선 그대로 → `.conv`(서명·반환 무변경) · `directDeductConversion` export · compatible=false 는 `classifyConversion` H 만(D 는 값, 그 밖은 1·true). 새 환산 규칙 0 — 셋째 사본 금지(5 ③) 준수 |
| 2 출고 분기 | `routes/seller-orders.js` (+12/−4) | ✅ 다이렉트 분기만 — `takeD = round2(qty × conv)` · `delta: -takeD` · 비호환이면 notes 끝 ` [unit_mismatch a↔b]`(자체 재고 분기 `[stock_shortfall]` 과 같은 자리) · 출고 안 막음(5 ②) · 레시피·자체 재고·supplier 분기 무접촉 · 🔒 보호파일 아님 |
| 2 반품 분기 | `routes/po-returns.js` (+7/−4) | ✅ 같은 함수 · `round2(delta × conv)` · 같은 표시 · `delta > 0` 가드 그대로 · supplier 환원·레시피 환원 무접촉 |
| 3 D2 연결 400 | `routes/brand-products.js` (+21) | ✅ `resolveDirectLink` 에서 `String(nextDirect) !== String(current?.product_ingredient_id ?? '')` 일 때만(POST = 항상 새 연결) · spec = body 값 ?? current · `/stock-item existing_stock_item_id` 가지도 같은 `unitIncompatible` · 400 `UNIT_INCOMPATIBLE` 문구 설계 그대로 · `register-as-product`·from-catalog 무접촉 |
| 4 D4·D3 | `scripts/inspection/suites/ingredient-unification.js` (+10) · `utils/directDeductAudit.js`(새) · `scripts/report-direct-deduct-unit.js`(새) | ✅ 034(013 은 이미 있어 번호 재량) 비차단 목록 · 조회+판정을 `directDeductAudit.listDirectDeductRows` 한 곳에 두고 인스펙션·보고 둘 다 그것을 부름(검사=수정 같은 SQL 규칙) · 보고 스크립트 쓰기 0(SELECT 만) |
| 5 D5 | `docs/TRADE_STRUCTURE.md` (+6/−2) | ✅ §2-1 첫 항목 문장 교체 + 매장 메뉴 괄호 한 줄(F8) · «1:1 환산 없음» 문구 제거 |
| 6 D6 | `BrandProductsTab.tsx` (+11/−1) · brand.json ×4 | ✅ `renderStockItemFields` 재고 칸 아래 `bq > 1 && 입력 > 0` 일 때 `= {입력÷bq 소수 2자리} {package_unit ?? 'pack'}` · 계산만(저장 0) · `formatQuantity` 는 기존 유틸 · `siStockInPacks` en/ko/ms/zh 4개 |
| 7 health-check | `scripts/health-check.js` (+140/−3) | ✅ 파일 **끝**에 `defineDirectDeductUnitTests`(P1·P2 한 시험 · P3 · P4) + 호출 1줄 · teardown 이 CN 인보이스·반품·장부·PO·상품·재고아이템 전부 삭제. **기존 검사 1건 수정 수용**: «프로덕트 재고아이템 다이렉트 — 자동 레시피 0» 이 `unit:'ea'` 로 아무 재고아이템(g)에 붙이던 것을 `si.unit` 으로 — 검사 목적(자동 레시피 0)과 무관한 칸이고 D2 가 새로 막는 조합이라 바꾸는 게 맞다. 설계 §6-7 «P3 ship 은 고치지 않는다» 준수(무접촉·통과) |
| 설계 밖 | — | **0건.** `git status` 15건 전부 위 표 안. 새 테이블·컬럼·라우트·마이그 0 |

- 🔒 `check-print-guard` **8/8 변경 없음**(고장주입 원복 뒤 재확인 포함).
- `check-sensitive-diff`: 기계 기준 비대상(안전망 2건 = health-check 끝 덧붙임 + 기존 1건 수정 근거 위 · 인스펙션 비차단 1건 추가). ② 돈·주문 무결성 자기평가 gate = 이 판정.

## 2. 판정자 재실행 (전부 숫자)

- `health-check --category=inventory` **80/80** — P1·P2(−1500 g · cost_value −19.5 · 반품 +500) · P3(−2000 g) · P4(−2 + `[unit_mismatch piece↔g]` · 새 연결 400 · stock-item 400 · 이름만 200) · 회귀 «P3 "그대로 팔기" 프로덕트 출고 → 재고아이템에서 차감» 통과(base 1 → 식이 바뀌어도 같은 값).
- 환산 함수 표(판정자 직접 호출 13건): 500 g/pack↔g **500** · kg/1↔g **1000** · pack/1↔pack **1** · piece↔g **1·false** · measure kg↔g **1000** · kg↔ml **1·false** · ea/12↔pcs **12**(개수 동의어) · pack/1↔piece(재고 pkg pack·base 50) **50**(D2 규칙) · can↔piece **1·false** · g/1↔kg 재고 **0.001** · 단위 빈 칸 **1·true** · measure kg↔kg **1** · base 0 **1·true** — 설계 D1 표와 같음.
- **P4 독립 실호출**(`/tmp` 스크립트 · demo-brand · piece 상품 ↔ g 재고아이템, 끝에 삭제, 잔재 0/0): 이름만 PUT **200** · 다른 g 재고아이템으로 연결 PUT **400 UNIT_INCOMPATIBLE** · 같은 PUT 에 `unit:'g', base_quantity:500` 을 실어 연결 **200**(spec = body 우선 확인).
- **고장주입(판정자 1회)**: `resolveDirectLink` 의 `return incompatible` 제거 → pm2 재시작 → 같은 PUT **200**(가드 죽음 확인) → cp 원복 `cmp` 동일 → 재시작 → **400** 복귀. diff stat 주입 전후 같음(+21). 팀원 주입 ①(conv→1 → P1·P2·P3 실패)은 수치 인용 — 시험 단정식(afterShip===500 · ===3000)이 conv 1 이면 1997·4998 이라 구조상 반드시 실패하는 식임을 읽기로 확인.
- `report-direct-deduct-unit.js` dev: 상품 **2**(#13931·#13939 환산 500) · 판매·반품 장부 줄 **0** — 보정 대상 0(설계 F7 그대로).
- 인스펙션 **81/99 · 신규 0**(baseline 11) · ING-UNI-008/009/034 ✅ · `check-design-guard` 신규 0 · `i18n:verify` Errors 0.
- 화면: 빌드 산출물 `dev-frontend-build/static/js/5926.*.chunk.js` 와 `locales/en/brand.json` 에 `siStockInPacks` 포함(05:19 빌드) — «= 1.8 pack» 실측은 팀원 수치 인용(콘솔 0).
- 잔재: `[hc] 다이렉트차감%` 상품·재고아이템 0 · `HC-DDU-%` 발주 0 · `unit_mismatch` 장부 줄 0 · 판정자 probe 행 0.

## 3. 배포 안전성

- 마이그 0 · 스키마 0 · ENUM 0. 프론트 변경 있음 → SW bump 는 배포 방 몫(요청서 verify-all «배포 준비 ✗» 는 그 뜻).
- 되돌리기 = 코드 되돌리기만. 바뀐 식으로 쓴 장부 줄은 `order_deduct`/`return_in` 로 남아 추적 가능.
- 운영: 배포 뒤 `운영검증` 에서 `report-direct-deduct-unit.js` 를 production-backend 에서 돌려 숫자 보고(D3). 0 이면 끝, 있으면 Irene 재고 조정.

## 4. 기록만 (고칠 것 아님 · 다시 열 때 참고)

1. **D2 는 «연결이 바뀔 때만» 본다** — 연결은 그대로 두고 `unit` 만 piece 로 바꾸는 PUT 은 400 이 아니다(설계 범위 그대로). 그런 행은 034 목록과 장부 `[unit_mismatch]` 가 드러낸다. 저장 시점에도 막고 싶으면 D2 조건에 «spec 이 바뀌었을 때» 를 더하는 1줄 — 별건.
2. **conv < 0.005 면 round2 로 0** (예: 1 g/pack 을 kg 재고아이템에서 팔면 3 pack → 0.003 → 0) — 장부에 0 줄. 입고(`purchaseOrderReceive.js`)와 같은 반올림이라 일관되지만, 그런 규격은 재고아이템 단위를 g 로 두는 게 답. 데이터 없음(dev 0).

## 5. 마커

`node dev-backend/scripts/fable-gate.js pass --note "..."` 를 이 파일을 쓴 뒤 같은 지문에서 찍는다. 이 뒤 코드·문서를 한 줄이라도 고치면 마커가 죽는다 — 그때는 다시 gate.
