# Fable 설계 판정 (2026-10-08) — 판매자 주문 «분할 발송» (일부 오늘 · 나머지 내일)

> 의뢰 자료: `/home/irene/.claude/jobs/7ba2c8b8/tmp/fable-input-partial-ship.md` (Irene 원문 + 팀원 실측). 
> 호출 조건: 공용 기준 ① **설계**(여러 화면이 같은 규칙을 나눔 · 재고 차감 길이 바뀜). 이 사안의 Fable 호출은 설계 1(이 문서) + 게이트 1 로 끝낸다.
> 코드는 읽기만 했다(변경 0). 팀원은 Ⅰ 을 가공 없이 Irene 에게 전달한다.

---

## Ⅰ. Irene 에게 올리는 보고문

### 한 줄 결론
**지금은 못 나눕니다. 주문을 쪼개지 말고, «보내기» 를 여러 번 누를 수 있게 바꾸면 됩니다 — 품목마다 «보낸 양» 칸을 하나 두고, 받는 쪽이 이미 쓰고 있는 «나눠서 받기» 와 똑같은 모양으로.**

### 지금 상태 (실측)
- 판매자(브랜드·공급업체·푸드코트) 화면의 «보내기» 는 **주문당 한 번**만 됩니다. 누르면 주문 전체가 «배송 중» 이 되고, 판매자 재고도 **주문 수량 전부**가 한 번에 빠집니다. 두 번째 누르면 «이미 보냄» 으로 거부됩니다.
- 그래서 «일부는 오늘, 나머지는 내일» 은 지금 길이 없습니다. 유일한 우회는 «품목 수정으로 수량을 줄여 보내고, 매장이 나머지를 다시 주문» 인데 — 원래 주문과 연결이 끊기고 매장이 두 번 일합니다.
- 반대쪽(받는 매장)은 이미 **품목별로 나눠서 받기**가 됩니다(«일부 받음» 상태 · 다음 날 나머지 받기 · 품목마다 «받은 양» 칸). 보내는 쪽만 없는 겁니다.
- 운영 실사용: 브랜드 판매자는 «보내기» 를 실제로 씁니다(받은 주문 18건 전부 보내기 기록 있음). 공급업체 판매자는 «보내기» 를 안 쓰고 매장이 바로 «받음» 처리합니다(47건 전부). 그러니 이 기능은 **브랜드(GIT) 쪽이 주로 쓰게 됩니다.**

### 어떻게 바꾸나 (Fable 설계)
1. **품목마다 «보낸 양» 칸 추가** — 받는 쪽 «받은 양» 칸의 거울. 주문·표를 새로 만들지 않습니다(새 목록 금지 원칙 그대로).
2. **«보내기» 창에 품목 표** — 품목 · 주문량 · 이미 보냄 · 남음 · **이번에 보낼 양**(기본값 = 남은 전부). 그대로 확인 누르면 지금처럼 한 번에 전부, 숫자를 줄이면 그만큼만. 운송사·송장번호는 **발송마다** 따로 적습니다.
3. **재고는 보낸 양만큼만 빠집니다.** 오늘 3개 보내면 3개, 내일 2개 보내면 2개. 합이 주문량을 넘기면 거부(«남은 양보다 많습니다»). 다 보낸 뒤 또 누르면 지금처럼 «이미 보냄».
4. **주문 상태**: 첫 발송 때 «배송 중» 이 되고(지금과 같음), 아직 남은 품목이 있으면 그 옆에 **«일부 발송 · N품목 남음»** 표시 + **«나머지 보내기»** 단추. «배송 완료» 단추는 **다 보낸 뒤에만** 뜹니다(일부만 갔는데 «완료» 라고 하지 않게).
5. **받는 매장 화면**: 품목마다 «보냄 3 / 주문 5» 가 보이고, 배송 이력에 발송 건마다 «무엇을 몇 개 · 어느 운송사 · 송장번호» 가 남습니다. 메일(«배송 출발») 도 발송마다 가며 **이번 발송 품목과 남은 품목**을 적습니다.
6. **받는 쪽은 바뀌는 것 없음** — 지금처럼 나눠서 받고, 청구서·정산서 규칙(확정 주문 전부 · 받은 양 청구)도 그대로.
7. 기존 주문 데이터: 이미 «보냄» 처리된 주문은 «보낸 양 = 주문량» 으로 한 번 채워 둡니다(그래야 «다 보낸 주문» 으로 올바르게 보이고, 다시 못 보냄).

### 안 하는 것 (이번 범위 밖 — 이유 포함)
- **주문을 둘로 쪼개기(원주문 + 잔여 주문)**: 돈 약속(주문서) 하나가 둘이 되면 오너 승인·청구서·정산서·결제가 전부 둘로 갈립니다. 받는 쪽도 그렇게 안 했습니다. 기각.
- **새 상태 «일부 배송» 만들기**: 상태 목록을 읽는 자리가 코드에 열 몇 군데(재고 «들어올 양» 계산·정산 대상·운송사 연동·화면 색/단계 등) 라, 하나라도 빠뜨리면 조용히 틀립니다(예: 자동 발주 제안이 «들어올 양» 을 못 세어 또 주문 제안). 품목 «보낸 양» 으로 다 알 수 있으니 상태는 안 늘립니다.
- **일부 보낸 뒤 «나머지는 못 보냄(품절)» 처리**: 이번 질문(«다음 날 보낼 때»)과 다른 일이고, 총액 줄이기·청구서 정정·매장 통지가 따라오는 돈 문제라 **별도 소묶음**으로. 지금은 «발송 전» 에만 품목 수정이 되는 규칙 그대로 둡니다.
- 지난 발송 건의 송장번호를 **개별로** 고치기: 지금처럼 «최근 발송 것» 만 고칩니다(필요해지면 그때).

### Irene 정할 것 (Fable 권고 첨부)
1. **«배송 완료» 단추를 다 보낸 뒤에만 보이게** 하는 것 — 권고: **그렇게**. 일부만 갔는데 주문 전체를 «배송 완료» 로 두면 매장이 «다 왔다» 로 읽습니다. 매장은 어차피 품목별로 «받음» 을 따로 누릅니다.
2. **«나머지 못 보냄(품절)» 을 이번에 같이 넣을지** — 권고: **다음 묶음**. 돈이 걸린 변경이라 따로 설계·게이트.
3. 위 둘에 이의 없으면 «그대로» 한 마디면 팀원이 착수합니다. 끝나면 Fable 게이트 1회 뒤 배포 여부를 다시 여쭙니다(운영 배포는 Irene 지시 때만).

### 확인할 곳 (구현 뒤 — 지금은 없음)
- 개발서버 브랜드 «들어온 주문» 에서 주문 하나를 골라 «보내기» → 품목 표에서 한 줄만 수량을 줄여 보내기 → 목록에 «일부 발송 · N품목 남음» → «나머지 보내기» → «배송 완료» 단추가 그제야 보이는지.
- 같은 주문을 매장 발주 상세에서 열어 품목에 «보냄 x / 주문 y» 와 배송 이력 2건이 보이는지.

---

## Ⅱ. 팀원 지시 (실행 · 순서 고정 · 인쇄·KDS 보호파일 0 접촉)

### 0. 원칙 한 줄
**발송은 수령의 거울이다.** 수령 = `quantity_received` 누적 + `tracking_info.events` + 상태. 발송 = `quantity_shipped` 누적 + `tracking_info.events`(발송 건마다 품목·운송 정보) + 기존 상태. 새 테이블·새 ENUM·새 차감 경로 **없음**. 재고는 `services/stockLedger.record`(BG/FG) · 기존 supplier 분기 그대로, **수량 변수만** 바뀐다.

### 1. 데이터
- `models/PurchaseOrderItem.js`: `quantity_shipped: DECIMAL(10,2) defaultValue 0, comment '판매자가 보낸 양 누적(주문 단위, 환산 전) — quantity_received 의 거울'`.
- 마이그 `scripts/migrate-po-item-quantity-shipped.js` (멱등 · `migrations.registry.json` 에 `deploy`):
  1. 컬럼 없으면 ADD.
  2. **백필**: `UPDATE purchase_order_items i JOIN purchase_orders po ON po.id=i.purchase_order_id SET i.quantity_shipped = i.quantity_ordered WHERE po.shipped_at IS NOT NULL AND i.quantity_shipped = 0` — 옛 «보내기» 는 전량 차감이었으므로 사실과 같다. 영향 행 수를 출력.
  3. 운영 배포 sync 는 안전모드라 칸을 안 넣는다(09-10 기억) — 반드시 전용 마이그.

### 2. `POST /api/seller-orders/:id/ship` (routes/seller-orders.js:615~) — 한 라우트 안에서
- 본문: 기존 `tracking_info` + **선택** `items: [{ item_id, quantity }]`. `items` 없음 = **남은 양 전부**(하위 호환 — 기존 호출·health-check 전부 그대로 동작).
- 트랜잭션 안(PO 행 `LOCK.UPDATE` 는 지금 그대로 — 동시 발송 2건이 와도 둘째가 잠금 뒤 «남은 양» 을 다시 계산한다. 이 잠금이 이중 차감의 방어선이 된다):
  1. 줄 전부 로드. 서비스 줄(`utils/orderFulfillment.serviceLineIdsOf`)은 배송 대상 아님 → 남은 양 0 취급(수령 쪽과 같은 판정 함수).
  2. `remaining(it) = quantity_ordered − quantity_shipped` (round2, ≥0).
  3. **레거시 가드**: `locked.shipped_at` 있고 Σ quantity_shipped == 0 → 옛 전량 출고(백필 전 창) → 409 `ALREADY_SHIPPED`. 백필 뒤엔 자연히 아래 ④ 가 잡는다.
  4. 계획 `plan: Map<item_id, qty>` — items 없으면 각 줄 remaining; 있으면 각 줄 `0 < qty ≤ remaining + 0.001`, 모르는 item_id → 400, 어느 줄이든 초과 → 400 `EXCEEDS_REMAINING`(재고 무변동 — 트랜잭션 전 검증). Σ plan == 0 이고 Σ remaining == 0 → 409 `ALREADY_SHIPPED`(기존 코드·메시지 유지). Σ plan == 0 인데 remaining 있음 → 400 `NOTHING_TO_SHIP`.
  5. 재고 차감 3분기(supplier 671~ · brand 701~ · foodcourt 782~)에서 `parseFloat(it.quantity_ordered)` **5곳 전부**를 `plan.get(it.id) || 0` 으로 바꾸고 0 이면 `continue`. 분기 구조·stockLedger 호출·메모 문구는 그대로(메모에 `(${q} of ${ordered})` 만 덧붙여도 됨).
  6. 줄 갱신: `quantity_shipped += qty` (같은 트랜잭션).
  7. 완료 판정 `fullyShipped = 모든 비서비스 줄 remaining == 0`.
  8. 헤더: `shipped_at` 은 **첫 발송 때만** 기록(이미 있으면 유지 — foodCostReport:120 «출고액 기간» · poNotifications `alreadyShipped` · 화면 «출고 필요» 배지가 전부 «첫 출고 시각/출고 유무» 로 읽는다). 상태는 지금 규칙 그대로(`confirmed` → `shipped`, 그 외 유지).
  9. 이벤트: `appendTrackingEvent(.., 'shipped', note, undefined, { shipment_no: n, items: [{item_id, quantity, description}], carrier_code, carrier_name, tracking_number, tracking_url, estimated_arrival, partial: !fullyShipped })` — `appendTrackingEvent` 의 5번째 인자(eventFields)를 쓴다(poRealtimeService.js:31, 이미 있음). 상위 `carrier_*/tracking_number` 는 **이번 발송 값으로 덮는다**(목록 칩·메일이 최근 발송을 보이게). note: `Out for delivery via X (N of M items)` / 전량이면 기존 문구.
  10. 응답 `data` 에 `fully_shipped`, `remaining_lines` 수를 더해 준다(화면이 재조회 없이 배지 결정).
- 메일(«Order Out for Delivery», 811~): 이번 발송 품목 표 + 남은 품목 표(`utils/poEmailItems.loadPoEmailItems` 모양 재사용). 전량이면 지금과 같은 본문.

### 3. 주변 라우트 (최소)
- `POST /:id/deliver` (918~): `status === 'shipped'` 에 더해 **비서비스 줄 remaining 전부 0** 이어야 함. 아니면 400 `NOT_FULLY_SHIPPED` «Some items have not been dispatched yet». (Irene 결정 1 — 권고대로일 때.)
- `POST /:id/amend` (1200~): 상태 가드(submitted·confirmed)가 이미 발송 뒤를 막는다. 방어 1줄 추가: `beforeRows.some(quantity_shipped > 0)` → 409 `ALREADY_SHIPPED`(ALREADY_RECEIVED 가드 바로 옆, 같은 모양).
- `PUT /:id/tracking` (970~): 변경 없음(최근 발송 값만 고친다 — 범위 밖 명시).
- `routes/purchase-orders-workflow.js:1027` 구매자 `mark-shipped`(외부 공급업체 전용): `shipped_at` 과 함께 줄 `quantity_shipped = quantity_ordered` 세팅 1줄 — 표시 일관성(외부 공급업체는 우리 재고와 무관하므로 차감 없음, 지금과 같음).
- 수령 라우트·`purchaseOrderReceive.js`·반품·청구서·SOA: **변경 0**. 수령은 지금처럼 보낸 양과 무관하게 받을 수 있다(공급업체 47건이 «보내기» 없이 받은 실사용 경로를 막으면 안 된다). 보낸 양은 **표시**만.
- GET 목록/상세(144~·466~): 줄 JSON 에 `quantity_shipped` 는 `toJSON` 으로 자동 포함. 헤더에 `remaining_lines`(비서비스 줄 중 remaining>0 수)를 붙인다 — `is_service_only` 옆, 같은 방식.

### 4. 화면
- `pages/IncomingOrders/IncomingOrdersView.tsx` (BG·FG·공급업체 공용 — `SupplierOrdersPage` 가 감싼다):
  - 보내기 모달(openShipModal/handleShip 902~): **품목 표** — 품명(판매자 상품명 우선, 기존 `seller_product_name`) · 주문량 · 이미 보냄 · 남음 · «이번 발송» 입력(기본 = 남음, 0 허용, 소수 허용 — 수령 창과 같은 입력 규칙). 서비스 줄은 «배송 없음» 으로 회색·입력 없음. 합계 검증(초과 → 빨강 + 확인 비활성 · 전부 0 → 비활성). 전 줄이 기본값이면 `items` 를 **보내지 않는다**(= 전량, 서버 하위호환 경로).
  - 상태가 `shipped`·`delivered`·`received`·`partial_received` 이고 `remaining_lines > 0` 이면: 상태 칩 아래 «Partially dispatched · N items remaining» 보조문(기존 «needsDispatch» 보조문과 같은 스타일 · 색 `#B45309`) + 단추 «Ship remaining»(= openShipModal, POST /ship). 이때 `isAmend` 판정(925)은 **remaining 이 0 일 때만** PUT /tracking 으로 — 지금은 상태만 보고 PUT 으로 가므로 반드시 바꾼다.
  - «Delivered» 단추(1438·1933)는 `remaining_lines === 0` 일 때만.
  - 상세 모달 품목 표: «Shipped x / y» 열(수령 쪽 표기와 같은 형식 `lineQtyText` 류 재사용).
  - 공용 컴포넌트 규칙(DataTable·Modal·ThemedButton) 그대로, 새 styled.table 금지(design-guard).
- `pages/PurchaseOrders/PurchaseOrderDetailPage.tsx`(구매자): 품목 표에 «Shipped» 열 1개(quantity_shipped, 0 이면 «—»). `DeliveryTimeline`(components/Inventory) 의 shipped 단계 시각은 **마지막 shipped 이벤트**를 이미 쓴다(stepTimeFor reverse-find) — 변경 없음. 이벤트 note 에 «N of M items» 가 들어오므로 추가 UI 없이 읽힌다. 과하게 꾸미지 않는다.
- i18n: 새 키(모달 열 제목 5 · 배지 1 · 단추 1 · 오류 2 · 구매자 열 1) 를 **4언어**(en→ko→zh→ms) 해당 namespace 전부. `npm run i18n:verify`.
- 발송마다 포장 목록(WhatsApp 공유 1979~)은 **이번 범위 밖**(필요하면 다음).

### 5. 문서
- `docs/PURCHASE_ORDER_SYSTEM.md` 에 절 1개 «판매자 분할 발송 (2026-10-08 Fable 설계)» — 원칙 한 줄(§0) · 칸·이벤트 모양 · 가드 4개 · 범위 밖 3개. 기존 문서에 추가, 새 파일 금지. `docs/SUPPLY_CHAIN_SPRINT_7.md` 비범위 표의 «Partial shipment → Sprint 8» 옆에 «→ 2026-10-08 설계·구현(PURCHASE_ORDER_SYSTEM.md §…)» 한 줄.
- `docs/TRADE_STRUCTURE.md` 는 **손대지 않는다** — 새 목록·새 경로가 없다(칸 1개는 수령 칸의 거울).

### 6. 증명 기준 (게이트 2회차에서 볼 것 — 미리 정함 · health-check `inventory` 계약으로 박는다)
| # | 계약 | 기대 |
|---|---|---|
| S1 | 주문 5 → `items:[{qty 3}]` 발송 | 200 · 판매자 재고 −3 · 장부 1줄(−3, refs.purchase_order_id) · `quantity_shipped=3` · 상태 shipped · shipped_at 기록 · 이벤트 1(partial:true, items) |
| S2 | 이어서 `items:[{qty 2}]` | 200 · 재고 누적 −5 · `quantity_shipped=5` · shipped_at **그대로**(첫 값) · 이벤트 2(partial:false) |
| S3 | 다시 발송(본문 없음) | 409 ALREADY_SHIPPED · 재고 변화 0 (기존 Q6 계약 5401~ 그대로 통과) |
| S4 | 남은 2 에 `qty 3` | 400 EXCEEDS_REMAINING · 재고 변화 0 · quantity_shipped 변화 0 |
| S5 | 일부 발송 상태에서 `/deliver` | 400 NOT_FULLY_SHIPPED · 전량 뒤 → 200 delivered |
| S6 | 일부 발송 상태에서 `/amend` | 409 ALREADY_SHIPPED(상태 가드 또는 줄 가드 — 둘 중 어느 쪽이 잡아도 됨, 응답 코드만 본다) |
| S7 | 구매자 `/receive` 는 보낸 양과 무관 | 보낸 0 인 주문도 지금처럼 수령 200(공급업체 실사용 경로 보존) |
| S8 | 동시 전량 발송 2건(Promise.all) | 200 정확히 1 · 다른 하나 409 · 재고 −5 한 번 |
| S9 | 백필 마이그 2회 실행 | 멱등 · 2회차 영향 행 0 · shipped_at 있는 옛 주문 줄 `quantity_shipped = quantity_ordered` |
| S10 | 고장주입 1종 | §2-④ 초과 검증을 빼면 S4 가 실패하는지(반증) — pm2 restart 뒤, 원복 뒤 전부 통과 |
- 그 밖: `verify-all --full` 1회(빌드 1회 뒤) · 실브라우저 클릭 흐름 1회(Ⅰ «확인할 곳» 두 줄 그대로) · print-guard 8/8 무접촉 · design-guard · i18n 4언어 · `check-sensitive-diff`(주문 무결성 분류가 뜨면 예상된 것 — 이 사안이 게이트 대상임).
- Fable 게이트 입력 파일에 **실측 숫자**(S1~S10 결과 · 운영 백필 예상 행 수 = 운영 `shipped_at IS NOT NULL` 발주의 줄 수)를 적는다.

### 7. 순서
① 모델+마이그 → ② ship 라우트 → ③ deliver/amend/mark-shipped 3줄 → ④ health-check 계약 S1~S9 → ⑤ 화면 전부 확정 → ⑥ i18n → ⑦ 빌드 1회 → ⑧ verify-all --full → ⑨ 고장주입 S10 → ⑩ 문서 → ⑪ 게이트 입력 파일 → Fable 게이트 호출. 설계와 다른 판단이 필요해지면 **멈추고** 게이트 입력 파일에 사실로 적는다(Fable 에게 지시하지 않는다).

---

## Ⅲ. 판정 근거 (짧게)
- **왜 주문 쪼개기가 아닌가**: `poAmend.js` 머리글의 원칙 «발주서는 구매자의 돈 약속» — 약속 하나를 둘로 가르면 오너 승인·`trade_invoice_id`·SOA(`BILLABLE_PO_STATUSES`)·결제(`payment_status`)가 전부 갈라진다. 수령 쪽도 쪼개지 않고 줄 누적으로 풀었다.
- **왜 새 상태가 아닌가**: 상태 집합을 읽는 자리 실측 — `utils/poStatuses.RECEIVABLE_STATUSES` · `inventory-core.js:110,413` · `product-ingredients.js:928`(중복 집합) · `soaScheduler.js:309` · `retroApplyPrice.js:25` · `purchase-cost-report.js:28` · `priceHistory.js:35` · `carriers.js:120` · `carrier-webhooks.js:50` · 프론트 `POStatus` 타입 3곳 · `StatusVariantMap` · `STAGES` · `DeliveryTimeline.STEP_ORDER` · i18n 4언어×3 namespace. 하나라도 빠지면 조용히 틀린다(예: `reorderMath` 들어올 양 누락 → 재주문 제안 중복). 줄의 `quantity_shipped` 로 같은 정보를 전부 낼 수 있다.
- **왜 shipped_at 은 첫 발송인가**: 읽는 세 곳(`foodCostReport.js:120` 출고액 기간 · `poNotifications.js:115` alreadyShipped · 화면 1363/1433 «출고 기록» 배지)이 전부 «출고가 있었나/언제 시작됐나» 를 묻는다. «다 보냈나» 는 줄에서 센다. (출고액 보고서가 분할 발송 PO 의 총액을 첫 발송 달에 통째로 잡는 근사는 기존과 같은 수준 — 범위 밖, 메모만.)
- **왜 이벤트 JSON 에 품목을 두는가**: 숫자의 진실은 줄의 누적 칸이고, 이벤트는 «언제 무엇을 어느 송장으로» 의 기록·표시용. `appendTrackingEvent` 가 이미 임의 필드(eventFields)를 받는다. 새 표를 만들면 TRADE_STRUCTURE 원칙(구조 문서 먼저) 위반 + 수령 쪽과 비대칭.
- **왜 수령을 보낸 양으로 묶지 않는가**: 운영 실측 — 공급업체 판매 발주 47건이 «보내기» 없이 수령됐다. 묶으면 그 길이 막힌다.
- **왜 deliver 를 막는가**: `delivered` 는 주문 단위 상태이고 메일이 «Please confirm receipt» 를 보낸다. 일부만 간 상태에서 보내면 거짓 안내다. (Irene 결정 1.)

---
---

# 개정 (2026-10-08 · Irene 답 반영) — «품목마다 보냈다/안 보냈다 표시» 로 간략화

> Irene 원문: **"배송을 했냐 안했냐의 업무처리 때문이야. 그럼 그냥 배송했다 안했다 개별표시만 하게 하던지 간략한 방법 찾아봐"**
> 이 개정이 위 원안(Ⅰ·Ⅱ)을 **대체**한다. 원안의 «수량 나눠 보내기» 는 폐기(필요해지면 이 파일 Ⅱ 가 그 설계다). 코드 변경 0(읽기만).

## Ⅰ-개정. Irene 에게 올리는 보고문

### 한 줄 결론
**네, 그렇게 갑니다 — «보내기» 창이 품목 체크 목록이 됩니다. 보내는 품목에 체크(기본은 전부 체크), 안 보낸 품목은 남고, 나중에 «나머지 보내기» 로 체크하면 끝.** 수량을 쪼개는 칸은 없앴습니다.

### 바뀌는 것 (이것뿐)
1. **품목마다 «보냄» 표시 하나**(보낸 시각이 같이 남음). 받는 쪽 «받음» 표시의 거울.
2. **«보내기» 창 = 체크 목록**: 품목 · 수량 · 체크. 전부 체크된 채로 열리니 지금처럼 한 번에 다 보내는 사람은 **그냥 확인만** 누르면 됩니다(동작 변화 없음). 못 보내는 품목만 체크를 풀면 그 품목은 «미발송» 으로 남습니다. 운송사·송장번호는 발송마다 적습니다.
3. **재고는 체크한 품목만 빠집니다**(그 품목 수량 전부). 나중에 나머지를 체크하면 그때 그 품목이 빠집니다. 같은 품목이 두 번 빠지는 일은 없습니다(이미 보낸 품목은 다시 체크 안 됨).
4. **목록**: 첫 발송 때 «배송 중»(지금과 같음). 안 보낸 품목이 남아 있으면 그 옆에 **«N품목 미발송»** + **«나머지 보내기»** 단추. «배송 완료» 단추는 **전부 보낸 뒤에만** 보입니다(일부만 갔는데 «완료» 메일이 나가지 않게 — 한 줄짜리 규칙이라 그대로 넣습니다. 빼라 하시면 뺍니다).
5. **받는 매장 화면**: 품목마다 «보냄 ✓ 10/8» 또는 «—». 배송 이력에 발송마다 «어떤 품목 · 어느 운송사 · 송장» 이 남고, «배송 출발» 메일도 발송마다 **이번 품목 / 남은 품목**을 적습니다.
6. 이미 «보냄» 처리된 옛 주문은 전 품목 «보냄» 으로 한 번 채웁니다.
7. **받기·청구서·정산서·반품은 변경 0.** 공급업체처럼 «보내기» 없이 매장이 바로 «받음» 하는 길도 그대로.

### 원안에서 뺀 것
- 품목 안에서 수량을 나눠 보내기(5개 중 3개). Irene 말씀대로 «보냈나 안 보냈나» 가 목적이라 품목 단위면 충분합니다. 필요해지면 그때(설계는 이 파일에 남겨 둠).
- «나머지 못 보냄(품절)» 처리는 이번에도 범위 밖(돈 문제 — 별도).

### Irene 추가 확인
**필요 없습니다.** 말씀하신 «개별표시» 그대로이고, 되돌리기 어려운 결정(새 상태·새 표·돈)이 하나도 없습니다. 팀원이 바로 개발서버에서 착수하고, 끝나면 Fable 게이트 1회 뒤 결과를 올립니다. 운영 배포는 그때 Irene 지시로.

### 확인할 곳 (구현 뒤)
- 개발서버 브랜드 «들어온 주문» → 주문 하나 «보내기» → 체크 하나 풀고 보내기 → 목록 «1품목 미발송» + «나머지 보내기» → 누르면 «배송 완료» 단추가 그제야 보이는지.
- 같은 주문을 매장 발주 상세에서 열어 품목에 «보냄 ✓ 날짜» 와 배송 이력 2건이 보이는지.

## Ⅱ-개정. 팀원 지시 (원안 Ⅱ 를 이걸로 바꾼다 · 순서 고정 · 🔒 보호파일 0 접촉)

### 0. 원칙
**줄 단위 «보냄» 플래그 하나.** 수량 칸 없음. 재고 차감 3분기는 **수량·구조 그대로**, 대상 줄만 거른다. 새 상태·새 표·새 차감 경로 없음.

### 1. 데이터
- `models/PurchaseOrderItem.js`: `shipped_at: DATE allowNull true, comment '판매자가 이 줄을 보낸 시각. null = 미발송 — quantity_received 의 거울(줄 단위)'`.
- 마이그 `scripts/migrate-po-item-shipped-at.js`(멱등 · registry `deploy`): ① 칼럼 없으면 ADD ② 백필 `UPDATE purchase_order_items i JOIN purchase_orders po ON po.id=i.purchase_order_id SET i.shipped_at = po.shipped_at WHERE po.shipped_at IS NOT NULL AND i.shipped_at IS NULL` — 영향 행 수 출력. 운영 sync 는 칸을 안 넣으므로 전용 마이그 필수.

### 2. `POST /api/seller-orders/:id/ship` (routes/seller-orders.js:615~)
- 본문: 기존 `tracking_info` + **선택** `item_ids: [n, …]`. 없음 = **미발송 줄 전부**(하위 호환 — 기존 호출·health-check 전부 그대로).
- 트랜잭션 안(PO 행 LOCK.UPDATE 그대로 — 이 잠금이 동시 발송의 방어선):
  1. 줄 로드. 서비스 줄(`utils/orderFulfillment.serviceLineIdsOf`)은 배송 대상 아님 → 발송 집합·«미발송 남음» 계산에서 제외(수령 쪽과 같은 판정 함수).
  2. **레거시 가드**: `locked.shipped_at` 있고 모든 줄 `shipped_at` null → 옛 전량 출고(백필 전 창) → 409 `ALREADY_SHIPPED`.
  3. `shipSet` = item_ids 없으면 미발송 비서비스 줄 전부 / 있으면 그 중 **이 PO 의 줄이면서 아직 미발송**인 것만(이미 보낸 줄·서비스 줄은 **조용히 제외**, 남의 줄 id → 400). `shipSet` 비면 → 미발송 줄이 0 이면 409 `ALREADY_SHIPPED`(기존 메시지 유지) / 있으면 400 `NOTHING_TO_SHIP`.
  4. 차감 3분기(supplier 671~ · brand 701~ · foodcourt 782~) 각 `for` 첫 줄에 `if (!shipSet.has(it.id)) continue;` **한 줄씩**. 수량(`quantity_ordered`)·stockLedger 호출·메모 전부 그대로.
  5. `shipSet` 줄 `shipped_at = now` (같은 트랜잭션).
  6. `fullyShipped` = 비서비스 줄 전부 shipped_at 있음.
  7. 헤더 `shipped_at` 은 **첫 발송 때만**(있으면 유지 — foodCostReport:120 · poNotifications:115 · 화면 1363/1433 이 «출고 유무/시작» 으로 읽음). 상태 규칙 그대로(`confirmed`→`shipped`, 그 외 유지).
  8. 이벤트: `appendTrackingEvent(.., 'shipped', note, undefined, { shipment_no, items:[{item_id, description, quantity}], carrier_code, carrier_name, tracking_number, tracking_url, estimated_arrival, partial: !fullyShipped })` — 5번째 인자(eventFields, poRealtimeService.js:31) 사용. 상위 carrier/tracking 은 이번 발송 값으로 덮음. note `Out for delivery via X (N of M items)` / 전량이면 기존 문구.
  9. 응답 `data` 에 `fully_shipped`, `unshipped_count` 추가.
- 메일(811~): 이번 발송 품목 표 + 남은 품목 표(`utils/poEmailItems` 모양 재사용). 전량이면 지금과 같음.

### 3. 주변 (최소)
- `POST /:id/deliver`(918~): `status==='shipped'` + **비서비스 줄 전부 shipped_at** 아니면 400 `NOT_FULLY_SHIPPED`.
- `POST /:id/amend`(1200~): 상태 가드가 이미 막는다. 방어 1줄: `beforeRows.some(r => r.shipped_at)` → 409 `ALREADY_SHIPPED`(ALREADY_RECEIVED 가드 옆).
- `PUT /:id/tracking`: 변경 0(최근 발송 값만).
- `routes/purchase-orders-workflow.js:1027` 구매자 mark-shipped(외부 공급업체 전용): 줄 `shipped_at = now` 1줄(차감 없음, 지금과 같음).
- GET 목록/상세: 줄 `shipped_at` 은 toJSON 자동. 헤더에 `unshipped_count`(비서비스 미발송 줄 수) — `is_service_only` 옆, 같은 방식.
- 수령·`purchaseOrderReceive.js`·반품·청구서·SOA·`docs/TRADE_STRUCTURE.md`: **변경 0.**

### 4. 화면
- `IncomingOrdersView.tsx`(BG·FG·공급업체 공용):
  - 보내기 모달(902~): 품목 **체크 목록** — 체크박스 · 품명(seller_product_name 우선) · 수량·단위. 미발송 줄은 기본 체크, 이미 보낸 줄은 «Shipped ✓ 날짜» 회색·체크 불가, 서비스 줄은 «No delivery» 회색. 전부 체크면 `item_ids` 를 **보내지 않는다**(하위호환 경로). 하나도 체크 안 됨 → 확인 비활성.
  - 상태 `shipped/delivered/received/partial_received` 이고 `unshipped_count>0`: 상태 칩 아래 보조문 «N items not yet dispatched»(기존 needsDispatch 보조문과 같은 스타일·`#B45309`) + 단추 «Ship remaining»(= openShipModal → POST /ship). **`isAmend` 판정(925)은 `unshipped_count===0` 일 때만** PUT /tracking — 지금은 상태만 보고 PUT 으로 가므로 반드시 바꾼다.
  - «Delivered» 단추(1438·1933)는 `unshipped_count===0` 일 때만.
  - 상세 모달 품목 표: «Shipped» 열(✓ + 날짜 / —).
- `PurchaseOrderDetailPage.tsx`(구매자): 품목 표 «Shipped» 열 1개(✓ 날짜 / —). DeliveryTimeline 변경 0(마지막 shipped 이벤트 시각을 이미 씀 · note 에 N of M 포함).
- 공용 컴포넌트 규칙 그대로(design-guard). i18n 새 키(열 제목 1 · 상태문구 3 · 단추 1 · 오류 2) 4언어 · `npm run i18n:verify`.
- 발송별 포장 목록 공유: 범위 밖.

### 5. 문서
- `docs/PURCHASE_ORDER_SYSTEM.md` 절 1개 «판매자 품목별 발송 표시 (2026-10-08)» — 원칙·칸·가드·범위 밖. `SUPPLY_CHAIN_SPRINT_7.md` 비범위 표 «Partial shipment» 옆 한 줄. TRADE_STRUCTURE 무접촉.

### 6. 증명 기준 (게이트에서 볼 것 · health-check `inventory` 계약)
| # | 계약 | 기대 |
|---|---|---|
| S1 | 줄 2개 주문, `item_ids:[A]` | 200 · A 재고만 −qtyA · 장부 1줄 · A.shipped_at 기록 · B null · 상태 shipped · 헤더 shipped_at 기록 · 이벤트 partial:true · `unshipped_count=1` |
| S2 | 이어서 본문 없음 | 200 · B 만 −qtyB · 헤더 shipped_at **그대로** · 이벤트 partial:false · `unshipped_count=0` |
| S3 | 다시 발송 | 409 ALREADY_SHIPPED · 재고 변화 0(기존 Q6 계약 5401~ 그대로 통과) |
| S4 | `item_ids:[A]` 를 다시 보냄(A 이미 발송, B 미발송) | A 제외 → shipSet 비면 400 NOTHING_TO_SHIP · 재고 변화 0 |
| S5 | S1 상태에서 `/deliver` | 400 NOT_FULLY_SHIPPED · S2 뒤 → 200 |
| S6 | 구매자 `/receive` 는 발송과 무관 | 미발송 주문도 수령 200 |
| S7 | 동시 전량 발송 2건 | 200 정확히 1 · 다른 하나 409 · 차감 1회 |
| S8 | 백필 마이그 2회 | 멱등 · 2회차 영향 0 · 옛 주문 줄 shipped_at = po.shipped_at |
| S9 | 고장주입 | §2-④ 의 `continue` 한 줄을 빼면 S1 이 실패(B 도 빠짐)하는지 — pm2 restart 뒤 · 원복 뒤 전부 통과 |
- 그 밖: 빌드 1회 뒤 `verify-all --full` 1회 · 실브라우저 클릭 1회(Ⅰ-개정 «확인할 곳») · print-guard 8/8 · design-guard · i18n · `check-sensitive-diff`(주문 무결성 분류가 뜨면 예상된 것 — 게이트 대상).

### 7. 순서
① 모델+마이그 → ② ship 라우트 → ③ deliver/amend/mark-shipped 3줄 → ④ health-check S1~S8 → ⑤ 화면 전부 확정 → ⑥ i18n → ⑦ 빌드 1회 → ⑧ verify-all --full → ⑨ 고장주입 S9 → ⑩ 문서 → ⑪ 게이트 입력 파일 → Fable 게이트. 설계와 다른 판단이 필요해지면 멈추고 게이트 입력 파일에 사실로 적는다.

### 8. 착수 판정
**Irene 추가 확인 없이 바로 착수 가능.** 근거: Irene 이 방식을 직접 지정(«개별표시»)했고, 이 개정은 그 지시의 구현이다. 되돌리기 어려운 요소(새 상태·새 표·돈·보호파일) 0. 운영 배포만 Irene 지시 때.

### 9. Irene 승인 기록 (2026-10-08 · 상황판)
- Irene 원문: **"그대로"** (앞의 «간략한 방법 찾아봐» 뒤에 옴) → **개정안(Ⅰ-개정·Ⅱ-개정) 승인.** 팀원은 Ⅱ-개정 순서 ①~⑪ 로 즉시 착수한다. 재질문 금지. 이 사안의 Fable 호출은 설계(이 파일) 1 + 구현 뒤 게이트 1.
