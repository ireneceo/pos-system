# Fable 게이트 판정 — 후속 묶음: 오너 줄 단가 대조 허용(§3-1) + 브랜드 매입가 → 재고아이템 원가(§3-2) (2026-10-09)

> Irene 답(상황판 원문): «권고대로» → §3-1 A안(오너도 줄 대조) · §3-2 «매장과 같게».
> 설계: `.claude/fable-design-20261009-invoice-page-actions.md` §3 · 앞 판정: `.claude/fable-verdict-20261009-invoice-page-actions-gate.md` · 팀원 입력: `~/.claude/jobs/e9818ea9/tmp/fable-gate2-input.md` · diff: `~/.claude/jobs/e9818ea9/tmp/team-diff2.patch`(388줄 전부 읽음, 10파일).
> 운영 쓰기 0 · 제품 코드 수정 0(판정만). 아래 숫자는 내가 개발서버에서 직접 돌린 것.

## 0. 결론 — **통과(PASS). 개발서버 기준으로 끝났다. 운영 배포 전 조건은 앞 판정 §5 그대로(아래 §5).**
설계 §3 두 결정을 설계대로 옮겼다. 설계 밖 변경은 «돌아가기 버튼 행선지» 1건뿐이고 허용(§2). 보호파일 무접촉 · 보안 경계는 «오너 총액만» 막음 1개를 뺀 것뿐 · 실호출 전부 통과(invoice-total-fix 5/5 · invoice-actions 7/7 · verify-all 22/23, 유일한 ✗ 는 배포 직전 항목) · 새 검사 2건(T5·C3)이 진짜로 가르는 검사임을 코드와 반증으로 확인 · §3-2 가 붙인 «멈춤 조건»(매장별 원가를 덮는 길이 나오면 멈춤)은 내가 다시 실측해 **해당 없음**.

## 1. 내가 확인한 것 (검증 규율 4조항 순서)

### ① 설계 범위 밖 변경 0 — diff 10파일 전부 대조
| 설계 | 한 일 | 판정 |
|---|---|---|
| §3-1 서버: `OWNER_TOTAL_ONLY` 게이트 제거 | `cost-reconciliation.js` 173행 403 블록 삭제 → 주석으로 교체. 오너 자격 확인은 `buyerScope`(소유 매장) + `checkPOOwnership`(발주 주인 = 그 매장) 두 겹 **그대로** | 설계대로. 지운 것은 «총액만» 한 가지뿐 |
| §3-1 화면: 대조 화면 라우트에 오너 | `App.tsx` `ProtectedRoute` 역할 목록에 `Restaurant Owner` 1개 추가 | 설계대로. 서빙 번들에 그 목록 8곳 반영 확인 |
| §3-1 화면: 오너 창 «대조하기» 플래그 제거 | `TradeInvoiceActions` 의 `allowLineReconcile` prop 자체 삭제(항상 보임) · `OwnerInvoicesPage` 호출부에서 제거 · `SupplierInvoiceTotalFix` 의 `OWNER_TOTAL_ONLY` 전용 오류 문구 분기 삭제 | 설계대로(«결정 나면 그 플래그만 뺀다»). 번들에서 `allowLineReconcile`·`OWNER_TOTAL_ONLY` 0건 |
| §3-1 검사: T2 반전 + 남의 매장 403 | T2: 소유 매장 줄 대조 200 + 줄 단가 DB 46 기록 · **남의 매장 자격 줄 대조 403** · total_only 이력 이름=오너 유지. **T5 신설**: 오너 줄 대조 45 → 그 매장 재료 `unit_cost` 45 · `cost_change_logs.changed_by_name` = 오너 이름 | 설계 §6 T-B 그대로 |
| §3-2 원가 쓰기 함수 | `services/storeCost.js` `writeStockItemCost(stockItem, value, {transaction,userId,notes,log})` — 0 이하·같은 값이면 무변경, `product_ingredients.unit_cost` UPDATE, `cost_change_logs`(subject `product_ingredient`), 그 뒤 **기존** `stockItemMirror.syncMirrors` 로 거울까지(costSync 와 같은 방식) | 설계대로 — **새 전파 코드 0**(§8-4 원칙) |
| §3-2 수령 | `purchaseOrderReceive.receiveIntoProductIngredient` 장부 기록 뒤 들어온 값(청구가 우선 ÷ 환산 × 기준양 = `incomingPerStockUnit(item) * base`, 장부와 같은 값)으로 `writeStockItemCost`(source `receive`). `/receive`·`mark-received` 둘 다 이 함수 한 곳을 타므로 두 길 다 적용 | 설계대로. 매장 재료 수령 경로와 같은 규칙 |
| §3-2 대조 | `cost-reconciliation.js` ①-c: `po.entity_type==='brand' && !totalOnly` · 줄의 `product_ingredient_id` 재고아이템이 **그 브랜드 소유자(`Brand.owner_id`) 것일 때만** · 청구 단가 ÷ `unit_conversion` × `base_quantity` → `writeStockItemCost`(source `invoice_reconcile`, 이름=대조한 사람) | 설계대로. 식·반올림(소수 4자리)이 매장 ①-b 와 글자 그대로 같음. 소유자 확인은 수령의 `receiveIntoProduct` 와 같은 기준 |
| §3-2 검사 C3 | 수령 5 → 재고아이템 5·거울 5 · 대조 6 → 6·6 · 기록 2줄(receive, invoice_reconcile) | 설계 §6 T-C3 그대로(+거울까지 단언) |
| 로그 ENUM | `cost_change_logs.source` 에 `receive`·`invoice_reconcile`, `subject_type` 에 `product_ingredient` — **DB 실제 컬럼 정의로 확인**(모델과 일치) → 마이그 0 | 새 값 없음 |

설계가 «하지 않는다»고 한 것을 한 것: 없음. `buyerScope.js` 변경은 주석 2줄뿐(규칙 변화 0).

### ② 가드 스크립트 (내가 직접 실행)
- `check-print-guard` **8/8 변경 없음** — 🔒 인쇄·KDS 보호파일 무접촉.
- `check-design-guard` **신규 위반 0**(합계 299 / baseline 295 는 앞 판정 때와 같은 기존 부채 집계 차이).
- `check-sensitive-diff` **게이트 대상 ⑤ 보안 경계 = `buyerScope.js`** — 이번 묶음의 실제 권한 변화는 `cost-reconciliation.js` 의 «오너 총액만» 거절 삭제 1개(buyerScope 자체는 주석만). ③ 모델 21건·`server.js` 는 앞 판정과 같이 운영 스냅샷 대비 이전 커밋 — 이번 작업트리 변경 아님.
- 게이트 장치: 앞 판정 §5 덧붙임에서 지적한 **`.claude/.fable-gate-skip` 이 지워져 있음**(skip 로그 마지막 03:51, 그 뒤 없음) → 훅이 다시 산 상태.

### ③ 실호출·실브라우저
- **내 실행**: `health-check --category=invoice-total-fix` **5/5** · `--category=invoice-actions` **7/7** · `verify-all`(브라우저 sweep 제외) **22/23** — health-check 전체 회귀 ✓ · 계약 테스트 ✓ · 인스펙션 신규 0 ✓ · 타입 기준선 신규 0 ✓ · i18n ✓ · 번들 신선도 ✓(프론트 소스 05:49 < 번들 05:55). 유일한 ✗ `deploy-ready` = 배포 기록 파일·SW 버전 — **배포 직전 항목이라 지금은 당연히 ✗**.
- 팀원 결과(새 번들): 클릭 흐름 4역할 52/52(오너: 대조 버튼 → 대조 화면(스코프) → 줄 단가 10.75 저장) · `verify-all --full` 23/24 mount sweep 8역할 크래시 0. 첫 실행이 «요금제 없음» 화면에 막힌 것은 시험 계정 데이터 문제(코드 무관) — 판정에 영향 없음.
- **새 검사가 «항상 통과하는 검사»가 아님**: T5 는 재료 행 `unit_cost` DB 값 45 **AND** 로그의 이름=오너를 단언(원가 쓰기를 끊으면 1이 남아 실패) · C3 는 두 표(재고아이템·거울)의 값을 두 시점에 단언 **AND** 로그 2줄의 source 순서까지. 팀원 고장주입 2종(pm2 재시작 뒤 — ①403 재삽입 → T2·T5 ✗ ②`writeStockItemCost` 호출 무력화 → C3 ✗, 원복 뒤 5/5·7/7)은 이 단언 구조와 맞아 **반증 성립**으로 인정.
- 시험 데이터 잔재: `ZZ-HC-T5-*`·`ZZ-HC-C3-*` 재고아이템/재료/계정/로그 **0건**(내 SELECT) — 정리됨. (`ZZ-HC-MOQ-*` 재료 3행은 10-05 다른 검사의 잔재 — 이번 묶음 아님, 기록만.)
- **§3-2 멈춤 조건 재실측(내 확인)** — «재고아이템 원가가 매장 오버레이를 덮는 길이 나오면 멈춘다»: `syncMirrors` 는 `ingredients.source_product_ingredient_id = 아이템 id` 행만 고치고, 그 칸을 쓰는 코드는 `stockItemMirror.js` 113행(브랜드 거울 생성) 하나뿐 → dev 거울 3행 전부 `owner_type='brand'`, 매장 소유 재료 0. `restaurant_ingredient_costs`(매장별 원가, dev 13행)는 `syncMirrors`·`writeStockItemCost` 어디서도 안 건드림. 거울 쪽은 `MIRROR_READONLY` 로 사람이 못 고치는 칸이라 «사람 결정을 덮는» 자리도 아니다. → **멈춤 조건 해당 없음**. (08-22 «브랜드 상품→매장 재료 동기화 덮어쓰기»는 `brand-products.js syncProductToIngredients` 별도 경로 — 이번 코드가 부르지 않음, 그대로 미착수.)

### ④ 배포 안전성
- 마이그 0 · ENUM 0(DB 에 이미 있음) · 새 라우트 0 · 새 공개 라우트 0. 되돌리기: 백엔드 4파일 되돌리면 끝, 데이터 모양 변화 없음(원가 값은 `cost_change_logs` 에 이전 값이 남아 되돌릴 수 있음).
- **SW 버전 미상승**(`5.89-kiosk-receipt-20261007`) → §5.

## 2. 설계와 다르지만 허용하는 것 (1건)
- `InvoiceReconcilePage` «발주로 돌아가기»·«취소» 가 **청구서 창에서 온 길(스코프 쿼리 있음)이면 뒤로 가기(navigate(-1))** — 설계에 없던 작은 추가. 이유가 맞다: 오너·둘째 브랜드는 발주 상세를 그 스코프로 못 열어 원래 행선지가 막힌 문이었다. 되돌릴 수 있는 화면 동선 1건, 쿼리 없으면 옛 길 그대로. 허용. (새 탭에서 직접 열어 history 가 1이면 옛 길로 떨어지는데 이건 이전부터 같은 상태 — 기록만.)

## 3. 남은 것 — 기록만 (범위 밖, 고장 아님)
- 앞 판정 §4 그대로(레시피 없는 프로덕트 줄 문제분 · StockAlert 브랜드 칸 · 다브랜드 발주 화면 전체 스코프 #7 · 브랜드·푸드코트 창 결제 버튼 · Staff 버튼 권한 · `lastDiscrepancyReason` 죽은 변수).
- 거울로 옮길 때 `syncMirrors` 가 원가뿐 아니라 거울 칸 전부(이름·단위 등)를 다시 맞춘다 — `costSync` 와 같은 기존 동작이고 거울 칸은 원본이 주인이라 맞다. 새 문제 아님.
- 매장별 원가(`restaurant_ingredient_costs`)를 따로 정한 매장은 브랜드 매입가가 바뀌어도 자기 값이 우선 — 설계 의도(§8-4 D-5) 그대로.

## 4. 운영 배포(`/배포`) 전 조건 — 앞 판정 §5 와 같다, Irene 지시 때 팀원이 한다
1. **SW 버전 1회 올리고 빌드 1회**(`sw.js` `SW_VERSION`) + **배포 기록 파일**(`releases/2026-10-09-*.json` 7칸) → `verify-all` 재확인. 이 둘 외엔 코드에 손대지 않는다(바뀌면 이 마커가 죽고 다시 게이트).
2. 문서는 **배포 뒤**(게이트 지문): `docs/PURCHASE_ORDER_SYSTEM.md` §8-8 신설·§4 브랜드 비교·§8-5 백로그·**§8-7 D3 «오너 총액만» → «오너도 줄 대조» 갱신**·§8-4 에 «브랜드 재고아이템 원가 = 마지막 매입가(수령·대조)» 한 줄 · `RESTAURANT_OWNER_PLAN.md`·`SUPPLIER_CONTRACT_SYSTEM.md` 403 문구 · 메모리 `project_brand_ingredient_sync_overwrite` 는 그대로(별 경로).

## 5. 마커
PASS → 이 파일 저장 뒤 `node dev-backend/scripts/fable-gate.js pass --note "…"` 를 Fable 이 직접 찍음(지문 = 현재 작업트리).
