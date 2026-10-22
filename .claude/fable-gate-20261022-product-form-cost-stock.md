# [Fable gate] 상품 창 원가·재고 — 재고아이템 한 곳 (2026-10-22 · 작업방 669bfa10)

> 요청서 `.claude/fable-gate-request-20261022-product-form-cost-stock.md` · 설계 `.claude/fable-design-20261021-product-form-cost-stock.md`
> 판정자 Fable · 개발서버 읽기·실호출·고장주입 1회(원복 확인) · 운영 쓰기 0 · 배포 0 · 코드 수정 0.

## 판정: **PASS** (고칠 것 1 — 시험 데이터 뒷정리, 코드 아님)

## 1. diff 범위 대조 (설계 §6 절단면 ↔ 실제 변경)

| 절단면 | 파일 | 대조 결과 |
|---|---|---|
| 1 D3 attrs 상수+확장 · D2 ①②③ | `routes/brand-products.js` (+38/−?) | ✅ `STOCK_ITEM_ATTRS` 5곳 교체 · `/stock-item` 새로 만들 때만 `unit_cost`(≥0)·`current_stock`(장부 `initial`, `product-ingredients.js:653` POST 와 같은 호출) · 연결 뒤 자체 재고≠0 → `stockLedger.record adjustment setTo 0`, PUT(`:1233~`)과 **같은 함수·같은 문구·같은 unit(selfStockUnit)** · `seller_source` 가지 `recomputeUnitCost onlyIfZero` |
| 2 from-catalog 재계산 | `routes/product-ingredients.js` (+6) | ✅ `existing_product_ingredient_id` 가지만 · `connectExisting` 성공(<300) 뒤 commit 전 · `/:id/seller-sources`(`:1418`)와 같은 호출·같은 모드 · 새로 만드는 가지·`existing_brand_product_id` 가지 무접촉 |
| 3 PUT current_stock 400 | `routes/supplier-products.js` | ✅ 400 `USE_INVENTORY_ADJUST` · 다른 칸 무접촉 |
| 4 브랜드 화면 D1·D2·D3 | `BrandProductsTab.tsx` (+206/−?) | ✅ 상품 종류 아래 칸 삭제 → Stock Item 블록 안 A/B/C · `selfStockMode` 일 때만 `current_stock` 싣고 아니면 `undefined` · B → `/stock-item {unit_cost, current_stock}` · C → 바뀐 칸만 `PUT /product-ingredients/:id {unit_cost}` · `adjust-stock {reason:'Edited in product form'}` · 409 «기존 것 쓰기» 는 `{existing_stock_item_id}` 만(수량·원가 미적용) + 확인창 한 줄 · 마진 폴백 = 원가 칸 입력값 · 자체 재고>0 경고 · kind≠stock 재고 칸 없음 · 타입·목록 매핑 확장 |
| 5 공급업체 화면 D6 | `SupplierProductsTab.tsx` (+49) | ✅ 등록 «개시 재고» → `/supplier-inventory/adjust {reason:'Opening stock'}` · 수정 읽기 줄 + Inventory 링크 · 원가 칸 없음 |
| 6 i18n 4언어 | brand.json · supplier.json ×4 | ✅ `i18n:verify` Errors 0 |
| 7 health-check 끝에 추가 | `scripts/health-check.js` | ✅ 파일 **끝**에 `defineProductFormCostStockTests`(P1·P3 pos · P6 security) + 호출 1줄. 같은 파일 앞쪽 diff(오너 승인취소 테스트)는 **다른 방 몫** — 이 방 무접촉 확인 |
| 설계 밖 1건 | `SupplierProductsTab.tsx` `unit_price: unitPrice` | ✅ **수용.** 커밋 `40fd0123b`(2026-08-30) 가 요청 본문에서 이 줄을 지운 것을 `git show` 로 확인(−1줄). 서버 `supplier-products.js:566` 은 `unit_price is required` 400 → 그 뒤 공급업체 «Add Product» 가 전부 400 이었던 회귀의 복구. 새 규칙 0 |

- 🔒 보호파일: `check-print-guard` **8/8 변경 없음**(고장주입 원복 뒤 재확인 포함).
- 새 테이블·컬럼·라우트·마이그 0 · `brand_products` 원가 칸 0(D4 ⛔ 준수) · 자동 이전 0(D5 준수).
- `check-sensitive-diff`: 기계 기준 비대상(안전망 health-check.js 1건 — 근거 = 끝에 덧붙임만). ④ 자기평가 gate = 이 판정.

## 2. 판정자 재실행 (전부 숫자)

- `health-check --category=pos` **58/58** · `--category=security` **95/95**(P6 포함) · `check-design-guard` 신규 0(299/295 baseline) · `i18n:verify` Errors 0 · `check-print-guard` 8/8.
- **P4 독립 실호출**(`/tmp` 스크립트 · demo-brand 계정 · 판매자 브랜드상품 #4 Egg RM 2500/kg · 끝에 전부 삭제, 잔재 0/0):
  - ① 원가 0 · g/1000 → from-catalog 201 → `unit_cost` **2500.0000**(매핑 `unit_conversion` 1000)
  - ② 사람 값 9.99 → 201 → **9.9900 그대로**(사람 값 보존)
  - ③ 원가 0 · piece/1 (비호환) → 201 → **0 그대로**
- **DB 대조(팀원 숫자 그대로 맞음):** 13931→6376 원가 4.0000 · 재고 5 · 장부 `initial 7` + `adjustment −2 «Edited in product form»` / 13939→6393 6.5 · 9 / 13810 자체 재고 0 + `adjustment −7 «Linked to recipe/stock item — self stock cleared»` / 13932·13934(P3) 둘 다 0 + cleared 1줄 / 공급업체 6230 단가 16 · 재고 10 · `supplier_inventory_transactions` `manual_adjust +10 «Opening stock»` 1줄.
- **판정자 고장주입 1회(영구 안전망 반증):** `brand-products.js:1569` 자체 재고 비우기를 `if (false && …)` 로 끔 → pm2 재시작 → `health-check pos` **57/58, 실패 = P3 만** → `/tmp` 사본으로 `cp` 원복(sha256 `9ac7ba55e8e7caa5` 전후 동일 · 주입 문자열 0) → 재시작 → **58/58** · security 95/95 · print-guard 8/8. 주입 중에도 health-check 가 자기 행을 지웠다(`[hc] 원가재고%` 잔재 0).
- 번들: `dev-frontend-build` 03:21 > 소스 03:18 · 번들에 `siCostLabel`·`openingStockFailed` 있음 · locales 4벌에 새 키 있음 — 팀원 mount sweep 이 **지금 번들**을 본 것으로 인정.
- `verify-all`(non-full) 판정자 재실행: **22/23** — ✗ 는 «배포 준비»(releases 기록 7칸·SW 버전 = 배포 방 몫) 하나뿐. health-check 전체 ✓ · 인스펙션 신규 0 ✓ · 계약 테스트 ✓ · 타입 기준선 신규 0 ✓ · 번들 신선도 ✓ · 인쇄 라우트 가드 ✓.

## 3. 팀원이 «확인 못 함» 으로 적은 것 — 그대로 둔다
- 운영 §5-7 수치(«다이렉트+자체재고>0» · «미연결+자체재고>0») → `운영검증` 몫, 보고만·백필 없음(D5).
- 390폭 클릭 흐름 미실행 — mount sweep 크래시 0 으로 충분(핵심 흐름 아님 · 되돌리기 쉬움).

## 4. 고칠 것 (1건 · 데이터 뒷정리 · 코드 변경 아님 · 마커 유효)
1. **dev 13933 «[확인용] 원가재고 P3 1792638485362»** — 팀원 고장주입 때 만들어진 행이라 자체 재고 **7 + 다이렉트 6381** 상태로 남아 있다. 그래서 설계 §7 «dev 다이렉트+자체재고>0 = 0» 이 **지금 1** 이다(팀원 보고 «1→0» 은 주입 전 시점). 지우거나(상품·재고아이템·장부 줄) Edit Product 저장으로 장부 0 으로 만들어 **0 으로 맞춘 뒤 보고에 숫자를 적을 것.** 13932·13934 는 정상(cleared).

## 5. 기록만 (수정 요구 아님)
- health-check 새 3건은 데모 계정이 없으면 `return true`(통과로 셈). dev 에선 security 가 8 시험 계정 존재를 상시 검사하므로 지금은 괜찮다 — 같은 파일 다른 테스트들처럼 «준비물 없음 → false + 회색 로그» 가 더 정직하다. 다음에 이 파일을 만질 때.
- `from-catalog` 가 이미 매핑돼 있던 경우(멱등 200)에도 재계산이 한 번 더 돈다 — `onlyIfZero` 라 무해.
- F8(손입력 원가 이력 없음) 그대로 범위 밖.

## 6. 배포 안전성
- 마이그 0 · ENUM 0 · 새 라우트 0 → 롤백 = 코드 되돌리기만. 데이터 변화는 전부 장부 줄로 남는다(initial / adjustment).
- SW 버전·배포 기록 = 배포 방 몫(verify-all ✗ 배포 준비 1건이 그것).
- 운영 반영: 다음 배포 때. 배포 뒤 `운영검증` 에서 §5-7 두 수를 읽기 스크립트로 보고.
