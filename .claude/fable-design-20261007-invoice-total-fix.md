# Fable 판정 — 청구서에서 총액 수정 + 수정 이력 (2026-10-07)

> Irene 원문: «토탈금액 안맞으면 수정하는 것도 인보이스에서 가능해야지. 레스토랑관리자도, 오너도.» «그리고 수정한 사람 이름이랑 시간 남겨서 히스토리 볼 수 있어야 하고»
> **Irene 승인 2026-10-07: «승인. fable 권고대로 진행해»** — §5 4항목 모두 Fable 권고대로.
> 이 파일은 Fable 보고 원문을 팀원이 그대로 옮긴 것이다.

## 0. 한 줄 결론
Irene 이 원하는 두 가지(①청구서 화면에서 총액 바로 고치기 — 매장 관리자·오너 둘 다 ②누가 언제 고쳤는지 이력)는 **새 저장 경로를 만들지 않고** 된다. 총액 고치기는 이미 있는 «총액만 대조»(발주 reconcile, total_only) 한 손을 **청구서 상세의 작은 창에서 부르게** 하고, 이력은 청구서에 이미 있는 «수정 이력» 칸(modification_history — 브랜드·푸드코트 청구서가 쓰는 그 칸)에 **대조가 총액을 바꿀 때마다 한 줄씩 적는다.** 오너는 소유 매장 자격으로 **총액만** 고칠 수 있게 문을 하나 열고(줄 단가 대조·원가 반영은 매장 관리자 전용 유지), 새 DB 칸·마이그레이션은 0.

## 1. 실측으로 확정한 사실 (코드 읽기 기준, 운영 쓰기 0)
- **총액을 맞추는 길은 하나뿐**: `POST /api/purchase-orders/:id/reconcile` (dev-backend/routes/cost-reconciliation.js:161). `total_only:true` 면 줄 단가를 전부 비우고 발주에 청구 총액만 적은 뒤, 외부 공급업체 건이면 `services/reconcileInvoiceSync.js` 가 우리 청구서에 «Supplier invoice difference» 한 줄을 붙여 **청구서 총액 = 적은 총액 = 낼 금액**이 된다. 이미 결제된 건도 2026-09-30 Irene 선택으로 허용(allowPaid: 낸 금액도 같이 맞추고, 현금결제면 드로어에 차액 한 줄).
- **이력이 안 남는 자리**: reconcileInvoiceSync 는 청구서 총액을 바꾸면서 `modification_history` 에 아무것도 안 쓴다(grep 0건). 발주 쪽 `invoice_reconciled_by_user_id` 는 **마지막 1명만 덮어쓴다.** 그래서 지금은 «누가 언제 얼마에서 얼마로» 를 볼 수 없다.
- **이력 칸은 이미 있다**: `invoices.modification_history`(JSON 배열: modified_at·modified_by·modified_by_name·changes·reason) + `is_modified`. 청구서 직접 수정(`PUT /api/invoices/:id`, invoices-crud.js:296)이 쓰고, 브랜드·푸드코트·관리자 청구서 보기 창만 그린다. 매장 목록 API(`GET /invoices/restaurant/:id`, `/invoices/to-pay`)는 이미 `modificationHistory` 를 내려주는데 **매장 화면이 안 그리고**, 오너 목록 API(`routes/owner.js /invoices·/invoices/to-pay`)는 **아예 안 내려준다.**
- **오너 권한**: `middleware/buyerScope.js OWNER_ACTING_ROUTES` 에 reconcile 이 없어 오너는 403(2026-10-04 내 판정 «원가대조는 403»). 화면 라우트 `/pos/purchase-orders/:id/reconcile` 도 오너 역할이 빠져 있다. 반면 오너는 같은 청구서에 «Mark as paid»(mark-paid-external, `checkPaymentPermission` 이 소유 매장 확인)는 이미 된다 — **돈을 냈다고 적는 건 되는데 얼마인지 고치는 건 안 되는** 상태.
- **바꿀 수 있는 청구서는 외부 공급업체 건뿐**이다. 가입 공급업체·브랜드·푸드코트 청구서는 그쪽이 발행 주체라 reconcileInvoiceSync 가 «고치지 않습니다» 사유를 돌려주고 낼 금액도 발주 총액으로 떨어진다(payableFrom). 외부 공급업체는 정산서(SOA)도 없어 자식 청구서 연쇄(soaChildSync) 걱정이 없다.
- **작은 결함 1개(범위 안)**: cost-reconciliation.js 의 `changed_by_name = req.user.name || req.user.email` — `req.user` 에 `name` 칸이 없다(auth.js:95 는 `full_name`). 지금 원가 변경 로그에 이름 대신 **이메일**이 적힌다. 이번에 같은 파일 안에서 `full_name || email` 로 바로잡는다.
- 매장 관리자 직접 수정 `PUT /api/invoices/:id` 는 매장 관리자에게 열려 있지만 **이 길로 총액을 고치면 발주의 청구 총액·낼 금액과 갈라진다.** 이번 기능은 그 길을 쓰지 않는다(단일 소스 = reconcile).

## 2. 결정 (설계)
**D1. 총액 수정 = 기존 «총액만 대조» 를 청구서 상세의 작은 창으로.** 매장 관리자·오너가 같은 조각(ExternalInvoicePayAction 과 같은 방식의 공용 컴포넌트)을 쓴다. 새 API 없음.
**D2. 대상 = 거래 청구서 + 연결 발주 있음 + 발행자가 외부 공급업체 + 취소 아님.** 결제 완료 건도 허용(09-30 규칙 그대로). 가입 판매자 청구서엔 버튼 없음(그쪽이 발행 주체).
**D3. 오너 = 총액만.** OWNER_ACTING_ROUTES 에 `POST /api/purchase-orders/:id/reconcile` 을 더하고, 라우트 안에서 `req.buyerIsOwnerView && !total_only` 면 403(코드 `OWNER_TOTAL_ONLY`). 줄 단가 대조·원가 전파·소급은 매장 관리자 몫 유지 — 2026-10-04 판정 «원가대조 403» 을 **총액만 예외**로 좁혀 갱신한다. 화면 대조 페이지 라우트는 오너에게 안 연다(창만 쓴다).
**D4. 이력 = 청구서 modification_history 에 대조가 적는다.** reconcileInvoiceSync 가 총액을 바꾼 뒤(finalize 후) 이전 총액 ≠ 새 총액이면 한 줄 push: `{modified_at, modified_by, modified_by_name, changes:{total_amount:{from,to}}, reason:'Supplier invoice total — PO <번호> · inv <공급업체 인보이스 번호> · total only|line reconcile' + (메모), source:'reconcile'}` 그리고 `is_modified=true`. 총액이 그대로면 안 적는다(잡음 금지). 메모는 선택(서버 body.note ≤255 sanitize).
**D5. 이력 표시 = 매장·오너 청구서 상세 창 둘 다.** 공용 조각 `InvoiceModificationHistory`(시각은 매장 타임존 formatDateTime · 이름 · 금액 from→to · 사유). 브랜드 창은 이번에 안 건드린다.
**D6. 줄 대조 기록이 있는 발주에서 총액 수정 시 확인창** «줄 단가 N개 기록이 지워지고 원가엔 반영되지 않습니다» (§8-6 A-3 그대로). N 은 목록이 `reconcile_invoiced_lines` 를 내려줘서 안다(새 칸 아님, 발주 목록 SQL 과 같은 집계).
**D7. 결제 완료 건 안내**: 창에 «이미 결제된 청구서 — 낸 금액도 같이 맞춰집니다. 현금결제면 열린 시프트 드로어에 차액 한 줄» 표시, 저장 뒤 서버 `paid_adjustment.reason`(no_open_shift 등)을 그대로 번역해 보여준다.

## 3. 구현 범위 (팀원 바로 착수)
### 백엔드 (🔒 보호파일 무접촉)
1. `dev-backend/middleware/buyerScope.js` — OWNER_ACTING_ROUTES 에 `['POST', /^\/api\/purchase-orders\/\d+\/reconcile$/]` 추가 + 주석(2026-10-07 Fable 판정 «오너 총액만»).
2. `dev-backend/routes/cost-reconciliation.js` POST — 소유권 검사 직후 `if (req.buyerIsOwnerView && !totalOnly) return 403 {code:'OWNER_TOTAL_ONLY'}`; actor 이름 `req.user.full_name || req.user.email`; `body.note` 받기(sanitize·255); `syncTradeInvoiceFromReconcile(po.id, { actorId, actorName, allowPaid, totalOnly, note })`.
3. `dev-backend/services/reconcileInvoiceSync.js` — 동기화 전 `prevTotal` 보관 → finalize·reload 뒤 총액이 바뀌었으면 modification_history push + is_modified(마지막 update 에 paid_amount 와 함께).
4. `dev-backend/services/invoicePurchaseOrderAttach.js` — SELECT 에 `(SELECT SUM(invoiced_unit_price IS NOT NULL) FROM purchase_order_items i WHERE i.purchase_order_id = purchase_orders.id) AS reconcile_invoiced_lines` 추가, `purchaseOrderFieldsCamel` 에 `reconcileInvoicedLines`.
5. `dev-backend/routes/owner.js attachOwnerInvoicePurchaseOrders` — `reconcile_invoiced_lines`, `modification_history`, `is_modified` 내려주기. 매장 목록(invoices-list.js)은 snake_case 쪽에 `reconcile_invoiced_lines` 만 더한다(modificationHistory 는 이미 있음).
### 프론트
6. 신규 `dev-frontend/src/components/Invoices/SupplierInvoiceTotalFix.tsx` — 공용 Modal·Button 사용(로컬 styled 금지). 내용: 발주 금액 · 현재 청구서 총액 · [공급업체 인보이스 총액] 입력(기본값 = 적혀 있던 청구 총액 또는 현재 총액) · 인보이스 번호/날짜(있으면 프리필) · 메모(선택) · 갭 한 줄 «발주 RM X → 청구 RM Y = +RM Z»(utils/reconcileGap.ts 의 formatGap/gapColor 재사용) · D6/D7 안내. 저장 = `POST /api/purchase-orders/{poId}/reconcile` body `{total_only:true, invoice:{total, number, date}, note}` — 오너면 URL 뒤에 `?entity_type=restaurant&entity_id={invoice.restaurantId}`(utils/ownerPoScope 의 규칙, 세션 저장값 말고 **그 청구서의 매장 id**). 응답의 `invoice_sync.synced/reason`·`paid_adjustment` 를 사람 말로.
7. 신규 `dev-frontend/src/components/Invoices/InvoiceModificationHistory.tsx` — 목록 한 줄 = 시각(매장 타임존) · 이름 · RM from → to · 사유.
8. `pages/Restaurant/InvoicesPage.tsx` 상세 창 footer — «총액 수정» 버튼(D2 조건) 추가, «인보이스와 대조하기» 유지. 본문에 이력 조각. 매핑에 `modificationHistory`·`isModified`·`reconcileInvoicedLines`.
9. `pages/Owner/OwnerInvoicesPage.tsx` — 같은 버튼·같은 이력 조각(오너 모드). 매핑 추가. 저장 뒤 두 탭 목록 새로고침(fetchInvoicesToPay·fetchAllInvoices).
10. i18n `settings:invoicesPage.*` 4개 언어(en·ko·zh·ms) + `npm run i18n:verify`. SW 버전은 프론트 변경이 다 끝난 뒤 마지막에 1회.
### 문서
11. `docs/PURCHASE_ORDER_SYSTEM.md` 에 **§8-7** «청구서에서 총액 수정 + 수정 이력 (2026-10-07 Fable 판정)» 추가(이 판정 요지·절단면). `docs/RESTAURANT_OWNER_PLAN.md` 155행 근처와 `SUPPLIER_CONTRACT_SYSTEM.md` 949행의 «수령·결제·원가대조 403» 문구에 «총액만 예외» 한 줄 갱신. 기록은 배포 뒤(게이트 지문).

## 4. 검증 기준 (기계 게이트 + 반증)
health-check 추가(기존 `cash` 픽스처 `makeExternalPoReceived`·오너 픽스처(users INSERT @example.com + restaurant_managers ownership 38 + switch-context, health-check.js:480·507 패턴) 재사용):
- **T1 매장 관리자 이력**: 외부 발주 수령(총 42) → total_only 45 → 청구서 total 45 · modification_history 1건(from 42 → to 45, modified_by_name = 관리자 full_name, reason 에 PO 번호) → 다시 45 → 이력 **그대로 1건** → 40 → 2건.
- **T2 오너 총액만**: 오너(restaurant_id NULL·38 소유) `POST …/reconcile?entity_type=restaurant&entity_id=38` total_only → 200·청구서 총액 변경·이력 modified_by_name = 오너 이름; 같은 오너가 줄 대조(lines) 보내면 **403 OWNER_TOTAL_ONLY**; 남의 매장 id → 403; `GET /owner/invoices` 응답에 `modification_history`·`reconcile_invoiced_lines` 있음.
- **T3 가입 판매자 무접촉**: 가입 공급업체 발주 total_only → 200 이지만 `invoice_sync.synced=false`, 청구서 총액·이력 변화 0.
- **T4 결제 완료 건**: 기존 «결제된 현금 발주에 총액만 확정» 테스트가 계속 통과 + 그 청구서 이력에 1줄.
- **고장주입 3종(의무)**: ①이력 push 제거 → T1 실패 ②오너 total_only 게이트 제거 → T2(403 기대) 실패 ③OWNER_ACTING_ROUTES 추가 제거 → T2 200 기대가 403 으로 실패. 주입은 pm2 restart 뒤, 보고에 재시작 여부.
- 프론트: 코드 확정 → **빌드 1회** → `verify-all --full` 1회(mount sweep). 실브라우저 클릭 흐름 1회: 매장 관리자 청구서 상세 → 총액 수정 → 목록 총액·이력 보임 / 오너 to_pay 탭 → 같은 흐름 / 가입 판매자 청구서엔 버튼 없음.
- `check-print-guard` 0건 · `check-design-guard` · `check-sensitive-diff`(buyerScope = 보안 경계라 **대상으로 찍힌다** → 구현 뒤 **게이트 판정 1회 = 이 사안 2회차**, 그 뒤 마커).
- `check-sensitive-diff` 전 git status 확인 — 지금 미커밋 변경(오너 «올린 인보이스 보기» 배포분)이 있으니 덮어쓰지 말고 그 위에 쌓는다.

## 5. Irene 확인 (2026-10-07 «승인. fable 권고대로 진행해» — 전부 권고대로 확정)
1. 고칠 수 있는 청구서 = 외부 공급업체 건만. (확정)
2. 오너는 총액만, 줄 단가 대조(원가 반영)는 매장 관리자만. (확정)
3. 이미 결제된 청구서도 총액 수정 허용. (확정)
4. 사유(메모)는 선택 입력. (확정)

승인되면 팀원이 §3 순서대로 구현 → §4 게이트 → Fable 게이트 판정 1회 → Irene «/배포» 지시 때만 배포.
