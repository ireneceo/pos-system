# 재고 화면 발주 = «발주 대기에 담기» (바로 보내지 않음) — Fable 설계 2026-11-10

> Irene 원문: «스톡에서 발주하면 바로 발주되면 안돼. PO로 보내야 하는 거 아니야? 그리고 스톡에서 보냈다고 알게도 확인하고. 제대로 봐야지.»
>
> 이 문서는 2026-11-03(`fable-design-20261103-stock-foresight-oneclick-po.md` «담기 1번 + 보내기 1번»)과
> 2026-11-10(`fable-design-20261110-stock-simple-reorder.md`)의 **«재고 창에서 바로 보냄» 부분만 대체**한다.
> 전망 계산·상태 이름·필터·발주 기준 숫자는 그대로다.

## 0. 결론 (한 줄씩)

1. 재고 화면의 두 길(단건·일괄)은 **초안에만 담는다. 판매자에게 나가는 것은 발주 대기 화면의 Submit 뿐**이다.
2. «재고에서 담았다» 는 **새 칸 없이** 발주의 `tracking_info.events` 에 한 건으로 남긴다(누가·언제·무엇을·몇 개). **마이그 0.**
3. 재고 목록에 **«발주 대기 n» 표시가 필요하다** — 없으면 계속 «지금 발주» 로 보여 또 담고, 같은 줄은 수량이 합쳐져 두 배가 된다.
4. 상태 계산(`classify`·`on_order`)은 **건드리지 않는다.** 초안은 아직 안 보낸 것이므로 «지금 발주» 가 맞다. 옆에 «발주 대기» 를 따로 보여 줄 뿐이다.

## 1. 서버

### 1-1. 담기 — `POST /api/purchase-orders/bulk` 한 길로
- 재고 화면 두 길 모두 `bulk` 를 `{ groups, source: 'stock' }` 로 부른다. **`auto_submit` 을 보내지 않는다.**
  - 단건(`useOrderModal`)도 `POST /purchase-orders` + `/submit` 두 번 호출을 버리고 group 1개짜리 `bulk` 로 바꾼다
    → `mergeDraft` 가 걸려 같은 판매자 초안이 또 생기지 않는다.
- 서버의 `auto_submit` 분기 자체는 **그대로 둔다**(`NewPurchaseOrderPage`·health-check 가 쓴다). 재고 화면만 안 쓴다.
- `source` 는 화이트리스트: `'stock'` 만 인정, 그 밖은 무시(기록 없음). 카트는 지금처럼 아무것도 안 보낸다.

### 1-2. 기록 — `tracking_info.events` 한 건 (트랜잭션 안에서)
`source === 'stock'` 이면 group 마다 `createPurchaseOrderCore` 직후, 같은 트랜잭션에서 그 초안에:

```js
appendTrackingEvent(po, 'draft', `Added from Stock: ${n} item(s)`, null, {
  source: 'stock',
  buyer_only: true,
  by_user_id: req.user.id, by_name: <표시 이름>,
  lines: [{ ingredient_id, product_ingredient_id, ingredient_seller_product_id, name, qty, unit }]  // 이번에 담은 것만, 이번 수량
})
```
- 새로 만든 초안이든 합쳐진 초안이든 똑같이 1건. 두 번 담으면 2건(이력이 그대로 남는다).
- 왜 줄 칸(`PurchaseOrderItem.source`)이 아닌가: 카트 줄과 재고 줄이 **한 줄로 합쳐질 수 있어** 줄 하나에 출처 하나를 못 적는다.
  이벤트는 «그때 재고에서 2개 담음» 을 그대로 적으니 합쳐져도 참이다. 제출 뒤에도 발주 상세 타임라인에 남는다.
- `consolidate-drafts`: 지워지는 초안의 `source==='stock'` 이벤트를 남는 초안 events 에 옮긴 뒤 지운다(시각 순 정렬). 이것만 추가.
- 판매자 화면(`IncomingOrdersView` 타임라인)은 `buyer_only` 이벤트를 그리지 않는다. (비밀은 아니지만 판매자가 볼 내용이 아니다.)

### 1-3. «발주 대기» 수량 — suggestions 응답에 두 칸
- `utils/reorderMath.js` 에 `stagingQty(restaurantId, ids)` · `stagingQtyBrand(piIds)` 추가.
  **`onOrderQty`/`onOrderQtyBrand` 와 같은 SQL·같은 범위 조건, 상태만 `'draft'`**. 주문 단위 합과 재고 단위 합(× unit_conversion) 둘 다.
- `buildSuggestionRows` 가 줄마다 `in_staging`(재고 단위) · `in_staging_order_qty`(주문 단위) 를 싣는다. 없으면 0.
- **`classify`·`on_order`·`suggested_*`·summary 숫자는 한 글자도 안 바꾼다.** (계산 정의 변경 아님 = 표시용 칸 추가)
- 출처 구분 없이 초안 줄 전부를 센다(카트로 담은 것도 «발주 대기» 다 — 또 담지 말라는 신호는 같다).

## 2. 화면 (화면 글자는 영어 기본 + 4개 언어)

### 2-1. 단건 창 `OrderModal`
- 버튼 `Send Order` → **`Add to Order Staging`**. 창 제목·안내에서 «send» 표현 제거.
- 그 품목 `in_staging_order_qty > 0` 이면 수량 칸 아래 안내: `Already in Order Staging: 2 box. Adding will increase it.`
- 성공 뒤 1.2초 자동 닫힘을 없애고 결과를 창 안에 둔다:
  - `Added to Order Staging — not sent yet.` / `Glass Noodle × 2 box · {seller}`
  - 버튼: 주 `Review & Send`(→ `/pos/purchase-orders/staging`) · 보조 `Keep Working`(닫기)

### 2-2. 일괄 창 `BulkOrderModal`
- 보내기 버튼 → **`Add to Order Staging`**.
- 기본 수량 = `max(0, order_qty − in_staging_order_qty)`. 0 이 되는 줄은 담을 목록에서 빼고 맨 아래
  `Already in Order Staging (n)` 묶음으로 **보여 준다**(«연결 필요» 묶음과 같은 방식 — 소리 없이 빼지 않는다).
  체크박스로 직접 고른 줄(«필요한 것 담기» 가 아닌 openBulk)도 같은 규칙.
- 결과 화면:
  - 제목 `{n} item(s) added to Order Staging — not sent yet`
  - 판매자별 줄: `{seller} · {k} item(s)` + 합쳐졌으면 기존 문구 `added to your existing draft for this seller`
  - 발주 번호·`submitted` 상태 표시는 뺀다(아직 발주가 아니다).
  - 버튼: 주 `Review & Send` · 보조 `Keep Working`
- 닫으면 `loadSuggestions()` 다시 → 목록에 «발주 대기» 가 바로 뜬다.

### 2-3. 재고 목록 (매장·브랜드 공용 컴포넌트)
- 상태 칩은 그대로(«지금 발주» 등). `in_staging_order_qty > 0` 인 줄은 칩 옆에 작은 글자 링크
  **`In Staging · 2 box`** → 누르면 발주 대기 화면. 색은 중립(회색 글자) — 새 상태·새 필터를 만들지 않는다.
- 띠의 «필요한 것 담기» 개수는 그대로 두되, 전부 이미 담겨 있으면 창이 `Already in Order Staging` 묶음만 보여 주고 담기 버튼은 꺼진다.

### 2-4. 발주 대기 화면 `PurchaseOrderStagingPage`
- 초안의 events 중 `source==='stock'` 의 `lines` 키(ingredient_id | product_ingredient_id | ingredient_seller_product_id)와 맞는 줄에
  작은 꼬리표 **`From Stock`**(중립색, 기하 글리프·이모지 없음). 마우스 올리면 `Added from Stock by {name} · {날짜} · 2 box`.
  (날짜는 매장 타임존 유틸로.)
- 제출·수정·삭제 동작은 변경 없음.

### 2-5. 발주 상세 `PurchaseOrderDetailPage`
- 타임라인이 이미 events 를 그린다 — `Added from Stock: 2 item(s)` 가 나오는지 확인하고, `lines` 가 있으면 그 아래 품목·수량을 한 줄로 보여 준다.
  제출 뒤에도 남는다 = Irene 의 «스톡에서 보냈다고 알게».

## 3. 하지 않는 것
- 새 DB 칸·ENUM·마이그 없음. 주문 상태 안 늘림.
- `classify`/`on_order` 정의 변경 없음(승인 대기 발주가 «오는 중» 에 안 들어가는 기존 동작 포함 — 이번 범위 밖).
- 정기 발주(`poScheduleService`, mergeDraft:false)·카트·`NewPurchaseOrderPage` 무접촉.
- 🔒 인쇄·KDS 보호 파일 무접촉.

## 4. 검증으로 증명할 것 (데모 매장 38 + 데모 브랜드, `[확인용]` 표기)
1. **안 나간다**: 재고 단건·일괄 각각 담은 뒤 → 발주 status=`draft`, `submitted_at` null, 판매자 포털 목록에 없음, 판매자·오너 통지 0건(소켓·메일 로그).
2. **기록**: 그 초안 events 에 `source:'stock'` 1건, lines 의 품목·수량이 보낸 값과 일치. 같은 품목 두 번 담으면 줄 1개(수량 합) + 이벤트 2건.
3. **카트와 섞임**: 카트로 담은 초안에 재고에서 다른 품목을 담음 → 초안 1개, 재고 줄에만 `From Stock`, 카트 줄엔 없음.
4. **합치기 보존**: 같은 판매자 초안 2개(하나에 stock 이벤트)를 만들어 `consolidate-drafts` → 남은 초안에 이벤트 유지.
5. **목록 표시**: 담은 뒤 suggestions 의 `in_staging_order_qty` = 초안 줄 수량, `status`·`on_order`·summary 는 담기 전과 **동일**(전후 응답 비교).
   발주 대기에서 Submit → `in_staging` 0, `on_order` 증가.
6. **두 번 담기 방지**: «필요한 것 담기» 를 연달아 두 번 → 두 번째는 전부 `Already in Order Staging`, 초안 수량 불변.
7. **끝까지**: 발주 대기 Submit All → 승인 게이트(`applySubmitGate`) 그대로 탐 → 발주 상세·오너 승인 화면 타임라인에 `Added from Stock` 보임, 판매자 화면 타임라인엔 안 보임.
8. **브랜드(BG) 길**: `/pos/brand-inventory` 에서 1·2·5 반복(product_ingredient_id 줄). 브랜드에서 `Review & Send` 가 여는 발주 대기 주소가 실제로 그 초안을 보여 주는지 — **확인 못 한 항목, 구현 때 실측**(다르면 그 역할의 발주 대기 주소로).
9. **반증(고장주입) 1회**: 재고 훅에 `auto_submit:true` 를 되살리면 1번 검사가 실패하는지. health-check 에 «bulk source=stock → draft 유지 + 이벤트 1건» 케이스를 영구 추가.
10. 기계 게이트: `check-sensitive-diff` → 대상이면 Fable 게이트 1회 · `check-print-guard` 0건 · 프론트는 빌드 1회 + `verify-all --full` 1회 · i18n 4개 언어.

## 5. 구현 순서
서버(1-1 → 1-2 → 1-3, health-check 케이스) → 초 단위 검증 → 프론트 전부(2-1~2-5 + i18n) → 빌드 1회 → 전체 검증.
설계와 다른 판단이 필요해지면(예: 브랜드 발주 대기 주소가 없음, 판매자 응답 직렬화가 여러 곳) 멈추고 묻는다.
