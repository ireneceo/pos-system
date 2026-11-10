# Fable 설계 — 재고 «미리 안내» + 누르면 끝나는 발주 + 최소주문 자동 판단 (2026-11-03)

> 종류: `design`(여러 화면이 한 공식을 나눔) · 끝난 뒤 `gate` 1회(돈 나가는 발주 수량 공식 + 외부로 나가는 발주서).
> 호출 조건: 공용 기준 ①설계 + ③계산(제안 수량·최소주문 판단식을 바꾼다). 토큰 절약 — 설계 1 + 검증 1.
> 실측 근거는 전부 개발서버 코드·개발 DB(2026-11-03). 운영 DB 는 읽지 않았다.

## Irene 원문 (그대로)
«재고가 없는 거 미리 안내되게 해줘. 특히 브랜드제너럴에서 우리가 계속 주문 받는 항목들 관리 제대로 해야 하거든. 지금 재고관리를 더 안전하고 퍼펙하게 도와줄 방법 있어? 발주하기도 바로 되게 해서 그냥 누르기면 하면 되게 좀 해줘. 미니멈 주문도 알아서 좀 판단 할 방법 없어? 발주할 내역 정리하는게 너무 힘들어. fable 검토해서 제대로 확인해줘.»

---

## 0. 한 줄 결론

**새 표·새 목록·새 경로 없이**, 이미 있는 «발주점 단일 공식»(`utils/reorderMath`)을 **발주 제안 라우트에 마저 적용**하고(2026-10-08 판정 Ⅱ-4 가 «세 엔드포인트 모두» 라고 했는데 PO `suggestions` 만 빠져 있었다), 브랜드(BG) 분기에는 **«매장이 이미 주문해 둔 양(미출고)»** 을 가용 재고에서 빼서 «품절 · 지금 발주 · 곧 부족 · 기준 없음» 네 단계로 **미리** 보여 준다. 제안 수량은 **주문 단위로 환산하고 판매자 최소주문수량(MOQ)을 올려 맞춘 값**이라, 재고 화면의 «필요한 것 담기» → «보내기» 두 번이면 서버 검사(400)에 걸리지 않고 발주가 나간다. 무료배송 기준금액은 **안내만**(자동으로 채워 넣지 않는다).

---

## 1. Irene 요청을 무엇으로 읽는가

| 원문 | 해석 | 이번(1단계) | 뒤로 |
|---|---|---|---|
| «재고가 없는 거 미리 안내» | ① BG 창고(사 오는 쪽): 떨어지기 **전에** — 현재<최소 가 아니라 «며칠분 남았나» 로 ② BG 판매 쪽: 매장 주문이 이미 들어와 있어 **보낼 재고가 모자라는** 것 | ①·② 둘 다 BG 재고 화면에 | 매장(구매자) 화면에 «브랜드 품절» 표시 → §9 Q1 |
| «브랜드제너럴에서 계속 주문 받는 항목 관리» | BG 가 매장에 파는 프로덕트의 뒷받침 재고(재고아이템 다이렉트·레시피) — **미출고 매장 주문 = 이미 약속한 양** | 약속한 양(committed) 차감 | 매장 주문 접수 화면에 «재고 부족 N줄» 배지 → 2단계 |
| «더 안전하고 퍼펙하게» | 지금 알림·제안은 `min_stock>0` 품목만 뜨는데 BG 35개 중 1개만 설정 → **사실상 아무것도 안 뜬다**. 판단 근거(사용량·최소치)가 없는 품목을 **«기준 없음»** 으로 따로 세어 채우게 한다 | 기준 없음 묶음 + 바로 설정 | 매일 아침 알림(푸시) → §9 Q2 |
| «발주하기도 바로 … 누르기만 하면» | 이미 있는 Bulk Order(체크 → 모달 → Send, `auto_submit`) 를 쓰되, **제안이 비어 있고(위 이유) · 수량이 서버 규칙에 걸리고(MOQ·단위) · 연결 없는 품목은 소리 없이 빠지는** 세 가지를 없앤다 | 담기 1번 + 보내기 1번 | 확인 없이 즉시 발송은 **안 함**(돈이 나간다) |
| «미니멈 주문도 알아서 판단» | 셋 다다: (a) 판매자 상품 **최소주문수량**(MOQ · `poMinOrder`) (b) **주문 단위 환산**(g → pack, 올림) (c) 판매자 **무료배송 기준금액**(`min_order_amount`) | (a)(b) 는 수량에 반영 · (c) 는 그룹 머리에 «RM 20 부족 → 배송비 RM 5» 안내 | (c) 자동 채우기 **안 함**(필요 없는 걸 사게 된다) |
| «발주할 내역 정리하는 게 힘들다» | 판매자별로 묶어, 수량·단위·최소치·마감이 **한 줄에** 보이고 그대로 보내지게 | 모달 줄 정보 보강 + 마감(order_windows) | — |

### 1-1. 이미 있는 것 (다시 만들지 않는다)
- 발주점·제안 수량 단일 공식 `dev-backend/utils/reorderMath.js` (`compute`·`pickDailyUsage`·`ledgerUsage`·`onOrderQty`) — 매장 `inventory/reorder-suggestions`·`par-level` 이 쓴다. jest `tests/reorder-math.test.js` 있음.
- MOQ 서버 단일 규칙 `utils/poMinOrder.js` (`minOrderRulesByMapping` — 연결 id → {min, unit}; 값 1 = 미정). 화면 `utils/unitConversion.ts minQtyOf`·`minOrderViolationText`.
- 배송비 규칙 `utils/purchaseOrderTotals.js computeDeliveryFee` (판매자 `min_order_amount`·`delivery_fee`) — 발주 생성 시 서버가 계산.
- 발주 마감·배송일 `utils/orderSchedule.js` — `resolveSellers` 가 `order_windows` 를 같이 내린다(`utils/sellerNames.js:131`).
- 재고 장부 단일 함수 `services/stockLedger.js` — BG 출고 차감은 `routes/seller-orders.js:854-915`(출고 시점 · `entity_type='brand'` · `product_ingredient_id`) 로 장부에 남는다 → BG 하루 사용량의 원천.
- 일괄 발주: `components/Inventory/hooks/useBulkOrder.ts` → `modals/BulkOrderModal.tsx` → `POST /api/purchase-orders/bulk {groups, auto_submit:true}` (`createPurchaseOrderCore(mergeDraft:true)` + `applySubmitGate`). BG 는 오너 승인 대상이 아니라 그대로 `submitted`.
- 재고 설정 모달 `hooks/useSettingsModal.ts` — 브랜드 모드는 `PUT /api/product-ingredients/:id` 로 `min_stock·lead_time_days·manual_daily_usage` 저장.

### 1-2. 빠진 것 (실측)
1. `GET /api/purchase-orders/suggestions` (`routes/purchase-orders-crud.js:459-648`) 는 **reorderMath 를 안 쓴다** — `min×1.5 − 현재`, `현재 < min_stock` 일 때만, 오는 중 발주·약속한 양·MOQ·단위 환산 전부 없음. 브랜드 분기는 SQL 에서 `min_stock > 0` 으로 거른다(개발 DB: 활성 재고아이템 35 중 min 설정 1).
2. **단위 결함**: 제안 `suggested_qty` 는 재고 취급단위(g)인데 `useBulkOrder` 가 그 수를 그대로 `quantity_ordered`(주문 단위 = pack) 로 보낸다. `unit_conversion ≠ 1` 이면 1,500 g 제안이 **1,500 pack** 발주가 된다(개발 DB 연결은 대부분 1 이라 아직 안 터졌다).
3. `openBulk` 가 판매자 없는 품목을 **소리 없이 뺀다**(`if (sugg && sugg.seller_type)`). «체크했는데 모달에 없다» 가 된다.
4. BG 장부 사용량 조회가 없다: `reorderMath.ledgerUsage` 는 `entity_type='restaurant' AND ingredient_id` 만. BG 출고 차감은 `entity_type='brand' AND product_ingredient_id` 로 남는다. 개발 DB 에는 brand `order_deduct` 0건(initial 6 · adjustment 5 뿐) — 운영은 미측정(with MIN 출고가 이 경로를 탄다).
5. 매장이 이미 주문해 둔(미출고) 양을 BG 어디에서도 보여 주지 않는다 — 판매자 주문 목록(`seller-orders.js GET /`)·구매자 카탈로그(`supplier-directory.js`) 둘 다 재고를 싣지 않는다.
6. 알림: `stock_alerts` 는 `restaurant_id·ingredient_id NOT NULL` 이라 BG 재고아이템은 **담을 수 없다**. `notification-settings.js:51` 의 `inventory_low`(push_only) 는 **발화하는 코드가 없다**(정의만).
7. BG 목록의 «/day» 는 DB 칸 `avg_daily_usage`(아무도 안 채움) 를 보여 준다.

---

## 2. 범위 (1단계 — 이번에 만든다)

**스키마 변경 0 · 마이그 0 · 인쇄·KDS 보호파일 0 접촉.** 전부 «읽어서 계산해 보여 주고, 기존 bulk 로 보내는» 범위다.

| # | 무엇 | 어디 |
|---|---|---|
| A | reorderMath 에 BG 입력 조회 3개 + 순수 함수 2개(단계 판정 · 주문 수량 환산) | `utils/reorderMath.js` |
| B | `GET /purchase-orders/suggestions` 두 분기를 **같은 빌더**로 — reorderMath 적용, 전 품목 대상(min 필터 제거), 약속한 양, MOQ·단위 환산, 판매자 배송조건·마감 동봉, 요약 수 | `routes/purchase-orders-crud.js` |
| C | `utils/poStatuses.js` 에 «미출고 열린 판매 주문» 상태 상수 1개 | `utils/poStatuses.js` |
| D | 재고 화면 상단 «발주 전망» 띠(네 숫자 + 담기 버튼) · 목록 배지·/day 덮어쓰기 · 모달 줄 정보·연결 필요 묶음·MOQ 400 문구 | `components/Inventory/*` |
| E | 발주 목록 화면 제안 패널 — 단위·단계 표시만 | `pages/PurchaseOrders/PurchaseOrdersPage.tsx` |
| F | i18n 4개 언어 · jest · health-check 6건 · 고장주입 3건 | `public/locales/*/inventory.json` · `tests/reorder-math.test.js` · `scripts/health-check.js` |

**뒤로 미룬다(2단계 · §9 의 답에 따라):** 매장 카탈로그·장바구니의 «브랜드 재고 부족» 표시 · 판매자 주문 목록의 «보낼 재고 부족» 배지 · 매일 아침 알림 · `stock_alerts` 를 BG 로 넓히기(스키마) · 매장 쪽 committed(해당 없음).

**하지 않는다(기각):** 자동 발주(확인 없이 발송) · 무료배송 기준 자동 채우기 · 외부 공급업체 이메일 자동 발송(2026-10-22 Irene 지시) · 새 표(`stock_forecasts` 같은 것) · 프로덕트 자체 재고(`brand_products.current_stock`) 를 제안 대상에 넣기(TRADE_STRUCTURE §5-7 정석 밖 — 다이렉트 연결된 프로덕트는 재고아이템을 사라).

---

## 3. 계산 정의 (단일 공식 — 바뀌는 곳은 입력뿐)

> **2026-11-10 개정 → `.claude/fable-design-20261110-stock-simple-reorder.md` §1**: ① min_stock 이 있으면 발주점 = min_stock(예전 사용량×리드타임 + min_stock) ② 사용량 0 이면 채울 여유 = 발주점 × 0.5(예전 0). 나머지 그대로.

`compute()` 본문은 **바꾸지 않는다.** 입력과 후처리만 더한다.

### 3-1. 입력
| 기호 | 뜻 | 매장(RA) | 브랜드(BG) |
|---|---|---|---|
| `on_hand` | 지금 재고(취급단위) | 자기 재료 `current_stock` / 브랜드 재료는 오버레이 | `product_ingredients.current_stock` |
| `committed` | **이미 약속해 둔 양**(미출고 매장 주문) | 0 | §3-2 |
| `available` | `on_hand − committed` | | |
| `daily` | 하루 사용량 | `ledgerUsage`(restaurant·ingredient_id, 28일·7일 이상) → `manual_daily_usage` → 0 | **새** `ledgerUsageBrand(piIds)`: `entity_type='brand' AND product_ingredient_id IN (:ids)` 같은 창·같은 종류(`order_deduct`·`waste`·`production<0`) → `manual_daily_usage` → 0 |
| `on_order` | 오는 중 | `onOrderQty` | **새** `onOrderQtyBrand(piIds)`: `purchase_order_items.product_ingredient_id IN (:ids) AND p.entity_type='brand' AND p.status IN RECEIVABLE AND p.deleted_at IS NULL` × `unit_conversion` (품목이 주인 범위라 `entity_id` 필터 불필요 — 다브랜드 오너 안전) |
| `lead` | 리드타임 | `max(품목 lead_time_days, 우선 연결 lead_time_days) ‖ 2` — 보수적으로 큰 쪽 | 같음 |
| `min_stock`·`safety_stock_percent` | 품목 설정 | 그대로 | 그대로 |

`compute({ dailyUsage: daily, leadTimeDays: lead, minStock, safetyStockPercent, onHand: available, onOrder: on_order })` → `reorder_point`·`suggested_qty`(취급단위)·`needs_order`.

### 3-2. 약속한 양 `committedOutboundBrand(brandIds, piIds)` (BG 만)
- 대상 발주: `purchase_orders.seller_type='brand' AND seller_entity_id IN (:brandIds) AND status IN OPEN_OUTBOUND_STATUSES AND deleted_at IS NULL` · 줄: `purchase_order_items.shipped_at IS NULL`.
- `OPEN_OUTBOUND_STATUSES = ['submitted','confirmed','shipped']` — `utils/poStatuses.js` 에 **상수로 추가**(«shipped 인데 미출고 줄» = 부분 출고의 남은 줄). ⛔ `RECEIVABLE_STATUSES` 와 섞지 않는다 — 뜻이 다르다(그건 구매자가 받을 수 있는 상태).
- `brandIds` = `Brand.findAll({ where: { owner_id: ownerUserId } })` — 재고아이템 주인(`owner_user_id`) 이 가진 **모든 브랜드**의 주문이 같은 재고를 깎는다(user 6 → 브랜드 1·2·4).
- 줄 → 재고아이템 환산은 **출고 차감 코드와 같은 갈래**(`seller-orders.js:854-915` 와 1:1):
  - 연결 `ingredient_seller_product_id` → `seller_type='brand'` → `brand_products`
  - 다이렉트(`product_recipe_id` 없고 `product_ingredient_id` 있음): `qty × directDeductConversion({stock, sellerProduct}).conv` (`services/sellerLinkConversion`)
  - 레시피(`product_recipe_id`): `Σ qty × product_recipe_ingredients.quantity` (ingredient_id = 재고아이템 id)
  - 둘 다 없음(자체 재고 프로덕트·주문제작·서비스): 0 — 재고아이템이 아니다.
- 합은 `Map<product_ingredient_id, qty>`. 매장(RA) 호출 땐 빈 Map.

### 3-3. 단계 판정 `classify({ available, on_order, daily, min_stock, reorder_point, cover_days = 7 })` (순수)
```
basis      = daily > 0 || min_stock > 0
if (!basis)                                  → 'no_basis'     // 재고 0 이어도 소리 내지 않는다(useInventoryData 와 같은 원칙)
else if (available <= 0)                     → 'out'          // 약속한 양을 빼면 없다
else if (available + on_order <= reorder_point)            → 'order_now'
else if (daily > 0 && available + on_order <= reorder_point + daily × cover_days) → 'soon'   // 7일 안에 발주점에 닿는다
else                                         → 'ok'
days_of_cover = daily > 0 ? round1((available + on_order) / daily) : null
```
«미리 안내» = `soon`. min_stock 만 있고 사용량이 없는 품목은 `soon` 을 낼 수 없다(판단 근거가 없다) — 그래서 «기준 없음» 묶음이 필요하다.

### 3-4. 주문 수량 `orderQtyFor({ suggest_stock, item_min_order, unit_conversion, moq })` (순수)
```
s1 = max(suggest_stock, item_min_order || 0)          // 취급단위 (품목의 min_order — 1건만 쓰지만 기존 addToPurchaseCart 가 보던 값)
conv = unit_conversion > 0 ? unit_conversion : 1      // 주문 1단위에 든 취급단위 양(연결 unit_conversion — 입고·on_order 와 같은 칸)
s2 = ceil(s1 / conv − 1e-9)                           // 주문 단위, 올림(포장을 반으로 못 산다)
s3 = moq != null ? max(s2, moq) : s2                  // 판매자 MOQ (effectiveMinOrder: 1 = 미정 → null)
return { order_qty: s3, stock_qty: s3 × conv, steps: { s1, conv, s2, moq } }
```
- `moq` 는 **`minOrderRulesByMapping([mapping.id])`** 로 받는다 — 400 검사와 같은 함수·같은 답(판매자 상품 현재 값 우선, 외부 업체는 연결 사본).
- 응답의 `suggested_qty` 는 이제 **`order_qty`(주문 단위)** 다 — 1-2 ② 단위 결함을 이 한 줄로 닫는다. `suggested_stock_qty`(취급단위) 를 따로 싣는다.
- `measure` 주문(무게·부피 소수 주문) 도 `ceil` 한다 — 0.5 kg 단위 판매자는 MOQ 0.5 로 적혀 있고 올림은 그 위로만 간다. (발주는 사람이 모달에서 고칠 수 있다.)

### 3-5. 검산 사례 (jest 에 그대로 박는다)
| | 입력 | 기대 |
|---|---|---|
| A 지금 발주 | on_hand 2,000 g · committed 1,500 · daily 400(장부 10일/4,000) · lead 3 · min 0 · safety 20% · on_order 0 · conv 500 g/pack · MOQ 10 | safety 240 · rp 1,440 · available 500 · `order_now` · cover 1.3일 · suggest_stock 3,740 · s2 8 · **order_qty 10 pack = 5,000 g** |
| B 곧 부족 | 위와 같되 on_hand 4,000 · committed 0 | available 4,000 > rp 1,440 · ≤ 1,440+2,800=4,240 → `soon` · cover 10일 · suggest_stock 240 · **order_qty 1 pack** |
| B′ 괜찮음 | on_hand 6,000 | `ok` · cover 15일 · suggest 0 |
| C 최소치만 | min 5 kg · on_hand 3 · daily 0 · conv 1 · MOQ 10 | rp 5 · `order_now` · cover null · suggest_stock 2 · **order_qty 10 kg** (옛 식 `min×1.5−cur`=4.5 와 다르다 — 의도된 변경) |
| D 기준 없음 | min 0 · daily 0 · on_hand 0 · committed 0 | `no_basis` · 제안 목록에 안 뜸 · `summary.no_basis` 에 셈 |
| E 약속 초과 | on_hand 3 · committed 5 · min 0 · daily 0 | available −2 → basis 없음이라도? → **`out`** 으로 올린다: 규칙에 `committed > available` 이면 basis 와 무관하게 `out` 한 줄 추가(매장 주문을 못 보내는 건 기준 유무와 상관없이 사실이다) |
| F MOQ 미정 | MOQ 1(기본값) · s2 3 | moq null → order_qty 3 |
| G 소수 | suggest_stock 0.3 kg · conv 1 · MOQ 0.5 | s2 1 → max(1, 0.5) = 1 kg (올림이 먼저) |

(E 를 §3-3 의사코드 첫 줄 앞에 넣는다: `if (committed > 0 && available < 0) → 'out'`.)

---

## 4. API 모양

### 4-1. `GET /api/purchase-orders/suggestions` (경로·권한 그대로 · 응답 확장)
```jsonc
{ "success": true, "data": {
  "groups": [{
    "seller_type": "supplier", "seller_entity_id": 20, "seller_name": "GIT Consulting",
    "delivery_terms": { "min_order_amount": 100, "delivery_fee": 5, "currency": "MYR" } | null,   // 판매자 행 그대로(규칙 미설정이면 null)
    "order_windows": [...] | null,                                                               // resolveSellers 가 주는 그대로
    "items": [{
      "ingredient": { "id": 6376, "name": "…", "unit": "g", "current_stock": 2000, "min_stock": 0, "owner_type": "bg_stock_item" },
      "product_ingredient_id": 6376, "is_brand_shared": false,
      "status": "order_now",            // out | order_now | soon
      "days_of_cover": 1.3, "daily_usage": 400, "usage_source": "ledger", "lead_time_days": 3,
      "reorder_point": 1440, "on_order": 0, "committed": 1500, "available": 500,
      "suggested_stock_qty": 3740,      // 취급단위
      "order_qty": 10, "order_unit": "pack", "unit_conversion": 500,
      "min_order_qty": 10, "min_order_source": "seller" | null,
      "suggested_qty": 10,              // = order_qty (호환 — 화면이 이 칸을 quantity_ordered 로 보낸다)
      "seller_source": { "id": 77, "unit_price": 93, "unit_conversion": 500, "min_order_quantity": 10, "lead_time_days": 3 }
    }]
  }],
  // 판매자 없는 품목은 종전처럼 seller_type:null 그룹(key 'unassigned:0') — 화면이 «연결 필요» 로 보여 준다. order_qty·min_order_qty 는 null.
  "summary": { "out": 1, "order_now": 3, "soon": 2, "ok": 20, "no_basis": 9, "unlinked": 2, "total": 35 },
  "computed_at": "2026-11-03T08:00:00.000Z"
}}
```
- 포함 기준: `status ∈ {out, order_now, soon}`. `ok`·`no_basis` 는 **수만** 센다(목록은 재고 화면 필터로 본다 — 재고 목록 행에 `status` 를 덮어쓰는 §5-2 참고).
- 대상 품목: 매장 분기 `{restaurant_id}` 조건에서 **`min_stock>0` 제거**(brand 공유 재료 조건은 그대로) · 브랜드 분기 `min_stock: {gt:0}` **제거**. `is_active`·`source_recipe_id: null` 은 유지(준비 재료는 사는 게 아니다).
- 그룹 묶기·우선 판매처 고르기(`sellerLinkVisible`·매장 연결 우선·is_preferred·싼 값) 는 **그대로**. 두 분기가 `buildSuggestionRows({ subjects, usage, onOrder, committed, links, moqRules, sellerMap })` 한 함수를 부르게 합친다 — 분기별로 남는 건 «대상 뽑기»와 «입력 조회» 뿐.
- `delivery_terms` 는 `getSeller(sellerMap, …)` 행의 `min_order_amount·delivery_fee·currency`(브랜드·푸드코트·공급업체 셋 다 같은 칸 — `reference_delivery_fee_gap` 2026-10-19). 배송비 **계산**은 안 한다(발주 생성 시 서버가 `computeTotalsWithDelivery` 로 한다) — 화면은 «기준 RM 100 · 미만 시 RM 5 · 지금 소계 RM 80 → RM 20 부족» 뺄셈만.
- 성능: 품목 460개 매장도 조회 4개(장부·오는 중·연결·MOQ) + BG 1개(약속한 양) 전부 `IN (:ids)` 묶음 — N+1 금지.

### 4-2. 바뀌지 않는 것
`POST /purchase-orders/bulk`·`createPurchaseOrderCore`·`assertLinesMeetMinOrder`·`applySubmitGate` — **손대지 않는다.** 제안이 규칙을 미리 맞출 뿐, 지키게 하는 쪽은 그대로다(사람이 모달에서 수량을 줄이면 400 이 나오는 게 맞다).

---

## 5. 화면 동작 (BG 재고 `/pos/brand-inventory` · 매장 재고 같은 컴포넌트)

### 5-1. 상단 «발주 전망» 띠 (`sections/ForesightPanel.tsx` 신규 · 공용 `StatCard`)
- 네 칸: **품절(out) · 지금 발주(order_now) · 곧 부족(soon) · 기준 없음(no_basis)** + 작은 글씨 «연결 필요 N». 칸을 누르면 아래 목록이 그 단계로 걸러진다(기존 `statusFilter` 에 네 값 추가).
- 버튼 둘(공용 `Button`):
  - **«필요한 것 담기 (N)»** = out + order_now 중 판매자 연결 있는 것 전부 선택 → 모달 열기(`bulk.selectNeeded()` + `openBulk()`). Irene 의 «누르기만 하면» 은 이것 + 모달 «Send» = **두 번**. 확인 없이 보내지는 않는다(발주서가 밖으로 나간다).
  - **«곧 부족한 것도 포함»** 토글 — 켜면 soon 도 선택에 든다. 기본 꺼짐(미리 알리되 과발주는 막는다).
- 띠 밑 한 줄: «기준 없음 9개 — 최소 재고나 하루 사용량을 넣으면 미리 알려 드립니다» → 누르면 기준 없음 필터 + 각 행의 기존 설정 버튼(SettingsModal) 그대로 쓴다. BG 장부에 출고가 쌓이기 시작하면(운영 with MIN) 자동으로 `ledger` 로 바뀐다.
- `computed_at` 과 «오는 중 N건 반영» 문구. 데이터 로딩은 `useBulkOrder.loadSuggestions` 하나(재고 화면이 이미 부른다) — 두 번 부르지 않는다.

### 5-2. 목록 행 (`StockListSection.tsx`)
- 제안 행이 있으면 상태 배지 글자를 **단계**로 덮어쓴다: out → «Out / can't ship», order_now → «Order now», soon → «Soon (10d)». 제안 없는 행은 종전 `stock_status`.
- «/day» 는 제안 행의 `daily_usage`(`usage_source` 가 ledger 면 «28d») 로 덮어쓴다 — DB 칸 `avg_daily_usage` 대신. 제안이 없으면 종전.
- 체크박스 자격 `canBulkSelect = sugg && sugg.seller_type` **그대로**(연결 vs 부족 분리 규칙 `reference_link_vs_lowstock_confusion`).
- BG 행에 `committed > 0` 이면 «매장 주문 대기 1,500 g» 작은 글씨.

### 5-3. 일괄 발주 모달 (`BulkOrderModal.tsx` · `useBulkOrder.ts`)
- 줄: 이름 · **수량 칸은 주문 단위**(`order_unit`) 로, 옆에 «= 5,000 g» · 아래 작은 글씨 «재고 500 g · 하루 400 g · 1일분 · 최소 10 pack 적용» (`min_order_qty` 가 있을 때만 «최소 … 적용»).
- 수량을 MOQ 밑으로 고치면 칸 옆에 빨간 «최소 10» (화면 `minQtyOf` 와 같은 뜻 — 서버가 어차피 막는다).
- 그룹 머리: 판매자명 · 소계 · `delivery_terms` 있으면 «무료배송 RM 100 이상 · 미만 시 RM 5 · RM 20 부족» · `order_windows` 있으면 기존 `utils/orderCutoff.ts` 단계로 «오늘 17:00 마감».
- **«연결 필요» 묶음**: `seller_type` 없는 선택 품목은 빼지 말고 모달 맨 아래 회색 묶음으로 보여 주고 «이 품목은 보내지 않습니다 — 공급처 연결» 링크(기존 연결 화면). `sendBulk` 는 종전대로 판매자 있는 줄만 보낸다.
- 400 `BELOW_MIN_ORDER` 는 `data.violations` 를 `minOrderViolationText` 로 풀어서 보여 준다(지금은 message 한 줄).
- `mergeDraft` 동작(같은 판매자 초안에 합쳐 보냄)은 기존 Bulk Order 와 같다 — 바꾸지 않는다. 다만 결과 화면에 «기존 초안과 합쳐짐» 을 응답 `merged` 로 표시(서버가 이미 `merged:true` 를 돌려주는지 확인하고 없으면 bulk 응답 orders[] 에 실어 준다 — 한 줄).

### 5-4. 발주 목록 제안 패널 (`PurchaseOrdersPage.tsx`)
`suggested_quantity` 옆에 `order_unit`, 이름 앞에 단계 점(out 빨강·now 주황·soon 노랑 — LiveOrders 팔레트 아님, 일반 상태색). 로직 변경 0.

### 5-5. 매장(RA) 쪽
같은 컴포넌트라 같은 띠가 뜬다. committed 는 0, 나머지는 `inventory/reorder-suggestions`(대시보드) 와 **같은 공식·같은 입력**이라 같은 답이 나와야 한다 — health-check ③ 이 이것을 잡는다.

---

## 6. 바꿀 파일 · 함수 (팀원 실행 순서)

| 순서 | 파일 | 할 일 |
|---|---|---|
| 1 | `dev-backend/utils/poStatuses.js` | `OPEN_OUTBOUND_STATUSES` 추가·export |
| 2 | `dev-backend/utils/reorderMath.js` | `ledgerUsageBrand(piIds)` · `onOrderQtyBrand(piIds)` · `committedOutboundBrand(brandIds, piIds)` · `classify()` · `orderQtyFor()` · `leadTimeFor(item, link)` 추가. `compute` 무변경. 머리 주석에 이 문서 경로 |
| 3 | `dev-backend/tests/reorder-math.test.js` | §3-5 A~G 추가 |
| 4 | `dev-backend/routes/purchase-orders-crud.js` | `buildSuggestionRows()` 공용 빌더 · 매장 분기·`brandStockItemSuggestions` 둘 다 빌더로 · min 필터 제거 · `summary`·`computed_at`·`delivery_terms`·`order_windows` · `suggested_qty = order_qty` |
| 5 | `dev-backend/scripts/health-check.js` | §7-2 ①~⑥ (`inventory` 카테고리) |
| 6 | `dev-frontend/src/components/Inventory/hooks/useBulkOrder.ts` | `SuggestionRow` 에 새 칸 · `summary`·`unlinked` 상태 · `selectNeeded(includeSoon)` · `openBulk` 가 연결 없는 품목을 `unlinkedItems` 로 넘김 · `quantity = order_qty` |
| 7 | `dev-frontend/src/components/Inventory/sections/ForesightPanel.tsx` (신규) | §5-1 |
| 8 | `dev-frontend/src/components/Inventory/sections/StockListSection.tsx` | §5-2 |
| 9 | `dev-frontend/src/components/Inventory/modals/BulkOrderModal.tsx` | §5-3 |
| 10 | `dev-frontend/src/components/Inventory/InventoryManager.tsx` | 띠 장착 · 필터 값 4개 · `addToPurchaseCart` 의 수량 식을 제안 행이 있으면 `order_qty` 로(없으면 종전) |
| 11 | `dev-frontend/src/pages/PurchaseOrders/PurchaseOrdersPage.tsx` | §5-4 |
| 12 | `dev-frontend/public/locales/{en,ko,zh,ms}/inventory.json` | 새 키(foresight.* · bulkOrder.* 추가분) · `npm run i18n:verify` |
| 13 | 빌드 1회 `npm run build:dev` → `verify-all --full` 1회 → SW 버전은 맨 마지막 | |

⛔ 손대지 않는 파일: `createPurchaseOrderCore`·`poMinOrder.js`·`purchaseOrderTotals.js`·`stockLedger.js`·`seller-orders.js`·인쇄·KDS 보호파일 전부. 설계와 다른 판단이 필요해지면 **중단하고 Fable 에게**.

---

## 7. 검증 (팀원이 기계로 · 게이트 전에 끝낸다)

### 7-1. 단위
- `npx jest tests/reorder-math.test.js` — 기존 + §3-5 A~G (`classify`·`orderQtyFor` 순수 함수).

### 7-2. health-check `inventory` (데모 브랜드 10 · 주인 user 22 `demo-brand@purplehere.com` · 데모 공급업체 20 · 데모 매장 38) — 만든 시험 데이터는 이름 `[확인용]`, 끝나면 되돌림
1. **BG 지금 발주·MOQ·환산**: `[확인용]` 재고아이템(unit g · manual_daily_usage 400 · lead 3 · stock 2,000) + 공급업체 20 상품(MOQ 10 · 500 g/pack) 연결 → `GET /purchase-orders/suggestions`(BG 토큰) 에 `status=order_now` · `order_qty=10` · `order_unit=pack` · `suggested_stock_qty≈1,840`(committed 0 일 때: rp 1,440+2,800−2,000) · `min_order_source='seller'`.
2. **약속한 양**: 데모 매장 38 이 브랜드 10 의 다이렉트 프로덕트(그 재고아이템 500 g/pack) 3 pack 을 `submitted` 로 두면 → 같은 행 `committed=1500` · `available=500` · `order_qty` 가 10 그대로(올림+MOQ) 이고 `suggested_stock_qty=3,740`; 그 발주를 취소하면 committed 0 으로 돌아온다.
3. **매장 분기 = 대시보드 공식**: 매장 38 의 `GET /restaurants/38/inventory/reorder-suggestions` 와 `GET /purchase-orders/suggestions`(RA) 를 같은 순간에 받아, 겹치는 재료마다 `suggested_stock_qty == suggested_qty(대시보드)` · `reorder_point` 같음.
4. **연결 없는 품목**: 연결 없는 `[확인용]` 품목(min 5 · stock 1) 이 `seller_type:null` 그룹에 `order_qty:null` 로 뜨고 `summary.unlinked ≥ 1`.
5. **기준 없음은 조용**: min 0 · usage 없음 · stock 0 인 `[확인용]` 품목은 groups 에 없고 `summary.no_basis` 에 센다.
6. **제안 수량 그대로 보내면 통과·하나 줄이면 400**: ①의 행을 `POST /purchase-orders/bulk {quantity_ordered: order_qty}` → 201; `order_qty − 1` → 400 `BELOW_MIN_ORDER`. 만든 발주는 `hcCleanupPurchaseOrders`.

### 7-3. 고장주입 (각각 넣고 → 해당 검사가 **실패하는지** 보고 → 원복 · 프론트 주입은 없음 — 전부 백엔드라 빌드 불필요)
- `orderQtyFor` 의 MOQ `max` 를 빼면 → ⑥ 두 번째(201 이 나와야 할 것이 400) 와 ① 의 `order_qty=10` 이 깨진다.
- `committedOutboundBrand` 가 빈 Map 을 돌려주면 → ② 가 깨진다.
- 매장 분기를 옛 `min×1.5−cur` 로 되돌리면 → ③ 이 깨진다.

### 7-4. 실브라우저 (빌드 1회 뒤 `verify-all --full` 1회)
- `/pos/brand-inventory` [as=brand store=38] 띠 네 숫자 · «필요한 것 담기» → 모달 줄에 «10 pack = 5,000 g · 최소 10 pack 적용 · 1일분» · 연결 필요 묶음 · Send → 결과.
- `/pos/inventory`(매장 38) [as=restaurant store=38] 같은 띠 · committed 문구 없음.
- `/pos/purchase-orders` 제안 패널 단위 표시.
- console.error 0 · ErrorBoundary 0.

### 7-5. 게이트에서 Fable 이 볼 것
diff 가 §6 표 안인지 · 보호파일 지문 0 · ⑦-1~3 숫자 · «ok/no_basis 가 제안에 안 섞였는지»(과발주 방지) · `suggested_qty` 의 뜻이 바뀐 곳을 읽는 화면이 두 곳뿐인지(`useBulkOrder`·`PurchaseOrdersPage`) 다시 grep.

---

## 8. 되돌리기 · 배포
- 스키마 0 이라 코드 되돌리기만으로 원복. `OPEN_OUTBOUND_STATUSES` 는 읽기 전용 상수.
- 운영 반영: 다음 배포 때(이 일에서는 안 한다). SW bump 는 프론트 마지막에 1회.
- 운영에서 BG 장부에 `order_deduct` 가 있으면 즉시 `ledger` 로 잡힌다(with MIN 출고). 없으면 `manual_daily_usage` 안내가 띠에 뜬다 — 그게 «기준 없음» 의 역할이다.

---

## 9. Irene 질문 (되돌리기 어려운 선택만 · 1단계 구현을 막지 않는다)

**Q1. 매장이 브랜드 물건을 담을 때 브랜드 재고가 모자라면 — 어떻게 할까요?**
- (a) **안내만**: 카탈로그·장바구니에 «브랜드 재고 부족(가용 500 g)» 표시, 주문은 그대로 들어가고 BG 판매자 주문 목록에 «보낼 재고 부족» 배지.
- (b) **막기**: 가용량 초과 수량은 담지 못하게(400).
- 결과: (a) 는 BG 가 입고로 메울 여지를 남기고 주문을 잃지 않는다 · (b) 는 매장이 «왜 못 담나» 를 겪고 BG 재고 숫자가 조금만 틀려도 판매가 멈춘다.
- **Fable 권고: (a).** 재고 숫자는 실사 전까지 근사치다 — 근사치로 판매를 막지 않는다. (a) 가 자리 잡고 숫자가 믿을 만해지면 (b) 는 설정 하나로 켜는 2단계.

**Q2. 매일 아침 «품절·지금 발주 N개» 를 BG 에게 알릴까요? 알리면 어디로?**
- (a) 앱 안 알림 + 푸시만(`inventory_low` 카테고리 — 이미 push_only 로 정의돼 있고 발화만 없다) · 브랜드 시간대 07:00 · `SchedulerRun` 기록
- (b) (a) + 이메일
- (c) 안 보냄 — 재고 화면 띠로만
- 결과: (a) 는 조용하고 끄기 쉽다 · (b) 는 외부 발송이라 게이트 대상이고 메일 피로 · (c) 는 화면을 안 열면 모른다.
- **Fable 권고: (a).** 외부 공급업체에 나가는 자동 메일은 10-22 지시대로 없다 — 이건 BG 자기에게만 가는 알림이라 성격이 다르지만, 그래도 메일은 빼고 시작.

**Q3(참고 · 답 없어도 진행): «곧 부족(soon)» 을 «필요한 것 담기» 에 기본 포함할까요?** 1단계는 **기본 제외(토글로 포함)** 로 만든다 — 과발주가 미발주보다 되돌리기 어렵다(돈이 나간다). 써 보고 «항상 포함» 을 원하면 기본값 한 줄.

**«권고대로» 한 마디면 Q1(a)·Q2(a) 로 2단계 설계를 이어간다. 1단계는 답과 무관하게 지금 시작한다.**
