# Fable 게이트 판정 — 청구서 화면 네 가지 일(올리기·보기·대조·총액 수정) 역할 무관 + 브랜드 발주 흐름 고장 3개 (2026-10-09, 이 사안 2회차·마지막)

> 설계: `.claude/fable-design-20261009-invoice-page-actions.md` · 팀원 입력: `~/.claude/jobs/e9818ea9/tmp/fable-gate-input.md` · diff: `~/.claude/jobs/e9818ea9/tmp/team-diff.patch`(1,432줄 전부 읽음)
> 운영 쓰기 0 · 제품 코드 수정 0(판정만). 아래 숫자는 내가 개발서버에서 직접 돌린 것.

## 0. 결론 — **통과(PASS). 개발서버 기준으로 끝났다. 운영 배포 전 조건 2개(§5).**
설계 밖 변경 0 · 보호파일 무접촉 · 보안 경계 변경은 설계대로 1줄 · 실호출 341/341 · 새 검사 6건이 진짜로 가르는 검사임을 코드로 확인. Irene 결정 2건(§3-1 오너 줄 대조 · §3-2 브랜드 매입가 원가 반영)은 설계대로 빼고 끝냈다 — 답이 오면 작은 묶음으로.

## 1. 내가 확인한 것 (검증 규율 4조항 순서)

### ① 설계 범위 밖 변경 0 — diff 23파일 + 번역 8파일 전부 대조
| 설계 절 | 한 일 | 판정 |
|---|---|---|
| A-1 공용 조각 | `components/Invoices/TradeInvoiceActions.tsx` 신설 → 매장·오너·브랜드·푸드코트 보기 창 4곳이 같은 조각. 매장 창의 인라인 업로드 코드(ref·state·핸들러·버튼 3개) 제거 | 설계대로. 복제 0 |
| A-2 뜨는 조건 | `isExternalTradeInvoice` 하나(옛 이름 `canFixSupplierInvoiceTotal` 유지) · 올리기만 발주 draft/cancelled 제외 | 설계대로 |
| A-3 다시 올리기 | 파일 있으면 «보기»+«다시 올리기», 확인창 1회, 서버 무변경, 대조·총액 기록 안 지움 | 설계대로. A1 검사가 «파일만 바뀌고 `invoice_reconciled_at`·`invoice_total` 그대로» 를 DB 로 확인 |
| A-4 스코프 = 발주 주인 | `tradeInvoiceScopeQS(inv)` 한 함수 — `purchaseOrderEntityType/Id` 를 올리기·대조 화면 이동·총액 수정 셋 다에 붙임. 서버 칸 1개씩 3곳(attach camel · to-pay 는 attach 경유 · owner snake + `purchase_order_status`) | 설계대로. **새 DB 칸 0 · 마이그 0**(SELECT 에 이미 있는 `entity_id`·`status`) |
| A-5 대조 화면 | `InvoiceReconcilePage` fetch 는 정확히 2개(338·571행), 둘 다 `scopeQS` 붙음. 쿼리 없으면 옛 길 그대로 | 설계대로 |
| A-6 오너 올리기 | `OWNER_ACTING_ROUTES` 에 `POST …/upload-invoice` 1줄 + 주석. 오너 창은 `allowLineReconcile={false}` 로 «대조하기» 숨김 | 설계대로. §3-1 답 전까지 플래그 하나로 닫혀 있음 |
| A-7 하지 않는 것 | 발주 목록·상세 버튼 무변경(상세는 C-2 ② 딥링크 `?id=`→`?invoice=` 1글자만) · 결제 버튼 추가 없음 · Staff 권한 무변경 | 지킴 |
| A-8 i18n | `settings:invoicesPage.tradeActions.*` 7키 × 4언어 + `purchaseOrders:list.reimburse.effectNoDrawer` × 4언어 = 44줄. `i18n:verify` Errors 0 | 통과 |
| C-1 #1 수령 문제분 | `/receive` 안에 `recordDiscrepancy` 클로저(품목 루프 안, `item` 확정 뒤) — 재료 줄·재고아이템 줄이 같은 블록. 재고 반영은 정상분만(그대로) | 설계대로. 레시피 없는 프로덕트 줄은 설계 범위 밖 → 그대로(§4 기록) |
| C-1 #5 브랜드 제안 | `brandStockItemSuggestions` — `ProductIngredient`(owner = `Brand.owner_id`, 활성, min_stock>0, 현재<min) · 행에 `product_ingredient_id` · 화면 제안 패널이 서버 묶음 모양을 풀어 읽음 · Create PO·재고 화면 일괄 발주가 `product_ingredient_id` 로 보냄 | 설계대로. 묶음 규칙(min×1.5−현재·우선 판매처)은 매장 분기와 같음 |
| C-1 #6 카트 단일 소스 | `utils/poCart.ts`(저장 키·줄 키·`hydratePoCart`) — 재고 화면·발주 화면 같은 함수. 발주 화면은 열릴 때 판매처 빈 줄 채우고 같은 키 합침. **착수 전 dev 재현 완료**(수정 전 «Cart (1)» 보이지 않음 → 수정 후 보임·초안 생성) | 설계대로 |
| C-2 | ① `?items=` 프리필(진입당 1회) ② 딥링크 `?invoice=` 통일 + 오너·브랜드·푸드코트 화면 훅 `useInvoiceDeepLink`(경로 표 `invoiceListPath` 4역할 모두 맞음) #9 드로어 문구 매장만(`entity_type` 칸 목록 행에 있음 확인) #8 StockAlert 브랜드 칸 없음 → 기록만 | 설계대로 |

설계에 없는 것: 없음. 설계가 «하지 않는다»고 한 것을 한 것: 없음.

### ② 가드 스크립트 (내가 직접 실행)
- `check-print-guard` **8/8 변경 없음** — 🔒 인쇄·KDS 보호파일 무접촉.
- `check-design-guard` **신규 위반 0**(합계 299 / baseline 295 는 기존 부채 집계 차이, 이 diff 신규 0). 조각은 공용 `Button`·`Modal`·`ModalButton` 만 씀(`ConfirmModal` 공용 조각은 저장소에 없음 → `Modal` 확인창이 맞는 선택).
- `check-sensitive-diff` **게이트 대상 ⑤ 보안 경계 = `buyerScope.js`** — 이 diff 의 보안 변경은 위 A-6 **1줄**뿐. (출력에 함께 뜨는 ③ 모델 21건·`server.js` 는 **운영 스냅샷 대비** 이전 커밋들 — 이번 작업트리 변경이 아님. 배포 때 전체 게이트에서 다시 본다.)
- `npm run i18n:verify` 통과.

### ③ 실호출·실브라우저
- **health-check 전체 `--quiet` → 341/341 통과**(내 실행). 새 묶음 `invoice-actions` 6/6 · 기존 `invoice-total-fix` 4/4(T2 «오너 줄 대조 403 OWNER_TOTAL_ONLY» 그대로 — §3-1 답 전이라 **맞는 상태**).
- **새 검사 6건이 «항상 통과하는 검사»가 아님을 코드로 확인**: A1 은 `row.purchaseOrderEntityId === brand_id` 와 DB `external_invoice_url`/`invoice_reconciled_at`/`invoice_total` 값을 단언 · A2 는 쿼리없음 403 **AND** 소유매장 200 **AND** DB 파일 URL 일치 · A3 은 404/200/403 셋 · C1 은 `purchase_order_returns` 1행(`product_ingredient_id`·auto_generated·receive_damage)+줄 short+재고 13(=10+3)+partial_received · C5 는 `product_ingredient_id` 있는 행 + 공유재료 섞임 0. 팀원 고장주입 3종(pm2 재시작 뒤 — ①OWNER_ACTING 줄 제거→A2 ✗ ②재고아이템 recordDiscrepancy 제거→C1 ✗ ③attach 칸 제거→A1 ✗, 원복 6/6)은 이 단언 구조와 맞아 **반증 성립**으로 인정.
- 보안 경계 실측(코드): 오너가 쿼리로 넘긴 매장은 `RestaurantManager ownership` 으로 확인하고, 그 뒤 라우트의 `checkPOOwnership(po, req)` 가 **발주 주인 = 전환된 실체**를 또 확인(`po.entity_type/entity_id === req.buyerEntity`) → 소유 매장 A 자격으로 소유 매장 B 의 발주를 부르면 404. 매장 관리자·직원·푸드코트·브랜드 매니저는 쿼리를 **무시**(자기 실체) → 네 역할이 같은 쿼리를 붙여도 새는 길 없음. 둘째 브랜드는 `Brand.owner_id` 확인. System Admin 은 기존 override 그대로.
- 실브라우저(팀원, 새 번들): 4역할 클릭 흐름 50/50 · pageerror 0 · 시험 파일 16개 정리. `verify-all --full` 23/24 — 유일한 ✗ 는 `deploy-ready`(배포 기록·SW 버전) = **배포 직전 항목이라 지금은 당연히 ✗**. mount sweep 8역할 크래시 0 · 타입 기준선 신규 0.
- 개발서버 번들 확인(내 실측): `dev-frontend-build/index.html` 03:25 · 청크 `4299.28394cdc.chunk.js` 에 «Re-upload invoice» 포함 → 서빙 중인 번들이 새 코드.

### ④ 배포 안전성
- 마이그 0 · ENUM 0 · 새 라우트 0 · 새 공개 라우트 0. 되돌리기: 프론트는 이전 번들, 백엔드는 이 7파일 되돌리면 끝(데이터 모양 변화 없음).
- **SW 버전 미상승**(`sw.js` `5.89-kiosk-receipt-20261007`, 배포 스크립트가 자동으로 올리지 않음) → §5 조건.

## 2. 설계와 다르지만 허용하는 것 (2건 — 둘 다 더 안전한 쪽)
- C-1 #5 «owner_user_id = 그 BG» 를 `Brand.owner_id` 로 풀었다 — 브랜드 매니저가 불러도 **브랜드 소유자**의 재고아이템을 본다(브랜드 범위 = 소유 규칙과 같음). 맞다.
- A-2 «올리기는 draft·cancelled 제외» 는 화면 조건만이고 서버 `upload-invoice` 엔 상태 검사가 없다 — 설계도 화면 조건으로 적었고, 파일 붙이기는 되돌릴 수 있는 일이라 서버 추가 불필요. 그대로 둔다.

## 3. Irene 결정 대기 2건 — 설계 §3 그대로 (이 판정이 바꾸지 않음)
- **§3-1 오너의 줄 단가 대조 허용(10-07 D3 번복)** — Fable 권고 **A안(허용)**. 지금은 오너 창 «대조하기» 숨김·서버 403 유지(T2 가 그걸 지킴). A안이면: `cost-reconciliation.js` OWNER_TOTAL_ONLY 게이트 제거 · App.tsx 대조 화면 라우트에 Restaurant Owner · 오너 창 플래그 제거 · T2 기대 반전 → 작은 묶음 + Fable 검증 1회(게이트 대상: 권한).
- **§3-2 브랜드 매입가 → 재고아이템 원가 자동 반영** — Fable 권고 **매장과 같게**. 착수 세션이 원가가 어디까지 흘러가는지 1회 실측(§8-4 식) 뒤 `unit_cost` 쓰기+로그.

## 4. 남은 것 — 기록만 (이번 범위 밖, 고장 아님)
- `/receive` 의 **레시피 없는 프로덕트 줄**(`product_id`/`brand_product_id`)은 문제분을 여전히 기록 없이 버린다(설계 C-1 #1 범위 = 재고아이템 줄). 다음 발주 묶음 때 같은 `recordDiscrepancy` 를 한 줄 더 부르면 끝.
- `StockAlert` 에 브랜드 칸 없음 → 브랜드 수령 뒤 재고 알림 해제 없음(설계 #8 «없으면 기록만»).
- 다브랜드 BG 발주 화면 전체 스코프(#7) · 브랜드·푸드코트 창 결제 버튼 · Staff 청구서 버튼 권한 — 설계 §7 그대로 별도.
- `receive` 의 `lastDiscrepancyReason` 변수는 선언·대입만 있고 읽는 곳이 없다(이전부터, 이번 변경 아님).

## 5. 운영 배포(`/배포`) 전 조건 — Irene 지시 때 팀원이 한다
1. **SW 버전 1회 올리고 빌드 1회**(`sw.js` `SW_VERSION`) — 안 올리면 매장 브라우저가 옛 청크를 들고 있다가 깨진다(메모리 «SW 캐시 옛 번들»). `check-deploy-ready` 가 이걸 막고 있으니 통과 뒤 `verify-all` 재확인. 그 빌드 뒤 코드가 더 바뀌면 마커가 죽는다 — **SW 올리기 외엔 손대지 않는다.**
2. 문서는 **배포 뒤**(게이트 지문): `docs/PURCHASE_ORDER_SYSTEM.md` §8-8 신설·§4 브랜드 비교·§8-5 백로그·§8-7 D3(3-1 답대로) · `RESTAURANT_OWNER_PLAN.md`·`SUPPLIER_CONTRACT_SYSTEM.md` 403 문구.
- 덧붙임(게이트 장치 자체): `.claude/.fable-gate-skip` 이 **10-08 02:26 부터 남아 있어** 오늘 이 지문으로 skip 기록 3번(`fable-gate-skips.log` 03:30·03:43·03:51)이 찍혔다 — 훅이 막지 않고 통과시키고 있었다는 뜻. 이 판정 마커가 찍힌 뒤 **skip 파일을 지워** 훅이 다시 살게 할 것(팀원). 우회 기록은 로그에 남아 있다.

## 6. 마커
PASS → `node dev-backend/scripts/fable-gate.js pass --note "…"` 를 이 파일 저장 뒤 Fable 이 직접 찍음(지문 = 현재 작업트리).
